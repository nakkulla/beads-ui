var ai=Object.create;var Xr=Object.defineProperty;var li=Object.getOwnPropertyDescriptor;var ci=Object.getOwnPropertyNames;var di=Object.getPrototypeOf,ui=Object.prototype.hasOwnProperty;var pi=(t,e,r)=>e in t?Xr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Qr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var fi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ci(e))!ui.call(t,s)&&s!==r&&Xr(t,s,{get:()=>e[s],enumerable:!(n=li(e,s))||n.enumerable});return t};var hi=(t,e,r)=>(r=t!=null?ai(di(t)):{},fi(e||!t||!t.__esModule?Xr(r,"default",{value:t,enumerable:!0}):r,t));var ue=(t,e,r)=>pi(t,typeof e!="symbol"?e+"":e,r);var _s=Qr((uc,ms)=>{var Wt=1e3,Gt=Wt*60,jt=Gt*60,It=jt*24,wi=It*7,ki=It*365.25;ms.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return yi(t);if(r==="number"&&isFinite(t))return e.long?$i(t):vi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function yi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*ki;case"weeks":case"week":case"w":return r*wi;case"days":case"day":case"d":return r*It;case"hours":case"hour":case"hrs":case"hr":case"h":return r*jt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Gt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Wt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function vi(t){var e=Math.abs(t);return e>=It?Math.round(t/It)+"d":e>=jt?Math.round(t/jt)+"h":e>=Gt?Math.round(t/Gt)+"m":e>=Wt?Math.round(t/Wt)+"s":t+"ms"}function $i(t){var e=Math.abs(t);return e>=It?Ar(t,e,It,"day"):e>=jt?Ar(t,e,jt,"hour"):e>=Gt?Ar(t,e,Gt,"minute"):e>=Wt?Ar(t,e,Wt,"second"):t+" ms"}function Ar(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var ws=Qr((pc,bs)=>{function xi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=c,r.humanize=_s(),r.destroy=u,Object.keys(t).forEach(f=>{r[f]=t[f]}),r.names=[],r.skips=[],r.formatters={};function e(f){let m=0;for(let w=0;w<f.length;w++)m=(m<<5)-m+f.charCodeAt(w),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=e;function r(f){let m,w=null,y,$;function E(...N){if(!E.enabled)return;let F=E,B=Number(new Date),q=B-(m||B);F.diff=q,F.prev=m,F.curr=B,m=B,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let D=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(A,S)=>{if(A==="%%")return"%";D++;let _=r.formatters[S];if(typeof _=="function"){let M=N[D];A=_.call(F,M),N.splice(D,1),D--}return A}),r.formatArgs.call(F,N),(F.log||r.log).apply(F,N)}return E.namespace=f,E.useColors=r.useColors(),E.color=r.selectColor(f),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:(y!==r.namespaces&&(y=r.namespaces,$=r.enabled(f)),$),set:N=>{w=N}}),typeof r.init=="function"&&r.init(E),E}function n(f,m){let w=r(this.namespace+(typeof m>"u"?":":m)+f);return w.log=this.log,w}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let m=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of m)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(f,m){let w=0,y=0,$=-1,E=0;for(;w<f.length;)if(y<m.length&&(m[y]===f[w]||m[y]==="*"))m[y]==="*"?($=y,E=w,y++):(w++,y++);else if($!==-1)y=$+1,E++,w=E;else return!1;for(;y<m.length&&m[y]==="*";)y++;return y===m.length}function i(){let f=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),f}function c(f){for(let m of r.skips)if(o(f,m))return!1;for(let m of r.names)if(o(f,m))return!0;return!1}function a(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}bs.exports=xi});var ks=Qr((et,Tr)=>{et.formatArgs=Ai;et.save=Ti;et.load=Ei;et.useColors=Si;et.storage=Ci();et.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();et.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Si(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Ai(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Tr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}et.log=console.debug||console.log||(()=>{});function Ti(t){try{t?et.storage.setItem("debug",t):et.storage.removeItem("debug")}catch{}}function Ei(){let t;try{t=et.storage.getItem("debug")||et.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Ci(){try{return localStorage}catch{}}Tr.exports=ws()(et);var{formatters:Ri}=Tr.exports;Ri.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var rr=globalThis,xr=rr.trustedTypes,rs=xr?xr.createPolicy("lit-html",{createHTML:t=>t}):void 0,ls="$lit$",vt=`lit$${Math.random().toFixed(9).slice(2)}$`,cs="?"+vt,gi=`<${cs}>`,Rt=document,nr=()=>Rt.createComment(""),sr=t=>t===null||typeof t!="object"&&typeof t!="function",on=Array.isArray,mi=t=>on(t)||typeof t?.[Symbol.iterator]=="function",Jr=`[ 	
\f\r]`,tr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ns=/-->/g,ss=/>/g,Et=RegExp(`>|${Jr}(?:([^\\s"'>=/]+)(${Jr}*=${Jr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),os=/'/g,is=/"/g,ds=/^(?:script|style|textarea|title)$/i,an=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=an(1),oc=an(2),ic=an(3),Lt=Symbol.for("lit-noChange"),Te=Symbol.for("lit-nothing"),as=new WeakMap,Ct=Rt.createTreeWalker(Rt,129);function us(t,e){if(!on(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return rs!==void 0?rs.createHTML(e):e}var _i=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=tr;for(let c=0;c<r;c++){let a=t[c],u,f,m=-1,w=0;for(;w<a.length&&(i.lastIndex=w,f=i.exec(a),f!==null);)w=i.lastIndex,i===tr?f[1]==="!--"?i=ns:f[1]!==void 0?i=ss:f[2]!==void 0?(ds.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=Et):f[3]!==void 0&&(i=Et):i===Et?f[0]===">"?(i=s??tr,m=-1):f[1]===void 0?m=-2:(m=i.lastIndex-f[2].length,u=f[1],i=f[3]===void 0?Et:f[3]==='"'?is:os):i===is||i===os?i=Et:i===ns||i===ss?i=tr:(i=Et,s=void 0);let y=i===Et&&t[c+1].startsWith("/>")?" ":"";o+=i===tr?a+gi:m>=0?(n.push(u),a.slice(0,m)+ls+a.slice(m)+vt+y):a+vt+(m===-2?c:y)}return[us(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},or=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,c=e.length-1,a=this.parts,[u,f]=_i(e,r);if(this.el=t.createElement(u,n),Ct.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=Ct.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(ls)){let w=f[i++],y=s.getAttribute(m).split(vt),$=/([.?@])?(.*)/.exec(w);a.push({type:1,index:o,name:$[2],strings:y,ctor:$[1]==="."?tn:$[1]==="?"?rn:$[1]==="@"?nn:Ht}),s.removeAttribute(m)}else m.startsWith(vt)&&(a.push({type:6,index:o}),s.removeAttribute(m));if(ds.test(s.tagName)){let m=s.textContent.split(vt),w=m.length-1;if(w>0){s.textContent=xr?xr.emptyScript:"";for(let y=0;y<w;y++)s.append(m[y],nr()),Ct.nextNode(),a.push({type:2,index:++o});s.append(m[w],nr())}}}else if(s.nodeType===8)if(s.data===cs)a.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(vt,m+1))!==-1;)a.push({type:7,index:o}),m+=vt.length-1}o++}}static createElement(e,r){let n=Rt.createElement("template");return n.innerHTML=e,n}};function zt(t,e,r=t,n){if(e===Lt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=sr(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=zt(t,s._$AS(t,e.values),s,n)),e}var en=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??Rt).importNode(r,!0);Ct.currentNode=s;let o=Ct.nextNode(),i=0,c=0,a=n[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new ir(o,o.nextSibling,this,e):a.type===1?u=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(u=new sn(o,this,e)),this._$AV.push(u),a=n[++c]}i!==a?.index&&(o=Ct.nextNode(),i++)}return Ct.currentNode=Rt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},ir=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Te,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=zt(this,e,r),sr(e)?e===Te||e==null||e===""?(this._$AH!==Te&&this._$AR(),this._$AH=Te):e!==this._$AH&&e!==Lt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):mi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Te&&sr(this._$AH)?this._$AA.nextSibling.data=e:this.T(Rt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=or.createElement(us(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new en(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=as.get(e.strings);return r===void 0&&as.set(e.strings,r=new or(e)),r}k(e){on(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(nr()),this.O(nr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ht=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Te,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Te}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=zt(this,e,r,0),i=!sr(e)||e!==this._$AH&&e!==Lt,i&&(this._$AH=e);else{let c=e,a,u;for(e=o[0],a=0;a<o.length-1;a++)u=zt(this,c[n+a],r,a),u===Lt&&(u=this._$AH[a]),i||(i=!sr(u)||u!==this._$AH[a]),u===Te?e=Te:e!==Te&&(e+=(u??"")+o[a+1]),this._$AH[a]=u}i&&!s&&this.j(e)}j(e){e===Te?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},tn=class extends Ht{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Te?void 0:e}},rn=class extends Ht{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Te)}},nn=class extends Ht{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=zt(this,e,r,0)??Te)===Lt)return;let n=this._$AH,s=e===Te&&n!==Te||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Te&&(n===Te||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},sn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){zt(this,e)}};var bi=rr.litHtmlPolyfillSupport;bi?.(or,ir),(rr.litHtmlVersions??(rr.litHtmlVersions=[])).push("3.3.1");var de=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new ir(e.insertBefore(nr(),o),o,void 0,r??{})}return s._$AI(t),s};var Sr="today",ps=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function ln(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function fs(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function hs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function gs(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ys=hi(ks(),1);function xe(t){return(0,ys.default)(`beads-ui:${t}`)}function ft(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Dt(t,e){let r=ft(t.created_at),n=ft(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,c=e.id;return i<c?-1:i>c?1:0}function xs(t,e){let r=ft(t.created_at),n=ft(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,c=e.id;return i<c?-1:i>c?1:0}function Ss(t,e){let r=ft(t.updated_at),n=ft(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function As(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=ft(t.created_at),o=ft(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,c=e.id;return i<c?-1:i>c?1:0}function Ts(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var Li=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function vs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function $s(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=Li.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Es(t,e){let r=vs(t),n=vs(e);if(r!==n)return r<n?-1:1;let s=$s(t),o=$s(e);if(s!==o)return s<o?-1:1;let i=ft(t&&t.created_at),c=ft(e&&e.created_at);if(i!==c)return i<c?-1:1;let a=t&&t.id,u=e&&e.id;return a===u?0:String(a)<String(u)?-1:1}var cn=2**20;function Yt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-ft(t&&t.created_at)}function Er(t){return(e,r)=>{let n=Yt(e,t),s=Yt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function dn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!i&&!c)return{rank:0};if(!i)return{rank:Yt(c,r)-cn};if(!c)return{rank:Yt(i,r)+cn};let a=Yt(i,r),u=Yt(c,r),f=(a+u)/2;return a<f&&f<u?{rank:f}:{renormalize:n.map((m,w)=>({bead_id:m.id,rank:w*cn}))}}function un(t,e={}){let r=xe(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,c=!1,a=e.sort||Dt;function u(){for(let w of Array.from(i))try{w()}catch{}}function f(){s=Array.from(n.values()).sort(a)}function m(w){if(c||!w||w.id!==t)return;let y=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,y),!(y<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if(y<=o)return;n.clear();let $=Array.isArray(w.issues)?w.issues:[];for(let E of $)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);f(),o=y,u();return}if(w.type==="upsert"){let $=w.issue;if($&&typeof $.id=="string"&&$.id.length>0){let E=n.get($.id);if(!E)n.set($.id,$);else{let N=Number.isFinite(E.updated_at)?E.updated_at:0,F=Number.isFinite($.updated_at)?$.updated_at:0;if(N<=F){for(let B of Object.keys(E))B in $||delete E[B];for(let[B,q]of Object.entries($))E[B]=q}}f()}o=y,u()}else if(w.type==="delete"){let $=String(w.issue_id||"");$&&(n.delete($),f()),o=y,u()}}}return{id:t,subscribe(w){return i.add(w),()=>{i.delete(w)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){c=!0,n.clear(),s=[],i.clear(),o=0}}}function Cr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Cs(t){let e=xe("subs"),r=new Map,n=new Map;function s(c,a){e("applyDelta %s +%d ~%d -%d",c,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=n.get(c);if(!u||u.size===0)return;let f=Array.isArray(a.added)?a.added:[],m=Array.isArray(a.updated)?a.updated:[],w=Array.isArray(a.removed)?a.removed:[];for(let y of Array.from(u)){let $=r.get(y);if(!$)continue;let E=$.itemsById;for(let N of f)typeof N=="string"&&N.length>0&&E.set(N,!0);for(let N of m)typeof N=="string"&&N.length>0&&E.set(N,!0);for(let N of w)typeof N=="string"&&N.length>0&&E.delete(N)}}async function o(c,a){let u=Cr(a);if(e("subscribe %s key=%s",c,u),!r.has(c))r.set(c,{key:u,itemsById:new Map});else{let m=r.get(c);if(m&&m.key!==u){let w=n.get(m.key);w&&(w.delete(c),w.size===0&&n.delete(m.key)),r.set(c,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(c);try{await t("subscribe-list",{id:c,type:a.type,params:a.params})}catch(m){let w=r.get(c)||null;if(w){let y=n.get(w.key);y&&(y.delete(c),y.size===0&&n.delete(w.key))}throw r.delete(c),m}return async()=>{e("unsubscribe %s key=%s",c,u);try{await t("unsubscribe-list",{id:c})}catch{}let m=r.get(c)||null;if(m){let w=n.get(m.key);w&&(w.delete(c),w.size===0&&n.delete(m.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Cr,selectors:{getIds(c){let a=r.get(c);return a?Array.from(a.itemsById.keys()):[]},has(c,a){let u=r.get(c);return u?u.itemsById.has(a):!1},count(c){let a=r.get(c);return a?a.itemsById.size:0},getItemsById(c){let a=r.get(c),u={};if(!a)return u;for(let f of a.itemsById.keys())u[f]=!0;return u}}}}function Rs(){let t=xe("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,u,f){let m=u?Cr(u):"",w=r.get(a)||"",y=e.has(a);if(t("register %s key=%s (prev=%s)",a,m,w),y&&w&&m&&w!==m){let $=e.get(a);if($)try{$.dispose()}catch{}let E=s.get(a);if(E){try{E()}catch{}s.delete(a)}let N=un(a,f);e.set(a,N);let F=N.subscribe(()=>o());s.set(a,F)}else if(!y){let $=un(a,f);e.set(a,$);let E=$.subscribe(()=>o());s.set(a,E)}return r.set(a,m),()=>c(a)}function c(a){t("unregister %s",a),r.delete(a);let u=e.get(a);u&&(u.dispose(),e.delete(a));let f=s.get(a);if(f){try{f()}catch{}s.delete(a)}}return{register:i,unregister:c,getStore(a){return e.get(a)||null},snapshotFor(a){let u=e.get(a);return u?u.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Ls(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Is(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function pn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function Ii(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Di(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Ds(t){let e=xe("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Ii(n),i=Di(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=pn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?pn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Oi=Object.freeze({workspace_config:{default_workspace:null}});function Os(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Oi.workspace_config.default_workspace}}}function Ms(t={}){let e=xe("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:Os(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Os(o.config):r.config},c=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!c&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ns(t){let e=xe("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let u=r>0;t.toggleAttribute("hidden",!u),t.setAttribute("aria-busy",u?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function c(){let u=r;r=Math.max(0,r-1),u<=0?e("done called but count was already %d",u):e("done count=%d\u2192%d",u,r),o()}function a(u){return async(m,w)=>{let y=s++,$=Date.now();n.set(y,{type:m,start_ts:$}),e("request start id=%d type=%s count=%d",y,m,r+1),i();let E=!1,N=()=>{E||(E=!0,n.delete(y),c())},F=setTimeout(()=>{E||(e("request TIMEOUT id=%d type=%s elapsed=%dms",y,m,Date.now()-$),N())},3e4);try{let B=await u(m,w),q=Date.now()-$;return e("request done id=%d type=%s elapsed=%dms",y,m,q),B}catch(B){let q=Date.now()-$;throw e("request error id=%d type=%s elapsed=%dms err=%o",y,m,q,B),B}finally{clearTimeout(F),N()}}}return o(),{wrapSend:a,start:i,done:c,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,m])=>({id:f,type:m.type,elapsed_ms:u-m.start_ts}))}}}function Q(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Rr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,c){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Ts),a;switch(c){case"created_desc":return a.sort(Dt),a;case"created_asc":return a.sort(xs),a;case"updated_desc":return a.sort(Ss),a;case"priority":return a.sort(As),a;case"manual":default:{let u=r();return u?a.sort(Er(u)):a.sort(Dt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let c of i)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Lr(t){let e=t.transport,r=t.uiOrderStore;function n(i,c){return"renormalize"in i?i.renormalize:[{bead_id:c,rank:i.rank}]}function s(i,c){let a={...i.order};for(let u of c)a[u.bead_id]=u.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,c,a){if(!e||!r)return;let u=r.get()||{revision:0,order:{}},f=n(dn(c,a,u.order),i);s(u,f);let m=await e("ui-order-set",{expected_revision:u.revision,entries:f});if(m&&m.conflict){let w={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(w);let y=n(dn(c,a,w.order),i);s(w,y);let $=await e("ui-order-set",{expected_revision:w.revision,entries:y});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Ir(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function fn(t,e){return!e||typeof t!="string"||t.length===0||Ir(e.visible_labels).includes(t)?!0:Ir(e.hidden_labels).includes(t)?!1:!Ir(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Ps(t,e){return Ir(t).filter(r=>fn(r,e))}function Ot(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function hn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function $t(t){let e=hn(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function gn(t,e){let r=hn(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let a=Math.floor(c/7);if(c<30)return`${a}\uC8FC \uC804`;let u=Math.floor(c/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}var Mi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Ni={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Pi={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Fi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function qi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function Bi(t,e,r){let n=Mi[t]||t,s=e&&e.state||"empty",o=Fi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let c=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${c}>
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
            ${o.map((i,c)=>d`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${Wi(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
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
  `}var Xi=200,Qi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ji=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Us="beads-ui.board.sort",zs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ea(){try{let t=window.localStorage.getItem(Us);if(t&&zs.has(t))return t}catch{}return"created_desc"}function Hs(t,e){let r=xe("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,c=e.displayPolicyStore,a=e.onClosedRangeChange,u=e.onNewIssue,f=e.closedRange||Sr,m=s?Rr(s,i):null,w=Lr({transport:o,uiOrderStore:i}),y=[],$=[],E=[],N=[],F=[],B=[],q=!1,D=0,T=ea(),A=new Map,S=new Map,_=new Map,M=new Set,P={search:"",priority:"",type:"",labels:[]},z=!1,X=null;function we(R){return String(R.status||"open")==="open"}function oe(R){let O=String(R.status||"open");return O==="open"||O==="blocked"}function ne(R){let O=P.search.trim().toLowerCase(),J=P.priority,K=P.type,V=P.labels;return R.filter(Z=>{if(O){let k=String(Z.id||"").toLowerCase(),L=String(Z.title||"").toLowerCase();if(!k.includes(O)&&!L.includes(O))return!1}if(J!==""&&String(Z.priority)!==J||K!==""&&String(Z.issue_type||"")!==K)return!1;if(V.length>0){let k=Array.isArray(Z.labels)?Z.labels:[];if(!V.some(L=>k.includes(L)))return!1}return!0})}function tt(){let R=new Set;for(let O of[y,$,E,N,F,B])for(let J of O){let K=Array.isArray(J.labels)?J.labels:[];for(let V of K)typeof V=="string"&&V.length>0&&R.add(V)}return Array.from(R).sort()}function He(){return P.search.trim()!==""||P.priority!==""||P.type!==""||P.labels.length>0}function Se(){try{if(m){let R=m.selectBoardColumn("tab:board:in-progress","in_progress",T),O=m.selectBoardColumn("tab:board:blocked","blocked",T).filter(oe),J=new Set(R.map(v=>v.id)),K=m.selectBoardColumn("tab:board:ready","ready",T).filter(v=>we(v)&&!J.has(v.id)),V=m.selectBoardColumn("tab:board:resolved","resolved",T),Z=m.selectBoardColumn("tab:board:deferred","deferred",T),k=q?Z:[],L=m.selectBoardColumn("tab:board:closed","closed").slice(0,Xi),x=[...O,...K,...R,...V,...k,...L];Ee(x);let l=new Set;for(let v of x)v&&v.id&&!mn(v)&&l.add(v.id);let g=!He();y=g?Vt(O,l):O,$=g?Vt(K,l):K,E=g?Vt(R,l):R,N=g?Vt(V,l):V,F=g?Vt(k,l):k,D=Z.length,B=g?Vt(L,l):L,A=new Map;for(let v of y)A.set(v.id,"open");for(let v of $)A.set(v.id,"open");for(let v of E)A.set(v.id,"in_progress");for(let v of N)A.set(v.id,"resolved");for(let v of F)A.set(v.id,"deferred");for(let v of B)A.set(v.id,"closed");S=new Map;for(let v of y)S.set(v.id,"blocked-col");for(let v of $)S.set(v.id,"ready-col");for(let v of E)S.set(v.id,"in-progress-col");for(let v of N)S.set(v.id,"resolved-col");for(let v of F)S.set(v.id,"deferred-col");for(let v of B)S.set(v.id,"closed-col")}Ae()}catch{y=[],$=[],E=[],N=[],F=[],B=[],_=new Map,Ae()}}function Ee(R){let O=new Map;for(let K of R)K&&K.id&&!O.has(K.id)&&O.set(K.id,K);let J=new Map;for(let K of O.values()){let V=mn(K);if(!V)continue;let Z=J.get(V);Z||(Z=[],J.set(V,Z)),Z.push({id:K.id,title:K.title,status:K.status,metadata:K.metadata,created_at:K.created_at})}_=J}function rt(R){let O=_.get(R)||[],J=0,K=null;for(let V of O)(V.status==="resolved"||V.status==="closed")&&(J+=1),!K&&V.status==="in_progress"&&(K=V);return{total:O.length,count:J,current:K,children:O}}function pe(R){return!M.has(R)}function dt(R,O){R.preventDefault(),R.stopPropagation(),M.has(O)?M.delete(O):M.add(O),Ae()}function fe(R,O){R.preventDefault(),R.stopPropagation(),n(O)}function Be(R,O){R.preventDefault(),R.stopPropagation(),n(O)}function le(R,O){X||n(O)}function We(R,O){R.preventDefault(),R.stopPropagation(),ta(O).then(J=>{J&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function ot(R,O){X=O,R.dataTransfer&&(R.dataTransfer.setData("text/plain",O),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function Re(R){R.target.classList.remove("board-card--dragging"),ut(),setTimeout(()=>{X=null},0)}function Me(R){let O=String(R.target.value||"");!O||O===f||(f=O,a&&a(O),Ae())}let ke={onCardClick:le,onCopyId:We,onDragStart:ot,onDragEnd:Re,onClosedRangeChange:Me,rollupFor:rt,isExpanded:pe,onRollupToggle:dt,onChildClick:fe,onFromChipClick:Be,get policy(){return c?c.get():null}};function Ge(R){let O=R.target,J=t.querySelector(".board-filter__labels");O&&J&&J.contains(O)||je()}function nt(R){R.key==="Escape"&&je()}function Ne(){z||(z=!0,document.addEventListener("mousedown",Ge),document.addEventListener("keydown",nt),Ae())}function je(){z&&(z=!1,document.removeEventListener("mousedown",Ge),document.removeEventListener("keydown",nt),Ae())}let Pe={onSearchInput(R){P.search=String(R.target.value||""),Se()},onPriorityChange(R){P.priority=String(R.target.value||""),Se()},onTypeChange(R){P.type=String(R.target.value||""),Se()},onSortChange(R){let O=String(R.target.value||"");if(!(!zs.has(O)||O===T)){T=O;try{window.localStorage.setItem(Us,O)}catch{}Se()}},onDeferredToggle(){q=!q,Se()},onLabelMenuToggle(){z?je():Ne()},onLabelToggle(R){let O=P.labels.indexOf(R);O===-1?P.labels.push(R):P.labels.splice(O,1),Se()},onLabelClear(){P.labels.length!==0&&(P.labels=[],Se())},onNewIssue(){u&&u()}};function Qe(){let R=q?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${Bs(P,Pe,{sort_mode:T,show_deferred:q,deferred_count:D,label_options:tt(),label_menu_open:z})}
        <div class=${R}>
          ${Mt({title:"Blocked",id:"blocked-col",items:ne(y)},ke)}
          ${Mt({title:"Ready",id:"ready-col",items:ne($)},ke)}
          ${Mt({title:"In progress",id:"in-progress-col",items:ne(E)},ke)}
          ${Mt({title:"Resolved",id:"resolved-col",items:ne(N)},ke)}
          ${q?Mt({title:"Deferred",id:"deferred-col",items:ne(F)},ke):""}
          ${Mt({title:"Closed",id:"closed-col",items:ne(B),is_closed:!0,closed_range:f},ke)}
        </div>
      </div>
    `}function Ae(){de(Qe(),t),Le()}function Le(){try{let R=Array.from(t.querySelectorAll(".board-column"));for(let O of R)Array.from(O.querySelectorAll(".board-card")).forEach((K,V)=>{K.tabIndex=V===0?0:-1})}catch{}}async function Je(R,O){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:R,status:O}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(J){r("update-status failed: %o",J),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ue(R){switch(R){case"blocked-col":return y;case"ready-col":return $;case"in-progress-col":return E;case"resolved-col":return N;case"deferred-col":return F;default:return[]}}function he(R,O,J){if(!o||!i)return;let K=Ue(R),V=K.find(l=>l.id===O);if(!V)return;let Z=K.filter(l=>l.id!==O),k=J.closest?J.closest(".board-card"):null,L=Z.length;if(k){let l=k.getAttribute("data-issue-id");if(l===O)return;let g=Z.findIndex(v=>v.id===l);g>=0&&(L=g)}let x=Z.slice();x.splice(L,0,V),w.applyReorder(O,x,L)}function ut(){for(let R of Array.from(t.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let _e=null;t.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let J=R.target.closest(".board-column");J&&J!==_e&&(_e&&_e.classList.remove("board-column--drag-over"),J.classList.add("board-column--drag-over"),_e=J)}),t.addEventListener("dragleave",R=>{let O=R.relatedTarget;(!O||!t.contains(O))&&_e&&(_e.classList.remove("board-column--drag-over"),_e=null)}),t.addEventListener("drop",R=>{R.preventDefault(),_e&&(_e.classList.remove("board-column--drag-over"),_e=null);let O=R.target,J=O.closest(".board-column");if(!J)return;let K=R.dataTransfer?.getData("text/plain")||"";if(!K)return;let V=J.id,Z=S.get(K);if(Z&&Z===V){if(Ji.has(V)){if(T!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}he(V,K,O)}return}let k=Qi[V];if(!k){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}A.get(K)!==k&&Je(K,k)}),t.addEventListener("keydown",R=>{let O=R.target;if(!(O instanceof HTMLElement))return;let J=String(O.tagName||"").toLowerCase();if(J==="input"||J==="textarea"||J==="select"||J==="button"||J==="a"||O.isContentEditable===!0)return;let K=O.closest(".board-card");if(!K)return;let V=String(R.key||"");if(V==="Enter"||V===" "){R.preventDefault();let x=K.getAttribute("data-issue-id");x&&n(x);return}if(V!=="ArrowUp"&&V!=="ArrowDown"&&V!=="ArrowLeft"&&V!=="ArrowRight")return;R.preventDefault();let Z=K.closest(".board-column");if(!Z)return;let k=Array.from(Z.querySelectorAll(".board-card")),L=k.indexOf(K);if(V==="ArrowDown"&&L<k.length-1){Fe(K,k[L+1]);return}if(V==="ArrowUp"&&L>0){Fe(K,k[L-1]);return}if(V==="ArrowLeft"||V==="ArrowRight"){let x=Array.from(t.querySelectorAll(".board-column")),l=x.indexOf(Z),g=V==="ArrowRight"?1:-1,v=l+g;for(;v>=0&&v<x.length;){let ee=x[v].querySelector(".board-card");if(ee){Fe(K,ee);return}v+=g}}});function Fe(R,O){try{R.tabIndex=-1,O.tabIndex=0,O.focus()}catch{}}let Ie=null;m&&m.subscribe&&(Ie=m.subscribe(()=>{try{Se()}catch{}}));let De=null;return c&&c.subscribe&&(De=c.subscribe(()=>{try{Se()}catch{}})),{async load(){r("load"),Se()},clear(){je(),Ie&&(Ie(),Ie=null),De&&(De(),De=null),t.replaceChildren(),y=[],$=[],E=[],N=[],F=[],B=[],A=new Map,S=new Map}}}function mn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Vt(t,e){return t.filter(r=>{let n=mn(r);return!(n&&e.has(n))})}async function ta(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Nt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var ra={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},na=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,sa=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function xt(t){return!!t&&typeof t=="object"}function _n(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function Ws(t,e){let r=_n(t),n=_n(e),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let a=s.get(c)||0;a>0?s.set(c,a-1):o+=1}let i=0;for(let c of s.values())i+=c;return{added:o,removed:i}}function oa(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>xt(s)&&typeof s.text=="string"?s.text:"").join(""):xt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function ia(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:ra[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=_n(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ws(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let c of i){let a=Ws(xt(c)?c.old_string:"",xt(c)?c.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Gs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=na.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:sa.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function aa(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(xt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Gs(o.text));else if(o.type==="tool_use"){let i=ia(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(xt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=oa(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function la(t){if(t.type==="item.completed"&&xt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Gs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function ca(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function js(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!xt(o))continue;let i=ca(o)?la(o):aa(o,r);for(let c of i)e.push(c)}return e}function Or(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},c=!0,a=new Set,u=null;function f(){if(!o||!n)return[];let S=n.get(o);return js(S?S.lines:[])}function m(S,_){if(_.kind==="gate")return d`<div class="sv__gate">${_.text}</div>`;if(_.kind==="phase")return d`<div class="sv__phase">${_.text}</div>`;if(_.kind==="result")return d`<div
        class="sv__result${_.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${_.success?"\u2713":"\u2717"}
        ${_.text||(_.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(_.kind==="error")return d`<div class="sv__error">⛔ ${_.text}</div>`;if(_.kind==="blocker")return d`<div class="sv__error">⛔ ${_.text}</div>`;if(_.kind==="tool"){let M=a.has(S),P=_.tool==="Bash"?_.command:_.path||_.command||"";return d`<div
        class="sv__tool${M?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>N(S)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${_.icon}</span>
          <span class="sv__tool-name">${_.tool}</span>
          ${P?d`<span class="sv__tool-detail">${P}</span>`:""}
          ${typeof _.added=="number"?d`<span class="sv__diff-add">+${_.added}</span>`:""}
          ${typeof _.removed=="number"?d`<span class="sv__diff-del">−${_.removed}</span>`:""}
          ${_.result?d`<span class="sv__tool-ok">→ ${_.result}</span>`:""}
        </span>
        ${M?d`<pre class="sv__tool-expand">${w(_)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${_.text}</div>`}function w(S){let _=[];if(S.input!==void 0)try{_.push(`input: ${JSON.stringify(S.input,null,2)}`)}catch{}return typeof S.output=="string"&&S.output.length>0&&_.push(`output:
${S.output}`),_.join(`

`)}function y(){if(!o)return d``;let S=f(),_=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),M=i.session_id||"",P=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${M?d`<button
              type="button"
              class="sv__session"
              title=${M}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${M}`}
              @click=${()=>B(M)}
            >
              ⧉ ${M.slice(0,8)}
            </button>`:""}
        ${_?d`<span class="sv__meta">${_}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${P}
          @click=${F}
        >
          <span class="sv__follow-full">⇣ ${P}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>A()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${S.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:S.map((z,X)=>m(X,z))}
      </div>
    </div>`}function $(){de(y(),t),c&&E()}function E(){let S=t.querySelector(".sv__body");S&&(S.scrollTop=S.scrollHeight)}function N(S){a.has(S)?a.delete(S):a.add(S),$()}function F(){c=!c,$()}function B(S){Nt(S).then(_=>{_?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function q(S){!o||!S||(i={...i,...S},$())}function D(S){let _=S.target;if(!_||!_.classList||!_.classList.contains("sv__body"))return;!(_.scrollHeight-_.scrollTop-_.clientHeight<=4)&&c&&(c=!1,$())}t.addEventListener("scroll",D,!0);function T(S){let _=S&&S.attempt_id;_&&(o=_,i=S.meta||{},c=!0,a.clear(),!u&&n&&(u=n.subscribe($)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),$())}function A(){let S=o;o=null,a.clear(),r&&S&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${S}`})).catch(()=>{}),de(d``,t),s&&s()}return{open:T,updateMeta:q,close:A,isOpen(){return o!==null},destroy(){u&&(u(),u=null),t.removeEventListener("scroll",D,!0),o=null,de(d``,t)}}}function da(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ys(t,e){let r=da(t);return d`
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
  `}var{entries:no,setPrototypeOf:Ks,isFrozen:pa,getPrototypeOf:fa,getOwnPropertyDescriptor:ha}=Object,{freeze:Ke,seal:ct,create:Cn}=Object,{apply:Rn,construct:Ln}=typeof Reflect<"u"&&Reflect;Ke||(Ke=function(e){return e});ct||(ct=function(e){return e});Rn||(Rn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Ln||(Ln=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Nr=Ze(Array.prototype.forEach),ga=Ze(Array.prototype.lastIndexOf),Zs=Ze(Array.prototype.pop),cr=Ze(Array.prototype.push),ma=Ze(Array.prototype.splice),Fr=Ze(String.prototype.toLowerCase),$n=Ze(String.prototype.toString),xn=Ze(String.prototype.match),dr=Ze(String.prototype.replace),_a=Ze(String.prototype.indexOf),ba=Ze(String.prototype.trim),ht=Ze(Object.prototype.hasOwnProperty),Ve=Ze(RegExp.prototype.test),ur=wa(TypeError);function Ze(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Rn(t,e,n)}}function wa(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Ln(t,r)}}function se(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Fr;Ks&&Ks(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(pa(e)||(e[n]=o),s=o)}t[s]=!0}return t}function ka(t){for(let e=0;e<t.length;e++)ht(t,e)||(t[e]=null);return t}function wt(t){let e=Cn(null);for(let[r,n]of no(t))ht(t,r)&&(Array.isArray(n)?e[r]=ka(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=wt(n):e[r]=n);return e}function pr(t,e){for(;t!==null;){let n=ha(t,e);if(n){if(n.get)return Ze(n.get);if(typeof n.value=="function")return Ze(n.value)}t=fa(t)}function r(){return null}return r}var Xs=Ke(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Sn=Ke(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),An=Ke(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ya=Ke(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Tn=Ke(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),va=Ke(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Qs=Ke(["#text"]),Js=Ke(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),En=Ke(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),eo=Ke(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Pr=Ke(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),$a=ct(/\{\{[\w\W]*|[\w\W]*\}\}/gm),xa=ct(/<%[\w\W]*|[\w\W]*%>/gm),Sa=ct(/\$\{[\w\W]*/gm),Aa=ct(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ta=ct(/^aria-[\-\w]+$/),so=ct(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ea=ct(/^(?:\w+script|data):/i),Ca=ct(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),oo=ct(/^html$/i),Ra=ct(/^[a-z][.\w]*(-[.\w]+)+$/i),to=Object.freeze({__proto__:null,ARIA_ATTR:Ta,ATTR_WHITESPACE:Ca,CUSTOM_ELEMENT:Ra,DATA_ATTR:Aa,DOCTYPE_NAME:oo,ERB_EXPR:xa,IS_ALLOWED_URI:so,IS_SCRIPT_OR_DATA:Ea,MUSTACHE_EXPR:$a,TMPLIT_EXPR:Sa}),fr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},La=function(){return typeof window>"u"?null:window},Ia=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ro=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function io(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:La(),e=W=>io(W);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==fr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:c,Element:a,NodeFilter:u,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:m,DOMParser:w,trustedTypes:y}=t,$=a.prototype,E=pr($,"cloneNode"),N=pr($,"remove"),F=pr($,"nextSibling"),B=pr($,"childNodes"),q=pr($,"parentNode");if(typeof i=="function"){let W=r.createElement("template");W.content&&W.content.ownerDocument&&(r=W.content.ownerDocument)}let D,T="",{implementation:A,createNodeIterator:S,createDocumentFragment:_,getElementsByTagName:M}=r,{importNode:P}=n,z=ro();e.isSupported=typeof no=="function"&&typeof q=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:X,ERB_EXPR:we,TMPLIT_EXPR:oe,DATA_ATTR:ne,ARIA_ATTR:tt,IS_SCRIPT_OR_DATA:He,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:Ee}=to,{IS_ALLOWED_URI:rt}=to,pe=null,dt=se({},[...Xs,...Sn,...An,...Tn,...Qs]),fe=null,Be=se({},[...Js,...En,...eo,...Pr]),le=Object.seal(Cn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),We=null,ot=null,Re=Object.seal(Cn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Me=!0,ke=!0,Ge=!1,nt=!0,Ne=!1,je=!0,Pe=!1,Qe=!1,Ae=!1,Le=!1,Je=!1,Ue=!1,he=!0,ut=!1,_e="user-content-",Fe=!0,Ie=!1,De={},R=null,O=se({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),J=null,K=se({},["audio","video","img","source","image","track"]),V=null,Z=se({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),k="http://www.w3.org/1998/Math/MathML",L="http://www.w3.org/2000/svg",x="http://www.w3.org/1999/xhtml",l=x,g=!1,v=null,ee=se({},[k,L,x],$n),re=se({},["mi","mo","mn","ms","mtext"]),ye=se({},["annotation-xml"]),ve=se({},["title","style","font","a","script"]),$e=null,ze=["application/xhtml+xml","text/html"],_t="text/html",h=null,b=null,G=r.createElement("form"),H=function(p){return p instanceof RegExp||p instanceof Function},te=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(b&&b===p)){if((!p||typeof p!="object")&&(p={}),p=wt(p),$e=ze.indexOf(p.PARSER_MEDIA_TYPE)===-1?_t:p.PARSER_MEDIA_TYPE,h=$e==="application/xhtml+xml"?$n:Fr,pe=ht(p,"ALLOWED_TAGS")?se({},p.ALLOWED_TAGS,h):dt,fe=ht(p,"ALLOWED_ATTR")?se({},p.ALLOWED_ATTR,h):Be,v=ht(p,"ALLOWED_NAMESPACES")?se({},p.ALLOWED_NAMESPACES,$n):ee,V=ht(p,"ADD_URI_SAFE_ATTR")?se(wt(Z),p.ADD_URI_SAFE_ATTR,h):Z,J=ht(p,"ADD_DATA_URI_TAGS")?se(wt(K),p.ADD_DATA_URI_TAGS,h):K,R=ht(p,"FORBID_CONTENTS")?se({},p.FORBID_CONTENTS,h):O,We=ht(p,"FORBID_TAGS")?se({},p.FORBID_TAGS,h):wt({}),ot=ht(p,"FORBID_ATTR")?se({},p.FORBID_ATTR,h):wt({}),De=ht(p,"USE_PROFILES")?p.USE_PROFILES:!1,Me=p.ALLOW_ARIA_ATTR!==!1,ke=p.ALLOW_DATA_ATTR!==!1,Ge=p.ALLOW_UNKNOWN_PROTOCOLS||!1,nt=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ne=p.SAFE_FOR_TEMPLATES||!1,je=p.SAFE_FOR_XML!==!1,Pe=p.WHOLE_DOCUMENT||!1,Le=p.RETURN_DOM||!1,Je=p.RETURN_DOM_FRAGMENT||!1,Ue=p.RETURN_TRUSTED_TYPE||!1,Ae=p.FORCE_BODY||!1,he=p.SANITIZE_DOM!==!1,ut=p.SANITIZE_NAMED_PROPS||!1,Fe=p.KEEP_CONTENT!==!1,Ie=p.IN_PLACE||!1,rt=p.ALLOWED_URI_REGEXP||so,l=p.NAMESPACE||x,re=p.MATHML_TEXT_INTEGRATION_POINTS||re,ye=p.HTML_INTEGRATION_POINTS||ye,le=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&H(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(le.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&H(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(le.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(le.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ne&&(ke=!1),Je&&(Le=!0),De&&(pe=se({},Qs),fe=[],De.html===!0&&(se(pe,Xs),se(fe,Js)),De.svg===!0&&(se(pe,Sn),se(fe,En),se(fe,Pr)),De.svgFilters===!0&&(se(pe,An),se(fe,En),se(fe,Pr)),De.mathMl===!0&&(se(pe,Tn),se(fe,eo),se(fe,Pr))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Re.tagCheck=p.ADD_TAGS:(pe===dt&&(pe=wt(pe)),se(pe,p.ADD_TAGS,h))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Re.attributeCheck=p.ADD_ATTR:(fe===Be&&(fe=wt(fe)),se(fe,p.ADD_ATTR,h))),p.ADD_URI_SAFE_ATTR&&se(V,p.ADD_URI_SAFE_ATTR,h),p.FORBID_CONTENTS&&(R===O&&(R=wt(R)),se(R,p.FORBID_CONTENTS,h)),Fe&&(pe["#text"]=!0),Pe&&se(pe,["html","head","body"]),pe.table&&(se(pe,["tbody"]),delete We.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw ur('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ur('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=p.TRUSTED_TYPES_POLICY,T=D.createHTML("")}else D===void 0&&(D=Ia(y,s)),D!==null&&typeof T=="string"&&(T=D.createHTML(""));Ke&&Ke(p),b=p}},j=se({},[...Sn,...An,...ya]),be=se({},[...Tn,...va]),qt=function(p){let I=q(p);(!I||!I.tagName)&&(I={namespaceURI:l,tagName:"template"});let U=Fr(p.tagName),ge=Fr(I.tagName);return v[p.namespaceURI]?p.namespaceURI===L?I.namespaceURI===x?U==="svg":I.namespaceURI===k?U==="svg"&&(ge==="annotation-xml"||re[ge]):!!j[U]:p.namespaceURI===k?I.namespaceURI===x?U==="math":I.namespaceURI===L?U==="math"&&ye[ge]:!!be[U]:p.namespaceURI===x?I.namespaceURI===L&&!ye[ge]||I.namespaceURI===k&&!re[ge]?!1:!be[U]&&(ve[U]||!j[U]):!!($e==="application/xhtml+xml"&&v[p.namespaceURI]):!1},it=function(p){cr(e.removed,{element:p});try{q(p).removeChild(p)}catch{N(p)}},pt=function(p,I){try{cr(e.removed,{attribute:I.getAttributeNode(p),from:I})}catch{cr(e.removed,{attribute:null,from:I})}if(I.removeAttribute(p),p==="is")if(Le||Je)try{it(I)}catch{}else try{I.setAttribute(p,"")}catch{}},yr=function(p){let I=null,U=null;if(Ae)p="<remove></remove>"+p;else{let me=xn(p,/^[\r\n\t ]+/);U=me&&me[0]}$e==="application/xhtml+xml"&&l===x&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let ge=D?D.createHTML(p):p;if(l===x)try{I=new w().parseFromString(ge,$e)}catch{}if(!I||!I.documentElement){I=A.createDocument(l,"template",null);try{I.documentElement.innerHTML=g?T:ge}catch{}}let Oe=I.body||I.documentElement;return p&&U&&Oe.insertBefore(r.createTextNode(U),Oe.childNodes[0]||null),l===x?M.call(I,Pe?"html":"body")[0]:Pe?I.documentElement:Oe},vr=function(p){return S.call(p.ownerDocument||p,p,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Bt=function(p){return p instanceof m&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},Tt=function(p){return typeof c=="function"&&p instanceof c};function st(W,p,I){Nr(W,U=>{U.call(e,p,I,b)})}let Xt=function(p){let I=null;if(st(z.beforeSanitizeElements,p,null),Bt(p))return it(p),!0;let U=h(p.nodeName);if(st(z.uponSanitizeElement,p,{tagName:U,allowedTags:pe}),je&&p.hasChildNodes()&&!Tt(p.firstElementChild)&&Ve(/<[/\w!]/g,p.innerHTML)&&Ve(/<[/\w!]/g,p.textContent)||p.nodeType===fr.progressingInstruction||je&&p.nodeType===fr.comment&&Ve(/<[/\w]/g,p.data))return it(p),!0;if(!(Re.tagCheck instanceof Function&&Re.tagCheck(U))&&(!pe[U]||We[U])){if(!We[U]&&$r(U)&&(le.tagNameCheck instanceof RegExp&&Ve(le.tagNameCheck,U)||le.tagNameCheck instanceof Function&&le.tagNameCheck(U)))return!1;if(Fe&&!R[U]){let ge=q(p)||p.parentNode,Oe=B(p)||p.childNodes;if(Oe&&ge){let me=Oe.length;for(let Ye=me-1;Ye>=0;--Ye){let lt=E(Oe[Ye],!0);lt.__removalCount=(p.__removalCount||0)+1,ge.insertBefore(lt,F(p))}}}return it(p),!0}return p instanceof a&&!qt(p)||(U==="noscript"||U==="noembed"||U==="noframes")&&Ve(/<\/no(script|embed|frames)/i,p.innerHTML)?(it(p),!0):(Ne&&p.nodeType===fr.text&&(I=p.textContent,Nr([X,we,oe],ge=>{I=dr(I,ge," ")}),p.textContent!==I&&(cr(e.removed,{element:p.cloneNode()}),p.textContent=I)),st(z.afterSanitizeElements,p,null),!1)},Qt=function(p,I,U){if(he&&(I==="id"||I==="name")&&(U in r||U in G))return!1;if(!(ke&&!ot[I]&&Ve(ne,I))){if(!(Me&&Ve(tt,I))){if(!(Re.attributeCheck instanceof Function&&Re.attributeCheck(I,p))){if(!fe[I]||ot[I]){if(!($r(p)&&(le.tagNameCheck instanceof RegExp&&Ve(le.tagNameCheck,p)||le.tagNameCheck instanceof Function&&le.tagNameCheck(p))&&(le.attributeNameCheck instanceof RegExp&&Ve(le.attributeNameCheck,I)||le.attributeNameCheck instanceof Function&&le.attributeNameCheck(I,p))||I==="is"&&le.allowCustomizedBuiltInElements&&(le.tagNameCheck instanceof RegExp&&Ve(le.tagNameCheck,U)||le.tagNameCheck instanceof Function&&le.tagNameCheck(U))))return!1}else if(!V[I]){if(!Ve(rt,dr(U,Se,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&p!=="script"&&_a(U,"data:")===0&&J[p])){if(!(Ge&&!Ve(He,dr(U,Se,"")))){if(U)return!1}}}}}}}return!0},$r=function(p){return p!=="annotation-xml"&&xn(p,Ee)},yt=function(p){st(z.beforeSanitizeAttributes,p,null);let{attributes:I}=p;if(!I||Bt(p))return;let U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},ge=I.length;for(;ge--;){let Oe=I[ge],{name:me,namespaceURI:Ye,value:lt}=Oe,bt=h(me),Ut=lt,Ce=me==="value"?Ut:ba(Ut);if(U.attrName=bt,U.attrValue=Ce,U.keepAttr=!0,U.forceKeepAttr=void 0,st(z.uponSanitizeAttribute,p,U),Ce=U.attrValue,ut&&(bt==="id"||bt==="name")&&(pt(me,p),Ce=_e+Ce),je&&Ve(/((--!?|])>)|<\/(style|title|textarea)/i,Ce)){pt(me,p);continue}if(bt==="attributename"&&xn(Ce,"href")){pt(me,p);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){pt(me,p);continue}if(!nt&&Ve(/\/>/i,Ce)){pt(me,p);continue}Ne&&Nr([X,we,oe],er=>{Ce=dr(Ce,er," ")});let Jt=h(p.nodeName);if(!Qt(Jt,bt,Ce)){pt(me,p);continue}if(D&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!Ye)switch(y.getAttributeType(Jt,bt)){case"TrustedHTML":{Ce=D.createHTML(Ce);break}case"TrustedScriptURL":{Ce=D.createScriptURL(Ce);break}}if(Ce!==Ut)try{Ye?p.setAttributeNS(Ye,me,Ce):p.setAttribute(me,Ce),Bt(p)?it(p):Zs(e.removed)}catch{pt(me,p)}}st(z.afterSanitizeAttributes,p,null)},at=function W(p){let I=null,U=vr(p);for(st(z.beforeSanitizeShadowDOM,p,null);I=U.nextNode();)st(z.uponSanitizeShadowNode,I,null),Xt(I),yt(I),I.content instanceof o&&W(I.content);st(z.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(W){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,U=null,ge=null,Oe=null;if(g=!W,g&&(W="<!-->"),typeof W!="string"&&!Tt(W))if(typeof W.toString=="function"){if(W=W.toString(),typeof W!="string")throw ur("dirty is not a string, aborting")}else throw ur("toString is not a function");if(!e.isSupported)return W;if(Qe||te(p),e.removed=[],typeof W=="string"&&(Ie=!1),Ie){if(W.nodeName){let lt=h(W.nodeName);if(!pe[lt]||We[lt])throw ur("root node is forbidden and cannot be sanitized in-place")}}else if(W instanceof c)I=yr("<!---->"),U=I.ownerDocument.importNode(W,!0),U.nodeType===fr.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?I=U:I.appendChild(U);else{if(!Le&&!Ne&&!Pe&&W.indexOf("<")===-1)return D&&Ue?D.createHTML(W):W;if(I=yr(W),!I)return Le?null:Ue?T:""}I&&Ae&&it(I.firstChild);let me=vr(Ie?W:I);for(;ge=me.nextNode();)Xt(ge),yt(ge),ge.content instanceof o&&at(ge.content);if(Ie)return W;if(Le){if(Je)for(Oe=_.call(I.ownerDocument);I.firstChild;)Oe.appendChild(I.firstChild);else Oe=I;return(fe.shadowroot||fe.shadowrootmode)&&(Oe=P.call(n,Oe,!0)),Oe}let Ye=Pe?I.outerHTML:I.innerHTML;return Pe&&pe["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&Ve(oo,I.ownerDocument.doctype.name)&&(Ye="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+Ye),Ne&&Nr([X,we,oe],lt=>{Ye=dr(Ye,lt," ")}),D&&Ue?D.createHTML(Ye):Ye},e.setConfig=function(){let W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};te(W),Qe=!0},e.clearConfig=function(){b=null,Qe=!1},e.isValidAttribute=function(W,p,I){b||te({});let U=h(W),ge=h(p);return Qt(U,ge,I)},e.addHook=function(W,p){typeof p=="function"&&cr(z[W],p)},e.removeHook=function(W,p){if(p!==void 0){let I=ga(z[W],p);return I===-1?void 0:ma(z[W],I,1)[0]}return Zs(z[W])},e.removeHooks=function(W){z[W]=[]},e.removeAllHooks=function(){z=ro()},e}var ao=io();var lo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},co=t=>(...e)=>({_$litDirective$:t,values:e}),qr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var hr=class extends qr{constructor(e){if(super(e),this.it=Te,e.type!==lo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Te||e==null)return this._t=void 0,this.it=e;if(e===Lt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};hr.directiveName="unsafeHTML",hr.resultType=1;var uo=co(hr);function Mn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ft=Mn();function bo(t){Ft=t}var br={exec:()=>null};function ae(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Xe.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Da=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Xe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Oa=/^(?:[ \t]*(?:\n|$))+/,Ma=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Na=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,wr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Pa=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Nn=/(?:[*+-]|\d{1,9}[.)])/,wo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ko=ae(wo).replace(/bull/g,Nn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Fa=ae(wo).replace(/bull/g,Nn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Pn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qa=/^[^\n]+/,Fn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ba=ae(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Fn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ua=ae(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Nn).getRegex(),Gr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",qn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,za=ae("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",qn).replace("tag",Gr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),yo=ae(Pn).replace("hr",wr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Gr).getRegex(),Ha=ae(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",yo).getRegex(),Bn={blockquote:Ha,code:Ma,def:Ba,fences:Na,heading:Pa,hr:wr,html:za,lheading:ko,list:Ua,newline:Oa,paragraph:yo,table:br,text:qa},po=ae("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",wr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Gr).getRegex(),Wa={...Bn,lheading:Fa,table:po,paragraph:ae(Pn).replace("hr",wr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",po).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Gr).getRegex()},Ga={...Bn,html:ae(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",qn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:br,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ae(Pn).replace("hr",wr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ko).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ja=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ya=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,vo=/^( {2,}|\\)\n(?!\s*$)/,Va=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,jr=/[\p{P}\p{S}]/u,Un=/[\s\p{P}\p{S}]/u,$o=/[^\s\p{P}\p{S}]/u,Ka=ae(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Un).getRegex(),xo=/(?!~)[\p{P}\p{S}]/u,Za=/(?!~)[\s\p{P}\p{S}]/u,Xa=/(?:[^\s\p{P}\p{S}]|~)/u,Qa=ae(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Da?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),So=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ja=ae(So,"u").replace(/punct/g,jr).getRegex(),el=ae(So,"u").replace(/punct/g,xo).getRegex(),Ao="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",tl=ae(Ao,"gu").replace(/notPunctSpace/g,$o).replace(/punctSpace/g,Un).replace(/punct/g,jr).getRegex(),rl=ae(Ao,"gu").replace(/notPunctSpace/g,Xa).replace(/punctSpace/g,Za).replace(/punct/g,xo).getRegex(),nl=ae("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,$o).replace(/punctSpace/g,Un).replace(/punct/g,jr).getRegex(),sl=ae(/\\(punct)/,"gu").replace(/punct/g,jr).getRegex(),ol=ae(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),il=ae(qn).replace("(?:-->|$)","-->").getRegex(),al=ae("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",il).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),zr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ll=ae(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",zr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),To=ae(/^!?\[(label)\]\[(ref)\]/).replace("label",zr).replace("ref",Fn).getRegex(),Eo=ae(/^!?\[(ref)\](?:\[\])?/).replace("ref",Fn).getRegex(),cl=ae("reflink|nolink(?!\\()","g").replace("reflink",To).replace("nolink",Eo).getRegex(),fo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,zn={_backpedal:br,anyPunctuation:sl,autolink:ol,blockSkip:Qa,br:vo,code:Ya,del:br,emStrongLDelim:Ja,emStrongRDelimAst:tl,emStrongRDelimUnd:nl,escape:ja,link:ll,nolink:Eo,punctuation:Ka,reflink:To,reflinkSearch:cl,tag:al,text:Va,url:br},dl={...zn,link:ae(/^!?\[(label)\]\((.*?)\)/).replace("label",zr).getRegex(),reflink:ae(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",zr).getRegex()},In={...zn,emStrongRDelimAst:rl,emStrongLDelim:el,url:ae(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",fo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ae(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",fo).getRegex()},ul={...In,br:ae(vo).replace("{2,}","*").getRegex(),text:ae(In.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Br={normal:Bn,gfm:Wa,pedantic:Ga},gr={normal:zn,gfm:In,breaks:ul,pedantic:dl},pl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ho=t=>pl[t];function kt(t,e){if(e){if(Xe.escapeTest.test(t))return t.replace(Xe.escapeReplace,ho)}else if(Xe.escapeTestNoEncode.test(t))return t.replace(Xe.escapeReplaceNoEncode,ho);return t}function go(t){try{t=encodeURI(t).replace(Xe.percentDecode,"%")}catch{return null}return t}function mo(t,e){let r=t.replace(Xe.findPipe,(o,i,c)=>{let a=!1,u=i;for(;--u>=0&&c[u]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Xe.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Xe.slashPipe,"|");return n}function mr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function fl(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function _o(t,e,r,n,s){let o=e.href,i=e.title||null,c=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,a}function hl(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[c]=i;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var Hr=class{constructor(t){ue(this,"options");ue(this,"rules");ue(this,"lexer");this.options=t||Ft}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:mr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=hl(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=mr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:mr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=mr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,c=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))c.push(r[a]),i=!0;else if(!i)c.push(r[a]);else break;r=r.slice(a);let u=c.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=m,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let y=w,$=y.raw+`
`+r.join(`
`),E=this.blockquote($);o[o.length-1]=E,n=n.substring(0,n.length-y.raw.length)+E.raw,s=s.substring(0,s.length-y.text.length)+E.text;break}else if(w?.type==="list"){let y=w,$=y.raw+`
`+r.join(`
`),E=this.list($);o[o.length-1]=E,n=n.substring(0,n.length-w.raw.length)+E.raw,s=s.substring(0,s.length-y.raw.length)+E.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,u="",f="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let m=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),w=t.split(`
`,1)[0],y=!m.trim(),$=0;if(this.options.pedantic?($=2,f=m.trimStart()):y?$=e[1].length+1:($=e[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=m.slice($),$+=e[1].length),y&&this.rules.other.blankLine.test(w)&&(u+=w+`
`,t=t.substring(w.length+1),a=!0),!a){let E=this.rules.other.nextBulletRegex($),N=this.rules.other.hrRegex($),F=this.rules.other.fencesBeginRegex($),B=this.rules.other.headingBeginRegex($),q=this.rules.other.htmlBeginRegex($);for(;t;){let D=t.split(`
`,1)[0],T;if(w=D,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),T=w):T=w.replace(this.rules.other.tabCharGlobal,"    "),F.test(w)||B.test(w)||q.test(w)||E.test(w)||N.test(w))break;if(T.search(this.rules.other.nonSpaceChar)>=$||!w.trim())f+=`
`+T.slice($);else{if(y||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(m)||B.test(m)||N.test(m))break;f+=`
`+w}!y&&!w.trim()&&(y=!0),u+=D+`
`,t=t.substring(D.length+1),m=T.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=f.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=f.raw+a.tokens[0].raw,a.tokens[0].text=f.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(f)):a.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):a.tokens.unshift(f)}}if(!s.loose){let u=a.tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=f}}if(s.loose)for(let a of s.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=mo(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(mo(i,o.header.length).map((c,a)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=mr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=fl(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),_o(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return _o(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,c=s,a=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+s);(n=u.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){c+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(c-=i,c>0)continue;i=Math.min(i,i+c+a);let f=[...n[0]][0].length,m=t.slice(0,s+n.index+f+i);if(Math.min(s,i)%2){let y=m.slice(1,-1);return{type:"em",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}let w=m.slice(2,-2);return{type:"strong",raw:m,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},gt=class Dn{constructor(e){ue(this,"tokens");ue(this,"options");ue(this,"state");ue(this,"inlineQueue");ue(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ft,this.options.tokenizer=this.options.tokenizer||new Hr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Xe,block:Br.normal,inline:gr.normal};this.options.pedantic?(r.block=Br.pedantic,r.inline=gr.pedantic):this.options.gfm&&(r.block=Br.gfm,this.options.breaks?r.inline=gr.breaks:r.inline=gr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Br,inline:gr}}static lex(e,r){return new Dn(r).lex(e)}static lexInline(e,r){return new Dn(r).inlineTokens(e)}lex(e){e=e.replace(Xe.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Xe.tabCharGlobal,"    ").replace(Xe.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,c=e.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},c),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,c="";for(;e;){i||(c=""),i=!1;let a;if(this.options.extensions?.inline?.some(f=>(a=f.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let f=r.at(-1);a.type==="text"&&f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,c)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let u=e;if(this.options.extensions?.startInline){let f=1/0,m=e.slice(1),w;this.options.extensions.startInline.forEach(y=>{w=y.call({lexer:this},m),typeof w=="number"&&w>=0&&(f=Math.min(f,w))}),f<1/0&&f>=0&&(u=e.substring(0,f+1))}if(a=this.tokenizer.inlineText(u)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(c=a.raw.slice(-1)),i=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(e){let f="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Wr=class{constructor(t){ue(this,"options");ue(this,"parser");this.options=t||Ft}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Xe.notSpaceStart)?.[0],s=t.replace(Xe.endingNewline,"")+`
`;return n?'<pre><code class="language-'+kt(n)+'">'+(r?s:kt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:kt(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,n="";for(let i=0;i<t.items.length;i++){let c=t.items[i];n+=this.listitem(c)}let s=e?"ol":"ul",o=e&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${kt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=go(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+kt(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=go(t);if(s===null)return kt(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${kt(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:kt(t.text)}},Hn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},mt=class On{constructor(e){ue(this,"options");ue(this,"renderer");ue(this,"textRenderer");this.options=e||Ft,this.options.renderer=this.options.renderer||new Wr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Hn}static parse(e,r){return new On(r).parse(e)}static parseInline(e,r){return new On(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,c=this.options.extensions.renderers[i.type].call({parser:this},i);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let c='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},Ur,_r=(Ur=class{constructor(t){ue(this,"options");ue(this,"block");this.options=t||Ft}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?gt.lex:gt.lexInline}provideParser(){return this.block?mt.parse:mt.parseInline}},ue(Ur,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ue(Ur,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ur),gl=class{constructor(...t){ue(this,"defaults",Mn());ue(this,"options",this.setOptions);ue(this,"parse",this.parseMarkdown(!0));ue(this,"parseInline",this.parseMarkdown(!1));ue(this,"Parser",mt);ue(this,"Renderer",Wr);ue(this,"TextRenderer",Hn);ue(this,"Lexer",gt);ue(this,"Tokenizer",Hr);ue(this,"Hooks",_r);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let c=s.renderer.apply(this,i);return c===!1&&(c=o.apply(this,i)),c}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Wr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,c=r.renderer[i],a=s[i];s[i]=(...u)=>{let f=c.apply(s,u);return f===!1&&(f=a.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Hr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,c=r.tokenizer[i],a=s[i];s[i]=(...u)=>{let f=c.apply(s,u);return f===!1&&(f=a.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new _r;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,c=r.hooks[i],a=s[i];_r.passThroughHooks.has(o)?s[i]=u=>{if(this.defaults.async&&_r.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await c.call(s,u);return a.call(s,m)})();let f=c.call(s,u);return a.call(s,f)}:s[i]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await c.apply(s,u);return m===!1&&(m=await a.apply(s,u)),m})();let f=c.apply(s,u);return f===!1&&(f=a.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let c=[];return c.push(o.call(this,i)),s&&(c=c.concat(s.call(this,i))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return gt.lex(t,e??this.defaults)}parser(t,e){return mt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,c=await(s.hooks?await s.hooks.provideLexer():t?gt.lex:gt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():t?mt.parse:mt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?gt.lex:gt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():t?mt.parse:mt.parseInline)(i,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+kt(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Pt=new gl;function ce(t,e){return Pt.parse(t,e)}ce.options=ce.setOptions=function(t){return Pt.setOptions(t),ce.defaults=Pt.defaults,bo(ce.defaults),ce};ce.getDefaults=Mn;ce.defaults=Ft;ce.use=function(...t){return Pt.use(...t),ce.defaults=Pt.defaults,bo(ce.defaults),ce};ce.walkTokens=function(t,e){return Pt.walkTokens(t,e)};ce.parseInline=Pt.parseInline;ce.Parser=mt;ce.parser=mt.parse;ce.Renderer=Wr;ce.TextRenderer=Hn;ce.Lexer=gt;ce.lexer=gt.lex;ce.Tokenizer=Hr;ce.Hooks=_r;ce.parse=ce;var Ad=ce.options,Td=ce.setOptions,Ed=ce.use,Cd=ce.walkTokens,Rd=ce.parseInline;var Ld=mt.parse,Id=gt.lex;function Co(t){let e=ce.parse(t),r=ao.sanitize(e);return uo(r)}function ml(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function Ro(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",c="";function a($){$.key==="Escape"&&s&&($.preventDefault(),w())}document.addEventListener("keydown",a);function u(){return s?d`
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
                    ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Co(i)}
          </div>
        </div>
      </div>
    `:d``}function f(){de(u(),t)}async function m($){s=$,o="loading",i="",c="",f();let E=r?r():"";if(!E){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let N="/api/doc?workspace="+encodeURIComponent(E)+"&path="+encodeURIComponent($);try{let F=await n(N),B=await F.json().catch(()=>({}));if(!F.ok||!B||B.ok!==!0){o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||F.status)+")",f();return}i=String(B.content||""),o="ready",f()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function w(){s=null,de(d``,t)}function y(){document.removeEventListener("keydown",a),w()}return{open:m,close:w,destroy:y}}var _l={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function bl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Lo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,u=n.has(i.attempt_id),f=a&&!u,m=a?u?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!f}
      title=${m}
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
  `}var wl=["open","in_progress","deferred","resolved","closed"],kl=[0,1,2,3,4];function Io(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,c=e.sessionLogStore,a=null,u=null,f={},m=!1,w=!1,y="",$="",E="";function N(){m=!1,w=!1,y="",$="",E=""}let F=document.createElement("div");F.className="md-viewer-root",document.body.appendChild(F);let B=Ro(F,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),q=document.createElement("div");q.className="session-log-root",document.body.appendChild(q);let D=Or(q,{transport:s?(k,L)=>Promise.resolve(s(k,L)):void 0,sessionLogStore:c});function T(){if(!i||!a)return[];let k=i.get();return(k&&k.attempts?Object.values(k.attempts):[]).filter(x=>x&&x.bead_id===a).sort((x,l)=>(l.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null}))}function A(k){let L=i?i.get():null,x=L&&L.attempts?L.attempts[k]:null;D.open({attempt_id:k,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function S(k){if(!s||!k)return;let L=()=>{let l=i?i.get():null;return l&&typeof l.revision=="number"?l.revision:0},x=await s("worker-attempt-resume",{attempt_id:k,expected_revision:L()});if(x&&x.conflict){let l=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:L();x=await s("worker-attempt-resume",{attempt_id:k,expected_revision:l})}x&&x.resumed===!1&&!x.conflict&&x.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let _={onOpen:A,onResume:S};function M(){let k=i?i.get():null,L=k&&k.exec_defaults;return L&&typeof L=="object"?L:{}}let P=null;r&&r.subscribe&&(P=r.subscribe(()=>we()));let z=null;i&&typeof i.subscribe=="function"&&(z=i.subscribe(()=>{a&&Z()}));function X(k){k.key==="Escape"&&a&&(k.preventDefault(),n())}document.addEventListener("keydown",X);function we(){if(a){if(r&&typeof r.snapshotFor=="function"){let k=r.snapshotFor("detail:"+a)||[];u=k.find(x=>x&&x.id===a)||k[0]||u}Z()}}function oe(k){Nt(k).then(L=>{L?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ne(k){k.preventDefault(),k.stopPropagation(),a&&oe(a)}function tt(k,L){k.preventDefault(),k.stopPropagation(),oe(L)}function He(k,L){k.preventDefault(),k.stopPropagation(),B.open(L)}function Se(k,L){f[k]=L,Z(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:k,value:L})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ee(k,L,x){if(!s||!a)return!1;try{let l=await Promise.resolve(s(k,L)),g=Array.isArray(l)?l[0]:l;return g&&typeof g=="object"&&g.id?(u=g,!0):(Q(x,"error"),!1)}catch{return Q(x,"error"),!1}}function rt(k){setTimeout(()=>{try{let L=t.querySelector(k);L&&typeof L.focus=="function"&&L.focus()}catch{}},0)}function pe(){m=!0,y=u&&u.title||"",Z(),rt('.detail-edit__input[data-edit="title"]')}function dt(k){y=k.target.value}function fe(){m=!1,y="",Z()}function Be(){Ee("edit-text",{id:a,field:"title",value:y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(m=!1,y=""),Z()})}function le(){w=!0,$=u&&u.description||"",Z(),rt('.detail-edit__textarea[data-edit="description"]')}function We(k){$=k.target.value}function ot(){w=!1,$="",Z()}function Re(){Ee("edit-text",{id:a,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(w=!1,$=""),Z()})}function Me(k,L,x,l){if(k.key==="Escape"){k.stopPropagation(),x();return}k.key==="Enter"&&(!l||k.ctrlKey||k.metaKey)&&(k.preventDefault(),L())}function ke(k){let L=k.target.value;Ee("update-status",{id:a,status:L},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function Ge(k){let L=Number(k.target.value);Ee("update-priority",{id:a,priority:L},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function nt(k){E=k.target.value}function Ne(){let k=E.trim();k.length!==0&&Ee("label-add",{id:a,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(L=>{L&&(E=""),Z()})}function je(k){if(k.key==="Escape"){k.stopPropagation(),E="",Z();return}k.key==="Enter"&&(k.preventDefault(),Ne())}function Pe(k){Ee("label-remove",{id:a,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Z())}let Qe={onCopyPath:tt,onOpenDoc:He},Ae={onChange:Se};function Le(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function Je(k){switch(k&&typeof k=="object"?String(k.dependency_type||k.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ue(k){let x=(Array.isArray(k.dependencies)?k.dependencies:[]).map(l=>({id:Le(l),icon:Je(l)})).filter(l=>l.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${x.map(l=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(l.id)}
                  >
                    ${l.icon?`${l.icon} `:""}${l.id}
                  </button>`:d`<span class="detail-dep"
                    >${l.icon?`${l.icon} `:""}${l.id}</span
                  >`)}
          </div>`}
    `}function he(k){let L=k.metadata||{},x=k.workflow||{},l=x.stages||{},g=l.spec&&l.spec.stale,v=l.impl&&l.impl.stale,ee=x.route_source==="derived",re=x.route||L.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ee?" detail-kv__v--derived":""}"
          title=${ee?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${ee&&x.route?`${re} ? (\uCD94\uB860)`:re}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${L.spec_review||"\uC5C6\uC74C"}${g?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${L.impl_review||"\uC5C6\uC74C"}${v?" \xB7 stale":""}</span
        >
      </div>
      ${L.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${L.pr_url}</span>
          </div>`:""}
    `}let ut={route:["spec_backed","full_plan"]};async function _e(k,L){let x=L.target.value;if(k==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Z();return}await Ee("update-workflow-meta",{id:a,key:k,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Z()}function Fe(k){let L=k.metadata||{};return d` ${((l,g)=>{let v=ut[l],ee=typeof L[l]=="string"?L[l]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${l}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${l}
          data-edit=${`wfmeta-${l}`}
          @change=${re=>_e(l,re)}
        >
          <option value="" ?selected=${!v.includes(ee)}>
            ${g}
          </option>
          ${v.map(re=>d`<option value=${re} ?selected=${ee===re}>${re}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Ie(k){return m?d`
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
    `}function De(k){let L=$t(k.created_at),x=$t(k.updated_at);return!L&&!x?d``:d`
      ${L?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${L}</span>
          </div>`:""}
      ${x?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
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
          ${wl.map(x=>d`<option value=${x} ?selected=${x===k}>${x}</option>`)}
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
          ${kl.map(x=>d`<option value=${String(x)} ?selected=${x===L}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function O(k){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${w?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${le}
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
    `}function J(k){let L=typeof k.notes=="string"?k.notes:"";return L.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${L}</div>
    `}function K(k){let L=Array.isArray(k.labels)?k.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${L.map(x=>d`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>Pe(x)}
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
    `}function V(){if(!a)return d``;let k=u||{},L=String(k.id||a),x=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",l=k.status||"open",g=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",v=k.description||"",ee={...k,metadata:{...k.metadata||{},...f}};return d`
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
            @click=${ne}
          >
            ${L}
          </button>
          ${Ie(x)} ${R(l,g)}
          ${De(k)} ${O(v)}
          ${J(k)} ${K(k)} ${Ue(k)}
          ${he(k)} ${Fe(k)}
          ${Ys(k,Qe)}
          ${Vs(ee,Ae,M())}
          ${Lo(T(),_)}
        </div>
      </div>
    `}function Z(){de(V(),t)}return{load(k){k!==a&&(f={},N()),a=k,u=null,we()},clear(){a=null,u=null,f={},N(),B.close(),D.close(),de(d``,t)},destroy(){P&&(P(),P=null),z&&(z(),z=null),document.removeEventListener("keydown",X),B.destroy(),F.parentNode&&F.parentNode.removeChild(F),D.destroy(),q.parentNode&&q.parentNode.removeChild(q),a=null,u=null,de(d``,t)}}}var yl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Do(t,e){return fn(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function vl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Oo(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function c(A){let S=r.get();if(S)try{let _=await n("display-policy-set",{expected_revision:S.revision,policy:A(S)});a(_),_&&_.conflict&&_.policy&&(_=await n("display-policy-set",{expected_revision:_.policy.revision,policy:A(_.policy)}),a(_)),_&&_.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function u(A){let S=r.get();if(!S)return;let _=Do(A,S)!=="shown";c(M=>vl(A,M,_))}function f(){let A=i.trim();A.length!==0&&(i="",c(S=>S.hidden_prefixes.includes(A)?{hidden_prefixes:S.hidden_prefixes}:{hidden_prefixes:[...S.hidden_prefixes,A]}),N())}function m(A){c(S=>({hidden_prefixes:S.hidden_prefixes.filter(_=>_!==A)}))}function w(A){let S=r.get();if(!S)return;let _=S.chips[A]===!1;c(()=>({chips:{[A]:_}}))}function y(A){let S=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${S.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${S.map(_=>{let M=Do(_,A);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${M}`}
                  data-label=${_}
                  data-state=${M}
                  @click=${()=>u(_)}
                >
                  ${_}
                </button>`})}
            </div>`}
      </section>
    `}function $(A){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(S=>d`<span class="display-settings__prefix">
                ${S}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${S} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(S)}
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
            @input=${S=>{i=String(S.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function E(A){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${yl.map(([S,_])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${S}
                  .checked=${A.chips[S]!==!1}
                  @change=${()=>w(S)}
                />
                <span>${_}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let A=r.get();de(d`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${T}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${A?d`${y(A)} ${$(A)}
                ${E(A)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let F=!1,B=()=>{F=!1};o.addEventListener("close",B),o.addEventListener("cancel",B);let q=null;r.subscribe&&(q=r.subscribe(()=>{F&&N()}));function D(){F||(i="",F=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function T(){F&&(F=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:D,close:T,destroy(){F=!1,o.removeEventListener("close",B),o.removeEventListener("cancel",B),q&&(q(),q=null),o.remove()}}}function Mo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),c=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(u,f,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let w=typeof m=="string"?m.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>c()),e.addEventListener("cancel",u=>{u.preventDefault(),c()}),{open:a,close:c,getElement(){return e}}}function No(t,e,r){let n=xe("views:nav"),s=null;function o(a){return u=>{u.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let u=e.getState().view==="worker"?"worker":"board";return d`
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
    `}function c(){de(i(),t)}return c(),s=e.subscribe(()=>c()),{destroy(){s&&(s(),s=null),de(d``,t)}}}var Po=["bug","feature","task","epic","chore"];function Fo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var qo=["Critical","High","Medium","Low","Backlog"];function Bo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function y(){o.replaceChildren();let T=document.createElement("option");T.value="",T.textContent="\u2014 Select \u2014",o.appendChild(T);for(let A of Po){let S=document.createElement("option");S.value=A,S.textContent=Fo(A),o.appendChild(S)}i.replaceChildren();for(let A=0;A<=4;A+=1){let S=document.createElement("option");S.value=String(A);let _=qo[A]||"Medium";S.textContent=`${A} \u2013 ${_}`,i.appendChild(S)}}y();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(T){s.disabled=T,o.disabled=T,i.disabled=T,c.disabled=T,a.disabled=T,f.disabled=T,m.disabled=T,m.textContent=T?"Creating\u2026":"Create"}function N(){u.textContent=""}function F(T){u.textContent=T}function B(){try{let T=window.localStorage.getItem("beads-ui.new.type");T?o.value=T:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?i.value=A:i.value="2"}catch{o.value="",i.value="2"}}function q(){let T=o.value||"",A=i.value||"";T.length>0&&window.localStorage.setItem("beads-ui.new.type",T),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function D(){N();let T=String(s.value||"").trim();if(T.length===0){F("Title is required"),s.focus();return}let A=Number(i.value||"2");if(!(A>=0&&A<=4)){F("Priority must be 0..4"),i.focus();return}let S=String(o.value||""),_=String(a.value||""),M={title:T};S.length>0&&(M.type=S),String(A).length>0&&(M.priority=A),_.length>0&&(M.description=_),E(!0);try{await e("create-issue",M)}catch{E(!1),F("Failed to create issue");return}q(),E(!1),$()}return r.addEventListener("cancel",T=>{T.preventDefault(),$()}),w.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",T=>{T.key==="Enter"&&(T.ctrlKey||T.metaKey)&&(T.preventDefault(),D())}),n.addEventListener("submit",T=>{T.preventDefault(),D()}),{open(){n.reset(),N(),B();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}function Uo(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function zo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var $l={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},xl=[{key:"orchestration_model",values:()=>bn},{key:"orchestration_effort",values:()=>wn},{key:"review_model",values:()=>kn},{key:"impl_model",values:()=>yn}];function Ho(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function c(){let _=i();return typeof _.revision=="number"?_.revision:0}function a(){let _=i().exec_defaults;return _&&typeof _=="object"?_:{}}function u(_){_&&_.queue&&r&&r.set(_.queue)}async function f(_,M){if(!n)return;let P={key:_,value:M||null};try{let z=await n("worker-queue-set-exec-default",{...P,expected_revision:c()});u(z),z&&z.conflict&&(z=await n("worker-queue-set-exec-default",{...P,expected_revision:c()}),u(z)),z&&z.conflict&&Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function m(_,M,P){let z=!!P&&!M.includes(P);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${_}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${_}`}
        data-key=${_}
        @change=${X=>{f(_,X.target.value)}}
      >
        <option value="" ?selected=${!P}>
          ${vn[_]||"(\uAE30\uBCF8)"}
        </option>
        ${z?d`<option value=${P} ?selected=${!0}>
              ${P} (비호환)
            </option>`:""}
        ${M.map(X=>d`<option value=${X} ?selected=${P===X}>${X}</option>`)}
      </select>
    </div>`}function w(){let _=i().workspace_info;return _&&typeof _=="object"?_:{}}function y(_,M){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${_}"
      >${M}</span
    >`}function $(_){let M=_?zo(_.cmd):"",P=_?Uo(_.timeout_ms):"",z=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${y("config","config")}
            ${P?d`<span class="exec-defaults__vd-meta"
                  >timeout ${P}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${z}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function E(_){let M=_?zo(_.cmd):"",P=_?Uo(_.timeout_ms):"",z=P?`timeout ${P} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",X=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${y("config","config")}
            ${_.detached===!0?y("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${z}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${X}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function N(_){if(!_||typeof _!="object")return"";let M=$l[String(_.outcome)];if(!M)return"";let P=_.outcome==="failed"&&_.reason?`${M.label} \xB7 ${_.reason}`:M.label,z=[$t(_.at),typeof _.bead_id=="string"?_.bead_id:"",typeof _.base_sha=="string"?_.base_sha.slice(0,7):""].filter(X=>X.length>0).join(" \xB7 ");return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${y(M.modifier,P)}
        ${z?d`<span class="exec-defaults__vd-meta">${z}</span>`:""}
      </div>
    </div>`}function F(_){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(_.verify_cmd)} ${E(_.deploy_cmd)}
      ${N(_.last_deploy)}
    </section>`}function B(){let _=a();de(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${S}
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
            ${xl.map(M=>m(M.key,M.values(),_[M.key]||""))}
            ${F(w())}
          </div>
        </div>
      `,o)}let q=!1,D=()=>{q=!1};o.addEventListener("close",D),o.addEventListener("cancel",D);let T=null;r&&r.subscribe&&(T=r.subscribe(()=>{q&&B()}));function A(){q||(q=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function S(){q&&(q=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:A,close:S,destroy(){q=!1,o.removeEventListener("close",D),o.removeEventListener("cancel",D),T&&(T(),T=null),o.remove()}}}var Sl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Kt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function Al(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function Tl(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function Zt(t){if(!Al(t))return null;let e=Kt(t?.input_tokens)+Kt(t?.output_tokens);return`\u03C4 ${Tl(e)}`}function Yr(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Kt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Kt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Kt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Kt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=e.join(" \xB7 ");return t.replayed?`${r}
${Sl}`:r}function Wn(t,e){let r=null;for(let n of Object.values(t||{}))n&&n.bead_id===e&&(r=n.usage||null);return r}function Gn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Zt(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",c=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=d`<span class="worker-mini__title">${t.title}</span>`,u=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",f=r.map(q=>q===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${q}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${q}</span
        >`),m=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",w=n?d`<span class="worker-usage" title=${Yr(t.usage)}
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
      </button>`:"",E=t.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${t.id}
        ?disabled=${t.cancel_enabled===!1}
        title=${t.cancel_title||""}
      >
        취소
      </button>`:"",N=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",F=t.revise_action?d`<button
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
        </button>`:"",B=!!(n||s||t.merge_action||t.cancel_action||t.discard_action||t.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?d`<div class="worker-mini__head">
            ${i}${c}${u}${f}${m}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${B?d`<div class="worker-mini__foot">
                ${w}${y}
                <span class="worker-mini__actions"
                  >${$}${E}${N}${F}</span
                >
              </div>`:""}`:d`${i}${c}${a}${u}${f}${m}${w}${y}${$}${E}${N}`}
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
  </div>`}function Dl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?Il(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Zt(t.usage),c=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return d`<div
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
    ${o||i||c?d`<div class="rtile__meta">
          ${c?d`<span class="worker-mini__badge">${c}</span>`:""}
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
  </div>`}var Ol="tab:worker:ready",Ml="tab:worker:blocked",Vr=1;function Kn(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Vo="beads-ui.worker.candidate-filter",Yn={show_blocked:!1,spec:"all"};function Nl(){try{let t=window.localStorage.getItem(Vo);if(!t)return{...Yn};let e=JSON.parse(t);if(!e||typeof e!="object")return{...Yn};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Yn}}}function Pl(t){try{window.localStorage.setItem(Vo,JSON.stringify(t))}catch{}}function Fl(t,e){let r=c=>e.show_blocked||!c.blocked,n=c=>e.spec==="all"||(e.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,i=0;for(let c of t){let a=r(c),u=n(c);a&&u?s.push(c):!a&&u?o+=1:a&&!u&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var ql=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ko="bdui.worker.candidate_sort",Bl=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Kr="spec";function Ul(){try{let t=window.localStorage.getItem(Ko);return t==="board"||t==="created"||t==="spec"?t:Kr}catch{return Kr}}function zl(t){try{window.localStorage.setItem(Ko,t)}catch{}}var Hl="(max-width: 640px)",Zo="beads-ui.worker.lane-collapsed",kr={queue:!0,done:!0};function Wl(){try{let t=window.localStorage.getItem(Zo);if(!t)return{...kr};let e=JSON.parse(t);return!e||typeof e!="object"?{...kr}:{queue:typeof e.queue=="boolean"?e.queue:kr.queue,done:typeof e.done=="boolean"?e.done:kr.done}}catch{return{...kr}}}function Gl(t){try{window.localStorage.setItem(Zo,JSON.stringify(t))}catch{}}function Yo(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function jl(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Dt):(n.sort(Er(r)),e==="board"?n:[...n.filter(Kn),...n.filter(s=>!Kn(s))])}function Yl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Vl(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Kl=["closed_unmerged","undecidable"],Zl=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Xl(t,e){for(let r of Zl)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var Vn=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ql(t){if(typeof t!="string"||t.length===0)return null;let e=Vn.length,r=Vn.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:Vn[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function Jl(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"external_conflict_needs_session":return"\uC678\uBD80 PR \uCDA9\uB3CC \u2014 \uC138\uC158 \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function ec(t,e,r,n,s=null,o=null,i=null,c=!1,a=null){let u=!!a&&a.position>0,f=!!a&&a.active===!0,m=a&&a.failure||null,w=r[t]||null,y=w&&w.gate?w.gate:null,$=w&&w.pr?w.pr:null,E=[];c&&E.push("\uC138\uC158");let N=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,F=Xl(c&&y&&y.tier==="closed_unmerged"?"\uB2EB\uD798":y&&y.gate_badge||"",N?null:o&&o.activity||null);N&&E.push(N),F.label&&E.push(F.label),y&&y.base_badge&&y.base_badge!==y.gate_badge&&E.push(y.base_badge),n&&E.push("\uC815\uB9AC \uC2E4\uD328"),u&&!f&&E.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),m&&E.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Jl(m)}`);let B=!!y&&y.base_badge==="\uCDA9\uB3CC",q=!!y&&y.enabled===!0,D=Ql(o&&o.merge_progress?o.merge_progress.step:null),T=!!n&&!!y&&y.tier==="merged",A=c&&!!y&&y.tier==="merged",S=c&&B;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:$&&typeof $.number=="number"?$.number:null,pr_url:$&&typeof $.url=="string"?$.url:"",badges:E,live_badge:i==="running"?N:N?null:F.live?F.label:null,usage:s,alert:!!y&&Kl.includes(y.tier)||!!n||!!m,merge_action:!u,cancel_action:u,cancel_enabled:!f,cancel_title:f?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!c&&!n&&!(y&&y.tier==="merged"),merge_step:D,discard_enabled:!D&&!i&&!u,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":u?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!D&&!i&&!S&&(q||B&&!c||T||A),merge_label:A?"\uC815\uB9AC":B&&!c&&!D&&!T?"\uCDA9\uB3CC \uD574\uC18C":void 0,merge_title:D?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${D.label}`:A?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":S?"\uC678\uBD80 PR \uCDA9\uB3CC \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694 (\uC5EC\uAE30\uC11C\uB294 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4)":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":T?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":B?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":q?`\uBA38\uC9C0 (${y.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:y&&y.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${y&&y.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Zn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:c,getWorkspacePath:a}=e,u=n?Rr(n,i):null,f=Lr({transport:r,uiOrderStore:i}),m=null,w=[],y=Nl(),$=Ul(),E=Wl(),N=!1,F=new Set,B=new Set,q=[],D=document.createElement("div");D.className="worker-console";let T=document.createElement("div");T.className="worker-top";let A=document.createElement("div");A.className="worker-drawer-overlay",A.hidden=!0;let S=document.createElement("div");S.className="worker-drawer-overlay__backdrop";let _=document.createElement("div");_.className="worker-drawer-host",A.append(S,_);let M=document.createElement("div");M.className="worker-lanes-host",D.append(T,A,M),t.appendChild(D);let P=null,z=Or(_,{transport:r,sessionLogStore:o,onClose:()=>{P=null,A.hidden=!0,he()}}),X=Ho(D,{queueStore:s,transport:r,getWorkspacePath:a});function we(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Vr,queue:[],pr_wait:[],done:[]}}function oe(){let l=we();return typeof l.revision=="number"?l.revision:0}function ne(l){l&&l.queue&&s&&s.set(l.queue)}function tt(){let l=we().queue;return Array.isArray(l)?l.length:0}async function He(l,g){if(!r)return;let v=await r("worker-queue-place",{bead_id:l,index:g,expected_revision:oe()});ne(v),v&&v.conflict&&await r("worker-queue-place",{bead_id:l,index:g,expected_revision:oe()}).then(ne)}async function Se(l,g){if(!r)return;let v=await r("worker-queue-reorder",{bead_id:l,to_index:g,expected_revision:oe()});ne(v),v&&v.conflict&&await r("worker-queue-reorder",{bead_id:l,to_index:g,expected_revision:oe()}).then(ne)}async function Ee(l){if(!r)return;let g=await r("worker-queue-remove",{bead_id:l,expected_revision:oe()});ne(g),g&&g.conflict&&await r("worker-queue-remove",{bead_id:l,expected_revision:oe()}).then(ne)}async function rt(l){!r||!l||await r("worker-attempt-stop",{attempt_id:l})}async function pe(l){if(!r||!l)return;let g=await r("worker-attempt-pause",{attempt_id:l});g&&g.paused===!1&&g.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function dt(l){if(!r||!l)return;let g=await r("worker-attempt-resume",{attempt_id:l,expected_revision:oe()});ne(g),g&&g.conflict&&(g=await r("worker-attempt-resume",{attempt_id:l,expected_revision:oe()}),ne(g)),g&&g.resumed===!1&&!g.conflict&&g.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function fe(l){if(!r||!l)return;let g=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:oe()});ne(g),g&&g.conflict&&(g=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:oe()}),ne(g)),g&&g.dismissed===!1&&!g.conflict&&g.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function Be(l,g){if(!r)return null;let v=r,ee=await v(l,{...g,expected_revision:oe()});return ne(ee),ee&&ee.conflict&&(ee=await v(l,{...g,expected_revision:oe()}),ne(ee)),ee}async function le(l){if(!r||!l)return;F.add(l),he();let g;try{g=await Be("worker-merge-queue-add",{bead_id:l})}finally{F.delete(l),he()}!g||g.conflict||g.applied||Q("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function We(){if(!r)return;let l=await Be("worker-merge-queue-add-all",{});!l||l.conflict||Q(l.applied?`\uBA38\uC9C0 \uD050\uC5D0 ${l.queued}\uAC74 \uCD94\uAC00`:"\uBA38\uC9C0 \uAC00\uB2A5\uD55C \uD589\uC774 \uC5C6\uC2B5\uB2C8\uB2E4",l.applied?"success":"error",2400)}async function ot(l){if(!r||!l)return;let g=await Be("worker-merge-queue-remove",{bead_id:l});g&&!g.conflict&&!g.applied&&g.reason==="merge_active"&&Q("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Re(){await Be("worker-merge-queue-remove",{all:!0})}async function Me(l){if(!r||!l||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${l}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let v=await r("worker-pr-discard",{bead_id:l,expected_revision:oe()});if(ne(v),v&&v.conflict&&(v=await r("worker-pr-discard",{bead_id:l,expected_revision:oe()}),ne(v)),v&&v.discarded===!0){Q("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}v&&v.discarded===!1&&!v.conflict&&Q(`\uD3D0\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",2800)}async function ke(l,g){if(!r||!g||B.has(g))return;B.add(g),he();let v;try{v=await r(l,{bead_id:g,expected_revision:oe()}),ne(v),v&&v.conflict&&(v=await r(l,{bead_id:g,expected_revision:oe()}),ne(v))}finally{B.delete(g),he()}if(!(!v||v.conflict)){if(v.ok){Q(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Q(`\uCC98\uBD84 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}}async function Ge(l){if(!r)return;let g=await r("worker-queue-toggle",{on:l,expected_revision:oe()});ne(g),g&&g.conflict&&await r("worker-queue-toggle",{on:l,expected_revision:oe()}).then(ne)}async function nt(l){if(!r||!Number.isFinite(l))return;let g=Math.max(Vr,Math.floor(l)),v=await r("worker-queue-set-slots",{slots:g,expected_revision:oe()});ne(v),v&&v.conflict&&await r("worker-queue-set-slots",{slots:g,expected_revision:oe()}).then(ne)}function Ne(){let l=we(),g=u?u.selectBoardColumn(Ol,"ready"):[],v=u?u.selectBoardColumn(Ml,"blocked"):[],ee=l.bead_titles||{},re=new Map;for(let[C,Y]of Object.entries(ee))typeof Y=="string"&&Y.length>0&&re.set(C,Y);for(let C of[...g,...v])re.set(C.id,C.title||C.id);let ye=l.pr_wait||[],ve=l.pr_observations||{},$e=l.pr_activity||{},ze=l.cleanup_failed||{},_t=Object.entries(ze).map(([C,Y])=>({bead_id:C,step:Y&&Y.step?Y.step:"",reason:Y&&Y.reason?Y.reason:"",detail:Y&&typeof Y.detail=="string"?Y.detail:null,output_tail:Y&&typeof Y.output_tail=="string"&&Y.output_tail?Y.output_tail:void 0,log_path:Y&&typeof Y.log_path=="string"&&Y.log_path?Y.log_path:void 0})),h=l.queue||[],b=new Set([...h.map(C=>C.bead_id),...ye.map(C=>C.bead_id),...l.done.map(C=>C.bead_id)]),G=new Set(v.map(C=>C.id)),H=i?i.get()?.order||{}:{},te=new Set,j=[];for(let C of[...g,...v])b.has(C.id)||te.has(C.id)||Yl(C)||(te.add(C.id),j.push(C));w=jl(j,$,H);let be=l.admission||{},qt=C=>{let Y=be[C];if(!Y)return"";if(Y.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof Y.reason=="string"?Y.reason:"",qe=ie.indexOf(":");return qe>0&&qe<ie.length-1?`\u26D4 ${ie.slice(0,qe)} (${ie.slice(qe+1)})`:`\u26D4 ${ie}`},it=w.map(C=>{let Y=Kn(C),ie=G.has(C.id),qe=[];ie&&qe.push(Vl(C)),Y||qe.push("spec \uC5C6\uC74C");let ts=qt(C.id);return ts&&qe.push(ts),{id:C.id,title:C.title||C.id,reason:qe.join(" \xB7 "),draggable:Y,lane:"candidate",workflow:C.workflow,status:C.status,blocked:ie,has_spec:Y}}),pt=Fl(it,y),yr=pt.visible,vr=l.revise_parked||{},Bt=(C,Y)=>C.map(ie=>{let qe=Y==="queue"?vr[ie.bead_id]:null;return{id:ie.bead_id,title:re.get(ie.bead_id)||ie.bead_id,reason:Y==="done"?"":qt(ie.bead_id),draggable:Y!=="done",done:Y==="done",lane:Y,badges:qe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!qe,revise_action:!!qe,revise_enabled:!!qe&&!B.has(ie.bead_id),revise_title:qe?qe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${qe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:Y==="done"?Wn(l.attempts||{},ie.bead_id):null}}),Tt=l.attempts?Object.values(l.attempts):[],st=new Set;for(let C of Tt)C&&typeof C.resumed_from=="string"&&C.resumed_from.length>0&&st.add(C.resumed_from);let Xt=new Map;for(let C of Tt)Xt.set(C.bead_id,C.attempt_id);let Qt=new Map;for(let C of Tt)Qt.set(C.attempt_id,C);function $r(C){let Y=new Set,ie=C;for(;ie&&!Y.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;Y.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&Qt.get(ie.resumed_from)||null}return!1}let yt=[],at=null;for(let C of Tt){let Y=C.status==="paused"&&!st.has(C.attempt_id);C.status==="running"||Y?yt.push({bead_id:C.bead_id,attempt_id:C.attempt_id,title:re.get(C.bead_id)||C.bead_id,runner:C.runner||null,model:C.model||null,effort:C.effort||null,started_at:typeof C.started_at=="number"?C.started_at:null,resumed_from:C.resumed_from||null,paused:Y,conflict_resolution:$r(C),can_pause:typeof C.session_id=="string"&&C.session_id.length>0,usage:C.usage||null}):(C.status==="failed"||C.status==="orphaned")&&!(Xt.get(C.bead_id)!==C.attempt_id)&&typeof C.dismissed_at!="number"&&(at=C)}let W=null;if(at){let C=typeof at.session_id=="string"&&at.session_id.length>0,Y=st.has(at.attempt_id),ie=at.cause_detail;W={repo:at.repo||"",reason:at.cause||at.status,cause_detail:ie&&typeof ie.reason=="string"?{reason:ie.reason,command:typeof ie.command=="string"?ie.command:null}:null,resume_attempt_id:at.attempt_id,resume_eligible:C&&!Y,resume_reason:C?Y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let p=new Set(yt.map(C=>C.bead_id)),I=Array.isArray(l.merge_queue)?l.merge_queue:[],U=new Map;I.forEach((C,Y)=>{C&&typeof C.bead_id=="string"&&U.set(C.bead_id,Y+1)});let ge=l.merge_queue_state||{active:null,failures:{}},Oe=ge.failures||{},me=new Map;for(let C of yt)C.conflict_resolution&&(C.paused?me.has(C.bead_id)||me.set(C.bead_id,"paused"):me.set(C.bead_id,"running"));let lt=yt.filter(C=>!C.paused).length,bt=(l.workspace_info||{}).slots,Ut=typeof bt=="number"?bt:typeof l.slots=="number"?l.slots:Vr,Ce=lt>Ut,Jt=Bt(l.done,"done"),er=0,es=0,Zr=!1;for(let C of Jt){let Y=C.usage;Y&&typeof Y=="object"&&(Number.isFinite(Y.input_tokens)&&(er+=Y.input_tokens,Zr=!0),Number.isFinite(Y.output_tokens)&&(es+=Y.output_tokens,Zr=!0))}let ii=Zr?Zt({input_tokens:er,output_tokens:es}):null;return{queue:l,idToTitle:re,candidates:yr,candidate_hidden:{blocked:pt.hidden_blocked,spec:pt.hidden_spec},running:yt,live_count:lt,slots:Ut,over_cap:Ce,failure:W,waiting:Bt(h.filter(C=>!p.has(C.bead_id)),"queue"),pr_wait:ye.map(C=>ec(C.bead_id,re.get(C.bead_id)||C.bead_id,ve,ze[C.bead_id]||null,Wn(l.attempts||{},C.bead_id),$e[C.bead_id]||(F.has(C.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),me.get(C.bead_id)||null,C.external===!0,{position:U.get(C.bead_id)||0,active:ge.active===C.bead_id,failure:Oe[C.bead_id]||null})),merge_queue_length:I.length,merge_queue_running:I.length>0,done:Jt,token_total:ii,cleanup_failures:_t}}function je(l){let g=l.waiting.length>0?l.waiting[0].id:"\u2014",v=d`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,ee=l.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",re=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >오늘 완료 <b>${l.done.length}</b></span
      >`,ye=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Vr}
          step="1"
          .value=${String(l.slots)}
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
      </button>`,ve=jo({failure:l.failure,cleanupFailures:l.cleanup_failures});return N?d`<div class="worker-ribbon">
          ${v}
          <div class="worker-kpi worker-kpi--ribbon">${ee}${re}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ye}</div>
        </div>
        ${ve}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${v}${ye}</div>
        <div class="worker-kpi">
          ${ee}${re}
          ${l.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title="완료된 세션들의 토큰 합계 (입력+출력)"
                >${l.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${g}</b></span
          >
        </div>
      </div>
      ${ve}`}function Pe(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let g=l.running.some(v=>!v.paused);return d`<section
      class="worker-now${g?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${l.running.length+l.pr_wait.length}</span
        >
        ${Le(l)}
      </header>
      ${l.running.length>0?jn(l.running,Date.now(),P):""}
      ${l.pr_wait.map(v=>Gn(v))}
    </section>`}function Qe(l){let g=l.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${y.show_blocked}
        />
        🔒 blocked${g.blocked>0?` ${g.blocked}`:""}
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
        ${g.spec>0?d`<span class="worker-filter__hidden">숨김 ${g.spec}</span>`:""}
      </div>
    </div>`}function Ae(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Bl.map(l=>d`<option value=${l.value} ?selected=${$===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function Le(l){if(l.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop"
        title="대기 중인 항목을 모두 뺍니다 (진행 중인 항목은 끝까지 수행)"
      >
        일괄 머지 중단 ${l.merge_queue_length}
      </button>`;let g=l.pr_wait.filter(v=>v.merge_action&&v.merge_enabled).length;return g===0?"":d`<button
      type="button"
      class="worker-merge-all"
      title="머지 가능한 행을 모두 큐에 넣어 순서대로 머지합니다"
    >
      일괄 머지 ${g}
    </button>`}function Je(l){let g=St({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ae(),controls:Qe(l)});return N?d`<div class="worker-lanes worker-lanes--mobile">
        ${Pe(l)}
        ${St({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:E.queue,preview:Yo(l.waiting)})}
        ${g}
        ${St({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:"\uC644\uB8CC \uC5C6\uC74C",collapsible:!0,collapsed:E.done,preview:l.token_total||Yo(l.done)})}
      </div>`:d`<div class="worker-lanes">
      ${g}
      ${St({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${St({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(v=>!v.paused),body:jn(l.running,Date.now(),P)})}
      ${St({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Le(l)})}
      ${St({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${l.done.length}`,items:l.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Ue(l){E={...E,[l]:!E[l]},Gl(E),he()}function he(){let l=Ne();de(je(l),T),de(Je(l),M)}function ut(){let l=document.querySelector(".app-header");if(!l)return;let g=()=>{let v=Math.round(l.getBoundingClientRect().height);D.style.setProperty("--worker-ribbon-top",`${v}px`)};if(g(),typeof ResizeObserver=="function"){let v=new ResizeObserver(g);v.observe(l),q.push(()=>v.disconnect())}else window.addEventListener("resize",g),q.push(()=>window.removeEventListener("resize",g))}function _e(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(Hl);N=!!l.matches;let g=v=>{let ee=!!(v&&typeof v.matches=="boolean"?v.matches:l.matches);ee!==N&&(N=ee,he())};typeof l.addEventListener=="function"?(l.addEventListener("change",g),q.push(()=>l.removeEventListener("change",g))):typeof l.addListener=="function"&&(l.addListener(g),q.push(()=>l.removeListener(g)))}function Fe(l){let g=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!g)return;let v=g.dataset.beadId||"",ee=g.dataset.lane||"";m={bead_id:v,from_lane:ee};try{l.dataTransfer?.setData("text/plain",v),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function Ie(l){let g=l.target?.closest?.(".worker-pane");if(!g)return;let v=g.dataset.lane||"";v!=="candidate"&&v!=="queue"||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),g.classList.add("worker-pane--drag-over"))}function De(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function R(l,g){let v=w.find(ve=>ve.id===l);if(!v)return;let ee=w.filter(ve=>ve.id!==l),re=ee.length;if(g){let ve=g.dataset.beadId;if(ve===l)return;let $e=ee.findIndex(ze=>ze.id===ve);$e>=0&&(re=$e)}let ye=ee.slice();ye.splice(re,0,v),f.applyReorder(l,ye,re)}function O(l){let g=l.target?.closest?.(".worker-pane");if(!g)return;l.preventDefault(),g.classList.remove("worker-pane--drag-over");let v=g.dataset.lane||"",ee=m?.bead_id||l.dataTransfer?.getData("text/plain")||"",re=m?.from_lane||"";if(m=null,!ee)return;let ye=l.target?.closest?.(".worker-mini, .worker-card"),ve=Array.from(g.querySelectorAll(".worker-mini, .worker-card")),$e=ve.length;if(ye){let ze=ve.indexOf(ye);ze>=0&&($e=ze)}if(g.classList.contains("worker-pane--collapsed")&&($e=tt()),v==="candidate"){if(re==="candidate"){R(ee,ye);return}re==="queue"&&Ee(ee);return}v==="queue"&&(re==="queue"?Se(ee,$e):He(ee,$e))}function J(l){y=l,Pl(l),he()}function K(l){$=l==="board"||l==="created"||l==="spec"?l:Kr,zl($),he()}function V(l){let g=l.target?.closest?.(".worker-filter__blocked");if(g){J({...y,show_blocked:g.checked});return}let v=l.target?.closest?.(".worker-sort");if(v){K(v.value||Kr);return}let ee=l.target?.closest?.(".worker-slots__input");if(!ee)return;let re=Number.parseInt(ee.value,10);if(!Number.isFinite(re)){he();return}nt(re).then(he)}function Z(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function k(l){let g=we(),v=g.attempts?g.attempts[l]:null;P=l,A.hidden=!1,z.open({attempt_id:l,meta:Z(v)}),he()}function L(){if(!P)return;let l=we(),g=l.attempts?l.attempts[P]:null;if(g){z.updateMeta(Z(g));return}z.close()}function x(l){let g=l.target;if(g?.closest?.("#worker-exec-defaults-dialog"))return;if(g?.closest?.(".worker-exec-defaults-btn")){X.open();return}let v=g?.closest?.(".worker-banner__resume");if(v){let j=v.dataset.attemptId;j&&dt(j);return}let ee=g?.closest?.(".worker-banner__dismiss");if(ee){let j=ee.dataset.attemptId;j&&fe(j);return}if(g?.closest?.(".worker-play")){Ge(!we().auto_advance);return}let re=g?.closest?.(".worker-merge-all");if(re){re.classList.contains("worker-merge-all--stop")?Re():We();return}let ye=g?.closest?.(".worker-pane__hd--toggle");if(ye){let j=ye.dataset.lane;(j==="queue"||j==="done")&&Ue(j);return}let ve=g?.closest?.(".worker-card__place");if(ve){let j=ve.dataset.beadId;j&&!ve.disabled&&He(j,tt());return}let $e=g?.closest?.(".worker-filter__chip");if($e){let j=$e.dataset.spec;(j==="all"||j==="with"||j==="without")&&J({...y,spec:j});return}let ze=g?.closest?.(".worker-mini__merge");if(ze){le(ze.dataset.beadId||"");return}let _t=g?.closest?.(".worker-mini__merge-cancel");if(_t){ot(_t.dataset.beadId||"");return}let h=g?.closest?.(".worker-mini__discard");if(h){Me(h.dataset.beadId||"");return}let b=g?.closest?.(".worker-mini__revise-fix");if(b){ke("worker-revise-fix",b.dataset.beadId||"");return}let G=g?.closest?.(".worker-mini__revise-approve");if(G){ke("worker-revise-approve",G.dataset.beadId||"");return}if(g?.closest?.(".worker-mini__pr"))return;if(g?.closest?.(".rtile__stop")){let be=g?.closest?.(".rtile")?.dataset?.attemptId;be&&rt(be);return}if(g?.closest?.(".rtile__pause")){let be=g?.closest?.(".rtile")?.dataset?.attemptId;be&&pe(be);return}if(g?.closest?.(".rtile__resume")){let be=g?.closest?.(".rtile")?.dataset?.attemptId;be&&dt(be);return}if(g?.closest?.(".rtile__session")){let be=g?.closest?.(".rtile")?.dataset?.attemptId;be&&k(be);return}if(g?.closest?.(".worker-drawer-overlay__backdrop")){z.close();return}if(g?.closest?.(".worker-drawer-host"))return;let H=g?.closest?.(".rtile");if(H){if(g?.closest?.(".rtile__id")){let be=H.dataset.beadId;be&&Nt(be).then(qt=>{qt?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let j=H.dataset.beadId;j&&c&&c(j);return}let te=g?.closest?.(".worker-mini, .worker-card");if(te){let j=te.dataset.beadId;if(g?.closest?.(".worker-mini__id, .worker-card__id")){j&&Nt(j).then(be=>{be?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}j&&c&&c(j)}}return t.addEventListener("dragstart",Fe),t.addEventListener("dragover",Ie),t.addEventListener("dragleave",De),t.addEventListener("drop",O),t.addEventListener("click",x),t.addEventListener("change",V),_e(),ut(),u&&q.push(u.subscribe(he)),s&&q.push(s.subscribe(()=>{he(),L()})),he(),{load(){he()},destroy(){for(let l of q.splice(0))try{l()}catch{}t.removeEventListener("dragstart",Fe),t.removeEventListener("dragover",Ie),t.removeEventListener("dragleave",De),t.removeEventListener("drop",O),t.removeEventListener("click",x),t.removeEventListener("change",V);try{z.destroy()}catch{}A.hidden=!0;try{X.destroy()}catch{}de(d``,t)}}}function Xn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Xo(t,e,r,n=async()=>{},s=async()=>{}){let o=xe("views:workspace-picker"),i=null,c=!1,a=!1,u=!1;async function f(A){let _=A.target.value,P=e.getState().workspace?.current?.path||"";if(_&&_!==P){o("switching workspace to %s",_),c=!0,T();try{await r(_)}catch(z){o("workspace switch failed: %o",z)}finally{c=!1,T()}}}async function m(){let A=e.getState(),S=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!S||a)){o("git-pulling workspace %s",S),a=!0,T();try{await n(S)}catch(_){o("workspace git pull failed: %o",_)}finally{a=!1,T()}}}function w(A){let S=A.target;S&&t.contains(S)||E()}function y(A){A.key==="Escape"&&E()}function $(){u||(u=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",y),T())}function E(){u&&(u=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",y),T())}function N(){u?E():$()}async function F(A){let S=A.target,_=S.value,M=S.checked;o("toggling visibility %s \u2192 %s",_,String(M));try{await s(_,M)}catch(P){o("workspace visibility toggle failed: %o",P)}}function B(A){return A?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${c||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function q(A,S){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
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
                ${A.map(_=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${_.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${_.path}"
                        .checked=${!S.has(_.path)}
                        @change=${F}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Xn(_.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let A=e.getState(),S=A.workspace?.current,_=A.workspace?.available||[],M=new Set(A.workspace?.hidden||[]),P=S?.path||_[0]?.path||"";if(_.length===0)return d``;let z=_.filter(X=>!M.has(X.path)||X.path===P);if(z.length<=1){let X=z[0]||_[0],we=Xn(X.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${X.path}"
            >${we}</span
          >
          ${q(_,M)}
          ${B(P)}
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
          ?disabled=${c||a}
          aria-label="Select project workspace"
        >
          ${z.map(X=>d`
              <option
                value="${X.path}"
                ?selected=${X.path===P}
                title="${X.path}"
              >
                ${Xn(X.path)}
              </option>
            `)}
        </select>
        ${q(_,M)}
        ${B(P)}
        ${c||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function T(){de(D(),t)}return T(),i=e.subscribe(()=>T()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",y),de(d``,t)}}}var Qo=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Qn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Jo(t,e,r=Qn()){return{id:r,type:t,payload:e}}function ei(t={}){let e=xe("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,c=null,a=!0,u=new Map,f=[],m=new Map,w=new Set;function y(D){for(let T of Array.from(w))try{T(D)}catch{}}function $(){if(!a||c)return;o="reconnecting",e("ws reconnecting\u2026"),y(o);let D=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),T=(r.jitterRatio||0)*D,A=Math.max(0,Math.round(D+(Math.random()*2-1)*T));e("ws retry in %d ms (attempt %d)",A,i+1),c=setTimeout(()=>{c=null,q()},A)}function E(D){try{s?.send(JSON.stringify(D))}catch(T){e("ws send failed",T)}}function N(){for(o="open",e("ws open"),y(o),i=0;f.length;){let D=f.shift();D&&E(D)}}function F(D){let T;try{T=JSON.parse(String(D.data))}catch{e("ws received non-JSON message");return}if(!T||typeof T.id!="string"||typeof T.type!="string"){e("ws received invalid envelope");return}if(u.has(T.id)){let S=u.get(T.id);u.delete(T.id),T.ok?S?.resolve(T.payload):S?.reject(T.error||new Error("ws error"));return}let A=m.get(T.type);if(A&&A.size>0)for(let S of Array.from(A))try{S(T.payload)}catch(_){e("ws event handler error",_)}else e("ws received unhandled message type: %s",T.type)}function B(){o="closed",e("ws closed"),y(o);for(let[D,T]of u.entries())T.reject(new Error("ws disconnected")),u.delete(D);i+=1,$()}function q(){if(!a)return;let D=n();try{s=new WebSocket(D),e("ws connecting %s",D),o="connecting",y(o),s.addEventListener("open",N),s.addEventListener("message",F),s.addEventListener("error",()=>{}),s.addEventListener("close",B)}catch(T){e("ws connect failed %o",T),$()}}return q(),{send(D,T){if(!Qo.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let A=Qn(),S=Jo(D,T,A);return e("send %s id=%s",D,A),new Promise((_,M)=>{u.set(A,{resolve:_,reject:M,type:D}),s&&s.readyState===s.OPEN?E(S):(e("queue %s id=%s (state=%s)",D,A,o),f.push(S))})},on(D,T){m.has(D)||m.set(D,new Set);let A=m.get(D);return A?.add(T),()=>{A?.delete(T)}},onConnection(D){return w.add(D),()=>{w.delete(D)}},reconnect(){a=!0,c&&(clearTimeout(c),c=null),i=0,q()},close(){a=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function tc(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function rc(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var Jn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ti=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],ri="worker:queue",ni="ui:order",si="ui:display-policy",At="tab:board:closed",oi="beads-ui.board.closed-range";function nc(t){let e=xe("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;de(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let _=function(h,b){let G="Request failed",H="";if(h&&typeof h=="object"){let j=h;if(typeof j.message=="string"&&j.message.length>0&&(G=j.message),typeof j.details=="string")H=j.details;else if(j.details&&typeof j.details=="object")try{H=JSON.stringify(j.details,null,2)}catch{H=""}}else typeof h=="string"&&h.length>0&&(G=h);let te=b&&b.length>0?`Failed to load ${b}`:"Request failed";S.open(te,G,H)},le=function(h){return`${x.getState().workspace.current?.path||""}\0${h}`},We=function(){He&&(He().catch(()=>{}),He=null),Se=null,Ee=null},Re=function(h){rt=h;let b=()=>{rt!==h||x.getState().selected_id!==h||(rt=null,ot(h))};if(!fe){dt.then(b);return}b()},nt=function(){let h=fs(Ge);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},Ne=function(h){if(h)for(let[b,G]of Jn){if(Me.has(b)||ke.has(b))continue;let H=b===At?nt():{type:G};try{X.register(b,H)}catch(te){e("register %s store failed: %o",b,te)}ke.add(b),z.subscribeList(b,H).then(te=>{Me.set(b,te)}).catch(te=>{e("subscribe %s failed: %o",b,te),_(te,"board")}).finally(()=>{ke.delete(b)})}else Pe()},Pe=function(){for(let[h]of Jn){let b=Me.get(h);b&&(b().catch(()=>{}),Me.delete(h));try{X.unregister(h)}catch(G){e("unregister %s failed: %o",h,G)}}},Le=function(h){if(!h){Je();return}for(let[b,G]of ti)if(!(Qe.has(b)||ke.has(b))){try{X.register(b,{type:G})}catch(H){e("register %s store failed: %o",b,H)}ke.add(b),z.subscribeList(b,{type:G}).then(H=>{Qe.set(b,H)}).catch(H=>{e("subscribe %s failed: %o",b,H),_(H,"worker")}).finally(()=>{ke.delete(b)})}Ae||(P("subscribe-worker-queue",{id:ri}).catch(b=>{e("subscribe-worker-queue failed: %o",b)}),Ae=()=>P("unsubscribe-worker-queue",{id:ri}))},Je=function(){for(let[h]of ti){let b=Qe.get(h);b&&(b().catch(()=>{}),Qe.delete(h));try{X.unregister(h)}catch(G){e("unregister %s failed: %o",h,G)}}Ae&&(Ae().catch(()=>{}),Ae=null)},he=function(){Ue||(P("subscribe-ui-order",{id:ni}).catch(h=>{e("subscribe-ui-order failed: %o",h)}),Ue=()=>P("unsubscribe-ui-order",{id:ni}))},ut=function(){Ue&&(Ue().catch(()=>{}),Ue=null),oe.clear()},Fe=function(){_e||(P("subscribe-display-policy",{id:si}).catch(h=>{e("subscribe-display-policy failed: %o",h)}),_e=()=>P("unsubscribe-display-policy",{id:si}))},Ie=function(){_e&&(_e().catch(()=>{}),_e=null),ne.clear()},V=function(h){if(!h)return"Unknown";let b=h.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var c=_,a=le,u=We,f=Re,m=nt,w=Ne,y=Pe,$=Le,E=Je,N=he,F=ut,B=Fe,q=Ie,D=V;let T=document.getElementById("header-loading"),A=Ns(T),S=Mo(t),M=ei(),P=A.wrapSend((h,b)=>M.send(h,b)),z=Cs(P),X=Rs(),we=Is(),oe=Ls(),ne=hs(),tt=gs();M.on("ui-order-snapshot",h=>{let b=h;if(b&&typeof b.revision=="number")try{oe.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),M.on("display-policy-snapshot",h=>{let b=h;if(b&&b.policy&&typeof b.policy=="object")try{ne.set(b.policy)}catch{}}),M.on("session-log-snapshot",h=>{let b=h;if(b&&typeof b.attempt_id=="string")try{tt.set(b.attempt_id,Array.isArray(b.lines)?b.lines:[])}catch{}}),M.on("session-log-append",h=>{let b=h;if(b&&typeof b.attempt_id=="string")try{tt.append(b.attempt_id,b.event)}catch{}}),M.on("snapshot",h=>{let b=h,G=b&&typeof b.id=="string"?b.id:"",H=G?X.getStore(G):null;if(H&&b&&b.type==="snapshot")try{H.applyPush(b)}catch{}}),M.on("upsert",h=>{let b=h,G=b&&typeof b.id=="string"?b.id:"",H=G?X.getStore(G):null;if(H&&b&&b.type==="upsert")try{H.applyPush(b)}catch{}}),M.on("delete",h=>{let b=h,G=b&&typeof b.id=="string"?b.id:"",H=G?X.getStore(G):null;if(H&&b&&b.type==="delete")try{H.applyPush(b)}catch{}});let He=null,Se=null,Ee=null,rt=null,pe=()=>{},dt=new Promise(h=>{pe=()=>h(void 0)}),fe=!1,Be=!1;async function ot(h){let b=le(h);if(b===Se||b===Ee)return;Ee=b;let G=`detail:${h}`,H={type:"issue-detail",params:{id:h}};try{X.register(G,H)}catch(te){e("register detail store failed: %o",te)}try{let te=await z.subscribeList(G,H);if(x.getState().selected_id!==h||le(h)!==b){await te().catch(()=>{});return}He&&await He().catch(()=>{}),He=te,Se=b}catch(te){e("detail subscribe failed: %o",te),_(te,"issue details")}finally{Ee===b&&(Ee=null)}}let Me=new Map,ke=new Set,Ge=Sr;try{let h=window.localStorage.getItem(oi);ln(h)&&(Ge=h)}catch{}async function je(h){if(!ln(h)||h===Ge)return;Ge=h;try{window.localStorage.setItem(oi,h)}catch{}let b=Me.get(At);if(!b)return;Me.delete(At),await b().catch(()=>{});let G=nt();try{X.register(At,G)}catch(H){e("register %s store failed: %o",At,H)}try{let H=await z.subscribeList(At,G);Me.set(At,H)}catch(H){e("re-subscribe %s failed: %o",At,H),_(H,"board")}}let Qe=new Map,Ae=null,Ue=null,_e=null;async function De(){_e=null,ne.clear(),Ae=null;let h=x.getState().workspace.current?.path;if(h)try{await M.send("set-workspace",{path:h})}catch(b){e("workspace restore after reconnect failed: %o",b);return}Fe(),Le(x.getState().view==="worker")}async function R(){e("clearing all subscriptions for workspace switch"),Pe(),Je(),we.clear(),ut(),he(),Ie(),Fe(),We();let h=x.getState();if(h.selected_id)try{X.unregister(`detail:${h.selected_id}`)}catch{}let b=x.getState();Ne(b.view==="board"),Le(b.view==="worker"),b.selected_id&&Re(b.selected_id)}async function O(h){e("requesting workspace switch to %s",h),Be=!0;try{let b=await M.send("set-workspace",{path:h});e("workspace switch result: %o",b),b&&b.workspace&&(x.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",h),b.changed&&(await R(),Q("Switched to "+V(h),"success",2e3)))}catch(b){throw e("workspace switch failed: %o",b),Q("Failed to switch workspace","error",3e3),b}finally{Be=!1}}async function J(h){e("requesting workspace git pull for %s",h);try{let b=await M.send("git-pull-workspace",{});e("workspace git pull result: %o",b);let G=b?.status;if(G==="up_to_date"){Q("Already up to date","success",2e3);return}if(G==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+V(h),"success",2e3)}catch(b){e("workspace git pull failed: %o",b);let G=b?.code,H=b?.message;if(G==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(G==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(G==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let te=H?`: ${H}`:"";throw Q(`Git pull failed${te}`,"error",3e3),b}}async function K(h,b){e("setting workspace visibility %s \u2192 %s",h,String(b));try{await M.send("set-workspace-visibility",{path:h,visible:b}),await Z()}catch(G){e("workspace visibility update failed: %o",G),Q("Failed to update project visibility","error",3e3)}}async function Z(){try{let h=await M.send("list-workspaces",{});if(e("workspaces loaded: %o",h),h&&Array.isArray(h.workspaces)){let b=h.workspaces.map(j=>({path:j.path,database:j.database,pid:j.pid,version:j.version})),G=h.current?{path:h.current.root_dir,database:h.current.db_path}:null,H=Array.isArray(h.hidden)?h.hidden.filter(j=>typeof j=="string"):[];x.setState({workspace:{current:G,available:b,hidden:H}});let te=window.localStorage.getItem("beads-ui.workspace");te&&(!b.some(be=>be.path===te)||H.includes(te)?window.localStorage.removeItem("beads-ui.workspace"):G&&te!==G.path&&(e("restoring saved workspace preference: %s",te),await O(te)))}}catch(h){e("failed to load workspaces: %o",h)}}M.on("workspace-changed",h=>{e("workspace-changed event: %o",h),h&&h.root_dir&&(x.setState({workspace:{current:{path:h.root_dir,database:h.db_path}}}),Z(),R())});let k=!1;if(typeof M.onConnection=="function"){let h=b=>{e("ws state %s",b),b==="reconnecting"||b==="closed"?(k=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&k&&(k=!1,Q("Reconnected","success",2200),rc(x,(G,H)=>{e(`${G}: %o`,H)}),De())};M.onConnection(h)}let L="board";try{let h=window.localStorage.getItem("beads-ui.view");(h==="board"||h==="worker")&&(L=h)}catch(h){e("view parse error: %o",h)}let x=Ms({config:tc(),view:L});M.on("worker-queue-snapshot",h=>{let b=h;if(!b||!b.queue)return;let G=x.getState().workspace.current?.path;if(typeof G=="string"&&G.length>0&&b.root_dir!==G){e("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{we.set(b.queue)}catch{}});let l=Ds(x);l.start();let g=async(h,b)=>{try{return await P(h,b)}catch{return[]}};n&&No(n,x,l);let v=document.getElementById("workspace-picker");v&&Xo(v,x,O,J,K);let ee=Bo(t,(h,b)=>P(h,b));try{let h=document.getElementById("new-issue-btn");h&&h.addEventListener("click",()=>ee.open())}catch{}let re=Oo(t,{policyStore:ne,transport:(h,b)=>P(h,b),labelOptions:()=>{let h=new Set;for(let[b]of Jn)for(let G of X.snapshotFor(b)||[]){let H=G.labels;if(Array.isArray(H))for(let te of H)typeof te=="string"&&te.length>0&&h.add(te)}return Array.from(h).sort()}});try{let h=document.getElementById("display-settings-btn");h&&h.addEventListener("click",()=>re.open())}catch{}let ye=Hs(s,{gotoIssue:h=>l.gotoIssue(h),issueStores:X,transport:g,uiOrderStore:oe,displayPolicyStore:ne,closedRange:Ge,onClosedRangeChange:h=>{je(h)},onNewIssue:()=>ee.open()}),ve=Zn(o,{transport:g,issueStores:X,queueStore:we,sessionLogStore:tt,uiOrderStore:oe,gotoIssue:h=>x.setState({selected_id:h}),getWorkspacePath:()=>x.getState().workspace.current?.path}),$e=Io(i,{issueStores:X,transport:g,queueStore:we,sessionLogStore:tt,getWorkspacePath:()=>x.getState().workspace.current?.path,onNavigate:h=>{x.getState().view==="worker"?x.setState({selected_id:h}):l.gotoIssue(h)},onClose:()=>{let h=x.getState();x.setState({selected_id:null});try{l.gotoView(h.view==="worker"?"worker":"board")}catch{}}}),ze=x.getState().selected_id;ze&&(i.hidden=!1,$e.load(ze),Re(ze)),x.subscribe(h=>{let b=h.selected_id;b?(i.hidden=!1,$e.load(b),Be||Re(b)):($e.clear(),i.hidden=!0,We())});let _t=h=>{s.hidden=h.view!=="board",o.hidden=h.view!=="worker",Ne(h.view==="board"),Le(h.view==="worker"),!h.selected_id&&h.view==="board"&&ye.load(),h.view==="worker"&&ve.load(),window.localStorage.setItem("beads-ui.view",h.view)};x.subscribe(_t),_t(x.getState()),he(),Fe(),Z().finally(()=>{fe=!0,pe()}),window.addEventListener("keydown",h=>{let b=h.ctrlKey||h.metaKey,G=String(h.key||"").toLowerCase(),H=h.target,te=H&&H.tagName?String(H.tagName).toLowerCase():"",j=te==="input"||te==="textarea"||te==="select"||H&&typeof H.isContentEditable=="boolean"&&H.isContentEditable;b&&G==="n"&&(j||(h.preventDefault(),ee.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&nc(e)});export{nc as bootstrap,tc as readBootstrapConfig,rc as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
