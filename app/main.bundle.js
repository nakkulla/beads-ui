var B_=Object.create;var _a=Object.defineProperty;var U_=Object.getOwnPropertyDescriptor;var W_=Object.getOwnPropertyNames;var z_=Object.getPrototypeOf,H_=Object.prototype.hasOwnProperty;var K_=(e,t,n)=>t in e?_a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ma=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var G_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of W_(t))!H_.call(e,o)&&o!==n&&_a(e,o,{get:()=>t[o],enumerable:!(r=U_(t,o))||r.enumerable});return e};var Y_=(e,t,n)=>(n=e!=null?B_(z_(e)):{},G_(t||!e||!e.__esModule?_a(n,"default",{value:e,enumerable:!0}):n,e));var Bt=(e,t,n)=>K_(e,typeof t!="symbol"?t+"":t,n);var kc=ma((yw,vc)=>{var Yr=1e3,Vr=Yr*60,Qr=Vr*60,Ir=Qr*24,X_=Ir*7,Z_=Ir*365.25;vc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return J_(e);if(n==="number"&&isFinite(e))return t.long?tm(e):em(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function J_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Z_;case"weeks":case"week":case"w":return n*X_;case"days":case"day":case"d":return n*Ir;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Qr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Vr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Yr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function em(e){var t=Math.abs(e);return t>=Ir?Math.round(e/Ir)+"d":t>=Qr?Math.round(e/Qr)+"h":t>=Vr?Math.round(e/Vr)+"m":t>=Yr?Math.round(e/Yr)+"s":e+"ms"}function tm(e){var t=Math.abs(e);return t>=Ir?Ns(e,t,Ir,"day"):t>=Qr?Ns(e,t,Qr,"hour"):t>=Vr?Ns(e,t,Vr,"minute"):t>=Yr?Ns(e,t,Yr,"second"):e+" ms"}function Ns(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var $c=ma((vw,wc)=>{function nm(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=kc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let m=0;m<d.length;m++)f=(f<<5)-f+d.charCodeAt(m),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,m=null,g,v;function O(...R){if(!O.enabled)return;let X=O,ee=Number(new Date),Y=ee-(f||ee);X.diff=Y,X.prev=f,X.curr=ee,f=ee,R[0]=n.coerce(R[0]),typeof R[0]!="string"&&R.unshift("%O");let L=0;R[0]=R[0].replace(/%([a-zA-Z%])/g,(P,j)=>{if(P==="%%")return"%";L++;let V=n.formatters[j];if(typeof V=="function"){let M=R[L];P=V.call(X,M),R.splice(L,1),L--}return P}),n.formatArgs.call(X,R),(X.log||n.log).apply(X,R)}return O.namespace=d,O.useColors=n.useColors(),O.color=n.selectColor(d),O.extend=r,O.destroy=n.destroy,Object.defineProperty(O,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(g!==n.namespaces&&(g=n.namespaces,v=n.enabled(d)),v),set:R=>{m=R}}),typeof n.init=="function"&&n.init(O),O}function r(d,f){let m=n(this.namespace+(typeof f>"u"?":":f)+d);return m.log=this.log,m}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of f)m[0]==="-"?n.skips.push(m.slice(1)):n.names.push(m)}function i(d,f){let m=0,g=0,v=-1,O=0;for(;m<d.length;)if(g<f.length&&(f[g]===d[m]||f[g]==="*"))f[g]==="*"?(v=g,O=m,g++):(m++,g++);else if(v!==-1)g=v+1,O++,m=O;else return!1;for(;g<f.length&&f[g]==="*";)g++;return g===f.length}function s(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(i(d,f))return!1;for(let f of n.names)if(i(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}wc.exports=nm});var xc=ma((kn,js)=>{kn.formatArgs=om;kn.save=sm;kn.load=im;kn.useColors=rm;kn.storage=am();kn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();kn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function rm(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function om(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+js.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}kn.log=console.debug||console.log||(()=>{});function sm(e){try{e?kn.storage.setItem("debug",e):kn.storage.removeItem("debug")}catch{}}function im(){let e;try{e=kn.storage.getItem("debug")||kn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function am(){try{return localStorage}catch{}}js.exports=$c()(kn);var{formatters:lm}=js.exports;lm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Ao=globalThis,Rs=Ao.trustedTypes,oc=Rs?Rs.createPolicy("lit-html",{createHTML:e=>e}):void 0,ha="$lit$",Xn=`lit$${Math.random().toFixed(9).slice(2)}$`,ba="?"+Xn,V_=`<${ba}>`,Tr=document,So=()=>Tr.createComment(""),Eo=e=>e===null||typeof e!="object"&&typeof e!="function",ya=Array.isArray,uc=e=>ya(e)||typeof e?.[Symbol.iterator]=="function",ga=`[ 	
\f\r]`,xo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,sc=/-->/g,ic=/>/g,Sr=RegExp(`>|${ga}(?:([^\\s"'>=/]+)(${ga}*=${ga}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ac=/'/g,lc=/"/g,dc=/^(?:script|style|textarea|title)$/i,va=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=va(1),Co=va(2),pw=va(3),En=Symbol.for("lit-noChange"),Yt=Symbol.for("lit-nothing"),cc=new WeakMap,Er=Tr.createTreeWalker(Tr,129);function pc(e,t){if(!ya(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return oc!==void 0?oc.createHTML(t):t}var fc=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=xo;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,m=0;for(;m<a.length&&(s.lastIndex=m,d=s.exec(a),d!==null);)m=s.lastIndex,s===xo?d[1]==="!--"?s=sc:d[1]!==void 0?s=ic:d[2]!==void 0?(dc.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Sr):d[3]!==void 0&&(s=Sr):s===Sr?d[0]===">"?(s=o??xo,f=-1):d[1]===void 0?f=-2:(f=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Sr:d[3]==='"'?lc:ac):s===lc||s===ac?s=Sr:s===sc||s===ic?s=xo:(s=Sr,o=void 0);let g=s===Sr&&e[l+1].startsWith("/>")?" ":"";i+=s===xo?a+V_:f>=0?(r.push(u),a.slice(0,f)+ha+a.slice(f)+Xn+g):a+Xn+(f===-2?l:g)}return[pc(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},To=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=fc(t,n);if(this.el=e.createElement(u,r),Er.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=Er.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(ha)){let m=d[s++],g=o.getAttribute(f).split(Xn),v=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:v[2],strings:g,ctor:v[1]==="."?Ls:v[1]==="?"?Ds:v[1]==="@"?Ps:Or}),o.removeAttribute(f)}else f.startsWith(Xn)&&(a.push({type:6,index:i}),o.removeAttribute(f));if(dc.test(o.tagName)){let f=o.textContent.split(Xn),m=f.length-1;if(m>0){o.textContent=Rs?Rs.emptyScript:"";for(let g=0;g<m;g++)o.append(f[g],So()),Er.nextNode(),a.push({type:2,index:++i});o.append(f[m],So())}}}else if(o.nodeType===8)if(o.data===ba)a.push({type:2,index:i});else{let f=-1;for(;(f=o.data.indexOf(Xn,f+1))!==-1;)a.push({type:7,index:i}),f+=Xn.length-1}i++}}static createElement(t,n){let r=Tr.createElement("template");return r.innerHTML=t,r}};function Cr(e,t,n=e,r){if(t===En)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=Eo(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Cr(e,o._$AS(e,t.values),o,r)),t}var Is=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Tr).importNode(n,!0);Er.currentNode=o;let i=Er.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new Kr(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new Ms(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Er.nextNode(),s++)}return Er.currentNode=Tr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Kr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Yt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Cr(this,t,n),Eo(t)?t===Yt||t==null||t===""?(this._$AH!==Yt&&this._$AR(),this._$AH=Yt):t!==this._$AH&&t!==En&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):uc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Yt&&Eo(this._$AH)?this._$AA.nextSibling.data=t:this.T(Tr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=To.createElement(pc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new Is(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=cc.get(t.strings);return n===void 0&&cc.set(t.strings,n=new To(t)),n}k(t){ya(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(So()),this.O(So()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Or=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Yt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Yt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Cr(this,t,n,0),s=!Eo(t)||t!==this._$AH&&t!==En,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Cr(this,l[r+a],n,a),u===En&&(u=this._$AH[a]),s||(s=!Eo(u)||u!==this._$AH[a]),u===Yt?t=Yt:t!==Yt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Yt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ls=class extends Or{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Yt?void 0:t}},Ds=class extends Or{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Yt)}},Ps=class extends Or{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Cr(this,t,n,0)??Yt)===En)return;let r=this._$AH,o=t===Yt&&r!==Yt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Yt&&(r===Yt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ms=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Cr(this,t)}},_c={M:ha,P:Xn,A:ba,C:1,L:fc,R:Is,D:uc,V:Cr,I:Kr,H:Or,N:Ds,U:Ps,B:Ls,F:Ms},Q_=Ao.litHtmlPolyfillSupport;Q_?.(To,Kr),(Ao.litHtmlVersions??(Ao.litHtmlVersions=[])).push("3.3.1");var ft=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new Kr(t.insertBefore(So(),i),i,void 0,n??{})}return o._$AI(e),o};var qs="today",mc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Gr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function zn(e){return e==="today"?"today":"7d"}function ka(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Rr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function gc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function hc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function bc(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function yc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Ac=Y_(xc(),1);function Ht(e){return(0,Ac.default)(`beads-ui:${e}`)}function cm(e){let n=Sc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Sc(e){return typeof e=="string"?e.trim():""}function um(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var dm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Xr(e){let t=cm(e),n=Sc(um(e).spec_review),r=dm.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function In(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Oo(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Ic(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Lc(e,t){let n=In(e.updated_at),r=In(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Dc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=In(e.created_at),i=In(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Pc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var Fs=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function pm(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Fs,e)}function $a(e){if(!e||typeof e!="object")return!1;let t=e;return pm(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Ec(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Tc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Xr(e).evidence==="published"?1:0;case"created":return Ec(e.created_at);case"updated":return Ec(e.updated_at);default:return null}}function Cc(e,t,n){let r=Tc(e,n.key),o=Tc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Mc(e){let t=Array.isArray(e)?e.filter($a):[];return(n,r)=>{for(let l of t){let a=Cc(n,r,l);if(a!==0)return a}let o=Cc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var fm=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Oc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Rc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=fm.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function qc(e,t){let n=Oc(e),r=Oc(t);if(n!==r)return n<r?-1:1;let o=Rc(e),i=Rc(t);if(o!==i)return o<i?-1:1;let s=In(e&&e.created_at),l=In(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var wa=2**20;function Zr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-In(e&&e.created_at)}function Nc(e){return(t,n)=>{let r=Zr(t,e),o=Zr(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function xa(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:Zr(l,n)-wa};if(!l)return{rank:Zr(s,n)+wa};let a=Zr(s,n),u=Zr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,m)=>({bead_id:f.id,rank:m*wa}))}}function Aa(e,t={}){let n=Ht(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||Oo;function u(){for(let m of Array.from(s))try{m()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(m){if(l||!m||m.id!==e)return;let g=Number(m.revision)||0;if(n("apply %s rev=%d",m.type,g),!(g<=i&&m.type!=="snapshot")){if(m.type==="snapshot"){if(g<=i)return;r.clear();let v=Array.isArray(m.issues)?m.issues:[];for(let O of v)O&&typeof O.id=="string"&&O.id.length>0&&r.set(O.id,O);d(),i=g,u();return}if(m.type==="upsert"){let v=m.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let O=r.get(v.id);if(!O)r.set(v.id,v);else{let R=Number.isFinite(O.updated_at)?O.updated_at:0,X=Number.isFinite(v.updated_at)?v.updated_at:0;if(R<=X){for(let ee of Object.keys(O))ee in v||delete O[ee];for(let[ee,Y]of Object.entries(v))O[ee]=Y}}d()}i=g,u()}else if(m.type==="delete"){let v=String(m.issue_id||"");v&&(r.delete(v),d()),i=g,u()}}}return{id:e,subscribe(m){return s.add(m),()=>{s.delete(m)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(m){return r.get(m)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function Bs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function jc(e){let t=Ht("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],m=Array.isArray(a.removed)?a.removed:[];for(let g of Array.from(u)){let v=n.get(g);if(!v)continue;let O=v.itemsById;for(let R of d)typeof R=="string"&&R.length>0&&O.set(R,!0);for(let R of f)typeof R=="string"&&R.length>0&&O.set(R,!0);for(let R of m)typeof R=="string"&&R.length>0&&O.delete(R)}}async function i(l,a){let u=Bs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let m=r.get(f.key);m&&(m.delete(l),m.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let m=n.get(l)||null;if(m){let g=r.get(m.key);g&&(g.delete(l),g.size===0&&r.delete(m.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let m=r.get(f.key);m&&(m.delete(l),m.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:Bs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Fc(){let e=Ht("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let f=u?Bs(u):"",m=n.get(a)||"",g=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,m),g&&m&&f&&m!==f){let v=t.get(a);if(v)try{v.dispose()}catch{}let O=o.get(a);if(O){try{O()}catch{}o.delete(a)}let R=Aa(a,d);t.set(a,R);let X=R.subscribe(()=>i());o.set(a,X)}else if(!g){let v=Aa(a,d);t.set(a,v);let O=v.subscribe(()=>i());o.set(a,O)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Bc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Uc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Sa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function _m(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function mm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Wc(e){let t=Ht("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):_m(r),s=mm(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"?o.view:"board",s=Sa(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?Sa(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var gm=Object.freeze({workspace_config:{default_workspace:null}});function zc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:gm.workspace_config.default_workspace}}}function Hc(e={}){let t=Ht("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:zc(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?zc(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Kc(e){let t=Ht("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(f,m)=>{let g=o++,v=Date.now();r.set(g,{type:f,start_ts:v}),t("request start id=%d type=%s count=%d",g,f,n+1),s();let O=!1,R=()=>{O||(O=!0,r.delete(g),l())},X=setTimeout(()=>{O||(t("request TIMEOUT id=%d type=%s elapsed=%dms",g,f,Date.now()-v),R())},3e4);try{let ee=await u(f,m),Y=Date.now()-v;return t("request done id=%d type=%s elapsed=%dms",g,f,Y),ee}catch(ee){let Y=Date.now()-v;throw t("request error id=%d type=%s elapsed=%dms err=%o",g,f,Y,ee),ee}finally{clearTimeout(X),R()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ge(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Jr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Pc),a;switch(l){case"created_desc":return a.sort(Oo),a;case"created_asc":return a.sort(Ic),a;case"updated_desc":return a.sort(Lc),a;case"priority":return a.sort(Dc),a;case"manual":default:{let u=n();return u?a.sort(Nc(u)):a.sort(Oo),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function cr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function rn(e){let t=cr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function mn(e,t){let n=cr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Gc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=cr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Us(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ws(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Us(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function zs(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=Gc(n);return{total:n.length,count:r,current:o,children:n}}function Yc(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(xa(l,a,u.order),s);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let m={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(m);let g=r(xa(l,a,m.order),s);o(m,g);let v=await t("ui-order-set",{expected_revision:m.revision,entries:g});v&&v.applied&&n.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:i}}function Vc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Zn(e,t){let n=Vc(e),r=Vc(t);return n.length===0||r.length===0?!1:n!==r}function Hs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ea(e,t){return!t||typeof e!="string"||e.length===0||Hs(t.visible_labels).includes(e)?!0:Hs(t.hidden_labels).includes(e)?!1:!Hs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Qc(e,t){return Hs(e).filter(n=>Ea(n,t))}function ur(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function hm(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function bm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function ym(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${hm(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Ks(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(qc):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?bm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>ym(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var vm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Zc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Xc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},km={review:"\u2713",skip:"\u2298"},dr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function wm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function Jc(e){let t=e&&e.fill||"none";return t==="none"?dr.none:e&&e.stale===!0?dr.stale:t==="dim"?dr.dim:e&&e.glyph==="review"?dr.review:e&&e.glyph==="skip"?dr.skip:dr.done}function $m(e){if(!e||e.fill==="none"||!e.approval_state)return Jc(e);let t=[];return e.glyph==="review"?t.push(dr.review):e.glyph==="skip"&&t.push(dr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function xm(e,t,n,r){let o=vm[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=km[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=Zc[e]||e,m=r?eu(t):null;if(!m)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let g=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${m.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${g}
      title=${g}
      @click=${v=>{v.preventDefault(),v.stopPropagation(),r(v,m,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function eu(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Gs(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Xc[e.route]||Xc.spec_backed,i=e.stages,s=wm(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Zc[u]||u} ${u==="plan"?$m(i[u]||{}):Jc(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>eu(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>xm(u,i[u]||{},u===s,r))}
    </div>
  `}function Am(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var tu=2;function nu(e){let t=e.slice(0,tu).join(", "),n=e.length-tu;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Sm(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Zn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${nu(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${nu(i)}</span
      >`),n}function Em(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Ta(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Ys(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jn(e){return`${e.kind}:${Ys(e)}@${e.sha}`}function Vs(e,t){if(!e)return null;let n=Ta(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=Ta(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Jn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function ru(e,t){let n=Vs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Tm(e){if(!e)return null;let t=Ta(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Cm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&ur(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&ur(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&ur(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=ru(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(l)}`}
        >${`exec ${l.kind==="delegated"?Ys(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Qc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&ur(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),ur(n,"blocked")){let l=Em(e.metadata);l&&o.push(l),o.push(...Sm(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&ur(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Om(e){let t=mn(e.created_at),n=mn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${rn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${rn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Rm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ks(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Om(e),empty_label:"children \uC5C6\uC74C",childChips:Ca,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Ca(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Vs(t,n)?c`<span class="board-card__roll-child-chips">
    ${ru(t,n)}
    ${Tm(n)}
  </span>`:null}function Qs(e,t){let n=Am(e.priority);return c`
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
      ${Cm(e,t)}
      ${e.workflow&&ur(t.policy||null,"stepper")?Gs(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Rm(e,t)}
    </article>
  `}function eo(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${mc.map(i=>c`<option
                    value=${i.value}
                    ?selected=${i.value===e.closed_range}
                  >
                    ${i.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(i=>Qs(i,t))}
      </div>
    </section>
  `}function ou(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Qs(r,t))}
        </div>
      </div>
    </dialog>
  `}var Im=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Lm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Dm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Pm(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${o} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(i=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(i)}
                        @change=${()=>t.onLabelToggle(i)}
                      />
                      <span>${i}</span>
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
  `}function su(e,t,n){return c`
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
        ${Im.map(r=>c`<option
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
        ${Lm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Pm(e,t,n)}
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
        ${Dm.map(r=>c`<option
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
  `}var Mm=200,qm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Nm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),iu="beads-ui.board.sort",au=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function jm(){try{let e=window.localStorage.getItem(iu);if(e&&au.has(e))return e}catch{}return"created_desc"}function lu(e,t){let n=Ht("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,m=t.closedRange||qs,g=o?Jr(o,s):null,v=Yc({transport:i,uiOrderStore:s}),O=[],R=[],X=[],ee=[],Y=[],L=[],I=!1,P=0,j=jm(),V=new Map,M=new Map,q=new Map,K=new Set,U={search:"",priority:"",type:"",labels:[]},te=!1,be=null;function Ne(ae){return String(ae.status||"open")==="open"}function F(ae){return String(ae.status||"open")==="open"}function J(ae){let we=U.search.trim().toLowerCase(),Ge=U.priority,ot=U.type,et=U.labels;return ae.filter(mt=>{if(we){let bt=String(mt.id||"").toLowerCase(),tt=String(mt.title||"").toLowerCase();if(!bt.includes(we)&&!tt.includes(we))return!1}if(Ge!==""&&String(mt.priority)!==Ge||ot!==""&&String(mt.issue_type||"")!==ot)return!1;if(et.length>0){let bt=Array.isArray(mt.labels)?mt.labels:[];if(!et.some(tt=>bt.includes(tt)))return!1}return!0})}function he(){let ae=new Set;for(let we of[O,R,X,ee,Y,L])for(let Ge of we){let ot=Array.isArray(Ge.labels)?Ge.labels:[];for(let et of ot)typeof et=="string"&&et.length>0&&ae.add(et)}return Array.from(ae).sort()}function Re(){return U.search.trim()!==""||U.priority!==""||U.type!==""||U.labels.length>0}function C(){try{if(g){let ae=g.selectBoardColumn("tab:board:in-progress","in_progress",j),we=g.selectBoardColumn("tab:board:blocked","blocked",j).filter(F),Ge=new Set(ae.map(N=>N.id)),ot=g.selectBoardColumn("tab:board:ready","ready",j).filter(N=>Ne(N)&&!Ge.has(N.id)),et=g.selectBoardColumn("tab:board:resolved","resolved",j),mt=g.selectBoardColumn("tab:board:deferred","deferred",j),bt=g.selectBoardColumn("tab:board:closed","closed").slice(0,Mm),tt=[...we,...ot,...ae,...et,...bt];se(tt);let me=new Set;for(let N of tt)N&&N.id&&!Us(N)&&me.add(N.id);let A=!Re();O=A?Ro(we,me):we,R=A?Ro(ot,me):ot,X=A?Ro(ae,me):ae,ee=A?Ro(et,me):et,Y=mt,P=mt.length,L=A?Ro(bt,me):bt,V=new Map;for(let N of O)V.set(N.id,"open");for(let N of R)V.set(N.id,"open");for(let N of X)V.set(N.id,"in_progress");for(let N of ee)V.set(N.id,"resolved");for(let N of Y)V.set(N.id,"deferred");for(let N of L)V.set(N.id,"closed");M=new Map;for(let N of O)M.set(N.id,"blocked-col");for(let N of R)M.set(N.id,"ready-col");for(let N of X)M.set(N.id,"in-progress-col");for(let N of ee)M.set(N.id,"resolved-col");for(let N of L)M.set(N.id,"closed-col")}Ce()}catch{O=[],R=[],X=[],ee=[],Y=[],L=[],q=new Map,Ce()}}function se(ae){q=Ws(ae)}function ye(ae){return zs(q,ae)}function Ae(ae){return!K.has(ae)}function Pe(ae,we){ae.preventDefault(),ae.stopPropagation(),K.has(we)?K.delete(we):K.add(we),Ce()}function ve(ae,we){ae.preventDefault(),ae.stopPropagation(),r(we)}function Te(ae,we){ae.preventDefault(),ae.stopPropagation(),r(we)}function ut(ae,we){be||r(we)}function dt(ae,we){ae.preventDefault(),ae.stopPropagation(),Fm(we).then(Ge=>{Ge&&ge("\uBCF5\uC0AC\uB428","success",1200)})}function G(ae,we){be=we,ae.dataTransfer&&(ae.dataTransfer.setData("text/plain",we),ae.dataTransfer.effectAllowed="move"),ae.target.classList.add("board-card--dragging")}function re(ae){ae.target.classList.remove("board-card--dragging"),Pt(),setTimeout(()=>{be=null},0)}function ne(ae){let we=String(ae.target.value||"");!we||we===m||(m=we,u&&u(we),Ce())}function ue(){return l?l.get():null}function ke(ae){let we=a?a.get():null,Ge=we?we.cleanup_failed:null;if(!Ge||typeof Ge!="object"||Array.isArray(Ge))return null;let ot=Ge[ae];return!ot||typeof ot!="object"||Array.isArray(ot)?null:ot}let pe={onCardClick:ut,onCopyId:dt,onDragStart:G,onDragEnd:re,onClosedRangeChange:ne,rollupFor:ye,isExpanded:Ae,onRollupToggle:Pe,onChildClick:ve,onFromChipClick:Te,onOpenDoc:f?(ae,we)=>f(we):void 0,cleanupFailureFor:ke,get policy(){return ue()}};function qe(ae,we){be||(He(),r(we))}function Be(ae,we){ae.preventDefault(),ae.stopPropagation(),He(),r(we)}let Je={...pe,onCardClick:qe,onChildClick:Be,onFromChipClick:Be,onOpenDoc:f?(ae,we)=>{He(),f(we)}:void 0,get policy(){return ue()}};function We(ae){let we=ae.target,Ge=e.querySelector(".board-filter__labels");we&&Ge&&Ge.contains(we)||Fe()}function Q(ae){ae.key==="Escape"&&Fe()}function B(){te||(te=!0,document.addEventListener("mousedown",We),document.addEventListener("keydown",Q),Ce())}function Fe(){te&&(te=!1,document.removeEventListener("mousedown",We),document.removeEventListener("keydown",Q),Ce())}function _t(ae){ae.key==="Escape"&&He()}function pt(){I||(I=!0,document.addEventListener("keydown",_t),Ce())}function He(){I&&(I=!1,document.removeEventListener("keydown",_t),Ce())}let it={onClose:He,onOverlayClick(ae){ae.target===ae.currentTarget&&He()}},w={onSearchInput(ae){U.search=String(ae.target.value||""),C()},onPriorityChange(ae){U.priority=String(ae.target.value||""),C()},onTypeChange(ae){U.type=String(ae.target.value||""),C()},onSortChange(ae){let we=String(ae.target.value||"");if(!(!au.has(we)||we===j)){j=we;try{window.localStorage.setItem(iu,we)}catch{}C()}},onDeferredToggle(){I?He():pt()},onLabelMenuToggle(){te?Fe():B()},onLabelToggle(ae){let we=U.labels.indexOf(ae);we===-1?U.labels.push(ae):U.labels.splice(we,1),C()},onLabelClear(){U.labels.length!==0&&(U.labels=[],C())},onNewIssue(){d&&d()}};function Z(){return c`
      <div class="board-view">
        ${su(U,w,{sort_mode:j,deferred_popup_open:I,deferred_count:P,label_options:he(),label_menu_open:te})}
        <div class="board-root">
          ${eo({title:"Blocked",id:"blocked-col",items:J(O)},pe)}
          ${eo({title:"Ready",id:"ready-col",items:J(R)},pe)}
          ${eo({title:"In progress",id:"in-progress-col",items:J(X)},pe)}
          ${eo({title:"Resolved",id:"resolved-col",items:J(ee)},pe)}
          ${eo({title:"Closed",id:"closed-col",items:J(L),is_closed:!0,closed_range:m},pe)}
        </div>
        ${I?ou({items:J(Y),count:P},Je,it):""}
      </div>
    `}function Ce(){ft(Z(),e),Ye()}function Ye(){try{let ae=e.querySelector("#deferred-popup");ae&&!ae.open&&(typeof ae.showModal=="function"?ae.showModal():ae.setAttribute("open",""));let we=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ge of we)Array.from(Ge.querySelectorAll(".board-card")).forEach((et,mt)=>{et.tabIndex=mt===0?0:-1})}catch{}}async function Ke(ae,we){if(!i){ge("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:ae,status:we}),ge("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ge){n("update-status failed: %o",Ge),ge("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function je(ae){switch(ae){case"blocked-col":return O;case"ready-col":return R;case"in-progress-col":return X;case"resolved-col":return ee;default:return[]}}function Et(ae,we,Ge){if(!i||!s)return;let ot=je(ae),et=ot.find(A=>A.id===we);if(!et)return;let mt=ot.filter(A=>A.id!==we),bt=Ge.closest?Ge.closest(".board-card"):null,tt=mt.length;if(bt){let A=bt.getAttribute("data-issue-id");if(A===we)return;let N=mt.findIndex(ie=>ie.id===A);N>=0&&(tt=N)}let me=mt.slice();me.splice(tt,0,et),v.applyReorder(we,me,tt)}function Pt(){for(let ae of Array.from(e.querySelectorAll(".board-column--drag-over")))ae.classList.remove("board-column--drag-over")}let rt=null;e.addEventListener("dragover",ae=>{ae.preventDefault(),ae.dataTransfer&&(ae.dataTransfer.dropEffect="move");let Ge=ae.target.closest(".board-column");Ge&&Ge!==rt&&(rt&&rt.classList.remove("board-column--drag-over"),Ge.classList.add("board-column--drag-over"),rt=Ge)}),e.addEventListener("dragleave",ae=>{let we=ae.relatedTarget;(!we||!e.contains(we))&&rt&&(rt.classList.remove("board-column--drag-over"),rt=null)}),e.addEventListener("drop",ae=>{ae.preventDefault(),rt&&(rt.classList.remove("board-column--drag-over"),rt=null);let we=ae.target,Ge=we.closest(".board-column");if(!Ge)return;let ot=ae.dataTransfer?.getData("text/plain")||"";if(!ot)return;let et=Ge.id,mt=M.get(ot);if(mt&&mt===et){if(Nm.has(et)){if(j!=="manual"){ge("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Et(et,ot,we)}return}let bt=qm[et];if(!bt){ge("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(ot)!==bt&&Ke(ot,bt)}),e.addEventListener("keydown",ae=>{let we=ae.target;if(!(we instanceof HTMLElement))return;let Ge=String(we.tagName||"").toLowerCase();if(Ge==="input"||Ge==="textarea"||Ge==="select"||Ge==="button"||Ge==="a"||we.isContentEditable===!0)return;let ot=we.closest(".board-card");if(!ot)return;let et=String(ae.key||"");if(et==="Enter"||et===" "){ae.preventDefault();let me=ot.getAttribute("data-issue-id");me&&r(me);return}if(et!=="ArrowUp"&&et!=="ArrowDown"&&et!=="ArrowLeft"&&et!=="ArrowRight")return;ae.preventDefault();let mt=ot.closest(".board-column");if(!mt)return;let bt=Array.from(mt.querySelectorAll(".board-card")),tt=bt.indexOf(ot);if(et==="ArrowDown"&&tt<bt.length-1){Tt(ot,bt[tt+1]);return}if(et==="ArrowUp"&&tt>0){Tt(ot,bt[tt-1]);return}if(et==="ArrowLeft"||et==="ArrowRight"){let me=Array.from(e.querySelectorAll(".board-column")),A=me.indexOf(mt),N=et==="ArrowRight"?1:-1,ie=A+N;for(;ie>=0&&ie<me.length;){let Se=me[ie].querySelector(".board-card");if(Se){Tt(ot,Se);return}ie+=N}}});function Tt(ae,we){try{ae.tabIndex=-1,we.tabIndex=0,we.focus()}catch{}}let jt=null;g&&g.subscribe&&(jt=g.subscribe(()=>{try{C()}catch{}}));let It=null;l&&l.subscribe&&(It=l.subscribe(()=>{try{C()}catch{}}));let Ut=null;return a&&a.subscribe&&(Ut=a.subscribe(()=>{Ce()})),{async load(){n("load"),C()},clear(){Fe(),He(),jt&&(jt(),jt=null),It&&(It(),It=null),Ut&&(Ut(),Ut=null),e.replaceChildren(),O=[],R=[],X=[],ee=[],Y=[],L=[],V=new Map,M=new Map}}}function Ro(e,t){return e.filter(n=>{let r=Us(n);return!(r&&t.has(r))})}async function Fm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var pn=e=>e??Yt;function An(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Io(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function gn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var Bm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],pu=["orchestration_model","orchestration_effort","orchestration_speed"],fu=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Um=[...pu,...fu],cu={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},uu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},du={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},Wm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function tn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ot(e){return typeof e=="string"&&e.length>0?e:null}function to(e){return e.startsWith("gpt-")?e.slice(4):e}function ht(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function _u(e,t,n){let r=Ot(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ot(n[e]);return o===null?null:{value:o,source:"global"}}function pr(e,t,n,r){return _u(e,t,n)||{value:r,source:"base"}}function Oa(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&tn(o?.[t])){let s=Ot(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&tn(o)){for(let s of Object.values(o))if(tn(s)){let l=Ot(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Ot(r?.runners?.[i]?.models?.[e]?.id)||e}function zm(e,t){return Ot(t?.review?.reviewers?.[e]?.model)||e}function Ln(e,t,n=!1){if(e==="default")return ht(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?to(e):e;return ht(e,t,r,e,"explicit")}function mu(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];tn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(tn(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function Hm(e,t){let n=[],r=e?.implementation?.model_catalog;tn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(tn(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function Km(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Hm(t,n)){let i=mu(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Xs(e){return ht(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ra(e,t,n){let r=_u(e,t,n);return r?Ln(r.value,r.source):ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Sn(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&tn(r.session)?r.session:null,i=r?.supported===!0&&tn(r.orchestration)?r.orchestration:null,s=tn(e.runner_catalog)?e.runner_catalog:null,l=Ot(n.quick_fix_impl_model),a=Km(l,o,s),u={};if(o){let d=pr("workflow_mode",t,n,Ot(o.workflow_mode_default));u.workflow_mode=d.source==="base"?ht(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Ln(d.value,d.source);for(let Y of["spec_review","plan_review","impl_review"]){let L=`${Y}_model`,I=Ot(Y==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),P=pr(L,t,n,I);if(P.value===null)u[L]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(P.value!=="self"&&P.value!=="skip"&&!tn(o.review?.reviewers?.[P.value]))u[L]=Xs(ht(P.value,P.source,"",null,"explicit"));else{let j=zm(P.value,o);u[L]=ht(P.value,P.source,to(j),j,P.source==="base"?"default":"explicit")}}for(let[Y,L]of Object.entries(uu)){let I=u[L].value;if(I==="self"||I==="skip"){u[Y]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let P=Ot(o.review?.reviewers?.[I||""]?.effort),j=pr(Y,t,n,P);u[Y]=j.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}for(let[Y,L]of Object.entries(du)){let I=u[L];if(I.resolution==="incompatible"||I.value==="self"||I.value==="skip"){u[Y]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(I.resolution==="unavailable"){u[Y]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let P=pr(Y,t,n,"default");u[Y]=P.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):Ln(P.value,P.source)}let f=tn(o.implementation?.default)?o.implementation.default:{},m=Ot(e.route),g=m!==null&&["quick_fix","spec_backed","full_plan"].includes(m),v=tn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},O=g&&tn(v[m])?v[m]:{},R={},X=!1;if(m==="quick_fix"){let Y=Ot(t.impl_runtime),L=Ot(n.quick_fix_impl_runtime),I=Y||L,P=I==="inherit"?Ot(e.controller_runtime):I;X=l!==null&&a.runtime!==null&&(I===null||P===a.runtime);let j=Ot(t.impl_dispatch),V=Ot(n.quick_fix_impl_dispatch);if(j!==null)u.impl_dispatch=Ln(j,"pin"),R.impl_dispatch="pin";else if(V!==null)u.impl_dispatch=Ln(V,"global"),R.impl_dispatch="quick_fix";else if(X)u.impl_dispatch=ht("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),R.impl_dispatch="implied";else{let M=Ot(O.dispatch)||Ot(f.dispatch);u.impl_dispatch=M?ht(M,"base",M,M,"default"):ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),R.impl_dispatch="base"}if(Y!==null)u.impl_runtime=Ln(Y,"pin"),R.impl_runtime="pin";else if(L!==null)u.impl_runtime=Ln(L,"global"),R.impl_runtime="quick_fix";else if(X){let M=a.runtime;u.impl_runtime=ht(M,"global",`${M} (\uC720\uB3C4)`,M,"explicit"),R.impl_runtime="derived"}else{let M=pr("impl_runtime",{},n,Ot(f.runtime));u.impl_runtime=M.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit"),R.impl_runtime=M.source}for(let M of["impl_model","impl_effort","impl_speed"]){let q=Ot(t[M]),K=Ot(n[`quick_fix_${M}`]),U;q!==null?(U={value:q,source:"pin"},R[M]="pin"):M==="impl_model"&&X&&l!==null?(U={value:l,source:"global"},R[M]="quick_fix"):M!=="impl_model"&&K!==null?(U={value:K,source:"global"},R[M]="quick_fix"):(U=pr(M,{},n,Ot(f[M.replace("impl_","")])),R[M]=U.source),u[M]=U.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit")}}else for(let Y of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let L=pr(Y,t,n,Y==="impl_dispatch"?Ot(O.dispatch)||Ot(f.dispatch):Ot(f[Y.replace("impl_","")]));u[Y]=L.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}let ee=u.impl_dispatch.value==="main";if(ee?u.impl_dispatch.display=R.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(R.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":R.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let Y=u.impl_runtime.value==="inherit"?Ot(e.controller_runtime):u.impl_runtime.value,L=Y?mu(Y,o,s):[];m==="quick_fix"&&R.impl_model==="base"&&R.impl_runtime!=="base"&&L.length>0&&!L.includes(u.impl_model.value)&&(u.impl_model=ht("auto","base","auto","auto","default"));let I=u.impl_model.value;if(I!=="auto"&&L.length>0&&!L.includes(I))u.impl_model=Xs(u.impl_model);else{let P=Oa(I,Y,o,s);u.impl_model.display=to(P),u.impl_model.full_value=P,R.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let Y=Ot(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),L=Y?Ot(o.implementation?.effort_by_transport?.[Y]?.auto):null;L&&!Wm.has(L)?(u.impl_effort.display=`${L} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=L,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}R.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=ht(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=R.impl_speed==="quick_fix"?ht("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):Ln("default",u.impl_speed.source));for(let Y of["impl_runtime","impl_effort","impl_speed"])R[Y]==="quick_fix"&&u[Y].value!==null&&!u[Y].display.endsWith("(quick_fix)")&&(u[Y].display=`${u[Y].display} (quick_fix)`);if(m==="quick_fix"){l!==null&&!X&&a.offered&&(u.quick_fix_impl_model=Xs(ht(l,"global","",l,"explicit")));for(let[Y,L]of Object.entries(cu))!Y.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,Y)&&(u[Y]={...u[L]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=ht("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(ee)for(let Y of["impl_runtime","impl_model","impl_effort","impl_speed"])u[Y]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of Bm.filter(f=>!Um.includes(f)))u[d]=Ra(d,t,n);if(!o){for(let[d,f]of Object.entries(uu))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,f]of Object.entries(du))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of pu){if(!i){u[d]=Ra(d,t,n);continue}let f=d.replace("orchestration_",""),m=Ot(i[f]),g=`quick_fix_${d}`,v=e.route==="quick_fix"?Ot(n[g]):null,O=Ot(t[d]),R=O!==null?{value:O,source:"pin"}:v!==null?{value:v,source:"global"}:pr(d,{},n,m),X=O===null&&v!==null;if(d==="orchestration_effort"&&R.source==="base"){u[d]=ht(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(R.value===null){u[d]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let ee=R.source==="base"?Ot(i.model_id)||R.value:Oa(R.value,null,o,s);u[d]=ht(R.value,R.source,`${to(ee)}${X?" (quick_fix)":""}`,ee,R.source==="base"?"default":"explicit");continue}if(R.value==="default"){u[d]=X?ht("default","global","default (quick_fix)","default","explicit"):R.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):Ln("default",R.source);continue}u[d]=X?ht(R.value,"global",`${R.value} (quick_fix)`,R.value,"explicit"):Ln(R.value,R.source)}for(let d of fu){let f=cu[d];u[d]=u[f]?{...u[f]}:Ra(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=ht(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${to(d)})`,null,"default")}else if(a.runtime!==null){let d=Oa(l,a.runtime,o,s);u.quick_fix_impl_model=ht(l,"global",to(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=Xs(ht(l,"global","",null,"explicit")):u.quick_fix_impl_model=Ln(l,"global");return u}function Gm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Zs(e){let t=tn(e.pin)?e.pin:{},n=tn(e.global)?e.global:{},r=tn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let m={...r,...f};return Sn({pin:e.layer==="pin"?m:t,global:e.layer==="pin"?n:m,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Ot(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Gm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let m=o({...i,[e.key]:f})[e.key];return{value:f,label:m.display,full_value:m.full_value}})}}function Ym(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${An(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${An(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=f=>{typeof n.close=="function"&&n.close(),n.remove(),u(f)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function fr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await Ym(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function gu(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let f=!1,m=v=>{f||(f=!0,typeof r.close=="function"&&r.close(),r.remove(),d(v))},g=()=>m(i.value.trim());l.addEventListener("click",g),a.addEventListener("click",()=>m(null)),i.addEventListener("keydown",v=>{v.key==="Enter"&&(v.ctrlKey||v.metaKey)&&(v.preventDefault(),g())}),r.addEventListener("cancel",v=>{v.preventDefault(),m(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function no(e){let{context:t,transport:n,adopt:r}=e,o=await gu(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await fr(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";ge(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function Ia(e){return`session:${e.provider}:${e.session_id}`}function Lo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Vm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function ro(e,t,n,r){return{attempt_id:Ia(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Lo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Vm(e,n)}}}var La="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Qm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",hu="\uBD84\uD574 \uC5C6\uB294 leg";function Xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Kn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],oo=[...Kn,"reasoning_output_tokens"],Xm={codex:["implementation","review-consult"],claude:["subagent"]};function Da(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Kn.some(t=>Number.isFinite(e[t]))}function Zm(e){return!e||typeof e!="object"?!1:oo.some(t=>Number.isFinite(e[t]))}function Pa(e){let t=0;for(let n of Kn)t+=Xt(e?.[n]);return t}function Jm(e){return!e||typeof e!="object"?!1:Kn.some(t=>Number.isFinite(e[t]))}function bu(e){return!e||typeof e!="object"?!1:oo.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function eg(e){let t={};for(let n of oo)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function yu(e){let t={};for(let n of oo)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function vu(e,t){return Da(t)?Xt(t.total_tokens):e==="codex"?Xt(t.input_tokens)+Xt(t.output_tokens):Pa(t)}function tg(e){return e==="claude"?"Claude":"Codex"}function ng(e){return`\u03C4 ${wu(e)}`}function rg(e,t){let n=t.breakdown||{},r=Xt(t.total_only_subtotal);if(Da(n)||r>0&&!Zm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Qm];return t.replayed&&u.push(La),u.join(`
`)}let o=[`\uC785\uB825 ${Xt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Xt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${hu} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${hu}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(La),a.join(`
`)}function un(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${tg(n)} ${ng(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:rg(n,r)})}return t}function ei(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Xt(l.total_only_subtotal)+Xt(s.total_only_subtotal));for(let a of oo)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Xt(l.breakdown[a])+Xt(s.breakdown[a]));s.replayed&&(l.replayed=!0),i==="claude"&&(typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)?r.claude+=s.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ma(e){return!e||typeof e!="object"?null:tr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function og(e){return e==="codex"?"codex":"claude"}function Hn(){return{subtotal:0,breakdown:eg(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Js(e,t,n){e.subtotal+=t.subtotal,Da(t.usage)&&(e.total_only+=t.subtotal);for(let r of oo)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Xt(e.breakdown[r])+Xt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ku(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function wu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function so(e){return Jm(e)?`\u03C4 ${wu(Pa(e))}`:null}function er(e){let t=so(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Do(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Pa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(La),n.join(`
`)}function tr(e,t){let n={claude:Hn(),codex:Hn()},r={orchestrator:{claude:Hn(),codex:Hn()},implementation:{claude:Hn(),codex:Hn()},"review-consult":{claude:Hn(),codex:Hn()},subagent:{claude:Hn(),codex:Hn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(bu(a)){let d=og(l.runner),f=yu(a),m={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:vu(d,f)};f.replayed===!0&&(m.replayed=!0),typeof l.model=="string"&&(m.model=l.model),typeof l.session_id=="string"&&(m.session_id=l.session_id),Js(n[d],m,!0),Js(r.orchestrator[d],m,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let f=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Xm[f].includes(d.role)||!bu(d.usage))continue;let m=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!m||o.has(m))continue;o.add(m);let g=yu(d.usage),v={provider:f,role:d.role,attempt_id:String(l.attempt_id||""),usage:g,subtotal:vu(f,g)};v.receipt_id=m,typeof d.agent_type=="string"&&(v.agent_type=d.agent_type),typeof d.agent_id=="string"&&(v.agent_id=d.agent_id),typeof d.model=="string"&&(v.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(v.effort=d.effort),typeof d.session_id=="string"?v.session_id=d.session_id:typeof d.thread_id=="string"&&(v.session_id=d.thread_id),typeof d.turn_id=="string"&&(v.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(v.completed_at=d.completed_at),g.replayed===!0&&(v.replayed=!0),Js(n[f],v,!1),Js(r[v.role][f],v,!1)}}let i={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=ku(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),i[l]=u}if(Object.keys(i).length===0)return null;let s={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...ku(d,!0),legs:d.legs})}Object.keys(a).length>0&&(s[l]=a)}return{providers:i,roles:s}}var sg=".chip-popover, .judgement-chip";function io(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(sg)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function ao(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var $u={running:3,paused:2,failed:1};function nr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function xu(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Au(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),nr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!nr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),f=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!f&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=$u[u.run_state],f=$u[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var ti=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ig=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],Po=[...ti.filter(e=>e!=="impl_dispatch"),...ig,"base_sync_accept_local_commits","bdui_url"],Su=["base_sync_accept_local_commits"],Mo="true";function ni(e){let t={};if(!fn(e))return t;for(let[n,r]of Object.entries(e)){if(Su.includes(n)){r===!0&&(t[n]=Mo);continue}typeof r=="string"&&(t[n]=r)}return t}function Eu(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Dn=["orchestration_model","orchestration_effort","orchestration_speed"],lo=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],qa=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),co=[...ti,...Dn],ag=Po.filter(e=>co.includes(e));function lg(e,t){let n={},r=[];for(let[i,s]of Object.entries(qa)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(qa,i));return{values:n,warnings:r,skipped_keys:o}}var qo=["delegated","main"],ri=["inherit","claude","codex"],Gn=["default","fast"],No=["standard","fast_track"],jo=["codex","opus","fable","self","skip"],oi=["codex","fable","skip"],si=["low","medium","high","xhigh"],Tu=["default","fast"],wn="auto";function fn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Cu(e){if(!fn(e)||!fn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))fn(r)&&fn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function uo(e,t){let n=Cu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[wn,...r.flatMap(([,o])=>o)]}function Ou(e,t,n,r){if(!fn(e)||!fn(e.runners))return[wn];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!fn(s)||!fn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==wn&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[wn,...o]}function Lr(e,t,n){return Ou(e,t,n,(r,o)=>fn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ii(e,t,n){return Ou(e,t,n,(r,o)=>fn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:fn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function po(e,t){let n=Cu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Ru(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!uo(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Lr(t,o,r.impl_model||wn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var cg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ug={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},Na=[...ag,...Dn],dg=[...co,...Po].filter((e,t,n)=>n.indexOf(e)===t&&!Na.includes(e));function Iu(e,t){let n=fn(e)?e:{},r=fn(t)?t:{},o=[];for(let s of Na){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:cg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...dg,...Object.keys(r)])!Na.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Lu(e,t,n){let r=fn(e)?e:{},o=lg(fn(t)?t:{},n),i=[];for(let s of Object.values(qa)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:ug[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function ja(e,t,n,r,o,i,s=null){return Zs({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Du(e,t){let n={};for(let r of Po){let o=e?.[r],i=t?.[r];if(o!==i){if(Su.includes(r)){n[r]=i===Mo?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function Pu(e,t){let n={};for(let r of[...Dn,...lo]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var Fa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Dn]}],_r={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ai={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ba(e,t,n,r,o,i=null){let s=Sn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Mu(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of Ba(e,t,n,r,o,i))s[l.source]+=1;return s}function qu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Nu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var tx=[...ti,...Dn];var ju=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Fo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function li(e){if(!Fo(e)||!Fo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Fo(n)&&Fo(n.models));return t.length>0?t:null}function Pn(e,t){let n=li(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Fu(e,t){return Fo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Bu(e,t){let n=li(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Fu(r,r.models[t]);return[]}function pg(e){let t=li(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of Fu(r,o))n.includes(i)||n.push(i);return n}function fg(e,t){if(!t)return pg(e);let r=li(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of Bu(e,i))o.includes(s)||o.push(s);return o}function Uu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Pn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?Bu(t,r.impl_model):fg(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}var Ua=new Set(["unavailable","not_applicable"]);function mr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Wu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function gr(e,t){return t===null?null:`${_r[e]}: ${t.display} (${ai[t.source]})`}function Wa(e){return e.filter(t=>t!==null).join(`
`)}function za(e){if(typeof e!="object"||e===null)return null;let t=An(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Wa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(_r.orchestration_model,e.model),n(_r.orchestration_effort,e.effort),n(_r.orchestration_speed,e.speed)])}}function fo(e,t){let n=mr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=mr(e,"orchestration_effort"),o=mr(e,"orchestration_speed"),i=Wu([Pn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Wa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",gr("orchestration_model",n),gr("orchestration_effort",r),gr("orchestration_speed",o)])}}function _g(e,t){return e===null||e.value===null||Ua.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function mg(e){return e===null||Ua.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function gg(e){return e===null?null:e.value==="auto"?"auto":Ua.has(e.resolution)?null:e.display}function Dr(e,t){if(typeof e!="object"||e===null)return null;let n=mr(e,"impl_dispatch"),r=mr(e,"impl_runtime"),o=mr(e,"impl_model"),i=mr(e,"impl_effort"),s=mr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Wu([_g(r,t??null),mg(o),gg(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Wa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",gr("impl_dispatch",n),gr("impl_runtime",r),gr("impl_model",o),gr("impl_effort",i),gr("impl_speed",s)])}}var hg=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),bg=Object.freeze(["delivery_unproven:"]);function ci(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||hg.has(t))return"session";for(let n of bg)if(t.startsWith(n))return"session";return"settlement"}var yg=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var vg={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Ha(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>vg[n]||"").filter(n=>n.length>0)}var zu={orchestration_model:["fable"],impl_runtime:["claude"]},Ka={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Hu(e){return typeof e=="object"&&e!==null?e:null}function Ku(e,t){return typeof e=="string"&&t.includes(e)?e:""}function kg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>yg.includes(t))}function Bo(e,t=e){let n=Hu(e);if(!n)return null;let r=Ku(n.rec_orchestration_model,zu.orchestration_model);if(r.length===0)return null;let o=Ku(n.rec_impl_runtime,zu.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=Hu(t)||{},l=Object.keys(i),a=0,u=0;for(let f of l){let m=s[f];typeof m=="string"&&m.length>0&&(a+=1,m===i[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:kg(n.rec_reason),rec:i,state:d}}function ui(e){if(!e||typeof e!="object")return"";let t=Ha(e),n=Ka[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function di(e){return e.replace(/\/+$/,"")}function wg(e,t){let n=di(e),r=di(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function pi(e,t){let n=new Set;for(let r of e)for(let o of t){if(!wg(r,o))continue;let i=di(r),s=di(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function Ga(e,t){return`${e}\0${t}`}function Gu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Wo(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function Uo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Yu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Uo(o)})`,location_label:Uo(o),scope:null,same_lane_ahead:!1};let s=Wo(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function Vu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ga(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ga(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,m=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],g=o.get(u);if(g)for(let v of m){let O=r.get(v);O&&O!==u&&!g.includes(O)&&g.push(O)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);i(d,l)&&f&&u.push(f)}u.length>0&&s.set(l,u)}return s}function Qu(e,t){return Ga(e,t)}var $g=Object.freeze(["done","abandoned"]);function Xu(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!$g.includes(e.phase)}async function xg(e){let t=await gn(e);ge(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Pr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{xg(e)}}
    >
      ⧉
    </button></span
  >`}var Zu=Object.freeze(["spec_backed","full_plan","quick_fix"]);var Ag="worker-ineligible";function zo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ju(e){return zo(e).includes(Ag)}var Sg=new Set(Zu),ed=new WeakMap;function _o(e){return e&&typeof e=="object"?e:{}}function Eg(e){let t=ed.get(e);if(t)return t;let n=nd(e);return ed.set(e,n),n}function fi(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Tg(e,t){if(e.length===0)return null;if(Eg(t).has(e))return{lane:"running"};if(fi(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=fi(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=fi(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return fi(t.done,e)>=0?{lane:"done"}:null}function Ya(e,t){let n=Sg.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function Ho(e,t){let n=_o(e),r=_o(t),o=Xr(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof _o(n.metadata).route=="string"?_o(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&Ju(n.labels),u=Object.hasOwn(_o(n.metadata),"awaiting_user"),d=Tg(typeof n.id=="string"?n.id:"",r);return Ya({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Mr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function Ko(e){let t=_o(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function td(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function gi(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function sd(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function qr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function id(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function rd(e){return e==="auto"||e==="click"?e:null}function ad(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=rd(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=rd(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function ld(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function hi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Cg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:gi(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function cd(e,t){let n=Cg(e,t);return n?c`<button
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
            title=${n.deploy.at?rn(n.deploy.at):""}
            >${hi(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${qr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function mo(e){let t=mn(e.created_at),n=mn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${rn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${rn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Og(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Yo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Vo(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function bi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function yi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function ud(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function rr(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&Xu(m)).sort((m,g)=>(m.requested_at||0)-(g.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Og(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=ud(l),f=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:f,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function dd(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function mi(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=ud(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span
          >폐기 실패: ${t.error}${r?` \u2014 ${r}`:""}</span
        >`:""}
    <code>작업: ${n.operation_id}</code>
    ${o?c`<code>백업: ${o}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${i?.url?c`<a href=${i.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${i.number||"?"}</a
        >`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Rg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function pd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",i=r.state==="unique"?"unique":"unknown",s=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(s[u])?Number(s[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:i,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":i==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Rg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function vi(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Go(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Ig(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Va(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Lg(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function fd(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Mr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function Dg(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function ki(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Va(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Va(e.dependents),i=Va(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
        ${l?c`<span
              class=${`worker-dep worker-dep--armed${l.orphan?" worker-dep--armed-orphan":""}`}
              title=${l.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
              >${l.orphan?c`${l.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${l.lane_id}
                    >
                      해제
                    </button>`:l.label}</span
            >`:""}${n.map(d=>Go(d,"pred"))}${t}${o.map(d=>Go(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Go(d,"released"))}${i.map(d=>Go(Ig(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function _d(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Go({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function wi(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function $i(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Pg(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function md(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function xi(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${ui(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Mg={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function qg(e,t=!1){let n=gd(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function gd(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function hd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Ai(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Ng(e){let t=Array.isArray(e.badges)?e.badges:[],n=un(e.usage),r=er(e.usage),o=mn(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line${e.search_match===!1?" is-dimmed":""}"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${hd(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${rn(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(i=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${i}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    ${_d(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${Do(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${sd(e.work_kind)}
            >작업 ${qr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function go(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${t.nudgeable===!0?c`<button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-up"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 위로"
            aria-label="한 칸 위로"
          >
            ↑
          </button>
          <button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-down"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 아래로"
            aria-label="한 칸 아래로"
          >
            ↓
          </button>`:""}
    <button
      type="button"
      class="op-btn op-btn--icon worker-mini__rowops-remove"
      data-action="queue-remove"
      data-bead-id=${e.id}
      title="대기에서 빼기"
      aria-label="대기에서 빼기"
    >
      ✕
    </button>
  </span>`}function Mn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Ng(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=un(e.usage),i=er(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?mn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",g=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,v=e.lane==="done"?"":$i(e.workflow),O=e.lane==="done"?"":md(e.from_id),R=Ai(e.priority),X=c`<span class="worker-mini__title">${e.title}</span>`,ee=hd(e.pr_url,e.pr_number),Y=r.map(dt=>dt===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${dt}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${dt===e.completion_badge&&e.completion_title||""}
          >${dt}</span
        >`),L=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",I=o.length>0?o.map(dt=>c`<span class="worker-usage" title=${dt.tooltip}
              >${dt.label}</span
            >`):i?c`<span class="worker-usage" title=${Do(e.usage)}
            >${i}</span
          >`:"",P=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",j=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",V=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",M=e.discard,q=M?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${M?.attempt_id||""}
          data-operation-id=${M?.operation?.operation_id||""}
          data-discard-mode=${M?.confirmation||"unmerged"}
          ?disabled=${M?!M.enabled:e.discard_enabled===!1}
          title=${M?M.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${M?.label||"\uD3D0\uAE30"}
        </button>`:"",K=M?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${M.operation.operation_id}
        data-operation-kind=${M.operation.kind||""}
        data-last-error=${M.error||""}
        title=${M.abandon.title}
      >
        ${M.abandon.label}
      </button>`:"",U=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",te=M?.abandon.action?c`${q}${K}${U}`:c`${U}${q}`,be=e.stale_work||null,Ne=be?c`${be.can_resume||be.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${be.action_id}
            ?disabled=${be.locked}
          >
            기존 작업 이어가기
          </button>`:""}${be.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${be.action_id}
            ?disabled=${be.locked}
          >
            백업 후 새로 시작
          </button>`:""}${be.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${be.action_id}
            ?disabled=${be.locked}
          >
            다시 확인
          </button>`:""}`:"",F=be?c`<div class="worker-mini__stale">
        <strong>${be.title}</strong>
        <span>${be.summary}</span>
        <span>${be.cause}</span>
        ${be.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",J=e.revise_action?c`<button
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
        </button>`:"",he=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Re=xi(e.rec,hr(e,"rec")),C=qg(e,hr(e,"receipt")),se=wi(e.cross_lane_chip),ye=Pr(e.log_path),Ae=m||se||v||O||he||Re||C||I||ye?c`<div class="worker-chips">
          ${m}${se}${v}${O}${he?vi(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Re}${C}${I}${ye}${_i(e)}
        </div>`:"",Pe=ki(e.dependency_chips),ve=mi(e),Te=t.actions?t.actions:"",ut=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||M?.operation||e.revise_action||be);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${m}${g}${R}${O}${ee}${X}${Te}
          </div>
          ${_d(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${I}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${rn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${sd(e.work_kind)}
                  >작업 ${qr(e.work_ms)}</span
                >`:""}${Y}${P}
            <span class="worker-mini__actions"
              >${j}${V}${te}</span
            >
            ${mo(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${g}${R}${ee}${Y}${L}${Te}
            </div>
            <div class="worker-mini__body">${X}${F}</div>
            ${Pe}${Ae}${ut?c`<div class="worker-mini__foot">
                  ${P}
                  <span class="worker-mini__actions"
                    >${j}${V}${te}${J}${Ne}</span
                  >
                  ${mi(e)}
                </div>`:""}
            ${mo(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${g}${R}${X}${ee}${Y}${L}${P}${j}${V}${te}${Te}
            </div>
            ${Pe}${Ae}${ve} ${mo(e)}`}
  </div>`}function Xa(e,t){let n,r=[];for(let o of e){let i=o.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var bd={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Za(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Ka[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Ha(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=bd[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=fd(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=gd(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Mg[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var jg=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function Si(e,t){for(let n of jg){if(!t(n))continue;let r=Za(e,n);return r?{chip_key:n,content:r}:null}return null}function _i(e){return e.chip_popover?ao(e.chip_popover.content):""}function hr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Ja="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function el(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=bd[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,f=e.awaiting_user===!0,m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=hr(e,"spec_after_blocker"),v=Lg(e.spec_after_blocker===!0,g),O=fd(e),R=hr(e,"readiness"),X=Dg(O,R),ee=c`${v}${g?_i(e):""}${X}${R?_i(e):""}`,Y=ki(e.dependency_chips,v===""&&X===""?"":ee),L=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",I=wi(e.cross_lane_chip),P=$i(u),j=md(e.from_id),V=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),M=!r&&(e.blocked===!0||e.queue_placeable===!1);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${M?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Ai(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${hr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${hr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${xi(e.rec,hr(e,"rec"))}${Pg(u,hr(e,"qfr"))}
      ${g||R?"":_i(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Gs(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${Y}
    ${L||I||P||j||V?c`<div class="worker-chips">
          ${L}${I}${P}${j}${vi(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?c`<div class="worker-card__place-menu">
            ${Xa(t.lanes,e.id)}
            <button
              type="button"
              class="op-btn op-btn--icon worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
                  class="worker-card__reason${m?" worker-card__reason--danger":""}"
                  >${e.reason}</span
                >`:""}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). queue_placeable 하나가 준비도
                 세그먼트와 같은 자격을 말하며, blocked 자체는 막지 않는다.
                 포인터 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="op-btn op-btn--primary worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!i}
              title=${Mr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:f,missing_description:d,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${mo(e)}
  </div>`}function Yn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${pn(e.id||void 0)}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<header class="worker-pane__hd">
          <button
            type="button"
            class="worker-pane__toggle"
            data-lane=${e.lane}
            aria-expanded=${t?"false":"true"}
          >
            <span class="worker-pane__caret" aria-hidden="true"
              >${t?"\u25B8":"\u25BE"}</span
            >
            ${r}
          </button>
          ${t||!e.header_control?"":e.header_control}
        </header>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.header_row?e.header_row:""}${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(o=>e.lane==="candidate"?el(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Mn(o))}
          </div>`}
  </section>`}function od(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Ei(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${od("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${pn(r.drop)}
            data-root-dir=${pn(r.root_dir)}
            data-lane-id=${pn(r.lane_id)}
            data-lane-length=${pn(r.lane_length)}
          >
            ${t.rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:t.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${n.collapsed?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${od("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Fg(o))}
          </div>`}
    </section>
  </div>`}function Fg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Yn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${pn(t.drop)}
        data-root-dir=${pn(t.root_dir)}
        data-lane-id=${pn(t.lane_id)}
        data-lane-length=${pn(t.lane_length)}
      >
        ${e.rows.length===0?c`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`:e.rows}
      </div>`})}
    ${e.empty?c`<div class="worker-wait__hint">${e.title} · 비어 있음</div>`:""}
    ${e.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:""}
    ${e.after?e.after:""}
  </div>`}function Ti(e){return e.count?c`<section
    class="worker-now${e.live?" worker-pane--live":""}"
    id="worker-now"
  >
    <header class="worker-now__hd">
      <span
        class="worker-pane__dot worker-pane__dot--running"
        aria-hidden="true"
      ></span>
      <span class="worker-now__title">지금</span>
      <span class="worker-now__count">${e.count}</span>
    </header>
    ${e.running_body?e.running_body:""}
    ${e.pr_wait_rows?e.pr_wait_rows:""}
  </section>`:""}var yd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Qo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ci(e,t){let n=yd.find(o=>o.step===e);if(!n)return null;let r=yd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function vd(e){let t=Qo.findIndex(n=>n.step===e);return Qo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Nr(e){let t=Qo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Bg(e){let t=Qo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Qo.length}}function Oi(e){let t=Bg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var nl=new Set(["queued","running","retry_pending"]),kd=new Set(["failed","succeeded"]),Ug={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Xo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Wg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Xo.base_containment,child_sweep:Xo.child_sweep,branch_cleanup:Xo.branch_cleanup,parent_close:Xo.parent_close};function zg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Hg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...nl,...kd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Kg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function tl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=Ug[o];if(!i)return null;let s=Ci(n,`${r} ${i}`);return s?{...s,active:nl.has(o),failed:o==="failed"}:null}function Gg(e){return!e||typeof e!="object"?null:Wg[e.step]||null}function Zo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Gg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=zg(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(v=>v&&typeof v=="object"&&Hg(v,t,l)).sort(Kg):[],u=s?a:[],d=u.find(v=>nl.has(v.state));if(d)return tl(d);if(o)return o.step==="repo_operations"&&a[0]?tl(a[0],!0):null;let f=u.find(v=>kd.has(v.state)?v.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return tl(f);if(r){let v=Ci(r.step,r.label);return v?{...v,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?Xo[e.cleanup_cursor]:null;if(!m)return null;let g=Ci(m.step,m.label);return g?{...g,active:!0,failed:!1}:null}function Ri(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Yg="\uBBF8\uC801\uC7AC";function rl(e,t){let n=Zn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Vg=10080*60*1e3;function wd(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Vg)return null;let o=Zn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${rn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?i.length>0&&(s.openable=!0,s.root_dir=i):s.openable=!0,s}function $d(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Zn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function xd(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=rl(i,{id:a,location_label:o.get(a)||Yg}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(i,l)}return r}var Li=1,Jo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],es=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],ho={show_blocked:!0,readiness:"all"},Ad={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Qg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!nr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Xg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!nr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function nd(e){let t=at(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Id(at(t.attempts),n).keys())}function Id(e,t,n={}){let{winners:r,resumed_from_ids:o}=Au(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Dd(a))continue;let d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,g=ci(a.quickfix_landing)==="session",v=u!=="running"&&(f||!g)&&!o.has(a.attempt_id),O=!f&&g?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,R=at(n.observations?.[s]),X=at(R.pr),ee=typeof a.merge_sha=="string"&&a.merge_sha.length>0||X.state==="MERGED",Y=rr(n.discard_operations,s,{attempt_id:a.attempt_id,merged:ee}),L=u==="failed"?Ed(a,{resume_eligible:v,resume_reason:O,confirmation:Y.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Sd(a,e,u),started_at:d,...L?{failure:L}:{},can_pause:u==="running"&&f,can_resume:v})}for(let[s,l]of sh(e,t)){if(i.has(s))continue;let a=l.attempt,u=rr(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Pd(a),f=l.run_state==="provider_hold"?rh(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Sd(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Ed(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:Zg(a)}:{},...f?{hold:f}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Sd(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:tr(t,e.bead_id)}}function Ed(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Pd(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:dd(e),confirmation:t.confirmation,...Ld(t.history)}}function Ld(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Zg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Dd(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function Jg(e,t){let n=typeof e.runner=="string"?e.runner:"",r=at(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function eh(e,t){if(e===null)return null;let n=at(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function th(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function nh(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||th(e,r.attempts)?"disarmed":null}function rh(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=Jg(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=nh(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,f=eh(s,t.account_catalog),m=Ld(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...f?{account_alias:f}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},...m.log_path?{log_path:m.log_path}:{}}}function Pd(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var oh=new Set(["parked","retry_wait","waiting"]);function sh(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&nr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Dd(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!nr(s)||!oh.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function Td(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function at(e){return e&&typeof e=="object"?e:{}}function ih(e){let t=at(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ah(e,t,n){let r=at(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=m=>Sn({pin:m,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Cd(fo(a,i),fo(u,i)),f=Cd(Dr(a,null),Dr(u,null));return d||f?{orchestration:d,worker:f}:null}function Cd(e,t){return!e||t&&t.text===e.text?null:e}function lh(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=wd(e,s,n);l&&i.push(l)}return i.length===0?null:i}function il(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var ch=new Set(["quick_fix","spec_backed","full_plan"]);function Od(e){return typeof e=="string"&&ch.has(e)}function uh(e){let t={...at(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function dh(e,t,n){let r=e.runner_catalog??null,o=sl(e,t,n,null);if(!o)return null;let i=Pn(r,o.orchestration_model.value??""),s=i===null?o:sl(e,t,n,i)||o,l=fo(s,r),a=Dr(s,i);return l||a?{orchestration:l,worker:a}:null}function sl(e,t,n,r){let o=Od(n)?n:Od(t.route)?t.route:null;try{return Sn({pin:t,global:uh(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function ph(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Dr(sl(e,at(t.metadata),t.route,n),n)}function al(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function fh(e){let t={};for(let l of Kn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Kn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?un(ei(s)):n?er(t):null}function Md(e,t){let n=Wo(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function _h(e,t,n){let r=t.get(e);if(!r)return Md(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Uo(r)}function mh(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&Wo(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":Md(e,n),title:""};if(s.state==="runnable"&&i&&Wo(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Uo(s),title:""}}function gh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function hh(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function bh(e,t,n,r,o,i,s,l){let a=[];return e.forEach((u,d)=>{let f=typeof u.id=="string"?u.id:"";if(f.length===0)return;let m=u.status==="confirmed"?"confirmed":"draft",g=Array.isArray(u.entries)?u.entries:[],v=[];g.forEach((ee,Y)=>{let L=ee&&typeof ee.bead_id=="string"?ee.bead_id:"";if(L.length===0)return;let I=ee&&typeof ee.root_dir=="string"?ee.root_dir:"",P=n.get(L),j=P?P.state:void 0,V=j==="running"||j==="pr_wait"||j==="done",M=!P||j==="runnable",q=P&&P.lane==="parallel"&&typeof P.position=="number"?P.position-1:null,K=mh(L,n,r,t,l,m==="confirmed"),U=v.length>0?v[v.length-1]:null,te=m==="confirmed"&&U!==null&&!U.done&&!(t.get(L)||[]).includes(U.id);v.push({id:L,title:o.get(L)||L,root_dir:P?P.root_dir:I,workspace_name:P?P.workspace_name:i.get(I)||"",seq:Y+1,location_label:K.label,location_title:K.title,draggable:!V,fixed:V,done:j==="done",unplaced:M,mismatch:te,...q!==null?{queue_index:q}:{}})}),v.forEach((ee,Y)=>{ee.seq=Y+1});let O=v.length>0&&v.every(ee=>ee.done),R=v.filter(ee=>!ee.fixed&&s.armed_by_bead.get(ee.id)!==f).map(ee=>ee.id),X=hh(f,m,v,O,R,s);a.push({lane_id:f,status:m,draft:m==="draft",number:d+1,label:`\uC5F0\uACB0 ${d+1} \xB7 \uB808\uD3EC \uAC04`,rows:v,all_done:O,can_confirm:m==="draft"&&v.length>=2,has_mismatch:m==="confirmed"&&v.some(ee=>ee.mismatch),unlaunched:R,...X})}),a}function yh(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function vh(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:m}=yh(a,t,n);m!==void 0&&(a.scope_state=m),i.set(u,{cards:[a],scope:f})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let m of a.cards)m.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=s.get(d);f?f.push(a):s.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],m={id:f.id,title:f.title,location_label:_h(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let g of a.cards)g.overlap_chips?g.overlap_chips.push(m):g.overlap_chips=[m]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=pi(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function Rd(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Zn(e.id,t),i=typeof e.root_dir=="string"?e.root_dir:"",s=typeof r=="string"&&r.length>0?r:o&&i.length>0?i:"";return s.length>0?{openable:!0,root_dir:s}:o?{openable:!0}:{}}function kh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Zn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function ol(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ii(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function wh(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function $h(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function br(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...ho,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Jo.some(w=>w.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),m=new Map;for(let w of o)w&&typeof w.root_dir=="string"&&m.set(w.root_dir,w);let g=new Map;for(let w of o)w&&typeof w.root_dir=="string"&&g.set(w.root_dir,w.name||w.root_dir);for(let w of r)w&&typeof w.root_dir=="string"&&g.set(w.root_dir,w.name||w.root_dir);let v=[],O=[],R=[],X=[],ee=[],Y=[],L=new Map,I=new Map,P=new Map,j=new Map,V=new Map,M=new Map,q=new Map,K=new Map,U=new Map,te=new Map,be=new Map,Ne=new Map,F=new Map,J=new Map,he=new Set,Re=new Map,C=new Map,se=new Map;for(let w of r){if(!w||typeof w.root_dir!="string")continue;let Z=w.root_dir,Ce=w.name||Z,Ye=m.get(Z),Ke=Ye&&typeof Ye.revision=="number"?Ye.revision:typeof w.revision=="number"?w.revision:0,je=at(w.attempts),Et=at(w.bead_titles);for(let[p,_]of Object.entries(Et))typeof _=="string"&&_.length>0&&se.set(p,_);let Pt=at(w.bead_times),rt=at(w.pr_observations),Tt=at(w.admission);for(let[p,_]of Object.entries(Tt))_&&typeof _=="object"&&be.set(p,_);let jt=at(w.revise_parked),It=at(w.merge_queue_state),Ut=at(w.cleanup_failed),ae=at(w.discard_operations),we=at(w.bead_timelines),Ge=at(w.bead_blocked_by);Object.hasOwn(w,"bead_scope")&&Re.set(Z,at(w.bead_scope));let ot=at(w.bead_workflow),et=at(w.pr_activity),mt=Array.isArray(w.repo_operations)?w.repo_operations:[];K.set(Z,mt);let bt=typeof w.declared_base=="string"?w.declared_base:null;q.set(Z,bt),M.set(Z,Object.entries(Ut).map(([p,_])=>({bead_id:p,step:_&&_.step?_.step:"",reason:_&&_.reason?_.reason:"",at:_&&typeof _.at=="number"?_.at:null,detail:_&&typeof _.detail=="string"?_.detail:null,output_tail:_&&typeof _.output_tail=="string"&&_.output_tail?_.output_tail:void 0,log_path:_&&typeof _.log_path=="string"&&_.log_path?_.log_path:void 0,retry_count:_&&typeof _.retry_count=="number"&&Number.isInteger(_.retry_count)&&_.retry_count>0?_.retry_count:0,failure_code:_&&typeof _.failure_code=="string"?_.failure_code:void 0})));for(let[p,_]of Object.entries(at(w.bead_overlay)))_&&typeof _=="object"&&U.set(`${Z}\0${p}`,_);let tt=new Map;for(let p of Object.values(je))p&&typeof p.attempt_id=="string"&&tt.set(p.attempt_id,p);let me=Array.isArray(w.merge_queue)?w.merge_queue:[],A=new Set(me.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),N=new Map(me.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),ie=new Map,Se=new Map,_e=new Map,gt=new Map;me.forEach((p,_)=>{p&&typeof p.bead_id=="string"&&(ie.set(p.bead_id,_+1),Se.set(p.bead_id,p.resolution),_e.set(p.bead_id,p.continuation_action||null),gt.set(p.bead_id,p.authority||null))});let kt=at(w.auto_merge_skips),wt=p=>{let _=kt[p];if(!_)return null;let x=at(at(rt[p]).pr).head_sha;return x&&x===_.head_sha?_.reason||"":null};V.set(Z,{positions:ie,resolutions:Se,continuations:_e,authorities:gt,state:{active:typeof It.active=="string"?It.active:null,failures:at(It.failures),waiting:It.waiting&&typeof It.waiting.bead_id=="string"&&typeof It.waiting.reason=="string"?It.waiting:null},auto_excluded:(Array.isArray(w.pr_wait)?w.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&wt(p)!==null),running:me.length>0});let $t=Array.isArray(w.queue)?w.queue:[];for(let p of[...$t,...Array.isArray(w.pr_wait)?w.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&F.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(w.disarmed_on_load)?w.disarmed_on_load:[])typeof p=="string"&&p.length>0&&he.add(p);let Kt=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Wt=at(w.lane_states),zt=typeof w.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(w.serial_lane_count))):Math.min(5,Kt.length);P.set(Z,zt),j.set(Z,$t.length);let St=new Map(Kt.map(p=>[p.id,p])),nn=new Map;for(let p of Kt)for(let _ of p.entries)_&&typeof _.bead_id=="string"&&nn.set(_.bead_id,p.id);for(let[p,_]of Object.entries(at(w.bead_dependents))){let x=Array.isArray(_?.ids)?_.ids:[],z=at(_?.root_dirs),H=Ne.get(p)||{ids:new Set,root_dirs:{}};for(let le of x)typeof le=="string"&&le.length>0&&H.ids.add(le);for(let[le,Ie]of Object.entries(z))typeof Ie=="string"&&Ie.length>0&&(H.root_dirs[le]=Ie);Ne.set(p,H)}for(let[p,_]of Object.entries(Ge))Array.isArray(_)&&te.set(p,_.filter(x=>typeof x=="string"&&x.length>0));let Zt=Array.isArray(w.done)?w.done:[];for(let p of Zt)p&&typeof p.bead_id=="string"&&Y.push({id:p.bead_id,root_dir:Z,workspace_name:Ce});let qt=new Map;for(let p of Zt)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&qt.set(p.bead_id,p.added_at);let Rt=p=>({id:p,title:Et[p]||p,root_dir:Z,workspace_name:Ce,expected_revision:Ke,draggable:!1,...at(Pt[p]).created_at?{created_at:at(Pt[p]).created_at}:{},...at(Pt[p]).updated_at?{updated_at:at(Pt[p]).updated_at}:{}}),Jt=p=>{let _=ot[p]?.chips?.pr;return _&&typeof _.number=="number"&&typeof _.url=="string"?{pr_number:_.number,pr_url:_.url}:{}},Ee=p=>Object.hasOwn(Ge,p)?{blocked_by:Array.isArray(Ge[p])?Ge[p].filter(_=>typeof _=="string"&&_.length>0):[]}:{},T=(p,_)=>{let x=Ee(p),z=Tt[p],H=z&&z.reason==="prerequisite_unmet"&&Array.isArray(z.blockers)?z.blockers:[],le=[...(_?.blockers||[]).map(nt=>nt.id),...H.map(nt=>nt.id)].filter(nt=>typeof nt=="string"&&nt.length>0);if(le.length===0)return x;let Ie=[...x.blocked_by||[]];for(let nt of le)Ie.includes(nt)||Ie.push(nt);return{blocked_by:Ie}},de=new Set;for(let[p,_]of Id(je,qt,{discard_operations:ae,observations:rt,bead_timelines:we,provider_hold:at(w.provider_hold),auto_resume_pending:Array.isArray(w.auto_resume_pending)?w.auto_resume_pending:[],account_catalog:at(w.account_catalog)})){de.add(p);let x=_.run_state==="failed"?gh(je,_.attempt_id):null;x!==null&&J.set(p,x);let z=tt.get(_.attempt_id)||null,H=U.get(`${Z}\0${p}`),le=H&&H.rollup?H.rollup:null,Ie=il(bt,z?z.target_base:null),nt=z?al(z,tt):!1,$e=z&&z.quickfix_lane===!0&&z.quickfix_landing&&typeof z.quickfix_landing=="object"?z.quickfix_landing:null,$=$e&&typeof $e.reason=="string"&&$e.reason.length>0?$e.reason:null,S=$e?Zo({bead_id:p,merge_sha:$e.head_sha,cleanup_cursor:$e.cursor,cleanup_failed:$?{step:$e.cursor,reason:$}:null,repo_operations:mt}):null;O.push({...Rt(p),lane:"running",...T(p,_.wait),...nn.has(p)?{serial_lane_id:nn.get(p)}:{},attempt_id:_.attempt_id,run_state:_.run_state,status:_.status||void 0,workflow:ot[p]||null,can_pause:_.can_pause,can_resume:_.can_resume,started_at:_.started_at,last_event_at:_.last_event_at,last_activity:_.last_activity,legs:_.legs,runner:_.runner,model:_.model,effort:_.effort,speed:_.speed,resumed_from:_.resumed_from,continuation_mode:_.continuation_mode,usage:_.usage,failure:_.failure||null,hold:_.hold||null,wait:_.wait||null,retry:_.retry||null,exec_chips:{orchestration:za(_),worker:ph(at(Ye),H,_.runner||null)},discard:rr(ae,p,{attempt_id:_.attempt_id,merged:_.failure?.confirmation==="merged"||at(rt[p]).pr?.state==="MERGED"}),...le?{rollup:le}:{},...nt?{conflict_resolution:!0}:{},...Ie?{base_exception:Ie}:{},...S?{landing:S}:{},badges:_.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:_.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:_.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:_.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:_.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:_.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:_.run_state==="failed"})}for(let[p,_]of xu(je)){if(O.some(z=>z.id===p))continue;let x=_.attempt;O.push({...Rt(p),lane:"running",kind:"session",...Ee(p),attempt_id:typeof x.attempt_id=="string"?x.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ot[p]||null,can_pause:!1,can_resume:!1,started_at:_.started_at,last_event_at:typeof x.last_event_at=="number"?x.last_event_at:null,last_activity:x.last_activity&&typeof x.last_activity=="object"?x.last_activity:null,legs:Array.isArray(x.legs)?x.legs:[],runner:typeof x.runner=="string"?x.runner:null,model:typeof x.model=="string"?x.model:null,effort:typeof x.effort=="string"?x.effort:null,speed:typeof x.speed=="string"?x.speed:null,resumed_from:null,continuation_mode:null,usage:x.usage&&typeof x.usage=="object"?x.usage:null,exec_chips:{orchestration:za(x),worker:null},discard:rr(ae,p,{merge_queued:!0}),badges:[_.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(w.session_active)?w.session_active:[]){let _=p&&p.bead_id;typeof _!="string"||de.has(_)||(de.add(_),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&te.set(_,p.blocked_by.filter(x=>typeof x=="string"&&x.length>0)),typeof p.title=="string"&&p.title.length>0&&se.set(_,p.title),O.push({...Rt(_),title:p.title||Et[_]||_,lane:"running",kind:"session",status:"in_progress",started_at:ol(p.started_at)??ol(p.updated_at)??void 0,updated_at:ol(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(x=>typeof x=="string"&&x.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(w.pr_wait)?w.pr_wait:[]){let _=p&&p.bead_id;if(typeof _!="string"||de.has(_))continue;de.add(_);let x=at(rt[_]),z=at(x.pr),H=x.gate?at(x.gate):null,le=A.has(_),Ie=N.get(_)?.continuation_action||null,nt=!!Ie&&Ie.continuation===null,$e=It.active===_,$=p.external===!0,S=Ut[_]||null,Me=at(et[_]),Oe=Zo({bead_id:_,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:Me.merge_progress||null,cleanup_failed:S,repo_operations:mt}),Xe=Ri(Oe),xt=!!H&&H.base_badge==="\uCDA9\uB3CC",Nt=!!S&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(S.step)&&!!H&&H.tier==="merged",en=$&&!!S&&!!H&&H.tier==="merged",zr=!!H&&["closed_unmerged","review","undecidable"].includes(H.tier),$n=rr(ae,_,{external:$,merge_active:$e||Oe?.step==="merge",merge_queued:le,cleanup_active:Xe,merged:!!S||H?.tier==="merged"}),Ar=!!$n.operation,Hr=ih(x.receipt_check);R.push({...Rt(_),lane:"pr_wait",...Ee(_),...Hr.length>0?{receipt_badge:{codes:Hr}}:{},workflow:ot[_]||null,pr_number:typeof z.number=="number"?z.number:null,pr_url:typeof z.url=="string"?z.url:void 0,external:$,usage:tr(je,_),merge_step:Oe,badges:nt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Oe?[H?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:S?[Nr(S.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Nr(S.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof H?.gate_badge=="string"&&H.gate_badge.length>0?[H.gate_badge]:[],alert:Oe?Oe.failed===!0:!!S||zr,reason:S&&Oe?.active!==!0?Oi(S.step):"PR \uB300\uAE30",merge_action:H?.tier==="merged"&&!Nt&&!en?!1:!le||nt,merge_enabled:!Ar&&(nt||H?.enabled===!0||xt||Nt||en),merge_label:nt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":en||Nt?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":xt&&!Nt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:nt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ar?$n.error?`\uD3D0\uAE30 \uC2E4\uD328: ${$n.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${$n.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:en?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Nt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":xt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":H?.enabled===!0?`\uBA38\uC9C0 (${H.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${H?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:le&&!nt,cancel_enabled:!$e,continuation_mismatch:Ie?.mismatch||null,discard:$n,discard_action:$n.action,discard_enabled:$n.enabled,discard_title:$n.title})}let De=(p,_,x,z)=>{let H=p&&p.bead_id;if(typeof H!="string"||de.has(H))return null;de.add(H);let le=jt[H],Ie=rr(ae,H),nt=Ie.operation?Ie:null,$e={...Rt(H),lane:_,workflow:ot[H]||null,draggable:!nt,discard:nt||void 0,reason:Td(Tt,H),seq:x+1,queue_position:x+1,queue_index:x,queue_length:z,badges:le?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!le,revise_action:!!le,revise_enabled:!!le&&!nt,revise_title:le?le.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${le.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},$=T(H,null);return Object.hasOwn($,"blocked_by")&&($e.blocked_by=$.blocked_by),$e};for(let p=0;p<$t.length;p++){let _=De($t[p],"queue",p,$t.length);if(!_)continue;X.push(_);let x=L.get(Z);x?x.push(_):L.set(Z,[_])}let yt=p=>{let _=R.find(le=>le.id===p&&le.root_dir===Z);if(_)return{id:p,title:_.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let x=O.find(le=>le.id===p&&le.root_dir===Z),z=x?x.run_state:Qg(je,p),H=z==="failed"||z==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":z==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:x?x.title:Rt(p).title,badge:H}},Qe=[];for(let p=0;p<Math.max(zt,Kt.length);p++){let _=`s${p+1}`,x=St.get(_),z=x&&Array.isArray(x.entries)?x.entries:[],H=at(Wt[_]),le=Array.isArray(H.occupied_by)?H.occupied_by.filter($e=>typeof $e=="string"):[],Ie=new Set(le),nt=[];for(let $e=0;$e<z.length;$e++){let $=z[$e]&&z[$e].bead_id;if(typeof $=="string"&&Ie.has($)){de.add($);continue}let S=De(z[$e],_,$e,z.length);S&&(nt.push(S),X.push(S))}nt.length===0&&le.length===0&&(zt<=1||p>=zt)||Qe.push({id:_,index:p,items:nt,raw_length:z.length,occupied_by:le,occupants:le.map($e=>yt($e)),corrections:Array.isArray(H.corrections)?H.corrections.length:0,cycle:H.cycle===!0,...nt.length===0&&le.length===0?{empty:!0}:{}})}I.set(Z,Qe);let y=Array.from({length:zt},(p,_)=>{let x=`s${_+1}`,z=St.get(x),H=z&&Array.isArray(z.entries)?z.entries:[],le=at(Wt[x]);return{id:x,index:H.length,length:H.length,occupied_by:Array.isArray(le.occupied_by)?le.occupied_by.filter(Ie=>typeof Ie=="string"):[]}});for(let p of Array.isArray(w.runnable)?w.runnable:[]){let _=p&&p.bead_id;if(typeof _!="string"||de.has(_))continue;de.add(_);let x=p.workflow&&typeof p.workflow=="object"?p.workflow:null,z=x&&typeof x.route=="string"&&x.route||(typeof p.route=="string"?p.route:null),H=ah(at(Ye),p.exec_pins,z),le=Bo(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&te.set(_,p.blocked_by.filter(en=>typeof en=="string"&&en.length>0)),typeof p.title=="string"&&p.title.length>0&&se.set(_,p.title),Array.isArray(p.scope)&&C.set(_,p.scope.filter(en=>typeof en=="string"&&en.length>0));let Ie=Object.hasOwn(p,"eligible"),$e=!Ie&&Object.hasOwn(p,"route")&&Object.hasOwn(p,"spec_state")&&Object.hasOwn(p,"has_description")&&Object.hasOwn(p,"awaiting_user")&&Object.hasOwn(p,"worker_ineligible")?Ya({route:typeof p.route=="string"?p.route:"",spec:p.spec_state,has_description:p.has_description===!0,awaiting_user:p.awaiting_user===!0,worker_ineligible:p.worker_ineligible===!0},null):null,$=Ie?p.eligible!==!1:$e?$e.placeable:!0,S=$e?$e.worker_ineligible:p.worker_ineligible===!0,Me=$&&!S,Oe=$e?{route_ok:$e.route_ok,awaiting_user:$e.awaiting_user,missing_description:$e.missing_description,placement_spec:$e.spec}:Object.hasOwn(p,"route_ok")?{route_ok:p.route_ok===!0,awaiting_user:p.awaiting_user===!0,missing_description:p.missing_description===!0,placement_spec:p.placement_spec}:null,Xe=[];!Ie&&$e&&!$e.placeable&&Xe.push(Mr($e)),typeof p.reason=="string"&&p.reason.length>0&&Xe.push(p.reason);let xt=Td(Tt,_);xt&&Xe.push(xt);let Nt=lh(_,p.release_info,f)?.map(en=>({...en,...Rd({id:_,root_dir:Z},en.id)}));v.push({...Rt(_),title:p.title||Et[_]||_,lane:"runnable",draggable:!Ie&&Me,queue_placeable:Me,...Oe||{},...S?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...Nt?{dependency_chips:{released:Nt}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:Xe.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:x||(z?{route:z,chips:{route:z}}:null),...H?{exec_chips:H}:{},...le?{rec:le}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(en=>typeof en=="string"&&en.length>0)}:{},place_index:$t.length,place_lanes:y})}for(let p of Zt){let _=p&&p.bead_id;if(typeof _!="string"||de.has(_)||(de.add(_),i!==void 0&&typeof p.added_at=="number"&&p.added_at<i))continue;let x=Xg(je,_),z=x&&typeof x.done_kind=="string"?x.done_kind:null;ee.push({...Rt(_),lane:"done",done:!0,done_layout:"three_line",usage:tr(je,_),work_ms:ld(je,_),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:z,...Jt(_),badges:[...z&&Ad[z]?[Ad[z]]:[],...id(je,_)]})}for(let p of Array.isArray(w.session_done)?w.session_done:[]){let _=p&&(p.id||p.bead_id);typeof _!="string"||de.has(_)||(de.add(_),ee.push({...Rt(_),...p,id:_,root_dir:Z,workspace_name:Ce,expected_revision:Ke,lane:"done",done:!0}))}}if(U.size>0)for(let w of[...v,...X,...O,...R,...ee]){let Z=U.get(`${w.root_dir}\0${w.id}`);if(!Z||(typeof Z.priority=="number"&&(w.priority=Z.priority),typeof Z.from_id=="string"&&Z.from_id.length>0&&(w.from_id=Z.from_id),w.lane==="done"&&Array.isArray(Z.carried_to)&&Z.carried_to.length>0&&(w.carried_to=Z.carried_to),!Object.hasOwn(Z,"metadata")))continue;let Ce=at(Z.metadata);if(w.rec=Bo(Ce),w.lane==="runnable"||w.lane.startsWith("s")||w.lane==="queue"){let Ye=dh(at(m.get(w.root_dir)),Ce,typeof Z.route=="string"&&Z.route.length>0?Z.route:at(w.workflow).route);Ye&&(w.exec_chips=Ye)}}let ye=new Map;o.forEach((w,Z)=>{w&&typeof w.root_dir=="string"&&ye.set(w.root_dir,Z)});let Ae=n&&n.running_sort==="repo"?"repo":"started";O.sort((w,Z)=>{let Ce=w.kind==="session",Ye=Z.kind==="session";if(Ce!==Ye)return Ce?1:-1;if(Ce&&Ye){let Et=Ii(Z.updated_at)-Ii(w.updated_at);return Et!==0?Et:w.id.localeCompare(Z.id)}if(Ae==="repo"){let Et=ye.get(w.root_dir)??Number.MAX_SAFE_INTEGER,Pt=ye.get(Z.root_dir)??Number.MAX_SAFE_INTEGER;if(Et!==Pt)return Et-Pt}let Ke=typeof w.started_at=="number"&&Number.isFinite(w.started_at)?w.started_at:null,je=typeof Z.started_at=="number"&&Number.isFinite(Z.started_at)?Z.started_at:null;return Ke!==null&&je!==null&&Ke!==je?Ke-je:Ke===null&&je!==null?1:Ke!==null&&je===null?-1:w.id.localeCompare(Z.id)}),ee.sort((w,Z)=>(Z.done_at??0)-(w.done_at??0));let Pe=o.length>0?o:r.map(w=>({root_dir:w&&w.root_dir,name:w&&w.name,auto_advance:w&&w.auto_advance,auto_merge:w&&w.auto_merge,slots:w&&w.slots,revision:w&&w.revision,runner_catalog:w&&w.runner_catalog})),ve=new Set(v.map(w=>w.root_dir)),Te=new Map;for(let w of O)w.kind==="session"||w.run_state!=="running"||Te.set(w.root_dir,(Te.get(w.root_dir)||0)+1);let ut=new Map;for(let w of ee){let Z=ut.get(w.root_dir);Z?Z.push(w):ut.set(w.root_dir,[w])}let dt={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},G=[];for(let w of Pe){if(!w||typeof w.root_dir!="string")continue;let Z=L.get(w.root_dir)||[],Ce=I.get(w.root_dir)||[],Ye=Z.length>0||Ce.some(Et=>Et.items.length>0||Et.occupied_by.length>0);if(u!=="all"&&!Ye&&!ve.has(w.root_dir))continue;let Ke=typeof w.slots=="number"&&w.slots>=Li?w.slots:Li,je=Te.get(w.root_dir)||0;G.push({live_count:je,over_cap:je>Ke,merge:V.get(w.root_dir)||dt,token_total:fh(ut.get(w.root_dir)||[]),cleanup_failures:M.get(w.root_dir)||[],declared_base:q.get(w.root_dir)??null,repo_operations:K.get(w.root_dir)||[],root_dir:w.root_dir,name:w.name||w.root_dir,auto_advance:w.auto_advance===!0,auto_merge:w.auto_merge===!0,slots:Ke,revision:typeof w.revision=="number"?w.revision:0,runner_catalog:at(w.runner_catalog),items:Z,sublanes:{parallel:Z,serial:Ce},serial_lane_count:P.get(w.root_dir)||0,raw_queue_length:j.get(w.root_dir)||0})}let re={runnable:v,runnable_all:v,runnable_hidden:{blocked:0,readiness:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:X,queue_groups:G,running:O,pr_wait:R,done:ee,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(j),owner_of:{}},ne=Gu(re);for(let w of Y)ne.has(w.id)||ne.set(w.id,{root_dir:w.root_dir,workspace_name:w.workspace_name,lane:"done",state:"done"});for(let w of[...re.queue,...re.runnable,...re.running,...re.pr_wait]){if(!Object.hasOwn(w,"blocked_by"))continue;let Z=ne.get(w.id);w.blockers=(w.blocked_by||[]).map(Ce=>Yu(Ce,Z,ne,o))}for(let w of[...re.queue,...re.runnable,...re.running,...re.pr_wait]){let Z=(w.blockers||[]).map(Ke=>({...rl(w.id,Ke),...Rd(w,Ke.id,ne)})),Ce=$d(w.id,kh(Ne.get(w.id),w.dependents_info,w,ne));if(Z.length===0&&Ce.length===0)continue;let Ye={...w.dependency_chips||{},...Z.length>0?{predecessors:Z}:{},...Ce.length>0?{dependents:Ce}:{}};w.dependency_chips=Ye}vh(re,Re,C,ne,o);let ue=Vu(re.queue_groups);for(let w of re.queue_groups)for(let Z of w.sublanes.serial){let Ce=ue.get(Qu(w.root_dir,Z.id));Ce&&(Z.cross_wait_peers=Ce)}re.chain_lanes=bh(l&&Array.isArray(l.lanes)?l.lanes:[],te,ne,o,se,g,{armed_by_bead:F,failed_by_bead:J,disarmed_lanes:he},be);let ke=new Map;for(let w of[...re.queue,...re.runnable])ke.has(w.id)||ke.set(w.id,w);let pe=new Set;for(let w of re.chain_lanes)for(let Z of w.rows){if(w.status==="confirmed"&&!Z.unplaced&&!Z.fixed&&pe.add(Z.id),!w.draft&&!Z.unplaced)continue;let Ce=ke.get(Z.id);Ce&&(Ce.cross_lane_chip={lane_id:w.lane_id,number:w.number,status:w.status,label:w.draft?`\uC5F0\uACB0 ${w.number} (draft)`:`\uC5F0\uACB0 ${w.number}`})}let qe=new Map(re.chain_lanes.map(w=>[w.lane_id,w.number]));for(let w of[...re.queue,...re.running]){let Z=F.get(w.id);if(typeof Z!="string"||Z.length===0)continue;let Ce=qe.get(Z);w.armed_lane_chip=Ce===void 0?{lane_id:Z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:Z,label:`\u25B6 \uC5F0\uACB0 ${Ce}`,orphan:!1}}let Be=[];for(let w of L.values())for(let Z of w)pe.has(Z.id)||Be.push(Z);Be.sort((w,Z)=>{let Ce=w.workspace_name.localeCompare(Z.workspace_name);return Ce!==0?Ce:(w.queue_index??0)-(Z.queue_index??0)}),re.parallel_rows=Be;let Je={};for(let[w,Z]of ne)typeof Z.root_dir=="string"&&Z.root_dir.length>0&&(Je[w]=Z.root_dir);for(let w of re.chain_lanes)for(let Z of w.rows)!Object.hasOwn(Je,Z.id)&&Z.root_dir.length>0&&g.has(Z.root_dir)&&(Je[Z.id]=Z.root_dir);re.owner_of=Je;let We=re.runnable.length;re.runnable_all=re.runnable.slice();let Q=re.runnable,B=w=>s.show_blocked||w.blocked!==!0,Fe=w=>s.readiness==="all"||(s.readiness==="ready"?w.queue_placeable===!0:w.queue_placeable!==!0);if(d==="per_control"){let w=[],Z=0,Ce=0;for(let Ye of Q){let Ke=B(Ye),je=Fe(Ye);Ke&&je?w.push(Ye):!Ke&&je?Z+=1:Ke&&!je&&(Ce+=1)}Q=w,re.runnable_hidden={blocked:Z,readiness:Ce}}else{Q=Q.filter(B);let w=Q.length;Q=Q.filter(Fe),re.runnable_hidden={blocked:We-w,readiness:w-Q.length}}let _t=(w,Z)=>{let Ce=Ii(Z.updated_at)-Ii(w.updated_at);return Ce!==0?Ce:w.id.localeCompare(Z.id)},He=a==="repo_spec"?(w,Z)=>{let Ce=w.queue_placeable===!0?0:1,Ye=Z.queue_placeable===!0?0:1;if(Ce!==Ye)return Ce-Ye;let Ke=w.published===!0?0:1,je=Z.published===!0?0:1;return Ke!==je?Ke-je:_t(w,Z)}:_t;if(a==="as_given")re.runnable=Q,re.runnable_sections=[];else if(a==="updated_flat")re.runnable=Q.slice().sort(_t),re.runnable_sections=[];else{let w=new Map;for(let Ye of Q){let Ke=w.get(Ye.root_dir);Ke?Ke.push(Ye):w.set(Ye.root_dir,[Ye])}let Z=[],Ce=[];for(let Ye of Pe){if(!Ye||typeof Ye.root_dir!="string")continue;let Ke=(w.get(Ye.root_dir)||[]).slice().sort(He);w.delete(Ye.root_dir),Ke.length!==0&&(Z.push({root_dir:Ye.root_dir,name:Ye.name||Ye.root_dir,items:Ke.map(je=>({...je,workspace_name:""}))}),Ce.push(...Ke))}for(let[Ye,Ke]of w){let je=Ke.slice().sort(He);Z.push({root_dir:Ye,name:je[0]?.workspace_name||Ye,items:je.map(Et=>({...Et,workspace_name:""}))}),Ce.push(...je)}re.runnable=Ce,re.runnable_sections=Z}let it=wh(n?n.search:void 0);return it&&$h(re,it),re}function qd(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),m=Number(l.get(a))>Number(l.get(d));f&&m&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var xh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Di="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Ah="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Sh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",bo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function ts(e,t){return`${e}\0${t}`}function Eh(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function Th(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function os(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=Eh(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[f,m]of o)for(let g of m)i.push({blocker:g,blockee:f});let s=Th(e,t),l=new Map(r.map((f,m)=>[f,m])),a=r.slice(0,s).filter(f=>o.get(f).some(m=>Number(l.get(m))>Number(l.get(f)))),u=qd(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,s),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Nd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:os(n,t)}function Ch(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Oh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Rh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function cl(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function Ih(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(ts(s,a));let r=new Map,o=new Map;for(let s of e){let l=ts(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=ts(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function Lh(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function Dh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function ll(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function ul(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ss(e){let t=Rh(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Oh(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let m=t.get(u)||[];if(m.includes(d))return;let g=i(u);if(g!==null){if(cl(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...m,d]),f!==void 0&&r.add(ts(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:g,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let m=i(u);m!==null&&(t.set(u,f.filter(g=>g!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:m}))},laneCreated:(u,d)=>r.has(ts(u,d))}}function is(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=Ih(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Ch(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function jd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function ns(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Fd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function rs(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Pi(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Mi(e,t,n){let r=ss(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:xh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Ah};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${ul(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:bo}}if(e.kind==="chain"&&d===void 0)return{refused:bo};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let v=d.entries.findIndex(Y=>Y.bead_id===e.bead_id);if(v<0)return;let O=v>0?d.entries[v-1]:null,R=v+1<d.entries.length?d.entries[v+1]:null,X=ns(d,v),ee=R!==null&&ns(d,v+1);X&&O!==null&&r.removeDep(e.bead_id,O.bead_id),ee&&R!==null&&r.removeDep(R.bead_id,e.bead_id),(X||ee)&&O!==null&&R!==null&&r.addDep(R.bead_id,O.bead_id,u)},m=(v,O)=>{let R=n.cross_lanes.get(v),X=R.entries.findIndex(q=>q.bead_id===e.bead_id),ee=R.entries.filter(q=>q.bead_id!==e.bead_id),Y=Math.max(0,Math.min(ee.length,X>=0&&O>X?O-1:O)),L=-1;if(ee.forEach((q,K)=>{n.fixed_members.has(q.bead_id)&&(L=K)}),Y<=L){r.state.refusal=Sh;return}let I=X>=0?R.entries[X]:d?.entries.find(q=>q.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=os({status:R.status,entries:[...ee.slice(0,Y),I,...ee.slice(Y)]},n);let P=l.entries;if(Pi(P,R.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:v,entries:rs(P)}}),R.status!=="confirmed")return;let j=P.findIndex(q=>q.bead_id===e.bead_id),V=j>0?P[j-1].bead_id:null,M=j+1<P.length?P[j+1].bead_id:null;if(V===null){M!==null&&r.addDep(M,e.bead_id,v);return}if(r.addDep(e.bead_id,V,v),M!==null&&(r.graph.get(M)||[]).includes(V)){let q=R.entries.findIndex(K=>K.bead_id===M);(r.laneCreated(M,V)||q>0&&R.entries[q-1].bead_id===V&&ns(R,q))&&r.removeDep(M,V),r.addDep(M,e.bead_id,v)}},g=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(s.push(...Fd(n,d,u,d.entries.filter(v=>v.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:rs(d.entries.filter(v=>v.bead_id!==e.bead_id))}}))),t.kind==="chain"&&m(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let v=Lh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(ll(e.bead_id,e.root_dir,v));else if(e.kind==="parallel"){let O=n.parallel_rows,R=O[Math.max(0,Math.min(O.length,t.marker_index))];if(!(!!R&&R.bead_id===e.bead_id)&&Dh(n,e.root_dir)&&g!==void 0){let ee=g>v?v:v-1;ee>=0&&ee!==g&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ee},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let v=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&v.status==="confirmed"&&i.push(ll(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(g!==void 0&&t.index!==g){let v=g>t.index?t.index:t.index-1;v>=0&&v!==g&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:v},root_dir:e.root_dir})}}else i.push(ll(e.bead_id,e.root_dir,t.index,t.lane_id));return is(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Bd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:bo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=os(n,t);if(r.held)return{refused:Di};let o=r.entries,i=ss(t),s=[];jd(i,o,e);let l=Pi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:rs(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),is(i,t,l,s,{lane_id:e,correction:r})}function Ud(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:bo};let r=os(n,t),o=r.entries,i=ss(t),s=[];jd(i,o,e);let l=Pi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:rs(o)}}];return is(i,t,l,s,{lane_id:e,correction:r})}function Wd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:bo};let r=os(n,t),o=r.entries;return is(ss(t),t,Pi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:rs(o)}}],[],{lane_id:e,correction:r})}function zd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:bo};let r=ss(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)ns(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return is(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Fd(t,n,e,n.entries)})}function Hd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;ns(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${ul(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Kd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Gd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function dl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${ul(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Ph="\uC0AC\uC774\uD074";function Mh(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function pl(e,t,n){let r=br(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Mh(e)}}function Yd(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=cl(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:Ph}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function Vd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:op,setPrototypeOf:Qd,isFrozen:qh,getPrototypeOf:Nh,getOwnPropertyDescriptor:jh}=Object,{freeze:bn,seal:Tn,create:yl}=Object,{apply:vl,construct:kl}=typeof Reflect<"u"&&Reflect;bn||(bn=function(t){return t});Tn||(Tn=function(t){return t});vl||(vl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});kl||(kl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var qi=yn(Array.prototype.forEach),Fh=yn(Array.prototype.lastIndexOf),Xd=yn(Array.prototype.pop),as=yn(Array.prototype.push),Bh=yn(Array.prototype.splice),ji=yn(String.prototype.toLowerCase),fl=yn(String.prototype.toString),_l=yn(String.prototype.match),ls=yn(String.prototype.replace),Uh=yn(String.prototype.indexOf),Wh=yn(String.prototype.trim),qn=yn(Object.prototype.hasOwnProperty),hn=yn(RegExp.prototype.test),cs=zh(TypeError);function yn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return vl(e,t,r)}}function zh(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return kl(e,n)}}function At(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ji;Qd&&Qd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(qh(t)||(t[r]=i),o=i)}e[o]=!0}return e}function Hh(e){for(let t=0;t<e.length;t++)qn(e,t)||(e[t]=null);return e}function or(e){let t=yl(null);for(let[n,r]of op(e))qn(e,n)&&(Array.isArray(r)?t[n]=Hh(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=or(r):t[n]=r);return t}function us(e,t){for(;e!==null;){let r=jh(e,t);if(r){if(r.get)return yn(r.get);if(typeof r.value=="function")return yn(r.value)}e=Nh(e)}function n(){return null}return n}var Zd=bn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ml=bn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),gl=bn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Kh=bn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),hl=bn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Gh=bn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Jd=bn(["#text"]),ep=bn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),bl=bn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),tp=bn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ni=bn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Yh=Tn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Vh=Tn(/<%[\w\W]*|[\w\W]*%>/gm),Qh=Tn(/\$\{[\w\W]*/gm),Xh=Tn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zh=Tn(/^aria-[\-\w]+$/),sp=Tn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Jh=Tn(/^(?:\w+script|data):/i),eb=Tn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ip=Tn(/^html$/i),tb=Tn(/^[a-z][.\w]*(-[.\w]+)+$/i),np=Object.freeze({__proto__:null,ARIA_ATTR:Zh,ATTR_WHITESPACE:eb,CUSTOM_ELEMENT:tb,DATA_ATTR:Xh,DOCTYPE_NAME:ip,ERB_EXPR:Vh,IS_ALLOWED_URI:sp,IS_SCRIPT_OR_DATA:Jh,MUSTACHE_EXPR:Yh,TMPLIT_EXPR:Qh}),ds={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},nb=function(){return typeof window>"u"?null:window},rb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},rp=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ap(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:nb(),t=Ee=>ap(Ee);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ds.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:m,trustedTypes:g}=e,v=a.prototype,O=us(v,"cloneNode"),R=us(v,"remove"),X=us(v,"nextSibling"),ee=us(v,"childNodes"),Y=us(v,"parentNode");if(typeof s=="function"){let Ee=n.createElement("template");Ee.content&&Ee.content.ownerDocument&&(n=Ee.content.ownerDocument)}let L,I="",{implementation:P,createNodeIterator:j,createDocumentFragment:V,getElementsByTagName:M}=n,{importNode:q}=r,K=rp();t.isSupported=typeof op=="function"&&typeof Y=="function"&&P&&P.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:U,ERB_EXPR:te,TMPLIT_EXPR:be,DATA_ATTR:Ne,ARIA_ATTR:F,IS_SCRIPT_OR_DATA:J,ATTR_WHITESPACE:he,CUSTOM_ELEMENT:Re}=np,{IS_ALLOWED_URI:C}=np,se=null,ye=At({},[...Zd,...ml,...gl,...hl,...Jd]),Ae=null,Pe=At({},[...ep,...bl,...tp,...Ni]),ve=Object.seal(yl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Te=null,ut=null,dt=Object.seal(yl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),G=!0,re=!0,ne=!1,ue=!0,ke=!1,pe=!0,qe=!1,Be=!1,Je=!1,We=!1,Q=!1,B=!1,Fe=!0,_t=!1,pt="user-content-",He=!0,it=!1,w={},Z=null,Ce=At({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ye=null,Ke=At({},["audio","video","img","source","image","track"]),je=null,Et=At({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Pt="http://www.w3.org/1998/Math/MathML",rt="http://www.w3.org/2000/svg",Tt="http://www.w3.org/1999/xhtml",jt=Tt,It=!1,Ut=null,ae=At({},[Pt,rt,Tt],fl),we=At({},["mi","mo","mn","ms","mtext"]),Ge=At({},["annotation-xml"]),ot=At({},["title","style","font","a","script"]),et=null,mt=["application/xhtml+xml","text/html"],bt="text/html",tt=null,me=null,A=n.createElement("form"),N=function(T){return T instanceof RegExp||T instanceof Function},ie=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(me&&me===T)){if((!T||typeof T!="object")&&(T={}),T=or(T),et=mt.indexOf(T.PARSER_MEDIA_TYPE)===-1?bt:T.PARSER_MEDIA_TYPE,tt=et==="application/xhtml+xml"?fl:ji,se=qn(T,"ALLOWED_TAGS")?At({},T.ALLOWED_TAGS,tt):ye,Ae=qn(T,"ALLOWED_ATTR")?At({},T.ALLOWED_ATTR,tt):Pe,Ut=qn(T,"ALLOWED_NAMESPACES")?At({},T.ALLOWED_NAMESPACES,fl):ae,je=qn(T,"ADD_URI_SAFE_ATTR")?At(or(Et),T.ADD_URI_SAFE_ATTR,tt):Et,Ye=qn(T,"ADD_DATA_URI_TAGS")?At(or(Ke),T.ADD_DATA_URI_TAGS,tt):Ke,Z=qn(T,"FORBID_CONTENTS")?At({},T.FORBID_CONTENTS,tt):Ce,Te=qn(T,"FORBID_TAGS")?At({},T.FORBID_TAGS,tt):or({}),ut=qn(T,"FORBID_ATTR")?At({},T.FORBID_ATTR,tt):or({}),w=qn(T,"USE_PROFILES")?T.USE_PROFILES:!1,G=T.ALLOW_ARIA_ATTR!==!1,re=T.ALLOW_DATA_ATTR!==!1,ne=T.ALLOW_UNKNOWN_PROTOCOLS||!1,ue=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ke=T.SAFE_FOR_TEMPLATES||!1,pe=T.SAFE_FOR_XML!==!1,qe=T.WHOLE_DOCUMENT||!1,We=T.RETURN_DOM||!1,Q=T.RETURN_DOM_FRAGMENT||!1,B=T.RETURN_TRUSTED_TYPE||!1,Je=T.FORCE_BODY||!1,Fe=T.SANITIZE_DOM!==!1,_t=T.SANITIZE_NAMED_PROPS||!1,He=T.KEEP_CONTENT!==!1,it=T.IN_PLACE||!1,C=T.ALLOWED_URI_REGEXP||sp,jt=T.NAMESPACE||Tt,we=T.MATHML_TEXT_INTEGRATION_POINTS||we,Ge=T.HTML_INTEGRATION_POINTS||Ge,ve=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&N(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ve.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&N(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ve.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ve.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ke&&(re=!1),Q&&(We=!0),w&&(se=At({},Jd),Ae=[],w.html===!0&&(At(se,Zd),At(Ae,ep)),w.svg===!0&&(At(se,ml),At(Ae,bl),At(Ae,Ni)),w.svgFilters===!0&&(At(se,gl),At(Ae,bl),At(Ae,Ni)),w.mathMl===!0&&(At(se,hl),At(Ae,tp),At(Ae,Ni))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?dt.tagCheck=T.ADD_TAGS:(se===ye&&(se=or(se)),At(se,T.ADD_TAGS,tt))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?dt.attributeCheck=T.ADD_ATTR:(Ae===Pe&&(Ae=or(Ae)),At(Ae,T.ADD_ATTR,tt))),T.ADD_URI_SAFE_ATTR&&At(je,T.ADD_URI_SAFE_ATTR,tt),T.FORBID_CONTENTS&&(Z===Ce&&(Z=or(Z)),At(Z,T.FORBID_CONTENTS,tt)),He&&(se["#text"]=!0),qe&&At(se,["html","head","body"]),se.table&&(At(se,["tbody"]),delete Te.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw cs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw cs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=T.TRUSTED_TYPES_POLICY,I=L.createHTML("")}else L===void 0&&(L=rb(g,o)),L!==null&&typeof I=="string"&&(I=L.createHTML(""));bn&&bn(T),me=T}},Se=At({},[...ml,...gl,...Kh]),_e=At({},[...hl,...Gh]),gt=function(T){let de=Y(T);(!de||!de.tagName)&&(de={namespaceURI:jt,tagName:"template"});let De=ji(T.tagName),yt=ji(de.tagName);return Ut[T.namespaceURI]?T.namespaceURI===rt?de.namespaceURI===Tt?De==="svg":de.namespaceURI===Pt?De==="svg"&&(yt==="annotation-xml"||we[yt]):!!Se[De]:T.namespaceURI===Pt?de.namespaceURI===Tt?De==="math":de.namespaceURI===rt?De==="math"&&Ge[yt]:!!_e[De]:T.namespaceURI===Tt?de.namespaceURI===rt&&!Ge[yt]||de.namespaceURI===Pt&&!we[yt]?!1:!_e[De]&&(ot[De]||!Se[De]):!!(et==="application/xhtml+xml"&&Ut[T.namespaceURI]):!1},kt=function(T){as(t.removed,{element:T});try{Y(T).removeChild(T)}catch{R(T)}},wt=function(T,de){try{as(t.removed,{attribute:de.getAttributeNode(T),from:de})}catch{as(t.removed,{attribute:null,from:de})}if(de.removeAttribute(T),T==="is")if(We||Q)try{kt(de)}catch{}else try{de.setAttribute(T,"")}catch{}},$t=function(T){let de=null,De=null;if(Je)T="<remove></remove>"+T;else{let y=_l(T,/^[\r\n\t ]+/);De=y&&y[0]}et==="application/xhtml+xml"&&jt===Tt&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let yt=L?L.createHTML(T):T;if(jt===Tt)try{de=new m().parseFromString(yt,et)}catch{}if(!de||!de.documentElement){de=P.createDocument(jt,"template",null);try{de.documentElement.innerHTML=It?I:yt}catch{}}let Qe=de.body||de.documentElement;return T&&De&&Qe.insertBefore(n.createTextNode(De),Qe.childNodes[0]||null),jt===Tt?M.call(de,qe?"html":"body")[0]:qe?de.documentElement:Qe},Kt=function(T){return j.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Wt=function(T){return T instanceof f&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},zt=function(T){return typeof l=="function"&&T instanceof l};function St(Ee,T,de){qi(Ee,De=>{De.call(t,T,de,me)})}let nn=function(T){let de=null;if(St(K.beforeSanitizeElements,T,null),Wt(T))return kt(T),!0;let De=tt(T.nodeName);if(St(K.uponSanitizeElement,T,{tagName:De,allowedTags:se}),pe&&T.hasChildNodes()&&!zt(T.firstElementChild)&&hn(/<[/\w!]/g,T.innerHTML)&&hn(/<[/\w!]/g,T.textContent)||T.nodeType===ds.progressingInstruction||pe&&T.nodeType===ds.comment&&hn(/<[/\w]/g,T.data))return kt(T),!0;if(!(dt.tagCheck instanceof Function&&dt.tagCheck(De))&&(!se[De]||Te[De])){if(!Te[De]&&qt(De)&&(ve.tagNameCheck instanceof RegExp&&hn(ve.tagNameCheck,De)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(De)))return!1;if(He&&!Z[De]){let yt=Y(T)||T.parentNode,Qe=ee(T)||T.childNodes;if(Qe&&yt){let y=Qe.length;for(let p=y-1;p>=0;--p){let _=O(Qe[p],!0);_.__removalCount=(T.__removalCount||0)+1,yt.insertBefore(_,X(T))}}}return kt(T),!0}return T instanceof a&&!gt(T)||(De==="noscript"||De==="noembed"||De==="noframes")&&hn(/<\/no(script|embed|frames)/i,T.innerHTML)?(kt(T),!0):(ke&&T.nodeType===ds.text&&(de=T.textContent,qi([U,te,be],yt=>{de=ls(de,yt," ")}),T.textContent!==de&&(as(t.removed,{element:T.cloneNode()}),T.textContent=de)),St(K.afterSanitizeElements,T,null),!1)},Zt=function(T,de,De){if(Fe&&(de==="id"||de==="name")&&(De in n||De in A))return!1;if(!(re&&!ut[de]&&hn(Ne,de))){if(!(G&&hn(F,de))){if(!(dt.attributeCheck instanceof Function&&dt.attributeCheck(de,T))){if(!Ae[de]||ut[de]){if(!(qt(T)&&(ve.tagNameCheck instanceof RegExp&&hn(ve.tagNameCheck,T)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(T))&&(ve.attributeNameCheck instanceof RegExp&&hn(ve.attributeNameCheck,de)||ve.attributeNameCheck instanceof Function&&ve.attributeNameCheck(de,T))||de==="is"&&ve.allowCustomizedBuiltInElements&&(ve.tagNameCheck instanceof RegExp&&hn(ve.tagNameCheck,De)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(De))))return!1}else if(!je[de]){if(!hn(C,ls(De,he,""))){if(!((de==="src"||de==="xlink:href"||de==="href")&&T!=="script"&&Uh(De,"data:")===0&&Ye[T])){if(!(ne&&!hn(J,ls(De,he,"")))){if(De)return!1}}}}}}}return!0},qt=function(T){return T!=="annotation-xml"&&_l(T,Re)},Rt=function(T){St(K.beforeSanitizeAttributes,T,null);let{attributes:de}=T;if(!de||Wt(T))return;let De={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ae,forceKeepAttr:void 0},yt=de.length;for(;yt--;){let Qe=de[yt],{name:y,namespaceURI:p,value:_}=Qe,x=tt(y),z=_,H=y==="value"?z:Wh(z);if(De.attrName=x,De.attrValue=H,De.keepAttr=!0,De.forceKeepAttr=void 0,St(K.uponSanitizeAttribute,T,De),H=De.attrValue,_t&&(x==="id"||x==="name")&&(wt(y,T),H=pt+H),pe&&hn(/((--!?|])>)|<\/(style|title|textarea)/i,H)){wt(y,T);continue}if(x==="attributename"&&_l(H,"href")){wt(y,T);continue}if(De.forceKeepAttr)continue;if(!De.keepAttr){wt(y,T);continue}if(!ue&&hn(/\/>/i,H)){wt(y,T);continue}ke&&qi([U,te,be],Ie=>{H=ls(H,Ie," ")});let le=tt(T.nodeName);if(!Zt(le,x,H)){wt(y,T);continue}if(L&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!p)switch(g.getAttributeType(le,x)){case"TrustedHTML":{H=L.createHTML(H);break}case"TrustedScriptURL":{H=L.createScriptURL(H);break}}if(H!==z)try{p?T.setAttributeNS(p,y,H):T.setAttribute(y,H),Wt(T)?kt(T):Xd(t.removed)}catch{wt(y,T)}}St(K.afterSanitizeAttributes,T,null)},Jt=function Ee(T){let de=null,De=Kt(T);for(St(K.beforeSanitizeShadowDOM,T,null);de=De.nextNode();)St(K.uponSanitizeShadowNode,de,null),nn(de),Rt(de),de.content instanceof i&&Ee(de.content);St(K.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(Ee){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},de=null,De=null,yt=null,Qe=null;if(It=!Ee,It&&(Ee="<!-->"),typeof Ee!="string"&&!zt(Ee))if(typeof Ee.toString=="function"){if(Ee=Ee.toString(),typeof Ee!="string")throw cs("dirty is not a string, aborting")}else throw cs("toString is not a function");if(!t.isSupported)return Ee;if(Be||ie(T),t.removed=[],typeof Ee=="string"&&(it=!1),it){if(Ee.nodeName){let _=tt(Ee.nodeName);if(!se[_]||Te[_])throw cs("root node is forbidden and cannot be sanitized in-place")}}else if(Ee instanceof l)de=$t("<!---->"),De=de.ownerDocument.importNode(Ee,!0),De.nodeType===ds.element&&De.nodeName==="BODY"||De.nodeName==="HTML"?de=De:de.appendChild(De);else{if(!We&&!ke&&!qe&&Ee.indexOf("<")===-1)return L&&B?L.createHTML(Ee):Ee;if(de=$t(Ee),!de)return We?null:B?I:""}de&&Je&&kt(de.firstChild);let y=Kt(it?Ee:de);for(;yt=y.nextNode();)nn(yt),Rt(yt),yt.content instanceof i&&Jt(yt.content);if(it)return Ee;if(We){if(Q)for(Qe=V.call(de.ownerDocument);de.firstChild;)Qe.appendChild(de.firstChild);else Qe=de;return(Ae.shadowroot||Ae.shadowrootmode)&&(Qe=q.call(r,Qe,!0)),Qe}let p=qe?de.outerHTML:de.innerHTML;return qe&&se["!doctype"]&&de.ownerDocument&&de.ownerDocument.doctype&&de.ownerDocument.doctype.name&&hn(ip,de.ownerDocument.doctype.name)&&(p="<!DOCTYPE "+de.ownerDocument.doctype.name+`>
`+p),ke&&qi([U,te,be],_=>{p=ls(p,_," ")}),L&&B?L.createHTML(p):p},t.setConfig=function(){let Ee=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ie(Ee),Be=!0},t.clearConfig=function(){me=null,Be=!1},t.isValidAttribute=function(Ee,T,de){me||ie({});let De=tt(Ee),yt=tt(T);return Zt(De,yt,de)},t.addHook=function(Ee,T){typeof T=="function"&&as(K[Ee],T)},t.removeHook=function(Ee,T){if(T!==void 0){let de=Fh(K[Ee],T);return de===-1?void 0:Bh(K[Ee],de,1)[0]}return Xd(K[Ee])},t.removeHooks=function(Ee){K[Ee]=[]},t.removeAllHooks=function(){K=rp()},t}var lp=ap();var sr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Fi=e=>(...t)=>({_$litDirective$:e,values:t}),yo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ps=class extends yo{constructor(t){if(super(t),this.it=Yt,t.type!==sr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Yt||t==null)return this._t=void 0,this.it=t;if(t===En)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ps.directiveName="unsafeHTML",ps.resultType=1;var cp=Fi(ps);function Al(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Fr=Al();function gp(e){Fr=e}var gs={exec:()=>null};function Lt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(vn.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var ob=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),vn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},sb=/^(?:[ \t]*(?:\n|$))+/,ib=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ab=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,lb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Sl=/(?:[*+-]|\d{1,9}[.)])/,hp=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,bp=Lt(hp).replace(/bull/g,Sl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),cb=Lt(hp).replace(/bull/g,Sl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),El=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ub=/^[^\n]+/,Tl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,db=Lt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Tl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),pb=Lt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Sl).getRegex(),Ki="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Cl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,fb=Lt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Cl).replace("tag",Ki).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),yp=Lt(El).replace("hr",hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ki).getRegex(),_b=Lt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",yp).getRegex(),Ol={blockquote:_b,code:ib,def:db,fences:ab,heading:lb,hr:hs,html:fb,lheading:bp,list:pb,newline:sb,paragraph:yp,table:gs,text:ub},up=Lt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ki).getRegex(),mb={...Ol,lheading:cb,table:up,paragraph:Lt(El).replace("hr",hs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",up).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ki).getRegex()},gb={...Ol,html:Lt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Cl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:gs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Lt(El).replace("hr",hs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",bp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},hb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,bb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,vp=/^( {2,}|\\)\n(?!\s*$)/,yb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Gi=/[\p{P}\p{S}]/u,Rl=/[\s\p{P}\p{S}]/u,kp=/[^\s\p{P}\p{S}]/u,vb=Lt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Rl).getRegex(),wp=/(?!~)[\p{P}\p{S}]/u,kb=/(?!~)[\s\p{P}\p{S}]/u,wb=/(?:[^\s\p{P}\p{S}]|~)/u,$b=Lt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ob?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),$p=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,xb=Lt($p,"u").replace(/punct/g,Gi).getRegex(),Ab=Lt($p,"u").replace(/punct/g,wp).getRegex(),xp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Sb=Lt(xp,"gu").replace(/notPunctSpace/g,kp).replace(/punctSpace/g,Rl).replace(/punct/g,Gi).getRegex(),Eb=Lt(xp,"gu").replace(/notPunctSpace/g,wb).replace(/punctSpace/g,kb).replace(/punct/g,wp).getRegex(),Tb=Lt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,kp).replace(/punctSpace/g,Rl).replace(/punct/g,Gi).getRegex(),Cb=Lt(/\\(punct)/,"gu").replace(/punct/g,Gi).getRegex(),Ob=Lt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Rb=Lt(Cl).replace("(?:-->|$)","-->").getRegex(),Ib=Lt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Rb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Wi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Lb=Lt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Wi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ap=Lt(/^!?\[(label)\]\[(ref)\]/).replace("label",Wi).replace("ref",Tl).getRegex(),Sp=Lt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Tl).getRegex(),Db=Lt("reflink|nolink(?!\\()","g").replace("reflink",Ap).replace("nolink",Sp).getRegex(),dp=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Il={_backpedal:gs,anyPunctuation:Cb,autolink:Ob,blockSkip:$b,br:vp,code:bb,del:gs,emStrongLDelim:xb,emStrongRDelimAst:Sb,emStrongRDelimUnd:Tb,escape:hb,link:Lb,nolink:Sp,punctuation:vb,reflink:Ap,reflinkSearch:Db,tag:Ib,text:yb,url:gs},Pb={...Il,link:Lt(/^!?\[(label)\]\((.*?)\)/).replace("label",Wi).getRegex(),reflink:Lt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Wi).getRegex()},wl={...Il,emStrongRDelimAst:Eb,emStrongLDelim:Ab,url:Lt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",dp).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Lt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",dp).getRegex()},Mb={...wl,br:Lt(vp).replace("{2,}","*").getRegex(),text:Lt(wl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Bi={normal:Ol,gfm:mb,pedantic:gb},fs={normal:Il,gfm:wl,breaks:Mb,pedantic:Pb},qb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},pp=e=>qb[e];function ir(e,t){if(t){if(vn.escapeTest.test(e))return e.replace(vn.escapeReplace,pp)}else if(vn.escapeTestNoEncode.test(e))return e.replace(vn.escapeReplaceNoEncode,pp);return e}function fp(e){try{e=encodeURI(e).replace(vn.percentDecode,"%")}catch{return null}return e}function _p(e,t){let n=e.replace(vn.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(vn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(vn.slashPipe,"|");return r}function _s(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function Nb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function mp(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function jb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var zi=class{constructor(e){Bt(this,"options");Bt(this,"rules");Bt(this,"lexer");this.options=e||Fr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:_s(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=jb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=_s(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:_s(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=_s(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=f,n.length===0)break;let m=i.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let g=m,v=g.raw+`
`+n.join(`
`),O=this.blockquote(v);i[i.length-1]=O,r=r.substring(0,r.length-g.raw.length)+O.raw,o=o.substring(0,o.length-g.text.length)+O.text;break}else if(m?.type==="list"){let g=m,v=g.raw+`
`+n.join(`
`),O=this.list(v);i[i.length-1]=O,r=r.substring(0,r.length-m.raw.length)+O.raw,o=o.substring(0,o.length-g.raw.length)+O.raw,n=v.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,O=>" ".repeat(3*O.length)),m=e.split(`
`,1)[0],g=!f.trim(),v=0;if(this.options.pedantic?(v=2,d=f.trimStart()):g?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=f.slice(v),v+=t[1].length),g&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),a=!0),!a){let O=this.rules.other.nextBulletRegex(v),R=this.rules.other.hrRegex(v),X=this.rules.other.fencesBeginRegex(v),ee=this.rules.other.headingBeginRegex(v),Y=this.rules.other.htmlBeginRegex(v);for(;e;){let L=e.split(`
`,1)[0],I;if(m=L,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),I=m):I=m.replace(this.rules.other.tabCharGlobal,"    "),X.test(m)||ee.test(m)||Y.test(m)||O.test(m)||R.test(m))break;if(I.search(this.rules.other.nonSpaceChar)>=v||!m.trim())d+=`
`+I.slice(v);else{if(g||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||X.test(f)||ee.test(f)||R.test(f))break;d+=`
`+m}!g&&!m.trim()&&(g=!0),u+=L+`
`,e=e.substring(L.length+1),f=I.slice(v)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=_p(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(_p(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=_s(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=Nb(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),mp(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return mp(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let g=f.slice(1,-1);return{type:"em",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}let m=f.slice(2,-2);return{type:"strong",raw:f,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Nn=class $l{constructor(t){Bt(this,"tokens");Bt(this,"options");Bt(this,"state");Bt(this,"inlineQueue");Bt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Fr,this.options.tokenizer=this.options.tokenizer||new zi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:vn,block:Bi.normal,inline:fs.normal};this.options.pedantic?(n.block=Bi.pedantic,n.inline=fs.pedantic):this.options.gfm&&(n.block=Bi.gfm,this.options.breaks?n.inline=fs.breaks:n.inline=fs.gfm),this.tokenizer.rules=n}static get rules(){return{block:Bi,inline:fs}}static lex(t,n){return new $l(n).lex(t)}static lexInline(t,n){return new $l(n).inlineTokens(t)}lex(t){t=t.replace(vn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(vn.tabCharGlobal,"    ").replace(vn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(s=>(o=s.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let s=n.at(-1);o.raw.length===1&&s!==void 0?s.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let i=t;if(this.options.extensions?.startBlock){let s=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(s=Math.min(s,a))}),s<1/0&&s>=0&&(i=t.substring(0,s+1))}if(this.state.top&&(o=this.tokenizer.paragraph(i))){let s=n.at(-1);r&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o),r=i.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),m;this.options.extensions.startInline.forEach(g=>{m=g.call({lexer:this},f),typeof m=="number"&&m>=0&&(d=Math.min(d,m))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Hi=class{constructor(e){Bt(this,"options");Bt(this,"parser");this.options=e||Fr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(vn.notSpaceStart)?.[0],o=e.replace(vn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ir(r)+'">'+(n?o:ir(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:ir(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let s=0;s<e.items.length;s++){let l=e.items[s];r+=this.listitem(l)}let o=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+o+i+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let i=e.rows[o];n="";for(let s=0;s<i.length;s++)n+=this.tablecell(i[s]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ir(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=fp(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+ir(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=fp(e);if(o===null)return ir(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${ir(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ir(e.text)}},Ll=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jn=class xl{constructor(t){Bt(this,"options");Bt(this,"renderer");Bt(this,"textRenderer");this.options=t||Fr,this.options.renderer=this.options.renderer||new Hi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ll}static parse(t,n){return new xl(n).parse(t)}static parseInline(t,n){return new xl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Ui,ms=(Ui=class{constructor(e){Bt(this,"options");Bt(this,"block");this.options=e||Fr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Nn.lex:Nn.lexInline}provideParser(){return this.block?jn.parse:jn.parseInline}},Bt(Ui,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Bt(Ui,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ui),Fb=class{constructor(...e){Bt(this,"defaults",Al());Bt(this,"options",this.setOptions);Bt(this,"parse",this.parseMarkdown(!0));Bt(this,"parseInline",this.parseMarkdown(!1));Bt(this,"Parser",jn);Bt(this,"Renderer",Hi);Bt(this,"TextRenderer",Ll);Bt(this,"Lexer",Nn);Bt(this,"Tokenizer",zi);Bt(this,"Hooks",ms);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Hi(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new zi(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new ms;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];ms.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&ms.passThroughHooksRespectAsync.has(i))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Nn.lex(e,t??this.defaults)}parser(e,t){return jn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?jn.parse:jn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?jn.parse:jn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ir(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},jr=new Fb;function Mt(e,t){return jr.parse(e,t)}Mt.options=Mt.setOptions=function(e){return jr.setOptions(e),Mt.defaults=jr.defaults,gp(Mt.defaults),Mt};Mt.getDefaults=Al;Mt.defaults=Fr;Mt.use=function(...e){return jr.use(...e),Mt.defaults=jr.defaults,gp(Mt.defaults),Mt};Mt.walkTokens=function(e,t){return jr.walkTokens(e,t)};Mt.parseInline=jr.parseInline;Mt.Parser=jn;Mt.parser=jn.parse;Mt.Renderer=Hi;Mt.TextRenderer=Ll;Mt.Lexer=Nn;Mt.lexer=Nn.lex;Mt.Tokenizer=zi;Mt.Hooks=ms;Mt.parse=Mt;var g0=Mt.options,h0=Mt.setOptions,b0=Mt.use,y0=Mt.walkTokens,v0=Mt.parseInline;var k0=jn.parse,w0=Nn.lex;function yr(e){let t=Mt.parse(e),n=lp.sanitize(t);return cp(n)}function ar(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function vo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Yi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Tp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Bb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Ub=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Wb=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Fn(e){return!!e&&typeof e=="object"}function Dl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Pl(e,t){let n=Dl(e),r=Dl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function Cp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Fn(o)&&typeof o.text=="string"?o.text:"").join(""):Fn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function zb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Tp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Dl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Pl(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Pl(Fn(l)?l.old_string:"",Fn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ml(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Hb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Op(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Fn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Hb,"").trim();return n.length>0?{kind:"user",text:n}:null}function ql(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Ub.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Wb.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Kb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Gb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Fn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(ql(s.text));else if(s.type==="thinking"){let l=Ml(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=zb(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?Ep(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Fn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=Cp(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=Op(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Ep([o],n):[o]}return[]}function Ep(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Yb(e){let t=typeof e.command=="string"?e.command:"",n=Cp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:Tp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function Vb(e){if(e.type==="item.completed"&&Fn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ql(t.text)];if(t.type==="user_message"){let n=Op(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Ml(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Yb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Qb(e){if(e.schema!=="codex-delegation-monitor-v1"||!Fn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Fn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ql(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=Ml(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=Bb[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Xb(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Zb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Fn(t)?t:null}function Rp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=Zb(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return Kb(i,r);let s=i.schema==="codex-delegation-monitor-v1"?Qb(i):Xb(i)?Vb(i):Gb(i,n);return s.length>0&&(r.progress=null),s}}}function Nl(e){let t=[],n=Rp(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var Jb=5,ey=10,ty=/Task\s+#(\d+)/,ny=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ry=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function bs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function oy(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function sy(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function iy(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=ty.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function ay(e){if(e.tool==="Bash"){let t=e.command||"";return ny.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ry.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ly(e){let t=e.filter(o=>o.kind==="tool").slice(-ey),n=new Map;t.forEach((o,i)=>{let s=ay(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function cy(e){let t=sy(e);if(t)return{text:t,guess:!1};let n=iy(e);if(n)return{text:n,guess:!1};let r=ly(e);return r?{text:r,guess:!0}:null}function uy(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:mn(e,t)}function ko(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,f={},m=!0,g=new Set,v=new Set,O=null,R=null,X=!1,ee=!1,Y=!1,L=null,I=null;function P(){X=!1,ee=!1,Y=!1,L=null,I=null}async function j(Q){if(n){ee=!0,Y=!1,Te();try{let B=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Q,...u?{root_dir:u}:{}}));if(i!==Q)return;!B||typeof B!="object"||Array.isArray(B)?Y=!0:(L=B,I=Q)}catch{i===Q&&(Y=!0)}finally{i===Q&&(ee=!1,Te())}}}function V(){if(X=!X,X&&i&&I!==i){j(i);return}Te()}function M(){if(!X)return"";let Q=vo({loading:ee,error:Y});if(Q)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Q}
      </div>`;if(!L)return"";if(L.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let B=Yi(L.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${B?c`<div class="prompt-block__meta">${B} 발송</div>`:""}
      ${typeof L.task_prompt=="string"?ar("\uACFC\uC5C5 (user)",L.task_prompt):""}
      ${typeof L.system_prompt=="string"?ar("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",L.system_prompt):""}
    </div>`}function q(){if(!a||!r)return[];let Q=r.get(a);return Nl(Q?Q.lines:[])}function K(){if(!a||!r)return null;let Q=r.get(a),B=Q?Q.last_event_at:null;return typeof B=="number"?B:null}function U(){return f.status==="running"}function te(){if(U()&&i){R||(R=setInterval(()=>Te(),1e3));return}be()}function be(){R&&(clearInterval(R),R=null)}function Ne(Q){let B=[],Fe=0;for(;Fe<Q.length;){let{idx:_t,line:pt}=Q[Fe];if(pt.kind==="tool"){let He=Fe;for(;He<Q.length&&Q[He].line.kind==="tool"&&Q[He].line.tool===pt.tool;)He+=1;if(He-Fe>=Jb&&!v.has(_t)){B.push({kind:"group",idx:_t,tool:pt.tool||"",lines:Q.slice(Fe,He)}),Fe=He;continue}}B.push({kind:"line",idx:_t,line:pt}),Fe+=1}return B}function F(Q){let B=[],Fe=new Map;for(let He=0;He<Q.length;He+=1){let it=Q[He],w=it.parent_tool_use_id;if(typeof w=="string"&&w.length>0){let Z=Fe.get(w);Z||(Z={kind:"subagent",idx:He,launch_id:w,agent_type:null,header:null,lines:[]},Fe.set(w,Z),B.push(Z)),Z.lines.push({idx:He,line:it});continue}if(it.kind==="tool"&&it.tool==="Agent"&&typeof it.launch_id=="string"&&it.launch_id.length>0){let Z=J(it),Ce=Fe.get(it.launch_id);if(Ce){Ce.header={idx:He,line:it},Ce.agent_type=Z;continue}let Ye={kind:"subagent",idx:He,launch_id:it.launch_id,agent_type:Z,header:{idx:He,line:it},lines:[]};Fe.set(it.launch_id,Ye),B.push(Ye);continue}B.push({kind:"entry",idx:He,line:it})}let _t=[],pt=0;for(;pt<B.length;){if(B[pt].kind!=="entry"){_t.push(B[pt]),pt+=1;continue}let He=pt;for(;He<B.length&&B[He].kind==="entry";)He+=1;_t.push(...Ne(B.slice(pt,He))),pt=He}return _t}function J(Q){let B=Q.input;return B&&typeof B.subagent_type=="string"?B.subagent_type:null}function he(Q){for(let B=Q.length-1;B>=0;B-=1){let Fe=Q[B];if(Fe.kind==="result"||Fe.kind==="error")return null;if(Fe.kind==="tool"&&!Object.hasOwn(Fe,"result"))return Fe}return null}function Re(Q){for(let B=Q.length-1;B>=0;B-=1)if(Q[B].kind==="thinking")return Q[B];return null}function C(Q,B){if(B.kind==="gate")return c`<div class="sv__gate">${B.text}</div>`;if(B.kind==="phase")return c`<div class="sv__phase">${B.text}</div>`;if(B.kind==="result")return c`<div
        class="sv__result${B.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${B.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${yr(B.text||(B.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(B.kind==="thinking"){let Fe=g.has(Q);return c`<div
        class="sv__think${Fe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>dt(Q)}
      >
        <span class="sv__think-line">💭 ${bs(B.text)}</span>
        ${Fe?c`<pre class="sv__think-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="user"){let Fe=g.has(Q);return c`<div
        class="sv__line sv__line--user${Fe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>dt(Q)}
      >
        <span class="sv__user-line">▷ ${bs(B.text)}</span>
        ${Fe?c`<pre class="sv__user-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="error")return c`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="blocker")return c`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="tool"){let Fe=g.has(Q),_t=B.tool==="Bash"?oy(B.command):0,pt=B.tool==="Bash"?_t>1?bs(B.command):B.command:B.path||B.command||"";return c`<div
        class="sv__tool${Fe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>dt(Q)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${B.icon}</span>
          <span class="sv__tool-name">${B.tool}</span>
          ${pt?c`<span class="sv__tool-detail">${pt}</span>`:""}
          ${_t>1?c`<span class="sv__tool-more">⋯ ${_t}줄</span>`:""}
          ${typeof B.added=="number"?c`<span class="sv__diff-add">+${B.added}</span>`:""}
          ${typeof B.removed=="number"?c`<span class="sv__diff-del">−${B.removed}</span>`:""}
          ${B.result?c`<span class="sv__tool-ok">→ ${B.result}</span>`:""}
        </span>
        ${Fe?c`<pre class="sv__tool-expand">${se(B)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${yr(B.text||"")}</div>`}function se(Q){let B=[];if(Q.tool==="Bash"&&typeof Q.command=="string"&&Q.command.length>0)B.push(Q.command);else if(Q.input!==void 0)try{B.push(`input: ${JSON.stringify(Q.input,null,2)}`)}catch{}return typeof Q.output=="string"&&Q.output.length>0&&B.push(`output:
${Q.output}`),B.join(`

`)}function ye(){if(!i)return c``;let Q=q(),B=(s?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Fe=f.session_id||"",_t=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${m?"ON":"OFF"}`,pt=U(),He=pt?uy(K(),Date.now()):"",it=pt?he(Q):null,w=pt?Re(Q):null,Z=cy(Q);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(s?f.role||"":i)}</span
        >
        ${Z?c`<span
              class="sv__stage${Z.guess?" sv__stage--guess":""}"
              title=${Z.text}
              >${Z.text}</span
            >`:""}
        ${pt?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${He?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${He}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${He?c`<span class="sv__live-ago">${He}</span>`:""}</span
            >`:""}
        ${Fe?c`<button
              type="button"
              class="sv__session"
              title=${Fe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Fe}`}
              @click=${()=>re(Fe)}
            >
              ⧉ ${Fe.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>re(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${B?c`<span class="sv__meta">${B}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${X?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${X?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${V}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${m?" sv__follow--on":""}"
          aria-pressed=${m?"true":"false"}
          aria-label=${_t}
          @click=${G}
        >
          <span class="sv__follow-full">⇣ ${_t}</span>
          <span class="sv__follow-short">⇣ ${m?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>We()}
        >
          ✕
        </button>
      </div>
      ${s||d?"":M()}
      <div class="sv__body">
        ${Q.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:F(Q).map(Ce=>Ce.kind==="subagent"?Pe(Ce):Ce.kind==="group"?Ae(Ce):C(Ce.idx,Ce.line))}
      </div>
      ${it||w?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${it?c`<span class="sv__now-icon">${it.icon}</span>
                  <span class="sv__now-name">${it.tool}</span>
                  <span class="sv__now-detail"
                    >${it.tool==="Bash"?bs(it.command):it.path||it.command||""}</span
                  >`:""}
            ${w?c`<span class="sv__now-think"
                  >💭 ${bs(w.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ae(Q){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ve(Q.idx)}
    >
      <span class="sv__group-icon">${Q.lines[0].line.icon}</span>
      <span class="sv__group-name">${Q.tool}</span>
      <span class="sv__group-count">${Q.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Pe(Q){let B=v.has(Q.idx),Fe=Q.header?Q.header.line:null,_t=Fe?Fe.is_error===!0?"\u2717":typeof Fe.result=="string"?"\u2713":"\u27F3":"",pt=Fe&&Fe.command?Fe.command:"";return c`<div class="sv__sub${B?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ve(Q.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Q.agent_type||"subagent"}</span>
        ${pt?c`<span class="sv__sub-detail">${pt}</span>`:""}
        <span class="sv__sub-count">${Q.lines.length}줄</span>
        ${_t?c`<span class="sv__sub-state">${_t}</span>`:""}
        ${B?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${B?c`<div class="sv__sub-body">
            ${Ne(Q.lines).map(He=>He.kind==="group"?Ae(He):C(He.idx,He.line))}
          </div>`:""}
    </div>`}function ve(Q){v.add(Q),Te()}function Te(){ft(ye(),e),te(),m&&ut()}function ut(){let Q=e.querySelector(".sv__body");Q&&(Q.scrollTop=Q.scrollHeight)}function dt(Q){g.has(Q)?g.delete(Q):g.add(Q),Te()}function G(){m=!m,Te()}function re(Q){gn(Q).then(B=>{B?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ne(Q){!i||!Q||(f={...f,...Q},Te())}function ue(Q){let B=Q.target;if(!B||!B.classList||!B.classList.contains("sv__body"))return;!(B.scrollHeight-B.scrollTop-B.clientHeight<=4)&&m&&(m=!1,Te())}e.addEventListener("scroll",ue,!0);function ke(Q){let B=Q.target;!B||typeof B.closest!="function"||e.contains(B)||B.closest("dialog")||B.closest(".md-viewer-root")||We()}let pe=!1;function qe(){pe||(document.addEventListener("mousedown",ke),pe=!0)}function Be(){pe&&(document.removeEventListener("mousedown",ke),pe=!1)}function Je(Q){let B=Q&&Q.attempt_id;if(!B)return;let Fe=typeof Q.launch_id=="string"&&Q.launch_id.length>0?Q.launch_id:null,_t=Q.session_ref&&typeof Q.session_ref=="object"?Q.session_ref:null;if(Fe&&_t)return;let pt=a;i=B,s=Fe,l=_t,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&pt&&pt!==a&&Promise.resolve(n("unsubscribe-session-log",{id:pt})).catch(()=>{}),u=typeof Q.root_dir=="string"&&Q.root_dir.length>0?Q.root_dir:null,f=Q.meta||{},d=Q.hide_prompt===!0,m=!0,g.clear(),v.clear(),P(),!O&&r&&(O=r.subscribe(Te)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),qe(),Te()}function We(){let Q=a;Be(),i=null,s=null,l=null,a=null,u=null,d=!1,g.clear(),v.clear(),P(),be(),n&&Q&&Promise.resolve(n("unsubscribe-session-log",{id:Q})).catch(()=>{}),ft(c``,e),o&&o()}return{open:Je,updateMeta:ne,close:We,isOpen(){return i!==null},destroy(){be(),Be(),O&&(O(),O=null),e.removeEventListener("scroll",ue,!0),i=null,s=null,l=null,a=null,u=null,d=!1,ft(c``,e)}}}function dy(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function Ip(e,t){let n=dy(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${o=>t.onCopyPath(o,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${o=>t.onOpenDoc(o,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var py="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",fy=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,_y=/^\*\*결론\*\* — (.+)$/;function Vi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==py)return null;let n=fy.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?_y.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Lp=20;function Dp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function my(e){return e.length>Lp?`${e.slice(0,Lp)}\u2026`:e}function gy(e,t,n,r){let o=`${t.lane} ${my(t.identifier)}`;return c`<div class="detail-report">
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
          >${o}</span
        >
        <span class="detail-report__time">${Dp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${yr(t.body)}
        </div>`:""}
  </div>`}function hy(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Dp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${yr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Pp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Vi(typeof a.text=="string"?a.text:"");return u?gy(a,u,t,o.has(a.id)):hy(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${s}
        .value=${i}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${s||i.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:tA}=_c;var Mp=e=>e.strings===void 0;var by={},qp=(e,t=by)=>e._$AH=t;var vr=Fi(class extends yo{constructor(e){if(super(e),e.type!==sr.PROPERTY&&e.type!==sr.ATTRIBUTE&&e.type!==sr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Mp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===En||t===Yt)return t;let n=e.element,r=e.name;if(e.type===sr.PROPERTY){if(t===n[r])return En}else if(e.type===sr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return En}else if(e.type===sr.ATTRIBUTE&&n.getAttribute(r)===t+"")return En;return qp(e),t}});var yy=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],jl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Np={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},vy={pin:"pin",global:"global",base:"base"};function ky(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${vy[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function wy(e,t,n){switch(e){case"workflow_mode":return No;case"spec_review_model":case"impl_review_model":return jo;case"plan_review_model":return oi;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return si;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Gn;case"impl_dispatch":return qo;case"impl_runtime":return ri;case"impl_model":return uo(n,t.impl_runtime);case"impl_effort":return Lr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Gn;case"orchestration_model":return po(n,null);case"orchestration_effort":return Lr(n,void 0,t.orchestration_model||wn).filter(r=>r!==wn);default:return[]}}function $y(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${ky(e.source)}
    <span class="detail-effective__k"
      >${_r[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ai[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${_r[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function jp(e,t){let n=Fa.flatMap(a=>a.keys),r=Ba(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Mu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let u=a.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${xy(i)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${o.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${o.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${o.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${Fa.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Zs({key:u.key,choices:wy(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return $y(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${vr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${a=>t.onPresetSelect(String(a.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(a=>c`<option
                    value=${a.id}
                    ?selected=${a.id===e.preset_id}
                  >
                    ${a.name}${a.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
              >세션 키 15개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function xy(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Ay(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Fp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Ay(r.exec_receipt),u=a?Jn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=Vs(r.planned_execution,r.exec_receipt),m=r.chips?.pr?.number,g=typeof m=="number"?`PR #${m}`:"PR",v=Bo(n),O=v!==null&&t.isChipOpen?.("rec")===!0,R=O?Za({rec:v},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${i?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${i}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${s?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${s}
            target="_blank"
            rel="noreferrer"
            >${g}</a
          >`:""}
      ${f?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${f.kind}
            title=${f.title}
            >${f.label}</span
          >`:""}
      ${u?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${v?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${v.state}
            aria-expanded=${O?"true":"false"}
            title=${ui(v)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${R?ao(R):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Sy(i).map(X=>Ey(X,n,o,{label:X.id==="pr"?g:X.label,href:X.id==="pr"?s:""}))}
    </div>
  </section>`}function Sy(e){let n=typeof e=="string"&&Object.hasOwn(jl,e)&&jl[e]||jl.spec_backed;return yy.filter(r=>n.includes(r.id))}var Qi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Ey(e,t,n,r){let o=Ty(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?Qi.stale:l?Qi.on:a?Qi.current:Qi.none,m=Cy(e,n),g=`${r.label} \xB7 ${f}${m?` \xB7 ${m}`:""}${o?` \xB7 ${o}`:""}`,v=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,O=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${v}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${g}
      >${O}</a
    >`:c`<span
    class=${v}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${g}
    >${O}</span
  >`}function Ty(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Cy(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Np,n)?Np[n]:""}function Xi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Bp(e){return Xi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Up(e,t){let n=e&&e[t];if(!Xi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Bp),o=Bp(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function Hp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Zi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Hp(e)}${t}`}function wo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Hp(e)}`}function Oy(e,t,n){if(n!==null){let o=e==="claude"?Zi:wo,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:wo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Wp(e,t){if(!Xi(e)||e.state!=="usable"||!Xi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function zp(e){let t=e.provider_key==="claude"?Zi:wo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Oy(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Kp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${zp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Up(t,"claude"),selected:o,workspace_default:Wp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${zp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Up(t,"codex"),selected:i,workspace_default:Wp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Ry(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Iy(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ji(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(O){O.key==="Escape"&&o&&(O.preventDefault(),g())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>g()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Ry(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>g()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${a}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${yr(s)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){ft(d(),e)}async function m(O,R={}){o=O,i="loading",s="",l=null,a="",f();let X=R.workspace||(n?n():"");if(!X){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let ee="/api/doc?workspace="+encodeURIComponent(X)+"&path="+encodeURIComponent(O);try{let Y=await r(ee),L=await Y.json().catch(()=>({}));if(!Y.ok||!L||L.ok!==!0){if(L?.error==="not_found"&&R.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(L&&L.error||Y.status)+")",f();return}let I=Iy(String(L.content||""));l=I.front,s=I.body,i="ready",f()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function g(){o=null,ft(c``,e)}function v(){document.removeEventListener("keydown",u),g()}return{open:m,close:g,destroy:v}}var Ly=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Vp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ea=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Dy=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Gp(e){return typeof e=="string"&&Dy.has(e)}var Py=["running","done","failed","interrupted"],My={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function qy(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Ny(e){let t=un(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=so(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Vp}
          >부분 집계</span
        >`:""}`}function Yp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ul(e){if(typeof e=="number")return ys(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ys(t):""}function jy(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Qp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Fl(e){return e===null||typeof e=="string"&&e.trim().length>0}function Bl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Fy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ea.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Fl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Fl(t.effort))||!(!("agent_type"in t)||Fl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Py.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Bl(t.started_at)||!Bl(t.last_event_at)||!Bl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function By(e,t,n,r){let i=un({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=Qp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${s.title}
      >${s.text}</span
    >
    ${Ul(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Ul(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </div>`}function Uy(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?un({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?ys(e.last_event_at):i?Ul(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,jy(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Qp(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${My[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${u}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${d.title}
      >${d.text}</span
    >
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}
  </button>`}function Wy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function zy(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of i){let m=Fy(f);!m||o.has(m.launch_id)||Gp(m.agent_type)||(o.add(m.launch_id),r.push(m))}r.sort((f,m)=>(f.started_at||0)-(m.started_at||0));let s={};for(let{role:f,provider:m}of ea){let g=t?t.roles[f]?.[m]:null;s[f]=g?[...g.legs]:[]}let l=ea.flatMap(({role:f})=>s[f]),a=new Set,u=new Set,d=[];for(let{role:f,provider:m}of ea){for(let g of r.filter(v=>v.role===f&&v.provider===m)){let v=l.find(R=>R.receipt_id===g.launch_id)||null;if(v&&!Wy(g,v))continue;v&&a.add(v.receipt_id);let O=m==="codex"&&u.has(g.session_id);d.push(Uy(g,v,e.attempt_id,n,O)),m==="codex"&&u.add(g.session_id)}for(let g of s[f])if(!a.has(g.receipt_id)&&!Gp(g.agent_type)){let v=typeof g.session_id=="string"&&g.session_id.length>0?g.session_id:null,O=m==="codex"&&v!==null&&u.has(v);d.push(By(f,m,g,O)),m==="codex"&&v!==null&&u.add(v)}}return d}function Hy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Ly,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${qy(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Vp}</span>`:""}
  </div>`}var Ky={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ys(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Gy(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Yy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Vy(e,t){let n=Yy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ia(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Lo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${ys(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Xp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(g=>g&&g.current===!0),...i.filter(g=>g&&g.current!==!0).sort((g,v)=>v.index-g.index)],l=s.map(g=>Vy(g,t)),a=n.expanded||new Set;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let g of o)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&u.add(g.resumed_from);let d=g=>{if(!(g.status==="failed"||g.status==="orphaned"))return"";let O=typeof g.session_id=="string"&&g.session_id.length>0,R=u.has(g.attempt_id),X=O&&!R,ee=O?R?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${g.attempt_id}
      ?disabled=${!X}
      title=${ee}
      @click=${Y=>{Y.stopPropagation(),X&&t.onResume&&t.onResume(g.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=g=>{if(!(g.status==="failed"||g.status==="orphaned")||typeof g.cause!="string"||g.cause==="")return"";let O=g.cause_detail,R=O&&typeof O.reason=="string"&&O.reason.length>0?typeof O.command=="string"&&O.command.length>0?`${O.reason} \xB7 ${O.command}`:O.reason:g.cause;return c`<div class="detail-session__cause" title=${R}>
      ${g.cause}
    </div>`},m=g=>{let v=Yp(Ma(g));if(un(v).length===0&&!so(g.usage))return"";let O=a.has(g.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${g.attempt_id}
      aria-expanded=${O?"true":"false"}
      title=${O?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${R=>{R.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(g.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Ny(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(g=>{let v=Ma(g),O=Yp(v),R=un(O);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${g.status||"unknown"}"
            data-attempt-id=${g.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(g.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Ky[g.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${g.attempt_id}</span>
            ${Io(g)?c`<span
                  class="detail-session__resumed"
                  title=${Io(g)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${An(g)}</span>
            ${R.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${g.session_id?c`<span class="detail-session__sid" title=${g.session_id}
                  >${String(g.session_id).slice(0,8)}</span
                >`:""}
            ${R.length>0?R.map(X=>c`<span
                      class="detail-session__usage"
                      title=${X.tooltip}
                      >${X.label}</span
                    >`):so(g.usage)?c`<span class="detail-session__usage"
                    >${so(g.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ys(g.started_at)}</span>
          </button>
          ${m(g)} ${d(g)} ${f(g)} ${Gy(g)}
          ${a.has(g.attempt_id)&&g.usage?Hy(g.usage,g.runner==="codex"?"codex":"claude"):""}
          ${zy(g,v,t)}
        </div>`})}
    </div>
  `}function Zp(e,t={}){return c`
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
          ${Qy(e)}
        </div>`:""}
  `}function Qy(e){let t=vo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?ar("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Yi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?ar("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?ar("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Br=10;function Jp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function ef(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Br,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${Jp(l.at)?c`<span class="detail-timeline__at"
                  >${Jp(l.at)}</span
                >`:""}
            <span class="detail-timeline__summary">${l.summary}</span>
          </li>`)}
    </ol>
    ${s>0?c`<button
          type="button"
          class="detail-timeline__more"
          data-seam="worker-timeline-more"
          @click=${()=>t.onMore&&t.onMore()}
        >
          더 보기 (${s})
        </button>`:""}
  `}var Xy=["open","in_progress","deferred","resolved","closed"],Zy=[0,1,2,3,4];function tf(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},m="",g=!1,v=[],O=!1,R=!1,X={},ee={claude:null,codex:null},Y=null,L=null,I=0,P=!1,j=!1,V="",M="",q="",K="",U=!1;function te(){P=!1,j=!1,V="",M="",q="",K="",U=!1}function be(){ee={claude:null,codex:null},Y=null,L=null,I+=1}async function Ne(){if(!o)return null;try{let k=await Promise.resolve(o("get-workspace-accounts",{}));return k&&typeof k.state=="string"?k:null}catch{return null}}async function F(k){try{let D=await fetch(k);if(!D.ok)return null;let W=await D.json();if(!W||typeof W!="object"||!Array.isArray(W.accounts))return null;let xe=W.accounts.filter(ze=>ze!==null&&typeof ze=="object"&&!Array.isArray(ze));return{accounts:xe,active:xe.find(ze=>ze.active===!0)||null}}catch{return null}}async function J(k){L=k;let D=++I,[W,xe,ze]=await Promise.all([F("/api/claude-usage"),F("/api/codex-usage"),Ne()]);D!==I||k!==u||(ee={claude:W,codex:xe},Y=ze,st())}let he=[],Re=null,C=null,se=!1,ye="",Ae=!1,Pe=0,ve=new Set;function Te(){he=[],Re=null,C=null,se=!1,ye="",Ae=!1,Pe+=1,ve.clear()}async function ut(k){if(!o)return;let D=++Pe;try{let W=await Promise.resolve(o("get-comments",{id:k}));if(D!==Pe||k!==u)return;he=Array.isArray(W)?W:[],se=!1}catch{if(D!==Pe||k!==u)return;se=!0}st()}function dt(){if(!o||!u)return;let k=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Re!==u){Re=u,C=k,ut(u);return}k!==null&&k!==C&&(C=k,ut(u))}function G(k){ve.has(k)?ve.delete(k):ve.add(k),st()}function re(k){let D=ye.trim().length===0;ye=k,D!==(k.trim().length===0)&&st()}async function ne(){let k=ye.trim();if(!o||!u||k.length===0||Ae)return;let D=u;Ae=!0,st();let W=!1;try{let xe=await Promise.resolve(o("add-comment",{id:D,text:k}));Array.isArray(xe)&&xe.length>0&&(W=!0,D===u&&(he=xe,se=!1,ye="",C=xe.length))}catch{W=!1}W||ge("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),D===u&&(Ae=!1),st()}let ue={onToggle:G,onDraftInput:re,onSubmit:ne},ke=t.mdViewer||null,pe=null;ke||(pe=document.createElement("div"),pe.className="md-viewer-root",document.body.appendChild(pe));let qe=ke||Ji(pe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Be=document.createElement("div");Be.className="session-log-root",document.body.appendChild(Be);let Je=ko(Be,{transport:o?(k,D)=>Promise.resolve(o(k,D)):void 0,sessionLogStore:a}),We=!1,Q=!1,B=!1,Fe=null,_t=null,pt=0;function He(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function it(){We=!1,Q=!1,B=!1,Fe=null,_t=null,pt+=1}async function w(k){if(!o)return;let D=++pt;Q=!0,B=!1,st();try{let W=await Promise.resolve(o("get-bead-prompt",{bead_id:k}));if(D!==pt)return;!W||typeof W!="object"||Array.isArray(W)?B=!0:(Fe=W,_t=He(k))}catch{D===pt&&(B=!0)}finally{D===pt&&(Q=!1,st())}}let Z=[],Ce=null,Ye=0;function Ke(k,D){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}::${D}`}function je(){Z=[],Ce=null,Ye+=1}async function Et(k,D){if(!o)return;let W=++Ye,xe;try{xe=await Promise.resolve(o("get-session-refs",{bead_id:k}))}catch{xe=null}W!==Ye||D!==Ce||(Z=xe&&Array.isArray(xe.sessions)?xe.sessions:[],st())}function Pt(){if(!o||!u)return;let k=d&&d.metadata,D=k&&typeof k=="object"&&typeof k.session_ref=="string"?k.session_ref:null;if(D===null){je();return}let W=Ke(u,D);Ce!==W&&(Z=[],Ce=W,Et(u,W))}let rt=[],Tt=[],jt=Br,It=null,Ut=0;function ae(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function we(){rt=[],Tt=[],jt=Br,It=null,Ut+=1}async function Ge(k,D){if(!o)return;let W=++Ut,xe;try{xe=await Promise.resolve(o("get-bead-timeline",{bead_id:k}))}catch{xe=null}W!==Ut||D!==It||(rt=xe&&Array.isArray(xe.events)?xe.events:[],Tt=xe&&Array.isArray(xe.attempts)?xe.attempts:[],jt=Br,st())}function ot(){if(!o||!u)return;let k=ae(u);It!==k&&(rt=[],Tt=[],jt=Br,It=k,Ge(u,k))}function et(){jt+=Br,st()}function mt(){if(We=!We,We&&u&&_t!==He(u)){Fe=null,w(u);return}st()}function bt(){let k={};for(let W of Tt)W&&typeof W=="object"&&W.bead_id===u&&(k[String(W.attempt_id)]=W);let D=s?s.get():null;for(let W of D&&D.attempts?Object.values(D.attempts):[]){let xe=W;xe&&xe.bead_id===u&&(k[String(xe.attempt_id)]=xe)}return k}function tt(){return u?Object.values(bt()).sort((D,W)=>(W.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]})):[]}function me(){return u?tr(bt(),u):null}let A=new Set;function N(k){A.has(k)?A.delete(k):A.add(k),st()}function ie(k){let D=s?s.get():null,W=D&&D.attempts?D.attempts[k]:null;Je.open({attempt_id:k,meta:W?{runner:W.runner||void 0,model:W.model||void 0,effort:W.effort||void 0,status:W.status||void 0,session_id:W.session_id||void 0}:{}})}function Se(k,D){let W=s?s.get():null,xe=W&&W.attempts?W.attempts[k]:null,ct=(xe&&Array.isArray(xe.delegation_sessions)?xe.delegation_sessions:[]).find(Ft=>Ft&&typeof Ft=="object"&&Ft.launch_id===D);ct&&Je.open({attempt_id:k,launch_id:D,meta:{runner:ct.provider==="claude"?"claude":"codex",role:ct.role,...typeof ct.agent_type=="string"?{agent_type:ct.agent_type}:{},model:ct.model,effort:ct.effort,session_id:ct.session_id,status:ct.status}})}async function _e(k){if(!o||!k)return;let D=o,W=()=>{let ze=s?s.get():null;return ze&&typeof ze.revision=="number"?ze.revision:0},xe=s?.get()?.attempts?.[k]||null;await no({context:{bead_id:xe?.bead_id||u||"",kind:"session",tuple:xe?An(xe):""},transport:ze=>D("worker-attempt-resume",{attempt_id:k,expected_revision:W(),...ze}),adopt:ze=>{ze?.queue&&s?.set&&s.set(ze.queue)}})}async function gt(k,D){if(!o||!k)return;let W=o,xe=()=>{let Ze=s?s.get():null;return{bead_id:k,...D==="parallel"?{}:{lane:D},expected_revision:Ze&&typeof Ze.revision=="number"?Ze.revision:0}},ze=Ze=>{Ze?.queue&&s?.set&&s.set(Ze.queue)},ct=await Promise.resolve(W("worker-queue-place",xe()));if(ze(ct),ct&&ct.conflict&&(ct=await Promise.resolve(W("worker-queue-place",xe())),ze(ct)),st(),!ct)return;if(ct.applied===!1&&typeof ct.admission_reason=="string"){ge(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${ct.admission_reason}`,"error",2400);return}if(ct.reason==="rejected"){ge("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(ct.applied===!1)return;let Ft=ct.queue?Ho({id:k},ct.queue).location:null;Ft&&"index"in Ft&&ge(`${td(Ft.lane)} \uB300\uAE30 #${Ft.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function kt(k,D){if(D){R=!0,st();return}gt(k,"parallel")}function wt(k,D){let ze=(k.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;ze&&(ze!=="parallel"&&!/^s[1-5]$/.test(ze)||(R=!1,st(),gt(D,ze)))}function $t(k){!k||!u||Je.open(ro(k,u,d&&d.status))}let Kt={onOpen:ie,onOpenDelegation:Se,onResume:_e,onToggleUsage:N,onOpenSessionRef:$t,onCopyResumeCommand:x};function Wt(){let k=s?s.get():null,D={...X};for(let W of[...Dn,...lo]){let xe=k&&k[W];typeof xe=="string"&&(D[W]=xe)}return D}async function zt(){if(o){try{let k=await Promise.resolve(o("get-session-defaults",{}));X=k&&k.values&&typeof k.values=="object"?k.values:{}}catch{X={}}st()}}function St(){let k=s?s.get():null;return k&&k.runner_catalog||null}function nn(){let k=s?s.get():null;return k&&typeof k.execution_defaults=="object"?k.execution_defaults:null}function Zt(){let k=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},W=Sn({pin:{...k,...f},global:Wt(),execution_defaults:nn(),runner_catalog:St(),route:typeof k.route=="string"?k.route:null}).orchestration_model.value||"";return Pn(St(),W)}function qt(){let k=l?l.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function Rt(k){return k?.compatible===!1}function Jt(k){l&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&l.set({revision:k.revision,presets:k.presets})}async function Ee(){let k=qt(),D=k?.presets.find(W=>W.id===m);if(!(!o||!u||!k||!D||Rt(D)||g)){g=!0,v=[],st();try{let W=await Promise.resolve(o("apply-impl-preset",Nu(u,D.id,k.revision)));if(W&&W.conflict){Jt(W),ge("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let xe=W&&Array.isArray(W.issue)?W.issue[0]:W?.issue;if(W&&W.applied&&xe&&typeof xe=="object"){d=xe,v=Array.isArray(W.skipped_orchestration_keys)?W.skipped_orchestration_keys.filter(ze=>typeof ze=="string"):[];for(let ze of ju)delete f[ze];ge(v.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}W&&W.error==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(W){W&&typeof W=="object"&&W.code==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{g=!1,st()}}}let T=null;n&&n.subscribe&&(T=n.subscribe(()=>_()));let de=null;s&&typeof s.subscribe=="function"&&(de=s.subscribe(()=>{u&&st()}));let De=null,yt=null;function Qe(){yt&&(yt(),yt=null)}l&&typeof l.subscribe=="function"&&(De=l.subscribe(()=>{u&&st()}));function y(k){k.key==="Escape"&&u&&(k.preventDefault(),r())}document.addEventListener("keydown",y);let p=io(()=>st());p.attach();function _(){if(u){if(n&&typeof n.snapshotFor=="function"){let k=n.snapshotFor("detail:"+u)||[];d=k.find(W=>W&&W.id===u)||k[0]||d}dt(),Pt(),ot(),st()}}function x(k){gn(k).then(D=>{D?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function z(k){k.preventDefault(),k.stopPropagation(),u&&x(u)}function H(k,D){k.preventDefault(),k.stopPropagation(),x(D)}function le(k,D,W){k.preventDefault(),k.stopPropagation(),qe.open(D,{missing_state:W})}async function Ie(k,D){let W=Object.hasOwn(f,k),xe=f[k];if(f[k]=D,st(),!(!o||!u))try{let ze=await Promise.resolve(o("update-exec-settings",qu(u,k,D.length===0?null:D))),ct=Array.isArray(ze)?ze[0]:ze;if(!ct||typeof ct!="object"||!ct.id)throw new Error("exec settings readback failed");d=ct,delete f[k],st()}catch(ze){throw W?f[k]=xe:delete f[k],st(),ge("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),ze}}function nt(k){k.catch(()=>{})}async function $e(k,D){let W=d||{},xe=W.metadata&&typeof W.metadata=="object"?W.metadata:{},ze={};for(let Ze of["impl_runtime","impl_model","impl_effort"])ze[Ze]=Object.hasOwn(f,Ze)?f[Ze]:typeof xe[Ze]=="string"?xe[Ze]:"";ze[k]=D;let ct=Uu(ze,St(),Zt()),Ft={};for(let Ze of["impl_runtime","impl_model","impl_effort"])Ft[Ze]=f[Ze],f[Ze]=ct[Ze]||"";if(st(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...ct,orchestration_runtime:Zt()})).then(Ze=>{let fe=Array.isArray(Ze)?Ze[0]:Ze;if(!fe||typeof fe!="object"||!fe.id)throw new Error("implementation target readback failed");d=fe;for(let vt of["impl_runtime","impl_model","impl_effort"])delete f[vt];st()}).catch(Ze=>{for(let fe of["impl_runtime","impl_model","impl_effort"])Ft[fe]===void 0?delete f[fe]:f[fe]=Ft[fe];throw st(),ge("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ze})}async function $(k,D,W){if(!o||!u)return!1;try{let xe=await Promise.resolve(o(k,D)),ze=Array.isArray(xe)?xe[0]:xe;return ze&&typeof ze=="object"&&ze.id?(d=ze,!0):(ge(W,"error"),!1)}catch(xe){return xe&&typeof xe=="object"&&xe.code==="bd_readback_failed"?(ge("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ge(W,"error"),!1)}}function S(k){setTimeout(()=>{try{let D=e.querySelector(k);D&&typeof D.focus=="function"&&D.focus()}catch{}},0)}function Me(){P=!0,V=d&&d.title||"",st(),S('.detail-edit__input[data-edit="title"]')}function Oe(k){V=k.target.value}function Xe(){P=!1,V="",st()}function xt(){$("edit-text",{id:u,field:"title",value:V},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(P=!1,V=""),st()})}function Nt(){j=!0,M=d&&d.description||"",st(),S('.detail-edit__textarea[data-edit="description"]')}function en(k){M=k.target.value}function zr(){j=!1,M="",st()}function $n(){$("edit-text",{id:u,field:"description",value:M},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(j=!1,M=""),st()})}function Ar(k,D,W,xe){if(k.key==="Escape"){k.stopPropagation(),W();return}k.key==="Enter"&&(!xe||k.ctrlKey||k.metaKey)&&(k.preventDefault(),D())}function Hr(k){let D=k.target.value;$("update-status",{id:u,status:D},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>st())}function pa(k){let D=Number(k.target.value);$("update-priority",{id:u,priority:D},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>st())}function xs(k){q=k.target.value}function As(){let k=q.trim();k.length!==0&&$("label-add",{id:u,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(D=>{D===!0&&(q=""),st()})}function fa(k){if(k.key==="Escape"){k.stopPropagation(),q="",st();return}k.key==="Enter"&&(k.preventDefault(),As())}function Ss(k){$("label-remove",{id:u,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>st())}let Es={onCopyPath:H,onOpenDoc:le};function b(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function h(k){return k&&typeof k=="object"?String(k.dependency_type||k.type||""):""}function E(k){switch(k){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return k.length>0?{glyph:`${k} `,relation:k}:{glyph:"",relation:""}}}function oe(k,D){let W=ce(D),xe=[];return k.length>0&&xe.push(k),W&&xe.push(W),xe.length>0?xe.join(`
`):void 0}function ce(k){if(!k||typeof k!="object")return;let D=typeof k.status=="string"?k.status:"",W=typeof k.title=="string"?k.title:"";return D.length>0&&W.length>0?`${D} \xB7 ${W}`:void 0}function Le(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Ue(){return t.depCandidates?t.depCandidates():null}async function Ct(k,D,W){let xe=Le(),ze=u;if(!ze)return;if(xe.length===0){ge("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let ct=await $(k,{a:ze,b:D,view_id:ze,root_dir:xe},W),Ft=ct===!0||ct!==!1&&ct.saved===!0;Ft&&t.onDepChanged&&t.onDepChanged({type:k,a:ze,b:D}),k==="dep-add"&&Ft&&(K="",U=!1),st()}function Qt(k){if(!u)return;let D=globalThis.confirm;typeof D=="function"&&!D(`${k}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Ct("dep-remove",k,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function lt(k){k.disabled||Ct("dep-add",k.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function sn(k){K=k.target.value,U=!0,st()}function ln(){U||(U=!0,st())}function Un(k,D){if(k.key==="Escape"){k.stopPropagation(),K="",U=!1,st();return}k.key==="Enter"&&(k.preventDefault(),D.length===1&&!D[0].disabled&&lt(D[0]))}function _n(k){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${K}
        @focus=${ln}
        @input=${sn}
        @keydown=${D=>Un(D,k)}
      />
      ${U||K.length>0?c`<div class="detail-dep-add__list">
            ${k.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:k.map(D=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${D.bead_id}
                      ?disabled=${D.disabled}
                      title=${pn(D.reason)}
                      @click=${()=>lt(D)}
                    >
                      <span class="detail-dep-add__repo"
                        >${D.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${D.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${D.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function dn(k,D){let W=D.get(k.id),xe=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${pn(k.title)}
          @click=${()=>W===void 0?i(k.id):i(k.id,W)}
        >
          ${k.label}
        </button>`:c`<span class="detail-dep__link" title=${pn(k.title)}
          >${k.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${k.kind}${i?" detail-dep--link":""}`}
      >${xe}${k.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${k.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+k.id}
            @click=${()=>Qt(k.id)}
          >
            ✕
          </button>`:""}</span
    >`}function On(k){let D=Array.isArray(k.dependencies)?k.dependencies:[],W=Array.isArray(k.dependents)?k.dependents:[],xe=[];for(let Ze of D){let fe=b(Ze);fe.length>0&&h(Ze)==="blocks"&&xe.push({id:fe,label:`\u26D3 ${fe}`,kind:"pred",title:oe("\uB9C9\uB294",Ze)})}for(let Ze of W){let fe=b(Ze);fe.length>0&&h(Ze)==="blocks"&&xe.push({id:fe,label:`\u2192 ${fe}`,kind:"succ",title:oe("\uB9C9\uD788\uB294",Ze)})}for(let Ze of D){let fe=b(Ze),vt=h(Ze);if(fe.length>0&&vt!=="blocks"){let Vt=E(vt);xe.push({id:fe,label:`${Vt.glyph}${fe}`,kind:"other",title:oe(Vt.relation,Ze)})}}let ze=Ue(),ct=new Map;if(ze)for(let Ze of ze.issues)ct.has(Ze.bead_id)||ct.set(Ze.bead_id,Ze.root_dir);let Ft=ze&&u?Vd(Yd(u,ze),K):[];return c`
      <div class="detail-section-label">의존성</div>
      ${xe.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${xe.map(Ze=>dn(Ze,ct))}
          </div>`}
      ${ze===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:_n(Ft)}
    `}function Vn(k){let D=k.metadata||{},W=k.workflow||{},xe=W.stages||{},ze=xe.spec&&xe.spec.stale,ct=xe.impl&&xe.impl.stale,Ft=W.quick_fix_review?.state==="stale",Ze=xe.plan||null,fe=W.route_source==="derived",vt=W.route||D.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${fe?" detail-kv__v--derived":""}"
          title=${fe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${fe?"unset":vt}</span
        >
      </div>
      ${W.route!=="quick_fix"||Object.hasOwn(D,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${D.spec_review||"\uC5C6\uC74C"}${ze?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ze?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ze?.approval_receipt||"\uC5C6\uC74C"}${Ze?.approval_state==="stale"?" \xB7 stale":Ze?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${W.route!=="quick_fix"||Object.hasOwn(D,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${D.impl_review||"\uC5C6\uC74C"}${ct?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${W.resolver.attempt} \xB7 ${W.resolver.prior_sha} \u2192 ${W.resolver.sha}`}
              >${`${W.resolver.prior_sha.slice(0,7)} \u2192 ${W.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${W.route==="quick_fix"||Object.hasOwn(D,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${D.quick_fix_review||"\uC5C6\uC74C"}${Ft?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${W.planned_execution.kind}</span>
            </div>
            ${W.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${W.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${W.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Jn(W.exec_receipt)}</span
            >
          </div>`:""}
      ${W.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${W.impl_entry.actor}@${W.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${D.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${D.pr_url}</span>
          </div>`:""}
    `}let an={route:["quick_fix","spec_backed","full_plan"]};async function Qn(k,D){let W=D.target.value;if(k==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&W!=="full_plan"&&!window.confirm(`full_plan \u2192 ${W||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){st();return}await $("update-workflow-meta",{id:u,key:k,value:W},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),st()}function lr(k){let D=k.metadata||{};return c` ${((xe,ze)=>{let ct=an[xe],Ft=typeof D[xe]=="string"?D[xe]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${xe}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${xe}
          data-edit=${`wfmeta-${xe}`}
          @change=${Ze=>Qn(xe,Ze)}
        >
          <option value="" ?selected=${!ct.includes(Ft)}>
            ${ze}
          </option>
          ${ct.map(Ze=>c`<option value=${Ze} ?selected=${Ft===Ze}>${Ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Rn(k,D){return P?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${V}
            @input=${Oe}
            @keydown=${W=>Ar(W,xt,Xe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${xt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Xe}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        ${un(D).map(W=>c`<span class="detail-usage-total" title=${W.tooltip}
              >${W.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Me}
        >
          ✎
        </button>
      </div>
    `}function Wn(k){let D=rn(k.created_at),W=rn(k.updated_at);return!D&&!W?c``:c`
      ${D?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
      ${W?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${W}</span>
          </div>`:""}
    `}function Ve(k,D){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Hr}
        >
          ${Xy.map(W=>c`<option value=${W} ?selected=${W===k}>${W}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${pa}
        >
          ${Zy.map(W=>c`<option value=${String(W)} ?selected=${W===D}>
                P${W}
              </option>`)}
        </select>
      </div>
    `}function Gt(k){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${j?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Nt}
            >
              ✎
            </button>`}
      </div>
      ${j?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${M}
              @input=${en}
              @keydown=${D=>Ar(D,$n,zr,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${$n}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${zr}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function xn(k){let D=typeof k.notes=="string"?k.notes:"";return D.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${D}</div>
    `}function Ts(k){let D=Array.isArray(k.labels)?k.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${D.map(W=>c`<span class="detail-label-chip"
              >${W}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${W}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+W}
                @click=${()=>Ss(W)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${q}
            @input=${xs}
            @keydown=${fa}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${As}
          >
            추가
          </button>
        </span>
      </div>
    `}function Cs(){if(!u)return c``;let k=d||{},D=String(k.id||u),W=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",xe=me(),ze=k.status||"open",ct=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",Ft=k.description||"",Ze=s?s.get():null,fe=Ze&&ze!=="closed"?Ho({...k,id:D},Ze):null,vt=Ze?Ko(Ze):null,Vt={...k,metadata:{...k.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${z}
            >
              ${D}
            </button>
            ${fe?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${D}
                  ?disabled=${!fe.placeable}
                  title=${Mr(fe)}
                  @click=${()=>kt(D,vt)}
                >
                  ↴ 대기로
                </button>`:""}
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${fe&&R&&vt?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${cn=>wt(cn,D)}
              >
                ${Xa(vt,D)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${D}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{R=!1,st()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Rn(W,xe)}
          ${Fp(Vt,{onChipToggle:cn=>p.toggle({bead_id:D,chip_key:cn}),isChipOpen:cn=>p.isOpen({bead_id:D,chip_key:cn})})}
          ${jp({metadata:Vt.metadata,workspace_values:Wt(),catalog:St(),execution_defaults:nn(),expanded:O,presets:qt()?.presets||[],preset_id:m,preset_busy:g,skipped_orchestration_keys:v},{onToggle:cn=>{O=cn,st()},onEdit:(cn,Os)=>{if(cn==="impl_runtime"||cn==="impl_model"||cn==="impl_effort"){nt($e(cn,Os??""));return}nt(Ie(cn,Os??""))},onPresetSelect:cn=>{m=cn,v=[],st()},onPresetApply:()=>{Ee()}})}
          ${Kp({md:Vt.metadata,catalog:ee,workspace_defaults:Y,handlers:{onExecChange:(cn,Os)=>nt(Ie(cn,Os))}})}
          ${Ve(ze,ct)} ${Wn(k)}
          ${Gt(Ft)}
          ${Pp(he,ue,{expanded:ve,draft:ye,sending:Ae,error:se})}
          ${xn(k)} ${Ts(k)} ${On(k)}
          ${Vn(k)} ${lr(k)}
          ${Ip(k,Es)}
          ${Zp({expanded:We,loading:Q,error:B,data:Fe},{onToggle:mt})}
          ${Xp(tt(),Kt,{total:xe,expanded:A},Z)}
          ${ef({events:rt,shown:jt},{onMore:et})}
        </div>
      </div>
    `}function st(){ft(Cs(),e)}return{load(k){k!==u&&(f={},R=!1,m="",v=[],O=!1,te(),Te(),it(),je(),we(),be()),u=k,d=null,!yt&&t.subscribeCandidates&&(yt=t.subscribeCandidates(()=>{u&&st()})),_(),zt(),L!==k&&J(k)},clear(){u=null,d=null,f={},R=!1,m="",g=!1,v=[],O=!1,te(),Te(),it(),je(),we(),be(),Qe(),qe.close(),Je.close(),ft(c``,e)},destroy(){T&&(T(),T=null),de&&(de(),de=null),De&&(De(),De=null),Qe(),document.removeEventListener("keydown",y),p.detach(),ke||(qe.destroy(),pe&&pe.parentNode&&pe.parentNode.removeChild(pe)),Je.destroy(),Be.parentNode&&Be.parentNode.removeChild(Be),u=null,d=null,be(),m="",g=!1,v=[],Te(),it(),je(),we(),ft(c``,e)}}}function nf(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let m=typeof f=="string"?f.trim():"";if(o&&(m.length>0?(o.textContent=m,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Jy="(max-width: 640px)";function ta(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Jy),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function ev(){return{lanes:{done:!0},areas:{}}}function vs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function tv(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:vs(r.lanes),areas:vs(r.areas)}:{lanes:vs(r),areas:{}}}catch{return null}}function rf(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function na(e,t=ev()){let n={lanes:vs(t.lanes),areas:vs(t.areas)},r=tv(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},rf(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},rf(e,o),s}}}function Wl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function ra(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function oa(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:m}=e,g=[],v=null,O=!1,R=null,X=null,ee=null;function Y(){R!==null&&clearTimeout(R),R=setTimeout(()=>{R=null,O=!1},0)}function L(){return i()??null}function I(){let G=new Map,re=o();for(let ne of Array.isArray(re)?re:[]){if(!ne||typeof ne!="object")continue;let ue=ne.bead_blocked_by&&typeof ne.bead_blocked_by=="object"?ne.bead_blocked_by:{};for(let[ke,pe]of Object.entries(ue))Array.isArray(pe)&&G.set(ke,ra(pe));for(let ke of[...Array.isArray(ne.runnable)?ne.runnable:[],...Array.isArray(ne.session_active)?ne.session_active:[]])ke&&typeof ke.bead_id=="string"&&Array.isArray(ke.blocked_by)&&ke.blocked_by.length>0&&G.set(ke.bead_id,ra(ke.blocked_by))}return G}function P(){let G=new Map,re=new Map,ne=o();for(let ue of Array.isArray(ne)?ne:[]){if(!ue||typeof ue!="object")continue;let ke=ue.bead_blocked_by&&typeof ue.bead_blocked_by=="object"?ue.bead_blocked_by:{};for(let[pe,qe]of Object.entries(ke))Array.isArray(qe)&&G.set(pe,ra(qe));for(let pe of Array.isArray(ue.runnable)?ue.runnable:[])pe&&typeof pe.bead_id=="string"&&Array.isArray(pe.blocked_by)&&re.set(pe.bead_id,ra(pe.blocked_by))}for(let ue of g)for(let ke of[G,re]){let pe=ke.get(ue.a);pe!==void 0&&ke.set(ue.a,ue.type==="dep-remove"?pe.filter(qe=>qe!==ue.b):pe.includes(ue.b)?pe:[...pe,ue.b])}return{snapshot:G,runnable:re}}function j(){let G=I();for(let re of g){let ne=(G.get(re.a)||[]).slice();re.type==="dep-remove"?G.set(re.a,ne.filter(ue=>ue!==re.b)):ne.includes(re.b)||G.set(re.a,[...ne,re.b])}return G}function V(G=r(),re=L()){let ne=new Map;for(let We of Array.isArray(re?.lanes)?re.lanes:[]){let Q=new Map;for(let B of Array.isArray(We?.entries)?We.entries:[])B&&typeof B.bead_id=="string"&&Q.set(B.bead_id,B.dep_created_by_lane===!0);ne.set(typeof We?.id=="string"?We.id:"",Q)}let ue=new Map,ke=new Map,pe=new Set,qe=new Set;for(let We of G.chain_lanes){let Q=ne.get(We.lane_id);ue.set(We.lane_id,{status:We.status,entries:We.rows.map((B,Fe)=>({bead_id:B.id,root_dir:B.root_dir,...Fe===0?{}:{dep_created_by_lane:Q?.get(B.id)===!0}}))});for(let B of We.rows)ke.set(B.id,We.lane_id),B.fixed&&pe.add(B.id),B.unplaced||qe.add(B.id)}let Be=new Map;for(let We of G.parallel_rows)typeof We.queue_index=="number"&&Be.set(We.id,We.queue_index);for(let We of G.queue_groups)for(let Q of We.sublanes.serial)for(let B of Q.items)typeof B.queue_index=="number"&&Be.set(B.id,B.queue_index);let Je=P();return{blocked_by_map:j(),snapshot_blocked_by:Je.snapshot,runnable_blocked_by:Je.runnable,owner_of:new Map(Object.entries(G.owner_of)),cross_lanes:ue,owner_lane_of:ke,fixed_members:pe,placed_members:qe,parallel_rows:G.parallel_rows.map(We=>({bead_id:We.id,root_dir:We.root_dir,queue_index:We.queue_index??0})),parallel_raw_length:new Map(Object.entries(G.parallel_raw_length)),queue_index_of:Be}}function M(G,re){let ne=r();for(let ke of[...ne.runnable,...ne.queue,...ne.running,...ne.pr_wait,...ne.done])if(!(ke.non_occupying||ke.id!==re)){if(ke.root_dir===G)return ke.expected_revision;break}let ue=ne.queue_groups.find(ke=>ke.root_dir===G);return ue?ue.revision:0}async function q(G,re,ne,ue){if(!t)return null;let pe=await t(G,{...re,...ne?{root_dir:ne}:{},expected_revision:ue});if(pe&&pe.conflict){pe.queue&&d?.(ne,pe.queue);let qe=pe.queue&&typeof pe.queue.revision=="number"?pe.queue.revision:ue;pe=await t(G,{...re,...ne?{root_dir:ne}:{},expected_revision:qe})}return pe&&pe.queue&&d?.(ne,pe.queue),pe}async function K(G,re,ne,ue,ke){try{let pe=await q(G,re,ne,ue.get(ne)??M(ne,ke.bead_id));return!pe||typeof pe.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(pe.queue&&typeof pe.queue.revision=="number"&&ue.set(ne,pe.queue.revision),pe.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):pe.applied===!1?(a(pe.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${pe.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):pe.queue&&typeof pe.queue.revision=="number"?pe.queue.revision:ue.get(ne)??0)}catch(pe){return a(Wl(pe),"error"),null}}async function U(G,re,ne=new Map){if(G.type==="worker-queue-disarm"){try{let ue=await q(G.type,G.payload,G.root_dir,ne.get(G.root_dir)??M(G.root_dir,re));ue&&ue.queue&&typeof ue.queue.revision=="number"&&ne.set(G.root_dir,ue.queue.revision)}catch{}return!0}if(G.type==="worker-queue-place"||G.type==="worker-queue-reorder"||G.type==="worker-queue-remove")return await K(G.type,G.payload,G.root_dir,ne,{bead_id:re})!==null;try{return(G.type==="dep-add"||G.type==="dep-remove")&&t&&await t(G.type,{a:G.a,b:G.b,...G.root_dir?{root_dir:G.root_dir}:{}}),!0}catch(ue){return a(Wl(ue),"error"),!1}}function te(G){(G.type==="dep-add"||G.type==="dep-remove")&&(g=[...g,{type:G.type,a:G.a,b:G.b}])}async function be(G,re){if(!t)return{ok:!1};try{let ne=await t(G.type,{...G.payload,expected_revision:re});return!ne||typeof ne.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ne.revision}}catch(ne){let ue=ne,ke=ue&&ue.code==="conflict"?ue.details?.cross_lanes:null;return ke&&typeof ke.revision=="number"&&Array.isArray(ke.lanes)?{ok:!1,conflict:ke}:(a(Wl(ne),"error"),{ok:!1})}}async function Ne(G,re,ne){let ue=new Map,ke=[],pe=G.ops.slice(0,G.lane_op_index),qe=G.ops.slice(G.lane_op_index);for(let Je of pe){if(!await U(Je,ne,ue))return{done:!0};te(Je)}let Be=re;for(let Je of G.lane_ops){if(Be===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let We=await be(Je,Be);if(!We.ok)return We.conflict?{done:!1,conflict:We.conflict}:{done:!0};Be=We.revision}for(let Je of qe){if(!await U(Je,ne,ue))return{done:!0};te(Je),Je.type==="dep-add"&&ke.push(Je)}for(let Je of Kd(ke))Be=await F(Je,Be);return{done:!0}}async function F(G,re){if(re===null||!t)return re;let ne=G.pairs,ue=re;for(let ke=0;ke<2;ke+=1){if(ne.length===0)return ue;try{let pe=await t("monitor-lane-provenance",{lane_id:G.lane_id,pairs:ne.map(qe=>({bead_id:qe.bead_id,after:qe.after,value:!0})),expected_revision:ue});return pe&&typeof pe.revision=="number"?pe.revision:ue}catch(pe){let qe=pe,Be=qe&&qe.code==="conflict"?qe.details?.cross_lanes:null;if(!Be||typeof Be.revision!="number"||!Array.isArray(Be.lanes))return ue;let Je=Be.lanes.find(We=>We&&We.id===G.lane_id);ne=Gd(Array.isArray(Je?.entries)?Je.entries:[],ne),ue=Be.revision}}return ue}async function J(G,re,ne=[]){g=ne,l("",0);let ue=r(),ke=L();for(let pe=0;;pe+=1){let qe=G(V(ue,ke));if("refused"in qe){a(qe.refused,"error");break}let Be=await Ne(qe,ue.cross_lanes_revision,re);if(Be.done){qe.correction&&l(qe.correction.lane_id,qe.correction.corrected);break}if(pe>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Je=s(Be.conflict);ue=Je.lanes,ke=Je.raw_lanes}g=[],u()}async function he(G,re){await J(ne=>Mi(G,re,ne),G.bead_id)}function Re(G,re){let ne=re&&typeof re.closest=="function"?re.closest("[data-row-index]"):null;if(ne&&G.contains(ne)){let ue=Number(ne.getAttribute("data-row-index"));return Number.isFinite(ue)?ue:0}return G.querySelectorAll("[data-row-index]").length}function C(G){let re=typeof G?.closest=="function"?G.closest(".worker-pane--collapsed[data-lane]"):null;if(!re)return null;let ne=re.getAttribute("data-lane");return ne==="queue"?{zone:re,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ne==="candidate"&&m===!0?{zone:re,target:{kind:"candidate"}}:null}function se(G){let re=G.target;if(!v)return null;let ne=typeof re?.closest=="function"?re.closest("[data-drop]"):null;if(!ne)return C(re);let ue=ne.getAttribute("data-drop");if(ue==="candidate")return{zone:ne,target:{kind:"candidate"}};if(ue==="parallel")return{zone:ne,target:{kind:"parallel",marker_index:Re(ne,re)}};if(ue==="chain")return{zone:ne,target:{kind:"chain",lane_id:ne.getAttribute("data-lane-id")||"",marker_index:Re(ne,re)}};if(ue==="repo-serial"){let ke=ne.getAttribute("data-root-dir")||"";if(ke!==v.root_dir)return null;let pe=typeof re?.closest=="function"?re.closest("[data-queue-index]"):null,qe=pe&&ne.contains(pe)?pe.getAttribute("data-queue-index"):ne.getAttribute("data-lane-length"),Be=Number(qe);return{zone:ne,target:{kind:"repo-serial",root_dir:ke,lane_id:ne.getAttribute("data-lane-id")||"",index:Number.isFinite(Be)?Be:0}}}return null}function ye(){for(let G of Array.from(n.querySelectorAll(".is-drop-over")))G.classList.remove("is-drop-over")}function Ae(G){X=G.target instanceof Element?G.target:null}function Pe(G){let re=G.target,ne=typeof re?.closest=="function"?re.closest('[draggable="true"][data-bead-id]'):null,ue=ne?ne.closest("[data-drag-kind]"):null;if(!ue)return;if(ne&&X&&ne.contains(X)&&typeof X.closest=="function"&&X.closest("input, button, a")){G.preventDefault();return}let ke=ue.getAttribute("data-bead-id")||"",pe=ue.getAttribute("data-drag-kind")||"",qe=ue.getAttribute("data-root-dir")||"";if(!ke||!pe)return;let Be=ue.getAttribute("data-queue-index")||"",Je=Number(Be),We=ue.getAttribute("data-lane-id")||"";v={kind:pe,bead_id:ke,root_dir:qe,...Be!==""&&Number.isFinite(Je)?{queue_index:Je}:{},...We?{lane_id:We}:{}},O=!0,f?.(),n.classList.add("is-dragging");try{G.dataTransfer?.setData("text/plain",ke),G.dataTransfer&&(G.dataTransfer.effectAllowed="move")}catch{}}function ve(G){let re=se(G);re&&(G.preventDefault(),G.dataTransfer&&(G.dataTransfer.dropEffect="move"),re.zone.classList.add("is-drop-over"))}function Te(G){let re=G.target;typeof re?.closest=="function"&&(re.closest("[data-drop]")?.classList.remove("is-drop-over"),re.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function ut(){v=null,ye(),n.classList.remove("is-dragging"),Y()}function dt(G){let re=se(G),ne=v;v=null,ye(),n.classList.remove("is-dragging"),!(!re||!ne)&&(G.preventDefault(),he(ne,re.target))}return{attach(G){ee||(ee=G,G.addEventListener("pointerdown",Ae),G.addEventListener("dragstart",Pe),G.addEventListener("dragover",ve),G.addEventListener("dragleave",Te),G.addEventListener("drop",dt),G.addEventListener("dragend",ut))},detach(){R!==null&&(clearTimeout(R),R=null);let G=ee;ee=null,G&&(G.removeEventListener("pointerdown",Ae),G.removeEventListener("dragstart",Pe),G.removeEventListener("dragover",ve),G.removeEventListener("dragleave",Te),G.removeEventListener("drop",dt),G.removeEventListener("dragend",ut))},isDragging(){return v!==null},consumeClickSuppression(){let G=O;return O=!1,G},applyDrop:he,runPlanned:J,dropModel:V,sendOp:U,sendQueueCas:K,rememberDep:te}}var zl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var of={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},sf={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},af={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function nv(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function rv(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=nv(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(sf,n))return sf[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function ia(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function sa(e){for(let t of ia(e)){if(Object.hasOwn(of,t))return of[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function cf(e){return ia(e).length===0?null:sa(e)||"\uC2E4\uD328"}function Ur(e){let t=null;for(let n of ia(e))Object.hasOwn(zl,n)&&(t=zl[n]);return t}function kr(e,t){if(typeof e=="string"&&Object.hasOwn(af,e))return af[e];let n=rv(e,t);if(n!==null)return n;let r=sa(e),o=Ur(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function uf(e,t){let n=sa(e)??sa(t),r=Ur(t)??Ur(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ov=new Set(["repo_operation_timeout_unresolved"]);function sv(e){for(let t of ia(e))if(ov.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function iv(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function df(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||sv(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(iv(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${qr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var lf={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function pf(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(lf,t.blocked_reason)?lf[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=kr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=kr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function av(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var ff=200;function lv(e){return typeof e!="string"||e.length===0?"":e.length>ff?`${e.slice(0,ff)}\u2026`:e}function cv(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Hl(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function uv(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=Hl(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=Hl(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function mf(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${_f(i.at)?c`<span class="rtile__history-at"
                    >${_f(i.at)}</span
                  >`:""}<span class="rtile__history-summary">${i.summary}</span>
            </li>`)}
      </ol>`:""}${o?c`<p
        class="rtile__history-log"
        data-seam="tile-log-path"
        title="로그 파일을 읽을 수 없습니다 — 삭제된 것이 아닙니다"
      >
        읽기 실패
      </p>`:r?c`<p
          class="rtile__history-log"
          data-seam="tile-log-path"
          title="180일 보존 정책으로 삭제됨"
        >
          만료됨
        </p>`:n.length>0?c`<p class="rtile__history-log" data-seam="tile-log-path">
            ${Pr(n)}
          </p>`:""}`}function _f(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function dv(e,t){if(!e||e.open!==!0)return"";let n=Ur(e.cause)||kr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${mn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(m=>typeof m=="string"&&m.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=mf(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${f?c`<div>
            <dt>이력</dt>
            <dd>${f}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>원인</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>재시도 이력</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${e.cause?c`<div>
            <dt>실패 코드</dt>
            <dd><code>${e.cause}</code></dd>
          </div>`:""}
      ${o?.reason?c`<div>
            <dt>가드/원인</dt>
            <dd>${o.reason}</dd>
          </div>`:""}
      ${o?.command?c`<div>
            <dt>명령</dt>
            <dd><code>${o.command}</code></dd>
          </div>`:""}
      ${s?c`<div>
            <dt>착지 단계</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${l?c`<div>
            <dt>실패 시각</dt>
            <dd>${l}</dd>
          </div>`:""}
      ${a?c`<div>
            <dt>실행</dt>
            <dd>${a}</dd>
          </div>`:""}
      ${e.attempt_id?c`<div>
            <dt>attempt id</dt>
            <dd>
              <code>${e.attempt_id}</code>
              <button
                type="button"
                class="rtile__attempt-copy"
                data-attempt-id=${e.attempt_id}
                title="attempt id 복사"
                aria-label="attempt id 복사"
              >
                ⧉
              </button>
            </dd>
          </div>`:""}
      ${d?c`<div>
            <dt>비용</dt>
            <dd>${d}</dd>
          </div>`:""}
      <div>
        <dt>재개</dt>
        <dd>
          ${e.resume_eligible?"\uC774\uC5B4\uD558\uAE30 \uAC00\uB2A5":e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
        </dd>
      </div>
    </dl>
    ${e.attempt_id?c`<button
          type="button"
          class="rtile__session"
          title="실패 세션 열기"
          aria-label="실패 세션 열기"
        >
          ▤ 세션
        </button>`:""}
    ${e.landed?c`<p class="rtile__failure-landed">
          이미 base에 착지됨 — 이어하기로 배포·정리를 재개
        </p>`:""}
  </div>`}function pv(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function fv(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function _v(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=Hl(e.resets_at),r=pv(e.auto_resume),o=fv(e.auto_switch);return c`<div
    class="rtile__failure-pop rtile__provider-hold-pop"
    role="dialog"
    aria-label="공급자 보류 상세"
  >
    <strong class="rtile__provider-hold-note">작업 실패 아님</strong>
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${e.message?c`<div>
            <dt>원문</dt>
            <dd>${e.message}</dd>
          </div>`:""}
      ${t?c`<div>
            <dt>타깃</dt>
            <dd>${t}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>리셋</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>자동 재개</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${o?c`<div>
            <dt>계정 전환</dt>
            <dd>${o}</dd>
          </div>`:""}
      ${e.log_path?c`<div>
            <dt>로그</dt>
            <dd>${Pr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function mv(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var gv=new Set(["codex-runner"]);function hv(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(g=>g&&!(typeof g.agent_type=="string"&&gv.has(g.agent_type))),a=l.filter(g=>g&&g.state==="live"),u=l.filter(g=>g&&g.state!=="live"),d=r&&typeof r.last_event_at=="number"?mn(r.last_event_at,t):"",f=r?mn(r.updated_at,t):"",m=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${mn(s,t)}</span
            >`:""}
      </div>`:m?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${m}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(g=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${g.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(g=>g.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var bv={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function yv(e){if(!e)return"";let t=bv[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function vv(e,t,n,r="",o="",i=!1){if(e==="provider_hold")return c`<div class="rtile__foot">
      <button
        type="button"
        class="op-btn rtile__resume"
        title="같은 세션으로 이어서 진행"
        aria-label="이어하기"
      >
        ↻ 이어하기
      </button>
      <button
        type="button"
        class="op-btn rtile__resume-alternate"
        title="러너·모델·계정을 바꾸거나 새 세션으로 이어갑니다"
        aria-label="다른 방법으로"
      >
        ⋯ 다른 방법으로
      </button>
      ${n}
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let s=lv(t?.summary);if(e==="waiting")return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let l=mf(t);return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${l}
    <div class="rtile__foot">
      ${i?c`${n}${o}`:c`${o}${n}`}
    </div>`}function Kl(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(ke=>ke&&ke.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,f=e.provider_hold===!0&&!s&&!a&&!u&&!d,m=a&&e.failure||null,g=d&&e.wait||null,v=f&&e.hold||null,O=a||u||d||f,R=!!e.paused,X=s||O?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":f?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):R?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?av(t-e.started_at):"\u2014",ee=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,Y=Io(e),L=un(e.usage),I=er(e.usage),P=e.conflict_resolution?R?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,j=e.base_exception||null,V=e.landing,M=e.attempt_id&&e.attempt_id===n,q=r.monitor||null,K=mv(q),U=wi(q?.cross_lane_chip),te=q?ki(q.dependency_chips):"",be=hv(q,t,R,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),Ne=o&&e.workflow?.chips?.exec_receipt||null,F=$i(e.workflow),J=xi(e.rec,e.chip_popover?.chip_key==="rec"),he=e.chip_popover?ao(e.chip_popover.content):"",Re=Ne?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(Ne)}`}
        >${`${Ne.kind}:${Ys(Ne)}`}</span
      >`:"",C=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Lo(i)}</span
      >`:"",se=K||U||F||C||Re||J?c`<div class="rtile__meta">
          ${K}${U}${F}${C}${Re}${J}${he}
        </div>`:"",ye=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${cf(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",Ae=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${cv(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:f&&v?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${v.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${uv(v)}
            </button>`:"",Pe=c`${P?c`<span class="worker-mini__badge">${P}</span>`:""}${j?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${j}</span
      >`:""}${ye}${Ae}`,ve=o?"":mo(e),Te=ci(l?.quickfix_landing),ut=Te==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",dt=Te==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",G=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",re=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",ne=re&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",ue=ne?c`${re}${ne}`:re;return c`<div
    class="rtile${M?" rtile--sel":""}${R?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${O?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${f?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Ai(e.priority)}${Y?c`<span class="rtile__resumed" title=${Y}>↻</span>`:""}${Pe}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${X}</span>`:""}${yv(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${X}</span>`}
        ${o||O?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Te}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${ut} \uBD88\uAC00`:dt}
                  aria-label=${ut}
                >
                  ↻ ${ut}
                </button>
                ${ue}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${R?c`<button
                      type="button"
                      class="op-btn rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶ 재개
                    </button>`:c`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${ue}`}${a?"":G}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${O?vv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?m:d?g:v,ue,d?te:"",a?G:"",a&&!!e.discard?.error):s?"":c`${be}${e.rollup?Ks(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ca}):""}
            ${V?c`<div class="rtile__landing">
                  <span
                    class="merge-step${V.failed?" merge-step--failed":""}"
                    style=${`--progress: ${V.percent}%`}
                    >${V.label}${V.index>0?c`<span class="merge-step__n"
                          >${V.index}/${V.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${te}
            ${o?se:K||U||F||ee||J||L.length>0||I?c`<div class="rtile__meta">
                    ${K}${U}${F}${vi(e.exec_chips)}${J}
                    ${L.length>0?L.map(ke=>c`<span
                              class="worker-usage"
                              title=${ke.tooltip}
                              >${ke.label}</span
                            >`):I?c`<span
                            class="worker-usage"
                            title=${Do(e.usage)}
                            >${I}</span
                          >`:""}${he}
                  </div>`:""}
            ${mi(e)} ${ve}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||R?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${dv(l,t)}${_v(v)}
  </div>`}function kv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function gf(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Kl(o,t,n,{monitor:kv(o)}))}
  </div>`}function $o(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var on="",wv=["impl_runtime","impl_model","impl_effort"],hf=["claude","codex"],$v=["claude_account","codex_account"],xv=5,aa=1;function Cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function la(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(A=>ge(A,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,f={state:"absent",values:{},warnings:[]},m={},g={},v=Promise.resolve(),O=Promise.resolve(),R={claude:null,codex:null},X=!1,ee=null,Y={},L="",I="general",P="",j=!1,V=!1,M=!1,q=null,K=!1;function U(){let A=t.queue?t.queue():null;return Cn(A)?A:null}function te(){let A=U();return A?A.runner_catalog:null}function be(){let A=U();return A&&Cn(A.execution_defaults)?A.execution_defaults:null}function Ne(){let A=U();return!!(A&&Object.hasOwn(A,"quick_fix_orchestration_model"))}function F(){let A=t.implPresetStore?.get();return Cn(A)&&Array.isArray(A.presets)?A:null}function J(){return r===null?{}:{root_dir:r}}async function he(A,N){return K||!n?null:await n(A,N)}function Re(A){A&&Cn(A.queue)&&t.onQueueAdopt?.(A.queue)}async function C(A,N){let ie=U();if(!ie||K)return null;let Se=await he(A,{...N,...J(),expected_revision:ie.revision});if(Re(Se),r!==null&&Se&&Se.conflict){let _e=Se.queue&&typeof Se.queue.revision=="number"?Se.queue.revision:U()?.revision??ie.revision;Se=await he(A,{...N,...J(),expected_revision:_e}),Re(Se)}return Se}async function se(){d=!0,me();try{let A=await he("get-session-defaults",{...J()});i=ni(A?.values),s={...i},l={},a={},u=Array.isArray(A?.warnings)?A.warnings:[]}catch(A){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}finally{d=!1,me()}}function ye(A,N){let ie={...N};for(let Se of Po){let _e=s[Se];_e!==A[Se]&&(typeof _e=="string"?ie[Se]=_e:delete ie[Se])}return ie}function Ae(){O=O.then(()=>Pe())}async function Pe(){let A=Du(i,s);if(Object.keys(A).length===0)return;let N={...s};try{let ie=await he("set-session-defaults",{values:A,...J()});i=ni(ie?.values),s=ye(N,i),u=Array.isArray(ie?.warnings)?ie.warnings:[]}catch(ie){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ie instanceof Error?ie.message:String(ie)}`)}me()}function ve(A,N){if(!Cn(A))return;let ie=A.state;f={state:ie==="usable"||ie==="unusable"||ie==="absent"?ie:"absent",values:Cn(A.values)?{...A.values}:{},warnings:Array.isArray(A.warnings)?A.warnings:[]},g={...f.values},N&&(m={...g})}async function Te(){try{ve(await he("get-workspace-accounts",{...J()}),!0)}catch(A){f={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},m={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}me()}async function ut(A){try{let N=await fetch(A);if(!N.ok)return null;let ie=await N.json();if(!Cn(ie)||!Array.isArray(ie.accounts))return null;let Se=ie.accounts.filter(_e=>Cn(_e)&&typeof _e.key=="string"&&_e.key.length>0&&typeof _e.email=="string"&&_e.email.length>0);return{accounts:Se,active:Se.find(_e=>_e.active===!0)||null}}catch{return null}}async function dt(){X=!0;let[A,N]=await Promise.all([ut("/api/claude-usage"),ut("/api/codex-usage")]);K||(R={claude:A,codex:N},me())}function G(){let A={};for(let N of $v){let ie=Object.hasOwn(m,N)?m[N]:null,Se=Object.hasOwn(g,N)?g[N]:null;ie!==Se&&(A[N]=ie)}return A}async function re(){let A=G();if(Object.keys(A).length!==0){try{ve(await he("set-workspace-accounts",{values:A,...J()}),!1)}catch(N){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}me()}}function ne(A,N){N===on?delete m[A]:m[A]=N,me(),v=v.then(()=>re())}function ue(A,N){if(wv.includes(A)){Je(A,N);return}N===on?delete s[A]:s[A]=N,me(),Ae()}function ke(A,N){l[A]=N,delete a[A]}function pe(A,N,ie){if(l[A]=N,N.length>0&&!ie(N)){a[A]=!0,me();return}delete l[A],delete a[A],N.length===0?delete s[A]:s[A]=N,me(),Ae()}function qe(){let A=mt().orchestration_model,N=Sn({global:{orchestration_model:A??void 0},execution_defaults:be(),runner_catalog:te()}).orchestration_model.value;return N?Pn(te(),N):null}function Be(A,N){typeof N=="string"&&N.length>0?s[A]=N:delete s[A]}function Je(A,N){let ie=N===on?void 0:N,Se=Ru({impl_runtime:A==="impl_runtime"?ie:s.impl_runtime,impl_model:A==="impl_model"?ie:s.impl_model,impl_effort:A==="impl_effort"?ie:s.impl_effort},te(),qe());Be("impl_runtime",Se.impl_runtime),Be("impl_model",Se.impl_model),Be("impl_effort",Se.impl_effort),me(),Ae()}async function We(){let A=U();if(!A)return;let N={orchestration_model:A.orchestration_model??null,orchestration_effort:A.orchestration_effort??null,orchestration_speed:A.orchestration_speed??null,quick_fix_orchestration_model:A.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:A.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:A.quick_fix_orchestration_speed??null},ie=Pu(N,{...N,...Y});if(Object.keys(ie).length!==0){try{let Se=await C("worker-queue-set-orchestration-defaults",{values:ie});if(Se&&Se.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}Y={}}catch(Se){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Se instanceof Error?Se.message:String(Se)}`)}me()}}function Q(A,N){Y[A]=N===on?null:N,me(),We()}function B(A){if(ee=A,!A){me();return}let N=te(),ie=mt(),Se=ie.orchestration_model;Se&&!po(N,A).includes(Se)&&(Y.orchestration_model=null,Se=null);let _e=ie.orchestration_effort;_e&&!ii(N,A,Se||wn).includes(_e)&&(Y.orchestration_effort=null),me(),We()}async function Fe(A){if(!(!U()||A<aa)){try{await C("worker-queue-set-slots",{slots:A})}catch(N){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}me()}}async function _t(A){if(!(!U()||A<aa||A>xv)){try{await C("worker-queue-set-serial-lane-count",{count:A})}catch(N){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}me()}}async function pt(A,N){let ie=A==="auto_advance"?"worker-automation-toggle":A==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await C(ie,{on:N})}catch(Se){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Se instanceof Error?Se.message:String(Se)}`)}me()}function He(){let A={},N=mt();for(let ie of co){let Se=Dn.includes(ie)?N[ie]:s[ie];typeof Se=="string"&&Se.length>0&&(A[ie]=Se)}return A}async function it(){let A=F();if(!A)return;let N=He();if(Object.keys(N).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ie=(A.presets||[]).find(_e=>_e.id===L),Se=P.trim()||(ie?ie.name:"");if(!Se){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let _e=ie?await he("impl-preset-update",{expected_revision:A.revision,id:ie.id,name:Se,settings:N}):await he("impl-preset-create",{expected_revision:A.revision,name:Se,settings:N});if(_e&&_e.applied){if(P="",!ie&&Array.isArray(_e.presets)){let gt=_e.presets.find(kt=>kt.name===Se);L=gt?gt.id:L}me()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),me()}catch(_e){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${_e instanceof Error?_e.message:String(_e)}`)}}async function w(){let A=F();if(!(!A||L.length===0))try{let N=await he("impl-preset-delete",{expected_revision:A.revision,id:L});N&&N.applied?(L="",me()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),me())}catch(N){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}}function Z(A){i=ni(A.values),s={...i},u=Array.isArray(A.warnings)?A.warnings:[],Cn(A.queue)&&(t.onQueueAdopt?.(A.queue),Y={})}async function Ce(A){let N=F(),ie=U();if(!N||!ie||L.length===0||A==="quick_fix"&&!Ne())return;let Se=_e=>({preset_id:L,expected_revision:N.revision,expected_queue_revision:_e,...A==="quick_fix"?{lane:"quick_fix"}:{},...J()});try{let _e=await he("apply-impl-preset-global",Se(ie.revision));if(A==="quick_fix"&&_e&&_e.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),me();return}if(_e&&_e.applied&&Z(_e),r!==null&&_e&&_e.queue_applied===!1){let gt=_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:U()?.revision??ie.revision;if(_e=await he("apply-impl-preset-global",Se(gt)),A==="quick_fix"&&_e&&_e.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),me();return}_e&&_e.applied&&Z(_e)}_e&&_e.applied?_e.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):_e&&_e.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(_e){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${_e instanceof Error?_e.message:String(_e)}`)}me()}async function Ye(){V=!0,M=!1,me();try{let A=await he("get-worker-system-prompt",{});!A||typeof A!="object"||Array.isArray(A)?M=!0:q=A}catch{M=!0}finally{V=!1,me()}}function Ke(){if(j=!j,j&&!q){Ye();return}me()}function je(){let A=vo({loading:V,error:M});if(A)return A;if(!q)return"";let N=Array.isArray(q.variants)?q.variants:[];return c`<div class="settings-dialog__sp-body">
      ${q.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${q.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${N.map(ie=>c`<div class="settings-dialog__sp-variant" data-variant=${ie.key}>
            <div class="settings-dialog__sp-cond">${ie.condition}</div>
            ${ar(ie.label,ie.system_prompt)}
          </div>`)}
    </div>`}function Et(){return c`<section
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
        aria-expanded=${j?"true":"false"}
        @click=${Ke}
      >
        ${j?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${j?je():""}
    </section>`}function Pt(A,N,ie,Se,_e,gt,kt,wt){let $t=_e[A]??on,Kt=ja(A,ie,_e,be(),te(),kt,wt),Wt=Kt.options.find(St=>St.value===$t),zt=$t===on?Kt.full_value:Wt?.full_value;return c`<select
        class=${$t===on?"settings-dialog__unset":""}
        data-key=${A}
        aria-label=${N}
        title=${zt||""}
        ?disabled=${gt===!0||wt!=="quick_fix"&&Kt.disabled}
        .value=${vr(String($t))}
        @change=${St=>Se(A,String(St.target.value))}
      >
        <option value=${on} ?selected=${$t===on}>
          ${Kt.unset_label}
        </option>
        ${Kt.options.map(St=>c`<option
              value=${St.value}
              title=${St.full_value||""}
              ?selected=${St.value===$t}
            >
              ${St.label}
            </option>`)}
      </select>
      ${$t===on?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function rt(A,N,ie,Se,_e,gt=!1,kt,wt=null,$t=null){return c`<div
      class=${`settings-dialog__row${gt?" settings-dialog__row--off":""}`}
      title=${gt&&$t?$t:""}
    >
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        ${Pt(A,N,ie,Se,_e,gt,kt,wt)}
      </span>
    </div>`}function Tt(A,N,ie,Se,_e,gt){let kt=Object.hasOwn(a,A),wt=l[A]??s[A]??on;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${kt?" settings-dialog__text--invalid":""}`}
          data-key=${A}
          aria-label=${N}
          aria-invalid=${String(kt)}
          placeholder=${ie}
          .value=${vr(wt)}
          @input=${$t=>ke(A,String($t.target.value))}
          @change=${$t=>pe(A,String($t.target.value).trim(),gt)}
        />
        ${wt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${A}
          >${kt?_e:Se}</span
        >
      </span>
    </div>`}function jt(A,N,ie,Se){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${A}
            .checked=${s[A]===Mo}
            @change=${_e=>ue(A,_e.target.checked?Mo:on)}
          />
          ${ie}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${A}>${Se}</span>
      </span>
    </div>`}function It(A,N){let ie=N?N.active:null;return Cn(ie)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${A==="claude"?ie.email:wo({...ie,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ut(A,N,ie){let Se=R[ie],_e=Object.hasOwn(m,A)?m[A]:on,gt=ie==="claude"?Zi:wo,kt=!!Se?.accounts.some(wt=>wt.key===_e);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${N}
          data-account-key=${A}
          @change=${wt=>ne(A,String(wt.target.value))}
        >
          <option value=${on} ?selected=${_e.length===0}>
            ${It(ie,Se)}
          </option>
          ${_e.length>0&&!kt?c`<option value=${_e} selected>
                ${_e} (목록에 없음)
              </option>`:""}
          ${Se?.accounts.map(wt=>c`<option value=${wt.key} ?selected=${wt.key===_e}>
                ${gt(wt)}
              </option>`)||""}
        </select>
        ${Se?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ae(){let A=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${A} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${A}`:null}function we(A,N,ie,Se,_e,gt){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${N}-on)`}
        ></i>
        ${A}
      </span>
      <span class="settings-dialog__controls">
        ${Pt(ie,`${A} \uBAA8\uB378`,Se,ue,s,!1)}
        ${Pt(_e,`${A} effort`,si,ue,s,!1)}
        ${Pt(gt,`${A} \uC18D\uB3C4`,Tu,ue,s,!1)}
      </span>
    </div>`}function Ge(A,N,ie,Se){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${Se?" is-on":""}`}
          data-automation=${A}
          aria-pressed=${Se?"true":"false"}
          aria-label=${N}
          @click=${()=>pt(A,!Se)}
        >
          ${Se?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ie}</span>
      </span>
    </div>`}function ot(A,N,ie,Se){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${A}>
          <button
            type="button"
            aria-label=${`${N} \uAC10\uC18C`}
            @click=${()=>Se(ie-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ie}</span>
          <button
            type="button"
            aria-label=${`${N} \uC99D\uAC00`}
            @click=${()=>Se(ie+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function et(A,N){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${A.rows.length>0?`\uBCC0\uACBD ${A.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${A.rows.map(ie=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ie.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ie.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ie.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ie.after??(N==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${A.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${A.ignored_keys.join(", ")}은(는)
            ${N==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function mt(){let A=U(),N={};for(let ie of[...Dn,...lo])N[ie]=Object.prototype.hasOwnProperty.call(Y,ie)?Y[ie]:A&&typeof A[ie]=="string"?A[ie]:null;return N}function bt(){let A=mt(),N={};for(let ie of lo)N[ie]=A[ie]??null;for(let ie of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])N[ie]=s[ie]??null;return N}function tt(){let A=te(),N=s.impl_runtime,ie=s.impl_model,Se=F(),_e=U(),gt=mt(),kt=po(A,ee),wt=uo(A,void 0).filter(Qe=>Qe!==wn),$t=Lr(A,void 0,void 0),Kt=ii(A,ee,gt.orchestration_model||wn).filter(Qe=>Qe!==wn),Wt=L?(Se?.presets||[]).find(Qe=>Qe.id===L):null,zt=Wt?Iu(He(),Cn(Wt.settings)?Wt.settings:{}):null,St={quick_fix_orchestration_model:po(A,null),quick_fix_orchestration_effort:ii(A,null,null).filter(Qe=>Qe!==wn),quick_fix_orchestration_speed:Gn,quick_fix_impl_dispatch:qo,quick_fix_impl_runtime:hf,quick_fix_impl_model:wt,quick_fix_impl_effort:$t,quick_fix_impl_speed:Gn},nn=Wt?Lu(bt(),Cn(Wt.settings)?Wt.settings:{},St):null,Zt=I==="quick_fix"?nn:zt,qt=Ne(),Rt=qt?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",Jt={...s,...gt},Ee=_e&&typeof _e.slots=="number"?_e.slots:aa+1,T=_e&&typeof _e.serial_lane_count=="number"?_e.serial_lane_count:aa,de=be()?.supported===!0,De=ae(),yt=ja("workflow_mode",No,s,be(),A);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${De?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${De}
          </div>`:""}
      ${de?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${d?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${vr(L)}
                @change=${Qe=>{L=String(Qe.target.value),me()}}
              >
                <option value="" ?selected=${L===""}>
                  실행 프리셋…
                </option>
                ${(Se?.presets||[]).map(Qe=>c`<option
                      value=${Qe.id}
                      ?selected=${Qe.id===L}
                    >
                      ${Qe.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!zt||zt.rows.length===0}
                @click=${()=>Ce("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Rt||""}
                ?disabled=${!qt||!nn||nn.rows.length===0}
                @click=${()=>Ce("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${L?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${vr(P)}
                @input=${Qe=>{P=String(Qe.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${L?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${it}
              >
                ${L?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${L.length===0}
                @click=${w}
              >
                삭제
              </button>
            </div>
            <div
              class="settings-dialog__seg"
              role="group"
              aria-label="프리셋 적용 레인"
              data-preset-lane-tabs
            >
              <button
                type="button"
                data-preset-lane="general"
                aria-pressed=${String(I==="general")}
                @click=${()=>{I="general",me()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(I==="quick_fix")}
                @click=${()=>{I="quick_fix",me()}}
              >
                quick_fix
              </button>
            </div>
            ${Zt?et(Zt,I):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${vr(ee||on)}
                    @change=${Qe=>{let y=String(Qe.target.value);B(y===on?null:y)}}
                  >
                    <option value=${on} ?selected=${!ee}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${ee==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${ee==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${rt("orchestration_model","\uBAA8\uB378",kt,Q,gt)}
              ${rt("orchestration_effort","effort",Kt,Q,gt)}
              ${rt("orchestration_speed","\uC18D\uB3C4",Gn,Q,gt)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Ut("claude_account","Claude","claude")}
              ${Ut("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${_e?.provider_auto_switch!==!1}
                      @change=${Qe=>pt("provider_auto_switch",Qe.target.checked)}
                    />
                    한도 시 다른 계정으로 자동 이어하기
                  </label>
                </span>
              </div>
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${on}
                      aria-pressed=${String(!s.workflow_mode)}
                      @click=${()=>ue("workflow_mode",on)}
                    >
                      ${yt.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${No.map(Qe=>c`<button
                          type="button"
                          data-mode=${Qe}
                          aria-pressed=${String(s.workflow_mode===Qe)}
                          @click=${()=>ue("workflow_mode",Qe)}
                        >
                          ${Qe}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${Tt("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Eu)}
              ${jt("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${we("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",jo,"spec_review_effort","spec_review_speed")}
              ${we("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",oi,"plan_review_effort","plan_review_speed")}
              ${we("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",jo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${rt("impl_runtime","\uC704\uC784 \uB300\uC0C1",ri,ue,s)}
              ${rt("impl_model","\uBAA8\uB378",uo(A,N),ue,s)}
              ${rt("impl_effort","effort",Lr(A,N,ie),ue,s)}
              ${rt("impl_speed","\uC18D\uB3C4",Gn,ue,s)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${Rt||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${rt("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",St.quick_fix_orchestration_model,Q,gt,!qt,Jt,"quick_fix",Rt)}
              ${rt("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",St.quick_fix_orchestration_effort,Q,gt,!qt,Jt,"quick_fix",Rt)}
              ${rt("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Gn,Q,gt,!qt,Jt,"quick_fix",Rt)}
              ${rt("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",qo,ue,s,!qt,Jt,"quick_fix",Rt)}
              ${rt("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",hf,ue,s,!qt,Jt,"quick_fix",Rt)}
              ${rt("quick_fix_impl_model","\uBAA8\uB378",wt,ue,s,!qt,Jt,"quick_fix",Rt)}
              ${rt("quick_fix_impl_effort","effort",$t,ue,s,!qt,Jt,"quick_fix",Rt)}
              ${rt("quick_fix_impl_speed","\uC18D\uB3C4",Gn,ue,s,!qt,Jt,"quick_fix",Rt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ge("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",_e?.auto_advance===!0)}
              ${Ge("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",_e?.auto_merge===!0)}
              ${ot("slots","\uB3D9\uC2DC \uC2E4\uD589",Ee,Qe=>Fe(Qe))}
              ${ot("serial-lane-count","\uC9C1\uB82C \uB808\uC778",T,Qe=>_t(Qe))}
            </div>
            ${Et()}
          `}
    `}function me(){K||ft(tt(),e)}return{load(){Y={},I="general",l={},a={};let A=[se(),Te()];return X||A.push(dt()),Promise.all(A).then(()=>{})},render:me,sessionDraft:()=>({...s}),destroy(){K=!0,ft(c``,e)}}}function ca(e){return c`<svg
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
  </svg>`}function bf(){return ca(Co`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function yf(){return ca(Co`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function vf(){return ca(Co`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function kf(){return ca(Co`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function wf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function $f(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return un(ei(t));let n={};for(let l of Kn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Kn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?er(n):null}function Bn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Gl(e,t){let n=Bn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Av(e,t){if(!Bn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Sv(e){if(!Bn(e)||!Bn(e.execution_defaults)||!Bn(e.runner_catalog)||!Bn(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=Sn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Pn(e.runner_catalog,n.orchestration_model.value??""),o=fo(n,e.runner_catalog),i=Dr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function xf(e,t){let n=t.notify||(C=>ge(C,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,f=null,m=new Map;function g(){let C=t.workspacesState?t.workspacesState():[];return Array.isArray(C)?C.filter(se=>Bn(se)):[]}function v(C){return g().find(se=>se.root_dir===C)||null}function O(C){return Av(v(C),m.get(C))}function R(){for(let C of g()){let se=m.get(C.root_dir);se&&typeof se.revision=="number"&&typeof C.revision=="number"&&C.revision>=se.revision&&m.delete(C.root_dir)}}async function X(C,se,ye){let Ae=t.transport,Pe=O(se);if(!(!Ae||!Bn(Pe))){try{let ve=await Ae(C,{...ye,root_dir:se,expected_revision:Pe.revision});if(Bn(ve?.queue)&&m.set(se,ve.queue),ve&&ve.conflict){let Te=Bn(ve.queue)&&typeof ve.queue.revision=="number"?ve.queue.revision:O(se)?.revision;ve=await Ae(C,{...ye,root_dir:se,expected_revision:Te}),Bn(ve?.queue)&&m.set(se,ve.queue)}}catch(ve){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ve instanceof Error?ve.message:String(ve)}`)}J()}}function ee(C){u!==C&&(u=C,t.onFocusChange?.(u),J())}function Y(C){ee(u===C?null:C)}function L(C){if(d===C){P();return}I(),d=C;let se=v(C);s.textContent=`${se?.name||C} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=la(a,{root_dir:C,queue:()=>O(C),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ye=>{m.set(C,ye),J()}}),f.load(),J()}function I(){f?.destroy(),f=null}function P(C){I(),d=null,o.hidden=!0,s.textContent="",C!==!0&&J()}let j=()=>P();l.addEventListener("click",j);function V(C){C.key==="Escape"&&u!==null&&ee(null)}document.addEventListener("keydown",V);function M(C,se){let ye=Math.max(se,C,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${se}\uAC1C \uC911 ${C}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ye},(Ae,Pe)=>Pe<C?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function q(C){let se=C.auto_advance===!0,ye=C.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${se?" is-on":""}`}
        data-act="auto"
        aria-pressed=${se?"true":"false"}
        aria-label=${`${C.name} \uC790\uB3D9\uD654`}
        title=${se?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${se?yf():bf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ye?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ye?"true":"false"}
        aria-label=${`${C.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ye?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${vf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===C.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===C.root_dir?"true":"false"}
        aria-label=${`${C.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${kf()}
      </button>`}function K(C){let se=Sv(C);return se?c`<div class="mon2-deck__chips">
      ${se.orchestration?c`<span class="mon2-deck__chip" title=${se.orchestration.title}
            >오케 ${se.orchestration.text}</span
          >`:""}
      ${se.worker?c`<span class="mon2-deck__chip" title=${se.worker.title}
            >워커 ${se.worker.text}</span
          >`:""}
    </div>`:""}function U(C){let se=[];for(let[ye,Ae]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Pe=Gl(C,ye);Pe>0&&se.push(`${Ae} ${Pe}`)}return se.join(" \xB7 ")}function te(C){let se=Gl(C,"running"),ye=typeof C.slots=="number"?C.slots:1;return c`<div
      class=${`mon2-deck__tile${u===C.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${C.root_dir}
      aria-pressed=${u===C.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${C.root_dir}>${C.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ye}\uAC1C \uC911 ${se}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${se}/${ye}</span>
          ${M(se,ye)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${C.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${q(C)}</div>
        <span class="mon2-deck__counts">${U(C)}</span>
        ${K(C)}
      </div>
    </div>`}function be(C){let se=t.doneItems?t.doneItems():[],ye=t.rangeLabel?t.rangeLabel():"",Ae=$f(Array.isArray(se)?se:[]),Pe=ve=>C.reduce((Te,ut)=>Te+Gl(ut,ve),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${C.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ye}`}
        >실행 ${Pe("running")} · 대기 ${Pe("queue")} · PR
        ${Pe("pr_wait")}${Pe("session_active")>0?` \xB7 \uC138\uC158 ${Pe("session_active")}`:""}
        · ${ye} 완료
        ${Array.isArray(se)?se.length:0}</span
      >
      ${Ae===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof Ae=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${wf(ye)}
                  >${Ae}</span
                >`:Ae.map(ve=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ve.provider}
                      title=${ve.tooltip}
                      >${ve.label}</span
                    >`)}
          </span>`}
    </div>`}function Ne(){let C=g();return C.length===0?"":c`${be(C)}
      <div class="mon2-deck__strip">
        ${C.map(se=>te(se))}
      </div>`}function F(){u!==null&&!v(u)&&(u=null,t.onFocusChange?.(null))}function J(){R(),F(),d!==null&&!v(d)&&P(!0),ft(Ne(),r),f?.render()}function he(C){let se=C.target;if(!se||typeof se.closest!="function")return;let ye=se.closest("[data-root-dir]");if(!ye)return;let Ae=ye.getAttribute("data-root-dir")||"",Pe=se.closest("[data-act]")?.getAttribute("data-act");if(Pe==="worker"){t.gotoWorkerTab?.(Ae);return}if(Pe==="auto"){X("worker-automation-toggle",Ae,{on:O(Ae)?.auto_advance!==!0});return}if(Pe==="merge"){X("worker-merge-auto-toggle",Ae,{on:O(Ae)?.auto_merge!==!0});return}if(Pe==="gear"){L(Ae);return}Y(Ae)}function Re(C){if(C.key!=="Enter"&&C.key!==" ")return;let se=C.target;if(!se||typeof se.closest!="function")return;let ye=se.closest('[data-root-dir][role="button"]');!ye||ye!==se||(C.preventDefault(),Y(ye.getAttribute("data-root-dir")||""))}return r.addEventListener("click",he),r.addEventListener("keydown",Re),{render:J,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",V),r.removeEventListener("click",he),r.removeEventListener("keydown",Re),l.removeEventListener("click",j),I(),ft(c``,r),e.replaceChildren()}}}var Ev=1e4,Tf="bdui.monitor.done-range",Cf="bdui.monitor.running_sort",Of="bdui.monitor.candidate_sort",Rf="beads-ui.monitor.candidate-filter",If="beads-ui.monitor.sections";function Tv(){try{let e=window.localStorage.getItem(Rf);if(!e)return{...ho};let t=JSON.parse(e);return!t||typeof t!="object"?{...ho}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:ho.show_blocked,readiness:es.some(n=>n.value===t.readiness)?t.readiness:"all"}}catch{return{...ho}}}function Af(e){try{window.localStorage.setItem(Rf,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness}))}catch{}}function Cv(){try{let e=window.localStorage.getItem(Of);return Jo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ov(e){try{window.localStorage.setItem(Of,e)}catch{}}function Rv(){try{let e=window.localStorage.getItem(If);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Iv(e){try{window.localStorage.setItem(If,JSON.stringify(e))}catch{}}function Lv(){try{let e=window.localStorage.getItem(Tf);return e===null?"today":zn(e)}catch{return"today"}}function Dv(e){try{window.localStorage.setItem(Tf,e)}catch{}}function Pv(){try{return window.localStorage.getItem(Cf)==="repo"?"repo":"started"}catch{return"started"}}function Mv(e){try{window.localStorage.setItem(Cf,e)}catch{}}var Lf="tab:monitor:pipeline",qv=1e3,Sf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Nv=["queue","runnable","done"],Ef="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function jv(e){return e>=1&&e<=Ef.length?Ef[e-1]:`(${e})`}function Df(e,t){let n=Ht("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),m=Lv(),g=Pv(),v=Tv(),O=Cv(),R=Rv(),X=na("beads-ui.monitor.lane-collapsed"),ee=!1,Y=null,L=null,I=null,P=null,j=io(()=>me()),V=null,M=null,q=null,K=null;function U(y){return K===null&&(K=re()),Nd(y,K)}function te(y,p){be(),!(p<=0)&&(M={lane_id:y,corrected:p},q=setTimeout(()=>{q=null,M=null,me()},Ev))}function be(){q!==null&&(clearTimeout(q),q=null),M=null}function Ne(){let y=Gr.find(p=>p.value===m);return y?y.label:""}let F=document.createElement("div");F.className="mon",e.appendChild(F);let J=document.createElement("div");J.className="worker-drawer-overlay",J.hidden=!0;let he=document.createElement("div");he.className="worker-drawer-overlay__backdrop";let Re=document.createElement("div");Re.className="worker-drawer-host mon2-drawer",J.append(he,Re),e.appendChild(J);let C=br(null,null),se=new Map,ye=new Map,Ae=new Set,Pe=null,ve=null,Te=null,ut=ko(Re,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{L=null,J.hidden=!0,me()}}),dt=oa({transport:i,console_el:F,getLanes:()=>C,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:$t,reproject:y=>({lanes:tt(y),raw_lanes:y}),onCorrection:te,showToast:ge,requestRender:()=>me(),adoptQueue:(y,p)=>{ye.set(y,p)},onDragBegin:()=>{I=null},candidate_drop:!0}),{applyDrop:G,dropModel:re,runPlanned:ne,sendQueueCas:ue}=dt;async function ke(y,p,_,x,z=!0){if(!i||!_)return null;let H=await i(y,{...p,root_dir:_,expected_revision:x});if(H&&H.conflict&&z){H.queue&&ye.set(_,H.queue);let le=H.queue&&typeof H.queue.revision=="number"?H.queue.revision:x;H=await i(y,{...p,root_dir:_,expected_revision:le})}return H&&H.queue&&_&&ye.set(_,H.queue),H}function pe(y,p){let _=ye.get(y),x=o&&o.get?o.get():null,z=(Array.isArray(x)?x:[]).find(le=>le?.root_dir===y);return(_||z)?.merge_queue?.find(le=>le.bead_id===p)?.continuation_action}async function qe(y,p,_,x){let z=await ke(y,p,_,x),H=ye.get(_)?.revision??z?.queue?.revision??x;return fr(z,(le,Ie)=>ke(y,{...p,continuation:le,decision_token:Ie},_,H,!1),{refresh:le=>ke(y,p,_,le?.queue?.revision??ye.get(_)?.revision??H,!1)})}async function Be(y,p,_,x){let z=await fr({continuation_mismatch:x},(le,Ie)=>ke("worker-merge-queue-add",{bead_id:p,continuation:le,decision_token:Ie},y,_,!1)),H=z?.queue?.merge_queue?.find(le=>le.bead_id===p)?.continuation_action;z?.applied!==!0&&H?.continuation===null&&H.mismatch&&await Be(y,p,z.queue.revision,H.mismatch)}async function Je(y,p,_){let x=await ke("worker-discard",y,p,_);if(x&&x.discarded===!0){ge(yi(x),"success",5e3);return}if(x&&x.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${x.reason}`,"error");return}if(x&&x.accepted&&x.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(x&&x.accepted){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${x.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}x&&!x.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function We(y,p,_,x){let z=await ke("worker-discard-abandon",y,p,_);if(z&&z.abandoned===!0){ge(bi(x),"success",5e3);return}if(z&&z.reason){ge(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${z.reason}`,"error");return}z&&!z.conflict&&ge("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function Q(y,p,_){return!i||!_?null:await i(y,{...p,root_dir:_})}async function B(y,p,_){if(!Ae.has(y)){Ae.add(y),me();try{let x=await ke("worker-resolve-in-session",{bead_id:y},p,_,!1);x?.session==="already_running"?ge(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${x.tmux_window||"?"}`,"error"):x?.launched!==!0?ge(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${x?.reason||"unknown"}`,"error"):x.mode!=="fork"&&ge(`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${x.fallback_reason||"unknown"})`,"success")}finally{Ae.delete(y),me()}}}async function Fe(){let y=new Map;for(let p of C.pr_wait)y.has(p.root_dir)||y.set(p.root_dir,p.expected_revision);for(let[p,_]of y)await ke("worker-merge-queue-add-all",{},p,_)}function _t(y){let p=R[y];return!!(p&&p.runnable===!0)}function pt(y){let p={...R[y]||{}};p.runnable=!p.runnable,R={...R,[y]:p},Iv(R),me()}function He(y){X.toggle(y),me()}function it(y){X.toggleArea(y),me()}function w(y){let p=y.dependency_chips||null,_=y.overlap_chips||[],x=y.scope_state==="missing",z=y.armed_lane_chip;return!p&&_.length===0&&!x&&!z?null:{...p||{},..._.length>0?{overlaps:_}:{},...x?{scope_missing:!0}:{},...z?{armed_lane:z}:{}}}function Z(y){return Si(y,p=>j.isOpen({bead_id:y.id,chip_key:p}))}function Ce(y){let p=w(y),_=Z(y);return p||_?{...y,...p?{dependency_chips:p}:{},..._?{chip_popover:_}:{}}:y}function Ye(y){let p=_t(y.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${y.root_dir}
        data-section="runnable"
        aria-expanded=${p?"false":"true"}
        aria-label=${`${y.name} \uC139\uC158 ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${p?"\u25B8":"\u25BE"}
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
    </header>`}function Ke(y,p){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${p}
    </div>`}function je(y){if(I!==y.id)return null;let p=C.queue_groups.find(H=>H.root_dir===y.root_dir),_=y.place_lanes||[],x=C.cross_lanes_revision!==null,z=[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0}];for(let H of C.chain_lanes)z.push({id:`lane:${H.lane_id}`,label:`\uC5F0\uACB0 ${H.number} (${H.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:H.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x});z.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x,title:x?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let H of _)z.push({id:`serial:${H.id}`,label:`\uC9C1\uB82C ${Number(H.id.slice(1))}`,count:H.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:y.id,lanes:z}}function Et(y){return Ke(y,c`${el(Ce(y),je(y),{exec_chips_mode:"pinned_only",onOpenDoc:l?(p,_)=>l(_,y.root_dir):void 0})}`)}function Pt(){return C.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${C.runnable.map(y=>Et(y))}
      </div>`:c`${C.runnable_sections.map(y=>{let p=_t(y.root_dir);return c`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${Ye({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${p?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(_=>Et(_))}
            </div>`}
      </section>`})}`}function rt(y,p){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${p}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Mn(Ce(y),{actions:go(y,{nudgeable:!0})})}
    </div>`}function Tt(y,p,_,x){return c`<div
      class="mon2-crow${p.fixed?" mon2-crow--fixed":""}"
      draggable=${p.draggable?"true":"false"}
      data-bead-id=${p.id}
      data-drag-kind="chain"
      data-root-dir=${p.root_dir}
      data-lane-id=${y.lane_id}
      data-row-index=${_}
      data-queue-index=${typeof p.queue_index=="number"?String(p.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${jv(p.seq)}</span
      >
      ${p.workspace_name?c`<span class="worker-mini__repo" title=${p.root_dir}
            >${p.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${p.id}</span>
      <span class="mon2-crow__title">${p.title}</span>
      ${p.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${x.includes(p.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${p.location_title}
        >${p.location_label}</span
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
    </div>`}function jt(y){let p=C.cross_lanes_revision!==null,_=U(y.lane_id),x=_?.held===!0,z=_?.cycle===!0,H=_?_.mismatched:[],le=M&&M.lane_id===y.lane_id?M.corrected:0;return c`<div class="mon2-clane" data-lane-id=${y.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${y.label}</span>
        <span class="mon2-clane__count">${y.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${y.state}"
          >${y.badge}</span
        >
        ${le>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${le}건 자동 교정</span
            >`:""}
        ${z?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${x?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Di}</span
            >`:""}
        ${y.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${y.lane_id}
              ?disabled=${!p||!y.can_confirm||x}
              title=${x?Di:y.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${y.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${y.lane_id}
              ?disabled=${!p}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${y.run_label}
            </button>`:""}
        ${y.state==="confirmed"&&y.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${y.lane_id}
              ?disabled=${!p}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${y.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${y.lane_id}
              ?disabled=${!p}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${y.lane_id}
          ?disabled=${!p}
          title=${y.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${y.lane_id}
      >
        ${y.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:y.rows.map((Ie,nt)=>Tt(y,Ie,nt,H))}
      </div>
    </div>`}function It(y,p,_){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${y.id}
      data-row-index=${_}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Mn(Ce(p),{actions:go(p)})}
    </div>`}function Ut(y){if(y.length===0)return"";let p=y.length-1;return`${y[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function ae(y){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${Mn({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function we(y,p){let _=p.occupants,x=p.cross_wait_peers||[];return{id:p.id,pane_id:"",title:`${y.name} \xB7 \uC9C1\uB82C ${p.index+1}`,rows:[..._.map(z=>ae(z)),...p.items.map((z,H)=>It(p,z,H))],count:p.items.length,empty:p.empty===!0,..._.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${_.map(z=>`${z.id} \u2014 ${z.badge}`).join(`
`)}
              >${Ut(_)}</span
            >`,held:!0}:{},cycle:p.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...x.length>0?{after:c`${x.map(z=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${z.workspace_name}·${z.lane}과 교차 대기
                </div>`)}`}:{}}}function Ge(){let y=C.cross_lanes_revision!==null,p=C.chain_lanes.some(_=>_.draft&&_.rows.length===0);return Ei({parallel:{rows:C.parallel_rows.map((_,x)=>rt(_,x)),count:C.parallel_rows.length,collapsed:X.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:C.queue_groups.flatMap(_=>_.sublanes.serial.map(x=>({...we(_,x),drop:{drop:"repo-serial",root_dir:_.root_dir,lane_id:x.id,lane_length:String(x.raw_length)}}))),collapsed:X.isAreaCollapsed("serial"),extra_panes:C.chain_lanes.map(_=>jt(_)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${p||!y}
          title=${y?p?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...C.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function ot(y){return c`<div class="worker-rungrid">
      ${C.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:C.running.map(p=>Kl({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at,session_refs:p.session_refs||[]}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",parked:p.run_state==="parked",retry_wait:p.run_state==="retry_wait",waiting:p.run_state==="waiting",wait:p.wait||null,retry:p.retry||null,status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":p.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":p.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,chip_popover:Z(p),discard:p.discard,failure:p.failure?{...p.failure,open:P===p.attempt_id}:null,...$o(p.id,{discard:p.discard,parked:p.run_state==="parked"},Ae.has(p.id))},y,L,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,cross_lane_chip:p.cross_lane_chip||null,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:w(p)}}))}
    </div>`}function et(y){let p={runnable:C.runnable,queue:C.queue,running:C.running,pr_wait:C.pr_wait,done:C.done},_=x=>{let z=p[x.lane],H=x.lane==="runnable"?C.runnable_flat?z.length>0?Pt():void 0:C.runnable_sections.length>0?Pt():void 0:x.lane==="queue"?C.queue_groups.length>0||C.chain_lanes.length>0||C.parallel_rows.length>0||C.cross_lanes_unreadable?Ge():void 0:x.lane==="running"?ot(y):z.length>0?c`${z.map(le=>Mn(Ce(le)))}`:void 0;return Yn({id:`monitor-${x.lane}`,lane:x.pane,title:x.title,items:z,count:z.length,src:x.lane==="runnable",empty:x.empty,body:H,live:x.lane==="running"&&z.length>0,collapsible:!0,collapsed:X.isCollapsed(x.pane),controls:x.lane==="runnable"?mt():void 0,header_control:bt(x.lane,z.length)})};if(ee){let x=Nv.map(z=>Sf.find(H=>H.lane===z)).filter(z=>z!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Ti({live:C.running.length>0,running_body:C.running.length>0?ot(y):"",pr_wait_rows:C.pr_wait.map(z=>Mn(Ce(z))),count:C.running.length+C.pr_wait.length})}
            ${x.map(z=>_(z))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Sf.map(x=>_(x))}
        </div>
      </div>`}function mt(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒
        blocked${C.runnable_hidden.blocked>0?` ${C.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${es.map(y=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${v.readiness===y.value?" is-active":""}"
              data-readiness=${y.value}
              aria-pressed=${v.readiness===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${C.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${C.runnable_hidden.readiness}</span
            >`:""}
      </div>
    </div>`}function bt(y,p){return y==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${O}
      >
        ${Jo.map(_=>c`<option
              value=${_.value}
              ?selected=${O===_.value}
            >
              ${_.label}
            </option>`)}
      </select>`:y==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${g}
      >
        <option value="started" ?selected=${g==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${g==="repo"}>
          레포순
        </option>
      </select>`:y==="pr_wait"&&p>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:y==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${m}
      >
        ${Gr.map(_=>c`<option value=${_.value} ?selected=${m===_.value}>
              ${_.label}
            </option>`)}
      </select>`:""}function tt(y){let p=o&&o.get?o.get():null,_=o&&o.getWorkspacesState?o.getWorkspacesState():[],x=y===void 0?o&&o.crossLanes?o.crossLanes():void 0:y,z={done_since:Rr(m,d()),running_sort:g,candidate_filter:v,candidate_sort:O};return x!==void 0&&(z.cross_lanes=x),br(p,_,z)}function me(){let y=d();C=tt(),K=null,se=new Map;for(let p of[...C.runnable,...C.queue,...C.running,...C.pr_wait,...C.done])!p.non_occupying&&!se.has(p.id)&&se.set(p.id,p);ft(et(y),F),N()?.render(),A(),ie()}function A(){let y=new Map;for(let p of C.queue_groups)y.set(p.root_dir,p.auto_advance);for(let p of Array.from(F.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let _=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",x=y.get(_);typeof x=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${x?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function N(){if(Te)return Te;let y=F.querySelector(".mon2-deck");return y?(Te=xf(y,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>C.done,rangeLabel:Ne,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:_e,onFocusChange:p=>{V=p,ie()}}),Te):null}function ie(){F.classList.toggle("has-focus",V!==null);for(let y of Array.from(F.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",V!==null&&y.getAttribute("data-root-dir")===V);for(let y of Array.from(F.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=se.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",V!==null&&!!p&&p.root_dir===V)}for(let y of Array.from(F.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",V!==null&&y.getAttribute("data-root-dir")===V)}function Se(y,p){let _=s?s():void 0;if(!p||!_||p===_||!a){r(y);return}a(p).then(()=>{r(y)}).catch(x=>{n("workspace switch for %s failed: %o",p,x)})}function _e(y){if(!y)return;let p=s?s():void 0,_=()=>{try{u?.gotoView("worker")}catch(x){n("gotoView(worker) failed: %o",x)}};if(!a||p&&p===y){_();return}a(y).then(_).catch(x=>{n("workspace switch for %s failed: %o",y,x),ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function gt(y){gn(y).then(p=>{ge(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function kt(y){let p=se.get(y)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}async function wt(y,p,_){if(y!=="dep-add")return;let x=C.chain_lanes.find(z=>z.rows.some(H=>H.id===p));!x||!x.rows.some(z=>z.id===_)||await ne(z=>Wd(x.lane_id,z),"",[{type:y,a:p,b:_}])}function $t(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Kt(y,p){if(y==="run"){await zt(p);return}if(y==="stop"){await St(p);return}if(y==="create"){await ne(_=>dl(null,_),"");return}if(y==="remove"){let _=Hd(p,re());if(_!==null&&!f(_))return;await ne(x=>zd(p,x),"");return}await ne(_=>y==="confirm"?Bd(p,_):Ud(p,_),"")}function Wt(y){let p=new Map;for(let _ of y.rows){let x=C.owner_of[_.id]||_.root_dir;typeof x!="string"||x.length===0||p.set(x,[...p.get(x)||[],_.id])}return p}async function zt(y){let p=C.chain_lanes.find(H=>H.lane_id===y);if(!p||C.cross_lanes_revision===null){me();return}be();let _=new Map,x=new Map,z=Wt(p);for(let H of p.rows){if(H.fixed||typeof H.queue_index=="number")continue;let le=C.owner_of[H.id]||H.root_dir;if(typeof le!="string"||le.length===0){ge(`${H.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),me();return}let Ie=x.get(le)??0;if(await ue("worker-queue-place",{bead_id:H.id,lane:"parallel",index:(C.parallel_raw_length[le]??0)+Ie},le,_,{bead_id:H.id})===null){me();return}x.set(le,Ie+1)}for(let[H,le]of z)if(await ue("worker-queue-arm",{bead_ids:le,lane_id:y},H,_,{bead_id:le[0]})===null){ge("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),me();return}me()}async function St(y){let p=C.chain_lanes.find(x=>x.lane_id===y);if(!p||C.cross_lanes_revision===null){me();return}be();let _=new Map;for(let[x,z]of Wt(p))if(await ue("worker-queue-disarm",{lane_id:y},x,_,{bead_id:z[0]})===null)break;me()}async function nn(y,p){let{root_dir:_,revision:x}=kt(y);if(_.length===0){me();return}await ue("worker-queue-disarm",{bead_ids:[y],lane_id:p},_,new Map([[_,x]]),{bead_id:y}),me()}async function Zt(y,p){let _=se.get(y);if(!_){me();return}let x={kind:"candidate",bead_id:y,root_dir:_.root_dir};if(p==="new-lane"){await ne(z=>dl({bead_id:y,root_dir:_.root_dir},z),y);return}if(p.startsWith("lane:")){let z=p.slice(5);if(!C.chain_lanes.find(le=>le.lane_id===z)){me();return}await ne(le=>Mi(x,{kind:"chain",lane_id:z,marker_index:(le.cross_lanes.get(z)?.entries??[]).length},le),y);return}if(p.startsWith("serial:")){let z=p.slice(7),H=(_.place_lanes||[]).find(le=>le.id===z);await G(x,{kind:"repo-serial",root_dir:_.root_dir,lane_id:z,index:H?H.index:0});return}await G(x,{kind:"parallel",marker_index:C.parallel_rows.length})}async function qt(y,p){let _=C.parallel_rows,x=_.findIndex($e=>$e.id===y);if(x<0)return;let z=_[x].root_dir,H=[];_.forEach(($e,$)=>{$e.root_dir===z&&H.push($)});let le=H.indexOf(x),Ie=H[le+p];if(typeof Ie!="number")return;let nt=p===-1?Ie:H[le+2]??Math.min(_.length,Ie+1);await G({kind:"parallel",bead_id:y,root_dir:z,queue_index:_[x].queue_index??0},{kind:"parallel",marker_index:nt})}async function Rt(y){for(let p of C.chain_lanes){let _=p.rows.find(x=>x.id===y);if(_){await G({kind:"chain",bead_id:y,root_dir:_.root_dir,lane_id:p.lane_id,...typeof _.queue_index=="number"?{queue_index:_.queue_index}:{}},{kind:"parallel",marker_index:C.parallel_rows.length});return}}}function Jt(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function Ee(y,p){let{item:_,root_dir:x,revision:z}=kt(p),H=_?.attempt_id||"",le=y.classList;if(le.contains("worker-mini__rowops-up")||le.contains("worker-mini__rowops-down")){qt(p,le.contains("worker-mini__rowops-up")?-1:1);return}if(le.contains("worker-mini__rowops-remove")){ke("worker-queue-remove",{bead_id:p},x,z);return}if(le.contains("mon2-crow__detach")){Rt(p);return}if(le.contains("worker-dep__open")){Se(y.getAttribute("data-dep-id")||"",y.getAttribute("data-root-dir")||"");return}if(le.contains("mon2-arm__release")){nn(p,y.getAttribute("data-lane-id")||"");return}if(le.contains("mon-lane__chip")){let Ie=y.getAttribute("data-lane-id")||"";F.querySelector(`.mon2-clane[data-lane-id="${Ie}"]`)?.scrollIntoView({block:"nearest"});return}if(le.contains("judgement-chip")){let Ie=y.getAttribute("data-chip-key")||"";Ie&&j.toggle({bead_id:p,chip_key:Ie});return}if(le.contains("rtile__failure-badge")){P=P===H?null:H,me();return}if(le.contains("rtile__attempt-copy")){let Ie=y.getAttribute("data-attempt-id")||"";Ie&&gn(Ie).then(nt=>{ge(nt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",nt?"success":"error",1400)});return}if(le.contains("worker-card__place")){I=I===p?null:p,me();return}if(le.contains("worker-card__place-cancel")){I=null,me();return}if(le.contains("worker-card__place-lane")){let Ie=y.getAttribute("data-lane")||"parallel";I=null,Zt(p,Ie);return}if(le.contains("rtile__session")){if(_&&_.kind==="session"){let Ie=(_.session_refs||[]).find(nt=>nt&&nt.current===!0);Ie&&(J.hidden=!1,ut.open(ro(Ie,p,"in_progress",x)),me());return}L=H,H&&_&&(J.hidden=!1,ut.open({attempt_id:H,root_dir:x,meta:Jt(_)})),me();return}if(le.contains("rtile__pause")){Q("worker-attempt-pause",{attempt_id:H},x);return}if(le.contains("rtile__resume")){no({context:{bead_id:p,kind:y.dataset.resumeKind==="settlement"?"settlement":"session",tuple:_?An(_):""},transport:Ie=>ke("worker-attempt-resume",{attempt_id:H,...Ie},x,ye.get(x)?.revision??kt(p).revision,!1)});return}if(le.contains("rtile__resolve")){B(p,x,ye.get(x)?.revision??kt(p).revision);return}if(le.contains("rtile__discard-abandon")){let Ie={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!f(Vo(p,Ie)))return;We({bead_id:p,operation_id:y.dataset.operationId||""},x,z,Ie);return}if(le.contains("rtile__discard")){let Ie=y.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(Yo(p,Ie)))return;Je({bead_id:p,...H?{attempt_id:H}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},x,z);return}if(le.contains("worker-mini__merge")){let Ie=pe(x,p);Ie?.mismatch&&Ie.continuation===null?Be(x,p,z,Ie.mismatch):ke("worker-merge-queue-add",{bead_id:p},x,z);return}if(le.contains("worker-mini__merge-cancel")){ke("worker-merge-queue-remove",{bead_id:p},x,z);return}if(le.contains("worker-mini__discard-abandon")){let Ie={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!f(Vo(p,Ie)))return;We({bead_id:p,operation_id:y.dataset.operationId||""},x,z,Ie);return}if(le.contains("worker-mini__discard")){let Ie=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(Yo(p,Ie)))return;Je({bead_id:p,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},x,z);return}if(le.contains("worker-mini__revise-fix")){qe("worker-revise-fix",{bead_id:p},x,z);return}le.contains("worker-mini__revise-approve")&&ke("worker-revise-approve",{bead_id:p},x,z)}function T(y){let p=dt.consumeClickSuppression(),_=y.target;if(!_||typeof _.closest!="function"||_.closest("dialog")||_.closest(".worker-drawer-overlay")||_.closest("a"))return;let x=_.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(x){y.preventDefault();let Xe=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||x.textContent?.trim()||"";Xe&&gt(Xe);return}let z=_.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(z){y.preventDefault();let Oe=z.getAttribute("data-root-dir")||se.get(_.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||z.getAttribute("title")||"";_e(Oe);return}let H=_.closest(".mon2-sec__toggle");if(H){y.preventDefault(),pt(H.getAttribute("data-root-dir")||"");return}let le=_.closest(".worker-pane__toggle[data-lane]");if(le){y.preventDefault();let Oe=le.getAttribute("data-lane")||"";(Oe==="candidate"||Oe==="queue"||Oe==="running"||Oe==="pr_wait"||Oe==="done")&&He(Oe);return}let Ie=_.closest(".worker-wait__area-toggle[data-area]");if(Ie){y.preventDefault(),it(Ie.getAttribute("data-area")||"parallel");return}if(_.closest(".mon2-newlane")){y.preventDefault(),Kt("create","");return}let nt=_.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(nt){y.preventDefault();let Oe=nt.getAttribute("data-lane-id")||"",Xe=nt.classList;Kt(Xe.contains("mon2-clane__confirm")?"confirm":Xe.contains("mon2-clane__reapply")?"reapply":Xe.contains("mon2-clane__run")?"run":Xe.contains("mon2-clane__stop")?"stop":"remove",Oe);return}if(_.closest(".mon-merge-all")){y.preventDefault(),Fe();return}let $e=_.closest(".mon-filter__readiness");if($e){y.preventDefault(),v={...v,readiness:$e.getAttribute("data-readiness")||"all"},Af(v),me();return}let $=_.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!$)return;let S=$.getAttribute("data-bead-id")||"",Me=_.closest("button");if(Me){y.preventDefault(),Ee(Me,S);return}_.closest(".rtile__failure-pop, .chip-popover")||S&&!p&&(y.preventDefault(),Se(S,$.getAttribute("data-root-dir")||kt(S).root_dir))}function de(y){let p=y.target;if(!p||typeof p.closest!="function")return;let _=p.closest(".mon-filter__blocked");if(_){v={...v,show_blocked:_.checked},Af(v),me();return}let x=p.closest(".mon-candidate-sort");if(x){O=Jo.some(le=>le.value===x.value)?x.value:"repo_spec",Ov(O),me();return}let z=p.closest(".mon-running-sort");if(z){g=z.value==="repo"?"repo":"started",Mv(g),me();return}let H=p.closest(".mon-done-range");H&&(m=zn(H.value),Dv(m),me())}function De(y){let p=y.target,_=p&&typeof p.closest=="function"?x=>p.closest(x):()=>null;P&&!_(".rtile__failure-pop, .rtile__failure-badge")&&(P=null,me())}function yt(y){y.key!=="Escape"||P===null||(P=null,me())}e.addEventListener("click",T),e.addEventListener("change",de),document.addEventListener("click",De),document.addEventListener("keydown",yt),j.attach(),dt.attach(e);{let y=!0;Y=ta(p=>{if(ee=p,y){y=!1;return}me()})}o&&typeof o.subscribe=="function"&&(Pe=o.subscribe(()=>{try{ye.clear(),me()}catch{}}));function Qe(){ve!==null&&(clearInterval(ve),ve=null)}return{recorrectSharedLane:wt,load(){n("load"),me(),ve===null&&(ve=setInterval(()=>{try{me()}catch{}},qv))},pause(){Qe()},clear(){Qe(),dt.detach(),Pe&&(Pe(),Pe=null),Y&&(Y(),Y=null),ut.destroy(),J.hidden=!0,Te?.destroy(),Te=null,e.removeEventListener("click",T),e.removeEventListener("change",de),document.removeEventListener("click",De),document.removeEventListener("keydown",yt),j.detach(),e.replaceChildren()}}}function Pf(e,t,n){let r=Ht("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(m){return g=>{g.preventDefault();let v=m==="monitor"&&a()==="monitor"?"worker":m;r("click tab %s",v),n.gotoView(v)}}function a(){let m=t.getState();return m.view==="worker"||m.view==="monitor"?m.view:"board"}function u(){let m=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${m==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let m=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${m==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${m==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function f(){o&&ft(u(),o),i&&ft(d(),i)}return f(),s=t.subscribe(()=>f()),{destroy(){s&&(s(),s=null),o&&ft(c``,o),i&&ft(c``,i)}}}var Mf=["bug","feature","task","epic","chore"];function qf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Nf=["Critical","High","Medium","Low","Backlog"];function jf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),m=n.querySelector(".new-issue__close");function g(){i.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",i.appendChild(I);for(let P of Mf){let j=document.createElement("option");j.value=P,j.textContent=qf(P),i.appendChild(j)}s.replaceChildren();for(let P=0;P<=4;P+=1){let j=document.createElement("option");j.value=String(P);let V=Nf[P]||"Medium";j.textContent=`${P} \u2013 ${V}`,s.appendChild(j)}}g();function v(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function O(I){o.disabled=I,i.disabled=I,s.disabled=I,l.disabled=I,a.disabled=I,d.disabled=I,f.disabled=I,f.textContent=I?"Creating\u2026":"Create"}function R(){u.textContent=""}function X(I){u.textContent=I}function ee(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?i.value=I:i.value="";let P=window.localStorage.getItem("beads-ui.new.priority");P&&/^\d$/.test(P)?s.value=P:s.value="2"}catch{i.value="",s.value="2"}}function Y(){let I=i.value||"",P=s.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),P.length>0&&window.localStorage.setItem("beads-ui.new.priority",P)}async function L(){R();let I=String(o.value||"").trim();if(I.length===0){X("Title is required"),o.focus();return}let P=Number(s.value||"2");if(!(P>=0&&P<=4)){X("Priority must be 0..4"),s.focus();return}let j=String(i.value||""),V=String(a.value||""),M={title:I};j.length>0&&(M.type=j),String(P).length>0&&(M.priority=P),V.length>0&&(M.description=V),O(!0);try{await t("create-issue",M)}catch{O(!1),X("Failed to create issue");return}Y(),O(!1),v()}return n.addEventListener("cancel",I=>{I.preventDefault(),v()}),m.addEventListener("click",()=>v()),d.addEventListener("click",()=>v()),n.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),L())}),r.addEventListener("submit",I=>{I.preventDefault(),L()}),{open(){r.reset(),R(),ee();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){v()}}}var Fv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Bv(e,t){return Ea(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ff(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Bv(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${o}`}
                data-label=${r}
                data-state=${o}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function Bf(e,t,n){return c`
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
  `}function Uf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Fv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Uv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Wf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(te=>ge(te,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let te=s.querySelector('[data-pane="execution"]');return te?(d=la(te,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:be=>t.queueStore?.set?.(be)}),d):null}function m(){return c`
      <section
        class=${`settings-dialog__pane${l==="execution"?" settings-dialog__pane--active":""}`}
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
    `}function g(){let te=r.get();return c`
      <section
        class=${`settings-dialog__pane${l==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${te?c`
              ${Ff(te,o(),X)}
              ${Bf(te,u,{onDraft:be=>{u=be},onAdd:ee,onRemove:Y})}
              ${Uf(te,L)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function v(te){let be=r.get();if(be)try{let Ne=await n("display-policy-set",{expected_revision:be.revision,policy:te(be)});O(Ne),Ne&&Ne.conflict&&Ne.policy&&(Ne=await n("display-policy-set",{expected_revision:Ne.policy.revision,policy:te(Ne.policy)}),O(Ne)),Ne&&Ne.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function O(te){te&&te.policy&&typeof te.policy=="object"&&r.set(te.policy)}function R(te){v(te)}function X(te){let be=r.get();if(!be)return;let Ne=!Wv(te,be);R(F=>zv(te,F,Ne))}function ee(){let te=u.trim();te.length!==0&&(u="",R(be=>be.hidden_prefixes.includes(te)?{hidden_prefixes:be.hidden_prefixes}:{hidden_prefixes:[...be.hidden_prefixes,te]}),I())}function Y(te){R(be=>({hidden_prefixes:be.hidden_prefixes.filter(Ne=>Ne!==te)}))}function L(te){let be=r.get();if(!be)return;let Ne=be.chips[te]===!1;R(()=>({chips:{[te]:Ne}}))}function I(){ft(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Uv.map(te=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${te.id}
                  aria-selected=${String(l===te.id)}
                  aria-controls=${`settings-pane-${te.id}`}
                  @click=${()=>P(te.id)}
                >
                  <span class="settings-dialog__glyph">${te.glyph}</span>
                  ${te.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${U}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${m()} ${g()}
          </div>
        </div>
      `,s),f()}function P(te){l=te,I()}let j=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",j),s.addEventListener("cancel",j);let V=te=>{te.target===s&&U()};s.addEventListener("click",V);let M=null;r.subscribe&&(M=r.subscribe(()=>{a&&I()}));let q=null;t.implPresetStore?.subscribe&&(q=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function K(te="execution"){a||(a=!0,t.onOpenChange?.(!0),l=te,u="",I(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),f()?.load())}function U(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:K,close:U,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",j),s.removeEventListener("cancel",j),s.removeEventListener("click",V),M&&(M(),M=null),q&&(q(),q=null),d?.destroy(),d=null,s.remove()}}}function Wv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function zv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Hv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],zf="usage-meter-card",Kv="usage-meter-layer",Yl=600,Gv=["token_expired","relogin_required"];function Hf(e){return String(e).padStart(2,"0")}function Yv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function Kf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${Hf(r.getHours())}:${Hf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${Hv[r.getMonth()]} ${r.getDate()} ${i}`;return`${Yv(n,t)} \xB7 ${l}`}function Vv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Gf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Yf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Vf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Xf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Qv(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Xf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Xv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=Qv(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Xf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Zv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Xv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Zf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Jv(e,t){return!e.held||Zf(e,t)<=Yl?e:{...e,available:!1,windows:[],accounts:[]}}function Qf(e,t){return`${e}:${t}`}function Jf(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){ft(c``,e),e.hidden=!0,f()}function d(){if(a===null){let F=e.ownerDocument;a=F.createElement("div"),a.id=Kv,a.className="usage-meter__layer",F.body.appendChild(a)}return a}function f(){a!==null&&(ft(c``,a),a.remove(),a=null)}function m(F){n!==F&&(n===null&&(document.addEventListener("mousedown",v),document.addEventListener("keydown",R),window.addEventListener("resize",O)),n=F)}function g(){n!==null&&(n=null,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",R),window.removeEventListener("resize",O))}function v(F){let J=F.target;J&&(e.contains(J)||a!==null&&a.contains(J))||(g(),U())}function O(){U()}function R(F){F.key==="Escape"&&(g(),U())}function X(F){n===F?g():m(F),U()}function ee(){g(),U()}async function Y(F,J){if(r.has(F.key))return;let he=Qf(F.key,J);r.set(F.key,J),s.delete(he),U();let Re=null;try{Re=await(await fetch(F.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:J})})).json()}catch{Re=null}if(t)return;if(r.delete(F.key),!Re||Re.ok!==!0){let se=Re&&typeof Re.error=="string"&&Re.error.length>0?Re.error:"network_error";s.set(he,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${se}`}),U();return}let C=Array.isArray(Re.warnings)?Re.warnings.filter(se=>typeof se=="string"&&se.length>0):[];C.length>0&&s.set(he,{kind:"warn",text:C.join(" \xB7 ")}),U(),await Ne()}function L(F,J,he,Re){let C=Yf(F.pct),ye=`resets ${Kf(F.resetsAt,Re)}${J?` \xB7 ${he}`:""}`;return c`<span
      class="usage-meter__window ${Gf(C)}"
      style=${`--progress: ${C}%`}
      title=${ye}
    >
      <span class="usage-meter__label">${F.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${C}%</span>
    </span>`}function I(F,J,he){let Re=Zf(J,he),C=J.available&&(J.held||Re>Yl),se=C?`${Math.floor(Re/60)}\uBD84 \uC804 \uCE21\uC815`:"",ye=J.accounts.filter(Te=>!Te.active).length,Ae=`usage-meter__group${C?" usage-meter__group--stale":""}`,Pe=c`<span class="usage-meter__provider"
        >${F.label}</span
      >
      ${J.available?J.windows.map(Te=>L(Te,C,se,he)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ye>0?c`<span class="usage-meter__badge">+${ye}</span>`:""}`;if(J.accounts.length===0)return c`<span
        class=${Ae}
        aria-label=${`${F.label} usage`}
        >${Pe}</span
      >`;let ve=n===F.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${Ae}`}
      aria-label=${`${F.label} usage`}
      aria-expanded=${ve?"true":"false"}
      aria-controls=${zf}
      @click=${()=>X(F.key)}
    >
      ${Pe}
    </button>`}function P(F,J){return c`<span class="usage-meter" aria-label="Usage">
      ${F.map(he=>I(he.provider,he.snapshot,J))}
    </span>`}function j(F,J){let he=Yf(F.pct),Re=Kf(F.resetsAt,J);return c`<span
      class="usage-meter__account-window ${Gf(he)}"
      style=${`--progress: ${he}%`}
    >
      <span class="usage-meter__account-key">${F.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${he}%</span>
      <span class="usage-meter__account-reset"
        >${Re.length>0?`\u21BB ${Re}`:""}</span
      >
    </span>`}function V(F,J){return Gv.includes(J)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${F.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function M(F,J,he){let Re=J.status==="ok",C=typeof J.ageSeconds=="number"&&J.ageSeconds>Yl,se=s.get(Qf(F.key,J.number)),ye=r.get(F.key),Ae=ye!==void 0,Pe=ye===J.number,ve=["usage-meter__account"];return J.active&&ve.push("usage-meter__account--active"),Re||ve.push("usage-meter__account--unavailable"),C&&ve.push("usage-meter__account--stale"),c`<div class=${ve.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${J.email}
          >${J.alias===null?J.email:J.alias}</span
        >
        ${J.plan===null?"":c`<span class="usage-meter__account-tag">${J.plan}</span>`}
        ${J.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${J.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Vv(J.ageSeconds)}</span
            >`}
        ${J.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Ae}
              @click=${()=>{Y(F,J.number)}}
            >
              ${Pe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Re?c`<div class="usage-meter__account-windows">
            ${J.windows.map(Te=>j(Te,he))}
          </div>`:c`<div class="usage-meter__account-status">
            ${V(F,J.status)}
          </div>`}
      ${se===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${se.kind}"
          >
            ${se.text}
          </div>`}
    </div>`}function q(F,J,he){let Re=J.accounts.filter(C=>C.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${F.label} · 활성 ${Re} / 전체
        ${J.accounts.length}
      </h2>
      ${J.accounts.map(C=>M(F,C,he))}
    </section>`}function K(F,J){return c`<div
      class="usage-meter__card"
      id=${zf}
      role="dialog"
      aria-label=${`${F.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${q(F.provider,F.snapshot,J)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function U(){let F=Date.now(),J=[];for(let Re of Vf){let C=i.get(Re.key);C&&J.push({provider:Re,snapshot:Jv(C,F)})}if(J.length===0){g(),u();return}let he=J.find(Re=>Re.provider.key===n&&Re.snapshot.accounts.length>0);he||g(),ft(P(J,F),e),e.hidden=!1,he?te(he,F):f()}function te(F,J){let he=d(),Re=e.getBoundingClientRect(),C=e.ownerDocument.documentElement.clientWidth;he.style.setProperty("--usage-meter-anchor-top",`${Re.bottom}px`),he.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,C-Re.right)}px`),ft(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ee}
        ></div>
        ${K(F,J)}`,he)}async function be(F){try{let J=await fetch(F.endpoint);return J.ok?Zv(await J.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ne(){l+=1;let F=l,J=await Promise.all(Vf.map(async he=>({provider:he,read:await be(he)})));if(!(t||F!==l)){for(let he of J){let Re=he.provider.key;if(he.read.kind==="ok"){i.set(Re,he.read.snapshot);continue}if(he.read.kind==="empty"){i.delete(Re);continue}let C=i.get(Re);C!==void 0&&!C.held&&i.set(Re,{...C,held:!0})}U()}}return u(),Ne(),o=setInterval(()=>{Ne()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),g(),u()}}}function ks(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var n_="bdui.worker.candidate_sort",ws=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),ua=Object.freeze({preset:"spec"}),r_=3,o_=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function e_(e){return ws.some(t=>t.id===e)}function t_(e){let t=ws.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function ek(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function $s(e){return e&&"preset"in e?t_(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):t_("spec")}function Vl(e){return e&&"preset"in e?e.preset:null}function Wr(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return e_(e)?{preset:e}:ua}return Wr(i)}if(!e||typeof e!="object")return ua;let t=e;if(e_(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>r_||!n.every($a))return ua;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=ws.find(i=>ek(i.chain,r));return o?{preset:o.id}:{chain:r}}function s_(){try{return Wr(window.localStorage.getItem(n_))}catch{return ua}}function Ql(e){try{window.localStorage.setItem(n_,JSON.stringify(e))}catch{}}function i_(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Fs,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Fs[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,r_)}function a_(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function tk(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=ks(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function l_(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Mc($s(t))),tk(n)}function c_(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=pi(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var u_=new Set(["sh","bash","zsh","dash","ksh"]),d_=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function p_(e){let t=e.split("/");return t[t.length-1]||""}function nk(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=p_(n[0]);if(r!=="env")return u_.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&u_.has(p_(o))}function rk(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function ok(e){let t=[],n=0;d_.lastIndex=0;for(let r of e.matchAll(d_)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:rk(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function sk(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function f_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function f(I,P){return P?ok(I).map(j=>j.kind==="plain"?j.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${j.kind}"
            >${j.text}</span
          >`):I}function m(){if(!o)return c``;let I=i==="ready"&&nk(s),P=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
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
              title=${o.path}
              >${o.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${o.base_ref}@${o.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${i!=="ready"}
              @click=${()=>{v()}}
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
          ${i==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:i==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${P.map((j,V)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${V+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(j,I)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function g(){ft(m(),r)}async function v(){if(i!=="ready")return;let I=await gn(s);ge(I?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",I?"success":"error")}function O(I){I.key==="Escape"&&o&&(I.preventDefault(),Y())}function R(){d||(document.addEventListener("keydown",O),d=!0)}function X(){d&&(document.removeEventListener("keydown",O),d=!1)}async function ee(I,P=null){let j=++a;R(),o={...I},u=P||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",g(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let M=t?t():"";if(!M){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",g();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",g();return}let q="/api/repo-ops-script?workspace="+encodeURIComponent(M)+"&lane="+encodeURIComponent(I.lane)+"&base_sha="+encodeURIComponent(I.base_sha);try{let K=await n(q),U=await K.json().catch(()=>({}));if(j!==a)return;if((t?t():"")!==M){Y();return}if(!K.ok||!U||U.ok!==!0){i="error",l=sk(U&&typeof U.error=="string"?U.error:""),g();return}o={lane:U.lane,base_sha:U.base_sha,path:U.path,base_ref:U.base_ref},s=String(U.content),i="ready",g()}catch{if(j!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",g()}}function Y(){a+=1,X(),o=null,s="",g();let I=u;u=null,I?.isConnected&&I.focus()}function L(){Y(),r.remove()}return{open:ee,close:Y,destroy:L}}var __={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},ik=new Set(["queued","running","retry_pending"]);function m_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let q=i();return typeof q.revision=="number"?q.revision:0}function l(q){t&&q&&q.queue&&typeof q.queue=="object"&&t.set(q.queue)}function a(){let q=i().workspace_info;return q&&typeof q=="object"?q:{}}function u(q,K){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${q}"
      >${K}</span
    >`}function d(q){if(typeof q!="number"||!Number.isFinite(q))return"";let K=q/6e4;return Number.isInteger(K)?`timeout ${K}\uBD84`:`timeout ${Math.round(q/1e3)}\uCD08`}function f(q){let K=d(q);return K?u("config",K):""}function m(q,K,U){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${U.script}
      @click=${te=>{o&&o({lane:q,base_sha:K.base_sha,path:U.script,base_ref:K.base_ref},te.currentTarget)}}
    ></button>`}function g(){let q=i().repo_operations;return Array.isArray(q)?q:[]}function v(){let q=a().repo_ops,K=q&&typeof q=="object"?q.repo_id:null;return typeof K=="string"&&K?K:null}function O(){return g().some(q=>q&&q.kind==="deploy"&&ik.has(q.state))}function R(){let q=O(),K=v()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${q||K}
      title=${q?"\uBC30\uD3EC \uC9C4\uD589 \uC911":K?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{P()}}
    >
      배포 실행
    </button>`}function X(){let q=i().repo_ops_opt_out;return{verify:q?.verify===!0,deploy:q?.deploy===!0}}function ee(q,K){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!K}
        @change=${U=>{I(q,!U.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function Y(q){let K=typeof q.base_sha=="string"?q.base_sha:"",U=`${q.source_path||"repo-ops/config.toml"} @ ${q.base_ref||"?"}${K?`@${K.slice(0,7)}`:""}`,te=X(),be=!!q.verify&&te.verify,Ne=!!q.deploy&&te.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${U}</span>
      </p>
      <div
        class="worker-repo-ops__lane${be?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${q.verify?c`${m("verify",q,q.verify)}
              ${f(q.verify.timeout_ms)}
              ${be?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${be?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":q.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${q.verify?ee("verify",te.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Ne?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${q.deploy?c`${m("deploy",q,q.deploy)}
              ${f(q.deploy.timeout_ms)}
              ${Ne?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):R()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ne?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":q.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${q.deploy?ee("deploy",te.deploy):""}
      </div>
    </section>`}function L(q){let K=q.repo_ops&&typeof q.repo_ops=="object"?q.repo_ops:null;return K&&(K.status==="resolved"||K.status==="absent")?Y(K):K&&(K.status==="pending"||K.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${K.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${K.error_code?c` — <code>${K.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function I(q,K){if(!n)return;let U=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:K,expected_revision:s()});if(l(U),U&&U.conflict){let te=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:K,expected_revision:s()});l(te)}r()}async function P(){let q=v();if(!n||q===null)return;let K=await n("worker-repo-operation-deploy-run",{repo_id:q});if(l(K),!K||K.ok!==!0){let U=K&&typeof K.reason=="string"?K.reason:"",te=Object.hasOwn(__,U)?__[U]:U||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ge(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${te}`,"error")}else ge("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let j={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function V(q,K,U){return c`<div class="worker-repo-ops__policy-group" data-policy=${U}>
      <div class="worker-repo-ops__policy-label">${q}</div>
      <ul class="worker-repo-ops__policy-list">
        ${K.map(te=>c`<li data-token=${te}>
              ${j[te]||te}
            </li>`)}
      </ul>
    </div>`}function M(){let q=i(),K=q.repo_operation_policy&&typeof q.repo_operation_policy=="object"?q.repo_operation_policy:null;return K?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(K.worker_automatic||[]).length} · 금지
            ${(K.never_automatic||[]).length}</span
          >
        </summary>
        ${K.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${K.schema_version})`}
            </div>`:""}
        ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",K.worker_automatic||[],"worker-automatic")}
        ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",K.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${L(a())} ${M()}
      </details>`}}}var b_=20,ak=5,lk=new Set(["failed","running","queued","retry_pending"]),Xl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},g_={verify:"verify",deploy:"deploy",job:"deploy"};function ck(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function uk(e){return!e||typeof e!="object"?"":e.kind==="job"?ck(e.script_path)||Xl.job:Object.hasOwn(Xl,e.kind)?Xl[e.kind]:e.kind}function dk(e,t,n=b_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function pk(e){if(e.type==="cleanup")return!0;let t=e.operation;return lk.has(t.state)&&!t.dismissed&&!t.superseded_by}function fk(e,t,n={}){let r=dk(e,t,1/0),o=n.expanded===!0?b_:ak,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||pk(l));return{visible:s,hidden:r.length-s.length}}function h_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function _k(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function y_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Pr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function v_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function mk(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(g_,n))return;let r=e[g_[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function gk(e,t){let n=df(e,t),r=pf(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function hk(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function bk(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?rn(e.at):""}
      >${hi(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${h_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${uk(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${gi(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${qr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${h_(e)}"
          >${_k(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?v_(uf(n.failure_kind,o)):""}
      ${gk(n,mk(t,n))}
      ${hk(n)}
      ${y_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${gi(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function yk(e){let t=e.cleanup,n=Nr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?rn(e.at):""}
      >${hi(e.at)||"\u2014"}</span
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
        ${vd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${v_(kr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재시도${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        <button
          type="button"
          class="worker-ev__btn worker-cleanup__resolve"
          data-bead-id=${t.bead_id}
          title="이 실패를 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork하고, 없으면 새 세션에 사유를 싣습니다"
        >
          세션에서 해결
        </button>
      </div>
      ${y_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function vk(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?yk(r):bk(r,e.repo_ops))}
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
  </section>`}function k_(e,t={}){let n=null;function r(){if(n===null){ft(c``,e);return}let s=fk(n.operations,n.cleanup_failures,{expanded:n.expanded});ft(vk({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var kk="session-preferred",wk=["external_roundtrip","user_feedback_loop"];function w_(e,t){if(!zo(e).includes(kk)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&wk.includes(n)?n:""}var $k="spec-after-blocker";function $_(e,t){return zo(e).includes($k)&&Array.isArray(t)&&t.length>0}var xk=Ht("views:worker:adapter"),Ak="tab:worker:ready",Sk="tab:worker:blocked",Ek="tab:worker:in-progress",Tk="tab:worker:resolved",Ck="tab:worker:closed",Ok="\u{1F512} blocked",Rk={revision:0,auto_advance:!1,auto_merge:!1,slots:Li,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Ik=["claude_account","codex_account"],Lk=[...co,...Ik];function Dk(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Pk(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Ja}: ${n}`:Ja}function wr(e){return e&&typeof e=="object"?e:{}}function Mk(e){let t={};for(let n of Lk){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function qk(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=wr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of ks(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function Nk(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function x_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?Jr(n):null,l=new Map,a={},u=null,d=0,f=null,m=!1;function g(){m||!i||i()}function v(P){return u===P?a:{}}async function O(){if(!r||m)return;let P=o?.()||"";if(u===P||f&&f.key===P&&f.generation===d)return;let j=++d;f={key:P,generation:j};let V=null;try{V=await Promise.resolve(r("get-session-defaults",{}))}catch(M){if(j!==d)return;f=null,xk("get-session-defaults failed: %o",M),g();return}j===d&&(a=V&&typeof V.values=="object"&&V.values!==null?{...V.values}:{},u=P,f=null,g())}function R(){u=null,d+=1,O()}function X(){for(let[P,j]of l)j==="failed"&&l.delete(P)}function ee(P,j){return s?s.selectBoardColumn(P,j):[]}function Y(P,j,V,M){let q=new Set(V.map(F=>F.id)),K=new Set,U=new Map,te=[];for(let F of[...j,...V]){if(K.has(F.id)||Dk(F))continue;let J=Ho(F,P);J.location===null&&(K.add(F.id),U.set(F.id,J),te.push(F))}let be=l_(te,Wr(M)),Ne=wr(P.bead_scope);return be.map(F=>{let J=U.get(F.id),he=Xr(F),Re=he.evidence==="published",C=typeof F.workflow?.route=="string"&&F.workflow.route||(F.metadata&&typeof F.metadata.route=="string"?F.metadata.route:""),se=J.worker_ineligible,ye=se||!Object.hasOwn(F,"labels")?"":w_(F.labels,F.metadata),Ae=q.has(F.id),Pe=Ae?ks(F):[],ve=[];Ae&&Pe.length===0&&ve.push(Ok),J.awaiting_user&&ve.push(Pk(F.metadata)),J.missing_description?ve.push("missing_description"):J.spec==="conflict"?ve.push("spec_id_conflict"):J.spec==="none"?ve.push("spec \uC5C6\uC74C"):J.spec==="draft"&&ve.push("spec \uBBF8\uBC1C\uD589(draft)");let Te=Ne[F.id];return{bead_id:F.id,title:F.title||F.id,route:C,spec_id:he.conflict?"":he.path,published:Re,blocked:Ae,blocked_by:Pe,labels:Array.isArray(F.labels)?F.labels:[],created_at:F.created_at,updated_at:F.updated_at,status:F.status,workflow:F.workflow||null,exec_pins:Mk(wr(F.metadata)),rec:null,...Te&&Array.isArray(Te.scope)?{scope:Te.scope}:{},eligible:J.placeable,route_ok:J.route_ok,awaiting_user:J.awaiting_user,missing_description:J.missing_description,placement_spec:J.spec,reason:ve.join(" \xB7 "),worker_ineligible:se,session_preferred:ye.length>0,session_preferred_reason:ye,spec_after_blocker:$_(F.labels,Pe),release_info:F.release_info,dependents_info:F.dependents_info}})}function L(P){let[j,V,M,q,K]=P,U=Ws([...j,...V,...M,...q,...K]),te=qk([...j,...V,...M,...q]),be={},Ne=(F,J)=>{if(!F||typeof F.id!="string"||F.id.length===0)return;let he=be[F.id]||(be[F.id]={});if(typeof F.priority=="number"&&!("priority"in he)&&(he.priority=F.priority),typeof F.from_id=="string"&&!("from_id"in he)&&(he.from_id=F.from_id),J&&!("metadata"in he)){he.metadata=wr(F.metadata);let Re=wr(F.workflow).route;typeof Re=="string"&&Re.length>0&&(he.route=Re)}};for(let F of[...j,...V,...M])Ne(F,!0);for(let F of[...q,...K])Ne(F,!1);for(let F of new Set([...Object.keys(be),...U.keys()])){let J=zs(U,F);if(J.total>0){let he=be[F]||(be[F]={});he.rollup=J}}for(let[F,J]of te){let he=be[F]||(be[F]={});he.carried_to=J}return be}function I(P,j,V,M){let q=new Set((Array.isArray(P.done)?P.done:[]).map(U=>U?.bead_id).filter(U=>typeof U=="string")),K=[];for(let U of j){let te=cr(U.closed_at);if(typeof U.id!="string"||q.has(U.id)||te===null||M!==void 0&&te<M||typeof U.comment_count!="number"||U.comment_count<=0)continue;let be=`${V}\0${U.id}\0${String(U.updated_at)}\0${U.comment_count}`,Ne=l.get(be);if(Ne===void 0&&r&&(l.set(be,"pending"),Promise.resolve(r("get-comments",{id:U.id})).then(J=>{let he=Array.isArray(J)&&J.some(Re=>Vi(typeof Re?.text=="string"?Re.text:"")?.lane==="session");l.set(be,he?"session":"not-session"),g()}).catch(()=>{l.set(be,"failed"),g()})),Ne!=="session")continue;let F=cr(U.started_at);K.push({id:U.id,title:U.title||U.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:F!==null&&te>=F?te-F:null,work_kind:"session",done_at:te,created_at:U.created_at,updated_at:U.updated_at})}return K}return{read(P){if(!t)return{workspaces:[],workspaces_state:[]};let j=t.get()||Rk,V=o?.()||"",M=P&&typeof P.done_since=="number"?P.done_since:void 0,q=ee(Ak,"ready"),K=ee(Sk,"blocked"),U=ee(Ek,"in_progress"),te=ee(Tk,"resolved"),be=ee(Ck,"closed");return{workspaces:[{...j,bead_titles:{...wr(j.bead_titles),...Object.fromEntries([...q,...K].filter(Ne=>Ne&&typeof Ne.id=="string").map(Ne=>[Ne.id,Ne.title||Ne.id]))},root_dir:V,name:Nk(V),runnable:Y(j,q,K,P?P.candidate_sort:void 0),session_done:I(j,be,V,M),bead_overlay:L([q,K,U,te,be])}],workspaces_state:[{root_dir:V,revision:j.revision,auto_advance:j.auto_advance,auto_merge:j.auto_merge,slots:typeof wr(j.workspace_info).slots=="number"?wr(j.workspace_info).slots:j.slots,runner_catalog:j.runner_catalog,execution_defaults:j.execution_defaults,session_defaults:v(V),orchestration_model:j.orchestration_model,orchestration_effort:j.orchestration_effort,orchestration_speed:j.orchestration_speed,quick_fix_orchestration_model:j.quick_fix_orchestration_model,quick_fix_orchestration_effort:j.quick_fix_orchestration_effort,quick_fix_orchestration_speed:j.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){O()},refreshSessionDefaults:R,notifyIssuesChanged:X,destroy(){m=!0,d+=1,f=null,l.clear()}}}var da=1,A_=5,jk={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:da,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function Dt(e){return e&&typeof e=="object"?e:{}}var T_="beads-ui.worker.candidate-filter",Zl={show_blocked:!1,readiness:"all"};function Fk(){try{let e=window.localStorage.getItem(T_);if(!e)return{...Zl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Zl};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all"}}catch{return{...Zl}}}function Bk(e){try{window.localStorage.setItem(T_,JSON.stringify(e))}catch{}}var C_="bdui.worker.done-range";function Uk(){try{let e=window.localStorage.getItem(C_);return e===null?"today":zn(e)}catch{return"today"}}function Wk(e){try{window.localStorage.setItem(C_,e)}catch{}}function S_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function zk(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function E_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Hk(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Kk(e){return!e||typeof e!="object"?"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4":e.conflict===!0?"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694":e.session==="already_running"?`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`:e.launched!==!0?`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`:e.mode==="fork"?null:`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function Gk(e){return e&&e.launched===!0?"success":"error"}function Yk(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Vk(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Qk=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Xk=new Set(["waiting_metadata","reviewing","retrying"]),Jl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Zk(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?rn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Jk(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function ew(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Jk(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?Ur(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Qk.has(e.phase)}}function tw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function nw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function rw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=tw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Jl.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${zk(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${E_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${E_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function ow(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,f=null,m=null,g={},v=!1,O={},R=null,X={active:!1,failure:null,origin:null},ee=!1){let Y=!!a&&a.position>0,L=!!a?.continuation_action&&a.continuation_action.continuation===null,I=!!a&&a.active===!0,P=a&&a.failure||null,j=Yk(a?a.waiting:null),V=n[e]||null,M=V&&V.gate?V.gate:null,q=V&&V.pr?V.pr:null,K=Vk(a?a.resolution:null),U=Zk(m),te=ew(m,U),be=a&&a.authority||null,Ne=a&&a.review_dispatch||null,F=a?.hold?.auto_review_wait==="slot"?"slot":null,J=!!m&&typeof m=="object"&&Xk.has(m.phase),he=Y&&!I&&(!be||J||be.source==="automatic"&&!v),Re=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":K?K.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":j,C=!!M&&M.base_badge==="\uCDA9\uB3CC",se=!!M&&M.enabled===!0,ye=Zo({bead_id:e,merge_sha:O.merge_sha,cleanup_cursor:O.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:O.repo_operations}),Ae=Ri(ye),Pe=i&&!ye&&(i.queueing??null)?i.queueing:null,ve=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!M&&M.tier==="merged",Te=r&&r.step==="repo_operations"&&ye?.failed===!0&&(ye.step==="deploy"||ye.step==="verify")?ye.step:null,ut=l&&!!r&&!!M&&M.tier==="merged",dt=he&&(se||C||M?.reason==="base_behind"||Jl.has(M?.reason)||ve||ut),G=Jl.has(M?.reason),re=l&&C&&u===!1,ne=rr(g,e,{external:l,merge_active:I||ye?.step==="merge",merge_queued:Y,conflict_active:!!s,cleanup_active:Ae,merged:!!r||M?.tier==="merged"}),ue=!!ne.operation,ke=!!r||m?.phase==="needs_human"||!!ne.error,pe=Y&&!P&&!L&&!ve&&!(te&&te.lock_actions),qe=rw({auto_pending:pe,continuation_required:L,queueing:Pe,merge_step:ye,conflict_badge:Re,conflict_live:K?.live===!0||s==="running",auto_resolution:U,recovery:te,cleanup_failed:r,cleanup_label:r?Nr(r.step):null,base_exception:f,conflicting:C,gate:M,receipt_check:V&&V.receipt_check?V.receipt_check:null,queue_failure:P,auto_skip:d,queued:Y,queue_active:I,queue_position:a?a.position:0,review_session:X,review_dispatch:Ne,auto_review_wait:F,activity:Re?null:i&&i.activity||null}),Be=qe?.live===!0&&qe.title?c`<span title=${qe.title}>${qe.label}</span>`:qe?.label||null,Je=nw(V&&V.receipt_check?V.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ye?.active!==!0?Oi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...R?{dependency_chips:R}:{},external:l,pr_number:q&&typeof q.number=="number"?q.number:null,pr_url:q&&typeof q.url=="string"?q.url:"",completion_badge:qe?.live!==!0&&qe?.title?qe.label:null,completion_title:qe?.title||"",...m?.phase==="needs_human"&&typeof m.log_path=="string"&&m.log_path.length>0?{log_path:m.log_path}:{},...Je.length>0?{receipt_badge:{codes:Je}}:{},badges:Be?[Be]:[],live_badge:qe?.live===!0?Be:null,usage:o,alert:qe?.alert===!0,merge_action:M?.tier==="merged"&&!ve&&!ut?!1:!Y||L||he||G,cancel_action:Y&&!L,cancel_enabled:!I&&!(te&&te.lock_actions),cancel_title:te&&te.lock_actions?`${te.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:I?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ne,discard_action:ne.action,resolve_action:ke,resolve_enabled:!ee,resolve_title:ee?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ye,discard_enabled:ne.enabled,discard_title:ne.title,merge_enabled:!ye&&!Pe&&!s&&!ue&&!f&&!(te&&te.lock_actions)&&!re&&X.active!==!0&&(se||C||M?.reason==="base_behind"||G||ve||ut||dt||J&&!I),merge_label:L?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ve||ut?Te==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Te==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":C&&!ye&&!ve?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":M?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":G?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":he?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ue?ne.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ne.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ne.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:L?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Pe?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ye?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ye.label}`:Te?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Te==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:ut?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":re?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ve?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":X.active===!0?X.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":se?`\uBA38\uC9C0 (${M.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:M&&M.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${M&&M.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ec(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,m=r?Jr(r):null,g=Fk(),v=null,O=null,R=null,X=null,ee=io(()=>$e()),Y=new Map,L=new Map,I=s_(),P=Vl(I)===null,j=d?zn(d):Uk();function V(){let b=Gr.find(h=>h.value===j);return b?b.label:"\uC624\uB298"}let M=na("beads-ui.worker.lane-collapsed"),q=!1,K="";function U(){return K.trim().length>0}function te(b){return U()?b.filter(h=>h.search_match===!0).length:void 0}let be=new Set,Ne=new Set,F=new Set,J=new Set,he=new Set,Re=new Set,C=null,se=[],ye=x_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>$e()});function Ae(){ye.refreshSessionDefaults()}let Pe=document.createElement("div");Pe.className="worker-console";let ve=document.createElement("div");ve.className="worker-top";let Te=document.createElement("div");Te.className="worker-drawer-overlay",Te.hidden=!0;let ut=document.createElement("div");ut.className="worker-drawer-overlay__backdrop";let dt=document.createElement("div");dt.className="worker-drawer-host";let G=document.createElement("div");G.className="worker-drawer-host",G.hidden=!0,Te.append(ut,dt,G);let re=document.createElement("div");re.className="worker-lanes-host",Pe.append(ve,Te,re),e.appendChild(Pe);let ne=br(null,null),ue=[],ke=oa({transport:n,console_el:Pe,getLanes:()=>ne,getWorkspaces:()=>ue,getCrossLanes:()=>null,reproject:()=>({lanes:Se(),raw_lanes:null}),onCorrection:()=>{},showToast:ge,requestRender:()=>$e(),adoptQueue:(b,h)=>{o&&o.set(h)},onDragBegin:()=>{v=null}}),pe=null,qe=ko(dt,{transport:n,sessionLogStore:i,onClose:()=>{pe=null,Te.hidden=!0,$e()}}),Be=k_(G,{onClose:()=>{G.hidden=!0,Te.hidden=!0,$e()}}),Je=f_({getWorkspacePath:l||(()=>"")}),We=l&&l()||"",Q=m_({queueStore:o,transport:n,onChanged:()=>$e(),onOpenScript:(b,h)=>{Je.open(b,h)}});function B(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:da,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Fe(b){for(let h of Object.values(Dt(B().provider_hold)))for(let E of Array.isArray(h?.targets)?h.targets:[])if(Array.isArray(E?.attempt_ids)&&E.attempt_ids.includes(b))return E;return null}function _t(b){if(b?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(b?.status||"\uBBF8\uC0C1")}`};let h=Array.isArray(b.windows)?b.windows:[],E=h.find(ce=>ce?.key==="5h"),oe=h.find(ce=>ce?.key==="7d");if(!E||typeof E.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(E.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(oe){if(typeof oe.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(oe.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function pt(b){let h=Dt(B().attempts)[b];if(!h)return;let E=Dt(B().runner_catalog),oe=Dt(E.runners),ce=typeof h.runner=="string"&&oe[h.runner]?h.runner:Object.keys(oe)[0]||"",Le=Dt(oe[ce]),Ue=Dt(Le.models),Ct=typeof h.model=="string"&&Ue[h.model]?h.model:typeof Le.default_model=="string"?Le.default_model:Object.keys(Ue)[0]||"",Qt=Fe(b),lt=typeof h.claude_account=="string"?h.claude_account:typeof Qt?.account=="string"?Qt.account:"";X={attempt_id:b,original_runner:ce,runner:ce,model:Ct,account:lt,fresh_current:!1},$e()}function He(){X=null,$e()}function it(){let b=X;if(!b||!b.runner||!b.model||b.runner==="claude"&&!b.account)return;let h={runner:b.runner,model:b.model};b.runner==="claude"&&b.account&&(h.claude_account=b.account);let E=b.fresh_current||b.runner!==b.original_runner;X=null,$e(),Pt(b.attempt_id,"session",{exec_override:h,...E?{continuation:"fresh_current",decision_token:{}}:{}})}function w(){let b=X;if(!b)return"";let h=Dt(Dt(B().runner_catalog).runners),E=Array.isArray(Dt(B().account_catalog).claude)?Dt(B().account_catalog).claude:[],oe=b.runner!==b.original_runner;return c`<dialog
      class="op-dialog provider-resume-dialog"
      aria-label="다른 방법으로 이어하기"
    >
      <h2>다른 방법으로 이어하기</h2>
      <div class="provider-resume-dialog__fields">
        <label>
          러너
          <select class="provider-resume-dialog__runner">
            ${Object.keys(h).map(ce=>c`<option
                  value=${ce}
                  ?selected=${ce===b.runner}
                >
                  ${ce}
                </option>`)}
          </select>
        </label>
        <label>
          모델
          <select class="provider-resume-dialog__model">
            ${Object.entries(h).map(([ce,Le])=>c`<optgroup label=${ce}>
                  ${Object.keys(Dt(Le?.models)).map(Ue=>c`<option
                        value=${JSON.stringify([ce,Ue])}
                        ?selected=${ce===b.runner&&Ue===b.model}
                      >
                        ${Ue}
                      </option>`)}
                </optgroup>`)}
          </select>
        </label>
        ${b.runner==="claude"?c`<label>
              계정
              <select class="provider-resume-dialog__account">
                ${b.account?"":c`<option value="" selected>계정 선택</option>`}
                ${b.account&&!E.some(ce=>ce?.email===b.account)?c`<option value=${b.account} selected>
                      ${b.account} (목록에 없음)
                    </option>`:""}
                ${E.map(ce=>{let Le=_t(ce),Ue=ce.alias||ce.email;return c`<option
                    value=${ce.email}
                    ?selected=${ce.email===b.account}
                    ?disabled=${!Le.eligible}
                    title=${Le.reason}
                  >
                    ${Ue}${Le.reason?` \u2014 ${Le.reason}`:""}
                  </option>`})}
              </select>
            </label>`:""}
        <label class="provider-resume-dialog__fresh">
          <input
            type="checkbox"
            class="provider-resume-dialog__fresh-input"
            .checked=${b.fresh_current}
          />
          새 세션으로
        </label>
      </div>
      ${oe||b.fresh_current?c`<p class="provider-resume-dialog__notice">
            이전 세션 맥락을 요약 인계합니다
          </p>`:""}
      <div class="op-dialog__actions provider-resume-dialog__actions">
        <button type="button" class="op-btn provider-resume-dialog__cancel">
          취소
        </button>
        <button
          type="button"
          class="op-btn op-btn--primary provider-resume-dialog__confirm"
          ?disabled=${b.runner==="claude"&&!b.account}
          title=${b.runner==="claude"&&!b.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
        >
          이어하기
        </button>
      </div>
    </dialog>`}function Z(b){if(!v||!b.some(E=>E.id===v))return null;let h=Ko(B());return h?{bead_id:v,lanes:h}:null}function Ce(){return l&&l()||""}async function Ye(b,h){await ke.sendOp({type:"worker-queue-place",payload:{bead_id:b,...h==="parallel"?{}:{lane:h}},root_dir:Ce()},b)}function Ke(){let b=B();return typeof b.revision=="number"?b.revision:0}function je(b){b&&b.queue&&o&&o.set(b.queue)}async function Et(b){if(!n||!b)return;let h=await n("worker-attempt-pause",{attempt_id:b});h&&h.paused===!1&&h.reason&&ge(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function Pt(b,h="session",E={}){if(!n||!b)return;let oe=n,ce=B().attempts?.[b]||null;await no({context:{bead_id:ce?.bead_id||"",kind:h,tuple:ce?An(ce):""},transport:Le=>oe("worker-attempt-resume",{attempt_id:b,expected_revision:Ke(),...E,...Le}),adopt:je})}async function rt(b,h,E=!0){if(!n)return null;let oe=n,ce=await oe(b,{...h,expected_revision:Ke()});return je(ce),ce&&ce.conflict&&E&&(ce=await oe(b,{...h,expected_revision:Ke()}),je(ce)),ce}async function Tt(b){if(!n||!b)return;let h=B().merge_queue?.find(oe=>oe.bead_id===b)?.continuation_action;if(h?.mismatch&&h.continuation===null){await ae(b,h.mismatch);return}be.add(b),$e();let E;try{E=await rt("worker-merge-queue-add",{bead_id:b})}catch{ge("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{be.delete(b),$e()}if(!(!E||E.applied)){if(E.conflict){ge("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ge(Hk(E.reason),"error",2400)}}async function jt(b){if(!(!n||!b||Ne.has(b))){Ne.add(b),$e();try{let h=await n("worker-cleanup-retry",{bead_id:b,expected_revision:Ke()});je(h),h&&!h.retried&&!h.conflict&&h.reason&&ge(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{Ne.delete(b),$e()}}}async function It(b){if(!(!n||!b||F.has(b))){F.add(b),$e();try{let h=await n("worker-resolve-in-session",{bead_id:b,expected_revision:Ke()});je(h);let E=Kk(h);E!==null&&ge(E,Gk(h),4e3)}finally{F.delete(b),$e()}}}async function Ut(b,h){let E=B().hold;if(!n||!E||typeof E.since!="number")return;let oe=await n(b,{since:E.since});je(oe),oe&&oe.ok===!1&&ge(`${h}: ${oe.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":oe.reason||""}`,"error",2800)}async function ae(b,h){let E=await fr({continuation_mismatch:h},(ce,Le)=>rt("worker-merge-queue-add",{bead_id:b,continuation:ce,decision_token:Le},!1)),oe=E?.queue?.merge_queue?.find(ce=>ce.bead_id===b)?.continuation_action;if(E?.applied!==!0&&oe?.continuation===null&&oe.mismatch){await ae(b,oe.mismatch);return}E&&E.applied===!1&&!E.conflict&&ge("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function we(b){if(!n)return;let h=await rt("worker-merge-auto-toggle",{on:b});!h||h.conflict||ge(b?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",b?"success":"info",2400)}async function Ge(b){if(!n||!b)return;let h=await rt("worker-merge-queue-remove",{bead_id:b});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&ge("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ot(){await rt("worker-merge-queue-remove",{all:!0})}async function et(b,h=null,E="unmerged",oe=null){if(!n||!b)return;let ce=Yo(b,E);if(!(!!oe||typeof globalThis.confirm!="function"||globalThis.confirm(ce)))return;let Ue=await n("worker-discard",{bead_id:b,...h?{attempt_id:h}:{},...oe?{operation_id:oe}:{},expected_revision:Ke()});if(je(Ue),Ue&&Ue.conflict&&(Ue=await n("worker-discard",{bead_id:b,...h?{attempt_id:h}:{},...oe?{operation_id:oe}:{},expected_revision:Ke()}),je(Ue)),Ue&&Ue.discarded===!0){ge(yi(Ue),"success",5e3);return}if(Ue&&Ue.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${Ue.reason}`,"error",2800);return}if(Ue&&Ue.accepted&&Ue.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ue&&Ue.accepted&&!Ue.discarded){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${Ue.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ue&&!Ue.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function mt(b,h,E){if(!n||!b||!h||typeof globalThis.confirm=="function"&&!globalThis.confirm(Vo(b,E)))return;let oe=await n("worker-discard-abandon",{bead_id:b,operation_id:h,expected_revision:Ke()});if(je(oe),oe&&oe.conflict&&(oe=await n("worker-discard-abandon",{bead_id:b,operation_id:h,expected_revision:Ke()}),je(oe)),oe&&oe.abandoned===!0){ge(bi(E),"success",5e3);return}if(oe&&oe.reason){ge(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${oe.reason}`,"error",2800);return}oe&&!oe.conflict&&ge("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function bt(b,h,E){if(!(!n||!h||!E||he.has(h))){he.add(h),$e();try{let oe=await n(b,{bead_id:h,action_id:E,expected_revision:Ke()});je(oe),oe?.conflict?ge("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!oe?.ok&&oe?.reason&&ge(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(oe.reason)}`,"error",2800)}finally{he.delete(h),$e()}}}async function tt(b,h){if(!n||!h||J.has(h))return;J.add(h),$e();let E;try{let oe=async(ce={})=>await n(b,{bead_id:h,expected_revision:Ke(),...ce});E=await oe(),je(E),E&&E.conflict&&(E=await n(b,{bead_id:h,expected_revision:Ke()}),je(E)),b==="worker-revise-fix"&&(E=await fr(E,(ce,Le)=>oe({continuation:ce,decision_token:Le}),{onResult:je,refresh:()=>oe()}))}finally{J.delete(h),$e()}if(!(!E||E.conflict)){if(E.ok){ge(b==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ge(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function me(b){if(!n)return;let h=await n("worker-automation-toggle",{on:b,expected_revision:Ke()});je(h),h&&h.conflict&&await n("worker-automation-toggle",{on:b,expected_revision:Ke()}).then(je)}async function A(b){if(!n||!b)return;let h=await n("worker-repo-operation-dismiss",{operation_id:b});je(h),h&&h.ok===!1&&ge(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function N(b){if(!n||!Number.isFinite(b))return;let h=Math.max(da,Math.floor(b)),E=await n("worker-queue-set-slots",{slots:h,expected_revision:Ke()});je(E),E&&E.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:Ke()}).then(je)}async function ie(b){if(!n||!Number.isInteger(b)||b<1||b>A_)return;let h=B(),E=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(b).reduce((Le,Ue)=>Le+(Array.isArray(Ue?.entries)?Ue.entries.length:0),0),oe=()=>({count:b,expected_revision:Ke()}),ce=await n("worker-queue-set-serial-lane-count",oe());je(ce),ce&&ce.conflict&&(ce=await n("worker-queue-set-serial-lane-count",oe()),je(ce)),ce&&ce.applied&&E>0&&ge(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${E}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Se(){let b=Rr(j),h=ye.read({candidate_sort:I,done_since:b});return ue=h.workspaces,ne=br(h.workspaces,h.workspaces_state,{done_since:b,candidate_filter:g,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:K}),ne}function _e(b){return b.queue_groups[0]||jk}function gt(b){let h=b.dependency_chips||null,E={...h&&h.released?{released:h.released}:{},...h&&h.dependents?{dependents:h.dependents}:{}},oe=Y.get(b.id),ce=L.get(b.id)||null,Le=oe&&oe.overlaps.length>0?oe.overlaps:null,Ue=!!oe&&oe.scope_missing;return!ce&&!Le&&!Ue&&Object.keys(E).length===0?null:{...E,...ce?{predecessors:ce}:{},...Le?{overlaps:Le}:{},...Ue?{scope_missing:!0}:{}}}function kt(b){return{...b,workspace_name:"",done_layout:void 0,dependency_chips:gt(b)||void 0,chip_popover:wt(b)}}function wt(b){return Si(b,h=>ee.isOpen({bead_id:b.id,chip_key:h}))}function $t(){let b=B(),h=new Map;for(let E of Object.values(Dt(b.lane_states))){let oe=Array.isArray(E?.corrections)?E.corrections:[];for(let ce of oe)ce&&typeof ce.bead_id=="string"&&typeof ce.after=="string"&&h.set(ce.bead_id,ce.after)}return{admission:Dt(b.admission),correction_after:h}}function Kt(b,h){let E=kt(b),oe=pd(h.admission[b.id]||null,!!b.discard||he.has(b.id)),ce=h.correction_after.get(b.id);return{...E,draggable:E.draggable===!0&&!oe,stale_work:oe,reason:oe?"":E.reason,badges:ce?[`\u{1F517} ${ce} \uB4A4 (blocks \uC790\uB3D9)`,...E.badges||[]]:E.badges,revise_enabled:E.revise_enabled===!0&&!J.has(b.id)}}function Wt(b){let h=$t();return _e(b).sublanes.parallel.map(E=>Kt(E,h))}function zt(b){let h=$t();return _e(b).sublanes.serial.map(E=>{let oe=E.occupants.map(ce=>({id:ce.id,title:ce.title,draggable:!1,lane:E.id,ghost:!0,badges:[ce.badge],...typeof ce.search_match=="boolean"?{search_match:ce.search_match}:{}}));return{id:E.id,index:E.index+1,raw_length:E.raw_length,ghosts:oe,items:E.items.map(ce=>Kt(ce,h)),occupied:E.occupied_by.length>0,badge:E.occupants.length>0?E.occupants[0].badge:"\uB300\uAE30",cycle:E.cycle===!0}})}function St(b){return b.runnable.map(h=>kt(h))}function nn(b){return b.done.map(h=>kt(h))}function Zt(b){let h=b.running.filter(E=>E.non_occupying!==!0).map(E=>({...E,bead_id:E.id,attempt_id:E.attempt_id||"",paused:E.run_state==="paused",failed:E.run_state==="failed",parked:E.run_state==="parked",retry_wait:E.run_state==="retry_wait",waiting:E.run_state==="waiting",wait:E.wait||null,provider_hold:E.run_state==="provider_hold",hold:E.hold?{...E.hold,open:R===E.attempt_id}:null,status_label:E.run_state==="failed"?E.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":E.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":E.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":E.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":E.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:E.can_pause!==!1,workspace_name:"",dependency_chips:gt(E)||void 0,chip_popover:wt(E),rollup_expanded:Re.has(E.id),failure:E.failure?{...E.failure,open:O===E.attempt_id}:null,...$o(E.id,{discard:E.discard,parked:E.run_state==="parked"},F.has(E.id))}));return[...h.filter(E=>E.failed===!0),...h.filter(E=>E.failed!==!0&&E.parked===!0),...h.filter(E=>E.failed!==!0&&E.parked!==!0)]}function qt(b){return Rt(b).map(h=>({...h,chip_popover:wt(h)}))}function Rt(b){if(C&&C.model===b)return C.rows;let h=B(),E=_e(b),oe=Dt(h.attempts),ce=Object.values(oe).filter(nr),Le=new Map;for(let Ve of ce)Le.set(Ve.attempt_id,Ve);let Ue=new Map;for(let Ve of ce)Ue.set(Ve.bead_id,Ve);let Ct=new Map;for(let Ve of[...b.pr_wait,...b.running,...b.queue,...b.runnable,...b.done])Ct.has(Ve.id)||Ct.set(Ve.id,Ve);let Qt=Ve=>{let Gt=null;for(let xn of ce)!xn||xn.bead_id!==Ve||al(xn,Le)||(Gt===null||(typeof xn.started_at=="number"?xn.started_at:0)>=(typeof Gt.started_at=="number"?Gt.started_at:0))&&(Gt=xn);return Gt&&typeof Gt.target_base=="string"?Gt.target_base:null},lt=new Map;for(let Ve of b.running)Ve.run_state==="failed"||Ve.conflict_resolution!==!0||(Ve.run_state!=="paused"?lt.set(Ve.id,"running"):lt.has(Ve.id)||lt.set(Ve.id,"paused"));let sn=Dt(h.auto_merge_skips),ln=new Set(E.merge.auto_excluded),Un=Dt(h.pr_observations),_n=Dt(h.pr_activity),dn=Dt(h.cleanup_failed),On=Dt(h.discard_operations),Vn=Dt(h.bead_workflow),an=Dt(h.bead_titles),Qn=h.merge_queue_state||{active:null,failures:{}},lr=E.merge.state.waiting,Rn=new Map;for(let Ve of Array.isArray(h.merge_queue)?h.merge_queue:[])Ve&&typeof Ve=="object"&&Ve.bead_id&&Rn.set(Ve.bead_id,Ve);let Wn=(Array.isArray(h.pr_wait)?h.pr_wait:[]).map(Ve=>{let Gt=Ct.get(Ve.bead_id);return{...ow(Ve.bead_id,Gt?.title||an[Ve.bead_id]||Ve.bead_id,Un,dn[Ve.bead_id]||null,tr(oe,Ve.bead_id),_n[Ve.bead_id]||(be.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:Ne.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),lt.get(Ve.bead_id)||null,Ve.external===!0,{position:E.merge.positions.get(Ve.bead_id)||0,active:Qn.active===Ve.bead_id,failure:Dt(Qn.failures)[Ve.bead_id]||null,waiting:lr&&lr.bead_id===Ve.bead_id?lr.reason:null,resolution:E.merge.resolutions.get(Ve.bead_id),continuation_action:E.merge.continuations.get(Ve.bead_id),authority:E.merge.authorities.get(Ve.bead_id)||null,hold:Rn.get(Ve.bead_id)?.hold||null,review_dispatch:Rn.get(Ve.bead_id)?.review_dispatch||null},Ve.wt_present!==!1,h.auto_merge===!0&&ln.has(Ve.bead_id)?sn[Ve.bead_id]?.reason||"":null,il(E.declared_base,Qt(Ve.bead_id)),Dt(h.completion_status)[Ve.bead_id]||null,On,h.auto_merge===!0,{merge_sha:Ve.merge_sha,cleanup_cursor:Ve.cleanup_cursor,repo_operations:E.repo_operations},Gt?gt(Gt):null,ad(oe,Ve.bead_id),F.has(Ve.bead_id)),...Gt?.search_match===void 0?{}:{search_match:Gt.search_match},workflow:Vn[Ve.bead_id]||null,priority:Gt?.priority,from_id:Gt?.from_id,...Gt?.created_at===void 0?{}:{created_at:Gt.created_at},...Gt?.updated_at===void 0?{}:{updated_at:Gt.updated_at}}});return C={model:b,rows:Wn},Wn}function Jt(b){let h=_e(b),E=[];for(let Le of b.running)Le.non_occupying!==!0&&E.push({id:Le.id,title:Le.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Le.serial_lane_id??null});for(let Le of b.pr_wait)E.push({id:Le.id,title:Le.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Le of h.sublanes.serial)Le.items.forEach((Ue,Ct)=>{E.push({id:Ue.id,title:Ue.title,location_label:`${Le.id} #${Ct+1}`,kind:"serial",lane_id:Le.id})});h.sublanes.parallel.forEach((Le,Ue)=>{E.push({id:Le.id,title:Le.title,location_label:`#${Ue+1}`,kind:"parallel",lane_id:null})});for(let Le of b.runnable)E.push({id:Le.id,title:Le.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Le.queue_placeable===!0});let oe=B();Y=c_(oe.bead_scope,E);let ce=new Map;for(let Le of[...b.running,...b.runnable])Array.isArray(Le.blocked_by)&&Le.blocked_by.length>0&&ce.set(Le.id,Le.blocked_by);for(let[Le,Ue]of Object.entries(Dt(oe.bead_blocked_by)))Array.isArray(Ue)&&ce.set(Le,Ue.filter(Ct=>typeof Ct=="string"&&Ct.length>0));L=xd(ce,E,Dt(oe.blocker_workspaces))}function Ee(b){let h=b.hold&&typeof b.hold=="object"?b.hold:null;if(!h||h.kind!=="env"&&h.kind!=="systemic")return"";let E=kr(h.cause)||String(h.cause||""),oe=Array.isArray(b.lineages)?b.lineages:[];if(h.kind==="env"){let Le=oe.map(Ct=>Ct&&Ct.next_at).filter(Ct=>typeof Ct=="number").sort((Ct,Qt)=>Ct-Qt)[0],Ue=typeof Le=="number"?` \xB7 \uB2E4\uC74C ${new Date(Le).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${E} — 재시도 대기${Ue}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let ce=(Array.isArray(h.bead_ids)?h.bead_ids:[]).filter(Le=>typeof Le=="string"&&Le.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${E}${ce.length>0?` \u2014 bead ${ce.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function T(b){let h=[];for(let[lt,sn]of Object.entries(Dt(b.provider_hold)))for(let ln of Array.isArray(sn?.targets)?sn.targets:[])h.push({runner:lt,target:ln});if(h.length===0)return"";let E=h.find(lt=>lt.target?.kind==="outage");if(E){let lt=typeof E.target.next_probe_at=="number"?new Date(E.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${E.runner} 공급자 장애 — 신규 디스패치
        보류${lt?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${lt}`:""}
      </div>`}let oe=Array.isArray(Dt(b.account_catalog).claude)?Dt(b.account_catalog).claude:[],ce=lt=>oe.find(ln=>ln?.email===lt)?.alias||lt,Le=h.find(lt=>typeof lt.target?.account!="string"),Ue=lt=>typeof lt?.resets_at=="number"?new Date(lt.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Le){let lt=Ue(Le.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Le.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${lt?`, \uB9AC\uC14B ${lt}`:""}
      </div>`}let Ct=[...new Set(h.map(lt=>ce(String(lt.target.account))))],Qt=Ue(h[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Ct.join(", ")} 사용 한도 —
      ${Ct.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${Qt?`, \uB9AC\uC14B ${Qt}`:""}
    </div>`}function de(b){let h=B(),E=_e(b),oe=E.sublanes.parallel,ce=oe.length>0?oe[0].id:"\u2014",Le=c`<button
      type="button"
      class="worker-play${h.auto_advance?" is-active":""}"
    >
      ${h.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ue=p(b),Ct=E.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Qt=h.auto_advance?0:(Array.isArray(h.queue)?h.queue:[]).filter(an=>an&&typeof an.armed_by_lane=="string"&&an.armed_by_lane.length>0).length,lt=Qt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Qt}건 진행 중</span
          >`:"",sn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${E.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${qt(b).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${V()} 완료 <b>${b.done.length}</b></span
      >`,ln=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${E.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${E.declared_base||"?"}</span
    >`,Un=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${da}
          step="1"
          .value=${String(E.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:A_},(an,Qn)=>Qn+1).map(an=>c`<option
                value=${String(an)}
                ?selected=${E.serial_lane_count===an}
              >
                ${an}
              </option>`)}
        </select>
      </label> `,_n=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${K}
    />`,dn=cd(E.repo_operations,E.cleanup_failures),On=Ee(h),Vn=T(h);return q?c`<div class="worker-ribbon">
          ${Le} ${Ue}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Ct}${lt}${sn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Un}${_n}</div>
          <div class="worker-kpi">${ln}</div>
        </div>
        ${Vn}${On}${dn}${Q.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Le}${Ue}${Un}${_n}
        </div>
        <div class="worker-kpi">
          ${Ct}${lt}${sn}${ln}
          ${(Array.isArray(E.token_total)?E.token_total:E.token_total?[{label:E.token_total,tooltip:`${V()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(an=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${an.tooltip}
                >${V()} 완료 · 누적 ${an.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ce}</b></span
          >
        </div>
      </div>
      ${Vn}${On}${dn}${Q.template()}`}function De(b){let h=b.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${g.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${es.map(E=>c`<button
              type="button"
              class="worker-filter__chip${g.readiness===E.value?" is-active":""}"
              data-readiness=${E.value}
              aria-pressed=${g.readiness===E.value?"true":"false"}
            >
              ${E.label}
            </button>`)}
        ${h.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${h.readiness}</span
            >`:""}
      </div>
    </div>`}function yt(){let b=P?"custom":Vl(I)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${b}
    >
      ${ws.map(h=>c`<option value=${h.id} ?selected=${b===h.id}>
            ${h.label}
          </option>`)}
      <option value="custom" ?selected=${b==="custom"}>
        사용자 지정…
      </option>
    </select>`}function Qe(){let b=$s(I);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(h=>{let E=b[h];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${h}
            aria-label=${`${h+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${E?E.key:""}
          >
            ${h===0?"":c`<option value="" ?selected=${!E}>없음</option>`}
            ${o_.map(oe=>c`<option
                  value=${oe.key}
                  ?selected=${!!E&&E.key===oe.key}
                >
                  ${oe.label}
                </option>`)}
          </select>
          ${E?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${h}
                aria-label=${E.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${E.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${E.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function y(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${j}
      >
        ${Gr.map(b=>c`<option value=${b.value} ?selected=${j===b.value}>
              ${b.label}
            </option>`)}
      </select>
    </div>`}function p(b){let h=_e(b).merge,E=B().auto_merge===!0;if(h.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${E?" is-active":""}"
        title=${E?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${E?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${h.positions.size}
      </button>`;if(E)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let oe=new Set(h.auto_excluded),ce=qt(b).filter(Le=>Le.merge_action&&Le.merge_enabled&&!oe.has(Le.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ce>0?` ${ce}`:""}
    </button>`}function _(b,h){return c`<div
      data-bead-id=${b.id}
      data-drag-kind=${h.kind}
      data-root-dir=${h.root_dir}
      data-lane-id=${pn(h.lane_id)}
      data-row-index=${h.row_index}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${Mn({...b,...$o(b.id,{discard:b.discard,parked:!1},F.has(b.id))},{actions:go(b)})}
    </div>`}function x(b){let h=Wt(b),E=Ce();return Ei({parallel:{rows:h.map((oe,ce)=>_(oe,{kind:"parallel",root_dir:E,row_index:ce})),count:h.length,collapsed:M.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:E}},serial:{lanes:zt(b).map(oe=>({id:oe.id,title:`\uC9C1\uB82C ${oe.index}`,rows:[...oe.ghosts.map(ce=>Mn({...ce,...$o(ce.id,{discard:ce.discard,parked:!1},F.has(ce.id))},{actions:go(ce)})),...oe.items.map((ce,Le)=>_(ce,{kind:"repo-serial",root_dir:E,row_index:Le,lane_id:oe.id}))],count:oe.ghosts.length+oe.items.length,match_count:te([...oe.ghosts,...oe.items]),empty:oe.ghosts.length+oe.items.length===0,badge:oe.badge,held:oe.occupied,cycle:oe.cycle,drop:{drop:"repo-serial",root_dir:E,lane_id:oe.id,lane_length:String(oe.raw_length)}})),collapsed:M.isAreaCollapsed("serial")}})}function z(b){return gf(Zt(b),Date.now(),pe)}function H(b){return b.running.some(h=>h.kind!=="session"&&h.run_state==="running")}function le(b){let h=_e(b),E=St(b),oe=Wt(b),ce=nn(b),Le=qt(b),Ue=Zt(b),Ct=Yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:E,match_count:te(E),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:yt(),header_row:P?Qe():void 0,controls:De(b),collapsible:!0,collapsed:M.isCollapsed("candidate"),place_menu:Z(E),onOpenDoc:u?(lt,sn)=>u(sn):void 0}),Qt=Yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ce,match_count:te(ce),empty:`${V()} \uC644\uB8CC \uC5C6\uC74C`,header_control:y(),collapsible:!0,collapsed:M.isCollapsed("done"),preview:q?Array.isArray(h.token_total)?h.token_total.map(lt=>lt.label).join(" \xB7 "):h.token_total||S_(ce):void 0});return q?c`<div class="worker-lanes worker-lanes--mobile">
          ${Ti({live:H(b),running_body:Ue.length>0?z(b):"",pr_wait_rows:Le.map(lt=>Mn(lt)),count:Ue.length+Le.length})}
          ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,match_count:te(oe),collapsible:!0,collapsed:M.isCollapsed("queue"),preview:S_(oe),body:x(b)})}
          ${Ct} ${Qt}
        </div>
        ${w()}`:c`<div class="worker-lanes">
        ${Ct}
        ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,match_count:te(oe),collapsible:!0,collapsed:M.isCollapsed("queue"),body:x(b)})}
        ${Yn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ue,match_count:te(Ue),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${h.slots}</span
          >`,live:H(b),collapsible:!0,collapsed:M.isCollapsed("running"),body:z(b)})}
        ${Yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Le,match_count:te(Le),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:M.isCollapsed("pr_wait")})}
        ${Qt}
      </div>
      ${w()}`}function Ie(b){M.toggle(b),$e()}function nt(b){M.toggleArea(b),$e()}function $e(){let b=Se();Jt(b),ft(de(b),ve),ft(le(b),re);let h=re.querySelector(".provider-resume-dialog");h&&!h.open&&(typeof h.showModal=="function"?h.showModal():h.setAttribute("open",""))}function $(){let b=!0,h=ta(E=>{if(q=E,b){b=!1;return}$e()});se.push(h)}function S(b){g=b,Bk(b),$e()}function Me(b){if(b==="custom"){P=!0,$e();return}I=Wr(b),Ql(I),P=!1,$e()}function Oe(b){I=Wr({chain:b}),Ql(I),$e()}function Xe(b){j=zn(b),Wk(j),f?.(j),$e()}function xt(b){let h=b.target;if(X){let lt=h?.closest?.(".provider-resume-dialog__runner");if(lt){let _n=Dt(Dt(B().runner_catalog).runners),dn=Dt(_n[lt.value]),On=Object.keys(Dt(dn.models));X={...X,runner:lt.value,model:typeof dn.default_model=="string"?dn.default_model:On[0]||""},$e();return}let sn=h?.closest?.(".provider-resume-dialog__model");if(sn){try{let[_n,dn]=JSON.parse(sn.value);typeof _n=="string"&&typeof dn=="string"&&(X={...X,runner:_n,model:dn},$e())}catch{}return}let ln=h?.closest?.(".provider-resume-dialog__account");if(ln){X={...X,account:ln.value},$e();return}let Un=h?.closest?.(".provider-resume-dialog__fresh-input");if(Un){X={...X,fresh_current:Un.checked},$e();return}}let E=h?.closest?.(".worker-serial-lane-count");if(E){let lt=Number.parseInt(E.value,10);Number.isFinite(lt)&&ie(lt).then($e);return}let oe=b.target?.closest?.(".worker-filter__blocked");if(oe){S({...g,show_blocked:oe.checked});return}let ce=b.target?.closest?.(".worker-sort-chain__key");if(ce){let lt=Number.parseInt(ce.getAttribute("data-step")||"",10);Number.isFinite(lt)&&Oe(i_($s(I),lt,ce.value));return}let Le=b.target?.closest?.(".worker-done-range");if(Le){Xe(Le.value);return}let Ue=b.target?.closest?.(".worker-sort");if(Ue){Me(Ue.value);return}let Ct=b.target?.closest?.(".worker-slots__input");if(!Ct)return;let Qt=Number.parseInt(Ct.value,10);if(!Number.isFinite(Qt)){$e();return}N(Qt).then($e)}function Nt(b){return b?{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,worktree:b.worktree||void 0,status:b.status||void 0,session_id:b.session_id||void 0}:{}}function en(){let b=_e(Se()),h=B().workspace_info,E=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:b.repo_operations,cleanup_failures:b.cleanup_failures,repo:l&&l()||"",repo_ops:E}}function zr(){pe&&qe.close(),G.hidden=!1,Te.hidden=!1,Be.open(en()),$e()}function $n(b){let h=B(),E=h.attempts?h.attempts[b]:null;pe=b,Be.close(),G.hidden=!0,Te.hidden=!1,qe.open({attempt_id:b,meta:Nt(E)}),$e()}function Ar(b){let h=B(),E=(Array.isArray(h.session_active)?h.session_active:[]).find(ce=>ce&&ce.bead_id===b),oe=(E&&Array.isArray(E.session_refs)?E.session_refs:[]).find(ce=>ce&&ce.current===!0);oe&&(Be.close(),G.hidden=!0,Te.hidden=!1,qe.open(ro(oe,b,"in_progress")),$e())}function Hr(){if(Be.isOpen()&&Be.refresh(en()),!pe)return;let b=B(),h=b.attempts?b.attempts[pe]:null;if(h){qe.updateMeta(Nt(h));return}qe.close()}function pa(b,h){if(b.length===0||!s)return;let E=l?l():void 0;if(h.length===0||!E||h===E||!a){s(b);return}Promise.resolve(a(h)).then(()=>{s(b)}).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function xs(b){let h=b.target;if(h?.closest?.(".provider-resume-dialog__cancel")){He();return}if(h?.closest?.(".provider-resume-dialog__confirm")){it();return}if(h?.closest?.(".provider-resume-dialog")||h?.closest?.(".worker-mini__grip"))return;let E=h?.closest?.(".worker-sort-chain__dir");if(E){let fe=Number.parseInt(E.getAttribute("data-step")||"",10);Number.isFinite(fe)&&Oe(a_($s(I),fe));return}let oe=h?.closest?.(".worker-dep__open");if(oe){pa(oe.getAttribute("data-dep-id")||"",oe.getAttribute("data-root-dir")||"");return}let ce=h?.closest?.(".judgement-chip");if(ce){let fe=ce.closest("[data-bead-id]"),vt=fe&&fe.getAttribute("data-bead-id")||"",Vt=ce.getAttribute("data-chip-key")||"";vt&&Vt&&ee.toggle({bead_id:vt,chip_key:Vt});return}if(h?.closest?.(".chip-popover"))return;if(h?.closest?.(".worker-repo-strip")){zr();return}let Le=h?.closest?.(".worker-repo-op__dismiss");if(Le){A(Le.dataset.operationId||"");return}let Ue=h?.closest?.(".worker-cleanup__resume");if(Ue){let fe=Ue.dataset.beadId;fe&&jt(fe);return}let Ct=h?.closest?.(".worker-cleanup__resolve");if(Ct){let fe=Ct.dataset.beadId;fe&&It(fe);return}if(h?.closest?.(".worker-hold__retry")){Ut("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(h?.closest?.(".worker-hold__resume")){Ut("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(h?.closest?.(".worker-play")){me(!B().auto_advance);return}let Qt=h?.closest?.(".worker-merge-all");if(Qt){Qt.classList.contains("worker-merge-all--stop")?B().auto_merge===!0?we(!1):ot():we(!0);return}let lt=h?.closest?.(".worker-pane__toggle[data-lane]");if(lt){let fe=lt.dataset.lane;(fe==="candidate"||fe==="queue"||fe==="running"||fe==="pr_wait"||fe==="done")&&Ie(fe);return}let sn=h?.closest?.(".worker-wait__area-toggle[data-area]");if(sn){let fe=sn.dataset.area;(fe==="parallel"||fe==="serial")&&nt(fe);return}let ln=h?.closest?.(".worker-card__place-lane");if(ln){let fe=ln.dataset.beadId,vt=ln.dataset.lane;fe&&(vt==="parallel"||/^s[1-5]$/.test(vt||""))&&(v=null,$e(),Ye(fe,vt));return}if(h?.closest?.(".worker-card__place-cancel")){v=null,$e();return}let _n=h?.closest?.(".worker-card__place");if(_n){let fe=_n.dataset.beadId;fe&&!_n.disabled&&(Ko(B())?(v=fe,$e()):Ye(fe,"parallel"));return}let dn=h?.closest?.(".worker-filter__chip");if(dn){let fe=dn.dataset.readiness;(fe==="all"||fe==="ready"||fe==="not_ready")&&S({...g,readiness:fe});return}let On=h?.closest?.('[data-action="queue-remove"]');if(On){let fe=On.dataset.beadId||"";fe&&ke.sendOp({type:"worker-queue-remove",payload:{bead_id:fe},root_dir:Ce()},fe);return}let Vn=h?.closest?.(".worker-mini__merge");if(Vn){let fe=Vn.dataset.beadId||"";B().cleanup_failed?.[fe]?jt(fe):Tt(fe);return}let an=h?.closest?.(".worker-mini__merge-cancel");if(an){Ge(an.dataset.beadId||"");return}let Qn=h?.closest?.(".worker-mini__resolve");if(Qn){It(Qn.dataset.beadId||"");return}let lr=h?.closest?.(".rtile__resolve");if(lr){let fe=lr.closest(".rtile");It(fe?.dataset.beadId||"");return}let Rn=h?.closest?.(".worker-mini__discard"),Wn=h?.closest?.(".worker-mini__discard-abandon");if(Wn){mt(Wn.dataset.beadId||"",Wn.dataset.operationId||"",{kind:Wn.dataset.operationKind||"",last_error:Wn.dataset.lastError||""});return}if(Rn){et(Rn.dataset.beadId||"",Rn.dataset.attemptId||null,Rn.dataset.discardMode==="merged"?"merged":"unmerged",Rn.dataset.operationId||null);return}let Ve=h?.closest?.(".worker-mini__stale-continue");if(Ve){bt("worker-stale-work-continue",Ve.dataset.beadId||"",Ve.dataset.actionId||"");return}let Gt=h?.closest?.(".worker-mini__stale-backup");if(Gt){bt("worker-stale-work-backup-fresh",Gt.dataset.beadId||"",Gt.dataset.actionId||"");return}let xn=h?.closest?.(".worker-mini__stale-recheck");if(xn){bt("worker-stale-work-recheck",xn.dataset.beadId||"",xn.dataset.actionId||"");return}let Ts=h?.closest?.(".worker-mini__revise-fix");if(Ts){tt("worker-revise-fix",Ts.dataset.beadId||"");return}let Cs=h?.closest?.(".worker-mini__revise-approve");if(Cs){tt("worker-revise-approve",Cs.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;let st=h?.closest?.(".rtile__failure-badge");if(st){let fe=st.dataset.attemptId||"";O=O===fe?null:fe,$e();return}let k=h?.closest?.(".rtile__provider-hold-badge");if(k){let fe=k.dataset.attemptId||"";R=R===fe?null:fe,$e();return}let D=h?.closest?.(".rtile__attempt-copy");if(D){let fe=D.dataset.attemptId||"";fe&&gn(fe).then(vt=>{ge(vt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",vt?"success":"error",1400)});return}let W=h?.closest?.(".rtile__discard-abandon");if(W){let vt=h?.closest?.(".rtile")?.dataset?.beadId;vt&&mt(vt,W.dataset.operationId||"",{kind:W.dataset.operationKind||"",last_error:W.dataset.lastError||""});return}let xe=h?.closest?.(".rtile__discard");if(xe){let fe=h?.closest?.(".rtile"),vt=fe?.dataset?.beadId,Vt=fe?.dataset?.attemptId;vt&&et(vt,Vt||null,xe.dataset.confirmation==="merged"?"merged":"unmerged",xe.dataset.operationId||null);return}if(h?.closest?.(".rtile__pause")){let vt=h?.closest?.(".rtile")?.dataset?.attemptId;vt&&Et(vt);return}if(h?.closest?.(".rtile__resume-alternate")){let vt=h?.closest?.(".rtile")?.dataset?.attemptId;vt&&pt(vt);return}if(h?.closest?.(".rtile__resume")){let fe=h?.closest?.(".rtile__resume"),Vt=h?.closest?.(".rtile")?.dataset?.attemptId;Vt&&Pt(Vt,fe?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(h?.closest?.(".rtile__session")){let fe=h?.closest?.(".rtile"),vt=fe?.dataset?.attemptId;if(vt){$n(vt);return}let Vt=fe?.dataset?.beadId;Vt&&Ar(Vt);return}if(h?.closest?.(".rtile__failure-pop"))return;if(h?.closest?.(".worker-drawer-overlay__backdrop")){Be.close(),qe.close();return}if(h?.closest?.(".worker-drawer-host"))return;let ze=h?.closest?.(".rtile .board-card__roll-toggle");if(ze){let fe=ze.dataset.rollParent;fe&&(Re.has(fe)?Re.delete(fe):Re.add(fe),$e());return}let ct=h?.closest?.(".rtile .board-card__roll-child");if(ct){let fe=ct.dataset.childId;fe&&s&&s(fe);return}let Ft=h?.closest?.(".rtile");if(Ft){if(h?.closest?.(".rtile__id")){let vt=Ft.dataset.beadId;vt&&gn(vt).then(Vt=>{Vt?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let fe=Ft.dataset.beadId;fe&&s&&s(fe);return}let Ze=h?.closest?.(".worker-mini, .worker-card");if(Ze){let fe=Ze.dataset.beadId;if(h?.closest?.('[data-seam="log-path-copy"]'))return;if(h?.closest?.(".worker-mini__id, .worker-card__id")){fe&&gn(fe).then(Vt=>{Vt?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let vt=h?.closest?.(".ctl-chip--from");if(vt){let Vt=vt.dataset.fromId;Vt&&s&&s(Vt);return}fe&&s&&s(fe)}}function As(b){let h=b.target;h?.closest?.(".worker-search")&&(K=h.value,$e())}function fa(b){let h=b.target;b.key!=="Escape"||!h?.closest?.(".worker-search")||K.length===0||(K="",$e())}ke.attach(e),e.addEventListener("click",xs),e.addEventListener("change",xt),e.addEventListener("input",As),e.addEventListener("keydown",fa);function Ss(b){let h=b.target,E=h&&typeof h.closest=="function"?ce=>h.closest(ce):()=>null,oe=!1;O&&!E(".rtile__failure-pop, .rtile__failure-badge")&&(O=null,oe=!0),R&&!E(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(R=null,oe=!0),oe&&$e()}function Es(b){b.key==="Escape"&&(O===null&&R===null&&X===null||(O=null,R=null,X=null,$e()))}return document.addEventListener("click",Ss),document.addEventListener("keydown",Es),ee.attach(),se.push(()=>{document.removeEventListener("click",Ss),document.removeEventListener("keydown",Es),ee.detach()}),$(),m&&se.push(m.subscribe(()=>{ye.notifyIssuesChanged(),$e()})),o&&se.push(o.subscribe(()=>{let b=l&&l()||"";b!==We&&(We=b,Je.close()),$e(),Hr()})),$e(),{load(){ye.ensureSessionDefaults(),$e()},refreshSessionDefaults:Ae,destroy(){for(let b of se.splice(0))try{b()}catch{}ke.detach(),e.removeEventListener("click",xs),e.removeEventListener("change",xt),ye.destroy();try{qe.destroy()}catch{}Te.hidden=!0;try{Je.destroy()}catch{}ft(c``,e)}}}function tc(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function O_(e,t,n,r=async()=>{},o=async()=>{}){let i=Ht("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(P){let V=P.target.value,q=t.getState().workspace?.current?.path||"";if(V&&V!==q){i("switching workspace to %s",V),l=!0,I();try{await n(V)}catch(K){i("workspace switch failed: %o",K)}finally{l=!1,I()}}}async function f(){let P=t.getState(),j=P.workspace?.current?.path||P.workspace?.available?.[0]?.path||"";if(!(!j||a)){i("git-pulling workspace %s",j),a=!0,I();try{await r(j)}catch(V){i("workspace git pull failed: %o",V)}finally{a=!1,I()}}}function m(P){let j=P.target;j&&e.contains(j)||O()}function g(P){P.key==="Escape"&&O()}function v(){u||(u=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",g),I())}function O(){u&&(u=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",g),I())}function R(){u?O():v()}async function X(P){let j=P.target,V=j.value,M=j.checked;i("toggling visibility %s \u2192 %s",V,String(M));try{await o(V,M)}catch(q){i("workspace visibility toggle failed: %o",q)}}function ee(P){return P?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function Y(P,j){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${R}
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
                ${P.map(V=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${V.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${V.path}"
                        .checked=${!j.has(V.path)}
                        @change=${X}
                      />
                      <span class="workspace-picker__manage-name"
                        >${tc(V.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let P=t.getState(),j=P.workspace?.current,V=P.workspace?.available||[],M=new Set(P.workspace?.hidden||[]),q=j?.path||V[0]?.path||"";if(V.length===0)return c``;let K=V.filter(U=>!M.has(U.path)||U.path===q);if(K.length<=1){let U=K[0]||V[0],te=tc(U.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${U.path}"
            >${te}</span
          >
          ${Y(V,M)}
          ${ee(q)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${K.map(U=>c`
              <option
                value="${U.path}"
                ?selected=${U.path===q}
                title="${U.path}"
              >
                ${tc(U.path)}
              </option>
            `)}
        </select>
        ${Y(V,M)}
        ${ee(q)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){ft(L(),e)}return I(),s=t.subscribe(()=>I()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",g),ft(c``,e)}}}var R_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function nc(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function I_(e,t,n=nc()){return{id:n,type:e,payload:t}}function L_(e={}){let t=Ht("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],f=new Map,m=new Set;function g(L){for(let I of Array.from(m))try{I(L)}catch{}}function v(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),g(i);let L=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),I=(n.jitterRatio||0)*L,P=Math.max(0,Math.round(L+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",P,s+1),l=setTimeout(()=>{l=null,Y()},P)}function O(L){try{o?.send(JSON.stringify(L))}catch(I){t("ws send failed",I)}}function R(){for(i="open",t("ws open"),g(i),s=0;d.length;){let L=d.shift();L&&O(L)}}function X(L){let I;try{I=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(u.has(I.id)){let j=u.get(I.id);u.delete(I.id),I.ok?j?.resolve(I.payload):j?.reject(I.error||new Error("ws error"));return}let P=f.get(I.type);if(P&&P.size>0)for(let j of Array.from(P))try{j(I.payload)}catch(V){t("ws event handler error",V)}else t("ws received unhandled message type: %s",I.type)}function ee(){i="closed",t("ws closed"),g(i);for(let[L,I]of u.entries())I.reject(new Error("ws disconnected")),u.delete(L);s+=1,v()}function Y(){if(!a)return;let L=r();try{o=new WebSocket(L),t("ws connecting %s",L),i="connecting",g(i),o.addEventListener("open",R),o.addEventListener("message",X),o.addEventListener("error",()=>{}),o.addEventListener("close",ee)}catch(I){t("ws connect failed %o",I),v()}}return Y(),{send(L,I){if(!R_.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let P=nc(),j=I_(L,I,P);return t("send %s id=%s",L,P),new Promise((V,M)=>{u.set(P,{resolve:V,reject:M,type:L}),o&&o.readyState===o.OPEN?O(j):(t("queue %s id=%s (state=%s)",L,P,i),d.push(j))})},on(L,I){f.has(L)||f.set(L,new Set);let P=f.get(L);return P?.add(I),()=>{P?.delete(I)}},onConnection(L){return m.add(L),()=>{m.delete(L)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,Y()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function sw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function iw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var rc=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],D_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],$r="tab:worker:closed",aw="bdui.worker.done-range",P_=Lf,M_="worker:queue",q_="ui:order",N_="ui:display-policy",j_="exec:presets",xr="tab:board:closed",F_="beads-ui.board.closed-range";function lw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+cw(e))});return n.observe(e),()=>n.disconnect()}function cw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function uw(e){let t=Ht("main");t("bootstrap start"),lw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ft(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&Jf(s),l&&a&&u&&d){let ye=function($,S){let Me="Request failed",Oe="";if($&&typeof $=="object"){let xt=$;if(typeof xt.message=="string"&&xt.message.length>0&&(Me=xt.message),typeof xt.details=="string")Oe=xt.details;else if(xt.details&&typeof xt.details=="object")try{Oe=JSON.stringify(xt.details,null,2)}catch{Oe=""}}else typeof $=="string"&&$.length>0&&(Me=$);let Xe=S&&S.length>0?`Failed to load ${S}`:"Request failed";se.open(Xe,Me,Oe)},Fe=function($){return`${Ee.getState().workspace.current?.path||""}\0${$}`},_t=function(){ke&&(ke().catch(()=>{}),ke=null),pe=null,qe=null},He=function($){Be=$;let S=()=>{Be!==$||Ee.getState().selected_id!==$||(Be=null,pt($))};if(!Q){We.then(S);return}S()},Ce=function($,S,Me,Oe,Xe){return Me!==Z[S]?(Xe().catch(()=>{}),!1):($.set(Oe,Xe),!0)},Ke=function(){let $=Ee.getState();Tt($.view==="board"),Ge($.view==="worker"),me(tt($)),et($.view==="board"||$.view==="worker"||Ye||!!$.selected_id)},Pt=function(){let $=Rr(je);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},rt=function(){let $=Rr(Et);return $===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:$}}},Tt=function($){if($)for(let[S,Me]of rc){if(it.has(S)||w.has(S))continue;let Oe=S===xr?Pt():{type:Me};try{Te.register(S,Oe)}catch(Nt){t("register %s store failed: %o",S,Nt)}w.add(S);let Xe=Z.board,xt=!1;ve.subscribeList(S,Oe).then(Nt=>{xt=!Ce(it,"board",Xe,S,Nt)}).catch(Nt=>{t("subscribe %s failed: %o",S,Nt),ye(Nt,"board")}).finally(()=>{w.delete(S),xt&&Ke()})}else Ut()},Ut=function(){Z.board+=1;for(let[$]of rc){let S=it.get($);S&&(S().catch(()=>{}),it.delete($));try{Te.unregister($)}catch(Me){t("unregister %s failed: %o",$,Me)}}},Ge=function($){if(!$){ot();return}for(let[S,Me]of D_){if(ae.has(S)||w.has(S))continue;let Oe=S===$r?rt():{type:Me};try{Te.register(S,Oe)}catch(Nt){t("register %s store failed: %o",S,Nt)}w.add(S);let Xe=Z.worker,xt=!1;ve.subscribeList(S,Oe).then(Nt=>{xt=!Ce(ae,"worker",Xe,S,Nt)}).catch(Nt=>{t("subscribe %s failed: %o",S,Nt),ye(Nt,"worker")}).finally(()=>{w.delete(S),xt&&Ke()})}},ot=function(){Z.worker+=1;for(let[$]of D_){let S=ae.get($);S&&(S().catch(()=>{}),ae.delete($));try{Te.unregister($)}catch(Me){t("unregister %s failed: %o",$,Me)}}},et=function($){if(!$){mt();return}we||(Pe("subscribe-worker-queue",{id:M_}).catch(S=>{t("subscribe-worker-queue failed: %o",S)}),we=()=>Pe("unsubscribe-worker-queue",{id:M_}))},mt=function(){we&&(we().catch(()=>{}),we=null)},tt=function($){return $.view==="monitor"||$.selected_id!=null},me=function($){if(!$){A();return}bt||(Pe("subscribe-monitor-pipeline",{id:P_}).catch(S=>{t("subscribe-monitor-pipeline failed: %o",S)}),bt=()=>Pe("unsubscribe-monitor-pipeline",{id:P_}))},A=function(){bt&&(bt().catch(()=>{}),bt=null)},ie=function(){N||(Pe("subscribe-ui-order",{id:q_}).catch($=>{t("subscribe-ui-order failed: %o",$)}),N=()=>Pe("unsubscribe-ui-order",{id:q_}))},Se=function(){N&&(N().catch(()=>{}),N=null),G.clear()},gt=function(){_e||(Pe("subscribe-display-policy",{id:N_}).catch($=>{t("subscribe-display-policy failed: %o",$)}),_e=()=>Pe("unsubscribe-display-policy",{id:N_}))},kt=function(){_e&&(_e().catch(()=>{}),_e=null),re.clear()},$t=function(){wt||(Pe("subscribe-impl-presets",{id:j_}).catch($=>{t("subscribe-impl-presets failed: %o",$)}),wt=()=>Pe("unsubscribe-impl-presets",{id:j_}))},Zt=function($){if(!$)return"Unknown";let S=$.split("/").filter(Boolean);return S.length>0?S[S.length-1]:"Unknown"},x=function($,S){_.open($.path,{missing_state:$.missing_state,...S?{workspace:S}:{}})};var f=ye,m=Fe,g=_t,v=He,O=Ce,R=Ke,X=Pt,ee=rt,Y=Tt,L=Ut,I=Ge,P=ot,j=et,V=mt,M=tt,q=me,K=A,U=ie,te=Se,be=gt,Ne=kt,F=$t,J=Zt,he=x;let Re=document.getElementById("header-loading"),C=Kc(Re),se=nf(e),Ae=L_(),Pe=C.wrapSend(($,S)=>Ae.send($,S)),ve=jc(Pe),Te=Fc(),ut=Uc(),dt=bc(),G=Bc(),re=gc(),ne=hc(),ue=yc();Ae.on("impl-presets-snapshot",$=>{let S=$;S&&typeof S.revision=="number"&&Array.isArray(S.presets)&&ne.set({revision:S.revision,presets:S.presets})}),Ae.on("monitor-pipeline-snapshot",$=>{let S=$;if(!(!S||!Array.isArray(S.workspaces)))try{dt.set(S.workspaces,S.workspaces_state,S.cross_lanes)}catch{}}),Ae.on("ui-order-snapshot",$=>{let S=$;if(S&&typeof S.revision=="number")try{G.set({revision:S.revision,order:S.order&&typeof S.order=="object"?S.order:{}})}catch{}}),Ae.on("display-policy-snapshot",$=>{let S=$;if(S&&S.policy&&typeof S.policy=="object")try{re.set(S.policy)}catch{}}),Ae.on("session-log-snapshot",$=>{let S=$;if(S&&typeof S.id=="string")try{ue.set(S.id,Array.isArray(S.lines)?S.lines:[],typeof S.last_event_at=="number"?S.last_event_at:null)}catch{}}),Ae.on("session-log-append",$=>{let S=$;if(S&&typeof S.id=="string")try{ue.append(S.id,S.event)}catch{}}),Ae.on("snapshot",$=>{let S=$,Me=S&&typeof S.id=="string"?S.id:"",Oe=Me?Te.getStore(Me):null;if(Oe&&S&&S.type==="snapshot")try{Oe.applyPush(S)}catch{}}),Ae.on("upsert",$=>{let S=$,Me=S&&typeof S.id=="string"?S.id:"",Oe=Me?Te.getStore(Me):null;if(Oe&&S&&S.type==="upsert")try{Oe.applyPush(S)}catch{}}),Ae.on("delete",$=>{let S=$,Me=S&&typeof S.id=="string"?S.id:"",Oe=Me?Te.getStore(Me):null;if(Oe&&S&&S.type==="delete")try{Oe.applyPush(S)}catch{}});let ke=null,pe=null,qe=null,Be=null,Je=()=>{},We=new Promise($=>{Je=()=>$(void 0)}),Q=!1,B=!1;async function pt($){let S=Fe($);if(S===pe||S===qe)return;qe=S;let Me=`detail:${$}`,Oe={type:"issue-detail",params:{id:$}};try{Te.register(Me,Oe)}catch(Xe){t("register detail store failed: %o",Xe)}try{let Xe=await ve.subscribeList(Me,Oe);if(Ee.getState().selected_id!==$||Fe($)!==S){await Xe().catch(()=>{});return}ke&&await ke().catch(()=>{}),ke=Xe,pe=S}catch(Xe){t("detail subscribe failed: %o",Xe),ye(Xe,"issue details")}finally{qe===S&&(qe=null)}}let it=new Map,w=new Set,Z={board:0,worker:0},Ye=!1,je=qs;try{let $=window.localStorage.getItem(F_);ka($)&&(je=$)}catch{}let Et="today";try{let $=window.localStorage.getItem(aw);$!==null&&(Et=zn($))}catch{}async function jt($){if(!ka($)||$===je)return;je=$;try{window.localStorage.setItem(F_,$)}catch{}let S=it.get(xr);if(!S)return;it.delete(xr),await S().catch(()=>{});let Me=Pt();try{Te.register(xr,Me)}catch(Oe){t("register %s store failed: %o",xr,Oe)}try{let Oe=await ve.subscribeList(xr,Me);it.set(xr,Oe)}catch(Oe){t("re-subscribe %s failed: %o",xr,Oe),ye(Oe,"board")}}async function It($){let S=zn($);if(S===Et)return;Et=S;let Me=ae.get($r);if(!Me)return;ae.delete($r),await Me().catch(()=>{});let Oe=rt();try{Te.register($r,Oe)}catch(Xe){t("register %s store failed: %o",$r,Xe)}try{let Xe=await ve.subscribeList($r,Oe);ae.set($r,Xe)}catch(Xe){t("re-subscribe %s failed: %o",$r,Xe),ye(Xe,"worker")}}let ae=new Map,we=null,bt=null,N=null,_e=null,wt=null;async function Kt(){_e=null,re.clear(),wt=null,ne.clear(),we=null,bt=null,it.clear(),ae.clear(),Z.board+=1,Z.worker+=1,$t();let $=Ee.getState().workspace.current?.path;if($)try{await Ae.send("set-workspace",{path:$})}catch(Me){t("workspace restore after reconnect failed: %o",Me);return}gt();let S=Ee.getState();Tt(S.view==="board"),Ge(S.view==="worker"),me(tt(S)),et(S.view==="board"||S.view==="worker"||!!S.selected_id)}async function Wt(){t("clearing all subscriptions for workspace switch"),Ut(),ot(),mt(),ut.clear(),Se(),ie(),kt(),gt(),_t();let $=Ee.getState();if($.selected_id)try{Te.unregister(`detail:${$.selected_id}`)}catch{}let S=Ee.getState();Tt(S.view==="board"),Ge(S.view==="worker"),me(tt(S)),et(S.view==="board"||S.view==="worker"||!!S.selected_id),S.selected_id&&He(S.selected_id)}async function zt($){t("requesting workspace switch to %s",$),B=!0;try{let S=await Ae.send("set-workspace",{path:$});t("workspace switch result: %o",S),S&&S.workspace&&(Ee.setState({workspace:{current:{path:S.workspace.root_dir,database:S.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",$),S.changed&&(await Wt(),ge("Switched to "+Zt($),"success",2e3)))}catch(S){throw t("workspace switch failed: %o",S),ge("Failed to switch workspace","error",3e3),S}finally{B=!1}}async function St($){t("requesting workspace git pull for %s",$);try{let S=await Ae.send("git-pull-workspace",{});t("workspace git pull result: %o",S);let Me=S?.status;if(Me==="up_to_date"){ge("Already up to date","success",2e3);return}if(Me==="stash_pop_conflict"){ge("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ge("Git pulled "+Zt($),"success",2e3)}catch(S){t("workspace git pull failed: %o",S);let Me=S?.code,Oe=S?.message;if(Me==="rebase_conflict"){ge("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Me==="rebase_conflict_abort_failed"){ge("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Me==="busy"){ge("Git pull skipped: another operation is running","warning",3e3);return}let Xe=Oe?`: ${Oe}`:"";throw ge(`Git pull failed${Xe}`,"error",3e3),S}}async function nn($,S){t("setting workspace visibility %s \u2192 %s",$,String(S));try{await Ae.send("set-workspace-visibility",{path:$,visible:S}),await qt()}catch(Me){t("workspace visibility update failed: %o",Me),ge("Failed to update project visibility","error",3e3)}}async function qt(){try{let $=await Ae.send("list-workspaces",{});if(t("workspaces loaded: %o",$),$&&Array.isArray($.workspaces)){let S=$.workspaces.map(xt=>({path:xt.path,database:xt.database,pid:xt.pid,version:xt.version})),Me=$.current?{path:$.current.root_dir,database:$.current.db_path}:null,Oe=Array.isArray($.hidden)?$.hidden.filter(xt=>typeof xt=="string"):[];Ee.setState({workspace:{current:Me,available:S,hidden:Oe}});let Xe=window.localStorage.getItem("beads-ui.workspace");Xe&&(!S.some(Nt=>Nt.path===Xe)||Oe.includes(Xe)?window.localStorage.removeItem("beads-ui.workspace"):Me&&Xe!==Me.path&&(t("restoring saved workspace preference: %s",Xe),await zt(Xe)))}}catch($){t("failed to load workspaces: %o",$)}}Ae.on("workspace-changed",$=>{t("workspace-changed event: %o",$),$&&$.root_dir&&(Ee.setState({workspace:{current:{path:$.root_dir,database:$.db_path}}}),qt(),Wt())});let Rt=!1;if(typeof Ae.onConnection=="function"){let $=S=>{t("ws state %s",S),S==="reconnecting"||S==="closed"?(Rt=!0,ge("Connection lost. Reconnecting\u2026","error",4e3)):S==="open"&&Rt&&(Rt=!1,ge("Reconnected","success",2200),iw(Ee,(Me,Oe)=>{t(`${Me}: %o`,Oe)}),Kt())};Ae.onConnection($)}let Jt="board";try{let $=window.localStorage.getItem("beads-ui.view");($==="board"||$==="worker"||$==="monitor")&&(Jt=$)}catch($){t("view parse error: %o",$)}let Ee=Hc({config:sw(),view:Jt});Ae.on("worker-queue-snapshot",$=>{let S=$;if(!S||!S.queue)return;let Me=Ee.getState().workspace.current?.path;if(typeof Me=="string"&&Me.length>0&&S.root_dir!==Me){t("dropping worker-queue snapshot for %s",String(S.root_dir));return}try{ut.set(S.queue)}catch{}});let T=Wc(Ee);T.start();let de=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),De=async($,S)=>{try{return await Pe($,S)}catch(Me){if(de.has($))throw Me;return[]}};Pf({global_element:r,repo_element:o},Ee,T);let yt=document.getElementById("workspace-picker");yt&&O_(yt,Ee,zt,St,nn);let Qe=jf(e,($,S)=>Pe($,S));try{let $=document.getElementById("new-issue-btn");$&&$.addEventListener("click",()=>Qe.open())}catch{}let y=Wf(e,{policyStore:re,queueStore:ut,implPresetStore:ne,transport:($,S)=>Pe($,S),onOpenChange:$=>{let S=Ye;Ye=$,Ke(),S&&$===!1&&H.refreshSessionDefaults()},labelOptions:()=>{let $=new Set;for(let[S]of rc)for(let Me of Te.snapshotFor(S)||[]){let Oe=Me.labels;if(Array.isArray(Oe))for(let Xe of Oe)typeof Xe=="string"&&Xe.length>0&&$.add(Xe)}return Array.from($).sort()}});try{let $=document.getElementById("display-settings-btn");$&&($.setAttribute("aria-label","\uC124\uC815"),$.setAttribute("title","\uC124\uC815"),$.addEventListener("click",()=>y.open()))}catch{}let p=document.createElement("div");p.className="md-viewer-root",document.body.appendChild(p);let _=Ji(p,{getWorkspacePath:()=>Ee.getState().workspace.current?.path}),z=lu(l,{gotoIssue:$=>T.gotoIssue($),issueStores:Te,transport:De,workerQueueStore:ut,uiOrderStore:G,displayPolicyStore:re,closedRange:je,onClosedRangeChange:$=>{jt($)},onNewIssue:()=>Qe.open(),openDoc:x}),H=ec(a,{transport:De,issueStores:Te,queueStore:ut,sessionLogStore:ue,gotoIssue:$=>Ee.setState({selected_id:$}),getWorkspacePath:()=>Ee.getState().workspace.current?.path,switchWorkspace:$=>zt($),openDoc:x,doneRange:Et,onDoneRangeChange:$=>{It($)}}),le=Df(u,{transport:De,pipelineStore:dt,execPresetStore:ne,sessionLogStore:ue,router:T,gotoIssue:$=>T.gotoIssue($),getWorkspacePath:()=>Ee.getState().workspace.current?.path,switchWorkspace:$=>zt($),openDoc:x}),Ie=tf(d,{issueStores:Te,transport:De,queueStore:ut,execPresetStore:ne,sessionLogStore:ue,getWorkspacePath:()=>Ee.getState().workspace.current?.path,mdViewer:_,depCandidates:()=>{let $=dt.get();if($===null)return null;let S=dt.getWorkspacesState(),Me=Ee.getState();if(Me.view==="monitor")return pl($,S);let Oe=Me.workspace.current?.path;return Oe?pl($,S,{root_dir:Oe}):null},subscribeCandidates:$=>dt.subscribe($),onDepChanged:({type:$,a:S,b:Me})=>{let Oe=le;$==="dep-add"&&Oe&&typeof Oe.recorrectSharedLane=="function"&&Oe.recorrectSharedLane($,S,Me)},onNavigate:($,S)=>{let Me=()=>{Ee.getState().view==="worker"?Ee.setState({selected_id:$}):T.gotoIssue($)},Oe=Ee.getState().workspace.current?.path;if(typeof S!="string"||S.length===0||!Oe||S===Oe){Me();return}Promise.resolve(zt(S)).then(Me).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let $=Ee.getState();Ee.setState({selected_id:null});try{T.gotoView($.view==="worker"||$.view==="monitor"?$.view:"board")}catch{}},onOpenExecPresets:()=>{y.open("execution")}}),nt=Ee.getState().selected_id;nt&&(d.hidden=!1,Ie.load(nt),He(nt)),Ee.subscribe($=>{let S=$.selected_id;S?(d.hidden=!1,Ie.load(S),B||He(S)):(Ie.clear(),d.hidden=!0,_t())});let $e=$=>{l.hidden=$.view!=="board",a.hidden=$.view!=="worker",u.hidden=$.view!=="monitor",i&&i.classList.toggle("is-quiet",$.view==="monitor"),Tt($.view==="board"),Ge($.view==="worker"),me(tt($)),et($.view==="board"||$.view==="worker"||Ye||!!$.selected_id),!$.selected_id&&$.view==="board"&&z.load(),$.view==="worker"&&H.load(),$.view==="monitor"?le.load():le.pause(),window.localStorage.setItem("beads-ui.view",$.view)};Ee.subscribe($e),$e(Ee.getState()),ie(),gt(),$t(),qt().finally(()=>{Q=!0,Je()}),window.addEventListener("keydown",$=>{let S=$.ctrlKey||$.metaKey,Me=String($.key||"").toLowerCase(),Oe=$.target,Xe=Oe&&Oe.tagName?String(Oe.tagName).toLowerCase():"",xt=Xe==="input"||Xe==="textarea"||Xe==="select"||Oe&&typeof Oe.isContentEditable=="boolean"&&Oe.isContentEditable;S&&Me==="n"&&(xt||($.preventDefault(),Qe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&uw(t)});export{uw as bootstrap,sw as readBootstrapConfig,iw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
