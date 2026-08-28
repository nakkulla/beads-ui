var Sf=Object.create;var Ri=Object.defineProperty;var Ef=Object.getOwnPropertyDescriptor;var Tf=Object.getOwnPropertyNames;var Cf=Object.getPrototypeOf,Rf=Object.prototype.hasOwnProperty;var Of=(e,t,n)=>t in e?Ri(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Oi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Lf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Tf(t))!Rf.call(e,o)&&o!==n&&Ri(e,o,{get:()=>t[o],enumerable:!(r=Ef(t,o))||r.enumerable});return e};var If=(e,t,n)=>(n=e!=null?Sf(Cf(e)):{},Lf(t||!e||!e.__esModule?Ri(n,"default",{value:e,enumerable:!0}):n,e));var $t=(e,t,n)=>Of(e,typeof t!="symbol"?t+"":t,n);var Il=Oi((Tv,Ll)=>{var Tr=1e3,Cr=Tr*60,Rr=Cr*60,mr=Rr*24,Mf=mr*7,Nf=mr*365.25;Ll.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return qf(e);if(n==="number"&&isFinite(e))return t.long?jf(e):Ff(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function qf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Nf;case"weeks":case"week":case"w":return n*Mf;case"days":case"day":case"d":return n*mr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Rr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Cr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Tr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Ff(e){var t=Math.abs(e);return t>=mr?Math.round(e/mr)+"d":t>=Rr?Math.round(e/Rr)+"h":t>=Cr?Math.round(e/Cr)+"m":t>=Tr?Math.round(e/Tr)+"s":e+"ms"}function jf(e){var t=Math.abs(e);return t>=mr?ss(e,t,mr,"day"):t>=Rr?ss(e,t,Rr,"hour"):t>=Cr?ss(e,t,Cr,"minute"):t>=Tr?ss(e,t,Tr,"second"):e+" ms"}function ss(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Pl=Oi((Cv,Dl)=>{function Bf(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Il(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let h=0;h<d.length;h++)f=(f<<5)-f+d.charCodeAt(h),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,h=null,m,k;function L(...j){if(!L.enabled)return;let H=L,se=Number(new Date),Q=se-(f||se);H.diff=Q,H.prev=f,H.curr=se,f=se,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let F=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(M,U)=>{if(M==="%%")return"%";F++;let V=n.formatters[U];if(typeof V=="function"){let re=j[F];M=V.call(H,re),j.splice(F,1),F--}return M}),n.formatArgs.call(H,j),(H.log||n.log).apply(H,j)}return L.namespace=d,L.useColors=n.useColors(),L.color=n.selectColor(d),L.extend=r,L.destroy=n.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(m!==n.namespaces&&(m=n.namespaces,k=n.enabled(d)),k),set:j=>{h=j}}),typeof n.init=="function"&&n.init(L),L}function r(d,f){let h=n(this.namespace+(typeof f>"u"?":":f)+d);return h.log=this.log,h}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function s(d,f){let h=0,m=0,k=-1,L=0;for(;h<d.length;)if(m<f.length&&(f[m]===d[h]||f[m]==="*"))f[m]==="*"?(k=m,L=h,m++):(h++,m++);else if(k!==-1)m=k+1,L++,h=L;else return!1;for(;m<f.length&&f[m]==="*";)m++;return m===f.length}function i(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(s(d,f))return!1;for(let f of n.names)if(s(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Dl.exports=Bf});var Ml=Oi((ln,is)=>{ln.formatArgs=Wf;ln.save=zf;ln.load=Hf;ln.useColors=Uf;ln.storage=Gf();ln.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();ln.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Uf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Wf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+is.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}ln.log=console.debug||console.log||(()=>{});function zf(e){try{e?ln.storage.setItem("debug",e):ln.storage.removeItem("debug")}catch{}}function Hf(){let e;try{e=ln.storage.getItem("debug")||ln.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Gf(){try{return localStorage}catch{}}is.exports=Pl()(ln);var{formatters:Kf}=is.exports;Kf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var no=globalThis,Zo=no.trustedTypes,gl=Zo?Zo.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ii="$lit$",Pn=`lit$${Math.random().toFixed(9).slice(2)}$`,Di="?"+Pn,Df=`<${Di}>`,dr=document,ro=()=>dr.createComment(""),oo=e=>e===null||typeof e!="object"&&typeof e!="function",Pi=Array.isArray,kl=e=>Pi(e)||typeof e?.[Symbol.iterator]=="function",Li=`[ 	
\f\r]`,to=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,hl=/-->/g,bl=/>/g,cr=RegExp(`>|${Li}(?:([^\\s"'>=/]+)(${Li}*=${Li}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yl=/'/g,vl=/"/g,$l=/^(?:script|style|textarea|title)$/i,Mi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Mi(1),io=Mi(2),wv=Mi(3),mn=Symbol.for("lit-noChange"),Rt=Symbol.for("lit-nothing"),wl=new WeakMap,ur=dr.createTreeWalker(dr,129);function xl(e,t){if(!Pi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return gl!==void 0?gl.createHTML(t):t}var Al=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=to;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,h=0;for(;h<a.length&&(i.lastIndex=h,d=i.exec(a),d!==null);)h=i.lastIndex,i===to?d[1]==="!--"?i=hl:d[1]!==void 0?i=bl:d[2]!==void 0?($l.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=cr):d[3]!==void 0&&(i=cr):i===cr?d[0]===">"?(i=o??to,f=-1):d[1]===void 0?f=-2:(f=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?cr:d[3]==='"'?vl:yl):i===vl||i===yl?i=cr:i===hl||i===bl?i=to:(i=cr,o=void 0);let m=i===cr&&e[l+1].startsWith("/>")?" ":"";s+=i===to?a+Df:f>=0?(r.push(u),a.slice(0,f)+Ii+a.slice(f)+Pn+m):a+Pn+(f===-2?l:m)}return[xl(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},so=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=Al(t,n);if(this.el=e.createElement(u,r),ur.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=ur.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Ii)){let h=d[i++],m=o.getAttribute(f).split(Pn),k=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:k[2],strings:m,ctor:k[1]==="."?es:k[1]==="?"?ts:k[1]==="@"?ns:fr}),o.removeAttribute(f)}else f.startsWith(Pn)&&(a.push({type:6,index:s}),o.removeAttribute(f));if($l.test(o.tagName)){let f=o.textContent.split(Pn),h=f.length-1;if(h>0){o.textContent=Zo?Zo.emptyScript:"";for(let m=0;m<h;m++)o.append(f[m],ro()),ur.nextNode(),a.push({type:2,index:++s});o.append(f[h],ro())}}}else if(o.nodeType===8)if(o.data===Di)a.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(Pn,f+1))!==-1;)a.push({type:7,index:s}),f+=Pn.length-1}s++}}static createElement(t,n){let r=dr.createElement("template");return r.innerHTML=t,r}};function pr(e,t,n=e,r){if(t===mn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=oo(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=pr(e,o._$AS(e,t.values),o,r)),t}var Jo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??dr).importNode(n,!0);ur.currentNode=o;let s=ur.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Sr(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new rs(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=ur.nextNode(),i++)}return ur.currentNode=dr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Sr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Rt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=pr(this,t,n),oo(t)?t===Rt||t==null||t===""?(this._$AH!==Rt&&this._$AR(),this._$AH=Rt):t!==this._$AH&&t!==mn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):kl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Rt&&oo(this._$AH)?this._$AA.nextSibling.data=t:this.T(dr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=so.createElement(xl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new Jo(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=wl.get(t.strings);return n===void 0&&wl.set(t.strings,n=new so(t)),n}k(t){Pi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(ro()),this.O(ro()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},fr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Rt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Rt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=pr(this,t,n,0),i=!oo(t)||t!==this._$AH&&t!==mn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=pr(this,l[r+a],n,a),u===mn&&(u=this._$AH[a]),i||(i=!oo(u)||u!==this._$AH[a]),u===Rt?t=Rt:t!==Rt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Rt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},es=class extends fr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Rt?void 0:t}},ts=class extends fr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Rt)}},ns=class extends fr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=pr(this,t,n,0)??Rt)===mn)return;let r=this._$AH,o=t===Rt&&r!==Rt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Rt&&(r===Rt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){pr(this,t)}},Sl={M:Ii,P:Pn,A:Di,C:1,L:Al,R:Jo,D:kl,V:pr,I:Sr,H:fr,N:ts,U:ns,B:es,F:rs},Pf=no.litHtmlPolyfillSupport;Pf?.(so,Sr),(no.litHtmlVersions??(no.litHtmlVersions=[])).push("3.3.1");var rt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Sr(t.insertBefore(ro(),s),s,void 0,n??{})}return o._$AI(e),o};var os="today",El=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Er=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function En(e){return e==="today"?"today":"7d"}function Ni(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function _r(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Tl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Cl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Rl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ol(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Nl=If(Ml(),1);function Et(e){return(0,Nl.default)(`beads-ui:${e}`)}function Yf(e){let n=ql((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function ql(e){return typeof e=="string"?e.trim():""}function Vf(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var Xf=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Or(e){let t=Yf(e),n=ql(Vf(e).spec_review),r=Xf.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function bn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ao(e,t){let n=bn(e.created_at),r=bn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function zl(e,t){let n=bn(e.created_at),r=bn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Hl(e,t){let n=bn(e.updated_at),r=bn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Gl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=bn(e.created_at),s=bn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Kl(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var as=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function Qf(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(as,e)}function Fi(e){if(!e||typeof e!="object")return!1;let t=e;return Qf(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Fl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function jl(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Or(e).evidence==="published"?1:0;case"created":return Fl(e.created_at);case"updated":return Fl(e.updated_at);default:return null}}function Bl(e,t,n){let r=jl(e,n.key),o=jl(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Yl(e){let t=Array.isArray(e)?e.filter(Fi):[];return(n,r)=>{for(let l of t){let a=Bl(n,r,l);if(a!==0)return a}let o=Bl(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var Zf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ul(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Wl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Zf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Vl(e,t){let n=Ul(e),r=Ul(t);if(n!==r)return n<r?-1:1;let o=Wl(e),s=Wl(t);if(o!==s)return o<s?-1:1;let i=bn(e&&e.created_at),l=bn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var qi=2**20;function Lr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-bn(e&&e.created_at)}function Xl(e){return(t,n)=>{let r=Lr(t,e),o=Lr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function ji(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Lr(l,n)-qi};if(!l)return{rank:Lr(i,n)+qi};let a=Lr(i,n),u=Lr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,h)=>({bead_id:f.id,rank:h*qi}))}}function Bi(e,t={}){let n=Et(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||ao;function u(){for(let h of Array.from(i))try{h()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(h){if(l||!h||h.id!==e)return;let m=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,m),!(m<=s&&h.type!=="snapshot")){if(h.type==="snapshot"){if(m<=s)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let L of k)L&&typeof L.id=="string"&&L.id.length>0&&r.set(L.id,L);d(),s=m,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let L=r.get(k.id);if(!L)r.set(k.id,k);else{let j=Number.isFinite(L.updated_at)?L.updated_at:0,H=Number.isFinite(k.updated_at)?k.updated_at:0;if(j<=H){for(let se of Object.keys(L))se in k||delete L[se];for(let[se,Q]of Object.entries(k))L[se]=Q}}d()}s=m,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),s=m,u()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(h){return r.get(h)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function ls(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Ql(e){let t=Et("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let k=n.get(m);if(!k)continue;let L=k.itemsById;for(let j of d)typeof j=="string"&&j.length>0&&L.set(j,!0);for(let j of f)typeof j=="string"&&j.length>0&&L.set(j,!0);for(let j of h)typeof j=="string"&&j.length>0&&L.delete(j)}}async function s(l,a){let u=ls(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let h=r.get(f.key);h&&(h.delete(l),h.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let h=n.get(l)||null;if(h){let m=r.get(h.key);m&&(m.delete(l),m.size===0&&r.delete(h.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let h=r.get(f.key);h&&(h.delete(l),h.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:ls,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Zl(){let e=Et("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let f=u?ls(u):"",h=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,h),m&&h&&f&&h!==f){let k=t.get(a);if(k)try{k.dispose()}catch{}let L=o.get(a);if(L){try{L()}catch{}o.delete(a)}let j=Bi(a,d);t.set(a,j);let H=j.subscribe(()=>s());o.set(a,H)}else if(!m){let k=Bi(a,d);t.set(a,k);let L=k.subscribe(()=>s());o.set(a,L)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Jl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ec(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ui(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Jf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function e_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function tc(e){let t=Et("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):Jf(r),i=e_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=Ui(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?Ui(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var t_=Object.freeze({workspace_config:{default_workspace:null}});function nc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:t_.workspace_config.default_workspace}}}function rc(e={}){let t=Et("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:nc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?nc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function oc(e){let t=Et("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(f,h)=>{let m=o++,k=Date.now();r.set(m,{type:f,start_ts:k}),t("request start id=%d type=%s count=%d",m,f,n+1),i();let L=!1,j=()=>{L||(L=!0,r.delete(m),l())},H=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,f,Date.now()-k),j())},3e4);try{let se=await u(f,h),Q=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",m,f,Q),se}catch(se){let Q=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,f,Q,se),se}finally{clearTimeout(H),j()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function be(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Ir(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(Kl),a;switch(l){case"created_desc":return a.sort(ao),a;case"created_asc":return a.sort(zl),a;case"updated_desc":return a.sort(Hl),a;case"priority":return a.sort(Gl),a;case"manual":default:{let u=n();return u?a.sort(Xl(u)):a.sort(ao),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function Xn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Wt(e){let t=Xn(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function Jt(e,t){let n=Xn(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function sc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=Xn(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function cs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function us(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=cs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ds(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=sc(n);return{total:n.length,count:r,current:o,children:n}}function ic(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ji(l,a,u.order),i);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(h);let m=r(ji(l,a,h.order),i);o(h,m);let k=await t("ui-order-set",{expected_revision:h.revision,entries:m});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:s}}function ac(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Qn(e,t){let n=ac(e),r=ac(t);return n.length===0||r.length===0?!1:n!==r}function ps(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Wi(e,t){return!t||typeof e!="string"||e.length===0||ps(t.visible_labels).includes(e)?!0:ps(t.hidden_labels).includes(e)?!1:!ps(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function lc(e,t){return ps(e).filter(n=>Wi(n,t))}function Zn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function n_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function r_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function o_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${n_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function fs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Vl):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?r_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>o_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var s_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},uc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},cc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},i_={review:"\u2713",skip:"\u2298"},Jn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function a_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function dc(e){let t=e&&e.fill||"none";return t==="none"?Jn.none:e&&e.stale===!0?Jn.stale:t==="dim"?Jn.dim:e&&e.glyph==="review"?Jn.review:e&&e.glyph==="skip"?Jn.skip:Jn.done}function l_(e){if(!e||e.fill==="none"||!e.approval_state)return dc(e);let t=[];return e.glyph==="review"?t.push(Jn.review):e.glyph==="skip"&&t.push(Jn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function c_(e,t,n,r){let o=s_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=i_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=uc[e]||e,h=r?pc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let m=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,h,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function pc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function _s(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=cc[e.route]||cc.spec_backed,s=e.stages,i=a_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${uc[u]||u} ${u==="plan"?l_(s[u]||{}):dc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>pc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>c_(u,s[u]||{},u===i,r))}
    </div>
  `}function u_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var fc=2;function _c(e){let t=e.slice(0,fc).join(", "),n=e.length-fc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function d_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Qn(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${_c(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${_c(s)}</span
      >`),n}function p_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function zi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ms(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Mn(e){return`${e.kind}:${ms(e)}@${e.sha}`}function gs(e,t){if(!e)return null;let n=zi(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=zi(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Mn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function mc(e,t){let n=gs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function f_(e){if(!e)return null;let t=zi(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Mn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function __(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&Zn(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&Zn(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Zn(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=mc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Mn(l)}`}
        >${`exec ${l.kind==="delegated"?ms(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of lc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&Zn(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Zn(n,"blocked")){let l=p_(e.metadata);l&&o.push(l),o.push(...d_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Zn(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function m_(e){let t=Jt(e.created_at),n=Jt(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function g_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return fs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:m_(e),empty_label:"children \uC5C6\uC74C",childChips:Hi,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Hi(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return gs(t,n)?c`<span class="board-card__roll-child-chips">
    ${mc(t,n)}
    ${f_(n)}
  </span>`:null}function hs(e,t){let n=u_(e.priority);return c`
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
      ${__(e,t)}
      ${e.workflow&&Zn(t.policy||null,"stepper")?_s(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${g_(e,t)}
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
              ${El.map(s=>c`<option
                    value=${s.value}
                    ?selected=${s.value===e.closed_range}
                  >
                    ${s.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(s=>hs(s,t))}
      </div>
    </section>
  `}function gc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>hs(r,t))}
        </div>
      </div>
    </dialog>
  `}var h_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],b_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],y_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function v_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(s=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(s)}
                        @change=${()=>t.onLabelToggle(s)}
                      />
                      <span>${s}</span>
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
  `}function hc(e,t,n){return c`
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
        ${h_.map(r=>c`<option
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
        ${b_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${v_(e,t,n)}
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
        ${y_.map(r=>c`<option
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
  `}var w_=200,k_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},$_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),bc="beads-ui.board.sort",yc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function x_(){try{let e=window.localStorage.getItem(bc);if(e&&yc.has(e))return e}catch{}return"created_desc"}function vc(e,t){let n=Et("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,h=t.closedRange||os,m=o?Ir(o,i):null,k=ic({transport:s,uiOrderStore:i}),L=[],j=[],H=[],se=[],Q=[],F=[],D=!1,M=0,U=x_(),V=new Map,re=new Map,N=new Map,G=new Set,W={search:"",priority:"",type:"",labels:[]},X=!1,Ee=null;function ye(R){return String(R.status||"open")==="open"}function ce(R){return String(R.status||"open")==="open"}function q(R){let K=W.search.trim().toLowerCase(),Ie=W.priority,We=W.type,De=W.labels;return R.filter(Je=>{if(K){let Re=String(Je.id||"").toLowerCase(),ze=String(Je.title||"").toLowerCase();if(!Re.includes(K)&&!ze.includes(K))return!1}if(Ie!==""&&String(Je.priority)!==Ie||We!==""&&String(Je.issue_type||"")!==We)return!1;if(De.length>0){let Re=Array.isArray(Je.labels)?Je.labels:[];if(!De.some(ze=>Re.includes(ze)))return!1}return!0})}function we(){let R=new Set;for(let K of[L,j,H,se,Q,F])for(let Ie of K){let We=Array.isArray(Ie.labels)?Ie.labels:[];for(let De of We)typeof De=="string"&&De.length>0&&R.add(De)}return Array.from(R).sort()}function Ae(){return W.search.trim()!==""||W.priority!==""||W.type!==""||W.labels.length>0}function A(){try{if(m){let R=m.selectBoardColumn("tab:board:in-progress","in_progress",U),K=m.selectBoardColumn("tab:board:blocked","blocked",U).filter(ce),Ie=new Set(R.map(He=>He.id)),We=m.selectBoardColumn("tab:board:ready","ready",U).filter(He=>ye(He)&&!Ie.has(He.id)),De=m.selectBoardColumn("tab:board:resolved","resolved",U),Je=m.selectBoardColumn("tab:board:deferred","deferred",U),Re=m.selectBoardColumn("tab:board:closed","closed").slice(0,w_),ze=[...K,...We,...R,...De,...Re];oe(ze);let Ze=new Set;for(let He of ze)He&&He.id&&!cs(He)&&Ze.add(He.id);let ft=!Ae();L=ft?lo(K,Ze):K,j=ft?lo(We,Ze):We,H=ft?lo(R,Ze):R,se=ft?lo(De,Ze):De,Q=Je,M=Je.length,F=ft?lo(Re,Ze):Re,V=new Map;for(let He of L)V.set(He.id,"open");for(let He of j)V.set(He.id,"open");for(let He of H)V.set(He.id,"in_progress");for(let He of se)V.set(He.id,"resolved");for(let He of Q)V.set(He.id,"deferred");for(let He of F)V.set(He.id,"closed");re=new Map;for(let He of L)re.set(He.id,"blocked-col");for(let He of j)re.set(He.id,"ready-col");for(let He of H)re.set(He.id,"in-progress-col");for(let He of se)re.set(He.id,"resolved-col");for(let He of F)re.set(He.id,"closed-col")}Fe()}catch{L=[],j=[],H=[],se=[],Q=[],F=[],N=new Map,Fe()}}function oe(R){N=us(R)}function xe(R){return ds(N,R)}function de(R){return!G.has(R)}function Le(R,K){R.preventDefault(),R.stopPropagation(),G.has(K)?G.delete(K):G.add(K),Fe()}function _e(R,K){R.preventDefault(),R.stopPropagation(),r(K)}function Ne(R,K){R.preventDefault(),R.stopPropagation(),r(K)}function it(R,K){Ee||r(K)}function ot(R,K){R.preventDefault(),R.stopPropagation(),A_(K).then(Ie=>{Ie&&be("\uBCF5\uC0AC\uB428","success",1200)})}function I(R,K){Ee=K,R.dataTransfer&&(R.dataTransfer.setData("text/plain",K),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function ae(R){R.target.classList.remove("board-card--dragging"),St(),setTimeout(()=>{Ee=null},0)}function le(R){let K=String(R.target.value||"");!K||K===h||(h=K,u&&u(K),Fe())}function ie(){return l?l.get():null}function ke(R){let K=a?a.get():null,Ie=K?K.cleanup_failed:null;if(!Ie||typeof Ie!="object"||Array.isArray(Ie))return null;let We=Ie[R];return!We||typeof We!="object"||Array.isArray(We)?null:We}let pe={onCardClick:it,onCopyId:ot,onDragStart:I,onDragEnd:ae,onClosedRangeChange:le,rollupFor:xe,isExpanded:de,onRollupToggle:Le,onChildClick:_e,onFromChipClick:Ne,onOpenDoc:f?(R,K)=>f(K):void 0,cleanupFailureFor:ke,get policy(){return ie()}};function qe(R,K){Ee||(v(),r(K))}function Ge(R,K){R.preventDefault(),R.stopPropagation(),v(),r(K)}let Xe={...pe,onCardClick:qe,onChildClick:Ge,onFromChipClick:Ge,onOpenDoc:f?(R,K)=>{v(),f(K)}:void 0,get policy(){return ie()}};function Pe(R){let K=R.target,Ie=e.querySelector(".board-filter__labels");K&&Ie&&Ie.contains(K)||Me()}function Y(R){R.key==="Escape"&&Me()}function B(){X||(X=!0,document.addEventListener("mousedown",Pe),document.addEventListener("keydown",Y),Fe())}function Me(){X&&(X=!1,document.removeEventListener("mousedown",Pe),document.removeEventListener("keydown",Y),Fe())}function at(R){R.key==="Escape"&&v()}function Qe(){D||(D=!0,document.addEventListener("keydown",at),Fe())}function v(){D&&(D=!1,document.removeEventListener("keydown",at),Fe())}let z={onClose:v,onOverlayClick(R){R.target===R.currentTarget&&v()}},Te={onSearchInput(R){W.search=String(R.target.value||""),A()},onPriorityChange(R){W.priority=String(R.target.value||""),A()},onTypeChange(R){W.type=String(R.target.value||""),A()},onSortChange(R){let K=String(R.target.value||"");if(!(!yc.has(K)||K===U)){U=K;try{window.localStorage.setItem(bc,K)}catch{}A()}},onDeferredToggle(){D?v():Qe()},onLabelMenuToggle(){X?Me():B()},onLabelToggle(R){let K=W.labels.indexOf(R);K===-1?W.labels.push(R):W.labels.splice(K,1),A()},onLabelClear(){W.labels.length!==0&&(W.labels=[],A())},onNewIssue(){d&&d()}};function Ce(){return c`
      <div class="board-view">
        ${hc(W,Te,{sort_mode:U,deferred_popup_open:D,deferred_count:M,label_options:we(),label_menu_open:X})}
        <div class="board-root">
          ${Dr({title:"Blocked",id:"blocked-col",items:q(L)},pe)}
          ${Dr({title:"Ready",id:"ready-col",items:q(j)},pe)}
          ${Dr({title:"In progress",id:"in-progress-col",items:q(H)},pe)}
          ${Dr({title:"Resolved",id:"resolved-col",items:q(se)},pe)}
          ${Dr({title:"Closed",id:"closed-col",items:q(F),is_closed:!0,closed_range:h},pe)}
        </div>
        ${D?gc({items:q(Q),count:M},Xe,z):""}
      </div>
    `}function Fe(){rt(Ce(),e),Ue()}function Ue(){try{let R=e.querySelector("#deferred-popup");R&&!R.open&&(typeof R.showModal=="function"?R.showModal():R.setAttribute("open",""));let K=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ie of K)Array.from(Ie.querySelectorAll(".board-card")).forEach((De,Je)=>{De.tabIndex=Je===0?0:-1})}catch{}}async function dt(R,K){if(!s){be("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:R,status:K}),be("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ie){n("update-status failed: %o",Ie),be("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function yt(R){switch(R){case"blocked-col":return L;case"ready-col":return j;case"in-progress-col":return H;case"resolved-col":return se;default:return[]}}function Lt(R,K,Ie){if(!s||!i)return;let We=yt(R),De=We.find(ft=>ft.id===K);if(!De)return;let Je=We.filter(ft=>ft.id!==K),Re=Ie.closest?Ie.closest(".board-card"):null,ze=Je.length;if(Re){let ft=Re.getAttribute("data-issue-id");if(ft===K)return;let He=Je.findIndex(kt=>kt.id===ft);He>=0&&(ze=He)}let Ze=Je.slice();Ze.splice(ze,0,De),k.applyReorder(K,Ze,ze)}function St(){for(let R of Array.from(e.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let gt=null;e.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let Ie=R.target.closest(".board-column");Ie&&Ie!==gt&&(gt&&gt.classList.remove("board-column--drag-over"),Ie.classList.add("board-column--drag-over"),gt=Ie)}),e.addEventListener("dragleave",R=>{let K=R.relatedTarget;(!K||!e.contains(K))&&gt&&(gt.classList.remove("board-column--drag-over"),gt=null)}),e.addEventListener("drop",R=>{R.preventDefault(),gt&&(gt.classList.remove("board-column--drag-over"),gt=null);let K=R.target,Ie=K.closest(".board-column");if(!Ie)return;let We=R.dataTransfer?.getData("text/plain")||"";if(!We)return;let De=Ie.id,Je=re.get(We);if(Je&&Je===De){if($_.has(De)){if(U!=="manual"){be("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Lt(De,We,K)}return}let Re=k_[De];if(!Re){be("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(We)!==Re&&dt(We,Re)}),e.addEventListener("keydown",R=>{let K=R.target;if(!(K instanceof HTMLElement))return;let Ie=String(K.tagName||"").toLowerCase();if(Ie==="input"||Ie==="textarea"||Ie==="select"||Ie==="button"||Ie==="a"||K.isContentEditable===!0)return;let We=K.closest(".board-card");if(!We)return;let De=String(R.key||"");if(De==="Enter"||De===" "){R.preventDefault();let Ze=We.getAttribute("data-issue-id");Ze&&r(Ze);return}if(De!=="ArrowUp"&&De!=="ArrowDown"&&De!=="ArrowLeft"&&De!=="ArrowRight")return;R.preventDefault();let Je=We.closest(".board-column");if(!Je)return;let Re=Array.from(Je.querySelectorAll(".board-card")),ze=Re.indexOf(We);if(De==="ArrowDown"&&ze<Re.length-1){Be(We,Re[ze+1]);return}if(De==="ArrowUp"&&ze>0){Be(We,Re[ze-1]);return}if(De==="ArrowLeft"||De==="ArrowRight"){let Ze=Array.from(e.querySelectorAll(".board-column")),ft=Ze.indexOf(Je),He=De==="ArrowRight"?1:-1,kt=ft+He;for(;kt>=0&&kt<Ze.length;){let Nt=Ze[kt].querySelector(".board-card");if(Nt){Be(We,Nt);return}kt+=He}}});function Be(R,K){try{R.tabIndex=-1,K.tabIndex=0,K.focus()}catch{}}let P=null;m&&m.subscribe&&(P=m.subscribe(()=>{try{A()}catch{}}));let ne=null;l&&l.subscribe&&(ne=l.subscribe(()=>{try{A()}catch{}}));let he=null;return a&&a.subscribe&&(he=a.subscribe(()=>{Fe()})),{async load(){n("load"),A()},clear(){Me(),v(),P&&(P(),P=null),ne&&(ne(),ne=null),he&&(he(),he=null),e.replaceChildren(),L=[],j=[],H=[],se=[],Q=[],F=[],V=new Map,re=new Map}}}function lo(e,t){return e.filter(n=>{let r=cs(n);return!(r&&t.has(r))})}async function A_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var Qt=e=>e??Rt;async function en(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function gr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function co(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function S_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${gr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${gr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Nn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await S_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var E_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],wc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},T_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function jt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ot(e){return typeof e=="string"&&e.length>0?e:null}function Pr(e){return e.startsWith("gpt-")?e.slice(4):e}function At(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function $c(e,t,n){let r=Ot(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ot(n[e]);return o===null?null:{value:o,source:"global"}}function uo(e,t,n,r){return $c(e,t,n)||{value:r,source:"base"}}function Gi(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&jt(o?.[t])){let i=Ot(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&jt(o)){for(let i of Object.values(o))if(jt(i)){let l=Ot(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Ot(r?.runners?.[s]?.models?.[e]?.id)||e}function C_(e,t){return Ot(t?.review?.reviewers?.[e]?.model)||e}function Mr(e,t,n=!1){if(e==="default")return At(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Pr(e):e;return At(e,t,r,e,"explicit")}function xc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];jt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(jt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function R_(e,t){let n=[],r=e?.implementation?.model_catalog;jt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(jt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function O_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of R_(t,n)){let s=xc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Ki(e){return At(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function kc(e,t,n){let r=$c(e,t,n);return r?Mr(r.value,r.source):At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function un(e){let t=jt(e.pin)?e.pin:{},n=jt(e.global)?e.global:{},r=jt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&jt(r.session)?r.session:null,s=r?.supported===!0&&jt(r.orchestration)?r.orchestration:null,i=jt(e.runner_catalog)?e.runner_catalog:null,l=Ot(n.quick_fix_impl_model),a=O_(l,o,i),u={};if(o){let d=uo("workflow_mode",t,n,Ot(o.workflow_mode_default));u.workflow_mode=d.source==="base"?At(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Mr(d.value,d.source);for(let Q of["spec_review","plan_review","impl_review"]){let F=`${Q}_model`,D=Ot(Q==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),M=uo(F,t,n,D);if(M.value===null)u[F]=At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(M.value!=="self"&&M.value!=="skip"&&!jt(o.review?.reviewers?.[M.value]))u[F]=Ki(At(M.value,M.source,"",null,"explicit"));else{let U=C_(M.value,o);u[F]=At(M.value,M.source,Pr(U),U,M.source==="base"?"default":"explicit")}}for(let[Q,F]of Object.entries(wc)){let D=u[F].value;if(D==="self"||D==="skip"){u[Q]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let M=Ot(o.review?.reviewers?.[D||""]?.effort),U=uo(Q,t,n,M);u[Q]=U.value===null?At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):At(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit")}let f=jt(o.implementation?.default)?o.implementation.default:{},h=Ot(e.route),m=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=jt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},L=m&&jt(k[h])?k[h]:{};for(let Q of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let F=uo(Q,t,n,Q==="impl_dispatch"?Ot(L.dispatch)||Ot(f.dispatch):Ot(f[Q.replace("impl_","")]));u[Q]=F.value===null?At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):At(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}let j=Ot(t.impl_runtime),H=j==="inherit"?Ot(e.controller_runtime):j,se=h==="quick_fix"&&Ot(t.impl_dispatch)===null&&a.runtime!==null&&(j===null||H===a.runtime);if(se){let Q=a.runtime,F=l;u.impl_dispatch=At("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(u.impl_runtime=At(Q,"global",`${Q} (\uC720\uB3C4)`,Q,"explicit")),Ot(t.impl_model)===null&&(u.impl_model=At(F,"global",F,F,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let Q of["impl_runtime","impl_model","impl_effort","impl_speed"])u[Q]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!se&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let Q=u.impl_runtime.value==="inherit"?Ot(e.controller_runtime):u.impl_runtime.value,F=Q?xc(Q,o,i):[];if(u.impl_model.value!=="auto"&&F.length>0&&!F.includes(u.impl_model.value))u.impl_model=Ki(u.impl_model);else{let D=Gi(u.impl_model.value,Q,o,i);u.impl_model.display=Pr(D),u.impl_model.full_value=D}}if(u.impl_effort.value==="auto"){let Q=Ot(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),F=Q?Ot(o.implementation?.effort_by_transport?.[Q]?.auto):null;F&&!T_.has(F)?(u.impl_effort.display=`${F} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=F,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?At("default","base","default (\uC77C\uBC18)","default","default"):Mr("default",u.impl_speed.source))}}else for(let d of E_.filter(f=>!f.startsWith("orchestration_")))u[d]=kc(d,t,n);if(!o){for(let[d,f]of Object.entries(wc))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=kc(d,t,n);continue}let f=d.replace("orchestration_",""),h=Ot(s[f]),m=uo(d,t,n,h);if(d==="orchestration_effort"&&m.source==="base"){u[d]=At(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=m.source==="base"?Ot(s.model_id)||m.value:Gi(m.value,null,o,i);u[d]=At(m.value,m.source,Pr(k),k,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?At("default","base","default (\uC77C\uBC18)","default","default"):Mr("default",m.source);continue}u[d]=Mr(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=At(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Pr(d)})`,null,"default")}else if(a.runtime!==null){let d=Gi(l,a.runtime,o,i);u.quick_fix_impl_model=At(l,"global",Pr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=Ki(At(l,"global","",null,"explicit")):u.quick_fix_impl_model=Mr(l,"global");return u}function L_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function bs(e){let t=jt(e.pin)?e.pin:{},n=jt(e.global)?e.global:{},r=jt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let h={...r,...f};return un({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Ot(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:L_(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let h=o({...s,[e.key]:f})[e.key];return{value:f,label:h.display,full_value:h.full_value}})}}function Nr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=f=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(f))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),d())}),t.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function Yi(e){return`session:${e.provider}:${e.session_id}`}function po(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function I_(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function qr(e,t,n,r){return{attempt_id:Yi(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:po(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:I_(e,n)}}}var Vi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",D_="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Ac="\uBD84\uD574 \uC5C6\uB294 leg";function Pt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Cn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Fr=[...Cn,"reasoning_output_tokens"],P_={codex:["implementation","review-consult"],claude:["subagent"]};function Xi(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Cn.some(t=>Number.isFinite(e[t]))}function M_(e){return!e||typeof e!="object"?!1:Fr.some(t=>Number.isFinite(e[t]))}function Qi(e){let t=0;for(let n of Cn)t+=Pt(e?.[n]);return t}function N_(e){return!e||typeof e!="object"?!1:Cn.some(t=>Number.isFinite(e[t]))}function Sc(e){return!e||typeof e!="object"?!1:Fr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function q_(e){let t={};for(let n of Fr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Ec(e){let t={};for(let n of Fr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Tc(e,t){return Xi(t)?Pt(t.total_tokens):e==="codex"?Pt(t.input_tokens)+Pt(t.output_tokens):Qi(t)}function F_(e){return e==="claude"?"Claude":"Codex"}function j_(e){return`\u03C4 ${Rc(e)}`}function B_(e,t){let n=t.breakdown||{},r=Pt(t.total_only_subtotal);if(Xi(n)||r>0&&!M_(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,D_];return t.replayed&&u.push(Vi),u.join(`
`)}let o=[`\uC785\uB825 ${Pt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Pt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Pt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Pt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Pt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Pt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Pt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Ac} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Ac}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Vi),a.join(`
`)}function Yt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${F_(n)} ${j_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:B_(n,r)})}return t}function vs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Pt(l.total_only_subtotal)+Pt(i.total_only_subtotal));for(let a of Fr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Pt(l.breakdown[a])+Pt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Zi(e){return!e||typeof e!="object"?null:Fn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function U_(e){return e==="codex"?"codex":"claude"}function Tn(){return{subtotal:0,breakdown:q_(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ys(e,t,n){e.subtotal+=t.subtotal,Xi(t.usage)&&(e.total_only+=t.subtotal);for(let r of Fr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Pt(e.breakdown[r])+Pt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Cc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Rc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function jr(e){return N_(e)?`\u03C4 ${Rc(Qi(e))}`:null}function qn(e){let t=jr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function fo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Pt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Pt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Pt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Pt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Qi(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Vi),n.join(`
`)}function Fn(e,t){let n={claude:Tn(),codex:Tn()},r={orchestrator:{claude:Tn(),codex:Tn()},implementation:{claude:Tn(),codex:Tn()},"review-consult":{claude:Tn(),codex:Tn()},subagent:{claude:Tn(),codex:Tn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Sc(a)){let d=U_(l.runner),f=Ec(a),h={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:Tc(d,f)};f.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),ys(n[d],h,!0),ys(r.orchestrator[d],h,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let f=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!P_[f].includes(d.role)||!Sc(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||o.has(h))continue;o.add(h);let m=Ec(d.usage),k={provider:f,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Tc(f,m)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),m.replayed===!0&&(k.replayed=!0),ys(n[f],k,!1),ys(r[k.role][f],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Cc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Cc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var W_=".chip-popover, .judgement-chip";function Br(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(W_)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function Ur(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Oc={running:3,paused:2,failed:1};function jn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Lc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Ic(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),jn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!jn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),f=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!f&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=Oc[u.run_state],f=Oc[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var ws=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ea=[...ws.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Bn=["orchestration_model","orchestration_effort","orchestration_speed"],Wr=[...ws,...Bn],z_=ea.filter(e=>Wr.includes(e)),Dc=["delegated","main"],ks=["inherit","claude","codex"],_o=["default","fast"],mo=["standard","fast_track"],go=["codex","opus","fable","self","skip"],$s=["codex","fable","skip"],xs=["low","medium","high","xhigh"],pn="auto";function dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Pc(e){if(!dn(e)||!dn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))dn(r)&&dn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function zr(e,t){let n=Pc(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[pn,...r.flatMap(([,o])=>o)]}function Mc(e,t,n,r){if(!dn(e)||!dn(e.runners))return[pn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!dn(i)||!dn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==pn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[pn,...o]}function Hr(e,t,n){return Mc(e,t,n,(r,o)=>dn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ta(e,t,n){return Mc(e,t,n,(r,o)=>dn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:dn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ho(e,t){let n=Pc(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Nc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!zr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Hr(t,o,r.impl_model||pn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var H_={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ji=[...z_,...Bn],G_=[...Wr,...ea].filter((e,t,n)=>n.indexOf(e)===t&&!Ji.includes(e));function qc(e,t){let n=dn(e)?e:{},r=dn(t)?t:{},o=[];for(let i of Ji){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:H_[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...G_,...Object.keys(r)])!Ji.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function na(e,t,n,r,o,s){return bs({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function Fc(e,t){let n={};for(let r of ea){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function jc(e,t){let n={};for(let r of Bn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var ra=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Bn]}],er={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},As={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function oa(e,t,n,r,o,s=null){let i=un({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function Bc(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of oa(e,t,n,r,o,s))i[l.source]+=1;return i}function Uc(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Wc(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var ik=[...ws,...Bn];var zc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function bo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ss(e){if(!bo(e)||!bo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>bo(n)&&bo(n.models));return t.length>0?t:null}function yn(e,t){let n=Ss(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Hc(e,t){return bo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Gc(e,t){let n=Ss(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Hc(r,r.models[t]);return[]}function K_(e){let t=Ss(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of Hc(r,o))n.includes(s)||n.push(s);return n}function Y_(e,t){if(!t)return K_(e);let r=Ss(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of Gc(e,s))o.includes(i)||o.push(i);return o}function Kc(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=yn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Gc(t,r.impl_model):Y_(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var sa=new Set(["unavailable","not_applicable"]);function tr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Yc(e){return e.filter(t=>t!==null).join(" \xB7 ")}function nr(e,t){return t===null?null:`${er[e]}: ${t.display} (${As[t.source]})`}function ia(e){return e.filter(t=>t!==null).join(`
`)}function aa(e){if(typeof e!="object"||e===null)return null;let t=gr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ia(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(er.orchestration_model,e.model),n(er.orchestration_effort,e.effort),n(er.orchestration_speed,e.speed)])}}function Gr(e,t){let n=tr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=tr(e,"orchestration_effort"),o=tr(e,"orchestration_speed"),s=Yc([yn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ia(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",nr("orchestration_model",n),nr("orchestration_effort",r),nr("orchestration_speed",o)])}}function V_(e,t){return e===null||e.value===null||sa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function X_(e){return e===null||sa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Q_(e){return e===null?null:e.value==="auto"?"auto":sa.has(e.resolution)?null:e.display}function hr(e,t){if(typeof e!="object"||e===null)return null;let n=tr(e,"impl_dispatch"),r=tr(e,"impl_runtime"),o=tr(e,"impl_model"),s=tr(e,"impl_effort"),i=tr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Yc([V_(r,t??null),X_(o),Q_(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ia(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",nr("impl_dispatch",n),nr("impl_runtime",r),nr("impl_model",o),nr("impl_effort",s),nr("impl_speed",i)])}}var Z_=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var J_={contract_change:"\uACC4\uC57D \uBB38\uC11C\xB7checker\xB7\uC2A4\uD0AC \uC0AC\uBCF8\uC744 \uD568\uAED8 \uBC14\uAFD4\uC57C \uD55C\uB2E4",multi_repo:"\uB458 \uC774\uC0C1\uC758 \uC800\uC7A5\uC18C\uC5D0 \uC791\uC5C5 \uB2E8\uC704\uAC00 \uC0DD\uAE34\uB2E4",open_design_fork:"\uC2E4\uD589 \uC911\uC5D0\uB3C4 \uC774\uC5B4\uC9C8 \uBBF8\uD574\uACB0 \uC124\uACC4 \uBD84\uAE30\uAC00 \uC788\uB2E4",multi_phase:"\uC5EC\uB7EC Phase \uB610\uB294 \uBCD1\uB82C \uC4F0\uAE30 \uC870\uC815\uC774 \uD544\uC694\uD558\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function la(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>J_[n]||"").filter(n=>n.length>0)}var Vc={orchestration_model:["fable"],impl_runtime:["claude"]},ca={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Xc(e){return typeof e=="object"&&e!==null?e:null}function Qc(e,t){return typeof e=="string"&&t.includes(e)?e:""}function em(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Z_.includes(t))}function yo(e,t=e){let n=Xc(e);if(!n)return null;let r=Qc(n.rec_orchestration_model,Vc.orchestration_model);if(r.length===0)return null;let o=Qc(n.rec_impl_runtime,Vc.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=Xc(t)||{},l=Object.keys(s),a=0,u=0;for(let f of l){let h=i[f];typeof h=="string"&&h.length>0&&(a+=1,h===s[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:em(n.rec_reason),rec:s,state:d}}function Es(e){if(!e||typeof e!="object")return"";let t=la(e),n=ca[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Ts(e){return e.replace(/\/+$/,"")}function tm(e,t){let n=Ts(e),r=Ts(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Cs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!tm(r,o))continue;let s=Ts(r),i=Ts(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function ua(e,t){return`${e}\0${t}`}function Zc(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function da(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function vo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Jc(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${vo(o)})`,location_label:vo(o),scope:null,same_lane_ahead:!1};let i=da(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function eu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ua(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ua(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let k of h){let L=r.get(k);L&&L!==u&&!m.includes(L)&&m.push(L)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);s(d,l)&&f&&u.push(f)}u.length>0&&i.set(l,u)}return i}function tu(e,t){return ua(e,t)}async function nm(e){let t=await en(e);be(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Rs(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{nm(e)}}
    >
      ⧉
    </button></span
  >`}function Is(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ru(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function br(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function ou(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function su(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null};let n=!1,r=null,o=-1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t||i.kind!=="review_session")continue;if(i.status==="pending"||i.status==="running"){n=!0;continue}if(i.status!=="failed")continue;let l=typeof i.finished_at=="number"?i.finished_at:0;l>=o&&(o=l,r=typeof i.cause=="string"&&i.cause.length>0?i.cause:null)}return n?{active:!0,failure:null}:{active:!1,failure:r}}function iu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Ds(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function rm(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Is(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function au(e,t){let n=rm(e,t);return n?c`<button
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
            title=${n.deploy.at?Wt(n.deploy.at):""}
            >${Ds(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${br(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Kr(e){let t=Jt(e.created_at),n=Jt(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function om(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function ko(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ps(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Un(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,h)=>(f.requested_at||0)-(h.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?om(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function lu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Ls(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?c`<code>백업: ${r}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${o.number||"?"}</a
        >`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var sm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function cu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:sm[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Ms(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Os(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function im(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Ns(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.released)?e.released:[],r=Array.isArray(e.dependents)?e.dependents:[],o=Array.isArray(e.overlaps)?e.overlaps:[],s=e.scope_missing===!0,i=e.armed_lane||null,l=!!i||t.length>0||r.length>0,a=n.length>0||o.length>0||s;return!l&&!a?"":c`${l?c`<div class="worker-deps worker-deps--primary">
        ${i?c`<span
              class=${`worker-dep worker-dep--armed${i.orphan?" worker-dep--armed-orphan":""}`}
              title=${i.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
              >${i.orphan?c`${i.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${i.lane_id}
                    >
                      해제
                    </button>`:i.label}</span
            >`:""}${t.map(u=>Os(u,"pred"))}${r.map(u=>Os(u,"dependents"))}
      </div>`:""}${a?c`<div class="worker-deps worker-deps--secondary">
        ${n.map(u=>Os(u,"released"))}${o.map(u=>Os(im(u),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function qs(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function Fs(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function am(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function uu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function js(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Es(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}function du(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Bs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function lm(e){let t=Array.isArray(e.badges)?e.badges:[],n=Yt(e.usage),r=qn(e.usage),o=Jt(e.done_at);return c`<div
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
      ${du(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(s=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${s}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>c`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?c`<span class="worker-usage" title=${fo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${ru(e.work_kind)}
            >작업 ${br(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function vn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return lm(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=Yt(e.usage),s=qn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?Jt(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,L=e.lane==="done"?"":Fs(e.workflow),j=e.lane==="done"?"":uu(e.from_id),H=Bs(e.priority),se=c`<span class="worker-mini__title">${e.title}</span>`,Q=du(e.pr_url,e.pr_number),F=r.map(_e=>_e===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${_e}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${_e===e.completion_badge&&e.completion_title||""}
          >${_e}</span
        >`),D=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",M=o.length>0?o.map(_e=>c`<span class="worker-usage" title=${_e.tooltip}
              >${_e.label}</span
            >`):s?c`<span class="worker-usage" title=${fo(e.usage)}
            >${s}</span
          >`:"",U=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",V=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",re=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",N=e.discard,G=N?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${N?.attempt_id||""}
          data-operation-id=${N?.operation?.operation_id||""}
          data-discard-mode=${N?.confirmation||"unmerged"}
          ?disabled=${N?!N.enabled:e.discard_enabled===!1}
          title=${N?N.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${N?.label||"\uD3D0\uAE30"}
        </button>`:"",W=e.stale_work||null,X=W?c`${W.can_resume||W.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            기존 작업 이어가기
          </button>`:""}${W.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            백업 후 새로 시작
          </button>`:""}${W.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            다시 확인
          </button>`:""}`:"",Ee=W?c`<div class="worker-mini__stale">
        <strong>${W.title}</strong>
        <span>${W.summary}</span>
        <span>${W.cause}</span>
        ${W.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ye=e.revise_action?c`<button
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
        </button>`:"",ce=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),q=js(e.rec,wo(e,"rec")),we=qs(e.cross_lane_chip),Ae=Rs(e.log_path),A=m||we||L||j||ce||q||M||Ae?c`<div class="worker-chips">
          ${m}${we}${L}${j}${ce?Ms(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${q}${M}${Ae}${fu(e)}
        </div>`:"",oe=Ns(e.dependency_chips),xe=Ls(e),de=t.actions?t.actions:"",Le=!!(i||e.merge_action||e.cancel_action||e.discard_action||N?.operation||e.revise_action||W);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${m}${k}${H}${j}${Q}${se}${de}
          </div>
          <div class="worker-mini__row2">
            ${M}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${ru(e.work_kind)}
                  >작업 ${br(e.work_ms)}</span
                >`:""}${F}${U}
            <span class="worker-mini__actions"
              >${V}${re}${G}</span
            >
            ${Kr(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${k}${H}${Q}${F}${h}${D}${de}
            </div>
            <div class="worker-mini__body">${se}${Ee}</div>
            ${oe}${A}${Le?c`<div class="worker-mini__foot">
                  ${U}
                  <span class="worker-mini__actions"
                    >${V}${re}${G}${ye}${X}</span
                  >
                  ${Ls(e)}
                </div>`:""}
            ${Kr(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${k}${H}${se}${Q}${F}${h}${D}${U}${V}${re}${G}${de}
            </div>
            ${oe}${A}${xe} ${Kr(e)}`}
  </div>`}function cm(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var pu={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function fa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=ca[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...la(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=pu[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var um=["rec","session_preferred","ineligible","qfr"];function Us(e,t){for(let n of um){if(!t(n))continue;let r=fa(e,n);return r?{chip_key:n,content:r}:null}return null}function fu(e){return e.chip_popover?Ur(e.chip_popover.content):""}function wo(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Ws="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function _a(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=pu[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],f=d.includes("missing_description"),h=d.some(F=>F.startsWith(Ws)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=Ns(e.dependency_chips),L=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",j=qs(e.cross_lane_chip),H=Fs(u),se=uu(e.from_id),Q=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Bs(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${wo(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${wo(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${js(e.rec,wo(e,"rec"))}${am(u,wo(e,"qfr"))}
      ${fu(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?_s(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${k}
    ${L||j||H||se||Q?c`<div class="worker-chips">
          ${L}${j}${H}${se}${Ms(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${cm(t.lanes,e.id)}
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
                  class="worker-card__reason${m?" worker-card__reason--danger":""}"
                  >${e.reason}</span
                >`:""}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). 막는 것은 예전 드래그와 같다 — spec
                 없는 후보만 막고, blocked-with-spec은 적재할 수 있다. 포인터
                 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":h?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":f?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${Kr(e)}
  </div>`}function Rn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${Qt(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?_a(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):vn(o))}
          </div>`}
  </section>`}function nu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function zs(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${nu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${Qt(r.drop)}
            data-root-dir=${Qt(r.root_dir)}
            data-lane-id=${Qt(r.lane_id)}
            data-lane-length=${Qt(r.lane_length)}
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
        ${nu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>dm(o))}
          </div>`}
    </section>
  </div>`}function dm(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Rn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${Qt(t.drop)}
        data-root-dir=${Qt(t.root_dir)}
        data-lane-id=${Qt(t.lane_id)}
        data-lane-length=${Qt(t.lane_length)}
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
  </div>`}function Hs(e){return e.count?c`<section
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
  </section>`:""}var _u=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],$o=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Gs(e,t){let n=_u.find(o=>o.step===e);if(!n)return null;let r=_u.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function mu(e){let t=$o.findIndex(n=>n.step===e);return $o.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function yr(e){let t=$o.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function pm(e){let t=$o.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:$o.length}}function Ks(e){let t=pm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ga=new Set(["queued","running","retry_pending"]),gu=new Set(["failed","succeeded"]),fm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},xo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},_m={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:xo.base_containment,child_sweep:xo.child_sweep,branch_cleanup:xo.branch_cleanup,parent_close:xo.parent_close};function mm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function gm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ga,...gu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function hm(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function ma(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=fm[o];if(!s)return null;let i=Gs(n,`${r} ${s}`);return i?{...i,active:ga.has(o),failed:o==="failed"}:null}function bm(e){return!e||typeof e!="object"?null:_m[e.step]||null}function Ao(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=bm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=mm(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&gm(k,t,l)).sort(hm):[],u=i?a:[],d=u.find(k=>ga.has(k.state));if(d)return ma(d);if(o)return o.step==="repo_operations"&&a[0]?ma(a[0],!0):null;let f=u.find(k=>gu.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return ma(f);if(r){let k=Gs(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?xo[e.cleanup_cursor]:null;if(!h)return null;let m=Gs(h.step,h.label);return m?{...m,active:!0,failed:!1}:null}function Ys(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var ym="\uBBF8\uC801\uC7AC";function ha(e,t){let n=Qn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var vm=10080*60*1e3;function hu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-vm)return null;let o=Qn(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Wt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function bu(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Qn(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function yu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=ha(s,{id:a,location_label:o.get(a)||ym}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var Xs=1,So=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],va=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Yr={show_blocked:!0,spec:"all"},vu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function wm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!jn(r)||(n=typeof r.status=="string"?r.status:null);return n}function km(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!jn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function $m(e,t,n={}){let{winners:r,resumed_from_ids:o}=Ic(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,h=u!=="running"&&f&&!o.has(a.attempt_id),m=f?o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00",k=lt(n.observations?.[i]),L=lt(k.pr),j=typeof a.merge_sha=="string"&&a.merge_sha.length>0||L.state==="MERGED",H=Un(n.discard_operations,i,{attempt_id:a.attempt_id,merged:j}),se=u==="failed"?ku(a,{resume_eligible:h,resume_reason:m,confirmation:H.confirmation}):null;s.set(i,{...wu(a,e,u),started_at:d,...se?{failure:se}:{},can_pause:u==="running"&&f,can_resume:h})}for(let[i,l]of Am(e,t)){if(s.has(i))continue;let a=l.attempt,u=Un(n.discard_operations,i,{attempt_id:a.attempt_id}),d=Su(a);s.set(i,{...wu(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:ku(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation})}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function wu(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Fn(t,e.bead_id)}}function ku(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Su(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:lu(e),confirmation:t.confirmation}}function Su(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var xm=new Set(["parked","retry_wait"]);function Am(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&jn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!jn(s)||!xm.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function $u(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function lt(e){return e&&typeof e=="object"?e:{}}function Sm(e,t,n){let r=lt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=h=>un({pin:h,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=xu(Gr(a,s),Gr(u,s)),f=xu(hr(a,null),hr(u,null));return d||f?{orchestration:d,worker:f}:null}function xu(e,t){return!e||t&&t.text===e.text?null:e}function Em(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=hu(e,i,n);l&&s.push(l)}return s.length===0?null:s}function wa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Tm=new Set(["quick_fix","spec_backed","full_plan"]);function Au(e){return typeof e=="string"&&Tm.has(e)}function Cm(e){let t={...lt(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Rm(e,t,n){let r=e.runner_catalog??null,o=ya(e,t,n,null);if(!o)return null;let s=yn(r,o.orchestration_model.value??""),i=s===null?o:ya(e,t,n,s)||o,l=Gr(i,r),a=hr(i,s);return l||a?{orchestration:l,worker:a}:null}function ya(e,t,n,r){let o=Au(n)?n:Au(t.route)?t.route:null;try{return un({pin:t,global:Cm(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Om(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:hr(ya(e,lt(t.metadata),t.route,n),n)}function ka(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function Lm(e){let t={};for(let l of Cn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Cn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?Yt(vs(i)):n?qn(t):null}function Eu(e,t){let n=da(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Im(e,t,n){let r=t.get(e);if(!r)return Eu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return vo(r)}function Dm(e,t,n,r){let o=t.get(e);if(!o)return{label:Eu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":vo(o),title:""}}function Pm(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Mm(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Nm(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let f=a.status==="confirmed"?"confirmed":"draft",h=Array.isArray(a.entries)?a.entries:[],m=[];h.forEach((H,se)=>{let Q=H&&typeof H.bead_id=="string"?H.bead_id:"";if(Q.length===0)return;let F=H&&typeof H.root_dir=="string"?H.root_dir:"",D=n.get(Q),M=D?D.state:void 0,U=M==="running"||M==="pr_wait"||M==="done",V=!D||M==="runnable",re=D&&D.lane==="parallel"&&typeof D.position=="number"?D.position-1:null,N=Dm(Q,n,r,t),G=m.length>0?m[m.length-1].id:null,W=f==="confirmed"&&G!==null&&!(t.get(Q)||[]).includes(G);m.push({id:Q,title:o.get(Q)||Q,root_dir:D?D.root_dir:F,workspace_name:D?D.workspace_name:s.get(F)||"",seq:se+1,location_label:N.label,location_title:N.title,draggable:!U,fixed:U,done:M==="done",unplaced:V,mismatch:W,...re!==null?{queue_index:re}:{}})}),m.forEach((H,se)=>{H.seq=se+1});let k=m.length>0&&m.every(H=>H.done),L=m.filter(H=>!H.fixed&&i.armed_by_bead.get(H.id)!==d).map(H=>H.id),j=Mm(d,f,m,k,L,i);l.push({lane_id:d,status:f,draft:f==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:k,can_confirm:f==="draft"&&m.length>=2,has_mismatch:f==="confirmed"&&m.some(H=>H.mismatch||H.unplaced),unlaunched:L,...j})}),l}function qm(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function Fm(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:h}=qm(a,t,n);h!==void 0&&(a.scope_state=h),s.set(u,{cards:[a],scope:f})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let h of a.cards)h.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=i.get(d);f?f.push(a):i.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],h={id:f.id,title:f.title,location_label:Im(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(h):m.overlap_chips=[h]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=Cs(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function jm(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Qn(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function ba(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Vs(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function rr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...Yr,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&So.some(v=>v.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),h=new Map;for(let v of o)v&&typeof v.root_dir=="string"&&h.set(v.root_dir,v);let m=new Map;for(let v of o)v&&typeof v.root_dir=="string"&&m.set(v.root_dir,v.name||v.root_dir);for(let v of r)v&&typeof v.root_dir=="string"&&m.set(v.root_dir,v.name||v.root_dir);let k=[],L=[],j=[],H=[],se=[],Q=[],F=new Map,D=new Map,M=new Map,U=new Map,V=new Map,re=new Map,N=new Map,G=new Map,W=new Map,X=new Map,Ee=new Map,ye=new Map,ce=new Map,q=new Set,we=new Map,Ae=new Map,A=new Map;for(let v of r){if(!v||typeof v.root_dir!="string")continue;let z=v.root_dir,Te=v.name||z,Ce=h.get(z),Fe=Ce&&typeof Ce.revision=="number"?Ce.revision:typeof v.revision=="number"?v.revision:0,Ue=lt(v.attempts),dt=lt(v.bead_titles);for(let[y,p]of Object.entries(dt))typeof p=="string"&&p.length>0&&A.set(y,p);let yt=lt(v.bead_times),Lt=lt(v.pr_observations),St=lt(v.admission),gt=lt(v.revise_parked),Be=lt(v.merge_queue_state),P=lt(v.cleanup_failed),ne=lt(v.discard_operations),he=lt(v.bead_blocked_by);Object.hasOwn(v,"bead_scope")&&we.set(z,lt(v.bead_scope));let R=lt(v.bead_workflow),K=lt(v.pr_activity),Ie=Array.isArray(v.repo_operations)?v.repo_operations:[];G.set(z,Ie);let We=typeof v.declared_base=="string"?v.declared_base:null;N.set(z,We),re.set(z,Object.entries(P).map(([y,p])=>({bead_id:y,step:p&&p.step?p.step:"",reason:p&&p.reason?p.reason:"",at:p&&typeof p.at=="number"?p.at:null,detail:p&&typeof p.detail=="string"?p.detail:null,output_tail:p&&typeof p.output_tail=="string"&&p.output_tail?p.output_tail:void 0,log_path:p&&typeof p.log_path=="string"&&p.log_path?p.log_path:void 0,retry_count:p&&typeof p.retry_count=="number"&&Number.isInteger(p.retry_count)&&p.retry_count>0?p.retry_count:0,failure_code:p&&typeof p.failure_code=="string"?p.failure_code:void 0})));for(let[y,p]of Object.entries(lt(v.bead_overlay)))p&&typeof p=="object"&&W.set(`${z}\0${y}`,p);let De=new Map;for(let y of Object.values(Ue))y&&typeof y.attempt_id=="string"&&De.set(y.attempt_id,y);let Je=Array.isArray(v.merge_queue)?v.merge_queue:[],Re=new Set(Je.filter(y=>y&&typeof y.bead_id=="string").map(y=>y.bead_id)),ze=new Map(Je.filter(y=>y&&typeof y.bead_id=="string").map(y=>[y.bead_id,y])),Ze=new Map,ft=new Map,He=new Map,kt=new Map;Je.forEach((y,p)=>{y&&typeof y.bead_id=="string"&&(Ze.set(y.bead_id,p+1),ft.set(y.bead_id,y.resolution),He.set(y.bead_id,y.continuation_action||null),kt.set(y.bead_id,y.authority||null))});let Nt=lt(v.auto_merge_skips),tt=y=>{let p=Nt[y];if(!p)return null;let _=lt(lt(Lt[y]).pr).head_sha;return _&&_===p.head_sha?p.reason||"":null};V.set(z,{positions:Ze,resolutions:ft,continuations:He,authorities:kt,state:{active:typeof Be.active=="string"?Be.active:null,failures:lt(Be.failures),waiting:Be.waiting&&typeof Be.waiting.bead_id=="string"&&typeof Be.waiting.reason=="string"?Be.waiting:null},auto_excluded:(Array.isArray(v.pr_wait)?v.pr_wait:[]).map(y=>y&&y.bead_id).filter(y=>typeof y=="string"&&tt(y)!==null),running:Je.length>0});let Tt=Array.isArray(v.queue)?v.queue:[];for(let y of[...Tt,...Array.isArray(v.pr_wait)?v.pr_wait:[]])y&&typeof y.bead_id=="string"&&typeof y.armed_by_lane=="string"&&y.armed_by_lane.length>0&&ye.set(y.bead_id,y.armed_by_lane);for(let y of Array.isArray(v.disarmed_on_load)?v.disarmed_on_load:[])typeof y=="string"&&y.length>0&&q.add(y);let xt=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).filter(y=>y&&/^s[1-5]$/.test(y.id)&&Array.isArray(y.entries)),Ct=lt(v.lane_states),qt=typeof v.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(v.serial_lane_count))):Math.min(5,xt.length);M.set(z,qt),U.set(z,Tt.length);let an=new Map(xt.map(y=>[y.id,y])),Bt=new Map;for(let y of xt)for(let p of y.entries)p&&typeof p.bead_id=="string"&&Bt.set(p.bead_id,y.id);for(let[y,p]of Object.entries(lt(v.bead_dependents))){let _=Array.isArray(p?.ids)?p.ids:[],S=lt(p?.root_dirs),O=Ee.get(y)||{ids:new Set,root_dirs:{}};for(let Z of _)typeof Z=="string"&&Z.length>0&&O.ids.add(Z);for(let[Z,ue]of Object.entries(S))typeof ue=="string"&&ue.length>0&&(O.root_dirs[Z]=ue);Ee.set(y,O)}for(let[y,p]of Object.entries(he))Array.isArray(p)&&X.set(y,p.filter(_=>typeof _=="string"&&_.length>0));let Ut=Array.isArray(v.done)?v.done:[];for(let y of Ut)y&&typeof y.bead_id=="string"&&Q.push({id:y.bead_id,root_dir:z,workspace_name:Te});let It=new Map;for(let y of Ut)y&&typeof y.bead_id=="string"&&typeof y.added_at=="number"&&It.set(y.bead_id,y.added_at);let Mt=y=>({id:y,title:dt[y]||y,root_dir:z,workspace_name:Te,expected_revision:Fe,draggable:!1,...lt(yt[y]).created_at?{created_at:lt(yt[y]).created_at}:{},...lt(yt[y]).updated_at?{updated_at:lt(yt[y]).updated_at}:{}}),Zt=y=>{let p=R[y]?.chips?.pr;return p&&typeof p.number=="number"&&typeof p.url=="string"?{pr_number:p.number,pr_url:p.url}:{}},zt=y=>Object.hasOwn(he,y)?{blocked_by:Array.isArray(he[y])?he[y].filter(p=>typeof p=="string"&&p.length>0):[]}:{},vt=new Set;for(let[y,p]of $m(Ue,It,{discard_operations:ne,observations:Lt})){vt.add(y);let _=p.run_state==="failed"?Pm(Ue,p.attempt_id):null;_!==null&&ce.set(y,_);let S=De.get(p.attempt_id)||null,O=W.get(`${z}\0${y}`),Z=O&&O.rollup?O.rollup:null,ue=wa(We,S?S.target_base:null),me=S?ka(S,De):!1,ge=S&&S.quickfix_lane===!0&&S.quickfix_landing&&typeof S.quickfix_landing=="object"?S.quickfix_landing:null,st=ge&&typeof ge.reason=="string"&&ge.reason.length>0?ge.reason:null,ut=ge?Ao({bead_id:y,merge_sha:ge.head_sha,cleanup_cursor:ge.cursor,cleanup_failed:st?{step:ge.cursor,reason:st}:null,repo_operations:Ie}):null;L.push({...Mt(y),lane:"running",...zt(y),...Bt.has(y)?{serial_lane_id:Bt.get(y)}:{},attempt_id:p.attempt_id,run_state:p.run_state,status:p.status||void 0,workflow:R[y]||null,can_pause:p.can_pause,can_resume:p.can_resume,started_at:p.started_at,last_event_at:p.last_event_at,last_activity:p.last_activity,legs:p.legs,runner:p.runner,model:p.model,effort:p.effort,speed:p.speed,resumed_from:p.resumed_from,continuation_mode:p.continuation_mode,usage:p.usage,failure:p.failure||null,retry:p.retry||null,exec_chips:{orchestration:aa(p),worker:Om(lt(Ce),O,p.runner||null)},discard:Un(ne,y,{attempt_id:p.attempt_id,merged:p.failure?.confirmation==="merged"||lt(Lt[y]).pr?.state==="MERGED"}),...Z?{rollup:Z}:{},...me?{conflict_resolution:!0}:{},...ue?{base_exception:ue}:{},...ut?{landing:ut}:{},badges:p.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:p.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:p.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:p.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:[],alert:p.run_state==="failed"})}for(let[y,p]of Lc(Ue)){if(L.some(S=>S.id===y))continue;let _=p.attempt;L.push({...Mt(y),lane:"running",kind:"session",...zt(y),attempt_id:typeof _.attempt_id=="string"?_.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:R[y]||null,can_pause:!1,can_resume:!1,started_at:p.started_at,last_event_at:typeof _.last_event_at=="number"?_.last_event_at:null,last_activity:_.last_activity&&typeof _.last_activity=="object"?_.last_activity:null,legs:Array.isArray(_.legs)?_.legs:[],runner:typeof _.runner=="string"?_.runner:null,model:typeof _.model=="string"?_.model:null,effort:typeof _.effort=="string"?_.effort:null,speed:typeof _.speed=="string"?_.speed:null,resumed_from:null,continuation_mode:null,usage:_.usage&&typeof _.usage=="object"?_.usage:null,exec_chips:{orchestration:aa(_),worker:null},discard:Un(ne,y,{merge_queued:!0}),badges:[p.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let y of Array.isArray(v.session_active)?v.session_active:[]){let p=y&&y.bead_id;typeof p!="string"||vt.has(p)||(vt.add(p),Array.isArray(y.blocked_by)&&y.blocked_by.length>0&&X.set(p,y.blocked_by.filter(_=>typeof _=="string"&&_.length>0)),typeof y.title=="string"&&y.title.length>0&&A.set(p,y.title),L.push({...Mt(p),title:y.title||dt[p]||p,lane:"running",kind:"session",status:"in_progress",started_at:ba(y.started_at)??ba(y.updated_at)??void 0,updated_at:ba(y.updated_at)??void 0,workflow:y.workflow||null,labels:Array.isArray(y.labels)?y.labels:[],spec_id:typeof y.spec_id=="string"?y.spec_id:"",blocked:y.blocked===!0,...Array.isArray(y.blocked_by)?{blocked_by:y.blocked_by.filter(_=>typeof _=="string"&&_.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(y.session_refs)?y.session_refs:[],badges:[],alert:!1}))}for(let y of Array.isArray(v.pr_wait)?v.pr_wait:[]){let p=y&&y.bead_id;if(typeof p!="string"||vt.has(p))continue;vt.add(p);let _=lt(Lt[p]),S=lt(_.pr),O=_.gate?lt(_.gate):null,Z=Re.has(p),ue=ze.get(p)?.continuation_action||null,me=!!ue&&ue.continuation===null,ge=Be.active===p,st=y.external===!0,ut=P[p]||null,Ht=lt(K[p]),wt=Ao({bead_id:p,merge_sha:y.merge_sha,cleanup_cursor:y.cleanup_cursor,merge_progress:Ht.merge_progress||null,cleanup_failed:ut,repo_operations:Ie}),x=Ys(wt),C=!!O&&O.base_badge==="\uCDA9\uB3CC",Se=!!ut&&["child_sweep","branch_cleanup","parent_close"].includes(ut.step)&&!!O&&O.tier==="merged",g=st&&!!ut&&!!O&&O.tier==="merged",b=!!O&&["closed_unmerged","review","undecidable"].includes(O.tier)&&O.reason!=="review_receipt_undetermined",E=Un(ne,p,{external:st,merge_active:ge||wt?.step==="merge",merge_queued:Z,cleanup_active:x,merged:!!ut||O?.tier==="merged"}),ee=!!E.operation;j.push({...Mt(p),lane:"pr_wait",...zt(p),workflow:R[p]||null,pr_number:typeof S.number=="number"?S.number:null,pr_url:typeof S.url=="string"?S.url:void 0,external:st,usage:Fn(Ue,p),merge_step:wt,badges:me?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:wt?[O?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:ut?[yr(ut.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${yr(ut.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof O?.gate_badge=="string"&&O.gate_badge.length>0?[O.gate_badge]:[],alert:wt?wt.failed===!0:!!ut||b,reason:ut&&wt?.active!==!0?Ks(ut.step):"PR \uB300\uAE30",merge_action:O?.tier==="merged"&&!Se&&!g?!1:!Z||me,merge_enabled:!ee&&(me||O?.enabled===!0||C||Se||g),merge_label:me?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":g||Se?"\uC815\uB9AC \uC7AC\uAC1C":C&&!Se?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:me?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ee?E.error?`\uD3D0\uAE30 \uC2E4\uD328: ${E.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${E.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:g?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Se?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":O?.enabled===!0?`\uBA38\uC9C0 (${O.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${O?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Z&&!me,cancel_enabled:!ge,continuation_mismatch:ue?.mismatch||null,discard:E,discard_action:E.action,discard_enabled:E.enabled,discard_title:E.title})}let Xt=(y,p,_,S)=>{let O=y&&y.bead_id;if(typeof O!="string"||vt.has(O))return null;vt.add(O);let Z=gt[O],ue=Un(ne,O),me=ue.operation?ue:null,ge={...Mt(O),lane:p,workflow:R[O]||null,draggable:!me,discard:me||void 0,reason:$u(St,O),seq:_+1,queue_position:_+1,queue_index:_,queue_length:S,badges:Z?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Z,revise_action:!!Z,revise_enabled:!!Z&&!me,revise_title:Z?Z.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Z.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},st=zt(O);return Object.hasOwn(st,"blocked_by")&&(ge.blocked_by=st.blocked_by),ge};for(let y=0;y<Tt.length;y++){let p=Xt(Tt[y],"queue",y,Tt.length);if(!p)continue;H.push(p);let _=F.get(z);_?_.push(p):F.set(z,[p])}let ve=y=>{let p=j.find(Z=>Z.id===y&&Z.root_dir===z);if(p)return{id:y,title:p.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let _=L.find(Z=>Z.id===y&&Z.root_dir===z),S=_?_.run_state:wm(Ue,y),O=S==="failed"||S==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":S==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:y,title:_?_.title:Mt(y).title,badge:O}},T=[];for(let y=0;y<Math.max(qt,xt.length);y++){let p=`s${y+1}`,_=an.get(p),S=_&&Array.isArray(_.entries)?_.entries:[],O=lt(Ct[p]),Z=Array.isArray(O.occupied_by)?O.occupied_by.filter(ge=>typeof ge=="string"):[],ue=new Set(Z),me=[];for(let ge=0;ge<S.length;ge++){let st=S[ge]&&S[ge].bead_id;if(typeof st=="string"&&ue.has(st)){vt.add(st);continue}let ut=Xt(S[ge],p,ge,S.length);ut&&(me.push(ut),H.push(ut))}me.length===0&&Z.length===0&&(qt<=1||y>=qt)||T.push({id:p,index:y,items:me,raw_length:S.length,occupied_by:Z,occupants:Z.map(ge=>ve(ge)),corrections:Array.isArray(O.corrections)?O.corrections.length:0,cycle:O.cycle===!0,...me.length===0&&Z.length===0?{empty:!0}:{}})}D.set(z,T);let te=Array.from({length:qt},(y,p)=>{let _=`s${p+1}`,S=an.get(_),O=S&&Array.isArray(S.entries)?S.entries:[],Z=lt(Ct[_]);return{id:_,index:O.length,length:O.length,occupied_by:Array.isArray(Z.occupied_by)?Z.occupied_by.filter(ue=>typeof ue=="string"):[]}});for(let y of Array.isArray(v.runnable)?v.runnable:[]){let p=y&&y.bead_id;if(typeof p!="string"||vt.has(p))continue;vt.add(p);let _=y.workflow&&typeof y.workflow=="object"?y.workflow:null,S=_&&typeof _.route=="string"&&_.route||(typeof y.route=="string"?y.route:null),O=Sm(lt(Ce),y.exec_pins,S),Z=yo(y.rec,y.exec_pins);Array.isArray(y.blocked_by)&&y.blocked_by.length>0&&X.set(p,y.blocked_by.filter(wt=>typeof wt=="string"&&wt.length>0)),typeof y.title=="string"&&y.title.length>0&&A.set(p,y.title),Array.isArray(y.scope)&&Ae.set(p,y.scope.filter(wt=>typeof wt=="string"&&wt.length>0));let ue=y.eligible!==!1,me=y.worker_ineligible===!0,ge=Object.hasOwn(y,"eligible"),st=[];typeof y.reason=="string"&&y.reason.length>0&&st.push(y.reason);let ut=$u(St,p);ut&&st.push(ut);let Ht=Em(p,y.release_info,f);k.push({...Mt(p),title:y.title||dt[p]||p,lane:"runnable",draggable:!ge,queue_placeable:ue&&!me,...me?{worker_ineligible:!0}:{},...y.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof y.session_preferred_reason=="string"?y.session_preferred_reason:""}:{},...Ht?{dependency_chips:{released:Ht}}:{},...y.dependents_info&&typeof y.dependents_info=="object"?{dependents_info:y.dependents_info}:{},reason:st.join(" \xB7 "),created_at:y.created_at??void 0,updated_at:y.updated_at??void 0,status:typeof y.status=="string"?y.status:void 0,labels:Array.isArray(y.labels)?y.labels:[],spec_id:typeof y.spec_id=="string"?y.spec_id:"",published:y.published===!0,workflow:_||(S?{route:S,chips:{route:S}}:null),...O?{exec_chips:O}:{},...Z?{rec:Z}:{},blocked:y.blocked===!0,...Array.isArray(y.blocked_by)?{blocked_by:y.blocked_by.filter(wt=>typeof wt=="string"&&wt.length>0)}:{},place_index:Tt.length,place_lanes:te})}for(let y of Ut){let p=y&&y.bead_id;if(typeof p!="string"||vt.has(p)||(vt.add(p),s!==void 0&&typeof y.added_at=="number"&&y.added_at<s))continue;let _=km(Ue,p),S=_&&typeof _.done_kind=="string"?_.done_kind:null;se.push({...Mt(p),lane:"done",done:!0,done_layout:"three_line",usage:Fn(Ue,p),work_ms:iu(Ue,p),done_at:typeof y.added_at=="number"?y.added_at:void 0,done_kind:S,...Zt(p),badges:[...S&&vu[S]?[vu[S]]:[],...ou(Ue,p)]})}for(let y of Array.isArray(v.session_done)?v.session_done:[]){let p=y&&(y.id||y.bead_id);typeof p!="string"||vt.has(p)||(vt.add(p),se.push({...Mt(p),...y,id:p,root_dir:z,workspace_name:Te,expected_revision:Fe,lane:"done",done:!0}))}}if(W.size>0)for(let v of[...k,...H,...L,...j,...se]){let z=W.get(`${v.root_dir}\0${v.id}`);if(!z||(typeof z.priority=="number"&&(v.priority=z.priority),typeof z.from_id=="string"&&z.from_id.length>0&&(v.from_id=z.from_id),!Object.hasOwn(z,"metadata")))continue;let Te=lt(z.metadata);if(v.rec=yo(Te),v.lane==="runnable"||v.lane.startsWith("s")||v.lane==="queue"){let Ce=Rm(lt(h.get(v.root_dir)),Te,typeof z.route=="string"&&z.route.length>0?z.route:lt(v.workflow).route);Ce&&(v.exec_chips=Ce)}}let oe=new Map;o.forEach((v,z)=>{v&&typeof v.root_dir=="string"&&oe.set(v.root_dir,z)});let xe=n&&n.running_sort==="repo"?"repo":"started";L.sort((v,z)=>{let Te=v.kind==="session",Ce=z.kind==="session";if(Te!==Ce)return Te?1:-1;if(Te&&Ce){let dt=Vs(z.updated_at)-Vs(v.updated_at);return dt!==0?dt:v.id.localeCompare(z.id)}if(xe==="repo"){let dt=oe.get(v.root_dir)??Number.MAX_SAFE_INTEGER,yt=oe.get(z.root_dir)??Number.MAX_SAFE_INTEGER;if(dt!==yt)return dt-yt}let Fe=typeof v.started_at=="number"&&Number.isFinite(v.started_at)?v.started_at:null,Ue=typeof z.started_at=="number"&&Number.isFinite(z.started_at)?z.started_at:null;return Fe!==null&&Ue!==null&&Fe!==Ue?Fe-Ue:Fe===null&&Ue!==null?1:Fe!==null&&Ue===null?-1:v.id.localeCompare(z.id)}),se.sort((v,z)=>(z.done_at??0)-(v.done_at??0));let de=o.length>0?o:r.map(v=>({root_dir:v&&v.root_dir,name:v&&v.name,auto_advance:v&&v.auto_advance,auto_merge:v&&v.auto_merge,slots:v&&v.slots,revision:v&&v.revision,runner_catalog:v&&v.runner_catalog})),Le=new Set(k.map(v=>v.root_dir)),_e=new Map;for(let v of L)v.kind==="session"||v.run_state!=="running"||_e.set(v.root_dir,(_e.get(v.root_dir)||0)+1);let Ne=new Map;for(let v of se){let z=Ne.get(v.root_dir);z?z.push(v):Ne.set(v.root_dir,[v])}let it={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},ot=[];for(let v of de){if(!v||typeof v.root_dir!="string")continue;let z=F.get(v.root_dir)||[],Te=D.get(v.root_dir)||[],Ce=z.length>0||Te.some(dt=>dt.items.length>0||dt.occupied_by.length>0);if(u!=="all"&&!Ce&&!Le.has(v.root_dir))continue;let Fe=typeof v.slots=="number"&&v.slots>=Xs?v.slots:Xs,Ue=_e.get(v.root_dir)||0;ot.push({live_count:Ue,over_cap:Ue>Fe,merge:V.get(v.root_dir)||it,token_total:Lm(Ne.get(v.root_dir)||[]),cleanup_failures:re.get(v.root_dir)||[],declared_base:N.get(v.root_dir)??null,repo_operations:G.get(v.root_dir)||[],root_dir:v.root_dir,name:v.name||v.root_dir,auto_advance:v.auto_advance===!0,auto_merge:v.auto_merge===!0,slots:Fe,revision:typeof v.revision=="number"?v.revision:0,runner_catalog:lt(v.runner_catalog),items:z,sublanes:{parallel:z,serial:Te},serial_lane_count:M.get(v.root_dir)||0,raw_queue_length:U.get(v.root_dir)||0})}let I={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:H,queue_groups:ot,running:L,pr_wait:j,done:se,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(U),owner_of:{}},ae=Zc(I);for(let v of Q)ae.has(v.id)||ae.set(v.id,{root_dir:v.root_dir,workspace_name:v.workspace_name,lane:"done",state:"done"});for(let v of[...I.queue,...I.runnable,...I.running,...I.pr_wait]){if(!Object.hasOwn(v,"blocked_by"))continue;let z=ae.get(v.id);v.blockers=(v.blocked_by||[]).map(Te=>Jc(Te,z,ae,o))}for(let v of[...I.queue,...I.runnable,...I.running,...I.pr_wait]){let z=(v.blockers||[]).map(Fe=>{let Ue=ae.get(Fe.id)?.root_dir;return{...ha(v.id,Fe),openable:!0,...typeof Ue=="string"&&Ue.length>0?{root_dir:Ue}:{}}}),Te=bu(v.id,jm(Ee.get(v.id),v.dependents_info,v,ae));if(z.length===0&&Te.length===0)continue;let Ce={...v.dependency_chips||{},...z.length>0?{predecessors:z}:{},...Te.length>0?{dependents:Te}:{}};v.dependency_chips=Ce}Fm(I,we,Ae,ae,o);let le=eu(I.queue_groups);for(let v of I.queue_groups)for(let z of v.sublanes.serial){let Te=le.get(tu(v.root_dir,z.id));Te&&(z.cross_wait_peers=Te)}I.chain_lanes=Nm(l&&Array.isArray(l.lanes)?l.lanes:[],X,ae,o,A,m,{armed_by_bead:ye,failed_by_bead:ce,disarmed_lanes:q});let ie=new Map;for(let v of[...I.queue,...I.runnable])ie.has(v.id)||ie.set(v.id,v);let ke=new Set;for(let v of I.chain_lanes)for(let z of v.rows){if(v.status==="confirmed"&&!z.unplaced&&!z.fixed&&ke.add(z.id),!v.draft&&!z.unplaced)continue;let Te=ie.get(z.id);Te&&(Te.cross_lane_chip={lane_id:v.lane_id,number:v.number,status:v.status,label:v.draft?`\uC5F0\uACB0 ${v.number} (draft)`:`\uC5F0\uACB0 ${v.number}`})}let pe=new Map(I.chain_lanes.map(v=>[v.lane_id,v.number]));for(let v of[...I.queue,...I.running]){let z=ye.get(v.id);if(typeof z!="string"||z.length===0)continue;let Te=pe.get(z);v.armed_lane_chip=Te===void 0?{lane_id:z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:z,label:`\u25B6 \uC5F0\uACB0 ${Te}`,orphan:!1}}let qe=[];for(let v of F.values())for(let z of v)ke.has(z.id)||qe.push(z);qe.sort((v,z)=>{let Te=v.workspace_name.localeCompare(z.workspace_name);return Te!==0?Te:(v.queue_index??0)-(z.queue_index??0)}),I.parallel_rows=qe;let Ge={};for(let[v,z]of ae)typeof z.root_dir=="string"&&z.root_dir.length>0&&(Ge[v]=z.root_dir);for(let v of I.chain_lanes)for(let z of v.rows)!Object.hasOwn(Ge,z.id)&&z.root_dir.length>0&&m.has(z.root_dir)&&(Ge[z.id]=z.root_dir);I.owner_of=Ge;let Xe=I.runnable.length;I.runnable_all=I.runnable.slice();let Pe=I.runnable,Y=v=>i.show_blocked||v.blocked!==!0,B=v=>i.spec==="all"||(i.spec==="with"?v.published===!0:v.published!==!0);if(d==="per_control"){let v=[],z=0,Te=0;for(let Ce of Pe){let Fe=Y(Ce),Ue=B(Ce);Fe&&Ue?v.push(Ce):!Fe&&Ue?z+=1:Fe&&!Ue&&(Te+=1)}Pe=v,I.runnable_hidden={blocked:z,spec:Te}}else{Pe=Pe.filter(Y);let v=Pe.length;Pe=Pe.filter(B),I.runnable_hidden={blocked:Xe-v,spec:v-Pe.length}}let Me=(v,z)=>{let Te=Vs(z.updated_at)-Vs(v.updated_at);return Te!==0?Te:v.id.localeCompare(z.id)},Qe=a==="repo_spec"?(v,z)=>{let Te=v.published===!0?0:1,Ce=z.published===!0?0:1;return Te!==Ce?Te-Ce:Me(v,z)}:Me;if(a==="as_given")I.runnable=Pe,I.runnable_sections=[];else if(a==="updated_flat")I.runnable=Pe.slice().sort(Me),I.runnable_sections=[];else{let v=new Map;for(let Ce of Pe){let Fe=v.get(Ce.root_dir);Fe?Fe.push(Ce):v.set(Ce.root_dir,[Ce])}let z=[],Te=[];for(let Ce of de){if(!Ce||typeof Ce.root_dir!="string")continue;let Fe=(v.get(Ce.root_dir)||[]).slice().sort(Qe);v.delete(Ce.root_dir),Fe.length!==0&&(z.push({root_dir:Ce.root_dir,name:Ce.name||Ce.root_dir,items:Fe.map(Ue=>({...Ue,workspace_name:""}))}),Te.push(...Fe))}for(let[Ce,Fe]of v){let Ue=Fe.slice().sort(Qe);z.push({root_dir:Ce,name:Ue[0]?.workspace_name||Ce,items:Ue.map(dt=>({...dt,workspace_name:""}))}),Te.push(...Ue)}I.runnable=Te,I.runnable_sections=z}return I}function Tu(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),h=Number(l.get(a))>Number(l.get(d));f&&h&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var Bm="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Zs="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Um="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Wm="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Vr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Eo(e,t){return`${e}\0${t}`}function zm(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Hm(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Ro(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=zm(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[f,h]of o)for(let m of h)s.push({blocker:m,blockee:f});let i=Hm(e,t),l=new Map(r.map((f,h)=>[f,h])),a=r.slice(0,i).filter(f=>o.get(f).some(h=>Number(l.get(h))>Number(l.get(f)))),u=Tu(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,i),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Cu(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ro(n,t)}function Gm(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Km(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Ym(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function $a(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Vm(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Eo(i,a));let r=new Map,o=new Map;for(let i of e){let l=Eo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Eo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function Xm(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function Qm(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Qs(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function xa(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Oo(e){let t=Ym(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Km(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let m=s(u);if(m!==null){if($a(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),f!==void 0&&r.add(Eo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let h=s(u);h!==null&&(t.set(u,f.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(Eo(u,d))}}function Lo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Vm(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Gm(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function Ru(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function To(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Ou(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function Lu(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(Qs(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Co(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Js(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function ei(e,t,n){let r=Oo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Bm};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Um};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${xa(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Vr}}if(e.kind==="chain"&&d===void 0)return{refused:Vr};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(Q=>Q.bead_id===e.bead_id);if(k<0)return;let L=k>0?d.entries[k-1]:null,j=k+1<d.entries.length?d.entries[k+1]:null,H=To(d,k),se=j!==null&&To(d,k+1);H&&L!==null&&r.removeDep(e.bead_id,L.bead_id),se&&j!==null&&r.removeDep(j.bead_id,e.bead_id),(H||se)&&L!==null&&j!==null&&r.addDep(j.bead_id,L.bead_id,u)},h=(k,L)=>{let j=n.cross_lanes.get(k),H=j.entries.findIndex(N=>N.bead_id===e.bead_id),se=j.entries.filter(N=>N.bead_id!==e.bead_id),Q=Math.max(0,Math.min(se.length,H>=0&&L>H?L-1:L)),F=-1;if(se.forEach((N,G)=>{n.fixed_members.has(N.bead_id)&&(F=G)}),Q<=F){r.state.refusal=Wm;return}let D=H>=0?j.entries[H]:d?.entries.find(N=>N.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Ro({status:j.status,entries:[...se.slice(0,Q),D,...se.slice(Q)]},n);let M=l.entries;if(Js(M,j.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Co(M)}}),j.status!=="confirmed")return;let U=M.findIndex(N=>N.bead_id===e.bead_id),V=U>0?M[U-1].bead_id:null,re=U+1<M.length?M[U+1].bead_id:null;if(V===null){re!==null&&r.addDep(re,e.bead_id,k);return}if(r.addDep(e.bead_id,V,k),re!==null&&(r.graph.get(re)||[]).includes(V)){let N=j.entries.findIndex(G=>G.bead_id===re);(r.laneCreated(re,V)||N>0&&j.entries[N-1].bead_id===V&&To(j,N))&&r.removeDep(re,V),r.addDep(re,e.bead_id,k)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...Ou(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Co(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Xm(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(Qs(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let L=n.parallel_rows,j=L[Math.max(0,Math.min(L.length,t.marker_index))];if(!(!!j&&j.bead_id===e.bead_id)&&Qm(n,e.root_dir)&&m!==void 0){let se=m>k?k:k-1;se>=0&&se!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:se},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(Qs(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let k=m>t.index?t.index:t.index-1;k>=0&&k!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(Qs(e.bead_id,e.root_dir,t.index,t.lane_id));return Lo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Iu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Vr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ro(n,t);if(r.held)return{refused:Zs};let o=r.entries,s=Oo(t),i=[];Ru(s,o,e),s.state.refusal===null&&Lu(s,t,o,i);let l=Js(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Lo(s,t,l,i,{lane_id:e,correction:r})}function Du(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Vr};let r=Ro(n,t),o=r.entries,s=Oo(t),i=[];Ru(s,o,e),s.state.refusal===null&&Lu(s,t,o,i);let l=Js(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}];return Lo(s,t,l,i,{lane_id:e,correction:r})}function Pu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Vr};let r=Ro(n,t),o=r.entries;return Lo(Oo(t),t,Js(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Co(o)}}],[],{lane_id:e,correction:r})}function Mu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Vr};let r=Oo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)To(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Lo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Ou(t,n,e,n.entries)})}function Nu(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;To(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${xa(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function qu(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Fu(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Aa(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${xa(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Zm="\uC0AC\uC774\uD074";function Jm(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Sa(e,t,n){let r=rr(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Jm(e)}}function ju(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=$a(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Zm}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Bu(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Xu,setPrototypeOf:Uu,isFrozen:eg,getPrototypeOf:tg,getOwnPropertyDescriptor:ng}=Object,{freeze:nn,seal:gn,create:Ia}=Object,{apply:Da,construct:Pa}=typeof Reflect<"u"&&Reflect;nn||(nn=function(t){return t});gn||(gn=function(t){return t});Da||(Da=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Pa||(Pa=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var ti=rn(Array.prototype.forEach),rg=rn(Array.prototype.lastIndexOf),Wu=rn(Array.prototype.pop),Io=rn(Array.prototype.push),og=rn(Array.prototype.splice),ri=rn(String.prototype.toLowerCase),Ea=rn(String.prototype.toString),Ta=rn(String.prototype.match),Do=rn(String.prototype.replace),sg=rn(String.prototype.indexOf),ig=rn(String.prototype.trim),wn=rn(Object.prototype.hasOwnProperty),tn=rn(RegExp.prototype.test),Po=ag(TypeError);function rn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Da(e,t,r)}}function ag(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Pa(e,n)}}function pt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ri;Uu&&Uu(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(eg(t)||(t[r]=s),o=s)}e[o]=!0}return e}function lg(e){for(let t=0;t<e.length;t++)wn(e,t)||(e[t]=null);return e}function Wn(e){let t=Ia(null);for(let[n,r]of Xu(e))wn(e,n)&&(Array.isArray(r)?t[n]=lg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Wn(r):t[n]=r);return t}function Mo(e,t){for(;e!==null;){let r=ng(e,t);if(r){if(r.get)return rn(r.get);if(typeof r.value=="function")return rn(r.value)}e=tg(e)}function n(){return null}return n}var zu=nn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ca=nn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ra=nn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),cg=nn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Oa=nn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ug=nn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Hu=nn(["#text"]),Gu=nn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),La=nn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ku=nn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ni=nn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),dg=gn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),pg=gn(/<%[\w\W]*|[\w\W]*%>/gm),fg=gn(/\$\{[\w\W]*/gm),_g=gn(/^data-[\-\w.\u00B7-\uFFFF]+$/),mg=gn(/^aria-[\-\w]+$/),Qu=gn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),gg=gn(/^(?:\w+script|data):/i),hg=gn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Zu=gn(/^html$/i),bg=gn(/^[a-z][.\w]*(-[.\w]+)+$/i),Yu=Object.freeze({__proto__:null,ARIA_ATTR:mg,ATTR_WHITESPACE:hg,CUSTOM_ELEMENT:bg,DATA_ATTR:_g,DOCTYPE_NAME:Zu,ERB_EXPR:pg,IS_ALLOWED_URI:Qu,IS_SCRIPT_OR_DATA:gg,MUSTACHE_EXPR:dg,TMPLIT_EXPR:fg}),No={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},yg=function(){return typeof window>"u"?null:window},vg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Vu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ju(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:yg(),t=ve=>Ju(ve);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==No.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:m}=e,k=a.prototype,L=Mo(k,"cloneNode"),j=Mo(k,"remove"),H=Mo(k,"nextSibling"),se=Mo(k,"childNodes"),Q=Mo(k,"parentNode");if(typeof i=="function"){let ve=n.createElement("template");ve.content&&ve.content.ownerDocument&&(n=ve.content.ownerDocument)}let F,D="",{implementation:M,createNodeIterator:U,createDocumentFragment:V,getElementsByTagName:re}=n,{importNode:N}=r,G=Vu();t.isSupported=typeof Xu=="function"&&typeof Q=="function"&&M&&M.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:W,ERB_EXPR:X,TMPLIT_EXPR:Ee,DATA_ATTR:ye,ARIA_ATTR:ce,IS_SCRIPT_OR_DATA:q,ATTR_WHITESPACE:we,CUSTOM_ELEMENT:Ae}=Yu,{IS_ALLOWED_URI:A}=Yu,oe=null,xe=pt({},[...zu,...Ca,...Ra,...Oa,...Hu]),de=null,Le=pt({},[...Gu,...La,...Ku,...ni]),_e=Object.seal(Ia(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,it=null,ot=Object.seal(Ia(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),I=!0,ae=!0,le=!1,ie=!0,ke=!1,pe=!0,qe=!1,Ge=!1,Xe=!1,Pe=!1,Y=!1,B=!1,Me=!0,at=!1,Qe="user-content-",v=!0,z=!1,Te={},Ce=null,Fe=pt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ue=null,dt=pt({},["audio","video","img","source","image","track"]),yt=null,Lt=pt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),St="http://www.w3.org/1998/Math/MathML",gt="http://www.w3.org/2000/svg",Be="http://www.w3.org/1999/xhtml",P=Be,ne=!1,he=null,R=pt({},[St,gt,Be],Ea),K=pt({},["mi","mo","mn","ms","mtext"]),Ie=pt({},["annotation-xml"]),We=pt({},["title","style","font","a","script"]),De=null,Je=["application/xhtml+xml","text/html"],Re="text/html",ze=null,Ze=null,ft=n.createElement("form"),He=function(T){return T instanceof RegExp||T instanceof Function},kt=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ze&&Ze===T)){if((!T||typeof T!="object")&&(T={}),T=Wn(T),De=Je.indexOf(T.PARSER_MEDIA_TYPE)===-1?Re:T.PARSER_MEDIA_TYPE,ze=De==="application/xhtml+xml"?Ea:ri,oe=wn(T,"ALLOWED_TAGS")?pt({},T.ALLOWED_TAGS,ze):xe,de=wn(T,"ALLOWED_ATTR")?pt({},T.ALLOWED_ATTR,ze):Le,he=wn(T,"ALLOWED_NAMESPACES")?pt({},T.ALLOWED_NAMESPACES,Ea):R,yt=wn(T,"ADD_URI_SAFE_ATTR")?pt(Wn(Lt),T.ADD_URI_SAFE_ATTR,ze):Lt,Ue=wn(T,"ADD_DATA_URI_TAGS")?pt(Wn(dt),T.ADD_DATA_URI_TAGS,ze):dt,Ce=wn(T,"FORBID_CONTENTS")?pt({},T.FORBID_CONTENTS,ze):Fe,Ne=wn(T,"FORBID_TAGS")?pt({},T.FORBID_TAGS,ze):Wn({}),it=wn(T,"FORBID_ATTR")?pt({},T.FORBID_ATTR,ze):Wn({}),Te=wn(T,"USE_PROFILES")?T.USE_PROFILES:!1,I=T.ALLOW_ARIA_ATTR!==!1,ae=T.ALLOW_DATA_ATTR!==!1,le=T.ALLOW_UNKNOWN_PROTOCOLS||!1,ie=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ke=T.SAFE_FOR_TEMPLATES||!1,pe=T.SAFE_FOR_XML!==!1,qe=T.WHOLE_DOCUMENT||!1,Pe=T.RETURN_DOM||!1,Y=T.RETURN_DOM_FRAGMENT||!1,B=T.RETURN_TRUSTED_TYPE||!1,Xe=T.FORCE_BODY||!1,Me=T.SANITIZE_DOM!==!1,at=T.SANITIZE_NAMED_PROPS||!1,v=T.KEEP_CONTENT!==!1,z=T.IN_PLACE||!1,A=T.ALLOWED_URI_REGEXP||Qu,P=T.NAMESPACE||Be,K=T.MATHML_TEXT_INTEGRATION_POINTS||K,Ie=T.HTML_INTEGRATION_POINTS||Ie,_e=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&He(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&He(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ke&&(ae=!1),Y&&(Pe=!0),Te&&(oe=pt({},Hu),de=[],Te.html===!0&&(pt(oe,zu),pt(de,Gu)),Te.svg===!0&&(pt(oe,Ca),pt(de,La),pt(de,ni)),Te.svgFilters===!0&&(pt(oe,Ra),pt(de,La),pt(de,ni)),Te.mathMl===!0&&(pt(oe,Oa),pt(de,Ku),pt(de,ni))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?ot.tagCheck=T.ADD_TAGS:(oe===xe&&(oe=Wn(oe)),pt(oe,T.ADD_TAGS,ze))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?ot.attributeCheck=T.ADD_ATTR:(de===Le&&(de=Wn(de)),pt(de,T.ADD_ATTR,ze))),T.ADD_URI_SAFE_ATTR&&pt(yt,T.ADD_URI_SAFE_ATTR,ze),T.FORBID_CONTENTS&&(Ce===Fe&&(Ce=Wn(Ce)),pt(Ce,T.FORBID_CONTENTS,ze)),v&&(oe["#text"]=!0),qe&&pt(oe,["html","head","body"]),oe.table&&(pt(oe,["tbody"]),delete Ne.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw Po('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Po('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');F=T.TRUSTED_TYPES_POLICY,D=F.createHTML("")}else F===void 0&&(F=vg(m,o)),F!==null&&typeof D=="string"&&(D=F.createHTML(""));nn&&nn(T),Ze=T}},Nt=pt({},[...Ca,...Ra,...cg]),tt=pt({},[...Oa,...ug]),Tt=function(T){let te=Q(T);(!te||!te.tagName)&&(te={namespaceURI:P,tagName:"template"});let y=ri(T.tagName),p=ri(te.tagName);return he[T.namespaceURI]?T.namespaceURI===gt?te.namespaceURI===Be?y==="svg":te.namespaceURI===St?y==="svg"&&(p==="annotation-xml"||K[p]):!!Nt[y]:T.namespaceURI===St?te.namespaceURI===Be?y==="math":te.namespaceURI===gt?y==="math"&&Ie[p]:!!tt[y]:T.namespaceURI===Be?te.namespaceURI===gt&&!Ie[p]||te.namespaceURI===St&&!K[p]?!1:!tt[y]&&(We[y]||!Nt[y]):!!(De==="application/xhtml+xml"&&he[T.namespaceURI]):!1},xt=function(T){Io(t.removed,{element:T});try{Q(T).removeChild(T)}catch{j(T)}},Ct=function(T,te){try{Io(t.removed,{attribute:te.getAttributeNode(T),from:te})}catch{Io(t.removed,{attribute:null,from:te})}if(te.removeAttribute(T),T==="is")if(Pe||Y)try{xt(te)}catch{}else try{te.setAttribute(T,"")}catch{}},qt=function(T){let te=null,y=null;if(Xe)T="<remove></remove>"+T;else{let S=Ta(T,/^[\r\n\t ]+/);y=S&&S[0]}De==="application/xhtml+xml"&&P===Be&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let p=F?F.createHTML(T):T;if(P===Be)try{te=new h().parseFromString(p,De)}catch{}if(!te||!te.documentElement){te=M.createDocument(P,"template",null);try{te.documentElement.innerHTML=ne?D:p}catch{}}let _=te.body||te.documentElement;return T&&y&&_.insertBefore(n.createTextNode(y),_.childNodes[0]||null),P===Be?re.call(te,qe?"html":"body")[0]:qe?te.documentElement:_},an=function(T){return U.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Bt=function(T){return T instanceof f&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},Ut=function(T){return typeof l=="function"&&T instanceof l};function It(ve,T,te){ti(ve,y=>{y.call(t,T,te,Ze)})}let Mt=function(T){let te=null;if(It(G.beforeSanitizeElements,T,null),Bt(T))return xt(T),!0;let y=ze(T.nodeName);if(It(G.uponSanitizeElement,T,{tagName:y,allowedTags:oe}),pe&&T.hasChildNodes()&&!Ut(T.firstElementChild)&&tn(/<[/\w!]/g,T.innerHTML)&&tn(/<[/\w!]/g,T.textContent)||T.nodeType===No.progressingInstruction||pe&&T.nodeType===No.comment&&tn(/<[/\w]/g,T.data))return xt(T),!0;if(!(ot.tagCheck instanceof Function&&ot.tagCheck(y))&&(!oe[y]||Ne[y])){if(!Ne[y]&&zt(y)&&(_e.tagNameCheck instanceof RegExp&&tn(_e.tagNameCheck,y)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(y)))return!1;if(v&&!Ce[y]){let p=Q(T)||T.parentNode,_=se(T)||T.childNodes;if(_&&p){let S=_.length;for(let O=S-1;O>=0;--O){let Z=L(_[O],!0);Z.__removalCount=(T.__removalCount||0)+1,p.insertBefore(Z,H(T))}}}return xt(T),!0}return T instanceof a&&!Tt(T)||(y==="noscript"||y==="noembed"||y==="noframes")&&tn(/<\/no(script|embed|frames)/i,T.innerHTML)?(xt(T),!0):(ke&&T.nodeType===No.text&&(te=T.textContent,ti([W,X,Ee],p=>{te=Do(te,p," ")}),T.textContent!==te&&(Io(t.removed,{element:T.cloneNode()}),T.textContent=te)),It(G.afterSanitizeElements,T,null),!1)},Zt=function(T,te,y){if(Me&&(te==="id"||te==="name")&&(y in n||y in ft))return!1;if(!(ae&&!it[te]&&tn(ye,te))){if(!(I&&tn(ce,te))){if(!(ot.attributeCheck instanceof Function&&ot.attributeCheck(te,T))){if(!de[te]||it[te]){if(!(zt(T)&&(_e.tagNameCheck instanceof RegExp&&tn(_e.tagNameCheck,T)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(T))&&(_e.attributeNameCheck instanceof RegExp&&tn(_e.attributeNameCheck,te)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck(te,T))||te==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&tn(_e.tagNameCheck,y)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(y))))return!1}else if(!yt[te]){if(!tn(A,Do(y,we,""))){if(!((te==="src"||te==="xlink:href"||te==="href")&&T!=="script"&&sg(y,"data:")===0&&Ue[T])){if(!(le&&!tn(q,Do(y,we,"")))){if(y)return!1}}}}}}}return!0},zt=function(T){return T!=="annotation-xml"&&Ta(T,Ae)},vt=function(T){It(G.beforeSanitizeAttributes,T,null);let{attributes:te}=T;if(!te||Bt(T))return;let y={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0},p=te.length;for(;p--;){let _=te[p],{name:S,namespaceURI:O,value:Z}=_,ue=ze(S),me=Z,ge=S==="value"?me:ig(me);if(y.attrName=ue,y.attrValue=ge,y.keepAttr=!0,y.forceKeepAttr=void 0,It(G.uponSanitizeAttribute,T,y),ge=y.attrValue,at&&(ue==="id"||ue==="name")&&(Ct(S,T),ge=Qe+ge),pe&&tn(/((--!?|])>)|<\/(style|title|textarea)/i,ge)){Ct(S,T);continue}if(ue==="attributename"&&Ta(ge,"href")){Ct(S,T);continue}if(y.forceKeepAttr)continue;if(!y.keepAttr){Ct(S,T);continue}if(!ie&&tn(/\/>/i,ge)){Ct(S,T);continue}ke&&ti([W,X,Ee],ut=>{ge=Do(ge,ut," ")});let st=ze(T.nodeName);if(!Zt(st,ue,ge)){Ct(S,T);continue}if(F&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!O)switch(m.getAttributeType(st,ue)){case"TrustedHTML":{ge=F.createHTML(ge);break}case"TrustedScriptURL":{ge=F.createScriptURL(ge);break}}if(ge!==me)try{O?T.setAttributeNS(O,S,ge):T.setAttribute(S,ge),Bt(T)?xt(T):Wu(t.removed)}catch{Ct(S,T)}}It(G.afterSanitizeAttributes,T,null)},Xt=function ve(T){let te=null,y=an(T);for(It(G.beforeSanitizeShadowDOM,T,null);te=y.nextNode();)It(G.uponSanitizeShadowNode,te,null),Mt(te),vt(te),te.content instanceof s&&ve(te.content);It(G.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(ve){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},te=null,y=null,p=null,_=null;if(ne=!ve,ne&&(ve="<!-->"),typeof ve!="string"&&!Ut(ve))if(typeof ve.toString=="function"){if(ve=ve.toString(),typeof ve!="string")throw Po("dirty is not a string, aborting")}else throw Po("toString is not a function");if(!t.isSupported)return ve;if(Ge||kt(T),t.removed=[],typeof ve=="string"&&(z=!1),z){if(ve.nodeName){let Z=ze(ve.nodeName);if(!oe[Z]||Ne[Z])throw Po("root node is forbidden and cannot be sanitized in-place")}}else if(ve instanceof l)te=qt("<!---->"),y=te.ownerDocument.importNode(ve,!0),y.nodeType===No.element&&y.nodeName==="BODY"||y.nodeName==="HTML"?te=y:te.appendChild(y);else{if(!Pe&&!ke&&!qe&&ve.indexOf("<")===-1)return F&&B?F.createHTML(ve):ve;if(te=qt(ve),!te)return Pe?null:B?D:""}te&&Xe&&xt(te.firstChild);let S=an(z?ve:te);for(;p=S.nextNode();)Mt(p),vt(p),p.content instanceof s&&Xt(p.content);if(z)return ve;if(Pe){if(Y)for(_=V.call(te.ownerDocument);te.firstChild;)_.appendChild(te.firstChild);else _=te;return(de.shadowroot||de.shadowrootmode)&&(_=N.call(r,_,!0)),_}let O=qe?te.outerHTML:te.innerHTML;return qe&&oe["!doctype"]&&te.ownerDocument&&te.ownerDocument.doctype&&te.ownerDocument.doctype.name&&tn(Zu,te.ownerDocument.doctype.name)&&(O="<!DOCTYPE "+te.ownerDocument.doctype.name+`>
`+O),ke&&ti([W,X,Ee],Z=>{O=Do(O,Z," ")}),F&&B?F.createHTML(O):O},t.setConfig=function(){let ve=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};kt(ve),Ge=!0},t.clearConfig=function(){Ze=null,Ge=!1},t.isValidAttribute=function(ve,T,te){Ze||kt({});let y=ze(ve),p=ze(T);return Zt(y,p,te)},t.addHook=function(ve,T){typeof T=="function"&&Io(G[ve],T)},t.removeHook=function(ve,T){if(T!==void 0){let te=rg(G[ve],T);return te===-1?void 0:og(G[ve],te,1)[0]}return Wu(G[ve])},t.removeHooks=function(ve){G[ve]=[]},t.removeAllHooks=function(){G=Vu()},t}var ed=Ju();var zn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},oi=e=>(...t)=>({_$litDirective$:e,values:t}),Xr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var qo=class extends Xr{constructor(t){if(super(t),this.it=Rt,t.type!==zn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Rt||t==null)return this._t=void 0,this.it=t;if(t===mn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};qo.directiveName="unsafeHTML",qo.resultType=1;var td=oi(qo);function Fa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var wr=Fa();function ld(e){wr=e}var Uo={exec:()=>null};function mt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(on.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var wg=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),on={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},kg=/^(?:[ \t]*(?:\n|$))+/,$g=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,xg=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Wo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ag=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ja=/(?:[*+-]|\d{1,9}[.)])/,cd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ud=mt(cd).replace(/bull/g,ja).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Sg=mt(cd).replace(/bull/g,ja).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ba=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Eg=/^[^\n]+/,Ua=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Tg=mt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ua).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Cg=mt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ja).getRegex(),ui="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Wa=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Rg=mt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Wa).replace("tag",ui).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),dd=mt(Ba).replace("hr",Wo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ui).getRegex(),Og=mt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",dd).getRegex(),za={blockquote:Og,code:$g,def:Tg,fences:xg,heading:Ag,hr:Wo,html:Rg,lheading:ud,list:Cg,newline:kg,paragraph:dd,table:Uo,text:Eg},nd=mt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Wo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ui).getRegex(),Lg={...za,lheading:Sg,table:nd,paragraph:mt(Ba).replace("hr",Wo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",nd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ui).getRegex()},Ig={...za,html:mt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Wa).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Uo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:mt(Ba).replace("hr",Wo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ud).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Dg=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Pg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,pd=/^( {2,}|\\)\n(?!\s*$)/,Mg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,di=/[\p{P}\p{S}]/u,Ha=/[\s\p{P}\p{S}]/u,fd=/[^\s\p{P}\p{S}]/u,Ng=mt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ha).getRegex(),_d=/(?!~)[\p{P}\p{S}]/u,qg=/(?!~)[\s\p{P}\p{S}]/u,Fg=/(?:[^\s\p{P}\p{S}]|~)/u,jg=mt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",wg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),md=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Bg=mt(md,"u").replace(/punct/g,di).getRegex(),Ug=mt(md,"u").replace(/punct/g,_d).getRegex(),gd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wg=mt(gd,"gu").replace(/notPunctSpace/g,fd).replace(/punctSpace/g,Ha).replace(/punct/g,di).getRegex(),zg=mt(gd,"gu").replace(/notPunctSpace/g,Fg).replace(/punctSpace/g,qg).replace(/punct/g,_d).getRegex(),Hg=mt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,fd).replace(/punctSpace/g,Ha).replace(/punct/g,di).getRegex(),Gg=mt(/\\(punct)/,"gu").replace(/punct/g,di).getRegex(),Kg=mt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Yg=mt(Wa).replace("(?:-->|$)","-->").getRegex(),Vg=mt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Yg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ai=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Xg=mt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ai).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),hd=mt(/^!?\[(label)\]\[(ref)\]/).replace("label",ai).replace("ref",Ua).getRegex(),bd=mt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ua).getRegex(),Qg=mt("reflink|nolink(?!\\()","g").replace("reflink",hd).replace("nolink",bd).getRegex(),rd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ga={_backpedal:Uo,anyPunctuation:Gg,autolink:Kg,blockSkip:jg,br:pd,code:Pg,del:Uo,emStrongLDelim:Bg,emStrongRDelimAst:Wg,emStrongRDelimUnd:Hg,escape:Dg,link:Xg,nolink:bd,punctuation:Ng,reflink:hd,reflinkSearch:Qg,tag:Vg,text:Mg,url:Uo},Zg={...Ga,link:mt(/^!?\[(label)\]\((.*?)\)/).replace("label",ai).getRegex(),reflink:mt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ai).getRegex()},Ma={...Ga,emStrongRDelimAst:zg,emStrongLDelim:Ug,url:mt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",rd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:mt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",rd).getRegex()},Jg={...Ma,br:mt(pd).replace("{2,}","*").getRegex(),text:mt(Ma.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},si={normal:za,gfm:Lg,pedantic:Ig},Fo={normal:Ga,gfm:Ma,breaks:Jg,pedantic:Zg},eh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},od=e=>eh[e];function Hn(e,t){if(t){if(on.escapeTest.test(e))return e.replace(on.escapeReplace,od)}else if(on.escapeTestNoEncode.test(e))return e.replace(on.escapeReplaceNoEncode,od);return e}function sd(e){try{e=encodeURI(e).replace(on.percentDecode,"%")}catch{return null}return e}function id(e,t){let n=e.replace(on.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(on.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(on.slashPipe,"|");return r}function jo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function th(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function ad(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function nh(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var li=class{constructor(e){$t(this,"options");$t(this,"rules");$t(this,"lexer");this.options=e||wr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:jo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=nh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=jo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:jo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=jo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=f,n.length===0)break;let h=s.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let m=h,k=m.raw+`
`+n.join(`
`),L=this.blockquote(k);s[s.length-1]=L,r=r.substring(0,r.length-m.raw.length)+L.raw,o=o.substring(0,o.length-m.text.length)+L.text;break}else if(h?.type==="list"){let m=h,k=m.raw+`
`+n.join(`
`),L=this.list(k);s[s.length-1]=L,r=r.substring(0,r.length-h.raw.length)+L.raw,o=o.substring(0,o.length-m.raw.length)+L.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),h=e.split(`
`,1)[0],m=!f.trim(),k=0;if(this.options.pedantic?(k=2,d=f.trimStart()):m?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=f.slice(k),k+=t[1].length),m&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let L=this.rules.other.nextBulletRegex(k),j=this.rules.other.hrRegex(k),H=this.rules.other.fencesBeginRegex(k),se=this.rules.other.headingBeginRegex(k),Q=this.rules.other.htmlBeginRegex(k);for(;e;){let F=e.split(`
`,1)[0],D;if(h=F,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),D=h):D=h.replace(this.rules.other.tabCharGlobal,"    "),H.test(h)||se.test(h)||Q.test(h)||L.test(h)||j.test(h))break;if(D.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+D.slice(k);else{if(m||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||H.test(f)||se.test(f)||j.test(f))break;d+=`
`+h}!m&&!h.trim()&&(m=!0),u+=F+`
`,e=e.substring(F.length+1),f=D.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=id(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(id(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=jo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=th(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),ad(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return ad(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=f.slice(1,-1);return{type:"em",raw:f,text:m,tokens:this.lexer.inlineTokens(m)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},kn=class Na{constructor(t){$t(this,"tokens");$t(this,"options");$t(this,"state");$t(this,"inlineQueue");$t(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||wr,this.options.tokenizer=this.options.tokenizer||new li,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:on,block:si.normal,inline:Fo.normal};this.options.pedantic?(n.block=si.pedantic,n.inline=Fo.pedantic):this.options.gfm&&(n.block=si.gfm,this.options.breaks?n.inline=Fo.breaks:n.inline=Fo.gfm),this.tokenizer.rules=n}static get rules(){return{block:si,inline:Fo}}static lex(t,n){return new Na(n).lex(t)}static lexInline(t,n){return new Na(n).inlineTokens(t)}lex(t){t=t.replace(on.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(on.tabCharGlobal,"    ").replace(on.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(m=>{h=m.call({lexer:this},f),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},ci=class{constructor(e){$t(this,"options");$t(this,"parser");this.options=e||wr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(on.notSpaceStart)?.[0],o=e.replace(on.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Hn(r)+'">'+(n?o:Hn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Hn(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let l=e.items[i];r+=this.listitem(l)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];n="";for(let i=0;i<s.length;i++)n+=this.tablecell(s[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Hn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=sd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Hn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=sd(e);if(o===null)return Hn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Hn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Hn(e.text)}},Ka=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},$n=class qa{constructor(t){$t(this,"options");$t(this,"renderer");$t(this,"textRenderer");this.options=t||wr,this.options.renderer=this.options.renderer||new ci,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ka}static parse(t,n){return new qa(n).parse(t)}static parseInline(t,n){return new qa(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ii,Bo=(ii=class{constructor(e){$t(this,"options");$t(this,"block");this.options=e||wr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?kn.lex:kn.lexInline}provideParser(){return this.block?$n.parse:$n.parseInline}},$t(ii,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),$t(ii,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ii),rh=class{constructor(...e){$t(this,"defaults",Fa());$t(this,"options",this.setOptions);$t(this,"parse",this.parseMarkdown(!0));$t(this,"parseInline",this.parseMarkdown(!1));$t(this,"Parser",$n);$t(this,"Renderer",ci);$t(this,"TextRenderer",Ka);$t(this,"Lexer",kn);$t(this,"Tokenizer",li);$t(this,"Hooks",Bo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new ci(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new li(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Bo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Bo.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Bo.passThroughHooksRespectAsync.has(s))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return kn.lex(e,t??this.defaults)}parser(e,t){return $n.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?kn.lex:kn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?$n.parse:$n.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?kn.lex:kn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?$n.parse:$n.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Hn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},vr=new rh;function bt(e,t){return vr.parse(e,t)}bt.options=bt.setOptions=function(e){return vr.setOptions(e),bt.defaults=vr.defaults,ld(bt.defaults),bt};bt.getDefaults=Fa;bt.defaults=wr;bt.use=function(...e){return vr.use(...e),bt.defaults=vr.defaults,ld(bt.defaults),bt};bt.walkTokens=function(e,t){return vr.walkTokens(e,t)};bt.parseInline=vr.parseInline;bt.Parser=$n;bt.parser=$n.parse;bt.Renderer=ci;bt.TextRenderer=Ka;bt.Lexer=kn;bt.lexer=kn.lex;bt.Tokenizer=li;bt.Hooks=Bo;bt.parse=bt;var l$=bt.options,c$=bt.setOptions,u$=bt.use,d$=bt.walkTokens,p$=bt.parseInline;var f$=$n.parse,_$=kn.lex;function or(e){let t=bt.parse(e),n=ed.sanitize(t);return td(n)}function Gn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Qr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function pi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var vd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},oh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},sh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ih=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function xn(e){return!!e&&typeof e=="object"}function Ya(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Va(e,t){let n=Ya(e),r=Ya(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function wd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>xn(o)&&typeof o.text=="string"?o.text:"").join(""):xn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function ah(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:vd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ya(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=Va(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=Va(xn(l)?l.old_string:"",xn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Xa(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var lh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function kd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>xn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(lh,"").trim();return n.length>0?{kind:"user",text:n}:null}function Qa(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=sh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:ih.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function ch(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function uh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(xn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(Qa(i.text));else if(i.type==="thinking"){let l=Xa(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=ah(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?yd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(xn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=wd(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=kd(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?yd([o],n):[o]}return[]}function yd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function dh(e){let t=typeof e.command=="string"?e.command:"",n=wd(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:vd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function ph(e){if(e.type==="item.completed"&&xn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Qa(t.text)];if(t.type==="user_message"){let n=kd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Xa(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[dh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function fh(e){if(e.schema!=="codex-delegation-monitor-v1"||!xn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&xn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Qa(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=Xa(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=oh[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function _h(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function mh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return xn(t)?t:null}function $d(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=mh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return ch(s,r);let i=s.schema==="codex-delegation-monitor-v1"?fh(s):_h(s)?ph(s):uh(s,n);return i.length>0&&(r.progress=null),i}}}function Za(e){let t=[],n=$d(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var gh=5,hh=10,bh=/Task\s+#(\d+)/,yh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,vh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function zo(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function wh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function kh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function $h(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=bh.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function xh(e){if(e.tool==="Bash"){let t=e.command||"";return yh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":vh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ah(e){let t=e.filter(o=>o.kind==="tool").slice(-hh),n=new Map;t.forEach((o,s)=>{let i=xh(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Sh(e){let t=kh(e);if(t)return{text:t,guess:!1};let n=$h(e);if(n)return{text:n,guess:!1};let r=Ah(e);return r?{text:r,guess:!0}:null}function Eh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:Jt(e,t)}function Zr(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,f={},h=!0,m=new Set,k=new Set,L=null,j=null,H=!1,se=!1,Q=!1,F=null,D=null;function M(){H=!1,se=!1,Q=!1,F=null,D=null}async function U(Y){if(n){se=!0,Q=!1,Ne();try{let B=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Y,...u?{root_dir:u}:{}}));if(s!==Y)return;!B||typeof B!="object"||Array.isArray(B)?Q=!0:(F=B,D=Y)}catch{s===Y&&(Q=!0)}finally{s===Y&&(se=!1,Ne())}}}function V(){if(H=!H,H&&s&&D!==s){U(s);return}Ne()}function re(){if(!H)return"";let Y=Qr({loading:se,error:Q});if(Y)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!F)return"";if(F.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let B=pi(F.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${B?c`<div class="prompt-block__meta">${B} 발송</div>`:""}
      ${typeof F.task_prompt=="string"?Gn("\uACFC\uC5C5 (user)",F.task_prompt):""}
      ${typeof F.system_prompt=="string"?Gn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",F.system_prompt):""}
    </div>`}function N(){if(!a||!r)return[];let Y=r.get(a);return Za(Y?Y.lines:[])}function G(){if(!a||!r)return null;let Y=r.get(a),B=Y?Y.last_event_at:null;return typeof B=="number"?B:null}function W(){return f.status==="running"}function X(){if(W()&&s){j||(j=setInterval(()=>Ne(),1e3));return}Ee()}function Ee(){j&&(clearInterval(j),j=null)}function ye(Y){let B=[],Me=0;for(;Me<Y.length;){let{idx:at,line:Qe}=Y[Me];if(Qe.kind==="tool"){let v=Me;for(;v<Y.length&&Y[v].line.kind==="tool"&&Y[v].line.tool===Qe.tool;)v+=1;if(v-Me>=gh&&!k.has(at)){B.push({kind:"group",idx:at,tool:Qe.tool||"",lines:Y.slice(Me,v)}),Me=v;continue}}B.push({kind:"line",idx:at,line:Qe}),Me+=1}return B}function ce(Y){let B=[],Me=new Map;for(let v=0;v<Y.length;v+=1){let z=Y[v],Te=z.parent_tool_use_id;if(typeof Te=="string"&&Te.length>0){let Ce=Me.get(Te);Ce||(Ce={kind:"subagent",idx:v,launch_id:Te,agent_type:null,header:null,lines:[]},Me.set(Te,Ce),B.push(Ce)),Ce.lines.push({idx:v,line:z});continue}if(z.kind==="tool"&&z.tool==="Agent"&&typeof z.launch_id=="string"&&z.launch_id.length>0){let Ce=q(z),Fe=Me.get(z.launch_id);if(Fe){Fe.header={idx:v,line:z},Fe.agent_type=Ce;continue}let Ue={kind:"subagent",idx:v,launch_id:z.launch_id,agent_type:Ce,header:{idx:v,line:z},lines:[]};Me.set(z.launch_id,Ue),B.push(Ue);continue}B.push({kind:"entry",idx:v,line:z})}let at=[],Qe=0;for(;Qe<B.length;){if(B[Qe].kind!=="entry"){at.push(B[Qe]),Qe+=1;continue}let v=Qe;for(;v<B.length&&B[v].kind==="entry";)v+=1;at.push(...ye(B.slice(Qe,v))),Qe=v}return at}function q(Y){let B=Y.input;return B&&typeof B.subagent_type=="string"?B.subagent_type:null}function we(Y){for(let B=Y.length-1;B>=0;B-=1){let Me=Y[B];if(Me.kind==="result"||Me.kind==="error")return null;if(Me.kind==="tool"&&!Object.hasOwn(Me,"result"))return Me}return null}function Ae(Y){for(let B=Y.length-1;B>=0;B-=1)if(Y[B].kind==="thinking")return Y[B];return null}function A(Y,B){if(B.kind==="gate")return c`<div class="sv__gate">${B.text}</div>`;if(B.kind==="phase")return c`<div class="sv__phase">${B.text}</div>`;if(B.kind==="result")return c`<div
        class="sv__result${B.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${B.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${or(B.text||(B.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(B.kind==="thinking"){let Me=m.has(Y);return c`<div
        class="sv__think${Me?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ot(Y)}
      >
        <span class="sv__think-line">💭 ${zo(B.text)}</span>
        ${Me?c`<pre class="sv__think-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="user"){let Me=m.has(Y);return c`<div
        class="sv__line sv__line--user${Me?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ot(Y)}
      >
        <span class="sv__user-line">▷ ${zo(B.text)}</span>
        ${Me?c`<pre class="sv__user-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="error")return c`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="blocker")return c`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="tool"){let Me=m.has(Y),at=B.tool==="Bash"?wh(B.command):0,Qe=B.tool==="Bash"?at>1?zo(B.command):B.command:B.path||B.command||"";return c`<div
        class="sv__tool${Me?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ot(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${B.icon}</span>
          <span class="sv__tool-name">${B.tool}</span>
          ${Qe?c`<span class="sv__tool-detail">${Qe}</span>`:""}
          ${at>1?c`<span class="sv__tool-more">⋯ ${at}줄</span>`:""}
          ${typeof B.added=="number"?c`<span class="sv__diff-add">+${B.added}</span>`:""}
          ${typeof B.removed=="number"?c`<span class="sv__diff-del">−${B.removed}</span>`:""}
          ${B.result?c`<span class="sv__tool-ok">→ ${B.result}</span>`:""}
        </span>
        ${Me?c`<pre class="sv__tool-expand">${oe(B)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${or(B.text||"")}</div>`}function oe(Y){let B=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)B.push(Y.command);else if(Y.input!==void 0)try{B.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&B.push(`output:
${Y.output}`),B.join(`

`)}function xe(){if(!s)return c``;let Y=N(),B=(i?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Me=f.session_id||"",at=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,Qe=W(),v=Qe?Eh(G(),Date.now()):"",z=Qe?we(Y):null,Te=Qe?Ae(Y):null,Ce=Sh(Y);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(i?f.role||"":s)}</span
        >
        ${Ce?c`<span
              class="sv__stage${Ce.guess?" sv__stage--guess":""}"
              title=${Ce.text}
              >${Ce.text}</span
            >`:""}
        ${Qe?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${v?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${v}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${v?c`<span class="sv__live-ago">${v}</span>`:""}</span
            >`:""}
        ${Me?c`<button
              type="button"
              class="sv__session"
              title=${Me}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Me}`}
              @click=${()=>ae(Me)}
            >
              ⧉ ${Me.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>ae(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${B?c`<span class="sv__meta">${B}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${H?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${H?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${V}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${at}
          @click=${I}
        >
          <span class="sv__follow-full">⇣ ${at}</span>
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
      ${i||d?"":re()}
      <div class="sv__body">
        ${Y.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ce(Y).map(Fe=>Fe.kind==="subagent"?Le(Fe):Fe.kind==="group"?de(Fe):A(Fe.idx,Fe.line))}
      </div>
      ${z||Te?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${z?c`<span class="sv__now-icon">${z.icon}</span>
                  <span class="sv__now-name">${z.tool}</span>
                  <span class="sv__now-detail"
                    >${z.tool==="Bash"?zo(z.command):z.path||z.command||""}</span
                  >`:""}
            ${Te?c`<span class="sv__now-think"
                  >💭 ${zo(Te.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function de(Y){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>_e(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Le(Y){let B=k.has(Y.idx),Me=Y.header?Y.header.line:null,at=Me?Me.is_error===!0?"\u2717":typeof Me.result=="string"?"\u2713":"\u27F3":"",Qe=Me&&Me.command?Me.command:"";return c`<div class="sv__sub${B?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_e(Y.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Y.agent_type||"subagent"}</span>
        ${Qe?c`<span class="sv__sub-detail">${Qe}</span>`:""}
        <span class="sv__sub-count">${Y.lines.length}줄</span>
        ${at?c`<span class="sv__sub-state">${at}</span>`:""}
        ${B?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${B?c`<div class="sv__sub-body">
            ${ye(Y.lines).map(v=>v.kind==="group"?de(v):A(v.idx,v.line))}
          </div>`:""}
    </div>`}function _e(Y){k.add(Y),Ne()}function Ne(){rt(xe(),e),X(),h&&it()}function it(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function ot(Y){m.has(Y)?m.delete(Y):m.add(Y),Ne()}function I(){h=!h,Ne()}function ae(Y){en(Y).then(B=>{B?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function le(Y){!s||!Y||(f={...f,...Y},Ne())}function ie(Y){let B=Y.target;if(!B||!B.classList||!B.classList.contains("sv__body"))return;!(B.scrollHeight-B.scrollTop-B.clientHeight<=4)&&h&&(h=!1,Ne())}e.addEventListener("scroll",ie,!0);function ke(Y){let B=Y.target;!B||typeof B.closest!="function"||e.contains(B)||B.closest("dialog")||B.closest(".md-viewer-root")||Pe()}let pe=!1;function qe(){pe||(document.addEventListener("mousedown",ke),pe=!0)}function Ge(){pe&&(document.removeEventListener("mousedown",ke),pe=!1)}function Xe(Y){let B=Y&&Y.attempt_id;if(!B)return;let Me=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,at=Y.session_ref&&typeof Y.session_ref=="object"?Y.session_ref:null;if(Me&&at)return;let Qe=a;s=B,i=Me,l=at,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&Qe&&Qe!==a&&Promise.resolve(n("unsubscribe-session-log",{id:Qe})).catch(()=>{}),u=typeof Y.root_dir=="string"&&Y.root_dir.length>0?Y.root_dir:null,f=Y.meta||{},d=Y.hide_prompt===!0,h=!0,m.clear(),k.clear(),M(),!L&&r&&(L=r.subscribe(Ne)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),qe(),Ne()}function Pe(){let Y=a;Ge(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),k.clear(),M(),Ee(),n&&Y&&Promise.resolve(n("unsubscribe-session-log",{id:Y})).catch(()=>{}),rt(c``,e),o&&o()}return{open:Xe,updateMeta:le,close:Pe,isOpen(){return s!==null},destroy(){Ee(),Ge(),L&&(L(),L=null),e.removeEventListener("scroll",ie,!0),s=null,i=null,l=null,a=null,u=null,d=!1,rt(c``,e)}}}function Th(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Ch(e){let t=e&&e.metadata||{},n=Or(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Th(t)?null:"plan_pending"}),r}function xd(e,t){let n=Ch(e);return c`
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
  `}var Rh="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Oh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Lh=/^\*\*결론\*\* — (.+)$/;function fi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Rh)return null;let n=Oh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Lh.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Ad=20;function Sd(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function Ih(e){return e.length>Ad?`${e.slice(0,Ad)}\u2026`:e}function Dh(e,t,n,r){let o=`${t.lane} ${Ih(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Sd(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${or(t.body)}
        </div>`:""}
  </div>`}function Ph(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Sd(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${or(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ed(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=fi(typeof a.text=="string"?a.text:"");return u?Dh(a,u,t,o.has(a.id)):Ph(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${s}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${i||s.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:Y$}=Sl;var Td=e=>e.strings===void 0;var Mh={},Cd=(e,t=Mh)=>e._$AH=t;var kr=oi(class extends Xr{constructor(e){if(super(e),e.type!==zn.PROPERTY&&e.type!==zn.ATTRIBUTE&&e.type!==zn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Td(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===mn||t===Rt)return t;let n=e.element,r=e.name;if(e.type===zn.PROPERTY){if(t===n[r])return mn}else if(e.type===zn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return mn}else if(e.type===zn.ATTRIBUTE&&n.getAttribute(r)===t+"")return mn;return Cd(e),t}});var Nh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ja={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Rd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},qh={pin:"pin",global:"global",base:"base"};function Fh(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${qh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function jh(e,t,n){switch(e){case"workflow_mode":return mo;case"spec_review_model":case"impl_review_model":return go;case"plan_review_model":return $s;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return xs;case"impl_dispatch":return Dc;case"impl_runtime":return ks;case"impl_model":return zr(n,t.impl_runtime);case"impl_effort":return Hr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return _o;case"orchestration_model":return ho(n,null);case"orchestration_effort":return Hr(n,void 0,t.orchestration_model||pn).filter(r=>r!==pn);default:return[]}}function Bh(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Fh(e.source)}
    <span class="detail-effective__k"
      >${er[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${As[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${er[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Od(e,t){let n=ra.flatMap(a=>a.keys),r=oa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Bc(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${Uh(s)}</span
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
          ${ra.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=bs({key:u.key,choices:jh(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Bh(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${kr(e.preset_id)}
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
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Uh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Wh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Ld(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Wh(r.exec_receipt),u=a?Mn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=gs(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,m=typeof h=="number"?`PR #${h}`:"PR",k=yo(n),L=k!==null&&t.isChipOpen?.("rec")===!0,j=L?fa({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${i?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${i}
            target="_blank"
            rel="noreferrer"
            >${m}</a
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
      ${k?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${k.state}
            aria-expanded=${L?"true":"false"}
            title=${Es(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${j?Ur(j):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${zh(s).map(H=>Hh(H,n,o,{label:H.id==="pr"?m:H.label,href:H.id==="pr"?i:""}))}
    </div>
  </section>`}function zh(e){let n=typeof e=="string"&&Object.hasOwn(Ja,e)&&Ja[e]||Ja.spec_backed;return Nh.filter(r=>n.includes(r.id))}var _i={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Hh(e,t,n,r){let o=Gh(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?_i.stale:l?_i.on:a?_i.current:_i.none,h=Kh(e,n),m=`${r.label} \xB7 ${f}${h?` \xB7 ${h}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,L=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${m}
      >${L}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${L}</span
  >`}function Gh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Kh(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Rd,n)?Rd[n]:""}function mi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Id(e){return mi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Dd(e,t){let n=e&&e[t];if(!mi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Id),o=Id(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Nd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function gi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Nd(e)}${t}`}function Jr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Nd(e)}`}function Yh(e,t,n){if(n!==null){let o=e==="claude"?gi:Jr,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Jr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Pd(e,t){if(!mi(e)||e.state!=="usable"||!mi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Md(e){let t=e.provider_key==="claude"?gi:Jr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Yh(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function qd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Md({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Dd(t,"claude"),selected:o,workspace_default:Pd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Md({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Dd(t,"codex"),selected:s,workspace_default:Pd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Vh(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Xh(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function hi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(L){L.key==="Escape"&&o&&(L.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Vh(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>m()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${s==="loading"?c`<div class="mv__status">불러오는 중…</div>`:s==="pending"?c`<div class="mv__status">${a}</div>`:s==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${or(i)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){rt(d(),e)}async function h(L,j={}){o=L,s="loading",i="",l=null,a="",f();let H=j.workspace||(n?n():"");if(!H){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let se="/api/doc?workspace="+encodeURIComponent(H)+"&path="+encodeURIComponent(L);try{let Q=await r(se),F=await Q.json().catch(()=>({}));if(!Q.ok||!F||F.ok!==!0){if(F?.error==="not_found"&&j.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||Q.status)+")",f();return}let D=Xh(String(F.content||""));l=D.front,i=D.body,s="ready",f()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){o=null,rt(c``,e)}function k(){document.removeEventListener("keydown",u),m()}return{open:h,close:m,destroy:k}}var Qh=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Bd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",bi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Zh=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Fd(e){return typeof e=="string"&&Zh.has(e)}var Jh=["running","done","failed","interrupted"],eb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function tb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function nb(e){let t=Yt(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=jr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Bd}
          >부분 집계</span
        >`:""}`}function jd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function nl(e){if(typeof e=="number")return Ho(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ho(t):""}function rb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function ob(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function el(e){return e===null||typeof e=="string"&&e.trim().length>0}function tl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function sb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!bi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?el(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||el(t.effort))||!(!("agent_type"in t)||el(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Jh.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!tl(t.started_at)||!tl(t.last_event_at)||!tl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function ib(e,t,n){let o=Yt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${nl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${nl(n.completed_at)}</span
        >`:""}
    ${o?c`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function ab(e,t,n,r){let o=e.status==="running"?null:t,i=(o?Yt({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Ho(e.last_event_at):o?nl(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,rb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=ob(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${eb[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${a}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${l?c`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function lb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function cb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let f=sb(d);!f||o.has(f.launch_id)||Fd(f.agent_type)||(o.add(f.launch_id),r.push(f))}r.sort((d,f)=>(d.started_at||0)-(f.started_at||0));let i={};for(let{role:d,provider:f}of bi){let h=t?t.roles[d]?.[f]:null;i[d]=h?[...h.legs]:[]}let l=bi.flatMap(({role:d})=>i[d]),a=new Set,u=[];for(let{role:d,provider:f}of bi){for(let h of r.filter(m=>m.role===d&&m.provider===f)){let m=l.find(k=>k.receipt_id===h.launch_id)||null;m&&!lb(h,m)||(m&&a.add(m.receipt_id),u.push(ab(h,m,e.attempt_id,n)))}for(let h of i[d])!a.has(h.receipt_id)&&!Fd(h.agent_type)&&u.push(ib(d,f,h))}return u}function ub(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Qh,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${tb(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Bd}</span>`:""}
  </div>`}var db={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ho(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function pb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var fb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function _b(e,t){let n=fb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Yi(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${po(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Ho(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Ud(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,k)=>k.index-m.index)],l=i.map(m=>_b(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let L=typeof m.session_id=="string"&&m.session_id.length>0,j=u.has(m.attempt_id),H=L&&!j,se=L?j?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!H}
      title=${se}
      @click=${Q=>{Q.stopPropagation(),H&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let L=m.cause_detail,j=L&&typeof L.reason=="string"&&L.reason.length>0?typeof L.command=="string"&&L.command.length>0?`${L.reason} \xB7 ${L.command}`:L.reason:m.cause;return c`<div class="detail-session__cause" title=${j}>
      ${m.cause}
    </div>`},h=m=>{let k=jd(Zi(m));if(Yt(k).length===0&&!jr(m.usage))return"";let L=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${L?"true":"false"}
      title=${L?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${j=>{j.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${nb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let k=Zi(m),L=jd(k),j=Yt(L);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${db[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${co(m)?c`<span
                  class="detail-session__resumed"
                  title=${co(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${gr(m)}</span>
            ${j.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${j.length>0?j.map(H=>c`<span
                      class="detail-session__usage"
                      title=${H.tooltip}
                      >${H.label}</span
                    >`):jr(m.usage)?c`<span class="detail-session__usage"
                    >${jr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ho(m.started_at)}</span>
          </button>
          ${h(m)} ${d(m)} ${f(m)} ${pb(m)}
          ${a.has(m.attempt_id)&&m.usage?ub(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${cb(m,k,t)}
        </div>`})}
    </div>
  `}function Wd(e,t={}){return c`
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
          ${mb(e)}
        </div>`:""}
  `}function mb(e){let t=Qr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Gn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=pi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Gn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Gn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var gb=["open","in_progress","deferred","resolved","closed"],hb=[0,1,2,3,4];function zd(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},h="",m=!1,k=[],L=!1,j={},H={claude:null,codex:null},se=null,Q=null,F=0,D=!1,M=!1,U="",V="",re="",N="",G=!1;function W(){D=!1,M=!1,U="",V="",re="",N="",G=!1}function X(){H={claude:null,codex:null},se=null,Q=null,F+=1}async function Ee(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function ye(w){try{let J=await fetch(w);if(!J.ok)return null;let $=await J.json();if(!$||typeof $!="object"||!Array.isArray($.accounts))return null;let fe=$.accounts.filter(je=>je!==null&&typeof je=="object"&&!Array.isArray(je));return{accounts:fe,active:fe.find(je=>je.active===!0)||null}}catch{return null}}async function ce(w){Q=w;let J=++F,[$,fe,je]=await Promise.all([ye("/api/claude-usage"),ye("/api/codex-usage"),Ee()]);J!==F||w!==u||(H={claude:$,codex:fe},se=je,nt())}let q=[],we=null,Ae=null,A=!1,oe="",xe=!1,de=0,Le=new Set;function _e(){q=[],we=null,Ae=null,A=!1,oe="",xe=!1,de+=1,Le.clear()}async function Ne(w){if(!o)return;let J=++de;try{let $=await Promise.resolve(o("get-comments",{id:w}));if(J!==de||w!==u)return;q=Array.isArray($)?$:[],A=!1}catch{if(J!==de||w!==u)return;A=!0}nt()}function it(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(we!==u){we=u,Ae=w,Ne(u);return}w!==null&&w!==Ae&&(Ae=w,Ne(u))}function ot(w){Le.has(w)?Le.delete(w):Le.add(w),nt()}function I(w){let J=oe.trim().length===0;oe=w,J!==(w.trim().length===0)&&nt()}async function ae(){let w=oe.trim();if(!o||!u||w.length===0||xe)return;let J=u;xe=!0,nt();let $=!1;try{let fe=await Promise.resolve(o("add-comment",{id:J,text:w}));Array.isArray(fe)&&fe.length>0&&($=!0,J===u&&(q=fe,A=!1,oe="",Ae=fe.length))}catch{$=!1}$||be("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),J===u&&(xe=!1),nt()}let le={onToggle:ot,onDraftInput:I,onSubmit:ae},ie=t.mdViewer||null,ke=null;ie||(ke=document.createElement("div"),ke.className="md-viewer-root",document.body.appendChild(ke));let pe=ie||hi(ke,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),qe=document.createElement("div");qe.className="session-log-root",document.body.appendChild(qe);let Ge=Zr(qe,{transport:o?(w,J)=>Promise.resolve(o(w,J)):void 0,sessionLogStore:a}),Xe=!1,Pe=!1,Y=!1,B=null,Me=null,at=0;function Qe(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function v(){Xe=!1,Pe=!1,Y=!1,B=null,Me=null,at+=1}async function z(w){if(!o)return;let J=++at;Pe=!0,Y=!1,nt();try{let $=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(J!==at)return;!$||typeof $!="object"||Array.isArray($)?Y=!0:(B=$,Me=Qe(w))}catch{J===at&&(Y=!0)}finally{J===at&&(Pe=!1,nt())}}let Te=[],Ce=null,Fe=0;function Ue(w,J){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${J}`}function dt(){Te=[],Ce=null,Fe+=1}async function yt(w,J){if(!o)return;let $=++Fe,fe;try{fe=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{fe=null}$!==Fe||J!==Ce||(Te=fe&&Array.isArray(fe.sessions)?fe.sessions:[],nt())}function Lt(){if(!o||!u)return;let w=d&&d.metadata,J=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(J===null){dt();return}let $=Ue(u,J);Ce!==$&&(Te=[],Ce=$,yt(u,$))}function St(){if(Xe=!Xe,Xe&&u&&Me!==Qe(u)){B=null,z(u);return}nt()}function gt(){if(!i||!u)return[];let w=i.get();return(w&&w.attempts?Object.values(w.attempts):[]).filter($=>$&&$.bead_id===u).sort(($,fe)=>(fe.started_at||0)-($.started_at||0)).map($=>({attempt_id:$.attempt_id,bead_id:$.bead_id,status:$.status,started_at:typeof $.started_at=="number"?$.started_at:null,runner:$.runner||null,model:$.model||null,effort:$.effort||$.observed_effort||null,speed:$.speed||null,session_id:$.session_id||null,resumed_from:$.resumed_from||null,continuation_mode:$.continuation_mode||null,dismissed_at:typeof $.dismissed_at=="number"?$.dismissed_at:null,cause:typeof $.cause=="string"?$.cause:null,cause_detail:$.cause_detail||null,exec_default_preset_id:typeof $.exec_default_preset_id=="string"?$.exec_default_preset_id:null,exec_default_preset_revision:typeof $.exec_default_preset_revision=="number"?$.exec_default_preset_revision:null,exec_values:$.exec_values&&typeof $.exec_values=="object"?$.exec_values:null,usage:$.usage||null,usage_legs:Array.isArray($.usage_legs)?$.usage_legs:[],delegation_sessions:Array.isArray($.delegation_sessions)?$.delegation_sessions:[]}))}function Be(){if(!i||!u)return null;let w=i.get();return Fn(w&&w.attempts||{},u)}let P=new Set;function ne(w){P.has(w)?P.delete(w):P.add(w),nt()}function he(w){let J=i?i.get():null,$=J&&J.attempts?J.attempts[w]:null;Ge.open({attempt_id:w,meta:$?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}})}function R(w,J){let $=i?i.get():null,fe=$&&$.attempts?$.attempts[w]:null,et=(fe&&Array.isArray(fe.delegation_sessions)?fe.delegation_sessions:[]).find(_t=>_t&&typeof _t=="object"&&_t.launch_id===J);et&&Ge.open({attempt_id:w,launch_id:J,meta:{runner:et.provider==="claude"?"claude":"codex",role:et.role,...typeof et.agent_type=="string"?{agent_type:et.agent_type}:{},model:et.model,effort:et.effort,session_id:et.session_id,status:et.status}})}async function K(w){if(!o||!w)return;let J=await Nr();if(J===null)return;let $=()=>{let _t=i?i.get():null;return _t&&typeof _t.revision=="number"?_t.revision:0},fe=async(_t={},Ye=$())=>await o("worker-attempt-resume",{attempt_id:w,expected_revision:Ye,...J!==""?{instructions:J}:{},..._t}),je=_t=>{_t?.queue&&i?.set&&i.set(_t.queue)},et=await fe();if(je(et),et&&et.conflict){let _t=et.queue&&typeof et.queue.revision=="number"?et.queue.revision:$();et=await fe({},_t),je(et)}et=await Nn(et,(_t,Ye)=>fe({continuation:_t,decision_token:Ye}),{onResult:je,refresh:()=>fe()}),et&&et.resumed===!1&&!et.conflict&&et.reason&&be(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${et.reason}`,"error",2400)}function Ie(w){!w||!u||Ge.open(qr(w,u,d&&d.status))}let We={onOpen:he,onOpenDelegation:R,onResume:K,onToggleUsage:ne,onOpenSessionRef:Ie,onCopyResumeCommand:It};function De(){let w=i?i.get():null,J={...j};for(let $ of["orchestration_model","orchestration_effort","orchestration_speed"]){let fe=w&&w[$];typeof fe=="string"&&(J[$]=fe)}return J}async function Je(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));j=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{j={}}nt()}}function Re(){let w=i?i.get():null;return w&&w.runner_catalog||null}function ze(){let w=i?i.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function Ze(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},$=un({pin:{...w,...f},global:De(),execution_defaults:ze(),runner_catalog:Re(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return yn(Re(),$)}function ft(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function He(w){return w?.compatible===!1}function kt(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function Nt(){let w=ft(),J=w?.presets.find($=>$.id===h);if(!(!o||!u||!w||!J||He(J)||m)){m=!0,k=[],nt();try{let $=await Promise.resolve(o("apply-impl-preset",Wc(u,J.id,w.revision)));if($&&$.conflict){kt($),be("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let fe=$&&Array.isArray($.issue)?$.issue[0]:$?.issue;if($&&$.applied&&fe&&typeof fe=="object"){d=fe,k=Array.isArray($.skipped_orchestration_keys)?$.skipped_orchestration_keys.filter(je=>typeof je=="string"):[];for(let je of zc)delete f[je];be(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}$&&$.error==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch($){$&&typeof $=="object"&&$.code==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,nt()}}}let tt=null;n&&n.subscribe&&(tt=n.subscribe(()=>Ut()));let Tt=null;i&&typeof i.subscribe=="function"&&(Tt=i.subscribe(()=>{u&&nt()}));let xt=null,Ct=null;function qt(){Ct&&(Ct(),Ct=null)}l&&typeof l.subscribe=="function"&&(xt=l.subscribe(()=>{u&&nt()}));function an(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",an);let Bt=Br(()=>nt());Bt.attach();function Ut(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find($=>$&&$.id===u)||w[0]||d}it(),Lt(),nt()}}function It(w){en(w).then(J=>{J?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Mt(w){w.preventDefault(),w.stopPropagation(),u&&It(u)}function Zt(w,J){w.preventDefault(),w.stopPropagation(),It(J)}function zt(w,J,$){w.preventDefault(),w.stopPropagation(),pe.open(J,{missing_state:$})}async function vt(w,J){let $=Object.hasOwn(f,w),fe=f[w];if(f[w]=J,nt(),!(!o||!u))try{let je=await Promise.resolve(o("update-exec-settings",Uc(u,w,J.length===0?null:J))),et=Array.isArray(je)?je[0]:je;if(!et||typeof et!="object"||!et.id)throw new Error("exec settings readback failed");d=et,delete f[w],nt()}catch(je){throw $?f[w]=fe:delete f[w],nt(),be("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),je}}function Xt(w){w.catch(()=>{})}async function ve(w,J){let $=d||{},fe=$.metadata&&typeof $.metadata=="object"?$.metadata:{},je={};for(let Ye of["impl_runtime","impl_model","impl_effort"])je[Ye]=Object.hasOwn(f,Ye)?f[Ye]:typeof fe[Ye]=="string"?fe[Ye]:"";je[w]=J;let et=Kc(je,Re(),Ze()),_t={};for(let Ye of["impl_runtime","impl_model","impl_effort"])_t[Ye]=f[Ye],f[Ye]=et[Ye]||"";if(nt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...et,orchestration_runtime:Ze()})).then(Ye=>{let ct=Array.isArray(Ye)?Ye[0]:Ye;if(!ct||typeof ct!="object"||!ct.id)throw new Error("implementation target readback failed");d=ct;for(let hn of["impl_runtime","impl_model","impl_effort"])delete f[hn];nt()}).catch(Ye=>{for(let ct of["impl_runtime","impl_model","impl_effort"])_t[ct]===void 0?delete f[ct]:f[ct]=_t[ct];throw nt(),be("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ye})}async function T(w,J,$){if(!o||!u)return!1;try{let fe=await Promise.resolve(o(w,J)),je=Array.isArray(fe)?fe[0]:fe;return je&&typeof je=="object"&&je.id?(d=je,!0):(be($,"error"),!1)}catch(fe){return fe&&typeof fe=="object"&&fe.code==="bd_readback_failed"?(be("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(be($,"error"),!1)}}function te(w){setTimeout(()=>{try{let J=e.querySelector(w);J&&typeof J.focus=="function"&&J.focus()}catch{}},0)}function y(){D=!0,U=d&&d.title||"",nt(),te('.detail-edit__input[data-edit="title"]')}function p(w){U=w.target.value}function _(){D=!1,U="",nt()}function S(){T("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(J=>{J===!0&&(D=!1,U=""),nt()})}function O(){M=!0,V=d&&d.description||"",nt(),te('.detail-edit__textarea[data-edit="description"]')}function Z(w){V=w.target.value}function ue(){M=!1,V="",nt()}function me(){T("edit-text",{id:u,field:"description",value:V},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(J=>{J===!0&&(M=!1,V=""),nt()})}function ge(w,J,$,fe){if(w.key==="Escape"){w.stopPropagation(),$();return}w.key==="Enter"&&(!fe||w.ctrlKey||w.metaKey)&&(w.preventDefault(),J())}function st(w){let J=w.target.value;T("update-status",{id:u,status:J},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>nt())}function ut(w){let J=Number(w.target.value);T("update-priority",{id:u,priority:J},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>nt())}function Ht(w){re=w.target.value}function wt(){let w=re.trim();w.length!==0&&T("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(J=>{J===!0&&(re=""),nt()})}function x(w){if(w.key==="Escape"){w.stopPropagation(),re="",nt();return}w.key==="Enter"&&(w.preventDefault(),wt())}function C(w){T("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>nt())}let Se={onCopyPath:Zt,onOpenDoc:zt};function g(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function b(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function E(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function ee(w,J){let $=$e(J),fe=[];return w.length>0&&fe.push(w),$&&fe.push($),fe.length>0?fe.join(`
`):void 0}function $e(w){if(!w||typeof w!="object")return;let J=typeof w.status=="string"?w.status:"",$=typeof w.title=="string"?w.title:"";return J.length>0&&$.length>0?`${J} \xB7 ${$}`:void 0}function Oe(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Ke(){return t.depCandidates?t.depCandidates():null}async function ht(w,J,$){let fe=Oe(),je=u;if(!je)return;if(fe.length===0){be("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let et=await T(w,{a:je,b:J,view_id:je,root_dir:fe},$),_t=et===!0||et!==!1&&et.saved===!0;_t&&t.onDepChanged&&t.onDepChanged({type:w,a:je,b:J}),w==="dep-add"&&_t&&(N="",G=!1),nt()}function Ft(w){if(!u)return;let J=globalThis.confirm;typeof J=="function"&&!J(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||ht("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Gt(w){w.disabled||ht("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function fn(w){N=w.target.value,G=!0,nt()}function lr(){G||(G=!0,nt())}function Sn(w,J){if(w.key==="Escape"){w.stopPropagation(),N="",G=!1,nt();return}w.key==="Enter"&&(w.preventDefault(),J.length===1&&!J[0].disabled&&Gt(J[0]))}function On(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${N}
        @focus=${lr}
        @input=${fn}
        @keydown=${J=>Sn(J,w)}
      />
      ${G||N.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(J=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${J.bead_id}
                      ?disabled=${J.disabled}
                      title=${Qt(J.reason)}
                      @click=${()=>Gt(J)}
                    >
                      <span class="detail-dep-add__repo"
                        >${J.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${J.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${J.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Ln(w,J){let $=J.get(w.id),fe=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${Qt(w.title)}
          @click=${()=>$===void 0?s(w.id):s(w.id,$)}
        >
          ${w.label}
        </button>`:c`<span class="detail-dep__link" title=${Qt(w.title)}
          >${w.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${w.kind}${s?" detail-dep--link":""}`}
      >${fe}${w.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>Ft(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Kt(w){let J=Array.isArray(w.dependencies)?w.dependencies:[],$=Array.isArray(w.dependents)?w.dependents:[],fe=[];for(let Ye of J){let ct=g(Ye);ct.length>0&&b(Ye)==="blocks"&&fe.push({id:ct,label:`\u26D3 ${ct}`,kind:"pred",title:ee("\uB9C9\uB294",Ye)})}for(let Ye of $){let ct=g(Ye);ct.length>0&&b(Ye)==="blocks"&&fe.push({id:ct,label:`\u2192 ${ct}`,kind:"succ",title:ee("\uB9C9\uD788\uB294",Ye)})}for(let Ye of J){let ct=g(Ye),hn=b(Ye);if(ct.length>0&&hn!=="blocks"){let ml=E(hn);fe.push({id:ct,label:`${ml.glyph}${ct}`,kind:"other",title:ee(ml.relation,Ye)})}}let je=Ke(),et=new Map;if(je)for(let Ye of je.issues)et.has(Ye.bead_id)||et.set(Ye.bead_id,Ye.root_dir);let _t=je&&u?Bu(ju(u,je),N):[];return c`
      <div class="detail-section-label">의존성</div>
      ${fe.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${fe.map(Ye=>Ln(Ye,et))}
          </div>`}
      ${je===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:On(_t)}
    `}function Kn(w){let J=w.metadata||{},$=w.workflow||{},fe=$.stages||{},je=fe.spec&&fe.spec.stale,et=fe.impl&&fe.impl.stale,_t=$.quick_fix_review?.state==="stale",Ye=fe.plan||null,ct=$.route_source==="derived",hn=$.route||J.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ct?" detail-kv__v--derived":""}"
          title=${ct?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ct?"unset":hn}</span
        >
      </div>
      ${$.route!=="quick_fix"||Object.hasOwn(J,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${J.spec_review||"\uC5C6\uC74C"}${je?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ye?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ye?.approval_receipt||"\uC5C6\uC74C"}${Ye?.approval_state==="stale"?" \xB7 stale":Ye?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${$.route!=="quick_fix"||Object.hasOwn(J,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${J.impl_review||"\uC5C6\uC74C"}${et?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${$.resolver.attempt} \xB7 ${$.resolver.prior_sha} \u2192 ${$.resolver.sha}`}
              >${`${$.resolver.prior_sha.slice(0,7)} \u2192 ${$.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${$.route==="quick_fix"||Object.hasOwn(J,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${J.quick_fix_review||"\uC5C6\uC74C"}${_t?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${$.planned_execution.kind}</span>
            </div>
            ${$.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${$.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${$.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Mn($.exec_receipt)}</span
            >
          </div>`:""}
      ${$.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${$.impl_entry.actor}@${$.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${J.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${J.pr_url}</span>
          </div>`:""}
    `}let In={route:["quick_fix","spec_backed","full_plan"]};async function Yn(w,J){let $=J.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&$!=="full_plan"&&!window.confirm(`full_plan \u2192 ${$||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){nt();return}await T("update-workflow-meta",{id:u,key:w,value:$},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),nt()}function Dn(w){let J=w.metadata||{};return c` ${((fe,je)=>{let et=In[fe],_t=typeof J[fe]=="string"?J[fe]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${fe}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${fe}
          data-edit=${`wfmeta-${fe}`}
          @change=${Ye=>Yn(fe,Ye)}
        >
          <option value="" ?selected=${!et.includes(_t)}>
            ${je}
          </option>
          ${et.map(Ye=>c`<option value=${Ye} ?selected=${_t===Ye}>${Ye}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Vn(w,J){return D?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${p}
            @keydown=${$=>ge($,S,_,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${S}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${_}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${Yt(J).map($=>c`<span class="detail-usage-total" title=${$.tooltip}
              >${$.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${y}
        >
          ✎
        </button>
      </div>
    `}function Ve(w){let J=Wt(w.created_at),$=Wt(w.updated_at);return!J&&!$?c``:c`
      ${J?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${J}</span>
          </div>`:""}
      ${$?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
    `}function Dt(w,J){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${st}
        >
          ${gb.map($=>c`<option value=${$} ?selected=${$===w}>${$}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ut}
        >
          ${hb.map($=>c`<option value=${String($)} ?selected=${$===J}>
                P${$}
              </option>`)}
        </select>
      </div>
    `}function _n(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${M?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${O}
            >
              ✎
            </button>`}
      </div>
      ${M?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${V}
              @input=${Z}
              @keydown=${J=>ge(J,me,ue,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${me}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ue}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Xo(w){let J=typeof w.notes=="string"?w.notes:"";return J.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${J}</div>
    `}function eo(w){let J=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${J.map($=>c`<span class="detail-label-chip"
              >${$}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${$}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+$}
                @click=${()=>C($)}
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
            @input=${Ht}
            @keydown=${x}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${wt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Qo(){if(!u)return c``;let w=d||{},J=String(w.id||u),$=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",fe=Be(),je=w.status||"open",et=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",_t=w.description||"",Ye={...w,metadata:{...w.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Mt}
            >
              ${J}
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
          ${Vn($,fe)}
          ${Ld(Ye,{onChipToggle:ct=>Bt.toggle({bead_id:J,chip_key:ct}),isChipOpen:ct=>Bt.isOpen({bead_id:J,chip_key:ct})})}
          ${Od({metadata:Ye.metadata,workspace_values:De(),catalog:Re(),execution_defaults:ze(),expanded:L,presets:ft()?.presets||[],preset_id:h,preset_busy:m,skipped_orchestration_keys:k},{onToggle:ct=>{L=ct,nt()},onEdit:(ct,hn)=>{if(ct==="impl_runtime"||ct==="impl_model"||ct==="impl_effort"){Xt(ve(ct,hn??""));return}Xt(vt(ct,hn??""))},onPresetSelect:ct=>{h=ct,k=[],nt()},onPresetApply:()=>{Nt()}})}
          ${qd({md:Ye.metadata,catalog:H,workspace_defaults:se,handlers:{onExecChange:(ct,hn)=>Xt(vt(ct,hn))}})}
          ${Dt(je,et)} ${Ve(w)}
          ${_n(_t)}
          ${Ed(q,le,{expanded:Le,draft:oe,sending:xe,error:A})}
          ${Xo(w)} ${eo(w)} ${Kt(w)}
          ${Kn(w)} ${Dn(w)}
          ${xd(w,Se)}
          ${Wd({expanded:Xe,loading:Pe,error:Y,data:B},{onToggle:St})}
          ${Ud(gt(),We,{total:fe,expanded:P},Te)}
        </div>
      </div>
    `}function nt(){rt(Qo(),e)}return{load(w){w!==u&&(f={},h="",k=[],L=!1,W(),_e(),v(),dt(),X()),u=w,d=null,!Ct&&t.subscribeCandidates&&(Ct=t.subscribeCandidates(()=>{u&&nt()})),Ut(),Je(),Q!==w&&ce(w)},clear(){u=null,d=null,f={},h="",m=!1,k=[],L=!1,W(),_e(),v(),dt(),X(),qt(),pe.close(),Ge.close(),rt(c``,e)},destroy(){tt&&(tt(),tt=null),Tt&&(Tt(),Tt=null),xt&&(xt(),xt=null),qt(),document.removeEventListener("keydown",an),Bt.detach(),ie||(pe.destroy(),ke&&ke.parentNode&&ke.parentNode.removeChild(ke)),Ge.destroy(),qe.parentNode&&qe.parentNode.removeChild(qe),u=null,d=null,X(),h="",m=!1,k=[],_e(),v(),dt(),rt(c``,e)}}}function Hd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(o&&(h.length>0?(o.textContent=h,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var bb="(max-width: 640px)";function yi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(bb),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function yb(){return{lanes:{done:!0},areas:{}}}function Go(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function vb(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Go(r.lanes),areas:Go(r.areas)}:{lanes:Go(r),areas:{}}}catch{return null}}function Gd(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function vi(e,t=yb()){let n={lanes:Go(t.lanes),areas:Go(t.areas)},r=vb(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Gd(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Gd(e,o),i}}}function rl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function wi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function ki(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:h}=e,m=[],k=null,L=!1,j=null,H=null,se=null;function Q(){j!==null&&clearTimeout(j),j=setTimeout(()=>{j=null,L=!1},0)}function F(){return s()??null}function D(){let I=new Map,ae=o();for(let le of Array.isArray(ae)?ae:[]){if(!le||typeof le!="object")continue;let ie=le.bead_blocked_by&&typeof le.bead_blocked_by=="object"?le.bead_blocked_by:{};for(let[ke,pe]of Object.entries(ie))Array.isArray(pe)&&I.set(ke,wi(pe));for(let ke of[...Array.isArray(le.runnable)?le.runnable:[],...Array.isArray(le.session_active)?le.session_active:[]])ke&&typeof ke.bead_id=="string"&&Array.isArray(ke.blocked_by)&&ke.blocked_by.length>0&&I.set(ke.bead_id,wi(ke.blocked_by))}return I}function M(){let I=new Map,ae=new Map,le=o();for(let ie of Array.isArray(le)?le:[]){if(!ie||typeof ie!="object")continue;let ke=ie.bead_blocked_by&&typeof ie.bead_blocked_by=="object"?ie.bead_blocked_by:{};for(let[pe,qe]of Object.entries(ke))Array.isArray(qe)&&I.set(pe,wi(qe));for(let pe of Array.isArray(ie.runnable)?ie.runnable:[])pe&&typeof pe.bead_id=="string"&&Array.isArray(pe.blocked_by)&&ae.set(pe.bead_id,wi(pe.blocked_by))}for(let ie of m)for(let ke of[I,ae]){let pe=ke.get(ie.a);pe!==void 0&&ke.set(ie.a,ie.type==="dep-remove"?pe.filter(qe=>qe!==ie.b):pe.includes(ie.b)?pe:[...pe,ie.b])}return{snapshot:I,runnable:ae}}function U(){let I=D();for(let ae of m){let le=(I.get(ae.a)||[]).slice();ae.type==="dep-remove"?I.set(ae.a,le.filter(ie=>ie!==ae.b)):le.includes(ae.b)||I.set(ae.a,[...le,ae.b])}return I}function V(I=r(),ae=F()){let le=new Map;for(let Pe of Array.isArray(ae?.lanes)?ae.lanes:[]){let Y=new Map;for(let B of Array.isArray(Pe?.entries)?Pe.entries:[])B&&typeof B.bead_id=="string"&&Y.set(B.bead_id,B.dep_created_by_lane===!0);le.set(typeof Pe?.id=="string"?Pe.id:"",Y)}let ie=new Map,ke=new Map,pe=new Set,qe=new Set;for(let Pe of I.chain_lanes){let Y=le.get(Pe.lane_id);ie.set(Pe.lane_id,{status:Pe.status,entries:Pe.rows.map((B,Me)=>({bead_id:B.id,root_dir:B.root_dir,...Me===0?{}:{dep_created_by_lane:Y?.get(B.id)===!0}}))});for(let B of Pe.rows)ke.set(B.id,Pe.lane_id),B.fixed&&pe.add(B.id),B.unplaced||qe.add(B.id)}let Ge=new Map;for(let Pe of I.parallel_rows)typeof Pe.queue_index=="number"&&Ge.set(Pe.id,Pe.queue_index);for(let Pe of I.queue_groups)for(let Y of Pe.sublanes.serial)for(let B of Y.items)typeof B.queue_index=="number"&&Ge.set(B.id,B.queue_index);let Xe=M();return{blocked_by_map:U(),snapshot_blocked_by:Xe.snapshot,runnable_blocked_by:Xe.runnable,owner_of:new Map(Object.entries(I.owner_of)),cross_lanes:ie,owner_lane_of:ke,fixed_members:pe,placed_members:qe,parallel_rows:I.parallel_rows.map(Pe=>({bead_id:Pe.id,root_dir:Pe.root_dir,queue_index:Pe.queue_index??0})),parallel_raw_length:new Map(Object.entries(I.parallel_raw_length)),queue_index_of:Ge}}function re(I,ae){let le=r();for(let ke of[...le.runnable,...le.queue,...le.running,...le.pr_wait,...le.done])if(!(ke.non_occupying||ke.id!==ae)){if(ke.root_dir===I)return ke.expected_revision;break}let ie=le.queue_groups.find(ke=>ke.root_dir===I);return ie?ie.revision:0}async function N(I,ae,le,ie){if(!t)return null;let pe=await t(I,{...ae,...le?{root_dir:le}:{},expected_revision:ie});if(pe&&pe.conflict){pe.queue&&d?.(le,pe.queue);let qe=pe.queue&&typeof pe.queue.revision=="number"?pe.queue.revision:ie;pe=await t(I,{...ae,...le?{root_dir:le}:{},expected_revision:qe})}return pe&&pe.queue&&d?.(le,pe.queue),pe}async function G(I,ae,le,ie,ke){try{let pe=await N(I,ae,le,ie.get(le)??re(le,ke.bead_id));return!pe||typeof pe.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(pe.queue&&typeof pe.queue.revision=="number"&&ie.set(le,pe.queue.revision),pe.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):pe.applied===!1?(a(pe.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${pe.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):pe.queue&&typeof pe.queue.revision=="number"?pe.queue.revision:ie.get(le)??0)}catch(pe){return a(rl(pe),"error"),null}}async function W(I,ae,le=new Map){if(I.type==="worker-queue-disarm"){try{let ie=await N(I.type,I.payload,I.root_dir,le.get(I.root_dir)??re(I.root_dir,ae));ie&&ie.queue&&typeof ie.queue.revision=="number"&&le.set(I.root_dir,ie.queue.revision)}catch{}return!0}if(I.type==="worker-queue-place"||I.type==="worker-queue-reorder"||I.type==="worker-queue-remove")return await G(I.type,I.payload,I.root_dir,le,{bead_id:ae})!==null;try{return(I.type==="dep-add"||I.type==="dep-remove")&&t&&await t(I.type,{a:I.a,b:I.b,...I.root_dir?{root_dir:I.root_dir}:{}}),!0}catch(ie){return a(rl(ie),"error"),!1}}function X(I){(I.type==="dep-add"||I.type==="dep-remove")&&(m=[...m,{type:I.type,a:I.a,b:I.b}])}async function Ee(I,ae){if(!t)return{ok:!1};try{let le=await t(I.type,{...I.payload,expected_revision:ae});return!le||typeof le.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:le.revision}}catch(le){let ie=le,ke=ie&&ie.code==="conflict"?ie.details?.cross_lanes:null;return ke&&typeof ke.revision=="number"&&Array.isArray(ke.lanes)?{ok:!1,conflict:ke}:(a(rl(le),"error"),{ok:!1})}}async function ye(I,ae,le){let ie=new Map,ke=[],pe=I.ops.slice(0,I.lane_op_index),qe=I.ops.slice(I.lane_op_index);for(let Xe of pe){if(!await W(Xe,le,ie))return{done:!0};X(Xe)}let Ge=ae;for(let Xe of I.lane_ops){if(Ge===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Pe=await Ee(Xe,Ge);if(!Pe.ok)return Pe.conflict?{done:!1,conflict:Pe.conflict}:{done:!0};Ge=Pe.revision}for(let Xe of qe){if(!await W(Xe,le,ie))return{done:!0};X(Xe),Xe.type==="dep-add"&&ke.push(Xe)}for(let Xe of qu(ke))Ge=await ce(Xe,Ge);return{done:!0}}async function ce(I,ae){if(ae===null||!t)return ae;let le=I.pairs,ie=ae;for(let ke=0;ke<2;ke+=1){if(le.length===0)return ie;try{let pe=await t("monitor-lane-provenance",{lane_id:I.lane_id,pairs:le.map(qe=>({bead_id:qe.bead_id,after:qe.after,value:!0})),expected_revision:ie});return pe&&typeof pe.revision=="number"?pe.revision:ie}catch(pe){let qe=pe,Ge=qe&&qe.code==="conflict"?qe.details?.cross_lanes:null;if(!Ge||typeof Ge.revision!="number"||!Array.isArray(Ge.lanes))return ie;let Xe=Ge.lanes.find(Pe=>Pe&&Pe.id===I.lane_id);le=Fu(Array.isArray(Xe?.entries)?Xe.entries:[],le),ie=Ge.revision}}return ie}async function q(I,ae,le=[]){m=le,l("",0);let ie=r(),ke=F();for(let pe=0;;pe+=1){let qe=I(V(ie,ke));if("refused"in qe){a(qe.refused,"error");break}let Ge=await ye(qe,ie.cross_lanes_revision,ae);if(Ge.done){qe.correction&&l(qe.correction.lane_id,qe.correction.corrected);break}if(pe>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Xe=i(Ge.conflict);ie=Xe.lanes,ke=Xe.raw_lanes}m=[],u()}async function we(I,ae){await q(le=>ei(I,ae,le),I.bead_id)}function Ae(I,ae){let le=ae&&typeof ae.closest=="function"?ae.closest("[data-row-index]"):null;if(le&&I.contains(le)){let ie=Number(le.getAttribute("data-row-index"));return Number.isFinite(ie)?ie:0}return I.querySelectorAll("[data-row-index]").length}function A(I){let ae=typeof I?.closest=="function"?I.closest(".worker-pane--collapsed[data-lane]"):null;if(!ae)return null;let le=ae.getAttribute("data-lane");return le==="queue"?{zone:ae,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:le==="candidate"&&h===!0?{zone:ae,target:{kind:"candidate"}}:null}function oe(I){let ae=I.target;if(!k)return null;let le=typeof ae?.closest=="function"?ae.closest("[data-drop]"):null;if(!le)return A(ae);let ie=le.getAttribute("data-drop");if(ie==="candidate")return{zone:le,target:{kind:"candidate"}};if(ie==="parallel")return{zone:le,target:{kind:"parallel",marker_index:Ae(le,ae)}};if(ie==="chain")return{zone:le,target:{kind:"chain",lane_id:le.getAttribute("data-lane-id")||"",marker_index:Ae(le,ae)}};if(ie==="repo-serial"){let ke=le.getAttribute("data-root-dir")||"";if(ke!==k.root_dir)return null;let pe=typeof ae?.closest=="function"?ae.closest("[data-queue-index]"):null,qe=pe&&le.contains(pe)?pe.getAttribute("data-queue-index"):le.getAttribute("data-lane-length"),Ge=Number(qe);return{zone:le,target:{kind:"repo-serial",root_dir:ke,lane_id:le.getAttribute("data-lane-id")||"",index:Number.isFinite(Ge)?Ge:0}}}return null}function xe(){for(let I of Array.from(n.querySelectorAll(".is-drop-over")))I.classList.remove("is-drop-over")}function de(I){H=I.target instanceof Element?I.target:null}function Le(I){let ae=I.target,le=typeof ae?.closest=="function"?ae.closest('[draggable="true"][data-bead-id]'):null,ie=le?le.closest("[data-drag-kind]"):null;if(!ie)return;if(le&&H&&le.contains(H)&&typeof H.closest=="function"&&H.closest("input, button, a")){I.preventDefault();return}let ke=ie.getAttribute("data-bead-id")||"",pe=ie.getAttribute("data-drag-kind")||"",qe=ie.getAttribute("data-root-dir")||"";if(!ke||!pe)return;let Ge=ie.getAttribute("data-queue-index")||"",Xe=Number(Ge),Pe=ie.getAttribute("data-lane-id")||"";k={kind:pe,bead_id:ke,root_dir:qe,...Ge!==""&&Number.isFinite(Xe)?{queue_index:Xe}:{},...Pe?{lane_id:Pe}:{}},L=!0,f?.(),n.classList.add("is-dragging");try{I.dataTransfer?.setData("text/plain",ke),I.dataTransfer&&(I.dataTransfer.effectAllowed="move")}catch{}}function _e(I){let ae=oe(I);ae&&(I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move"),ae.zone.classList.add("is-drop-over"))}function Ne(I){let ae=I.target;typeof ae?.closest=="function"&&(ae.closest("[data-drop]")?.classList.remove("is-drop-over"),ae.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function it(){k=null,xe(),n.classList.remove("is-dragging"),Q()}function ot(I){let ae=oe(I),le=k;k=null,xe(),n.classList.remove("is-dragging"),!(!ae||!le)&&(I.preventDefault(),we(le,ae.target))}return{attach(I){se||(se=I,I.addEventListener("pointerdown",de),I.addEventListener("dragstart",Le),I.addEventListener("dragover",_e),I.addEventListener("dragleave",Ne),I.addEventListener("drop",ot),I.addEventListener("dragend",it))},detach(){j!==null&&(clearTimeout(j),j=null);let I=se;se=null,I&&(I.removeEventListener("pointerdown",de),I.removeEventListener("dragstart",Le),I.removeEventListener("dragover",_e),I.removeEventListener("dragleave",Ne),I.removeEventListener("drop",ot),I.removeEventListener("dragend",it))},isDragging(){return k!==null},consumeClickSuppression(){let I=L;return L=!1,I},applyDrop:we,runPlanned:q,dropModel:V,sendOp:W,sendQueueCas:G,rememberDep:X}}var ol=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Kd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function xi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function $i(e){for(let t of xi(e)){if(Object.hasOwn(Kd,t))return Kd[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Vd(e){return xi(e).length===0?null:$i(e)||"\uC2E4\uD328"}function $r(e){let t=null;for(let n of xi(e))Object.hasOwn(ol,n)&&(t=ol[n]);return t}function sr(e){let t=$i(e),n=$r(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Xd(e,t){let n=$i(e)??$i(t),r=$r(t)??$r(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var wb=new Set(["repo_operation_timeout_unresolved"]);function kb(e){for(let t of xi(e))if(wb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function $b(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Qd(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||kb(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if($b(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${br(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Yd={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Zd(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Yd,t.blocked_reason)?Yd[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=sr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=sr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function xb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var Jd=200;function Ab(e){return typeof e!="string"||e.length===0?"":e.length>Jd?`${e.slice(0,Jd)}\u2026`:e}function Sb(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Eb(e,t){if(!e||e.open!==!0)return"";let n=$r(e.cause)||sr(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${Jt(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(f=>typeof f=="string"&&f.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"";return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
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
      ${i?c`<div>
            <dt>착지 단계</dt>
            <dd>${i}</dd>
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
  </div>`}function Tb(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Cb=new Set(["codex-runner"]);function Rb(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&Cb.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?Jt(r.last_event_at,t):"",f=r?Jt(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${Jt(i,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(m=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${m.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(m=>m.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var Ob={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Lb(e){if(!e)return"";let t=Ob[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Ib(e,t,n){if(!e)return"";let r=Ab(t?.summary);return c`${r?c`<p class="rtile__held-summary">${r}</p>`:""}
    <div class="rtile__foot">
      <button
        type="button"
        class="rtile__parked-retry"
        title="이 bead를 새 attempt로 다시 디스패치합니다 (같은 세션을 잇지 않습니다)"
        aria-label="재시도"
      >
        재시도
      </button>
      ${n}
    </div>`}function sl(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(de=>de&&de.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=a&&e.failure||null,f=a||u,h=!!e.paused,m=i||f?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):h?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?xb(t-e.started_at):"\u2014",k=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,L=co(e),j=Yt(e.usage),H=qn(e.usage),se=e.conflict_resolution?h?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,Q=e.base_exception||null,F=e.landing,D=e.attempt_id&&e.attempt_id===n,M=r.monitor||null,U=Tb(M),V=qs(M?.cross_lane_chip),re=M?Ns(M.dependency_chips):"",N=Rb(M,t,h,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),G=o&&e.workflow?.chips?.exec_receipt||null,W=Fs(e.workflow),X=js(e.rec,e.chip_popover?.chip_key==="rec"),Ee=e.chip_popover?Ur(e.chip_popover.content):"",ye=G?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Mn(G)}`}
        >${`${G.kind}:${ms(G)}`}</span
      >`:"",ce=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${po(s)}</span
      >`:"",q=U||V||W||ce||ye||X?c`<div class="rtile__meta">
          ${U}${V}${W}${ce}${ye}${X}${Ee}
        </div>`:"",we=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Vd(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",Ae=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Sb(e.retry)}</span
        >`:"",A=c`${se?c`<span class="worker-mini__badge">${se}</span>`:""}${Q?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${Q}</span
      >`:""}${we}${Ae}`,oe=o?"":Kr(e),xe=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"";return c`<div
    class="rtile${D?" rtile--sel":""}${h?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${f?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Bs(e.priority)}${L?c`<span class="rtile__resumed" title=${L}>↻</span>`:""}${A}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${m}</span>`:""}${Lb(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${m}</span>`}
        ${o||f?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${xe}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${h?c`<button
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
                ${xe}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${f?Ib(a,d,xe):i?"":c`${N}${e.rollup?fs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Hi}):""}
            ${F?c`<div class="rtile__landing">
                  <span
                    class="merge-step${F.failed?" merge-step--failed":""}"
                    style=${`--progress: ${F.percent}%`}
                    >${F.label}${F.index>0?c`<span class="merge-step__n"
                          >${F.index}/${F.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${re}
            ${o?q:U||V||W||k||X||j.length>0||H?c`<div class="rtile__meta">
                    ${U}${V}${W}${Ms(e.exec_chips)}${X}
                    ${j.length>0?j.map(de=>c`<span
                              class="worker-usage"
                              title=${de.tooltip}
                              >${de.label}</span
                            >`):H?c`<span
                            class="worker-usage"
                            title=${fo(e.usage)}
                            >${H}</span
                          >`:""}${Ee}
                  </div>`:""}
            ${Ls(e)} ${oe}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||h?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Eb(l,t)}
  </div>`}function Db(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function ep(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>sl(o,t,n,{monitor:Db(o)}))}
  </div>`}var Vt="",Pb=["impl_runtime","impl_model","impl_effort"],Mb=["claude_account","codex_account"],Nb=5,Ai=1;function cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Si(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(P=>be(P,"error",4e3)),s={},i={},l=[],a=!1,u={state:"absent",values:{},warnings:[]},d={},f={},h=Promise.resolve(),m={claude:null,codex:null},k=!1,L=null,j={},H="",se="",Q=!1,F=!1,D=!1,M=null,U=!1;function V(){let P=t.queue?t.queue():null;return cn(P)?P:null}function re(){let P=V();return P?P.runner_catalog:null}function N(){let P=V();return P&&cn(P.execution_defaults)?P.execution_defaults:null}function G(){let P=t.implPresetStore?.get();return cn(P)&&Array.isArray(P.presets)?P:null}function W(){return r===null?{}:{root_dir:r}}async function X(P,ne){return U||!n?null:await n(P,ne)}function Ee(P){P&&cn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function ye(P,ne){let he=V();if(!he||U)return null;let R=await X(P,{...ne,...W(),expected_revision:he.revision});if(Ee(R),r!==null&&R&&R.conflict){let K=R.queue&&typeof R.queue.revision=="number"?R.queue.revision:V()?.revision??he.revision;R=await X(P,{...ne,...W(),expected_revision:K}),Ee(R)}return R}async function ce(){a=!0,Be();try{let P=await X("get-session-defaults",{...W()});s=cn(P?.values)?{...P.values}:{},i={...s},l=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{a=!1,Be()}}async function q(){let P=Fc(s,i);if(Object.keys(P).length!==0){try{let ne=await X("set-session-defaults",{values:P,...W()});s=cn(ne?.values)?{...ne.values}:{},i={...s},l=Array.isArray(ne?.warnings)?ne.warnings:[]}catch(ne){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}Be()}}function we(P,ne){if(!cn(P))return;let he=P.state;u={state:he==="usable"||he==="unusable"||he==="absent"?he:"absent",values:cn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},f={...u.values},ne&&(d={...f})}async function Ae(){try{we(await X("get-workspace-accounts",{...W()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},f={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}Be()}async function A(P){try{let ne=await fetch(P);if(!ne.ok)return null;let he=await ne.json();if(!cn(he)||!Array.isArray(he.accounts))return null;let R=he.accounts.filter(K=>cn(K)&&typeof K.key=="string"&&K.key.length>0&&typeof K.email=="string"&&K.email.length>0);return{accounts:R,active:R.find(K=>K.active===!0)||null}}catch{return null}}async function oe(){k=!0;let[P,ne]=await Promise.all([A("/api/claude-usage"),A("/api/codex-usage")]);U||(m={claude:P,codex:ne},Be())}function xe(){let P={};for(let ne of Mb){let he=Object.hasOwn(d,ne)?d[ne]:null,R=Object.hasOwn(f,ne)?f[ne]:null;he!==R&&(P[ne]=he)}return P}async function de(){let P=xe();if(Object.keys(P).length!==0){try{we(await X("set-workspace-accounts",{values:P,...W()}),!1)}catch(ne){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}Be()}}function Le(P,ne){ne===Vt?delete d[P]:d[P]=ne,Be(),h=h.then(()=>de())}function _e(P,ne){if(Pb.includes(P)){ot(P,ne);return}ne===Vt?delete i[P]:i[P]=ne,Be(),q()}function Ne(){let P=St().orchestration_model,ne=un({global:{orchestration_model:P??void 0},execution_defaults:N(),runner_catalog:re()}).orchestration_model.value;return ne?yn(re(),ne):null}function it(P,ne){typeof ne=="string"&&ne.length>0?i[P]=ne:delete i[P]}function ot(P,ne){let he=ne===Vt?void 0:ne,R=Nc({impl_runtime:P==="impl_runtime"?he:i.impl_runtime,impl_model:P==="impl_model"?he:i.impl_model,impl_effort:P==="impl_effort"?he:i.impl_effort},re(),Ne());it("impl_runtime",R.impl_runtime),it("impl_model",R.impl_model),it("impl_effort",R.impl_effort),Be(),q()}async function I(){let P=V();if(!P)return;let ne={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},he=jc(ne,{...ne,...j});if(Object.keys(he).length!==0){try{let R=await ye("worker-queue-set-orchestration-defaults",{values:he});if(R&&R.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}j={}}catch(R){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}Be()}}function ae(P,ne){j[P]=ne===Vt?null:ne,Be(),I()}function le(P){if(L=P,!P){Be();return}let ne=re(),he=St(),R=he.orchestration_model;R&&!ho(ne,P).includes(R)&&(j.orchestration_model=null,R=null);let K=he.orchestration_effort;K&&!ta(ne,P,R||pn).includes(K)&&(j.orchestration_effort=null),Be(),I()}async function ie(P){if(!(!V()||P<Ai)){try{await ye("worker-queue-set-slots",{slots:P})}catch(ne){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}Be()}}async function ke(P){if(!(!V()||P<Ai||P>Nb)){try{await ye("worker-queue-set-serial-lane-count",{count:P})}catch(ne){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}Be()}}async function pe(P,ne){let he=P==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await ye(he,{on:ne})}catch(R){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}Be()}function qe(){let P={},ne=St();for(let he of Wr){let R=Bn.includes(he)?ne[he]:i[he];typeof R=="string"&&R.length>0&&(P[he]=R)}return P}async function Ge(){let P=G();if(!P)return;let ne=qe();if(Object.keys(ne).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let he=(P.presets||[]).find(K=>K.id===H),R=se.trim()||(he?he.name:"");if(!R){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let K=he?await X("impl-preset-update",{expected_revision:P.revision,id:he.id,name:R,settings:ne}):await X("impl-preset-create",{expected_revision:P.revision,name:R,settings:ne});if(K&&K.applied){if(se="",!he&&Array.isArray(K.presets)){let Ie=K.presets.find(We=>We.name===R);H=Ie?Ie.id:H}Be()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be()}catch(K){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function Xe(){let P=G();if(!(!P||H.length===0))try{let ne=await X("impl-preset-delete",{expected_revision:P.revision,id:H});ne&&ne.applied?(H="",Be()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be())}catch(ne){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}}function Pe(P){s=cn(P.values)?{...P.values}:{},i={...s},l=Array.isArray(P.warnings)?P.warnings:[],cn(P.queue)&&(t.onQueueAdopt?.(P.queue),j={})}async function Y(){let P=G(),ne=V();if(!P||!ne||H.length===0)return;let he=R=>({preset_id:H,expected_revision:P.revision,expected_queue_revision:R,...W()});try{let R=await X("apply-impl-preset-global",he(ne.revision));if(R&&R.applied&&Pe(R),r!==null&&R&&R.queue_applied===!1){let K=R.queue&&typeof R.queue.revision=="number"?R.queue.revision:V()?.revision??ne.revision;R=await X("apply-impl-preset-global",he(K)),R&&R.applied&&Pe(R)}R&&R.applied?R.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):R&&R.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(R){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}Be()}async function B(){F=!0,D=!1,Be();try{let P=await X("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?D=!0:M=P}catch{D=!0}finally{F=!1,Be()}}function Me(){if(Q=!Q,Q&&!M){B();return}Be()}function at(){let P=Qr({loading:F,error:D});if(P)return P;if(!M)return"";let ne=Array.isArray(M.variants)?M.variants:[];return c`<div class="settings-dialog__sp-body">
      ${M.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${M.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${ne.map(he=>c`<div class="settings-dialog__sp-variant" data-variant=${he.key}>
            <div class="settings-dialog__sp-cond">${he.condition}</div>
            ${Gn(he.label,he.system_prompt)}
          </div>`)}
    </div>`}function Qe(){return c`<section
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
        aria-expanded=${Q?"true":"false"}
        @click=${Me}
      >
        ${Q?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Q?at():""}
    </section>`}function v(P,ne,he,R,K,Ie,We){let De=K[P]??Vt,Je=na(P,he,K,N(),re(),We),Re=Je.options.find(Ze=>Ze.value===De),ze=De===Vt?Je.full_value:Re?.full_value;return c`<select
        class=${De===Vt?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${ne}
        title=${ze||""}
        ?disabled=${Ie===!0||Je.disabled}
        .value=${kr(String(De))}
        @change=${Ze=>R(P,String(Ze.target.value))}
      >
        <option value=${Vt} ?selected=${De===Vt}>
          ${Je.unset_label}
        </option>
        ${Je.options.map(Ze=>c`<option
              value=${Ze.value}
              title=${Ze.full_value||""}
              ?selected=${Ze.value===De}
            >
              ${Ze.label}
            </option>`)}
      </select>
      ${De===Vt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function z(P,ne,he,R,K,Ie=!1,We){return c`<div
      class=${`settings-dialog__row${Ie?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        ${v(P,ne,he,R,K,Ie,We)}
      </span>
    </div>`}function Te(P,ne){let he=ne?ne.active:null;return cn(he)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?he.email:Jr({...he,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ce(P,ne,he){let R=m[he],K=Object.hasOwn(d,P)?d[P]:Vt,Ie=he==="claude"?gi:Jr,We=!!R?.accounts.some(De=>De.key===K);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${ne}
          data-account-key=${P}
          @change=${De=>Le(P,String(De.target.value))}
        >
          <option value=${Vt} ?selected=${K.length===0}>
            ${Te(he,R)}
          </option>
          ${K.length>0&&!We?c`<option value=${K} selected>
                ${K} (목록에 없음)
              </option>`:""}
          ${R?.accounts.map(De=>c`<option value=${De.key} ?selected=${De.key===K}>
                ${Ie(De)}
              </option>`)||""}
        </select>
        ${R?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Fe(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function Ue(P,ne,he,R,K){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${ne}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${v(he,`${P} \uBAA8\uB378`,R,_e,i,!1)}
        ${v(K,`${P} effort`,xs,_e,i,!1)}
      </span>
    </div>`}function dt(P,ne,he,R){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${R?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${R?"true":"false"}
          aria-label=${ne}
          @click=${()=>pe(P,!R)}
        >
          ${R?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${he}</span>
      </span>
    </div>`}function yt(P,ne,he,R){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ne}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${ne} \uAC10\uC18C`}
            @click=${()=>R(he-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${he}</span>
          <button
            type="button"
            aria-label=${`${ne} \uC99D\uAC00`}
            @click=${()=>R(he+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Lt(P){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(ne=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ne.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ne.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ne.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ne.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${P.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function St(){let P=V(),ne={};for(let he of Bn)ne[he]=Object.prototype.hasOwnProperty.call(j,he)?j[he]:P&&typeof P[he]=="string"?P[he]:null;return ne}function gt(){let P=re(),ne=i.impl_runtime,he=i.impl_model,R=G(),K=V(),Ie=St(),We=ho(P,L),De=zr(P,void 0).filter(tt=>tt!==pn),Je=ta(P,L,Ie.orchestration_model||pn).filter(tt=>tt!==pn),Re=H?(R?.presets||[]).find(tt=>tt.id===H):null,ze=Re?qc(qe(),cn(Re.settings)?Re.settings:{}):null,Ze=K&&typeof K.slots=="number"?K.slots:Ai+1,ft=K&&typeof K.serial_lane_count=="number"?K.serial_lane_count:Ai,He=N()?.supported===!0,kt=Fe(),Nt=na("workflow_mode",mo,i,N(),P);return c`
      ${l.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${kt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${kt}
          </div>`:""}
      ${He?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${a?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${kr(H)}
                @change=${tt=>{H=String(tt.target.value),Be()}}
              >
                <option value="" ?selected=${H===""}>
                  실행 프리셋…
                </option>
                ${(R?.presets||[]).map(tt=>c`<option
                      value=${tt.id}
                      ?selected=${tt.id===H}
                    >
                      ${tt.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ze||ze.rows.length===0}
                @click=${Y}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${H?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${kr(se)}
                @input=${tt=>{se=String(tt.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${H?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Ge}
              >
                ${H?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${H.length===0}
                @click=${Xe}
              >
                삭제
              </button>
            </div>
            ${ze?Lt(ze):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${kr(L||Vt)}
                    @change=${tt=>{let Tt=String(tt.target.value);le(Tt===Vt?null:Tt)}}
                  >
                    <option value=${Vt} ?selected=${!L}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${L==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${L==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${z("orchestration_model","\uBAA8\uB378",We,ae,Ie)}
              ${z("orchestration_effort","effort",Je,ae,Ie)}
              ${z("orchestration_speed","\uC18D\uB3C4",_o,ae,Ie)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Ce("claude_account","Claude","claude")}
              ${Ce("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Vt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>_e("workflow_mode",Vt)}
                    >
                      ${Nt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${mo.map(tt=>c`<button
                          type="button"
                          data-mode=${tt}
                          aria-pressed=${String(i.workflow_mode===tt)}
                          @click=${()=>_e("workflow_mode",tt)}
                        >
                          ${tt}
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
              ${Ue("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",go,"spec_review_effort")}
              ${Ue("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",$s,"plan_review_effort")}
              ${Ue("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",go,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${z("impl_runtime","\uC704\uC784 \uB300\uC0C1",ks,_e,i)}
              ${z("impl_model","\uBAA8\uB378",zr(P,ne),_e,i)}
              ${z("impl_effort","effort",Hr(P,ne,he),_e,i)}
              ${z("impl_speed","\uC18D\uB3C4",_o,_e,i)}
              ${z("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",De,_e,i,!1,{...i,...Ie})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${dt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",K?.auto_advance===!0)}
              ${dt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",K?.auto_merge===!0)}
              ${yt("slots","\uB3D9\uC2DC \uC2E4\uD589",Ze,tt=>ie(tt))}
              ${yt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",ft,tt=>ke(tt))}
            </div>
            ${Qe()}
          `}
    `}function Be(){U||rt(gt(),e)}return{load(){j={};let P=[ce(),Ae()];return k||P.push(oe()),Promise.all(P).then(()=>{})},render:Be,sessionDraft:()=>({...i}),destroy(){U=!0,rt(c``,e)}}}function Ei(e){return c`<svg
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
  </svg>`}function tp(){return Ei(io`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function np(){return Ei(io`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function rp(){return Ei(io`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function op(){return Ei(io`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function sp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ip(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Yt(vs(t));let n={};for(let l of Cn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Cn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?qn(n):null}function An(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function il(e,t){let n=An(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function qb(e,t){if(!An(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Fb(e){if(!An(e)||!An(e.execution_defaults)||!An(e.runner_catalog)||!An(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=un({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=yn(e.runner_catalog,n.orchestration_model.value??""),o=Gr(n,e.runner_catalog),s=hr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function ap(e,t){let n=t.notify||(A=>be(A,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,f=null,h=new Map;function m(){let A=t.workspacesState?t.workspacesState():[];return Array.isArray(A)?A.filter(oe=>An(oe)):[]}function k(A){return m().find(oe=>oe.root_dir===A)||null}function L(A){return qb(k(A),h.get(A))}function j(){for(let A of m()){let oe=h.get(A.root_dir);oe&&typeof oe.revision=="number"&&typeof A.revision=="number"&&A.revision>=oe.revision&&h.delete(A.root_dir)}}async function H(A,oe,xe){let de=t.transport,Le=L(oe);if(!(!de||!An(Le))){try{let _e=await de(A,{...xe,root_dir:oe,expected_revision:Le.revision});if(An(_e?.queue)&&h.set(oe,_e.queue),_e&&_e.conflict){let Ne=An(_e.queue)&&typeof _e.queue.revision=="number"?_e.queue.revision:L(oe)?.revision;_e=await de(A,{...xe,root_dir:oe,expected_revision:Ne}),An(_e?.queue)&&h.set(oe,_e.queue)}}catch(_e){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${_e instanceof Error?_e.message:String(_e)}`)}q()}}function se(A){u!==A&&(u=A,t.onFocusChange?.(u),q())}function Q(A){se(u===A?null:A)}function F(A){if(d===A){M();return}D(),d=A;let oe=k(A);i.textContent=`${oe?.name||A} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Si(a,{root_dir:A,queue:()=>L(A),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:xe=>{h.set(A,xe),q()}}),f.load(),q()}function D(){f?.destroy(),f=null}function M(A){D(),d=null,o.hidden=!0,i.textContent="",A!==!0&&q()}let U=()=>M();l.addEventListener("click",U);function V(A){A.key==="Escape"&&u!==null&&se(null)}document.addEventListener("keydown",V);function re(A,oe){let xe=Math.max(oe,A,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${oe}\uAC1C \uC911 ${A}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:xe},(de,Le)=>Le<A?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function N(A){let oe=A.auto_advance===!0,xe=A.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${oe?" is-on":""}`}
        data-act="auto"
        aria-pressed=${oe?"true":"false"}
        aria-label=${`${A.name} \uC790\uB3D9\uD654`}
        title=${oe?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${oe?np():tp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${xe?" is-on":""}`}
        data-act="merge"
        aria-pressed=${xe?"true":"false"}
        aria-label=${`${A.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${xe?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${rp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===A.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===A.root_dir?"true":"false"}
        aria-label=${`${A.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${op()}
      </button>`}function G(A){let oe=Fb(A);return oe?c`<div class="mon2-deck__chips">
      ${oe.orchestration?c`<span class="mon2-deck__chip" title=${oe.orchestration.title}
            >오케 ${oe.orchestration.text}</span
          >`:""}
      ${oe.worker?c`<span class="mon2-deck__chip" title=${oe.worker.title}
            >워커 ${oe.worker.text}</span
          >`:""}
    </div>`:""}function W(A){let oe=[];for(let[xe,de]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Le=il(A,xe);Le>0&&oe.push(`${de} ${Le}`)}return oe.join(" \xB7 ")}function X(A){let oe=il(A,"running"),xe=typeof A.slots=="number"?A.slots:1;return c`<div
      class=${`mon2-deck__tile${u===A.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${A.root_dir}
      aria-pressed=${u===A.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${A.root_dir}>${A.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${xe}\uAC1C \uC911 ${oe}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${oe}/${xe}</span>
          ${re(oe,xe)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${A.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${N(A)}</div>
        <span class="mon2-deck__counts">${W(A)}</span>
        ${G(A)}
      </div>
    </div>`}function Ee(A){let oe=t.doneItems?t.doneItems():[],xe=t.rangeLabel?t.rangeLabel():"",de=ip(Array.isArray(oe)?oe:[]),Le=_e=>A.reduce((Ne,it)=>Ne+il(it,_e),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${A.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${xe}`}
        >실행 ${Le("running")} · 대기 ${Le("queue")} · PR
        ${Le("pr_wait")}${Le("session_active")>0?` \xB7 \uC138\uC158 ${Le("session_active")}`:""}
        · ${xe} 완료
        ${Array.isArray(oe)?oe.length:0}</span
      >
      ${de===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof de=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${sp(xe)}
                  >${de}</span
                >`:de.map(_e=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${_e.provider}
                      title=${_e.tooltip}
                      >${_e.label}</span
                    >`)}
          </span>`}
    </div>`}function ye(){let A=m();return A.length===0?"":c`${Ee(A)}
      <div class="mon2-deck__strip">
        ${A.map(oe=>X(oe))}
      </div>`}function ce(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function q(){j(),ce(),d!==null&&!k(d)&&M(!0),rt(ye(),r),f?.render()}function we(A){let oe=A.target;if(!oe||typeof oe.closest!="function")return;let xe=oe.closest("[data-root-dir]");if(!xe)return;let de=xe.getAttribute("data-root-dir")||"",Le=oe.closest("[data-act]")?.getAttribute("data-act");if(Le==="worker"){t.gotoWorkerTab?.(de);return}if(Le==="auto"){H("worker-automation-toggle",de,{on:L(de)?.auto_advance!==!0});return}if(Le==="merge"){H("worker-merge-auto-toggle",de,{on:L(de)?.auto_merge!==!0});return}if(Le==="gear"){F(de);return}Q(de)}function Ae(A){if(A.key!=="Enter"&&A.key!==" ")return;let oe=A.target;if(!oe||typeof oe.closest!="function")return;let xe=oe.closest('[data-root-dir][role="button"]');!xe||xe!==oe||(A.preventDefault(),Q(xe.getAttribute("data-root-dir")||""))}return r.addEventListener("click",we),r.addEventListener("keydown",Ae),{render:q,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",V),r.removeEventListener("click",we),r.removeEventListener("keydown",Ae),l.removeEventListener("click",U),D(),rt(c``,r),e.replaceChildren()}}}var jb=1e4,dp="bdui.monitor.done-range",pp="bdui.monitor.running_sort",fp="bdui.monitor.candidate_sort",_p="beads-ui.monitor.candidate-filter",mp="beads-ui.monitor.sections";function Bb(){try{let e=window.localStorage.getItem(_p);if(!e)return{...Yr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Yr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Yr.show_blocked,spec:va.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Yr}}}function lp(e){try{window.localStorage.setItem(_p,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Ub(){try{let e=window.localStorage.getItem(fp);return So.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Wb(e){try{window.localStorage.setItem(fp,e)}catch{}}function zb(){try{let e=window.localStorage.getItem(mp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Hb(e){try{window.localStorage.setItem(mp,JSON.stringify(e))}catch{}}function Gb(){try{let e=window.localStorage.getItem(dp);return e===null?"today":En(e)}catch{return"today"}}function Kb(e){try{window.localStorage.setItem(dp,e)}catch{}}function Yb(){try{return window.localStorage.getItem(pp)==="repo"?"repo":"started"}catch{return"started"}}function Vb(e){try{window.localStorage.setItem(pp,e)}catch{}}var gp="tab:monitor:pipeline",Xb=1e3,cp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Qb=["queue","runnable","done"],up="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Zb(e){return e>=1&&e<=up.length?up[e-1]:`(${e})`}function hp(e,t){let n=Et("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=Gb(),m=Yb(),k=Bb(),L=Ub(),j=zb(),H=vi("beads-ui.monitor.lane-collapsed"),se=!1,Q=null,F=null,D=null,M=null,U=Br(()=>Re()),V=null,re=null,N=null,G=null;function W(p){return G===null&&(G=I()),Cu(p,G)}function X(p,_){Ee(),!(_<=0)&&(re={lane_id:p,corrected:_},N=setTimeout(()=>{N=null,re=null,Re()},jb))}function Ee(){N!==null&&(clearTimeout(N),N=null),re=null}function ye(){let p=Er.find(_=>_.value===h);return p?p.label:""}let ce=document.createElement("div");ce.className="mon",e.appendChild(ce);let q=document.createElement("div");q.className="worker-drawer-overlay",q.hidden=!0;let we=document.createElement("div");we.className="worker-drawer-overlay__backdrop";let Ae=document.createElement("div");Ae.className="worker-drawer-host mon2-drawer",q.append(we,Ae),e.appendChild(q);let A=rr(null,null),oe=new Map,xe=new Map,de=null,Le=null,_e=null,Ne=Zr(Ae,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{F=null,q.hidden=!0,Re()}}),it=ki({transport:s,console_el:ce,getLanes:()=>A,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:xt,reproject:p=>({lanes:Je(p),raw_lanes:p}),onCorrection:X,showToast:be,requestRender:()=>Re(),adoptQueue:(p,_)=>{xe.set(p,_)},onDragBegin:()=>{D=null},candidate_drop:!0}),{applyDrop:ot,dropModel:I,runPlanned:ae,sendQueueCas:le}=it;async function ie(p,_,S,O,Z=!0){if(!s||!S)return null;let ue=await s(p,{..._,root_dir:S,expected_revision:O});if(ue&&ue.conflict&&Z){ue.queue&&xe.set(S,ue.queue);let me=ue.queue&&typeof ue.queue.revision=="number"?ue.queue.revision:O;ue=await s(p,{..._,root_dir:S,expected_revision:me})}return ue&&ue.queue&&S&&xe.set(S,ue.queue),ue}function ke(p,_){let S=xe.get(p),O=o&&o.get?o.get():null,Z=(Array.isArray(O)?O:[]).find(me=>me?.root_dir===p);return(S||Z)?.merge_queue?.find(me=>me.bead_id===_)?.continuation_action}async function pe(p,_,S,O){let Z=await ie(p,_,S,O),ue=xe.get(S)?.revision??Z?.queue?.revision??O;return Nn(Z,(me,ge)=>ie(p,{..._,continuation:me,decision_token:ge},S,ue,!1),{refresh:me=>ie(p,_,S,me?.queue?.revision??xe.get(S)?.revision??ue,!1)})}async function qe(p,_,S,O){let Z=await Nn({continuation_mismatch:O},(me,ge)=>ie("worker-merge-queue-add",{bead_id:_,continuation:me,decision_token:ge},p,S,!1)),ue=Z?.queue?.merge_queue?.find(me=>me.bead_id===_)?.continuation_action;Z?.applied!==!0&&ue?.continuation===null&&ue.mismatch&&await qe(p,_,Z.queue.revision,ue.mismatch)}async function Ge(p,_,S){let O=await ie("worker-discard",p,_,S);if(O&&O.discarded===!0){be(Ps(O),"success",5e3);return}if(O&&O.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${O.reason}`,"error");return}if(O&&O.accepted&&O.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(O&&O.accepted){be(`\uD3D0\uAE30 \uC9C4\uD589: ${O.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}O&&!O.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Xe(p,_,S){return!s||!S?null:await s(p,{..._,root_dir:S})}async function Pe(){let p=new Map;for(let _ of A.pr_wait)p.has(_.root_dir)||p.set(_.root_dir,_.expected_revision);for(let[_,S]of p)await ie("worker-merge-queue-add-all",{},_,S)}function Y(p){let _=j[p];return!!(_&&_.runnable===!0)}function B(p){let _={...j[p]||{}};_.runnable=!_.runnable,j={...j,[p]:_},Hb(j),Re()}function Me(p){H.toggle(p),Re()}function at(p){H.toggleArea(p),Re()}function Qe(p){let _=p.dependency_chips||null,S=p.overlap_chips||[],O=p.scope_state==="missing",Z=p.armed_lane_chip;return!_&&S.length===0&&!O&&!Z?null:{..._||{},...S.length>0?{overlaps:S}:{},...O?{scope_missing:!0}:{},...Z?{armed_lane:Z}:{}}}function v(p){return Us(p,_=>U.isOpen({bead_id:p.id,chip_key:_}))}function z(p){let _=Qe(p),S=v(p);return _||S?{...p,..._?{dependency_chips:_}:{},...S?{chip_popover:S}:{}}:p}function Te(p){let _=Y(p.root_dir);return c`<header class="mon2-sec__hd">
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
    </header>`}function Ce(p,_){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${_}
    </div>`}function Fe(p){if(D!==p.id)return null;let _=A.queue_groups.find(ue=>ue.root_dir===p.root_dir),S=p.place_lanes||[],O=A.cross_lanes_revision!==null,Z=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let ue of A.chain_lanes)Z.push({id:`lane:${ue.lane_id}`,label:`\uC5F0\uACB0 ${ue.number} (${ue.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:ue.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!O});Z.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!O,title:O?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let ue of S)Z.push({id:`serial:${ue.id}`,label:`\uC9C1\uB82C ${Number(ue.id.slice(1))}`,count:ue.length,group:`${_?_.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:Z}}function Ue(p){return Ce(p,c`${_a(z(p),Fe(p),{exec_chips_mode:"pinned_only",onOpenDoc:l?(_,S)=>l(S,p.root_dir):void 0})}`)}function dt(){return A.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${A.runnable.map(p=>Ue(p))}
      </div>`:c`${A.runnable_sections.map(p=>{let _=Y(p.root_dir);return c`<section
        class="mon2-sec${_?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Te({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${_?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(S=>Ue(S))}
            </div>`}
      </section>`})}`}function yt(p,_=!1){return c`<span class="worker-mini__rowops">
      ${_?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${p.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${p.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${p.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function Lt(p,_){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${_}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${vn(z(p),{actions:yt(p,!0)})}
    </div>`}function St(p,_,S,O){return c`<div
      class="mon2-crow${_.fixed?" mon2-crow--fixed":""}"
      draggable=${_.draggable?"true":"false"}
      data-bead-id=${_.id}
      data-drag-kind="chain"
      data-root-dir=${_.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${S}
      data-queue-index=${typeof _.queue_index=="number"?String(_.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Zb(_.seq)}</span
      >
      ${_.workspace_name?c`<span class="worker-mini__repo" title=${_.root_dir}
            >${_.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${_.id}</span>
      <span class="mon2-crow__title">${_.title}</span>
      ${_.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${O.includes(_.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${_.location_title}
        >${_.location_label}</span
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
    </div>`}function gt(p){let _=A.cross_lanes_revision!==null,S=W(p.lane_id),O=S?.held===!0,Z=S?.cycle===!0,ue=S?S.mismatched:[],me=re&&re.lane_id===p.lane_id?re.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${me>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${me}건 자동 교정</span
            >`:""}
        ${Z?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${O?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Zs}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!_||!p.can_confirm||O}
              title=${O?Zs:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!_}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!_}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!_}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
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
        ${p.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:p.rows.map((ge,st)=>St(p,ge,st,ue))}
      </div>
    </div>`}function Be(p,_,S){return c`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="repo-serial"
      data-root-dir=${_.root_dir}
      data-lane-id=${p.id}
      data-row-index=${S}
      data-queue-index=${String(_.queue_index??0)}
    >
      ${vn(z(_),{actions:yt(_)})}
    </div>`}function P(p){if(p.length===0)return"";let _=p.length-1;return`${p[0].id} \uC810\uC720${_>0?` +${_}`:""}`}function ne(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${vn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function he(p,_){let S=_.occupants,O=_.cross_wait_peers||[];return{id:_.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${_.index+1}`,rows:[...S.map(Z=>ne(Z)),..._.items.map((Z,ue)=>Be(_,Z,ue))],count:_.items.length,empty:_.empty===!0,...S.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${S.map(Z=>`${Z.id} \u2014 ${Z.badge}`).join(`
`)}
              >${P(S)}</span
            >`,held:!0}:{},cycle:_.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...O.length>0?{after:c`${O.map(Z=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${Z.workspace_name}·${Z.lane}과 교차 대기
                </div>`)}`}:{}}}function R(){let p=A.cross_lanes_revision!==null,_=A.chain_lanes.some(S=>S.draft&&S.rows.length===0);return zs({parallel:{rows:A.parallel_rows.map((S,O)=>Lt(S,O)),count:A.parallel_rows.length,collapsed:H.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:A.queue_groups.flatMap(S=>S.sublanes.serial.map(O=>({...he(S,O),drop:{drop:"repo-serial",root_dir:S.root_dir,lane_id:O.id,lane_length:String(O.raw_length)}}))),collapsed:H.isAreaCollapsed("serial"),extra_panes:A.chain_lanes.map(S=>gt(S)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${_||!p}
          title=${p?_?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...A.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function K(p){return c`<div class="worker-rungrid">
      ${A.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:A.running.map(_=>sl({bead_id:_.id,attempt_id:_.attempt_id||"",title:_.title,runner:_.runner??null,model:_.model??null,effort:_.effort??null,speed:_.speed??null,started_at:_.started_at??null,kind:_.kind,..._.kind==="session"?{updated_at:_.updated_at,session_refs:_.session_refs||[]}:{},workflow:_.workflow||null,resumed_from:_.resumed_from??null,continuation_mode:_.continuation_mode??null,paused:_.run_state==="paused",failed:_.run_state==="failed",parked:_.run_state==="parked",retry_wait:_.run_state==="retry_wait",retry:_.retry||null,status:_.status,status_label:_.run_state==="failed"?"\uC2E4\uD328":_.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":_.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:_.can_pause!==!1,exec_chips:_.exec_chips||null,usage:_.usage||null,chip_popover:v(_),discard:_.discard,failure:_.failure?{..._.failure,open:M===_.attempt_id}:null},p,F,{monitor:{repo:_.workspace_name,root_dir:_.root_dir,serial_lane_id:_.serial_lane_id,cross_lane_chip:_.cross_lane_chip||null,last_activity:_.last_activity||null,legs:_.legs||[],dependency_chips:Qe(_)}}))}
    </div>`}function Ie(p){let _={runnable:A.runnable,queue:A.queue,running:A.running,pr_wait:A.pr_wait,done:A.done},S=O=>{let Z=_[O.lane],ue=O.lane==="runnable"?A.runnable_flat?Z.length>0?dt():void 0:A.runnable_sections.length>0?dt():void 0:O.lane==="queue"?A.queue_groups.length>0||A.chain_lanes.length>0||A.parallel_rows.length>0||A.cross_lanes_unreadable?R():void 0:O.lane==="running"?K(p):Z.length>0?c`${Z.map(me=>vn(z(me)))}`:void 0;return Rn({id:`monitor-${O.lane}`,lane:O.pane,title:O.title,items:Z,count:Z.length,src:O.lane==="runnable",empty:O.empty,body:ue,live:O.lane==="running"&&Z.length>0,collapsible:!0,collapsed:H.isCollapsed(O.pane),controls:O.lane==="runnable"?We():void 0,header_control:De(O.lane,Z.length)})};if(se){let O=Qb.map(Z=>cp.find(ue=>ue.lane===Z)).filter(Z=>Z!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Hs({live:A.running.length>0,running_body:A.running.length>0?K(p):"",pr_wait_rows:A.pr_wait.map(Z=>vn(z(Z))),count:A.running.length+A.pr_wait.length})}
            ${O.map(Z=>S(Z))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${cp.map(O=>S(O))}
        </div>
      </div>`}function We(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${A.runnable_hidden.blocked>0?` ${A.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${va.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${k.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${A.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${A.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function De(p,_){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${L}
      >
        ${So.map(S=>c`<option
              value=${S.value}
              ?selected=${L===S.value}
            >
              ${S.label}
            </option>`)}
      </select>`:p==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${m}
      >
        <option value="started" ?selected=${m==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${m==="repo"}>
          레포순
        </option>
      </select>`:p==="pr_wait"&&_>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Er.map(S=>c`<option value=${S.value} ?selected=${h===S.value}>
              ${S.label}
            </option>`)}
      </select>`:""}function Je(p){let _=o&&o.get?o.get():null,S=o&&o.getWorkspacesState?o.getWorkspacesState():[],O=p===void 0?o&&o.crossLanes?o.crossLanes():void 0:p,Z={done_since:_r(h,d()),running_sort:m,candidate_filter:k,candidate_sort:L};return O!==void 0&&(Z.cross_lanes=O),rr(_,S,Z)}function Re(){let p=d();A=Je(),G=null,oe=new Map;for(let _ of[...A.runnable,...A.queue,...A.running,...A.pr_wait,...A.done])!_.non_occupying&&!oe.has(_.id)&&oe.set(_.id,_);rt(Ie(p),ce),Ze()?.render(),ze(),ft()}function ze(){let p=new Map;for(let _ of A.queue_groups)p.set(_.root_dir,_.auto_advance);for(let _ of Array.from(ce.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let S=_.closest(".mon2-item")?.getAttribute("data-root-dir")||"",O=p.get(S);typeof O=="boolean"&&_.setAttribute("title",`${_.textContent||""} \xB7 ${O?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ze(){if(_e)return _e;let p=ce.querySelector(".mon2-deck");return p?(_e=ap(p,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>A.done,rangeLabel:ye,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:kt,onFocusChange:_=>{V=_,ft()}}),_e):null}function ft(){ce.classList.toggle("has-focus",V!==null);for(let p of Array.from(ce.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",V!==null&&p.getAttribute("data-root-dir")===V);for(let p of Array.from(ce.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let _=oe.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",V!==null&&!!_&&_.root_dir===V)}for(let p of Array.from(ce.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",V!==null&&p.getAttribute("data-root-dir")===V)}function He(p,_){let S=i?i():void 0;if(!_||!S||_===S||!a){r(p);return}a(_).then(()=>{r(p)}).catch(O=>{n("workspace switch for %s failed: %o",_,O)})}function kt(p){if(!p)return;let _=i?i():void 0,S=()=>{try{u?.gotoView("worker")}catch(O){n("gotoView(worker) failed: %o",O)}};if(!a||_&&_===p){S();return}a(p).then(S).catch(O=>{n("workspace switch for %s failed: %o",p,O),be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Nt(p){en(p).then(_=>{be(_?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",_?"success":"error",1400)})}function tt(p){let _=oe.get(p)||null;return{item:_,root_dir:_?_.root_dir:"",revision:_?_.expected_revision:0}}async function Tt(p,_,S){if(p!=="dep-add")return;let O=A.chain_lanes.find(Z=>Z.rows.some(ue=>ue.id===_));!O||!O.rows.some(Z=>Z.id===S)||await ae(Z=>Pu(O.lane_id,Z),"",[{type:p,a:_,b:S}])}function xt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Ct(p,_){if(p==="run"){await an(_);return}if(p==="stop"){await Bt(_);return}if(p==="create"){await ae(S=>Aa(null,S),"");return}if(p==="remove"){let S=Nu(_,I());if(S!==null&&!f(S))return;await ae(O=>Mu(_,O),"");return}await ae(S=>p==="confirm"?Iu(_,S):Du(_,S),"")}function qt(p){let _=new Map;for(let S of p.rows){let O=A.owner_of[S.id]||S.root_dir;typeof O!="string"||O.length===0||_.set(O,[..._.get(O)||[],S.id])}return _}async function an(p){let _=A.chain_lanes.find(ue=>ue.lane_id===p);if(!_||A.cross_lanes_revision===null){Re();return}Ee();let S=new Map,O=new Map,Z=qt(_);for(let ue of _.rows){if(!ue.unplaced)continue;let me=A.owner_of[ue.id]||ue.root_dir;if(typeof me!="string"||me.length===0){be(`${ue.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Re();return}let ge=O.get(me)??0;if(await le("worker-queue-place",{bead_id:ue.id,lane:"parallel",index:(A.parallel_raw_length[me]??0)+ge},me,S,{bead_id:ue.id})===null){Re();return}O.set(me,ge+1)}for(let[ue,me]of Z)if(await le("worker-queue-arm",{bead_ids:me,lane_id:p},ue,S,{bead_id:me[0]})===null){be("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Re();return}Re()}async function Bt(p){let _=A.chain_lanes.find(O=>O.lane_id===p);if(!_||A.cross_lanes_revision===null){Re();return}Ee();let S=new Map;for(let[O,Z]of qt(_))if(await le("worker-queue-disarm",{lane_id:p},O,S,{bead_id:Z[0]})===null)break;Re()}async function Ut(p,_){let{root_dir:S,revision:O}=tt(p);if(S.length===0){Re();return}await le("worker-queue-disarm",{bead_ids:[p],lane_id:_},S,new Map([[S,O]]),{bead_id:p}),Re()}async function It(p,_){let S=oe.get(p);if(!S){Re();return}let O={kind:"candidate",bead_id:p,root_dir:S.root_dir};if(_==="new-lane"){await ae(Z=>Aa({bead_id:p,root_dir:S.root_dir},Z),p);return}if(_.startsWith("lane:")){let Z=_.slice(5);if(!A.chain_lanes.find(me=>me.lane_id===Z)){Re();return}await ae(me=>ei(O,{kind:"chain",lane_id:Z,marker_index:(me.cross_lanes.get(Z)?.entries??[]).length},me),p);return}if(_.startsWith("serial:")){let Z=_.slice(7),ue=(S.place_lanes||[]).find(me=>me.id===Z);await ot(O,{kind:"repo-serial",root_dir:S.root_dir,lane_id:Z,index:ue?ue.index:0});return}await ot(O,{kind:"parallel",marker_index:A.parallel_rows.length})}async function Mt(p,_){let S=A.parallel_rows,O=S.findIndex(ut=>ut.id===p);if(O<0)return;let Z=S[O].root_dir,ue=[];S.forEach((ut,Ht)=>{ut.root_dir===Z&&ue.push(Ht)});let me=ue.indexOf(O),ge=ue[me+_];if(typeof ge!="number")return;let st=_===-1?ge:ue[me+2]??Math.min(S.length,ge+1);await ot({kind:"parallel",bead_id:p,root_dir:Z,queue_index:S[O].queue_index??0},{kind:"parallel",marker_index:st})}async function Zt(p){for(let _ of A.chain_lanes){let S=_.rows.find(O=>O.id===p);if(S){await ot({kind:"chain",bead_id:p,root_dir:S.root_dir,lane_id:_.lane_id,...typeof S.queue_index=="number"?{queue_index:S.queue_index}:{}},{kind:"parallel",marker_index:A.parallel_rows.length});return}}}function zt(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function vt(p,_){let{item:S,root_dir:O,revision:Z}=tt(_),ue=S?.attempt_id||"",me=p.classList;if(me.contains("worker-mini__rowops-up")||me.contains("worker-mini__rowops-down")){Mt(_,me.contains("worker-mini__rowops-up")?-1:1);return}if(me.contains("worker-mini__rowops-remove")){ie("worker-queue-remove",{bead_id:_},O,Z);return}if(me.contains("mon2-crow__detach")){Zt(_);return}if(me.contains("worker-dep__open")){He(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(me.contains("mon2-arm__release")){Ut(_,p.getAttribute("data-lane-id")||"");return}if(me.contains("mon-lane__chip")){let ge=p.getAttribute("data-lane-id")||"";ce.querySelector(`.mon2-clane[data-lane-id="${ge}"]`)?.scrollIntoView({block:"nearest"});return}if(me.contains("judgement-chip")){let ge=p.getAttribute("data-chip-key")||"";ge&&U.toggle({bead_id:_,chip_key:ge});return}if(me.contains("rtile__failure-badge")){M=M===ue?null:ue,Re();return}if(me.contains("rtile__attempt-copy")){let ge=p.getAttribute("data-attempt-id")||"";ge&&en(ge).then(st=>{be(st?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",st?"success":"error",1400)});return}if(me.contains("worker-card__place")){D=D===_?null:_,Re();return}if(me.contains("worker-card__place-cancel")){D=null,Re();return}if(me.contains("worker-card__place-lane")){let ge=p.getAttribute("data-lane")||"parallel";D=null,It(_,ge);return}if(me.contains("rtile__session")){if(S&&S.kind==="session"){let ge=(S.session_refs||[]).find(st=>st&&st.current===!0);ge&&(q.hidden=!1,Ne.open(qr(ge,_,"in_progress",O)),Re());return}F=ue,ue&&S&&(q.hidden=!1,Ne.open({attempt_id:ue,root_dir:O,meta:zt(S)})),Re();return}if(me.contains("rtile__pause")){Xe("worker-attempt-pause",{attempt_id:ue},O);return}if(me.contains("rtile__resume")){Nr().then(ge=>{if(ge!==null)return pe("worker-attempt-resume",{attempt_id:ue,...ge!==""?{instructions:ge}:{}},O,Z)});return}if(me.contains("rtile__parked-retry")){Xe("worker-parked-retry",{bead_id:_,attempt_id:ue},O).then(ge=>{ge&&ge.ok===!1&&be(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${ge.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":ge.reason||""}`,"error")});return}if(me.contains("rtile__discard")){let ge=p.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(ko(_,ge)))return;Ge({bead_id:_,...ue?{attempt_id:ue}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},O,Z);return}if(me.contains("worker-mini__merge")){let ge=ke(O,_);ge?.mismatch&&ge.continuation===null?qe(O,_,Z,ge.mismatch):ie("worker-merge-queue-add",{bead_id:_},O,Z);return}if(me.contains("worker-mini__merge-cancel")){ie("worker-merge-queue-remove",{bead_id:_},O,Z);return}if(me.contains("worker-mini__discard")){let ge=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(ko(_,ge)))return;Ge({bead_id:_,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},O,Z);return}if(me.contains("worker-mini__revise-fix")){pe("worker-revise-fix",{bead_id:_},O,Z);return}me.contains("worker-mini__revise-approve")&&ie("worker-revise-approve",{bead_id:_},O,Z)}function Xt(p){let _=it.consumeClickSuppression(),S=p.target;if(!S||typeof S.closest!="function"||S.closest("dialog")||S.closest(".worker-drawer-overlay")||S.closest("a"))return;let O=S.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(O){p.preventDefault();let Se=S.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||O.textContent?.trim()||"";Se&&Nt(Se);return}let Z=S.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Z){p.preventDefault();let C=Z.getAttribute("data-root-dir")||oe.get(S.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Z.getAttribute("title")||"";kt(C);return}let ue=S.closest(".mon2-sec__toggle");if(ue){p.preventDefault(),B(ue.getAttribute("data-root-dir")||"");return}let me=S.closest(".worker-pane__toggle[data-lane]");if(me){p.preventDefault();let C=me.getAttribute("data-lane")||"";(C==="candidate"||C==="queue"||C==="running"||C==="pr_wait"||C==="done")&&Me(C);return}let ge=S.closest(".worker-wait__area-toggle[data-area]");if(ge){p.preventDefault(),at(ge.getAttribute("data-area")||"parallel");return}if(S.closest(".mon2-newlane")){p.preventDefault(),Ct("create","");return}let st=S.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(st){p.preventDefault();let C=st.getAttribute("data-lane-id")||"",Se=st.classList;Ct(Se.contains("mon2-clane__confirm")?"confirm":Se.contains("mon2-clane__reapply")?"reapply":Se.contains("mon2-clane__run")?"run":Se.contains("mon2-clane__stop")?"stop":"remove",C);return}if(S.closest(".mon-merge-all")){p.preventDefault(),Pe();return}let ut=S.closest(".mon-filter__spec");if(ut){p.preventDefault(),k={...k,spec:ut.getAttribute("data-spec")||"all"},lp(k),Re();return}let Ht=S.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Ht)return;let wt=Ht.getAttribute("data-bead-id")||"",x=S.closest("button");if(x){p.preventDefault(),vt(x,wt);return}S.closest(".rtile__failure-pop, .chip-popover")||wt&&!_&&(p.preventDefault(),He(wt,Ht.getAttribute("data-root-dir")||tt(wt).root_dir))}function ve(p){let _=p.target;if(!_||typeof _.closest!="function")return;let S=_.closest(".mon-filter__blocked");if(S){k={...k,show_blocked:S.checked},lp(k),Re();return}let O=_.closest(".mon-candidate-sort");if(O){L=So.some(me=>me.value===O.value)?O.value:"repo_spec",Wb(L),Re();return}let Z=_.closest(".mon-running-sort");if(Z){m=Z.value==="repo"?"repo":"started",Vb(m),Re();return}let ue=_.closest(".mon-done-range");ue&&(h=En(ue.value),Kb(h),Re())}function T(p){let _=p.target,S=_&&typeof _.closest=="function"?O=>_.closest(O):()=>null;M&&!S(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,Re())}function te(p){p.key!=="Escape"||M===null||(M=null,Re())}e.addEventListener("click",Xt),e.addEventListener("change",ve),document.addEventListener("click",T),document.addEventListener("keydown",te),U.attach(),it.attach(e);{let p=!0;Q=yi(_=>{if(se=_,p){p=!1;return}Re()})}o&&typeof o.subscribe=="function"&&(de=o.subscribe(()=>{try{xe.clear(),Re()}catch{}}));function y(){Le!==null&&(clearInterval(Le),Le=null)}return{recorrectSharedLane:Tt,load(){n("load"),Re(),Le===null&&(Le=setInterval(()=>{try{Re()}catch{}},Xb))},pause(){y()},clear(){y(),it.detach(),de&&(de(),de=null),Q&&(Q(),Q=null),Ne.destroy(),q.hidden=!0,_e?.destroy(),_e=null,e.removeEventListener("click",Xt),e.removeEventListener("change",ve),document.removeEventListener("click",T),document.removeEventListener("keydown",te),U.detach(),e.replaceChildren()}}}function bp(e,t,n){let r=Et("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(h){return m=>{m.preventDefault();let k=h==="monitor"&&a()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function a(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let h=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function f(){o&&rt(u(),o),s&&rt(d(),s)}return f(),i=t.subscribe(()=>f()),{destroy(){i&&(i(),i=null),o&&rt(c``,o),s&&rt(c``,s)}}}var yp=["bug","feature","task","epic","chore"];function vp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var wp=["Critical","High","Medium","Low","Backlog"];function kp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",s.appendChild(D);for(let M of yp){let U=document.createElement("option");U.value=M,U.textContent=vp(M),s.appendChild(U)}i.replaceChildren();for(let M=0;M<=4;M+=1){let U=document.createElement("option");U.value=String(M);let V=wp[M]||"Medium";U.textContent=`${M} \u2013 ${V}`,i.appendChild(U)}}m();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function L(D){o.disabled=D,s.disabled=D,i.disabled=D,l.disabled=D,a.disabled=D,d.disabled=D,f.disabled=D,f.textContent=D?"Creating\u2026":"Create"}function j(){u.textContent=""}function H(D){u.textContent=D}function se(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?s.value=D:s.value="";let M=window.localStorage.getItem("beads-ui.new.priority");M&&/^\d$/.test(M)?i.value=M:i.value="2"}catch{s.value="",i.value="2"}}function Q(){let D=s.value||"",M=i.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),M.length>0&&window.localStorage.setItem("beads-ui.new.priority",M)}async function F(){j();let D=String(o.value||"").trim();if(D.length===0){H("Title is required"),o.focus();return}let M=Number(i.value||"2");if(!(M>=0&&M<=4)){H("Priority must be 0..4"),i.focus();return}let U=String(s.value||""),V=String(a.value||""),re={title:D};U.length>0&&(re.type=U),String(M).length>0&&(re.priority=M),V.length>0&&(re.description=V),L(!0);try{await t("create-issue",re)}catch{L(!1),H("Failed to create issue");return}Q(),L(!1),k()}return n.addEventListener("cancel",D=>{D.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),F())}),r.addEventListener("submit",D=>{D.preventDefault(),F()}),{open(){r.reset(),j(),se();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var Jb=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function ey(e,t){return Wi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function $p(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=ey(r,e);return c`<button
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
  `}function xp(e,t,n){return c`
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
  `}function Ap(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Jb.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var ty=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Sp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(X=>be(X,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let X=i.querySelector('[data-pane="execution"]');return X?(d=Si(X,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Ee=>t.queueStore?.set?.(Ee)}),d):null}function h(){return c`
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
    `}function m(){let X=r.get();return c`
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
        ${X?c`
              ${$p(X,o(),H)}
              ${xp(X,u,{onDraft:Ee=>{u=Ee},onAdd:se,onRemove:Q})}
              ${Ap(X,F)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(X){let Ee=r.get();if(Ee)try{let ye=await n("display-policy-set",{expected_revision:Ee.revision,policy:X(Ee)});L(ye),ye&&ye.conflict&&ye.policy&&(ye=await n("display-policy-set",{expected_revision:ye.policy.revision,policy:X(ye.policy)}),L(ye)),ye&&ye.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function L(X){X&&X.policy&&typeof X.policy=="object"&&r.set(X.policy)}function j(X){k(X)}function H(X){let Ee=r.get();if(!Ee)return;let ye=!ny(X,Ee);j(ce=>ry(X,ce,ye))}function se(){let X=u.trim();X.length!==0&&(u="",j(Ee=>Ee.hidden_prefixes.includes(X)?{hidden_prefixes:Ee.hidden_prefixes}:{hidden_prefixes:[...Ee.hidden_prefixes,X]}),D())}function Q(X){j(Ee=>({hidden_prefixes:Ee.hidden_prefixes.filter(ye=>ye!==X)}))}function F(X){let Ee=r.get();if(!Ee)return;let ye=Ee.chips[X]===!1;j(()=>({chips:{[X]:ye}}))}function D(){rt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${ty.map(X=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${X.id}
                  aria-selected=${String(l===X.id)}
                  aria-controls=${`settings-pane-${X.id}`}
                  @click=${()=>M(X.id)}
                >
                  <span class="settings-dialog__glyph">${X.glyph}</span>
                  ${X.label}
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
            ${h()} ${m()}
          </div>
        </div>
      `,i),f()}function M(X){l=X,D()}let U=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",U),i.addEventListener("cancel",U);let V=X=>{X.target===i&&W()};i.addEventListener("click",V);let re=null;r.subscribe&&(re=r.subscribe(()=>{a&&D()}));let N=null;t.implPresetStore?.subscribe&&(N=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function G(X="execution"){a||(a=!0,t.onOpenChange?.(!0),l=X,u="",D(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),f()?.load())}function W(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:W,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",U),i.removeEventListener("cancel",U),i.removeEventListener("click",V),re&&(re(),re=null),N&&(N(),N=null),d?.destroy(),d=null,i.remove()}}}function ny(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function ry(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var oy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ep="usage-meter-card",sy="usage-meter-layer",al=600,iy=["token_expired","relogin_required"];function Tp(e){return String(e).padStart(2,"0")}function ay(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Cp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Tp(r.getHours())}:${Tp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${oy[r.getMonth()]} ${r.getDate()} ${s}`;return`${ay(n,t)} \xB7 ${l}`}function ly(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Rp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Op(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Lp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Dp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function cy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Dp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function uy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=cy(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Dp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function dy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=uy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Pp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function py(e,t){return!e.held||Pp(e,t)<=al?e:{...e,available:!1,windows:[],accounts:[]}}function Ip(e,t){return`${e}:${t}`}function Mp(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){rt(c``,e),e.hidden=!0,f()}function d(){if(a===null){let ce=e.ownerDocument;a=ce.createElement("div"),a.id=sy,a.className="usage-meter__layer",ce.body.appendChild(a)}return a}function f(){a!==null&&(rt(c``,a),a.remove(),a=null)}function h(ce){n!==ce&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",j),window.addEventListener("resize",L)),n=ce)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",j),window.removeEventListener("resize",L))}function k(ce){let q=ce.target;q&&(e.contains(q)||a!==null&&a.contains(q))||(m(),W())}function L(){W()}function j(ce){ce.key==="Escape"&&(m(),W())}function H(ce){n===ce?m():h(ce),W()}function se(){m(),W()}async function Q(ce,q){if(r.has(ce.key))return;let we=Ip(ce.key,q);r.set(ce.key,q),i.delete(we),W();let Ae=null;try{Ae=await(await fetch(ce.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:q})})).json()}catch{Ae=null}if(t)return;if(r.delete(ce.key),!Ae||Ae.ok!==!0){let oe=Ae&&typeof Ae.error=="string"&&Ae.error.length>0?Ae.error:"network_error";i.set(we,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${oe}`}),W();return}let A=Array.isArray(Ae.warnings)?Ae.warnings.filter(oe=>typeof oe=="string"&&oe.length>0):[];A.length>0&&i.set(we,{kind:"warn",text:A.join(" \xB7 ")}),W(),await ye()}function F(ce,q,we,Ae){let A=Op(ce.pct),xe=`resets ${Cp(ce.resetsAt,Ae)}${q?` \xB7 ${we}`:""}`;return c`<span
      class="usage-meter__window ${Rp(A)}"
      style=${`--progress: ${A}%`}
      title=${xe}
    >
      <span class="usage-meter__label">${ce.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${A}%</span>
    </span>`}function D(ce,q,we){let Ae=Pp(q,we),A=q.available&&(q.held||Ae>al),oe=A?`${Math.floor(Ae/60)}\uBD84 \uC804 \uCE21\uC815`:"",xe=q.accounts.filter(Ne=>!Ne.active).length,de=`usage-meter__group${A?" usage-meter__group--stale":""}`,Le=c`<span class="usage-meter__provider"
        >${ce.label}</span
      >
      ${q.available?q.windows.map(Ne=>F(Ne,A,oe,we)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${xe>0?c`<span class="usage-meter__badge">+${xe}</span>`:""}`;if(q.accounts.length===0)return c`<span
        class=${de}
        aria-label=${`${ce.label} usage`}
        >${Le}</span
      >`;let _e=n===ce.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${de}`}
      aria-label=${`${ce.label} usage`}
      aria-expanded=${_e?"true":"false"}
      aria-controls=${Ep}
      @click=${()=>H(ce.key)}
    >
      ${Le}
    </button>`}function M(ce,q){return c`<span class="usage-meter" aria-label="Usage">
      ${ce.map(we=>D(we.provider,we.snapshot,q))}
    </span>`}function U(ce,q){let we=Op(ce.pct),Ae=Cp(ce.resetsAt,q);return c`<span
      class="usage-meter__account-window ${Rp(we)}"
      style=${`--progress: ${we}%`}
    >
      <span class="usage-meter__account-key">${ce.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${we}%</span>
      <span class="usage-meter__account-reset"
        >${Ae.length>0?`\u21BB ${Ae}`:""}</span
      >
    </span>`}function V(ce,q){return iy.includes(q)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ce.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function re(ce,q,we){let Ae=q.status==="ok",A=typeof q.ageSeconds=="number"&&q.ageSeconds>al,oe=i.get(Ip(ce.key,q.number)),xe=r.get(ce.key),de=xe!==void 0,Le=xe===q.number,_e=["usage-meter__account"];return q.active&&_e.push("usage-meter__account--active"),Ae||_e.push("usage-meter__account--unavailable"),A&&_e.push("usage-meter__account--stale"),c`<div class=${_e.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${q.email}
          >${q.alias===null?q.email:q.alias}</span
        >
        ${q.plan===null?"":c`<span class="usage-meter__account-tag">${q.plan}</span>`}
        ${q.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${q.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${ly(q.ageSeconds)}</span
            >`}
        ${q.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${de}
              @click=${()=>{Q(ce,q.number)}}
            >
              ${Le?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ae?c`<div class="usage-meter__account-windows">
            ${q.windows.map(Ne=>U(Ne,we))}
          </div>`:c`<div class="usage-meter__account-status">
            ${V(ce,q.status)}
          </div>`}
      ${oe===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${oe.kind}"
          >
            ${oe.text}
          </div>`}
    </div>`}function N(ce,q,we){let Ae=q.accounts.filter(A=>A.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ce.label} · 활성 ${Ae} / 전체
        ${q.accounts.length}
      </h2>
      ${q.accounts.map(A=>re(ce,A,we))}
    </section>`}function G(ce,q){return c`<div
      class="usage-meter__card"
      id=${Ep}
      role="dialog"
      aria-label=${`${ce.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${N(ce.provider,ce.snapshot,q)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function W(){let ce=Date.now(),q=[];for(let Ae of Lp){let A=s.get(Ae.key);A&&q.push({provider:Ae,snapshot:py(A,ce)})}if(q.length===0){m(),u();return}let we=q.find(Ae=>Ae.provider.key===n&&Ae.snapshot.accounts.length>0);we||m(),rt(M(q,ce),e),e.hidden=!1,we?X(we,ce):f()}function X(ce,q){let we=d(),Ae=e.getBoundingClientRect(),A=e.ownerDocument.documentElement.clientWidth;we.style.setProperty("--usage-meter-anchor-top",`${Ae.bottom}px`),we.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,A-Ae.right)}px`),rt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${se}
        ></div>
        ${G(ce,q)}`,we)}async function Ee(ce){try{let q=await fetch(ce.endpoint);return q.ok?dy(await q.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function ye(){l+=1;let ce=l,q=await Promise.all(Lp.map(async we=>({provider:we,read:await Ee(we)})));if(!(t||ce!==l)){for(let we of q){let Ae=we.provider.key;if(we.read.kind==="ok"){s.set(Ae,we.read.snapshot);continue}if(we.read.kind==="empty"){s.delete(Ae);continue}let A=s.get(Ae);A!==void 0&&!A.held&&s.set(Ae,{...A,held:!0})}W()}}return u(),ye(),o=setInterval(()=>{ye()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}var fy="worker-ineligible";function Ko(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Np(e){return Ko(e).includes(fy)}var _y="worker-serial";function qp(e){return Ko(e).includes(_y)}var Bp="bdui.worker.candidate_sort",Yo=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Ti=Object.freeze({preset:"spec"}),Up=3,Wp=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Fp(e){return Yo.some(t=>t.id===e)}function jp(e){let t=Yo.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function my(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Vo(e){return e&&"preset"in e?jp(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):jp("spec")}function ll(e){return e&&"preset"in e?e.preset:null}function xr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Fp(e)?{preset:e}:Ti}return xr(s)}if(!e||typeof e!="object")return Ti;let t=e;if(Fp(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Up||!n.every(Fi))return Ti;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=Yo.find(s=>my(s.chain,r));return o?{preset:o.id}:{chain:r}}function zp(){try{return xr(window.localStorage.getItem(Bp))}catch{return Ti}}function cl(e){try{window.localStorage.setItem(Bp,JSON.stringify(e))}catch{}}function Hp(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(as,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:as[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,Up)}function Gp(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Kp(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Yl(Vo(t))),n}function Yp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Cs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var Vp=new Set(["sh","bash","zsh","dash","ksh"]),Xp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Qp(e){let t=e.split("/");return t[t.length-1]||""}function gy(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Qp(n[0]);if(r!=="env")return Vp.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&Vp.has(Qp(o))}function hy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function by(e){let t=[],n=0;Xp.lastIndex=0;for(let r of e.matchAll(Xp)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:hy(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function yy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Zp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function f(D,M){return M?by(D).map(U=>U.kind==="plain"?U.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${U.kind}"
            >${U.text}</span
          >`):D}function h(){if(!o)return c``;let D=s==="ready"&&gy(i),M=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Q()}
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
              ?disabled=${s!=="ready"}
              @click=${()=>{k()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>Q()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${s==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:s==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${M.map((U,V)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${V+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(U,D)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){rt(h(),r)}async function k(){if(s!=="ready")return;let D=await en(i);be(D?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",D?"success":"error")}function L(D){D.key==="Escape"&&o&&(D.preventDefault(),Q())}function j(){d||(document.addEventListener("keydown",L),d=!0)}function H(){d&&(document.removeEventListener("keydown",L),d=!1)}async function se(D,M=null){let U=++a;j(),o={...D},u=M||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let re=t?t():"";if(!re){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let N="/api/repo-ops-script?workspace="+encodeURIComponent(re)+"&lane="+encodeURIComponent(D.lane)+"&base_sha="+encodeURIComponent(D.base_sha);try{let G=await n(N),W=await G.json().catch(()=>({}));if(U!==a)return;if((t?t():"")!==re){Q();return}if(!G.ok||!W||W.ok!==!0){s="error",l=yy(W&&typeof W.error=="string"?W.error:""),m();return}o={lane:W.lane,base_sha:W.base_sha,path:W.path,base_ref:W.base_ref},i=String(W.content),s="ready",m()}catch{if(U!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function Q(){a+=1,H(),o=null,i="",m();let D=u;u=null,D?.isConnected&&D.focus()}function F(){Q(),r.remove()}return{open:se,close:Q,destroy:F}}var Jp={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},vy=new Set(["queued","running","retry_pending"]);function ef(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let N=s();return typeof N.revision=="number"?N.revision:0}function l(N){t&&N&&N.queue&&typeof N.queue=="object"&&t.set(N.queue)}function a(){let N=s().workspace_info;return N&&typeof N=="object"?N:{}}function u(N,G){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${N}"
      >${G}</span
    >`}function d(N){if(typeof N!="number"||!Number.isFinite(N))return"";let G=N/6e4;return Number.isInteger(G)?`timeout ${G}\uBD84`:`timeout ${Math.round(N/1e3)}\uCD08`}function f(N){let G=d(N);return G?u("config",G):""}function h(N,G,W){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${W.script}
      @click=${X=>{o&&o({lane:N,base_sha:G.base_sha,path:W.script,base_ref:G.base_ref},X.currentTarget)}}
    ></button>`}function m(){let N=s().repo_operations;return Array.isArray(N)?N:[]}function k(){let N=a().repo_ops,G=N&&typeof N=="object"?N.repo_id:null;return typeof G=="string"&&G?G:null}function L(){return m().some(N=>N&&N.kind==="deploy"&&vy.has(N.state))}function j(){let N=L(),G=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${N||G}
      title=${N?"\uBC30\uD3EC \uC9C4\uD589 \uC911":G?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{M()}}
    >
      배포 실행
    </button>`}function H(){let N=s().repo_ops_opt_out;return{verify:N?.verify===!0,deploy:N?.deploy===!0}}function se(N,G){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!G}
        @change=${W=>{D(N,!W.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function Q(N){let G=typeof N.base_sha=="string"?N.base_sha:"",W=`${N.source_path||"repo-ops/config.toml"} @ ${N.base_ref||"?"}${G?`@${G.slice(0,7)}`:""}`,X=H(),Ee=!!N.verify&&X.verify,ye=!!N.deploy&&X.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${W}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Ee?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${N.verify?c`${h("verify",N,N.verify)}
              ${f(N.verify.timeout_ms)}
              ${Ee?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ee?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":N.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${N.verify?se("verify",X.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ye?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${N.deploy?c`${h("deploy",N,N.deploy)}
              ${f(N.deploy.timeout_ms)}
              ${ye?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):j()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ye?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":N.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${N.deploy?se("deploy",X.deploy):""}
      </div>
    </section>`}function F(N){let G=N.repo_ops&&typeof N.repo_ops=="object"?N.repo_ops:null;return G&&(G.status==="resolved"||G.status==="absent")?Q(G):G&&(G.status==="pending"||G.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${G.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${G.error_code?c` — <code>${G.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function D(N,G){if(!n)return;let W=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:G,expected_revision:i()});if(l(W),W&&W.conflict){let X=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:G,expected_revision:i()});l(X)}r()}async function M(){let N=k();if(!n||N===null)return;let G=await n("worker-repo-operation-deploy-run",{repo_id:N});if(l(G),!G||G.ok!==!0){let W=G&&typeof G.reason=="string"?G.reason:"",X=Object.hasOwn(Jp,W)?Jp[W]:W||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";be(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${X}`,"error")}else be("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let U={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function V(N,G,W){return c`<div class="worker-repo-ops__policy-group" data-policy=${W}>
      <div class="worker-repo-ops__policy-label">${N}</div>
      <ul class="worker-repo-ops__policy-list">
        ${G.map(X=>c`<li data-token=${X}>
              ${U[X]||X}
            </li>`)}
      </ul>
    </div>`}function re(){let N=s(),G=N.repo_operation_policy&&typeof N.repo_operation_policy=="object"?N.repo_operation_policy:null;return G?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(G.worker_automatic||[]).length} · 금지
            ${(G.never_automatic||[]).length}</span
          >
        </summary>
        ${G.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${G.schema_version})`}
            </div>`:""}
        ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",G.worker_automatic||[],"worker-automatic")}
        ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",G.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${F(a())} ${re()}
      </details>`}}}var rf=20,wy=5,ky=new Set(["failed","running","queued","retry_pending"]),tf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function $y(e,t,n=rf){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function xy(e){if(e.type==="cleanup")return!0;let t=e.operation;return ky.has(t.state)&&!t.dismissed&&!t.superseded_by}function Ay(e,t,n={}){let r=$y(e,t,1/0),o=n.expanded===!0?rf:wy,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||xy(l));return{visible:i,hidden:r.length-i.length}}function nf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Sy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function of(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Rs(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function sf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Ey(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Ty(e,t){let n=Qd(e,t),r=Zd(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Cy(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Ry(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${Ds(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${nf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(tf,n.kind)?tf[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${Is(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${br(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${nf(e)}"
          >${Sy(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?sf(Xd(n.failure_kind,o)):""}
      ${Ty(n,Ey(t,n))}
      ${Cy(n)}
      ${of([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Is(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Oy(e){let t=e.cleanup,n=yr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${Ds(e.at)||"\u2014"}</span
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
        ${mu(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${sf(sr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${of([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ly(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Oy(r):Ry(r,e.repo_ops))}
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
  </section>`}function af(e,t={}){let n=null;function r(){if(n===null){rt(c``,e);return}let i=Ay(n.operations,n.cleanup_failures,{expanded:n.expanded});rt(Ly({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var Iy="session-preferred",Dy=["exclusive_machine","iterative_user_judgment","visual_verification"];function lf(e,t){if(!Ko(e).includes(Iy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Dy.includes(n)?n:""}var Py=Et("views:worker:adapter"),My="tab:worker:ready",Ny="tab:worker:blocked",qy="tab:worker:in-progress",Fy="tab:worker:resolved",jy="tab:worker:closed",By="\u{1F512} blocked",Uy={revision:0,auto_advance:!1,auto_merge:!1,slots:Xs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Wy=["claude_account","codex_account"],zy=[...Wr,...Wy];function Hy(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Gy(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}function Ky(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Ws}: ${n}`:Ws}function Ar(e){return e&&typeof e=="object"?e:{}}function Yy(e){let t={};for(let n of zy){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Vy(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function cf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Ir(n):null,l=new Map,a={},u=null,d=0,f=null,h=!1;function m(){h||!s||s()}function k(M){return u===M?a:{}}async function L(){if(!r||h)return;let M=o?.()||"";if(u===M||f&&f.key===M&&f.generation===d)return;let U=++d;f={key:M,generation:U};let V=null;try{V=await Promise.resolve(r("get-session-defaults",{}))}catch(re){if(U!==d)return;f=null,Py("get-session-defaults failed: %o",re),m();return}U===d&&(a=V&&typeof V.values=="object"&&V.values!==null?{...V.values}:{},u=M,f=null,m())}function j(){u=null,d+=1,L()}function H(){for(let[M,U]of l)U==="failed"&&l.delete(M)}function se(M,U){return i?i.selectBoardColumn(M,U):[]}function Q(M,U,V,re){let N=Array.isArray(M.queue)?M.queue:[],G=new Set([...N.map(q=>q.bead_id),...(Array.isArray(M.serial_lanes)?M.serial_lanes:[]).flatMap(q=>(Array.isArray(q?.entries)?q.entries:[]).map(we=>we.bead_id)),...(Array.isArray(M.pr_wait)?M.pr_wait:[]).map(q=>q.bead_id),...(Array.isArray(M.done)?M.done:[]).map(q=>q.bead_id)]),W=new Set(V.map(q=>q.id)),X=new Set,Ee=[];for(let q of[...U,...V])G.has(q.id)||X.has(q.id)||Hy(q)||(X.add(q.id),Ee.push(q));let ye=Kp(Ee,xr(re)),ce=Ar(M.bead_scope);return ye.map(q=>{let we=Or(q),Ae=we.evidence==="published",A=typeof q.workflow?.route=="string"&&q.workflow.route||(q.metadata&&typeof q.metadata.route=="string"?q.metadata.route:""),oe=A==="quick_fix",xe=!Object.hasOwn(q,"description")||typeof q.description=="string"&&q.description.trim().length>0,de=Object.hasOwn(q,"labels")&&Np(q.labels),Le=de||!Object.hasOwn(q,"labels")?"":lf(q.labels,q.metadata),_e=q.metadata&&typeof q.metadata=="object"?Object.hasOwn(q.metadata,"awaiting_user"):!1,Ne=!de&&!_e&&(oe?xe:Ae&&!we.conflict),it=W.has(q.id),ot=it?Gy(q):[],I=[];it&&ot.length===0&&I.push(By),_e&&I.push(Ky(q.metadata)),oe&&!xe?I.push("missing_description"):!oe&&we.conflict?I.push("spec_id_conflict"):!oe&&we.evidence==="none"?I.push("spec \uC5C6\uC74C"):!oe&&we.evidence==="draft"&&I.push("spec \uBBF8\uBC1C\uD589(draft)");let ae=ce[q.id];return{bead_id:q.id,title:q.title||q.id,route:A,spec_id:we.conflict?"":we.path,published:Ae,blocked:it,blocked_by:ot,labels:Array.isArray(q.labels)?q.labels:[],created_at:q.created_at,updated_at:q.updated_at,status:q.status,workflow:q.workflow||null,exec_pins:Yy(Ar(q.metadata)),rec:null,...ae&&Array.isArray(ae.scope)?{scope:ae.scope}:{},eligible:Ne,reason:I.join(" \xB7 "),worker_ineligible:de,session_preferred:Le.length>0,session_preferred_reason:Le,release_info:q.release_info,dependents_info:q.dependents_info}})}function F(M){let[U,V,re,N,G]=M,W=us([...U,...V,...re,...N,...G]),X={},Ee=(ye,ce)=>{if(!ye||typeof ye.id!="string"||ye.id.length===0)return;let q=X[ye.id]||(X[ye.id]={});if(typeof ye.priority=="number"&&!("priority"in q)&&(q.priority=ye.priority),typeof ye.from_id=="string"&&!("from_id"in q)&&(q.from_id=ye.from_id),ce&&!("metadata"in q)){q.metadata=Ar(ye.metadata);let we=Ar(ye.workflow).route;typeof we=="string"&&we.length>0&&(q.route=we)}};for(let ye of[...U,...V,...re])Ee(ye,!0);for(let ye of[...N,...G])Ee(ye,!1);for(let ye of new Set([...Object.keys(X),...W.keys()])){let ce=ds(W,ye);if(ce.total>0){let q=X[ye]||(X[ye]={});q.rollup=ce}}return X}function D(M,U,V,re){let N=new Set((Array.isArray(M.done)?M.done:[]).map(W=>W?.bead_id).filter(W=>typeof W=="string")),G=[];for(let W of U){let X=Xn(W.closed_at);if(typeof W.id!="string"||N.has(W.id)||X===null||re!==void 0&&X<re||typeof W.comment_count!="number"||W.comment_count<=0)continue;let Ee=`${V}\0${W.id}\0${String(W.updated_at)}\0${W.comment_count}`,ye=l.get(Ee);if(ye===void 0&&r&&(l.set(Ee,"pending"),Promise.resolve(r("get-comments",{id:W.id})).then(q=>{let we=Array.isArray(q)&&q.some(Ae=>fi(typeof Ae?.text=="string"?Ae.text:"")?.lane==="session");l.set(Ee,we?"session":"not-session"),m()}).catch(()=>{l.set(Ee,"failed"),m()})),ye!=="session")continue;let ce=Xn(W.started_at);G.push({id:W.id,title:W.title||W.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ce!==null&&X>=ce?X-ce:null,work_kind:"session",done_at:X,created_at:W.created_at,updated_at:W.updated_at})}return G}return{read(M){if(!t)return{workspaces:[],workspaces_state:[]};let U=t.get()||Uy,V=o?.()||"",re=M&&typeof M.done_since=="number"?M.done_since:void 0,N=se(My,"ready"),G=se(Ny,"blocked"),W=se(qy,"in_progress"),X=se(Fy,"resolved"),Ee=se(jy,"closed");return{workspaces:[{...U,bead_titles:{...Ar(U.bead_titles),...Object.fromEntries([...N,...G].filter(ye=>ye&&typeof ye.id=="string").map(ye=>[ye.id,ye.title||ye.id]))},root_dir:V,name:Vy(V),runnable:Q(U,N,G,M?M.candidate_sort:void 0),session_done:D(U,Ee,V,re),bead_overlay:F([N,G,W,X,Ee])}],workspaces_state:[{root_dir:V,revision:U.revision,auto_advance:U.auto_advance,auto_merge:U.auto_merge,slots:typeof Ar(U.workspace_info).slots=="number"?Ar(U.workspace_info).slots:U.slots,runner_catalog:U.runner_catalog,execution_defaults:U.execution_defaults,session_defaults:k(V),orchestration_model:U.orchestration_model,orchestration_effort:U.orchestration_effort,orchestration_speed:U.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){L()},refreshSessionDefaults:j,notifyIssuesChanged:H,destroy(){h=!0,d+=1,f=null,l.clear()}}}var Ci=1,uf=5,Xy={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Ci,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function sn(e){return e&&typeof e=="object"?e:{}}var ff="beads-ui.worker.candidate-filter",ul={show_blocked:!1,spec:"all"};function Qy(){try{let e=window.localStorage.getItem(ff);if(!e)return{...ul};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ul};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...ul}}}function Zy(e){try{window.localStorage.setItem(ff,JSON.stringify(e))}catch{}}var Jy=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],_f="bdui.worker.done-range";function ev(){try{let e=window.localStorage.getItem(_f);return e===null?"today":En(e)}catch{return"today"}}function tv(e){try{window.localStorage.setItem(_f,e)}catch{}}function df(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function nv(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function pf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function rv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function ov(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function sv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var iv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),av=new Set(["waiting_metadata","reviewing","retrying"]);function lv(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Wt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function cv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function uv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=cv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?$r(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!iv.has(e.phase)}}function dv(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function pv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=dv(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";return e.review_session?.active===!0?n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0}):e.review_session?.failure?n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${nv(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0}):n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${pf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${pf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function fv(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,f=null,h=null,m={},k=!1,L=!1,j={},H=null,se={active:!1,failure:null}){let Q=!!a&&a.position>0,F=!!a?.continuation_action&&a.continuation_action.continuation===null,D=!!a&&a.active===!0,M=a&&a.failure||null,U=ov(a?a.waiting:null),V=n[e]||null,re=V&&V.gate?V.gate:null,N=V&&V.pr?V.pr:null,G=sv(a?a.resolution:null),W=lv(h),X=uv(h,W),Ee=a&&a.authority||null,ye=!!h&&typeof h=="object"&&av.has(h.phase),ce=Q&&!D&&(!Ee||ye||Ee.source==="automatic"&&!L),q=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":G?G.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":U,we=!!re&&re.base_badge==="\uCDA9\uB3CC",Ae=!!re&&re.enabled===!0,A=Ao({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:j.repo_operations}),oe=Ys(A),xe=s&&!A&&(s.queueing??null)?s.queueing:null,de=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!re&&re.tier==="merged",Le=r&&r.step==="repo_operations"&&A?.failed===!0&&(A.step==="deploy"||A.step==="verify")?A.step:null,_e=l&&!!r&&!!re&&re.tier==="merged",Ne=ce&&(Ae||we||re?.reason==="base_behind"||re?.reason==="review_receipt_missing"||re?.reason==="review_receipt_stale"||de||_e),it=re?.reason==="review_receipt_missing"||re?.reason==="review_receipt_stale",ot=l&&we&&u===!1,I=Un(m,e,{external:l,merge_active:D||A?.step==="merge",merge_queued:Q,conflict_active:!!i,cleanup_active:oe,merged:!!r||re?.tier==="merged"}),ae=!!I.operation,le=Q&&!M&&!F&&!de&&!(X&&X.lock_actions),ie=pv({auto_pending:le,continuation_required:F,queueing:xe,merge_step:A,conflict_badge:q,conflict_live:G?.live===!0||i==="running",auto_resolution:W,recovery:X,cleanup_failed:r,cleanup_label:r?yr(r.step):null,base_exception:f,conflicting:we,gate:re,receipt_check:V&&V.receipt_check?V.receipt_check:null,queue_failure:M,auto_skip:d,queued:Q,queue_active:D,queue_position:a?a.position:0,review_session:se,activity:q?null:s&&s.activity||null}),ke=ie?.live===!0&&ie.title?c`<span title=${ie.title}>${ie.label}</span>`:ie?.label||null;return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&A?.active!==!0?Ks(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...H?{dependency_chips:H}:{},external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:ie?.live!==!0&&ie?.title?ie.label:null,completion_title:ie?.title||"",...h?.phase==="needs_human"&&typeof h.log_path=="string"&&h.log_path.length>0?{log_path:h.log_path}:{},badges:ke?[ke]:[],live_badge:ie?.live===!0?ke:null,usage:o,alert:ie?.alert===!0,merge_action:re?.tier==="merged"&&!de&&!_e?!1:!Q||F||ce||it,cancel_action:Q&&!F,cancel_enabled:!D&&!(X&&X.lock_actions),cancel_title:X&&X.lock_actions?`${X.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:D?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:I,discard_action:I.action,merge_step:A,discard_enabled:I.enabled,discard_title:I.title,merge_enabled:!A&&!xe&&!i&&!ae&&!f&&!(X&&X.lock_actions)&&!ot&&se.active!==!0&&(Ae||we||re?.reason==="base_behind"||re?.reason==="review_receipt_missing"||re?.reason==="review_receipt_stale"||de||_e||Ne||ye&&!D),merge_label:F?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":de||_e?Le==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Le==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":we&&!A&&!de?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":re?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":re?.reason==="review_receipt_missing"||re?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ce?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ae?I.error?`\uD3D0\uAE30 \uC2E4\uD328: ${I.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${I.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:F?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":xe?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":A?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${A.label}`:Le?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Le==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ot?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":de?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":we?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":re?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":se.active===!0?"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":re?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":re?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":re?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ae?`\uBA38\uC9C0 (${re.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:re&&re.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${re&&re.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function dl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,h=r?Ir(r):null,m=Qy(),k=null,L=null,j=Br(()=>te()),H=new Map,se=new Map,Q=zp(),F=ll(Q)===null,D=d?En(d):ev();function M(){let g=Er.find(b=>b.value===D);return g?g.label:"\uC624\uB298"}let U=vi("beads-ui.worker.lane-collapsed"),V=!1,re=new Set,N=new Set,G=new Set,W=new Set,X=new Set,Ee=null,ye=[],ce=cf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>te()});function q(){ce.refreshSessionDefaults()}let we=document.createElement("div");we.className="worker-console";let Ae=document.createElement("div");Ae.className="worker-top";let A=document.createElement("div");A.className="worker-drawer-overlay",A.hidden=!0;let oe=document.createElement("div");oe.className="worker-drawer-overlay__backdrop";let xe=document.createElement("div");xe.className="worker-drawer-host";let de=document.createElement("div");de.className="worker-drawer-host",de.hidden=!0,A.append(oe,xe,de);let Le=document.createElement("div");Le.className="worker-lanes-host",we.append(Ae,A,Le),e.appendChild(we);let _e=rr(null,null),Ne=[],it=ki({transport:n,console_el:we,getLanes:()=>_e,getWorkspaces:()=>Ne,getCrossLanes:()=>null,reproject:()=>({lanes:R(),raw_lanes:null}),onCorrection:()=>{},showToast:be,requestRender:()=>te(),adoptQueue:(g,b)=>{o&&o.set(b)},onDragBegin:()=>{k=null}}),ot=null,I=Zr(xe,{transport:n,sessionLogStore:s,onClose:()=>{ot=null,A.hidden=!0,te()}}),ae=af(de,{onClose:()=>{de.hidden=!0,A.hidden=!0,te()}}),le=Zp({getWorkspacePath:l||(()=>"")}),ie=l&&l()||"",ke=ef({queueStore:o,transport:n,onChanged:()=>te(),onOpenScript:(g,b)=>{le.open(g,b)}});function pe(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ci,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function qe(){let g=pe(),b=typeof g.serial_lane_count=="number"&&Number.isInteger(g.serial_lane_count)&&g.serial_lane_count>0?Math.min(g.serial_lane_count,5):0,E=Array.isArray(g.serial_lanes)?g.serial_lanes:[],ee=[];for(let Oe of E){if(ee.length>=b)break;!Oe||typeof Oe.id!="string"||!/^s[1-5]$/.test(Oe.id)||!Array.isArray(Oe.entries)||ee.push({id:Oe.id,label:`\uC9C1\uB82C ${Oe.id.slice(1)}`,count:Oe.entries.length})}return ee.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(g.queue)?g.queue:[]).length},...ee]}function Ge(g){if(!k||!g.some(E=>E.id===k))return null;let b=qe();return b?{bead_id:k,lanes:b}:null}function Xe(){return l&&l()||""}async function Pe(g,b){await it.sendOp({type:"worker-queue-place",payload:{bead_id:g,...b==="parallel"?{}:{lane:b}},root_dir:Xe()},g)}function Y(){let g=pe();return typeof g.revision=="number"?g.revision:0}function B(g){g&&g.queue&&o&&o.set(g.queue)}async function Me(g){if(!n||!g)return;let b=await n("worker-attempt-pause",{attempt_id:g});b&&b.paused===!1&&b.reason&&be(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function at(g){if(!n||!g)return;let b=await Nr();if(b===null)return;let E=async($e={})=>await n("worker-attempt-resume",{attempt_id:g,expected_revision:Y(),...b!==""?{instructions:b}:{},...$e}),ee=await E();B(ee),ee&&ee.conflict&&(ee=await E(),B(ee)),ee=await Nn(ee,($e,Oe)=>E({continuation:$e,decision_token:Oe}),{onResult:B,refresh:()=>E()}),ee&&ee.resumed===!1&&!ee.conflict&&ee.reason&&be(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ee.reason}`,"error",2400)}async function Qe(g,b,E=!0){if(!n)return null;let ee=n,$e=await ee(g,{...b,expected_revision:Y()});return B($e),$e&&$e.conflict&&E&&($e=await ee(g,{...b,expected_revision:Y()}),B($e)),$e}async function v(g){if(!n||!g)return;let b=pe().merge_queue?.find(ee=>ee.bead_id===g)?.continuation_action;if(b?.mismatch&&b.continuation===null){await Fe(g,b.mismatch);return}re.add(g),te();let E;try{E=await Qe("worker-merge-queue-add",{bead_id:g})}catch{be("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{re.delete(g),te()}if(!(!E||E.applied)){if(E.conflict){be("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}be(rv(E.reason),"error",2400)}}async function z(g){if(!(!n||!g||N.has(g))){N.add(g),te();try{let b=await n("worker-cleanup-retry",{bead_id:g,expected_revision:Y()});B(b),b&&!b.retried&&!b.conflict&&b.reason&&be(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${b.reason}`,"error",2400)}finally{N.delete(g),te()}}}async function Te(g,b){let E=pe().hold;if(!n||!E||typeof E.since!="number")return;let ee=await n(g,{since:E.since});B(ee),ee&&ee.ok===!1&&be(`${b}: ${ee.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":ee.reason||""}`,"error",2800)}async function Ce(g,b){if(!n||!g||!b)return;let E=await n("worker-parked-retry",{bead_id:g,attempt_id:b});B(E),E&&E.ok===!1&&be(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${E.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":E.reason||""}`,"error",2800)}async function Fe(g,b){let E=await Nn({continuation_mismatch:b},($e,Oe)=>Qe("worker-merge-queue-add",{bead_id:g,continuation:$e,decision_token:Oe},!1)),ee=E?.queue?.merge_queue?.find($e=>$e.bead_id===g)?.continuation_action;if(E?.applied!==!0&&ee?.continuation===null&&ee.mismatch){await Fe(g,ee.mismatch);return}E&&E.applied===!1&&!E.conflict&&be("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ue(g){if(!n)return;let b=await Qe("worker-merge-auto-toggle",{on:g});!b||b.conflict||be(g?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",g?"success":"info",2400)}async function dt(g){if(!n||!g)return;let b=await Qe("worker-merge-queue-remove",{bead_id:g});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&be("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function yt(){await Qe("worker-merge-queue-remove",{all:!0})}async function Lt(g,b=null,E="unmerged",ee=null){if(!n||!g)return;let $e=ko(g,E);if(!(!!ee||typeof globalThis.confirm!="function"||globalThis.confirm($e)))return;let Ke=await n("worker-discard",{bead_id:g,...b?{attempt_id:b}:{},...ee?{operation_id:ee}:{},expected_revision:Y()});if(B(Ke),Ke&&Ke.conflict&&(Ke=await n("worker-discard",{bead_id:g,...b?{attempt_id:b}:{},...ee?{operation_id:ee}:{},expected_revision:Y()}),B(Ke)),Ke&&Ke.discarded===!0){be(Ps(Ke),"success",5e3);return}if(Ke&&Ke.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${Ke.reason}`,"error",2800);return}if(Ke&&Ke.accepted&&Ke.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ke&&Ke.accepted&&!Ke.discarded){be(`\uD3D0\uAE30 \uC9C4\uD589: ${Ke.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ke&&!Ke.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function St(g,b,E){if(!(!n||!b||!E||W.has(b))){W.add(b),te();try{let ee=await n(g,{bead_id:b,action_id:E,expected_revision:Y()});B(ee),ee?.conflict?be("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ee?.ok&&ee?.reason&&be(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ee.reason)}`,"error",2800)}finally{W.delete(b),te()}}}async function gt(g,b){if(!n||!b||G.has(b))return;G.add(b),te();let E;try{let ee=async($e={})=>await n(g,{bead_id:b,expected_revision:Y(),...$e});E=await ee(),B(E),E&&E.conflict&&(E=await n(g,{bead_id:b,expected_revision:Y()}),B(E)),g==="worker-revise-fix"&&(E=await Nn(E,($e,Oe)=>ee({continuation:$e,decision_token:Oe}),{onResult:B,refresh:()=>ee()}))}finally{G.delete(b),te()}if(!(!E||E.conflict)){if(E.ok){be(g==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}be(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function Be(g){if(!n)return;let b=await n("worker-automation-toggle",{on:g,expected_revision:Y()});B(b),b&&b.conflict&&await n("worker-automation-toggle",{on:g,expected_revision:Y()}).then(B)}async function P(g){if(!n||!g)return;let b=await n("worker-repo-operation-dismiss",{operation_id:g});B(b),b&&b.ok===!1&&be(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${b.reason||""}`,"error",3e3)}async function ne(g){if(!n||!Number.isFinite(g))return;let b=Math.max(Ci,Math.floor(g)),E=await n("worker-queue-set-slots",{slots:b,expected_revision:Y()});B(E),E&&E.conflict&&await n("worker-queue-set-slots",{slots:b,expected_revision:Y()}).then(B)}async function he(g){if(!n||!Number.isInteger(g)||g<1||g>uf)return;let b=pe(),E=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).slice(g).reduce((Oe,Ke)=>Oe+(Array.isArray(Ke?.entries)?Ke.entries.length:0),0),ee=()=>({count:g,expected_revision:Y()}),$e=await n("worker-queue-set-serial-lane-count",ee());B($e),$e&&$e.conflict&&($e=await n("worker-queue-set-serial-lane-count",ee()),B($e)),$e&&$e.applied&&E>0&&be(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${E}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function R(){let g=_r(D),b=ce.read({candidate_sort:Q,done_since:g});return Ne=b.workspaces,_e=rr(b.workspaces,b.workspaces_state,{done_since:g,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),_e}function K(g){return g.queue_groups[0]||Xy}function Ie(g){let b=g.dependency_chips||null,E={...b&&b.released?{released:b.released}:{},...b&&b.dependents?{dependents:b.dependents}:{}},ee=H.get(g.id),$e=se.get(g.id)||null,Oe=ee&&ee.overlaps.length>0?ee.overlaps:null,Ke=!!ee&&ee.scope_missing;return!$e&&!Oe&&!Ke&&Object.keys(E).length===0?null:{...E,...$e?{predecessors:$e}:{},...Oe?{overlaps:Oe}:{},...Ke?{scope_missing:!0}:{}}}function We(g){return{...g,workspace_name:"",done_layout:void 0,dependency_chips:Ie(g)||void 0,chip_popover:De(g)}}function De(g){return Us(g,b=>j.isOpen({bead_id:g.id,chip_key:b}))}function Je(){let g=pe(),b=new Map;for(let E of Object.values(sn(g.lane_states))){let ee=Array.isArray(E?.corrections)?E.corrections:[];for(let $e of ee)$e&&typeof $e.bead_id=="string"&&typeof $e.after=="string"&&b.set($e.bead_id,$e.after)}return{admission:sn(g.admission),bead_labels:sn(g.bead_labels),correction_after:b}}function Re(g,b){let E=We(g),ee=cu(b.admission[g.id]||null,!!g.discard||W.has(g.id)),$e=b.bead_labels[g.id],Oe=b.correction_after.get(g.id);return{...E,draggable:E.draggable===!0&&!ee,stale_work:ee,reason:ee?"":E.reason,worker_serial:Array.isArray($e)&&qp($e),badges:Oe?[`\u{1F517} ${Oe} \uB4A4 (blocks \uC790\uB3D9)`,...E.badges||[]]:E.badges,revise_enabled:E.revise_enabled===!0&&!G.has(g.id)}}function ze(g){let b=Je();return K(g).sublanes.parallel.map(E=>Re(E,b))}function Ze(g){let b=Je();return K(g).sublanes.serial.map(E=>{let ee=E.occupants.map($e=>({id:$e.id,title:$e.title,draggable:!1,lane:E.id,ghost:!0,badges:[$e.badge]}));return{id:E.id,index:E.index+1,raw_length:E.raw_length,ghosts:ee,items:E.items.map($e=>Re($e,b)),occupied:E.occupied_by.length>0,badge:E.occupants.length>0?E.occupants[0].badge:"\uB300\uAE30",cycle:E.cycle===!0}})}function ft(g){return g.runnable.map(b=>We(b))}function He(g){return g.done.map(b=>We(b))}function kt(g){let b=g.running.filter(E=>E.non_occupying!==!0).map(E=>({...E,bead_id:E.id,attempt_id:E.attempt_id||"",paused:E.run_state==="paused",failed:E.run_state==="failed",parked:E.run_state==="parked",retry_wait:E.run_state==="retry_wait",status_label:E.run_state==="failed"?E.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":E.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":E.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:E.can_pause!==!1,workspace_name:"",dependency_chips:Ie(E)||void 0,chip_popover:De(E),rollup_expanded:X.has(E.id),failure:E.failure?{...E.failure,open:L===E.attempt_id}:null}));return[...b.filter(E=>E.failed===!0),...b.filter(E=>E.failed!==!0&&E.parked===!0),...b.filter(E=>E.failed!==!0&&E.parked!==!0)]}function Nt(g){if(Ee&&Ee.model===g)return Ee.rows;let b=pe(),E=K(g),ee=sn(b.attempts),$e=Object.values(ee).filter(jn),Oe=new Map;for(let Ve of $e)Oe.set(Ve.attempt_id,Ve);let Ke=new Map;for(let Ve of $e)Ke.set(Ve.bead_id,Ve);let ht=new Map;for(let Ve of[...g.pr_wait,...g.running,...g.queue,...g.runnable,...g.done])ht.has(Ve.id)||ht.set(Ve.id,Ve);let Ft=Ve=>{let Dt=null;for(let _n of $e)!_n||_n.bead_id!==Ve||ka(_n,Oe)||(Dt===null||(typeof _n.started_at=="number"?_n.started_at:0)>=(typeof Dt.started_at=="number"?Dt.started_at:0))&&(Dt=_n);return Dt&&typeof Dt.target_base=="string"?Dt.target_base:null},Gt=new Map;for(let Ve of g.running)Ve.run_state==="failed"||Ve.conflict_resolution!==!0||(Ve.run_state!=="paused"?Gt.set(Ve.id,"running"):Gt.has(Ve.id)||Gt.set(Ve.id,"paused"));let fn=sn(b.auto_merge_skips),lr=new Set(E.merge.auto_excluded),Sn=sn(b.pr_observations),On=sn(b.pr_activity),Ln=sn(b.cleanup_failed),Kt=sn(b.discard_operations),Kn=sn(b.bead_workflow),In=sn(b.bead_titles),Yn=b.merge_queue_state||{active:null,failures:{}},Dn=E.merge.state.waiting,Vn=(Array.isArray(b.pr_wait)?b.pr_wait:[]).map(Ve=>{let Dt=ht.get(Ve.bead_id);return{...fv(Ve.bead_id,Dt?.title||In[Ve.bead_id]||Ve.bead_id,Sn,Ln[Ve.bead_id]||null,Fn(ee,Ve.bead_id),On[Ve.bead_id]||(re.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:N.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Gt.get(Ve.bead_id)||null,Ve.external===!0,{position:E.merge.positions.get(Ve.bead_id)||0,active:Yn.active===Ve.bead_id,failure:sn(Yn.failures)[Ve.bead_id]||null,waiting:Dn&&Dn.bead_id===Ve.bead_id?Dn.reason:null,resolution:E.merge.resolutions.get(Ve.bead_id),continuation_action:E.merge.continuations.get(Ve.bead_id),authority:E.merge.authorities.get(Ve.bead_id)||null},Ve.wt_present!==!1,b.auto_merge===!0&&lr.has(Ve.bead_id)?fn[Ve.bead_id]?.reason||"":null,wa(E.declared_base,Ft(Ve.bead_id)),sn(b.completion_status)[Ve.bead_id]||null,Kt,Ke.get(Ve.bead_id)?.worker_serial===!0,b.auto_merge===!0,{merge_sha:Ve.merge_sha,cleanup_cursor:Ve.cleanup_cursor,repo_operations:E.repo_operations},Dt?Ie(Dt):null,su(ee,Ve.bead_id)),workflow:Kn[Ve.bead_id]||null,priority:Dt?.priority,from_id:Dt?.from_id,...Dt?.created_at===void 0?{}:{created_at:Dt.created_at},...Dt?.updated_at===void 0?{}:{updated_at:Dt.updated_at}}});return Ee={model:g,rows:Vn},Vn}function tt(g){let b=K(g),E=[];for(let Oe of g.running)Oe.non_occupying!==!0&&E.push({id:Oe.id,title:Oe.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Oe.serial_lane_id??null});for(let Oe of g.pr_wait)E.push({id:Oe.id,title:Oe.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Oe of b.sublanes.serial)Oe.items.forEach((Ke,ht)=>{E.push({id:Ke.id,title:Ke.title,location_label:`${Oe.id} #${ht+1}`,kind:"serial",lane_id:Oe.id})});b.sublanes.parallel.forEach((Oe,Ke)=>{E.push({id:Oe.id,title:Oe.title,location_label:`#${Ke+1}`,kind:"parallel",lane_id:null})});for(let Oe of g.runnable)E.push({id:Oe.id,title:Oe.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Oe.queue_placeable===!0});let ee=pe();H=Yp(ee.bead_scope,E);let $e=new Map;for(let Oe of[...g.running,...g.runnable])Array.isArray(Oe.blocked_by)&&Oe.blocked_by.length>0&&$e.set(Oe.id,Oe.blocked_by);for(let[Oe,Ke]of Object.entries(sn(ee.bead_blocked_by)))Array.isArray(Ke)&&$e.set(Oe,Ke.filter(ht=>typeof ht=="string"&&ht.length>0));se=yu($e,E,sn(ee.blocker_workspaces))}function Tt(g){let b=g.hold&&typeof g.hold=="object"?g.hold:null;if(!b||b.kind!=="env"&&b.kind!=="systemic")return"";let E=sr(b.cause)||String(b.cause||""),ee=Array.isArray(g.lineages)?g.lineages:[];if(b.kind==="env"){let Oe=ee.map(ht=>ht&&ht.next_at).filter(ht=>typeof ht=="number").sort((ht,Ft)=>ht-Ft)[0],Ke=typeof Oe=="number"?` \xB7 \uB2E4\uC74C ${new Date(Oe).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${E} — 재시도 대기${Ke}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let $e=(Array.isArray(b.bead_ids)?b.bead_ids:[]).filter(Oe=>typeof Oe=="string"&&Oe.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${E}${$e.length>0?` \u2014 bead ${$e.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function xt(g){let b=pe(),E=K(g),ee=E.sublanes.parallel,$e=ee.length>0?ee[0].id:"\u2014",Oe=c`<button
      type="button"
      class="worker-play${b.auto_advance?" is-active":""}"
    >
      ${b.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ke=Ut(g),ht=E.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ft=b.auto_advance?0:(Array.isArray(b.queue)?b.queue:[]).filter(Kt=>Kt&&typeof Kt.armed_by_lane=="string"&&Kt.armed_by_lane.length>0).length,Gt=Ft>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Ft}건 진행 중</span
          >`:"",fn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${E.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Nt(g).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${M()} 완료 <b>${g.done.length}</b></span
      >`,lr=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${E.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${E.declared_base||"?"}</span
    >`,Sn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ci}
          step="1"
          .value=${String(E.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:uf},(Kt,Kn)=>Kn+1).map(Kt=>c`<option
                value=${String(Kt)}
                ?selected=${E.serial_lane_count===Kt}
              >
                ${Kt}
              </option>`)}
        </select>
      </label> `,On=au(E.repo_operations,E.cleanup_failures),Ln=Tt(b);return V?c`<div class="worker-ribbon">
          ${Oe} ${Ke}
          <div class="worker-kpi worker-kpi--ribbon">
            ${ht}${Gt}${fn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Sn}</div>
          <div class="worker-kpi">${lr}</div>
        </div>
        ${Ln}${On}${ke.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Oe}${Ke}${Sn}</div>
        <div class="worker-kpi">
          ${ht}${Gt}${fn}${lr}
          ${(Array.isArray(E.token_total)?E.token_total:E.token_total?[{label:E.token_total,tooltip:`${M()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Kt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Kt.tooltip}
                >${M()} 완료 · 누적 ${Kt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${$e}</b></span
          >
        </div>
      </div>
      ${Ln}${On}${ke.template()}`}function Ct(g){let b=g.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Jy.map(E=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===E.value?" is-active":""}"
              data-spec=${E.value}
              aria-pressed=${m.spec===E.value?"true":"false"}
            >
              ${E.label}
            </button>`)}
        ${b.spec>0?c`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function qt(){let g=F?"custom":ll(Q)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${g}
    >
      ${Yo.map(b=>c`<option value=${b.id} ?selected=${g===b.id}>
            ${b.label}
          </option>`)}
      <option value="custom" ?selected=${g==="custom"}>
        사용자 지정…
      </option>
    </select>`}function an(){let g=Vo(Q);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(b=>{let E=g[b];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${b}
            aria-label=${`${b+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${E?E.key:""}
          >
            ${b===0?"":c`<option value="" ?selected=${!E}>없음</option>`}
            ${Wp.map(ee=>c`<option
                  value=${ee.key}
                  ?selected=${!!E&&E.key===ee.key}
                >
                  ${ee.label}
                </option>`)}
          </select>
          ${E?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${b}
                aria-label=${E.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${E.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${E.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Bt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${D}
      >
        ${Er.map(g=>c`<option value=${g.value} ?selected=${D===g.value}>
              ${g.label}
            </option>`)}
      </select>
    </div>`}function Ut(g){let b=K(g).merge,E=pe().auto_merge===!0;if(b.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${E?" is-active":""}"
        title=${E?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${E?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${b.positions.size}
      </button>`;if(E)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let ee=new Set(b.auto_excluded),$e=Nt(g).filter(Oe=>Oe.merge_action&&Oe.merge_enabled&&!ee.has(Oe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${$e>0?` ${$e}`:""}
    </button>`}function It(g){if(!(g.draggable!==!0||g.done===!0))return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${g.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function Mt(g,b){return c`<div
      data-bead-id=${g.id}
      data-drag-kind=${b.kind}
      data-root-dir=${b.root_dir}
      data-lane-id=${Qt(b.lane_id)}
      data-row-index=${b.row_index}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${vn(g,{actions:It(g)})}
    </div>`}function Zt(g){let b=ze(g),E=Xe();return zs({parallel:{rows:b.map((ee,$e)=>Mt(ee,{kind:"parallel",root_dir:E,row_index:$e})),count:b.length,collapsed:U.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:E}},serial:{lanes:Ze(g).map(ee=>({id:ee.id,title:`\uC9C1\uB82C ${ee.index}`,rows:[...ee.ghosts.map($e=>vn($e,{actions:It($e)})),...ee.items.map(($e,Oe)=>Mt($e,{kind:"repo-serial",root_dir:E,row_index:Oe,lane_id:ee.id}))],count:ee.ghosts.length+ee.items.length,empty:ee.ghosts.length+ee.items.length===0,badge:ee.badge,held:ee.occupied,cycle:ee.cycle,drop:{drop:"repo-serial",root_dir:E,lane_id:ee.id,lane_length:String(ee.raw_length)}})),collapsed:U.isAreaCollapsed("serial")}})}function zt(g){return ep(kt(g),Date.now(),ot)}function vt(g){return g.running.some(b=>b.kind!=="session"&&b.run_state==="running")}function Xt(g){let b=K(g),E=ft(g),ee=ze(g),$e=He(g),Oe=Nt(g),Ke=kt(g),ht=Rn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:E,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:qt(),header_row:F?an():void 0,controls:Ct(g),collapsible:!0,collapsed:U.isCollapsed("candidate"),place_menu:Ge(E),onOpenDoc:u?(Gt,fn)=>u(fn):void 0}),Ft=Rn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:$e,empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Bt(),collapsible:!0,collapsed:U.isCollapsed("done"),preview:V?Array.isArray(b.token_total)?b.token_total.map(Gt=>Gt.label).join(" \xB7 "):b.token_total||df($e):void 0});return V?c`<div class="worker-lanes worker-lanes--mobile">
        ${Hs({live:vt(g),running_body:Ke.length>0?zt(g):"",pr_wait_rows:Oe.map(Gt=>vn(Gt)),count:Ke.length+Oe.length})}
        ${Rn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ee,count:ee.length,collapsible:!0,collapsed:U.isCollapsed("queue"),preview:df(ee),body:Zt(g)})}
        ${ht} ${Ft}
      </div>`:c`<div class="worker-lanes">
      ${ht}
      ${Rn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:ee,count:ee.length,collapsible:!0,collapsed:U.isCollapsed("queue"),body:Zt(g)})}
      ${Rn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ke,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${b.slots}</span
        >`,live:vt(g),collapsible:!0,collapsed:U.isCollapsed("running"),body:zt(g)})}
      ${Rn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Oe,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:U.isCollapsed("pr_wait")})}
      ${Ft}
    </div>`}function ve(g){U.toggle(g),te()}function T(g){U.toggleArea(g),te()}function te(){let g=R();tt(g),rt(xt(g),Ae),rt(Xt(g),Le)}function y(){let g=!0,b=yi(E=>{if(V=E,g){g=!1;return}te()});ye.push(b)}function p(g){m=g,Zy(g),te()}function _(g){if(g==="custom"){F=!0,te();return}Q=xr(g),cl(Q),F=!1,te()}function S(g){Q=xr({chain:g}),cl(Q),te()}function O(g){D=En(g),tv(D),f?.(D),te()}function Z(g){let b=g.target?.closest?.(".worker-serial-lane-count");if(b){let Ft=Number.parseInt(b.value,10);Number.isFinite(Ft)&&he(Ft).then(te);return}let E=g.target?.closest?.(".worker-filter__blocked");if(E){p({...m,show_blocked:E.checked});return}let ee=g.target?.closest?.(".worker-sort-chain__key");if(ee){let Ft=Number.parseInt(ee.getAttribute("data-step")||"",10);Number.isFinite(Ft)&&S(Hp(Vo(Q),Ft,ee.value));return}let $e=g.target?.closest?.(".worker-done-range");if($e){O($e.value);return}let Oe=g.target?.closest?.(".worker-sort");if(Oe){_(Oe.value);return}let Ke=g.target?.closest?.(".worker-slots__input");if(!Ke)return;let ht=Number.parseInt(Ke.value,10);if(!Number.isFinite(ht)){te();return}ne(ht).then(te)}function ue(g){return g?{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,worktree:g.worktree||void 0,status:g.status||void 0,session_id:g.session_id||void 0}:{}}function me(){let g=K(R()),b=pe().workspace_info,E=b&&typeof b=="object"&&b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return{operations:g.repo_operations,cleanup_failures:g.cleanup_failures,repo:l&&l()||"",repo_ops:E}}function ge(){ot&&I.close(),de.hidden=!1,A.hidden=!1,ae.open(me()),te()}function st(g){let b=pe(),E=b.attempts?b.attempts[g]:null;ot=g,ae.close(),de.hidden=!0,A.hidden=!1,I.open({attempt_id:g,meta:ue(E)}),te()}function ut(g){let b=pe(),E=(Array.isArray(b.session_active)?b.session_active:[]).find($e=>$e&&$e.bead_id===g),ee=(E&&Array.isArray(E.session_refs)?E.session_refs:[]).find($e=>$e&&$e.current===!0);ee&&(ae.close(),de.hidden=!0,A.hidden=!1,I.open(qr(ee,g,"in_progress")),te())}function Ht(){if(ae.isOpen()&&ae.refresh(me()),!ot)return;let g=pe(),b=g.attempts?g.attempts[ot]:null;if(b){I.updateMeta(ue(b));return}I.close()}function wt(g,b){if(g.length===0||!i)return;let E=l?l():void 0;if(b.length===0||!E||b===E||!a){i(g);return}Promise.resolve(a(b)).then(()=>{i(g)}).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function x(g){let b=g.target;if(b?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let E=b?.closest?.(".worker-sort-chain__dir");if(E){let $=Number.parseInt(E.getAttribute("data-step")||"",10);Number.isFinite($)&&S(Gp(Vo(Q),$));return}let ee=b?.closest?.(".worker-dep__open");if(ee){wt(ee.getAttribute("data-dep-id")||"",ee.getAttribute("data-root-dir")||"");return}let $e=b?.closest?.(".judgement-chip");if($e){let $=$e.closest("[data-bead-id]"),fe=$&&$.getAttribute("data-bead-id")||"",je=$e.getAttribute("data-chip-key")||"";fe&&je&&j.toggle({bead_id:fe,chip_key:je});return}if(b?.closest?.(".chip-popover"))return;if(b?.closest?.(".worker-repo-strip")){ge();return}let Oe=b?.closest?.(".worker-repo-op__dismiss");if(Oe){P(Oe.dataset.operationId||"");return}let Ke=b?.closest?.(".worker-cleanup__resume");if(Ke){let $=Ke.dataset.beadId;$&&z($);return}if(b?.closest?.(".worker-hold__retry")){Te("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(b?.closest?.(".worker-hold__resume")){Te("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(b?.closest?.(".worker-play")){Be(!pe().auto_advance);return}let ht=b?.closest?.(".worker-merge-all");if(ht){ht.classList.contains("worker-merge-all--stop")?pe().auto_merge===!0?Ue(!1):yt():Ue(!0);return}let Ft=b?.closest?.(".worker-pane__toggle[data-lane]");if(Ft){let $=Ft.dataset.lane;($==="candidate"||$==="queue"||$==="running"||$==="pr_wait"||$==="done")&&ve($);return}let Gt=b?.closest?.(".worker-wait__area-toggle[data-area]");if(Gt){let $=Gt.dataset.area;($==="parallel"||$==="serial")&&T($);return}let fn=b?.closest?.(".worker-card__place-lane");if(fn){let $=fn.dataset.beadId,fe=fn.dataset.lane;$&&(fe==="parallel"||/^s[1-5]$/.test(fe||""))&&(k=null,te(),Pe($,fe));return}if(b?.closest?.(".worker-card__place-cancel")){k=null,te();return}let Sn=b?.closest?.(".worker-card__place");if(Sn){let $=Sn.dataset.beadId;$&&!Sn.disabled&&(qe()?(k=$,te()):Pe($,"parallel"));return}let On=b?.closest?.(".worker-filter__chip");if(On){let $=On.dataset.spec;($==="all"||$==="with"||$==="without")&&p({...m,spec:$});return}let Ln=b?.closest?.('[data-action="queue-remove"]');if(Ln){let $=Ln.dataset.beadId||"";$&&it.sendOp({type:"worker-queue-remove",payload:{bead_id:$},root_dir:Xe()},$);return}let Kt=b?.closest?.(".worker-mini__merge");if(Kt){let $=Kt.dataset.beadId||"";pe().cleanup_failed?.[$]?z($):v($);return}let Kn=b?.closest?.(".worker-mini__merge-cancel");if(Kn){dt(Kn.dataset.beadId||"");return}let In=b?.closest?.(".worker-mini__discard");if(In){Lt(In.dataset.beadId||"",In.dataset.attemptId||null,In.dataset.discardMode==="merged"?"merged":"unmerged",In.dataset.operationId||null);return}let Yn=b?.closest?.(".worker-mini__stale-continue");if(Yn){St("worker-stale-work-continue",Yn.dataset.beadId||"",Yn.dataset.actionId||"");return}let Dn=b?.closest?.(".worker-mini__stale-backup");if(Dn){St("worker-stale-work-backup-fresh",Dn.dataset.beadId||"",Dn.dataset.actionId||"");return}let Vn=b?.closest?.(".worker-mini__stale-recheck");if(Vn){St("worker-stale-work-recheck",Vn.dataset.beadId||"",Vn.dataset.actionId||"");return}let Ve=b?.closest?.(".worker-mini__revise-fix");if(Ve){gt("worker-revise-fix",Ve.dataset.beadId||"");return}let Dt=b?.closest?.(".worker-mini__revise-approve");if(Dt){gt("worker-revise-approve",Dt.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;let _n=b?.closest?.(".rtile__failure-badge");if(_n){let $=_n.dataset.attemptId||"";L=L===$?null:$,te();return}let Xo=b?.closest?.(".rtile__attempt-copy");if(Xo){let $=Xo.dataset.attemptId||"";$&&en($).then(fe=>{be(fe?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",fe?"success":"error",1400)});return}if(b?.closest?.(".rtile__parked-retry")){let $=b?.closest?.(".rtile");Ce($?.dataset?.beadId||"",$?.dataset?.attemptId||"");return}let eo=b?.closest?.(".rtile__discard");if(eo){let $=b?.closest?.(".rtile"),fe=$?.dataset?.beadId,je=$?.dataset?.attemptId;fe&&Lt(fe,je||null,eo.dataset.confirmation==="merged"?"merged":"unmerged",eo.dataset.operationId||null);return}if(b?.closest?.(".rtile__pause")){let fe=b?.closest?.(".rtile")?.dataset?.attemptId;fe&&Me(fe);return}if(b?.closest?.(".rtile__resume")){let fe=b?.closest?.(".rtile")?.dataset?.attemptId;fe&&at(fe);return}if(b?.closest?.(".rtile__session")){let $=b?.closest?.(".rtile"),fe=$?.dataset?.attemptId;if(fe){st(fe);return}let je=$?.dataset?.beadId;je&&ut(je);return}if(b?.closest?.(".rtile__failure-pop"))return;if(b?.closest?.(".worker-drawer-overlay__backdrop")){ae.close(),I.close();return}if(b?.closest?.(".worker-drawer-host"))return;let Qo=b?.closest?.(".rtile .board-card__roll-toggle");if(Qo){let $=Qo.dataset.rollParent;$&&(X.has($)?X.delete($):X.add($),te());return}let nt=b?.closest?.(".rtile .board-card__roll-child");if(nt){let $=nt.dataset.childId;$&&i&&i($);return}let w=b?.closest?.(".rtile");if(w){if(b?.closest?.(".rtile__id")){let fe=w.dataset.beadId;fe&&en(fe).then(je=>{je?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let $=w.dataset.beadId;$&&i&&i($);return}let J=b?.closest?.(".worker-mini, .worker-card");if(J){let $=J.dataset.beadId;if(b?.closest?.('[data-seam="log-path-copy"]'))return;if(b?.closest?.(".worker-mini__id, .worker-card__id")){$&&en($).then(je=>{je?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let fe=b?.closest?.(".ctl-chip--from");if(fe){let je=fe.dataset.fromId;je&&i&&i(je);return}$&&i&&i($)}}it.attach(e),e.addEventListener("click",x),e.addEventListener("change",Z);function C(g){let b=g.target,E=b&&typeof b.closest=="function"?ee=>b.closest(ee):()=>null;L&&!E(".rtile__failure-pop, .rtile__failure-badge")&&(L=null,te())}function Se(g){g.key!=="Escape"||L===null||(L=null,te())}return document.addEventListener("click",C),document.addEventListener("keydown",Se),j.attach(),ye.push(()=>{document.removeEventListener("click",C),document.removeEventListener("keydown",Se),j.detach()}),y(),h&&ye.push(h.subscribe(()=>{ce.notifyIssuesChanged(),te()})),o&&ye.push(o.subscribe(()=>{let g=l&&l()||"";g!==ie&&(ie=g,le.close()),te(),Ht()})),te(),{load(){ce.ensureSessionDefaults(),te()},refreshSessionDefaults:q,destroy(){for(let g of ye.splice(0))try{g()}catch{}it.detach(),e.removeEventListener("click",x),e.removeEventListener("change",Z),ce.destroy();try{I.destroy()}catch{}A.hidden=!0;try{le.destroy()}catch{}rt(c``,e)}}}function pl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function mf(e,t,n,r=async()=>{},o=async()=>{}){let s=Et("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(M){let V=M.target.value,N=t.getState().workspace?.current?.path||"";if(V&&V!==N){s("switching workspace to %s",V),l=!0,D();try{await n(V)}catch(G){s("workspace switch failed: %o",G)}finally{l=!1,D()}}}async function f(){let M=t.getState(),U=M.workspace?.current?.path||M.workspace?.available?.[0]?.path||"";if(!(!U||a)){s("git-pulling workspace %s",U),a=!0,D();try{await r(U)}catch(V){s("workspace git pull failed: %o",V)}finally{a=!1,D()}}}function h(M){let U=M.target;U&&e.contains(U)||L()}function m(M){M.key==="Escape"&&L()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",m),D())}function L(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),D())}function j(){u?L():k()}async function H(M){let U=M.target,V=U.value,re=U.checked;s("toggling visibility %s \u2192 %s",V,String(re));try{await o(V,re)}catch(N){s("workspace visibility toggle failed: %o",N)}}function se(M){return M?c`
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
    `:c``}function Q(M,U){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${j}
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
                ${M.map(V=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${V.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${V.path}"
                        .checked=${!U.has(V.path)}
                        @change=${H}
                      />
                      <span class="workspace-picker__manage-name"
                        >${pl(V.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function F(){let M=t.getState(),U=M.workspace?.current,V=M.workspace?.available||[],re=new Set(M.workspace?.hidden||[]),N=U?.path||V[0]?.path||"";if(V.length===0)return c``;let G=V.filter(W=>!re.has(W.path)||W.path===N);if(G.length<=1){let W=G[0]||V[0],X=pl(W.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${W.path}"
            >${X}</span
          >
          ${Q(V,re)}
          ${se(N)}
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
          ${G.map(W=>c`
              <option
                value="${W.path}"
                ?selected=${W.path===N}
                title="${W.path}"
              >
                ${pl(W.path)}
              </option>
            `)}
        </select>
        ${Q(V,re)}
        ${se(N)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){rt(F(),e)}return D(),i=t.subscribe(()=>D()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),rt(c``,e)}}}var gf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function fl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function hf(e,t,n=fl()){return{id:n,type:e,payload:t}}function bf(e={}){let t=Et("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],f=new Map,h=new Set;function m(F){for(let D of Array.from(h))try{D(F)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let F=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),D=(n.jitterRatio||0)*F,M=Math.max(0,Math.round(F+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",M,i+1),l=setTimeout(()=>{l=null,Q()},M)}function L(F){try{o?.send(JSON.stringify(F))}catch(D){t("ws send failed",D)}}function j(){for(s="open",t("ws open"),m(s),i=0;d.length;){let F=d.shift();F&&L(F)}}function H(F){let D;try{D=JSON.parse(String(F.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let U=u.get(D.id);u.delete(D.id),D.ok?U?.resolve(D.payload):U?.reject(D.error||new Error("ws error"));return}let M=f.get(D.type);if(M&&M.size>0)for(let U of Array.from(M))try{U(D.payload)}catch(V){t("ws event handler error",V)}else t("ws received unhandled message type: %s",D.type)}function se(){s="closed",t("ws closed"),m(s);for(let[F,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(F);i+=1,k()}function Q(){if(!a)return;let F=r();try{o=new WebSocket(F),t("ws connecting %s",F),s="connecting",m(s),o.addEventListener("open",j),o.addEventListener("message",H),o.addEventListener("error",()=>{}),o.addEventListener("close",se)}catch(D){t("ws connect failed %o",D),k()}}return Q(),{send(F,D){if(!gf.includes(F))return Promise.reject(new Error(`unknown message type: ${F}`));let M=fl(),U=hf(F,D,M);return t("send %s id=%s",F,M),new Promise((V,re)=>{u.set(M,{resolve:V,reject:re,type:F}),o&&o.readyState===o.OPEN?L(U):(t("queue %s id=%s (state=%s)",F,M,s),d.push(U))})},on(F,D){f.has(F)||f.set(F,new Set);let M=f.get(F);return M?.add(D),()=>{M?.delete(D)}},onConnection(F){return h.add(F),()=>{h.delete(F)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,Q()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function _v(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function mv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var _l=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],yf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],ir="tab:worker:closed",gv="bdui.worker.done-range",vf=gp,wf="worker:queue",kf="ui:order",$f="ui:display-policy",xf="exec:presets",ar="tab:board:closed",Af="beads-ui.board.closed-range";function hv(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+bv(e))});return n.observe(e),()=>n.disconnect()}function bv(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function yv(e){let t=Et("main");t("bootstrap start"),hv(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;rt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Mp(i),l&&a&&u&&d){let xe=function(x,C){let Se="Request failed",g="";if(x&&typeof x=="object"){let E=x;if(typeof E.message=="string"&&E.message.length>0&&(Se=E.message),typeof E.details=="string")g=E.details;else if(E.details&&typeof E.details=="object")try{g=JSON.stringify(E.details,null,2)}catch{g=""}}else typeof x=="string"&&x.length>0&&(Se=x);let b=C&&C.length>0?`Failed to load ${C}`:"Request failed";oe.open(b,Se,g)},Me=function(x){return`${ve.getState().workspace.current?.path||""}\0${x}`},at=function(){ke&&(ke().catch(()=>{}),ke=null),pe=null,qe=null},v=function(x){Ge=x;let C=()=>{Ge!==x||ve.getState().selected_id!==x||(Ge=null,Qe(x))};if(!Y){Pe.then(C);return}C()},Fe=function(x,C,Se,g,b){return Se!==Ce[C]?(b().catch(()=>{}),!1):(x.set(g,b),!0)},dt=function(){let x=ve.getState();Be(x.view==="board"),Ie(x.view==="worker"),Ze(ze(x)),De(x.view==="board"||x.view==="worker"||Ue||!!x.selected_id)},St=function(){let x=_r(yt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},gt=function(){let x=_r(Lt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},Be=function(x){if(x)for(let[C,Se]of _l){if(z.has(C)||Te.has(C))continue;let g=C===ar?St():{type:Se};try{Ne.register(C,g)}catch(ee){t("register %s store failed: %o",C,ee)}Te.add(C);let b=Ce.board,E=!1;_e.subscribeList(C,g).then(ee=>{E=!Fe(z,"board",b,C,ee)}).catch(ee=>{t("subscribe %s failed: %o",C,ee),xe(ee,"board")}).finally(()=>{Te.delete(C),E&&dt()})}else he()},he=function(){Ce.board+=1;for(let[x]of _l){let C=z.get(x);C&&(C().catch(()=>{}),z.delete(x));try{Ne.unregister(x)}catch(Se){t("unregister %s failed: %o",x,Se)}}},Ie=function(x){if(!x){We();return}for(let[C,Se]of yf){if(R.has(C)||Te.has(C))continue;let g=C===ir?gt():{type:Se};try{Ne.register(C,g)}catch(ee){t("register %s store failed: %o",C,ee)}Te.add(C);let b=Ce.worker,E=!1;_e.subscribeList(C,g).then(ee=>{E=!Fe(R,"worker",b,C,ee)}).catch(ee=>{t("subscribe %s failed: %o",C,ee),xe(ee,"worker")}).finally(()=>{Te.delete(C),E&&dt()})}},We=function(){Ce.worker+=1;for(let[x]of yf){let C=R.get(x);C&&(C().catch(()=>{}),R.delete(x));try{Ne.unregister(x)}catch(Se){t("unregister %s failed: %o",x,Se)}}},De=function(x){if(!x){Je();return}K||(Le("subscribe-worker-queue",{id:wf}).catch(C=>{t("subscribe-worker-queue failed: %o",C)}),K=()=>Le("unsubscribe-worker-queue",{id:wf}))},Je=function(){K&&(K().catch(()=>{}),K=null)},ze=function(x){return x.view==="monitor"||x.selected_id!=null},Ze=function(x){if(!x){ft();return}Re||(Le("subscribe-monitor-pipeline",{id:vf}).catch(C=>{t("subscribe-monitor-pipeline failed: %o",C)}),Re=()=>Le("unsubscribe-monitor-pipeline",{id:vf}))},ft=function(){Re&&(Re().catch(()=>{}),Re=null)},kt=function(){He||(Le("subscribe-ui-order",{id:kf}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),He=()=>Le("unsubscribe-ui-order",{id:kf}))},Nt=function(){He&&(He().catch(()=>{}),He=null),I.clear()},Tt=function(){tt||(Le("subscribe-display-policy",{id:$f}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),tt=()=>Le("unsubscribe-display-policy",{id:$f}))},xt=function(){tt&&(tt().catch(()=>{}),tt=null),ae.clear()},qt=function(){Ct||(Le("subscribe-impl-presets",{id:xf}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),Ct=()=>Le("unsubscribe-impl-presets",{id:xf}))},Zt=function(x){if(!x)return"Unknown";let C=x.split("/").filter(Boolean);return C.length>0?C[C.length-1]:"Unknown"},ue=function(x,C){Z.open(x.path,{missing_state:x.missing_state,...C?{workspace:C}:{}})};var f=xe,h=Me,m=at,k=v,L=Fe,j=dt,H=St,se=gt,Q=Be,F=he,D=Ie,M=We,U=De,V=Je,re=ze,N=Ze,G=ft,W=kt,X=Nt,Ee=Tt,ye=xt,ce=qt,q=Zt,we=ue;let Ae=document.getElementById("header-loading"),A=oc(Ae),oe=Hd(e),de=bf(),Le=A.wrapSend((x,C)=>de.send(x,C)),_e=Ql(Le),Ne=Zl(),it=ec(),ot=Rl(),I=Jl(),ae=Tl(),le=Cl(),ie=Ol();de.on("impl-presets-snapshot",x=>{let C=x;C&&typeof C.revision=="number"&&Array.isArray(C.presets)&&le.set({revision:C.revision,presets:C.presets})}),de.on("monitor-pipeline-snapshot",x=>{let C=x;if(!(!C||!Array.isArray(C.workspaces)))try{ot.set(C.workspaces,C.workspaces_state,C.cross_lanes)}catch{}}),de.on("ui-order-snapshot",x=>{let C=x;if(C&&typeof C.revision=="number")try{I.set({revision:C.revision,order:C.order&&typeof C.order=="object"?C.order:{}})}catch{}}),de.on("display-policy-snapshot",x=>{let C=x;if(C&&C.policy&&typeof C.policy=="object")try{ae.set(C.policy)}catch{}}),de.on("session-log-snapshot",x=>{let C=x;if(C&&typeof C.id=="string")try{ie.set(C.id,Array.isArray(C.lines)?C.lines:[],typeof C.last_event_at=="number"?C.last_event_at:null)}catch{}}),de.on("session-log-append",x=>{let C=x;if(C&&typeof C.id=="string")try{ie.append(C.id,C.event)}catch{}}),de.on("snapshot",x=>{let C=x,Se=C&&typeof C.id=="string"?C.id:"",g=Se?Ne.getStore(Se):null;if(g&&C&&C.type==="snapshot")try{g.applyPush(C)}catch{}}),de.on("upsert",x=>{let C=x,Se=C&&typeof C.id=="string"?C.id:"",g=Se?Ne.getStore(Se):null;if(g&&C&&C.type==="upsert")try{g.applyPush(C)}catch{}}),de.on("delete",x=>{let C=x,Se=C&&typeof C.id=="string"?C.id:"",g=Se?Ne.getStore(Se):null;if(g&&C&&C.type==="delete")try{g.applyPush(C)}catch{}});let ke=null,pe=null,qe=null,Ge=null,Xe=()=>{},Pe=new Promise(x=>{Xe=()=>x(void 0)}),Y=!1,B=!1;async function Qe(x){let C=Me(x);if(C===pe||C===qe)return;qe=C;let Se=`detail:${x}`,g={type:"issue-detail",params:{id:x}};try{Ne.register(Se,g)}catch(b){t("register detail store failed: %o",b)}try{let b=await _e.subscribeList(Se,g);if(ve.getState().selected_id!==x||Me(x)!==C){await b().catch(()=>{});return}ke&&await ke().catch(()=>{}),ke=b,pe=C}catch(b){t("detail subscribe failed: %o",b),xe(b,"issue details")}finally{qe===C&&(qe=null)}}let z=new Map,Te=new Set,Ce={board:0,worker:0},Ue=!1,yt=os;try{let x=window.localStorage.getItem(Af);Ni(x)&&(yt=x)}catch{}let Lt="today";try{let x=window.localStorage.getItem(gv);x!==null&&(Lt=En(x))}catch{}async function P(x){if(!Ni(x)||x===yt)return;yt=x;try{window.localStorage.setItem(Af,x)}catch{}let C=z.get(ar);if(!C)return;z.delete(ar),await C().catch(()=>{});let Se=St();try{Ne.register(ar,Se)}catch(g){t("register %s store failed: %o",ar,g)}try{let g=await _e.subscribeList(ar,Se);z.set(ar,g)}catch(g){t("re-subscribe %s failed: %o",ar,g),xe(g,"board")}}async function ne(x){let C=En(x);if(C===Lt)return;Lt=C;let Se=R.get(ir);if(!Se)return;R.delete(ir),await Se().catch(()=>{});let g=gt();try{Ne.register(ir,g)}catch(b){t("register %s store failed: %o",ir,b)}try{let b=await _e.subscribeList(ir,g);R.set(ir,b)}catch(b){t("re-subscribe %s failed: %o",ir,b),xe(b,"worker")}}let R=new Map,K=null,Re=null,He=null,tt=null,Ct=null;async function an(){tt=null,ae.clear(),Ct=null,le.clear(),K=null,Re=null,z.clear(),R.clear(),Ce.board+=1,Ce.worker+=1,qt();let x=ve.getState().workspace.current?.path;if(x)try{await de.send("set-workspace",{path:x})}catch(Se){t("workspace restore after reconnect failed: %o",Se);return}Tt();let C=ve.getState();Be(C.view==="board"),Ie(C.view==="worker"),Ze(ze(C)),De(C.view==="board"||C.view==="worker"||!!C.selected_id)}async function Bt(){t("clearing all subscriptions for workspace switch"),he(),We(),Je(),it.clear(),Nt(),kt(),xt(),Tt(),at();let x=ve.getState();if(x.selected_id)try{Ne.unregister(`detail:${x.selected_id}`)}catch{}let C=ve.getState();Be(C.view==="board"),Ie(C.view==="worker"),Ze(ze(C)),De(C.view==="board"||C.view==="worker"||!!C.selected_id),C.selected_id&&v(C.selected_id)}async function Ut(x){t("requesting workspace switch to %s",x),B=!0;try{let C=await de.send("set-workspace",{path:x});t("workspace switch result: %o",C),C&&C.workspace&&(ve.setState({workspace:{current:{path:C.workspace.root_dir,database:C.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),C.changed&&(await Bt(),be("Switched to "+Zt(x),"success",2e3)))}catch(C){throw t("workspace switch failed: %o",C),be("Failed to switch workspace","error",3e3),C}finally{B=!1}}async function It(x){t("requesting workspace git pull for %s",x);try{let C=await de.send("git-pull-workspace",{});t("workspace git pull result: %o",C);let Se=C?.status;if(Se==="up_to_date"){be("Already up to date","success",2e3);return}if(Se==="stash_pop_conflict"){be("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}be("Git pulled "+Zt(x),"success",2e3)}catch(C){t("workspace git pull failed: %o",C);let Se=C?.code,g=C?.message;if(Se==="rebase_conflict"){be("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Se==="rebase_conflict_abort_failed"){be("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Se==="busy"){be("Git pull skipped: another operation is running","warning",3e3);return}let b=g?`: ${g}`:"";throw be(`Git pull failed${b}`,"error",3e3),C}}async function Mt(x,C){t("setting workspace visibility %s \u2192 %s",x,String(C));try{await de.send("set-workspace-visibility",{path:x,visible:C}),await zt()}catch(Se){t("workspace visibility update failed: %o",Se),be("Failed to update project visibility","error",3e3)}}async function zt(){try{let x=await de.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let C=x.workspaces.map(E=>({path:E.path,database:E.database,pid:E.pid,version:E.version})),Se=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,g=Array.isArray(x.hidden)?x.hidden.filter(E=>typeof E=="string"):[];ve.setState({workspace:{current:Se,available:C,hidden:g}});let b=window.localStorage.getItem("beads-ui.workspace");b&&(!C.some(ee=>ee.path===b)||g.includes(b)?window.localStorage.removeItem("beads-ui.workspace"):Se&&b!==Se.path&&(t("restoring saved workspace preference: %s",b),await Ut(b)))}}catch(x){t("failed to load workspaces: %o",x)}}de.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(ve.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),zt(),Bt())});let vt=!1;if(typeof de.onConnection=="function"){let x=C=>{t("ws state %s",C),C==="reconnecting"||C==="closed"?(vt=!0,be("Connection lost. Reconnecting\u2026","error",4e3)):C==="open"&&vt&&(vt=!1,be("Reconnected","success",2200),mv(ve,(Se,g)=>{t(`${Se}: %o`,g)}),an())};de.onConnection(x)}let Xt="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(Xt=x)}catch(x){t("view parse error: %o",x)}let ve=rc({config:_v(),view:Xt});de.on("worker-queue-snapshot",x=>{let C=x;if(!C||!C.queue)return;let Se=ve.getState().workspace.current?.path;if(typeof Se=="string"&&Se.length>0&&C.root_dir!==Se){t("dropping worker-queue snapshot for %s",String(C.root_dir));return}try{it.set(C.queue)}catch{}});let T=tc(ve);T.start();let te=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),y=async(x,C)=>{try{return await Le(x,C)}catch(Se){if(te.has(x))throw Se;return[]}};bp({global_element:r,repo_element:o},ve,T);let p=document.getElementById("workspace-picker");p&&mf(p,ve,Ut,It,Mt);let _=kp(e,(x,C)=>Le(x,C));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>_.open())}catch{}let S=Sp(e,{policyStore:ae,queueStore:it,implPresetStore:le,transport:(x,C)=>Le(x,C),onOpenChange:x=>{let C=Ue;Ue=x,dt(),C&&x===!1&&ge.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[C]of _l)for(let Se of Ne.snapshotFor(C)||[]){let g=Se.labels;if(Array.isArray(g))for(let b of g)typeof b=="string"&&b.length>0&&x.add(b)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>S.open()))}catch{}let O=document.createElement("div");O.className="md-viewer-root",document.body.appendChild(O);let Z=hi(O,{getWorkspacePath:()=>ve.getState().workspace.current?.path}),me=vc(l,{gotoIssue:x=>T.gotoIssue(x),issueStores:Ne,transport:y,workerQueueStore:it,uiOrderStore:I,displayPolicyStore:ae,closedRange:yt,onClosedRangeChange:x=>{P(x)},onNewIssue:()=>_.open(),openDoc:ue}),ge=dl(a,{transport:y,issueStores:Ne,queueStore:it,sessionLogStore:ie,gotoIssue:x=>ve.setState({selected_id:x}),getWorkspacePath:()=>ve.getState().workspace.current?.path,switchWorkspace:x=>Ut(x),openDoc:ue,doneRange:Lt,onDoneRangeChange:x=>{ne(x)}}),st=hp(u,{transport:y,pipelineStore:ot,execPresetStore:le,sessionLogStore:ie,router:T,gotoIssue:x=>T.gotoIssue(x),getWorkspacePath:()=>ve.getState().workspace.current?.path,switchWorkspace:x=>Ut(x),openDoc:ue}),ut=zd(d,{issueStores:Ne,transport:y,queueStore:it,execPresetStore:le,sessionLogStore:ie,getWorkspacePath:()=>ve.getState().workspace.current?.path,mdViewer:Z,depCandidates:()=>{let x=ot.get();if(x===null)return null;let C=ot.getWorkspacesState(),Se=ve.getState();if(Se.view==="monitor")return Sa(x,C);let g=Se.workspace.current?.path;return g?Sa(x,C,{root_dir:g}):null},subscribeCandidates:x=>ot.subscribe(x),onDepChanged:({type:x,a:C,b:Se})=>{let g=st;x==="dep-add"&&g&&typeof g.recorrectSharedLane=="function"&&g.recorrectSharedLane(x,C,Se)},onNavigate:(x,C)=>{let Se=()=>{ve.getState().view==="worker"?ve.setState({selected_id:x}):T.gotoIssue(x)},g=ve.getState().workspace.current?.path;if(typeof C!="string"||C.length===0||!g||C===g){Se();return}Promise.resolve(Ut(C)).then(Se).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=ve.getState();ve.setState({selected_id:null});try{T.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{S.open("execution")}}),Ht=ve.getState().selected_id;Ht&&(d.hidden=!1,ut.load(Ht),v(Ht)),ve.subscribe(x=>{let C=x.selected_id;C?(d.hidden=!1,ut.load(C),B||v(C)):(ut.clear(),d.hidden=!0,at())});let wt=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",u.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),Be(x.view==="board"),Ie(x.view==="worker"),Ze(ze(x)),De(x.view==="board"||x.view==="worker"||Ue||!!x.selected_id),!x.selected_id&&x.view==="board"&&me.load(),x.view==="worker"&&ge.load(),x.view==="monitor"?st.load():st.pause(),window.localStorage.setItem("beads-ui.view",x.view)};ve.subscribe(wt),wt(ve.getState()),kt(),Tt(),qt(),zt().finally(()=>{Y=!0,Xe()}),window.addEventListener("keydown",x=>{let C=x.ctrlKey||x.metaKey,Se=String(x.key||"").toLowerCase(),g=x.target,b=g&&g.tagName?String(g.tagName).toLowerCase():"",E=b==="input"||b==="textarea"||b==="select"||g&&typeof g.isContentEditable=="boolean"&&g.isContentEditable;C&&Se==="n"&&(E||(x.preventDefault(),_.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&yv(t)});export{yv as bootstrap,_v as readBootstrapConfig,mv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
