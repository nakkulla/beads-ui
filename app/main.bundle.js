var wd=Object.create;var bo=Object.defineProperty;var kd=Object.getOwnPropertyDescriptor;var $d=Object.getOwnPropertyNames;var xd=Object.getPrototypeOf,Ad=Object.prototype.hasOwnProperty;var Sd=(e,t,r)=>t in e?bo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ho=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ed=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of $d(t))!Ad.call(e,s)&&s!==r&&bo(e,s,{get:()=>t[s],enumerable:!(n=kd(t,s))||n.enumerable});return e};var Td=(e,t,r)=>(r=e!=null?wd(xd(e)):{},Ed(t||!e||!e.__esModule?bo(r,"default",{value:e,enumerable:!0}):r,e));var ct=(e,t,r)=>Sd(e,typeof t!="symbol"?t+"":t,r);var Ai=ho((qg,xi)=>{var Qr=1e3,Jr=Qr*60,en=Jr*60,qr=en*24,Id=qr*7,Ld=qr*365.25;xi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Od(e);if(r==="number"&&isFinite(e))return t.long?Pd(e):Md(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Od(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Ld;case"weeks":case"week":case"w":return r*Id;case"days":case"day":case"d":return r*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*en;case"minutes":case"minute":case"mins":case"min":case"m":return r*Jr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Md(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=en?Math.round(e/en)+"h":t>=Jr?Math.round(e/Jr)+"m":t>=Qr?Math.round(e/Qr)+"s":e+"ms"}function Pd(e){var t=Math.abs(e);return t>=qr?cs(e,t,qr,"day"):t>=en?cs(e,t,en,"hour"):t>=Jr?cs(e,t,Jr,"minute"):t>=Qr?cs(e,t,Qr,"second"):e+" ms"}function cs(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Ei=ho((Fg,Si)=>{function Dd(e){r.debug=r,r.default=r,r.coerce=u,r.disable=a,r.enable=s,r.enabled=i,r.humanize=Ai(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let h=0;h<p.length;h++)f=(f<<5)-f+p.charCodeAt(h),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,h=null,R,A;function L(...q){if(!L.enabled)return;let Y=L,X=Number(new Date),z=X-(f||X);Y.diff=z,Y.prev=f,Y.curr=X,f=X,q[0]=r.coerce(q[0]),typeof q[0]!="string"&&q.unshift("%O");let I=0;q[0]=q[0].replace(/%([a-zA-Z%])/g,(D,k)=>{if(D==="%%")return"%";I++;let U=r.formatters[k];if(typeof U=="function"){let ne=q[I];D=U.call(Y,ne),q.splice(I,1),I--}return D}),r.formatArgs.call(Y,q),(Y.log||r.log).apply(Y,q)}return L.namespace=p,L.useColors=r.useColors(),L.color=r.selectColor(p),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(R!==r.namespaces&&(R=r.namespaces,A=r.enabled(p)),A),set:q=>{h=q}}),typeof r.init=="function"&&r.init(L),L}function n(p,f){let h=r(this.namespace+(typeof f>"u"?":":f)+p);return h.log=this.log,h}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(p,f){let h=0,R=0,A=-1,L=0;for(;h<p.length;)if(R<f.length&&(f[R]===p[h]||f[R]==="*"))f[R]==="*"?(A=R,L=h,R++):(h++,R++);else if(A!==-1)R=A+1,L++,h=L;else return!1;for(;R<f.length&&f[R]==="*";)R++;return R===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function i(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function u(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Si.exports=Dd});var Ti=ho((Pt,us)=>{Pt.formatArgs=qd;Pt.save=Fd;Pt.load=jd;Pt.useColors=Nd;Pt.storage=Bd();Pt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Pt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Nd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function qd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+us.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Pt.log=console.debug||console.log||(()=>{});function Fd(e){try{e?Pt.storage.setItem("debug",e):Pt.storage.removeItem("debug")}catch{}}function jd(){let e;try{e=Pt.storage.getItem("debug")||Pt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Bd(){try{return localStorage}catch{}}us.exports=Ei()(Pt);var{formatters:Ud}=us.exports;Ud.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var gn=globalThis,ns=gn.trustedTypes,ci=ns?ns.createPolicy("lit-html",{createHTML:e=>e}):void 0,vo="$lit$",pr=`lit$${Math.random().toFixed(9).slice(2)}$`,wo="?"+pr,Cd=`<${wo}>`,Mr=document,bn=()=>Mr.createComment(""),hn=e=>e===null||typeof e!="object"&&typeof e!="function",ko=Array.isArray,mi=e=>ko(e)||typeof e?.[Symbol.iterator]=="function",yo=`[ 	
\f\r]`,mn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ui=/-->/g,di=/>/g,Lr=RegExp(`>|${yo}(?:([^\\s"'>=/]+)(${yo}*=${yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pi=/'/g,fi=/"/g,gi=/^(?:script|style|textarea|title)$/i,$o=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=$o(1),$r=$o(2),Ig=$o(3),Bt=Symbol.for("lit-noChange"),gt=Symbol.for("lit-nothing"),_i=new WeakMap,Or=Mr.createTreeWalker(Mr,129);function bi(e,t){if(!ko(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ci!==void 0?ci.createHTML(t):t}var hi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=mn;for(let i=0;i<r;i++){let u=e[i],d,p,f=-1,h=0;for(;h<u.length&&(a.lastIndex=h,p=a.exec(u),p!==null);)h=a.lastIndex,a===mn?p[1]==="!--"?a=ui:p[1]!==void 0?a=di:p[2]!==void 0?(gi.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Lr):p[3]!==void 0&&(a=Lr):a===Lr?p[0]===">"?(a=s??mn,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Lr:p[3]==='"'?fi:pi):a===fi||a===pi?a=Lr:a===ui||a===di?a=mn:(a=Lr,s=void 0);let R=a===Lr&&e[i+1].startsWith("/>")?" ":"";o+=a===mn?u+Cd:f>=0?(n.push(d),u.slice(0,f)+vo+u.slice(f)+pr+R):u+pr+(f===-2?i:R)}return[bi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},yn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,u=this.parts,[d,p]=hi(t,r);if(this.el=e.createElement(d,n),Or.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Or.nextNode())!==null&&u.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(vo)){let h=p[a++],R=s.getAttribute(f).split(pr),A=/([.?@])?(.*)/.exec(h);u.push({type:1,index:o,name:A[2],strings:R,ctor:A[1]==="."?os:A[1]==="?"?as:A[1]==="@"?is:Dr}),s.removeAttribute(f)}else f.startsWith(pr)&&(u.push({type:6,index:o}),s.removeAttribute(f));if(gi.test(s.tagName)){let f=s.textContent.split(pr),h=f.length-1;if(h>0){s.textContent=ns?ns.emptyScript:"";for(let R=0;R<h;R++)s.append(f[R],bn()),Or.nextNode(),u.push({type:2,index:++o});s.append(f[h],bn())}}}else if(s.nodeType===8)if(s.data===wo)u.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(pr,f+1))!==-1;)u.push({type:7,index:o}),f+=pr.length-1}o++}}static createElement(t,r){let n=Mr.createElement("template");return n.innerHTML=t,n}};function Pr(e,t,r=e,n){if(t===Bt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=hn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Pr(e,s._$AS(e,t.values),s,n)),t}var ss=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Mr).importNode(r,!0);Or.currentNode=s;let o=Or.nextNode(),a=0,i=0,u=n[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new Xr(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new ls(o,this,t)),this._$AV.push(d),u=n[++i]}a!==u?.index&&(o=Or.nextNode(),a++)}return Or.currentNode=Mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=gt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Pr(this,t,r),hn(t)?t===gt||t==null||t===""?(this._$AH!==gt&&this._$AR(),this._$AH=gt):t!==this._$AH&&t!==Bt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==gt&&hn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=yn.createElement(bi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ss(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=_i.get(t.strings);return r===void 0&&_i.set(t.strings,r=new yn(t)),r}k(t){ko(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(bn()),this.O(bn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=gt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=gt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Pr(this,t,r,0),a=!hn(t)||t!==this._$AH&&t!==Bt,a&&(this._$AH=t);else{let i=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=Pr(this,i[n+u],r,u),d===Bt&&(d=this._$AH[u]),a||(a=!hn(d)||d!==this._$AH[u]),d===gt?t=gt:t!==gt&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===gt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},os=class extends Dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===gt?void 0:t}},as=class extends Dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==gt)}},is=class extends Dr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Pr(this,t,r,0)??gt)===Bt)return;let n=this._$AH,s=t===gt&&n!==gt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==gt&&(n===gt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ls=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Pr(this,t)}},yi={M:vo,P:pr,A:wo,C:1,L:hi,R:ss,D:mi,V:Pr,I:Xr,H:Dr,N:as,U:is,B:os,F:ls},Rd=gn.litHtmlPolyfillSupport;Rd?.(yn,Xr),(gn.litHtmlVersions??(gn.litHtmlVersions=[])).push("3.3.1");var Qe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(bn(),o),o,void 0,r??{})}return s._$AI(e),s};var Dt="today",or=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ut(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function vi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function wi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ki(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function $i(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ci=Td(Ti(),1);function _t(e){return(0,Ci.default)(`beads-ui:${e}`)}function Zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fr(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Li(e,t){let r=Zt(e.created_at),n=Zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Oi(e,t){let r=Zt(e.updated_at),n=Zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Mi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Zt(e.created_at),o=Zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Pi(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Wd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ri(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ii(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Wd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Di(e,t){let r=Ri(e),n=Ri(t);if(r!==n)return r<n?-1:1;let s=Ii(e),o=Ii(t);if(s!==o)return s<o?-1:1;let a=Zt(e&&e.created_at),i=Zt(t&&t.created_at);if(a!==i)return a<i?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var xo=2**20;function tn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Zt(e&&e.created_at)}function ds(e){return(t,r)=>{let n=tn(t,e),s=tn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:tn(i,r)-xo};if(!i)return{rank:tn(a,r)+xo};let u=tn(a,r),d=tn(i,r),p=(u+d)/2;return u<p&&p<d?{rank:p}:{renormalize:n.map((f,h)=>({bead_id:f.id,rank:h*xo}))}}function So(e,t={}){let r=_t(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,u=t.sort||Fr;function d(){for(let h of Array.from(a))try{h()}catch{}}function p(){s=Array.from(n.values()).sort(u)}function f(h){if(i||!h||h.id!==e)return;let R=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,R),!(R<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(R<=o)return;n.clear();let A=Array.isArray(h.issues)?h.issues:[];for(let L of A)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);p(),o=R,d();return}if(h.type==="upsert"){let A=h.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let L=n.get(A.id);if(!L)n.set(A.id,A);else{let q=Number.isFinite(L.updated_at)?L.updated_at:0,Y=Number.isFinite(A.updated_at)?A.updated_at:0;if(q<=Y){for(let X of Object.keys(L))X in A||delete L[X];for(let[X,z]of Object.entries(A))L[X]=z}}p()}o=R,d()}else if(h.type==="delete"){let A=String(h.issue_id||"");A&&(n.delete(A),p()),o=R,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function ps(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ni(e){let t=_t("subs"),r=new Map,n=new Map;function s(i,u){t("applyDelta %s +%d ~%d -%d",i,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let p=Array.isArray(u.added)?u.added:[],f=Array.isArray(u.updated)?u.updated:[],h=Array.isArray(u.removed)?u.removed:[];for(let R of Array.from(d)){let A=r.get(R);if(!A)continue;let L=A.itemsById;for(let q of p)typeof q=="string"&&q.length>0&&L.set(q,!0);for(let q of f)typeof q=="string"&&q.length>0&&L.set(q,!0);for(let q of h)typeof q=="string"&&q.length>0&&L.delete(q)}}async function o(i,u){let d=ps(u);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==d){let h=n.get(f.key);h&&(h.delete(i),h.size===0&&n.delete(f.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:u.type,params:u.params})}catch(f){let h=r.get(i)||null;if(h){let R=n.get(h.key);R&&(R.delete(i),R.size===0&&n.delete(h.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let h=n.get(f.key);h&&(h.delete(i),h.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ps,selectors:{getIds(i){let u=r.get(i);return u?Array.from(u.itemsById.keys()):[]},has(i,u){let d=r.get(i);return d?d.itemsById.has(u):!1},count(i){let u=r.get(i);return u?u.itemsById.size:0},getItemsById(i){let u=r.get(i),d={};if(!u)return d;for(let p of u.itemsById.keys())d[p]=!0;return d}}}}function qi(){let e=_t("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let u of Array.from(n))try{u()}catch{}}function a(u,d,p){let f=d?ps(d):"",h=r.get(u)||"",R=t.has(u);if(e("register %s key=%s (prev=%s)",u,f,h),R&&h&&f&&h!==f){let A=t.get(u);if(A)try{A.dispose()}catch{}let L=s.get(u);if(L){try{L()}catch{}s.delete(u)}let q=So(u,p);t.set(u,q);let Y=q.subscribe(()=>o());s.set(u,Y)}else if(!R){let A=So(u,p);t.set(u,A);let L=A.subscribe(()=>o());s.set(u,L)}return r.set(u,f),()=>i(u)}function i(u){e("unregister %s",u),r.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let p=s.get(u);if(p){try{p()}catch{}s.delete(u)}}return{register:a,unregister:i,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return n.add(u),()=>n.delete(u)}}}function Fi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ji(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Bi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Eo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function zd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Hd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Ui(e){let t=_t("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):zd(n),a=Hd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Eo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Eo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Gd=Object.freeze({workspace_config:{default_workspace:null}});function Wi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Gd.workspace_config.default_workspace}}}function zi(e={}){let t=_t("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Wi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Wi(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),u=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!i&&!u||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Hi(e){let t=_t("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function u(d){return async(f,h)=>{let R=s++,A=Date.now();n.set(R,{type:f,start_ts:A}),t("request start id=%d type=%s count=%d",R,f,r+1),a();let L=!1,q=()=>{L||(L=!0,n.delete(R),i())},Y=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",R,f,Date.now()-A),q())},3e4);try{let X=await d(f,h),z=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",R,f,z),X}catch(X){let z=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",R,f,z,X),X}finally{clearTimeout(Y),q()}}}return o(),{wrapSend:u,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function fs(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(Pi),u;switch(i){case"created_desc":return u.sort(Fr),u;case"created_asc":return u.sort(Li),u;case"updated_desc":return u.sort(Oi),u;case"priority":return u.sort(Mi),u;case"manual":default:{let d=r();return d?u.sort(ds(d)):u.sort(Fr),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function kt(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Nt(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let u=Math.floor(i/7);if(i<30)return`${u}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function _s(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function ms(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let u={...a.order};for(let d of i)u[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:u})}async function o(a,i,u){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(Ao(i,u,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(h);let R=n(Ao(i,u,h.order),a);s(h,R);let A=await t("ui-order-set",{expected_revision:h.revision,entries:R});A&&A.applied&&r.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function gs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function To(e,t){return!t||typeof e!="string"||e.length===0||gs(t.visible_labels).includes(e)?!0:gs(t.hidden_labels).includes(e)?!1:!gs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function bs(e,t){return gs(e).filter(r=>To(r,t))}function xr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Vd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Vi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Gi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Kd={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Yd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ki(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function Zd(e){if(!e||e.fill==="none"||!e.approval_state)return Ki(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Xd(e,t,r){let n=Vd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Kd[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let u=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${u}>
        ${Vi[e]||e}
      </div>
    </div>
  `}function hs(e,t){if(!e||!e.stages)return"";let r=Gi[e.route]||Gi.spec_backed,n=e.stages,s=Yd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Vi[a]||a} ${a==="plan"?Zd(n[a]||{}):Ki(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Xd(a,n[a]||{},a===s))}
    </div>
  `}function Qd(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Yi=2;function Jd(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Yi).join(", "),s=r.length-Yi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Co(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Zi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Br(e){return`${e.kind}:${Zi(e)}@${e.sha}`}function ys(e,t){if(!e)return null;let r=Co(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Co(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${Br(t)}`:"";return{kind:e.kind,label:i,title:`${u}${d}`}}function Xi(e,t){let r=ys(e,t);return r?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function ep(e){if(!e)return null;let t=Co(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Br(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function tp(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&xr(r,"route")){let i=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&xr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&xr(r,"pr")){let i=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Xi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Br(i)}`}
        >${`exec ${i.kind==="delegated"?Zi(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of bs(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&xr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),xr(r,"blocked")&&s.push(...Jd(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&xr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function rp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function np(e){let t=Nt(e.created_at),r=Nt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${kt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function sp(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Di):r.children;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?l`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:l`<span class="board-card__roll-none">children 없음</span>`}
        ${np(e)}
      </div>
      ${n>0&&r.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?l`<div class="board-card__roll-list">
            ${o.map((a,i)=>l`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${u=>t.onChildClick&&t.onChildClick(u,a.id)}
                >
                  <span class=${rp(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${ys(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?l`<span class="board-card__roll-child-chips">
                        ${Xi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${ep(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function vs(e,t){let r=Qd(e.priority);return l`
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
        ${r?l`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${tp(e,t)}
      ${e.workflow&&xr(t.policy||null,"stepper")?hs(e.workflow,e.status):""}
      ${sp(e,t)}
    </article>
  `}function rn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
        ${n?l`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${or.map(o=>l`<option
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
        ${e.items.map(o=>vs(o,t))}
      </div>
    </section>
  `}function Qi(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>vs(n,t))}
        </div>
      </div>
    </dialog>
  `}var op=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ap=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],ip=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function lp(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
      ${r.label_menu_open?l`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?l`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>l`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?l`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Ji(e,t,r){return l`
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
        ${op.map(n=>l`<option
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
        ${ap.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${lp(e,t,r)}
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
        ${ip.map(n=>l`<option
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
  `}var cp=200,up={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},dp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),el="beads-ui.board.sort",tl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function pp(){try{let e=window.localStorage.getItem(el);if(e&&tl.has(e))return e}catch{}return"created_desc"}function rl(e,t){let r=_t("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Dt,h=s?fs(s,a):null,R=ms({transport:o,uiOrderStore:a}),A=[],L=[],q=[],Y=[],X=[],z=[],I=!1,S=0,D=pp(),k=new Map,U=new Map,ne=new Map,ce=new Set,F={search:"",priority:"",type:"",labels:[]},M=!1,de=null;function $e(W){return String(W.status||"open")==="open"}function he(W){let te=String(W.status||"open");return te==="open"||te==="blocked"}function De(W){let te=F.search.trim().toLowerCase(),me=F.priority,w=F.type,C=F.labels;return W.filter(N=>{if(te){let J=String(N.id||"").toLowerCase(),ke=String(N.title||"").toLowerCase();if(!J.includes(te)&&!ke.includes(te))return!1}if(me!==""&&String(N.priority)!==me||w!==""&&String(N.issue_type||"")!==w)return!1;if(C.length>0){let J=Array.isArray(N.labels)?N.labels:[];if(!C.some(ke=>J.includes(ke)))return!1}return!0})}function Je(){let W=new Set;for(let te of[A,L,q,Y,X,z])for(let me of te){let w=Array.isArray(me.labels)?me.labels:[];for(let C of w)typeof C=="string"&&C.length>0&&W.add(C)}return Array.from(W).sort()}function He(){return F.search.trim()!==""||F.priority!==""||F.type!==""||F.labels.length>0}function fe(){try{if(h){let W=h.selectBoardColumn("tab:board:in-progress","in_progress",D),te=h.selectBoardColumn("tab:board:blocked","blocked",D).filter(he),me=new Set(W.map(Ce=>Ce.id)),w=h.selectBoardColumn("tab:board:ready","ready",D).filter(Ce=>$e(Ce)&&!me.has(Ce.id)),C=h.selectBoardColumn("tab:board:resolved","resolved",D),N=h.selectBoardColumn("tab:board:deferred","deferred",D),J=h.selectBoardColumn("tab:board:closed","closed").slice(0,cp),ke=[...te,...w,...W,...C,...J];Pe(ke);let Q=new Set;for(let Ce of ke)Ce&&Ce.id&&!Ro(Ce)&&Q.add(Ce.id);let Se=!He();A=Se?vn(te,Q):te,L=Se?vn(w,Q):w,q=Se?vn(W,Q):W,Y=Se?vn(C,Q):C,X=N,S=N.length,z=Se?vn(J,Q):J,k=new Map;for(let Ce of A)k.set(Ce.id,"open");for(let Ce of L)k.set(Ce.id,"open");for(let Ce of q)k.set(Ce.id,"in_progress");for(let Ce of Y)k.set(Ce.id,"resolved");for(let Ce of X)k.set(Ce.id,"deferred");for(let Ce of z)k.set(Ce.id,"closed");U=new Map;for(let Ce of A)U.set(Ce.id,"blocked-col");for(let Ce of L)U.set(Ce.id,"ready-col");for(let Ce of q)U.set(Ce.id,"in-progress-col");for(let Ce of Y)U.set(Ce.id,"resolved-col");for(let Ce of z)U.set(Ce.id,"closed-col")}P()}catch{A=[],L=[],q=[],Y=[],X=[],z=[],ne=new Map,P()}}function Pe(W){let te=new Map;for(let w of W)w&&w.id&&!te.has(w.id)&&te.set(w.id,w);let me=new Map;for(let w of te.values()){let C=Ro(w);if(!C)continue;let N=me.get(C);N||(N=[],me.set(C,N)),N.push({id:w.id,title:w.title,status:w.status,metadata:w.metadata,workflow:w.workflow,created_at:w.created_at,updated_at:w.updated_at})}ne=me}function ge(W){let te=ne.get(W)||[],me=0;for(let C of te)(C.status==="resolved"||C.status==="closed")&&(me+=1);let w=_s(te);return{total:te.length,count:me,current:w,children:te}}function xe(W){return!ce.has(W)}function Re(W,te){W.preventDefault(),W.stopPropagation(),ce.has(te)?ce.delete(te):ce.add(te),P()}function je(W,te){W.preventDefault(),W.stopPropagation(),n(te)}function Ae(W,te){W.preventDefault(),W.stopPropagation(),n(te)}function Be(W,te){de||n(te)}function Ye(W,te){W.preventDefault(),W.stopPropagation(),fp(te).then(me=>{me&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function Ee(W,te){de=te,W.dataTransfer&&(W.dataTransfer.setData("text/plain",te),W.dataTransfer.effectAllowed="move"),W.target.classList.add("board-card--dragging")}function ot(W){W.target.classList.remove("board-card--dragging"),qe(),setTimeout(()=>{de=null},0)}function K(W){let te=String(W.target.value||"");!te||te===f||(f=te,d&&d(te),P())}function B(){return i?i.get():null}function se(W){let te=u?u.get():null,me=te?te.cleanup_failed:null;if(!me||typeof me!="object"||Array.isArray(me))return null;let w=me[W];return!w||typeof w!="object"||Array.isArray(w)?null:w}let Le={onCardClick:Be,onCopyId:Ye,onDragStart:Ee,onDragEnd:ot,onClosedRangeChange:K,rollupFor:ge,isExpanded:xe,onRollupToggle:Re,onChildClick:je,onFromChipClick:Ae,cleanupFailureFor:se,get policy(){return B()}};function Ue(W,te){de||(pe(),n(te))}function Ve(W,te){W.preventDefault(),W.stopPropagation(),pe(),n(te)}let Ie={...Le,onCardClick:Ue,onChildClick:Ve,onFromChipClick:Ve,get policy(){return B()}};function lt(W){let te=W.target,me=e.querySelector(".board-filter__labels");te&&me&&me.contains(te)||ee()}function Ze(W){W.key==="Escape"&&ee()}function G(){M||(M=!0,document.addEventListener("mousedown",lt),document.addEventListener("keydown",Ze),P())}function ee(){M&&(M=!1,document.removeEventListener("mousedown",lt),document.removeEventListener("keydown",Ze),P())}function Oe(W){W.key==="Escape"&&pe()}function We(){I||(I=!0,document.addEventListener("keydown",Oe),P())}function pe(){I&&(I=!1,document.removeEventListener("keydown",Oe),P())}let g={onClose:pe,onOverlayClick(W){W.target===W.currentTarget&&pe()}},x={onSearchInput(W){F.search=String(W.target.value||""),fe()},onPriorityChange(W){F.priority=String(W.target.value||""),fe()},onTypeChange(W){F.type=String(W.target.value||""),fe()},onSortChange(W){let te=String(W.target.value||"");if(!(!tl.has(te)||te===D)){D=te;try{window.localStorage.setItem(el,te)}catch{}fe()}},onDeferredToggle(){I?pe():We()},onLabelMenuToggle(){M?ee():G()},onLabelToggle(W){let te=F.labels.indexOf(W);te===-1?F.labels.push(W):F.labels.splice(te,1),fe()},onLabelClear(){F.labels.length!==0&&(F.labels=[],fe())},onNewIssue(){p&&p()}};function $(){return l`
      <div class="board-view">
        ${Ji(F,x,{sort_mode:D,deferred_popup_open:I,deferred_count:S,label_options:Je(),label_menu_open:M})}
        <div class="board-root">
          ${rn({title:"Blocked",id:"blocked-col",items:De(A)},Le)}
          ${rn({title:"Ready",id:"ready-col",items:De(L)},Le)}
          ${rn({title:"In progress",id:"in-progress-col",items:De(q)},Le)}
          ${rn({title:"Resolved",id:"resolved-col",items:De(Y)},Le)}
          ${rn({title:"Closed",id:"closed-col",items:De(z),is_closed:!0,closed_range:f},Le)}
        </div>
        ${I?Qi({items:De(X),count:S},Ie,g):""}
      </div>
    `}function P(){Qe($(),e),V()}function V(){try{let W=e.querySelector("#deferred-popup");W&&!W.open&&(typeof W.showModal=="function"?W.showModal():W.setAttribute("open",""));let te=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let me of te)Array.from(me.querySelectorAll(".board-card")).forEach((C,N)=>{C.tabIndex=N===0?0:-1})}catch{}}async function Z(W,te){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:W,status:te}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(me){r("update-status failed: %o",me),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function oe(W){switch(W){case"blocked-col":return A;case"ready-col":return L;case"in-progress-col":return q;case"resolved-col":return Y;default:return[]}}function ue(W,te,me){if(!o||!a)return;let w=oe(W),C=w.find(Se=>Se.id===te);if(!C)return;let N=w.filter(Se=>Se.id!==te),J=me.closest?me.closest(".board-card"):null,ke=N.length;if(J){let Se=J.getAttribute("data-issue-id");if(Se===te)return;let Ce=N.findIndex(ft=>ft.id===Se);Ce>=0&&(ke=Ce)}let Q=N.slice();Q.splice(ke,0,C),R.applyReorder(te,Q,ke)}function qe(){for(let W of Array.from(e.querySelectorAll(".board-column--drag-over")))W.classList.remove("board-column--drag-over")}let we=null;e.addEventListener("dragover",W=>{W.preventDefault(),W.dataTransfer&&(W.dataTransfer.dropEffect="move");let me=W.target.closest(".board-column");me&&me!==we&&(we&&we.classList.remove("board-column--drag-over"),me.classList.add("board-column--drag-over"),we=me)}),e.addEventListener("dragleave",W=>{let te=W.relatedTarget;(!te||!e.contains(te))&&we&&(we.classList.remove("board-column--drag-over"),we=null)}),e.addEventListener("drop",W=>{W.preventDefault(),we&&(we.classList.remove("board-column--drag-over"),we=null);let te=W.target,me=te.closest(".board-column");if(!me)return;let w=W.dataTransfer?.getData("text/plain")||"";if(!w)return;let C=me.id,N=U.get(w);if(N&&N===C){if(dp.has(C)){if(D!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ue(C,w,te)}return}let J=up[C];if(!J){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}k.get(w)!==J&&Z(w,J)}),e.addEventListener("keydown",W=>{let te=W.target;if(!(te instanceof HTMLElement))return;let me=String(te.tagName||"").toLowerCase();if(me==="input"||me==="textarea"||me==="select"||me==="button"||me==="a"||te.isContentEditable===!0)return;let w=te.closest(".board-card");if(!w)return;let C=String(W.key||"");if(C==="Enter"||C===" "){W.preventDefault();let Q=w.getAttribute("data-issue-id");Q&&n(Q);return}if(C!=="ArrowUp"&&C!=="ArrowDown"&&C!=="ArrowLeft"&&C!=="ArrowRight")return;W.preventDefault();let N=w.closest(".board-column");if(!N)return;let J=Array.from(N.querySelectorAll(".board-card")),ke=J.indexOf(w);if(C==="ArrowDown"&&ke<J.length-1){Te(w,J[ke+1]);return}if(C==="ArrowUp"&&ke>0){Te(w,J[ke-1]);return}if(C==="ArrowLeft"||C==="ArrowRight"){let Q=Array.from(e.querySelectorAll(".board-column")),Se=Q.indexOf(N),Ce=C==="ArrowRight"?1:-1,ft=Se+Ce;for(;ft>=0&&ft<Q.length;){let Et=Q[ft].querySelector(".board-card");if(Et){Te(w,Et);return}ft+=Ce}}});function Te(W,te){try{W.tabIndex=-1,te.tabIndex=0,te.focus()}catch{}}let be=null;h&&h.subscribe&&(be=h.subscribe(()=>{try{fe()}catch{}}));let ze=null;i&&i.subscribe&&(ze=i.subscribe(()=>{try{fe()}catch{}}));let rt=null;return u&&u.subscribe&&(rt=u.subscribe(()=>{P()})),{async load(){r("load"),fe()},clear(){ee(),pe(),be&&(be(),be=null),ze&&(ze(),ze=null),rt&&(rt(),rt=null),e.replaceChildren(),A=[],L=[],q=[],Y=[],X=[],z=[],k=new Map,U=new Map}}}function Ro(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function vn(e,t){return e.filter(r=>{let n=Ro(r);return!(n&&t.has(n))})}async function fp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Xt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function _p(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(u=>{let d=p=>{typeof r.close=="function"&&r.close(),r.remove(),u(p)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function fr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await _p(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var mp=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],nl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},gp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function St(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ht(e){return typeof e=="string"&&e.length>0?e:null}function ws(e){return e.startsWith("gpt-")?e.slice(4):e}function bt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function il(e,t,r){let n=ht(t[e]);if(n!==null)return{value:n,source:"pin"};let s=ht(r[e]);return s===null?null:{value:s,source:"global"}}function wn(e,t,r,n){return il(e,t,r)||{value:n,source:"base"}}function sl(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&St(s?.[t])){let a=ht(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&St(s)){for(let a of Object.values(s))if(St(a)){let i=ht(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return ht(n?.runners?.[o]?.models?.[e]?.id)||e}function bp(e,t){return ht(t?.review?.reviewers?.[e]?.model)||e}function kn(e,t,r=!1){if(e==="default")return bt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?ws(e):e;return bt(e,t,n,e,"explicit")}function hp(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];St(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(St(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function ol(e){return bt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function al(e,t,r){let n=il(e,t,r);return n?kn(n.value,n.source):bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function nn(e){let t=St(e.pin)?e.pin:{},r=St(e.global)?e.global:{},n=St(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&St(n.session)?n.session:null,o=n?.supported===!0&&St(n.orchestration)?n.orchestration:null,a=St(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let u=wn("workflow_mode",t,r,ht(s.workflow_mode_default));i.workflow_mode=u.source==="base"?bt(u.value,"base",u.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",u.value,"default"):kn(u.value,u.source);for(let A of["spec_review","plan_review","impl_review"]){let L=`${A}_model`,q=ht(A==="plan_review"?u.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),Y=wn(L,t,r,q);if(Y.value===null)i[L]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(Y.value!=="self"&&Y.value!=="skip"&&!St(s.review?.reviewers?.[Y.value]))i[L]=ol(bt(Y.value,Y.source,"",null,"explicit"));else{let X=bp(Y.value,s);i[L]=bt(Y.value,Y.source,ws(X),X,Y.source==="base"?"default":"explicit")}}for(let[A,L]of Object.entries(nl)){let q=i[L].value;if(q==="self"||q==="skip"){i[A]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let Y=ht(s.review?.reviewers?.[q||""]?.effort),X=wn(A,t,r,Y);i[A]=X.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(X.value,X.source,X.value,X.value,X.source==="base"?"default":"explicit")}let d=St(s.implementation?.default)?s.implementation.default:{},p=ht(e.route),f=p!==null&&["quick_fix","spec_backed","full_plan"].includes(p),h=St(s.implementation?.route_defaults)?s.implementation.route_defaults:{},R=f&&St(h[p])?h[p]:{};for(let A of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let L=wn(A,t,r,A==="impl_dispatch"?ht(R.dispatch)||ht(d.dispatch):ht(d[A.replace("impl_","")]));i[A]=L.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let A of["impl_runtime","impl_model","impl_effort","impl_speed"])i[A]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let A=i.impl_runtime.value==="inherit"?ht(e.controller_runtime):i.impl_runtime.value,L=A?hp(A,s,a):[];if(i.impl_model.value!=="auto"&&L.length>0&&!L.includes(i.impl_model.value))i.impl_model=ol(i.impl_model);else{let q=sl(i.impl_model.value,A,s,a);i.impl_model.display=ws(q),i.impl_model.full_value=q}}if(i.impl_effort.value==="auto"){let A=ht(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),L=A?ht(s.implementation?.effort_by_transport?.[A]?.auto):null;L&&!gp.has(L)?(i.impl_effort.display=`${L} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=L,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",i.impl_speed.source))}}else for(let u of mp.filter(d=>!d.startsWith("orchestration_")))i[u]=al(u,t,r);if(!s){for(let[u,d]of Object.entries(nl))(i[d].value==="self"||i[d].value==="skip")&&(i[u]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let u of["impl_runtime","impl_model","impl_effort","impl_speed"])i[u]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[u]=al(u,t,r);continue}let d=u.replace("orchestration_",""),p=ht(o[d]),f=wn(u,t,r,p);if(u==="orchestration_effort"&&f.source==="base"){i[u]=bt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(f.value===null){i[u]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(u==="orchestration_model"){let h=f.source==="base"?ht(o.model_id)||f.value:sl(f.value,null,s,a);i[u]=bt(f.value,f.source,ws(h),h,f.source==="base"?"default":"explicit");continue}if(f.value==="default"){i[u]=f.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",f.source);continue}i[u]=kn(f.value,f.source)}return i}function yp(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function ks(e){let t=St(e.pin)?e.pin:{},r=St(e.global)?e.global:{},n=p=>nn({pin:e.layer==="pin"?p:t,global:e.layer==="pin"?r:p,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],u=ht(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:yp(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:d.map(p=>{let f=n({...s,[e.key]:p})[e.key];return{value:p,label:f.display,full_value:f.full_value}})}}function sn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let u=!1,d=f=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>d(n.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var pl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function $t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var _r=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],$n=[..._r,"reasoning_output_tokens"],vp=["implementation","review-consult"];function Io(e){let t=0;for(let r of _r)t+=$t(e?.[r]);return t}function wp(e){return!e||typeof e!="object"?!1:_r.some(t=>Number.isFinite(e[t]))}function ll(e){return!e||typeof e!="object"?!1:$n.some(t=>Number.isFinite(e[t]))}function kp(e){let t={};for(let r of $n)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function cl(e){let t={};for(let r of $n)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ul(e,t){return e==="codex"?$t(t.input_tokens)+$t(t.output_tokens):Io(t)}function $p(e){return e==="claude"?"Claude":"Codex"}function xp(e){return`\u03C4 ${fl(e)}`}function Ap(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${$t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${$t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${$t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${$t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${$t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${$t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${$t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(pl),o.join(`
`)}function xt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${$p(r)} ${xp(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ap(r,n)})}return t}function xs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let u of $n)Number.isFinite(a.breakdown[u])&&(i.breakdown[u]=$t(i.breakdown[u])+$t(a.breakdown[u]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Lo(e){return!e||typeof e!="object"?null:Wt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Sp(e){return e==="codex"?"codex":"claude"}function Er(){return{subtotal:0,breakdown:kp(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function $s(e,t,r){e.subtotal+=t.subtotal;for(let n of $n)Number.isFinite(t.usage[n])&&(e.breakdown[n]=$t(e.breakdown[n])+$t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function dl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function fl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function on(e){return wp(e)?`\u03C4 ${fl(Io(e))}`:null}function Qt(e){let t=on(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function an(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${$t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${$t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${$t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${$t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Io(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(pl),r.join(`
`)}function Wt(e,t){let r={claude:Er(),codex:Er()},n={orchestrator:{claude:Er(),codex:Er()},implementation:{claude:Er(),codex:Er()},"review-consult":{claude:Er(),codex:Er()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let u=i.usage;if(ll(u)){let p=Sp(i.runner),f=cl(u),h={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:ul(p,f)};f.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),$s(r[p],h,!0),$s(n.orchestrator[p],h,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!vp.includes(p.role)||!ll(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let h=cl(p.usage),R={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:ul("codex",h)};R.receipt_id=f,typeof p.model=="string"&&(R.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(R.effort=p.effort),typeof p.session_id=="string"?R.session_id=p.session_id:typeof p.thread_id=="string"&&(R.session_id=p.thread_id),typeof p.turn_id=="string"&&(R.turn_id=p.turn_id),typeof p.completed_at=="string"&&(R.completed_at=p.completed_at),h.replayed===!0&&(R.replayed=!0),$s(r.codex,R,!1),$s(n[R.role].codex,R,!1)}}let o={};for(let i of["claude","codex"]){let u=r[i];if(u.legs.length===0)continue;let d=dl(u,!1);i==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let u={};for(let d of["claude","codex"]){let p=n[i][d];p.legs.length>0&&(u[d]={...dl(p,!0),legs:p.legs})}Object.keys(u).length>0&&(a[i]=u)}return{providers:o,roles:a}}var{entries:kl,setPrototypeOf:_l,isFrozen:Ep,getPrototypeOf:Tp,getOwnPropertyDescriptor:Cp}=Object,{freeze:It,seal:zt,create:Fo}=Object,{apply:jo,construct:Bo}=typeof Reflect<"u"&&Reflect;It||(It=function(t){return t});zt||(zt=function(t){return t});jo||(jo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Bo||(Bo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var As=Lt(Array.prototype.forEach),Rp=Lt(Array.prototype.lastIndexOf),ml=Lt(Array.prototype.pop),xn=Lt(Array.prototype.push),Ip=Lt(Array.prototype.splice),Es=Lt(String.prototype.toLowerCase),Oo=Lt(String.prototype.toString),Mo=Lt(String.prototype.match),An=Lt(String.prototype.replace),Lp=Lt(String.prototype.indexOf),Op=Lt(String.prototype.trim),Jt=Lt(Object.prototype.hasOwnProperty),Rt=Lt(RegExp.prototype.test),Sn=Mp(TypeError);function Lt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return jo(e,t,n)}}function Mp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Bo(e,r)}}function tt(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Es;_l&&_l(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ep(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Pp(e){for(let t=0;t<e.length;t++)Jt(e,t)||(e[t]=null);return e}function mr(e){let t=Fo(null);for(let[r,n]of kl(e))Jt(e,r)&&(Array.isArray(n)?t[r]=Pp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=mr(n):t[r]=n);return t}function En(e,t){for(;e!==null;){let n=Cp(e,t);if(n){if(n.get)return Lt(n.get);if(typeof n.value=="function")return Lt(n.value)}e=Tp(e)}function r(){return null}return r}var gl=It(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Po=It(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Do=It(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Dp=It(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),No=It(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Np=It(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),bl=It(["#text"]),hl=It(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),qo=It(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),yl=It(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ss=It(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qp=zt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Fp=zt(/<%[\w\W]*|[\w\W]*%>/gm),jp=zt(/\$\{[\w\W]*/gm),Bp=zt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Up=zt(/^aria-[\-\w]+$/),$l=zt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Wp=zt(/^(?:\w+script|data):/i),zp=zt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),xl=zt(/^html$/i),Hp=zt(/^[a-z][.\w]*(-[.\w]+)+$/i),vl=Object.freeze({__proto__:null,ARIA_ATTR:Up,ATTR_WHITESPACE:zp,CUSTOM_ELEMENT:Hp,DATA_ATTR:Bp,DOCTYPE_NAME:xl,ERB_EXPR:Fp,IS_ALLOWED_URI:$l,IS_SCRIPT_OR_DATA:Wp,MUSTACHE_EXPR:qp,TMPLIT_EXPR:jp}),Tn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Gp=function(){return typeof window>"u"?null:window},Vp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},wl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Al(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Gp(),t=ye=>Al(ye);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Tn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:u,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:R}=e,A=u.prototype,L=En(A,"cloneNode"),q=En(A,"remove"),Y=En(A,"nextSibling"),X=En(A,"childNodes"),z=En(A,"parentNode");if(typeof a=="function"){let ye=r.createElement("template");ye.content&&ye.content.ownerDocument&&(r=ye.content.ownerDocument)}let I,S="",{implementation:D,createNodeIterator:k,createDocumentFragment:U,getElementsByTagName:ne}=r,{importNode:ce}=n,F=wl();t.isSupported=typeof kl=="function"&&typeof z=="function"&&D&&D.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:M,ERB_EXPR:de,TMPLIT_EXPR:$e,DATA_ATTR:he,ARIA_ATTR:De,IS_SCRIPT_OR_DATA:Je,ATTR_WHITESPACE:He,CUSTOM_ELEMENT:fe}=vl,{IS_ALLOWED_URI:Pe}=vl,ge=null,xe=tt({},[...gl,...Po,...Do,...No,...bl]),Re=null,je=tt({},[...hl,...qo,...yl,...Ss]),Ae=Object.seal(Fo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Be=null,Ye=null,Ee=Object.seal(Fo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ot=!0,K=!0,B=!1,se=!0,Le=!1,Ue=!0,Ve=!1,Ie=!1,lt=!1,Ze=!1,G=!1,ee=!1,Oe=!0,We=!1,pe="user-content-",g=!0,x=!1,$={},P=null,V=tt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Z=null,oe=tt({},["audio","video","img","source","image","track"]),ue=null,qe=tt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),we="http://www.w3.org/1998/Math/MathML",Te="http://www.w3.org/2000/svg",be="http://www.w3.org/1999/xhtml",ze=be,rt=!1,W=null,te=tt({},[we,Te,be],Oo),me=tt({},["mi","mo","mn","ms","mtext"]),w=tt({},["annotation-xml"]),C=tt({},["title","style","font","a","script"]),N=null,J=["application/xhtml+xml","text/html"],ke="text/html",Q=null,Se=null,Ce=r.createElement("form"),ft=function(c){return c instanceof RegExp||c instanceof Function},Et=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Se&&Se===c)){if((!c||typeof c!="object")&&(c={}),c=mr(c),N=J.indexOf(c.PARSER_MEDIA_TYPE)===-1?ke:c.PARSER_MEDIA_TYPE,Q=N==="application/xhtml+xml"?Oo:Es,ge=Jt(c,"ALLOWED_TAGS")?tt({},c.ALLOWED_TAGS,Q):xe,Re=Jt(c,"ALLOWED_ATTR")?tt({},c.ALLOWED_ATTR,Q):je,W=Jt(c,"ALLOWED_NAMESPACES")?tt({},c.ALLOWED_NAMESPACES,Oo):te,ue=Jt(c,"ADD_URI_SAFE_ATTR")?tt(mr(qe),c.ADD_URI_SAFE_ATTR,Q):qe,Z=Jt(c,"ADD_DATA_URI_TAGS")?tt(mr(oe),c.ADD_DATA_URI_TAGS,Q):oe,P=Jt(c,"FORBID_CONTENTS")?tt({},c.FORBID_CONTENTS,Q):V,Be=Jt(c,"FORBID_TAGS")?tt({},c.FORBID_TAGS,Q):mr({}),Ye=Jt(c,"FORBID_ATTR")?tt({},c.FORBID_ATTR,Q):mr({}),$=Jt(c,"USE_PROFILES")?c.USE_PROFILES:!1,ot=c.ALLOW_ARIA_ATTR!==!1,K=c.ALLOW_DATA_ATTR!==!1,B=c.ALLOW_UNKNOWN_PROTOCOLS||!1,se=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Le=c.SAFE_FOR_TEMPLATES||!1,Ue=c.SAFE_FOR_XML!==!1,Ve=c.WHOLE_DOCUMENT||!1,Ze=c.RETURN_DOM||!1,G=c.RETURN_DOM_FRAGMENT||!1,ee=c.RETURN_TRUSTED_TYPE||!1,lt=c.FORCE_BODY||!1,Oe=c.SANITIZE_DOM!==!1,We=c.SANITIZE_NAMED_PROPS||!1,g=c.KEEP_CONTENT!==!1,x=c.IN_PLACE||!1,Pe=c.ALLOWED_URI_REGEXP||$l,ze=c.NAMESPACE||be,me=c.MATHML_TEXT_INTEGRATION_POINTS||me,w=c.HTML_INTEGRATION_POINTS||w,Ae=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&ft(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Ae.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&ft(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Ae.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Ae.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Le&&(K=!1),G&&(Ze=!0),$&&(ge=tt({},bl),Re=[],$.html===!0&&(tt(ge,gl),tt(Re,hl)),$.svg===!0&&(tt(ge,Po),tt(Re,qo),tt(Re,Ss)),$.svgFilters===!0&&(tt(ge,Do),tt(Re,qo),tt(Re,Ss)),$.mathMl===!0&&(tt(ge,No),tt(Re,yl),tt(Re,Ss))),c.ADD_TAGS&&(typeof c.ADD_TAGS=="function"?Ee.tagCheck=c.ADD_TAGS:(ge===xe&&(ge=mr(ge)),tt(ge,c.ADD_TAGS,Q))),c.ADD_ATTR&&(typeof c.ADD_ATTR=="function"?Ee.attributeCheck=c.ADD_ATTR:(Re===je&&(Re=mr(Re)),tt(Re,c.ADD_ATTR,Q))),c.ADD_URI_SAFE_ATTR&&tt(ue,c.ADD_URI_SAFE_ATTR,Q),c.FORBID_CONTENTS&&(P===V&&(P=mr(P)),tt(P,c.FORBID_CONTENTS,Q)),g&&(ge["#text"]=!0),Ve&&tt(ge,["html","head","body"]),ge.table&&(tt(ge,["tbody"]),delete Be.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw Sn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Sn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=c.TRUSTED_TYPES_POLICY,S=I.createHTML("")}else I===void 0&&(I=Vp(R,s)),I!==null&&typeof S=="string"&&(S=I.createHTML(""));It&&It(c),Se=c}},nt=tt({},[...Po,...Do,...Dp]),yt=tt({},[...No,...Np]),ur=function(c){let _=z(c);(!_||!_.tagName)&&(_={namespaceURI:ze,tagName:"template"});let E=Es(c.tagName),H=Es(_.tagName);return W[c.namespaceURI]?c.namespaceURI===Te?_.namespaceURI===be?E==="svg":_.namespaceURI===we?E==="svg"&&(H==="annotation-xml"||me[H]):!!nt[E]:c.namespaceURI===we?_.namespaceURI===be?E==="math":_.namespaceURI===Te?E==="math"&&w[H]:!!yt[E]:c.namespaceURI===be?_.namespaceURI===Te&&!w[H]||_.namespaceURI===we&&!me[H]?!1:!yt[E]&&(C[E]||!nt[E]):!!(N==="application/xhtml+xml"&&W[c.namespaceURI]):!1},vt=function(c){xn(t.removed,{element:c});try{z(c).removeChild(c)}catch{q(c)}},Tt=function(c,_){try{xn(t.removed,{attribute:_.getAttributeNode(c),from:_})}catch{xn(t.removed,{attribute:null,from:_})}if(_.removeAttribute(c),c==="is")if(Ze||G)try{vt(_)}catch{}else try{_.setAttribute(c,"")}catch{}},dr=function(c){let _=null,E=null;if(lt)c="<remove></remove>"+c;else{let ve=Mo(c,/^[\r\n\t ]+/);E=ve&&ve[0]}N==="application/xhtml+xml"&&ze===be&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");let H=I?I.createHTML(c):c;if(ze===be)try{_=new h().parseFromString(H,N)}catch{}if(!_||!_.documentElement){_=D.createDocument(ze,"template",null);try{_.documentElement.innerHTML=rt?S:H}catch{}}let ae=_.body||_.documentElement;return c&&E&&ae.insertBefore(r.createTextNode(E),ae.childNodes[0]||null),ze===be?ne.call(_,Ve?"html":"body")[0]:Ve?_.documentElement:ae},wr=function(c){return k.call(c.ownerDocument||c,c,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},jt=function(c){return c instanceof f&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof p)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},Ht=function(c){return typeof i=="function"&&c instanceof i};function wt(ye,c,_){As(ye,E=>{E.call(t,c,_,Se)})}let nr=function(c){let _=null;if(wt(F.beforeSanitizeElements,c,null),jt(c))return vt(c),!0;let E=Q(c.nodeName);if(wt(F.uponSanitizeElement,c,{tagName:E,allowedTags:ge}),Ue&&c.hasChildNodes()&&!Ht(c.firstElementChild)&&Rt(/<[/\w!]/g,c.innerHTML)&&Rt(/<[/\w!]/g,c.textContent)||c.nodeType===Tn.progressingInstruction||Ue&&c.nodeType===Tn.comment&&Rt(/<[/\w]/g,c.data))return vt(c),!0;if(!(Ee.tagCheck instanceof Function&&Ee.tagCheck(E))&&(!ge[E]||Be[E])){if(!Be[E]&&Mt(E)&&(Ae.tagNameCheck instanceof RegExp&&Rt(Ae.tagNameCheck,E)||Ae.tagNameCheck instanceof Function&&Ae.tagNameCheck(E)))return!1;if(g&&!P[E]){let H=z(c)||c.parentNode,ae=X(c)||c.childNodes;if(ae&&H){let ve=ae.length;for(let _e=ve-1;_e>=0;--_e){let et=L(ae[_e],!0);et.__removalCount=(c.__removalCount||0)+1,H.insertBefore(et,Y(c))}}}return vt(c),!0}return c instanceof u&&!ur(c)||(E==="noscript"||E==="noembed"||E==="noframes")&&Rt(/<\/no(script|embed|frames)/i,c.innerHTML)?(vt(c),!0):(Le&&c.nodeType===Tn.text&&(_=c.textContent,As([M,de,$e],H=>{_=An(_,H," ")}),c.textContent!==_&&(xn(t.removed,{element:c.cloneNode()}),c.textContent=_)),wt(F.afterSanitizeElements,c,null),!1)},st=function(c,_,E){if(Oe&&(_==="id"||_==="name")&&(E in r||E in Ce))return!1;if(!(K&&!Ye[_]&&Rt(he,_))){if(!(ot&&Rt(De,_))){if(!(Ee.attributeCheck instanceof Function&&Ee.attributeCheck(_,c))){if(!Re[_]||Ye[_]){if(!(Mt(c)&&(Ae.tagNameCheck instanceof RegExp&&Rt(Ae.tagNameCheck,c)||Ae.tagNameCheck instanceof Function&&Ae.tagNameCheck(c))&&(Ae.attributeNameCheck instanceof RegExp&&Rt(Ae.attributeNameCheck,_)||Ae.attributeNameCheck instanceof Function&&Ae.attributeNameCheck(_,c))||_==="is"&&Ae.allowCustomizedBuiltInElements&&(Ae.tagNameCheck instanceof RegExp&&Rt(Ae.tagNameCheck,E)||Ae.tagNameCheck instanceof Function&&Ae.tagNameCheck(E))))return!1}else if(!ue[_]){if(!Rt(Pe,An(E,He,""))){if(!((_==="src"||_==="xlink:href"||_==="href")&&c!=="script"&&Lp(E,"data:")===0&&Z[c])){if(!(B&&!Rt(Je,An(E,He,"")))){if(E)return!1}}}}}}}return!0},Mt=function(c){return c!=="annotation-xml"&&Mo(c,fe)},kr=function(c){wt(F.beforeSanitizeAttributes,c,null);let{attributes:_}=c;if(!_||jt(c))return;let E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Re,forceKeepAttr:void 0},H=_.length;for(;H--;){let ae=_[H],{name:ve,namespaceURI:_e,value:et}=ae,y=Q(ve),v=et,m=ve==="value"?v:Op(v);if(E.attrName=y,E.attrValue=m,E.keepAttr=!0,E.forceKeepAttr=void 0,wt(F.uponSanitizeAttribute,c,E),m=E.attrValue,We&&(y==="id"||y==="name")&&(Tt(ve,c),m=pe+m),Ue&&Rt(/((--!?|])>)|<\/(style|title|textarea)/i,m)){Tt(ve,c);continue}if(y==="attributename"&&Mo(m,"href")){Tt(ve,c);continue}if(E.forceKeepAttr)continue;if(!E.keepAttr){Tt(ve,c);continue}if(!se&&Rt(/\/>/i,m)){Tt(ve,c);continue}Le&&As([M,de,$e],T=>{m=An(m,T," ")});let O=Q(c.nodeName);if(!st(O,y,m)){Tt(ve,c);continue}if(I&&typeof R=="object"&&typeof R.getAttributeType=="function"&&!_e)switch(R.getAttributeType(O,y)){case"TrustedHTML":{m=I.createHTML(m);break}case"TrustedScriptURL":{m=I.createScriptURL(m);break}}if(m!==v)try{_e?c.setAttributeNS(_e,ve,m):c.setAttribute(ve,m),jt(c)?vt(c):ml(t.removed)}catch{Tt(ve,c)}}wt(F.afterSanitizeAttributes,c,null)},Gt=function ye(c){let _=null,E=wr(c);for(wt(F.beforeSanitizeShadowDOM,c,null);_=E.nextNode();)wt(F.uponSanitizeShadowNode,_,null),nr(_),kr(_),_.content instanceof o&&ye(_.content);wt(F.afterSanitizeShadowDOM,c,null)};return t.sanitize=function(ye){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_=null,E=null,H=null,ae=null;if(rt=!ye,rt&&(ye="<!-->"),typeof ye!="string"&&!Ht(ye))if(typeof ye.toString=="function"){if(ye=ye.toString(),typeof ye!="string")throw Sn("dirty is not a string, aborting")}else throw Sn("toString is not a function");if(!t.isSupported)return ye;if(Ie||Et(c),t.removed=[],typeof ye=="string"&&(x=!1),x){if(ye.nodeName){let et=Q(ye.nodeName);if(!ge[et]||Be[et])throw Sn("root node is forbidden and cannot be sanitized in-place")}}else if(ye instanceof i)_=dr("<!---->"),E=_.ownerDocument.importNode(ye,!0),E.nodeType===Tn.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?_=E:_.appendChild(E);else{if(!Ze&&!Le&&!Ve&&ye.indexOf("<")===-1)return I&&ee?I.createHTML(ye):ye;if(_=dr(ye),!_)return Ze?null:ee?S:""}_&&lt&&vt(_.firstChild);let ve=wr(x?ye:_);for(;H=ve.nextNode();)nr(H),kr(H),H.content instanceof o&&Gt(H.content);if(x)return ye;if(Ze){if(G)for(ae=U.call(_.ownerDocument);_.firstChild;)ae.appendChild(_.firstChild);else ae=_;return(Re.shadowroot||Re.shadowrootmode)&&(ae=ce.call(n,ae,!0)),ae}let _e=Ve?_.outerHTML:_.innerHTML;return Ve&&ge["!doctype"]&&_.ownerDocument&&_.ownerDocument.doctype&&_.ownerDocument.doctype.name&&Rt(xl,_.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+_.ownerDocument.doctype.name+`>
`+_e),Le&&As([M,de,$e],et=>{_e=An(_e,et," ")}),I&&ee?I.createHTML(_e):_e},t.setConfig=function(){let ye=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Et(ye),Ie=!0},t.clearConfig=function(){Se=null,Ie=!1},t.isValidAttribute=function(ye,c,_){Se||Et({});let E=Q(ye),H=Q(c);return st(E,H,_)},t.addHook=function(ye,c){typeof c=="function"&&xn(F[ye],c)},t.removeHook=function(ye,c){if(c!==void 0){let _=Rp(F[ye],c);return _===-1?void 0:Ip(F[ye],_,1)[0]}return ml(F[ye])},t.removeHooks=function(ye){F[ye]=[]},t.removeAllHooks=function(){F=wl()},t}var Sl=Al();var gr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ts=e=>(...t)=>({_$litDirective$:e,values:t}),ln=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Cn=class extends ln{constructor(t){if(super(t),this.it=gt,t.type!==gr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===gt||t==null)return this._t=void 0,this.it=t;if(t===Bt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Cn.directiveName="unsafeHTML",Cn.resultType=1;var El=Ts(Cn);function Ho(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Wr=Ho();function Ml(e){Wr=e}var On={exec:()=>null};function at(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Ot.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Kp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ot={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Yp=/^(?:[ \t]*(?:\n|$))+/,Zp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Xp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Qp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Go=/(?:[*+-]|\d{1,9}[.)])/,Pl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Dl=at(Pl).replace(/bull/g,Go).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Jp=at(Pl).replace(/bull/g,Go).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Vo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ef=/^[^\n]+/,Ko=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,tf=at(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ko).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),rf=at(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Go).getRegex(),Ms="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Yo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,nf=at("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Yo).replace("tag",Ms).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Nl=at(Vo).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex(),sf=at(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Nl).getRegex(),Zo={blockquote:sf,code:Zp,def:tf,fences:Xp,heading:Qp,hr:Mn,html:nf,lheading:Dl,list:rf,newline:Yp,paragraph:Nl,table:On,text:ef},Tl=at("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex(),of={...Zo,lheading:Jp,table:Tl,paragraph:at(Vo).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Tl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex()},af={...Zo,html:at(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Yo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:On,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:at(Vo).replace("hr",Mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Dl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,cf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ql=/^( {2,}|\\)\n(?!\s*$)/,uf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ps=/[\p{P}\p{S}]/u,Xo=/[\s\p{P}\p{S}]/u,Fl=/[^\s\p{P}\p{S}]/u,df=at(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Xo).getRegex(),jl=/(?!~)[\p{P}\p{S}]/u,pf=/(?!~)[\s\p{P}\p{S}]/u,ff=/(?:[^\s\p{P}\p{S}]|~)/u,_f=at(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Kp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Bl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,mf=at(Bl,"u").replace(/punct/g,Ps).getRegex(),gf=at(Bl,"u").replace(/punct/g,jl).getRegex(),Ul="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",bf=at(Ul,"gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Xo).replace(/punct/g,Ps).getRegex(),hf=at(Ul,"gu").replace(/notPunctSpace/g,ff).replace(/punctSpace/g,pf).replace(/punct/g,jl).getRegex(),yf=at("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Xo).replace(/punct/g,Ps).getRegex(),vf=at(/\\(punct)/,"gu").replace(/punct/g,Ps).getRegex(),wf=at(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),kf=at(Yo).replace("(?:-->|$)","-->").getRegex(),$f=at("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",kf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Is=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,xf=at(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Is).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Wl=at(/^!?\[(label)\]\[(ref)\]/).replace("label",Is).replace("ref",Ko).getRegex(),zl=at(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ko).getRegex(),Af=at("reflink|nolink(?!\\()","g").replace("reflink",Wl).replace("nolink",zl).getRegex(),Cl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Qo={_backpedal:On,anyPunctuation:vf,autolink:wf,blockSkip:_f,br:ql,code:cf,del:On,emStrongLDelim:mf,emStrongRDelimAst:bf,emStrongRDelimUnd:yf,escape:lf,link:xf,nolink:zl,punctuation:df,reflink:Wl,reflinkSearch:Af,tag:$f,text:uf,url:On},Sf={...Qo,link:at(/^!?\[(label)\]\((.*?)\)/).replace("label",Is).getRegex(),reflink:at(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Is).getRegex()},Uo={...Qo,emStrongRDelimAst:hf,emStrongLDelim:gf,url:at(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Cl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:at(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Cl).getRegex()},Ef={...Uo,br:at(ql).replace("{2,}","*").getRegex(),text:at(Uo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Cs={normal:Zo,gfm:of,pedantic:af},Rn={normal:Qo,gfm:Uo,breaks:Ef,pedantic:Sf},Tf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Rl=e=>Tf[e];function br(e,t){if(t){if(Ot.escapeTest.test(e))return e.replace(Ot.escapeReplace,Rl)}else if(Ot.escapeTestNoEncode.test(e))return e.replace(Ot.escapeReplaceNoEncode,Rl);return e}function Il(e){try{e=encodeURI(e).replace(Ot.percentDecode,"%")}catch{return null}return e}function Ll(e,t){let r=e.replace(Ot.findPipe,(o,a,i)=>{let u=!1,d=a;for(;--d>=0&&i[d]==="\\";)u=!u;return u?"|":" |"}),n=r.split(Ot.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ot.slashPipe,"|");return n}function In(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Cf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ol(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,u}function Rf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ls=class{constructor(e){ct(this,"options");ct(this,"rules");ct(this,"lexer");this.options=e||Wr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:In(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Rf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=In(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:In(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=In(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))i.push(r[u]),a=!0;else if(!a)i.push(r[u]);else break;r=r.slice(u);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let R=h,A=R.raw+`
`+r.join(`
`),L=this.blockquote(A);o[o.length-1]=L,n=n.substring(0,n.length-R.raw.length)+L.raw,s=s.substring(0,s.length-R.text.length)+L.text;break}else if(h?.type==="list"){let R=h,A=R.raw+`
`+r.join(`
`),L=this.list(A);o[o.length-1]=L,n=n.substring(0,n.length-h.raw.length)+L.raw,s=s.substring(0,s.length-R.raw.length)+L.raw,r=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let u=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),h=e.split(`
`,1)[0],R=!f.trim(),A=0;if(this.options.pedantic?(A=2,p=f.trimStart()):R?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,p=f.slice(A),A+=t[1].length),R&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),u=!0),!u){let L=this.rules.other.nextBulletRegex(A),q=this.rules.other.hrRegex(A),Y=this.rules.other.fencesBeginRegex(A),X=this.rules.other.headingBeginRegex(A),z=this.rules.other.htmlBeginRegex(A);for(;e;){let I=e.split(`
`,1)[0],S;if(h=I,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),S=h):S=h.replace(this.rules.other.tabCharGlobal,"    "),Y.test(h)||X.test(h)||z.test(h)||L.test(h)||q.test(h))break;if(S.search(this.rules.other.nonSpaceChar)>=A||!h.trim())p+=`
`+S.slice(A);else{if(R||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(f)||X.test(f)||q.test(f))break;p+=`
`+h}!R&&!h.trim()&&(R=!0),d+=I+`
`,e=e.substring(I.length+1),f=S.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=p.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=p.raw+u.tokens[0].raw,u.tokens[0].text=p.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(p)):u.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):u.tokens.unshift(p)}}if(!s.loose){let d=u.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ll(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ll(a,o.header.length).map((i,u)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=In(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Cf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ol(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ol(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,u=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+u);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let R=f.slice(1,-1);return{type:"em",raw:f,text:R,tokens:this.lexer.inlineTokens(R)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},er=class Wo{constructor(t){ct(this,"tokens");ct(this,"options");ct(this,"state");ct(this,"inlineQueue");ct(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Wr,this.options.tokenizer=this.options.tokenizer||new Ls,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ot,block:Cs.normal,inline:Rn.normal};this.options.pedantic?(r.block=Cs.pedantic,r.inline=Rn.pedantic):this.options.gfm&&(r.block=Cs.gfm,this.options.breaks?r.inline=Rn.breaks:r.inline=Rn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Cs,inline:Rn}}static lex(t,r){return new Wo(r).lex(t)}static lexInline(t,r){return new Wo(r).inlineTokens(t)}lex(t){t=t.replace(Ot.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Ot.tabCharGlobal,"    ").replace(Ot.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),u;this.options.extensions.startBlock.forEach(d=>{u=d.call({lexer:this},i),typeof u=="number"&&u>=0&&(a=Math.min(a,u))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let u;if(this.options.extensions?.inline?.some(p=>(u=p.call({lexer:this},t,r))?(t=t.substring(u.raw.length),r.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let p=r.at(-1);u.type==="text"&&p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):r.push(u);continue}if(u=this.tokenizer.emStrong(t,n,i)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),r.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),r.push(u);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(R=>{h=R.call({lexer:this},f),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(i=u.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):r.push(u);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Os=class{constructor(e){ct(this,"options");ct(this,"parser");this.options=e||Wr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Ot.notSpaceStart)?.[0],s=e.replace(Ot.endingNewline,"")+`
`;return n?'<pre><code class="language-'+br(n)+'">'+(r?s:br(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:br(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let i=e.items[a];n+=this.listitem(i)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Il(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+br(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Il(e);if(s===null)return br(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${br(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},Jo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},tr=class zo{constructor(t){ct(this,"options");ct(this,"renderer");ct(this,"textRenderer");this.options=t||Wr,this.options.renderer=this.options.renderer||new Os,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Jo}static parse(t,r){return new zo(r).parse(t)}static parseInline(t,r){return new zo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Rs,Ln=(Rs=class{constructor(e){ct(this,"options");ct(this,"block");this.options=e||Wr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?er.lex:er.lexInline}provideParser(){return this.block?tr.parse:tr.parseInline}},ct(Rs,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ct(Rs,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Rs),If=class{constructor(...e){ct(this,"defaults",Ho());ct(this,"options",this.setOptions);ct(this,"parse",this.parseMarkdown(!0));ct(this,"parseInline",this.parseMarkdown(!1));ct(this,"Parser",tr);ct(this,"Renderer",Os);ct(this,"TextRenderer",Jo);ct(this,"Lexer",er);ct(this,"Tokenizer",Ls);ct(this,"Hooks",Ln);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Os(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],u=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Ls(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],u=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Ln;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],u=s[a];Ln.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Ln.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return u.call(s,f)})();let p=i.call(s,d);return u.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await u.apply(s,d)),f})();let p=i.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return er.lex(e,t??this.defaults)}parser(e,t){return tr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?er.lex:er.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?tr.parse:tr.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?er.lex:er.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?tr.parse:tr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+br(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ur=new If;function it(e,t){return Ur.parse(e,t)}it.options=it.setOptions=function(e){return Ur.setOptions(e),it.defaults=Ur.defaults,Ml(it.defaults),it};it.getDefaults=Ho;it.defaults=Wr;it.use=function(...e){return Ur.use(...e),it.defaults=Ur.defaults,Ml(it.defaults),it};it.walkTokens=function(e,t){return Ur.walkTokens(e,t)};it.parseInline=Ur.parseInline;it.Parser=tr;it.parser=tr.parse;it.Renderer=Os;it.TextRenderer=Jo;it.Lexer=er;it.lexer=er.lex;it.Tokenizer=Ls;it.Hooks=Ln;it.parse=it;var nh=it.options,sh=it.setOptions,oh=it.use,ah=it.walkTokens,ih=it.parseInline;var lh=tr.parse,ch=er.lex;function Tr(e){let t=it.parse(e),r=Sl.sanitize(t);return El(r)}function hr(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function cn(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ds(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Lf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Of={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Mf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Pf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ir(e){return!!e&&typeof e=="object"}function ea(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Hl(e,t){let r=ea(e),n=ea(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let u=s.get(i)||0;u>0?s.set(i,u-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Df(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ir(s)&&typeof s.text=="string"?s.text:"").join(""):ir(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Nf(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Lf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ea(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Hl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let u=Hl(ir(i)?i.old_string:"",ir(i)?i.new_string:"");s+=u.added,o+=u.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ta(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ra(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Mf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Pf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function qf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ir(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ra(o.text));else if(o.type==="thinking"){let a=ta(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Nf(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ir(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Df(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Ff(e){if(e.type==="item.completed"&&ir(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ra(t.text)];if(t.type==="reasoning"){let r=ta(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function jf(e){if(e.schema!=="codex-delegation-monitor-v1"||!ir(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ir(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[ra(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=ta(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=Of[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Bf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Gl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ir(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?jf(o):Bf(o)?Ff(o):qf(o,r);for(let i of a)t.push(i)}return t}var Uf=5,Wf=10,zf=/Task\s+#(\d+)/,Hf=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Gf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ns(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Vf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Kf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Yf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=zf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Zf(e){if(e.tool==="Bash"){let t=e.command||"";return Hf.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Gf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Xf(e){let t=e.filter(s=>s.kind==="tool").slice(-Wf),r=new Map;t.forEach((s,o)=>{let a=Zf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Qf(e){let t=Kf(e);if(t)return{text:t,guess:!1};let r=Yf(e);if(r)return{text:r,guess:!1};let n=Xf(e);return n?{text:n,guess:!0}:null}function Jf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Nt(e,t)}function qs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,u=!1,d={},p=!0,f=new Set,h=new Set,R=null,A=null,L=!1,q=!1,Y=!1,X=null,z=null;function I(){L=!1,q=!1,Y=!1,X=null,z=null}async function S(K){if(r){q=!0,Y=!1,ge();try{let B=await Promise.resolve(r("get-attempt-prompt",{attempt_id:K}));if(o!==K)return;!B||typeof B!="object"||Array.isArray(B)?Y=!0:(X=B,z=K)}catch{o===K&&(Y=!0)}finally{o===K&&(q=!1,ge())}}}function D(){if(L=!L,L&&o&&z!==o){S(o);return}ge()}function k(){if(!L)return"";let K=cn({loading:q,error:Y});if(K)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!X)return"";if(X.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let B=Ds(X.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${B?l`<div class="prompt-block__meta">${B} 발송</div>`:""}
      ${typeof X.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",X.task_prompt):""}
      ${typeof X.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",X.system_prompt):""}
    </div>`}function U(){if(!i||!n)return[];let K=n.get(i);return Gl(K?K.lines:[])}function ne(){if(!i||!n)return null;let K=n.get(i),B=K?K.last_event_at:null;return typeof B=="number"?B:null}function ce(){return d.status==="running"}function F(){if(ce()&&o){A||(A=setInterval(()=>ge(),1e3));return}M()}function M(){A&&(clearInterval(A),A=null)}function de(K){let B=[],se=0;for(;se<K.length;){let Le=K[se];if(Le.kind==="tool"){let Ue=se;for(;Ue<K.length&&K[Ue].kind==="tool"&&K[Ue].tool===Le.tool;)Ue+=1;if(Ue-se>=Uf&&!h.has(se)){B.push({kind:"group",idx:se,tool:Le.tool||"",lines:K.slice(se,Ue).map((Ve,Ie)=>({idx:se+Ie,line:Ve}))}),se=Ue;continue}}B.push({kind:"line",idx:se,line:Le}),se+=1}return B}function $e(K){for(let B=K.length-1;B>=0;B-=1){let se=K[B];if(se.kind==="result"||se.kind==="error")return null;if(se.kind==="tool"&&!Object.hasOwn(se,"result"))return se}return null}function he(K){for(let B=K.length-1;B>=0;B-=1)if(K[B].kind==="thinking")return K[B];return null}function De(K,B){if(B.kind==="gate")return l`<div class="sv__gate">${B.text}</div>`;if(B.kind==="phase")return l`<div class="sv__phase">${B.text}</div>`;if(B.kind==="result")return l`<div
        class="sv__result${B.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${B.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Tr(B.text||(B.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(B.kind==="thinking"){let se=f.has(K);return l`<div
        class="sv__think${se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Re(K)}
      >
        <span class="sv__think-line">💭 ${Ns(B.text)}</span>
        ${se?l`<pre class="sv__think-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="error")return l`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="blocker")return l`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="tool"){let se=f.has(K),Le=B.tool==="Bash"?Vf(B.command):0,Ue=B.tool==="Bash"?Le>1?Ns(B.command):B.command:B.path||B.command||"";return l`<div
        class="sv__tool${se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Re(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${B.icon}</span>
          <span class="sv__tool-name">${B.tool}</span>
          ${Ue?l`<span class="sv__tool-detail">${Ue}</span>`:""}
          ${Le>1?l`<span class="sv__tool-more">⋯ ${Le}줄</span>`:""}
          ${typeof B.added=="number"?l`<span class="sv__diff-add">+${B.added}</span>`:""}
          ${typeof B.removed=="number"?l`<span class="sv__diff-del">−${B.removed}</span>`:""}
          ${B.result?l`<span class="sv__tool-ok">→ ${B.result}</span>`:""}
        </span>
        ${se?l`<pre class="sv__tool-expand">${Je(B)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Tr(B.text||"")}</div>`}function Je(K){let B=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)B.push(K.command);else if(K.input!==void 0)try{B.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&B.push(`output:
${K.output}`),B.join(`

`)}function He(){if(!o)return l``;let K=U(),B=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),se=d.session_id||"",Le=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,Ue=ce(),Ve=Ue?Jf(ne(),Date.now()):"",Ie=Ue?$e(K):null,lt=Ue?he(K):null,Ze=Qf(K);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Ze?l`<span
              class="sv__stage${Ze.guess?" sv__stage--guess":""}"
              title=${Ze.text}
              >${Ze.text}</span
            >`:""}
        ${Ue?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ve?l`<span class="sv__live-ago">${Ve}</span>`:""}</span
            >`:""}
        ${se?l`<button
              type="button"
              class="sv__session"
              title=${se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${se}`}
              @click=${()=>Ae(se)}
            >
              ⧉ ${se.slice(0,8)}
            </button>`:""}
        ${B?l`<span class="sv__meta">${B}</span>`:""}
        ${d.worktree?l`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":l`<button
              type="button"
              class="sv__prompt-toggle${L?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${L?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${D}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Le}
          @click=${je}
        >
          <span class="sv__follow-full">⇣ ${Le}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ot()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":k()}
      <div class="sv__body">
        ${K.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:de(K).map(G=>G.kind==="group"?fe(G):De(G.idx,G.line))}
      </div>
      ${Ie||lt?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ie?l`<span class="sv__now-icon">${Ie.icon}</span>
                  <span class="sv__now-name">${Ie.tool}</span>
                  <span class="sv__now-detail"
                    >${Ie.tool==="Bash"?Ns(Ie.command):Ie.path||Ie.command||""}</span
                  >`:""}
            ${lt?l`<span class="sv__now-think"
                  >💭 ${Ns(lt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function fe(K){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Pe(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Pe(K){h.add(K),ge()}function ge(){Qe(He(),e),F(),p&&xe()}function xe(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function Re(K){f.has(K)?f.delete(K):f.add(K),ge()}function je(){p=!p,ge()}function Ae(K){Xt(K).then(B=>{B?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Be(K){!o||!K||(d={...d,...K},ge())}function Ye(K){let B=K.target;if(!B||!B.classList||!B.classList.contains("sv__body"))return;!(B.scrollHeight-B.scrollTop-B.clientHeight<=4)&&p&&(p=!1,ge())}e.addEventListener("scroll",Ye,!0);function Ee(K){let B=K&&K.attempt_id;if(!B)return;let se=i;o=B,a=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&se&&se!==i&&Promise.resolve(r("unsubscribe-session-log",{id:se})).catch(()=>{}),d=K.meta||{},u=K.hide_prompt===!0,p=!0,f.clear(),h.clear(),I(),!R&&n&&(R=n.subscribe(ge)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),ge()}function ot(){let K=i;o=null,a=null,i=null,u=!1,f.clear(),h.clear(),I(),M(),r&&K&&Promise.resolve(r("unsubscribe-session-log",{id:K})).catch(()=>{}),Qe(l``,e),s&&s()}return{open:Ee,updateMeta:Be,close:ot,isOpen(){return o!==null},destroy(){M(),R&&(R(),R=null),e.removeEventListener("scroll",Ye,!0),o=null,a=null,i=null,u=!1,Qe(l``,e)}}}function Fs(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=na(t.spec_id),s=na(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function na(e){return typeof e=="string"?e.trim():""}function Vl(e){let t=Fs(e);if(t.path)return t;let r=na(e_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function e_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function t_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function r_(e){let t=e&&e.metadata||{},r=Vl(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:t_(t)?null:"plan_pending"}),n}function Kl(e,t){let r=r_(e);return l`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?l`<div class="detail-empty">산출물 없음</div>`:l`
          ${r.map(n=>l`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                ${n.missing_state==="spec_draft"?l`<span class="detail-art__badge">draft</span>`:null}
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
  `}var n_="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",s_=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,o_=/^\*\*결론\*\* — (.+)$/;function js(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==n_)return null;let r=s_.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?o_.exec(t[a]):null,u=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var Yl=20;function Zl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function a_(e){return e.length>Yl?`${e.slice(0,Yl)}\u2026`:e}function i_(e,t,r,n){let s=`${t.lane} ${a_(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Zl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Tr(t.body)}
        </div>`:""}
  </div>`}function l_(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Zl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Tr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Xl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(u=>{let d=js(typeof u.text=="string"?u.text:"");return d?i_(u,d,t,s.has(u.id)):l_(u)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${u=>t.onDraftInput&&t.onDraftInput(u.target.value)}
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
  `}var{I:Uh}=yi;var Ql=e=>e.strings===void 0;var c_={},Jl=(e,t=c_)=>e._$AH=t;var zr=Ts(class extends ln{constructor(e){if(super(e),e.type!==gr.PROPERTY&&e.type!==gr.ATTRIBUTE&&e.type!==gr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ql(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Bt||t===gt)return t;let r=e.element,n=e.name;if(e.type===gr.PROPERTY){if(t===r[n])return Bt}else if(e.type===gr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Bt}else if(e.type===gr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Bt;return Jl(e),t}});var Bs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],u_=Bs.filter(e=>e!=="impl_dispatch"),Cr=["orchestration_model","orchestration_effort","orchestration_speed"],ec=[...Bs,...Cr],tc=["delegated","main"],Us=["inherit","claude","codex"],Pn=["default","fast"],Dn=["standard","fast_track"],Nn=["codex","opus","fable","self","skip"],Ws=["codex","fable","skip"],zs=["low","medium","high","xhigh"],lr="auto";function yr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function rc(e){if(!yr(e)||!yr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))yr(n)&&yr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Hs(e,t){let r=rc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[lr,...n.flatMap(([,s])=>s)]}function un(e,t,r){if(!yr(e)||!yr(e.runners))return[lr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!yr(o)||!yr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==lr&&a!==r)continue;let u=yr(i)?i.efforts:null;if(Array.isArray(u))for(let d of u)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[lr,...n]}function Gs(e,t){let r=rc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function sa(e,t,r,n,s){return ks({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function nc(e,t){let r={};for(let n of u_){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function sc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var oa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],aa={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},oc={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ia(e,t,r,n,s,o=null){let a=nn({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function ac(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of ia(e,t,r,n,s,o))a[i.source]+=1;return a}function ic(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function lc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Jh=[...Bs,...Cr];var d_=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],p_={pin:"pin",global:"global",base:"base"};function f_(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${p_[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function __(e,t,r){switch(e){case"workflow_mode":return Dn;case"spec_review_model":case"impl_review_model":return Nn;case"plan_review_model":return Ws;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return zs;case"impl_dispatch":return tc;case"impl_runtime":return Us;case"impl_model":return Hs(r,t.impl_runtime);case"impl_effort":return un(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Pn;case"orchestration_model":return Gs(r,null);case"orchestration_effort":return un(r,void 0,t.orchestration_model||lr).filter(n=>n!==lr);default:return[]}}function m_(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${f_(e.source)}
    <span class="detail-effective__k"
      >${aa[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${oc[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${aa[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(r=>l`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function cc(e,t){let r=oa.flatMap(u=>u.keys),n=ia(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=ac(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(u=>[u.key,u])),a=Object.fromEntries(n.filter(u=>u.value!==null).map(u=>[u.key,u.value])),i=n.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return l`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${u=>t.onToggle(u.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${u=>{u.preventDefault();let d=u.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${g_(o)}</span
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
          ${oa.map(u=>l`
              <div class="detail-effective__subhead">${u.label}</div>
              ${n.filter(d=>u.keys.includes(d.key)).map(d=>{let p=ks({key:d.key,choices:__(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return m_(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${zr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${u=>t.onPresetSelect(String(u.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(u=>l`<option
                    value=${u.id}
                    ?selected=${u.id===e.preset_id}
                  >
                    ${u.name}${u.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
  </details>`}function g_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function b_(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function uc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=b_(r.exec_receipt),u=i?Br(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],p=ys(r.planned_execution,r.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
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
            >PR</a
          >`:""}
      ${p?l`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${u?l`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${i?.effort?l`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${d_.map(f=>{let h=f.receipt&&typeof t[f.receipt]=="string"?String(t[f.receipt]):"",R=n[f.id],A=h.length>0||R?.fill==="full",L=!A&&R?.fill==="dim",q=R?.stale===!0;return l`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${L?" detail-summary__gate--current":""}${q?" detail-summary__gate--stale":""}`}
          data-gate=${f.id}
        >
          <span class="detail-summary__gate-pill">${f.label}</span>
          ${h?l`<span class="detail-summary__gate-sha"
                >${h.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var dc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function qn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vs(e){if(!qn(e)||!qn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>qn(r)&&qn(r.models));return t.length>0?t:null}function la(e,t){let r=Vs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function pc(e,t){return qn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function fc(e,t){let r=Vs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return pc(n,n.models[t]);return[]}function h_(e){let t=Vs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of pc(n,s))r.includes(o)||r.push(o);return r}function y_(e,t){if(!t)return h_(e);let n=Vs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of fc(e,o))s.includes(a)||s.push(a);return s}function _c(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=la(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?fc(t,n.impl_model):y_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function v_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function mc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function u(A){A.key==="Escape"&&s&&(A.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${v_(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${i}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Tr(a)}
          </div>
        </div>
      </div>
    `:l``}function p(){Qe(d(),e)}async function f(A,L={}){s=A,o="loading",a="",i="",p();let q=r?r():"";if(!q){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let Y="/api/doc?workspace="+encodeURIComponent(q)+"&path="+encodeURIComponent(A);try{let X=await n(Y),z=await X.json().catch(()=>({}));if(!X.ok||!z||z.ok!==!0){if(z?.error==="not_found"&&L.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(z&&z.error||X.status)+")",p();return}a=String(z.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,Qe(l``,e)}function R(){document.removeEventListener("keydown",u),h()}return{open:f,close:h,destroy:R}}var w_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],bc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ks=["implementation","review-consult"],k_=["running","done","failed","interrupted"],$_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function x_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function A_(e){let t=xt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=on(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${bc}
          >부분 집계</span
        >`:""}`}function gc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ca(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ua(t):""}function S_(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Ks.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!k_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function E_(e,t){let n=xt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?l`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${ca(t.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${ca(t.completed_at)}</span
        >`:""}
    ${n?l`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function T_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?xt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?ua(e.last_event_at):s?ca(s.completed_at):"";return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${$_[e.status]}</span
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
    ${i?l`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?l`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function C_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function R_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=S_(p);!f||s.has(f.launch_id)||(s.add(f.launch_id),n.push(f))}n.sort((p,f)=>p.started_at-f.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let p of Ks){let f=t.roles[p]?.codex;a[p]=f?[...f.legs]:[]}let i=Ks.flatMap(p=>a[p]),u=new Set,d=[];for(let p of Ks){for(let f of n.filter(h=>h.role===p)){let h=i.find(R=>R.receipt_id===f.launch_id)||null;h&&!C_(f,h)||(h&&u.add(h.receipt_id),d.push(T_(f,h,e.attempt_id,r)))}for(let f of a[p])u.has(f.receipt_id)||d.push(E_(p,f))}return d}function I_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...w_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${x_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${bc}</span>`:""}
  </div>`}var L_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ua(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function O_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function hc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),R=f&&!h,A=f?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!R}
      title=${A}
      @click=${L=>{L.stopPropagation(),R&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,h=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return l`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},u=d=>{let p=gc(Lo(d));if(xt(p).length===0&&!on(d.usage))return"";let f=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${A_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=Lo(d),f=gc(p),h=xt(f);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${L_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Sr(d)?l`<span
                  class="detail-session__resumed"
                  title=${Sr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ar(d)}</span>
            ${h.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?l`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(R=>l`<span
                      class="detail-session__usage"
                      title=${R.tooltip}
                      >${R.label}</span
                    >`):on(d.usage)?l`<span class="detail-session__usage"
                    >${on(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ua(d.started_at)}</span>
          </button>
          ${u(d)} ${a(d)} ${i(d)} ${O_(d)}
          ${s.has(d.attempt_id)&&d.usage?I_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${R_(d,p,t)}
        </div>`})}
    </div>
  `}function yc(e,t={}){return l`
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
          ${M_(e)}
        </div>`:""}
  `}function M_(e){let t=cn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?hr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Ds(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?hr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?hr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var P_=["open","in_progress","deferred","resolved","closed"],D_=[0,1,2,3,4];function vc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,u=t.sessionLogStore,d=null,p=null,f={},h="",R=!1,A=[],L=!1,q={},Y=!1,X=!1,z="",I="",S="";function D(){Y=!1,X=!1,z="",I="",S=""}let k=[],U=null,ne=null,ce=!1,F="",M=!1,de=0,$e=new Set;function he(){k=[],U=null,ne=null,ce=!1,F="",M=!1,de+=1,$e.clear()}async function De(m){if(!s)return;let O=++de;try{let T=await Promise.resolve(s("get-comments",{id:m}));if(O!==de||m!==d)return;k=Array.isArray(T)?T:[],ce=!1}catch{if(O!==de||m!==d)return;ce=!0}v()}function Je(){if(!s||!d)return;let m=p&&typeof p.comment_count=="number"?p.comment_count:null;if(U!==d){U=d,ne=m,De(d);return}m!==null&&m!==ne&&(ne=m,De(d))}function He(m){$e.has(m)?$e.delete(m):$e.add(m),v()}function fe(m){let O=F.trim().length===0;F=m,O!==(m.trim().length===0)&&v()}async function Pe(){let m=F.trim();if(!s||!d||m.length===0||M)return;let O=d;M=!0,v();let T=!1;try{let re=await Promise.resolve(s("add-comment",{id:O,text:m}));Array.isArray(re)&&re.length>0&&(T=!0,O===d&&(k=re,ce=!1,F="",ne=re.length))}catch{T=!1}T||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),O===d&&(M=!1),v()}let ge={onToggle:He,onDraftInput:fe,onSubmit:Pe},xe=document.createElement("div");xe.className="md-viewer-root",document.body.appendChild(xe);let Re=mc(xe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),je=document.createElement("div");je.className="session-log-root",document.body.appendChild(je);let Ae=qs(je,{transport:s?(m,O)=>Promise.resolve(s(m,O)):void 0,sessionLogStore:u}),Be=!1,Ye=!1,Ee=!1,ot=null,K=null,B=0;function se(m){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${m}`}function Le(){Be=!1,Ye=!1,Ee=!1,ot=null,K=null,B+=1}async function Ue(m){if(!s)return;let O=++B;Ye=!0,Ee=!1,v();try{let T=await Promise.resolve(s("get-bead-prompt",{bead_id:m}));if(O!==B)return;!T||typeof T!="object"||Array.isArray(T)?Ee=!0:(ot=T,K=se(m))}catch{O===B&&(Ee=!0)}finally{O===B&&(Ye=!1,v())}}function Ve(){if(Be=!Be,Be&&d&&K!==se(d)){ot=null,Ue(d);return}v()}function Ie(){if(!a||!d)return[];let m=a.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(T=>T&&T.bead_id===d).sort((T,re)=>(re.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,effort:T.effort||T.observed_effort||null,speed:T.speed||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,continuation_mode:T.continuation_mode||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null,exec_default_preset_id:typeof T.exec_default_preset_id=="string"?T.exec_default_preset_id:null,exec_default_preset_revision:typeof T.exec_default_preset_revision=="number"?T.exec_default_preset_revision:null,exec_values:T.exec_values&&typeof T.exec_values=="object"?T.exec_values:null,usage:T.usage||null,usage_legs:Array.isArray(T.usage_legs)?T.usage_legs:[],delegation_sessions:Array.isArray(T.delegation_sessions)?T.delegation_sessions:[]}))}function lt(){if(!a||!d)return null;let m=a.get();return Wt(m&&m.attempts||{},d)}let Ze=new Set;function G(m){Ze.has(m)?Ze.delete(m):Ze.add(m),v()}function ee(m){let O=a?a.get():null,T=O&&O.attempts?O.attempts[m]:null;Ae.open({attempt_id:m,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}function Oe(m,O){let T=a?a.get():null,re=T&&T.attempts?T.attempts[m]:null,Ke=(re&&Array.isArray(re.delegation_sessions)?re.delegation_sessions:[]).find(Xe=>Xe&&typeof Xe=="object"&&Xe.launch_id===O);Ke&&Ae.open({attempt_id:m,launch_id:O,meta:{runner:"codex",role:Ke.role,model:Ke.model,effort:Ke.effort,session_id:Ke.session_id,status:Ke.status}})}async function We(m){if(!s||!m)return;let O=await sn();if(O===null)return;let T=()=>{let Xe=a?a.get():null;return Xe&&typeof Xe.revision=="number"?Xe.revision:0},re=async(Xe={},Ne=T())=>await s("worker-attempt-resume",{attempt_id:m,expected_revision:Ne,...O!==""?{instructions:O}:{},...Xe}),Fe=Xe=>{Xe?.queue&&a?.set&&a.set(Xe.queue)},Ke=await re();if(Fe(Ke),Ke&&Ke.conflict){let Xe=Ke.queue&&typeof Ke.queue.revision=="number"?Ke.queue.revision:T();Ke=await re({},Xe),Fe(Ke)}Ke=await fr(Ke,(Xe,Ne)=>re({continuation:Xe,decision_token:Ne}),{onResult:Fe,refresh:()=>re()}),Ke&&Ke.resumed===!1&&!Ke.conflict&&Ke.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ke.reason}`,"error",2400)}let pe={onOpen:ee,onOpenDelegation:Oe,onResume:We,onToggleUsage:G};function g(){let m=a?a.get():null,O={...q};for(let T of["orchestration_model","orchestration_effort","orchestration_speed"]){let re=m&&m[T];typeof re=="string"&&(O[T]=re)}return O}async function x(){if(s){try{let m=await Promise.resolve(s("get-session-defaults",{}));q=m&&m.values&&typeof m.values=="object"?m.values:{}}catch{q={}}v()}}function $(){let m=a?a.get():null;return m&&m.runner_catalog||null}function P(){let m=a?a.get():null;return m&&typeof m.execution_defaults=="object"?m.execution_defaults:null}function V(){let m=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},T=nn({pin:{...m,...f},global:g(),execution_defaults:P(),runner_catalog:$(),route:typeof m.route=="string"?m.route:null}).orchestration_model.value||"";return la($(),T)}function Z(){let m=i?i.get():null;return!m||typeof m.revision!="number"?null:{revision:m.revision,presets:Array.isArray(m.presets)?m.presets:[]}}function oe(m){return m?.compatible===!1}function ue(m){i&&m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&i.set({revision:m.revision,presets:m.presets})}async function qe(){let m=Z(),O=m?.presets.find(T=>T.id===h);if(!(!s||!d||!m||!O||oe(O)||R)){R=!0,A=[],v();try{let T=await Promise.resolve(s("apply-impl-preset",lc(d,O.id,m.revision)));if(T&&T.conflict){ue(T),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let re=T&&Array.isArray(T.issue)?T.issue[0]:T?.issue;if(T&&T.applied&&re&&typeof re=="object"){p=re,A=Array.isArray(T.skipped_orchestration_keys)?T.skipped_orchestration_keys.filter(Fe=>typeof Fe=="string"):[];for(let Fe of dc)delete f[Fe];ie(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}T&&T.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(T){T&&typeof T=="object"&&T.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{R=!1,v()}}}let we=null;r&&r.subscribe&&(we=r.subscribe(()=>rt()));let Te=null;a&&typeof a.subscribe=="function"&&(Te=a.subscribe(()=>{d&&v()}));let be=null;i&&typeof i.subscribe=="function"&&(be=i.subscribe(()=>{d&&v()}));function ze(m){m.key==="Escape"&&d&&(m.preventDefault(),n())}document.addEventListener("keydown",ze);function rt(){if(d){if(r&&typeof r.snapshotFor=="function"){let m=r.snapshotFor("detail:"+d)||[];p=m.find(T=>T&&T.id===d)||m[0]||p}Je(),v()}}function W(m){Xt(m).then(O=>{O?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function te(m){m.preventDefault(),m.stopPropagation(),d&&W(d)}function me(m,O){m.preventDefault(),m.stopPropagation(),W(O)}function w(m,O,T){m.preventDefault(),m.stopPropagation(),Re.open(O,{missing_state:T})}function C(m,O){f[m]=O,v(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",ic(d,m,O.length===0?null:O))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function N(m,O){let T=p||{},re=T.metadata&&typeof T.metadata=="object"?T.metadata:{},Fe={};for(let Ne of["impl_runtime","impl_model","impl_effort"])Fe[Ne]=Object.hasOwn(f,Ne)?f[Ne]:typeof re[Ne]=="string"?re[Ne]:"";Fe[m]=O;let Ke=_c(Fe,$(),V()),Xe={};for(let Ne of["impl_runtime","impl_model","impl_effort"])Xe[Ne]=f[Ne],f[Ne]=Ke[Ne]||"";v(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...Ke,orchestration_runtime:V()})).then(Ne=>{let mt=Array.isArray(Ne)?Ne[0]:Ne;if(!mt||typeof mt!="object"||!mt.id)throw new Error("implementation target readback failed");p=mt;for(let sr of["impl_runtime","impl_model","impl_effort"])delete f[sr];v()}).catch(()=>{for(let Ne of["impl_runtime","impl_model","impl_effort"])Xe[Ne]===void 0?delete f[Ne]:f[Ne]=Xe[Ne];v(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function J(m,O,T){if(!s||!d)return!1;try{let re=await Promise.resolve(s(m,O)),Fe=Array.isArray(re)?re[0]:re;return Fe&&typeof Fe=="object"&&Fe.id?(p=Fe,!0):(ie(T,"error"),!1)}catch{return ie(T,"error"),!1}}function ke(m){setTimeout(()=>{try{let O=e.querySelector(m);O&&typeof O.focus=="function"&&O.focus()}catch{}},0)}function Q(){Y=!0,z=p&&p.title||"",v(),ke('.detail-edit__input[data-edit="title"]')}function Se(m){z=m.target.value}function Ce(){Y=!1,z="",v()}function ft(){J("edit-text",{id:d,field:"title",value:z},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(Y=!1,z=""),v()})}function Et(){X=!0,I=p&&p.description||"",v(),ke('.detail-edit__textarea[data-edit="description"]')}function nt(m){I=m.target.value}function yt(){X=!1,I="",v()}function ur(){J("edit-text",{id:d,field:"description",value:I},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(O=>{O&&(X=!1,I=""),v()})}function vt(m,O,T,re){if(m.key==="Escape"){m.stopPropagation(),T();return}m.key==="Enter"&&(!re||m.ctrlKey||m.metaKey)&&(m.preventDefault(),O())}function Tt(m){let O=m.target.value;J("update-status",{id:d,status:O},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function dr(m){let O=Number(m.target.value);J("update-priority",{id:d,priority:O},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function wr(m){S=m.target.value}function jt(){let m=S.trim();m.length!==0&&J("label-add",{id:d,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(O=>{O&&(S=""),v()})}function Ht(m){if(m.key==="Escape"){m.stopPropagation(),S="",v();return}m.key==="Enter"&&(m.preventDefault(),jt())}function wt(m){J("label-remove",{id:d,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>v())}let nr={onCopyPath:me,onOpenDoc:w};function st(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function Mt(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function kr(m){let T=(Array.isArray(m.dependencies)?m.dependencies:[]).map(re=>({id:st(re),icon:Mt(re)})).filter(re=>re.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${T.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${T.map(re=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(re.id)}
                  >
                    ${re.icon?`${re.icon} `:""}${re.id}
                  </button>`:l`<span class="detail-dep"
                    >${re.icon?`${re.icon} `:""}${re.id}</span
                  >`)}
          </div>`}
    `}function Gt(m){let O=m.metadata||{},T=m.workflow||{},re=T.stages||{},Fe=re.spec&&re.spec.stale,Ke=re.impl&&re.impl.stale,Xe=re.plan||null,Ne=T.route_source==="derived",mt=T.route||O.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ne?" detail-kv__v--derived":""}"
          title=${Ne?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ne?"unset":mt}</span
        >
      </div>
      ${T.route!=="quick_fix"||Object.hasOwn(O,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${O.spec_review||"\uC5C6\uC74C"}${Fe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Xe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Xe?.approval_receipt||"\uC5C6\uC74C"}${Xe?.approval_state==="stale"?" \xB7 stale":Xe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${T.route!=="quick_fix"||Object.hasOwn(O,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${O.impl_review||"\uC5C6\uC74C"}${Ke?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${T.planned_execution.kind}</span>
            </div>
            ${T.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${T.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${T.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Br(T.exec_receipt)}</span
            >
          </div>`:""}
      ${T.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${T.impl_entry.actor}@${T.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${O.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${O.pr_url}</span>
          </div>`:""}
    `}let ye={route:["quick_fix","spec_backed","full_plan"]};async function c(m,O){let T=O.target.value;if(m==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){v();return}await J("update-workflow-meta",{id:d,key:m,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),v()}function _(m){let O=m.metadata||{};return l` ${((re,Fe)=>{let Ke=ye[re],Xe=typeof O[re]=="string"?O[re]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${re}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${re}
          data-edit=${`wfmeta-${re}`}
          @change=${Ne=>c(re,Ne)}
        >
          <option value="" ?selected=${!Ke.includes(Xe)}>
            ${Fe}
          </option>
          ${Ke.map(Ne=>l`<option value=${Ne} ?selected=${Xe===Ne}>${Ne}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function E(m,O){return Y?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${z}
            @input=${Se}
            @keydown=${T=>vt(T,ft,Ce,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ft}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ce}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
        ${xt(O).map(T=>l`<span class="detail-usage-total" title=${T.tooltip}
              >${T.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Q}
        >
          ✎
        </button>
      </div>
    `}function H(m){let O=kt(m.created_at),T=kt(m.updated_at);return!O&&!T?l``:l`
      ${O?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${O}</span>
          </div>`:""}
      ${T?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function ae(m,O){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Tt}
        >
          ${P_.map(T=>l`<option value=${T} ?selected=${T===m}>${T}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${dr}
        >
          ${D_.map(T=>l`<option value=${String(T)} ?selected=${T===O}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function ve(m){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${X?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Et}
            >
              ✎
            </button>`}
      </div>
      ${X?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${I}
              @input=${nt}
              @keydown=${O=>vt(O,ur,yt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ur}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${yt}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function _e(m){let O=typeof m.notes=="string"?m.notes:"";return O.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${O}</div>
    `}function et(m){let O=Array.isArray(m.labels)?m.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${O.map(T=>l`<span class="detail-label-chip"
              >${T}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${T}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+T}
                @click=${()=>wt(T)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${S}
            @input=${wr}
            @keydown=${Ht}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${jt}
          >
            추가
          </button>
        </span>
      </div>
    `}function y(){if(!d)return l``;let m=p||{},O=String(m.id||d),T=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",re=lt(),Fe=m.status||"open",Ke=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",Xe=m.description||"",Ne={...m,metadata:{...m.metadata||{},...f}};return l`
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
            @click=${te}
          >
            ${O}
          </button>
          ${E(T,re)}
          ${uc(Ne)}
          ${cc({metadata:Ne.metadata,workspace_values:g(),catalog:$(),execution_defaults:P(),expanded:L,presets:Z()?.presets||[],preset_id:h,preset_busy:R,skipped_orchestration_keys:A},{onToggle:mt=>{L=mt,v()},onEdit:(mt,sr)=>{if(mt==="impl_runtime"||mt==="impl_model"||mt==="impl_effort"){N(mt,sr??"");return}C(mt,sr??"")},onPresetSelect:mt=>{h=mt,A=[],v()},onPresetApply:()=>{qe()}})}
          ${ae(Fe,Ke)} ${H(m)}
          ${ve(Xe)}
          ${Xl(k,ge,{expanded:$e,draft:F,sending:M,error:ce})}
          ${_e(m)} ${et(m)} ${kr(m)}
          ${Gt(m)} ${_(m)}
          ${Kl(m,nr)}
          ${yc({expanded:Be,loading:Ye,error:Ee,data:ot},{onToggle:Ve})}
          ${hc(Ie(),pe,{total:re,expanded:Ze})}
        </div>
      </div>
    `}function v(){Qe(y(),e)}return{load(m){m!==d&&(f={},h="",A=[],L=!1,D(),he(),Le()),d=m,p=null,rt(),x()},clear(){d=null,p=null,f={},h="",R=!1,A=[],L=!1,D(),he(),Le(),Re.close(),Ae.close(),Qe(l``,e)},destroy(){we&&(we(),we=null),Te&&(Te(),Te=null),be&&(be(),be=null),document.removeEventListener("keydown",ze),Re.destroy(),xe.parentNode&&xe.parentNode.removeChild(xe),Ae.destroy(),je.parentNode&&je.parentNode.removeChild(je),d=null,p=null,h="",R=!1,A=[],he(),Le(),Qe(l``,e)}}}function wc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,p,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:u,close:i,getElement(){return t}}}function Ys(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function kc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Xs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function N_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Ys(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function $c(e,t){let r=N_(e,t);return r?l`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?l`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?kt(r.deploy.at):""}
            >${Xs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Zs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function dn(e){let t=Nt(e.created_at),r=Nt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${kt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function q_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Fn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Qs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,h)=>(f.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,u=s?q_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:i,confirmation:p}}function vr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?l`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?l`<code>백업: ${n}</code>`:t.error?l`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?l`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?l`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var F_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function xc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:F_[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function da(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=xt(e.usage),s=Qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,u=i?Nt(e.done_at):"",d=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",R=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=l`<span class="worker-mini__title">${e.title}</span>`,L=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",q=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",Y=r.map(he=>he===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${he}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${he===e.completion_badge&&e.completion_title||""}
          >${he}</span
        >`),X=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",z=n.length>0?n.map(he=>l`<span class="worker-usage" title=${he.tooltip}
              >${he.label}</span
            >`):s?l`<span class="worker-usage" title=${an(e.usage)}
            >${s}</span
          >`:"",I=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",S=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",D=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",k=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",U=e.discard,ne=U?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${U?.attempt_id||""}
          data-operation-id=${U?.operation?.operation_id||""}
          data-discard-mode=${U?.confirmation||"unmerged"}
          ?disabled=${U?!U.enabled:e.discard_enabled===!1}
          title=${U?U.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${U?.label||"\uD3D0\uAE30"}
        </button>`:"",ce=e.stale_work||null,F=ce?l`${ce.can_resume||ce.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ce.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ce.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            다시 확인
          </button>`:""}`:"",M=ce?l`<div class="worker-mini__stale">
        <strong>${ce.title}</strong>
        <span>${ce.summary}</span>
        <span>${ce.cause}</span>
        ${ce.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",de=e.revise_action?l`<button
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
        </button>`:"",$e=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||U?.operation||e.revise_action||ce);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${h}${R}${A}</div>
          <div class="worker-mini__row2">
            ${z}${u?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${kt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Zs(e.work_ms)}</span
                >`:""}${Y}${I}
            <span class="worker-mini__actions"
              >${S}${D}${k}${ne}</span
            >
            ${dn(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${d}${p}${h}${R}${L}${q}${Y}${f}${X}
            </div>
            <div class="worker-mini__body">${A}${M}</div>
            ${$e?l`<div class="worker-mini__foot">
                  ${z}${I}
                  <span class="worker-mini__actions"
                    >${S}${D}${k}${ne}${de}${F}</span
                  >
                  ${vr(e)}
                </div>`:""}
            ${dn(e)}`:l`<div class="worker-mini__line">
              ${d}${p}${h}${R}${A}${L}${q}${Y}${f}${X}${z}${I}${S}${D}${k}${ne}
            </div>
            ${vr(e)} ${dn(e)}`}
  </div>`}function j_(e,t=null){let r=e.draggable&&!e.done,n=r&&t&&t.bead_id===e.id,s=e.workflow,o=s&&s.chips||{},a=o.route||s&&s.route,i=o.route_source==="derived"||!!(s&&s.route_source==="derived"),u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
    class="worker-card${r?"":" worker-card--static"}"
    draggable=${r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${r?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s&&a?l`<span
            class="ctl-chip ctl-chip--route${i?" is-derived":""}"
            title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${i?"unset":a}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${s?hs(s,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${n?l`<div class="worker-card__place-menu">
            ${t.lanes.map(p=>l`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${p.id}
                  title="${p.label} 대기 맨 뒤에 추가"
                >
                  <span>${p.label}</span>
                  <span class="worker-card__place-count">${p.count}</span>
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
              ?disabled=${!r}
              title=${r?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${dn(e)}
  </div>`}function rr(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
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
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:l`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":l`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?l`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?j_(n,e.place_menu):da(n))}
          </div>`}
  </section>`}function pa(e,t){return`${e}\0${t}`}function fa(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function B_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function U_(e,t){return e==="internal"&&t===void 0}function Ac(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Sc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Ac(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=B_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:U_(a,s)}}function Ec(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=pa(i.root_dir,u.id);r.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:u.id}),s.set(d,[]);for(let p of Array.isArray(u.items)?u.items:[])n.set(p.id,d)}for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=pa(i.root_dir,u.id),p=Array.isArray(u.items)?u.items[0]:null,h=!!p&&p.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],R=s.get(d);if(R)for(let A of h){let L=n.get(A);L&&L!==d&&!R.includes(L)&&R.push(L)}}let o=(i,u)=>{let d=new Set,p=[i];for(;p.length>0;){let f=p.pop();if(f===u)return!0;!f||d.has(f)||(d.add(f),p.push(...s.get(f)||[]))}return!1},a=new Map;for(let[i,u]of s){let d=[];for(let p of u){let f=r.get(p);o(p,i)&&f&&d.push(f)}d.length>0&&a.set(i,d)}return a}function Tc(e){let t=fa(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=Ac(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function Cc(e,t){return pa(e,t)}var Rc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],jn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Js(e,t){let r=Rc.find(s=>s.step===e);if(!r)return null;let n=Rc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Ic(e){let t=jn.findIndex(r=>r.step===e);return jn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Hr(e){let t=jn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function W_(e){let t=jn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:jn.length}}function eo(e){let t=W_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ma=new Set(["queued","running","retry_pending","repairing"]),Lc=new Set(["failed","succeeded"]),z_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Bn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},H_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Bn.base_containment,child_sweep:Bn.child_sweep,branch_cleanup:Bn.branch_cleanup,parent_close:Bn.parent_close};function G_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function V_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ma,...Lc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function K_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(u)}function _a(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=z_[s];if(!o)return null;let a=Js(r,`${n} ${o}`);return a?{...a,active:ma.has(s),failed:s==="failed"}:null}function Y_(e){return!e||typeof e!="object"?null:H_[e.step]||null}function Un(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Y_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=G_(e.merge_sha)?e.merge_sha:null,u=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&V_(A,t,i)).sort(K_):[],d=a?u:[],p=d.find(A=>ma.has(A.state));if(p)return _a(p);if(s)return s.step==="repo_operations"&&u[0]?_a(u[0],!0):null;let f=d.find(A=>Lc.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return _a(f);if(n){let A=Js(n.step,n.label);return A?{...A,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Bn[e.cleanup_cursor]:null;if(!h)return null;let R=Js(h.step,h.label);return R?{...R,active:!0,failed:!1}:null}function to(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Oc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Mc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Pc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ga(e){for(let t of Pc(e))if(Object.hasOwn(Oc,t))return Oc[t];return null}function ba(e){let t=null;for(let r of Pc(e))Object.hasOwn(Mc,r)&&(t=Mc[r]);return t}function ro(e){let t=ga(e),r=ba(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Dc(e,t){let r=ga(e)??ga(t),n=ba(t)??ba(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Nc=160;function Z_(e){return e.length>Nc?`${e.slice(0,Nc)}\u2026`:e}function X_(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Z_(e.command)}</code>`:""}
  </div>`}function Q_(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ha(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function qc(e){let t=e.failure?ro(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${X_(e.failure.cause_detail)}
          ${Q_(e.failure.reason)}
          ${vr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function J_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ha(t-e.started_at):"\u2014",a=ar(e),i=Sr(e),u=xt(e.usage),d=Qt(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,f=e.base_exception||null,h=e.landing,R=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${R?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?l`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?l`<button
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
            </button>`:l`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?l`<button
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
            ${A}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${h?l`<div class="rtile__landing">
          <span
            class="merge-step${h.failed?" merge-step--failed":""}"
            style=${`--progress: ${h.percent}%`}
            >${h.label}${h.index>0?l`<span class="merge-step__n"
                  >${h.index}/${h.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||u.length>0||d||p||f?l`<div class="rtile__meta">
          ${p?l`<span class="worker-mini__badge">${p}</span>`:""}
          ${f?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${f}</span
              >`:""}
          ${a?l`<span class="rtile__runner">${a}</span>`:""}
          ${u.length>0?u.map(L=>l`<span class="worker-usage" title=${L.tooltip}
                    >${L.label}</span
                  >`):d?l`<span
                  class="worker-usage"
                  title=${an(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${dn(e)} ${vr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ya(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>J_(s,t,r))}
  </div>`}function Gr(e){return l`<svg
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
  </svg>`}function va(){return Gr($r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function wa(){return Gr($r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Fc(){return Gr($r`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function jc(){return Gr($r`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Bc(){return Gr($r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Uc(){return Gr($r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Wc(){return Gr($r`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Wn=1,em=6e4,tm={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},rm=new Set(["auto_merge","merged","merge","done"]),zc={running:3,paused:2,failed:1};function nm(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function sm(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),h=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let f=zc[d.run_state],h=zc[i];if(f>h||f===h&&(d.started_at??0)>(u??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Wt(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Hc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function At(e){return e&&typeof e=="object"?e:{}}function ka(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let k of s)k&&typeof k.root_dir=="string"&&a.set(k.root_dir,k);let i=[],u=[],d=[],p=[],f=[],h=[],R=new Map,A=new Map,L=new Map;for(let k of n){if(!k||typeof k.root_dir!="string")continue;let U=k.root_dir,ne=k.name||U,ce=a.get(U),F=ce&&typeof ce.revision=="number"?ce.revision:typeof k.revision=="number"?k.revision:0,M=At(k.attempts),de=At(k.bead_titles),$e=At(k.pr_observations),he=At(k.admission),De=At(k.revise_parked),Je=At(k.merge_queue_state),He=At(k.cleanup_failed),fe=At(k.discard_operations),Pe=At(k.bead_blocked_by),ge=At(k.pr_activity),xe=Array.isArray(k.repo_operations)?k.repo_operations:[],Re=Array.isArray(k.merge_queue)?k.merge_queue:[],je=new Set(Re.filter(G=>G&&typeof G.bead_id=="string").map(G=>G.bead_id)),Ae=new Map(Re.filter(G=>G&&typeof G.bead_id=="string").map(G=>[G.bead_id,G])),Be=Array.isArray(k.queue)?k.queue:[],Ye=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).filter(G=>G&&/^s[1-5]$/.test(G.id)&&Array.isArray(G.entries)),Ee=At(k.lane_states),ot=typeof k.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(k.serial_lane_count))):Math.min(5,Ye.length);L.set(U,ot);let K=new Map(Ye.map(G=>[G.id,G])),B=new Map;for(let G of Ye)for(let ee of G.entries)ee&&typeof ee.bead_id=="string"&&B.set(ee.bead_id,G.id);let se=Array.isArray(k.done)?k.done:[];for(let G of se)G&&typeof G.bead_id=="string"&&h.push({id:G.bead_id,root_dir:U,workspace_name:ne});let Le=new Map;for(let G of se)G&&typeof G.bead_id=="string"&&typeof G.added_at=="number"&&Le.set(G.bead_id,G.added_at);let Ue=G=>({id:G,title:de[G]||G,root_dir:U,workspace_name:ne,expected_revision:F,draggable:!1}),Ve=new Set;for(let[G,ee]of sm(M,Le))Ve.add(G),u.push({...Ue(G),lane:"running",...B.has(G)?{serial_lane_id:B.get(G)}:{},attempt_id:ee.attempt_id,run_state:ee.run_state,can_pause:ee.can_pause,can_resume:ee.can_resume,started_at:ee.started_at,last_event_at:ee.last_event_at,runner:ee.runner,model:ee.model,effort:ee.effort,speed:ee.speed,resumed_from:ee.resumed_from,continuation_mode:ee.continuation_mode,usage:ee.usage,discard:cr(fe,G,{attempt_id:ee.attempt_id}),badges:ee.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:ee.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:ee.run_state==="failed"});for(let G of Array.isArray(k.pr_wait)?k.pr_wait:[]){let ee=G&&G.bead_id;if(typeof ee!="string"||Ve.has(ee))continue;Ve.add(ee);let Oe=At($e[ee]),We=At(Oe.pr),pe=Oe.gate?At(Oe.gate):null,g=je.has(ee),x=Ae.get(ee)?.continuation_action||null,$=!!x&&x.continuation===null,P=Je.active===ee,V=G.external===!0,Z=He[ee]||null,oe=At(ge[ee]),ue=Un({bead_id:ee,merge_sha:G.merge_sha,cleanup_cursor:G.cleanup_cursor,merge_progress:oe.merge_progress||null,cleanup_failed:Z,repo_operations:xe}),qe=to(ue),we=!!pe&&pe.base_badge==="\uCDA9\uB3CC",Te=!!Z&&["child_sweep","branch_cleanup","parent_close"].includes(Z.step)&&!!pe&&pe.tier==="merged",be=V&&!!Z&&!!pe&&pe.tier==="merged",ze=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier),rt=cr(fe,ee,{external:V,merge_active:P||ue?.step==="merge",merge_queued:g,cleanup_active:qe,merged:!!Z||pe?.tier==="merged"}),W=!!rt.operation;d.push({...Ue(ee),lane:"pr_wait",pr_number:typeof We.number=="number"?We.number:null,pr_url:typeof We.url=="string"?We.url:void 0,external:V,usage:Wt(M,ee),merge_step:ue,badges:$?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ue?[pe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Z?[Hr(Z.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Hr(Z.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:ue?ue.failed===!0:!!Z||ze,reason:Z&&ue?.active!==!0?eo(Z.step):"PR \uB300\uAE30",merge_action:pe?.tier==="merged"&&!Te&&!be?!1:!g||$,merge_enabled:!W&&($||pe?.enabled===!0||we||Te||be),merge_label:$?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":be||Te?"\uC815\uB9AC \uC7AC\uAC1C":we&&!Te?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:$?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":W?rt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${rt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${rt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Te?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":we?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:g&&!$,cancel_enabled:!P,continuation_mismatch:x?.mismatch||null,discard:rt,discard_action:rt.action,discard_enabled:rt.enabled,discard_title:rt.title})}let Ie=(G,ee,Oe,We)=>{let pe=G&&G.bead_id;if(typeof pe!="string"||Ve.has(pe))return null;Ve.add(pe);let g=De[pe],x=cr(fe,pe),$=x.operation?x:null,P={...Ue(pe),lane:ee,draggable:!$,discard:$||void 0,reason:Hc(he,pe),queue_position:Oe+1,queue_index:Oe,queue_length:We,badges:g?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!g,revise_action:!!g,revise_enabled:!!g&&!$,revise_title:g?g.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${g.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Pe,pe)&&(P.blocked_by=Array.isArray(Pe[pe])?Pe[pe].filter(V=>typeof V=="string"&&V.length>0):[]),P};for(let G=0;G<Be.length;G++){let ee=Ie(Be[G],"queue",G,Be.length);if(!ee)continue;p.push(ee);let Oe=R.get(U);Oe?Oe.push(ee):R.set(U,[ee])}let lt=[];for(let G=0;G<Ye.length;G++){let ee=Ye[G],Oe=[];for(let pe=0;pe<ee.entries.length;pe++){let g=Ie(ee.entries[pe],ee.id,pe,ee.entries.length);g&&(Oe.push(g),p.push(g))}if(Oe.length===0)continue;let We=At(Ee[ee.id]);lt.push({id:ee.id,index:G,items:Oe,occupied_by:Array.isArray(We.occupied_by)?We.occupied_by.filter(pe=>typeof pe=="string"):[],corrections:Array.isArray(We.corrections)?We.corrections.length:0,cycle:We.cycle===!0})}A.set(U,lt);let Ze=Array.from({length:ot},(G,ee)=>{let Oe=`s${ee+1}`,We=K.get(Oe),pe=We&&Array.isArray(We.entries)?We.entries:[],g=At(Ee[Oe]);return{id:Oe,index:pe.length,length:pe.length,occupied_by:Array.isArray(g.occupied_by)?g.occupied_by.filter(x=>typeof x=="string"):[]}});for(let G of Array.isArray(k.runnable)?k.runnable:[]){let ee=G&&G.bead_id;typeof ee!="string"||Ve.has(ee)||(Ve.add(ee),i.push({...Ue(ee),title:G.title||de[ee]||ee,lane:"runnable",draggable:!0,reason:Hc(he,ee),created_at:G.created_at??void 0,updated_at:G.updated_at??void 0,labels:Array.isArray(G.labels)?G.labels:[],spec_reviewer:typeof G.spec_reviewer=="string"?G.spec_reviewer:void 0,plan_state:G.plan_state==="approved"||G.plan_state==="authored"?G.plan_state:"none",workflow:G.route?{route:G.route,chips:{route:G.route}}:null,blocked:G.blocked===!0,...Array.isArray(G.blocked_by)?{blocked_by:G.blocked_by.filter(Oe=>typeof Oe=="string"&&Oe.length>0)}:{},place_index:Be.length,place_lanes:Ze}))}for(let G of se){let ee=G&&G.bead_id;if(typeof ee!="string"||Ve.has(ee)||(Ve.add(ee),o!==void 0&&typeof G.added_at=="number"&&G.added_at<o))continue;let Oe=nm(M,ee);f.push({...Ue(ee),lane:"done",done:!0,usage:Wt(M,ee),done_at:typeof G.added_at=="number"?G.added_at:void 0,done_kind:Oe&&typeof Oe.done_kind=="string"?Oe.done_kind:null})}}let q=new Map;s.forEach((k,U)=>{k&&typeof k.root_dir=="string"&&q.set(k.root_dir,U)});let Y=r&&r.running_sort==="repo"?"repo":"started";u.sort((k,U)=>{if(Y==="repo"){let F=q.get(k.root_dir)??Number.MAX_SAFE_INTEGER,M=q.get(U.root_dir)??Number.MAX_SAFE_INTEGER;if(F!==M)return F-M}let ne=typeof k.started_at=="number"&&Number.isFinite(k.started_at)?k.started_at:null,ce=typeof U.started_at=="number"&&Number.isFinite(U.started_at)?U.started_at:null;return ne!==null&&ce!==null&&ne!==ce?ne-ce:ne===null&&ce!==null?1:ne!==null&&ce===null?-1:k.id.localeCompare(U.id)}),f.sort((k,U)=>(U.done_at??0)-(k.done_at??0));let X=s.length>0?s:n.map(k=>({root_dir:k&&k.root_dir,name:k&&k.name,auto_advance:k&&k.auto_advance,auto_merge:k&&k.auto_merge,slots:k&&k.slots,revision:k&&k.revision,runner_catalog:k&&k.runner_catalog})),z=[];for(let k of X){if(!k||typeof k.root_dir!="string")continue;let U=R.get(k.root_dir)||[],ne=A.get(k.root_dir)||[];z.push({root_dir:k.root_dir,name:k.name||k.root_dir,auto_advance:k.auto_advance===!0,auto_merge:k.auto_merge===!0,slots:typeof k.slots=="number"&&k.slots>=Wn?k.slots:Wn,revision:typeof k.revision=="number"?k.revision:0,runner_catalog:At(k.runner_catalog),items:U,sublanes:{parallel:U,serial:ne},serial_lane_count:L.get(k.root_dir)||0})}let I={runnable:i,queue:p,queue_groups:z,running:u,pr_wait:d,done:f,automation:{total:z.length,both_on:z.filter(k=>k.auto_advance&&k.auto_merge).length}},S=fa(I);for(let k of h)S.has(k.id)||S.set(k.id,{root_dir:k.root_dir,workspace_name:k.workspace_name,lane:"done",state:"done"});for(let k of[...I.queue,...I.runnable]){if(!Object.hasOwn(k,"blocked_by"))continue;let U=S.get(k.id);k.blockers=(k.blocked_by||[]).map(ne=>Sc(ne,U,S,s)),k.blocker_warnings=k.blockers.filter(ne=>ne.missing_internal).map(ne=>`\u26A0 \uC120\uD589 ${ne.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),k.blocker_warnings.length>0&&(k.alert=!0)}let D=Ec(I.queue_groups);for(let k of I.queue_groups)for(let U of k.sublanes.serial){let ne=D.get(Cc(k.root_dir,U.id));ne&&(U.cross_wait_peers=ne)}return I}function om(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<em;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${kt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${Nt(e,t)}</span
        >`}</span
  >`}function zn(e){return l`<div class="mon-c__title">${e.title}</div>`}function Hn(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function no(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function $a(e){let t=xt(e.usage),r=Qt(e.usage);return t.length>0?t.map(n=>l`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?l`<span class="mon-c__usage" title=${an(e.usage)}
        >${r}</span
      >`:""}function xa(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function am(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${wa()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${va()}
        </button>`}
    ${e.discard?.action?l`<button
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
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${jc()}
        </button>`:""}
  </span>`}function Gc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?l`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>l`<span
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
      </span>`)}function Vc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?l`<div class="mon-blocker-warnings">
        ${t.map(r=>l`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Kc(){return l`<span class="mon-link mon-popover-owner">
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
  </span>`}function im(e,t){let r=typeof e.started_at=="number"?ha(t-e.started_at):"";return l`${zn(e)}
    <div class="mon-c__meta">
      ${xa(e)}${om(e.last_event_at,t)}${Hn(e)}${no(e)}
      ${ar(e)?l`<span class="mon-c__model">${ar(e)}</span>`:""}
      ${Sr(e)?l`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?l`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${$a(e)}${am(e)}${vr(e)}
    </div>`}function lm(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Nt(e.updated_at);return l`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Hn(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?l`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?l`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${bs(e.labels,null).map(u=>l`<span class="ctl-chip ctl-chip--label">${u}</span>`)}
      ${no(e)}
      ${i?l`<span title=${`\uC218\uC815 ${kt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?l`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Gc(e)}
      <span class="mon-c__ops">
        ${Kc()}
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
            ${(e.place_lanes||[]).map(u=>l`<button
                  type="button"
                  class="mon-place__choice"
                  data-lane=${u.id}
                  data-place-index=${String(u.index)}
                  role="menuitem"
                  aria-label=${`${u.id} \xB7 ${u.occupied_by.length>0?`\uC810\uC720 ${u.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"} \xB7 \uB300\uAE30 ${u.length}`}
                >
                  <strong>${u.id}</strong
                  ><span
                    >${u.occupied_by.length>0?`\uC810\uC720 ${u.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"}
                    · 대기 ${u.length}</span
                  >
                </button>`)}
          </span>
        </span>
      </span>
    </div>
    ${Vc(e)}`}function cm(e){let t=!!e.discard?.operation;return l`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Hn(e)}
      ${xa(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Gc(e)}
      <span class="mon-c__ops">
        ${Kc()}
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
        ${t?l`<button
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
    ${Vc(e)} ${vr(e)}
    ${e.revise_action?l`<div class="mon-c__tail">
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
        </div>`:""}`}function um(e){let t=e.merge_step||null,r=!!(Qt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return l`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${no(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${xa(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?l`<div class="mon-c__tail">
          ${$a(e)}${t?l`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?l`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?l`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?l`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?l`<button
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
          ${vr(e)}
        </div>`:""}`}function dm(e,t){let r=e.done_kind||"",n=r?tm[r]||r:"",s=Nt(e.done_at,t);return l`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${no(e)}
      ${n?l`<span
            class="mon-live__kind${rm.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${$a(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${kt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Yc(e,t){return e.lane==="running"?im(e,t):e.lane==="runnable"?lm(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?cm(e):e.lane==="pr_wait"?um(e):dm(e,t)}function Zc(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return l`<header
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
        ${e.auto_advance?wa():va()}
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
        ${Bc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Uc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Wn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Xc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=or.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Fc():Wc()}
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
        ${or.map(i=>l`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>l`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Qc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Jc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return xt(xs(t));let r={};for(let i of _r)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let u=i&&i.usage;if(u&&typeof u=="object"){let d=!1;for(let p of _r){let f=u[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,d=!0)}if(d){o+=1;let p=u.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Qt(r):null}var eu="bdui.monitor.done-range",tu="bdui.monitor.running_sort",ru="beads-ui.monitor.candidate-filter",Aa={show_blocked:!1};function pm(){try{let e=window.localStorage.getItem(ru);if(!e)return{...Aa};let t=JSON.parse(e);return!t||typeof t!="object"?{...Aa}:{show_blocked:t.show_blocked===!0}}catch{return{...Aa}}}function fm(e){try{window.localStorage.setItem(ru,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function _m(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function mm(){try{let e=window.localStorage.getItem(eu);return Ut(e)?e:Dt}catch{return Dt}}function gm(e){try{window.localStorage.setItem(eu,e)}catch{}}function bm(){try{return window.localStorage.getItem(tu)==="repo"?"repo":"started"}catch{return"started"}}function hm(e){try{window.localStorage.setItem(tu,e)}catch{}}var nu="tab:monitor:pipeline",ym=1e3,vm=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function so(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return l`<div
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
    ${Yc(e,t)}
  </div>`}function wm(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?l`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>so(s,t))}
        </div>
      </section>`:l`<div class="mon-group__list">
        ${e.items.map(s=>so(s,t))}
      </div>`;return l`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Zc(e)} ${n}
    ${r?e.sublanes.serial.map(s=>l`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?l`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?l`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>l`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?l`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>so(o,t))}
              </div>
            </section>`):""}
  </div>`}function su(e,t){let r=_t("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,u=t.now||(()=>Date.now()),d=t.confirm||(g=>typeof globalThis.confirm!="function"||globalThis.confirm(g)),p=mm(),f=bm(),h=pm();function R(){let g=or.find(x=>x.value===p);return g?g.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let L=ka(null,null),q=new Map,Y=null,X=null;async function z(g,x,$,P,V=!0){if(!o||!$)return null;let Z=await o(g,{...x,root_dir:$,expected_revision:P});if(Z&&Z.conflict&&V){Z.queue&&q.set($,Z.queue);let oe=Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:P;Z=await o(g,{...x,root_dir:$,expected_revision:oe})}return Z&&Z.queue&&$&&q.set($,Z.queue),Z}function I(g,x){let $=q.get(g),P=s&&s.get?s.get():null,V=(Array.isArray(P)?P:[]).find(oe=>oe?.root_dir===g);return($||V)?.merge_queue?.find(oe=>oe.bead_id===x)?.continuation_action}async function S(g,x,$,P){let V=await z(g,x,$,P),Z=q.get($)?.revision??V?.queue?.revision??P;return fr(V,(oe,ue)=>z(g,{...x,continuation:oe,decision_token:ue},$,Z,!1),{refresh:oe=>z(g,x,$,oe?.queue?.revision??q.get($)?.revision??Z,!1)})}async function D(g,x,$,P){let V=await fr({continuation_mismatch:P},(oe,ue)=>z("worker-merge-queue-add",{bead_id:x,continuation:oe,decision_token:ue},g,$,!1)),Z=V?.queue?.merge_queue?.find(oe=>oe.bead_id===x)?.continuation_action;V?.applied!==!0&&Z?.continuation===null&&Z.mismatch&&await D(g,x,V.queue.revision,Z.mismatch)}async function k(g,x,$){let P=await z("worker-discard",g,x,$);if(P&&P.discarded===!0){ie(Qs(P),"success",5e3);return}if(P&&P.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${P.reason}`,"error");return}if(P&&P.accepted&&P.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(P&&P.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${P.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}P&&!P.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function U(g,x,$){return!o||!$?null:await o(g,{...x,root_dir:$})}async function ne(g){if(!o||!g&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let x=await o("monitor-auto-toggle",{on:g}),$=x&&Array.isArray(x.failed)?x.failed:[];$.length>0&&ie(`\uC790\uB3D9\uD654 ${g?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${$.map(P=>P.root_dir).join(", ")}`,"error",3200)}async function ce(){let g=new Map;for(let x of L.pr_wait)g.has(x.root_dir)||g.set(x.root_dir,x.expected_revision);for(let[x,$]of g)await z("worker-merge-queue-add-all",{},x,$)}let F=null,M=!1,de=null;function $e(){de!==null&&clearTimeout(de),de=setTimeout(()=>{de=null,M=!1},0)}function he(g){let x=g.target;return typeof x?.closest=="function"?x.closest(".mon-group"):null}function De(g){let x=he(g);return!x||!F?null:(x.getAttribute("data-root-dir")||"")===F.root_dir?x:null}function Je(){for(let g of Array.from(A.querySelectorAll(".mon-group--drag-over")))g.classList.remove("mon-group--drag-over")}function He(g){let x=g.target,$=typeof x?.closest=="function"?x.closest('.mon-card[draggable="true"]'):null;if($){F={bead_id:$.getAttribute("data-issue-id")||"",lane:$.getAttribute("data-lane")||"",root_dir:$.getAttribute("data-root-dir")||"",revision:Number($.getAttribute("data-revision")||0)||0,queue_index:Number($.getAttribute("data-queue-index")),queue_length:Number($.getAttribute("data-queue-length")),place_index:Number($.getAttribute("data-place-index"))},M=!0;try{g.dataTransfer?.setData("text/plain",F.bead_id),g.dataTransfer&&(g.dataTransfer.effectAllowed="move")}catch{}}}function fe(g){let x=De(g);x&&(g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect="move"),x.classList.add("mon-group--drag-over"))}function Pe(g){he(g)?.classList.remove("mon-group--drag-over")}function ge(){F=null,Je(),$e()}function xe(g){let x=De(g),$=F;if(F=null,Je(),!x||!$||!$.bead_id)return;g.preventDefault();let P=g.target,V=typeof P?.closest=="function"?P.closest('.mon-card[data-lane="queue"]'):null,Z=V&&x.contains(V)?Number(V.getAttribute("data-queue-index")):NaN;if($.lane==="runnable"){let qe=Number.isFinite(Z)?Z:$.place_index;if(!Number.isFinite(qe))return;z("worker-queue-place",{bead_id:$.bead_id,index:qe},$.root_dir,$.revision);return}if($.lane!=="queue"||V&&V.getAttribute("data-issue-id")===$.bead_id)return;let oe=$.queue_index,ue=Number.isFinite(Z)?oe>Z?Z:Z-1:$.queue_length-1;!Number.isFinite(ue)||ue<0||ue===oe||z("worker-queue-reorder",{bead_id:$.bead_id,to_index:ue},$.root_dir,$.revision)}function Re(g){let x=_m(L.runnable,h),$={runnable:x.visible,queue:L.queue,running:L.running,pr_wait:L.pr_wait,done:L.done};return l`${Xc({automation:L.automation,counts:{running:L.running.length,queue:L.queue.length,pr_wait:L.pr_wait.length},running_sort:f,done_range:p,token_total:Jc(L.done),token_tooltip:Qc(R())})}
      <div class="worker-lanes mon-lanes">
        ${vm.map(P=>{let V=$[P.lane],Z=P.lane==="queue"?L.queue_groups.length>0?l`${L.queue_groups.map(oe=>wm(oe,g))}`:void 0:V.length>0?l`${V.map(oe=>so(oe,g))}`:void 0;return rr({id:`monitor-${P.lane}`,lane:P.pane,title:P.lane==="done"?`\uC644\uB8CC\xB7${R()}`:P.title,items:V,empty:P.empty,body:Z,live:P.lane==="running"&&V.length>0,header_control:P.lane==="runnable"?l`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${h.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${x.hidden_blocked>0?l`<span class="worker-filter__hidden"
                          >숨김 ${x.hidden_blocked}건</span
                        >`:""}
                  </span>`:P.lane==="pr_wait"&&V.length>0?l`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function je(){let g=s&&s.get?s.get():null,x=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=u();L=ka(g,x,{done_since:Nr(p,$),running_sort:f}),Qe(Re($),A)}function Ae(g,x){let $=a?a():void 0;if(!x||!$||x===$||!i){n(g);return}i(x).then(()=>{n(g)}).catch(P=>{r("workspace switch for %s failed: %o",x,P)})}function Be(g){return{root_dir:g.getAttribute("data-root-dir")||"",revision:Number(g.getAttribute("data-revision")||0)||0}}function Ye(g){if(typeof g=="string"&&g.length>0)return g;if(g&&typeof g=="object"){let x=g;if(typeof x.message=="string"&&x.message.length>0)return x.message;if(typeof x.error=="string"&&x.error.length>0)return x.error;if(x.error&&typeof x.error=="object"&&typeof x.error.message=="string")return x.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ee(g,x){let $=g.querySelector(".mon-link__trigger"),P=g.querySelector(".mon-link__popover"),V=g.querySelector(".mon-link__error");!$||!P||!V||(Le(),P.hidden=!1,$.setAttribute("aria-expanded","true"),V.textContent=x,V.hidden=!1)}async function ot(g,x,$){let P=x.getAttribute("data-root-dir")||"",V=x.getAttribute("data-issue-id")||"";if(!(!V||!$||$===V))try{await U(g,{a:V,b:$},P),Le()}catch(Z){Ee(x,Ye(Z))}}function K(g,x){let{root_dir:$,revision:P}=Be(g),V=g.getAttribute("data-issue-id")||"",Z=x.dataset.attemptId||g.getAttribute("data-attempt-id")||"",oe=x.classList;if(oe.contains("mon-link__trigger")){Ve(x);return}if(oe.contains("mon-link__candidate")||oe.contains("mon-link__direct")){let ue=x.dataset.targetId||"";ot("dep-add",g,ue);return}if(oe.contains("mon-blocker__remove")){let ue=x.dataset.blockerId||"";ot("dep-remove",g,ue);return}if(oe.contains("mon-place__choice")){let ue=x.dataset.lane||"parallel",qe=Number(x.dataset.placeIndex||0)||0;Le(),z("worker-queue-place",{bead_id:V,...ue==="parallel"?{}:{lane:ue},index:qe},$,P);return}if(oe.contains("worker-card__place")){Ue(x);return}if(oe.contains("mon-op--up")||oe.contains("mon-op--down")){let ue=Number(g.getAttribute("data-queue-index")||0)||0,qe=oe.contains("mon-op--up")?ue-1:ue+1;if(qe<0)return;z("worker-queue-reorder",{bead_id:V,.../^s[1-5]$/.test(g.dataset.lane||"")?{lane:g.dataset.lane}:{},to_index:qe},$,P);return}if(oe.contains("mon-op--remove")){z("worker-queue-remove",{bead_id:V},$,P);return}if(oe.contains("mon-op--pause")){U("worker-attempt-pause",{attempt_id:Z},$);return}if(oe.contains("mon-op--discard")){if(!d(Fn(V,"unmerged")))return;k({bead_id:V,...Z?{attempt_id:Z}:{},...x.dataset.operationId?{operation_id:x.dataset.operationId}:{}},$,P);return}if(oe.contains("mon-op--resume")){sn().then(ue=>{if(ue!==null)return S("worker-attempt-resume",{attempt_id:Z,...ue!==""?{instructions:ue}:{}},$,P)});return}if(oe.contains("mon-op--dismiss")){z("worker-attempt-dismiss",{attempt_id:Z},$,P);return}if(oe.contains("worker-mini__merge")){let ue=I($,V);ue?.mismatch&&ue.continuation===null?D($,V,P,ue.mismatch):z("worker-merge-queue-add",{bead_id:V},$,P);return}if(oe.contains("worker-mini__merge-cancel")){z("worker-merge-queue-remove",{bead_id:V},$,P);return}if(oe.contains("worker-mini__discard")){let ue=x.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Fn(V,ue)))return;k({bead_id:V,...Z?{attempt_id:Z}:{},...x.dataset.operationId?{operation_id:x.dataset.operationId}:{}},$,P);return}if(oe.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:V},$,P);return}oe.contains("worker-mini__revise-approve")&&z("worker-revise-approve",{bead_id:V},$,P)}function B(g){g.querySelector(".mon-link__list")?.replaceChildren();let $=g.querySelector(".mon-link__search");$&&($.value="");let P=g.querySelector(".mon-link__direct");P&&(P.hidden=!0,P.dataset.targetId="",P.textContent="");let V=g.querySelector(".mon-link__empty");V&&(V.hidden=!0);let Z=g.querySelector(".mon-link__error");Z&&(Z.hidden=!0,Z.textContent="")}function se(g,x){let $=g.querySelector(".mon-link__list");if(!$)return;let P=document.createDocumentFragment(),V=Tc(L).filter(Z=>Z.id!==x);for(let Z of V){let oe=document.createElement("button");oe.type="button",oe.className="mon-link__candidate",oe.dataset.targetId=Z.id,oe.dataset.search=`${Z.id} ${Z.title} ${Z.location}`.toLocaleLowerCase();let ue=document.createElement("strong");ue.textContent=Z.id;let qe=document.createElement("span");qe.textContent=Z.title;let we=document.createElement("small");we.textContent=Z.location,oe.append(ue,qe,we),P.append(oe)}$.replaceChildren(P)}function Le(){for(let g of Array.from(A.querySelectorAll(".mon-card-popover"))){let x=g;x.hidden=!0,x.classList.contains("mon-link__popover")&&B(x)}for(let g of Array.from(A.querySelectorAll('[aria-expanded="true"]')))g.setAttribute("aria-expanded","false")}function Ue(g){let $=g.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!$)return;let P=$.hidden;Le(),P&&($.hidden=!1,g.setAttribute("aria-expanded","true"))}function Ve(g){let $=g.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!$)return;let P=$.hidden;if(Le(),P){let V=g.closest(".mon-card");se($,V?.getAttribute("data-issue-id")||""),$.hidden=!1,g.setAttribute("aria-expanded","true");let Z=$.querySelector(".mon-link__search");Z&&(Ie(Z),Z.focus())}}function Ie(g){let x=g.closest(".mon-link__popover"),$=g.closest(".mon-card");if(!x||!$)return;let P=g.value.trim(),V=P.toLocaleLowerCase(),Z=0,oe=!1;for(let be of Array.from(x.querySelectorAll(".mon-link__candidate"))){let ze=be,rt=ze.dataset.targetId||"",W=V.length===0||(ze.dataset.search||"").includes(V);ze.hidden=!W,W&&(Z+=1),rt.toLocaleLowerCase()===V&&(oe=!0)}let ue=x.querySelector(".mon-link__direct"),qe=$.getAttribute("data-issue-id")||"";if(ue){let be=P.length>0&&!oe&&V!==qe.toLocaleLowerCase();ue.hidden=!be,ue.dataset.targetId=be?P:"",ue.textContent=be?`\uC9C1\uC811 \uC785\uB825 \xB7 ${P}`:"",be&&(Z+=1)}let we=x.querySelector(".mon-link__empty");we&&(we.hidden=Z>0);let Te=x.querySelector(".mon-link__error");Te&&(Te.hidden=!0,Te.textContent="")}function lt(g){let x=g.target;x&&A.contains(x)&&typeof x.closest=="function"&&x.closest(".mon-popover-owner")||Le()}function Ze(g){if(g.key!=="Escape")return;let x=A.querySelector('[aria-expanded="true"]');Le(),x?.focus()}function G(g){let x=M;M=!1;let $=g.target;if(!$||typeof $.closest!="function"||$.closest("dialog")||$.closest("a"))return;let P=$.closest(".mon-running-sort");if(P){g.preventDefault(),f=P.getAttribute("data-sort")==="repo"?"repo":"started",hm(f),je();return}let V=$.closest(".mon-auto-all");if(V){g.preventDefault(),ne(V.getAttribute("data-on")==="true");return}if($.closest(".mon-merge-all")){g.preventDefault(),ce();return}let oe=$.closest(".mon-ctl--advance");if(oe){g.preventDefault();let{root_dir:be,revision:ze}=Be(oe);z("worker-automation-toggle",{on:oe.getAttribute("data-on")==="true"},be,ze);return}let ue=$.closest(".mon-ctl--merge-auto");if(ue){g.preventDefault();let{root_dir:be,revision:ze}=Be(ue);z("worker-merge-auto-toggle",{on:ue.getAttribute("data-on")==="true"},be,ze);return}let qe=$.closest(".mon-card");if(!qe)return;let we=$.closest("button");if(we){g.preventDefault(),K(qe,we);return}let Te=qe.getAttribute("data-issue-id");Te&&!x&&(g.preventDefault(),Ae(Te,qe.getAttribute("data-root-dir")||""))}function ee(g){let x=g.target;if(!x||typeof x.closest!="function")return;let $=x.closest(".mon-filter__blocked");if($){h={show_blocked:$.checked},fm(h),je();return}let P=x.closest(".mon-done-range");if(P){p=Ut(P.value)?P.value:Dt,gm(p),je();return}let V=x.closest(".mon-slots__input");if(!V)return;let{root_dir:Z,revision:oe}=Be(V),ue=Number(V.value);if(!Number.isFinite(ue))return;let qe=Math.max(Wn,Math.floor(ue));z("worker-queue-set-slots",{slots:qe},Z,oe)}function Oe(g){let x=g.target;x?.classList.contains("mon-link__search")&&Ie(x)}e.addEventListener("click",G),e.addEventListener("change",ee),e.addEventListener("input",Oe),e.addEventListener("dragstart",He),e.addEventListener("dragover",fe),e.addEventListener("dragleave",Pe),e.addEventListener("drop",xe),e.addEventListener("dragend",ge),document.addEventListener("click",lt),document.addEventListener("keydown",Ze),s&&typeof s.subscribe=="function"&&(Y=s.subscribe(()=>{try{q.clear(),je()}catch{}}));function We(){X!==null&&(clearInterval(X),X=null)}function pe(){de!==null&&(clearTimeout(de),de=null)}return{load(){r("load"),je(),X===null&&(X=setInterval(()=>{try{if(A.querySelector(".mon-card-popover:not([hidden])"))return;je()}catch{}},ym))},pause(){We()},clear(){We(),pe(),Y&&(Y(),Y=null),e.removeEventListener("click",G),e.removeEventListener("change",ee),e.removeEventListener("input",Oe),e.removeEventListener("dragstart",He),e.removeEventListener("dragover",fe),e.removeEventListener("dragleave",Pe),e.removeEventListener("drop",xe),e.removeEventListener("dragend",ge),document.removeEventListener("click",lt),document.removeEventListener("keydown",Ze),e.replaceChildren()}}}function ou(e,t,r){let n=_t("views:nav"),s=null;function o(u){return d=>{d.preventDefault(),n("click tab %s",u),r.gotoView(u)}}function a(){let u=t.getState(),d=u.view==="worker"||u.view==="monitor"?u.view:"board";return l`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${d==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${d==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${d==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function i(){Qe(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Qe(l``,e)}}}var au=["bug","feature","task","epic","chore"];function iu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var lu=["Critical","High","Medium","Low","Backlog"];function cu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),u=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function R(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let D of au){let k=document.createElement("option");k.value=D,k.textContent=iu(D),o.appendChild(k)}a.replaceChildren();for(let D=0;D<=4;D+=1){let k=document.createElement("option");k.value=String(D);let U=lu[D]||"Medium";k.textContent=`${D} \u2013 ${U}`,a.appendChild(k)}}R();function A(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(S){s.disabled=S,o.disabled=S,a.disabled=S,i.disabled=S,u.disabled=S,p.disabled=S,f.disabled=S,f.textContent=S?"Creating\u2026":"Create"}function q(){d.textContent=""}function Y(S){d.textContent=S}function X(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let D=window.localStorage.getItem("beads-ui.new.priority");D&&/^\d$/.test(D)?a.value=D:a.value="2"}catch{o.value="",a.value="2"}}function z(){let S=o.value||"",D=a.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),D.length>0&&window.localStorage.setItem("beads-ui.new.priority",D)}async function I(){q();let S=String(s.value||"").trim();if(S.length===0){Y("Title is required"),s.focus();return}let D=Number(a.value||"2");if(!(D>=0&&D<=4)){Y("Priority must be 0..4"),a.focus();return}let k=String(o.value||""),U=String(u.value||""),ne={title:S};k.length>0&&(ne.type=k),String(D).length>0&&(ne.priority=D),U.length>0&&(ne.description=U),L(!0);try{await t("create-issue",ne)}catch{L(!1),Y("Failed to create issue");return}z(),L(!1),A()}return r.addEventListener("cancel",S=>{S.preventDefault(),A()}),h.addEventListener("click",()=>A()),p.addEventListener("click",()=>A()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),I())}),n.addEventListener("submit",S=>{S.preventDefault(),I()}),{open(){n.reset(),q(),X();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var km=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function $m(e,t){return To(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function uu(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=$m(n,e);return l`<button
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
  `}function du(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>l`<span class="settings-dialog__prefix">
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
  `}function pu(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${km.map(([r,n])=>l`<label class="settings-dialog__toggle">
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
  `}var xm=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],qt="";function Ft(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function fu(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(g=>ie(g,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",u=!1,d="",p={},f={},h=[],R=!1,A=null,L={},q="",Y="",X=!1,z=!1,I=!1,S=null;function D(){let g=t.queueStore?.get();return Ft(g)?g.runner_catalog:null}function k(){let g=t.queueStore?.get();return Ft(g)&&Ft(g.execution_defaults)?g.execution_defaults:null}function U(){let g=t.implPresetStore?.get();return Ft(g)&&Array.isArray(g.presets)?g:null}async function ne(){R=!0,Ie();try{let g=await r("get-session-defaults",{});p=Ft(g?.values)?{...g.values}:{},f={...p},h=Array.isArray(g?.warnings)?g.warnings:[]}catch(g){h=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${g instanceof Error?g.message:String(g)}`)}finally{R=!1,Ie()}}async function ce(){let g=nc(p,f);if(Object.keys(g).length!==0){try{let x=await r("set-session-defaults",{values:g});p=Ft(x?.values)?{...x.values}:{},f={...p},h=Array.isArray(x?.warnings)?x.warnings:[]}catch(x){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}Ie()}}function F(g,x){x===qt?delete f[g]:f[g]=x,Ie(),ce()}async function M(){let g=t.queueStore?.get();if(!Ft(g))return;let x={orchestration_model:g.orchestration_model??null,orchestration_effort:g.orchestration_effort??null,orchestration_speed:g.orchestration_speed??null},$=sc(x,{...x,...L});if(Object.keys($).length!==0){try{let P=await r("worker-queue-set-orchestration-defaults",{expected_revision:g.revision,values:$});if(P&&P.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}L={}}catch(P){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${P instanceof Error?P.message:String(P)}`)}Ie()}}function de(g,x){L[g]=x===qt?null:x,Ie(),M()}async function $e(g){let x=t.queueStore?.get();if(!(!Ft(x)||g<1)){try{await r("worker-queue-set-slots",{expected_revision:x.revision,slots:g})}catch($){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Ie()}}function he(){let g={},x=Be();for(let $ of ec){let P=Cr.includes($)?x[$]:f[$];typeof P=="string"&&P.length>0&&(g[$]=P)}return g}async function De(){let g=U();if(!g)return;let x=he();if(Object.keys(x).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let $=(g.presets||[]).find(V=>V.id===q),P=Y.trim()||($?$.name:"");if(!P){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let V=$?await r("impl-preset-update",{expected_revision:g.revision,id:$.id,name:P,settings:x}):await r("impl-preset-create",{expected_revision:g.revision,name:P,settings:x});if(V&&V.applied){if(Y="",!$&&Array.isArray(V.presets)){let Z=V.presets.find(oe=>oe.name===P);q=Z?Z.id:q}Ie()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ie()}catch(V){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function Je(){let g=U();if(!(!g||q.length===0))try{let x=await r("impl-preset-delete",{expected_revision:g.revision,id:q});x&&x.applied?(q="",Ie()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ie())}catch(x){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${x instanceof Error?x.message:String(x)}`)}}async function He(){let g=U(),x=t.queueStore?.get();if(!(!g||!Ft(x)||q.length===0)){try{let $=await r("apply-impl-preset-global",{preset_id:q,expected_revision:g.revision,expected_queue_revision:x.revision});$&&$.applied?(p=Ft($.values)?{...$.values}:{},f={...p},h=Array.isArray($.warnings)?$.warnings:[],Ft($.queue)&&(t.queueStore?.set?.($.queue),L={}),$.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):$&&$.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch($){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Ie()}}async function fe(){z=!0,I=!1,Ie();try{let g=await r("get-worker-system-prompt",{});!g||typeof g!="object"||Array.isArray(g)?I=!0:S=g}catch{I=!0}finally{z=!1,Ie()}}function Pe(){if(X=!X,X&&!S){fe();return}Ie()}function ge(){let g=cn({loading:z,error:I});if(g)return g;if(!S)return"";let x=Array.isArray(S.variants)?S.variants:[];return l`<div class="settings-dialog__sp-body">
      ${S.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${S.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${x.map($=>l`<div class="settings-dialog__sp-variant" data-variant=${$.key}>
            <div class="settings-dialog__sp-cond">${$.condition}</div>
            ${hr($.label,$.system_prompt)}
          </div>`)}
    </div>`}function xe(){return l`<section
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
        aria-expanded=${X?"true":"false"}
        @click=${Pe}
      >
        ${X?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${X?ge():""}
    </section>`}function Re(g,x,$,P,V,Z){let oe=V[g]??qt,ue=sa(g,$,V,k(),D()),qe=ue.options.find(Te=>Te.value===oe),we=oe===qt?ue.full_value:qe?.full_value;return l`<select
        class=${oe===qt?"settings-dialog__unset":""}
        data-key=${g}
        aria-label=${x}
        title=${we||""}
        ?disabled=${Z===!0||ue.disabled}
        .value=${zr(String(oe))}
        @change=${Te=>P(g,String(Te.target.value))}
      >
        <option value=${qt} ?selected=${oe===qt}>
          ${ue.unset_label}
        </option>
        ${ue.options.map(Te=>l`<option
              value=${Te.value}
              title=${Te.full_value||""}
              ?selected=${Te.value===oe}
            >
              ${Te.label}
            </option>`)}
      </select>
      ${oe===qt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function je(g,x,$,P,V,Z=!1){return l`<div
      class=${`settings-dialog__row${Z?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${x}</span>
      <span class="settings-dialog__controls">
        ${Re(g,x,$,P,V,Z)}
      </span>
    </div>`}function Ae(g,x,$,P,V){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${x}-on)`}
        ></i>
        ${g}
      </span>
      <span class="settings-dialog__controls">
        ${Re($,`${g} \uBAA8\uB378`,P,F,f,!1)}
        ${Re(V,`${g} effort`,zs,F,f,!1)}
      </span>
    </div>`}function Be(){let g=t.queueStore?.get(),x={};for(let $ of Cr)x[$]=Object.prototype.hasOwnProperty.call(L,$)?L[$]:Ft(g)&&typeof g[$]=="string"?g[$]:null;return x}function Ye(){let g=D(),x=f.impl_runtime,$=f.impl_model,P=U(),V=t.queueStore?.get(),Z=Be(),oe=Gs(g,A),ue=un(g,A||void 0,Z.orchestration_model||lr).filter(be=>be!==lr),qe=Ft(V)&&typeof V.slots=="number"?V.slots:2,we=k()?.supported===!0,Te=sa("workflow_mode",Dn,f,k(),g);return l`
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
        ${h.length>0?l`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${h.join(", ")}
            </div>`:""}
        ${we?"":l`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${R?l`<div class="settings-dialog__empty">불러오는 중…</div>`:l`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${zr(q)}
                  @change=${be=>{q=String(be.target.value),Ie()}}
                >
                  <option value="" ?selected=${q===""}>
                    실행 프리셋…
                  </option>
                  ${(P?.presets||[]).map(be=>l`<option
                        value=${be.id}
                        ?selected=${be.id===q}
                      >
                        ${be.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${q.length===0}
                  @click=${He}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${q?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${zr(Y)}
                  @input=${be=>{Y=String(be.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${De}
                >
                  ${q?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${q.length===0}
                  @click=${Je}
                >
                  삭제
                </button>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${zr(A||qt)}
                      @change=${be=>{let ze=String(be.target.value);A=ze===qt?null:ze,Ie()}}
                    >
                      <option
                        value=${qt}
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
                ${je("orchestration_model","\uBAA8\uB378",oe,de,Z)}
                ${je("orchestration_effort","effort",ue,de,Z)}
                ${je("orchestration_speed","\uC18D\uB3C4",Pn,de,Z)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${qt}
                        aria-pressed=${String(!f.workflow_mode)}
                        @click=${()=>F("workflow_mode",qt)}
                      >
                        ${Te.unset_label}
                      </button>
                      ${f.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Dn.map(be=>l`<button
                            type="button"
                            data-mode=${be}
                            aria-pressed=${String(f.workflow_mode===be)}
                            @click=${()=>F("workflow_mode",be)}
                          >
                            ${be}
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
                ${Ae("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Nn,"spec_review_effort")}
                ${Ae("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ws,"plan_review_effort")}
                ${Ae("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Nn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${je("impl_runtime","\uC704\uC784 \uB300\uC0C1",Us,F,f)}
                ${je("impl_model","\uBAA8\uB378",Hs(g,x),F,f)}
                ${je("impl_effort","effort",un(g,x,$),F,f)}
                ${je("impl_speed","\uC18D\uB3C4",Pn,F,f)}
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
                        @click=${()=>$e(qe-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${qe}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>$e(qe+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${xe()}
            `}
      </section>
    `}function Ee(){let g=n.get();return l`
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
        ${g?l`
              ${uu(g,s(),se)}
              ${du(g,d,{onDraft:x=>{d=x},onAdd:Le,onRemove:Ue})}
              ${pu(g,Ve)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function ot(g){let x=n.get();if(x)try{let $=await r("display-policy-set",{expected_revision:x.revision,policy:g(x)});K($),$&&$.conflict&&$.policy&&($=await r("display-policy-set",{expected_revision:$.policy.revision,policy:g($.policy)}),K($)),$&&$.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function K(g){g&&g.policy&&typeof g.policy=="object"&&n.set(g.policy)}function B(g){ot(g)}function se(g){let x=n.get();if(!x)return;let $=!Am(g,x);B(P=>Sm(g,P,$))}function Le(){let g=d.trim();g.length!==0&&(d="",B(x=>x.hidden_prefixes.includes(g)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,g]}),Ie())}function Ue(g){B(x=>({hidden_prefixes:x.hidden_prefixes.filter($=>$!==g)}))}function Ve(g){let x=n.get();if(!x)return;let $=x.chips[g]===!1;B(()=>({chips:{[g]:$}}))}function Ie(){Qe(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${xm.map(g=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${g.id}
                  aria-selected=${String(i===g.id)}
                  aria-controls=${`settings-pane-${g.id}`}
                  @click=${()=>lt(g.id)}
                >
                  <span class="settings-dialog__glyph">${g.glyph}</span>
                  ${g.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${pe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${Ye()} ${Ee()}
          </div>
        </div>
      `,a)}function lt(g){i=g,Ie()}let Ze=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Ze),a.addEventListener("cancel",Ze);let G=g=>{g.target===a&&pe()};a.addEventListener("click",G);let ee=null;n.subscribe&&(ee=n.subscribe(()=>{u&&Ie()}));let Oe=null;t.implPresetStore?.subscribe&&(Oe=t.implPresetStore.subscribe(()=>{u&&Ie()}));function We(g="execution"){u||(u=!0,t.onOpenChange?.(!0),i=g,d="",L={},Ie(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),ne())}function pe(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:We,close:pe,sessionDraft:()=>({...f}),destroy(){u=!1,a.removeEventListener("close",Ze),a.removeEventListener("cancel",Ze),a.removeEventListener("click",G),ee&&(ee(),ee=null),Oe&&(Oe(),Oe=null),a.remove()}}}function Am(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Sm(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Em=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],_u="usage-meter-card",mu=600,Tm=["token_expired","relogin_required"];function gu(e){return String(e).padStart(2,"0")}function Cm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Rm(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${gu(n.getHours())}:${gu(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Em[n.getMonth()]} ${n.getDate()} ${o}`;return`${Cm(r,t)} \xB7 ${i}`}function Im(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function bu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function hu(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var yu=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function wu(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function Lm(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:wu(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Om(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Lm(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?wu(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function vu(e,t){return`${e}:${t}`}function ku(e){let t=!1,r=!1,n=new Map,s=null,o=new Map,a=new Map,i=0;function u(){Qe(l``,e),e.hidden=!0}function d(){r||(r=!0,document.addEventListener("mousedown",f),document.addEventListener("keydown",h))}function p(){r&&(r=!1,document.removeEventListener("mousedown",f),document.removeEventListener("keydown",h))}function f(F){let M=F.target;M&&e.contains(M)||(p(),U())}function h(F){F.key==="Escape"&&(p(),U())}function R(){r?p():d(),U()}function A(){p(),U()}async function L(F,M){if(n.has(F.key))return;let de=vu(F.key,M);n.set(F.key,M),a.delete(de),U();let $e=null;try{$e=await(await fetch(F.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:M})})).json()}catch{$e=null}if(t)return;if(n.delete(F.key),!$e||$e.ok!==!0){let De=$e&&typeof $e.error=="string"&&$e.error.length>0?$e.error:"network_error";a.set(de,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${De}`}),U();return}let he=Array.isArray($e.warnings)?$e.warnings.filter(De=>typeof De=="string"&&De.length>0):[];he.length>0&&a.set(de,{kind:"warn",text:he.join(" \xB7 ")}),U(),await ce()}function q(F,M,de,$e){let he=hu(F.pct),Je=`resets ${Rm(F.resetsAt,$e)}${M?` \xB7 ${de}`:""}`;return l`<span
      class="usage-meter__window ${bu(he)}"
      style=${`--progress: ${he}%`}
      title=${Je}
    >
      <span class="usage-meter__label">${F.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${he}%</span>
    </span>`}function Y(F,M,de){let $e=M.available&&typeof M.ageSeconds=="number"&&M.ageSeconds>mu,he=$e&&typeof M.ageSeconds=="number"?`${Math.floor(M.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",De=M.accounts.filter(Je=>!Je.active).length;return l`<span
      class="usage-meter__group${$e?" usage-meter__group--stale":""}"
      aria-label=${`${F.label} usage`}
    >
      <span class="usage-meter__provider">${F.label}</span>
      ${M.available?M.windows.map(Je=>q(Je,$e,he,de)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${De>0?l`<span class="usage-meter__badge">+${De}</span>`:""}
    </span>`}function X(F,M){return l`<span class="usage-meter" aria-label="Usage">
      ${F.map(de=>Y(de.provider,de.snapshot,M))}
    </span>`}function z(F){let M=hu(F.pct);return l`<span
      class="usage-meter__account-window ${bu(M)}"
      style=${`--progress: ${M}%`}
    >
      <span class="usage-meter__account-key">${F.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${M}%</span>
    </span>`}function I(F,M){return Tm.includes(M)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${F.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function S(F,M){let de=M.status==="ok",$e=typeof M.ageSeconds=="number"&&M.ageSeconds>mu,he=a.get(vu(F.key,M.number)),De=n.get(F.key),Je=De!==void 0,He=De===M.number,fe=["usage-meter__account"];return M.active&&fe.push("usage-meter__account--active"),de||fe.push("usage-meter__account--unavailable"),$e&&fe.push("usage-meter__account--stale"),l`<div class=${fe.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${M.email}
          >${M.alias===null?M.email:M.alias}</span
        >
        ${M.plan===null?"":l`<span class="usage-meter__account-tag">${M.plan}</span>`}
        ${M.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${M.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${Im(M.ageSeconds)}</span
            >`}
        ${M.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Je}
              @click=${()=>{L(F,M.number)}}
            >
              ${He?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${de?l`<div class="usage-meter__account-windows">
            ${M.windows.map(Pe=>z(Pe))}
          </div>`:l`<div class="usage-meter__account-status">
            ${I(F,M.status)}
          </div>`}
      ${he===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${he.kind}"
          >
            ${he.text}
          </div>`}
    </div>`}function D(F,M){let de=M.accounts.filter($e=>$e.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${F.label} · 활성 ${de} / 전체
        ${M.accounts.length}
      </h2>
      ${M.accounts.map($e=>S(F,$e))}
    </section>`}function k(F){return l`<div
      class="usage-meter__card"
      id=${_u}
      role="dialog"
      aria-label="계정 사용량"
    >
      ${F.filter(M=>M.snapshot.accounts.length>0).map(M=>D(M.provider,M.snapshot))}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function U(){let F=[];for(let he of yu){let De=o.get(he.key);De&&F.push({provider:he,snapshot:De})}if(F.length===0){p(),u();return}let M=F.some(he=>he.snapshot.accounts.length>0);M||p();let de=Date.now(),$e=X(F,de);Qe(l`${M?l`<button
            type="button"
            class="usage-meter__toggle"
            aria-expanded=${r?"true":"false"}
            aria-controls=${_u}
            @click=${R}
          >
            ${$e}
          </button>`:$e}
      ${r?l`<div
              class="usage-meter__scrim"
              aria-hidden="true"
              @mousedown=${A}
            ></div>
            ${k(F)}`:""}`,e),e.hidden=!1}async function ne(F){try{let M=await fetch(F.endpoint);return M.ok?Om(await M.json()):null}catch{return null}}async function ce(){i+=1;let F=i,M=await Promise.all(yu.map(async de=>({provider:de,snapshot:await ne(de)})));if(!(t||F!==i)){for(let de of M)de.snapshot?o.set(de.provider.key,de.snapshot):o.delete(de.provider.key);U()}}return u(),ce(),s=setInterval(()=>{ce()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),p(),u()}}}function $u(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Mm="worker-ineligible";function Sa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ea(e){return Sa(e).includes(Mm)}var Pm="worker-serial";function Ta(e){return Sa(e).includes(Pm)}function Ca(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Dm=new Set(["done","failed","orphaned","stopped","discarded"]),Nm={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},qm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Fm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ra(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Fm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function xu(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let u=new Map,d=new Map,p=!1,f=null,h=null,R=null,A=new Set,L=!1,q=0,Y=null,X=new Set;function z(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function I(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function S(){return o&&o()||""}async function D(){if(!s)return;let w=++q;L=!0,R=null,A.clear(),we();try{let C=await s("worker-parallel-analysis-targets",{root_dir:S()});if(w!==q||!Te)return;let N=Array.isArray(C?.qualified)?C.qualified:[],J=Array.isArray(C?.excluded)?C.excluded:[];R={qualified:N,excluded:J};for(let ke of N)ke&&typeof ke.id=="string"&&A.add(ke.id)}catch{w===q&&Te&&(R={qualified:[],excluded:[]},ie("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{w===q&&(L=!1,Te&&we())}}function k(w){return Array.isArray(w.runs)?w.runs:[]}function U(){let w=z(),C=new Set;for(let N of Object.values(w.attempts||{})){let J=N;J&&typeof J.bead_id=="string"&&!Dm.has(J.status)&&C.add(J.bead_id)}for(let N of Array.isArray(w.pr_wait)?w.pr_wait:[])N&&typeof N.bead_id=="string"&&C.add(N.bead_id);for(let N of Object.values(w.discard_operations||{})){let J=N;J&&J.phase!=="done"&&typeof J.bead_id=="string"&&C.add(J.bead_id)}return C}function ne(w){return w.filter(C=>ce(C)===null)}function ce(w){let C=z();for(let N of Array.isArray(C.serial_lanes)?C.serial_lanes:[])if(Array.isArray(N?.entries)&&N.entries.some(J=>J.bead_id===w))return N.id;return(Array.isArray(C.queue)?C.queue:[]).some(N=>N.bead_id===w)?"parallel":null}function F(w,C){let N=u.get(w);return N||[...C.order]}function M(w){if(w.length<2)return!1;let C=ce(w[0]);if(!C||C==="parallel")return!1;let N=z(),J=(Array.isArray(N.serial_lanes)?N.serial_lanes:[]).find(Q=>Q.id===C)?.entries.map(Q=>Q.bead_id);if(!Array.isArray(J))return!1;let ke=w.map(Q=>J.indexOf(Q));return ke.every(Q=>Q>=0)&&ke.every((Q,Se)=>Se===0||Q>ke[Se-1])}function de(){let w=z(),C=Array.isArray(w.serial_lanes)?w.serial_lanes:[],N=C.find(J=>Array.isArray(J.entries)&&J.entries.length===0);return N?N.id:C[0]?.id||"s1"}function $e(w){let C=z().bead_titles||{};return typeof C[w]=="string"?C[w]:w}async function he(w,C){if(!s||p)return null;p=!0,we();try{return await s(w,C)}finally{p=!1,we()}}async function De(w){n?.setPending?.(!0);try{let C=await he("worker-parallel-analysis-start",{force:w,target_ids:Array.from(A)});C&&C.applied===!1&&C.reason&&(C.reason==="target_not_qualified"&&Array.isArray(C.detail)?ie(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${C.detail.join(", ")}`,"error",3200):ie(`\uBD84\uC11D \uC2E4\uD328: ${C.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function Je(){let w=I().job;!s||!w||await s("worker-parallel-analysis-cancel",{job_id:w.job_id})}async function He(w){if(!(!s||X.has(w))){X.add(w),we();try{let C=await s("worker-parallel-analysis-prompt",{root_dir:S(),run_id:w});if(!Te)return;if(C?.ok===!0&&typeof C.prompt=="string"){Y={run_id:w,prompt:C.prompt};return}ie(C?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{X.delete(w),we()}}}function fe(){Y=null,we()}async function Pe(){if(!Y)return;let w=await Xt(Y.prompt);ie(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)}function ge(w,C){a&&a(w,Ra(C))}function xe(){return z().runner_catalog}function Re(w){return Object.keys(xe()?.runners?.[w]?.models||{})}function je(w){let C=Re(w),N=xe()?.runners?.[w]?.default_model;return typeof N=="string"&&C.includes(N)?N:C[0]||""}function Ae(){let w=I().settings,C=f||w.runner||"claude",N=Re(C),J=f?je(C):w.model||N[0]||"",ke=Ca(xe(),C,J),Q=w.effort||"",Se=ke.includes(Q)?Q:ke[0]||"";return{runner:C,model:J,effort:Se,models:N,efforts:ke}}async function Be(w){let C=I().settings,N=await he("worker-parallel-analysis-settings-update",{expected_revision:C.revision,runner:w.runner,model:w.model,effort:w.effort});(!N||N.applied!==!0)&&(f=null,we(),N&&N.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${N.reason}`,"error",2800))}function Ye(w){f=w,we();let C=Ae();Be({runner:w,model:C.model,effort:C.effort})}function Ee(w){let C=Ae(),N=Ca(xe(),C.runner,w);Be({runner:C.runner,model:w,effort:N.includes(C.effort)?C.effort:N[0]||""})}function ot(w){let C=Ae();Be({runner:C.runner,model:C.model,effort:w})}async function K(w,C){if(!s||p)return;let N=F(w,C),J=I();if(N.length<2||!J.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let ke=d.get(w)||de(),Q=()=>({snapshot_digest:J.last_good.identity_digest,group_index:w,lane:ke,ordered_bead_ids:N,expected_revision:z().revision});p=!0,we();try{let Se=await s("worker-parallel-analysis-submit",Q());Se&&Se.queue&&r&&r.set(Se.queue),Se&&Se.applied!==!0&&Se.conflict===!0&&(Se=await s("worker-parallel-analysis-submit",Q()),Se&&Se.queue&&r&&r.set(Se.queue)),Se&&Se.applied===!0?(u.delete(w),ie(`\uC9C1\uB82C \uB808\uC778 ${ke}\uC5D0 ${N.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${Se?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,we()}}function B(w,C,N){u.set(w,F(w,C).filter(J=>J!==N)),we()}function se(w){u.delete(w),we()}function Le(w,C,N,J){let ke=[...F(w,C)],Q=ke.indexOf(N),Se=Q+J;Q<0||Se<0||Se>=ke.length||(ke.splice(Se,0,...ke.splice(Q,1)),u.set(w,ke),we())}function Ue(){let w=I().settings,C=Object.keys(xe()?.runners||{}),N=Ae();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${J=>Ye(J.target.value)}
        >
          ${C.map(J=>l`<option
                value=${J}
                ?selected=${N.runner===J}
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
          @change=${J=>Ee(J.target.value)}
        >
          ${N.models.map(J=>l`<option
                value=${J}
                ?selected=${N.model===J}
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
          @change=${J=>ot(J.target.value)}
        >
          ${N.efforts.map(J=>l`<option
                value=${J}
                ?selected=${N.effort===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      ${Ve(w)}
    </div>`}function Ve(w){return!lt(w)||Ie(w)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:w.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${w.runner}/${w.model} · effort
        ${w.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:w.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function Ie(w){return w.is_default===!0&&w.compatible===!1}function lt(w){return!!(w.runner&&w.model&&w.effort)}function Ze(w){return lt(w)&&w.compatible!==!1}function G(w){let C=Math.max(0,Math.floor(w/1e3)),N=Math.floor(C/60),J=C%60;return`${N}:${String(J).padStart(2,"0")}`}function ee(w){let C=w.job;if(C){let N=typeof C.started_at=="number"?C.started_at:0,J=`${C.runner||"?"}/${C.model||"?"}`,ke=N?` \xB7 \uACBD\uACFC ${G(Date.now()-N)}`:"",Q=typeof C.session_id=="string"?C.session_id:"",Se=k(w).find(Ce=>Ce.run_id===C.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${J} · effort ${C.effort||"?"}${ke}</span
        >
        ${Q?l`<code class="pa-session-id" title=${Q}
              >${Q.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ge(C.job_id,Se||C)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Se?.prompt_saved!==!0||X.has(C.job_id)}
          @click=${()=>{He(C.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Oe()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Oe(){return n?.isPending?.()===!0}function We(w){let C=!!w.job,N=Ze(w.settings),J=R!==null&&A.size===0,ke=C||p||Oe()||L;return l`<div class="pa-meta">
      ${w.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(w.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${ee(w)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!N||ke||J}
        @click=${()=>{De(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!N||ke||J}
        @click=${()=>{De(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!C}
        @click=${()=>{Je()}}
      >
        취소
      </button>
    </div>`}function pe(w){return typeof w=="string"&&w.length>0?w:"\uBBF8\uBC30\uCE58"}function g(w,C){C?A.add(w):A.delete(w),we()}function x(w){let C=Array.isArray(w.scope)?w.scope:[],N=Array.isArray(w.overlaps)?w.overlaps:[];return C.length===0&&N.length===0?l``:l`<span class="pa-target__signals">
      ${C.length>0?l`<details class="pa-target__scope" title=${C.join(`
`)}>
            <summary>scope ${C.length}</summary>
            <ul>
              ${C.map(J=>l`<li><code>${J}</code></li>`)}
            </ul>
          </details>`:""}
      ${N.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${N.join(", ")}`}
            >겹침 ${N.join(", ")}</span
          >`:""}
    </span>`}function $(){let w=R?.qualified||[],C=R?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${L?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${w.length} \xB7 \uC81C\uC678 ${C.length}`}</span
        >
      </header>
      ${R&&w.length>0?l`<ul class="pa-targets__list">
            ${w.map(N=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${N.id}
                      .checked=${A.has(N.id)}
                      @change=${J=>g(N.id,J.target.checked)}
                    />
                    <span class="pa-target__title">${N.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${x(N)}
                    <span class="pa-target__route">${N.route}</span>
                    <span class="pa-target__lane"
                      >${pe(N.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:R&&w.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${R&&C.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${C.length}</summary>
            <ul class="pa-targets__list">
              ${C.map(N=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${N.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Nm[N.reason]||N.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${pe(N.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function P(w){let C=typeof w.session_id=="string"&&w.session_id.length>0,N=C?w.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${w.outcome}"
        >${qm[w.outcome]||w.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(w.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${w.runner||"?"} / ${w.model||"?"} / ${w.effort||"?"}</span
      >
      ${C?l`<code class="pa-session-id" title=${N}
            >${N.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${w.outcome==="failure"&&w.reason?l`<span class="pa-run-row__reason">${w.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ge(w.run_id,w)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${w.prompt_saved!==!0||X.has(w.run_id)}
          @click=${()=>{He(w.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function V(w){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${w.length>0?l`<ul class="pa-runs__list">
            ${w.map(C=>P(C))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Z(){return Y?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${fe}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Y.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Pe()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${fe}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function oe(w,C){let N=F(w,C),J=U(),ke=N.filter(nt=>J.has(nt)),Q=ne(N),Se=M(N),Ce=Array.isArray(z().serial_lanes)?z().serial_lanes:[],ft=d.get(w)||de(),Et=C.eligible!==!0||N.length<2||ke.length>0||Q.length>0||Se||p;return l`<section class="pa-group" data-group-index=${String(w)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${C.confidence}</span>
        ${C.categories.map(nt=>l`<span class="pa-group__category">${nt}</span>`)}
        ${Se?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${C.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Q.length>0?l`<span class="pa-group__stale"
              >stale — ${Q.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${C.reason}</p>
      <ol class="pa-group__members">
        ${N.map((nt,yt)=>l`<li class="pa-member" data-bead-id=${nt}>
              <span class="pa-member__seq">${yt+1}</span>
              <span class="pa-member__title">${$e(nt)}</span>
              ${J.has(nt)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${nt}
                ?disabled=${yt===0}
                aria-label=${`${nt} \uC704\uB85C`}
                @click=${()=>Le(w,C,nt,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${nt}
                ?disabled=${yt===N.length-1}
                aria-label=${`${nt} \uC544\uB798\uB85C`}
                @click=${()=>Le(w,C,nt,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${nt}
                aria-label=${`${nt} \uC81C\uC678`}
                @click=${()=>B(w,C,nt)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${C.evidence.map(nt=>l`<li class="pa-evidence">
              <code>${nt.path}</code>
              <span class="pa-evidence__locator">${nt.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>se(w)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${nt=>{d.set(w,nt.target.value),we()}}
          >
            ${Ce.map((nt,yt)=>l`<option
                  value=${nt.id}
                  ?selected=${ft===nt.id}
                >
                  직렬 ${yt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Et}
          @click=${()=>{K(w,C)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ue(w){let C=Array.isArray(w.issues)?w.issues:[],N=C.filter(ke=>ke.verdict==="parallel_ok").length,J=C.filter(ke=>ke.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${N}</span>
      <span>uncertain ${J}</span>
    </div>`}function qe(){let w=Te&&!!I().job;if(w&&h===null){h=setInterval(()=>we(),1e3);return}!w&&h!==null&&(clearInterval(h),h=null)}function we(){let w=I();f&&w.settings.runner===f&&(f=null);let C=w.last_good?.result;qe(),Qe(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${me}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Ue()} ${We(w)} ${$()}
            ${C?l`${C.groups.map((N,J)=>oe(J,N))}
                ${C.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ue(C)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${V(k(w))}
          </div>
        </div>
        ${Z()}
      `,i)}let Te=!1,be=()=>{Te=!1,Y=null,q+=1,qe()},ze=w=>{w.target===w.currentTarget&&me()};i.addEventListener("close",be),i.addEventListener("cancel",be),i.addEventListener("click",ze);let rt=null;r&&r.subscribe&&(rt=r.subscribe(()=>{Te&&we()}));let W=null;n&&n.subscribe&&(W=n.subscribe(()=>{Te&&we()}));function te(){Te||(Te=!0,we(),D(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function me(){Te&&(Te=!1,Y=null,q+=1,qe(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:te,close:me,destroy(){Te=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",be),i.removeEventListener("cancel",be),i.removeEventListener("click",ze),rt&&(rt(),rt=null),W&&(W(),W=null),i.remove()}}}var Au=new Set(["sh","bash","zsh","dash","ksh"]),Su=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Eu(e){let t=e.split("/");return t[t.length-1]||""}function jm(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Eu(r[0]);if(n!=="env")return Au.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Au.has(Eu(s))}function Bm(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Um(e){let t=[],r=0;Su.lastIndex=0;for(let n of e.matchAll(Su)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Bm(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Wm(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Tu(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",u=0,d=null,p=!1;function f(S,D){return D?Um(S).map(k=>k.kind==="plain"?k.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${k.kind}"
            >${k.text}</span
          >`):S}function h(){if(!s)return l``;let S=o==="ready"&&jm(a),D=o==="ready"?a.split(`
`):[];return l`<div
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
              @click=${()=>{A()}}
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
          ${o==="loading"?l`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?l`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:l`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${D.map((k,U)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${U+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(k,S)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function R(){Qe(h(),n)}async function A(){if(o!=="ready")return;let S=await Xt(a);ie(S?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",S?"success":"error")}function L(S){S.key==="Escape"&&s&&(S.preventDefault(),z())}function q(){p||(document.addEventListener("keydown",L),p=!0)}function Y(){p&&(document.removeEventListener("keydown",L),p=!1)}async function X(S,D=null){let k=++u;q(),s={...S},d=D||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",R(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let ne=t?t():"";if(!ne){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",R();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",R();return}let ce="/api/repo-ops-script?workspace="+encodeURIComponent(ne)+"&lane="+encodeURIComponent(S.lane)+"&base_sha="+encodeURIComponent(S.base_sha);try{let F=await r(ce),M=await F.json().catch(()=>({}));if(k!==u)return;if((t?t():"")!==ne){z();return}if(!F.ok||!M||M.ok!==!0){o="error",i=Wm(M&&typeof M.error=="string"?M.error:""),R();return}s={lane:M.lane,base_sha:M.base_sha,path:M.path,base_ref:M.base_ref},a=String(M.content),o="ready",R()}catch{if(k!==u)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",R()}}function z(){u+=1,Y(),s=null,a="",R();let S=d;d=null,S?.isConnected&&S.focus()}function I(){z(),n.remove()}return{open:X,close:z,destroy:I}}function Cu(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let I=o();return typeof I.revision=="number"?I.revision:0}function i(I){t&&I&&I.queue&&typeof I.queue=="object"&&t.set(I.queue)}function u(){let I=o().workspace_info;return I&&typeof I=="object"?I:{}}function d(I,S){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${I}"
      >${S}</span
    >`}function p(I){if(typeof I!="number"||!Number.isFinite(I))return"";let S=I/6e4;return Number.isInteger(S)?`timeout ${S}\uBD84`:`timeout ${Math.round(I/1e3)}\uCD08`}function f(I){let S=p(I);return S?d("config",S):""}function h(I,S,D){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${D.script}
      @click=${k=>{s&&s({lane:I,base_sha:S.base_sha,path:D.script,base_ref:S.base_ref},k.currentTarget)}}
    ></button>`}function R(I){let S=typeof I.base_sha=="string"?I.base_sha:"",D=`${I.source_path||"repo-ops/config.toml"} @ ${I.base_ref||"?"}${S?`@${S.slice(0,7)}`:""}`;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${D}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${I.verify?l`${h("verify",I,I.verify)}
              ${f(I.verify.timeout_ms)}`:l`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${I.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${I.deploy?l`${h("deploy",I,I.deploy)}
              ${f(I.deploy.timeout_ms)}`:l`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${I.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function A(I){let S=I.repo_ops&&typeof I.repo_ops=="object"?I.repo_ops:null;return S&&(S.status==="resolved"||S.status==="absent")?R(S):S&&(S.status==="pending"||S.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${S.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${S.error_code?l` — <code>${S.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function L(I){if(!r)return;let S=await r("worker-auto-repair-toggle",{on:I,expected_revision:a()});if(i(S),S&&S.conflict){let D=await r("worker-auto-repair-toggle",{on:I,expected_revision:a()});i(D)}n()}let q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function Y(I,S,D){return l`<div class="worker-repo-ops__policy-group" data-policy=${D}>
      <div class="worker-repo-ops__policy-label">${I}</div>
      <ul class="worker-repo-ops__policy-list">
        ${S.map(k=>l`<li data-token=${k}>
              ${q[k]||k}
            </li>`)}
      </ul>
    </div>`}function X(I){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${I.map(S=>{let D=[q[S.trigger]||S.trigger];return Number.isInteger(S.attempts_per_operation_attempt)?D.push(`operation\uB2F9 ${S.attempts_per_operation_attempt}\uD68C`):Number.isInteger(S.attempts)?D.push(`${q[S.budget]||S.budget} ${S.attempts}\uD68C`):Number.isInteger(S.sessions_per_user_action)&&D.push(`${S.sessions_per_user_action}\uD68C`,q[S.user_actions]||S.user_actions),S.applies_when&&D.push(q[S.applies_when]||S.applies_when),l`<li data-token=${S.id}>
            <strong>${q[S.id]||S.id}</strong>
            <span>${D.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function z(){let I=o(),S=I.auto_repair!==!1,D=I.repo_operation_policy&&typeof I.repo_operation_policy=="object"?I.repo_operation_policy:null,k=Array.isArray(I.repo_operations)?I.repo_operations:[],U=k.find(M=>M.state==="repairing"),ne=k.filter(M=>M.state==="failed"||M.state==="repairing"),ce=ne.length?Math.min(...ne.map(M=>typeof M.repair?.remaining=="number"?M.repair.remaining:0)):D?.auto_repair?.resolution_ladder?.find(M=>M.id==="auto_repair_session")?.attempts??1,F=Array.isArray(D?.auto_repair?.resolution_ladder)?D.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${S}
          @change=${M=>{L(M.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ce}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${U?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${U.repair?.owner_bead||U.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${D?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(D.worker_automatic||[]).length} · 해결 사다리
                ${F.length} · 금지
                ${(D.never_automatic||[]).length}</span
              >
            </summary>
            ${Y("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",D.worker_automatic||[],"worker-automatic")}
            ${D.supported===!1||D.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${D.schema_version})`}
                </div>`:X(F)}
            ${Y("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",D.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${A(u())} ${z()}
      </details>`}}}var zm=20,Ru={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Iu={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Hm(e,t,r=zm){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Lu(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Gm(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Ou(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Mu(e,t="",r=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function Vm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Iu,n)?Iu[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
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
  </div>`}function Km(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?kt(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Lu(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Ru,t.kind)?Ru[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ys(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Zs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Lu(e)}"
          >${Gm(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Mu(Dc(t.failure_kind,n)):""}
      ${Vm(t)}
      ${Ou([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ys(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ym(e){let t=e.cleanup,r=Hr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?kt(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
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
        ${Ic(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Mu(ro(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
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
      ${Ou([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Zm(e){return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?Ym(t):Km(t))}
        </ul>`}
  </section>`}function Pu(e,t={}){let r=null;function n(){Qe(r?Zm(r):l``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Hm(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Xm="tab:worker:ready",Qm="tab:worker:blocked",Jm="tab:worker:in-progress",eg="tab:worker:closed",oo=1,Du=5;function Nu(e){return Fs(e).path.length>0}var Bu="beads-ui.worker.candidate-filter",Ia={show_blocked:!1,spec:"all"};function tg(){try{let e=window.localStorage.getItem(Bu);if(!e)return{...Ia};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ia};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Ia}}}function rg(e){try{window.localStorage.setItem(Bu,JSON.stringify(e))}catch{}}function ng(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let u=r(i),d=n(i);u&&d?s.push(i):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var sg=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Uu="bdui.worker.candidate_sort",og=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ao="spec";function ag(){try{let e=window.localStorage.getItem(Uu);return e==="board"||e==="created"||e==="spec"?e:ao}catch{return ao}}function ig(e){try{window.localStorage.setItem(Uu,e)}catch{}}var Wu="bdui.worker.done-range";function lg(){try{let e=window.localStorage.getItem(Wu);return Ut(e)?e:Dt}catch{return Dt}}function cg(e){try{window.localStorage.setItem(Wu,e)}catch{}}var ug="(max-width: 640px)",zu="beads-ui.worker.lane-collapsed",Gn={queue:!0,done:!0};function dg(){try{let e=window.localStorage.getItem(zu);if(!e)return{...Gn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Gn}:{queue:typeof t.queue=="boolean"?t.queue:Gn.queue,done:typeof t.done=="boolean"?t.done:Gn.done}}catch{return{...Gn}}}function pg(e){try{window.localStorage.setItem(zu,JSON.stringify(e))}catch{}}function qu(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function fg(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Fr):(n.sort(ds(r)),t==="board"?n:[...n.filter(Nu),...n.filter(s=>!Nu(s))])}function _g(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function mg(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function gg(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Fu(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function bg(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function hg(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function yg(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function vg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function La(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function wg(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function ju(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function kg(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):ju(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${ju(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Fu(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Fu(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function $g(e,t,r,n,s=null,o=null,a=null,i=!1,u=null,d=!0,p=null,f=null,h=null,R={},A=!1,L=!1,q={}){let Y=!!u&&u.position>0,X=!!u?.continuation_action&&u.continuation_action.continuation===null,z=!!u&&u.active===!0,I=u&&u.failure||null,S=hg(u?u.waiting:null,h),D=r[e]||null,k=D&&D.gate?D.gate:null,U=D&&D.pr?D.pr:null,ne=wg(h),ce=yg(u?u.resolution:null),F=vg(u?u.head_review:null),M=u&&u.head_review||null,de=u&&u.authority||null,$e=!!M&&["pending","reviewing","revising"].includes(M.state),he=Y&&!z&&(M?.state==="failed"||!de||de.source==="automatic"&&!L),De=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ce?ce.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":S,Je=!!k&&k.base_badge==="\uCDA9\uB3CC",He=!!k&&k.enabled===!0,fe=Un({bead_id:e,merge_sha:q.merge_sha,cleanup_cursor:q.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:q.repo_operations}),Pe=to(fe),ge=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!k&&k.tier==="merged",xe=i&&!!n&&!!k&&k.tier==="merged",Re=he&&(He||Je||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||ge||xe),je=i&&Je&&d===!1,Ae=cr(R,e,{external:i,merge_active:z||fe?.step==="merge",merge_queued:Y,conflict_active:!!a,cleanup_active:Pe,merged:!!n||k?.tier==="merged"}),Be=!!Ae.operation,Ye=!ge&&!!n&&n.step==="repo_operations",Ee=kg({continuation_required:X,merge_step:fe,conflict_badge:De,conflict_live:ce?.live===!0||a==="running",head_review:M&&F?{...F,state:M.state,failure_reason:M.failure_reason}:null,recovery:ne,cleanup_failed:n,cleanup_label:n?Hr(n.step):null,base_exception:f,conflicting:Je,gate:k,receipt_check:D&&D.receipt_check?D.receipt_check:null,queue_failure:I,auto_skip:p,queued:Y,queue_active:z,queue_position:u?u.position:0,activity:De?null:o&&o.activity||null}),ot=Ee?.live===!0&&Ee.title?l`<span title=${Ee.title}>${Ee.label}</span>`:Ee?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:n&&fe?.active!==!0?eo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:i,pr_number:U&&typeof U.number=="number"?U.number:null,pr_url:U&&typeof U.url=="string"?U.url:"",completion_badge:Ee?.live!==!0&&Ee?.title?Ee.label:null,completion_title:Ee?.title||"",completion_repair_pr_url:ne?ne.repair_pr_url:"",completion_repair_pr_number:ne?ne.repair_pr_number:null,badges:ot?[ot]:[],live_badge:Ee?.live===!0?ot:null,usage:s,alert:Ee?.alert===!0,merge_action:k?.tier==="merged"&&!ge&&!xe||Ye?!1:!Y||X||he,timeline_action:Ye,cancel_action:Y&&!X,cancel_enabled:(!z||$e)&&!(ne&&ne.lock_actions),cancel_title:ne&&ne.lock_actions?`${ne.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:z&&!$e?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":$e?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Ae,discard_action:Ae.action,merge_step:fe,discard_enabled:Ae.enabled,discard_title:Ae.title,merge_enabled:!fe&&!a&&!Be&&!f&&!(ne&&ne.lock_actions)&&!je&&!Ye&&(He||Je||k?.reason==="base_behind"||k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"||ge||xe||Re),merge_label:X?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ge||xe?"\uC815\uB9AC \uC7AC\uAC1C":Je&&!fe&&!ge?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":k?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":he?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Be?Ae.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ae.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ae.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:X?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":fe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${fe.label}`:xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":je?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Je?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="review_receipt_missing"||k?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":k?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":He?`\uBA38\uC9C0 (${k.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:k&&k.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${k&&k.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Oa(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:u,getWorkspacePath:d,doneRange:p,onDoneRangeChange:f}=t,h=n?fs(n,i):null,R=ms({transport:r,uiOrderStore:i}),A=null,L=[],q=tg(),Y=null,X=ag(),z=Ut(p)?p:lg(),I=new Map;function S(){let c=or.find(_=>_.value===z);return c?c.label:"\uC624\uB298"}let D=dg(),k=!1,U=new Set,ne=new Set,ce=new Set,F=new Set,M=[],de=document.createElement("div");de.className="worker-console";let $e=document.createElement("div");$e.className="worker-top";let he=document.createElement("div");he.className="worker-drawer-overlay",he.hidden=!0;let De=document.createElement("div");De.className="worker-drawer-overlay__backdrop";let Je=document.createElement("div");Je.className="worker-drawer-host";let He=document.createElement("div");He.className="worker-drawer-host",He.hidden=!0,he.append(De,Je,He);let fe=document.createElement("div");fe.className="worker-lanes-host",de.append($e,he,fe),e.appendChild(de);let Pe=null,ge=null,xe=qs(Je,{transport:r,sessionLogStore:a,onClose:()=>{Pe=null,ge=null,he.hidden=!0,Q()}}),Re=Pu(He,{onClose:()=>{He.hidden=!0,he.hidden=!0,Q()}}),je=Tu({getWorkspacePath:d||(()=>"")}),Ae=d&&d()||"",Be=Cu({queueStore:s,transport:r,onChanged:()=>Q(),onOpenScript:(c,_)=>{je.open(c,_)}}),Ye=o?xu(de,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(c,_)=>kr(c,_)}):null;function Ee(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:oo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ot(){let c=Ee(),_=typeof c.serial_lane_count=="number"&&Number.isInteger(c.serial_lane_count)&&c.serial_lane_count>0?Math.min(c.serial_lane_count,5):0,E=Array.isArray(c.serial_lanes)?c.serial_lanes:[],H=[];for(let ve of E){if(H.length>=_)break;!ve||typeof ve.id!="string"||!/^s[1-5]$/.test(ve.id)||!Array.isArray(ve.entries)||H.push({id:ve.id,label:`\uC9C1\uB82C ${ve.id.slice(1)}`,count:ve.entries.length})}return H.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(c.queue)?c.queue:[]).length},...H]}function K(c){if(!Y||!c.some(E=>E.id===Y))return null;let _=ot();return _?{bead_id:Y,lanes:_}:null}function B(){let c=Ee();return typeof c.revision=="number"?c.revision:0}function se(c){c&&c.queue&&s&&s.set(c.queue)}function Le(){let c=Ee().queue;return Array.isArray(c)?c.length:0}async function Ue(c,_,E){if(!r)return;let H=()=>({bead_id:c,..._==="parallel"?{}:{lane:_},...E===void 0?{}:{index:E},expected_revision:B()}),ae=await r("worker-queue-place",H());se(ae),ae&&ae.conflict&&await r("worker-queue-place",H()).then(se)}async function Ve(c,_,E){if(!r)return;let H=()=>({bead_id:c,..._==="parallel"?{}:{lane:_},to_index:E,expected_revision:B()}),ae=await r("worker-queue-reorder",H());se(ae),ae&&ae.conflict&&await r("worker-queue-reorder",H()).then(se)}async function Ie(c){if(!r)return;let _=await r("worker-queue-remove",{bead_id:c,expected_revision:B()});se(_),_&&_.conflict&&await r("worker-queue-remove",{bead_id:c,expected_revision:B()}).then(se)}async function lt(c){if(!r||!c)return;let _=await r("worker-attempt-pause",{attempt_id:c});_&&_.paused===!1&&_.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Ze(c){if(!r||!c)return;let _=await sn();if(_===null)return;let E=async(ae={})=>await r("worker-attempt-resume",{attempt_id:c,expected_revision:B(),..._!==""?{instructions:_}:{},...ae}),H=await E();se(H),H&&H.conflict&&(H=await E(),se(H)),H=await fr(H,(ae,ve)=>E({continuation:ae,decision_token:ve}),{onResult:se,refresh:()=>E()}),H&&H.resumed===!1&&!H.conflict&&H.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${H.reason}`,"error",2400)}async function G(c){if(!r||!c)return;let _=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:B()});se(_),_&&_.conflict&&(_=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:B()}),se(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function ee(c,_,E=!0){if(!r)return null;let H=r,ae=await H(c,{..._,expected_revision:B()});return se(ae),ae&&ae.conflict&&E&&(ae=await H(c,{..._,expected_revision:B()}),se(ae)),ae}async function Oe(c){if(!r||!c)return;let _=Ee().merge_queue?.find(H=>H.bead_id===c)?.continuation_action;if(_?.mismatch&&_.continuation===null){await pe(c,_.mismatch);return}U.add(c),Q();let E;try{E=await ee("worker-merge-queue-add",{bead_id:c})}finally{U.delete(c),Q()}!E||E.conflict||E.applied||ie(bg(E.reason),"error",2400)}async function We(c){if(!(!r||!c||ne.has(c))){ne.add(c),Q();try{let _=await r("worker-cleanup-retry",{bead_id:c,expected_revision:B()});se(_),_&&!_.retried&&!_.conflict&&_.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${_.reason}`,"error",2400)}finally{ne.delete(c),Q()}}}async function pe(c,_){let E=await fr({continuation_mismatch:_},(ae,ve)=>ee("worker-merge-queue-add",{bead_id:c,continuation:ae,decision_token:ve},!1)),H=E?.queue?.merge_queue?.find(ae=>ae.bead_id===c)?.continuation_action;if(E?.applied!==!0&&H?.continuation===null&&H.mismatch){await pe(c,H.mismatch);return}E&&E.applied===!1&&!E.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function g(c){if(!r)return;let _=await ee("worker-merge-auto-toggle",{on:c});!_||_.conflict||ie(c?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",c?"success":"info",2400)}async function x(c){if(!r||!c)return;let _=await ee("worker-merge-queue-remove",{bead_id:c});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function $(){await ee("worker-merge-queue-remove",{all:!0})}async function P(c,_=null,E="unmerged",H=null){if(!r||!c)return;let ae=Fn(c,E);if(!(!!H||typeof globalThis.confirm!="function"||globalThis.confirm(ae)))return;let _e=await r("worker-discard",{bead_id:c,..._?{attempt_id:_}:{},...H?{operation_id:H}:{},expected_revision:B()});if(se(_e),_e&&_e.conflict&&(_e=await r("worker-discard",{bead_id:c,..._?{attempt_id:_}:{},...H?{operation_id:H}:{},expected_revision:B()}),se(_e)),_e&&_e.discarded===!0){ie(Qs(_e),"success",5e3);return}if(_e&&_e.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${_e.reason}`,"error",2800);return}if(_e&&_e.accepted&&_e.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(_e&&_e.accepted&&!_e.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${_e.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}_e&&!_e.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function V(c,_,E){if(!(!r||!_||!E||F.has(_))){F.add(_),Q();try{let H=await r(c,{bead_id:_,action_id:E,expected_revision:B()});se(H),H?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!H?.ok&&H?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(H.reason)}`,"error",2800)}finally{F.delete(_),Q()}}}async function Z(c,_){if(!r||!_||ce.has(_))return;ce.add(_),Q();let E;try{let H=async(ae={})=>await r(c,{bead_id:_,expected_revision:B(),...ae});E=await H(),se(E),E&&E.conflict&&(E=await r(c,{bead_id:_,expected_revision:B()}),se(E)),c==="worker-revise-fix"&&(E=await fr(E,(ae,ve)=>H({continuation:ae,decision_token:ve}),{onResult:se,refresh:()=>H()}))}finally{ce.delete(_),Q()}if(!(!E||E.conflict)){if(E.ok){ie(c==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function oe(c){if(!r)return;let _=await r("worker-automation-toggle",{on:c,expected_revision:B()});se(_),_&&_.conflict&&await r("worker-automation-toggle",{on:c,expected_revision:B()}).then(se)}async function ue(c){if(!r||!c)return;let _=await r("worker-repo-operation-repair",{operation_id:c});if(se(_),_&&_.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${_.reason||""}`,"error",3e3);return}_&&_.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function qe(c){if(!r||!c)return;let _=await r("worker-repo-operation-dismiss",{operation_id:c});se(_),_&&_.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${_.reason||""}`,"error",3e3)}async function we(c){if(!r||!Number.isFinite(c))return;let _=Math.max(oo,Math.floor(c)),E=await r("worker-queue-set-slots",{slots:_,expected_revision:B()});se(E),E&&E.conflict&&await r("worker-queue-set-slots",{slots:_,expected_revision:B()}).then(se)}async function Te(c){if(!r||!Number.isInteger(c)||c<1||c>Du)return;let _=Ee(),E=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).slice(c).reduce((ve,_e)=>ve+(Array.isArray(_e?.entries)?_e.entries.length:0),0),H=()=>({count:c,expected_revision:B()}),ae=await r("worker-queue-set-serial-lane-count",H());se(ae),ae&&ae.conflict&&(ae=await r("worker-queue-set-serial-lane-count",H()),se(ae)),ae&&ae.applied&&E>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${E}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function be(){let c=Ee(),_=h?h.selectBoardColumn(Xm,"ready"):[],E=h?h.selectBoardColumn(Qm,"blocked"):[],H=h?h.selectBoardColumn(eg,"closed"):[],ae=h?h.selectBoardColumn(Jm,"in_progress"):[],ve=new Map;for(let b of ae){let j=mg(b);if(!j)continue;let le=ve.get(j);le?le.push(b):ve.set(j,[b])}let _e=b=>{let j=_s(ve.get(b)||[]);return j?j.title||j.id:null},et=c.bead_titles||{},y=new Map;for(let[b,j]of Object.entries(et))typeof j=="string"&&j.length>0&&y.set(b,j);for(let b of[..._,...E])y.set(b.id,b.title||b.id);let v=c.bead_times&&typeof c.bead_times=="object"&&!Array.isArray(c.bead_times)?c.bead_times:{},m=c.bead_labels&&typeof c.bead_labels=="object"&&!Array.isArray(c.bead_labels)?c.bead_labels:{},O=new Map;for(let[b,j]of Object.entries(m))Array.isArray(j)&&O.set(b,Ta(j));for(let b of[..._,...E]){let j=b.labels;Array.isArray(j)&&!O.has(b.id)&&O.set(b.id,Ta(j))}let T=new Map,re=o?.get()?.last_good?.result?.groups;for(let b of Array.isArray(re)?re:[]){if(b?.eligible!==!0||!Array.isArray(b.members))continue;let j=b.members.map(Ge=>{let pt=(Array.isArray(c.serial_lanes)?c.serial_lanes:[]).find(Kt=>Kt.entries.some(Ct=>Ct.bead_id===Ge));return pt?pt.id:null});if(!(j.every(Ge=>Ge!==null)&&new Set(j).size===1))for(let Ge of b.members)T.set(Ge,b.members.filter(pt=>pt!==Ge))}let Fe=c.bead_blocked_by&&typeof c.bead_blocked_by=="object"&&!Array.isArray(c.bead_blocked_by)?c.bead_blocked_by:{},Ke=new Map;for(let[b,j]of Object.entries(v))j&&typeof j=="object"&&Ke.set(b,j);for(let b of[..._,...E])Ke.set(b.id,{created_at:b.created_at,updated_at:b.updated_at});let Xe=b=>Ke.get(b)||{},Ne=c.pr_wait||[],mt=c.pr_observations||{},sr=c.pr_activity||{},Vr=c.cleanup_failed||{},Vn=Object.entries(Vr).map(([b,j])=>({bead_id:b,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",at:j&&typeof j.at=="number"?j.at:null,detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0,retry_count:j&&typeof j.retry_count=="number"&&Number.isInteger(j.retry_count)&&j.retry_count>0?j.retry_count:0,failure_code:j&&typeof j.failure_code=="string"?j.failure_code:void 0,subject_id:j&&typeof j.subject_id=="string"?j.subject_id:void 0,repair_eligible:!!(j&&j.repair_eligible),repair:j&&j.repair?j.repair:void 0})),pn=c.queue||[],fn=new Set([...pn.map(b=>b.bead_id),...(Array.isArray(c.serial_lanes)?c.serial_lanes:[]).flatMap(b=>(Array.isArray(b?.entries)?b.entries:[]).map(j=>j.bead_id)),...Ne.map(b=>b.bead_id),...c.done.map(b=>b.bead_id)]),Kn=new Set(E.map(b=>b.id)),Me=i?i.get()?.order||{}:{},dt=new Set,Kr=[];for(let b of[..._,...E])fn.has(b.id)||dt.has(b.id)||_g(b)||Object.hasOwn(b,"labels")&&Ea(b.labels)||(dt.add(b.id),Kr.push(b));L=fg(Kr,X,Me);let nd=c.admission||{},Na=b=>{let j=nd[b];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof j.reason=="string"?j.reason:"",Ge=le.indexOf(":");return Ge>0&&Ge<le.length-1?`\u26D4 ${le.slice(0,Ge)} (${le.slice(Ge+1)})`:`\u26D4 ${le}`},sd=L.map(b=>{let j=Fs(b),le=j.path.length>0,Ge=b.workflow?.route==="quick_fix"||b.metadata&&b.metadata.route==="quick_fix",pt=!Object.hasOwn(b,"description")||typeof b.description=="string"&&b.description.trim().length>0,Ct=!(Object.hasOwn(b,"labels")&&Ea(b.labels))&&(Ge?pt:le&&!j.conflict),ut=Kn.has(b.id),Yt=[];ut&&Yt.push(gg(b)),Ge&&!pt?Yt.push("missing_description"):!Ge&&j.conflict?Yt.push("spec_id_conflict"):!Ge&&!le&&Yt.push("spec \uC5C6\uC74C");let rs=Na(b.id);return rs&&Yt.push(rs),{id:b.id,title:b.title||b.id,reason:Yt.join(" \xB7 "),draggable:Ct,lane:"candidate",created_at:b.created_at,updated_at:b.updated_at,workflow:b.workflow,is_quick_fix:Ge,status:b.status,blocked:ut,has_spec:le}}),io=ng(sd,q),od=io.visible,ad=c.revise_parked||{},Yn=c.discard_operations&&typeof c.discard_operations=="object"&&!Array.isArray(c.discard_operations)?c.discard_operations:{},lo=(b,j)=>b.map((le,Ge)=>{let pt=j!=="done",Kt=j!=="done"&&j!=="queue",Ct=pt?ad[le.bead_id]:null,ut=pt?cr(Yn,le.bead_id):null,Yt=ut?.operation?ut:null,rs=pt&&O.get(le.bead_id)===!0,ii=Fe[le.bead_id]||[],_o=c.admission&&typeof c.admission=="object"?c.admission[le.bead_id]:null,mo=pt?xc(_o,!!Yt||F.has(le.bead_id)):null,yd=pt&&!mo?Na(le.bead_id):null,vd=pt?[yd]:[],li=pt&&ii.length>0&&typeof _o?.reason=="string"&&_o.reason.startsWith("not_ready")?[`\u23F8 ${ii.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],go=pt?T.get(le.bead_id):void 0;return go&&go.length>0&&li.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${go.join(", ")}\uC640`),{id:le.bead_id,title:y.get(le.bead_id)||le.bead_id,reason:vd.filter(Boolean).join(" \xB7 "),draggable:pt&&!Yt&&!mo,done:j==="done",lane:j,seq:Kt?Ge+1:void 0,worker_serial:rs,discard:Yt,stale_work:mo,badges:[...li,...Ct?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Ct,revise_action:!!Ct,revise_enabled:!!Ct&&!Yt&&!ce.has(le.bead_id),revise_title:Ct?Ct.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ct.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?Wt(c.attempts||{},le.bead_id):null,work_ms:j==="done"?kc(c.attempts||{},le.bead_id):null,done_at:j==="done"&&typeof le.added_at=="number"?le.added_at:void 0,...Xe(le.bead_id)}}),Yr=c.attempts?Object.values(c.attempts):[],co=new Set;for(let b of Yr)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&co.add(b.resumed_from);let qa=new Map;for(let b of Yr)qa.set(b.bead_id,b.attempt_id);let Zn=new Map;for(let b of Yr)Zn.set(b.attempt_id,b);function uo(b){let j=new Set,le=b;for(;le&&!j.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;j.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&Zn.get(le.resumed_from)||null}return!1}let Xn=typeof c.declared_base=="string"?c.declared_base:null;function id(b){let j=null;for(let le of Yr)!le||le.bead_id!==b||uo(le)||(j===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof j.started_at=="number"?j.started_at:0))&&(j=le);return j&&typeof j.target_base=="string"?j.target_base:null}let Fa=[],ja=[],ld=$u(c),Ba=b=>{let j=typeof b.session_id=="string"&&b.session_id.length>0,le=co.has(b.attempt_id);return{eligible:j&&!le,reason:j?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Vt=null;for(let b of Yr){let j=b.status==="paused"&&!co.has(b.attempt_id);if(b.status==="running"||j)ja.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:y.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,paused:j,conflict_resolution:uo(b),base_exception:La(Xn,b.target_base),can_pause:typeof b.session_id=="string"&&b.session_id.length>0,discard:cr(Yn,b.bead_id,{attempt_id:b.attempt_id}),usage:Wt(c.attempts||{},b.bead_id),current_child:_e(b.bead_id),...Xe(b.bead_id)});else if((b.status==="failed"||b.status==="orphaned")&&ld(b)){let le=Ba(b);Fa.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:y.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,failed:!0,status:b.status,status_label:b.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:cr(Yn,b.bead_id,{attempt_id:b.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:uo(b),base_exception:La(Xn,b.target_base),usage:Wt(c.attempts||{},b.bead_id),current_child:_e(b.bead_id),...Xe(b.bead_id)}),Vt=b}}let Qn=[...Fa,...ja].map(b=>{let j=Zn.get(b.attempt_id),le=j?.quickfix_landing;if(j?.quickfix_lane!==!0||!le||typeof le!="object")return b;let Ge=typeof le.reason=="string"&&le.reason.length>0?le.reason:null,pt=Un({bead_id:j.bead_id,merge_sha:le.head_sha,cleanup_cursor:le.cursor,cleanup_failed:Ge?{step:le.cursor,reason:Ge}:null,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]});return pt?{...b,landing:pt}:b}),Ua=null;if(Vt){let b=Ba(Vt),j=Vt.cause_detail;Ua={bead_id:Vt.bead_id,repo:Vt.repo||"",reason:Vt.cause||Vt.status,cause_detail:j&&typeof j.reason=="string"?{reason:j.reason,command:typeof j.command=="string"?j.command:null}:null,resume_attempt_id:Vt.attempt_id,resume_eligible:b.eligible,resume_reason:b.reason,discard:cr(Yn,Vt.bead_id,{attempt_id:Vt.attempt_id})}}let Wa=new Set(Qn.map(b=>b.bead_id)),po=Array.isArray(c.merge_queue)?c.merge_queue:[],za=new Map,Ha=new Map,Ga=new Map,Va=new Map,Ka=new Map;po.forEach((b,j)=>{b&&typeof b.bead_id=="string"&&(za.set(b.bead_id,j+1),Ha.set(b.bead_id,b.resolution),Ga.set(b.bead_id,b.continuation_action||null),Va.set(b.bead_id,b.head_review||null),Ka.set(b.bead_id,b.authority||null))});let Zr=c.merge_queue_state||{active:null,failures:{}},cd=Zr.failures||{},Ya=Zr.waiting&&typeof Zr.waiting.bead_id=="string"&&typeof Zr.waiting.reason=="string"?Zr.waiting:null,ud=c.auto_merge_skips||{},Za=b=>{let j=ud[b];if(!j)return null;let le=mt[b],Ge=le&&le.pr?le.pr.head_sha:null;return Ge&&Ge===j.head_sha?j.reason||"":null},Jn=new Map;for(let b of Qn)b.failed!==!0&&b.conflict_resolution&&(b.paused?Jn.has(b.bead_id)||Jn.set(b.bead_id,"paused"):Jn.set(b.bead_id,"running"));let Xa=Qn.filter(b=>!b.paused&&b.failed!==!0).length,Qa=(c.workspace_info||{}).slots,Ja=typeof Qa=="number"?Qa:typeof c.slots=="number"?c.slots:oo,dd=Xa>Ja,es=Nr(z),pd=(Array.isArray(c.done)?c.done.slice():[]).filter(b=>es===void 0||typeof b.added_at!="number"||b.added_at>=es).sort((b,j)=>(j.added_at||0)-(b.added_at||0)),_n=lo(pd,"done"),fd=new Set((Array.isArray(c.done)?c.done:[]).map(b=>b?.bead_id).filter(b=>typeof b=="string")),ei=[],_d=d?.()||"";for(let b of H){let j=jr(b.closed_at);if(typeof b.id!="string"||fd.has(b.id)||j===null||es!==void 0&&j<es||typeof b.comment_count!="number"||b.comment_count<=0)continue;let le=`${_d}\0${b.id}\0${String(b.updated_at)}\0${b.comment_count}`,Ge=I.get(le);Ge===void 0&&r&&(I.set(le,"pending"),Promise.resolve(r("get-comments",{id:b.id})).then(pt=>{let Kt=Array.isArray(pt)&&pt.some(Ct=>js(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");I.set(le,Kt?"session":"not-session"),Q()}).catch(()=>{I.set(le,"failed"),Q()})),Ge==="session"&&ei.push({id:b.id,title:b.title||b.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:j,created_at:b.created_at,updated_at:b.updated_at})}_n.push(...ei),_n.sort((b,j)=>(j.done_at||0)-(b.done_at||0));let ts={};for(let b of _r)ts[b]=0;let ti=!1,ri=0,fo=0,ni=0;for(let b of _n){let j=b.usage;if(j&&typeof j=="object"){let le=!1;for(let Ge of _r)Number.isFinite(j[Ge])&&(ts[Ge]+=j[Ge],ti=!0,le=!0);le&&(fo+=1,Number.isFinite(j.total_cost_usd)&&(ri+=j.total_cost_usd,ni+=1))}}fo>0&&ni===fo&&(ts.total_cost_usd=ri);let si=_n.map(b=>b.usage).filter(b=>b&&typeof b=="object"&&b.providers),md=si.length>0?xt(xs(si)):ti?Qt(ts):null,gd=c.lane_states&&typeof c.lane_states=="object"&&!Array.isArray(c.lane_states)?c.lane_states:{},bd=Array.isArray(c.serial_lanes)?c.serial_lanes:[],oi=b=>{if(Ne.some(Ge=>Ge.bead_id===b))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let j=Yr.filter(Ge=>Ge&&Ge.bead_id===b),le=j.length>0?j[j.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ai=bd.filter(b=>b&&typeof b.id=="string"&&Array.isArray(b.entries)).map((b,j)=>{let le=gd[b.id]||{},Ge=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(ut=>ut&&typeof ut.bead_id=="string"&&typeof ut.after=="string").map(ut=>[ut.bead_id,ut.after])),pt=lo(b.entries.filter(ut=>!Wa.has(ut.bead_id)),b.id).map(ut=>Ge.has(ut.id)?{...ut,badges:[`\u{1F517} ${Ge.get(ut.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ut.badges]}:ut),Kt=Array.isArray(le.occupied_by)?le.occupied_by.filter(ut=>typeof ut=="string"):[],Ct=Kt.map(ut=>({id:ut,title:y.get(ut)||ut,draggable:!1,lane:b.id,ghost:!0,badges:[oi(ut)]}));return{id:b.id,index:j+1,rows:[...Ct,...pt],occupied:Kt.length>0,badge:Kt.length>0?oi(Kt[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),hd=typeof c.serial_lane_count=="number"?c.serial_lane_count:ai.length;return{queue:c,idToTitle:y,candidates:od,candidate_hidden:{blocked:io.hidden_blocked,spec:io.hidden_spec},running:Qn,live_count:Xa,slots:Ja,over_cap:dd,failure:Ua,waiting:lo(pn.filter(b=>!Wa.has(b.bead_id)),"queue"),serial_lanes:ai,serial_lane_count:hd,pr_wait:Ne.map(b=>$g(b.bead_id,y.get(b.bead_id)||b.bead_id,mt,Vr[b.bead_id]||null,Wt(c.attempts||{},b.bead_id),sr[b.bead_id]||(U.has(b.bead_id)||ne.has(b.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Jn.get(b.bead_id)||null,b.external===!0,{position:za.get(b.bead_id)||0,active:Zr.active===b.bead_id,failure:cd[b.bead_id]||null,waiting:Ya?.bead_id===b.bead_id?Ya.reason:null,resolution:Ha.get(b.bead_id),continuation_action:Ga.get(b.bead_id),head_review:Va.get(b.bead_id)||null,authority:Ka.get(b.bead_id)||null},b.wt_present!==!1,c.auto_merge===!0?Za(b.bead_id):null,La(Xn,id(b.bead_id)),c.completion_status&&typeof c.completion_status=="object"&&!Array.isArray(c.completion_status)&&c.completion_status[b.bead_id]||null,c.discard_operations&&typeof c.discard_operations=="object"&&!Array.isArray(c.discard_operations)?c.discard_operations:{},Zn.get(qa.get(b.bead_id)||"")?.worker_serial===!0,c.auto_merge===!0,{merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]})).map(b=>({...b,...Xe(b.id)})),merge_queue_length:po.length,merge_queue_running:po.length>0,auto_excluded:Ne.map(b=>b.bead_id).filter(b=>Za(b)!==null),declared_base:Xn,done:_n,token_total:md,cleanup_failures:Vn,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]}}function ze(){let _=!!o?.get()?.job,E=!_&&o?.isPending?.()===!0,H=_?"\uBD84\uC11D \uC911":E?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${H?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${H?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${H?l`<span class="worker-analysis-btn__badge">${H}</span>`:""}
    </button>`}function rt(c){let _=c.waiting.length>0?c.waiting[0].id:"\u2014",E=l`<button
      type="button"
      class="worker-play${c.queue.auto_advance?" is-active":""}"
    >
      ${c.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,H=N(c),ae=c.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ve=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${c.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${c.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${S()} 완료 <b>${c.done.length}</b></span
      >`,_e=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${c.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${c.declared_base||"?"}</span
    >`,et=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${oo}
          step="1"
          .value=${String(c.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Du},(m,O)=>O+1).map(m=>l`<option
                value=${String(m)}
                ?selected=${c.serial_lane_count===m}
              >
                ${m}
              </option>`)}
        </select>
      </label>
      ${o?ze():""} `,y=qc({failure:c.failure}),v=$c(c.repo_operations,c.cleanup_failures);return k?l`<div class="worker-ribbon">
          ${E} ${H}
          <div class="worker-kpi worker-kpi--ribbon">${ae}${ve}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${et}</div>
          <div class="worker-kpi">${_e}</div>
        </div>
        ${v}${Be.template()}${y}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${E}${H}${et}</div>
        <div class="worker-kpi">
          ${ae}${ve}${_e}
          ${(Array.isArray(c.token_total)?c.token_total:c.token_total?[{label:c.token_total,tooltip:`${S()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(m=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${m.tooltip}
                >${S()} 완료 · 누적 ${m.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${v}${Be.template()}${y}`}function W(c){if(c.running.length===0&&c.pr_wait.length===0)return"";let _=c.running.some(E=>!E.paused&&E.failed!==!0);return l`<section
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
      </header>
      ${c.running.length>0?ya(c.running,Date.now(),Pe):""}
      ${c.pr_wait.map(E=>da(E))}
    </section>`}function te(c){let _=c.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${q.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${sg.map(E=>l`<button
              type="button"
              class="worker-filter__chip${q.spec===E.value?" is-active":""}"
              data-spec=${E.value}
              aria-pressed=${q.spec===E.value?"true":"false"}
            >
              ${E.label}
            </button>`)}
        ${_.spec>0?l`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function me(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${X}
    >
      ${og.map(c=>l`<option value=${c.value} ?selected=${X===c.value}>
            ${c.label}
          </option>`)}
    </select>`}function w(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${z}
      >
        ${or.map(c=>l`<option value=${c.value} ?selected=${z===c.value}>
              ${c.label}
            </option>`)}
      </select>
    </div>`}function C(c){let _=l`<span
      class="worker-lane__badge${c.occupied?" worker-lane__badge--held":""}"
      >${c.badge}</span
    >`,E=c.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return rr({id:`worker-pane-lane-${c.id}`,lane:c.id,title:`\uC9C1\uB82C ${c.index}`,items:c.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:_,controls:E})}function N(c){let _=c.queue.auto_merge===!0;if(c.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${_?" is-active":""}"
        title=${_?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${_?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${c.merge_queue_length}
      </button>`;if(_)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let E=new Set(c.auto_excluded),H=c.pr_wait.filter(ae=>ae.merge_action&&ae.merge_enabled&&!E.has(ae.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${H>0?` ${H}`:""}
    </button>`}function J(c){let _=rr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:c.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:me(),controls:te(c),place_menu:K(c.candidates)});return k?l`<div class="worker-lanes worker-lanes--mobile">
        ${W(c)}
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:D.queue,preview:qu(c.waiting)})}
        ${c.serial_lanes.map(E=>C(E))}
        ${_}
        ${rr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:c.done,empty:`${S()} \uC644\uB8CC \uC5C6\uC74C`,controls:w(),collapsible:!0,collapsed:D.done,preview:Array.isArray(c.token_total)?c.token_total.map(E=>E.label).join(" \xB7 "):c.token_total||qu(c.done)})}
      </div>`:l`<div class="worker-lanes">
      ${_}
      <div class="worker-wait">
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${c.serial_lanes.map(E=>C(E))}
      </div>
      ${rr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${c.slots}`,items:c.running,live:c.running.some(E=>!E.paused&&E.failed!==!0),body:ya(c.running,Date.now(),Pe)})}
      ${rr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:c.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${rr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${S()} ${c.done.length}`,items:c.done,empty:`${S()} \uC644\uB8CC \uC5C6\uC74C`,controls:w()})}
    </div>`}function ke(c){D={...D,[c]:!D[c]},pg(D),Q()}function Q(){let c=be();Qe(rt(c),$e),Qe(J(c),fe)}function Se(){let c=document.querySelector(".app-header");if(!c)return;let _=()=>{let E=Math.round(c.getBoundingClientRect().height);de.style.setProperty("--worker-ribbon-top",`${E}px`)};if(_(),typeof ResizeObserver=="function"){let E=new ResizeObserver(_);E.observe(c),M.push(()=>E.disconnect())}else window.addEventListener("resize",_),M.push(()=>window.removeEventListener("resize",_))}function Ce(){if(typeof window.matchMedia!="function")return;let c=window.matchMedia(ug);k=!!c.matches;let _=E=>{let H=!!(E&&typeof E.matches=="boolean"?E.matches:c.matches);H!==k&&(k=H,Q())};typeof c.addEventListener=="function"?(c.addEventListener("change",_),M.push(()=>c.removeEventListener("change",_))):typeof c.addListener=="function"&&(c.addListener(_),M.push(()=>c.removeListener(_)))}let ft=null;function Et(c){ft=c.target instanceof Element?c.target:null}function nt(c){let E=c.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!E)return;if(ft&&E.contains(ft)&&ft.closest("input, button, a")){c.preventDefault();return}let H=E.dataset.beadId||"",ae=E.dataset.lane||"";A={bead_id:H,from_lane:ae};try{c.dataTransfer?.setData("text/plain",H),c.dataTransfer&&(c.dataTransfer.effectAllowed="move")}catch{}}function yt(c){let _=c.target?.closest?.(".worker-pane");if(!_)return;let E=_.dataset.lane||"";E!=="candidate"&&E!=="queue"&&!/^s[1-5]$/.test(E)||(c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function ur(c){c.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function vt(c,_){let E=L.find(_e=>_e.id===c);if(!E)return;let H=L.filter(_e=>_e.id!==c),ae=H.length;if(_){let _e=_.dataset.beadId;if(_e===c)return;let et=H.findIndex(y=>y.id===_e);et>=0&&(ae=et)}let ve=H.slice();ve.splice(ae,0,E),R.applyReorder(c,ve,ae)}function Tt(c){let _=c.target?.closest?.(".worker-pane");if(!_)return;c.preventDefault(),_.classList.remove("worker-pane--drag-over");let E=_.dataset.lane||"",H=A?.bead_id||c.dataTransfer?.getData("text/plain")||"",ae=A?.from_lane||"";if(A=null,!H)return;let ve=c.target?.closest?.(".worker-mini, .worker-card"),_e=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),et=_e.length;if(ve){let y=_e.indexOf(ve);y>=0&&(et=y)}if(et=Math.max(0,et-_.querySelectorAll(".worker-mini--ghost").length),_.classList.contains("worker-pane--collapsed")&&(et=Le()),E==="candidate"){if(ae==="candidate"){vt(H,ve);return}(ae==="queue"||/^s[1-5]$/.test(ae))&&Ie(H);return}if(E==="queue"||/^s[1-5]$/.test(E)){let y=E==="queue"?"parallel":E;ae===E?Ve(H,y,et):Ue(H,y)}}function dr(c){q=c,rg(c),Q()}function wr(c){X=c==="board"||c==="created"||c==="spec"?c:ao,ig(X),Q()}function jt(c){z=Ut(c)?c:Dt,cg(z),f?.(z),Q()}function Ht(c){let _=c.target?.closest?.(".worker-serial-lane-count");if(_){let et=Number.parseInt(_.value,10);Number.isFinite(et)&&Te(et).then(Q);return}let E=c.target?.closest?.(".worker-filter__blocked");if(E){dr({...q,show_blocked:E.checked});return}let H=c.target?.closest?.(".worker-done-range");if(H){jt(H.value);return}let ae=c.target?.closest?.(".worker-sort");if(ae){wr(ae.value||ao);return}let ve=c.target?.closest?.(".worker-slots__input");if(!ve)return;let _e=Number.parseInt(ve.value,10);if(!Number.isFinite(_e)){Q();return}we(_e).then(Q)}function wt(c){return c?{runner:c.runner||void 0,model:c.model||void 0,effort:c.effort||void 0,worktree:c.worktree||void 0,status:c.status||void 0,session_id:c.session_id||void 0}:{}}function nr(){let c=be();return{operations:c.repo_operations,cleanup_failures:c.cleanup_failures,repo:d&&d()||""}}function st(){Pe&&xe.close(),He.hidden=!1,he.hidden=!1,Re.open(nr()),Q()}function Mt(c){let _=Ee(),E=_.attempts?_.attempts[c]:null;Pe=c,ge=null,Re.close(),He.hidden=!0,he.hidden=!1,xe.open({attempt_id:c,meta:wt(E)}),Q()}function kr(c,_){Pe=null,ge=c,Re.close(),He.hidden=!0,he.hidden=!1,xe.open({attempt_id:c,meta:_,hide_prompt:!0}),Q()}function Gt(){if(Re.isOpen()&&Re.refresh(nr()),ge){let E=(o?.get()?.runs||[]).find(H=>H.run_id===ge);E?xe.updateMeta(Ra(E)):xe.close();return}if(!Pe)return;let c=Ee(),_=c.attempts?c.attempts[Pe]:null;if(_){xe.updateMeta(wt(_));return}xe.close()}function ye(c){let _=c.target;if(_?.closest?.(".worker-mini__serial, .worker-mini__grip")||_?.closest?.("#worker-parallel-analysis-dialog"))return;if(_?.closest?.(".worker-analysis-btn")){Ye?.open();return}if(_?.closest?.(".worker-repo-strip")||_?.closest?.(".worker-mini__timeline")){st();return}let E=_?.closest?.(".worker-repo-op__session");if(E){let Me=E.dataset.attemptId;Me&&Mt(Me);return}let H=_?.closest?.(".worker-repo-op__resolve");if(H){ue(H.dataset.operationId||"");return}let ae=_?.closest?.(".worker-repo-op__dismiss");if(ae){qe(ae.dataset.operationId||"");return}let ve=_?.closest?.(".worker-cleanup__resume");if(ve){let Me=ve.dataset.beadId;Me&&We(Me);return}let _e=_?.closest?.(".worker-banner__resume");if(_e){let Me=_e.dataset.attemptId;Me&&Ze(Me);return}let et=_?.closest?.(".worker-banner__discard");if(et){let Me=et.dataset.confirmation==="merged"?"merged":"unmerged";P(et.dataset.beadId||"",et.dataset.attemptId||null,Me,et.dataset.operationId||null);return}let y=_?.closest?.(".worker-banner__dismiss");if(y){let Me=y.dataset.attemptId;Me&&G(Me);return}if(_?.closest?.(".worker-play")){oe(!Ee().auto_advance);return}let v=_?.closest?.(".worker-merge-all");if(v){v.classList.contains("worker-merge-all--stop")?Ee().auto_merge===!0?g(!1):$():g(!0);return}let m=_?.closest?.(".worker-pane__hd--toggle");if(m){let Me=m.dataset.lane;(Me==="queue"||Me==="done")&&ke(Me);return}let O=_?.closest?.(".worker-card__place-lane");if(O){let Me=O.dataset.beadId,dt=O.dataset.lane;Me&&(dt==="parallel"||/^s[1-5]$/.test(dt||""))&&(Y=null,Q(),Ue(Me,dt));return}if(_?.closest?.(".worker-card__place-cancel")){Y=null,Q();return}let re=_?.closest?.(".worker-card__place");if(re){let Me=re.dataset.beadId;Me&&!re.disabled&&(ot()?(Y=Me,Q()):Ue(Me,"parallel"));return}let Fe=_?.closest?.(".worker-filter__chip");if(Fe){let Me=Fe.dataset.spec;(Me==="all"||Me==="with"||Me==="without")&&dr({...q,spec:Me});return}let Ke=_?.closest?.(".worker-mini__merge");if(Ke){let Me=Ke.dataset.beadId||"";Ee().cleanup_failed?.[Me]?We(Me):Oe(Me);return}let Xe=_?.closest?.(".worker-mini__merge-cancel");if(Xe){x(Xe.dataset.beadId||"");return}let Ne=_?.closest?.(".worker-mini__discard");if(Ne){P(Ne.dataset.beadId||"",Ne.dataset.attemptId||null,Ne.dataset.discardMode==="merged"?"merged":"unmerged",Ne.dataset.operationId||null);return}let mt=_?.closest?.(".worker-mini__stale-continue");if(mt){V("worker-stale-work-continue",mt.dataset.beadId||"",mt.dataset.actionId||"");return}let sr=_?.closest?.(".worker-mini__stale-backup");if(sr){V("worker-stale-work-backup-fresh",sr.dataset.beadId||"",sr.dataset.actionId||"");return}let Vr=_?.closest?.(".worker-mini__stale-recheck");if(Vr){V("worker-stale-work-recheck",Vr.dataset.beadId||"",Vr.dataset.actionId||"");return}let Vn=_?.closest?.(".worker-mini__revise-fix");if(Vn){Z("worker-revise-fix",Vn.dataset.beadId||"");return}let pn=_?.closest?.(".worker-mini__revise-approve");if(pn){Z("worker-revise-approve",pn.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__discard")){let Me=_?.closest?.(".rtile"),dt=Me?.dataset?.beadId,Kr=Me?.dataset?.attemptId;dt&&P(dt,Kr||null,"unmerged",_?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(_?.closest?.(".rtile__dismiss")){let dt=_?.closest?.(".rtile")?.dataset?.attemptId;dt&&G(dt);return}if(_?.closest?.(".rtile__pause")){let dt=_?.closest?.(".rtile")?.dataset?.attemptId;dt&&lt(dt);return}if(_?.closest?.(".rtile__resume")){let dt=_?.closest?.(".rtile")?.dataset?.attemptId;dt&&Ze(dt);return}if(_?.closest?.(".rtile__session")){let dt=_?.closest?.(".rtile")?.dataset?.attemptId;dt&&Mt(dt);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){Re.close(),xe.close();return}if(_?.closest?.(".worker-drawer-host"))return;let fn=_?.closest?.(".rtile");if(fn){if(_?.closest?.(".rtile__id")){let dt=fn.dataset.beadId;dt&&Xt(dt).then(Kr=>{Kr?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Me=fn.dataset.beadId;Me&&u&&u(Me);return}let Kn=_?.closest?.(".worker-mini, .worker-card");if(Kn){let Me=Kn.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){Me&&Xt(Me).then(dt=>{dt?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Me&&u&&u(Me)}}return e.addEventListener("pointerdown",Et),e.addEventListener("dragstart",nt),e.addEventListener("dragover",yt),e.addEventListener("dragleave",ur),e.addEventListener("drop",Tt),e.addEventListener("click",ye),e.addEventListener("change",Ht),Ce(),Se(),h&&M.push(h.subscribe(()=>{for(let[c,_]of I)_==="failed"&&I.delete(c);Q()})),s&&M.push(s.subscribe(()=>{let c=d&&d()||"";c!==Ae&&(Ae=c,je.close()),Q(),Gt()})),o&&typeof o.subscribe=="function"&&M.push(o.subscribe(()=>{Gt(),Q()})),Q(),{load(){Q()},destroy(){for(let c of M.splice(0))try{c()}catch{}e.removeEventListener("pointerdown",Et),e.removeEventListener("dragstart",nt),e.removeEventListener("dragover",yt),e.removeEventListener("dragleave",ur),e.removeEventListener("drop",Tt),e.removeEventListener("click",ye),e.removeEventListener("change",Ht);try{xe.destroy()}catch{}he.hidden=!0;try{Ye?.destroy()}catch{}try{je.destroy()}catch{}Qe(l``,e)}}}function Ma(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Hu(e,t,r,n=async()=>{},s=async()=>{}){let o=_t("views:workspace-picker"),a=null,i=!1,u=!1,d=!1;async function p(D){let U=D.target.value,ce=t.getState().workspace?.current?.path||"";if(U&&U!==ce){o("switching workspace to %s",U),i=!0,S();try{await r(U)}catch(F){o("workspace switch failed: %o",F)}finally{i=!1,S()}}}async function f(){let D=t.getState(),k=D.workspace?.current?.path||D.workspace?.available?.[0]?.path||"";if(!(!k||u)){o("git-pulling workspace %s",k),u=!0,S();try{await n(k)}catch(U){o("workspace git pull failed: %o",U)}finally{u=!1,S()}}}function h(D){let k=D.target;k&&e.contains(k)||L()}function R(D){D.key==="Escape"&&L()}function A(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",R),S())}function L(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",R),S())}function q(){d?L():A()}async function Y(D){let k=D.target,U=k.value,ne=k.checked;o("toggling visibility %s \u2192 %s",U,String(ne));try{await s(U,ne)}catch(ce){o("workspace visibility toggle failed: %o",ce)}}function X(D){return D?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${i||u}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function z(D,k){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${q}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${D.map(U=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${U.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${U.path}"
                        .checked=${!k.has(U.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ma(U.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let D=t.getState(),k=D.workspace?.current,U=D.workspace?.available||[],ne=new Set(D.workspace?.hidden||[]),ce=k?.path||U[0]?.path||"";if(U.length===0)return l``;let F=U.filter(M=>!ne.has(M.path)||M.path===ce);if(F.length<=1){let M=F[0]||U[0],de=Ma(M.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${M.path}"
            >${de}</span
          >
          ${z(U,ne)}
          ${X(ce)}
          ${u?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||u}
          aria-label="Select project workspace"
        >
          ${F.map(M=>l`
              <option
                value="${M.path}"
                ?selected=${M.path===ce}
                title="${M.path}"
              >
                ${Ma(M.path)}
              </option>
            `)}
        </select>
        ${z(U,ne)}
        ${X(ce)}
        ${i||u?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){Qe(I(),e)}return S(),a=t.subscribe(()=>S()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",R),Qe(l``,e)}}}var Gu=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Pa(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Vu(e,t,r=Pa()){return{id:r,type:e,payload:t}}function Ku(e={}){let t=_t("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,u=!0,d=new Map,p=[],f=new Map,h=new Set;function R(I){for(let S of Array.from(h))try{S(I)}catch{}}function A(){if(!u||i)return;o="reconnecting",t("ws reconnecting\u2026"),R(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),S=(r.jitterRatio||0)*I,D=Math.max(0,Math.round(I+(Math.random()*2-1)*S));t("ws retry in %d ms (attempt %d)",D,a+1),i=setTimeout(()=>{i=null,z()},D)}function L(I){try{s?.send(JSON.stringify(I))}catch(S){t("ws send failed",S)}}function q(){for(o="open",t("ws open"),R(o),a=0;p.length;){let I=p.shift();I&&L(I)}}function Y(I){let S;try{S=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){t("ws received invalid envelope");return}if(d.has(S.id)){let k=d.get(S.id);d.delete(S.id),S.ok?k?.resolve(S.payload):k?.reject(S.error||new Error("ws error"));return}let D=f.get(S.type);if(D&&D.size>0)for(let k of Array.from(D))try{k(S.payload)}catch(U){t("ws event handler error",U)}else t("ws received unhandled message type: %s",S.type)}function X(){o="closed",t("ws closed"),R(o);for(let[I,S]of d.entries())S.reject(new Error("ws disconnected")),d.delete(I);a+=1,A()}function z(){if(!u)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",R(o),s.addEventListener("open",q),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",X)}catch(S){t("ws connect failed %o",S),A()}}return z(),{send(I,S){if(!Gu.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let D=Pa(),k=Vu(I,S,D);return t("send %s id=%s",I,D),new Promise((U,ne)=>{d.set(D,{resolve:U,reject:ne,type:I}),s&&s.readyState===s.OPEN?L(k):(t("queue %s id=%s (state=%s)",I,D,o),p.push(k))})},on(I,S){f.has(I)||f.set(I,new Set);let D=f.get(I);return D?.add(S),()=>{D?.delete(S)}},onConnection(I){return h.add(I),()=>{h.delete(I)}},reconnect(){u=!0,i&&(clearTimeout(i),i=null),a=0,z()},close(){u=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function xg(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ag(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Da=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Yu=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Rr="tab:worker:closed",Sg="bdui.worker.done-range",Zu=nu,Xu="worker:queue",Qu="worker:parallel-analysis",Ju="ui:order",ed="ui:display-policy",td="exec:presets",Ir="tab:board:closed",rd="beads-ui.board.closed-range";function Eg(e){let t=_t("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Qe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),u=document.getElementById("detail-panel");if(s&&ku(s),o&&a&&i&&u){let He=function(y,v){let m="Request failed",O="";if(y&&typeof y=="object"){let re=y;if(typeof re.message=="string"&&re.message.length>0&&(m=re.message),typeof re.details=="string")O=re.details;else if(re.details&&typeof re.details=="object")try{O=JSON.stringify(re.details,null,2)}catch{O=""}}else typeof y=="string"&&y.length>0&&(m=y);let T=v&&v.length>0?`Failed to load ${v}`:"Request failed";Je.open(T,m,O)},Ze=function(y){return`${st.getState().workspace.current?.path||""}\0${y}`},G=function(){K&&(K().catch(()=>{}),K=null),B=null,se=null},Oe=function(y){Le=y;let v=()=>{Le!==y||st.getState().selected_id!==y||(Le=null,ee(y))};if(!Ie){Ve.then(v);return}v()},x=function(y,v,m,O,T){return m!==g[v]?(T().catch(()=>{}),!1):(y.set(O,T),!0)},P=function(){let y=st.getState();qe(y.view==="board"),W(y.view==="worker"),N(y.view==="monitor"),me(y.view==="board"||y.view==="worker"||$||!!y.selected_id)},oe=function(){let y=Nr(V);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},ue=function(){let y=Nr(Z);return y===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:y}}},qe=function(y){if(y)for(let[v,m]of Da){if(We.has(v)||pe.has(v))continue;let O=v===Ir?oe():{type:m};try{xe.register(v,O)}catch(Fe){t("register %s store failed: %o",v,Fe)}pe.add(v);let T=g.board,re=!1;ge.subscribeList(v,O).then(Fe=>{re=!x(We,"board",T,v,Fe)}).catch(Fe=>{t("subscribe %s failed: %o",v,Fe),He(Fe,"board")}).finally(()=>{pe.delete(v),re&&P()})}else be()},be=function(){g.board+=1;for(let[y]of Da){let v=We.get(y);v&&(v().catch(()=>{}),We.delete(y));try{xe.unregister(y)}catch(m){t("unregister %s failed: %o",y,m)}}},W=function(y){if(!y){te();return}for(let[v,m]of Yu){if(ze.has(v)||pe.has(v))continue;let O=v===Rr?ue():{type:m};try{xe.register(v,O)}catch(Fe){t("register %s store failed: %o",v,Fe)}pe.add(v);let T=g.worker,re=!1;ge.subscribeList(v,O).then(Fe=>{re=!x(ze,"worker",T,v,Fe)}).catch(Fe=>{t("subscribe %s failed: %o",v,Fe),He(Fe,"worker")}).finally(()=>{pe.delete(v),re&&P()})}},te=function(){g.worker+=1;for(let[y]of Yu){let v=ze.get(y);v&&(v().catch(()=>{}),ze.delete(y));try{xe.unregister(y)}catch(m){t("unregister %s failed: %o",y,m)}}},me=function(y){if(!y){w();return}rt||(Pe("subscribe-worker-queue",{id:Xu}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),Pe("subscribe-worker-parallel-analysis",{id:Qu}).catch(v=>{t("subscribe-worker-parallel-analysis failed: %o",v)}),rt=()=>(Pe("unsubscribe-worker-parallel-analysis",{id:Qu}),Pe("unsubscribe-worker-queue",{id:Xu})))},w=function(){rt&&(rt().catch(()=>{}),rt=null),je.clear()},N=function(y){if(!y){J();return}C||(Pe("subscribe-monitor-pipeline",{id:Zu}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),C=()=>Pe("unsubscribe-monitor-pipeline",{id:Zu}))},J=function(){C&&(C().catch(()=>{}),C=null)},Q=function(){ke||(Pe("subscribe-ui-order",{id:Ju}).catch(y=>{t("subscribe-ui-order failed: %o",y)}),ke=()=>Pe("unsubscribe-ui-order",{id:Ju}))},Se=function(){ke&&(ke().catch(()=>{}),ke=null),Be.clear()},ft=function(){Ce||(Pe("subscribe-display-policy",{id:ed}).catch(y=>{t("subscribe-display-policy failed: %o",y)}),Ce=()=>Pe("unsubscribe-display-policy",{id:ed}))},Et=function(){Ce&&(Ce().catch(()=>{}),Ce=null),Ye.clear()},yt=function(){nt||(Pe("subscribe-impl-presets",{id:td}).catch(y=>{t("subscribe-impl-presets failed: %o",y)}),nt=()=>Pe("unsubscribe-impl-presets",{id:td}))},jt=function(y){if(!y)return"Unknown";let v=y.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var d=He,p=Ze,f=G,h=Oe,R=x,A=P,L=oe,q=ue,Y=qe,X=be,z=W,I=te,S=me,D=w,k=N,U=J,ne=Q,ce=Se,F=ft,M=Et,de=yt,$e=jt;let he=document.getElementById("header-loading"),De=Hi(he),Je=wc(e),fe=Ku(),Pe=De.wrapSend((y,v)=>fe.send(y,v)),ge=Ni(Pe),xe=qi(),Re=Bi(),je=ji(),Ae=ki(),Be=Fi(),Ye=vi(),Ee=wi(),ot=$i();fe.on("impl-presets-snapshot",y=>{let v=y;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&Ee.set({revision:v.revision,presets:v.presets})}),fe.on("monitor-pipeline-snapshot",y=>{let v=y;if(!(!v||!Array.isArray(v.workspaces)))try{Ae.set(v.workspaces,v.workspaces_state)}catch{}}),fe.on("ui-order-snapshot",y=>{let v=y;if(v&&typeof v.revision=="number")try{Be.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),fe.on("display-policy-snapshot",y=>{let v=y;if(v&&v.policy&&typeof v.policy=="object")try{Ye.set(v.policy)}catch{}}),fe.on("session-log-snapshot",y=>{let v=y;if(v&&typeof v.id=="string")try{ot.set(v.id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),fe.on("session-log-append",y=>{let v=y;if(v&&typeof v.id=="string")try{ot.append(v.id,v.event)}catch{}}),fe.on("snapshot",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",O=m?xe.getStore(m):null;if(O&&v&&v.type==="snapshot")try{O.applyPush(v)}catch{}}),fe.on("upsert",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",O=m?xe.getStore(m):null;if(O&&v&&v.type==="upsert")try{O.applyPush(v)}catch{}}),fe.on("delete",y=>{let v=y,m=v&&typeof v.id=="string"?v.id:"",O=m?xe.getStore(m):null;if(O&&v&&v.type==="delete")try{O.applyPush(v)}catch{}});let K=null,B=null,se=null,Le=null,Ue=()=>{},Ve=new Promise(y=>{Ue=()=>y(void 0)}),Ie=!1,lt=!1;async function ee(y){let v=Ze(y);if(v===B||v===se)return;se=v;let m=`detail:${y}`,O={type:"issue-detail",params:{id:y}};try{xe.register(m,O)}catch(T){t("register detail store failed: %o",T)}try{let T=await ge.subscribeList(m,O);if(st.getState().selected_id!==y||Ze(y)!==v){await T().catch(()=>{});return}K&&await K().catch(()=>{}),K=T,B=v}catch(T){t("detail subscribe failed: %o",T),He(T,"issue details")}finally{se===v&&(se=null)}}let We=new Map,pe=new Set,g={board:0,worker:0},$=!1,V=Dt;try{let y=window.localStorage.getItem(rd);Ut(y)&&(V=y)}catch{}let Z=Dt;try{let y=window.localStorage.getItem(Sg);Ut(y)&&(Z=y)}catch{}async function we(y){if(!Ut(y)||y===V)return;V=y;try{window.localStorage.setItem(rd,y)}catch{}let v=We.get(Ir);if(!v)return;We.delete(Ir),await v().catch(()=>{});let m=oe();try{xe.register(Ir,m)}catch(O){t("register %s store failed: %o",Ir,O)}try{let O=await ge.subscribeList(Ir,m);We.set(Ir,O)}catch(O){t("re-subscribe %s failed: %o",Ir,O),He(O,"board")}}async function Te(y){if(!Ut(y)||y===Z)return;Z=y;let v=ze.get(Rr);if(!v)return;ze.delete(Rr),await v().catch(()=>{});let m=ue();try{xe.register(Rr,m)}catch(O){t("register %s store failed: %o",Rr,O)}try{let O=await ge.subscribeList(Rr,m);ze.set(Rr,O)}catch(O){t("re-subscribe %s failed: %o",Rr,O),He(O,"worker")}}let ze=new Map,rt=null,C=null,ke=null,Ce=null,nt=null;async function ur(){Ce=null,Ye.clear(),nt=null,Ee.clear(),rt=null,C=null,We.clear(),ze.clear(),g.board+=1,g.worker+=1,yt();let y=st.getState().workspace.current?.path;if(y)try{await fe.send("set-workspace",{path:y})}catch(m){t("workspace restore after reconnect failed: %o",m);return}ft();let v=st.getState();qe(v.view==="board"),W(v.view==="worker"),N(v.view==="monitor"),me(v.view==="board"||v.view==="worker"||!!v.selected_id)}async function vt(){t("clearing all subscriptions for workspace switch"),be(),te(),w(),Re.clear(),Se(),Q(),Et(),ft(),G();let y=st.getState();if(y.selected_id)try{xe.unregister(`detail:${y.selected_id}`)}catch{}let v=st.getState();qe(v.view==="board"),W(v.view==="worker"),N(v.view==="monitor"),me(v.view==="board"||v.view==="worker"||!!v.selected_id),v.selected_id&&Oe(v.selected_id)}async function Tt(y){t("requesting workspace switch to %s",y),lt=!0;try{let v=await fe.send("set-workspace",{path:y});t("workspace switch result: %o",v),v&&v.workspace&&(st.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",y),v.changed&&(await vt(),ie("Switched to "+jt(y),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),ie("Failed to switch workspace","error",3e3),v}finally{lt=!1}}async function dr(y){t("requesting workspace git pull for %s",y);try{let v=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let m=v?.status;if(m==="up_to_date"){ie("Already up to date","success",2e3);return}if(m==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+jt(y),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let m=v?.code,O=v?.message;if(m==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(m==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(m==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let T=O?`: ${O}`:"";throw ie(`Git pull failed${T}`,"error",3e3),v}}async function wr(y,v){t("setting workspace visibility %s \u2192 %s",y,String(v));try{await fe.send("set-workspace-visibility",{path:y,visible:v}),await Ht()}catch(m){t("workspace visibility update failed: %o",m),ie("Failed to update project visibility","error",3e3)}}async function Ht(){try{let y=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",y),y&&Array.isArray(y.workspaces)){let v=y.workspaces.map(re=>({path:re.path,database:re.database,pid:re.pid,version:re.version})),m=y.current?{path:y.current.root_dir,database:y.current.db_path}:null,O=Array.isArray(y.hidden)?y.hidden.filter(re=>typeof re=="string"):[];st.setState({workspace:{current:m,available:v,hidden:O}});let T=window.localStorage.getItem("beads-ui.workspace");T&&(!v.some(Fe=>Fe.path===T)||O.includes(T)?window.localStorage.removeItem("beads-ui.workspace"):m&&T!==m.path&&(t("restoring saved workspace preference: %s",T),await Tt(T)))}}catch(y){t("failed to load workspaces: %o",y)}}fe.on("workspace-changed",y=>{t("workspace-changed event: %o",y),y&&y.root_dir&&(st.setState({workspace:{current:{path:y.root_dir,database:y.db_path}}}),Ht(),vt())});let wt=!1;if(typeof fe.onConnection=="function"){let y=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(wt=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&wt&&(wt=!1,ie("Reconnected","success",2200),Ag(st,(m,O)=>{t(`${m}: %o`,O)}),ur())};fe.onConnection(y)}let nr="board";try{let y=window.localStorage.getItem("beads-ui.view");(y==="board"||y==="worker"||y==="monitor")&&(nr=y)}catch(y){t("view parse error: %o",y)}let st=zi({config:xg(),view:nr});fe.on("worker-queue-snapshot",y=>{let v=y;if(!v||!v.queue)return;let m=st.getState().workspace.current?.path;if(typeof m=="string"&&m.length>0&&v.root_dir!==m){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{Re.set(v.queue)}catch{}}),fe.on("worker-parallel-analysis-snapshot",y=>{let v=y;if(!v)return;let m=st.getState().workspace.current?.path;if(!(typeof m=="string"&&m.length>0&&typeof v.root_dir=="string"&&v.root_dir!==m))try{je.set({settings:v.settings,job:v.job??null,runs:Array.isArray(v.runs)?v.runs:[],last_good:v.last_good??null})}catch{}});let Mt=Ui(st);Mt.start();let kr=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),Gt=async(y,v)=>{try{return await Pe(y,v)}catch(m){if(kr.has(y))throw m;return[]}};n&&ou(n,st,Mt);let ye=document.getElementById("workspace-picker");ye&&Hu(ye,st,Tt,dr,wr);let c=cu(e,(y,v)=>Pe(y,v));try{let y=document.getElementById("new-issue-btn");y&&y.addEventListener("click",()=>c.open())}catch{}let _=fu(e,{policyStore:Ye,queueStore:Re,implPresetStore:Ee,transport:(y,v)=>Pe(y,v),onOpenChange:y=>{$=y,P()},labelOptions:()=>{let y=new Set;for(let[v]of Da)for(let m of xe.snapshotFor(v)||[]){let O=m.labels;if(Array.isArray(O))for(let T of O)typeof T=="string"&&T.length>0&&y.add(T)}return Array.from(y).sort()}});try{let y=document.getElementById("display-settings-btn");y&&(y.setAttribute("aria-label","\uC124\uC815"),y.setAttribute("title","\uC124\uC815"),y.addEventListener("click",()=>_.open()))}catch{}let E=rl(o,{gotoIssue:y=>Mt.gotoIssue(y),issueStores:xe,transport:Gt,workerQueueStore:Re,uiOrderStore:Be,displayPolicyStore:Ye,closedRange:V,onClosedRangeChange:y=>{we(y)},onNewIssue:()=>c.open()}),H=Oa(a,{transport:Gt,issueStores:xe,queueStore:Re,analysisStore:je,sessionLogStore:ot,uiOrderStore:Be,gotoIssue:y=>st.setState({selected_id:y}),getWorkspacePath:()=>st.getState().workspace.current?.path,doneRange:Z,onDoneRangeChange:y=>{Te(y)}}),ae=su(i,{transport:Gt,pipelineStore:Ae,execPresetStore:Ee,gotoIssue:y=>Mt.gotoIssue(y),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:y=>Tt(y)}),ve=vc(u,{issueStores:xe,transport:Gt,queueStore:Re,execPresetStore:Ee,sessionLogStore:ot,getWorkspacePath:()=>st.getState().workspace.current?.path,onNavigate:y=>{st.getState().view==="worker"?st.setState({selected_id:y}):Mt.gotoIssue(y)},onClose:()=>{let y=st.getState();st.setState({selected_id:null});try{Mt.gotoView(y.view==="worker"||y.view==="monitor"?y.view:"board")}catch{}},onOpenExecPresets:()=>{_.open("execution")}}),_e=st.getState().selected_id;_e&&(u.hidden=!1,ve.load(_e),Oe(_e)),st.subscribe(y=>{let v=y.selected_id;v?(u.hidden=!1,ve.load(v),lt||Oe(v)):(ve.clear(),u.hidden=!0,G())});let et=y=>{o.hidden=y.view!=="board",a.hidden=y.view!=="worker",i.hidden=y.view!=="monitor",qe(y.view==="board"),W(y.view==="worker"),N(y.view==="monitor"),me(y.view==="board"||y.view==="worker"||$||!!y.selected_id),!y.selected_id&&y.view==="board"&&E.load(),y.view==="worker"&&H.load(),y.view==="monitor"?ae.load():ae.pause(),window.localStorage.setItem("beads-ui.view",y.view)};st.subscribe(et),et(st.getState()),Q(),ft(),yt(),Ht().finally(()=>{Ie=!0,Ue()}),window.addEventListener("keydown",y=>{let v=y.ctrlKey||y.metaKey,m=String(y.key||"").toLowerCase(),O=y.target,T=O&&O.tagName?String(O.tagName).toLowerCase():"",re=T==="input"||T==="textarea"||T==="select"||O&&typeof O.isContentEditable=="boolean"&&O.isContentEditable;v&&m==="n"&&(re||(y.preventDefault(),c.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Eg(t)});export{Eg as bootstrap,xg as readBootstrapConfig,Ag as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
