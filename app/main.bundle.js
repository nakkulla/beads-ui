var bp=Object.create;var Wo=Object.defineProperty;var yp=Object.getOwnPropertyDescriptor;var vp=Object.getOwnPropertyNames;var wp=Object.getPrototypeOf,kp=Object.prototype.hasOwnProperty;var $p=(e,t,r)=>t in e?Wo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var zo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var xp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of vp(t))!kp.call(e,s)&&s!==r&&Wo(e,s,{get:()=>t[s],enumerable:!(n=yp(t,s))||n.enumerable});return e};var Ap=(e,t,r)=>(r=e!=null?bp(wp(e)):{},xp(t||!e||!e.__esModule?Wo(r,"default",{value:e,enumerable:!0}):r,e));var At=(e,t,r)=>$p(e,typeof t!="symbol"?t+"":t,r);var rl=zo((Jh,tl)=>{var mn=1e3,gn=mn*60,hn=gn*60,Yr=hn*24,Tp=Yr*7,Cp=Yr*365.25;tl.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Rp(e);if(r==="number"&&isFinite(e))return t.long?Ip(e):Lp(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Rp(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Cp;case"weeks":case"week":case"w":return r*Tp;case"days":case"day":case"d":return r*Yr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*hn;case"minutes":case"minute":case"mins":case"min":case"m":return r*gn;case"seconds":case"second":case"secs":case"sec":case"s":return r*mn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Lp(e){var t=Math.abs(e);return t>=Yr?Math.round(e/Yr)+"d":t>=hn?Math.round(e/hn)+"h":t>=gn?Math.round(e/gn)+"m":t>=mn?Math.round(e/mn)+"s":e+"ms"}function Ip(e){var t=Math.abs(e);return t>=Yr?Is(e,t,Yr,"day"):t>=hn?Is(e,t,hn,"hour"):t>=gn?Is(e,t,gn,"minute"):t>=mn?Is(e,t,mn,"second"):e+" ms"}function Is(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var sl=zo((eb,nl)=>{function Op(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=rl(),r.destroy=u,Object.keys(e).forEach(d=>{r[d]=e[d]}),r.names=[],r.skips=[],r.formatters={};function t(d){let p=0;for(let m=0;m<d.length;m++)p=(p<<5)-p+d.charCodeAt(m),p|=0;return r.colors[Math.abs(p)%r.colors.length]}r.selectColor=t;function r(d){let p,m=null,k,T;function M(...H){if(!M.enabled)return;let se=M,V=Number(new Date),q=V-(p||V);se.diff=q,se.prev=p,se.curr=V,p=V,H[0]=r.coerce(H[0]),typeof H[0]!="string"&&H.unshift("%O");let I=0;H[0]=H[0].replace(/%([a-zA-Z%])/g,(R,A)=>{if(R==="%%")return"%";I++;let D=r.formatters[A];if(typeof D=="function"){let G=H[I];R=D.call(se,G),H.splice(I,1),I--}return R}),r.formatArgs.call(se,H),(se.log||r.log).apply(se,H)}return M.namespace=d,M.useColors=r.useColors(),M.color=r.selectColor(d),M.extend=n,M.destroy=r.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(k!==r.namespaces&&(k=r.namespaces,T=r.enabled(d)),T),set:H=>{m=H}}),typeof r.init=="function"&&r.init(M),M}function n(d,p){let m=r(this.namespace+(typeof p>"u"?":":p)+d);return m.log=this.log,m}function s(d){r.save(d),r.namespaces=d,r.names=[],r.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of p)m[0]==="-"?r.skips.push(m.slice(1)):r.names.push(m)}function o(d,p){let m=0,k=0,T=-1,M=0;for(;m<d.length;)if(k<p.length&&(p[k]===d[m]||p[k]==="*"))p[k]==="*"?(T=k,M=m,k++):(m++,k++);else if(T!==-1)k=T+1,M++,m=M;else return!1;for(;k<p.length&&p[k]==="*";)k++;return k===p.length}function a(){let d=[...r.names,...r.skips.map(p=>"-"+p)].join(",");return r.enable(""),d}function i(d){for(let p of r.skips)if(o(d,p))return!1;for(let p of r.names)if(o(d,p))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}nl.exports=Op});var ol=zo((Zt,Os)=>{Zt.formatArgs=Mp;Zt.save=Dp;Zt.load=Np;Zt.useColors=Pp;Zt.storage=qp();Zt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Zt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Pp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Mp(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Os.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Zt.log=console.debug||console.log||(()=>{});function Dp(e){try{e?Zt.storage.setItem("debug",e):Zt.storage.removeItem("debug")}catch{}}function Np(){let e;try{e=Zt.storage.getItem("debug")||Zt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function qp(){try{return localStorage}catch{}}Os.exports=sl()(Zt);var{formatters:Fp}=Os.exports;Fp.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Dn=globalThis,Ss=Dn.trustedTypes,ji=Ss?Ss.createPolicy("lit-html",{createHTML:e=>e}):void 0,Go="$lit$",vr=`lit$${Math.random().toFixed(9).slice(2)}$`,Vo="?"+vr,Sp=`<${Vo}>`,Hr=document,Nn=()=>Hr.createComment(""),qn=e=>e===null||typeof e!="object"&&typeof e!="function",Ko=Array.isArray,Gi=e=>Ko(e)||typeof e?.[Symbol.iterator]=="function",Ho=`[ 	
\f\r]`,Mn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bi=/-->/g,Ui=/>/g,Wr=RegExp(`>|${Ho}(?:([^\\s"'>=/]+)(${Ho}*=${Ho}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wi=/'/g,zi=/"/g,Vi=/^(?:script|style|textarea|title)$/i,Yo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=Yo(1),_n=Yo(2),Gh=Yo(3),or=Symbol.for("lit-noChange"),Mt=Symbol.for("lit-nothing"),Hi=new WeakMap,zr=Hr.createTreeWalker(Hr,129);function Ki(e,t){if(!Ko(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ji!==void 0?ji.createHTML(t):t}var Yi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Mn;for(let i=0;i<r;i++){let c=e[i],u,d,p=-1,m=0;for(;m<c.length&&(a.lastIndex=m,d=a.exec(c),d!==null);)m=a.lastIndex,a===Mn?d[1]==="!--"?a=Bi:d[1]!==void 0?a=Ui:d[2]!==void 0?(Vi.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=Wr):d[3]!==void 0&&(a=Wr):a===Wr?d[0]===">"?(a=s??Mn,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?Wr:d[3]==='"'?zi:Wi):a===zi||a===Wi?a=Wr:a===Bi||a===Ui?a=Mn:(a=Wr,s=void 0);let k=a===Wr&&e[i+1].startsWith("/>")?" ":"";o+=a===Mn?c+Sp:p>=0?(n.push(u),c.slice(0,p)+Go+c.slice(p)+vr+k):c+vr+(p===-2?i:k)}return[Ki(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Fn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,d]=Yi(t,r);if(this.el=e.createElement(u,n),zr.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=zr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Go)){let m=d[a++],k=s.getAttribute(p).split(vr),T=/([.?@])?(.*)/.exec(m);c.push({type:1,index:o,name:T[2],strings:k,ctor:T[1]==="."?Ts:T[1]==="?"?Cs:T[1]==="@"?Rs:Vr}),s.removeAttribute(p)}else p.startsWith(vr)&&(c.push({type:6,index:o}),s.removeAttribute(p));if(Vi.test(s.tagName)){let p=s.textContent.split(vr),m=p.length-1;if(m>0){s.textContent=Ss?Ss.emptyScript:"";for(let k=0;k<m;k++)s.append(p[k],Nn()),zr.nextNode(),c.push({type:2,index:++o});s.append(p[m],Nn())}}}else if(s.nodeType===8)if(s.data===Vo)c.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(vr,p+1))!==-1;)c.push({type:7,index:o}),p+=vr.length-1}o++}}static createElement(t,r){let n=Hr.createElement("template");return n.innerHTML=t,n}};function Gr(e,t,r=e,n){if(t===or)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=qn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Gr(e,s._$AS(e,t.values),s,n)),t}var Es=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Hr).importNode(r,!0);zr.currentNode=s;let o=zr.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new fn(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Ls(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=zr.nextNode(),a++)}return zr.currentNode=Hr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},fn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Mt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Gr(this,t,r),qn(t)?t===Mt||t==null||t===""?(this._$AH!==Mt&&this._$AR(),this._$AH=Mt):t!==this._$AH&&t!==or&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Gi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Mt&&qn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Hr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Fn.createElement(Ki(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Es(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Hi.get(t.strings);return r===void 0&&Hi.set(t.strings,r=new Fn(t)),r}k(t){Ko(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Nn()),this.O(Nn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Vr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Mt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Mt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Gr(this,t,r,0),a=!qn(t)||t!==this._$AH&&t!==or,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Gr(this,i[n+c],r,c),u===or&&(u=this._$AH[c]),a||(a=!qn(u)||u!==this._$AH[c]),u===Mt?t=Mt:t!==Mt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ts=class extends Vr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Mt?void 0:t}},Cs=class extends Vr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Mt)}},Rs=class extends Vr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Gr(this,t,r,0)??Mt)===or)return;let n=this._$AH,s=t===Mt&&n!==Mt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Mt&&(n===Mt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ls=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Gr(this,t)}},Zi={M:Go,P:vr,A:Vo,C:1,L:Yi,R:Es,D:Gi,V:Gr,I:fn,H:Vr,N:Cs,U:Rs,B:Ts,F:Ls},Ep=Dn.litHtmlPolyfillSupport;Ep?.(Fn,fn),(Dn.litHtmlVersions??(Dn.litHtmlVersions=[])).push("3.3.1");var Ye=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new fn(t.insertBefore(Nn(),o),o,void 0,r??{})}return s._$AI(e),s};var er="today",Rr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function ar(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Qi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Xi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ji(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function el(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var al=Ap(ol(),1);function Ct(e){return(0,al.default)(`beads-ui:${e}`)}function pr(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Zr(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function cl(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ul(e,t){let r=pr(e.updated_at),n=pr(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function dl(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=pr(e.created_at),o=pr(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function pl(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var jp=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function il(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ll(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=jp.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function fl(e,t){let r=il(e),n=il(t);if(r!==n)return r<n?-1:1;let s=ll(e),o=ll(t);if(s!==o)return s<o?-1:1;let a=pr(e&&e.created_at),i=pr(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Zo=2**20;function bn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-pr(e&&e.created_at)}function Ps(e){return(t,r)=>{let n=bn(t,e),s=bn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Qo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:bn(i,r)-Zo};if(!i)return{rank:bn(a,r)+Zo};let c=bn(a,r),u=bn(i,r),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:n.map((p,m)=>({bead_id:p.id,rank:m*Zo}))}}function Xo(e,t={}){let r=Ct(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||Zr;function u(){for(let m of Array.from(a))try{m()}catch{}}function d(){s=Array.from(n.values()).sort(c)}function p(m){if(i||!m||m.id!==e)return;let k=Number(m.revision)||0;if(r("apply %s rev=%d",m.type,k),!(k<=o&&m.type!=="snapshot")){if(m.type==="snapshot"){if(k<=o)return;n.clear();let T=Array.isArray(m.issues)?m.issues:[];for(let M of T)M&&typeof M.id=="string"&&M.id.length>0&&n.set(M.id,M);d(),o=k,u();return}if(m.type==="upsert"){let T=m.issue;if(T&&typeof T.id=="string"&&T.id.length>0){let M=n.get(T.id);if(!M)n.set(T.id,T);else{let H=Number.isFinite(M.updated_at)?M.updated_at:0,se=Number.isFinite(T.updated_at)?T.updated_at:0;if(H<=se){for(let V of Object.keys(M))V in T||delete M[V];for(let[V,q]of Object.entries(T))M[V]=q}}d()}o=k,u()}else if(m.type==="delete"){let T=String(m.issue_id||"");T&&(n.delete(T),d()),o=k,u()}}}return{id:e,subscribe(m){return a.add(m),()=>{a.delete(m)}},applyPush:p,snapshot(){return s},size(){return n.size},getById(m){return n.get(m)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function Ms(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function _l(e){let t=Ct("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],p=Array.isArray(c.updated)?c.updated:[],m=Array.isArray(c.removed)?c.removed:[];for(let k of Array.from(u)){let T=r.get(k);if(!T)continue;let M=T.itemsById;for(let H of d)typeof H=="string"&&H.length>0&&M.set(H,!0);for(let H of p)typeof H=="string"&&H.length>0&&M.set(H,!0);for(let H of m)typeof H=="string"&&H.length>0&&M.delete(H)}}async function o(i,c){let u=Ms(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let p=r.get(i);if(p&&p.key!==u){let m=n.get(p.key);m&&(m.delete(i),m.size===0&&n.delete(p.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let d=n.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(p){let m=r.get(i)||null;if(m){let k=n.get(m.key);k&&(k.delete(i),k.size===0&&n.delete(m.key))}throw r.delete(i),p}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let p=r.get(i)||null;if(p){let m=n.get(p.key);m&&(m.delete(i),m.size===0&&n.delete(p.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ms,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function ml(){let e=Ct("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,d){let p=u?Ms(u):"",m=r.get(c)||"",k=t.has(c);if(e("register %s key=%s (prev=%s)",c,p,m),k&&m&&p&&m!==p){let T=t.get(c);if(T)try{T.dispose()}catch{}let M=s.get(c);if(M){try{M()}catch{}s.delete(c)}let H=Xo(c,d);t.set(c,H);let se=H.subscribe(()=>o());s.set(c,se)}else if(!k){let T=Xo(c,d);t.set(c,T);let M=T.subscribe(()=>o());s.set(c,M)}return r.set(c,p),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function gl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function hl(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function bl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Jo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Bp(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Up(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function yl(e){let t=Ct("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Bp(n),a=Up(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Jo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Jo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Wp=Object.freeze({workspace_config:{default_workspace:null}});function vl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Wp.workspace_config.default_workspace}}}function wl(e={}){let t=Ct("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:vl(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?vl(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==r.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===r.worker.show_closed_children[d])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function kl(e){let t=Ct("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(p,m)=>{let k=s++,T=Date.now();n.set(k,{type:p,start_ts:T}),t("request start id=%d type=%s count=%d",k,p,r+1),a();let M=!1,H=()=>{M||(M=!0,n.delete(k),i())},se=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",k,p,Date.now()-T),H())},3e4);try{let V=await u(p,m),q=Date.now()-T;return t("request done id=%d type=%s elapsed=%dms",k,p,q),V}catch(V){let q=Date.now()-T;throw t("request error id=%d type=%s elapsed=%dms err=%o",k,p,q,V),V}finally{clearTimeout(se),H()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function me(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Ds(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(pl),c;switch(i){case"created_desc":return c.sort(Zr),c;case"created_asc":return c.sort(cl),c;case"updated_desc":return c.sort(ul),c;case"priority":return c.sort(dl),c;case"manual":default:{let u=r();return u?c.sort(Ps(u)):c.sort(Zr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Qr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ht(e){let t=Qr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function ir(e,t){let r=Qr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function $l(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Qr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Ns(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function qs(e){let t=new Map;for(let n of e)n&&n.id&&!t.has(n.id)&&t.set(n.id,n);let r=new Map;for(let n of t.values()){let s=Ns(n);if(!s)continue;let o=r.get(s);o||(o=[],r.set(s,o)),o.push({id:n.id,title:n.title,status:n.status,metadata:n.metadata,workflow:n.workflow,created_at:n.created_at,updated_at:n.updated_at})}return r}function Fs(e,t){let r=e.get(t)||[],n=0;for(let o of r)(o.status==="resolved"||o.status==="closed")&&(n+=1);let s=$l(r);return{total:r.length,count:n,current:s,children:r}}function js(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},d=n(Qo(i,c,u.order),a);s(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let m={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};r.set(m);let k=n(Qo(i,c,m.order),a);s(m,k);let T=await t("ui-order-set",{expected_revision:m.revision,entries:k});T&&T.applied&&r.set({revision:typeof T.revision=="number"?T.revision:0,order:T.order||{}})}else p&&p.applied&&r.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:o}}function Bs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ea(e,t){return!t||typeof e!="string"||e.length===0||Bs(t.visible_labels).includes(e)?!0:Bs(t.hidden_labels).includes(e)?!1:!Bs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function xl(e,t){return Bs(e).filter(r=>ea(r,t))}function Lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}function zp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Hp(e,t,r,n,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${n?"true":"false"}
    @click=${s}
  >
    children ${t}/${r} ${n?"\u25B4":"\u25BE"}
  </button>`}function Gp(e,t,r,n){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${n?s=>n(s,e.id):void 0}
  >
    <span class=${zp(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${r}
  </button>`}function Us(e,t){let r=e.total||0,n=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(r===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=r>0?a.slice().sort(fl):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?Hp(t.parent_id,e.count,r,n,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${r>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${n&&r>0?l`<div class="board-card__roll-list">
            ${i.map((c,u)=>Gp(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Vp={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Sl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Al={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Kp={review:"\u2713",skip:"\u2298"},Ir={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Yp(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function El(e){let t=e&&e.fill||"none";return t==="none"?Ir.none:e&&e.stale===!0?Ir.stale:t==="dim"?Ir.dim:e&&e.glyph==="review"?Ir.review:e&&e.glyph==="skip"?Ir.skip:Ir.done}function Zp(e){if(!e||e.fill==="none"||!e.approval_state)return El(e);let t=[];return e.glyph==="review"?t.push(Ir.review):e.glyph==="skip"&&t.push(Ir.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Qp(e,t,r){let n=Vp[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Kp[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Sl[e]||e}
      </div>
    </div>
  `}function yn(e,t){if(!e||!e.stages)return"";let r=Al[e.route]||Al.spec_backed,n=e.stages,s=Yp(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Sl[a]||a} ${a==="plan"?Zp(n[a]||{}):El(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Qp(a,n[a]||{},a===s))}
    </div>
  `}function Xp(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Tl=2;function Jp(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Tl).join(", "),s=r.length-Tl,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ta(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Cl(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Xr(e){return`${e.kind}:${Cl(e)}@${e.sha}`}function Ws(e,t){if(!e)return null;let r=ta(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=ta(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${Xr(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Rl(e,t){let r=Ws(e,t);return r?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function ef(e){if(!e)return null;let t=ta(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Xr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function tf(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Lr(r,"route")){let i=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&Lr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Lr(r,"pr")){let i=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Rl(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xr(i)}`}
        >${`exec ${i.kind==="delegated"?Cl(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of xl(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Lr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Lr(r,"blocked")&&s.push(...Jp(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Lr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function rf(e){let t=ir(e.created_at),r=ir(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function nf(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Us(r,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:rf(e),empty_label:"children \uC5C6\uC74C",childChips:ra,onToggle:n=>t.onRollupToggle&&t.onRollupToggle(n,e.id),onChildClick:(n,s)=>t.onChildClick&&t.onChildClick(n,s)})}function ra(e){let t=e?.workflow?.chips?.planned_execution,r=e?.workflow?.chips?.exec_receipt;return Ws(t,r)?l`<span class="board-card__roll-child-chips">
    ${Rl(t,r)}
    ${ef(r)}
  </span>`:null}function zs(e,t){let r=Xp(e.priority);return l`
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
      ${tf(e,t)}
      ${e.workflow&&Lr(t.policy||null,"stepper")?yn(e.workflow,e.status):""}
      ${nf(e,t)}
    </article>
  `}function vn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
              ${Rr.map(o=>l`<option
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
        ${e.items.map(o=>zs(o,t))}
      </div>
    </section>
  `}function Ll(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>zs(n,t))}
        </div>
      </div>
    </dialog>
  `}var sf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],of=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],af=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function lf(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function Il(e,t,r){return l`
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
        ${sf.map(n=>l`<option
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
        ${of.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${lf(e,t,r)}
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
        ${af.map(n=>l`<option
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
  `}var cf=200,uf={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},df=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ol="beads-ui.board.sort",Pl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function pf(){try{let e=window.localStorage.getItem(Ol);if(e&&Pl.has(e))return e}catch{}return"created_desc"}function Ml(e,t){let r=Ct("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.closedRange||er,m=s?Ds(s,a):null,k=js({transport:o,uiOrderStore:a}),T=[],M=[],H=[],se=[],V=[],q=[],I=!1,O=0,R=pf(),A=new Map,D=new Map,G=new Map,pe=new Set,fe={search:"",priority:"",type:"",labels:[]},_e=!1,ae=null;function Le(F){return String(F.status||"open")==="open"}function Te(F){let ne=String(F.status||"open");return ne==="open"||ne==="blocked"}function ee(F){let ne=fe.search.trim().toLowerCase(),ve=fe.priority,w=fe.type,C=fe.labels;return F.filter(B=>{if(ne){let ie=String(B.id||"").toLowerCase(),Ce=String(B.title||"").toLowerCase();if(!ie.includes(ne)&&!Ce.includes(ne))return!1}if(ve!==""&&String(B.priority)!==ve||w!==""&&String(B.issue_type||"")!==w)return!1;if(C.length>0){let ie=Array.isArray(B.labels)?B.labels:[];if(!C.some(Ce=>ie.includes(Ce)))return!1}return!0})}function oe(){let F=new Set;for(let ne of[T,M,H,se,V,q])for(let ve of ne){let w=Array.isArray(ve.labels)?ve.labels:[];for(let C of w)typeof C=="string"&&C.length>0&&F.add(C)}return Array.from(F).sort()}function xe(){return fe.search.trim()!==""||fe.priority!==""||fe.type!==""||fe.labels.length>0}function g(){try{if(m){let F=m.selectBoardColumn("tab:board:in-progress","in_progress",R),ne=m.selectBoardColumn("tab:board:blocked","blocked",R).filter(Te),ve=new Set(F.map(Be=>Be.id)),w=m.selectBoardColumn("tab:board:ready","ready",R).filter(Be=>Le(Be)&&!ve.has(Be.id)),C=m.selectBoardColumn("tab:board:resolved","resolved",R),B=m.selectBoardColumn("tab:board:deferred","deferred",R),ie=m.selectBoardColumn("tab:board:closed","closed").slice(0,cf),Ce=[...ne,...w,...F,...C,...ie];j(Ce);let Ae=new Set;for(let Be of Ce)Be&&Be.id&&!Ns(Be)&&Ae.add(Be.id);let Pe=!xe();T=Pe?jn(ne,Ae):ne,M=Pe?jn(w,Ae):w,H=Pe?jn(F,Ae):F,se=Pe?jn(C,Ae):C,V=B,O=B.length,q=Pe?jn(ie,Ae):ie,A=new Map;for(let Be of T)A.set(Be.id,"open");for(let Be of M)A.set(Be.id,"open");for(let Be of H)A.set(Be.id,"in_progress");for(let Be of se)A.set(Be.id,"resolved");for(let Be of V)A.set(Be.id,"deferred");for(let Be of q)A.set(Be.id,"closed");D=new Map;for(let Be of T)D.set(Be.id,"blocked-col");for(let Be of M)D.set(Be.id,"ready-col");for(let Be of H)D.set(Be.id,"in-progress-col");for(let Be of se)D.set(Be.id,"resolved-col");for(let Be of q)D.set(Be.id,"closed-col")}Xe()}catch{T=[],M=[],H=[],se=[],V=[],q=[],G=new Map,Xe()}}function j(F){G=qs(F)}function U(F){return Fs(G,F)}function K(F){return!pe.has(F)}function ge(F,ne){F.preventDefault(),F.stopPropagation(),pe.has(ne)?pe.delete(ne):pe.add(ne),Xe()}function we(F,ne){F.preventDefault(),F.stopPropagation(),n(ne)}function ke(F,ne){F.preventDefault(),F.stopPropagation(),n(ne)}function Ze(F,ne){ae||n(ne)}function wt(F,ne){F.preventDefault(),F.stopPropagation(),ff(ne).then(ve=>{ve&&me("\uBCF5\uC0AC\uB428","success",1200)})}function He(F,ne){ae=ne,F.dataTransfer&&(F.dataTransfer.setData("text/plain",ne),F.dataTransfer.effectAllowed="move"),F.target.classList.add("board-card--dragging")}function pt(F){F.target.classList.remove("board-card--dragging"),kt(),setTimeout(()=>{ae=null},0)}function st(F){let ne=String(F.target.value||"");!ne||ne===p||(p=ne,u&&u(ne),Xe())}function Y(){return i?i.get():null}function Z(F){let ne=c?c.get():null,ve=ne?ne.cleanup_failed:null;if(!ve||typeof ve!="object"||Array.isArray(ve))return null;let w=ve[F];return!w||typeof w!="object"||Array.isArray(w)?null:w}let Se={onCardClick:Ze,onCopyId:wt,onDragStart:He,onDragEnd:pt,onClosedRangeChange:st,rollupFor:U,isExpanded:K,onRollupToggle:ge,onChildClick:we,onFromChipClick:ke,cleanupFailureFor:Z,get policy(){return Y()}};function Qe(F,ne){ae||(re(),n(ne))}function je(F,ne){F.preventDefault(),F.stopPropagation(),re(),n(ne)}let ot={...Se,onCardClick:Qe,onChildClick:je,onFromChipClick:je,get policy(){return Y()}};function Je(F){let ne=F.target,ve=e.querySelector(".board-filter__labels");ne&&ve&&ve.contains(ne)||E()}function yt(F){F.key==="Escape"&&E()}function Ie(){_e||(_e=!0,document.addEventListener("mousedown",Je),document.addEventListener("keydown",yt),Xe())}function E(){_e&&(_e=!1,document.removeEventListener("mousedown",Je),document.removeEventListener("keydown",yt),Xe())}function Q(F){F.key==="Escape"&&re()}function Ee(){I||(I=!0,document.addEventListener("keydown",Q),Xe())}function re(){I&&(I=!1,document.removeEventListener("keydown",Q),Xe())}let qe={onClose:re,onOverlayClick(F){F.target===F.currentTarget&&re()}},rt={onSearchInput(F){fe.search=String(F.target.value||""),g()},onPriorityChange(F){fe.priority=String(F.target.value||""),g()},onTypeChange(F){fe.type=String(F.target.value||""),g()},onSortChange(F){let ne=String(F.target.value||"");if(!(!Pl.has(ne)||ne===R)){R=ne;try{window.localStorage.setItem(Ol,ne)}catch{}g()}},onDeferredToggle(){I?re():Ee()},onLabelMenuToggle(){_e?E():Ie()},onLabelToggle(F){let ne=fe.labels.indexOf(F);ne===-1?fe.labels.push(F):fe.labels.splice(ne,1),g()},onLabelClear(){fe.labels.length!==0&&(fe.labels=[],g())},onNewIssue(){d&&d()}};function it(){return l`
      <div class="board-view">
        ${Il(fe,rt,{sort_mode:R,deferred_popup_open:I,deferred_count:O,label_options:oe(),label_menu_open:_e})}
        <div class="board-root">
          ${vn({title:"Blocked",id:"blocked-col",items:ee(T)},Se)}
          ${vn({title:"Ready",id:"ready-col",items:ee(M)},Se)}
          ${vn({title:"In progress",id:"in-progress-col",items:ee(H)},Se)}
          ${vn({title:"Resolved",id:"resolved-col",items:ee(se)},Se)}
          ${vn({title:"Closed",id:"closed-col",items:ee(q),is_closed:!0,closed_range:p},Se)}
        </div>
        ${I?Ll({items:ee(V),count:O},ot,qe):""}
      </div>
    `}function Xe(){Ye(it(),e),nt()}function nt(){try{let F=e.querySelector("#deferred-popup");F&&!F.open&&(typeof F.showModal=="function"?F.showModal():F.setAttribute("open",""));let ne=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ve of ne)Array.from(ve.querySelectorAll(".board-card")).forEach((C,B)=>{C.tabIndex=B===0?0:-1})}catch{}}async function _t(F,ne){if(!o){me("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:F,status:ne}),me("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ve){r("update-status failed: %o",ve),me("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ht(F){switch(F){case"blocked-col":return T;case"ready-col":return M;case"in-progress-col":return H;case"resolved-col":return se;default:return[]}}function at(F,ne,ve){if(!o||!a)return;let w=ht(F),C=w.find(Pe=>Pe.id===ne);if(!C)return;let B=w.filter(Pe=>Pe.id!==ne),ie=ve.closest?ve.closest(".board-card"):null,Ce=B.length;if(ie){let Pe=ie.getAttribute("data-issue-id");if(Pe===ne)return;let Be=B.findIndex(St=>St.id===Pe);Be>=0&&(Ce=Be)}let Ae=B.slice();Ae.splice(Ce,0,C),k.applyReorder(ne,Ae,Ce)}function kt(){for(let F of Array.from(e.querySelectorAll(".board-column--drag-over")))F.classList.remove("board-column--drag-over")}let N=null;e.addEventListener("dragover",F=>{F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move");let ve=F.target.closest(".board-column");ve&&ve!==N&&(N&&N.classList.remove("board-column--drag-over"),ve.classList.add("board-column--drag-over"),N=ve)}),e.addEventListener("dragleave",F=>{let ne=F.relatedTarget;(!ne||!e.contains(ne))&&N&&(N.classList.remove("board-column--drag-over"),N=null)}),e.addEventListener("drop",F=>{F.preventDefault(),N&&(N.classList.remove("board-column--drag-over"),N=null);let ne=F.target,ve=ne.closest(".board-column");if(!ve)return;let w=F.dataTransfer?.getData("text/plain")||"";if(!w)return;let C=ve.id,B=D.get(w);if(B&&B===C){if(df.has(C)){if(R!=="manual"){me("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}at(C,w,ne)}return}let ie=uf[C];if(!ie){me("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}A.get(w)!==ie&&_t(w,ie)}),e.addEventListener("keydown",F=>{let ne=F.target;if(!(ne instanceof HTMLElement))return;let ve=String(ne.tagName||"").toLowerCase();if(ve==="input"||ve==="textarea"||ve==="select"||ve==="button"||ve==="a"||ne.isContentEditable===!0)return;let w=ne.closest(".board-card");if(!w)return;let C=String(F.key||"");if(C==="Enter"||C===" "){F.preventDefault();let Ae=w.getAttribute("data-issue-id");Ae&&n(Ae);return}if(C!=="ArrowUp"&&C!=="ArrowDown"&&C!=="ArrowLeft"&&C!=="ArrowRight")return;F.preventDefault();let B=w.closest(".board-column");if(!B)return;let ie=Array.from(B.querySelectorAll(".board-card")),Ce=ie.indexOf(w);if(C==="ArrowDown"&&Ce<ie.length-1){te(w,ie[Ce+1]);return}if(C==="ArrowUp"&&Ce>0){te(w,ie[Ce-1]);return}if(C==="ArrowLeft"||C==="ArrowRight"){let Ae=Array.from(e.querySelectorAll(".board-column")),Pe=Ae.indexOf(B),Be=C==="ArrowRight"?1:-1,St=Pe+Be;for(;St>=0&&St<Ae.length;){let bt=Ae[St].querySelector(".board-card");if(bt){te(w,bt);return}St+=Be}}});function te(F,ne){try{F.tabIndex=-1,ne.tabIndex=0,ne.focus()}catch{}}let he=null;m&&m.subscribe&&(he=m.subscribe(()=>{try{g()}catch{}}));let ze=null;i&&i.subscribe&&(ze=i.subscribe(()=>{try{g()}catch{}}));let De=null;return c&&c.subscribe&&(De=c.subscribe(()=>{Xe()})),{async load(){r("load"),g()},clear(){E(),re(),he&&(he(),he=null),ze&&(ze(),ze=null),De&&(De(),De=null),e.replaceChildren(),T=[],M=[],H=[],se=[],V=[],q=[],A=new Map,D=new Map}}}function jn(e,t){return e.filter(r=>{let n=Ns(r);return!(n&&t.has(n))})}async function ff(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function tr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Jr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Bn(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function _f(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Jr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Jr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=d=>{typeof r.close=="function"&&r.close(),r.remove(),c(d)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function wr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await _f(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var mf=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Dl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},gf=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Bt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function It(e){return typeof e=="string"&&e.length>0?e:null}function wn(e){return e.startsWith("gpt-")?e.slice(4):e}function Tt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function ql(e,t,r){let n=It(t[e]);if(n!==null)return{value:n,source:"pin"};let s=It(r[e]);return s===null?null:{value:s,source:"global"}}function Un(e,t,r,n){return ql(e,t,r)||{value:n,source:"base"}}function na(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Bt(s?.[t])){let a=It(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Bt(s)){for(let a of Object.values(s))if(Bt(a)){let i=It(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return It(n?.runners?.[o]?.models?.[e]?.id)||e}function hf(e,t){return It(t?.review?.reviewers?.[e]?.model)||e}function kn(e,t,r=!1){if(e==="default")return Tt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?wn(e):e;return Tt(e,t,n,e,"explicit")}function Fl(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Bt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Bt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function bf(e,t){let r=[],n=e?.implementation?.model_catalog;Bt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(Bt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function yf(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of bf(t,r)){let o=Fl(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function sa(e){return Tt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Nl(e,t,r){let n=ql(e,t,r);return n?kn(n.value,n.source):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Qt(e){let t=Bt(e.pin)?e.pin:{},r=Bt(e.global)?e.global:{},n=Bt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Bt(n.session)?n.session:null,o=n?.supported===!0&&Bt(n.orchestration)?n.orchestration:null,a=Bt(e.runner_catalog)?e.runner_catalog:null,i=It(r.quick_fix_impl_model),c=yf(i,s,a),u={};if(s){let d=Un("workflow_mode",t,r,It(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Tt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):kn(d.value,d.source);for(let q of["spec_review","plan_review","impl_review"]){let I=`${q}_model`,O=It(q==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),R=Un(I,t,r,O);if(R.value===null)u[I]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(R.value!=="self"&&R.value!=="skip"&&!Bt(s.review?.reviewers?.[R.value]))u[I]=sa(Tt(R.value,R.source,"",null,"explicit"));else{let A=hf(R.value,s);u[I]=Tt(R.value,R.source,wn(A),A,R.source==="base"?"default":"explicit")}}for(let[q,I]of Object.entries(Dl)){let O=u[I].value;if(O==="self"||O==="skip"){u[q]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let R=It(s.review?.reviewers?.[O||""]?.effort),A=Un(q,t,r,R);u[q]=A.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(A.value,A.source,A.value,A.value,A.source==="base"?"default":"explicit")}let p=Bt(s.implementation?.default)?s.implementation.default:{},m=It(e.route),k=m!==null&&["quick_fix","spec_backed","full_plan"].includes(m),T=Bt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},M=k&&Bt(T[m])?T[m]:{};for(let q of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let I=Un(q,t,r,q==="impl_dispatch"?It(M.dispatch)||It(p.dispatch):It(p[q.replace("impl_","")]));u[q]=I.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(I.value,I.source,I.value,I.value,I.source==="base"?"default":"explicit")}let H=It(t.impl_runtime),se=H==="inherit"?It(e.controller_runtime):H,V=m==="quick_fix"&&It(t.impl_dispatch)===null&&c.runtime!==null&&(H===null||se===c.runtime);if(V){let q=c.runtime,I=i;u.impl_dispatch=Tt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),H===null&&(u.impl_runtime=Tt(q,"global",`${q} (\uC720\uB3C4)`,q,"explicit")),It(t.impl_model)===null&&(u.impl_model=Tt(I,"global",I,I,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let q of["impl_runtime","impl_model","impl_effort","impl_speed"])u[q]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!V&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let q=u.impl_runtime.value==="inherit"?It(e.controller_runtime):u.impl_runtime.value,I=q?Fl(q,s,a):[];if(u.impl_model.value!=="auto"&&I.length>0&&!I.includes(u.impl_model.value))u.impl_model=sa(u.impl_model);else{let O=na(u.impl_model.value,q,s,a);u.impl_model.display=wn(O),u.impl_model.full_value=O}}if(u.impl_effort.value==="auto"){let q=It(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),I=q?It(s.implementation?.effort_by_transport?.[q]?.auto):null;I&&!gf.has(I)?(u.impl_effort.display=`${I} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=I,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",u.impl_speed.source))}}else for(let d of mf.filter(p=>!p.startsWith("orchestration_")))u[d]=Nl(d,t,r);if(!s){for(let[d,p]of Object.entries(Dl))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=Nl(d,t,r);continue}let p=d.replace("orchestration_",""),m=It(o[p]),k=Un(d,t,r,m);if(d==="orchestration_effort"&&k.source==="base"){u[d]=Tt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(k.value===null){u[d]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let T=k.source==="base"?It(o.model_id)||k.value:na(k.value,null,s,a);u[d]=Tt(k.value,k.source,wn(T),T,k.source==="base"?"default":"explicit");continue}if(k.value==="default"){u[d]=k.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",k.source);continue}u[d]=kn(k.value,k.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Tt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${wn(d)})`,null,"default")}else if(c.runtime!==null){let d=na(i,c.runtime,s,a);u.quick_fix_impl_model=Tt(i,"global",wn(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=sa(Tt(i,"global","",null,"explicit")):u.quick_fix_impl_model=kn(i,"global");return u}function vf(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function Hs(e){let t=Bt(e.pin)?e.pin:{},r=Bt(e.global)?e.global:{},n=Bt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=p=>{let m={...n,...p};return Qt({pin:e.layer==="pin"?m:t,global:e.layer==="pin"?r:m,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=It(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:vf(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(p=>{let m=s({...o,[e.key]:p})[e.key];return{value:p,label:m.display,full_value:m.full_value}})}}function $n(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let c=!1,u=p=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(p))},d=()=>u(n.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var zl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Wt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var kr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Wn=[...kr,"reasoning_output_tokens"],wf=["implementation","review-consult"];function oa(e){let t=0;for(let r of kr)t+=Wt(e?.[r]);return t}function kf(e){return!e||typeof e!="object"?!1:kr.some(t=>Number.isFinite(e[t]))}function jl(e){return!e||typeof e!="object"?!1:Wn.some(t=>Number.isFinite(e[t]))}function $f(e){let t={};for(let r of Wn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Bl(e){let t={};for(let r of Wn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ul(e,t){return e==="codex"?Wt(t.input_tokens)+Wt(t.output_tokens):oa(t)}function xf(e){return e==="claude"?"Claude":"Codex"}function Af(e){return`\u03C4 ${Hl(e)}`}function Sf(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${Wt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Wt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Wt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Wt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Wt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Wt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${Wt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(zl),o.join(`
`)}function zt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${xf(r)} ${Af(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Sf(r,n)})}return t}function Vs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of Wn)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Wt(i.breakdown[c])+Wt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function aa(e){return!e||typeof e!="object"?null:lr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Ef(e){return e==="codex"?"codex":"claude"}function Or(){return{subtotal:0,breakdown:$f(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Gs(e,t,r){e.subtotal+=t.subtotal;for(let n of Wn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Wt(e.breakdown[n])+Wt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Wl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Hl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function xn(e){return kf(e)?`\u03C4 ${Hl(oa(e))}`:null}function $r(e){let t=xn(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function zn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Wt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Wt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Wt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Wt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${oa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(zl),r.join(`
`)}function lr(e,t){let r={claude:Or(),codex:Or()},n={orchestrator:{claude:Or(),codex:Or()},implementation:{claude:Or(),codex:Or()},"review-consult":{claude:Or(),codex:Or()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(jl(c)){let d=Ef(i.runner),p=Bl(c),m={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:p,subtotal:Ul(d,p)};p.replayed===!0&&(m.replayed=!0),typeof i.model=="string"&&(m.model=i.model),typeof i.session_id=="string"&&(m.session_id=i.session_id),Gs(r[d],m,!0),Gs(n.orchestrator[d],m,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){if(!d||d.provider!=="codex"||!wf.includes(d.role)||!jl(d.usage))continue;let p=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!p||s.has(p))continue;s.add(p);let m=Bl(d.usage),k={provider:"codex",role:d.role,attempt_id:String(i.attempt_id||""),usage:m,subtotal:Ul("codex",m)};k.receipt_id=p,typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),typeof d.completed_at=="string"&&(k.completed_at=d.completed_at),m.replayed===!0&&(k.replayed=!0),Gs(r.codex,k,!1),Gs(n[k.role].codex,k,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=Wl(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let d=n[i][u];d.legs.length>0&&(c[u]={...Wl(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:ec,setPrototypeOf:Gl,isFrozen:Tf,getPrototypeOf:Cf,getOwnPropertyDescriptor:Rf}=Object,{freeze:Vt,seal:cr,create:fa}=Object,{apply:_a,construct:ma}=typeof Reflect<"u"&&Reflect;Vt||(Vt=function(t){return t});cr||(cr=function(t){return t});_a||(_a=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ma||(ma=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Ks=Kt(Array.prototype.forEach),Lf=Kt(Array.prototype.lastIndexOf),Vl=Kt(Array.prototype.pop),Hn=Kt(Array.prototype.push),If=Kt(Array.prototype.splice),Zs=Kt(String.prototype.toLowerCase),ia=Kt(String.prototype.toString),la=Kt(String.prototype.match),Gn=Kt(String.prototype.replace),Of=Kt(String.prototype.indexOf),Pf=Kt(String.prototype.trim),fr=Kt(Object.prototype.hasOwnProperty),Gt=Kt(RegExp.prototype.test),Vn=Mf(TypeError);function Kt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return _a(e,t,n)}}function Mf(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ma(e,r)}}function ct(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Zs;Gl&&Gl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Tf(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Df(e){for(let t=0;t<e.length;t++)fr(e,t)||(e[t]=null);return e}function xr(e){let t=fa(null);for(let[r,n]of ec(e))fr(e,r)&&(Array.isArray(n)?t[r]=Df(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=xr(n):t[r]=n);return t}function Kn(e,t){for(;e!==null;){let n=Rf(e,t);if(n){if(n.get)return Kt(n.get);if(typeof n.value=="function")return Kt(n.value)}e=Cf(e)}function r(){return null}return r}var Kl=Vt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ca=Vt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ua=Vt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Nf=Vt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),da=Vt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),qf=Vt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Yl=Vt(["#text"]),Zl=Vt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),pa=Vt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ql=Vt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ys=Vt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ff=cr(/\{\{[\w\W]*|[\w\W]*\}\}/gm),jf=cr(/<%[\w\W]*|[\w\W]*%>/gm),Bf=cr(/\$\{[\w\W]*/gm),Uf=cr(/^data-[\-\w.\u00B7-\uFFFF]+$/),Wf=cr(/^aria-[\-\w]+$/),tc=cr(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),zf=cr(/^(?:\w+script|data):/i),Hf=cr(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),rc=cr(/^html$/i),Gf=cr(/^[a-z][.\w]*(-[.\w]+)+$/i),Xl=Object.freeze({__proto__:null,ARIA_ATTR:Wf,ATTR_WHITESPACE:Hf,CUSTOM_ELEMENT:Gf,DATA_ATTR:Uf,DOCTYPE_NAME:rc,ERB_EXPR:jf,IS_ALLOWED_URI:tc,IS_SCRIPT_OR_DATA:zf,MUSTACHE_EXPR:Ff,TMPLIT_EXPR:Bf}),Yn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Vf=function(){return typeof window>"u"?null:window},Kf=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Jl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function nc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Vf(),t=Fe=>nc(Fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Yn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:m,trustedTypes:k}=e,T=c.prototype,M=Kn(T,"cloneNode"),H=Kn(T,"remove"),se=Kn(T,"nextSibling"),V=Kn(T,"childNodes"),q=Kn(T,"parentNode");if(typeof a=="function"){let Fe=r.createElement("template");Fe.content&&Fe.content.ownerDocument&&(r=Fe.content.ownerDocument)}let I,O="",{implementation:R,createNodeIterator:A,createDocumentFragment:D,getElementsByTagName:G}=r,{importNode:pe}=n,fe=Jl();t.isSupported=typeof ec=="function"&&typeof q=="function"&&R&&R.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:_e,ERB_EXPR:ae,TMPLIT_EXPR:Le,DATA_ATTR:Te,ARIA_ATTR:ee,IS_SCRIPT_OR_DATA:oe,ATTR_WHITESPACE:xe,CUSTOM_ELEMENT:g}=Xl,{IS_ALLOWED_URI:j}=Xl,U=null,K=ct({},[...Kl,...ca,...ua,...da,...Yl]),ge=null,we=ct({},[...Zl,...pa,...Ql,...Ys]),ke=Object.seal(fa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ze=null,wt=null,He=Object.seal(fa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),pt=!0,st=!0,Y=!1,Z=!0,Se=!1,Qe=!0,je=!1,ot=!1,Je=!1,yt=!1,Ie=!1,E=!1,Q=!0,Ee=!1,re="user-content-",qe=!0,rt=!1,it={},Xe=null,nt=ct({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),_t=null,ht=ct({},["audio","video","img","source","image","track"]),at=null,kt=ct({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),N="http://www.w3.org/1998/Math/MathML",te="http://www.w3.org/2000/svg",he="http://www.w3.org/1999/xhtml",ze=he,De=!1,F=null,ne=ct({},[N,te,he],ia),ve=ct({},["mi","mo","mn","ms","mtext"]),w=ct({},["annotation-xml"]),C=ct({},["title","style","font","a","script"]),B=null,ie=["application/xhtml+xml","text/html"],Ce="text/html",Ae=null,Pe=null,Be=r.createElement("form"),St=function(S){return S instanceof RegExp||S instanceof Function},bt=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Pe&&Pe===S)){if((!S||typeof S!="object")&&(S={}),S=xr(S),B=ie.indexOf(S.PARSER_MEDIA_TYPE)===-1?Ce:S.PARSER_MEDIA_TYPE,Ae=B==="application/xhtml+xml"?ia:Zs,U=fr(S,"ALLOWED_TAGS")?ct({},S.ALLOWED_TAGS,Ae):K,ge=fr(S,"ALLOWED_ATTR")?ct({},S.ALLOWED_ATTR,Ae):we,F=fr(S,"ALLOWED_NAMESPACES")?ct({},S.ALLOWED_NAMESPACES,ia):ne,at=fr(S,"ADD_URI_SAFE_ATTR")?ct(xr(kt),S.ADD_URI_SAFE_ATTR,Ae):kt,_t=fr(S,"ADD_DATA_URI_TAGS")?ct(xr(ht),S.ADD_DATA_URI_TAGS,Ae):ht,Xe=fr(S,"FORBID_CONTENTS")?ct({},S.FORBID_CONTENTS,Ae):nt,Ze=fr(S,"FORBID_TAGS")?ct({},S.FORBID_TAGS,Ae):xr({}),wt=fr(S,"FORBID_ATTR")?ct({},S.FORBID_ATTR,Ae):xr({}),it=fr(S,"USE_PROFILES")?S.USE_PROFILES:!1,pt=S.ALLOW_ARIA_ATTR!==!1,st=S.ALLOW_DATA_ATTR!==!1,Y=S.ALLOW_UNKNOWN_PROTOCOLS||!1,Z=S.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Se=S.SAFE_FOR_TEMPLATES||!1,Qe=S.SAFE_FOR_XML!==!1,je=S.WHOLE_DOCUMENT||!1,yt=S.RETURN_DOM||!1,Ie=S.RETURN_DOM_FRAGMENT||!1,E=S.RETURN_TRUSTED_TYPE||!1,Je=S.FORCE_BODY||!1,Q=S.SANITIZE_DOM!==!1,Ee=S.SANITIZE_NAMED_PROPS||!1,qe=S.KEEP_CONTENT!==!1,rt=S.IN_PLACE||!1,j=S.ALLOWED_URI_REGEXP||tc,ze=S.NAMESPACE||he,ve=S.MATHML_TEXT_INTEGRATION_POINTS||ve,w=S.HTML_INTEGRATION_POINTS||w,ke=S.CUSTOM_ELEMENT_HANDLING||{},S.CUSTOM_ELEMENT_HANDLING&&St(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ke.tagNameCheck=S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),S.CUSTOM_ELEMENT_HANDLING&&St(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ke.attributeNameCheck=S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),S.CUSTOM_ELEMENT_HANDLING&&typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ke.allowCustomizedBuiltInElements=S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Se&&(st=!1),Ie&&(yt=!0),it&&(U=ct({},Yl),ge=[],it.html===!0&&(ct(U,Kl),ct(ge,Zl)),it.svg===!0&&(ct(U,ca),ct(ge,pa),ct(ge,Ys)),it.svgFilters===!0&&(ct(U,ua),ct(ge,pa),ct(ge,Ys)),it.mathMl===!0&&(ct(U,da),ct(ge,Ql),ct(ge,Ys))),S.ADD_TAGS&&(typeof S.ADD_TAGS=="function"?He.tagCheck=S.ADD_TAGS:(U===K&&(U=xr(U)),ct(U,S.ADD_TAGS,Ae))),S.ADD_ATTR&&(typeof S.ADD_ATTR=="function"?He.attributeCheck=S.ADD_ATTR:(ge===we&&(ge=xr(ge)),ct(ge,S.ADD_ATTR,Ae))),S.ADD_URI_SAFE_ATTR&&ct(at,S.ADD_URI_SAFE_ATTR,Ae),S.FORBID_CONTENTS&&(Xe===nt&&(Xe=xr(Xe)),ct(Xe,S.FORBID_CONTENTS,Ae)),qe&&(U["#text"]=!0),je&&ct(U,["html","head","body"]),U.table&&(ct(U,["tbody"]),delete Ze.tbody),S.TRUSTED_TYPES_POLICY){if(typeof S.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof S.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=S.TRUSTED_TYPES_POLICY,O=I.createHTML("")}else I===void 0&&(I=Kf(k,s)),I!==null&&typeof O=="string"&&(O=I.createHTML(""));Vt&&Vt(S),Pe=S}},Ke=ct({},[...ca,...ua,...Nf]),Ft=ct({},[...da,...qf]),v=function(S){let ue=q(S);(!ue||!ue.tagName)&&(ue={namespaceURI:ze,tagName:"template"});let Oe=Zs(S.tagName),mt=Zs(ue.tagName);return F[S.namespaceURI]?S.namespaceURI===te?ue.namespaceURI===he?Oe==="svg":ue.namespaceURI===N?Oe==="svg"&&(mt==="annotation-xml"||ve[mt]):!!Ke[Oe]:S.namespaceURI===N?ue.namespaceURI===he?Oe==="math":ue.namespaceURI===te?Oe==="math"&&w[mt]:!!Ft[Oe]:S.namespaceURI===he?ue.namespaceURI===te&&!w[mt]||ue.namespaceURI===N&&!ve[mt]?!1:!Ft[Oe]&&(C[Oe]||!Ke[Oe]):!!(B==="application/xhtml+xml"&&F[S.namespaceURI]):!1},y=function(S){Hn(t.removed,{element:S});try{q(S).removeChild(S)}catch{H(S)}},L=function(S,ue){try{Hn(t.removed,{attribute:ue.getAttributeNode(S),from:ue})}catch{Hn(t.removed,{attribute:null,from:ue})}if(ue.removeAttribute(S),S==="is")if(yt||Ie)try{y(ue)}catch{}else try{ue.setAttribute(S,"")}catch{}},X=function(S){let ue=null,Oe=null;if(Je)S="<remove></remove>"+S;else{let xt=la(S,/^[\r\n\t ]+/);Oe=xt&&xt[0]}B==="application/xhtml+xml"&&ze===he&&(S='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+S+"</body></html>");let mt=I?I.createHTML(S):S;if(ze===he)try{ue=new m().parseFromString(mt,B)}catch{}if(!ue||!ue.documentElement){ue=R.createDocument(ze,"template",null);try{ue.documentElement.innerHTML=De?O:mt}catch{}}let Dt=ue.body||ue.documentElement;return S&&Oe&&Dt.insertBefore(r.createTextNode(Oe),Dt.childNodes[0]||null),ze===he?G.call(ue,je?"html":"body")[0]:je?ue.documentElement:Dt},be=function(S){return A.call(S.ownerDocument||S,S,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},ye=function(S){return S instanceof p&&(typeof S.nodeName!="string"||typeof S.textContent!="string"||typeof S.removeChild!="function"||!(S.attributes instanceof d)||typeof S.removeAttribute!="function"||typeof S.setAttribute!="function"||typeof S.namespaceURI!="string"||typeof S.insertBefore!="function"||typeof S.hasChildNodes!="function")},Ne=function(S){return typeof i=="function"&&S instanceof i};function Me(Fe,S,ue){Ks(Fe,Oe=>{Oe.call(t,S,ue,Pe)})}let ft=function(S){let ue=null;if(Me(fe.beforeSanitizeElements,S,null),ye(S))return y(S),!0;let Oe=Ae(S.nodeName);if(Me(fe.uponSanitizeElement,S,{tagName:Oe,allowedTags:U}),Qe&&S.hasChildNodes()&&!Ne(S.firstElementChild)&&Gt(/<[/\w!]/g,S.innerHTML)&&Gt(/<[/\w!]/g,S.textContent)||S.nodeType===Yn.progressingInstruction||Qe&&S.nodeType===Yn.comment&&Gt(/<[/\w]/g,S.data))return y(S),!0;if(!(He.tagCheck instanceof Function&&He.tagCheck(Oe))&&(!U[Oe]||Ze[Oe])){if(!Ze[Oe]&&jt(Oe)&&(ke.tagNameCheck instanceof RegExp&&Gt(ke.tagNameCheck,Oe)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(Oe)))return!1;if(qe&&!Xe[Oe]){let mt=q(S)||S.parentNode,Dt=V(S)||S.childNodes;if(Dt&&mt){let xt=Dt.length;for(let Nt=xt-1;Nt>=0;--Nt){let f=M(Dt[Nt],!0);f.__removalCount=(S.__removalCount||0)+1,mt.insertBefore(f,se(S))}}}return y(S),!0}return S instanceof c&&!v(S)||(Oe==="noscript"||Oe==="noembed"||Oe==="noframes")&&Gt(/<\/no(script|embed|frames)/i,S.innerHTML)?(y(S),!0):(Se&&S.nodeType===Yn.text&&(ue=S.textContent,Ks([_e,ae,Le],mt=>{ue=Gn(ue,mt," ")}),S.textContent!==ue&&(Hn(t.removed,{element:S.cloneNode()}),S.textContent=ue)),Me(fe.afterSanitizeElements,S,null),!1)},$t=function(S,ue,Oe){if(Q&&(ue==="id"||ue==="name")&&(Oe in r||Oe in Be))return!1;if(!(st&&!wt[ue]&&Gt(Te,ue))){if(!(pt&&Gt(ee,ue))){if(!(He.attributeCheck instanceof Function&&He.attributeCheck(ue,S))){if(!ge[ue]||wt[ue]){if(!(jt(S)&&(ke.tagNameCheck instanceof RegExp&&Gt(ke.tagNameCheck,S)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(S))&&(ke.attributeNameCheck instanceof RegExp&&Gt(ke.attributeNameCheck,ue)||ke.attributeNameCheck instanceof Function&&ke.attributeNameCheck(ue,S))||ue==="is"&&ke.allowCustomizedBuiltInElements&&(ke.tagNameCheck instanceof RegExp&&Gt(ke.tagNameCheck,Oe)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(Oe))))return!1}else if(!at[ue]){if(!Gt(j,Gn(Oe,xe,""))){if(!((ue==="src"||ue==="xlink:href"||ue==="href")&&S!=="script"&&Of(Oe,"data:")===0&&_t[S])){if(!(Y&&!Gt(oe,Gn(Oe,xe,"")))){if(Oe)return!1}}}}}}}return!0},jt=function(S){return S!=="annotation-xml"&&la(S,g)},Ge=function(S){Me(fe.beforeSanitizeAttributes,S,null);let{attributes:ue}=S;if(!ue||ye(S))return;let Oe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0},mt=ue.length;for(;mt--;){let Dt=ue[mt],{name:xt,namespaceURI:Nt,value:f}=Dt,$=Ae(xt),z=f,_=xt==="value"?z:Pf(z);if(Oe.attrName=$,Oe.attrValue=_,Oe.keepAttr=!0,Oe.forceKeepAttr=void 0,Me(fe.uponSanitizeAttribute,S,Oe),_=Oe.attrValue,Ee&&($==="id"||$==="name")&&(L(xt,S),_=re+_),Qe&&Gt(/((--!?|])>)|<\/(style|title|textarea)/i,_)){L(xt,S);continue}if($==="attributename"&&la(_,"href")){L(xt,S);continue}if(Oe.forceKeepAttr)continue;if(!Oe.keepAttr){L(xt,S);continue}if(!Z&&Gt(/\/>/i,_)){L(xt,S);continue}Se&&Ks([_e,ae,Le],ce=>{_=Gn(_,ce," ")});let b=Ae(S.nodeName);if(!$t(b,$,_)){L(xt,S);continue}if(I&&typeof k=="object"&&typeof k.getAttributeType=="function"&&!Nt)switch(k.getAttributeType(b,$)){case"TrustedHTML":{_=I.createHTML(_);break}case"TrustedScriptURL":{_=I.createScriptURL(_);break}}if(_!==z)try{Nt?S.setAttributeNS(Nt,xt,_):S.setAttribute(xt,_),ye(S)?y(S):Vl(t.removed)}catch{L(xt,S)}}Me(fe.afterSanitizeAttributes,S,null)},Ot=function Fe(S){let ue=null,Oe=be(S);for(Me(fe.beforeSanitizeShadowDOM,S,null);ue=Oe.nextNode();)Me(fe.uponSanitizeShadowNode,ue,null),ft(ue),Ge(ue),ue.content instanceof o&&Fe(ue.content);Me(fe.afterSanitizeShadowDOM,S,null)};return t.sanitize=function(Fe){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ue=null,Oe=null,mt=null,Dt=null;if(De=!Fe,De&&(Fe="<!-->"),typeof Fe!="string"&&!Ne(Fe))if(typeof Fe.toString=="function"){if(Fe=Fe.toString(),typeof Fe!="string")throw Vn("dirty is not a string, aborting")}else throw Vn("toString is not a function");if(!t.isSupported)return Fe;if(ot||bt(S),t.removed=[],typeof Fe=="string"&&(rt=!1),rt){if(Fe.nodeName){let f=Ae(Fe.nodeName);if(!U[f]||Ze[f])throw Vn("root node is forbidden and cannot be sanitized in-place")}}else if(Fe instanceof i)ue=X("<!---->"),Oe=ue.ownerDocument.importNode(Fe,!0),Oe.nodeType===Yn.element&&Oe.nodeName==="BODY"||Oe.nodeName==="HTML"?ue=Oe:ue.appendChild(Oe);else{if(!yt&&!Se&&!je&&Fe.indexOf("<")===-1)return I&&E?I.createHTML(Fe):Fe;if(ue=X(Fe),!ue)return yt?null:E?O:""}ue&&Je&&y(ue.firstChild);let xt=be(rt?Fe:ue);for(;mt=xt.nextNode();)ft(mt),Ge(mt),mt.content instanceof o&&Ot(mt.content);if(rt)return Fe;if(yt){if(Ie)for(Dt=D.call(ue.ownerDocument);ue.firstChild;)Dt.appendChild(ue.firstChild);else Dt=ue;return(ge.shadowroot||ge.shadowrootmode)&&(Dt=pe.call(n,Dt,!0)),Dt}let Nt=je?ue.outerHTML:ue.innerHTML;return je&&U["!doctype"]&&ue.ownerDocument&&ue.ownerDocument.doctype&&ue.ownerDocument.doctype.name&&Gt(rc,ue.ownerDocument.doctype.name)&&(Nt="<!DOCTYPE "+ue.ownerDocument.doctype.name+`>
`+Nt),Se&&Ks([_e,ae,Le],f=>{Nt=Gn(Nt,f," ")}),I&&E?I.createHTML(Nt):Nt},t.setConfig=function(){let Fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};bt(Fe),ot=!0},t.clearConfig=function(){Pe=null,ot=!1},t.isValidAttribute=function(Fe,S,ue){Pe||bt({});let Oe=Ae(Fe),mt=Ae(S);return $t(Oe,mt,ue)},t.addHook=function(Fe,S){typeof S=="function"&&Hn(fe[Fe],S)},t.removeHook=function(Fe,S){if(S!==void 0){let ue=Lf(fe[Fe],S);return ue===-1?void 0:If(fe[Fe],ue,1)[0]}return Vl(fe[Fe])},t.removeHooks=function(Fe){fe[Fe]=[]},t.removeAllHooks=function(){fe=Jl()},t}var sc=nc();var Ar={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qs=e=>(...t)=>({_$litDirective$:e,values:t}),An=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Zn=class extends An{constructor(t){if(super(t),this.it=Mt,t.type!==Ar.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Mt||t==null)return this._t=void 0,this.it=t;if(t===or)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Zn.directiveName="unsafeHTML",Zn.resultType=1;var oc=Qs(Zn);function ya(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var tn=ya();function pc(e){tn=e}var es={exec:()=>null};function gt(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Yt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Yf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Zf=/^(?:[ \t]*(?:\n|$))+/,Qf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Xf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ts=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,va=/(?:[*+-]|\d{1,9}[.)])/,fc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_c=gt(fc).replace(/bull/g,va).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),e_=gt(fc).replace(/bull/g,va).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),wa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,t_=/^[^\n]+/,ka=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,r_=gt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ka).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),n_=gt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,va).getRegex(),no="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$a=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,s_=gt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",$a).replace("tag",no).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),mc=gt(wa).replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",no).getRegex(),o_=gt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",mc).getRegex(),xa={blockquote:o_,code:Qf,def:r_,fences:Xf,heading:Jf,hr:ts,html:s_,lheading:_c,list:n_,newline:Zf,paragraph:mc,table:es,text:t_},ac=gt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",no).getRegex(),a_={...xa,lheading:e_,table:ac,paragraph:gt(wa).replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ac).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",no).getRegex()},i_={...xa,html:gt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",$a).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:es,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:gt(wa).replace("hr",ts).replace("heading",` *#{1,6} *[^
]`).replace("lheading",_c).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},l_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,c_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,gc=/^( {2,}|\\)\n(?!\s*$)/,u_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,so=/[\p{P}\p{S}]/u,Aa=/[\s\p{P}\p{S}]/u,hc=/[^\s\p{P}\p{S}]/u,d_=gt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Aa).getRegex(),bc=/(?!~)[\p{P}\p{S}]/u,p_=/(?!~)[\s\p{P}\p{S}]/u,f_=/(?:[^\s\p{P}\p{S}]|~)/u,__=gt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Yf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),yc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,m_=gt(yc,"u").replace(/punct/g,so).getRegex(),g_=gt(yc,"u").replace(/punct/g,bc).getRegex(),vc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",h_=gt(vc,"gu").replace(/notPunctSpace/g,hc).replace(/punctSpace/g,Aa).replace(/punct/g,so).getRegex(),b_=gt(vc,"gu").replace(/notPunctSpace/g,f_).replace(/punctSpace/g,p_).replace(/punct/g,bc).getRegex(),y_=gt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,hc).replace(/punctSpace/g,Aa).replace(/punct/g,so).getRegex(),v_=gt(/\\(punct)/,"gu").replace(/punct/g,so).getRegex(),w_=gt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),k_=gt($a).replace("(?:-->|$)","-->").getRegex(),$_=gt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",k_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),eo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,x_=gt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",eo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),wc=gt(/^!?\[(label)\]\[(ref)\]/).replace("label",eo).replace("ref",ka).getRegex(),kc=gt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ka).getRegex(),A_=gt("reflink|nolink(?!\\()","g").replace("reflink",wc).replace("nolink",kc).getRegex(),ic=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Sa={_backpedal:es,anyPunctuation:v_,autolink:w_,blockSkip:__,br:gc,code:c_,del:es,emStrongLDelim:m_,emStrongRDelimAst:h_,emStrongRDelimUnd:y_,escape:l_,link:x_,nolink:kc,punctuation:d_,reflink:wc,reflinkSearch:A_,tag:$_,text:u_,url:es},S_={...Sa,link:gt(/^!?\[(label)\]\((.*?)\)/).replace("label",eo).getRegex(),reflink:gt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",eo).getRegex()},ga={...Sa,emStrongRDelimAst:b_,emStrongLDelim:g_,url:gt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ic).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:gt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ic).getRegex()},E_={...ga,br:gt(gc).replace("{2,}","*").getRegex(),text:gt(ga.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Xs={normal:xa,gfm:a_,pedantic:i_},Qn={normal:Sa,gfm:ga,breaks:E_,pedantic:S_},T_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},lc=e=>T_[e];function Sr(e,t){if(t){if(Yt.escapeTest.test(e))return e.replace(Yt.escapeReplace,lc)}else if(Yt.escapeTestNoEncode.test(e))return e.replace(Yt.escapeReplaceNoEncode,lc);return e}function cc(e){try{e=encodeURI(e).replace(Yt.percentDecode,"%")}catch{return null}return e}function uc(e,t){let r=e.replace(Yt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Yt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Yt.slashPipe,"|");return n}function Xn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function C_(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function dc(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function R_(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var to=class{constructor(e){At(this,"options");At(this,"rules");At(this,"lexer");this.options=e||tn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Xn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=R_(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Xn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Xn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Xn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,r.length===0)break;let m=o.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let k=m,T=k.raw+`
`+r.join(`
`),M=this.blockquote(T);o[o.length-1]=M,n=n.substring(0,n.length-k.raw.length)+M.raw,s=s.substring(0,s.length-k.text.length)+M.text;break}else if(m?.type==="list"){let k=m,T=k.raw+`
`+r.join(`
`),M=this.list(T);o[o.length-1]=M,n=n.substring(0,n.length-m.raw.length)+M.raw,s=s.substring(0,s.length-k.raw.length)+M.raw,r=T.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),m=e.split(`
`,1)[0],k=!p.trim(),T=0;if(this.options.pedantic?(T=2,d=p.trimStart()):k?T=t[1].length+1:(T=t[2].search(this.rules.other.nonSpaceChar),T=T>4?1:T,d=p.slice(T),T+=t[1].length),k&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),c=!0),!c){let M=this.rules.other.nextBulletRegex(T),H=this.rules.other.hrRegex(T),se=this.rules.other.fencesBeginRegex(T),V=this.rules.other.headingBeginRegex(T),q=this.rules.other.htmlBeginRegex(T);for(;e;){let I=e.split(`
`,1)[0],O;if(m=I,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),O=m):O=m.replace(this.rules.other.tabCharGlobal,"    "),se.test(m)||V.test(m)||q.test(m)||M.test(m)||H.test(m))break;if(O.search(this.rules.other.nonSpaceChar)>=T||!m.trim())d+=`
`+O.slice(T);else{if(k||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||se.test(p)||V.test(p)||H.test(p))break;d+=`
`+m}!k&&!m.trim()&&(k=!0),u+=I+`
`,e=e.substring(I.length+1),p=O.slice(T)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=uc(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(uc(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Xn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=C_(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),dc(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return dc(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let d=[...n[0]][0].length,p=e.slice(0,s+n.index+d+a);if(Math.min(s,a)%2){let k=p.slice(1,-1);return{type:"em",raw:p,text:k,tokens:this.lexer.inlineTokens(k)}}let m=p.slice(2,-2);return{type:"strong",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},_r=class ha{constructor(t){At(this,"tokens");At(this,"options");At(this,"state");At(this,"inlineQueue");At(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||tn,this.options.tokenizer=this.options.tokenizer||new to,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Yt,block:Xs.normal,inline:Qn.normal};this.options.pedantic?(r.block=Xs.pedantic,r.inline=Qn.pedantic):this.options.gfm&&(r.block=Xs.gfm,this.options.breaks?r.inline=Qn.breaks:r.inline=Qn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Xs,inline:Qn}}static lex(t,r){return new ha(r).lex(t)}static lexInline(t,r){return new ha(r).inlineTokens(t)}lex(t){t=t.replace(Yt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Yt.tabCharGlobal,"    ").replace(Yt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=r.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),m;this.options.extensions.startInline.forEach(k=>{m=k.call({lexer:this},p),typeof m=="number"&&m>=0&&(d=Math.min(d,m))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let d=r.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return r}},ro=class{constructor(e){At(this,"options");At(this,"parser");this.options=e||tn}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Yt.notSpaceStart)?.[0],s=e.replace(Yt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Sr(n)+'">'+(r?s:Sr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Sr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Sr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=cc(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Sr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=cc(e);if(s===null)return Sr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Sr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Sr(e.text)}},Ea=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},mr=class ba{constructor(t){At(this,"options");At(this,"renderer");At(this,"textRenderer");this.options=t||tn,this.options.renderer=this.options.renderer||new ro,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ea}static parse(t,r){return new ba(r).parse(t)}static parseInline(t,r){return new ba(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Js,Jn=(Js=class{constructor(e){At(this,"options");At(this,"block");this.options=e||tn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?_r.lex:_r.lexInline}provideParser(){return this.block?mr.parse:mr.parseInline}},At(Js,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),At(Js,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Js),L_=class{constructor(...e){At(this,"defaults",ya());At(this,"options",this.setOptions);At(this,"parse",this.parseMarkdown(!0));At(this,"parseInline",this.parseMarkdown(!1));At(this,"Parser",mr);At(this,"Renderer",ro);At(this,"TextRenderer",Ea);At(this,"Lexer",_r);At(this,"Tokenizer",to);At(this,"Hooks",Jn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new ro(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new to(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Jn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];Jn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Jn.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await i.call(s,u);return c.call(s,p)})();let d=i.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await i.apply(s,u);return p===!1&&(p=await c.apply(s,u)),p})();let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return _r.lex(e,t??this.defaults)}parser(e,t){return mr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?_r.lex:_r.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?mr.parse:mr.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?_r.lex:_r.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?mr.parse:mr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Sr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},en=new L_;function vt(e,t){return en.parse(e,t)}vt.options=vt.setOptions=function(e){return en.setOptions(e),vt.defaults=en.defaults,pc(vt.defaults),vt};vt.getDefaults=ya;vt.defaults=tn;vt.use=function(...e){return en.use(...e),vt.defaults=en.defaults,pc(vt.defaults),vt};vt.walkTokens=function(e,t){return en.walkTokens(e,t)};vt.parseInline=en.parseInline;vt.Parser=mr;vt.parser=mr.parse;vt.Renderer=ro;vt.TextRenderer=Ea;vt.Lexer=_r;vt.lexer=_r.lex;vt.Tokenizer=to;vt.Hooks=Jn;vt.parse=vt;var $y=vt.options,xy=vt.setOptions,Ay=vt.use,Sy=vt.walkTokens,Ey=vt.parseInline;var Ty=mr.parse,Cy=_r.lex;function Pr(e){let t=vt.parse(e),r=sc.sanitize(t);return oc(r)}function Er(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Sn(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function oo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var $c={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},I_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},O_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,P_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function br(e){return!!e&&typeof e=="object"}function Ta(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ca(e,t){let r=Ta(e),n=Ta(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function xc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>br(s)&&typeof s.text=="string"?s.text:"").join(""):br(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function M_(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:$c[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ta(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ca(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=Ca(br(i)?i.old_string:"",br(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ra(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function La(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=O_.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:P_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function D_(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(br(o)){if(o.type==="text"&&typeof o.text=="string")s.push(La(o.text));else if(o.type==="thinking"){let a=Ra(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=M_(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(br(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=xc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function N_(e){let t=typeof e.command=="string"?e.command:"",r=xc(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",r].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:$c.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function q_(e){if(e.type==="item.completed"&&br(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[La(t.text)];if(t.type==="reasoning"){let r=Ra(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[N_(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function F_(e){if(e.schema!=="codex-delegation-monitor-v1"||!br(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&br(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[La(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Ra(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=I_[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function j_(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function B_(e){let t=e;if(typeof e=="string"){let r=e.trim();if(r.length===0)return null;try{t=JSON.parse(r)}catch{return null}}return br(t)?t:null}function Ac(){let e=new Map;return{push(t){let r=B_(t);return r?r.schema==="codex-delegation-monitor-v1"?F_(r):j_(r)?q_(r):D_(r,e):[]}}}function Ia(e){let t=[],r=Ac(),n=Array.isArray(e)?e:[];for(let s of n)for(let o of r.push(s))t.push(o);return t}var U_=5,W_=10,z_=/Task\s+#(\d+)/,H_=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,G_=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ao(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function V_(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function K_(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Y_(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=z_.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Z_(e){if(e.tool==="Bash"){let t=e.command||"";return H_.test(t)?"~ PR/\uAC8C\uC2DC \uC911":G_.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Q_(e){let t=e.filter(s=>s.kind==="tool").slice(-W_),r=new Map;t.forEach((s,o)=>{let a=Z_(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function X_(e){let t=K_(e);if(t)return{text:t,guess:!1};let r=Y_(e);if(r)return{text:r,guess:!1};let n=Q_(e);return n?{text:n,guess:!0}:null}function J_(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:ir(e,t)}function En(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,c=null,u=!1,d={},p=!0,m=new Set,k=new Set,T=null,M=null,H=!1,se=!1,V=!1,q=null,I=null;function O(){H=!1,se=!1,V=!1,q=null,I=null}async function R(Y){if(r){se=!0,V=!1,K();try{let Z=await Promise.resolve(r("get-attempt-prompt",{attempt_id:Y,...c?{root_dir:c}:{}}));if(o!==Y)return;!Z||typeof Z!="object"||Array.isArray(Z)?V=!0:(q=Z,I=Y)}catch{o===Y&&(V=!0)}finally{o===Y&&(se=!1,K())}}}function A(){if(H=!H,H&&o&&I!==o){R(o);return}K()}function D(){if(!H)return"";let Y=Sn({loading:se,error:V});if(Y)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!q)return"";if(q.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Z=oo(q.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Z?l`<div class="prompt-block__meta">${Z} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?Er("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?Er("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function G(){if(!i||!n)return[];let Y=n.get(i);return Ia(Y?Y.lines:[])}function pe(){if(!i||!n)return null;let Y=n.get(i),Z=Y?Y.last_event_at:null;return typeof Z=="number"?Z:null}function fe(){return d.status==="running"}function _e(){if(fe()&&o){M||(M=setInterval(()=>K(),1e3));return}ae()}function ae(){M&&(clearInterval(M),M=null)}function Le(Y){let Z=[],Se=0;for(;Se<Y.length;){let Qe=Y[Se];if(Qe.kind==="tool"){let je=Se;for(;je<Y.length&&Y[je].kind==="tool"&&Y[je].tool===Qe.tool;)je+=1;if(je-Se>=U_&&!k.has(Se)){Z.push({kind:"group",idx:Se,tool:Qe.tool||"",lines:Y.slice(Se,je).map((ot,Je)=>({idx:Se+Je,line:ot}))}),Se=je;continue}}Z.push({kind:"line",idx:Se,line:Qe}),Se+=1}return Z}function Te(Y){for(let Z=Y.length-1;Z>=0;Z-=1){let Se=Y[Z];if(Se.kind==="result"||Se.kind==="error")return null;if(Se.kind==="tool"&&!Object.hasOwn(Se,"result"))return Se}return null}function ee(Y){for(let Z=Y.length-1;Z>=0;Z-=1)if(Y[Z].kind==="thinking")return Y[Z];return null}function oe(Y,Z){if(Z.kind==="gate")return l`<div class="sv__gate">${Z.text}</div>`;if(Z.kind==="phase")return l`<div class="sv__phase">${Z.text}</div>`;if(Z.kind==="result")return l`<div
        class="sv__result${Z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Pr(Z.text||(Z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Z.kind==="thinking"){let Se=m.has(Y);return l`<div
        class="sv__think${Se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>we(Y)}
      >
        <span class="sv__think-line">💭 ${ao(Z.text)}</span>
        ${Se?l`<pre class="sv__think-expand">${Z.text}</pre>`:""}
      </div>`}if(Z.kind==="error")return l`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="blocker")return l`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="tool"){let Se=m.has(Y),Qe=Z.tool==="Bash"?V_(Z.command):0,je=Z.tool==="Bash"?Qe>1?ao(Z.command):Z.command:Z.path||Z.command||"";return l`<div
        class="sv__tool${Se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>we(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Z.icon}</span>
          <span class="sv__tool-name">${Z.tool}</span>
          ${je?l`<span class="sv__tool-detail">${je}</span>`:""}
          ${Qe>1?l`<span class="sv__tool-more">⋯ ${Qe}줄</span>`:""}
          ${typeof Z.added=="number"?l`<span class="sv__diff-add">+${Z.added}</span>`:""}
          ${typeof Z.removed=="number"?l`<span class="sv__diff-del">−${Z.removed}</span>`:""}
          ${Z.result?l`<span class="sv__tool-ok">→ ${Z.result}</span>`:""}
        </span>
        ${Se?l`<pre class="sv__tool-expand">${xe(Z)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Pr(Z.text||"")}</div>`}function xe(Y){let Z=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)Z.push(Y.command);else if(Y.input!==void 0)try{Z.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&Z.push(`output:
${Y.output}`),Z.join(`

`)}function g(){if(!o)return l``;let Y=G(),Z=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),Se=d.session_id||"",Qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,je=fe(),ot=je?J_(pe(),Date.now()):"",Je=je?Te(Y):null,yt=je?ee(Y):null,Ie=X_(Y);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Ie?l`<span
              class="sv__stage${Ie.guess?" sv__stage--guess":""}"
              title=${Ie.text}
              >${Ie.text}</span
            >`:""}
        ${je?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ot?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ot}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ot?l`<span class="sv__live-ago">${ot}</span>`:""}</span
            >`:""}
        ${Se?l`<button
              type="button"
              class="sv__session"
              title=${Se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Se}`}
              @click=${()=>Ze(Se)}
            >
              ⧉ ${Se.slice(0,8)}
            </button>`:""}
        ${Z?l`<span class="sv__meta">${Z}</span>`:""}
        ${d.worktree?l`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":l`<button
              type="button"
              class="sv__prompt-toggle${H?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${H?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${A}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Qe}
          @click=${ke}
        >
          <span class="sv__follow-full">⇣ ${Qe}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>st()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":D()}
      <div class="sv__body">
        ${Y.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:Le(Y).map(E=>E.kind==="group"?j(E):oe(E.idx,E.line))}
      </div>
      ${Je||yt?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Je?l`<span class="sv__now-icon">${Je.icon}</span>
                  <span class="sv__now-name">${Je.tool}</span>
                  <span class="sv__now-detail"
                    >${Je.tool==="Bash"?ao(Je.command):Je.path||Je.command||""}</span
                  >`:""}
            ${yt?l`<span class="sv__now-think"
                  >💭 ${ao(yt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function j(Y){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>U(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function U(Y){k.add(Y),K()}function K(){Ye(g(),e),_e(),p&&ge()}function ge(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function we(Y){m.has(Y)?m.delete(Y):m.add(Y),K()}function ke(){p=!p,K()}function Ze(Y){tr(Y).then(Z=>{Z?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function wt(Y){!o||!Y||(d={...d,...Y},K())}function He(Y){let Z=Y.target;if(!Z||!Z.classList||!Z.classList.contains("sv__body"))return;!(Z.scrollHeight-Z.scrollTop-Z.clientHeight<=4)&&p&&(p=!1,K())}e.addEventListener("scroll",He,!0);function pt(Y){let Z=Y&&Y.attempt_id;if(!Z)return;let Se=i;o=Z,a=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&Se&&Se!==i&&Promise.resolve(r("unsubscribe-session-log",{id:Se})).catch(()=>{}),c=typeof Y.root_dir=="string"&&Y.root_dir.length>0?Y.root_dir:null,d=Y.meta||{},u=Y.hide_prompt===!0,p=!0,m.clear(),k.clear(),O(),!T&&n&&(T=n.subscribe(K)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),K()}function st(){let Y=i;o=null,a=null,i=null,c=null,u=!1,m.clear(),k.clear(),O(),ae(),r&&Y&&Promise.resolve(r("unsubscribe-session-log",{id:Y})).catch(()=>{}),Ye(l``,e),s&&s()}return{open:pt,updateMeta:wt,close:st,isOpen(){return o!==null},destroy(){ae(),T&&(T(),T=null),e.removeEventListener("scroll",He,!0),o=null,a=null,i=null,c=null,u=!1,Ye(l``,e)}}}function io(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Oa(t.spec_id),s=Oa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Oa(e){return typeof e=="string"?e.trim():""}function Sc(e){let t=io(e);if(t.path)return t;let r=Oa(em(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function em(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function tm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function rm(e){let t=e&&e.metadata||{},r=Sc(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:tm(t)?null:"plan_pending"}),n}function Ec(e,t){let r=rm(e);return l`
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
  `}var nm="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",sm=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,om=/^\*\*결론\*\* — (.+)$/;function lo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==nm)return null;let r=sm.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?om.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Tc=20;function Cc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function am(e){return e.length>Tc?`${e.slice(0,Tc)}\u2026`:e}function im(e,t,r,n){let s=`${t.lane} ${am(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Cc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Pr(t.body)}
        </div>`:""}
  </div>`}function lm(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Cc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Rc(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=lo(typeof c.text=="string"?c.text:"");return u?im(c,u,t,s.has(c.id)):lm(c)})}
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
  `}var{I:uv}=Zi;var Lc=e=>e.strings===void 0;var cm={},Ic=(e,t=cm)=>e._$AH=t;var rn=Qs(class extends An{constructor(e){if(super(e),e.type!==Ar.PROPERTY&&e.type!==Ar.ATTRIBUTE&&e.type!==Ar.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Lc(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===or||t===Mt)return t;let r=e.element,n=e.name;if(e.type===Ar.PROPERTY){if(t===r[n])return or}else if(e.type===Ar.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return or}else if(e.type===Ar.ATTRIBUTE&&r.getAttribute(n)===t+"")return or;return Ic(e),t}});var co=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ma=[...co.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Tr=["orchestration_model","orchestration_effort","orchestration_speed"],uo=[...co,...Tr],um=Ma.filter(e=>uo.includes(e)),Oc=["delegated","main"],po=["inherit","claude","codex"],rs=["default","fast"],ns=["standard","fast_track"],ss=["codex","opus","fable","self","skip"],fo=["codex","fable","skip"],_o=["low","medium","high","xhigh"],nr="auto";function rr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Pc(e){if(!rr(e)||!rr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))rr(n)&&rr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Tn(e,t){let r=Pc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[nr,...n.flatMap(([,s])=>s)]}function Mc(e,t,r,n){if(!rr(e)||!rr(e.runners))return[nr];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!rr(a)||!rr(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(r&&r!==nr&&i!==r)continue;let u=n(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[nr,...s]}function Cn(e,t,r){return Mc(e,t,r,(n,s)=>rr(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function Da(e,t,r){return Mc(e,t,r,(n,s)=>rr(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:rr(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function os(e,t){let r=Pc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Dc(e,t,r){let n={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:n.impl_runtime==="inherit"?r:null;return s&&(n.impl_model&&!Tn(t,s).includes(n.impl_model)&&(n.impl_model=void 0),n.impl_effort&&!Cn(t,s,n.impl_model||nr).includes(n.impl_effort)&&(n.impl_effort=void 0)),n}var dm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Pa=[...um,...Tr],pm=[...uo,...Ma].filter((e,t,r)=>r.indexOf(e)===t&&!Pa.includes(e));function Nc(e,t){let r=rr(e)?e:{},n=rr(t)?t:{},s=[];for(let a of Pa){let i=r[a]??null,c=n[a]??null;i!==c&&s.push({key:a,label:dm[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...pm,...Object.keys(n)])!Pa.includes(a)&&!o.includes(a)&&Object.hasOwn(n,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Na(e,t,r,n,s,o){return Hs({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function qc(e,t){let r={};for(let n of Ma){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Fc(e,t){let r={};for(let n of Tr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var qa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Tr]}],Mr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},mo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Fa(e,t,r,n,s,o=null){let a=Qt({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function jc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of Fa(e,t,r,n,s,o))a[i.source]+=1;return a}function Bc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Uc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var wv=[...co,...Tr];var fm=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],_m={pin:"pin",global:"global",base:"base"};function mm(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${_m[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function gm(e,t,r){switch(e){case"workflow_mode":return ns;case"spec_review_model":case"impl_review_model":return ss;case"plan_review_model":return fo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return _o;case"impl_dispatch":return Oc;case"impl_runtime":return po;case"impl_model":return Tn(r,t.impl_runtime);case"impl_effort":return Cn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return rs;case"orchestration_model":return os(r,null);case"orchestration_effort":return Cn(r,void 0,t.orchestration_model||nr).filter(n=>n!==nr);default:return[]}}function hm(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${mm(e.source)}
    <span class="detail-effective__k"
      >${Mr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${mo[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Mr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Wc(e,t){let r=qa.flatMap(c=>c.keys),n=Fa(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=jc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(c=>[c.key,c])),a=Object.fromEntries(n.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=n.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
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
      <span class="detail-effective__summary" title=${i}
        >${bm(o)}</span
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
          ${qa.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${n.filter(u=>c.keys.includes(u.key)).map(u=>{let d=Hs({key:u.key,choices:gm(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return hm(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${rn(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${c=>t.onPresetSelect(String(c.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(c=>l`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?l`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function bm(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function ym(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function zc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=ym(r.exec_receipt),c=i?Xr(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=Ws(r.planned_execution,r.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
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
      ${d?l`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${d.kind}
            title=${d.title}
            >${d.label}</span
          >`:""}
      ${c?l`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${u}${i?.effort?l`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${fm.map(p=>{let m=p.receipt&&typeof t[p.receipt]=="string"?String(t[p.receipt]):"",k=n[p.id],T=m.length>0||k?.fill==="full",M=!T&&k?.fill==="dim",H=k?.stale===!0;return l`<span
          class=${`detail-summary__gate${T?" detail-summary__gate--on":""}${M?" detail-summary__gate--current":""}${H?" detail-summary__gate--stale":""}`}
          data-gate=${p.id}
        >
          <span class="detail-summary__gate-pill">${p.label}</span>
          ${m?l`<span class="detail-summary__gate-sha"
                >${m.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Kc(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Hc(e){return Kc(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Gc(e,t){let r=e&&e[t];if(!Kc(r)||!Array.isArray(r.accounts))return null;let n=r.accounts.filter(Hc),s=Hc(r.active)?r.active:null;return{accounts:n,active:s||n.find(o=>o.active===!0)||null}}function Yc(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function vm(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Yc(e)}${t}`}function Zc(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Yc(e)}`}function wm(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Zc({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Vc(e){let t=e.provider_key==="claude"?vm:Zc,r=!!e.provider?.accounts.some(n=>n.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${n=>e.handlers.onExecChange(e.key,n.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${wm(e.provider_key,e.provider)}
        </option>
        ${e.selected&&!r?l`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(n=>l`<option
              value=${n.key}
              ?selected=${n.key===e.selected}
            >
              ${t(n)}
            </option>`)||""}
      </select>
      ${e.hint?l`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":l`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Qc({md:e,catalog:t,handlers:r}){let n=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Vc({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Gc(t,"claude"),selected:n,handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Vc({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Gc(t,"codex"),selected:s,handlers:r})}
    </div>
  </section>`}var Xc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function as(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function go(e){if(!as(e)||!as(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>as(r)&&as(r.models));return t.length>0?t:null}function gr(e,t){let r=go(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Jc(e,t){return as(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function eu(e,t){let r=go(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Jc(n,n.models[t]);return[]}function km(e){let t=go(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Jc(n,s))r.includes(o)||r.push(o);return r}function $m(e,t){if(!t)return km(e);let n=go(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of eu(e,o))s.includes(a)||s.push(a);return s}function tu(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=gr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?eu(t,n.impl_model):$m(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function xm(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Am(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let r=t[1].trim();return{front:r.length>0?r:null,body:e.slice(t[0].length)}}function ru(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function u(M){M.key==="Escape"&&s&&(M.preventDefault(),k())}document.addEventListener("keydown",u);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>k()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${xm(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>k()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${c}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:l`${i===null?null:l`<pre class="mv__front">
${i}</pre
                        >`}${Pr(a)}`}
          </div>
        </div>
      </div>
    `:l``}function p(){Ye(d(),e)}async function m(M,H={}){s=M,o="loading",a="",i=null,c="",p();let se=r?r():"";if(!se){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let V="/api/doc?workspace="+encodeURIComponent(se)+"&path="+encodeURIComponent(M);try{let q=await n(V),I=await q.json().catch(()=>({}));if(!q.ok||!I||I.ok!==!0){if(I?.error==="not_found"&&H.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(I&&I.error||q.status)+")",p();return}let O=Am(String(I.content||""));i=O.front,a=O.body,o="ready",p()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function k(){s=null,Ye(l``,e)}function T(){document.removeEventListener("keydown",u),k()}return{open:m,close:k,destroy:T}}var Sm=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],su="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ho=["implementation","review-consult"],Em=["running","done","failed","interrupted"],Tm={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Cm(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Rm(e){let t=zt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=xn(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${su}
          >부분 집계</span
        >`:""}`}function nu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ja(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ba(t):""}function Lm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!ho.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!Em.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Im(e,t){let n=zt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
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
    ${ja(t.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${ja(t.completed_at)}</span
        >`:""}
    ${n?l`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Om(e,t,r,n){let s=e.status==="running"?null:t,a=(s?zt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Ba(e.last_event_at):s?ja(s.completed_at):"";return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Tm[e.status]}</span
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
  </button>`}function Pm(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function Mm(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let p=Lm(d);!p||s.has(p.launch_id)||(s.add(p.launch_id),n.push(p))}n.sort((d,p)=>d.started_at-p.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let d of ho){let p=t.roles[d]?.codex;a[d]=p?[...p.legs]:[]}let i=ho.flatMap(d=>a[d]),c=new Set,u=[];for(let d of ho){for(let p of n.filter(m=>m.role===d)){let m=i.find(k=>k.receipt_id===p.launch_id)||null;m&&!Pm(p,m)||(m&&c.add(m.receipt_id),u.push(Om(p,m,e.attempt_id,r)))}for(let p of a[d])c.has(p.receipt_id)||u.push(Im(d,p))}return u}function Dm(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Sm,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Cm(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${su}</span>`:""}
  </div>`}var Nm={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ba(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function qm(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function ou(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let p=typeof u.session_id=="string"&&u.session_id.length>0,m=o.has(u.attempt_id),k=p&&!m,T=p?m?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!k}
      title=${T}
      @click=${M=>{M.stopPropagation(),k&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let p=u.cause_detail,m=p&&typeof p.reason=="string"&&p.reason.length>0?typeof p.command=="string"&&p.command.length>0?`${p.reason} \xB7 ${p.command}`:p.reason:u.cause;return l`<div class="detail-session__cause" title=${m}>
      ${u.cause}
    </div>`},c=u=>{let d=nu(aa(u));if(zt(d).length===0&&!xn(u.usage))return"";let p=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${p?"true":"false"}
      title=${p?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${m=>{m.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${Rm(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let d=aa(u),p=nu(d),m=zt(p);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Nm[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${Bn(u)?l`<span
                  class="detail-session__resumed"
                  title=${Bn(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Jr(u)}</span>
            ${m.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${m.length>0?m.map(k=>l`<span
                      class="detail-session__usage"
                      title=${k.tooltip}
                      >${k.label}</span
                    >`):xn(u.usage)?l`<span class="detail-session__usage"
                    >${xn(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ba(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${qm(u)}
          ${s.has(u.attempt_id)&&u.usage?Dm(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Mm(u,d,t)}
        </div>`})}
    </div>
  `}function au(e,t={}){return l`
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
          ${Fm(e)}
        </div>`:""}
  `}function Fm(e){let t=Sn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Er("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=oo(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Er("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Er("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var jm=["open","in_progress","deferred","resolved","closed"],Bm=[0,1,2,3,4];function iu(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,p={},m="",k=!1,T=[],M=!1,H={},se={claude:null,codex:null},V=null,q=0,I=!1,O=!1,R="",A="",D="";function G(){I=!1,O=!1,R="",A="",D=""}function pe(){se={claude:null,codex:null},V=null,q+=1}async function fe(x){try{let J=await fetch(x);if(!J.ok)return null;let P=await J.json();if(!P||typeof P!="object"||!Array.isArray(P.accounts))return null;let Re=P.accounts.filter(ut=>ut!==null&&typeof ut=="object"&&!Array.isArray(ut));return{accounts:Re,active:Re.find(ut=>ut.active===!0)||null}}catch{return null}}async function _e(x){V=x;let J=++q,[P,Re]=await Promise.all([fe("/api/claude-usage"),fe("/api/codex-usage")]);J!==q||x!==u||(se={claude:P,codex:Re},$e())}let ae=[],Le=null,Te=null,ee=!1,oe="",xe=!1,g=0,j=new Set;function U(){ae=[],Le=null,Te=null,ee=!1,oe="",xe=!1,g+=1,j.clear()}async function K(x){if(!s)return;let J=++g;try{let P=await Promise.resolve(s("get-comments",{id:x}));if(J!==g||x!==u)return;ae=Array.isArray(P)?P:[],ee=!1}catch{if(J!==g||x!==u)return;ee=!0}$e()}function ge(){if(!s||!u)return;let x=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Le!==u){Le=u,Te=x,K(u);return}x!==null&&x!==Te&&(Te=x,K(u))}function we(x){j.has(x)?j.delete(x):j.add(x),$e()}function ke(x){let J=oe.trim().length===0;oe=x,J!==(x.trim().length===0)&&$e()}async function Ze(){let x=oe.trim();if(!s||!u||x.length===0||xe)return;let J=u;xe=!0,$e();let P=!1;try{let Re=await Promise.resolve(s("add-comment",{id:J,text:x}));Array.isArray(Re)&&Re.length>0&&(P=!0,J===u&&(ae=Re,ee=!1,oe="",Te=Re.length))}catch{P=!1}P||me("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),J===u&&(xe=!1),$e()}let wt={onToggle:we,onDraftInput:ke,onSubmit:Ze},He=document.createElement("div");He.className="md-viewer-root",document.body.appendChild(He);let pt=ru(He,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),st=document.createElement("div");st.className="session-log-root",document.body.appendChild(st);let Y=En(st,{transport:s?(x,J)=>Promise.resolve(s(x,J)):void 0,sessionLogStore:c}),Z=!1,Se=!1,Qe=!1,je=null,ot=null,Je=0;function yt(x){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${x}`}function Ie(){Z=!1,Se=!1,Qe=!1,je=null,ot=null,Je+=1}async function E(x){if(!s)return;let J=++Je;Se=!0,Qe=!1,$e();try{let P=await Promise.resolve(s("get-bead-prompt",{bead_id:x}));if(J!==Je)return;!P||typeof P!="object"||Array.isArray(P)?Qe=!0:(je=P,ot=yt(x))}catch{J===Je&&(Qe=!0)}finally{J===Je&&(Se=!1,$e())}}function Q(){if(Z=!Z,Z&&u&&ot!==yt(u)){je=null,E(u);return}$e()}function Ee(){if(!a||!u)return[];let x=a.get();return(x&&x.attempts?Object.values(x.attempts):[]).filter(P=>P&&P.bead_id===u).sort((P,Re)=>(Re.started_at||0)-(P.started_at||0)).map(P=>({attempt_id:P.attempt_id,bead_id:P.bead_id,status:P.status,started_at:typeof P.started_at=="number"?P.started_at:null,runner:P.runner||null,model:P.model||null,effort:P.effort||P.observed_effort||null,speed:P.speed||null,session_id:P.session_id||null,resumed_from:P.resumed_from||null,continuation_mode:P.continuation_mode||null,dismissed_at:typeof P.dismissed_at=="number"?P.dismissed_at:null,cause:typeof P.cause=="string"?P.cause:null,cause_detail:P.cause_detail||null,exec_default_preset_id:typeof P.exec_default_preset_id=="string"?P.exec_default_preset_id:null,exec_default_preset_revision:typeof P.exec_default_preset_revision=="number"?P.exec_default_preset_revision:null,exec_values:P.exec_values&&typeof P.exec_values=="object"?P.exec_values:null,usage:P.usage||null,usage_legs:Array.isArray(P.usage_legs)?P.usage_legs:[],delegation_sessions:Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]}))}function re(){if(!a||!u)return null;let x=a.get();return lr(x&&x.attempts||{},u)}let qe=new Set;function rt(x){qe.has(x)?qe.delete(x):qe.add(x),$e()}function it(x){let J=a?a.get():null,P=J&&J.attempts?J.attempts[x]:null;Y.open({attempt_id:x,meta:P?{runner:P.runner||void 0,model:P.model||void 0,effort:P.effort||void 0,status:P.status||void 0,session_id:P.session_id||void 0}:{}})}function Xe(x,J){let P=a?a.get():null,Re=P&&P.attempts?P.attempts[x]:null,lt=(Re&&Array.isArray(Re.delegation_sessions)?Re.delegation_sessions:[]).find(et=>et&&typeof et=="object"&&et.launch_id===J);lt&&Y.open({attempt_id:x,launch_id:J,meta:{runner:"codex",role:lt.role,model:lt.model,effort:lt.effort,session_id:lt.session_id,status:lt.status}})}async function nt(x){if(!s||!x)return;let J=await $n();if(J===null)return;let P=()=>{let et=a?a.get():null;return et&&typeof et.revision=="number"?et.revision:0},Re=async(et={},tt=P())=>await s("worker-attempt-resume",{attempt_id:x,expected_revision:tt,...J!==""?{instructions:J}:{},...et}),ut=et=>{et?.queue&&a?.set&&a.set(et.queue)},lt=await Re();if(ut(lt),lt&&lt.conflict){let et=lt.queue&&typeof lt.queue.revision=="number"?lt.queue.revision:P();lt=await Re({},et),ut(lt)}lt=await wr(lt,(et,tt)=>Re({continuation:et,decision_token:tt}),{onResult:ut,refresh:()=>Re()}),lt&&lt.resumed===!1&&!lt.conflict&&lt.reason&&me(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${lt.reason}`,"error",2400)}let _t={onOpen:it,onOpenDelegation:Xe,onResume:nt,onToggleUsage:rt};function ht(){let x=a?a.get():null,J={...H};for(let P of["orchestration_model","orchestration_effort","orchestration_speed"]){let Re=x&&x[P];typeof Re=="string"&&(J[P]=Re)}return J}async function at(){if(s){try{let x=await Promise.resolve(s("get-session-defaults",{}));H=x&&x.values&&typeof x.values=="object"?x.values:{}}catch{H={}}$e()}}function kt(){let x=a?a.get():null;return x&&x.runner_catalog||null}function N(){let x=a?a.get():null;return x&&typeof x.execution_defaults=="object"?x.execution_defaults:null}function te(){let x=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},P=Qt({pin:{...x,...p},global:ht(),execution_defaults:N(),runner_catalog:kt(),route:typeof x.route=="string"?x.route:null}).orchestration_model.value||"";return gr(kt(),P)}function he(){let x=i?i.get():null;return!x||typeof x.revision!="number"?null:{revision:x.revision,presets:Array.isArray(x.presets)?x.presets:[]}}function ze(x){return x?.compatible===!1}function De(x){i&&x&&typeof x.revision=="number"&&Array.isArray(x.presets)&&i.set({revision:x.revision,presets:x.presets})}async function F(){let x=he(),J=x?.presets.find(P=>P.id===m);if(!(!s||!u||!x||!J||ze(J)||k)){k=!0,T=[],$e();try{let P=await Promise.resolve(s("apply-impl-preset",Uc(u,J.id,x.revision)));if(P&&P.conflict){De(P),me("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Re=P&&Array.isArray(P.issue)?P.issue[0]:P?.issue;if(P&&P.applied&&Re&&typeof Re=="object"){d=Re,T=Array.isArray(P.skipped_orchestration_keys)?P.skipped_orchestration_keys.filter(ut=>typeof ut=="string"):[];for(let ut of Xc)delete p[ut];me(T.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}P&&P.error==="bd_readback_failed"?me("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):me("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(P){P&&typeof P=="object"&&P.code==="bd_readback_failed"?me("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):me("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{k=!1,$e()}}}let ne=null;r&&r.subscribe&&(ne=r.subscribe(()=>B()));let ve=null;a&&typeof a.subscribe=="function"&&(ve=a.subscribe(()=>{u&&$e()}));let w=null;i&&typeof i.subscribe=="function"&&(w=i.subscribe(()=>{u&&$e()}));function C(x){x.key==="Escape"&&u&&(x.preventDefault(),n())}document.addEventListener("keydown",C);function B(){if(u){if(r&&typeof r.snapshotFor=="function"){let x=r.snapshotFor("detail:"+u)||[];d=x.find(P=>P&&P.id===u)||x[0]||d}ge(),$e()}}function ie(x){tr(x).then(J=>{J?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ce(x){x.preventDefault(),x.stopPropagation(),u&&ie(u)}function Ae(x,J){x.preventDefault(),x.stopPropagation(),ie(J)}function Pe(x,J,P){x.preventDefault(),x.stopPropagation(),pt.open(J,{missing_state:P})}function Be(x,J){p[x]=J,$e(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Bc(u,x,J.length===0?null:J))).catch(()=>{me("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function St(x,J){let P=d||{},Re=P.metadata&&typeof P.metadata=="object"?P.metadata:{},ut={};for(let tt of["impl_runtime","impl_model","impl_effort"])ut[tt]=Object.hasOwn(p,tt)?p[tt]:typeof Re[tt]=="string"?Re[tt]:"";ut[x]=J;let lt=tu(ut,kt(),te()),et={};for(let tt of["impl_runtime","impl_model","impl_effort"])et[tt]=p[tt],p[tt]=lt[tt]||"";$e(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...lt,orchestration_runtime:te()})).then(tt=>{let Pt=Array.isArray(tt)?tt[0]:tt;if(!Pt||typeof Pt!="object"||!Pt.id)throw new Error("implementation target readback failed");d=Pt;for(let Jt of["impl_runtime","impl_model","impl_effort"])delete p[Jt];$e()}).catch(()=>{for(let tt of["impl_runtime","impl_model","impl_effort"])et[tt]===void 0?delete p[tt]:p[tt]=et[tt];$e(),me("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function bt(x,J,P){if(!s||!u)return!1;try{let Re=await Promise.resolve(s(x,J)),ut=Array.isArray(Re)?Re[0]:Re;return ut&&typeof ut=="object"&&ut.id?(d=ut,!0):(me(P,"error"),!1)}catch{return me(P,"error"),!1}}function Ke(x){setTimeout(()=>{try{let J=e.querySelector(x);J&&typeof J.focus=="function"&&J.focus()}catch{}},0)}function Ft(){I=!0,R=d&&d.title||"",$e(),Ke('.detail-edit__input[data-edit="title"]')}function v(x){R=x.target.value}function y(){I=!1,R="",$e()}function L(){bt("edit-text",{id:u,field:"title",value:R},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(J=>{J&&(I=!1,R=""),$e()})}function X(){O=!0,A=d&&d.description||"",$e(),Ke('.detail-edit__textarea[data-edit="description"]')}function be(x){A=x.target.value}function ye(){O=!1,A="",$e()}function Ne(){bt("edit-text",{id:u,field:"description",value:A},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(J=>{J&&(O=!1,A=""),$e()})}function Me(x,J,P,Re){if(x.key==="Escape"){x.stopPropagation(),P();return}x.key==="Enter"&&(!Re||x.ctrlKey||x.metaKey)&&(x.preventDefault(),J())}function ft(x){let J=x.target.value;bt("update-status",{id:u,status:J},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>$e())}function $t(x){let J=Number(x.target.value);bt("update-priority",{id:u,priority:J},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>$e())}function jt(x){D=x.target.value}function Ge(){let x=D.trim();x.length!==0&&bt("label-add",{id:u,label:x},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(J=>{J&&(D=""),$e()})}function Ot(x){if(x.key==="Escape"){x.stopPropagation(),D="",$e();return}x.key==="Enter"&&(x.preventDefault(),Ge())}function Fe(x){bt("label-remove",{id:u,label:x},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>$e())}let S={onCopyPath:Ae,onOpenDoc:Pe};function ue(x){return typeof x=="string"?x:x&&typeof x=="object"?String(x.id||x.to||x.issue_id||x.depends_on||""):""}function Oe(x){switch(x&&typeof x=="object"?String(x.dependency_type||x.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function mt(x){let P=(Array.isArray(x.dependencies)?x.dependencies:[]).map(Re=>({id:ue(Re),icon:Oe(Re)})).filter(Re=>Re.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${P.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${P.map(Re=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Re.id)}
                  >
                    ${Re.icon?`${Re.icon} `:""}${Re.id}
                  </button>`:l`<span class="detail-dep"
                    >${Re.icon?`${Re.icon} `:""}${Re.id}</span
                  >`)}
          </div>`}
    `}function Dt(x){let J=x.metadata||{},P=x.workflow||{},Re=P.stages||{},ut=Re.spec&&Re.spec.stale,lt=Re.impl&&Re.impl.stale,et=Re.plan||null,tt=P.route_source==="derived",Pt=P.route||J.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${tt?" detail-kv__v--derived":""}"
          title=${tt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${tt?"unset":Pt}</span
        >
      </div>
      ${P.route!=="quick_fix"||Object.hasOwn(J,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${J.spec_review||"\uC5C6\uC74C"}${ut?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${et?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${et?.approval_receipt||"\uC5C6\uC74C"}${et?.approval_state==="stale"?" \xB7 stale":et?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${P.route!=="quick_fix"||Object.hasOwn(J,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${J.impl_review||"\uC5C6\uC74C"}${lt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${P.planned_execution.kind}</span>
            </div>
            ${P.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${P.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${P.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Xr(P.exec_receipt)}</span
            >
          </div>`:""}
      ${P.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${P.impl_entry.actor}@${P.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${J.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${J.pr_url}</span>
          </div>`:""}
    `}let xt={route:["quick_fix","spec_backed","full_plan"]};async function Nt(x,J){let P=J.target.value;if(x==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&P!=="full_plan"&&!window.confirm(`full_plan \u2192 ${P||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){$e();return}await bt("update-workflow-meta",{id:u,key:x,value:P},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),$e()}function f(x){let J=x.metadata||{};return l` ${((Re,ut)=>{let lt=xt[Re],et=typeof J[Re]=="string"?J[Re]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${Re}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Re}
          data-edit=${`wfmeta-${Re}`}
          @change=${tt=>Nt(Re,tt)}
        >
          <option value="" ?selected=${!lt.includes(et)}>
            ${ut}
          </option>
          ${lt.map(tt=>l`<option value=${tt} ?selected=${et===tt}>${tt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function $(x,J){return I?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${R}
            @input=${v}
            @keydown=${P=>Me(P,L,y,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${L}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${y}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${x}</h2>
        ${zt(J).map(P=>l`<span class="detail-usage-total" title=${P.tooltip}
              >${P.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ft}
        >
          ✎
        </button>
      </div>
    `}function z(x){let J=Ht(x.created_at),P=Ht(x.updated_at);return!J&&!P?l``:l`
      ${J?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${J}</span>
          </div>`:""}
      ${P?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${P}</span>
          </div>`:""}
    `}function _(x,J){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ft}
        >
          ${jm.map(P=>l`<option value=${P} ?selected=${P===x}>${P}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${$t}
        >
          ${Bm.map(P=>l`<option value=${String(P)} ?selected=${P===J}>
                P${P}
              </option>`)}
        </select>
      </div>
    `}function b(x){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${O?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${X}
            >
              ✎
            </button>`}
      </div>
      ${O?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${A}
              @input=${be}
              @keydown=${J=>Me(J,Ne,ye,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ne}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ye}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${x||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ce(x){let J=typeof x.notes=="string"?x.notes:"";return J.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${J}</div>
    `}function le(x){let J=Array.isArray(x.labels)?x.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${J.map(P=>l`<span class="detail-label-chip"
              >${P}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${P}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+P}
                @click=${()=>Fe(P)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${D}
            @input=${jt}
            @keydown=${Ot}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ge}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ue(){if(!u)return l``;let x=d||{},J=String(x.id||u),P=x.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Re=re(),ut=x.status||"open",lt=typeof x.priority=="number"?Math.max(0,Math.min(4,x.priority)):"",et=x.description||"",tt={...x,metadata:{...x.metadata||{},...p}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>n()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Ce}
            >
              ${J}
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
          ${$(P,Re)}
          ${zc(tt)}
          ${Wc({metadata:tt.metadata,workspace_values:ht(),catalog:kt(),execution_defaults:N(),expanded:M,presets:he()?.presets||[],preset_id:m,preset_busy:k,skipped_orchestration_keys:T},{onToggle:Pt=>{M=Pt,$e()},onEdit:(Pt,Jt)=>{if(Pt==="impl_runtime"||Pt==="impl_model"||Pt==="impl_effort"){St(Pt,Jt??"");return}Be(Pt,Jt??"")},onPresetSelect:Pt=>{m=Pt,T=[],$e()},onPresetApply:()=>{F()}})}
          ${Qc({md:tt.metadata,catalog:se,handlers:{onExecChange:Be}})}
          ${_(ut,lt)} ${z(x)}
          ${b(et)}
          ${Rc(ae,wt,{expanded:j,draft:oe,sending:xe,error:ee})}
          ${ce(x)} ${le(x)} ${mt(x)}
          ${Dt(x)} ${f(x)}
          ${Ec(x,S)}
          ${au({expanded:Z,loading:Se,error:Qe,data:je},{onToggle:Q})}
          ${ou(Ee(),_t,{total:Re,expanded:qe})}
        </div>
      </div>
    `}function $e(){Ye(Ue(),e)}return{load(x){x!==u&&(p={},m="",T=[],M=!1,G(),U(),Ie(),pe()),u=x,d=null,B(),at(),V!==x&&_e(x)},clear(){u=null,d=null,p={},m="",k=!1,T=[],M=!1,G(),U(),Ie(),pe(),pt.close(),Y.close(),Ye(l``,e)},destroy(){ne&&(ne(),ne=null),ve&&(ve(),ve=null),w&&(w(),w=null),document.removeEventListener("keydown",C),pt.destroy(),He.parentNode&&He.parentNode.removeChild(He),Y.destroy(),st.parentNode&&st.parentNode.removeChild(st),u=null,d=null,pe(),m="",k=!1,T=[],U(),Ie(),Ye(l``,e)}}}function lu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,p="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=d||"An unrecoverable error occurred.");let m=typeof p=="string"?p.trim():"";if(s&&(m.length>0?(s.textContent=m,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function bo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ls(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function yo(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function vo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Um(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:bo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function cu(e,t){let r=Um(e,t);return r?l`<button
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
            title=${r.deploy.at?Ht(r.deploy.at):""}
            >${vo(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${ls(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Rn(e){let t=ir(e.created_at),r=ir(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Wm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function cs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function wo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function yr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,m)=>(p.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Wm(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:d}}function is(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
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
  </div>`}var zm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function uu(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:zm[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function ko(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let r=t.pin===!0?" exec-chip--pin":"",n=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return l`${e.orchestration?l`<span
        class="exec-chip exec-chip--orch${r}"
        title=${`${e.orchestration.title}${n}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?l`<span
        class="exec-chip exec-chip--worker${r}"
        title=${`${e.worker.title}${n}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function $o(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],n=Array.isArray(e.warnings)?e.warnings:[];return t.length===0&&r.length===0&&n.length===0?"":l`<div class="worker-deps">
    ${t.map(s=>l`<span class="worker-dep worker-dep--pred" title=${s.title||""}
          ><span class="worker-dep__label">${s.label}</span
          ><button
            type="button"
            class="worker-dep__remove"
            data-blocker-id=${s.id}
            aria-label=${`\uC120\uD589 ${s.id} \uC5F0\uACB0 \uD574\uC81C`}
            title="선행 연결 해제"
          >
            ✕
          </button></span
        >`)}${r.map(s=>l`<span class="worker-dep worker-dep--succ" title=${s.title||""}
          >${s.label}</span
        >`)}${n.map(s=>l`<span class="worker-dep worker-dep--warn">${s}</span>`)}
  </div>`}function Hm(e){let t=Array.isArray(e.badges)?e.badges:[],r=zt(e.usage),n=$r(e.usage),s=ir(e.done_at);return l`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s?l`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>l`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${r.length>0?r.map(o=>l`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):n?l`<span class="worker-usage" title=${zn(e.usage)}
              >${n}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${ls(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Ln(e){if(e.lane==="done"&&e.done_layout==="three_line")return Hm(e);let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=zt(e.usage),s=$r(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?ir(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",p=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",m=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,T=l`<span class="worker-mini__title">${e.title}</span>`,M=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",H=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",se=r.map(xe=>xe===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${xe}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${xe===e.completion_badge&&e.completion_title||""}
          >${xe}</span
        >`),V=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",q=n.length>0?n.map(xe=>l`<span class="worker-usage" title=${xe.tooltip}
              >${xe.label}</span
            >`):s?l`<span class="worker-usage" title=${zn(e.usage)}
            >${s}</span
          >`:"",I=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",O=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",R=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",A=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",D=e.discard,G=D?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${D?.attempt_id||""}
          data-operation-id=${D?.operation?.operation_id||""}
          data-discard-mode=${D?.confirmation||"unmerged"}
          ?disabled=${D?!D.enabled:e.discard_enabled===!1}
          title=${D?D.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${D?.label||"\uD3D0\uAE30"}
        </button>`:"",pe=e.stale_work||null,fe=pe?l`${pe.can_resume||pe.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${pe.action_id}
            ?disabled=${pe.locked}
          >
            기존 작업 이어가기
          </button>`:""}${pe.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${pe.action_id}
            ?disabled=${pe.locked}
          >
            백업 후 새로 시작
          </button>`:""}${pe.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${pe.action_id}
            ?disabled=${pe.locked}
          >
            다시 확인
          </button>`:""}`:"",_e=pe?l`<div class="worker-mini__stale">
        <strong>${pe.title}</strong>
        <span>${pe.summary}</span>
        <span>${pe.cause}</span>
        ${pe.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ae=e.revise_action?l`<button
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
        </button>`:"",Le=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${ko(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Te=$o(e.dependency_chips),ee=is(e),oe=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||D?.operation||e.revise_action||pe);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${m}${k}${T}</div>
          <div class="worker-mini__row2">
            ${q}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${ls(e.work_ms)}</span
                >`:""}${se}${I}
            <span class="worker-mini__actions"
              >${O}${R}${A}${G}</span
            >
            ${Rn(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${d}${m}${k}${M}${H}${se}${p}${V}
            </div>
            <div class="worker-mini__body">${T}${_e}</div>
            ${Te}${Le}${oe?l`<div class="worker-mini__foot">
                  ${q}${I}
                  <span class="worker-mini__actions"
                    >${O}${R}${A}${G}${ae}${fe}</span
                  >
                  ${is(e)}
                </div>`:""}
            ${Rn(e)}`:l`<div class="worker-mini__line">
              ${u}${d}${m}${k}${T}${M}${H}${se}${p}${V}${q}${I}${O}${R}${A}${G}
            </div>
            ${Te}${Le}${ee} ${Rn(e)}`}
  </div>`}function Ua(e,t=null,r={}){let n=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!n,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=a&&a.chips||{},c=i.route||a&&a.route,u=i.route_source==="derived"||!!(a&&a.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=$o(e.dependency_chips);return l`<div
    class="worker-card${s?"":" worker-card--static"}${n?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${n?l`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${a&&c?l`<span
            class="ctl-chip ctl-chip--route${u?" is-derived":""}"
            title=${u?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${u?"unset":c}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?yn(a,e.status):""}${m}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${ko(e.exec_chips,{pin:r.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${t.lanes.map(k=>l`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${k.id}
                  title="${k.label} 대기 맨 뒤에 추가"
                >
                  <span>${k.label}</span>
                  <span class="worker-card__place-count">${k.count}</span>
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":n?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":d?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${Rn(e)}
  </div>`}function sr(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Ua(n,e.place_menu):Ln(n))}
          </div>`}
  </section>`}var du={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},pu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function fu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Wa(e){for(let t of fu(e))if(Object.hasOwn(du,t))return du[t];return null}function za(e){let t=null;for(let r of fu(e))Object.hasOwn(pu,r)&&(t=pu[r]);return t}function xo(e){let t=Wa(e),r=za(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function _u(e,t){let r=Wa(e)??Wa(t),n=za(t)??za(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var mu=160;function Gm(e){return e.length>mu?`${e.slice(0,mu)}\u2026`:e}function Vm(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Gm(e.command)}</code>`:""}
  </div>`}function Km(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Ym(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function gu(e){let t=e.failure?xo(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${Vm(e.failure.cause_detail)}
          ${Km(e.failure.reason)}
          ${is({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Zm(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}function Qm(e,t,r){if(!e)return"";let n=e.workflow||null,s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=Array.isArray(e.legs)?e.legs:[],c=i.filter(p=>p&&p.state==="live"),u=i.filter(p=>p&&p.state!=="live"),d=$o(e.dependency_chips);return l`${n?yn(n,"in_progress"):""}
  ${o?l`<div class="rtile__activity${r?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${ir(a,t)}</span
            >`:""}
      </div>`:""}${c.length>0||u.length>0?l`<div class="rtile__legs">
        ${c.map(p=>l`<span class="rtile__leg rtile__leg--live"
              >⟳ ${p.label}</span
            >`)}${u.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(p=>p.label).join(", ")}`}
              >✓ ${u.length}</span
            >`:""}
      </div>`:""}${d}`}function Ha(e,t,r=null,n={}){let s=e.failed===!0,o=!!e.paused,a=s?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):o?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ym(t-e.started_at):"\u2014",i=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,c=Bn(e),u=zt(e.usage),d=$r(e.usage),p=e.conflict_resolution?o?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,k=e.landing,T=e.attempt_id&&e.attempt_id===r,M=n.monitor||null,H=Zm(M),se=Qm(M,t,o),V=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${T?" rtile--sel":""}${o?" rtile--paused":""}${s?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${H}${c?l`<span class="rtile__resumed" title=${c}>↻</span>`:""}
      <span class="rtile__elapsed">${a}</span>
      ${s?l`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${V}
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
            ${o?l`<button
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
            ${V}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${se}${e.rollup?Us(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ra}):""}
    ${k?l`<div class="rtile__landing">
          <span
            class="merge-step${k.failed?" merge-step--failed":""}"
            style=${`--progress: ${k.percent}%`}
            >${k.label}${k.index>0?l`<span class="merge-step__n"
                  >${k.index}/${k.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${i||u.length>0||d||p||m?l`<div class="rtile__meta">
          ${p?l`<span class="worker-mini__badge">${p}</span>`:""}
          ${m?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${ko(e.exec_chips)}
          ${u.length>0?u.map(q=>l`<span class="worker-usage" title=${q.tooltip}
                    >${q.label}</span
                  >`):d?l`<span
                  class="worker-usage"
                  title=${zn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${Rn(e)} ${is(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${s||o?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ga(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Ha(s,t,r))}
  </div>`}function Va(e,t){return`${e}\0${t}`}function Ka(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function Ya(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Xm(e,t){return e==="internal"&&t===void 0}function In(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function hu(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${In(s)})`,location_label:In(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Ya(e,n),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:Xm(a,s)}}function bu(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Va(i.root_dir,c.id);r.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])n.set(d.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Va(i.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,m=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],k=s.get(u);if(k)for(let T of m){let M=n.get(T);M&&M!==u&&!k.includes(M)&&k.push(M)}}let o=(i,c)=>{let u=new Set,d=[i];for(;d.length>0;){let p=d.pop();if(p===c)return!0;!p||u.has(p)||(u.add(p),d.push(...s.get(p)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let d of c){let p=r.get(d);o(d,i)&&p&&u.push(p)}u.length>0&&a.set(i,u)}return a}function yu(e){let t=Ka(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=In(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function vu(e,t){return Va(e,t)}var Za=new Set(["unavailable","not_applicable"]);function Dr(e,t){if(typeof e!="object"||e===null)return null;let r=e[t];return typeof r=="object"&&r!==null?r:null}function wu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Nr(e,t){return t===null?null:`${Mr[e]}: ${t.display} (${mo[t.source]})`}function Qa(e){return e.filter(t=>t!==null).join(`
`)}function Ao(e){if(typeof e!="object"||e===null)return null;let t=Jr(e);if(t==="")return null;let r=(n,s)=>typeof s=="string"&&s.length>0?`${n}: ${s}`:null;return{text:t,title:Qa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",r("runner",e.runner),r(Mr.orchestration_model,e.model),r(Mr.orchestration_effort,e.effort),r(Mr.orchestration_speed,e.speed)])}}function nn(e,t){let r=Dr(e,"orchestration_model");if(r===null||r.resolution==="unavailable")return null;let n=Dr(e,"orchestration_effort"),s=Dr(e,"orchestration_speed"),o=wu([gr(t,r.value??""),r.display,n!==null&&n.value!==null?n.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Qa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Nr("orchestration_model",r),Nr("orchestration_effort",n),Nr("orchestration_speed",s)])}}function Jm(e,t){return e===null||e.value===null||Za.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function eg(e){return e===null||Za.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function tg(e){return e===null?null:e.value==="auto"?"auto":Za.has(e.resolution)?null:e.display}function qr(e,t){if(typeof e!="object"||e===null)return null;let r=Dr(e,"impl_dispatch"),n=Dr(e,"impl_runtime"),s=Dr(e,"impl_model"),o=Dr(e,"impl_effort"),a=Dr(e,"impl_speed"),i=r!==null&&r.value==="main"?"\uBA54\uC778":wu([Jm(n,t??null),eg(s),tg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Qa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Nr("impl_dispatch",r),Nr("impl_runtime",n),Nr("impl_model",s),Nr("impl_effort",o),Nr("impl_speed",a)])}}var Xt="",rg=["impl_runtime","impl_model","impl_effort"],ng=5,So=1;function Cr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Eo(e,t){let r=t.transport,n=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(E=>me(E,"error",4e3)),o={},a={},i=[],c=!1,u=null,d={},p="",m="",k=!1,T=!1,M=!1,H=null,se=!1;function V(){let E=t.queue?t.queue():null;return Cr(E)?E:null}function q(){let E=V();return E?E.runner_catalog:null}function I(){let E=V();return E&&Cr(E.execution_defaults)?E.execution_defaults:null}function O(){let E=t.implPresetStore?.get();return Cr(E)&&Array.isArray(E.presets)?E:null}function R(){return n===null?{}:{root_dir:n}}async function A(E,Q){return se||!r?null:await r(E,Q)}function D(E){E&&Cr(E.queue)&&t.onQueueAdopt?.(E.queue)}async function G(E,Q){let Ee=V();if(!Ee||se)return null;let re=await A(E,{...Q,...R(),expected_revision:Ee.revision});if(D(re),n!==null&&re&&re.conflict){let qe=re.queue&&typeof re.queue.revision=="number"?re.queue.revision:V()?.revision??Ee.revision;re=await A(E,{...Q,...R(),expected_revision:qe}),D(re)}return re}async function pe(){c=!0,Ie();try{let E=await A("get-session-defaults",{...R()});o=Cr(E?.values)?{...E.values}:{},a={...o},i=Array.isArray(E?.warnings)?E.warnings:[]}catch(E){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}finally{c=!1,Ie()}}async function fe(){let E=qc(o,a);if(Object.keys(E).length!==0){try{let Q=await A("set-session-defaults",{values:E,...R()});o=Cr(Q?.values)?{...Q.values}:{},a={...o},i=Array.isArray(Q?.warnings)?Q.warnings:[]}catch(Q){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ie()}}function _e(E,Q){if(rg.includes(E)){Te(E,Q);return}Q===Xt?delete a[E]:a[E]=Q,Ie(),fe()}function ae(){let E=Je().orchestration_model,Q=Qt({global:{orchestration_model:E??void 0},execution_defaults:I(),runner_catalog:q()}).orchestration_model.value;return Q?gr(q(),Q):null}function Le(E,Q){typeof Q=="string"&&Q.length>0?a[E]=Q:delete a[E]}function Te(E,Q){let Ee=Q===Xt?void 0:Q,re=Dc({impl_runtime:E==="impl_runtime"?Ee:a.impl_runtime,impl_model:E==="impl_model"?Ee:a.impl_model,impl_effort:E==="impl_effort"?Ee:a.impl_effort},q(),ae());Le("impl_runtime",re.impl_runtime),Le("impl_model",re.impl_model),Le("impl_effort",re.impl_effort),Ie(),fe()}async function ee(){let E=V();if(!E)return;let Q={orchestration_model:E.orchestration_model??null,orchestration_effort:E.orchestration_effort??null,orchestration_speed:E.orchestration_speed??null},Ee=Fc(Q,{...Q,...d});if(Object.keys(Ee).length!==0){try{let re=await G("worker-queue-set-orchestration-defaults",{values:Ee});if(re&&re.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}d={}}catch(re){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Ie()}}function oe(E,Q){d[E]=Q===Xt?null:Q,Ie(),ee()}function xe(E){if(u=E,!E){Ie();return}let Q=q(),Ee=Je(),re=Ee.orchestration_model;re&&!os(Q,E).includes(re)&&(d.orchestration_model=null,re=null);let qe=Ee.orchestration_effort;qe&&!Da(Q,E,re||nr).includes(qe)&&(d.orchestration_effort=null),Ie(),ee()}async function g(E){if(!(!V()||E<So)){try{await G("worker-queue-set-slots",{slots:E})}catch(Q){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ie()}}async function j(E){if(!(!V()||E<So||E>ng)){try{await G("worker-queue-set-serial-lane-count",{count:E})}catch(Q){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ie()}}async function U(E,Q){let Ee=E==="auto_advance"?"worker-automation-toggle":E==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await G(Ee,{on:Q})}catch(re){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Ie()}function K(){let E={},Q=Je();for(let Ee of uo){let re=Tr.includes(Ee)?Q[Ee]:a[Ee];typeof re=="string"&&re.length>0&&(E[Ee]=re)}return E}async function ge(){let E=O();if(!E)return;let Q=K();if(Object.keys(Q).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let Ee=(E.presets||[]).find(qe=>qe.id===p),re=m.trim()||(Ee?Ee.name:"");if(!re){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let qe=Ee?await A("impl-preset-update",{expected_revision:E.revision,id:Ee.id,name:re,settings:Q}):await A("impl-preset-create",{expected_revision:E.revision,name:re,settings:Q});if(qe&&qe.applied){if(m="",!Ee&&Array.isArray(qe.presets)){let rt=qe.presets.find(it=>it.name===re);p=rt?rt.id:p}Ie()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ie()}catch(qe){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${qe instanceof Error?qe.message:String(qe)}`)}}async function we(){let E=O();if(!(!E||p.length===0))try{let Q=await A("impl-preset-delete",{expected_revision:E.revision,id:p});Q&&Q.applied?(p="",Ie()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ie())}catch(Q){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}}function ke(E){o=Cr(E.values)?{...E.values}:{},a={...o},i=Array.isArray(E.warnings)?E.warnings:[],Cr(E.queue)&&(t.onQueueAdopt?.(E.queue),d={})}async function Ze(){let E=O(),Q=V();if(!E||!Q||p.length===0)return;let Ee=re=>({preset_id:p,expected_revision:E.revision,expected_queue_revision:re,...R()});try{let re=await A("apply-impl-preset-global",Ee(Q.revision));if(re&&re.applied&&ke(re),n!==null&&re&&re.queue_applied===!1){let qe=re.queue&&typeof re.queue.revision=="number"?re.queue.revision:V()?.revision??Q.revision;re=await A("apply-impl-preset-global",Ee(qe)),re&&re.applied&&ke(re)}re&&re.applied?re.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):re&&re.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(re){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${re instanceof Error?re.message:String(re)}`)}Ie()}async function wt(){T=!0,M=!1,Ie();try{let E=await A("get-worker-system-prompt",{});!E||typeof E!="object"||Array.isArray(E)?M=!0:H=E}catch{M=!0}finally{T=!1,Ie()}}function He(){if(k=!k,k&&!H){wt();return}Ie()}function pt(){let E=Sn({loading:T,error:M});if(E)return E;if(!H)return"";let Q=Array.isArray(H.variants)?H.variants:[];return l`<div class="settings-dialog__sp-body">
      ${H.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${H.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Q.map(Ee=>l`<div class="settings-dialog__sp-variant" data-variant=${Ee.key}>
            <div class="settings-dialog__sp-cond">${Ee.condition}</div>
            ${Er(Ee.label,Ee.system_prompt)}
          </div>`)}
    </div>`}function st(){return l`<section
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
        aria-expanded=${k?"true":"false"}
        @click=${He}
      >
        ${k?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${k?pt():""}
    </section>`}function Y(E,Q,Ee,re,qe,rt,it){let Xe=qe[E]??Xt,nt=Na(E,Ee,qe,I(),q(),it),_t=nt.options.find(at=>at.value===Xe),ht=Xe===Xt?nt.full_value:_t?.full_value;return l`<select
        class=${Xe===Xt?"settings-dialog__unset":""}
        data-key=${E}
        aria-label=${Q}
        title=${ht||""}
        ?disabled=${rt===!0||nt.disabled}
        .value=${rn(String(Xe))}
        @change=${at=>re(E,String(at.target.value))}
      >
        <option value=${Xt} ?selected=${Xe===Xt}>
          ${nt.unset_label}
        </option>
        ${nt.options.map(at=>l`<option
              value=${at.value}
              title=${at.full_value||""}
              ?selected=${at.value===Xe}
            >
              ${at.label}
            </option>`)}
      </select>
      ${Xe===Xt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Z(E,Q,Ee,re,qe,rt=!1,it){return l`<div
      class=${`settings-dialog__row${rt?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        ${Y(E,Q,Ee,re,qe,rt,it)}
      </span>
    </div>`}function Se(E,Q,Ee,re,qe){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Q}-on)`}
        ></i>
        ${E}
      </span>
      <span class="settings-dialog__controls">
        ${Y(Ee,`${E} \uBAA8\uB378`,re,_e,a,!1)}
        ${Y(qe,`${E} effort`,_o,_e,a,!1)}
      </span>
    </div>`}function Qe(E,Q,Ee,re){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${re?" is-on":""}`}
          data-automation=${E}
          aria-pressed=${re?"true":"false"}
          aria-label=${Q}
          @click=${()=>U(E,!re)}
        >
          ${re?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${Ee}</span>
      </span>
    </div>`}function je(E,Q,Ee,re){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${E}>
          <button
            type="button"
            aria-label=${`${Q} \uAC10\uC18C`}
            @click=${()=>re(Ee-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${Ee}</span>
          <button
            type="button"
            aria-label=${`${Q} \uC99D\uAC00`}
            @click=${()=>re(Ee+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function ot(E){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${E.rows.length>0?`\uBCC0\uACBD ${E.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${E.rows.map(Q=>l`<div
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
      ${E.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${E.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Je(){let E=V(),Q={};for(let Ee of Tr)Q[Ee]=Object.prototype.hasOwnProperty.call(d,Ee)?d[Ee]:E&&typeof E[Ee]=="string"?E[Ee]:null;return Q}function yt(){let E=q(),Q=a.impl_runtime,Ee=a.impl_model,re=O(),qe=V(),rt=Je(),it=os(E,u),Xe=Tn(E,void 0).filter(he=>he!==nr),nt=Da(E,u,rt.orchestration_model||nr).filter(he=>he!==nr),_t=p?(re?.presets||[]).find(he=>he.id===p):null,ht=_t?Nc(K(),Cr(_t.settings)?_t.settings:{}):null,at=qe&&typeof qe.slots=="number"?qe.slots:So+1,kt=qe&&typeof qe.serial_lane_count=="number"?qe.serial_lane_count:So,N=I()?.supported===!0,te=Na("workflow_mode",ns,a,I(),E);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${N?"":l`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${c?l`<div class="settings-dialog__empty">불러오는 중…</div>`:l`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${rn(p)}
                @change=${he=>{p=String(he.target.value),Ie()}}
              >
                <option value="" ?selected=${p===""}>
                  실행 프리셋…
                </option>
                ${(re?.presets||[]).map(he=>l`<option
                      value=${he.id}
                      ?selected=${he.id===p}
                    >
                      ${he.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ht||ht.rows.length===0}
                @click=${Ze}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${p?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${rn(m)}
                @input=${he=>{m=String(he.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${p?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${ge}
              >
                ${p?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${p.length===0}
                @click=${we}
              >
                삭제
              </button>
            </div>
            ${ht?ot(ht):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${rn(u||Xt)}
                    @change=${he=>{let ze=String(he.target.value);xe(ze===Xt?null:ze)}}
                  >
                    <option value=${Xt} ?selected=${!u}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${u==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${u==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Z("orchestration_model","\uBAA8\uB378",it,oe,rt)}
              ${Z("orchestration_effort","effort",nt,oe,rt)}
              ${Z("orchestration_speed","\uC18D\uB3C4",rs,oe,rt)}
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
                      ${te.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ns.map(he=>l`<button
                          type="button"
                          data-mode=${he}
                          aria-pressed=${String(a.workflow_mode===he)}
                          @click=${()=>_e("workflow_mode",he)}
                        >
                          ${he}
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
              ${Se("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ss,"spec_review_effort")}
              ${Se("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",fo,"plan_review_effort")}
              ${Se("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ss,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Z("impl_runtime","\uC704\uC784 \uB300\uC0C1",po,_e,a)}
              ${Z("impl_model","\uBAA8\uB378",Tn(E,Q),_e,a)}
              ${Z("impl_effort","effort",Cn(E,Q,Ee),_e,a)}
              ${Z("impl_speed","\uC18D\uB3C4",rs,_e,a)}
              ${Z("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Xe,_e,a,!1,{...a,...rt})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Qe("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",qe?.auto_advance===!0)}
              ${Qe("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",qe?.auto_merge===!0)}
              ${Qe("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",qe?.auto_repair===!0)}
              ${je("slots","\uB3D9\uC2DC \uC2E4\uD589",at,he=>g(he))}
              ${je("serial-lane-count","\uC9C1\uB82C \uB808\uC778",kt,he=>j(he))}
            </div>
            ${st()}
          `}
    `}function Ie(){se||Ye(yt(),e)}return{load(){return d={},pe()},render:Ie,sessionDraft:()=>({...a}),destroy(){se=!0,Ye(l``,e)}}}function us(e){return l`<svg
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
  </svg>`}function ku(){return us(_n`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function $u(){return us(_n`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function xu(){return us(_n`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Au(){return us(_n`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Su(){return us(_n`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Eu(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Tu(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return zt(Vs(t));let r={};for(let i of kr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let d of kr){let p=c[d];typeof p=="number"&&Number.isFinite(p)&&(r[d]+=p,n=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?$r(r):null}function hr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function To(e,t){let r=hr(e?.counts)?e.counts:null,n=r?r[t]:null;return typeof n=="number"&&Number.isFinite(n)?n:0}function sg(e,t){if(!hr(t))return e;let r={...e};for(let[n,s]of Object.entries(t))s!==void 0&&(r[n]=s);return r}function og(e){if(!hr(e)||!hr(e.execution_defaults)||!hr(e.runner_catalog)||!hr(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let r=Qt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),n=gr(e.runner_catalog,r.orchestration_model.value??""),s=nn(r,e.runner_catalog),o=qr(r,n);return s===null&&o===null?null:{orchestration:s,worker:o}}function Cu(e,t){let r=t.notify||(g=>me(g,"error",4e3)),n=document.createElement("div");n.className="mon2-deck__main",e.appendChild(n);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,d=null,p=null,m=new Map;function k(){let g=t.workspacesState?t.workspacesState():[];return Array.isArray(g)?g.filter(j=>hr(j)):[]}function T(g){return k().find(j=>j.root_dir===g)||null}function M(g){return sg(T(g),m.get(g))}function H(){for(let g of k()){let j=m.get(g.root_dir);j&&typeof j.revision=="number"&&typeof g.revision=="number"&&g.revision>=j.revision&&m.delete(g.root_dir)}}async function se(g,j,U){let K=t.transport,ge=M(j);if(!(!K||!hr(ge))){try{let we=await K(g,{...U,root_dir:j,expected_revision:ge.revision});if(hr(we?.queue)&&m.set(j,we.queue),we&&we.conflict){let ke=hr(we.queue)&&typeof we.queue.revision=="number"?we.queue.revision:M(j)?.revision;we=await K(g,{...U,root_dir:j,expected_revision:ke}),hr(we?.queue)&&m.set(j,we.queue)}}catch(we){r(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${we instanceof Error?we.message:String(we)}`)}ee()}}function V(g){u!==g&&(u=g,t.onFocusChange?.(u),ee())}function q(g){V(u===g?null:g)}function I(g){if(d===g){R();return}O(),d=g;let j=T(g);a.textContent=`${j?.name||g} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,p=Eo(c,{root_dir:g,queue:()=>M(g),transport:t.transport,implPresetStore:t.implPresetStore,notify:r,onQueueAdopt:U=>{m.set(g,U),ee()}}),p.load(),ee()}function O(){p?.destroy(),p=null}function R(g){O(),d=null,s.hidden=!0,a.textContent="",g!==!0&&ee()}let A=()=>R();i.addEventListener("click",A);function D(g){g.key==="Escape"&&u!==null&&V(null)}document.addEventListener("keydown",D);function G(g,j){let U=Math.max(j,g,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${j}\uAC1C \uC911 ${g}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:U},(K,ge)=>ge<g?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function pe(g){let j=g.auto_advance===!0,U=g.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${j?" is-on":""}`}
        data-act="auto"
        aria-pressed=${j?"true":"false"}
        aria-label=${`${g.name} \uC790\uB3D9\uD654`}
        title=${j?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${j?$u():ku()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${U?" is-on":""}`}
        data-act="merge"
        aria-pressed=${U?"true":"false"}
        aria-label=${`${g.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${U?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${xu()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===g.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===g.root_dir?"true":"false"}
        aria-label=${`${g.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Su()}
      </button>`}function fe(g){let j=og(g);return j?l`<div class="mon2-deck__chips">
      ${j.orchestration?l`<span class="mon2-deck__chip" title=${j.orchestration.title}
            >오케 ${j.orchestration.text}</span
          >`:""}
      ${j.worker?l`<span class="mon2-deck__chip" title=${j.worker.title}
            >워커 ${j.worker.text}</span
          >`:""}
    </div>`:""}function _e(g){let j=To(g,"running"),U=typeof g.slots=="number"?g.slots:1;return l`<div
      class=${`mon2-deck__tile${u===g.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${g.root_dir}
      aria-pressed=${u===g.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${g.root_dir}>${g.name}</span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          title="이 레포의 Worker 탭으로 이동"
        >
          Worker ↗
        </button>
      </div>
      <div class="mon2-deck__slots">
        ${Au()} ${G(j,U)}
        <span class="mon2-deck__counts"
          >${j}/${U} 실행 · 대기 ${To(g,"queue")} · PR
          ${To(g,"pr_wait")}</span
        >
      </div>
      <div class="mon2-deck__ops">${pe(g)}</div>
      ${fe(g)}
    </div>`}function ae(g){let j=t.doneItems?t.doneItems():[],U=t.rangeLabel?t.rangeLabel():"",K=Tu(Array.isArray(j)?j:[]),ge=we=>g.reduce((ke,Ze)=>ke+To(Ze,we),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${g.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${U}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${ge("running")} · 대기 ${ge("queue")} · PR ${ge("pr_wait")} ·
        ${U} 완료 ${Array.isArray(j)?j.length:0}
      </div>
      ${K===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof K=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${Eu(U)}
                  >τ ${K}</span
                >`:K.map(we=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${we.provider}
                      title=${we.tooltip}
                      >τ ${we.label}</span
                    >`)}
          </div>`}
    </div>`}function Le(){let g=k();return g.length===0?"":l`<div class="mon2-deck__row">
      ${ae(g)}
      <div class="mon2-deck__strip">
        ${g.map(j=>_e(j))}
      </div>
    </div>`}function Te(){u!==null&&!T(u)&&(u=null,t.onFocusChange?.(null))}function ee(){H(),Te(),d!==null&&!T(d)&&R(!0),Ye(Le(),n),p?.render()}function oe(g){let j=g.target;if(!j||typeof j.closest!="function")return;let U=j.closest("[data-root-dir]");if(!U)return;let K=U.getAttribute("data-root-dir")||"",ge=j.closest("[data-act]")?.getAttribute("data-act");if(ge==="worker"){t.gotoWorkerTab?.(K);return}if(ge==="auto"){se("worker-automation-toggle",K,{on:M(K)?.auto_advance!==!0});return}if(ge==="merge"){se("worker-merge-auto-toggle",K,{on:M(K)?.auto_merge!==!0});return}if(ge==="gear"){I(K);return}q(K)}function xe(g){if(g.key!=="Enter"&&g.key!==" ")return;let j=g.target;if(!j||typeof j.closest!="function")return;let U=j.closest('[data-root-dir][role="button"]');!U||U!==j||(g.preventDefault(),q(U.getAttribute("data-root-dir")||""))}return n.addEventListener("click",oe),n.addEventListener("keydown",xe),{render:ee,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",D),n.removeEventListener("click",oe),n.removeEventListener("keydown",xe),i.removeEventListener("click",A),O(),Ye(l``,n),e.replaceChildren()}}}var Ru={running:3,paused:2,failed:1};function Lu(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),p=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!p&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Ru[u.run_state],p=Ru[i];if(d>p||d===p&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:n}}var Iu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],ds=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Co(e,t){let r=Iu.find(s=>s.step===e);if(!r)return null;let n=Iu.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Ou(e){let t=ds.findIndex(r=>r.step===e);return ds.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function sn(e){let t=ds.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function ag(e){let t=ds.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:ds.length}}function Ro(e){let t=ag(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ja=new Set(["queued","running","retry_pending","repairing"]),Pu=new Set(["failed","succeeded"]),ig={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},ps={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},lg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ps.base_containment,child_sweep:ps.child_sweep,branch_cleanup:ps.branch_cleanup,parent_close:ps.parent_close};function cg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function ug(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Ja,...Pu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function dg(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function Xa(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=ig[s];if(!o)return null;let a=Co(r,`${n} ${o}`);return a?{...a,active:Ja.has(s),failed:s==="failed"}:null}function pg(e){return!e||typeof e!="object"?null:lg[e.step]||null}function fs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=pg(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=cg(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(T=>T&&typeof T=="object"&&ug(T,t,i)).sort(dg):[],u=a?c:[],d=u.find(T=>Ja.has(T.state));if(d)return Xa(d);if(s)return s.step==="repo_operations"&&c[0]?Xa(c[0],!0):null;let p=u.find(T=>Pu.has(T.state)?T.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return Xa(p);if(n){let T=Co(n.step,n.label);return T?{...T,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?ps[e.cleanup_cursor]:null;if(!m)return null;let k=Co(m.step,m.label);return k?{...k,active:!0,failed:!1}:null}function Lo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Mu=1,_s=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ei=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],On={show_blocked:!0,spec:"all"},Du={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function fg(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function _g(e,t){let{winners:r,resumed_from_ids:n}=Lu(e,t),s=new Map;for(let[o,a]of r){let i=a.attempt,c=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:lr(e,i.bead_id),can_pause:c==="running"&&d,can_resume:c!=="running"&&d&&!n.has(i.attempt_id)})}return s}function Nu(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function mg(e,t,r){let n=Rt(t);if(Object.keys(n).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=m=>Qt({pin:m,global:a,execution_defaults:s,runner_catalog:o,route:r}),c,u;try{c=i(n),u=i(null)}catch{return null}let d=qu(nn(c,o),nn(u,o)),p=qu(qr(c,null),qr(u,null));return d||p?{orchestration:d,worker:p}:null}function qu(e,t){return!e||t&&t.text===e.text?null:e}function gg(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function hg(e,t){let r=t.get(e);return r?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${In(r)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function bg(e,t,r){let n=new Map;for(let c of e)n.set(c,Array.from(r.get(c)||[]).filter(u=>e.includes(u)).length);let s=[],o=new Map,a=e.filter(c=>(n.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let i=[...a];for(;i.length>0;){let c=i.shift();s.push(c);let u=Array.from(t.get(c)||[]).filter(p=>e.includes(p)).sort(),d=(o.get(c)||0)+(u.length>1?1:0);for(let p of u){let m=(n.get(p)||0)-1;n.set(p,m);let k=o.get(p);o.set(p,k===void 0?d:Math.min(k,d)),m===0&&i.push(p)}}return{order:s,indent:o,cycle:s.length!==e.length}}function yg(e,t,r){let n=new Map,s=new Map,o=new Set,a=(u,d,p)=>{let m=u.get(d);m?m.add(p):u.set(d,new Set([p]))};for(let[u,d]of e)for(let p of d)p!==u&&(o.add(p),o.add(u),a(n,p,u),a(s,u,p));let i=new Set,c=[];for(let u of Array.from(o).sort()){if(i.has(u))continue;let d=[],p=[u];for(i.add(u);p.length>0;){let V=p.pop();d.push(V);for(let q of[...n.get(V)||[],...s.get(V)||[]])i.has(q)||(i.add(q),p.push(q))}if(d.length<2)continue;let m=d.map(V=>t.get(V));if(m.every(V=>!!V&&/^s[1-5]$/.test(V.lane||""))&&m.every(V=>V&&m[0]&&V.root_dir===m[0].root_dir&&V.lane===m[0].lane))continue;let{order:T,indent:M,cycle:H}=bg(d.slice().sort(),n,s),se=H?d.slice().sort():T;c.push({key:se.join("\0"),cycle:H,nodes:se.map(V=>{let q=t.get(V);return{id:V,workspace_name:q?q.workspace_name:"",root_dir:q?q.root_dir:"",location_label:q?In(q):vg(V,r),indent:H?0:M.get(V)||0}})})}return c}function vg(e,t){let r=Ya(e,t);return r==="internal"?"\uBBF8\uC801\uC7AC":r==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Fu(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ti(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a={...On,...r&&r.candidate_filter?r.candidate_filter:{}},i=r&&_s.some(g=>g.value===r.candidate_sort)?r.candidate_sort:"repo_spec",c=new Map;for(let g of s)g&&typeof g.root_dir=="string"&&c.set(g.root_dir,g);let u=[],d=[],p=[],m=[],k=[],T=[],M=new Map,H=new Map,se=new Map,V=new Map,q=new Map;for(let g of n){if(!g||typeof g.root_dir!="string")continue;let j=g.root_dir,U=g.name||j,K=c.get(j),ge=K&&typeof K.revision=="number"?K.revision:typeof g.revision=="number"?g.revision:0,we=Rt(g.attempts),ke=Rt(g.bead_titles),Ze=Rt(g.bead_times),wt=Rt(g.pr_observations),He=Rt(g.admission),pt=Rt(g.revise_parked),st=Rt(g.merge_queue_state),Y=Rt(g.cleanup_failed),Z=Rt(g.discard_operations),Se=Rt(g.bead_blocked_by),Qe=Rt(g.bead_workflow),je=Rt(g.pr_activity),ot=Array.isArray(g.repo_operations)?g.repo_operations:[],Je=Array.isArray(g.merge_queue)?g.merge_queue:[],yt=new Set(Je.filter(N=>N&&typeof N.bead_id=="string").map(N=>N.bead_id)),Ie=new Map(Je.filter(N=>N&&typeof N.bead_id=="string").map(N=>[N.bead_id,N])),E=Array.isArray(g.queue)?g.queue:[],Q=(Array.isArray(g.serial_lanes)?g.serial_lanes:[]).filter(N=>N&&/^s[1-5]$/.test(N.id)&&Array.isArray(N.entries)),Ee=Rt(g.lane_states),re=typeof g.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(g.serial_lane_count))):Math.min(5,Q.length);se.set(j,re),V.set(j,E.length);let qe=new Map(Q.map(N=>[N.id,N])),rt=new Map;for(let N of Q)for(let te of N.entries)te&&typeof te.bead_id=="string"&&rt.set(te.bead_id,N.id);for(let[N,te]of Object.entries(Se))Array.isArray(te)&&q.set(N,te.filter(he=>typeof he=="string"&&he.length>0));let it=Array.isArray(g.done)?g.done:[];for(let N of it)N&&typeof N.bead_id=="string"&&T.push({id:N.bead_id,root_dir:j,workspace_name:U});let Xe=new Map;for(let N of it)N&&typeof N.bead_id=="string"&&typeof N.added_at=="number"&&Xe.set(N.bead_id,N.added_at);let nt=N=>({id:N,title:ke[N]||N,root_dir:j,workspace_name:U,expected_revision:ge,draggable:!1,...Rt(Ze[N]).created_at?{created_at:Rt(Ze[N]).created_at}:{},...Rt(Ze[N]).updated_at?{updated_at:Rt(Ze[N]).updated_at}:{}}),_t=new Set;for(let[N,te]of _g(we,Xe))_t.add(N),d.push({...nt(N),lane:"running",...rt.has(N)?{serial_lane_id:rt.get(N)}:{},attempt_id:te.attempt_id,run_state:te.run_state,status:te.status||void 0,workflow:Qe[N]||null,can_pause:te.can_pause,can_resume:te.can_resume,started_at:te.started_at,last_event_at:te.last_event_at,last_activity:te.last_activity,legs:te.legs,runner:te.runner,model:te.model,effort:te.effort,speed:te.speed,resumed_from:te.resumed_from,continuation_mode:te.continuation_mode,usage:te.usage,exec_chips:{orchestration:Ao(te),worker:null},discard:yr(Z,N,{attempt_id:te.attempt_id}),badges:te.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:te.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:te.run_state==="failed"});for(let N of Array.isArray(g.pr_wait)?g.pr_wait:[]){let te=N&&N.bead_id;if(typeof te!="string"||_t.has(te))continue;_t.add(te);let he=Rt(wt[te]),ze=Rt(he.pr),De=he.gate?Rt(he.gate):null,F=yt.has(te),ne=Ie.get(te)?.continuation_action||null,ve=!!ne&&ne.continuation===null,w=st.active===te,C=N.external===!0,B=Y[te]||null,ie=Rt(je[te]),Ce=fs({bead_id:te,merge_sha:N.merge_sha,cleanup_cursor:N.cleanup_cursor,merge_progress:ie.merge_progress||null,cleanup_failed:B,repo_operations:ot}),Ae=Lo(Ce),Pe=!!De&&De.base_badge==="\uCDA9\uB3CC",Be=!!B&&["child_sweep","branch_cleanup","parent_close"].includes(B.step)&&!!De&&De.tier==="merged",St=C&&!!B&&!!De&&De.tier==="merged",bt=!!De&&["closed_unmerged","review","undecidable"].includes(De.tier),Ke=yr(Z,te,{external:C,merge_active:w||Ce?.step==="merge",merge_queued:F,cleanup_active:Ae,merged:!!B||De?.tier==="merged"}),Ft=!!Ke.operation;p.push({...nt(te),lane:"pr_wait",pr_number:typeof ze.number=="number"?ze.number:null,pr_url:typeof ze.url=="string"?ze.url:void 0,external:C,usage:lr(we,te),merge_step:Ce,badges:ve?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ce?[De?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:B?[sn(B.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${sn(B.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof De?.gate_badge=="string"&&De.gate_badge.length>0?[De.gate_badge]:[],alert:Ce?Ce.failed===!0:!!B||bt,reason:B&&Ce?.active!==!0?Ro(B.step):"PR \uB300\uAE30",merge_action:De?.tier==="merged"&&!Be&&!St?!1:!F||ve,merge_enabled:!Ft&&(ve||De?.enabled===!0||Pe||Be||St),merge_label:ve?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":St||Be?"\uC815\uB9AC \uC7AC\uAC1C":Pe&&!Be?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ve?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ft?Ke.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ke.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ke.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:St?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Pe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":De?.enabled===!0?`\uBA38\uC9C0 (${De.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${De?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:F&&!ve,cancel_enabled:!w,continuation_mismatch:ne?.mismatch||null,discard:Ke,discard_action:Ke.action,discard_enabled:Ke.enabled,discard_title:Ke.title})}let ht=(N,te,he,ze)=>{let De=N&&N.bead_id;if(typeof De!="string"||_t.has(De))return null;_t.add(De);let F=pt[De],ne=yr(Z,De),ve=ne.operation?ne:null,w={...nt(De),lane:te,draggable:!ve,discard:ve||void 0,reason:Nu(He,De),seq:he+1,queue_position:he+1,queue_index:he,queue_length:ze,badges:F?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!F,revise_action:!!F,revise_enabled:!!F&&!ve,revise_title:F?F.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${F.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Se,De)&&(w.blocked_by=Array.isArray(Se[De])?Se[De].filter(C=>typeof C=="string"&&C.length>0):[]),w};for(let N=0;N<E.length;N++){let te=ht(E[N],"queue",N,E.length);if(!te)continue;m.push(te);let he=M.get(j);he?he.push(te):M.set(j,[te])}let at=[];for(let N=0;N<Math.max(re,Q.length);N++){let te=`s${N+1}`,he=qe.get(te),ze=he&&Array.isArray(he.entries)?he.entries:[],De=[];for(let ve=0;ve<ze.length;ve++){let w=ht(ze[ve],te,ve,ze.length);w&&(De.push(w),m.push(w))}let F=Rt(Ee[te]),ne=Array.isArray(F.occupied_by)?F.occupied_by.filter(ve=>typeof ve=="string"):[];De.length===0&&ne.length===0&&(re<=1||N>=re)||at.push({id:te,index:N,items:De,raw_length:ze.length,occupied_by:ne,corrections:Array.isArray(F.corrections)?F.corrections.length:0,cycle:F.cycle===!0,...De.length===0&&ne.length===0?{empty:!0}:{}})}H.set(j,at);let kt=Array.from({length:re},(N,te)=>{let he=`s${te+1}`,ze=qe.get(he),De=ze&&Array.isArray(ze.entries)?ze.entries:[],F=Rt(Ee[he]);return{id:he,index:De.length,length:De.length,occupied_by:Array.isArray(F.occupied_by)?F.occupied_by.filter(ne=>typeof ne=="string"):[]}});for(let N of Array.isArray(g.runnable)?g.runnable:[]){let te=N&&N.bead_id;if(typeof te!="string"||_t.has(te))continue;_t.add(te);let he=N.workflow&&typeof N.workflow=="object"?N.workflow:null,ze=he&&typeof he.route=="string"&&he.route||(typeof N.route=="string"?N.route:null),De=mg(Rt(K),N.exec_pins,ze);Array.isArray(N.blocked_by)&&N.blocked_by.length>0&&q.set(te,N.blocked_by.filter(F=>typeof F=="string"&&F.length>0)),u.push({...nt(te),title:N.title||ke[te]||te,lane:"runnable",draggable:!0,reason:Nu(He,te),created_at:N.created_at??void 0,updated_at:N.updated_at??void 0,status:typeof N.status=="string"?N.status:void 0,labels:Array.isArray(N.labels)?N.labels:[],spec_id:typeof N.spec_id=="string"?N.spec_id:"",workflow:he||(ze?{route:ze,chips:{route:ze}}:null),...De?{exec_chips:De}:{},blocked:N.blocked===!0,...Array.isArray(N.blocked_by)?{blocked_by:N.blocked_by.filter(F=>typeof F=="string"&&F.length>0)}:{},place_index:E.length,place_lanes:kt})}for(let N of it){let te=N&&N.bead_id;if(typeof te!="string"||_t.has(te)||(_t.add(te),o!==void 0&&typeof N.added_at=="number"&&N.added_at<o))continue;let he=fg(we,te),ze=he&&typeof he.done_kind=="string"?he.done_kind:null;k.push({...nt(te),lane:"done",done:!0,done_layout:"three_line",usage:lr(we,te),work_ms:yo(we,te),done_at:typeof N.added_at=="number"?N.added_at:void 0,done_kind:ze,badges:ze&&Du[ze]?[Du[ze]]:[]})}}let I=new Map;s.forEach((g,j)=>{g&&typeof g.root_dir=="string"&&I.set(g.root_dir,j)});let O=r&&r.running_sort==="repo"?"repo":"started";d.sort((g,j)=>{if(O==="repo"){let ge=I.get(g.root_dir)??Number.MAX_SAFE_INTEGER,we=I.get(j.root_dir)??Number.MAX_SAFE_INTEGER;if(ge!==we)return ge-we}let U=typeof g.started_at=="number"&&Number.isFinite(g.started_at)?g.started_at:null,K=typeof j.started_at=="number"&&Number.isFinite(j.started_at)?j.started_at:null;return U!==null&&K!==null&&U!==K?U-K:U===null&&K!==null?1:U!==null&&K===null?-1:g.id.localeCompare(j.id)}),k.sort((g,j)=>(j.done_at??0)-(g.done_at??0));let R=s.length>0?s:n.map(g=>({root_dir:g&&g.root_dir,name:g&&g.name,auto_advance:g&&g.auto_advance,auto_merge:g&&g.auto_merge,slots:g&&g.slots,revision:g&&g.revision,runner_catalog:g&&g.runner_catalog})),A=new Set(u.map(g=>g.root_dir)),D=[];for(let g of R){if(!g||typeof g.root_dir!="string")continue;let j=M.get(g.root_dir)||[],U=H.get(g.root_dir)||[];!(j.length>0||U.some(ge=>ge.items.length>0||ge.occupied_by.length>0))&&!A.has(g.root_dir)||D.push({root_dir:g.root_dir,name:g.name||g.root_dir,auto_advance:g.auto_advance===!0,auto_merge:g.auto_merge===!0,slots:typeof g.slots=="number"&&g.slots>=Mu?g.slots:Mu,revision:typeof g.revision=="number"?g.revision:0,runner_catalog:Rt(g.runner_catalog),items:j,sublanes:{parallel:j,serial:U},serial_lane_count:se.get(g.root_dir)||0,raw_queue_length:V.get(g.root_dir)||0})}let G={runnable:u,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:m,queue_groups:D,running:d,pr_wait:p,done:k,chains:[]},pe=Ka(G);for(let g of T)pe.has(g.id)||pe.set(g.id,{root_dir:g.root_dir,workspace_name:g.workspace_name,lane:"done",state:"done"});let fe=new Map;for(let[g,j]of q)for(let U of j){let K=fe.get(U);K?K.includes(g)||K.push(g):fe.set(U,[g])}for(let g of[...G.queue,...G.runnable]){if(!Object.hasOwn(g,"blocked_by"))continue;let j=pe.get(g.id);g.blockers=(g.blocked_by||[]).map(U=>hu(U,j,pe,s)),g.blocker_warnings=g.blockers.filter(U=>U.missing_internal).map(U=>`\u26A0 \uC120\uD589 ${U.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),g.blocker_warnings.length>0&&(g.alert=!0)}for(let g of[...G.queue,...G.runnable,...G.running,...G.pr_wait]){let j=g.lane==="running"||g.lane==="pr_wait"?[]:(g.blockers||[]).map(gg),U=[];for(let we of fe.get(g.id)||[]){let ke=hg(we,pe);ke&&U.push(ke)}let K=g.lane==="running"||g.lane==="pr_wait"?[]:g.blocker_warnings||[];if(j.length===0&&U.length===0&&K.length===0)continue;let ge={predecessors:j,successors:U,warnings:K};g.dependency_chips=ge}G.chains=yg(q,pe,s);let _e=bu(G.queue_groups);for(let g of G.queue_groups)for(let j of g.sublanes.serial){let U=_e.get(vu(g.root_dir,j.id));U&&(j.cross_wait_peers=U)}let ae=G.runnable.length,Le=G.runnable;a.show_blocked||(Le=Le.filter(g=>g.blocked!==!0));let Te=Le.length;a.spec==="with"?Le=Le.filter(g=>!!g.spec_id):a.spec==="without"&&(Le=Le.filter(g=>!g.spec_id)),G.runnable_hidden={blocked:ae-Te,spec:Te-Le.length};let ee=(g,j)=>{let U=Fu(j.updated_at)-Fu(g.updated_at);return U!==0?U:g.id.localeCompare(j.id)},xe=i==="repo_spec"?(g,j)=>{let U=g.spec_id?0:1,K=j.spec_id?0:1;return U!==K?U-K:ee(g,j)}:ee;if(i==="updated_flat")G.runnable=Le.slice().sort(ee),G.runnable_sections=[];else{let g=new Map;for(let K of Le){let ge=g.get(K.root_dir);ge?ge.push(K):g.set(K.root_dir,[K])}let j=[],U=[];for(let K of R){if(!K||typeof K.root_dir!="string")continue;let ge=(g.get(K.root_dir)||[]).slice().sort(xe);g.delete(K.root_dir),ge.length!==0&&(j.push({root_dir:K.root_dir,name:K.name||K.root_dir,items:ge.map(we=>({...we,workspace_name:""}))}),U.push(...ge))}for(let[K,ge]of g){let we=ge.slice().sort(xe);j.push({root_dir:K,name:we[0]?.workspace_name||K,items:we.map(ke=>({...ke,workspace_name:""}))}),U.push(...we)}G.runnable=U,G.runnable_sections=j}return G}var Uu="bdui.monitor.done-range",Wu="bdui.monitor.running_sort",zu="bdui.monitor.candidate_sort",Hu="beads-ui.monitor.candidate-filter",Gu="beads-ui.monitor.sections";function wg(){try{let e=window.localStorage.getItem(Hu);if(!e)return{...On};let t=JSON.parse(e);return!t||typeof t!="object"?{...On}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:On.show_blocked,spec:ei.some(r=>r.value===t.spec)?t.spec:"all"}}catch{return{...On}}}function ju(e){try{window.localStorage.setItem(Hu,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function kg(){try{let e=window.localStorage.getItem(zu);return _s.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function $g(e){try{window.localStorage.setItem(zu,e)}catch{}}function xg(){try{let e=window.localStorage.getItem(Gu);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Bu(e){try{window.localStorage.setItem(Gu,JSON.stringify(e))}catch{}}function Ag(){try{let e=window.localStorage.getItem(Uu);return ar(e)?e:er}catch{return er}}function Sg(e){try{window.localStorage.setItem(Uu,e)}catch{}}function Eg(){try{return window.localStorage.getItem(Wu)==="repo"?"repo":"started"}catch{return"started"}}function Tg(e){try{window.localStorage.setItem(Wu,e)}catch{}}var Vu="tab:monitor:pipeline",Cg=1e3,Rg=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Lg(){return l`<span class="mon-link mon-popover-owner">
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
  </span>`}function Ku(e,t){let r=Ct("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,c=t.router,u=t.now||(()=>Date.now()),d=t.confirm||(v=>typeof globalThis.confirm!="function"||globalThis.confirm(v)),p=Ag(),m=Eg(),k=wg(),T=kg(),M=xg(),H=null,se=null,V=null;function q(){let v=Rr.find(y=>y.value===p);return v?v.label:""}let I=document.createElement("div");I.className="mon",e.appendChild(I);let O=document.createElement("div");O.className="mon2-drawer",e.appendChild(O);let R=ti(null,null),A=new Map,D=new Map,G=null,pe=null,fe=null,_e=En(O,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{H=null,je()}});async function ae(v,y,L,X,be=!0){if(!o||!L)return null;let ye=await o(v,{...y,root_dir:L,expected_revision:X});if(ye&&ye.conflict&&be){ye.queue&&D.set(L,ye.queue);let Ne=ye.queue&&typeof ye.queue.revision=="number"?ye.queue.revision:X;ye=await o(v,{...y,root_dir:L,expected_revision:Ne})}return ye&&ye.queue&&L&&D.set(L,ye.queue),ye}function Le(v,y){let L=D.get(v),X=s&&s.get?s.get():null,be=(Array.isArray(X)?X:[]).find(Ne=>Ne?.root_dir===v);return(L||be)?.merge_queue?.find(Ne=>Ne.bead_id===y)?.continuation_action}async function Te(v,y,L,X){let be=await ae(v,y,L,X),ye=D.get(L)?.revision??be?.queue?.revision??X;return wr(be,(Ne,Me)=>ae(v,{...y,continuation:Ne,decision_token:Me},L,ye,!1),{refresh:Ne=>ae(v,y,L,Ne?.queue?.revision??D.get(L)?.revision??ye,!1)})}async function ee(v,y,L,X){let be=await wr({continuation_mismatch:X},(Ne,Me)=>ae("worker-merge-queue-add",{bead_id:y,continuation:Ne,decision_token:Me},v,L,!1)),ye=be?.queue?.merge_queue?.find(Ne=>Ne.bead_id===y)?.continuation_action;be?.applied!==!0&&ye?.continuation===null&&ye.mismatch&&await ee(v,y,be.queue.revision,ye.mismatch)}async function oe(v,y,L){let X=await ae("worker-discard",v,y,L);if(X&&X.discarded===!0){me(wo(X),"success",5e3);return}if(X&&X.reason){me(`\uD3D0\uAE30 \uC2E4\uD328: ${X.reason}`,"error");return}if(X&&X.accepted&&X.pending==="merged_revert"){me("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(X&&X.accepted){me(`\uD3D0\uAE30 \uC9C4\uD589: ${X.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}X&&!X.conflict&&me("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function xe(v,y,L){return!o||!L?null:await o(v,{...y,root_dir:L})}async function g(){let v=new Map;for(let y of R.pr_wait)v.has(y.root_dir)||v.set(y.root_dir,y.expected_revision);for(let[y,L]of v)await ae("worker-merge-queue-add-all",{},y,L)}function j(v,y){let L=M[v];return!!(L&&L[y]===!0)}function U(v,y){let L={...M[v]||{}};L[y]=!L[y],M={...M,[v]:L},Bu(M),je()}function K(v){let y=j(v.root_dir,v.section);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${v.root_dir}
        data-section=${v.section}
        aria-expanded=${y?"false":"true"}
        aria-label=${`${v.name} \uC139\uC158 ${y?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${y?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${v.root_dir}>${v.name}</span>
      <span class="mon2-sec__count">${v.count}</span>
      ${typeof v.auto=="boolean"?l`<span
            class="mon2-sec__auto${v.auto?" is-on":""}"
            title=${v.auto?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C"}
            >${v.auto?"\u25CF \uC790\uB3D9":"\u25CB \uC218\uB3D9"}</span
          >`:""}
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${v.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function ge(v,y){return l`<div class="mon2-item" data-bead-id=${v.id}>
      ${y}
      <span class="mon2-item__ops">${Lg()}</span>
    </div>`}function we(v){return se!==v.id?null:{bead_id:v.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:v.place_index??0},...(v.place_lanes||[]).map(y=>({id:y.id,label:y.id,count:y.length}))]}}function ke(v){return ge(v,Ua(v,we(v),{exec_chips_mode:"pinned_only"}))}function Ze(v){return ge(v,Ln(v))}function wt(){return R.runnable_flat?l`<div class="mon2-flat">
        ${R.runnable.map(v=>ke(v))}
      </div>`:l`${R.runnable_sections.map(v=>{let y=j(v.root_dir,"runnable");return l`<section
        class="mon2-sec${y?" is-collapsed":""}"
        data-root-dir=${v.root_dir}
        data-section="runnable"
      >
        ${K({root_dir:v.root_dir,name:v.name,count:v.items.length,section:"runnable"})}
        ${y?"":l`<div class="mon2-sec__body" data-lane="candidate">
              ${v.items.map(L=>ke(L))}
            </div>`}
      </section>`})}`}function He(v){return l`<div
      class="mon2-lane${v.empty?" mon2-lane--empty":""}"
      data-lane-length=${String(v.raw_length)}
    >
      ${sr({id:"",lane:v.id,title:`\uC9C1\uB82C ${v.index+1}`,items:v.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:v.items.length>0?l`${v.items.map(y=>Ze(y))}`:void 0,header_control:l`<span class="mon2-lane__badge"
          >${v.occupied_by.length>0?"\uC810\uC720":""}</span
        >`})}
      ${v.empty?l`<div class="mon2-lane__hint">
            직렬 ${v.index+1} 비어 있음
          </div>`:""}
      ${v.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(v.cross_wait_peers||[]).map(y=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${y.workspace_name}·${y.lane}과 교차 대기
          </div>`)}
    </div>`}function pt(v){let y=j(v.root_dir,"queue"),L=v.sublanes.parallel.length+v.sublanes.serial.reduce((X,be)=>X+be.items.length,0);return l`<section
      class="mon2-sec${y?" is-collapsed":""}"
      data-root-dir=${v.root_dir}
      data-section="queue"
    >
      ${K({root_dir:v.root_dir,name:v.name,count:L,section:"queue",auto:v.auto_advance})}
      ${y?"":l`<div class="mon2-sec__body worker-wait">
            <div
              class="mon2-lane"
              data-lane-length=${String(v.raw_queue_length)}
            >
              ${sr({id:"",lane:"queue",title:"\uBCD1\uB82C",items:v.sublanes.parallel,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:v.sublanes.parallel.length>0?l`${v.sublanes.parallel.map(X=>Ze(X))}`:void 0})}
            </div>
            ${v.sublanes.serial.map(X=>He(X))}
          </div>`}
    </section>`}function st(){if(R.chains.length===0)return"";let v=M.chains===!0;return l`<section class="mon2-chains${v?" is-collapsed":""}">
      <header class="mon2-chains__hd">
        <button
          type="button"
          class="mon2-chains__toggle"
          aria-expanded=${v?"false":"true"}
          title="blocks 의존이 만든 레포 간 순서입니다 — 선행이 close되면 후속이 자기 레포 큐에서 출발합니다"
        >
          ${v?"\u25B8":"\u25BE"} 🔗 연결 체인 ${R.chains.length} · 레포 간
          순서
        </button>
        <span class="mon2-chains__hint">blocks 의존 · 카드의 🔗로 연결</span>
      </header>
      ${v?"":l`<div class="mon2-chains__body">
            ${R.chains.map(y=>l`<div class="mon2-chain">
                  ${y.cycle?l`<div class="mon2-chain__cycle">⛔ 의존 사이클</div>`:""}
                  ${y.nodes.map(L=>l`<div
                        class="mon2-chain__node"
                        style=${`--indent: ${L.indent}`}
                        data-bead-id=${L.id}
                        data-root-dir=${L.root_dir}
                      >
                        ${L.workspace_name?l`<span class="mon2-chain__repo"
                              >${L.workspace_name}</span
                            >`:""}
                        <span class="mon2-chain__id worker-mini__id"
                          >${L.id}</span
                        >
                        <span class="mon2-chain__where"
                          >${L.location_label}</span
                        >
                      </div>`)}
                </div>`)}
          </div>`}
    </section>`}function Y(v){return l`<div class="worker-rungrid">
      ${R.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:R.running.map(y=>Ha({bead_id:y.id,attempt_id:y.attempt_id||"",title:y.title,runner:y.runner??null,model:y.model??null,effort:y.effort??null,speed:y.speed??null,started_at:y.started_at??null,resumed_from:y.resumed_from??null,continuation_mode:y.continuation_mode??null,paused:y.run_state==="paused",failed:y.run_state==="failed",status:y.status,status_label:y.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:y.can_resume!==!1,can_pause:y.can_pause!==!1,exec_chips:y.exec_chips||null,usage:y.usage||null,discard:y.discard},v,H,{monitor:{repo:y.workspace_name,root_dir:y.root_dir,serial_lane_id:y.serial_lane_id,workflow:y.workflow||null,last_activity:y.last_activity||null,legs:y.legs||[],dependency_chips:y.dependency_chips||null}}))}
    </div>`}function Z(v){let y={runnable:R.runnable,queue:R.queue,running:R.running,pr_wait:R.pr_wait,done:R.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Rg.map(L=>{let X=y[L.lane],be=L.lane==="runnable"?R.runnable_flat?X.length>0?wt():void 0:R.runnable_sections.length>0?wt():void 0:L.lane==="queue"?R.queue_groups.length>0||R.chains.length>0?l`${st()}${R.queue_groups.map(ye=>pt(ye))}`:void 0:L.lane==="running"?Y(v):X.length>0?l`${X.map(ye=>Ln(ye))}`:void 0;return sr({id:`monitor-${L.lane}`,lane:L.pane,title:L.lane==="done"?`\uC644\uB8CC\xB7${q()}`:L.title,items:X,empty:L.empty,body:be,live:L.lane==="running"&&X.length>0,controls:L.lane==="runnable"?Se():void 0,header_control:Qe(L.lane,X.length)})})}
      </div>`}function Se(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${R.runnable_hidden.blocked>0?` ${R.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ei.map(v=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${k.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${R.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${R.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Qe(v,y){return v==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${T}
      >
        ${_s.map(L=>l`<option
              value=${L.value}
              ?selected=${T===L.value}
            >
              ${L.label}
            </option>`)}
      </select>`:v==="running"?l`<select
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
      </select>`:v==="pr_wait"&&y>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:v==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${p}
      >
        ${Rr.map(L=>l`<option value=${L.value} ?selected=${p===L.value}>
              ${L.label}
            </option>`)}
      </select>`:""}function je(){let v=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],L=u();R=ti(v,y,{done_since:Kr(p,L),running_sort:m,candidate_filter:k,candidate_sort:T}),A=new Map;for(let X of[...R.runnable,...R.queue,...R.running,...R.pr_wait,...R.done])A.has(X.id)||A.set(X.id,X);Ye(Z(L),I),ot()?.render(),Je()}function ot(){if(fe)return fe;let v=I.querySelector(".mon2-deck");return v?(fe=Cu(v,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>R.done,rangeLabel:q,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:Ie,onFocusChange:y=>{V=y,Je()}}),fe):null}function Je(){I.classList.toggle("has-focus",V!==null);for(let v of Array.from(I.querySelectorAll(".mon2-sec[data-root-dir]")))v.classList.toggle("is-focus",V!==null&&v.getAttribute("data-root-dir")===V);for(let v of Array.from(I.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let y=A.get(v.getAttribute("data-bead-id")||"");v.classList.toggle("is-focus",V!==null&&!!y&&y.root_dir===V)}}function yt(v,y){let L=a?a():void 0;if(!y||!L||y===L||!i){n(v);return}i(y).then(()=>{n(v)}).catch(X=>{r("workspace switch for %s failed: %o",y,X)})}function Ie(v){if(!v)return;let y=a?a():void 0,L=()=>{try{c?.gotoView("worker")}catch(X){r("gotoView(worker) failed: %o",X)}};if(!i||y&&y===v){L();return}i(v).then(L).catch(X=>{r("workspace switch for %s failed: %o",v,X),me("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function E(v){tr(v).then(y=>{me(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)})}function Q(v){let y=A.get(v)||null;return{item:y,root_dir:y?y.root_dir:"",revision:y?y.expected_revision:0}}function Ee(v){if(typeof v=="string"&&v.length>0)return v;if(v&&typeof v=="object"){let y=v;if(typeof y.message=="string"&&y.message.length>0)return y.message;if(typeof y.error=="string"&&y.error.length>0)return y.error;if(y.error&&typeof y.error=="object"&&typeof y.error.message=="string")return y.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function re(v,y){let L=v.querySelector(".mon-link__trigger"),X=v.querySelector(".mon-link__popover"),be=v.querySelector(".mon-link__error");!L||!X||!be||(nt(),X.hidden=!1,L.setAttribute("aria-expanded","true"),be.textContent=y,be.hidden=!1,Xe(L,X))}async function qe(v,y,L,X){let{root_dir:be}=Q(L);if(!(!L||!X||X===L))try{await xe(v,{a:L,b:X},be),nt()}catch(ye){re(y,Ee(ye))}}function rt(v){v.querySelector(".mon-link__list")?.replaceChildren();let y=v.querySelector(".mon-link__search");y&&(y.value="");let L=v.querySelector(".mon-link__direct");L&&(L.hidden=!0,L.dataset.targetId="",L.textContent="");let X=v.querySelector(".mon-link__empty");X&&(X.hidden=!0);let be=v.querySelector(".mon-link__error");be&&(be.hidden=!0,be.textContent="")}function it(v,y){let L=v.querySelector(".mon-link__list");if(!L)return;let X=document.createDocumentFragment(),be=yu(R).filter(ye=>ye.id!==y);for(let ye of be){let Ne=document.createElement("button");Ne.type="button",Ne.className="mon-link__candidate",Ne.dataset.targetId=ye.id,Ne.dataset.search=`${ye.id} ${ye.title} ${ye.location}`.toLocaleLowerCase();let Me=document.createElement("strong");Me.textContent=ye.id;let ft=document.createElement("span");ft.textContent=ye.title;let $t=document.createElement("small");$t.textContent=ye.location,Ne.append(Me,ft,$t),X.append(Ne)}L.replaceChildren(X)}function Xe(v,y){if(typeof v.getBoundingClientRect!="function")return;let L=8,X=v.getBoundingClientRect(),be=y.offsetWidth||0,ye=y.offsetHeight||0,Ne=window.innerWidth||0,Me=window.innerHeight||0,ft=X.right-be;ft<L&&(ft=L),Ne>0&&ft+be>Ne-L&&(ft=Math.max(L,Ne-L-be));let $t=X.bottom+4;Me>0&&ye>0&&$t+ye>Me-L&&($t=Math.max(L,X.top-4-ye)),y.style.left=`${Math.round(ft)}px`,y.style.top=`${Math.round($t)}px`}function nt(){for(let v of Array.from(I.querySelectorAll(".mon-card-popover"))){let y=v;y.hidden=!0,y.classList.contains("mon-link__popover")&&rt(y)}for(let v of Array.from(I.querySelectorAll('[aria-haspopup][aria-expanded="true"]')))v.setAttribute("aria-expanded","false")}function _t(v){let L=v.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!L)return;let X=L.hidden;if(nt(),X){let be=v.closest(".mon2-item");it(L,be?.getAttribute("data-bead-id")||""),L.hidden=!1,v.setAttribute("aria-expanded","true");let ye=L.querySelector(".mon-link__search");ye&&(ht(ye),ye.focus()),Xe(v,L)}}function ht(v){let y=v.closest(".mon-link__popover"),L=v.closest(".mon2-item");if(!y||!L)return;let X=v.value.trim(),be=X.toLocaleLowerCase(),ye=0,Ne=!1;for(let Ge of Array.from(y.querySelectorAll(".mon-link__candidate"))){let Ot=Ge,Fe=Ot.dataset.targetId||"",S=be.length===0||(Ot.dataset.search||"").includes(be);Ot.hidden=!S,S&&(ye+=1),Fe.toLocaleLowerCase()===be&&(Ne=!0)}let Me=y.querySelector(".mon-link__direct"),ft=L.getAttribute("data-bead-id")||"";if(Me){let Ge=X.length>0&&!Ne&&be!==ft.toLocaleLowerCase();Me.hidden=!Ge,Me.dataset.targetId=Ge?X:"",Me.textContent=Ge?`\uC9C1\uC811 \uC785\uB825 \xB7 ${X}`:"",Ge&&(ye+=1)}let $t=y.querySelector(".mon-link__empty");$t&&($t.hidden=ye>0);let jt=y.querySelector(".mon-link__error");jt&&(jt.hidden=!0,jt.textContent="")}let at=null,kt=!1,N=null;function te(){N!==null&&clearTimeout(N),N=setTimeout(()=>{N=null,kt=!1},0)}function he(v){let y=v.target;return typeof y?.closest=="function"?y.closest(".worker-pane, .mon2-sec__body"):null}function ze(v){let y=he(v);if(!y||!at)return null;let X=y.closest(".mon2-sec")?.getAttribute("data-root-dir")||"";if(X!==at.root_dir)return null;let be=y.getAttribute("data-lane")||"";if(be!=="candidate"&&be!=="queue"&&!/^s[1-5]$/.test(be))return null;let ye=y.closest(".mon2-lane");return{pane:y,lane:be,root_dir:X,lane_length:Number(ye?.getAttribute("data-lane-length")||0)||0}}function De(){for(let v of Array.from(I.querySelectorAll(".worker-pane--drag-over")))v.classList.remove("worker-pane--drag-over")}function F(v){let y=v.target,L=typeof y?.closest=="function"?y.closest('.worker-mini[draggable="true"], .worker-card[draggable="true"]'):null;if(!L)return;let X=L.getAttribute("data-bead-id")||"",{item:be}=Q(X);if(be){at={bead_id:X,lane:be.lane,root_dir:be.root_dir,revision:be.expected_revision,queue_index:typeof be.queue_index=="number"?be.queue_index:-1,place_index:typeof be.place_index=="number"?be.place_index:0},kt=!0,se=null,I.classList.add("is-dragging");try{v.dataTransfer?.setData("text/plain",X),v.dataTransfer&&(v.dataTransfer.effectAllowed="move")}catch{}}}function ne(v){let y=ze(v);y&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"),y.pane.classList.add("worker-pane--drag-over"))}function ve(v){he(v)?.classList.remove("worker-pane--drag-over")}function w(){at=null,De(),I.classList.remove("is-dragging"),te()}function C(v){let y=ze(v),L=at;if(at=null,De(),I.classList.remove("is-dragging"),!y||!L||!L.bead_id)return;v.preventDefault();let X=v.target,be=typeof X?.closest=="function"?X.closest(".mon2-item"):null,ye=be&&y.pane.contains(be)&&be.getAttribute("data-bead-id")||"",Ne=ye?A.get(ye):void 0,Me=Ne&&typeof Ne.queue_index=="number"?Ne.queue_index:NaN;if(y.lane==="candidate"){(L.lane==="queue"||/^s[1-5]$/.test(L.lane))&&ae("worker-queue-remove",{bead_id:L.bead_id},L.root_dir,L.revision);return}let ft=y.lane==="queue"?"parallel":y.lane;if(L.lane==="runnable"){let Ot=Number.isFinite(Me)?Me:y.lane_length;ae("worker-queue-place",{bead_id:L.bead_id,...ft==="parallel"?{}:{lane:ft},index:Ot},L.root_dir,L.revision);return}if((L.lane==="queue"?"parallel":L.lane)!==ft){let Ot=Number.isFinite(Me)?Me:y.lane_length;ae("worker-queue-place",{bead_id:L.bead_id,...ft==="parallel"?{}:{lane:ft},index:Ot},L.root_dir,L.revision);return}if(ye===L.bead_id)return;let jt=L.queue_index,Ge=Number.isFinite(Me)?jt>Me?Me:Me-1:y.lane_length-1;!Number.isFinite(Ge)||Ge<0||Ge===jt||ae("worker-queue-reorder",{bead_id:L.bead_id,...ft==="parallel"?{}:{lane:ft},to_index:Ge},L.root_dir,L.revision)}function B(v){return{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.run_state==="running"?"running":v.run_state,worktree:v.root_dir}}function ie(v,y){let{item:L,root_dir:X,revision:be}=Q(y),ye=L?.attempt_id||"",Ne=v.classList;if(Ne.contains("mon-link__trigger")){_t(v);return}if(Ne.contains("mon-link__candidate")||Ne.contains("mon-link__direct")){let Me=v.closest(".mon2-item");Me&&qe("dep-add",Me,y,v.dataset.targetId||"");return}if(Ne.contains("worker-dep__remove")){let Me=v.closest(".mon2-item");Me&&qe("dep-remove",Me,y,v.dataset.blockerId||"");return}if(Ne.contains("worker-card__place")){se=se===y?null:y,je();return}if(Ne.contains("worker-card__place-cancel")){se=null,je();return}if(Ne.contains("worker-card__place-lane")){let Me=v.getAttribute("data-lane")||"parallel",ft=Me==="parallel"?L?.place_index??0:(L?.place_lanes||[]).find($t=>$t.id===Me)?.index??0;se=null,ae("worker-queue-place",{bead_id:y,...Me==="parallel"?{}:{lane:Me},index:ft},X,be),je();return}if(Ne.contains("rtile__session")){H=ye,ye&&L&&_e.open({attempt_id:ye,root_dir:X,meta:B(L)}),je();return}if(Ne.contains("rtile__pause")){xe("worker-attempt-pause",{attempt_id:ye},X);return}if(Ne.contains("rtile__resume")){$n().then(Me=>{if(Me!==null)return Te("worker-attempt-resume",{attempt_id:ye,...Me!==""?{instructions:Me}:{}},X,be)});return}if(Ne.contains("rtile__dismiss")){ae("worker-attempt-dismiss",{attempt_id:ye},X,be);return}if(Ne.contains("rtile__discard")){if(!d(cs(y,"unmerged")))return;oe({bead_id:y,...ye?{attempt_id:ye}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},X,be);return}if(Ne.contains("worker-mini__merge")){let Me=Le(X,y);Me?.mismatch&&Me.continuation===null?ee(X,y,be,Me.mismatch):ae("worker-merge-queue-add",{bead_id:y},X,be);return}if(Ne.contains("worker-mini__merge-cancel")){ae("worker-merge-queue-remove",{bead_id:y},X,be);return}if(Ne.contains("worker-mini__discard")){let Me=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(cs(y,Me)))return;oe({bead_id:y,...v.dataset.attemptId?{attempt_id:v.dataset.attemptId}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},X,be);return}if(Ne.contains("worker-mini__revise-fix")){Te("worker-revise-fix",{bead_id:y},X,be);return}Ne.contains("worker-mini__revise-approve")&&ae("worker-revise-approve",{bead_id:y},X,be)}function Ce(v){let y=kt;kt=!1;let L=v.target;if(!L||typeof L.closest!="function"||L.closest("dialog")||L.closest(".mon2-drawer")||L.closest("a"))return;let X=L.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(X){v.preventDefault();let Ot=L.closest(".mon2-item, .rtile, .mon2-chain__node, .worker-mini")?.getAttribute("data-bead-id")||X.textContent?.trim()||"";Ot&&E(Ot);return}let be=L.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(be){v.preventDefault();let Ge=be.getAttribute("data-root-dir")||A.get(L.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||be.getAttribute("title")||"";Ie(Ge);return}let ye=L.closest(".mon2-sec__toggle");if(ye){v.preventDefault(),U(ye.getAttribute("data-root-dir")||"",ye.getAttribute("data-section")||"runnable");return}if(L.closest(".mon2-chains__toggle")){v.preventDefault(),M={...M,chains:M.chains!==!0},Bu(M),je();return}let Ne=L.closest(".mon2-chain__node");if(Ne){v.preventDefault(),yt(Ne.getAttribute("data-bead-id")||"",Ne.getAttribute("data-root-dir")||"");return}if(L.closest(".mon-merge-all")){v.preventDefault(),g();return}let Me=L.closest(".mon-filter__spec");if(Me){v.preventDefault(),k={...k,spec:Me.getAttribute("data-spec")||"all"},ju(k),je();return}let ft=L.closest(".mon2-item, .rtile, .worker-mini, .worker-card");if(!ft)return;let $t=ft.getAttribute("data-bead-id")||"",jt=L.closest("button");if(jt){v.preventDefault(),ie(jt,$t);return}$t&&!y&&(v.preventDefault(),yt($t,Q($t).root_dir))}function Ae(v){let y=v.target;y&&I.contains(y)&&typeof y.closest=="function"&&y.closest(".mon-popover-owner")||nt()}function Pe(v){let y=v.target;y&&typeof y.closest=="function"&&y.closest(".mon-card-popover")||I.querySelector(".mon-card-popover:not([hidden])")&&nt()}function Be(v){if(v.key!=="Escape")return;let y=I.querySelector('[aria-haspopup][aria-expanded="true"]');nt(),y?.focus()}function St(v){let y=v.target;if(!y||typeof y.closest!="function")return;let L=y.closest(".mon-filter__blocked");if(L){k={...k,show_blocked:L.checked},ju(k),je();return}let X=y.closest(".mon-candidate-sort");if(X){T=_s.some(Ne=>Ne.value===X.value)?X.value:"repo_spec",$g(T),je();return}let be=y.closest(".mon-running-sort");if(be){m=be.value==="repo"?"repo":"started",Tg(m),je();return}let ye=y.closest(".mon-done-range");ye&&(p=ar(ye.value)?ye.value:er,Sg(p),je())}function bt(v){let y=v.target;y?.classList.contains("mon-link__search")&&ht(y)}e.addEventListener("click",Ce),e.addEventListener("change",St),e.addEventListener("input",bt),e.addEventListener("dragstart",F),e.addEventListener("dragover",ne),e.addEventListener("dragleave",ve),e.addEventListener("drop",C),e.addEventListener("dragend",w),document.addEventListener("click",Ae),document.addEventListener("keydown",Be),e.addEventListener("scroll",Pe,!0),s&&typeof s.subscribe=="function"&&(G=s.subscribe(()=>{try{D.clear(),je()}catch{}}));function Ke(){pe!==null&&(clearInterval(pe),pe=null)}function Ft(){N!==null&&(clearTimeout(N),N=null)}return{load(){r("load"),je(),pe===null&&(pe=setInterval(()=>{try{if(I.querySelector(".mon-card-popover:not([hidden])"))return;je()}catch{}},Cg))},pause(){Ke()},clear(){Ke(),Ft(),G&&(G(),G=null),_e.destroy(),fe?.destroy(),fe=null,e.removeEventListener("click",Ce),e.removeEventListener("change",St),e.removeEventListener("input",bt),e.removeEventListener("dragstart",F),e.removeEventListener("dragover",ne),e.removeEventListener("dragleave",ve),e.removeEventListener("drop",C),e.removeEventListener("dragend",w),document.removeEventListener("click",Ae),document.removeEventListener("keydown",Be),e.removeEventListener("scroll",Pe,!0),e.replaceChildren()}}}function Yu(e,t,r){let n=Ct("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(m){return k=>{k.preventDefault(),n("click tab %s",m),r.gotoView(m)}}function c(){let m=t.getState();return m.view==="worker"||m.view==="monitor"?m.view:"board"}function u(){let m=c();return l`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${m==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let m=c();return l`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${m==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${m==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function p(){s&&Ye(u(),s),o&&Ye(d(),o)}return p(),a=t.subscribe(()=>p()),{destroy(){a&&(a(),a=null),s&&Ye(l``,s),o&&Ye(l``,o)}}}var Zu=["bug","feature","task","epic","chore"];function Qu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Xu=["Critical","High","Medium","Low","Backlog"];function Ju(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),d=r.querySelector("#btn-cancel"),p=r.querySelector("#btn-create"),m=r.querySelector(".new-issue__close");function k(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let R of Zu){let A=document.createElement("option");A.value=R,A.textContent=Qu(R),o.appendChild(A)}a.replaceChildren();for(let R=0;R<=4;R+=1){let A=document.createElement("option");A.value=String(R);let D=Xu[R]||"Medium";A.textContent=`${R} \u2013 ${D}`,a.appendChild(A)}}k();function T(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function M(O){s.disabled=O,o.disabled=O,a.disabled=O,i.disabled=O,c.disabled=O,d.disabled=O,p.disabled=O,p.textContent=O?"Creating\u2026":"Create"}function H(){u.textContent=""}function se(O){u.textContent=O}function V(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let R=window.localStorage.getItem("beads-ui.new.priority");R&&/^\d$/.test(R)?a.value=R:a.value="2"}catch{o.value="",a.value="2"}}function q(){let O=o.value||"",R=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),R.length>0&&window.localStorage.setItem("beads-ui.new.priority",R)}async function I(){H();let O=String(s.value||"").trim();if(O.length===0){se("Title is required"),s.focus();return}let R=Number(a.value||"2");if(!(R>=0&&R<=4)){se("Priority must be 0..4"),a.focus();return}let A=String(o.value||""),D=String(c.value||""),G={title:O};A.length>0&&(G.type=A),String(R).length>0&&(G.priority=R),D.length>0&&(G.description=D),M(!0);try{await t("create-issue",G)}catch{M(!1),se("Failed to create issue");return}q(),M(!1),T()}return r.addEventListener("cancel",O=>{O.preventDefault(),T()}),m.addEventListener("click",()=>T()),d.addEventListener("click",()=>T()),r.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),I())}),n.addEventListener("submit",O=>{O.preventDefault(),I()}),{open(){n.reset(),H(),V();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){T()}}}var Ig=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Og(e,t){return ea(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ed(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Og(n,e);return l`<button
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
  `}function td(e,t,r){return l`
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
  `}function rd(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Ig.map(([r,n])=>l`<label class="settings-dialog__toggle">
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
  `}var Pg=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function nd(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(ae=>me(ae,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",d=null;function p(){if(d)return d;let ae=a.querySelector('[data-pane="execution"]');return ae?(d=Eo(ae,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:r,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Le=>t.queueStore?.set?.(Le)}),d):null}function m(){return l`
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
    `}function k(){let ae=n.get();return l`
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
        ${ae?l`
              ${ed(ae,s(),se)}
              ${td(ae,u,{onDraft:Le=>{u=Le},onAdd:V,onRemove:q})}
              ${rd(ae,I)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function T(ae){let Le=n.get();if(Le)try{let Te=await r("display-policy-set",{expected_revision:Le.revision,policy:ae(Le)});M(Te),Te&&Te.conflict&&Te.policy&&(Te=await r("display-policy-set",{expected_revision:Te.policy.revision,policy:ae(Te.policy)}),M(Te)),Te&&Te.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function M(ae){ae&&ae.policy&&typeof ae.policy=="object"&&n.set(ae.policy)}function H(ae){T(ae)}function se(ae){let Le=n.get();if(!Le)return;let Te=!Mg(ae,Le);H(ee=>Dg(ae,ee,Te))}function V(){let ae=u.trim();ae.length!==0&&(u="",H(Le=>Le.hidden_prefixes.includes(ae)?{hidden_prefixes:Le.hidden_prefixes}:{hidden_prefixes:[...Le.hidden_prefixes,ae]}),O())}function q(ae){H(Le=>({hidden_prefixes:Le.hidden_prefixes.filter(Te=>Te!==ae)}))}function I(ae){let Le=n.get();if(!Le)return;let Te=Le.chips[ae]===!1;H(()=>({chips:{[ae]:Te}}))}function O(){Ye(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Pg.map(ae=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ae.id}
                  aria-selected=${String(i===ae.id)}
                  aria-controls=${`settings-pane-${ae.id}`}
                  @click=${()=>R(ae.id)}
                >
                  <span class="settings-dialog__glyph">${ae.glyph}</span>
                  ${ae.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${_e}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${m()} ${k()}
          </div>
        </div>
      `,a),p()}function R(ae){i=ae,O()}let A=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",A),a.addEventListener("cancel",A);let D=ae=>{ae.target===a&&_e()};a.addEventListener("click",D);let G=null;n.subscribe&&(G=n.subscribe(()=>{c&&O()}));let pe=null;t.implPresetStore?.subscribe&&(pe=t.implPresetStore.subscribe(()=>{c&&d?.render()}));function fe(ae="execution"){c||(c=!0,t.onOpenChange?.(!0),i=ae,u="",O(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),p()?.load())}function _e(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:fe,close:_e,sessionDraft:()=>d?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",A),a.removeEventListener("cancel",A),a.removeEventListener("click",D),G&&(G(),G=null),pe&&(pe(),pe=null),d?.destroy(),d=null,a.remove()}}}function Mg(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Dg(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Ng=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],sd="usage-meter-card",qg="usage-meter-layer",od=600,Fg=["token_expired","relogin_required"];function ad(e){return String(e).padStart(2,"0")}function jg(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function id(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${ad(n.getHours())}:${ad(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Ng[n.getMonth()]} ${n.getDate()} ${o}`;return`${jg(r,t)} \xB7 ${i}`}function Bg(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function ld(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function cd(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var ud=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function pd(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function Ug(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:pd(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Wg(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Ug(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?pd(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function dd(e,t){return`${e}:${t}`}function fd(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Ye(l``,e),e.hidden=!0,p()}function d(){if(c===null){let ee=e.ownerDocument;c=ee.createElement("div"),c.id=qg,c.className="usage-meter__layer",ee.body.appendChild(c)}return c}function p(){c!==null&&(Ye(l``,c),c.remove(),c=null)}function m(ee){r!==ee&&(r===null&&(document.addEventListener("mousedown",T),document.addEventListener("keydown",H),window.addEventListener("resize",M)),r=ee)}function k(){r!==null&&(r=null,document.removeEventListener("mousedown",T),document.removeEventListener("keydown",H),window.removeEventListener("resize",M))}function T(ee){let oe=ee.target;oe&&(e.contains(oe)||c!==null&&c.contains(oe))||(k(),_e())}function M(){_e()}function H(ee){ee.key==="Escape"&&(k(),_e())}function se(ee){r===ee?k():m(ee),_e()}function V(){k(),_e()}async function q(ee,oe){if(n.has(ee.key))return;let xe=dd(ee.key,oe);n.set(ee.key,oe),a.delete(xe),_e();let g=null;try{g=await(await fetch(ee.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:oe})})).json()}catch{g=null}if(t)return;if(n.delete(ee.key),!g||g.ok!==!0){let U=g&&typeof g.error=="string"&&g.error.length>0?g.error:"network_error";a.set(xe,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${U}`}),_e();return}let j=Array.isArray(g.warnings)?g.warnings.filter(U=>typeof U=="string"&&U.length>0):[];j.length>0&&a.set(xe,{kind:"warn",text:j.join(" \xB7 ")}),_e(),await Te()}function I(ee,oe,xe,g){let j=cd(ee.pct),K=`resets ${id(ee.resetsAt,g)}${oe?` \xB7 ${xe}`:""}`;return l`<span
      class="usage-meter__window ${ld(j)}"
      style=${`--progress: ${j}%`}
      title=${K}
    >
      <span class="usage-meter__label">${ee.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${j}%</span>
    </span>`}function O(ee,oe,xe){let g=oe.available&&typeof oe.ageSeconds=="number"&&oe.ageSeconds>od,j=g&&typeof oe.ageSeconds=="number"?`${Math.floor(oe.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",U=oe.accounts.filter(ke=>!ke.active).length,K=`usage-meter__group${g?" usage-meter__group--stale":""}`,ge=l`<span class="usage-meter__provider"
        >${ee.label}</span
      >
      ${oe.available?oe.windows.map(ke=>I(ke,g,j,xe)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${U>0?l`<span class="usage-meter__badge">+${U}</span>`:""}`;if(oe.accounts.length===0)return l`<span
        class=${K}
        aria-label=${`${ee.label} usage`}
        >${ge}</span
      >`;let we=r===ee.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${K}`}
      aria-label=${`${ee.label} usage`}
      aria-expanded=${we?"true":"false"}
      aria-controls=${sd}
      @click=${()=>se(ee.key)}
    >
      ${ge}
    </button>`}function R(ee,oe){return l`<span class="usage-meter" aria-label="Usage">
      ${ee.map(xe=>O(xe.provider,xe.snapshot,oe))}
    </span>`}function A(ee,oe){let xe=cd(ee.pct),g=id(ee.resetsAt,oe);return l`<span
      class="usage-meter__account-window ${ld(xe)}"
      style=${`--progress: ${xe}%`}
    >
      <span class="usage-meter__account-key">${ee.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${xe}%</span>
      <span class="usage-meter__account-reset"
        >${g.length>0?`\u21BB ${g}`:""}</span
      >
    </span>`}function D(ee,oe){return Fg.includes(oe)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ee.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function G(ee,oe,xe){let g=oe.status==="ok",j=typeof oe.ageSeconds=="number"&&oe.ageSeconds>od,U=a.get(dd(ee.key,oe.number)),K=n.get(ee.key),ge=K!==void 0,we=K===oe.number,ke=["usage-meter__account"];return oe.active&&ke.push("usage-meter__account--active"),g||ke.push("usage-meter__account--unavailable"),j&&ke.push("usage-meter__account--stale"),l`<div class=${ke.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${oe.email}
          >${oe.alias===null?oe.email:oe.alias}</span
        >
        ${oe.plan===null?"":l`<span class="usage-meter__account-tag">${oe.plan}</span>`}
        ${oe.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${oe.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${Bg(oe.ageSeconds)}</span
            >`}
        ${oe.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ge}
              @click=${()=>{q(ee,oe.number)}}
            >
              ${we?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${g?l`<div class="usage-meter__account-windows">
            ${oe.windows.map(Ze=>A(Ze,xe))}
          </div>`:l`<div class="usage-meter__account-status">
            ${D(ee,oe.status)}
          </div>`}
      ${U===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${U.kind}"
          >
            ${U.text}
          </div>`}
    </div>`}function pe(ee,oe,xe){let g=oe.accounts.filter(j=>j.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ee.label} · 활성 ${g} / 전체
        ${oe.accounts.length}
      </h2>
      ${oe.accounts.map(j=>G(ee,j,xe))}
    </section>`}function fe(ee,oe){return l`<div
      class="usage-meter__card"
      id=${sd}
      role="dialog"
      aria-label=${`${ee.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${pe(ee.provider,ee.snapshot,oe)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function _e(){let ee=[];for(let g of ud){let j=o.get(g.key);j&&ee.push({provider:g,snapshot:j})}if(ee.length===0){k(),u();return}let oe=ee.find(g=>g.provider.key===r&&g.snapshot.accounts.length>0);oe||k();let xe=Date.now();Ye(R(ee,xe),e),e.hidden=!1,oe?ae(oe,xe):p()}function ae(ee,oe){let xe=d(),g=e.getBoundingClientRect(),j=e.ownerDocument.documentElement.clientWidth;xe.style.setProperty("--usage-meter-anchor-top",`${g.bottom}px`),xe.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,j-g.right)}px`),Ye(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${V}
        ></div>
        ${fe(ee,oe)}`,xe)}async function Le(ee){try{let oe=await fetch(ee.endpoint);return oe.ok?Wg(await oe.json()):null}catch{return null}}async function Te(){i+=1;let ee=i,oe=await Promise.all(ud.map(async xe=>({provider:xe,snapshot:await Le(xe)})));if(!(t||ee!==i)){for(let xe of oe)xe.snapshot?o.set(xe.provider.key,xe.snapshot):o.delete(xe.provider.key);_e()}}return u(),Te(),s=setInterval(()=>{Te()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),k(),u()}}}function _d(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var zg="worker-ineligible";function ri(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function md(e){return ri(e).includes(zg)}var Hg="worker-serial";function ni(e){return ri(e).includes(Hg)}function si(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Gg=new Set(["done","failed","orphaned","stopped","discarded"]),Vg={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Kg={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Yg={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function oi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Yg[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function gd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,d=!1,p=null,m=null,k=null,T=new Set,M=!1,H=0,se=null,V=new Set;function q(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function I(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function O(){return o&&o()||""}async function R(){if(!s)return;let w=++H;M=!0,k=null,T.clear(),N();try{let C=await s("worker-parallel-analysis-targets",{root_dir:O()});if(w!==H||!te)return;let B=Array.isArray(C?.qualified)?C.qualified:[],ie=Array.isArray(C?.excluded)?C.excluded:[];k={qualified:B,excluded:ie};for(let Ce of B)Ce&&typeof Ce.id=="string"&&T.add(Ce.id)}catch{w===H&&te&&(k={qualified:[],excluded:[]},me("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{w===H&&(M=!1,te&&N())}}function A(w){return Array.isArray(w.runs)?w.runs:[]}function D(){let w=q(),C=new Set;for(let B of Object.values(w.attempts||{})){let ie=B;ie&&typeof ie.bead_id=="string"&&!Gg.has(ie.status)&&C.add(ie.bead_id)}for(let B of Array.isArray(w.pr_wait)?w.pr_wait:[])B&&typeof B.bead_id=="string"&&C.add(B.bead_id);for(let B of Object.values(w.discard_operations||{})){let ie=B;ie&&ie.phase!=="done"&&typeof ie.bead_id=="string"&&C.add(ie.bead_id)}return C}function G(w){return w.filter(C=>pe(C)===null)}function pe(w){let C=q();for(let B of Array.isArray(C.serial_lanes)?C.serial_lanes:[])if(Array.isArray(B?.entries)&&B.entries.some(ie=>ie.bead_id===w))return B.id;return(Array.isArray(C.queue)?C.queue:[]).some(B=>B.bead_id===w)?"parallel":null}function fe(w,C){let B=c.get(w);return B||[...C.order]}function _e(w){if(w.length<2)return!1;let C=pe(w[0]);if(!C||C==="parallel")return!1;let B=q(),ie=(Array.isArray(B.serial_lanes)?B.serial_lanes:[]).find(Ae=>Ae.id===C)?.entries.map(Ae=>Ae.bead_id);if(!Array.isArray(ie))return!1;let Ce=w.map(Ae=>ie.indexOf(Ae));return Ce.every(Ae=>Ae>=0)&&Ce.every((Ae,Pe)=>Pe===0||Ae>Ce[Pe-1])}function ae(){let w=q(),C=Array.isArray(w.serial_lanes)?w.serial_lanes:[],B=C.find(ie=>Array.isArray(ie.entries)&&ie.entries.length===0);return B?B.id:C[0]?.id||"s1"}function Le(w){let C=q().bead_titles||{};return typeof C[w]=="string"?C[w]:w}async function Te(w,C){if(!s||d)return null;d=!0,N();try{return await s(w,C)}finally{d=!1,N()}}async function ee(w){n?.setPending?.(!0);try{let C=await Te("worker-parallel-analysis-start",{force:w,target_ids:Array.from(T)});C&&C.applied===!1&&C.reason&&(C.reason==="target_not_qualified"&&Array.isArray(C.detail)?me(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${C.detail.join(", ")}`,"error",3200):me(`\uBD84\uC11D \uC2E4\uD328: ${C.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function oe(){let w=I().job;!s||!w||await s("worker-parallel-analysis-cancel",{job_id:w.job_id})}async function xe(w){if(!(!s||V.has(w))){V.add(w),N();try{let C=await s("worker-parallel-analysis-prompt",{root_dir:O(),run_id:w});if(!te)return;if(C?.ok===!0&&typeof C.prompt=="string"){se={run_id:w,prompt:C.prompt};return}me(C?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{V.delete(w),N()}}}function g(){se=null,N()}async function j(){if(!se)return;let w=await tr(se.prompt);me(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)}function U(w,C){a&&a(w,oi(C))}function K(){return q().runner_catalog}function ge(w){return Object.keys(K()?.runners?.[w]?.models||{})}function we(w){let C=ge(w),B=K()?.runners?.[w]?.default_model;return typeof B=="string"&&C.includes(B)?B:C[0]||""}function ke(){let w=I().settings,C=p||w.runner||"claude",B=ge(C),ie=p?we(C):w.model||B[0]||"",Ce=si(K(),C,ie),Ae=w.effort||"",Pe=Ce.includes(Ae)?Ae:Ce[0]||"";return{runner:C,model:ie,effort:Pe,models:B,efforts:Ce}}async function Ze(w){let C=I().settings,B=await Te("worker-parallel-analysis-settings-update",{expected_revision:C.revision,runner:w.runner,model:w.model,effort:w.effort});(!B||B.applied!==!0)&&(p=null,N(),B&&B.reason&&me(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${B.reason}`,"error",2800))}function wt(w){p=w,N();let C=ke();Ze({runner:w,model:C.model,effort:C.effort})}function He(w){let C=ke(),B=si(K(),C.runner,w);Ze({runner:C.runner,model:w,effort:B.includes(C.effort)?C.effort:B[0]||""})}function pt(w){let C=ke();Ze({runner:C.runner,model:C.model,effort:w})}async function st(w,C){if(!s||d)return;let B=fe(w,C),ie=I();if(B.length<2||!ie.last_good){me("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Ce=u.get(w)||ae(),Ae=()=>({snapshot_digest:ie.last_good.identity_digest,group_index:w,lane:Ce,ordered_bead_ids:B,expected_revision:q().revision});d=!0,N();try{let Pe=await s("worker-parallel-analysis-submit",Ae());Pe&&Pe.queue&&r&&r.set(Pe.queue),Pe&&Pe.applied!==!0&&Pe.conflict===!0&&(Pe=await s("worker-parallel-analysis-submit",Ae()),Pe&&Pe.queue&&r&&r.set(Pe.queue)),Pe&&Pe.applied===!0?(c.delete(w),me(`\uC9C1\uB82C \uB808\uC778 ${Ce}\uC5D0 ${B.length}\uAC1C \uBC30\uCE58`,"success")):me(`\uC81C\uCD9C \uAC70\uBD80: ${Pe?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,N()}}function Y(w,C,B){c.set(w,fe(w,C).filter(ie=>ie!==B)),N()}function Z(w){c.delete(w),N()}function Se(w,C,B,ie){let Ce=[...fe(w,C)],Ae=Ce.indexOf(B),Pe=Ae+ie;Ae<0||Pe<0||Pe>=Ce.length||(Ce.splice(Pe,0,...Ce.splice(Ae,1)),c.set(w,Ce),N())}function Qe(){let w=I().settings,C=Object.keys(K()?.runners||{}),B=ke();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${ie=>wt(ie.target.value)}
        >
          ${C.map(ie=>l`<option
                value=${ie}
                ?selected=${B.runner===ie}
              >
                ${ie}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${ie=>He(ie.target.value)}
        >
          ${B.models.map(ie=>l`<option
                value=${ie}
                ?selected=${B.model===ie}
              >
                ${ie}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${ie=>pt(ie.target.value)}
        >
          ${B.efforts.map(ie=>l`<option
                value=${ie}
                ?selected=${B.effort===ie}
              >
                ${ie}
              </option>`)}
        </select>
      </label>
      ${je(w)}
    </div>`}function je(w){return!Je(w)||ot(w)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:w.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${w.runner}/${w.model} · effort
        ${w.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:w.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function ot(w){return w.is_default===!0&&w.compatible===!1}function Je(w){return!!(w.runner&&w.model&&w.effort)}function yt(w){return Je(w)&&w.compatible!==!1}function Ie(w){let C=Math.max(0,Math.floor(w/1e3)),B=Math.floor(C/60),ie=C%60;return`${B}:${String(ie).padStart(2,"0")}`}function E(w){let C=w.job;if(C){let B=typeof C.started_at=="number"?C.started_at:0,ie=`${C.runner||"?"}/${C.model||"?"}`,Ce=B?` \xB7 \uACBD\uACFC ${Ie(Date.now()-B)}`:"",Ae=typeof C.session_id=="string"?C.session_id:"",Pe=A(w).find(Be=>Be.run_id===C.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${ie} · effort ${C.effort||"?"}${Ce}</span
        >
        ${Ae?l`<code class="pa-session-id" title=${Ae}
              >${Ae.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>U(C.job_id,Pe||C)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Pe?.prompt_saved!==!0||V.has(C.job_id)}
          @click=${()=>{xe(C.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Q()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Q(){return n?.isPending?.()===!0}function Ee(w){let C=!!w.job,B=yt(w.settings),ie=k!==null&&T.size===0,Ce=C||d||Q()||M;return l`<div class="pa-meta">
      ${w.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(w.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${E(w)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!B||Ce||ie}
        @click=${()=>{ee(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!B||Ce||ie}
        @click=${()=>{ee(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!C}
        @click=${()=>{oe()}}
      >
        취소
      </button>
    </div>`}function re(w){return typeof w=="string"&&w.length>0?w:"\uBBF8\uBC30\uCE58"}function qe(w,C){C?T.add(w):T.delete(w),N()}function rt(w){let C=Array.isArray(w.scope)?w.scope:[],B=Array.isArray(w.overlaps)?w.overlaps:[];return C.length===0&&B.length===0?l``:l`<span class="pa-target__signals">
      ${C.length>0?l`<details class="pa-target__scope" title=${C.join(`
`)}>
            <summary>scope ${C.length}</summary>
            <ul>
              ${C.map(ie=>l`<li><code>${ie}</code></li>`)}
            </ul>
          </details>`:""}
      ${B.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${B.join(", ")}`}
            >겹침 ${B.join(", ")}</span
          >`:""}
    </span>`}function it(){let w=k?.qualified||[],C=k?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${M?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${w.length} \xB7 \uC81C\uC678 ${C.length}`}</span
        >
      </header>
      ${k&&w.length>0?l`<ul class="pa-targets__list">
            ${w.map(B=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${B.id}
                      .checked=${T.has(B.id)}
                      @change=${ie=>qe(B.id,ie.target.checked)}
                    />
                    <span class="pa-target__title">${B.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${rt(B)}
                    <span class="pa-target__route">${B.route}</span>
                    <span class="pa-target__lane"
                      >${re(B.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:k&&w.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${k&&C.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${C.length}</summary>
            <ul class="pa-targets__list">
              ${C.map(B=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${B.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Vg[B.reason]||B.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${re(B.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Xe(w){let C=typeof w.session_id=="string"&&w.session_id.length>0,B=C?w.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${w.outcome}"
        >${Kg[w.outcome]||w.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(w.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${w.runner||"?"} / ${w.model||"?"} / ${w.effort||"?"}</span
      >
      ${C?l`<code class="pa-session-id" title=${B}
            >${B.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${w.outcome==="failure"&&w.reason?l`<span class="pa-run-row__reason">${w.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>U(w.run_id,w)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${w.prompt_saved!==!0||V.has(w.run_id)}
          @click=${()=>{xe(w.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function nt(w){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${w.length>0?l`<ul class="pa-runs__list">
            ${w.map(C=>Xe(C))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function _t(){return se?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${g}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${se.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{j()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${g}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${se.prompt}</pre
        >
      </section>
    </div>`:""}function ht(w,C){let B=fe(w,C),ie=D(),Ce=B.filter(Ke=>ie.has(Ke)),Ae=G(B),Pe=_e(B),Be=Array.isArray(q().serial_lanes)?q().serial_lanes:[],St=u.get(w)||ae(),bt=C.eligible!==!0||B.length<2||Ce.length>0||Ae.length>0||Pe||d;return l`<section class="pa-group" data-group-index=${String(w)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${C.confidence}</span>
        ${C.categories.map(Ke=>l`<span class="pa-group__category">${Ke}</span>`)}
        ${Pe?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${C.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Ae.length>0?l`<span class="pa-group__stale"
              >stale — ${Ae.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${C.reason}</p>
      <ol class="pa-group__members">
        ${B.map((Ke,Ft)=>l`<li class="pa-member" data-bead-id=${Ke}>
              <span class="pa-member__seq">${Ft+1}</span>
              <span class="pa-member__title">${Le(Ke)}</span>
              ${ie.has(Ke)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ke}
                ?disabled=${Ft===0}
                aria-label=${`${Ke} \uC704\uB85C`}
                @click=${()=>Se(w,C,Ke,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ke}
                ?disabled=${Ft===B.length-1}
                aria-label=${`${Ke} \uC544\uB798\uB85C`}
                @click=${()=>Se(w,C,Ke,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ke}
                aria-label=${`${Ke} \uC81C\uC678`}
                @click=${()=>Y(w,C,Ke)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${C.evidence.map(Ke=>l`<li class="pa-evidence">
              <code>${Ke.path}</code>
              <span class="pa-evidence__locator">${Ke.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Z(w)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ke=>{u.set(w,Ke.target.value),N()}}
          >
            ${Be.map((Ke,Ft)=>l`<option
                  value=${Ke.id}
                  ?selected=${St===Ke.id}
                >
                  직렬 ${Ft+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${bt}
          @click=${()=>{st(w,C)}}
        >
          제출
        </button>
      </footer>
    </section>`}function at(w){let C=Array.isArray(w.issues)?w.issues:[],B=C.filter(Ce=>Ce.verdict==="parallel_ok").length,ie=C.filter(Ce=>Ce.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${B}</span>
      <span>uncertain ${ie}</span>
    </div>`}function kt(){let w=te&&!!I().job;if(w&&m===null){m=setInterval(()=>N(),1e3);return}!w&&m!==null&&(clearInterval(m),m=null)}function N(){let w=I();p&&w.settings.runner===p&&(p=null);let C=w.last_good?.result;kt(),Ye(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${ve}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Qe()} ${Ee(w)} ${it()}
            ${C?l`${C.groups.map((B,ie)=>ht(ie,B))}
                ${C.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${at(C)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${nt(A(w))}
          </div>
        </div>
        ${_t()}
      `,i)}let te=!1,he=()=>{te=!1,se=null,H+=1,kt()},ze=w=>{w.target===w.currentTarget&&ve()};i.addEventListener("close",he),i.addEventListener("cancel",he),i.addEventListener("click",ze);let De=null;r&&r.subscribe&&(De=r.subscribe(()=>{te&&N()}));let F=null;n&&n.subscribe&&(F=n.subscribe(()=>{te&&N()}));function ne(){te||(te=!0,N(),R(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function ve(){te&&(te=!1,se=null,H+=1,kt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:ne,close:ve,destroy(){te=!1,m!==null&&(clearInterval(m),m=null),i.removeEventListener("close",he),i.removeEventListener("cancel",he),i.removeEventListener("click",ze),De&&(De(),De=null),F&&(F(),F=null),i.remove()}}}var hd=new Set(["sh","bash","zsh","dash","ksh"]),bd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function yd(e){let t=e.split("/");return t[t.length-1]||""}function Zg(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=yd(r[0]);if(n!=="env")return hd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&hd.has(yd(s))}function Qg(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Xg(e){let t=[],r=0;bd.lastIndex=0;for(let n of e.matchAll(bd)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Qg(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Jg(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function vd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",c=0,u=null,d=!1;function p(O,R){return R?Xg(O).map(A=>A.kind==="plain"?A.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${A.kind}"
            >${A.text}</span
          >`):O}function m(){if(!s)return l``;let O=o==="ready"&&Zg(a),R=o==="ready"?a.split(`
`):[];return l`<div
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
              @click=${()=>{T()}}
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
          ${o==="loading"?l`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?l`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:l`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${R.map((A,D)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${D+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(A,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function k(){Ye(m(),n)}async function T(){if(o!=="ready")return;let O=await tr(a);me(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function M(O){O.key==="Escape"&&s&&(O.preventDefault(),q())}function H(){d||(document.addEventListener("keydown",M),d=!0)}function se(){d&&(document.removeEventListener("keydown",M),d=!1)}async function V(O,R=null){let A=++c;H(),s={...O},u=R||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",k(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let G=t?t():"";if(!G){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",k();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",k();return}let pe="/api/repo-ops-script?workspace="+encodeURIComponent(G)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let fe=await r(pe),_e=await fe.json().catch(()=>({}));if(A!==c)return;if((t?t():"")!==G){q();return}if(!fe.ok||!_e||_e.ok!==!0){o="error",i=Jg(_e&&typeof _e.error=="string"?_e.error:""),k();return}s={lane:_e.lane,base_sha:_e.base_sha,path:_e.path,base_ref:_e.base_ref},a=String(_e.content),o="ready",k()}catch{if(A!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",k()}}function q(){c+=1,se(),s=null,a="",k();let O=u;u=null,O?.isConnected&&O.focus()}function I(){q(),n.remove()}return{open:V,close:q,destroy:I}}function wd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let A=o();return typeof A.revision=="number"?A.revision:0}function i(A){t&&A&&A.queue&&typeof A.queue=="object"&&t.set(A.queue)}function c(){let A=o().workspace_info;return A&&typeof A=="object"?A:{}}function u(A,D){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${A}"
      >${D}</span
    >`}function d(A){if(typeof A!="number"||!Number.isFinite(A))return"";let D=A/6e4;return Number.isInteger(D)?`timeout ${D}\uBD84`:`timeout ${Math.round(A/1e3)}\uCD08`}function p(A){let D=d(A);return D?u("config",D):""}function m(A,D,G){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${G.script}
      @click=${pe=>{s&&s({lane:A,base_sha:D.base_sha,path:G.script,base_ref:D.base_ref},pe.currentTarget)}}
    ></button>`}function k(){let A=o().repo_ops_opt_out;return{verify:A?.verify===!0,deploy:A?.deploy===!0}}function T(A,D){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!D}
        @change=${G=>{V(A,!G.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function M(A){let D=typeof A.base_sha=="string"?A.base_sha:"",G=`${A.source_path||"repo-ops/config.toml"} @ ${A.base_ref||"?"}${D?`@${D.slice(0,7)}`:""}`,pe=k(),fe=!!A.verify&&pe.verify,_e=!!A.deploy&&pe.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${G}</span>
      </p>
      <div
        class="worker-repo-ops__lane${fe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${A.verify?l`${m("verify",A,A.verify)}
              ${p(A.verify.timeout_ms)}
              ${fe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${fe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":A.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${A.verify?T("verify",pe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${_e?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${A.deploy?l`${m("deploy",A,A.deploy)}
              ${p(A.deploy.timeout_ms)}
              ${_e?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${_e?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":A.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${A.deploy?T("deploy",pe.deploy):""}
      </div>
    </section>`}function H(A){let D=A.repo_ops&&typeof A.repo_ops=="object"?A.repo_ops:null;return D&&(D.status==="resolved"||D.status==="absent")?M(D):D&&(D.status==="pending"||D.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${D.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${D.error_code?l` — <code>${D.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function se(A){if(!r)return;let D=await r("worker-auto-repair-toggle",{on:A,expected_revision:a()});if(i(D),D&&D.conflict){let G=await r("worker-auto-repair-toggle",{on:A,expected_revision:a()});i(G)}n()}async function V(A,D){if(!r)return;let G=await r("worker-repo-ops-opt-out-toggle",{kind:A,opted_out:D,expected_revision:a()});if(i(G),G&&G.conflict){let pe=await r("worker-repo-ops-opt-out-toggle",{kind:A,opted_out:D,expected_revision:a()});i(pe)}n()}let q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function I(A,D,G){return l`<div class="worker-repo-ops__policy-group" data-policy=${G}>
      <div class="worker-repo-ops__policy-label">${A}</div>
      <ul class="worker-repo-ops__policy-list">
        ${D.map(pe=>l`<li data-token=${pe}>
              ${q[pe]||pe}
            </li>`)}
      </ul>
    </div>`}function O(A){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${A.map(D=>{let G=[q[D.trigger]||D.trigger];return Number.isInteger(D.attempts_per_operation_attempt)?G.push(`operation\uB2F9 ${D.attempts_per_operation_attempt}\uD68C`):Number.isInteger(D.attempts)?G.push(`${q[D.budget]||D.budget} ${D.attempts}\uD68C`):Number.isInteger(D.sessions_per_user_action)&&G.push(`${D.sessions_per_user_action}\uD68C`,q[D.user_actions]||D.user_actions),D.applies_when&&G.push(q[D.applies_when]||D.applies_when),l`<li data-token=${D.id}>
            <strong>${q[D.id]||D.id}</strong>
            <span>${G.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function R(){let A=o(),D=A.auto_repair!==!1,G=A.repo_operation_policy&&typeof A.repo_operation_policy=="object"?A.repo_operation_policy:null,pe=Array.isArray(A.repo_operations)?A.repo_operations:[],fe=pe.find(Te=>Te.state==="repairing"),_e=pe.filter(Te=>Te.state==="failed"||Te.state==="repairing"),ae=_e.length?Math.min(..._e.map(Te=>typeof Te.repair?.remaining=="number"?Te.repair.remaining:0)):G?.auto_repair?.resolution_ladder?.find(Te=>Te.id==="auto_repair_session")?.attempts??1,Le=Array.isArray(G?.auto_repair?.resolution_ladder)?G.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${D}
          @change=${Te=>{se(Te.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${D?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ae}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${fe?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${fe.repair?.owner_bead||fe.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${G?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(G.worker_automatic||[]).length} · 해결 사다리
                ${Le.length} · 금지
                ${(G.never_automatic||[]).length}</span
              >
            </summary>
            ${I("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",G.worker_automatic||[],"worker-automatic")}
            ${G.supported===!1||G.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${G.schema_version})`}
                </div>`:O(Le)}
            ${I("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",G.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${H(c())} ${R()}
      </details>`}}}var Ad=20,eh=5,th=new Set(["failed","repairing","running","queued","retry_pending"]),kd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},$d={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function rh(e,t,r=Ad){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function nh(e){if(e.type==="cleanup")return!0;let t=e.operation;return th.has(t.state)&&!t.dismissed&&!t.superseded_by}function sh(e,t,r={}){let n=rh(e,t,1/0),s=r.expanded===!0?Ad:eh,o=new Set(n.slice(0,s)),a=n.filter(i=>o.has(i)||nh(i));return{visible:a,hidden:n.length-a.length}}function xd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function oh(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Sd(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Ed(e,t="",r=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function ah(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn($d,n)?$d[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function ih(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${vo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${xd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(kd,t.kind)?kd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${bo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ls(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${xd(e)}"
          >${oh(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Ed(_u(t.failure_kind,n)):""}
      ${ah(t)}
      ${Sd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${bo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function lh(e){let t=e.cleanup,r=sn(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${vo(e.at)||"\u2014"}</span
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
        ${Ou(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Ed(xo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Sd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function ch(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(n=>n.type==="cleanup"?lh(n):ih(n))}
        </ul>`}
    ${t>0||r?l`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${r?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function Td(e,t={}){let r=null;function n(){if(r===null){Ye(l``,e);return}let a=sh(r.operations,r.cleanup_failures,{expanded:r.expanded});Ye(ch({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var uh=Ct("views:worker"),dh="tab:worker:ready",ph="tab:worker:blocked",fh="tab:worker:in-progress",_h="tab:worker:resolved",mh="tab:worker:closed",Io=1,Cd=5;function Rd(e){return io(e).path.length>0}var gh=new Set(["quick_fix","spec_backed","full_plan"]);function Ld(e){return typeof e=="string"&&gh.has(e)}var Md="beads-ui.worker.candidate-filter",ai={show_blocked:!1,spec:"all"};function hh(){try{let e=window.localStorage.getItem(Md);if(!e)return{...ai};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ai};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ai}}}function bh(e){try{window.localStorage.setItem(Md,JSON.stringify(e))}catch{}}function yh(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var vh=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Dd="bdui.worker.candidate_sort",wh=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Oo="spec";function kh(){try{let e=window.localStorage.getItem(Dd);return e==="board"||e==="created"||e==="spec"?e:Oo}catch{return Oo}}function $h(e){try{window.localStorage.setItem(Dd,e)}catch{}}var Nd="bdui.worker.done-range";function xh(){try{let e=window.localStorage.getItem(Nd);return ar(e)?e:er}catch{return er}}function Ah(e){try{window.localStorage.setItem(Nd,e)}catch{}}var Sh="(max-width: 640px)",qd="beads-ui.worker.lane-collapsed",ms={queue:!0,done:!0};function Eh(){try{let e=window.localStorage.getItem(qd);if(!e)return{...ms};let t=JSON.parse(e);return!t||typeof t!="object"?{...ms}:{queue:typeof t.queue=="boolean"?t.queue:ms.queue,done:typeof t.done=="boolean"?t.done:ms.done}}catch{return{...ms}}}function Th(e){try{window.localStorage.setItem(qd,JSON.stringify(e))}catch{}}function Id(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Ch(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Zr):(n.sort(Ps(r)),t==="board"?n:[...n.filter(Rd),...n.filter(s=>!Rd(s))])}function Rh(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Lh(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Od(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Ih(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Oh(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Ph(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Mh(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ii(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Dh(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Pd(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function Nh(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):Pd(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Pd(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Od(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Od(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function qh(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,d=null,p=null,m=null,k={},T=!1,M=!1,H={}){let se=!!c&&c.position>0,V=!!c?.continuation_action&&c.continuation_action.continuation===null,q=!!c&&c.active===!0,I=c&&c.failure||null,O=Oh(c?c.waiting:null,m),R=r[e]||null,A=R&&R.gate?R.gate:null,D=R&&R.pr?R.pr:null,G=Dh(m),pe=Ph(c?c.resolution:null),fe=Mh(c?c.head_review:null),_e=c&&c.head_review||null,ae=c&&c.authority||null,Le=!!_e&&["pending","reviewing","revising"].includes(_e.state),Te=se&&!q&&(_e?.state==="failed"||!ae||ae.source==="automatic"&&!M),ee=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":pe?pe.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":O,oe=!!A&&A.base_badge==="\uCDA9\uB3CC",xe=!!A&&A.enabled===!0,g=fs({bead_id:e,merge_sha:H.merge_sha,cleanup_cursor:H.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:H.repo_operations}),j=Lo(g),U=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!A&&A.tier==="merged",K=i&&!!n&&!!A&&A.tier==="merged",ge=Te&&(xe||oe||A?.reason==="base_behind"||A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"||U||K),we=i&&oe&&u===!1,ke=yr(k,e,{external:i,merge_active:q||g?.step==="merge",merge_queued:se,conflict_active:!!a,cleanup_active:j,merged:!!n||A?.tier==="merged"}),Ze=!!ke.operation,wt=!U&&!!n&&n.step==="repo_operations",He=Nh({continuation_required:V,merge_step:g,conflict_badge:ee,conflict_live:pe?.live===!0||a==="running",head_review:_e&&fe?{...fe,state:_e.state,failure_reason:_e.failure_reason}:null,recovery:G,cleanup_failed:n,cleanup_label:n?sn(n.step):null,base_exception:p,conflicting:oe,gate:A,receipt_check:R&&R.receipt_check?R.receipt_check:null,queue_failure:I,auto_skip:d,queued:se,queue_active:q,queue_position:c?c.position:0,activity:ee?null:o&&o.activity||null}),pt=He?.live===!0&&He.title?l`<span title=${He.title}>${He.label}</span>`:He?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:n&&g?.active!==!0?Ro(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:T,external:i,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:He?.live!==!0&&He?.title?He.label:null,completion_title:He?.title||"",completion_repair_pr_url:G?G.repair_pr_url:"",completion_repair_pr_number:G?G.repair_pr_number:null,badges:pt?[pt]:[],live_badge:He?.live===!0?pt:null,usage:s,alert:He?.alert===!0,merge_action:A?.tier==="merged"&&!U&&!K||wt?!1:!se||V||Te,timeline_action:wt,cancel_action:se&&!V,cancel_enabled:(!q||Le)&&!(G&&G.lock_actions),cancel_title:G&&G.lock_actions?`${G.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:q&&!Le?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Le?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ke,discard_action:ke.action,merge_step:g,discard_enabled:ke.enabled,discard_title:ke.title,merge_enabled:!g&&!a&&!Ze&&!p&&!(G&&G.lock_actions)&&!we&&!wt&&(xe||oe||A?.reason==="base_behind"||A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"||U||K||ge),merge_label:V?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":U||K?"\uC815\uB9AC \uC7AC\uAC1C":oe&&!g&&!U?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":A?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Te?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ze?ke.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ke.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ke.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:V?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":g?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${g.label}`:K?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":we?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":U?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":oe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":xe?`\uBA38\uC9C0 (${A.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:A&&A.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${A&&A.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function li(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:d,onDoneRangeChange:p}=t,m=n?Ds(n,i):null,k=js({transport:r,uiOrderStore:i}),T=null,M=[],H=hh(),se=null,V=kh(),q=ar(d)?d:xh(),I=new Map;function O(){let f=Rr.find($=>$.value===q);return f?f.label:"\uC624\uB298"}let R=Eh(),A=!1,D=new Set,G=new Set,pe=new Set,fe=new Set,_e=new Set,ae={},Le=null,Te=0,ee=null,oe=[];function xe(f){return Le===f?ae:{}}async function g(){if(!r)return;let f=u?.()||"";if(Le===f||ee&&ee.key===f&&ee.generation===Te)return;let $=++Te;ee={key:f,generation:$};let z=null;try{z=await Promise.resolve(r("get-session-defaults",{}))}catch(_){if($!==Te)return;ee=null,uh("get-session-defaults failed: %o",_),y();return}$===Te&&(ae=z&&typeof z.values=="object"&&z.values!==null?{...z.values}:{},Le=f,ee=null,y())}function j(){Le=null,Te+=1,g()}let U=document.createElement("div");U.className="worker-console";let K=document.createElement("div");K.className="worker-top";let ge=document.createElement("div");ge.className="worker-drawer-overlay",ge.hidden=!0;let we=document.createElement("div");we.className="worker-drawer-overlay__backdrop";let ke=document.createElement("div");ke.className="worker-drawer-host";let Ze=document.createElement("div");Ze.className="worker-drawer-host",Ze.hidden=!0,ge.append(we,ke,Ze);let wt=document.createElement("div");wt.className="worker-lanes-host",U.append(K,ge,wt),e.appendChild(U);let He=null,pt=null,st=En(ke,{transport:r,sessionLogStore:a,onClose:()=>{He=null,pt=null,ge.hidden=!0,y()}}),Y=Td(Ze,{onClose:()=>{Ze.hidden=!0,ge.hidden=!0,y()}}),Z=vd({getWorkspacePath:u||(()=>"")}),Se=u&&u()||"",Qe=wd({queueStore:s,transport:r,onChanged:()=>y(),onOpenScript:(f,$)=>{Z.open(f,$)}}),je=o?gd(U,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(f,$)=>Dt(f,$)}):null;function ot(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Io,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Je(){let f=ot(),$=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,z=Array.isArray(f.serial_lanes)?f.serial_lanes:[],_=[];for(let ce of z){if(_.length>=$)break;!ce||typeof ce.id!="string"||!/^s[1-5]$/.test(ce.id)||!Array.isArray(ce.entries)||_.push({id:ce.id,label:`\uC9C1\uB82C ${ce.id.slice(1)}`,count:ce.entries.length})}return _.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},..._]}function yt(f){if(!se||!f.some(z=>z.id===se))return null;let $=Je();return $?{bead_id:se,lanes:$}:null}function Ie(){let f=ot();return typeof f.revision=="number"?f.revision:0}function E(f){f&&f.queue&&s&&s.set(f.queue)}function Q(){let f=ot().queue;return Array.isArray(f)?f.length:0}async function Ee(f,$,z){if(!r)return;let _=()=>({bead_id:f,...$==="parallel"?{}:{lane:$},...z===void 0?{}:{index:z},expected_revision:Ie()}),b=await r("worker-queue-place",_());E(b),b&&b.conflict&&await r("worker-queue-place",_()).then(E)}async function re(f,$,z){if(!r)return;let _=()=>({bead_id:f,...$==="parallel"?{}:{lane:$},to_index:z,expected_revision:Ie()}),b=await r("worker-queue-reorder",_());E(b),b&&b.conflict&&await r("worker-queue-reorder",_()).then(E)}async function qe(f){if(!r)return;let $=await r("worker-queue-remove",{bead_id:f,expected_revision:Ie()});E($),$&&$.conflict&&await r("worker-queue-remove",{bead_id:f,expected_revision:Ie()}).then(E)}async function rt(f){if(!r||!f)return;let $=await r("worker-attempt-pause",{attempt_id:f});$&&$.paused===!1&&$.reason&&me(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function it(f){if(!r||!f)return;let $=await $n();if($===null)return;let z=async(b={})=>await r("worker-attempt-resume",{attempt_id:f,expected_revision:Ie(),...$!==""?{instructions:$}:{},...b}),_=await z();E(_),_&&_.conflict&&(_=await z(),E(_)),_=await wr(_,(b,ce)=>z({continuation:b,decision_token:ce}),{onResult:E,refresh:()=>z()}),_&&_.resumed===!1&&!_.conflict&&_.reason&&me(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Xe(f){if(!r||!f)return;let $=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:Ie()});E($),$&&$.conflict&&($=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:Ie()}),E($)),$&&$.dismissed===!1&&!$.conflict&&$.reason&&me(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${$.reason}`,"error",2400)}async function nt(f,$,z=!0){if(!r)return null;let _=r,b=await _(f,{...$,expected_revision:Ie()});return E(b),b&&b.conflict&&z&&(b=await _(f,{...$,expected_revision:Ie()}),E(b)),b}async function _t(f){if(!r||!f)return;let $=ot().merge_queue?.find(_=>_.bead_id===f)?.continuation_action;if($?.mismatch&&$.continuation===null){await at(f,$.mismatch);return}D.add(f),y();let z;try{z=await nt("worker-merge-queue-add",{bead_id:f})}finally{D.delete(f),y()}if(!(!z||z.applied)){if(z.conflict){me("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}me(Ih(z.reason),"error",2400)}}async function ht(f){if(!(!r||!f||G.has(f))){G.add(f),y();try{let $=await r("worker-cleanup-retry",{bead_id:f,expected_revision:Ie()});E($),$&&!$.retried&&!$.conflict&&$.reason&&me(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${$.reason}`,"error",2400)}finally{G.delete(f),y()}}}async function at(f,$){let z=await wr({continuation_mismatch:$},(b,ce)=>nt("worker-merge-queue-add",{bead_id:f,continuation:b,decision_token:ce},!1)),_=z?.queue?.merge_queue?.find(b=>b.bead_id===f)?.continuation_action;if(z?.applied!==!0&&_?.continuation===null&&_.mismatch){await at(f,_.mismatch);return}z&&z.applied===!1&&!z.conflict&&me("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function kt(f){if(!r)return;let $=await nt("worker-merge-auto-toggle",{on:f});!$||$.conflict||me(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function N(f){if(!r||!f)return;let $=await nt("worker-merge-queue-remove",{bead_id:f});$&&!$.conflict&&!$.applied&&$.reason==="merge_active"&&me("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function te(){await nt("worker-merge-queue-remove",{all:!0})}async function he(f,$=null,z="unmerged",_=null){if(!r||!f)return;let b=cs(f,z);if(!(!!_||typeof globalThis.confirm!="function"||globalThis.confirm(b)))return;let le=await r("worker-discard",{bead_id:f,...$?{attempt_id:$}:{},..._?{operation_id:_}:{},expected_revision:Ie()});if(E(le),le&&le.conflict&&(le=await r("worker-discard",{bead_id:f,...$?{attempt_id:$}:{},..._?{operation_id:_}:{},expected_revision:Ie()}),E(le)),le&&le.discarded===!0){me(wo(le),"success",5e3);return}if(le&&le.reason){me(`\uD3D0\uAE30 \uC2E4\uD328: ${le.reason}`,"error",2800);return}if(le&&le.accepted&&le.pending==="merged_revert"){me("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(le&&le.accepted&&!le.discarded){me(`\uD3D0\uAE30 \uC9C4\uD589: ${le.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}le&&!le.conflict&&me("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ze(f,$,z){if(!(!r||!$||!z||fe.has($))){fe.add($),y();try{let _=await r(f,{bead_id:$,action_id:z,expected_revision:Ie()});E(_),_?.conflict?me("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!_?.ok&&_?.reason&&me(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(_.reason)}`,"error",2800)}finally{fe.delete($),y()}}}async function De(f,$){if(!r||!$||pe.has($))return;pe.add($),y();let z;try{let _=async(b={})=>await r(f,{bead_id:$,expected_revision:Ie(),...b});z=await _(),E(z),z&&z.conflict&&(z=await r(f,{bead_id:$,expected_revision:Ie()}),E(z)),f==="worker-revise-fix"&&(z=await wr(z,(b,ce)=>_({continuation:b,decision_token:ce}),{onResult:E,refresh:()=>_()}))}finally{pe.delete($),y()}if(!(!z||z.conflict)){if(z.ok){me(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}me(`\uCC98\uBD84 \uAC70\uBD80: ${z.reason||""}`,"error",3e3)}}async function F(f){if(!r)return;let $=await r("worker-automation-toggle",{on:f,expected_revision:Ie()});E($),$&&$.conflict&&await r("worker-automation-toggle",{on:f,expected_revision:Ie()}).then(E)}async function ne(f){if(!r||!f)return;let $=await r("worker-repo-operation-repair",{operation_id:f});if(E($),$&&$.ok===!1){me(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${$.reason||""}`,"error",3e3);return}$&&$.ok===!0&&me("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function ve(f){if(!r||!f)return;let $=await r("worker-repo-operation-dismiss",{operation_id:f});E($),$&&$.ok===!1&&me(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${$.reason||""}`,"error",3e3)}async function w(f){if(!r||!Number.isFinite(f))return;let $=Math.max(Io,Math.floor(f)),z=await r("worker-queue-set-slots",{slots:$,expected_revision:Ie()});E(z),z&&z.conflict&&await r("worker-queue-set-slots",{slots:$,expected_revision:Ie()}).then(E)}async function C(f){if(!r||!Number.isInteger(f)||f<1||f>Cd)return;let $=ot(),z=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).slice(f).reduce((ce,le)=>ce+(Array.isArray(le?.entries)?le.entries.length:0),0),_=()=>({count:f,expected_revision:Ie()}),b=await r("worker-queue-set-serial-lane-count",_());E(b),b&&b.conflict&&(b=await r("worker-queue-set-serial-lane-count",_()),E(b)),b&&b.applied&&z>0&&me(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${z}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function B(){let f=ot(),$=m?m.selectBoardColumn(dh,"ready"):[],z=m?m.selectBoardColumn(ph,"blocked"):[],_=m?m.selectBoardColumn(mh,"closed"):[],b=m?m.selectBoardColumn(fh,"in_progress"):[],ce=m?m.selectBoardColumn(_h,"resolved"):[],le=qs([...$,...z,...b,...ce,..._]),Ue=new Map;for(let h of[...$,...z,...b])h&&h.id&&!Ue.has(h.id)&&Ue.set(h.id,h);let $e={...xe(u?.()||"")};for(let h of["orchestration_model","orchestration_effort","orchestration_speed"]){let W=f[h];typeof W=="string"&&($e[h]=W)}function x(h,W){let de=Ue.get(h);if(!de)return null;let Ve=de.metadata&&typeof de.metadata=="object"?de.metadata:{},dt=de.workflow?.route,Ut=Ve.route,qt=Ld(dt)?dt:Ld(Ut)?Ut:null;return Qt({pin:Ve,global:$e,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:qt,controller_runtime:W})}function J(h){let W=h.runner||null,de=x(h.bead_id,W),Ve=Ao(h),dt=de?qr(de,W):null;return Ve||dt?{orchestration:Ve,worker:dt}:null}let P=new Map;function Re(h){if(P.has(h))return P.get(h)??null;let W=x(h,null),de=null;if(W){let Ve=gr(f.runner_catalog??null,W.orchestration_model.value??""),dt=Ve===null?W:x(h,Ve),Ut=nn(dt,f.runner_catalog??null),qt=qr(dt,Ve);de=Ut||qt?{orchestration:Ut,worker:qt}:null}return P.set(h,de),de}function ut(h){let W=Fs(le,h);return W.total===0?null:W}let lt=f.bead_titles||{},et=new Map;for(let[h,W]of Object.entries(lt))typeof W=="string"&&W.length>0&&et.set(h,W);for(let h of[...$,...z])et.set(h.id,h.title||h.id);let tt=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},Pt=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},Jt=new Map;for(let[h,W]of Object.entries(Pt))Array.isArray(W)&&Jt.set(h,ni(W));for(let h of[...$,...z]){let W=h.labels;Array.isArray(W)&&!Jt.has(h.id)&&Jt.set(h.id,ni(W))}let on=new Map,an=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(an)?an:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let W=h.members.map(Ve=>{let dt=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(Ut=>Ut.entries.some(qt=>qt.bead_id===Ve));return dt?dt.id:null});if(!(W.every(Ve=>Ve!==null)&&new Set(W).size===1))for(let Ve of h.members)on.set(Ve,h.members.filter(dt=>dt!==Ve))}let gs=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},ln=new Map;for(let[h,W]of Object.entries(tt))W&&typeof W=="object"&&ln.set(h,W);for(let h of[...$,...z])ln.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let Br=h=>ln.get(h)||{},Ur=f.pr_wait||[],cn=f.pr_observations||{},hs=f.pr_activity||{},We=f.cleanup_failed||{},Lt=Object.entries(We).map(([h,W])=>({bead_id:h,step:W&&W.step?W.step:"",reason:W&&W.reason?W.reason:"",at:W&&typeof W.at=="number"?W.at:null,detail:W&&typeof W.detail=="string"?W.detail:null,output_tail:W&&typeof W.output_tail=="string"&&W.output_tail?W.output_tail:void 0,log_path:W&&typeof W.log_path=="string"&&W.log_path?W.log_path:void 0,retry_count:W&&typeof W.retry_count=="number"&&Number.isInteger(W.retry_count)&&W.retry_count>0?W.retry_count:0,failure_code:W&&typeof W.failure_code=="string"?W.failure_code:void 0,subject_id:W&&typeof W.subject_id=="string"?W.subject_id:void 0,repair_eligible:!!(W&&W.repair_eligible),repair:W&&W.repair?W.repair:void 0})),un=f.queue||[],Qd=new Set([...un.map(h=>h.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(W=>W.bead_id)),...Ur.map(h=>h.bead_id),...f.done.map(h=>h.bead_id)]),Xd=new Set(z.map(h=>h.id)),Jd=i?i.get()?.order||{}:{},pi=new Set,fi=[];for(let h of[...$,...z])Qd.has(h.id)||pi.has(h.id)||Rh(h)||(pi.add(h.id),fi.push(h));M=Ch(fi,V,Jd);let ep=f.admission||{},_i=h=>{let W=ep[h];if(!W)return"";if(W.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let de=typeof W.reason=="string"?W.reason:"",Ve=de.indexOf(":");return Ve>0&&Ve<de.length-1?`\u26D4 ${de.slice(0,Ve)} (${de.slice(Ve+1)})`:`\u26D4 ${de}`},tp=M.map(h=>{let W=io(h),de=W.path.length>0,Ve=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",dt=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,Ut=Object.hasOwn(h,"labels")&&md(h.labels),qt=!Ut&&(Ve?dt:de&&!W.conflict),Et=Xd.has(h.id),dr=[];Et&&dr.push(Lh(h)),Ve&&!dt?dr.push("missing_description"):!Ve&&W.conflict?dr.push("spec_id_conflict"):!Ve&&!de&&dr.push("spec \uC5C6\uC74C");let As=_i(h.id);return As&&dr.push(As),{id:h.id,title:h.title||h.id,reason:dr.join(" \xB7 "),draggable:qt,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:Ve,status:h.status,worker_ineligible:Ut,blocked:Et,has_spec:de,exec_chips:Re(h.id)}}),Po=yh(tp,H),rp=Po.visible,np=f.revise_parked||{},bs=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Mo=(h,W)=>h.map((de,Ve)=>{let dt=W!=="done",Ut=W!=="done"&&W!=="queue",qt=dt?np[de.bead_id]:null,Et=dt?yr(bs,de.bead_id):null,dr=Et?.operation?Et:null,As=dt&&Jt.get(de.bead_id)===!0,qi=gs[de.bead_id]||[],jo=f.admission&&typeof f.admission=="object"?f.admission[de.bead_id]:null,Bo=dt?uu(jo,!!dr||fe.has(de.bead_id)):null,gp=dt&&!Bo?_i(de.bead_id):null,hp=dt?[gp]:[],Fi=dt&&qi.length>0&&typeof jo?.reason=="string"&&jo.reason.startsWith("not_ready")?[`\u23F8 ${qi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Uo=dt?on.get(de.bead_id):void 0;return Uo&&Uo.length>0&&Fi.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Uo.join(", ")}\uC640`),{id:de.bead_id,title:et.get(de.bead_id)||de.bead_id,reason:hp.filter(Boolean).join(" \xB7 "),draggable:dt&&!dr&&!Bo,done:W==="done",lane:W,seq:Ut?Ve+1:void 0,worker_serial:As,discard:dr,stale_work:Bo,badges:[...Fi,...qt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!qt,revise_action:!!qt,revise_enabled:!!qt&&!dr&&!pe.has(de.bead_id),revise_title:qt?qt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${qt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:W==="done"?lr(f.attempts||{},de.bead_id):null,work_ms:W==="done"?yo(f.attempts||{},de.bead_id):null,done_at:W==="done"&&typeof de.added_at=="number"?de.added_at:void 0,exec_chips:dt?Re(de.bead_id):null,...Br(de.bead_id)}}),dn=f.attempts?Object.values(f.attempts):[],Do=new Set;for(let h of dn)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&Do.add(h.resumed_from);let mi=new Map;for(let h of dn)mi.set(h.bead_id,h.attempt_id);let ys=new Map;for(let h of dn)ys.set(h.attempt_id,h);function No(h){let W=new Set,de=h;for(;de&&!W.has(de.attempt_id);){if(de.conflict_resolution===!0)return!0;W.add(de.attempt_id),de=typeof de.resumed_from=="string"&&de.resumed_from.length>0&&ys.get(de.resumed_from)||null}return!1}let vs=typeof f.declared_base=="string"?f.declared_base:null;function sp(h){let W=null;for(let de of dn)!de||de.bead_id!==h||No(de)||(W===null||(typeof de.started_at=="number"?de.started_at:0)>=(typeof W.started_at=="number"?W.started_at:0))&&(W=de);return W&&typeof W.target_base=="string"?W.target_base:null}let gi=[],hi=[],op=_d(f),bi=h=>{let W=typeof h.session_id=="string"&&h.session_id.length>0,de=Do.has(h.attempt_id);return{eligible:W&&!de,reason:W?de?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},ur=null;for(let h of dn){let W=h.status==="paused"&&!Do.has(h.attempt_id);if(h.status==="running"||W)hi.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:et.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:W,conflict_resolution:No(h),base_exception:ii(vs,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:yr(bs,h.bead_id,{attempt_id:h.attempt_id}),usage:lr(f.attempts||{},h.bead_id),rollup:ut(h.bead_id),rollup_expanded:_e.has(h.bead_id),exec_chips:J(h),...Br(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&op(h)){let de=bi(h);gi.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:et.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:yr(bs,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:de.eligible,resume_reason:de.reason,conflict_resolution:No(h),base_exception:ii(vs,h.target_base),usage:lr(f.attempts||{},h.bead_id),rollup:ut(h.bead_id),rollup_expanded:_e.has(h.bead_id),exec_chips:J(h),...Br(h.bead_id)}),ur=h}}let ws=[...gi,...hi].map(h=>{let W=ys.get(h.attempt_id),de=W?.quickfix_landing;if(W?.quickfix_lane!==!0||!de||typeof de!="object")return h;let Ve=typeof de.reason=="string"&&de.reason.length>0?de.reason:null,dt=fs({bead_id:W.bead_id,merge_sha:de.head_sha,cleanup_cursor:de.cursor,cleanup_failed:Ve?{step:de.cursor,reason:Ve}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return dt?{...h,landing:dt}:h}),yi=null;if(ur){let h=bi(ur),W=ur.cause_detail;yi={bead_id:ur.bead_id,repo:ur.repo||"",reason:ur.cause||ur.status,cause_detail:W&&typeof W.reason=="string"?{reason:W.reason,command:typeof W.command=="string"?W.command:null}:null,resume_attempt_id:ur.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:yr(bs,ur.bead_id,{attempt_id:ur.attempt_id})}}let vi=new Set(ws.map(h=>h.bead_id)),qo=Array.isArray(f.merge_queue)?f.merge_queue:[],wi=new Map,ki=new Map,$i=new Map,xi=new Map,Ai=new Map;qo.forEach((h,W)=>{h&&typeof h.bead_id=="string"&&(wi.set(h.bead_id,W+1),ki.set(h.bead_id,h.resolution),$i.set(h.bead_id,h.continuation_action||null),xi.set(h.bead_id,h.head_review||null),Ai.set(h.bead_id,h.authority||null))});let pn=f.merge_queue_state||{active:null,failures:{}},ap=pn.failures||{},Si=pn.waiting&&typeof pn.waiting.bead_id=="string"&&typeof pn.waiting.reason=="string"?pn.waiting:null,ip=f.auto_merge_skips||{},Ei=h=>{let W=ip[h];if(!W)return null;let de=cn[h],Ve=de&&de.pr?de.pr.head_sha:null;return Ve&&Ve===W.head_sha?W.reason||"":null},ks=new Map;for(let h of ws)h.failed!==!0&&h.conflict_resolution&&(h.paused?ks.has(h.bead_id)||ks.set(h.bead_id,"paused"):ks.set(h.bead_id,"running"));let Ti=ws.filter(h=>!h.paused&&h.failed!==!0).length,Ci=(f.workspace_info||{}).slots,Ri=typeof Ci=="number"?Ci:typeof f.slots=="number"?f.slots:Io,lp=Ti>Ri,$s=Kr(q),cp=(Array.isArray(f.done)?f.done.slice():[]).filter(h=>$s===void 0||typeof h.added_at!="number"||h.added_at>=$s).sort((h,W)=>(W.added_at||0)-(h.added_at||0)),Pn=Mo(cp,"done"),up=new Set((Array.isArray(f.done)?f.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),Li=[],dp=u?.()||"";for(let h of _){let W=Qr(h.closed_at);if(typeof h.id!="string"||up.has(h.id)||W===null||$s!==void 0&&W<$s||typeof h.comment_count!="number"||h.comment_count<=0)continue;let de=`${dp}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,Ve=I.get(de);Ve===void 0&&r&&(I.set(de,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(dt=>{let Ut=Array.isArray(dt)&&dt.some(qt=>lo(typeof qt?.text=="string"?qt.text:"")?.lane==="session");I.set(de,Ut?"session":"not-session"),y()}).catch(()=>{I.set(de,"failed"),y()})),Ve==="session"&&Li.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:W,created_at:h.created_at,updated_at:h.updated_at})}Pn.push(...Li),Pn.sort((h,W)=>(W.done_at||0)-(h.done_at||0));let xs={};for(let h of kr)xs[h]=0;let Ii=!1,Oi=0,Fo=0,Pi=0;for(let h of Pn){let W=h.usage;if(W&&typeof W=="object"){let de=!1;for(let Ve of kr)Number.isFinite(W[Ve])&&(xs[Ve]+=W[Ve],Ii=!0,de=!0);de&&(Fo+=1,Number.isFinite(W.total_cost_usd)&&(Oi+=W.total_cost_usd,Pi+=1))}}Fo>0&&Pi===Fo&&(xs.total_cost_usd=Oi);let Mi=Pn.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),pp=Mi.length>0?zt(Vs(Mi)):Ii?$r(xs):null,fp=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},_p=Array.isArray(f.serial_lanes)?f.serial_lanes:[],Di=h=>{if(Ur.some(Ve=>Ve.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let W=dn.filter(Ve=>Ve&&Ve.bead_id===h),de=W.length>0?W[W.length-1].status:null;return de==="failed"||de==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":de==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ni=_p.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,W)=>{let de=fp[h.id]||{},Ve=new Map((Array.isArray(de.corrections)?de.corrections:[]).filter(Et=>Et&&typeof Et.bead_id=="string"&&typeof Et.after=="string").map(Et=>[Et.bead_id,Et.after])),dt=Mo(h.entries.filter(Et=>!vi.has(Et.bead_id)),h.id).map(Et=>Ve.has(Et.id)?{...Et,badges:[`\u{1F517} ${Ve.get(Et.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Et.badges]}:Et),Ut=Array.isArray(de.occupied_by)?de.occupied_by.filter(Et=>typeof Et=="string"):[],qt=Ut.map(Et=>({id:Et,title:et.get(Et)||Et,draggable:!1,lane:h.id,ghost:!0,badges:[Di(Et)]}));return{id:h.id,index:W+1,rows:[...qt,...dt],occupied:Ut.length>0,badge:Ut.length>0?Di(Ut[0]):"\uB300\uAE30",cycle:de.cycle===!0}}),mp=typeof f.serial_lane_count=="number"?f.serial_lane_count:Ni.length;return{queue:f,idToTitle:et,candidates:rp,candidate_hidden:{blocked:Po.hidden_blocked,spec:Po.hidden_spec},running:ws,live_count:Ti,slots:Ri,over_cap:lp,failure:yi,waiting:Mo(un.filter(h=>!vi.has(h.bead_id)),"queue"),serial_lanes:Ni,serial_lane_count:mp,pr_wait:Ur.map(h=>qh(h.bead_id,et.get(h.bead_id)||h.bead_id,cn,We[h.bead_id]||null,lr(f.attempts||{},h.bead_id),hs[h.bead_id]||(D.has(h.bead_id)||G.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ks.get(h.bead_id)||null,h.external===!0,{position:wi.get(h.bead_id)||0,active:pn.active===h.bead_id,failure:ap[h.bead_id]||null,waiting:Si?.bead_id===h.bead_id?Si.reason:null,resolution:ki.get(h.bead_id),continuation_action:$i.get(h.bead_id),head_review:xi.get(h.bead_id)||null,authority:Ai.get(h.bead_id)||null},h.wt_present!==!1,f.auto_merge===!0?Ei(h.bead_id):null,ii(vs,sp(h.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[h.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},ys.get(mi.get(h.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(h=>({...h,...Br(h.id)})),merge_queue_length:qo.length,merge_queue_running:qo.length>0,auto_excluded:Ur.map(h=>h.bead_id).filter(h=>Ei(h)!==null),declared_base:vs,done:Pn,token_total:pp,cleanup_failures:Lt,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function ie(){let $=!!o?.get()?.job,z=!$&&o?.isPending?.()===!0,_=$?"\uBD84\uC11D \uC911":z?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${_?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${_?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${_?l`<span class="worker-analysis-btn__badge">${_}</span>`:""}
    </button>`}function Ce(f){let $=f.waiting.length>0?f.waiting[0].id:"\u2014",z=l`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,_=Ke(f),b=f.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ce=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${O()} 완료 <b>${f.done.length}</b></span
      >`,le=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,Ue=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Io}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Cd},(J,P)=>P+1).map(J=>l`<option
                value=${String(J)}
                ?selected=${f.serial_lane_count===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      ${o?ie():""} `,$e=gu({failure:f.failure}),x=cu(f.repo_operations,f.cleanup_failures);return A?l`<div class="worker-ribbon">
          ${z} ${_}
          <div class="worker-kpi worker-kpi--ribbon">${b}${ce}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ue}</div>
          <div class="worker-kpi">${le}</div>
        </div>
        ${x}${Qe.template()}${$e}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${z}${_}${Ue}</div>
        <div class="worker-kpi">
          ${b}${ce}${le}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${O()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(J=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${J.tooltip}
                >${O()} 완료 · 누적 ${J.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${$}</b></span
          >
        </div>
      </div>
      ${x}${Qe.template()}${$e}`}function Ae(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let $=f.running.some(z=>!z.paused&&z.failed!==!0);return l`<section
      class="worker-now${$?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${f.running.length+f.pr_wait.length}</span
        >
      </header>
      ${f.running.length>0?Ga(f.running,Date.now(),He):""}
      ${f.pr_wait.map(z=>Ln(z))}
    </section>`}function Pe(f){let $=f.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${H.show_blocked}
        />
        🔒 blocked${$.blocked>0?` ${$.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${vh.map(z=>l`<button
              type="button"
              class="worker-filter__chip${H.spec===z.value?" is-active":""}"
              data-spec=${z.value}
              aria-pressed=${H.spec===z.value?"true":"false"}
            >
              ${z.label}
            </button>`)}
        ${$.spec>0?l`<span class="worker-filter__hidden">숨김 ${$.spec}</span>`:""}
      </div>
    </div>`}function Be(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${V}
    >
      ${wh.map(f=>l`<option value=${f.value} ?selected=${V===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function St(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${q}
      >
        ${Rr.map(f=>l`<option value=${f.value} ?selected=${q===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function bt(f){let $=l`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,z=f.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return sr({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:$,controls:z})}function Ke(f){let $=f.queue.auto_merge===!0;if(f.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${$?" is-active":""}"
        title=${$?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${$?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if($)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let z=new Set(f.auto_excluded),_=f.pr_wait.filter(b=>b.merge_action&&b.merge_enabled&&!z.has(b.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${_>0?` ${_}`:""}
    </button>`}function Ft(f){let $=sr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Be(),controls:Pe(f),place_menu:yt(f.candidates)});return A?l`<div class="worker-lanes worker-lanes--mobile">
        ${Ae(f)}
        ${sr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:R.queue,preview:Id(f.waiting)})}
        ${f.serial_lanes.map(z=>bt(z))}
        ${$}
        ${sr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:St(),collapsible:!0,collapsed:R.done,preview:Array.isArray(f.token_total)?f.token_total.map(z=>z.label).join(" \xB7 "):f.token_total||Id(f.done)})}
      </div>`:l`<div class="worker-lanes">
      ${$}
      <div class="worker-wait">
        ${sr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(z=>bt(z))}
      </div>
      ${sr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(z=>!z.paused&&z.failed!==!0),body:Ga(f.running,Date.now(),He)})}
      ${sr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${sr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${O()} ${f.done.length}`,items:f.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:St()})}
    </div>`}function v(f){R={...R,[f]:!R[f]},Th(R),y()}function y(){let f=B();Ye(Ce(f),K),Ye(Ft(f),wt)}function L(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(Sh);A=!!f.matches;let $=z=>{let _=!!(z&&typeof z.matches=="boolean"?z.matches:f.matches);_!==A&&(A=_,y())};typeof f.addEventListener=="function"?(f.addEventListener("change",$),oe.push(()=>f.removeEventListener("change",$))):typeof f.addListener=="function"&&(f.addListener($),oe.push(()=>f.removeListener($)))}let X=null;function be(f){X=f.target instanceof Element?f.target:null}function ye(f){let z=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!z)return;if(X&&z.contains(X)&&X.closest("input, button, a")){f.preventDefault();return}let _=z.dataset.beadId||"",b=z.dataset.lane||"";T={bead_id:_,from_lane:b};try{f.dataTransfer?.setData("text/plain",_),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function Ne(f){let $=f.target?.closest?.(".worker-pane");if(!$)return;let z=$.dataset.lane||"";z!=="candidate"&&z!=="queue"&&!/^s[1-5]$/.test(z)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),$.classList.add("worker-pane--drag-over"))}function Me(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ft(f,$){let z=M.find(le=>le.id===f);if(!z)return;let _=M.filter(le=>le.id!==f),b=_.length;if($){let le=$.dataset.beadId;if(le===f)return;let Ue=_.findIndex($e=>$e.id===le);Ue>=0&&(b=Ue)}let ce=_.slice();ce.splice(b,0,z),k.applyReorder(f,ce,b)}function $t(f){let $=f.target?.closest?.(".worker-pane");if(!$)return;f.preventDefault(),$.classList.remove("worker-pane--drag-over");let z=$.dataset.lane||"",_=T?.bead_id||f.dataTransfer?.getData("text/plain")||"",b=T?.from_lane||"";if(T=null,!_)return;let ce=f.target?.closest?.(".worker-mini, .worker-card"),le=Array.from($.querySelectorAll(".worker-mini, .worker-card")),Ue=le.length;if(ce){let $e=le.indexOf(ce);$e>=0&&(Ue=$e)}if(Ue=Math.max(0,Ue-$.querySelectorAll(".worker-mini--ghost").length),$.classList.contains("worker-pane--collapsed")&&(Ue=Q()),z==="candidate"){if(b==="candidate"){ft(_,ce);return}(b==="queue"||/^s[1-5]$/.test(b))&&qe(_);return}if(z==="queue"||/^s[1-5]$/.test(z)){let $e=z==="queue"?"parallel":z;b===z?re(_,$e,Ue):Ee(_,$e)}}function jt(f){H=f,bh(f),y()}function Ge(f){V=f==="board"||f==="created"||f==="spec"?f:Oo,$h(V),y()}function Ot(f){q=ar(f)?f:er,Ah(q),p?.(q),y()}function Fe(f){let $=f.target?.closest?.(".worker-serial-lane-count");if($){let Ue=Number.parseInt($.value,10);Number.isFinite(Ue)&&C(Ue).then(y);return}let z=f.target?.closest?.(".worker-filter__blocked");if(z){jt({...H,show_blocked:z.checked});return}let _=f.target?.closest?.(".worker-done-range");if(_){Ot(_.value);return}let b=f.target?.closest?.(".worker-sort");if(b){Ge(b.value||Oo);return}let ce=f.target?.closest?.(".worker-slots__input");if(!ce)return;let le=Number.parseInt(ce.value,10);if(!Number.isFinite(le)){y();return}w(le).then(y)}function S(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function ue(){let f=B();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Oe(){He&&st.close(),Ze.hidden=!1,ge.hidden=!1,Y.open(ue()),y()}function mt(f){let $=ot(),z=$.attempts?$.attempts[f]:null;He=f,pt=null,Y.close(),Ze.hidden=!0,ge.hidden=!1,st.open({attempt_id:f,meta:S(z)}),y()}function Dt(f,$){He=null,pt=f,Y.close(),Ze.hidden=!0,ge.hidden=!1,st.open({attempt_id:f,meta:$,hide_prompt:!0}),y()}function xt(){if(Y.isOpen()&&Y.refresh(ue()),pt){let z=(o?.get()?.runs||[]).find(_=>_.run_id===pt);z?st.updateMeta(oi(z)):st.close();return}if(!He)return;let f=ot(),$=f.attempts?f.attempts[He]:null;if($){st.updateMeta(S($));return}st.close()}function Nt(f){let $=f.target;if($?.closest?.(".worker-mini__serial, .worker-mini__grip")||$?.closest?.("#worker-parallel-analysis-dialog"))return;if($?.closest?.(".worker-analysis-btn")){je?.open();return}if($?.closest?.(".worker-repo-strip")||$?.closest?.(".worker-mini__timeline")){Oe();return}let z=$?.closest?.(".worker-repo-op__session");if(z){let We=z.dataset.attemptId;We&&mt(We);return}let _=$?.closest?.(".worker-repo-op__resolve");if(_){ne(_.dataset.operationId||"");return}let b=$?.closest?.(".worker-repo-op__dismiss");if(b){ve(b.dataset.operationId||"");return}let ce=$?.closest?.(".worker-cleanup__resume");if(ce){let We=ce.dataset.beadId;We&&ht(We);return}let le=$?.closest?.(".worker-banner__resume");if(le){let We=le.dataset.attemptId;We&&it(We);return}let Ue=$?.closest?.(".worker-banner__discard");if(Ue){let We=Ue.dataset.confirmation==="merged"?"merged":"unmerged";he(Ue.dataset.beadId||"",Ue.dataset.attemptId||null,We,Ue.dataset.operationId||null);return}let $e=$?.closest?.(".worker-banner__dismiss");if($e){let We=$e.dataset.attemptId;We&&Xe(We);return}if($?.closest?.(".worker-play")){F(!ot().auto_advance);return}let x=$?.closest?.(".worker-merge-all");if(x){x.classList.contains("worker-merge-all--stop")?ot().auto_merge===!0?kt(!1):te():kt(!0);return}let J=$?.closest?.(".worker-pane__hd--toggle");if(J){let We=J.dataset.lane;(We==="queue"||We==="done")&&v(We);return}let P=$?.closest?.(".worker-card__place-lane");if(P){let We=P.dataset.beadId,Lt=P.dataset.lane;We&&(Lt==="parallel"||/^s[1-5]$/.test(Lt||""))&&(se=null,y(),Ee(We,Lt));return}if($?.closest?.(".worker-card__place-cancel")){se=null,y();return}let ut=$?.closest?.(".worker-card__place");if(ut){let We=ut.dataset.beadId;We&&!ut.disabled&&(Je()?(se=We,y()):Ee(We,"parallel"));return}let lt=$?.closest?.(".worker-filter__chip");if(lt){let We=lt.dataset.spec;(We==="all"||We==="with"||We==="without")&&jt({...H,spec:We});return}let et=$?.closest?.(".worker-mini__merge");if(et){let We=et.dataset.beadId||"";ot().cleanup_failed?.[We]?ht(We):_t(We);return}let tt=$?.closest?.(".worker-mini__merge-cancel");if(tt){N(tt.dataset.beadId||"");return}let Pt=$?.closest?.(".worker-mini__discard");if(Pt){he(Pt.dataset.beadId||"",Pt.dataset.attemptId||null,Pt.dataset.discardMode==="merged"?"merged":"unmerged",Pt.dataset.operationId||null);return}let Jt=$?.closest?.(".worker-mini__stale-continue");if(Jt){ze("worker-stale-work-continue",Jt.dataset.beadId||"",Jt.dataset.actionId||"");return}let on=$?.closest?.(".worker-mini__stale-backup");if(on){ze("worker-stale-work-backup-fresh",on.dataset.beadId||"",on.dataset.actionId||"");return}let an=$?.closest?.(".worker-mini__stale-recheck");if(an){ze("worker-stale-work-recheck",an.dataset.beadId||"",an.dataset.actionId||"");return}let gs=$?.closest?.(".worker-mini__revise-fix");if(gs){De("worker-revise-fix",gs.dataset.beadId||"");return}let ln=$?.closest?.(".worker-mini__revise-approve");if(ln){De("worker-revise-approve",ln.dataset.beadId||"");return}if($?.closest?.(".worker-mini__pr"))return;if($?.closest?.(".rtile__discard")){let We=$?.closest?.(".rtile"),Lt=We?.dataset?.beadId,un=We?.dataset?.attemptId;Lt&&he(Lt,un||null,"unmerged",$?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if($?.closest?.(".rtile__dismiss")){let Lt=$?.closest?.(".rtile")?.dataset?.attemptId;Lt&&Xe(Lt);return}if($?.closest?.(".rtile__pause")){let Lt=$?.closest?.(".rtile")?.dataset?.attemptId;Lt&&rt(Lt);return}if($?.closest?.(".rtile__resume")){let Lt=$?.closest?.(".rtile")?.dataset?.attemptId;Lt&&it(Lt);return}if($?.closest?.(".rtile__session")){let Lt=$?.closest?.(".rtile")?.dataset?.attemptId;Lt&&mt(Lt);return}if($?.closest?.(".worker-drawer-overlay__backdrop")){Y.close(),st.close();return}if($?.closest?.(".worker-drawer-host"))return;let Br=$?.closest?.(".rtile .board-card__roll-toggle");if(Br){let We=Br.dataset.rollParent;We&&(_e.has(We)?_e.delete(We):_e.add(We),y());return}let Ur=$?.closest?.(".rtile .board-card__roll-child");if(Ur){let We=Ur.dataset.childId;We&&c&&c(We);return}let cn=$?.closest?.(".rtile");if(cn){if($?.closest?.(".rtile__id")){let Lt=cn.dataset.beadId;Lt&&tr(Lt).then(un=>{un?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let We=cn.dataset.beadId;We&&c&&c(We);return}let hs=$?.closest?.(".worker-mini, .worker-card");if(hs){let We=hs.dataset.beadId;if($?.closest?.(".worker-mini__id, .worker-card__id")){We&&tr(We).then(Lt=>{Lt?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}We&&c&&c(We)}}return e.addEventListener("pointerdown",be),e.addEventListener("dragstart",ye),e.addEventListener("dragover",Ne),e.addEventListener("dragleave",Me),e.addEventListener("drop",$t),e.addEventListener("click",Nt),e.addEventListener("change",Fe),L(),m&&oe.push(m.subscribe(()=>{for(let[f,$]of I)$==="failed"&&I.delete(f);y()})),s&&oe.push(s.subscribe(()=>{let f=u&&u()||"";f!==Se&&(Se=f,Z.close()),y(),xt()})),o&&typeof o.subscribe=="function"&&oe.push(o.subscribe(()=>{xt(),y()})),y(),{load(){g(),y()},refreshSessionDefaults:j,destroy(){for(let f of oe.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",be),e.removeEventListener("dragstart",ye),e.removeEventListener("dragover",Ne),e.removeEventListener("dragleave",Me),e.removeEventListener("drop",$t),e.removeEventListener("click",Nt),e.removeEventListener("change",Fe);try{st.destroy()}catch{}ge.hidden=!0;try{je?.destroy()}catch{}try{Z.destroy()}catch{}Ye(l``,e)}}}function ci(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Fd(e,t,r,n=async()=>{},s=async()=>{}){let o=Ct("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function d(R){let D=R.target.value,pe=t.getState().workspace?.current?.path||"";if(D&&D!==pe){o("switching workspace to %s",D),i=!0,O();try{await r(D)}catch(fe){o("workspace switch failed: %o",fe)}finally{i=!1,O()}}}async function p(){let R=t.getState(),A=R.workspace?.current?.path||R.workspace?.available?.[0]?.path||"";if(!(!A||c)){o("git-pulling workspace %s",A),c=!0,O();try{await n(A)}catch(D){o("workspace git pull failed: %o",D)}finally{c=!1,O()}}}function m(R){let A=R.target;A&&e.contains(A)||M()}function k(R){R.key==="Escape"&&M()}function T(){u||(u=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",k),O())}function M(){u&&(u=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",k),O())}function H(){u?M():T()}async function se(R){let A=R.target,D=A.value,G=A.checked;o("toggling visibility %s \u2192 %s",D,String(G));try{await s(D,G)}catch(pe){o("workspace visibility toggle failed: %o",pe)}}function V(R){return R?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${p}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function q(R,A){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${H}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${R.map(D=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${D.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${D.path}"
                        .checked=${!A.has(D.path)}
                        @change=${se}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ci(D.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let R=t.getState(),A=R.workspace?.current,D=R.workspace?.available||[],G=new Set(R.workspace?.hidden||[]),pe=A?.path||D[0]?.path||"";if(D.length===0)return l``;let fe=D.filter(_e=>!G.has(_e.path)||_e.path===pe);if(fe.length<=1){let _e=fe[0]||D[0],ae=ci(_e.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${_e.path}"
            >${ae}</span
          >
          ${q(D,G)}
          ${V(pe)}
          ${c?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${fe.map(_e=>l`
              <option
                value="${_e.path}"
                ?selected=${_e.path===pe}
                title="${_e.path}"
              >
                ${ci(_e.path)}
              </option>
            `)}
        </select>
        ${q(D,G)}
        ${V(pe)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){Ye(I(),e)}return O(),a=t.subscribe(()=>O()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",k),Ye(l``,e)}}}var jd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function ui(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Bd(e,t,r=ui()){return{id:r,type:e,payload:t}}function Ud(e={}){let t=Ct("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,d=[],p=new Map,m=new Set;function k(I){for(let O of Array.from(m))try{O(I)}catch{}}function T(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),k(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),O=(r.jitterRatio||0)*I,R=Math.max(0,Math.round(I+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",R,a+1),i=setTimeout(()=>{i=null,q()},R)}function M(I){try{s?.send(JSON.stringify(I))}catch(O){t("ws send failed",O)}}function H(){for(o="open",t("ws open"),k(o),a=0;d.length;){let I=d.shift();I&&M(I)}}function se(I){let O;try{O=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let A=u.get(O.id);u.delete(O.id),O.ok?A?.resolve(O.payload):A?.reject(O.error||new Error("ws error"));return}let R=p.get(O.type);if(R&&R.size>0)for(let A of Array.from(R))try{A(O.payload)}catch(D){t("ws event handler error",D)}else t("ws received unhandled message type: %s",O.type)}function V(){o="closed",t("ws closed"),k(o);for(let[I,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(I);a+=1,T()}function q(){if(!c)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",k(o),s.addEventListener("open",H),s.addEventListener("message",se),s.addEventListener("error",()=>{}),s.addEventListener("close",V)}catch(O){t("ws connect failed %o",O),T()}}return q(),{send(I,O){if(!jd.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let R=ui(),A=Bd(I,O,R);return t("send %s id=%s",I,R),new Promise((D,G)=>{u.set(R,{resolve:D,reject:G,type:I}),s&&s.readyState===s.OPEN?M(A):(t("queue %s id=%s (state=%s)",I,R,o),d.push(A))})},on(I,O){p.has(I)||p.set(I,new Set);let R=p.get(I);return R?.add(O),()=>{R?.delete(O)}},onConnection(I){return m.add(I),()=>{m.delete(I)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,q()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Fh(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function jh(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var di=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Wd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Fr="tab:worker:closed",Bh="bdui.worker.done-range",zd=Vu,Hd="worker:queue",Gd="worker:parallel-analysis",Vd="ui:order",Kd="ui:display-policy",Yd="exec:presets",jr="tab:board:closed",Zd="beads-ui.board.closed-range";function Uh(e){let t=Ct("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ye(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&fd(a),i&&c&&u&&d){let j=function(_,b){let ce="Request failed",le="";if(_&&typeof _=="object"){let $e=_;if(typeof $e.message=="string"&&$e.message.length>0&&(ce=$e.message),typeof $e.details=="string")le=$e.details;else if($e.details&&typeof $e.details=="object")try{le=JSON.stringify($e.details,null,2)}catch{le=""}}else typeof _=="string"&&_.length>0&&(ce=_);let Ue=b&&b.length>0?`Failed to load ${b}`:"Request failed";g.open(Ue,ce,le)},E=function(_){return`${Ge.getState().workspace.current?.path||""}\0${_}`},Q=function(){Z&&(Z().catch(()=>{}),Z=null),Se=null,Qe=null},re=function(_){je=_;let b=()=>{je!==_||Ge.getState().selected_id!==_||(je=null,Ee(_))};if(!yt){Je.then(b);return}b()},Xe=function(_,b,ce,le,Ue){return ce!==it[b]?(Ue().catch(()=>{}),!1):(_.set(le,Ue),!0)},_t=function(){let _=Ge.getState();te(_.view==="board"),ve(_.view==="worker"),Ce(_.view==="monitor"),C(_.view==="board"||_.view==="worker"||nt||!!_.selected_id)},kt=function(){let _=Kr(ht);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},N=function(){let _=Kr(at);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},te=function(_){if(_)for(let[b,ce]of di){if(qe.has(b)||rt.has(b))continue;let le=b===jr?kt():{type:ce};try{we.register(b,le)}catch(x){t("register %s store failed: %o",b,x)}rt.add(b);let Ue=it.board,$e=!1;ge.subscribeList(b,le).then(x=>{$e=!Xe(qe,"board",Ue,b,x)}).catch(x=>{t("subscribe %s failed: %o",b,x),j(x,"board")}).finally(()=>{rt.delete(b),$e&&_t()})}else De()},De=function(){it.board+=1;for(let[_]of di){let b=qe.get(_);b&&(b().catch(()=>{}),qe.delete(_));try{we.unregister(_)}catch(ce){t("unregister %s failed: %o",_,ce)}}},ve=function(_){if(!_){w();return}for(let[b,ce]of Wd){if(F.has(b)||rt.has(b))continue;let le=b===Fr?N():{type:ce};try{we.register(b,le)}catch(x){t("register %s store failed: %o",b,x)}rt.add(b);let Ue=it.worker,$e=!1;ge.subscribeList(b,le).then(x=>{$e=!Xe(F,"worker",Ue,b,x)}).catch(x=>{t("subscribe %s failed: %o",b,x),j(x,"worker")}).finally(()=>{rt.delete(b),$e&&_t()})}},w=function(){it.worker+=1;for(let[_]of Wd){let b=F.get(_);b&&(b().catch(()=>{}),F.delete(_));try{we.unregister(_)}catch(ce){t("unregister %s failed: %o",_,ce)}}},C=function(_){if(!_){B();return}ne||(K("subscribe-worker-queue",{id:Hd}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),K("subscribe-worker-parallel-analysis",{id:Gd}).catch(b=>{t("subscribe-worker-parallel-analysis failed: %o",b)}),ne=()=>(K("unsubscribe-worker-parallel-analysis",{id:Gd}),K("unsubscribe-worker-queue",{id:Hd})))},B=function(){ne&&(ne().catch(()=>{}),ne=null),Ze.clear()},Ce=function(_){if(!_){Ae();return}ie||(K("subscribe-monitor-pipeline",{id:zd}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),ie=()=>K("unsubscribe-monitor-pipeline",{id:zd}))},Ae=function(){ie&&(ie().catch(()=>{}),ie=null)},Be=function(){Pe||(K("subscribe-ui-order",{id:Vd}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Pe=()=>K("unsubscribe-ui-order",{id:Vd}))},St=function(){Pe&&(Pe().catch(()=>{}),Pe=null),He.clear()},Ke=function(){bt||(K("subscribe-display-policy",{id:Kd}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),bt=()=>K("unsubscribe-display-policy",{id:Kd}))},Ft=function(){bt&&(bt().catch(()=>{}),bt=null),pt.clear()},y=function(){v||(K("subscribe-impl-presets",{id:Yd}).catch(_=>{t("subscribe-impl-presets failed: %o",_)}),v=()=>K("unsubscribe-impl-presets",{id:Yd}))},Me=function(_){if(!_)return"Unknown";let b=_.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var p=j,m=E,k=Q,T=re,M=Xe,H=_t,se=kt,V=N,q=te,I=De,O=ve,R=w,A=C,D=B,G=Ce,pe=Ae,fe=Be,_e=St,ae=Ke,Le=Ft,Te=y,ee=Me;let oe=document.getElementById("header-loading"),xe=kl(oe),g=lu(e),U=Ud(),K=xe.wrapSend((_,b)=>U.send(_,b)),ge=_l(K),we=ml(),ke=bl(),Ze=hl(),wt=Ji(),He=gl(),pt=Qi(),st=Xi(),Y=el();U.on("impl-presets-snapshot",_=>{let b=_;b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&st.set({revision:b.revision,presets:b.presets})}),U.on("monitor-pipeline-snapshot",_=>{let b=_;if(!(!b||!Array.isArray(b.workspaces)))try{wt.set(b.workspaces,b.workspaces_state)}catch{}}),U.on("ui-order-snapshot",_=>{let b=_;if(b&&typeof b.revision=="number")try{He.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),U.on("display-policy-snapshot",_=>{let b=_;if(b&&b.policy&&typeof b.policy=="object")try{pt.set(b.policy)}catch{}}),U.on("session-log-snapshot",_=>{let b=_;if(b&&typeof b.id=="string")try{Y.set(b.id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),U.on("session-log-append",_=>{let b=_;if(b&&typeof b.id=="string")try{Y.append(b.id,b.event)}catch{}}),U.on("snapshot",_=>{let b=_,ce=b&&typeof b.id=="string"?b.id:"",le=ce?we.getStore(ce):null;if(le&&b&&b.type==="snapshot")try{le.applyPush(b)}catch{}}),U.on("upsert",_=>{let b=_,ce=b&&typeof b.id=="string"?b.id:"",le=ce?we.getStore(ce):null;if(le&&b&&b.type==="upsert")try{le.applyPush(b)}catch{}}),U.on("delete",_=>{let b=_,ce=b&&typeof b.id=="string"?b.id:"",le=ce?we.getStore(ce):null;if(le&&b&&b.type==="delete")try{le.applyPush(b)}catch{}});let Z=null,Se=null,Qe=null,je=null,ot=()=>{},Je=new Promise(_=>{ot=()=>_(void 0)}),yt=!1,Ie=!1;async function Ee(_){let b=E(_);if(b===Se||b===Qe)return;Qe=b;let ce=`detail:${_}`,le={type:"issue-detail",params:{id:_}};try{we.register(ce,le)}catch(Ue){t("register detail store failed: %o",Ue)}try{let Ue=await ge.subscribeList(ce,le);if(Ge.getState().selected_id!==_||E(_)!==b){await Ue().catch(()=>{});return}Z&&await Z().catch(()=>{}),Z=Ue,Se=b}catch(Ue){t("detail subscribe failed: %o",Ue),j(Ue,"issue details")}finally{Qe===b&&(Qe=null)}}let qe=new Map,rt=new Set,it={board:0,worker:0},nt=!1,ht=er;try{let _=window.localStorage.getItem(Zd);ar(_)&&(ht=_)}catch{}let at=er;try{let _=window.localStorage.getItem(Bh);ar(_)&&(at=_)}catch{}async function he(_){if(!ar(_)||_===ht)return;ht=_;try{window.localStorage.setItem(Zd,_)}catch{}let b=qe.get(jr);if(!b)return;qe.delete(jr),await b().catch(()=>{});let ce=kt();try{we.register(jr,ce)}catch(le){t("register %s store failed: %o",jr,le)}try{let le=await ge.subscribeList(jr,ce);qe.set(jr,le)}catch(le){t("re-subscribe %s failed: %o",jr,le),j(le,"board")}}async function ze(_){if(!ar(_)||_===at)return;at=_;let b=F.get(Fr);if(!b)return;F.delete(Fr),await b().catch(()=>{});let ce=N();try{we.register(Fr,ce)}catch(le){t("register %s store failed: %o",Fr,le)}try{let le=await ge.subscribeList(Fr,ce);F.set(Fr,le)}catch(le){t("re-subscribe %s failed: %o",Fr,le),j(le,"worker")}}let F=new Map,ne=null,ie=null,Pe=null,bt=null,v=null;async function L(){bt=null,pt.clear(),v=null,st.clear(),ne=null,ie=null,qe.clear(),F.clear(),it.board+=1,it.worker+=1,y();let _=Ge.getState().workspace.current?.path;if(_)try{await U.send("set-workspace",{path:_})}catch(ce){t("workspace restore after reconnect failed: %o",ce);return}Ke();let b=Ge.getState();te(b.view==="board"),ve(b.view==="worker"),Ce(b.view==="monitor"),C(b.view==="board"||b.view==="worker"||!!b.selected_id)}async function X(){t("clearing all subscriptions for workspace switch"),De(),w(),B(),ke.clear(),St(),Be(),Ft(),Ke(),Q();let _=Ge.getState();if(_.selected_id)try{we.unregister(`detail:${_.selected_id}`)}catch{}let b=Ge.getState();te(b.view==="board"),ve(b.view==="worker"),Ce(b.view==="monitor"),C(b.view==="board"||b.view==="worker"||!!b.selected_id),b.selected_id&&re(b.selected_id)}async function be(_){t("requesting workspace switch to %s",_),Ie=!0;try{let b=await U.send("set-workspace",{path:_});t("workspace switch result: %o",b),b&&b.workspace&&(Ge.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),b.changed&&(await X(),me("Switched to "+Me(_),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),me("Failed to switch workspace","error",3e3),b}finally{Ie=!1}}async function ye(_){t("requesting workspace git pull for %s",_);try{let b=await U.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let ce=b?.status;if(ce==="up_to_date"){me("Already up to date","success",2e3);return}if(ce==="stash_pop_conflict"){me("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}me("Git pulled "+Me(_),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let ce=b?.code,le=b?.message;if(ce==="rebase_conflict"){me("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ce==="rebase_conflict_abort_failed"){me("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ce==="busy"){me("Git pull skipped: another operation is running","warning",3e3);return}let Ue=le?`: ${le}`:"";throw me(`Git pull failed${Ue}`,"error",3e3),b}}async function Ne(_,b){t("setting workspace visibility %s \u2192 %s",_,String(b));try{await U.send("set-workspace-visibility",{path:_,visible:b}),await ft()}catch(ce){t("workspace visibility update failed: %o",ce),me("Failed to update project visibility","error",3e3)}}async function ft(){try{let _=await U.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let b=_.workspaces.map($e=>({path:$e.path,database:$e.database,pid:$e.pid,version:$e.version})),ce=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,le=Array.isArray(_.hidden)?_.hidden.filter($e=>typeof $e=="string"):[];Ge.setState({workspace:{current:ce,available:b,hidden:le}});let Ue=window.localStorage.getItem("beads-ui.workspace");Ue&&(!b.some(x=>x.path===Ue)||le.includes(Ue)?window.localStorage.removeItem("beads-ui.workspace"):ce&&Ue!==ce.path&&(t("restoring saved workspace preference: %s",Ue),await be(Ue)))}}catch(_){t("failed to load workspaces: %o",_)}}U.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(Ge.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),ft(),X())});let $t=!1;if(typeof U.onConnection=="function"){let _=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?($t=!0,me("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&$t&&($t=!1,me("Reconnected","success",2200),jh(Ge,(ce,le)=>{t(`${ce}: %o`,le)}),L())};U.onConnection(_)}let jt="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(jt=_)}catch(_){t("view parse error: %o",_)}let Ge=wl({config:Fh(),view:jt});U.on("worker-queue-snapshot",_=>{let b=_;if(!b||!b.queue)return;let ce=Ge.getState().workspace.current?.path;if(typeof ce=="string"&&ce.length>0&&b.root_dir!==ce){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{ke.set(b.queue)}catch{}}),U.on("worker-parallel-analysis-snapshot",_=>{let b=_;if(!b)return;let ce=Ge.getState().workspace.current?.path;if(!(typeof ce=="string"&&ce.length>0&&typeof b.root_dir=="string"&&b.root_dir!==ce))try{Ze.set({settings:b.settings,job:b.job??null,runs:Array.isArray(b.runs)?b.runs:[],last_good:b.last_good??null})}catch{}});let Ot=yl(Ge);Ot.start();let Fe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),S=async(_,b)=>{try{return await K(_,b)}catch(ce){if(Fe.has(_))throw ce;return[]}};Yu({global_element:n,repo_element:s},Ge,Ot);let ue=document.getElementById("workspace-picker");ue&&Fd(ue,Ge,be,ye,Ne);let Oe=Ju(e,(_,b)=>K(_,b));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>Oe.open())}catch{}let mt=nd(e,{policyStore:pt,queueStore:ke,implPresetStore:st,transport:(_,b)=>K(_,b),onOpenChange:_=>{let b=nt;nt=_,_t(),b&&_===!1&&xt.refreshSessionDefaults()},labelOptions:()=>{let _=new Set;for(let[b]of di)for(let ce of we.snapshotFor(b)||[]){let le=ce.labels;if(Array.isArray(le))for(let Ue of le)typeof Ue=="string"&&Ue.length>0&&_.add(Ue)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&(_.setAttribute("aria-label","\uC124\uC815"),_.setAttribute("title","\uC124\uC815"),_.addEventListener("click",()=>mt.open()))}catch{}let Dt=Ml(i,{gotoIssue:_=>Ot.gotoIssue(_),issueStores:we,transport:S,workerQueueStore:ke,uiOrderStore:He,displayPolicyStore:pt,closedRange:ht,onClosedRangeChange:_=>{he(_)},onNewIssue:()=>Oe.open()}),xt=li(c,{transport:S,issueStores:we,queueStore:ke,analysisStore:Ze,sessionLogStore:Y,uiOrderStore:He,gotoIssue:_=>Ge.setState({selected_id:_}),getWorkspacePath:()=>Ge.getState().workspace.current?.path,doneRange:at,onDoneRangeChange:_=>{ze(_)}}),Nt=Ku(u,{transport:S,pipelineStore:wt,execPresetStore:st,sessionLogStore:Y,router:Ot,gotoIssue:_=>Ot.gotoIssue(_),getWorkspacePath:()=>Ge.getState().workspace.current?.path,switchWorkspace:_=>be(_)}),f=iu(d,{issueStores:we,transport:S,queueStore:ke,execPresetStore:st,sessionLogStore:Y,getWorkspacePath:()=>Ge.getState().workspace.current?.path,onNavigate:_=>{Ge.getState().view==="worker"?Ge.setState({selected_id:_}):Ot.gotoIssue(_)},onClose:()=>{let _=Ge.getState();Ge.setState({selected_id:null});try{Ot.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{mt.open("execution")}}),$=Ge.getState().selected_id;$&&(d.hidden=!1,f.load($),re($)),Ge.subscribe(_=>{let b=_.selected_id;b?(d.hidden=!1,f.load(b),Ie||re(b)):(f.clear(),d.hidden=!0,Q())});let z=_=>{i.hidden=_.view!=="board",c.hidden=_.view!=="worker",u.hidden=_.view!=="monitor",o&&o.classList.toggle("is-quiet",_.view==="monitor"),te(_.view==="board"),ve(_.view==="worker"),Ce(_.view==="monitor"),C(_.view==="board"||_.view==="worker"||nt||!!_.selected_id),!_.selected_id&&_.view==="board"&&Dt.load(),_.view==="worker"&&xt.load(),_.view==="monitor"?Nt.load():Nt.pause(),window.localStorage.setItem("beads-ui.view",_.view)};Ge.subscribe(z),z(Ge.getState()),Be(),Ke(),y(),ft().finally(()=>{yt=!0,ot()}),window.addEventListener("keydown",_=>{let b=_.ctrlKey||_.metaKey,ce=String(_.key||"").toLowerCase(),le=_.target,Ue=le&&le.tagName?String(le.tagName).toLowerCase():"",$e=Ue==="input"||Ue==="textarea"||Ue==="select"||le&&typeof le.isContentEditable=="boolean"&&le.isContentEditable;b&&ce==="n"&&($e||(_.preventDefault(),Oe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Uh(t)});export{Uh as bootstrap,Fh as readBootstrapConfig,jh as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
