var G_=Object.create;var va=Object.defineProperty;var Y_=Object.getOwnPropertyDescriptor;var V_=Object.getOwnPropertyNames;var Q_=Object.getPrototypeOf,X_=Object.prototype.hasOwnProperty;var Z_=(e,t,n)=>t in e?va(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ka=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var J_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of V_(t))!X_.call(e,o)&&o!==n&&va(e,o,{get:()=>t[o],enumerable:!(r=Y_(t,o))||r.enumerable});return e};var em=(e,t,n)=>(n=e!=null?G_(Q_(e)):{},J_(t||!e||!e.__esModule?va(n,"default",{value:e,enumerable:!0}):n,e));var Nt=(e,t,n)=>Z_(e,typeof t!="symbol"?t+"":t,n);var Sc=ka((Ew,Ac)=>{var Vr=1e3,Qr=Vr*60,Xr=Qr*60,Lr=Xr*24,rm=Lr*7,om=Lr*365.25;Ac.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return sm(e);if(n==="number"&&isFinite(e))return t.long?am(e):im(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function sm(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*om;case"weeks":case"week":case"w":return n*rm;case"days":case"day":case"d":return n*Lr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Xr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Qr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Vr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function im(e){var t=Math.abs(e);return t>=Lr?Math.round(e/Lr)+"d":t>=Xr?Math.round(e/Xr)+"h":t>=Qr?Math.round(e/Qr)+"m":t>=Vr?Math.round(e/Vr)+"s":e+"ms"}function am(e){var t=Math.abs(e);return t>=Lr?Bs(e,t,Lr,"day"):t>=Xr?Bs(e,t,Xr,"hour"):t>=Qr?Bs(e,t,Qr,"minute"):t>=Vr?Bs(e,t,Vr,"second"):e+" ms"}function Bs(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Tc=ka((Tw,Ec)=>{function lm(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=Sc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let m=0;m<d.length;m++)p=(p<<5)-p+d.charCodeAt(m),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,m=null,g,v;function E(...T){if(!E.enabled)return;let te=E,re=Number(new Date),X=re-(p||re);te.diff=X,te.prev=p,te.curr=re,p=re,T[0]=n.coerce(T[0]),typeof T[0]!="string"&&T.unshift("%O");let L=0;T[0]=T[0].replace(/%([a-zA-Z%])/g,(M,F)=>{if(M==="%%")return"%";L++;let H=n.formatters[F];if(typeof H=="function"){let j=T[L];M=H.call(te,j),T.splice(L,1),L--}return M}),n.formatArgs.call(te,T),(te.log||n.log).apply(te,T)}return E.namespace=d,E.useColors=n.useColors(),E.color=n.selectColor(d),E.extend=r,E.destroy=n.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(g!==n.namespaces&&(g=n.namespaces,v=n.enabled(d)),v),set:T=>{m=T}}),typeof n.init=="function"&&n.init(E),E}function r(d,p){let m=n(this.namespace+(typeof p>"u"?":":p)+d);return m.log=this.log,m}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of p)m[0]==="-"?n.skips.push(m.slice(1)):n.names.push(m)}function i(d,p){let m=0,g=0,v=-1,E=0;for(;m<d.length;)if(g<p.length&&(p[g]===d[m]||p[g]==="*"))p[g]==="*"?(v=g,E=m,g++):(m++,g++);else if(v!==-1)g=v+1,E++,m=E;else return!1;for(;g<p.length&&p[g]==="*";)g++;return g===p.length}function s(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(i(d,p))return!1;for(let p of n.names)if(i(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Ec.exports=lm});var Cc=ka((vn,Us)=>{vn.formatArgs=um;vn.save=dm;vn.load=pm;vn.useColors=cm;vn.storage=fm();vn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();vn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function cm(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function um(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Us.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}vn.log=console.debug||console.log||(()=>{});function dm(e){try{e?vn.storage.setItem("debug",e):vn.storage.removeItem("debug")}catch{}}function pm(){let e;try{e=vn.storage.getItem("debug")||vn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function fm(){try{return localStorage}catch{}}Us.exports=Tc()(vn);var{formatters:_m}=Us.exports;_m.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var To=globalThis,Ds=To.trustedTypes,cc=Ds?Ds.createPolicy("lit-html",{createHTML:e=>e}):void 0,$a="$lit$",Zn=`lit$${Math.random().toFixed(9).slice(2)}$`,xa="?"+Zn,tm=`<${xa}>`,Cr=document,Co=()=>Cr.createComment(""),Ro=e=>e===null||typeof e!="object"&&typeof e!="function",Aa=Array.isArray,mc=e=>Aa(e)||typeof e?.[Symbol.iterator]=="function",wa=`[ 	
\f\r]`,Eo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,uc=/-->/g,dc=/>/g,Er=RegExp(`>|${wa}(?:([^\\s"'>=/]+)(${wa}*=${wa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pc=/'/g,fc=/"/g,gc=/^(?:script|style|textarea|title)$/i,Sa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Sa(1),Io=Sa(2),vw=Sa(3),An=Symbol.for("lit-noChange"),Yt=Symbol.for("lit-nothing"),_c=new WeakMap,Tr=Cr.createTreeWalker(Cr,129);function hc(e,t){if(!Aa(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return cc!==void 0?cc.createHTML(t):t}var bc=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=Eo;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,m=0;for(;m<a.length&&(s.lastIndex=m,d=s.exec(a),d!==null);)m=s.lastIndex,s===Eo?d[1]==="!--"?s=uc:d[1]!==void 0?s=dc:d[2]!==void 0?(gc.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Er):d[3]!==void 0&&(s=Er):s===Er?d[0]===">"?(s=o??Eo,p=-1):d[1]===void 0?p=-2:(p=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Er:d[3]==='"'?fc:pc):s===fc||s===pc?s=Er:s===uc||s===dc?s=Eo:(s=Er,o=void 0);let g=s===Er&&e[l+1].startsWith("/>")?" ":"";i+=s===Eo?a+tm:p>=0?(r.push(u),a.slice(0,p)+$a+a.slice(p)+Zn+g):a+Zn+(p===-2?l:g)}return[hc(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Oo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=bc(t,n);if(this.el=e.createElement(u,r),Tr.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=Tr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith($a)){let m=d[s++],g=o.getAttribute(p).split(Zn),v=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:v[2],strings:g,ctor:v[1]==="."?Ms:v[1]==="?"?qs:v[1]==="@"?Ns:Or}),o.removeAttribute(p)}else p.startsWith(Zn)&&(a.push({type:6,index:i}),o.removeAttribute(p));if(gc.test(o.tagName)){let p=o.textContent.split(Zn),m=p.length-1;if(m>0){o.textContent=Ds?Ds.emptyScript:"";for(let g=0;g<m;g++)o.append(p[g],Co()),Tr.nextNode(),a.push({type:2,index:++i});o.append(p[m],Co())}}}else if(o.nodeType===8)if(o.data===xa)a.push({type:2,index:i});else{let p=-1;for(;(p=o.data.indexOf(Zn,p+1))!==-1;)a.push({type:7,index:i}),p+=Zn.length-1}i++}}static createElement(t,n){let r=Cr.createElement("template");return r.innerHTML=t,r}};function Rr(e,t,n=e,r){if(t===An)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=Ro(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Rr(e,o._$AS(e,t.values),o,r)),t}var Ps=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Cr).importNode(n,!0);Tr.currentNode=o;let i=Tr.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new Gr(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new js(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Tr.nextNode(),s++)}return Tr.currentNode=Cr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Gr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Yt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Rr(this,t,n),Ro(t)?t===Yt||t==null||t===""?(this._$AH!==Yt&&this._$AR(),this._$AH=Yt):t!==this._$AH&&t!==An&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Yt&&Ro(this._$AH)?this._$AA.nextSibling.data=t:this.T(Cr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Oo.createElement(hc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new Ps(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=_c.get(t.strings);return n===void 0&&_c.set(t.strings,n=new Oo(t)),n}k(t){Aa(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(Co()),this.O(Co()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Or=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Yt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Yt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Rr(this,t,n,0),s=!Ro(t)||t!==this._$AH&&t!==An,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Rr(this,l[r+a],n,a),u===An&&(u=this._$AH[a]),s||(s=!Ro(u)||u!==this._$AH[a]),u===Yt?t=Yt:t!==Yt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Yt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ms=class extends Or{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Yt?void 0:t}},qs=class extends Or{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Yt)}},Ns=class extends Or{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Rr(this,t,n,0)??Yt)===An)return;let r=this._$AH,o=t===Yt&&r!==Yt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Yt&&(r===Yt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},js=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Rr(this,t)}},yc={M:$a,P:Zn,A:xa,C:1,L:bc,R:Ps,D:mc,V:Rr,I:Gr,H:Or,N:qs,U:Ns,B:Ms,F:js},nm=To.litHtmlPolyfillSupport;nm?.(Oo,Gr),(To.litHtmlVersions??(To.litHtmlVersions=[])).push("3.3.1");var pt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new Gr(t.insertBefore(Co(),i),i,void 0,n??{})}return o._$AI(e),o};var Fs="today",vc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Yr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Un(e){return e==="today"?"today":"7d"}function Ea(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Ir(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function kc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function $c(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function xc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Rc=em(Cc(),1);function Wt(e){return(0,Rc.default)(`beads-ui:${e}`)}function mm(e){let n=Oc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Oc(e){return typeof e=="string"?e.trim():""}function gm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var hm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Zr(e){let t=mm(e),n=Oc(gm(e).spec_review),r=hm.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Cn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Lo(e,t){let n=Cn(e.created_at),r=Cn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function qc(e,t){let n=Cn(e.created_at),r=Cn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Nc(e,t){let n=Cn(e.updated_at),r=Cn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function jc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Cn(e.created_at),i=Cn(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Fc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var Ws=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function bm(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Ws,e)}function Ca(e){if(!e||typeof e!="object")return!1;let t=e;return bm(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Ic(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Lc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Zr(e).evidence==="published"?1:0;case"created":return Ic(e.created_at);case"updated":return Ic(e.updated_at);default:return null}}function Dc(e,t,n){let r=Lc(e,n.key),o=Lc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Bc(e){let t=Array.isArray(e)?e.filter(Ca):[];return(n,r)=>{for(let l of t){let a=Dc(n,r,l);if(a!==0)return a}let o=Dc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var ym=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Pc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Mc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=ym.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Uc(e,t){let n=Pc(e),r=Pc(t);if(n!==r)return n<r?-1:1;let o=Mc(e),i=Mc(t);if(o!==i)return o<i?-1:1;let s=Cn(e&&e.created_at),l=Cn(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var Ta=2**20;function Jr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Cn(e&&e.created_at)}function Wc(e){return(t,n)=>{let r=Jr(t,e),o=Jr(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function Ra(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:Jr(l,n)-Ta};if(!l)return{rank:Jr(s,n)+Ta};let a=Jr(s,n),u=Jr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,m)=>({bead_id:p.id,rank:m*Ta}))}}function Oa(e,t={}){let n=Wt(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||Lo;function u(){for(let m of Array.from(s))try{m()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(m){if(l||!m||m.id!==e)return;let g=Number(m.revision)||0;if(n("apply %s rev=%d",m.type,g),!(g<=i&&m.type!=="snapshot")){if(m.type==="snapshot"){if(g<=i)return;r.clear();let v=Array.isArray(m.issues)?m.issues:[];for(let E of v)E&&typeof E.id=="string"&&E.id.length>0&&r.set(E.id,E);d(),i=g,u();return}if(m.type==="upsert"){let v=m.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let E=r.get(v.id);if(!E)r.set(v.id,v);else{let T=Number.isFinite(E.updated_at)?E.updated_at:0,te=Number.isFinite(v.updated_at)?v.updated_at:0;if(T<=te){for(let re of Object.keys(E))re in v||delete E[re];for(let[re,X]of Object.entries(v))E[re]=X}}d()}i=g,u()}else if(m.type==="delete"){let v=String(m.issue_id||"");v&&(r.delete(v),d()),i=g,u()}}}return{id:e,subscribe(m){return s.add(m),()=>{s.delete(m)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(m){return r.get(m)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function zs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function zc(e){let t=Wt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],m=Array.isArray(a.removed)?a.removed:[];for(let g of Array.from(u)){let v=n.get(g);if(!v)continue;let E=v.itemsById;for(let T of d)typeof T=="string"&&T.length>0&&E.set(T,!0);for(let T of p)typeof T=="string"&&T.length>0&&E.set(T,!0);for(let T of m)typeof T=="string"&&T.length>0&&E.delete(T)}}async function i(l,a){let u=zs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let m=r.get(p.key);m&&(m.delete(l),m.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let m=n.get(l)||null;if(m){let g=r.get(m.key);g&&(g.delete(l),g.size===0&&r.delete(m.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let m=r.get(p.key);m&&(m.delete(l),m.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:zs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Hc(){let e=Wt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let p=u?zs(u):"",m=n.get(a)||"",g=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,m),g&&m&&p&&m!==p){let v=t.get(a);if(v)try{v.dispose()}catch{}let E=o.get(a);if(E){try{E()}catch{}o.delete(a)}let T=Oa(a,d);t.set(a,T);let te=T.subscribe(()=>i());o.set(a,te)}else if(!g){let v=Oa(a,d);t.set(a,v);let E=v.subscribe(()=>i());o.set(a,E)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Kc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Gc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ia(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function vm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function km(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Yc(e){let t=Wt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):vm(r),s=km(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"?o.view:"board",s=Ia(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?Ia(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var wm=Object.freeze({workspace_config:{default_workspace:null}});function Vc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:wm.workspace_config.default_workspace}}}function Qc(e={}){let t=Wt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Vc(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?Vc(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Xc(e){let t=Wt("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(p,m)=>{let g=o++,v=Date.now();r.set(g,{type:p,start_ts:v}),t("request start id=%d type=%s count=%d",g,p,n+1),s();let E=!1,T=()=>{E||(E=!0,r.delete(g),l())},te=setTimeout(()=>{E||(t("request TIMEOUT id=%d type=%s elapsed=%dms",g,p,Date.now()-v),T())},3e4);try{let re=await u(p,m),X=Date.now()-v;return t("request done id=%d type=%s elapsed=%dms",g,p,X),re}catch(re){let X=Date.now()-v;throw t("request error id=%d type=%s elapsed=%dms err=%o",g,p,X,re),re}finally{clearTimeout(te),T()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function ge(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function eo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Fc),a;switch(l){case"created_desc":return a.sort(Lo),a;case"created_asc":return a.sort(qc),a;case"updated_desc":return a.sort(Nc),a;case"priority":return a.sort(jc),a;case"manual":default:{let u=n();return u?a.sort(Wc(u)):a.sort(Lo),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function dr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function nn(e){let t=dr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function fn(e,t){let n=dr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Zc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=dr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Hs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ks(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Hs(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Gs(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=Zc(n);return{total:n.length,count:r,current:o,children:n}}function Jc(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Ra(l,a,u.order),s);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let m={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(m);let g=r(Ra(l,a,m.order),s);o(m,g);let v=await t("ui-order-set",{expected_revision:m.revision,entries:g});v&&v.applied&&n.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:i}}function eu(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Jn(e,t){let n=eu(e),r=eu(t);return n.length===0||r.length===0?!1:n!==r}function Ys(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function La(e,t){return!t||typeof e!="string"||e.length===0||Ys(t.visible_labels).includes(e)?!0:Ys(t.hidden_labels).includes(e)?!1:!Ys(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function tu(e,t){return Ys(e).filter(n=>La(n,t))}function pr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function $m(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function xm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Am(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${$m(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Vs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Uc):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?xm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>Am(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Sm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},ru={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},nu={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Em={review:"\u2713",skip:"\u2298"},fr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Tm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function ou(e){let t=e&&e.fill||"none";return t==="none"?fr.none:e&&e.stale===!0?fr.stale:t==="dim"?fr.dim:e&&e.glyph==="review"?fr.review:e&&e.glyph==="skip"?fr.skip:fr.done}function Cm(e){if(!e||e.fill==="none"||!e.approval_state)return ou(e);let t=[];return e.glyph==="review"?t.push(fr.review):e.glyph==="skip"&&t.push(fr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Rm(e,t,n,r){let o=Sm[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=Em[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=ru[e]||e,m=r?su(t):null;if(!m)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${p}</div>
      </div>
    `;let g=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${m.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${g}
      title=${g}
      @click=${v=>{v.preventDefault(),v.stopPropagation(),r(v,m,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${p}</div>
    </button>
  `}function su(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Qs(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=nu[e.route]||nu.spec_backed,i=e.stages,s=Tm(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${ru[u]||u} ${u==="plan"?Cm(i[u]||{}):ou(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>su(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>Rm(u,i[u]||{},u===s,r))}
    </div>
  `}function Om(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var iu=2;function au(e){let t=e.slice(0,iu).join(", "),n=e.length-iu;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Im(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Jn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${au(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${au(i)}</span
      >`),n}function Lm(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function Da(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Xs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function er(e){return`${e.kind}:${Xs(e)}@${e.sha}`}function Zs(e,t){if(!e)return null;let n=Da(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=Da(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${er(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function lu(e,t){let n=Zs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Dm(e){if(!e)return null;let t=Da(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${er(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Pm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&pr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&pr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&pr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=lu(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${er(l)}`}
        >${`exec ${l.kind==="delegated"?Xs(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of tu(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&pr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),pr(n,"blocked")){let l=Lm(e.metadata);l&&o.push(l),o.push(...Im(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&pr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Mm(e){let t=fn(e.created_at),n=fn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${nn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${nn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function qm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Vs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Mm(e),empty_label:"children \uC5C6\uC74C",childChips:Pa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Pa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Zs(t,n)?c`<span class="board-card__roll-child-chips">
    ${lu(t,n)}
    ${Dm(n)}
  </span>`:null}function Js(e,t){let n=Om(e.priority);return c`
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
      ${Pm(e,t)}
      ${e.workflow&&pr(t.policy||null,"stepper")?Qs(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${qm(e,t)}
    </article>
  `}function to(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${vc.map(i=>c`<option
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
        ${e.items.map(i=>Js(i,t))}
      </div>
    </section>
  `}function cu(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Js(r,t))}
        </div>
      </div>
    </dialog>
  `}var Nm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],jm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Fm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Bm(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function uu(e,t,n){return c`
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
        ${Nm.map(r=>c`<option
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
        ${jm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Bm(e,t,n)}
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
        ${Fm.map(r=>c`<option
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
  `}var Um=200,Wm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},zm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),du="beads-ui.board.sort",pu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Hm(){try{let e=window.localStorage.getItem(du);if(e&&pu.has(e))return e}catch{}return"created_desc"}function fu(e,t){let n=Wt("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,m=t.closedRange||Fs,g=o?eo(o,s):null,v=Jc({transport:i,uiOrderStore:s}),E=[],T=[],te=[],re=[],X=[],L=[],R=!1,M=0,F=Hm(),H=new Map,j=new Map,q=new Map,V=new Set,B={search:"",priority:"",type:"",labels:[]},ne=!1,ve=null;function Pe(ue){return String(ue.status||"open")==="open"}function z(ue){return String(ue.status||"open")==="open"}function ie(ue){let we=B.search.trim().toLowerCase(),Ue=B.priority,rt=B.type,tt=B.labels;return ue.filter(_t=>{if(we){let bt=String(_t.id||"").toLowerCase(),ot=String(_t.title||"").toLowerCase();if(!bt.includes(we)&&!ot.includes(we))return!1}if(Ue!==""&&String(_t.priority)!==Ue||rt!==""&&String(_t.issue_type||"")!==rt)return!1;if(tt.length>0){let bt=Array.isArray(_t.labels)?_t.labels:[];if(!tt.some(ot=>bt.includes(ot)))return!1}return!0})}function _e(){let ue=new Set;for(let we of[E,T,te,re,X,L])for(let Ue of we){let rt=Array.isArray(Ue.labels)?Ue.labels:[];for(let tt of rt)typeof tt=="string"&&tt.length>0&&ue.add(tt)}return Array.from(ue).sort()}function Ce(){return B.search.trim()!==""||B.priority!==""||B.type!==""||B.labels.length>0}function Y(){try{if(g){let ue=g.selectBoardColumn("tab:board:in-progress","in_progress",F),we=g.selectBoardColumn("tab:board:blocked","blocked",F).filter(z),Ue=new Set(ue.map(N=>N.id)),rt=g.selectBoardColumn("tab:board:ready","ready",F).filter(N=>Pe(N)&&!Ue.has(N.id)),tt=g.selectBoardColumn("tab:board:resolved","resolved",F),_t=g.selectBoardColumn("tab:board:deferred","deferred",F),bt=g.selectBoardColumn("tab:board:closed","closed").slice(0,Um),ot=[...we,...rt,...ue,...tt,...bt];ae(ot);let Ne=new Set;for(let N of ot)N&&N.id&&!Hs(N)&&Ne.add(N.id);let A=!Ce();E=A?Do(we,Ne):we,T=A?Do(rt,Ne):rt,te=A?Do(ue,Ne):ue,re=A?Do(tt,Ne):tt,X=_t,M=_t.length,L=A?Do(bt,Ne):bt,H=new Map;for(let N of E)H.set(N.id,"open");for(let N of T)H.set(N.id,"open");for(let N of te)H.set(N.id,"in_progress");for(let N of re)H.set(N.id,"resolved");for(let N of X)H.set(N.id,"deferred");for(let N of L)H.set(N.id,"closed");j=new Map;for(let N of E)j.set(N.id,"blocked-col");for(let N of T)j.set(N.id,"ready-col");for(let N of te)j.set(N.id,"in-progress-col");for(let N of re)j.set(N.id,"resolved-col");for(let N of L)j.set(N.id,"closed-col")}he()}catch{E=[],T=[],te=[],re=[],X=[],L=[],q=new Map,he()}}function ae(ue){q=Ks(ue)}function Z(ue){return Gs(q,ue)}function be(ue){return!V.has(ue)}function Ie(ue,we){ue.preventDefault(),ue.stopPropagation(),V.has(we)?V.delete(we):V.add(we),he()}function ke(ue,we){ue.preventDefault(),ue.stopPropagation(),r(we)}function Re(ue,we){ue.preventDefault(),ue.stopPropagation(),r(we)}function at(ue,we){ve||r(we)}function lt(ue,we){ue.preventDefault(),ue.stopPropagation(),Km(we).then(Ue=>{Ue&&ge("\uBCF5\uC0AC\uB428","success",1200)})}function Q(ue,we){ve=we,ue.dataTransfer&&(ue.dataTransfer.setData("text/plain",we),ue.dataTransfer.effectAllowed="move"),ue.target.classList.add("board-card--dragging")}function oe(ue){ue.target.classList.remove("board-card--dragging"),Dt(),setTimeout(()=>{ve=null},0)}function se(ue){let we=String(ue.target.value||"");!we||we===m||(m=we,u&&u(we),he())}function pe(){return l?l.get():null}function Ee(ue){let we=a?a.get():null,Ue=we?we.cleanup_failed:null;if(!Ue||typeof Ue!="object"||Array.isArray(Ue))return null;let rt=Ue[ue];return!rt||typeof rt!="object"||Array.isArray(rt)?null:rt}let me={onCardClick:at,onCopyId:lt,onDragStart:Q,onDragEnd:oe,onClosedRangeChange:se,rollupFor:Z,isExpanded:be,onRollupToggle:Ie,onChildClick:ke,onFromChipClick:Re,onOpenDoc:p?(ue,we)=>p(we):void 0,cleanupFailureFor:Ee,get policy(){return pe()}};function Oe(ue,we){ve||(He(),r(we))}function Fe(ue,we){ue.preventDefault(),ue.stopPropagation(),He(),r(we)}let Ze={...me,onCardClick:Oe,onChildClick:Fe,onFromChipClick:Fe,onOpenDoc:p?(ue,we)=>{He(),p(we)}:void 0,get policy(){return pe()}};function ze(ue){let we=ue.target,Ue=e.querySelector(".board-filter__labels");we&&Ue&&Ue.contains(we)||qe()}function J(ue){ue.key==="Escape"&&qe()}function U(){ne||(ne=!0,document.addEventListener("mousedown",ze),document.addEventListener("keydown",J),he())}function qe(){ne&&(ne=!1,document.removeEventListener("mousedown",ze),document.removeEventListener("keydown",J),he())}function ft(ue){ue.key==="Escape"&&He()}function ut(){R||(R=!0,document.addEventListener("keydown",ft),he())}function He(){R&&(R=!1,document.removeEventListener("keydown",ft),he())}let et={onClose:He,onOverlayClick(ue){ue.target===ue.currentTarget&&He()}},$={onSearchInput(ue){B.search=String(ue.target.value||""),Y()},onPriorityChange(ue){B.priority=String(ue.target.value||""),Y()},onTypeChange(ue){B.type=String(ue.target.value||""),Y()},onSortChange(ue){let we=String(ue.target.value||"");if(!(!pu.has(we)||we===F)){F=we;try{window.localStorage.setItem(du,we)}catch{}Y()}},onDeferredToggle(){R?He():ut()},onLabelMenuToggle(){ne?qe():U()},onLabelToggle(ue){let we=B.labels.indexOf(ue);we===-1?B.labels.push(ue):B.labels.splice(we,1),Y()},onLabelClear(){B.labels.length!==0&&(B.labels=[],Y())},onNewIssue(){d&&d()}};function K(){return c`
      <div class="board-view">
        ${uu(B,$,{sort_mode:F,deferred_popup_open:R,deferred_count:M,label_options:_e(),label_menu_open:ne})}
        <div class="board-root">
          ${to({title:"Blocked",id:"blocked-col",items:ie(E)},me)}
          ${to({title:"Ready",id:"ready-col",items:ie(T)},me)}
          ${to({title:"In progress",id:"in-progress-col",items:ie(te)},me)}
          ${to({title:"Resolved",id:"resolved-col",items:ie(re)},me)}
          ${to({title:"Closed",id:"closed-col",items:ie(L),is_closed:!0,closed_range:m},me)}
        </div>
        ${R?cu({items:ie(X),count:M},Ze,et):""}
      </div>
    `}function he(){pt(K(),e),Ye()}function Ye(){try{let ue=e.querySelector("#deferred-popup");ue&&!ue.open&&(typeof ue.showModal=="function"?ue.showModal():ue.setAttribute("open",""));let we=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ue of we)Array.from(Ue.querySelectorAll(".board-card")).forEach((tt,_t)=>{tt.tabIndex=_t===0?0:-1})}catch{}}async function ct(ue,we){if(!i){ge("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:ue,status:we}),ge("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ue){n("update-status failed: %o",Ue),ge("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ke(ue){switch(ue){case"blocked-col":return E;case"ready-col":return T;case"in-progress-col":return te;case"resolved-col":return re;default:return[]}}function Et(ue,we,Ue){if(!i||!s)return;let rt=Ke(ue),tt=rt.find(A=>A.id===we);if(!tt)return;let _t=rt.filter(A=>A.id!==we),bt=Ue.closest?Ue.closest(".board-card"):null,ot=_t.length;if(bt){let A=bt.getAttribute("data-issue-id");if(A===we)return;let N=_t.findIndex(W=>W.id===A);N>=0&&(ot=N)}let Ne=_t.slice();Ne.splice(ot,0,tt),v.applyReorder(we,Ne,ot)}function Dt(){for(let ue of Array.from(e.querySelectorAll(".board-column--drag-over")))ue.classList.remove("board-column--drag-over")}let st=null;e.addEventListener("dragover",ue=>{ue.preventDefault(),ue.dataTransfer&&(ue.dataTransfer.dropEffect="move");let Ue=ue.target.closest(".board-column");Ue&&Ue!==st&&(st&&st.classList.remove("board-column--drag-over"),Ue.classList.add("board-column--drag-over"),st=Ue)}),e.addEventListener("dragleave",ue=>{let we=ue.relatedTarget;(!we||!e.contains(we))&&st&&(st.classList.remove("board-column--drag-over"),st=null)}),e.addEventListener("drop",ue=>{ue.preventDefault(),st&&(st.classList.remove("board-column--drag-over"),st=null);let we=ue.target,Ue=we.closest(".board-column");if(!Ue)return;let rt=ue.dataTransfer?.getData("text/plain")||"";if(!rt)return;let tt=Ue.id,_t=j.get(rt);if(_t&&_t===tt){if(zm.has(tt)){if(F!=="manual"){ge("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Et(tt,rt,we)}return}let bt=Wm[tt];if(!bt){ge("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}H.get(rt)!==bt&&ct(rt,bt)}),e.addEventListener("keydown",ue=>{let we=ue.target;if(!(we instanceof HTMLElement))return;let Ue=String(we.tagName||"").toLowerCase();if(Ue==="input"||Ue==="textarea"||Ue==="select"||Ue==="button"||Ue==="a"||we.isContentEditable===!0)return;let rt=we.closest(".board-card");if(!rt)return;let tt=String(ue.key||"");if(tt==="Enter"||tt===" "){ue.preventDefault();let Ne=rt.getAttribute("data-issue-id");Ne&&r(Ne);return}if(tt!=="ArrowUp"&&tt!=="ArrowDown"&&tt!=="ArrowLeft"&&tt!=="ArrowRight")return;ue.preventDefault();let _t=rt.closest(".board-column");if(!_t)return;let bt=Array.from(_t.querySelectorAll(".board-card")),ot=bt.indexOf(rt);if(tt==="ArrowDown"&&ot<bt.length-1){wt(rt,bt[ot+1]);return}if(tt==="ArrowUp"&&ot>0){wt(rt,bt[ot-1]);return}if(tt==="ArrowLeft"||tt==="ArrowRight"){let Ne=Array.from(e.querySelectorAll(".board-column")),A=Ne.indexOf(_t),N=tt==="ArrowRight"?1:-1,W=A+N;for(;W>=0&&W<Ne.length;){let Se=Ne[W].querySelector(".board-card");if(Se){wt(rt,Se);return}W+=N}}});function wt(ue,we){try{ue.tabIndex=-1,we.tabIndex=0,we.focus()}catch{}}let qt=null;g&&g.subscribe&&(qt=g.subscribe(()=>{try{Y()}catch{}}));let Lt=null;l&&l.subscribe&&(Lt=l.subscribe(()=>{try{Y()}catch{}}));let Ut=null;return a&&a.subscribe&&(Ut=a.subscribe(()=>{he()})),{async load(){n("load"),Y()},clear(){qe(),He(),qt&&(qt(),qt=null),Lt&&(Lt(),Lt=null),Ut&&(Ut(),Ut=null),e.replaceChildren(),E=[],T=[],te=[],re=[],X=[],L=[],H=new Map,j=new Map}}}function Do(e,t){return e.filter(n=>{let r=Hs(n);return!(r&&t.has(r))})}async function Km(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var dn=e=>e??Yt;function $n(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Po(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function _n(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var Gm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],hu=["orchestration_model","orchestration_effort","orchestration_speed"],bu=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Ym=[...hu,...bu],_u={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},mu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},gu={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},Vm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function en(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ct(e){return typeof e=="string"&&e.length>0?e:null}function no(e){return e.startsWith("gpt-")?e.slice(4):e}function ht(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function yu(e,t,n){let r=Ct(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ct(n[e]);return o===null?null:{value:o,source:"global"}}function _r(e,t,n,r){return yu(e,t,n)||{value:r,source:"base"}}function Ma(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&en(o?.[t])){let s=Ct(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&en(o)){for(let s of Object.values(o))if(en(s)){let l=Ct(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Ct(r?.runners?.[i]?.models?.[e]?.id)||e}function Qm(e,t){return Ct(t?.review?.reviewers?.[e]?.model)||e}function Rn(e,t,n=!1){if(e==="default")return ht(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?no(e):e;return ht(e,t,r,e,"explicit")}function vu(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];en(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(en(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function Xm(e,t){let n=[],r=e?.implementation?.model_catalog;en(r)&&n.push(...Object.keys(r));let o=t?.runners;if(en(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function Zm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Xm(t,n)){let i=vu(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function ei(e){return ht(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function qa(e,t,n){let r=yu(e,t,n);return r?Rn(r.value,r.source):ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function xn(e){let t=en(e.pin)?e.pin:{},n=en(e.global)?e.global:{},r=en(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&en(r.session)?r.session:null,i=r?.supported===!0&&en(r.orchestration)?r.orchestration:null,s=en(e.runner_catalog)?e.runner_catalog:null,l=Ct(n.quick_fix_impl_model),a=Zm(l,o,s),u={};if(o){let d=_r("workflow_mode",t,n,Ct(o.workflow_mode_default));u.workflow_mode=d.source==="base"?ht(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Rn(d.value,d.source);for(let X of["spec_review","plan_review","impl_review"]){let L=`${X}_model`,R=Ct(X==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),M=_r(L,t,n,R);if(M.value===null)u[L]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(M.value!=="self"&&M.value!=="skip"&&!en(o.review?.reviewers?.[M.value]))u[L]=ei(ht(M.value,M.source,"",null,"explicit"));else{let F=Qm(M.value,o);u[L]=ht(M.value,M.source,no(F),F,M.source==="base"?"default":"explicit")}}for(let[X,L]of Object.entries(mu)){let R=u[L].value;if(R==="self"||R==="skip"){u[X]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let M=Ct(o.review?.reviewers?.[R||""]?.effort),F=_r(X,t,n,M);u[X]=F.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}for(let[X,L]of Object.entries(gu)){let R=u[L];if(R.resolution==="incompatible"||R.value==="self"||R.value==="skip"){u[X]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(R.resolution==="unavailable"){u[X]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let M=_r(X,t,n,"default");u[X]=M.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):Rn(M.value,M.source)}let p=en(o.implementation?.default)?o.implementation.default:{},m=Ct(e.route),g=m!==null&&["quick_fix","spec_backed","full_plan"].includes(m),v=en(o.implementation?.route_defaults)?o.implementation.route_defaults:{},E=g&&en(v[m])?v[m]:{},T={},te=!1;if(m==="quick_fix"){let X=Ct(t.impl_runtime),L=Ct(n.quick_fix_impl_runtime),R=X||L,M=R==="inherit"?Ct(e.controller_runtime):R;te=l!==null&&a.runtime!==null&&(R===null||M===a.runtime);let F=Ct(t.impl_dispatch),H=Ct(n.quick_fix_impl_dispatch);if(F!==null)u.impl_dispatch=Rn(F,"pin"),T.impl_dispatch="pin";else if(H!==null)u.impl_dispatch=Rn(H,"global"),T.impl_dispatch="quick_fix";else if(te)u.impl_dispatch=ht("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),T.impl_dispatch="implied";else{let j=Ct(E.dispatch)||Ct(p.dispatch);u.impl_dispatch=j?ht(j,"base",j,j,"default"):ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),T.impl_dispatch="base"}if(X!==null)u.impl_runtime=Rn(X,"pin"),T.impl_runtime="pin";else if(L!==null)u.impl_runtime=Rn(L,"global"),T.impl_runtime="quick_fix";else if(te){let j=a.runtime;u.impl_runtime=ht(j,"global",`${j} (\uC720\uB3C4)`,j,"explicit"),T.impl_runtime="derived"}else{let j=_r("impl_runtime",{},n,Ct(p.runtime));u.impl_runtime=j.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit"),T.impl_runtime=j.source}for(let j of["impl_model","impl_effort","impl_speed"]){let q=Ct(t[j]),V=Ct(n[`quick_fix_${j}`]),B;q!==null?(B={value:q,source:"pin"},T[j]="pin"):j==="impl_model"&&te&&l!==null?(B={value:l,source:"global"},T[j]="quick_fix"):j!=="impl_model"&&V!==null?(B={value:V,source:"global"},T[j]="quick_fix"):(B=_r(j,{},n,Ct(p[j.replace("impl_","")])),T[j]=B.source),u[j]=B.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}}else for(let X of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let L=_r(X,t,n,X==="impl_dispatch"?Ct(E.dispatch)||Ct(p.dispatch):Ct(p[X.replace("impl_","")]));u[X]=L.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}let re=u.impl_dispatch.value==="main";if(re?u.impl_dispatch.display=T.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(T.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":T.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let X=u.impl_runtime.value==="inherit"?Ct(e.controller_runtime):u.impl_runtime.value,L=X?vu(X,o,s):[];m==="quick_fix"&&T.impl_model==="base"&&T.impl_runtime!=="base"&&L.length>0&&!L.includes(u.impl_model.value)&&(u.impl_model=ht("auto","base","auto","auto","default"));let R=u.impl_model.value;if(R!=="auto"&&L.length>0&&!L.includes(R))u.impl_model=ei(u.impl_model);else{let M=Ma(R,X,o,s);u.impl_model.display=no(M),u.impl_model.full_value=M,T.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let X=Ct(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),L=X?Ct(o.implementation?.effort_by_transport?.[X]?.auto):null;L&&!Vm.has(L)?(u.impl_effort.display=`${L} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=L,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}T.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=ht(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=T.impl_speed==="quick_fix"?ht("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):Rn("default",u.impl_speed.source));for(let X of["impl_runtime","impl_effort","impl_speed"])T[X]==="quick_fix"&&u[X].value!==null&&!u[X].display.endsWith("(quick_fix)")&&(u[X].display=`${u[X].display} (quick_fix)`);if(m==="quick_fix"){l!==null&&!te&&a.offered&&(u.quick_fix_impl_model=ei(ht(l,"global","",l,"explicit")));for(let[X,L]of Object.entries(_u))!X.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,X)&&(u[X]={...u[L]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=ht("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(re)for(let X of["impl_runtime","impl_model","impl_effort","impl_speed"])u[X]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of Gm.filter(p=>!Ym.includes(p)))u[d]=qa(d,t,n);if(!o){for(let[d,p]of Object.entries(mu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,p]of Object.entries(gu))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of hu){if(!i){u[d]=qa(d,t,n);continue}let p=d.replace("orchestration_",""),m=Ct(i[p]),g=`quick_fix_${d}`,v=e.route==="quick_fix"?Ct(n[g]):null,E=Ct(t[d]),T=E!==null?{value:E,source:"pin"}:v!==null?{value:v,source:"global"}:_r(d,{},n,m),te=E===null&&v!==null;if(d==="orchestration_effort"&&T.source==="base"){u[d]=ht(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(T.value===null){u[d]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let re=T.source==="base"?Ct(i.model_id)||T.value:Ma(T.value,null,o,s);u[d]=ht(T.value,T.source,`${no(re)}${te?" (quick_fix)":""}`,re,T.source==="base"?"default":"explicit");continue}if(T.value==="default"){u[d]=te?ht("default","global","default (quick_fix)","default","explicit"):T.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):Rn("default",T.source);continue}u[d]=te?ht(T.value,"global",`${T.value} (quick_fix)`,T.value,"explicit"):Rn(T.value,T.source)}for(let d of bu){let p=_u[d];u[d]=u[p]?{...u[p]}:qa(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=ht(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${no(d)})`,null,"default")}else if(a.runtime!==null){let d=Ma(l,a.runtime,o,s);u.quick_fix_impl_model=ht(l,"global",no(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=ei(ht(l,"global","",null,"explicit")):u.quick_fix_impl_model=Rn(l,"global");return u}function Jm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function ti(e){let t=en(e.pin)?e.pin:{},n=en(e.global)?e.global:{},r=en(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let m={...r,...p};return xn({pin:e.layer==="pin"?m:t,global:e.layer==="pin"?n:m,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Ct(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Jm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let m=o({...i,[e.key]:p})[e.key];return{value:p,label:m.display,full_value:m.full_value}})}}function eg(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${$n(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${$n(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function mr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await eg(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function ku(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let p=!1,m=v=>{p||(p=!0,typeof r.close=="function"&&r.close(),r.remove(),d(v))},g=()=>m(i.value.trim());l.addEventListener("click",g),a.addEventListener("click",()=>m(null)),i.addEventListener("keydown",v=>{v.key==="Enter"&&(v.ctrlKey||v.metaKey)&&(v.preventDefault(),g())}),r.addEventListener("cancel",v=>{v.preventDefault(),m(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function ro(e){let{context:t,transport:n,adopt:r}=e,o=await ku(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await mr(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";ge(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function Na(e){return`session:${e.provider}:${e.session_id}`}function Mo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function tg(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function oo(e,t,n,r){return{attempt_id:Na(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Mo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:tg(e,n)}}}var ja="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ng="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",wu="\uBD84\uD574 \uC5C6\uB294 leg";function Vt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var zn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],so=[...zn,"reasoning_output_tokens"],rg={codex:["implementation","review-consult"],claude:["subagent"]};function Fa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!zn.some(t=>Number.isFinite(e[t]))}function og(e){return!e||typeof e!="object"?!1:so.some(t=>Number.isFinite(e[t]))}function Ba(e){let t=0;for(let n of zn)t+=Vt(e?.[n]);return t}function sg(e){return!e||typeof e!="object"?!1:zn.some(t=>Number.isFinite(e[t]))}function $u(e){return!e||typeof e!="object"?!1:so.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function ig(e){let t={};for(let n of so)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function xu(e){let t={};for(let n of so)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Au(e,t){return Fa(t)?Vt(t.total_tokens):e==="codex"?Vt(t.input_tokens)+Vt(t.output_tokens):Ba(t)}function ag(e){return e==="claude"?"Claude":"Codex"}function lg(e){return`\u03C4 ${Eu(e)}`}function cg(e,t){let n=t.breakdown||{},r=Vt(t.total_only_subtotal);if(Fa(n)||r>0&&!og(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,ng];return t.replayed&&u.push(ja),u.join(`
`)}let o=[`\uC785\uB825 ${Vt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Vt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Vt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Vt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Vt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Vt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Vt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${wu} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${wu}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(ja),a.join(`
`)}function an(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${ag(n)} ${lg(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:cg(n,r)})}return t}function ri(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Vt(l.total_only_subtotal)+Vt(s.total_only_subtotal));for(let a of so)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Vt(l.breakdown[a])+Vt(s.breakdown[a]));s.replayed&&(l.replayed=!0),i==="claude"&&(typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)?r.claude+=s.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ua(e){return!e||typeof e!="object"?null:nr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function ug(e){return e==="codex"?"codex":"claude"}function Wn(){return{subtotal:0,breakdown:ig(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ni(e,t,n){e.subtotal+=t.subtotal,Fa(t.usage)&&(e.total_only+=t.subtotal);for(let r of so)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Vt(e.breakdown[r])+Vt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Su(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Eu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function io(e){return sg(e)?`\u03C4 ${Eu(Ba(e))}`:null}function tr(e){let t=io(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function qo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Vt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Vt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Vt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Vt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ba(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ja),n.join(`
`)}function nr(e,t){let n={claude:Wn(),codex:Wn()},r={orchestrator:{claude:Wn(),codex:Wn()},implementation:{claude:Wn(),codex:Wn()},"review-consult":{claude:Wn(),codex:Wn()},subagent:{claude:Wn(),codex:Wn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if($u(a)){let d=ug(l.runner),p=xu(a),m={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:Au(d,p)};p.replayed===!0&&(m.replayed=!0),typeof l.model=="string"&&(m.model=l.model),typeof l.session_id=="string"&&(m.session_id=l.session_id),ni(n[d],m,!0),ni(r.orchestrator[d],m,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!rg[p].includes(d.role)||!$u(d.usage))continue;let m=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!m||o.has(m))continue;o.add(m);let g=xu(d.usage),v={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:g,subtotal:Au(p,g)};v.receipt_id=m,typeof d.agent_type=="string"&&(v.agent_type=d.agent_type),typeof d.agent_id=="string"&&(v.agent_id=d.agent_id),typeof d.model=="string"&&(v.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(v.effort=d.effort),typeof d.session_id=="string"?v.session_id=d.session_id:typeof d.thread_id=="string"&&(v.session_id=d.thread_id),typeof d.turn_id=="string"&&(v.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(v.completed_at=d.completed_at),g.replayed===!0&&(v.replayed=!0),ni(n[p],v,!1),ni(r[v.role][p],v,!1)}}let i={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Su(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),i[l]=u}if(Object.keys(i).length===0)return null;let s={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Su(d,!0),legs:d.legs})}Object.keys(a).length>0&&(s[l]=a)}return{providers:i,roles:s}}var dg=".chip-popover, .judgement-chip";function ao(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let p=d.target;t!==null&&(p&&typeof p.closest=="function"&&p.closest(dg)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function lo(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Tu={running:3,paused:2,failed:1};function rr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Cu(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Ru(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),rr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!rr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),p=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!p&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=Tu[u.run_state],p=Tu[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var oi=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],pg=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],No=[...oi.filter(e=>e!=="impl_dispatch"),...pg,"base_sync_accept_local_commits","bdui_url"],Ou=["base_sync_accept_local_commits"],jo="true";function si(e){let t={};if(!pn(e))return t;for(let[n,r]of Object.entries(e)){if(Ou.includes(n)){r===!0&&(t[n]=jo);continue}typeof r=="string"&&(t[n]=r)}return t}function Iu(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var On=["orchestration_model","orchestration_effort","orchestration_speed"],co=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Wa=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),uo=[...oi,...On],fg=No.filter(e=>uo.includes(e));function _g(e,t){let n={},r=[];for(let[i,s]of Object.entries(Wa)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(Wa,i));return{values:n,warnings:r,skipped_keys:o}}var Fo=["delegated","main"],ii=["inherit","claude","codex"],Hn=["default","fast"],Bo=["standard","fast_track"],Uo=["codex","opus","fable","self","skip"],ai=["codex","fable","skip"],li=["low","medium","high","xhigh"],Lu=["default","fast"],kn="auto";function pn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Du(e){if(!pn(e)||!pn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))pn(r)&&pn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function po(e,t){let n=Du(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[kn,...r.flatMap(([,o])=>o)]}function Pu(e,t,n,r){if(!pn(e)||!pn(e.runners))return[kn];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!pn(s)||!pn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==kn&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[kn,...o]}function Dr(e,t,n){return Pu(e,t,n,(r,o)=>pn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ci(e,t,n){return Pu(e,t,n,(r,o)=>pn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:pn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function fo(e,t){let n=Du(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Mu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!po(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Dr(t,o,r.impl_model||kn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var mg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},gg={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},za=[...fg,...On],hg=[...uo,...No].filter((e,t,n)=>n.indexOf(e)===t&&!za.includes(e));function qu(e,t){let n=pn(e)?e:{},r=pn(t)?t:{},o=[];for(let s of za){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:mg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...hg,...Object.keys(r)])!za.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Nu(e,t,n){let r=pn(e)?e:{},o=_g(pn(t)?t:{},n),i=[];for(let s of Object.values(Wa)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:gg[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Ha(e,t,n,r,o,i,s=null){return ti({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function ju(e,t){let n={};for(let r of No){let o=e?.[r],i=t?.[r];if(o!==i){if(Ou.includes(r)){n[r]=i===jo?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function Fu(e,t){let n={};for(let r of[...On,...co]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var Ka=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...On]}],gr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ui={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ga(e,t,n,r,o,i=null){let s=xn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Bu(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of Ga(e,t,n,r,o,i))s[l.source]+=1;return s}function Uu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Wu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var cx=[...oi,...On];var zu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Wo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function di(e){if(!Wo(e)||!Wo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Wo(n)&&Wo(n.models));return t.length>0?t:null}function In(e,t){let n=di(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Hu(e,t){return Wo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ku(e,t){let n=di(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Hu(r,r.models[t]);return[]}function bg(e){let t=di(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of Hu(r,o))n.includes(i)||n.push(i);return n}function yg(e,t){if(!t)return bg(e);let r=di(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of Ku(e,i))o.includes(s)||o.push(s);return o}function Gu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=In(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?Ku(t,r.impl_model):yg(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}var Ya=new Set(["unavailable","not_applicable"]);function hr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Yu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function br(e,t){return t===null?null:`${gr[e]}: ${t.display} (${ui[t.source]})`}function Va(e){return e.filter(t=>t!==null).join(`
`)}function Qa(e){if(typeof e!="object"||e===null)return null;let t=$n(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Va(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(gr.orchestration_model,e.model),n(gr.orchestration_effort,e.effort),n(gr.orchestration_speed,e.speed)])}}function _o(e,t){let n=hr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=hr(e,"orchestration_effort"),o=hr(e,"orchestration_speed"),i=Yu([In(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Va(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",br("orchestration_model",n),br("orchestration_effort",r),br("orchestration_speed",o)])}}function vg(e,t){return e===null||e.value===null||Ya.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function kg(e){return e===null||Ya.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function wg(e){return e===null?null:e.value==="auto"?"auto":Ya.has(e.resolution)?null:e.display}function Pr(e,t){if(typeof e!="object"||e===null)return null;let n=hr(e,"impl_dispatch"),r=hr(e,"impl_runtime"),o=hr(e,"impl_model"),i=hr(e,"impl_effort"),s=hr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Yu([vg(r,t??null),kg(o),wg(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Va(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",br("impl_dispatch",n),br("impl_runtime",r),br("impl_model",o),br("impl_effort",i),br("impl_speed",s)])}}var $g=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),xg=Object.freeze(["delivery_unproven:"]);function pi(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||$g.has(t))return"session";for(let n of xg)if(t.startsWith(n))return"session";return"settlement"}var Ag=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Sg={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Xa(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Sg[n]||"").filter(n=>n.length>0)}var Vu={orchestration_model:["fable"],impl_runtime:["claude"]},Za={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Qu(e){return typeof e=="object"&&e!==null?e:null}function Xu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Eg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Ag.includes(t))}function zo(e,t=e){let n=Qu(e);if(!n)return null;let r=Xu(n.rec_orchestration_model,Vu.orchestration_model);if(r.length===0)return null;let o=Xu(n.rec_impl_runtime,Vu.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=Qu(t)||{},l=Object.keys(i),a=0,u=0;for(let p of l){let m=s[p];typeof m=="string"&&m.length>0&&(a+=1,m===i[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Eg(n.rec_reason),rec:i,state:d}}function fi(e){if(!e||typeof e!="object")return"";let t=Xa(e),n=Za[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function _i(e){return e.replace(/\/+$/,"")}function Tg(e,t){let n=_i(e),r=_i(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function mi(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Tg(r,o))continue;let i=_i(r),s=_i(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function Ja(e,t){return`${e}\0${t}`}function Zu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ko(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function Ho(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Ju(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Ho(o)})`,location_label:Ho(o),scope:null,same_lane_ahead:!1};let s=Ko(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function ed(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ja(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ja(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,m=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],g=o.get(u);if(g)for(let v of m){let E=r.get(v);E&&E!==u&&!g.includes(E)&&g.push(E)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);i(d,l)&&p&&u.push(p)}u.length>0&&s.set(l,u)}return s}function td(e,t){return Ja(e,t)}var Cg=Object.freeze(["done","abandoned"]);function nd(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!Cg.includes(e.phase)}async function Rg(e){let t=await _n(e);ge(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Mr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Rg(e)}}
    >
      ⧉
    </button></span
  >`}var rd=Object.freeze(["spec_backed","full_plan","quick_fix"]);var Og="worker-ineligible";function Go(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function od(e){return Go(e).includes(Og)}var Ig=new Set(rd),sd=new WeakMap;function mo(e){return e&&typeof e=="object"?e:{}}function Lg(e){let t=sd.get(e);if(t)return t;let n=ad(e);return sd.set(e,n),n}function gi(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Dg(e,t){if(e.length===0)return null;if(Lg(t).has(e))return{lane:"running"};if(gi(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=gi(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=gi(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return gi(t.done,e)>=0?{lane:"done"}:null}function el(e,t){let n=Ig.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function Yo(e,t){let n=mo(e),r=mo(t),o=Zr(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof mo(n.metadata).route=="string"?mo(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&od(n.labels),u=Object.hasOwn(mo(n.metadata),"awaiting_user"),d=Dg(typeof n.id=="string"?n.id:"",r);return el({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function qr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function Vo(e){let t=mo(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function id(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function yi(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ud(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Nr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function dd(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function ld(e){return e==="auto"||e==="click"?e:null}function pd(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let p=typeof u.started_at=="number"?u.started_at:0;p>=o&&(o=p,r=ld(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=ld(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function fd(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function vi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Pg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:yi(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function _d(e,t){let n=Pg(e,t);return n?c`<button
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
            title=${n.deploy.at?nn(n.deploy.at):""}
            >${vi(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Nr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function go(e){let t=fn(e.created_at),n=fn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${nn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${nn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Mg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Xo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Zo(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ki(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function wi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function md(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function or(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&nd(m)).sort((m,g)=>(m.requested_at||0)-(g.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Mg(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=md(l),p=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:p,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function gd(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function bi(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=md(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var qg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function hd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",i=r.state==="unique"?"unique":"unknown",s=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(s[u])?Number(s[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:i,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":i==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:qg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function $i(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Qo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Ng(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function tl(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function jg(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function bd(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:qr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function Fg(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function xi(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=tl(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=tl(e.dependents),i=tl(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>Qo(d,"pred"))}${t}${o.map(d=>Qo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Qo(d,"released"))}${i.map(d=>Qo(Ng(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function yd(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Qo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function Ai(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function Si(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Bg(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function vd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Ei(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${fi(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Ug={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Wg(e,t=!1){let n=kd(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function kd(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function wd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function Ti(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function zg(e){let t=Array.isArray(e.badges)?e.badges:[],n=an(e.usage),r=tr(e.usage),o=fn(e.done_at);return c`<div
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
      ${wd(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${nn(e.done_at)}`}
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
    ${yd(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${qo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${ud(e.work_kind)}
            >작업 ${Nr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function ho(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
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
  </span>`}function Ln(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return zg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=an(e.usage),i=tr(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?fn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",g=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,v=e.lane==="done"?"":Si(e.workflow),E=e.lane==="done"?"":vd(e.from_id),T=Ti(e.priority),te=c`<span class="worker-mini__title">${e.title}</span>`,re=wd(e.pr_url,e.pr_number),X=r.map(lt=>lt===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${lt}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${lt===e.completion_badge&&e.completion_title||""}
          >${lt}</span
        >`),L=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",R=o.length>0?o.map(lt=>c`<span class="worker-usage" title=${lt.tooltip}
              >${lt.label}</span
            >`):i?c`<span class="worker-usage" title=${qo(e.usage)}
            >${i}</span
          >`:"",M=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",F=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",H=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",j=e.discard,q=j?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${j?.attempt_id||""}
          data-operation-id=${j?.operation?.operation_id||""}
          data-discard-mode=${j?.confirmation||"unmerged"}
          ?disabled=${j?!j.enabled:e.discard_enabled===!1}
          title=${j?j.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${j?.label||"\uD3D0\uAE30"}
        </button>`:"",V=j?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${j.operation.operation_id}
        data-operation-kind=${j.operation.kind||""}
        data-last-error=${j.error||""}
        title=${j.abandon.title}
      >
        ${j.abandon.label}
      </button>`:"",B=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",ne=j?.abandon.action?c`${q}${V}${B}`:c`${B}${q}`,ve=e.stale_work||null,Pe=ve?c`${ve.can_resume||ve.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ve.action_id}
            ?disabled=${ve.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ve.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ve.action_id}
            ?disabled=${ve.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ve.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ve.action_id}
            ?disabled=${ve.locked}
          >
            다시 확인
          </button>`:""}`:"",z=ve?c`<div class="worker-mini__stale">
        <strong>${ve.title}</strong>
        <span>${ve.summary}</span>
        <span>${ve.cause}</span>
        ${ve.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ie=e.revise_action?c`<button
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
        </button>`:"",_e=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ce=Ei(e.rec,yr(e,"rec")),Y=Wg(e,yr(e,"receipt")),ae=Ai(e.cross_lane_chip),Z=Mr(e.log_path),be=m||ae||v||E||_e||Ce||Y||R||Z?c`<div class="worker-chips">
          ${m}${ae}${v}${E}${_e?$i(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Ce}${Y}${R}${Z}${hi(e)}
        </div>`:"",Ie=xi(e.dependency_chips),ke=bi(e),Re=t.actions?t.actions:"",at=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||j?.operation||e.revise_action||ve);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${m}${g}${T}${E}${re}${te}${Re}
          </div>
          ${yd(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${R}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${nn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${ud(e.work_kind)}
                  >작업 ${Nr(e.work_ms)}</span
                >`:""}${X}${M}
            <span class="worker-mini__actions"
              >${F}${H}${ne}</span
            >
            ${go(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${g}${T}${re}${X}${L}${Re}
            </div>
            <div class="worker-mini__body">${te}${z}</div>
            ${Ie}${be}${at?c`<div class="worker-mini__foot">
                  ${M}
                  <span class="worker-mini__actions"
                    >${F}${H}${ne}${ie}${Pe}</span
                  >
                  ${bi(e)}
                </div>`:""}
            ${go(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${g}${T}${te}${re}${X}${L}${M}${F}${H}${ne}${Re}
            </div>
            ${Ie}${be}${ke} ${go(e)}`}
  </div>`}function rl(e,t){let n,r=[];for(let o of e){let i=o.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var $d={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function ol(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Za[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Xa(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=$d[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=bd(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=kd(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Ug[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Hg=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function Ci(e,t){for(let n of Hg){if(!t(n))continue;let r=ol(e,n);return r?{chip_key:n,content:r}:null}return null}function hi(e){return e.chip_popover?lo(e.chip_popover.content):""}function yr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var sl="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function il(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=$d[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,p=e.awaiting_user===!0,m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),g=yr(e,"spec_after_blocker"),v=jg(e.spec_after_blocker===!0,g),E=bd(e),T=yr(e,"readiness"),te=Fg(E,T),re=c`${v}${g?hi(e):""}${te}${T?hi(e):""}`,X=xi(e.dependency_chips,v===""&&te===""?"":re),L=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",R=Ai(e.cross_lane_chip),M=Si(u),F=vd(e.from_id),H=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),j=!r&&(e.blocked===!0||e.queue_placeable===!1);return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${j?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Ti(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${yr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${yr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Ei(e.rec,yr(e,"rec"))}${Bg(u,yr(e,"qfr"))}
      ${g||T?"":hi(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Qs(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${X}
    ${L||R||M||F||H?c`<div class="worker-chips">
          ${L}${R}${M}${F}${$i(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?c`<div class="worker-card__place-menu">
            ${rl(t.lanes,e.id)}
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
              title=${qr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:p,missing_description:d,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${go(e)}
  </div>`}function Kn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${dn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?il(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Ln(o))}
          </div>`}
  </section>`}function cd(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function Ri(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${cd("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${dn(r.drop)}
            data-root-dir=${dn(r.root_dir)}
            data-lane-id=${dn(r.lane_id)}
            data-lane-length=${dn(r.lane_length)}
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
        ${cd("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Kg(o))}
          </div>`}
    </section>
  </div>`}function Kg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Kn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${dn(t.drop)}
        data-root-dir=${dn(t.root_dir)}
        data-lane-id=${dn(t.lane_id)}
        data-lane-length=${dn(t.lane_length)}
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
  </div>`}function Oi(e){return e.count?c`<section
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
  </section>`:""}var xd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Jo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ii(e,t){let n=xd.find(o=>o.step===e);if(!n)return null;let r=xd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Ad(e){let t=Jo.findIndex(n=>n.step===e);return Jo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function jr(e){let t=Jo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Gg(e){let t=Jo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Jo.length}}function Li(e){let t=Gg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ll=new Set(["queued","running","retry_pending"]),Sd=new Set(["failed","succeeded"]),Yg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},es={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Vg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:es.base_containment,child_sweep:es.child_sweep,branch_cleanup:es.branch_cleanup,parent_close:es.parent_close};function Qg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Xg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...ll,...Sd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Zg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function al(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=Yg[o];if(!i)return null;let s=Ii(n,`${r} ${i}`);return s?{...s,active:ll.has(o),failed:o==="failed"}:null}function Jg(e){return!e||typeof e!="object"?null:Vg[e.step]||null}function ts(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Jg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Qg(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(v=>v&&typeof v=="object"&&Xg(v,t,l)).sort(Zg):[],u=s?a:[],d=u.find(v=>ll.has(v.state));if(d)return al(d);if(o)return o.step==="repo_operations"&&a[0]?al(a[0],!0):null;let p=u.find(v=>Sd.has(v.state)?v.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return al(p);if(r){let v=Ii(r.step,r.label);return v?{...v,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?es[e.cleanup_cursor]:null;if(!m)return null;let g=Ii(m.step,m.label);return g?{...g,active:!0,failed:!1}:null}function Di(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var eh="\uBBF8\uC801\uC7AC";function cl(e,t){let n=Jn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var th=10080*60*1e3;function Ed(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-th)return null;let o=Jn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${nn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?i.length>0&&(s.openable=!0,s.root_dir=i):s.openable=!0,s}function Td(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Jn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function Cd(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=cl(i,{id:a,location_label:o.get(a)||eh}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(i,l)}return r}var Mi=1,ns=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],rs=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],bo={show_blocked:!0,readiness:"all"},Rd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function nh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!rr(r)||(n=typeof r.status=="string"?r.status:null);return n}function rh(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!rr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function ad(e){let t=it(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(qd(it(t.attempts),n).keys())}function qd(e,t,n={}){let{winners:r,resumed_from_ids:o}=Ru(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(jd(a))continue;let d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,g=pi(a.quickfix_landing)==="session",v=u!=="running"&&(p||!g)&&!o.has(a.attempt_id),E=!p&&g?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,T=it(n.observations?.[s]),te=it(T.pr),re=typeof a.merge_sha=="string"&&a.merge_sha.length>0||te.state==="MERGED",X=or(n.discard_operations,s,{attempt_id:a.attempt_id,merged:re}),L=u==="failed"?Id(a,{resume_eligible:v,resume_reason:E,confirmation:X.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Od(a,e,u),started_at:d,...L?{failure:L}:{},can_pause:u==="running"&&p,can_resume:v})}for(let[s,l]of dh(e,t)){if(i.has(s))continue;let a=l.attempt,u=or(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Fd(a),p=l.run_state==="provider_hold"?ch(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Od(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Id(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:oh(a)}:{},...p?{hold:p}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Od(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:nr(t,e.bead_id)}}function Id(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Fd(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:gd(e),confirmation:t.confirmation,...Nd(t.history)}}function Nd(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function oh(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function jd(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function sh(e,t){let n=typeof e.runner=="string"?e.runner:"",r=it(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function ih(e,t){if(e===null)return null;let n=it(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function ah(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function lh(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||ah(e,r.attempts)?"disarmed":null}function ch(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=sh(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=lh(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,p=ih(s,t.account_catalog),m=Nd(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...p?{account_alias:p}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},...m.log_path?{log_path:m.log_path}:{}}}function Fd(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var uh=new Set(["parked","retry_wait","waiting"]);function dh(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&rr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=jd(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!rr(s)||!uh.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function Ld(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function it(e){return e&&typeof e=="object"?e:{}}function ph(e){let t=it(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function fh(e,t,n){let r=it(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=m=>xn({pin:m,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Dd(_o(a,i),_o(u,i)),p=Dd(Pr(a,null),Pr(u,null));return d||p?{orchestration:d,worker:p}:null}function Dd(e,t){return!e||t&&t.text===e.text?null:e}function _h(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=Ed(e,s,n);l&&i.push(l)}return i.length===0?null:i}function pl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var mh=new Set(["quick_fix","spec_backed","full_plan"]);function Pd(e){return typeof e=="string"&&mh.has(e)}function gh(e){let t={...it(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function hh(e,t,n){let r=e.runner_catalog??null,o=dl(e,t,n,null);if(!o)return null;let i=In(r,o.orchestration_model.value??""),s=i===null?o:dl(e,t,n,i)||o,l=_o(s,r),a=Pr(s,i);return l||a?{orchestration:l,worker:a}:null}function dl(e,t,n,r){let o=Pd(n)?n:Pd(t.route)?t.route:null;try{return xn({pin:t,global:gh(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function bh(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Pr(dl(e,it(t.metadata),t.route,n),n)}function fl(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function yh(e){let t={};for(let l of zn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of zn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?an(ri(s)):n?tr(t):null}function Bd(e,t){let n=Ko(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function vh(e,t,n){let r=t.get(e);if(!r)return Bd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ho(r)}function kh(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&Ko(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":Bd(e,n),title:""};if(s.state==="runnable"&&i&&Ko(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Ho(s),title:""}}function wh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function $h(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function xh(e,t,n,r,o,i,s,l){let a=[];return e.forEach((u,d)=>{let p=typeof u.id=="string"?u.id:"";if(p.length===0)return;let m=u.status==="confirmed"?"confirmed":"draft",g=Array.isArray(u.entries)?u.entries:[],v=[];g.forEach((re,X)=>{let L=re&&typeof re.bead_id=="string"?re.bead_id:"";if(L.length===0)return;let R=re&&typeof re.root_dir=="string"?re.root_dir:"",M=n.get(L),F=M?M.state:void 0,H=F==="running"||F==="pr_wait"||F==="done",j=!M||F==="runnable",q=M&&M.lane==="parallel"&&typeof M.position=="number"?M.position-1:null,V=kh(L,n,r,t,l,m==="confirmed"),B=v.length>0?v[v.length-1]:null,ne=m==="confirmed"&&B!==null&&!B.done&&!(t.get(L)||[]).includes(B.id);v.push({id:L,title:o.get(L)||L,root_dir:M?M.root_dir:R,workspace_name:M?M.workspace_name:i.get(R)||"",seq:X+1,location_label:V.label,location_title:V.title,draggable:!H,fixed:H,done:F==="done",unplaced:j,mismatch:ne,...q!==null?{queue_index:q}:{}})}),v.forEach((re,X)=>{re.seq=X+1});let E=v.length>0&&v.every(re=>re.done),T=v.filter(re=>!re.fixed&&s.armed_by_bead.get(re.id)!==p).map(re=>re.id),te=$h(p,m,v,E,T,s);a.push({lane_id:p,status:m,draft:m==="draft",number:d+1,label:`\uC5F0\uACB0 ${d+1} \xB7 \uB808\uD3EC \uAC04`,rows:v,all_done:E,can_confirm:m==="draft"&&v.length>=2,has_mismatch:m==="confirmed"&&v.some(re=>re.mismatch),unlaunched:T,...te})}),a}function Ah(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function Sh(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:m}=Ah(a,t,n);m!==void 0&&(a.scope_state=m),i.set(u,{cards:[a],scope:p})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let m of a.cards)m.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=s.get(d);p?p.push(a):s.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],m={id:p.id,title:p.title,location_label:vh(p.id,r,o),prefixes:d,...typeof p.root_dir=="string"&&p.root_dir.length>0?{root_dir:p.root_dir}:{}};for(let g of a.cards)g.overlap_chips?g.overlap_chips.push(m):g.overlap_chips=[m]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=mi(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function Md(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Jn(e.id,t),i=typeof e.root_dir=="string"?e.root_dir:"",s=typeof r=="string"&&r.length>0?r:o&&i.length>0?i:"";return s.length>0?{openable:!0,root_dir:s}:o?{openable:!0}:{}}function Eh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Jn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function ul(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Pi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Th(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function Ch(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function vr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...bo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&ns.some($=>$.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),m=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&m.set($.root_dir,$);let g=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&g.set($.root_dir,$.name||$.root_dir);for(let $ of r)$&&typeof $.root_dir=="string"&&g.set($.root_dir,$.name||$.root_dir);let v=[],E=[],T=[],te=[],re=[],X=[],L=new Map,R=new Map,M=new Map,F=new Map,H=new Map,j=new Map,q=new Map,V=new Map,B=new Map,ne=new Map,ve=new Map,Pe=new Map,z=new Map,ie=new Map,_e=new Set,Ce=new Map,Y=new Map,ae=new Map;for(let $ of r){if(!$||typeof $.root_dir!="string")continue;let K=$.root_dir,he=$.name||K,Ye=m.get(K),ct=Ye&&typeof Ye.revision=="number"?Ye.revision:typeof $.revision=="number"?$.revision:0,Ke=it($.attempts),Et=it($.bead_titles);for(let[x,I]of Object.entries(Et))typeof I=="string"&&I.length>0&&ae.set(x,I);let Dt=it($.bead_times),st=it($.pr_observations),wt=it($.admission);for(let[x,I]of Object.entries(wt))I&&typeof I=="object"&&ve.set(x,I);let qt=it($.revise_parked),Lt=it($.merge_queue_state),Ut=it($.cleanup_failed),ue=it($.discard_operations),we=it($.bead_timelines),Ue=it($.bead_blocked_by);Object.hasOwn($,"bead_scope")&&Ce.set(K,it($.bead_scope));let rt=it($.bead_workflow),tt=it($.pr_activity),_t=Array.isArray($.repo_operations)?$.repo_operations:[];V.set(K,_t);let bt=typeof $.declared_base=="string"?$.declared_base:null;q.set(K,bt),j.set(K,Object.entries(Ut).map(([x,I])=>({bead_id:x,step:I&&I.step?I.step:"",reason:I&&I.reason?I.reason:"",at:I&&typeof I.at=="number"?I.at:null,detail:I&&typeof I.detail=="string"?I.detail:null,output_tail:I&&typeof I.output_tail=="string"&&I.output_tail?I.output_tail:void 0,log_path:I&&typeof I.log_path=="string"&&I.log_path?I.log_path:void 0,retry_count:I&&typeof I.retry_count=="number"&&Number.isInteger(I.retry_count)&&I.retry_count>0?I.retry_count:0,failure_code:I&&typeof I.failure_code=="string"?I.failure_code:void 0})));for(let[x,I]of Object.entries(it($.bead_overlay)))I&&typeof I=="object"&&B.set(`${K}\0${x}`,I);let ot=new Map;for(let x of Object.values(Ke))x&&typeof x.attempt_id=="string"&&ot.set(x.attempt_id,x);let Ne=Array.isArray($.merge_queue)?$.merge_queue:[],A=new Set(Ne.filter(x=>x&&typeof x.bead_id=="string").map(x=>x.bead_id)),N=new Map(Ne.filter(x=>x&&typeof x.bead_id=="string").map(x=>[x.bead_id,x])),W=new Map,Se=new Map,ye=new Map,mt=new Map;Ne.forEach((x,I)=>{x&&typeof x.bead_id=="string"&&(W.set(x.bead_id,I+1),Se.set(x.bead_id,x.resolution),ye.set(x.bead_id,x.continuation_action||null),mt.set(x.bead_id,x.authority||null))});let $t=it($.auto_merge_skips),vt=x=>{let I=$t[x];if(!I)return null;let Te=it(it(st[x]).pr).head_sha;return Te&&Te===I.head_sha?I.reason||"":null};H.set(K,{positions:W,resolutions:Se,continuations:ye,authorities:mt,state:{active:typeof Lt.active=="string"?Lt.active:null,failures:it(Lt.failures),waiting:Lt.waiting&&typeof Lt.waiting.bead_id=="string"&&typeof Lt.waiting.reason=="string"?Lt.waiting:null},auto_excluded:(Array.isArray($.pr_wait)?$.pr_wait:[]).map(x=>x&&x.bead_id).filter(x=>typeof x=="string"&&vt(x)!==null),running:Ne.length>0});let xt=Array.isArray($.queue)?$.queue:[];for(let x of[...xt,...Array.isArray($.pr_wait)?$.pr_wait:[]])x&&typeof x.bead_id=="string"&&typeof x.armed_by_lane=="string"&&x.armed_by_lane.length>0&&z.set(x.bead_id,x.armed_by_lane);for(let x of Array.isArray($.disarmed_on_load)?$.disarmed_on_load:[])typeof x=="string"&&x.length>0&&_e.add(x);let jt=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).filter(x=>x&&/^s[1-5]$/.test(x.id)&&Array.isArray(x.entries)),zt=it($.lane_states),Ft=typeof $.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor($.serial_lane_count))):Math.min(5,jt.length);M.set(K,Ft),F.set(K,xt.length);let kt=new Map(jt.map(x=>[x.id,x])),Xt=new Map;for(let x of jt)for(let I of x.entries)I&&typeof I.bead_id=="string"&&Xt.set(I.bead_id,x.id);for(let[x,I]of Object.entries(it($.bead_dependents))){let Te=Array.isArray(I?.ids)?I.ids:[],Ge=it(I?.root_dirs),De=Pe.get(x)||{ids:new Set,root_dirs:{}};for(let f of Te)typeof f=="string"&&f.length>0&&De.ids.add(f);for(let[f,h]of Object.entries(Ge))typeof h=="string"&&h.length>0&&(De.root_dirs[f]=h);Pe.set(x,De)}for(let[x,I]of Object.entries(Ue))Array.isArray(I)&&ne.set(x,I.filter(Te=>typeof Te=="string"&&Te.length>0));let Zt=Array.isArray($.done)?$.done:[];for(let x of Zt)x&&typeof x.bead_id=="string"&&X.push({id:x.bead_id,root_dir:K,workspace_name:he});let Bt=new Map;for(let x of Zt)x&&typeof x.bead_id=="string"&&typeof x.added_at=="number"&&Bt.set(x.bead_id,x.added_at);let Rt=x=>({id:x,title:Et[x]||x,root_dir:K,workspace_name:he,expected_revision:ct,draggable:!1,...it(Dt[x]).created_at?{created_at:it(Dt[x]).created_at}:{},...it(Dt[x]).updated_at?{updated_at:it(Dt[x]).updated_at}:{}}),Qt=x=>{let I=rt[x]?.chips?.pr;return I&&typeof I.number=="number"&&typeof I.url=="string"?{pr_number:I.number,pr_url:I.url}:{}},Ae=x=>Object.hasOwn(Ue,x)?{blocked_by:Array.isArray(Ue[x])?Ue[x].filter(I=>typeof I=="string"&&I.length>0):[]}:{},S=(x,I)=>{let Te=Ae(x),Ge=wt[x],De=Ge&&Ge.reason==="prerequisite_unmet"&&Array.isArray(Ge.blockers)?Ge.blockers:[],f=[...(I?.blockers||[]).map(O=>O.id),...De.map(O=>O.id)].filter(O=>typeof O=="string"&&O.length>0);if(f.length===0)return Te;let h=[...Te.blocked_by||[]];for(let O of f)h.includes(O)||h.push(O);return{blocked_by:h}},fe=new Set;for(let[x,I]of qd(Ke,Bt,{discard_operations:ue,observations:st,bead_timelines:we,provider_hold:it($.provider_hold),auto_resume_pending:Array.isArray($.auto_resume_pending)?$.auto_resume_pending:[],account_catalog:it($.account_catalog)})){fe.add(x);let Te=I.run_state==="failed"?wh(Ke,I.attempt_id):null;Te!==null&&ie.set(x,Te);let Ge=ot.get(I.attempt_id)||null,De=B.get(`${K}\0${x}`),f=De&&De.rollup?De.rollup:null,h=pl(bt,Ge?Ge.target_base:null),O=Ge?fl(Ge,ot):!1,D=Ge&&Ge.quickfix_lane===!0&&Ge.quickfix_landing&&typeof Ge.quickfix_landing=="object"?Ge.quickfix_landing:null,_=D&&typeof D.reason=="string"&&D.reason.length>0?D.reason:null,b=D?ts({bead_id:x,merge_sha:D.head_sha,cleanup_cursor:D.cursor,cleanup_failed:_?{step:D.cursor,reason:_}:null,repo_operations:_t}):null;E.push({...Rt(x),lane:"running",...S(x,I.wait),...Xt.has(x)?{serial_lane_id:Xt.get(x)}:{},attempt_id:I.attempt_id,run_state:I.run_state,status:I.status||void 0,workflow:rt[x]||null,can_pause:I.can_pause,can_resume:I.can_resume,started_at:I.started_at,last_event_at:I.last_event_at,last_activity:I.last_activity,legs:I.legs,runner:I.runner,model:I.model,effort:I.effort,speed:I.speed,resumed_from:I.resumed_from,continuation_mode:I.continuation_mode,usage:I.usage,failure:I.failure||null,hold:I.hold||null,wait:I.wait||null,retry:I.retry||null,exec_chips:{orchestration:Qa(I),worker:bh(it(Ye),De,I.runner||null)},discard:or(ue,x,{attempt_id:I.attempt_id,merged:I.failure?.confirmation==="merged"||it(st[x]).pr?.state==="MERGED"}),...f?{rollup:f}:{},...O?{conflict_resolution:!0}:{},...h?{base_exception:h}:{},...b?{landing:b}:{},badges:I.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:I.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:I.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:I.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:I.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:I.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:I.run_state==="failed"})}for(let[x,I]of Cu(Ke)){if(E.some(Ge=>Ge.id===x))continue;let Te=I.attempt;E.push({...Rt(x),lane:"running",kind:"session",...Ae(x),attempt_id:typeof Te.attempt_id=="string"?Te.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:rt[x]||null,can_pause:!1,can_resume:!1,started_at:I.started_at,last_event_at:typeof Te.last_event_at=="number"?Te.last_event_at:null,last_activity:Te.last_activity&&typeof Te.last_activity=="object"?Te.last_activity:null,legs:Array.isArray(Te.legs)?Te.legs:[],runner:typeof Te.runner=="string"?Te.runner:null,model:typeof Te.model=="string"?Te.model:null,effort:typeof Te.effort=="string"?Te.effort:null,speed:typeof Te.speed=="string"?Te.speed:null,resumed_from:null,continuation_mode:null,usage:Te.usage&&typeof Te.usage=="object"?Te.usage:null,exec_chips:{orchestration:Qa(Te),worker:null},discard:or(ue,x,{merge_queued:!0}),badges:[I.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let x of Array.isArray($.session_active)?$.session_active:[]){let I=x&&x.bead_id;typeof I!="string"||fe.has(I)||(fe.add(I),Array.isArray(x.blocked_by)&&x.blocked_by.length>0&&ne.set(I,x.blocked_by.filter(Te=>typeof Te=="string"&&Te.length>0)),typeof x.title=="string"&&x.title.length>0&&ae.set(I,x.title),E.push({...Rt(I),title:x.title||Et[I]||I,lane:"running",kind:"session",status:"in_progress",started_at:ul(x.started_at)??ul(x.updated_at)??void 0,updated_at:ul(x.updated_at)??void 0,workflow:x.workflow||null,labels:Array.isArray(x.labels)?x.labels:[],spec_id:typeof x.spec_id=="string"?x.spec_id:"",blocked:x.blocked===!0,...Array.isArray(x.blocked_by)?{blocked_by:x.blocked_by.filter(Te=>typeof Te=="string"&&Te.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(x.session_refs)?x.session_refs:[],badges:[],alert:!1}))}for(let x of Array.isArray($.pr_wait)?$.pr_wait:[]){let I=x&&x.bead_id;if(typeof I!="string"||fe.has(I))continue;fe.add(I);let Te=it(st[I]),Ge=it(Te.pr),De=Te.gate?it(Te.gate):null,f=A.has(I),h=N.get(I)?.continuation_action||null,O=!!h&&h.continuation===null,D=Lt.active===I,_=x.external===!0,b=Ut[I]||null,ee=it(tt[I]),de=ts({bead_id:I,merge_sha:x.merge_sha,cleanup_cursor:x.cleanup_cursor,merge_progress:ee.merge_progress||null,cleanup_failed:b,repo_operations:_t}),Be=Di(de),gt=!!De&&De.base_badge==="\uCDA9\uB3CC",Tt=!!b&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(b.step)&&!!De&&De.tier==="merged",Ht=_&&!!b&&!!De&&De.tier==="merged",Gn=!!De&&["closed_unmerged","review","undecidable"].includes(De.tier),Kt=or(ue,I,{external:_,merge_active:D||de?.step==="merge",merge_queued:f,cleanup_active:Be,merged:!!b||De?.tier==="merged"}),cn=!!Kt.operation,Hr=ph(Te.receipt_check);T.push({...Rt(I),lane:"pr_wait",...Ae(I),...Hr.length>0?{receipt_badge:{codes:Hr}}:{},workflow:rt[I]||null,pr_number:typeof Ge.number=="number"?Ge.number:null,pr_url:typeof Ge.url=="string"?Ge.url:void 0,external:_,usage:nr(Ke,I),merge_step:de,badges:O?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:de?[De?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:b?[jr(b.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${jr(b.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof De?.gate_badge=="string"&&De.gate_badge.length>0?[De.gate_badge]:[],alert:de?de.failed===!0:!!b||Gn,reason:b&&de?.active!==!0?Li(b.step):"PR \uB300\uAE30",merge_action:De?.tier==="merged"&&!Tt&&!Ht?!1:!f||O,merge_enabled:!cn&&(O||De?.enabled===!0||gt||Tt||Ht),merge_label:O?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ht||Tt?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":gt&&!Tt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:O?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":cn?Kt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Kt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Kt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ht?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Tt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":gt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":De?.enabled===!0?`\uBA38\uC9C0 (${De.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${De?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:f&&!O,cancel_enabled:!D,continuation_mismatch:h?.mismatch||null,discard:Kt,discard_action:Kt.action,discard_enabled:Kt.enabled,discard_title:Kt.title})}let Le=(x,I,Te,Ge)=>{let De=x&&x.bead_id;if(typeof De!="string"||fe.has(De))return null;fe.add(De);let f=qt[De],h=or(ue,De),O=h.operation?h:null,D={...Rt(De),lane:I,workflow:rt[De]||null,draggable:!O,discard:O||void 0,reason:Ld(wt,De),seq:Te+1,queue_position:Te+1,queue_index:Te,queue_length:Ge,badges:f?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!f,revise_action:!!f,revise_enabled:!!f&&!O,revise_title:f?f.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${f.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},_=S(De,null);return Object.hasOwn(_,"blocked_by")&&(D.blocked_by=_.blocked_by),D};for(let x=0;x<xt.length;x++){let I=Le(xt[x],"queue",x,xt.length);if(!I)continue;te.push(I);let Te=L.get(K);Te?Te.push(I):L.set(K,[I])}let yt=x=>{let I=T.find(f=>f.id===x&&f.root_dir===K);if(I)return{id:x,title:I.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let Te=E.find(f=>f.id===x&&f.root_dir===K),Ge=Te?Te.run_state:nh(Ke,x),De=Ge==="failed"||Ge==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Ge==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:x,title:Te?Te.title:Rt(x).title,badge:De}},Qe=[];for(let x=0;x<Math.max(Ft,jt.length);x++){let I=`s${x+1}`,Te=kt.get(I),Ge=Te&&Array.isArray(Te.entries)?Te.entries:[],De=it(zt[I]),f=Array.isArray(De.occupied_by)?De.occupied_by.filter(D=>typeof D=="string"):[],h=new Set(f),O=[];for(let D=0;D<Ge.length;D++){let _=Ge[D]&&Ge[D].bead_id;if(typeof _=="string"&&h.has(_)){fe.add(_);continue}let b=Le(Ge[D],I,D,Ge.length);b&&(O.push(b),te.push(b))}O.length===0&&f.length===0&&(Ft<=1||x>=Ft)||Qe.push({id:I,index:x,items:O,raw_length:Ge.length,occupied_by:f,occupants:f.map(D=>yt(D)),corrections:Array.isArray(De.corrections)?De.corrections.length:0,cycle:De.cycle===!0,...O.length===0&&f.length===0?{empty:!0}:{}})}R.set(K,Qe);let St=Array.from({length:Ft},(x,I)=>{let Te=`s${I+1}`,Ge=kt.get(Te),De=Ge&&Array.isArray(Ge.entries)?Ge.entries:[],f=it(zt[Te]);return{id:Te,index:De.length,length:De.length,occupied_by:Array.isArray(f.occupied_by)?f.occupied_by.filter(h=>typeof h=="string"):[]}});for(let x of Array.isArray($.runnable)?$.runnable:[]){let I=x&&x.bead_id;if(typeof I!="string"||fe.has(I))continue;fe.add(I);let Te=x.workflow&&typeof x.workflow=="object"?x.workflow:null,Ge=Te&&typeof Te.route=="string"&&Te.route||(typeof x.route=="string"?x.route:null),De=fh(it(Ye),x.exec_pins,Ge),f=zo(x.rec,x.exec_pins);Array.isArray(x.blocked_by)&&x.blocked_by.length>0&&ne.set(I,x.blocked_by.filter(Ht=>typeof Ht=="string"&&Ht.length>0)),typeof x.title=="string"&&x.title.length>0&&ae.set(I,x.title),Array.isArray(x.scope)&&Y.set(I,x.scope.filter(Ht=>typeof Ht=="string"&&Ht.length>0));let h=Object.hasOwn(x,"eligible"),D=!h&&Object.hasOwn(x,"route")&&Object.hasOwn(x,"spec_state")&&Object.hasOwn(x,"has_description")&&Object.hasOwn(x,"awaiting_user")&&Object.hasOwn(x,"worker_ineligible")?el({route:typeof x.route=="string"?x.route:"",spec:x.spec_state,has_description:x.has_description===!0,awaiting_user:x.awaiting_user===!0,worker_ineligible:x.worker_ineligible===!0},null):null,_=h?x.eligible!==!1:D?D.placeable:!0,b=D?D.worker_ineligible:x.worker_ineligible===!0,ee=_&&!b,de=D?{route_ok:D.route_ok,awaiting_user:D.awaiting_user,missing_description:D.missing_description,placement_spec:D.spec}:Object.hasOwn(x,"route_ok")?{route_ok:x.route_ok===!0,awaiting_user:x.awaiting_user===!0,missing_description:x.missing_description===!0,placement_spec:x.placement_spec}:null,Be=[];!h&&D&&!D.placeable&&Be.push(qr(D)),typeof x.reason=="string"&&x.reason.length>0&&Be.push(x.reason);let gt=Ld(wt,I);gt&&Be.push(gt);let Tt=_h(I,x.release_info,p)?.map(Ht=>({...Ht,...Md({id:I,root_dir:K},Ht.id)}));v.push({...Rt(I),title:x.title||Et[I]||I,lane:"runnable",draggable:!h&&ee,queue_placeable:ee,...de||{},...b?{worker_ineligible:!0}:{},...x.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof x.session_preferred_reason=="string"?x.session_preferred_reason:""}:{},...x.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...Tt?{dependency_chips:{released:Tt}}:{},...x.dependents_info&&typeof x.dependents_info=="object"?{dependents_info:x.dependents_info}:{},reason:Be.join(" \xB7 "),created_at:x.created_at??void 0,updated_at:x.updated_at??void 0,status:typeof x.status=="string"?x.status:void 0,labels:Array.isArray(x.labels)?x.labels:[],spec_id:typeof x.spec_id=="string"?x.spec_id:"",published:x.published===!0,workflow:Te||(Ge?{route:Ge,chips:{route:Ge}}:null),...De?{exec_chips:De}:{},...f?{rec:f}:{},blocked:x.blocked===!0,...Array.isArray(x.blocked_by)?{blocked_by:x.blocked_by.filter(Ht=>typeof Ht=="string"&&Ht.length>0)}:{},place_index:xt.length,place_lanes:St})}for(let x of Zt){let I=x&&x.bead_id;if(typeof I!="string"||fe.has(I)||(fe.add(I),i!==void 0&&typeof x.added_at=="number"&&x.added_at<i))continue;let Te=rh(Ke,I),Ge=Te&&typeof Te.done_kind=="string"?Te.done_kind:null;re.push({...Rt(I),lane:"done",done:!0,done_layout:"three_line",usage:nr(Ke,I),work_ms:fd(Ke,I),done_at:typeof x.added_at=="number"?x.added_at:void 0,done_kind:Ge,...Qt(I),badges:[...Ge&&Rd[Ge]?[Rd[Ge]]:[],...dd(Ke,I)]})}for(let x of Array.isArray($.session_done)?$.session_done:[]){let I=x&&(x.id||x.bead_id);typeof I!="string"||fe.has(I)||(fe.add(I),re.push({...Rt(I),...x,id:I,root_dir:K,workspace_name:he,expected_revision:ct,lane:"done",done:!0}))}}if(B.size>0)for(let $ of[...v,...te,...E,...T,...re]){let K=B.get(`${$.root_dir}\0${$.id}`);if(!K||(typeof K.priority=="number"&&($.priority=K.priority),typeof K.from_id=="string"&&K.from_id.length>0&&($.from_id=K.from_id),$.lane==="done"&&Array.isArray(K.carried_to)&&K.carried_to.length>0&&($.carried_to=K.carried_to),!Object.hasOwn(K,"metadata")))continue;let he=it(K.metadata);if($.rec=zo(he),$.lane==="runnable"||$.lane.startsWith("s")||$.lane==="queue"){let Ye=hh(it(m.get($.root_dir)),he,typeof K.route=="string"&&K.route.length>0?K.route:it($.workflow).route);Ye&&($.exec_chips=Ye)}}let Z=new Map;o.forEach(($,K)=>{$&&typeof $.root_dir=="string"&&Z.set($.root_dir,K)});let be=n&&n.running_sort==="repo"?"repo":"started";E.sort(($,K)=>{let he=$.kind==="session",Ye=K.kind==="session";if(he!==Ye)return he?1:-1;if(he&&Ye){let Et=Pi(K.updated_at)-Pi($.updated_at);return Et!==0?Et:$.id.localeCompare(K.id)}if(be==="repo"){let Et=Z.get($.root_dir)??Number.MAX_SAFE_INTEGER,Dt=Z.get(K.root_dir)??Number.MAX_SAFE_INTEGER;if(Et!==Dt)return Et-Dt}let ct=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,Ke=typeof K.started_at=="number"&&Number.isFinite(K.started_at)?K.started_at:null;return ct!==null&&Ke!==null&&ct!==Ke?ct-Ke:ct===null&&Ke!==null?1:ct!==null&&Ke===null?-1:$.id.localeCompare(K.id)}),re.sort(($,K)=>(K.done_at??0)-($.done_at??0));let Ie=o.length>0?o:r.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,runner_catalog:$&&$.runner_catalog})),ke=new Set(v.map($=>$.root_dir)),Re=new Map;for(let $ of E)$.kind==="session"||$.run_state!=="running"||Re.set($.root_dir,(Re.get($.root_dir)||0)+1);let at=new Map;for(let $ of re){let K=at.get($.root_dir);K?K.push($):at.set($.root_dir,[$])}let lt={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Q=[];for(let $ of Ie){if(!$||typeof $.root_dir!="string")continue;let K=L.get($.root_dir)||[],he=R.get($.root_dir)||[],Ye=K.length>0||he.some(Et=>Et.items.length>0||Et.occupied_by.length>0);if(u!=="all"&&!Ye&&!ke.has($.root_dir))continue;let ct=typeof $.slots=="number"&&$.slots>=Mi?$.slots:Mi,Ke=Re.get($.root_dir)||0;Q.push({live_count:Ke,over_cap:Ke>ct,merge:H.get($.root_dir)||lt,token_total:yh(at.get($.root_dir)||[]),cleanup_failures:j.get($.root_dir)||[],declared_base:q.get($.root_dir)??null,repo_operations:V.get($.root_dir)||[],root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:ct,revision:typeof $.revision=="number"?$.revision:0,runner_catalog:it($.runner_catalog),items:K,sublanes:{parallel:K,serial:he},serial_lane_count:M.get($.root_dir)||0,raw_queue_length:F.get($.root_dir)||0})}let oe={runnable:v,runnable_all:v,runnable_hidden:{blocked:0,readiness:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:te,queue_groups:Q,running:E,pr_wait:T,done:re,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(F),owner_of:{}},se=Zu(oe);for(let $ of X)se.has($.id)||se.set($.id,{root_dir:$.root_dir,workspace_name:$.workspace_name,lane:"done",state:"done"});for(let $ of[...oe.queue,...oe.runnable,...oe.running,...oe.pr_wait]){if(!Object.hasOwn($,"blocked_by"))continue;let K=se.get($.id);$.blockers=($.blocked_by||[]).map(he=>Ju(he,K,se,o))}for(let $ of[...oe.queue,...oe.runnable,...oe.running,...oe.pr_wait]){let K=($.blockers||[]).map(ct=>({...cl($.id,ct),...Md($,ct.id,se)})),he=Td($.id,Eh(Pe.get($.id),$.dependents_info,$,se));if(K.length===0&&he.length===0)continue;let Ye={...$.dependency_chips||{},...K.length>0?{predecessors:K}:{},...he.length>0?{dependents:he}:{}};$.dependency_chips=Ye}Sh(oe,Ce,Y,se,o);let pe=ed(oe.queue_groups);for(let $ of oe.queue_groups)for(let K of $.sublanes.serial){let he=pe.get(td($.root_dir,K.id));he&&(K.cross_wait_peers=he)}oe.chain_lanes=xh(l&&Array.isArray(l.lanes)?l.lanes:[],ne,se,o,ae,g,{armed_by_bead:z,failed_by_bead:ie,disarmed_lanes:_e},ve);let Ee=new Map;for(let $ of[...oe.queue,...oe.runnable])Ee.has($.id)||Ee.set($.id,$);let me=new Set;for(let $ of oe.chain_lanes)for(let K of $.rows){if($.status==="confirmed"&&!K.unplaced&&!K.fixed&&me.add(K.id),!$.draft&&!K.unplaced)continue;let he=Ee.get(K.id);he&&(he.cross_lane_chip={lane_id:$.lane_id,number:$.number,status:$.status,label:$.draft?`\uC5F0\uACB0 ${$.number} (draft)`:`\uC5F0\uACB0 ${$.number}`})}let Oe=new Map(oe.chain_lanes.map($=>[$.lane_id,$]));for(let $ of[...oe.queue,...oe.running]){let K=z.get($.id);if(typeof K!="string"||K.length===0)continue;let he=Oe.get(K);$.armed_lane_chip=he===void 0||he.status==="draft"?{lane_id:K,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:K,label:`\u25B6 \uC5F0\uACB0 ${he.number}`,orphan:!1}}let Fe=[];for(let $ of L.values())for(let K of $)me.has(K.id)||Fe.push(K);Fe.sort(($,K)=>{let he=$.workspace_name.localeCompare(K.workspace_name);return he!==0?he:($.queue_index??0)-(K.queue_index??0)}),oe.parallel_rows=Fe;let Ze={};for(let[$,K]of se)typeof K.root_dir=="string"&&K.root_dir.length>0&&(Ze[$]=K.root_dir);for(let $ of oe.chain_lanes)for(let K of $.rows)!Object.hasOwn(Ze,K.id)&&K.root_dir.length>0&&g.has(K.root_dir)&&(Ze[K.id]=K.root_dir);oe.owner_of=Ze;let ze=oe.runnable.length;oe.runnable_all=oe.runnable.slice();let J=oe.runnable,U=$=>s.show_blocked||$.blocked!==!0,qe=$=>s.readiness==="all"||(s.readiness==="ready"?$.queue_placeable===!0:$.queue_placeable!==!0);if(d==="per_control"){let $=[],K=0,he=0;for(let Ye of J){let ct=U(Ye),Ke=qe(Ye);ct&&Ke?$.push(Ye):!ct&&Ke?K+=1:ct&&!Ke&&(he+=1)}J=$,oe.runnable_hidden={blocked:K,readiness:he}}else{J=J.filter(U);let $=J.length;J=J.filter(qe),oe.runnable_hidden={blocked:ze-$,readiness:$-J.length}}let ft=($,K)=>{let he=Pi(K.updated_at)-Pi($.updated_at);return he!==0?he:$.id.localeCompare(K.id)},He=a==="repo_spec"?($,K)=>{let he=$.queue_placeable===!0?0:1,Ye=K.queue_placeable===!0?0:1;if(he!==Ye)return he-Ye;let ct=$.published===!0?0:1,Ke=K.published===!0?0:1;return ct!==Ke?ct-Ke:ft($,K)}:ft;if(a==="as_given")oe.runnable=J,oe.runnable_sections=[];else if(a==="updated_flat")oe.runnable=J.slice().sort(ft),oe.runnable_sections=[];else{let $=new Map;for(let Ye of J){let ct=$.get(Ye.root_dir);ct?ct.push(Ye):$.set(Ye.root_dir,[Ye])}let K=[],he=[];for(let Ye of Ie){if(!Ye||typeof Ye.root_dir!="string")continue;let ct=($.get(Ye.root_dir)||[]).slice().sort(He);$.delete(Ye.root_dir),ct.length!==0&&(K.push({root_dir:Ye.root_dir,name:Ye.name||Ye.root_dir,items:ct.map(Ke=>({...Ke,workspace_name:""}))}),he.push(...ct))}for(let[Ye,ct]of $){let Ke=ct.slice().sort(He);K.push({root_dir:Ye,name:Ke[0]?.workspace_name||Ye,items:Ke.map(Et=>({...Et,workspace_name:""}))}),he.push(...Ke)}oe.runnable=he,oe.runnable_sections=K}let et=Th(n?n.search:void 0);return et&&Ch(oe,et),oe}function Ud(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),m=Number(l.get(a))>Number(l.get(d));p&&m&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var Rh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",qi="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Oh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Ih="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",yo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function os(e,t){return`${e}\0${t}`}function Lh(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function Dh(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function as(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=Lh(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[p,m]of o)for(let g of m)i.push({blocker:g,blockee:p});let s=Dh(e,t),l=new Map(r.map((p,m)=>[p,m])),a=r.slice(0,s).filter(p=>o.get(p).some(m=>Number(l.get(m))>Number(l.get(p)))),u=Ud(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,s),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function zd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:as(n,t)}function Ph(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Mh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function qh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function _l(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function Nh(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(os(s,a));let r=new Map,o=new Map;for(let s of e){let l=os(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=os(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function jh(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function Fh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Wd(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function ml(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function ls(e){let t=qh(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Mh(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let m=t.get(u)||[];if(m.includes(d))return;let g=i(u);if(g!==null){if(_l(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...m,d]),p!==void 0&&r.add(os(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:g,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let m=i(u);m!==null&&(t.set(u,p.filter(g=>g!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:m}))},laneCreated:(u,d)=>r.has(os(u,d))}}function cs(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=Nh(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Ph(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function Hd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function ss(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Kd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function is(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ni(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function ji(e,t,n){let r=ls(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Rh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Oh};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${ml(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:yo}}if(e.kind==="chain"&&d===void 0)return{refused:yo};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let v=d.entries.findIndex(X=>X.bead_id===e.bead_id);if(v<0)return;let E=v>0?d.entries[v-1]:null,T=v+1<d.entries.length?d.entries[v+1]:null,te=ss(d,v),re=T!==null&&ss(d,v+1);te&&E!==null&&r.removeDep(e.bead_id,E.bead_id),re&&T!==null&&r.removeDep(T.bead_id,e.bead_id),(te||re)&&E!==null&&T!==null&&r.addDep(T.bead_id,E.bead_id,u)},m=(v,E)=>{let T=n.cross_lanes.get(v),te=T.entries.findIndex(q=>q.bead_id===e.bead_id),re=T.entries.filter(q=>q.bead_id!==e.bead_id),X=Math.max(0,Math.min(re.length,te>=0&&E>te?E-1:E)),L=-1;if(re.forEach((q,V)=>{n.fixed_members.has(q.bead_id)&&(L=V)}),X<=L){r.state.refusal=Ih;return}let R=te>=0?T.entries[te]:d?.entries.find(q=>q.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=as({status:T.status,entries:[...re.slice(0,X),R,...re.slice(X)]},n);let M=l.entries;if(Ni(M,T.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:v,entries:is(M)}}),T.status!=="confirmed")return;let F=M.findIndex(q=>q.bead_id===e.bead_id),H=F>0?M[F-1].bead_id:null,j=F+1<M.length?M[F+1].bead_id:null;if(H===null){j!==null&&r.addDep(j,e.bead_id,v);return}if(r.addDep(e.bead_id,H,v),j!==null&&(r.graph.get(j)||[]).includes(H)){let q=T.entries.findIndex(V=>V.bead_id===j);(r.laneCreated(j,H)||q>0&&T.entries[q-1].bead_id===H&&ss(T,q))&&r.removeDep(j,H),r.addDep(j,e.bead_id,v)}},g=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u))){let v=d.entries.filter(T=>T.bead_id!==e.bead_id),E=d.status==="confirmed"&&v.length<2?d.entries:d.entries.filter(T=>T.bead_id===e.bead_id);s.push(...Kd(n,d,u,E)),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:is(v)}})}if(t.kind==="chain"&&m(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let v=jh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(Wd(e.bead_id,e.root_dir,v));else if(e.kind==="parallel"){let E=n.parallel_rows,T=E[Math.max(0,Math.min(E.length,t.marker_index))];if(!(!!T&&T.bead_id===e.bead_id)&&Fh(n,e.root_dir)&&g!==void 0){let re=g>v?v:v-1;re>=0&&re!==g&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:re},root_dir:e.root_dir})}}}else if(t.kind!=="chain")if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(g!==void 0&&t.index!==g){let v=g>t.index?t.index:t.index-1;v>=0&&v!==g&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:v},root_dir:e.root_dir})}}else i.push(Wd(e.bead_id,e.root_dir,t.index,t.lane_id));return cs(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Gd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:yo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=as(n,t);if(r.held)return{refused:qi};let o=r.entries,i=ls(t),s=[];Hd(i,o,e);let l=Ni(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:is(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),cs(i,t,l,s,{lane_id:e,correction:r})}function Yd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:yo};let r=as(n,t),o=r.entries,i=ls(t),s=[];Hd(i,o,e);let l=Ni(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:is(o)}}];return cs(i,t,l,s,{lane_id:e,correction:r})}function Vd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:yo};let r=as(n,t),o=r.entries;return cs(ls(t),t,Ni(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:is(o)}}],[],{lane_id:e,correction:r})}function Qd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:yo};let r=ls(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)ss(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return cs(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Kd(t,n,e,n.entries)})}function Xd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;ss(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${ml(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Zd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Jd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function gl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${ml(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Bh="\uC0AC\uC774\uD074";function Uh(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function hl(e,t,n){let r=vr(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Uh(e)}}function ep(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=_l(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:Bh}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function tp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:up,setPrototypeOf:np,isFrozen:Wh,getPrototypeOf:zh,getOwnPropertyDescriptor:Hh}=Object,{freeze:gn,seal:Sn,create:xl}=Object,{apply:Al,construct:Sl}=typeof Reflect<"u"&&Reflect;gn||(gn=function(t){return t});Sn||(Sn=function(t){return t});Al||(Al=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});Sl||(Sl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Fi=hn(Array.prototype.forEach),Kh=hn(Array.prototype.lastIndexOf),rp=hn(Array.prototype.pop),us=hn(Array.prototype.push),Gh=hn(Array.prototype.splice),Ui=hn(String.prototype.toLowerCase),bl=hn(String.prototype.toString),yl=hn(String.prototype.match),ds=hn(String.prototype.replace),Yh=hn(String.prototype.indexOf),Vh=hn(String.prototype.trim),Dn=hn(Object.prototype.hasOwnProperty),mn=hn(RegExp.prototype.test),ps=Qh(TypeError);function hn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Al(e,t,r)}}function Qh(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Sl(e,n)}}function At(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ui;np&&np(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(Wh(t)||(t[r]=i),o=i)}e[o]=!0}return e}function Xh(e){for(let t=0;t<e.length;t++)Dn(e,t)||(e[t]=null);return e}function sr(e){let t=xl(null);for(let[n,r]of up(e))Dn(e,n)&&(Array.isArray(r)?t[n]=Xh(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=sr(r):t[n]=r);return t}function fs(e,t){for(;e!==null;){let r=Hh(e,t);if(r){if(r.get)return hn(r.get);if(typeof r.value=="function")return hn(r.value)}e=zh(e)}function n(){return null}return n}var op=gn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),vl=gn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),kl=gn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Zh=gn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),wl=gn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Jh=gn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),sp=gn(["#text"]),ip=gn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),$l=gn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ap=gn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Bi=gn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),eb=Sn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),tb=Sn(/<%[\w\W]*|[\w\W]*%>/gm),nb=Sn(/\$\{[\w\W]*/gm),rb=Sn(/^data-[\-\w.\u00B7-\uFFFF]+$/),ob=Sn(/^aria-[\-\w]+$/),dp=Sn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),sb=Sn(/^(?:\w+script|data):/i),ib=Sn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),pp=Sn(/^html$/i),ab=Sn(/^[a-z][.\w]*(-[.\w]+)+$/i),lp=Object.freeze({__proto__:null,ARIA_ATTR:ob,ATTR_WHITESPACE:ib,CUSTOM_ELEMENT:ab,DATA_ATTR:rb,DOCTYPE_NAME:pp,ERB_EXPR:tb,IS_ALLOWED_URI:dp,IS_SCRIPT_OR_DATA:sb,MUSTACHE_EXPR:eb,TMPLIT_EXPR:nb}),_s={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},lb=function(){return typeof window>"u"?null:window},cb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},cp=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function fp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:lb(),t=Ae=>fp(Ae);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==_s.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:m,trustedTypes:g}=e,v=a.prototype,E=fs(v,"cloneNode"),T=fs(v,"remove"),te=fs(v,"nextSibling"),re=fs(v,"childNodes"),X=fs(v,"parentNode");if(typeof s=="function"){let Ae=n.createElement("template");Ae.content&&Ae.content.ownerDocument&&(n=Ae.content.ownerDocument)}let L,R="",{implementation:M,createNodeIterator:F,createDocumentFragment:H,getElementsByTagName:j}=n,{importNode:q}=r,V=cp();t.isSupported=typeof up=="function"&&typeof X=="function"&&M&&M.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:B,ERB_EXPR:ne,TMPLIT_EXPR:ve,DATA_ATTR:Pe,ARIA_ATTR:z,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:_e,CUSTOM_ELEMENT:Ce}=lp,{IS_ALLOWED_URI:Y}=lp,ae=null,Z=At({},[...op,...vl,...kl,...wl,...sp]),be=null,Ie=At({},[...ip,...$l,...ap,...Bi]),ke=Object.seal(xl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Re=null,at=null,lt=Object.seal(xl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Q=!0,oe=!0,se=!1,pe=!0,Ee=!1,me=!0,Oe=!1,Fe=!1,Ze=!1,ze=!1,J=!1,U=!1,qe=!0,ft=!1,ut="user-content-",He=!0,et=!1,$={},K=null,he=At({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ye=null,ct=At({},["audio","video","img","source","image","track"]),Ke=null,Et=At({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Dt="http://www.w3.org/1998/Math/MathML",st="http://www.w3.org/2000/svg",wt="http://www.w3.org/1999/xhtml",qt=wt,Lt=!1,Ut=null,ue=At({},[Dt,st,wt],bl),we=At({},["mi","mo","mn","ms","mtext"]),Ue=At({},["annotation-xml"]),rt=At({},["title","style","font","a","script"]),tt=null,_t=["application/xhtml+xml","text/html"],bt="text/html",ot=null,Ne=null,A=n.createElement("form"),N=function(S){return S instanceof RegExp||S instanceof Function},W=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ne&&Ne===S)){if((!S||typeof S!="object")&&(S={}),S=sr(S),tt=_t.indexOf(S.PARSER_MEDIA_TYPE)===-1?bt:S.PARSER_MEDIA_TYPE,ot=tt==="application/xhtml+xml"?bl:Ui,ae=Dn(S,"ALLOWED_TAGS")?At({},S.ALLOWED_TAGS,ot):Z,be=Dn(S,"ALLOWED_ATTR")?At({},S.ALLOWED_ATTR,ot):Ie,Ut=Dn(S,"ALLOWED_NAMESPACES")?At({},S.ALLOWED_NAMESPACES,bl):ue,Ke=Dn(S,"ADD_URI_SAFE_ATTR")?At(sr(Et),S.ADD_URI_SAFE_ATTR,ot):Et,Ye=Dn(S,"ADD_DATA_URI_TAGS")?At(sr(ct),S.ADD_DATA_URI_TAGS,ot):ct,K=Dn(S,"FORBID_CONTENTS")?At({},S.FORBID_CONTENTS,ot):he,Re=Dn(S,"FORBID_TAGS")?At({},S.FORBID_TAGS,ot):sr({}),at=Dn(S,"FORBID_ATTR")?At({},S.FORBID_ATTR,ot):sr({}),$=Dn(S,"USE_PROFILES")?S.USE_PROFILES:!1,Q=S.ALLOW_ARIA_ATTR!==!1,oe=S.ALLOW_DATA_ATTR!==!1,se=S.ALLOW_UNKNOWN_PROTOCOLS||!1,pe=S.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=S.SAFE_FOR_TEMPLATES||!1,me=S.SAFE_FOR_XML!==!1,Oe=S.WHOLE_DOCUMENT||!1,ze=S.RETURN_DOM||!1,J=S.RETURN_DOM_FRAGMENT||!1,U=S.RETURN_TRUSTED_TYPE||!1,Ze=S.FORCE_BODY||!1,qe=S.SANITIZE_DOM!==!1,ft=S.SANITIZE_NAMED_PROPS||!1,He=S.KEEP_CONTENT!==!1,et=S.IN_PLACE||!1,Y=S.ALLOWED_URI_REGEXP||dp,qt=S.NAMESPACE||wt,we=S.MATHML_TEXT_INTEGRATION_POINTS||we,Ue=S.HTML_INTEGRATION_POINTS||Ue,ke=S.CUSTOM_ELEMENT_HANDLING||{},S.CUSTOM_ELEMENT_HANDLING&&N(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ke.tagNameCheck=S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),S.CUSTOM_ELEMENT_HANDLING&&N(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ke.attributeNameCheck=S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),S.CUSTOM_ELEMENT_HANDLING&&typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ke.allowCustomizedBuiltInElements=S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(oe=!1),J&&(ze=!0),$&&(ae=At({},sp),be=[],$.html===!0&&(At(ae,op),At(be,ip)),$.svg===!0&&(At(ae,vl),At(be,$l),At(be,Bi)),$.svgFilters===!0&&(At(ae,kl),At(be,$l),At(be,Bi)),$.mathMl===!0&&(At(ae,wl),At(be,ap),At(be,Bi))),S.ADD_TAGS&&(typeof S.ADD_TAGS=="function"?lt.tagCheck=S.ADD_TAGS:(ae===Z&&(ae=sr(ae)),At(ae,S.ADD_TAGS,ot))),S.ADD_ATTR&&(typeof S.ADD_ATTR=="function"?lt.attributeCheck=S.ADD_ATTR:(be===Ie&&(be=sr(be)),At(be,S.ADD_ATTR,ot))),S.ADD_URI_SAFE_ATTR&&At(Ke,S.ADD_URI_SAFE_ATTR,ot),S.FORBID_CONTENTS&&(K===he&&(K=sr(K)),At(K,S.FORBID_CONTENTS,ot)),He&&(ae["#text"]=!0),Oe&&At(ae,["html","head","body"]),ae.table&&(At(ae,["tbody"]),delete Re.tbody),S.TRUSTED_TYPES_POLICY){if(typeof S.TRUSTED_TYPES_POLICY.createHTML!="function")throw ps('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof S.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ps('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=S.TRUSTED_TYPES_POLICY,R=L.createHTML("")}else L===void 0&&(L=cb(g,o)),L!==null&&typeof R=="string"&&(R=L.createHTML(""));gn&&gn(S),Ne=S}},Se=At({},[...vl,...kl,...Zh]),ye=At({},[...wl,...Jh]),mt=function(S){let fe=X(S);(!fe||!fe.tagName)&&(fe={namespaceURI:qt,tagName:"template"});let Le=Ui(S.tagName),yt=Ui(fe.tagName);return Ut[S.namespaceURI]?S.namespaceURI===st?fe.namespaceURI===wt?Le==="svg":fe.namespaceURI===Dt?Le==="svg"&&(yt==="annotation-xml"||we[yt]):!!Se[Le]:S.namespaceURI===Dt?fe.namespaceURI===wt?Le==="math":fe.namespaceURI===st?Le==="math"&&Ue[yt]:!!ye[Le]:S.namespaceURI===wt?fe.namespaceURI===st&&!Ue[yt]||fe.namespaceURI===Dt&&!we[yt]?!1:!ye[Le]&&(rt[Le]||!Se[Le]):!!(tt==="application/xhtml+xml"&&Ut[S.namespaceURI]):!1},$t=function(S){us(t.removed,{element:S});try{X(S).removeChild(S)}catch{T(S)}},vt=function(S,fe){try{us(t.removed,{attribute:fe.getAttributeNode(S),from:fe})}catch{us(t.removed,{attribute:null,from:fe})}if(fe.removeAttribute(S),S==="is")if(ze||J)try{$t(fe)}catch{}else try{fe.setAttribute(S,"")}catch{}},xt=function(S){let fe=null,Le=null;if(Ze)S="<remove></remove>"+S;else{let St=yl(S,/^[\r\n\t ]+/);Le=St&&St[0]}tt==="application/xhtml+xml"&&qt===wt&&(S='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+S+"</body></html>");let yt=L?L.createHTML(S):S;if(qt===wt)try{fe=new m().parseFromString(yt,tt)}catch{}if(!fe||!fe.documentElement){fe=M.createDocument(qt,"template",null);try{fe.documentElement.innerHTML=Lt?R:yt}catch{}}let Qe=fe.body||fe.documentElement;return S&&Le&&Qe.insertBefore(n.createTextNode(Le),Qe.childNodes[0]||null),qt===wt?j.call(fe,Oe?"html":"body")[0]:Oe?fe.documentElement:Qe},jt=function(S){return F.call(S.ownerDocument||S,S,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},zt=function(S){return S instanceof p&&(typeof S.nodeName!="string"||typeof S.textContent!="string"||typeof S.removeChild!="function"||!(S.attributes instanceof d)||typeof S.removeAttribute!="function"||typeof S.setAttribute!="function"||typeof S.namespaceURI!="string"||typeof S.insertBefore!="function"||typeof S.hasChildNodes!="function")},Ft=function(S){return typeof l=="function"&&S instanceof l};function kt(Ae,S,fe){Fi(Ae,Le=>{Le.call(t,S,fe,Ne)})}let Xt=function(S){let fe=null;if(kt(V.beforeSanitizeElements,S,null),zt(S))return $t(S),!0;let Le=ot(S.nodeName);if(kt(V.uponSanitizeElement,S,{tagName:Le,allowedTags:ae}),me&&S.hasChildNodes()&&!Ft(S.firstElementChild)&&mn(/<[/\w!]/g,S.innerHTML)&&mn(/<[/\w!]/g,S.textContent)||S.nodeType===_s.progressingInstruction||me&&S.nodeType===_s.comment&&mn(/<[/\w]/g,S.data))return $t(S),!0;if(!(lt.tagCheck instanceof Function&&lt.tagCheck(Le))&&(!ae[Le]||Re[Le])){if(!Re[Le]&&Bt(Le)&&(ke.tagNameCheck instanceof RegExp&&mn(ke.tagNameCheck,Le)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(Le)))return!1;if(He&&!K[Le]){let yt=X(S)||S.parentNode,Qe=re(S)||S.childNodes;if(Qe&&yt){let St=Qe.length;for(let x=St-1;x>=0;--x){let I=E(Qe[x],!0);I.__removalCount=(S.__removalCount||0)+1,yt.insertBefore(I,te(S))}}}return $t(S),!0}return S instanceof a&&!mt(S)||(Le==="noscript"||Le==="noembed"||Le==="noframes")&&mn(/<\/no(script|embed|frames)/i,S.innerHTML)?($t(S),!0):(Ee&&S.nodeType===_s.text&&(fe=S.textContent,Fi([B,ne,ve],yt=>{fe=ds(fe,yt," ")}),S.textContent!==fe&&(us(t.removed,{element:S.cloneNode()}),S.textContent=fe)),kt(V.afterSanitizeElements,S,null),!1)},Zt=function(S,fe,Le){if(qe&&(fe==="id"||fe==="name")&&(Le in n||Le in A))return!1;if(!(oe&&!at[fe]&&mn(Pe,fe))){if(!(Q&&mn(z,fe))){if(!(lt.attributeCheck instanceof Function&&lt.attributeCheck(fe,S))){if(!be[fe]||at[fe]){if(!(Bt(S)&&(ke.tagNameCheck instanceof RegExp&&mn(ke.tagNameCheck,S)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(S))&&(ke.attributeNameCheck instanceof RegExp&&mn(ke.attributeNameCheck,fe)||ke.attributeNameCheck instanceof Function&&ke.attributeNameCheck(fe,S))||fe==="is"&&ke.allowCustomizedBuiltInElements&&(ke.tagNameCheck instanceof RegExp&&mn(ke.tagNameCheck,Le)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(Le))))return!1}else if(!Ke[fe]){if(!mn(Y,ds(Le,_e,""))){if(!((fe==="src"||fe==="xlink:href"||fe==="href")&&S!=="script"&&Yh(Le,"data:")===0&&Ye[S])){if(!(se&&!mn(ie,ds(Le,_e,"")))){if(Le)return!1}}}}}}}return!0},Bt=function(S){return S!=="annotation-xml"&&yl(S,Ce)},Rt=function(S){kt(V.beforeSanitizeAttributes,S,null);let{attributes:fe}=S;if(!fe||zt(S))return;let Le={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:be,forceKeepAttr:void 0},yt=fe.length;for(;yt--;){let Qe=fe[yt],{name:St,namespaceURI:x,value:I}=Qe,Te=ot(St),Ge=I,De=St==="value"?Ge:Vh(Ge);if(Le.attrName=Te,Le.attrValue=De,Le.keepAttr=!0,Le.forceKeepAttr=void 0,kt(V.uponSanitizeAttribute,S,Le),De=Le.attrValue,ft&&(Te==="id"||Te==="name")&&(vt(St,S),De=ut+De),me&&mn(/((--!?|])>)|<\/(style|title|textarea)/i,De)){vt(St,S);continue}if(Te==="attributename"&&yl(De,"href")){vt(St,S);continue}if(Le.forceKeepAttr)continue;if(!Le.keepAttr){vt(St,S);continue}if(!pe&&mn(/\/>/i,De)){vt(St,S);continue}Ee&&Fi([B,ne,ve],h=>{De=ds(De,h," ")});let f=ot(S.nodeName);if(!Zt(f,Te,De)){vt(St,S);continue}if(L&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!x)switch(g.getAttributeType(f,Te)){case"TrustedHTML":{De=L.createHTML(De);break}case"TrustedScriptURL":{De=L.createScriptURL(De);break}}if(De!==Ge)try{x?S.setAttributeNS(x,St,De):S.setAttribute(St,De),zt(S)?$t(S):rp(t.removed)}catch{vt(St,S)}}kt(V.afterSanitizeAttributes,S,null)},Qt=function Ae(S){let fe=null,Le=jt(S);for(kt(V.beforeSanitizeShadowDOM,S,null);fe=Le.nextNode();)kt(V.uponSanitizeShadowNode,fe,null),Xt(fe),Rt(fe),fe.content instanceof i&&Ae(fe.content);kt(V.afterSanitizeShadowDOM,S,null)};return t.sanitize=function(Ae){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},fe=null,Le=null,yt=null,Qe=null;if(Lt=!Ae,Lt&&(Ae="<!-->"),typeof Ae!="string"&&!Ft(Ae))if(typeof Ae.toString=="function"){if(Ae=Ae.toString(),typeof Ae!="string")throw ps("dirty is not a string, aborting")}else throw ps("toString is not a function");if(!t.isSupported)return Ae;if(Fe||W(S),t.removed=[],typeof Ae=="string"&&(et=!1),et){if(Ae.nodeName){let I=ot(Ae.nodeName);if(!ae[I]||Re[I])throw ps("root node is forbidden and cannot be sanitized in-place")}}else if(Ae instanceof l)fe=xt("<!---->"),Le=fe.ownerDocument.importNode(Ae,!0),Le.nodeType===_s.element&&Le.nodeName==="BODY"||Le.nodeName==="HTML"?fe=Le:fe.appendChild(Le);else{if(!ze&&!Ee&&!Oe&&Ae.indexOf("<")===-1)return L&&U?L.createHTML(Ae):Ae;if(fe=xt(Ae),!fe)return ze?null:U?R:""}fe&&Ze&&$t(fe.firstChild);let St=jt(et?Ae:fe);for(;yt=St.nextNode();)Xt(yt),Rt(yt),yt.content instanceof i&&Qt(yt.content);if(et)return Ae;if(ze){if(J)for(Qe=H.call(fe.ownerDocument);fe.firstChild;)Qe.appendChild(fe.firstChild);else Qe=fe;return(be.shadowroot||be.shadowrootmode)&&(Qe=q.call(r,Qe,!0)),Qe}let x=Oe?fe.outerHTML:fe.innerHTML;return Oe&&ae["!doctype"]&&fe.ownerDocument&&fe.ownerDocument.doctype&&fe.ownerDocument.doctype.name&&mn(pp,fe.ownerDocument.doctype.name)&&(x="<!DOCTYPE "+fe.ownerDocument.doctype.name+`>
`+x),Ee&&Fi([B,ne,ve],I=>{x=ds(x,I," ")}),L&&U?L.createHTML(x):x},t.setConfig=function(){let Ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};W(Ae),Fe=!0},t.clearConfig=function(){Ne=null,Fe=!1},t.isValidAttribute=function(Ae,S,fe){Ne||W({});let Le=ot(Ae),yt=ot(S);return Zt(Le,yt,fe)},t.addHook=function(Ae,S){typeof S=="function"&&us(V[Ae],S)},t.removeHook=function(Ae,S){if(S!==void 0){let fe=Kh(V[Ae],S);return fe===-1?void 0:Gh(V[Ae],fe,1)[0]}return rp(V[Ae])},t.removeHooks=function(Ae){V[Ae]=[]},t.removeAllHooks=function(){V=cp()},t}var _p=fp();var ir={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Wi=e=>(...t)=>({_$litDirective$:e,values:t}),vo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ms=class extends vo{constructor(t){if(super(t),this.it=Yt,t.type!==ir.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Yt||t==null)return this._t=void 0,this.it=t;if(t===An)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ms.directiveName="unsafeHTML",ms.resultType=1;var mp=Wi(ms);function Rl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Br=Rl();function wp(e){Br=e}var ys={exec:()=>null};function It(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(bn.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var ub=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),bn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},db=/^(?:[ \t]*(?:\n|$))+/,pb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,fb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,vs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,_b=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ol=/(?:[*+-]|\d{1,9}[.)])/,$p=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,xp=It($p).replace(/bull/g,Ol).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),mb=It($p).replace(/bull/g,Ol).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Il=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,gb=/^[^\n]+/,Ll=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,hb=It(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ll).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),bb=It(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ol).getRegex(),Vi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Dl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,yb=It("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Dl).replace("tag",Vi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ap=It(Il).replace("hr",vs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Vi).getRegex(),vb=It(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ap).getRegex(),Pl={blockquote:vb,code:pb,def:hb,fences:fb,heading:_b,hr:vs,html:yb,lheading:xp,list:bb,newline:db,paragraph:Ap,table:ys,text:gb},gp=It("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",vs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Vi).getRegex(),kb={...Pl,lheading:mb,table:gp,paragraph:It(Il).replace("hr",vs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",gp).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Vi).getRegex()},wb={...Pl,html:It(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Dl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ys,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:It(Il).replace("hr",vs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",xp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},$b=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,xb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Sp=/^( {2,}|\\)\n(?!\s*$)/,Ab=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Qi=/[\p{P}\p{S}]/u,Ml=/[\s\p{P}\p{S}]/u,Ep=/[^\s\p{P}\p{S}]/u,Sb=It(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ml).getRegex(),Tp=/(?!~)[\p{P}\p{S}]/u,Eb=/(?!~)[\s\p{P}\p{S}]/u,Tb=/(?:[^\s\p{P}\p{S}]|~)/u,Cb=It(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ub?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Cp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Rb=It(Cp,"u").replace(/punct/g,Qi).getRegex(),Ob=It(Cp,"u").replace(/punct/g,Tp).getRegex(),Rp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ib=It(Rp,"gu").replace(/notPunctSpace/g,Ep).replace(/punctSpace/g,Ml).replace(/punct/g,Qi).getRegex(),Lb=It(Rp,"gu").replace(/notPunctSpace/g,Tb).replace(/punctSpace/g,Eb).replace(/punct/g,Tp).getRegex(),Db=It("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ep).replace(/punctSpace/g,Ml).replace(/punct/g,Qi).getRegex(),Pb=It(/\\(punct)/,"gu").replace(/punct/g,Qi).getRegex(),Mb=It(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),qb=It(Dl).replace("(?:-->|$)","-->").getRegex(),Nb=It("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",qb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ki=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,jb=It(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ki).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Op=It(/^!?\[(label)\]\[(ref)\]/).replace("label",Ki).replace("ref",Ll).getRegex(),Ip=It(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ll).getRegex(),Fb=It("reflink|nolink(?!\\()","g").replace("reflink",Op).replace("nolink",Ip).getRegex(),hp=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ql={_backpedal:ys,anyPunctuation:Pb,autolink:Mb,blockSkip:Cb,br:Sp,code:xb,del:ys,emStrongLDelim:Rb,emStrongRDelimAst:Ib,emStrongRDelimUnd:Db,escape:$b,link:jb,nolink:Ip,punctuation:Sb,reflink:Op,reflinkSearch:Fb,tag:Nb,text:Ab,url:ys},Bb={...ql,link:It(/^!?\[(label)\]\((.*?)\)/).replace("label",Ki).getRegex(),reflink:It(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ki).getRegex()},El={...ql,emStrongRDelimAst:Lb,emStrongLDelim:Ob,url:It(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",hp).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:It(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",hp).getRegex()},Ub={...El,br:It(Sp).replace("{2,}","*").getRegex(),text:It(El.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},zi={normal:Pl,gfm:kb,pedantic:wb},gs={normal:ql,gfm:El,breaks:Ub,pedantic:Bb},Wb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bp=e=>Wb[e];function ar(e,t){if(t){if(bn.escapeTest.test(e))return e.replace(bn.escapeReplace,bp)}else if(bn.escapeTestNoEncode.test(e))return e.replace(bn.escapeReplaceNoEncode,bp);return e}function yp(e){try{e=encodeURI(e).replace(bn.percentDecode,"%")}catch{return null}return e}function vp(e,t){let n=e.replace(bn.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(bn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(bn.slashPipe,"|");return r}function hs(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function zb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function kp(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Hb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var Gi=class{constructor(e){Nt(this,"options");Nt(this,"rules");Nt(this,"lexer");this.options=e||Br}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:hs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Hb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=hs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:hs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=hs(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=p,n.length===0)break;let m=i.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let g=m,v=g.raw+`
`+n.join(`
`),E=this.blockquote(v);i[i.length-1]=E,r=r.substring(0,r.length-g.raw.length)+E.raw,o=o.substring(0,o.length-g.text.length)+E.text;break}else if(m?.type==="list"){let g=m,v=g.raw+`
`+n.join(`
`),E=this.list(v);i[i.length-1]=E,r=r.substring(0,r.length-m.raw.length)+E.raw,o=o.substring(0,o.length-g.raw.length)+E.raw,n=v.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),m=e.split(`
`,1)[0],g=!p.trim(),v=0;if(this.options.pedantic?(v=2,d=p.trimStart()):g?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=p.slice(v),v+=t[1].length),g&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),a=!0),!a){let E=this.rules.other.nextBulletRegex(v),T=this.rules.other.hrRegex(v),te=this.rules.other.fencesBeginRegex(v),re=this.rules.other.headingBeginRegex(v),X=this.rules.other.htmlBeginRegex(v);for(;e;){let L=e.split(`
`,1)[0],R;if(m=L,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),R=m):R=m.replace(this.rules.other.tabCharGlobal,"    "),te.test(m)||re.test(m)||X.test(m)||E.test(m)||T.test(m))break;if(R.search(this.rules.other.nonSpaceChar)>=v||!m.trim())d+=`
`+R.slice(v);else{if(g||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(p)||re.test(p)||T.test(p))break;d+=`
`+m}!g&&!m.trim()&&(g=!0),u+=L+`
`,e=e.substring(L.length+1),p=R.slice(v)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=vp(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(vp(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=hs(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=zb(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),kp(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return kp(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let g=p.slice(1,-1);return{type:"em",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}let m=p.slice(2,-2);return{type:"strong",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Pn=class Tl{constructor(t){Nt(this,"tokens");Nt(this,"options");Nt(this,"state");Nt(this,"inlineQueue");Nt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Br,this.options.tokenizer=this.options.tokenizer||new Gi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:bn,block:zi.normal,inline:gs.normal};this.options.pedantic?(n.block=zi.pedantic,n.inline=gs.pedantic):this.options.gfm&&(n.block=zi.gfm,this.options.breaks?n.inline=gs.breaks:n.inline=gs.gfm),this.tokenizer.rules=n}static get rules(){return{block:zi,inline:gs}}static lex(t,n){return new Tl(n).lex(t)}static lexInline(t,n){return new Tl(n).inlineTokens(t)}lex(t){t=t.replace(bn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(bn.tabCharGlobal,"    ").replace(bn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(s=>(o=s.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let s=n.at(-1);o.raw.length===1&&s!==void 0?s.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),m;this.options.extensions.startInline.forEach(g=>{m=g.call({lexer:this},p),typeof m=="number"&&m>=0&&(d=Math.min(d,m))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Yi=class{constructor(e){Nt(this,"options");Nt(this,"parser");this.options=e||Br}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(bn.notSpaceStart)?.[0],o=e.replace(bn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ar(r)+'">'+(n?o:ar(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:ar(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ar(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=yp(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+ar(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=yp(e);if(o===null)return ar(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${ar(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ar(e.text)}},Nl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Mn=class Cl{constructor(t){Nt(this,"options");Nt(this,"renderer");Nt(this,"textRenderer");this.options=t||Br,this.options.renderer=this.options.renderer||new Yi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Nl}static parse(t,n){return new Cl(n).parse(t)}static parseInline(t,n){return new Cl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Hi,bs=(Hi=class{constructor(e){Nt(this,"options");Nt(this,"block");this.options=e||Br}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Pn.lex:Pn.lexInline}provideParser(){return this.block?Mn.parse:Mn.parseInline}},Nt(Hi,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Nt(Hi,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Hi),Kb=class{constructor(...e){Nt(this,"defaults",Rl());Nt(this,"options",this.setOptions);Nt(this,"parse",this.parseMarkdown(!0));Nt(this,"parseInline",this.parseMarkdown(!1));Nt(this,"Parser",Mn);Nt(this,"Renderer",Yi);Nt(this,"TextRenderer",Nl);Nt(this,"Lexer",Pn);Nt(this,"Tokenizer",Gi);Nt(this,"Hooks",bs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Yi(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Gi(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new bs;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];bs.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&bs.passThroughHooksRespectAsync.has(i))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Pn.lex(e,t??this.defaults)}parser(e,t){return Mn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Pn.lex:Pn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Mn.parse:Mn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?Pn.lex:Pn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Mn.parse:Mn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ar(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Fr=new Kb;function Mt(e,t){return Fr.parse(e,t)}Mt.options=Mt.setOptions=function(e){return Fr.setOptions(e),Mt.defaults=Fr.defaults,wp(Mt.defaults),Mt};Mt.getDefaults=Rl;Mt.defaults=Br;Mt.use=function(...e){return Fr.use(...e),Mt.defaults=Fr.defaults,wp(Mt.defaults),Mt};Mt.walkTokens=function(e,t){return Fr.walkTokens(e,t)};Mt.parseInline=Fr.parseInline;Mt.Parser=Mn;Mt.parser=Mn.parse;Mt.Renderer=Yi;Mt.TextRenderer=Nl;Mt.Lexer=Pn;Mt.lexer=Pn.lex;Mt.Tokenizer=Gi;Mt.Hooks=bs;Mt.parse=Mt;var x0=Mt.options,A0=Mt.setOptions,S0=Mt.use,E0=Mt.walkTokens,T0=Mt.parseInline;var C0=Mn.parse,R0=Pn.lex;function kr(e){let t=Mt.parse(e),n=_p.sanitize(t);return mp(n)}function lr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function ko(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Xi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Dp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Gb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Yb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Vb=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function qn(e){return!!e&&typeof e=="object"}function jl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Fl(e,t){let n=jl(e),r=jl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function Pp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>qn(o)&&typeof o.text=="string"?o.text:"").join(""):qn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Qb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Dp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=jl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Fl(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Fl(qn(l)?l.old_string:"",qn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Bl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Xb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Mp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>qn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Xb,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ul(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Yb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Vb.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Zb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Jb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(qn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Ul(s.text));else if(s.type==="thinking"){let l=Bl(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=Qb(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?Lp(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(qn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=Pp(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=Mp(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Lp([o],n):[o]}return[]}function Lp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function ey(e){let t=typeof e.command=="string"?e.command:"",n=Pp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:Dp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function ty(e){if(e.type==="item.completed"&&qn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ul(t.text)];if(t.type==="user_message"){let n=Mp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Bl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[ey(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function ny(e){if(e.schema!=="codex-delegation-monitor-v1"||!qn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&qn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ul(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=Bl(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=Gb[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function ry(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function oy(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return qn(t)?t:null}function qp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=oy(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return Zb(i,r);let s=i.schema==="codex-delegation-monitor-v1"?ny(i):ry(i)?ty(i):Jb(i,n);return s.length>0&&(r.progress=null),s}}}function Wl(e){let t=[],n=qp(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var sy=5,iy=10,ay=/Task\s+#(\d+)/,ly=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,cy=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ks(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function uy(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function dy(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function py(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=ay.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function fy(e){if(e.tool==="Bash"){let t=e.command||"";return ly.test(t)?"~ PR/\uAC8C\uC2DC \uC911":cy.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function _y(e){let t=e.filter(o=>o.kind==="tool").slice(-iy),n=new Map;t.forEach((o,i)=>{let s=fy(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function my(e){let t=dy(e);if(t)return{text:t,guess:!1};let n=py(e);if(n)return{text:n,guess:!1};let r=_y(e);return r?{text:r,guess:!0}:null}function gy(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:fn(e,t)}function wo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,p={},m=!0,g=new Set,v=new Set,E=null,T=null,te=!1,re=!1,X=!1,L=null,R=null;function M(){te=!1,re=!1,X=!1,L=null,R=null}async function F(J){if(n){re=!0,X=!1,Re();try{let U=await Promise.resolve(n("get-attempt-prompt",{attempt_id:J,...u?{root_dir:u}:{}}));if(i!==J)return;!U||typeof U!="object"||Array.isArray(U)?X=!0:(L=U,R=J)}catch{i===J&&(X=!0)}finally{i===J&&(re=!1,Re())}}}function H(){if(te=!te,te&&i&&R!==i){F(i);return}Re()}function j(){if(!te)return"";let J=ko({loading:re,error:X});if(J)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${J}
      </div>`;if(!L)return"";if(L.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let U=Xi(L.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${U?c`<div class="prompt-block__meta">${U} 발송</div>`:""}
      ${typeof L.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",L.task_prompt):""}
      ${typeof L.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",L.system_prompt):""}
    </div>`}function q(){if(!a||!r)return[];let J=r.get(a);return Wl(J?J.lines:[])}function V(){if(!a||!r)return null;let J=r.get(a),U=J?J.last_event_at:null;return typeof U=="number"?U:null}function B(){return p.status==="running"}function ne(){if(B()&&i){T||(T=setInterval(()=>Re(),1e3));return}ve()}function ve(){T&&(clearInterval(T),T=null)}function Pe(J){let U=[],qe=0;for(;qe<J.length;){let{idx:ft,line:ut}=J[qe];if(ut.kind==="tool"){let He=qe;for(;He<J.length&&J[He].line.kind==="tool"&&J[He].line.tool===ut.tool;)He+=1;if(He-qe>=sy&&!v.has(ft)){U.push({kind:"group",idx:ft,tool:ut.tool||"",lines:J.slice(qe,He)}),qe=He;continue}}U.push({kind:"line",idx:ft,line:ut}),qe+=1}return U}function z(J){let U=[],qe=new Map;for(let He=0;He<J.length;He+=1){let et=J[He],$=et.parent_tool_use_id;if(typeof $=="string"&&$.length>0){let K=qe.get($);K||(K={kind:"subagent",idx:He,launch_id:$,agent_type:null,header:null,lines:[]},qe.set($,K),U.push(K)),K.lines.push({idx:He,line:et});continue}if(et.kind==="tool"&&et.tool==="Agent"&&typeof et.launch_id=="string"&&et.launch_id.length>0){let K=ie(et),he=qe.get(et.launch_id);if(he){he.header={idx:He,line:et},he.agent_type=K;continue}let Ye={kind:"subagent",idx:He,launch_id:et.launch_id,agent_type:K,header:{idx:He,line:et},lines:[]};qe.set(et.launch_id,Ye),U.push(Ye);continue}U.push({kind:"entry",idx:He,line:et})}let ft=[],ut=0;for(;ut<U.length;){if(U[ut].kind!=="entry"){ft.push(U[ut]),ut+=1;continue}let He=ut;for(;He<U.length&&U[He].kind==="entry";)He+=1;ft.push(...Pe(U.slice(ut,He))),ut=He}return ft}function ie(J){let U=J.input;return U&&typeof U.subagent_type=="string"?U.subagent_type:null}function _e(J){for(let U=J.length-1;U>=0;U-=1){let qe=J[U];if(qe.kind==="result"||qe.kind==="error")return null;if(qe.kind==="tool"&&!Object.hasOwn(qe,"result"))return qe}return null}function Ce(J){for(let U=J.length-1;U>=0;U-=1)if(J[U].kind==="thinking")return J[U];return null}function Y(J,U){if(U.kind==="gate")return c`<div class="sv__gate">${U.text}</div>`;if(U.kind==="phase")return c`<div class="sv__phase">${U.text}</div>`;if(U.kind==="result")return c`<div
        class="sv__result${U.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${U.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${kr(U.text||(U.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(U.kind==="thinking"){let qe=g.has(J);return c`<div
        class="sv__think${qe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>lt(J)}
      >
        <span class="sv__think-line">💭 ${ks(U.text)}</span>
        ${qe?c`<pre class="sv__think-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="user"){let qe=g.has(J);return c`<div
        class="sv__line sv__line--user${qe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>lt(J)}
      >
        <span class="sv__user-line">▷ ${ks(U.text)}</span>
        ${qe?c`<pre class="sv__user-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="error")return c`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="blocker")return c`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="tool"){let qe=g.has(J),ft=U.tool==="Bash"?uy(U.command):0,ut=U.tool==="Bash"?ft>1?ks(U.command):U.command:U.path||U.command||"";return c`<div
        class="sv__tool${qe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>lt(J)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${U.icon}</span>
          <span class="sv__tool-name">${U.tool}</span>
          ${ut?c`<span class="sv__tool-detail">${ut}</span>`:""}
          ${ft>1?c`<span class="sv__tool-more">⋯ ${ft}줄</span>`:""}
          ${typeof U.added=="number"?c`<span class="sv__diff-add">+${U.added}</span>`:""}
          ${typeof U.removed=="number"?c`<span class="sv__diff-del">−${U.removed}</span>`:""}
          ${U.result?c`<span class="sv__tool-ok">→ ${U.result}</span>`:""}
        </span>
        ${qe?c`<pre class="sv__tool-expand">${ae(U)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${kr(U.text||"")}</div>`}function ae(J){let U=[];if(J.tool==="Bash"&&typeof J.command=="string"&&J.command.length>0)U.push(J.command);else if(J.input!==void 0)try{U.push(`input: ${JSON.stringify(J.input,null,2)}`)}catch{}return typeof J.output=="string"&&J.output.length>0&&U.push(`output:
${J.output}`),U.join(`

`)}function Z(){if(!i)return c``;let J=q(),U=(s?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),qe=p.session_id||"",ft=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${m?"ON":"OFF"}`,ut=B(),He=ut?gy(V(),Date.now()):"",et=ut?_e(J):null,$=ut?Ce(J):null,K=my(J);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(s?p.role||"":i)}</span
        >
        ${K?c`<span
              class="sv__stage${K.guess?" sv__stage--guess":""}"
              title=${K.text}
              >${K.text}</span
            >`:""}
        ${ut?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${He?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${He}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${He?c`<span class="sv__live-ago">${He}</span>`:""}</span
            >`:""}
        ${qe?c`<button
              type="button"
              class="sv__session"
              title=${qe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${qe}`}
              @click=${()=>oe(qe)}
            >
              ⧉ ${qe.slice(0,8)}
            </button>`:""}
        ${p.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>oe(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${U?c`<span class="sv__meta">${U}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${te?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${te?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${H}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${m?" sv__follow--on":""}"
          aria-pressed=${m?"true":"false"}
          aria-label=${ft}
          @click=${Q}
        >
          <span class="sv__follow-full">⇣ ${ft}</span>
          <span class="sv__follow-short">⇣ ${m?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ze()}
        >
          ✕
        </button>
      </div>
      ${s||d?"":j()}
      <div class="sv__body">
        ${J.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:z(J).map(he=>he.kind==="subagent"?Ie(he):he.kind==="group"?be(he):Y(he.idx,he.line))}
      </div>
      ${et||$?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${et?c`<span class="sv__now-icon">${et.icon}</span>
                  <span class="sv__now-name">${et.tool}</span>
                  <span class="sv__now-detail"
                    >${et.tool==="Bash"?ks(et.command):et.path||et.command||""}</span
                  >`:""}
            ${$?c`<span class="sv__now-think"
                  >💭 ${ks($.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function be(J){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ke(J.idx)}
    >
      <span class="sv__group-icon">${J.lines[0].line.icon}</span>
      <span class="sv__group-name">${J.tool}</span>
      <span class="sv__group-count">${J.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ie(J){let U=v.has(J.idx),qe=J.header?J.header.line:null,ft=qe?qe.is_error===!0?"\u2717":typeof qe.result=="string"?"\u2713":"\u27F3":"",ut=qe&&qe.command?qe.command:"";return c`<div class="sv__sub${U?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ke(J.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${J.agent_type||"subagent"}</span>
        ${ut?c`<span class="sv__sub-detail">${ut}</span>`:""}
        <span class="sv__sub-count">${J.lines.length}줄</span>
        ${ft?c`<span class="sv__sub-state">${ft}</span>`:""}
        ${U?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${U?c`<div class="sv__sub-body">
            ${Pe(J.lines).map(He=>He.kind==="group"?be(He):Y(He.idx,He.line))}
          </div>`:""}
    </div>`}function ke(J){v.add(J),Re()}function Re(){pt(Z(),e),ne(),m&&at()}function at(){let J=e.querySelector(".sv__body");J&&(J.scrollTop=J.scrollHeight)}function lt(J){g.has(J)?g.delete(J):g.add(J),Re()}function Q(){m=!m,Re()}function oe(J){_n(J).then(U=>{U?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function se(J){!i||!J||(p={...p,...J},Re())}function pe(J){let U=J.target;if(!U||!U.classList||!U.classList.contains("sv__body"))return;!(U.scrollHeight-U.scrollTop-U.clientHeight<=4)&&m&&(m=!1,Re())}e.addEventListener("scroll",pe,!0);function Ee(J){let U=J.target;!U||typeof U.closest!="function"||e.contains(U)||U.closest("dialog")||U.closest(".md-viewer-root")||ze()}let me=!1;function Oe(){me||(document.addEventListener("mousedown",Ee),me=!0)}function Fe(){me&&(document.removeEventListener("mousedown",Ee),me=!1)}function Ze(J){let U=J&&J.attempt_id;if(!U)return;let qe=typeof J.launch_id=="string"&&J.launch_id.length>0?J.launch_id:null,ft=J.session_ref&&typeof J.session_ref=="object"?J.session_ref:null;if(qe&&ft)return;let ut=a;i=U,s=qe,l=ft,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&ut&&ut!==a&&Promise.resolve(n("unsubscribe-session-log",{id:ut})).catch(()=>{}),u=typeof J.root_dir=="string"&&J.root_dir.length>0?J.root_dir:null,p=J.meta||{},d=J.hide_prompt===!0,m=!0,g.clear(),v.clear(),M(),!E&&r&&(E=r.subscribe(Re)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Oe(),Re()}function ze(){let J=a;Fe(),i=null,s=null,l=null,a=null,u=null,d=!1,g.clear(),v.clear(),M(),ve(),n&&J&&Promise.resolve(n("unsubscribe-session-log",{id:J})).catch(()=>{}),pt(c``,e),o&&o()}return{open:Ze,updateMeta:se,close:ze,isOpen(){return i!==null},destroy(){ve(),Fe(),E&&(E(),E=null),e.removeEventListener("scroll",pe,!0),i=null,s=null,l=null,a=null,u=null,d=!1,pt(c``,e)}}}function hy(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function Np(e,t){let n=hy(e);return c`
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
  `}var by="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",yy=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,vy=/^\*\*결론\*\* — (.+)$/;function Zi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==by)return null;let n=yy.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?vy.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var jp=20;function Fp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function ky(e){return e.length>jp?`${e.slice(0,jp)}\u2026`:e}function wy(e,t,n,r){let o=`${t.lane} ${ky(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Fp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${kr(t.body)}
        </div>`:""}
  </div>`}function $y(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Fp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${kr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Bp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Zi(typeof a.text=="string"?a.text:"");return u?wy(a,u,t,o.has(a.id)):$y(a)})}
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
  `}var{I:cA}=yc;var Up=e=>e.strings===void 0;var xy={},Wp=(e,t=xy)=>e._$AH=t;var wr=Wi(class extends vo{constructor(e){if(super(e),e.type!==ir.PROPERTY&&e.type!==ir.ATTRIBUTE&&e.type!==ir.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Up(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===An||t===Yt)return t;let n=e.element,r=e.name;if(e.type===ir.PROPERTY){if(t===n[r])return An}else if(e.type===ir.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return An}else if(e.type===ir.ATTRIBUTE&&n.getAttribute(r)===t+"")return An;return Wp(e),t}});var Ay=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],zl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},zp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Sy={pin:"pin",global:"global",base:"base"};function Ey(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Sy[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Ty(e,t,n){switch(e){case"workflow_mode":return Bo;case"spec_review_model":case"impl_review_model":return Uo;case"plan_review_model":return ai;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return li;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Hn;case"impl_dispatch":return Fo;case"impl_runtime":return ii;case"impl_model":return po(n,t.impl_runtime);case"impl_effort":return Dr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Hn;case"orchestration_model":return fo(n,null);case"orchestration_effort":return Dr(n,void 0,t.orchestration_model||kn).filter(r=>r!==kn);default:return[]}}function Cy(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Ey(e.source)}
    <span class="detail-effective__k"
      >${gr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ui[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${gr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Hp(e,t){let n=Ka.flatMap(a=>a.keys),r=Ga(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Bu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${Ry(i)}</span
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
          ${Ka.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=ti({key:u.key,choices:Ty(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Cy(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${wr(e.preset_id)}
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
  </details>`}function Ry(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Oy(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Kp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Oy(r.exec_receipt),u=a?er(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=Zs(r.planned_execution,r.exec_receipt),m=r.chips?.pr?.number,g=typeof m=="number"?`PR #${m}`:"PR",v=zo(n),E=v!==null&&t.isChipOpen?.("rec")===!0,T=E?ol({rec:v},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
      ${p?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
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
            aria-expanded=${E?"true":"false"}
            title=${fi(v)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${T?lo(T):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Iy(i).map(te=>Ly(te,n,o,{label:te.id==="pr"?g:te.label,href:te.id==="pr"?s:""}))}
    </div>
  </section>`}function Iy(e){let n=typeof e=="string"&&Object.hasOwn(zl,e)&&zl[e]||zl.spec_backed;return Ay.filter(r=>n.includes(r.id))}var Ji={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Ly(e,t,n,r){let o=Dy(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?Ji.stale:l?Ji.on:a?Ji.current:Ji.none,m=Py(e,n),g=`${r.label} \xB7 ${p}${m?` \xB7 ${m}`:""}${o?` \xB7 ${o}`:""}`,v=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,E=c`<span class="detail-summary__gate-label"
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
      >${E}</a
    >`:c`<span
    class=${v}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${g}
    >${E}</span
  >`}function Dy(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Py(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(zp,n)?zp[n]:""}function ea(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Gp(e){return ea(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Yp(e,t){let n=e&&e[t];if(!ea(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Gp),o=Gp(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function Xp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function ta(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Xp(e)}${t}`}function $o(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Xp(e)}`}function My(e,t,n){if(n!==null){let o=e==="claude"?ta:$o,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:$o({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Vp(e,t){if(!ea(e)||e.state!=="usable"||!ea(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Qp(e){let t=e.provider_key==="claude"?ta:$o,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${My(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Zp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Qp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Yp(t,"claude"),selected:o,workspace_default:Vp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Qp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Yp(t,"codex"),selected:i,workspace_default:Vp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function qy(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ny(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function na(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(E){E.key==="Escape"&&o&&(E.preventDefault(),g())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>g()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${qy(o)}</span
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
                        >`}${kr(s)}`}
          </div>
        </div>
      </div>
    `:c``}function p(){pt(d(),e)}async function m(E,T={}){o=E,i="loading",s="",l=null,a="",p();let te=T.workspace||(n?n():"");if(!te){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let re="/api/doc?workspace="+encodeURIComponent(te)+"&path="+encodeURIComponent(E);try{let X=await r(re),L=await X.json().catch(()=>({}));if(!X.ok||!L||L.ok!==!0){if(L?.error==="not_found"&&T.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(L&&L.error||X.status)+")",p();return}let R=Ny(String(L.content||""));l=R.front,s=R.body,i="ready",p()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function g(){o=null,pt(c``,e)}function v(){document.removeEventListener("keydown",u),g()}return{open:m,close:g,destroy:v}}var jy=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],tf="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ra=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Fy=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Jp(e){return typeof e=="string"&&Fy.has(e)}var By=["running","done","failed","interrupted"],Uy={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Wy(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function zy(e){let t=an(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=io(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${tf}
          >부분 집계</span
        >`:""}`}function ef(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Gl(e){if(typeof e=="number")return ws(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ws(t):""}function Hy(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function nf(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Hl(e){return e===null||typeof e=="string"&&e.trim().length>0}function Kl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Ky(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ra.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Hl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Hl(t.effort))||!(!("agent_type"in t)||Hl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!By.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Kl(t.started_at)||!Kl(t.last_event_at)||!Kl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Gy(e,t,n,r){let i=an({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=nf({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Gl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Gl(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </div>`}function Yy(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?an({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?ws(e.last_event_at):i?Gl(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,Hy(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=nf(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Uy[e.status]}</span
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
  </button>`}function Vy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Qy(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of i){let m=Ky(p);!m||o.has(m.launch_id)||Jp(m.agent_type)||(o.add(m.launch_id),r.push(m))}r.sort((p,m)=>(p.started_at||0)-(m.started_at||0));let s={};for(let{role:p,provider:m}of ra){let g=t?t.roles[p]?.[m]:null;s[p]=g?[...g.legs]:[]}let l=ra.flatMap(({role:p})=>s[p]),a=new Set,u=new Set,d=[];for(let{role:p,provider:m}of ra){for(let g of r.filter(v=>v.role===p&&v.provider===m)){let v=l.find(T=>T.receipt_id===g.launch_id)||null;if(v&&!Vy(g,v))continue;v&&a.add(v.receipt_id);let E=m==="codex"&&u.has(g.session_id);d.push(Yy(g,v,e.attempt_id,n,E)),m==="codex"&&u.add(g.session_id)}for(let g of s[p])if(!a.has(g.receipt_id)&&!Jp(g.agent_type)){let v=typeof g.session_id=="string"&&g.session_id.length>0?g.session_id:null,E=m==="codex"&&v!==null&&u.has(v);d.push(Gy(p,m,g,E)),m==="codex"&&v!==null&&u.add(v)}}return d}function Xy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...jy,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Wy(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${tf}</span>`:""}
  </div>`}var Zy={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ws(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Jy(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var ev={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function tv(e,t){let n=ev[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Na(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Mo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${ws(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function rf(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(g=>g&&g.current===!0),...i.filter(g=>g&&g.current!==!0).sort((g,v)=>v.index-g.index)],l=s.map(g=>tv(g,t)),a=n.expanded||new Set;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let g of o)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&u.add(g.resumed_from);let d=g=>{if(!(g.status==="failed"||g.status==="orphaned"))return"";let E=typeof g.session_id=="string"&&g.session_id.length>0,T=u.has(g.attempt_id),te=E&&!T,re=E?T?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${g.attempt_id}
      ?disabled=${!te}
      title=${re}
      @click=${X=>{X.stopPropagation(),te&&t.onResume&&t.onResume(g.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=g=>{if(!(g.status==="failed"||g.status==="orphaned")||typeof g.cause!="string"||g.cause==="")return"";let E=g.cause_detail,T=E&&typeof E.reason=="string"&&E.reason.length>0?typeof E.command=="string"&&E.command.length>0?`${E.reason} \xB7 ${E.command}`:E.reason:g.cause;return c`<div class="detail-session__cause" title=${T}>
      ${g.cause}
    </div>`},m=g=>{let v=ef(Ua(g));if(an(v).length===0&&!io(g.usage))return"";let E=a.has(g.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${g.attempt_id}
      aria-expanded=${E?"true":"false"}
      title=${E?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${T=>{T.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(g.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${zy(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(g=>{let v=Ua(g),E=ef(v),T=an(E);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${g.status||"unknown"}"
            data-attempt-id=${g.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(g.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Zy[g.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${g.attempt_id}</span>
            ${Po(g)?c`<span
                  class="detail-session__resumed"
                  title=${Po(g)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${$n(g)}</span>
            ${T.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${g.session_id?c`<span class="detail-session__sid" title=${g.session_id}
                  >${String(g.session_id).slice(0,8)}</span
                >`:""}
            ${T.length>0?T.map(te=>c`<span
                      class="detail-session__usage"
                      title=${te.tooltip}
                      >${te.label}</span
                    >`):io(g.usage)?c`<span class="detail-session__usage"
                    >${io(g.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ws(g.started_at)}</span>
          </button>
          ${m(g)} ${d(g)} ${p(g)} ${Jy(g)}
          ${a.has(g.attempt_id)&&g.usage?Xy(g.usage,g.runner==="codex"?"codex":"claude"):""}
          ${Qy(g,v,t)}
        </div>`})}
    </div>
  `}function of(e,t={}){return c`
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
          ${nv(e)}
        </div>`:""}
  `}function nv(e){let t=ko(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?lr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Xi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Ur=10;function sf(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function af(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Ur,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${sf(l.at)?c`<span class="detail-timeline__at"
                  >${sf(l.at)}</span
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
  `}var rv=["open","in_progress","deferred","resolved","closed"],ov=[0,1,2,3,4];function lf(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},m="",g=!1,v=[],E=!1,T=!1,te={},re={claude:null,codex:null},X=null,L=null,R=0,M=!1,F=!1,H="",j="",q="",V="",B=!1;function ne(){M=!1,F=!1,H="",j="",q="",V="",B=!1}function ve(){re={claude:null,codex:null},X=null,L=null,R+=1}async function Pe(){if(!o)return null;try{let k=await Promise.resolve(o("get-workspace-accounts",{}));return k&&typeof k.state=="string"?k:null}catch{return null}}async function z(k){try{let P=await fetch(k);if(!P.ok)return null;let G=await P.json();if(!G||typeof G!="object"||!Array.isArray(G.accounts))return null;let xe=G.accounts.filter(We=>We!==null&&typeof We=="object"&&!Array.isArray(We));return{accounts:xe,active:xe.find(We=>We.active===!0)||null}}catch{return null}}async function ie(k){L=k;let P=++R,[G,xe,We]=await Promise.all([z("/api/claude-usage"),z("/api/codex-usage"),Pe()]);P!==R||k!==u||(re={claude:G,codex:xe},X=We,nt())}let _e=[],Ce=null,Y=null,ae=!1,Z="",be=!1,Ie=0,ke=new Set;function Re(){_e=[],Ce=null,Y=null,ae=!1,Z="",be=!1,Ie+=1,ke.clear()}async function at(k){if(!o)return;let P=++Ie;try{let G=await Promise.resolve(o("get-comments",{id:k}));if(P!==Ie||k!==u)return;_e=Array.isArray(G)?G:[],ae=!1}catch{if(P!==Ie||k!==u)return;ae=!0}nt()}function lt(){if(!o||!u)return;let k=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Ce!==u){Ce=u,Y=k,at(u);return}k!==null&&k!==Y&&(Y=k,at(u))}function Q(k){ke.has(k)?ke.delete(k):ke.add(k),nt()}function oe(k){let P=Z.trim().length===0;Z=k,P!==(k.trim().length===0)&&nt()}async function se(){let k=Z.trim();if(!o||!u||k.length===0||be)return;let P=u;be=!0,nt();let G=!1;try{let xe=await Promise.resolve(o("add-comment",{id:P,text:k}));Array.isArray(xe)&&xe.length>0&&(G=!0,P===u&&(_e=xe,ae=!1,Z="",Y=xe.length))}catch{G=!1}G||ge("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),P===u&&(be=!1),nt()}let pe={onToggle:Q,onDraftInput:oe,onSubmit:se},Ee=t.mdViewer||null,me=null;Ee||(me=document.createElement("div"),me.className="md-viewer-root",document.body.appendChild(me));let Oe=Ee||na(me,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Fe=document.createElement("div");Fe.className="session-log-root",document.body.appendChild(Fe);let Ze=wo(Fe,{transport:o?(k,P)=>Promise.resolve(o(k,P)):void 0,sessionLogStore:a}),ze=!1,J=!1,U=!1,qe=null,ft=null,ut=0;function He(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function et(){ze=!1,J=!1,U=!1,qe=null,ft=null,ut+=1}async function $(k){if(!o)return;let P=++ut;J=!0,U=!1,nt();try{let G=await Promise.resolve(o("get-bead-prompt",{bead_id:k}));if(P!==ut)return;!G||typeof G!="object"||Array.isArray(G)?U=!0:(qe=G,ft=He(k))}catch{P===ut&&(U=!0)}finally{P===ut&&(J=!1,nt())}}let K=[],he=null,Ye=0;function ct(k,P){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}::${P}`}function Ke(){K=[],he=null,Ye+=1}async function Et(k,P){if(!o)return;let G=++Ye,xe;try{xe=await Promise.resolve(o("get-session-refs",{bead_id:k}))}catch{xe=null}G!==Ye||P!==he||(K=xe&&Array.isArray(xe.sessions)?xe.sessions:[],nt())}function Dt(){if(!o||!u)return;let k=d&&d.metadata,P=k&&typeof k=="object"&&typeof k.session_ref=="string"?k.session_ref:null;if(P===null){Ke();return}let G=ct(u,P);he!==G&&(K=[],he=G,Et(u,G))}let st=[],wt=[],qt=Ur,Lt=null,Ut=0;function ue(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function we(){st=[],wt=[],qt=Ur,Lt=null,Ut+=1}async function Ue(k,P){if(!o)return;let G=++Ut,xe;try{xe=await Promise.resolve(o("get-bead-timeline",{bead_id:k}))}catch{xe=null}G!==Ut||P!==Lt||(st=xe&&Array.isArray(xe.events)?xe.events:[],wt=xe&&Array.isArray(xe.attempts)?xe.attempts:[],qt=Ur,nt())}function rt(){if(!o||!u)return;let k=ue(u);Lt!==k&&(st=[],wt=[],qt=Ur,Lt=k,Ue(u,k))}function tt(){qt+=Ur,nt()}function _t(){if(ze=!ze,ze&&u&&ft!==He(u)){qe=null,$(u);return}nt()}function bt(){let k={};for(let G of wt)G&&typeof G=="object"&&G.bead_id===u&&(k[String(G.attempt_id)]=G);let P=s?s.get():null;for(let G of P&&P.attempts?Object.values(P.attempts):[]){let xe=G;xe&&xe.bead_id===u&&(k[String(xe.attempt_id)]=xe)}return k}function ot(){return u?Object.values(bt()).sort((P,G)=>(G.started_at||0)-(P.started_at||0)).map(P=>({attempt_id:P.attempt_id,bead_id:P.bead_id,status:P.status,started_at:typeof P.started_at=="number"?P.started_at:null,runner:P.runner||null,model:P.model||null,effort:P.effort||P.observed_effort||null,speed:P.speed||null,session_id:P.session_id||null,resumed_from:P.resumed_from||null,continuation_mode:P.continuation_mode||null,dismissed_at:typeof P.dismissed_at=="number"?P.dismissed_at:null,cause:typeof P.cause=="string"?P.cause:null,cause_detail:P.cause_detail||null,exec_default_preset_id:typeof P.exec_default_preset_id=="string"?P.exec_default_preset_id:null,exec_default_preset_revision:typeof P.exec_default_preset_revision=="number"?P.exec_default_preset_revision:null,exec_values:P.exec_values&&typeof P.exec_values=="object"?P.exec_values:null,usage:P.usage||null,usage_legs:Array.isArray(P.usage_legs)?P.usage_legs:[],delegation_sessions:Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]})):[]}function Ne(){return u?nr(bt(),u):null}let A=new Set;function N(k){A.has(k)?A.delete(k):A.add(k),nt()}function W(k){let P=s?s.get():null,G=P&&P.attempts?P.attempts[k]:null;Ze.open({attempt_id:k,meta:G?{runner:G.runner||void 0,model:G.model||void 0,effort:G.effort||void 0,status:G.status||void 0,session_id:G.session_id||void 0}:{}})}function Se(k,P){let G=s?s.get():null,xe=G&&G.attempts?G.attempts[k]:null,ce=(xe&&Array.isArray(xe.delegation_sessions)?xe.delegation_sessions:[]).find(Je=>Je&&typeof Je=="object"&&Je.launch_id===P);ce&&Ze.open({attempt_id:k,launch_id:P,meta:{runner:ce.provider==="claude"?"claude":"codex",role:ce.role,...typeof ce.agent_type=="string"?{agent_type:ce.agent_type}:{},model:ce.model,effort:ce.effort,session_id:ce.session_id,status:ce.status}})}async function ye(k){if(!o||!k)return;let P=o,G=()=>{let We=s?s.get():null;return We&&typeof We.revision=="number"?We.revision:0},xe=s?.get()?.attempts?.[k]||null;await ro({context:{bead_id:xe?.bead_id||u||"",kind:"session",tuple:xe?$n(xe):""},transport:We=>P("worker-attempt-resume",{attempt_id:k,expected_revision:G(),...We}),adopt:We=>{We?.queue&&s?.set&&s.set(We.queue)}})}async function mt(k,P){if(!o||!k)return;let G=o,xe=()=>{let Me=s?s.get():null;return{bead_id:k,...P==="parallel"?{}:{lane:P},expected_revision:Me&&typeof Me.revision=="number"?Me.revision:0}},We=Me=>{Me?.queue&&s?.set&&s.set(Me.queue)},ce=await Promise.resolve(G("worker-queue-place",xe()));if(We(ce),ce&&ce.conflict&&(ce=await Promise.resolve(G("worker-queue-place",xe())),We(ce)),nt(),!ce)return;if(ce.applied===!1&&typeof ce.admission_reason=="string"){ge(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${ce.admission_reason}`,"error",2400);return}if(ce.reason==="rejected"){ge("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(ce.applied===!1)return;let Je=ce.queue?Yo({id:k},ce.queue).location:null;Je&&"index"in Je&&ge(`${id(Je.lane)} \uB300\uAE30 #${Je.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function $t(k,P){if(P){T=!0,nt();return}mt(k,"parallel")}function vt(k,P){let We=(k.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;We&&(We!=="parallel"&&!/^s[1-5]$/.test(We)||(T=!1,nt(),mt(P,We)))}function xt(k){!k||!u||Ze.open(oo(k,u,d&&d.status))}let jt={onOpen:W,onOpenDelegation:Se,onResume:ye,onToggleUsage:N,onOpenSessionRef:xt,onCopyResumeCommand:Te};function zt(){let k=s?s.get():null,P={...te};for(let G of[...On,...co]){let xe=k&&k[G];typeof xe=="string"&&(P[G]=xe)}return P}async function Ft(){if(o){try{let k=await Promise.resolve(o("get-session-defaults",{}));te=k&&k.values&&typeof k.values=="object"?k.values:{}}catch{te={}}nt()}}function kt(){let k=s?s.get():null;return k&&k.runner_catalog||null}function Xt(){let k=s?s.get():null;return k&&typeof k.execution_defaults=="object"?k.execution_defaults:null}function Zt(){let k=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},G=xn({pin:{...k,...p},global:zt(),execution_defaults:Xt(),runner_catalog:kt(),route:typeof k.route=="string"?k.route:null}).orchestration_model.value||"";return In(kt(),G)}function Bt(){let k=l?l.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function Rt(k){return k?.compatible===!1}function Qt(k){l&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&l.set({revision:k.revision,presets:k.presets})}async function Ae(){let k=Bt(),P=k?.presets.find(G=>G.id===m);if(!(!o||!u||!k||!P||Rt(P)||g)){g=!0,v=[],nt();try{let G=await Promise.resolve(o("apply-impl-preset",Wu(u,P.id,k.revision)));if(G&&G.conflict){Qt(G),ge("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let xe=G&&Array.isArray(G.issue)?G.issue[0]:G?.issue;if(G&&G.applied&&xe&&typeof xe=="object"){d=xe,v=Array.isArray(G.skipped_orchestration_keys)?G.skipped_orchestration_keys.filter(We=>typeof We=="string"):[];for(let We of zu)delete p[We];ge(v.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}G&&G.error==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(G){G&&typeof G=="object"&&G.code==="bd_readback_failed"?ge("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ge("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{g=!1,nt()}}}let S=null;n&&n.subscribe&&(S=n.subscribe(()=>I()));let fe=null;s&&typeof s.subscribe=="function"&&(fe=s.subscribe(()=>{u&&nt()}));let Le=null,yt=null;function Qe(){yt&&(yt(),yt=null)}l&&typeof l.subscribe=="function"&&(Le=l.subscribe(()=>{u&&nt()}));function St(k){k.key==="Escape"&&u&&(k.preventDefault(),r())}document.addEventListener("keydown",St);let x=ao(()=>nt());x.attach();function I(){if(u){if(n&&typeof n.snapshotFor=="function"){let k=n.snapshotFor("detail:"+u)||[];d=k.find(G=>G&&G.id===u)||k[0]||d}lt(),Dt(),rt(),nt()}}function Te(k){_n(k).then(P=>{P?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ge(k){k.preventDefault(),k.stopPropagation(),u&&Te(u)}function De(k,P){k.preventDefault(),k.stopPropagation(),Te(P)}function f(k,P,G){k.preventDefault(),k.stopPropagation(),Oe.open(P,{missing_state:G})}async function h(k,P){let G=Object.hasOwn(p,k),xe=p[k];if(p[k]=P,nt(),!(!o||!u))try{let We=await Promise.resolve(o("update-exec-settings",Uu(u,k,P.length===0?null:P))),ce=Array.isArray(We)?We[0]:We;if(!ce||typeof ce!="object"||!ce.id)throw new Error("exec settings readback failed");d=ce,delete p[k],nt()}catch(We){throw G?p[k]=xe:delete p[k],nt(),ge("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),We}}function O(k){k.catch(()=>{})}async function D(k,P){let G=d||{},xe=G.metadata&&typeof G.metadata=="object"?G.metadata:{},We={};for(let Me of["impl_runtime","impl_model","impl_effort"])We[Me]=Object.hasOwn(p,Me)?p[Me]:typeof xe[Me]=="string"?xe[Me]:"";We[k]=P;let ce=Gu(We,kt(),Zt()),Je={};for(let Me of["impl_runtime","impl_model","impl_effort"])Je[Me]=p[Me],p[Me]=ce[Me]||"";if(nt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...ce,orchestration_runtime:Zt()})).then(Me=>{let Pt=Array.isArray(Me)?Me[0]:Me;if(!Pt||typeof Pt!="object"||!Pt.id)throw new Error("implementation target readback failed");d=Pt;for(let Bn of["impl_runtime","impl_model","impl_effort"])delete p[Bn];nt()}).catch(Me=>{for(let Pt of["impl_runtime","impl_model","impl_effort"])Je[Pt]===void 0?delete p[Pt]:p[Pt]=Je[Pt];throw nt(),ge("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Me})}async function _(k,P,G){if(!o||!u)return!1;try{let xe=await Promise.resolve(o(k,P)),We=Array.isArray(xe)?xe[0]:xe;return We&&typeof We=="object"&&We.id?(d=We,!0):(ge(G,"error"),!1)}catch(xe){return xe&&typeof xe=="object"&&xe.code==="bd_readback_failed"?(ge("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ge(G,"error"),!1)}}function b(k){setTimeout(()=>{try{let P=e.querySelector(k);P&&typeof P.focus=="function"&&P.focus()}catch{}},0)}function ee(){M=!0,H=d&&d.title||"",nt(),b('.detail-edit__input[data-edit="title"]')}function de(k){H=k.target.value}function Be(){M=!1,H="",nt()}function gt(){_("edit-text",{id:u,field:"title",value:H},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(M=!1,H=""),nt()})}function Tt(){F=!0,j=d&&d.description||"",nt(),b('.detail-edit__textarea[data-edit="description"]')}function Ht(k){j=k.target.value}function Gn(){F=!1,j="",nt()}function Kt(){_("edit-text",{id:u,field:"description",value:j},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(P=>{P===!0&&(F=!1,j=""),nt()})}function cn(k,P,G,xe){if(k.key==="Escape"){k.stopPropagation(),G();return}k.key==="Enter"&&(!xe||k.ctrlKey||k.metaKey)&&(k.preventDefault(),P())}function Hr(k){let P=k.target.value;_("update-status",{id:u,status:P},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>nt())}function ya(k){let P=Number(k.target.value);_("update-priority",{id:u,priority:P},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>nt())}function Es(k){q=k.target.value}function So(){let k=q.trim();k.length!==0&&_("label-add",{id:u,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(P=>{P===!0&&(q=""),nt()})}function w(k){if(k.key==="Escape"){k.stopPropagation(),q="",nt();return}k.key==="Enter"&&(k.preventDefault(),So())}function y(k){_("label-remove",{id:u,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>nt())}let C={onCopyPath:De,onOpenDoc:f};function le(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function $e(k){return k&&typeof k=="object"?String(k.dependency_type||k.type||""):""}function je(k){switch(k){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return k.length>0?{glyph:`${k} `,relation:k}:{glyph:"",relation:""}}}function Xe(k,P){let G=Ot(P),xe=[];return k.length>0&&xe.push(k),G&&xe.push(G),xe.length>0?xe.join(`
`):void 0}function Ot(k){if(!k||typeof k!="object")return;let P=typeof k.status=="string"?k.status:"",G=typeof k.title=="string"?k.title:"";return P.length>0&&G.length>0?`${P} \xB7 ${G}`:void 0}function Jt(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function dt(){return t.depCandidates?t.depCandidates():null}async function un(k,P,G){let xe=Jt(),We=u;if(!We)return;if(xe.length===0){ge("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let ce=await _(k,{a:We,b:P,view_id:We,root_dir:xe},G),Je=ce===!0||ce!==!1&&ce.saved===!0;Je&&t.onDepChanged&&t.onDepChanged({type:k,a:We,b:P}),k==="dep-add"&&Je&&(V="",B=!1),nt()}function yn(k){if(!u)return;let P=globalThis.confirm;typeof P=="function"&&!P(`${k}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||un("dep-remove",k,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function cr(k){k.disabled||un("dep-add",k.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function jn(k){V=k.target.value,B=!0,nt()}function Yn(){B||(B=!0,nt())}function Vn(k,P){if(k.key==="Escape"){k.stopPropagation(),V="",B=!1,nt();return}k.key==="Enter"&&(k.preventDefault(),P.length===1&&!P[0].disabled&&cr(P[0]))}function Qn(k){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${V}
        @focus=${Yn}
        @input=${jn}
        @keydown=${P=>Vn(P,k)}
      />
      ${B||V.length>0?c`<div class="detail-dep-add__list">
            ${k.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:k.map(P=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${P.bead_id}
                      ?disabled=${P.disabled}
                      title=${dn(P.reason)}
                      @click=${()=>cr(P)}
                    >
                      <span class="detail-dep-add__repo"
                        >${P.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${P.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${P.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function on(k,P){let G=P.get(k.id),xe=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${dn(k.title)}
          @click=${()=>G===void 0?i(k.id):i(k.id,G)}
        >
          ${k.label}
        </button>`:c`<span class="detail-dep__link" title=${dn(k.title)}
          >${k.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${k.kind}${i?" detail-dep--link":""}`}
      >${xe}${k.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${k.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+k.id}
            @click=${()=>yn(k.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Xn(k){let P=Array.isArray(k.dependencies)?k.dependencies:[],G=Array.isArray(k.dependents)?k.dependents:[],xe=[];for(let Me of P){let Pt=le(Me);Pt.length>0&&$e(Me)==="blocks"&&xe.push({id:Pt,label:`\u26D3 ${Pt}`,kind:"pred",title:Xe("\uB9C9\uB294",Me)})}for(let Me of G){let Pt=le(Me);Pt.length>0&&$e(Me)==="blocks"&&xe.push({id:Pt,label:`\u2192 ${Pt}`,kind:"succ",title:Xe("\uB9C9\uD788\uB294",Me)})}for(let Me of P){let Pt=le(Me),Bn=$e(Me);if(Pt.length>0&&Bn!=="blocks"){let Kr=je(Bn);xe.push({id:Pt,label:`${Kr.glyph}${Pt}`,kind:"other",title:Xe(Kr.relation,Me)})}}let We=dt(),ce=new Map;if(We)for(let Me of We.issues)ce.has(Me.bead_id)||ce.set(Me.bead_id,Me.root_dir);let Je=We&&u?tp(ep(u,We),V):[];return c`
      <div class="detail-section-label">의존성</div>
      ${xe.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${xe.map(Me=>on(Me,ce))}
          </div>`}
      ${We===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:Qn(Je)}
    `}function ur(k){let P=k.metadata||{},G=k.workflow||{},xe=G.stages||{},We=xe.spec&&xe.spec.stale,ce=xe.impl&&xe.impl.stale,Je=G.quick_fix_review?.state==="stale",Me=xe.plan||null,Pt=G.route_source==="derived",Bn=G.route||P.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Pt?" detail-kv__v--derived":""}"
          title=${Pt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Pt?"unset":Bn}</span
        >
      </div>
      ${G.route!=="quick_fix"||Object.hasOwn(P,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${P.spec_review||"\uC5C6\uC74C"}${We?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Me?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Me?.approval_receipt||"\uC5C6\uC74C"}${Me?.approval_state==="stale"?" \xB7 stale":Me?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${G.route!=="quick_fix"||Object.hasOwn(P,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${P.impl_review||"\uC5C6\uC74C"}${ce?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${G.resolver.attempt} \xB7 ${G.resolver.prior_sha} \u2192 ${G.resolver.sha}`}
              >${`${G.resolver.prior_sha.slice(0,7)} \u2192 ${G.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${G.route==="quick_fix"||Object.hasOwn(P,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${P.quick_fix_review||"\uC5C6\uC74C"}${Je?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${G.planned_execution.kind}</span>
            </div>
            ${G.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${G.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${G.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${er(G.exec_receipt)}</span
            >
          </div>`:""}
      ${G.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${G.impl_entry.actor}@${G.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${P.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${P.pr_url}</span>
          </div>`:""}
    `}let Tn={route:["quick_fix","spec_backed","full_plan"]};async function Fn(k,P){let G=P.target.value;if(k==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&G!=="full_plan"&&!window.confirm(`full_plan \u2192 ${G||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){nt();return}await _("update-workflow-meta",{id:u,key:k,value:G},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),nt()}function Ve(k){let P=k.metadata||{};return c` ${((xe,We)=>{let ce=Tn[xe],Je=typeof P[xe]=="string"?P[xe]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${xe}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${xe}
          data-edit=${`wfmeta-${xe}`}
          @change=${Me=>Fn(xe,Me)}
        >
          <option value="" ?selected=${!ce.includes(Je)}>
            ${We}
          </option>
          ${ce.map(Me=>c`<option value=${Me} ?selected=${Je===Me}>${Me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Gt(k,P){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${H}
            @input=${de}
            @keydown=${G=>cn(G,gt,Be,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${gt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Be}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        ${an(P).map(G=>c`<span class="detail-usage-total" title=${G.tooltip}
              >${G.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ee}
        >
          ✎
        </button>
      </div>
    `}function wn(k){let P=nn(k.created_at),G=nn(k.updated_at);return!P&&!G?c``:c`
      ${P?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${P}</span>
          </div>`:""}
      ${G?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${G}</span>
          </div>`:""}
    `}function Ts(k,P){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Hr}
        >
          ${rv.map(G=>c`<option value=${G} ?selected=${G===k}>${G}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ya}
        >
          ${ov.map(G=>c`<option value=${String(G)} ?selected=${G===P}>
                P${G}
              </option>`)}
        </select>
      </div>
    `}function Cs(k){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${F?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Tt}
            >
              ✎
            </button>`}
      </div>
      ${F?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${j}
              @input=${Ht}
              @keydown=${P=>cn(P,Kt,Gn,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Kt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Gn}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Rs(k){let P=typeof k.notes=="string"?k.notes:"";return P.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${P}</div>
    `}function Os(k){let P=Array.isArray(k.labels)?k.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${P.map(G=>c`<span class="detail-label-chip"
              >${G}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${G}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+G}
                @click=${()=>y(G)}
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
            @input=${Es}
            @keydown=${w}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${So}
          >
            추가
          </button>
        </span>
      </div>
    `}function Is(){if(!u)return c``;let k=d||{},P=String(k.id||u),G=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",xe=Ne(),We=k.status||"open",ce=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",Je=k.description||"",Me=s?s.get():null,Pt=Me&&We!=="closed"?Yo({...k,id:P},Me):null,Bn=Me?Vo(Me):null,Kr={...k,metadata:{...k.metadata||{},...p}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Ge}
            >
              ${P}
            </button>
            ${Pt?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${P}
                  ?disabled=${!Pt.placeable}
                  title=${qr(Pt)}
                  @click=${()=>$t(P,Bn)}
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
          ${Pt&&T&&Bn?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${sn=>vt(sn,P)}
              >
                ${rl(Bn,P)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${P}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{T=!1,nt()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Gt(G,xe)}
          ${Kp(Kr,{onChipToggle:sn=>x.toggle({bead_id:P,chip_key:sn}),isChipOpen:sn=>x.isOpen({bead_id:P,chip_key:sn})})}
          ${Hp({metadata:Kr.metadata,workspace_values:zt(),catalog:kt(),execution_defaults:Xt(),expanded:E,presets:Bt()?.presets||[],preset_id:m,preset_busy:g,skipped_orchestration_keys:v},{onToggle:sn=>{E=sn,nt()},onEdit:(sn,Ls)=>{if(sn==="impl_runtime"||sn==="impl_model"||sn==="impl_effort"){O(D(sn,Ls??""));return}O(h(sn,Ls??""))},onPresetSelect:sn=>{m=sn,v=[],nt()},onPresetApply:()=>{Ae()}})}
          ${Zp({md:Kr.metadata,catalog:re,workspace_defaults:X,handlers:{onExecChange:(sn,Ls)=>O(h(sn,Ls))}})}
          ${Ts(We,ce)} ${wn(k)}
          ${Cs(Je)}
          ${Bp(_e,pe,{expanded:ke,draft:Z,sending:be,error:ae})}
          ${Rs(k)} ${Os(k)} ${Xn(k)}
          ${ur(k)} ${Ve(k)}
          ${Np(k,C)}
          ${of({expanded:ze,loading:J,error:U,data:qe},{onToggle:_t})}
          ${rf(ot(),jt,{total:xe,expanded:A},K)}
          ${af({events:st,shown:qt},{onMore:tt})}
        </div>
      </div>
    `}function nt(){pt(Is(),e)}return{load(k){k!==u&&(p={},T=!1,m="",v=[],E=!1,ne(),Re(),et(),Ke(),we(),ve()),u=k,d=null,!yt&&t.subscribeCandidates&&(yt=t.subscribeCandidates(()=>{u&&nt()})),I(),Ft(),L!==k&&ie(k)},clear(){u=null,d=null,p={},T=!1,m="",g=!1,v=[],E=!1,ne(),Re(),et(),Ke(),we(),ve(),Qe(),Oe.close(),Ze.close(),pt(c``,e)},destroy(){S&&(S(),S=null),fe&&(fe(),fe=null),Le&&(Le(),Le=null),Qe(),document.removeEventListener("keydown",St),x.detach(),Ee||(Oe.destroy(),me&&me.parentNode&&me.parentNode.removeChild(me)),Ze.destroy(),Fe.parentNode&&Fe.parentNode.removeChild(Fe),u=null,d=null,ve(),m="",g=!1,v=[],Re(),et(),Ke(),we(),pt(c``,e)}}}function cf(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let m=typeof p=="string"?p.trim():"";if(o&&(m.length>0?(o.textContent=m,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var sv="(max-width: 640px)";function oa(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(sv),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function iv(){return{lanes:{done:!0},areas:{}}}function $s(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function av(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:$s(r.lanes),areas:$s(r.areas)}:{lanes:$s(r),areas:{}}}catch{return null}}function uf(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function sa(e,t=iv()){let n={lanes:$s(t.lanes),areas:$s(t.areas)},r=av(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},uf(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},uf(e,o),s}}}function Yl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function ia(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function aa(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:m}=e,g=[],v=null,E=!1,T=null,te=null,re=null;function X(){T!==null&&clearTimeout(T),T=setTimeout(()=>{T=null,E=!1},0)}function L(){return i()??null}function R(){let Q=new Map,oe=o();for(let se of Array.isArray(oe)?oe:[]){if(!se||typeof se!="object")continue;let pe=se.bead_blocked_by&&typeof se.bead_blocked_by=="object"?se.bead_blocked_by:{};for(let[Ee,me]of Object.entries(pe))Array.isArray(me)&&Q.set(Ee,ia(me));for(let Ee of[...Array.isArray(se.runnable)?se.runnable:[],...Array.isArray(se.session_active)?se.session_active:[]])Ee&&typeof Ee.bead_id=="string"&&Array.isArray(Ee.blocked_by)&&Ee.blocked_by.length>0&&Q.set(Ee.bead_id,ia(Ee.blocked_by))}return Q}function M(){let Q=new Map,oe=new Map,se=o();for(let pe of Array.isArray(se)?se:[]){if(!pe||typeof pe!="object")continue;let Ee=pe.bead_blocked_by&&typeof pe.bead_blocked_by=="object"?pe.bead_blocked_by:{};for(let[me,Oe]of Object.entries(Ee))Array.isArray(Oe)&&Q.set(me,ia(Oe));for(let me of Array.isArray(pe.runnable)?pe.runnable:[])me&&typeof me.bead_id=="string"&&Array.isArray(me.blocked_by)&&oe.set(me.bead_id,ia(me.blocked_by))}for(let pe of g)for(let Ee of[Q,oe]){let me=Ee.get(pe.a);me!==void 0&&Ee.set(pe.a,pe.type==="dep-remove"?me.filter(Oe=>Oe!==pe.b):me.includes(pe.b)?me:[...me,pe.b])}return{snapshot:Q,runnable:oe}}function F(){let Q=R();for(let oe of g){let se=(Q.get(oe.a)||[]).slice();oe.type==="dep-remove"?Q.set(oe.a,se.filter(pe=>pe!==oe.b)):se.includes(oe.b)||Q.set(oe.a,[...se,oe.b])}return Q}function H(Q=r(),oe=L()){let se=new Map;for(let ze of Array.isArray(oe?.lanes)?oe.lanes:[]){let J=new Map;for(let U of Array.isArray(ze?.entries)?ze.entries:[])U&&typeof U.bead_id=="string"&&J.set(U.bead_id,U.dep_created_by_lane===!0);se.set(typeof ze?.id=="string"?ze.id:"",J)}let pe=new Map,Ee=new Map,me=new Set,Oe=new Set;for(let ze of Q.chain_lanes){let J=se.get(ze.lane_id);pe.set(ze.lane_id,{status:ze.status,entries:ze.rows.map((U,qe)=>({bead_id:U.id,root_dir:U.root_dir,...qe===0?{}:{dep_created_by_lane:J?.get(U.id)===!0}}))});for(let U of ze.rows)Ee.set(U.id,ze.lane_id),U.fixed&&me.add(U.id),U.unplaced||Oe.add(U.id)}let Fe=new Map;for(let ze of Q.parallel_rows)typeof ze.queue_index=="number"&&Fe.set(ze.id,ze.queue_index);for(let ze of Q.queue_groups)for(let J of ze.sublanes.serial)for(let U of J.items)typeof U.queue_index=="number"&&Fe.set(U.id,U.queue_index);let Ze=M();return{blocked_by_map:F(),snapshot_blocked_by:Ze.snapshot,runnable_blocked_by:Ze.runnable,owner_of:new Map(Object.entries(Q.owner_of)),cross_lanes:pe,owner_lane_of:Ee,fixed_members:me,placed_members:Oe,parallel_rows:Q.parallel_rows.map(ze=>({bead_id:ze.id,root_dir:ze.root_dir,queue_index:ze.queue_index??0})),parallel_raw_length:new Map(Object.entries(Q.parallel_raw_length)),queue_index_of:Fe}}function j(Q,oe){let se=r();for(let Ee of[...se.runnable,...se.queue,...se.running,...se.pr_wait,...se.done])if(!(Ee.non_occupying||Ee.id!==oe)){if(Ee.root_dir===Q)return Ee.expected_revision;break}let pe=se.queue_groups.find(Ee=>Ee.root_dir===Q);return pe?pe.revision:0}async function q(Q,oe,se,pe){if(!t)return null;let me=await t(Q,{...oe,...se?{root_dir:se}:{},expected_revision:pe});if(me&&me.conflict){me.queue&&d?.(se,me.queue);let Oe=me.queue&&typeof me.queue.revision=="number"?me.queue.revision:pe;me=await t(Q,{...oe,...se?{root_dir:se}:{},expected_revision:Oe})}return me&&me.queue&&d?.(se,me.queue),me}async function V(Q,oe,se,pe,Ee){try{let me=await q(Q,oe,se,pe.get(se)??j(se,Ee.bead_id));return!me||typeof me.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(me.queue&&typeof me.queue.revision=="number"&&pe.set(se,me.queue.revision),me.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):me.applied===!1?(a(me.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${me.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):me.queue&&typeof me.queue.revision=="number"?me.queue.revision:pe.get(se)??0)}catch(me){return a(Yl(me),"error"),null}}async function B(Q,oe,se=new Map){if(Q.type==="worker-queue-disarm"){try{let pe=await q(Q.type,Q.payload,Q.root_dir,se.get(Q.root_dir)??j(Q.root_dir,oe));pe&&pe.queue&&typeof pe.queue.revision=="number"&&se.set(Q.root_dir,pe.queue.revision)}catch{}return!0}if(Q.type==="worker-queue-place"||Q.type==="worker-queue-reorder"||Q.type==="worker-queue-remove")return await V(Q.type,Q.payload,Q.root_dir,se,{bead_id:oe})!==null;try{return(Q.type==="dep-add"||Q.type==="dep-remove")&&t&&await t(Q.type,{a:Q.a,b:Q.b,...Q.root_dir?{root_dir:Q.root_dir}:{}}),!0}catch(pe){return a(Yl(pe),"error"),!1}}function ne(Q){(Q.type==="dep-add"||Q.type==="dep-remove")&&(g=[...g,{type:Q.type,a:Q.a,b:Q.b}])}async function ve(Q,oe){if(!t)return{ok:!1};try{let se=await t(Q.type,{...Q.payload,expected_revision:oe});return!se||typeof se.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:se.revision}}catch(se){let pe=se,Ee=pe&&pe.code==="conflict"?pe.details?.cross_lanes:null;return Ee&&typeof Ee.revision=="number"&&Array.isArray(Ee.lanes)?{ok:!1,conflict:Ee}:(a(Yl(se),"error"),{ok:!1})}}async function Pe(Q,oe,se){let pe=new Map,Ee=[],me=Q.ops.slice(0,Q.lane_op_index),Oe=Q.ops.slice(Q.lane_op_index);for(let Ze of me){if(!await B(Ze,se,pe))return{done:!0};ne(Ze)}let Fe=oe;for(let Ze of Q.lane_ops){if(Fe===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ze=await ve(Ze,Fe);if(!ze.ok)return ze.conflict?{done:!1,conflict:ze.conflict}:{done:!0};Fe=ze.revision}for(let Ze of Oe){if(!await B(Ze,se,pe))return{done:!0};ne(Ze),Ze.type==="dep-add"&&Ee.push(Ze)}for(let Ze of Zd(Ee))Fe=await z(Ze,Fe);return{done:!0}}async function z(Q,oe){if(oe===null||!t)return oe;let se=Q.pairs,pe=oe;for(let Ee=0;Ee<2;Ee+=1){if(se.length===0)return pe;try{let me=await t("monitor-lane-provenance",{lane_id:Q.lane_id,pairs:se.map(Oe=>({bead_id:Oe.bead_id,after:Oe.after,value:!0})),expected_revision:pe});return me&&typeof me.revision=="number"?me.revision:pe}catch(me){let Oe=me,Fe=Oe&&Oe.code==="conflict"?Oe.details?.cross_lanes:null;if(!Fe||typeof Fe.revision!="number"||!Array.isArray(Fe.lanes))return pe;let Ze=Fe.lanes.find(ze=>ze&&ze.id===Q.lane_id);se=Jd(Array.isArray(Ze?.entries)?Ze.entries:[],se),pe=Fe.revision}}return pe}async function ie(Q,oe,se=[]){g=se,l("",0);let pe=r(),Ee=L();for(let me=0;;me+=1){let Oe=Q(H(pe,Ee));if("refused"in Oe){a(Oe.refused,"error");break}let Fe=await Pe(Oe,pe.cross_lanes_revision,oe);if(Fe.done){Oe.correction&&l(Oe.correction.lane_id,Oe.correction.corrected);break}if(me>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Ze=s(Fe.conflict);pe=Ze.lanes,Ee=Ze.raw_lanes}g=[],u()}async function _e(Q,oe){await ie(se=>ji(Q,oe,se),Q.bead_id)}function Ce(Q,oe){let se=oe&&typeof oe.closest=="function"?oe.closest("[data-row-index]"):null;if(se&&Q.contains(se)){let pe=Number(se.getAttribute("data-row-index"));return Number.isFinite(pe)?pe:0}return Q.querySelectorAll("[data-row-index]").length}function Y(Q){let oe=typeof Q?.closest=="function"?Q.closest(".worker-pane--collapsed[data-lane]"):null;if(!oe)return null;let se=oe.getAttribute("data-lane");return se==="queue"?{zone:oe,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:se==="candidate"&&m===!0?{zone:oe,target:{kind:"candidate"}}:null}function ae(Q){let oe=Q.target;if(!v)return null;let se=typeof oe?.closest=="function"?oe.closest("[data-drop]"):null;if(!se)return Y(oe);let pe=se.getAttribute("data-drop");if(pe==="candidate")return{zone:se,target:{kind:"candidate"}};if(pe==="parallel")return{zone:se,target:{kind:"parallel",marker_index:Ce(se,oe)}};if(pe==="chain")return{zone:se,target:{kind:"chain",lane_id:se.getAttribute("data-lane-id")||"",marker_index:Ce(se,oe)}};if(pe==="repo-serial"){let Ee=se.getAttribute("data-root-dir")||"";if(Ee!==v.root_dir)return null;let me=typeof oe?.closest=="function"?oe.closest("[data-queue-index]"):null,Oe=me&&se.contains(me)?me.getAttribute("data-queue-index"):se.getAttribute("data-lane-length"),Fe=Number(Oe);return{zone:se,target:{kind:"repo-serial",root_dir:Ee,lane_id:se.getAttribute("data-lane-id")||"",index:Number.isFinite(Fe)?Fe:0}}}return null}function Z(){for(let Q of Array.from(n.querySelectorAll(".is-drop-over")))Q.classList.remove("is-drop-over")}function be(Q){te=Q.target instanceof Element?Q.target:null}function Ie(Q){let oe=Q.target,se=typeof oe?.closest=="function"?oe.closest('[draggable="true"][data-bead-id]'):null,pe=se?se.closest("[data-drag-kind]"):null;if(!pe)return;if(se&&te&&se.contains(te)&&typeof te.closest=="function"&&te.closest("input, button, a")){Q.preventDefault();return}let Ee=pe.getAttribute("data-bead-id")||"",me=pe.getAttribute("data-drag-kind")||"",Oe=pe.getAttribute("data-root-dir")||"";if(!Ee||!me)return;let Fe=pe.getAttribute("data-queue-index")||"",Ze=Number(Fe),ze=pe.getAttribute("data-lane-id")||"";v={kind:me,bead_id:Ee,root_dir:Oe,...Fe!==""&&Number.isFinite(Ze)?{queue_index:Ze}:{},...ze?{lane_id:ze}:{}},E=!0,p?.(),n.classList.add("is-dragging");try{Q.dataTransfer?.setData("text/plain",Ee),Q.dataTransfer&&(Q.dataTransfer.effectAllowed="move")}catch{}}function ke(Q){let oe=ae(Q);oe&&(Q.preventDefault(),Q.dataTransfer&&(Q.dataTransfer.dropEffect="move"),oe.zone.classList.add("is-drop-over"))}function Re(Q){let oe=Q.target;typeof oe?.closest=="function"&&(oe.closest("[data-drop]")?.classList.remove("is-drop-over"),oe.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function at(){v=null,Z(),n.classList.remove("is-dragging"),X()}function lt(Q){let oe=ae(Q),se=v;v=null,Z(),n.classList.remove("is-dragging"),!(!oe||!se)&&(Q.preventDefault(),_e(se,oe.target))}return{attach(Q){re||(re=Q,Q.addEventListener("pointerdown",be),Q.addEventListener("dragstart",Ie),Q.addEventListener("dragover",ke),Q.addEventListener("dragleave",Re),Q.addEventListener("drop",lt),Q.addEventListener("dragend",at))},detach(){T!==null&&(clearTimeout(T),T=null);let Q=re;re=null,Q&&(Q.removeEventListener("pointerdown",be),Q.removeEventListener("dragstart",Ie),Q.removeEventListener("dragover",ke),Q.removeEventListener("dragleave",Re),Q.removeEventListener("drop",lt),Q.removeEventListener("dragend",at))},isDragging(){return v!==null},consumeClickSuppression(){let Q=E;return E=!1,Q},applyDrop:_e,runPlanned:ie,dropModel:H,sendOp:B,sendQueueCas:V,rememberDep:ne}}function tn(e){return e&&typeof e=="object"?e:{}}function lv(e,t){for(let n of Object.values(tn(t.provider_hold)))for(let r of Array.isArray(n?.targets)?n.targets:[])if(Array.isArray(r?.attempt_ids)&&r.attempt_ids.includes(e))return r;return null}function cv(e){if(e?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(e?.status||"\uBBF8\uC0C1")}`};let t=Array.isArray(e.windows)?e.windows:[],n=t.find(o=>o?.key==="5h"),r=t.find(o=>o?.key==="7d");if(!n||typeof n.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(n.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(r){if(typeof r.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(r.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function la(e,t){let n=tn(tn(t).attempts)[e];if(!n)return null;let r=tn(tn(t).runner_catalog),o=tn(r.runners),i=typeof n.runner=="string"&&o[n.runner]?n.runner:Object.keys(o)[0]||"",s=tn(o[i]),l=tn(s.models),a=typeof n.model=="string"&&l[n.model]?n.model:typeof s.default_model=="string"?s.default_model:Object.keys(l)[0]||"",u=lv(e,tn(t)),d=typeof n.claude_account=="string"?n.claude_account:typeof u?.account=="string"?u.account:"";return{attempt_id:e,original_runner:i,runner:i,model:a,account:d,fresh_current:!1}}function ca(e,t,n){if(!e||!t||typeof t.closest!="function")return null;let r=t.closest(".provider-resume-dialog__runner");if(r){let l=tn(tn(tn(n).runner_catalog).runners),a=tn(l[r.value]),u=Object.keys(tn(a.models));return{...e,runner:r.value,model:typeof a.default_model=="string"?a.default_model:u[0]||""}}let o=t.closest(".provider-resume-dialog__model");if(o){try{let[l,a]=JSON.parse(o.value);if(typeof l=="string"&&typeof a=="string")return{...e,runner:l,model:a}}catch{}return e}let i=t.closest(".provider-resume-dialog__account");if(i)return{...e,account:i.value};let s=t.closest(".provider-resume-dialog__fresh-input");return s?{...e,fresh_current:s.checked}:null}function ua(e){if(!e||!e.runner||!e.model||e.runner==="claude"&&!e.account)return null;let t={runner:e.runner,model:e.model};e.runner==="claude"&&e.account&&(t.claude_account=e.account);let n=e.fresh_current||e.runner!==e.original_runner;return{attempt_id:e.attempt_id,payload:{exec_override:t,...n?{continuation:"fresh_current",decision_token:{}}:{}}}}function xo(e,t){if(!e)return"";let n=tn(tn(tn(t).runner_catalog).runners),r=tn(tn(t).account_catalog),o=Array.isArray(r.claude)?r.claude:[],i=e.runner!==e.original_runner;return c`<dialog
    class="op-dialog provider-resume-dialog"
    aria-label="다른 방법으로 이어하기"
  >
    <h2>다른 방법으로 이어하기</h2>
    <div class="provider-resume-dialog__fields">
      <label>
        러너
        <select class="provider-resume-dialog__runner">
          ${Object.keys(n).map(s=>c`<option value=${s} ?selected=${s===e.runner}>
                ${s}
              </option>`)}
        </select>
      </label>
      <label>
        모델
        <select class="provider-resume-dialog__model">
          ${Object.entries(n).map(([s,l])=>c`<optgroup label=${s}>
                ${Object.keys(tn(l?.models)).map(a=>c`<option
                      value=${JSON.stringify([s,a])}
                      ?selected=${s===e.runner&&a===e.model}
                    >
                      ${a}
                    </option>`)}
              </optgroup>`)}
        </select>
      </label>
      ${e.runner==="claude"?c`<label>
            계정
            <select class="provider-resume-dialog__account">
              ${e.account?"":c`<option value="" selected>계정 선택</option>`}
              ${e.account&&!o.some(s=>s?.email===e.account)?c`<option value=${e.account} selected>
                    ${e.account} (목록에 없음)
                  </option>`:""}
              ${o.map(s=>{let l=cv(s),a=s.alias||s.email;return c`<option
                  value=${s.email}
                  ?selected=${s.email===e.account}
                  ?disabled=${!l.eligible}
                  title=${l.reason}
                >
                  ${a}${l.reason?` \u2014 ${l.reason}`:""}
                </option>`})}
            </select>
          </label>`:""}
      <label class="provider-resume-dialog__fresh">
        <input
          type="checkbox"
          class="provider-resume-dialog__fresh-input"
          .checked=${e.fresh_current}
        />
        새 세션으로
      </label>
    </div>
    ${i||e.fresh_current?c`<p class="provider-resume-dialog__notice">
          이전 세션 맥락을 요약 인계합니다
        </p>`:""}
    <div class="op-dialog__actions provider-resume-dialog__actions">
      <button type="button" class="op-btn provider-resume-dialog__cancel">
        취소
      </button>
      <button
        type="button"
        class="op-btn op-btn--primary provider-resume-dialog__confirm"
        ?disabled=${e.runner==="claude"&&!e.account}
        title=${e.runner==="claude"&&!e.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
      >
        이어하기
      </button>
    </div>
  </dialog>`}function da(e){let t=e?.querySelector?.(".provider-resume-dialog")||null;!t||t.open||(typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}var Vl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var df={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},pf={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},ff={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function uv(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function dv(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=uv(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(pf,n))return pf[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function fa(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function pa(e){for(let t of fa(e)){if(Object.hasOwn(df,t))return df[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function mf(e){return fa(e).length===0?null:pa(e)||"\uC2E4\uD328"}function Wr(e){let t=null;for(let n of fa(e))Object.hasOwn(Vl,n)&&(t=Vl[n]);return t}function $r(e,t){if(typeof e=="string"&&Object.hasOwn(ff,e))return ff[e];let n=dv(e,t);if(n!==null)return n;let r=pa(e),o=Wr(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function gf(e,t){let n=pa(e)??pa(t),r=Wr(t)??Wr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var pv=new Set(["repo_operation_timeout_unresolved"]);function fv(e){for(let t of fa(e))if(pv.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function _v(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function hf(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||fv(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(_v(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Nr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var _f={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function bf(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(_f,t.blocked_reason)?_f[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=$r(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=$r(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function mv(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var yf=200;function gv(e){return typeof e!="string"||e.length===0?"":e.length>yf?`${e.slice(0,yf)}\u2026`:e}function hv(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Ql(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function bv(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=Ql(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=Ql(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function kf(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${vf(i.at)?c`<span class="rtile__history-at"
                    >${vf(i.at)}</span
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
            ${Mr(n)}
          </p>`:""}`}function vf(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function yv(e,t){if(!e||e.open!==!0)return"";let n=Wr(e.cause)||$r(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${fn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(m=>typeof m=="string"&&m.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",p=kf(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${p?c`<div>
            <dt>이력</dt>
            <dd>${p}</dd>
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
  </div>`}function vv(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function kv(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function wv(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=Ql(e.resets_at),r=vv(e.auto_resume),o=kv(e.auto_switch);return c`<div
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
            <dd>${Mr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function $v(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var xv=new Set(["codex-runner"]);function Av(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(g=>g&&!(typeof g.agent_type=="string"&&xv.has(g.agent_type))),a=l.filter(g=>g&&g.state==="live"),u=l.filter(g=>g&&g.state!=="live"),d=r&&typeof r.last_event_at=="number"?fn(r.last_event_at,t):"",p=r?fn(r.updated_at,t):"",m=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${fn(s,t)}</span
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
      </div>`:""}`}var Sv={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Ev(e){if(!e)return"";let t=Sv[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Tv(e,t,n,r="",o="",i=!1){if(e==="provider_hold")return c`<div class="rtile__foot">
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
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let s=gv(t?.summary);if(e==="waiting")return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let l=kf(t);return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${l}
    <div class="rtile__foot">
      ${i?c`${n}${o}`:c`${o}${n}`}
    </div>`}function Xl(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ee=>Ee&&Ee.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,p=e.provider_hold===!0&&!s&&!a&&!u&&!d,m=a&&e.failure||null,g=d&&e.wait||null,v=p&&e.hold||null,E=a||u||d||p,T=!!e.paused,te=s||E?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":p?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):T?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?mv(t-e.started_at):"\u2014",re=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,X=Po(e),L=an(e.usage),R=tr(e.usage),M=e.conflict_resolution?T?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,F=e.base_exception||null,H=e.landing,j=e.attempt_id&&e.attempt_id===n,q=r.monitor||null,V=$v(q),B=Ai(q?.cross_lane_chip),ne=q?xi(q.dependency_chips):"",ve=Av(q,t,T,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),Pe=o&&e.workflow?.chips?.exec_receipt||null,z=Si(e.workflow),ie=Ei(e.rec,e.chip_popover?.chip_key==="rec"),_e=e.chip_popover?lo(e.chip_popover.content):"",Ce=Pe?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${er(Pe)}`}
        >${`${Pe.kind}:${Xs(Pe)}`}</span
      >`:"",Y=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Mo(i)}</span
      >`:"",ae=V||B||z||Y||Ce||ie?c`<div class="rtile__meta">
          ${V}${B}${z}${Y}${Ce}${ie}${_e}
        </div>`:"",Z=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${mf(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",be=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${hv(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:p&&v?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${v.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${bv(v)}
            </button>`:"",Ie=c`${M?c`<span class="worker-mini__badge">${M}</span>`:""}${F?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${F}</span
      >`:""}${Z}${be}`,ke=o?"":go(e),Re=pi(l?.quickfix_landing),at=Re==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",lt=Re==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",Q=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",oe=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",se=oe&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",pe=se?c`${oe}${se}`:oe;return c`<div
    class="rtile${j?" rtile--sel":""}${T?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${E?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${p?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Ti(e.priority)}${X?c`<span class="rtile__resumed" title=${X}>↻</span>`:""}${Ie}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${te}</span>`:""}${Ev(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${te}</span>`}
        ${o||E?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Re}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${at} \uBD88\uAC00`:lt}
                  aria-label=${at}
                >
                  ↻ ${at}
                </button>
                ${pe}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${T?c`<button
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
                ${pe}`}${a?"":Q}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${E?Tv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?m:d?g:v,pe,d?ne:"",a?Q:"",a&&!!e.discard?.error):s?"":c`${ve}${e.rollup?Vs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Pa}):""}
            ${H?c`<div class="rtile__landing">
                  <span
                    class="merge-step${H.failed?" merge-step--failed":""}"
                    style=${`--progress: ${H.percent}%`}
                    >${H.label}${H.index>0?c`<span class="merge-step__n"
                          >${H.index}/${H.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${ne}
            ${o?ae:V||B||z||re||ie||L.length>0||R?c`<div class="rtile__meta">
                    ${V}${B}${z}${$i(e.exec_chips)}${ie}
                    ${L.length>0?L.map(Ee=>c`<span
                              class="worker-usage"
                              title=${Ee.tooltip}
                              >${Ee.label}</span
                            >`):R?c`<span
                            class="worker-usage"
                            title=${qo(e.usage)}
                            >${R}</span
                          >`:""}${_e}
                  </div>`:""}
            ${bi(e)} ${ke}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||T?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${yv(l,t)}${wv(v)}
  </div>`}function Cv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function wf(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Xl(o,t,n,{monitor:Cv(o)}))}
  </div>`}function Ao(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var rn="",Rv=["impl_runtime","impl_model","impl_effort"],$f=["claude","codex"],Ov=["claude_account","codex_account"],Iv=5,_a=1;function En(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ma(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(A=>ge(A,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,p={state:"absent",values:{},warnings:[]},m={},g={},v=Promise.resolve(),E=Promise.resolve(),T={claude:null,codex:null},te=!1,re=null,X={},L="",R="general",M="",F=!1,H=!1,j=!1,q=null,V=!1;function B(){let A=t.queue?t.queue():null;return En(A)?A:null}function ne(){let A=B();return A?A.runner_catalog:null}function ve(){let A=B();return A&&En(A.execution_defaults)?A.execution_defaults:null}function Pe(){let A=B();return!!(A&&Object.hasOwn(A,"quick_fix_orchestration_model"))}function z(){let A=t.implPresetStore?.get();return En(A)&&Array.isArray(A.presets)?A:null}function ie(){return r===null?{}:{root_dir:r}}async function _e(A,N){return V||!n?null:await n(A,N)}function Ce(A){A&&En(A.queue)&&t.onQueueAdopt?.(A.queue)}async function Y(A,N){let W=B();if(!W||V)return null;let Se=await _e(A,{...N,...ie(),expected_revision:W.revision});if(Ce(Se),r!==null&&Se&&Se.conflict){let ye=Se.queue&&typeof Se.queue.revision=="number"?Se.queue.revision:B()?.revision??W.revision;Se=await _e(A,{...N,...ie(),expected_revision:ye}),Ce(Se)}return Se}async function ae(){d=!0,Ne();try{let A=await _e("get-session-defaults",{...ie()});i=si(A?.values),s={...i},l={},a={},u=Array.isArray(A?.warnings)?A.warnings:[]}catch(A){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}finally{d=!1,Ne()}}function Z(A,N){let W={...N};for(let Se of No){let ye=s[Se];ye!==A[Se]&&(typeof ye=="string"?W[Se]=ye:delete W[Se])}return W}function be(){E=E.then(()=>Ie())}async function Ie(){let A=ju(i,s);if(Object.keys(A).length===0)return;let N={...s};try{let W=await _e("set-session-defaults",{values:A,...ie()});i=si(W?.values),s=Z(N,i),u=Array.isArray(W?.warnings)?W.warnings:[]}catch(W){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}Ne()}function ke(A,N){if(!En(A))return;let W=A.state;p={state:W==="usable"||W==="unusable"||W==="absent"?W:"absent",values:En(A.values)?{...A.values}:{},warnings:Array.isArray(A.warnings)?A.warnings:[]},g={...p.values},N&&(m={...g})}async function Re(){try{ke(await _e("get-workspace-accounts",{...ie()}),!0)}catch(A){p={state:"unusable",values:{},warnings:["kv_read_failed"]},g={},m={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}Ne()}async function at(A){try{let N=await fetch(A);if(!N.ok)return null;let W=await N.json();if(!En(W)||!Array.isArray(W.accounts))return null;let Se=W.accounts.filter(ye=>En(ye)&&typeof ye.key=="string"&&ye.key.length>0&&typeof ye.email=="string"&&ye.email.length>0);return{accounts:Se,active:Se.find(ye=>ye.active===!0)||null}}catch{return null}}async function lt(){te=!0;let[A,N]=await Promise.all([at("/api/claude-usage"),at("/api/codex-usage")]);V||(T={claude:A,codex:N},Ne())}function Q(){let A={};for(let N of Ov){let W=Object.hasOwn(m,N)?m[N]:null,Se=Object.hasOwn(g,N)?g[N]:null;W!==Se&&(A[N]=W)}return A}async function oe(){let A=Q();if(Object.keys(A).length!==0){try{ke(await _e("set-workspace-accounts",{values:A,...ie()}),!1)}catch(N){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}Ne()}}function se(A,N){N===rn?delete m[A]:m[A]=N,Ne(),v=v.then(()=>oe())}function pe(A,N){if(Rv.includes(A)){Ze(A,N);return}N===rn?delete s[A]:s[A]=N,Ne(),be()}function Ee(A,N){l[A]=N,delete a[A]}function me(A,N,W){if(l[A]=N,N.length>0&&!W(N)){a[A]=!0,Ne();return}delete l[A],delete a[A],N.length===0?delete s[A]:s[A]=N,Ne(),be()}function Oe(){let A=_t().orchestration_model,N=xn({global:{orchestration_model:A??void 0},execution_defaults:ve(),runner_catalog:ne()}).orchestration_model.value;return N?In(ne(),N):null}function Fe(A,N){typeof N=="string"&&N.length>0?s[A]=N:delete s[A]}function Ze(A,N){let W=N===rn?void 0:N,Se=Mu({impl_runtime:A==="impl_runtime"?W:s.impl_runtime,impl_model:A==="impl_model"?W:s.impl_model,impl_effort:A==="impl_effort"?W:s.impl_effort},ne(),Oe());Fe("impl_runtime",Se.impl_runtime),Fe("impl_model",Se.impl_model),Fe("impl_effort",Se.impl_effort),Ne(),be()}async function ze(){let A=B();if(!A)return;let N={orchestration_model:A.orchestration_model??null,orchestration_effort:A.orchestration_effort??null,orchestration_speed:A.orchestration_speed??null,quick_fix_orchestration_model:A.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:A.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:A.quick_fix_orchestration_speed??null},W=Fu(N,{...N,...X});if(Object.keys(W).length!==0){try{let Se=await Y("worker-queue-set-orchestration-defaults",{values:W});if(Se&&Se.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}X={}}catch(Se){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Se instanceof Error?Se.message:String(Se)}`)}Ne()}}function J(A,N){X[A]=N===rn?null:N,Ne(),ze()}function U(A){if(re=A,!A){Ne();return}let N=ne(),W=_t(),Se=W.orchestration_model;Se&&!fo(N,A).includes(Se)&&(X.orchestration_model=null,Se=null);let ye=W.orchestration_effort;ye&&!ci(N,A,Se||kn).includes(ye)&&(X.orchestration_effort=null),Ne(),ze()}async function qe(A){if(!(!B()||A<_a)){try{await Y("worker-queue-set-slots",{slots:A})}catch(N){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}Ne()}}async function ft(A){if(!(!B()||A<_a||A>Iv)){try{await Y("worker-queue-set-serial-lane-count",{count:A})}catch(N){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}Ne()}}async function ut(A,N){let W=A==="auto_advance"?"worker-automation-toggle":A==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await Y(W,{on:N})}catch(Se){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Se instanceof Error?Se.message:String(Se)}`)}Ne()}function He(){let A={},N=_t();for(let W of uo){let Se=On.includes(W)?N[W]:s[W];typeof Se=="string"&&Se.length>0&&(A[W]=Se)}return A}async function et(){let A=z();if(!A)return;let N=He();if(Object.keys(N).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let W=(A.presets||[]).find(ye=>ye.id===L),Se=M.trim()||(W?W.name:"");if(!Se){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let ye=W?await _e("impl-preset-update",{expected_revision:A.revision,id:W.id,name:Se,settings:N}):await _e("impl-preset-create",{expected_revision:A.revision,name:Se,settings:N});if(ye&&ye.applied){if(M="",!W&&Array.isArray(ye.presets)){let mt=ye.presets.find($t=>$t.name===Se);L=mt?mt.id:L}Ne()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne()}catch(ye){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}}async function $(){let A=z();if(!(!A||L.length===0))try{let N=await _e("impl-preset-delete",{expected_revision:A.revision,id:L});N&&N.applied?(L="",Ne()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ne())}catch(N){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}}function K(A){i=si(A.values),s={...i},u=Array.isArray(A.warnings)?A.warnings:[],En(A.queue)&&(t.onQueueAdopt?.(A.queue),X={})}async function he(A){let N=z(),W=B();if(!N||!W||L.length===0||A==="quick_fix"&&!Pe())return;let Se=ye=>({preset_id:L,expected_revision:N.revision,expected_queue_revision:ye,...A==="quick_fix"?{lane:"quick_fix"}:{},...ie()});try{let ye=await _e("apply-impl-preset-global",Se(W.revision));if(A==="quick_fix"&&ye&&ye.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ne();return}if(ye&&ye.applied&&K(ye),r!==null&&ye&&ye.queue_applied===!1){let mt=ye.queue&&typeof ye.queue.revision=="number"?ye.queue.revision:B()?.revision??W.revision;if(ye=await _e("apply-impl-preset-global",Se(mt)),A==="quick_fix"&&ye&&ye.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Ne();return}ye&&ye.applied&&K(ye)}ye&&ye.applied?ye.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ye&&ye.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ye){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ye instanceof Error?ye.message:String(ye)}`)}Ne()}async function Ye(){H=!0,j=!1,Ne();try{let A=await _e("get-worker-system-prompt",{});!A||typeof A!="object"||Array.isArray(A)?j=!0:q=A}catch{j=!0}finally{H=!1,Ne()}}function ct(){if(F=!F,F&&!q){Ye();return}Ne()}function Ke(){let A=ko({loading:H,error:j});if(A)return A;if(!q)return"";let N=Array.isArray(q.variants)?q.variants:[];return c`<div class="settings-dialog__sp-body">
      ${q.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${q.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${N.map(W=>c`<div class="settings-dialog__sp-variant" data-variant=${W.key}>
            <div class="settings-dialog__sp-cond">${W.condition}</div>
            ${lr(W.label,W.system_prompt)}
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
        aria-expanded=${F?"true":"false"}
        @click=${ct}
      >
        ${F?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${F?Ke():""}
    </section>`}function Dt(A,N,W,Se,ye,mt,$t,vt){let xt=ye[A]??rn,jt=Ha(A,W,ye,ve(),ne(),$t,vt),zt=jt.options.find(kt=>kt.value===xt),Ft=xt===rn?jt.full_value:zt?.full_value;return c`<select
        class=${xt===rn?"settings-dialog__unset":""}
        data-key=${A}
        aria-label=${N}
        title=${Ft||""}
        ?disabled=${mt===!0||vt!=="quick_fix"&&jt.disabled}
        .value=${wr(String(xt))}
        @change=${kt=>Se(A,String(kt.target.value))}
      >
        <option value=${rn} ?selected=${xt===rn}>
          ${jt.unset_label}
        </option>
        ${jt.options.map(kt=>c`<option
              value=${kt.value}
              title=${kt.full_value||""}
              ?selected=${kt.value===xt}
            >
              ${kt.label}
            </option>`)}
      </select>
      ${xt===rn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function st(A,N,W,Se,ye,mt=!1,$t,vt=null,xt=null){return c`<div
      class=${`settings-dialog__row${mt?" settings-dialog__row--off":""}`}
      title=${mt&&xt?xt:""}
    >
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        ${Dt(A,N,W,Se,ye,mt,$t,vt)}
      </span>
    </div>`}function wt(A,N,W,Se,ye,mt){let $t=Object.hasOwn(a,A),vt=l[A]??s[A]??rn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${$t?" settings-dialog__text--invalid":""}`}
          data-key=${A}
          aria-label=${N}
          aria-invalid=${String($t)}
          placeholder=${W}
          .value=${wr(vt)}
          @input=${xt=>Ee(A,String(xt.target.value))}
          @change=${xt=>me(A,String(xt.target.value).trim(),mt)}
        />
        ${vt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${A}
          >${$t?ye:Se}</span
        >
      </span>
    </div>`}function qt(A,N,W,Se){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${A}
            .checked=${s[A]===jo}
            @change=${ye=>pe(A,ye.target.checked?jo:rn)}
          />
          ${W}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${A}>${Se}</span>
      </span>
    </div>`}function Lt(A,N){let W=N?N.active:null;return En(W)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${A==="claude"?W.email:$o({...W,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ut(A,N,W){let Se=T[W],ye=Object.hasOwn(m,A)?m[A]:rn,mt=W==="claude"?ta:$o,$t=!!Se?.accounts.some(vt=>vt.key===ye);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${N}
          data-account-key=${A}
          @change=${vt=>se(A,String(vt.target.value))}
        >
          <option value=${rn} ?selected=${ye.length===0}>
            ${Lt(W,Se)}
          </option>
          ${ye.length>0&&!$t?c`<option value=${ye} selected>
                ${ye} (목록에 없음)
              </option>`:""}
          ${Se?.accounts.map(vt=>c`<option value=${vt.key} ?selected=${vt.key===ye}>
                ${mt(vt)}
              </option>`)||""}
        </select>
        ${Se?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ue(){let A=p.warnings.join(", ");return p.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${A} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:p.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${A}`:null}function we(A,N,W,Se,ye,mt){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${N}-on)`}
        ></i>
        ${A}
      </span>
      <span class="settings-dialog__controls">
        ${Dt(W,`${A} \uBAA8\uB378`,Se,pe,s,!1)}
        ${Dt(ye,`${A} effort`,li,pe,s,!1)}
        ${Dt(mt,`${A} \uC18D\uB3C4`,Lu,pe,s,!1)}
      </span>
    </div>`}function Ue(A,N,W,Se){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${Se?" is-on":""}`}
          data-automation=${A}
          aria-pressed=${Se?"true":"false"}
          aria-label=${N}
          @click=${()=>ut(A,!Se)}
        >
          ${Se?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${W}</span>
      </span>
    </div>`}function rt(A,N,W,Se){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${A}>
          <button
            type="button"
            aria-label=${`${N} \uAC10\uC18C`}
            @click=${()=>Se(W-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${W}</span>
          <button
            type="button"
            aria-label=${`${N} \uC99D\uAC00`}
            @click=${()=>Se(W+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function tt(A,N){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${A.rows.length>0?`\uBCC0\uACBD ${A.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${A.rows.map(W=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${W.kind}
          >
            <span class="settings-dialog__preset-diff-label">${W.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${W.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${W.after??(N==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${A.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${A.ignored_keys.join(", ")}은(는)
            ${N==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function _t(){let A=B(),N={};for(let W of[...On,...co])N[W]=Object.prototype.hasOwnProperty.call(X,W)?X[W]:A&&typeof A[W]=="string"?A[W]:null;return N}function bt(){let A=_t(),N={};for(let W of co)N[W]=A[W]??null;for(let W of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])N[W]=s[W]??null;return N}function ot(){let A=ne(),N=s.impl_runtime,W=s.impl_model,Se=z(),ye=B(),mt=_t(),$t=fo(A,re),vt=po(A,void 0).filter(Qe=>Qe!==kn),xt=Dr(A,void 0,void 0),jt=ci(A,re,mt.orchestration_model||kn).filter(Qe=>Qe!==kn),zt=L?(Se?.presets||[]).find(Qe=>Qe.id===L):null,Ft=zt?qu(He(),En(zt.settings)?zt.settings:{}):null,kt={quick_fix_orchestration_model:fo(A,null),quick_fix_orchestration_effort:ci(A,null,null).filter(Qe=>Qe!==kn),quick_fix_orchestration_speed:Hn,quick_fix_impl_dispatch:Fo,quick_fix_impl_runtime:$f,quick_fix_impl_model:vt,quick_fix_impl_effort:xt,quick_fix_impl_speed:Hn},Xt=zt?Nu(bt(),En(zt.settings)?zt.settings:{},kt):null,Zt=R==="quick_fix"?Xt:Ft,Bt=Pe(),Rt=Bt?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",Qt={...s,...mt},Ae=ye&&typeof ye.slots=="number"?ye.slots:_a+1,S=ye&&typeof ye.serial_lane_count=="number"?ye.serial_lane_count:_a,fe=ve()?.supported===!0,Le=ue(),yt=Ha("workflow_mode",Bo,s,ve(),A);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Le?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Le}
          </div>`:""}
      ${fe?"":c`<div
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
                .value=${wr(L)}
                @change=${Qe=>{L=String(Qe.target.value),Ne()}}
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
                ?disabled=${!Ft||Ft.rows.length===0}
                @click=${()=>he("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${Rt||""}
                ?disabled=${!Bt||!Xt||Xt.rows.length===0}
                @click=${()=>he("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${L?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${wr(M)}
                @input=${Qe=>{M=String(Qe.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${L?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${et}
              >
                ${L?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${L.length===0}
                @click=${$}
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
                aria-pressed=${String(R==="general")}
                @click=${()=>{R="general",Ne()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(R==="quick_fix")}
                @click=${()=>{R="quick_fix",Ne()}}
              >
                quick_fix
              </button>
            </div>
            ${Zt?tt(Zt,R):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${wr(re||rn)}
                    @change=${Qe=>{let St=String(Qe.target.value);U(St===rn?null:St)}}
                  >
                    <option value=${rn} ?selected=${!re}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${re==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${re==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${st("orchestration_model","\uBAA8\uB378",$t,J,mt)}
              ${st("orchestration_effort","effort",jt,J,mt)}
              ${st("orchestration_speed","\uC18D\uB3C4",Hn,J,mt)}
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
                      .checked=${ye?.provider_auto_switch!==!1}
                      @change=${Qe=>ut("provider_auto_switch",Qe.target.checked)}
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
                      data-mode=${rn}
                      aria-pressed=${String(!s.workflow_mode)}
                      @click=${()=>pe("workflow_mode",rn)}
                    >
                      ${yt.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Bo.map(Qe=>c`<button
                          type="button"
                          data-mode=${Qe}
                          aria-pressed=${String(s.workflow_mode===Qe)}
                          @click=${()=>pe("workflow_mode",Qe)}
                        >
                          ${Qe}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${wt("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Iu)}
              ${qt("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${we("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Uo,"spec_review_effort","spec_review_speed")}
              ${we("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ai,"plan_review_effort","plan_review_speed")}
              ${we("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Uo,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${st("impl_runtime","\uC704\uC784 \uB300\uC0C1",ii,pe,s)}
              ${st("impl_model","\uBAA8\uB378",po(A,N),pe,s)}
              ${st("impl_effort","effort",Dr(A,N,W),pe,s)}
              ${st("impl_speed","\uC18D\uB3C4",Hn,pe,s)}
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
              ${st("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",kt.quick_fix_orchestration_model,J,mt,!Bt,Qt,"quick_fix",Rt)}
              ${st("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",kt.quick_fix_orchestration_effort,J,mt,!Bt,Qt,"quick_fix",Rt)}
              ${st("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Hn,J,mt,!Bt,Qt,"quick_fix",Rt)}
              ${st("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Fo,pe,s,!Bt,Qt,"quick_fix",Rt)}
              ${st("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",$f,pe,s,!Bt,Qt,"quick_fix",Rt)}
              ${st("quick_fix_impl_model","\uBAA8\uB378",vt,pe,s,!Bt,Qt,"quick_fix",Rt)}
              ${st("quick_fix_impl_effort","effort",xt,pe,s,!Bt,Qt,"quick_fix",Rt)}
              ${st("quick_fix_impl_speed","\uC18D\uB3C4",Hn,pe,s,!Bt,Qt,"quick_fix",Rt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ue("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",ye?.auto_advance===!0)}
              ${Ue("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",ye?.auto_merge===!0)}
              ${rt("slots","\uB3D9\uC2DC \uC2E4\uD589",Ae,Qe=>qe(Qe))}
              ${rt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",S,Qe=>ft(Qe))}
            </div>
            ${Et()}
          `}
    `}function Ne(){V||pt(ot(),e)}return{load(){X={},R="general",l={},a={};let A=[ae(),Re()];return te||A.push(lt()),Promise.all(A).then(()=>{})},render:Ne,sessionDraft:()=>({...s}),destroy(){V=!0,pt(c``,e)}}}function ga(e){return c`<svg
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
  </svg>`}function xf(){return ga(Io`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Af(){return ga(Io`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Sf(){return ga(Io`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Ef(){return ga(Io`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Tf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Cf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return an(ri(t));let n={};for(let l of zn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of zn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?tr(n):null}function Nn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Zl(e,t){let n=Nn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Lv(e,t){if(!Nn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Dv(e){if(!Nn(e)||!Nn(e.execution_defaults)||!Nn(e.runner_catalog)||!Nn(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=xn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=In(e.runner_catalog,n.orchestration_model.value??""),o=_o(n,e.runner_catalog),i=Pr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function Rf(e,t){let n=t.notify||(Y=>ge(Y,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,p=null,m=new Map;function g(){let Y=t.workspacesState?t.workspacesState():[];return Array.isArray(Y)?Y.filter(ae=>Nn(ae)):[]}function v(Y){return g().find(ae=>ae.root_dir===Y)||null}function E(Y){return Lv(v(Y),m.get(Y))}function T(){for(let Y of g()){let ae=m.get(Y.root_dir);ae&&typeof ae.revision=="number"&&typeof Y.revision=="number"&&Y.revision>=ae.revision&&m.delete(Y.root_dir)}}async function te(Y,ae,Z){let be=t.transport,Ie=E(ae);if(!(!be||!Nn(Ie))){try{let ke=await be(Y,{...Z,root_dir:ae,expected_revision:Ie.revision});if(Nn(ke?.queue)&&m.set(ae,ke.queue),ke&&ke.conflict){let Re=Nn(ke.queue)&&typeof ke.queue.revision=="number"?ke.queue.revision:E(ae)?.revision;ke=await be(Y,{...Z,root_dir:ae,expected_revision:Re}),Nn(ke?.queue)&&m.set(ae,ke.queue)}}catch(ke){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ke instanceof Error?ke.message:String(ke)}`)}ie()}}function re(Y){u!==Y&&(u=Y,t.onFocusChange?.(u),ie())}function X(Y){re(u===Y?null:Y)}function L(Y){if(d===Y){M();return}R(),d=Y;let ae=v(Y);s.textContent=`${ae?.name||Y} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=ma(a,{root_dir:Y,queue:()=>E(Y),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Z=>{m.set(Y,Z),ie()}}),p.load(),ie()}function R(){p?.destroy(),p=null}function M(Y){R(),d=null,o.hidden=!0,s.textContent="",Y!==!0&&ie()}let F=()=>M();l.addEventListener("click",F);function H(Y){Y.key==="Escape"&&u!==null&&re(null)}document.addEventListener("keydown",H);function j(Y,ae){let Z=Math.max(ae,Y,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ae}\uAC1C \uC911 ${Y}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Z},(be,Ie)=>Ie<Y?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function q(Y){let ae=Y.auto_advance===!0,Z=Y.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ae?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ae?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9\uD654`}
        title=${ae?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ae?Af():xf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Z?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Z?"true":"false"}
        aria-label=${`${Y.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Z?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Sf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===Y.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===Y.root_dir?"true":"false"}
        aria-label=${`${Y.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Ef()}
      </button>`}function V(Y){let ae=Dv(Y);return ae?c`<div class="mon2-deck__chips">
      ${ae.orchestration?c`<span class="mon2-deck__chip" title=${ae.orchestration.title}
            >오케 ${ae.orchestration.text}</span
          >`:""}
      ${ae.worker?c`<span class="mon2-deck__chip" title=${ae.worker.title}
            >워커 ${ae.worker.text}</span
          >`:""}
    </div>`:""}function B(Y){let ae=[];for(let[Z,be]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ie=Zl(Y,Z);Ie>0&&ae.push(`${be} ${Ie}`)}return ae.join(" \xB7 ")}function ne(Y){let ae=Zl(Y,"running"),Z=typeof Y.slots=="number"?Y.slots:1;return c`<div
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
          title=${`\uC2AC\uB86F ${Z}\uAC1C \uC911 ${ae}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ae}/${Z}</span>
          ${j(ae,Z)}
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
        <div class="mon2-deck__ops">${q(Y)}</div>
        <span class="mon2-deck__counts">${B(Y)}</span>
        ${V(Y)}
      </div>
    </div>`}function ve(Y){let ae=t.doneItems?t.doneItems():[],Z=t.rangeLabel?t.rangeLabel():"",be=Cf(Array.isArray(ae)?ae:[]),Ie=ke=>Y.reduce((Re,at)=>Re+Zl(at,ke),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${Y.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Z}`}
        >실행 ${Ie("running")} · 대기 ${Ie("queue")} · PR
        ${Ie("pr_wait")}${Ie("session_active")>0?` \xB7 \uC138\uC158 ${Ie("session_active")}`:""}
        · ${Z} 완료
        ${Array.isArray(ae)?ae.length:0}</span
      >
      ${be===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof be=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Tf(Z)}
                  >${be}</span
                >`:be.map(ke=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ke.provider}
                      title=${ke.tooltip}
                      >${ke.label}</span
                    >`)}
          </span>`}
    </div>`}function Pe(){let Y=g();return Y.length===0?"":c`${ve(Y)}
      <div class="mon2-deck__strip">
        ${Y.map(ae=>ne(ae))}
      </div>`}function z(){u!==null&&!v(u)&&(u=null,t.onFocusChange?.(null))}function ie(){T(),z(),d!==null&&!v(d)&&M(!0),pt(Pe(),r),p?.render()}function _e(Y){let ae=Y.target;if(!ae||typeof ae.closest!="function")return;let Z=ae.closest("[data-root-dir]");if(!Z)return;let be=Z.getAttribute("data-root-dir")||"",Ie=ae.closest("[data-act]")?.getAttribute("data-act");if(Ie==="worker"){t.gotoWorkerTab?.(be);return}if(Ie==="auto"){te("worker-automation-toggle",be,{on:E(be)?.auto_advance!==!0});return}if(Ie==="merge"){te("worker-merge-auto-toggle",be,{on:E(be)?.auto_merge!==!0});return}if(Ie==="gear"){L(be);return}X(be)}function Ce(Y){if(Y.key!=="Enter"&&Y.key!==" ")return;let ae=Y.target;if(!ae||typeof ae.closest!="function")return;let Z=ae.closest('[data-root-dir][role="button"]');!Z||Z!==ae||(Y.preventDefault(),X(Z.getAttribute("data-root-dir")||""))}return r.addEventListener("click",_e),r.addEventListener("keydown",Ce),{render:ie,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",H),r.removeEventListener("click",_e),r.removeEventListener("keydown",Ce),l.removeEventListener("click",F),R(),pt(c``,r),e.replaceChildren()}}}var Pv=1e4,Df="bdui.monitor.done-range",Pf="bdui.monitor.running_sort",Mf="bdui.monitor.candidate_sort",qf="beads-ui.monitor.candidate-filter",Nf="beads-ui.monitor.sections";function Mv(){try{let e=window.localStorage.getItem(qf);if(!e)return{...bo};let t=JSON.parse(e);return!t||typeof t!="object"?{...bo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:bo.show_blocked,readiness:rs.some(n=>n.value===t.readiness)?t.readiness:"all"}}catch{return{...bo}}}function Of(e){try{window.localStorage.setItem(qf,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness}))}catch{}}function qv(){try{let e=window.localStorage.getItem(Mf);return ns.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Nv(e){try{window.localStorage.setItem(Mf,e)}catch{}}function jv(){try{let e=window.localStorage.getItem(Nf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Fv(e){try{window.localStorage.setItem(Nf,JSON.stringify(e))}catch{}}function Bv(){try{let e=window.localStorage.getItem(Df);return e===null?"today":Un(e)}catch{return"today"}}function Uv(e){try{window.localStorage.setItem(Df,e)}catch{}}function Wv(){try{return window.localStorage.getItem(Pf)==="repo"?"repo":"started"}catch{return"started"}}function zv(e){try{window.localStorage.setItem(Pf,e)}catch{}}var jf="tab:monitor:pipeline",Hv=1e3,If=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Kv=["queue","runnable","done"],Lf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Gv(e){return e>=1&&e<=Lf.length?Lf[e-1]:`(${e})`}function Ff(e,t){let n=Wt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(f=>typeof globalThis.confirm!="function"||globalThis.confirm(f)),m=Bv(),g=Wv(),v=Mv(),E=qv(),T=jv(),te=sa("beads-ui.monitor.lane-collapsed"),re=!1,X=null,L=null,R=null,M=null,F=null,H=null,j=ao(()=>W()),q=null,V=null,B=null,ne=null;function ve(f){return ne===null&&(ne=pe()),zd(f,ne)}function Pe(f,h){z(),!(h<=0)&&(V={lane_id:f,corrected:h},B=setTimeout(()=>{B=null,V=null,W()},Pv))}function z(){B!==null&&(clearTimeout(B),B=null),V=null}function ie(){let f=Yr.find(h=>h.value===m);return f?f.label:""}let _e=document.createElement("div");_e.className="mon",e.appendChild(_e);let Ce=document.createElement("div");Ce.className="worker-drawer-overlay",Ce.hidden=!0;let Y=document.createElement("div");Y.className="worker-drawer-overlay__backdrop";let ae=document.createElement("div");ae.className="worker-drawer-host mon2-drawer",Ce.append(Y,ae),e.appendChild(Ce);let Z=vr(null,null),be=new Map,Ie=new Map,ke=new Set,Re=null,at=null,lt=null,Q=wo(ae,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{L=null,Ce.hidden=!0,W()}}),oe=aa({transport:i,console_el:_e,getLanes:()=>Z,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:Ft,reproject:f=>({lanes:N(f),raw_lanes:f}),onCorrection:Pe,showToast:ge,requestRender:()=>W(),adoptQueue:(f,h)=>{Ie.set(f,h)},onDragBegin:()=>{R=null},candidate_drop:!0}),{applyDrop:se,dropModel:pe,runPlanned:Ee,sendQueueCas:me}=oe;async function Oe(f,h,O,D,_=!0){if(!i||!O)return null;let b=await i(f,{...h,root_dir:O,expected_revision:D});if(b&&b.conflict&&_){b.queue&&Ie.set(O,b.queue);let ee=b.queue&&typeof b.queue.revision=="number"?b.queue.revision:D;b=await i(f,{...h,root_dir:O,expected_revision:ee})}return b&&b.queue&&O&&Ie.set(O,b.queue),b}function Fe(f){let h=Ie.get(f);if(h)return h;let O=o&&o.get?o.get():null;return(Array.isArray(O)?O:[]).find(D=>D?.root_dir===f)||{}}function Ze(f,h){return Fe(f)?.merge_queue?.find(D=>D.bead_id===h)?.continuation_action}async function ze(f,h,O,D){let _=await Oe(f,h,O,D),b=Ie.get(O)?.revision??_?.queue?.revision??D;return mr(_,(ee,de)=>Oe(f,{...h,continuation:ee,decision_token:de},O,b,!1),{refresh:ee=>Oe(f,h,O,ee?.queue?.revision??Ie.get(O)?.revision??b,!1)})}async function J(f,h,O,D){let _=await mr({continuation_mismatch:D},(ee,de)=>Oe("worker-merge-queue-add",{bead_id:h,continuation:ee,decision_token:de},f,O,!1)),b=_?.queue?.merge_queue?.find(ee=>ee.bead_id===h)?.continuation_action;_?.applied!==!0&&b?.continuation===null&&b.mismatch&&await J(f,h,_.queue.revision,b.mismatch)}async function U(f,h,O){let D=await Oe("worker-discard",f,h,O);if(D&&D.discarded===!0){ge(wi(D),"success",5e3);return}if(D&&D.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${D.reason}`,"error");return}if(D&&D.accepted&&D.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(D&&D.accepted){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${D.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}D&&!D.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function qe(f,h,O,D){let _=await Oe("worker-discard-abandon",f,h,O);if(_&&_.abandoned===!0){ge(ki(D),"success",5e3);return}if(_&&_.reason){ge(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${_.reason}`,"error");return}_&&!_.conflict&&ge("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function ft(f,h,O){return!i||!O?null:await i(f,{...h,root_dir:O})}async function ut(f,h,O){if(!ke.has(f)){ke.add(f),W();try{let D=await Oe("worker-resolve-in-session",{bead_id:f},h,O,!1);D?.session==="already_running"?ge(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${D.tmux_window||"?"}`,"error"):D?.launched!==!0?ge(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${D?.reason||"unknown"}`,"error"):D.mode!=="fork"&&ge(`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${D.fallback_reason||"unknown"})`,"success")}finally{ke.delete(f),W()}}}async function He(){let f=new Map;for(let h of Z.pr_wait)f.has(h.root_dir)||f.set(h.root_dir,h.expected_revision);for(let[h,O]of f)await Oe("worker-merge-queue-add-all",{},h,O)}function et(f){let h=T[f];return!!(h&&h.runnable===!0)}function $(f){let h={...T[f]||{}};h.runnable=!h.runnable,T={...T,[f]:h},Fv(T),W()}function K(f){te.toggle(f),W()}function he(f){te.toggleArea(f),W()}function Ye(f){let h=f.dependency_chips||null,O=f.overlap_chips||[],D=f.scope_state==="missing",_=f.armed_lane_chip;return!h&&O.length===0&&!D&&!_?null:{...h||{},...O.length>0?{overlaps:O}:{},...D?{scope_missing:!0}:{},..._?{armed_lane:_}:{}}}function ct(f){return Ci(f,h=>j.isOpen({bead_id:f.id,chip_key:h}))}function Ke(f){let h=Ye(f),O=ct(f);return h||O?{...f,...h?{dependency_chips:h}:{},...O?{chip_popover:O}:{}}:f}function Et(f){let h=et(f.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${f.root_dir}
        data-section="runnable"
        aria-expanded=${h?"false":"true"}
        aria-label=${`${f.name} \uC139\uC158 ${h?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${h?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${f.root_dir}>${f.name}</span>
      <span class="mon2-sec__count">${f.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Dt(f,h){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="candidate"
      data-root-dir=${f.root_dir}
    >
      ${h}
    </div>`}function st(f){if(R!==f.id)return null;let h=Z.queue_groups.find(b=>b.root_dir===f.root_dir),O=f.place_lanes||[],D=Z.cross_lanes_revision!==null,_=[{id:"parallel",label:"\uBCD1\uB82C",count:f.place_index??0}];for(let b of Z.chain_lanes)_.push({id:`lane:${b.lane_id}`,label:`\uC5F0\uACB0 ${b.number} (${b.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:b.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!D});_.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!D,title:D?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let b of O)_.push({id:`serial:${b.id}`,label:`\uC9C1\uB82C ${Number(b.id.slice(1))}`,count:b.length,group:`${h?h.name:""} \uC9C1\uB82C`});return{bead_id:f.id,lanes:_}}function wt(f){return Dt(f,c`${il(Ke(f),st(f),{exec_chips_mode:"pinned_only",onOpenDoc:l?(h,O)=>l(O,f.root_dir):void 0})}`)}function qt(){return Z.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Z.runnable.map(f=>wt(f))}
      </div>`:c`${Z.runnable_sections.map(f=>{let h=et(f.root_dir);return c`<section
        class="mon2-sec${h?" is-collapsed":""}"
        data-root-dir=${f.root_dir}
        data-section="runnable"
      >
        ${Et({root_dir:f.root_dir,name:f.name,count:f.items.length})}
        ${h?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${f.items.map(O=>wt(O))}
            </div>`}
      </section>`})}`}function Lt(f,h){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="parallel"
      data-root-dir=${f.root_dir}
      data-row-index=${h}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${Ln(Ke(f),{actions:ho(f,{nudgeable:!0})})}
    </div>`}function Ut(f,h,O,D){return c`<div
      class="mon2-crow${h.fixed?" mon2-crow--fixed":""}"
      draggable=${h.draggable?"true":"false"}
      data-bead-id=${h.id}
      data-drag-kind="chain"
      data-root-dir=${h.root_dir}
      data-lane-id=${f.lane_id}
      data-row-index=${O}
      data-queue-index=${typeof h.queue_index=="number"?String(h.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Gv(h.seq)}</span
      >
      ${h.workspace_name?c`<span class="worker-mini__repo" title=${h.root_dir}
            >${h.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${h.id}</span>
      <span class="mon2-crow__title">${h.title}</span>
      ${h.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${D.includes(h.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${h.location_title}
        >${h.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${h.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function ue(f){let h=Z.cross_lanes_revision!==null,O=ve(f.lane_id),D=O?.held===!0,_=O?.cycle===!0,b=O?O.mismatched:[],ee=V&&V.lane_id===f.lane_id?V.corrected:0;return c`<div class="mon2-clane" data-lane-id=${f.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${f.label}</span>
        <span class="mon2-clane__count">${f.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${f.state}"
          >${f.badge}</span
        >
        ${ee>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ee}건 자동 교정</span
            >`:""}
        ${_?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${D?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${qi}</span
            >`:""}
        ${f.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${f.lane_id}
              ?disabled=${!h||!f.can_confirm||D}
              title=${D?qi:f.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${f.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${f.lane_id}
              ?disabled=${!h}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${f.run_label}
            </button>`:""}
        ${f.state==="confirmed"&&f.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${f.lane_id}
              ?disabled=${!h}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${f.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${f.lane_id}
              ?disabled=${!h}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${f.lane_id}
          ?disabled=${!h}
          title=${f.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${f.lane_id}
      >
        ${f.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:f.rows.map((de,Be)=>Ut(f,de,Be,b))}
      </div>
    </div>`}function we(f,h,O){return c`<div
      class="mon2-item"
      data-bead-id=${h.id}
      data-drag-kind="repo-serial"
      data-root-dir=${h.root_dir}
      data-lane-id=${f.id}
      data-row-index=${O}
      data-queue-index=${String(h.queue_index??0)}
    >
      ${Ln(Ke(h),{actions:ho(h)})}
    </div>`}function Ue(f){if(f.length===0)return"";let h=f.length-1;return`${f[0].id} \uC810\uC720${h>0?` +${h}`:""}`}function rt(f){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${f.id}
    >
      ${Ln({id:f.id,title:f.title,lane:"running",draggable:!1,ghost:!0,badges:[f.badge]})}
    </div>`}function tt(f,h){let O=h.occupants,D=h.cross_wait_peers||[];return{id:h.id,pane_id:"",title:`${f.name} \xB7 \uC9C1\uB82C ${h.index+1}`,rows:[...O.map(_=>rt(_)),...h.items.map((_,b)=>we(h,_,b))],count:h.items.length,empty:h.empty===!0,...O.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${O.map(_=>`${_.id} \u2014 ${_.badge}`).join(`
`)}
              >${Ue(O)}</span
            >`,held:!0}:{},cycle:h.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${f.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...D.length>0?{after:c`${D.map(_=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${_.workspace_name}·${_.lane}과 교차 대기
                </div>`)}`}:{}}}function _t(){let f=Z.cross_lanes_revision!==null,h=Z.chain_lanes.some(O=>O.draft&&O.rows.length===0);return Ri({parallel:{rows:Z.parallel_rows.map((O,D)=>Lt(O,D)),count:Z.parallel_rows.length,collapsed:te.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:Z.queue_groups.flatMap(O=>O.sublanes.serial.map(D=>({...tt(O,D),drop:{drop:"repo-serial",root_dir:O.root_dir,lane_id:D.id,lane_length:String(D.raw_length)}}))),collapsed:te.isAreaCollapsed("serial"),extra_panes:Z.chain_lanes.map(O=>ue(O)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${h||!f}
          title=${f?h?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...Z.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function bt(f){return c`<div class="worker-rungrid">
      ${Z.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Z.running.map(h=>Xl({bead_id:h.id,attempt_id:h.attempt_id||"",title:h.title,runner:h.runner??null,model:h.model??null,effort:h.effort??null,speed:h.speed??null,started_at:h.started_at??null,kind:h.kind,...h.kind==="session"?{updated_at:h.updated_at,session_refs:h.session_refs||[]}:{},workflow:h.workflow||null,resumed_from:h.resumed_from??null,continuation_mode:h.continuation_mode??null,paused:h.run_state==="paused",failed:h.run_state==="failed",parked:h.run_state==="parked",retry_wait:h.run_state==="retry_wait",waiting:h.run_state==="waiting",wait:h.wait||null,provider_hold:h.run_state==="provider_hold",hold:h.hold?{...h.hold,open:F===h.attempt_id}:null,retry:h.retry||null,status:h.status,status_label:h.run_state==="failed"?"\uC2E4\uD328":h.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":h.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":h.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":h.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:h.can_pause!==!1,exec_chips:h.exec_chips||null,usage:h.usage||null,chip_popover:ct(h),discard:h.discard,failure:h.failure?{...h.failure,open:M===h.attempt_id}:null,...Ao(h.id,{discard:h.discard,parked:h.run_state==="parked"},ke.has(h.id))},f,L,{monitor:{repo:h.workspace_name,root_dir:h.root_dir,serial_lane_id:h.serial_lane_id,cross_lane_chip:h.cross_lane_chip||null,last_activity:h.last_activity||null,legs:h.legs||[],dependency_chips:Ye(h)}}))}
    </div>`}function ot(f){let h={runnable:Z.runnable,queue:Z.queue,running:Z.running,pr_wait:Z.pr_wait,done:Z.done},O=D=>{let _=h[D.lane],b=D.lane==="runnable"?Z.runnable_flat?_.length>0?qt():void 0:Z.runnable_sections.length>0?qt():void 0:D.lane==="queue"?Z.queue_groups.length>0||Z.chain_lanes.length>0||Z.parallel_rows.length>0||Z.cross_lanes_unreadable?_t():void 0:D.lane==="running"?bt(f):_.length>0?c`${_.map(ee=>Ln(Ke(ee)))}`:void 0;return Kn({id:`monitor-${D.lane}`,lane:D.pane,title:D.title,items:_,count:_.length,src:D.lane==="runnable",empty:D.empty,body:b,live:D.lane==="running"&&_.length>0,collapsible:!0,collapsed:te.isCollapsed(D.pane),controls:D.lane==="runnable"?Ne():void 0,header_control:A(D.lane,_.length)})};if(re){let D=Kv.map(_=>If.find(b=>b.lane===_)).filter(_=>_!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${Oi({live:Z.running.length>0,running_body:Z.running.length>0?bt(f):"",pr_wait_rows:Z.pr_wait.map(_=>Ln(Ke(_))),count:Z.running.length+Z.pr_wait.length})}
            ${D.map(_=>O(_))}
          </div>
        </div>
        ${xo(H?.draft||null,H?Fe(H.root_dir):{})}`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${If.map(D=>O(D))}
        </div>
      </div>
      ${xo(H?.draft||null,H?Fe(H.root_dir):{})}`}function Ne(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒
        blocked${Z.runnable_hidden.blocked>0?` ${Z.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${rs.map(f=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${v.readiness===f.value?" is-active":""}"
              data-readiness=${f.value}
              aria-pressed=${v.readiness===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${Z.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${Z.runnable_hidden.readiness}</span
            >`:""}
      </div>
    </div>`}function A(f,h){return f==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${E}
      >
        ${ns.map(O=>c`<option
              value=${O.value}
              ?selected=${E===O.value}
            >
              ${O.label}
            </option>`)}
      </select>`:f==="running"?c`<select
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
      </select>`:f==="pr_wait"&&h>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:f==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${m}
      >
        ${Yr.map(O=>c`<option value=${O.value} ?selected=${m===O.value}>
              ${O.label}
            </option>`)}
      </select>`:""}function N(f){let h=o&&o.get?o.get():null,O=o&&o.getWorkspacesState?o.getWorkspacesState():[],D=f===void 0?o&&o.crossLanes?o.crossLanes():void 0:f,_={done_since:Ir(m,d()),running_sort:g,candidate_filter:v,candidate_sort:E};return D!==void 0&&(_.cross_lanes=D),vr(h,O,_)}function W(){let f=d();Z=N(),ne=null,be=new Map;for(let h of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])!h.non_occupying&&!be.has(h.id)&&be.set(h.id,h);pt(ot(f),_e),da(_e),ye()?.render(),Se(),mt()}function Se(){let f=new Map;for(let h of Z.queue_groups)f.set(h.root_dir,h.auto_advance);for(let h of Array.from(_e.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let O=h.closest(".mon2-item")?.getAttribute("data-root-dir")||"",D=f.get(O);typeof D=="boolean"&&h.setAttribute("title",`${h.textContent||""} \xB7 ${D?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function ye(){if(lt)return lt;let f=_e.querySelector(".mon2-deck");return f?(lt=Rf(f,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>Z.done,rangeLabel:ie,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:vt,onFocusChange:h=>{q=h,mt()}}),lt):null}function mt(){_e.classList.toggle("has-focus",q!==null);for(let f of Array.from(_e.querySelectorAll(".mon2-sec[data-root-dir]")))f.classList.toggle("is-focus",q!==null&&f.getAttribute("data-root-dir")===q);for(let f of Array.from(_e.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let h=be.get(f.getAttribute("data-bead-id")||"");f.classList.toggle("is-focus",q!==null&&!!h&&h.root_dir===q)}for(let f of Array.from(_e.querySelectorAll(".mon2-crow[data-root-dir]")))f.classList.toggle("is-focus",q!==null&&f.getAttribute("data-root-dir")===q)}function $t(f,h){let O=s?s():void 0;if(!h||!O||h===O||!a){r(f);return}a(h).then(()=>{r(f)}).catch(D=>{n("workspace switch for %s failed: %o",h,D)})}function vt(f){if(!f)return;let h=s?s():void 0,O=()=>{try{u?.gotoView("worker")}catch(D){n("gotoView(worker) failed: %o",D)}};if(!a||h&&h===f){O();return}a(f).then(O).catch(D=>{n("workspace switch for %s failed: %o",f,D),ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function xt(f){_n(f).then(h=>{ge(h?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",h?"success":"error",1400)})}function jt(f){let h=be.get(f)||null;return{item:h,root_dir:h?h.root_dir:"",revision:h?h.expected_revision:0}}async function zt(f,h,O){if(f!=="dep-add")return;let D=Z.chain_lanes.find(_=>_.rows.some(b=>b.id===h));!D||!D.rows.some(_=>_.id===O)||await Ee(_=>Vd(D.lane_id,_),"",[{type:f,a:h,b:O}])}function Ft(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function kt(f,h){if(f==="run"){await Zt(h);return}if(f==="stop"){await Bt(h);return}if(f==="create"){await Ee(O=>gl(null,O),"");return}if(f==="remove"){let O=Xd(h,pe());if(O!==null&&!p(O))return;await Ee(D=>Qd(h,D),"");return}await Ee(O=>f==="confirm"?Gd(h,O):Yd(h,O),"")}function Xt(f){let h=new Map;for(let O of f.rows){let D=Z.owner_of[O.id]||O.root_dir;typeof D!="string"||D.length===0||h.set(D,[...h.get(D)||[],O.id])}return h}async function Zt(f){let h=Z.chain_lanes.find(b=>b.lane_id===f);if(!h||Z.cross_lanes_revision===null){W();return}z();let O=new Map,D=new Map,_=Xt(h);for(let b of h.rows){if(b.fixed||typeof b.queue_index=="number")continue;let ee=Z.owner_of[b.id]||b.root_dir;if(typeof ee!="string"||ee.length===0){ge(`${b.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),W();return}let de=D.get(ee)??0;if(await me("worker-queue-place",{bead_id:b.id,lane:"parallel",index:(Z.parallel_raw_length[ee]??0)+de},ee,O,{bead_id:b.id})===null){W();return}D.set(ee,de+1)}for(let[b,ee]of _)if(await me("worker-queue-arm",{bead_ids:ee,lane_id:f},b,O,{bead_id:ee[0]})===null){ge("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),W();return}W()}async function Bt(f){let h=Z.chain_lanes.find(D=>D.lane_id===f);if(!h||Z.cross_lanes_revision===null){W();return}z();let O=new Map;for(let[D,_]of Xt(h))if(await me("worker-queue-disarm",{lane_id:f},D,O,{bead_id:_[0]})===null)break;W()}async function Rt(f,h){let{root_dir:O,revision:D}=jt(f);if(O.length===0){W();return}await me("worker-queue-disarm",{bead_ids:[f],lane_id:h},O,new Map([[O,D]]),{bead_id:f}),W()}async function Qt(f,h){let O=be.get(f);if(!O){W();return}let D={kind:"candidate",bead_id:f,root_dir:O.root_dir};if(h==="new-lane"){await Ee(_=>gl({bead_id:f,root_dir:O.root_dir},_),f);return}if(h.startsWith("lane:")){let _=h.slice(5);if(!Z.chain_lanes.find(ee=>ee.lane_id===_)){W();return}await Ee(ee=>ji(D,{kind:"chain",lane_id:_,marker_index:(ee.cross_lanes.get(_)?.entries??[]).length},ee),f);return}if(h.startsWith("serial:")){let _=h.slice(7),b=(O.place_lanes||[]).find(ee=>ee.id===_);await se(D,{kind:"repo-serial",root_dir:O.root_dir,lane_id:_,index:b?b.index:0});return}await se(D,{kind:"parallel",marker_index:Z.parallel_rows.length})}async function Ae(f,h){let O=Z.parallel_rows,D=O.findIndex(gt=>gt.id===f);if(D<0)return;let _=O[D].root_dir,b=[];O.forEach((gt,Tt)=>{gt.root_dir===_&&b.push(Tt)});let ee=b.indexOf(D),de=b[ee+h];if(typeof de!="number")return;let Be=h===-1?de:b[ee+2]??Math.min(O.length,de+1);await se({kind:"parallel",bead_id:f,root_dir:_,queue_index:O[D].queue_index??0},{kind:"parallel",marker_index:Be})}async function S(f){for(let h of Z.chain_lanes){let O=h.rows.find(D=>D.id===f);if(O){await se({kind:"chain",bead_id:f,root_dir:O.root_dir,lane_id:h.lane_id,...typeof O.queue_index=="number"?{queue_index:O.queue_index}:{}},{kind:"parallel",marker_index:Z.parallel_rows.length});return}}}function fe(f){return{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,status:f.run_state==="running"?"running":f.run_state,worktree:f.root_dir}}function Le(f,h,O,D,_={}){let b=be.get(f)||null;ro({context:{bead_id:f,kind:D,tuple:b?$n(b):""},transport:ee=>Oe("worker-attempt-resume",{attempt_id:h,..._,...ee},O,Ie.get(O)?.revision??jt(f).revision,!1)})}function yt(){H=null,W()}function Qe(){let f=H,h=f?ua(f.draft):null;!f||!h||(H=null,W(),Le(f.bead_id,h.attempt_id,f.root_dir,"session",h.payload))}function St(f,h){let{item:O,root_dir:D,revision:_}=jt(h),b=O?.attempt_id||"",ee=f.classList;if(ee.contains("worker-mini__rowops-up")||ee.contains("worker-mini__rowops-down")){Ae(h,ee.contains("worker-mini__rowops-up")?-1:1);return}if(ee.contains("worker-mini__rowops-remove")){Oe("worker-queue-remove",{bead_id:h},D,_);return}if(ee.contains("mon2-crow__detach")){S(h);return}if(ee.contains("worker-dep__open")){$t(f.getAttribute("data-dep-id")||"",f.getAttribute("data-root-dir")||"");return}if(ee.contains("mon2-arm__release")){Rt(h,f.getAttribute("data-lane-id")||"");return}if(ee.contains("mon-lane__chip")){let de=f.getAttribute("data-lane-id")||"";_e.querySelector(`.mon2-clane[data-lane-id="${de}"]`)?.scrollIntoView({block:"nearest"});return}if(ee.contains("judgement-chip")){let de=f.getAttribute("data-chip-key")||"";de&&j.toggle({bead_id:h,chip_key:de});return}if(ee.contains("rtile__failure-badge")){M=M===b?null:b,W();return}if(ee.contains("rtile__provider-hold-badge")){F=F===b?null:b,W();return}if(ee.contains("rtile__attempt-copy")){let de=f.getAttribute("data-attempt-id")||"";de&&_n(de).then(Be=>{ge(Be?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Be?"success":"error",1400)});return}if(ee.contains("worker-card__place")){R=R===h?null:h,W();return}if(ee.contains("worker-card__place-cancel")){R=null,W();return}if(ee.contains("worker-card__place-lane")){let de=f.getAttribute("data-lane")||"parallel";R=null,Qt(h,de);return}if(ee.contains("rtile__session")){if(O&&O.kind==="session"){let de=(O.session_refs||[]).find(Be=>Be&&Be.current===!0);de&&(Ce.hidden=!1,Q.open(oo(de,h,"in_progress",D)),W());return}L=b,b&&O&&(Ce.hidden=!1,Q.open({attempt_id:b,root_dir:D,meta:fe(O)})),W();return}if(ee.contains("rtile__pause")){ft("worker-attempt-pause",{attempt_id:b},D);return}if(ee.contains("rtile__resume-alternate")){let de=la(b,Fe(D));de&&(H={root_dir:D,bead_id:h,draft:de},W());return}if(ee.contains("rtile__resume")){Le(h,b,D,f.dataset.resumeKind==="settlement"?"settlement":"session");return}if(ee.contains("rtile__resolve")){ut(h,D,Ie.get(D)?.revision??jt(h).revision);return}if(ee.contains("rtile__discard-abandon")){let de={kind:f.dataset.operationKind||"",last_error:f.dataset.lastError||""};if(!p(Zo(h,de)))return;qe({bead_id:h,operation_id:f.dataset.operationId||""},D,_,de);return}if(ee.contains("rtile__discard")){let de=f.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(Xo(h,de)))return;U({bead_id:h,...b?{attempt_id:b}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},D,_);return}if(ee.contains("worker-mini__merge")){let de=Ze(D,h);de?.mismatch&&de.continuation===null?J(D,h,_,de.mismatch):Oe("worker-merge-queue-add",{bead_id:h},D,_);return}if(ee.contains("worker-mini__merge-cancel")){Oe("worker-merge-queue-remove",{bead_id:h},D,_);return}if(ee.contains("worker-mini__discard-abandon")){let de={kind:f.dataset.operationKind||"",last_error:f.dataset.lastError||""};if(!p(Zo(h,de)))return;qe({bead_id:h,operation_id:f.dataset.operationId||""},D,_,de);return}if(ee.contains("worker-mini__discard")){let de=f.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(Xo(h,de)))return;U({bead_id:h,...f.dataset.attemptId?{attempt_id:f.dataset.attemptId}:{},...f.dataset.operationId?{operation_id:f.dataset.operationId}:{}},D,_);return}if(ee.contains("worker-mini__revise-fix")){ze("worker-revise-fix",{bead_id:h},D,_);return}ee.contains("worker-mini__revise-approve")&&Oe("worker-revise-approve",{bead_id:h},D,_)}function x(f){let h=oe.consumeClickSuppression(),O=f.target;if(!O||typeof O.closest!="function")return;if(O.closest(".provider-resume-dialog__cancel")){yt();return}if(O.closest(".provider-resume-dialog__confirm")){Qe();return}if(O.closest("dialog")||O.closest(".worker-drawer-overlay")||O.closest("a"))return;let D=O.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(D){f.preventDefault();let cn=O.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||D.textContent?.trim()||"";cn&&xt(cn);return}let _=O.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(_){f.preventDefault();let Kt=_.getAttribute("data-root-dir")||be.get(O.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||_.getAttribute("title")||"";vt(Kt);return}let b=O.closest(".mon2-sec__toggle");if(b){f.preventDefault(),$(b.getAttribute("data-root-dir")||"");return}let ee=O.closest(".worker-pane__toggle[data-lane]");if(ee){f.preventDefault();let Kt=ee.getAttribute("data-lane")||"";(Kt==="candidate"||Kt==="queue"||Kt==="running"||Kt==="pr_wait"||Kt==="done")&&K(Kt);return}let de=O.closest(".worker-wait__area-toggle[data-area]");if(de){f.preventDefault(),he(de.getAttribute("data-area")||"parallel");return}if(O.closest(".mon2-newlane")){f.preventDefault(),kt("create","");return}let Be=O.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Be){f.preventDefault();let Kt=Be.getAttribute("data-lane-id")||"",cn=Be.classList;kt(cn.contains("mon2-clane__confirm")?"confirm":cn.contains("mon2-clane__reapply")?"reapply":cn.contains("mon2-clane__run")?"run":cn.contains("mon2-clane__stop")?"stop":"remove",Kt);return}if(O.closest(".mon-merge-all")){f.preventDefault(),He();return}let gt=O.closest(".mon-filter__readiness");if(gt){f.preventDefault(),v={...v,readiness:gt.getAttribute("data-readiness")||"all"},Of(v),W();return}let Tt=O.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Tt)return;let Ht=Tt.getAttribute("data-bead-id")||"",Gn=O.closest("button");if(Gn){f.preventDefault(),St(Gn,Ht);return}O.closest(".rtile__failure-pop, .chip-popover")||Ht&&!h&&(f.preventDefault(),$t(Ht,Tt.getAttribute("data-root-dir")||jt(Ht).root_dir))}function I(f){let h=f.target;if(!h||typeof h.closest!="function")return;if(H){let ee=ca(H.draft,h,Fe(H.root_dir));if(ee){ee!==H.draft&&(H={...H,draft:ee},W());return}}let O=h.closest(".mon-filter__blocked");if(O){v={...v,show_blocked:O.checked},Of(v),W();return}let D=h.closest(".mon-candidate-sort");if(D){E=ns.some(ee=>ee.value===D.value)?D.value:"repo_spec",Nv(E),W();return}let _=h.closest(".mon-running-sort");if(_){g=_.value==="repo"?"repo":"started",zv(g),W();return}let b=h.closest(".mon-done-range");b&&(m=Un(b.value),Uv(m),W())}function Te(f){let h=f.target,O=h&&typeof h.closest=="function"?_=>h.closest(_):()=>null,D=!1;M&&!O(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,D=!0),F&&!O(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(F=null,D=!0),D&&W()}function Ge(f){f.key==="Escape"&&(M===null&&F===null&&H===null||(M=null,F=null,H=null,W()))}e.addEventListener("click",x),e.addEventListener("change",I),document.addEventListener("click",Te),document.addEventListener("keydown",Ge),j.attach(),oe.attach(e);{let f=!0;X=oa(h=>{if(re=h,f){f=!1;return}W()})}o&&typeof o.subscribe=="function"&&(Re=o.subscribe(()=>{try{Ie.clear(),W()}catch{}}));function De(){at!==null&&(clearInterval(at),at=null)}return{recorrectSharedLane:zt,load(){n("load"),W(),at===null&&(at=setInterval(()=>{try{W()}catch{}},Hv))},pause(){De()},clear(){De(),oe.detach(),Re&&(Re(),Re=null),X&&(X(),X=null),Q.destroy(),Ce.hidden=!0,lt?.destroy(),lt=null,e.removeEventListener("click",x),e.removeEventListener("change",I),document.removeEventListener("click",Te),document.removeEventListener("keydown",Ge),j.detach(),e.replaceChildren()}}}function Bf(e,t,n){let r=Wt("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(m){return g=>{g.preventDefault();let v=m==="monitor"&&a()==="monitor"?"worker":m;r("click tab %s",v),n.gotoView(v)}}function a(){let m=t.getState();return m.view==="worker"||m.view==="monitor"?m.view:"board"}function u(){let m=a();return c`
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
    `}function p(){o&&pt(u(),o),i&&pt(d(),i)}return p(),s=t.subscribe(()=>p()),{destroy(){s&&(s(),s=null),o&&pt(c``,o),i&&pt(c``,i)}}}var Uf=["bug","feature","task","epic","chore"];function Wf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var zf=["Critical","High","Medium","Low","Backlog"];function Hf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),m=n.querySelector(".new-issue__close");function g(){i.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",i.appendChild(R);for(let M of Uf){let F=document.createElement("option");F.value=M,F.textContent=Wf(M),i.appendChild(F)}s.replaceChildren();for(let M=0;M<=4;M+=1){let F=document.createElement("option");F.value=String(M);let H=zf[M]||"Medium";F.textContent=`${M} \u2013 ${H}`,s.appendChild(F)}}g();function v(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function E(R){o.disabled=R,i.disabled=R,s.disabled=R,l.disabled=R,a.disabled=R,d.disabled=R,p.disabled=R,p.textContent=R?"Creating\u2026":"Create"}function T(){u.textContent=""}function te(R){u.textContent=R}function re(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?i.value=R:i.value="";let M=window.localStorage.getItem("beads-ui.new.priority");M&&/^\d$/.test(M)?s.value=M:s.value="2"}catch{i.value="",s.value="2"}}function X(){let R=i.value||"",M=s.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),M.length>0&&window.localStorage.setItem("beads-ui.new.priority",M)}async function L(){T();let R=String(o.value||"").trim();if(R.length===0){te("Title is required"),o.focus();return}let M=Number(s.value||"2");if(!(M>=0&&M<=4)){te("Priority must be 0..4"),s.focus();return}let F=String(i.value||""),H=String(a.value||""),j={title:R};F.length>0&&(j.type=F),String(M).length>0&&(j.priority=M),H.length>0&&(j.description=H),E(!0);try{await t("create-issue",j)}catch{E(!1),te("Failed to create issue");return}X(),E(!1),v()}return n.addEventListener("cancel",R=>{R.preventDefault(),v()}),m.addEventListener("click",()=>v()),d.addEventListener("click",()=>v()),n.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),L())}),r.addEventListener("submit",R=>{R.preventDefault(),L()}),{open(){r.reset(),T(),re();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){v()}}}var Yv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Vv(e,t){return La(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Kf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Vv(r,e);return c`<button
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
  `}function Gf(e,t,n){return c`
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
  `}function Yf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Yv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Qv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Vf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(ne=>ge(ne,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let ne=s.querySelector('[data-pane="execution"]');return ne?(d=ma(ne,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:ve=>t.queueStore?.set?.(ve)}),d):null}function m(){return c`
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
    `}function g(){let ne=r.get();return c`
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
        ${ne?c`
              ${Kf(ne,o(),te)}
              ${Gf(ne,u,{onDraft:ve=>{u=ve},onAdd:re,onRemove:X})}
              ${Yf(ne,L)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function v(ne){let ve=r.get();if(ve)try{let Pe=await n("display-policy-set",{expected_revision:ve.revision,policy:ne(ve)});E(Pe),Pe&&Pe.conflict&&Pe.policy&&(Pe=await n("display-policy-set",{expected_revision:Pe.policy.revision,policy:ne(Pe.policy)}),E(Pe)),Pe&&Pe.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function E(ne){ne&&ne.policy&&typeof ne.policy=="object"&&r.set(ne.policy)}function T(ne){v(ne)}function te(ne){let ve=r.get();if(!ve)return;let Pe=!Xv(ne,ve);T(z=>Zv(ne,z,Pe))}function re(){let ne=u.trim();ne.length!==0&&(u="",T(ve=>ve.hidden_prefixes.includes(ne)?{hidden_prefixes:ve.hidden_prefixes}:{hidden_prefixes:[...ve.hidden_prefixes,ne]}),R())}function X(ne){T(ve=>({hidden_prefixes:ve.hidden_prefixes.filter(Pe=>Pe!==ne)}))}function L(ne){let ve=r.get();if(!ve)return;let Pe=ve.chips[ne]===!1;T(()=>({chips:{[ne]:Pe}}))}function R(){pt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Qv.map(ne=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ne.id}
                  aria-selected=${String(l===ne.id)}
                  aria-controls=${`settings-pane-${ne.id}`}
                  @click=${()=>M(ne.id)}
                >
                  <span class="settings-dialog__glyph">${ne.glyph}</span>
                  ${ne.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${B}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${m()} ${g()}
          </div>
        </div>
      `,s),p()}function M(ne){l=ne,R()}let F=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",F),s.addEventListener("cancel",F);let H=ne=>{ne.target===s&&B()};s.addEventListener("click",H);let j=null;r.subscribe&&(j=r.subscribe(()=>{a&&R()}));let q=null;t.implPresetStore?.subscribe&&(q=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function V(ne="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ne,u="",R(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),p()?.load())}function B(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:V,close:B,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",F),s.removeEventListener("cancel",F),s.removeEventListener("click",H),j&&(j(),j=null),q&&(q(),q=null),d?.destroy(),d=null,s.remove()}}}function Xv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Zv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Jv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Qf="usage-meter-card",ek="usage-meter-layer",Jl=600,tk=["token_expired","relogin_required"];function Xf(e){return String(e).padStart(2,"0")}function nk(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function Zf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${Xf(r.getHours())}:${Xf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${Jv[r.getMonth()]} ${r.getDate()} ${i}`;return`${nk(n,t)} \xB7 ${l}`}function rk(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Jf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function e_(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var t_=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function r_(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function ok(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:r_(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function sk(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=ok(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?r_(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function ik(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=sk(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function o_(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function ak(e,t){return!e.held||o_(e,t)<=Jl?e:{...e,available:!1,windows:[],accounts:[]}}function n_(e,t){return`${e}:${t}`}function s_(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){pt(c``,e),e.hidden=!0,p()}function d(){if(a===null){let z=e.ownerDocument;a=z.createElement("div"),a.id=ek,a.className="usage-meter__layer",z.body.appendChild(a)}return a}function p(){a!==null&&(pt(c``,a),a.remove(),a=null)}function m(z){n!==z&&(n===null&&(document.addEventListener("mousedown",v),document.addEventListener("keydown",T),window.addEventListener("resize",E)),n=z)}function g(){n!==null&&(n=null,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",T),window.removeEventListener("resize",E))}function v(z){let ie=z.target;ie&&(e.contains(ie)||a!==null&&a.contains(ie))||(g(),B())}function E(){B()}function T(z){z.key==="Escape"&&(g(),B())}function te(z){n===z?g():m(z),B()}function re(){g(),B()}async function X(z,ie){if(r.has(z.key))return;let _e=n_(z.key,ie);r.set(z.key,ie),s.delete(_e),B();let Ce=null;try{Ce=await(await fetch(z.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ie})})).json()}catch{Ce=null}if(t)return;if(r.delete(z.key),!Ce||Ce.ok!==!0){let ae=Ce&&typeof Ce.error=="string"&&Ce.error.length>0?Ce.error:"network_error";s.set(_e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ae}`}),B();return}let Y=Array.isArray(Ce.warnings)?Ce.warnings.filter(ae=>typeof ae=="string"&&ae.length>0):[];Y.length>0&&s.set(_e,{kind:"warn",text:Y.join(" \xB7 ")}),B(),await Pe()}function L(z,ie,_e,Ce){let Y=e_(z.pct),Z=`resets ${Zf(z.resetsAt,Ce)}${ie?` \xB7 ${_e}`:""}`;return c`<span
      class="usage-meter__window ${Jf(Y)}"
      style=${`--progress: ${Y}%`}
      title=${Z}
    >
      <span class="usage-meter__label">${z.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${Y}%</span>
    </span>`}function R(z,ie,_e){let Ce=o_(ie,_e),Y=ie.available&&(ie.held||Ce>Jl),ae=Y?`${Math.floor(Ce/60)}\uBD84 \uC804 \uCE21\uC815`:"",Z=ie.accounts.filter(Re=>!Re.active).length,be=`usage-meter__group${Y?" usage-meter__group--stale":""}`,Ie=c`<span class="usage-meter__provider"
        >${z.label}</span
      >
      ${ie.available?ie.windows.map(Re=>L(Re,Y,ae,_e)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Z>0?c`<span class="usage-meter__badge">+${Z}</span>`:""}`;if(ie.accounts.length===0)return c`<span
        class=${be}
        aria-label=${`${z.label} usage`}
        >${Ie}</span
      >`;let ke=n===z.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${be}`}
      aria-label=${`${z.label} usage`}
      aria-expanded=${ke?"true":"false"}
      aria-controls=${Qf}
      @click=${()=>te(z.key)}
    >
      ${Ie}
    </button>`}function M(z,ie){return c`<span class="usage-meter" aria-label="Usage">
      ${z.map(_e=>R(_e.provider,_e.snapshot,ie))}
    </span>`}function F(z,ie){let _e=e_(z.pct),Ce=Zf(z.resetsAt,ie);return c`<span
      class="usage-meter__account-window ${Jf(_e)}"
      style=${`--progress: ${_e}%`}
    >
      <span class="usage-meter__account-key">${z.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${_e}%</span>
      <span class="usage-meter__account-reset"
        >${Ce.length>0?`\u21BB ${Ce}`:""}</span
      >
    </span>`}function H(z,ie){return tk.includes(ie)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${z.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function j(z,ie,_e){let Ce=ie.status==="ok",Y=typeof ie.ageSeconds=="number"&&ie.ageSeconds>Jl,ae=s.get(n_(z.key,ie.number)),Z=r.get(z.key),be=Z!==void 0,Ie=Z===ie.number,ke=["usage-meter__account"];return ie.active&&ke.push("usage-meter__account--active"),Ce||ke.push("usage-meter__account--unavailable"),Y&&ke.push("usage-meter__account--stale"),c`<div class=${ke.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ie.email}
          >${ie.alias===null?ie.email:ie.alias}</span
        >
        ${ie.plan===null?"":c`<span class="usage-meter__account-tag">${ie.plan}</span>`}
        ${ie.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ie.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${rk(ie.ageSeconds)}</span
            >`}
        ${ie.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${be}
              @click=${()=>{X(z,ie.number)}}
            >
              ${Ie?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ce?c`<div class="usage-meter__account-windows">
            ${ie.windows.map(Re=>F(Re,_e))}
          </div>`:c`<div class="usage-meter__account-status">
            ${H(z,ie.status)}
          </div>`}
      ${ae===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ae.kind}"
          >
            ${ae.text}
          </div>`}
    </div>`}function q(z,ie,_e){let Ce=ie.accounts.filter(Y=>Y.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${z.label} · 활성 ${Ce} / 전체
        ${ie.accounts.length}
      </h2>
      ${ie.accounts.map(Y=>j(z,Y,_e))}
    </section>`}function V(z,ie){return c`<div
      class="usage-meter__card"
      id=${Qf}
      role="dialog"
      aria-label=${`${z.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${q(z.provider,z.snapshot,ie)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function B(){let z=Date.now(),ie=[];for(let Ce of t_){let Y=i.get(Ce.key);Y&&ie.push({provider:Ce,snapshot:ak(Y,z)})}if(ie.length===0){g(),u();return}let _e=ie.find(Ce=>Ce.provider.key===n&&Ce.snapshot.accounts.length>0);_e||g(),pt(M(ie,z),e),e.hidden=!1,_e?ne(_e,z):p()}function ne(z,ie){let _e=d(),Ce=e.getBoundingClientRect(),Y=e.ownerDocument.documentElement.clientWidth;_e.style.setProperty("--usage-meter-anchor-top",`${Ce.bottom}px`),_e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,Y-Ce.right)}px`),pt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${re}
        ></div>
        ${V(z,ie)}`,_e)}async function ve(z){try{let ie=await fetch(z.endpoint);return ie.ok?ik(await ie.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Pe(){l+=1;let z=l,ie=await Promise.all(t_.map(async _e=>({provider:_e,read:await ve(_e)})));if(!(t||z!==l)){for(let _e of ie){let Ce=_e.provider.key;if(_e.read.kind==="ok"){i.set(Ce,_e.read.snapshot);continue}if(_e.read.kind==="empty"){i.delete(Ce);continue}let Y=i.get(Ce);Y!==void 0&&!Y.held&&i.set(Ce,{...Y,held:!0})}B()}}return u(),Pe(),o=setInterval(()=>{Pe()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),g(),u()}}}function xs(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var l_="bdui.worker.candidate_sort",As=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),ha=Object.freeze({preset:"spec"}),c_=3,u_=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function i_(e){return As.some(t=>t.id===e)}function a_(e){let t=As.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function lk(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Ss(e){return e&&"preset"in e?a_(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):a_("spec")}function ec(e){return e&&"preset"in e?e.preset:null}function zr(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return i_(e)?{preset:e}:ha}return zr(i)}if(!e||typeof e!="object")return ha;let t=e;if(i_(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>c_||!n.every(Ca))return ha;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=As.find(i=>lk(i.chain,r));return o?{preset:o.id}:{chain:r}}function d_(){try{return zr(window.localStorage.getItem(l_))}catch{return ha}}function tc(e){try{window.localStorage.setItem(l_,JSON.stringify(e))}catch{}}function p_(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Ws,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Ws[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,c_)}function f_(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function ck(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=xs(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function __(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Bc(Ss(t))),ck(n)}function m_(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=mi(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var g_=new Set(["sh","bash","zsh","dash","ksh"]),h_=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function b_(e){let t=e.split("/");return t[t.length-1]||""}function uk(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=b_(n[0]);if(r!=="env")return g_.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&g_.has(b_(o))}function dk(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function pk(e){let t=[],n=0;h_.lastIndex=0;for(let r of e.matchAll(h_)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:dk(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function fk(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function y_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function p(R,M){return M?pk(R).map(F=>F.kind==="plain"?F.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${F.kind}"
            >${F.text}</span
          >`):R}function m(){if(!o)return c``;let R=i==="ready"&&uk(s),M=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>X()}
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
              @click=${()=>X()}
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
                  ${M.map((F,H)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${H+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(F,R)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function g(){pt(m(),r)}async function v(){if(i!=="ready")return;let R=await _n(s);ge(R?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",R?"success":"error")}function E(R){R.key==="Escape"&&o&&(R.preventDefault(),X())}function T(){d||(document.addEventListener("keydown",E),d=!0)}function te(){d&&(document.removeEventListener("keydown",E),d=!1)}async function re(R,M=null){let F=++a;T(),o={...R},u=M||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",g(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let j=t?t():"";if(!j){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",g();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",g();return}let q="/api/repo-ops-script?workspace="+encodeURIComponent(j)+"&lane="+encodeURIComponent(R.lane)+"&base_sha="+encodeURIComponent(R.base_sha);try{let V=await n(q),B=await V.json().catch(()=>({}));if(F!==a)return;if((t?t():"")!==j){X();return}if(!V.ok||!B||B.ok!==!0){i="error",l=fk(B&&typeof B.error=="string"?B.error:""),g();return}o={lane:B.lane,base_sha:B.base_sha,path:B.path,base_ref:B.base_ref},s=String(B.content),i="ready",g()}catch{if(F!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",g()}}function X(){a+=1,te(),o=null,s="",g();let R=u;u=null,R?.isConnected&&R.focus()}function L(){X(),r.remove()}return{open:re,close:X,destroy:L}}var v_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},_k=new Set(["queued","running","retry_pending"]);function k_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let q=i();return typeof q.revision=="number"?q.revision:0}function l(q){t&&q&&q.queue&&typeof q.queue=="object"&&t.set(q.queue)}function a(){let q=i().workspace_info;return q&&typeof q=="object"?q:{}}function u(q,V){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${q}"
      >${V}</span
    >`}function d(q){if(typeof q!="number"||!Number.isFinite(q))return"";let V=q/6e4;return Number.isInteger(V)?`timeout ${V}\uBD84`:`timeout ${Math.round(q/1e3)}\uCD08`}function p(q){let V=d(q);return V?u("config",V):""}function m(q,V,B){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${B.script}
      @click=${ne=>{o&&o({lane:q,base_sha:V.base_sha,path:B.script,base_ref:V.base_ref},ne.currentTarget)}}
    ></button>`}function g(){let q=i().repo_operations;return Array.isArray(q)?q:[]}function v(){let q=a().repo_ops,V=q&&typeof q=="object"?q.repo_id:null;return typeof V=="string"&&V?V:null}function E(){return g().some(q=>q&&q.kind==="deploy"&&_k.has(q.state))}function T(){let q=E(),V=v()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${q||V}
      title=${q?"\uBC30\uD3EC \uC9C4\uD589 \uC911":V?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{M()}}
    >
      배포 실행
    </button>`}function te(){let q=i().repo_ops_opt_out;return{verify:q?.verify===!0,deploy:q?.deploy===!0}}function re(q,V){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!V}
        @change=${B=>{R(q,!B.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function X(q){let V=typeof q.base_sha=="string"?q.base_sha:"",B=`${q.source_path||"repo-ops/config.toml"} @ ${q.base_ref||"?"}${V?`@${V.slice(0,7)}`:""}`,ne=te(),ve=!!q.verify&&ne.verify,Pe=!!q.deploy&&ne.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${B}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ve?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${q.verify?c`${m("verify",q,q.verify)}
              ${p(q.verify.timeout_ms)}
              ${ve?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ve?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":q.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${q.verify?re("verify",ne.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Pe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${q.deploy?c`${m("deploy",q,q.deploy)}
              ${p(q.deploy.timeout_ms)}
              ${Pe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):T()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Pe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":q.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${q.deploy?re("deploy",ne.deploy):""}
      </div>
    </section>`}function L(q){let V=q.repo_ops&&typeof q.repo_ops=="object"?q.repo_ops:null;return V&&(V.status==="resolved"||V.status==="absent")?X(V):V&&(V.status==="pending"||V.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${V.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${V.error_code?c` — <code>${V.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function R(q,V){if(!n)return;let B=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:V,expected_revision:s()});if(l(B),B&&B.conflict){let ne=await n("worker-repo-ops-opt-out-toggle",{kind:q,opted_out:V,expected_revision:s()});l(ne)}r()}async function M(){let q=v();if(!n||q===null)return;let V=await n("worker-repo-operation-deploy-run",{repo_id:q});if(l(V),!V||V.ok!==!0){let B=V&&typeof V.reason=="string"?V.reason:"",ne=Object.hasOwn(v_,B)?v_[B]:B||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ge(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ne}`,"error")}else ge("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function H(q,V,B){return c`<div class="worker-repo-ops__policy-group" data-policy=${B}>
      <div class="worker-repo-ops__policy-label">${q}</div>
      <ul class="worker-repo-ops__policy-list">
        ${V.map(ne=>c`<li data-token=${ne}>
              ${F[ne]||ne}
            </li>`)}
      </ul>
    </div>`}function j(){let q=i(),V=q.repo_operation_policy&&typeof q.repo_operation_policy=="object"?q.repo_operation_policy:null;return V?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(V.worker_automatic||[]).length} · 금지
            ${(V.never_automatic||[]).length}</span
          >
        </summary>
        ${V.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${V.schema_version})`}
            </div>`:""}
        ${H("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",V.worker_automatic||[],"worker-automatic")}
        ${H("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",V.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${L(a())} ${j()}
      </details>`}}}var x_=20,mk=5,gk=new Set(["failed","running","queued","retry_pending"]),nc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},w_={verify:"verify",deploy:"deploy",job:"deploy"};function hk(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function bk(e){return!e||typeof e!="object"?"":e.kind==="job"?hk(e.script_path)||nc.job:Object.hasOwn(nc,e.kind)?nc[e.kind]:e.kind}function yk(e,t,n=x_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function vk(e){if(e.type==="cleanup")return!0;let t=e.operation;return gk.has(t.state)&&!t.dismissed&&!t.superseded_by}function kk(e,t,n={}){let r=yk(e,t,1/0),o=n.expanded===!0?x_:mk,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||vk(l));return{visible:s,hidden:r.length-s.length}}function $_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function wk(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function A_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Mr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function S_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function $k(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(w_,n))return;let r=e[w_[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function xk(e,t){let n=hf(e,t),r=bf(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Ak(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Sk(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${vi(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${$_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${bk(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${yi(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Nr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${$_(e)}"
          >${wk(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?S_(gf(n.failure_kind,o)):""}
      ${xk(n,$k(t,n))}
      ${Ak(n)}
      ${A_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${yi(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Ek(e){let t=e.cleanup,n=jr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${vi(e.at)||"\u2014"}</span
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
        ${Ad(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${S_($r(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${A_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Tk(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Ek(r):Sk(r,e.repo_ops))}
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
  </section>`}function E_(e,t={}){let n=null;function r(){if(n===null){pt(c``,e);return}let s=kk(n.operations,n.cleanup_failures,{expanded:n.expanded});pt(Tk({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var Ck="session-preferred",Rk=["external_roundtrip","user_feedback_loop"];function T_(e,t){if(!Go(e).includes(Ck)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Rk.includes(n)?n:""}var Ok="spec-after-blocker";function C_(e,t){return Go(e).includes(Ok)&&Array.isArray(t)&&t.length>0}var Ik=Wt("views:worker:adapter"),Lk="tab:worker:ready",Dk="tab:worker:blocked",Pk="tab:worker:in-progress",Mk="tab:worker:resolved",qk="tab:worker:closed",Nk="\u{1F512} blocked",jk={revision:0,auto_advance:!1,auto_merge:!1,slots:Mi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Fk=["claude_account","codex_account"],Bk=[...uo,...Fk];function Uk(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Wk(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${sl}: ${n}`:sl}function xr(e){return e&&typeof e=="object"?e:{}}function zk(e){let t={};for(let n of Bk){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Hk(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=xr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of xs(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function Kk(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function R_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?eo(n):null,l=new Map,a={},u=null,d=0,p=null,m=!1;function g(){m||!i||i()}function v(M){return u===M?a:{}}async function E(){if(!r||m)return;let M=o?.()||"";if(u===M||p&&p.key===M&&p.generation===d)return;let F=++d;p={key:M,generation:F};let H=null;try{H=await Promise.resolve(r("get-session-defaults",{}))}catch(j){if(F!==d)return;p=null,Ik("get-session-defaults failed: %o",j),g();return}F===d&&(a=H&&typeof H.values=="object"&&H.values!==null?{...H.values}:{},u=M,p=null,g())}function T(){u=null,d+=1,E()}function te(){for(let[M,F]of l)F==="failed"&&l.delete(M)}function re(M,F){return s?s.selectBoardColumn(M,F):[]}function X(M,F,H,j){let q=new Set(H.map(z=>z.id)),V=new Set,B=new Map,ne=[];for(let z of[...F,...H]){if(V.has(z.id)||Uk(z))continue;let ie=Yo(z,M);ie.location===null&&(V.add(z.id),B.set(z.id,ie),ne.push(z))}let ve=__(ne,zr(j)),Pe=xr(M.bead_scope);return ve.map(z=>{let ie=B.get(z.id),_e=Zr(z),Ce=_e.evidence==="published",Y=typeof z.workflow?.route=="string"&&z.workflow.route||(z.metadata&&typeof z.metadata.route=="string"?z.metadata.route:""),ae=ie.worker_ineligible,Z=ae||!Object.hasOwn(z,"labels")?"":T_(z.labels,z.metadata),be=q.has(z.id),Ie=be?xs(z):[],ke=[];be&&Ie.length===0&&ke.push(Nk),ie.awaiting_user&&ke.push(Wk(z.metadata)),ie.missing_description?ke.push("missing_description"):ie.spec==="conflict"?ke.push("spec_id_conflict"):ie.spec==="none"?ke.push("spec \uC5C6\uC74C"):ie.spec==="draft"&&ke.push("spec \uBBF8\uBC1C\uD589(draft)");let Re=Pe[z.id];return{bead_id:z.id,title:z.title||z.id,route:Y,spec_id:_e.conflict?"":_e.path,published:Ce,blocked:be,blocked_by:Ie,labels:Array.isArray(z.labels)?z.labels:[],created_at:z.created_at,updated_at:z.updated_at,status:z.status,workflow:z.workflow||null,exec_pins:zk(xr(z.metadata)),rec:null,...Re&&Array.isArray(Re.scope)?{scope:Re.scope}:{},eligible:ie.placeable,route_ok:ie.route_ok,awaiting_user:ie.awaiting_user,missing_description:ie.missing_description,placement_spec:ie.spec,reason:ke.join(" \xB7 "),worker_ineligible:ae,session_preferred:Z.length>0,session_preferred_reason:Z,spec_after_blocker:C_(z.labels,Ie),release_info:z.release_info,dependents_info:z.dependents_info}})}function L(M){let[F,H,j,q,V]=M,B=Ks([...F,...H,...j,...q,...V]),ne=Hk([...F,...H,...j,...q]),ve={},Pe=(z,ie)=>{if(!z||typeof z.id!="string"||z.id.length===0)return;let _e=ve[z.id]||(ve[z.id]={});if(typeof z.priority=="number"&&!("priority"in _e)&&(_e.priority=z.priority),typeof z.from_id=="string"&&!("from_id"in _e)&&(_e.from_id=z.from_id),ie&&!("metadata"in _e)){_e.metadata=xr(z.metadata);let Ce=xr(z.workflow).route;typeof Ce=="string"&&Ce.length>0&&(_e.route=Ce)}};for(let z of[...F,...H,...j])Pe(z,!0);for(let z of[...q,...V])Pe(z,!1);for(let z of new Set([...Object.keys(ve),...B.keys()])){let ie=Gs(B,z);if(ie.total>0){let _e=ve[z]||(ve[z]={});_e.rollup=ie}}for(let[z,ie]of ne){let _e=ve[z]||(ve[z]={});_e.carried_to=ie}return ve}function R(M,F,H,j){let q=new Set((Array.isArray(M.done)?M.done:[]).map(B=>B?.bead_id).filter(B=>typeof B=="string")),V=[];for(let B of F){let ne=dr(B.closed_at);if(typeof B.id!="string"||q.has(B.id)||ne===null||j!==void 0&&ne<j||typeof B.comment_count!="number"||B.comment_count<=0)continue;let ve=`${H}\0${B.id}\0${String(B.updated_at)}\0${B.comment_count}`,Pe=l.get(ve);if(Pe===void 0&&r&&(l.set(ve,"pending"),Promise.resolve(r("get-comments",{id:B.id})).then(ie=>{let _e=Array.isArray(ie)&&ie.some(Ce=>Zi(typeof Ce?.text=="string"?Ce.text:"")?.lane==="session");l.set(ve,_e?"session":"not-session"),g()}).catch(()=>{l.set(ve,"failed"),g()})),Pe!=="session")continue;let z=dr(B.started_at);V.push({id:B.id,title:B.title||B.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:z!==null&&ne>=z?ne-z:null,work_kind:"session",done_at:ne,created_at:B.created_at,updated_at:B.updated_at})}return V}return{read(M){if(!t)return{workspaces:[],workspaces_state:[]};let F=t.get()||jk,H=o?.()||"",j=M&&typeof M.done_since=="number"?M.done_since:void 0,q=re(Lk,"ready"),V=re(Dk,"blocked"),B=re(Pk,"in_progress"),ne=re(Mk,"resolved"),ve=re(qk,"closed");return{workspaces:[{...F,bead_titles:{...xr(F.bead_titles),...Object.fromEntries([...q,...V].filter(Pe=>Pe&&typeof Pe.id=="string").map(Pe=>[Pe.id,Pe.title||Pe.id]))},root_dir:H,name:Kk(H),runnable:X(F,q,V,M?M.candidate_sort:void 0),session_done:R(F,ve,H,j),bead_overlay:L([q,V,B,ne,ve])}],workspaces_state:[{root_dir:H,revision:F.revision,auto_advance:F.auto_advance,auto_merge:F.auto_merge,slots:typeof xr(F.workspace_info).slots=="number"?xr(F.workspace_info).slots:F.slots,runner_catalog:F.runner_catalog,execution_defaults:F.execution_defaults,session_defaults:v(H),orchestration_model:F.orchestration_model,orchestration_effort:F.orchestration_effort,orchestration_speed:F.orchestration_speed,quick_fix_orchestration_model:F.quick_fix_orchestration_model,quick_fix_orchestration_effort:F.quick_fix_orchestration_effort,quick_fix_orchestration_speed:F.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){E()},refreshSessionDefaults:T,notifyIssuesChanged:te,destroy(){m=!0,d+=1,p=null,l.clear()}}}var ba=1,O_=5,Gk={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:ba,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function ln(e){return e&&typeof e=="object"?e:{}}var D_="beads-ui.worker.candidate-filter",rc={show_blocked:!1,readiness:"all"};function Yk(){try{let e=window.localStorage.getItem(D_);if(!e)return{...rc};let t=JSON.parse(e);if(!t||typeof t!="object")return{...rc};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all"}}catch{return{...rc}}}function Vk(e){try{window.localStorage.setItem(D_,JSON.stringify(e))}catch{}}var P_="bdui.worker.done-range";function Qk(){try{let e=window.localStorage.getItem(P_);return e===null?"today":Un(e)}catch{return"today"}}function Xk(e){try{window.localStorage.setItem(P_,e)}catch{}}function I_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Zk(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function L_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Jk(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function ew(e){return!e||typeof e!="object"?"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4":e.conflict===!0?"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694":e.session==="already_running"?`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`:e.launched!==!0?`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`:e.mode==="fork"?null:`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function tw(e){return e&&e.launched===!0?"success":"error"}function nw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function rw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var ow=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),sw=new Set(["waiting_metadata","reviewing","retrying"]),oc=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function iw(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?nn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function aw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function lw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=aw(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?Wr(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!ow.has(e.phase)}}function cw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function uw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function dw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=cw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(oc.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Zk(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${L_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${L_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function pw(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,p=null,m=null,g={},v=!1,E={},T=null,te={active:!1,failure:null,origin:null},re=!1){let X=!!a&&a.position>0,L=!!a?.continuation_action&&a.continuation_action.continuation===null,R=!!a&&a.active===!0,M=a&&a.failure||null,F=nw(a?a.waiting:null),H=n[e]||null,j=H&&H.gate?H.gate:null,q=H&&H.pr?H.pr:null,V=rw(a?a.resolution:null),B=iw(m),ne=lw(m,B),ve=a&&a.authority||null,Pe=a&&a.review_dispatch||null,z=a?.hold?.auto_review_wait==="slot"?"slot":null,ie=!!m&&typeof m=="object"&&sw.has(m.phase),_e=X&&!R&&(!ve||ie||ve.source==="automatic"&&!v),Ce=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":V?V.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":F,Y=!!j&&j.base_badge==="\uCDA9\uB3CC",ae=!!j&&j.enabled===!0,Z=ts({bead_id:e,merge_sha:E.merge_sha,cleanup_cursor:E.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:E.repo_operations}),be=Di(Z),Ie=i&&!Z&&(i.queueing??null)?i.queueing:null,ke=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!j&&j.tier==="merged",Re=r&&r.step==="repo_operations"&&Z?.failed===!0&&(Z.step==="deploy"||Z.step==="verify")?Z.step:null,at=l&&!!r&&!!j&&j.tier==="merged",lt=_e&&(ae||Y||j?.reason==="base_behind"||oc.has(j?.reason)||ke||at),Q=oc.has(j?.reason),oe=l&&Y&&u===!1,se=or(g,e,{external:l,merge_active:R||Z?.step==="merge",merge_queued:X,conflict_active:!!s,cleanup_active:be,merged:!!r||j?.tier==="merged"}),pe=!!se.operation,Ee=!!r||m?.phase==="needs_human"||!!se.error,me=X&&!M&&!L&&!ke&&!(ne&&ne.lock_actions),Oe=dw({auto_pending:me,continuation_required:L,queueing:Ie,merge_step:Z,conflict_badge:Ce,conflict_live:V?.live===!0||s==="running",auto_resolution:B,recovery:ne,cleanup_failed:r,cleanup_label:r?jr(r.step):null,base_exception:p,conflicting:Y,gate:j,receipt_check:H&&H.receipt_check?H.receipt_check:null,queue_failure:M,auto_skip:d,queued:X,queue_active:R,queue_position:a?a.position:0,review_session:te,review_dispatch:Pe,auto_review_wait:z,activity:Ce?null:i&&i.activity||null}),Fe=Oe?.live===!0&&Oe.title?c`<span title=${Oe.title}>${Oe.label}</span>`:Oe?.label||null,Ze=uw(H&&H.receipt_check?H.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&Z?.active!==!0?Li(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...T?{dependency_chips:T}:{},external:l,pr_number:q&&typeof q.number=="number"?q.number:null,pr_url:q&&typeof q.url=="string"?q.url:"",completion_badge:Oe?.live!==!0&&Oe?.title?Oe.label:null,completion_title:Oe?.title||"",...m?.phase==="needs_human"&&typeof m.log_path=="string"&&m.log_path.length>0?{log_path:m.log_path}:{},...Ze.length>0?{receipt_badge:{codes:Ze}}:{},badges:Fe?[Fe]:[],live_badge:Oe?.live===!0?Fe:null,usage:o,alert:Oe?.alert===!0,merge_action:j?.tier==="merged"&&!ke&&!at?!1:!X||L||_e||Q,cancel_action:X&&!L,cancel_enabled:!R&&!(ne&&ne.lock_actions),cancel_title:ne&&ne.lock_actions?`${ne.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:R?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:se,discard_action:se.action,resolve_action:Ee,resolve_enabled:!re,resolve_title:re?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:Z,discard_enabled:se.enabled,discard_title:se.title,merge_enabled:!Z&&!Ie&&!s&&!pe&&!p&&!(ne&&ne.lock_actions)&&!oe&&te.active!==!0&&(ae||Y||j?.reason==="base_behind"||Q||ke||at||lt||ie&&!R),merge_label:L?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ke||at?Re==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Re==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":Y&&!Z&&!ke?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":j?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":Q?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":_e?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:pe?se.error?`\uD3D0\uAE30 \uC2E4\uD328: ${se.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${se.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:L?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ie?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":Z?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Z.label}`:Re?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Re==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:at?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":oe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Y?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":j?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":te.active===!0?te.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":j?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":j?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":j?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":j?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":j?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ae?`\uBA38\uC9C0 (${j.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:j&&j.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${j&&j.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function sc(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,m=r?eo(r):null,g=Yk(),v=null,E=null,T=null,te=null,re=ao(()=>f()),X=new Map,L=new Map,R=d_(),M=ec(R)===null,F=d?Un(d):Qk();function H(){let w=Yr.find(y=>y.value===F);return w?w.label:"\uC624\uB298"}let j=sa("beads-ui.worker.lane-collapsed"),q=!1,V="";function B(){return V.trim().length>0}function ne(w){return B()?w.filter(y=>y.search_match===!0).length:void 0}let ve=new Set,Pe=new Set,z=new Set,ie=new Set,_e=new Set,Ce=new Set,Y=null,ae=[],Z=R_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>f()});function be(){Z.refreshSessionDefaults()}let Ie=document.createElement("div");Ie.className="worker-console";let ke=document.createElement("div");ke.className="worker-top";let Re=document.createElement("div");Re.className="worker-drawer-overlay",Re.hidden=!0;let at=document.createElement("div");at.className="worker-drawer-overlay__backdrop";let lt=document.createElement("div");lt.className="worker-drawer-host";let Q=document.createElement("div");Q.className="worker-drawer-host",Q.hidden=!0,Re.append(at,lt,Q);let oe=document.createElement("div");oe.className="worker-lanes-host",Ie.append(ke,Re,oe),e.appendChild(Ie);let se=vr(null,null),pe=[],Ee=aa({transport:n,console_el:Ie,getLanes:()=>se,getWorkspaces:()=>pe,getCrossLanes:()=>null,reproject:()=>({lanes:A(),raw_lanes:null}),onCorrection:()=>{},showToast:ge,requestRender:()=>f(),adoptQueue:(w,y)=>{o&&o.set(y)},onDragBegin:()=>{v=null}}),me=null,Oe=wo(lt,{transport:n,sessionLogStore:i,onClose:()=>{me=null,Re.hidden=!0,f()}}),Fe=E_(Q,{onClose:()=>{Q.hidden=!0,Re.hidden=!0,f()}}),Ze=y_({getWorkspacePath:l||(()=>"")}),ze=l&&l()||"",J=k_({queueStore:o,transport:n,onChanged:()=>f(),onOpenScript:(w,y)=>{Ze.open(w,y)}});function U(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ba,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function qe(w){let y=la(w,U());y&&(te=y,f())}function ft(){te=null,f()}function ut(){let w=ua(te);w&&(te=null,f(),ct(w.attempt_id,"session",w.payload))}function He(w){if(!v||!w.some(C=>C.id===v))return null;let y=Vo(U());return y?{bead_id:v,lanes:y}:null}function et(){return l&&l()||""}async function $(w,y){await Ee.sendOp({type:"worker-queue-place",payload:{bead_id:w,...y==="parallel"?{}:{lane:y}},root_dir:et()},w)}function K(){let w=U();return typeof w.revision=="number"?w.revision:0}function he(w){w&&w.queue&&o&&o.set(w.queue)}async function Ye(w){if(!n||!w)return;let y=await n("worker-attempt-pause",{attempt_id:w});y&&y.paused===!1&&y.reason&&ge(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function ct(w,y="session",C={}){if(!n||!w)return;let le=n,$e=U().attempts?.[w]||null;await ro({context:{bead_id:$e?.bead_id||"",kind:y,tuple:$e?$n($e):""},transport:je=>le("worker-attempt-resume",{attempt_id:w,expected_revision:K(),...C,...je}),adopt:he})}async function Ke(w,y,C=!0){if(!n)return null;let le=n,$e=await le(w,{...y,expected_revision:K()});return he($e),$e&&$e.conflict&&C&&($e=await le(w,{...y,expected_revision:K()}),he($e)),$e}async function Et(w){if(!n||!w)return;let y=U().merge_queue?.find(le=>le.bead_id===w)?.continuation_action;if(y?.mismatch&&y.continuation===null){await qt(w,y.mismatch);return}ve.add(w),f();let C;try{C=await Ke("worker-merge-queue-add",{bead_id:w})}catch{ge("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ve.delete(w),f()}if(!(!C||C.applied)){if(C.conflict){ge("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ge(Jk(C.reason),"error",2400)}}async function Dt(w){if(!(!n||!w||Pe.has(w))){Pe.add(w),f();try{let y=await n("worker-cleanup-retry",{bead_id:w,expected_revision:K()});he(y),y&&!y.retried&&!y.conflict&&y.reason&&ge(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{Pe.delete(w),f()}}}async function st(w){if(!(!n||!w||z.has(w))){z.add(w),f();try{let y=await n("worker-resolve-in-session",{bead_id:w,expected_revision:K()});he(y);let C=ew(y);C!==null&&ge(C,tw(y),4e3)}finally{z.delete(w),f()}}}async function wt(w,y){let C=U().hold;if(!n||!C||typeof C.since!="number")return;let le=await n(w,{since:C.since});he(le),le&&le.ok===!1&&ge(`${y}: ${le.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":le.reason||""}`,"error",2800)}async function qt(w,y){let C=await mr({continuation_mismatch:y},($e,je)=>Ke("worker-merge-queue-add",{bead_id:w,continuation:$e,decision_token:je},!1)),le=C?.queue?.merge_queue?.find($e=>$e.bead_id===w)?.continuation_action;if(C?.applied!==!0&&le?.continuation===null&&le.mismatch){await qt(w,le.mismatch);return}C&&C.applied===!1&&!C.conflict&&ge("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Lt(w){if(!n)return;let y=await Ke("worker-merge-auto-toggle",{on:w});!y||y.conflict||ge(w?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",w?"success":"info",2400)}async function Ut(w){if(!n||!w)return;let y=await Ke("worker-merge-queue-remove",{bead_id:w});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ge("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ue(){await Ke("worker-merge-queue-remove",{all:!0})}async function we(w,y=null,C="unmerged",le=null){if(!n||!w)return;let $e=Xo(w,C);if(!(!!le||typeof globalThis.confirm!="function"||globalThis.confirm($e)))return;let Xe=await n("worker-discard",{bead_id:w,...y?{attempt_id:y}:{},...le?{operation_id:le}:{},expected_revision:K()});if(he(Xe),Xe&&Xe.conflict&&(Xe=await n("worker-discard",{bead_id:w,...y?{attempt_id:y}:{},...le?{operation_id:le}:{},expected_revision:K()}),he(Xe)),Xe&&Xe.discarded===!0){ge(wi(Xe),"success",5e3);return}if(Xe&&Xe.reason){ge(`\uD3D0\uAE30 \uC2E4\uD328: ${Xe.reason}`,"error",2800);return}if(Xe&&Xe.accepted&&Xe.pending==="merged_revert"){ge("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Xe&&Xe.accepted&&!Xe.discarded){ge(`\uD3D0\uAE30 \uC9C4\uD589: ${Xe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Xe&&!Xe.conflict&&ge("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Ue(w,y,C){if(!n||!w||!y||typeof globalThis.confirm=="function"&&!globalThis.confirm(Zo(w,C)))return;let le=await n("worker-discard-abandon",{bead_id:w,operation_id:y,expected_revision:K()});if(he(le),le&&le.conflict&&(le=await n("worker-discard-abandon",{bead_id:w,operation_id:y,expected_revision:K()}),he(le)),le&&le.abandoned===!0){ge(ki(C),"success",5e3);return}if(le&&le.reason){ge(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${le.reason}`,"error",2800);return}le&&!le.conflict&&ge("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function rt(w,y,C){if(!(!n||!y||!C||_e.has(y))){_e.add(y),f();try{let le=await n(w,{bead_id:y,action_id:C,expected_revision:K()});he(le),le?.conflict?ge("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!le?.ok&&le?.reason&&ge(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(le.reason)}`,"error",2800)}finally{_e.delete(y),f()}}}async function tt(w,y){if(!n||!y||ie.has(y))return;ie.add(y),f();let C;try{let le=async($e={})=>await n(w,{bead_id:y,expected_revision:K(),...$e});C=await le(),he(C),C&&C.conflict&&(C=await n(w,{bead_id:y,expected_revision:K()}),he(C)),w==="worker-revise-fix"&&(C=await mr(C,($e,je)=>le({continuation:$e,decision_token:je}),{onResult:he,refresh:()=>le()}))}finally{ie.delete(y),f()}if(!(!C||C.conflict)){if(C.ok){ge(w==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ge(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function _t(w){if(!n)return;let y=await n("worker-automation-toggle",{on:w,expected_revision:K()});he(y),y&&y.conflict&&await n("worker-automation-toggle",{on:w,expected_revision:K()}).then(he)}async function bt(w){if(!n||!w)return;let y=await n("worker-repo-operation-dismiss",{operation_id:w});he(y),y&&y.ok===!1&&ge(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function ot(w){if(!n||!Number.isFinite(w))return;let y=Math.max(ba,Math.floor(w)),C=await n("worker-queue-set-slots",{slots:y,expected_revision:K()});he(C),C&&C.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:K()}).then(he)}async function Ne(w){if(!n||!Number.isInteger(w)||w<1||w>O_)return;let y=U(),C=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(w).reduce((je,Xe)=>je+(Array.isArray(Xe?.entries)?Xe.entries.length:0),0),le=()=>({count:w,expected_revision:K()}),$e=await n("worker-queue-set-serial-lane-count",le());he($e),$e&&$e.conflict&&($e=await n("worker-queue-set-serial-lane-count",le()),he($e)),$e&&$e.applied&&C>0&&ge(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${C}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function A(){let w=Ir(F),y=Z.read({candidate_sort:R,done_since:w});return pe=y.workspaces,se=vr(y.workspaces,y.workspaces_state,{done_since:w,candidate_filter:g,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:V}),se}function N(w){return w.queue_groups[0]||Gk}function W(w){let y=w.dependency_chips||null,C={...y&&y.released?{released:y.released}:{},...y&&y.dependents?{dependents:y.dependents}:{}},le=X.get(w.id),$e=L.get(w.id)||null,je=le&&le.overlaps.length>0?le.overlaps:null,Xe=!!le&&le.scope_missing;return!$e&&!je&&!Xe&&Object.keys(C).length===0?null:{...C,...$e?{predecessors:$e}:{},...je?{overlaps:je}:{},...Xe?{scope_missing:!0}:{}}}function Se(w){return{...w,workspace_name:"",done_layout:void 0,dependency_chips:W(w)||void 0,chip_popover:ye(w)}}function ye(w){return Ci(w,y=>re.isOpen({bead_id:w.id,chip_key:y}))}function mt(){let w=U(),y=new Map;for(let C of Object.values(ln(w.lane_states))){let le=Array.isArray(C?.corrections)?C.corrections:[];for(let $e of le)$e&&typeof $e.bead_id=="string"&&typeof $e.after=="string"&&y.set($e.bead_id,$e.after)}return{admission:ln(w.admission),correction_after:y}}function $t(w,y){let C=Se(w),le=hd(y.admission[w.id]||null,!!w.discard||_e.has(w.id)),$e=y.correction_after.get(w.id);return{...C,draggable:C.draggable===!0&&!le,stale_work:le,reason:le?"":C.reason,badges:$e?[`\u{1F517} ${$e} \uB4A4 (blocks \uC790\uB3D9)`,...C.badges||[]]:C.badges,revise_enabled:C.revise_enabled===!0&&!ie.has(w.id)}}function vt(w){let y=mt();return N(w).sublanes.parallel.map(C=>$t(C,y))}function xt(w){let y=mt();return N(w).sublanes.serial.map(C=>{let le=C.occupants.map($e=>({id:$e.id,title:$e.title,draggable:!1,lane:C.id,ghost:!0,badges:[$e.badge],...typeof $e.search_match=="boolean"?{search_match:$e.search_match}:{}}));return{id:C.id,index:C.index+1,raw_length:C.raw_length,ghosts:le,items:C.items.map($e=>$t($e,y)),occupied:C.occupied_by.length>0,badge:C.occupants.length>0?C.occupants[0].badge:"\uB300\uAE30",cycle:C.cycle===!0}})}function jt(w){return w.runnable.map(y=>Se(y))}function zt(w){return w.done.map(y=>Se(y))}function Ft(w){let y=w.running.filter(C=>C.non_occupying!==!0).map(C=>({...C,bead_id:C.id,attempt_id:C.attempt_id||"",paused:C.run_state==="paused",failed:C.run_state==="failed",parked:C.run_state==="parked",retry_wait:C.run_state==="retry_wait",waiting:C.run_state==="waiting",wait:C.wait||null,provider_hold:C.run_state==="provider_hold",hold:C.hold?{...C.hold,open:T===C.attempt_id}:null,status_label:C.run_state==="failed"?C.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":C.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":C.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":C.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":C.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:C.can_pause!==!1,workspace_name:"",dependency_chips:W(C)||void 0,chip_popover:ye(C),rollup_expanded:Ce.has(C.id),failure:C.failure?{...C.failure,open:E===C.attempt_id}:null,...Ao(C.id,{discard:C.discard,parked:C.run_state==="parked"},z.has(C.id))}));return[...y.filter(C=>C.failed===!0),...y.filter(C=>C.failed!==!0&&C.parked===!0),...y.filter(C=>C.failed!==!0&&C.parked!==!0)]}function kt(w){return Xt(w).map(y=>({...y,chip_popover:ye(y)}))}function Xt(w){if(Y&&Y.model===w)return Y.rows;let y=U(),C=N(w),le=ln(y.attempts),$e=Object.values(le).filter(rr),je=new Map;for(let Ve of $e)je.set(Ve.attempt_id,Ve);let Xe=new Map;for(let Ve of $e)Xe.set(Ve.bead_id,Ve);let Ot=new Map;for(let Ve of[...w.pr_wait,...w.running,...w.queue,...w.runnable,...w.done])Ot.has(Ve.id)||Ot.set(Ve.id,Ve);let Jt=Ve=>{let Gt=null;for(let wn of $e)!wn||wn.bead_id!==Ve||fl(wn,je)||(Gt===null||(typeof wn.started_at=="number"?wn.started_at:0)>=(typeof Gt.started_at=="number"?Gt.started_at:0))&&(Gt=wn);return Gt&&typeof Gt.target_base=="string"?Gt.target_base:null},dt=new Map;for(let Ve of w.running)Ve.run_state==="failed"||Ve.conflict_resolution!==!0||(Ve.run_state!=="paused"?dt.set(Ve.id,"running"):dt.has(Ve.id)||dt.set(Ve.id,"paused"));let un=ln(y.auto_merge_skips),yn=new Set(C.merge.auto_excluded),cr=ln(y.pr_observations),jn=ln(y.pr_activity),Yn=ln(y.cleanup_failed),Vn=ln(y.discard_operations),Qn=ln(y.bead_workflow),on=ln(y.bead_titles),Xn=y.merge_queue_state||{active:null,failures:{}},ur=C.merge.state.waiting,Tn=new Map;for(let Ve of Array.isArray(y.merge_queue)?y.merge_queue:[])Ve&&typeof Ve=="object"&&Ve.bead_id&&Tn.set(Ve.bead_id,Ve);let Fn=(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(Ve=>{let Gt=Ot.get(Ve.bead_id);return{...pw(Ve.bead_id,Gt?.title||on[Ve.bead_id]||Ve.bead_id,cr,Yn[Ve.bead_id]||null,nr(le,Ve.bead_id),jn[Ve.bead_id]||(ve.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:Pe.has(Ve.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),dt.get(Ve.bead_id)||null,Ve.external===!0,{position:C.merge.positions.get(Ve.bead_id)||0,active:Xn.active===Ve.bead_id,failure:ln(Xn.failures)[Ve.bead_id]||null,waiting:ur&&ur.bead_id===Ve.bead_id?ur.reason:null,resolution:C.merge.resolutions.get(Ve.bead_id),continuation_action:C.merge.continuations.get(Ve.bead_id),authority:C.merge.authorities.get(Ve.bead_id)||null,hold:Tn.get(Ve.bead_id)?.hold||null,review_dispatch:Tn.get(Ve.bead_id)?.review_dispatch||null},Ve.wt_present!==!1,y.auto_merge===!0&&yn.has(Ve.bead_id)?un[Ve.bead_id]?.reason||"":null,pl(C.declared_base,Jt(Ve.bead_id)),ln(y.completion_status)[Ve.bead_id]||null,Vn,y.auto_merge===!0,{merge_sha:Ve.merge_sha,cleanup_cursor:Ve.cleanup_cursor,repo_operations:C.repo_operations},Gt?W(Gt):null,pd(le,Ve.bead_id),z.has(Ve.bead_id)),...Gt?.search_match===void 0?{}:{search_match:Gt.search_match},workflow:Qn[Ve.bead_id]||null,priority:Gt?.priority,from_id:Gt?.from_id,...Gt?.created_at===void 0?{}:{created_at:Gt.created_at},...Gt?.updated_at===void 0?{}:{updated_at:Gt.updated_at}}});return Y={model:w,rows:Fn},Fn}function Zt(w){let y=N(w),C=[];for(let je of w.running)je.non_occupying!==!0&&C.push({id:je.id,title:je.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:je.serial_lane_id??null});for(let je of w.pr_wait)C.push({id:je.id,title:je.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let je of y.sublanes.serial)je.items.forEach((Xe,Ot)=>{C.push({id:Xe.id,title:Xe.title,location_label:`${je.id} #${Ot+1}`,kind:"serial",lane_id:je.id})});y.sublanes.parallel.forEach((je,Xe)=>{C.push({id:je.id,title:je.title,location_label:`#${Xe+1}`,kind:"parallel",lane_id:null})});for(let je of w.runnable)C.push({id:je.id,title:je.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:je.queue_placeable===!0});let le=U();X=m_(le.bead_scope,C);let $e=new Map;for(let je of[...w.running,...w.runnable])Array.isArray(je.blocked_by)&&je.blocked_by.length>0&&$e.set(je.id,je.blocked_by);for(let[je,Xe]of Object.entries(ln(le.bead_blocked_by)))Array.isArray(Xe)&&$e.set(je,Xe.filter(Ot=>typeof Ot=="string"&&Ot.length>0));L=Cd($e,C,ln(le.blocker_workspaces))}function Bt(w){let y=w.hold&&typeof w.hold=="object"?w.hold:null;if(!y||y.kind!=="env"&&y.kind!=="systemic")return"";let C=$r(y.cause)||String(y.cause||""),le=Array.isArray(w.lineages)?w.lineages:[];if(y.kind==="env"){let je=le.map(Ot=>Ot&&Ot.next_at).filter(Ot=>typeof Ot=="number").sort((Ot,Jt)=>Ot-Jt)[0],Xe=typeof je=="number"?` \xB7 \uB2E4\uC74C ${new Date(je).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${C} — 재시도 대기${Xe}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let $e=(Array.isArray(y.bead_ids)?y.bead_ids:[]).filter(je=>typeof je=="string"&&je.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${C}${$e.length>0?` \u2014 bead ${$e.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Rt(w){let y=[];for(let[dt,un]of Object.entries(ln(w.provider_hold)))for(let yn of Array.isArray(un?.targets)?un.targets:[])y.push({runner:dt,target:yn});if(y.length===0)return"";let C=y.find(dt=>dt.target?.kind==="outage");if(C){let dt=typeof C.target.next_probe_at=="number"?new Date(C.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${C.runner} 공급자 장애 — 신규 디스패치
        보류${dt?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${dt}`:""}
      </div>`}let le=Array.isArray(ln(w.account_catalog).claude)?ln(w.account_catalog).claude:[],$e=dt=>le.find(yn=>yn?.email===dt)?.alias||dt,je=y.find(dt=>typeof dt.target?.account!="string"),Xe=dt=>typeof dt?.resets_at=="number"?new Date(dt.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(je){let dt=Xe(je.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${je.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${dt?`, \uB9AC\uC14B ${dt}`:""}
      </div>`}let Ot=[...new Set(y.map(dt=>$e(String(dt.target.account))))],Jt=Xe(y[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Ot.join(", ")} 사용 한도 —
      ${Ot.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${Jt?`, \uB9AC\uC14B ${Jt}`:""}
    </div>`}function Qt(w){let y=U(),C=N(w),le=C.sublanes.parallel,$e=le.length>0?le[0].id:"\u2014",je=c`<button
      type="button"
      class="worker-play${y.auto_advance?" is-active":""}"
    >
      ${y.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Xe=yt(w),Ot=C.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Jt=y.auto_advance?0:(Array.isArray(y.queue)?y.queue:[]).filter(on=>on&&typeof on.armed_by_lane=="string"&&on.armed_by_lane.length>0).length,dt=Jt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Jt}건 진행 중</span
          >`:"",un=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${C.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${kt(w).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${H()} 완료 <b>${w.done.length}</b></span
      >`,yn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${C.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${C.declared_base||"?"}</span
    >`,cr=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ba}
          step="1"
          .value=${String(C.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:O_},(on,Xn)=>Xn+1).map(on=>c`<option
                value=${String(on)}
                ?selected=${C.serial_lane_count===on}
              >
                ${on}
              </option>`)}
        </select>
      </label> `,jn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${V}
    />`,Yn=_d(C.repo_operations,C.cleanup_failures),Vn=Bt(y),Qn=Rt(y);return q?c`<div class="worker-ribbon">
          ${je} ${Xe}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Ot}${dt}${un}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${cr}${jn}</div>
          <div class="worker-kpi">${yn}</div>
        </div>
        ${Qn}${Vn}${Yn}${J.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${je}${Xe}${cr}${jn}
        </div>
        <div class="worker-kpi">
          ${Ot}${dt}${un}${yn}
          ${(Array.isArray(C.token_total)?C.token_total:C.token_total?[{label:C.token_total,tooltip:`${H()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(on=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${on.tooltip}
                >${H()} 완료 · 누적 ${on.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${$e}</b></span
          >
        </div>
      </div>
      ${Qn}${Vn}${Yn}${J.template()}`}function Ae(w){let y=w.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${g.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${rs.map(C=>c`<button
              type="button"
              class="worker-filter__chip${g.readiness===C.value?" is-active":""}"
              data-readiness=${C.value}
              aria-pressed=${g.readiness===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${y.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${y.readiness}</span
            >`:""}
      </div>
    </div>`}function S(){let w=M?"custom":ec(R)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${w}
    >
      ${As.map(y=>c`<option value=${y.id} ?selected=${w===y.id}>
            ${y.label}
          </option>`)}
      <option value="custom" ?selected=${w==="custom"}>
        사용자 지정…
      </option>
    </select>`}function fe(){let w=Ss(R);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(y=>{let C=w[y];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${y}
            aria-label=${`${y+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${C?C.key:""}
          >
            ${y===0?"":c`<option value="" ?selected=${!C}>없음</option>`}
            ${u_.map(le=>c`<option
                  value=${le.key}
                  ?selected=${!!C&&C.key===le.key}
                >
                  ${le.label}
                </option>`)}
          </select>
          ${C?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${y}
                aria-label=${C.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${C.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${C.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Le(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${F}
      >
        ${Yr.map(w=>c`<option value=${w.value} ?selected=${F===w.value}>
              ${w.label}
            </option>`)}
      </select>
    </div>`}function yt(w){let y=N(w).merge,C=U().auto_merge===!0;if(y.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${C?" is-active":""}"
        title=${C?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${C?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${y.positions.size}
      </button>`;if(C)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let le=new Set(y.auto_excluded),$e=kt(w).filter(je=>je.merge_action&&je.merge_enabled&&!le.has(je.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${$e>0?` ${$e}`:""}
    </button>`}function Qe(w,y){return c`<div
      data-bead-id=${w.id}
      data-drag-kind=${y.kind}
      data-root-dir=${y.root_dir}
      data-lane-id=${dn(y.lane_id)}
      data-row-index=${y.row_index}
      data-queue-index=${String(w.queue_index??0)}
    >
      ${Ln({...w,...Ao(w.id,{discard:w.discard,parked:!1},z.has(w.id))},{actions:ho(w)})}
    </div>`}function St(w){let y=vt(w),C=et();return Ri({parallel:{rows:y.map((le,$e)=>Qe(le,{kind:"parallel",root_dir:C,row_index:$e})),count:y.length,collapsed:j.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:C}},serial:{lanes:xt(w).map(le=>({id:le.id,title:`\uC9C1\uB82C ${le.index}`,rows:[...le.ghosts.map($e=>Ln({...$e,...Ao($e.id,{discard:$e.discard,parked:!1},z.has($e.id))},{actions:ho($e)})),...le.items.map(($e,je)=>Qe($e,{kind:"repo-serial",root_dir:C,row_index:je,lane_id:le.id}))],count:le.ghosts.length+le.items.length,match_count:ne([...le.ghosts,...le.items]),empty:le.ghosts.length+le.items.length===0,badge:le.badge,held:le.occupied,cycle:le.cycle,drop:{drop:"repo-serial",root_dir:C,lane_id:le.id,lane_length:String(le.raw_length)}})),collapsed:j.isAreaCollapsed("serial")}})}function x(w){return wf(Ft(w),Date.now(),me)}function I(w){return w.running.some(y=>y.kind!=="session"&&y.run_state==="running")}function Te(w){let y=N(w),C=jt(w),le=vt(w),$e=zt(w),je=kt(w),Xe=Ft(w),Ot=Kn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:C,match_count:ne(C),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:S(),header_row:M?fe():void 0,controls:Ae(w),collapsible:!0,collapsed:j.isCollapsed("candidate"),place_menu:He(C),onOpenDoc:u?(dt,un)=>u(un):void 0}),Jt=Kn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:$e,match_count:ne($e),empty:`${H()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Le(),collapsible:!0,collapsed:j.isCollapsed("done"),preview:q?Array.isArray(y.token_total)?y.token_total.map(dt=>dt.label).join(" \xB7 "):y.token_total||I_($e):void 0});return q?c`<div class="worker-lanes worker-lanes--mobile">
          ${Oi({live:I(w),running_body:Xe.length>0?x(w):"",pr_wait_rows:je.map(dt=>Ln(dt)),count:Xe.length+je.length})}
          ${Kn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,match_count:ne(le),collapsible:!0,collapsed:j.isCollapsed("queue"),preview:I_(le),body:St(w)})}
          ${Ot} ${Jt}
        </div>
        ${xo(te,U())}`:c`<div class="worker-lanes">
        ${Ot}
        ${Kn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,match_count:ne(le),collapsible:!0,collapsed:j.isCollapsed("queue"),body:St(w)})}
        ${Kn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Xe,match_count:ne(Xe),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${y.slots}</span
          >`,live:I(w),collapsible:!0,collapsed:j.isCollapsed("running"),body:x(w)})}
        ${Kn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:je,match_count:ne(je),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:j.isCollapsed("pr_wait")})}
        ${Jt}
      </div>
      ${xo(te,U())}`}function Ge(w){j.toggle(w),f()}function De(w){j.toggleArea(w),f()}function f(){let w=A();Zt(w),pt(Qt(w),ke),pt(Te(w),oe),da(oe)}function h(){let w=!0,y=oa(C=>{if(q=C,w){w=!1;return}f()});ae.push(y)}function O(w){g=w,Vk(w),f()}function D(w){if(w==="custom"){M=!0,f();return}R=zr(w),tc(R),M=!1,f()}function _(w){R=zr({chain:w}),tc(R),f()}function b(w){F=Un(w),Xk(F),p?.(F),f()}function ee(w){let y=w.target;if(te){let dt=ca(te,y,U());if(dt){dt!==te&&(te=dt,f());return}}let C=y?.closest?.(".worker-serial-lane-count");if(C){let dt=Number.parseInt(C.value,10);Number.isFinite(dt)&&Ne(dt).then(f);return}let le=w.target?.closest?.(".worker-filter__blocked");if(le){O({...g,show_blocked:le.checked});return}let $e=w.target?.closest?.(".worker-sort-chain__key");if($e){let dt=Number.parseInt($e.getAttribute("data-step")||"",10);Number.isFinite(dt)&&_(p_(Ss(R),dt,$e.value));return}let je=w.target?.closest?.(".worker-done-range");if(je){b(je.value);return}let Xe=w.target?.closest?.(".worker-sort");if(Xe){D(Xe.value);return}let Ot=w.target?.closest?.(".worker-slots__input");if(!Ot)return;let Jt=Number.parseInt(Ot.value,10);if(!Number.isFinite(Jt)){f();return}ot(Jt).then(f)}function de(w){return w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,worktree:w.worktree||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}}function Be(){let w=N(A()),y=U().workspace_info,C=y&&typeof y=="object"&&y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return{operations:w.repo_operations,cleanup_failures:w.cleanup_failures,repo:l&&l()||"",repo_ops:C}}function gt(){me&&Oe.close(),Q.hidden=!1,Re.hidden=!1,Fe.open(Be()),f()}function Tt(w){let y=U(),C=y.attempts?y.attempts[w]:null;me=w,Fe.close(),Q.hidden=!0,Re.hidden=!1,Oe.open({attempt_id:w,meta:de(C)}),f()}function Ht(w){let y=U(),C=(Array.isArray(y.session_active)?y.session_active:[]).find($e=>$e&&$e.bead_id===w),le=(C&&Array.isArray(C.session_refs)?C.session_refs:[]).find($e=>$e&&$e.current===!0);le&&(Fe.close(),Q.hidden=!0,Re.hidden=!1,Oe.open(oo(le,w,"in_progress")),f())}function Gn(){if(Fe.isOpen()&&Fe.refresh(Be()),!me)return;let w=U(),y=w.attempts?w.attempts[me]:null;if(y){Oe.updateMeta(de(y));return}Oe.close()}function Kt(w,y){if(w.length===0||!s)return;let C=l?l():void 0;if(y.length===0||!C||y===C||!a){s(w);return}Promise.resolve(a(y)).then(()=>{s(w)}).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function cn(w){let y=w.target;if(y?.closest?.(".provider-resume-dialog__cancel")){ft();return}if(y?.closest?.(".provider-resume-dialog__confirm")){ut();return}if(y?.closest?.(".provider-resume-dialog")||y?.closest?.(".worker-mini__grip"))return;let C=y?.closest?.(".worker-sort-chain__dir");if(C){let ce=Number.parseInt(C.getAttribute("data-step")||"",10);Number.isFinite(ce)&&_(f_(Ss(R),ce));return}let le=y?.closest?.(".worker-dep__open");if(le){Kt(le.getAttribute("data-dep-id")||"",le.getAttribute("data-root-dir")||"");return}let $e=y?.closest?.(".judgement-chip");if($e){let ce=$e.closest("[data-bead-id]"),Je=ce&&ce.getAttribute("data-bead-id")||"",Me=$e.getAttribute("data-chip-key")||"";Je&&Me&&re.toggle({bead_id:Je,chip_key:Me});return}if(y?.closest?.(".chip-popover"))return;if(y?.closest?.(".worker-repo-strip")){gt();return}let je=y?.closest?.(".worker-repo-op__dismiss");if(je){bt(je.dataset.operationId||"");return}let Xe=y?.closest?.(".worker-cleanup__resume");if(Xe){let ce=Xe.dataset.beadId;ce&&Dt(ce);return}let Ot=y?.closest?.(".worker-cleanup__resolve");if(Ot){let ce=Ot.dataset.beadId;ce&&st(ce);return}if(y?.closest?.(".worker-hold__retry")){wt("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(y?.closest?.(".worker-hold__resume")){wt("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(y?.closest?.(".worker-play")){_t(!U().auto_advance);return}let Jt=y?.closest?.(".worker-merge-all");if(Jt){Jt.classList.contains("worker-merge-all--stop")?U().auto_merge===!0?Lt(!1):ue():Lt(!0);return}let dt=y?.closest?.(".worker-pane__toggle[data-lane]");if(dt){let ce=dt.dataset.lane;(ce==="candidate"||ce==="queue"||ce==="running"||ce==="pr_wait"||ce==="done")&&Ge(ce);return}let un=y?.closest?.(".worker-wait__area-toggle[data-area]");if(un){let ce=un.dataset.area;(ce==="parallel"||ce==="serial")&&De(ce);return}let yn=y?.closest?.(".worker-card__place-lane");if(yn){let ce=yn.dataset.beadId,Je=yn.dataset.lane;ce&&(Je==="parallel"||/^s[1-5]$/.test(Je||""))&&(v=null,f(),$(ce,Je));return}if(y?.closest?.(".worker-card__place-cancel")){v=null,f();return}let jn=y?.closest?.(".worker-card__place");if(jn){let ce=jn.dataset.beadId;ce&&!jn.disabled&&(Vo(U())?(v=ce,f()):$(ce,"parallel"));return}let Yn=y?.closest?.(".worker-filter__chip");if(Yn){let ce=Yn.dataset.readiness;(ce==="all"||ce==="ready"||ce==="not_ready")&&O({...g,readiness:ce});return}let Vn=y?.closest?.('[data-action="queue-remove"]');if(Vn){let ce=Vn.dataset.beadId||"";ce&&Ee.sendOp({type:"worker-queue-remove",payload:{bead_id:ce},root_dir:et()},ce);return}let Qn=y?.closest?.(".worker-mini__merge");if(Qn){let ce=Qn.dataset.beadId||"";U().cleanup_failed?.[ce]?Dt(ce):Et(ce);return}let on=y?.closest?.(".worker-mini__merge-cancel");if(on){Ut(on.dataset.beadId||"");return}let Xn=y?.closest?.(".worker-mini__resolve");if(Xn){st(Xn.dataset.beadId||"");return}let ur=y?.closest?.(".rtile__resolve");if(ur){let ce=ur.closest(".rtile");st(ce?.dataset.beadId||"");return}let Tn=y?.closest?.(".worker-mini__discard"),Fn=y?.closest?.(".worker-mini__discard-abandon");if(Fn){Ue(Fn.dataset.beadId||"",Fn.dataset.operationId||"",{kind:Fn.dataset.operationKind||"",last_error:Fn.dataset.lastError||""});return}if(Tn){we(Tn.dataset.beadId||"",Tn.dataset.attemptId||null,Tn.dataset.discardMode==="merged"?"merged":"unmerged",Tn.dataset.operationId||null);return}let Ve=y?.closest?.(".worker-mini__stale-continue");if(Ve){rt("worker-stale-work-continue",Ve.dataset.beadId||"",Ve.dataset.actionId||"");return}let Gt=y?.closest?.(".worker-mini__stale-backup");if(Gt){rt("worker-stale-work-backup-fresh",Gt.dataset.beadId||"",Gt.dataset.actionId||"");return}let wn=y?.closest?.(".worker-mini__stale-recheck");if(wn){rt("worker-stale-work-recheck",wn.dataset.beadId||"",wn.dataset.actionId||"");return}let Ts=y?.closest?.(".worker-mini__revise-fix");if(Ts){tt("worker-revise-fix",Ts.dataset.beadId||"");return}let Cs=y?.closest?.(".worker-mini__revise-approve");if(Cs){tt("worker-revise-approve",Cs.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;let Rs=y?.closest?.(".rtile__failure-badge");if(Rs){let ce=Rs.dataset.attemptId||"";E=E===ce?null:ce,f();return}let Os=y?.closest?.(".rtile__provider-hold-badge");if(Os){let ce=Os.dataset.attemptId||"";T=T===ce?null:ce,f();return}let Is=y?.closest?.(".rtile__attempt-copy");if(Is){let ce=Is.dataset.attemptId||"";ce&&_n(ce).then(Je=>{ge(Je?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Je?"success":"error",1400)});return}let nt=y?.closest?.(".rtile__discard-abandon");if(nt){let Je=y?.closest?.(".rtile")?.dataset?.beadId;Je&&Ue(Je,nt.dataset.operationId||"",{kind:nt.dataset.operationKind||"",last_error:nt.dataset.lastError||""});return}let k=y?.closest?.(".rtile__discard");if(k){let ce=y?.closest?.(".rtile"),Je=ce?.dataset?.beadId,Me=ce?.dataset?.attemptId;Je&&we(Je,Me||null,k.dataset.confirmation==="merged"?"merged":"unmerged",k.dataset.operationId||null);return}if(y?.closest?.(".rtile__pause")){let Je=y?.closest?.(".rtile")?.dataset?.attemptId;Je&&Ye(Je);return}if(y?.closest?.(".rtile__resume-alternate")){let Je=y?.closest?.(".rtile")?.dataset?.attemptId;Je&&qe(Je);return}if(y?.closest?.(".rtile__resume")){let ce=y?.closest?.(".rtile__resume"),Me=y?.closest?.(".rtile")?.dataset?.attemptId;Me&&ct(Me,ce?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(y?.closest?.(".rtile__session")){let ce=y?.closest?.(".rtile"),Je=ce?.dataset?.attemptId;if(Je){Tt(Je);return}let Me=ce?.dataset?.beadId;Me&&Ht(Me);return}if(y?.closest?.(".rtile__failure-pop"))return;if(y?.closest?.(".worker-drawer-overlay__backdrop")){Fe.close(),Oe.close();return}if(y?.closest?.(".worker-drawer-host"))return;let P=y?.closest?.(".rtile .board-card__roll-toggle");if(P){let ce=P.dataset.rollParent;ce&&(Ce.has(ce)?Ce.delete(ce):Ce.add(ce),f());return}let G=y?.closest?.(".rtile .board-card__roll-child");if(G){let ce=G.dataset.childId;ce&&s&&s(ce);return}let xe=y?.closest?.(".rtile");if(xe){if(y?.closest?.(".rtile__id")){let Je=xe.dataset.beadId;Je&&_n(Je).then(Me=>{Me?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ce=xe.dataset.beadId;ce&&s&&s(ce);return}let We=y?.closest?.(".worker-mini, .worker-card");if(We){let ce=We.dataset.beadId;if(y?.closest?.('[data-seam="log-path-copy"]'))return;if(y?.closest?.(".worker-mini__id, .worker-card__id")){ce&&_n(ce).then(Me=>{Me?ge("\uBCF5\uC0AC\uB428","success",1200):ge("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Je=y?.closest?.(".ctl-chip--from");if(Je){let Me=Je.dataset.fromId;Me&&s&&s(Me);return}ce&&s&&s(ce)}}function Hr(w){let y=w.target;y?.closest?.(".worker-search")&&(V=y.value,f())}function ya(w){let y=w.target;w.key!=="Escape"||!y?.closest?.(".worker-search")||V.length===0||(V="",f())}Ee.attach(e),e.addEventListener("click",cn),e.addEventListener("change",ee),e.addEventListener("input",Hr),e.addEventListener("keydown",ya);function Es(w){let y=w.target,C=y&&typeof y.closest=="function"?$e=>y.closest($e):()=>null,le=!1;E&&!C(".rtile__failure-pop, .rtile__failure-badge")&&(E=null,le=!0),T&&!C(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(T=null,le=!0),le&&f()}function So(w){w.key==="Escape"&&(E===null&&T===null&&te===null||(E=null,T=null,te=null,f()))}return document.addEventListener("click",Es),document.addEventListener("keydown",So),re.attach(),ae.push(()=>{document.removeEventListener("click",Es),document.removeEventListener("keydown",So),re.detach()}),h(),m&&ae.push(m.subscribe(()=>{Z.notifyIssuesChanged(),f()})),o&&ae.push(o.subscribe(()=>{let w=l&&l()||"";w!==ze&&(ze=w,Ze.close()),f(),Gn()})),f(),{load(){Z.ensureSessionDefaults(),f()},refreshSessionDefaults:be,destroy(){for(let w of ae.splice(0))try{w()}catch{}Ee.detach(),e.removeEventListener("click",cn),e.removeEventListener("change",ee),Z.destroy();try{Oe.destroy()}catch{}Re.hidden=!0;try{Ze.destroy()}catch{}pt(c``,e)}}}function ic(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function M_(e,t,n,r=async()=>{},o=async()=>{}){let i=Wt("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(M){let H=M.target.value,q=t.getState().workspace?.current?.path||"";if(H&&H!==q){i("switching workspace to %s",H),l=!0,R();try{await n(H)}catch(V){i("workspace switch failed: %o",V)}finally{l=!1,R()}}}async function p(){let M=t.getState(),F=M.workspace?.current?.path||M.workspace?.available?.[0]?.path||"";if(!(!F||a)){i("git-pulling workspace %s",F),a=!0,R();try{await r(F)}catch(H){i("workspace git pull failed: %o",H)}finally{a=!1,R()}}}function m(M){let F=M.target;F&&e.contains(F)||E()}function g(M){M.key==="Escape"&&E()}function v(){u||(u=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",g),R())}function E(){u&&(u=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",g),R())}function T(){u?E():v()}async function te(M){let F=M.target,H=F.value,j=F.checked;i("toggling visibility %s \u2192 %s",H,String(j));try{await o(H,j)}catch(q){i("workspace visibility toggle failed: %o",q)}}function re(M){return M?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${p}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function X(M,F){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${T}
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
                ${M.map(H=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${H.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${H.path}"
                        .checked=${!F.has(H.path)}
                        @change=${te}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ic(H.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let M=t.getState(),F=M.workspace?.current,H=M.workspace?.available||[],j=new Set(M.workspace?.hidden||[]),q=F?.path||H[0]?.path||"";if(H.length===0)return c``;let V=H.filter(B=>!j.has(B.path)||B.path===q);if(V.length<=1){let B=V[0]||H[0],ne=ic(B.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${B.path}"
            >${ne}</span
          >
          ${X(H,j)}
          ${re(q)}
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
          ${V.map(B=>c`
              <option
                value="${B.path}"
                ?selected=${B.path===q}
                title="${B.path}"
              >
                ${ic(B.path)}
              </option>
            `)}
        </select>
        ${X(H,j)}
        ${re(q)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){pt(L(),e)}return R(),s=t.subscribe(()=>R()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",g),pt(c``,e)}}}var q_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-queue-arm","worker-queue-disarm","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove","monitor-lane-provenance"];function ac(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function N_(e,t,n=ac()){return{id:n,type:e,payload:t}}function j_(e={}){let t=Wt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],p=new Map,m=new Set;function g(L){for(let R of Array.from(m))try{R(L)}catch{}}function v(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),g(i);let L=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),R=(n.jitterRatio||0)*L,M=Math.max(0,Math.round(L+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",M,s+1),l=setTimeout(()=>{l=null,X()},M)}function E(L){try{o?.send(JSON.stringify(L))}catch(R){t("ws send failed",R)}}function T(){for(i="open",t("ws open"),g(i),s=0;d.length;){let L=d.shift();L&&E(L)}}function te(L){let R;try{R=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(u.has(R.id)){let F=u.get(R.id);u.delete(R.id),R.ok?F?.resolve(R.payload):F?.reject(R.error||new Error("ws error"));return}let M=p.get(R.type);if(M&&M.size>0)for(let F of Array.from(M))try{F(R.payload)}catch(H){t("ws event handler error",H)}else t("ws received unhandled message type: %s",R.type)}function re(){i="closed",t("ws closed"),g(i);for(let[L,R]of u.entries())R.reject(new Error("ws disconnected")),u.delete(L);s+=1,v()}function X(){if(!a)return;let L=r();try{o=new WebSocket(L),t("ws connecting %s",L),i="connecting",g(i),o.addEventListener("open",T),o.addEventListener("message",te),o.addEventListener("error",()=>{}),o.addEventListener("close",re)}catch(R){t("ws connect failed %o",R),v()}}return X(),{send(L,R){if(!q_.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let M=ac(),F=N_(L,R,M);return t("send %s id=%s",L,M),new Promise((H,j)=>{u.set(M,{resolve:H,reject:j,type:L}),o&&o.readyState===o.OPEN?E(F):(t("queue %s id=%s (state=%s)",L,M,i),d.push(F))})},on(L,R){p.has(L)||p.set(L,new Set);let M=p.get(L);return M?.add(R),()=>{M?.delete(R)}},onConnection(L){return m.add(L),()=>{m.delete(L)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,X()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function fw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function _w(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var lc=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],F_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Ar="tab:worker:closed",mw="bdui.worker.done-range",B_=jf,U_="worker:queue",W_="ui:order",z_="ui:display-policy",H_="exec:presets",Sr="tab:board:closed",K_="beads-ui.board.closed-range";function gw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+hw(e))});return n.observe(e),()=>n.disconnect()}function hw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function bw(e){let t=Wt("main");t("bootstrap start"),gw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;pt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&s_(s),l&&a&&u&&d){let Z=function(_,b){let ee="Request failed",de="";if(_&&typeof _=="object"){let gt=_;if(typeof gt.message=="string"&&gt.message.length>0&&(ee=gt.message),typeof gt.details=="string")de=gt.details;else if(gt.details&&typeof gt.details=="object")try{de=JSON.stringify(gt.details,null,2)}catch{de=""}}else typeof _=="string"&&_.length>0&&(ee=_);let Be=b&&b.length>0?`Failed to load ${b}`:"Request failed";ae.open(Be,ee,de)},qe=function(_){return`${Ae.getState().workspace.current?.path||""}\0${_}`},ft=function(){Ee&&(Ee().catch(()=>{}),Ee=null),me=null,Oe=null},He=function(_){Fe=_;let b=()=>{Fe!==_||Ae.getState().selected_id!==_||(Fe=null,ut(_))};if(!J){ze.then(b);return}b()},he=function(_,b,ee,de,Be){return ee!==K[b]?(Be().catch(()=>{}),!1):(_.set(de,Be),!0)},ct=function(){let _=Ae.getState();wt(_.view==="board"),Ue(_.view==="worker"),Ne(ot(_)),tt(_.view==="board"||_.view==="worker"||Ye||!!_.selected_id)},Dt=function(){let _=Ir(Ke);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},st=function(){let _=Ir(Et);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},wt=function(_){if(_)for(let[b,ee]of lc){if(et.has(b)||$.has(b))continue;let de=b===Sr?Dt():{type:ee};try{Re.register(b,de)}catch(Tt){t("register %s store failed: %o",b,Tt)}$.add(b);let Be=K.board,gt=!1;ke.subscribeList(b,de).then(Tt=>{gt=!he(et,"board",Be,b,Tt)}).catch(Tt=>{t("subscribe %s failed: %o",b,Tt),Z(Tt,"board")}).finally(()=>{$.delete(b),gt&&ct()})}else Ut()},Ut=function(){K.board+=1;for(let[_]of lc){let b=et.get(_);b&&(b().catch(()=>{}),et.delete(_));try{Re.unregister(_)}catch(ee){t("unregister %s failed: %o",_,ee)}}},Ue=function(_){if(!_){rt();return}for(let[b,ee]of F_){if(ue.has(b)||$.has(b))continue;let de=b===Ar?st():{type:ee};try{Re.register(b,de)}catch(Tt){t("register %s store failed: %o",b,Tt)}$.add(b);let Be=K.worker,gt=!1;ke.subscribeList(b,de).then(Tt=>{gt=!he(ue,"worker",Be,b,Tt)}).catch(Tt=>{t("subscribe %s failed: %o",b,Tt),Z(Tt,"worker")}).finally(()=>{$.delete(b),gt&&ct()})}},rt=function(){K.worker+=1;for(let[_]of F_){let b=ue.get(_);b&&(b().catch(()=>{}),ue.delete(_));try{Re.unregister(_)}catch(ee){t("unregister %s failed: %o",_,ee)}}},tt=function(_){if(!_){_t();return}we||(Ie("subscribe-worker-queue",{id:U_}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),we=()=>Ie("unsubscribe-worker-queue",{id:U_}))},_t=function(){we&&(we().catch(()=>{}),we=null)},ot=function(_){return _.view==="monitor"||_.selected_id!=null},Ne=function(_){if(!_){A();return}bt||(Ie("subscribe-monitor-pipeline",{id:B_}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),bt=()=>Ie("unsubscribe-monitor-pipeline",{id:B_}))},A=function(){bt&&(bt().catch(()=>{}),bt=null)},W=function(){N||(Ie("subscribe-ui-order",{id:W_}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),N=()=>Ie("unsubscribe-ui-order",{id:W_}))},Se=function(){N&&(N().catch(()=>{}),N=null),Q.clear()},mt=function(){ye||(Ie("subscribe-display-policy",{id:z_}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),ye=()=>Ie("unsubscribe-display-policy",{id:z_}))},$t=function(){ye&&(ye().catch(()=>{}),ye=null),oe.clear()},xt=function(){vt||(Ie("subscribe-impl-presets",{id:H_}).catch(_=>{t("subscribe-impl-presets failed: %o",_)}),vt=()=>Ie("unsubscribe-impl-presets",{id:H_}))},Zt=function(_){if(!_)return"Unknown";let b=_.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"},Te=function(_,b){I.open(_.path,{missing_state:_.missing_state,...b?{workspace:b}:{}})};var p=Z,m=qe,g=ft,v=He,E=he,T=ct,te=Dt,re=st,X=wt,L=Ut,R=Ue,M=rt,F=tt,H=_t,j=ot,q=Ne,V=A,B=W,ne=Se,ve=mt,Pe=$t,z=xt,ie=Zt,_e=Te;let Ce=document.getElementById("header-loading"),Y=Xc(Ce),ae=cf(e),be=j_(),Ie=Y.wrapSend((_,b)=>be.send(_,b)),ke=zc(Ie),Re=Hc(),at=Gc(),lt=$c(),Q=Kc(),oe=kc(),se=wc(),pe=xc();be.on("impl-presets-snapshot",_=>{let b=_;b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&se.set({revision:b.revision,presets:b.presets})}),be.on("monitor-pipeline-snapshot",_=>{let b=_;if(!(!b||!Array.isArray(b.workspaces)))try{lt.set(b.workspaces,b.workspaces_state,b.cross_lanes)}catch{}}),be.on("ui-order-snapshot",_=>{let b=_;if(b&&typeof b.revision=="number")try{Q.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),be.on("display-policy-snapshot",_=>{let b=_;if(b&&b.policy&&typeof b.policy=="object")try{oe.set(b.policy)}catch{}}),be.on("session-log-snapshot",_=>{let b=_;if(b&&typeof b.id=="string")try{pe.set(b.id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),be.on("session-log-append",_=>{let b=_;if(b&&typeof b.id=="string")try{pe.append(b.id,b.event)}catch{}}),be.on("snapshot",_=>{let b=_,ee=b&&typeof b.id=="string"?b.id:"",de=ee?Re.getStore(ee):null;if(de&&b&&b.type==="snapshot")try{de.applyPush(b)}catch{}}),be.on("upsert",_=>{let b=_,ee=b&&typeof b.id=="string"?b.id:"",de=ee?Re.getStore(ee):null;if(de&&b&&b.type==="upsert")try{de.applyPush(b)}catch{}}),be.on("delete",_=>{let b=_,ee=b&&typeof b.id=="string"?b.id:"",de=ee?Re.getStore(ee):null;if(de&&b&&b.type==="delete")try{de.applyPush(b)}catch{}});let Ee=null,me=null,Oe=null,Fe=null,Ze=()=>{},ze=new Promise(_=>{Ze=()=>_(void 0)}),J=!1,U=!1;async function ut(_){let b=qe(_);if(b===me||b===Oe)return;Oe=b;let ee=`detail:${_}`,de={type:"issue-detail",params:{id:_}};try{Re.register(ee,de)}catch(Be){t("register detail store failed: %o",Be)}try{let Be=await ke.subscribeList(ee,de);if(Ae.getState().selected_id!==_||qe(_)!==b){await Be().catch(()=>{});return}Ee&&await Ee().catch(()=>{}),Ee=Be,me=b}catch(Be){t("detail subscribe failed: %o",Be),Z(Be,"issue details")}finally{Oe===b&&(Oe=null)}}let et=new Map,$=new Set,K={board:0,worker:0},Ye=!1,Ke=Fs;try{let _=window.localStorage.getItem(K_);Ea(_)&&(Ke=_)}catch{}let Et="today";try{let _=window.localStorage.getItem(mw);_!==null&&(Et=Un(_))}catch{}async function qt(_){if(!Ea(_)||_===Ke)return;Ke=_;try{window.localStorage.setItem(K_,_)}catch{}let b=et.get(Sr);if(!b)return;et.delete(Sr),await b().catch(()=>{});let ee=Dt();try{Re.register(Sr,ee)}catch(de){t("register %s store failed: %o",Sr,de)}try{let de=await ke.subscribeList(Sr,ee);et.set(Sr,de)}catch(de){t("re-subscribe %s failed: %o",Sr,de),Z(de,"board")}}async function Lt(_){let b=Un(_);if(b===Et)return;Et=b;let ee=ue.get(Ar);if(!ee)return;ue.delete(Ar),await ee().catch(()=>{});let de=st();try{Re.register(Ar,de)}catch(Be){t("register %s store failed: %o",Ar,Be)}try{let Be=await ke.subscribeList(Ar,de);ue.set(Ar,Be)}catch(Be){t("re-subscribe %s failed: %o",Ar,Be),Z(Be,"worker")}}let ue=new Map,we=null,bt=null,N=null,ye=null,vt=null;async function jt(){ye=null,oe.clear(),vt=null,se.clear(),we=null,bt=null,et.clear(),ue.clear(),K.board+=1,K.worker+=1,xt();let _=Ae.getState().workspace.current?.path;if(_)try{await be.send("set-workspace",{path:_})}catch(ee){t("workspace restore after reconnect failed: %o",ee);return}mt();let b=Ae.getState();wt(b.view==="board"),Ue(b.view==="worker"),Ne(ot(b)),tt(b.view==="board"||b.view==="worker"||!!b.selected_id)}async function zt(){t("clearing all subscriptions for workspace switch"),Ut(),rt(),_t(),at.clear(),Se(),W(),$t(),mt(),ft();let _=Ae.getState();if(_.selected_id)try{Re.unregister(`detail:${_.selected_id}`)}catch{}let b=Ae.getState();wt(b.view==="board"),Ue(b.view==="worker"),Ne(ot(b)),tt(b.view==="board"||b.view==="worker"||!!b.selected_id),b.selected_id&&He(b.selected_id)}async function Ft(_){t("requesting workspace switch to %s",_),U=!0;try{let b=await be.send("set-workspace",{path:_});t("workspace switch result: %o",b),b&&b.workspace&&(Ae.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),b.changed&&(await zt(),ge("Switched to "+Zt(_),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),ge("Failed to switch workspace","error",3e3),b}finally{U=!1}}async function kt(_){t("requesting workspace git pull for %s",_);try{let b=await be.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let ee=b?.status;if(ee==="up_to_date"){ge("Already up to date","success",2e3);return}if(ee==="stash_pop_conflict"){ge("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ge("Git pulled "+Zt(_),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let ee=b?.code,de=b?.message;if(ee==="rebase_conflict"){ge("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ee==="rebase_conflict_abort_failed"){ge("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ee==="busy"){ge("Git pull skipped: another operation is running","warning",3e3);return}let Be=de?`: ${de}`:"";throw ge(`Git pull failed${Be}`,"error",3e3),b}}async function Xt(_,b){t("setting workspace visibility %s \u2192 %s",_,String(b));try{await be.send("set-workspace-visibility",{path:_,visible:b}),await Bt()}catch(ee){t("workspace visibility update failed: %o",ee),ge("Failed to update project visibility","error",3e3)}}async function Bt(){try{let _=await be.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let b=_.workspaces.map(gt=>({path:gt.path,database:gt.database,pid:gt.pid,version:gt.version})),ee=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,de=Array.isArray(_.hidden)?_.hidden.filter(gt=>typeof gt=="string"):[];Ae.setState({workspace:{current:ee,available:b,hidden:de}});let Be=window.localStorage.getItem("beads-ui.workspace");Be&&(!b.some(Tt=>Tt.path===Be)||de.includes(Be)?window.localStorage.removeItem("beads-ui.workspace"):ee&&Be!==ee.path&&(t("restoring saved workspace preference: %s",Be),await Ft(Be)))}}catch(_){t("failed to load workspaces: %o",_)}}be.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(Ae.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Bt(),zt())});let Rt=!1;if(typeof be.onConnection=="function"){let _=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(Rt=!0,ge("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&Rt&&(Rt=!1,ge("Reconnected","success",2200),_w(Ae,(ee,de)=>{t(`${ee}: %o`,de)}),jt())};be.onConnection(_)}let Qt="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(Qt=_)}catch(_){t("view parse error: %o",_)}let Ae=Qc({config:fw(),view:Qt});be.on("worker-queue-snapshot",_=>{let b=_;if(!b||!b.queue)return;let ee=Ae.getState().workspace.current?.path;if(typeof ee=="string"&&ee.length>0&&b.root_dir!==ee){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{at.set(b.queue)}catch{}});let S=Yc(Ae);S.start();let fe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Le=async(_,b)=>{try{return await Ie(_,b)}catch(ee){if(fe.has(_))throw ee;return[]}};Bf({global_element:r,repo_element:o},Ae,S);let yt=document.getElementById("workspace-picker");yt&&M_(yt,Ae,Ft,kt,Xt);let Qe=Hf(e,(_,b)=>Ie(_,b));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>Qe.open())}catch{}let St=Vf(e,{policyStore:oe,queueStore:at,implPresetStore:se,transport:(_,b)=>Ie(_,b),onOpenChange:_=>{let b=Ye;Ye=_,ct(),b&&_===!1&&De.refreshSessionDefaults()},labelOptions:()=>{let _=new Set;for(let[b]of lc)for(let ee of Re.snapshotFor(b)||[]){let de=ee.labels;if(Array.isArray(de))for(let Be of de)typeof Be=="string"&&Be.length>0&&_.add(Be)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&(_.setAttribute("aria-label","\uC124\uC815"),_.setAttribute("title","\uC124\uC815"),_.addEventListener("click",()=>St.open()))}catch{}let x=document.createElement("div");x.className="md-viewer-root",document.body.appendChild(x);let I=na(x,{getWorkspacePath:()=>Ae.getState().workspace.current?.path}),Ge=fu(l,{gotoIssue:_=>S.gotoIssue(_),issueStores:Re,transport:Le,workerQueueStore:at,uiOrderStore:Q,displayPolicyStore:oe,closedRange:Ke,onClosedRangeChange:_=>{qt(_)},onNewIssue:()=>Qe.open(),openDoc:Te}),De=sc(a,{transport:Le,issueStores:Re,queueStore:at,sessionLogStore:pe,gotoIssue:_=>Ae.setState({selected_id:_}),getWorkspacePath:()=>Ae.getState().workspace.current?.path,switchWorkspace:_=>Ft(_),openDoc:Te,doneRange:Et,onDoneRangeChange:_=>{Lt(_)}}),f=Ff(u,{transport:Le,pipelineStore:lt,execPresetStore:se,sessionLogStore:pe,router:S,gotoIssue:_=>S.gotoIssue(_),getWorkspacePath:()=>Ae.getState().workspace.current?.path,switchWorkspace:_=>Ft(_),openDoc:Te}),h=lf(d,{issueStores:Re,transport:Le,queueStore:at,execPresetStore:se,sessionLogStore:pe,getWorkspacePath:()=>Ae.getState().workspace.current?.path,mdViewer:I,depCandidates:()=>{let _=lt.get();if(_===null)return null;let b=lt.getWorkspacesState(),ee=Ae.getState();if(ee.view==="monitor")return hl(_,b);let de=ee.workspace.current?.path;return de?hl(_,b,{root_dir:de}):null},subscribeCandidates:_=>lt.subscribe(_),onDepChanged:({type:_,a:b,b:ee})=>{let de=f;_==="dep-add"&&de&&typeof de.recorrectSharedLane=="function"&&de.recorrectSharedLane(_,b,ee)},onNavigate:(_,b)=>{let ee=()=>{Ae.getState().view==="worker"?Ae.setState({selected_id:_}):S.gotoIssue(_)},de=Ae.getState().workspace.current?.path;if(typeof b!="string"||b.length===0||!de||b===de){ee();return}Promise.resolve(Ft(b)).then(ee).catch(()=>{ge("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let _=Ae.getState();Ae.setState({selected_id:null});try{S.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{St.open("execution")}}),O=Ae.getState().selected_id;O&&(d.hidden=!1,h.load(O),He(O)),Ae.subscribe(_=>{let b=_.selected_id;b?(d.hidden=!1,h.load(b),U||He(b)):(h.clear(),d.hidden=!0,ft())});let D=_=>{l.hidden=_.view!=="board",a.hidden=_.view!=="worker",u.hidden=_.view!=="monitor",i&&i.classList.toggle("is-quiet",_.view==="monitor"),wt(_.view==="board"),Ue(_.view==="worker"),Ne(ot(_)),tt(_.view==="board"||_.view==="worker"||Ye||!!_.selected_id),!_.selected_id&&_.view==="board"&&Ge.load(),_.view==="worker"&&De.load(),_.view==="monitor"?f.load():f.pause(),window.localStorage.setItem("beads-ui.view",_.view)};Ae.subscribe(D),D(Ae.getState()),W(),mt(),xt(),Bt().finally(()=>{J=!0,Ze()}),window.addEventListener("keydown",_=>{let b=_.ctrlKey||_.metaKey,ee=String(_.key||"").toLowerCase(),de=_.target,Be=de&&de.tagName?String(de.tagName).toLowerCase():"",gt=Be==="input"||Be==="textarea"||Be==="select"||de&&typeof de.isContentEditable=="boolean"&&de.isContentEditable;b&&ee==="n"&&(gt||(_.preventDefault(),Qe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&bw(t)});export{bw as bootstrap,fw as readBootstrapConfig,_w as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
