var ai=Object.create;var Xr=Object.defineProperty;var li=Object.getOwnPropertyDescriptor;var ci=Object.getOwnPropertyNames;var di=Object.getPrototypeOf,ui=Object.prototype.hasOwnProperty;var pi=(t,e,r)=>e in t?Xr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Qr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var fi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ci(e))!ui.call(t,s)&&s!==r&&Xr(t,s,{get:()=>e[s],enumerable:!(n=li(e,s))||n.enumerable});return t};var hi=(t,e,r)=>(r=t!=null?ai(di(t)):{},fi(e||!t||!t.__esModule?Xr(r,"default",{value:t,enumerable:!0}):r,t));var ue=(t,e,r)=>pi(t,typeof e!="symbol"?e+"":e,r);var _s=Qr((uc,ms)=>{var Wt=1e3,Gt=Wt*60,jt=Gt*60,It=jt*24,wi=It*7,ki=It*365.25;ms.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return yi(t);if(r==="number"&&isFinite(t))return e.long?$i(t):vi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function yi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*ki;case"weeks":case"week":case"w":return r*wi;case"days":case"day":case"d":return r*It;case"hours":case"hour":case"hrs":case"hr":case"h":return r*jt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Gt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Wt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function vi(t){var e=Math.abs(t);return e>=It?Math.round(t/It)+"d":e>=jt?Math.round(t/jt)+"h":e>=Gt?Math.round(t/Gt)+"m":e>=Wt?Math.round(t/Wt)+"s":t+"ms"}function $i(t){var e=Math.abs(t);return e>=It?Ar(t,e,It,"day"):e>=jt?Ar(t,e,jt,"hour"):e>=Gt?Ar(t,e,Gt,"minute"):e>=Wt?Ar(t,e,Wt,"second"):t+" ms"}function Ar(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var ws=Qr((pc,bs)=>{function xi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=_s(),r.destroy=u,Object.keys(t).forEach(f=>{r[f]=t[f]}),r.names=[],r.skips=[],r.formatters={};function e(f){let g=0;for(let w=0;w<f.length;w++)g=(g<<5)-g+f.charCodeAt(w),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=e;function r(f){let g,w=null,y,$;function T(...P){if(!T.enabled)return;let q=T,z=Number(new Date),U=z-(g||z);q.diff=U,q.prev=g,q.curr=z,g=z,P[0]=r.coerce(P[0]),typeof P[0]!="string"&&P.unshift("%O");let O=0;P[0]=P[0].replace(/%([a-zA-Z%])/g,(S,x)=>{if(S==="%%")return"%";O++;let m=r.formatters[x];if(typeof m=="function"){let N=P[O];S=m.call(q,N),P.splice(O,1),O--}return S}),r.formatArgs.call(q,P),(q.log||r.log).apply(q,P)}return T.namespace=f,T.useColors=r.useColors(),T.color=r.selectColor(f),T.extend=n,T.destroy=r.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:(y!==r.namespaces&&(y=r.namespaces,$=r.enabled(f)),$),set:P=>{w=P}}),typeof r.init=="function"&&r.init(T),T}function n(f,g){let w=r(this.namespace+(typeof g>"u"?":":g)+f);return w.log=this.log,w}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let g=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of g)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(f,g){let w=0,y=0,$=-1,T=0;for(;w<f.length;)if(y<g.length&&(g[y]===f[w]||g[y]==="*"))g[y]==="*"?($=y,T=w,y++):(w++,y++);else if($!==-1)y=$+1,T++,w=T;else return!1;for(;y<g.length&&g[y]==="*";)y++;return y===g.length}function i(){let f=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),f}function l(f){for(let g of r.skips)if(o(f,g))return!1;for(let g of r.names)if(o(f,g))return!0;return!1}function a(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}bs.exports=xi});var ks=Qr((et,Tr)=>{et.formatArgs=Ai;et.save=Ti;et.load=Ei;et.useColors=Si;et.storage=Ci();et.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();et.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Si(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Ai(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Tr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}et.log=console.debug||console.log||(()=>{});function Ti(t){try{t?et.storage.setItem("debug",t):et.storage.removeItem("debug")}catch{}}function Ei(){let t;try{t=et.storage.getItem("debug")||et.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Ci(){try{return localStorage}catch{}}Tr.exports=ws()(et);var{formatters:Ri}=Tr.exports;Ri.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var rr=globalThis,xr=rr.trustedTypes,rs=xr?xr.createPolicy("lit-html",{createHTML:t=>t}):void 0,ls="$lit$",vt=`lit$${Math.random().toFixed(9).slice(2)}$`,cs="?"+vt,gi=`<${cs}>`,Rt=document,nr=()=>Rt.createComment(""),sr=t=>t===null||typeof t!="object"&&typeof t!="function",on=Array.isArray,mi=t=>on(t)||typeof t?.[Symbol.iterator]=="function",Jr=`[ 	
\f\r]`,tr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ns=/-->/g,ss=/>/g,Et=RegExp(`>|${Jr}(?:([^\\s"'>=/]+)(${Jr}*=${Jr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),os=/'/g,is=/"/g,ds=/^(?:script|style|textarea|title)$/i,an=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=an(1),oc=an(2),ic=an(3),Lt=Symbol.for("lit-noChange"),Te=Symbol.for("lit-nothing"),as=new WeakMap,Ct=Rt.createTreeWalker(Rt,129);function us(t,e){if(!on(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return rs!==void 0?rs.createHTML(e):e}var _i=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=tr;for(let l=0;l<r;l++){let a=t[l],u,f,g=-1,w=0;for(;w<a.length&&(i.lastIndex=w,f=i.exec(a),f!==null);)w=i.lastIndex,i===tr?f[1]==="!--"?i=ns:f[1]!==void 0?i=ss:f[2]!==void 0?(ds.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=Et):f[3]!==void 0&&(i=Et):i===Et?f[0]===">"?(i=s??tr,g=-1):f[1]===void 0?g=-2:(g=i.lastIndex-f[2].length,u=f[1],i=f[3]===void 0?Et:f[3]==='"'?is:os):i===is||i===os?i=Et:i===ns||i===ss?i=tr:(i=Et,s=void 0);let y=i===Et&&t[l+1].startsWith("/>")?" ":"";o+=i===tr?a+gi:g>=0?(n.push(u),a.slice(0,g)+ls+a.slice(g)+vt+y):a+vt+(g===-2?l:y)}return[us(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},or=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[u,f]=_i(e,r);if(this.el=t.createElement(u,n),Ct.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=Ct.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(ls)){let w=f[i++],y=s.getAttribute(g).split(vt),$=/([.?@])?(.*)/.exec(w);a.push({type:1,index:o,name:$[2],strings:y,ctor:$[1]==="."?tn:$[1]==="?"?rn:$[1]==="@"?nn:Ht}),s.removeAttribute(g)}else g.startsWith(vt)&&(a.push({type:6,index:o}),s.removeAttribute(g));if(ds.test(s.tagName)){let g=s.textContent.split(vt),w=g.length-1;if(w>0){s.textContent=xr?xr.emptyScript:"";for(let y=0;y<w;y++)s.append(g[y],nr()),Ct.nextNode(),a.push({type:2,index:++o});s.append(g[w],nr())}}}else if(s.nodeType===8)if(s.data===cs)a.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(vt,g+1))!==-1;)a.push({type:7,index:o}),g+=vt.length-1}o++}}static createElement(e,r){let n=Rt.createElement("template");return n.innerHTML=e,n}};function zt(t,e,r=t,n){if(e===Lt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=sr(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=zt(t,s._$AS(t,e.values),s,n)),e}var en=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??Rt).importNode(r,!0);Ct.currentNode=s;let o=Ct.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new ir(o,o.nextSibling,this,e):a.type===1?u=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(u=new sn(o,this,e)),this._$AV.push(u),a=n[++l]}i!==a?.index&&(o=Ct.nextNode(),i++)}return Ct.currentNode=Rt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},ir=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Te,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=zt(this,e,r),sr(e)?e===Te||e==null||e===""?(this._$AH!==Te&&this._$AR(),this._$AH=Te):e!==this._$AH&&e!==Lt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):mi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Te&&sr(this._$AH)?this._$AA.nextSibling.data=e:this.T(Rt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=or.createElement(us(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new en(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=as.get(e.strings);return r===void 0&&as.set(e.strings,r=new or(e)),r}k(e){on(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(nr()),this.O(nr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ht=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Te,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Te}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=zt(this,e,r,0),i=!sr(e)||e!==this._$AH&&e!==Lt,i&&(this._$AH=e);else{let l=e,a,u;for(e=o[0],a=0;a<o.length-1;a++)u=zt(this,l[n+a],r,a),u===Lt&&(u=this._$AH[a]),i||(i=!sr(u)||u!==this._$AH[a]),u===Te?e=Te:e!==Te&&(e+=(u??"")+o[a+1]),this._$AH[a]=u}i&&!s&&this.j(e)}j(e){e===Te?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},tn=class extends Ht{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Te?void 0:e}},rn=class extends Ht{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Te)}},nn=class extends Ht{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=zt(this,e,r,0)??Te)===Lt)return;let n=this._$AH,s=e===Te&&n!==Te||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Te&&(n===Te||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},sn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){zt(this,e)}};var bi=rr.litHtmlPolyfillSupport;bi?.(or,ir),(rr.litHtmlVersions??(rr.litHtmlVersions=[])).push("3.3.1");var de=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new ir(e.insertBefore(nr(),o),o,void 0,r??{})}return s._$AI(t),s};var Sr="today",ps=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function ln(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function fs(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function hs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function gs(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ys=hi(ks(),1);function xe(t){return(0,ys.default)(`beads-ui:${t}`)}function ft(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Dt(t,e){let r=ft(t.created_at),n=ft(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function xs(t,e){let r=ft(t.created_at),n=ft(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ss(t,e){let r=ft(t.updated_at),n=ft(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function As(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=ft(t.created_at),o=ft(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ts(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var Li=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function vs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function $s(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=Li.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Es(t,e){let r=vs(t),n=vs(e);if(r!==n)return r<n?-1:1;let s=$s(t),o=$s(e);if(s!==o)return s<o?-1:1;let i=ft(t&&t.created_at),l=ft(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,u=e&&e.id;return a===u?0:String(a)<String(u)?-1:1}var cn=2**20;function Yt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-ft(t&&t.created_at)}function Er(t){return(e,r)=>{let n=Yt(e,t),s=Yt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function dn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Yt(l,r)-cn};if(!l)return{rank:Yt(i,r)+cn};let a=Yt(i,r),u=Yt(l,r),f=(a+u)/2;return a<f&&f<u?{rank:f}:{renormalize:n.map((g,w)=>({bead_id:g.id,rank:w*cn}))}}function un(t,e={}){let r=xe(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Dt;function u(){for(let w of Array.from(i))try{w()}catch{}}function f(){s=Array.from(n.values()).sort(a)}function g(w){if(l||!w||w.id!==t)return;let y=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,y),!(y<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if(y<=o)return;n.clear();let $=Array.isArray(w.issues)?w.issues:[];for(let T of $)T&&typeof T.id=="string"&&T.id.length>0&&n.set(T.id,T);f(),o=y,u();return}if(w.type==="upsert"){let $=w.issue;if($&&typeof $.id=="string"&&$.id.length>0){let T=n.get($.id);if(!T)n.set($.id,$);else{let P=Number.isFinite(T.updated_at)?T.updated_at:0,q=Number.isFinite($.updated_at)?$.updated_at:0;if(P<=q){for(let z of Object.keys(T))z in $||delete T[z];for(let[z,U]of Object.entries($))T[z]=U}}f()}o=y,u()}else if(w.type==="delete"){let $=String(w.issue_id||"");$&&(n.delete($),f()),o=y,u()}}}return{id:t,subscribe(w){return i.add(w),()=>{i.delete(w)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function Cr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Cs(t){let e=xe("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let f=Array.isArray(a.added)?a.added:[],g=Array.isArray(a.updated)?a.updated:[],w=Array.isArray(a.removed)?a.removed:[];for(let y of Array.from(u)){let $=r.get(y);if(!$)continue;let T=$.itemsById;for(let P of f)typeof P=="string"&&P.length>0&&T.set(P,!0);for(let P of g)typeof P=="string"&&P.length>0&&T.set(P,!0);for(let P of w)typeof P=="string"&&P.length>0&&T.delete(P)}}async function o(l,a){let u=Cr(a);if(e("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let g=r.get(l);if(g&&g.key!==u){let w=n.get(g.key);w&&(w.delete(l),w.size===0&&n.delete(g.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(g){let w=r.get(l)||null;if(w){let y=n.get(w.key);y&&(y.delete(l),y.size===0&&n.delete(w.key))}throw r.delete(l),g}return async()=>{e("unsubscribe %s key=%s",l,u);try{await t("unsubscribe-list",{id:l})}catch{}let g=r.get(l)||null;if(g){let w=n.get(g.key);w&&(w.delete(l),w.size===0&&n.delete(g.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Cr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=r.get(l);return u?u.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),u={};if(!a)return u;for(let f of a.itemsById.keys())u[f]=!0;return u}}}}function Rs(){let t=xe("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,u,f){let g=u?Cr(u):"",w=r.get(a)||"",y=e.has(a);if(t("register %s key=%s (prev=%s)",a,g,w),y&&w&&g&&w!==g){let $=e.get(a);if($)try{$.dispose()}catch{}let T=s.get(a);if(T){try{T()}catch{}s.delete(a)}let P=un(a,f);e.set(a,P);let q=P.subscribe(()=>o());s.set(a,q)}else if(!y){let $=un(a,f);e.set(a,$);let T=$.subscribe(()=>o());s.set(a,T)}return r.set(a,g),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let u=e.get(a);u&&(u.dispose(),e.delete(a));let f=s.get(a);if(f){try{f()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let u=e.get(a);return u?u.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Ls(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Is(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function pn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function Ii(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Di(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Ds(t){let e=xe("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Ii(n),i=Di(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=pn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?pn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Oi=Object.freeze({workspace_config:{default_workspace:null}});function Os(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Oi.workspace_config.default_workspace}}}function Ms(t={}){let e=xe("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:Os(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Os(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ns(t){let e=xe("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let u=r>0;t.toggleAttribute("hidden",!u),t.setAttribute("aria-busy",u?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?e("done called but count was already %d",u):e("done count=%d\u2192%d",u,r),o()}function a(u){return async(g,w)=>{let y=s++,$=Date.now();n.set(y,{type:g,start_ts:$}),e("request start id=%d type=%s count=%d",y,g,r+1),i();let T=!1,P=()=>{T||(T=!0,n.delete(y),l())},q=setTimeout(()=>{T||(e("request TIMEOUT id=%d type=%s elapsed=%dms",y,g,Date.now()-$),P())},3e4);try{let z=await u(g,w),U=Date.now()-$;return e("request done id=%d type=%s elapsed=%dms",y,g,U),z}catch(z){let U=Date.now()-$;throw e("request error id=%d type=%s elapsed=%dms err=%o",y,g,U,z),z}finally{clearTimeout(q),P()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,g])=>({id:f,type:g.type,elapsed_ms:u-g.start_ts}))}}}function Q(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Rr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Ts),a;switch(l){case"created_desc":return a.sort(Dt),a;case"created_asc":return a.sort(xs),a;case"updated_desc":return a.sort(Ss),a;case"priority":return a.sort(As),a;case"manual":default:{let u=r();return u?a.sort(Er(u)):a.sort(Dt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Lr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let u=r.get()||{revision:0,order:{}},f=n(dn(l,a,u.order),i);s(u,f);let g=await e("ui-order-set",{expected_revision:u.revision,entries:f});if(g&&g.conflict){let w={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};r.set(w);let y=n(dn(l,a,w.order),i);s(w,y);let $=await e("ui-order-set",{expected_revision:w.revision,entries:y});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else g&&g.applied&&r.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Ir(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function fn(t,e){return!e||typeof t!="string"||t.length===0||Ir(e.visible_labels).includes(t)?!0:Ir(e.hidden_labels).includes(t)?!1:!Ir(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Ps(t,e){return Ir(t).filter(r=>fn(r,e))}function Ot(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function hn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function $t(t){let e=hn(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function gn(t,e){let r=hn(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var Mi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Ni={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Pi={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Fi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function qi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function Bi(t,e,r){let n=Mi[t]||t,s=e&&e.state||"empty",o=Fi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${Ni[t]||t}
      </div>
    </div>
  `}function Dr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=Pi[r],s=t.stages,o=qi(n,s,String(e||"open"));return d`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>Bi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function Ui(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var Fs=2;function zi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,Fs).join(", "),s=r.length-Fs,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Hi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Ot(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Ot(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Ot(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Ps(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Ot(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Ot(r,"blocked")&&s.push(...zi(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function Wi(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Gi(t){let e=gn(t.created_at),r=gn(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
    ${e?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${$t(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${$t(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function ji(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(Es):r.children;return d`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?d`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:d`<span class="board-card__roll-none">children 없음</span>`}
        ${Gi(t)}
      </div>
      ${n>0&&r.current?d`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?d`<div class="board-card__roll-list">
            ${o.map((i,l)=>d`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${Wi(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function qs(t,e){let r=Ui(t.priority);return d`
    <article
      class="board-card"
      data-issue-id=${t.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${n=>e.onCardClick(n,t.id)}
      @dragstart=${n=>e.onDragStart(n,t.id)}
      @dragend=${e.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${t.id} \uBCF5\uC0AC`}
          @click=${n=>e.onCopyId(n,t.id)}
        >
          ${t.id}
        </button>
        ${r?d`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Hi(t,e)}
      ${t.workflow&&Ot(e.policy||null,"stepper")?Dr(t.workflow,t.status):""}
      ${ji(t,e)}
    </article>
  `}function Mt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return d`
    <section class=${n?"board-column board-column--closed":"board-column"} id=${t.id}>
      <header
        class="board-column__header"
        id=${t.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${t.title}</span>
          <span class="board-column__count" aria-label=${`${r}\uAC74`}
            >${r}</span
          >
        </div>
        ${n?d`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${ps.map(o=>d`<option
                    value=${o.value}
                    ?selected=${o.value===t.closed_range}
                  >
                    ${o.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${t.id+"-header"}
      >
        ${t.items.map(o=>qs(o,e))}
      </div>
    </section>
  `}var Yi=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Vi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Ki=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Zi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${n>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${r.label_menu_open?"true":"false"}
        @click=${e.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${r.label_menu_open?d`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?d`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>d`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?d`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Bs(t,e,r){return d`
    <div class="board-filter">
      <input
        class="board-filter__search"
        type="search"
        placeholder="ID·제목 검색"
        aria-label="이슈 검색"
        .value=${t.search}
        @input=${e.onSearchInput}
      />
      <select
        class="board-filter__select"
        aria-label="우선순위 필터"
        @change=${e.onPriorityChange}
      >
        ${Yi.map(n=>d`<option
              value=${n.value}
              ?selected=${t.priority===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${e.onTypeChange}
      >
        ${Vi.map(n=>d`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Zi(t,e,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.show_deferred?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-pressed=${r.show_deferred?"true":"false"}
        @click=${e.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${e.onSortChange}
      >
        ${Ki.map(n=>d`<option
              value=${n.value}
              ?selected=${r.sort_mode===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <button
        type="button"
        class="board-filter__new"
        @click=${e.onNewIssue}
      >
        + 새 이슈
      </button>
    </div>
  `}var Xi=200,Qi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ji=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Us="beads-ui.board.sort",zs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ea(){try{let t=window.localStorage.getItem(Us);if(t&&zs.has(t))return t}catch{}return"created_desc"}function Hs(t,e){let r=xe("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,u=e.onNewIssue,f=e.closedRange||Sr,g=s?Rr(s,i):null,w=Lr({transport:o,uiOrderStore:i}),y=[],$=[],T=[],P=[],q=[],z=[],U=!1,O=0,A=ea(),S=new Map,x=new Map,m=new Map,N=new Set,F={search:"",priority:"",type:"",labels:[]},W=!1,X=null;function we(R){return String(R.status||"open")==="open"}function se(R){let M=String(R.status||"open");return M==="open"||M==="blocked"}function re(R){let M=F.search.trim().toLowerCase(),J=F.priority,Z=F.type,B=F.labels;return R.filter(k=>{if(M){let L=String(k.id||"").toLowerCase(),E=String(k.title||"").toLowerCase();if(!L.includes(M)&&!E.includes(M))return!1}if(J!==""&&String(k.priority)!==J||Z!==""&&String(k.issue_type||"")!==Z)return!1;if(B.length>0){let L=Array.isArray(k.labels)?k.labels:[];if(!B.some(E=>L.includes(E)))return!1}return!0})}function tt(){let R=new Set;for(let M of[y,$,T,P,q,z])for(let J of M){let Z=Array.isArray(J.labels)?J.labels:[];for(let B of Z)typeof B=="string"&&B.length>0&&R.add(B)}return Array.from(R).sort()}function He(){return F.search.trim()!==""||F.priority!==""||F.type!==""||F.labels.length>0}function Se(){try{if(g){let R=g.selectBoardColumn("tab:board:in-progress","in_progress",A),M=g.selectBoardColumn("tab:board:blocked","blocked",A).filter(se),J=new Set(R.map(v=>v.id)),Z=g.selectBoardColumn("tab:board:ready","ready",A).filter(v=>we(v)&&!J.has(v.id)),B=g.selectBoardColumn("tab:board:resolved","resolved",A),k=g.selectBoardColumn("tab:board:deferred","deferred",A),L=U?k:[],E=g.selectBoardColumn("tab:board:closed","closed").slice(0,Xi),I=[...M,...Z,...R,...B,...L,...E];Ee(I);let c=new Set;for(let v of I)v&&v.id&&!mn(v)&&c.add(v.id);let _=!He();y=_?Vt(M,c):M,$=_?Vt(Z,c):Z,T=_?Vt(R,c):R,P=_?Vt(B,c):B,q=_?Vt(L,c):L,O=k.length,z=_?Vt(E,c):E,S=new Map;for(let v of y)S.set(v.id,"open");for(let v of $)S.set(v.id,"open");for(let v of T)S.set(v.id,"in_progress");for(let v of P)S.set(v.id,"resolved");for(let v of q)S.set(v.id,"deferred");for(let v of z)S.set(v.id,"closed");x=new Map;for(let v of y)x.set(v.id,"blocked-col");for(let v of $)x.set(v.id,"ready-col");for(let v of T)x.set(v.id,"in-progress-col");for(let v of P)x.set(v.id,"resolved-col");for(let v of q)x.set(v.id,"deferred-col");for(let v of z)x.set(v.id,"closed-col")}Ae()}catch{y=[],$=[],T=[],P=[],q=[],z=[],m=new Map,Ae()}}function Ee(R){let M=new Map;for(let Z of R)Z&&Z.id&&!M.has(Z.id)&&M.set(Z.id,Z);let J=new Map;for(let Z of M.values()){let B=mn(Z);if(!B)continue;let k=J.get(B);k||(k=[],J.set(B,k)),k.push({id:Z.id,title:Z.title,status:Z.status,metadata:Z.metadata,created_at:Z.created_at})}m=J}function rt(R){let M=m.get(R)||[],J=0,Z=null;for(let B of M)(B.status==="resolved"||B.status==="closed")&&(J+=1),!Z&&B.status==="in_progress"&&(Z=B);return{total:M.length,count:J,current:Z,children:M}}function pe(R){return!N.has(R)}function dt(R,M){R.preventDefault(),R.stopPropagation(),N.has(M)?N.delete(M):N.add(M),Ae()}function fe(R,M){R.preventDefault(),R.stopPropagation(),n(M)}function Be(R,M){R.preventDefault(),R.stopPropagation(),n(M)}function ae(R,M){X||n(M)}function We(R,M){R.preventDefault(),R.stopPropagation(),ta(M).then(J=>{J&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function ot(R,M){X=M,R.dataTransfer&&(R.dataTransfer.setData("text/plain",M),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function Re(R){R.target.classList.remove("board-card--dragging"),ut(),setTimeout(()=>{X=null},0)}function Me(R){let M=String(R.target.value||"");!M||M===f||(f=M,a&&a(M),Ae())}let ke={onCardClick:ae,onCopyId:We,onDragStart:ot,onDragEnd:Re,onClosedRangeChange:Me,rollupFor:rt,isExpanded:pe,onRollupToggle:dt,onChildClick:fe,onFromChipClick:Be,get policy(){return l?l.get():null}};function Ge(R){let M=R.target,J=t.querySelector(".board-filter__labels");M&&J&&J.contains(M)||je()}function nt(R){R.key==="Escape"&&je()}function Ne(){W||(W=!0,document.addEventListener("mousedown",Ge),document.addEventListener("keydown",nt),Ae())}function je(){W&&(W=!1,document.removeEventListener("mousedown",Ge),document.removeEventListener("keydown",nt),Ae())}let Pe={onSearchInput(R){F.search=String(R.target.value||""),Se()},onPriorityChange(R){F.priority=String(R.target.value||""),Se()},onTypeChange(R){F.type=String(R.target.value||""),Se()},onSortChange(R){let M=String(R.target.value||"");if(!(!zs.has(M)||M===A)){A=M;try{window.localStorage.setItem(Us,M)}catch{}Se()}},onDeferredToggle(){U=!U,Se()},onLabelMenuToggle(){W?je():Ne()},onLabelToggle(R){let M=F.labels.indexOf(R);M===-1?F.labels.push(R):F.labels.splice(M,1),Se()},onLabelClear(){F.labels.length!==0&&(F.labels=[],Se())},onNewIssue(){u&&u()}};function Qe(){let R=U?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${Bs(F,Pe,{sort_mode:A,show_deferred:U,deferred_count:O,label_options:tt(),label_menu_open:W})}
        <div class=${R}>
          ${Mt({title:"Blocked",id:"blocked-col",items:re(y)},ke)}
          ${Mt({title:"Ready",id:"ready-col",items:re($)},ke)}
          ${Mt({title:"In progress",id:"in-progress-col",items:re(T)},ke)}
          ${Mt({title:"Resolved",id:"resolved-col",items:re(P)},ke)}
          ${U?Mt({title:"Deferred",id:"deferred-col",items:re(q)},ke):""}
          ${Mt({title:"Closed",id:"closed-col",items:re(z),is_closed:!0,closed_range:f},ke)}
        </div>
      </div>
    `}function Ae(){de(Qe(),t),Le()}function Le(){try{let R=Array.from(t.querySelectorAll(".board-column"));for(let M of R)Array.from(M.querySelectorAll(".board-card")).forEach((Z,B)=>{Z.tabIndex=B===0?0:-1})}catch{}}async function Je(R,M){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:R,status:M}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(J){r("update-status failed: %o",J),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ue(R){switch(R){case"blocked-col":return y;case"ready-col":return $;case"in-progress-col":return T;case"resolved-col":return P;case"deferred-col":return q;default:return[]}}function he(R,M,J){if(!o||!i)return;let Z=Ue(R),B=Z.find(c=>c.id===M);if(!B)return;let k=Z.filter(c=>c.id!==M),L=J.closest?J.closest(".board-card"):null,E=k.length;if(L){let c=L.getAttribute("data-issue-id");if(c===M)return;let _=k.findIndex(v=>v.id===c);_>=0&&(E=_)}let I=k.slice();I.splice(E,0,B),w.applyReorder(M,I,E)}function ut(){for(let R of Array.from(t.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let _e=null;t.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let J=R.target.closest(".board-column");J&&J!==_e&&(_e&&_e.classList.remove("board-column--drag-over"),J.classList.add("board-column--drag-over"),_e=J)}),t.addEventListener("dragleave",R=>{let M=R.relatedTarget;(!M||!t.contains(M))&&_e&&(_e.classList.remove("board-column--drag-over"),_e=null)}),t.addEventListener("drop",R=>{R.preventDefault(),_e&&(_e.classList.remove("board-column--drag-over"),_e=null);let M=R.target,J=M.closest(".board-column");if(!J)return;let Z=R.dataTransfer?.getData("text/plain")||"";if(!Z)return;let B=J.id,k=x.get(Z);if(k&&k===B){if(Ji.has(B)){if(A!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}he(B,Z,M)}return}let L=Qi[B];if(!L){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}S.get(Z)!==L&&Je(Z,L)}),t.addEventListener("keydown",R=>{let M=R.target;if(!(M instanceof HTMLElement))return;let J=String(M.tagName||"").toLowerCase();if(J==="input"||J==="textarea"||J==="select"||J==="button"||J==="a"||M.isContentEditable===!0)return;let Z=M.closest(".board-card");if(!Z)return;let B=String(R.key||"");if(B==="Enter"||B===" "){R.preventDefault();let I=Z.getAttribute("data-issue-id");I&&n(I);return}if(B!=="ArrowUp"&&B!=="ArrowDown"&&B!=="ArrowLeft"&&B!=="ArrowRight")return;R.preventDefault();let k=Z.closest(".board-column");if(!k)return;let L=Array.from(k.querySelectorAll(".board-card")),E=L.indexOf(Z);if(B==="ArrowDown"&&E<L.length-1){Fe(Z,L[E+1]);return}if(B==="ArrowUp"&&E>0){Fe(Z,L[E-1]);return}if(B==="ArrowLeft"||B==="ArrowRight"){let I=Array.from(t.querySelectorAll(".board-column")),c=I.indexOf(k),_=B==="ArrowRight"?1:-1,v=c+_;for(;v>=0&&v<I.length;){let ee=I[v].querySelector(".board-card");if(ee){Fe(Z,ee);return}v+=_}}});function Fe(R,M){try{R.tabIndex=-1,M.tabIndex=0,M.focus()}catch{}}let Ie=null;g&&g.subscribe&&(Ie=g.subscribe(()=>{try{Se()}catch{}}));let De=null;return l&&l.subscribe&&(De=l.subscribe(()=>{try{Se()}catch{}})),{async load(){r("load"),Se()},clear(){je(),Ie&&(Ie(),Ie=null),De&&(De(),De=null),t.replaceChildren(),y=[],$=[],T=[],P=[],q=[],z=[],S=new Map,x=new Map}}}function mn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Vt(t,e){return t.filter(r=>{let n=mn(r);return!(n&&e.has(n))})}async function ta(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Nt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var ra={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},na=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,sa=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function xt(t){return!!t&&typeof t=="object"}function _n(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function Ws(t,e){let r=_n(t),n=_n(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function oa(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>xt(s)&&typeof s.text=="string"?s.text:"").join(""):xt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function ia(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:ra[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=_n(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ws(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Ws(xt(l)?l.old_string:"",xt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Gs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=na.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:sa.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function aa(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(xt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Gs(o.text));else if(o.type==="tool_use"){let i=ia(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(xt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=oa(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function la(t){if(t.type==="item.completed"&&xt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Gs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function ca(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function js(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!xt(o))continue;let i=ca(o)?la(o):aa(o,r);for(let l of i)e.push(l)}return e}function Or(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,u=null;function f(){if(!o||!n)return[];let x=n.get(o);return js(x?x.lines:[])}function g(x,m){if(m.kind==="gate")return d`<div class="sv__gate">${m.text}</div>`;if(m.kind==="phase")return d`<div class="sv__phase">${m.text}</div>`;if(m.kind==="result")return d`<div
        class="sv__result${m.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${m.success?"\u2713":"\u2717"}
        ${m.text||(m.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(m.kind==="error")return d`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="blocker")return d`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="tool"){let N=a.has(x),F=m.tool==="Bash"?m.command:m.path||m.command||"";return d`<div
        class="sv__tool${N?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>P(x)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${m.icon}</span>
          <span class="sv__tool-name">${m.tool}</span>
          ${F?d`<span class="sv__tool-detail">${F}</span>`:""}
          ${typeof m.added=="number"?d`<span class="sv__diff-add">+${m.added}</span>`:""}
          ${typeof m.removed=="number"?d`<span class="sv__diff-del">−${m.removed}</span>`:""}
          ${m.result?d`<span class="sv__tool-ok">→ ${m.result}</span>`:""}
        </span>
        ${N?d`<pre class="sv__tool-expand">${w(m)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${m.text}</div>`}function w(x){let m=[];if(x.input!==void 0)try{m.push(`input: ${JSON.stringify(x.input,null,2)}`)}catch{}return typeof x.output=="string"&&x.output.length>0&&m.push(`output:
${x.output}`),m.join(`

`)}function y(){if(!o)return d``;let x=f(),m=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),N=i.session_id||"",F=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${N?d`<button
              type="button"
              class="sv__session"
              title=${N}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${N}`}
              @click=${()=>z(N)}
            >
              ⧉ ${N.slice(0,8)}
            </button>`:""}
        ${m?d`<span class="sv__meta">${m}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${F}
          @click=${q}
        >
          <span class="sv__follow-full">⇣ ${F}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>S()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${x.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:x.map((W,X)=>g(X,W))}
      </div>
    </div>`}function $(){de(y(),t),l&&T()}function T(){let x=t.querySelector(".sv__body");x&&(x.scrollTop=x.scrollHeight)}function P(x){a.has(x)?a.delete(x):a.add(x),$()}function q(){l=!l,$()}function z(x){Nt(x).then(m=>{m?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function U(x){!o||!x||(i={...i,...x},$())}function O(x){let m=x.target;if(!m||!m.classList||!m.classList.contains("sv__body"))return;!(m.scrollHeight-m.scrollTop-m.clientHeight<=4)&&l&&(l=!1,$())}t.addEventListener("scroll",O,!0);function A(x){let m=x&&x.attempt_id;m&&(o=m,i=x.meta||{},l=!0,a.clear(),!u&&n&&(u=n.subscribe($)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),$())}function S(){let x=o;o=null,a.clear(),r&&x&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${x}`})).catch(()=>{}),de(d``,t),s&&s()}return{open:A,updateMeta:U,close:S,isOpen(){return o!==null},destroy(){u&&(u(),u=null),t.removeEventListener("scroll",O,!0),o=null,de(d``,t)}}}function da(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ys(t,e){let r=da(t);return d`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?d`<div class="detail-empty">산출물 없음</div>`:d`
          ${r.map(n=>d`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>e.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>e.onOpenDoc(s,n.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var bn=["opus","sonnet","haiku","fable"],wn=["low","medium","high","xhigh"],kn=["codex","opus","fable","self","skip"],yn=["opus","fable","sonnet","haiku"],ua=["standard","fast_track"],vn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Mr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:vn[t]||"(\uAE30\uBCF8)"}function ar(t,e,r,n,s,o){return d`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>d`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function lr(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Vs(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${ar("orchestration_model","orchestration_model",lr(bn,Mr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${ar("orchestration_effort","orchestration_effort",lr(wn,Mr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${ar("review_model","review_model",lr(kn,Mr("review_model",s)),n.review_model||"",!1,e)}
    ${ar("impl_model","impl_model",lr(yn,Mr("impl_model",s)),n.impl_model||"",!1,e)}
    ${ar("workflow_mode","workflow_mode",lr(ua),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:no,setPrototypeOf:Ks,isFrozen:pa,getPrototypeOf:fa,getOwnPropertyDescriptor:ha}=Object,{freeze:Ke,seal:ct,create:Cn}=Object,{apply:Rn,construct:Ln}=typeof Reflect<"u"&&Reflect;Ke||(Ke=function(e){return e});ct||(ct=function(e){return e});Rn||(Rn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Ln||(Ln=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Nr=Ze(Array.prototype.forEach),ga=Ze(Array.prototype.lastIndexOf),Zs=Ze(Array.prototype.pop),cr=Ze(Array.prototype.push),ma=Ze(Array.prototype.splice),Fr=Ze(String.prototype.toLowerCase),$n=Ze(String.prototype.toString),xn=Ze(String.prototype.match),dr=Ze(String.prototype.replace),_a=Ze(String.prototype.indexOf),ba=Ze(String.prototype.trim),ht=Ze(Object.prototype.hasOwnProperty),Ve=Ze(RegExp.prototype.test),ur=wa(TypeError);function Ze(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Rn(t,e,n)}}function wa(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Ln(t,r)}}function ne(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Fr;Ks&&Ks(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(pa(e)||(e[n]=o),s=o)}t[s]=!0}return t}function ka(t){for(let e=0;e<t.length;e++)ht(t,e)||(t[e]=null);return t}function wt(t){let e=Cn(null);for(let[r,n]of no(t))ht(t,r)&&(Array.isArray(n)?e[r]=ka(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=wt(n):e[r]=n);return e}function pr(t,e){for(;t!==null;){let n=ha(t,e);if(n){if(n.get)return Ze(n.get);if(typeof n.value=="function")return Ze(n.value)}t=fa(t)}function r(){return null}return r}var Xs=Ke(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Sn=Ke(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),An=Ke(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ya=Ke(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Tn=Ke(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),va=Ke(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Qs=Ke(["#text"]),Js=Ke(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),En=Ke(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),eo=Ke(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Pr=Ke(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),$a=ct(/\{\{[\w\W]*|[\w\W]*\}\}/gm),xa=ct(/<%[\w\W]*|[\w\W]*%>/gm),Sa=ct(/\$\{[\w\W]*/gm),Aa=ct(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ta=ct(/^aria-[\-\w]+$/),so=ct(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ea=ct(/^(?:\w+script|data):/i),Ca=ct(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),oo=ct(/^html$/i),Ra=ct(/^[a-z][.\w]*(-[.\w]+)+$/i),to=Object.freeze({__proto__:null,ARIA_ATTR:Ta,ATTR_WHITESPACE:Ca,CUSTOM_ELEMENT:Ra,DATA_ATTR:Aa,DOCTYPE_NAME:oo,ERB_EXPR:xa,IS_ALLOWED_URI:so,IS_SCRIPT_OR_DATA:Ea,MUSTACHE_EXPR:$a,TMPLIT_EXPR:Sa}),fr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},La=function(){return typeof window>"u"?null:window},Ia=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ro=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function io(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:La(),e=j=>io(j);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==fr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:g,DOMParser:w,trustedTypes:y}=t,$=a.prototype,T=pr($,"cloneNode"),P=pr($,"remove"),q=pr($,"nextSibling"),z=pr($,"childNodes"),U=pr($,"parentNode");if(typeof i=="function"){let j=r.createElement("template");j.content&&j.content.ownerDocument&&(r=j.content.ownerDocument)}let O,A="",{implementation:S,createNodeIterator:x,createDocumentFragment:m,getElementsByTagName:N}=r,{importNode:F}=n,W=ro();e.isSupported=typeof no=="function"&&typeof U=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:X,ERB_EXPR:we,TMPLIT_EXPR:se,DATA_ATTR:re,ARIA_ATTR:tt,IS_SCRIPT_OR_DATA:He,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:Ee}=to,{IS_ALLOWED_URI:rt}=to,pe=null,dt=ne({},[...Xs,...Sn,...An,...Tn,...Qs]),fe=null,Be=ne({},[...Js,...En,...eo,...Pr]),ae=Object.seal(Cn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),We=null,ot=null,Re=Object.seal(Cn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Me=!0,ke=!0,Ge=!1,nt=!0,Ne=!1,je=!0,Pe=!1,Qe=!1,Ae=!1,Le=!1,Je=!1,Ue=!1,he=!0,ut=!1,_e="user-content-",Fe=!0,Ie=!1,De={},R=null,M=ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),J=null,Z=ne({},["audio","video","img","source","image","track"]),B=null,k=ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),L="http://www.w3.org/1998/Math/MathML",E="http://www.w3.org/2000/svg",I="http://www.w3.org/1999/xhtml",c=I,_=!1,v=null,ee=ne({},[L,E,I],$n),le=ne({},["mi","mo","mn","ms","mtext"]),ye=ne({},["annotation-xml"]),ve=ne({},["title","style","font","a","script"]),$e=null,ze=["application/xhtml+xml","text/html"],_t="text/html",h=null,b=null,Y=r.createElement("form"),G=function(p){return p instanceof RegExp||p instanceof Function},te=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(b&&b===p)){if((!p||typeof p!="object")&&(p={}),p=wt(p),$e=ze.indexOf(p.PARSER_MEDIA_TYPE)===-1?_t:p.PARSER_MEDIA_TYPE,h=$e==="application/xhtml+xml"?$n:Fr,pe=ht(p,"ALLOWED_TAGS")?ne({},p.ALLOWED_TAGS,h):dt,fe=ht(p,"ALLOWED_ATTR")?ne({},p.ALLOWED_ATTR,h):Be,v=ht(p,"ALLOWED_NAMESPACES")?ne({},p.ALLOWED_NAMESPACES,$n):ee,B=ht(p,"ADD_URI_SAFE_ATTR")?ne(wt(k),p.ADD_URI_SAFE_ATTR,h):k,J=ht(p,"ADD_DATA_URI_TAGS")?ne(wt(Z),p.ADD_DATA_URI_TAGS,h):Z,R=ht(p,"FORBID_CONTENTS")?ne({},p.FORBID_CONTENTS,h):M,We=ht(p,"FORBID_TAGS")?ne({},p.FORBID_TAGS,h):wt({}),ot=ht(p,"FORBID_ATTR")?ne({},p.FORBID_ATTR,h):wt({}),De=ht(p,"USE_PROFILES")?p.USE_PROFILES:!1,Me=p.ALLOW_ARIA_ATTR!==!1,ke=p.ALLOW_DATA_ATTR!==!1,Ge=p.ALLOW_UNKNOWN_PROTOCOLS||!1,nt=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ne=p.SAFE_FOR_TEMPLATES||!1,je=p.SAFE_FOR_XML!==!1,Pe=p.WHOLE_DOCUMENT||!1,Le=p.RETURN_DOM||!1,Je=p.RETURN_DOM_FRAGMENT||!1,Ue=p.RETURN_TRUSTED_TYPE||!1,Ae=p.FORCE_BODY||!1,he=p.SANITIZE_DOM!==!1,ut=p.SANITIZE_NAMED_PROPS||!1,Fe=p.KEEP_CONTENT!==!1,Ie=p.IN_PLACE||!1,rt=p.ALLOWED_URI_REGEXP||so,c=p.NAMESPACE||I,le=p.MATHML_TEXT_INTEGRATION_POINTS||le,ye=p.HTML_INTEGRATION_POINTS||ye,ae=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&G(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ae.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&G(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ae.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ne&&(ke=!1),Je&&(Le=!0),De&&(pe=ne({},Qs),fe=[],De.html===!0&&(ne(pe,Xs),ne(fe,Js)),De.svg===!0&&(ne(pe,Sn),ne(fe,En),ne(fe,Pr)),De.svgFilters===!0&&(ne(pe,An),ne(fe,En),ne(fe,Pr)),De.mathMl===!0&&(ne(pe,Tn),ne(fe,eo),ne(fe,Pr))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Re.tagCheck=p.ADD_TAGS:(pe===dt&&(pe=wt(pe)),ne(pe,p.ADD_TAGS,h))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Re.attributeCheck=p.ADD_ATTR:(fe===Be&&(fe=wt(fe)),ne(fe,p.ADD_ATTR,h))),p.ADD_URI_SAFE_ATTR&&ne(B,p.ADD_URI_SAFE_ATTR,h),p.FORBID_CONTENTS&&(R===M&&(R=wt(R)),ne(R,p.FORBID_CONTENTS,h)),Fe&&(pe["#text"]=!0),Pe&&ne(pe,["html","head","body"]),pe.table&&(ne(pe,["tbody"]),delete We.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw ur('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ur('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=p.TRUSTED_TYPES_POLICY,A=O.createHTML("")}else O===void 0&&(O=Ia(y,s)),O!==null&&typeof A=="string"&&(A=O.createHTML(""));Ke&&Ke(p),b=p}},V=ne({},[...Sn,...An,...ya]),be=ne({},[...Tn,...va]),qt=function(p){let D=U(p);(!D||!D.tagName)&&(D={namespaceURI:c,tagName:"template"});let H=Fr(p.tagName),ge=Fr(D.tagName);return v[p.namespaceURI]?p.namespaceURI===E?D.namespaceURI===I?H==="svg":D.namespaceURI===L?H==="svg"&&(ge==="annotation-xml"||le[ge]):!!V[H]:p.namespaceURI===L?D.namespaceURI===I?H==="math":D.namespaceURI===E?H==="math"&&ye[ge]:!!be[H]:p.namespaceURI===I?D.namespaceURI===E&&!ye[ge]||D.namespaceURI===L&&!le[ge]?!1:!be[H]&&(ve[H]||!V[H]):!!($e==="application/xhtml+xml"&&v[p.namespaceURI]):!1},it=function(p){cr(e.removed,{element:p});try{U(p).removeChild(p)}catch{P(p)}},pt=function(p,D){try{cr(e.removed,{attribute:D.getAttributeNode(p),from:D})}catch{cr(e.removed,{attribute:null,from:D})}if(D.removeAttribute(p),p==="is")if(Le||Je)try{it(D)}catch{}else try{D.setAttribute(p,"")}catch{}},yr=function(p){let D=null,H=null;if(Ae)p="<remove></remove>"+p;else{let me=xn(p,/^[\r\n\t ]+/);H=me&&me[0]}$e==="application/xhtml+xml"&&c===I&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let ge=O?O.createHTML(p):p;if(c===I)try{D=new w().parseFromString(ge,$e)}catch{}if(!D||!D.documentElement){D=S.createDocument(c,"template",null);try{D.documentElement.innerHTML=_?A:ge}catch{}}let Oe=D.body||D.documentElement;return p&&H&&Oe.insertBefore(r.createTextNode(H),Oe.childNodes[0]||null),c===I?N.call(D,Pe?"html":"body")[0]:Pe?D.documentElement:Oe},vr=function(p){return x.call(p.ownerDocument||p,p,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Bt=function(p){return p instanceof g&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},Tt=function(p){return typeof l=="function"&&p instanceof l};function st(j,p,D){Nr(j,H=>{H.call(e,p,D,b)})}let Xt=function(p){let D=null;if(st(W.beforeSanitizeElements,p,null),Bt(p))return it(p),!0;let H=h(p.nodeName);if(st(W.uponSanitizeElement,p,{tagName:H,allowedTags:pe}),je&&p.hasChildNodes()&&!Tt(p.firstElementChild)&&Ve(/<[/\w!]/g,p.innerHTML)&&Ve(/<[/\w!]/g,p.textContent)||p.nodeType===fr.progressingInstruction||je&&p.nodeType===fr.comment&&Ve(/<[/\w]/g,p.data))return it(p),!0;if(!(Re.tagCheck instanceof Function&&Re.tagCheck(H))&&(!pe[H]||We[H])){if(!We[H]&&$r(H)&&(ae.tagNameCheck instanceof RegExp&&Ve(ae.tagNameCheck,H)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(H)))return!1;if(Fe&&!R[H]){let ge=U(p)||p.parentNode,Oe=z(p)||p.childNodes;if(Oe&&ge){let me=Oe.length;for(let Ye=me-1;Ye>=0;--Ye){let lt=T(Oe[Ye],!0);lt.__removalCount=(p.__removalCount||0)+1,ge.insertBefore(lt,q(p))}}}return it(p),!0}return p instanceof a&&!qt(p)||(H==="noscript"||H==="noembed"||H==="noframes")&&Ve(/<\/no(script|embed|frames)/i,p.innerHTML)?(it(p),!0):(Ne&&p.nodeType===fr.text&&(D=p.textContent,Nr([X,we,se],ge=>{D=dr(D,ge," ")}),p.textContent!==D&&(cr(e.removed,{element:p.cloneNode()}),p.textContent=D)),st(W.afterSanitizeElements,p,null),!1)},Qt=function(p,D,H){if(he&&(D==="id"||D==="name")&&(H in r||H in Y))return!1;if(!(ke&&!ot[D]&&Ve(re,D))){if(!(Me&&Ve(tt,D))){if(!(Re.attributeCheck instanceof Function&&Re.attributeCheck(D,p))){if(!fe[D]||ot[D]){if(!($r(p)&&(ae.tagNameCheck instanceof RegExp&&Ve(ae.tagNameCheck,p)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(p))&&(ae.attributeNameCheck instanceof RegExp&&Ve(ae.attributeNameCheck,D)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck(D,p))||D==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&Ve(ae.tagNameCheck,H)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(H))))return!1}else if(!B[D]){if(!Ve(rt,dr(H,Se,""))){if(!((D==="src"||D==="xlink:href"||D==="href")&&p!=="script"&&_a(H,"data:")===0&&J[p])){if(!(Ge&&!Ve(He,dr(H,Se,"")))){if(H)return!1}}}}}}}return!0},$r=function(p){return p!=="annotation-xml"&&xn(p,Ee)},yt=function(p){st(W.beforeSanitizeAttributes,p,null);let{attributes:D}=p;if(!D||Bt(p))return;let H={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},ge=D.length;for(;ge--;){let Oe=D[ge],{name:me,namespaceURI:Ye,value:lt}=Oe,bt=h(me),Ut=lt,Ce=me==="value"?Ut:ba(Ut);if(H.attrName=bt,H.attrValue=Ce,H.keepAttr=!0,H.forceKeepAttr=void 0,st(W.uponSanitizeAttribute,p,H),Ce=H.attrValue,ut&&(bt==="id"||bt==="name")&&(pt(me,p),Ce=_e+Ce),je&&Ve(/((--!?|])>)|<\/(style|title|textarea)/i,Ce)){pt(me,p);continue}if(bt==="attributename"&&xn(Ce,"href")){pt(me,p);continue}if(H.forceKeepAttr)continue;if(!H.keepAttr){pt(me,p);continue}if(!nt&&Ve(/\/>/i,Ce)){pt(me,p);continue}Ne&&Nr([X,we,se],er=>{Ce=dr(Ce,er," ")});let Jt=h(p.nodeName);if(!Qt(Jt,bt,Ce)){pt(me,p);continue}if(O&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!Ye)switch(y.getAttributeType(Jt,bt)){case"TrustedHTML":{Ce=O.createHTML(Ce);break}case"TrustedScriptURL":{Ce=O.createScriptURL(Ce);break}}if(Ce!==Ut)try{Ye?p.setAttributeNS(Ye,me,Ce):p.setAttribute(me,Ce),Bt(p)?it(p):Zs(e.removed)}catch{pt(me,p)}}st(W.afterSanitizeAttributes,p,null)},at=function j(p){let D=null,H=vr(p);for(st(W.beforeSanitizeShadowDOM,p,null);D=H.nextNode();)st(W.uponSanitizeShadowNode,D,null),Xt(D),yt(D),D.content instanceof o&&j(D.content);st(W.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(j){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},D=null,H=null,ge=null,Oe=null;if(_=!j,_&&(j="<!-->"),typeof j!="string"&&!Tt(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw ur("dirty is not a string, aborting")}else throw ur("toString is not a function");if(!e.isSupported)return j;if(Qe||te(p),e.removed=[],typeof j=="string"&&(Ie=!1),Ie){if(j.nodeName){let lt=h(j.nodeName);if(!pe[lt]||We[lt])throw ur("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof l)D=yr("<!---->"),H=D.ownerDocument.importNode(j,!0),H.nodeType===fr.element&&H.nodeName==="BODY"||H.nodeName==="HTML"?D=H:D.appendChild(H);else{if(!Le&&!Ne&&!Pe&&j.indexOf("<")===-1)return O&&Ue?O.createHTML(j):j;if(D=yr(j),!D)return Le?null:Ue?A:""}D&&Ae&&it(D.firstChild);let me=vr(Ie?j:D);for(;ge=me.nextNode();)Xt(ge),yt(ge),ge.content instanceof o&&at(ge.content);if(Ie)return j;if(Le){if(Je)for(Oe=m.call(D.ownerDocument);D.firstChild;)Oe.appendChild(D.firstChild);else Oe=D;return(fe.shadowroot||fe.shadowrootmode)&&(Oe=F.call(n,Oe,!0)),Oe}let Ye=Pe?D.outerHTML:D.innerHTML;return Pe&&pe["!doctype"]&&D.ownerDocument&&D.ownerDocument.doctype&&D.ownerDocument.doctype.name&&Ve(oo,D.ownerDocument.doctype.name)&&(Ye="<!DOCTYPE "+D.ownerDocument.doctype.name+`>
`+Ye),Ne&&Nr([X,we,se],lt=>{Ye=dr(Ye,lt," ")}),O&&Ue?O.createHTML(Ye):Ye},e.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};te(j),Qe=!0},e.clearConfig=function(){b=null,Qe=!1},e.isValidAttribute=function(j,p,D){b||te({});let H=h(j),ge=h(p);return Qt(H,ge,D)},e.addHook=function(j,p){typeof p=="function"&&cr(W[j],p)},e.removeHook=function(j,p){if(p!==void 0){let D=ga(W[j],p);return D===-1?void 0:ma(W[j],D,1)[0]}return Zs(W[j])},e.removeHooks=function(j){W[j]=[]},e.removeAllHooks=function(){W=ro()},e}var ao=io();var lo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},co=t=>(...e)=>({_$litDirective$:t,values:e}),qr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var hr=class extends qr{constructor(e){if(super(e),this.it=Te,e.type!==lo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Te||e==null)return this._t=void 0,this.it=e;if(e===Lt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};hr.directiveName="unsafeHTML",hr.resultType=1;var uo=co(hr);function Mn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ft=Mn();function bo(t){Ft=t}var br={exec:()=>null};function ie(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Xe.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Da=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Xe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Oa=/^(?:[ \t]*(?:\n|$))+/,Ma=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Na=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,wr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Pa=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Nn=/(?:[*+-]|\d{1,9}[.)])/,wo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ko=ie(wo).replace(/bull/g,Nn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Fa=ie(wo).replace(/bull/g,Nn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Pn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qa=/^[^\n]+/,Fn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ba=ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Fn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ua=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Nn).getRegex(),Gr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",qn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,za=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",qn).replace("tag",Gr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),yo=ie(Pn).replace("hr",wr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Gr).getRegex(),Ha=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",yo).getRegex(),Bn={blockquote:Ha,code:Ma,def:Ba,fences:Na,heading:Pa,hr:wr,html:za,lheading:ko,list:Ua,newline:Oa,paragraph:yo,table:br,text:qa},po=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",wr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Gr).getRegex(),Wa={...Bn,lheading:Fa,table:po,paragraph:ie(Pn).replace("hr",wr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",po).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Gr).getRegex()},Ga={...Bn,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",qn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:br,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie(Pn).replace("hr",wr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ko).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ja=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ya=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,vo=/^( {2,}|\\)\n(?!\s*$)/,Va=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,jr=/[\p{P}\p{S}]/u,Un=/[\s\p{P}\p{S}]/u,$o=/[^\s\p{P}\p{S}]/u,Ka=ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Un).getRegex(),xo=/(?!~)[\p{P}\p{S}]/u,Za=/(?!~)[\s\p{P}\p{S}]/u,Xa=/(?:[^\s\p{P}\p{S}]|~)/u,Qa=ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Da?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),So=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ja=ie(So,"u").replace(/punct/g,jr).getRegex(),el=ie(So,"u").replace(/punct/g,xo).getRegex(),Ao="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",tl=ie(Ao,"gu").replace(/notPunctSpace/g,$o).replace(/punctSpace/g,Un).replace(/punct/g,jr).getRegex(),rl=ie(Ao,"gu").replace(/notPunctSpace/g,Xa).replace(/punctSpace/g,Za).replace(/punct/g,xo).getRegex(),nl=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,$o).replace(/punctSpace/g,Un).replace(/punct/g,jr).getRegex(),sl=ie(/\\(punct)/,"gu").replace(/punct/g,jr).getRegex(),ol=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),il=ie(qn).replace("(?:-->|$)","-->").getRegex(),al=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",il).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),zr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ll=ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",zr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),To=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",zr).replace("ref",Fn).getRegex(),Eo=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",Fn).getRegex(),cl=ie("reflink|nolink(?!\\()","g").replace("reflink",To).replace("nolink",Eo).getRegex(),fo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,zn={_backpedal:br,anyPunctuation:sl,autolink:ol,blockSkip:Qa,br:vo,code:Ya,del:br,emStrongLDelim:Ja,emStrongRDelimAst:tl,emStrongRDelimUnd:nl,escape:ja,link:ll,nolink:Eo,punctuation:Ka,reflink:To,reflinkSearch:cl,tag:al,text:Va,url:br},dl={...zn,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",zr).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",zr).getRegex()},In={...zn,emStrongRDelimAst:rl,emStrongLDelim:el,url:ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",fo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",fo).getRegex()},ul={...In,br:ie(vo).replace("{2,}","*").getRegex(),text:ie(In.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Br={normal:Bn,gfm:Wa,pedantic:Ga},gr={normal:zn,gfm:In,breaks:ul,pedantic:dl},pl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ho=t=>pl[t];function kt(t,e){if(e){if(Xe.escapeTest.test(t))return t.replace(Xe.escapeReplace,ho)}else if(Xe.escapeTestNoEncode.test(t))return t.replace(Xe.escapeReplaceNoEncode,ho);return t}function go(t){try{t=encodeURI(t).replace(Xe.percentDecode,"%")}catch{return null}return t}function mo(t,e){let r=t.replace(Xe.findPipe,(o,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Xe.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Xe.slashPipe,"|");return n}function mr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function fl(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function _o(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function hl(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Hr=class{constructor(t){ue(this,"options");ue(this,"rules");ue(this,"lexer");this.options=t||Ft}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:mr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=hl(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=mr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:mr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=mr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let u=l.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=g,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let y=w,$=y.raw+`
`+r.join(`
`),T=this.blockquote($);o[o.length-1]=T,n=n.substring(0,n.length-y.raw.length)+T.raw,s=s.substring(0,s.length-y.text.length)+T.text;break}else if(w?.type==="list"){let y=w,$=y.raw+`
`+r.join(`
`),T=this.list($);o[o.length-1]=T,n=n.substring(0,n.length-w.raw.length)+T.raw,s=s.substring(0,s.length-y.raw.length)+T.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,u="",f="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let g=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),w=t.split(`
`,1)[0],y=!g.trim(),$=0;if(this.options.pedantic?($=2,f=g.trimStart()):y?$=e[1].length+1:($=e[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=g.slice($),$+=e[1].length),y&&this.rules.other.blankLine.test(w)&&(u+=w+`
`,t=t.substring(w.length+1),a=!0),!a){let T=this.rules.other.nextBulletRegex($),P=this.rules.other.hrRegex($),q=this.rules.other.fencesBeginRegex($),z=this.rules.other.headingBeginRegex($),U=this.rules.other.htmlBeginRegex($);for(;t;){let O=t.split(`
`,1)[0],A;if(w=O,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),A=w):A=w.replace(this.rules.other.tabCharGlobal,"    "),q.test(w)||z.test(w)||U.test(w)||T.test(w)||P.test(w))break;if(A.search(this.rules.other.nonSpaceChar)>=$||!w.trim())f+=`
`+A.slice($);else{if(y||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||q.test(g)||z.test(g)||P.test(g))break;f+=`
`+w}!y&&!w.trim()&&(y=!0),u+=O+`
`,t=t.substring(O.length+1),g=A.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=f.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=f.raw+a.tokens[0].raw,a.tokens[0].text=f.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(f)):a.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):a.tokens.unshift(f)}}if(!s.loose){let u=a.tokens.filter(g=>g.type==="space"),f=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=f}}if(s.loose)for(let a of s.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=mo(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(mo(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=mr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=fl(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),_o(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return _o(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+s);(n=u.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let f=[...n[0]][0].length,g=t.slice(0,s+n.index+f+i);if(Math.min(s,i)%2){let y=g.slice(1,-1);return{type:"em",raw:g,text:y,tokens:this.lexer.inlineTokens(y)}}let w=g.slice(2,-2);return{type:"strong",raw:g,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},gt=class Dn{constructor(e){ue(this,"tokens");ue(this,"options");ue(this,"state");ue(this,"inlineQueue");ue(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ft,this.options.tokenizer=this.options.tokenizer||new Hr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Xe,block:Br.normal,inline:gr.normal};this.options.pedantic?(r.block=Br.pedantic,r.inline=gr.pedantic):this.options.gfm&&(r.block=Br.gfm,this.options.breaks?r.inline=gr.breaks:r.inline=gr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Br,inline:gr}}static lex(e,r){return new Dn(r).lex(e)}static lexInline(e,r){return new Dn(r).inlineTokens(e)}lex(e){e=e.replace(Xe.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Xe.tabCharGlobal,"    ").replace(Xe.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(f=>(a=f.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let f=r.at(-1);a.type==="text"&&f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let u=e;if(this.options.extensions?.startInline){let f=1/0,g=e.slice(1),w;this.options.extensions.startInline.forEach(y=>{w=y.call({lexer:this},g),typeof w=="number"&&w>=0&&(f=Math.min(f,w))}),f<1/0&&f>=0&&(u=e.substring(0,f+1))}if(a=this.tokenizer.inlineText(u)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(e){let f="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Wr=class{constructor(t){ue(this,"options");ue(this,"parser");this.options=t||Ft}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Xe.notSpaceStart)?.[0],s=t.replace(Xe.endingNewline,"")+`
`;return n?'<pre><code class="language-'+kt(n)+'">'+(r?s:kt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:kt(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,n="";for(let i=0;i<t.items.length;i++){let l=t.items[i];n+=this.listitem(l)}let s=e?"ol":"ul",o=e&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let s=0;s<t.header.length;s++)r+=this.tablecell(t.header[s]);e+=this.tablerow({text:r});let n="";for(let s=0;s<t.rows.length;s++){let o=t.rows[s];r="";for(let i=0;i<o.length;i++)r+=this.tablecell(o[i]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${kt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=go(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+kt(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=go(t);if(s===null)return kt(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${kt(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:kt(t.text)}},Hn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},mt=class On{constructor(e){ue(this,"options");ue(this,"renderer");ue(this,"textRenderer");this.options=e||Ft,this.options.renderer=this.options.renderer||new Wr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Hn}static parse(e,r){return new On(r).parse(e)}static parseInline(e,r){return new On(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Ur,_r=(Ur=class{constructor(t){ue(this,"options");ue(this,"block");this.options=t||Ft}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?gt.lex:gt.lexInline}provideParser(){return this.block?mt.parse:mt.parseInline}},ue(Ur,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ue(Ur,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ur),gl=class{constructor(...t){ue(this,"defaults",Mn());ue(this,"options",this.setOptions);ue(this,"parse",this.parseMarkdown(!0));ue(this,"parseInline",this.parseMarkdown(!1));ue(this,"Parser",mt);ue(this,"Renderer",Wr);ue(this,"TextRenderer",Hn);ue(this,"Lexer",gt);ue(this,"Tokenizer",Hr);ue(this,"Hooks",_r);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Wr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=a.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Hr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=a.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new _r;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];_r.passThroughHooks.has(o)?s[i]=u=>{if(this.defaults.async&&_r.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await l.call(s,u);return a.call(s,g)})();let f=l.call(s,u);return a.call(s,f)}:s[i]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await l.apply(s,u);return g===!1&&(g=await a.apply(s,u)),g})();let f=l.apply(s,u);return f===!1&&(f=a.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return gt.lex(t,e??this.defaults)}parser(t,e){return mt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?gt.lex:gt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():t?mt.parse:mt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?gt.lex:gt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?mt.parse:mt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+kt(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Pt=new gl;function ce(t,e){return Pt.parse(t,e)}ce.options=ce.setOptions=function(t){return Pt.setOptions(t),ce.defaults=Pt.defaults,bo(ce.defaults),ce};ce.getDefaults=Mn;ce.defaults=Ft;ce.use=function(...t){return Pt.use(...t),ce.defaults=Pt.defaults,bo(ce.defaults),ce};ce.walkTokens=function(t,e){return Pt.walkTokens(t,e)};ce.parseInline=Pt.parseInline;ce.Parser=mt;ce.parser=mt.parse;ce.Renderer=Wr;ce.TextRenderer=Hn;ce.Lexer=gt;ce.lexer=gt.lex;ce.Tokenizer=Hr;ce.Hooks=_r;ce.parse=ce;var Ad=ce.options,Td=ce.setOptions,Ed=ce.use,Cd=ce.walkTokens,Rd=ce.parseInline;var Ld=mt.parse,Id=gt.lex;function Co(t){let e=ce.parse(t),r=ao.sanitize(e);return uo(r)}function ml(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function Ro(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a($){$.key==="Escape"&&s&&($.preventDefault(),w())}document.addEventListener("keydown",a);function u(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${ml(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>w()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Co(i)}
          </div>
        </div>
      </div>
    `:d``}function f(){de(u(),t)}async function g($){s=$,o="loading",i="",l="",f();let T=r?r():"";if(!T){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let P="/api/doc?workspace="+encodeURIComponent(T)+"&path="+encodeURIComponent($);try{let q=await n(P),z=await q.json().catch(()=>({}));if(!q.ok||!z||z.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(z&&z.error||q.status)+")",f();return}i=String(z.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function w(){s=null,de(d``,t)}function y(){document.removeEventListener("keydown",a),w()}return{open:g,close:w,destroy:y}}var _l={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function bl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Lo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,u=n.has(i.attempt_id),f=a&&!u,g=a?u?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!f}
      title=${g}
      @click=${w=>{w.stopPropagation(),f&&e.onResume&&e.onResume(i.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},o=i=>{if(!(i.status==="failed"||i.status==="orphaned")||typeof i.cause!="string"||i.cause==="")return"";let a=i.cause_detail,u=a&&typeof a.reason=="string"&&a.reason.length>0?typeof a.command=="string"&&a.command.length>0?`${a.reason} \xB7 ${a.command}`:a.reason:i.cause;return d`<div class="detail-session__cause" title=${u}>
      ${i.cause}
    </div>`};return d`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(i=>d`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${i.status||"unknown"}"
              data-attempt-id=${i.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(i.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${_l[i.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${i.attempt_id}</span>
              ${i.resumed_from?d`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${i.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[i.runner,i.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${i.session_id?d`<span class="detail-session__sid" title=${i.session_id}
                    >${String(i.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${bl(i.started_at)}</span
              >
            </button>
            ${s(i)} ${o(i)}
          </div>`)}
    </div>
  `}var wl=["open","in_progress","deferred","resolved","closed"],kl=[0,1,2,3,4];function Io(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,u=null,f={},g=!1,w=!1,y="",$="",T="";function P(){g=!1,w=!1,y="",$="",T=""}let q=document.createElement("div");q.className="md-viewer-root",document.body.appendChild(q);let z=Ro(q,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),U=document.createElement("div");U.className="session-log-root",document.body.appendChild(U);let O=Or(U,{transport:s?(k,L)=>Promise.resolve(s(k,L)):void 0,sessionLogStore:l});function A(){if(!i||!a)return[];let k=i.get();return(k&&k.attempts?Object.values(k.attempts):[]).filter(E=>E&&E.bead_id===a).sort((E,I)=>(I.started_at||0)-(E.started_at||0)).map(E=>({attempt_id:E.attempt_id,bead_id:E.bead_id,status:E.status,started_at:typeof E.started_at=="number"?E.started_at:null,runner:E.runner||null,model:E.model||null,session_id:E.session_id||null,resumed_from:E.resumed_from||null,dismissed_at:typeof E.dismissed_at=="number"?E.dismissed_at:null,cause:typeof E.cause=="string"?E.cause:null,cause_detail:E.cause_detail||null}))}function S(k){let L=i?i.get():null,E=L&&L.attempts?L.attempts[k]:null;O.open({attempt_id:k,meta:E?{runner:E.runner||void 0,model:E.model||void 0,effort:E.effort||void 0,status:E.status||void 0,session_id:E.session_id||void 0}:{}})}async function x(k){if(!s||!k)return;let L=()=>{let I=i?i.get():null;return I&&typeof I.revision=="number"?I.revision:0},E=await s("worker-attempt-resume",{attempt_id:k,expected_revision:L()});if(E&&E.conflict){let I=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:L();E=await s("worker-attempt-resume",{attempt_id:k,expected_revision:I})}E&&E.resumed===!1&&!E.conflict&&E.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${E.reason}`,"error",2400)}let m={onOpen:S,onResume:x};function N(){let k=i?i.get():null,L=k&&k.exec_defaults;return L&&typeof L=="object"?L:{}}let F=null;r&&r.subscribe&&(F=r.subscribe(()=>we()));let W=null;i&&typeof i.subscribe=="function"&&(W=i.subscribe(()=>{a&&B()}));function X(k){k.key==="Escape"&&a&&(k.preventDefault(),n())}document.addEventListener("keydown",X);function we(){if(a){if(r&&typeof r.snapshotFor=="function"){let k=r.snapshotFor("detail:"+a)||[];u=k.find(E=>E&&E.id===a)||k[0]||u}B()}}function se(k){Nt(k).then(L=>{L?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function re(k){k.preventDefault(),k.stopPropagation(),a&&se(a)}function tt(k,L){k.preventDefault(),k.stopPropagation(),se(L)}function He(k,L){k.preventDefault(),k.stopPropagation(),z.open(L)}function Se(k,L){f[k]=L,B(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:k,value:L})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ee(k,L,E){if(!s||!a)return!1;try{let I=await Promise.resolve(s(k,L)),c=Array.isArray(I)?I[0]:I;return c&&typeof c=="object"&&c.id?(u=c,!0):(Q(E,"error"),!1)}catch{return Q(E,"error"),!1}}function rt(k){setTimeout(()=>{try{let L=t.querySelector(k);L&&typeof L.focus=="function"&&L.focus()}catch{}},0)}function pe(){g=!0,y=u&&u.title||"",B(),rt('.detail-edit__input[data-edit="title"]')}function dt(k){y=k.target.value}function fe(){g=!1,y="",B()}function Be(){Ee("edit-text",{id:a,field:"title",value:y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(g=!1,y=""),B()})}function ae(){w=!0,$=u&&u.description||"",B(),rt('.detail-edit__textarea[data-edit="description"]')}function We(k){$=k.target.value}function ot(){w=!1,$="",B()}function Re(){Ee("edit-text",{id:a,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(w=!1,$=""),B()})}function Me(k,L,E,I){if(k.key==="Escape"){k.stopPropagation(),E();return}k.key==="Enter"&&(!I||k.ctrlKey||k.metaKey)&&(k.preventDefault(),L())}function ke(k){let L=k.target.value;Ee("update-status",{id:a,status:L},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>B())}function Ge(k){let L=Number(k.target.value);Ee("update-priority",{id:a,priority:L},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>B())}function nt(k){T=k.target.value}function Ne(){let k=T.trim();k.length!==0&&Ee("label-add",{id:a,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(L=>{L&&(T=""),B()})}function je(k){if(k.key==="Escape"){k.stopPropagation(),T="",B();return}k.key==="Enter"&&(k.preventDefault(),Ne())}function Pe(k){Ee("label-remove",{id:a,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>B())}let Qe={onCopyPath:tt,onOpenDoc:He},Ae={onChange:Se};function Le(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function Je(k){switch(k&&typeof k=="object"?String(k.dependency_type||k.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ue(k){let E=(Array.isArray(k.dependencies)?k.dependencies:[]).map(I=>({id:Le(I),icon:Je(I)})).filter(I=>I.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${E.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${E.map(I=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(I.id)}
                  >
                    ${I.icon?`${I.icon} `:""}${I.id}
                  </button>`:d`<span class="detail-dep"
                    >${I.icon?`${I.icon} `:""}${I.id}</span
                  >`)}
          </div>`}
    `}function he(k){let L=k.metadata||{},E=k.workflow||{},I=E.stages||{},c=I.spec&&I.spec.stale,_=I.impl&&I.impl.stale,v=E.route_source==="derived",ee=E.route||L.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${v?" detail-kv__v--derived":""}"
          title=${v?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${v&&E.route?`${ee} ? (\uCD94\uB860)`:ee}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${L.spec_review||"\uC5C6\uC74C"}${c?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${L.impl_review||"\uC5C6\uC74C"}${_?" \xB7 stale":""}</span
        >
      </div>
      ${L.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${L.pr_url}</span>
          </div>`:""}
    `}let ut={route:["spec_backed","full_plan"]};async function _e(k,L){let E=L.target.value;if(k==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&E!=="full_plan"&&!window.confirm(`full_plan \u2192 ${E||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){B();return}await Ee("update-workflow-meta",{id:a,key:k,value:E},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),B()}function Fe(k){let L=k.metadata||{};return d` ${((I,c)=>{let _=ut[I],v=typeof L[I]=="string"?L[I]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${I}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${I}
          data-edit=${`wfmeta-${I}`}
          @change=${ee=>_e(I,ee)}
        >
          <option value="" ?selected=${!_.includes(v)}>
            ${c}
          </option>
          ${_.map(ee=>d`<option value=${ee} ?selected=${v===ee}>${ee}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Ie(k){return g?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${y}
            @input=${dt}
            @keydown=${L=>Me(L,Be,fe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Be}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${fe}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${pe}
        >
          ✎
        </button>
      </div>
    `}function De(k){let L=$t(k.created_at),E=$t(k.updated_at);return!L&&!E?d``:d`
      ${L?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${L}</span>
          </div>`:""}
      ${E?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
    `}function R(k,L){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ke}
        >
          ${wl.map(E=>d`<option value=${E} ?selected=${E===k}>${E}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ge}
        >
          ${kl.map(E=>d`<option value=${String(E)} ?selected=${E===L}>
                P${E}
              </option>`)}
        </select>
      </div>
    `}function M(k){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${w?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ae}
            >
              ✎
            </button>`}
      </div>
      ${w?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${We}
              @keydown=${L=>Me(L,Re,ot,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Re}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ot}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function J(k){let L=Array.isArray(k.labels)?k.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${L.map(E=>d`<span class="detail-label-chip"
              >${E}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${E}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+E}
                @click=${()=>Pe(E)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${T}
            @input=${nt}
            @keydown=${je}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ne}
          >
            추가
          </button>
        </span>
      </div>
    `}function Z(){if(!a)return d``;let k=u||{},L=String(k.id||a),E=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",I=k.status||"open",c=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",_=k.description||"",v={...k,metadata:{...k.metadata||{},...f}};return d`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>n()}></div>
        <div class="detail-overlay__panel">
          <button
            type="button"
            class="detail-overlay__close"
            aria-label="닫기"
            @click=${()=>n()}
          >
            ✕
          </button>
          <button
            type="button"
            class="detail-overlay__id"
            title="ID 복사"
            @click=${re}
          >
            ${L}
          </button>
          ${Ie(E)} ${R(I,c)}
          ${De(k)} ${M(_)}
          ${J(k)} ${Ue(k)}
          ${he(k)} ${Fe(k)}
          ${Ys(k,Qe)}
          ${Vs(v,Ae,N())}
          ${Lo(A(),m)}
        </div>
      </div>
    `}function B(){de(Z(),t)}return{load(k){k!==a&&(f={},P()),a=k,u=null,we()},clear(){a=null,u=null,f={},P(),z.close(),O.close(),de(d``,t)},destroy(){F&&(F(),F=null),W&&(W(),W=null),document.removeEventListener("keydown",X),z.destroy(),q.parentNode&&q.parentNode.removeChild(q),O.destroy(),U.parentNode&&U.parentNode.removeChild(U),a=null,u=null,de(d``,t)}}}var yl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Do(t,e){return fn(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function vl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Oo(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(S){let x=r.get();if(x)try{let m=await n("display-policy-set",{expected_revision:x.revision,policy:S(x)});a(m),m&&m.conflict&&m.policy&&(m=await n("display-policy-set",{expected_revision:m.policy.revision,policy:S(m.policy)}),a(m)),m&&m.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function u(S){let x=r.get();if(!x)return;let m=Do(S,x)!=="shown";l(N=>vl(S,N,m))}function f(){let S=i.trim();S.length!==0&&(i="",l(x=>x.hidden_prefixes.includes(S)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,S]}),P())}function g(S){l(x=>({hidden_prefixes:x.hidden_prefixes.filter(m=>m!==S)}))}function w(S){let x=r.get();if(!x)return;let m=x.chips[S]===!1;l(()=>({chips:{[S]:m}}))}function y(S){let x=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${x.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${x.map(m=>{let N=Do(m,S);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${N}`}
                  data-label=${m}
                  data-state=${N}
                  @click=${()=>u(m)}
                >
                  ${m}
                </button>`})}
            </div>`}
      </section>
    `}function $(S){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(x=>d`<span class="display-settings__prefix">
                ${x}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${x} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>g(x)}
                >
                  ×
                </button>
              </span>`)}
        </div>
        <div class="display-settings__prefix-add">
          <input
            type="text"
            class="display-settings__prefix-input"
            aria-label="숨길 prefix"
            placeholder="예: reviewed:"
            .value=${i}
            @input=${x=>{i=String(x.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function T(S){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${yl.map(([x,m])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${x}
                  .checked=${S.chips[x]!==!1}
                  @change=${()=>w(x)}
                />
                <span>${m}</span>
              </label>`)}
        </div>
      </section>
    `}function P(){let S=r.get();de(d`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${A}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?d`${y(S)} ${$(S)}
                ${T(S)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let q=!1,z=()=>{q=!1};o.addEventListener("close",z),o.addEventListener("cancel",z);let U=null;r.subscribe&&(U=r.subscribe(()=>{q&&P()}));function O(){q||(i="",q=!0,P(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function A(){q&&(q=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:O,close:A,destroy(){q=!1,o.removeEventListener("close",z),o.removeEventListener("cancel",z),U&&(U(),U=null),o.remove()}}}function Mo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(u,f,g="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let w=typeof g=="string"?g.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function No(t,e,r){let n=xe("views:nav"),s=null;function o(a){return u=>{u.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let u=e.getState().view==="worker"?"worker":"board";return d`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${u==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${u==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
      </div>
    `}function l(){de(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),de(d``,t)}}}var Po=["bug","feature","task","epic","chore"];function Fo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var qo=["Critical","High","Medium","Low","Backlog"];function Bo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),g=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function y(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let S of Po){let x=document.createElement("option");x.value=S,x.textContent=Fo(S),o.appendChild(x)}i.replaceChildren();for(let S=0;S<=4;S+=1){let x=document.createElement("option");x.value=String(S);let m=qo[S]||"Medium";x.textContent=`${S} \u2013 ${m}`,i.appendChild(x)}}y();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function T(A){s.disabled=A,o.disabled=A,i.disabled=A,l.disabled=A,a.disabled=A,f.disabled=A,g.disabled=A,g.textContent=A?"Creating\u2026":"Create"}function P(){u.textContent=""}function q(A){u.textContent=A}function z(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?i.value=S:i.value="2"}catch{o.value="",i.value="2"}}function U(){let A=o.value||"",S=i.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function O(){P();let A=String(s.value||"").trim();if(A.length===0){q("Title is required"),s.focus();return}let S=Number(i.value||"2");if(!(S>=0&&S<=4)){q("Priority must be 0..4"),i.focus();return}let x=String(o.value||""),m=String(a.value||""),N={title:A};x.length>0&&(N.type=x),String(S).length>0&&(N.priority=S),m.length>0&&(N.description=m),T(!0);try{await e("create-issue",N)}catch{T(!1),q("Failed to create issue");return}U(),T(!1),$()}return r.addEventListener("cancel",A=>{A.preventDefault(),$()}),w.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),O())}),n.addEventListener("submit",A=>{A.preventDefault(),O()}),{open(){n.reset(),P(),z();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}function Uo(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function zo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var $l={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},xl=[{key:"orchestration_model",values:()=>bn},{key:"orchestration_effort",values:()=>wn},{key:"review_model",values:()=>kn},{key:"impl_model",values:()=>yn}];function Ho(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let m=i();return typeof m.revision=="number"?m.revision:0}function a(){let m=i().exec_defaults;return m&&typeof m=="object"?m:{}}function u(m){m&&m.queue&&r&&r.set(m.queue)}async function f(m,N){if(!n)return;let F={key:m,value:N||null};try{let W=await n("worker-queue-set-exec-default",{...F,expected_revision:l()});u(W),W&&W.conflict&&(W=await n("worker-queue-set-exec-default",{...F,expected_revision:l()}),u(W)),W&&W.conflict&&Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function g(m,N,F){let W=!!F&&!N.includes(F);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${m}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${m}`}
        data-key=${m}
        @change=${X=>{f(m,X.target.value)}}
      >
        <option value="" ?selected=${!F}>
          ${vn[m]||"(\uAE30\uBCF8)"}
        </option>
        ${W?d`<option value=${F} ?selected=${!0}>
              ${F} (비호환)
            </option>`:""}
        ${N.map(X=>d`<option value=${X} ?selected=${F===X}>${X}</option>`)}
      </select>
    </div>`}function w(){let m=i().workspace_info;return m&&typeof m=="object"?m:{}}function y(m,N){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${m}"
      >${N}</span
    >`}function $(m){let N=m?zo(m.cmd):"",F=m?Uo(m.timeout_ms):"",W=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${N?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${N}</span>
            ${y("config","config")}
            ${F?d`<span class="exec-defaults__vd-meta"
                  >timeout ${F}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${W}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function T(m){let N=m?zo(m.cmd):"",F=m?Uo(m.timeout_ms):"",W=F?`timeout ${F} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",X=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${N?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${N}</span>
            ${y("config","config")}
            ${m.detached===!0?y("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${W}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${X}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function P(m){if(!m||typeof m!="object")return"";let N=$l[String(m.outcome)];if(!N)return"";let F=m.outcome==="failed"&&m.reason?`${N.label} \xB7 ${m.reason}`:N.label,W=[$t(m.at),typeof m.bead_id=="string"?m.bead_id:"",typeof m.base_sha=="string"?m.base_sha.slice(0,7):""].filter(X=>X.length>0).join(" \xB7 ");return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${y(N.modifier,F)}
        ${W?d`<span class="exec-defaults__vd-meta">${W}</span>`:""}
      </div>
    </div>`}function q(m){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(m.verify_cmd)} ${T(m.deploy_cmd)}
      ${P(m.last_deploy)}
    </section>`}function z(){let m=a();de(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${x}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            <p class="exec-defaults__hint">
              워크스페이스 전역 기본값입니다. bead metadata가 우선하며, '(기본:
              …)'은 이 전역값도 미설정일 때 실제 적용되는 하드코딩·CLI·워크플로
              기본입니다.
            </p>
            ${xl.map(N=>g(N.key,N.values(),m[N.key]||""))}
            ${q(w())}
          </div>
        </div>
      `,o)}let U=!1,O=()=>{U=!1};o.addEventListener("close",O),o.addEventListener("cancel",O);let A=null;r&&r.subscribe&&(A=r.subscribe(()=>{U&&z()}));function S(){U||(U=!0,z(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function x(){U&&(U=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:S,close:x,destroy(){U=!1,o.removeEventListener("close",O),o.removeEventListener("cancel",O),A&&(A(),A=null),o.remove()}}}var Sl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Kt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function Al(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function Tl(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function Zt(t){if(!Al(t))return null;let e=Kt(t?.input_tokens)+Kt(t?.output_tokens);return`\u03C4 ${Tl(e)}`}function Yr(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Kt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Kt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Kt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Kt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=e.join(" \xB7 ");return t.replayed?`${r}
${Sl}`:r}function Wn(t,e){let r=null;for(let n of Object.values(t||{}))n&&n.bead_id===e&&(r=n.usage||null);return r}function Gn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Zt(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait",i=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",l=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=d`<span class="worker-mini__title">${t.title}</span>`,u=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",f=r.map(U=>U===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${U}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${U}</span
        >`),g=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",w=n?d`<span class="worker-usage" title=${Yr(t.usage)}
        >${n}</span
      >`:"",y=s?d`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",$=t.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${t.id}
        ?disabled=${t.merge_enabled===!1}
        title=${t.merge_title||""}
      >
        ${t.merge_label||"\uBA38\uC9C0"}
      </button>`:"",T=t.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${t.id}
        ?disabled=${t.cancel_enabled===!1}
        title=${t.cancel_title||""}
      >
        취소
      </button>`:"",P=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",q=t.revise_action?d`<button
          type="button"
          class="worker-mini__revise-fix"
          data-bead-id=${t.id}
          ?disabled=${t.revise_enabled===!1}
          title=${t.revise_title||"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        >
          finding 수용·수정
        </button>
        <button
          type="button"
          class="worker-mini__revise-approve"
          data-bead-id=${t.id}
          ?disabled=${t.revise_enabled===!1}
          title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
        >
          승인하고 진행
        </button>`:"",z=!!(n||s||t.merge_action||t.cancel_action||t.discard_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?d`<div class="worker-mini__head">
            ${i}${l}${u}${f}${g}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${z?d`<div class="worker-mini__foot">
                ${w}${y}
                <span class="worker-mini__actions"
                  >${$}${T}${P}</span
                >
              </div>`:""}`:d`${i}${l}${a}${u}${f}${g}${w}${y}${$}${T}${P}${q}`}
  </div>`}function El(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return d`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?d`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?d`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?Dr(r,t.status):""}
    <div
      class="worker-card__foot${t.reason?"":" worker-card__foot--actions-only"}"
    >
      ${t.reason?d`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >`:""}
      <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
           아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
           blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
           (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
      <button
        type="button"
        class="worker-card__place"
        data-bead-id=${t.id}
        ?disabled=${!e}
        title=${e?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
  </div>`}function St(t){let e=!!t.collapsible&&!!t.collapsed,r=d`<span
      class="worker-pane__dot worker-pane__dot--${t.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${t.title}</span>
    ${e&&t.preview?d`<span class="worker-pane__preview">${t.preview}</span>`:""}
    <span class="worker-pane__count">${t.items.length}</span>`;return d`<section
    class="worker-pane worker-pane--lane-${t.lane}${t.src?" worker-pane--src":""}${t.live?" worker-pane--live":""}${t.collapsible?" worker-pane--collapsible":""}${e?" worker-pane--collapsed":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    ${t.collapsible?d`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${t.lane}
          aria-expanded=${e?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${e?"\u25B8":"\u25BE"}</span
          >
        </button>`:d`<header class="worker-pane__hd">
          ${r}${t.header_control?t.header_control:""}
        </header>`}
    ${e?"":d`${t.controls?t.controls:""}
          <div class="worker-pane__body">
            ${t.body?t.body:t.items.length===0?d`<div class="worker-pane__empty">
                    ${t.empty||""}
                  </div>`:t.items.map(n=>t.lane==="candidate"?El(n):Gn(n))}
          </div>`}
  </section>`}var Wo=160;function Go(t){return t.length>Wo?`${t.slice(0,Wo)}\u2026`:t}function Cl(t){return!t||!t.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?d` · <code>${Go(t.command)}</code>`:""}
  </div>`}function Rl(t){return t?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function Ll(t){return t?d`<div class="worker-banner__log-path">
    전체 로그: <code>${t}</code>
  </div>`:""}function Il(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function jo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return d`<div class="worker-banners">
    ${t.failure?d`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${t.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${t.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Cl(t.failure.cause_detail)}
        </div>`:""}
    ${e.map(r=>d`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). bead는 resolved로 남아 있고 자동 재시도는
          하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?d`<div class="worker-banner__detail">
                <code>${Go(r.detail)}</code>
              </div>`:""}
          ${Ll(r.log_path)} ${Rl(r.output_tail)}
        </div>`)}
  </div>`}function Dl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?Il(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Zt(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return d`<div
    class="rtile${a?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${t.bead_id}</span>
      ${t.resumed_from?d`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__session"
        title="라이브 세션 열기"
        aria-label="라이브 세션 열기"
      >
        ▤ 세션
      </button>
      ${n?d`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:d`<button
            type="button"
            class="rtile__pause"
            ?disabled=${t.can_pause===!1}
            title=${t.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
            aria-label="일시정지"
          >
            ⏸
          </button>`}
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${t.title}</div>
    ${o||i||l?d`<div class="rtile__meta">
          ${l?d`<span class="worker-mini__badge">${l}</span>`:""}
          ${o?d`<span class="rtile__runner">${o}</span>`:""}
          ${i?d`<span class="worker-usage" title=${Yr(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function jn(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Dl(s,e,r))}
  </div>`}var Ol="tab:worker:ready",Ml="tab:worker:blocked",Vr=1;function Kn(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Vo="beads-ui.worker.candidate-filter",Yn={show_blocked:!1,spec:"all"};function Nl(){try{let t=window.localStorage.getItem(Vo);if(!t)return{...Yn};let e=JSON.parse(t);if(!e||typeof e!="object")return{...Yn};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Yn}}}function Pl(t){try{window.localStorage.setItem(Vo,JSON.stringify(t))}catch{}}function Fl(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),u=n(l);a&&u?s.push(l):!a&&u?o+=1:a&&!u&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var ql=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ko="bdui.worker.candidate_sort",Bl=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Kr="spec";function Ul(){try{let t=window.localStorage.getItem(Ko);return t==="board"||t==="created"||t==="spec"?t:Kr}catch{return Kr}}function zl(t){try{window.localStorage.setItem(Ko,t)}catch{}}var Hl="(max-width: 640px)",Zo="beads-ui.worker.lane-collapsed",kr={queue:!0,done:!0};function Wl(){try{let t=window.localStorage.getItem(Zo);if(!t)return{...kr};let e=JSON.parse(t);return!e||typeof e!="object"?{...kr}:{queue:typeof e.queue=="boolean"?e.queue:kr.queue,done:typeof e.done=="boolean"?e.done:kr.done}}catch{return{...kr}}}function Gl(t){try{window.localStorage.setItem(Zo,JSON.stringify(t))}catch{}}function Yo(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function jl(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Dt):(n.sort(Er(r)),e==="board"?n:[...n.filter(Kn),...n.filter(s=>!Kn(s))])}function Yl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Vl(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Kl=["closed_unmerged","undecidable"],Zl=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Xl(t,e){for(let r of Zl)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var Vn=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ql(t){if(typeof t!="string"||t.length===0)return null;let e=Vn.length,r=Vn.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:Vn[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function Jl(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"external_conflict_needs_session":return"\uC678\uBD80 PR \uCDA9\uB3CC \u2014 \uC138\uC158 \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function ec(t,e,r,n,s=null,o=null,i=null,l=!1,a=null){let u=!!a&&a.position>0,f=!!a&&a.active===!0,g=a&&a.failure||null,w=r[t]||null,y=w&&w.gate?w.gate:null,$=w&&w.pr?w.pr:null,T=[];l&&T.push("\uC138\uC158");let P=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,q=Xl(l&&y&&y.tier==="closed_unmerged"?"\uB2EB\uD798":y&&y.gate_badge||"",P?null:o&&o.activity||null);P&&T.push(P),q.label&&T.push(q.label),y&&y.base_badge&&y.base_badge!==y.gate_badge&&T.push(y.base_badge),n&&T.push("\uC815\uB9AC \uC2E4\uD328"),u&&!f&&T.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),g&&T.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Jl(g)}`);let z=!!y&&y.base_badge==="\uCDA9\uB3CC",U=!!y&&y.enabled===!0,O=Ql(o&&o.merge_progress?o.merge_progress.step:null),A=!!n&&!!y&&y.tier==="merged",S=l&&!!y&&y.tier==="merged",x=l&&z;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:$&&typeof $.number=="number"?$.number:null,pr_url:$&&typeof $.url=="string"?$.url:"",badges:T,live_badge:i==="running"?P:P?null:q.live?q.label:null,usage:s,alert:!!y&&Kl.includes(y.tier)||!!n||!!g,merge_action:!u,cancel_action:u,cancel_enabled:!f,cancel_title:f?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(y&&y.tier==="merged"),merge_step:O,discard_enabled:!O&&!i&&!u,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":u?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!O&&!i&&!x&&(U||z&&!l||A||S),merge_label:S?"\uC815\uB9AC":z&&!l&&!O&&!A?"\uCDA9\uB3CC \uD574\uC18C":void 0,merge_title:O?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${O.label}`:S?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":x?"\uC678\uBD80 PR \uCDA9\uB3CC \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694 (\uC5EC\uAE30\uC11C\uB294 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4)":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":A?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":z?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":U?`\uBA38\uC9C0 (${y.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:y&&y.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${y&&y.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Zn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,u=n?Rr(n,i):null,f=Lr({transport:r,uiOrderStore:i}),g=null,w=[],y=Nl(),$=Ul(),T=Wl(),P=!1,q=new Set,z=new Set,U=[],O=document.createElement("div");O.className="worker-console";let A=document.createElement("div");A.className="worker-top";let S=document.createElement("div");S.className="worker-drawer-overlay",S.hidden=!0;let x=document.createElement("div");x.className="worker-drawer-overlay__backdrop";let m=document.createElement("div");m.className="worker-drawer-host",S.append(x,m);let N=document.createElement("div");N.className="worker-lanes-host",O.append(A,S,N),t.appendChild(O);let F=null,W=Or(m,{transport:r,sessionLogStore:o,onClose:()=>{F=null,S.hidden=!0,he()}}),X=Ho(O,{queueStore:s,transport:r,getWorkspacePath:a});function we(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Vr,queue:[],pr_wait:[],done:[]}}function se(){let c=we();return typeof c.revision=="number"?c.revision:0}function re(c){c&&c.queue&&s&&s.set(c.queue)}function tt(){let c=we().queue;return Array.isArray(c)?c.length:0}async function He(c,_){if(!r)return;let v=await r("worker-queue-place",{bead_id:c,index:_,expected_revision:se()});re(v),v&&v.conflict&&await r("worker-queue-place",{bead_id:c,index:_,expected_revision:se()}).then(re)}async function Se(c,_){if(!r)return;let v=await r("worker-queue-reorder",{bead_id:c,to_index:_,expected_revision:se()});re(v),v&&v.conflict&&await r("worker-queue-reorder",{bead_id:c,to_index:_,expected_revision:se()}).then(re)}async function Ee(c){if(!r)return;let _=await r("worker-queue-remove",{bead_id:c,expected_revision:se()});re(_),_&&_.conflict&&await r("worker-queue-remove",{bead_id:c,expected_revision:se()}).then(re)}async function rt(c){!r||!c||await r("worker-attempt-stop",{attempt_id:c})}async function pe(c){if(!r||!c)return;let _=await r("worker-attempt-pause",{attempt_id:c});_&&_.paused===!1&&_.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function dt(c){if(!r||!c)return;let _=await r("worker-attempt-resume",{attempt_id:c,expected_revision:se()});re(_),_&&_.conflict&&(_=await r("worker-attempt-resume",{attempt_id:c,expected_revision:se()}),re(_)),_&&_.resumed===!1&&!_.conflict&&_.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function fe(c){if(!r||!c)return;let _=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:se()});re(_),_&&_.conflict&&(_=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:se()}),re(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Be(c,_){if(!r)return null;let v=r,ee=await v(c,{..._,expected_revision:se()});return re(ee),ee&&ee.conflict&&(ee=await v(c,{..._,expected_revision:se()}),re(ee)),ee}async function ae(c){if(!r||!c)return;q.add(c),he();let _;try{_=await Be("worker-merge-queue-add",{bead_id:c})}finally{q.delete(c),he()}!_||_.conflict||_.applied||Q("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function We(){if(!r)return;let c=await Be("worker-merge-queue-add-all",{});!c||c.conflict||Q(c.applied?`\uBA38\uC9C0 \uD050\uC5D0 ${c.queued}\uAC74 \uCD94\uAC00`:"\uBA38\uC9C0 \uAC00\uB2A5\uD55C \uD589\uC774 \uC5C6\uC2B5\uB2C8\uB2E4",c.applied?"success":"error",2400)}async function ot(c){if(!r||!c)return;let _=await Be("worker-merge-queue-remove",{bead_id:c});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&Q("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Re(){await Be("worker-merge-queue-remove",{all:!0})}async function Me(c){if(!r||!c||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${c}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let v=await r("worker-pr-discard",{bead_id:c,expected_revision:se()});if(re(v),v&&v.conflict&&(v=await r("worker-pr-discard",{bead_id:c,expected_revision:se()}),re(v)),v&&v.discarded===!0){Q("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}v&&v.discarded===!1&&!v.conflict&&Q(`\uD3D0\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",2800)}async function ke(c,_){if(!r||!_||z.has(_))return;z.add(_),he();let v;try{v=await r(c,{bead_id:_,expected_revision:se()}),re(v),v&&v.conflict&&(v=await r(c,{bead_id:_,expected_revision:se()}),re(v))}finally{z.delete(_),he()}if(!(!v||v.conflict)){if(v.ok){Q(c==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Q(`\uCC98\uBD84 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}}async function Ge(c){if(!r)return;let _=await r("worker-queue-toggle",{on:c,expected_revision:se()});re(_),_&&_.conflict&&await r("worker-queue-toggle",{on:c,expected_revision:se()}).then(re)}async function nt(c){if(!r||!Number.isFinite(c))return;let _=Math.max(Vr,Math.floor(c)),v=await r("worker-queue-set-slots",{slots:_,expected_revision:se()});re(v),v&&v.conflict&&await r("worker-queue-set-slots",{slots:_,expected_revision:se()}).then(re)}function Ne(){let c=we(),_=u?u.selectBoardColumn(Ol,"ready"):[],v=u?u.selectBoardColumn(Ml,"blocked"):[],ee=c.bead_titles||{},le=new Map;for(let[C,K]of Object.entries(ee))typeof K=="string"&&K.length>0&&le.set(C,K);for(let C of[..._,...v])le.set(C.id,C.title||C.id);let ye=c.pr_wait||[],ve=c.pr_observations||{},$e=c.pr_activity||{},ze=c.cleanup_failed||{},_t=Object.entries(ze).map(([C,K])=>({bead_id:C,step:K&&K.step?K.step:"",reason:K&&K.reason?K.reason:"",detail:K&&typeof K.detail=="string"?K.detail:null,output_tail:K&&typeof K.output_tail=="string"&&K.output_tail?K.output_tail:void 0,log_path:K&&typeof K.log_path=="string"&&K.log_path?K.log_path:void 0})),h=c.queue||[],b=new Set([...h.map(C=>C.bead_id),...ye.map(C=>C.bead_id),...c.done.map(C=>C.bead_id)]),Y=new Set(v.map(C=>C.id)),G=i?i.get()?.order||{}:{},te=new Set,V=[];for(let C of[..._,...v])b.has(C.id)||te.has(C.id)||Yl(C)||(te.add(C.id),V.push(C));w=jl(V,$,G);let be=c.admission||{},qt=C=>{let K=be[C];if(!K)return"";if(K.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof K.reason=="string"?K.reason:"",qe=oe.indexOf(":");return qe>0&&qe<oe.length-1?`\u26D4 ${oe.slice(0,qe)} (${oe.slice(qe+1)})`:`\u26D4 ${oe}`},it=w.map(C=>{let K=Kn(C),oe=Y.has(C.id),qe=[];oe&&qe.push(Vl(C)),K||qe.push("spec \uC5C6\uC74C");let ts=qt(C.id);return ts&&qe.push(ts),{id:C.id,title:C.title||C.id,reason:qe.join(" \xB7 "),draggable:K,lane:"candidate",workflow:C.workflow,status:C.status,blocked:oe,has_spec:K}}),pt=Fl(it,y),yr=pt.visible,vr=c.revise_parked||{},Bt=(C,K)=>C.map(oe=>{let qe=K==="queue"?vr[oe.bead_id]:null;return{id:oe.bead_id,title:le.get(oe.bead_id)||oe.bead_id,reason:K==="done"?"":qt(oe.bead_id),draggable:K!=="done",done:K==="done",lane:K,badges:qe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!qe,revise_action:!!qe,revise_enabled:!!qe&&!z.has(oe.bead_id),revise_title:qe?qe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${qe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:K==="done"?Wn(c.attempts||{},oe.bead_id):null}}),Tt=c.attempts?Object.values(c.attempts):[],st=new Set;for(let C of Tt)C&&typeof C.resumed_from=="string"&&C.resumed_from.length>0&&st.add(C.resumed_from);let Xt=new Map;for(let C of Tt)Xt.set(C.bead_id,C.attempt_id);let Qt=new Map;for(let C of Tt)Qt.set(C.attempt_id,C);function $r(C){let K=new Set,oe=C;for(;oe&&!K.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;K.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&Qt.get(oe.resumed_from)||null}return!1}let yt=[],at=null;for(let C of Tt){let K=C.status==="paused"&&!st.has(C.attempt_id);C.status==="running"||K?yt.push({bead_id:C.bead_id,attempt_id:C.attempt_id,title:le.get(C.bead_id)||C.bead_id,runner:C.runner||null,model:C.model||null,effort:C.effort||null,started_at:typeof C.started_at=="number"?C.started_at:null,resumed_from:C.resumed_from||null,paused:K,conflict_resolution:$r(C),can_pause:typeof C.session_id=="string"&&C.session_id.length>0,usage:C.usage||null}):(C.status==="failed"||C.status==="orphaned")&&!(Xt.get(C.bead_id)!==C.attempt_id)&&typeof C.dismissed_at!="number"&&(at=C)}let j=null;if(at){let C=typeof at.session_id=="string"&&at.session_id.length>0,K=st.has(at.attempt_id),oe=at.cause_detail;j={repo:at.repo||"",reason:at.cause||at.status,cause_detail:oe&&typeof oe.reason=="string"?{reason:oe.reason,command:typeof oe.command=="string"?oe.command:null}:null,resume_attempt_id:at.attempt_id,resume_eligible:C&&!K,resume_reason:C?K?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let p=new Set(yt.map(C=>C.bead_id)),D=Array.isArray(c.merge_queue)?c.merge_queue:[],H=new Map;D.forEach((C,K)=>{C&&typeof C.bead_id=="string"&&H.set(C.bead_id,K+1)});let ge=c.merge_queue_state||{active:null,failures:{}},Oe=ge.failures||{},me=new Map;for(let C of yt)C.conflict_resolution&&(C.paused?me.has(C.bead_id)||me.set(C.bead_id,"paused"):me.set(C.bead_id,"running"));let lt=yt.filter(C=>!C.paused).length,bt=(c.workspace_info||{}).slots,Ut=typeof bt=="number"?bt:typeof c.slots=="number"?c.slots:Vr,Ce=lt>Ut,Jt=Bt(c.done,"done"),er=0,es=0,Zr=!1;for(let C of Jt){let K=C.usage;K&&typeof K=="object"&&(Number.isFinite(K.input_tokens)&&(er+=K.input_tokens,Zr=!0),Number.isFinite(K.output_tokens)&&(es+=K.output_tokens,Zr=!0))}let ii=Zr?Zt({input_tokens:er,output_tokens:es}):null;return{queue:c,idToTitle:le,candidates:yr,candidate_hidden:{blocked:pt.hidden_blocked,spec:pt.hidden_spec},running:yt,live_count:lt,slots:Ut,over_cap:Ce,failure:j,waiting:Bt(h.filter(C=>!p.has(C.bead_id)),"queue"),pr_wait:ye.map(C=>ec(C.bead_id,le.get(C.bead_id)||C.bead_id,ve,ze[C.bead_id]||null,Wn(c.attempts||{},C.bead_id),$e[C.bead_id]||(q.has(C.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),me.get(C.bead_id)||null,C.external===!0,{position:H.get(C.bead_id)||0,active:ge.active===C.bead_id,failure:Oe[C.bead_id]||null})),merge_queue_length:D.length,merge_queue_running:D.length>0,done:Jt,token_total:ii,cleanup_failures:_t}}function je(c){let _=c.waiting.length>0?c.waiting[0].id:"\u2014",v=d`<button
      type="button"
      class="worker-play${c.queue.auto_advance?" is-active":""}"
    >
      ${c.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,ee=c.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",le=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${c.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${c.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >오늘 완료 <b>${c.done.length}</b></span
      >`,ye=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Vr}
          step="1"
          .value=${String(c.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,ve=jo({failure:c.failure,cleanupFailures:c.cleanup_failures});return P?d`<div class="worker-ribbon">
          ${v}
          <div class="worker-kpi worker-kpi--ribbon">${ee}${le}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ye}</div>
        </div>
        ${ve}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${v}${ye}</div>
        <div class="worker-kpi">
          ${ee}${le}
          ${c.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title="완료된 세션들의 토큰 합계 (입력+출력)"
                >${c.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${ve}`}function Pe(c){if(c.running.length===0&&c.pr_wait.length===0)return"";let _=c.running.some(v=>!v.paused);return d`<section
      class="worker-now${_?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${c.running.length+c.pr_wait.length}</span
        >
        ${Le(c)}
      </header>
      ${c.running.length>0?jn(c.running,Date.now(),F):""}
      ${c.pr_wait.map(v=>Gn(v))}
    </section>`}function Qe(c){let _=c.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${y.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ql.map(v=>d`<button
              type="button"
              class="worker-filter__chip${y.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${y.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${_.spec>0?d`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function Ae(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Bl.map(c=>d`<option value=${c.value} ?selected=${$===c.value}>
            ${c.label}
          </option>`)}
    </select>`}function Le(c){if(c.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop"
        title="대기 중인 항목을 모두 뺍니다 (진행 중인 항목은 끝까지 수행)"
      >
        일괄 머지 중단 ${c.merge_queue_length}
      </button>`;let _=c.pr_wait.filter(v=>v.merge_action&&v.merge_enabled).length;return _===0?"":d`<button
      type="button"
      class="worker-merge-all"
      title="머지 가능한 행을 모두 큐에 넣어 순서대로 머지합니다"
    >
      일괄 머지 ${_}
    </button>`}function Je(c){let _=St({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:c.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ae(),controls:Qe(c)});return P?d`<div class="worker-lanes worker-lanes--mobile">
        ${Pe(c)}
        ${St({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:T.queue,preview:Yo(c.waiting)})}
        ${_}
        ${St({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:c.done,empty:"\uC644\uB8CC \uC5C6\uC74C",collapsible:!0,collapsed:T.done,preview:c.token_total||Yo(c.done)})}
      </div>`:d`<div class="worker-lanes">
      ${_}
      ${St({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${St({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${c.slots}`,items:c.running,live:c.running.some(v=>!v.paused),body:jn(c.running,Date.now(),F)})}
      ${St({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:c.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Le(c)})}
      ${St({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${c.done.length}`,items:c.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Ue(c){T={...T,[c]:!T[c]},Gl(T),he()}function he(){let c=Ne();de(je(c),A),de(Je(c),N)}function ut(){let c=document.querySelector(".app-header");if(!c)return;let _=()=>{let v=Math.round(c.getBoundingClientRect().height);O.style.setProperty("--worker-ribbon-top",`${v}px`)};if(_(),typeof ResizeObserver=="function"){let v=new ResizeObserver(_);v.observe(c),U.push(()=>v.disconnect())}else window.addEventListener("resize",_),U.push(()=>window.removeEventListener("resize",_))}function _e(){if(typeof window.matchMedia!="function")return;let c=window.matchMedia(Hl);P=!!c.matches;let _=v=>{let ee=!!(v&&typeof v.matches=="boolean"?v.matches:c.matches);ee!==P&&(P=ee,he())};typeof c.addEventListener=="function"?(c.addEventListener("change",_),U.push(()=>c.removeEventListener("change",_))):typeof c.addListener=="function"&&(c.addListener(_),U.push(()=>c.removeListener(_)))}function Fe(c){let _=c.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!_)return;let v=_.dataset.beadId||"",ee=_.dataset.lane||"";g={bead_id:v,from_lane:ee};try{c.dataTransfer?.setData("text/plain",v),c.dataTransfer&&(c.dataTransfer.effectAllowed="move")}catch{}}function Ie(c){let _=c.target?.closest?.(".worker-pane");if(!_)return;let v=_.dataset.lane||"";v!=="candidate"&&v!=="queue"||(c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function De(c){c.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function R(c,_){let v=w.find(ve=>ve.id===c);if(!v)return;let ee=w.filter(ve=>ve.id!==c),le=ee.length;if(_){let ve=_.dataset.beadId;if(ve===c)return;let $e=ee.findIndex(ze=>ze.id===ve);$e>=0&&(le=$e)}let ye=ee.slice();ye.splice(le,0,v),f.applyReorder(c,ye,le)}function M(c){let _=c.target?.closest?.(".worker-pane");if(!_)return;c.preventDefault(),_.classList.remove("worker-pane--drag-over");let v=_.dataset.lane||"",ee=g?.bead_id||c.dataTransfer?.getData("text/plain")||"",le=g?.from_lane||"";if(g=null,!ee)return;let ye=c.target?.closest?.(".worker-mini, .worker-card"),ve=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),$e=ve.length;if(ye){let ze=ve.indexOf(ye);ze>=0&&($e=ze)}if(_.classList.contains("worker-pane--collapsed")&&($e=tt()),v==="candidate"){if(le==="candidate"){R(ee,ye);return}le==="queue"&&Ee(ee);return}v==="queue"&&(le==="queue"?Se(ee,$e):He(ee,$e))}function J(c){y=c,Pl(c),he()}function Z(c){$=c==="board"||c==="created"||c==="spec"?c:Kr,zl($),he()}function B(c){let _=c.target?.closest?.(".worker-filter__blocked");if(_){J({...y,show_blocked:_.checked});return}let v=c.target?.closest?.(".worker-sort");if(v){Z(v.value||Kr);return}let ee=c.target?.closest?.(".worker-slots__input");if(!ee)return;let le=Number.parseInt(ee.value,10);if(!Number.isFinite(le)){he();return}nt(le).then(he)}function k(c){return c?{runner:c.runner||void 0,model:c.model||void 0,effort:c.effort||void 0,worktree:c.worktree||void 0,status:c.status||void 0,session_id:c.session_id||void 0}:{}}function L(c){let _=we(),v=_.attempts?_.attempts[c]:null;F=c,S.hidden=!1,W.open({attempt_id:c,meta:k(v)}),he()}function E(){if(!F)return;let c=we(),_=c.attempts?c.attempts[F]:null;if(_){W.updateMeta(k(_));return}W.close()}function I(c){let _=c.target;if(_?.closest?.("#worker-exec-defaults-dialog"))return;if(_?.closest?.(".worker-exec-defaults-btn")){X.open();return}let v=_?.closest?.(".worker-banner__resume");if(v){let V=v.dataset.attemptId;V&&dt(V);return}let ee=_?.closest?.(".worker-banner__dismiss");if(ee){let V=ee.dataset.attemptId;V&&fe(V);return}if(_?.closest?.(".worker-play")){Ge(!we().auto_advance);return}let le=_?.closest?.(".worker-merge-all");if(le){le.classList.contains("worker-merge-all--stop")?Re():We();return}let ye=_?.closest?.(".worker-pane__hd--toggle");if(ye){let V=ye.dataset.lane;(V==="queue"||V==="done")&&Ue(V);return}let ve=_?.closest?.(".worker-card__place");if(ve){let V=ve.dataset.beadId;V&&!ve.disabled&&He(V,tt());return}let $e=_?.closest?.(".worker-filter__chip");if($e){let V=$e.dataset.spec;(V==="all"||V==="with"||V==="without")&&J({...y,spec:V});return}let ze=_?.closest?.(".worker-mini__merge");if(ze){ae(ze.dataset.beadId||"");return}let _t=_?.closest?.(".worker-mini__merge-cancel");if(_t){ot(_t.dataset.beadId||"");return}let h=_?.closest?.(".worker-mini__discard");if(h){Me(h.dataset.beadId||"");return}let b=_?.closest?.(".worker-mini__revise-fix");if(b){ke("worker-revise-fix",b.dataset.beadId||"");return}let Y=_?.closest?.(".worker-mini__revise-approve");if(Y){ke("worker-revise-approve",Y.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__stop")){let be=_?.closest?.(".rtile")?.dataset?.attemptId;be&&rt(be);return}if(_?.closest?.(".rtile__pause")){let be=_?.closest?.(".rtile")?.dataset?.attemptId;be&&pe(be);return}if(_?.closest?.(".rtile__resume")){let be=_?.closest?.(".rtile")?.dataset?.attemptId;be&&dt(be);return}if(_?.closest?.(".rtile__session")){let be=_?.closest?.(".rtile")?.dataset?.attemptId;be&&L(be);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){W.close();return}if(_?.closest?.(".worker-drawer-host"))return;let G=_?.closest?.(".rtile");if(G){if(_?.closest?.(".rtile__id")){let be=G.dataset.beadId;be&&Nt(be).then(qt=>{qt?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let V=G.dataset.beadId;V&&l&&l(V);return}let te=_?.closest?.(".worker-mini, .worker-card");if(te){let V=te.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){V&&Nt(V).then(be=>{be?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}V&&l&&l(V)}}return t.addEventListener("dragstart",Fe),t.addEventListener("dragover",Ie),t.addEventListener("dragleave",De),t.addEventListener("drop",M),t.addEventListener("click",I),t.addEventListener("change",B),_e(),ut(),u&&U.push(u.subscribe(he)),s&&U.push(s.subscribe(()=>{he(),E()})),he(),{load(){he()},destroy(){for(let c of U.splice(0))try{c()}catch{}t.removeEventListener("dragstart",Fe),t.removeEventListener("dragover",Ie),t.removeEventListener("dragleave",De),t.removeEventListener("drop",M),t.removeEventListener("click",I),t.removeEventListener("change",B);try{W.destroy()}catch{}S.hidden=!0;try{X.destroy()}catch{}de(d``,t)}}}function Xn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Xo(t,e,r,n=async()=>{},s=async()=>{}){let o=xe("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function f(S){let m=S.target.value,F=e.getState().workspace?.current?.path||"";if(m&&m!==F){o("switching workspace to %s",m),l=!0,A();try{await r(m)}catch(W){o("workspace switch failed: %o",W)}finally{l=!1,A()}}}async function g(){let S=e.getState(),x=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!x||a)){o("git-pulling workspace %s",x),a=!0,A();try{await n(x)}catch(m){o("workspace git pull failed: %o",m)}finally{a=!1,A()}}}function w(S){let x=S.target;x&&t.contains(x)||T()}function y(S){S.key==="Escape"&&T()}function $(){u||(u=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",y),A())}function T(){u&&(u=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",y),A())}function P(){u?T():$()}async function q(S){let x=S.target,m=x.value,N=x.checked;o("toggling visibility %s \u2192 %s",m,String(N));try{await s(m,N)}catch(F){o("workspace visibility toggle failed: %o",F)}}function z(S){return S?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function U(S,x){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${P}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?d`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(m=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${m.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${m.path}"
                        .checked=${!x.has(m.path)}
                        @change=${q}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Xn(m.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function O(){let S=e.getState(),x=S.workspace?.current,m=S.workspace?.available||[],N=new Set(S.workspace?.hidden||[]),F=x?.path||m[0]?.path||"";if(m.length===0)return d``;let W=m.filter(X=>!N.has(X.path)||X.path===F);if(W.length<=1){let X=W[0]||m[0],we=Xn(X.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${X.path}"
            >${we}</span
          >
          ${U(m,N)}
          ${z(F)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${W.map(X=>d`
              <option
                value="${X.path}"
                ?selected=${X.path===F}
                title="${X.path}"
              >
                ${Xn(X.path)}
              </option>
            `)}
        </select>
        ${U(m,N)}
        ${z(F)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){de(O(),t)}return A(),i=e.subscribe(()=>A()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",y),de(d``,t)}}}var Qo=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Qn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Jo(t,e,r=Qn()){return{id:r,type:t,payload:e}}function ei(t={}){let e=xe("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,u=new Map,f=[],g=new Map,w=new Set;function y(O){for(let A of Array.from(w))try{A(O)}catch{}}function $(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),y(o);let O=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),A=(r.jitterRatio||0)*O,S=Math.max(0,Math.round(O+(Math.random()*2-1)*A));e("ws retry in %d ms (attempt %d)",S,i+1),l=setTimeout(()=>{l=null,U()},S)}function T(O){try{s?.send(JSON.stringify(O))}catch(A){e("ws send failed",A)}}function P(){for(o="open",e("ws open"),y(o),i=0;f.length;){let O=f.shift();O&&T(O)}}function q(O){let A;try{A=JSON.parse(String(O.data))}catch{e("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){e("ws received invalid envelope");return}if(u.has(A.id)){let x=u.get(A.id);u.delete(A.id),A.ok?x?.resolve(A.payload):x?.reject(A.error||new Error("ws error"));return}let S=g.get(A.type);if(S&&S.size>0)for(let x of Array.from(S))try{x(A.payload)}catch(m){e("ws event handler error",m)}else e("ws received unhandled message type: %s",A.type)}function z(){o="closed",e("ws closed"),y(o);for(let[O,A]of u.entries())A.reject(new Error("ws disconnected")),u.delete(O);i+=1,$()}function U(){if(!a)return;let O=n();try{s=new WebSocket(O),e("ws connecting %s",O),o="connecting",y(o),s.addEventListener("open",P),s.addEventListener("message",q),s.addEventListener("error",()=>{}),s.addEventListener("close",z)}catch(A){e("ws connect failed %o",A),$()}}return U(),{send(O,A){if(!Qo.includes(O))return Promise.reject(new Error(`unknown message type: ${O}`));let S=Qn(),x=Jo(O,A,S);return e("send %s id=%s",O,S),new Promise((m,N)=>{u.set(S,{resolve:m,reject:N,type:O}),s&&s.readyState===s.OPEN?T(x):(e("queue %s id=%s (state=%s)",O,S,o),f.push(x))})},on(O,A){g.has(O)||g.set(O,new Set);let S=g.get(O);return S?.add(A),()=>{S?.delete(A)}},onConnection(O){return w.add(O),()=>{w.delete(O)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,U()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function tc(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function rc(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var Jn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ti=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],ri="worker:queue",ni="ui:order",si="ui:display-policy",At="tab:board:closed",oi="beads-ui.board.closed-range";function nc(t){let e=xe("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;de(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let m=function(h,b){let Y="Request failed",G="";if(h&&typeof h=="object"){let V=h;if(typeof V.message=="string"&&V.message.length>0&&(Y=V.message),typeof V.details=="string")G=V.details;else if(V.details&&typeof V.details=="object")try{G=JSON.stringify(V.details,null,2)}catch{G=""}}else typeof h=="string"&&h.length>0&&(Y=h);let te=b&&b.length>0?`Failed to load ${b}`:"Request failed";x.open(te,Y,G)},ae=function(h){return`${I.getState().workspace.current?.path||""}\0${h}`},We=function(){He&&(He().catch(()=>{}),He=null),Se=null,Ee=null},Re=function(h){rt=h;let b=()=>{rt!==h||I.getState().selected_id!==h||(rt=null,ot(h))};if(!fe){dt.then(b);return}b()},nt=function(){let h=fs(Ge);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},Ne=function(h){if(h)for(let[b,Y]of Jn){if(Me.has(b)||ke.has(b))continue;let G=b===At?nt():{type:Y};try{X.register(b,G)}catch(te){e("register %s store failed: %o",b,te)}ke.add(b),W.subscribeList(b,G).then(te=>{Me.set(b,te)}).catch(te=>{e("subscribe %s failed: %o",b,te),m(te,"board")}).finally(()=>{ke.delete(b)})}else Pe()},Pe=function(){for(let[h]of Jn){let b=Me.get(h);b&&(b().catch(()=>{}),Me.delete(h));try{X.unregister(h)}catch(Y){e("unregister %s failed: %o",h,Y)}}},Le=function(h){if(!h){Je();return}for(let[b,Y]of ti)if(!(Qe.has(b)||ke.has(b))){try{X.register(b,{type:Y})}catch(G){e("register %s store failed: %o",b,G)}ke.add(b),W.subscribeList(b,{type:Y}).then(G=>{Qe.set(b,G)}).catch(G=>{e("subscribe %s failed: %o",b,G),m(G,"worker")}).finally(()=>{ke.delete(b)})}Ae||(F("subscribe-worker-queue",{id:ri}).catch(b=>{e("subscribe-worker-queue failed: %o",b)}),Ae=()=>F("unsubscribe-worker-queue",{id:ri}))},Je=function(){for(let[h]of ti){let b=Qe.get(h);b&&(b().catch(()=>{}),Qe.delete(h));try{X.unregister(h)}catch(Y){e("unregister %s failed: %o",h,Y)}}Ae&&(Ae().catch(()=>{}),Ae=null)},he=function(){Ue||(F("subscribe-ui-order",{id:ni}).catch(h=>{e("subscribe-ui-order failed: %o",h)}),Ue=()=>F("unsubscribe-ui-order",{id:ni}))},ut=function(){Ue&&(Ue().catch(()=>{}),Ue=null),se.clear()},Fe=function(){_e||(F("subscribe-display-policy",{id:si}).catch(h=>{e("subscribe-display-policy failed: %o",h)}),_e=()=>F("unsubscribe-display-policy",{id:si}))},Ie=function(){_e&&(_e().catch(()=>{}),_e=null),re.clear()},B=function(h){if(!h)return"Unknown";let b=h.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var l=m,a=ae,u=We,f=Re,g=nt,w=Ne,y=Pe,$=Le,T=Je,P=he,q=ut,z=Fe,U=Ie,O=B;let A=document.getElementById("header-loading"),S=Ns(A),x=Mo(t),N=ei(),F=S.wrapSend((h,b)=>N.send(h,b)),W=Cs(F),X=Rs(),we=Is(),se=Ls(),re=hs(),tt=gs();N.on("ui-order-snapshot",h=>{let b=h;if(b&&typeof b.revision=="number")try{se.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),N.on("display-policy-snapshot",h=>{let b=h;if(b&&b.policy&&typeof b.policy=="object")try{re.set(b.policy)}catch{}}),N.on("session-log-snapshot",h=>{let b=h;if(b&&typeof b.attempt_id=="string")try{tt.set(b.attempt_id,Array.isArray(b.lines)?b.lines:[])}catch{}}),N.on("session-log-append",h=>{let b=h;if(b&&typeof b.attempt_id=="string")try{tt.append(b.attempt_id,b.event)}catch{}}),N.on("snapshot",h=>{let b=h,Y=b&&typeof b.id=="string"?b.id:"",G=Y?X.getStore(Y):null;if(G&&b&&b.type==="snapshot")try{G.applyPush(b)}catch{}}),N.on("upsert",h=>{let b=h,Y=b&&typeof b.id=="string"?b.id:"",G=Y?X.getStore(Y):null;if(G&&b&&b.type==="upsert")try{G.applyPush(b)}catch{}}),N.on("delete",h=>{let b=h,Y=b&&typeof b.id=="string"?b.id:"",G=Y?X.getStore(Y):null;if(G&&b&&b.type==="delete")try{G.applyPush(b)}catch{}});let He=null,Se=null,Ee=null,rt=null,pe=()=>{},dt=new Promise(h=>{pe=()=>h(void 0)}),fe=!1,Be=!1;async function ot(h){let b=ae(h);if(b===Se||b===Ee)return;Ee=b;let Y=`detail:${h}`,G={type:"issue-detail",params:{id:h}};try{X.register(Y,G)}catch(te){e("register detail store failed: %o",te)}try{let te=await W.subscribeList(Y,G);if(I.getState().selected_id!==h||ae(h)!==b){await te().catch(()=>{});return}He&&await He().catch(()=>{}),He=te,Se=b}catch(te){e("detail subscribe failed: %o",te),m(te,"issue details")}finally{Ee===b&&(Ee=null)}}let Me=new Map,ke=new Set,Ge=Sr;try{let h=window.localStorage.getItem(oi);ln(h)&&(Ge=h)}catch{}async function je(h){if(!ln(h)||h===Ge)return;Ge=h;try{window.localStorage.setItem(oi,h)}catch{}let b=Me.get(At);if(!b)return;Me.delete(At),await b().catch(()=>{});let Y=nt();try{X.register(At,Y)}catch(G){e("register %s store failed: %o",At,G)}try{let G=await W.subscribeList(At,Y);Me.set(At,G)}catch(G){e("re-subscribe %s failed: %o",At,G),m(G,"board")}}let Qe=new Map,Ae=null,Ue=null,_e=null;async function De(){_e=null,re.clear(),Ae=null;let h=I.getState().workspace.current?.path;if(h)try{await N.send("set-workspace",{path:h})}catch(b){e("workspace restore after reconnect failed: %o",b);return}Fe(),Le(I.getState().view==="worker")}async function R(){e("clearing all subscriptions for workspace switch"),Pe(),Je(),we.clear(),ut(),he(),Ie(),Fe(),We();let h=I.getState();if(h.selected_id)try{X.unregister(`detail:${h.selected_id}`)}catch{}let b=I.getState();Ne(b.view==="board"),Le(b.view==="worker"),b.selected_id&&Re(b.selected_id)}async function M(h){e("requesting workspace switch to %s",h),Be=!0;try{let b=await N.send("set-workspace",{path:h});e("workspace switch result: %o",b),b&&b.workspace&&(I.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",h),b.changed&&(await R(),Q("Switched to "+B(h),"success",2e3)))}catch(b){throw e("workspace switch failed: %o",b),Q("Failed to switch workspace","error",3e3),b}finally{Be=!1}}async function J(h){e("requesting workspace git pull for %s",h);try{let b=await N.send("git-pull-workspace",{});e("workspace git pull result: %o",b);let Y=b?.status;if(Y==="up_to_date"){Q("Already up to date","success",2e3);return}if(Y==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+B(h),"success",2e3)}catch(b){e("workspace git pull failed: %o",b);let Y=b?.code,G=b?.message;if(Y==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Y==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Y==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let te=G?`: ${G}`:"";throw Q(`Git pull failed${te}`,"error",3e3),b}}async function Z(h,b){e("setting workspace visibility %s \u2192 %s",h,String(b));try{await N.send("set-workspace-visibility",{path:h,visible:b}),await k()}catch(Y){e("workspace visibility update failed: %o",Y),Q("Failed to update project visibility","error",3e3)}}async function k(){try{let h=await N.send("list-workspaces",{});if(e("workspaces loaded: %o",h),h&&Array.isArray(h.workspaces)){let b=h.workspaces.map(V=>({path:V.path,database:V.database,pid:V.pid,version:V.version})),Y=h.current?{path:h.current.root_dir,database:h.current.db_path}:null,G=Array.isArray(h.hidden)?h.hidden.filter(V=>typeof V=="string"):[];I.setState({workspace:{current:Y,available:b,hidden:G}});let te=window.localStorage.getItem("beads-ui.workspace");te&&(!b.some(be=>be.path===te)||G.includes(te)?window.localStorage.removeItem("beads-ui.workspace"):Y&&te!==Y.path&&(e("restoring saved workspace preference: %s",te),await M(te)))}}catch(h){e("failed to load workspaces: %o",h)}}N.on("workspace-changed",h=>{e("workspace-changed event: %o",h),h&&h.root_dir&&(I.setState({workspace:{current:{path:h.root_dir,database:h.db_path}}}),k(),R())});let L=!1;if(typeof N.onConnection=="function"){let h=b=>{e("ws state %s",b),b==="reconnecting"||b==="closed"?(L=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&L&&(L=!1,Q("Reconnected","success",2200),rc(I,(Y,G)=>{e(`${Y}: %o`,G)}),De())};N.onConnection(h)}let E="board";try{let h=window.localStorage.getItem("beads-ui.view");(h==="board"||h==="worker")&&(E=h)}catch(h){e("view parse error: %o",h)}let I=Ms({config:tc(),view:E});N.on("worker-queue-snapshot",h=>{let b=h;if(!b||!b.queue)return;let Y=I.getState().workspace.current?.path;if(typeof Y=="string"&&Y.length>0&&b.root_dir!==Y){e("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{we.set(b.queue)}catch{}});let c=Ds(I);c.start();let _=async(h,b)=>{try{return await F(h,b)}catch{return[]}};n&&No(n,I,c);let v=document.getElementById("workspace-picker");v&&Xo(v,I,M,J,Z);let ee=Bo(t,(h,b)=>F(h,b));try{let h=document.getElementById("new-issue-btn");h&&h.addEventListener("click",()=>ee.open())}catch{}let le=Oo(t,{policyStore:re,transport:(h,b)=>F(h,b),labelOptions:()=>{let h=new Set;for(let[b]of Jn)for(let Y of X.snapshotFor(b)||[]){let G=Y.labels;if(Array.isArray(G))for(let te of G)typeof te=="string"&&te.length>0&&h.add(te)}return Array.from(h).sort()}});try{let h=document.getElementById("display-settings-btn");h&&h.addEventListener("click",()=>le.open())}catch{}let ye=Hs(s,{gotoIssue:h=>c.gotoIssue(h),issueStores:X,transport:_,uiOrderStore:se,displayPolicyStore:re,closedRange:Ge,onClosedRangeChange:h=>{je(h)},onNewIssue:()=>ee.open()}),ve=Zn(o,{transport:_,issueStores:X,queueStore:we,sessionLogStore:tt,uiOrderStore:se,gotoIssue:h=>I.setState({selected_id:h}),getWorkspacePath:()=>I.getState().workspace.current?.path}),$e=Io(i,{issueStores:X,transport:_,queueStore:we,sessionLogStore:tt,getWorkspacePath:()=>I.getState().workspace.current?.path,onNavigate:h=>{I.getState().view==="worker"?I.setState({selected_id:h}):c.gotoIssue(h)},onClose:()=>{let h=I.getState();I.setState({selected_id:null});try{c.gotoView(h.view==="worker"?"worker":"board")}catch{}}}),ze=I.getState().selected_id;ze&&(i.hidden=!1,$e.load(ze),Re(ze)),I.subscribe(h=>{let b=h.selected_id;b?(i.hidden=!1,$e.load(b),Be||Re(b)):($e.clear(),i.hidden=!0,We())});let _t=h=>{s.hidden=h.view!=="board",o.hidden=h.view!=="worker",Ne(h.view==="board"),Le(h.view==="worker"),!h.selected_id&&h.view==="board"&&ye.load(),h.view==="worker"&&ve.load(),window.localStorage.setItem("beads-ui.view",h.view)};I.subscribe(_t),_t(I.getState()),he(),Fe(),k().finally(()=>{fe=!0,pe()}),window.addEventListener("keydown",h=>{let b=h.ctrlKey||h.metaKey,Y=String(h.key||"").toLowerCase(),G=h.target,te=G&&G.tagName?String(G.tagName).toLowerCase():"",V=te==="input"||te==="textarea"||te==="select"||G&&typeof G.isContentEditable=="boolean"&&G.isContentEditable;b&&Y==="n"&&(V||(h.preventDefault(),ee.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&nc(e)});export{nc as bootstrap,tc as readBootstrapConfig,rc as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
