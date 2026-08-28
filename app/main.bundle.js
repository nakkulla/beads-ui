var Lf=Object.create;var Li=Object.defineProperty;var If=Object.getOwnPropertyDescriptor;var Df=Object.getOwnPropertyNames;var Mf=Object.getPrototypeOf,Pf=Object.prototype.hasOwnProperty;var Nf=(e,t,n)=>t in e?Li(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ii=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var qf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Df(t))!Pf.call(e,o)&&o!==n&&Li(e,o,{get:()=>t[o],enumerable:!(r=If(t,o))||r.enumerable});return e};var Ff=(e,t,n)=>(n=e!=null?Lf(Mf(e)):{},qf(t||!e||!e.__esModule?Li(n,"default",{value:e,enumerable:!0}):n,e));var $t=(e,t,n)=>Nf(e,typeof t!="symbol"?t+"":t,n);var Nl=Ii((Pv,Pl)=>{var Cr=1e3,Rr=Cr*60,Or=Rr*60,gr=Or*24,Uf=gr*7,Wf=gr*365.25;Pl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return zf(e);if(n==="number"&&isFinite(e))return t.long?Gf(e):Hf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function zf(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Wf;case"weeks":case"week":case"w":return n*Uf;case"days":case"day":case"d":return n*gr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Or;case"minutes":case"minute":case"mins":case"min":case"m":return n*Rr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Cr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Hf(e){var t=Math.abs(e);return t>=gr?Math.round(e/gr)+"d":t>=Or?Math.round(e/Or)+"h":t>=Rr?Math.round(e/Rr)+"m":t>=Cr?Math.round(e/Cr)+"s":e+"ms"}function Gf(e){var t=Math.abs(e);return t>=gr?ss(e,t,gr,"day"):t>=Or?ss(e,t,Or,"hour"):t>=Rr?ss(e,t,Rr,"minute"):t>=Cr?ss(e,t,Cr,"second"):e+" ms"}function ss(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Fl=Ii((Nv,ql)=>{function Kf(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Nl(),n.destroy=c,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let h=0;h<d.length;h++)f=(f<<5)-f+d.charCodeAt(h),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,h=null,m,k;function O(...j){if(!O.enabled)return;let H=O,ae=Number(new Date),V=ae-(f||ae);H.diff=V,H.prev=f,H.curr=ae,f=ae,j[0]=n.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let q=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(P,U)=>{if(P==="%%")return"%";q++;let X=n.formatters[U];if(typeof X=="function"){let oe=j[q];P=X.call(H,oe),j.splice(q,1),q--}return P}),n.formatArgs.call(H,j),(H.log||n.log).apply(H,j)}return O.namespace=d,O.useColors=n.useColors(),O.color=n.selectColor(d),O.extend=r,O.destroy=n.destroy,Object.defineProperty(O,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(m!==n.namespaces&&(m=n.namespaces,k=n.enabled(d)),k),set:j=>{h=j}}),typeof n.init=="function"&&n.init(O),O}function r(d,f){let h=n(this.namespace+(typeof f>"u"?":":f)+d);return h.log=this.log,h}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function s(d,f){let h=0,m=0,k=-1,O=0;for(;h<d.length;)if(m<f.length&&(f[m]===d[h]||f[m]==="*"))f[m]==="*"?(k=m,O=h,m++):(h++,m++);else if(k!==-1)m=k+1,O++,h=O;else return!1;for(;m<f.length&&f[m]==="*";)m++;return m===f.length}function i(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(s(d,f))return!1;for(let f of n.names)if(s(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}ql.exports=Kf});var jl=Ii((ln,is)=>{ln.formatArgs=Vf;ln.save=Xf;ln.load=Qf;ln.useColors=Yf;ln.storage=Zf();ln.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();ln.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Yf(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Vf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+is.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}ln.log=console.debug||console.log||(()=>{});function Xf(e){try{e?ln.storage.setItem("debug",e):ln.storage.removeItem("debug")}catch{}}function Qf(){let e;try{e=ln.storage.getItem("debug")||ln.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Zf(){try{return localStorage}catch{}}is.exports=Fl()(ln);var{formatters:Jf}=is.exports;Jf.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ro=globalThis,Zo=ro.trustedTypes,vl=Zo?Zo.createPolicy("lit-html",{createHTML:e=>e}):void 0,Mi="$lit$",Pn=`lit$${Math.random().toFixed(9).slice(2)}$`,Pi="?"+Pn,jf=`<${Pi}>`,pr=document,oo=()=>pr.createComment(""),so=e=>e===null||typeof e!="object"&&typeof e!="function",Ni=Array.isArray,Sl=e=>Ni(e)||typeof e?.[Symbol.iterator]=="function",Di=`[ 	
\f\r]`,no=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wl=/-->/g,kl=/>/g,ur=RegExp(`>|${Di}(?:([^\\s"'>=/]+)(${Di}*=${Di}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$l=/'/g,xl=/"/g,El=/^(?:script|style|textarea|title)$/i,qi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),u=qi(1),ao=qi(2),Cv=qi(3),mn=Symbol.for("lit-noChange"),Rt=Symbol.for("lit-nothing"),Al=new WeakMap,dr=pr.createTreeWalker(pr,129);function Tl(e,t){if(!Ni(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return vl!==void 0?vl.createHTML(t):t}var Cl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=no;for(let l=0;l<n;l++){let a=e[l],c,d,f=-1,h=0;for(;h<a.length&&(i.lastIndex=h,d=i.exec(a),d!==null);)h=i.lastIndex,i===no?d[1]==="!--"?i=wl:d[1]!==void 0?i=kl:d[2]!==void 0?(El.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=ur):d[3]!==void 0&&(i=ur):i===ur?d[0]===">"?(i=o??no,f=-1):d[1]===void 0?f=-2:(f=i.lastIndex-d[2].length,c=d[1],i=d[3]===void 0?ur:d[3]==='"'?xl:$l):i===xl||i===$l?i=ur:i===wl||i===kl?i=no:(i=ur,o=void 0);let m=i===ur&&e[l+1].startsWith("/>")?" ":"";s+=i===no?a+jf:f>=0?(r.push(c),a.slice(0,f)+Mi+a.slice(f)+Pn+m):a+Pn+(f===-2?l:m)}return[Tl(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},io=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[c,d]=Cl(t,n);if(this.el=e.createElement(c,r),dr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=dr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Mi)){let h=d[i++],m=o.getAttribute(f).split(Pn),k=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:k[2],strings:m,ctor:k[1]==="."?es:k[1]==="?"?ts:k[1]==="@"?ns:_r}),o.removeAttribute(f)}else f.startsWith(Pn)&&(a.push({type:6,index:s}),o.removeAttribute(f));if(El.test(o.tagName)){let f=o.textContent.split(Pn),h=f.length-1;if(h>0){o.textContent=Zo?Zo.emptyScript:"";for(let m=0;m<h;m++)o.append(f[m],oo()),dr.nextNode(),a.push({type:2,index:++s});o.append(f[h],oo())}}}else if(o.nodeType===8)if(o.data===Pi)a.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(Pn,f+1))!==-1;)a.push({type:7,index:s}),f+=Pn.length-1}s++}}static createElement(t,n){let r=pr.createElement("template");return r.innerHTML=t,r}};function fr(e,t,n=e,r){if(t===mn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=so(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=fr(e,o._$AS(e,t.values),o,r)),t}var Jo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??pr).importNode(n,!0);dr.currentNode=o;let s=dr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Er(s,s.nextSibling,this,t):a.type===1?c=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(c=new rs(s,this,t)),this._$AV.push(c),a=r[++l]}i!==a?.index&&(s=dr.nextNode(),i++)}return dr.currentNode=pr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Er=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Rt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=fr(this,t,n),so(t)?t===Rt||t==null||t===""?(this._$AH!==Rt&&this._$AR(),this._$AH=Rt):t!==this._$AH&&t!==mn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Sl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Rt&&so(this._$AH)?this._$AA.nextSibling.data=t:this.T(pr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=io.createElement(Tl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new Jo(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=Al.get(t.strings);return n===void 0&&Al.set(t.strings,n=new io(t)),n}k(t){Ni(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(oo()),this.O(oo()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},_r=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Rt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Rt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=fr(this,t,n,0),i=!so(t)||t!==this._$AH&&t!==mn,i&&(this._$AH=t);else{let l=t,a,c;for(t=s[0],a=0;a<s.length-1;a++)c=fr(this,l[r+a],n,a),c===mn&&(c=this._$AH[a]),i||(i=!so(c)||c!==this._$AH[a]),c===Rt?t=Rt:t!==Rt&&(t+=(c??"")+s[a+1]),this._$AH[a]=c}i&&!o&&this.j(t)}j(t){t===Rt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},es=class extends _r{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Rt?void 0:t}},ts=class extends _r{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Rt)}},ns=class extends _r{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=fr(this,t,n,0)??Rt)===mn)return;let r=this._$AH,o=t===Rt&&r!==Rt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Rt&&(r===Rt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){fr(this,t)}},Rl={M:Mi,P:Pn,A:Pi,C:1,L:Cl,R:Jo,D:Sl,V:fr,I:Er,H:_r,N:ts,U:ns,B:es,F:rs},Bf=ro.litHtmlPolyfillSupport;Bf?.(io,Er),(ro.litHtmlVersions??(ro.litHtmlVersions=[])).push("3.3.1");var ot=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Er(t.insertBefore(oo(),s),s,void 0,n??{})}return o._$AI(e),o};var os="today",Ol=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Tr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function En(e){return e==="today"?"today":"7d"}function Fi(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function mr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Ll(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Il(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Dl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ml(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Bl=Ff(jl(),1);function Et(e){return(0,Bl.default)(`beads-ui:${e}`)}function e_(e){let n=Ul((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ul(e){return typeof e=="string"?e.trim():""}function t_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var n_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Lr(e){let t=e_(e),n=Ul(t_(e).spec_review),r=n_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function bn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function lo(e,t){let n=bn(e.created_at),r=bn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Yl(e,t){let n=bn(e.created_at),r=bn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Vl(e,t){let n=bn(e.updated_at),r=bn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Xl(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=bn(e.created_at),s=bn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Ql(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var as=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function r_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(as,e)}function Bi(e){if(!e||typeof e!="object")return!1;let t=e;return r_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Wl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function zl(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Lr(e).evidence==="published"?1:0;case"created":return Wl(e.created_at);case"updated":return Wl(e.updated_at);default:return null}}function Hl(e,t,n){let r=zl(e,n.key),o=zl(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Zl(e){let t=Array.isArray(e)?e.filter(Bi):[];return(n,r)=>{for(let l of t){let a=Hl(n,r,l);if(a!==0)return a}let o=Hl(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var o_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Gl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Kl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=o_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Jl(e,t){let n=Gl(e),r=Gl(t);if(n!==r)return n<r?-1:1;let o=Kl(e),s=Kl(t);if(o!==s)return o<s?-1:1;let i=bn(e&&e.created_at),l=bn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,c=t&&t.id;return a===c?0:String(a)<String(c)?-1:1}var ji=2**20;function Ir(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-bn(e&&e.created_at)}function ec(e){return(t,n)=>{let r=Ir(t,e),o=Ir(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function Ui(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ir(l,n)-ji};if(!l)return{rank:Ir(i,n)+ji};let a=Ir(i,n),c=Ir(l,n),d=(a+c)/2;return a<d&&d<c?{rank:d}:{renormalize:r.map((f,h)=>({bead_id:f.id,rank:h*ji}))}}function Wi(e,t={}){let n=Et(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||lo;function c(){for(let h of Array.from(i))try{h()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(h){if(l||!h||h.id!==e)return;let m=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,m),!(m<=s&&h.type!=="snapshot")){if(h.type==="snapshot"){if(m<=s)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let O of k)O&&typeof O.id=="string"&&O.id.length>0&&r.set(O.id,O);d(),s=m,c();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let O=r.get(k.id);if(!O)r.set(k.id,k);else{let j=Number.isFinite(O.updated_at)?O.updated_at:0,H=Number.isFinite(k.updated_at)?k.updated_at:0;if(j<=H){for(let ae of Object.keys(O))ae in k||delete O[ae];for(let[ae,V]of Object.entries(k))O[ae]=V}}d()}s=m,c()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),s=m,c()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(h){return r.get(h)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function ls(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function tc(e){let t=Et("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=r.get(l);if(!c||c.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(c)){let k=n.get(m);if(!k)continue;let O=k.itemsById;for(let j of d)typeof j=="string"&&j.length>0&&O.set(j,!0);for(let j of f)typeof j=="string"&&j.length>0&&O.set(j,!0);for(let j of h)typeof j=="string"&&j.length>0&&O.delete(j)}}async function s(l,a){let c=ls(a);if(t("subscribe %s key=%s",l,c),!n.has(l))n.set(l,{key:c,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==c){let h=r.get(f.key);h&&(h.delete(l),h.size===0&&r.delete(f.key)),n.set(l,{key:c,itemsById:new Map})}}r.has(c)||r.set(c,new Set);let d=r.get(c);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let h=n.get(l)||null;if(h){let m=r.get(h.key);m&&(m.delete(l),m.size===0&&r.delete(h.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,c);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let h=r.get(f.key);h&&(h.delete(l),h.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:ls,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=n.get(l);return c?c.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),c={};if(!a)return c;for(let d of a.itemsById.keys())c[d]=!0;return c}}}}function nc(){let e=Et("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,c,d){let f=c?ls(c):"",h=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,h),m&&h&&f&&h!==f){let k=t.get(a);if(k)try{k.dispose()}catch{}let O=o.get(a);if(O){try{O()}catch{}o.delete(a)}let j=Wi(a,d);t.set(a,j);let H=j.subscribe(()=>s());o.set(a,H)}else if(!m){let k=Wi(a,d);t.set(a,k);let O=k.subscribe(()=>s());o.set(a,O)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let c=t.get(a);c&&(c.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let c=t.get(a);return c?c.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function rc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function zi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function s_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function i_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function sc(e){let t=Et("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):s_(r),i=i_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=zi(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?zi(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var a_=Object.freeze({workspace_config:{default_workspace:null}});function ic(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:a_.workspace_config.default_workspace}}}function ac(e={}){let t=Et("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ic(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?ic(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((c,d)=>c!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,d)=>c===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function lc(e){let t=Et("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let c=n>0;e.toggleAttribute("hidden",!c),e.setAttribute("aria-busy",c?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let c=n;n=Math.max(0,n-1),c<=0?t("done called but count was already %d",c):t("done count=%d\u2192%d",c,n),s()}function a(c){return async(f,h)=>{let m=o++,k=Date.now();r.set(m,{type:f,start_ts:k}),t("request start id=%d type=%s count=%d",m,f,n+1),i();let O=!1,j=()=>{O||(O=!0,r.delete(m),l())},H=setTimeout(()=>{O||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,f,Date.now()-k),j())},3e4);try{let ae=await c(f,h),V=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",m,f,V),ae}catch(ae){let V=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,f,V,ae),ae}finally{clearTimeout(H),j()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let c=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:c-f.start_ts}))}}}function ve(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Dr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(Ql),a;switch(l){case"created_desc":return a.sort(lo),a;case"created_asc":return a.sort(Yl),a;case"updated_desc":return a.sort(Vl),a;case"priority":return a.sort(Xl),a;case"manual":default:{let c=n();return c?a.sort(ec(c)):a.sort(lo),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function Qn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Wt(e){let t=Qn(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function Jt(e,t){let n=Qn(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function cc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=Qn(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function cs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function us(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=cs(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function ds(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=cc(n);return{total:n.length,count:r,current:o,children:n}}function uc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let c=n.get()||{revision:0,order:{}},d=r(Ui(l,a,c.order),i);o(c,d);let f=await t("ui-order-set",{expected_revision:c.revision,entries:d});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(h);let m=r(Ui(l,a,h.order),i);o(h,m);let k=await t("ui-order-set",{expected_revision:h.revision,entries:m});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:s}}function dc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Nn(e,t){let n=dc(e),r=dc(t);return n.length===0||r.length===0?!1:n!==r}function ps(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Hi(e,t){return!t||typeof e!="string"||e.length===0||ps(t.visible_labels).includes(e)?!0:ps(t.hidden_labels).includes(e)?!1:!ps(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function pc(e,t){return ps(e).filter(n=>Hi(n,t))}function Zn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function l_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function c_(e,t,n,r,o){return u`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function u_(e,t,n,r){return u`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${l_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function fs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Jl):i;return u`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?c_(t.parent_id,e.count,n,r,t.onToggle):u`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?u`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?u`<div class="board-card__roll-list">
            ${l.map((a,c)=>u_(a,c+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var d_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},_c={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},fc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},p_={review:"\u2713",skip:"\u2298"},Jn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function f_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function mc(e){let t=e&&e.fill||"none";return t==="none"?Jn.none:e&&e.stale===!0?Jn.stale:t==="dim"?Jn.dim:e&&e.glyph==="review"?Jn.review:e&&e.glyph==="skip"?Jn.skip:Jn.done}function __(e){if(!e||e.fill==="none"||!e.approval_state)return mc(e);let t=[];return e.glyph==="review"?t.push(Jn.review):e.glyph==="skip"&&t.push(Jn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function m_(e,t,n,r){let o=d_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=p_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let c=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=_c[e]||e,h=r?gc(t):null;if(!h)return u`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${c}>${f}</div>
      </div>
    `;let m=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return u`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,h,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${c}>${f}</div>
    </button>
  `}function gc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function _s(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=fc[e.route]||fc.spec_backed,s=e.stages,i=f_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(c=>`${_c[c]||c} ${c==="plan"?__(s[c]||{}):mc(s[c]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(c=>gc(s[c]||{})!==null);return u`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(c=>m_(c,s[c]||{},c===i,r))}
    </div>
  `}function g_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var hc=2;function bc(e){let t=e.slice(0,hc).join(", "),n=e.length-hc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function h_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Nn(e,i)?s:o).push(i);return o.length>0&&n.push(u`<span class="ctl-chip ctl-chip--blocked-dep"
        >${bc(o)}</span
      >`),s.length>0&&n.push(u`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${bc(s)}</span
      >`),n}function b_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:u`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Gi(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ms(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function qn(e){return`${e.kind}:${ms(e)}@${e.sha}`}function gs(e,t){if(!e)return null;let n=Gi(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=Gi(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,c=t?` \xB7 exec_receipt ${qn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${c}`}}function yc(e,t){let n=gs(e,t);return n?u`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function y_(e){if(!e)return null;let t=Gi(e.kind);return t?u`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${qn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function v_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&Zn(n,"route")){let l=r.route_source==="derived";o.push(u`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&Zn(n,"fast_track")&&o.push(u`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Zn(n,"pr")){let l=r.pr.number;o.push(u`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=yc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(u`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${qn(l)}`}
        >${`exec ${l.kind==="delegated"?ms(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(u`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of pc(e.labels,n))o.push(u`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&Zn(n,"from")&&o.push(u`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Zn(n,"blocked")){let l=b_(e.metadata);l&&o.push(l),o.push(...h_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Zn(n,"blocked")&&o.push(u`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":u`<div class="board-card__chips">${o}</div>`}function w_(e){let t=Jt(e.created_at),n=Jt(e.updated_at);return!t&&!n?"":u`<span class="board-card__times">
    ${t?u`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?u`<span class="board-card__time-sep">·</span>`:""}
    ${n?u`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function k_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return fs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:w_(e),empty_label:"children \uC5C6\uC74C",childChips:Ki,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Ki(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return gs(t,n)?u`<span class="board-card__roll-child-chips">
    ${yc(t,n)}
    ${y_(n)}
  </span>`:null}function hs(e,t){let n=g_(e.priority);return u`
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
        ${n?u`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${v_(e,t)}
      ${e.workflow&&Zn(t.policy||null,"stepper")?_s(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${k_(e,t)}
    </article>
  `}function Mr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return u`
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
        ${r?u`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Ol.map(s=>u`<option
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
  `}function vc(e,t,n){return u`
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
          ${e.items.length===0?u`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>hs(r,t))}
        </div>
      </div>
    </dialog>
  `}var $_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],x_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],A_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function S_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return u`
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
      ${n.label_menu_open?u`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?u`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(s=>u`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(s)}
                        @change=${()=>t.onLabelToggle(s)}
                      />
                      <span>${s}</span>
                    </label>`)}
            ${r>0?u`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function wc(e,t,n){return u`
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
        ${$_.map(r=>u`<option
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
        ${x_.map(r=>u`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${S_(e,t,n)}
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
        ${A_.map(r=>u`<option
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
  `}var E_=200,T_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},C_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),kc="beads-ui.board.sort",$c=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function R_(){try{let e=window.localStorage.getItem(kc);if(e&&$c.has(e))return e}catch{}return"created_desc"}function xc(e,t){let n=Et("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,c=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,h=t.closedRange||os,m=o?Dr(o,i):null,k=uc({transport:s,uiOrderStore:i}),O=[],j=[],H=[],ae=[],V=[],q=[],I=!1,P=0,U=R_(),X=new Map,oe=new Map,N=new Map,G=new Set,W={search:"",priority:"",type:"",labels:[]},Q=!1,Ee=null;function ke(R){return String(R.status||"open")==="open"}function ue(R){return String(R.status||"open")==="open"}function F(R){let K=W.search.trim().toLowerCase(),Ie=W.priority,We=W.type,Me=W.labels;return R.filter(Je=>{if(K){let Le=String(Je.id||"").toLowerCase(),ze=String(Je.title||"").toLowerCase();if(!Le.includes(K)&&!ze.includes(K))return!1}if(Ie!==""&&String(Je.priority)!==Ie||We!==""&&String(Je.issue_type||"")!==We)return!1;if(Me.length>0){let Le=Array.isArray(Je.labels)?Je.labels:[];if(!Me.some(ze=>Le.includes(ze)))return!1}return!0})}function $e(){let R=new Set;for(let K of[O,j,H,ae,V,q])for(let Ie of K){let We=Array.isArray(Ie.labels)?Ie.labels:[];for(let Me of We)typeof Me=="string"&&Me.length>0&&R.add(Me)}return Array.from(R).sort()}function Se(){return W.search.trim()!==""||W.priority!==""||W.type!==""||W.labels.length>0}function E(){try{if(m){let R=m.selectBoardColumn("tab:board:in-progress","in_progress",U),K=m.selectBoardColumn("tab:board:blocked","blocked",U).filter(ue),Ie=new Set(R.map(He=>He.id)),We=m.selectBoardColumn("tab:board:ready","ready",U).filter(He=>ke(He)&&!Ie.has(He.id)),Me=m.selectBoardColumn("tab:board:resolved","resolved",U),Je=m.selectBoardColumn("tab:board:deferred","deferred",U),Le=m.selectBoardColumn("tab:board:closed","closed").slice(0,E_),ze=[...K,...We,...R,...Me,...Le];ne(ze);let Ze=new Set;for(let He of ze)He&&He.id&&!cs(He)&&Ze.add(He.id);let ft=!Se();O=ft?co(K,Ze):K,j=ft?co(We,Ze):We,H=ft?co(R,Ze):R,ae=ft?co(Me,Ze):Me,V=Je,P=Je.length,q=ft?co(Le,Ze):Le,X=new Map;for(let He of O)X.set(He.id,"open");for(let He of j)X.set(He.id,"open");for(let He of H)X.set(He.id,"in_progress");for(let He of ae)X.set(He.id,"resolved");for(let He of V)X.set(He.id,"deferred");for(let He of q)X.set(He.id,"closed");oe=new Map;for(let He of O)oe.set(He.id,"blocked-col");for(let He of j)oe.set(He.id,"ready-col");for(let He of H)oe.set(He.id,"in-progress-col");for(let He of ae)oe.set(He.id,"resolved-col");for(let He of q)oe.set(He.id,"closed-col")}Fe()}catch{O=[],j=[],H=[],ae=[],V=[],q=[],N=new Map,Fe()}}function ne(R){N=us(R)}function he(R){return ds(N,R)}function fe(R){return!G.has(R)}function Oe(R,K){R.preventDefault(),R.stopPropagation(),G.has(K)?G.delete(K):G.add(K),Fe()}function de(R,K){R.preventDefault(),R.stopPropagation(),r(K)}function De(R,K){R.preventDefault(),R.stopPropagation(),r(K)}function tt(R,K){Ee||r(K)}function st(R,K){R.preventDefault(),R.stopPropagation(),O_(K).then(Ie=>{Ie&&ve("\uBCF5\uC0AC\uB428","success",1200)})}function M(R,K){Ee=K,R.dataTransfer&&(R.dataTransfer.setData("text/plain",K),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function le(R){R.target.classList.remove("board-card--dragging"),St(),setTimeout(()=>{Ee=null},0)}function se(R){let K=String(R.target.value||"");!K||K===h||(h=K,c&&c(K),Fe())}function pe(){return l?l.get():null}function xe(R){let K=a?a.get():null,Ie=K?K.cleanup_failed:null;if(!Ie||typeof Ie!="object"||Array.isArray(Ie))return null;let We=Ie[R];return!We||typeof We!="object"||Array.isArray(We)?null:We}let ie={onCardClick:tt,onCopyId:st,onDragStart:M,onDragEnd:le,onClosedRangeChange:se,rollupFor:he,isExpanded:fe,onRollupToggle:Oe,onChildClick:de,onFromChipClick:De,onOpenDoc:f?(R,K)=>f(K):void 0,cleanupFailureFor:xe,get policy(){return pe()}};function qe(R,K){Ee||(y(),r(K))}function Ge(R,K){R.preventDefault(),R.stopPropagation(),y(),r(K)}let Xe={...ie,onCardClick:qe,onChildClick:Ge,onFromChipClick:Ge,onOpenDoc:f?(R,K)=>{y(),f(K)}:void 0,get policy(){return pe()}};function Pe(R){let K=R.target,Ie=e.querySelector(".board-filter__labels");K&&Ie&&Ie.contains(K)||Ne()}function Y(R){R.key==="Escape"&&Ne()}function B(){Q||(Q=!0,document.addEventListener("mousedown",Pe),document.addEventListener("keydown",Y),Fe())}function Ne(){Q&&(Q=!1,document.removeEventListener("mousedown",Pe),document.removeEventListener("keydown",Y),Fe())}function at(R){R.key==="Escape"&&y()}function Qe(){I||(I=!0,document.addEventListener("keydown",at),Fe())}function y(){I&&(I=!1,document.removeEventListener("keydown",at),Fe())}let z={onClose:y,onOverlayClick(R){R.target===R.currentTarget&&y()}},Te={onSearchInput(R){W.search=String(R.target.value||""),E()},onPriorityChange(R){W.priority=String(R.target.value||""),E()},onTypeChange(R){W.type=String(R.target.value||""),E()},onSortChange(R){let K=String(R.target.value||"");if(!(!$c.has(K)||K===U)){U=K;try{window.localStorage.setItem(kc,K)}catch{}E()}},onDeferredToggle(){I?y():Qe()},onLabelMenuToggle(){Q?Ne():B()},onLabelToggle(R){let K=W.labels.indexOf(R);K===-1?W.labels.push(R):W.labels.splice(K,1),E()},onLabelClear(){W.labels.length!==0&&(W.labels=[],E())},onNewIssue(){d&&d()}};function Re(){return u`
      <div class="board-view">
        ${wc(W,Te,{sort_mode:U,deferred_popup_open:I,deferred_count:P,label_options:$e(),label_menu_open:Q})}
        <div class="board-root">
          ${Mr({title:"Blocked",id:"blocked-col",items:F(O)},ie)}
          ${Mr({title:"Ready",id:"ready-col",items:F(j)},ie)}
          ${Mr({title:"In progress",id:"in-progress-col",items:F(H)},ie)}
          ${Mr({title:"Resolved",id:"resolved-col",items:F(ae)},ie)}
          ${Mr({title:"Closed",id:"closed-col",items:F(q),is_closed:!0,closed_range:h},ie)}
        </div>
        ${I?vc({items:F(V),count:P},Xe,z):""}
      </div>
    `}function Fe(){ot(Re(),e),Ye()}function Ye(){try{let R=e.querySelector("#deferred-popup");R&&!R.open&&(typeof R.showModal=="function"?R.showModal():R.setAttribute("open",""));let K=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ie of K)Array.from(Ie.querySelectorAll(".board-card")).forEach((Me,Je)=>{Me.tabIndex=Je===0?0:-1})}catch{}}async function dt(R,K){if(!s){ve("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:R,status:K}),ve("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ie){n("update-status failed: %o",Ie),ve("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function vt(R){switch(R){case"blocked-col":return O;case"ready-col":return j;case"in-progress-col":return H;case"resolved-col":return ae;default:return[]}}function Lt(R,K,Ie){if(!s||!i)return;let We=vt(R),Me=We.find(ft=>ft.id===K);if(!Me)return;let Je=We.filter(ft=>ft.id!==K),Le=Ie.closest?Ie.closest(".board-card"):null,ze=Je.length;if(Le){let ft=Le.getAttribute("data-issue-id");if(ft===K)return;let He=Je.findIndex(kt=>kt.id===ft);He>=0&&(ze=He)}let Ze=Je.slice();Ze.splice(ze,0,Me),k.applyReorder(K,Ze,ze)}function St(){for(let R of Array.from(e.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let ht=null;e.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let Ie=R.target.closest(".board-column");Ie&&Ie!==ht&&(ht&&ht.classList.remove("board-column--drag-over"),Ie.classList.add("board-column--drag-over"),ht=Ie)}),e.addEventListener("dragleave",R=>{let K=R.relatedTarget;(!K||!e.contains(K))&&ht&&(ht.classList.remove("board-column--drag-over"),ht=null)}),e.addEventListener("drop",R=>{R.preventDefault(),ht&&(ht.classList.remove("board-column--drag-over"),ht=null);let K=R.target,Ie=K.closest(".board-column");if(!Ie)return;let We=R.dataTransfer?.getData("text/plain")||"";if(!We)return;let Me=Ie.id,Je=oe.get(We);if(Je&&Je===Me){if(C_.has(Me)){if(U!=="manual"){ve("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Lt(Me,We,K)}return}let Le=T_[Me];if(!Le){ve("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}X.get(We)!==Le&&dt(We,Le)}),e.addEventListener("keydown",R=>{let K=R.target;if(!(K instanceof HTMLElement))return;let Ie=String(K.tagName||"").toLowerCase();if(Ie==="input"||Ie==="textarea"||Ie==="select"||Ie==="button"||Ie==="a"||K.isContentEditable===!0)return;let We=K.closest(".board-card");if(!We)return;let Me=String(R.key||"");if(Me==="Enter"||Me===" "){R.preventDefault();let Ze=We.getAttribute("data-issue-id");Ze&&r(Ze);return}if(Me!=="ArrowUp"&&Me!=="ArrowDown"&&Me!=="ArrowLeft"&&Me!=="ArrowRight")return;R.preventDefault();let Je=We.closest(".board-column");if(!Je)return;let Le=Array.from(Je.querySelectorAll(".board-card")),ze=Le.indexOf(We);if(Me==="ArrowDown"&&ze<Le.length-1){Be(We,Le[ze+1]);return}if(Me==="ArrowUp"&&ze>0){Be(We,Le[ze-1]);return}if(Me==="ArrowLeft"||Me==="ArrowRight"){let Ze=Array.from(e.querySelectorAll(".board-column")),ft=Ze.indexOf(Je),He=Me==="ArrowRight"?1:-1,kt=ft+He;for(;kt>=0&&kt<Ze.length;){let Nt=Ze[kt].querySelector(".board-card");if(Nt){Be(We,Nt);return}kt+=He}}});function Be(R,K){try{R.tabIndex=-1,K.tabIndex=0,K.focus()}catch{}}let D=null;m&&m.subscribe&&(D=m.subscribe(()=>{try{E()}catch{}}));let te=null;l&&l.subscribe&&(te=l.subscribe(()=>{try{E()}catch{}}));let be=null;return a&&a.subscribe&&(be=a.subscribe(()=>{Fe()})),{async load(){n("load"),E()},clear(){Ne(),y(),D&&(D(),D=null),te&&(te(),te=null),be&&(be(),be=null),e.replaceChildren(),O=[],j=[],H=[],ae=[],V=[],q=[],X=new Map,oe=new Map}}}function co(e,t){return e.filter(n=>{let r=cs(n);return!(r&&t.has(r))})}async function O_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var Qt=e=>e??Rt;async function en(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function hr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function uo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function L_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${hr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${hr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let c=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>c("prior_session")),o.addEventListener("click",()=>c("fresh_current")),s.addEventListener("click",()=>c(null)),n.addEventListener("cancel",d=>{d.preventDefault(),c(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Fn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await L_(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var I_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Ac={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},D_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function jt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ot(e){return typeof e=="string"&&e.length>0?e:null}function Pr(e){return e.startsWith("gpt-")?e.slice(4):e}function At(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Ec(e,t,n){let r=Ot(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ot(n[e]);return o===null?null:{value:o,source:"global"}}function po(e,t,n,r){return Ec(e,t,n)||{value:r,source:"base"}}function Yi(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&jt(o?.[t])){let i=Ot(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&jt(o)){for(let i of Object.values(o))if(jt(i)){let l=Ot(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Ot(r?.runners?.[s]?.models?.[e]?.id)||e}function M_(e,t){return Ot(t?.review?.reviewers?.[e]?.model)||e}function Nr(e,t,n=!1){if(e==="default")return At(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Pr(e):e;return At(e,t,r,e,"explicit")}function Tc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];jt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(jt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function P_(e,t){let n=[],r=e?.implementation?.model_catalog;jt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(jt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function N_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of P_(t,n)){let s=Tc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Vi(e){return At(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Sc(e,t,n){let r=Ec(e,t,n);return r?Nr(r.value,r.source):At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function un(e){let t=jt(e.pin)?e.pin:{},n=jt(e.global)?e.global:{},r=jt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&jt(r.session)?r.session:null,s=r?.supported===!0&&jt(r.orchestration)?r.orchestration:null,i=jt(e.runner_catalog)?e.runner_catalog:null,l=Ot(n.quick_fix_impl_model),a=N_(l,o,i),c={};if(o){let d=po("workflow_mode",t,n,Ot(o.workflow_mode_default));c.workflow_mode=d.source==="base"?At(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Nr(d.value,d.source);for(let V of["spec_review","plan_review","impl_review"]){let q=`${V}_model`,I=Ot(V==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),P=po(q,t,n,I);if(P.value===null)c[q]=At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(P.value!=="self"&&P.value!=="skip"&&!jt(o.review?.reviewers?.[P.value]))c[q]=Vi(At(P.value,P.source,"",null,"explicit"));else{let U=M_(P.value,o);c[q]=At(P.value,P.source,Pr(U),U,P.source==="base"?"default":"explicit")}}for(let[V,q]of Object.entries(Ac)){let I=c[q].value;if(I==="self"||I==="skip"){c[V]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let P=Ot(o.review?.reviewers?.[I||""]?.effort),U=po(V,t,n,P);c[V]=U.value===null?At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):At(U.value,U.source,U.value,U.value,U.source==="base"?"default":"explicit")}let f=jt(o.implementation?.default)?o.implementation.default:{},h=Ot(e.route),m=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=jt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},O=m&&jt(k[h])?k[h]:{};for(let V of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=po(V,t,n,V==="impl_dispatch"?Ot(O.dispatch)||Ot(f.dispatch):Ot(f[V.replace("impl_","")]));c[V]=q.value===null?At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):At(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let j=Ot(t.impl_runtime),H=j==="inherit"?Ot(e.controller_runtime):j,ae=h==="quick_fix"&&Ot(t.impl_dispatch)===null&&a.runtime!==null&&(j===null||H===a.runtime);if(ae){let V=a.runtime,q=l;c.impl_dispatch=At("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(c.impl_runtime=At(V,"global",`${V} (\uC720\uB3C4)`,V,"explicit")),Ot(t.impl_model)===null&&(c.impl_model=At(q,"global",q,q,"explicit"))}if(c.impl_dispatch.value==="main"){c.impl_dispatch.display="\uBA54\uC778";for(let V of["impl_runtime","impl_model","impl_effort","impl_speed"])c[V]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(c.impl_dispatch.value==="delegated"&&!ae&&(c.impl_dispatch.display="\uC704\uC784"),c.impl_runtime.value==="inherit"&&(c.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_runtime.resolution="dynamic"),c.impl_model.value!==null){let V=c.impl_runtime.value==="inherit"?Ot(e.controller_runtime):c.impl_runtime.value,q=V?Tc(V,o,i):[];if(c.impl_model.value!=="auto"&&q.length>0&&!q.includes(c.impl_model.value))c.impl_model=Vi(c.impl_model);else{let I=Yi(c.impl_model.value,V,o,i);c.impl_model.display=Pr(I),c.impl_model.full_value=I}}if(c.impl_effort.value==="auto"){let V=Ot(e.transport)||(c.impl_runtime.value==="codex"?"codex-native-spawn":c.impl_runtime.value==="claude"?"implement-claude":null),q=V?Ot(o.implementation?.effort_by_transport?.[V]?.auto):null;q&&!D_.has(q)?(c.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,c.impl_effort.full_value=q,c.impl_effort.resolution="incompatible"):(c.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_effort.resolution="dynamic")}c.impl_speed.value==="default"&&(c.impl_speed=c.impl_speed.source==="base"?At("default","base","default (\uC77C\uBC18)","default","default"):Nr("default",c.impl_speed.source))}}else for(let d of I_.filter(f=>!f.startsWith("orchestration_")))c[d]=Sc(d,t,n);if(!o){for(let[d,f]of Object.entries(Ac))(c[f].value==="self"||c[f].value==="skip")&&(c[d]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(c.impl_dispatch.value==="main"){c.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])c[d]=At(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else c.impl_dispatch.value==="delegated"&&(c.impl_dispatch.display="\uC704\uC784"),c.impl_runtime.value==="inherit"&&(c.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_runtime.resolution="dynamic"),c.impl_effort.value==="auto"&&(c.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",c.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){c[d]=Sc(d,t,n);continue}let f=d.replace("orchestration_",""),h=Ot(s[f]),m=po(d,t,n,h);if(d==="orchestration_effort"&&m.source==="base"){c[d]=At(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){c[d]=At(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=m.source==="base"?Ot(s.model_id)||m.value:Yi(m.value,null,o,i);c[d]=At(m.value,m.source,Pr(k),k,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){c[d]=m.source==="base"?At("default","base","default (\uC77C\uBC18)","default","default"):Nr("default",m.source);continue}c[d]=Nr(m.value,m.source)}if(o)if(l===null){let d=c.orchestration_model.full_value;c.quick_fix_impl_model=At(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Pr(d)})`,null,"default")}else if(a.runtime!==null){let d=Yi(l,a.runtime,o,i);c.quick_fix_impl_model=At(l,"global",Pr(d),d,"explicit")}else a.offered?c.quick_fix_impl_model=Vi(At(l,"global","",null,"explicit")):c.quick_fix_impl_model=Nr(l,"global");return c}function q_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function bs(e){let t=jt(e.pin)?e.pin:{},n=jt(e.global)?e.global:{},r=jt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let h={...r,...f};return un({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],c=Ot(s[e.key]),d=[...e.choices];return c!==null&&!d.includes(c)&&d.unshift(c),{unset_label:q_(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let h=o({...s,[e.key]:f})[e.key];return{value:f,label:h.display,full_value:h.full_value}})}}function qr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,c=f=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(f))},d=()=>c(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>c(null)),r.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),d())}),t.addEventListener("cancel",f=>{f.preventDefault(),c(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function Xi(e){return`session:${e.provider}:${e.session_id}`}function fo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function F_(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Fr(e,t,n,r){return{attempt_id:Xi(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:fo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:F_(e,n)}}}var Qi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",j_="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Cc="\uBD84\uD574 \uC5C6\uB294 leg";function Mt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Cn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],jr=[...Cn,"reasoning_output_tokens"],B_={codex:["implementation","review-consult"],claude:["subagent"]};function Zi(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Cn.some(t=>Number.isFinite(e[t]))}function U_(e){return!e||typeof e!="object"?!1:jr.some(t=>Number.isFinite(e[t]))}function Ji(e){let t=0;for(let n of Cn)t+=Mt(e?.[n]);return t}function W_(e){return!e||typeof e!="object"?!1:Cn.some(t=>Number.isFinite(e[t]))}function Rc(e){return!e||typeof e!="object"?!1:jr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function z_(e){let t={};for(let n of jr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Oc(e){let t={};for(let n of jr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Lc(e,t){return Zi(t)?Mt(t.total_tokens):e==="codex"?Mt(t.input_tokens)+Mt(t.output_tokens):Ji(t)}function H_(e){return e==="claude"?"Claude":"Codex"}function G_(e){return`\u03C4 ${Dc(e)}`}function K_(e,t){let n=t.breakdown||{},r=Mt(t.total_only_subtotal);if(Zi(n)||r>0&&!U_(n)){let c=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,j_];return t.replayed&&c.push(Qi),c.join(`
`)}let o=[`\uC785\uB825 ${Mt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Mt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Mt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Mt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Mt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Mt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Mt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Cc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Cc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Qi),a.join(`
`)}function Yt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${H_(n)} ${G_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:K_(n,r)})}return t}function vs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Mt(l.total_only_subtotal)+Mt(i.total_only_subtotal));for(let a of jr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Mt(l.breakdown[a])+Mt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ea(e){return!e||typeof e!="object"?null:Bn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Y_(e){return e==="codex"?"codex":"claude"}function Tn(){return{subtotal:0,breakdown:z_(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ys(e,t,n){e.subtotal+=t.subtotal,Zi(t.usage)&&(e.total_only+=t.subtotal);for(let r of jr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Mt(e.breakdown[r])+Mt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ic(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Dc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Br(e){return W_(e)?`\u03C4 ${Dc(Ji(e))}`:null}function jn(e){let t=Br(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function _o(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Mt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Mt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Mt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Mt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ji(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Qi),n.join(`
`)}function Bn(e,t){let n={claude:Tn(),codex:Tn()},r={orchestrator:{claude:Tn(),codex:Tn()},implementation:{claude:Tn(),codex:Tn()},"review-consult":{claude:Tn(),codex:Tn()},subagent:{claude:Tn(),codex:Tn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Rc(a)){let d=Y_(l.runner),f=Oc(a),h={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:Lc(d,f)};f.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),ys(n[d],h,!0),ys(r.orchestrator[d],h,!0)}let c=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of c){let f=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!B_[f].includes(d.role)||!Rc(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||o.has(h))continue;o.add(h);let m=Oc(d.usage),k={provider:f,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Lc(f,m)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),m.replayed===!0&&(k.replayed=!0),ys(n[f],k,!1),ys(r[k.role][f],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let c=Ic(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(c.total_cost_usd=a.outer_cost),s[l]=c}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let c of["claude","codex"]){let d=r[l][c];d.legs.length>0&&(a[c]={...Ic(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var V_=".chip-popover, .judgement-chip";function Ur(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(V_)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function c(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:c}}function Wr(e){return u`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>u`<li>${t}</li>`)}
    </ul>
  </div>`}var Mc={running:3,paused:2,failed:1};function Un(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Pc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Nc(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Un(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Un(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),f=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!f&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,c=s.get(i.bead_id);if(c){let d=Mc[c.run_state],f=Mc[l];if(d>f||d===f&&(c.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var ws=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],na=[...ws.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Wn=["orchestration_model","orchestration_effort","orchestration_speed"],zr=[...ws,...Wn],X_=na.filter(e=>zr.includes(e)),qc=["delegated","main"],ks=["inherit","claude","codex"],mo=["default","fast"],go=["standard","fast_track"],ho=["codex","opus","fable","self","skip"],$s=["codex","fable","skip"],xs=["low","medium","high","xhigh"],pn="auto";function dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Fc(e){if(!dn(e)||!dn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))dn(r)&&dn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Hr(e,t){let n=Fc(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[pn,...r.flatMap(([,o])=>o)]}function jc(e,t,n,r){if(!dn(e)||!dn(e.runners))return[pn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!dn(i)||!dn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==pn&&l!==n)continue;let c=r(i,a);if(Array.isArray(c))for(let d of c)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[pn,...o]}function Gr(e,t,n){return jc(e,t,n,(r,o)=>dn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ra(e,t,n){return jc(e,t,n,(r,o)=>dn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:dn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function bo(e,t){let n=Fc(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Bc(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Hr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Gr(t,o,r.impl_model||pn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Q_={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ta=[...X_,...Wn],Z_=[...zr,...na].filter((e,t,n)=>n.indexOf(e)===t&&!ta.includes(e));function Uc(e,t){let n=dn(e)?e:{},r=dn(t)?t:{},o=[];for(let i of ta){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:Q_[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...Z_,...Object.keys(r)])!ta.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function oa(e,t,n,r,o,s){return bs({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function Wc(e,t){let n={};for(let r of na){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function zc(e,t){let n={};for(let r of Wn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var sa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Wn]}],er={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},As={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ia(e,t,n,r,o,s=null){let i=un({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function Hc(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of ia(e,t,n,r,o,s))i[l.source]+=1;return i}function Gc(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Kc(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var _k=[...ws,...Wn];var Yc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function yo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ss(e){if(!yo(e)||!yo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>yo(n)&&yo(n.models));return t.length>0?t:null}function yn(e,t){let n=Ss(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Vc(e,t){return yo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Xc(e,t){let n=Ss(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Vc(r,r.models[t]);return[]}function J_(e){let t=Ss(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of Vc(r,o))n.includes(s)||n.push(s);return n}function em(e,t){if(!t)return J_(e);let r=Ss(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of Xc(e,s))o.includes(i)||o.push(i);return o}function Qc(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=yn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Xc(t,r.impl_model):em(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var aa=new Set(["unavailable","not_applicable"]);function tr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Zc(e){return e.filter(t=>t!==null).join(" \xB7 ")}function nr(e,t){return t===null?null:`${er[e]}: ${t.display} (${As[t.source]})`}function la(e){return e.filter(t=>t!==null).join(`
`)}function ca(e){if(typeof e!="object"||e===null)return null;let t=hr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:la(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(er.orchestration_model,e.model),n(er.orchestration_effort,e.effort),n(er.orchestration_speed,e.speed)])}}function Kr(e,t){let n=tr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=tr(e,"orchestration_effort"),o=tr(e,"orchestration_speed"),s=Zc([yn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:la(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",nr("orchestration_model",n),nr("orchestration_effort",r),nr("orchestration_speed",o)])}}function tm(e,t){return e===null||e.value===null||aa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function nm(e){return e===null||aa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function rm(e){return e===null?null:e.value==="auto"?"auto":aa.has(e.resolution)?null:e.display}function br(e,t){if(typeof e!="object"||e===null)return null;let n=tr(e,"impl_dispatch"),r=tr(e,"impl_runtime"),o=tr(e,"impl_model"),s=tr(e,"impl_effort"),i=tr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Zc([tm(r,t??null),nm(o),rm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:la(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",nr("impl_dispatch",n),nr("impl_runtime",r),nr("impl_model",o),nr("impl_effort",s),nr("impl_speed",i)])}}var om=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),sm=Object.freeze(["delivery_unproven:"]);function Es(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||om.has(t))return"session";for(let n of sm)if(t.startsWith(n))return"session";return"settlement"}var im=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var am={contract_change:"\uACC4\uC57D \uBB38\uC11C\xB7checker\xB7\uC2A4\uD0AC \uC0AC\uBCF8\uC744 \uD568\uAED8 \uBC14\uAFD4\uC57C \uD55C\uB2E4",multi_repo:"\uB458 \uC774\uC0C1\uC758 \uC800\uC7A5\uC18C\uC5D0 \uC791\uC5C5 \uB2E8\uC704\uAC00 \uC0DD\uAE34\uB2E4",open_design_fork:"\uC2E4\uD589 \uC911\uC5D0\uB3C4 \uC774\uC5B4\uC9C8 \uBBF8\uD574\uACB0 \uC124\uACC4 \uBD84\uAE30\uAC00 \uC788\uB2E4",multi_phase:"\uC5EC\uB7EC Phase \uB610\uB294 \uBCD1\uB82C \uC4F0\uAE30 \uC870\uC815\uC774 \uD544\uC694\uD558\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function ua(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>am[n]||"").filter(n=>n.length>0)}var Jc={orchestration_model:["fable"],impl_runtime:["claude"]},da={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function eu(e){return typeof e=="object"&&e!==null?e:null}function tu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function lm(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>im.includes(t))}function vo(e,t=e){let n=eu(e);if(!n)return null;let r=tu(n.rec_orchestration_model,Jc.orchestration_model);if(r.length===0)return null;let o=tu(n.rec_impl_runtime,Jc.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=eu(t)||{},l=Object.keys(s),a=0,c=0;for(let f of l){let h=i[f];typeof h=="string"&&h.length>0&&(a+=1,h===s[f]&&(c+=1))}let d=a===0?"unapplied":c===l.length?"applied":"diverged";return{reasons:lm(n.rec_reason),rec:s,state:d}}function Ts(e){if(!e||typeof e!="object")return"";let t=ua(e),n=da[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Cs(e){return e.replace(/\/+$/,"")}function cm(e,t){let n=Cs(e),r=Cs(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Rs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!cm(r,o))continue;let s=Cs(r),i=Cs(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function pa(e,t){return`${e}\0${t}`}function nu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function fa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function wo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function ru(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${wo(o)})`,location_label:wo(o),scope:null,same_lane_ahead:!1};let i=fa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function ou(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let c=pa(l.root_dir,a.id);n.set(c,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(c,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,c)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let c=pa(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(c);if(m)for(let k of h){let O=r.get(k);O&&O!==c&&!m.includes(O)&&m.push(O)}}let s=(l,a)=>{let c=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||c.has(f)||(c.add(f),d.push(...o.get(f)||[]))}return!1},i=new Map;for(let[l,a]of o){let c=[];for(let d of a){let f=n.get(d);s(d,l)&&f&&c.push(f)}c.length>0&&i.set(l,c)}return i}function su(e,t){return pa(e,t)}async function um(e){let t=await en(e);ve(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Os(e){return typeof e!="string"||e.length===0?"":u`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{um(e)}}
    >
      ⧉
    </button></span
  >`}function Ds(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function lu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function yr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function cu(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function iu(e){return e==="auto"||e==="click"?e:null}function uu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let c=a;if(c.bead_id!==t||c.kind!=="review_session")continue;if(c.status==="pending"||c.status==="running"){n=!0;let f=typeof c.started_at=="number"?c.started_at:0;f>=o&&(o=f,r=iu(c.origin));continue}if(c.status!=="failed")continue;let d=typeof c.finished_at=="number"?c.finished_at:0;d>=l&&(l=d,s=typeof c.cause=="string"&&c.cause.length>0?c.cause:null,i=iu(c.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function du(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Ms(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function dm(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Ds(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function pu(e,t){let n=dm(e,t);return n?u`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?u`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?Wt(n.deploy.at):""}
            >${Ms(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${yr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Yr(e){let t=Jt(e.created_at),n=Jt(e.updated_at);return!t&&!n?"":u`<div class="worker-mini__meta">
    ${t?u`<span title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?u`<span>·</span>`:""}${n?u`<span title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function pm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function $o(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ps(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function zn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,h)=>(f.requested_at||0)-(h.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?pm(o.phase):null,c=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:c?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?c?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function fu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Is(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return u`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?u`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?u`<code>백업: ${r}</code>`:t.error?u`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${o?.url?u`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${o.number||"?"}</a
        >`:""}
    ${s?.url?u`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var fm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function _u(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(c){return Number.isInteger(i[c])?Number(i[c]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:fm[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Ns(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return u`${e.orchestration?u`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?u`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function Ls(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?u`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:u`<span class=${n} title=${e.title||""}>${e.label}</span>`}function _m(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function _a(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function qs(e){if(!e)return"";let t=_a(e.predecessors),n=Array.isArray(e.released)?e.released:[],r=_a(e.dependents),o=_a(e.overlaps),s=e.scope_missing===!0,i=e.armed_lane||null,l=!!i||t.length>0||r.length>0,a=n.length>0||o.length>0||s;return!l&&!a?"":u`${l?u`<div class="worker-deps worker-deps--primary">
        ${i?u`<span
              class=${`worker-dep worker-dep--armed${i.orphan?" worker-dep--armed-orphan":""}`}
              title=${i.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
              >${i.orphan?u`${i.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${i.lane_id}
                    >
                      해제
                    </button>`:i.label}</span
            >`:""}${t.map(c=>Ls(c,"pred"))}${r.map(c=>Ls(c,"dependents"))}
      </div>`:""}${a?u`<div class="worker-deps worker-deps--secondary">
        ${n.map(c=>Ls(c,"released"))}${o.map(c=>Ls(_m(c),"overlap"))}${s?u`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Fs(e){return e?u`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function js(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?u`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function mm(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return u`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function mu(e){return e?u`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Bs(e,t=!1){return e?u`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${Ts(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}function gu(e,t){return!e||typeof t!="number"?"":u`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Us(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return u`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function gm(e){let t=Array.isArray(e.badges)?e.badges:[],n=Yt(e.usage),r=jn(e.usage),o=Jt(e.done_at);return u`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?u`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${gu(e.pr_url,e.pr_number)}${o?u`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(s=>u`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${s}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>u`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?u`<span class="worker-usage" title=${_o(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?u`<span
            class="worker-mini__work"
            title=${lu(e.work_kind)}
            >작업 ${yr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function vn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return gm(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=Yt(e.usage),s=jn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,c=a?Jt(e.done_at):"",d=n?u`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?u`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?u`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",m=e.workspace_name?u`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=u`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,O=e.lane==="done"?"":js(e.workflow),j=e.lane==="done"?"":mu(e.from_id),H=Us(e.priority),ae=u`<span class="worker-mini__title">${e.title}</span>`,V=gu(e.pr_url,e.pr_number),q=r.map(de=>de===e.live_badge?u`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${de}</span
        >`:u`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${de===e.completion_badge&&e.completion_title||""}
          >${de}</span
        >`),I=e.reason?u`<span class="worker-mini__reason">${e.reason}</span>`:"",P=o.length>0?o.map(de=>u`<span class="worker-usage" title=${de.tooltip}
              >${de.label}</span
            >`):s?u`<span class="worker-usage" title=${_o(e.usage)}
            >${s}</span
          >`:"",U=i?u`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?u`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",X=e.merge_action?u`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",oe=e.cancel_action?u`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",N=e.discard,G=N?.action||e.discard_action?u`<button
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
        </button>`:"",W=e.stale_work||null,Q=W?u`${W.can_resume||W.can_continue?u`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            기존 작업 이어가기
          </button>`:""}${W.can_backup_fresh?u`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            백업 후 새로 시작
          </button>`:""}${W.can_recheck?u`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${W.action_id}
            ?disabled=${W.locked}
          >
            다시 확인
          </button>`:""}`:"",Ee=W?u`<div class="worker-mini__stale">
        <strong>${W.title}</strong>
        <span>${W.summary}</span>
        <span>${W.cause}</span>
        ${W.can_backup_fresh?u`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ke=e.revise_action?u`<button
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
        </button>`:"",ue=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),F=Bs(e.rec,ko(e,"rec")),$e=Fs(e.cross_lane_chip),Se=Os(e.log_path),E=m||$e||O||j||ue||F||P||Se?u`<div class="worker-chips">
          ${m}${$e}${O}${j}${ue?Ns(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${F}${P}${Se}${bu(e)}
        </div>`:"",ne=qs(e.dependency_chips),he=Is(e),fe=t.actions?t.actions:"",Oe=!!(i||e.merge_action||e.cancel_action||e.discard_action||N?.operation||e.revise_action||W);return u`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?u`<div class="worker-mini__row1">
            ${m}${k}${H}${j}${V}${ae}${fe}
          </div>
          <div class="worker-mini__row2">
            ${P}${c?u`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?u`<span
                  class="worker-mini__work"
                  title=${lu(e.work_kind)}
                  >작업 ${yr(e.work_ms)}</span
                >`:""}${q}${U}
            <span class="worker-mini__actions"
              >${X}${oe}${G}</span
            >
            ${Yr(e)}
          </div>`:l?u`<div class="worker-mini__head">
              ${d}${f}${k}${H}${V}${q}${h}${I}${fe}
            </div>
            <div class="worker-mini__body">${ae}${Ee}</div>
            ${ne}${E}${Oe?u`<div class="worker-mini__foot">
                  ${U}
                  <span class="worker-mini__actions"
                    >${X}${oe}${G}${ke}${Q}</span
                  >
                  ${Is(e)}
                </div>`:""}
            ${Yr(e)}`:u`<div class="worker-mini__line">
              ${d}${f}${k}${H}${ae}${V}${q}${h}${I}${U}${X}${oe}${G}${fe}
            </div>
            ${ne}${E}${he} ${Yr(e)}`}
  </div>`}function hm(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(u`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(u`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?u`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return u`${r}`}var hu={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function ga(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=da[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...ua(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=hu[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var bm=["rec","session_preferred","ineligible","qfr"];function Ws(e,t){for(let n of bm){if(!t(n))continue;let r=ga(e,n);return r?{chip_key:n,content:r}:null}return null}function bu(e){return e.chip_popover?Wr(e.chip_popover.content):""}function ko(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var zs="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function ha(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=hu[e.session_preferred_reason||""]||"",c=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],f=d.includes("missing_description"),h=d.some(q=>q.startsWith(zs)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=qs(e.dependency_chips),O=e.workspace_name?u`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",j=Fs(e.cross_lane_chip),H=js(c),ae=mu(e.from_id),V=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return u`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?u`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Us(e.priority)}
      ${r?u`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${ko(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?u`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${ko(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Bs(e.rec,ko(e,"rec"))}${mm(c,ko(e,"qfr"))}
      ${bu(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${c?_s(c,e.status,{onOpenDoc:n.onOpenDoc}):""}${k}
    ${O||j||H||ae||V?u`<div class="worker-chips">
          ${O}${j}${H}${ae}${Ns(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?u`<div class="worker-card__place-menu">
            ${hm(t.lanes,e.id)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:u`${e.reason?u`<span
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
    ${Yr(e)}
  </div>`}function Rn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=u`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?u`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return u`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${Qt(e.id||void 0)}
    data-lane=${e.lane}
  >
    ${e.collapsible?u`<header class="worker-pane__hd">
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
        </header>`:u`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":u`${e.header_row?e.header_row:""}${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?u`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(o=>e.lane==="candidate"?ha(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):vn(o))}
          </div>`}
  </section>`}function au(e,t,n){return u`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Hs(e){let t=e.parallel,n=e.serial,r=t.drop||{};return u`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${au("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":u`<div
            class="worker-wait__area-body"
            data-drop=${Qt(r.drop)}
            data-root-dir=${Qt(r.root_dir)}
            data-lane-id=${Qt(r.lane_id)}
            data-lane-length=${Qt(r.lane_length)}
          >
            ${t.rows.length===0?u`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:t.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${n.collapsed?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${au("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":u`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>ym(o))}
          </div>`}
    </section>
  </div>`}function ym(e){let t=e.drop||{},n=e.badge?u`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return u`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Rn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:u`${n}${e.header_control?e.header_control:""}`,body:u`<div
        class="worker-wait__rows"
        data-drop=${Qt(t.drop)}
        data-root-dir=${Qt(t.root_dir)}
        data-lane-id=${Qt(t.lane_id)}
        data-lane-length=${Qt(t.lane_length)}
      >
        ${e.rows.length===0?u`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`:e.rows}
      </div>`})}
    ${e.empty?u`<div class="worker-wait__hint">${e.title} · 비어 있음</div>`:""}
    ${e.cycle?u`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:""}
    ${e.after?e.after:""}
  </div>`}function Gs(e){return e.count?u`<section
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
  </section>`:""}var yu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],xo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ks(e,t){let n=yu.find(o=>o.step===e);if(!n)return null;let r=yu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function vu(e){let t=xo.findIndex(n=>n.step===e);return xo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function vr(e){let t=xo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function vm(e){let t=xo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:xo.length}}function Ys(e){let t=vm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ya=new Set(["queued","running","retry_pending"]),wu=new Set(["failed","succeeded"]),wm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ao={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},km={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ao.base_containment,child_sweep:Ao.child_sweep,branch_cleanup:Ao.branch_cleanup,parent_close:Ao.parent_close};function $m(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function xm(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ya,...wu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Am(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=c=>c.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function ba(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=wm[o];if(!s)return null;let i=Ks(n,`${r} ${s}`);return i?{...i,active:ya.has(o),failed:o==="failed"}:null}function Sm(e){return!e||typeof e!="object"?null:km[e.step]||null}function So(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Sm(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=$m(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&xm(k,t,l)).sort(Am):[],c=i?a:[],d=c.find(k=>ya.has(k.state));if(d)return ba(d);if(o)return o.step==="repo_operations"&&a[0]?ba(a[0],!0):null;let f=c.find(k=>wu.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return ba(f);if(r){let k=Ks(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Ao[e.cleanup_cursor]:null;if(!h)return null;let m=Ks(h.step,h.label);return m?{...m,active:!0,failed:!1}:null}function Vs(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Em="\uBBF8\uC801\uC7AC";function va(e,t){let n=Nn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Tm=10080*60*1e3;function ku(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Tm)return null;let o=Nn(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Wt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function $u(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Nn(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function xu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let c=va(s,{id:a,location_label:o.get(a)||Em}),d=n[a];c.foreign!==!0?c.openable=!0:typeof d=="string"&&d.length>0&&(c.openable=!0,c.root_dir=d),l.push(c)}l.length>0&&r.set(s,l)}return r}var Qs=1,Eo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],$a=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Vr={show_blocked:!0,spec:"all"},Au={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Cm(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Un(r)||(n=typeof r.status=="string"?r.status:null);return n}function Rm(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Un(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Om(e,t,n={}){let{winners:r,resumed_from_ids:o}=Nc(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,c=l.run_state,d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,m=Es(a.quickfix_landing)==="session",k=c!=="running"&&(f||!m)&&!o.has(a.attempt_id),O=!f&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,j=lt(n.observations?.[i]),H=lt(j.pr),ae=typeof a.merge_sha=="string"&&a.merge_sha.length>0||H.state==="MERGED",V=zn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:ae}),q=c==="failed"?Eu(a,{resume_eligible:k,resume_reason:O,confirmation:V.confirmation}):null;s.set(i,{...Su(a,e,c),started_at:d,...q?{failure:q}:{},can_pause:c==="running"&&f,can_resume:k})}for(let[i,l]of Im(e,t)){if(s.has(i))continue;let a=l.attempt,c=zn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=Lu(a);s.set(i,{...Su(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Eu(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:c.confirmation})}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function Su(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Bn(t,e.bead_id)}}function Eu(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Lu(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:fu(e),confirmation:t.confirmation}}function Lu(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Lm=new Set(["parked","retry_wait"]);function Im(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Un(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Un(s)||!Lm.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function Tu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function lt(e){return e&&typeof e=="object"?e:{}}function Dm(e,t,n){let r=lt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=h=>un({pin:h,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,c;try{a=l(r),c=l(null)}catch{return null}let d=Cu(Kr(a,s),Kr(c,s)),f=Cu(br(a,null),br(c,null));return d||f?{orchestration:d,worker:f}:null}function Cu(e,t){return!e||t&&t.text===e.text?null:e}function Mm(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=ku(e,i,n);l&&s.push(l)}return s.length===0?null:s}function xa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Pm=new Set(["quick_fix","spec_backed","full_plan"]);function Ru(e){return typeof e=="string"&&Pm.has(e)}function Nm(e){let t={...lt(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function qm(e,t,n){let r=e.runner_catalog??null,o=ka(e,t,n,null);if(!o)return null;let s=yn(r,o.orchestration_model.value??""),i=s===null?o:ka(e,t,n,s)||o,l=Kr(i,r),a=br(i,s);return l||a?{orchestration:l,worker:a}:null}function ka(e,t,n,r){let o=Ru(n)?n:Ru(t.route)?t.route:null;try{return un({pin:t,global:Nm(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Fm(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:br(ka(e,lt(t.metadata),t.route,n),n)}function Aa(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function jm(e){let t={};for(let l of Cn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let c=!1;for(let d of Cn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,c=!0);c&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?Yt(vs(i)):n?jn(t):null}function Iu(e,t){let n=fa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Bm(e,t,n){let r=t.get(e);if(!r)return Iu(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return wo(r)}function Um(e,t,n,r){let o=t.get(e);if(!o)return{label:Iu(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":wo(o),title:""}}function Wm(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function zm(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Hm(e,t,n,r,o,s,i){let l=[];return e.forEach((a,c)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let f=a.status==="confirmed"?"confirmed":"draft",h=Array.isArray(a.entries)?a.entries:[],m=[];h.forEach((H,ae)=>{let V=H&&typeof H.bead_id=="string"?H.bead_id:"";if(V.length===0)return;let q=H&&typeof H.root_dir=="string"?H.root_dir:"",I=n.get(V),P=I?I.state:void 0,U=P==="running"||P==="pr_wait"||P==="done",X=!I||P==="runnable",oe=I&&I.lane==="parallel"&&typeof I.position=="number"?I.position-1:null,N=Um(V,n,r,t),G=m.length>0?m[m.length-1].id:null,W=f==="confirmed"&&G!==null&&!(t.get(V)||[]).includes(G);m.push({id:V,title:o.get(V)||V,root_dir:I?I.root_dir:q,workspace_name:I?I.workspace_name:s.get(q)||"",seq:ae+1,location_label:N.label,location_title:N.title,draggable:!U,fixed:U,done:P==="done",unplaced:X,mismatch:W,...oe!==null?{queue_index:oe}:{}})}),m.forEach((H,ae)=>{H.seq=ae+1});let k=m.length>0&&m.every(H=>H.done),O=m.filter(H=>!H.fixed&&i.armed_by_bead.get(H.id)!==d).map(H=>H.id),j=zm(d,f,m,k,O,i);l.push({lane_id:d,status:f,draft:f==="draft",number:c+1,label:`\uC5F0\uACB0 ${c+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:k,can_confirm:f==="draft"&&m.length>=2,has_mismatch:f==="confirmed"&&m.some(H=>H.mismatch||H.unplaced),unlaunched:O,...j})}),l}function Gm(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function Km(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let c=`${a.root_dir}\0${a.id}`,d=s.get(c);if(d){d.cards.push(a);continue}let{scope:f,state:h}=Gm(a,t,n);h!==void 0&&(a.scope_state=h),s.set(c,{cards:[a],scope:f})}let i=new Map;for(let a of s.values()){let c=a.cards[0].scope_state;if(c!==void 0)for(let h of a.cards)h.scope_state=c;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=i.get(d);f?f.push(a):i.set(d,[a])}let l=(a,c,d)=>{let f=c.cards[0],h={id:f.id,title:f.title,location_label:Bm(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(h):m.overlap_chips=[h]};for(let a of i.values())for(let c=0;c<a.length;c+=1)for(let d=c+1;d<a.length;d+=1){let f=Rs(a[c].scope,a[d].scope);f.length!==0&&(l(a[c],a[d],f),l(a[d],a[c],f))}}function Ou(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Nn(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function Ym(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Nn(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let c=r.get(l)?.root_dir;typeof c=="string"&&c.length>0&&(s[l]=c)}return{ids:[...o],root_dirs:s}}function wa(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Xs(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function rr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...Vr,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Eo.some(y=>y.value===n.candidate_sort)?n.candidate_sort:"repo_spec",c=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),h=new Map;for(let y of o)y&&typeof y.root_dir=="string"&&h.set(y.root_dir,y);let m=new Map;for(let y of o)y&&typeof y.root_dir=="string"&&m.set(y.root_dir,y.name||y.root_dir);for(let y of r)y&&typeof y.root_dir=="string"&&m.set(y.root_dir,y.name||y.root_dir);let k=[],O=[],j=[],H=[],ae=[],V=[],q=new Map,I=new Map,P=new Map,U=new Map,X=new Map,oe=new Map,N=new Map,G=new Map,W=new Map,Q=new Map,Ee=new Map,ke=new Map,ue=new Map,F=new Set,$e=new Map,Se=new Map,E=new Map;for(let y of r){if(!y||typeof y.root_dir!="string")continue;let z=y.root_dir,Te=y.name||z,Re=h.get(z),Fe=Re&&typeof Re.revision=="number"?Re.revision:typeof y.revision=="number"?y.revision:0,Ye=lt(y.attempts),dt=lt(y.bead_titles);for(let[v,p]of Object.entries(dt))typeof p=="string"&&p.length>0&&E.set(v,p);let vt=lt(y.bead_times),Lt=lt(y.pr_observations),St=lt(y.admission),ht=lt(y.revise_parked),Be=lt(y.merge_queue_state),D=lt(y.cleanup_failed),te=lt(y.discard_operations),be=lt(y.bead_blocked_by);Object.hasOwn(y,"bead_scope")&&$e.set(z,lt(y.bead_scope));let R=lt(y.bead_workflow),K=lt(y.pr_activity),Ie=Array.isArray(y.repo_operations)?y.repo_operations:[];G.set(z,Ie);let We=typeof y.declared_base=="string"?y.declared_base:null;N.set(z,We),oe.set(z,Object.entries(D).map(([v,p])=>({bead_id:v,step:p&&p.step?p.step:"",reason:p&&p.reason?p.reason:"",at:p&&typeof p.at=="number"?p.at:null,detail:p&&typeof p.detail=="string"?p.detail:null,output_tail:p&&typeof p.output_tail=="string"&&p.output_tail?p.output_tail:void 0,log_path:p&&typeof p.log_path=="string"&&p.log_path?p.log_path:void 0,retry_count:p&&typeof p.retry_count=="number"&&Number.isInteger(p.retry_count)&&p.retry_count>0?p.retry_count:0,failure_code:p&&typeof p.failure_code=="string"?p.failure_code:void 0})));for(let[v,p]of Object.entries(lt(y.bead_overlay)))p&&typeof p=="object"&&W.set(`${z}\0${v}`,p);let Me=new Map;for(let v of Object.values(Ye))v&&typeof v.attempt_id=="string"&&Me.set(v.attempt_id,v);let Je=Array.isArray(y.merge_queue)?y.merge_queue:[],Le=new Set(Je.filter(v=>v&&typeof v.bead_id=="string").map(v=>v.bead_id)),ze=new Map(Je.filter(v=>v&&typeof v.bead_id=="string").map(v=>[v.bead_id,v])),Ze=new Map,ft=new Map,He=new Map,kt=new Map;Je.forEach((v,p)=>{v&&typeof v.bead_id=="string"&&(Ze.set(v.bead_id,p+1),ft.set(v.bead_id,v.resolution),He.set(v.bead_id,v.continuation_action||null),kt.set(v.bead_id,v.authority||null))});let Nt=lt(y.auto_merge_skips),nt=v=>{let p=Nt[v];if(!p)return null;let _=lt(lt(Lt[v]).pr).head_sha;return _&&_===p.head_sha?p.reason||"":null};X.set(z,{positions:Ze,resolutions:ft,continuations:He,authorities:kt,state:{active:typeof Be.active=="string"?Be.active:null,failures:lt(Be.failures),waiting:Be.waiting&&typeof Be.waiting.bead_id=="string"&&typeof Be.waiting.reason=="string"?Be.waiting:null},auto_excluded:(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(v=>v&&v.bead_id).filter(v=>typeof v=="string"&&nt(v)!==null),running:Je.length>0});let Tt=Array.isArray(y.queue)?y.queue:[];for(let v of[...Tt,...Array.isArray(y.pr_wait)?y.pr_wait:[]])v&&typeof v.bead_id=="string"&&typeof v.armed_by_lane=="string"&&v.armed_by_lane.length>0&&ke.set(v.bead_id,v.armed_by_lane);for(let v of Array.isArray(y.disarmed_on_load)?y.disarmed_on_load:[])typeof v=="string"&&v.length>0&&F.add(v);let xt=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).filter(v=>v&&/^s[1-5]$/.test(v.id)&&Array.isArray(v.entries)),Ct=lt(y.lane_states),qt=typeof y.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(y.serial_lane_count))):Math.min(5,xt.length);P.set(z,qt),U.set(z,Tt.length);let an=new Map(xt.map(v=>[v.id,v])),Bt=new Map;for(let v of xt)for(let p of v.entries)p&&typeof p.bead_id=="string"&&Bt.set(p.bead_id,v.id);for(let[v,p]of Object.entries(lt(y.bead_dependents))){let _=Array.isArray(p?.ids)?p.ids:[],A=lt(p?.root_dirs),L=Ee.get(v)||{ids:new Set,root_dirs:{}};for(let Z of _)typeof Z=="string"&&Z.length>0&&L.ids.add(Z);for(let[Z,ce]of Object.entries(A))typeof ce=="string"&&ce.length>0&&(L.root_dirs[Z]=ce);Ee.set(v,L)}for(let[v,p]of Object.entries(be))Array.isArray(p)&&Q.set(v,p.filter(_=>typeof _=="string"&&_.length>0));let Ut=Array.isArray(y.done)?y.done:[];for(let v of Ut)v&&typeof v.bead_id=="string"&&V.push({id:v.bead_id,root_dir:z,workspace_name:Te});let It=new Map;for(let v of Ut)v&&typeof v.bead_id=="string"&&typeof v.added_at=="number"&&It.set(v.bead_id,v.added_at);let Pt=v=>({id:v,title:dt[v]||v,root_dir:z,workspace_name:Te,expected_revision:Fe,draggable:!1,...lt(vt[v]).created_at?{created_at:lt(vt[v]).created_at}:{},...lt(vt[v]).updated_at?{updated_at:lt(vt[v]).updated_at}:{}}),Zt=v=>{let p=R[v]?.chips?.pr;return p&&typeof p.number=="number"&&typeof p.url=="string"?{pr_number:p.number,pr_url:p.url}:{}},zt=v=>Object.hasOwn(be,v)?{blocked_by:Array.isArray(be[v])?be[v].filter(p=>typeof p=="string"&&p.length>0):[]}:{},wt=new Set;for(let[v,p]of Om(Ye,It,{discard_operations:te,observations:Lt})){wt.add(v);let _=p.run_state==="failed"?Wm(Ye,p.attempt_id):null;_!==null&&ue.set(v,_);let A=Me.get(p.attempt_id)||null,L=W.get(`${z}\0${v}`),Z=L&&L.rollup?L.rollup:null,ce=xa(We,A?A.target_base:null),me=A?Aa(A,Me):!1,ge=A&&A.quickfix_lane===!0&&A.quickfix_landing&&typeof A.quickfix_landing=="object"?A.quickfix_landing:null,it=ge&&typeof ge.reason=="string"&&ge.reason.length>0?ge.reason:null,ut=ge?So({bead_id:v,merge_sha:ge.head_sha,cleanup_cursor:ge.cursor,cleanup_failed:it?{step:ge.cursor,reason:it}:null,repo_operations:Ie}):null;O.push({...Pt(v),lane:"running",...zt(v),...Bt.has(v)?{serial_lane_id:Bt.get(v)}:{},attempt_id:p.attempt_id,run_state:p.run_state,status:p.status||void 0,workflow:R[v]||null,can_pause:p.can_pause,can_resume:p.can_resume,started_at:p.started_at,last_event_at:p.last_event_at,last_activity:p.last_activity,legs:p.legs,runner:p.runner,model:p.model,effort:p.effort,speed:p.speed,resumed_from:p.resumed_from,continuation_mode:p.continuation_mode,usage:p.usage,failure:p.failure||null,retry:p.retry||null,exec_chips:{orchestration:ca(p),worker:Fm(lt(Re),L,p.runner||null)},discard:zn(te,v,{attempt_id:p.attempt_id,merged:p.failure?.confirmation==="merged"||lt(Lt[v]).pr?.state==="MERGED"}),...Z?{rollup:Z}:{},...me?{conflict_resolution:!0}:{},...ce?{base_exception:ce}:{},...ut?{landing:ut}:{},badges:p.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:p.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:p.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:p.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:[],alert:p.run_state==="failed"})}for(let[v,p]of Pc(Ye)){if(O.some(A=>A.id===v))continue;let _=p.attempt;O.push({...Pt(v),lane:"running",kind:"session",...zt(v),attempt_id:typeof _.attempt_id=="string"?_.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:R[v]||null,can_pause:!1,can_resume:!1,started_at:p.started_at,last_event_at:typeof _.last_event_at=="number"?_.last_event_at:null,last_activity:_.last_activity&&typeof _.last_activity=="object"?_.last_activity:null,legs:Array.isArray(_.legs)?_.legs:[],runner:typeof _.runner=="string"?_.runner:null,model:typeof _.model=="string"?_.model:null,effort:typeof _.effort=="string"?_.effort:null,speed:typeof _.speed=="string"?_.speed:null,resumed_from:null,continuation_mode:null,usage:_.usage&&typeof _.usage=="object"?_.usage:null,exec_chips:{orchestration:ca(_),worker:null},discard:zn(te,v,{merge_queued:!0}),badges:[p.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let v of Array.isArray(y.session_active)?y.session_active:[]){let p=v&&v.bead_id;typeof p!="string"||wt.has(p)||(wt.add(p),Array.isArray(v.blocked_by)&&v.blocked_by.length>0&&Q.set(p,v.blocked_by.filter(_=>typeof _=="string"&&_.length>0)),typeof v.title=="string"&&v.title.length>0&&E.set(p,v.title),O.push({...Pt(p),title:v.title||dt[p]||p,lane:"running",kind:"session",status:"in_progress",started_at:wa(v.started_at)??wa(v.updated_at)??void 0,updated_at:wa(v.updated_at)??void 0,workflow:v.workflow||null,labels:Array.isArray(v.labels)?v.labels:[],spec_id:typeof v.spec_id=="string"?v.spec_id:"",blocked:v.blocked===!0,...Array.isArray(v.blocked_by)?{blocked_by:v.blocked_by.filter(_=>typeof _=="string"&&_.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(v.session_refs)?v.session_refs:[],badges:[],alert:!1}))}for(let v of Array.isArray(y.pr_wait)?y.pr_wait:[]){let p=v&&v.bead_id;if(typeof p!="string"||wt.has(p))continue;wt.add(p);let _=lt(Lt[p]),A=lt(_.pr),L=_.gate?lt(_.gate):null,Z=Le.has(p),ce=ze.get(p)?.continuation_action||null,me=!!ce&&ce.continuation===null,ge=Be.active===p,it=v.external===!0,ut=D[p]||null,Ht=lt(K[p]),_t=So({bead_id:p,merge_sha:v.merge_sha,cleanup_cursor:v.cleanup_cursor,merge_progress:Ht.merge_progress||null,cleanup_failed:ut,repo_operations:Ie}),x=Vs(_t),C=!!L&&L.base_badge==="\uCDA9\uB3CC",Ae=!!ut&&["child_sweep","branch_cleanup","parent_close"].includes(ut.step)&&!!L&&L.tier==="merged",g=it&&!!ut&&!!L&&L.tier==="merged",b=!!L&&["closed_unmerged","review","undecidable"].includes(L.tier),S=zn(te,p,{external:it,merge_active:ge||_t?.step==="merge",merge_queued:Z,cleanup_active:x,merged:!!ut||L?.tier==="merged"}),re=!!S.operation;j.push({...Pt(p),lane:"pr_wait",...zt(p),workflow:R[p]||null,pr_number:typeof A.number=="number"?A.number:null,pr_url:typeof A.url=="string"?A.url:void 0,external:it,usage:Bn(Ye,p),merge_step:_t,badges:me?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:_t?[L?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:ut?[vr(ut.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${vr(ut.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof L?.gate_badge=="string"&&L.gate_badge.length>0?[L.gate_badge]:[],alert:_t?_t.failed===!0:!!ut||b,reason:ut&&_t?.active!==!0?Ys(ut.step):"PR \uB300\uAE30",merge_action:L?.tier==="merged"&&!Ae&&!g?!1:!Z||me,merge_enabled:!re&&(me||L?.enabled===!0||C||Ae||g),merge_label:me?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":g||Ae?"\uC815\uB9AC \uC7AC\uAC1C":C&&!Ae?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:me?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":re?S.error?`\uD3D0\uAE30 \uC2E4\uD328: ${S.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${S.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:g?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":L?.enabled===!0?`\uBA38\uC9C0 (${L.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${L?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Z&&!me,cancel_enabled:!ge,continuation_mismatch:ce?.mismatch||null,discard:S,discard_action:S.action,discard_enabled:S.enabled,discard_title:S.title})}let Xt=(v,p,_,A)=>{let L=v&&v.bead_id;if(typeof L!="string"||wt.has(L))return null;wt.add(L);let Z=ht[L],ce=zn(te,L),me=ce.operation?ce:null,ge={...Pt(L),lane:p,workflow:R[L]||null,draggable:!me,discard:me||void 0,reason:Tu(St,L),seq:_+1,queue_position:_+1,queue_index:_,queue_length:A,badges:Z?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Z,revise_action:!!Z,revise_enabled:!!Z&&!me,revise_title:Z?Z.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Z.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},it=zt(L);return Object.hasOwn(it,"blocked_by")&&(ge.blocked_by=it.blocked_by),ge};for(let v=0;v<Tt.length;v++){let p=Xt(Tt[v],"queue",v,Tt.length);if(!p)continue;H.push(p);let _=q.get(z);_?_.push(p):q.set(z,[p])}let we=v=>{let p=j.find(Z=>Z.id===v&&Z.root_dir===z);if(p)return{id:v,title:p.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let _=O.find(Z=>Z.id===v&&Z.root_dir===z),A=_?_.run_state:Cm(Ye,v),L=A==="failed"||A==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":A==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:v,title:_?_.title:Pt(v).title,badge:L}},T=[];for(let v=0;v<Math.max(qt,xt.length);v++){let p=`s${v+1}`,_=an.get(p),A=_&&Array.isArray(_.entries)?_.entries:[],L=lt(Ct[p]),Z=Array.isArray(L.occupied_by)?L.occupied_by.filter(ge=>typeof ge=="string"):[],ce=new Set(Z),me=[];for(let ge=0;ge<A.length;ge++){let it=A[ge]&&A[ge].bead_id;if(typeof it=="string"&&ce.has(it)){wt.add(it);continue}let ut=Xt(A[ge],p,ge,A.length);ut&&(me.push(ut),H.push(ut))}me.length===0&&Z.length===0&&(qt<=1||v>=qt)||T.push({id:p,index:v,items:me,raw_length:A.length,occupied_by:Z,occupants:Z.map(ge=>we(ge)),corrections:Array.isArray(L.corrections)?L.corrections.length:0,cycle:L.cycle===!0,...me.length===0&&Z.length===0?{empty:!0}:{}})}I.set(z,T);let ee=Array.from({length:qt},(v,p)=>{let _=`s${p+1}`,A=an.get(_),L=A&&Array.isArray(A.entries)?A.entries:[],Z=lt(Ct[_]);return{id:_,index:L.length,length:L.length,occupied_by:Array.isArray(Z.occupied_by)?Z.occupied_by.filter(ce=>typeof ce=="string"):[]}});for(let v of Array.isArray(y.runnable)?y.runnable:[]){let p=v&&v.bead_id;if(typeof p!="string"||wt.has(p))continue;wt.add(p);let _=v.workflow&&typeof v.workflow=="object"?v.workflow:null,A=_&&typeof _.route=="string"&&_.route||(typeof v.route=="string"?v.route:null),L=Dm(lt(Re),v.exec_pins,A),Z=vo(v.rec,v.exec_pins);Array.isArray(v.blocked_by)&&v.blocked_by.length>0&&Q.set(p,v.blocked_by.filter(_t=>typeof _t=="string"&&_t.length>0)),typeof v.title=="string"&&v.title.length>0&&E.set(p,v.title),Array.isArray(v.scope)&&Se.set(p,v.scope.filter(_t=>typeof _t=="string"&&_t.length>0));let ce=v.eligible!==!1,me=v.worker_ineligible===!0,ge=Object.hasOwn(v,"eligible"),it=[];typeof v.reason=="string"&&v.reason.length>0&&it.push(v.reason);let ut=Tu(St,p);ut&&it.push(ut);let Ht=Mm(p,v.release_info,f)?.map(_t=>({..._t,...Ou({id:p,root_dir:z},_t.id)}));k.push({...Pt(p),title:v.title||dt[p]||p,lane:"runnable",draggable:!ge,queue_placeable:ce&&!me,...me?{worker_ineligible:!0}:{},...v.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof v.session_preferred_reason=="string"?v.session_preferred_reason:""}:{},...Ht?{dependency_chips:{released:Ht}}:{},...v.dependents_info&&typeof v.dependents_info=="object"?{dependents_info:v.dependents_info}:{},reason:it.join(" \xB7 "),created_at:v.created_at??void 0,updated_at:v.updated_at??void 0,status:typeof v.status=="string"?v.status:void 0,labels:Array.isArray(v.labels)?v.labels:[],spec_id:typeof v.spec_id=="string"?v.spec_id:"",published:v.published===!0,workflow:_||(A?{route:A,chips:{route:A}}:null),...L?{exec_chips:L}:{},...Z?{rec:Z}:{},blocked:v.blocked===!0,...Array.isArray(v.blocked_by)?{blocked_by:v.blocked_by.filter(_t=>typeof _t=="string"&&_t.length>0)}:{},place_index:Tt.length,place_lanes:ee})}for(let v of Ut){let p=v&&v.bead_id;if(typeof p!="string"||wt.has(p)||(wt.add(p),s!==void 0&&typeof v.added_at=="number"&&v.added_at<s))continue;let _=Rm(Ye,p),A=_&&typeof _.done_kind=="string"?_.done_kind:null;ae.push({...Pt(p),lane:"done",done:!0,done_layout:"three_line",usage:Bn(Ye,p),work_ms:du(Ye,p),done_at:typeof v.added_at=="number"?v.added_at:void 0,done_kind:A,...Zt(p),badges:[...A&&Au[A]?[Au[A]]:[],...cu(Ye,p)]})}for(let v of Array.isArray(y.session_done)?y.session_done:[]){let p=v&&(v.id||v.bead_id);typeof p!="string"||wt.has(p)||(wt.add(p),ae.push({...Pt(p),...v,id:p,root_dir:z,workspace_name:Te,expected_revision:Fe,lane:"done",done:!0}))}}if(W.size>0)for(let y of[...k,...H,...O,...j,...ae]){let z=W.get(`${y.root_dir}\0${y.id}`);if(!z||(typeof z.priority=="number"&&(y.priority=z.priority),typeof z.from_id=="string"&&z.from_id.length>0&&(y.from_id=z.from_id),!Object.hasOwn(z,"metadata")))continue;let Te=lt(z.metadata);if(y.rec=vo(Te),y.lane==="runnable"||y.lane.startsWith("s")||y.lane==="queue"){let Re=qm(lt(h.get(y.root_dir)),Te,typeof z.route=="string"&&z.route.length>0?z.route:lt(y.workflow).route);Re&&(y.exec_chips=Re)}}let ne=new Map;o.forEach((y,z)=>{y&&typeof y.root_dir=="string"&&ne.set(y.root_dir,z)});let he=n&&n.running_sort==="repo"?"repo":"started";O.sort((y,z)=>{let Te=y.kind==="session",Re=z.kind==="session";if(Te!==Re)return Te?1:-1;if(Te&&Re){let dt=Xs(z.updated_at)-Xs(y.updated_at);return dt!==0?dt:y.id.localeCompare(z.id)}if(he==="repo"){let dt=ne.get(y.root_dir)??Number.MAX_SAFE_INTEGER,vt=ne.get(z.root_dir)??Number.MAX_SAFE_INTEGER;if(dt!==vt)return dt-vt}let Fe=typeof y.started_at=="number"&&Number.isFinite(y.started_at)?y.started_at:null,Ye=typeof z.started_at=="number"&&Number.isFinite(z.started_at)?z.started_at:null;return Fe!==null&&Ye!==null&&Fe!==Ye?Fe-Ye:Fe===null&&Ye!==null?1:Fe!==null&&Ye===null?-1:y.id.localeCompare(z.id)}),ae.sort((y,z)=>(z.done_at??0)-(y.done_at??0));let fe=o.length>0?o:r.map(y=>({root_dir:y&&y.root_dir,name:y&&y.name,auto_advance:y&&y.auto_advance,auto_merge:y&&y.auto_merge,slots:y&&y.slots,revision:y&&y.revision,runner_catalog:y&&y.runner_catalog})),Oe=new Set(k.map(y=>y.root_dir)),de=new Map;for(let y of O)y.kind==="session"||y.run_state!=="running"||de.set(y.root_dir,(de.get(y.root_dir)||0)+1);let De=new Map;for(let y of ae){let z=De.get(y.root_dir);z?z.push(y):De.set(y.root_dir,[y])}let tt={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},st=[];for(let y of fe){if(!y||typeof y.root_dir!="string")continue;let z=q.get(y.root_dir)||[],Te=I.get(y.root_dir)||[],Re=z.length>0||Te.some(dt=>dt.items.length>0||dt.occupied_by.length>0);if(c!=="all"&&!Re&&!Oe.has(y.root_dir))continue;let Fe=typeof y.slots=="number"&&y.slots>=Qs?y.slots:Qs,Ye=de.get(y.root_dir)||0;st.push({live_count:Ye,over_cap:Ye>Fe,merge:X.get(y.root_dir)||tt,token_total:jm(De.get(y.root_dir)||[]),cleanup_failures:oe.get(y.root_dir)||[],declared_base:N.get(y.root_dir)??null,repo_operations:G.get(y.root_dir)||[],root_dir:y.root_dir,name:y.name||y.root_dir,auto_advance:y.auto_advance===!0,auto_merge:y.auto_merge===!0,slots:Fe,revision:typeof y.revision=="number"?y.revision:0,runner_catalog:lt(y.runner_catalog),items:z,sublanes:{parallel:z,serial:Te},serial_lane_count:P.get(y.root_dir)||0,raw_queue_length:U.get(y.root_dir)||0})}let M={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:H,queue_groups:st,running:O,pr_wait:j,done:ae,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(U),owner_of:{}},le=nu(M);for(let y of V)le.has(y.id)||le.set(y.id,{root_dir:y.root_dir,workspace_name:y.workspace_name,lane:"done",state:"done"});for(let y of[...M.queue,...M.runnable,...M.running,...M.pr_wait]){if(!Object.hasOwn(y,"blocked_by"))continue;let z=le.get(y.id);y.blockers=(y.blocked_by||[]).map(Te=>ru(Te,z,le,o))}for(let y of[...M.queue,...M.runnable,...M.running,...M.pr_wait]){let z=(y.blockers||[]).map(Fe=>({...va(y.id,Fe),...Ou(y,Fe.id,le)})),Te=$u(y.id,Ym(Ee.get(y.id),y.dependents_info,y,le));if(z.length===0&&Te.length===0)continue;let Re={...y.dependency_chips||{},...z.length>0?{predecessors:z}:{},...Te.length>0?{dependents:Te}:{}};y.dependency_chips=Re}Km(M,$e,Se,le,o);let se=ou(M.queue_groups);for(let y of M.queue_groups)for(let z of y.sublanes.serial){let Te=se.get(su(y.root_dir,z.id));Te&&(z.cross_wait_peers=Te)}M.chain_lanes=Hm(l&&Array.isArray(l.lanes)?l.lanes:[],Q,le,o,E,m,{armed_by_bead:ke,failed_by_bead:ue,disarmed_lanes:F});let pe=new Map;for(let y of[...M.queue,...M.runnable])pe.has(y.id)||pe.set(y.id,y);let xe=new Set;for(let y of M.chain_lanes)for(let z of y.rows){if(y.status==="confirmed"&&!z.unplaced&&!z.fixed&&xe.add(z.id),!y.draft&&!z.unplaced)continue;let Te=pe.get(z.id);Te&&(Te.cross_lane_chip={lane_id:y.lane_id,number:y.number,status:y.status,label:y.draft?`\uC5F0\uACB0 ${y.number} (draft)`:`\uC5F0\uACB0 ${y.number}`})}let ie=new Map(M.chain_lanes.map(y=>[y.lane_id,y.number]));for(let y of[...M.queue,...M.running]){let z=ke.get(y.id);if(typeof z!="string"||z.length===0)continue;let Te=ie.get(z);y.armed_lane_chip=Te===void 0?{lane_id:z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:z,label:`\u25B6 \uC5F0\uACB0 ${Te}`,orphan:!1}}let qe=[];for(let y of q.values())for(let z of y)xe.has(z.id)||qe.push(z);qe.sort((y,z)=>{let Te=y.workspace_name.localeCompare(z.workspace_name);return Te!==0?Te:(y.queue_index??0)-(z.queue_index??0)}),M.parallel_rows=qe;let Ge={};for(let[y,z]of le)typeof z.root_dir=="string"&&z.root_dir.length>0&&(Ge[y]=z.root_dir);for(let y of M.chain_lanes)for(let z of y.rows)!Object.hasOwn(Ge,z.id)&&z.root_dir.length>0&&m.has(z.root_dir)&&(Ge[z.id]=z.root_dir);M.owner_of=Ge;let Xe=M.runnable.length;M.runnable_all=M.runnable.slice();let Pe=M.runnable,Y=y=>i.show_blocked||y.blocked!==!0,B=y=>i.spec==="all"||(i.spec==="with"?y.published===!0:y.published!==!0);if(d==="per_control"){let y=[],z=0,Te=0;for(let Re of Pe){let Fe=Y(Re),Ye=B(Re);Fe&&Ye?y.push(Re):!Fe&&Ye?z+=1:Fe&&!Ye&&(Te+=1)}Pe=y,M.runnable_hidden={blocked:z,spec:Te}}else{Pe=Pe.filter(Y);let y=Pe.length;Pe=Pe.filter(B),M.runnable_hidden={blocked:Xe-y,spec:y-Pe.length}}let Ne=(y,z)=>{let Te=Xs(z.updated_at)-Xs(y.updated_at);return Te!==0?Te:y.id.localeCompare(z.id)},Qe=a==="repo_spec"?(y,z)=>{let Te=y.published===!0?0:1,Re=z.published===!0?0:1;return Te!==Re?Te-Re:Ne(y,z)}:Ne;if(a==="as_given")M.runnable=Pe,M.runnable_sections=[];else if(a==="updated_flat")M.runnable=Pe.slice().sort(Ne),M.runnable_sections=[];else{let y=new Map;for(let Re of Pe){let Fe=y.get(Re.root_dir);Fe?Fe.push(Re):y.set(Re.root_dir,[Re])}let z=[],Te=[];for(let Re of fe){if(!Re||typeof Re.root_dir!="string")continue;let Fe=(y.get(Re.root_dir)||[]).slice().sort(Qe);y.delete(Re.root_dir),Fe.length!==0&&(z.push({root_dir:Re.root_dir,name:Re.name||Re.root_dir,items:Fe.map(Ye=>({...Ye,workspace_name:""}))}),Te.push(...Fe))}for(let[Re,Fe]of y){let Ye=Fe.slice().sort(Qe);z.push({root_dir:Re,name:Ye[0]?.workspace_name||Re,items:Ye.map(dt=>({...dt,workspace_name:""}))}),Te.push(...Ye)}M.runnable=Te,M.runnable_sections=z}return M}function Du(e,t){let n=new Map(e.map((a,c)=>[a,c])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(c=>{if(o.has(c))return!1;for(let d of r.get(c))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,c)=>[a,c]));for(let a of s){let c=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),h=Number(l.get(a))>Number(l.get(d));f&&h&&(c===null||Number(l.get(d))>Number(l.get(c)))&&(c=d)}c!==null&&i.push({bead_id:a,after:c})}return{order:s,corrections:i,cycle:!1}}var Vm="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Js="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Xm="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Qm="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Xr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function To(e,t){return`${e}\0${t}`}function Zm(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Jm(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Oo(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=Zm(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[f,h]of o)for(let m of h)s.push({blocker:m,blockee:f});let i=Jm(e,t),l=new Map(r.map((f,h)=>[f,h])),a=r.slice(0,i).filter(f=>o.get(f).some(h=>Number(l.get(h))>Number(l.get(f)))),c=Du(r.slice(i),s);if(c.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,i),...c.order.map(f=>d.get(f))],corrections:c.corrections,cycle:!1,held:!1,mismatched:a}}function Mu(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Oo(n,t)}function eg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function tg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function ng(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Sa(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function rg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(To(i,a));let r=new Map,o=new Map;for(let i of e){let l=To(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=To(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function og(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function sg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Zs(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ea(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Lo(e){let t=ng(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=c=>{let d=e.owner_of.get(c);return typeof d!="string"||d.length===0?(o.refusal=tg(c),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(c,d,f)=>{if(o.refusal!==null||c===d)return;let h=t.get(c)||[];if(h.includes(d))return;let m=s(c);if(m!==null){if(Sa(t,d,c)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${c}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(c,[...h,d]),f!==void 0&&r.add(To(c,d)),n.push({type:"dep-add",a:c,b:d,root_dir:m,...f===void 0?{}:{lane_id:f}})}},removeDep:(c,d)=>{if(o.refusal!==null||c===d)return;let f=t.get(c)||[];if(!f.includes(d))return;let h=s(c);h!==null&&(t.set(c,f.filter(m=>m!==d)),n.push({type:"dep-remove",a:c,b:d,root_dir:h}))},laneCreated:(c,d)=>r.has(To(c,d))}}function Io(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=rg(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],c=o.lane_id===void 0||o.correction===void 0?void 0:eg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...c===void 0?{}:{correction:c}}}function Pu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Co(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Nu(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function qu(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(Zs(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Ro(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function ei(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function ti(e,t,n){let r=Lo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),c=e.kind==="chain"?e.lane_id??a:void 0,d=c===void 0?void 0:n.cross_lanes.get(c);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Vm};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Xm};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ea(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Xr}}if(e.kind==="chain"&&d===void 0)return{refused:Xr};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(V=>V.bead_id===e.bead_id);if(k<0)return;let O=k>0?d.entries[k-1]:null,j=k+1<d.entries.length?d.entries[k+1]:null,H=Co(d,k),ae=j!==null&&Co(d,k+1);H&&O!==null&&r.removeDep(e.bead_id,O.bead_id),ae&&j!==null&&r.removeDep(j.bead_id,e.bead_id),(H||ae)&&O!==null&&j!==null&&r.addDep(j.bead_id,O.bead_id,c)},h=(k,O)=>{let j=n.cross_lanes.get(k),H=j.entries.findIndex(N=>N.bead_id===e.bead_id),ae=j.entries.filter(N=>N.bead_id!==e.bead_id),V=Math.max(0,Math.min(ae.length,H>=0&&O>H?O-1:O)),q=-1;if(ae.forEach((N,G)=>{n.fixed_members.has(N.bead_id)&&(q=G)}),V<=q){r.state.refusal=Qm;return}let I=H>=0?j.entries[H]:d?.entries.find(N=>N.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Oo({status:j.status,entries:[...ae.slice(0,V),I,...ae.slice(V)]},n);let P=l.entries;if(ei(P,j.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Ro(P)}}),j.status!=="confirmed")return;let U=P.findIndex(N=>N.bead_id===e.bead_id),X=U>0?P[U-1].bead_id:null,oe=U+1<P.length?P[U+1].bead_id:null;if(X===null){oe!==null&&r.addDep(oe,e.bead_id,k);return}if(r.addDep(e.bead_id,X,k),oe!==null&&(r.graph.get(oe)||[]).includes(X)){let N=j.entries.findIndex(G=>G.bead_id===oe);(r.laneCreated(oe,X)||N>0&&j.entries[N-1].bead_id===X&&Co(j,N))&&r.removeDep(oe,X),r.addDep(oe,e.bead_id,k)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==c)&&(i.push(...Nu(n,d,c,d.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:c,entries:Ro(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=og(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(Zs(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let O=n.parallel_rows,j=O[Math.max(0,Math.min(O.length,t.marker_index))];if(!(!!j&&j.bead_id===e.bead_id)&&sg(n,e.root_dir)&&m!==void 0){let ae=m>k?k:k-1;ae>=0&&ae!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ae},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(Zs(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let k=m>t.index?t.index:t.index-1;k>=0&&k!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(Zs(e.bead_id,e.root_dir,t.index,t.lane_id));return Io(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Fu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Xr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Oo(n,t);if(r.held)return{refused:Js};let o=r.entries,s=Lo(t),i=[];Pu(s,o,e),s.state.refusal===null&&qu(s,t,o,i);let l=ei(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ro(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Io(s,t,l,i,{lane_id:e,correction:r})}function ju(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Xr};let r=Oo(n,t),o=r.entries,s=Lo(t),i=[];Pu(s,o,e),s.state.refusal===null&&qu(s,t,o,i);let l=ei(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ro(o)}}];return Io(s,t,l,i,{lane_id:e,correction:r})}function Bu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Xr};let r=Oo(n,t),o=r.entries;return Io(Lo(t),t,ei(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ro(o)}}],[],{lane_id:e,correction:r})}function Uu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Xr};let r=Lo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Co(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Io(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Nu(t,n,e,n.entries)})}function Wu(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Co(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Ea(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function zu(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Hu(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Ta(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ea(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var ig="\uC0AC\uC774\uD074";function ag(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Ca(e,t,n){let r=rr(e,t),o=[],s=new Set,i=(a,c)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:c}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:ag(e)}}function Gu(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Sa(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:ig}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,c=r!==void 0&&l.root_dir===r;return a!==c?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Ku(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:nd,setPrototypeOf:Yu,isFrozen:lg,getPrototypeOf:cg,getOwnPropertyDescriptor:ug}=Object,{freeze:nn,seal:gn,create:Pa}=Object,{apply:Na,construct:qa}=typeof Reflect<"u"&&Reflect;nn||(nn=function(t){return t});gn||(gn=function(t){return t});Na||(Na=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});qa||(qa=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var ni=rn(Array.prototype.forEach),dg=rn(Array.prototype.lastIndexOf),Vu=rn(Array.prototype.pop),Do=rn(Array.prototype.push),pg=rn(Array.prototype.splice),oi=rn(String.prototype.toLowerCase),Ra=rn(String.prototype.toString),Oa=rn(String.prototype.match),Mo=rn(String.prototype.replace),fg=rn(String.prototype.indexOf),_g=rn(String.prototype.trim),wn=rn(Object.prototype.hasOwnProperty),tn=rn(RegExp.prototype.test),Po=mg(TypeError);function rn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Na(e,t,r)}}function mg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return qa(e,n)}}function pt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:oi;Yu&&Yu(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(lg(t)||(t[r]=s),o=s)}e[o]=!0}return e}function gg(e){for(let t=0;t<e.length;t++)wn(e,t)||(e[t]=null);return e}function Hn(e){let t=Pa(null);for(let[n,r]of nd(e))wn(e,n)&&(Array.isArray(r)?t[n]=gg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Hn(r):t[n]=r);return t}function No(e,t){for(;e!==null;){let r=ug(e,t);if(r){if(r.get)return rn(r.get);if(typeof r.value=="function")return rn(r.value)}e=cg(e)}function n(){return null}return n}var Xu=nn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),La=nn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ia=nn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),hg=nn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Da=nn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),bg=nn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Qu=nn(["#text"]),Zu=nn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ma=nn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ju=nn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ri=nn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),yg=gn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),vg=gn(/<%[\w\W]*|[\w\W]*%>/gm),wg=gn(/\$\{[\w\W]*/gm),kg=gn(/^data-[\-\w.\u00B7-\uFFFF]+$/),$g=gn(/^aria-[\-\w]+$/),rd=gn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),xg=gn(/^(?:\w+script|data):/i),Ag=gn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),od=gn(/^html$/i),Sg=gn(/^[a-z][.\w]*(-[.\w]+)+$/i),ed=Object.freeze({__proto__:null,ARIA_ATTR:$g,ATTR_WHITESPACE:Ag,CUSTOM_ELEMENT:Sg,DATA_ATTR:kg,DOCTYPE_NAME:od,ERB_EXPR:vg,IS_ALLOWED_URI:rd,IS_SCRIPT_OR_DATA:xg,MUSTACHE_EXPR:yg,TMPLIT_EXPR:wg}),qo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Eg=function(){return typeof window>"u"?null:window},Tg=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},td=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function sd(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Eg(),t=we=>sd(we);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==qo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:m}=e,k=a.prototype,O=No(k,"cloneNode"),j=No(k,"remove"),H=No(k,"nextSibling"),ae=No(k,"childNodes"),V=No(k,"parentNode");if(typeof i=="function"){let we=n.createElement("template");we.content&&we.content.ownerDocument&&(n=we.content.ownerDocument)}let q,I="",{implementation:P,createNodeIterator:U,createDocumentFragment:X,getElementsByTagName:oe}=n,{importNode:N}=r,G=td();t.isSupported=typeof nd=="function"&&typeof V=="function"&&P&&P.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:W,ERB_EXPR:Q,TMPLIT_EXPR:Ee,DATA_ATTR:ke,ARIA_ATTR:ue,IS_SCRIPT_OR_DATA:F,ATTR_WHITESPACE:$e,CUSTOM_ELEMENT:Se}=ed,{IS_ALLOWED_URI:E}=ed,ne=null,he=pt({},[...Xu,...La,...Ia,...Da,...Qu]),fe=null,Oe=pt({},[...Zu,...Ma,...Ju,...ri]),de=Object.seal(Pa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),De=null,tt=null,st=Object.seal(Pa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),M=!0,le=!0,se=!1,pe=!0,xe=!1,ie=!0,qe=!1,Ge=!1,Xe=!1,Pe=!1,Y=!1,B=!1,Ne=!0,at=!1,Qe="user-content-",y=!0,z=!1,Te={},Re=null,Fe=pt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ye=null,dt=pt({},["audio","video","img","source","image","track"]),vt=null,Lt=pt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),St="http://www.w3.org/1998/Math/MathML",ht="http://www.w3.org/2000/svg",Be="http://www.w3.org/1999/xhtml",D=Be,te=!1,be=null,R=pt({},[St,ht,Be],Ra),K=pt({},["mi","mo","mn","ms","mtext"]),Ie=pt({},["annotation-xml"]),We=pt({},["title","style","font","a","script"]),Me=null,Je=["application/xhtml+xml","text/html"],Le="text/html",ze=null,Ze=null,ft=n.createElement("form"),He=function(T){return T instanceof RegExp||T instanceof Function},kt=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ze&&Ze===T)){if((!T||typeof T!="object")&&(T={}),T=Hn(T),Me=Je.indexOf(T.PARSER_MEDIA_TYPE)===-1?Le:T.PARSER_MEDIA_TYPE,ze=Me==="application/xhtml+xml"?Ra:oi,ne=wn(T,"ALLOWED_TAGS")?pt({},T.ALLOWED_TAGS,ze):he,fe=wn(T,"ALLOWED_ATTR")?pt({},T.ALLOWED_ATTR,ze):Oe,be=wn(T,"ALLOWED_NAMESPACES")?pt({},T.ALLOWED_NAMESPACES,Ra):R,vt=wn(T,"ADD_URI_SAFE_ATTR")?pt(Hn(Lt),T.ADD_URI_SAFE_ATTR,ze):Lt,Ye=wn(T,"ADD_DATA_URI_TAGS")?pt(Hn(dt),T.ADD_DATA_URI_TAGS,ze):dt,Re=wn(T,"FORBID_CONTENTS")?pt({},T.FORBID_CONTENTS,ze):Fe,De=wn(T,"FORBID_TAGS")?pt({},T.FORBID_TAGS,ze):Hn({}),tt=wn(T,"FORBID_ATTR")?pt({},T.FORBID_ATTR,ze):Hn({}),Te=wn(T,"USE_PROFILES")?T.USE_PROFILES:!1,M=T.ALLOW_ARIA_ATTR!==!1,le=T.ALLOW_DATA_ATTR!==!1,se=T.ALLOW_UNKNOWN_PROTOCOLS||!1,pe=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,xe=T.SAFE_FOR_TEMPLATES||!1,ie=T.SAFE_FOR_XML!==!1,qe=T.WHOLE_DOCUMENT||!1,Pe=T.RETURN_DOM||!1,Y=T.RETURN_DOM_FRAGMENT||!1,B=T.RETURN_TRUSTED_TYPE||!1,Xe=T.FORCE_BODY||!1,Ne=T.SANITIZE_DOM!==!1,at=T.SANITIZE_NAMED_PROPS||!1,y=T.KEEP_CONTENT!==!1,z=T.IN_PLACE||!1,E=T.ALLOWED_URI_REGEXP||rd,D=T.NAMESPACE||Be,K=T.MATHML_TEXT_INTEGRATION_POINTS||K,Ie=T.HTML_INTEGRATION_POINTS||Ie,de=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&He(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(de.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&He(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(de.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(de.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),xe&&(le=!1),Y&&(Pe=!0),Te&&(ne=pt({},Qu),fe=[],Te.html===!0&&(pt(ne,Xu),pt(fe,Zu)),Te.svg===!0&&(pt(ne,La),pt(fe,Ma),pt(fe,ri)),Te.svgFilters===!0&&(pt(ne,Ia),pt(fe,Ma),pt(fe,ri)),Te.mathMl===!0&&(pt(ne,Da),pt(fe,Ju),pt(fe,ri))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?st.tagCheck=T.ADD_TAGS:(ne===he&&(ne=Hn(ne)),pt(ne,T.ADD_TAGS,ze))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?st.attributeCheck=T.ADD_ATTR:(fe===Oe&&(fe=Hn(fe)),pt(fe,T.ADD_ATTR,ze))),T.ADD_URI_SAFE_ATTR&&pt(vt,T.ADD_URI_SAFE_ATTR,ze),T.FORBID_CONTENTS&&(Re===Fe&&(Re=Hn(Re)),pt(Re,T.FORBID_CONTENTS,ze)),y&&(ne["#text"]=!0),qe&&pt(ne,["html","head","body"]),ne.table&&(pt(ne,["tbody"]),delete De.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw Po('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Po('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=T.TRUSTED_TYPES_POLICY,I=q.createHTML("")}else q===void 0&&(q=Tg(m,o)),q!==null&&typeof I=="string"&&(I=q.createHTML(""));nn&&nn(T),Ze=T}},Nt=pt({},[...La,...Ia,...hg]),nt=pt({},[...Da,...bg]),Tt=function(T){let ee=V(T);(!ee||!ee.tagName)&&(ee={namespaceURI:D,tagName:"template"});let v=oi(T.tagName),p=oi(ee.tagName);return be[T.namespaceURI]?T.namespaceURI===ht?ee.namespaceURI===Be?v==="svg":ee.namespaceURI===St?v==="svg"&&(p==="annotation-xml"||K[p]):!!Nt[v]:T.namespaceURI===St?ee.namespaceURI===Be?v==="math":ee.namespaceURI===ht?v==="math"&&Ie[p]:!!nt[v]:T.namespaceURI===Be?ee.namespaceURI===ht&&!Ie[p]||ee.namespaceURI===St&&!K[p]?!1:!nt[v]&&(We[v]||!Nt[v]):!!(Me==="application/xhtml+xml"&&be[T.namespaceURI]):!1},xt=function(T){Do(t.removed,{element:T});try{V(T).removeChild(T)}catch{j(T)}},Ct=function(T,ee){try{Do(t.removed,{attribute:ee.getAttributeNode(T),from:ee})}catch{Do(t.removed,{attribute:null,from:ee})}if(ee.removeAttribute(T),T==="is")if(Pe||Y)try{xt(ee)}catch{}else try{ee.setAttribute(T,"")}catch{}},qt=function(T){let ee=null,v=null;if(Xe)T="<remove></remove>"+T;else{let A=Oa(T,/^[\r\n\t ]+/);v=A&&A[0]}Me==="application/xhtml+xml"&&D===Be&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let p=q?q.createHTML(T):T;if(D===Be)try{ee=new h().parseFromString(p,Me)}catch{}if(!ee||!ee.documentElement){ee=P.createDocument(D,"template",null);try{ee.documentElement.innerHTML=te?I:p}catch{}}let _=ee.body||ee.documentElement;return T&&v&&_.insertBefore(n.createTextNode(v),_.childNodes[0]||null),D===Be?oe.call(ee,qe?"html":"body")[0]:qe?ee.documentElement:_},an=function(T){return U.call(T.ownerDocument||T,T,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Bt=function(T){return T instanceof f&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},Ut=function(T){return typeof l=="function"&&T instanceof l};function It(we,T,ee){ni(we,v=>{v.call(t,T,ee,Ze)})}let Pt=function(T){let ee=null;if(It(G.beforeSanitizeElements,T,null),Bt(T))return xt(T),!0;let v=ze(T.nodeName);if(It(G.uponSanitizeElement,T,{tagName:v,allowedTags:ne}),ie&&T.hasChildNodes()&&!Ut(T.firstElementChild)&&tn(/<[/\w!]/g,T.innerHTML)&&tn(/<[/\w!]/g,T.textContent)||T.nodeType===qo.progressingInstruction||ie&&T.nodeType===qo.comment&&tn(/<[/\w]/g,T.data))return xt(T),!0;if(!(st.tagCheck instanceof Function&&st.tagCheck(v))&&(!ne[v]||De[v])){if(!De[v]&&zt(v)&&(de.tagNameCheck instanceof RegExp&&tn(de.tagNameCheck,v)||de.tagNameCheck instanceof Function&&de.tagNameCheck(v)))return!1;if(y&&!Re[v]){let p=V(T)||T.parentNode,_=ae(T)||T.childNodes;if(_&&p){let A=_.length;for(let L=A-1;L>=0;--L){let Z=O(_[L],!0);Z.__removalCount=(T.__removalCount||0)+1,p.insertBefore(Z,H(T))}}}return xt(T),!0}return T instanceof a&&!Tt(T)||(v==="noscript"||v==="noembed"||v==="noframes")&&tn(/<\/no(script|embed|frames)/i,T.innerHTML)?(xt(T),!0):(xe&&T.nodeType===qo.text&&(ee=T.textContent,ni([W,Q,Ee],p=>{ee=Mo(ee,p," ")}),T.textContent!==ee&&(Do(t.removed,{element:T.cloneNode()}),T.textContent=ee)),It(G.afterSanitizeElements,T,null),!1)},Zt=function(T,ee,v){if(Ne&&(ee==="id"||ee==="name")&&(v in n||v in ft))return!1;if(!(le&&!tt[ee]&&tn(ke,ee))){if(!(M&&tn(ue,ee))){if(!(st.attributeCheck instanceof Function&&st.attributeCheck(ee,T))){if(!fe[ee]||tt[ee]){if(!(zt(T)&&(de.tagNameCheck instanceof RegExp&&tn(de.tagNameCheck,T)||de.tagNameCheck instanceof Function&&de.tagNameCheck(T))&&(de.attributeNameCheck instanceof RegExp&&tn(de.attributeNameCheck,ee)||de.attributeNameCheck instanceof Function&&de.attributeNameCheck(ee,T))||ee==="is"&&de.allowCustomizedBuiltInElements&&(de.tagNameCheck instanceof RegExp&&tn(de.tagNameCheck,v)||de.tagNameCheck instanceof Function&&de.tagNameCheck(v))))return!1}else if(!vt[ee]){if(!tn(E,Mo(v,$e,""))){if(!((ee==="src"||ee==="xlink:href"||ee==="href")&&T!=="script"&&fg(v,"data:")===0&&Ye[T])){if(!(se&&!tn(F,Mo(v,$e,"")))){if(v)return!1}}}}}}}return!0},zt=function(T){return T!=="annotation-xml"&&Oa(T,Se)},wt=function(T){It(G.beforeSanitizeAttributes,T,null);let{attributes:ee}=T;if(!ee||Bt(T))return;let v={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},p=ee.length;for(;p--;){let _=ee[p],{name:A,namespaceURI:L,value:Z}=_,ce=ze(A),me=Z,ge=A==="value"?me:_g(me);if(v.attrName=ce,v.attrValue=ge,v.keepAttr=!0,v.forceKeepAttr=void 0,It(G.uponSanitizeAttribute,T,v),ge=v.attrValue,at&&(ce==="id"||ce==="name")&&(Ct(A,T),ge=Qe+ge),ie&&tn(/((--!?|])>)|<\/(style|title|textarea)/i,ge)){Ct(A,T);continue}if(ce==="attributename"&&Oa(ge,"href")){Ct(A,T);continue}if(v.forceKeepAttr)continue;if(!v.keepAttr){Ct(A,T);continue}if(!pe&&tn(/\/>/i,ge)){Ct(A,T);continue}xe&&ni([W,Q,Ee],ut=>{ge=Mo(ge,ut," ")});let it=ze(T.nodeName);if(!Zt(it,ce,ge)){Ct(A,T);continue}if(q&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!L)switch(m.getAttributeType(it,ce)){case"TrustedHTML":{ge=q.createHTML(ge);break}case"TrustedScriptURL":{ge=q.createScriptURL(ge);break}}if(ge!==me)try{L?T.setAttributeNS(L,A,ge):T.setAttribute(A,ge),Bt(T)?xt(T):Vu(t.removed)}catch{Ct(A,T)}}It(G.afterSanitizeAttributes,T,null)},Xt=function we(T){let ee=null,v=an(T);for(It(G.beforeSanitizeShadowDOM,T,null);ee=v.nextNode();)It(G.uponSanitizeShadowNode,ee,null),Pt(ee),wt(ee),ee.content instanceof s&&we(ee.content);It(G.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(we){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ee=null,v=null,p=null,_=null;if(te=!we,te&&(we="<!-->"),typeof we!="string"&&!Ut(we))if(typeof we.toString=="function"){if(we=we.toString(),typeof we!="string")throw Po("dirty is not a string, aborting")}else throw Po("toString is not a function");if(!t.isSupported)return we;if(Ge||kt(T),t.removed=[],typeof we=="string"&&(z=!1),z){if(we.nodeName){let Z=ze(we.nodeName);if(!ne[Z]||De[Z])throw Po("root node is forbidden and cannot be sanitized in-place")}}else if(we instanceof l)ee=qt("<!---->"),v=ee.ownerDocument.importNode(we,!0),v.nodeType===qo.element&&v.nodeName==="BODY"||v.nodeName==="HTML"?ee=v:ee.appendChild(v);else{if(!Pe&&!xe&&!qe&&we.indexOf("<")===-1)return q&&B?q.createHTML(we):we;if(ee=qt(we),!ee)return Pe?null:B?I:""}ee&&Xe&&xt(ee.firstChild);let A=an(z?we:ee);for(;p=A.nextNode();)Pt(p),wt(p),p.content instanceof s&&Xt(p.content);if(z)return we;if(Pe){if(Y)for(_=X.call(ee.ownerDocument);ee.firstChild;)_.appendChild(ee.firstChild);else _=ee;return(fe.shadowroot||fe.shadowrootmode)&&(_=N.call(r,_,!0)),_}let L=qe?ee.outerHTML:ee.innerHTML;return qe&&ne["!doctype"]&&ee.ownerDocument&&ee.ownerDocument.doctype&&ee.ownerDocument.doctype.name&&tn(od,ee.ownerDocument.doctype.name)&&(L="<!DOCTYPE "+ee.ownerDocument.doctype.name+`>
`+L),xe&&ni([W,Q,Ee],Z=>{L=Mo(L,Z," ")}),q&&B?q.createHTML(L):L},t.setConfig=function(){let we=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};kt(we),Ge=!0},t.clearConfig=function(){Ze=null,Ge=!1},t.isValidAttribute=function(we,T,ee){Ze||kt({});let v=ze(we),p=ze(T);return Zt(v,p,ee)},t.addHook=function(we,T){typeof T=="function"&&Do(G[we],T)},t.removeHook=function(we,T){if(T!==void 0){let ee=dg(G[we],T);return ee===-1?void 0:pg(G[we],ee,1)[0]}return Vu(G[we])},t.removeHooks=function(we){G[we]=[]},t.removeAllHooks=function(){G=td()},t}var id=sd();var Gn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},si=e=>(...t)=>({_$litDirective$:e,values:t}),Qr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Fo=class extends Qr{constructor(t){if(super(t),this.it=Rt,t.type!==Gn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Rt||t==null)return this._t=void 0,this.it=t;if(t===mn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Fo.directiveName="unsafeHTML",Fo.resultType=1;var ad=si(Fo);function Ua(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kr=Ua();function _d(e){kr=e}var Wo={exec:()=>null};function gt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(on.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Cg=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),on={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Rg=/^(?:[ \t]*(?:\n|$))+/,Og=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Lg=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,zo=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ig=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Wa=/(?:[*+-]|\d{1,9}[.)])/,md=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,gd=gt(md).replace(/bull/g,Wa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Dg=gt(md).replace(/bull/g,Wa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),za=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Mg=/^[^\n]+/,Ha=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Pg=gt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ha).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ng=gt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Wa).getRegex(),di="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ga=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,qg=gt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ga).replace("tag",di).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),hd=gt(za).replace("hr",zo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",di).getRegex(),Fg=gt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",hd).getRegex(),Ka={blockquote:Fg,code:Og,def:Pg,fences:Lg,heading:Ig,hr:zo,html:qg,lheading:gd,list:Ng,newline:Rg,paragraph:hd,table:Wo,text:Mg},ld=gt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",zo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",di).getRegex(),jg={...Ka,lheading:Dg,table:ld,paragraph:gt(za).replace("hr",zo).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ld).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",di).getRegex()},Bg={...Ka,html:gt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ga).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Wo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:gt(za).replace("hr",zo).replace("heading",` *#{1,6} *[^
]`).replace("lheading",gd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ug=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Wg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,bd=/^( {2,}|\\)\n(?!\s*$)/,zg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,pi=/[\p{P}\p{S}]/u,Ya=/[\s\p{P}\p{S}]/u,yd=/[^\s\p{P}\p{S}]/u,Hg=gt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ya).getRegex(),vd=/(?!~)[\p{P}\p{S}]/u,Gg=/(?!~)[\s\p{P}\p{S}]/u,Kg=/(?:[^\s\p{P}\p{S}]|~)/u,Yg=gt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Cg?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),wd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Vg=gt(wd,"u").replace(/punct/g,pi).getRegex(),Xg=gt(wd,"u").replace(/punct/g,vd).getRegex(),kd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Qg=gt(kd,"gu").replace(/notPunctSpace/g,yd).replace(/punctSpace/g,Ya).replace(/punct/g,pi).getRegex(),Zg=gt(kd,"gu").replace(/notPunctSpace/g,Kg).replace(/punctSpace/g,Gg).replace(/punct/g,vd).getRegex(),Jg=gt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,yd).replace(/punctSpace/g,Ya).replace(/punct/g,pi).getRegex(),eh=gt(/\\(punct)/,"gu").replace(/punct/g,pi).getRegex(),th=gt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),nh=gt(Ga).replace("(?:-->|$)","-->").getRegex(),rh=gt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",nh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),li=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,oh=gt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",li).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),$d=gt(/^!?\[(label)\]\[(ref)\]/).replace("label",li).replace("ref",Ha).getRegex(),xd=gt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ha).getRegex(),sh=gt("reflink|nolink(?!\\()","g").replace("reflink",$d).replace("nolink",xd).getRegex(),cd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Va={_backpedal:Wo,anyPunctuation:eh,autolink:th,blockSkip:Yg,br:bd,code:Wg,del:Wo,emStrongLDelim:Vg,emStrongRDelimAst:Qg,emStrongRDelimUnd:Jg,escape:Ug,link:oh,nolink:xd,punctuation:Hg,reflink:$d,reflinkSearch:sh,tag:rh,text:zg,url:Wo},ih={...Va,link:gt(/^!?\[(label)\]\((.*?)\)/).replace("label",li).getRegex(),reflink:gt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",li).getRegex()},Fa={...Va,emStrongRDelimAst:Zg,emStrongLDelim:Xg,url:gt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",cd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:gt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",cd).getRegex()},ah={...Fa,br:gt(bd).replace("{2,}","*").getRegex(),text:gt(Fa.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ii={normal:Ka,gfm:jg,pedantic:Bg},jo={normal:Va,gfm:Fa,breaks:ah,pedantic:ih},lh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ud=e=>lh[e];function Kn(e,t){if(t){if(on.escapeTest.test(e))return e.replace(on.escapeReplace,ud)}else if(on.escapeTestNoEncode.test(e))return e.replace(on.escapeReplaceNoEncode,ud);return e}function dd(e){try{e=encodeURI(e).replace(on.percentDecode,"%")}catch{return null}return e}function pd(e,t){let n=e.replace(on.findPipe,(s,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),r=n.split(on.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(on.slashPipe,"|");return r}function Bo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function ch(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function fd(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function uh(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var ci=class{constructor(e){$t(this,"options");$t(this,"rules");$t(this,"lexer");this.options=e||kr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Bo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=uh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Bo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Bo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Bo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let c=l.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${c}`:c,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=f,n.length===0)break;let h=s.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let m=h,k=m.raw+`
`+n.join(`
`),O=this.blockquote(k);s[s.length-1]=O,r=r.substring(0,r.length-m.raw.length)+O.raw,o=o.substring(0,o.length-m.text.length)+O.text;break}else if(h?.type==="list"){let m=h,k=m.raw+`
`+n.join(`
`),O=this.list(k);s[s.length-1]=O,r=r.substring(0,r.length-h.raw.length)+O.raw,o=o.substring(0,o.length-m.raw.length)+O.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,c="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,O=>" ".repeat(3*O.length)),h=e.split(`
`,1)[0],m=!f.trim(),k=0;if(this.options.pedantic?(k=2,d=f.trimStart()):m?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=f.slice(k),k+=t[1].length),m&&this.rules.other.blankLine.test(h)&&(c+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let O=this.rules.other.nextBulletRegex(k),j=this.rules.other.hrRegex(k),H=this.rules.other.fencesBeginRegex(k),ae=this.rules.other.headingBeginRegex(k),V=this.rules.other.htmlBeginRegex(k);for(;e;){let q=e.split(`
`,1)[0],I;if(h=q,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),I=h):I=h.replace(this.rules.other.tabCharGlobal,"    "),H.test(h)||ae.test(h)||V.test(h)||O.test(h)||j.test(h))break;if(I.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+I.slice(k);else{if(m||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||H.test(f)||ae.test(f)||j.test(f))break;d+=`
`+h}!m&&!h.trim()&&(m=!0),c+=q+`
`,e=e.substring(q.length+1),f=I.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),o.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=c}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let d={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let c=a.tokens.filter(f=>f.type==="space"),d=c.length>0&&c.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=pd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(pd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Bo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=ch(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),fd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return fd(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,c=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+o);(r=c.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=f.slice(1,-1);return{type:"em",raw:f,text:m,tokens:this.lexer.inlineTokens(m)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},kn=class ja{constructor(t){$t(this,"tokens");$t(this,"options");$t(this,"state");$t(this,"inlineQueue");$t(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||kr,this.options.tokenizer=this.options.tokenizer||new ci,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:on,block:ii.normal,inline:jo.normal};this.options.pedantic?(n.block=ii.pedantic,n.inline=jo.pedantic):this.options.gfm&&(n.block=ii.gfm,this.options.breaks?n.inline=jo.breaks:n.inline=jo.gfm),this.tokenizer.rules=n}static get rules(){return{block:ii,inline:jo}}static lex(t,n){return new ja(n).lex(t)}static lexInline(t,n){return new ja(n).inlineTokens(t)}lex(t){t=t.replace(on.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(on.tabCharGlobal,"    ").replace(on.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let c=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(m=>{h=m.call({lexer:this},f),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(c=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(c)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},ui=class{constructor(e){$t(this,"options");$t(this,"parser");this.options=e||kr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(on.notSpaceStart)?.[0],o=e.replace(on.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Kn(r)+'">'+(n?o:Kn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Kn(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Kn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=dd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Kn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=dd(e);if(o===null)return Kn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Kn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Kn(e.text)}},Xa=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},$n=class Ba{constructor(t){$t(this,"options");$t(this,"renderer");$t(this,"textRenderer");this.options=t||kr,this.options.renderer=this.options.renderer||new ui,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Xa}static parse(t,n){return new Ba(n).parse(t)}static parseInline(t,n){return new Ba(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ai,Uo=(ai=class{constructor(e){$t(this,"options");$t(this,"block");this.options=e||kr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?kn.lex:kn.lexInline}provideParser(){return this.block?$n.parse:$n.parseInline}},$t(ai,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),$t(ai,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ai),dh=class{constructor(...e){$t(this,"defaults",Ua());$t(this,"options",this.setOptions);$t(this,"parse",this.parseMarkdown(!0));$t(this,"parseInline",this.parseMarkdown(!1));$t(this,"Parser",$n);$t(this,"Renderer",ui);$t(this,"TextRenderer",Xa);$t(this,"Lexer",kn);$t(this,"Tokenizer",ci);$t(this,"Hooks",Uo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new ui(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...c)=>{let d=l.apply(o,c);return d===!1&&(d=a.apply(o,c)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new ci(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...c)=>{let d=l.apply(o,c);return d===!1&&(d=a.apply(o,c)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Uo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Uo.passThroughHooks.has(s)?o[i]=c=>{if(this.defaults.async&&Uo.passThroughHooksRespectAsync.has(s))return(async()=>{let f=await l.call(o,c);return a.call(o,f)})();let d=l.call(o,c);return a.call(o,d)}:o[i]=(...c)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,c);return f===!1&&(f=await a.apply(o,c)),f})();let d=l.apply(o,c);return d===!1&&(d=a.apply(o,c)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return kn.lex(e,t??this.defaults)}parser(e,t){return $n.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?kn.lex:kn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let c=await(o.hooks?await o.hooks.provideParser():e?$n.parse:$n.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(c):c})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?kn.lex:kn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?$n.parse:$n.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Kn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},wr=new dh;function yt(e,t){return wr.parse(e,t)}yt.options=yt.setOptions=function(e){return wr.setOptions(e),yt.defaults=wr.defaults,_d(yt.defaults),yt};yt.getDefaults=Ua;yt.defaults=kr;yt.use=function(...e){return wr.use(...e),yt.defaults=wr.defaults,_d(yt.defaults),yt};yt.walkTokens=function(e,t){return wr.walkTokens(e,t)};yt.parseInline=wr.parseInline;yt.Parser=$n;yt.parser=$n.parse;yt.Renderer=ui;yt.TextRenderer=Xa;yt.Lexer=kn;yt.lexer=kn.lex;yt.Tokenizer=ci;yt.Hooks=Uo;yt.parse=yt;var b$=yt.options,y$=yt.setOptions,v$=yt.use,w$=yt.walkTokens,k$=yt.parseInline;var $$=$n.parse,x$=kn.lex;function or(e){let t=yt.parse(e),n=id.sanitize(t);return ad(n)}function Yn(e,t){return u`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Zr(e){return e.loading?u`<div class="prompt-block__status">불러오는 중…</div>`:e.error?u`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function fi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Sd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ph={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},fh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,_h=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function xn(e){return!!e&&typeof e=="object"}function Qa(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Za(e,t){let n=Qa(e),r=Qa(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function Ed(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>xn(o)&&typeof o.text=="string"?o.text:"").join(""):xn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function mh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Sd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Qa(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=Za(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=Za(xn(l)?l.old_string:"",xn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ja(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var gh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Td(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>xn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(gh,"").trim();return n.length>0?{kind:"user",text:n}:null}function el(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=fh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:_h.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function hh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function bh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(xn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(el(i.text));else if(i.type==="thinking"){let l=Ja(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=mh(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Ad(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(xn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=Ed(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=Td(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Ad([o],n):[o]}return[]}function Ad(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function yh(e){let t=typeof e.command=="string"?e.command:"",n=Ed(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:Sd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function vh(e){if(e.type==="item.completed"&&xn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[el(t.text)];if(t.type==="user_message"){let n=Td(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Ja(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[yh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function wh(e){if(e.schema!=="codex-delegation-monitor-v1"||!xn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&xn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[el(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=Ja(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=ph[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function kh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function $h(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return xn(t)?t:null}function Cd(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=$h(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return hh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?wh(s):kh(s)?vh(s):bh(s,n);return i.length>0&&(r.progress=null),i}}}function tl(e){let t=[],n=Cd(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var xh=5,Ah=10,Sh=/Task\s+#(\d+)/,Eh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Th=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ho(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Ch(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Rh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Oh(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Sh.exec(o.output||o.result||""),c=String(s.activeForm||s.subject||"").trim();if(!a||c.length===0)continue;t.set(a[1],{label:c,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Lh(e){if(e.tool==="Bash"){let t=e.command||"";return Eh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Th.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ih(e){let t=e.filter(o=>o.kind==="tool").slice(-Ah),n=new Map;t.forEach((o,s)=>{let i=Lh(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Dh(e){let t=Rh(e);if(t)return{text:t,guess:!1};let n=Oh(e);if(n)return{text:n,guess:!1};let r=Ih(e);return r?{text:r,guess:!0}:null}function Mh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:Jt(e,t)}function Jr(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,c=null,d=!1,f={},h=!0,m=new Set,k=new Set,O=null,j=null,H=!1,ae=!1,V=!1,q=null,I=null;function P(){H=!1,ae=!1,V=!1,q=null,I=null}async function U(Y){if(n){ae=!0,V=!1,De();try{let B=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Y,...c?{root_dir:c}:{}}));if(s!==Y)return;!B||typeof B!="object"||Array.isArray(B)?V=!0:(q=B,I=Y)}catch{s===Y&&(V=!0)}finally{s===Y&&(ae=!1,De())}}}function X(){if(H=!H,H&&s&&I!==s){U(s);return}De()}function oe(){if(!H)return"";let Y=Zr({loading:ae,error:V});if(Y)return u`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!q)return"";if(q.missing)return u`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let B=fi(q.recorded_at);return u`<div class="sv__prompt" data-seam="attempt-prompt">
      ${B?u`<div class="prompt-block__meta">${B} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?Yn("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?Yn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function N(){if(!a||!r)return[];let Y=r.get(a);return tl(Y?Y.lines:[])}function G(){if(!a||!r)return null;let Y=r.get(a),B=Y?Y.last_event_at:null;return typeof B=="number"?B:null}function W(){return f.status==="running"}function Q(){if(W()&&s){j||(j=setInterval(()=>De(),1e3));return}Ee()}function Ee(){j&&(clearInterval(j),j=null)}function ke(Y){let B=[],Ne=0;for(;Ne<Y.length;){let{idx:at,line:Qe}=Y[Ne];if(Qe.kind==="tool"){let y=Ne;for(;y<Y.length&&Y[y].line.kind==="tool"&&Y[y].line.tool===Qe.tool;)y+=1;if(y-Ne>=xh&&!k.has(at)){B.push({kind:"group",idx:at,tool:Qe.tool||"",lines:Y.slice(Ne,y)}),Ne=y;continue}}B.push({kind:"line",idx:at,line:Qe}),Ne+=1}return B}function ue(Y){let B=[],Ne=new Map;for(let y=0;y<Y.length;y+=1){let z=Y[y],Te=z.parent_tool_use_id;if(typeof Te=="string"&&Te.length>0){let Re=Ne.get(Te);Re||(Re={kind:"subagent",idx:y,launch_id:Te,agent_type:null,header:null,lines:[]},Ne.set(Te,Re),B.push(Re)),Re.lines.push({idx:y,line:z});continue}if(z.kind==="tool"&&z.tool==="Agent"&&typeof z.launch_id=="string"&&z.launch_id.length>0){let Re=F(z),Fe=Ne.get(z.launch_id);if(Fe){Fe.header={idx:y,line:z},Fe.agent_type=Re;continue}let Ye={kind:"subagent",idx:y,launch_id:z.launch_id,agent_type:Re,header:{idx:y,line:z},lines:[]};Ne.set(z.launch_id,Ye),B.push(Ye);continue}B.push({kind:"entry",idx:y,line:z})}let at=[],Qe=0;for(;Qe<B.length;){if(B[Qe].kind!=="entry"){at.push(B[Qe]),Qe+=1;continue}let y=Qe;for(;y<B.length&&B[y].kind==="entry";)y+=1;at.push(...ke(B.slice(Qe,y))),Qe=y}return at}function F(Y){let B=Y.input;return B&&typeof B.subagent_type=="string"?B.subagent_type:null}function $e(Y){for(let B=Y.length-1;B>=0;B-=1){let Ne=Y[B];if(Ne.kind==="result"||Ne.kind==="error")return null;if(Ne.kind==="tool"&&!Object.hasOwn(Ne,"result"))return Ne}return null}function Se(Y){for(let B=Y.length-1;B>=0;B-=1)if(Y[B].kind==="thinking")return Y[B];return null}function E(Y,B){if(B.kind==="gate")return u`<div class="sv__gate">${B.text}</div>`;if(B.kind==="phase")return u`<div class="sv__phase">${B.text}</div>`;if(B.kind==="result")return u`<div
        class="sv__result${B.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${B.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${or(B.text||(B.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(B.kind==="thinking"){let Ne=m.has(Y);return u`<div
        class="sv__think${Ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>st(Y)}
      >
        <span class="sv__think-line">💭 ${Ho(B.text)}</span>
        ${Ne?u`<pre class="sv__think-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="user"){let Ne=m.has(Y);return u`<div
        class="sv__line sv__line--user${Ne?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>st(Y)}
      >
        <span class="sv__user-line">▷ ${Ho(B.text)}</span>
        ${Ne?u`<pre class="sv__user-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="error")return u`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="blocker")return u`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="tool"){let Ne=m.has(Y),at=B.tool==="Bash"?Ch(B.command):0,Qe=B.tool==="Bash"?at>1?Ho(B.command):B.command:B.path||B.command||"";return u`<div
        class="sv__tool${Ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>st(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${B.icon}</span>
          <span class="sv__tool-name">${B.tool}</span>
          ${Qe?u`<span class="sv__tool-detail">${Qe}</span>`:""}
          ${at>1?u`<span class="sv__tool-more">⋯ ${at}줄</span>`:""}
          ${typeof B.added=="number"?u`<span class="sv__diff-add">+${B.added}</span>`:""}
          ${typeof B.removed=="number"?u`<span class="sv__diff-del">−${B.removed}</span>`:""}
          ${B.result?u`<span class="sv__tool-ok">→ ${B.result}</span>`:""}
        </span>
        ${Ne?u`<pre class="sv__tool-expand">${ne(B)}</pre>`:""}
      </div>`}return u`<div class="sv__as">${or(B.text||"")}</div>`}function ne(Y){let B=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)B.push(Y.command);else if(Y.input!==void 0)try{B.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&B.push(`output:
${Y.output}`),B.join(`

`)}function he(){if(!s)return u``;let Y=N(),B=(i?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Ne=f.session_id||"",at=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,Qe=W(),y=Qe?Mh(G(),Date.now()):"",z=Qe?$e(Y):null,Te=Qe?Se(Y):null,Re=Dh(Y);return u`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(i?f.role||"":s)}</span
        >
        ${Re?u`<span
              class="sv__stage${Re.guess?" sv__stage--guess":""}"
              title=${Re.text}
              >${Re.text}</span
            >`:""}
        ${Qe?u`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${y?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${y}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${y?u`<span class="sv__live-ago">${y}</span>`:""}</span
            >`:""}
        ${Ne?u`<button
              type="button"
              class="sv__session"
              title=${Ne}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ne}`}
              @click=${()=>le(Ne)}
            >
              ⧉ ${Ne.slice(0,8)}
            </button>`:""}
        ${f.resume_command?u`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>le(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${B?u`<span class="sv__meta">${B}</span>`:""}
        ${f.worktree?u`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${i||d?"":u`<button
              type="button"
              class="sv__prompt-toggle${H?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${H?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${X}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${at}
          @click=${M}
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
      ${i||d?"":oe()}
      <div class="sv__body">
        ${Y.length===0?u`<div class="sv__empty">세션 로그 없음</div>`:ue(Y).map(Fe=>Fe.kind==="subagent"?Oe(Fe):Fe.kind==="group"?fe(Fe):E(Fe.idx,Fe.line))}
      </div>
      ${z||Te?u`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${z?u`<span class="sv__now-icon">${z.icon}</span>
                  <span class="sv__now-name">${z.tool}</span>
                  <span class="sv__now-detail"
                    >${z.tool==="Bash"?Ho(z.command):z.path||z.command||""}</span
                  >`:""}
            ${Te?u`<span class="sv__now-think"
                  >💭 ${Ho(Te.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function fe(Y){return u`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>de(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Oe(Y){let B=k.has(Y.idx),Ne=Y.header?Y.header.line:null,at=Ne?Ne.is_error===!0?"\u2717":typeof Ne.result=="string"?"\u2713":"\u27F3":"",Qe=Ne&&Ne.command?Ne.command:"";return u`<div class="sv__sub${B?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>de(Y.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Y.agent_type||"subagent"}</span>
        ${Qe?u`<span class="sv__sub-detail">${Qe}</span>`:""}
        <span class="sv__sub-count">${Y.lines.length}줄</span>
        ${at?u`<span class="sv__sub-state">${at}</span>`:""}
        ${B?"":u`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${B?u`<div class="sv__sub-body">
            ${ke(Y.lines).map(y=>y.kind==="group"?fe(y):E(y.idx,y.line))}
          </div>`:""}
    </div>`}function de(Y){k.add(Y),De()}function De(){ot(he(),e),Q(),h&&tt()}function tt(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function st(Y){m.has(Y)?m.delete(Y):m.add(Y),De()}function M(){h=!h,De()}function le(Y){en(Y).then(B=>{B?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function se(Y){!s||!Y||(f={...f,...Y},De())}function pe(Y){let B=Y.target;if(!B||!B.classList||!B.classList.contains("sv__body"))return;!(B.scrollHeight-B.scrollTop-B.clientHeight<=4)&&h&&(h=!1,De())}e.addEventListener("scroll",pe,!0);function xe(Y){let B=Y.target;!B||typeof B.closest!="function"||e.contains(B)||B.closest("dialog")||B.closest(".md-viewer-root")||Pe()}let ie=!1;function qe(){ie||(document.addEventListener("mousedown",xe),ie=!0)}function Ge(){ie&&(document.removeEventListener("mousedown",xe),ie=!1)}function Xe(Y){let B=Y&&Y.attempt_id;if(!B)return;let Ne=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,at=Y.session_ref&&typeof Y.session_ref=="object"?Y.session_ref:null;if(Ne&&at)return;let Qe=a;s=B,i=Ne,l=at,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&Qe&&Qe!==a&&Promise.resolve(n("unsubscribe-session-log",{id:Qe})).catch(()=>{}),c=typeof Y.root_dir=="string"&&Y.root_dir.length>0?Y.root_dir:null,f=Y.meta||{},d=Y.hide_prompt===!0,h=!0,m.clear(),k.clear(),P(),!O&&r&&(O=r.subscribe(De)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...c?{root_dir:c}:{}})).catch(()=>{}),qe(),De()}function Pe(){let Y=a;Ge(),s=null,i=null,l=null,a=null,c=null,d=!1,m.clear(),k.clear(),P(),Ee(),n&&Y&&Promise.resolve(n("unsubscribe-session-log",{id:Y})).catch(()=>{}),ot(u``,e),o&&o()}return{open:Xe,updateMeta:se,close:Pe,isOpen(){return s!==null},destroy(){Ee(),Ge(),O&&(O(),O=null),e.removeEventListener("scroll",pe,!0),s=null,i=null,l=null,a=null,c=null,d=!1,ot(u``,e)}}}function Ph(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Nh(e){let t=e&&e.metadata||{},n=Lr(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Ph(t)?null:"plan_pending"}),r}function Rd(e,t){let n=Nh(e);return u`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?u`<div class="detail-empty">산출물 없음</div>`:u`
          ${n.map(r=>u`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${o=>t.onCopyPath(o,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?u`<span class="detail-art__badge">draft</span>`:null}
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
  `}var qh="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Fh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,jh=/^\*\*결론\*\* — (.+)$/;function _i(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==qh)return null;let n=Fh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?jh.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",c=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(c).join(`
`).trim()}}var Od=20;function Ld(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function Bh(e){return e.length>Od?`${e.slice(0,Od)}\u2026`:e}function Uh(e,t,n,r){let o=`${t.lane} ${Bh(t.identifier)}`;return u`<div class="detail-report">
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
        <span class="detail-report__time">${Ld(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?u`<div class="detail-report__body">
          ${or(t.body)}
        </div>`:""}
  </div>`}function Wh(e){return u`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ld(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${or(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Id(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,c)=>String(c.created_at||"").localeCompare(String(a.created_at||"")));return u`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?u`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?u`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:u`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let c=_i(typeof a.text=="string"?a.text:"");return c?Uh(a,c,t,o.has(a.id)):Wh(a)})}
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
  `}var{I:ox}=Rl;var Dd=e=>e.strings===void 0;var zh={},Md=(e,t=zh)=>e._$AH=t;var $r=si(class extends Qr{constructor(e){if(super(e),e.type!==Gn.PROPERTY&&e.type!==Gn.ATTRIBUTE&&e.type!==Gn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Dd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===mn||t===Rt)return t;let n=e.element,r=e.name;if(e.type===Gn.PROPERTY){if(t===n[r])return mn}else if(e.type===Gn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return mn}else if(e.type===Gn.ATTRIBUTE&&n.getAttribute(r)===t+"")return mn;return Md(e),t}});var Hh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],nl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Pd={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Gh={pin:"pin",global:"global",base:"base"};function Kh(e){return u`<span
    class=${`detail-layer-rail detail-layer-rail--${Gh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Yh(e,t,n){switch(e){case"workflow_mode":return go;case"spec_review_model":case"impl_review_model":return ho;case"plan_review_model":return $s;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return xs;case"impl_dispatch":return qc;case"impl_runtime":return ks;case"impl_model":return Hr(n,t.impl_runtime);case"impl_effort":return Gr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return mo;case"orchestration_model":return bo(n,null);case"orchestration_effort":return Gr(n,void 0,t.orchestration_model||pn).filter(r=>r!==pn);default:return[]}}function Vh(e,t){return u`<div class="detail-effective__row" data-key=${e.key}>
    ${Kh(e.source)}
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
    ${t.expanded?u`<select
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
          ${t.options.map(n=>u`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function Nd(e,t){let n=sa.flatMap(a=>a.keys),r=ia(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Hc(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return u`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let c=a.currentTarget.parentElement;t.onToggle(!c.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${Xh(s)}</span
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
    ${e.expanded?u`<div class="detail-effective__body">
          ${sa.map(a=>u`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(c=>a.keys.includes(c.key)).map(c=>{let d=bs({key:c.key,choices:Yh(c.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Vh(c,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${$r(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${a=>t.onPresetSelect(String(a.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(a=>u`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?u`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Xh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Qh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function qd(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Qh(r.exec_receipt),c=a?qn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=gs(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,m=typeof h=="number"?`PR #${h}`:"PR",k=vo(n),O=k!==null&&t.isChipOpen?.("rec")===!0,j=O?ga({rec:k},"rec"):null;return u`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?u`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?u`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${i?u`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${i}
            target="_blank"
            rel="noreferrer"
            >${m}</a
          >`:""}
      ${f?u`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${f.kind}
            title=${f.title}
            >${f.label}</span
          >`:""}
      ${c?u`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${d}${a?.effort?u`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${k?u`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${k.state}
            aria-expanded=${O?"true":"false"}
            title=${Ts(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${j?Wr(j):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Zh(s).map(H=>Jh(H,n,o,{label:H.id==="pr"?m:H.label,href:H.id==="pr"?i:""}))}
    </div>
  </section>`}function Zh(e){let n=typeof e=="string"&&Object.hasOwn(nl,e)&&nl[e]||nl.spec_backed;return Hh.filter(r=>n.includes(r.id))}var mi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Jh(e,t,n,r){let o=eb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",c=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=c?mi.stale:l?mi.on:a?mi.current:mi.none,h=tb(e,n),m=`${r.label} \xB7 ${f}${h?` \xB7 ${h}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${c?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,O=u`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?u`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${m}
      >${O}</a
    >`:u`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${O}</span
  >`}function eb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function tb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Pd,n)?Pd[n]:""}function gi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Fd(e){return gi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function jd(e,t){let n=e&&e[t];if(!gi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Fd),o=Fd(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Wd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function hi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Wd(e)}${t}`}function eo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Wd(e)}`}function nb(e,t,n){if(n!==null){let o=e==="claude"?hi:eo,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:eo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Bd(e,t){if(!gi(e)||e.state!=="usable"||!gi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Ud(e){let t=e.provider_key==="claude"?hi:eo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return u`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${nb(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?u`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>u`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?u`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":u`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function zd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return u`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Ud({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:jd(t,"claude"),selected:o,workspace_default:Bd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Ud({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:jd(t,"codex"),selected:s,workspace_default:Bd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function rb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ob(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function bi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function c(O){O.key==="Escape"&&o&&(O.preventDefault(),m())}document.addEventListener("keydown",c);function d(){return o?u`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${rb(o)}</span
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
            ${s==="loading"?u`<div class="mv__status">불러오는 중…</div>`:s==="pending"?u`<div class="mv__status">${a}</div>`:s==="error"?u`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:u`${l===null?null:u`<pre class="mv__front">
${l}</pre
                        >`}${or(i)}`}
          </div>
        </div>
      </div>
    `:u``}function f(){ot(d(),e)}async function h(O,j={}){o=O,s="loading",i="",l=null,a="",f();let H=j.workspace||(n?n():"");if(!H){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let ae="/api/doc?workspace="+encodeURIComponent(H)+"&path="+encodeURIComponent(O);try{let V=await r(ae),q=await V.json().catch(()=>({}));if(!V.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&j.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||V.status)+")",f();return}let I=ob(String(q.content||""));l=I.front,i=I.body,s="ready",f()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){o=null,ot(u``,e)}function k(){document.removeEventListener("keydown",c),m()}return{open:h,close:m,destroy:k}}var sb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Kd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",yi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],ib=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Hd(e){return typeof e=="string"&&ib.has(e)}var ab=["running","done","failed","interrupted"],lb={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function cb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function ub(e){let t=Yt(e);if(t.length>0)return t.map(o=>u`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Br(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return u`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?u`<span class="detail-usage-partial" title=${Kd}
          >부분 집계</span
        >`:""}`}function Gd(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function sl(e){if(typeof e=="number")return Go(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Go(t):""}function db(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function pb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function rl(e){return e===null||typeof e=="string"&&e.trim().length>0}function ol(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function fb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!yi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?rl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||rl(t.effort))||!(!("agent_type"in t)||rl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!ab.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!ol(t.started_at)||!ol(t.last_event_at)||!ol(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function _b(e,t,n){let o=Yt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return u`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?u`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${sl(n.completed_at)?u`<span class="detail-session__leg-time detail-session__time"
          >${sl(n.completed_at)}</span
        >`:""}
    ${o?u`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function mb(e,t,n,r){let o=e.status==="running"?null:t,i=(o?Yt({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Go(e.last_event_at):o?sl(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,db(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),c=pb(e,o);return u`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${lb[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${a}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${c.title}
      >${c.text}</span
    >
    ${l?u`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${i?u`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function gb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function hb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of s){let f=fb(d);!f||o.has(f.launch_id)||Hd(f.agent_type)||(o.add(f.launch_id),r.push(f))}r.sort((d,f)=>(d.started_at||0)-(f.started_at||0));let i={};for(let{role:d,provider:f}of yi){let h=t?t.roles[d]?.[f]:null;i[d]=h?[...h.legs]:[]}let l=yi.flatMap(({role:d})=>i[d]),a=new Set,c=[];for(let{role:d,provider:f}of yi){for(let h of r.filter(m=>m.role===d&&m.provider===f)){let m=l.find(k=>k.receipt_id===h.launch_id)||null;m&&!gb(h,m)||(m&&a.add(m.receipt_id),c.push(mb(h,m,e.attempt_id,n)))}for(let h of i[d])!a.has(h.receipt_id)&&!Hd(h.agent_type)&&c.push(_b(d,f,h))}return c}function bb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...sb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return u`<div class="detail-session__usage-detail">
    ${r.map(o=>u`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${cb(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":u`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?u`<span class="detail-session__usage-note">${Kd}</span>`:""}
  </div>`}var yb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Go(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function vb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return u`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?u`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var wb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function kb(e,t){let n=wb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return u`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Xi(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${fo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Go(e.last_event_at)}</span>
    </button>
    ${e.resume_command?u`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Yd(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,k)=>k.index-m.index)],l=i.map(m=>kb(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return u`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let c=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&c.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let O=typeof m.session_id=="string"&&m.session_id.length>0,j=c.has(m.attempt_id),H=O&&!j,ae=O?j?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return u`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!H}
      title=${ae}
      @click=${V=>{V.stopPropagation(),H&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let O=m.cause_detail,j=O&&typeof O.reason=="string"&&O.reason.length>0?typeof O.command=="string"&&O.command.length>0?`${O.reason} \xB7 ${O.command}`:O.reason:m.cause;return u`<div class="detail-session__cause" title=${j}>
      ${m.cause}
    </div>`},h=m=>{let k=Gd(ea(m));if(Yt(k).length===0&&!Br(m.usage))return"";let O=a.has(m.attempt_id);return u`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${O?"true":"false"}
      title=${O?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${j=>{j.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return u`
    <div class="detail-section-label">
      세션 이력${ub(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let k=ea(m),O=Gd(k),j=Yt(O);return u`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${yb[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${uo(m)?u`<span
                  class="detail-session__resumed"
                  title=${uo(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${hr(m)}</span>
            ${j.length>0?u`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?u`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${j.length>0?j.map(H=>u`<span
                      class="detail-session__usage"
                      title=${H.tooltip}
                      >${H.label}</span
                    >`):Br(m.usage)?u`<span class="detail-session__usage"
                    >${Br(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Go(m.started_at)}</span>
          </button>
          ${h(m)} ${d(m)} ${f(m)} ${vb(m)}
          ${a.has(m.attempt_id)&&m.usage?bb(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${hb(m,k,t)}
        </div>`})}
    </div>
  `}function Vd(e,t={}){return u`
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
    ${e.expanded?u`<div class="detail-prompt" data-seam="task-prompt">
          ${$b(e)}
        </div>`:""}
  `}function $b(e){let t=Zr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return u`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Yn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=fi(n.recorded_at);return u`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Yn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Yn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var xb=["open","in_progress","deferred","resolved","closed"],Ab=[0,1,2,3,4];function Xd(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,c=null,d=null,f={},h="",m=!1,k=[],O=!1,j={},H={claude:null,codex:null},ae=null,V=null,q=0,I=!1,P=!1,U="",X="",oe="",N="",G=!1;function W(){I=!1,P=!1,U="",X="",oe="",N="",G=!1}function Q(){H={claude:null,codex:null},ae=null,V=null,q+=1}async function Ee(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function ke(w){try{let J=await fetch(w);if(!J.ok)return null;let $=await J.json();if(!$||typeof $!="object"||!Array.isArray($.accounts))return null;let _e=$.accounts.filter(je=>je!==null&&typeof je=="object"&&!Array.isArray(je));return{accounts:_e,active:_e.find(je=>je.active===!0)||null}}catch{return null}}async function ue(w){V=w;let J=++q,[$,_e,je]=await Promise.all([ke("/api/claude-usage"),ke("/api/codex-usage"),Ee()]);J!==q||w!==c||(H={claude:$,codex:_e},ae=je,rt())}let F=[],$e=null,Se=null,E=!1,ne="",he=!1,fe=0,Oe=new Set;function de(){F=[],$e=null,Se=null,E=!1,ne="",he=!1,fe+=1,Oe.clear()}async function De(w){if(!o)return;let J=++fe;try{let $=await Promise.resolve(o("get-comments",{id:w}));if(J!==fe||w!==c)return;F=Array.isArray($)?$:[],E=!1}catch{if(J!==fe||w!==c)return;E=!0}rt()}function tt(){if(!o||!c)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if($e!==c){$e=c,Se=w,De(c);return}w!==null&&w!==Se&&(Se=w,De(c))}function st(w){Oe.has(w)?Oe.delete(w):Oe.add(w),rt()}function M(w){let J=ne.trim().length===0;ne=w,J!==(w.trim().length===0)&&rt()}async function le(){let w=ne.trim();if(!o||!c||w.length===0||he)return;let J=c;he=!0,rt();let $=!1;try{let _e=await Promise.resolve(o("add-comment",{id:J,text:w}));Array.isArray(_e)&&_e.length>0&&($=!0,J===c&&(F=_e,E=!1,ne="",Se=_e.length))}catch{$=!1}$||ve("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),J===c&&(he=!1),rt()}let se={onToggle:st,onDraftInput:M,onSubmit:le},pe=t.mdViewer||null,xe=null;pe||(xe=document.createElement("div"),xe.className="md-viewer-root",document.body.appendChild(xe));let ie=pe||bi(xe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),qe=document.createElement("div");qe.className="session-log-root",document.body.appendChild(qe);let Ge=Jr(qe,{transport:o?(w,J)=>Promise.resolve(o(w,J)):void 0,sessionLogStore:a}),Xe=!1,Pe=!1,Y=!1,B=null,Ne=null,at=0;function Qe(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function y(){Xe=!1,Pe=!1,Y=!1,B=null,Ne=null,at+=1}async function z(w){if(!o)return;let J=++at;Pe=!0,Y=!1,rt();try{let $=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if(J!==at)return;!$||typeof $!="object"||Array.isArray($)?Y=!0:(B=$,Ne=Qe(w))}catch{J===at&&(Y=!0)}finally{J===at&&(Pe=!1,rt())}}let Te=[],Re=null,Fe=0;function Ye(w,J){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${J}`}function dt(){Te=[],Re=null,Fe+=1}async function vt(w,J){if(!o)return;let $=++Fe,_e;try{_e=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{_e=null}$!==Fe||J!==Re||(Te=_e&&Array.isArray(_e.sessions)?_e.sessions:[],rt())}function Lt(){if(!o||!c)return;let w=d&&d.metadata,J=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if(J===null){dt();return}let $=Ye(c,J);Re!==$&&(Te=[],Re=$,vt(c,$))}function St(){if(Xe=!Xe,Xe&&c&&Ne!==Qe(c)){B=null,z(c);return}rt()}function ht(){if(!i||!c)return[];let w=i.get();return(w&&w.attempts?Object.values(w.attempts):[]).filter($=>$&&$.bead_id===c).sort(($,_e)=>(_e.started_at||0)-($.started_at||0)).map($=>({attempt_id:$.attempt_id,bead_id:$.bead_id,status:$.status,started_at:typeof $.started_at=="number"?$.started_at:null,runner:$.runner||null,model:$.model||null,effort:$.effort||$.observed_effort||null,speed:$.speed||null,session_id:$.session_id||null,resumed_from:$.resumed_from||null,continuation_mode:$.continuation_mode||null,dismissed_at:typeof $.dismissed_at=="number"?$.dismissed_at:null,cause:typeof $.cause=="string"?$.cause:null,cause_detail:$.cause_detail||null,exec_default_preset_id:typeof $.exec_default_preset_id=="string"?$.exec_default_preset_id:null,exec_default_preset_revision:typeof $.exec_default_preset_revision=="number"?$.exec_default_preset_revision:null,exec_values:$.exec_values&&typeof $.exec_values=="object"?$.exec_values:null,usage:$.usage||null,usage_legs:Array.isArray($.usage_legs)?$.usage_legs:[],delegation_sessions:Array.isArray($.delegation_sessions)?$.delegation_sessions:[]}))}function Be(){if(!i||!c)return null;let w=i.get();return Bn(w&&w.attempts||{},c)}let D=new Set;function te(w){D.has(w)?D.delete(w):D.add(w),rt()}function be(w){let J=i?i.get():null,$=J&&J.attempts?J.attempts[w]:null;Ge.open({attempt_id:w,meta:$?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}})}function R(w,J){let $=i?i.get():null,_e=$&&$.attempts?$.attempts[w]:null,et=(_e&&Array.isArray(_e.delegation_sessions)?_e.delegation_sessions:[]).find(mt=>mt&&typeof mt=="object"&&mt.launch_id===J);et&&Ge.open({attempt_id:w,launch_id:J,meta:{runner:et.provider==="claude"?"claude":"codex",role:et.role,...typeof et.agent_type=="string"?{agent_type:et.agent_type}:{},model:et.model,effort:et.effort,session_id:et.session_id,status:et.status}})}async function K(w){if(!o||!w)return;let J=await qr();if(J===null)return;let $=()=>{let mt=i?i.get():null;return mt&&typeof mt.revision=="number"?mt.revision:0},_e=async(mt={},Ve=$())=>await o("worker-attempt-resume",{attempt_id:w,expected_revision:Ve,...J!==""?{instructions:J}:{},...mt}),je=mt=>{mt?.queue&&i?.set&&i.set(mt.queue)},et=await _e();if(je(et),et&&et.conflict){let mt=et.queue&&typeof et.queue.revision=="number"?et.queue.revision:$();et=await _e({},mt),je(et)}et=await Fn(et,(mt,Ve)=>_e({continuation:mt,decision_token:Ve}),{onResult:je,refresh:()=>_e()}),et&&et.resumed===!1&&!et.conflict&&et.reason&&ve(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${et.reason}`,"error",2400)}function Ie(w){!w||!c||Ge.open(Fr(w,c,d&&d.status))}let We={onOpen:be,onOpenDelegation:R,onResume:K,onToggleUsage:te,onOpenSessionRef:Ie,onCopyResumeCommand:It};function Me(){let w=i?i.get():null,J={...j};for(let $ of["orchestration_model","orchestration_effort","orchestration_speed"]){let _e=w&&w[$];typeof _e=="string"&&(J[$]=_e)}return J}async function Je(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));j=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{j={}}rt()}}function Le(){let w=i?i.get():null;return w&&w.runner_catalog||null}function ze(){let w=i?i.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function Ze(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},$=un({pin:{...w,...f},global:Me(),execution_defaults:ze(),runner_catalog:Le(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return yn(Le(),$)}function ft(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function He(w){return w?.compatible===!1}function kt(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function Nt(){let w=ft(),J=w?.presets.find($=>$.id===h);if(!(!o||!c||!w||!J||He(J)||m)){m=!0,k=[],rt();try{let $=await Promise.resolve(o("apply-impl-preset",Kc(c,J.id,w.revision)));if($&&$.conflict){kt($),ve("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let _e=$&&Array.isArray($.issue)?$.issue[0]:$?.issue;if($&&$.applied&&_e&&typeof _e=="object"){d=_e,k=Array.isArray($.skipped_orchestration_keys)?$.skipped_orchestration_keys.filter(je=>typeof je=="string"):[];for(let je of Yc)delete f[je];ve(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}$&&$.error==="bd_readback_failed"?ve("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ve("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch($){$&&typeof $=="object"&&$.code==="bd_readback_failed"?ve("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ve("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,rt()}}}let nt=null;n&&n.subscribe&&(nt=n.subscribe(()=>Ut()));let Tt=null;i&&typeof i.subscribe=="function"&&(Tt=i.subscribe(()=>{c&&rt()}));let xt=null,Ct=null;function qt(){Ct&&(Ct(),Ct=null)}l&&typeof l.subscribe=="function"&&(xt=l.subscribe(()=>{c&&rt()}));function an(w){w.key==="Escape"&&c&&(w.preventDefault(),r())}document.addEventListener("keydown",an);let Bt=Ur(()=>rt());Bt.attach();function Ut(){if(c){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+c)||[];d=w.find($=>$&&$.id===c)||w[0]||d}tt(),Lt(),rt()}}function It(w){en(w).then(J=>{J?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Pt(w){w.preventDefault(),w.stopPropagation(),c&&It(c)}function Zt(w,J){w.preventDefault(),w.stopPropagation(),It(J)}function zt(w,J,$){w.preventDefault(),w.stopPropagation(),ie.open(J,{missing_state:$})}async function wt(w,J){let $=Object.hasOwn(f,w),_e=f[w];if(f[w]=J,rt(),!(!o||!c))try{let je=await Promise.resolve(o("update-exec-settings",Gc(c,w,J.length===0?null:J))),et=Array.isArray(je)?je[0]:je;if(!et||typeof et!="object"||!et.id)throw new Error("exec settings readback failed");d=et,delete f[w],rt()}catch(je){throw $?f[w]=_e:delete f[w],rt(),ve("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),je}}function Xt(w){w.catch(()=>{})}async function we(w,J){let $=d||{},_e=$.metadata&&typeof $.metadata=="object"?$.metadata:{},je={};for(let Ve of["impl_runtime","impl_model","impl_effort"])je[Ve]=Object.hasOwn(f,Ve)?f[Ve]:typeof _e[Ve]=="string"?_e[Ve]:"";je[w]=J;let et=Qc(je,Le(),Ze()),mt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])mt[Ve]=f[Ve],f[Ve]=et[Ve]||"";if(rt(),!(!o||!c))return Promise.resolve(o("update-impl-target",{id:c,...et,orchestration_runtime:Ze()})).then(Ve=>{let ct=Array.isArray(Ve)?Ve[0]:Ve;if(!ct||typeof ct!="object"||!ct.id)throw new Error("implementation target readback failed");d=ct;for(let hn of["impl_runtime","impl_model","impl_effort"])delete f[hn];rt()}).catch(Ve=>{for(let ct of["impl_runtime","impl_model","impl_effort"])mt[ct]===void 0?delete f[ct]:f[ct]=mt[ct];throw rt(),ve("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ve})}async function T(w,J,$){if(!o||!c)return!1;try{let _e=await Promise.resolve(o(w,J)),je=Array.isArray(_e)?_e[0]:_e;return je&&typeof je=="object"&&je.id?(d=je,!0):(ve($,"error"),!1)}catch(_e){return _e&&typeof _e=="object"&&_e.code==="bd_readback_failed"?(ve("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ve($,"error"),!1)}}function ee(w){setTimeout(()=>{try{let J=e.querySelector(w);J&&typeof J.focus=="function"&&J.focus()}catch{}},0)}function v(){I=!0,U=d&&d.title||"",rt(),ee('.detail-edit__input[data-edit="title"]')}function p(w){U=w.target.value}function _(){I=!1,U="",rt()}function A(){T("edit-text",{id:c,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(J=>{J===!0&&(I=!1,U=""),rt()})}function L(){P=!0,X=d&&d.description||"",rt(),ee('.detail-edit__textarea[data-edit="description"]')}function Z(w){X=w.target.value}function ce(){P=!1,X="",rt()}function me(){T("edit-text",{id:c,field:"description",value:X},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(J=>{J===!0&&(P=!1,X=""),rt()})}function ge(w,J,$,_e){if(w.key==="Escape"){w.stopPropagation(),$();return}w.key==="Enter"&&(!_e||w.ctrlKey||w.metaKey)&&(w.preventDefault(),J())}function it(w){let J=w.target.value;T("update-status",{id:c,status:J},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>rt())}function ut(w){let J=Number(w.target.value);T("update-priority",{id:c,priority:J},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>rt())}function Ht(w){oe=w.target.value}function _t(){let w=oe.trim();w.length!==0&&T("label-add",{id:c,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(J=>{J===!0&&(oe=""),rt()})}function x(w){if(w.key==="Escape"){w.stopPropagation(),oe="",rt();return}w.key==="Enter"&&(w.preventDefault(),_t())}function C(w){T("label-remove",{id:c,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>rt())}let Ae={onCopyPath:Zt,onOpenDoc:zt};function g(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function b(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function S(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function re(w,J){let $=ye(J),_e=[];return w.length>0&&_e.push(w),$&&_e.push($),_e.length>0?_e.join(`
`):void 0}function ye(w){if(!w||typeof w!="object")return;let J=typeof w.status=="string"?w.status:"",$=typeof w.title=="string"?w.title:"";return J.length>0&&$.length>0?`${J} \xB7 ${$}`:void 0}function Ce(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Ke(){return t.depCandidates?t.depCandidates():null}async function bt(w,J,$){let _e=Ce(),je=c;if(!je)return;if(_e.length===0){ve("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let et=await T(w,{a:je,b:J,view_id:je,root_dir:_e},$),mt=et===!0||et!==!1&&et.saved===!0;mt&&t.onDepChanged&&t.onDepChanged({type:w,a:je,b:J}),w==="dep-add"&&mt&&(N="",G=!1),rt()}function Ft(w){if(!c)return;let J=globalThis.confirm;typeof J=="function"&&!J(`${w}\uAC00 ${c}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||bt("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Gt(w){w.disabled||bt("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function fn(w){N=w.target.value,G=!0,rt()}function lr(){G||(G=!0,rt())}function Sn(w,J){if(w.key==="Escape"){w.stopPropagation(),N="",G=!1,rt();return}w.key==="Enter"&&(w.preventDefault(),J.length===1&&!J[0].disabled&&Gt(J[0]))}function On(w){return u`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${N}
        @focus=${lr}
        @input=${fn}
        @keydown=${J=>Sn(J,w)}
      />
      ${G||N.length>0?u`<div class="detail-dep-add__list">
            ${w.length===0?u`<div class="detail-dep-add__empty">후보 없음</div>`:w.map(J=>u`<button
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
    </div>`}function Ln(w,J){let $=J.get(w.id),_e=s?u`<button
          type="button"
          class="detail-dep__link"
          title=${Qt(w.title)}
          @click=${()=>$===void 0?s(w.id):s(w.id,$)}
        >
          ${w.label}
        </button>`:u`<span class="detail-dep__link" title=${Qt(w.title)}
          >${w.label}</span
        >`;return u`<span
      class=${`detail-dep detail-dep--${w.kind}${s?" detail-dep--link":""}`}
      >${_e}${w.kind==="pred"?u`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>Ft(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Kt(w){let J=Array.isArray(w.dependencies)?w.dependencies:[],$=Array.isArray(w.dependents)?w.dependents:[],_e=[];for(let Ve of J){let ct=g(Ve);ct.length>0&&b(Ve)==="blocks"&&_e.push({id:ct,label:`\u26D3 ${ct}`,kind:"pred",title:re("\uB9C9\uB294",Ve)})}for(let Ve of $){let ct=g(Ve);ct.length>0&&b(Ve)==="blocks"&&_e.push({id:ct,label:`\u2192 ${ct}`,kind:"succ",title:re("\uB9C9\uD788\uB294",Ve)})}for(let Ve of J){let ct=g(Ve),hn=b(Ve);if(ct.length>0&&hn!=="blocks"){let yl=S(hn);_e.push({id:ct,label:`${yl.glyph}${ct}`,kind:"other",title:re(yl.relation,Ve)})}}let je=Ke(),et=new Map;if(je)for(let Ve of je.issues)et.has(Ve.bead_id)||et.set(Ve.bead_id,Ve.root_dir);let mt=je&&c?Ku(Gu(c,je),N):[];return u`
      <div class="detail-section-label">의존성</div>
      ${_e.length===0?u`<div class="detail-empty">의존성 없음</div>`:u`<div class="detail-deps">
            ${_e.map(Ve=>Ln(Ve,et))}
          </div>`}
      ${je===null?u`<div class="detail-empty">후보를 불러올 수 없음</div>`:On(mt)}
    `}function Vn(w){let J=w.metadata||{},$=w.workflow||{},_e=$.stages||{},je=_e.spec&&_e.spec.stale,et=_e.impl&&_e.impl.stale,mt=$.quick_fix_review?.state==="stale",Ve=_e.plan||null,ct=$.route_source==="derived",hn=$.route||J.route||"\u2014";return u`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ct?" detail-kv__v--derived":""}"
          title=${ct?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ct?"unset":hn}</span
        >
      </div>
      ${$.route!=="quick_fix"||Object.hasOwn(J,"spec_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${J.spec_review||"\uC5C6\uC74C"}${je?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.route==="full_plan"?u`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ve?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ve?.approval_receipt||"\uC5C6\uC74C"}${Ve?.approval_state==="stale"?" \xB7 stale":Ve?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${$.route!=="quick_fix"||Object.hasOwn(J,"impl_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${J.impl_review||"\uC5C6\uC74C"}${et?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.resolver?u`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${$.resolver.attempt} \xB7 ${$.resolver.prior_sha} \u2192 ${$.resolver.sha}`}
              >${`${$.resolver.prior_sha.slice(0,7)} \u2192 ${$.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${$.route==="quick_fix"||Object.hasOwn(J,"quick_fix_review")?u`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${J.quick_fix_review||"\uC5C6\uC74C"}${mt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${$.planned_execution?u`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${$.planned_execution.kind}</span>
            </div>
            ${$.planned_execution.kind==="main"?u`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${$.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${$.exec_receipt?u`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${qn($.exec_receipt)}</span
            >
          </div>`:""}
      ${$.impl_entry?u`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${$.impl_entry.actor}@${$.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${J.pr_url?u`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${J.pr_url}</span>
          </div>`:""}
    `}let In={route:["quick_fix","spec_backed","full_plan"]};async function Xn(w,J){let $=J.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&$!=="full_plan"&&!window.confirm(`full_plan \u2192 ${$||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){rt();return}await T("update-workflow-meta",{id:c,key:w,value:$},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),rt()}function Dn(w){let J=w.metadata||{};return u` ${((_e,je)=>{let et=In[_e],mt=typeof J[_e]=="string"?J[_e]:"";return u`<div class="detail-kv">
        <span class="detail-kv__k">${_e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${_e}
          data-edit=${`wfmeta-${_e}`}
          @change=${Ve=>Xn(_e,Ve)}
        >
          <option value="" ?selected=${!et.includes(mt)}>
            ${je}
          </option>
          ${et.map(Ve=>u`<option value=${Ve} ?selected=${mt===Ve}>${Ve}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Mn(w,J){return I?u`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${p}
            @keydown=${$=>ge($,A,_,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${A}
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
      `:u`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${Yt(J).map($=>u`<span class="detail-usage-total" title=${$.tooltip}
              >${$.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${v}
        >
          ✎
        </button>
      </div>
    `}function cr(w){let J=Wt(w.created_at),$=Wt(w.updated_at);return!J&&!$?u``:u`
      ${J?u`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${J}</span>
          </div>`:""}
      ${$?u`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
    `}function Ue(w,J){return u`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${it}
        >
          ${xb.map($=>u`<option value=${$} ?selected=${$===w}>${$}</option>`)}
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
          ${Ab.map($=>u`<option value=${String($)} ?selected=${$===J}>
                P${$}
              </option>`)}
        </select>
      </div>
    `}function Dt(w){return u`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${P?"":u`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${L}
            >
              ✎
            </button>`}
      </div>
      ${P?u`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${X}
              @input=${Z}
              @keydown=${J=>ge(J,me,ce,!0)}
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
                @click=${ce}
              >
                취소
              </button>
            </div>
          </div>`:u`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function _n(w){let J=typeof w.notes=="string"?w.notes:"";return J.trim().length===0?u``:u`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${J}</div>
    `}function to(w){let J=Array.isArray(w.labels)?w.labels:[];return u`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${J.map($=>u`<span class="detail-label-chip"
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
            .value=${oe}
            @input=${Ht}
            @keydown=${x}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${_t}
          >
            추가
          </button>
        </span>
      </div>
    `}function Qo(){if(!c)return u``;let w=d||{},J=String(w.id||c),$=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",_e=Be(),je=w.status||"open",et=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",mt=w.description||"",Ve={...w,metadata:{...w.metadata||{},...f}};return u`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Pt}
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
          ${Mn($,_e)}
          ${qd(Ve,{onChipToggle:ct=>Bt.toggle({bead_id:J,chip_key:ct}),isChipOpen:ct=>Bt.isOpen({bead_id:J,chip_key:ct})})}
          ${Nd({metadata:Ve.metadata,workspace_values:Me(),catalog:Le(),execution_defaults:ze(),expanded:O,presets:ft()?.presets||[],preset_id:h,preset_busy:m,skipped_orchestration_keys:k},{onToggle:ct=>{O=ct,rt()},onEdit:(ct,hn)=>{if(ct==="impl_runtime"||ct==="impl_model"||ct==="impl_effort"){Xt(we(ct,hn??""));return}Xt(wt(ct,hn??""))},onPresetSelect:ct=>{h=ct,k=[],rt()},onPresetApply:()=>{Nt()}})}
          ${zd({md:Ve.metadata,catalog:H,workspace_defaults:ae,handlers:{onExecChange:(ct,hn)=>Xt(wt(ct,hn))}})}
          ${Ue(je,et)} ${cr(w)}
          ${Dt(mt)}
          ${Id(F,se,{expanded:Oe,draft:ne,sending:he,error:E})}
          ${_n(w)} ${to(w)} ${Kt(w)}
          ${Vn(w)} ${Dn(w)}
          ${Rd(w,Ae)}
          ${Vd({expanded:Xe,loading:Pe,error:Y,data:B},{onToggle:St})}
          ${Yd(ht(),We,{total:_e,expanded:D},Te)}
        </div>
      </div>
    `}function rt(){ot(Qo(),e)}return{load(w){w!==c&&(f={},h="",k=[],O=!1,W(),de(),y(),dt(),Q()),c=w,d=null,!Ct&&t.subscribeCandidates&&(Ct=t.subscribeCandidates(()=>{c&&rt()})),Ut(),Je(),V!==w&&ue(w)},clear(){c=null,d=null,f={},h="",m=!1,k=[],O=!1,W(),de(),y(),dt(),Q(),qt(),ie.close(),Ge.close(),ot(u``,e)},destroy(){nt&&(nt(),nt=null),Tt&&(Tt(),Tt=null),xt&&(xt(),xt=null),qt(),document.removeEventListener("keydown",an),Bt.detach(),pe||(ie.destroy(),xe&&xe.parentNode&&xe.parentNode.removeChild(xe)),Ge.destroy(),qe.parentNode&&qe.parentNode.removeChild(qe),c=null,d=null,Q(),h="",m=!1,k=[],de(),y(),dt(),ot(u``,e)}}}function Qd(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(c,d,f="")=>{n&&(n.textContent=c||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(o&&(h.length>0?(o.textContent=h,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Sb="(max-width: 640px)";function vi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Sb),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Eb(){return{lanes:{done:!0},areas:{}}}function Ko(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Tb(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Ko(r.lanes),areas:Ko(r.areas)}:{lanes:Ko(r),areas:{}}}catch{return null}}function Zd(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function wi(e,t=Eb()){let n={lanes:Ko(t.lanes),areas:Ko(t.areas)},r=Tb(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Zd(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Zd(e,o),i}}}function il(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function ki(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function $i(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:c,adoptQueue:d,onDragBegin:f,candidate_drop:h}=e,m=[],k=null,O=!1,j=null,H=null,ae=null;function V(){j!==null&&clearTimeout(j),j=setTimeout(()=>{j=null,O=!1},0)}function q(){return s()??null}function I(){let M=new Map,le=o();for(let se of Array.isArray(le)?le:[]){if(!se||typeof se!="object")continue;let pe=se.bead_blocked_by&&typeof se.bead_blocked_by=="object"?se.bead_blocked_by:{};for(let[xe,ie]of Object.entries(pe))Array.isArray(ie)&&M.set(xe,ki(ie));for(let xe of[...Array.isArray(se.runnable)?se.runnable:[],...Array.isArray(se.session_active)?se.session_active:[]])xe&&typeof xe.bead_id=="string"&&Array.isArray(xe.blocked_by)&&xe.blocked_by.length>0&&M.set(xe.bead_id,ki(xe.blocked_by))}return M}function P(){let M=new Map,le=new Map,se=o();for(let pe of Array.isArray(se)?se:[]){if(!pe||typeof pe!="object")continue;let xe=pe.bead_blocked_by&&typeof pe.bead_blocked_by=="object"?pe.bead_blocked_by:{};for(let[ie,qe]of Object.entries(xe))Array.isArray(qe)&&M.set(ie,ki(qe));for(let ie of Array.isArray(pe.runnable)?pe.runnable:[])ie&&typeof ie.bead_id=="string"&&Array.isArray(ie.blocked_by)&&le.set(ie.bead_id,ki(ie.blocked_by))}for(let pe of m)for(let xe of[M,le]){let ie=xe.get(pe.a);ie!==void 0&&xe.set(pe.a,pe.type==="dep-remove"?ie.filter(qe=>qe!==pe.b):ie.includes(pe.b)?ie:[...ie,pe.b])}return{snapshot:M,runnable:le}}function U(){let M=I();for(let le of m){let se=(M.get(le.a)||[]).slice();le.type==="dep-remove"?M.set(le.a,se.filter(pe=>pe!==le.b)):se.includes(le.b)||M.set(le.a,[...se,le.b])}return M}function X(M=r(),le=q()){let se=new Map;for(let Pe of Array.isArray(le?.lanes)?le.lanes:[]){let Y=new Map;for(let B of Array.isArray(Pe?.entries)?Pe.entries:[])B&&typeof B.bead_id=="string"&&Y.set(B.bead_id,B.dep_created_by_lane===!0);se.set(typeof Pe?.id=="string"?Pe.id:"",Y)}let pe=new Map,xe=new Map,ie=new Set,qe=new Set;for(let Pe of M.chain_lanes){let Y=se.get(Pe.lane_id);pe.set(Pe.lane_id,{status:Pe.status,entries:Pe.rows.map((B,Ne)=>({bead_id:B.id,root_dir:B.root_dir,...Ne===0?{}:{dep_created_by_lane:Y?.get(B.id)===!0}}))});for(let B of Pe.rows)xe.set(B.id,Pe.lane_id),B.fixed&&ie.add(B.id),B.unplaced||qe.add(B.id)}let Ge=new Map;for(let Pe of M.parallel_rows)typeof Pe.queue_index=="number"&&Ge.set(Pe.id,Pe.queue_index);for(let Pe of M.queue_groups)for(let Y of Pe.sublanes.serial)for(let B of Y.items)typeof B.queue_index=="number"&&Ge.set(B.id,B.queue_index);let Xe=P();return{blocked_by_map:U(),snapshot_blocked_by:Xe.snapshot,runnable_blocked_by:Xe.runnable,owner_of:new Map(Object.entries(M.owner_of)),cross_lanes:pe,owner_lane_of:xe,fixed_members:ie,placed_members:qe,parallel_rows:M.parallel_rows.map(Pe=>({bead_id:Pe.id,root_dir:Pe.root_dir,queue_index:Pe.queue_index??0})),parallel_raw_length:new Map(Object.entries(M.parallel_raw_length)),queue_index_of:Ge}}function oe(M,le){let se=r();for(let xe of[...se.runnable,...se.queue,...se.running,...se.pr_wait,...se.done])if(!(xe.non_occupying||xe.id!==le)){if(xe.root_dir===M)return xe.expected_revision;break}let pe=se.queue_groups.find(xe=>xe.root_dir===M);return pe?pe.revision:0}async function N(M,le,se,pe){if(!t)return null;let ie=await t(M,{...le,...se?{root_dir:se}:{},expected_revision:pe});if(ie&&ie.conflict){ie.queue&&d?.(se,ie.queue);let qe=ie.queue&&typeof ie.queue.revision=="number"?ie.queue.revision:pe;ie=await t(M,{...le,...se?{root_dir:se}:{},expected_revision:qe})}return ie&&ie.queue&&d?.(se,ie.queue),ie}async function G(M,le,se,pe,xe){try{let ie=await N(M,le,se,pe.get(se)??oe(se,xe.bead_id));return!ie||typeof ie.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(ie.queue&&typeof ie.queue.revision=="number"&&pe.set(se,ie.queue.revision),ie.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):ie.applied===!1?(a(ie.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${ie.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):ie.queue&&typeof ie.queue.revision=="number"?ie.queue.revision:pe.get(se)??0)}catch(ie){return a(il(ie),"error"),null}}async function W(M,le,se=new Map){if(M.type==="worker-queue-disarm"){try{let pe=await N(M.type,M.payload,M.root_dir,se.get(M.root_dir)??oe(M.root_dir,le));pe&&pe.queue&&typeof pe.queue.revision=="number"&&se.set(M.root_dir,pe.queue.revision)}catch{}return!0}if(M.type==="worker-queue-place"||M.type==="worker-queue-reorder"||M.type==="worker-queue-remove")return await G(M.type,M.payload,M.root_dir,se,{bead_id:le})!==null;try{return(M.type==="dep-add"||M.type==="dep-remove")&&t&&await t(M.type,{a:M.a,b:M.b,...M.root_dir?{root_dir:M.root_dir}:{}}),!0}catch(pe){return a(il(pe),"error"),!1}}function Q(M){(M.type==="dep-add"||M.type==="dep-remove")&&(m=[...m,{type:M.type,a:M.a,b:M.b}])}async function Ee(M,le){if(!t)return{ok:!1};try{let se=await t(M.type,{...M.payload,expected_revision:le});return!se||typeof se.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:se.revision}}catch(se){let pe=se,xe=pe&&pe.code==="conflict"?pe.details?.cross_lanes:null;return xe&&typeof xe.revision=="number"&&Array.isArray(xe.lanes)?{ok:!1,conflict:xe}:(a(il(se),"error"),{ok:!1})}}async function ke(M,le,se){let pe=new Map,xe=[],ie=M.ops.slice(0,M.lane_op_index),qe=M.ops.slice(M.lane_op_index);for(let Xe of ie){if(!await W(Xe,se,pe))return{done:!0};Q(Xe)}let Ge=le;for(let Xe of M.lane_ops){if(Ge===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Pe=await Ee(Xe,Ge);if(!Pe.ok)return Pe.conflict?{done:!1,conflict:Pe.conflict}:{done:!0};Ge=Pe.revision}for(let Xe of qe){if(!await W(Xe,se,pe))return{done:!0};Q(Xe),Xe.type==="dep-add"&&xe.push(Xe)}for(let Xe of zu(xe))Ge=await ue(Xe,Ge);return{done:!0}}async function ue(M,le){if(le===null||!t)return le;let se=M.pairs,pe=le;for(let xe=0;xe<2;xe+=1){if(se.length===0)return pe;try{let ie=await t("monitor-lane-provenance",{lane_id:M.lane_id,pairs:se.map(qe=>({bead_id:qe.bead_id,after:qe.after,value:!0})),expected_revision:pe});return ie&&typeof ie.revision=="number"?ie.revision:pe}catch(ie){let qe=ie,Ge=qe&&qe.code==="conflict"?qe.details?.cross_lanes:null;if(!Ge||typeof Ge.revision!="number"||!Array.isArray(Ge.lanes))return pe;let Xe=Ge.lanes.find(Pe=>Pe&&Pe.id===M.lane_id);se=Hu(Array.isArray(Xe?.entries)?Xe.entries:[],se),pe=Ge.revision}}return pe}async function F(M,le,se=[]){m=se,l("",0);let pe=r(),xe=q();for(let ie=0;;ie+=1){let qe=M(X(pe,xe));if("refused"in qe){a(qe.refused,"error");break}let Ge=await ke(qe,pe.cross_lanes_revision,le);if(Ge.done){qe.correction&&l(qe.correction.lane_id,qe.correction.corrected);break}if(ie>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Xe=i(Ge.conflict);pe=Xe.lanes,xe=Xe.raw_lanes}m=[],c()}async function $e(M,le){await F(se=>ti(M,le,se),M.bead_id)}function Se(M,le){let se=le&&typeof le.closest=="function"?le.closest("[data-row-index]"):null;if(se&&M.contains(se)){let pe=Number(se.getAttribute("data-row-index"));return Number.isFinite(pe)?pe:0}return M.querySelectorAll("[data-row-index]").length}function E(M){let le=typeof M?.closest=="function"?M.closest(".worker-pane--collapsed[data-lane]"):null;if(!le)return null;let se=le.getAttribute("data-lane");return se==="queue"?{zone:le,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:se==="candidate"&&h===!0?{zone:le,target:{kind:"candidate"}}:null}function ne(M){let le=M.target;if(!k)return null;let se=typeof le?.closest=="function"?le.closest("[data-drop]"):null;if(!se)return E(le);let pe=se.getAttribute("data-drop");if(pe==="candidate")return{zone:se,target:{kind:"candidate"}};if(pe==="parallel")return{zone:se,target:{kind:"parallel",marker_index:Se(se,le)}};if(pe==="chain")return{zone:se,target:{kind:"chain",lane_id:se.getAttribute("data-lane-id")||"",marker_index:Se(se,le)}};if(pe==="repo-serial"){let xe=se.getAttribute("data-root-dir")||"";if(xe!==k.root_dir)return null;let ie=typeof le?.closest=="function"?le.closest("[data-queue-index]"):null,qe=ie&&se.contains(ie)?ie.getAttribute("data-queue-index"):se.getAttribute("data-lane-length"),Ge=Number(qe);return{zone:se,target:{kind:"repo-serial",root_dir:xe,lane_id:se.getAttribute("data-lane-id")||"",index:Number.isFinite(Ge)?Ge:0}}}return null}function he(){for(let M of Array.from(n.querySelectorAll(".is-drop-over")))M.classList.remove("is-drop-over")}function fe(M){H=M.target instanceof Element?M.target:null}function Oe(M){let le=M.target,se=typeof le?.closest=="function"?le.closest('[draggable="true"][data-bead-id]'):null,pe=se?se.closest("[data-drag-kind]"):null;if(!pe)return;if(se&&H&&se.contains(H)&&typeof H.closest=="function"&&H.closest("input, button, a")){M.preventDefault();return}let xe=pe.getAttribute("data-bead-id")||"",ie=pe.getAttribute("data-drag-kind")||"",qe=pe.getAttribute("data-root-dir")||"";if(!xe||!ie)return;let Ge=pe.getAttribute("data-queue-index")||"",Xe=Number(Ge),Pe=pe.getAttribute("data-lane-id")||"";k={kind:ie,bead_id:xe,root_dir:qe,...Ge!==""&&Number.isFinite(Xe)?{queue_index:Xe}:{},...Pe?{lane_id:Pe}:{}},O=!0,f?.(),n.classList.add("is-dragging");try{M.dataTransfer?.setData("text/plain",xe),M.dataTransfer&&(M.dataTransfer.effectAllowed="move")}catch{}}function de(M){let le=ne(M);le&&(M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move"),le.zone.classList.add("is-drop-over"))}function De(M){let le=M.target;typeof le?.closest=="function"&&(le.closest("[data-drop]")?.classList.remove("is-drop-over"),le.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function tt(){k=null,he(),n.classList.remove("is-dragging"),V()}function st(M){let le=ne(M),se=k;k=null,he(),n.classList.remove("is-dragging"),!(!le||!se)&&(M.preventDefault(),$e(se,le.target))}return{attach(M){ae||(ae=M,M.addEventListener("pointerdown",fe),M.addEventListener("dragstart",Oe),M.addEventListener("dragover",de),M.addEventListener("dragleave",De),M.addEventListener("drop",st),M.addEventListener("dragend",tt))},detach(){j!==null&&(clearTimeout(j),j=null);let M=ae;ae=null,M&&(M.removeEventListener("pointerdown",fe),M.removeEventListener("dragstart",Oe),M.removeEventListener("dragover",de),M.removeEventListener("dragleave",De),M.removeEventListener("drop",st),M.removeEventListener("dragend",tt))},isDragging(){return k!==null},consumeClickSuppression(){let M=O;return O=!1,M},applyDrop:$e,runPlanned:F,dropModel:X,sendOp:W,sendQueueCas:G,rememberDep:Q}}var al=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var Jd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Ai(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function xi(e){for(let t of Ai(e)){if(Object.hasOwn(Jd,t))return Jd[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function tp(e){return Ai(e).length===0?null:xi(e)||"\uC2E4\uD328"}function xr(e){let t=null;for(let n of Ai(e))Object.hasOwn(al,n)&&(t=al[n]);return t}function sr(e){let t=xi(e),n=xr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function np(e,t){let n=xi(e)??xi(t),r=xr(t)??xr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Cb=new Set(["repo_operation_timeout_unresolved"]);function Rb(e){for(let t of Ai(e))if(Cb.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Ob(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function rp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Rb(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Ob(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${yr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var ep={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function op(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(ep,t.blocked_reason)?ep[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=sr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=sr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Lb(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var sp=200;function Ib(e){return typeof e!="string"||e.length===0?"":e.length>sp?`${e.slice(0,sp)}\u2026`:e}function Db(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Mb(e,t){if(!e||e.open!==!0)return"";let n=xr(e.cause)||sr(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${Jt(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(f=>typeof f=="string"&&f.length>0).join(" \xB7 "),c=e.usage?.total_cost_usd,d=typeof c=="number"&&Number.isFinite(c)?`$${c.toFixed(2)}`:"";return u`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?u`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${n?u`<div>
            <dt>원인</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?u`<div>
            <dt>재시도 이력</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${e.cause?u`<div>
            <dt>실패 코드</dt>
            <dd><code>${e.cause}</code></dd>
          </div>`:""}
      ${o?.reason?u`<div>
            <dt>가드/원인</dt>
            <dd>${o.reason}</dd>
          </div>`:""}
      ${o?.command?u`<div>
            <dt>명령</dt>
            <dd><code>${o.command}</code></dd>
          </div>`:""}
      ${i?u`<div>
            <dt>착지 단계</dt>
            <dd>${i}</dd>
          </div>`:""}
      ${l?u`<div>
            <dt>실패 시각</dt>
            <dd>${l}</dd>
          </div>`:""}
      ${a?u`<div>
            <dt>실행</dt>
            <dd>${a}</dd>
          </div>`:""}
      ${e.attempt_id?u`<div>
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
      ${d?u`<div>
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
    ${e.attempt_id?u`<button
          type="button"
          class="rtile__session"
          title="실패 세션 열기"
          aria-label="실패 세션 열기"
        >
          ▤ 세션
        </button>`:""}
    ${e.landed?u`<p class="rtile__failure-landed">
          이미 base에 착지됨 — 이어하기로 배포·정리를 재개
        </p>`:""}
  </div>`}function Pb(e){return!e||!e.repo&&!e.serial_lane_id?"":u`${e.repo?u`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?u`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Nb=new Set(["codex-runner"]);function qb(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&Nb.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),c=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?Jt(r.last_event_at,t):"",f=r?Jt(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return u`${s?u`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?u`<span class="rtile__activity-age"
              >${Jt(i,t)}</span
            >`:""}
      </div>`:h?u`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
        </div>`:""}${a.length>0||c.length>0?u`<div class="rtile__legs">
        ${a.map(m=>u`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${m.label}</span
            >`)}${c.length>0?u`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${c.map(m=>m.label).join(", ")}`}
              >위임 완료 ${c.length}</span
            >`:""}
      </div>`:""}`}var Fb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function jb(e){if(!e)return"";let t=Fb[e.locality]||"";return u`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Bb(e,t,n){if(!e)return"";let r=Ib(t?.summary);return u`${r?u`<p class="rtile__held-summary">${r}</p>`:""}
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
    </div>`}function ll(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(De=>De&&De.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,c=e.retry_wait===!0&&!i&&!a,d=a&&e.failure||null,f=a||c,h=!!e.paused,m=i||f?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":c?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):h?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Lb(t-e.started_at):"\u2014",k=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,O=uo(e),j=Yt(e.usage),H=jn(e.usage),ae=e.conflict_resolution?h?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,V=e.base_exception||null,q=e.landing,I=e.attempt_id&&e.attempt_id===n,P=r.monitor||null,U=Pb(P),X=Fs(P?.cross_lane_chip),oe=P?qs(P.dependency_chips):"",N=qb(P,t,h,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),G=o&&e.workflow?.chips?.exec_receipt||null,W=js(e.workflow),Q=Bs(e.rec,e.chip_popover?.chip_key==="rec"),Ee=e.chip_popover?Wr(e.chip_popover.content):"",ke=G?u`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${qn(G)}`}
        >${`${G.kind}:${ms(G)}`}</span
      >`:"",ue=s?u`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${fo(s)}</span
      >`:"",F=U||X||W||ue||ke||Q?u`<div class="rtile__meta">
          ${U}${X}${W}${ue}${ke}${Q}${Ee}
        </div>`:"",$e=l?u`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${tp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?u`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",Se=a?u`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:c?u`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Db(e.retry)}</span
        >`:"",E=u`${ae?u`<span class="worker-mini__badge">${ae}</span>`:""}${V?u`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${V}</span
      >`:""}${$e}${Se}`,ne=o?"":Yr(e),he=Es(l?.quickfix_landing),fe=he==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Oe=he==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",de=e.discard?.action&&!(i&&l?.landed===!0)?u`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"";return u`<div
    class="rtile${I?" rtile--sel":""}${h?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${f?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${c?" rtile--retry-wait":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Us(e.priority)}${O?u`<span class="rtile__resumed" title=${O}>↻</span>`:""}${E}
      <div class="rtile__hd-actions">
        ${o?u`${typeof e.started_at=="number"?u`<span class="rtile__elapsed">${m}</span>`:""}${jb(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:u`<span class="rtile__elapsed">${m}</span>`}
        ${o||f?"":i?u`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${he}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${fe} \uBD88\uAC00`:Oe}
                  aria-label=${fe}
                >
                  ↻ ${fe}
                </button>
                ${de}`:u`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${h?u`<button
                      type="button"
                      class="rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶
                    </button>`:u`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${de}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${f?Bb(a,d,de):i?"":u`${N}${e.rollup?fs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Ki}):""}
            ${q?u`<div class="rtile__landing">
                  <span
                    class="merge-step${q.failed?" merge-step--failed":""}"
                    style=${`--progress: ${q.percent}%`}
                    >${q.label}${q.index>0?u`<span class="merge-step__n"
                          >${q.index}/${q.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${oe}
            ${o?F:U||X||W||k||Q||j.length>0||H?u`<div class="rtile__meta">
                    ${U}${X}${W}${Ns(e.exec_chips)}${Q}
                    ${j.length>0?j.map(De=>u`<span
                              class="worker-usage"
                              title=${De.tooltip}
                              >${De.label}</span
                            >`):H?u`<span
                            class="worker-usage"
                            title=${_o(e.usage)}
                            >${H}</span
                          >`:""}${Ee}
                  </div>`:""}
            ${Is(e)} ${ne}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||h?"":u`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Mb(l,t)}
  </div>`}function Ub(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function ip(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return u`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>ll(o,t,n,{monitor:Ub(o)}))}
  </div>`}var Vt="",Wb=["impl_runtime","impl_model","impl_effort"],zb=["claude_account","codex_account"],Hb=5,Si=1;function cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ei(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(D=>ve(D,"error",4e3)),s={},i={},l=[],a=!1,c={state:"absent",values:{},warnings:[]},d={},f={},h=Promise.resolve(),m={claude:null,codex:null},k=!1,O=null,j={},H="",ae="",V=!1,q=!1,I=!1,P=null,U=!1;function X(){let D=t.queue?t.queue():null;return cn(D)?D:null}function oe(){let D=X();return D?D.runner_catalog:null}function N(){let D=X();return D&&cn(D.execution_defaults)?D.execution_defaults:null}function G(){let D=t.implPresetStore?.get();return cn(D)&&Array.isArray(D.presets)?D:null}function W(){return r===null?{}:{root_dir:r}}async function Q(D,te){return U||!n?null:await n(D,te)}function Ee(D){D&&cn(D.queue)&&t.onQueueAdopt?.(D.queue)}async function ke(D,te){let be=X();if(!be||U)return null;let R=await Q(D,{...te,...W(),expected_revision:be.revision});if(Ee(R),r!==null&&R&&R.conflict){let K=R.queue&&typeof R.queue.revision=="number"?R.queue.revision:X()?.revision??be.revision;R=await Q(D,{...te,...W(),expected_revision:K}),Ee(R)}return R}async function ue(){a=!0,Be();try{let D=await Q("get-session-defaults",{...W()});s=cn(D?.values)?{...D.values}:{},i={...s},l=Array.isArray(D?.warnings)?D.warnings:[]}catch(D){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${D instanceof Error?D.message:String(D)}`)}finally{a=!1,Be()}}async function F(){let D=Wc(s,i);if(Object.keys(D).length!==0){try{let te=await Q("set-session-defaults",{values:D,...W()});s=cn(te?.values)?{...te.values}:{},i={...s},l=Array.isArray(te?.warnings)?te.warnings:[]}catch(te){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Be()}}function $e(D,te){if(!cn(D))return;let be=D.state;c={state:be==="usable"||be==="unusable"||be==="absent"?be:"absent",values:cn(D.values)?{...D.values}:{},warnings:Array.isArray(D.warnings)?D.warnings:[]},f={...c.values},te&&(d={...f})}async function Se(){try{$e(await Q("get-workspace-accounts",{...W()}),!0)}catch(D){c={state:"unusable",values:{},warnings:["kv_read_failed"]},f={},d={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${D instanceof Error?D.message:String(D)}`)}Be()}async function E(D){try{let te=await fetch(D);if(!te.ok)return null;let be=await te.json();if(!cn(be)||!Array.isArray(be.accounts))return null;let R=be.accounts.filter(K=>cn(K)&&typeof K.key=="string"&&K.key.length>0&&typeof K.email=="string"&&K.email.length>0);return{accounts:R,active:R.find(K=>K.active===!0)||null}}catch{return null}}async function ne(){k=!0;let[D,te]=await Promise.all([E("/api/claude-usage"),E("/api/codex-usage")]);U||(m={claude:D,codex:te},Be())}function he(){let D={};for(let te of zb){let be=Object.hasOwn(d,te)?d[te]:null,R=Object.hasOwn(f,te)?f[te]:null;be!==R&&(D[te]=be)}return D}async function fe(){let D=he();if(Object.keys(D).length!==0){try{$e(await Q("set-workspace-accounts",{values:D,...W()}),!1)}catch(te){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Be()}}function Oe(D,te){te===Vt?delete d[D]:d[D]=te,Be(),h=h.then(()=>fe())}function de(D,te){if(Wb.includes(D)){st(D,te);return}te===Vt?delete i[D]:i[D]=te,Be(),F()}function De(){let D=St().orchestration_model,te=un({global:{orchestration_model:D??void 0},execution_defaults:N(),runner_catalog:oe()}).orchestration_model.value;return te?yn(oe(),te):null}function tt(D,te){typeof te=="string"&&te.length>0?i[D]=te:delete i[D]}function st(D,te){let be=te===Vt?void 0:te,R=Bc({impl_runtime:D==="impl_runtime"?be:i.impl_runtime,impl_model:D==="impl_model"?be:i.impl_model,impl_effort:D==="impl_effort"?be:i.impl_effort},oe(),De());tt("impl_runtime",R.impl_runtime),tt("impl_model",R.impl_model),tt("impl_effort",R.impl_effort),Be(),F()}async function M(){let D=X();if(!D)return;let te={orchestration_model:D.orchestration_model??null,orchestration_effort:D.orchestration_effort??null,orchestration_speed:D.orchestration_speed??null},be=zc(te,{...te,...j});if(Object.keys(be).length!==0){try{let R=await ke("worker-queue-set-orchestration-defaults",{values:be});if(R&&R.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}j={}}catch(R){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}Be()}}function le(D,te){j[D]=te===Vt?null:te,Be(),M()}function se(D){if(O=D,!D){Be();return}let te=oe(),be=St(),R=be.orchestration_model;R&&!bo(te,D).includes(R)&&(j.orchestration_model=null,R=null);let K=be.orchestration_effort;K&&!ra(te,D,R||pn).includes(K)&&(j.orchestration_effort=null),Be(),M()}async function pe(D){if(!(!X()||D<Si)){try{await ke("worker-queue-set-slots",{slots:D})}catch(te){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Be()}}async function xe(D){if(!(!X()||D<Si||D>Hb)){try{await ke("worker-queue-set-serial-lane-count",{count:D})}catch(te){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}Be()}}async function ie(D,te){let be=D==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await ke(be,{on:te})}catch(R){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}Be()}function qe(){let D={},te=St();for(let be of zr){let R=Wn.includes(be)?te[be]:i[be];typeof R=="string"&&R.length>0&&(D[be]=R)}return D}async function Ge(){let D=G();if(!D)return;let te=qe();if(Object.keys(te).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let be=(D.presets||[]).find(K=>K.id===H),R=ae.trim()||(be?be.name:"");if(!R){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let K=be?await Q("impl-preset-update",{expected_revision:D.revision,id:be.id,name:R,settings:te}):await Q("impl-preset-create",{expected_revision:D.revision,name:R,settings:te});if(K&&K.applied){if(ae="",!be&&Array.isArray(K.presets)){let Ie=K.presets.find(We=>We.name===R);H=Ie?Ie.id:H}Be()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be()}catch(K){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}}async function Xe(){let D=G();if(!(!D||H.length===0))try{let te=await Q("impl-preset-delete",{expected_revision:D.revision,id:H});te&&te.applied?(H="",Be()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Be())}catch(te){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}}function Pe(D){s=cn(D.values)?{...D.values}:{},i={...s},l=Array.isArray(D.warnings)?D.warnings:[],cn(D.queue)&&(t.onQueueAdopt?.(D.queue),j={})}async function Y(){let D=G(),te=X();if(!D||!te||H.length===0)return;let be=R=>({preset_id:H,expected_revision:D.revision,expected_queue_revision:R,...W()});try{let R=await Q("apply-impl-preset-global",be(te.revision));if(R&&R.applied&&Pe(R),r!==null&&R&&R.queue_applied===!1){let K=R.queue&&typeof R.queue.revision=="number"?R.queue.revision:X()?.revision??te.revision;R=await Q("apply-impl-preset-global",be(K)),R&&R.applied&&Pe(R)}R&&R.applied?R.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):R&&R.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(R){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}Be()}async function B(){q=!0,I=!1,Be();try{let D=await Q("get-worker-system-prompt",{});!D||typeof D!="object"||Array.isArray(D)?I=!0:P=D}catch{I=!0}finally{q=!1,Be()}}function Ne(){if(V=!V,V&&!P){B();return}Be()}function at(){let D=Zr({loading:q,error:I});if(D)return D;if(!P)return"";let te=Array.isArray(P.variants)?P.variants:[];return u`<div class="settings-dialog__sp-body">
      ${P.target_base_placeholder?u`<div class="prompt-block__meta">
            \`${P.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${te.map(be=>u`<div class="settings-dialog__sp-variant" data-variant=${be.key}>
            <div class="settings-dialog__sp-cond">${be.condition}</div>
            ${Yn(be.label,be.system_prompt)}
          </div>`)}
    </div>`}function Qe(){return u`<section
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
        @click=${Ne}
      >
        ${V?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${V?at():""}
    </section>`}function y(D,te,be,R,K,Ie,We){let Me=K[D]??Vt,Je=oa(D,be,K,N(),oe(),We),Le=Je.options.find(Ze=>Ze.value===Me),ze=Me===Vt?Je.full_value:Le?.full_value;return u`<select
        class=${Me===Vt?"settings-dialog__unset":""}
        data-key=${D}
        aria-label=${te}
        title=${ze||""}
        ?disabled=${Ie===!0||Je.disabled}
        .value=${$r(String(Me))}
        @change=${Ze=>R(D,String(Ze.target.value))}
      >
        <option value=${Vt} ?selected=${Me===Vt}>
          ${Je.unset_label}
        </option>
        ${Je.options.map(Ze=>u`<option
              value=${Ze.value}
              title=${Ze.full_value||""}
              ?selected=${Ze.value===Me}
            >
              ${Ze.label}
            </option>`)}
      </select>
      ${Me===Vt?u`<span class="settings-dialog__source-badge">기본</span>`:""}`}function z(D,te,be,R,K,Ie=!1,We){return u`<div
      class=${`settings-dialog__row${Ie?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        ${y(D,te,be,R,K,Ie,We)}
      </span>
    </div>`}function Te(D,te){let be=te?te.active:null;return cn(be)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${D==="claude"?be.email:eo({...be,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Re(D,te,be){let R=m[be],K=Object.hasOwn(d,D)?d[D]:Vt,Ie=be==="claude"?hi:eo,We=!!R?.accounts.some(Me=>Me.key===K);return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${te}
          data-account-key=${D}
          @change=${Me=>Oe(D,String(Me.target.value))}
        >
          <option value=${Vt} ?selected=${K.length===0}>
            ${Te(be,R)}
          </option>
          ${K.length>0&&!We?u`<option value=${K} selected>
                ${K} (목록에 없음)
              </option>`:""}
          ${R?.accounts.map(Me=>u`<option value=${Me.key} ?selected=${Me.key===K}>
                ${Ie(Me)}
              </option>`)||""}
        </select>
        ${R?"":u`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Fe(){let D=c.warnings.join(", ");return c.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${D} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:c.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${D}`:null}function Ye(D,te,be,R,K){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${te}-on)`}
        ></i>
        ${D}
      </span>
      <span class="settings-dialog__controls">
        ${y(be,`${D} \uBAA8\uB378`,R,de,i,!1)}
        ${y(K,`${D} effort`,xs,de,i,!1)}
      </span>
    </div>`}function dt(D,te,be,R){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${R?" is-on":""}`}
          data-automation=${D}
          aria-pressed=${R?"true":"false"}
          aria-label=${te}
          @click=${()=>ie(D,!R)}
        >
          ${R?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${be}</span>
      </span>
    </div>`}function vt(D,te,be,R){return u`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${D}>
          <button
            type="button"
            aria-label=${`${te} \uAC10\uC18C`}
            @click=${()=>R(be-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${be}</span>
          <button
            type="button"
            aria-label=${`${te} \uC99D\uAC00`}
            @click=${()=>R(be+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Lt(D){return u`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${D.rows.length>0?`\uBCC0\uACBD ${D.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${D.rows.map(te=>u`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${te.kind}
          >
            <span class="settings-dialog__preset-diff-label">${te.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${te.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${te.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${D.ignored_keys.length>0?u`<div class="settings-dialog__preset-diff-note">
            ${D.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function St(){let D=X(),te={};for(let be of Wn)te[be]=Object.prototype.hasOwnProperty.call(j,be)?j[be]:D&&typeof D[be]=="string"?D[be]:null;return te}function ht(){let D=oe(),te=i.impl_runtime,be=i.impl_model,R=G(),K=X(),Ie=St(),We=bo(D,O),Me=Hr(D,void 0).filter(nt=>nt!==pn),Je=ra(D,O,Ie.orchestration_model||pn).filter(nt=>nt!==pn),Le=H?(R?.presets||[]).find(nt=>nt.id===H):null,ze=Le?Uc(qe(),cn(Le.settings)?Le.settings:{}):null,Ze=K&&typeof K.slots=="number"?K.slots:Si+1,ft=K&&typeof K.serial_lane_count=="number"?K.serial_lane_count:Si,He=N()?.supported===!0,kt=Fe(),Nt=oa("workflow_mode",go,i,N(),D);return u`
      ${l.length>0?u`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${kt?u`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${kt}
          </div>`:""}
      ${He?"":u`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${a?u`<div class="settings-dialog__empty">불러오는 중…</div>`:u`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${$r(H)}
                @change=${nt=>{H=String(nt.target.value),Be()}}
              >
                <option value="" ?selected=${H===""}>
                  실행 프리셋…
                </option>
                ${(R?.presets||[]).map(nt=>u`<option
                      value=${nt.id}
                      ?selected=${nt.id===H}
                    >
                      ${nt.name}
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
                .value=${$r(ae)}
                @input=${nt=>{ae=String(nt.target.value)}}
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
                    .value=${$r(O||Vt)}
                    @change=${nt=>{let Tt=String(nt.target.value);se(Tt===Vt?null:Tt)}}
                  >
                    <option value=${Vt} ?selected=${!O}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${O==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${O==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${z("orchestration_model","\uBAA8\uB378",We,le,Ie)}
              ${z("orchestration_effort","effort",Je,le,Ie)}
              ${z("orchestration_speed","\uC18D\uB3C4",mo,le,Ie)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Re("claude_account","Claude","claude")}
              ${Re("codex_account","Codex","codex")}
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
                      @click=${()=>de("workflow_mode",Vt)}
                    >
                      ${Nt.unset_label}
                    </button>
                    ${i.workflow_mode?"":u`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${go.map(nt=>u`<button
                          type="button"
                          data-mode=${nt}
                          aria-pressed=${String(i.workflow_mode===nt)}
                          @click=${()=>de("workflow_mode",nt)}
                        >
                          ${nt}
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
              ${Ye("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ho,"spec_review_effort")}
              ${Ye("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",$s,"plan_review_effort")}
              ${Ye("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ho,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${z("impl_runtime","\uC704\uC784 \uB300\uC0C1",ks,de,i)}
              ${z("impl_model","\uBAA8\uB378",Hr(D,te),de,i)}
              ${z("impl_effort","effort",Gr(D,te,be),de,i)}
              ${z("impl_speed","\uC18D\uB3C4",mo,de,i)}
              ${z("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Me,de,i,!1,{...i,...Ie})}
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
              ${vt("slots","\uB3D9\uC2DC \uC2E4\uD589",Ze,nt=>pe(nt))}
              ${vt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",ft,nt=>xe(nt))}
            </div>
            ${Qe()}
          `}
    `}function Be(){U||ot(ht(),e)}return{load(){j={};let D=[ue(),Se()];return k||D.push(ne()),Promise.all(D).then(()=>{})},render:Be,sessionDraft:()=>({...i}),destroy(){U=!0,ot(u``,e)}}}function Ti(e){return u`<svg
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
  </svg>`}function ap(){return Ti(ao`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function lp(){return Ti(ao`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function cp(){return Ti(ao`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function up(){return Ti(ao`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function dp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function pp(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Yt(vs(t));let n={};for(let l of Cn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let c=!1;for(let d of Cn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,c=!0)}if(c){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?jn(n):null}function An(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function cl(e,t){let n=An(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Gb(e,t){if(!An(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Kb(e){if(!An(e)||!An(e.execution_defaults)||!An(e.runner_catalog)||!An(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=un({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=yn(e.runner_catalog,n.orchestration_model.value??""),o=Kr(n,e.runner_catalog),s=br(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function fp(e,t){let n=t.notify||(E=>ve(E,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let c=null,d=null,f=null,h=new Map;function m(){let E=t.workspacesState?t.workspacesState():[];return Array.isArray(E)?E.filter(ne=>An(ne)):[]}function k(E){return m().find(ne=>ne.root_dir===E)||null}function O(E){return Gb(k(E),h.get(E))}function j(){for(let E of m()){let ne=h.get(E.root_dir);ne&&typeof ne.revision=="number"&&typeof E.revision=="number"&&E.revision>=ne.revision&&h.delete(E.root_dir)}}async function H(E,ne,he){let fe=t.transport,Oe=O(ne);if(!(!fe||!An(Oe))){try{let de=await fe(E,{...he,root_dir:ne,expected_revision:Oe.revision});if(An(de?.queue)&&h.set(ne,de.queue),de&&de.conflict){let De=An(de.queue)&&typeof de.queue.revision=="number"?de.queue.revision:O(ne)?.revision;de=await fe(E,{...he,root_dir:ne,expected_revision:De}),An(de?.queue)&&h.set(ne,de.queue)}}catch(de){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${de instanceof Error?de.message:String(de)}`)}F()}}function ae(E){c!==E&&(c=E,t.onFocusChange?.(c),F())}function V(E){ae(c===E?null:E)}function q(E){if(d===E){P();return}I(),d=E;let ne=k(E);i.textContent=`${ne?.name||E} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Ei(a,{root_dir:E,queue:()=>O(E),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:he=>{h.set(E,he),F()}}),f.load(),F()}function I(){f?.destroy(),f=null}function P(E){I(),d=null,o.hidden=!0,i.textContent="",E!==!0&&F()}let U=()=>P();l.addEventListener("click",U);function X(E){E.key==="Escape"&&c!==null&&ae(null)}document.addEventListener("keydown",X);function oe(E,ne){let he=Math.max(ne,E,1);return u`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ne}\uAC1C \uC911 ${E}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:he},(fe,Oe)=>Oe<E?u`<i class="mon2-deck__slot is-run"></i>`:u`<i class="mon2-deck__slot"></i>`)}
    </span>`}function N(E){let ne=E.auto_advance===!0,he=E.auto_merge===!0;return u`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ne?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ne?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9\uD654`}
        title=${ne?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ne?lp():ap()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${he?" is-on":""}`}
        data-act="merge"
        aria-pressed=${he?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${he?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${cp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===E.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===E.root_dir?"true":"false"}
        aria-label=${`${E.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${up()}
      </button>`}function G(E){let ne=Kb(E);return ne?u`<div class="mon2-deck__chips">
      ${ne.orchestration?u`<span class="mon2-deck__chip" title=${ne.orchestration.title}
            >오케 ${ne.orchestration.text}</span
          >`:""}
      ${ne.worker?u`<span class="mon2-deck__chip" title=${ne.worker.title}
            >워커 ${ne.worker.text}</span
          >`:""}
    </div>`:""}function W(E){let ne=[];for(let[he,fe]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Oe=cl(E,he);Oe>0&&ne.push(`${fe} ${Oe}`)}return ne.join(" \xB7 ")}function Q(E){let ne=cl(E,"running"),he=typeof E.slots=="number"?E.slots:1;return u`<div
      class=${`mon2-deck__tile${c===E.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${E.root_dir}
      aria-pressed=${c===E.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${E.root_dir}>${E.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${he}\uAC1C \uC911 ${ne}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ne}/${he}</span>
          ${oe(ne,he)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${E.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${N(E)}</div>
        <span class="mon2-deck__counts">${W(E)}</span>
        ${G(E)}
      </div>
    </div>`}function Ee(E){let ne=t.doneItems?t.doneItems():[],he=t.rangeLabel?t.rangeLabel():"",fe=pp(Array.isArray(ne)?ne:[]),Oe=de=>E.reduce((De,tt)=>De+cl(tt,de),0);return u`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${E.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${he}`}
        >실행 ${Oe("running")} · 대기 ${Oe("queue")} · PR
        ${Oe("pr_wait")}${Oe("session_active")>0?` \xB7 \uC138\uC158 ${Oe("session_active")}`:""}
        · ${he} 완료
        ${Array.isArray(ne)?ne.length:0}</span
      >
      ${fe===null?"":u`<span class="mon2-deck__total-tokens">
            ${typeof fe=="string"?u`<span
                  class="mon2-deck__tok"
                  title=${dp(he)}
                  >${fe}</span
                >`:fe.map(de=>u`<span
                      class="mon2-deck__tok"
                      data-provider=${de.provider}
                      title=${de.tooltip}
                      >${de.label}</span
                    >`)}
          </span>`}
    </div>`}function ke(){let E=m();return E.length===0?"":u`${Ee(E)}
      <div class="mon2-deck__strip">
        ${E.map(ne=>Q(ne))}
      </div>`}function ue(){c!==null&&!k(c)&&(c=null,t.onFocusChange?.(null))}function F(){j(),ue(),d!==null&&!k(d)&&P(!0),ot(ke(),r),f?.render()}function $e(E){let ne=E.target;if(!ne||typeof ne.closest!="function")return;let he=ne.closest("[data-root-dir]");if(!he)return;let fe=he.getAttribute("data-root-dir")||"",Oe=ne.closest("[data-act]")?.getAttribute("data-act");if(Oe==="worker"){t.gotoWorkerTab?.(fe);return}if(Oe==="auto"){H("worker-automation-toggle",fe,{on:O(fe)?.auto_advance!==!0});return}if(Oe==="merge"){H("worker-merge-auto-toggle",fe,{on:O(fe)?.auto_merge!==!0});return}if(Oe==="gear"){q(fe);return}V(fe)}function Se(E){if(E.key!=="Enter"&&E.key!==" ")return;let ne=E.target;if(!ne||typeof ne.closest!="function")return;let he=ne.closest('[data-root-dir][role="button"]');!he||he!==ne||(E.preventDefault(),V(he.getAttribute("data-root-dir")||""))}return r.addEventListener("click",$e),r.addEventListener("keydown",Se),{render:F,focusRoot:()=>c,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",X),r.removeEventListener("click",$e),r.removeEventListener("keydown",Se),l.removeEventListener("click",U),I(),ot(u``,r),e.replaceChildren()}}}var Yb=1e4,hp="bdui.monitor.done-range",bp="bdui.monitor.running_sort",yp="bdui.monitor.candidate_sort",vp="beads-ui.monitor.candidate-filter",wp="beads-ui.monitor.sections";function Vb(){try{let e=window.localStorage.getItem(vp);if(!e)return{...Vr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Vr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Vr.show_blocked,spec:$a.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Vr}}}function _p(e){try{window.localStorage.setItem(vp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Xb(){try{let e=window.localStorage.getItem(yp);return Eo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Qb(e){try{window.localStorage.setItem(yp,e)}catch{}}function Zb(){try{let e=window.localStorage.getItem(wp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Jb(e){try{window.localStorage.setItem(wp,JSON.stringify(e))}catch{}}function ey(){try{let e=window.localStorage.getItem(hp);return e===null?"today":En(e)}catch{return"today"}}function ty(e){try{window.localStorage.setItem(hp,e)}catch{}}function ny(){try{return window.localStorage.getItem(bp)==="repo"?"repo":"started"}catch{return"started"}}function ry(e){try{window.localStorage.setItem(bp,e)}catch{}}var kp="tab:monitor:pipeline",oy=1e3,mp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],sy=["queue","runnable","done"],gp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function iy(e){return e>=1&&e<=gp.length?gp[e-1]:`(${e})`}function $p(e,t){let n=Et("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,c=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=ey(),m=ny(),k=Vb(),O=Xb(),j=Zb(),H=wi("beads-ui.monitor.lane-collapsed"),ae=!1,V=null,q=null,I=null,P=null,U=Ur(()=>Le()),X=null,oe=null,N=null,G=null;function W(p){return G===null&&(G=M()),Mu(p,G)}function Q(p,_){Ee(),!(_<=0)&&(oe={lane_id:p,corrected:_},N=setTimeout(()=>{N=null,oe=null,Le()},Yb))}function Ee(){N!==null&&(clearTimeout(N),N=null),oe=null}function ke(){let p=Tr.find(_=>_.value===h);return p?p.label:""}let ue=document.createElement("div");ue.className="mon",e.appendChild(ue);let F=document.createElement("div");F.className="worker-drawer-overlay",F.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let Se=document.createElement("div");Se.className="worker-drawer-host mon2-drawer",F.append($e,Se),e.appendChild(F);let E=rr(null,null),ne=new Map,he=new Map,fe=null,Oe=null,de=null,De=Jr(Se,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{q=null,F.hidden=!0,Le()}}),tt=$i({transport:s,console_el:ue,getLanes:()=>E,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:xt,reproject:p=>({lanes:Je(p),raw_lanes:p}),onCorrection:Q,showToast:ve,requestRender:()=>Le(),adoptQueue:(p,_)=>{he.set(p,_)},onDragBegin:()=>{I=null},candidate_drop:!0}),{applyDrop:st,dropModel:M,runPlanned:le,sendQueueCas:se}=tt;async function pe(p,_,A,L,Z=!0){if(!s||!A)return null;let ce=await s(p,{..._,root_dir:A,expected_revision:L});if(ce&&ce.conflict&&Z){ce.queue&&he.set(A,ce.queue);let me=ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:L;ce=await s(p,{..._,root_dir:A,expected_revision:me})}return ce&&ce.queue&&A&&he.set(A,ce.queue),ce}function xe(p,_){let A=he.get(p),L=o&&o.get?o.get():null,Z=(Array.isArray(L)?L:[]).find(me=>me?.root_dir===p);return(A||Z)?.merge_queue?.find(me=>me.bead_id===_)?.continuation_action}async function ie(p,_,A,L){let Z=await pe(p,_,A,L),ce=he.get(A)?.revision??Z?.queue?.revision??L;return Fn(Z,(me,ge)=>pe(p,{..._,continuation:me,decision_token:ge},A,ce,!1),{refresh:me=>pe(p,_,A,me?.queue?.revision??he.get(A)?.revision??ce,!1)})}async function qe(p,_,A,L){let Z=await Fn({continuation_mismatch:L},(me,ge)=>pe("worker-merge-queue-add",{bead_id:_,continuation:me,decision_token:ge},p,A,!1)),ce=Z?.queue?.merge_queue?.find(me=>me.bead_id===_)?.continuation_action;Z?.applied!==!0&&ce?.continuation===null&&ce.mismatch&&await qe(p,_,Z.queue.revision,ce.mismatch)}async function Ge(p,_,A){let L=await pe("worker-discard",p,_,A);if(L&&L.discarded===!0){ve(Ps(L),"success",5e3);return}if(L&&L.reason){ve(`\uD3D0\uAE30 \uC2E4\uD328: ${L.reason}`,"error");return}if(L&&L.accepted&&L.pending==="merged_revert"){ve("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(L&&L.accepted){ve(`\uD3D0\uAE30 \uC9C4\uD589: ${L.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}L&&!L.conflict&&ve("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Xe(p,_,A){return!s||!A?null:await s(p,{..._,root_dir:A})}async function Pe(){let p=new Map;for(let _ of E.pr_wait)p.has(_.root_dir)||p.set(_.root_dir,_.expected_revision);for(let[_,A]of p)await pe("worker-merge-queue-add-all",{},_,A)}function Y(p){let _=j[p];return!!(_&&_.runnable===!0)}function B(p){let _={...j[p]||{}};_.runnable=!_.runnable,j={...j,[p]:_},Jb(j),Le()}function Ne(p){H.toggle(p),Le()}function at(p){H.toggleArea(p),Le()}function Qe(p){let _=p.dependency_chips||null,A=p.overlap_chips||[],L=p.scope_state==="missing",Z=p.armed_lane_chip;return!_&&A.length===0&&!L&&!Z?null:{..._||{},...A.length>0?{overlaps:A}:{},...L?{scope_missing:!0}:{},...Z?{armed_lane:Z}:{}}}function y(p){return Ws(p,_=>U.isOpen({bead_id:p.id,chip_key:_}))}function z(p){let _=Qe(p),A=y(p);return _||A?{...p,..._?{dependency_chips:_}:{},...A?{chip_popover:A}:{}}:p}function Te(p){let _=Y(p.root_dir);return u`<header class="mon2-sec__hd">
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
    </header>`}function Re(p,_){return u`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${_}
    </div>`}function Fe(p){if(I!==p.id)return null;let _=E.queue_groups.find(ce=>ce.root_dir===p.root_dir),A=p.place_lanes||[],L=E.cross_lanes_revision!==null,Z=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let ce of E.chain_lanes)Z.push({id:`lane:${ce.lane_id}`,label:`\uC5F0\uACB0 ${ce.number} (${ce.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:ce.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!L});Z.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!L,title:L?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let ce of A)Z.push({id:`serial:${ce.id}`,label:`\uC9C1\uB82C ${Number(ce.id.slice(1))}`,count:ce.length,group:`${_?_.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:Z}}function Ye(p){return Re(p,u`${ha(z(p),Fe(p),{exec_chips_mode:"pinned_only",onOpenDoc:l?(_,A)=>l(A,p.root_dir):void 0})}`)}function dt(){return E.runnable_flat?u`<div class="mon2-flat" data-drop="candidate">
        ${E.runnable.map(p=>Ye(p))}
      </div>`:u`${E.runnable_sections.map(p=>{let _=Y(p.root_dir);return u`<section
        class="mon2-sec${_?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Te({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${_?"":u`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(A=>Ye(A))}
            </div>`}
      </section>`})}`}function vt(p,_=!1){return u`<span class="worker-mini__rowops">
      ${_?u`<button
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
    </span>`}function Lt(p,_){return u`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${_}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${vn(z(p),{actions:vt(p,!0)})}
    </div>`}function St(p,_,A,L){return u`<div
      class="mon2-crow${_.fixed?" mon2-crow--fixed":""}"
      draggable=${_.draggable?"true":"false"}
      data-bead-id=${_.id}
      data-drag-kind="chain"
      data-root-dir=${_.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${A}
      data-queue-index=${typeof _.queue_index=="number"?String(_.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${iy(_.seq)}</span
      >
      ${_.workspace_name?u`<span class="worker-mini__repo" title=${_.root_dir}
            >${_.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${_.id}</span>
      <span class="mon2-crow__title">${_.title}</span>
      ${_.mismatch?u`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${L.includes(_.id)?u`<span
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
    </div>`}function ht(p){let _=E.cross_lanes_revision!==null,A=W(p.lane_id),L=A?.held===!0,Z=A?.cycle===!0,ce=A?A.mismatched:[],me=oe&&oe.lane_id===p.lane_id?oe.corrected:0;return u`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${me>0?u`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${me}건 자동 교정</span
            >`:""}
        ${Z?u`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${L?u`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Js}</span
            >`:""}
        ${p.draft?u`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!_||!p.can_confirm||L}
              title=${L?Js:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?u`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!_}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?u`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!_}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?u`<button
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
        ${p.rows.length===0?u`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:p.rows.map((ge,it)=>St(p,ge,it,ce))}
      </div>
    </div>`}function Be(p,_,A){return u`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="repo-serial"
      data-root-dir=${_.root_dir}
      data-lane-id=${p.id}
      data-row-index=${A}
      data-queue-index=${String(_.queue_index??0)}
    >
      ${vn(z(_),{actions:vt(_)})}
    </div>`}function D(p){if(p.length===0)return"";let _=p.length-1;return`${p[0].id} \uC810\uC720${_>0?` +${_}`:""}`}function te(p){return u`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${vn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function be(p,_){let A=_.occupants,L=_.cross_wait_peers||[];return{id:_.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${_.index+1}`,rows:[...A.map(Z=>te(Z)),..._.items.map((Z,ce)=>Be(_,Z,ce))],count:_.items.length,empty:_.empty===!0,...A.length>0?{badge:u`<span
              class="mon2-lane__occupant"
              title=${A.map(Z=>`${Z.id} \u2014 ${Z.badge}`).join(`
`)}
              >${D(A)}</span
            >`,held:!0}:{},cycle:_.cycle,header_control:u`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...L.length>0?{after:u`${L.map(Z=>u`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${Z.workspace_name}·${Z.lane}과 교차 대기
                </div>`)}`}:{}}}function R(){let p=E.cross_lanes_revision!==null,_=E.chain_lanes.some(A=>A.draft&&A.rows.length===0);return Hs({parallel:{rows:E.parallel_rows.map((A,L)=>Lt(A,L)),count:E.parallel_rows.length,collapsed:H.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:E.queue_groups.flatMap(A=>A.sublanes.serial.map(L=>({...be(A,L),drop:{drop:"repo-serial",root_dir:A.root_dir,lane_id:L.id,lane_length:String(L.raw_length)}}))),collapsed:H.isAreaCollapsed("serial"),extra_panes:E.chain_lanes.map(A=>ht(A)),header_control:u`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${_||!p}
          title=${p?_?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...E.cross_lanes_unreadable?{notice:u`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function K(p){return u`<div class="worker-rungrid">
      ${E.running.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:E.running.map(_=>ll({bead_id:_.id,attempt_id:_.attempt_id||"",title:_.title,runner:_.runner??null,model:_.model??null,effort:_.effort??null,speed:_.speed??null,started_at:_.started_at??null,kind:_.kind,..._.kind==="session"?{updated_at:_.updated_at,session_refs:_.session_refs||[]}:{},workflow:_.workflow||null,resumed_from:_.resumed_from??null,continuation_mode:_.continuation_mode??null,paused:_.run_state==="paused",failed:_.run_state==="failed",parked:_.run_state==="parked",retry_wait:_.run_state==="retry_wait",retry:_.retry||null,status:_.status,status_label:_.run_state==="failed"?"\uC2E4\uD328":_.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":_.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:_.can_pause!==!1,exec_chips:_.exec_chips||null,usage:_.usage||null,chip_popover:y(_),discard:_.discard,failure:_.failure?{..._.failure,open:P===_.attempt_id}:null},p,q,{monitor:{repo:_.workspace_name,root_dir:_.root_dir,serial_lane_id:_.serial_lane_id,cross_lane_chip:_.cross_lane_chip||null,last_activity:_.last_activity||null,legs:_.legs||[],dependency_chips:Qe(_)}}))}
    </div>`}function Ie(p){let _={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done},A=L=>{let Z=_[L.lane],ce=L.lane==="runnable"?E.runnable_flat?Z.length>0?dt():void 0:E.runnable_sections.length>0?dt():void 0:L.lane==="queue"?E.queue_groups.length>0||E.chain_lanes.length>0||E.parallel_rows.length>0||E.cross_lanes_unreadable?R():void 0:L.lane==="running"?K(p):Z.length>0?u`${Z.map(me=>vn(z(me)))}`:void 0;return Rn({id:`monitor-${L.lane}`,lane:L.pane,title:L.title,items:Z,count:Z.length,src:L.lane==="runnable",empty:L.empty,body:ce,live:L.lane==="running"&&Z.length>0,collapsible:!0,collapsed:H.isCollapsed(L.pane),controls:L.lane==="runnable"?We():void 0,header_control:Me(L.lane,Z.length)})};if(ae){let L=sy.map(Z=>mp.find(ce=>ce.lane===Z)).filter(Z=>Z!==void 0);return u`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Gs({live:E.running.length>0,running_body:E.running.length>0?K(p):"",pr_wait_rows:E.pr_wait.map(Z=>vn(z(Z))),count:E.running.length+E.pr_wait.length})}
            ${L.map(Z=>A(Z))}
          </div>
        </div>`}return u`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${mp.map(L=>A(L))}
        </div>
      </div>`}function We(){return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${E.runnable_hidden.blocked>0?` ${E.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${$a.map(p=>u`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${k.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${E.runnable_hidden.spec>0?u`<span class="worker-filter__hidden"
              >숨김 ${E.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Me(p,_){return p==="runnable"?u`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${O}
      >
        ${Eo.map(A=>u`<option
              value=${A.value}
              ?selected=${O===A.value}
            >
              ${A.label}
            </option>`)}
      </select>`:p==="running"?u`<select
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
      </select>`:p==="pr_wait"&&_>0?u`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?u`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Tr.map(A=>u`<option value=${A.value} ?selected=${h===A.value}>
              ${A.label}
            </option>`)}
      </select>`:""}function Je(p){let _=o&&o.get?o.get():null,A=o&&o.getWorkspacesState?o.getWorkspacesState():[],L=p===void 0?o&&o.crossLanes?o.crossLanes():void 0:p,Z={done_since:mr(h,d()),running_sort:m,candidate_filter:k,candidate_sort:O};return L!==void 0&&(Z.cross_lanes=L),rr(_,A,Z)}function Le(){let p=d();E=Je(),G=null,ne=new Map;for(let _ of[...E.runnable,...E.queue,...E.running,...E.pr_wait,...E.done])!_.non_occupying&&!ne.has(_.id)&&ne.set(_.id,_);ot(Ie(p),ue),Ze()?.render(),ze(),ft()}function ze(){let p=new Map;for(let _ of E.queue_groups)p.set(_.root_dir,_.auto_advance);for(let _ of Array.from(ue.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let A=_.closest(".mon2-item")?.getAttribute("data-root-dir")||"",L=p.get(A);typeof L=="boolean"&&_.setAttribute("title",`${_.textContent||""} \xB7 ${L?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Ze(){if(de)return de;let p=ue.querySelector(".mon2-deck");return p?(de=fp(p,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>E.done,rangeLabel:ke,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:kt,onFocusChange:_=>{X=_,ft()}}),de):null}function ft(){ue.classList.toggle("has-focus",X!==null);for(let p of Array.from(ue.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",X!==null&&p.getAttribute("data-root-dir")===X);for(let p of Array.from(ue.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let _=ne.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",X!==null&&!!_&&_.root_dir===X)}for(let p of Array.from(ue.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",X!==null&&p.getAttribute("data-root-dir")===X)}function He(p,_){let A=i?i():void 0;if(!_||!A||_===A||!a){r(p);return}a(_).then(()=>{r(p)}).catch(L=>{n("workspace switch for %s failed: %o",_,L)})}function kt(p){if(!p)return;let _=i?i():void 0,A=()=>{try{c?.gotoView("worker")}catch(L){n("gotoView(worker) failed: %o",L)}};if(!a||_&&_===p){A();return}a(p).then(A).catch(L=>{n("workspace switch for %s failed: %o",p,L),ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Nt(p){en(p).then(_=>{ve(_?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",_?"success":"error",1400)})}function nt(p){let _=ne.get(p)||null;return{item:_,root_dir:_?_.root_dir:"",revision:_?_.expected_revision:0}}async function Tt(p,_,A){if(p!=="dep-add")return;let L=E.chain_lanes.find(Z=>Z.rows.some(ce=>ce.id===_));!L||!L.rows.some(Z=>Z.id===A)||await le(Z=>Bu(L.lane_id,Z),"",[{type:p,a:_,b:A}])}function xt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Ct(p,_){if(p==="run"){await an(_);return}if(p==="stop"){await Bt(_);return}if(p==="create"){await le(A=>Ta(null,A),"");return}if(p==="remove"){let A=Wu(_,M());if(A!==null&&!f(A))return;await le(L=>Uu(_,L),"");return}await le(A=>p==="confirm"?Fu(_,A):ju(_,A),"")}function qt(p){let _=new Map;for(let A of p.rows){let L=E.owner_of[A.id]||A.root_dir;typeof L!="string"||L.length===0||_.set(L,[..._.get(L)||[],A.id])}return _}async function an(p){let _=E.chain_lanes.find(ce=>ce.lane_id===p);if(!_||E.cross_lanes_revision===null){Le();return}Ee();let A=new Map,L=new Map,Z=qt(_);for(let ce of _.rows){if(!ce.unplaced)continue;let me=E.owner_of[ce.id]||ce.root_dir;if(typeof me!="string"||me.length===0){ve(`${ce.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Le();return}let ge=L.get(me)??0;if(await se("worker-queue-place",{bead_id:ce.id,lane:"parallel",index:(E.parallel_raw_length[me]??0)+ge},me,A,{bead_id:ce.id})===null){Le();return}L.set(me,ge+1)}for(let[ce,me]of Z)if(await se("worker-queue-arm",{bead_ids:me,lane_id:p},ce,A,{bead_id:me[0]})===null){ve("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Le();return}Le()}async function Bt(p){let _=E.chain_lanes.find(L=>L.lane_id===p);if(!_||E.cross_lanes_revision===null){Le();return}Ee();let A=new Map;for(let[L,Z]of qt(_))if(await se("worker-queue-disarm",{lane_id:p},L,A,{bead_id:Z[0]})===null)break;Le()}async function Ut(p,_){let{root_dir:A,revision:L}=nt(p);if(A.length===0){Le();return}await se("worker-queue-disarm",{bead_ids:[p],lane_id:_},A,new Map([[A,L]]),{bead_id:p}),Le()}async function It(p,_){let A=ne.get(p);if(!A){Le();return}let L={kind:"candidate",bead_id:p,root_dir:A.root_dir};if(_==="new-lane"){await le(Z=>Ta({bead_id:p,root_dir:A.root_dir},Z),p);return}if(_.startsWith("lane:")){let Z=_.slice(5);if(!E.chain_lanes.find(me=>me.lane_id===Z)){Le();return}await le(me=>ti(L,{kind:"chain",lane_id:Z,marker_index:(me.cross_lanes.get(Z)?.entries??[]).length},me),p);return}if(_.startsWith("serial:")){let Z=_.slice(7),ce=(A.place_lanes||[]).find(me=>me.id===Z);await st(L,{kind:"repo-serial",root_dir:A.root_dir,lane_id:Z,index:ce?ce.index:0});return}await st(L,{kind:"parallel",marker_index:E.parallel_rows.length})}async function Pt(p,_){let A=E.parallel_rows,L=A.findIndex(ut=>ut.id===p);if(L<0)return;let Z=A[L].root_dir,ce=[];A.forEach((ut,Ht)=>{ut.root_dir===Z&&ce.push(Ht)});let me=ce.indexOf(L),ge=ce[me+_];if(typeof ge!="number")return;let it=_===-1?ge:ce[me+2]??Math.min(A.length,ge+1);await st({kind:"parallel",bead_id:p,root_dir:Z,queue_index:A[L].queue_index??0},{kind:"parallel",marker_index:it})}async function Zt(p){for(let _ of E.chain_lanes){let A=_.rows.find(L=>L.id===p);if(A){await st({kind:"chain",bead_id:p,root_dir:A.root_dir,lane_id:_.lane_id,...typeof A.queue_index=="number"?{queue_index:A.queue_index}:{}},{kind:"parallel",marker_index:E.parallel_rows.length});return}}}function zt(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function wt(p,_){let{item:A,root_dir:L,revision:Z}=nt(_),ce=A?.attempt_id||"",me=p.classList;if(me.contains("worker-mini__rowops-up")||me.contains("worker-mini__rowops-down")){Pt(_,me.contains("worker-mini__rowops-up")?-1:1);return}if(me.contains("worker-mini__rowops-remove")){pe("worker-queue-remove",{bead_id:_},L,Z);return}if(me.contains("mon2-crow__detach")){Zt(_);return}if(me.contains("worker-dep__open")){He(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(me.contains("mon2-arm__release")){Ut(_,p.getAttribute("data-lane-id")||"");return}if(me.contains("mon-lane__chip")){let ge=p.getAttribute("data-lane-id")||"";ue.querySelector(`.mon2-clane[data-lane-id="${ge}"]`)?.scrollIntoView({block:"nearest"});return}if(me.contains("judgement-chip")){let ge=p.getAttribute("data-chip-key")||"";ge&&U.toggle({bead_id:_,chip_key:ge});return}if(me.contains("rtile__failure-badge")){P=P===ce?null:ce,Le();return}if(me.contains("rtile__attempt-copy")){let ge=p.getAttribute("data-attempt-id")||"";ge&&en(ge).then(it=>{ve(it?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",it?"success":"error",1400)});return}if(me.contains("worker-card__place")){I=I===_?null:_,Le();return}if(me.contains("worker-card__place-cancel")){I=null,Le();return}if(me.contains("worker-card__place-lane")){let ge=p.getAttribute("data-lane")||"parallel";I=null,It(_,ge);return}if(me.contains("rtile__session")){if(A&&A.kind==="session"){let ge=(A.session_refs||[]).find(it=>it&&it.current===!0);ge&&(F.hidden=!1,De.open(Fr(ge,_,"in_progress",L)),Le());return}q=ce,ce&&A&&(F.hidden=!1,De.open({attempt_id:ce,root_dir:L,meta:zt(A)})),Le();return}if(me.contains("rtile__pause")){Xe("worker-attempt-pause",{attempt_id:ce},L);return}if(me.contains("rtile__resume")){qr().then(ge=>{if(ge!==null)return ie("worker-attempt-resume",{attempt_id:ce,...ge!==""?{instructions:ge}:{}},L,Z)});return}if(me.contains("rtile__parked-retry")){Xe("worker-parked-retry",{bead_id:_,attempt_id:ce},L).then(ge=>{ge&&ge.ok===!1&&ve(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${ge.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":ge.reason||""}`,"error")});return}if(me.contains("rtile__discard")){let ge=p.dataset.confirmation==="merged"?"merged":"unmerged";if(!f($o(_,ge)))return;Ge({bead_id:_,...ce?{attempt_id:ce}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},L,Z);return}if(me.contains("worker-mini__merge")){let ge=xe(L,_);ge?.mismatch&&ge.continuation===null?qe(L,_,Z,ge.mismatch):pe("worker-merge-queue-add",{bead_id:_},L,Z);return}if(me.contains("worker-mini__merge-cancel")){pe("worker-merge-queue-remove",{bead_id:_},L,Z);return}if(me.contains("worker-mini__discard")){let ge=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!f($o(_,ge)))return;Ge({bead_id:_,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},L,Z);return}if(me.contains("worker-mini__revise-fix")){ie("worker-revise-fix",{bead_id:_},L,Z);return}me.contains("worker-mini__revise-approve")&&pe("worker-revise-approve",{bead_id:_},L,Z)}function Xt(p){let _=tt.consumeClickSuppression(),A=p.target;if(!A||typeof A.closest!="function"||A.closest("dialog")||A.closest(".worker-drawer-overlay")||A.closest("a"))return;let L=A.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(L){p.preventDefault();let Ae=A.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||L.textContent?.trim()||"";Ae&&Nt(Ae);return}let Z=A.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Z){p.preventDefault();let C=Z.getAttribute("data-root-dir")||ne.get(A.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Z.getAttribute("title")||"";kt(C);return}let ce=A.closest(".mon2-sec__toggle");if(ce){p.preventDefault(),B(ce.getAttribute("data-root-dir")||"");return}let me=A.closest(".worker-pane__toggle[data-lane]");if(me){p.preventDefault();let C=me.getAttribute("data-lane")||"";(C==="candidate"||C==="queue"||C==="running"||C==="pr_wait"||C==="done")&&Ne(C);return}let ge=A.closest(".worker-wait__area-toggle[data-area]");if(ge){p.preventDefault(),at(ge.getAttribute("data-area")||"parallel");return}if(A.closest(".mon2-newlane")){p.preventDefault(),Ct("create","");return}let it=A.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(it){p.preventDefault();let C=it.getAttribute("data-lane-id")||"",Ae=it.classList;Ct(Ae.contains("mon2-clane__confirm")?"confirm":Ae.contains("mon2-clane__reapply")?"reapply":Ae.contains("mon2-clane__run")?"run":Ae.contains("mon2-clane__stop")?"stop":"remove",C);return}if(A.closest(".mon-merge-all")){p.preventDefault(),Pe();return}let ut=A.closest(".mon-filter__spec");if(ut){p.preventDefault(),k={...k,spec:ut.getAttribute("data-spec")||"all"},_p(k),Le();return}let Ht=A.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Ht)return;let _t=Ht.getAttribute("data-bead-id")||"",x=A.closest("button");if(x){p.preventDefault(),wt(x,_t);return}A.closest(".rtile__failure-pop, .chip-popover")||_t&&!_&&(p.preventDefault(),He(_t,Ht.getAttribute("data-root-dir")||nt(_t).root_dir))}function we(p){let _=p.target;if(!_||typeof _.closest!="function")return;let A=_.closest(".mon-filter__blocked");if(A){k={...k,show_blocked:A.checked},_p(k),Le();return}let L=_.closest(".mon-candidate-sort");if(L){O=Eo.some(me=>me.value===L.value)?L.value:"repo_spec",Qb(O),Le();return}let Z=_.closest(".mon-running-sort");if(Z){m=Z.value==="repo"?"repo":"started",ry(m),Le();return}let ce=_.closest(".mon-done-range");ce&&(h=En(ce.value),ty(h),Le())}function T(p){let _=p.target,A=_&&typeof _.closest=="function"?L=>_.closest(L):()=>null;P&&!A(".rtile__failure-pop, .rtile__failure-badge")&&(P=null,Le())}function ee(p){p.key!=="Escape"||P===null||(P=null,Le())}e.addEventListener("click",Xt),e.addEventListener("change",we),document.addEventListener("click",T),document.addEventListener("keydown",ee),U.attach(),tt.attach(e);{let p=!0;V=vi(_=>{if(ae=_,p){p=!1;return}Le()})}o&&typeof o.subscribe=="function"&&(fe=o.subscribe(()=>{try{he.clear(),Le()}catch{}}));function v(){Oe!==null&&(clearInterval(Oe),Oe=null)}return{recorrectSharedLane:Tt,load(){n("load"),Le(),Oe===null&&(Oe=setInterval(()=>{try{Le()}catch{}},oy))},pause(){v()},clear(){v(),tt.detach(),fe&&(fe(),fe=null),V&&(V(),V=null),De.destroy(),F.hidden=!0,de?.destroy(),de=null,e.removeEventListener("click",Xt),e.removeEventListener("change",we),document.removeEventListener("click",T),document.removeEventListener("keydown",ee),U.detach(),e.replaceChildren()}}}function xp(e,t,n){let r=Et("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(h){return m=>{m.preventDefault();let k=h==="monitor"&&a()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function a(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function c(){let h=a();return u`
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
    `}function d(){let h=a();return u`
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
    `}function f(){o&&ot(c(),o),s&&ot(d(),s)}return f(),i=t.subscribe(()=>f()),{destroy(){i&&(i(),i=null),o&&ot(u``,o),s&&ot(u``,s)}}}var Ap=["bug","feature","task","epic","chore"];function Sp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ep=["Critical","High","Medium","Low","Backlog"];function Tp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),c=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",s.appendChild(I);for(let P of Ap){let U=document.createElement("option");U.value=P,U.textContent=Sp(P),s.appendChild(U)}i.replaceChildren();for(let P=0;P<=4;P+=1){let U=document.createElement("option");U.value=String(P);let X=Ep[P]||"Medium";U.textContent=`${P} \u2013 ${X}`,i.appendChild(U)}}m();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function O(I){o.disabled=I,s.disabled=I,i.disabled=I,l.disabled=I,a.disabled=I,d.disabled=I,f.disabled=I,f.textContent=I?"Creating\u2026":"Create"}function j(){c.textContent=""}function H(I){c.textContent=I}function ae(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?s.value=I:s.value="";let P=window.localStorage.getItem("beads-ui.new.priority");P&&/^\d$/.test(P)?i.value=P:i.value="2"}catch{s.value="",i.value="2"}}function V(){let I=s.value||"",P=i.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),P.length>0&&window.localStorage.setItem("beads-ui.new.priority",P)}async function q(){j();let I=String(o.value||"").trim();if(I.length===0){H("Title is required"),o.focus();return}let P=Number(i.value||"2");if(!(P>=0&&P<=4)){H("Priority must be 0..4"),i.focus();return}let U=String(s.value||""),X=String(a.value||""),oe={title:I};U.length>0&&(oe.type=U),String(P).length>0&&(oe.priority=P),X.length>0&&(oe.description=X),O(!0);try{await t("create-issue",oe)}catch{O(!1),H("Failed to create issue");return}V(),O(!1),k()}return n.addEventListener("cancel",I=>{I.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),q())}),r.addEventListener("submit",I=>{I.preventDefault(),q()}),{open(){r.reset(),j(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var ay=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function ly(e,t){return Hi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Cp(e,t,n){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?u`<div class="settings-dialog__empty">라벨 없음</div>`:u`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=ly(r,e);return u`<button
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
  `}function Rp(e,t,n){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>u`<span class="settings-dialog__prefix">
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
  `}function Op(e,t){return u`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${ay.map(([n,r])=>u`<label class="settings-dialog__toggle">
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
  `}var cy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Lp(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(Q=>ve(Q,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,c="",d=null;function f(){if(d)return d;let Q=i.querySelector('[data-pane="execution"]');return Q?(d=Ei(Q,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:Ee=>t.queueStore?.set?.(Ee)}),d):null}function h(){return u`
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
    `}function m(){let Q=r.get();return u`
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
        ${Q?u`
              ${Cp(Q,o(),H)}
              ${Rp(Q,c,{onDraft:Ee=>{c=Ee},onAdd:ae,onRemove:V})}
              ${Op(Q,q)}
            `:u`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(Q){let Ee=r.get();if(Ee)try{let ke=await n("display-policy-set",{expected_revision:Ee.revision,policy:Q(Ee)});O(ke),ke&&ke.conflict&&ke.policy&&(ke=await n("display-policy-set",{expected_revision:ke.policy.revision,policy:Q(ke.policy)}),O(ke)),ke&&ke.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function O(Q){Q&&Q.policy&&typeof Q.policy=="object"&&r.set(Q.policy)}function j(Q){k(Q)}function H(Q){let Ee=r.get();if(!Ee)return;let ke=!uy(Q,Ee);j(ue=>dy(Q,ue,ke))}function ae(){let Q=c.trim();Q.length!==0&&(c="",j(Ee=>Ee.hidden_prefixes.includes(Q)?{hidden_prefixes:Ee.hidden_prefixes}:{hidden_prefixes:[...Ee.hidden_prefixes,Q]}),I())}function V(Q){j(Ee=>({hidden_prefixes:Ee.hidden_prefixes.filter(ke=>ke!==Q)}))}function q(Q){let Ee=r.get();if(!Ee)return;let ke=Ee.chips[Q]===!1;j(()=>({chips:{[Q]:ke}}))}function I(){ot(u`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${cy.map(Q=>u`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${Q.id}
                  aria-selected=${String(l===Q.id)}
                  aria-controls=${`settings-pane-${Q.id}`}
                  @click=${()=>P(Q.id)}
                >
                  <span class="settings-dialog__glyph">${Q.glyph}</span>
                  ${Q.label}
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
      `,i),f()}function P(Q){l=Q,I()}let U=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",U),i.addEventListener("cancel",U);let X=Q=>{Q.target===i&&W()};i.addEventListener("click",X);let oe=null;r.subscribe&&(oe=r.subscribe(()=>{a&&I()}));let N=null;t.implPresetStore?.subscribe&&(N=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function G(Q="execution"){a||(a=!0,t.onOpenChange?.(!0),l=Q,c="",I(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),f()?.load())}function W(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:G,close:W,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",U),i.removeEventListener("cancel",U),i.removeEventListener("click",X),oe&&(oe(),oe=null),N&&(N(),N=null),d?.destroy(),d=null,i.remove()}}}function uy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function dy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var py=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ip="usage-meter-card",fy="usage-meter-layer",ul=600,_y=["token_expired","relogin_required"];function Dp(e){return String(e).padStart(2,"0")}function my(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Mp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Dp(r.getHours())}:${Dp(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${py[r.getMonth()]} ${r.getDate()} ${s}`;return`${my(n,t)} \xB7 ${l}`}function gy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Pp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Np(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var qp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function jp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function hy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:jp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function by(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=hy(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?jp(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function yy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=by(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Bp(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function vy(e,t){return!e.held||Bp(e,t)<=ul?e:{...e,available:!1,windows:[],accounts:[]}}function Fp(e,t){return`${e}:${t}`}function Up(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function c(){ot(u``,e),e.hidden=!0,f()}function d(){if(a===null){let ue=e.ownerDocument;a=ue.createElement("div"),a.id=fy,a.className="usage-meter__layer",ue.body.appendChild(a)}return a}function f(){a!==null&&(ot(u``,a),a.remove(),a=null)}function h(ue){n!==ue&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",j),window.addEventListener("resize",O)),n=ue)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",j),window.removeEventListener("resize",O))}function k(ue){let F=ue.target;F&&(e.contains(F)||a!==null&&a.contains(F))||(m(),W())}function O(){W()}function j(ue){ue.key==="Escape"&&(m(),W())}function H(ue){n===ue?m():h(ue),W()}function ae(){m(),W()}async function V(ue,F){if(r.has(ue.key))return;let $e=Fp(ue.key,F);r.set(ue.key,F),i.delete($e),W();let Se=null;try{Se=await(await fetch(ue.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:F})})).json()}catch{Se=null}if(t)return;if(r.delete(ue.key),!Se||Se.ok!==!0){let ne=Se&&typeof Se.error=="string"&&Se.error.length>0?Se.error:"network_error";i.set($e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ne}`}),W();return}let E=Array.isArray(Se.warnings)?Se.warnings.filter(ne=>typeof ne=="string"&&ne.length>0):[];E.length>0&&i.set($e,{kind:"warn",text:E.join(" \xB7 ")}),W(),await ke()}function q(ue,F,$e,Se){let E=Np(ue.pct),he=`resets ${Mp(ue.resetsAt,Se)}${F?` \xB7 ${$e}`:""}`;return u`<span
      class="usage-meter__window ${Pp(E)}"
      style=${`--progress: ${E}%`}
      title=${he}
    >
      <span class="usage-meter__label">${ue.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${E}%</span>
    </span>`}function I(ue,F,$e){let Se=Bp(F,$e),E=F.available&&(F.held||Se>ul),ne=E?`${Math.floor(Se/60)}\uBD84 \uC804 \uCE21\uC815`:"",he=F.accounts.filter(De=>!De.active).length,fe=`usage-meter__group${E?" usage-meter__group--stale":""}`,Oe=u`<span class="usage-meter__provider"
        >${ue.label}</span
      >
      ${F.available?F.windows.map(De=>q(De,E,ne,$e)):u`<span class="usage-meter__empty">사용량 없음</span>`}
      ${he>0?u`<span class="usage-meter__badge">+${he}</span>`:""}`;if(F.accounts.length===0)return u`<span
        class=${fe}
        aria-label=${`${ue.label} usage`}
        >${Oe}</span
      >`;let de=n===ue.key;return u`<button
      type="button"
      class=${`usage-meter__toggle ${fe}`}
      aria-label=${`${ue.label} usage`}
      aria-expanded=${de?"true":"false"}
      aria-controls=${Ip}
      @click=${()=>H(ue.key)}
    >
      ${Oe}
    </button>`}function P(ue,F){return u`<span class="usage-meter" aria-label="Usage">
      ${ue.map($e=>I($e.provider,$e.snapshot,F))}
    </span>`}function U(ue,F){let $e=Np(ue.pct),Se=Mp(ue.resetsAt,F);return u`<span
      class="usage-meter__account-window ${Pp($e)}"
      style=${`--progress: ${$e}%`}
    >
      <span class="usage-meter__account-key">${ue.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${$e}%</span>
      <span class="usage-meter__account-reset"
        >${Se.length>0?`\u21BB ${Se}`:""}</span
      >
    </span>`}function X(ue,F){return _y.includes(F)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ue.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function oe(ue,F,$e){let Se=F.status==="ok",E=typeof F.ageSeconds=="number"&&F.ageSeconds>ul,ne=i.get(Fp(ue.key,F.number)),he=r.get(ue.key),fe=he!==void 0,Oe=he===F.number,de=["usage-meter__account"];return F.active&&de.push("usage-meter__account--active"),Se||de.push("usage-meter__account--unavailable"),E&&de.push("usage-meter__account--stale"),u`<div class=${de.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${F.email}
          >${F.alias===null?F.email:F.alias}</span
        >
        ${F.plan===null?"":u`<span class="usage-meter__account-tag">${F.plan}</span>`}
        ${F.active?u`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${F.ageSeconds===null?"":u`<span class="usage-meter__account-age"
              >${gy(F.ageSeconds)}</span
            >`}
        ${F.active?"":u`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${fe}
              @click=${()=>{V(ue,F.number)}}
            >
              ${Oe?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Se?u`<div class="usage-meter__account-windows">
            ${F.windows.map(De=>U(De,$e))}
          </div>`:u`<div class="usage-meter__account-status">
            ${X(ue,F.status)}
          </div>`}
      ${ne===void 0?"":u`<div
            class="usage-meter__account-message usage-meter__account-message--${ne.kind}"
          >
            ${ne.text}
          </div>`}
    </div>`}function N(ue,F,$e){let Se=F.accounts.filter(E=>E.active).length;return u`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ue.label} · 활성 ${Se} / 전체
        ${F.accounts.length}
      </h2>
      ${F.accounts.map(E=>oe(ue,E,$e))}
    </section>`}function G(ue,F){return u`<div
      class="usage-meter__card"
      id=${Ip}
      role="dialog"
      aria-label=${`${ue.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${N(ue.provider,ue.snapshot,F)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function W(){let ue=Date.now(),F=[];for(let Se of qp){let E=s.get(Se.key);E&&F.push({provider:Se,snapshot:vy(E,ue)})}if(F.length===0){m(),c();return}let $e=F.find(Se=>Se.provider.key===n&&Se.snapshot.accounts.length>0);$e||m(),ot(P(F,ue),e),e.hidden=!1,$e?Q($e,ue):f()}function Q(ue,F){let $e=d(),Se=e.getBoundingClientRect(),E=e.ownerDocument.documentElement.clientWidth;$e.style.setProperty("--usage-meter-anchor-top",`${Se.bottom}px`),$e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,E-Se.right)}px`),ot(u`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${G(ue,F)}`,$e)}async function Ee(ue){try{let F=await fetch(ue.endpoint);return F.ok?yy(await F.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function ke(){l+=1;let ue=l,F=await Promise.all(qp.map(async $e=>({provider:$e,read:await Ee($e)})));if(!(t||ue!==l)){for(let $e of F){let Se=$e.provider.key;if($e.read.kind==="ok"){s.set(Se,$e.read.snapshot);continue}if($e.read.kind==="empty"){s.delete(Se);continue}let E=s.get(Se);E!==void 0&&!E.held&&s.set(Se,{...E,held:!0})}W()}}return c(),ke(),o=setInterval(()=>{ke()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),c()}}}var wy="worker-ineligible";function Yo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Wp(e){return Yo(e).includes(wy)}var ky="worker-serial";function zp(e){return Yo(e).includes(ky)}function Ci(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Kp="bdui.worker.candidate_sort",Vo=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Ri=Object.freeze({preset:"spec"}),Yp=3,Vp=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Hp(e){return Vo.some(t=>t.id===e)}function Gp(e){let t=Vo.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function $y(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Xo(e){return e&&"preset"in e?Gp(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Gp("spec")}function dl(e){return e&&"preset"in e?e.preset:null}function Ar(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Hp(e)?{preset:e}:Ri}return Ar(s)}if(!e||typeof e!="object")return Ri;let t=e;if(Hp(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Yp||!n.every(Bi))return Ri;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=Vo.find(s=>$y(s.chain,r));return o?{preset:o.id}:{chain:r}}function Xp(){try{return Ar(window.localStorage.getItem(Kp))}catch{return Ri}}function pl(e){try{window.localStorage.setItem(Kp,JSON.stringify(e))}catch{}}function Qp(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(as,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:as[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,Yp)}function Zp(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function xy(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Ci(l).filter(c=>t.has(c));n.set(l.id,a);for(let c of a){let d=r.get(c);d?d.push(l):r.set(c,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(c=>o.has(c))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(c=>o.has(c)));i(l??e.find(a=>!o.has(a.id)))}return s}function Jp(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Zl(Xo(t))),xy(n)}function ef(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(c=>typeof c=="string"&&c.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Rs(o[i].scope,o[l].scope);if(a.length===0)continue;let c=o[i].member,d=o[l].member;n.get(c.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:c.id,title:c.title,location_label:c.location_label,prefixes:a})}return n}var tf=new Set(["sh","bash","zsh","dash","ksh"]),nf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function rf(e){let t=e.split("/");return t[t.length-1]||""}function Ay(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=rf(n[0]);if(r!=="env")return tf.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&tf.has(rf(o))}function Sy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Ey(e){let t=[],n=0;nf.lastIndex=0;for(let r of e.matchAll(nf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:Sy(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Ty(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function of(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,c=null,d=!1;function f(I,P){return P?Ey(I).map(U=>U.kind==="plain"?U.text:u`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${U.kind}"
            >${U.text}</span
          >`):I}function h(){if(!o)return u``;let I=s==="ready"&&Ay(i),P=s==="ready"?i.split(`
`):[];return u`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
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
              @click=${()=>V()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${s==="loading"?u`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:s==="error"?u`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:u`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${P.map((U,X)=>u`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${X+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(U,I)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){ot(h(),r)}async function k(){if(s!=="ready")return;let I=await en(i);ve(I?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",I?"success":"error")}function O(I){I.key==="Escape"&&o&&(I.preventDefault(),V())}function j(){d||(document.addEventListener("keydown",O),d=!0)}function H(){d&&(document.removeEventListener("keydown",O),d=!1)}async function ae(I,P=null){let U=++a;j(),o={...I},c=P||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let oe=t?t():"";if(!oe){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let N="/api/repo-ops-script?workspace="+encodeURIComponent(oe)+"&lane="+encodeURIComponent(I.lane)+"&base_sha="+encodeURIComponent(I.base_sha);try{let G=await n(N),W=await G.json().catch(()=>({}));if(U!==a)return;if((t?t():"")!==oe){V();return}if(!G.ok||!W||W.ok!==!0){s="error",l=Ty(W&&typeof W.error=="string"?W.error:""),m();return}o={lane:W.lane,base_sha:W.base_sha,path:W.path,base_ref:W.base_ref},i=String(W.content),s="ready",m()}catch{if(U!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function V(){a+=1,H(),o=null,i="",m();let I=c;c=null,I?.isConnected&&I.focus()}function q(){V(),r.remove()}return{open:ae,close:V,destroy:q}}var sf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Cy=new Set(["queued","running","retry_pending"]);function af(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let N=s();return typeof N.revision=="number"?N.revision:0}function l(N){t&&N&&N.queue&&typeof N.queue=="object"&&t.set(N.queue)}function a(){let N=s().workspace_info;return N&&typeof N=="object"?N:{}}function c(N,G){return u`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${N}"
      >${G}</span
    >`}function d(N){if(typeof N!="number"||!Number.isFinite(N))return"";let G=N/6e4;return Number.isInteger(G)?`timeout ${G}\uBD84`:`timeout ${Math.round(N/1e3)}\uCD08`}function f(N){let G=d(N);return G?c("config",G):""}function h(N,G,W){return u`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${W.script}
      @click=${Q=>{o&&o({lane:N,base_sha:G.base_sha,path:W.script,base_ref:G.base_ref},Q.currentTarget)}}
    ></button>`}function m(){let N=s().repo_operations;return Array.isArray(N)?N:[]}function k(){let N=a().repo_ops,G=N&&typeof N=="object"?N.repo_id:null;return typeof G=="string"&&G?G:null}function O(){return m().some(N=>N&&N.kind==="deploy"&&Cy.has(N.state))}function j(){let N=O(),G=k()===null;return u`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${N||G}
      title=${N?"\uBC30\uD3EC \uC9C4\uD589 \uC911":G?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{P()}}
    >
      배포 실행
    </button>`}function H(){let N=s().repo_ops_opt_out;return{verify:N?.verify===!0,deploy:N?.deploy===!0}}function ae(N,G){return u`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!G}
        @change=${W=>{I(N,!W.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function V(N){let G=typeof N.base_sha=="string"?N.base_sha:"",W=`${N.source_path||"repo-ops/config.toml"} @ ${N.base_ref||"?"}${G?`@${G.slice(0,7)}`:""}`,Q=H(),Ee=!!N.verify&&Q.verify,ke=!!N.deploy&&Q.deploy;return u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          >${N.verify?u`${h("verify",N,N.verify)}
              ${f(N.verify.timeout_ms)}
              ${Ee?c("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:u`선언 없음${c("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ee?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":N.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${N.verify?ae("verify",Q.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ke?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${N.deploy?u`${h("deploy",N,N.deploy)}
              ${f(N.deploy.timeout_ms)}
              ${ke?c("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):j()}`:u`선언 없음${c("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ke?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":N.deploy?u`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${N.deploy?ae("deploy",Q.deploy):""}
      </div>
    </section>`}function q(N){let G=N.repo_ops&&typeof N.repo_ops=="object"?N.repo_ops:null;return G&&(G.status==="resolved"||G.status==="absent")?V(G):G&&(G.status==="pending"||G.status==="error")?u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${G.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":u`선언 읽기
              실패${G.error_code?u` — <code>${G.error_code}</code>`:""}`}
        </div>
      </section>`:u`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function I(N,G){if(!n)return;let W=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:G,expected_revision:i()});if(l(W),W&&W.conflict){let Q=await n("worker-repo-ops-opt-out-toggle",{kind:N,opted_out:G,expected_revision:i()});l(Q)}r()}async function P(){let N=k();if(!n||N===null)return;let G=await n("worker-repo-operation-deploy-run",{repo_id:N});if(l(G),!G||G.ok!==!0){let W=G&&typeof G.reason=="string"?G.reason:"",Q=Object.hasOwn(sf,W)?sf[W]:W||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ve(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${Q}`,"error")}else ve("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let U={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function X(N,G,W){return u`<div class="worker-repo-ops__policy-group" data-policy=${W}>
      <div class="worker-repo-ops__policy-label">${N}</div>
      <ul class="worker-repo-ops__policy-list">
        ${G.map(Q=>u`<li data-token=${Q}>
              ${U[Q]||Q}
            </li>`)}
      </ul>
    </div>`}function oe(){let N=s(),G=N.repo_operation_policy&&typeof N.repo_operation_policy=="object"?N.repo_operation_policy:null;return G?u`<section
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
        ${G.supported===!1?u`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${G.schema_version})`}
            </div>`:""}
        ${X("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",G.worker_automatic||[],"worker-automatic")}
        ${X("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",G.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return u`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${q(a())} ${oe()}
      </details>`}}}var uf=20,Ry=5,Oy=new Set(["failed","running","queued","retry_pending"]),lf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Ly(e,t,n=uf){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Iy(e){if(e.type==="cleanup")return!0;let t=e.operation;return Oy.has(t.state)&&!t.dismissed&&!t.superseded_by}function Dy(e,t,n={}){let r=Ly(e,t,1/0),o=n.expanded===!0?uf:Ry,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Iy(l));return{visible:i,hidden:r.length-i.length}}function cf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function My(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function df(e){let t=e.filter(n=>n.value);return t.length===0?"":u`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Os(n.value):n.value;return u`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function pf(e,t="",n=!1){return!e&&!t?"":u`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?u`<br />${t}`:""}
  </p>`}function Py(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Ny(e,t){let n=rp(e,t),r=op(e);return!n&&!r?"":u`<p class="worker-ev__why">
    ${n?u`<span class="worker-ev__why-line">${n}</span>`:""}${r?u`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function qy(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":u`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Fy(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return u`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${Ms(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${cf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(lf,n.kind)?lf[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${Ds(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${yr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${cf(e)}"
          >${My(e)}</span
        >
        ${n.dismissed?u`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?u`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?u`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?pf(np(n.failure_kind,o)):""}
      ${Ny(n,Py(t,n))}
      ${qy(n)}
      ${df([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Ds(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function jy(e){let t=e.cleanup,n=vr(t.step);return u`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${Ms(e.at)||"\u2014"}</span
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
        ${vu(t.step).map(r=>u`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${pf(sr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${df([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function By(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return u`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?u`<div class="worker-repo-drawer__empty">기록 없음</div>`:u`<ul class="worker-rail">
          ${e.events.map(r=>r.type==="cleanup"?jy(r):Fy(r,e.repo_ops))}
        </ul>`}
    ${t>0||n?u`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function ff(e,t={}){let n=null;function r(){if(n===null){ot(u``,e);return}let i=Dy(n.operations,n.cleanup_failures,{expanded:n.expanded});ot(By({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var Uy="session-preferred",Wy=["exclusive_machine","iterative_user_judgment","visual_verification"];function _f(e,t){if(!Yo(e).includes(Uy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Wy.includes(n)?n:""}var zy=Et("views:worker:adapter"),Hy="tab:worker:ready",Gy="tab:worker:blocked",Ky="tab:worker:in-progress",Yy="tab:worker:resolved",Vy="tab:worker:closed",Xy="\u{1F512} blocked",Qy={revision:0,auto_advance:!1,auto_merge:!1,slots:Qs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Zy=["claude_account","codex_account"],Jy=[...zr,...Zy];function ev(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function tv(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${zs}: ${n}`:zs}function Sr(e){return e&&typeof e=="object"?e:{}}function nv(e){let t={};for(let n of Jy){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function rv(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function mf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Dr(n):null,l=new Map,a={},c=null,d=0,f=null,h=!1;function m(){h||!s||s()}function k(P){return c===P?a:{}}async function O(){if(!r||h)return;let P=o?.()||"";if(c===P||f&&f.key===P&&f.generation===d)return;let U=++d;f={key:P,generation:U};let X=null;try{X=await Promise.resolve(r("get-session-defaults",{}))}catch(oe){if(U!==d)return;f=null,zy("get-session-defaults failed: %o",oe),m();return}U===d&&(a=X&&typeof X.values=="object"&&X.values!==null?{...X.values}:{},c=P,f=null,m())}function j(){c=null,d+=1,O()}function H(){for(let[P,U]of l)U==="failed"&&l.delete(P)}function ae(P,U){return i?i.selectBoardColumn(P,U):[]}function V(P,U,X,oe){let N=Array.isArray(P.queue)?P.queue:[],G=new Set([...N.map(F=>F.bead_id),...(Array.isArray(P.serial_lanes)?P.serial_lanes:[]).flatMap(F=>(Array.isArray(F?.entries)?F.entries:[]).map($e=>$e.bead_id)),...(Array.isArray(P.pr_wait)?P.pr_wait:[]).map(F=>F.bead_id),...(Array.isArray(P.done)?P.done:[]).map(F=>F.bead_id)]),W=new Set(X.map(F=>F.id)),Q=new Set,Ee=[];for(let F of[...U,...X])G.has(F.id)||Q.has(F.id)||ev(F)||(Q.add(F.id),Ee.push(F));let ke=Jp(Ee,Ar(oe)),ue=Sr(P.bead_scope);return ke.map(F=>{let $e=Lr(F),Se=$e.evidence==="published",E=typeof F.workflow?.route=="string"&&F.workflow.route||(F.metadata&&typeof F.metadata.route=="string"?F.metadata.route:""),ne=E==="quick_fix",he=!Object.hasOwn(F,"description")||typeof F.description=="string"&&F.description.trim().length>0,fe=Object.hasOwn(F,"labels")&&Wp(F.labels),Oe=fe||!Object.hasOwn(F,"labels")?"":_f(F.labels,F.metadata),de=F.metadata&&typeof F.metadata=="object"?Object.hasOwn(F.metadata,"awaiting_user"):!1,De=!fe&&!de&&(ne?he:Se&&!$e.conflict),tt=W.has(F.id),st=tt?Ci(F):[],M=[];tt&&st.length===0&&M.push(Xy),de&&M.push(tv(F.metadata)),ne&&!he?M.push("missing_description"):!ne&&$e.conflict?M.push("spec_id_conflict"):!ne&&$e.evidence==="none"?M.push("spec \uC5C6\uC74C"):!ne&&$e.evidence==="draft"&&M.push("spec \uBBF8\uBC1C\uD589(draft)");let le=ue[F.id];return{bead_id:F.id,title:F.title||F.id,route:E,spec_id:$e.conflict?"":$e.path,published:Se,blocked:tt,blocked_by:st,labels:Array.isArray(F.labels)?F.labels:[],created_at:F.created_at,updated_at:F.updated_at,status:F.status,workflow:F.workflow||null,exec_pins:nv(Sr(F.metadata)),rec:null,...le&&Array.isArray(le.scope)?{scope:le.scope}:{},eligible:De,reason:M.join(" \xB7 "),worker_ineligible:fe,session_preferred:Oe.length>0,session_preferred_reason:Oe,release_info:F.release_info,dependents_info:F.dependents_info}})}function q(P){let[U,X,oe,N,G]=P,W=us([...U,...X,...oe,...N,...G]),Q={},Ee=(ke,ue)=>{if(!ke||typeof ke.id!="string"||ke.id.length===0)return;let F=Q[ke.id]||(Q[ke.id]={});if(typeof ke.priority=="number"&&!("priority"in F)&&(F.priority=ke.priority),typeof ke.from_id=="string"&&!("from_id"in F)&&(F.from_id=ke.from_id),ue&&!("metadata"in F)){F.metadata=Sr(ke.metadata);let $e=Sr(ke.workflow).route;typeof $e=="string"&&$e.length>0&&(F.route=$e)}};for(let ke of[...U,...X,...oe])Ee(ke,!0);for(let ke of[...N,...G])Ee(ke,!1);for(let ke of new Set([...Object.keys(Q),...W.keys()])){let ue=ds(W,ke);if(ue.total>0){let F=Q[ke]||(Q[ke]={});F.rollup=ue}}return Q}function I(P,U,X,oe){let N=new Set((Array.isArray(P.done)?P.done:[]).map(W=>W?.bead_id).filter(W=>typeof W=="string")),G=[];for(let W of U){let Q=Qn(W.closed_at);if(typeof W.id!="string"||N.has(W.id)||Q===null||oe!==void 0&&Q<oe||typeof W.comment_count!="number"||W.comment_count<=0)continue;let Ee=`${X}\0${W.id}\0${String(W.updated_at)}\0${W.comment_count}`,ke=l.get(Ee);if(ke===void 0&&r&&(l.set(Ee,"pending"),Promise.resolve(r("get-comments",{id:W.id})).then(F=>{let $e=Array.isArray(F)&&F.some(Se=>_i(typeof Se?.text=="string"?Se.text:"")?.lane==="session");l.set(Ee,$e?"session":"not-session"),m()}).catch(()=>{l.set(Ee,"failed"),m()})),ke!=="session")continue;let ue=Qn(W.started_at);G.push({id:W.id,title:W.title||W.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:ue!==null&&Q>=ue?Q-ue:null,work_kind:"session",done_at:Q,created_at:W.created_at,updated_at:W.updated_at})}return G}return{read(P){if(!t)return{workspaces:[],workspaces_state:[]};let U=t.get()||Qy,X=o?.()||"",oe=P&&typeof P.done_since=="number"?P.done_since:void 0,N=ae(Hy,"ready"),G=ae(Gy,"blocked"),W=ae(Ky,"in_progress"),Q=ae(Yy,"resolved"),Ee=ae(Vy,"closed");return{workspaces:[{...U,bead_titles:{...Sr(U.bead_titles),...Object.fromEntries([...N,...G].filter(ke=>ke&&typeof ke.id=="string").map(ke=>[ke.id,ke.title||ke.id]))},root_dir:X,name:rv(X),runnable:V(U,N,G,P?P.candidate_sort:void 0),session_done:I(U,Ee,X,oe),bead_overlay:q([N,G,W,Q,Ee])}],workspaces_state:[{root_dir:X,revision:U.revision,auto_advance:U.auto_advance,auto_merge:U.auto_merge,slots:typeof Sr(U.workspace_info).slots=="number"?Sr(U.workspace_info).slots:U.slots,runner_catalog:U.runner_catalog,execution_defaults:U.execution_defaults,session_defaults:k(X),orchestration_model:U.orchestration_model,orchestration_effort:U.orchestration_effort,orchestration_speed:U.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){O()},refreshSessionDefaults:j,notifyIssuesChanged:H,destroy(){h=!0,d+=1,f=null,l.clear()}}}var Oi=1,gf=5,ov={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Oi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function sn(e){return e&&typeof e=="object"?e:{}}var yf="beads-ui.worker.candidate-filter",fl={show_blocked:!1,spec:"all"};function sv(){try{let e=window.localStorage.getItem(yf);if(!e)return{...fl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...fl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...fl}}}function iv(e){try{window.localStorage.setItem(yf,JSON.stringify(e))}catch{}}var av=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],vf="bdui.worker.done-range";function lv(){try{let e=window.localStorage.getItem(vf);return e===null?"today":En(e)}catch{return"today"}}function cv(e){try{window.localStorage.setItem(vf,e)}catch{}}function hf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function uv(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function bf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function dv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function pv(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function fv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var _v=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),mv=new Set(["waiting_metadata","reviewing","retrying"]),_l=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function gv(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Wt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function hv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function bv(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=hv(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?xr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!_v.has(e.phase)}}function yv(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function vv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=yv(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(_l.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${uv(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${bf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${bf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function wv(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,c=!0,d=null,f=null,h=null,m={},k=!1,O=!1,j={},H=null,ae={active:!1,failure:null,origin:null}){let V=!!a&&a.position>0,q=!!a?.continuation_action&&a.continuation_action.continuation===null,I=!!a&&a.active===!0,P=a&&a.failure||null,U=pv(a?a.waiting:null),X=n[e]||null,oe=X&&X.gate?X.gate:null,N=X&&X.pr?X.pr:null,G=fv(a?a.resolution:null),W=gv(h),Q=bv(h,W),Ee=a&&a.authority||null,ke=a&&a.review_dispatch||null,ue=a?.hold?.auto_review_wait==="slot"?"slot":null,F=!!h&&typeof h=="object"&&mv.has(h.phase),$e=V&&!I&&(!Ee||F||Ee.source==="automatic"&&!O),Se=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":G?G.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":U,E=!!oe&&oe.base_badge==="\uCDA9\uB3CC",ne=!!oe&&oe.enabled===!0,he=So({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:j.repo_operations}),fe=Vs(he),Oe=s&&!he&&(s.queueing??null)?s.queueing:null,de=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!oe&&oe.tier==="merged",De=r&&r.step==="repo_operations"&&he?.failed===!0&&(he.step==="deploy"||he.step==="verify")?he.step:null,tt=l&&!!r&&!!oe&&oe.tier==="merged",st=$e&&(ne||E||oe?.reason==="base_behind"||_l.has(oe?.reason)||de||tt),M=_l.has(oe?.reason),le=l&&E&&c===!1,se=zn(m,e,{external:l,merge_active:I||he?.step==="merge",merge_queued:V,conflict_active:!!i,cleanup_active:fe,merged:!!r||oe?.tier==="merged"}),pe=!!se.operation,xe=V&&!P&&!q&&!de&&!(Q&&Q.lock_actions),ie=vv({auto_pending:xe,continuation_required:q,queueing:Oe,merge_step:he,conflict_badge:Se,conflict_live:G?.live===!0||i==="running",auto_resolution:W,recovery:Q,cleanup_failed:r,cleanup_label:r?vr(r.step):null,base_exception:f,conflicting:E,gate:oe,receipt_check:X&&X.receipt_check?X.receipt_check:null,queue_failure:P,auto_skip:d,queued:V,queue_active:I,queue_position:a?a.position:0,review_session:ae,review_dispatch:ke,auto_review_wait:ue,activity:Se?null:s&&s.activity||null}),qe=ie?.live===!0&&ie.title?u`<span title=${ie.title}>${ie.label}</span>`:ie?.label||null;return{id:e,title:l?u`${t}<span class="muted"> · 세션</span>`:t,reason:r&&he?.active!==!0?Ys(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...H?{dependency_chips:H}:{},external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:ie?.live!==!0&&ie?.title?ie.label:null,completion_title:ie?.title||"",...h?.phase==="needs_human"&&typeof h.log_path=="string"&&h.log_path.length>0?{log_path:h.log_path}:{},badges:qe?[qe]:[],live_badge:ie?.live===!0?qe:null,usage:o,alert:ie?.alert===!0,merge_action:oe?.tier==="merged"&&!de&&!tt?!1:!V||q||$e||M,cancel_action:V&&!q,cancel_enabled:!I&&!(Q&&Q.lock_actions),cancel_title:Q&&Q.lock_actions?`${Q.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:I?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:se,discard_action:se.action,merge_step:he,discard_enabled:se.enabled,discard_title:se.title,merge_enabled:!he&&!Oe&&!i&&!pe&&!f&&!(Q&&Q.lock_actions)&&!le&&ae.active!==!0&&(ne||E||oe?.reason==="base_behind"||M||de||tt||st||F&&!I),merge_label:q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":de||tt?De==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":De==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":E&&!he&&!de?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":oe?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":M?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":$e?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:pe?se.error?`\uD3D0\uAE30 \uC2E4\uD328: ${se.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${se.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Oe?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":he?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${he.label}`:De?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${De==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:tt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":le?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":de?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":E?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":oe?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":ae.active===!0?ae.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":oe?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":oe?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":oe?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":oe?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":oe?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ne?`\uBA38\uC9C0 (${oe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:oe&&oe.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${oe&&oe.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ml(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:c,doneRange:d,onDoneRangeChange:f}=t,h=r?Dr(r):null,m=sv(),k=null,O=null,j=Ur(()=>ee()),H=new Map,ae=new Map,V=Xp(),q=dl(V)===null,I=d?En(d):lv();function P(){let g=Tr.find(b=>b.value===I);return g?g.label:"\uC624\uB298"}let U=wi("beads-ui.worker.lane-collapsed"),X=!1,oe=new Set,N=new Set,G=new Set,W=new Set,Q=new Set,Ee=null,ke=[],ue=mf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>ee()});function F(){ue.refreshSessionDefaults()}let $e=document.createElement("div");$e.className="worker-console";let Se=document.createElement("div");Se.className="worker-top";let E=document.createElement("div");E.className="worker-drawer-overlay",E.hidden=!0;let ne=document.createElement("div");ne.className="worker-drawer-overlay__backdrop";let he=document.createElement("div");he.className="worker-drawer-host";let fe=document.createElement("div");fe.className="worker-drawer-host",fe.hidden=!0,E.append(ne,he,fe);let Oe=document.createElement("div");Oe.className="worker-lanes-host",$e.append(Se,E,Oe),e.appendChild($e);let de=rr(null,null),De=[],tt=$i({transport:n,console_el:$e,getLanes:()=>de,getWorkspaces:()=>De,getCrossLanes:()=>null,reproject:()=>({lanes:R(),raw_lanes:null}),onCorrection:()=>{},showToast:ve,requestRender:()=>ee(),adoptQueue:(g,b)=>{o&&o.set(b)},onDragBegin:()=>{k=null}}),st=null,M=Jr(he,{transport:n,sessionLogStore:s,onClose:()=>{st=null,E.hidden=!0,ee()}}),le=ff(fe,{onClose:()=>{fe.hidden=!0,E.hidden=!0,ee()}}),se=of({getWorkspacePath:l||(()=>"")}),pe=l&&l()||"",xe=af({queueStore:o,transport:n,onChanged:()=>ee(),onOpenScript:(g,b)=>{se.open(g,b)}});function ie(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Oi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function qe(){let g=ie(),b=typeof g.serial_lane_count=="number"&&Number.isInteger(g.serial_lane_count)&&g.serial_lane_count>0?Math.min(g.serial_lane_count,5):0,S=Array.isArray(g.serial_lanes)?g.serial_lanes:[],re=[];for(let Ce of S){if(re.length>=b)break;!Ce||typeof Ce.id!="string"||!/^s[1-5]$/.test(Ce.id)||!Array.isArray(Ce.entries)||re.push({id:Ce.id,label:`\uC9C1\uB82C ${Ce.id.slice(1)}`,count:Ce.entries.length})}return re.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(g.queue)?g.queue:[]).length},...re]}function Ge(g){if(!k||!g.some(S=>S.id===k))return null;let b=qe();return b?{bead_id:k,lanes:b}:null}function Xe(){return l&&l()||""}async function Pe(g,b){await tt.sendOp({type:"worker-queue-place",payload:{bead_id:g,...b==="parallel"?{}:{lane:b}},root_dir:Xe()},g)}function Y(){let g=ie();return typeof g.revision=="number"?g.revision:0}function B(g){g&&g.queue&&o&&o.set(g.queue)}async function Ne(g){if(!n||!g)return;let b=await n("worker-attempt-pause",{attempt_id:g});b&&b.paused===!1&&b.reason&&ve(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function at(g,b="session"){if(!n||!g)return;let S=await qr();if(S===null)return;let re=async(Ce={})=>await n("worker-attempt-resume",{attempt_id:g,expected_revision:Y(),...S!==""?{instructions:S}:{},...Ce}),ye=await re();B(ye),ye&&ye.conflict&&(ye=await re(),B(ye)),ye=await Fn(ye,(Ce,Ke)=>re({continuation:Ce,decision_token:Ke}),{onResult:B,refresh:()=>re()}),ye&&ye.resumed===!1&&!ye.conflict&&ye.reason&&ve(`${b==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${ye.reason}`,"error",2400)}async function Qe(g,b,S=!0){if(!n)return null;let re=n,ye=await re(g,{...b,expected_revision:Y()});return B(ye),ye&&ye.conflict&&S&&(ye=await re(g,{...b,expected_revision:Y()}),B(ye)),ye}async function y(g){if(!n||!g)return;let b=ie().merge_queue?.find(re=>re.bead_id===g)?.continuation_action;if(b?.mismatch&&b.continuation===null){await Fe(g,b.mismatch);return}oe.add(g),ee();let S;try{S=await Qe("worker-merge-queue-add",{bead_id:g})}catch{ve("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{oe.delete(g),ee()}if(!(!S||S.applied)){if(S.conflict){ve("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ve(dv(S.reason),"error",2400)}}async function z(g){if(!(!n||!g||N.has(g))){N.add(g),ee();try{let b=await n("worker-cleanup-retry",{bead_id:g,expected_revision:Y()});B(b),b&&!b.retried&&!b.conflict&&b.reason&&ve(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${b.reason}`,"error",2400)}finally{N.delete(g),ee()}}}async function Te(g,b){let S=ie().hold;if(!n||!S||typeof S.since!="number")return;let re=await n(g,{since:S.since});B(re),re&&re.ok===!1&&ve(`${b}: ${re.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":re.reason||""}`,"error",2800)}async function Re(g,b){if(!n||!g||!b)return;let S=await n("worker-parked-retry",{bead_id:g,attempt_id:b});B(S),S&&S.ok===!1&&ve(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${S.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":S.reason||""}`,"error",2800)}async function Fe(g,b){let S=await Fn({continuation_mismatch:b},(ye,Ce)=>Qe("worker-merge-queue-add",{bead_id:g,continuation:ye,decision_token:Ce},!1)),re=S?.queue?.merge_queue?.find(ye=>ye.bead_id===g)?.continuation_action;if(S?.applied!==!0&&re?.continuation===null&&re.mismatch){await Fe(g,re.mismatch);return}S&&S.applied===!1&&!S.conflict&&ve("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ye(g){if(!n)return;let b=await Qe("worker-merge-auto-toggle",{on:g});!b||b.conflict||ve(g?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",g?"success":"info",2400)}async function dt(g){if(!n||!g)return;let b=await Qe("worker-merge-queue-remove",{bead_id:g});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&ve("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function vt(){await Qe("worker-merge-queue-remove",{all:!0})}async function Lt(g,b=null,S="unmerged",re=null){if(!n||!g)return;let ye=$o(g,S);if(!(!!re||typeof globalThis.confirm!="function"||globalThis.confirm(ye)))return;let Ke=await n("worker-discard",{bead_id:g,...b?{attempt_id:b}:{},...re?{operation_id:re}:{},expected_revision:Y()});if(B(Ke),Ke&&Ke.conflict&&(Ke=await n("worker-discard",{bead_id:g,...b?{attempt_id:b}:{},...re?{operation_id:re}:{},expected_revision:Y()}),B(Ke)),Ke&&Ke.discarded===!0){ve(Ps(Ke),"success",5e3);return}if(Ke&&Ke.reason){ve(`\uD3D0\uAE30 \uC2E4\uD328: ${Ke.reason}`,"error",2800);return}if(Ke&&Ke.accepted&&Ke.pending==="merged_revert"){ve("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ke&&Ke.accepted&&!Ke.discarded){ve(`\uD3D0\uAE30 \uC9C4\uD589: ${Ke.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ke&&!Ke.conflict&&ve("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function St(g,b,S){if(!(!n||!b||!S||W.has(b))){W.add(b),ee();try{let re=await n(g,{bead_id:b,action_id:S,expected_revision:Y()});B(re),re?.conflict?ve("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!re?.ok&&re?.reason&&ve(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(re.reason)}`,"error",2800)}finally{W.delete(b),ee()}}}async function ht(g,b){if(!n||!b||G.has(b))return;G.add(b),ee();let S;try{let re=async(ye={})=>await n(g,{bead_id:b,expected_revision:Y(),...ye});S=await re(),B(S),S&&S.conflict&&(S=await n(g,{bead_id:b,expected_revision:Y()}),B(S)),g==="worker-revise-fix"&&(S=await Fn(S,(ye,Ce)=>re({continuation:ye,decision_token:Ce}),{onResult:B,refresh:()=>re()}))}finally{G.delete(b),ee()}if(!(!S||S.conflict)){if(S.ok){ve(g==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ve(`\uCC98\uBD84 \uAC70\uBD80: ${S.reason||""}`,"error",3e3)}}async function Be(g){if(!n)return;let b=await n("worker-automation-toggle",{on:g,expected_revision:Y()});B(b),b&&b.conflict&&await n("worker-automation-toggle",{on:g,expected_revision:Y()}).then(B)}async function D(g){if(!n||!g)return;let b=await n("worker-repo-operation-dismiss",{operation_id:g});B(b),b&&b.ok===!1&&ve(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${b.reason||""}`,"error",3e3)}async function te(g){if(!n||!Number.isFinite(g))return;let b=Math.max(Oi,Math.floor(g)),S=await n("worker-queue-set-slots",{slots:b,expected_revision:Y()});B(S),S&&S.conflict&&await n("worker-queue-set-slots",{slots:b,expected_revision:Y()}).then(B)}async function be(g){if(!n||!Number.isInteger(g)||g<1||g>gf)return;let b=ie(),S=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).slice(g).reduce((Ce,Ke)=>Ce+(Array.isArray(Ke?.entries)?Ke.entries.length:0),0),re=()=>({count:g,expected_revision:Y()}),ye=await n("worker-queue-set-serial-lane-count",re());B(ye),ye&&ye.conflict&&(ye=await n("worker-queue-set-serial-lane-count",re()),B(ye)),ye&&ye.applied&&S>0&&ve(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${S}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function R(){let g=mr(I),b=ue.read({candidate_sort:V,done_since:g});return De=b.workspaces,de=rr(b.workspaces,b.workspaces_state,{done_since:g,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),de}function K(g){return g.queue_groups[0]||ov}function Ie(g){let b=g.dependency_chips||null,S={...b&&b.released?{released:b.released}:{},...b&&b.dependents?{dependents:b.dependents}:{}},re=H.get(g.id),ye=ae.get(g.id)||null,Ce=re&&re.overlaps.length>0?re.overlaps:null,Ke=!!re&&re.scope_missing;return!ye&&!Ce&&!Ke&&Object.keys(S).length===0?null:{...S,...ye?{predecessors:ye}:{},...Ce?{overlaps:Ce}:{},...Ke?{scope_missing:!0}:{}}}function We(g){return{...g,workspace_name:"",done_layout:void 0,dependency_chips:Ie(g)||void 0,chip_popover:Me(g)}}function Me(g){return Ws(g,b=>j.isOpen({bead_id:g.id,chip_key:b}))}function Je(){let g=ie(),b=new Map;for(let S of Object.values(sn(g.lane_states))){let re=Array.isArray(S?.corrections)?S.corrections:[];for(let ye of re)ye&&typeof ye.bead_id=="string"&&typeof ye.after=="string"&&b.set(ye.bead_id,ye.after)}return{admission:sn(g.admission),bead_labels:sn(g.bead_labels),correction_after:b}}function Le(g,b){let S=We(g),re=_u(b.admission[g.id]||null,!!g.discard||W.has(g.id)),ye=b.bead_labels[g.id],Ce=b.correction_after.get(g.id);return{...S,draggable:S.draggable===!0&&!re,stale_work:re,reason:re?"":S.reason,worker_serial:Array.isArray(ye)&&zp(ye),badges:Ce?[`\u{1F517} ${Ce} \uB4A4 (blocks \uC790\uB3D9)`,...S.badges||[]]:S.badges,revise_enabled:S.revise_enabled===!0&&!G.has(g.id)}}function ze(g){let b=Je();return K(g).sublanes.parallel.map(S=>Le(S,b))}function Ze(g){let b=Je();return K(g).sublanes.serial.map(S=>{let re=S.occupants.map(ye=>({id:ye.id,title:ye.title,draggable:!1,lane:S.id,ghost:!0,badges:[ye.badge]}));return{id:S.id,index:S.index+1,raw_length:S.raw_length,ghosts:re,items:S.items.map(ye=>Le(ye,b)),occupied:S.occupied_by.length>0,badge:S.occupants.length>0?S.occupants[0].badge:"\uB300\uAE30",cycle:S.cycle===!0}})}function ft(g){return g.runnable.map(b=>We(b))}function He(g){return g.done.map(b=>We(b))}function kt(g){let b=g.running.filter(S=>S.non_occupying!==!0).map(S=>({...S,bead_id:S.id,attempt_id:S.attempt_id||"",paused:S.run_state==="paused",failed:S.run_state==="failed",parked:S.run_state==="parked",retry_wait:S.run_state==="retry_wait",status_label:S.run_state==="failed"?S.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":S.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":S.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":void 0,can_pause:S.can_pause!==!1,workspace_name:"",dependency_chips:Ie(S)||void 0,chip_popover:Me(S),rollup_expanded:Q.has(S.id),failure:S.failure?{...S.failure,open:O===S.attempt_id}:null}));return[...b.filter(S=>S.failed===!0),...b.filter(S=>S.failed!==!0&&S.parked===!0),...b.filter(S=>S.failed!==!0&&S.parked!==!0)]}function Nt(g){if(Ee&&Ee.model===g)return Ee.rows;let b=ie(),S=K(g),re=sn(b.attempts),ye=Object.values(re).filter(Un),Ce=new Map;for(let Ue of ye)Ce.set(Ue.attempt_id,Ue);let Ke=new Map;for(let Ue of ye)Ke.set(Ue.bead_id,Ue);let bt=new Map;for(let Ue of[...g.pr_wait,...g.running,...g.queue,...g.runnable,...g.done])bt.has(Ue.id)||bt.set(Ue.id,Ue);let Ft=Ue=>{let Dt=null;for(let _n of ye)!_n||_n.bead_id!==Ue||Aa(_n,Ce)||(Dt===null||(typeof _n.started_at=="number"?_n.started_at:0)>=(typeof Dt.started_at=="number"?Dt.started_at:0))&&(Dt=_n);return Dt&&typeof Dt.target_base=="string"?Dt.target_base:null},Gt=new Map;for(let Ue of g.running)Ue.run_state==="failed"||Ue.conflict_resolution!==!0||(Ue.run_state!=="paused"?Gt.set(Ue.id,"running"):Gt.has(Ue.id)||Gt.set(Ue.id,"paused"));let fn=sn(b.auto_merge_skips),lr=new Set(S.merge.auto_excluded),Sn=sn(b.pr_observations),On=sn(b.pr_activity),Ln=sn(b.cleanup_failed),Kt=sn(b.discard_operations),Vn=sn(b.bead_workflow),In=sn(b.bead_titles),Xn=b.merge_queue_state||{active:null,failures:{}},Dn=S.merge.state.waiting,Mn=new Map;for(let Ue of Array.isArray(b.merge_queue)?b.merge_queue:[])Ue&&typeof Ue=="object"&&Ue.bead_id&&Mn.set(Ue.bead_id,Ue);let cr=(Array.isArray(b.pr_wait)?b.pr_wait:[]).map(Ue=>{let Dt=bt.get(Ue.bead_id);return{...wv(Ue.bead_id,Dt?.title||In[Ue.bead_id]||Ue.bead_id,Sn,Ln[Ue.bead_id]||null,Bn(re,Ue.bead_id),On[Ue.bead_id]||(oe.has(Ue.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:N.has(Ue.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Gt.get(Ue.bead_id)||null,Ue.external===!0,{position:S.merge.positions.get(Ue.bead_id)||0,active:Xn.active===Ue.bead_id,failure:sn(Xn.failures)[Ue.bead_id]||null,waiting:Dn&&Dn.bead_id===Ue.bead_id?Dn.reason:null,resolution:S.merge.resolutions.get(Ue.bead_id),continuation_action:S.merge.continuations.get(Ue.bead_id),authority:S.merge.authorities.get(Ue.bead_id)||null,hold:Mn.get(Ue.bead_id)?.hold||null,review_dispatch:Mn.get(Ue.bead_id)?.review_dispatch||null},Ue.wt_present!==!1,b.auto_merge===!0&&lr.has(Ue.bead_id)?fn[Ue.bead_id]?.reason||"":null,xa(S.declared_base,Ft(Ue.bead_id)),sn(b.completion_status)[Ue.bead_id]||null,Kt,Ke.get(Ue.bead_id)?.worker_serial===!0,b.auto_merge===!0,{merge_sha:Ue.merge_sha,cleanup_cursor:Ue.cleanup_cursor,repo_operations:S.repo_operations},Dt?Ie(Dt):null,uu(re,Ue.bead_id)),workflow:Vn[Ue.bead_id]||null,priority:Dt?.priority,from_id:Dt?.from_id,...Dt?.created_at===void 0?{}:{created_at:Dt.created_at},...Dt?.updated_at===void 0?{}:{updated_at:Dt.updated_at}}});return Ee={model:g,rows:cr},cr}function nt(g){let b=K(g),S=[];for(let Ce of g.running)Ce.non_occupying!==!0&&S.push({id:Ce.id,title:Ce.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ce.serial_lane_id??null});for(let Ce of g.pr_wait)S.push({id:Ce.id,title:Ce.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ce of b.sublanes.serial)Ce.items.forEach((Ke,bt)=>{S.push({id:Ke.id,title:Ke.title,location_label:`${Ce.id} #${bt+1}`,kind:"serial",lane_id:Ce.id})});b.sublanes.parallel.forEach((Ce,Ke)=>{S.push({id:Ce.id,title:Ce.title,location_label:`#${Ke+1}`,kind:"parallel",lane_id:null})});for(let Ce of g.runnable)S.push({id:Ce.id,title:Ce.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ce.queue_placeable===!0});let re=ie();H=ef(re.bead_scope,S);let ye=new Map;for(let Ce of[...g.running,...g.runnable])Array.isArray(Ce.blocked_by)&&Ce.blocked_by.length>0&&ye.set(Ce.id,Ce.blocked_by);for(let[Ce,Ke]of Object.entries(sn(re.bead_blocked_by)))Array.isArray(Ke)&&ye.set(Ce,Ke.filter(bt=>typeof bt=="string"&&bt.length>0));ae=xu(ye,S,sn(re.blocker_workspaces))}function Tt(g){let b=g.hold&&typeof g.hold=="object"?g.hold:null;if(!b||b.kind!=="env"&&b.kind!=="systemic")return"";let S=sr(b.cause)||String(b.cause||""),re=Array.isArray(g.lineages)?g.lineages:[];if(b.kind==="env"){let Ce=re.map(bt=>bt&&bt.next_at).filter(bt=>typeof bt=="number").sort((bt,Ft)=>bt-Ft)[0],Ke=typeof Ce=="number"?` \xB7 \uB2E4\uC74C ${new Date(Ce).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return u`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${S} — 재시도 대기${Ke}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let ye=(Array.isArray(b.bead_ids)?b.bead_ids:[]).filter(Ce=>typeof Ce=="string"&&Ce.length>0);return u`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${S}${ye.length>0?` \u2014 bead ${ye.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function xt(g){let b=ie(),S=K(g),re=S.sublanes.parallel,ye=re.length>0?re[0].id:"\u2014",Ce=u`<button
      type="button"
      class="worker-play${b.auto_advance?" is-active":""}"
    >
      ${b.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ke=Ut(g),bt=S.over_cap?u`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ft=b.auto_advance?0:(Array.isArray(b.queue)?b.queue:[]).filter(Kt=>Kt&&typeof Kt.armed_by_lane=="string"&&Kt.armed_by_lane.length>0).length,Gt=Ft>0?u`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Ft}건 진행 중</span
          >`:"",fn=u`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${S.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Nt(g).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${P()} 완료 <b>${g.done.length}</b></span
      >`,lr=u`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${S.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${S.declared_base||"?"}</span
    >`,Sn=u`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Oi}
          step="1"
          .value=${String(S.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:gf},(Kt,Vn)=>Vn+1).map(Kt=>u`<option
                value=${String(Kt)}
                ?selected=${S.serial_lane_count===Kt}
              >
                ${Kt}
              </option>`)}
        </select>
      </label> `,On=pu(S.repo_operations,S.cleanup_failures),Ln=Tt(b);return X?u`<div class="worker-ribbon">
          ${Ce} ${Ke}
          <div class="worker-kpi worker-kpi--ribbon">
            ${bt}${Gt}${fn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Sn}</div>
          <div class="worker-kpi">${lr}</div>
        </div>
        ${Ln}${On}${xe.template()}`:u`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${Ce}${Ke}${Sn}</div>
        <div class="worker-kpi">
          ${bt}${Gt}${fn}${lr}
          ${(Array.isArray(S.token_total)?S.token_total:S.token_total?[{label:S.token_total,tooltip:`${P()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Kt=>u`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Kt.tooltip}
                >${P()} 완료 · 누적 ${Kt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ye}</b></span
          >
        </div>
      </div>
      ${Ln}${On}${xe.template()}`}function Ct(g){let b=g.runnable_hidden;return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${av.map(S=>u`<button
              type="button"
              class="worker-filter__chip${m.spec===S.value?" is-active":""}"
              data-spec=${S.value}
              aria-pressed=${m.spec===S.value?"true":"false"}
            >
              ${S.label}
            </button>`)}
        ${b.spec>0?u`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function qt(){let g=q?"custom":dl(V)||"custom";return u`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${g}
    >
      ${Vo.map(b=>u`<option value=${b.id} ?selected=${g===b.id}>
            ${b.label}
          </option>`)}
      <option value="custom" ?selected=${g==="custom"}>
        사용자 지정…
      </option>
    </select>`}function an(){let g=Xo(V);return u`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(b=>{let S=g[b];return u`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${b}
            aria-label=${`${b+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${S?S.key:""}
          >
            ${b===0?"":u`<option value="" ?selected=${!S}>없음</option>`}
            ${Vp.map(re=>u`<option
                  value=${re.key}
                  ?selected=${!!S&&S.key===re.key}
                >
                  ${re.label}
                </option>`)}
          </select>
          ${S?u`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${b}
                aria-label=${S.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${S.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${S.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Bt(){return u`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${I}
      >
        ${Tr.map(g=>u`<option value=${g.value} ?selected=${I===g.value}>
              ${g.label}
            </option>`)}
      </select>
    </div>`}function Ut(g){let b=K(g).merge,S=ie().auto_merge===!0;if(b.running)return u`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${S?" is-active":""}"
        title=${S?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${S?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${b.positions.size}
      </button>`;if(S)return u`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let re=new Set(b.auto_excluded),ye=Nt(g).filter(Ce=>Ce.merge_action&&Ce.merge_enabled&&!re.has(Ce.id)).length;return u`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ye>0?` ${ye}`:""}
    </button>`}function It(g){if(!(g.draggable!==!0||g.done===!0))return u`<span class="worker-mini__rowops">
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
    </span>`}function Pt(g,b){return u`<div
      data-bead-id=${g.id}
      data-drag-kind=${b.kind}
      data-root-dir=${b.root_dir}
      data-lane-id=${Qt(b.lane_id)}
      data-row-index=${b.row_index}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${vn(g,{actions:It(g)})}
    </div>`}function Zt(g){let b=ze(g),S=Xe();return Hs({parallel:{rows:b.map((re,ye)=>Pt(re,{kind:"parallel",root_dir:S,row_index:ye})),count:b.length,collapsed:U.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:S}},serial:{lanes:Ze(g).map(re=>({id:re.id,title:`\uC9C1\uB82C ${re.index}`,rows:[...re.ghosts.map(ye=>vn(ye,{actions:It(ye)})),...re.items.map((ye,Ce)=>Pt(ye,{kind:"repo-serial",root_dir:S,row_index:Ce,lane_id:re.id}))],count:re.ghosts.length+re.items.length,empty:re.ghosts.length+re.items.length===0,badge:re.badge,held:re.occupied,cycle:re.cycle,drop:{drop:"repo-serial",root_dir:S,lane_id:re.id,lane_length:String(re.raw_length)}})),collapsed:U.isAreaCollapsed("serial")}})}function zt(g){return ip(kt(g),Date.now(),st)}function wt(g){return g.running.some(b=>b.kind!=="session"&&b.run_state==="running")}function Xt(g){let b=K(g),S=ft(g),re=ze(g),ye=He(g),Ce=Nt(g),Ke=kt(g),bt=Rn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:S,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:qt(),header_row:q?an():void 0,controls:Ct(g),collapsible:!0,collapsed:U.isCollapsed("candidate"),place_menu:Ge(S),onOpenDoc:c?(Gt,fn)=>c(fn):void 0}),Ft=Rn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ye,empty:`${P()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Bt(),collapsible:!0,collapsed:U.isCollapsed("done"),preview:X?Array.isArray(b.token_total)?b.token_total.map(Gt=>Gt.label).join(" \xB7 "):b.token_total||hf(ye):void 0});return X?u`<div class="worker-lanes worker-lanes--mobile">
        ${Gs({live:wt(g),running_body:Ke.length>0?zt(g):"",pr_wait_rows:Ce.map(Gt=>vn(Gt)),count:Ke.length+Ce.length})}
        ${Rn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:re,count:re.length,collapsible:!0,collapsed:U.isCollapsed("queue"),preview:hf(re),body:Zt(g)})}
        ${bt} ${Ft}
      </div>`:u`<div class="worker-lanes">
      ${bt}
      ${Rn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:re,count:re.length,collapsible:!0,collapsed:U.isCollapsed("queue"),body:Zt(g)})}
      ${Rn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ke,header_control:u`<span class="worker-pane__meta"
          >슬롯 ${b.slots}</span
        >`,live:wt(g),collapsible:!0,collapsed:U.isCollapsed("running"),body:zt(g)})}
      ${Rn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Ce,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:U.isCollapsed("pr_wait")})}
      ${Ft}
    </div>`}function we(g){U.toggle(g),ee()}function T(g){U.toggleArea(g),ee()}function ee(){let g=R();nt(g),ot(xt(g),Se),ot(Xt(g),Oe)}function v(){let g=!0,b=vi(S=>{if(X=S,g){g=!1;return}ee()});ke.push(b)}function p(g){m=g,iv(g),ee()}function _(g){if(g==="custom"){q=!0,ee();return}V=Ar(g),pl(V),q=!1,ee()}function A(g){V=Ar({chain:g}),pl(V),ee()}function L(g){I=En(g),cv(I),f?.(I),ee()}function Z(g){let b=g.target?.closest?.(".worker-serial-lane-count");if(b){let Ft=Number.parseInt(b.value,10);Number.isFinite(Ft)&&be(Ft).then(ee);return}let S=g.target?.closest?.(".worker-filter__blocked");if(S){p({...m,show_blocked:S.checked});return}let re=g.target?.closest?.(".worker-sort-chain__key");if(re){let Ft=Number.parseInt(re.getAttribute("data-step")||"",10);Number.isFinite(Ft)&&A(Qp(Xo(V),Ft,re.value));return}let ye=g.target?.closest?.(".worker-done-range");if(ye){L(ye.value);return}let Ce=g.target?.closest?.(".worker-sort");if(Ce){_(Ce.value);return}let Ke=g.target?.closest?.(".worker-slots__input");if(!Ke)return;let bt=Number.parseInt(Ke.value,10);if(!Number.isFinite(bt)){ee();return}te(bt).then(ee)}function ce(g){return g?{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,worktree:g.worktree||void 0,status:g.status||void 0,session_id:g.session_id||void 0}:{}}function me(){let g=K(R()),b=ie().workspace_info,S=b&&typeof b=="object"&&b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return{operations:g.repo_operations,cleanup_failures:g.cleanup_failures,repo:l&&l()||"",repo_ops:S}}function ge(){st&&M.close(),fe.hidden=!1,E.hidden=!1,le.open(me()),ee()}function it(g){let b=ie(),S=b.attempts?b.attempts[g]:null;st=g,le.close(),fe.hidden=!0,E.hidden=!1,M.open({attempt_id:g,meta:ce(S)}),ee()}function ut(g){let b=ie(),S=(Array.isArray(b.session_active)?b.session_active:[]).find(ye=>ye&&ye.bead_id===g),re=(S&&Array.isArray(S.session_refs)?S.session_refs:[]).find(ye=>ye&&ye.current===!0);re&&(le.close(),fe.hidden=!0,E.hidden=!1,M.open(Fr(re,g,"in_progress")),ee())}function Ht(){if(le.isOpen()&&le.refresh(me()),!st)return;let g=ie(),b=g.attempts?g.attempts[st]:null;if(b){M.updateMeta(ce(b));return}M.close()}function _t(g,b){if(g.length===0||!i)return;let S=l?l():void 0;if(b.length===0||!S||b===S||!a){i(g);return}Promise.resolve(a(b)).then(()=>{i(g)}).catch(()=>{ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function x(g){let b=g.target;if(b?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let S=b?.closest?.(".worker-sort-chain__dir");if(S){let $=Number.parseInt(S.getAttribute("data-step")||"",10);Number.isFinite($)&&A(Zp(Xo(V),$));return}let re=b?.closest?.(".worker-dep__open");if(re){_t(re.getAttribute("data-dep-id")||"",re.getAttribute("data-root-dir")||"");return}let ye=b?.closest?.(".judgement-chip");if(ye){let $=ye.closest("[data-bead-id]"),_e=$&&$.getAttribute("data-bead-id")||"",je=ye.getAttribute("data-chip-key")||"";_e&&je&&j.toggle({bead_id:_e,chip_key:je});return}if(b?.closest?.(".chip-popover"))return;if(b?.closest?.(".worker-repo-strip")){ge();return}let Ce=b?.closest?.(".worker-repo-op__dismiss");if(Ce){D(Ce.dataset.operationId||"");return}let Ke=b?.closest?.(".worker-cleanup__resume");if(Ke){let $=Ke.dataset.beadId;$&&z($);return}if(b?.closest?.(".worker-hold__retry")){Te("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(b?.closest?.(".worker-hold__resume")){Te("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(b?.closest?.(".worker-play")){Be(!ie().auto_advance);return}let bt=b?.closest?.(".worker-merge-all");if(bt){bt.classList.contains("worker-merge-all--stop")?ie().auto_merge===!0?Ye(!1):vt():Ye(!0);return}let Ft=b?.closest?.(".worker-pane__toggle[data-lane]");if(Ft){let $=Ft.dataset.lane;($==="candidate"||$==="queue"||$==="running"||$==="pr_wait"||$==="done")&&we($);return}let Gt=b?.closest?.(".worker-wait__area-toggle[data-area]");if(Gt){let $=Gt.dataset.area;($==="parallel"||$==="serial")&&T($);return}let fn=b?.closest?.(".worker-card__place-lane");if(fn){let $=fn.dataset.beadId,_e=fn.dataset.lane;$&&(_e==="parallel"||/^s[1-5]$/.test(_e||""))&&(k=null,ee(),Pe($,_e));return}if(b?.closest?.(".worker-card__place-cancel")){k=null,ee();return}let Sn=b?.closest?.(".worker-card__place");if(Sn){let $=Sn.dataset.beadId;$&&!Sn.disabled&&(qe()?(k=$,ee()):Pe($,"parallel"));return}let On=b?.closest?.(".worker-filter__chip");if(On){let $=On.dataset.spec;($==="all"||$==="with"||$==="without")&&p({...m,spec:$});return}let Ln=b?.closest?.('[data-action="queue-remove"]');if(Ln){let $=Ln.dataset.beadId||"";$&&tt.sendOp({type:"worker-queue-remove",payload:{bead_id:$},root_dir:Xe()},$);return}let Kt=b?.closest?.(".worker-mini__merge");if(Kt){let $=Kt.dataset.beadId||"";ie().cleanup_failed?.[$]?z($):y($);return}let Vn=b?.closest?.(".worker-mini__merge-cancel");if(Vn){dt(Vn.dataset.beadId||"");return}let In=b?.closest?.(".worker-mini__discard");if(In){Lt(In.dataset.beadId||"",In.dataset.attemptId||null,In.dataset.discardMode==="merged"?"merged":"unmerged",In.dataset.operationId||null);return}let Xn=b?.closest?.(".worker-mini__stale-continue");if(Xn){St("worker-stale-work-continue",Xn.dataset.beadId||"",Xn.dataset.actionId||"");return}let Dn=b?.closest?.(".worker-mini__stale-backup");if(Dn){St("worker-stale-work-backup-fresh",Dn.dataset.beadId||"",Dn.dataset.actionId||"");return}let Mn=b?.closest?.(".worker-mini__stale-recheck");if(Mn){St("worker-stale-work-recheck",Mn.dataset.beadId||"",Mn.dataset.actionId||"");return}let cr=b?.closest?.(".worker-mini__revise-fix");if(cr){ht("worker-revise-fix",cr.dataset.beadId||"");return}let Ue=b?.closest?.(".worker-mini__revise-approve");if(Ue){ht("worker-revise-approve",Ue.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;let Dt=b?.closest?.(".rtile__failure-badge");if(Dt){let $=Dt.dataset.attemptId||"";O=O===$?null:$,ee();return}let _n=b?.closest?.(".rtile__attempt-copy");if(_n){let $=_n.dataset.attemptId||"";$&&en($).then(_e=>{ve(_e?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",_e?"success":"error",1400)});return}if(b?.closest?.(".rtile__parked-retry")){let $=b?.closest?.(".rtile");Re($?.dataset?.beadId||"",$?.dataset?.attemptId||"");return}let to=b?.closest?.(".rtile__discard");if(to){let $=b?.closest?.(".rtile"),_e=$?.dataset?.beadId,je=$?.dataset?.attemptId;_e&&Lt(_e,je||null,to.dataset.confirmation==="merged"?"merged":"unmerged",to.dataset.operationId||null);return}if(b?.closest?.(".rtile__pause")){let _e=b?.closest?.(".rtile")?.dataset?.attemptId;_e&&Ne(_e);return}if(b?.closest?.(".rtile__resume")){let $=b?.closest?.(".rtile__resume"),je=b?.closest?.(".rtile")?.dataset?.attemptId;je&&at(je,$?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(b?.closest?.(".rtile__session")){let $=b?.closest?.(".rtile"),_e=$?.dataset?.attemptId;if(_e){it(_e);return}let je=$?.dataset?.beadId;je&&ut(je);return}if(b?.closest?.(".rtile__failure-pop"))return;if(b?.closest?.(".worker-drawer-overlay__backdrop")){le.close(),M.close();return}if(b?.closest?.(".worker-drawer-host"))return;let Qo=b?.closest?.(".rtile .board-card__roll-toggle");if(Qo){let $=Qo.dataset.rollParent;$&&(Q.has($)?Q.delete($):Q.add($),ee());return}let rt=b?.closest?.(".rtile .board-card__roll-child");if(rt){let $=rt.dataset.childId;$&&i&&i($);return}let w=b?.closest?.(".rtile");if(w){if(b?.closest?.(".rtile__id")){let _e=w.dataset.beadId;_e&&en(_e).then(je=>{je?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let $=w.dataset.beadId;$&&i&&i($);return}let J=b?.closest?.(".worker-mini, .worker-card");if(J){let $=J.dataset.beadId;if(b?.closest?.('[data-seam="log-path-copy"]'))return;if(b?.closest?.(".worker-mini__id, .worker-card__id")){$&&en($).then(je=>{je?ve("\uBCF5\uC0AC\uB428","success",1200):ve("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let _e=b?.closest?.(".ctl-chip--from");if(_e){let je=_e.dataset.fromId;je&&i&&i(je);return}$&&i&&i($)}}tt.attach(e),e.addEventListener("click",x),e.addEventListener("change",Z);function C(g){let b=g.target,S=b&&typeof b.closest=="function"?re=>b.closest(re):()=>null;O&&!S(".rtile__failure-pop, .rtile__failure-badge")&&(O=null,ee())}function Ae(g){g.key!=="Escape"||O===null||(O=null,ee())}return document.addEventListener("click",C),document.addEventListener("keydown",Ae),j.attach(),ke.push(()=>{document.removeEventListener("click",C),document.removeEventListener("keydown",Ae),j.detach()}),v(),h&&ke.push(h.subscribe(()=>{ue.notifyIssuesChanged(),ee()})),o&&ke.push(o.subscribe(()=>{let g=l&&l()||"";g!==pe&&(pe=g,se.close()),ee(),Ht()})),ee(),{load(){ue.ensureSessionDefaults(),ee()},refreshSessionDefaults:F,destroy(){for(let g of ke.splice(0))try{g()}catch{}tt.detach(),e.removeEventListener("click",x),e.removeEventListener("change",Z),ue.destroy();try{M.destroy()}catch{}E.hidden=!0;try{se.destroy()}catch{}ot(u``,e)}}}function gl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function wf(e,t,n,r=async()=>{},o=async()=>{}){let s=Et("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function d(P){let X=P.target.value,N=t.getState().workspace?.current?.path||"";if(X&&X!==N){s("switching workspace to %s",X),l=!0,I();try{await n(X)}catch(G){s("workspace switch failed: %o",G)}finally{l=!1,I()}}}async function f(){let P=t.getState(),U=P.workspace?.current?.path||P.workspace?.available?.[0]?.path||"";if(!(!U||a)){s("git-pulling workspace %s",U),a=!0,I();try{await r(U)}catch(X){s("workspace git pull failed: %o",X)}finally{a=!1,I()}}}function h(P){let U=P.target;U&&e.contains(U)||O()}function m(P){P.key==="Escape"&&O()}function k(){c||(c=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",m),I())}function O(){c&&(c=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),I())}function j(){c?O():k()}async function H(P){let U=P.target,X=U.value,oe=U.checked;s("toggling visibility %s \u2192 %s",X,String(oe));try{await o(X,oe)}catch(N){s("workspace visibility toggle failed: %o",N)}}function ae(P){return P?u`
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
    `:u``}function V(P,U){return u`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${j}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?u`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${P.map(X=>u`
                    <label
                      class="workspace-picker__manage-row"
                      title="${X.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${X.path}"
                        .checked=${!U.has(X.path)}
                        @change=${H}
                      />
                      <span class="workspace-picker__manage-name"
                        >${gl(X.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let P=t.getState(),U=P.workspace?.current,X=P.workspace?.available||[],oe=new Set(P.workspace?.hidden||[]),N=U?.path||X[0]?.path||"";if(X.length===0)return u``;let G=X.filter(W=>!oe.has(W.path)||W.path===N);if(G.length<=1){let W=G[0]||X[0],Q=gl(W.path);return u`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${W.path}"
            >${Q}</span
          >
          ${V(X,oe)}
          ${ae(N)}
          ${a?u`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return u`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${G.map(W=>u`
              <option
                value="${W.path}"
                ?selected=${W.path===N}
                title="${W.path}"
              >
                ${gl(W.path)}
              </option>
            `)}
        </select>
        ${V(X,oe)}
        ${ae(N)}
        ${l||a?u`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){ot(q(),e)}return I(),i=t.subscribe(()=>I()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",m),ot(u``,e)}}}var kf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function hl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function $f(e,t,n=hl()){return{id:n,type:e,payload:t}}function xf(e={}){let t=Et("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,c=new Map,d=[],f=new Map,h=new Set;function m(q){for(let I of Array.from(h))try{I(q)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),I=(n.jitterRatio||0)*q,P=Math.max(0,Math.round(q+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",P,i+1),l=setTimeout(()=>{l=null,V()},P)}function O(q){try{o?.send(JSON.stringify(q))}catch(I){t("ws send failed",I)}}function j(){for(s="open",t("ws open"),m(s),i=0;d.length;){let q=d.shift();q&&O(q)}}function H(q){let I;try{I=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(c.has(I.id)){let U=c.get(I.id);c.delete(I.id),I.ok?U?.resolve(I.payload):U?.reject(I.error||new Error("ws error"));return}let P=f.get(I.type);if(P&&P.size>0)for(let U of Array.from(P))try{U(I.payload)}catch(X){t("ws event handler error",X)}else t("ws received unhandled message type: %s",I.type)}function ae(){s="closed",t("ws closed"),m(s);for(let[q,I]of c.entries())I.reject(new Error("ws disconnected")),c.delete(q);i+=1,k()}function V(){if(!a)return;let q=r();try{o=new WebSocket(q),t("ws connecting %s",q),s="connecting",m(s),o.addEventListener("open",j),o.addEventListener("message",H),o.addEventListener("error",()=>{}),o.addEventListener("close",ae)}catch(I){t("ws connect failed %o",I),k()}}return V(),{send(q,I){if(!kf.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let P=hl(),U=$f(q,I,P);return t("send %s id=%s",q,P),new Promise((X,oe)=>{c.set(P,{resolve:X,reject:oe,type:q}),o&&o.readyState===o.OPEN?O(U):(t("queue %s id=%s (state=%s)",q,P,s),d.push(U))})},on(q,I){f.has(q)||f.set(q,new Set);let P=f.get(q);return P?.add(I),()=>{P?.delete(I)}},onConnection(q){return h.add(q),()=>{h.delete(q)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,V()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function kv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function $v(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var bl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Af=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],ir="tab:worker:closed",xv="bdui.worker.done-range",Sf=kp,Ef="worker:queue",Tf="ui:order",Cf="ui:display-policy",Rf="exec:presets",ar="tab:board:closed",Of="beads-ui.board.closed-range";function Av(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Sv(e))});return n.observe(e),()=>n.disconnect()}function Sv(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Ev(e){let t=Et("main");t("bootstrap start"),Av(document.querySelector(".app-header"));let n=u`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ot(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Up(i),l&&a&&c&&d){let he=function(x,C){let Ae="Request failed",g="";if(x&&typeof x=="object"){let S=x;if(typeof S.message=="string"&&S.message.length>0&&(Ae=S.message),typeof S.details=="string")g=S.details;else if(S.details&&typeof S.details=="object")try{g=JSON.stringify(S.details,null,2)}catch{g=""}}else typeof x=="string"&&x.length>0&&(Ae=x);let b=C&&C.length>0?`Failed to load ${C}`:"Request failed";ne.open(b,Ae,g)},Ne=function(x){return`${we.getState().workspace.current?.path||""}\0${x}`},at=function(){xe&&(xe().catch(()=>{}),xe=null),ie=null,qe=null},y=function(x){Ge=x;let C=()=>{Ge!==x||we.getState().selected_id!==x||(Ge=null,Qe(x))};if(!Y){Pe.then(C);return}C()},Fe=function(x,C,Ae,g,b){return Ae!==Re[C]?(b().catch(()=>{}),!1):(x.set(g,b),!0)},dt=function(){let x=we.getState();Be(x.view==="board"),Ie(x.view==="worker"),Ze(ze(x)),Me(x.view==="board"||x.view==="worker"||Ye||!!x.selected_id)},St=function(){let x=mr(vt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},ht=function(){let x=mr(Lt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},Be=function(x){if(x)for(let[C,Ae]of bl){if(z.has(C)||Te.has(C))continue;let g=C===ar?St():{type:Ae};try{De.register(C,g)}catch(re){t("register %s store failed: %o",C,re)}Te.add(C);let b=Re.board,S=!1;de.subscribeList(C,g).then(re=>{S=!Fe(z,"board",b,C,re)}).catch(re=>{t("subscribe %s failed: %o",C,re),he(re,"board")}).finally(()=>{Te.delete(C),S&&dt()})}else be()},be=function(){Re.board+=1;for(let[x]of bl){let C=z.get(x);C&&(C().catch(()=>{}),z.delete(x));try{De.unregister(x)}catch(Ae){t("unregister %s failed: %o",x,Ae)}}},Ie=function(x){if(!x){We();return}for(let[C,Ae]of Af){if(R.has(C)||Te.has(C))continue;let g=C===ir?ht():{type:Ae};try{De.register(C,g)}catch(re){t("register %s store failed: %o",C,re)}Te.add(C);let b=Re.worker,S=!1;de.subscribeList(C,g).then(re=>{S=!Fe(R,"worker",b,C,re)}).catch(re=>{t("subscribe %s failed: %o",C,re),he(re,"worker")}).finally(()=>{Te.delete(C),S&&dt()})}},We=function(){Re.worker+=1;for(let[x]of Af){let C=R.get(x);C&&(C().catch(()=>{}),R.delete(x));try{De.unregister(x)}catch(Ae){t("unregister %s failed: %o",x,Ae)}}},Me=function(x){if(!x){Je();return}K||(Oe("subscribe-worker-queue",{id:Ef}).catch(C=>{t("subscribe-worker-queue failed: %o",C)}),K=()=>Oe("unsubscribe-worker-queue",{id:Ef}))},Je=function(){K&&(K().catch(()=>{}),K=null)},ze=function(x){return x.view==="monitor"||x.selected_id!=null},Ze=function(x){if(!x){ft();return}Le||(Oe("subscribe-monitor-pipeline",{id:Sf}).catch(C=>{t("subscribe-monitor-pipeline failed: %o",C)}),Le=()=>Oe("unsubscribe-monitor-pipeline",{id:Sf}))},ft=function(){Le&&(Le().catch(()=>{}),Le=null)},kt=function(){He||(Oe("subscribe-ui-order",{id:Tf}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),He=()=>Oe("unsubscribe-ui-order",{id:Tf}))},Nt=function(){He&&(He().catch(()=>{}),He=null),M.clear()},Tt=function(){nt||(Oe("subscribe-display-policy",{id:Cf}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),nt=()=>Oe("unsubscribe-display-policy",{id:Cf}))},xt=function(){nt&&(nt().catch(()=>{}),nt=null),le.clear()},qt=function(){Ct||(Oe("subscribe-impl-presets",{id:Rf}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),Ct=()=>Oe("unsubscribe-impl-presets",{id:Rf}))},Zt=function(x){if(!x)return"Unknown";let C=x.split("/").filter(Boolean);return C.length>0?C[C.length-1]:"Unknown"},ce=function(x,C){Z.open(x.path,{missing_state:x.missing_state,...C?{workspace:C}:{}})};var f=he,h=Ne,m=at,k=y,O=Fe,j=dt,H=St,ae=ht,V=Be,q=be,I=Ie,P=We,U=Me,X=Je,oe=ze,N=Ze,G=ft,W=kt,Q=Nt,Ee=Tt,ke=xt,ue=qt,F=Zt,$e=ce;let Se=document.getElementById("header-loading"),E=lc(Se),ne=Qd(e),fe=xf(),Oe=E.wrapSend((x,C)=>fe.send(x,C)),de=tc(Oe),De=nc(),tt=oc(),st=Dl(),M=rc(),le=Ll(),se=Il(),pe=Ml();fe.on("impl-presets-snapshot",x=>{let C=x;C&&typeof C.revision=="number"&&Array.isArray(C.presets)&&se.set({revision:C.revision,presets:C.presets})}),fe.on("monitor-pipeline-snapshot",x=>{let C=x;if(!(!C||!Array.isArray(C.workspaces)))try{st.set(C.workspaces,C.workspaces_state,C.cross_lanes)}catch{}}),fe.on("ui-order-snapshot",x=>{let C=x;if(C&&typeof C.revision=="number")try{M.set({revision:C.revision,order:C.order&&typeof C.order=="object"?C.order:{}})}catch{}}),fe.on("display-policy-snapshot",x=>{let C=x;if(C&&C.policy&&typeof C.policy=="object")try{le.set(C.policy)}catch{}}),fe.on("session-log-snapshot",x=>{let C=x;if(C&&typeof C.id=="string")try{pe.set(C.id,Array.isArray(C.lines)?C.lines:[],typeof C.last_event_at=="number"?C.last_event_at:null)}catch{}}),fe.on("session-log-append",x=>{let C=x;if(C&&typeof C.id=="string")try{pe.append(C.id,C.event)}catch{}}),fe.on("snapshot",x=>{let C=x,Ae=C&&typeof C.id=="string"?C.id:"",g=Ae?De.getStore(Ae):null;if(g&&C&&C.type==="snapshot")try{g.applyPush(C)}catch{}}),fe.on("upsert",x=>{let C=x,Ae=C&&typeof C.id=="string"?C.id:"",g=Ae?De.getStore(Ae):null;if(g&&C&&C.type==="upsert")try{g.applyPush(C)}catch{}}),fe.on("delete",x=>{let C=x,Ae=C&&typeof C.id=="string"?C.id:"",g=Ae?De.getStore(Ae):null;if(g&&C&&C.type==="delete")try{g.applyPush(C)}catch{}});let xe=null,ie=null,qe=null,Ge=null,Xe=()=>{},Pe=new Promise(x=>{Xe=()=>x(void 0)}),Y=!1,B=!1;async function Qe(x){let C=Ne(x);if(C===ie||C===qe)return;qe=C;let Ae=`detail:${x}`,g={type:"issue-detail",params:{id:x}};try{De.register(Ae,g)}catch(b){t("register detail store failed: %o",b)}try{let b=await de.subscribeList(Ae,g);if(we.getState().selected_id!==x||Ne(x)!==C){await b().catch(()=>{});return}xe&&await xe().catch(()=>{}),xe=b,ie=C}catch(b){t("detail subscribe failed: %o",b),he(b,"issue details")}finally{qe===C&&(qe=null)}}let z=new Map,Te=new Set,Re={board:0,worker:0},Ye=!1,vt=os;try{let x=window.localStorage.getItem(Of);Fi(x)&&(vt=x)}catch{}let Lt="today";try{let x=window.localStorage.getItem(xv);x!==null&&(Lt=En(x))}catch{}async function D(x){if(!Fi(x)||x===vt)return;vt=x;try{window.localStorage.setItem(Of,x)}catch{}let C=z.get(ar);if(!C)return;z.delete(ar),await C().catch(()=>{});let Ae=St();try{De.register(ar,Ae)}catch(g){t("register %s store failed: %o",ar,g)}try{let g=await de.subscribeList(ar,Ae);z.set(ar,g)}catch(g){t("re-subscribe %s failed: %o",ar,g),he(g,"board")}}async function te(x){let C=En(x);if(C===Lt)return;Lt=C;let Ae=R.get(ir);if(!Ae)return;R.delete(ir),await Ae().catch(()=>{});let g=ht();try{De.register(ir,g)}catch(b){t("register %s store failed: %o",ir,b)}try{let b=await de.subscribeList(ir,g);R.set(ir,b)}catch(b){t("re-subscribe %s failed: %o",ir,b),he(b,"worker")}}let R=new Map,K=null,Le=null,He=null,nt=null,Ct=null;async function an(){nt=null,le.clear(),Ct=null,se.clear(),K=null,Le=null,z.clear(),R.clear(),Re.board+=1,Re.worker+=1,qt();let x=we.getState().workspace.current?.path;if(x)try{await fe.send("set-workspace",{path:x})}catch(Ae){t("workspace restore after reconnect failed: %o",Ae);return}Tt();let C=we.getState();Be(C.view==="board"),Ie(C.view==="worker"),Ze(ze(C)),Me(C.view==="board"||C.view==="worker"||!!C.selected_id)}async function Bt(){t("clearing all subscriptions for workspace switch"),be(),We(),Je(),tt.clear(),Nt(),kt(),xt(),Tt(),at();let x=we.getState();if(x.selected_id)try{De.unregister(`detail:${x.selected_id}`)}catch{}let C=we.getState();Be(C.view==="board"),Ie(C.view==="worker"),Ze(ze(C)),Me(C.view==="board"||C.view==="worker"||!!C.selected_id),C.selected_id&&y(C.selected_id)}async function Ut(x){t("requesting workspace switch to %s",x),B=!0;try{let C=await fe.send("set-workspace",{path:x});t("workspace switch result: %o",C),C&&C.workspace&&(we.setState({workspace:{current:{path:C.workspace.root_dir,database:C.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),C.changed&&(await Bt(),ve("Switched to "+Zt(x),"success",2e3)))}catch(C){throw t("workspace switch failed: %o",C),ve("Failed to switch workspace","error",3e3),C}finally{B=!1}}async function It(x){t("requesting workspace git pull for %s",x);try{let C=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",C);let Ae=C?.status;if(Ae==="up_to_date"){ve("Already up to date","success",2e3);return}if(Ae==="stash_pop_conflict"){ve("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ve("Git pulled "+Zt(x),"success",2e3)}catch(C){t("workspace git pull failed: %o",C);let Ae=C?.code,g=C?.message;if(Ae==="rebase_conflict"){ve("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ae==="rebase_conflict_abort_failed"){ve("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ae==="busy"){ve("Git pull skipped: another operation is running","warning",3e3);return}let b=g?`: ${g}`:"";throw ve(`Git pull failed${b}`,"error",3e3),C}}async function Pt(x,C){t("setting workspace visibility %s \u2192 %s",x,String(C));try{await fe.send("set-workspace-visibility",{path:x,visible:C}),await zt()}catch(Ae){t("workspace visibility update failed: %o",Ae),ve("Failed to update project visibility","error",3e3)}}async function zt(){try{let x=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let C=x.workspaces.map(S=>({path:S.path,database:S.database,pid:S.pid,version:S.version})),Ae=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,g=Array.isArray(x.hidden)?x.hidden.filter(S=>typeof S=="string"):[];we.setState({workspace:{current:Ae,available:C,hidden:g}});let b=window.localStorage.getItem("beads-ui.workspace");b&&(!C.some(re=>re.path===b)||g.includes(b)?window.localStorage.removeItem("beads-ui.workspace"):Ae&&b!==Ae.path&&(t("restoring saved workspace preference: %s",b),await Ut(b)))}}catch(x){t("failed to load workspaces: %o",x)}}fe.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(we.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),zt(),Bt())});let wt=!1;if(typeof fe.onConnection=="function"){let x=C=>{t("ws state %s",C),C==="reconnecting"||C==="closed"?(wt=!0,ve("Connection lost. Reconnecting\u2026","error",4e3)):C==="open"&&wt&&(wt=!1,ve("Reconnected","success",2200),$v(we,(Ae,g)=>{t(`${Ae}: %o`,g)}),an())};fe.onConnection(x)}let Xt="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(Xt=x)}catch(x){t("view parse error: %o",x)}let we=ac({config:kv(),view:Xt});fe.on("worker-queue-snapshot",x=>{let C=x;if(!C||!C.queue)return;let Ae=we.getState().workspace.current?.path;if(typeof Ae=="string"&&Ae.length>0&&C.root_dir!==Ae){t("dropping worker-queue snapshot for %s",String(C.root_dir));return}try{tt.set(C.queue)}catch{}});let T=sc(we);T.start();let ee=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),v=async(x,C)=>{try{return await Oe(x,C)}catch(Ae){if(ee.has(x))throw Ae;return[]}};xp({global_element:r,repo_element:o},we,T);let p=document.getElementById("workspace-picker");p&&wf(p,we,Ut,It,Pt);let _=Tp(e,(x,C)=>Oe(x,C));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>_.open())}catch{}let A=Lp(e,{policyStore:le,queueStore:tt,implPresetStore:se,transport:(x,C)=>Oe(x,C),onOpenChange:x=>{let C=Ye;Ye=x,dt(),C&&x===!1&&ge.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[C]of bl)for(let Ae of De.snapshotFor(C)||[]){let g=Ae.labels;if(Array.isArray(g))for(let b of g)typeof b=="string"&&b.length>0&&x.add(b)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>A.open()))}catch{}let L=document.createElement("div");L.className="md-viewer-root",document.body.appendChild(L);let Z=bi(L,{getWorkspacePath:()=>we.getState().workspace.current?.path}),me=xc(l,{gotoIssue:x=>T.gotoIssue(x),issueStores:De,transport:v,workerQueueStore:tt,uiOrderStore:M,displayPolicyStore:le,closedRange:vt,onClosedRangeChange:x=>{D(x)},onNewIssue:()=>_.open(),openDoc:ce}),ge=ml(a,{transport:v,issueStores:De,queueStore:tt,sessionLogStore:pe,gotoIssue:x=>we.setState({selected_id:x}),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:x=>Ut(x),openDoc:ce,doneRange:Lt,onDoneRangeChange:x=>{te(x)}}),it=$p(c,{transport:v,pipelineStore:st,execPresetStore:se,sessionLogStore:pe,router:T,gotoIssue:x=>T.gotoIssue(x),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:x=>Ut(x),openDoc:ce}),ut=Xd(d,{issueStores:De,transport:v,queueStore:tt,execPresetStore:se,sessionLogStore:pe,getWorkspacePath:()=>we.getState().workspace.current?.path,mdViewer:Z,depCandidates:()=>{let x=st.get();if(x===null)return null;let C=st.getWorkspacesState(),Ae=we.getState();if(Ae.view==="monitor")return Ca(x,C);let g=Ae.workspace.current?.path;return g?Ca(x,C,{root_dir:g}):null},subscribeCandidates:x=>st.subscribe(x),onDepChanged:({type:x,a:C,b:Ae})=>{let g=it;x==="dep-add"&&g&&typeof g.recorrectSharedLane=="function"&&g.recorrectSharedLane(x,C,Ae)},onNavigate:(x,C)=>{let Ae=()=>{we.getState().view==="worker"?we.setState({selected_id:x}):T.gotoIssue(x)},g=we.getState().workspace.current?.path;if(typeof C!="string"||C.length===0||!g||C===g){Ae();return}Promise.resolve(Ut(C)).then(Ae).catch(()=>{ve("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=we.getState();we.setState({selected_id:null});try{T.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{A.open("execution")}}),Ht=we.getState().selected_id;Ht&&(d.hidden=!1,ut.load(Ht),y(Ht)),we.subscribe(x=>{let C=x.selected_id;C?(d.hidden=!1,ut.load(C),B||y(C)):(ut.clear(),d.hidden=!0,at())});let _t=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",c.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),Be(x.view==="board"),Ie(x.view==="worker"),Ze(ze(x)),Me(x.view==="board"||x.view==="worker"||Ye||!!x.selected_id),!x.selected_id&&x.view==="board"&&me.load(),x.view==="worker"&&ge.load(),x.view==="monitor"?it.load():it.pause(),window.localStorage.setItem("beads-ui.view",x.view)};we.subscribe(_t),_t(we.getState()),kt(),Tt(),qt(),zt().finally(()=>{Y=!0,Xe()}),window.addEventListener("keydown",x=>{let C=x.ctrlKey||x.metaKey,Ae=String(x.key||"").toLowerCase(),g=x.target,b=g&&g.tagName?String(g.tagName).toLowerCase():"",S=b==="input"||b==="textarea"||b==="select"||g&&typeof g.isContentEditable=="boolean"&&g.isContentEditable;C&&Ae==="n"&&(S||(x.preventDefault(),_.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Ev(t)});export{Ev as bootstrap,kv as readBootstrapConfig,$v as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
