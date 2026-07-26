var Mo=Object.create;var Rr=Object.defineProperty;var No=Object.getOwnPropertyDescriptor;var Po=Object.getOwnPropertyNames;var Fo=Object.getPrototypeOf,Bo=Object.prototype.hasOwnProperty;var qo=(t,e,r)=>e in t?Rr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Lr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var zo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Po(e))!Bo.call(t,s)&&s!==r&&Rr(t,s,{get:()=>e[s],enumerable:!(n=No(e,s))||n.enumerable});return t};var Uo=(t,e,r)=>(r=t!=null?Mo(Fo(t)):{},zo(e||!t||!t.__esModule?Rr(r,"default",{value:t,enumerable:!0}):r,t));var he=(t,e,r)=>qo(t,typeof e!="symbol"?e+"":e,r);var Xn=Lr((yl,Kn)=>{var Tt=1e3,Et=Tt*60,Ct=Et*60,_t=Ct*24,Yo=_t*7,Vo=_t*365.25;Kn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Zo(t);if(r==="number"&&isFinite(t))return e.long?Xo(t):Ko(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Zo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Vo;case"weeks":case"week":case"w":return r*Yo;case"days":case"day":case"d":return r*_t;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Ct;case"minutes":case"minute":case"mins":case"min":case"m":return r*Et;case"seconds":case"second":case"secs":case"sec":case"s":return r*Tt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ko(t){var e=Math.abs(t);return e>=_t?Math.round(t/_t)+"d":e>=Ct?Math.round(t/Ct)+"h":e>=Et?Math.round(t/Et)+"m":e>=Tt?Math.round(t/Tt)+"s":t+"ms"}function Xo(t){var e=Math.abs(t);return e>=_t?or(t,e,_t,"day"):e>=Ct?or(t,e,Ct,"hour"):e>=Et?or(t,e,Et,"minute"):e>=Tt?or(t,e,Tt,"second"):t+" ms"}function or(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Jn=Lr((wl,Qn)=>{function Qo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Xn(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let b=0;b<u.length;b++)h=(h<<5)-h+u.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,b=null,x,y;function C(...N){if(!C.enabled)return;let M=C,F=Number(new Date),z=F-(h||F);M.diff=z,M.prev=h,M.curr=F,h=F,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let I=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(w,$)=>{if(w==="%%")return"%";I++;let v=r.formatters[$];if(typeof v=="function"){let q=N[I];w=v.call(M,q),N.splice(I,1),I--}return w}),r.formatArgs.call(M,N),(M.log||r.log).apply(M,N)}return C.namespace=u,C.useColors=r.useColors(),C.color=r.selectColor(u),C.extend=n,C.destroy=r.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(x!==r.namespaces&&(x=r.namespaces,y=r.enabled(u)),y),set:N=>{b=N}}),typeof r.init=="function"&&r.init(C),C}function n(u,h){let b=r(this.namespace+(typeof h>"u"?":":h)+u);return b.log=this.log,b}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(u,h){let b=0,x=0,y=-1,C=0;for(;b<u.length;)if(x<h.length&&(h[x]===u[b]||h[x]==="*"))h[x]==="*"?(y=x,C=b,x++):(b++,x++);else if(y!==-1)x=y+1,C++,b=C;else return!1;for(;x<h.length&&h[x]==="*";)x++;return x===h.length}function i(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(o(u,h))return!1;for(let h of r.names)if(o(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Qn.exports=Qo});var es=Lr((je,ir)=>{je.formatArgs=ei;je.save=ti;je.load=ri;je.useColors=Jo;je.storage=ni();je.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();je.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Jo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ei(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+ir.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}je.log=console.debug||console.log||(()=>{});function ti(t){try{t?je.storage.setItem("debug",t):je.storage.removeItem("debug")}catch{}}function ri(){let t;try{t=je.storage.getItem("debug")||je.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ni(){try{return localStorage}catch{}}ir.exports=Jn()(je);var{formatters:si}=ir.exports;si.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Nt=globalThis,nr=Nt.trustedTypes,Nn=nr?nr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Un="$lit$",dt=`lit$${Math.random().toFixed(9).slice(2)}$`,Hn="?"+dt,Ho=`<${Hn}>`,gt=document,Pt=()=>gt.createComment(""),Ft=t=>t===null||typeof t!="object"&&typeof t!="function",Fr=Array.isArray,Wo=t=>Fr(t)||typeof t?.[Symbol.iterator]=="function",Ir=`[ 	
\f\r]`,Mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pn=/-->/g,Fn=/>/g,ht=RegExp(`>|${Ir}(?:([^\\s"'>=/]+)(${Ir}*=${Ir}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bn=/'/g,qn=/"/g,Wn=/^(?:script|style|textarea|title)$/i,Br=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=Br(1),fl=Br(2),hl=Br(3),bt=Symbol.for("lit-noChange"),$e=Symbol.for("lit-nothing"),zn=new WeakMap,mt=gt.createTreeWalker(gt,129);function Gn(t,e){if(!Fr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nn!==void 0?Nn.createHTML(e):e}var Go=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Mt;for(let l=0;l<r;l++){let a=t[l],c,u,h=-1,b=0;for(;b<a.length&&(i.lastIndex=b,u=i.exec(a),u!==null);)b=i.lastIndex,i===Mt?u[1]==="!--"?i=Pn:u[1]!==void 0?i=Fn:u[2]!==void 0?(Wn.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=ht):u[3]!==void 0&&(i=ht):i===ht?u[0]===">"?(i=s??Mt,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,c=u[1],i=u[3]===void 0?ht:u[3]==='"'?qn:Bn):i===qn||i===Bn?i=ht:i===Pn||i===Fn?i=Mt:(i=ht,s=void 0);let x=i===ht&&t[l+1].startsWith("/>")?" ":"";o+=i===Mt?a+Ho:h>=0?(n.push(c),a.slice(0,h)+Un+a.slice(h)+dt+x):a+dt+(h===-2?l:x)}return[Gn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Bt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,u]=Go(e,r);if(this.el=t.createElement(c,n),mt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=mt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Un)){let b=u[i++],x=s.getAttribute(h).split(dt),y=/([.?@])?(.*)/.exec(b);a.push({type:1,index:o,name:y[2],strings:x,ctor:y[1]==="."?Or:y[1]==="?"?Mr:y[1]==="@"?Nr:At}),s.removeAttribute(h)}else h.startsWith(dt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Wn.test(s.tagName)){let h=s.textContent.split(dt),b=h.length-1;if(b>0){s.textContent=nr?nr.emptyScript:"";for(let x=0;x<b;x++)s.append(h[x],Pt()),mt.nextNode(),a.push({type:2,index:++o});s.append(h[b],Pt())}}}else if(s.nodeType===8)if(s.data===Hn)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(dt,h+1))!==-1;)a.push({type:7,index:o}),h+=dt.length-1}o++}}static createElement(e,r){let n=gt.createElement("template");return n.innerHTML=e,n}};function St(t,e,r=t,n){if(e===bt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Ft(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=St(t,s._$AS(t,e.values),s,n)),e}var Dr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??gt).importNode(r,!0);mt.currentNode=s;let o=mt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new qt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Pr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=mt.nextNode(),i++)}return mt.currentNode=gt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},qt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=$e,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=St(this,e,r),Ft(e)?e===$e||e==null||e===""?(this._$AH!==$e&&this._$AR(),this._$AH=$e):e!==this._$AH&&e!==bt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Wo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==$e&&Ft(this._$AH)?this._$AA.nextSibling.data=e:this.T(gt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Bt.createElement(Gn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Dr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=zn.get(e.strings);return r===void 0&&zn.set(e.strings,r=new Bt(e)),r}k(e){Fr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Pt()),this.O(Pt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},At=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=$e,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=$e}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=St(this,e,r,0),i=!Ft(e)||e!==this._$AH&&e!==bt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=St(this,l[n+a],r,a),c===bt&&(c=this._$AH[a]),i||(i=!Ft(c)||c!==this._$AH[a]),c===$e?e=$e:e!==$e&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===$e?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Or=class extends At{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$e?void 0:e}},Mr=class extends At{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==$e)}},Nr=class extends At{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=St(this,e,r,0)??$e)===bt)return;let n=this._$AH,s=e===$e&&n!==$e||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==$e&&(n===$e||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Pr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){St(this,e)}};var jo=Nt.litHtmlPolyfillSupport;jo?.(Bt,qt),(Nt.litHtmlVersions??(Nt.litHtmlVersions=[])).push("3.3.1");var ue=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new qt(e.insertBefore(Pt(),o),o,void 0,r??{})}return s._$AI(t),s};var sr="today",jn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function qr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Yn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Vn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Zn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ts=Uo(es(),1);function ke(t){return(0,ts.default)(`beads-ui:${t}`)}function et(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function zt(t,e){let r=et(t.created_at),n=et(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ss(t,e){let r=et(t.created_at),n=et(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function os(t,e){let r=et(t.updated_at),n=et(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function is(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=et(t.created_at),o=et(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function as(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var oi=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function rs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ns(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=oi.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ls(t,e){let r=rs(t),n=rs(e);if(r!==n)return r<n?-1:1;let s=ns(t),o=ns(e);if(s!==o)return s<o?-1:1;let i=et(t&&t.created_at),l=et(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var zr=2**20;function Rt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-et(t&&t.created_at)}function ar(t){return(e,r)=>{let n=Rt(e,t),s=Rt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Ur(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Rt(l,r)-zr};if(!l)return{rank:Rt(i,r)+zr};let a=Rt(i,r),c=Rt(l,r),u=(a+c)/2;return a<u&&u<c?{rank:u}:{renormalize:n.map((h,b)=>({bead_id:h.id,rank:b*zr}))}}function Hr(t,e={}){let r=ke(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||zt;function c(){for(let b of Array.from(i))try{b()}catch{}}function u(){s=Array.from(n.values()).sort(a)}function h(b){if(l||!b||b.id!==t)return;let x=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,x),!(x<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(x<=o)return;n.clear();let y=Array.isArray(b.issues)?b.issues:[];for(let C of y)C&&typeof C.id=="string"&&C.id.length>0&&n.set(C.id,C);u(),o=x,c();return}if(b.type==="upsert"){let y=b.issue;if(y&&typeof y.id=="string"&&y.id.length>0){let C=n.get(y.id);if(!C)n.set(y.id,y);else{let N=Number.isFinite(C.updated_at)?C.updated_at:0,M=Number.isFinite(y.updated_at)?y.updated_at:0;if(N<=M){for(let F of Object.keys(C))F in y||delete C[F];for(let[F,z]of Object.entries(y))C[F]=z}}u()}o=x,c()}else if(b.type==="delete"){let y=String(b.issue_id||"");y&&(n.delete(y),u()),o=x,c()}}}return{id:t,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function lr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function cs(t){let e=ke("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let x of Array.from(c)){let y=r.get(x);if(!y)continue;let C=y.itemsById;for(let N of u)typeof N=="string"&&N.length>0&&C.set(N,!0);for(let N of h)typeof N=="string"&&N.length>0&&C.set(N,!0);for(let N of b)typeof N=="string"&&N.length>0&&C.delete(N)}}async function o(l,a){let c=lr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let u=n.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let b=r.get(l)||null;if(b){let x=n.get(b.key);x&&(x.delete(l),x.size===0&&n.delete(b.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:lr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function ds(){let t=ke("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,u){let h=c?lr(c):"",b=r.get(a)||"",x=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),x&&b&&h&&b!==h){let y=e.get(a);if(y)try{y.dispose()}catch{}let C=s.get(a);if(C){try{C()}catch{}s.delete(a)}let N=Hr(a,u);e.set(a,N);let M=N.subscribe(()=>o());s.set(a,M)}else if(!x){let y=Hr(a,u);e.set(a,y);let C=y.subscribe(()=>o());s.set(a,C)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function us(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ps(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Wr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function ii(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ai(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function fs(t){let e=ke("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ii(n),i=ai(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Wr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Wr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var li=Object.freeze({workspace_config:{default_workspace:null}});function hs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:li.workspace_config.default_workspace}}}function ms(t={}){let e=ke("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:hs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?hs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,u)=>c!==r.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function gs(t){let e=ke("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,b)=>{let x=s++,y=Date.now();n.set(x,{type:h,start_ts:y}),e("request start id=%d type=%s count=%d",x,h,r+1),i();let C=!1,N=()=>{C||(C=!0,n.delete(x),l())},M=setTimeout(()=>{C||(e("request TIMEOUT id=%d type=%s elapsed=%dms",x,h,Date.now()-y),N())},3e4);try{let F=await c(h,b),z=Date.now()-y;return e("request done id=%d type=%s elapsed=%dms",x,h,z),F}catch(F){let z=Date.now()-y;throw e("request error id=%d type=%s elapsed=%dms err=%o",x,h,z,F),F}finally{clearTimeout(M),N()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:c-h.start_ts}))}}}function K(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function cr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(as),a;switch(l){case"created_desc":return a.sort(zt),a;case"created_asc":return a.sort(ss),a;case"updated_desc":return a.sort(os),a;case"priority":return a.sort(is),a;case"manual":default:{let c=r();return c?a.sort(ar(c)):a.sort(zt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function dr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},u=n(Ur(l,a,c.order),i);s(c,u);let h=await e("ui-order-set",{expected_revision:c.revision,entries:u});if(h&&h.conflict){let b={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(b);let x=n(Ur(l,a,b.order),i);s(b,x);let y=await e("ui-order-set",{expected_revision:b.revision,entries:x});y&&y.applied&&r.set({revision:typeof y.revision=="number"?y.revision:0,order:y.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function ur(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Gr(t,e){return!e||typeof t!="string"||t.length===0||ur(e.visible_labels).includes(t)?!0:ur(e.hidden_labels).includes(t)?!1:!ur(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function bs(t,e){return ur(t).filter(r=>Gr(r,e))}function yt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function jr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Lt(t){let e=jr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Yr(t,e){let r=jr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var ci={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},di={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},ui={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},pi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function fi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function hi(t,e,r){let n=ci[t]||t,s=e&&e.state||"empty",o=pi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return p`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${di[t]||t}
      </div>
    </div>
  `}function pr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=ui[r],s=t.stages,o=fi(n,s,String(e||"open"));return p`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>hi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function mi(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var _s=2;function gi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(p`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,_s).join(", "),s=r.length-_s,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(p`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function bi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&yt(r,"route")){let o=n.route_source==="derived";s.push(p`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&yt(r,"fast_track")&&s.push(p`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&yt(r,"pr")){let o=n.pr.number;s.push(p`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of bs(t.labels,r))s.push(p`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&yt(r,"from")&&s.push(p`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),yt(r,"blocked")&&s.push(...gi(t.blocked_info)),s.length===0?"":p`<div class="board-card__chips">${s}</div>`}function _i(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function yi(t){let e=Yr(t.created_at),r=Yr(t.updated_at);return!e&&!r?"":p`<span class="board-card__times">
    ${e?p`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Lt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?p`<span class="board-card__time-sep">·</span>`:""}
    ${r?p`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Lt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function wi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(ls):r.children;return p`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?p`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:p`<span class="board-card__roll-none">children 없음</span>`}
        ${yi(t)}
      </div>
      ${n>0&&r.current?p`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?p`<div class="board-card__roll-list">
            ${o.map((i,l)=>p`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${_i(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function ys(t,e){let r=mi(t.priority);return p`
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
        ${r?p`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${bi(t,e)}
      ${t.workflow&&yt(e.policy||null,"stepper")?pr(t.workflow,t.status):""}
      ${wi(t,e)}
    </article>
  `}function wt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return p`
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
        ${n?p`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${jn.map(o=>p`<option
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
        ${t.items.map(o=>ys(o,e))}
      </div>
    </section>
  `}var ki=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],vi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],$i=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function xi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return p`
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
      ${r.label_menu_open?p`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?p`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>p`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?p`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ws(t,e,r){return p`
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
        ${ki.map(n=>p`<option
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
        ${vi.map(n=>p`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${xi(t,e,r)}
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
        ${$i.map(n=>p`<option
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
  `}var Si=200,Ai={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ti=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),ks="beads-ui.board.sort",vs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ei(){try{let t=window.localStorage.getItem(ks);if(t&&vs.has(t))return t}catch{}return"created_desc"}function $s(t,e){let r=ke("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,u=e.closedRange||sr,h=s?cr(s,i):null,b=dr({transport:o,uiOrderStore:i}),x=[],y=[],C=[],N=[],M=[],F=[],z=!1,I=0,k=Ei(),w=new Map,$=new Map,v=new Map,q=new Set,Y={search:"",priority:"",type:"",labels:[]},Q=!1,J=null;function Ie(T){return String(T.status||"open")==="open"}function Be(T){let D=String(T.status||"open");return D==="open"||D==="blocked"}function Ae(T){let D=Y.search.trim().toLowerCase(),V=Y.priority,W=Y.type,P=Y.labels;return T.filter(m=>{if(D){let E=String(m.id||"").toLowerCase(),A=String(m.title||"").toLowerCase();if(!E.includes(D)&&!A.includes(D))return!1}if(V!==""&&String(m.priority)!==V||W!==""&&String(m.issue_type||"")!==W)return!1;if(P.length>0){let E=Array.isArray(m.labels)?m.labels:[];if(!P.some(A=>E.includes(A)))return!1}return!0})}function Ze(){let T=new Set;for(let D of[x,y,C,N,M,F])for(let V of D){let W=Array.isArray(V.labels)?V.labels:[];for(let P of W)typeof P=="string"&&P.length>0&&T.add(P)}return Array.from(T).sort()}function We(){return Y.search.trim()!==""||Y.priority!==""||Y.type!==""||Y.labels.length>0}function ve(){try{if(h){let T=h.selectBoardColumn("tab:board:in-progress","in_progress",k),D=h.selectBoardColumn("tab:board:blocked","blocked",k).filter(Be),V=new Set(T.map(H=>H.id)),W=h.selectBoardColumn("tab:board:ready","ready",k).filter(H=>Ie(H)&&!V.has(H.id)),P=h.selectBoardColumn("tab:board:resolved","resolved",k),m=h.selectBoardColumn("tab:board:deferred","deferred",k),E=z?m:[],A=h.selectBoardColumn("tab:board:closed","closed").slice(0,Si),R=[...D,...W,...T,...P,...E,...A];Te(R);let X=new Set;for(let H of R)H&&H.id&&!Vr(H)&&X.add(H.id);let le=!We();x=le?It(D,X):D,y=le?It(W,X):W,C=le?It(T,X):T,N=le?It(P,X):P,M=le?It(E,X):E,I=m.length,F=le?It(A,X):A,w=new Map;for(let H of x)w.set(H.id,"open");for(let H of y)w.set(H.id,"open");for(let H of C)w.set(H.id,"in_progress");for(let H of N)w.set(H.id,"resolved");for(let H of M)w.set(H.id,"deferred");for(let H of F)w.set(H.id,"closed");$=new Map;for(let H of x)$.set(H.id,"blocked-col");for(let H of y)$.set(H.id,"ready-col");for(let H of C)$.set(H.id,"in-progress-col");for(let H of N)$.set(H.id,"resolved-col");for(let H of M)$.set(H.id,"deferred-col");for(let H of F)$.set(H.id,"closed-col")}se()}catch{x=[],y=[],C=[],N=[],M=[],F=[],v=new Map,se()}}function Te(T){let D=new Map;for(let W of T)W&&W.id&&!D.has(W.id)&&D.set(W.id,W);let V=new Map;for(let W of D.values()){let P=Vr(W);if(!P)continue;let m=V.get(P);m||(m=[],V.set(P,m)),m.push({id:W.id,title:W.title,status:W.status,metadata:W.metadata,created_at:W.created_at})}v=V}function xe(T){let D=v.get(T)||[],V=0,W=null;for(let P of D)(P.status==="resolved"||P.status==="closed")&&(V+=1),!W&&P.status==="in_progress"&&(W=P);return{total:D.length,count:V,current:W,children:D}}function pe(T){return!q.has(T)}function Qe(T,D){T.preventDefault(),T.stopPropagation(),q.has(D)?q.delete(D):q.add(D),se()}function fe(T,D){T.preventDefault(),T.stopPropagation(),n(D)}function Ye(T,D){T.preventDefault(),T.stopPropagation(),n(D)}function ie(T,D){J||n(D)}function Me(T,D){T.preventDefault(),T.stopPropagation(),Ci(D).then(V=>{V&&K("\uBCF5\uC0AC\uB428","success",1200)})}function Ve(T,D){J=D,T.dataTransfer&&(T.dataTransfer.setData("text/plain",D),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function Ce(T){T.target.classList.remove("board-card--dragging"),Je(),setTimeout(()=>{J=null},0)}function De(T){let D=String(T.target.value||"");!D||D===u||(u=D,a&&a(D),se())}let ye={onCardClick:ie,onCopyId:Me,onDragStart:Ve,onDragEnd:Ce,onClosedRangeChange:De,rollupFor:xe,isExpanded:pe,onRollupToggle:Qe,onChildClick:fe,onFromChipClick:Ye,get policy(){return l?l.get():null}};function _(T){let D=T.target,V=t.querySelector(".board-filter__labels");D&&V&&V.contains(D)||ne()}function S(T){T.key==="Escape"&&ne()}function U(){Q||(Q=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",S),se())}function ne(){Q&&(Q=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",S),se())}let de={onSearchInput(T){Y.search=String(T.target.value||""),ve()},onPriorityChange(T){Y.priority=String(T.target.value||""),ve()},onTypeChange(T){Y.type=String(T.target.value||""),ve()},onSortChange(T){let D=String(T.target.value||"");if(!(!vs.has(D)||D===k)){k=D;try{window.localStorage.setItem(ks,D)}catch{}ve()}},onDeferredToggle(){z=!z,ve()},onLabelMenuToggle(){Q?ne():U()},onLabelToggle(T){let D=Y.labels.indexOf(T);D===-1?Y.labels.push(T):Y.labels.splice(D,1),ve()},onLabelClear(){Y.labels.length!==0&&(Y.labels=[],ve())},onNewIssue(){c&&c()}};function ge(){let T=z?"board-root board-root--deferred":"board-root";return p`
      <div class="board-view">
        ${ws(Y,de,{sort_mode:k,show_deferred:z,deferred_count:I,label_options:Ze(),label_menu_open:Q})}
        <div class=${T}>
          ${wt({title:"Blocked",id:"blocked-col",items:Ae(x)},ye)}
          ${wt({title:"Ready",id:"ready-col",items:Ae(y)},ye)}
          ${wt({title:"In progress",id:"in-progress-col",items:Ae(C)},ye)}
          ${wt({title:"Resolved",id:"resolved-col",items:Ae(N)},ye)}
          ${z?wt({title:"Deferred",id:"deferred-col",items:Ae(M)},ye):""}
          ${wt({title:"Closed",id:"closed-col",items:Ae(F),is_closed:!0,closed_range:u},ye)}
        </div>
      </div>
    `}function se(){ue(ge(),t),ee()}function ee(){try{let T=Array.from(t.querySelectorAll(".board-column"));for(let D of T)Array.from(D.querySelectorAll(".board-card")).forEach((W,P)=>{W.tabIndex=P===0?0:-1})}catch{}}async function oe(T,D){if(!o){K("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:D}),K("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(V){r("update-status failed: %o",V),K("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ne(T){switch(T){case"blocked-col":return x;case"ready-col":return y;case"in-progress-col":return C;case"resolved-col":return N;case"deferred-col":return M;default:return[]}}function Ke(T,D,V){if(!o||!i)return;let W=Ne(T),P=W.find(X=>X.id===D);if(!P)return;let m=W.filter(X=>X.id!==D),E=V.closest?V.closest(".board-card"):null,A=m.length;if(E){let X=E.getAttribute("data-issue-id");if(X===D)return;let le=m.findIndex(H=>H.id===X);le>=0&&(A=le)}let R=m.slice();R.splice(A,0,P),b.applyReorder(D,R,A)}function Je(){for(let T of Array.from(t.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let be=null;t.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let V=T.target.closest(".board-column");V&&V!==be&&(be&&be.classList.remove("board-column--drag-over"),V.classList.add("board-column--drag-over"),be=V)}),t.addEventListener("dragleave",T=>{let D=T.relatedTarget;(!D||!t.contains(D))&&be&&(be.classList.remove("board-column--drag-over"),be=null)}),t.addEventListener("drop",T=>{T.preventDefault(),be&&(be.classList.remove("board-column--drag-over"),be=null);let D=T.target,V=D.closest(".board-column");if(!V)return;let W=T.dataTransfer?.getData("text/plain")||"";if(!W)return;let P=V.id,m=$.get(W);if(m&&m===P){if(Ti.has(P)){if(k!=="manual"){K("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ke(P,W,D)}return}let E=Ai[P];if(!E){K("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}w.get(W)!==E&&oe(W,E)}),t.addEventListener("keydown",T=>{let D=T.target;if(!(D instanceof HTMLElement))return;let V=String(D.tagName||"").toLowerCase();if(V==="input"||V==="textarea"||V==="select"||V==="button"||V==="a"||D.isContentEditable===!0)return;let W=D.closest(".board-card");if(!W)return;let P=String(T.key||"");if(P==="Enter"||P===" "){T.preventDefault();let R=W.getAttribute("data-issue-id");R&&n(R);return}if(P!=="ArrowUp"&&P!=="ArrowDown"&&P!=="ArrowLeft"&&P!=="ArrowRight")return;T.preventDefault();let m=W.closest(".board-column");if(!m)return;let E=Array.from(m.querySelectorAll(".board-card")),A=E.indexOf(W);if(P==="ArrowDown"&&A<E.length-1){Ee(W,E[A+1]);return}if(P==="ArrowUp"&&A>0){Ee(W,E[A-1]);return}if(P==="ArrowLeft"||P==="ArrowRight"){let R=Array.from(t.querySelectorAll(".board-column")),X=R.indexOf(m),le=P==="ArrowRight"?1:-1,H=X+le;for(;H>=0&&H<R.length;){let O=R[H].querySelector(".board-card");if(O){Ee(W,O);return}H+=le}}});function Ee(T,D){try{T.tabIndex=-1,D.tabIndex=0,D.focus()}catch{}}let Re=null;h&&h.subscribe&&(Re=h.subscribe(()=>{try{ve()}catch{}}));let Le=null;return l&&l.subscribe&&(Le=l.subscribe(()=>{try{ve()}catch{}})),{async load(){r("load"),ve()},clear(){ne(),Re&&(Re(),Re=null),Le&&(Le(),Le=null),t.replaceChildren(),x=[],y=[],C=[],N=[],M=[],F=[],w=new Map,$=new Map}}}function Vr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function It(t,e){return t.filter(r=>{let n=Vr(r);return!(n&&e.has(n))})}async function Ci(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Dt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ri={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Li=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ii=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ut(t){return!!t&&typeof t=="object"}function Zr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function xs(t,e){let r=Zr(t),n=Zr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Di(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ut(s)&&typeof s.text=="string"?s.text:"").join(""):ut(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Oi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ri[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Zr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=xs(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=xs(ut(l)?l.old_string:"",ut(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ss(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Li.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Ii.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Mi(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ut(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ss(o.text));else if(o.type==="tool_use"){let i=Oi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ut(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Di(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ni(t){if(t.type==="item.completed"&&ut(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Ss(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Pi(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function As(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ut(o))continue;let i=Pi(o)?Ni(o):Mi(o,r);for(let l of i)e.push(l)}return e}function fr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function u(){if(!o||!n)return[];let $=n.get(o);return As($?$.lines:[])}function h($,v){if(v.kind==="gate")return p`<div class="sv__gate">${v.text}</div>`;if(v.kind==="phase")return p`<div class="sv__phase">${v.text}</div>`;if(v.kind==="result")return p`<div
        class="sv__result${v.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${v.success?"\u2713":"\u2717"}
        ${v.text||(v.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(v.kind==="error")return p`<div class="sv__error">⛔ ${v.text}</div>`;if(v.kind==="blocker")return p`<div class="sv__error">⛔ ${v.text}</div>`;if(v.kind==="tool"){let q=a.has($),Y=v.tool==="Bash"?v.command:v.path||v.command||"";return p`<div
        class="sv__tool${q?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>N($)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${v.icon}</span>
          <span class="sv__tool-name">${v.tool}</span>
          ${Y?p`<span class="sv__tool-detail">${Y}</span>`:""}
          ${typeof v.added=="number"?p`<span class="sv__diff-add">+${v.added}</span>`:""}
          ${typeof v.removed=="number"?p`<span class="sv__diff-del">−${v.removed}</span>`:""}
          ${v.result?p`<span class="sv__tool-ok">→ ${v.result}</span>`:""}
        </span>
        ${q?p`<pre class="sv__tool-expand">${b(v)}</pre>`:""}
      </div>`}return p`<div class="sv__as">${v.text}</div>`}function b($){let v=[];if($.input!==void 0)try{v.push(`input: ${JSON.stringify($.input,null,2)}`)}catch{}return typeof $.output=="string"&&$.output.length>0&&v.push(`output:
${$.output}`),v.join(`

`)}function x(){if(!o)return p``;let $=u(),v=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),q=i.session_id||"",Y=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return p`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${q?p`<button
              type="button"
              class="sv__session"
              title=${q}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${q}`}
              @click=${()=>F(q)}
            >
              ⧉ ${q.slice(0,8)}
            </button>`:""}
        ${v?p`<span class="sv__meta">${v}</span>`:""}
        ${i.worktree?p`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Y}
          @click=${M}
        >
          <span class="sv__follow-full">⇣ ${Y}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>w()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${$.length===0?p`<div class="sv__empty">세션 로그 없음</div>`:$.map((Q,J)=>h(J,Q))}
      </div>
    </div>`}function y(){ue(x(),t),l&&C()}function C(){let $=t.querySelector(".sv__body");$&&($.scrollTop=$.scrollHeight)}function N($){a.has($)?a.delete($):a.add($),y()}function M(){l=!l,y()}function F($){Dt($).then(v=>{v?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function z($){!o||!$||(i={...i,...$},y())}function I($){let v=$.target;if(!v||!v.classList||!v.classList.contains("sv__body"))return;!(v.scrollHeight-v.scrollTop-v.clientHeight<=4)&&l&&(l=!1,y())}t.addEventListener("scroll",I,!0);function k($){let v=$&&$.attempt_id;v&&(o=v,i=$.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(y)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),y())}function w(){let $=o;o=null,a.clear(),r&&$&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${$}`})).catch(()=>{}),ue(p``,t),s&&s()}return{open:k,updateMeta:z,close:w,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",I,!0),o=null,ue(p``,t)}}}function Fi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ts(t,e){let r=Fi(t);return p`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?p`<div class="detail-empty">산출물 없음</div>`:p`
          ${r.map(n=>p`<div class="detail-art">
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
  `}var Kr=["opus","sonnet","haiku","fable"],Xr=["low","medium","high","xhigh"],Qr=["codex","opus","fable","self","skip"],Jr=["opus","fable","sonnet","haiku"],Bi=["standard","fast_track"],en={orchestration_model:"(\uAE30\uBCF8: CLI \uAE30\uBCF8 \uBAA8\uB378)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function hr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:en[t]||"(\uAE30\uBCF8)"}function Ut(t,e,r,n,s,o){return p`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>p`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function Ht(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Es(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return p`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Ut("orchestration_model","orchestration_model",Ht(Kr,hr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${Ut("orchestration_effort","orchestration_effort",Ht(Xr,hr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${Ut("review_model","review_model",Ht(Qr,hr("review_model",s)),n.review_model||"",!1,e)}
    ${Ut("impl_model","impl_model",Ht(Jr,hr("impl_model",s)),n.impl_model||"",!1,e)}
    ${Ut("workflow_mode","workflow_mode",Ht(Bi),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Ps,setPrototypeOf:Cs,isFrozen:qi,getPrototypeOf:zi,getOwnPropertyDescriptor:Ui}=Object,{freeze:ze,seal:Xe,create:ln}=Object,{apply:cn,construct:dn}=typeof Reflect<"u"&&Reflect;ze||(ze=function(e){return e});Xe||(Xe=function(e){return e});cn||(cn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});dn||(dn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var mr=Ue(Array.prototype.forEach),Hi=Ue(Array.prototype.lastIndexOf),Rs=Ue(Array.prototype.pop),Wt=Ue(Array.prototype.push),Wi=Ue(Array.prototype.splice),br=Ue(String.prototype.toLowerCase),tn=Ue(String.prototype.toString),rn=Ue(String.prototype.match),Gt=Ue(String.prototype.replace),Gi=Ue(String.prototype.indexOf),ji=Ue(String.prototype.trim),tt=Ue(Object.prototype.hasOwnProperty),qe=Ue(RegExp.prototype.test),jt=Yi(TypeError);function Ue(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return cn(t,e,n)}}function Yi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return dn(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:br;Cs&&Cs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(qi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Vi(t){for(let e=0;e<t.length;e++)tt(t,e)||(t[e]=null);return t}function lt(t){let e=ln(null);for(let[r,n]of Ps(t))tt(t,r)&&(Array.isArray(n)?e[r]=Vi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=lt(n):e[r]=n);return e}function Yt(t,e){for(;t!==null;){let n=Ui(t,e);if(n){if(n.get)return Ue(n.get);if(typeof n.value=="function")return Ue(n.value)}t=zi(t)}function r(){return null}return r}var Ls=ze(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),nn=ze(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),sn=ze(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Zi=ze(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),on=ze(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ki=ze(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Is=ze(["#text"]),Ds=ze(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),an=ze(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Os=ze(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),gr=ze(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Xi=Xe(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Qi=Xe(/<%[\w\W]*|[\w\W]*%>/gm),Ji=Xe(/\$\{[\w\W]*/gm),ea=Xe(/^data-[\-\w.\u00B7-\uFFFF]+$/),ta=Xe(/^aria-[\-\w]+$/),Fs=Xe(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ra=Xe(/^(?:\w+script|data):/i),na=Xe(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Bs=Xe(/^html$/i),sa=Xe(/^[a-z][.\w]*(-[.\w]+)+$/i),Ms=Object.freeze({__proto__:null,ARIA_ATTR:ta,ATTR_WHITESPACE:na,CUSTOM_ELEMENT:sa,DATA_ATTR:ea,DOCTYPE_NAME:Bs,ERB_EXPR:Qi,IS_ALLOWED_URI:Fs,IS_SCRIPT_OR_DATA:ra,MUSTACHE_EXPR:Xi,TMPLIT_EXPR:Ji}),Vt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},oa=function(){return typeof window>"u"?null:window},ia=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ns=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:oa(),e=G=>qs(G);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Vt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:x}=t,y=a.prototype,C=Yt(y,"cloneNode"),N=Yt(y,"remove"),M=Yt(y,"nextSibling"),F=Yt(y,"childNodes"),z=Yt(y,"parentNode");if(typeof i=="function"){let G=r.createElement("template");G.content&&G.content.ownerDocument&&(r=G.content.ownerDocument)}let I,k="",{implementation:w,createNodeIterator:$,createDocumentFragment:v,getElementsByTagName:q}=r,{importNode:Y}=n,Q=Ns();e.isSupported=typeof Ps=="function"&&typeof z=="function"&&w&&w.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:J,ERB_EXPR:Ie,TMPLIT_EXPR:Be,DATA_ATTR:Ae,ARIA_ATTR:Ze,IS_SCRIPT_OR_DATA:We,ATTR_WHITESPACE:ve,CUSTOM_ELEMENT:Te}=Ms,{IS_ALLOWED_URI:xe}=Ms,pe=null,Qe=re({},[...Ls,...nn,...sn,...on,...Is]),fe=null,Ye=re({},[...Ds,...an,...Os,...gr]),ie=Object.seal(ln(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Me=null,Ve=null,Ce=Object.seal(ln(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),De=!0,ye=!0,_=!1,S=!0,U=!1,ne=!0,de=!1,ge=!1,se=!1,ee=!1,oe=!1,Ne=!1,Ke=!0,Je=!1,be="user-content-",Ee=!0,Re=!1,Le={},T=null,D=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),V=null,W=re({},["audio","video","img","source","image","track"]),P=null,m=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),E="http://www.w3.org/1998/Math/MathML",A="http://www.w3.org/2000/svg",R="http://www.w3.org/1999/xhtml",X=R,le=!1,H=null,O=re({},[E,A,R],tn),me=re({},["mi","mo","mn","ms","mtext"]),Pe=re({},["annotation-xml"]),$t=re({},["title","style","font","a","script"]),ot=null,Ot=["application/xhtml+xml","text/html"],tr="text/html",f=null,g=null,Z=r.createElement("form"),j=function(d){return d instanceof RegExp||d instanceof Function},te=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(g&&g===d)){if((!d||typeof d!="object")&&(d={}),d=lt(d),ot=Ot.indexOf(d.PARSER_MEDIA_TYPE)===-1?tr:d.PARSER_MEDIA_TYPE,f=ot==="application/xhtml+xml"?tn:br,pe=tt(d,"ALLOWED_TAGS")?re({},d.ALLOWED_TAGS,f):Qe,fe=tt(d,"ALLOWED_ATTR")?re({},d.ALLOWED_ATTR,f):Ye,H=tt(d,"ALLOWED_NAMESPACES")?re({},d.ALLOWED_NAMESPACES,tn):O,P=tt(d,"ADD_URI_SAFE_ATTR")?re(lt(m),d.ADD_URI_SAFE_ATTR,f):m,V=tt(d,"ADD_DATA_URI_TAGS")?re(lt(W),d.ADD_DATA_URI_TAGS,f):W,T=tt(d,"FORBID_CONTENTS")?re({},d.FORBID_CONTENTS,f):D,Me=tt(d,"FORBID_TAGS")?re({},d.FORBID_TAGS,f):lt({}),Ve=tt(d,"FORBID_ATTR")?re({},d.FORBID_ATTR,f):lt({}),Le=tt(d,"USE_PROFILES")?d.USE_PROFILES:!1,De=d.ALLOW_ARIA_ATTR!==!1,ye=d.ALLOW_DATA_ATTR!==!1,_=d.ALLOW_UNKNOWN_PROTOCOLS||!1,S=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,U=d.SAFE_FOR_TEMPLATES||!1,ne=d.SAFE_FOR_XML!==!1,de=d.WHOLE_DOCUMENT||!1,ee=d.RETURN_DOM||!1,oe=d.RETURN_DOM_FRAGMENT||!1,Ne=d.RETURN_TRUSTED_TYPE||!1,se=d.FORCE_BODY||!1,Ke=d.SANITIZE_DOM!==!1,Je=d.SANITIZE_NAMED_PROPS||!1,Ee=d.KEEP_CONTENT!==!1,Re=d.IN_PLACE||!1,xe=d.ALLOWED_URI_REGEXP||Fs,X=d.NAMESPACE||R,me=d.MATHML_TEXT_INTEGRATION_POINTS||me,Pe=d.HTML_INTEGRATION_POINTS||Pe,ie=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&j(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ie.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&j(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ie.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),U&&(ye=!1),oe&&(ee=!0),Le&&(pe=re({},Is),fe=[],Le.html===!0&&(re(pe,Ls),re(fe,Ds)),Le.svg===!0&&(re(pe,nn),re(fe,an),re(fe,gr)),Le.svgFilters===!0&&(re(pe,sn),re(fe,an),re(fe,gr)),Le.mathMl===!0&&(re(pe,on),re(fe,Os),re(fe,gr))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?Ce.tagCheck=d.ADD_TAGS:(pe===Qe&&(pe=lt(pe)),re(pe,d.ADD_TAGS,f))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?Ce.attributeCheck=d.ADD_ATTR:(fe===Ye&&(fe=lt(fe)),re(fe,d.ADD_ATTR,f))),d.ADD_URI_SAFE_ATTR&&re(P,d.ADD_URI_SAFE_ATTR,f),d.FORBID_CONTENTS&&(T===D&&(T=lt(T)),re(T,d.FORBID_CONTENTS,f)),Ee&&(pe["#text"]=!0),de&&re(pe,["html","head","body"]),pe.table&&(re(pe,["tbody"]),delete Me.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=d.TRUSTED_TYPES_POLICY,k=I.createHTML("")}else I===void 0&&(I=ia(x,s)),I!==null&&typeof k=="string"&&(k=I.createHTML(""));ze&&ze(d),g=d}},we=re({},[...nn,...sn,...Zi]),rr=re({},[...on,...Ki]),Do=function(d){let L=z(d);(!L||!L.tagName)&&(L={namespaceURI:X,tagName:"template"});let B=br(d.tagName),_e=br(L.tagName);return H[d.namespaceURI]?d.namespaceURI===A?L.namespaceURI===R?B==="svg":L.namespaceURI===E?B==="svg"&&(_e==="annotation-xml"||me[_e]):!!we[B]:d.namespaceURI===E?L.namespaceURI===R?B==="math":L.namespaceURI===A?B==="math"&&Pe[_e]:!!rr[B]:d.namespaceURI===R?L.namespaceURI===A&&!Pe[_e]||L.namespaceURI===E&&!me[_e]?!1:!rr[B]&&($t[B]||!we[B]):!!(ot==="application/xhtml+xml"&&H[d.namespaceURI]):!1},st=function(d){Wt(e.removed,{element:d});try{z(d).removeChild(d)}catch{N(d)}},ft=function(d,L){try{Wt(e.removed,{attribute:L.getAttributeNode(d),from:L})}catch{Wt(e.removed,{attribute:null,from:L})}if(L.removeAttribute(d),d==="is")if(ee||oe)try{st(L)}catch{}else try{L.setAttribute(d,"")}catch{}},Tn=function(d){let L=null,B=null;if(se)d="<remove></remove>"+d;else{let Se=rn(d,/^[\r\n\t ]+/);B=Se&&Se[0]}ot==="application/xhtml+xml"&&X===R&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let _e=I?I.createHTML(d):d;if(X===R)try{L=new b().parseFromString(_e,ot)}catch{}if(!L||!L.documentElement){L=w.createDocument(X,"template",null);try{L.documentElement.innerHTML=le?k:_e}catch{}}let Fe=L.body||L.documentElement;return d&&B&&Fe.insertBefore(r.createTextNode(B),Fe.childNodes[0]||null),X===R?q.call(L,de?"html":"body")[0]:de?L.documentElement:Fe},En=function(d){return $.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Er=function(d){return d instanceof h&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof u)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},Cn=function(d){return typeof l=="function"&&d instanceof l};function it(G,d,L){mr(G,B=>{B.call(e,d,L,g)})}let Rn=function(d){let L=null;if(it(Q.beforeSanitizeElements,d,null),Er(d))return st(d),!0;let B=f(d.nodeName);if(it(Q.uponSanitizeElement,d,{tagName:B,allowedTags:pe}),ne&&d.hasChildNodes()&&!Cn(d.firstElementChild)&&qe(/<[/\w!]/g,d.innerHTML)&&qe(/<[/\w!]/g,d.textContent)||d.nodeType===Vt.progressingInstruction||ne&&d.nodeType===Vt.comment&&qe(/<[/\w]/g,d.data))return st(d),!0;if(!(Ce.tagCheck instanceof Function&&Ce.tagCheck(B))&&(!pe[B]||Me[B])){if(!Me[B]&&In(B)&&(ie.tagNameCheck instanceof RegExp&&qe(ie.tagNameCheck,B)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(B)))return!1;if(Ee&&!T[B]){let _e=z(d)||d.parentNode,Fe=F(d)||d.childNodes;if(Fe&&_e){let Se=Fe.length;for(let Ge=Se-1;Ge>=0;--Ge){let at=C(Fe[Ge],!0);at.__removalCount=(d.__removalCount||0)+1,_e.insertBefore(at,M(d))}}}return st(d),!0}return d instanceof a&&!Do(d)||(B==="noscript"||B==="noembed"||B==="noframes")&&qe(/<\/no(script|embed|frames)/i,d.innerHTML)?(st(d),!0):(U&&d.nodeType===Vt.text&&(L=d.textContent,mr([J,Ie,Be],_e=>{L=Gt(L,_e," ")}),d.textContent!==L&&(Wt(e.removed,{element:d.cloneNode()}),d.textContent=L)),it(Q.afterSanitizeElements,d,null),!1)},Ln=function(d,L,B){if(Ke&&(L==="id"||L==="name")&&(B in r||B in Z))return!1;if(!(ye&&!Ve[L]&&qe(Ae,L))){if(!(De&&qe(Ze,L))){if(!(Ce.attributeCheck instanceof Function&&Ce.attributeCheck(L,d))){if(!fe[L]||Ve[L]){if(!(In(d)&&(ie.tagNameCheck instanceof RegExp&&qe(ie.tagNameCheck,d)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(d))&&(ie.attributeNameCheck instanceof RegExp&&qe(ie.attributeNameCheck,L)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck(L,d))||L==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&qe(ie.tagNameCheck,B)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(B))))return!1}else if(!P[L]){if(!qe(xe,Gt(B,ve,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&d!=="script"&&Gi(B,"data:")===0&&V[d])){if(!(_&&!qe(We,Gt(B,ve,"")))){if(B)return!1}}}}}}}return!0},In=function(d){return d!=="annotation-xml"&&rn(d,Te)},Dn=function(d){it(Q.beforeSanitizeAttributes,d,null);let{attributes:L}=d;if(!L||Er(d))return;let B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},_e=L.length;for(;_e--;){let Fe=L[_e],{name:Se,namespaceURI:Ge,value:at}=Fe,xt=f(Se),Cr=at,Oe=Se==="value"?Cr:ji(Cr);if(B.attrName=xt,B.attrValue=Oe,B.keepAttr=!0,B.forceKeepAttr=void 0,it(Q.uponSanitizeAttribute,d,B),Oe=B.attrValue,Je&&(xt==="id"||xt==="name")&&(ft(Se,d),Oe=be+Oe),ne&&qe(/((--!?|])>)|<\/(style|title|textarea)/i,Oe)){ft(Se,d);continue}if(xt==="attributename"&&rn(Oe,"href")){ft(Se,d);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){ft(Se,d);continue}if(!S&&qe(/\/>/i,Oe)){ft(Se,d);continue}U&&mr([J,Ie,Be],Mn=>{Oe=Gt(Oe,Mn," ")});let On=f(d.nodeName);if(!Ln(On,xt,Oe)){ft(Se,d);continue}if(I&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!Ge)switch(x.getAttributeType(On,xt)){case"TrustedHTML":{Oe=I.createHTML(Oe);break}case"TrustedScriptURL":{Oe=I.createScriptURL(Oe);break}}if(Oe!==Cr)try{Ge?d.setAttributeNS(Ge,Se,Oe):d.setAttribute(Se,Oe),Er(d)?st(d):Rs(e.removed)}catch{ft(Se,d)}}it(Q.afterSanitizeAttributes,d,null)},Oo=function G(d){let L=null,B=En(d);for(it(Q.beforeSanitizeShadowDOM,d,null);L=B.nextNode();)it(Q.uponSanitizeShadowNode,L,null),Rn(L),Dn(L),L.content instanceof o&&G(L.content);it(Q.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(G){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,B=null,_e=null,Fe=null;if(le=!G,le&&(G="<!-->"),typeof G!="string"&&!Cn(G))if(typeof G.toString=="function"){if(G=G.toString(),typeof G!="string")throw jt("dirty is not a string, aborting")}else throw jt("toString is not a function");if(!e.isSupported)return G;if(ge||te(d),e.removed=[],typeof G=="string"&&(Re=!1),Re){if(G.nodeName){let at=f(G.nodeName);if(!pe[at]||Me[at])throw jt("root node is forbidden and cannot be sanitized in-place")}}else if(G instanceof l)L=Tn("<!---->"),B=L.ownerDocument.importNode(G,!0),B.nodeType===Vt.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?L=B:L.appendChild(B);else{if(!ee&&!U&&!de&&G.indexOf("<")===-1)return I&&Ne?I.createHTML(G):G;if(L=Tn(G),!L)return ee?null:Ne?k:""}L&&se&&st(L.firstChild);let Se=En(Re?G:L);for(;_e=Se.nextNode();)Rn(_e),Dn(_e),_e.content instanceof o&&Oo(_e.content);if(Re)return G;if(ee){if(oe)for(Fe=v.call(L.ownerDocument);L.firstChild;)Fe.appendChild(L.firstChild);else Fe=L;return(fe.shadowroot||fe.shadowrootmode)&&(Fe=Y.call(n,Fe,!0)),Fe}let Ge=de?L.outerHTML:L.innerHTML;return de&&pe["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&qe(Bs,L.ownerDocument.doctype.name)&&(Ge="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+Ge),U&&mr([J,Ie,Be],at=>{Ge=Gt(Ge,at," ")}),I&&Ne?I.createHTML(Ge):Ge},e.setConfig=function(){let G=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};te(G),ge=!0},e.clearConfig=function(){g=null,ge=!1},e.isValidAttribute=function(G,d,L){g||te({});let B=f(G),_e=f(d);return Ln(B,_e,L)},e.addHook=function(G,d){typeof d=="function"&&Wt(Q[G],d)},e.removeHook=function(G,d){if(d!==void 0){let L=Hi(Q[G],d);return L===-1?void 0:Wi(Q[G],L,1)[0]}return Rs(Q[G])},e.removeHooks=function(G){Q[G]=[]},e.removeAllHooks=function(){Q=Ns()},e}var zs=qs();var Us={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Hs=t=>(...e)=>({_$litDirective$:t,values:e}),_r=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Zt=class extends _r{constructor(e){if(super(e),this.it=$e,e.type!==Us.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===$e||e==null)return this._t=void 0,this.it=e;if(e===bt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Zt.directiveName="unsafeHTML",Zt.resultType=1;var Ws=Hs(Zt);function hn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var vt=hn();function Xs(t){vt=t}var Jt={exec:()=>null};function ae(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(He.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var aa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),He={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},la=/^(?:[ \t]*(?:\n|$))+/,ca=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,da=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,er=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ua=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,mn=/(?:[*+-]|\d{1,9}[.)])/,Qs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Js=ae(Qs).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),pa=ae(Qs).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),gn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,fa=/^[^\n]+/,bn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ha=ae(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ma=ae(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,mn).getRegex(),xr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",_n=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ga=ae("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",_n).replace("tag",xr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),eo=ae(gn).replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),ba=ae(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",eo).getRegex(),yn={blockquote:ba,code:ca,def:ha,fences:da,heading:ua,hr:er,html:ga,lheading:Js,list:ma,newline:la,paragraph:eo,table:Jt,text:fa},Gs=ae("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),_a={...yn,lheading:pa,table:Gs,paragraph:ae(gn).replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Gs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex()},ya={...yn,html:ae(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",_n).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Jt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ae(gn).replace("hr",er).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Js).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ka=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,to=/^( {2,}|\\)\n(?!\s*$)/,va=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Sr=/[\p{P}\p{S}]/u,wn=/[\s\p{P}\p{S}]/u,ro=/[^\s\p{P}\p{S}]/u,$a=ae(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,wn).getRegex(),no=/(?!~)[\p{P}\p{S}]/u,xa=/(?!~)[\s\p{P}\p{S}]/u,Sa=/(?:[^\s\p{P}\p{S}]|~)/u,Aa=ae(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",aa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),so=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ta=ae(so,"u").replace(/punct/g,Sr).getRegex(),Ea=ae(so,"u").replace(/punct/g,no).getRegex(),oo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ca=ae(oo,"gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,wn).replace(/punct/g,Sr).getRegex(),Ra=ae(oo,"gu").replace(/notPunctSpace/g,Sa).replace(/punctSpace/g,xa).replace(/punct/g,no).getRegex(),La=ae("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,wn).replace(/punct/g,Sr).getRegex(),Ia=ae(/\\(punct)/,"gu").replace(/punct/g,Sr).getRegex(),Da=ae(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Oa=ae(_n).replace("(?:-->|$)","-->").getRegex(),Ma=ae("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Oa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),kr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Na=ae(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",kr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),io=ae(/^!?\[(label)\]\[(ref)\]/).replace("label",kr).replace("ref",bn).getRegex(),ao=ae(/^!?\[(ref)\](?:\[\])?/).replace("ref",bn).getRegex(),Pa=ae("reflink|nolink(?!\\()","g").replace("reflink",io).replace("nolink",ao).getRegex(),js=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,kn={_backpedal:Jt,anyPunctuation:Ia,autolink:Da,blockSkip:Aa,br:to,code:ka,del:Jt,emStrongLDelim:Ta,emStrongRDelimAst:Ca,emStrongRDelimUnd:La,escape:wa,link:Na,nolink:ao,punctuation:$a,reflink:io,reflinkSearch:Pa,tag:Ma,text:va,url:Jt},Fa={...kn,link:ae(/^!?\[(label)\]\((.*?)\)/).replace("label",kr).getRegex(),reflink:ae(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",kr).getRegex()},un={...kn,emStrongRDelimAst:Ra,emStrongLDelim:Ea,url:ae(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",js).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ae(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",js).getRegex()},Ba={...un,br:ae(to).replace("{2,}","*").getRegex(),text:ae(un.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},yr={normal:yn,gfm:_a,pedantic:ya},Kt={normal:kn,gfm:un,breaks:Ba,pedantic:Fa},qa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ys=t=>qa[t];function ct(t,e){if(e){if(He.escapeTest.test(t))return t.replace(He.escapeReplace,Ys)}else if(He.escapeTestNoEncode.test(t))return t.replace(He.escapeReplaceNoEncode,Ys);return t}function Vs(t){try{t=encodeURI(t).replace(He.percentDecode,"%")}catch{return null}return t}function Zs(t,e){let r=t.replace(He.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(He.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(He.slashPipe,"|");return n}function Xt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function za(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ks(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Ua(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var vr=class{constructor(t){he(this,"options");he(this,"rules");he(this,"lexer");this.options=t||vt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Xt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Ua(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Xt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Xt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Xt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=h,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let x=b,y=x.raw+`
`+r.join(`
`),C=this.blockquote(y);o[o.length-1]=C,n=n.substring(0,n.length-x.raw.length)+C.raw,s=s.substring(0,s.length-x.text.length)+C.text;break}else if(b?.type==="list"){let x=b,y=x.raw+`
`+r.join(`
`),C=this.list(y);o[o.length-1]=C,n=n.substring(0,n.length-b.raw.length)+C.raw,s=s.substring(0,s.length-x.raw.length)+C.raw,r=y.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",u="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),b=t.split(`
`,1)[0],x=!h.trim(),y=0;if(this.options.pedantic?(y=2,u=h.trimStart()):x?y=e[1].length+1:(y=e[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,u=h.slice(y),y+=e[1].length),x&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(y),N=this.rules.other.hrRegex(y),M=this.rules.other.fencesBeginRegex(y),F=this.rules.other.headingBeginRegex(y),z=this.rules.other.htmlBeginRegex(y);for(;t;){let I=t.split(`
`,1)[0],k;if(b=I,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),k=b):k=b.replace(this.rules.other.tabCharGlobal,"    "),M.test(b)||F.test(b)||z.test(b)||C.test(b)||N.test(b))break;if(k.search(this.rules.other.nonSpaceChar)>=y||!b.trim())u+=`
`+k.slice(y);else{if(x||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||M.test(h)||F.test(h)||N.test(h))break;u+=`
`+b}!x&&!b.trim()&&(x=!0),c+=I+`
`,t=t.substring(I.length+1),h=k.slice(y)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),u=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Zs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Zs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Xt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=za(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ks(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ks(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...n[0]][0].length,h=t.slice(0,s+n.index+u+i);if(Math.min(s,i)%2){let x=h.slice(1,-1);return{type:"em",raw:h,text:x,tokens:this.lexer.inlineTokens(x)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},rt=class pn{constructor(e){he(this,"tokens");he(this,"options");he(this,"state");he(this,"inlineQueue");he(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||vt,this.options.tokenizer=this.options.tokenizer||new vr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:He,block:yr.normal,inline:Kt.normal};this.options.pedantic?(r.block=yr.pedantic,r.inline=Kt.pedantic):this.options.gfm&&(r.block=yr.gfm,this.options.breaks?r.inline=Kt.breaks:r.inline=Kt.gfm),this.tokenizer.rules=r}static get rules(){return{block:yr,inline:Kt}}static lex(e,r){return new pn(r).lex(e)}static lexInline(e,r){return new pn(r).inlineTokens(e)}lex(e){e=e.replace(He.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(He.tabCharGlobal,"    ").replace(He.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach(x=>{b=x.call({lexer:this},h),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},$r=class{constructor(t){he(this,"options");he(this,"parser");this.options=t||vt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(He.notSpaceStart)?.[0],s=t.replace(He.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ct(n)+'">'+(r?s:ct(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ct(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${ct(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Vs(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+ct(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Vs(t);if(s===null)return ct(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${ct(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:ct(t.text)}},vn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},nt=class fn{constructor(e){he(this,"options");he(this,"renderer");he(this,"textRenderer");this.options=e||vt,this.options.renderer=this.options.renderer||new $r,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vn}static parse(e,r){return new fn(r).parse(e)}static parseInline(e,r){return new fn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},wr,Qt=(wr=class{constructor(t){he(this,"options");he(this,"block");this.options=t||vt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?rt.lex:rt.lexInline}provideParser(){return this.block?nt.parse:nt.parseInline}},he(wr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),he(wr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),wr),Ha=class{constructor(...t){he(this,"defaults",hn());he(this,"options",this.setOptions);he(this,"parse",this.parseMarkdown(!0));he(this,"parseInline",this.parseMarkdown(!1));he(this,"Parser",nt);he(this,"Renderer",$r);he(this,"TextRenderer",vn);he(this,"Lexer",rt);he(this,"Tokenizer",vr);he(this,"Hooks",Qt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new $r(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new vr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Qt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Qt.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Qt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let u=l.call(s,c);return a.call(s,u)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return rt.lex(t,e??this.defaults)}parser(t,e){return nt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?rt.lex:rt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?nt.parse:nt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?rt.lex:rt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?nt.parse:nt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+ct(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},kt=new Ha;function ce(t,e){return kt.parse(t,e)}ce.options=ce.setOptions=function(t){return kt.setOptions(t),ce.defaults=kt.defaults,Xs(ce.defaults),ce};ce.getDefaults=hn;ce.defaults=vt;ce.use=function(...t){return kt.use(...t),ce.defaults=kt.defaults,Xs(ce.defaults),ce};ce.walkTokens=function(t,e){return kt.walkTokens(t,e)};ce.parseInline=kt.parseInline;ce.Parser=nt;ce.parser=nt.parse;ce.Renderer=$r;ce.TextRenderer=vn;ce.Lexer=rt;ce.lexer=rt.lex;ce.Tokenizer=vr;ce.Hooks=Qt;ce.parse=ce;var Oc=ce.options,Mc=ce.setOptions,Nc=ce.use,Pc=ce.walkTokens,Fc=ce.parseInline;var Bc=nt.parse,qc=rt.lex;function lo(t){let e=ce.parse(t),r=zs.sanitize(e);return Ws(r)}function Wa(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function co(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(y){y.key==="Escape"&&s&&(y.preventDefault(),b())}document.addEventListener("keydown",a);function c(){return s?p`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Wa(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>b()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?p`<div class="mv__status">불러오는 중…</div>`:o==="error"?p`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:lo(i)}
          </div>
        </div>
      </div>
    `:p``}function u(){ue(c(),t)}async function h(y){s=y,o="loading",i="",l="",u();let C=r?r():"";if(!C){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let N="/api/doc?workspace="+encodeURIComponent(C)+"&path="+encodeURIComponent(y);try{let M=await n(N),F=await M.json().catch(()=>({}));if(!M.ok||!F||F.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||M.status)+")",u();return}i=String(F.content||""),o="ready",u()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function b(){s=null,ue(p``,t)}function x(){document.removeEventListener("keydown",a),b()}return{open:h,close:b,destroy:x}}var Ga={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ja(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function uo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return p`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let o of r)o&&typeof o.resumed_from=="string"&&o.resumed_from.length>0&&n.add(o.resumed_from);let s=o=>{if(!(o.status==="failed"||o.status==="orphaned"))return"";let l=typeof o.session_id=="string"&&o.session_id.length>0,a=n.has(o.attempt_id),c=l&&!a,u=l?a?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return p`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${o.attempt_id}
      ?disabled=${!c}
      title=${u}
      @click=${h=>{h.stopPropagation(),c&&e.onResume&&e.onResume(o.attempt_id)}}
    >
      ↻ 이어하기
    </button>`};return p`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(o=>p`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${o.status||"unknown"}"
              data-attempt-id=${o.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(o.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Ga[o.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${o.attempt_id}</span>
              ${o.resumed_from?p`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${o.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[o.runner,o.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${o.session_id?p`<span class="detail-session__sid" title=${o.session_id}
                    >${String(o.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${ja(o.started_at)}</span
              >
            </button>
            ${s(o)}
          </div>`)}
    </div>
  `}var Ya=["open","in_progress","deferred","resolved","closed"],Va=[0,1,2,3,4];function po(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,u={},h=!1,b=!1,x="",y="",C="";function N(){h=!1,b=!1,x="",y="",C=""}let M=document.createElement("div");M.className="md-viewer-root",document.body.appendChild(M);let F=co(M,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),z=document.createElement("div");z.className="session-log-root",document.body.appendChild(z);let I=fr(z,{transport:s?(m,E)=>Promise.resolve(s(m,E)):void 0,sessionLogStore:l});function k(){if(!i||!a)return[];let m=i.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(A=>A&&A.bead_id===a).sort((A,R)=>(R.started_at||0)-(A.started_at||0)).map(A=>({attempt_id:A.attempt_id,bead_id:A.bead_id,status:A.status,started_at:typeof A.started_at=="number"?A.started_at:null,runner:A.runner||null,model:A.model||null,session_id:A.session_id||null,resumed_from:A.resumed_from||null}))}function w(m){let E=i?i.get():null,A=E&&E.attempts?E.attempts[m]:null;I.open({attempt_id:m,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}})}async function $(m){if(!s||!m)return;let E=()=>{let R=i?i.get():null;return R&&typeof R.revision=="number"?R.revision:0},A=await s("worker-attempt-resume",{attempt_id:m,expected_revision:E()});if(A&&A.conflict){let R=A.queue&&typeof A.queue.revision=="number"?A.queue.revision:E();A=await s("worker-attempt-resume",{attempt_id:m,expected_revision:R})}A&&A.resumed===!1&&!A.conflict&&A.reason&&K(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}let v={onOpen:w,onResume:$};function q(){let m=i?i.get():null,E=m&&m.exec_defaults;return E&&typeof E=="object"?E:{}}let Y=null;r&&r.subscribe&&(Y=r.subscribe(()=>Ie()));let Q=null;i&&typeof i.subscribe=="function"&&(Q=i.subscribe(()=>{a&&P()}));function J(m){m.key==="Escape"&&a&&(m.preventDefault(),n())}document.addEventListener("keydown",J);function Ie(){if(a){if(r&&typeof r.snapshotFor=="function"){let m=r.snapshotFor("detail:"+a)||[];c=m.find(A=>A&&A.id===a)||m[0]||c}P()}}function Be(m){Dt(m).then(E=>{E?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ae(m){m.preventDefault(),m.stopPropagation(),a&&Be(a)}function Ze(m,E){m.preventDefault(),m.stopPropagation(),Be(E)}function We(m,E){m.preventDefault(),m.stopPropagation(),F.open(E)}function ve(m,E){u[m]=E,P(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:m,value:E})).catch(()=>{K("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Te(m,E,A){if(!s||!a)return!1;try{let R=await Promise.resolve(s(m,E)),X=Array.isArray(R)?R[0]:R;return X&&typeof X=="object"&&X.id?(c=X,!0):(K(A,"error"),!1)}catch{return K(A,"error"),!1}}function xe(m){setTimeout(()=>{try{let E=t.querySelector(m);E&&typeof E.focus=="function"&&E.focus()}catch{}},0)}function pe(){h=!0,x=c&&c.title||"",P(),xe('.detail-edit__input[data-edit="title"]')}function Qe(m){x=m.target.value}function fe(){h=!1,x="",P()}function Ye(){Te("edit-text",{id:a,field:"title",value:x},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(h=!1,x=""),P()})}function ie(){b=!0,y=c&&c.description||"",P(),xe('.detail-edit__textarea[data-edit="description"]')}function Me(m){y=m.target.value}function Ve(){b=!1,y="",P()}function Ce(){Te("edit-text",{id:a,field:"description",value:y},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(b=!1,y=""),P()})}function De(m,E,A,R){if(m.key==="Escape"){m.stopPropagation(),A();return}m.key==="Enter"&&(!R||m.ctrlKey||m.metaKey)&&(m.preventDefault(),E())}function ye(m){let E=m.target.value;Te("update-status",{id:a,status:E},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>P())}function _(m){let E=Number(m.target.value);Te("update-priority",{id:a,priority:E},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>P())}function S(m){C=m.target.value}function U(){let m=C.trim();m.length!==0&&Te("label-add",{id:a,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(E=>{E&&(C=""),P()})}function ne(m){if(m.key==="Escape"){m.stopPropagation(),C="",P();return}m.key==="Enter"&&(m.preventDefault(),U())}function de(m){Te("label-remove",{id:a,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>P())}let ge={onCopyPath:Ze,onOpenDoc:We},se={onChange:ve};function ee(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function oe(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ne(m){let A=(Array.isArray(m.dependencies)?m.dependencies:[]).map(R=>({id:ee(R),icon:oe(R)})).filter(R=>R.id.length>0);return p`
      <div class="detail-section-label">의존성</div>
      ${A.length===0?p`<div class="detail-empty">의존성 없음</div>`:p`<div class="detail-deps">
            ${A.map(R=>o?p`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(R.id)}
                  >
                    ${R.icon?`${R.icon} `:""}${R.id}
                  </button>`:p`<span class="detail-dep"
                    >${R.icon?`${R.icon} `:""}${R.id}</span
                  >`)}
          </div>`}
    `}function Ke(m){let E=m.metadata||{},A=m.workflow||{},R=A.stages||{},X=R.spec&&R.spec.stale,le=R.impl&&R.impl.stale,H=A.route_source==="derived",O=A.route||E.route||"\u2014";return p`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${H?" detail-kv__v--derived":""}"
          title=${H?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${H&&A.route?`${O} ? (\uCD94\uB860)`:O}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${E.spec_review||"\uC5C6\uC74C"}${X?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${E.impl_review||"\uC5C6\uC74C"}${le?" \xB7 stale":""}</span
        >
      </div>
      ${E.pr_url?p`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${E.pr_url}</span>
          </div>`:""}
    `}let Je={route:["spec_backed","full_plan"],merge_policy:["auto_merge","pr_stop"],drift_policy:["auto_rereview","halt"]};async function be(m,E){let A=E.target.value;if(m==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){P();return}await Te("update-workflow-meta",{id:a,key:m,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),P()}function Ee(m){let E=m.metadata||{},A=(R,X)=>{let le=Je[R],H=typeof E[R]=="string"?E[R]:"";return p`<div class="detail-kv">
        <span class="detail-kv__k">${R}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${R}
          data-edit=${`wfmeta-${R}`}
          @change=${O=>be(R,O)}
        >
          <option value="" ?selected=${!le.includes(H)}>
            ${X}
          </option>
          ${le.map(O=>p`<option value=${O} ?selected=${H===O}>${O}</option>`)}
        </select>
      </div>`};return p`
      ${A("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")}
      ${A("merge_policy","(\uAE30\uBCF8 auto_merge)")}
      ${A("drift_policy","(\uAE30\uBCF8 auto_rereview)")}
    `}function Re(m){return h?p`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${x}
            @input=${Qe}
            @keydown=${E=>De(E,Ye,fe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ye}
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
      `:p`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
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
    `}function Le(m){let E=Lt(m.created_at),A=Lt(m.updated_at);return!E&&!A?p``:p`
      ${E?p`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
      ${A?p`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function T(m,E){return p`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ye}
        >
          ${Ya.map(A=>p`<option value=${A} ?selected=${A===m}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${_}
        >
          ${Va.map(A=>p`<option value=${String(A)} ?selected=${A===E}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function D(m){return p`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":p`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ie}
            >
              ✎
            </button>`}
      </div>
      ${b?p`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${y}
              @input=${Me}
              @keydown=${E=>De(E,Ce,Ve,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ce}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ve}
              >
                취소
              </button>
            </div>
          </div>`:p`<div class="detail-overlay__desc">
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function V(m){let E=Array.isArray(m.labels)?m.labels:[];return p`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${E.map(A=>p`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>de(A)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${C}
            @input=${S}
            @keydown=${ne}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${U}
          >
            추가
          </button>
        </span>
      </div>
    `}function W(){if(!a)return p``;let m=c||{},E=String(m.id||a),A=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",R=m.status||"open",X=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",le=m.description||"",H={...m,metadata:{...m.metadata||{},...u}};return p`
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
            @click=${Ae}
          >
            ${E}
          </button>
          ${Re(A)} ${T(R,X)}
          ${Le(m)} ${D(le)}
          ${V(m)} ${Ne(m)}
          ${Ke(m)} ${Ee(m)}
          ${Ts(m,ge)}
          ${Es(H,se,q())}
          ${uo(k(),v)}
        </div>
      </div>
    `}function P(){ue(W(),t)}return{load(m){m!==a&&(u={},N()),a=m,c=null,Ie()},clear(){a=null,c=null,u={},N(),F.close(),I.close(),ue(p``,t)},destroy(){Y&&(Y(),Y=null),Q&&(Q(),Q=null),document.removeEventListener("keydown",J),F.destroy(),M.parentNode&&M.parentNode.removeChild(M),I.destroy(),z.parentNode&&z.parentNode.removeChild(z),a=null,c=null,ue(p``,t)}}}var Za=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function fo(t,e){return Gr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Ka(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function ho(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(w){let $=r.get();if($)try{let v=await n("display-policy-set",{expected_revision:$.revision,policy:w($)});a(v),v&&v.conflict&&v.policy&&(v=await n("display-policy-set",{expected_revision:v.policy.revision,policy:w(v.policy)}),a(v)),v&&v.conflict&&K("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{K("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(w){w&&w.policy&&typeof w.policy=="object"&&r.set(w.policy)}function c(w){let $=r.get();if(!$)return;let v=fo(w,$)!=="shown";l(q=>Ka(w,q,v))}function u(){let w=i.trim();w.length!==0&&(i="",l($=>$.hidden_prefixes.includes(w)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,w]}),N())}function h(w){l($=>({hidden_prefixes:$.hidden_prefixes.filter(v=>v!==w)}))}function b(w){let $=r.get();if(!$)return;let v=$.chips[w]===!1;l(()=>({chips:{[w]:v}}))}function x(w){let $=s();return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${$.length===0?p`<div class="display-settings__empty">라벨 없음</div>`:p`<div class="display-settings__pills">
              ${$.map(v=>{let q=fo(v,w);return p`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${q}`}
                  data-label=${v}
                  data-state=${q}
                  @click=${()=>c(v)}
                >
                  ${v}
                </button>`})}
            </div>`}
      </section>
    `}function y(w){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${w.hidden_prefixes.map($=>p`<span class="display-settings__prefix">
                ${$}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${$} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h($)}
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
            @input=${$=>{i=String($.target.value||"")}}
          />
          <button type="button" @click=${u}>추가</button>
        </div>
      </section>
    `}function C(w){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Za.map(([$,v])=>p`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${$}
                  .checked=${w.chips[$]!==!1}
                  @change=${()=>b($)}
                />
                <span>${v}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let w=r.get();ue(p`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${k}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${w?p`${x(w)} ${y(w)}
                ${C(w)}`:p`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let M=!1,F=()=>{M=!1};o.addEventListener("close",F),o.addEventListener("cancel",F);let z=null;r.subscribe&&(z=r.subscribe(()=>{M&&N()}));function I(){M||(i="",M=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function k(){M&&(M=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:I,close:k,destroy(){M=!1,o.removeEventListener("close",F),o.removeEventListener("cancel",F),z&&(z(),z=null),o.remove()}}}function mo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function go(t,e,r){let n=ke("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return p`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${c==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${c==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
      </div>
    `}function l(){ue(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ue(p``,t)}}}var bo=["bug","feature","task","epic","chore"];function _o(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var yo=["Critical","High","Medium","Low","Backlog"];function wo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let k=document.createElement("option");k.value="",k.textContent="\u2014 Select \u2014",o.appendChild(k);for(let w of bo){let $=document.createElement("option");$.value=w,$.textContent=_o(w),o.appendChild($)}i.replaceChildren();for(let w=0;w<=4;w+=1){let $=document.createElement("option");$.value=String(w);let v=yo[w]||"Medium";$.textContent=`${w} \u2013 ${v}`,i.appendChild($)}}x();function y(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function C(k){s.disabled=k,o.disabled=k,i.disabled=k,l.disabled=k,a.disabled=k,u.disabled=k,h.disabled=k,h.textContent=k?"Creating\u2026":"Create"}function N(){c.textContent=""}function M(k){c.textContent=k}function F(){try{let k=window.localStorage.getItem("beads-ui.new.type");k?o.value=k:o.value="";let w=window.localStorage.getItem("beads-ui.new.priority");w&&/^\d$/.test(w)?i.value=w:i.value="2"}catch{o.value="",i.value="2"}}function z(){let k=o.value||"",w=i.value||"";k.length>0&&window.localStorage.setItem("beads-ui.new.type",k),w.length>0&&window.localStorage.setItem("beads-ui.new.priority",w)}async function I(){N();let k=String(s.value||"").trim();if(k.length===0){M("Title is required"),s.focus();return}let w=Number(i.value||"2");if(!(w>=0&&w<=4)){M("Priority must be 0..4"),i.focus();return}let $=String(o.value||""),v=String(a.value||""),q={title:k};$.length>0&&(q.type=$),String(w).length>0&&(q.priority=w),v.length>0&&(q.description=v),C(!0);try{await e("create-issue",q)}catch{C(!1),M("Failed to create issue");return}z(),C(!1),y()}return r.addEventListener("cancel",k=>{k.preventDefault(),y()}),b.addEventListener("click",()=>y()),u.addEventListener("click",()=>y()),r.addEventListener("keydown",k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&(k.preventDefault(),I())}),n.addEventListener("submit",k=>{k.preventDefault(),I()}),{open(){n.reset(),N(),F();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){y()}}}var Xa=[{key:"orchestration_model",values:()=>Kr},{key:"orchestration_effort",values:()=>Xr},{key:"review_model",values:()=>Qr},{key:"impl_model",values:()=>Jr}];function ko(t,e){let{queueStore:r,transport:n}=e,s=document.createElement("dialog");s.id="worker-exec-defaults-dialog",s.className="exec-defaults",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),t.appendChild(s);function o(){return r&&r.get()||{revision:0,exec_defaults:{}}}function i(){let M=o();return typeof M.revision=="number"?M.revision:0}function l(){let M=o().exec_defaults;return M&&typeof M=="object"?M:{}}function a(M){M&&M.queue&&r&&r.set(M.queue)}async function c(M,F){if(!n)return;let z={key:M,value:F||null};try{let I=await n("worker-queue-set-exec-default",{...z,expected_revision:i()});a(I),I&&I.conflict&&(I=await n("worker-queue-set-exec-default",{...z,expected_revision:i()}),a(I)),I&&I.conflict&&K("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{K("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function u(M,F,z){let I=!!z&&!F.includes(z);return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${M}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${M}`}
        data-key=${M}
        @change=${k=>{c(M,k.target.value)}}
      >
        <option value="" ?selected=${!z}>
          ${en[M]||"(\uAE30\uBCF8)"}
        </option>
        ${I?p`<option value=${z} ?selected=${!0}>
              ${z} (비호환)
            </option>`:""}
        ${F.map(k=>p`<option value=${k} ?selected=${z===k}>${k}</option>`)}
      </select>
    </div>`}function h(){let M=l();ue(p`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${N}
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
            ${Xa.map(F=>u(F.key,F.values(),M[F.key]||""))}
          </div>
        </div>
      `,s)}let b=!1,x=()=>{b=!1};s.addEventListener("close",x),s.addEventListener("cancel",x);let y=null;r&&r.subscribe&&(y=r.subscribe(()=>{b&&h()}));function C(){b||(b=!0,h(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))}function N(){b&&(b=!1,typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:C,close:N,destroy(){b=!1,s.removeEventListener("close",x),s.removeEventListener("cancel",x),y&&(y(),y=null),s.remove()}}}function Qa(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[];return p`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?p`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.pr_url&&t.pr_number?p`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:""}
    ${r.map(n=>p`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${n}</span
        >`)}
    ${t.reason?p`<span class="worker-mini__reason">${t.reason}</span>`:""}
    ${t.merge_action?p`<button
            type="button"
            class="worker-mini__merge"
            data-bead-id=${t.id}
            ?disabled=${t.merge_enabled===!1}
            title=${t.merge_title||""}
          >
            머지
          </button>
          <button
            type="button"
            class="worker-mini__rerun"
            data-bead-id=${t.id}
            title="PR을 버리고 새 base에서 다시 실행합니다 (되돌릴 수 없음)"
          >
            재실행
          </button>`:""}
  </div>`}function Ja(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return p`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?p`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?p`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?pr(r,t.status):""}
    ${t.reason?p`<div class="worker-card__foot">
          <span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >
        </div>`:""}
  </div>`}function Ar(t){return p`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${t.items.length===0?p`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>t.lane==="candidate"?Ja(e):Qa(e))}
    </div>
  </section>`}function el(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function vo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return p`<div class="worker-banners">
    ${t.autoAdvance?p`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — 대기 큐를 순서대로 슬롯 수만큼 실행합니다.
        </div>`:p`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${t.failure?p`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?p`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
        </div>`:""}
    ${e.map(r=>p`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). bead는 resolved로 남아 있고 자동 재시도는
          하지 않습니다 — 정리를 사람이 마무리하세요.
        </div>`)}
  </div>`}function tl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?el(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=t.attempt_id&&t.attempt_id===r;return p`<div
    class="rtile${i?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      ${t.resumed_from?p`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__info"
        title="상세 보기"
        aria-label="상세 보기"
      >
        ⓘ
      </button>
      ${n?p`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:p`<button
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
    ${o?p`<div class="rtile__meta">${o}</div>`:""}
  </div>`}function $o(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return p`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?p`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>tl(s,e,r))}
  </div>`}var rl="tab:worker:ready",nl="tab:worker:blocked",Tr=1;function sl(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function ol(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function il(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var al=["closed_unmerged","undecidable"];function ll(t,e,r,n){let s=r[t]||null,o=s&&s.gate?s.gate:null,i=s&&s.pr?s.pr:null,l=[];o&&o.gate_badge&&l.push(o.gate_badge),o&&o.base_badge&&o.base_badge!==o.gate_badge&&l.push(o.base_badge),n&&l.push("\uC815\uB9AC \uC2E4\uD328");let a=!!o&&o.base_badge==="\uCDA9\uB3CC",c=!!o&&o.enabled===!0,u=!!n&&!!o&&o.tier==="merged";return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:i&&typeof i.number=="number"?i.number:null,pr_url:i&&typeof i.url=="string"?i.url:"",badges:l,alert:!!o&&al.includes(o.tier)||!!n,merge_action:!0,merge_enabled:c||a||u,merge_title:u?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":a?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":c?`\uBA38\uC9C0 (${o.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${o&&o.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function $n(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?cr(n,i):null,c=dr({transport:r,uiOrderStore:i}),u=null,h=[],b=[],x=document.createElement("div");x.className="worker-console";let y=document.createElement("div"),C=document.createElement("div");C.className="worker-drawer-host";let N=document.createElement("div");N.className="worker-lanes-host",x.append(y,C,N),t.appendChild(x);let M=null,F=fr(C,{transport:r,sessionLogStore:o,onClose:()=>{M=null,xe()}}),z=ko(x,{queueStore:s,transport:r});function I(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Tr,queue:[],pr_wait:[],done:[]}}function k(){let _=I();return typeof _.revision=="number"?_.revision:0}function w(_){_&&_.queue&&s&&s.set(_.queue)}async function $(_,S){if(!r)return;let U=await r("worker-queue-place",{bead_id:_,index:S,expected_revision:k()});w(U),U&&U.conflict&&await r("worker-queue-place",{bead_id:_,index:S,expected_revision:k()}).then(w)}async function v(_,S){if(!r)return;let U=await r("worker-queue-reorder",{bead_id:_,to_index:S,expected_revision:k()});w(U),U&&U.conflict&&await r("worker-queue-reorder",{bead_id:_,to_index:S,expected_revision:k()}).then(w)}async function q(_){if(!r)return;let S=await r("worker-queue-remove",{bead_id:_,expected_revision:k()});w(S),S&&S.conflict&&await r("worker-queue-remove",{bead_id:_,expected_revision:k()}).then(w)}async function Y(_){!r||!_||await r("worker-attempt-stop",{attempt_id:_})}async function Q(_){if(!r||!_)return;let S=await r("worker-attempt-pause",{attempt_id:_});S&&S.paused===!1&&S.reason&&K(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${S.reason}`,"error",2400)}async function J(_){if(!r||!_)return;let S=await r("worker-attempt-resume",{attempt_id:_,expected_revision:k()});w(S),S&&S.conflict&&(S=await r("worker-attempt-resume",{attempt_id:_,expected_revision:k()}),w(S)),S&&S.resumed===!1&&!S.conflict&&S.reason&&K(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}async function Ie(_){if(!r||!_)return;let S=await r("worker-pr-merge",{bead_id:_,expected_revision:k()});if(w(S),S&&S.conflict&&(S=await r("worker-pr-merge",{bead_id:_,expected_revision:k()}),w(S)),!(!S||S.conflict)){if(S.action==="conflict_resolution"){K(S.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${S.reason||""}`,S.ok?"success":"error",2800);return}if(S.ok){K("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}K(S.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${S.cleanup_step}): ${S.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${S.reason||""}`,"error",3200)}}async function Be(_){if(!r||!_||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${_}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD55C \uB4A4 \uC0C8 base\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let U=await r("worker-pr-rerun",{bead_id:_,expected_revision:k()});w(U),U&&U.conflict&&(U=await r("worker-pr-rerun",{bead_id:_,expected_revision:k()}),w(U)),U&&U.rerun===!1&&!U.conflict&&K(`\uC7AC\uC2E4\uD589 \uAC70\uBD80: ${U.reason||""}`,"error",2800)}async function Ae(_){if(!r)return;let S=await r("worker-queue-toggle",{on:_,expected_revision:k()});w(S),S&&S.conflict&&await r("worker-queue-toggle",{on:_,expected_revision:k()}).then(w)}async function Ze(_){if(!r||!Number.isFinite(_))return;let S=Math.max(Tr,Math.floor(_)),U=await r("worker-queue-set-slots",{slots:S,expected_revision:k()});w(U),U&&U.conflict&&await r("worker-queue-set-slots",{slots:S,expected_revision:k()}).then(w)}function We(){let _=I(),S=a?a.selectBoardColumn(rl,"ready"):[],U=a?a.selectBoardColumn(nl,"blocked"):[],ne=new Map;for(let O of[...S,...U])ne.set(O.id,O.title||O.id);let de=_.pr_wait||[],ge=_.pr_observations||{},se=_.cleanup_failed||{},ee=Object.entries(se).map(([O,me])=>({bead_id:O,step:me&&me.step?me.step:"",reason:me&&me.reason?me.reason:""})),oe=_.queue||[],Ne=new Set([...oe.map(O=>O.bead_id),...de.map(O=>O.bead_id),..._.done.map(O=>O.bead_id)]),Ke=new Set(U.map(O=>O.id)),Je=i?i.get()?.order||{}:{},be=new Set,Ee=[];for(let O of[...S,...U])Ne.has(O.id)||be.has(O.id)||ol(O)||(be.add(O.id),Ee.push(O));Ee.sort(ar(Je)),h=Ee;let Re=_.admission||{},Le=O=>Re[O]?`\u26D4 ${Re[O].reason}`:"",T=Ee.map(O=>{let me=sl(O),Pe=[];Ke.has(O.id)&&Pe.push(il(O)),me||Pe.push("spec \uC5C6\uC74C");let $t=Le(O.id);return $t&&Pe.push($t),{id:O.id,title:O.title||O.id,reason:Pe.join(" \xB7 "),draggable:me,lane:"candidate",workflow:O.workflow,status:O.status}}),D=(O,me)=>O.map(Pe=>({id:Pe.bead_id,title:ne.get(Pe.bead_id)||Pe.bead_id,reason:me==="done"?"":Le(Pe.bead_id),draggable:me!=="done",done:me==="done",lane:me})),V=_.attempts?Object.values(_.attempts):[],W=new Set;for(let O of V)O&&typeof O.resumed_from=="string"&&O.resumed_from.length>0&&W.add(O.resumed_from);let P=[],m=null;for(let O of V){let me=O.status==="paused"&&!W.has(O.attempt_id);O.status==="running"||me?P.push({bead_id:O.bead_id,attempt_id:O.attempt_id,title:ne.get(O.bead_id)||O.bead_id,runner:O.runner||null,model:O.model||null,effort:O.effort||null,started_at:typeof O.started_at=="number"?O.started_at:null,resumed_from:O.resumed_from||null,paused:me,can_pause:typeof O.session_id=="string"&&O.session_id.length>0}):(O.status==="failed"||O.status==="orphaned")&&(m=O)}let E=null;if(m){let O=typeof m.session_id=="string"&&m.session_id.length>0,me=W.has(m.attempt_id);E={repo:m.repo||"",reason:m.cause||m.status,resume_attempt_id:m.attempt_id,resume_eligible:O&&!me,resume_reason:O?me?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let R=P.filter(O=>!O.paused).length,X=(_.workspace_info||{}).slots,le=typeof X=="number"?X:typeof _.slots=="number"?_.slots:Tr,H=R>le;return{queue:_,idToTitle:ne,candidates:T,running:P,live_count:R,slots:le,over_cap:H,failure:E,waiting:D(oe,"queue"),done:[...de.map(O=>ll(O.bead_id,ne.get(O.bead_id)||O.bead_id,ge,se[O.bead_id]||null)),...D(_.done,"done")],cleanup_failures:ee}}function ve(_){let S=_.waiting.length>0?_.waiting[0].id:"\u2014";return p`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${_.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${_.live_count}</b> · 다음 <b>${S}</b></span
        >
        ${_.over_cap?p`<span
              class="worker-overcap"
              title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
              >cap 초과</span
            >`:""}
        <label class="worker-tgl worker-slots"
          >동시 실행
          <input
            type="number"
            class="worker-slots__input"
            min=${Tr}
            step="1"
            .value=${String(_.slots)}
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
        </button>
      </div>
      ${vo({autoAdvance:!!_.queue.auto_advance,failure:_.failure,cleanupFailures:_.cleanup_failures})}
      ${$o(_.running,Date.now(),M)}`}function Te(_){return p`<div class="worker-lanes">
      ${Ar({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${Ar({id:"worker-pane-queue",lane:"queue",title:`\uB300\uAE30 \uD050 \xB7 \uC2AC\uB86F ${_.slots}`,items:_.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Ar({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${_.done.length}`,items:_.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function xe(){let _=We();ue(ve(_),y),ue(Te(_),N)}function pe(_){let S=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!S)return;let U=S.dataset.beadId||"",ne=S.dataset.lane||"";u={bead_id:U,from_lane:ne};try{_.dataTransfer?.setData("text/plain",U),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function Qe(_){let S=_.target?.closest?.(".worker-pane");S&&(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),S.classList.add("worker-pane--drag-over"))}function fe(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ye(_,S){let U=h.find(se=>se.id===_);if(!U)return;let ne=h.filter(se=>se.id!==_),de=ne.length;if(S){let se=S.dataset.beadId;if(se===_)return;let ee=ne.findIndex(oe=>oe.id===se);ee>=0&&(de=ee)}let ge=ne.slice();ge.splice(de,0,U),c.applyReorder(_,ge,de)}function ie(_){let S=_.target?.closest?.(".worker-pane");if(!S)return;_.preventDefault(),S.classList.remove("worker-pane--drag-over");let U=S.dataset.lane||"",ne=u?.bead_id||_.dataTransfer?.getData("text/plain")||"",de=u?.from_lane||"";if(u=null,!ne)return;let ge=_.target?.closest?.(".worker-mini, .worker-card"),se=Array.from(S.querySelectorAll(".worker-mini, .worker-card")),ee=se.length;if(ge){let oe=se.indexOf(ge);oe>=0&&(ee=oe)}if(U==="candidate"){if(de==="candidate"){Ye(ne,ge);return}de==="queue"&&q(ne);return}U==="queue"&&(de==="queue"?v(ne,ee):$(ne,ee))}function Me(_){let S=_.target?.closest?.(".worker-slots__input");if(!S)return;let U=Number.parseInt(S.value,10);if(!Number.isFinite(U)){xe();return}Ze(U).then(xe)}function Ve(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function Ce(_){let S=I(),U=S.attempts?S.attempts[_]:null;M=_,F.open({attempt_id:_,meta:Ve(U)}),xe()}function De(){if(!M)return;let _=I(),S=_.attempts?_.attempts[M]:null;S&&F.updateMeta(Ve(S))}function ye(_){let S=_.target;if(S?.closest?.("#worker-exec-defaults-dialog"))return;if(S?.closest?.(".worker-exec-defaults-btn")){z.open();return}let U=S?.closest?.(".worker-banner__resume");if(U){let ee=U.dataset.attemptId;ee&&J(ee);return}if(S?.closest?.(".worker-play")){Ae(!0);return}if(S?.closest?.(".worker-pause")){Ae(!1);return}let ne=S?.closest?.(".worker-mini__merge");if(ne){Ie(ne.dataset.beadId||"");return}let de=S?.closest?.(".worker-mini__rerun");if(de){Be(de.dataset.beadId||"");return}if(S?.closest?.(".worker-mini__pr"))return;if(S?.closest?.(".rtile__stop")){let oe=S?.closest?.(".rtile")?.dataset?.attemptId;oe&&Y(oe);return}if(S?.closest?.(".rtile__pause")){let oe=S?.closest?.(".rtile")?.dataset?.attemptId;oe&&Q(oe);return}if(S?.closest?.(".rtile__resume")){let oe=S?.closest?.(".rtile")?.dataset?.attemptId;oe&&J(oe);return}if(S?.closest?.(".rtile__info")){let oe=S?.closest?.(".rtile")?.dataset?.beadId;oe&&l&&l(oe);return}if(S?.closest?.(".worker-drawer-host"))return;let ge=S?.closest?.(".rtile");if(ge){let ee=ge.dataset.attemptId;ee&&Ce(ee);return}let se=S?.closest?.(".worker-mini, .worker-card");if(se){let ee=se.dataset.beadId;if(S?.closest?.(".worker-mini__id, .worker-card__id")){ee&&Dt(ee).then(oe=>{oe?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ee&&l&&l(ee)}}return t.addEventListener("dragstart",pe),t.addEventListener("dragover",Qe),t.addEventListener("dragleave",fe),t.addEventListener("drop",ie),t.addEventListener("click",ye),t.addEventListener("change",Me),a&&b.push(a.subscribe(xe)),s&&b.push(s.subscribe(()=>{xe(),De()})),xe(),{load(){xe()},destroy(){for(let _ of b.splice(0))try{_()}catch{}t.removeEventListener("dragstart",pe),t.removeEventListener("dragover",Qe),t.removeEventListener("dragleave",fe),t.removeEventListener("drop",ie),t.removeEventListener("click",ye),t.removeEventListener("change",Me);try{F.destroy()}catch{}try{z.destroy()}catch{}ue(p``,t)}}}function xn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function xo(t,e,r,n=async()=>{},s=async()=>{}){let o=ke("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function u(w){let v=w.target.value,Y=e.getState().workspace?.current?.path||"";if(v&&v!==Y){o("switching workspace to %s",v),l=!0,k();try{await r(v)}catch(Q){o("workspace switch failed: %o",Q)}finally{l=!1,k()}}}async function h(){let w=e.getState(),$=w.workspace?.current?.path||w.workspace?.available?.[0]?.path||"";if(!(!$||a)){o("git-pulling workspace %s",$),a=!0,k();try{await n($)}catch(v){o("workspace git pull failed: %o",v)}finally{a=!1,k()}}}function b(w){let $=w.target;$&&t.contains($)||C()}function x(w){w.key==="Escape"&&C()}function y(){c||(c=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",x),k())}function C(){c&&(c=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),k())}function N(){c?C():y()}async function M(w){let $=w.target,v=$.value,q=$.checked;o("toggling visibility %s \u2192 %s",v,String(q));try{await s(v,q)}catch(Y){o("workspace visibility toggle failed: %o",Y)}}function F(w){return w?p`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${h}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:p``}function z(w,$){return p`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?p`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${w.map(v=>p`
                    <label
                      class="workspace-picker__manage-row"
                      title="${v.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${v.path}"
                        .checked=${!$.has(v.path)}
                        @change=${M}
                      />
                      <span class="workspace-picker__manage-name"
                        >${xn(v.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let w=e.getState(),$=w.workspace?.current,v=w.workspace?.available||[],q=new Set(w.workspace?.hidden||[]),Y=$?.path||v[0]?.path||"";if(v.length===0)return p``;let Q=v.filter(J=>!q.has(J.path)||J.path===Y);if(Q.length<=1){let J=Q[0]||v[0],Ie=xn(J.path);return p`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${J.path}"
            >${Ie}</span
          >
          ${z(v,q)}
          ${F(Y)}
          ${a?p`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return p`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${Q.map(J=>p`
              <option
                value="${J.path}"
                ?selected=${J.path===Y}
                title="${J.path}"
              >
                ${xn(J.path)}
              </option>
            `)}
        </select>
        ${z(v,q)}
        ${F(Y)}
        ${l||a?p`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function k(){ue(I(),t)}return k(),i=e.subscribe(()=>k()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),ue(p``,t)}}}var So=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-pr-merge","worker-pr-rerun","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Sn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Ao(t,e,r=Sn()){return{id:r,type:t,payload:e}}function To(t={}){let e=ke("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,u=[],h=new Map,b=new Set;function x(I){for(let k of Array.from(b))try{k(I)}catch{}}function y(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),x(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),k=(r.jitterRatio||0)*I,w=Math.max(0,Math.round(I+(Math.random()*2-1)*k));e("ws retry in %d ms (attempt %d)",w,i+1),l=setTimeout(()=>{l=null,z()},w)}function C(I){try{s?.send(JSON.stringify(I))}catch(k){e("ws send failed",k)}}function N(){for(o="open",e("ws open"),x(o),i=0;u.length;){let I=u.shift();I&&C(I)}}function M(I){let k;try{k=JSON.parse(String(I.data))}catch{e("ws received non-JSON message");return}if(!k||typeof k.id!="string"||typeof k.type!="string"){e("ws received invalid envelope");return}if(c.has(k.id)){let $=c.get(k.id);c.delete(k.id),k.ok?$?.resolve(k.payload):$?.reject(k.error||new Error("ws error"));return}let w=h.get(k.type);if(w&&w.size>0)for(let $ of Array.from(w))try{$(k.payload)}catch(v){e("ws event handler error",v)}else e("ws received unhandled message type: %s",k.type)}function F(){o="closed",e("ws closed"),x(o);for(let[I,k]of c.entries())k.reject(new Error("ws disconnected")),c.delete(I);i+=1,y()}function z(){if(!a)return;let I=n();try{s=new WebSocket(I),e("ws connecting %s",I),o="connecting",x(o),s.addEventListener("open",N),s.addEventListener("message",M),s.addEventListener("error",()=>{}),s.addEventListener("close",F)}catch(k){e("ws connect failed %o",k),y()}}return z(),{send(I,k){if(!So.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let w=Sn(),$=Ao(I,k,w);return e("send %s id=%s",I,w),new Promise((v,q)=>{c.set(w,{resolve:v,reject:q,type:I}),s&&s.readyState===s.OPEN?C($):(e("queue %s id=%s (state=%s)",I,w,o),u.push($))})},on(I,k){h.has(I)||h.set(I,new Set);let w=h.get(I);return w?.add(k),()=>{w?.delete(k)}},onConnection(I){return b.add(I),()=>{b.delete(I)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,z()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function cl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function dl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var An=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Eo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Co="worker:queue",Ro="ui:order",Lo="ui:display-policy",pt="tab:board:closed",Io="beads-ui.board.closed-range";function ul(t){let e=ke("main");e("bootstrap start");let r=p`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ue(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let v=function(f,g){let Z="Request failed",j="";if(f&&typeof f=="object"){let we=f;if(typeof we.message=="string"&&we.message.length>0&&(Z=we.message),typeof we.details=="string")j=we.details;else if(we.details&&typeof we.details=="object")try{j=JSON.stringify(we.details,null,2)}catch{j=""}}else typeof f=="string"&&f.length>0&&(Z=f);let te=g&&g.length>0?`Failed to load ${g}`:"Request failed";$.open(te,Z,j)},ie=function(f){return`${R.getState().workspace.current?.path||""}\0${f}`},Me=function(){We&&(We().catch(()=>{}),We=null),ve=null,Te=null},Ce=function(f){xe=f;let g=()=>{xe!==f||R.getState().selected_id!==f||(xe=null,Ve(f))};if(!fe){Qe.then(g);return}g()},S=function(){let f=Yn(_);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},U=function(f){if(f)for(let[g,Z]of An){if(De.has(g)||ye.has(g))continue;let j=g===pt?S():{type:Z};try{J.register(g,j)}catch(te){e("register %s store failed: %o",g,te)}ye.add(g),Q.subscribeList(g,j).then(te=>{De.set(g,te)}).catch(te=>{e("subscribe %s failed: %o",g,te),v(te,"board")}).finally(()=>{ye.delete(g)})}else de()},de=function(){for(let[f]of An){let g=De.get(f);g&&(g().catch(()=>{}),De.delete(f));try{J.unregister(f)}catch(Z){e("unregister %s failed: %o",f,Z)}}},ee=function(f){if(!f){oe();return}for(let[g,Z]of Eo)if(!(ge.has(g)||ye.has(g))){try{J.register(g,{type:Z})}catch(j){e("register %s store failed: %o",g,j)}ye.add(g),Q.subscribeList(g,{type:Z}).then(j=>{ge.set(g,j)}).catch(j=>{e("subscribe %s failed: %o",g,j),v(j,"worker")}).finally(()=>{ye.delete(g)})}se||(Y("subscribe-worker-queue",{id:Co}).catch(g=>{e("subscribe-worker-queue failed: %o",g)}),se=()=>Y("unsubscribe-worker-queue",{id:Co}))},oe=function(){for(let[f]of Eo){let g=ge.get(f);g&&(g().catch(()=>{}),ge.delete(f));try{J.unregister(f)}catch(Z){e("unregister %s failed: %o",f,Z)}}se&&(se().catch(()=>{}),se=null)},Ke=function(){Ne||(Y("subscribe-ui-order",{id:Ro}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),Ne=()=>Y("unsubscribe-ui-order",{id:Ro}))},Je=function(){Ne&&(Ne().catch(()=>{}),Ne=null),Be.clear()},Ee=function(){be||(Y("subscribe-display-policy",{id:Lo}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),be=()=>Y("unsubscribe-display-policy",{id:Lo}))},Re=function(){be&&(be().catch(()=>{}),be=null),Ae.clear()},P=function(f){if(!f)return"Unknown";let g=f.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var l=v,a=ie,c=Me,u=Ce,h=S,b=U,x=de,y=ee,C=oe,N=Ke,M=Je,F=Ee,z=Re,I=P;let k=document.getElementById("header-loading"),w=gs(k),$=mo(t),q=To(),Y=w.wrapSend((f,g)=>q.send(f,g)),Q=cs(Y),J=ds(),Ie=ps(),Be=us(),Ae=Vn(),Ze=Zn();q.on("worker-queue-snapshot",f=>{let g=f;if(g&&g.queue)try{Ie.set(g.queue)}catch{}}),q.on("ui-order-snapshot",f=>{let g=f;if(g&&typeof g.revision=="number")try{Be.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),q.on("display-policy-snapshot",f=>{let g=f;if(g&&g.policy&&typeof g.policy=="object")try{Ae.set(g.policy)}catch{}}),q.on("session-log-snapshot",f=>{let g=f;if(g&&typeof g.attempt_id=="string")try{Ze.set(g.attempt_id,Array.isArray(g.lines)?g.lines:[])}catch{}}),q.on("session-log-append",f=>{let g=f;if(g&&typeof g.attempt_id=="string")try{Ze.append(g.attempt_id,g.event)}catch{}}),q.on("snapshot",f=>{let g=f,Z=g&&typeof g.id=="string"?g.id:"",j=Z?J.getStore(Z):null;if(j&&g&&g.type==="snapshot")try{j.applyPush(g)}catch{}}),q.on("upsert",f=>{let g=f,Z=g&&typeof g.id=="string"?g.id:"",j=Z?J.getStore(Z):null;if(j&&g&&g.type==="upsert")try{j.applyPush(g)}catch{}}),q.on("delete",f=>{let g=f,Z=g&&typeof g.id=="string"?g.id:"",j=Z?J.getStore(Z):null;if(j&&g&&g.type==="delete")try{j.applyPush(g)}catch{}});let We=null,ve=null,Te=null,xe=null,pe=()=>{},Qe=new Promise(f=>{pe=()=>f(void 0)}),fe=!1,Ye=!1;async function Ve(f){let g=ie(f);if(g===ve||g===Te)return;Te=g;let Z=`detail:${f}`,j={type:"issue-detail",params:{id:f}};try{J.register(Z,j)}catch(te){e("register detail store failed: %o",te)}try{let te=await Q.subscribeList(Z,j);if(R.getState().selected_id!==f||ie(f)!==g){await te().catch(()=>{});return}We&&await We().catch(()=>{}),We=te,ve=g}catch(te){e("detail subscribe failed: %o",te),v(te,"issue details")}finally{Te===g&&(Te=null)}}let De=new Map,ye=new Set,_=sr;try{let f=window.localStorage.getItem(Io);qr(f)&&(_=f)}catch{}async function ne(f){if(!qr(f)||f===_)return;_=f;try{window.localStorage.setItem(Io,f)}catch{}let g=De.get(pt);if(!g)return;De.delete(pt),await g().catch(()=>{});let Z=S();try{J.register(pt,Z)}catch(j){e("register %s store failed: %o",pt,j)}try{let j=await Q.subscribeList(pt,Z);De.set(pt,j)}catch(j){e("re-subscribe %s failed: %o",pt,j),v(j,"board")}}let ge=new Map,se=null,Ne=null,be=null;async function Le(){be=null,Ae.clear();let f=R.getState().workspace.current?.path;if(f)try{await q.send("set-workspace",{path:f})}catch(g){e("workspace restore after reconnect failed: %o",g);return}Ee()}async function T(){e("clearing all subscriptions for workspace switch"),de(),oe(),Ie.clear(),Je(),Ke(),Re(),Ee(),Me();let f=R.getState();if(f.selected_id)try{J.unregister(`detail:${f.selected_id}`)}catch{}let g=R.getState();U(g.view==="board"),ee(g.view==="worker"),g.selected_id&&Ce(g.selected_id)}async function D(f){e("requesting workspace switch to %s",f),Ye=!0;try{let g=await q.send("set-workspace",{path:f});e("workspace switch result: %o",g),g&&g.workspace&&(R.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),g.changed&&(await T(),K("Switched to "+P(f),"success",2e3)))}catch(g){throw e("workspace switch failed: %o",g),K("Failed to switch workspace","error",3e3),g}finally{Ye=!1}}async function V(f){e("requesting workspace git pull for %s",f);try{let g=await q.send("git-pull-workspace",{});e("workspace git pull result: %o",g);let Z=g?.status;if(Z==="up_to_date"){K("Already up to date","success",2e3);return}if(Z==="stash_pop_conflict"){K("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}K("Git pulled "+P(f),"success",2e3)}catch(g){e("workspace git pull failed: %o",g);let Z=g?.code,j=g?.message;if(Z==="rebase_conflict"){K("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Z==="rebase_conflict_abort_failed"){K("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Z==="busy"){K("Git pull skipped: another operation is running","warning",3e3);return}let te=j?`: ${j}`:"";throw K(`Git pull failed${te}`,"error",3e3),g}}async function W(f,g){e("setting workspace visibility %s \u2192 %s",f,String(g));try{await q.send("set-workspace-visibility",{path:f,visible:g}),await m()}catch(Z){e("workspace visibility update failed: %o",Z),K("Failed to update project visibility","error",3e3)}}async function m(){try{let f=await q.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let g=f.workspaces.map(we=>({path:we.path,database:we.database,pid:we.pid,version:we.version})),Z=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,j=Array.isArray(f.hidden)?f.hidden.filter(we=>typeof we=="string"):[];R.setState({workspace:{current:Z,available:g,hidden:j}});let te=window.localStorage.getItem("beads-ui.workspace");te&&(!g.some(rr=>rr.path===te)||j.includes(te)?window.localStorage.removeItem("beads-ui.workspace"):Z&&te!==Z.path&&(e("restoring saved workspace preference: %s",te),await D(te)))}}catch(f){e("failed to load workspaces: %o",f)}}q.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(R.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),m(),T())});let E=!1;if(typeof q.onConnection=="function"){let f=g=>{e("ws state %s",g),g==="reconnecting"||g==="closed"?(E=!0,K("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&E&&(E=!1,K("Reconnected","success",2200),dl(R,(Z,j)=>{e(`${Z}: %o`,j)}),Le())};q.onConnection(f)}let A="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(A=f)}catch(f){e("view parse error: %o",f)}let R=ms({config:cl(),view:A}),X=fs(R);X.start();let le=async(f,g)=>{try{return await Y(f,g)}catch{return[]}};n&&go(n,R,X);let H=document.getElementById("workspace-picker");H&&xo(H,R,D,V,W);let O=wo(t,(f,g)=>Y(f,g));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>O.open())}catch{}let me=ho(t,{policyStore:Ae,transport:(f,g)=>Y(f,g),labelOptions:()=>{let f=new Set;for(let[g]of An)for(let Z of J.snapshotFor(g)||[]){let j=Z.labels;if(Array.isArray(j))for(let te of j)typeof te=="string"&&te.length>0&&f.add(te)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>me.open())}catch{}let Pe=$s(s,{gotoIssue:f=>X.gotoIssue(f),issueStores:J,transport:le,uiOrderStore:Be,displayPolicyStore:Ae,closedRange:_,onClosedRangeChange:f=>{ne(f)},onNewIssue:()=>O.open()}),$t=$n(o,{transport:le,issueStores:J,queueStore:Ie,sessionLogStore:Ze,uiOrderStore:Be,gotoIssue:f=>R.setState({selected_id:f})}),ot=po(i,{issueStores:J,transport:le,queueStore:Ie,sessionLogStore:Ze,getWorkspacePath:()=>R.getState().workspace.current?.path,onNavigate:f=>{R.getState().view==="worker"?R.setState({selected_id:f}):X.gotoIssue(f)},onClose:()=>{let f=R.getState();R.setState({selected_id:null});try{X.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),Ot=R.getState().selected_id;Ot&&(i.hidden=!1,ot.load(Ot),Ce(Ot)),R.subscribe(f=>{let g=f.selected_id;g?(i.hidden=!1,ot.load(g),Ye||Ce(g)):(ot.clear(),i.hidden=!0,Me())});let tr=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",U(f.view==="board"),ee(f.view==="worker"),!f.selected_id&&f.view==="board"&&Pe.load(),f.view==="worker"&&$t.load(),window.localStorage.setItem("beads-ui.view",f.view)};R.subscribe(tr),tr(R.getState()),Ke(),Ee(),m().finally(()=>{fe=!0,pe()}),window.addEventListener("keydown",f=>{let g=f.ctrlKey||f.metaKey,Z=String(f.key||"").toLowerCase(),j=f.target,te=j&&j.tagName?String(j.tagName).toLowerCase():"",we=te==="input"||te==="textarea"||te==="select"||j&&typeof j.isContentEditable=="boolean"&&j.isContentEditable;g&&Z==="n"&&(we||(f.preventDefault(),O.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ul(e)});export{ul as bootstrap,cl as readBootstrapConfig,dl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
