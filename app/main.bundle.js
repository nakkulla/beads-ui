var _p=Object.create;var Do=Object.defineProperty;var mp=Object.getOwnPropertyDescriptor;var gp=Object.getOwnPropertyNames;var bp=Object.getPrototypeOf,hp=Object.prototype.hasOwnProperty;var yp=(e,t,r)=>t in e?Do(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var No=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var vp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of gp(t))!hp.call(e,s)&&s!==r&&Do(e,s,{get:()=>t[s],enumerable:!(n=mp(t,s))||n.enumerable});return e};var wp=(e,t,r)=>(r=e!=null?_p(bp(e)):{},vp(t||!e||!e.__esModule?Do(r,"default",{value:e,enumerable:!0}):r,e));var mt=(e,t,r)=>yp(e,typeof t!="symbol"?t+"":t,r);var Ji=No((Vb,Qi)=>{var mn=1e3,gn=mn*60,bn=gn*60,Xr=bn*24,xp=Xr*7,Ap=Xr*365.25;Qi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Sp(e);if(r==="number"&&isFinite(e))return t.long?Tp(e):Ep(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Sp(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Ap;case"weeks":case"week":case"w":return r*xp;case"days":case"day":case"d":return r*Xr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*bn;case"minutes":case"minute":case"mins":case"min":case"m":return r*gn;case"seconds":case"second":case"secs":case"sec":case"s":return r*mn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ep(e){var t=Math.abs(e);return t>=Xr?Math.round(e/Xr)+"d":t>=bn?Math.round(e/bn)+"h":t>=gn?Math.round(e/gn)+"m":t>=mn?Math.round(e/mn)+"s":e+"ms"}function Tp(e){var t=Math.abs(e);return t>=Xr?As(e,t,Xr,"day"):t>=bn?As(e,t,bn,"hour"):t>=gn?As(e,t,gn,"minute"):t>=mn?As(e,t,mn,"second"):e+" ms"}function As(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var tl=No((Kb,el)=>{function Cp(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=Ji(),r.destroy=u,Object.keys(e).forEach(d=>{r[d]=e[d]}),r.names=[],r.skips=[],r.formatters={};function t(d){let f=0;for(let g=0;g<d.length;g++)f=(f<<5)-f+d.charCodeAt(g),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(d){let f,g=null,x,A;function L(...z){if(!L.enabled)return;let ae=L,se=Number(new Date),q=se-(f||se);ae.diff=q,ae.prev=f,ae.curr=se,f=se,z[0]=r.coerce(z[0]),typeof z[0]!="string"&&z.unshift("%O");let N=0;z[0]=z[0].replace(/%([a-zA-Z%])/g,(j,m)=>{if(j==="%%")return"%";N++;let E=r.formatters[m];if(typeof E=="function"){let Y=z[N];j=E.call(ae,Y),z.splice(N,1),N--}return j}),r.formatArgs.call(ae,z),(ae.log||r.log).apply(ae,z)}return L.namespace=d,L.useColors=r.useColors(),L.color=r.selectColor(d),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(x!==r.namespaces&&(x=r.namespaces,A=r.enabled(d)),A),set:z=>{g=z}}),typeof r.init=="function"&&r.init(L),L}function n(d,f){let g=r(this.namespace+(typeof f>"u"?":":f)+d);return g.log=this.log,g}function s(d){r.save(d),r.namespaces=d,r.names=[],r.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?r.skips.push(g.slice(1)):r.names.push(g)}function o(d,f){let g=0,x=0,A=-1,L=0;for(;g<d.length;)if(x<f.length&&(f[x]===d[g]||f[x]==="*"))f[x]==="*"?(A=x,L=g,x++):(g++,x++);else if(A!==-1)x=A+1,L++,g=L;else return!1;for(;x<f.length&&f[x]==="*";)x++;return x===f.length}function a(){let d=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),d}function l(d){for(let f of r.skips)if(o(d,f))return!1;for(let f of r.names)if(o(d,f))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}el.exports=Cp});var rl=No((Bt,Ss)=>{Bt.formatArgs=Ip;Bt.save=Lp;Bt.load=Op;Bt.useColors=Rp;Bt.storage=Mp();Bt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Bt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Rp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Ip(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ss.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Bt.log=console.debug||console.log||(()=>{});function Lp(e){try{e?Bt.storage.setItem("debug",e):Bt.storage.removeItem("debug")}catch{}}function Op(){let e;try{e=Bt.storage.getItem("debug")||Bt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Mp(){try{return localStorage}catch{}}Ss.exports=tl()(Bt);var{formatters:Pp}=Ss.exports;Pp.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Ln=globalThis,ys=Ln.trustedTypes,Ni=ys?ys.createPolicy("lit-html",{createHTML:e=>e}):void 0,Fo="$lit$",kr=`lit$${Math.random().toFixed(9).slice(2)}$`,jo="?"+kr,kp=`<${jo}>`,Vr=document,On=()=>Vr.createComment(""),Mn=e=>e===null||typeof e!="object"&&typeof e!="function",Bo=Array.isArray,Wi=e=>Bo(e)||typeof e?.[Symbol.iterator]=="function",qo=`[ 	
\f\r]`,In=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qi=/-->/g,Fi=/>/g,Hr=RegExp(`>|${qo}(?:([^\\s"'>=/]+)(${qo}*=${qo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ji=/'/g,Bi=/"/g,zi=/^(?:script|style|textarea|title)$/i,Uo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Uo(1),Lr=Uo(2),jb=Uo(3),Xt=Symbol.for("lit-noChange"),$t=Symbol.for("lit-nothing"),Ui=new WeakMap,Gr=Vr.createTreeWalker(Vr,129);function Hi(e,t){if(!Bo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ni!==void 0?Ni.createHTML(t):t}var Gi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=In;for(let l=0;l<r;l++){let c=e[l],u,d,f=-1,g=0;for(;g<c.length&&(a.lastIndex=g,d=a.exec(c),d!==null);)g=a.lastIndex,a===In?d[1]==="!--"?a=qi:d[1]!==void 0?a=Fi:d[2]!==void 0?(zi.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=Hr):d[3]!==void 0&&(a=Hr):a===Hr?d[0]===">"?(a=s??In,f=-1):d[1]===void 0?f=-2:(f=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?Hr:d[3]==='"'?Bi:ji):a===Bi||a===ji?a=Hr:a===qi||a===Fi?a=In:(a=Hr,s=void 0);let x=a===Hr&&e[l+1].startsWith("/>")?" ":"";o+=a===In?c+kp:f>=0?(n.push(u),c.slice(0,f)+Fo+c.slice(f)+kr+x):c+kr+(f===-2?l:x)}return[Hi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Pn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,d]=Gi(t,r);if(this.el=e.createElement(u,n),Gr.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Gr.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(Fo)){let g=d[a++],x=s.getAttribute(f).split(kr),A=/([.?@])?(.*)/.exec(g);c.push({type:1,index:o,name:A[2],strings:x,ctor:A[1]==="."?ws:A[1]==="?"?ks:A[1]==="@"?$s:Yr}),s.removeAttribute(f)}else f.startsWith(kr)&&(c.push({type:6,index:o}),s.removeAttribute(f));if(zi.test(s.tagName)){let f=s.textContent.split(kr),g=f.length-1;if(g>0){s.textContent=ys?ys.emptyScript:"";for(let x=0;x<g;x++)s.append(f[x],On()),Gr.nextNode(),c.push({type:2,index:++o});s.append(f[g],On())}}}else if(s.nodeType===8)if(s.data===jo)c.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(kr,f+1))!==-1;)c.push({type:7,index:o}),f+=kr.length-1}o++}}static createElement(t,r){let n=Vr.createElement("template");return n.innerHTML=t,n}};function Kr(e,t,r=e,n){if(t===Xt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Mn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Kr(e,s._$AS(e,t.values),s,n)),t}var vs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Vr).importNode(r,!0);Gr.currentNode=s;let o=Gr.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new _n(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new xs(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=Gr.nextNode(),a++)}return Gr.currentNode=Vr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},_n=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=$t,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Kr(this,t,r),Mn(t)?t===$t||t==null||t===""?(this._$AH!==$t&&this._$AR(),this._$AH=$t):t!==this._$AH&&t!==Xt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Wi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$t&&Mn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Vr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Pn.createElement(Hi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new vs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Ui.get(t.strings);return r===void 0&&Ui.set(t.strings,r=new Pn(t)),r}k(t){Bo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(On()),this.O(On()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Yr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=$t,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=$t}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Kr(this,t,r,0),a=!Mn(t)||t!==this._$AH&&t!==Xt,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Kr(this,l[n+c],r,c),u===Xt&&(u=this._$AH[c]),a||(a=!Mn(u)||u!==this._$AH[c]),u===$t?t=$t:t!==$t&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===$t?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ws=class extends Yr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$t?void 0:t}},ks=class extends Yr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$t)}},$s=class extends Yr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Kr(this,t,r,0)??$t)===Xt)return;let n=this._$AH,s=t===$t&&n!==$t||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==$t&&(n===$t||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},xs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Kr(this,t)}},Vi={M:Fo,P:kr,A:jo,C:1,L:Gi,R:vs,D:Wi,V:Kr,I:_n,H:Yr,N:ks,U:$s,B:ws,F:xs},$p=Ln.litHtmlPolyfillSupport;$p?.(Pn,_n),(Ln.litHtmlVersions??(Ln.litHtmlVersions=[])).push("3.3.1");var Ke=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new _n(t.insertBefore(On(),o),o,void 0,r??{})}return s._$AI(e),s};var Ht="today",gr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Qt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Zr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Ki(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Yi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Zi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Xi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),l=e.get(a)||{lines:[],last_event_at:null};l.lines=[...l.lines,o],l.last_event_at=Date.now(),e.set(a,l),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var nl=wp(rl(),1);function yt(e){return(0,nl.default)(`beads-ui:${e}`)}function ar(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Qr(e,t){let r=ar(e.created_at),n=ar(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function al(e,t){let r=ar(e.created_at),n=ar(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function il(e,t){let r=ar(e.updated_at),n=ar(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ll(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=ar(e.created_at),o=ar(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function cl(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Dp=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function sl(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ol(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Dp.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ul(e,t){let r=sl(e),n=sl(t);if(r!==n)return r<n?-1:1;let s=ol(e),o=ol(t);if(s!==o)return s<o?-1:1;let a=ar(e&&e.created_at),l=ar(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Wo=2**20;function hn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-ar(e&&e.created_at)}function Es(e){return(t,r)=>{let n=hn(t,e),s=hn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function zo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:hn(l,r)-Wo};if(!l)return{rank:hn(a,r)+Wo};let c=hn(a,r),u=hn(l,r),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:n.map((f,g)=>({bead_id:f.id,rank:g*Wo}))}}function Ho(e,t={}){let r=yt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Qr;function u(){for(let g of Array.from(a))try{g()}catch{}}function d(){s=Array.from(n.values()).sort(c)}function f(g){if(l||!g||g.id!==e)return;let x=Number(g.revision)||0;if(r("apply %s rev=%d",g.type,x),!(x<=o&&g.type!=="snapshot")){if(g.type==="snapshot"){if(x<=o)return;n.clear();let A=Array.isArray(g.issues)?g.issues:[];for(let L of A)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);d(),o=x,u();return}if(g.type==="upsert"){let A=g.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let L=n.get(A.id);if(!L)n.set(A.id,A);else{let z=Number.isFinite(L.updated_at)?L.updated_at:0,ae=Number.isFinite(A.updated_at)?A.updated_at:0;if(z<=ae){for(let se of Object.keys(L))se in A||delete L[se];for(let[se,q]of Object.entries(A))L[se]=q}}d()}o=x,u()}else if(g.type==="delete"){let A=String(g.issue_id||"");A&&(n.delete(A),d()),o=x,u()}}}return{id:e,subscribe(g){return a.add(g),()=>{a.delete(g)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(g){return n.get(g)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Ts(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function dl(e){let t=yt("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],f=Array.isArray(c.updated)?c.updated:[],g=Array.isArray(c.removed)?c.removed:[];for(let x of Array.from(u)){let A=r.get(x);if(!A)continue;let L=A.itemsById;for(let z of d)typeof z=="string"&&z.length>0&&L.set(z,!0);for(let z of f)typeof z=="string"&&z.length>0&&L.set(z,!0);for(let z of g)typeof z=="string"&&z.length>0&&L.delete(z)}}async function o(l,c){let u=Ts(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let f=r.get(l);if(f&&f.key!==u){let g=n.get(f.key);g&&(g.delete(l),g.size===0&&n.delete(f.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let d=n.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(f){let g=r.get(l)||null;if(g){let x=n.get(g.key);x&&(x.delete(l),x.size===0&&n.delete(g.key))}throw r.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=r.get(l)||null;if(f){let g=n.get(f.key);g&&(g.delete(l),g.size===0&&n.delete(f.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ts,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function pl(){let e=yt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,d){let f=u?Ts(u):"",g=r.get(c)||"",x=t.has(c);if(e("register %s key=%s (prev=%s)",c,f,g),x&&g&&f&&g!==f){let A=t.get(c);if(A)try{A.dispose()}catch{}let L=s.get(c);if(L){try{L()}catch{}s.delete(c)}let z=Ho(c,d);t.set(c,z);let ae=z.subscribe(()=>o());s.set(c,ae)}else if(!x){let A=Ho(c,d);t.set(c,A);let L=A.subscribe(()=>o());s.set(c,L)}return r.set(c,f),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function fl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function _l(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ml(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Go(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Np(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function qp(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function gl(e){let t=yt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Np(n),a=qp(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Go(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Go(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Fp=Object.freeze({workspace_config:{default_workspace:null}});function bl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Fp.workspace_config.default_workspace}}}function hl(e={}){let t=yt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:bl(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?bl(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==r.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===r.worker.show_closed_children[d])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function yl(e){let t=yt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(f,g)=>{let x=s++,A=Date.now();n.set(x,{type:f,start_ts:A}),t("request start id=%d type=%s count=%d",x,f,r+1),a();let L=!1,z=()=>{L||(L=!0,n.delete(x),l())},ae=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",x,f,Date.now()-A),z())},3e4);try{let se=await u(f,g),q=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",x,f,q),se}catch(se){let q=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",x,f,q,se),se}finally{clearTimeout(ae),z()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function pe(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Cs(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(cl),c;switch(l){case"created_desc":return c.sort(Qr),c;case"created_asc":return c.sort(al),c;case"updated_desc":return c.sort(il),c;case"priority":return c.sort(ll),c;case"manual":default:{let u=r();return u?c.sort(Es(u)):c.sort(Qr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function It(e){let t=Jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Gt(e,t){let r=Jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function vl(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Rs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Is(e){let t=new Map;for(let n of e)n&&n.id&&!t.has(n.id)&&t.set(n.id,n);let r=new Map;for(let n of t.values()){let s=Rs(n);if(!s)continue;let o=r.get(s);o||(o=[],r.set(s,o)),o.push({id:n.id,title:n.title,status:n.status,metadata:n.metadata,workflow:n.workflow,created_at:n.created_at,updated_at:n.updated_at})}return r}function Ls(e,t){let r=e.get(t)||[],n=0;for(let o of r)(o.status==="resolved"||o.status==="closed")&&(n+=1);let s=vl(r);return{total:r.length,count:n,current:s,children:r}}function Os(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},d=n(zo(l,c,u.order),a);s(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(g);let x=n(zo(l,c,g.order),a);s(g,x);let A=await t("ui-order-set",{expected_revision:g.revision,entries:x});A&&A.applied&&r.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function Ms(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Vo(e,t){return!t||typeof e!="string"||e.length===0||Ms(t.visible_labels).includes(e)?!0:Ms(t.hidden_labels).includes(e)?!1:!Ms(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Ps(e,t){return Ms(e).filter(r=>Vo(r,t))}function Or(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}function jp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Bp(e,t,r,n,s){return i`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${n?"true":"false"}
    @click=${s}
  >
    children ${t}/${r} ${n?"\u25B4":"\u25BE"}
  </button>`}function Up(e,t,r,n){return i`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${n?s=>n(s,e.id):void 0}
  >
    <span class=${jp(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${r}
  </button>`}function Ds(e,t){let r=e.total||0,n=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(r===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],l=r>0?a.slice().sort(ul):a;return i`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?Bp(t.parent_id,e.count,r,n,t.onToggle):i`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${r>0&&e.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${n&&r>0?i`<div class="board-card__roll-list">
            ${l.map((c,u)=>Up(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Wp={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},kl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},wl={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},zp={review:"\u2713",skip:"\u2298"},Mr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Hp(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function $l(e){let t=e&&e.fill||"none";return t==="none"?Mr.none:e&&e.stale===!0?Mr.stale:t==="dim"?Mr.dim:e&&e.glyph==="review"?Mr.review:e&&e.glyph==="skip"?Mr.skip:Mr.done}function Gp(e){if(!e||e.fill==="none"||!e.approval_state)return $l(e);let t=[];return e.glyph==="review"?t.push(Mr.review):e.glyph==="skip"&&t.push(Mr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Vp(e,t,r){let n=Wp[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=zp[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${kl[e]||e}
      </div>
    </div>
  `}function Ns(e,t){if(!e||!e.stages)return"";let r=wl[e.route]||wl.spec_backed,n=e.stages,s=Hp(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${kl[a]||a} ${a==="plan"?Gp(n[a]||{}):$l(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Vp(a,n[a]||{},a===s))}
    </div>
  `}function Kp(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var xl=2;function Yp(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,xl).join(", "),s=r.length-xl,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ko(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Al(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function en(e){return`${e.kind}:${Al(e)}@${e.sha}`}function qs(e,t){if(!e)return null;let r=Ko(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Ko(t?.kind),a=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${en(t)}`:"";return{kind:e.kind,label:l,title:`${c}${u}`}}function Sl(e,t){let r=qs(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Zp(e){if(!e)return null;let t=Ko(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${en(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Xp(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Or(r,"route")){let l=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":n.route}</span
      >`)}if(n.fast_track&&Or(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Or(r,"pr")){let l=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=Sl(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let l=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${en(l)}`}
        >${`exec ${l.kind==="delegated"?Al(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let l=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Ps(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&Or(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Or(r,"blocked")&&s.push(...Yp(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Or(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function Qp(e){let t=Gt(e.created_at),r=Gt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${It(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${It(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Jp(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ds(r,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Qp(e),empty_label:"children \uC5C6\uC74C",childChips:Yo,onToggle:n=>t.onRollupToggle&&t.onRollupToggle(n,e.id),onChildClick:(n,s)=>t.onChildClick&&t.onChildClick(n,s)})}function Yo(e){let t=e?.workflow?.chips?.planned_execution,r=e?.workflow?.chips?.exec_receipt;return qs(t,r)?i`<span class="board-card__roll-child-chips">
    ${Sl(t,r)}
    ${Zp(r)}
  </span>`:null}function Fs(e,t){let r=Kp(e.priority);return i`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${n=>t.onCardClick(n,e.id)}
      @dragstart=${n=>t.onDragStart(n,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${n=>t.onCopyId(n,e.id)}
        >
          ${e.id}
        </button>
        ${r?i`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Xp(e,t)}
      ${e.workflow&&Or(t.policy||null,"stepper")?Ns(e.workflow,e.status):""}
      ${Jp(e,t)}
    </article>
  `}function yn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
    <section class=${n?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${r}\uAC74`}
            >${r}</span
          >
        </div>
        ${n?i`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${gr.map(o=>i`<option
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
        ${e.items.map(o=>Fs(o,t))}
      </div>
    </section>
  `}function El(e,t,r){return i`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${r.onOverlayClick}
      @cancel=${r.onClose}
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
            @click=${r.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Fs(n,t))}
        </div>
      </div>
    </dialog>
  `}var ef=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],tf=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],rf=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function nf(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${n>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${r.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${r.label_menu_open?i`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?i`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>i`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?i`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Tl(e,t,r){return i`
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
        ${ef.map(n=>i`<option
              value=${n.value}
              ?selected=${e.priority===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${tf.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${nf(e,t,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${r.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${rf.map(n=>i`<option
              value=${n.value}
              ?selected=${r.sort_mode===n.value}
            >
              ${n.label}
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
  `}var sf=200,of={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},af=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Cl="beads-ui.board.sort",Rl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function lf(){try{let e=window.localStorage.getItem(Cl);if(e&&Rl.has(e))return e}catch{}return"created_desc"}function Il(e,t){let r=yt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.closedRange||Ht,g=s?Cs(s,a):null,x=Os({transport:o,uiOrderStore:a}),A=[],L=[],z=[],ae=[],se=[],q=[],N=!1,I=0,j=lf(),m=new Map,E=new Map,Y=new Map,ue=new Set,oe={search:"",priority:"",type:"",labels:[]},de=!1,Ue=null;function et(W){return String(W.status||"open")==="open"}function qe(W){let re=String(W.status||"open");return re==="open"||re==="blocked"}function X(W){let re=oe.search.trim().toLowerCase(),be=oe.priority,k=oe.type,S=oe.labels;return W.filter(O=>{if(re){let J=String(O.id||"").toLowerCase(),Te=String(O.title||"").toLowerCase();if(!J.includes(re)&&!Te.includes(re))return!1}if(be!==""&&String(O.priority)!==be||k!==""&&String(O.issue_type||"")!==k)return!1;if(S.length>0){let J=Array.isArray(O.labels)?O.labels:[];if(!S.some(Te=>J.includes(Te)))return!1}return!0})}function te(){let W=new Set;for(let re of[A,L,z,ae,se,q])for(let be of re){let k=Array.isArray(be.labels)?be.labels:[];for(let S of k)typeof S=="string"&&S.length>0&&W.add(S)}return Array.from(W).sort()}function Ae(){return oe.search.trim()!==""||oe.priority!==""||oe.type!==""||oe.labels.length>0}function _e(){try{if(g){let W=g.selectBoardColumn("tab:board:in-progress","in_progress",j),re=g.selectBoardColumn("tab:board:blocked","blocked",j).filter(qe),be=new Set(W.map(je=>je.id)),k=g.selectBoardColumn("tab:board:ready","ready",j).filter(je=>et(je)&&!be.has(je.id)),S=g.selectBoardColumn("tab:board:resolved","resolved",j),O=g.selectBoardColumn("tab:board:deferred","deferred",j),J=g.selectBoardColumn("tab:board:closed","closed").slice(0,sf),Te=[...re,...k,...W,...S,...J];Pe(Te);let ye=new Set;for(let je of Te)je&&je.id&&!Rs(je)&&ye.add(je.id);let Ce=!Ae();A=Ce?Dn(re,ye):re,L=Ce?Dn(k,ye):k,z=Ce?Dn(W,ye):W,ae=Ce?Dn(S,ye):S,se=O,I=O.length,q=Ce?Dn(J,ye):J,m=new Map;for(let je of A)m.set(je.id,"open");for(let je of L)m.set(je.id,"open");for(let je of z)m.set(je.id,"in_progress");for(let je of ae)m.set(je.id,"resolved");for(let je of se)m.set(je.id,"deferred");for(let je of q)m.set(je.id,"closed");E=new Map;for(let je of A)E.set(je.id,"blocked-col");for(let je of L)E.set(je.id,"ready-col");for(let je of z)E.set(je.id,"in-progress-col");for(let je of ae)E.set(je.id,"resolved-col");for(let je of q)E.set(je.id,"closed-col")}H()}catch{A=[],L=[],z=[],ae=[],se=[],q=[],Y=new Map,H()}}function Pe(W){Y=Is(W)}function le(W){return Ls(Y,W)}function Me(W){return!ue.has(W)}function Oe(W,re){W.preventDefault(),W.stopPropagation(),ue.has(re)?ue.delete(re):ue.add(re),H()}function He(W,re){W.preventDefault(),W.stopPropagation(),n(re)}function $e(W,re){W.preventDefault(),W.stopPropagation(),n(re)}function Ve(W,re){Ue||n(re)}function it(W,re){W.preventDefault(),W.stopPropagation(),cf(re).then(be=>{be&&pe("\uBCF5\uC0AC\uB428","success",1200)})}function Ie(W,re){Ue=re,W.dataTransfer&&(W.dataTransfer.setData("text/plain",re),W.dataTransfer.effectAllowed="move"),W.target.classList.add("board-card--dragging")}function Je(W){W.target.classList.remove("board-card--dragging"),me(),setTimeout(()=>{Ue=null},0)}function G(W){let re=String(W.target.value||"");!re||re===f||(f=re,u&&u(re),H())}function Z(){return l?l.get():null}function xe(W){let re=c?c.get():null,be=re?re.cleanup_failed:null;if(!be||typeof be!="object"||Array.isArray(be))return null;let k=be[W];return!k||typeof k!="object"||Array.isArray(k)?null:k}let De={onCardClick:Ve,onCopyId:it,onDragStart:Ie,onDragEnd:Je,onClosedRangeChange:G,rollupFor:le,isExpanded:Me,onRollupToggle:Oe,onChildClick:He,onFromChipClick:$e,cleanupFailureFor:xe,get policy(){return Z()}};function We(W,re){Ue||(ke(),n(re))}function Ge(W,re){W.preventDefault(),W.stopPropagation(),ke(),n(re)}let ze={...De,onCardClick:We,onChildClick:Ge,onFromChipClick:Ge,get policy(){return Z()}};function ct(W){let re=W.target,be=e.querySelector(".board-filter__labels");re&&be&&be.contains(re)||V()}function pt(W){W.key==="Escape"&&V()}function U(){de||(de=!0,document.addEventListener("mousedown",ct),document.addEventListener("keydown",pt),H())}function V(){de&&(de=!1,document.removeEventListener("mousedown",ct),document.removeEventListener("keydown",pt),H())}function ve(W){W.key==="Escape"&&ke()}function ot(){N||(N=!0,document.addEventListener("keydown",ve),H())}function ke(){N&&(N=!1,document.removeEventListener("keydown",ve),H())}let T={onClose:ke,onOverlayClick(W){W.target===W.currentTarget&&ke()}},M={onSearchInput(W){oe.search=String(W.target.value||""),_e()},onPriorityChange(W){oe.priority=String(W.target.value||""),_e()},onTypeChange(W){oe.type=String(W.target.value||""),_e()},onSortChange(W){let re=String(W.target.value||"");if(!(!Rl.has(re)||re===j)){j=re;try{window.localStorage.setItem(Cl,re)}catch{}_e()}},onDeferredToggle(){N?ke():ot()},onLabelMenuToggle(){de?V():U()},onLabelToggle(W){let re=oe.labels.indexOf(W);re===-1?oe.labels.push(W):oe.labels.splice(re,1),_e()},onLabelClear(){oe.labels.length!==0&&(oe.labels=[],_e())},onNewIssue(){d&&d()}};function P(){return i`
      <div class="board-view">
        ${Tl(oe,M,{sort_mode:j,deferred_popup_open:N,deferred_count:I,label_options:te(),label_menu_open:de})}
        <div class="board-root">
          ${yn({title:"Blocked",id:"blocked-col",items:X(A)},De)}
          ${yn({title:"Ready",id:"ready-col",items:X(L)},De)}
          ${yn({title:"In progress",id:"in-progress-col",items:X(z)},De)}
          ${yn({title:"Resolved",id:"resolved-col",items:X(ae)},De)}
          ${yn({title:"Closed",id:"closed-col",items:X(q),is_closed:!0,closed_range:f},De)}
        </div>
        ${N?El({items:X(se),count:I},ze,T):""}
      </div>
    `}function H(){Ke(P(),e),ce()}function ce(){try{let W=e.querySelector("#deferred-popup");W&&!W.open&&(typeof W.showModal=="function"?W.showModal():W.setAttribute("open",""));let re=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let be of re)Array.from(be.querySelectorAll(".board-card")).forEach((S,O)=>{S.tabIndex=O===0?0:-1})}catch{}}async function y(W,re){if(!o){pe("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:W,status:re}),pe("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(be){r("update-status failed: %o",be),pe("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function C(W){switch(W){case"blocked-col":return A;case"ready-col":return L;case"in-progress-col":return z;case"resolved-col":return ae;default:return[]}}function D(W,re,be){if(!o||!a)return;let k=C(W),S=k.find(Ce=>Ce.id===re);if(!S)return;let O=k.filter(Ce=>Ce.id!==re),J=be.closest?be.closest(".board-card"):null,Te=O.length;if(J){let Ce=J.getAttribute("data-issue-id");if(Ce===re)return;let je=O.findIndex(Tt=>Tt.id===Ce);je>=0&&(Te=je)}let ye=O.slice();ye.splice(Te,0,S),x.applyReorder(re,ye,Te)}function me(){for(let W of Array.from(e.querySelectorAll(".board-column--drag-over")))W.classList.remove("board-column--drag-over")}let fe=null;e.addEventListener("dragover",W=>{W.preventDefault(),W.dataTransfer&&(W.dataTransfer.dropEffect="move");let be=W.target.closest(".board-column");be&&be!==fe&&(fe&&fe.classList.remove("board-column--drag-over"),be.classList.add("board-column--drag-over"),fe=be)}),e.addEventListener("dragleave",W=>{let re=W.relatedTarget;(!re||!e.contains(re))&&fe&&(fe.classList.remove("board-column--drag-over"),fe=null)}),e.addEventListener("drop",W=>{W.preventDefault(),fe&&(fe.classList.remove("board-column--drag-over"),fe=null);let re=W.target,be=re.closest(".board-column");if(!be)return;let k=W.dataTransfer?.getData("text/plain")||"";if(!k)return;let S=be.id,O=E.get(k);if(O&&O===S){if(af.has(S)){if(j!=="manual"){pe("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}D(S,k,re)}return}let J=of[S];if(!J){pe("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}m.get(k)!==J&&y(k,J)}),e.addEventListener("keydown",W=>{let re=W.target;if(!(re instanceof HTMLElement))return;let be=String(re.tagName||"").toLowerCase();if(be==="input"||be==="textarea"||be==="select"||be==="button"||be==="a"||re.isContentEditable===!0)return;let k=re.closest(".board-card");if(!k)return;let S=String(W.key||"");if(S==="Enter"||S===" "){W.preventDefault();let ye=k.getAttribute("data-issue-id");ye&&n(ye);return}if(S!=="ArrowUp"&&S!=="ArrowDown"&&S!=="ArrowLeft"&&S!=="ArrowRight")return;W.preventDefault();let O=k.closest(".board-column");if(!O)return;let J=Array.from(O.querySelectorAll(".board-card")),Te=J.indexOf(k);if(S==="ArrowDown"&&Te<J.length-1){Ee(k,J[Te+1]);return}if(S==="ArrowUp"&&Te>0){Ee(k,J[Te-1]);return}if(S==="ArrowLeft"||S==="ArrowRight"){let ye=Array.from(e.querySelectorAll(".board-column")),Ce=ye.indexOf(O),je=S==="ArrowRight"?1:-1,Tt=Ce+je;for(;Tt>=0&&Tt<ye.length;){let ht=ye[Tt].querySelector(".board-card");if(ht){Ee(k,ht);return}Tt+=je}}});function Ee(W,re){try{W.tabIndex=-1,re.tabIndex=0,re.focus()}catch{}}let Fe=null;g&&g.subscribe&&(Fe=g.subscribe(()=>{try{_e()}catch{}}));let Ye=null;l&&l.subscribe&&(Ye=l.subscribe(()=>{try{_e()}catch{}}));let Qe=null;return c&&c.subscribe&&(Qe=c.subscribe(()=>{H()})),{async load(){r("load"),_e()},clear(){V(),ke(),Fe&&(Fe(),Fe=null),Ye&&(Ye(),Ye=null),Qe&&(Qe(),Qe=null),e.replaceChildren(),A=[],L=[],z=[],ae=[],se=[],q=[],m=new Map,E=new Map}}}function Dn(e,t){return e.filter(r=>{let n=Rs(r);return!(n&&t.has(n))})}async function cf(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function ir(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function br(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Pr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function uf(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${br(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${br(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=d=>{typeof r.close=="function"&&r.close(),r.remove(),c(d)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function $r(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await uf(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var df=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Ll={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},pf=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Et(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function wt(e){return typeof e=="string"&&e.length>0?e:null}function vn(e){return e.startsWith("gpt-")?e.slice(4):e}function bt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Ml(e,t,r){let n=wt(t[e]);if(n!==null)return{value:n,source:"pin"};let s=wt(r[e]);return s===null?null:{value:s,source:"global"}}function Nn(e,t,r,n){return Ml(e,t,r)||{value:n,source:"base"}}function Zo(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Et(s?.[t])){let a=wt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Et(s)){for(let a of Object.values(s))if(Et(a)){let l=wt(a[e]);if(l!==null)return l}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return wt(n?.runners?.[o]?.models?.[e]?.id)||e}function ff(e,t){return wt(t?.review?.reviewers?.[e]?.model)||e}function wn(e,t,r=!1){if(e==="default")return bt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?vn(e):e;return bt(e,t,n,e,"explicit")}function Pl(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Et(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Et(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function _f(e,t){let r=[],n=e?.implementation?.model_catalog;Et(n)&&r.push(...Object.keys(n));let s=t?.runners;if(Et(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function mf(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of _f(t,r)){let o=Pl(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function Xo(e){return bt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ol(e,t,r){let n=Ml(e,t,r);return n?wn(n.value,n.source):bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function hr(e){let t=Et(e.pin)?e.pin:{},r=Et(e.global)?e.global:{},n=Et(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Et(n.session)?n.session:null,o=n?.supported===!0&&Et(n.orchestration)?n.orchestration:null,a=Et(e.runner_catalog)?e.runner_catalog:null,l=wt(r.quick_fix_impl_model),c=mf(l,s,a),u={};if(s){let d=Nn("workflow_mode",t,r,wt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?bt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):wn(d.value,d.source);for(let q of["spec_review","plan_review","impl_review"]){let N=`${q}_model`,I=wt(q==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),j=Nn(N,t,r,I);if(j.value===null)u[N]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(j.value!=="self"&&j.value!=="skip"&&!Et(s.review?.reviewers?.[j.value]))u[N]=Xo(bt(j.value,j.source,"",null,"explicit"));else{let m=ff(j.value,s);u[N]=bt(j.value,j.source,vn(m),m,j.source==="base"?"default":"explicit")}}for(let[q,N]of Object.entries(Ll)){let I=u[N].value;if(I==="self"||I==="skip"){u[q]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let j=wt(s.review?.reviewers?.[I||""]?.effort),m=Nn(q,t,r,j);u[q]=m.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(m.value,m.source,m.value,m.value,m.source==="base"?"default":"explicit")}let f=Et(s.implementation?.default)?s.implementation.default:{},g=wt(e.route),x=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),A=Et(s.implementation?.route_defaults)?s.implementation.route_defaults:{},L=x&&Et(A[g])?A[g]:{};for(let q of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=Nn(q,t,r,q==="impl_dispatch"?wt(L.dispatch)||wt(f.dispatch):wt(f[q.replace("impl_","")]));u[q]=N.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let z=wt(t.impl_runtime),ae=z==="inherit"?wt(e.controller_runtime):z,se=g==="quick_fix"&&wt(t.impl_dispatch)===null&&c.runtime!==null&&(z===null||ae===c.runtime);if(se){let q=c.runtime,N=l;u.impl_dispatch=bt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),z===null&&(u.impl_runtime=bt(q,"global",`${q} (\uC720\uB3C4)`,q,"explicit")),wt(t.impl_model)===null&&(u.impl_model=bt(N,"global",N,N,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let q of["impl_runtime","impl_model","impl_effort","impl_speed"])u[q]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!se&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let q=u.impl_runtime.value==="inherit"?wt(e.controller_runtime):u.impl_runtime.value,N=q?Pl(q,s,a):[];if(u.impl_model.value!=="auto"&&N.length>0&&!N.includes(u.impl_model.value))u.impl_model=Xo(u.impl_model);else{let I=Zo(u.impl_model.value,q,s,a);u.impl_model.display=vn(I),u.impl_model.full_value=I}}if(u.impl_effort.value==="auto"){let q=wt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=q?wt(s.implementation?.effort_by_transport?.[q]?.auto):null;N&&!pf.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):wn("default",u.impl_speed.source))}}else for(let d of df.filter(f=>!f.startsWith("orchestration_")))u[d]=Ol(d,t,r);if(!s){for(let[d,f]of Object.entries(Ll))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=Ol(d,t,r);continue}let f=d.replace("orchestration_",""),g=wt(o[f]),x=Nn(d,t,r,g);if(d==="orchestration_effort"&&x.source==="base"){u[d]=bt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(x.value===null){u[d]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let A=x.source==="base"?wt(o.model_id)||x.value:Zo(x.value,null,s,a);u[d]=bt(x.value,x.source,vn(A),A,x.source==="base"?"default":"explicit");continue}if(x.value==="default"){u[d]=x.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):wn("default",x.source);continue}u[d]=wn(x.value,x.source)}if(s)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=bt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${vn(d)})`,null,"default")}else if(c.runtime!==null){let d=Zo(l,c.runtime,s,a);u.quick_fix_impl_model=bt(l,"global",vn(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=Xo(bt(l,"global","",null,"explicit")):u.quick_fix_impl_model=wn(l,"global");return u}function gf(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function js(e){let t=Et(e.pin)?e.pin:{},r=Et(e.global)?e.global:{},n=Et(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=f=>{let g={...n,...f};return hr({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?r:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let l=s(a)[e.key],c=s(o)[e.key],u=wt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:gf(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(f=>{let g=s({...o,[e.key]:f})[e.key];return{value:f,label:g.display,full_value:g.full_value}})}}function kn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(l=>{let c=!1,u=f=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),l(f))},d=()=>u(n.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),d())}),t.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var jl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Lt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var xr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],qn=[...xr,"reasoning_output_tokens"],bf=["implementation","review-consult"];function Qo(e){let t=0;for(let r of xr)t+=Lt(e?.[r]);return t}function hf(e){return!e||typeof e!="object"?!1:xr.some(t=>Number.isFinite(e[t]))}function Dl(e){return!e||typeof e!="object"?!1:qn.some(t=>Number.isFinite(e[t]))}function yf(e){let t={};for(let r of qn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Nl(e){let t={};for(let r of qn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ql(e,t){return e==="codex"?Lt(t.input_tokens)+Lt(t.output_tokens):Qo(t)}function vf(e){return e==="claude"?"Claude":"Codex"}function wf(e){return`\u03C4 ${Bl(e)}`}function kf(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${Lt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Lt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Lt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Lt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Lt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Lt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${Lt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(jl),o.join(`
`)}function Ot(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${vf(r)} ${wf(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:kf(r,n)})}return t}function Us(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of qn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=Lt(l.breakdown[c])+Lt(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Jo(e){return!e||typeof e!="object"?null:Jt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function $f(e){return e==="codex"?"codex":"claude"}function Dr(){return{subtotal:0,breakdown:yf(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Bs(e,t,r){e.subtotal+=t.subtotal;for(let n of qn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Lt(e.breakdown[n])+Lt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Fl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Bl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function $n(e){return hf(e)?`\u03C4 ${Bl(Qo(e))}`:null}function lr(e){let t=$n(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function xn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Lt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Lt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Lt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Lt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Qo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(jl),r.join(`
`)}function Jt(e,t){let r={claude:Dr(),codex:Dr()},n={orchestrator:{claude:Dr(),codex:Dr()},implementation:{claude:Dr(),codex:Dr()},"review-consult":{claude:Dr(),codex:Dr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Dl(c)){let d=$f(l.runner),f=Nl(c),g={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:ql(d,f)};f.replayed===!0&&(g.replayed=!0),typeof l.model=="string"&&(g.model=l.model),typeof l.session_id=="string"&&(g.session_id=l.session_id),Bs(r[d],g,!0),Bs(n.orchestrator[d],g,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){if(!d||d.provider!=="codex"||!bf.includes(d.role)||!Dl(d.usage))continue;let f=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let g=Nl(d.usage),x={provider:"codex",role:d.role,attempt_id:String(l.attempt_id||""),usage:g,subtotal:ql("codex",g)};x.receipt_id=f,typeof d.model=="string"&&(x.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(x.effort=d.effort),typeof d.session_id=="string"?x.session_id=d.session_id:typeof d.thread_id=="string"&&(x.session_id=d.thread_id),typeof d.turn_id=="string"&&(x.turn_id=d.turn_id),typeof d.completed_at=="string"&&(x.completed_at=d.completed_at),g.replayed===!0&&(x.replayed=!0),Bs(r.codex,x,!1),Bs(n[x.role].codex,x,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=Fl(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let d=n[l][u];d.legs.length>0&&(c[u]={...Fl(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Zl,setPrototypeOf:Ul,isFrozen:xf,getPrototypeOf:Af,getOwnPropertyDescriptor:Sf}=Object,{freeze:Nt,seal:er,create:aa}=Object,{apply:ia,construct:la}=typeof Reflect<"u"&&Reflect;Nt||(Nt=function(t){return t});er||(er=function(t){return t});ia||(ia=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});la||(la=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Ws=qt(Array.prototype.forEach),Ef=qt(Array.prototype.lastIndexOf),Wl=qt(Array.prototype.pop),Fn=qt(Array.prototype.push),Tf=qt(Array.prototype.splice),Hs=qt(String.prototype.toLowerCase),ea=qt(String.prototype.toString),ta=qt(String.prototype.match),jn=qt(String.prototype.replace),Cf=qt(String.prototype.indexOf),Rf=qt(String.prototype.trim),cr=qt(Object.prototype.hasOwnProperty),Dt=qt(RegExp.prototype.test),Bn=If(TypeError);function qt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ia(e,t,n)}}function If(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return la(e,r)}}function st(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Hs;Ul&&Ul(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(xf(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Lf(e){for(let t=0;t<e.length;t++)cr(e,t)||(e[t]=null);return e}function Ar(e){let t=aa(null);for(let[r,n]of Zl(e))cr(e,r)&&(Array.isArray(n)?t[r]=Lf(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Ar(n):t[r]=n);return t}function Un(e,t){for(;e!==null;){let n=Sf(e,t);if(n){if(n.get)return qt(n.get);if(typeof n.value=="function")return qt(n.value)}e=Af(e)}function r(){return null}return r}var zl=Nt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ra=Nt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),na=Nt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Of=Nt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),sa=Nt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Mf=Nt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Hl=Nt(["#text"]),Gl=Nt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),oa=Nt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Vl=Nt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),zs=Nt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Pf=er(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Df=er(/<%[\w\W]*|[\w\W]*%>/gm),Nf=er(/\$\{[\w\W]*/gm),qf=er(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ff=er(/^aria-[\-\w]+$/),Xl=er(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),jf=er(/^(?:\w+script|data):/i),Bf=er(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ql=er(/^html$/i),Uf=er(/^[a-z][.\w]*(-[.\w]+)+$/i),Kl=Object.freeze({__proto__:null,ARIA_ATTR:Ff,ATTR_WHITESPACE:Bf,CUSTOM_ELEMENT:Uf,DATA_ATTR:qf,DOCTYPE_NAME:Ql,ERB_EXPR:Df,IS_ALLOWED_URI:Xl,IS_SCRIPT_OR_DATA:jf,MUSTACHE_EXPR:Pf,TMPLIT_EXPR:Nf}),Wn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Wf=function(){return typeof window>"u"?null:window},zf=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Yl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Jl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Wf(),t=Se=>Jl(Se);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Wn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:x}=e,A=c.prototype,L=Un(A,"cloneNode"),z=Un(A,"remove"),ae=Un(A,"nextSibling"),se=Un(A,"childNodes"),q=Un(A,"parentNode");if(typeof a=="function"){let Se=r.createElement("template");Se.content&&Se.content.ownerDocument&&(r=Se.content.ownerDocument)}let N,I="",{implementation:j,createNodeIterator:m,createDocumentFragment:E,getElementsByTagName:Y}=r,{importNode:ue}=n,oe=Yl();t.isSupported=typeof Zl=="function"&&typeof q=="function"&&j&&j.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:de,ERB_EXPR:Ue,TMPLIT_EXPR:et,DATA_ATTR:qe,ARIA_ATTR:X,IS_SCRIPT_OR_DATA:te,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:_e}=Kl,{IS_ALLOWED_URI:Pe}=Kl,le=null,Me=st({},[...zl,...ra,...na,...sa,...Hl]),Oe=null,He=st({},[...Gl,...oa,...Vl,...zs]),$e=Object.seal(aa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ve=null,it=null,Ie=Object.seal(aa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Je=!0,G=!0,Z=!1,xe=!0,De=!1,We=!0,Ge=!1,ze=!1,ct=!1,pt=!1,U=!1,V=!1,ve=!0,ot=!1,ke="user-content-",T=!0,M=!1,P={},H=null,ce=st({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),y=null,C=st({},["audio","video","img","source","image","track"]),D=null,me=st({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),fe="http://www.w3.org/1998/Math/MathML",Ee="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml",Ye=Fe,Qe=!1,W=null,re=st({},[fe,Ee,Fe],ea),be=st({},["mi","mo","mn","ms","mtext"]),k=st({},["annotation-xml"]),S=st({},["title","style","font","a","script"]),O=null,J=["application/xhtml+xml","text/html"],Te="text/html",ye=null,Ce=null,je=r.createElement("form"),Tt=function($){return $ instanceof RegExp||$ instanceof Function},ht=function(){let $=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ce&&Ce===$)){if((!$||typeof $!="object")&&($={}),$=Ar($),O=J.indexOf($.PARSER_MEDIA_TYPE)===-1?Te:$.PARSER_MEDIA_TYPE,ye=O==="application/xhtml+xml"?ea:Hs,le=cr($,"ALLOWED_TAGS")?st({},$.ALLOWED_TAGS,ye):Me,Oe=cr($,"ALLOWED_ATTR")?st({},$.ALLOWED_ATTR,ye):He,W=cr($,"ALLOWED_NAMESPACES")?st({},$.ALLOWED_NAMESPACES,ea):re,D=cr($,"ADD_URI_SAFE_ATTR")?st(Ar(me),$.ADD_URI_SAFE_ATTR,ye):me,y=cr($,"ADD_DATA_URI_TAGS")?st(Ar(C),$.ADD_DATA_URI_TAGS,ye):C,H=cr($,"FORBID_CONTENTS")?st({},$.FORBID_CONTENTS,ye):ce,Ve=cr($,"FORBID_TAGS")?st({},$.FORBID_TAGS,ye):Ar({}),it=cr($,"FORBID_ATTR")?st({},$.FORBID_ATTR,ye):Ar({}),P=cr($,"USE_PROFILES")?$.USE_PROFILES:!1,Je=$.ALLOW_ARIA_ATTR!==!1,G=$.ALLOW_DATA_ATTR!==!1,Z=$.ALLOW_UNKNOWN_PROTOCOLS||!1,xe=$.ALLOW_SELF_CLOSE_IN_ATTR!==!1,De=$.SAFE_FOR_TEMPLATES||!1,We=$.SAFE_FOR_XML!==!1,Ge=$.WHOLE_DOCUMENT||!1,pt=$.RETURN_DOM||!1,U=$.RETURN_DOM_FRAGMENT||!1,V=$.RETURN_TRUSTED_TYPE||!1,ct=$.FORCE_BODY||!1,ve=$.SANITIZE_DOM!==!1,ot=$.SANITIZE_NAMED_PROPS||!1,T=$.KEEP_CONTENT!==!1,M=$.IN_PLACE||!1,Pe=$.ALLOWED_URI_REGEXP||Xl,Ye=$.NAMESPACE||Fe,be=$.MATHML_TEXT_INTEGRATION_POINTS||be,k=$.HTML_INTEGRATION_POINTS||k,$e=$.CUSTOM_ELEMENT_HANDLING||{},$.CUSTOM_ELEMENT_HANDLING&&Tt($.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&($e.tagNameCheck=$.CUSTOM_ELEMENT_HANDLING.tagNameCheck),$.CUSTOM_ELEMENT_HANDLING&&Tt($.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&($e.attributeNameCheck=$.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),$.CUSTOM_ELEMENT_HANDLING&&typeof $.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&($e.allowCustomizedBuiltInElements=$.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),De&&(G=!1),U&&(pt=!0),P&&(le=st({},Hl),Oe=[],P.html===!0&&(st(le,zl),st(Oe,Gl)),P.svg===!0&&(st(le,ra),st(Oe,oa),st(Oe,zs)),P.svgFilters===!0&&(st(le,na),st(Oe,oa),st(Oe,zs)),P.mathMl===!0&&(st(le,sa),st(Oe,Vl),st(Oe,zs))),$.ADD_TAGS&&(typeof $.ADD_TAGS=="function"?Ie.tagCheck=$.ADD_TAGS:(le===Me&&(le=Ar(le)),st(le,$.ADD_TAGS,ye))),$.ADD_ATTR&&(typeof $.ADD_ATTR=="function"?Ie.attributeCheck=$.ADD_ATTR:(Oe===He&&(Oe=Ar(Oe)),st(Oe,$.ADD_ATTR,ye))),$.ADD_URI_SAFE_ATTR&&st(D,$.ADD_URI_SAFE_ATTR,ye),$.FORBID_CONTENTS&&(H===ce&&(H=Ar(H)),st(H,$.FORBID_CONTENTS,ye)),T&&(le["#text"]=!0),Ge&&st(le,["html","head","body"]),le.table&&(st(le,["tbody"]),delete Ve.tbody),$.TRUSTED_TYPES_POLICY){if(typeof $.TRUSTED_TYPES_POLICY.createHTML!="function")throw Bn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof $.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Bn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=$.TRUSTED_TYPES_POLICY,I=N.createHTML("")}else N===void 0&&(N=zf(x,s)),N!==null&&typeof I=="string"&&(I=N.createHTML(""));Nt&&Nt($),Ce=$}},tt=st({},[...ra,...na,...Of]),Pt=st({},[...sa,...Mf]),wr=function($){let ne=q($);(!ne||!ne.tagName)&&(ne={namespaceURI:Ye,tagName:"template"});let we=Hs($.tagName),ut=Hs(ne.tagName);return W[$.namespaceURI]?$.namespaceURI===Ee?ne.namespaceURI===Fe?we==="svg":ne.namespaceURI===fe?we==="svg"&&(ut==="annotation-xml"||be[ut]):!!tt[we]:$.namespaceURI===fe?ne.namespaceURI===Fe?we==="math":ne.namespaceURI===Ee?we==="math"&&k[ut]:!!Pt[we]:$.namespaceURI===Fe?ne.namespaceURI===Ee&&!k[ut]||ne.namespaceURI===fe&&!be[ut]?!1:!Pt[we]&&(S[we]||!tt[we]):!!(O==="application/xhtml+xml"&&W[$.namespaceURI]):!1},Ne=function($){Fn(t.removed,{element:$});try{q($).removeChild($)}catch{z($)}},jt=function($,ne){try{Fn(t.removed,{attribute:ne.getAttributeNode($),from:ne})}catch{Fn(t.removed,{attribute:null,from:ne})}if(ne.removeAttribute($),$==="is")if(pt||U)try{Ne(ne)}catch{}else try{ne.setAttribute($,"")}catch{}},Yt=function($){let ne=null,we=null;if(ct)$="<remove></remove>"+$;else{let _t=ta($,/^[\r\n\t ]+/);we=_t&&_t[0]}O==="application/xhtml+xml"&&Ye===Fe&&($='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+$+"</body></html>");let ut=N?N.createHTML($):$;if(Ye===Fe)try{ne=new g().parseFromString(ut,O)}catch{}if(!ne||!ne.documentElement){ne=j.createDocument(Ye,"template",null);try{ne.documentElement.innerHTML=Qe?I:ut}catch{}}let xt=ne.body||ne.documentElement;return $&&we&&xt.insertBefore(r.createTextNode(we),xt.childNodes[0]||null),Ye===Fe?Y.call(ne,Ge?"html":"body")[0]:Ge?ne.documentElement:xt},tr=function($){return m.call($.ownerDocument||$,$,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},rr=function($){return $ instanceof f&&(typeof $.nodeName!="string"||typeof $.textContent!="string"||typeof $.removeChild!="function"||!($.attributes instanceof d)||typeof $.removeAttribute!="function"||typeof $.setAttribute!="function"||typeof $.namespaceURI!="string"||typeof $.insertBefore!="function"||typeof $.hasChildNodes!="function")},fr=function($){return typeof l=="function"&&$ instanceof l};function Ct(Se,$,ne){Ws(Se,we=>{we.call(t,$,ne,Ce)})}let _r=function($){let ne=null;if(Ct(oe.beforeSanitizeElements,$,null),rr($))return Ne($),!0;let we=ye($.nodeName);if(Ct(oe.uponSanitizeElement,$,{tagName:we,allowedTags:le}),We&&$.hasChildNodes()&&!fr($.firstElementChild)&&Dt(/<[/\w!]/g,$.innerHTML)&&Dt(/<[/\w!]/g,$.textContent)||$.nodeType===Wn.progressingInstruction||We&&$.nodeType===Wn.comment&&Dt(/<[/\w]/g,$.data))return Ne($),!0;if(!(Ie.tagCheck instanceof Function&&Ie.tagCheck(we))&&(!le[we]||Ve[we])){if(!Ve[we]&&mr(we)&&($e.tagNameCheck instanceof RegExp&&Dt($e.tagNameCheck,we)||$e.tagNameCheck instanceof Function&&$e.tagNameCheck(we)))return!1;if(T&&!H[we]){let ut=q($)||$.parentNode,xt=se($)||$.childNodes;if(xt&&ut){let _t=xt.length;for(let At=_t-1;At>=0;--At){let p=L(xt[At],!0);p.__removalCount=($.__removalCount||0)+1,ut.insertBefore(p,ae($))}}}return Ne($),!0}return $ instanceof c&&!wr($)||(we==="noscript"||we==="noembed"||we==="noframes")&&Dt(/<\/no(script|embed|frames)/i,$.innerHTML)?(Ne($),!0):(De&&$.nodeType===Wn.text&&(ne=$.textContent,Ws([de,Ue,et],ut=>{ne=jn(ne,ut," ")}),$.textContent!==ne&&(Fn(t.removed,{element:$.cloneNode()}),$.textContent=ne)),Ct(oe.afterSanitizeElements,$,null),!1)},nr=function($,ne,we){if(ve&&(ne==="id"||ne==="name")&&(we in r||we in je))return!1;if(!(G&&!it[ne]&&Dt(qe,ne))){if(!(Je&&Dt(X,ne))){if(!(Ie.attributeCheck instanceof Function&&Ie.attributeCheck(ne,$))){if(!Oe[ne]||it[ne]){if(!(mr($)&&($e.tagNameCheck instanceof RegExp&&Dt($e.tagNameCheck,$)||$e.tagNameCheck instanceof Function&&$e.tagNameCheck($))&&($e.attributeNameCheck instanceof RegExp&&Dt($e.attributeNameCheck,ne)||$e.attributeNameCheck instanceof Function&&$e.attributeNameCheck(ne,$))||ne==="is"&&$e.allowCustomizedBuiltInElements&&($e.tagNameCheck instanceof RegExp&&Dt($e.tagNameCheck,we)||$e.tagNameCheck instanceof Function&&$e.tagNameCheck(we))))return!1}else if(!D[ne]){if(!Dt(Pe,jn(we,Ae,""))){if(!((ne==="src"||ne==="xlink:href"||ne==="href")&&$!=="script"&&Cf(we,"data:")===0&&y[$])){if(!(Z&&!Dt(te,jn(we,Ae,"")))){if(we)return!1}}}}}}}return!0},mr=function($){return $!=="annotation-xml"&&ta($,_e)},rt=function($){Ct(oe.beforeSanitizeAttributes,$,null);let{attributes:ne}=$;if(!ne||rr($))return;let we={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Oe,forceKeepAttr:void 0},ut=ne.length;for(;ut--;){let xt=ne[ut],{name:_t,namespaceURI:At,value:p}=xt,v=ye(_t),B=p,_=_t==="value"?B:Rf(B);if(we.attrName=v,we.attrValue=_,we.keepAttr=!0,we.forceKeepAttr=void 0,Ct(oe.uponSanitizeAttribute,$,we),_=we.attrValue,ot&&(v==="id"||v==="name")&&(jt(_t,$),_=ke+_),We&&Dt(/((--!?|])>)|<\/(style|title|textarea)/i,_)){jt(_t,$);continue}if(v==="attributename"&&ta(_,"href")){jt(_t,$);continue}if(we.forceKeepAttr)continue;if(!we.keepAttr){jt(_t,$);continue}if(!xe&&Dt(/\/>/i,_)){jt(_t,$);continue}De&&Ws([de,Ue,et],ee=>{_=jn(_,ee," ")});let h=ye($.nodeName);if(!nr(h,v,_)){jt(_t,$);continue}if(N&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!At)switch(x.getAttributeType(h,v)){case"TrustedHTML":{_=N.createHTML(_);break}case"TrustedScriptURL":{_=N.createScriptURL(_);break}}if(_!==B)try{At?$.setAttributeNS(At,_t,_):$.setAttribute(_t,_),rr($)?Ne($):Wl(t.removed)}catch{jt(_t,$)}}Ct(oe.afterSanitizeAttributes,$,null)},Zt=function Se($){let ne=null,we=tr($);for(Ct(oe.beforeSanitizeShadowDOM,$,null);ne=we.nextNode();)Ct(oe.uponSanitizeShadowNode,ne,null),_r(ne),rt(ne),ne.content instanceof o&&Se(ne.content);Ct(oe.afterSanitizeShadowDOM,$,null)};return t.sanitize=function(Se){let $=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ne=null,we=null,ut=null,xt=null;if(Qe=!Se,Qe&&(Se="<!-->"),typeof Se!="string"&&!fr(Se))if(typeof Se.toString=="function"){if(Se=Se.toString(),typeof Se!="string")throw Bn("dirty is not a string, aborting")}else throw Bn("toString is not a function");if(!t.isSupported)return Se;if(ze||ht($),t.removed=[],typeof Se=="string"&&(M=!1),M){if(Se.nodeName){let p=ye(Se.nodeName);if(!le[p]||Ve[p])throw Bn("root node is forbidden and cannot be sanitized in-place")}}else if(Se instanceof l)ne=Yt("<!---->"),we=ne.ownerDocument.importNode(Se,!0),we.nodeType===Wn.element&&we.nodeName==="BODY"||we.nodeName==="HTML"?ne=we:ne.appendChild(we);else{if(!pt&&!De&&!Ge&&Se.indexOf("<")===-1)return N&&V?N.createHTML(Se):Se;if(ne=Yt(Se),!ne)return pt?null:V?I:""}ne&&ct&&Ne(ne.firstChild);let _t=tr(M?Se:ne);for(;ut=_t.nextNode();)_r(ut),rt(ut),ut.content instanceof o&&Zt(ut.content);if(M)return Se;if(pt){if(U)for(xt=E.call(ne.ownerDocument);ne.firstChild;)xt.appendChild(ne.firstChild);else xt=ne;return(Oe.shadowroot||Oe.shadowrootmode)&&(xt=ue.call(n,xt,!0)),xt}let At=Ge?ne.outerHTML:ne.innerHTML;return Ge&&le["!doctype"]&&ne.ownerDocument&&ne.ownerDocument.doctype&&ne.ownerDocument.doctype.name&&Dt(Ql,ne.ownerDocument.doctype.name)&&(At="<!DOCTYPE "+ne.ownerDocument.doctype.name+`>
`+At),De&&Ws([de,Ue,et],p=>{At=jn(At,p," ")}),N&&V?N.createHTML(At):At},t.setConfig=function(){let Se=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(Se),ze=!0},t.clearConfig=function(){Ce=null,ze=!1},t.isValidAttribute=function(Se,$,ne){Ce||ht({});let we=ye(Se),ut=ye($);return nr(we,ut,ne)},t.addHook=function(Se,$){typeof $=="function"&&Fn(oe[Se],$)},t.removeHook=function(Se,$){if($!==void 0){let ne=Ef(oe[Se],$);return ne===-1?void 0:Tf(oe[Se],ne,1)[0]}return Wl(oe[Se])},t.removeHooks=function(Se){oe[Se]=[]},t.removeAllHooks=function(){oe=Yl()},t}var ec=Jl();var Sr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Gs=e=>(...t)=>({_$litDirective$:e,values:t}),An=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var zn=class extends An{constructor(t){if(super(t),this.it=$t,t.type!==Sr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$t||t==null)return this._t=void 0,this.it=t;if(t===Xt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};zn.directiveName="unsafeHTML",zn.resultType=1;var tc=Gs(zn);function pa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var rn=pa();function lc(e){rn=e}var Kn={exec:()=>null};function dt(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Ft.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Hf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ft={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Gf=/^(?:[ \t]*(?:\n|$))+/,Vf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Kf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Yn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Yf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,fa=/(?:[*+-]|\d{1,9}[.)])/,cc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,uc=dt(cc).replace(/bull/g,fa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Zf=dt(cc).replace(/bull/g,fa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),_a=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Xf=/^[^\n]+/,ma=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Qf=dt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ma).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Jf=dt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,fa).getRegex(),Qs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ga=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,e_=dt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ga).replace("tag",Qs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),dc=dt(_a).replace("hr",Yn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qs).getRegex(),t_=dt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",dc).getRegex(),ba={blockquote:t_,code:Vf,def:Qf,fences:Kf,heading:Yf,hr:Yn,html:e_,lheading:uc,list:Jf,newline:Gf,paragraph:dc,table:Kn,text:Xf},rc=dt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Yn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qs).getRegex(),r_={...ba,lheading:Zf,table:rc,paragraph:dt(_a).replace("hr",Yn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",rc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qs).getRegex()},n_={...ba,html:dt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ga).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Kn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:dt(_a).replace("hr",Yn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",uc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},s_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,o_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,pc=/^( {2,}|\\)\n(?!\s*$)/,a_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Js=/[\p{P}\p{S}]/u,ha=/[\s\p{P}\p{S}]/u,fc=/[^\s\p{P}\p{S}]/u,i_=dt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ha).getRegex(),_c=/(?!~)[\p{P}\p{S}]/u,l_=/(?!~)[\s\p{P}\p{S}]/u,c_=/(?:[^\s\p{P}\p{S}]|~)/u,u_=dt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Hf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),mc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,d_=dt(mc,"u").replace(/punct/g,Js).getRegex(),p_=dt(mc,"u").replace(/punct/g,_c).getRegex(),gc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",f_=dt(gc,"gu").replace(/notPunctSpace/g,fc).replace(/punctSpace/g,ha).replace(/punct/g,Js).getRegex(),__=dt(gc,"gu").replace(/notPunctSpace/g,c_).replace(/punctSpace/g,l_).replace(/punct/g,_c).getRegex(),m_=dt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,fc).replace(/punctSpace/g,ha).replace(/punct/g,Js).getRegex(),g_=dt(/\\(punct)/,"gu").replace(/punct/g,Js).getRegex(),b_=dt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),h_=dt(ga).replace("(?:-->|$)","-->").getRegex(),y_=dt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",h_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ys=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,v_=dt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ys).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),bc=dt(/^!?\[(label)\]\[(ref)\]/).replace("label",Ys).replace("ref",ma).getRegex(),hc=dt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ma).getRegex(),w_=dt("reflink|nolink(?!\\()","g").replace("reflink",bc).replace("nolink",hc).getRegex(),nc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ya={_backpedal:Kn,anyPunctuation:g_,autolink:b_,blockSkip:u_,br:pc,code:o_,del:Kn,emStrongLDelim:d_,emStrongRDelimAst:f_,emStrongRDelimUnd:m_,escape:s_,link:v_,nolink:hc,punctuation:i_,reflink:bc,reflinkSearch:w_,tag:y_,text:a_,url:Kn},k_={...ya,link:dt(/^!?\[(label)\]\((.*?)\)/).replace("label",Ys).getRegex(),reflink:dt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ys).getRegex()},ca={...ya,emStrongRDelimAst:__,emStrongLDelim:p_,url:dt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",nc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:dt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",nc).getRegex()},$_={...ca,br:dt(pc).replace("{2,}","*").getRegex(),text:dt(ca.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Vs={normal:ba,gfm:r_,pedantic:n_},Hn={normal:ya,gfm:ca,breaks:$_,pedantic:k_},x_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},sc=e=>x_[e];function Er(e,t){if(t){if(Ft.escapeTest.test(e))return e.replace(Ft.escapeReplace,sc)}else if(Ft.escapeTestNoEncode.test(e))return e.replace(Ft.escapeReplaceNoEncode,sc);return e}function oc(e){try{e=encodeURI(e).replace(Ft.percentDecode,"%")}catch{return null}return e}function ac(e,t){let r=e.replace(Ft.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Ft.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ft.slashPipe,"|");return n}function Gn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function A_(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ic(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function S_(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Zs=class{constructor(e){mt(this,"options");mt(this,"rules");mt(this,"lexer");this.options=e||rn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Gn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=S_(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Gn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Gn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Gn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=f,r.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let x=g,A=x.raw+`
`+r.join(`
`),L=this.blockquote(A);o[o.length-1]=L,n=n.substring(0,n.length-x.raw.length)+L.raw,s=s.substring(0,s.length-x.text.length)+L.text;break}else if(g?.type==="list"){let x=g,A=x.raw+`
`+r.join(`
`),L=this.list(A);o[o.length-1]=L,n=n.substring(0,n.length-g.raw.length)+L.raw,s=s.substring(0,s.length-x.raw.length)+L.raw,r=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),g=e.split(`
`,1)[0],x=!f.trim(),A=0;if(this.options.pedantic?(A=2,d=f.trimStart()):x?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,d=f.slice(A),A+=t[1].length),x&&this.rules.other.blankLine.test(g)&&(u+=g+`
`,e=e.substring(g.length+1),c=!0),!c){let L=this.rules.other.nextBulletRegex(A),z=this.rules.other.hrRegex(A),ae=this.rules.other.fencesBeginRegex(A),se=this.rules.other.headingBeginRegex(A),q=this.rules.other.htmlBeginRegex(A);for(;e;){let N=e.split(`
`,1)[0],I;if(g=N,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),I=g):I=g.replace(this.rules.other.tabCharGlobal,"    "),ae.test(g)||se.test(g)||q.test(g)||L.test(g)||z.test(g))break;if(I.search(this.rules.other.nonSpaceChar)>=A||!g.trim())d+=`
`+I.slice(A);else{if(x||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ae.test(f)||se.test(f)||z.test(f))break;d+=`
`+g}!x&&!g.trim()&&(x=!0),u+=N+`
`,e=e.substring(N.length+1),f=I.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=ac(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(ac(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Gn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=A_(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ic(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ic(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let d=[...n[0]][0].length,f=e.slice(0,s+n.index+d+a);if(Math.min(s,a)%2){let x=f.slice(1,-1);return{type:"em",raw:f,text:x,tokens:this.lexer.inlineTokens(x)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},ur=class ua{constructor(t){mt(this,"tokens");mt(this,"options");mt(this,"state");mt(this,"inlineQueue");mt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||rn,this.options.tokenizer=this.options.tokenizer||new Zs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ft,block:Vs.normal,inline:Hn.normal};this.options.pedantic?(r.block=Vs.pedantic,r.inline=Hn.pedantic):this.options.gfm&&(r.block=Vs.gfm,this.options.breaks?r.inline=Hn.breaks:r.inline=Hn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Vs,inline:Hn}}static lex(t,r){return new ua(r).lex(t)}static lexInline(t,r){return new ua(r).inlineTokens(t)}lex(t){t=t.replace(Ft.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Ft.tabCharGlobal,"    ").replace(Ft.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=r.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),g;this.options.extensions.startInline.forEach(x=>{g=x.call({lexer:this},f),typeof g=="number"&&g>=0&&(d=Math.min(d,g))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let d=r.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return r}},Xs=class{constructor(e){mt(this,"options");mt(this,"parser");this.options=e||rn}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Ft.notSpaceStart)?.[0],s=e.replace(Ft.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Er(n)+'">'+(r?s:Er(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Er(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let l=e.items[a];n+=this.listitem(l)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let s=0;s<e.header.length;s++)r+=this.tablecell(e.header[s]);t+=this.tablerow({text:r});let n="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];r="";for(let a=0;a<o.length;a++)r+=this.tablecell(o[a]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Er(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=oc(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Er(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=oc(e);if(s===null)return Er(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Er(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Er(e.text)}},va=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},dr=class da{constructor(t){mt(this,"options");mt(this,"renderer");mt(this,"textRenderer");this.options=t||rn,this.options.renderer=this.options.renderer||new Xs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new va}static parse(t,r){return new da(r).parse(t)}static parseInline(t,r){return new da(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Ks,Vn=(Ks=class{constructor(e){mt(this,"options");mt(this,"block");this.options=e||rn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?ur.lex:ur.lexInline}provideParser(){return this.block?dr.parse:dr.parseInline}},mt(Ks,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),mt(Ks,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ks),E_=class{constructor(...e){mt(this,"defaults",pa());mt(this,"options",this.setOptions);mt(this,"parse",this.parseMarkdown(!0));mt(this,"parseInline",this.parseMarkdown(!1));mt(this,"Parser",dr);mt(this,"Renderer",Xs);mt(this,"TextRenderer",va);mt(this,"Lexer",ur);mt(this,"Tokenizer",Zs);mt(this,"Hooks",Vn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Xs(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Zs(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Vn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];Vn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Vn.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await l.call(s,u);return c.call(s,f)})();let d=l.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(s,u);return f===!1&&(f=await c.apply(s,u)),f})();let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return ur.lex(e,t??this.defaults)}parser(e,t){return dr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?ur.lex:ur.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?dr.parse:dr.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?ur.lex:ur.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?dr.parse:dr.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Er(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},tn=new E_;function ft(e,t){return tn.parse(e,t)}ft.options=ft.setOptions=function(e){return tn.setOptions(e),ft.defaults=tn.defaults,lc(ft.defaults),ft};ft.getDefaults=pa;ft.defaults=rn;ft.use=function(...e){return tn.use(...e),ft.defaults=tn.defaults,lc(ft.defaults),ft};ft.walkTokens=function(e,t){return tn.walkTokens(e,t)};ft.parseInline=tn.parseInline;ft.Parser=dr;ft.parser=dr.parse;ft.Renderer=Xs;ft.TextRenderer=va;ft.Lexer=ur;ft.lexer=ur.lex;ft.Tokenizer=Zs;ft.Hooks=Vn;ft.parse=ft;var by=ft.options,hy=ft.setOptions,yy=ft.use,vy=ft.walkTokens,wy=ft.parseInline;var ky=dr.parse,$y=ur.lex;function Nr(e){let t=ft.parse(e),r=ec.sanitize(t);return tc(r)}function Tr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Sn(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function eo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var yc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},T_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},C_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,R_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function yr(e){return!!e&&typeof e=="object"}function wa(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ka(e,t){let r=wa(e),n=wa(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function vc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>yr(s)&&typeof s.text=="string"?s.text:"").join(""):yr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function I_(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:yc[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=wa(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ka(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=ka(yr(l)?l.old_string:"",yr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function $a(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function xa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=C_.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:R_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function L_(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(yr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(xa(o.text));else if(o.type==="thinking"){let a=$a(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=I_(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(yr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=vc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function O_(e){let t=typeof e.command=="string"?e.command:"",r=vc(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",r].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:yc.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function M_(e){if(e.type==="item.completed"&&yr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[xa(t.text)];if(t.type==="reasoning"){let r=$a(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[O_(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function P_(e){if(e.schema!=="codex-delegation-monitor-v1"||!yr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&yr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[xa(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let l=$a(r.text);return l?[l]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=T_[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function D_(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function N_(e){let t=e;if(typeof e=="string"){let r=e.trim();if(r.length===0)return null;try{t=JSON.parse(r)}catch{return null}}return yr(t)?t:null}function wc(){let e=new Map;return{push(t){let r=N_(t);return r?r.schema==="codex-delegation-monitor-v1"?P_(r):D_(r)?M_(r):L_(r,e):[]}}}function Aa(e){let t=[],r=wc(),n=Array.isArray(e)?e:[];for(let s of n)for(let o of r.push(s))t.push(o);return t}var q_=5,F_=10,j_=/Task\s+#(\d+)/,B_=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,U_=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function to(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function W_(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function z_(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function H_(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=j_.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function G_(e){if(e.tool==="Bash"){let t=e.command||"";return B_.test(t)?"~ PR/\uAC8C\uC2DC \uC911":U_.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function V_(e){let t=e.filter(s=>s.kind==="tool").slice(-F_),r=new Map;t.forEach((s,o)=>{let a=G_(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function K_(e){let t=z_(e);if(t)return{text:t,guess:!1};let r=H_(e);if(r)return{text:r,guess:!1};let n=V_(e);return n?{text:n,guess:!0}:null}function Y_(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Gt(e,t)}function ro(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,l=null,c=!1,u={},d=!0,f=new Set,g=new Set,x=null,A=null,L=!1,z=!1,ae=!1,se=null,q=null;function N(){L=!1,z=!1,ae=!1,se=null,q=null}async function I(G){if(r){z=!0,ae=!1,le();try{let Z=await Promise.resolve(r("get-attempt-prompt",{attempt_id:G}));if(o!==G)return;!Z||typeof Z!="object"||Array.isArray(Z)?ae=!0:(se=Z,q=G)}catch{o===G&&(ae=!0)}finally{o===G&&(z=!1,le())}}}function j(){if(L=!L,L&&o&&q!==o){I(o);return}le()}function m(){if(!L)return"";let G=Sn({loading:z,error:ae});if(G)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${G}
      </div>`;if(!se)return"";if(se.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Z=eo(se.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Z?i`<div class="prompt-block__meta">${Z} 발송</div>`:""}
      ${typeof se.task_prompt=="string"?Tr("\uACFC\uC5C5 (user)",se.task_prompt):""}
      ${typeof se.system_prompt=="string"?Tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",se.system_prompt):""}
    </div>`}function E(){if(!l||!n)return[];let G=n.get(l);return Aa(G?G.lines:[])}function Y(){if(!l||!n)return null;let G=n.get(l),Z=G?G.last_event_at:null;return typeof Z=="number"?Z:null}function ue(){return u.status==="running"}function oe(){if(ue()&&o){A||(A=setInterval(()=>le(),1e3));return}de()}function de(){A&&(clearInterval(A),A=null)}function Ue(G){let Z=[],xe=0;for(;xe<G.length;){let De=G[xe];if(De.kind==="tool"){let We=xe;for(;We<G.length&&G[We].kind==="tool"&&G[We].tool===De.tool;)We+=1;if(We-xe>=q_&&!g.has(xe)){Z.push({kind:"group",idx:xe,tool:De.tool||"",lines:G.slice(xe,We).map((Ge,ze)=>({idx:xe+ze,line:Ge}))}),xe=We;continue}}Z.push({kind:"line",idx:xe,line:De}),xe+=1}return Z}function et(G){for(let Z=G.length-1;Z>=0;Z-=1){let xe=G[Z];if(xe.kind==="result"||xe.kind==="error")return null;if(xe.kind==="tool"&&!Object.hasOwn(xe,"result"))return xe}return null}function qe(G){for(let Z=G.length-1;Z>=0;Z-=1)if(G[Z].kind==="thinking")return G[Z];return null}function X(G,Z){if(Z.kind==="gate")return i`<div class="sv__gate">${Z.text}</div>`;if(Z.kind==="phase")return i`<div class="sv__phase">${Z.text}</div>`;if(Z.kind==="result")return i`<div
        class="sv__result${Z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Nr(Z.text||(Z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Z.kind==="thinking"){let xe=f.has(G);return i`<div
        class="sv__think${xe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Oe(G)}
      >
        <span class="sv__think-line">💭 ${to(Z.text)}</span>
        ${xe?i`<pre class="sv__think-expand">${Z.text}</pre>`:""}
      </div>`}if(Z.kind==="error")return i`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="blocker")return i`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="tool"){let xe=f.has(G),De=Z.tool==="Bash"?W_(Z.command):0,We=Z.tool==="Bash"?De>1?to(Z.command):Z.command:Z.path||Z.command||"";return i`<div
        class="sv__tool${xe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Oe(G)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Z.icon}</span>
          <span class="sv__tool-name">${Z.tool}</span>
          ${We?i`<span class="sv__tool-detail">${We}</span>`:""}
          ${De>1?i`<span class="sv__tool-more">⋯ ${De}줄</span>`:""}
          ${typeof Z.added=="number"?i`<span class="sv__diff-add">+${Z.added}</span>`:""}
          ${typeof Z.removed=="number"?i`<span class="sv__diff-del">−${Z.removed}</span>`:""}
          ${Z.result?i`<span class="sv__tool-ok">→ ${Z.result}</span>`:""}
        </span>
        ${xe?i`<pre class="sv__tool-expand">${te(Z)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${Nr(Z.text||"")}</div>`}function te(G){let Z=[];if(G.tool==="Bash"&&typeof G.command=="string"&&G.command.length>0)Z.push(G.command);else if(G.input!==void 0)try{Z.push(`input: ${JSON.stringify(G.input,null,2)}`)}catch{}return typeof G.output=="string"&&G.output.length>0&&Z.push(`output:
${G.output}`),Z.join(`

`)}function Ae(){if(!o)return i``;let G=E(),Z=(a?[u.model,u.effort]:[u.runner,u.model,u.effort]).filter(Boolean).join(" \xB7 "),xe=u.session_id||"",De=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${d?"ON":"OFF"}`,We=ue(),Ge=We?Y_(Y(),Date.now()):"",ze=We?et(G):null,ct=We?qe(G):null,pt=K_(G);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?u.role||"":o}</span>
        ${pt?i`<span
              class="sv__stage${pt.guess?" sv__stage--guess":""}"
              title=${pt.text}
              >${pt.text}</span
            >`:""}
        ${We?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ge?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ge}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ge?i`<span class="sv__live-ago">${Ge}</span>`:""}</span
            >`:""}
        ${xe?i`<button
              type="button"
              class="sv__session"
              title=${xe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${xe}`}
              @click=${()=>$e(xe)}
            >
              ⧉ ${xe.slice(0,8)}
            </button>`:""}
        ${Z?i`<span class="sv__meta">${Z}</span>`:""}
        ${u.worktree?i`<span class="sv__wt" title=${u.worktree}
              >${u.worktree}</span
            >`:""}
        ${a||c?"":i`<button
              type="button"
              class="sv__prompt-toggle${L?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${L?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${j}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${d?" sv__follow--on":""}"
          aria-pressed=${d?"true":"false"}
          aria-label=${De}
          @click=${He}
        >
          <span class="sv__follow-full">⇣ ${De}</span>
          <span class="sv__follow-short">⇣ ${d?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Je()}
        >
          ✕
        </button>
      </div>
      ${a||c?"":m()}
      <div class="sv__body">
        ${G.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:Ue(G).map(U=>U.kind==="group"?_e(U):X(U.idx,U.line))}
      </div>
      ${ze||ct?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${ze?i`<span class="sv__now-icon">${ze.icon}</span>
                  <span class="sv__now-name">${ze.tool}</span>
                  <span class="sv__now-detail"
                    >${ze.tool==="Bash"?to(ze.command):ze.path||ze.command||""}</span
                  >`:""}
            ${ct?i`<span class="sv__now-think"
                  >💭 ${to(ct.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function _e(G){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Pe(G.idx)}
    >
      <span class="sv__group-icon">${G.lines[0].line.icon}</span>
      <span class="sv__group-name">${G.tool}</span>
      <span class="sv__group-count">${G.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Pe(G){g.add(G),le()}function le(){Ke(Ae(),e),oe(),d&&Me()}function Me(){let G=e.querySelector(".sv__body");G&&(G.scrollTop=G.scrollHeight)}function Oe(G){f.has(G)?f.delete(G):f.add(G),le()}function He(){d=!d,le()}function $e(G){ir(G).then(Z=>{Z?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ve(G){!o||!G||(u={...u,...G},le())}function it(G){let Z=G.target;if(!Z||!Z.classList||!Z.classList.contains("sv__body"))return;!(Z.scrollHeight-Z.scrollTop-Z.clientHeight<=4)&&d&&(d=!1,le())}e.addEventListener("scroll",it,!0);function Ie(G){let Z=G&&G.attempt_id;if(!Z)return;let xe=l;o=Z,a=typeof G.launch_id=="string"&&G.launch_id.length>0?G.launch_id:null,l=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&xe&&xe!==l&&Promise.resolve(r("unsubscribe-session-log",{id:xe})).catch(()=>{}),u=G.meta||{},c=G.hide_prompt===!0,d=!0,f.clear(),g.clear(),N(),!x&&n&&(x=n.subscribe(le)),r&&Promise.resolve(r("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),le()}function Je(){let G=l;o=null,a=null,l=null,c=!1,f.clear(),g.clear(),N(),de(),r&&G&&Promise.resolve(r("unsubscribe-session-log",{id:G})).catch(()=>{}),Ke(i``,e),s&&s()}return{open:Ie,updateMeta:Ve,close:Je,isOpen(){return o!==null},destroy(){de(),x&&(x(),x=null),e.removeEventListener("scroll",it,!0),o=null,a=null,l=null,c=!1,Ke(i``,e)}}}function no(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Sa(t.spec_id),s=Sa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Sa(e){return typeof e=="string"?e.trim():""}function kc(e){let t=no(e);if(t.path)return t;let r=Sa(Z_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function Z_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function X_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Q_(e){let t=e&&e.metadata||{},r=kc(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:X_(t)?null:"plan_pending"}),n}function $c(e,t){let r=Q_(e);return i`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?i`<div class="detail-empty">산출물 없음</div>`:i`
          ${r.map(n=>i`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                ${n.missing_state==="spec_draft"?i`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,n.path,n.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var J_="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",em=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,tm=/^\*\*결론\*\* — (.+)$/;function so(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==J_)return null;let r=em.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?tm.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var xc=20;function Ac(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function rm(e){return e.length>xc?`${e.slice(0,xc)}\u2026`:e}function nm(e,t,r,n){let s=`${t.lane} ${rm(t.identifier)}`;return i`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${n?"true":"false"}
      @click=${()=>r.onToggle&&r.onToggle(e.id)}
    >
      <span class="detail-report__tri">${n?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${s}</span
        >
        <span class="detail-report__time">${Ac(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${Nr(t.body)}
        </div>`:""}
  </div>`}function sm(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ac(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Nr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Sc(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=so(typeof c.text=="string"?c.text:"");return u?nm(c,u,t,s.has(c.id)):sm(c)})}
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
  `}var{I:sv}=Vi;var Ec=e=>e.strings===void 0;var om={},Tc=(e,t=om)=>e._$AH=t;var nn=Gs(class extends An{constructor(e){if(super(e),e.type!==Sr.PROPERTY&&e.type!==Sr.ATTRIBUTE&&e.type!==Sr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ec(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Xt||t===$t)return t;let r=e.element,n=e.name;if(e.type===Sr.PROPERTY){if(t===r[n])return Xt}else if(e.type===Sr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Xt}else if(e.type===Sr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Xt;return Tc(e),t}});var oo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ta=[...oo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Cr=["orchestration_model","orchestration_effort","orchestration_speed"],ao=[...oo,...Cr],am=Ta.filter(e=>ao.includes(e)),Cc=["delegated","main"],io=["inherit","claude","codex"],Zn=["default","fast"],Xn=["standard","fast_track"],Qn=["codex","opus","fable","self","skip"],lo=["codex","fable","skip"],co=["low","medium","high","xhigh"],Kt="auto";function Vt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Rc(e){if(!Vt(e)||!Vt(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))Vt(n)&&Vt(n.models)&&t.push([r,Object.keys(n.models)]);return t}function En(e,t){let r=Rc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Kt,...n.flatMap(([,s])=>s)]}function Ic(e,t,r,n){if(!Vt(e)||!Vt(e.runners))return[Kt];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!Vt(a)||!Vt(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[l,c]of Object.entries(a.models)){if(r&&r!==Kt&&l!==r)continue;let u=n(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Kt,...s]}function Tn(e,t,r){return Ic(e,t,r,(n,s)=>Vt(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function Ca(e,t,r){return Ic(e,t,r,(n,s)=>Vt(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:Vt(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function Jn(e,t){let r=Rc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Lc(e,t,r){let n={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:n.impl_runtime==="inherit"?r:null;return s&&(n.impl_model&&!En(t,s).includes(n.impl_model)&&(n.impl_model=void 0),n.impl_effort&&!Tn(t,s,n.impl_model||Kt).includes(n.impl_effort)&&(n.impl_effort=void 0)),n}var im={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ea=[...am,...Cr],lm=[...ao,...Ta].filter((e,t,r)=>r.indexOf(e)===t&&!Ea.includes(e));function Oc(e,t){let r=Vt(e)?e:{},n=Vt(t)?t:{},s=[];for(let a of Ea){let l=r[a]??null,c=n[a]??null;l!==c&&s.push({key:a,label:im[a]||a,before:l,after:c,kind:l===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...lm,...Object.keys(n)])!Ea.includes(a)&&!o.includes(a)&&Object.hasOwn(n,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ra(e,t,r,n,s,o){return js({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function Mc(e,t){let r={};for(let n of Ta){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Pc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Ia=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],qr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},uo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function La(e,t,r,n,s,o=null){let a=hr({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(l=>({key:l,...a[l]}))}function Dc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let l of La(e,t,r,n,s,o))a[l.source]+=1;return a}function Nc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function qc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var mv=[...oo,...Cr];var cm=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],um={pin:"pin",global:"global",base:"base"};function dm(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${um[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function pm(e,t,r){switch(e){case"workflow_mode":return Xn;case"spec_review_model":case"impl_review_model":return Qn;case"plan_review_model":return lo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return co;case"impl_dispatch":return Cc;case"impl_runtime":return io;case"impl_model":return En(r,t.impl_runtime);case"impl_effort":return Tn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Zn;case"orchestration_model":return Jn(r,null);case"orchestration_effort":return Tn(r,void 0,t.orchestration_model||Kt).filter(n=>n!==Kt);default:return[]}}function fm(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${dm(e.source)}
    <span class="detail-effective__k"
      >${qr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${uo[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${qr[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(r=>i`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function Fc(e,t){let r=Ia.flatMap(c=>c.keys),n=La(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Dc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(c=>[c.key,c])),a=Object.fromEntries(n.filter(c=>c.value!==null).map(c=>[c.key,c.value])),l=n.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return i`<details
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
      <span class="detail-effective__summary" title=${l}
        >${_m(o)}</span
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
    ${e.expanded?i`<div class="detail-effective__body">
          ${Ia.map(c=>i`
              <div class="detail-effective__subhead">${c.label}</div>
              ${n.filter(u=>c.keys.includes(u.key)).map(u=>{let d=js({key:u.key,choices:pm(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return fm(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${nn(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${c=>t.onPresetSelect(String(c.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(c=>i`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?i`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function _m(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function mm(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function jc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",l=mm(r.exec_receipt),c=l?en(l):a,u=l?`${l.kind}:${l.actor}`:a.split("@")[0],d=qs(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?i`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?i`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?i`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${d?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${d.kind}
            title=${d.title}
            >${d.label}</span
          >`:""}
      ${c?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${u}${l?.effort?i`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${l.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${cm.map(f=>{let g=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",x=n[f.id],A=g.length>0||x?.fill==="full",L=!A&&x?.fill==="dim",z=x?.stale===!0;return i`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${L?" detail-summary__gate--current":""}${z?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${g?i`<span class="detail-summary__gate-sha"
                >${g.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function zc(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Bc(e){return zc(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Uc(e,t){let r=e&&e[t];if(!zc(r)||!Array.isArray(r.accounts))return null;let n=r.accounts.filter(Bc),s=Bc(r.active)?r.active:null;return{accounts:n,active:s||n.find(o=>o.active===!0)||null}}function Hc(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function gm(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Hc(e)}${t}`}function Gc(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Hc(e)}`}function bm(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Gc({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Wc(e){let t=e.provider_key==="claude"?gm:Gc,r=!!e.provider?.accounts.some(n=>n.key===e.selected);return i`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${n=>e.handlers.onExecChange(e.key,n.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${bm(e.provider_key,e.provider)}
        </option>
        ${e.selected&&!r?i`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(n=>i`<option
              value=${n.key}
              ?selected=${n.key===e.selected}
            >
              ${t(n)}
            </option>`)||""}
      </select>
      ${e.hint?i`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":i`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Vc({md:e,catalog:t,handlers:r}){let n=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return i`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Wc({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Uc(t,"claude"),selected:n,handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Wc({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Uc(t,"codex"),selected:s,handlers:r})}
    </div>
  </section>`}var Kc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function es(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function po(e){if(!es(e)||!es(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>es(r)&&es(r.models));return t.length>0?t:null}function Rr(e,t){let r=po(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Yc(e,t){return es(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Zc(e,t){let r=po(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Yc(n,n.models[t]);return[]}function hm(e){let t=po(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Yc(n,s))r.includes(o)||r.push(o);return r}function ym(e,t){if(!t)return hm(e);let n=po(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Zc(e,o))s.includes(a)||s.push(a);return s}function Xc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Rr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Zc(t,n.impl_model):ym(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function vm(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Qc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c(A){A.key==="Escape"&&s&&(A.preventDefault(),g())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>g()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${vm(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${l}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Nr(a)}
          </div>
        </div>
      </div>
    `:i``}function d(){Ke(u(),e)}async function f(A,L={}){s=A,o="loading",a="",l="",d();let z=r?r():"";if(!z){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",d();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",d();return}let ae="/api/doc?workspace="+encodeURIComponent(z)+"&path="+encodeURIComponent(A);try{let se=await n(ae),q=await se.json().catch(()=>({}));if(!se.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&L.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",d();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||se.status)+")",d();return}a=String(q.content||""),o="ready",d()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",d()}}function g(){s=null,Ke(i``,e)}function x(){document.removeEventListener("keydown",c),g()}return{open:f,close:g,destroy:x}}var wm=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],eu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",fo=["implementation","review-consult"],km=["running","done","failed","interrupted"],$m={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function xm(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Am(e){let t=Ot(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=$n(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${eu}
          >부분 집계</span
        >`:""}`}function Jc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Oa(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ma(t):""}function Sm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!fo.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!km.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Em(e,t){let n=Ot({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?i`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${Oa(t.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
          >${Oa(t.completed_at)}</span
        >`:""}
    ${n?i`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Tm(e,t,r,n){let s=e.status==="running"?null:t,a=(s?Ot({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Ma(e.last_event_at):s?Oa(s.completed_at):"";return i`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${$m[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${["codex",e.model,e.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.session_id}
      >${e.session_id.slice(0,8)}</span
    >
    ${l?i`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${a?i`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Cm(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function Rm(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let f=Sm(d);!f||s.has(f.launch_id)||(s.add(f.launch_id),n.push(f))}n.sort((d,f)=>d.started_at-f.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let d of fo){let f=t.roles[d]?.codex;a[d]=f?[...f.legs]:[]}let l=fo.flatMap(d=>a[d]),c=new Set,u=[];for(let d of fo){for(let f of n.filter(g=>g.role===d)){let g=l.find(x=>x.receipt_id===f.launch_id)||null;g&&!Cm(f,g)||(g&&c.add(g.receipt_id),u.push(Tm(f,g,e.attempt_id,r)))}for(let f of a[d])c.has(f.receipt_id)||u.push(Em(d,f))}return u}function Im(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...wm,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${xm(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${eu}</span>`:""}
  </div>`}var Lm={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ma(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Om(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function tu(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let f=typeof u.session_id=="string"&&u.session_id.length>0,g=o.has(u.attempt_id),x=f&&!g,A=f?g?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!x}
      title=${A}
      @click=${L=>{L.stopPropagation(),x&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let f=u.cause_detail,g=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:u.cause;return i`<div class="detail-session__cause" title=${g}>
      ${u.cause}
    </div>`},c=u=>{let d=Jc(Jo(u));if(Ot(d).length===0&&!$n(u.usage))return"";let f=s.has(u.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${g=>{g.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${Am(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let d=Jo(u),f=Jc(d),g=Ot(f);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Lm[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${Pr(u)?i`<span
                  class="detail-session__resumed"
                  title=${Pr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${br(u)}</span>
            ${g.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${g.length>0?g.map(x=>i`<span
                      class="detail-session__usage"
                      title=${x.tooltip}
                      >${x.label}</span
                    >`):$n(u.usage)?i`<span class="detail-session__usage"
                    >${$n(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ma(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${Om(u)}
          ${s.has(u.attempt_id)&&u.usage?Im(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Rm(u,d,t)}
        </div>`})}
    </div>
  `}function ru(e,t={}){return i`
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
    ${e.expanded?i`<div class="detail-prompt" data-seam="task-prompt">
          ${Mm(e)}
        </div>`:""}
  `}function Mm(e){let t=Sn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Tr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=eo(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Tr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Pm=["open","in_progress","deferred","resolved","closed"],Dm=[0,1,2,3,4];function nu(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,f={},g="",x=!1,A=[],L=!1,z={},ae={claude:null,codex:null},se=null,q=0,N=!1,I=!1,j="",m="",E="";function Y(){N=!1,I=!1,j="",m="",E=""}function ue(){ae={claude:null,codex:null},se=null,q+=1}async function oe(w){try{let K=await fetch(w);if(!K.ok)return null;let R=await K.json();if(!R||typeof R!="object"||!Array.isArray(R.accounts))return null;let he=R.accounts.filter(at=>at!==null&&typeof at=="object"&&!Array.isArray(at));return{accounts:he,active:he.find(at=>at.active===!0)||null}}catch{return null}}async function de(w){se=w;let K=++q,[R,he]=await Promise.all([oe("/api/claude-usage"),oe("/api/codex-usage")]);K!==q||w!==u||(ae={claude:R,codex:he},ge())}let Ue=[],et=null,qe=null,X=!1,te="",Ae=!1,_e=0,Pe=new Set;function le(){Ue=[],et=null,qe=null,X=!1,te="",Ae=!1,_e+=1,Pe.clear()}async function Me(w){if(!s)return;let K=++_e;try{let R=await Promise.resolve(s("get-comments",{id:w}));if(K!==_e||w!==u)return;Ue=Array.isArray(R)?R:[],X=!1}catch{if(K!==_e||w!==u)return;X=!0}ge()}function Oe(){if(!s||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(et!==u){et=u,qe=w,Me(u);return}w!==null&&w!==qe&&(qe=w,Me(u))}function He(w){Pe.has(w)?Pe.delete(w):Pe.add(w),ge()}function $e(w){let K=te.trim().length===0;te=w,K!==(w.trim().length===0)&&ge()}async function Ve(){let w=te.trim();if(!s||!u||w.length===0||Ae)return;let K=u;Ae=!0,ge();let R=!1;try{let he=await Promise.resolve(s("add-comment",{id:K,text:w}));Array.isArray(he)&&he.length>0&&(R=!0,K===u&&(Ue=he,X=!1,te="",qe=he.length))}catch{R=!1}R||pe("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),K===u&&(Ae=!1),ge()}let it={onToggle:He,onDraftInput:$e,onSubmit:Ve},Ie=document.createElement("div");Ie.className="md-viewer-root",document.body.appendChild(Ie);let Je=Qc(Ie,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),G=document.createElement("div");G.className="session-log-root",document.body.appendChild(G);let Z=ro(G,{transport:s?(w,K)=>Promise.resolve(s(w,K)):void 0,sessionLogStore:c}),xe=!1,De=!1,We=!1,Ge=null,ze=null,ct=0;function pt(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function U(){xe=!1,De=!1,We=!1,Ge=null,ze=null,ct+=1}async function V(w){if(!s)return;let K=++ct;De=!0,We=!1,ge();try{let R=await Promise.resolve(s("get-bead-prompt",{bead_id:w}));if(K!==ct)return;!R||typeof R!="object"||Array.isArray(R)?We=!0:(Ge=R,ze=pt(w))}catch{K===ct&&(We=!0)}finally{K===ct&&(De=!1,ge())}}function ve(){if(xe=!xe,xe&&u&&ze!==pt(u)){Ge=null,V(u);return}ge()}function ot(){if(!a||!u)return[];let w=a.get();return(w&&w.attempts?Object.values(w.attempts):[]).filter(R=>R&&R.bead_id===u).sort((R,he)=>(he.started_at||0)-(R.started_at||0)).map(R=>({attempt_id:R.attempt_id,bead_id:R.bead_id,status:R.status,started_at:typeof R.started_at=="number"?R.started_at:null,runner:R.runner||null,model:R.model||null,effort:R.effort||R.observed_effort||null,speed:R.speed||null,session_id:R.session_id||null,resumed_from:R.resumed_from||null,continuation_mode:R.continuation_mode||null,dismissed_at:typeof R.dismissed_at=="number"?R.dismissed_at:null,cause:typeof R.cause=="string"?R.cause:null,cause_detail:R.cause_detail||null,exec_default_preset_id:typeof R.exec_default_preset_id=="string"?R.exec_default_preset_id:null,exec_default_preset_revision:typeof R.exec_default_preset_revision=="number"?R.exec_default_preset_revision:null,exec_values:R.exec_values&&typeof R.exec_values=="object"?R.exec_values:null,usage:R.usage||null,usage_legs:Array.isArray(R.usage_legs)?R.usage_legs:[],delegation_sessions:Array.isArray(R.delegation_sessions)?R.delegation_sessions:[]}))}function ke(){if(!a||!u)return null;let w=a.get();return Jt(w&&w.attempts||{},u)}let T=new Set;function M(w){T.has(w)?T.delete(w):T.add(w),ge()}function P(w){let K=a?a.get():null,R=K&&K.attempts?K.attempts[w]:null;Z.open({attempt_id:w,meta:R?{runner:R.runner||void 0,model:R.model||void 0,effort:R.effort||void 0,status:R.status||void 0,session_id:R.session_id||void 0}:{}})}function H(w,K){let R=a?a.get():null,he=R&&R.attempts?R.attempts[w]:null,nt=(he&&Array.isArray(he.delegation_sessions)?he.delegation_sessions:[]).find(Ze=>Ze&&typeof Ze=="object"&&Ze.launch_id===K);nt&&Z.open({attempt_id:w,launch_id:K,meta:{runner:"codex",role:nt.role,model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function ce(w){if(!s||!w)return;let K=await kn();if(K===null)return;let R=()=>{let Ze=a?a.get():null;return Ze&&typeof Ze.revision=="number"?Ze.revision:0},he=async(Ze={},Xe=R())=>await s("worker-attempt-resume",{attempt_id:w,expected_revision:Xe,...K!==""?{instructions:K}:{},...Ze}),at=Ze=>{Ze?.queue&&a?.set&&a.set(Ze.queue)},nt=await he();if(at(nt),nt&&nt.conflict){let Ze=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:R();nt=await he({},Ze),at(nt)}nt=await $r(nt,(Ze,Xe)=>he({continuation:Ze,decision_token:Xe}),{onResult:at,refresh:()=>he()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&pe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}let y={onOpen:P,onOpenDelegation:H,onResume:ce,onToggleUsage:M};function C(){let w=a?a.get():null,K={...z};for(let R of["orchestration_model","orchestration_effort","orchestration_speed"]){let he=w&&w[R];typeof he=="string"&&(K[R]=he)}return K}async function D(){if(s){try{let w=await Promise.resolve(s("get-session-defaults",{}));z=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{z={}}ge()}}function me(){let w=a?a.get():null;return w&&w.runner_catalog||null}function fe(){let w=a?a.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function Ee(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},R=hr({pin:{...w,...f},global:C(),execution_defaults:fe(),runner_catalog:me(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return Rr(me(),R)}function Fe(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function Ye(w){return w?.compatible===!1}function Qe(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function W(){let w=Fe(),K=w?.presets.find(R=>R.id===g);if(!(!s||!u||!w||!K||Ye(K)||x)){x=!0,A=[],ge();try{let R=await Promise.resolve(s("apply-impl-preset",qc(u,K.id,w.revision)));if(R&&R.conflict){Qe(R),pe("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let he=R&&Array.isArray(R.issue)?R.issue[0]:R?.issue;if(R&&R.applied&&he&&typeof he=="object"){d=he,A=Array.isArray(R.skipped_orchestration_keys)?R.skipped_orchestration_keys.filter(at=>typeof at=="string"):[];for(let at of Kc)delete f[at];pe(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}R&&R.error==="bd_readback_failed"?pe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):pe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(R){R&&typeof R=="object"&&R.code==="bd_readback_failed"?pe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):pe("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{x=!1,ge()}}}let re=null;r&&r.subscribe&&(re=r.subscribe(()=>O()));let be=null;a&&typeof a.subscribe=="function"&&(be=a.subscribe(()=>{u&&ge()}));let k=null;l&&typeof l.subscribe=="function"&&(k=l.subscribe(()=>{u&&ge()}));function S(w){w.key==="Escape"&&u&&(w.preventDefault(),n())}document.addEventListener("keydown",S);function O(){if(u){if(r&&typeof r.snapshotFor=="function"){let w=r.snapshotFor("detail:"+u)||[];d=w.find(R=>R&&R.id===u)||w[0]||d}Oe(),ge()}}function J(w){ir(w).then(K=>{K?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Te(w){w.preventDefault(),w.stopPropagation(),u&&J(u)}function ye(w,K){w.preventDefault(),w.stopPropagation(),J(K)}function Ce(w,K,R){w.preventDefault(),w.stopPropagation(),Je.open(K,{missing_state:R})}function je(w,K){f[w]=K,ge(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Nc(u,w,K.length===0?null:K))).catch(()=>{pe("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Tt(w,K){let R=d||{},he=R.metadata&&typeof R.metadata=="object"?R.metadata:{},at={};for(let Xe of["impl_runtime","impl_model","impl_effort"])at[Xe]=Object.hasOwn(f,Xe)?f[Xe]:typeof he[Xe]=="string"?he[Xe]:"";at[w]=K;let nt=Xc(at,me(),Ee()),Ze={};for(let Xe of["impl_runtime","impl_model","impl_effort"])Ze[Xe]=f[Xe],f[Xe]=nt[Xe]||"";ge(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...nt,orchestration_runtime:Ee()})).then(Xe=>{let kt=Array.isArray(Xe)?Xe[0]:Xe;if(!kt||typeof kt!="object"||!kt.id)throw new Error("implementation target readback failed");d=kt;for(let zt of["impl_runtime","impl_model","impl_effort"])delete f[zt];ge()}).catch(()=>{for(let Xe of["impl_runtime","impl_model","impl_effort"])Ze[Xe]===void 0?delete f[Xe]:f[Xe]=Ze[Xe];ge(),pe("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ht(w,K,R){if(!s||!u)return!1;try{let he=await Promise.resolve(s(w,K)),at=Array.isArray(he)?he[0]:he;return at&&typeof at=="object"&&at.id?(d=at,!0):(pe(R,"error"),!1)}catch{return pe(R,"error"),!1}}function tt(w){setTimeout(()=>{try{let K=e.querySelector(w);K&&typeof K.focus=="function"&&K.focus()}catch{}},0)}function Pt(){N=!0,j=d&&d.title||"",ge(),tt('.detail-edit__input[data-edit="title"]')}function wr(w){j=w.target.value}function Ne(){N=!1,j="",ge()}function jt(){ht("edit-text",{id:u,field:"title",value:j},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(K=>{K&&(N=!1,j=""),ge()})}function Yt(){I=!0,m=d&&d.description||"",ge(),tt('.detail-edit__textarea[data-edit="description"]')}function tr(w){m=w.target.value}function rr(){I=!1,m="",ge()}function fr(){ht("edit-text",{id:u,field:"description",value:m},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(K=>{K&&(I=!1,m=""),ge()})}function Ct(w,K,R,he){if(w.key==="Escape"){w.stopPropagation(),R();return}w.key==="Enter"&&(!he||w.ctrlKey||w.metaKey)&&(w.preventDefault(),K())}function _r(w){let K=w.target.value;ht("update-status",{id:u,status:K},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ge())}function nr(w){let K=Number(w.target.value);ht("update-priority",{id:u,priority:K},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ge())}function mr(w){E=w.target.value}function rt(){let w=E.trim();w.length!==0&&ht("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(K=>{K&&(E=""),ge()})}function Zt(w){if(w.key==="Escape"){w.stopPropagation(),E="",ge();return}w.key==="Enter"&&(w.preventDefault(),rt())}function Se(w){ht("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ge())}let $={onCopyPath:ye,onOpenDoc:Ce};function ne(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function we(w){switch(w&&typeof w=="object"?String(w.dependency_type||w.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function ut(w){let R=(Array.isArray(w.dependencies)?w.dependencies:[]).map(he=>({id:ne(he),icon:we(he)})).filter(he=>he.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${R.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${R.map(he=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(he.id)}
                  >
                    ${he.icon?`${he.icon} `:""}${he.id}
                  </button>`:i`<span class="detail-dep"
                    >${he.icon?`${he.icon} `:""}${he.id}</span
                  >`)}
          </div>`}
    `}function xt(w){let K=w.metadata||{},R=w.workflow||{},he=R.stages||{},at=he.spec&&he.spec.stale,nt=he.impl&&he.impl.stale,Ze=he.plan||null,Xe=R.route_source==="derived",kt=R.route||K.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Xe?" detail-kv__v--derived":""}"
          title=${Xe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Xe?"unset":kt}</span
        >
      </div>
      ${R.route!=="quick_fix"||Object.hasOwn(K,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${K.spec_review||"\uC5C6\uC74C"}${at?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${R.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ze?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ze?.approval_receipt||"\uC5C6\uC74C"}${Ze?.approval_state==="stale"?" \xB7 stale":Ze?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${R.route!=="quick_fix"||Object.hasOwn(K,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${K.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${R.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${R.planned_execution.kind}</span>
            </div>
            ${R.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${R.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${R.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${en(R.exec_receipt)}</span
            >
          </div>`:""}
      ${R.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${R.impl_entry.actor}@${R.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${K.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${K.pr_url}</span>
          </div>`:""}
    `}let _t={route:["quick_fix","spec_backed","full_plan"]};async function At(w,K){let R=K.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&R!=="full_plan"&&!window.confirm(`full_plan \u2192 ${R||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ge();return}await ht("update-workflow-meta",{id:u,key:w,value:R},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ge()}function p(w){let K=w.metadata||{};return i` ${((he,at)=>{let nt=_t[he],Ze=typeof K[he]=="string"?K[he]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${he}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${he}
          data-edit=${`wfmeta-${he}`}
          @change=${Xe=>At(he,Xe)}
        >
          <option value="" ?selected=${!nt.includes(Ze)}>
            ${at}
          </option>
          ${nt.map(Xe=>i`<option value=${Xe} ?selected=${Ze===Xe}>${Xe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function v(w,K){return N?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${j}
            @input=${wr}
            @keydown=${R=>Ct(R,jt,Ne,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${jt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ne}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${Ot(K).map(R=>i`<span class="detail-usage-total" title=${R.tooltip}
              >${R.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Pt}
        >
          ✎
        </button>
      </div>
    `}function B(w){let K=It(w.created_at),R=It(w.updated_at);return!K&&!R?i``:i`
      ${K?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${K}</span>
          </div>`:""}
      ${R?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${R}</span>
          </div>`:""}
    `}function _(w,K){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${_r}
        >
          ${Pm.map(R=>i`<option value=${R} ?selected=${R===w}>${R}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${nr}
        >
          ${Dm.map(R=>i`<option value=${String(R)} ?selected=${R===K}>
                P${R}
              </option>`)}
        </select>
      </div>
    `}function h(w){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${I?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Yt}
            >
              ✎
            </button>`}
      </div>
      ${I?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${m}
              @input=${tr}
              @keydown=${K=>Ct(K,fr,rr,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${fr}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${rr}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ee(w){let K=typeof w.notes=="string"?w.notes:"";return K.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${K}</div>
    `}function Q(w){let K=Array.isArray(w.labels)?w.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${K.map(R=>i`<span class="detail-label-chip"
              >${R}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${R}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+R}
                @click=${()=>Se(R)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${E}
            @input=${mr}
            @keydown=${Zt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${rt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Re(){if(!u)return i``;let w=d||{},K=String(w.id||u),R=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",he=ke(),at=w.status||"open",nt=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",Ze=w.description||"",Xe={...w,metadata:{...w.metadata||{},...f}};return i`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>n()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Te}
            >
              ${K}
            </button>
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>n()}
            >
              ✕
            </button>
          </div>
          ${v(R,he)}
          ${jc(Xe)}
          ${Fc({metadata:Xe.metadata,workspace_values:C(),catalog:me(),execution_defaults:fe(),expanded:L,presets:Fe()?.presets||[],preset_id:g,preset_busy:x,skipped_orchestration_keys:A},{onToggle:kt=>{L=kt,ge()},onEdit:(kt,zt)=>{if(kt==="impl_runtime"||kt==="impl_model"||kt==="impl_effort"){Tt(kt,zt??"");return}je(kt,zt??"")},onPresetSelect:kt=>{g=kt,A=[],ge()},onPresetApply:()=>{W()}})}
          ${Vc({md:Xe.metadata,catalog:ae,handlers:{onExecChange:je}})}
          ${_(at,nt)} ${B(w)}
          ${h(Ze)}
          ${Sc(Ue,it,{expanded:Pe,draft:te,sending:Ae,error:X})}
          ${ee(w)} ${Q(w)} ${ut(w)}
          ${xt(w)} ${p(w)}
          ${$c(w,$)}
          ${ru({expanded:xe,loading:De,error:We,data:Ge},{onToggle:ve})}
          ${tu(ot(),y,{total:he,expanded:T})}
        </div>
      </div>
    `}function ge(){Ke(Re(),e)}return{load(w){w!==u&&(f={},g="",A=[],L=!1,Y(),le(),U(),ue()),u=w,d=null,O(),D(),se!==w&&de(w)},clear(){u=null,d=null,f={},g="",x=!1,A=[],L=!1,Y(),le(),U(),ue(),Je.close(),Z.close(),Ke(i``,e)},destroy(){re&&(re(),re=null),be&&(be(),be=null),k&&(k(),k=null),document.removeEventListener("keydown",S),Je.destroy(),Ie.parentNode&&Ie.parentNode.removeChild(Ie),Z.destroy(),G.parentNode&&G.parentNode.removeChild(G),u=null,d=null,ue(),g="",x=!1,A=[],le(),U(),Ke(i``,e)}}}function su(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,f="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=d||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(s&&(g.length>0?(s.textContent=g,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function _o(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function mo(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function ou(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,l=o.finished_at;typeof a!="number"||typeof l!="number"||!Number.isFinite(a)||!Number.isFinite(l)||l<a||(r+=l-a,n=!0)}return n?r:null}function go(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Nm(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:_o(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function au(e,t){let r=Nm(e,t);return r?i`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?i`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?It(r.deploy.at):""}
            >${go(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${mo(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Cn(e){let t=Gt(e.created_at),r=Gt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${It(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${It(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function qm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function ts(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function bo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function vr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,g)=>(f.requested_at||0)-(g.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?qm(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:d}}function Ir(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?i`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?i`<code>백업: ${n}</code>`:t.error?i`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?i`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?i`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Fm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function iu(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function l(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Fm[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function ho(e){return!e||!e.orchestration&&!e.worker?"":i`${e.orchestration?i`<span
        class="exec-chip exec-chip--orch"
        title=${e.orchestration.title}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?i`<span class="exec-chip exec-chip--worker" title=${e.worker.title}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function Pa(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Ot(e.usage),s=lr(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?Gt(e.done_at):"",u=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",g=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",x=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=i`<span class="worker-mini__title">${e.title}</span>`,L=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",z=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",ae=r.map(X=>X===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${X}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${X===e.completion_badge&&e.completion_title||""}
          >${X}</span
        >`),se=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",q=n.length>0?n.map(X=>i`<span class="worker-usage" title=${X.tooltip}
              >${X.label}</span
            >`):s?i`<span class="worker-usage" title=${xn(e.usage)}
            >${s}</span
          >`:"",N=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",I=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",j=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",m=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",E=e.discard,Y=E?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${E?.attempt_id||""}
          data-operation-id=${E?.operation?.operation_id||""}
          data-discard-mode=${E?.confirmation||"unmerged"}
          ?disabled=${E?!E.enabled:e.discard_enabled===!1}
          title=${E?E.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${E?.label||"\uD3D0\uAE30"}
        </button>`:"",ue=e.stale_work||null,oe=ue?i`${ue.can_resume||ue.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ue.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ue.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            다시 확인
          </button>`:""}`:"",de=ue?i`<div class="worker-mini__stale">
        <strong>${ue.title}</strong>
        <span>${ue.summary}</span>
        <span>${ue.cause}</span>
        ${ue.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Ue=e.revise_action?i`<button
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
        </button>`:"",et=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?i`<div class="worker-mini__exec">
          ${ho(e.exec_chips)}
        </div>`:"",qe=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||E?.operation||e.revise_action||ue);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${g}${x}${A}</div>
          <div class="worker-mini__row2">
            ${q}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${It(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${mo(e.work_ms)}</span
                >`:""}${ae}${N}
            <span class="worker-mini__actions"
              >${I}${j}${m}${Y}</span
            >
            ${Cn(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${d}${g}${x}${L}${z}${ae}${f}${se}
            </div>
            <div class="worker-mini__body">${A}${de}</div>
            ${et}${qe?i`<div class="worker-mini__foot">
                  ${q}${N}
                  <span class="worker-mini__actions"
                    >${I}${j}${m}${Y}${Ue}${oe}</span
                  >
                  ${Ir(e)}
                </div>`:""}
            ${Cn(e)}`:i`<div class="worker-mini__line">
              ${u}${d}${g}${x}${A}${L}${z}${ae}${f}${se}${q}${N}${I}${j}${m}${Y}
            </div>
            ${et}${Ir(e)} ${Cn(e)}`}
  </div>`}function jm(e,t=null){let r=e.worker_ineligible===!0,n=e.draggable&&!e.done&&!r,s=n&&t&&t.bead_id===e.id,o=e.workflow,a=o&&o.chips||{},l=a.route||o&&o.route,c=a.route_source==="derived"||!!(o&&o.route_source==="derived"),u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
    class="worker-card${n?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${n?i`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?i`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r?i`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${o&&l?i`<span
            class="ctl-chip ctl-chip--route${c?" is-derived":""}"
            title=${c?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${c?"unset":l}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${o?Ns(o,e.status):""}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?i`<div class="worker-mini__exec">
          ${ho(e.exec_chips)}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?i`<div class="worker-card__place-menu">
            ${t.lanes.map(f=>i`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${f.id}
                  title="${f.label} 대기 맨 뒤에 추가"
                >
                  <span>${f.label}</span>
                  <span class="worker-card__place-count">${f.count}</span>
                </button>`)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:i`${e.reason?i`<span
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
              ?disabled=${!n}
              title=${n?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${Cn(e)}
  </div>`}function pr(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?i`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return i`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?i`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:i`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":i`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?i`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?jm(n,e.place_menu):Pa(n))}
          </div>`}
  </section>`}function Da(e,t){return`${e}\0${t}`}function Na(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function Bm(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Um(e,t){return e==="internal"&&t===void 0}function lu(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function cu(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${lu(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Bm(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:Um(a,s)}}function uu(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let l of t)for(let c of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Da(l.root_dir,c.id);r.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])n.set(d.id,u)}for(let l of t)for(let c of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Da(l.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,g=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],x=s.get(u);if(x)for(let A of g){let L=n.get(A);L&&L!==u&&!x.includes(L)&&x.push(L)}}let o=(l,c)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===c)return!0;!f||u.has(f)||(u.add(f),d.push(...s.get(f)||[]))}return!1},a=new Map;for(let[l,c]of s){let u=[];for(let d of c){let f=r.get(d);o(d,l)&&f&&u.push(f)}u.length>0&&a.set(l,u)}return a}function du(e){let t=Na(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=lu(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function pu(e,t){return Da(e,t)}var fu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],rs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function yo(e,t){let r=fu.find(s=>s.step===e);if(!r)return null;let n=fu.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function _u(e){let t=rs.findIndex(r=>r.step===e);return rs.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function sn(e){let t=rs.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Wm(e){let t=rs.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:rs.length}}function vo(e){let t=Wm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Fa=new Set(["queued","running","retry_pending","repairing"]),mu=new Set(["failed","succeeded"]),zm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},ns={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Hm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ns.base_containment,child_sweep:ns.child_sweep,branch_cleanup:ns.branch_cleanup,parent_close:ns.parent_close};function Gm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Vm(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Fa,...mu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Km(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let l=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(c)}function qa(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=zm[s];if(!o)return null;let a=yo(r,`${n} ${o}`);return a?{...a,active:Fa.has(s),failed:s==="failed"}:null}function Ym(e){return!e||typeof e!="object"?null:Hm[e.step]||null}function ss(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Ym(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),l=Gm(e.merge_sha)?e.merge_sha:null,c=!o&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&Vm(A,t,l)).sort(Km):[],u=a?c:[],d=u.find(A=>Fa.has(A.state));if(d)return qa(d);if(s)return s.step==="repo_operations"&&c[0]?qa(c[0],!0):null;let f=u.find(A=>mu.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return qa(f);if(n){let A=yo(n.step,n.label);return A?{...A,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?ns[e.cleanup_cursor]:null;if(!g)return null;let x=yo(g.step,g.label);return x?{...x,active:!0,failed:!1}:null}function wo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var gu={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},bu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function hu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ja(e){for(let t of hu(e))if(Object.hasOwn(gu,t))return gu[t];return null}function Ba(e){let t=null;for(let r of hu(e))Object.hasOwn(bu,r)&&(t=bu[r]);return t}function ko(e){let t=ja(e),r=Ba(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function yu(e,t){let r=ja(e)??ja(t),n=Ba(t)??Ba(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var vu=160;function Zm(e){return e.length>vu?`${e.slice(0,vu)}\u2026`:e}function Xm(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Zm(e.command)}</code>`:""}
  </div>`}function Qm(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Ua(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function wu(e){let t=e.failure?ko(e.failure.reason):"";return i`<div class="worker-banners">
    ${e.failure?i`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?i`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?i`<button
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
          ${e.failure.resume_attempt_id?i`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Xm(e.failure.cause_detail)}
          ${Qm(e.failure.reason)}
          ${Ir({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Jm(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ua(t-e.started_at):"\u2014",a=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,l=Pr(e),c=Ot(e.usage),u=lr(e.usage),d=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,f=e.base_exception||null,g=e.landing,x=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${x?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${l?i`<span class="rtile__resumed" title=${l}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?i`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${A}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 알림 닫기 — 레인에는 남습니다"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:i`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?i`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:i`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${A}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.rollup?Ds(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Yo}):""}
    ${g?i`<div class="rtile__landing">
          <span
            class="merge-step${g.failed?" merge-step--failed":""}"
            style=${`--progress: ${g.percent}%`}
            >${g.label}${g.index>0?i`<span class="merge-step__n"
                  >${g.index}/${g.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||c.length>0||u||d||f?i`<div class="rtile__meta">
          ${d?i`<span class="worker-mini__badge">${d}</span>`:""}
          ${f?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${f}</span
              >`:""}
          ${ho(e.exec_chips)}
          ${c.length>0?c.map(L=>i`<span class="worker-usage" title=${L.tooltip}
                    >${L.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${xn(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Cn(e)} ${Ir(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Wa(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Jm(s,t,r))}
  </div>`}function on(e){return i`<svg
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
  </svg>`}function za(){return on(Lr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ha(){return on(Lr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ku(){return on(Lr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function $u(){return on(Lr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function xu(){return on(Lr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Au(){return on(Lr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Su(){return on(Lr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var os=1,eg=6e4,tg={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},rg=new Set(["auto_merge","merged","merge","done"]),Eu={running:3,paused:2,failed:1};function ng(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function sg(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),g=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!g&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let f=Eu[u.run_state],g=Eu[l];if(f>g||f===g&&(u.started_at??0)>(c??0))continue}let d=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Jt(e,a.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!n.has(a.attempt_id)})}return o}function Tu(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Mt(e){return e&&typeof e=="object"?e:{}}function Ga(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let m of s)m&&typeof m.root_dir=="string"&&a.set(m.root_dir,m);let l=[],c=[],u=[],d=[],f=[],g=[],x=new Map,A=new Map,L=new Map;for(let m of n){if(!m||typeof m.root_dir!="string")continue;let E=m.root_dir,Y=m.name||E,ue=a.get(E),oe=ue&&typeof ue.revision=="number"?ue.revision:typeof m.revision=="number"?m.revision:0,de=Mt(m.attempts),Ue=Mt(m.bead_titles),et=Mt(m.pr_observations),qe=Mt(m.admission),X=Mt(m.revise_parked),te=Mt(m.merge_queue_state),Ae=Mt(m.cleanup_failed),_e=Mt(m.discard_operations),Pe=Mt(m.bead_blocked_by),le=Mt(m.pr_activity),Me=Array.isArray(m.repo_operations)?m.repo_operations:[],Oe=Array.isArray(m.merge_queue)?m.merge_queue:[],He=new Set(Oe.filter(U=>U&&typeof U.bead_id=="string").map(U=>U.bead_id)),$e=new Map(Oe.filter(U=>U&&typeof U.bead_id=="string").map(U=>[U.bead_id,U])),Ve=Array.isArray(m.queue)?m.queue:[],it=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).filter(U=>U&&/^s[1-5]$/.test(U.id)&&Array.isArray(U.entries)),Ie=Mt(m.lane_states),Je=typeof m.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(m.serial_lane_count))):Math.min(5,it.length);L.set(E,Je);let G=new Map(it.map(U=>[U.id,U])),Z=new Map;for(let U of it)for(let V of U.entries)V&&typeof V.bead_id=="string"&&Z.set(V.bead_id,U.id);let xe=Array.isArray(m.done)?m.done:[];for(let U of xe)U&&typeof U.bead_id=="string"&&g.push({id:U.bead_id,root_dir:E,workspace_name:Y});let De=new Map;for(let U of xe)U&&typeof U.bead_id=="string"&&typeof U.added_at=="number"&&De.set(U.bead_id,U.added_at);let We=U=>({id:U,title:Ue[U]||U,root_dir:E,workspace_name:Y,expected_revision:oe,draggable:!1}),Ge=new Set;for(let[U,V]of sg(de,De))Ge.add(U),c.push({...We(U),lane:"running",...Z.has(U)?{serial_lane_id:Z.get(U)}:{},attempt_id:V.attempt_id,run_state:V.run_state,can_pause:V.can_pause,can_resume:V.can_resume,started_at:V.started_at,last_event_at:V.last_event_at,runner:V.runner,model:V.model,effort:V.effort,speed:V.speed,resumed_from:V.resumed_from,continuation_mode:V.continuation_mode,usage:V.usage,discard:vr(_e,U,{attempt_id:V.attempt_id}),badges:V.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:V.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:V.run_state==="failed"});for(let U of Array.isArray(m.pr_wait)?m.pr_wait:[]){let V=U&&U.bead_id;if(typeof V!="string"||Ge.has(V))continue;Ge.add(V);let ve=Mt(et[V]),ot=Mt(ve.pr),ke=ve.gate?Mt(ve.gate):null,T=He.has(V),M=$e.get(V)?.continuation_action||null,P=!!M&&M.continuation===null,H=te.active===V,ce=U.external===!0,y=Ae[V]||null,C=Mt(le[V]),D=ss({bead_id:V,merge_sha:U.merge_sha,cleanup_cursor:U.cleanup_cursor,merge_progress:C.merge_progress||null,cleanup_failed:y,repo_operations:Me}),me=wo(D),fe=!!ke&&ke.base_badge==="\uCDA9\uB3CC",Ee=!!y&&["child_sweep","branch_cleanup","parent_close"].includes(y.step)&&!!ke&&ke.tier==="merged",Fe=ce&&!!y&&!!ke&&ke.tier==="merged",Ye=!!ke&&["closed_unmerged","review","undecidable"].includes(ke.tier),Qe=vr(_e,V,{external:ce,merge_active:H||D?.step==="merge",merge_queued:T,cleanup_active:me,merged:!!y||ke?.tier==="merged"}),W=!!Qe.operation;u.push({...We(V),lane:"pr_wait",pr_number:typeof ot.number=="number"?ot.number:null,pr_url:typeof ot.url=="string"?ot.url:void 0,external:ce,usage:Jt(de,V),merge_step:D,badges:P?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:D?[ke?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:y?[sn(y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${sn(y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ke?.gate_badge=="string"&&ke.gate_badge.length>0?[ke.gate_badge]:[],alert:D?D.failed===!0:!!y||Ye,reason:y&&D?.active!==!0?vo(y.step):"PR \uB300\uAE30",merge_action:ke?.tier==="merged"&&!Ee&&!Fe?!1:!T||P,merge_enabled:!W&&(P||ke?.enabled===!0||fe||Ee||Fe),merge_label:P?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Fe||Ee?"\uC815\uB9AC \uC7AC\uAC1C":fe&&!Ee?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:P?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":W?Qe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Qe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Qe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ee?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":fe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:T&&!P,cancel_enabled:!H,continuation_mismatch:M?.mismatch||null,discard:Qe,discard_action:Qe.action,discard_enabled:Qe.enabled,discard_title:Qe.title})}let ze=(U,V,ve,ot)=>{let ke=U&&U.bead_id;if(typeof ke!="string"||Ge.has(ke))return null;Ge.add(ke);let T=X[ke],M=vr(_e,ke),P=M.operation?M:null,H={...We(ke),lane:V,draggable:!P,discard:P||void 0,reason:Tu(qe,ke),queue_position:ve+1,queue_index:ve,queue_length:ot,badges:T?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!T,revise_action:!!T,revise_enabled:!!T&&!P,revise_title:T?T.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${T.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Pe,ke)&&(H.blocked_by=Array.isArray(Pe[ke])?Pe[ke].filter(ce=>typeof ce=="string"&&ce.length>0):[]),H};for(let U=0;U<Ve.length;U++){let V=ze(Ve[U],"queue",U,Ve.length);if(!V)continue;d.push(V);let ve=x.get(E);ve?ve.push(V):x.set(E,[V])}let ct=[];for(let U=0;U<it.length;U++){let V=it[U],ve=[];for(let ke=0;ke<V.entries.length;ke++){let T=ze(V.entries[ke],V.id,ke,V.entries.length);T&&(ve.push(T),d.push(T))}if(ve.length===0)continue;let ot=Mt(Ie[V.id]);ct.push({id:V.id,index:U,items:ve,occupied_by:Array.isArray(ot.occupied_by)?ot.occupied_by.filter(ke=>typeof ke=="string"):[],corrections:Array.isArray(ot.corrections)?ot.corrections.length:0,cycle:ot.cycle===!0})}A.set(E,ct);let pt=Array.from({length:Je},(U,V)=>{let ve=`s${V+1}`,ot=G.get(ve),ke=ot&&Array.isArray(ot.entries)?ot.entries:[],T=Mt(Ie[ve]);return{id:ve,index:ke.length,length:ke.length,occupied_by:Array.isArray(T.occupied_by)?T.occupied_by.filter(M=>typeof M=="string"):[]}});for(let U of Array.isArray(m.runnable)?m.runnable:[]){let V=U&&U.bead_id;typeof V!="string"||Ge.has(V)||(Ge.add(V),l.push({...We(V),title:U.title||Ue[V]||V,lane:"runnable",draggable:!0,reason:Tu(qe,V),created_at:U.created_at??void 0,updated_at:U.updated_at??void 0,labels:Array.isArray(U.labels)?U.labels:[],spec_reviewer:typeof U.spec_reviewer=="string"?U.spec_reviewer:void 0,plan_state:U.plan_state==="approved"||U.plan_state==="authored"?U.plan_state:"none",workflow:U.route?{route:U.route,chips:{route:U.route}}:null,blocked:U.blocked===!0,...Array.isArray(U.blocked_by)?{blocked_by:U.blocked_by.filter(ve=>typeof ve=="string"&&ve.length>0)}:{},place_index:Ve.length,place_lanes:pt}))}for(let U of xe){let V=U&&U.bead_id;if(typeof V!="string"||Ge.has(V)||(Ge.add(V),o!==void 0&&typeof U.added_at=="number"&&U.added_at<o))continue;let ve=ng(de,V);f.push({...We(V),lane:"done",done:!0,usage:Jt(de,V),done_at:typeof U.added_at=="number"?U.added_at:void 0,done_kind:ve&&typeof ve.done_kind=="string"?ve.done_kind:null})}}let z=new Map;s.forEach((m,E)=>{m&&typeof m.root_dir=="string"&&z.set(m.root_dir,E)});let ae=r&&r.running_sort==="repo"?"repo":"started";c.sort((m,E)=>{if(ae==="repo"){let oe=z.get(m.root_dir)??Number.MAX_SAFE_INTEGER,de=z.get(E.root_dir)??Number.MAX_SAFE_INTEGER;if(oe!==de)return oe-de}let Y=typeof m.started_at=="number"&&Number.isFinite(m.started_at)?m.started_at:null,ue=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null;return Y!==null&&ue!==null&&Y!==ue?Y-ue:Y===null&&ue!==null?1:Y!==null&&ue===null?-1:m.id.localeCompare(E.id)}),f.sort((m,E)=>(E.done_at??0)-(m.done_at??0));let se=s.length>0?s:n.map(m=>({root_dir:m&&m.root_dir,name:m&&m.name,auto_advance:m&&m.auto_advance,auto_merge:m&&m.auto_merge,slots:m&&m.slots,revision:m&&m.revision,runner_catalog:m&&m.runner_catalog})),q=[];for(let m of se){if(!m||typeof m.root_dir!="string")continue;let E=x.get(m.root_dir)||[],Y=A.get(m.root_dir)||[];q.push({root_dir:m.root_dir,name:m.name||m.root_dir,auto_advance:m.auto_advance===!0,auto_merge:m.auto_merge===!0,slots:typeof m.slots=="number"&&m.slots>=os?m.slots:os,revision:typeof m.revision=="number"?m.revision:0,runner_catalog:Mt(m.runner_catalog),items:E,sublanes:{parallel:E,serial:Y},serial_lane_count:L.get(m.root_dir)||0})}let N={runnable:l,queue:d,queue_groups:q,running:c,pr_wait:u,done:f,automation:{total:q.length,both_on:q.filter(m=>m.auto_advance&&m.auto_merge).length}},I=Na(N);for(let m of g)I.has(m.id)||I.set(m.id,{root_dir:m.root_dir,workspace_name:m.workspace_name,lane:"done",state:"done"});for(let m of[...N.queue,...N.runnable]){if(!Object.hasOwn(m,"blocked_by"))continue;let E=I.get(m.id);m.blockers=(m.blocked_by||[]).map(Y=>cu(Y,E,I,s)),m.blocker_warnings=m.blockers.filter(Y=>Y.missing_internal).map(Y=>`\u26A0 \uC120\uD589 ${Y.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),m.blocker_warnings.length>0&&(m.alert=!0)}let j=uu(N.queue_groups);for(let m of N.queue_groups)for(let E of m.sublanes.serial){let Y=j.get(pu(m.root_dir,E.id));Y&&(E.cross_wait_peers=Y)}return N}function og(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<eg;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${It(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Gt(e,t)}</span
        >`}</span
  >`}function as(e){return i`<div class="mon-c__title">${e.title}</div>`}function is(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function $o(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Va(e){let t=Ot(e.usage),r=lr(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${xn(e.usage)}
        >${r}</span
      >`:""}function Ka(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function ag(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ha()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${za()}
        </button>`}
    ${e.discard?.action?i`<button
          type="button"
          class="mon-op mon-op--discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-discard-mode=${e.discard.confirmation}
          ?disabled=${!e.discard.enabled}
          aria-label=${e.discard.label}
          title=${e.discard.title}
        >
          ${e.discard.label}
        </button>`:""}
    ${e.run_state==="failed"?i`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${$u()}
        </button>`:""}
  </span>`}function Cu(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?i`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>i`<span
        class="mon-blocker${r.same_lane_ahead?" mon-blocker--normal":""}"
      >
        <span>${r.label}</span>
        <button
          type="button"
          class="mon-blocker__remove"
          data-blocker-id=${r.id}
          aria-label=${`\uC120\uD589 ${r.id} \uC5F0\uACB0 \uD574\uC81C`}
          title="직렬 연결 해제"
        >
          ✕
        </button>
      </span>`)}function Ru(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?i`<div class="mon-blocker-warnings">
        ${t.map(r=>i`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Iu(){return i`<span class="mon-link mon-popover-owner">
    <button
      type="button"
      class="mon-link__trigger"
      aria-haspopup="dialog"
      aria-expanded="false"
      title="직렬로 연결"
    >
      🔗
    </button>
    <span class="mon-link__popover mon-card-popover" role="dialog" hidden>
      <input
        type="search"
        class="mon-link__search"
        placeholder="id·제목·위치 검색"
        aria-label="직렬로 연결할 버드 검색"
        autocomplete="off"
      />
      <span class="mon-link__list"></span>
      <button type="button" class="mon-link__direct" hidden></button>
      <span class="mon-link__empty" hidden>검색 결과 없음</span>
      <span class="mon-link__error" role="alert" hidden></span>
    </span>
  </span>`}function ig(e,t){let r=typeof e.started_at=="number"?Ua(t-e.started_at):"";return i`${as(e)}
    <div class="mon-c__meta">
      ${Ka(e)}${og(e.last_event_at,t)}${is(e)}${$o(e)}
      ${br(e)?i`<span class="mon-c__model">${br(e)}</span>`:""}
      ${Pr(e)?i`<span
            class="rtile__resumed"
            title=${Pr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?i`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Va(e)}${ag(e)}${Ir(e)}
    </div>`}function lg(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Gt(e.updated_at);return i`${as(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${is(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Ps(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${$o(e)}
      ${l?i`<span title=${`\uC218\uC815 ${It(e.updated_at)}`}
            >수정 ${l}</span
          >`:""}
      ${e.reason?i`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Cu(e)}
      <span class="mon-c__ops">
        ${Iu()}
        <span class="mon-place mon-popover-owner">
          <button
            type="button"
            class="worker-card__place"
            data-bead-id=${e.id}
            aria-haspopup="menu"
            aria-expanded="false"
            title="적재할 대기 레인 선택"
          >
            대기로 ↴
          </button>
          <span class="mon-place__popover mon-card-popover" role="menu" hidden>
            <button
              type="button"
              class="mon-place__choice"
              data-lane="parallel"
              data-place-index=${String(e.place_index??0)}
              role="menuitem"
              aria-label=${`\uBCD1\uB82C \xB7 \uB300\uAE30 ${e.place_index??0}`}
            >
              <strong>병렬</strong><span>대기 ${e.place_index??0}</span>
            </button>
            ${(e.place_lanes||[]).map(c=>i`<button
                  type="button"
                  class="mon-place__choice"
                  data-lane=${c.id}
                  data-place-index=${String(c.index)}
                  role="menuitem"
                  aria-label=${`${c.id} \xB7 ${c.occupied_by.length>0?`\uC810\uC720 ${c.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"} \xB7 \uB300\uAE30 ${c.length}`}
                >
                  <strong>${c.id}</strong
                  ><span
                    >${c.occupied_by.length>0?`\uC810\uC720 ${c.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"}
                    · 대기 ${c.length}</span
                  >
                </button>`)}
          </span>
        </span>
      </span>
    </div>
    ${Ru(e)}`}function cg(e){let t=!!e.discard?.operation;return i`${as(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${is(e)}
      ${Ka(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Cu(e)}
      <span class="mon-c__ops">
        ${Iu()}
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${t||(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${t||(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          ?disabled=${t}
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
        ${t?i`<button
              type="button"
              class="worker-mini__discard"
              data-bead-id=${e.id}
              data-attempt-id=${e.discard?.attempt_id||""}
              data-operation-id=${e.discard?.operation?.operation_id||""}
              data-discard-mode=${e.discard?.confirmation||"unmerged"}
              ?disabled=${!e.discard?.enabled}
              aria-label=${e.discard?.label||"\uD3D0\uAE30"}
              title=${e.discard?.title||""}
            >
              ${e.discard?.label||"\uD3D0\uAE30"}
            </button>`:""}
      </span>
    </div>
    ${Ru(e)} ${Ir(e)}
    ${e.revise_action?i`<div class="mon-c__tail">
          <button
            type="button"
            class="worker-mini__revise-fix"
            data-bead-id=${e.id}
            ?disabled=${e.revise_enabled===!1}
            title=${e.revise_title||""}
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
          </button>
        </div>`:""}`}function ug(e){let t=e.merge_step||null,r=!!(lr(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${as(e)}
    <div class="mon-c__meta">
      ${is(e)}${$o(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ka(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${Va(e)}${t?i`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?i`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?i`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?i`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?i`<button
                type="button"
                class="worker-mini__discard"
                data-bead-id=${e.id}
                data-attempt-id=${e.discard?.attempt_id||""}
                data-operation-id=${e.discard?.operation?.operation_id||""}
                data-discard-mode=${e.discard?.confirmation||"unmerged"}
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_title}
              >
                ${e.discard?.label||"\uD3D0\uAE30"}
              </button>`:""}
          ${Ir(e)}
        </div>`:""}`}function dg(e,t){let r=e.done_kind||"",n=r?tg[r]||r:"",s=Gt(e.done_at,t);return i`${as(e)}
    <div class="mon-c__meta">
      ${is(e)}${$o(e)}
      ${n?i`<span
            class="mon-live__kind${rg.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Va(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${It(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Lu(e,t){return e.lane==="running"?ig(e,t):e.lane==="runnable"?lg(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?cg(e):e.lane==="pr_wait"?ug(e):dg(e,t)}function Ou(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return i`<header
    class="mon-group__hd${r===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${r}</span>
    <span class="mon-group__ops">
      <button
        type="button"
        class="mon-ctl mon-ctl--advance${e.auto_advance?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_advance?"false":"true"}
        aria-pressed=${e.auto_advance?"true":"false"}
        title=${e.auto_advance?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      >
        ${e.auto_advance?Ha():za()}
        <span class="mon-ctl__label">자동화</span>
      </button>
      <button
        type="button"
        class="mon-ctl mon-ctl--merge-auto${e.auto_merge?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_merge?"false":"true"}
        aria-pressed=${e.auto_merge?"true":"false"}
        title=${e.auto_merge?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB044\uACE0 \uC774 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uC744 \uBE44\uC6C1\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4"}
      >
        ${xu()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Au()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${os}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Mu(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=gr.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?ku():Su()}
      <span class="mon-auto-all__label"
        >${n?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
      <span
        class="mon-running-sort-group"
        role="group"
        aria-label="실행중 정렬"
      >
        <button
          type="button"
          class="mon-running-sort${s==="started"?" is-active":""}"
          data-sort="started"
          aria-pressed=${s==="started"?"true":"false"}
        >
          시작순
        </button>
        <span aria-hidden="true">|</span>
        <button
          type="button"
          class="mon-running-sort${s==="repo"?" is-active":""}"
          data-sort="repo"
          aria-pressed=${s==="repo"?"true":"false"}
        >
          레포순
        </button>
      </span>
      <span class="mon-kpi__chip mon-kpi__chip--running"
        >실행 <b>${e.counts.running}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--queue"
        >대기 <b>${e.counts.queue}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--pr"
        >PR <b>${e.counts.pr_wait}</b></span
      >
      <select
        class="mon-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${e.done_range}
      >
        ${gr.map(l=>i`<option
              value=${l.value}
              ?selected=${e.done_range===l.value}
            >
              ${l.label}
            </option>`)}
      </select>
      ${a.map(l=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${l.tooltip}
            >${o} 완료 · 누적 ${l.label}</span
          >`)}
    </div>
  </div>`}function Pu(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Du(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Ot(Us(t));let r={};for(let l of xr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let d of xr){let f=c[d];typeof f=="number"&&Number.isFinite(f)&&(r[d]+=f,n=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?lr(r):null}var Nu="bdui.monitor.done-range",qu="bdui.monitor.running_sort",Fu="beads-ui.monitor.candidate-filter",Ya={show_blocked:!1};function pg(){try{let e=window.localStorage.getItem(Fu);if(!e)return{...Ya};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ya}:{show_blocked:t.show_blocked===!0}}catch{return{...Ya}}}function fg(e){try{window.localStorage.setItem(Fu,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function _g(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function mg(){try{let e=window.localStorage.getItem(Nu);return Qt(e)?e:Ht}catch{return Ht}}function gg(e){try{window.localStorage.setItem(Nu,e)}catch{}}function bg(){try{return window.localStorage.getItem(qu)==="repo"?"repo":"started"}catch{return"started"}}function hg(e){try{window.localStorage.setItem(qu,e)}catch{}}var ju="tab:monitor:pipeline",yg=1e3,vg=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function xo(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}${e.blocked?" mon-card--blocked":""}"
    draggable=${r?"true":"false"}
    data-issue-id=${e.id}
    data-root-dir=${e.root_dir}
    data-revision=${String(e.expected_revision)}
    data-lane=${e.lane}
    data-attempt-id=${e.attempt_id||""}
    data-place-index=${String(e.place_index??"")}
    data-queue-index=${String(e.queue_index??"")}
    data-queue-length=${String(e.queue_length??"")}
  >
    ${Lu(e,t)}
  </div>`}function wg(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?i`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>xo(s,t))}
        </div>
      </section>`:i`<div class="mon-group__list">
        ${e.items.map(s=>xo(s,t))}
      </div>`;return i`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Ou(e)} ${n}
    ${r?e.sublanes.serial.map(s=>i`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?i`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?i`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>i`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?i`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>xo(o,t))}
              </div>
            </section>`):""}
  </div>`}function Bu(e,t){let r=yt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.now||(()=>Date.now()),u=t.confirm||(T=>typeof globalThis.confirm!="function"||globalThis.confirm(T)),d=mg(),f=bg(),g=pg();function x(){let T=gr.find(M=>M.value===d);return T?T.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let L=Ga(null,null),z=new Map,ae=null,se=null;async function q(T,M,P,H,ce=!0){if(!o||!P)return null;let y=await o(T,{...M,root_dir:P,expected_revision:H});if(y&&y.conflict&&ce){y.queue&&z.set(P,y.queue);let C=y.queue&&typeof y.queue.revision=="number"?y.queue.revision:H;y=await o(T,{...M,root_dir:P,expected_revision:C})}return y&&y.queue&&P&&z.set(P,y.queue),y}function N(T,M){let P=z.get(T),H=s&&s.get?s.get():null,ce=(Array.isArray(H)?H:[]).find(C=>C?.root_dir===T);return(P||ce)?.merge_queue?.find(C=>C.bead_id===M)?.continuation_action}async function I(T,M,P,H){let ce=await q(T,M,P,H),y=z.get(P)?.revision??ce?.queue?.revision??H;return $r(ce,(C,D)=>q(T,{...M,continuation:C,decision_token:D},P,y,!1),{refresh:C=>q(T,M,P,C?.queue?.revision??z.get(P)?.revision??y,!1)})}async function j(T,M,P,H){let ce=await $r({continuation_mismatch:H},(C,D)=>q("worker-merge-queue-add",{bead_id:M,continuation:C,decision_token:D},T,P,!1)),y=ce?.queue?.merge_queue?.find(C=>C.bead_id===M)?.continuation_action;ce?.applied!==!0&&y?.continuation===null&&y.mismatch&&await j(T,M,ce.queue.revision,y.mismatch)}async function m(T,M,P){let H=await q("worker-discard",T,M,P);if(H&&H.discarded===!0){pe(bo(H),"success",5e3);return}if(H&&H.reason){pe(`\uD3D0\uAE30 \uC2E4\uD328: ${H.reason}`,"error");return}if(H&&H.accepted&&H.pending==="merged_revert"){pe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(H&&H.accepted){pe(`\uD3D0\uAE30 \uC9C4\uD589: ${H.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}H&&!H.conflict&&pe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function E(T,M,P){return!o||!P?null:await o(T,{...M,root_dir:P})}async function Y(T){if(!o||!T&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let M=await o("monitor-auto-toggle",{on:T}),P=M&&Array.isArray(M.failed)?M.failed:[];P.length>0&&pe(`\uC790\uB3D9\uD654 ${T?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${P.map(H=>H.root_dir).join(", ")}`,"error",3200)}async function ue(){let T=new Map;for(let M of L.pr_wait)T.has(M.root_dir)||T.set(M.root_dir,M.expected_revision);for(let[M,P]of T)await q("worker-merge-queue-add-all",{},M,P)}let oe=null,de=!1,Ue=null;function et(){Ue!==null&&clearTimeout(Ue),Ue=setTimeout(()=>{Ue=null,de=!1},0)}function qe(T){let M=T.target;return typeof M?.closest=="function"?M.closest(".mon-group"):null}function X(T){let M=qe(T);return!M||!oe?null:(M.getAttribute("data-root-dir")||"")===oe.root_dir?M:null}function te(){for(let T of Array.from(A.querySelectorAll(".mon-group--drag-over")))T.classList.remove("mon-group--drag-over")}function Ae(T){let M=T.target,P=typeof M?.closest=="function"?M.closest('.mon-card[draggable="true"]'):null;if(P){oe={bead_id:P.getAttribute("data-issue-id")||"",lane:P.getAttribute("data-lane")||"",root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0,queue_index:Number(P.getAttribute("data-queue-index")),queue_length:Number(P.getAttribute("data-queue-length")),place_index:Number(P.getAttribute("data-place-index"))},de=!0;try{T.dataTransfer?.setData("text/plain",oe.bead_id),T.dataTransfer&&(T.dataTransfer.effectAllowed="move")}catch{}}}function _e(T){let M=X(T);M&&(T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move"),M.classList.add("mon-group--drag-over"))}function Pe(T){qe(T)?.classList.remove("mon-group--drag-over")}function le(){oe=null,te(),et()}function Me(T){let M=X(T),P=oe;if(oe=null,te(),!M||!P||!P.bead_id)return;T.preventDefault();let H=T.target,ce=typeof H?.closest=="function"?H.closest('.mon-card[data-lane="queue"]'):null,y=ce&&M.contains(ce)?Number(ce.getAttribute("data-queue-index")):NaN;if(P.lane==="runnable"){let me=Number.isFinite(y)?y:P.place_index;if(!Number.isFinite(me))return;q("worker-queue-place",{bead_id:P.bead_id,index:me},P.root_dir,P.revision);return}if(P.lane!=="queue"||ce&&ce.getAttribute("data-issue-id")===P.bead_id)return;let C=P.queue_index,D=Number.isFinite(y)?C>y?y:y-1:P.queue_length-1;!Number.isFinite(D)||D<0||D===C||q("worker-queue-reorder",{bead_id:P.bead_id,to_index:D},P.root_dir,P.revision)}function Oe(T){let M=_g(L.runnable,g),P={runnable:M.visible,queue:L.queue,running:L.running,pr_wait:L.pr_wait,done:L.done};return i`${Mu({automation:L.automation,counts:{running:L.running.length,queue:L.queue.length,pr_wait:L.pr_wait.length},running_sort:f,done_range:d,token_total:Du(L.done),token_tooltip:Pu(x())})}
      <div class="worker-lanes mon-lanes">
        ${vg.map(H=>{let ce=P[H.lane],y=H.lane==="queue"?L.queue_groups.length>0?i`${L.queue_groups.map(C=>wg(C,T))}`:void 0:ce.length>0?i`${ce.map(C=>xo(C,T))}`:void 0;return pr({id:`monitor-${H.lane}`,lane:H.pane,title:H.lane==="done"?`\uC644\uB8CC\xB7${x()}`:H.title,items:ce,empty:H.empty,body:y,live:H.lane==="running"&&ce.length>0,header_control:H.lane==="runnable"?i`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${g.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${M.hidden_blocked>0?i`<span class="worker-filter__hidden"
                          >숨김 ${M.hidden_blocked}건</span
                        >`:""}
                  </span>`:H.lane==="pr_wait"&&ce.length>0?i`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function He(){let T=s&&s.get?s.get():null,M=s&&s.getWorkspacesState?s.getWorkspacesState():[],P=c();L=Ga(T,M,{done_since:Zr(d,P),running_sort:f}),Ke(Oe(P),A)}function $e(T,M){let P=a?a():void 0;if(!M||!P||M===P||!l){n(T);return}l(M).then(()=>{n(T)}).catch(H=>{r("workspace switch for %s failed: %o",M,H)})}function Ve(T){return{root_dir:T.getAttribute("data-root-dir")||"",revision:Number(T.getAttribute("data-revision")||0)||0}}function it(T){if(typeof T=="string"&&T.length>0)return T;if(T&&typeof T=="object"){let M=T;if(typeof M.message=="string"&&M.message.length>0)return M.message;if(typeof M.error=="string"&&M.error.length>0)return M.error;if(M.error&&typeof M.error=="object"&&typeof M.error.message=="string")return M.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ie(T,M){let P=T.querySelector(".mon-link__trigger"),H=T.querySelector(".mon-link__popover"),ce=T.querySelector(".mon-link__error");!P||!H||!ce||(De(),H.hidden=!1,P.setAttribute("aria-expanded","true"),ce.textContent=M,ce.hidden=!1)}async function Je(T,M,P){let H=M.getAttribute("data-root-dir")||"",ce=M.getAttribute("data-issue-id")||"";if(!(!ce||!P||P===ce))try{await E(T,{a:ce,b:P},H),De()}catch(y){Ie(M,it(y))}}function G(T,M){let{root_dir:P,revision:H}=Ve(T),ce=T.getAttribute("data-issue-id")||"",y=M.dataset.attemptId||T.getAttribute("data-attempt-id")||"",C=M.classList;if(C.contains("mon-link__trigger")){Ge(M);return}if(C.contains("mon-link__candidate")||C.contains("mon-link__direct")){let D=M.dataset.targetId||"";Je("dep-add",T,D);return}if(C.contains("mon-blocker__remove")){let D=M.dataset.blockerId||"";Je("dep-remove",T,D);return}if(C.contains("mon-place__choice")){let D=M.dataset.lane||"parallel",me=Number(M.dataset.placeIndex||0)||0;De(),q("worker-queue-place",{bead_id:ce,...D==="parallel"?{}:{lane:D},index:me},P,H);return}if(C.contains("worker-card__place")){We(M);return}if(C.contains("mon-op--up")||C.contains("mon-op--down")){let D=Number(T.getAttribute("data-queue-index")||0)||0,me=C.contains("mon-op--up")?D-1:D+1;if(me<0)return;q("worker-queue-reorder",{bead_id:ce,.../^s[1-5]$/.test(T.dataset.lane||"")?{lane:T.dataset.lane}:{},to_index:me},P,H);return}if(C.contains("mon-op--remove")){q("worker-queue-remove",{bead_id:ce},P,H);return}if(C.contains("mon-op--pause")){E("worker-attempt-pause",{attempt_id:y},P);return}if(C.contains("mon-op--discard")){if(!u(ts(ce,"unmerged")))return;m({bead_id:ce,...y?{attempt_id:y}:{},...M.dataset.operationId?{operation_id:M.dataset.operationId}:{}},P,H);return}if(C.contains("mon-op--resume")){kn().then(D=>{if(D!==null)return I("worker-attempt-resume",{attempt_id:y,...D!==""?{instructions:D}:{}},P,H)});return}if(C.contains("mon-op--dismiss")){q("worker-attempt-dismiss",{attempt_id:y},P,H);return}if(C.contains("worker-mini__merge")){let D=N(P,ce);D?.mismatch&&D.continuation===null?j(P,ce,H,D.mismatch):q("worker-merge-queue-add",{bead_id:ce},P,H);return}if(C.contains("worker-mini__merge-cancel")){q("worker-merge-queue-remove",{bead_id:ce},P,H);return}if(C.contains("worker-mini__discard")){let D=M.dataset.discardMode==="merged"?"merged":"unmerged";if(!u(ts(ce,D)))return;m({bead_id:ce,...y?{attempt_id:y}:{},...M.dataset.operationId?{operation_id:M.dataset.operationId}:{}},P,H);return}if(C.contains("worker-mini__revise-fix")){I("worker-revise-fix",{bead_id:ce},P,H);return}C.contains("worker-mini__revise-approve")&&q("worker-revise-approve",{bead_id:ce},P,H)}function Z(T){T.querySelector(".mon-link__list")?.replaceChildren();let P=T.querySelector(".mon-link__search");P&&(P.value="");let H=T.querySelector(".mon-link__direct");H&&(H.hidden=!0,H.dataset.targetId="",H.textContent="");let ce=T.querySelector(".mon-link__empty");ce&&(ce.hidden=!0);let y=T.querySelector(".mon-link__error");y&&(y.hidden=!0,y.textContent="")}function xe(T,M){let P=T.querySelector(".mon-link__list");if(!P)return;let H=document.createDocumentFragment(),ce=du(L).filter(y=>y.id!==M);for(let y of ce){let C=document.createElement("button");C.type="button",C.className="mon-link__candidate",C.dataset.targetId=y.id,C.dataset.search=`${y.id} ${y.title} ${y.location}`.toLocaleLowerCase();let D=document.createElement("strong");D.textContent=y.id;let me=document.createElement("span");me.textContent=y.title;let fe=document.createElement("small");fe.textContent=y.location,C.append(D,me,fe),H.append(C)}P.replaceChildren(H)}function De(){for(let T of Array.from(A.querySelectorAll(".mon-card-popover"))){let M=T;M.hidden=!0,M.classList.contains("mon-link__popover")&&Z(M)}for(let T of Array.from(A.querySelectorAll('[aria-expanded="true"]')))T.setAttribute("aria-expanded","false")}function We(T){let P=T.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!P)return;let H=P.hidden;De(),H&&(P.hidden=!1,T.setAttribute("aria-expanded","true"))}function Ge(T){let P=T.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!P)return;let H=P.hidden;if(De(),H){let ce=T.closest(".mon-card");xe(P,ce?.getAttribute("data-issue-id")||""),P.hidden=!1,T.setAttribute("aria-expanded","true");let y=P.querySelector(".mon-link__search");y&&(ze(y),y.focus())}}function ze(T){let M=T.closest(".mon-link__popover"),P=T.closest(".mon-card");if(!M||!P)return;let H=T.value.trim(),ce=H.toLocaleLowerCase(),y=0,C=!1;for(let Fe of Array.from(M.querySelectorAll(".mon-link__candidate"))){let Ye=Fe,Qe=Ye.dataset.targetId||"",W=ce.length===0||(Ye.dataset.search||"").includes(ce);Ye.hidden=!W,W&&(y+=1),Qe.toLocaleLowerCase()===ce&&(C=!0)}let D=M.querySelector(".mon-link__direct"),me=P.getAttribute("data-issue-id")||"";if(D){let Fe=H.length>0&&!C&&ce!==me.toLocaleLowerCase();D.hidden=!Fe,D.dataset.targetId=Fe?H:"",D.textContent=Fe?`\uC9C1\uC811 \uC785\uB825 \xB7 ${H}`:"",Fe&&(y+=1)}let fe=M.querySelector(".mon-link__empty");fe&&(fe.hidden=y>0);let Ee=M.querySelector(".mon-link__error");Ee&&(Ee.hidden=!0,Ee.textContent="")}function ct(T){let M=T.target;M&&A.contains(M)&&typeof M.closest=="function"&&M.closest(".mon-popover-owner")||De()}function pt(T){if(T.key!=="Escape")return;let M=A.querySelector('[aria-expanded="true"]');De(),M?.focus()}function U(T){let M=de;de=!1;let P=T.target;if(!P||typeof P.closest!="function"||P.closest("dialog")||P.closest("a"))return;let H=P.closest(".mon-running-sort");if(H){T.preventDefault(),f=H.getAttribute("data-sort")==="repo"?"repo":"started",hg(f),He();return}let ce=P.closest(".mon-auto-all");if(ce){T.preventDefault(),Y(ce.getAttribute("data-on")==="true");return}if(P.closest(".mon-merge-all")){T.preventDefault(),ue();return}let C=P.closest(".mon-ctl--advance");if(C){T.preventDefault();let{root_dir:Fe,revision:Ye}=Ve(C);q("worker-automation-toggle",{on:C.getAttribute("data-on")==="true"},Fe,Ye);return}let D=P.closest(".mon-ctl--merge-auto");if(D){T.preventDefault();let{root_dir:Fe,revision:Ye}=Ve(D);q("worker-merge-auto-toggle",{on:D.getAttribute("data-on")==="true"},Fe,Ye);return}let me=P.closest(".mon-card");if(!me)return;let fe=P.closest("button");if(fe){T.preventDefault(),G(me,fe);return}let Ee=me.getAttribute("data-issue-id");Ee&&!M&&(T.preventDefault(),$e(Ee,me.getAttribute("data-root-dir")||""))}function V(T){let M=T.target;if(!M||typeof M.closest!="function")return;let P=M.closest(".mon-filter__blocked");if(P){g={show_blocked:P.checked},fg(g),He();return}let H=M.closest(".mon-done-range");if(H){d=Qt(H.value)?H.value:Ht,gg(d),He();return}let ce=M.closest(".mon-slots__input");if(!ce)return;let{root_dir:y,revision:C}=Ve(ce),D=Number(ce.value);if(!Number.isFinite(D))return;let me=Math.max(os,Math.floor(D));q("worker-queue-set-slots",{slots:me},y,C)}function ve(T){let M=T.target;M?.classList.contains("mon-link__search")&&ze(M)}e.addEventListener("click",U),e.addEventListener("change",V),e.addEventListener("input",ve),e.addEventListener("dragstart",Ae),e.addEventListener("dragover",_e),e.addEventListener("dragleave",Pe),e.addEventListener("drop",Me),e.addEventListener("dragend",le),document.addEventListener("click",ct),document.addEventListener("keydown",pt),s&&typeof s.subscribe=="function"&&(ae=s.subscribe(()=>{try{z.clear(),He()}catch{}}));function ot(){se!==null&&(clearInterval(se),se=null)}function ke(){Ue!==null&&(clearTimeout(Ue),Ue=null)}return{load(){r("load"),He(),se===null&&(se=setInterval(()=>{try{if(A.querySelector(".mon-card-popover:not([hidden])"))return;He()}catch{}},yg))},pause(){ot()},clear(){ot(),ke(),ae&&(ae(),ae=null),e.removeEventListener("click",U),e.removeEventListener("change",V),e.removeEventListener("input",ve),e.removeEventListener("dragstart",Ae),e.removeEventListener("dragover",_e),e.removeEventListener("dragleave",Pe),e.removeEventListener("drop",Me),e.removeEventListener("dragend",le),document.removeEventListener("click",ct),document.removeEventListener("keydown",pt),e.replaceChildren()}}}function Uu(e,t,r){let n=yt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function l(g){return x=>{x.preventDefault(),n("click tab %s",g),r.gotoView(g)}}function c(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function u(){let g=c();return i`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${g==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let g=c();return i`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${g==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${g==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function f(){s&&Ke(u(),s),o&&Ke(d(),o)}return f(),a=t.subscribe(()=>f()),{destroy(){a&&(a(),a=null),s&&Ke(i``,s),o&&Ke(i``,o)}}}var Wu=["bug","feature","task","epic","chore"];function zu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Hu=["Critical","High","Medium","Low","Backlog"];function Gu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),d=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),g=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",o.appendChild(I);for(let j of Wu){let m=document.createElement("option");m.value=j,m.textContent=zu(j),o.appendChild(m)}a.replaceChildren();for(let j=0;j<=4;j+=1){let m=document.createElement("option");m.value=String(j);let E=Hu[j]||"Medium";m.textContent=`${j} \u2013 ${E}`,a.appendChild(m)}}x();function A(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(I){s.disabled=I,o.disabled=I,a.disabled=I,l.disabled=I,c.disabled=I,d.disabled=I,f.disabled=I,f.textContent=I?"Creating\u2026":"Create"}function z(){u.textContent=""}function ae(I){u.textContent=I}function se(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?o.value=I:o.value="";let j=window.localStorage.getItem("beads-ui.new.priority");j&&/^\d$/.test(j)?a.value=j:a.value="2"}catch{o.value="",a.value="2"}}function q(){let I=o.value||"",j=a.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),j.length>0&&window.localStorage.setItem("beads-ui.new.priority",j)}async function N(){z();let I=String(s.value||"").trim();if(I.length===0){ae("Title is required"),s.focus();return}let j=Number(a.value||"2");if(!(j>=0&&j<=4)){ae("Priority must be 0..4"),a.focus();return}let m=String(o.value||""),E=String(c.value||""),Y={title:I};m.length>0&&(Y.type=m),String(j).length>0&&(Y.priority=j),E.length>0&&(Y.description=E),L(!0);try{await t("create-issue",Y)}catch{L(!1),ae("Failed to create issue");return}q(),L(!1),A()}return r.addEventListener("cancel",I=>{I.preventDefault(),A()}),g.addEventListener("click",()=>A()),d.addEventListener("click",()=>A()),r.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),N())}),n.addEventListener("submit",I=>{I.preventDefault(),N()}),{open(){n.reset(),z(),se();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var kg=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function $g(e,t){return Vo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Vu(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=$g(n,e);return i`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${n}
                data-state=${s}
                @click=${()=>r(n)}
              >
                ${n}
              </button>`})}
          </div>`}
    </section>
  `}function Ku(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>i`<span class="settings-dialog__prefix">
              ${n}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${n} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>r.onRemove(n)}
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
          @input=${n=>r.onDraft(String(n.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${r.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function Yu(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${kg.map(([r,n])=>i`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${r}
                .checked=${e.chips[r]!==!1}
                @change=${()=>t(r)}
              />
              <span>${n}</span>
            </label>`)}
      </div>
    </section>
  `}var xg=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Ut="",Ag=["impl_runtime","impl_model","impl_effort"];function Wt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Zu(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(y=>pe(y,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="execution",c=!1,u="",d={},f={},g=[],x=!1,A=null,L={},z="",ae="",se=!1,q=!1,N=!1,I=null;function j(){let y=t.queueStore?.get();return Wt(y)?y.runner_catalog:null}function m(){let y=t.queueStore?.get();return Wt(y)&&Wt(y.execution_defaults)?y.execution_defaults:null}function E(){let y=t.implPresetStore?.get();return Wt(y)&&Array.isArray(y.presets)?y:null}async function Y(){x=!0,ve();try{let y=await r("get-session-defaults",{});d=Wt(y?.values)?{...y.values}:{},f={...d},g=Array.isArray(y?.warnings)?y.warnings:[]}catch(y){g=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${y instanceof Error?y.message:String(y)}`)}finally{x=!1,ve()}}async function ue(){let y=Mc(d,f);if(Object.keys(y).length!==0){try{let C=await r("set-session-defaults",{values:y});d=Wt(C?.values)?{...C.values}:{},f={...d},g=Array.isArray(C?.warnings)?C.warnings:[]}catch(C){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}ve()}}function oe(y,C){if(Ag.includes(y)){et(y,C);return}C===Ut?delete f[y]:f[y]=C,ve(),ue()}function de(){let y=Z().orchestration_model,C=hr({global:{orchestration_model:y??void 0},execution_defaults:m(),runner_catalog:j()}).orchestration_model.value;return C?Rr(j(),C):null}function Ue(y,C){typeof C=="string"&&C.length>0?f[y]=C:delete f[y]}function et(y,C){let D=C===Ut?void 0:C,me=Lc({impl_runtime:y==="impl_runtime"?D:f.impl_runtime,impl_model:y==="impl_model"?D:f.impl_model,impl_effort:y==="impl_effort"?D:f.impl_effort},j(),de());Ue("impl_runtime",me.impl_runtime),Ue("impl_model",me.impl_model),Ue("impl_effort",me.impl_effort),ve(),ue()}async function qe(){let y=t.queueStore?.get();if(!Wt(y))return;let C={orchestration_model:y.orchestration_model??null,orchestration_effort:y.orchestration_effort??null,orchestration_speed:y.orchestration_speed??null},D=Pc(C,{...C,...L});if(Object.keys(D).length!==0){try{let me=await r("worker-queue-set-orchestration-defaults",{expected_revision:y.revision,values:D});if(me&&me.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}L={}}catch(me){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${me instanceof Error?me.message:String(me)}`)}ve()}}function X(y,C){L[y]=C===Ut?null:C,ve(),qe()}function te(y){if(A=y,!y){ve();return}let C=j(),D=Z(),me=D.orchestration_model;me&&!Jn(C,y).includes(me)&&(L.orchestration_model=null,me=null);let fe=D.orchestration_effort;fe&&!Ca(C,y,me||Kt).includes(fe)&&(L.orchestration_effort=null),ve(),qe()}async function Ae(y){let C=t.queueStore?.get();if(!(!Wt(C)||y<1)){try{await r("worker-queue-set-slots",{expected_revision:C.revision,slots:y})}catch(D){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}ve()}}function _e(){let y={},C=Z();for(let D of ao){let me=Cr.includes(D)?C[D]:f[D];typeof me=="string"&&me.length>0&&(y[D]=me)}return y}async function Pe(){let y=E();if(!y)return;let C=_e();if(Object.keys(C).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let D=(y.presets||[]).find(fe=>fe.id===z),me=ae.trim()||(D?D.name:"");if(!me){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let fe=D?await r("impl-preset-update",{expected_revision:y.revision,id:D.id,name:me,settings:C}):await r("impl-preset-create",{expected_revision:y.revision,name:me,settings:C});if(fe&&fe.applied){if(ae="",!D&&Array.isArray(fe.presets)){let Ee=fe.presets.find(Fe=>Fe.name===me);z=Ee?Ee.id:z}ve()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ve()}catch(fe){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${fe instanceof Error?fe.message:String(fe)}`)}}async function le(){let y=E();if(!(!y||z.length===0))try{let C=await r("impl-preset-delete",{expected_revision:y.revision,id:z});C&&C.applied?(z="",ve()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ve())}catch(C){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}}async function Me(){let y=E(),C=t.queueStore?.get();if(!(!y||!Wt(C)||z.length===0)){try{let D=await r("apply-impl-preset-global",{preset_id:z,expected_revision:y.revision,expected_queue_revision:C.revision});D&&D.applied?(d=Wt(D.values)?{...D.values}:{},f={...d},g=Array.isArray(D.warnings)?D.warnings:[],Wt(D.queue)&&(t.queueStore?.set?.(D.queue),L={}),D.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):D&&D.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(D){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}ve()}}async function Oe(){q=!0,N=!1,ve();try{let y=await r("get-worker-system-prompt",{});!y||typeof y!="object"||Array.isArray(y)?N=!0:I=y}catch{N=!0}finally{q=!1,ve()}}function He(){if(se=!se,se&&!I){Oe();return}ve()}function $e(){let y=Sn({loading:q,error:N});if(y)return y;if(!I)return"";let C=Array.isArray(I.variants)?I.variants:[];return i`<div class="settings-dialog__sp-body">
      ${I.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${I.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${C.map(D=>i`<div class="settings-dialog__sp-variant" data-variant=${D.key}>
            <div class="settings-dialog__sp-cond">${D.condition}</div>
            ${Tr(D.label,D.system_prompt)}
          </div>`)}
    </div>`}function Ve(){return i`<section
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
        aria-expanded=${se?"true":"false"}
        @click=${He}
      >
        ${se?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${se?$e():""}
    </section>`}function it(y,C,D,me,fe,Ee,Fe){let Ye=fe[y]??Ut,Qe=Ra(y,D,fe,m(),j(),Fe),W=Qe.options.find(be=>be.value===Ye),re=Ye===Ut?Qe.full_value:W?.full_value;return i`<select
        class=${Ye===Ut?"settings-dialog__unset":""}
        data-key=${y}
        aria-label=${C}
        title=${re||""}
        ?disabled=${Ee===!0||Qe.disabled}
        .value=${nn(String(Ye))}
        @change=${be=>me(y,String(be.target.value))}
      >
        <option value=${Ut} ?selected=${Ye===Ut}>
          ${Qe.unset_label}
        </option>
        ${Qe.options.map(be=>i`<option
              value=${be.value}
              title=${be.full_value||""}
              ?selected=${be.value===Ye}
            >
              ${be.label}
            </option>`)}
      </select>
      ${Ye===Ut?i`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ie(y,C,D,me,fe,Ee=!1,Fe){return i`<div
      class=${`settings-dialog__row${Ee?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${C}</span>
      <span class="settings-dialog__controls">
        ${it(y,C,D,me,fe,Ee,Fe)}
      </span>
    </div>`}function Je(y,C,D,me,fe){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${C}-on)`}
        ></i>
        ${y}
      </span>
      <span class="settings-dialog__controls">
        ${it(D,`${y} \uBAA8\uB378`,me,oe,f,!1)}
        ${it(fe,`${y} effort`,co,oe,f,!1)}
      </span>
    </div>`}function G(y){return i`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${y.rows.length>0?`\uBCC0\uACBD ${y.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${y.rows.map(C=>i`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${C.kind}
          >
            <span class="settings-dialog__preset-diff-label">${C.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${C.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${C.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${y.ignored_keys.length>0?i`<div class="settings-dialog__preset-diff-note">
            ${y.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Z(){let y=t.queueStore?.get(),C={};for(let D of Cr)C[D]=Object.prototype.hasOwnProperty.call(L,D)?L[D]:Wt(y)&&typeof y[D]=="string"?y[D]:null;return C}function xe(){let y=j(),C=f.impl_runtime,D=f.impl_model,me=E(),fe=t.queueStore?.get(),Ee=Z(),Fe=Jn(y,A),Ye=En(y,void 0).filter(O=>O!==Kt),Qe=Ca(y,A,Ee.orchestration_model||Kt).filter(O=>O!==Kt),W=z?(me?.presets||[]).find(O=>O.id===z):null,re=W?Oc(_e(),Wt(W.settings)?W.settings:{}):null,be=Wt(fe)&&typeof fe.slots=="number"?fe.slots:2,k=m()?.supported===!0,S=Ra("workflow_mode",Xn,f,m(),y);return i`
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
        ${g.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${g.join(", ")}
            </div>`:""}
        ${k?"":i`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${x?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${nn(z)}
                  @change=${O=>{z=String(O.target.value),ve()}}
                >
                  <option value="" ?selected=${z===""}>
                    실행 프리셋…
                  </option>
                  ${(me?.presets||[]).map(O=>i`<option
                        value=${O.id}
                        ?selected=${O.id===z}
                      >
                        ${O.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${!re||re.rows.length===0}
                  @click=${Me}
                >
                  적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${z?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${nn(ae)}
                  @input=${O=>{ae=String(O.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  title=${z?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                  @click=${Pe}
                >
                  ${z?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${z.length===0}
                  @click=${le}
                >
                  삭제
                </button>
              </div>
              ${re?G(re):""}

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${nn(A||Ut)}
                      @change=${O=>{let J=String(O.target.value);te(J===Ut?null:J)}}
                    >
                      <option
                        value=${Ut}
                        ?selected=${!A}
                      >
                        전체
                      </option>
                      <option
                        value="claude"
                        ?selected=${A==="claude"}
                      >
                        claude
                      </option>
                      <option
                        value="codex"
                        ?selected=${A==="codex"}
                      >
                        codex
                      </option>
                    </select>
                    <span class="settings-dialog__hint"
                      >모델 목록을 좁힙니다</span
                    >
                  </span>
                </div>
                ${Ie("orchestration_model","\uBAA8\uB378",Fe,X,Ee)}
                ${Ie("orchestration_effort","effort",Qe,X,Ee)}
                ${Ie("orchestration_speed","\uC18D\uB3C4",Zn,X,Ee)}
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
                        aria-pressed=${String(!f.workflow_mode)}
                        @click=${()=>oe("workflow_mode",Ut)}
                      >
                        ${S.unset_label}
                      </button>
                      ${f.workflow_mode?"":i`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Xn.map(O=>i`<button
                            type="button"
                            data-mode=${O}
                            aria-pressed=${String(f.workflow_mode===O)}
                            @click=${()=>oe("workflow_mode",O)}
                          >
                            ${O}
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
                ${Je("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Qn,"spec_review_effort")}
                ${Je("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",lo,"plan_review_effort")}
                ${Je("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Qn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Ie("impl_runtime","\uC704\uC784 \uB300\uC0C1",io,oe,f)}
                ${Ie("impl_model","\uBAA8\uB378",En(y,C),oe,f)}
                ${Ie("impl_effort","effort",Tn(y,C,D),oe,f)}
                ${Ie("impl_speed","\uC18D\uB3C4",Zn,oe,f)}
                ${Ie("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Ye,oe,f,!1,{...f,...Ee})}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">동시 실행</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">slots</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__stepper">
                      <button
                        type="button"
                        aria-label="slots 감소"
                        @click=${()=>Ae(be-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${be}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>Ae(be+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${Ve()}
            `}
      </section>
    `}function De(){let y=n.get();return i`
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
        ${y?i`
              ${Vu(y,s(),ct)}
              ${Ku(y,u,{onDraft:C=>{u=C},onAdd:pt,onRemove:U})}
              ${Yu(y,V)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function We(y){let C=n.get();if(C)try{let D=await r("display-policy-set",{expected_revision:C.revision,policy:y(C)});Ge(D),D&&D.conflict&&D.policy&&(D=await r("display-policy-set",{expected_revision:D.policy.revision,policy:y(D.policy)}),Ge(D)),D&&D.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function Ge(y){y&&y.policy&&typeof y.policy=="object"&&n.set(y.policy)}function ze(y){We(y)}function ct(y){let C=n.get();if(!C)return;let D=!Sg(y,C);ze(me=>Eg(y,me,D))}function pt(){let y=u.trim();y.length!==0&&(u="",ze(C=>C.hidden_prefixes.includes(y)?{hidden_prefixes:C.hidden_prefixes}:{hidden_prefixes:[...C.hidden_prefixes,y]}),ve())}function U(y){ze(C=>({hidden_prefixes:C.hidden_prefixes.filter(D=>D!==y)}))}function V(y){let C=n.get();if(!C)return;let D=C.chips[y]===!1;ze(()=>({chips:{[y]:D}}))}function ve(){Ke(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${xg.map(y=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${y.id}
                  aria-selected=${String(l===y.id)}
                  aria-controls=${`settings-pane-${y.id}`}
                  @click=${()=>ot(y.id)}
                >
                  <span class="settings-dialog__glyph">${y.glyph}</span>
                  ${y.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ce}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${xe()} ${De()}
          </div>
        </div>
      `,a)}function ot(y){l=y,ve()}let ke=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",ke),a.addEventListener("cancel",ke);let T=y=>{y.target===a&&ce()};a.addEventListener("click",T);let M=null;n.subscribe&&(M=n.subscribe(()=>{c&&ve()}));let P=null;t.implPresetStore?.subscribe&&(P=t.implPresetStore.subscribe(()=>{c&&ve()}));function H(y="execution"){c||(c=!0,t.onOpenChange?.(!0),l=y,u="",L={},ve(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),Y())}function ce(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:H,close:ce,sessionDraft:()=>({...f}),destroy(){c=!1,a.removeEventListener("close",ke),a.removeEventListener("cancel",ke),a.removeEventListener("click",T),M&&(M(),M=null),P&&(P(),P=null),a.remove()}}}function Sg(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Eg(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Tg=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Xu="usage-meter-card",Cg="usage-meter-layer",Qu=600,Rg=["token_expired","relogin_required"];function Ju(e){return String(e).padStart(2,"0")}function Ig(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function ed(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Ju(n.getHours())}:${Ju(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Tg[n.getMonth()]} ${n.getDate()} ${o}`;return`${Ig(r,t)} \xB7 ${l}`}function Lg(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function td(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function rd(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var nd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function od(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function Og(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:od(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Mg(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Og(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?od(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function sd(e,t){return`${e}:${t}`}function ad(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,l=0,c=null;function u(){Ke(i``,e),e.hidden=!0,f()}function d(){if(c===null){let X=e.ownerDocument;c=X.createElement("div"),c.id=Cg,c.className="usage-meter__layer",X.body.appendChild(c)}return c}function f(){c!==null&&(Ke(i``,c),c.remove(),c=null)}function g(X){r!==X&&(r===null&&(document.addEventListener("mousedown",A),document.addEventListener("keydown",z),window.addEventListener("resize",L)),r=X)}function x(){r!==null&&(r=null,document.removeEventListener("mousedown",A),document.removeEventListener("keydown",z),window.removeEventListener("resize",L))}function A(X){let te=X.target;te&&(e.contains(te)||c!==null&&c.contains(te))||(x(),de())}function L(){de()}function z(X){X.key==="Escape"&&(x(),de())}function ae(X){r===X?x():g(X),de()}function se(){x(),de()}async function q(X,te){if(n.has(X.key))return;let Ae=sd(X.key,te);n.set(X.key,te),a.delete(Ae),de();let _e=null;try{_e=await(await fetch(X.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:te})})).json()}catch{_e=null}if(t)return;if(n.delete(X.key),!_e||_e.ok!==!0){let le=_e&&typeof _e.error=="string"&&_e.error.length>0?_e.error:"network_error";a.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${le}`}),de();return}let Pe=Array.isArray(_e.warnings)?_e.warnings.filter(le=>typeof le=="string"&&le.length>0):[];Pe.length>0&&a.set(Ae,{kind:"warn",text:Pe.join(" \xB7 ")}),de(),await qe()}function N(X,te,Ae,_e){let Pe=rd(X.pct),Me=`resets ${ed(X.resetsAt,_e)}${te?` \xB7 ${Ae}`:""}`;return i`<span
      class="usage-meter__window ${td(Pe)}"
      style=${`--progress: ${Pe}%`}
      title=${Me}
    >
      <span class="usage-meter__label">${X.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${Pe}%</span>
    </span>`}function I(X,te,Ae){let _e=te.available&&typeof te.ageSeconds=="number"&&te.ageSeconds>Qu,Pe=_e&&typeof te.ageSeconds=="number"?`${Math.floor(te.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",le=te.accounts.filter($e=>!$e.active).length,Me=`usage-meter__group${_e?" usage-meter__group--stale":""}`,Oe=i`<span class="usage-meter__provider"
        >${X.label}</span
      >
      ${te.available?te.windows.map($e=>N($e,_e,Pe,Ae)):i`<span class="usage-meter__empty">사용량 없음</span>`}
      ${le>0?i`<span class="usage-meter__badge">+${le}</span>`:""}`;if(te.accounts.length===0)return i`<span
        class=${Me}
        aria-label=${`${X.label} usage`}
        >${Oe}</span
      >`;let He=r===X.key;return i`<button
      type="button"
      class=${`usage-meter__toggle ${Me}`}
      aria-label=${`${X.label} usage`}
      aria-expanded=${He?"true":"false"}
      aria-controls=${Xu}
      @click=${()=>ae(X.key)}
    >
      ${Oe}
    </button>`}function j(X,te){return i`<span class="usage-meter" aria-label="Usage">
      ${X.map(Ae=>I(Ae.provider,Ae.snapshot,te))}
    </span>`}function m(X,te){let Ae=rd(X.pct),_e=ed(X.resetsAt,te);return i`<span
      class="usage-meter__account-window ${td(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${X.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${_e.length>0?`\u21BB ${_e}`:""}</span
      >
    </span>`}function E(X,te){return Rg.includes(te)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${X.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function Y(X,te,Ae){let _e=te.status==="ok",Pe=typeof te.ageSeconds=="number"&&te.ageSeconds>Qu,le=a.get(sd(X.key,te.number)),Me=n.get(X.key),Oe=Me!==void 0,He=Me===te.number,$e=["usage-meter__account"];return te.active&&$e.push("usage-meter__account--active"),_e||$e.push("usage-meter__account--unavailable"),Pe&&$e.push("usage-meter__account--stale"),i`<div class=${$e.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${te.email}
          >${te.alias===null?te.email:te.alias}</span
        >
        ${te.plan===null?"":i`<span class="usage-meter__account-tag">${te.plan}</span>`}
        ${te.active?i`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${te.ageSeconds===null?"":i`<span class="usage-meter__account-age"
              >${Lg(te.ageSeconds)}</span
            >`}
        ${te.active?"":i`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Oe}
              @click=${()=>{q(X,te.number)}}
            >
              ${He?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${_e?i`<div class="usage-meter__account-windows">
            ${te.windows.map(Ve=>m(Ve,Ae))}
          </div>`:i`<div class="usage-meter__account-status">
            ${E(X,te.status)}
          </div>`}
      ${le===void 0?"":i`<div
            class="usage-meter__account-message usage-meter__account-message--${le.kind}"
          >
            ${le.text}
          </div>`}
    </div>`}function ue(X,te,Ae){let _e=te.accounts.filter(Pe=>Pe.active).length;return i`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${X.label} · 활성 ${_e} / 전체
        ${te.accounts.length}
      </h2>
      ${te.accounts.map(Pe=>Y(X,Pe,Ae))}
    </section>`}function oe(X,te){return i`<div
      class="usage-meter__card"
      id=${Xu}
      role="dialog"
      aria-label=${`${X.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ue(X.provider,X.snapshot,te)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function de(){let X=[];for(let _e of nd){let Pe=o.get(_e.key);Pe&&X.push({provider:_e,snapshot:Pe})}if(X.length===0){x(),u();return}let te=X.find(_e=>_e.provider.key===r&&_e.snapshot.accounts.length>0);te||x();let Ae=Date.now();Ke(j(X,Ae),e),e.hidden=!1,te?Ue(te,Ae):f()}function Ue(X,te){let Ae=d(),_e=e.getBoundingClientRect(),Pe=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${_e.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,Pe-_e.right)}px`),Ke(i`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${se}
        ></div>
        ${oe(X,te)}`,Ae)}async function et(X){try{let te=await fetch(X.endpoint);return te.ok?Mg(await te.json()):null}catch{return null}}async function qe(){l+=1;let X=l,te=await Promise.all(nd.map(async Ae=>({provider:Ae,snapshot:await et(Ae)})));if(!(t||X!==l)){for(let Ae of te)Ae.snapshot?o.set(Ae.provider.key,Ae.snapshot):o.delete(Ae.provider.key);de()}}return u(),qe(),s=setInterval(()=>{qe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),x(),u()}}}function id(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),l=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!l&&typeof s.dismissed_at!="number"}}var Za=new Set(["unavailable","not_applicable"]);function Fr(e,t){if(typeof e!="object"||e===null)return null;let r=e[t];return typeof r=="object"&&r!==null?r:null}function ld(e){return e.filter(t=>t!==null).join(" \xB7 ")}function jr(e,t){return t===null?null:`${qr[e]}: ${t.display} (${uo[t.source]})`}function Xa(e){return e.filter(t=>t!==null).join(`
`)}function cd(e){if(typeof e!="object"||e===null)return null;let t=br(e);if(t==="")return null;let r=(n,s)=>typeof s=="string"&&s.length>0?`${n}: ${s}`:null;return{text:t,title:Xa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",r("runner",e.runner),r(qr.orchestration_model,e.model),r(qr.orchestration_effort,e.effort),r(qr.orchestration_speed,e.speed)])}}function ud(e,t){let r=Fr(e,"orchestration_model");if(r===null||r.resolution==="unavailable")return null;let n=Fr(e,"orchestration_effort"),s=Fr(e,"orchestration_speed"),o=ld([Rr(t,r.value??""),r.display,n!==null&&n.value!==null?n.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Xa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",jr("orchestration_model",r),jr("orchestration_effort",n),jr("orchestration_speed",s)])}}function Pg(e,t){return e===null||e.value===null||Za.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Dg(e){return e===null||Za.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Ng(e){return e===null?null:e.value==="auto"?"auto":Za.has(e.resolution)?null:e.display}function Qa(e,t){if(typeof e!="object"||e===null)return null;let r=Fr(e,"impl_dispatch"),n=Fr(e,"impl_runtime"),s=Fr(e,"impl_model"),o=Fr(e,"impl_effort"),a=Fr(e,"impl_speed"),l=r!==null&&r.value==="main"?"\uBA54\uC778":ld([Pg(n,t??null),Dg(s),Ng(o),a!==null&&a.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Xa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",jr("impl_dispatch",r),jr("impl_runtime",n),jr("impl_model",s),jr("impl_effort",o),jr("impl_speed",a)])}}var qg="worker-ineligible";function Ja(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function dd(e){return Ja(e).includes(qg)}var Fg="worker-serial";function ei(e){return Ja(e).includes(Fg)}function ti(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var jg=new Set(["done","failed","orphaned","stopped","discarded"]),Bg={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Ug={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Wg={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function ri(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Wg[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function pd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,l=document.createElement("dialog");l.id="worker-parallel-analysis-dialog",l.className="pa",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),e.appendChild(l);let c=new Map,u=new Map,d=!1,f=null,g=null,x=null,A=new Set,L=!1,z=0,ae=null,se=new Set;function q(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function N(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function I(){return o&&o()||""}async function j(){if(!s)return;let k=++z;L=!0,x=null,A.clear(),fe();try{let S=await s("worker-parallel-analysis-targets",{root_dir:I()});if(k!==z||!Ee)return;let O=Array.isArray(S?.qualified)?S.qualified:[],J=Array.isArray(S?.excluded)?S.excluded:[];x={qualified:O,excluded:J};for(let Te of O)Te&&typeof Te.id=="string"&&A.add(Te.id)}catch{k===z&&Ee&&(x={qualified:[],excluded:[]},pe("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{k===z&&(L=!1,Ee&&fe())}}function m(k){return Array.isArray(k.runs)?k.runs:[]}function E(){let k=q(),S=new Set;for(let O of Object.values(k.attempts||{})){let J=O;J&&typeof J.bead_id=="string"&&!jg.has(J.status)&&S.add(J.bead_id)}for(let O of Array.isArray(k.pr_wait)?k.pr_wait:[])O&&typeof O.bead_id=="string"&&S.add(O.bead_id);for(let O of Object.values(k.discard_operations||{})){let J=O;J&&J.phase!=="done"&&typeof J.bead_id=="string"&&S.add(J.bead_id)}return S}function Y(k){return k.filter(S=>ue(S)===null)}function ue(k){let S=q();for(let O of Array.isArray(S.serial_lanes)?S.serial_lanes:[])if(Array.isArray(O?.entries)&&O.entries.some(J=>J.bead_id===k))return O.id;return(Array.isArray(S.queue)?S.queue:[]).some(O=>O.bead_id===k)?"parallel":null}function oe(k,S){let O=c.get(k);return O||[...S.order]}function de(k){if(k.length<2)return!1;let S=ue(k[0]);if(!S||S==="parallel")return!1;let O=q(),J=(Array.isArray(O.serial_lanes)?O.serial_lanes:[]).find(ye=>ye.id===S)?.entries.map(ye=>ye.bead_id);if(!Array.isArray(J))return!1;let Te=k.map(ye=>J.indexOf(ye));return Te.every(ye=>ye>=0)&&Te.every((ye,Ce)=>Ce===0||ye>Te[Ce-1])}function Ue(){let k=q(),S=Array.isArray(k.serial_lanes)?k.serial_lanes:[],O=S.find(J=>Array.isArray(J.entries)&&J.entries.length===0);return O?O.id:S[0]?.id||"s1"}function et(k){let S=q().bead_titles||{};return typeof S[k]=="string"?S[k]:k}async function qe(k,S){if(!s||d)return null;d=!0,fe();try{return await s(k,S)}finally{d=!1,fe()}}async function X(k){n?.setPending?.(!0);try{let S=await qe("worker-parallel-analysis-start",{force:k,target_ids:Array.from(A)});S&&S.applied===!1&&S.reason&&(S.reason==="target_not_qualified"&&Array.isArray(S.detail)?pe(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${S.detail.join(", ")}`,"error",3200):pe(`\uBD84\uC11D \uC2E4\uD328: ${S.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function te(){let k=N().job;!s||!k||await s("worker-parallel-analysis-cancel",{job_id:k.job_id})}async function Ae(k){if(!(!s||se.has(k))){se.add(k),fe();try{let S=await s("worker-parallel-analysis-prompt",{root_dir:I(),run_id:k});if(!Ee)return;if(S?.ok===!0&&typeof S.prompt=="string"){ae={run_id:k,prompt:S.prompt};return}pe(S?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{se.delete(k),fe()}}}function _e(){ae=null,fe()}async function Pe(){if(!ae)return;let k=await ir(ae.prompt);pe(k?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",k?"success":"error",1400)}function le(k,S){a&&a(k,ri(S))}function Me(){return q().runner_catalog}function Oe(k){return Object.keys(Me()?.runners?.[k]?.models||{})}function He(k){let S=Oe(k),O=Me()?.runners?.[k]?.default_model;return typeof O=="string"&&S.includes(O)?O:S[0]||""}function $e(){let k=N().settings,S=f||k.runner||"claude",O=Oe(S),J=f?He(S):k.model||O[0]||"",Te=ti(Me(),S,J),ye=k.effort||"",Ce=Te.includes(ye)?ye:Te[0]||"";return{runner:S,model:J,effort:Ce,models:O,efforts:Te}}async function Ve(k){let S=N().settings,O=await qe("worker-parallel-analysis-settings-update",{expected_revision:S.revision,runner:k.runner,model:k.model,effort:k.effort});(!O||O.applied!==!0)&&(f=null,fe(),O&&O.reason&&pe(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${O.reason}`,"error",2800))}function it(k){f=k,fe();let S=$e();Ve({runner:k,model:S.model,effort:S.effort})}function Ie(k){let S=$e(),O=ti(Me(),S.runner,k);Ve({runner:S.runner,model:k,effort:O.includes(S.effort)?S.effort:O[0]||""})}function Je(k){let S=$e();Ve({runner:S.runner,model:S.model,effort:k})}async function G(k,S){if(!s||d)return;let O=oe(k,S),J=N();if(O.length<2||!J.last_good){pe("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Te=u.get(k)||Ue(),ye=()=>({snapshot_digest:J.last_good.identity_digest,group_index:k,lane:Te,ordered_bead_ids:O,expected_revision:q().revision});d=!0,fe();try{let Ce=await s("worker-parallel-analysis-submit",ye());Ce&&Ce.queue&&r&&r.set(Ce.queue),Ce&&Ce.applied!==!0&&Ce.conflict===!0&&(Ce=await s("worker-parallel-analysis-submit",ye()),Ce&&Ce.queue&&r&&r.set(Ce.queue)),Ce&&Ce.applied===!0?(c.delete(k),pe(`\uC9C1\uB82C \uB808\uC778 ${Te}\uC5D0 ${O.length}\uAC1C \uBC30\uCE58`,"success")):pe(`\uC81C\uCD9C \uAC70\uBD80: ${Ce?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,fe()}}function Z(k,S,O){c.set(k,oe(k,S).filter(J=>J!==O)),fe()}function xe(k){c.delete(k),fe()}function De(k,S,O,J){let Te=[...oe(k,S)],ye=Te.indexOf(O),Ce=ye+J;ye<0||Ce<0||Ce>=Te.length||(Te.splice(Ce,0,...Te.splice(ye,1)),c.set(k,Te),fe())}function We(){let k=N().settings,S=Object.keys(Me()?.runners||{}),O=$e();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${J=>it(J.target.value)}
        >
          ${S.map(J=>i`<option
                value=${J}
                ?selected=${O.runner===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${J=>Ie(J.target.value)}
        >
          ${O.models.map(J=>i`<option
                value=${J}
                ?selected=${O.model===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${J=>Je(J.target.value)}
        >
          ${O.efforts.map(J=>i`<option
                value=${J}
                ?selected=${O.effort===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      ${Ge(k)}
    </div>`}function Ge(k){return!ct(k)||ze(k)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:k.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${k.runner}/${k.model} · effort
        ${k.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:k.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function ze(k){return k.is_default===!0&&k.compatible===!1}function ct(k){return!!(k.runner&&k.model&&k.effort)}function pt(k){return ct(k)&&k.compatible!==!1}function U(k){let S=Math.max(0,Math.floor(k/1e3)),O=Math.floor(S/60),J=S%60;return`${O}:${String(J).padStart(2,"0")}`}function V(k){let S=k.job;if(S){let O=typeof S.started_at=="number"?S.started_at:0,J=`${S.runner||"?"}/${S.model||"?"}`,Te=O?` \xB7 \uACBD\uACFC ${U(Date.now()-O)}`:"",ye=typeof S.session_id=="string"?S.session_id:"",Ce=m(k).find(je=>je.run_id===S.job_id);return i`<span class="pa-meta__progress">
        <span
          >분석 중 — ${J} · effort ${S.effort||"?"}${Te}</span
        >
        ${ye?i`<code class="pa-session-id" title=${ye}
              >${ye.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>le(S.job_id,Ce||S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Ce?.prompt_saved!==!0||se.has(S.job_id)}
          @click=${()=>{Ae(S.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return ve()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function ve(){return n?.isPending?.()===!0}function ot(k){let S=!!k.job,O=pt(k.settings),J=x!==null&&A.size===0,Te=S||d||ve()||L;return i`<div class="pa-meta">
      ${k.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(k.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${V(k)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!O||Te||J}
        @click=${()=>{X(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!O||Te||J}
        @click=${()=>{X(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!S}
        @click=${()=>{te()}}
      >
        취소
      </button>
    </div>`}function ke(k){return typeof k=="string"&&k.length>0?k:"\uBBF8\uBC30\uCE58"}function T(k,S){S?A.add(k):A.delete(k),fe()}function M(k){let S=Array.isArray(k.scope)?k.scope:[],O=Array.isArray(k.overlaps)?k.overlaps:[];return S.length===0&&O.length===0?i``:i`<span class="pa-target__signals">
      ${S.length>0?i`<details class="pa-target__scope" title=${S.join(`
`)}>
            <summary>scope ${S.length}</summary>
            <ul>
              ${S.map(J=>i`<li><code>${J}</code></li>`)}
            </ul>
          </details>`:""}
      ${O.length>0?i`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${O.join(", ")}`}
            >겹침 ${O.join(", ")}</span
          >`:""}
    </span>`}function P(){let k=x?.qualified||[],S=x?.excluded||[];return i`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${L?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${k.length} \xB7 \uC81C\uC678 ${S.length}`}</span
        >
      </header>
      ${x&&k.length>0?i`<ul class="pa-targets__list">
            ${k.map(O=>i`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${O.id}
                      .checked=${A.has(O.id)}
                      @change=${J=>T(O.id,J.target.checked)}
                    />
                    <span class="pa-target__title">${O.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${M(O)}
                    <span class="pa-target__route">${O.route}</span>
                    <span class="pa-target__lane"
                      >${ke(O.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:x&&k.length===0?i`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${x&&S.length>0?i`<details class="pa-targets__excluded">
            <summary>제외 대상 ${S.length}</summary>
            <ul class="pa-targets__list">
              ${S.map(O=>i`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${O.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Bg[O.reason]||O.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ke(O.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function H(k){let S=typeof k.session_id=="string"&&k.session_id.length>0,O=S?k.session_id:"";return i`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${k.outcome}"
        >${Ug[k.outcome]||k.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(k.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${k.runner||"?"} / ${k.model||"?"} / ${k.effort||"?"}</span
      >
      ${S?i`<code class="pa-session-id" title=${O}
            >${O.slice(0,8)}</code
          >`:i`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${k.outcome==="failure"&&k.reason?i`<span class="pa-run-row__reason">${k.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>le(k.run_id,k)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${k.prompt_saved!==!0||se.has(k.run_id)}
          @click=${()=>{Ae(k.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function ce(k){return i`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${k.length>0?i`<ul class="pa-runs__list">
            ${k.map(S=>H(S))}
          </ul>`:i`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function y(){return ae?i`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${_e}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${ae.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Pe()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${_e}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${ae.prompt}</pre
        >
      </section>
    </div>`:""}function C(k,S){let O=oe(k,S),J=E(),Te=O.filter(tt=>J.has(tt)),ye=Y(O),Ce=de(O),je=Array.isArray(q().serial_lanes)?q().serial_lanes:[],Tt=u.get(k)||Ue(),ht=S.eligible!==!0||O.length<2||Te.length>0||ye.length>0||Ce||d;return i`<section class="pa-group" data-group-index=${String(k)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${S.confidence}</span>
        ${S.categories.map(tt=>i`<span class="pa-group__category">${tt}</span>`)}
        ${Ce?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${S.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ye.length>0?i`<span class="pa-group__stale"
              >stale — ${ye.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${S.reason}</p>
      <ol class="pa-group__members">
        ${O.map((tt,Pt)=>i`<li class="pa-member" data-bead-id=${tt}>
              <span class="pa-member__seq">${Pt+1}</span>
              <span class="pa-member__title">${et(tt)}</span>
              ${J.has(tt)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${tt}
                ?disabled=${Pt===0}
                aria-label=${`${tt} \uC704\uB85C`}
                @click=${()=>De(k,S,tt,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${tt}
                ?disabled=${Pt===O.length-1}
                aria-label=${`${tt} \uC544\uB798\uB85C`}
                @click=${()=>De(k,S,tt,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${tt}
                aria-label=${`${tt} \uC81C\uC678`}
                @click=${()=>Z(k,S,tt)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${S.evidence.map(tt=>i`<li class="pa-evidence">
              <code>${tt.path}</code>
              <span class="pa-evidence__locator">${tt.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>xe(k)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${tt=>{u.set(k,tt.target.value),fe()}}
          >
            ${je.map((tt,Pt)=>i`<option
                  value=${tt.id}
                  ?selected=${Tt===tt.id}
                >
                  직렬 ${Pt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${ht}
          @click=${()=>{G(k,S)}}
        >
          제출
        </button>
      </footer>
    </section>`}function D(k){let S=Array.isArray(k.issues)?k.issues:[],O=S.filter(Te=>Te.verdict==="parallel_ok").length,J=S.filter(Te=>Te.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${O}</span>
      <span>uncertain ${J}</span>
    </div>`}function me(){let k=Ee&&!!N().job;if(k&&g===null){g=setInterval(()=>fe(),1e3);return}!k&&g!==null&&(clearInterval(g),g=null)}function fe(){let k=N();f&&k.settings.runner===f&&(f=null);let S=k.last_good?.result;me(),Ke(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${be}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${We()} ${ot(k)} ${P()}
            ${S?i`${S.groups.map((O,J)=>C(J,O))}
                ${S.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${D(S)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${ce(m(k))}
          </div>
        </div>
        ${y()}
      `,l)}let Ee=!1,Fe=()=>{Ee=!1,ae=null,z+=1,me()},Ye=k=>{k.target===k.currentTarget&&be()};l.addEventListener("close",Fe),l.addEventListener("cancel",Fe),l.addEventListener("click",Ye);let Qe=null;r&&r.subscribe&&(Qe=r.subscribe(()=>{Ee&&fe()}));let W=null;n&&n.subscribe&&(W=n.subscribe(()=>{Ee&&fe()}));function re(){Ee||(Ee=!0,fe(),j(),typeof l.showModal=="function"?l.showModal():l.setAttribute("open",""))}function be(){Ee&&(Ee=!1,ae=null,z+=1,me(),typeof l.close=="function"?l.close():l.removeAttribute("open"))}return{open:re,close:be,destroy(){Ee=!1,g!==null&&(clearInterval(g),g=null),l.removeEventListener("close",Fe),l.removeEventListener("cancel",Fe),l.removeEventListener("click",Ye),Qe&&(Qe(),Qe=null),W&&(W(),W=null),l.remove()}}}var fd=new Set(["sh","bash","zsh","dash","ksh"]),_d=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function md(e){let t=e.split("/");return t[t.length-1]||""}function zg(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=md(r[0]);if(n!=="env")return fd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&fd.has(md(s))}function Hg(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Gg(e){let t=[],r=0;_d.lastIndex=0;for(let n of e.matchAll(_d)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Hg(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Vg(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function gd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",l="",c=0,u=null,d=!1;function f(I,j){return j?Gg(I).map(m=>m.kind==="plain"?m.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${m.kind}"
            >${m.text}</span
          >`):I}function g(){if(!s)return i``;let I=o==="ready"&&zg(a),j=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>q()}
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
              @click=${()=>q()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?i`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?i`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:i`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${j.map((m,E)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${E+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(m,I)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function x(){Ke(g(),n)}async function A(){if(o!=="ready")return;let I=await ir(a);pe(I?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",I?"success":"error")}function L(I){I.key==="Escape"&&s&&(I.preventDefault(),q())}function z(){d||(document.addEventListener("keydown",L),d=!0)}function ae(){d&&(document.removeEventListener("keydown",L),d=!1)}async function se(I,j=null){let m=++c;z(),s={...I},u=j||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",l="",x(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let Y=t?t():"";if(!Y){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",x();return}if(!r){o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",x();return}let ue="/api/repo-ops-script?workspace="+encodeURIComponent(Y)+"&lane="+encodeURIComponent(I.lane)+"&base_sha="+encodeURIComponent(I.base_sha);try{let oe=await r(ue),de=await oe.json().catch(()=>({}));if(m!==c)return;if((t?t():"")!==Y){q();return}if(!oe.ok||!de||de.ok!==!0){o="error",l=Vg(de&&typeof de.error=="string"?de.error:""),x();return}s={lane:de.lane,base_sha:de.base_sha,path:de.path,base_ref:de.base_ref},a=String(de.content),o="ready",x()}catch{if(m!==c)return;o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",x()}}function q(){c+=1,ae(),s=null,a="",x();let I=u;u=null,I?.isConnected&&I.focus()}function N(){q(),n.remove()}return{open:se,close:q,destroy:N}}function bd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let m=o();return typeof m.revision=="number"?m.revision:0}function l(m){t&&m&&m.queue&&typeof m.queue=="object"&&t.set(m.queue)}function c(){let m=o().workspace_info;return m&&typeof m=="object"?m:{}}function u(m,E){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${m}"
      >${E}</span
    >`}function d(m){if(typeof m!="number"||!Number.isFinite(m))return"";let E=m/6e4;return Number.isInteger(E)?`timeout ${E}\uBD84`:`timeout ${Math.round(m/1e3)}\uCD08`}function f(m){let E=d(m);return E?u("config",E):""}function g(m,E,Y){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${Y.script}
      @click=${ue=>{s&&s({lane:m,base_sha:E.base_sha,path:Y.script,base_ref:E.base_ref},ue.currentTarget)}}
    ></button>`}function x(){let m=o().repo_ops_opt_out;return{verify:m?.verify===!0,deploy:m?.deploy===!0}}function A(m,E){return i`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!E}
        @change=${Y=>{se(m,!Y.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function L(m){let E=typeof m.base_sha=="string"?m.base_sha:"",Y=`${m.source_path||"repo-ops/config.toml"} @ ${m.base_ref||"?"}${E?`@${E.slice(0,7)}`:""}`,ue=x(),oe=!!m.verify&&ue.verify,de=!!m.deploy&&ue.deploy;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${Y}</span>
      </p>
      <div
        class="worker-repo-ops__lane${oe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${m.verify?i`${g("verify",m,m.verify)}
              ${f(m.verify.timeout_ms)}
              ${oe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${oe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":m.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${m.verify?A("verify",ue.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${de?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${m.deploy?i`${g("deploy",m,m.deploy)}
              ${f(m.deploy.timeout_ms)}
              ${de?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${de?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":m.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${m.deploy?A("deploy",ue.deploy):""}
      </div>
    </section>`}function z(m){let E=m.repo_ops&&typeof m.repo_ops=="object"?m.repo_ops:null;return E&&(E.status==="resolved"||E.status==="absent")?L(E):E&&(E.status==="pending"||E.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${E.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${E.error_code?i` — <code>${E.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function ae(m){if(!r)return;let E=await r("worker-auto-repair-toggle",{on:m,expected_revision:a()});if(l(E),E&&E.conflict){let Y=await r("worker-auto-repair-toggle",{on:m,expected_revision:a()});l(Y)}n()}async function se(m,E){if(!r)return;let Y=await r("worker-repo-ops-opt-out-toggle",{kind:m,opted_out:E,expected_revision:a()});if(l(Y),Y&&Y.conflict){let ue=await r("worker-repo-ops-opt-out-toggle",{kind:m,opted_out:E,expected_revision:a()});l(ue)}n()}let q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function N(m,E,Y){return i`<div class="worker-repo-ops__policy-group" data-policy=${Y}>
      <div class="worker-repo-ops__policy-label">${m}</div>
      <ul class="worker-repo-ops__policy-list">
        ${E.map(ue=>i`<li data-token=${ue}>
              ${q[ue]||ue}
            </li>`)}
      </ul>
    </div>`}function I(m){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${m.map(E=>{let Y=[q[E.trigger]||E.trigger];return Number.isInteger(E.attempts_per_operation_attempt)?Y.push(`operation\uB2F9 ${E.attempts_per_operation_attempt}\uD68C`):Number.isInteger(E.attempts)?Y.push(`${q[E.budget]||E.budget} ${E.attempts}\uD68C`):Number.isInteger(E.sessions_per_user_action)&&Y.push(`${E.sessions_per_user_action}\uD68C`,q[E.user_actions]||E.user_actions),E.applies_when&&Y.push(q[E.applies_when]||E.applies_when),i`<li data-token=${E.id}>
            <strong>${q[E.id]||E.id}</strong>
            <span>${Y.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function j(){let m=o(),E=m.auto_repair!==!1,Y=m.repo_operation_policy&&typeof m.repo_operation_policy=="object"?m.repo_operation_policy:null,ue=Array.isArray(m.repo_operations)?m.repo_operations:[],oe=ue.find(qe=>qe.state==="repairing"),de=ue.filter(qe=>qe.state==="failed"||qe.state==="repairing"),Ue=de.length?Math.min(...de.map(qe=>typeof qe.repair?.remaining=="number"?qe.repair.remaining:0)):Y?.auto_repair?.resolution_ladder?.find(qe=>qe.id==="auto_repair_session")?.attempts??1,et=Array.isArray(Y?.auto_repair?.resolution_ladder)?Y.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${E}
          @change=${qe=>{ae(qe.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${Ue}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${oe?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${oe.repair?.owner_bead||oe.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${Y?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(Y.worker_automatic||[]).length} · 해결 사다리
                ${et.length} · 금지
                ${(Y.never_automatic||[]).length}</span
              >
            </summary>
            ${N("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Y.worker_automatic||[],"worker-automatic")}
            ${Y.supported===!1||Y.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Y.schema_version})`}
                </div>`:I(et)}
            ${N("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Y.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${z(c())} ${j()}
      </details>`}}}var wd=20,Kg=5,Yg=new Set(["failed","repairing","running","queued","retry_pending"]),hd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},yd={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Zg(e,t,r=wd){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Xg(e){if(e.type==="cleanup")return!0;let t=e.operation;return Yg.has(t.state)&&!t.dismissed&&!t.superseded_by}function Qg(e,t,r={}){let n=Zg(e,t,1/0),s=r.expanded===!0?wd:Kg,o=new Set(n.slice(0,s)),a=n.filter(l=>o.has(l)||Xg(l));return{visible:a,hidden:n.length-a.length}}function vd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Jg(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function kd(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function $d(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function eb(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(yd,n)?yd[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?i`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":i`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function tb(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?It(e.at):""}
      >${go(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${vd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(hd,t.kind)?hd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${_o(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${mo(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${vd(e)}"
          >${Jg(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?$d(yu(t.failure_kind,n)):""}
      ${eb(t)}
      ${kd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${_o(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function rb(e){let t=e.cleanup,r=sn(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?It(e.at):""}
      >${go(e.at)||"\u2014"}</span
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
        ${_u(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${$d(ko(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?i`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${kd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function nb(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?i`<div class="worker-repo-drawer__empty">기록 없음</div>`:i`<ul class="worker-rail">
          ${e.events.map(n=>n.type==="cleanup"?rb(n):tb(n))}
        </ul>`}
    ${t>0||r?i`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${r?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function xd(e,t={}){let r=null;function n(){if(r===null){Ke(i``,e);return}let a=Qg(r.operations,r.cleanup_failures,{expanded:r.expanded});Ke(nb({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let l=a.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){o();return}l?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var sb=yt("views:worker"),ob="tab:worker:ready",ab="tab:worker:blocked",ib="tab:worker:in-progress",lb="tab:worker:resolved",cb="tab:worker:closed",Ao=1,Ad=5;function Sd(e){return no(e).path.length>0}var ub=new Set(["quick_fix","spec_backed","full_plan"]);function Ed(e){return typeof e=="string"&&ub.has(e)}var Id="beads-ui.worker.candidate-filter",ni={show_blocked:!1,spec:"all"};function db(){try{let e=window.localStorage.getItem(Id);if(!e)return{...ni};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ni};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ni}}}function pb(e){try{window.localStorage.setItem(Id,JSON.stringify(e))}catch{}}function fb(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var _b=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ld="bdui.worker.candidate_sort",mb=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],So="spec";function gb(){try{let e=window.localStorage.getItem(Ld);return e==="board"||e==="created"||e==="spec"?e:So}catch{return So}}function bb(e){try{window.localStorage.setItem(Ld,e)}catch{}}var Od="bdui.worker.done-range";function hb(){try{let e=window.localStorage.getItem(Od);return Qt(e)?e:Ht}catch{return Ht}}function yb(e){try{window.localStorage.setItem(Od,e)}catch{}}var vb="(max-width: 640px)",Md="beads-ui.worker.lane-collapsed",ls={queue:!0,done:!0};function wb(){try{let e=window.localStorage.getItem(Md);if(!e)return{...ls};let t=JSON.parse(e);return!t||typeof t!="object"?{...ls}:{queue:typeof t.queue=="boolean"?t.queue:ls.queue,done:typeof t.done=="boolean"?t.done:ls.done}}catch{return{...ls}}}function kb(e){try{window.localStorage.setItem(Md,JSON.stringify(e))}catch{}}function Td(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function $b(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Qr):(n.sort(Es(r)),t==="board"?n:[...n.filter(Sd),...n.filter(s=>!Sd(s))])}function xb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ab(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Cd(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Sb(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Eb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Tb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Cb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function si(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Rb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Rd(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function Ib(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):Rd(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Rd(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Cd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Cd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Lb(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,d=null,f=null,g=null,x={},A=!1,L=!1,z={}){let ae=!!c&&c.position>0,se=!!c?.continuation_action&&c.continuation_action.continuation===null,q=!!c&&c.active===!0,N=c&&c.failure||null,I=Eb(c?c.waiting:null,g),j=r[e]||null,m=j&&j.gate?j.gate:null,E=j&&j.pr?j.pr:null,Y=Rb(g),ue=Tb(c?c.resolution:null),oe=Cb(c?c.head_review:null),de=c&&c.head_review||null,Ue=c&&c.authority||null,et=!!de&&["pending","reviewing","revising"].includes(de.state),qe=ae&&!q&&(de?.state==="failed"||!Ue||Ue.source==="automatic"&&!L),X=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ue?ue.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":I,te=!!m&&m.base_badge==="\uCDA9\uB3CC",Ae=!!m&&m.enabled===!0,_e=ss({bead_id:e,merge_sha:z.merge_sha,cleanup_cursor:z.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:z.repo_operations}),Pe=wo(_e),le=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!m&&m.tier==="merged",Me=l&&!!n&&!!m&&m.tier==="merged",Oe=qe&&(Ae||te||m?.reason==="base_behind"||m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"||le||Me),He=l&&te&&u===!1,$e=vr(x,e,{external:l,merge_active:q||_e?.step==="merge",merge_queued:ae,conflict_active:!!a,cleanup_active:Pe,merged:!!n||m?.tier==="merged"}),Ve=!!$e.operation,it=!le&&!!n&&n.step==="repo_operations",Ie=Ib({continuation_required:se,merge_step:_e,conflict_badge:X,conflict_live:ue?.live===!0||a==="running",head_review:de&&oe?{...oe,state:de.state,failure_reason:de.failure_reason}:null,recovery:Y,cleanup_failed:n,cleanup_label:n?sn(n.step):null,base_exception:f,conflicting:te,gate:m,receipt_check:j&&j.receipt_check?j.receipt_check:null,queue_failure:N,auto_skip:d,queued:ae,queue_active:q,queue_position:c?c.position:0,activity:X?null:o&&o.activity||null}),Je=Ie?.live===!0&&Ie.title?i`<span title=${Ie.title}>${Ie.label}</span>`:Ie?.label||null;return{id:e,title:l?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&_e?.active!==!0?vo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:l,pr_number:E&&typeof E.number=="number"?E.number:null,pr_url:E&&typeof E.url=="string"?E.url:"",completion_badge:Ie?.live!==!0&&Ie?.title?Ie.label:null,completion_title:Ie?.title||"",completion_repair_pr_url:Y?Y.repair_pr_url:"",completion_repair_pr_number:Y?Y.repair_pr_number:null,badges:Je?[Je]:[],live_badge:Ie?.live===!0?Je:null,usage:s,alert:Ie?.alert===!0,merge_action:m?.tier==="merged"&&!le&&!Me||it?!1:!ae||se||qe,timeline_action:it,cancel_action:ae&&!se,cancel_enabled:(!q||et)&&!(Y&&Y.lock_actions),cancel_title:Y&&Y.lock_actions?`${Y.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:q&&!et?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":et?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:$e,discard_action:$e.action,merge_step:_e,discard_enabled:$e.enabled,discard_title:$e.title,merge_enabled:!_e&&!a&&!Ve&&!f&&!(Y&&Y.lock_actions)&&!He&&!it&&(Ae||te||m?.reason==="base_behind"||m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"||le||Me||Oe),merge_label:se?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":le||Me?"\uC815\uB9AC \uC7AC\uAC1C":te&&!_e&&!le?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":m?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":qe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ve?$e.error?`\uD3D0\uAE30 \uC2E4\uD328: ${$e.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${$e.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:se?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":_e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${_e.label}`:Me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":He?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":te?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":m?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":m?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ae?`\uBA38\uC9C0 (${m.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:m&&m.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${m&&m.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function oi(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:d,onDoneRangeChange:f}=t,g=n?Cs(n,l):null,x=Os({transport:r,uiOrderStore:l}),A=null,L=[],z=db(),ae=null,se=gb(),q=Qt(d)?d:hb(),N=new Map;function I(){let p=gr.find(v=>v.value===q);return p?p.label:"\uC624\uB298"}let j=wb(),m=!1,E=new Set,Y=new Set,ue=new Set,oe=new Set,de=new Set,Ue={},et=null,qe=0,X=null,te=[];function Ae(p){return et===p?Ue:{}}async function _e(){if(!r)return;let p=u?.()||"";if(et===p||X&&X.key===p&&X.generation===qe)return;let v=++qe;X={key:p,generation:v};let B=null;try{B=await Promise.resolve(r("get-session-defaults",{}))}catch(_){if(v!==qe)return;X=null,sb("get-session-defaults failed: %o",_),Ne();return}v===qe&&(Ue=B&&typeof B.values=="object"&&B.values!==null?{...B.values}:{},et=p,X=null,Ne())}function Pe(){et=null,qe+=1,_e()}let le=document.createElement("div");le.className="worker-console";let Me=document.createElement("div");Me.className="worker-top";let Oe=document.createElement("div");Oe.className="worker-drawer-overlay",Oe.hidden=!0;let He=document.createElement("div");He.className="worker-drawer-overlay__backdrop";let $e=document.createElement("div");$e.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,Oe.append(He,$e,Ve);let it=document.createElement("div");it.className="worker-lanes-host",le.append(Me,Oe,it),e.appendChild(le);let Ie=null,Je=null,G=ro($e,{transport:r,sessionLogStore:a,onClose:()=>{Ie=null,Je=null,Oe.hidden=!0,Ne()}}),Z=xd(Ve,{onClose:()=>{Ve.hidden=!0,Oe.hidden=!0,Ne()}}),xe=gd({getWorkspacePath:u||(()=>"")}),De=u&&u()||"",We=bd({queueStore:s,transport:r,onChanged:()=>Ne(),onOpenScript:(p,v)=>{xe.open(p,v)}}),Ge=o?pd(le,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(p,v)=>xt(p,v)}):null;function ze(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ao,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ct(){let p=ze(),v=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,B=Array.isArray(p.serial_lanes)?p.serial_lanes:[],_=[];for(let ee of B){if(_.length>=v)break;!ee||typeof ee.id!="string"||!/^s[1-5]$/.test(ee.id)||!Array.isArray(ee.entries)||_.push({id:ee.id,label:`\uC9C1\uB82C ${ee.id.slice(1)}`,count:ee.entries.length})}return _.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},..._]}function pt(p){if(!ae||!p.some(B=>B.id===ae))return null;let v=ct();return v?{bead_id:ae,lanes:v}:null}function U(){let p=ze();return typeof p.revision=="number"?p.revision:0}function V(p){p&&p.queue&&s&&s.set(p.queue)}function ve(){let p=ze().queue;return Array.isArray(p)?p.length:0}async function ot(p,v,B){if(!r)return;let _=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},...B===void 0?{}:{index:B},expected_revision:U()}),h=await r("worker-queue-place",_());V(h),h&&h.conflict&&await r("worker-queue-place",_()).then(V)}async function ke(p,v,B){if(!r)return;let _=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:B,expected_revision:U()}),h=await r("worker-queue-reorder",_());V(h),h&&h.conflict&&await r("worker-queue-reorder",_()).then(V)}async function T(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:U()});V(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:U()}).then(V)}async function M(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&pe(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function P(p){if(!r||!p)return;let v=await kn();if(v===null)return;let B=async(h={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:U(),...v!==""?{instructions:v}:{},...h}),_=await B();V(_),_&&_.conflict&&(_=await B(),V(_)),_=await $r(_,(h,ee)=>B({continuation:h,decision_token:ee}),{onResult:V,refresh:()=>B()}),_&&_.resumed===!1&&!_.conflict&&_.reason&&pe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function H(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:U()});V(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:U()}),V(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&pe(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function ce(p,v,B=!0){if(!r)return null;let _=r,h=await _(p,{...v,expected_revision:U()});return V(h),h&&h.conflict&&B&&(h=await _(p,{...v,expected_revision:U()}),V(h)),h}async function y(p){if(!r||!p)return;let v=ze().merge_queue?.find(_=>_.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await D(p,v.mismatch);return}E.add(p),Ne();let B;try{B=await ce("worker-merge-queue-add",{bead_id:p})}finally{E.delete(p),Ne()}!B||B.conflict||B.applied||pe(Sb(B.reason),"error",2400)}async function C(p){if(!(!r||!p||Y.has(p))){Y.add(p),Ne();try{let v=await r("worker-cleanup-retry",{bead_id:p,expected_revision:U()});V(v),v&&!v.retried&&!v.conflict&&v.reason&&pe(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{Y.delete(p),Ne()}}}async function D(p,v){let B=await $r({continuation_mismatch:v},(h,ee)=>ce("worker-merge-queue-add",{bead_id:p,continuation:h,decision_token:ee},!1)),_=B?.queue?.merge_queue?.find(h=>h.bead_id===p)?.continuation_action;if(B?.applied!==!0&&_?.continuation===null&&_.mismatch){await D(p,_.mismatch);return}B&&B.applied===!1&&!B.conflict&&pe("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function me(p){if(!r)return;let v=await ce("worker-merge-auto-toggle",{on:p});!v||v.conflict||pe(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function fe(p){if(!r||!p)return;let v=await ce("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&pe("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ee(){await ce("worker-merge-queue-remove",{all:!0})}async function Fe(p,v=null,B="unmerged",_=null){if(!r||!p)return;let h=ts(p,B);if(!(!!_||typeof globalThis.confirm!="function"||globalThis.confirm(h)))return;let Q=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},..._?{operation_id:_}:{},expected_revision:U()});if(V(Q),Q&&Q.conflict&&(Q=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},..._?{operation_id:_}:{},expected_revision:U()}),V(Q)),Q&&Q.discarded===!0){pe(bo(Q),"success",5e3);return}if(Q&&Q.reason){pe(`\uD3D0\uAE30 \uC2E4\uD328: ${Q.reason}`,"error",2800);return}if(Q&&Q.accepted&&Q.pending==="merged_revert"){pe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Q&&Q.accepted&&!Q.discarded){pe(`\uD3D0\uAE30 \uC9C4\uD589: ${Q.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Q&&!Q.conflict&&pe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Ye(p,v,B){if(!(!r||!v||!B||oe.has(v))){oe.add(v),Ne();try{let _=await r(p,{bead_id:v,action_id:B,expected_revision:U()});V(_),_?.conflict?pe("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!_?.ok&&_?.reason&&pe(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(_.reason)}`,"error",2800)}finally{oe.delete(v),Ne()}}}async function Qe(p,v){if(!r||!v||ue.has(v))return;ue.add(v),Ne();let B;try{let _=async(h={})=>await r(p,{bead_id:v,expected_revision:U(),...h});B=await _(),V(B),B&&B.conflict&&(B=await r(p,{bead_id:v,expected_revision:U()}),V(B)),p==="worker-revise-fix"&&(B=await $r(B,(h,ee)=>_({continuation:h,decision_token:ee}),{onResult:V,refresh:()=>_()}))}finally{ue.delete(v),Ne()}if(!(!B||B.conflict)){if(B.ok){pe(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}pe(`\uCC98\uBD84 \uAC70\uBD80: ${B.reason||""}`,"error",3e3)}}async function W(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:U()});V(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:U()}).then(V)}async function re(p){if(!r||!p)return;let v=await r("worker-repo-operation-repair",{operation_id:p});if(V(v),v&&v.ok===!1){pe(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&pe("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function be(p){if(!r||!p)return;let v=await r("worker-repo-operation-dismiss",{operation_id:p});V(v),v&&v.ok===!1&&pe(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function k(p){if(!r||!Number.isFinite(p))return;let v=Math.max(Ao,Math.floor(p)),B=await r("worker-queue-set-slots",{slots:v,expected_revision:U()});V(B),B&&B.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:U()}).then(V)}async function S(p){if(!r||!Number.isInteger(p)||p<1||p>Ad)return;let v=ze(),B=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((ee,Q)=>ee+(Array.isArray(Q?.entries)?Q.entries.length:0),0),_=()=>({count:p,expected_revision:U()}),h=await r("worker-queue-set-serial-lane-count",_());V(h),h&&h.conflict&&(h=await r("worker-queue-set-serial-lane-count",_()),V(h)),h&&h.applied&&B>0&&pe(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${B}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function O(){let p=ze(),v=g?g.selectBoardColumn(ob,"ready"):[],B=g?g.selectBoardColumn(ab,"blocked"):[],_=g?g.selectBoardColumn(cb,"closed"):[],h=g?g.selectBoardColumn(ib,"in_progress"):[],ee=g?g.selectBoardColumn(lb,"resolved"):[],Q=Is([...v,...B,...h,...ee,..._]),Re=new Map;for(let b of[...v,...B,...h])b&&b.id&&!Re.has(b.id)&&Re.set(b.id,b);let ge={...Ae(u?.()||"")};for(let b of["orchestration_model","orchestration_effort","orchestration_speed"]){let F=p[b];typeof F=="string"&&(ge[b]=F)}function w(b,F){let ie=Re.get(b);if(!ie)return null;let Be=ie.metadata&&typeof ie.metadata=="object"?ie.metadata:{},lt=ie.workflow?.route,Rt=Be.route,St=Ed(lt)?lt:Ed(Rt)?Rt:null;return hr({pin:Be,global:ge,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:St,controller_runtime:F})}function K(b){let F=b.runner||null,ie=w(b.bead_id,F),Be=cd(b),lt=ie?Qa(ie,F):null;return Be||lt?{orchestration:Be,worker:lt}:null}let R=new Map;function he(b){if(R.has(b))return R.get(b)??null;let F=w(b,null),ie=null;if(F){let Be=Rr(p.runner_catalog??null,F.orchestration_model.value??""),lt=Be===null?F:w(b,Be),Rt=ud(lt,p.runner_catalog??null),St=Qa(lt,Be);ie=Rt||St?{orchestration:Rt,worker:St}:null}return R.set(b,ie),ie}function at(b){let F=Ls(Q,b);return F.total===0?null:F}let nt=p.bead_titles||{},Ze=new Map;for(let[b,F]of Object.entries(nt))typeof F=="string"&&F.length>0&&Ze.set(b,F);for(let b of[...v,...B])Ze.set(b.id,b.title||b.id);let Xe=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},kt=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},zt=new Map;for(let[b,F]of Object.entries(kt))Array.isArray(F)&&zt.set(b,ei(F));for(let b of[...v,...B]){let F=b.labels;Array.isArray(F)&&!zt.has(b.id)&&zt.set(b.id,ei(F))}let an=new Map,ln=o?.get()?.last_good?.result?.groups;for(let b of Array.isArray(ln)?ln:[]){if(b?.eligible!==!0||!Array.isArray(b.members))continue;let F=b.members.map(Be=>{let lt=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Rt=>Rt.entries.some(St=>St.bead_id===Be));return lt?lt.id:null});if(!(F.every(Be=>Be!==null)&&new Set(F).size===1))for(let Be of b.members)an.set(Be,b.members.filter(lt=>lt!==Be))}let cs=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},cn=new Map;for(let[b,F]of Object.entries(Xe))F&&typeof F=="object"&&cn.set(b,F);for(let b of[...v,...B])cn.set(b.id,{created_at:b.created_at,updated_at:b.updated_at});let Wr=b=>cn.get(b)||{},zr=p.pr_wait||[],un=p.pr_observations||{},us=p.pr_activity||{},Le=p.cleanup_failed||{},vt=Object.entries(Le).map(([b,F])=>({bead_id:b,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",at:F&&typeof F.at=="number"?F.at:null,detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0,failure_code:F&&typeof F.failure_code=="string"?F.failure_code:void 0,subject_id:F&&typeof F.subject_id=="string"?F.subject_id:void 0,repair_eligible:!!(F&&F.repair_eligible),repair:F&&F.repair?F.repair:void 0})),dn=p.queue||[],Vd=new Set([...dn.map(b=>b.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(b=>(Array.isArray(b?.entries)?b.entries:[]).map(F=>F.bead_id)),...zr.map(b=>b.bead_id),...p.done.map(b=>b.bead_id)]),Kd=new Set(B.map(b=>b.id)),Yd=l?l.get()?.order||{}:{},ci=new Set,ui=[];for(let b of[...v,...B])Vd.has(b.id)||ci.has(b.id)||xb(b)||(ci.add(b.id),ui.push(b));L=$b(ui,se,Yd);let Zd=p.admission||{},di=b=>{let F=Zd[b];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof F.reason=="string"?F.reason:"",Be=ie.indexOf(":");return Be>0&&Be<ie.length-1?`\u26D4 ${ie.slice(0,Be)} (${ie.slice(Be+1)})`:`\u26D4 ${ie}`},Xd=L.map(b=>{let F=no(b),ie=F.path.length>0,Be=b.workflow?.route==="quick_fix"||b.metadata&&b.metadata.route==="quick_fix",lt=!Object.hasOwn(b,"description")||typeof b.description=="string"&&b.description.trim().length>0,Rt=Object.hasOwn(b,"labels")&&dd(b.labels),St=!Rt&&(Be?lt:ie&&!F.conflict),gt=Kd.has(b.id),or=[];gt&&or.push(Ab(b)),Be&&!lt?or.push("missing_description"):!Be&&F.conflict?or.push("spec_id_conflict"):!Be&&!ie&&or.push("spec \uC5C6\uC74C");let hs=di(b.id);return hs&&or.push(hs),{id:b.id,title:b.title||b.id,reason:or.join(" \xB7 "),draggable:St,lane:"candidate",created_at:b.created_at,updated_at:b.updated_at,workflow:b.workflow,is_quick_fix:Be,status:b.status,worker_ineligible:Rt,blocked:gt,has_spec:ie,exec_chips:he(b.id)}}),Eo=fb(Xd,z),Qd=Eo.visible,Jd=p.revise_parked||{},ds=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},To=(b,F)=>b.map((ie,Be)=>{let lt=F!=="done",Rt=F!=="done"&&F!=="queue",St=lt?Jd[ie.bead_id]:null,gt=lt?vr(ds,ie.bead_id):null,or=gt?.operation?gt:null,hs=lt&&zt.get(ie.bead_id)===!0,Pi=cs[ie.bead_id]||[],Oo=p.admission&&typeof p.admission=="object"?p.admission[ie.bead_id]:null,Mo=lt?iu(Oo,!!or||oe.has(ie.bead_id)):null,pp=lt&&!Mo?di(ie.bead_id):null,fp=lt?[pp]:[],Di=lt&&Pi.length>0&&typeof Oo?.reason=="string"&&Oo.reason.startsWith("not_ready")?[`\u23F8 ${Pi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Po=lt?an.get(ie.bead_id):void 0;return Po&&Po.length>0&&Di.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Po.join(", ")}\uC640`),{id:ie.bead_id,title:Ze.get(ie.bead_id)||ie.bead_id,reason:fp.filter(Boolean).join(" \xB7 "),draggable:lt&&!or&&!Mo,done:F==="done",lane:F,seq:Rt?Be+1:void 0,worker_serial:hs,discard:or,stale_work:Mo,badges:[...Di,...St?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!St,revise_action:!!St,revise_enabled:!!St&&!or&&!ue.has(ie.bead_id),revise_title:St?St.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${St.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?Jt(p.attempts||{},ie.bead_id):null,work_ms:F==="done"?ou(p.attempts||{},ie.bead_id):null,done_at:F==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,exec_chips:lt?he(ie.bead_id):null,...Wr(ie.bead_id)}}),pn=p.attempts?Object.values(p.attempts):[],Co=new Set;for(let b of pn)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&Co.add(b.resumed_from);let pi=new Map;for(let b of pn)pi.set(b.bead_id,b.attempt_id);let ps=new Map;for(let b of pn)ps.set(b.attempt_id,b);function Ro(b){let F=new Set,ie=b;for(;ie&&!F.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;F.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&ps.get(ie.resumed_from)||null}return!1}let fs=typeof p.declared_base=="string"?p.declared_base:null;function ep(b){let F=null;for(let ie of pn)!ie||ie.bead_id!==b||Ro(ie)||(F===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=ie);return F&&typeof F.target_base=="string"?F.target_base:null}let fi=[],_i=[],tp=id(p),mi=b=>{let F=typeof b.session_id=="string"&&b.session_id.length>0,ie=Co.has(b.attempt_id);return{eligible:F&&!ie,reason:F?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},sr=null;for(let b of pn){let F=b.status==="paused"&&!Co.has(b.attempt_id);if(b.status==="running"||F)_i.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:Ze.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,paused:F,conflict_resolution:Ro(b),base_exception:si(fs,b.target_base),can_pause:typeof b.session_id=="string"&&b.session_id.length>0,discard:vr(ds,b.bead_id,{attempt_id:b.attempt_id}),usage:Jt(p.attempts||{},b.bead_id),rollup:at(b.bead_id),rollup_expanded:de.has(b.bead_id),exec_chips:K(b),...Wr(b.bead_id)});else if((b.status==="failed"||b.status==="orphaned")&&tp(b)){let ie=mi(b);fi.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:Ze.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,failed:!0,status:b.status,status_label:b.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:vr(ds,b.bead_id,{attempt_id:b.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:Ro(b),base_exception:si(fs,b.target_base),usage:Jt(p.attempts||{},b.bead_id),rollup:at(b.bead_id),rollup_expanded:de.has(b.bead_id),exec_chips:K(b),...Wr(b.bead_id)}),sr=b}}let _s=[...fi,..._i].map(b=>{let F=ps.get(b.attempt_id),ie=F?.quickfix_landing;if(F?.quickfix_lane!==!0||!ie||typeof ie!="object")return b;let Be=typeof ie.reason=="string"&&ie.reason.length>0?ie.reason:null,lt=ss({bead_id:F.bead_id,merge_sha:ie.head_sha,cleanup_cursor:ie.cursor,cleanup_failed:Be?{step:ie.cursor,reason:Be}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return lt?{...b,landing:lt}:b}),gi=null;if(sr){let b=mi(sr),F=sr.cause_detail;gi={bead_id:sr.bead_id,repo:sr.repo||"",reason:sr.cause||sr.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:sr.attempt_id,resume_eligible:b.eligible,resume_reason:b.reason,discard:vr(ds,sr.bead_id,{attempt_id:sr.attempt_id})}}let bi=new Set(_s.map(b=>b.bead_id)),Io=Array.isArray(p.merge_queue)?p.merge_queue:[],hi=new Map,yi=new Map,vi=new Map,wi=new Map,ki=new Map;Io.forEach((b,F)=>{b&&typeof b.bead_id=="string"&&(hi.set(b.bead_id,F+1),yi.set(b.bead_id,b.resolution),vi.set(b.bead_id,b.continuation_action||null),wi.set(b.bead_id,b.head_review||null),ki.set(b.bead_id,b.authority||null))});let fn=p.merge_queue_state||{active:null,failures:{}},rp=fn.failures||{},$i=fn.waiting&&typeof fn.waiting.bead_id=="string"&&typeof fn.waiting.reason=="string"?fn.waiting:null,np=p.auto_merge_skips||{},xi=b=>{let F=np[b];if(!F)return null;let ie=un[b],Be=ie&&ie.pr?ie.pr.head_sha:null;return Be&&Be===F.head_sha?F.reason||"":null},ms=new Map;for(let b of _s)b.failed!==!0&&b.conflict_resolution&&(b.paused?ms.has(b.bead_id)||ms.set(b.bead_id,"paused"):ms.set(b.bead_id,"running"));let Ai=_s.filter(b=>!b.paused&&b.failed!==!0).length,Si=(p.workspace_info||{}).slots,Ei=typeof Si=="number"?Si:typeof p.slots=="number"?p.slots:Ao,sp=Ai>Ei,gs=Zr(q),op=(Array.isArray(p.done)?p.done.slice():[]).filter(b=>gs===void 0||typeof b.added_at!="number"||b.added_at>=gs).sort((b,F)=>(F.added_at||0)-(b.added_at||0)),Rn=To(op,"done"),ap=new Set((Array.isArray(p.done)?p.done:[]).map(b=>b?.bead_id).filter(b=>typeof b=="string")),Ti=[],ip=u?.()||"";for(let b of _){let F=Jr(b.closed_at);if(typeof b.id!="string"||ap.has(b.id)||F===null||gs!==void 0&&F<gs||typeof b.comment_count!="number"||b.comment_count<=0)continue;let ie=`${ip}\0${b.id}\0${String(b.updated_at)}\0${b.comment_count}`,Be=N.get(ie);Be===void 0&&r&&(N.set(ie,"pending"),Promise.resolve(r("get-comments",{id:b.id})).then(lt=>{let Rt=Array.isArray(lt)&&lt.some(St=>so(typeof St?.text=="string"?St.text:"")?.lane==="session");N.set(ie,Rt?"session":"not-session"),Ne()}).catch(()=>{N.set(ie,"failed"),Ne()})),Be==="session"&&Ti.push({id:b.id,title:b.title||b.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:F,created_at:b.created_at,updated_at:b.updated_at})}Rn.push(...Ti),Rn.sort((b,F)=>(F.done_at||0)-(b.done_at||0));let bs={};for(let b of xr)bs[b]=0;let Ci=!1,Ri=0,Lo=0,Ii=0;for(let b of Rn){let F=b.usage;if(F&&typeof F=="object"){let ie=!1;for(let Be of xr)Number.isFinite(F[Be])&&(bs[Be]+=F[Be],Ci=!0,ie=!0);ie&&(Lo+=1,Number.isFinite(F.total_cost_usd)&&(Ri+=F.total_cost_usd,Ii+=1))}}Lo>0&&Ii===Lo&&(bs.total_cost_usd=Ri);let Li=Rn.map(b=>b.usage).filter(b=>b&&typeof b=="object"&&b.providers),lp=Li.length>0?Ot(Us(Li)):Ci?lr(bs):null,cp=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},up=Array.isArray(p.serial_lanes)?p.serial_lanes:[],Oi=b=>{if(zr.some(Be=>Be.bead_id===b))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let F=pn.filter(Be=>Be&&Be.bead_id===b),ie=F.length>0?F[F.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Mi=up.filter(b=>b&&typeof b.id=="string"&&Array.isArray(b.entries)).map((b,F)=>{let ie=cp[b.id]||{},Be=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(gt=>gt&&typeof gt.bead_id=="string"&&typeof gt.after=="string").map(gt=>[gt.bead_id,gt.after])),lt=To(b.entries.filter(gt=>!bi.has(gt.bead_id)),b.id).map(gt=>Be.has(gt.id)?{...gt,badges:[`\u{1F517} ${Be.get(gt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...gt.badges]}:gt),Rt=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(gt=>typeof gt=="string"):[],St=Rt.map(gt=>({id:gt,title:Ze.get(gt)||gt,draggable:!1,lane:b.id,ghost:!0,badges:[Oi(gt)]}));return{id:b.id,index:F+1,rows:[...St,...lt],occupied:Rt.length>0,badge:Rt.length>0?Oi(Rt[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),dp=typeof p.serial_lane_count=="number"?p.serial_lane_count:Mi.length;return{queue:p,idToTitle:Ze,candidates:Qd,candidate_hidden:{blocked:Eo.hidden_blocked,spec:Eo.hidden_spec},running:_s,live_count:Ai,slots:Ei,over_cap:sp,failure:gi,waiting:To(dn.filter(b=>!bi.has(b.bead_id)),"queue"),serial_lanes:Mi,serial_lane_count:dp,pr_wait:zr.map(b=>Lb(b.bead_id,Ze.get(b.bead_id)||b.bead_id,un,Le[b.bead_id]||null,Jt(p.attempts||{},b.bead_id),us[b.bead_id]||(E.has(b.bead_id)||Y.has(b.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ms.get(b.bead_id)||null,b.external===!0,{position:hi.get(b.bead_id)||0,active:fn.active===b.bead_id,failure:rp[b.bead_id]||null,waiting:$i?.bead_id===b.bead_id?$i.reason:null,resolution:yi.get(b.bead_id),continuation_action:vi.get(b.bead_id),head_review:wi.get(b.bead_id)||null,authority:ki.get(b.bead_id)||null},b.wt_present!==!1,p.auto_merge===!0?xi(b.bead_id):null,si(fs,ep(b.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[b.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},ps.get(pi.get(b.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(b=>({...b,...Wr(b.id)})),merge_queue_length:Io.length,merge_queue_running:Io.length>0,auto_excluded:zr.map(b=>b.bead_id).filter(b=>xi(b)!==null),declared_base:fs,done:Rn,token_total:lp,cleanup_failures:vt,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function J(){let v=!!o?.get()?.job,B=!v&&o?.isPending?.()===!0,_=v?"\uBD84\uC11D \uC911":B?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${_?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${_?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${_?i`<span class="worker-analysis-btn__badge">${_}</span>`:""}
    </button>`}function Te(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",B=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,_=tt(p),h=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ee=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${p.done.length}</b></span
      >`,Q=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Re=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ao}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Ad},(K,R)=>R+1).map(K=>i`<option
                value=${String(K)}
                ?selected=${p.serial_lane_count===K}
              >
                ${K}
              </option>`)}
        </select>
      </label>
      ${o?J():""} `,ge=wu({failure:p.failure}),w=au(p.repo_operations,p.cleanup_failures);return m?i`<div class="worker-ribbon">
          ${B} ${_}
          <div class="worker-kpi worker-kpi--ribbon">${h}${ee}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Re}</div>
          <div class="worker-kpi">${Q}</div>
        </div>
        ${w}${We.template()}${ge}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${B}${_}${Re}</div>
        <div class="worker-kpi">
          ${h}${ee}${Q}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(K=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${K.tooltip}
                >${I()} 완료 · 누적 ${K.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${w}${We.template()}${ge}`}function ye(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(B=>!B.paused&&B.failed!==!0);return i`<section
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
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?Wa(p.running,Date.now(),Ie):""}
      ${p.pr_wait.map(B=>Pa(B))}
    </section>`}function Ce(p){let v=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${z.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${_b.map(B=>i`<button
              type="button"
              class="worker-filter__chip${z.spec===B.value?" is-active":""}"
              data-spec=${B.value}
              aria-pressed=${z.spec===B.value?"true":"false"}
            >
              ${B.label}
            </button>`)}
        ${v.spec>0?i`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function je(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${se}
    >
      ${mb.map(p=>i`<option value=${p.value} ?selected=${se===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function Tt(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${q}
      >
        ${gr.map(p=>i`<option value=${p.value} ?selected=${q===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function ht(p){let v=i`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,B=p.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return pr({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:B})}function tt(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(v)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let B=new Set(p.auto_excluded),_=p.pr_wait.filter(h=>h.merge_action&&h.merge_enabled&&!B.has(h.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${_>0?` ${_}`:""}
    </button>`}function Pt(p){let v=pr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:je(),controls:Ce(p),place_menu:pt(p.candidates)});return m?i`<div class="worker-lanes worker-lanes--mobile">
        ${ye(p)}
        ${pr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:j.queue,preview:Td(p.waiting)})}
        ${p.serial_lanes.map(B=>ht(B))}
        ${v}
        ${pr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:Tt(),collapsible:!0,collapsed:j.done,preview:Array.isArray(p.token_total)?p.token_total.map(B=>B.label).join(" \xB7 "):p.token_total||Td(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${pr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(B=>ht(B))}
      </div>
      ${pr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(B=>!B.paused&&B.failed!==!0),body:Wa(p.running,Date.now(),Ie)})}
      ${pr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${pr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${p.done.length}`,items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:Tt()})}
    </div>`}function wr(p){j={...j,[p]:!j[p]},kb(j),Ne()}function Ne(){let p=O();Ke(Te(p),Me),Ke(Pt(p),it)}function jt(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(vb);m=!!p.matches;let v=B=>{let _=!!(B&&typeof B.matches=="boolean"?B.matches:p.matches);_!==m&&(m=_,Ne())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),te.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),te.push(()=>p.removeListener(v)))}let Yt=null;function tr(p){Yt=p.target instanceof Element?p.target:null}function rr(p){let B=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!B)return;if(Yt&&B.contains(Yt)&&Yt.closest("input, button, a")){p.preventDefault();return}let _=B.dataset.beadId||"",h=B.dataset.lane||"";A={bead_id:_,from_lane:h};try{p.dataTransfer?.setData("text/plain",_),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function fr(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let B=v.dataset.lane||"";B!=="candidate"&&B!=="queue"&&!/^s[1-5]$/.test(B)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function Ct(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function _r(p,v){let B=L.find(Q=>Q.id===p);if(!B)return;let _=L.filter(Q=>Q.id!==p),h=_.length;if(v){let Q=v.dataset.beadId;if(Q===p)return;let Re=_.findIndex(ge=>ge.id===Q);Re>=0&&(h=Re)}let ee=_.slice();ee.splice(h,0,B),x.applyReorder(p,ee,h)}function nr(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let B=v.dataset.lane||"",_=A?.bead_id||p.dataTransfer?.getData("text/plain")||"",h=A?.from_lane||"";if(A=null,!_)return;let ee=p.target?.closest?.(".worker-mini, .worker-card"),Q=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),Re=Q.length;if(ee){let ge=Q.indexOf(ee);ge>=0&&(Re=ge)}if(Re=Math.max(0,Re-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(Re=ve()),B==="candidate"){if(h==="candidate"){_r(_,ee);return}(h==="queue"||/^s[1-5]$/.test(h))&&T(_);return}if(B==="queue"||/^s[1-5]$/.test(B)){let ge=B==="queue"?"parallel":B;h===B?ke(_,ge,Re):ot(_,ge)}}function mr(p){z=p,pb(p),Ne()}function rt(p){se=p==="board"||p==="created"||p==="spec"?p:So,bb(se),Ne()}function Zt(p){q=Qt(p)?p:Ht,yb(q),f?.(q),Ne()}function Se(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let Re=Number.parseInt(v.value,10);Number.isFinite(Re)&&S(Re).then(Ne);return}let B=p.target?.closest?.(".worker-filter__blocked");if(B){mr({...z,show_blocked:B.checked});return}let _=p.target?.closest?.(".worker-done-range");if(_){Zt(_.value);return}let h=p.target?.closest?.(".worker-sort");if(h){rt(h.value||So);return}let ee=p.target?.closest?.(".worker-slots__input");if(!ee)return;let Q=Number.parseInt(ee.value,10);if(!Number.isFinite(Q)){Ne();return}k(Q).then(Ne)}function $(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function ne(){let p=O();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function we(){Ie&&G.close(),Ve.hidden=!1,Oe.hidden=!1,Z.open(ne()),Ne()}function ut(p){let v=ze(),B=v.attempts?v.attempts[p]:null;Ie=p,Je=null,Z.close(),Ve.hidden=!0,Oe.hidden=!1,G.open({attempt_id:p,meta:$(B)}),Ne()}function xt(p,v){Ie=null,Je=p,Z.close(),Ve.hidden=!0,Oe.hidden=!1,G.open({attempt_id:p,meta:v,hide_prompt:!0}),Ne()}function _t(){if(Z.isOpen()&&Z.refresh(ne()),Je){let B=(o?.get()?.runs||[]).find(_=>_.run_id===Je);B?G.updateMeta(ri(B)):G.close();return}if(!Ie)return;let p=ze(),v=p.attempts?p.attempts[Ie]:null;if(v){G.updateMeta($(v));return}G.close()}function At(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;if(v?.closest?.(".worker-analysis-btn")){Ge?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){we();return}let B=v?.closest?.(".worker-repo-op__session");if(B){let Le=B.dataset.attemptId;Le&&ut(Le);return}let _=v?.closest?.(".worker-repo-op__resolve");if(_){re(_.dataset.operationId||"");return}let h=v?.closest?.(".worker-repo-op__dismiss");if(h){be(h.dataset.operationId||"");return}let ee=v?.closest?.(".worker-cleanup__resume");if(ee){let Le=ee.dataset.beadId;Le&&C(Le);return}let Q=v?.closest?.(".worker-banner__resume");if(Q){let Le=Q.dataset.attemptId;Le&&P(Le);return}let Re=v?.closest?.(".worker-banner__discard");if(Re){let Le=Re.dataset.confirmation==="merged"?"merged":"unmerged";Fe(Re.dataset.beadId||"",Re.dataset.attemptId||null,Le,Re.dataset.operationId||null);return}let ge=v?.closest?.(".worker-banner__dismiss");if(ge){let Le=ge.dataset.attemptId;Le&&H(Le);return}if(v?.closest?.(".worker-play")){W(!ze().auto_advance);return}let w=v?.closest?.(".worker-merge-all");if(w){w.classList.contains("worker-merge-all--stop")?ze().auto_merge===!0?me(!1):Ee():me(!0);return}let K=v?.closest?.(".worker-pane__hd--toggle");if(K){let Le=K.dataset.lane;(Le==="queue"||Le==="done")&&wr(Le);return}let R=v?.closest?.(".worker-card__place-lane");if(R){let Le=R.dataset.beadId,vt=R.dataset.lane;Le&&(vt==="parallel"||/^s[1-5]$/.test(vt||""))&&(ae=null,Ne(),ot(Le,vt));return}if(v?.closest?.(".worker-card__place-cancel")){ae=null,Ne();return}let at=v?.closest?.(".worker-card__place");if(at){let Le=at.dataset.beadId;Le&&!at.disabled&&(ct()?(ae=Le,Ne()):ot(Le,"parallel"));return}let nt=v?.closest?.(".worker-filter__chip");if(nt){let Le=nt.dataset.spec;(Le==="all"||Le==="with"||Le==="without")&&mr({...z,spec:Le});return}let Ze=v?.closest?.(".worker-mini__merge");if(Ze){let Le=Ze.dataset.beadId||"";ze().cleanup_failed?.[Le]?C(Le):y(Le);return}let Xe=v?.closest?.(".worker-mini__merge-cancel");if(Xe){fe(Xe.dataset.beadId||"");return}let kt=v?.closest?.(".worker-mini__discard");if(kt){Fe(kt.dataset.beadId||"",kt.dataset.attemptId||null,kt.dataset.discardMode==="merged"?"merged":"unmerged",kt.dataset.operationId||null);return}let zt=v?.closest?.(".worker-mini__stale-continue");if(zt){Ye("worker-stale-work-continue",zt.dataset.beadId||"",zt.dataset.actionId||"");return}let an=v?.closest?.(".worker-mini__stale-backup");if(an){Ye("worker-stale-work-backup-fresh",an.dataset.beadId||"",an.dataset.actionId||"");return}let ln=v?.closest?.(".worker-mini__stale-recheck");if(ln){Ye("worker-stale-work-recheck",ln.dataset.beadId||"",ln.dataset.actionId||"");return}let cs=v?.closest?.(".worker-mini__revise-fix");if(cs){Qe("worker-revise-fix",cs.dataset.beadId||"");return}let cn=v?.closest?.(".worker-mini__revise-approve");if(cn){Qe("worker-revise-approve",cn.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Le=v?.closest?.(".rtile"),vt=Le?.dataset?.beadId,dn=Le?.dataset?.attemptId;vt&&Fe(vt,dn||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let vt=v?.closest?.(".rtile")?.dataset?.attemptId;vt&&H(vt);return}if(v?.closest?.(".rtile__pause")){let vt=v?.closest?.(".rtile")?.dataset?.attemptId;vt&&M(vt);return}if(v?.closest?.(".rtile__resume")){let vt=v?.closest?.(".rtile")?.dataset?.attemptId;vt&&P(vt);return}if(v?.closest?.(".rtile__session")){let vt=v?.closest?.(".rtile")?.dataset?.attemptId;vt&&ut(vt);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){Z.close(),G.close();return}if(v?.closest?.(".worker-drawer-host"))return;let Wr=v?.closest?.(".rtile .board-card__roll-toggle");if(Wr){let Le=Wr.dataset.rollParent;Le&&(de.has(Le)?de.delete(Le):de.add(Le),Ne());return}let zr=v?.closest?.(".rtile .board-card__roll-child");if(zr){let Le=zr.dataset.childId;Le&&c&&c(Le);return}let un=v?.closest?.(".rtile");if(un){if(v?.closest?.(".rtile__id")){let vt=un.dataset.beadId;vt&&ir(vt).then(dn=>{dn?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Le=un.dataset.beadId;Le&&c&&c(Le);return}let us=v?.closest?.(".worker-mini, .worker-card");if(us){let Le=us.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Le&&ir(Le).then(vt=>{vt?pe("\uBCF5\uC0AC\uB428","success",1200):pe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Le&&c&&c(Le)}}return e.addEventListener("pointerdown",tr),e.addEventListener("dragstart",rr),e.addEventListener("dragover",fr),e.addEventListener("dragleave",Ct),e.addEventListener("drop",nr),e.addEventListener("click",At),e.addEventListener("change",Se),jt(),g&&te.push(g.subscribe(()=>{for(let[p,v]of N)v==="failed"&&N.delete(p);Ne()})),s&&te.push(s.subscribe(()=>{let p=u&&u()||"";p!==De&&(De=p,xe.close()),Ne(),_t()})),o&&typeof o.subscribe=="function"&&te.push(o.subscribe(()=>{_t(),Ne()})),Ne(),{load(){_e(),Ne()},refreshSessionDefaults:Pe,destroy(){for(let p of te.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",tr),e.removeEventListener("dragstart",rr),e.removeEventListener("dragover",fr),e.removeEventListener("dragleave",Ct),e.removeEventListener("drop",nr),e.removeEventListener("click",At),e.removeEventListener("change",Se);try{G.destroy()}catch{}Oe.hidden=!0;try{Ge?.destroy()}catch{}try{xe.destroy()}catch{}Ke(i``,e)}}}function ai(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Pd(e,t,r,n=async()=>{},s=async()=>{}){let o=yt("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function d(j){let E=j.target.value,ue=t.getState().workspace?.current?.path||"";if(E&&E!==ue){o("switching workspace to %s",E),l=!0,I();try{await r(E)}catch(oe){o("workspace switch failed: %o",oe)}finally{l=!1,I()}}}async function f(){let j=t.getState(),m=j.workspace?.current?.path||j.workspace?.available?.[0]?.path||"";if(!(!m||c)){o("git-pulling workspace %s",m),c=!0,I();try{await n(m)}catch(E){o("workspace git pull failed: %o",E)}finally{c=!1,I()}}}function g(j){let m=j.target;m&&e.contains(m)||L()}function x(j){j.key==="Escape"&&L()}function A(){u||(u=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",x),I())}function L(){u&&(u=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",x),I())}function z(){u?L():A()}async function ae(j){let m=j.target,E=m.value,Y=m.checked;o("toggling visibility %s \u2192 %s",E,String(Y));try{await s(E,Y)}catch(ue){o("workspace visibility toggle failed: %o",ue)}}function se(j){return j?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${l||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function q(j,m){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${z}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${j.map(E=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${E.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${E.path}"
                        .checked=${!m.has(E.path)}
                        @change=${ae}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ai(E.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let j=t.getState(),m=j.workspace?.current,E=j.workspace?.available||[],Y=new Set(j.workspace?.hidden||[]),ue=m?.path||E[0]?.path||"";if(E.length===0)return i``;let oe=E.filter(de=>!Y.has(de.path)||de.path===ue);if(oe.length<=1){let de=oe[0]||E[0],Ue=ai(de.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${de.path}"
            >${Ue}</span
          >
          ${q(E,Y)}
          ${se(ue)}
          ${c?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||c}
          aria-label="Select project workspace"
        >
          ${oe.map(de=>i`
              <option
                value="${de.path}"
                ?selected=${de.path===ue}
                title="${de.path}"
              >
                ${ai(de.path)}
              </option>
            `)}
        </select>
        ${q(E,Y)}
        ${se(ue)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){Ke(N(),e)}return I(),a=t.subscribe(()=>I()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",x),Ke(i``,e)}}}var Dd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function ii(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Nd(e,t,r=ii()){return{id:r,type:e,payload:t}}function qd(e={}){let t=yt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,d=[],f=new Map,g=new Set;function x(N){for(let I of Array.from(g))try{I(N)}catch{}}function A(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),x(o);let N=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),I=(r.jitterRatio||0)*N,j=Math.max(0,Math.round(N+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",j,a+1),l=setTimeout(()=>{l=null,q()},j)}function L(N){try{s?.send(JSON.stringify(N))}catch(I){t("ws send failed",I)}}function z(){for(o="open",t("ws open"),x(o),a=0;d.length;){let N=d.shift();N&&L(N)}}function ae(N){let I;try{I=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(u.has(I.id)){let m=u.get(I.id);u.delete(I.id),I.ok?m?.resolve(I.payload):m?.reject(I.error||new Error("ws error"));return}let j=f.get(I.type);if(j&&j.size>0)for(let m of Array.from(j))try{m(I.payload)}catch(E){t("ws event handler error",E)}else t("ws received unhandled message type: %s",I.type)}function se(){o="closed",t("ws closed"),x(o);for(let[N,I]of u.entries())I.reject(new Error("ws disconnected")),u.delete(N);a+=1,A()}function q(){if(!c)return;let N=n();try{s=new WebSocket(N),t("ws connecting %s",N),o="connecting",x(o),s.addEventListener("open",z),s.addEventListener("message",ae),s.addEventListener("error",()=>{}),s.addEventListener("close",se)}catch(I){t("ws connect failed %o",I),A()}}return q(),{send(N,I){if(!Dd.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let j=ii(),m=Nd(N,I,j);return t("send %s id=%s",N,j),new Promise((E,Y)=>{u.set(j,{resolve:E,reject:Y,type:N}),s&&s.readyState===s.OPEN?L(m):(t("queue %s id=%s (state=%s)",N,j,o),d.push(m))})},on(N,I){f.has(N)||f.set(N,new Set);let j=f.get(N);return j?.add(I),()=>{j?.delete(I)}},onConnection(N){return g.add(N),()=>{g.delete(N)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,q()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Ob(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Mb(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var li=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Fd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Br="tab:worker:closed",Pb="bdui.worker.done-range",jd=ju,Bd="worker:queue",Ud="worker:parallel-analysis",Wd="ui:order",zd="ui:display-policy",Hd="exec:presets",Ur="tab:board:closed",Gd="beads-ui.board.closed-range";function Db(e){let t=yt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ke(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),l=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&ad(a),l&&c&&u&&d){let Pe=function(_,h){let ee="Request failed",Q="";if(_&&typeof _=="object"){let ge=_;if(typeof ge.message=="string"&&ge.message.length>0&&(ee=ge.message),typeof ge.details=="string")Q=ge.details;else if(ge.details&&typeof ge.details=="object")try{Q=JSON.stringify(ge.details,null,2)}catch{Q=""}}else typeof _=="string"&&_.length>0&&(ee=_);let Re=h&&h.length>0?`Failed to load ${h}`:"Request failed";_e.open(Re,ee,Q)},V=function(_){return`${rt.getState().workspace.current?.path||""}\0${_}`},ve=function(){xe&&(xe().catch(()=>{}),xe=null),De=null,We=null},ke=function(_){Ge=_;let h=()=>{Ge!==_||rt.getState().selected_id!==_||(Ge=null,ot(_))};if(!pt){ct.then(h);return}h()},H=function(_,h,ee,Q,Re){return ee!==P[h]?(Re().catch(()=>{}),!1):(_.set(Q,Re),!0)},y=function(){let _=rt.getState();Ee(_.view==="board"),be(_.view==="worker"),Te(_.view==="monitor"),S(_.view==="board"||_.view==="worker"||ce||!!_.selected_id)},me=function(){let _=Zr(C);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},fe=function(){let _=Zr(D);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},Ee=function(_){if(_)for(let[h,ee]of li){if(T.has(h)||M.has(h))continue;let Q=h===Ur?me():{type:ee};try{He.register(h,Q)}catch(w){t("register %s store failed: %o",h,w)}M.add(h);let Re=P.board,ge=!1;Oe.subscribeList(h,Q).then(w=>{ge=!H(T,"board",Re,h,w)}).catch(w=>{t("subscribe %s failed: %o",h,w),Pe(w,"board")}).finally(()=>{M.delete(h),ge&&y()})}else Qe()},Qe=function(){P.board+=1;for(let[_]of li){let h=T.get(_);h&&(h().catch(()=>{}),T.delete(_));try{He.unregister(_)}catch(ee){t("unregister %s failed: %o",_,ee)}}},be=function(_){if(!_){k();return}for(let[h,ee]of Fd){if(W.has(h)||M.has(h))continue;let Q=h===Br?fe():{type:ee};try{He.register(h,Q)}catch(w){t("register %s store failed: %o",h,w)}M.add(h);let Re=P.worker,ge=!1;Oe.subscribeList(h,Q).then(w=>{ge=!H(W,"worker",Re,h,w)}).catch(w=>{t("subscribe %s failed: %o",h,w),Pe(w,"worker")}).finally(()=>{M.delete(h),ge&&y()})}},k=function(){P.worker+=1;for(let[_]of Fd){let h=W.get(_);h&&(h().catch(()=>{}),W.delete(_));try{He.unregister(_)}catch(ee){t("unregister %s failed: %o",_,ee)}}},S=function(_){if(!_){O();return}re||(Me("subscribe-worker-queue",{id:Bd}).catch(h=>{t("subscribe-worker-queue failed: %o",h)}),Me("subscribe-worker-parallel-analysis",{id:Ud}).catch(h=>{t("subscribe-worker-parallel-analysis failed: %o",h)}),re=()=>(Me("unsubscribe-worker-parallel-analysis",{id:Ud}),Me("unsubscribe-worker-queue",{id:Bd})))},O=function(){re&&(re().catch(()=>{}),re=null),Ve.clear()},Te=function(_){if(!_){ye();return}J||(Me("subscribe-monitor-pipeline",{id:jd}).catch(h=>{t("subscribe-monitor-pipeline failed: %o",h)}),J=()=>Me("unsubscribe-monitor-pipeline",{id:jd}))},ye=function(){J&&(J().catch(()=>{}),J=null)},je=function(){Ce||(Me("subscribe-ui-order",{id:Wd}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Ce=()=>Me("unsubscribe-ui-order",{id:Wd}))},Tt=function(){Ce&&(Ce().catch(()=>{}),Ce=null),Ie.clear()},tt=function(){ht||(Me("subscribe-display-policy",{id:zd}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),ht=()=>Me("unsubscribe-display-policy",{id:zd}))},Pt=function(){ht&&(ht().catch(()=>{}),ht=null),Je.clear()},Ne=function(){wr||(Me("subscribe-impl-presets",{id:Hd}).catch(_=>{t("subscribe-impl-presets failed: %o",_)}),wr=()=>Me("unsubscribe-impl-presets",{id:Hd}))},Ct=function(_){if(!_)return"Unknown";let h=_.split("/").filter(Boolean);return h.length>0?h[h.length-1]:"Unknown"};var f=Pe,g=V,x=ve,A=ke,L=H,z=y,ae=me,se=fe,q=Ee,N=Qe,I=be,j=k,m=S,E=O,Y=Te,ue=ye,oe=je,de=Tt,Ue=tt,et=Pt,qe=Ne,X=Ct;let te=document.getElementById("header-loading"),Ae=yl(te),_e=su(e),le=qd(),Me=Ae.wrapSend((_,h)=>le.send(_,h)),Oe=dl(Me),He=pl(),$e=ml(),Ve=_l(),it=Zi(),Ie=fl(),Je=Ki(),G=Yi(),Z=Xi();le.on("impl-presets-snapshot",_=>{let h=_;h&&typeof h.revision=="number"&&Array.isArray(h.presets)&&G.set({revision:h.revision,presets:h.presets})}),le.on("monitor-pipeline-snapshot",_=>{let h=_;if(!(!h||!Array.isArray(h.workspaces)))try{it.set(h.workspaces,h.workspaces_state)}catch{}}),le.on("ui-order-snapshot",_=>{let h=_;if(h&&typeof h.revision=="number")try{Ie.set({revision:h.revision,order:h.order&&typeof h.order=="object"?h.order:{}})}catch{}}),le.on("display-policy-snapshot",_=>{let h=_;if(h&&h.policy&&typeof h.policy=="object")try{Je.set(h.policy)}catch{}}),le.on("session-log-snapshot",_=>{let h=_;if(h&&typeof h.id=="string")try{Z.set(h.id,Array.isArray(h.lines)?h.lines:[],typeof h.last_event_at=="number"?h.last_event_at:null)}catch{}}),le.on("session-log-append",_=>{let h=_;if(h&&typeof h.id=="string")try{Z.append(h.id,h.event)}catch{}}),le.on("snapshot",_=>{let h=_,ee=h&&typeof h.id=="string"?h.id:"",Q=ee?He.getStore(ee):null;if(Q&&h&&h.type==="snapshot")try{Q.applyPush(h)}catch{}}),le.on("upsert",_=>{let h=_,ee=h&&typeof h.id=="string"?h.id:"",Q=ee?He.getStore(ee):null;if(Q&&h&&h.type==="upsert")try{Q.applyPush(h)}catch{}}),le.on("delete",_=>{let h=_,ee=h&&typeof h.id=="string"?h.id:"",Q=ee?He.getStore(ee):null;if(Q&&h&&h.type==="delete")try{Q.applyPush(h)}catch{}});let xe=null,De=null,We=null,Ge=null,ze=()=>{},ct=new Promise(_=>{ze=()=>_(void 0)}),pt=!1,U=!1;async function ot(_){let h=V(_);if(h===De||h===We)return;We=h;let ee=`detail:${_}`,Q={type:"issue-detail",params:{id:_}};try{He.register(ee,Q)}catch(Re){t("register detail store failed: %o",Re)}try{let Re=await Oe.subscribeList(ee,Q);if(rt.getState().selected_id!==_||V(_)!==h){await Re().catch(()=>{});return}xe&&await xe().catch(()=>{}),xe=Re,De=h}catch(Re){t("detail subscribe failed: %o",Re),Pe(Re,"issue details")}finally{We===h&&(We=null)}}let T=new Map,M=new Set,P={board:0,worker:0},ce=!1,C=Ht;try{let _=window.localStorage.getItem(Gd);Qt(_)&&(C=_)}catch{}let D=Ht;try{let _=window.localStorage.getItem(Pb);Qt(_)&&(D=_)}catch{}async function Fe(_){if(!Qt(_)||_===C)return;C=_;try{window.localStorage.setItem(Gd,_)}catch{}let h=T.get(Ur);if(!h)return;T.delete(Ur),await h().catch(()=>{});let ee=me();try{He.register(Ur,ee)}catch(Q){t("register %s store failed: %o",Ur,Q)}try{let Q=await Oe.subscribeList(Ur,ee);T.set(Ur,Q)}catch(Q){t("re-subscribe %s failed: %o",Ur,Q),Pe(Q,"board")}}async function Ye(_){if(!Qt(_)||_===D)return;D=_;let h=W.get(Br);if(!h)return;W.delete(Br),await h().catch(()=>{});let ee=fe();try{He.register(Br,ee)}catch(Q){t("register %s store failed: %o",Br,Q)}try{let Q=await Oe.subscribeList(Br,ee);W.set(Br,Q)}catch(Q){t("re-subscribe %s failed: %o",Br,Q),Pe(Q,"worker")}}let W=new Map,re=null,J=null,Ce=null,ht=null,wr=null;async function jt(){ht=null,Je.clear(),wr=null,G.clear(),re=null,J=null,T.clear(),W.clear(),P.board+=1,P.worker+=1,Ne();let _=rt.getState().workspace.current?.path;if(_)try{await le.send("set-workspace",{path:_})}catch(ee){t("workspace restore after reconnect failed: %o",ee);return}tt();let h=rt.getState();Ee(h.view==="board"),be(h.view==="worker"),Te(h.view==="monitor"),S(h.view==="board"||h.view==="worker"||!!h.selected_id)}async function Yt(){t("clearing all subscriptions for workspace switch"),Qe(),k(),O(),$e.clear(),Tt(),je(),Pt(),tt(),ve();let _=rt.getState();if(_.selected_id)try{He.unregister(`detail:${_.selected_id}`)}catch{}let h=rt.getState();Ee(h.view==="board"),be(h.view==="worker"),Te(h.view==="monitor"),S(h.view==="board"||h.view==="worker"||!!h.selected_id),h.selected_id&&ke(h.selected_id)}async function tr(_){t("requesting workspace switch to %s",_),U=!0;try{let h=await le.send("set-workspace",{path:_});t("workspace switch result: %o",h),h&&h.workspace&&(rt.setState({workspace:{current:{path:h.workspace.root_dir,database:h.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),h.changed&&(await Yt(),pe("Switched to "+Ct(_),"success",2e3)))}catch(h){throw t("workspace switch failed: %o",h),pe("Failed to switch workspace","error",3e3),h}finally{U=!1}}async function rr(_){t("requesting workspace git pull for %s",_);try{let h=await le.send("git-pull-workspace",{});t("workspace git pull result: %o",h);let ee=h?.status;if(ee==="up_to_date"){pe("Already up to date","success",2e3);return}if(ee==="stash_pop_conflict"){pe("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}pe("Git pulled "+Ct(_),"success",2e3)}catch(h){t("workspace git pull failed: %o",h);let ee=h?.code,Q=h?.message;if(ee==="rebase_conflict"){pe("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ee==="rebase_conflict_abort_failed"){pe("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ee==="busy"){pe("Git pull skipped: another operation is running","warning",3e3);return}let Re=Q?`: ${Q}`:"";throw pe(`Git pull failed${Re}`,"error",3e3),h}}async function fr(_,h){t("setting workspace visibility %s \u2192 %s",_,String(h));try{await le.send("set-workspace-visibility",{path:_,visible:h}),await _r()}catch(ee){t("workspace visibility update failed: %o",ee),pe("Failed to update project visibility","error",3e3)}}async function _r(){try{let _=await le.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let h=_.workspaces.map(ge=>({path:ge.path,database:ge.database,pid:ge.pid,version:ge.version})),ee=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,Q=Array.isArray(_.hidden)?_.hidden.filter(ge=>typeof ge=="string"):[];rt.setState({workspace:{current:ee,available:h,hidden:Q}});let Re=window.localStorage.getItem("beads-ui.workspace");Re&&(!h.some(w=>w.path===Re)||Q.includes(Re)?window.localStorage.removeItem("beads-ui.workspace"):ee&&Re!==ee.path&&(t("restoring saved workspace preference: %s",Re),await tr(Re)))}}catch(_){t("failed to load workspaces: %o",_)}}le.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(rt.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),_r(),Yt())});let nr=!1;if(typeof le.onConnection=="function"){let _=h=>{t("ws state %s",h),h==="reconnecting"||h==="closed"?(nr=!0,pe("Connection lost. Reconnecting\u2026","error",4e3)):h==="open"&&nr&&(nr=!1,pe("Reconnected","success",2200),Mb(rt,(ee,Q)=>{t(`${ee}: %o`,Q)}),jt())};le.onConnection(_)}let mr="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(mr=_)}catch(_){t("view parse error: %o",_)}let rt=hl({config:Ob(),view:mr});le.on("worker-queue-snapshot",_=>{let h=_;if(!h||!h.queue)return;let ee=rt.getState().workspace.current?.path;if(typeof ee=="string"&&ee.length>0&&h.root_dir!==ee){t("dropping worker-queue snapshot for %s",String(h.root_dir));return}try{$e.set(h.queue)}catch{}}),le.on("worker-parallel-analysis-snapshot",_=>{let h=_;if(!h)return;let ee=rt.getState().workspace.current?.path;if(!(typeof ee=="string"&&ee.length>0&&typeof h.root_dir=="string"&&h.root_dir!==ee))try{Ve.set({settings:h.settings,job:h.job??null,runs:Array.isArray(h.runs)?h.runs:[],last_good:h.last_good??null})}catch{}});let Zt=gl(rt);Zt.start();let Se=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),$=async(_,h)=>{try{return await Me(_,h)}catch(ee){if(Se.has(_))throw ee;return[]}};Uu({global_element:n,repo_element:s},rt,Zt);let ne=document.getElementById("workspace-picker");ne&&Pd(ne,rt,tr,rr,fr);let we=Gu(e,(_,h)=>Me(_,h));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>we.open())}catch{}let ut=Zu(e,{policyStore:Je,queueStore:$e,implPresetStore:G,transport:(_,h)=>Me(_,h),onOpenChange:_=>{let h=ce;ce=_,y(),h&&_===!1&&_t.refreshSessionDefaults()},labelOptions:()=>{let _=new Set;for(let[h]of li)for(let ee of He.snapshotFor(h)||[]){let Q=ee.labels;if(Array.isArray(Q))for(let Re of Q)typeof Re=="string"&&Re.length>0&&_.add(Re)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&(_.setAttribute("aria-label","\uC124\uC815"),_.setAttribute("title","\uC124\uC815"),_.addEventListener("click",()=>ut.open()))}catch{}let xt=Il(l,{gotoIssue:_=>Zt.gotoIssue(_),issueStores:He,transport:$,workerQueueStore:$e,uiOrderStore:Ie,displayPolicyStore:Je,closedRange:C,onClosedRangeChange:_=>{Fe(_)},onNewIssue:()=>we.open()}),_t=oi(c,{transport:$,issueStores:He,queueStore:$e,analysisStore:Ve,sessionLogStore:Z,uiOrderStore:Ie,gotoIssue:_=>rt.setState({selected_id:_}),getWorkspacePath:()=>rt.getState().workspace.current?.path,doneRange:D,onDoneRangeChange:_=>{Ye(_)}}),At=Bu(u,{transport:$,pipelineStore:it,execPresetStore:G,gotoIssue:_=>Zt.gotoIssue(_),getWorkspacePath:()=>rt.getState().workspace.current?.path,switchWorkspace:_=>tr(_)}),p=nu(d,{issueStores:He,transport:$,queueStore:$e,execPresetStore:G,sessionLogStore:Z,getWorkspacePath:()=>rt.getState().workspace.current?.path,onNavigate:_=>{rt.getState().view==="worker"?rt.setState({selected_id:_}):Zt.gotoIssue(_)},onClose:()=>{let _=rt.getState();rt.setState({selected_id:null});try{Zt.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{ut.open("execution")}}),v=rt.getState().selected_id;v&&(d.hidden=!1,p.load(v),ke(v)),rt.subscribe(_=>{let h=_.selected_id;h?(d.hidden=!1,p.load(h),U||ke(h)):(p.clear(),d.hidden=!0,ve())});let B=_=>{l.hidden=_.view!=="board",c.hidden=_.view!=="worker",u.hidden=_.view!=="monitor",o&&o.classList.toggle("is-quiet",_.view==="monitor"),Ee(_.view==="board"),be(_.view==="worker"),Te(_.view==="monitor"),S(_.view==="board"||_.view==="worker"||ce||!!_.selected_id),!_.selected_id&&_.view==="board"&&xt.load(),_.view==="worker"&&_t.load(),_.view==="monitor"?At.load():At.pause(),window.localStorage.setItem("beads-ui.view",_.view)};rt.subscribe(B),B(rt.getState()),je(),tt(),Ne(),_r().finally(()=>{pt=!0,ze()}),window.addEventListener("keydown",_=>{let h=_.ctrlKey||_.metaKey,ee=String(_.key||"").toLowerCase(),Q=_.target,Re=Q&&Q.tagName?String(Q.tagName).toLowerCase():"",ge=Re==="input"||Re==="textarea"||Re==="select"||Q&&typeof Q.isContentEditable=="boolean"&&Q.isContentEditable;h&&ee==="n"&&(ge||(_.preventDefault(),we.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Db(t)});export{Db as bootstrap,Ob as readBootstrapConfig,Mb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
