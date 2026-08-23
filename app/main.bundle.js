var yp=Object.create;var Wo=Object.defineProperty;var vp=Object.getOwnPropertyDescriptor;var wp=Object.getOwnPropertyNames;var kp=Object.getPrototypeOf,$p=Object.prototype.hasOwnProperty;var xp=(e,t,r)=>t in e?Wo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var zo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ap=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of wp(t))!$p.call(e,s)&&s!==r&&Wo(e,s,{get:()=>t[s],enumerable:!(n=vp(t,s))||n.enumerable});return e};var Sp=(e,t,r)=>(r=e!=null?yp(kp(e)):{},Ap(t||!e||!e.__esModule?Wo(r,"default",{value:e,enumerable:!0}):r,e));var xt=(e,t,r)=>xp(e,typeof t!="symbol"?t+"":t,r);var rl=zo((tb,tl)=>{var gn=1e3,hn=gn*60,bn=hn*60,Zr=bn*24,Cp=Zr*7,Rp=Zr*365.25;tl.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Lp(e);if(r==="number"&&isFinite(e))return t.long?Op(e):Ip(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Lp(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Rp;case"weeks":case"week":case"w":return r*Cp;case"days":case"day":case"d":return r*Zr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*bn;case"minutes":case"minute":case"mins":case"min":case"m":return r*hn;case"seconds":case"second":case"secs":case"sec":case"s":return r*gn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ip(e){var t=Math.abs(e);return t>=Zr?Math.round(e/Zr)+"d":t>=bn?Math.round(e/bn)+"h":t>=hn?Math.round(e/hn)+"m":t>=gn?Math.round(e/gn)+"s":e+"ms"}function Op(e){var t=Math.abs(e);return t>=Zr?Os(e,t,Zr,"day"):t>=bn?Os(e,t,bn,"hour"):t>=hn?Os(e,t,hn,"minute"):t>=gn?Os(e,t,gn,"second"):e+" ms"}function Os(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var sl=zo((rb,nl)=>{function Pp(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=rl(),r.destroy=u,Object.keys(e).forEach(d=>{r[d]=e[d]}),r.names=[],r.skips=[],r.formatters={};function t(d){let p=0;for(let m=0;m<d.length;m++)p=(p<<5)-p+d.charCodeAt(m),p|=0;return r.colors[Math.abs(p)%r.colors.length]}r.selectColor=t;function r(d){let p,m=null,v,C;function F(...H){if(!F.enabled)return;let re=F,V=Number(new Date),q=V-(p||V);re.diff=q,re.prev=p,re.curr=V,p=V,H[0]=r.coerce(H[0]),typeof H[0]!="string"&&H.unshift("%O");let O=0;H[0]=H[0].replace(/%([a-zA-Z%])/g,(L,$)=>{if(L==="%%")return"%";O++;let D=r.formatters[$];if(typeof D=="function"){let K=H[O];L=D.call(re,K),H.splice(O,1),O--}return L}),r.formatArgs.call(re,H),(re.log||r.log).apply(re,H)}return F.namespace=d,F.useColors=r.useColors(),F.color=r.selectColor(d),F.extend=n,F.destroy=r.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(v!==r.namespaces&&(v=r.namespaces,C=r.enabled(d)),C),set:H=>{m=H}}),typeof r.init=="function"&&r.init(F),F}function n(d,p){let m=r(this.namespace+(typeof p>"u"?":":p)+d);return m.log=this.log,m}function s(d){r.save(d),r.namespaces=d,r.names=[],r.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of p)m[0]==="-"?r.skips.push(m.slice(1)):r.names.push(m)}function o(d,p){let m=0,v=0,C=-1,F=0;for(;m<d.length;)if(v<p.length&&(p[v]===d[m]||p[v]==="*"))p[v]==="*"?(C=v,F=m,v++):(m++,v++);else if(C!==-1)v=C+1,F++,m=F;else return!1;for(;v<p.length&&p[v]==="*";)v++;return v===p.length}function a(){let d=[...r.names,...r.skips.map(p=>"-"+p)].join(",");return r.enable(""),d}function l(d){for(let p of r.skips)if(o(d,p))return!1;for(let p of r.names)if(o(d,p))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}nl.exports=Pp});var ol=zo((Zt,Ps)=>{Zt.formatArgs=Mp;Zt.save=Np;Zt.load=qp;Zt.useColors=Dp;Zt.storage=Fp();Zt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Zt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Dp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Mp(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ps.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Zt.log=console.debug||console.log||(()=>{});function Np(e){try{e?Zt.storage.setItem("debug",e):Zt.storage.removeItem("debug")}catch{}}function qp(){let e;try{e=Zt.storage.getItem("debug")||Zt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Fp(){try{return localStorage}catch{}}Ps.exports=sl()(Zt);var{formatters:jp}=Ps.exports;jp.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Nn=globalThis,Es=Nn.trustedTypes,ji=Es?Es.createPolicy("lit-html",{createHTML:e=>e}):void 0,Go="$lit$",vr=`lit$${Math.random().toFixed(9).slice(2)}$`,Ko="?"+vr,Ep=`<${Ko}>`,Gr=document,qn=()=>Gr.createComment(""),Fn=e=>e===null||typeof e!="object"&&typeof e!="function",Vo=Array.isArray,Gi=e=>Vo(e)||typeof e?.[Symbol.iterator]=="function",Ho=`[ 	
\f\r]`,Mn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bi=/-->/g,Ui=/>/g,zr=RegExp(`>|${Ho}(?:([^\\s"'>=/]+)(${Ho}*=${Ho}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wi=/'/g,zi=/"/g,Ki=/^(?:script|style|textarea|title)$/i,Yo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Yo(1),mn=Yo(2),Vh=Yo(3),or=Symbol.for("lit-noChange"),Pt=Symbol.for("lit-nothing"),Hi=new WeakMap,Hr=Gr.createTreeWalker(Gr,129);function Vi(e,t){if(!Vo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ji!==void 0?ji.createHTML(t):t}var Yi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Mn;for(let l=0;l<r;l++){let c=e[l],u,d,p=-1,m=0;for(;m<c.length&&(a.lastIndex=m,d=a.exec(c),d!==null);)m=a.lastIndex,a===Mn?d[1]==="!--"?a=Bi:d[1]!==void 0?a=Ui:d[2]!==void 0?(Ki.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=zr):d[3]!==void 0&&(a=zr):a===zr?d[0]===">"?(a=s??Mn,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?zr:d[3]==='"'?zi:Wi):a===zi||a===Wi?a=zr:a===Bi||a===Ui?a=Mn:(a=zr,s=void 0);let v=a===zr&&e[l+1].startsWith("/>")?" ":"";o+=a===Mn?c+Ep:p>=0?(n.push(u),c.slice(0,p)+Go+c.slice(p)+vr+v):c+vr+(p===-2?l:v)}return[Vi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},jn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,d]=Yi(t,r);if(this.el=e.createElement(u,n),Hr.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=Hr.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Go)){let m=d[a++],v=s.getAttribute(p).split(vr),C=/([.?@])?(.*)/.exec(m);c.push({type:1,index:o,name:C[2],strings:v,ctor:C[1]==="."?Cs:C[1]==="?"?Rs:C[1]==="@"?Ls:Vr}),s.removeAttribute(p)}else p.startsWith(vr)&&(c.push({type:6,index:o}),s.removeAttribute(p));if(Ki.test(s.tagName)){let p=s.textContent.split(vr),m=p.length-1;if(m>0){s.textContent=Es?Es.emptyScript:"";for(let v=0;v<m;v++)s.append(p[v],qn()),Hr.nextNode(),c.push({type:2,index:++o});s.append(p[m],qn())}}}else if(s.nodeType===8)if(s.data===Ko)c.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(vr,p+1))!==-1;)c.push({type:7,index:o}),p+=vr.length-1}o++}}static createElement(t,r){let n=Gr.createElement("template");return n.innerHTML=t,n}};function Kr(e,t,r=e,n){if(t===or)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Fn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Kr(e,s._$AS(e,t.values),s,n)),t}var Ts=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Gr).importNode(r,!0);Hr.currentNode=s;let o=Hr.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new _n(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Is(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=Hr.nextNode(),a++)}return Hr.currentNode=Gr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},_n=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Pt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Kr(this,t,r),Fn(t)?t===Pt||t==null||t===""?(this._$AH!==Pt&&this._$AR(),this._$AH=Pt):t!==this._$AH&&t!==or&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Gi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Pt&&Fn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Gr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=jn.createElement(Vi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ts(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Hi.get(t.strings);return r===void 0&&Hi.set(t.strings,r=new jn(t)),r}k(t){Vo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(qn()),this.O(qn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Vr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Pt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Pt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Kr(this,t,r,0),a=!Fn(t)||t!==this._$AH&&t!==or,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Kr(this,l[n+c],r,c),u===or&&(u=this._$AH[c]),a||(a=!Fn(u)||u!==this._$AH[c]),u===Pt?t=Pt:t!==Pt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Pt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Cs=class extends Vr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Pt?void 0:t}},Rs=class extends Vr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Pt)}},Ls=class extends Vr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Kr(this,t,r,0)??Pt)===or)return;let n=this._$AH,s=t===Pt&&n!==Pt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Pt&&(n===Pt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Is=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Kr(this,t)}},Zi={M:Go,P:vr,A:Ko,C:1,L:Yi,R:Ts,D:Gi,V:Kr,I:_n,H:Vr,N:Rs,U:Ls,B:Cs,F:Is},Tp=Nn.litHtmlPolyfillSupport;Tp?.(jn,_n),(Nn.litHtmlVersions??(Nn.litHtmlVersions=[])).push("3.3.1");var Ve=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new _n(t.insertBefore(qn(),o),o,void 0,r??{})}return s._$AI(e),s};var er="today",Rr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function ar(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Yr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Qi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Xi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ji(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function el(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),l=e.get(a)||{lines:[],last_event_at:null};l.lines=[...l.lines,o],l.last_event_at=Date.now(),e.set(a,l),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var al=Sp(ol(),1);function Ct(e){return(0,al.default)(`beads-ui:${e}`)}function pr(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Qr(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function cl(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ul(e,t){let r=pr(e.updated_at),n=pr(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function dl(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=pr(e.created_at),o=pr(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function pl(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Bp=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function il(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ll(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Bp.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function fl(e,t){let r=il(e),n=il(t);if(r!==n)return r<n?-1:1;let s=ll(e),o=ll(t);if(s!==o)return s<o?-1:1;let a=pr(e&&e.created_at),l=pr(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Zo=2**20;function yn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-pr(e&&e.created_at)}function Ds(e){return(t,r)=>{let n=yn(t,e),s=yn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Qo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:yn(l,r)-Zo};if(!l)return{rank:yn(a,r)+Zo};let c=yn(a,r),u=yn(l,r),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:n.map((p,m)=>({bead_id:p.id,rank:m*Zo}))}}function Xo(e,t={}){let r=Ct(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Qr;function u(){for(let m of Array.from(a))try{m()}catch{}}function d(){s=Array.from(n.values()).sort(c)}function p(m){if(l||!m||m.id!==e)return;let v=Number(m.revision)||0;if(r("apply %s rev=%d",m.type,v),!(v<=o&&m.type!=="snapshot")){if(m.type==="snapshot"){if(v<=o)return;n.clear();let C=Array.isArray(m.issues)?m.issues:[];for(let F of C)F&&typeof F.id=="string"&&F.id.length>0&&n.set(F.id,F);d(),o=v,u();return}if(m.type==="upsert"){let C=m.issue;if(C&&typeof C.id=="string"&&C.id.length>0){let F=n.get(C.id);if(!F)n.set(C.id,C);else{let H=Number.isFinite(F.updated_at)?F.updated_at:0,re=Number.isFinite(C.updated_at)?C.updated_at:0;if(H<=re){for(let V of Object.keys(F))V in C||delete F[V];for(let[V,q]of Object.entries(C))F[V]=q}}d()}o=v,u()}else if(m.type==="delete"){let C=String(m.issue_id||"");C&&(n.delete(C),d()),o=v,u()}}}return{id:e,subscribe(m){return a.add(m),()=>{a.delete(m)}},applyPush:p,snapshot(){return s},size(){return n.size},getById(m){return n.get(m)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Ms(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function _l(e){let t=Ct("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],p=Array.isArray(c.updated)?c.updated:[],m=Array.isArray(c.removed)?c.removed:[];for(let v of Array.from(u)){let C=r.get(v);if(!C)continue;let F=C.itemsById;for(let H of d)typeof H=="string"&&H.length>0&&F.set(H,!0);for(let H of p)typeof H=="string"&&H.length>0&&F.set(H,!0);for(let H of m)typeof H=="string"&&H.length>0&&F.delete(H)}}async function o(l,c){let u=Ms(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let p=r.get(l);if(p&&p.key!==u){let m=n.get(p.key);m&&(m.delete(l),m.size===0&&n.delete(p.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let d=n.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(p){let m=r.get(l)||null;if(m){let v=n.get(m.key);v&&(v.delete(l),v.size===0&&n.delete(m.key))}throw r.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=r.get(l)||null;if(p){let m=n.get(p.key);m&&(m.delete(l),m.size===0&&n.delete(p.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ms,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function ml(){let e=Ct("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,d){let p=u?Ms(u):"",m=r.get(c)||"",v=t.has(c);if(e("register %s key=%s (prev=%s)",c,p,m),v&&m&&p&&m!==p){let C=t.get(c);if(C)try{C.dispose()}catch{}let F=s.get(c);if(F){try{F()}catch{}s.delete(c)}let H=Xo(c,d);t.set(c,H);let re=H.subscribe(()=>o());s.set(c,re)}else if(!v){let C=Xo(c,d);t.set(c,C);let F=C.subscribe(()=>o());s.set(c,F)}return r.set(c,p),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function gl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function hl(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function bl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Jo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Up(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Wp(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function yl(e){let t=Ct("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Up(n),a=Wp(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Jo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Jo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var zp=Object.freeze({workspace_config:{default_workspace:null}});function vl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:zp.workspace_config.default_workspace}}}function wl(e={}){let t=Ct("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:vl(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?vl(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==r.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===r.worker.show_closed_children[d])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function kl(e){let t=Ct("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(p,m)=>{let v=s++,C=Date.now();n.set(v,{type:p,start_ts:C}),t("request start id=%d type=%s count=%d",v,p,r+1),a();let F=!1,H=()=>{F||(F=!0,n.delete(v),l())},re=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",v,p,Date.now()-C),H())},3e4);try{let V=await u(p,m),q=Date.now()-C;return t("request done id=%d type=%s elapsed=%dms",v,p,q),V}catch(V){let q=Date.now()-C;throw t("request error id=%d type=%s elapsed=%dms err=%o",v,p,q,V),V}finally{clearTimeout(re),H()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function he(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Ns(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(pl),c;switch(l){case"created_desc":return c.sort(Qr),c;case"created_asc":return c.sort(cl),c;case"updated_desc":return c.sort(ul),c;case"priority":return c.sort(dl),c;case"manual":default:{let u=r();return u?c.sort(Ds(u)):c.sort(Qr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Xr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ht(e){let t=Xr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function ir(e,t){let r=Xr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function $l(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Xr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function qs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Fs(e){let t=new Map;for(let n of e)n&&n.id&&!t.has(n.id)&&t.set(n.id,n);let r=new Map;for(let n of t.values()){let s=qs(n);if(!s)continue;let o=r.get(s);o||(o=[],r.set(s,o)),o.push({id:n.id,title:n.title,status:n.status,metadata:n.metadata,workflow:n.workflow,created_at:n.created_at,updated_at:n.updated_at})}return r}function js(e,t){let r=e.get(t)||[],n=0;for(let o of r)(o.status==="resolved"||o.status==="closed")&&(n+=1);let s=$l(r);return{total:r.length,count:n,current:s,children:r}}function Bs(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},d=n(Qo(l,c,u.order),a);s(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let m={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};r.set(m);let v=n(Qo(l,c,m.order),a);s(m,v);let C=await t("ui-order-set",{expected_revision:m.revision,entries:v});C&&C.applied&&r.set({revision:typeof C.revision=="number"?C.revision:0,order:C.order||{}})}else p&&p.applied&&r.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:o}}function Us(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ea(e,t){return!t||typeof e!="string"||e.length===0||Us(t.visible_labels).includes(e)?!0:Us(t.hidden_labels).includes(e)?!1:!Us(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function xl(e,t){return Us(e).filter(r=>ea(r,t))}function Lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}function Hp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Gp(e,t,r,n,s){return i`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${n?"true":"false"}
    @click=${s}
  >
    children ${t}/${r} ${n?"\u25B4":"\u25BE"}
  </button>`}function Kp(e,t,r,n){return i`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${n?s=>n(s,e.id):void 0}
  >
    <span class=${Hp(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${r}
  </button>`}function Ws(e,t){let r=e.total||0,n=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(r===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],l=r>0?a.slice().sort(fl):a;return i`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?Gp(t.parent_id,e.count,r,n,t.onToggle):i`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${r>0&&e.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${n&&r>0?i`<div class="board-card__roll-list">
            ${l.map((c,u)=>Kp(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Vp={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Sl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Al={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Yp={review:"\u2713",skip:"\u2298"},Ir={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Zp(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function El(e){let t=e&&e.fill||"none";return t==="none"?Ir.none:e&&e.stale===!0?Ir.stale:t==="dim"?Ir.dim:e&&e.glyph==="review"?Ir.review:e&&e.glyph==="skip"?Ir.skip:Ir.done}function Qp(e){if(!e||e.fill==="none"||!e.approval_state)return El(e);let t=[];return e.glyph==="review"?t.push(Ir.review):e.glyph==="skip"&&t.push(Ir.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Xp(e,t,r){let n=Vp[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Yp[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${Sl[e]||e}
      </div>
    </div>
  `}function vn(e,t){if(!e||!e.stages)return"";let r=Al[e.route]||Al.spec_backed,n=e.stages,s=Zp(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Sl[a]||a} ${a==="plan"?Qp(n[a]||{}):El(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Xp(a,n[a]||{},a===s))}
    </div>
  `}function Jp(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Tl=2;function ef(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Tl).join(", "),s=r.length-Tl,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ta(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Cl(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jr(e){return`${e.kind}:${Cl(e)}@${e.sha}`}function zs(e,t){if(!e)return null;let r=ta(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=ta(t?.kind),a=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${Jr(t)}`:"";return{kind:e.kind,label:l,title:`${c}${u}`}}function Rl(e,t){let r=zs(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function tf(e){if(!e)return null;let t=ta(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function rf(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Lr(r,"route")){let l=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":n.route}</span
      >`)}if(n.fast_track&&Lr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Lr(r,"pr")){let l=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=Rl(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let l=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jr(l)}`}
        >${`exec ${l.kind==="delegated"?Cl(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let l=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of xl(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&Lr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Lr(r,"blocked")&&s.push(...ef(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Lr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function nf(e){let t=ir(e.created_at),r=ir(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function sf(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ws(r,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:nf(e),empty_label:"children \uC5C6\uC74C",childChips:ra,onToggle:n=>t.onRollupToggle&&t.onRollupToggle(n,e.id),onChildClick:(n,s)=>t.onChildClick&&t.onChildClick(n,s)})}function ra(e){let t=e?.workflow?.chips?.planned_execution,r=e?.workflow?.chips?.exec_receipt;return zs(t,r)?i`<span class="board-card__roll-child-chips">
    ${Rl(t,r)}
    ${tf(r)}
  </span>`:null}function Hs(e,t){let r=Jp(e.priority);return i`
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
      ${rf(e,t)}
      ${e.workflow&&Lr(t.policy||null,"stepper")?vn(e.workflow,e.status):""}
      ${sf(e,t)}
    </article>
  `}function wn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${Rr.map(o=>i`<option
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
        ${e.items.map(o=>Hs(o,t))}
      </div>
    </section>
  `}function Ll(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Hs(n,t))}
        </div>
      </div>
    </dialog>
  `}var of=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],af=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],lf=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function cf(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Il(e,t,r){return i`
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
        ${of.map(n=>i`<option
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
        ${af.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${cf(e,t,r)}
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
        ${lf.map(n=>i`<option
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
  `}var uf=200,df={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},pf=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ol="beads-ui.board.sort",Pl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ff(){try{let e=window.localStorage.getItem(Ol);if(e&&Pl.has(e))return e}catch{}return"created_desc"}function Dl(e,t){let r=Ct("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.closedRange||er,m=s?Ns(s,a):null,v=Bs({transport:o,uiOrderStore:a}),C=[],F=[],H=[],re=[],V=[],q=[],O=!1,P=0,L=ff(),$=new Map,D=new Map,K=new Map,pe=new Set,_e={search:"",priority:"",type:"",labels:[]},me=!1,ae=null;function Le(B){return String(B.status||"open")==="open"}function Te(B){let te=String(B.status||"open");return te==="open"||te==="blocked"}function ne(B){let te=_e.search.trim().toLowerCase(),ve=_e.priority,y=_e.type,R=_e.labels;return B.filter(W=>{if(te){let oe=String(W.id||"").toLowerCase(),Ce=String(W.title||"").toLowerCase();if(!oe.includes(te)&&!Ce.includes(te))return!1}if(ve!==""&&String(W.priority)!==ve||y!==""&&String(W.issue_type||"")!==y)return!1;if(R.length>0){let oe=Array.isArray(W.labels)?W.labels:[];if(!R.some(Ce=>oe.includes(Ce)))return!1}return!0})}function se(){let B=new Set;for(let te of[C,F,H,re,V,q])for(let ve of te){let y=Array.isArray(ve.labels)?ve.labels:[];for(let R of y)typeof R=="string"&&R.length>0&&B.add(R)}return Array.from(B).sort()}function we(){return _e.search.trim()!==""||_e.priority!==""||_e.type!==""||_e.labels.length>0}function A(){try{if(m){let B=m.selectBoardColumn("tab:board:in-progress","in_progress",L),te=m.selectBoardColumn("tab:board:blocked","blocked",L).filter(Te),ve=new Set(B.map(Be=>Be.id)),y=m.selectBoardColumn("tab:board:ready","ready",L).filter(Be=>Le(Be)&&!ve.has(Be.id)),R=m.selectBoardColumn("tab:board:resolved","resolved",L),W=m.selectBoardColumn("tab:board:deferred","deferred",L),oe=m.selectBoardColumn("tab:board:closed","closed").slice(0,uf),Ce=[...te,...y,...B,...R,...oe];ue(Ce);let Ae=new Set;for(let Be of Ce)Be&&Be.id&&!qs(Be)&&Ae.add(Be.id);let De=!we();C=De?Bn(te,Ae):te,F=De?Bn(y,Ae):y,H=De?Bn(B,Ae):B,re=De?Bn(R,Ae):R,V=W,P=W.length,q=De?Bn(oe,Ae):oe,$=new Map;for(let Be of C)$.set(Be.id,"open");for(let Be of F)$.set(Be.id,"open");for(let Be of H)$.set(Be.id,"in_progress");for(let Be of re)$.set(Be.id,"resolved");for(let Be of V)$.set(Be.id,"deferred");for(let Be of q)$.set(Be.id,"closed");D=new Map;for(let Be of C)D.set(Be.id,"blocked-col");for(let Be of F)D.set(Be.id,"ready-col");for(let Be of H)D.set(Be.id,"in-progress-col");for(let Be of re)D.set(Be.id,"resolved-col");for(let Be of q)D.set(Be.id,"closed-col")}Ye()}catch{C=[],F=[],H=[],re=[],V=[],q=[],K=new Map,Ye()}}function ue(B){K=Fs(B)}function E(B){return js(K,B)}function M(B){return!pe.has(B)}function ce(B,te){B.preventDefault(),B.stopPropagation(),pe.has(te)?pe.delete(te):pe.add(te),Ye()}function $e(B,te){B.preventDefault(),B.stopPropagation(),n(te)}function ge(B,te){B.preventDefault(),B.stopPropagation(),n(te)}function Oe(B,te){ae||n(te)}function _t(B,te){B.preventDefault(),B.stopPropagation(),_f(te).then(ve=>{ve&&he("\uBCF5\uC0AC\uB428","success",1200)})}function He(B,te){ae=te,B.dataTransfer&&(B.dataTransfer.setData("text/plain",te),B.dataTransfer.effectAllowed="move"),B.target.classList.add("board-card--dragging")}function pt(B){B.target.classList.remove("board-card--dragging"),gt(),setTimeout(()=>{ae=null},0)}function tt(B){let te=String(B.target.value||"");!te||te===p||(p=te,u&&u(te),Ye())}function Y(){return l?l.get():null}function Z(B){let te=c?c.get():null,ve=te?te.cleanup_failed:null;if(!ve||typeof ve!="object"||Array.isArray(ve))return null;let y=ve[B];return!y||typeof y!="object"||Array.isArray(y)?null:y}let Se={onCardClick:Oe,onCopyId:_t,onDragStart:He,onDragEnd:pt,onClosedRangeChange:tt,rollupFor:E,isExpanded:M,onRollupToggle:ce,onChildClick:$e,onFromChipClick:ge,cleanupFailureFor:Z,get policy(){return Y()}};function Ze(B,te){ae||(ee(),n(te))}function je(B,te){B.preventDefault(),B.stopPropagation(),ee(),n(te)}let rt={...Se,onCardClick:Ze,onChildClick:je,onFromChipClick:je,get policy(){return Y()}};function Qe(B){let te=B.target,ve=e.querySelector(".board-filter__labels");te&&ve&&ve.contains(te)||T()}function yt(B){B.key==="Escape"&&T()}function Ie(){me||(me=!0,document.addEventListener("mousedown",Qe),document.addEventListener("keydown",yt),Ye())}function T(){me&&(me=!1,document.removeEventListener("mousedown",Qe),document.removeEventListener("keydown",yt),Ye())}function Q(B){B.key==="Escape"&&ee()}function Ee(){O||(O=!0,document.addEventListener("keydown",Q),Ye())}function ee(){O&&(O=!1,document.removeEventListener("keydown",Q),Ye())}let Ne={onClose:ee,onOverlayClick(B){B.target===B.currentTarget&&ee()}},et={onSearchInput(B){_e.search=String(B.target.value||""),A()},onPriorityChange(B){_e.priority=String(B.target.value||""),A()},onTypeChange(B){_e.type=String(B.target.value||""),A()},onSortChange(B){let te=String(B.target.value||"");if(!(!Pl.has(te)||te===L)){L=te;try{window.localStorage.setItem(Ol,te)}catch{}A()}},onDeferredToggle(){O?ee():Ee()},onLabelMenuToggle(){me?T():Ie()},onLabelToggle(B){let te=_e.labels.indexOf(B);te===-1?_e.labels.push(B):_e.labels.splice(te,1),A()},onLabelClear(){_e.labels.length!==0&&(_e.labels=[],A())},onNewIssue(){d&&d()}};function st(){return i`
      <div class="board-view">
        ${Il(_e,et,{sort_mode:L,deferred_popup_open:O,deferred_count:P,label_options:se(),label_menu_open:me})}
        <div class="board-root">
          ${wn({title:"Blocked",id:"blocked-col",items:ne(C)},Se)}
          ${wn({title:"Ready",id:"ready-col",items:ne(F)},Se)}
          ${wn({title:"In progress",id:"in-progress-col",items:ne(H)},Se)}
          ${wn({title:"Resolved",id:"resolved-col",items:ne(re)},Se)}
          ${wn({title:"Closed",id:"closed-col",items:ne(q),is_closed:!0,closed_range:p},Se)}
        </div>
        ${O?Ll({items:ne(V),count:P},rt,Ne):""}
      </div>
    `}function Ye(){Ve(st(),e),ct()}function ct(){try{let B=e.querySelector("#deferred-popup");B&&!B.open&&(typeof B.showModal=="function"?B.showModal():B.setAttribute("open",""));let te=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ve of te)Array.from(ve.querySelectorAll(".board-card")).forEach((R,W)=>{R.tabIndex=W===0?0:-1})}catch{}}async function ft(B,te){if(!o){he("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:B,status:te}),he("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ve){r("update-status failed: %o",ve),he("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ut(B){switch(B){case"blocked-col":return C;case"ready-col":return F;case"in-progress-col":return H;case"resolved-col":return re;default:return[]}}function ot(B,te,ve){if(!o||!a)return;let y=ut(B),R=y.find(De=>De.id===te);if(!R)return;let W=y.filter(De=>De.id!==te),oe=ve.closest?ve.closest(".board-card"):null,Ce=W.length;if(oe){let De=oe.getAttribute("data-issue-id");if(De===te)return;let Be=W.findIndex(At=>At.id===De);Be>=0&&(Ce=Be)}let Ae=W.slice();Ae.splice(Ce,0,R),v.applyReorder(te,Ae,Ce)}function gt(){for(let B of Array.from(e.querySelectorAll(".board-column--drag-over")))B.classList.remove("board-column--drag-over")}let U=null;e.addEventListener("dragover",B=>{B.preventDefault(),B.dataTransfer&&(B.dataTransfer.dropEffect="move");let ve=B.target.closest(".board-column");ve&&ve!==U&&(U&&U.classList.remove("board-column--drag-over"),ve.classList.add("board-column--drag-over"),U=ve)}),e.addEventListener("dragleave",B=>{let te=B.relatedTarget;(!te||!e.contains(te))&&U&&(U.classList.remove("board-column--drag-over"),U=null)}),e.addEventListener("drop",B=>{B.preventDefault(),U&&(U.classList.remove("board-column--drag-over"),U=null);let te=B.target,ve=te.closest(".board-column");if(!ve)return;let y=B.dataTransfer?.getData("text/plain")||"";if(!y)return;let R=ve.id,W=D.get(y);if(W&&W===R){if(pf.has(R)){if(L!=="manual"){he("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ot(R,y,te)}return}let oe=df[R];if(!oe){he("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}$.get(y)!==oe&&ft(y,oe)}),e.addEventListener("keydown",B=>{let te=B.target;if(!(te instanceof HTMLElement))return;let ve=String(te.tagName||"").toLowerCase();if(ve==="input"||ve==="textarea"||ve==="select"||ve==="button"||ve==="a"||te.isContentEditable===!0)return;let y=te.closest(".board-card");if(!y)return;let R=String(B.key||"");if(R==="Enter"||R===" "){B.preventDefault();let Ae=y.getAttribute("data-issue-id");Ae&&n(Ae);return}if(R!=="ArrowUp"&&R!=="ArrowDown"&&R!=="ArrowLeft"&&R!=="ArrowRight")return;B.preventDefault();let W=y.closest(".board-column");if(!W)return;let oe=Array.from(W.querySelectorAll(".board-card")),Ce=oe.indexOf(y);if(R==="ArrowDown"&&Ce<oe.length-1){J(y,oe[Ce+1]);return}if(R==="ArrowUp"&&Ce>0){J(y,oe[Ce-1]);return}if(R==="ArrowLeft"||R==="ArrowRight"){let Ae=Array.from(e.querySelectorAll(".board-column")),De=Ae.indexOf(W),Be=R==="ArrowRight"?1:-1,At=De+Be;for(;At>=0&&At<Ae.length;){let vt=Ae[At].querySelector(".board-card");if(vt){J(y,vt);return}At+=Be}}});function J(B,te){try{B.tabIndex=-1,te.tabIndex=0,te.focus()}catch{}}let be=null;m&&m.subscribe&&(be=m.subscribe(()=>{try{A()}catch{}}));let Ge=null;l&&l.subscribe&&(Ge=l.subscribe(()=>{try{A()}catch{}}));let Me=null;return c&&c.subscribe&&(Me=c.subscribe(()=>{Ye()})),{async load(){r("load"),A()},clear(){T(),ee(),be&&(be(),be=null),Ge&&(Ge(),Ge=null),Me&&(Me(),Me=null),e.replaceChildren(),C=[],F=[],H=[],re=[],V=[],q=[],$=new Map,D=new Map}}}function Bn(e,t){return e.filter(r=>{let n=qs(r);return!(n&&t.has(n))})}async function _f(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function tr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function en(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Un(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function mf(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${en(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${en(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=d=>{typeof r.close=="function"&&r.close(),r.remove(),c(d)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function wr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await mf(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var gf=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Ml={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},hf=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function jt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function It(e){return typeof e=="string"&&e.length>0?e:null}function kn(e){return e.startsWith("gpt-")?e.slice(4):e}function Et(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function ql(e,t,r){let n=It(t[e]);if(n!==null)return{value:n,source:"pin"};let s=It(r[e]);return s===null?null:{value:s,source:"global"}}function Wn(e,t,r,n){return ql(e,t,r)||{value:n,source:"base"}}function na(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&jt(s?.[t])){let a=It(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&jt(s)){for(let a of Object.values(s))if(jt(a)){let l=It(a[e]);if(l!==null)return l}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return It(n?.runners?.[o]?.models?.[e]?.id)||e}function bf(e,t){return It(t?.review?.reviewers?.[e]?.model)||e}function $n(e,t,r=!1){if(e==="default")return Et(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?kn(e):e;return Et(e,t,n,e,"explicit")}function Fl(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];jt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(jt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function yf(e,t){let r=[],n=e?.implementation?.model_catalog;jt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(jt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function vf(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of yf(t,r)){let o=Fl(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function sa(e){return Et(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Nl(e,t,r){let n=ql(e,t,r);return n?$n(n.value,n.source):Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Qt(e){let t=jt(e.pin)?e.pin:{},r=jt(e.global)?e.global:{},n=jt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&jt(n.session)?n.session:null,o=n?.supported===!0&&jt(n.orchestration)?n.orchestration:null,a=jt(e.runner_catalog)?e.runner_catalog:null,l=It(r.quick_fix_impl_model),c=vf(l,s,a),u={};if(s){let d=Wn("workflow_mode",t,r,It(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Et(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):$n(d.value,d.source);for(let q of["spec_review","plan_review","impl_review"]){let O=`${q}_model`,P=It(q==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),L=Wn(O,t,r,P);if(L.value===null)u[O]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(L.value!=="self"&&L.value!=="skip"&&!jt(s.review?.reviewers?.[L.value]))u[O]=sa(Et(L.value,L.source,"",null,"explicit"));else{let $=bf(L.value,s);u[O]=Et(L.value,L.source,kn($),$,L.source==="base"?"default":"explicit")}}for(let[q,O]of Object.entries(Ml)){let P=u[O].value;if(P==="self"||P==="skip"){u[q]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let L=It(s.review?.reviewers?.[P||""]?.effort),$=Wn(q,t,r,L);u[q]=$.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et($.value,$.source,$.value,$.value,$.source==="base"?"default":"explicit")}let p=jt(s.implementation?.default)?s.implementation.default:{},m=It(e.route),v=m!==null&&["quick_fix","spec_backed","full_plan"].includes(m),C=jt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},F=v&&jt(C[m])?C[m]:{};for(let q of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let O=Wn(q,t,r,q==="impl_dispatch"?It(F.dispatch)||It(p.dispatch):It(p[q.replace("impl_","")]));u[q]=O.value===null?Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Et(O.value,O.source,O.value,O.value,O.source==="base"?"default":"explicit")}let H=It(t.impl_runtime),re=H==="inherit"?It(e.controller_runtime):H,V=m==="quick_fix"&&It(t.impl_dispatch)===null&&c.runtime!==null&&(H===null||re===c.runtime);if(V){let q=c.runtime,O=l;u.impl_dispatch=Et("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),H===null&&(u.impl_runtime=Et(q,"global",`${q} (\uC720\uB3C4)`,q,"explicit")),It(t.impl_model)===null&&(u.impl_model=Et(O,"global",O,O,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let q of["impl_runtime","impl_model","impl_effort","impl_speed"])u[q]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!V&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let q=u.impl_runtime.value==="inherit"?It(e.controller_runtime):u.impl_runtime.value,O=q?Fl(q,s,a):[];if(u.impl_model.value!=="auto"&&O.length>0&&!O.includes(u.impl_model.value))u.impl_model=sa(u.impl_model);else{let P=na(u.impl_model.value,q,s,a);u.impl_model.display=kn(P),u.impl_model.full_value=P}}if(u.impl_effort.value==="auto"){let q=It(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),O=q?It(s.implementation?.effort_by_transport?.[q]?.auto):null;O&&!hf.has(O)?(u.impl_effort.display=`${O} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=O,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):$n("default",u.impl_speed.source))}}else for(let d of gf.filter(p=>!p.startsWith("orchestration_")))u[d]=Nl(d,t,r);if(!s){for(let[d,p]of Object.entries(Ml))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Et(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=Nl(d,t,r);continue}let p=d.replace("orchestration_",""),m=It(o[p]),v=Wn(d,t,r,m);if(d==="orchestration_effort"&&v.source==="base"){u[d]=Et(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(v.value===null){u[d]=Et(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let C=v.source==="base"?It(o.model_id)||v.value:na(v.value,null,s,a);u[d]=Et(v.value,v.source,kn(C),C,v.source==="base"?"default":"explicit");continue}if(v.value==="default"){u[d]=v.source==="base"?Et("default","base","default (\uC77C\uBC18)","default","default"):$n("default",v.source);continue}u[d]=$n(v.value,v.source)}if(s)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Et(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${kn(d)})`,null,"default")}else if(c.runtime!==null){let d=na(l,c.runtime,s,a);u.quick_fix_impl_model=Et(l,"global",kn(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=sa(Et(l,"global","",null,"explicit")):u.quick_fix_impl_model=$n(l,"global");return u}function wf(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function Gs(e){let t=jt(e.pin)?e.pin:{},r=jt(e.global)?e.global:{},n=jt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=p=>{let m={...n,...p};return Qt({pin:e.layer==="pin"?m:t,global:e.layer==="pin"?r:m,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let l=s(a)[e.key],c=s(o)[e.key],u=It(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:wf(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(p=>{let m=s({...o,[e.key]:p})[e.key];return{value:p,label:m.display,full_value:m.full_value}})}}function xn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(l=>{let c=!1,u=p=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),l(p))},d=()=>u(n.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var zl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ut(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var kr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],zn=[...kr,"reasoning_output_tokens"],kf=["implementation","review-consult"];function oa(e){let t=0;for(let r of kr)t+=Ut(e?.[r]);return t}function $f(e){return!e||typeof e!="object"?!1:kr.some(t=>Number.isFinite(e[t]))}function jl(e){return!e||typeof e!="object"?!1:zn.some(t=>Number.isFinite(e[t]))}function xf(e){let t={};for(let r of zn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Bl(e){let t={};for(let r of zn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ul(e,t){return e==="codex"?Ut(t.input_tokens)+Ut(t.output_tokens):oa(t)}function Af(e){return e==="claude"?"Claude":"Codex"}function Sf(e){return`\u03C4 ${Hl(e)}`}function Ef(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${Ut(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ut(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${Ut(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(zl),o.join(`
`)}function Wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Af(r)} ${Sf(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ef(r,n)})}return t}function Vs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of zn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=Ut(l.breakdown[c])+Ut(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function aa(e){return!e||typeof e!="object"?null:lr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Tf(e){return e==="codex"?"codex":"claude"}function Or(){return{subtotal:0,breakdown:xf(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ks(e,t,r){e.subtotal+=t.subtotal;for(let n of zn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Ut(e.breakdown[n])+Ut(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Wl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Hl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function An(e){return $f(e)?`\u03C4 ${Hl(oa(e))}`:null}function $r(e){let t=An(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Hn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ut(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ut(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${oa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(zl),r.join(`
`)}function lr(e,t){let r={claude:Or(),codex:Or()},n={orchestrator:{claude:Or(),codex:Or()},implementation:{claude:Or(),codex:Or()},"review-consult":{claude:Or(),codex:Or()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(jl(c)){let d=Tf(l.runner),p=Bl(c),m={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:Ul(d,p)};p.replayed===!0&&(m.replayed=!0),typeof l.model=="string"&&(m.model=l.model),typeof l.session_id=="string"&&(m.session_id=l.session_id),Ks(r[d],m,!0),Ks(n.orchestrator[d],m,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){if(!d||d.provider!=="codex"||!kf.includes(d.role)||!jl(d.usage))continue;let p=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!p||s.has(p))continue;s.add(p);let m=Bl(d.usage),v={provider:"codex",role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Ul("codex",m)};v.receipt_id=p,typeof d.model=="string"&&(v.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(v.effort=d.effort),typeof d.session_id=="string"?v.session_id=d.session_id:typeof d.thread_id=="string"&&(v.session_id=d.thread_id),typeof d.turn_id=="string"&&(v.turn_id=d.turn_id),typeof d.completed_at=="string"&&(v.completed_at=d.completed_at),m.replayed===!0&&(v.replayed=!0),Ks(r.codex,v,!1),Ks(n[v.role].codex,v,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=Wl(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let d=n[l][u];d.legs.length>0&&(c[u]={...Wl(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:ec,setPrototypeOf:Gl,isFrozen:Cf,getPrototypeOf:Rf,getOwnPropertyDescriptor:Lf}=Object,{freeze:Kt,seal:cr,create:fa}=Object,{apply:_a,construct:ma}=typeof Reflect<"u"&&Reflect;Kt||(Kt=function(t){return t});cr||(cr=function(t){return t});_a||(_a=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ma||(ma=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Ys=Vt(Array.prototype.forEach),If=Vt(Array.prototype.lastIndexOf),Kl=Vt(Array.prototype.pop),Gn=Vt(Array.prototype.push),Of=Vt(Array.prototype.splice),Qs=Vt(String.prototype.toLowerCase),ia=Vt(String.prototype.toString),la=Vt(String.prototype.match),Kn=Vt(String.prototype.replace),Pf=Vt(String.prototype.indexOf),Df=Vt(String.prototype.trim),fr=Vt(Object.prototype.hasOwnProperty),Gt=Vt(RegExp.prototype.test),Vn=Mf(TypeError);function Vt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return _a(e,t,n)}}function Mf(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ma(e,r)}}function it(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Qs;Gl&&Gl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Cf(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Nf(e){for(let t=0;t<e.length;t++)fr(e,t)||(e[t]=null);return e}function xr(e){let t=fa(null);for(let[r,n]of ec(e))fr(e,r)&&(Array.isArray(n)?t[r]=Nf(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=xr(n):t[r]=n);return t}function Yn(e,t){for(;e!==null;){let n=Lf(e,t);if(n){if(n.get)return Vt(n.get);if(typeof n.value=="function")return Vt(n.value)}e=Rf(e)}function r(){return null}return r}var Vl=Kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ca=Kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ua=Kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),qf=Kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),da=Kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ff=Kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Yl=Kt(["#text"]),Zl=Kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),pa=Kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ql=Kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Zs=Kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),jf=cr(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Bf=cr(/<%[\w\W]*|[\w\W]*%>/gm),Uf=cr(/\$\{[\w\W]*/gm),Wf=cr(/^data-[\-\w.\u00B7-\uFFFF]+$/),zf=cr(/^aria-[\-\w]+$/),tc=cr(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Hf=cr(/^(?:\w+script|data):/i),Gf=cr(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),rc=cr(/^html$/i),Kf=cr(/^[a-z][.\w]*(-[.\w]+)+$/i),Xl=Object.freeze({__proto__:null,ARIA_ATTR:zf,ATTR_WHITESPACE:Gf,CUSTOM_ELEMENT:Kf,DATA_ATTR:Wf,DOCTYPE_NAME:rc,ERB_EXPR:Bf,IS_ALLOWED_URI:tc,IS_SCRIPT_OR_DATA:Hf,MUSTACHE_EXPR:jf,TMPLIT_EXPR:Uf}),Zn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Vf=function(){return typeof window>"u"?null:window},Yf=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Jl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function nc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Vf(),t=Fe=>nc(Fe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Zn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:m,trustedTypes:v}=e,C=c.prototype,F=Yn(C,"cloneNode"),H=Yn(C,"remove"),re=Yn(C,"nextSibling"),V=Yn(C,"childNodes"),q=Yn(C,"parentNode");if(typeof a=="function"){let Fe=r.createElement("template");Fe.content&&Fe.content.ownerDocument&&(r=Fe.content.ownerDocument)}let O,P="",{implementation:L,createNodeIterator:$,createDocumentFragment:D,getElementsByTagName:K}=r,{importNode:pe}=n,_e=Jl();t.isSupported=typeof ec=="function"&&typeof q=="function"&&L&&L.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:me,ERB_EXPR:ae,TMPLIT_EXPR:Le,DATA_ATTR:Te,ARIA_ATTR:ne,IS_SCRIPT_OR_DATA:se,ATTR_WHITESPACE:we,CUSTOM_ELEMENT:A}=Xl,{IS_ALLOWED_URI:ue}=Xl,E=null,M=it({},[...Vl,...ca,...ua,...da,...Yl]),ce=null,$e=it({},[...Zl,...pa,...Ql,...Zs]),ge=Object.seal(fa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,_t=null,He=Object.seal(fa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),pt=!0,tt=!0,Y=!1,Z=!0,Se=!1,Ze=!0,je=!1,rt=!1,Qe=!1,yt=!1,Ie=!1,T=!1,Q=!0,Ee=!1,ee="user-content-",Ne=!0,et=!1,st={},Ye=null,ct=it({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ft=null,ut=it({},["audio","video","img","source","image","track"]),ot=null,gt=it({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),U="http://www.w3.org/1998/Math/MathML",J="http://www.w3.org/2000/svg",be="http://www.w3.org/1999/xhtml",Ge=be,Me=!1,B=null,te=it({},[U,J,be],ia),ve=it({},["mi","mo","mn","ms","mtext"]),y=it({},["annotation-xml"]),R=it({},["title","style","font","a","script"]),W=null,oe=["application/xhtml+xml","text/html"],Ce="text/html",Ae=null,De=null,Be=r.createElement("form"),At=function(S){return S instanceof RegExp||S instanceof Function},vt=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(De&&De===S)){if((!S||typeof S!="object")&&(S={}),S=xr(S),W=oe.indexOf(S.PARSER_MEDIA_TYPE)===-1?Ce:S.PARSER_MEDIA_TYPE,Ae=W==="application/xhtml+xml"?ia:Qs,E=fr(S,"ALLOWED_TAGS")?it({},S.ALLOWED_TAGS,Ae):M,ce=fr(S,"ALLOWED_ATTR")?it({},S.ALLOWED_ATTR,Ae):$e,B=fr(S,"ALLOWED_NAMESPACES")?it({},S.ALLOWED_NAMESPACES,ia):te,ot=fr(S,"ADD_URI_SAFE_ATTR")?it(xr(gt),S.ADD_URI_SAFE_ATTR,Ae):gt,ft=fr(S,"ADD_DATA_URI_TAGS")?it(xr(ut),S.ADD_DATA_URI_TAGS,Ae):ut,Ye=fr(S,"FORBID_CONTENTS")?it({},S.FORBID_CONTENTS,Ae):ct,Oe=fr(S,"FORBID_TAGS")?it({},S.FORBID_TAGS,Ae):xr({}),_t=fr(S,"FORBID_ATTR")?it({},S.FORBID_ATTR,Ae):xr({}),st=fr(S,"USE_PROFILES")?S.USE_PROFILES:!1,pt=S.ALLOW_ARIA_ATTR!==!1,tt=S.ALLOW_DATA_ATTR!==!1,Y=S.ALLOW_UNKNOWN_PROTOCOLS||!1,Z=S.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Se=S.SAFE_FOR_TEMPLATES||!1,Ze=S.SAFE_FOR_XML!==!1,je=S.WHOLE_DOCUMENT||!1,yt=S.RETURN_DOM||!1,Ie=S.RETURN_DOM_FRAGMENT||!1,T=S.RETURN_TRUSTED_TYPE||!1,Qe=S.FORCE_BODY||!1,Q=S.SANITIZE_DOM!==!1,Ee=S.SANITIZE_NAMED_PROPS||!1,Ne=S.KEEP_CONTENT!==!1,et=S.IN_PLACE||!1,ue=S.ALLOWED_URI_REGEXP||tc,Ge=S.NAMESPACE||be,ve=S.MATHML_TEXT_INTEGRATION_POINTS||ve,y=S.HTML_INTEGRATION_POINTS||y,ge=S.CUSTOM_ELEMENT_HANDLING||{},S.CUSTOM_ELEMENT_HANDLING&&At(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),S.CUSTOM_ELEMENT_HANDLING&&At(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),S.CUSTOM_ELEMENT_HANDLING&&typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Se&&(tt=!1),Ie&&(yt=!0),st&&(E=it({},Yl),ce=[],st.html===!0&&(it(E,Vl),it(ce,Zl)),st.svg===!0&&(it(E,ca),it(ce,pa),it(ce,Zs)),st.svgFilters===!0&&(it(E,ua),it(ce,pa),it(ce,Zs)),st.mathMl===!0&&(it(E,da),it(ce,Ql),it(ce,Zs))),S.ADD_TAGS&&(typeof S.ADD_TAGS=="function"?He.tagCheck=S.ADD_TAGS:(E===M&&(E=xr(E)),it(E,S.ADD_TAGS,Ae))),S.ADD_ATTR&&(typeof S.ADD_ATTR=="function"?He.attributeCheck=S.ADD_ATTR:(ce===$e&&(ce=xr(ce)),it(ce,S.ADD_ATTR,Ae))),S.ADD_URI_SAFE_ATTR&&it(ot,S.ADD_URI_SAFE_ATTR,Ae),S.FORBID_CONTENTS&&(Ye===ct&&(Ye=xr(Ye)),it(Ye,S.FORBID_CONTENTS,Ae)),Ne&&(E["#text"]=!0),je&&it(E,["html","head","body"]),E.table&&(it(E,["tbody"]),delete Oe.tbody),S.TRUSTED_TYPES_POLICY){if(typeof S.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof S.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=S.TRUSTED_TYPES_POLICY,P=O.createHTML("")}else O===void 0&&(O=Yf(v,s)),O!==null&&typeof P=="string"&&(P=O.createHTML(""));Kt&&Kt(S),De=S}},h=it({},[...ca,...ua,...qf]),x=it({},[...da,...Ff]),N=function(S){let de=q(S);(!de||!de.tagName)&&(de={namespaceURI:Ge,tagName:"template"});let Pe=Qs(S.tagName),ht=Qs(de.tagName);return B[S.namespaceURI]?S.namespaceURI===J?de.namespaceURI===be?Pe==="svg":de.namespaceURI===U?Pe==="svg"&&(ht==="annotation-xml"||ve[ht]):!!h[Pe]:S.namespaceURI===U?de.namespaceURI===be?Pe==="math":de.namespaceURI===J?Pe==="math"&&y[ht]:!!x[Pe]:S.namespaceURI===be?de.namespaceURI===J&&!y[ht]||de.namespaceURI===U&&!ve[ht]?!1:!x[Pe]&&(R[Pe]||!h[Pe]):!!(W==="application/xhtml+xml"&&B[S.namespaceURI]):!1},j=function(S){Gn(t.removed,{element:S});try{q(S).removeChild(S)}catch{H(S)}},ye=function(S,de){try{Gn(t.removed,{attribute:de.getAttributeNode(S),from:de})}catch{Gn(t.removed,{attribute:null,from:de})}if(de.removeAttribute(S),S==="is")if(yt||Ie)try{j(de)}catch{}else try{de.setAttribute(S,"")}catch{}},ke=function(S){let de=null,Pe=null;if(Qe)S="<remove></remove>"+S;else{let $t=la(S,/^[\r\n\t ]+/);Pe=$t&&$t[0]}W==="application/xhtml+xml"&&Ge===be&&(S='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+S+"</body></html>");let ht=O?O.createHTML(S):S;if(Ge===be)try{de=new m().parseFromString(ht,W)}catch{}if(!de||!de.documentElement){de=L.createDocument(Ge,"template",null);try{de.documentElement.innerHTML=Me?P:ht}catch{}}let Dt=de.body||de.documentElement;return S&&Pe&&Dt.insertBefore(r.createTextNode(Pe),Dt.childNodes[0]||null),Ge===be?K.call(de,je?"html":"body")[0]:je?de.documentElement:Dt},qe=function(S){return $.call(S.ownerDocument||S,S,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},ze=function(S){return S instanceof p&&(typeof S.nodeName!="string"||typeof S.textContent!="string"||typeof S.removeChild!="function"||!(S.attributes instanceof d)||typeof S.removeAttribute!="function"||typeof S.setAttribute!="function"||typeof S.namespaceURI!="string"||typeof S.insertBefore!="function"||typeof S.hasChildNodes!="function")},kt=function(S){return typeof l=="function"&&S instanceof l};function mt(Fe,S,de){Ys(Fe,Pe=>{Pe.call(t,S,de,De)})}let Ft=function(S){let de=null;if(mt(_e.beforeSanitizeElements,S,null),ze(S))return j(S),!0;let Pe=Ae(S.nodeName);if(mt(_e.uponSanitizeElement,S,{tagName:Pe,allowedTags:E}),Ze&&S.hasChildNodes()&&!kt(S.firstElementChild)&&Gt(/<[/\w!]/g,S.innerHTML)&&Gt(/<[/\w!]/g,S.textContent)||S.nodeType===Zn.progressingInstruction||Ze&&S.nodeType===Zn.comment&&Gt(/<[/\w]/g,S.data))return j(S),!0;if(!(He.tagCheck instanceof Function&&He.tagCheck(Pe))&&(!E[Pe]||Oe[Pe])){if(!Oe[Pe]&&Nt(Pe)&&(ge.tagNameCheck instanceof RegExp&&Gt(ge.tagNameCheck,Pe)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Pe)))return!1;if(Ne&&!Ye[Pe]){let ht=q(S)||S.parentNode,Dt=V(S)||S.childNodes;if(Dt&&ht){let $t=Dt.length;for(let Mt=$t-1;Mt>=0;--Mt){let f=F(Dt[Mt],!0);f.__removalCount=(S.__removalCount||0)+1,ht.insertBefore(f,re(S))}}}return j(S),!0}return S instanceof c&&!N(S)||(Pe==="noscript"||Pe==="noembed"||Pe==="noframes")&&Gt(/<\/no(script|embed|frames)/i,S.innerHTML)?(j(S),!0):(Se&&S.nodeType===Zn.text&&(de=S.textContent,Ys([me,ae,Le],ht=>{de=Kn(de,ht," ")}),S.textContent!==de&&(Gn(t.removed,{element:S.cloneNode()}),S.textContent=de)),mt(_e.afterSanitizeElements,S,null),!1)},Tt=function(S,de,Pe){if(Q&&(de==="id"||de==="name")&&(Pe in r||Pe in Be))return!1;if(!(tt&&!_t[de]&&Gt(Te,de))){if(!(pt&&Gt(ne,de))){if(!(He.attributeCheck instanceof Function&&He.attributeCheck(de,S))){if(!ce[de]||_t[de]){if(!(Nt(S)&&(ge.tagNameCheck instanceof RegExp&&Gt(ge.tagNameCheck,S)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(S))&&(ge.attributeNameCheck instanceof RegExp&&Gt(ge.attributeNameCheck,de)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(de,S))||de==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&Gt(ge.tagNameCheck,Pe)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(Pe))))return!1}else if(!ot[de]){if(!Gt(ue,Kn(Pe,we,""))){if(!((de==="src"||de==="xlink:href"||de==="href")&&S!=="script"&&Pf(Pe,"data:")===0&&ft[S])){if(!(Y&&!Gt(se,Kn(Pe,we,"")))){if(Pe)return!1}}}}}}}return!0},Nt=function(S){return S!=="annotation-xml"&&la(S,A)},nt=function(S){mt(_e.beforeSanitizeAttributes,S,null);let{attributes:de}=S;if(!de||ze(S))return;let Pe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ce,forceKeepAttr:void 0},ht=de.length;for(;ht--;){let Dt=de[ht],{name:$t,namespaceURI:Mt,value:f}=Dt,w=Ae($t),G=f,_=$t==="value"?G:Df(G);if(Pe.attrName=w,Pe.attrValue=_,Pe.keepAttr=!0,Pe.forceKeepAttr=void 0,mt(_e.uponSanitizeAttribute,S,Pe),_=Pe.attrValue,Ee&&(w==="id"||w==="name")&&(ye($t,S),_=ee+_),Ze&&Gt(/((--!?|])>)|<\/(style|title|textarea)/i,_)){ye($t,S);continue}if(w==="attributename"&&la(_,"href")){ye($t,S);continue}if(Pe.forceKeepAttr)continue;if(!Pe.keepAttr){ye($t,S);continue}if(!Z&&Gt(/\/>/i,_)){ye($t,S);continue}Se&&Ys([me,ae,Le],le=>{_=Kn(_,le," ")});let b=Ae(S.nodeName);if(!Tt(b,w,_)){ye($t,S);continue}if(O&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!Mt)switch(v.getAttributeType(b,w)){case"TrustedHTML":{_=O.createHTML(_);break}case"TrustedScriptURL":{_=O.createScriptURL(_);break}}if(_!==G)try{Mt?S.setAttributeNS(Mt,$t,_):S.setAttribute($t,_),ze(S)?j(S):Kl(t.removed)}catch{ye($t,S)}}mt(_e.afterSanitizeAttributes,S,null)},zt=function Fe(S){let de=null,Pe=qe(S);for(mt(_e.beforeSanitizeShadowDOM,S,null);de=Pe.nextNode();)mt(_e.uponSanitizeShadowNode,de,null),Ft(de),nt(de),de.content instanceof o&&Fe(de.content);mt(_e.afterSanitizeShadowDOM,S,null)};return t.sanitize=function(Fe){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},de=null,Pe=null,ht=null,Dt=null;if(Me=!Fe,Me&&(Fe="<!-->"),typeof Fe!="string"&&!kt(Fe))if(typeof Fe.toString=="function"){if(Fe=Fe.toString(),typeof Fe!="string")throw Vn("dirty is not a string, aborting")}else throw Vn("toString is not a function");if(!t.isSupported)return Fe;if(rt||vt(S),t.removed=[],typeof Fe=="string"&&(et=!1),et){if(Fe.nodeName){let f=Ae(Fe.nodeName);if(!E[f]||Oe[f])throw Vn("root node is forbidden and cannot be sanitized in-place")}}else if(Fe instanceof l)de=ke("<!---->"),Pe=de.ownerDocument.importNode(Fe,!0),Pe.nodeType===Zn.element&&Pe.nodeName==="BODY"||Pe.nodeName==="HTML"?de=Pe:de.appendChild(Pe);else{if(!yt&&!Se&&!je&&Fe.indexOf("<")===-1)return O&&T?O.createHTML(Fe):Fe;if(de=ke(Fe),!de)return yt?null:T?P:""}de&&Qe&&j(de.firstChild);let $t=qe(et?Fe:de);for(;ht=$t.nextNode();)Ft(ht),nt(ht),ht.content instanceof o&&zt(ht.content);if(et)return Fe;if(yt){if(Ie)for(Dt=D.call(de.ownerDocument);de.firstChild;)Dt.appendChild(de.firstChild);else Dt=de;return(ce.shadowroot||ce.shadowrootmode)&&(Dt=pe.call(n,Dt,!0)),Dt}let Mt=je?de.outerHTML:de.innerHTML;return je&&E["!doctype"]&&de.ownerDocument&&de.ownerDocument.doctype&&de.ownerDocument.doctype.name&&Gt(rc,de.ownerDocument.doctype.name)&&(Mt="<!DOCTYPE "+de.ownerDocument.doctype.name+`>
`+Mt),Se&&Ys([me,ae,Le],f=>{Mt=Kn(Mt,f," ")}),O&&T?O.createHTML(Mt):Mt},t.setConfig=function(){let Fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};vt(Fe),rt=!0},t.clearConfig=function(){De=null,rt=!1},t.isValidAttribute=function(Fe,S,de){De||vt({});let Pe=Ae(Fe),ht=Ae(S);return Tt(Pe,ht,de)},t.addHook=function(Fe,S){typeof S=="function"&&Gn(_e[Fe],S)},t.removeHook=function(Fe,S){if(S!==void 0){let de=If(_e[Fe],S);return de===-1?void 0:Of(_e[Fe],de,1)[0]}return Kl(_e[Fe])},t.removeHooks=function(Fe){_e[Fe]=[]},t.removeAllHooks=function(){_e=Jl()},t}var sc=nc();var Ar={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Xs=e=>(...t)=>({_$litDirective$:e,values:t}),Sn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Qn=class extends Sn{constructor(t){if(super(t),this.it=Pt,t.type!==Ar.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Pt||t==null)return this._t=void 0,this.it=t;if(t===or)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Qn.directiveName="unsafeHTML",Qn.resultType=1;var oc=Xs(Qn);function ya(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var rn=ya();function pc(e){rn=e}var ts={exec:()=>null};function bt(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Yt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Zf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Qf=/^(?:[ \t]*(?:\n|$))+/,Xf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Jf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,rs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,e_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,va=/(?:[*+-]|\d{1,9}[.)])/,fc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_c=bt(fc).replace(/bull/g,va).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),t_=bt(fc).replace(/bull/g,va).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),wa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,r_=/^[^\n]+/,ka=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,n_=bt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ka).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),s_=bt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,va).getRegex(),so="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$a=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,o_=bt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",$a).replace("tag",so).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),mc=bt(wa).replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",so).getRegex(),a_=bt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",mc).getRegex(),xa={blockquote:a_,code:Xf,def:n_,fences:Jf,heading:e_,hr:rs,html:o_,lheading:_c,list:s_,newline:Qf,paragraph:mc,table:ts,text:r_},ac=bt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",so).getRegex(),i_={...xa,lheading:t_,table:ac,paragraph:bt(wa).replace("hr",rs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ac).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",so).getRegex()},l_={...xa,html:bt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",$a).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ts,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:bt(wa).replace("hr",rs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",_c).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},c_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,u_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,gc=/^( {2,}|\\)\n(?!\s*$)/,d_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,oo=/[\p{P}\p{S}]/u,Aa=/[\s\p{P}\p{S}]/u,hc=/[^\s\p{P}\p{S}]/u,p_=bt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Aa).getRegex(),bc=/(?!~)[\p{P}\p{S}]/u,f_=/(?!~)[\s\p{P}\p{S}]/u,__=/(?:[^\s\p{P}\p{S}]|~)/u,m_=bt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Zf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),yc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,g_=bt(yc,"u").replace(/punct/g,oo).getRegex(),h_=bt(yc,"u").replace(/punct/g,bc).getRegex(),vc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",b_=bt(vc,"gu").replace(/notPunctSpace/g,hc).replace(/punctSpace/g,Aa).replace(/punct/g,oo).getRegex(),y_=bt(vc,"gu").replace(/notPunctSpace/g,__).replace(/punctSpace/g,f_).replace(/punct/g,bc).getRegex(),v_=bt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,hc).replace(/punctSpace/g,Aa).replace(/punct/g,oo).getRegex(),w_=bt(/\\(punct)/,"gu").replace(/punct/g,oo).getRegex(),k_=bt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),$_=bt($a).replace("(?:-->|$)","-->").getRegex(),x_=bt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",$_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),to=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,A_=bt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",to).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),wc=bt(/^!?\[(label)\]\[(ref)\]/).replace("label",to).replace("ref",ka).getRegex(),kc=bt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ka).getRegex(),S_=bt("reflink|nolink(?!\\()","g").replace("reflink",wc).replace("nolink",kc).getRegex(),ic=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Sa={_backpedal:ts,anyPunctuation:w_,autolink:k_,blockSkip:m_,br:gc,code:u_,del:ts,emStrongLDelim:g_,emStrongRDelimAst:b_,emStrongRDelimUnd:v_,escape:c_,link:A_,nolink:kc,punctuation:p_,reflink:wc,reflinkSearch:S_,tag:x_,text:d_,url:ts},E_={...Sa,link:bt(/^!?\[(label)\]\((.*?)\)/).replace("label",to).getRegex(),reflink:bt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",to).getRegex()},ga={...Sa,emStrongRDelimAst:y_,emStrongLDelim:h_,url:bt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ic).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:bt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ic).getRegex()},T_={...ga,br:bt(gc).replace("{2,}","*").getRegex(),text:bt(ga.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Js={normal:xa,gfm:i_,pedantic:l_},Xn={normal:Sa,gfm:ga,breaks:T_,pedantic:E_},C_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},lc=e=>C_[e];function Sr(e,t){if(t){if(Yt.escapeTest.test(e))return e.replace(Yt.escapeReplace,lc)}else if(Yt.escapeTestNoEncode.test(e))return e.replace(Yt.escapeReplaceNoEncode,lc);return e}function cc(e){try{e=encodeURI(e).replace(Yt.percentDecode,"%")}catch{return null}return e}function uc(e,t){let r=e.replace(Yt.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Yt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Yt.slashPipe,"|");return n}function Jn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function R_(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function dc(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function L_(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var ro=class{constructor(e){xt(this,"options");xt(this,"rules");xt(this,"lexer");this.options=e||rn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Jn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=L_(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Jn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Jn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Jn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,r.length===0)break;let m=o.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let v=m,C=v.raw+`
`+r.join(`
`),F=this.blockquote(C);o[o.length-1]=F,n=n.substring(0,n.length-v.raw.length)+F.raw,s=s.substring(0,s.length-v.text.length)+F.text;break}else if(m?.type==="list"){let v=m,C=v.raw+`
`+r.join(`
`),F=this.list(C);o[o.length-1]=F,n=n.substring(0,n.length-m.raw.length)+F.raw,s=s.substring(0,s.length-v.raw.length)+F.raw,r=C.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),m=e.split(`
`,1)[0],v=!p.trim(),C=0;if(this.options.pedantic?(C=2,d=p.trimStart()):v?C=t[1].length+1:(C=t[2].search(this.rules.other.nonSpaceChar),C=C>4?1:C,d=p.slice(C),C+=t[1].length),v&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),c=!0),!c){let F=this.rules.other.nextBulletRegex(C),H=this.rules.other.hrRegex(C),re=this.rules.other.fencesBeginRegex(C),V=this.rules.other.headingBeginRegex(C),q=this.rules.other.htmlBeginRegex(C);for(;e;){let O=e.split(`
`,1)[0],P;if(m=O,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),P=m):P=m.replace(this.rules.other.tabCharGlobal,"    "),re.test(m)||V.test(m)||q.test(m)||F.test(m)||H.test(m))break;if(P.search(this.rules.other.nonSpaceChar)>=C||!m.trim())d+=`
`+P.slice(C);else{if(v||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||re.test(p)||V.test(p)||H.test(p))break;d+=`
`+m}!v&&!m.trim()&&(v=!0),u+=O+`
`,e=e.substring(O.length+1),p=P.slice(C)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=uc(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(uc(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Jn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=R_(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),dc(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return dc(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let d=[...n[0]][0].length,p=e.slice(0,s+n.index+d+a);if(Math.min(s,a)%2){let v=p.slice(1,-1);return{type:"em",raw:p,text:v,tokens:this.lexer.inlineTokens(v)}}let m=p.slice(2,-2);return{type:"strong",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},_r=class ha{constructor(t){xt(this,"tokens");xt(this,"options");xt(this,"state");xt(this,"inlineQueue");xt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||rn,this.options.tokenizer=this.options.tokenizer||new ro,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Yt,block:Js.normal,inline:Xn.normal};this.options.pedantic?(r.block=Js.pedantic,r.inline=Xn.pedantic):this.options.gfm&&(r.block=Js.gfm,this.options.breaks?r.inline=Xn.breaks:r.inline=Xn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Js,inline:Xn}}static lex(t,r){return new ha(r).lex(t)}static lexInline(t,r){return new ha(r).inlineTokens(t)}lex(t){t=t.replace(Yt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Yt.tabCharGlobal,"    ").replace(Yt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=r.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),m;this.options.extensions.startInline.forEach(v=>{m=v.call({lexer:this},p),typeof m=="number"&&m>=0&&(d=Math.min(d,m))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let d=r.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return r}},no=class{constructor(e){xt(this,"options");xt(this,"parser");this.options=e||rn}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Yt.notSpaceStart)?.[0],s=e.replace(Yt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Sr(n)+'">'+(r?s:Sr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Sr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Sr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=cc(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Sr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=cc(e);if(s===null)return Sr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Sr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Sr(e.text)}},Ea=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},mr=class ba{constructor(t){xt(this,"options");xt(this,"renderer");xt(this,"textRenderer");this.options=t||rn,this.options.renderer=this.options.renderer||new no,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ea}static parse(t,r){return new ba(r).parse(t)}static parseInline(t,r){return new ba(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},eo,es=(eo=class{constructor(e){xt(this,"options");xt(this,"block");this.options=e||rn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?_r.lex:_r.lexInline}provideParser(){return this.block?mr.parse:mr.parseInline}},xt(eo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),xt(eo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),eo),I_=class{constructor(...e){xt(this,"defaults",ya());xt(this,"options",this.setOptions);xt(this,"parse",this.parseMarkdown(!0));xt(this,"parseInline",this.parseMarkdown(!1));xt(this,"Parser",mr);xt(this,"Renderer",no);xt(this,"TextRenderer",Ea);xt(this,"Lexer",_r);xt(this,"Tokenizer",ro);xt(this,"Hooks",es);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new no(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new ro(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new es;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];es.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&es.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await l.call(s,u);return c.call(s,p)})();let d=l.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(s,u);return p===!1&&(p=await c.apply(s,u)),p})();let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return _r.lex(e,t??this.defaults)}parser(e,t){return mr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?_r.lex:_r.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?mr.parse:mr.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?_r.lex:_r.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?mr.parse:mr.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Sr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},tn=new I_;function wt(e,t){return tn.parse(e,t)}wt.options=wt.setOptions=function(e){return tn.setOptions(e),wt.defaults=tn.defaults,pc(wt.defaults),wt};wt.getDefaults=ya;wt.defaults=rn;wt.use=function(...e){return tn.use(...e),wt.defaults=tn.defaults,pc(wt.defaults),wt};wt.walkTokens=function(e,t){return tn.walkTokens(e,t)};wt.parseInline=tn.parseInline;wt.Parser=mr;wt.parser=mr.parse;wt.Renderer=no;wt.TextRenderer=Ea;wt.Lexer=_r;wt.lexer=_r.lex;wt.Tokenizer=ro;wt.Hooks=es;wt.parse=wt;var Ay=wt.options,Sy=wt.setOptions,Ey=wt.use,Ty=wt.walkTokens,Cy=wt.parseInline;var Ry=mr.parse,Ly=_r.lex;function Pr(e){let t=wt.parse(e),r=sc.sanitize(t);return oc(r)}function Er(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function En(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ao(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var $c={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},O_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},P_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,D_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function br(e){return!!e&&typeof e=="object"}function Ta(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ca(e,t){let r=Ta(e),n=Ta(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function xc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>br(s)&&typeof s.text=="string"?s.text:"").join(""):br(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function M_(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:$c[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ta(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ca(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=Ca(br(l)?l.old_string:"",br(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ra(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function La(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=P_.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:D_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function N_(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(br(o)){if(o.type==="text"&&typeof o.text=="string")s.push(La(o.text));else if(o.type==="thinking"){let a=Ra(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=M_(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(br(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=xc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function q_(e){let t=typeof e.command=="string"?e.command:"",r=xc(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",r].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:$c.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function F_(e){if(e.type==="item.completed"&&br(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[La(t.text)];if(t.type==="reasoning"){let r=Ra(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[q_(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function j_(e){if(e.schema!=="codex-delegation-monitor-v1"||!br(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&br(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[La(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let l=Ra(r.text);return l?[l]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=O_[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function B_(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function U_(e){let t=e;if(typeof e=="string"){let r=e.trim();if(r.length===0)return null;try{t=JSON.parse(r)}catch{return null}}return br(t)?t:null}function Ac(){let e=new Map;return{push(t){let r=U_(t);return r?r.schema==="codex-delegation-monitor-v1"?j_(r):B_(r)?F_(r):N_(r,e):[]}}}function Ia(e){let t=[],r=Ac(),n=Array.isArray(e)?e:[];for(let s of n)for(let o of r.push(s))t.push(o);return t}var W_=5,z_=10,H_=/Task\s+#(\d+)/,G_=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,K_=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function io(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function V_(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Y_(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Z_(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=H_.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Q_(e){if(e.tool==="Bash"){let t=e.command||"";return G_.test(t)?"~ PR/\uAC8C\uC2DC \uC911":K_.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function X_(e){let t=e.filter(s=>s.kind==="tool").slice(-z_),r=new Map;t.forEach((s,o)=>{let a=Q_(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function J_(e){let t=Y_(e);if(t)return{text:t,guess:!1};let r=Z_(e);if(r)return{text:r,guess:!1};let n=X_(e);return n?{text:n,guess:!0}:null}function em(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:ir(e,t)}function Tn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,l=null,c=null,u=!1,d={},p=!0,m=new Set,v=new Set,C=null,F=null,H=!1,re=!1,V=!1,q=null,O=null;function P(){H=!1,re=!1,V=!1,q=null,O=null}async function L(Y){if(r){re=!0,V=!1,M();try{let Z=await Promise.resolve(r("get-attempt-prompt",{attempt_id:Y,...c?{root_dir:c}:{}}));if(o!==Y)return;!Z||typeof Z!="object"||Array.isArray(Z)?V=!0:(q=Z,O=Y)}catch{o===Y&&(V=!0)}finally{o===Y&&(re=!1,M())}}}function $(){if(H=!H,H&&o&&O!==o){L(o);return}M()}function D(){if(!H)return"";let Y=En({loading:re,error:V});if(Y)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!q)return"";if(q.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Z=ao(q.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Z?i`<div class="prompt-block__meta">${Z} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?Er("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?Er("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function K(){if(!l||!n)return[];let Y=n.get(l);return Ia(Y?Y.lines:[])}function pe(){if(!l||!n)return null;let Y=n.get(l),Z=Y?Y.last_event_at:null;return typeof Z=="number"?Z:null}function _e(){return d.status==="running"}function me(){if(_e()&&o){F||(F=setInterval(()=>M(),1e3));return}ae()}function ae(){F&&(clearInterval(F),F=null)}function Le(Y){let Z=[],Se=0;for(;Se<Y.length;){let Ze=Y[Se];if(Ze.kind==="tool"){let je=Se;for(;je<Y.length&&Y[je].kind==="tool"&&Y[je].tool===Ze.tool;)je+=1;if(je-Se>=W_&&!v.has(Se)){Z.push({kind:"group",idx:Se,tool:Ze.tool||"",lines:Y.slice(Se,je).map((rt,Qe)=>({idx:Se+Qe,line:rt}))}),Se=je;continue}}Z.push({kind:"line",idx:Se,line:Ze}),Se+=1}return Z}function Te(Y){for(let Z=Y.length-1;Z>=0;Z-=1){let Se=Y[Z];if(Se.kind==="result"||Se.kind==="error")return null;if(Se.kind==="tool"&&!Object.hasOwn(Se,"result"))return Se}return null}function ne(Y){for(let Z=Y.length-1;Z>=0;Z-=1)if(Y[Z].kind==="thinking")return Y[Z];return null}function se(Y,Z){if(Z.kind==="gate")return i`<div class="sv__gate">${Z.text}</div>`;if(Z.kind==="phase")return i`<div class="sv__phase">${Z.text}</div>`;if(Z.kind==="result")return i`<div
        class="sv__result${Z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Pr(Z.text||(Z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Z.kind==="thinking"){let Se=m.has(Y);return i`<div
        class="sv__think${Se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>$e(Y)}
      >
        <span class="sv__think-line">💭 ${io(Z.text)}</span>
        ${Se?i`<pre class="sv__think-expand">${Z.text}</pre>`:""}
      </div>`}if(Z.kind==="error")return i`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="blocker")return i`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="tool"){let Se=m.has(Y),Ze=Z.tool==="Bash"?V_(Z.command):0,je=Z.tool==="Bash"?Ze>1?io(Z.command):Z.command:Z.path||Z.command||"";return i`<div
        class="sv__tool${Se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>$e(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Z.icon}</span>
          <span class="sv__tool-name">${Z.tool}</span>
          ${je?i`<span class="sv__tool-detail">${je}</span>`:""}
          ${Ze>1?i`<span class="sv__tool-more">⋯ ${Ze}줄</span>`:""}
          ${typeof Z.added=="number"?i`<span class="sv__diff-add">+${Z.added}</span>`:""}
          ${typeof Z.removed=="number"?i`<span class="sv__diff-del">−${Z.removed}</span>`:""}
          ${Z.result?i`<span class="sv__tool-ok">→ ${Z.result}</span>`:""}
        </span>
        ${Se?i`<pre class="sv__tool-expand">${we(Z)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${Pr(Z.text||"")}</div>`}function we(Y){let Z=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)Z.push(Y.command);else if(Y.input!==void 0)try{Z.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&Z.push(`output:
${Y.output}`),Z.join(`

`)}function A(){if(!o)return i``;let Y=K(),Z=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),Se=d.session_id||"",Ze=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,je=_e(),rt=je?em(pe(),Date.now()):"",Qe=je?Te(Y):null,yt=je?ne(Y):null,Ie=J_(Y);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Ie?i`<span
              class="sv__stage${Ie.guess?" sv__stage--guess":""}"
              title=${Ie.text}
              >${Ie.text}</span
            >`:""}
        ${je?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${rt?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${rt}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${rt?i`<span class="sv__live-ago">${rt}</span>`:""}</span
            >`:""}
        ${Se?i`<button
              type="button"
              class="sv__session"
              title=${Se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Se}`}
              @click=${()=>Oe(Se)}
            >
              ⧉ ${Se.slice(0,8)}
            </button>`:""}
        ${Z?i`<span class="sv__meta">${Z}</span>`:""}
        ${d.worktree?i`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":i`<button
              type="button"
              class="sv__prompt-toggle${H?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${H?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${$}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Ze}
          @click=${ge}
        >
          <span class="sv__follow-full">⇣ ${Ze}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>tt()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":D()}
      <div class="sv__body">
        ${Y.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:Le(Y).map(T=>T.kind==="group"?ue(T):se(T.idx,T.line))}
      </div>
      ${Qe||yt?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Qe?i`<span class="sv__now-icon">${Qe.icon}</span>
                  <span class="sv__now-name">${Qe.tool}</span>
                  <span class="sv__now-detail"
                    >${Qe.tool==="Bash"?io(Qe.command):Qe.path||Qe.command||""}</span
                  >`:""}
            ${yt?i`<span class="sv__now-think"
                  >💭 ${io(yt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ue(Y){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>E(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function E(Y){v.add(Y),M()}function M(){Ve(A(),e),me(),p&&ce()}function ce(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function $e(Y){m.has(Y)?m.delete(Y):m.add(Y),M()}function ge(){p=!p,M()}function Oe(Y){tr(Y).then(Z=>{Z?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _t(Y){!o||!Y||(d={...d,...Y},M())}function He(Y){let Z=Y.target;if(!Z||!Z.classList||!Z.classList.contains("sv__body"))return;!(Z.scrollHeight-Z.scrollTop-Z.clientHeight<=4)&&p&&(p=!1,M())}e.addEventListener("scroll",He,!0);function pt(Y){let Z=Y&&Y.attempt_id;if(!Z)return;let Se=l;o=Z,a=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,l=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&Se&&Se!==l&&Promise.resolve(r("unsubscribe-session-log",{id:Se})).catch(()=>{}),c=typeof Y.root_dir=="string"&&Y.root_dir.length>0?Y.root_dir:null,d=Y.meta||{},u=Y.hide_prompt===!0,p=!0,m.clear(),v.clear(),P(),!C&&n&&(C=n.subscribe(M)),r&&Promise.resolve(r("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),M()}function tt(){let Y=l;o=null,a=null,l=null,c=null,u=!1,m.clear(),v.clear(),P(),ae(),r&&Y&&Promise.resolve(r("unsubscribe-session-log",{id:Y})).catch(()=>{}),Ve(i``,e),s&&s()}return{open:pt,updateMeta:_t,close:tt,isOpen(){return o!==null},destroy(){ae(),C&&(C(),C=null),e.removeEventListener("scroll",He,!0),o=null,a=null,l=null,c=null,u=!1,Ve(i``,e)}}}function lo(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Oa(t.spec_id),s=Oa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Oa(e){return typeof e=="string"?e.trim():""}function Sc(e){let t=lo(e);if(t.path)return t;let r=Oa(tm(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function tm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function rm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function nm(e){let t=e&&e.metadata||{},r=Sc(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:rm(t)?null:"plan_pending"}),n}function Ec(e,t){let r=nm(e);return i`
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
  `}var sm="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",om=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,am=/^\*\*결론\*\* — (.+)$/;function co(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==sm)return null;let r=om.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?am.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Tc=20;function Cc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function im(e){return e.length>Tc?`${e.slice(0,Tc)}\u2026`:e}function lm(e,t,r,n){let s=`${t.lane} ${im(t.identifier)}`;return i`<div class="detail-report">
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
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${Pr(t.body)}
        </div>`:""}
  </div>`}function cm(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
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
  </div>`}function Rc(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=co(typeof c.text=="string"?c.text:"");return u?lm(c,u,t,s.has(c.id)):cm(c)})}
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
  `}var{I:pv}=Zi;var Lc=e=>e.strings===void 0;var um={},Ic=(e,t=um)=>e._$AH=t;var nn=Xs(class extends Sn{constructor(e){if(super(e),e.type!==Ar.PROPERTY&&e.type!==Ar.ATTRIBUTE&&e.type!==Ar.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Lc(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===or||t===Pt)return t;let r=e.element,n=e.name;if(e.type===Ar.PROPERTY){if(t===r[n])return or}else if(e.type===Ar.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return or}else if(e.type===Ar.ATTRIBUTE&&r.getAttribute(n)===t+"")return or;return Ic(e),t}});var uo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Da=[...uo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Tr=["orchestration_model","orchestration_effort","orchestration_speed"],po=[...uo,...Tr],dm=Da.filter(e=>po.includes(e)),Oc=["delegated","main"],fo=["inherit","claude","codex"],ns=["default","fast"],ss=["standard","fast_track"],os=["codex","opus","fable","self","skip"],_o=["codex","fable","skip"],mo=["low","medium","high","xhigh"],nr="auto";function rr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Pc(e){if(!rr(e)||!rr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))rr(n)&&rr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Cn(e,t){let r=Pc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[nr,...n.flatMap(([,s])=>s)]}function Dc(e,t,r,n){if(!rr(e)||!rr(e.runners))return[nr];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!rr(a)||!rr(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[l,c]of Object.entries(a.models)){if(r&&r!==nr&&l!==r)continue;let u=n(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[nr,...s]}function Rn(e,t,r){return Dc(e,t,r,(n,s)=>rr(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function Ma(e,t,r){return Dc(e,t,r,(n,s)=>rr(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:rr(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function as(e,t){let r=Pc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Mc(e,t,r){let n={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:n.impl_runtime==="inherit"?r:null;return s&&(n.impl_model&&!Cn(t,s).includes(n.impl_model)&&(n.impl_model=void 0),n.impl_effort&&!Rn(t,s,n.impl_model||nr).includes(n.impl_effort)&&(n.impl_effort=void 0)),n}var pm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Pa=[...dm,...Tr],fm=[...po,...Da].filter((e,t,r)=>r.indexOf(e)===t&&!Pa.includes(e));function Nc(e,t){let r=rr(e)?e:{},n=rr(t)?t:{},s=[];for(let a of Pa){let l=r[a]??null,c=n[a]??null;l!==c&&s.push({key:a,label:pm[a]||a,before:l,after:c,kind:l===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...fm,...Object.keys(n)])!Pa.includes(a)&&!o.includes(a)&&Object.hasOwn(n,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Na(e,t,r,n,s,o){return Gs({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function qc(e,t){let r={};for(let n of Da){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Fc(e,t){let r={};for(let n of Tr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var qa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Tr]}],Dr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},go={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Fa(e,t,r,n,s,o=null){let a=Qt({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(l=>({key:l,...a[l]}))}function jc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let l of Fa(e,t,r,n,s,o))a[l.source]+=1;return a}function Bc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Uc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var $v=[...uo,...Tr];var _m=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],mm={pin:"pin",global:"global",base:"base"};function gm(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${mm[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function hm(e,t,r){switch(e){case"workflow_mode":return ss;case"spec_review_model":case"impl_review_model":return os;case"plan_review_model":return _o;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return mo;case"impl_dispatch":return Oc;case"impl_runtime":return fo;case"impl_model":return Cn(r,t.impl_runtime);case"impl_effort":return Rn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ns;case"orchestration_model":return as(r,null);case"orchestration_effort":return Rn(r,void 0,t.orchestration_model||nr).filter(n=>n!==nr);default:return[]}}function bm(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${gm(e.source)}
    <span class="detail-effective__k"
      >${Dr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${go[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Dr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Wc(e,t){let r=qa.flatMap(c=>c.keys),n=Fa(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=jc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(c=>[c.key,c])),a=Object.fromEntries(n.filter(c=>c.value!==null).map(c=>[c.key,c.value])),l=n.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return i`<details
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
        >${ym(o)}</span
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
          ${qa.map(c=>i`
              <div class="detail-effective__subhead">${c.label}</div>
              ${n.filter(u=>c.keys.includes(u.key)).map(u=>{let d=Gs({key:u.key,choices:hm(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return bm(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
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
  </details>`}function ym(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function vm(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function zc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",l=vm(r.exec_receipt),c=l?Jr(l):a,u=l?`${l.kind}:${l.actor}`:a.split("@")[0],d=zs(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${_m.map(p=>{let m=p.receipt&&typeof t[p.receipt]=="string"?String(t[p.receipt]):"",v=n[p.id],C=m.length>0||v?.fill==="full",F=!C&&v?.fill==="dim",H=v?.stale===!0;return i`<span
          class=${`detail-summary__gate${C?" detail-summary__gate--on":""}${F?" detail-summary__gate--current":""}${H?" detail-summary__gate--stale":""}`}
          data-gate=${p.id}
        >
          <span class="detail-summary__gate-pill">${p.label}</span>
          ${m?i`<span class="detail-summary__gate-sha"
                >${m.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Vc(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Hc(e){return Vc(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Gc(e,t){let r=e&&e[t];if(!Vc(r)||!Array.isArray(r.accounts))return null;let n=r.accounts.filter(Hc),s=Hc(r.active)?r.active:null;return{accounts:n,active:s||n.find(o=>o.active===!0)||null}}function Yc(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function wm(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Yc(e)}${t}`}function Zc(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Yc(e)}`}function km(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Zc({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Kc(e){let t=e.provider_key==="claude"?wm:Zc,r=!!e.provider?.accounts.some(n=>n.key===e.selected);return i`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${n=>e.handlers.onExecChange(e.key,n.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${km(e.provider_key,e.provider)}
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
  </div>`}function Qc({md:e,catalog:t,handlers:r}){let n=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return i`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Kc({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Gc(t,"claude"),selected:n,handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Kc({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Gc(t,"codex"),selected:s,handlers:r})}
    </div>
  </section>`}var Xc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function is(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ho(e){if(!is(e)||!is(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>is(r)&&is(r.models));return t.length>0?t:null}function gr(e,t){let r=ho(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Jc(e,t){return is(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function eu(e,t){let r=ho(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Jc(n,n.models[t]);return[]}function $m(e){let t=ho(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Jc(n,s))r.includes(o)||r.push(o);return r}function xm(e,t){if(!t)return $m(e);let n=ho(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of eu(e,o))s.includes(a)||s.push(a);return s}function tu(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=gr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?eu(t,n.impl_model):xm(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Am(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ru(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c(C){C.key==="Escape"&&s&&(C.preventDefault(),m())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Am(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${l}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Pr(a)}
          </div>
        </div>
      </div>
    `:i``}function d(){Ve(u(),e)}async function p(C,F={}){s=C,o="loading",a="",l="",d();let H=r?r():"";if(!H){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",d();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",d();return}let re="/api/doc?workspace="+encodeURIComponent(H)+"&path="+encodeURIComponent(C);try{let V=await n(re),q=await V.json().catch(()=>({}));if(!V.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&F.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",d();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||V.status)+")",d();return}a=String(q.content||""),o="ready",d()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",d()}}function m(){s=null,Ve(i``,e)}function v(){document.removeEventListener("keydown",c),m()}return{open:p,close:m,destroy:v}}var Sm=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],su="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",bo=["implementation","review-consult"],Em=["running","done","failed","interrupted"],Tm={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Cm(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Rm(e){let t=Wt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=An(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${su}
          >부분 집계</span
        >`:""}`}function nu(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ja(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ba(t):""}function Lm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!bo.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!Em.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Im(e,t){let n=Wt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
    ${ja(t.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
          >${ja(t.completed_at)}</span
        >`:""}
    ${n?i`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Om(e,t,r,n){let s=e.status==="running"?null:t,a=(s?Wt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Ba(e.last_event_at):s?ja(s.completed_at):"";return i`<button
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
    ${l?i`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${a?i`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Pm(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function Dm(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let p=Lm(d);!p||s.has(p.launch_id)||(s.add(p.launch_id),n.push(p))}n.sort((d,p)=>d.started_at-p.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let d of bo){let p=t.roles[d]?.codex;a[d]=p?[...p.legs]:[]}let l=bo.flatMap(d=>a[d]),c=new Set,u=[];for(let d of bo){for(let p of n.filter(m=>m.role===d)){let m=l.find(v=>v.receipt_id===p.launch_id)||null;m&&!Pm(p,m)||(m&&c.add(m.receipt_id),u.push(Om(p,m,e.attempt_id,r)))}for(let p of a[d])c.has(p.receipt_id)||u.push(Im(d,p))}return u}function Mm(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Sm,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Cm(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${su}</span>`:""}
  </div>`}var Nm={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ba(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function qm(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function ou(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let p=typeof u.session_id=="string"&&u.session_id.length>0,m=o.has(u.attempt_id),v=p&&!m,C=p?m?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!v}
      title=${C}
      @click=${F=>{F.stopPropagation(),v&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let p=u.cause_detail,m=p&&typeof p.reason=="string"&&p.reason.length>0?typeof p.command=="string"&&p.command.length>0?`${p.reason} \xB7 ${p.command}`:p.reason:u.cause;return i`<div class="detail-session__cause" title=${m}>
      ${u.cause}
    </div>`},c=u=>{let d=nu(aa(u));if(Wt(d).length===0&&!An(u.usage))return"";let p=s.has(u.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${p?"true":"false"}
      title=${p?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${m=>{m.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${Rm(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let d=aa(u),p=nu(d),m=Wt(p);return i`<div class="detail-session-row">
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
            ${Un(u)?i`<span
                  class="detail-session__resumed"
                  title=${Un(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${en(u)}</span>
            ${m.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${m.length>0?m.map(v=>i`<span
                      class="detail-session__usage"
                      title=${v.tooltip}
                      >${v.label}</span
                    >`):An(u.usage)?i`<span class="detail-session__usage"
                    >${An(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ba(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${qm(u)}
          ${s.has(u.attempt_id)&&u.usage?Mm(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Dm(u,d,t)}
        </div>`})}
    </div>
  `}function au(e,t={}){return i`
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
          ${Fm(e)}
        </div>`:""}
  `}function Fm(e){let t=En(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Er("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=ao(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Er("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Er("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var jm=["open","in_progress","deferred","resolved","closed"],Bm=[0,1,2,3,4];function iu(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,p={},m="",v=!1,C=[],F=!1,H={},re={claude:null,codex:null},V=null,q=0,O=!1,P=!1,L="",$="",D="";function K(){O=!1,P=!1,L="",$="",D=""}function pe(){re={claude:null,codex:null},V=null,q+=1}async function _e(k){try{let X=await fetch(k);if(!X.ok)return null;let I=await X.json();if(!I||typeof I!="object"||!Array.isArray(I.accounts))return null;let Re=I.accounts.filter(lt=>lt!==null&&typeof lt=="object"&&!Array.isArray(lt));return{accounts:Re,active:Re.find(lt=>lt.active===!0)||null}}catch{return null}}async function me(k){V=k;let X=++q,[I,Re]=await Promise.all([_e("/api/claude-usage"),_e("/api/codex-usage")]);X!==q||k!==u||(re={claude:I,codex:Re},xe())}let ae=[],Le=null,Te=null,ne=!1,se="",we=!1,A=0,ue=new Set;function E(){ae=[],Le=null,Te=null,ne=!1,se="",we=!1,A+=1,ue.clear()}async function M(k){if(!s)return;let X=++A;try{let I=await Promise.resolve(s("get-comments",{id:k}));if(X!==A||k!==u)return;ae=Array.isArray(I)?I:[],ne=!1}catch{if(X!==A||k!==u)return;ne=!0}xe()}function ce(){if(!s||!u)return;let k=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Le!==u){Le=u,Te=k,M(u);return}k!==null&&k!==Te&&(Te=k,M(u))}function $e(k){ue.has(k)?ue.delete(k):ue.add(k),xe()}function ge(k){let X=se.trim().length===0;se=k,X!==(k.trim().length===0)&&xe()}async function Oe(){let k=se.trim();if(!s||!u||k.length===0||we)return;let X=u;we=!0,xe();let I=!1;try{let Re=await Promise.resolve(s("add-comment",{id:X,text:k}));Array.isArray(Re)&&Re.length>0&&(I=!0,X===u&&(ae=Re,ne=!1,se="",Te=Re.length))}catch{I=!1}I||he("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),X===u&&(we=!1),xe()}let _t={onToggle:$e,onDraftInput:ge,onSubmit:Oe},He=document.createElement("div");He.className="md-viewer-root",document.body.appendChild(He);let pt=ru(He,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),tt=document.createElement("div");tt.className="session-log-root",document.body.appendChild(tt);let Y=Tn(tt,{transport:s?(k,X)=>Promise.resolve(s(k,X)):void 0,sessionLogStore:c}),Z=!1,Se=!1,Ze=!1,je=null,rt=null,Qe=0;function yt(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function Ie(){Z=!1,Se=!1,Ze=!1,je=null,rt=null,Qe+=1}async function T(k){if(!s)return;let X=++Qe;Se=!0,Ze=!1,xe();try{let I=await Promise.resolve(s("get-bead-prompt",{bead_id:k}));if(X!==Qe)return;!I||typeof I!="object"||Array.isArray(I)?Ze=!0:(je=I,rt=yt(k))}catch{X===Qe&&(Ze=!0)}finally{X===Qe&&(Se=!1,xe())}}function Q(){if(Z=!Z,Z&&u&&rt!==yt(u)){je=null,T(u);return}xe()}function Ee(){if(!a||!u)return[];let k=a.get();return(k&&k.attempts?Object.values(k.attempts):[]).filter(I=>I&&I.bead_id===u).sort((I,Re)=>(Re.started_at||0)-(I.started_at||0)).map(I=>({attempt_id:I.attempt_id,bead_id:I.bead_id,status:I.status,started_at:typeof I.started_at=="number"?I.started_at:null,runner:I.runner||null,model:I.model||null,effort:I.effort||I.observed_effort||null,speed:I.speed||null,session_id:I.session_id||null,resumed_from:I.resumed_from||null,continuation_mode:I.continuation_mode||null,dismissed_at:typeof I.dismissed_at=="number"?I.dismissed_at:null,cause:typeof I.cause=="string"?I.cause:null,cause_detail:I.cause_detail||null,exec_default_preset_id:typeof I.exec_default_preset_id=="string"?I.exec_default_preset_id:null,exec_default_preset_revision:typeof I.exec_default_preset_revision=="number"?I.exec_default_preset_revision:null,exec_values:I.exec_values&&typeof I.exec_values=="object"?I.exec_values:null,usage:I.usage||null,usage_legs:Array.isArray(I.usage_legs)?I.usage_legs:[],delegation_sessions:Array.isArray(I.delegation_sessions)?I.delegation_sessions:[]}))}function ee(){if(!a||!u)return null;let k=a.get();return lr(k&&k.attempts||{},u)}let Ne=new Set;function et(k){Ne.has(k)?Ne.delete(k):Ne.add(k),xe()}function st(k){let X=a?a.get():null,I=X&&X.attempts?X.attempts[k]:null;Y.open({attempt_id:k,meta:I?{runner:I.runner||void 0,model:I.model||void 0,effort:I.effort||void 0,status:I.status||void 0,session_id:I.session_id||void 0}:{}})}function Ye(k,X){let I=a?a.get():null,Re=I&&I.attempts?I.attempts[k]:null,at=(Re&&Array.isArray(Re.delegation_sessions)?Re.delegation_sessions:[]).find(Xe=>Xe&&typeof Xe=="object"&&Xe.launch_id===X);at&&Y.open({attempt_id:k,launch_id:X,meta:{runner:"codex",role:at.role,model:at.model,effort:at.effort,session_id:at.session_id,status:at.status}})}async function ct(k){if(!s||!k)return;let X=await xn();if(X===null)return;let I=()=>{let Xe=a?a.get():null;return Xe&&typeof Xe.revision=="number"?Xe.revision:0},Re=async(Xe={},Je=I())=>await s("worker-attempt-resume",{attempt_id:k,expected_revision:Je,...X!==""?{instructions:X}:{},...Xe}),lt=Xe=>{Xe?.queue&&a?.set&&a.set(Xe.queue)},at=await Re();if(lt(at),at&&at.conflict){let Xe=at.queue&&typeof at.queue.revision=="number"?at.queue.revision:I();at=await Re({},Xe),lt(at)}at=await wr(at,(Xe,Je)=>Re({continuation:Xe,decision_token:Je}),{onResult:lt,refresh:()=>Re()}),at&&at.resumed===!1&&!at.conflict&&at.reason&&he(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${at.reason}`,"error",2400)}let ft={onOpen:st,onOpenDelegation:Ye,onResume:ct,onToggleUsage:et};function ut(){let k=a?a.get():null,X={...H};for(let I of["orchestration_model","orchestration_effort","orchestration_speed"]){let Re=k&&k[I];typeof Re=="string"&&(X[I]=Re)}return X}async function ot(){if(s){try{let k=await Promise.resolve(s("get-session-defaults",{}));H=k&&k.values&&typeof k.values=="object"?k.values:{}}catch{H={}}xe()}}function gt(){let k=a?a.get():null;return k&&k.runner_catalog||null}function U(){let k=a?a.get():null;return k&&typeof k.execution_defaults=="object"?k.execution_defaults:null}function J(){let k=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},I=Qt({pin:{...k,...p},global:ut(),execution_defaults:U(),runner_catalog:gt(),route:typeof k.route=="string"?k.route:null}).orchestration_model.value||"";return gr(gt(),I)}function be(){let k=l?l.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function Ge(k){return k?.compatible===!1}function Me(k){l&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&l.set({revision:k.revision,presets:k.presets})}async function B(){let k=be(),X=k?.presets.find(I=>I.id===m);if(!(!s||!u||!k||!X||Ge(X)||v)){v=!0,C=[],xe();try{let I=await Promise.resolve(s("apply-impl-preset",Uc(u,X.id,k.revision)));if(I&&I.conflict){Me(I),he("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Re=I&&Array.isArray(I.issue)?I.issue[0]:I?.issue;if(I&&I.applied&&Re&&typeof Re=="object"){d=Re,C=Array.isArray(I.skipped_orchestration_keys)?I.skipped_orchestration_keys.filter(lt=>typeof lt=="string"):[];for(let lt of Xc)delete p[lt];he(C.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}I&&I.error==="bd_readback_failed"?he("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):he("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(I){I&&typeof I=="object"&&I.code==="bd_readback_failed"?he("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):he("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{v=!1,xe()}}}let te=null;r&&r.subscribe&&(te=r.subscribe(()=>W()));let ve=null;a&&typeof a.subscribe=="function"&&(ve=a.subscribe(()=>{u&&xe()}));let y=null;l&&typeof l.subscribe=="function"&&(y=l.subscribe(()=>{u&&xe()}));function R(k){k.key==="Escape"&&u&&(k.preventDefault(),n())}document.addEventListener("keydown",R);function W(){if(u){if(r&&typeof r.snapshotFor=="function"){let k=r.snapshotFor("detail:"+u)||[];d=k.find(I=>I&&I.id===u)||k[0]||d}ce(),xe()}}function oe(k){tr(k).then(X=>{X?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ce(k){k.preventDefault(),k.stopPropagation(),u&&oe(u)}function Ae(k,X){k.preventDefault(),k.stopPropagation(),oe(X)}function De(k,X,I){k.preventDefault(),k.stopPropagation(),pt.open(X,{missing_state:I})}function Be(k,X){p[k]=X,xe(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Bc(u,k,X.length===0?null:X))).catch(()=>{he("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function At(k,X){let I=d||{},Re=I.metadata&&typeof I.metadata=="object"?I.metadata:{},lt={};for(let Je of["impl_runtime","impl_model","impl_effort"])lt[Je]=Object.hasOwn(p,Je)?p[Je]:typeof Re[Je]=="string"?Re[Je]:"";lt[k]=X;let at=tu(lt,gt(),J()),Xe={};for(let Je of["impl_runtime","impl_model","impl_effort"])Xe[Je]=p[Je],p[Je]=at[Je]||"";xe(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...at,orchestration_runtime:J()})).then(Je=>{let Ot=Array.isArray(Je)?Je[0]:Je;if(!Ot||typeof Ot!="object"||!Ot.id)throw new Error("implementation target readback failed");d=Ot;for(let Jt of["impl_runtime","impl_model","impl_effort"])delete p[Jt];xe()}).catch(()=>{for(let Je of["impl_runtime","impl_model","impl_effort"])Xe[Je]===void 0?delete p[Je]:p[Je]=Xe[Je];xe(),he("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function vt(k,X,I){if(!s||!u)return!1;try{let Re=await Promise.resolve(s(k,X)),lt=Array.isArray(Re)?Re[0]:Re;return lt&&typeof lt=="object"&&lt.id?(d=lt,!0):(he(I,"error"),!1)}catch{return he(I,"error"),!1}}function h(k){setTimeout(()=>{try{let X=e.querySelector(k);X&&typeof X.focus=="function"&&X.focus()}catch{}},0)}function x(){O=!0,L=d&&d.title||"",xe(),h('.detail-edit__input[data-edit="title"]')}function N(k){L=k.target.value}function j(){O=!1,L="",xe()}function ye(){vt("edit-text",{id:u,field:"title",value:L},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(X=>{X&&(O=!1,L=""),xe()})}function ke(){P=!0,$=d&&d.description||"",xe(),h('.detail-edit__textarea[data-edit="description"]')}function qe(k){$=k.target.value}function ze(){P=!1,$="",xe()}function kt(){vt("edit-text",{id:u,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(X=>{X&&(P=!1,$=""),xe()})}function mt(k,X,I,Re){if(k.key==="Escape"){k.stopPropagation(),I();return}k.key==="Enter"&&(!Re||k.ctrlKey||k.metaKey)&&(k.preventDefault(),X())}function Ft(k){let X=k.target.value;vt("update-status",{id:u,status:X},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>xe())}function Tt(k){let X=Number(k.target.value);vt("update-priority",{id:u,priority:X},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>xe())}function Nt(k){D=k.target.value}function nt(){let k=D.trim();k.length!==0&&vt("label-add",{id:u,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(X=>{X&&(D=""),xe()})}function zt(k){if(k.key==="Escape"){k.stopPropagation(),D="",xe();return}k.key==="Enter"&&(k.preventDefault(),nt())}function Fe(k){vt("label-remove",{id:u,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>xe())}let S={onCopyPath:Ae,onOpenDoc:De};function de(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function Pe(k){switch(k&&typeof k=="object"?String(k.dependency_type||k.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function ht(k){let I=(Array.isArray(k.dependencies)?k.dependencies:[]).map(Re=>({id:de(Re),icon:Pe(Re)})).filter(Re=>Re.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${I.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${I.map(Re=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Re.id)}
                  >
                    ${Re.icon?`${Re.icon} `:""}${Re.id}
                  </button>`:i`<span class="detail-dep"
                    >${Re.icon?`${Re.icon} `:""}${Re.id}</span
                  >`)}
          </div>`}
    `}function Dt(k){let X=k.metadata||{},I=k.workflow||{},Re=I.stages||{},lt=Re.spec&&Re.spec.stale,at=Re.impl&&Re.impl.stale,Xe=Re.plan||null,Je=I.route_source==="derived",Ot=I.route||X.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Je?" detail-kv__v--derived":""}"
          title=${Je?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Je?"unset":Ot}</span
        >
      </div>
      ${I.route!=="quick_fix"||Object.hasOwn(X,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${X.spec_review||"\uC5C6\uC74C"}${lt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Xe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Xe?.approval_receipt||"\uC5C6\uC74C"}${Xe?.approval_state==="stale"?" \xB7 stale":Xe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${I.route!=="quick_fix"||Object.hasOwn(X,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${X.impl_review||"\uC5C6\uC74C"}${at?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${I.planned_execution.kind}</span>
            </div>
            ${I.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${I.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${I.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Jr(I.exec_receipt)}</span
            >
          </div>`:""}
      ${I.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${I.impl_entry.actor}@${I.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${X.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${X.pr_url}</span>
          </div>`:""}
    `}let $t={route:["quick_fix","spec_backed","full_plan"]};async function Mt(k,X){let I=X.target.value;if(k==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&I!=="full_plan"&&!window.confirm(`full_plan \u2192 ${I||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){xe();return}await vt("update-workflow-meta",{id:u,key:k,value:I},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),xe()}function f(k){let X=k.metadata||{};return i` ${((Re,lt)=>{let at=$t[Re],Xe=typeof X[Re]=="string"?X[Re]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${Re}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Re}
          data-edit=${`wfmeta-${Re}`}
          @change=${Je=>Mt(Re,Je)}
        >
          <option value="" ?selected=${!at.includes(Xe)}>
            ${lt}
          </option>
          ${at.map(Je=>i`<option value=${Je} ?selected=${Xe===Je}>${Je}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function w(k,X){return O?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${L}
            @input=${N}
            @keydown=${I=>mt(I,ye,j,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ye}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${j}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        ${Wt(X).map(I=>i`<span class="detail-usage-total" title=${I.tooltip}
              >${I.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${x}
        >
          ✎
        </button>
      </div>
    `}function G(k){let X=Ht(k.created_at),I=Ht(k.updated_at);return!X&&!I?i``:i`
      ${X?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${X}</span>
          </div>`:""}
      ${I?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
    `}function _(k,X){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ft}
        >
          ${jm.map(I=>i`<option value=${I} ?selected=${I===k}>${I}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Tt}
        >
          ${Bm.map(I=>i`<option value=${String(I)} ?selected=${I===X}>
                P${I}
              </option>`)}
        </select>
      </div>
    `}function b(k){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${P?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ke}
            >
              ✎
            </button>`}
      </div>
      ${P?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${qe}
              @keydown=${X=>mt(X,kt,ze,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${kt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ze}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function le(k){let X=typeof k.notes=="string"?k.notes:"";return X.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${X}</div>
    `}function ie(k){let X=Array.isArray(k.labels)?k.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${X.map(I=>i`<span class="detail-label-chip"
              >${I}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${I}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+I}
                @click=${()=>Fe(I)}
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
            @input=${Nt}
            @keydown=${zt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${nt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ue(){if(!u)return i``;let k=d||{},X=String(k.id||u),I=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Re=ee(),lt=k.status||"open",at=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",Xe=k.description||"",Je={...k,metadata:{...k.metadata||{},...p}};return i`
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
              ${X}
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
          ${w(I,Re)}
          ${zc(Je)}
          ${Wc({metadata:Je.metadata,workspace_values:ut(),catalog:gt(),execution_defaults:U(),expanded:F,presets:be()?.presets||[],preset_id:m,preset_busy:v,skipped_orchestration_keys:C},{onToggle:Ot=>{F=Ot,xe()},onEdit:(Ot,Jt)=>{if(Ot==="impl_runtime"||Ot==="impl_model"||Ot==="impl_effort"){At(Ot,Jt??"");return}Be(Ot,Jt??"")},onPresetSelect:Ot=>{m=Ot,C=[],xe()},onPresetApply:()=>{B()}})}
          ${Qc({md:Je.metadata,catalog:re,handlers:{onExecChange:Be}})}
          ${_(lt,at)} ${G(k)}
          ${b(Xe)}
          ${Rc(ae,_t,{expanded:ue,draft:se,sending:we,error:ne})}
          ${le(k)} ${ie(k)} ${ht(k)}
          ${Dt(k)} ${f(k)}
          ${Ec(k,S)}
          ${au({expanded:Z,loading:Se,error:Ze,data:je},{onToggle:Q})}
          ${ou(Ee(),ft,{total:Re,expanded:Ne})}
        </div>
      </div>
    `}function xe(){Ve(Ue(),e)}return{load(k){k!==u&&(p={},m="",C=[],F=!1,K(),E(),Ie(),pe()),u=k,d=null,W(),ot(),V!==k&&me(k)},clear(){u=null,d=null,p={},m="",v=!1,C=[],F=!1,K(),E(),Ie(),pe(),pt.close(),Y.close(),Ve(i``,e)},destroy(){te&&(te(),te=null),ve&&(ve(),ve=null),y&&(y(),y=null),document.removeEventListener("keydown",R),pt.destroy(),He.parentNode&&He.parentNode.removeChild(He),Y.destroy(),tt.parentNode&&tt.parentNode.removeChild(tt),u=null,d=null,pe(),m="",v=!1,C=[],E(),Ie(),Ve(i``,e)}}}function lu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,p="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=d||"An unrecoverable error occurred.");let m=typeof p=="string"?p.trim():"";if(s&&(m.length>0?(s.textContent=m,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function yo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function cs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function vo(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,l=o.finished_at;typeof a!="number"||typeof l!="number"||!Number.isFinite(a)||!Number.isFinite(l)||l<a||(r+=l-a,n=!0)}return n?r:null}function wo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Um(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:yo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function cu(e,t){let r=Um(e,t);return r?i`<button
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
            title=${r.deploy.at?Ht(r.deploy.at):""}
            >${wo(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${cs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Ln(e){let t=ir(e.created_at),r=ir(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Wm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function us(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ko(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function yr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,m)=>(p.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?Wm(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:d}}function ls(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var zm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function uu(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function l(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:zm[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function $o(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let r=t.pin===!0?" exec-chip--pin":"",n=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return i`${e.orchestration?i`<span
        class="exec-chip exec-chip--orch${r}"
        title=${`${e.orchestration.title}${n}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?i`<span
        class="exec-chip exec-chip--worker${r}"
        title=${`${e.worker.title}${n}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function xo(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],n=Array.isArray(e.warnings)?e.warnings:[];return t.length===0&&r.length===0&&n.length===0?"":i`<div class="worker-deps">
    ${t.map(s=>i`<span class="worker-dep worker-dep--pred" title=${s.title||""}
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
        >`)}${r.map(s=>i`<span class="worker-dep worker-dep--succ" title=${s.title||""}
          >${s.label}</span
        >`)}${n.map(s=>i`<span class="worker-dep worker-dep--warn">${s}</span>`)}
  </div>`}function Hm(e){let t=Array.isArray(e.badges)?e.badges:[],r=Wt(e.usage),n=$r(e.usage),s=ir(e.done_at);return i`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s?i`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>i`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${r.length>0?r.map(o=>i`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):n?i`<span class="worker-usage" title=${Hn(e.usage)}
              >${n}</span
            >`:""}
      ${typeof e.work_ms=="number"?i`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${cs(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function In(e){if(e.lane==="done"&&e.done_layout==="three_line")return Hm(e);let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Wt(e.usage),s=$r(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?ir(e.done_at):"",u=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",p=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",m=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",v=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,C=i`<span class="worker-mini__title">${e.title}</span>`,F=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",H=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",re=r.map(we=>we===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${we}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${we===e.completion_badge&&e.completion_title||""}
          >${we}</span
        >`),V=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",q=n.length>0?n.map(we=>i`<span class="worker-usage" title=${we.tooltip}
              >${we.label}</span
            >`):s?i`<span class="worker-usage" title=${Hn(e.usage)}
            >${s}</span
          >`:"",O=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",P=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",L=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",$=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",D=e.discard,K=D?.action||e.discard_action?i`<button
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
        </button>`:"",pe=e.stale_work||null,_e=pe?i`${pe.can_resume||pe.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${pe.action_id}
            ?disabled=${pe.locked}
          >
            기존 작업 이어가기
          </button>`:""}${pe.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${pe.action_id}
            ?disabled=${pe.locked}
          >
            백업 후 새로 시작
          </button>`:""}${pe.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${pe.action_id}
            ?disabled=${pe.locked}
          >
            다시 확인
          </button>`:""}`:"",me=pe?i`<div class="worker-mini__stale">
        <strong>${pe.title}</strong>
        <span>${pe.summary}</span>
        <span>${pe.cause}</span>
        ${pe.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ae=e.revise_action?i`<button
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
        </button>`:"",Le=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?i`<div class="worker-mini__exec">
          ${$o(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Te=xo(e.dependency_chips),ne=ls(e),se=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||D?.operation||e.revise_action||pe);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${m}${v}${C}</div>
          <div class="worker-mini__row2">
            ${q}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${cs(e.work_ms)}</span
                >`:""}${re}${O}
            <span class="worker-mini__actions"
              >${P}${L}${$}${K}</span
            >
            ${Ln(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${d}${m}${v}${F}${H}${re}${p}${V}
            </div>
            <div class="worker-mini__body">${C}${me}</div>
            ${Te}${Le}${se?i`<div class="worker-mini__foot">
                  ${q}${O}
                  <span class="worker-mini__actions"
                    >${P}${L}${$}${K}${ae}${_e}</span
                  >
                  ${ls(e)}
                </div>`:""}
            ${Ln(e)}`:i`<div class="worker-mini__line">
              ${u}${d}${m}${v}${C}${F}${H}${re}${p}${V}${q}${O}${P}${L}${$}${K}
            </div>
            ${Te}${Le}${ne} ${Ln(e)}`}
  </div>`}function Ua(e,t=null,r={}){let n=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!n,o=s&&t&&t.bead_id===e.id,a=e.workflow,l=a&&a.chips||{},c=l.route||a&&a.route,u=l.route_source==="derived"||!!(a&&a.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=xo(e.dependency_chips);return i`<div
    class="worker-card${s?"":" worker-card--static"}${n?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?i`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?i`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${n?i`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${a&&c?i`<span
            class="ctl-chip ctl-chip--route${u?" is-derived":""}"
            title=${u?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${u?"unset":c}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?vn(a,e.status):""}${m}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?i`<div class="worker-mini__exec">
          ${$o(e.exec_chips,{pin:r.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?i`<div class="worker-card__place-menu">
            ${t.lanes.map(v=>i`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${v.id}
                  title="${v.label} 대기 맨 뒤에 추가"
                >
                  <span>${v.label}</span>
                  <span class="worker-card__place-count">${v.count}</span>
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
    ${Ln(e)}
  </div>`}function sr(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Ua(n,e.place_menu):In(n))}
          </div>`}
  </section>`}var du={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},pu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function fu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Wa(e){for(let t of fu(e))if(Object.hasOwn(du,t))return du[t];return null}function za(e){let t=null;for(let r of fu(e))Object.hasOwn(pu,r)&&(t=pu[r]);return t}function Ao(e){let t=Wa(e),r=za(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function _u(e,t){let r=Wa(e)??Wa(t),n=za(t)??za(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var mu=160;function Gm(e){return e.length>mu?`${e.slice(0,mu)}\u2026`:e}function Km(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Gm(e.command)}</code>`:""}
  </div>`}function Vm(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Ym(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function gu(e){let t=e.failure?Ao(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${Km(e.failure.cause_detail)}
          ${Vm(e.failure.reason)}
          ${ls({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Zm(e){return e?i`${e.repo?i`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?i`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}function Qm(e,t,r){if(!e)return"";let n=e.workflow||null,s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,l=Array.isArray(e.legs)?e.legs:[],c=l.filter(p=>p&&p.state==="live"),u=l.filter(p=>p&&p.state!=="live"),d=xo(e.dependency_chips);return i`${n?vn(n,"in_progress"):""}
  ${o?i`<div class="rtile__activity${r?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?i`<span class="rtile__activity-age"
              >${ir(a,t)}</span
            >`:""}
      </div>`:""}${c.length>0||u.length>0?i`<div class="rtile__legs">
        ${c.map(p=>i`<span class="rtile__leg rtile__leg--live"
              >⟳ ${p.label}</span
            >`)}${u.length>0?i`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(p=>p.label).join(", ")}`}
              >✓ ${u.length}</span
            >`:""}
      </div>`:""}${d}`}function Ha(e,t,r=null,n={}){let s=e.failed===!0,o=!!e.paused,a=s?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):o?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ym(t-e.started_at):"\u2014",l=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,c=Un(e),u=Wt(e.usage),d=$r(e.usage),p=e.conflict_resolution?o?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,v=e.landing,C=e.attempt_id&&e.attempt_id===r,F=n.monitor||null,H=Zm(F),re=Qm(F,t,o),V=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${C?" rtile--sel":""}${o?" rtile--paused":""}${s?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${H}${c?i`<span class="rtile__resumed" title=${c}>↻</span>`:""}
      <span class="rtile__elapsed">${a}</span>
      ${s?i`<button
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
            </button>`:i`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${o?i`<button
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
            ${V}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${re}${e.rollup?Ws(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ra}):""}
    ${v?i`<div class="rtile__landing">
          <span
            class="merge-step${v.failed?" merge-step--failed":""}"
            style=${`--progress: ${v.percent}%`}
            >${v.label}${v.index>0?i`<span class="merge-step__n"
                  >${v.index}/${v.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${l||u.length>0||d||p||m?i`<div class="rtile__meta">
          ${p?i`<span class="worker-mini__badge">${p}</span>`:""}
          ${m?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${$o(e.exec_chips)}
          ${u.length>0?u.map(q=>i`<span class="worker-usage" title=${q.tooltip}
                    >${q.label}</span
                  >`):d?i`<span
                  class="worker-usage"
                  title=${Hn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${Ln(e)} ${ls(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${s||o?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ga(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Ha(s,t,r))}
  </div>`}function Ka(e,t){return`${e}\0${t}`}function Va(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function Ya(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Xm(e,t){return e==="internal"&&t===void 0}function On(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function hu(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${On(s)})`,location_label:On(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Ya(e,n),l=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:a,same_lane_ahead:!1,missing_internal:Xm(a,s)}}function bu(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let l of t)for(let c of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ka(l.root_dir,c.id);r.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])n.set(d.id,u)}for(let l of t)for(let c of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ka(l.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,m=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],v=s.get(u);if(v)for(let C of m){let F=n.get(C);F&&F!==u&&!v.includes(F)&&v.push(F)}}let o=(l,c)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===c)return!0;!p||u.has(p)||(u.add(p),d.push(...s.get(p)||[]))}return!1},a=new Map;for(let[l,c]of s){let u=[];for(let d of c){let p=r.get(d);o(d,l)&&p&&u.push(p)}u.length>0&&a.set(l,u)}return a}function yu(e){let t=Va(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=On(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function vu(e,t){return Ka(e,t)}var Za=new Set(["unavailable","not_applicable"]);function Mr(e,t){if(typeof e!="object"||e===null)return null;let r=e[t];return typeof r=="object"&&r!==null?r:null}function wu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Nr(e,t){return t===null?null:`${Dr[e]}: ${t.display} (${go[t.source]})`}function Qa(e){return e.filter(t=>t!==null).join(`
`)}function So(e){if(typeof e!="object"||e===null)return null;let t=en(e);if(t==="")return null;let r=(n,s)=>typeof s=="string"&&s.length>0?`${n}: ${s}`:null;return{text:t,title:Qa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",r("runner",e.runner),r(Dr.orchestration_model,e.model),r(Dr.orchestration_effort,e.effort),r(Dr.orchestration_speed,e.speed)])}}function sn(e,t){let r=Mr(e,"orchestration_model");if(r===null||r.resolution==="unavailable")return null;let n=Mr(e,"orchestration_effort"),s=Mr(e,"orchestration_speed"),o=wu([gr(t,r.value??""),r.display,n!==null&&n.value!==null?n.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Qa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Nr("orchestration_model",r),Nr("orchestration_effort",n),Nr("orchestration_speed",s)])}}function Jm(e,t){return e===null||e.value===null||Za.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function eg(e){return e===null||Za.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function tg(e){return e===null?null:e.value==="auto"?"auto":Za.has(e.resolution)?null:e.display}function qr(e,t){if(typeof e!="object"||e===null)return null;let r=Mr(e,"impl_dispatch"),n=Mr(e,"impl_runtime"),s=Mr(e,"impl_model"),o=Mr(e,"impl_effort"),a=Mr(e,"impl_speed"),l=r!==null&&r.value==="main"?"\uBA54\uC778":wu([Jm(n,t??null),eg(s),tg(o),a!==null&&a.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Qa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Nr("impl_dispatch",r),Nr("impl_runtime",n),Nr("impl_model",s),Nr("impl_effort",o),Nr("impl_speed",a)])}}var Xt="",rg=["impl_runtime","impl_model","impl_effort"],ng=5,Eo=1;function Cr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function To(e,t){let r=t.transport,n=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(T=>he(T,"error",4e3)),o={},a={},l=[],c=!1,u=null,d={},p="",m="",v=!1,C=!1,F=!1,H=null,re=!1;function V(){let T=t.queue?t.queue():null;return Cr(T)?T:null}function q(){let T=V();return T?T.runner_catalog:null}function O(){let T=V();return T&&Cr(T.execution_defaults)?T.execution_defaults:null}function P(){let T=t.implPresetStore?.get();return Cr(T)&&Array.isArray(T.presets)?T:null}function L(){return n===null?{}:{root_dir:n}}async function $(T,Q){return re||!r?null:await r(T,Q)}function D(T){T&&Cr(T.queue)&&t.onQueueAdopt?.(T.queue)}async function K(T,Q){let Ee=V();if(!Ee||re)return null;let ee=await $(T,{...Q,...L(),expected_revision:Ee.revision});if(D(ee),n!==null&&ee&&ee.conflict){let Ne=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:V()?.revision??Ee.revision;ee=await $(T,{...Q,...L(),expected_revision:Ne}),D(ee)}return ee}async function pe(){c=!0,Ie();try{let T=await $("get-session-defaults",{...L()});o=Cr(T?.values)?{...T.values}:{},a={...o},l=Array.isArray(T?.warnings)?T.warnings:[]}catch(T){l=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${T instanceof Error?T.message:String(T)}`)}finally{c=!1,Ie()}}async function _e(){let T=qc(o,a);if(Object.keys(T).length!==0){try{let Q=await $("set-session-defaults",{values:T,...L()});o=Cr(Q?.values)?{...Q.values}:{},a={...o},l=Array.isArray(Q?.warnings)?Q.warnings:[]}catch(Q){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ie()}}function me(T,Q){if(rg.includes(T)){Te(T,Q);return}Q===Xt?delete a[T]:a[T]=Q,Ie(),_e()}function ae(){let T=Qe().orchestration_model,Q=Qt({global:{orchestration_model:T??void 0},execution_defaults:O(),runner_catalog:q()}).orchestration_model.value;return Q?gr(q(),Q):null}function Le(T,Q){typeof Q=="string"&&Q.length>0?a[T]=Q:delete a[T]}function Te(T,Q){let Ee=Q===Xt?void 0:Q,ee=Mc({impl_runtime:T==="impl_runtime"?Ee:a.impl_runtime,impl_model:T==="impl_model"?Ee:a.impl_model,impl_effort:T==="impl_effort"?Ee:a.impl_effort},q(),ae());Le("impl_runtime",ee.impl_runtime),Le("impl_model",ee.impl_model),Le("impl_effort",ee.impl_effort),Ie(),_e()}async function ne(){let T=V();if(!T)return;let Q={orchestration_model:T.orchestration_model??null,orchestration_effort:T.orchestration_effort??null,orchestration_speed:T.orchestration_speed??null},Ee=Fc(Q,{...Q,...d});if(Object.keys(Ee).length!==0){try{let ee=await K("worker-queue-set-orchestration-defaults",{values:Ee});if(ee&&ee.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}d={}}catch(ee){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}Ie()}}function se(T,Q){d[T]=Q===Xt?null:Q,Ie(),ne()}function we(T){if(u=T,!T){Ie();return}let Q=q(),Ee=Qe(),ee=Ee.orchestration_model;ee&&!as(Q,T).includes(ee)&&(d.orchestration_model=null,ee=null);let Ne=Ee.orchestration_effort;Ne&&!Ma(Q,T,ee||nr).includes(Ne)&&(d.orchestration_effort=null),Ie(),ne()}async function A(T){if(!(!V()||T<Eo)){try{await K("worker-queue-set-slots",{slots:T})}catch(Q){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ie()}}async function ue(T){if(!(!V()||T<Eo||T>ng)){try{await K("worker-queue-set-serial-lane-count",{count:T})}catch(Q){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ie()}}async function E(T,Q){let Ee=T==="auto_advance"?"worker-automation-toggle":T==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await K(Ee,{on:Q})}catch(ee){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}Ie()}function M(){let T={},Q=Qe();for(let Ee of po){let ee=Tr.includes(Ee)?Q[Ee]:a[Ee];typeof ee=="string"&&ee.length>0&&(T[Ee]=ee)}return T}async function ce(){let T=P();if(!T)return;let Q=M();if(Object.keys(Q).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let Ee=(T.presets||[]).find(Ne=>Ne.id===p),ee=m.trim()||(Ee?Ee.name:"");if(!ee){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Ne=Ee?await $("impl-preset-update",{expected_revision:T.revision,id:Ee.id,name:ee,settings:Q}):await $("impl-preset-create",{expected_revision:T.revision,name:ee,settings:Q});if(Ne&&Ne.applied){if(m="",!Ee&&Array.isArray(Ne.presets)){let et=Ne.presets.find(st=>st.name===ee);p=et?et.id:p}Ie()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ie()}catch(Ne){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Ne instanceof Error?Ne.message:String(Ne)}`)}}async function $e(){let T=P();if(!(!T||p.length===0))try{let Q=await $("impl-preset-delete",{expected_revision:T.revision,id:p});Q&&Q.applied?(p="",Ie()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ie())}catch(Q){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}}function ge(T){o=Cr(T.values)?{...T.values}:{},a={...o},l=Array.isArray(T.warnings)?T.warnings:[],Cr(T.queue)&&(t.onQueueAdopt?.(T.queue),d={})}async function Oe(){let T=P(),Q=V();if(!T||!Q||p.length===0)return;let Ee=ee=>({preset_id:p,expected_revision:T.revision,expected_queue_revision:ee,...L()});try{let ee=await $("apply-impl-preset-global",Ee(Q.revision));if(ee&&ee.applied&&ge(ee),n!==null&&ee&&ee.queue_applied===!1){let Ne=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:V()?.revision??Q.revision;ee=await $("apply-impl-preset-global",Ee(Ne)),ee&&ee.applied&&ge(ee)}ee&&ee.applied?ee.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ee&&ee.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ee){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}Ie()}async function _t(){C=!0,F=!1,Ie();try{let T=await $("get-worker-system-prompt",{});!T||typeof T!="object"||Array.isArray(T)?F=!0:H=T}catch{F=!0}finally{C=!1,Ie()}}function He(){if(v=!v,v&&!H){_t();return}Ie()}function pt(){let T=En({loading:C,error:F});if(T)return T;if(!H)return"";let Q=Array.isArray(H.variants)?H.variants:[];return i`<div class="settings-dialog__sp-body">
      ${H.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${H.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Q.map(Ee=>i`<div class="settings-dialog__sp-variant" data-variant=${Ee.key}>
            <div class="settings-dialog__sp-cond">${Ee.condition}</div>
            ${Er(Ee.label,Ee.system_prompt)}
          </div>`)}
    </div>`}function tt(){return i`<section
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
        aria-expanded=${v?"true":"false"}
        @click=${He}
      >
        ${v?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${v?pt():""}
    </section>`}function Y(T,Q,Ee,ee,Ne,et,st){let Ye=Ne[T]??Xt,ct=Na(T,Ee,Ne,O(),q(),st),ft=ct.options.find(ot=>ot.value===Ye),ut=Ye===Xt?ct.full_value:ft?.full_value;return i`<select
        class=${Ye===Xt?"settings-dialog__unset":""}
        data-key=${T}
        aria-label=${Q}
        title=${ut||""}
        ?disabled=${et===!0||ct.disabled}
        .value=${nn(String(Ye))}
        @change=${ot=>ee(T,String(ot.target.value))}
      >
        <option value=${Xt} ?selected=${Ye===Xt}>
          ${ct.unset_label}
        </option>
        ${ct.options.map(ot=>i`<option
              value=${ot.value}
              title=${ot.full_value||""}
              ?selected=${ot.value===Ye}
            >
              ${ot.label}
            </option>`)}
      </select>
      ${Ye===Xt?i`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Z(T,Q,Ee,ee,Ne,et=!1,st){return i`<div
      class=${`settings-dialog__row${et?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        ${Y(T,Q,Ee,ee,Ne,et,st)}
      </span>
    </div>`}function Se(T,Q,Ee,ee,Ne){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Q}-on)`}
        ></i>
        ${T}
      </span>
      <span class="settings-dialog__controls">
        ${Y(Ee,`${T} \uBAA8\uB378`,ee,me,a,!1)}
        ${Y(Ne,`${T} effort`,mo,me,a,!1)}
      </span>
    </div>`}function Ze(T,Q,Ee,ee){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ee?" is-on":""}`}
          data-automation=${T}
          aria-pressed=${ee?"true":"false"}
          aria-label=${Q}
          @click=${()=>E(T,!ee)}
        >
          ${ee?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${Ee}</span>
      </span>
    </div>`}function je(T,Q,Ee,ee){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${T}>
          <button
            type="button"
            aria-label=${`${Q} \uAC10\uC18C`}
            @click=${()=>ee(Ee-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${Ee}</span>
          <button
            type="button"
            aria-label=${`${Q} \uC99D\uAC00`}
            @click=${()=>ee(Ee+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function rt(T){return i`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${T.rows.length>0?`\uBCC0\uACBD ${T.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${T.rows.map(Q=>i`<div
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
      ${T.ignored_keys.length>0?i`<div class="settings-dialog__preset-diff-note">
            ${T.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Qe(){let T=V(),Q={};for(let Ee of Tr)Q[Ee]=Object.prototype.hasOwnProperty.call(d,Ee)?d[Ee]:T&&typeof T[Ee]=="string"?T[Ee]:null;return Q}function yt(){let T=q(),Q=a.impl_runtime,Ee=a.impl_model,ee=P(),Ne=V(),et=Qe(),st=as(T,u),Ye=Cn(T,void 0).filter(be=>be!==nr),ct=Ma(T,u,et.orchestration_model||nr).filter(be=>be!==nr),ft=p?(ee?.presets||[]).find(be=>be.id===p):null,ut=ft?Nc(M(),Cr(ft.settings)?ft.settings:{}):null,ot=Ne&&typeof Ne.slots=="number"?Ne.slots:Eo+1,gt=Ne&&typeof Ne.serial_lane_count=="number"?Ne.serial_lane_count:Eo,U=O()?.supported===!0,J=Na("workflow_mode",ss,a,O(),T);return i`
      ${l.length>0?i`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${U?"":i`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${c?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${nn(p)}
                @change=${be=>{p=String(be.target.value),Ie()}}
              >
                <option value="" ?selected=${p===""}>
                  실행 프리셋…
                </option>
                ${(ee?.presets||[]).map(be=>i`<option
                      value=${be.id}
                      ?selected=${be.id===p}
                    >
                      ${be.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ut||ut.rows.length===0}
                @click=${Oe}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${p?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${nn(m)}
                @input=${be=>{m=String(be.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${p?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${ce}
              >
                ${p?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${p.length===0}
                @click=${$e}
              >
                삭제
              </button>
            </div>
            ${ut?rt(ut):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${nn(u||Xt)}
                    @change=${be=>{let Ge=String(be.target.value);we(Ge===Xt?null:Ge)}}
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
              ${Z("orchestration_model","\uBAA8\uB378",st,se,et)}
              ${Z("orchestration_effort","effort",ct,se,et)}
              ${Z("orchestration_speed","\uC18D\uB3C4",ns,se,et)}
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
                      @click=${()=>me("workflow_mode",Xt)}
                    >
                      ${J.unset_label}
                    </button>
                    ${a.workflow_mode?"":i`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ss.map(be=>i`<button
                          type="button"
                          data-mode=${be}
                          aria-pressed=${String(a.workflow_mode===be)}
                          @click=${()=>me("workflow_mode",be)}
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
              ${Se("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",os,"spec_review_effort")}
              ${Se("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",_o,"plan_review_effort")}
              ${Se("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",os,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Z("impl_runtime","\uC704\uC784 \uB300\uC0C1",fo,me,a)}
              ${Z("impl_model","\uBAA8\uB378",Cn(T,Q),me,a)}
              ${Z("impl_effort","effort",Rn(T,Q,Ee),me,a)}
              ${Z("impl_speed","\uC18D\uB3C4",ns,me,a)}
              ${Z("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Ye,me,a,!1,{...a,...et})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ze("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Ne?.auto_advance===!0)}
              ${Ze("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Ne?.auto_merge===!0)}
              ${Ze("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",Ne?.auto_repair===!0)}
              ${je("slots","\uB3D9\uC2DC \uC2E4\uD589",ot,be=>A(be))}
              ${je("serial-lane-count","\uC9C1\uB82C \uB808\uC778",gt,be=>ue(be))}
            </div>
            ${tt()}
          `}
    `}function Ie(){re||Ve(yt(),e)}return{load(){return d={},pe()},render:Ie,sessionDraft:()=>({...a}),destroy(){re=!0,Ve(i``,e)}}}function ds(e){return i`<svg
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
  </svg>`}function ku(){return ds(mn`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function $u(){return ds(mn`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function xu(){return ds(mn`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Au(){return ds(mn`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Su(){return ds(mn`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Eu(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Tu(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Wt(Vs(t));let r={};for(let l of kr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let d of kr){let p=c[d];typeof p=="number"&&Number.isFinite(p)&&(r[d]+=p,n=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?$r(r):null}var Ru="beads-ui.monitor.deck";function sg(){try{let e=window.localStorage.getItem(Ru);if(!e)return{quiet_open:!1};let t=JSON.parse(e);return{quiet_open:!!t&&typeof t=="object"&&t.quiet_open===!0}}catch{return{quiet_open:!1}}}function og(e){try{window.localStorage.setItem(Ru,JSON.stringify(e))}catch{}}function hr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Fr(e,t){let r=hr(e?.counts)?e.counts:null,n=r?r[t]:null;return typeof n=="number"&&Number.isFinite(n)?n:0}function Cu(e){return Fr(e,"running")>0||Fr(e,"queue")>0||Fr(e,"pr_wait")>0||Fr(e,"runnable")>0}function ag(e,t){if(!hr(t))return e;let r={...e};for(let[n,s]of Object.entries(t))s!==void 0&&(r[n]=s);return r}function ig(e){if(!hr(e)||!hr(e.execution_defaults)||!hr(e.runner_catalog)||!hr(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let r=Qt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),n=gr(e.runner_catalog,r.orchestration_model.value??""),s=sn(r,e.runner_catalog),o=qr(r,n);return s===null&&o===null?null:{orchestration:s,worker:o}}function Lu(e,t){let r=t.notify||(E=>he(E,"error",4e3)),n=document.createElement("div");n.className="mon2-deck__main",e.appendChild(n);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",o.append(a,l);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=sg(),d=null,p=null,m=null,v=new Map;function C(){let E=t.workspacesState?t.workspacesState():[];return Array.isArray(E)?E.filter(M=>hr(M)):[]}function F(E){return C().find(M=>M.root_dir===E)||null}function H(E){return ag(F(E),v.get(E))}function re(){for(let E of C()){let M=v.get(E.root_dir);M&&typeof M.revision=="number"&&typeof E.revision=="number"&&E.revision>=M.revision&&v.delete(E.root_dir)}}async function V(E,M,ce){let $e=t.transport,ge=H(M);if(!(!$e||!hr(ge))){try{let Oe=await $e(E,{...ce,root_dir:M,expected_revision:ge.revision});if(hr(Oe?.queue)&&v.set(M,Oe.queue),Oe&&Oe.conflict){let _t=hr(Oe.queue)&&typeof Oe.queue.revision=="number"?Oe.queue.revision:H(M)?.revision;Oe=await $e(E,{...ce,root_dir:M,expected_revision:_t}),hr(Oe?.queue)&&v.set(M,Oe.queue)}}catch(Oe){r(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Oe instanceof Error?Oe.message:String(Oe)}`)}we()}}function q(E){d!==E&&(d=E,t.onFocusChange?.(d),we())}function O(E){q(d===E?null:E)}function P(E){if(p===E){$();return}L(),p=E;let M=F(E);a.textContent=`${M?.name||E} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,m=To(c,{root_dir:E,queue:()=>H(E),transport:t.transport,implPresetStore:t.implPresetStore,notify:r,onQueueAdopt:ce=>{v.set(E,ce),we()}}),m.load(),we()}function L(){m?.destroy(),m=null}function $(E){L(),p=null,s.hidden=!0,a.textContent="",E!==!0&&we()}let D=()=>$();l.addEventListener("click",D);function K(E){E.key==="Escape"&&d!==null&&q(null)}document.addEventListener("keydown",K);function pe(E,M){let ce=Math.max(M,E,1);return i`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${M}\uAC1C \uC911 ${E}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ce},($e,ge)=>ge<E?i`<i class="mon2-deck__slot is-run"></i>`:i`<i class="mon2-deck__slot"></i>`)}
    </span>`}function _e(E){let M=E.auto_advance===!0,ce=E.auto_merge===!0;return i`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${M?" is-on":""}`}
        data-act="auto"
        aria-pressed=${M?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9\uD654`}
        title=${M?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${M?$u():ku()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ce?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ce?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ce?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${xu()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${p===E.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${p===E.root_dir?"true":"false"}
        aria-label=${`${E.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Su()}
      </button>`}function me(E){let M=ig(E);return M?i`<div class="mon2-deck__chips">
      ${M.orchestration?i`<span class="mon2-deck__chip" title=${M.orchestration.title}
            >오케 ${M.orchestration.text}</span
          >`:""}
      ${M.worker?i`<span class="mon2-deck__chip" title=${M.worker.title}
            >워커 ${M.worker.text}</span
          >`:""}
    </div>`:""}function ae(E){let M=Fr(E,"running"),ce=typeof E.slots=="number"?E.slots:1;return i`<div
      class=${`mon2-deck__tile${d===E.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${E.root_dir}
      aria-pressed=${d===E.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${E.root_dir}>${E.name}</span>
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
        ${Au()} ${pe(M,ce)}
        <span class="mon2-deck__counts"
          >${M}/${ce} 실행 · 대기 ${Fr(E,"queue")} · PR
          ${Fr(E,"pr_wait")}</span
        >
      </div>
      <div class="mon2-deck__ops">${_e(E)}</div>
      ${me(E)}
    </div>`}function Le(E){let M=typeof E.slots=="number"?E.slots:1;return i`<div
      class=${`mon2-deck__pill${d===E.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${E.root_dir}
      aria-pressed=${d===E.root_dir?"true":"false"}
    >
      <span class="mon2-deck__name" title=${E.root_dir}>${E.name}</span>
      ${pe(0,M)} ${_e(E)}
      <button
        type="button"
        class="mon2-deck__worker"
        data-act="worker"
        title="이 레포의 Worker 탭으로 이동"
      >
        ↗
      </button>
    </div>`}function Te(E){let M=t.doneItems?t.doneItems():[],ce=t.rangeLabel?t.rangeLabel():"",$e=Tu(Array.isArray(M)?M:[]),ge=Oe=>E.reduce((_t,He)=>_t+Fr(He,Oe),0);return i`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${E.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ce}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${ge("running")} · 대기 ${ge("queue")} · PR ${ge("pr_wait")} ·
        ${ce} 완료 ${Array.isArray(M)?M.length:0}
      </div>
      ${$e===null?"":i`<div class="mon2-deck__total-tokens">
            ${typeof $e=="string"?i`<span
                  class="mon2-deck__tok"
                  title=${Eu(ce)}
                  >τ ${$e}</span
                >`:$e.map(Oe=>i`<span
                      class="mon2-deck__tok"
                      data-provider=${Oe.provider}
                      title=${Oe.tooltip}
                      >τ ${Oe.label}</span
                    >`)}
          </div>`}
    </div>`}function ne(){let E=C();if(E.length===0)return"";let M=E.filter($e=>Cu($e)),ce=E.filter($e=>!Cu($e));return i`<div class="mon2-deck__row">
        ${Te(E)}
        <div class="mon2-deck__strip">
          ${M.map($e=>ae($e))}
        </div>
      </div>
      ${ce.length===0?"":i`<div
            class=${`mon2-deck__quiet${u.quiet_open?" is-open":""}`}
          >
            <button
              type="button"
              class="mon2-deck__quiet-toggle"
              aria-expanded=${u.quiet_open?"true":"false"}
            >
              ${u.quiet_open?"\u25BE":"\u25B8"} 파이프라인 없음
              ${ce.length}
            </button>
            ${u.quiet_open?i`<div class="mon2-deck__pills">
                  ${ce.map($e=>Le($e))}
                </div>`:""}
          </div>`}`}function se(){d!==null&&!F(d)&&(d=null,t.onFocusChange?.(null))}function we(){re(),se(),p!==null&&!F(p)&&$(!0),Ve(ne(),n),m?.render()}function A(E){let M=E.target;if(!M||typeof M.closest!="function")return;if(M.closest(".mon2-deck__quiet-toggle")){u={quiet_open:!u.quiet_open},og(u),we();return}let $e=M.closest("[data-root-dir]");if(!$e)return;let ge=$e.getAttribute("data-root-dir")||"",Oe=M.closest("[data-act]")?.getAttribute("data-act");if(Oe==="worker"){t.gotoWorkerTab?.(ge);return}if(Oe==="auto"){V("worker-automation-toggle",ge,{on:H(ge)?.auto_advance!==!0});return}if(Oe==="merge"){V("worker-merge-auto-toggle",ge,{on:H(ge)?.auto_merge!==!0});return}if(Oe==="gear"){P(ge);return}O(ge)}function ue(E){if(E.key!=="Enter"&&E.key!==" ")return;let M=E.target;if(!M||typeof M.closest!="function")return;let ce=M.closest('[data-root-dir][role="button"]');!ce||ce!==M||(E.preventDefault(),O(ce.getAttribute("data-root-dir")||""))}return n.addEventListener("click",A),n.addEventListener("keydown",ue),{render:we,focusRoot:()=>d,panelRoot:()=>p,destroy(){document.removeEventListener("keydown",K),n.removeEventListener("click",A),n.removeEventListener("keydown",ue),l.removeEventListener("click",D),L(),Ve(i``,n),e.replaceChildren()}}}var Iu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],ps=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Co(e,t){let r=Iu.find(s=>s.step===e);if(!r)return null;let n=Iu.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Ou(e){let t=ps.findIndex(r=>r.step===e);return ps.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function on(e){let t=ps.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function lg(e){let t=ps.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:ps.length}}function Ro(e){let t=lg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ja=new Set(["queued","running","retry_pending","repairing"]),Pu=new Set(["failed","succeeded"]),cg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},fs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},ug={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:fs.base_containment,child_sweep:fs.child_sweep,branch_cleanup:fs.branch_cleanup,parent_close:fs.parent_close};function dg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function pg(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Ja,...Pu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function fg(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let l=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(c)}function Xa(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=cg[s];if(!o)return null;let a=Co(r,`${n} ${o}`);return a?{...a,active:Ja.has(s),failed:s==="failed"}:null}function _g(e){return!e||typeof e!="object"?null:ug[e.step]||null}function _s(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=_g(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),l=dg(e.merge_sha)?e.merge_sha:null,c=!o&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(C=>C&&typeof C=="object"&&pg(C,t,l)).sort(fg):[],u=a?c:[],d=u.find(C=>Ja.has(C.state));if(d)return Xa(d);if(s)return s.step==="repo_operations"&&c[0]?Xa(c[0],!0):null;let p=u.find(C=>Pu.has(C.state)?C.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return Xa(p);if(n){let C=Co(n.step,n.label);return C?{...C,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?fs[e.cleanup_cursor]:null;if(!m)return null;let v=Co(m.step,m.label);return v?{...v,active:!0,failed:!1}:null}function Lo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Du=1,ms=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ei=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Pn={show_blocked:!0,spec:"all"},Mu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Nu={running:3,paused:2,failed:1};function mg(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function gg(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),m=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!m&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let p=Nu[u.run_state],m=Nu[l];if(p>m||p===m&&(u.started_at??0)>(c??0))continue}let d=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:lr(e,a.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!n.has(a.attempt_id)})}return o}function qu(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function hg(e,t,r){let n=Rt(t);if(Object.keys(n).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let l=m=>Qt({pin:m,global:a,execution_defaults:s,runner_catalog:o,route:r}),c,u;try{c=l(n),u=l(null)}catch{return null}let d=Fu(sn(c,o),sn(u,o)),p=Fu(qr(c,null),qr(u,null));return d||p?{orchestration:d,worker:p}:null}function Fu(e,t){return!e||t&&t.text===e.text?null:e}function bg(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function yg(e,t){let r=t.get(e);return r?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${On(r)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function vg(e,t,r){let n=new Map;for(let c of e)n.set(c,Array.from(r.get(c)||[]).filter(u=>e.includes(u)).length);let s=[],o=new Map,a=e.filter(c=>(n.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let l=[...a];for(;l.length>0;){let c=l.shift();s.push(c);let u=Array.from(t.get(c)||[]).filter(p=>e.includes(p)).sort(),d=(o.get(c)||0)+(u.length>1?1:0);for(let p of u){let m=(n.get(p)||0)-1;n.set(p,m);let v=o.get(p);o.set(p,v===void 0?d:Math.min(v,d)),m===0&&l.push(p)}}return{order:s,indent:o,cycle:s.length!==e.length}}function wg(e,t,r){let n=new Map,s=new Map,o=new Set,a=(u,d,p)=>{let m=u.get(d);m?m.add(p):u.set(d,new Set([p]))};for(let[u,d]of e)for(let p of d)p!==u&&(o.add(p),o.add(u),a(n,p,u),a(s,u,p));let l=new Set,c=[];for(let u of Array.from(o).sort()){if(l.has(u))continue;let d=[],p=[u];for(l.add(u);p.length>0;){let V=p.pop();d.push(V);for(let q of[...n.get(V)||[],...s.get(V)||[]])l.has(q)||(l.add(q),p.push(q))}if(d.length<2)continue;let m=d.map(V=>t.get(V));if(m.every(V=>!!V&&/^s[1-5]$/.test(V.lane||""))&&m.every(V=>V&&m[0]&&V.root_dir===m[0].root_dir&&V.lane===m[0].lane))continue;let{order:C,indent:F,cycle:H}=vg(d.slice().sort(),n,s),re=H?d.slice().sort():C;c.push({key:re.join("\0"),cycle:H,nodes:re.map(V=>{let q=t.get(V);return{id:V,workspace_name:q?q.workspace_name:"",root_dir:q?q.root_dir:"",location_label:q?On(q):kg(V,r),indent:H?0:F.get(V)||0}})})}return c}function kg(e,t){let r=Ya(e,t);return r==="internal"?"\uBBF8\uC801\uC7AC":r==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function ju(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ti(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a={...Pn,...r&&r.candidate_filter?r.candidate_filter:{}},l=r&&ms.some(A=>A.value===r.candidate_sort)?r.candidate_sort:"repo_spec",c=new Map;for(let A of s)A&&typeof A.root_dir=="string"&&c.set(A.root_dir,A);let u=[],d=[],p=[],m=[],v=[],C=[],F=new Map,H=new Map,re=new Map,V=new Map,q=new Map;for(let A of n){if(!A||typeof A.root_dir!="string")continue;let ue=A.root_dir,E=A.name||ue,M=c.get(ue),ce=M&&typeof M.revision=="number"?M.revision:typeof A.revision=="number"?A.revision:0,$e=Rt(A.attempts),ge=Rt(A.bead_titles),Oe=Rt(A.bead_times),_t=Rt(A.pr_observations),He=Rt(A.admission),pt=Rt(A.revise_parked),tt=Rt(A.merge_queue_state),Y=Rt(A.cleanup_failed),Z=Rt(A.discard_operations),Se=Rt(A.bead_blocked_by),Ze=Rt(A.bead_workflow),je=Rt(A.pr_activity),rt=Array.isArray(A.repo_operations)?A.repo_operations:[],Qe=Array.isArray(A.merge_queue)?A.merge_queue:[],yt=new Set(Qe.filter(U=>U&&typeof U.bead_id=="string").map(U=>U.bead_id)),Ie=new Map(Qe.filter(U=>U&&typeof U.bead_id=="string").map(U=>[U.bead_id,U])),T=Array.isArray(A.queue)?A.queue:[],Q=(Array.isArray(A.serial_lanes)?A.serial_lanes:[]).filter(U=>U&&/^s[1-5]$/.test(U.id)&&Array.isArray(U.entries)),Ee=Rt(A.lane_states),ee=typeof A.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(A.serial_lane_count))):Math.min(5,Q.length);re.set(ue,ee),V.set(ue,T.length);let Ne=new Map(Q.map(U=>[U.id,U])),et=new Map;for(let U of Q)for(let J of U.entries)J&&typeof J.bead_id=="string"&&et.set(J.bead_id,U.id);for(let[U,J]of Object.entries(Se))Array.isArray(J)&&q.set(U,J.filter(be=>typeof be=="string"&&be.length>0));let st=Array.isArray(A.done)?A.done:[];for(let U of st)U&&typeof U.bead_id=="string"&&C.push({id:U.bead_id,root_dir:ue,workspace_name:E});let Ye=new Map;for(let U of st)U&&typeof U.bead_id=="string"&&typeof U.added_at=="number"&&Ye.set(U.bead_id,U.added_at);let ct=U=>({id:U,title:ge[U]||U,root_dir:ue,workspace_name:E,expected_revision:ce,draggable:!1,...Rt(Oe[U]).created_at?{created_at:Rt(Oe[U]).created_at}:{},...Rt(Oe[U]).updated_at?{updated_at:Rt(Oe[U]).updated_at}:{}}),ft=new Set;for(let[U,J]of gg($e,Ye))ft.add(U),d.push({...ct(U),lane:"running",...et.has(U)?{serial_lane_id:et.get(U)}:{},attempt_id:J.attempt_id,run_state:J.run_state,status:J.status||void 0,workflow:Ze[U]||null,can_pause:J.can_pause,can_resume:J.can_resume,started_at:J.started_at,last_event_at:J.last_event_at,last_activity:J.last_activity,legs:J.legs,runner:J.runner,model:J.model,effort:J.effort,speed:J.speed,resumed_from:J.resumed_from,continuation_mode:J.continuation_mode,usage:J.usage,exec_chips:{orchestration:So(J),worker:null},discard:yr(Z,U,{attempt_id:J.attempt_id}),badges:J.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:J.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:J.run_state==="failed"});for(let U of Array.isArray(A.pr_wait)?A.pr_wait:[]){let J=U&&U.bead_id;if(typeof J!="string"||ft.has(J))continue;ft.add(J);let be=Rt(_t[J]),Ge=Rt(be.pr),Me=be.gate?Rt(be.gate):null,B=yt.has(J),te=Ie.get(J)?.continuation_action||null,ve=!!te&&te.continuation===null,y=tt.active===J,R=U.external===!0,W=Y[J]||null,oe=Rt(je[J]),Ce=_s({bead_id:J,merge_sha:U.merge_sha,cleanup_cursor:U.cleanup_cursor,merge_progress:oe.merge_progress||null,cleanup_failed:W,repo_operations:rt}),Ae=Lo(Ce),De=!!Me&&Me.base_badge==="\uCDA9\uB3CC",Be=!!W&&["child_sweep","branch_cleanup","parent_close"].includes(W.step)&&!!Me&&Me.tier==="merged",At=R&&!!W&&!!Me&&Me.tier==="merged",vt=!!Me&&["closed_unmerged","review","undecidable"].includes(Me.tier),h=yr(Z,J,{external:R,merge_active:y||Ce?.step==="merge",merge_queued:B,cleanup_active:Ae,merged:!!W||Me?.tier==="merged"}),x=!!h.operation;p.push({...ct(J),lane:"pr_wait",pr_number:typeof Ge.number=="number"?Ge.number:null,pr_url:typeof Ge.url=="string"?Ge.url:void 0,external:R,usage:lr($e,J),merge_step:Ce,badges:ve?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ce?[Me?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:W?[on(W.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${on(W.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Me?.gate_badge=="string"&&Me.gate_badge.length>0?[Me.gate_badge]:[],alert:Ce?Ce.failed===!0:!!W||vt,reason:W&&Ce?.active!==!0?Ro(W.step):"PR \uB300\uAE30",merge_action:Me?.tier==="merged"&&!Be&&!At?!1:!B||ve,merge_enabled:!x&&(ve||Me?.enabled===!0||De||Be||At),merge_label:ve?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":At||Be?"\uC815\uB9AC \uC7AC\uAC1C":De&&!Be?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ve?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":x?h.error?`\uD3D0\uAE30 \uC2E4\uD328: ${h.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${h.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:At?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":De?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Me?.enabled===!0?`\uBA38\uC9C0 (${Me.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Me?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:B&&!ve,cancel_enabled:!y,continuation_mismatch:te?.mismatch||null,discard:h,discard_action:h.action,discard_enabled:h.enabled,discard_title:h.title})}let ut=(U,J,be,Ge)=>{let Me=U&&U.bead_id;if(typeof Me!="string"||ft.has(Me))return null;ft.add(Me);let B=pt[Me],te=yr(Z,Me),ve=te.operation?te:null,y={...ct(Me),lane:J,draggable:!ve,discard:ve||void 0,reason:qu(He,Me),seq:be+1,queue_position:be+1,queue_index:be,queue_length:Ge,badges:B?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!B,revise_action:!!B,revise_enabled:!!B&&!ve,revise_title:B?B.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${B.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Se,Me)&&(y.blocked_by=Array.isArray(Se[Me])?Se[Me].filter(R=>typeof R=="string"&&R.length>0):[]),y};for(let U=0;U<T.length;U++){let J=ut(T[U],"queue",U,T.length);if(!J)continue;m.push(J);let be=F.get(ue);be?be.push(J):F.set(ue,[J])}let ot=[];for(let U=0;U<Math.max(ee,Q.length);U++){let J=`s${U+1}`,be=Ne.get(J),Ge=be&&Array.isArray(be.entries)?be.entries:[],Me=[];for(let ve=0;ve<Ge.length;ve++){let y=ut(Ge[ve],J,ve,Ge.length);y&&(Me.push(y),m.push(y))}let B=Rt(Ee[J]),te=Array.isArray(B.occupied_by)?B.occupied_by.filter(ve=>typeof ve=="string"):[];Me.length===0&&te.length===0&&(ee<=1||U>=ee)||ot.push({id:J,index:U,items:Me,raw_length:Ge.length,occupied_by:te,corrections:Array.isArray(B.corrections)?B.corrections.length:0,cycle:B.cycle===!0,...Me.length===0&&te.length===0?{empty:!0}:{}})}H.set(ue,ot);let gt=Array.from({length:ee},(U,J)=>{let be=`s${J+1}`,Ge=Ne.get(be),Me=Ge&&Array.isArray(Ge.entries)?Ge.entries:[],B=Rt(Ee[be]);return{id:be,index:Me.length,length:Me.length,occupied_by:Array.isArray(B.occupied_by)?B.occupied_by.filter(te=>typeof te=="string"):[]}});for(let U of Array.isArray(A.runnable)?A.runnable:[]){let J=U&&U.bead_id;if(typeof J!="string"||ft.has(J))continue;ft.add(J);let be=U.workflow&&typeof U.workflow=="object"?U.workflow:null,Ge=be&&typeof be.route=="string"&&be.route||(typeof U.route=="string"?U.route:null),Me=hg(Rt(M),U.exec_pins,Ge);Array.isArray(U.blocked_by)&&U.blocked_by.length>0&&q.set(J,U.blocked_by.filter(B=>typeof B=="string"&&B.length>0)),u.push({...ct(J),title:U.title||ge[J]||J,lane:"runnable",draggable:!0,reason:qu(He,J),created_at:U.created_at??void 0,updated_at:U.updated_at??void 0,status:typeof U.status=="string"?U.status:void 0,labels:Array.isArray(U.labels)?U.labels:[],spec_id:typeof U.spec_id=="string"?U.spec_id:"",workflow:be||(Ge?{route:Ge,chips:{route:Ge}}:null),...Me?{exec_chips:Me}:{},blocked:U.blocked===!0,...Array.isArray(U.blocked_by)?{blocked_by:U.blocked_by.filter(B=>typeof B=="string"&&B.length>0)}:{},place_index:T.length,place_lanes:gt})}for(let U of st){let J=U&&U.bead_id;if(typeof J!="string"||ft.has(J)||(ft.add(J),o!==void 0&&typeof U.added_at=="number"&&U.added_at<o))continue;let be=mg($e,J),Ge=be&&typeof be.done_kind=="string"?be.done_kind:null;v.push({...ct(J),lane:"done",done:!0,done_layout:"three_line",usage:lr($e,J),work_ms:vo($e,J),done_at:typeof U.added_at=="number"?U.added_at:void 0,done_kind:Ge,badges:Ge&&Mu[Ge]?[Mu[Ge]]:[]})}}let O=new Map;s.forEach((A,ue)=>{A&&typeof A.root_dir=="string"&&O.set(A.root_dir,ue)});let P=r&&r.running_sort==="repo"?"repo":"started";d.sort((A,ue)=>{if(P==="repo"){let ce=O.get(A.root_dir)??Number.MAX_SAFE_INTEGER,$e=O.get(ue.root_dir)??Number.MAX_SAFE_INTEGER;if(ce!==$e)return ce-$e}let E=typeof A.started_at=="number"&&Number.isFinite(A.started_at)?A.started_at:null,M=typeof ue.started_at=="number"&&Number.isFinite(ue.started_at)?ue.started_at:null;return E!==null&&M!==null&&E!==M?E-M:E===null&&M!==null?1:E!==null&&M===null?-1:A.id.localeCompare(ue.id)}),v.sort((A,ue)=>(ue.done_at??0)-(A.done_at??0));let L=s.length>0?s:n.map(A=>({root_dir:A&&A.root_dir,name:A&&A.name,auto_advance:A&&A.auto_advance,auto_merge:A&&A.auto_merge,slots:A&&A.slots,revision:A&&A.revision,runner_catalog:A&&A.runner_catalog})),$=new Set(u.map(A=>A.root_dir)),D=[];for(let A of L){if(!A||typeof A.root_dir!="string")continue;let ue=F.get(A.root_dir)||[],E=H.get(A.root_dir)||[];!(ue.length>0||E.some(ce=>ce.items.length>0||ce.occupied_by.length>0))&&!$.has(A.root_dir)||D.push({root_dir:A.root_dir,name:A.name||A.root_dir,auto_advance:A.auto_advance===!0,auto_merge:A.auto_merge===!0,slots:typeof A.slots=="number"&&A.slots>=Du?A.slots:Du,revision:typeof A.revision=="number"?A.revision:0,runner_catalog:Rt(A.runner_catalog),items:ue,sublanes:{parallel:ue,serial:E},serial_lane_count:re.get(A.root_dir)||0,raw_queue_length:V.get(A.root_dir)||0})}let K={runnable:u,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:m,queue_groups:D,running:d,pr_wait:p,done:v,chains:[]},pe=Va(K);for(let A of C)pe.has(A.id)||pe.set(A.id,{root_dir:A.root_dir,workspace_name:A.workspace_name,lane:"done",state:"done"});let _e=new Map;for(let[A,ue]of q)for(let E of ue){let M=_e.get(E);M?M.includes(A)||M.push(A):_e.set(E,[A])}for(let A of[...K.queue,...K.runnable]){if(!Object.hasOwn(A,"blocked_by"))continue;let ue=pe.get(A.id);A.blockers=(A.blocked_by||[]).map(E=>hu(E,ue,pe,s)),A.blocker_warnings=A.blockers.filter(E=>E.missing_internal).map(E=>`\u26A0 \uC120\uD589 ${E.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),A.blocker_warnings.length>0&&(A.alert=!0)}for(let A of[...K.queue,...K.runnable,...K.running,...K.pr_wait]){let ue=A.lane==="running"||A.lane==="pr_wait"?[]:(A.blockers||[]).map(bg),E=[];for(let $e of _e.get(A.id)||[]){let ge=yg($e,pe);ge&&E.push(ge)}let M=A.lane==="running"||A.lane==="pr_wait"?[]:A.blocker_warnings||[];if(ue.length===0&&E.length===0&&M.length===0)continue;let ce={predecessors:ue,successors:E,warnings:M};A.dependency_chips=ce}K.chains=wg(q,pe,s);let me=bu(K.queue_groups);for(let A of K.queue_groups)for(let ue of A.sublanes.serial){let E=me.get(vu(A.root_dir,ue.id));E&&(ue.cross_wait_peers=E)}let ae=K.runnable.length,Le=K.runnable;a.show_blocked||(Le=Le.filter(A=>A.blocked!==!0));let Te=Le.length;a.spec==="with"?Le=Le.filter(A=>!!A.spec_id):a.spec==="without"&&(Le=Le.filter(A=>!A.spec_id)),K.runnable_hidden={blocked:ae-Te,spec:Te-Le.length};let ne=(A,ue)=>{let E=ju(ue.updated_at)-ju(A.updated_at);return E!==0?E:A.id.localeCompare(ue.id)},we=l==="repo_spec"?(A,ue)=>{let E=A.spec_id?0:1,M=ue.spec_id?0:1;return E!==M?E-M:ne(A,ue)}:ne;if(l==="updated_flat")K.runnable=Le.slice().sort(ne),K.runnable_sections=[];else{let A=new Map;for(let M of Le){let ce=A.get(M.root_dir);ce?ce.push(M):A.set(M.root_dir,[M])}let ue=[],E=[];for(let M of L){if(!M||typeof M.root_dir!="string")continue;let ce=(A.get(M.root_dir)||[]).slice().sort(we);A.delete(M.root_dir),ce.length!==0&&(ue.push({root_dir:M.root_dir,name:M.name||M.root_dir,items:ce.map($e=>({...$e,workspace_name:""}))}),E.push(...ce))}for(let[M,ce]of A){let $e=ce.slice().sort(we);ue.push({root_dir:M,name:$e[0]?.workspace_name||M,items:$e.map(ge=>({...ge,workspace_name:""}))}),E.push(...$e)}K.runnable=E,K.runnable_sections=ue}return K}var Wu="bdui.monitor.done-range",zu="bdui.monitor.running_sort",Hu="bdui.monitor.candidate_sort",Gu="beads-ui.monitor.candidate-filter",Ku="beads-ui.monitor.sections";function $g(){try{let e=window.localStorage.getItem(Gu);if(!e)return{...Pn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Pn}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Pn.show_blocked,spec:ei.some(r=>r.value===t.spec)?t.spec:"all"}}catch{return{...Pn}}}function Bu(e){try{window.localStorage.setItem(Gu,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function xg(){try{let e=window.localStorage.getItem(Hu);return ms.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ag(e){try{window.localStorage.setItem(Hu,e)}catch{}}function Sg(){try{let e=window.localStorage.getItem(Ku);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Uu(e){try{window.localStorage.setItem(Ku,JSON.stringify(e))}catch{}}function Eg(){try{let e=window.localStorage.getItem(Wu);return ar(e)?e:er}catch{return er}}function Tg(e){try{window.localStorage.setItem(Wu,e)}catch{}}function Cg(){try{return window.localStorage.getItem(zu)==="repo"?"repo":"started"}catch{return"started"}}function Rg(e){try{window.localStorage.setItem(zu,e)}catch{}}var Vu="tab:monitor:pipeline",Lg=1e3,Ig=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Og(){return i`<span class="mon-link mon-popover-owner">
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
  </span>`}function Yu(e,t){let r=Ct("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.router,u=t.now||(()=>Date.now()),d=t.confirm||(h=>typeof globalThis.confirm!="function"||globalThis.confirm(h)),p=Eg(),m=Cg(),v=$g(),C=xg(),F=Sg(),H=null,re=null,V=null;function q(){let h=Rr.find(x=>x.value===p);return h?h.label:""}let O=document.createElement("div");O.className="mon",e.appendChild(O);let P=document.createElement("div");P.className="mon2-drawer",e.appendChild(P);let L=ti(null,null),$=new Map,D=new Map,K=null,pe=null,_e=null,me=Tn(P,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{H=null,je()}});async function ae(h,x,N,j,ye=!0){if(!o||!N)return null;let ke=await o(h,{...x,root_dir:N,expected_revision:j});if(ke&&ke.conflict&&ye){ke.queue&&D.set(N,ke.queue);let qe=ke.queue&&typeof ke.queue.revision=="number"?ke.queue.revision:j;ke=await o(h,{...x,root_dir:N,expected_revision:qe})}return ke&&ke.queue&&N&&D.set(N,ke.queue),ke}function Le(h,x){let N=D.get(h),j=s&&s.get?s.get():null,ye=(Array.isArray(j)?j:[]).find(qe=>qe?.root_dir===h);return(N||ye)?.merge_queue?.find(qe=>qe.bead_id===x)?.continuation_action}async function Te(h,x,N,j){let ye=await ae(h,x,N,j),ke=D.get(N)?.revision??ye?.queue?.revision??j;return wr(ye,(qe,ze)=>ae(h,{...x,continuation:qe,decision_token:ze},N,ke,!1),{refresh:qe=>ae(h,x,N,qe?.queue?.revision??D.get(N)?.revision??ke,!1)})}async function ne(h,x,N,j){let ye=await wr({continuation_mismatch:j},(qe,ze)=>ae("worker-merge-queue-add",{bead_id:x,continuation:qe,decision_token:ze},h,N,!1)),ke=ye?.queue?.merge_queue?.find(qe=>qe.bead_id===x)?.continuation_action;ye?.applied!==!0&&ke?.continuation===null&&ke.mismatch&&await ne(h,x,ye.queue.revision,ke.mismatch)}async function se(h,x,N){let j=await ae("worker-discard",h,x,N);if(j&&j.discarded===!0){he(ko(j),"success",5e3);return}if(j&&j.reason){he(`\uD3D0\uAE30 \uC2E4\uD328: ${j.reason}`,"error");return}if(j&&j.accepted&&j.pending==="merged_revert"){he("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(j&&j.accepted){he(`\uD3D0\uAE30 \uC9C4\uD589: ${j.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}j&&!j.conflict&&he("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function we(h,x,N){return!o||!N?null:await o(h,{...x,root_dir:N})}async function A(){let h=new Map;for(let x of L.pr_wait)h.has(x.root_dir)||h.set(x.root_dir,x.expected_revision);for(let[x,N]of h)await ae("worker-merge-queue-add-all",{},x,N)}function ue(h,x){let N=F[h];return!!(N&&N[x]===!0)}function E(h,x){let N={...F[h]||{}};N[x]=!N[x],F={...F,[h]:N},Uu(F),je()}function M(h){let x=ue(h.root_dir,h.section);return i`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${h.root_dir}
        data-section=${h.section}
        aria-expanded=${x?"false":"true"}
        aria-label=${`${h.name} \uC139\uC158 ${x?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${x?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${h.root_dir}>${h.name}</span>
      <span class="mon2-sec__count">${h.count}</span>
      ${typeof h.auto=="boolean"?i`<span
            class="mon2-sec__auto${h.auto?" is-on":""}"
            title=${h.auto?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C"}
            >${h.auto?"\u25CF \uC790\uB3D9":"\u25CB \uC218\uB3D9"}</span
          >`:""}
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${h.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function ce(h,x){return i`<div class="mon2-item" data-bead-id=${h.id}>
      ${x}
      <span class="mon2-item__ops">${Og()}</span>
    </div>`}function $e(h){return re!==h.id?null:{bead_id:h.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:h.place_index??0},...(h.place_lanes||[]).map(x=>({id:x.id,label:x.id,count:x.length}))]}}function ge(h){return ce(h,Ua(h,$e(h),{exec_chips_mode:"pinned_only"}))}function Oe(h){return ce(h,In(h))}function _t(){return L.runnable_flat?i`<div class="mon2-flat">
        ${L.runnable.map(h=>ge(h))}
      </div>`:i`${L.runnable_sections.map(h=>{let x=ue(h.root_dir,"runnable");return i`<section
        class="mon2-sec${x?" is-collapsed":""}"
        data-root-dir=${h.root_dir}
        data-section="runnable"
      >
        ${M({root_dir:h.root_dir,name:h.name,count:h.items.length,section:"runnable"})}
        ${x?"":i`<div class="mon2-sec__body" data-lane="candidate">
              ${h.items.map(N=>ge(N))}
            </div>`}
      </section>`})}`}function He(h){return i`<div
      class="mon2-lane${h.empty?" mon2-lane--empty":""}"
      data-lane-length=${String(h.raw_length)}
    >
      ${sr({id:"",lane:h.id,title:`\uC9C1\uB82C ${h.index+1}`,items:h.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:h.items.length>0?i`${h.items.map(x=>Oe(x))}`:void 0,header_control:i`<span class="mon2-lane__badge"
          >${h.occupied_by.length>0?"\uC810\uC720":""}</span
        >`})}
      ${h.empty?i`<div class="mon2-lane__hint">
            직렬 ${h.index+1} 비어 있음
          </div>`:""}
      ${h.cycle?i`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(h.cross_wait_peers||[]).map(x=>i`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${x.workspace_name}·${x.lane}과 교차 대기
          </div>`)}
    </div>`}function pt(h){let x=ue(h.root_dir,"queue"),N=h.sublanes.parallel.length+h.sublanes.serial.reduce((j,ye)=>j+ye.items.length,0);return i`<section
      class="mon2-sec${x?" is-collapsed":""}"
      data-root-dir=${h.root_dir}
      data-section="queue"
    >
      ${M({root_dir:h.root_dir,name:h.name,count:N,section:"queue",auto:h.auto_advance})}
      ${x?"":i`<div class="mon2-sec__body worker-wait">
            <div
              class="mon2-lane"
              data-lane-length=${String(h.raw_queue_length)}
            >
              ${sr({id:"",lane:"queue",title:"\uBCD1\uB82C",items:h.sublanes.parallel,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:h.sublanes.parallel.length>0?i`${h.sublanes.parallel.map(j=>Oe(j))}`:void 0})}
            </div>
            ${h.sublanes.serial.map(j=>He(j))}
          </div>`}
    </section>`}function tt(){if(L.chains.length===0)return"";let h=F.chains===!0;return i`<section class="mon2-chains${h?" is-collapsed":""}">
      <header class="mon2-chains__hd">
        <button
          type="button"
          class="mon2-chains__toggle"
          aria-expanded=${h?"false":"true"}
          title="blocks 의존이 만든 레포 간 순서입니다 — 선행이 close되면 후속이 자기 레포 큐에서 출발합니다"
        >
          ${h?"\u25B8":"\u25BE"} 🔗 연결 체인 ${L.chains.length} · 레포 간
          순서
        </button>
        <span class="mon2-chains__hint">blocks 의존 · 카드의 🔗로 연결</span>
      </header>
      ${h?"":i`<div class="mon2-chains__body">
            ${L.chains.map(x=>i`<div class="mon2-chain">
                  ${x.cycle?i`<div class="mon2-chain__cycle">⛔ 의존 사이클</div>`:""}
                  ${x.nodes.map(N=>i`<div
                        class="mon2-chain__node"
                        style=${`--indent: ${N.indent}`}
                        data-bead-id=${N.id}
                        data-root-dir=${N.root_dir}
                      >
                        ${N.workspace_name?i`<span class="mon2-chain__repo"
                              >${N.workspace_name}</span
                            >`:""}
                        <span class="mon2-chain__id worker-mini__id"
                          >${N.id}</span
                        >
                        <span class="mon2-chain__where"
                          >${N.location_label}</span
                        >
                      </div>`)}
                </div>`)}
          </div>`}
    </section>`}function Y(h){return i`<div class="worker-rungrid">
      ${L.running.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:L.running.map(x=>Ha({bead_id:x.id,attempt_id:x.attempt_id||"",title:x.title,runner:x.runner??null,model:x.model??null,effort:x.effort??null,speed:x.speed??null,started_at:x.started_at??null,resumed_from:x.resumed_from??null,continuation_mode:x.continuation_mode??null,paused:x.run_state==="paused",failed:x.run_state==="failed",status:x.status,status_label:x.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:x.can_resume!==!1,can_pause:x.can_pause!==!1,exec_chips:x.exec_chips||null,usage:x.usage||null,discard:x.discard},h,H,{monitor:{repo:x.workspace_name,root_dir:x.root_dir,serial_lane_id:x.serial_lane_id,workflow:x.workflow||null,last_activity:x.last_activity||null,legs:x.legs||[],dependency_chips:x.dependency_chips||null}}))}
    </div>`}function Z(h){let x={runnable:L.runnable,queue:L.queue,running:L.running,pr_wait:L.pr_wait,done:L.done};return i`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Ig.map(N=>{let j=x[N.lane],ye=N.lane==="runnable"?L.runnable_flat?j.length>0?_t():void 0:L.runnable_sections.length>0?_t():void 0:N.lane==="queue"?L.queue_groups.length>0||L.chains.length>0?i`${tt()}${L.queue_groups.map(ke=>pt(ke))}`:void 0:N.lane==="running"?Y(h):j.length>0?i`${j.map(ke=>In(ke))}`:void 0;return sr({id:`monitor-${N.lane}`,lane:N.pane,title:N.lane==="done"?`\uC644\uB8CC\xB7${q()}`:N.title,items:j,empty:N.empty,body:ye,live:N.lane==="running"&&j.length>0,controls:N.lane==="runnable"?Se():void 0,header_control:Ze(N.lane,j.length)})})}
      </div>`}function Se(){return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒
        blocked${L.runnable_hidden.blocked>0?` ${L.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ei.map(h=>i`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${v.spec===h.value?" is-active":""}"
              data-spec=${h.value}
              aria-pressed=${v.spec===h.value?"true":"false"}
            >
              ${h.label}
            </button>`)}
        ${L.runnable_hidden.spec>0?i`<span class="worker-filter__hidden"
              >숨김 ${L.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function Ze(h,x){return h==="runnable"?i`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${C}
      >
        ${ms.map(N=>i`<option
              value=${N.value}
              ?selected=${C===N.value}
            >
              ${N.label}
            </option>`)}
      </select>`:h==="running"?i`<select
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
      </select>`:h==="pr_wait"&&x>0?i`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:h==="done"?i`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${p}
      >
        ${Rr.map(N=>i`<option value=${N.value} ?selected=${p===N.value}>
              ${N.label}
            </option>`)}
      </select>`:""}function je(){let h=s&&s.get?s.get():null,x=s&&s.getWorkspacesState?s.getWorkspacesState():[],N=u();L=ti(h,x,{done_since:Yr(p,N),running_sort:m,candidate_filter:v,candidate_sort:C}),$=new Map;for(let j of[...L.runnable,...L.queue,...L.running,...L.pr_wait,...L.done])$.has(j.id)||$.set(j.id,j);Ve(Z(N),O),rt()?.render(),Qe()}function rt(){if(_e)return _e;let h=O.querySelector(".mon2-deck");return h?(_e=Lu(h,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>L.done,rangeLabel:q,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:Ie,onFocusChange:x=>{V=x,Qe()}}),_e):null}function Qe(){O.classList.toggle("has-focus",V!==null);for(let h of Array.from(O.querySelectorAll(".mon2-sec[data-root-dir]")))h.classList.toggle("is-focus",V!==null&&h.getAttribute("data-root-dir")===V);for(let h of Array.from(O.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let x=$.get(h.getAttribute("data-bead-id")||"");h.classList.toggle("is-focus",V!==null&&!!x&&x.root_dir===V)}}function yt(h,x){let N=a?a():void 0;if(!x||!N||x===N||!l){n(h);return}l(x).then(()=>{n(h)}).catch(j=>{r("workspace switch for %s failed: %o",x,j)})}function Ie(h){if(!h)return;let x=a?a():void 0,N=()=>{try{c?.gotoView("worker")}catch(j){r("gotoView(worker) failed: %o",j)}};if(!l||x&&x===h){N();return}l(h).then(N).catch(j=>{r("workspace switch for %s failed: %o",h,j),he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function T(h){tr(h).then(x=>{he(x?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",x?"success":"error",1400)})}function Q(h){let x=$.get(h)||null;return{item:x,root_dir:x?x.root_dir:"",revision:x?x.expected_revision:0}}function Ee(h){if(typeof h=="string"&&h.length>0)return h;if(h&&typeof h=="object"){let x=h;if(typeof x.message=="string"&&x.message.length>0)return x.message;if(typeof x.error=="string"&&x.error.length>0)return x.error;if(x.error&&typeof x.error=="object"&&typeof x.error.message=="string")return x.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function ee(h,x){let N=h.querySelector(".mon-link__trigger"),j=h.querySelector(".mon-link__popover"),ye=h.querySelector(".mon-link__error");!N||!j||!ye||(Ye(),j.hidden=!1,N.setAttribute("aria-expanded","true"),ye.textContent=x,ye.hidden=!1)}async function Ne(h,x,N,j){let{root_dir:ye}=Q(N);if(!(!N||!j||j===N))try{await we(h,{a:N,b:j},ye),Ye()}catch(ke){ee(x,Ee(ke))}}function et(h){h.querySelector(".mon-link__list")?.replaceChildren();let x=h.querySelector(".mon-link__search");x&&(x.value="");let N=h.querySelector(".mon-link__direct");N&&(N.hidden=!0,N.dataset.targetId="",N.textContent="");let j=h.querySelector(".mon-link__empty");j&&(j.hidden=!0);let ye=h.querySelector(".mon-link__error");ye&&(ye.hidden=!0,ye.textContent="")}function st(h,x){let N=h.querySelector(".mon-link__list");if(!N)return;let j=document.createDocumentFragment(),ye=yu(L).filter(ke=>ke.id!==x);for(let ke of ye){let qe=document.createElement("button");qe.type="button",qe.className="mon-link__candidate",qe.dataset.targetId=ke.id,qe.dataset.search=`${ke.id} ${ke.title} ${ke.location}`.toLocaleLowerCase();let ze=document.createElement("strong");ze.textContent=ke.id;let kt=document.createElement("span");kt.textContent=ke.title;let mt=document.createElement("small");mt.textContent=ke.location,qe.append(ze,kt,mt),j.append(qe)}N.replaceChildren(j)}function Ye(){for(let h of Array.from(O.querySelectorAll(".mon-card-popover"))){let x=h;x.hidden=!0,x.classList.contains("mon-link__popover")&&et(x)}for(let h of Array.from(O.querySelectorAll('[aria-haspopup][aria-expanded="true"]')))h.setAttribute("aria-expanded","false")}function ct(h){let N=h.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!N)return;let j=N.hidden;if(Ye(),j){let ye=h.closest(".mon2-item");st(N,ye?.getAttribute("data-bead-id")||""),N.hidden=!1,h.setAttribute("aria-expanded","true");let ke=N.querySelector(".mon-link__search");ke&&(ft(ke),ke.focus())}}function ft(h){let x=h.closest(".mon-link__popover"),N=h.closest(".mon2-item");if(!x||!N)return;let j=h.value.trim(),ye=j.toLocaleLowerCase(),ke=0,qe=!1;for(let Tt of Array.from(x.querySelectorAll(".mon-link__candidate"))){let Nt=Tt,nt=Nt.dataset.targetId||"",zt=ye.length===0||(Nt.dataset.search||"").includes(ye);Nt.hidden=!zt,zt&&(ke+=1),nt.toLocaleLowerCase()===ye&&(qe=!0)}let ze=x.querySelector(".mon-link__direct"),kt=N.getAttribute("data-bead-id")||"";if(ze){let Tt=j.length>0&&!qe&&ye!==kt.toLocaleLowerCase();ze.hidden=!Tt,ze.dataset.targetId=Tt?j:"",ze.textContent=Tt?`\uC9C1\uC811 \uC785\uB825 \xB7 ${j}`:"",Tt&&(ke+=1)}let mt=x.querySelector(".mon-link__empty");mt&&(mt.hidden=ke>0);let Ft=x.querySelector(".mon-link__error");Ft&&(Ft.hidden=!0,Ft.textContent="")}let ut=null,ot=!1,gt=null;function U(){gt!==null&&clearTimeout(gt),gt=setTimeout(()=>{gt=null,ot=!1},0)}function J(h){let x=h.target;return typeof x?.closest=="function"?x.closest(".worker-pane, .mon2-sec__body"):null}function be(h){let x=J(h);if(!x||!ut)return null;let j=x.closest(".mon2-sec")?.getAttribute("data-root-dir")||"";if(j!==ut.root_dir)return null;let ye=x.getAttribute("data-lane")||"";if(ye!=="candidate"&&ye!=="queue"&&!/^s[1-5]$/.test(ye))return null;let ke=x.closest(".mon2-lane");return{pane:x,lane:ye,root_dir:j,lane_length:Number(ke?.getAttribute("data-lane-length")||0)||0}}function Ge(){for(let h of Array.from(O.querySelectorAll(".worker-pane--drag-over")))h.classList.remove("worker-pane--drag-over")}function Me(h){let x=h.target,N=typeof x?.closest=="function"?x.closest('.worker-mini[draggable="true"], .worker-card[draggable="true"]'):null;if(!N)return;let j=N.getAttribute("data-bead-id")||"",{item:ye}=Q(j);if(ye){ut={bead_id:j,lane:ye.lane,root_dir:ye.root_dir,revision:ye.expected_revision,queue_index:typeof ye.queue_index=="number"?ye.queue_index:-1,place_index:typeof ye.place_index=="number"?ye.place_index:0},ot=!0,re=null,O.classList.add("is-dragging");try{h.dataTransfer?.setData("text/plain",j),h.dataTransfer&&(h.dataTransfer.effectAllowed="move")}catch{}}}function B(h){let x=be(h);x&&(h.preventDefault(),h.dataTransfer&&(h.dataTransfer.dropEffect="move"),x.pane.classList.add("worker-pane--drag-over"))}function te(h){J(h)?.classList.remove("worker-pane--drag-over")}function ve(){ut=null,Ge(),O.classList.remove("is-dragging"),U()}function y(h){let x=be(h),N=ut;if(ut=null,Ge(),O.classList.remove("is-dragging"),!x||!N||!N.bead_id)return;h.preventDefault();let j=h.target,ye=typeof j?.closest=="function"?j.closest(".mon2-item"):null,ke=ye&&x.pane.contains(ye)&&ye.getAttribute("data-bead-id")||"",qe=ke?$.get(ke):void 0,ze=qe&&typeof qe.queue_index=="number"?qe.queue_index:NaN;if(x.lane==="candidate"){(N.lane==="queue"||/^s[1-5]$/.test(N.lane))&&ae("worker-queue-remove",{bead_id:N.bead_id},N.root_dir,N.revision);return}let kt=x.lane==="queue"?"parallel":x.lane;if(N.lane==="runnable"){let Nt=Number.isFinite(ze)?ze:x.lane_length;ae("worker-queue-place",{bead_id:N.bead_id,...kt==="parallel"?{}:{lane:kt},index:Nt},N.root_dir,N.revision);return}if((N.lane==="queue"?"parallel":N.lane)!==kt){let Nt=Number.isFinite(ze)?ze:x.lane_length;ae("worker-queue-place",{bead_id:N.bead_id,...kt==="parallel"?{}:{lane:kt},index:Nt},N.root_dir,N.revision);return}if(ke===N.bead_id)return;let Ft=N.queue_index,Tt=Number.isFinite(ze)?Ft>ze?ze:ze-1:x.lane_length-1;!Number.isFinite(Tt)||Tt<0||Tt===Ft||ae("worker-queue-reorder",{bead_id:N.bead_id,...kt==="parallel"?{}:{lane:kt},to_index:Tt},N.root_dir,N.revision)}function R(h){return{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,status:h.run_state==="running"?"running":h.run_state,worktree:h.root_dir}}function W(h,x){let{item:N,root_dir:j,revision:ye}=Q(x),ke=N?.attempt_id||"",qe=h.classList;if(qe.contains("mon-link__trigger")){ct(h);return}if(qe.contains("mon-link__candidate")||qe.contains("mon-link__direct")){let ze=h.closest(".mon2-item");ze&&Ne("dep-add",ze,x,h.dataset.targetId||"");return}if(qe.contains("worker-dep__remove")){let ze=h.closest(".mon2-item");ze&&Ne("dep-remove",ze,x,h.dataset.blockerId||"");return}if(qe.contains("worker-card__place")){re=re===x?null:x,je();return}if(qe.contains("worker-card__place-cancel")){re=null,je();return}if(qe.contains("worker-card__place-lane")){let ze=h.getAttribute("data-lane")||"parallel",kt=ze==="parallel"?N?.place_index??0:(N?.place_lanes||[]).find(mt=>mt.id===ze)?.index??0;re=null,ae("worker-queue-place",{bead_id:x,...ze==="parallel"?{}:{lane:ze},index:kt},j,ye),je();return}if(qe.contains("rtile__session")){H=ke,ke&&N&&me.open({attempt_id:ke,root_dir:j,meta:R(N)}),je();return}if(qe.contains("rtile__pause")){we("worker-attempt-pause",{attempt_id:ke},j);return}if(qe.contains("rtile__resume")){xn().then(ze=>{if(ze!==null)return Te("worker-attempt-resume",{attempt_id:ke,...ze!==""?{instructions:ze}:{}},j,ye)});return}if(qe.contains("rtile__dismiss")){ae("worker-attempt-dismiss",{attempt_id:ke},j,ye);return}if(qe.contains("rtile__discard")){if(!d(us(x,"unmerged")))return;se({bead_id:x,...ke?{attempt_id:ke}:{},...h.dataset.operationId?{operation_id:h.dataset.operationId}:{}},j,ye);return}if(qe.contains("worker-mini__merge")){let ze=Le(j,x);ze?.mismatch&&ze.continuation===null?ne(j,x,ye,ze.mismatch):ae("worker-merge-queue-add",{bead_id:x},j,ye);return}if(qe.contains("worker-mini__merge-cancel")){ae("worker-merge-queue-remove",{bead_id:x},j,ye);return}if(qe.contains("worker-mini__discard")){let ze=h.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(us(x,ze)))return;se({bead_id:x,...h.dataset.attemptId?{attempt_id:h.dataset.attemptId}:{},...h.dataset.operationId?{operation_id:h.dataset.operationId}:{}},j,ye);return}if(qe.contains("worker-mini__revise-fix")){Te("worker-revise-fix",{bead_id:x},j,ye);return}qe.contains("worker-mini__revise-approve")&&ae("worker-revise-approve",{bead_id:x},j,ye)}function oe(h){let x=ot;ot=!1;let N=h.target;if(!N||typeof N.closest!="function"||N.closest("dialog")||N.closest(".mon2-drawer")||N.closest("a"))return;let j=N.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(j){h.preventDefault();let Nt=N.closest(".mon2-item, .rtile, .mon2-chain__node, .worker-mini")?.getAttribute("data-bead-id")||j.textContent?.trim()||"";Nt&&T(Nt);return}let ye=N.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(ye){h.preventDefault();let Tt=ye.getAttribute("data-root-dir")||$.get(N.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||ye.getAttribute("title")||"";Ie(Tt);return}let ke=N.closest(".mon2-sec__toggle");if(ke){h.preventDefault(),E(ke.getAttribute("data-root-dir")||"",ke.getAttribute("data-section")||"runnable");return}if(N.closest(".mon2-chains__toggle")){h.preventDefault(),F={...F,chains:F.chains!==!0},Uu(F),je();return}let qe=N.closest(".mon2-chain__node");if(qe){h.preventDefault(),yt(qe.getAttribute("data-bead-id")||"",qe.getAttribute("data-root-dir")||"");return}if(N.closest(".mon-merge-all")){h.preventDefault(),A();return}let ze=N.closest(".mon-filter__spec");if(ze){h.preventDefault(),v={...v,spec:ze.getAttribute("data-spec")||"all"},Bu(v),je();return}let kt=N.closest(".mon2-item, .rtile, .worker-mini, .worker-card");if(!kt)return;let mt=kt.getAttribute("data-bead-id")||"",Ft=N.closest("button");if(Ft){h.preventDefault(),W(Ft,mt);return}mt&&!x&&(h.preventDefault(),yt(mt,Q(mt).root_dir))}function Ce(h){let x=h.target;x&&O.contains(x)&&typeof x.closest=="function"&&x.closest(".mon-popover-owner")||Ye()}function Ae(h){if(h.key!=="Escape")return;let x=O.querySelector('[aria-haspopup][aria-expanded="true"]');Ye(),x?.focus()}function De(h){let x=h.target;if(!x||typeof x.closest!="function")return;let N=x.closest(".mon-filter__blocked");if(N){v={...v,show_blocked:N.checked},Bu(v),je();return}let j=x.closest(".mon-candidate-sort");if(j){C=ms.some(qe=>qe.value===j.value)?j.value:"repo_spec",Ag(C),je();return}let ye=x.closest(".mon-running-sort");if(ye){m=ye.value==="repo"?"repo":"started",Rg(m),je();return}let ke=x.closest(".mon-done-range");ke&&(p=ar(ke.value)?ke.value:er,Tg(p),je())}function Be(h){let x=h.target;x?.classList.contains("mon-link__search")&&ft(x)}e.addEventListener("click",oe),e.addEventListener("change",De),e.addEventListener("input",Be),e.addEventListener("dragstart",Me),e.addEventListener("dragover",B),e.addEventListener("dragleave",te),e.addEventListener("drop",y),e.addEventListener("dragend",ve),document.addEventListener("click",Ce),document.addEventListener("keydown",Ae),s&&typeof s.subscribe=="function"&&(K=s.subscribe(()=>{try{D.clear(),je()}catch{}}));function At(){pe!==null&&(clearInterval(pe),pe=null)}function vt(){gt!==null&&(clearTimeout(gt),gt=null)}return{load(){r("load"),je(),pe===null&&(pe=setInterval(()=>{try{if(O.querySelector(".mon-card-popover:not([hidden])"))return;je()}catch{}},Lg))},pause(){At()},clear(){At(),vt(),K&&(K(),K=null),me.destroy(),_e?.destroy(),_e=null,e.removeEventListener("click",oe),e.removeEventListener("change",De),e.removeEventListener("input",Be),e.removeEventListener("dragstart",Me),e.removeEventListener("dragover",B),e.removeEventListener("dragleave",te),e.removeEventListener("drop",y),e.removeEventListener("dragend",ve),document.removeEventListener("click",Ce),document.removeEventListener("keydown",Ae),e.replaceChildren()}}}function Zu(e,t,r){let n=Ct("views:nav"),{global_element:s,repo_element:o}=e,a=null;function l(m){return v=>{v.preventDefault(),n("click tab %s",m),r.gotoView(m)}}function c(){let m=t.getState();return m.view==="worker"||m.view==="monitor"?m.view:"board"}function u(){let m=c();return i`
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
    `}function d(){let m=c();return i`
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
    `}function p(){s&&Ve(u(),s),o&&Ve(d(),o)}return p(),a=t.subscribe(()=>p()),{destroy(){a&&(a(),a=null),s&&Ve(i``,s),o&&Ve(i``,o)}}}var Qu=["bug","feature","task","epic","chore"];function Xu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ju=["Critical","High","Medium","Low","Backlog"];function ed(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),d=r.querySelector("#btn-cancel"),p=r.querySelector("#btn-create"),m=r.querySelector(".new-issue__close");function v(){o.replaceChildren();let P=document.createElement("option");P.value="",P.textContent="\u2014 Select \u2014",o.appendChild(P);for(let L of Qu){let $=document.createElement("option");$.value=L,$.textContent=Xu(L),o.appendChild($)}a.replaceChildren();for(let L=0;L<=4;L+=1){let $=document.createElement("option");$.value=String(L);let D=Ju[L]||"Medium";$.textContent=`${L} \u2013 ${D}`,a.appendChild($)}}v();function C(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function F(P){s.disabled=P,o.disabled=P,a.disabled=P,l.disabled=P,c.disabled=P,d.disabled=P,p.disabled=P,p.textContent=P?"Creating\u2026":"Create"}function H(){u.textContent=""}function re(P){u.textContent=P}function V(){try{let P=window.localStorage.getItem("beads-ui.new.type");P?o.value=P:o.value="";let L=window.localStorage.getItem("beads-ui.new.priority");L&&/^\d$/.test(L)?a.value=L:a.value="2"}catch{o.value="",a.value="2"}}function q(){let P=o.value||"",L=a.value||"";P.length>0&&window.localStorage.setItem("beads-ui.new.type",P),L.length>0&&window.localStorage.setItem("beads-ui.new.priority",L)}async function O(){H();let P=String(s.value||"").trim();if(P.length===0){re("Title is required"),s.focus();return}let L=Number(a.value||"2");if(!(L>=0&&L<=4)){re("Priority must be 0..4"),a.focus();return}let $=String(o.value||""),D=String(c.value||""),K={title:P};$.length>0&&(K.type=$),String(L).length>0&&(K.priority=L),D.length>0&&(K.description=D),F(!0);try{await t("create-issue",K)}catch{F(!1),re("Failed to create issue");return}q(),F(!1),C()}return r.addEventListener("cancel",P=>{P.preventDefault(),C()}),m.addEventListener("click",()=>C()),d.addEventListener("click",()=>C()),r.addEventListener("keydown",P=>{P.key==="Enter"&&(P.ctrlKey||P.metaKey)&&(P.preventDefault(),O())}),n.addEventListener("submit",P=>{P.preventDefault(),O()}),{open(){n.reset(),H(),V();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){C()}}}var Pg=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Dg(e,t){return ea(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function td(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Dg(n,e);return i`<button
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
  `}function rd(e,t,r){return i`
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
  `}function nd(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Pg.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var Mg=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function sd(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(ae=>he(ae,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="execution",c=!1,u="",d=null;function p(){if(d)return d;let ae=a.querySelector('[data-pane="execution"]');return ae?(d=To(ae,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:r,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Le=>t.queueStore?.set?.(Le)}),d):null}function m(){return i`
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
    `}function v(){let ae=n.get();return i`
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
        ${ae?i`
              ${td(ae,s(),re)}
              ${rd(ae,u,{onDraft:Le=>{u=Le},onAdd:V,onRemove:q})}
              ${nd(ae,O)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function C(ae){let Le=n.get();if(Le)try{let Te=await r("display-policy-set",{expected_revision:Le.revision,policy:ae(Le)});F(Te),Te&&Te.conflict&&Te.policy&&(Te=await r("display-policy-set",{expected_revision:Te.policy.revision,policy:ae(Te.policy)}),F(Te)),Te&&Te.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function F(ae){ae&&ae.policy&&typeof ae.policy=="object"&&n.set(ae.policy)}function H(ae){C(ae)}function re(ae){let Le=n.get();if(!Le)return;let Te=!Ng(ae,Le);H(ne=>qg(ae,ne,Te))}function V(){let ae=u.trim();ae.length!==0&&(u="",H(Le=>Le.hidden_prefixes.includes(ae)?{hidden_prefixes:Le.hidden_prefixes}:{hidden_prefixes:[...Le.hidden_prefixes,ae]}),P())}function q(ae){H(Le=>({hidden_prefixes:Le.hidden_prefixes.filter(Te=>Te!==ae)}))}function O(ae){let Le=n.get();if(!Le)return;let Te=Le.chips[ae]===!1;H(()=>({chips:{[ae]:Te}}))}function P(){Ve(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Mg.map(ae=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ae.id}
                  aria-selected=${String(l===ae.id)}
                  aria-controls=${`settings-pane-${ae.id}`}
                  @click=${()=>L(ae.id)}
                >
                  <span class="settings-dialog__glyph">${ae.glyph}</span>
                  ${ae.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${me}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${m()} ${v()}
          </div>
        </div>
      `,a),p()}function L(ae){l=ae,P()}let $=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",$),a.addEventListener("cancel",$);let D=ae=>{ae.target===a&&me()};a.addEventListener("click",D);let K=null;n.subscribe&&(K=n.subscribe(()=>{c&&P()}));let pe=null;t.implPresetStore?.subscribe&&(pe=t.implPresetStore.subscribe(()=>{c&&d?.render()}));function _e(ae="execution"){c||(c=!0,t.onOpenChange?.(!0),l=ae,u="",P(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),p()?.load())}function me(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:_e,close:me,sessionDraft:()=>d?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",$),a.removeEventListener("cancel",$),a.removeEventListener("click",D),K&&(K(),K=null),pe&&(pe(),pe=null),d?.destroy(),d=null,a.remove()}}}function Ng(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function qg(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Fg=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],od="usage-meter-card",jg="usage-meter-layer",ad=600,Bg=["token_expired","relogin_required"];function id(e){return String(e).padStart(2,"0")}function Ug(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function ld(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${id(n.getHours())}:${id(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Fg[n.getMonth()]} ${n.getDate()} ${o}`;return`${Ug(r,t)} \xB7 ${l}`}function Wg(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function cd(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function ud(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var dd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function fd(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function zg(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:fd(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Hg(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=zg(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?fd(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function pd(e,t){return`${e}:${t}`}function _d(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,l=0,c=null;function u(){Ve(i``,e),e.hidden=!0,p()}function d(){if(c===null){let ne=e.ownerDocument;c=ne.createElement("div"),c.id=jg,c.className="usage-meter__layer",ne.body.appendChild(c)}return c}function p(){c!==null&&(Ve(i``,c),c.remove(),c=null)}function m(ne){r!==ne&&(r===null&&(document.addEventListener("mousedown",C),document.addEventListener("keydown",H),window.addEventListener("resize",F)),r=ne)}function v(){r!==null&&(r=null,document.removeEventListener("mousedown",C),document.removeEventListener("keydown",H),window.removeEventListener("resize",F))}function C(ne){let se=ne.target;se&&(e.contains(se)||c!==null&&c.contains(se))||(v(),me())}function F(){me()}function H(ne){ne.key==="Escape"&&(v(),me())}function re(ne){r===ne?v():m(ne),me()}function V(){v(),me()}async function q(ne,se){if(n.has(ne.key))return;let we=pd(ne.key,se);n.set(ne.key,se),a.delete(we),me();let A=null;try{A=await(await fetch(ne.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:se})})).json()}catch{A=null}if(t)return;if(n.delete(ne.key),!A||A.ok!==!0){let E=A&&typeof A.error=="string"&&A.error.length>0?A.error:"network_error";a.set(we,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${E}`}),me();return}let ue=Array.isArray(A.warnings)?A.warnings.filter(E=>typeof E=="string"&&E.length>0):[];ue.length>0&&a.set(we,{kind:"warn",text:ue.join(" \xB7 ")}),me(),await Te()}function O(ne,se,we,A){let ue=ud(ne.pct),M=`resets ${ld(ne.resetsAt,A)}${se?` \xB7 ${we}`:""}`;return i`<span
      class="usage-meter__window ${cd(ue)}"
      style=${`--progress: ${ue}%`}
      title=${M}
    >
      <span class="usage-meter__label">${ne.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${ue}%</span>
    </span>`}function P(ne,se,we){let A=se.available&&typeof se.ageSeconds=="number"&&se.ageSeconds>ad,ue=A&&typeof se.ageSeconds=="number"?`${Math.floor(se.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",E=se.accounts.filter(ge=>!ge.active).length,M=`usage-meter__group${A?" usage-meter__group--stale":""}`,ce=i`<span class="usage-meter__provider"
        >${ne.label}</span
      >
      ${se.available?se.windows.map(ge=>O(ge,A,ue,we)):i`<span class="usage-meter__empty">사용량 없음</span>`}
      ${E>0?i`<span class="usage-meter__badge">+${E}</span>`:""}`;if(se.accounts.length===0)return i`<span
        class=${M}
        aria-label=${`${ne.label} usage`}
        >${ce}</span
      >`;let $e=r===ne.key;return i`<button
      type="button"
      class=${`usage-meter__toggle ${M}`}
      aria-label=${`${ne.label} usage`}
      aria-expanded=${$e?"true":"false"}
      aria-controls=${od}
      @click=${()=>re(ne.key)}
    >
      ${ce}
    </button>`}function L(ne,se){return i`<span class="usage-meter" aria-label="Usage">
      ${ne.map(we=>P(we.provider,we.snapshot,se))}
    </span>`}function $(ne,se){let we=ud(ne.pct),A=ld(ne.resetsAt,se);return i`<span
      class="usage-meter__account-window ${cd(we)}"
      style=${`--progress: ${we}%`}
    >
      <span class="usage-meter__account-key">${ne.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${we}%</span>
      <span class="usage-meter__account-reset"
        >${A.length>0?`\u21BB ${A}`:""}</span
      >
    </span>`}function D(ne,se){return Bg.includes(se)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ne.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function K(ne,se,we){let A=se.status==="ok",ue=typeof se.ageSeconds=="number"&&se.ageSeconds>ad,E=a.get(pd(ne.key,se.number)),M=n.get(ne.key),ce=M!==void 0,$e=M===se.number,ge=["usage-meter__account"];return se.active&&ge.push("usage-meter__account--active"),A||ge.push("usage-meter__account--unavailable"),ue&&ge.push("usage-meter__account--stale"),i`<div class=${ge.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${se.email}
          >${se.alias===null?se.email:se.alias}</span
        >
        ${se.plan===null?"":i`<span class="usage-meter__account-tag">${se.plan}</span>`}
        ${se.active?i`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${se.ageSeconds===null?"":i`<span class="usage-meter__account-age"
              >${Wg(se.ageSeconds)}</span
            >`}
        ${se.active?"":i`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ce}
              @click=${()=>{q(ne,se.number)}}
            >
              ${$e?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${A?i`<div class="usage-meter__account-windows">
            ${se.windows.map(Oe=>$(Oe,we))}
          </div>`:i`<div class="usage-meter__account-status">
            ${D(ne,se.status)}
          </div>`}
      ${E===void 0?"":i`<div
            class="usage-meter__account-message usage-meter__account-message--${E.kind}"
          >
            ${E.text}
          </div>`}
    </div>`}function pe(ne,se,we){let A=se.accounts.filter(ue=>ue.active).length;return i`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ne.label} · 활성 ${A} / 전체
        ${se.accounts.length}
      </h2>
      ${se.accounts.map(ue=>K(ne,ue,we))}
    </section>`}function _e(ne,se){return i`<div
      class="usage-meter__card"
      id=${od}
      role="dialog"
      aria-label=${`${ne.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${pe(ne.provider,ne.snapshot,se)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function me(){let ne=[];for(let A of dd){let ue=o.get(A.key);ue&&ne.push({provider:A,snapshot:ue})}if(ne.length===0){v(),u();return}let se=ne.find(A=>A.provider.key===r&&A.snapshot.accounts.length>0);se||v();let we=Date.now();Ve(L(ne,we),e),e.hidden=!1,se?ae(se,we):p()}function ae(ne,se){let we=d(),A=e.getBoundingClientRect(),ue=e.ownerDocument.documentElement.clientWidth;we.style.setProperty("--usage-meter-anchor-top",`${A.bottom}px`),we.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,ue-A.right)}px`),Ve(i`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${V}
        ></div>
        ${_e(ne,se)}`,we)}async function Le(ne){try{let se=await fetch(ne.endpoint);return se.ok?Hg(await se.json()):null}catch{return null}}async function Te(){l+=1;let ne=l,se=await Promise.all(dd.map(async we=>({provider:we,snapshot:await Le(we)})));if(!(t||ne!==l)){for(let we of se)we.snapshot?o.set(we.provider.key,we.snapshot):o.delete(we.provider.key);me()}}return u(),Te(),s=setInterval(()=>{Te()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),v(),u()}}}function md(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),l=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!l&&typeof s.dismissed_at!="number"}}var Gg="worker-ineligible";function ri(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function gd(e){return ri(e).includes(Gg)}var Kg="worker-serial";function ni(e){return ri(e).includes(Kg)}function si(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Vg=new Set(["done","failed","orphaned","stopped","discarded"]),Yg={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Zg={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Qg={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function oi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Qg[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function hd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,l=document.createElement("dialog");l.id="worker-parallel-analysis-dialog",l.className="pa",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),e.appendChild(l);let c=new Map,u=new Map,d=!1,p=null,m=null,v=null,C=new Set,F=!1,H=0,re=null,V=new Set;function q(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function O(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function P(){return o&&o()||""}async function L(){if(!s)return;let y=++H;F=!0,v=null,C.clear(),U();try{let R=await s("worker-parallel-analysis-targets",{root_dir:P()});if(y!==H||!J)return;let W=Array.isArray(R?.qualified)?R.qualified:[],oe=Array.isArray(R?.excluded)?R.excluded:[];v={qualified:W,excluded:oe};for(let Ce of W)Ce&&typeof Ce.id=="string"&&C.add(Ce.id)}catch{y===H&&J&&(v={qualified:[],excluded:[]},he("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{y===H&&(F=!1,J&&U())}}function $(y){return Array.isArray(y.runs)?y.runs:[]}function D(){let y=q(),R=new Set;for(let W of Object.values(y.attempts||{})){let oe=W;oe&&typeof oe.bead_id=="string"&&!Vg.has(oe.status)&&R.add(oe.bead_id)}for(let W of Array.isArray(y.pr_wait)?y.pr_wait:[])W&&typeof W.bead_id=="string"&&R.add(W.bead_id);for(let W of Object.values(y.discard_operations||{})){let oe=W;oe&&oe.phase!=="done"&&typeof oe.bead_id=="string"&&R.add(oe.bead_id)}return R}function K(y){return y.filter(R=>pe(R)===null)}function pe(y){let R=q();for(let W of Array.isArray(R.serial_lanes)?R.serial_lanes:[])if(Array.isArray(W?.entries)&&W.entries.some(oe=>oe.bead_id===y))return W.id;return(Array.isArray(R.queue)?R.queue:[]).some(W=>W.bead_id===y)?"parallel":null}function _e(y,R){let W=c.get(y);return W||[...R.order]}function me(y){if(y.length<2)return!1;let R=pe(y[0]);if(!R||R==="parallel")return!1;let W=q(),oe=(Array.isArray(W.serial_lanes)?W.serial_lanes:[]).find(Ae=>Ae.id===R)?.entries.map(Ae=>Ae.bead_id);if(!Array.isArray(oe))return!1;let Ce=y.map(Ae=>oe.indexOf(Ae));return Ce.every(Ae=>Ae>=0)&&Ce.every((Ae,De)=>De===0||Ae>Ce[De-1])}function ae(){let y=q(),R=Array.isArray(y.serial_lanes)?y.serial_lanes:[],W=R.find(oe=>Array.isArray(oe.entries)&&oe.entries.length===0);return W?W.id:R[0]?.id||"s1"}function Le(y){let R=q().bead_titles||{};return typeof R[y]=="string"?R[y]:y}async function Te(y,R){if(!s||d)return null;d=!0,U();try{return await s(y,R)}finally{d=!1,U()}}async function ne(y){n?.setPending?.(!0);try{let R=await Te("worker-parallel-analysis-start",{force:y,target_ids:Array.from(C)});R&&R.applied===!1&&R.reason&&(R.reason==="target_not_qualified"&&Array.isArray(R.detail)?he(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${R.detail.join(", ")}`,"error",3200):he(`\uBD84\uC11D \uC2E4\uD328: ${R.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function se(){let y=O().job;!s||!y||await s("worker-parallel-analysis-cancel",{job_id:y.job_id})}async function we(y){if(!(!s||V.has(y))){V.add(y),U();try{let R=await s("worker-parallel-analysis-prompt",{root_dir:P(),run_id:y});if(!J)return;if(R?.ok===!0&&typeof R.prompt=="string"){re={run_id:y,prompt:R.prompt};return}he(R?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{V.delete(y),U()}}}function A(){re=null,U()}async function ue(){if(!re)return;let y=await tr(re.prompt);he(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)}function E(y,R){a&&a(y,oi(R))}function M(){return q().runner_catalog}function ce(y){return Object.keys(M()?.runners?.[y]?.models||{})}function $e(y){let R=ce(y),W=M()?.runners?.[y]?.default_model;return typeof W=="string"&&R.includes(W)?W:R[0]||""}function ge(){let y=O().settings,R=p||y.runner||"claude",W=ce(R),oe=p?$e(R):y.model||W[0]||"",Ce=si(M(),R,oe),Ae=y.effort||"",De=Ce.includes(Ae)?Ae:Ce[0]||"";return{runner:R,model:oe,effort:De,models:W,efforts:Ce}}async function Oe(y){let R=O().settings,W=await Te("worker-parallel-analysis-settings-update",{expected_revision:R.revision,runner:y.runner,model:y.model,effort:y.effort});(!W||W.applied!==!0)&&(p=null,U(),W&&W.reason&&he(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${W.reason}`,"error",2800))}function _t(y){p=y,U();let R=ge();Oe({runner:y,model:R.model,effort:R.effort})}function He(y){let R=ge(),W=si(M(),R.runner,y);Oe({runner:R.runner,model:y,effort:W.includes(R.effort)?R.effort:W[0]||""})}function pt(y){let R=ge();Oe({runner:R.runner,model:R.model,effort:y})}async function tt(y,R){if(!s||d)return;let W=_e(y,R),oe=O();if(W.length<2||!oe.last_good){he("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Ce=u.get(y)||ae(),Ae=()=>({snapshot_digest:oe.last_good.identity_digest,group_index:y,lane:Ce,ordered_bead_ids:W,expected_revision:q().revision});d=!0,U();try{let De=await s("worker-parallel-analysis-submit",Ae());De&&De.queue&&r&&r.set(De.queue),De&&De.applied!==!0&&De.conflict===!0&&(De=await s("worker-parallel-analysis-submit",Ae()),De&&De.queue&&r&&r.set(De.queue)),De&&De.applied===!0?(c.delete(y),he(`\uC9C1\uB82C \uB808\uC778 ${Ce}\uC5D0 ${W.length}\uAC1C \uBC30\uCE58`,"success")):he(`\uC81C\uCD9C \uAC70\uBD80: ${De?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,U()}}function Y(y,R,W){c.set(y,_e(y,R).filter(oe=>oe!==W)),U()}function Z(y){c.delete(y),U()}function Se(y,R,W,oe){let Ce=[..._e(y,R)],Ae=Ce.indexOf(W),De=Ae+oe;Ae<0||De<0||De>=Ce.length||(Ce.splice(De,0,...Ce.splice(Ae,1)),c.set(y,Ce),U())}function Ze(){let y=O().settings,R=Object.keys(M()?.runners||{}),W=ge();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${oe=>_t(oe.target.value)}
        >
          ${R.map(oe=>i`<option
                value=${oe}
                ?selected=${W.runner===oe}
              >
                ${oe}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${oe=>He(oe.target.value)}
        >
          ${W.models.map(oe=>i`<option
                value=${oe}
                ?selected=${W.model===oe}
              >
                ${oe}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${oe=>pt(oe.target.value)}
        >
          ${W.efforts.map(oe=>i`<option
                value=${oe}
                ?selected=${W.effort===oe}
              >
                ${oe}
              </option>`)}
        </select>
      </label>
      ${je(y)}
    </div>`}function je(y){return!Qe(y)||rt(y)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:y.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${y.runner}/${y.model} · effort
        ${y.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:y.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function rt(y){return y.is_default===!0&&y.compatible===!1}function Qe(y){return!!(y.runner&&y.model&&y.effort)}function yt(y){return Qe(y)&&y.compatible!==!1}function Ie(y){let R=Math.max(0,Math.floor(y/1e3)),W=Math.floor(R/60),oe=R%60;return`${W}:${String(oe).padStart(2,"0")}`}function T(y){let R=y.job;if(R){let W=typeof R.started_at=="number"?R.started_at:0,oe=`${R.runner||"?"}/${R.model||"?"}`,Ce=W?` \xB7 \uACBD\uACFC ${Ie(Date.now()-W)}`:"",Ae=typeof R.session_id=="string"?R.session_id:"",De=$(y).find(Be=>Be.run_id===R.job_id);return i`<span class="pa-meta__progress">
        <span
          >분석 중 — ${oe} · effort ${R.effort||"?"}${Ce}</span
        >
        ${Ae?i`<code class="pa-session-id" title=${Ae}
              >${Ae.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>E(R.job_id,De||R)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${De?.prompt_saved!==!0||V.has(R.job_id)}
          @click=${()=>{we(R.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Q()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Q(){return n?.isPending?.()===!0}function Ee(y){let R=!!y.job,W=yt(y.settings),oe=v!==null&&C.size===0,Ce=R||d||Q()||F;return i`<div class="pa-meta">
      ${y.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(y.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${T(y)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!W||Ce||oe}
        @click=${()=>{ne(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!W||Ce||oe}
        @click=${()=>{ne(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!R}
        @click=${()=>{se()}}
      >
        취소
      </button>
    </div>`}function ee(y){return typeof y=="string"&&y.length>0?y:"\uBBF8\uBC30\uCE58"}function Ne(y,R){R?C.add(y):C.delete(y),U()}function et(y){let R=Array.isArray(y.scope)?y.scope:[],W=Array.isArray(y.overlaps)?y.overlaps:[];return R.length===0&&W.length===0?i``:i`<span class="pa-target__signals">
      ${R.length>0?i`<details class="pa-target__scope" title=${R.join(`
`)}>
            <summary>scope ${R.length}</summary>
            <ul>
              ${R.map(oe=>i`<li><code>${oe}</code></li>`)}
            </ul>
          </details>`:""}
      ${W.length>0?i`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${W.join(", ")}`}
            >겹침 ${W.join(", ")}</span
          >`:""}
    </span>`}function st(){let y=v?.qualified||[],R=v?.excluded||[];return i`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${F?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${y.length} \xB7 \uC81C\uC678 ${R.length}`}</span
        >
      </header>
      ${v&&y.length>0?i`<ul class="pa-targets__list">
            ${y.map(W=>i`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${W.id}
                      .checked=${C.has(W.id)}
                      @change=${oe=>Ne(W.id,oe.target.checked)}
                    />
                    <span class="pa-target__title">${W.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${et(W)}
                    <span class="pa-target__route">${W.route}</span>
                    <span class="pa-target__lane"
                      >${ee(W.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:v&&y.length===0?i`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${v&&R.length>0?i`<details class="pa-targets__excluded">
            <summary>제외 대상 ${R.length}</summary>
            <ul class="pa-targets__list">
              ${R.map(W=>i`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${W.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Yg[W.reason]||W.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ee(W.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Ye(y){let R=typeof y.session_id=="string"&&y.session_id.length>0,W=R?y.session_id:"";return i`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${y.outcome}"
        >${Zg[y.outcome]||y.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(y.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${y.runner||"?"} / ${y.model||"?"} / ${y.effort||"?"}</span
      >
      ${R?i`<code class="pa-session-id" title=${W}
            >${W.slice(0,8)}</code
          >`:i`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${y.outcome==="failure"&&y.reason?i`<span class="pa-run-row__reason">${y.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>E(y.run_id,y)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${y.prompt_saved!==!0||V.has(y.run_id)}
          @click=${()=>{we(y.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function ct(y){return i`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${y.length>0?i`<ul class="pa-runs__list">
            ${y.map(R=>Ye(R))}
          </ul>`:i`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function ft(){return re?i`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${A}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${re.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{ue()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${A}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${re.prompt}</pre
        >
      </section>
    </div>`:""}function ut(y,R){let W=_e(y,R),oe=D(),Ce=W.filter(h=>oe.has(h)),Ae=K(W),De=me(W),Be=Array.isArray(q().serial_lanes)?q().serial_lanes:[],At=u.get(y)||ae(),vt=R.eligible!==!0||W.length<2||Ce.length>0||Ae.length>0||De||d;return i`<section class="pa-group" data-group-index=${String(y)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${R.confidence}</span>
        ${R.categories.map(h=>i`<span class="pa-group__category">${h}</span>`)}
        ${De?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${R.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Ae.length>0?i`<span class="pa-group__stale"
              >stale — ${Ae.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${R.reason}</p>
      <ol class="pa-group__members">
        ${W.map((h,x)=>i`<li class="pa-member" data-bead-id=${h}>
              <span class="pa-member__seq">${x+1}</span>
              <span class="pa-member__title">${Le(h)}</span>
              ${oe.has(h)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${h}
                ?disabled=${x===0}
                aria-label=${`${h} \uC704\uB85C`}
                @click=${()=>Se(y,R,h,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${h}
                ?disabled=${x===W.length-1}
                aria-label=${`${h} \uC544\uB798\uB85C`}
                @click=${()=>Se(y,R,h,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${h}
                aria-label=${`${h} \uC81C\uC678`}
                @click=${()=>Y(y,R,h)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${R.evidence.map(h=>i`<li class="pa-evidence">
              <code>${h.path}</code>
              <span class="pa-evidence__locator">${h.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Z(y)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${h=>{u.set(y,h.target.value),U()}}
          >
            ${Be.map((h,x)=>i`<option
                  value=${h.id}
                  ?selected=${At===h.id}
                >
                  직렬 ${x+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${vt}
          @click=${()=>{tt(y,R)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ot(y){let R=Array.isArray(y.issues)?y.issues:[],W=R.filter(Ce=>Ce.verdict==="parallel_ok").length,oe=R.filter(Ce=>Ce.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${W}</span>
      <span>uncertain ${oe}</span>
    </div>`}function gt(){let y=J&&!!O().job;if(y&&m===null){m=setInterval(()=>U(),1e3);return}!y&&m!==null&&(clearInterval(m),m=null)}function U(){let y=O();p&&y.settings.runner===p&&(p=null);let R=y.last_good?.result;gt(),Ve(i`
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
            ${Ze()} ${Ee(y)} ${st()}
            ${R?i`${R.groups.map((W,oe)=>ut(oe,W))}
                ${R.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ot(R)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${ct($(y))}
          </div>
        </div>
        ${ft()}
      `,l)}let J=!1,be=()=>{J=!1,re=null,H+=1,gt()},Ge=y=>{y.target===y.currentTarget&&ve()};l.addEventListener("close",be),l.addEventListener("cancel",be),l.addEventListener("click",Ge);let Me=null;r&&r.subscribe&&(Me=r.subscribe(()=>{J&&U()}));let B=null;n&&n.subscribe&&(B=n.subscribe(()=>{J&&U()}));function te(){J||(J=!0,U(),L(),typeof l.showModal=="function"?l.showModal():l.setAttribute("open",""))}function ve(){J&&(J=!1,re=null,H+=1,gt(),typeof l.close=="function"?l.close():l.removeAttribute("open"))}return{open:te,close:ve,destroy(){J=!1,m!==null&&(clearInterval(m),m=null),l.removeEventListener("close",be),l.removeEventListener("cancel",be),l.removeEventListener("click",Ge),Me&&(Me(),Me=null),B&&(B(),B=null),l.remove()}}}var bd=new Set(["sh","bash","zsh","dash","ksh"]),yd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function vd(e){let t=e.split("/");return t[t.length-1]||""}function Xg(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=vd(r[0]);if(n!=="env")return bd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&bd.has(vd(s))}function Jg(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function eh(e){let t=[],r=0;yd.lastIndex=0;for(let n of e.matchAll(yd)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Jg(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function th(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function wd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",l="",c=0,u=null,d=!1;function p(P,L){return L?eh(P).map($=>$.kind==="plain"?$.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${$.kind}"
            >${$.text}</span
          >`):P}function m(){if(!s)return i``;let P=o==="ready"&&Xg(a),L=o==="ready"?a.split(`
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
              @click=${()=>{C()}}
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
                  ${L.map(($,D)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${D+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p($,P)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function v(){Ve(m(),n)}async function C(){if(o!=="ready")return;let P=await tr(a);he(P?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",P?"success":"error")}function F(P){P.key==="Escape"&&s&&(P.preventDefault(),q())}function H(){d||(document.addEventListener("keydown",F),d=!0)}function re(){d&&(document.removeEventListener("keydown",F),d=!1)}async function V(P,L=null){let $=++c;H(),s={...P},u=L||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",l="",v(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let K=t?t():"";if(!K){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",v();return}if(!r){o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",v();return}let pe="/api/repo-ops-script?workspace="+encodeURIComponent(K)+"&lane="+encodeURIComponent(P.lane)+"&base_sha="+encodeURIComponent(P.base_sha);try{let _e=await r(pe),me=await _e.json().catch(()=>({}));if($!==c)return;if((t?t():"")!==K){q();return}if(!_e.ok||!me||me.ok!==!0){o="error",l=th(me&&typeof me.error=="string"?me.error:""),v();return}s={lane:me.lane,base_sha:me.base_sha,path:me.path,base_ref:me.base_ref},a=String(me.content),o="ready",v()}catch{if($!==c)return;o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",v()}}function q(){c+=1,re(),s=null,a="",v();let P=u;u=null,P?.isConnected&&P.focus()}function O(){q(),n.remove()}return{open:V,close:q,destroy:O}}function kd(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let $=o();return typeof $.revision=="number"?$.revision:0}function l($){t&&$&&$.queue&&typeof $.queue=="object"&&t.set($.queue)}function c(){let $=o().workspace_info;return $&&typeof $=="object"?$:{}}function u($,D){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${$}"
      >${D}</span
    >`}function d($){if(typeof $!="number"||!Number.isFinite($))return"";let D=$/6e4;return Number.isInteger(D)?`timeout ${D}\uBD84`:`timeout ${Math.round($/1e3)}\uCD08`}function p($){let D=d($);return D?u("config",D):""}function m($,D,K){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${K.script}
      @click=${pe=>{s&&s({lane:$,base_sha:D.base_sha,path:K.script,base_ref:D.base_ref},pe.currentTarget)}}
    ></button>`}function v(){let $=o().repo_ops_opt_out;return{verify:$?.verify===!0,deploy:$?.deploy===!0}}function C($,D){return i`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!D}
        @change=${K=>{V($,!K.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F($){let D=typeof $.base_sha=="string"?$.base_sha:"",K=`${$.source_path||"repo-ops/config.toml"} @ ${$.base_ref||"?"}${D?`@${D.slice(0,7)}`:""}`,pe=v(),_e=!!$.verify&&pe.verify,me=!!$.deploy&&pe.deploy;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${K}</span>
      </p>
      <div
        class="worker-repo-ops__lane${_e?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${$.verify?i`${m("verify",$,$.verify)}
              ${p($.verify.timeout_ms)}
              ${_e?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${_e?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":$.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${$.verify?C("verify",pe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${me?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${$.deploy?i`${m("deploy",$,$.deploy)}
              ${p($.deploy.timeout_ms)}
              ${me?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${me?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":$.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${$.deploy?C("deploy",pe.deploy):""}
      </div>
    </section>`}function H($){let D=$.repo_ops&&typeof $.repo_ops=="object"?$.repo_ops:null;return D&&(D.status==="resolved"||D.status==="absent")?F(D):D&&(D.status==="pending"||D.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${D.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${D.error_code?i` — <code>${D.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function re($){if(!r)return;let D=await r("worker-auto-repair-toggle",{on:$,expected_revision:a()});if(l(D),D&&D.conflict){let K=await r("worker-auto-repair-toggle",{on:$,expected_revision:a()});l(K)}n()}async function V($,D){if(!r)return;let K=await r("worker-repo-ops-opt-out-toggle",{kind:$,opted_out:D,expected_revision:a()});if(l(K),K&&K.conflict){let pe=await r("worker-repo-ops-opt-out-toggle",{kind:$,opted_out:D,expected_revision:a()});l(pe)}n()}let q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function O($,D,K){return i`<div class="worker-repo-ops__policy-group" data-policy=${K}>
      <div class="worker-repo-ops__policy-label">${$}</div>
      <ul class="worker-repo-ops__policy-list">
        ${D.map(pe=>i`<li data-token=${pe}>
              ${q[pe]||pe}
            </li>`)}
      </ul>
    </div>`}function P($){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${$.map(D=>{let K=[q[D.trigger]||D.trigger];return Number.isInteger(D.attempts_per_operation_attempt)?K.push(`operation\uB2F9 ${D.attempts_per_operation_attempt}\uD68C`):Number.isInteger(D.attempts)?K.push(`${q[D.budget]||D.budget} ${D.attempts}\uD68C`):Number.isInteger(D.sessions_per_user_action)&&K.push(`${D.sessions_per_user_action}\uD68C`,q[D.user_actions]||D.user_actions),D.applies_when&&K.push(q[D.applies_when]||D.applies_when),i`<li data-token=${D.id}>
            <strong>${q[D.id]||D.id}</strong>
            <span>${K.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function L(){let $=o(),D=$.auto_repair!==!1,K=$.repo_operation_policy&&typeof $.repo_operation_policy=="object"?$.repo_operation_policy:null,pe=Array.isArray($.repo_operations)?$.repo_operations:[],_e=pe.find(Te=>Te.state==="repairing"),me=pe.filter(Te=>Te.state==="failed"||Te.state==="repairing"),ae=me.length?Math.min(...me.map(Te=>typeof Te.repair?.remaining=="number"?Te.repair.remaining:0)):K?.auto_repair?.resolution_ladder?.find(Te=>Te.id==="auto_repair_session")?.attempts??1,Le=Array.isArray(K?.auto_repair?.resolution_ladder)?K.auto_repair.resolution_ladder:[];return i`<section
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
          @change=${Te=>{re(Te.target.checked)}}
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
          >${_e?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${_e.repair?.owner_bead||_e.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${K?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(K.worker_automatic||[]).length} · 해결 사다리
                ${Le.length} · 금지
                ${(K.never_automatic||[]).length}</span
              >
            </summary>
            ${O("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",K.worker_automatic||[],"worker-automatic")}
            ${K.supported===!1||K.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${K.schema_version})`}
                </div>`:P(Le)}
            ${O("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",K.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${H(c())} ${L()}
      </details>`}}}var Sd=20,rh=5,nh=new Set(["failed","repairing","running","queued","retry_pending"]),$d={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},xd={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function sh(e,t,r=Sd){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function oh(e){if(e.type==="cleanup")return!0;let t=e.operation;return nh.has(t.state)&&!t.dismissed&&!t.superseded_by}function ah(e,t,r={}){let n=sh(e,t,1/0),s=r.expanded===!0?Sd:rh,o=new Set(n.slice(0,s)),a=n.filter(l=>o.has(l)||oh(l));return{visible:a,hidden:n.length-a.length}}function Ad(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function ih(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Ed(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Td(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function lh(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(xd,n)?xd[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function ch(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${wo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Ad(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn($d,t.kind)?$d[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${yo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${cs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Ad(e)}"
          >${ih(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Td(_u(t.failure_kind,n)):""}
      ${lh(t)}
      ${Ed([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${yo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function uh(e){let t=e.cleanup,r=on(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${wo(e.at)||"\u2014"}</span
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
        ${Ou(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Td(Ao(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Ed([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function dh(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(n=>n.type==="cleanup"?uh(n):ch(n))}
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
  </section>`}function Cd(e,t={}){let r=null;function n(){if(r===null){Ve(i``,e);return}let a=ah(r.operations,r.cleanup_failures,{expanded:r.expanded});Ve(dh({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let l=a.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){o();return}l?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var ph=Ct("views:worker"),fh="tab:worker:ready",_h="tab:worker:blocked",mh="tab:worker:in-progress",gh="tab:worker:resolved",hh="tab:worker:closed",Io=1,Rd=5;function Ld(e){return lo(e).path.length>0}var bh=new Set(["quick_fix","spec_backed","full_plan"]);function Id(e){return typeof e=="string"&&bh.has(e)}var Md="beads-ui.worker.candidate-filter",ai={show_blocked:!1,spec:"all"};function yh(){try{let e=window.localStorage.getItem(Md);if(!e)return{...ai};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ai};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ai}}}function vh(e){try{window.localStorage.setItem(Md,JSON.stringify(e))}catch{}}function wh(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var kh=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Nd="bdui.worker.candidate_sort",$h=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Oo="spec";function xh(){try{let e=window.localStorage.getItem(Nd);return e==="board"||e==="created"||e==="spec"?e:Oo}catch{return Oo}}function Ah(e){try{window.localStorage.setItem(Nd,e)}catch{}}var qd="bdui.worker.done-range";function Sh(){try{let e=window.localStorage.getItem(qd);return ar(e)?e:er}catch{return er}}function Eh(e){try{window.localStorage.setItem(qd,e)}catch{}}var Th="(max-width: 640px)",Fd="beads-ui.worker.lane-collapsed",gs={queue:!0,done:!0};function Ch(){try{let e=window.localStorage.getItem(Fd);if(!e)return{...gs};let t=JSON.parse(e);return!t||typeof t!="object"?{...gs}:{queue:typeof t.queue=="boolean"?t.queue:gs.queue,done:typeof t.done=="boolean"?t.done:gs.done}}catch{return{...gs}}}function Rh(e){try{window.localStorage.setItem(Fd,JSON.stringify(e))}catch{}}function Od(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Lh(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Qr):(n.sort(Ds(r)),t==="board"?n:[...n.filter(Ld),...n.filter(s=>!Ld(s))])}function Ih(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Oh(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Pd(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Ph(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Dh(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Mh(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Nh(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ii(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function qh(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Dd(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function Fh(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):Dd(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Dd(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Pd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Pd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function jh(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,d=null,p=null,m=null,v={},C=!1,F=!1,H={}){let re=!!c&&c.position>0,V=!!c?.continuation_action&&c.continuation_action.continuation===null,q=!!c&&c.active===!0,O=c&&c.failure||null,P=Dh(c?c.waiting:null,m),L=r[e]||null,$=L&&L.gate?L.gate:null,D=L&&L.pr?L.pr:null,K=qh(m),pe=Mh(c?c.resolution:null),_e=Nh(c?c.head_review:null),me=c&&c.head_review||null,ae=c&&c.authority||null,Le=!!me&&["pending","reviewing","revising"].includes(me.state),Te=re&&!q&&(me?.state==="failed"||!ae||ae.source==="automatic"&&!F),ne=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":pe?pe.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":P,se=!!$&&$.base_badge==="\uCDA9\uB3CC",we=!!$&&$.enabled===!0,A=_s({bead_id:e,merge_sha:H.merge_sha,cleanup_cursor:H.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:H.repo_operations}),ue=Lo(A),E=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!$&&$.tier==="merged",M=l&&!!n&&!!$&&$.tier==="merged",ce=Te&&(we||se||$?.reason==="base_behind"||$?.reason==="review_receipt_missing"||$?.reason==="review_receipt_stale"||E||M),$e=l&&se&&u===!1,ge=yr(v,e,{external:l,merge_active:q||A?.step==="merge",merge_queued:re,conflict_active:!!a,cleanup_active:ue,merged:!!n||$?.tier==="merged"}),Oe=!!ge.operation,_t=!E&&!!n&&n.step==="repo_operations",He=Fh({continuation_required:V,merge_step:A,conflict_badge:ne,conflict_live:pe?.live===!0||a==="running",head_review:me&&_e?{..._e,state:me.state,failure_reason:me.failure_reason}:null,recovery:K,cleanup_failed:n,cleanup_label:n?on(n.step):null,base_exception:p,conflicting:se,gate:$,receipt_check:L&&L.receipt_check?L.receipt_check:null,queue_failure:O,auto_skip:d,queued:re,queue_active:q,queue_position:c?c.position:0,activity:ne?null:o&&o.activity||null}),pt=He?.live===!0&&He.title?i`<span title=${He.title}>${He.label}</span>`:He?.label||null;return{id:e,title:l?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&A?.active!==!0?Ro(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:C,external:l,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:He?.live!==!0&&He?.title?He.label:null,completion_title:He?.title||"",completion_repair_pr_url:K?K.repair_pr_url:"",completion_repair_pr_number:K?K.repair_pr_number:null,badges:pt?[pt]:[],live_badge:He?.live===!0?pt:null,usage:s,alert:He?.alert===!0,merge_action:$?.tier==="merged"&&!E&&!M||_t?!1:!re||V||Te,timeline_action:_t,cancel_action:re&&!V,cancel_enabled:(!q||Le)&&!(K&&K.lock_actions),cancel_title:K&&K.lock_actions?`${K.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:q&&!Le?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Le?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ge,discard_action:ge.action,merge_step:A,discard_enabled:ge.enabled,discard_title:ge.title,merge_enabled:!A&&!a&&!Oe&&!p&&!(K&&K.lock_actions)&&!$e&&!_t&&(we||se||$?.reason==="base_behind"||$?.reason==="review_receipt_missing"||$?.reason==="review_receipt_stale"||E||M||ce),merge_label:V?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":E||M?"\uC815\uB9AC \uC7AC\uAC1C":se&&!A&&!E?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":$?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":$?.reason==="review_receipt_missing"||$?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Te?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Oe?ge.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ge.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ge.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:V?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":A?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${A.label}`:M?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":E?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":se?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":$?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":$?.reason==="review_receipt_missing"||$?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":$?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":we?`\uBA38\uC9C0 (${$.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:$&&$.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${$&&$.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function li(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:d,onDoneRangeChange:p}=t,m=n?Ns(n,l):null,v=Bs({transport:r,uiOrderStore:l}),C=null,F=[],H=yh(),re=null,V=xh(),q=ar(d)?d:Sh(),O=new Map;function P(){let f=Rr.find(w=>w.value===q);return f?f.label:"\uC624\uB298"}let L=Ch(),$=!1,D=new Set,K=new Set,pe=new Set,_e=new Set,me=new Set,ae={},Le=null,Te=0,ne=null,se=[];function we(f){return Le===f?ae:{}}async function A(){if(!r)return;let f=u?.()||"";if(Le===f||ne&&ne.key===f&&ne.generation===Te)return;let w=++Te;ne={key:f,generation:w};let G=null;try{G=await Promise.resolve(r("get-session-defaults",{}))}catch(_){if(w!==Te)return;ne=null,ph("get-session-defaults failed: %o",_),j();return}w===Te&&(ae=G&&typeof G.values=="object"&&G.values!==null?{...G.values}:{},Le=f,ne=null,j())}function ue(){Le=null,Te+=1,A()}let E=document.createElement("div");E.className="worker-console";let M=document.createElement("div");M.className="worker-top";let ce=document.createElement("div");ce.className="worker-drawer-overlay",ce.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let ge=document.createElement("div");ge.className="worker-drawer-host";let Oe=document.createElement("div");Oe.className="worker-drawer-host",Oe.hidden=!0,ce.append($e,ge,Oe);let _t=document.createElement("div");_t.className="worker-lanes-host",E.append(M,ce,_t),e.appendChild(E);let He=null,pt=null,tt=Tn(ge,{transport:r,sessionLogStore:a,onClose:()=>{He=null,pt=null,ce.hidden=!0,j()}}),Y=Cd(Oe,{onClose:()=>{Oe.hidden=!0,ce.hidden=!0,j()}}),Z=wd({getWorkspacePath:u||(()=>"")}),Se=u&&u()||"",Ze=kd({queueStore:s,transport:r,onChanged:()=>j(),onOpenScript:(f,w)=>{Z.open(f,w)}}),je=o?hd(E,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(f,w)=>Dt(f,w)}):null;function rt(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Io,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Qe(){let f=rt(),w=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,G=Array.isArray(f.serial_lanes)?f.serial_lanes:[],_=[];for(let le of G){if(_.length>=w)break;!le||typeof le.id!="string"||!/^s[1-5]$/.test(le.id)||!Array.isArray(le.entries)||_.push({id:le.id,label:`\uC9C1\uB82C ${le.id.slice(1)}`,count:le.entries.length})}return _.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},..._]}function yt(f){if(!re||!f.some(G=>G.id===re))return null;let w=Qe();return w?{bead_id:re,lanes:w}:null}function Ie(){let f=rt();return typeof f.revision=="number"?f.revision:0}function T(f){f&&f.queue&&s&&s.set(f.queue)}function Q(){let f=rt().queue;return Array.isArray(f)?f.length:0}async function Ee(f,w,G){if(!r)return;let _=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},...G===void 0?{}:{index:G},expected_revision:Ie()}),b=await r("worker-queue-place",_());T(b),b&&b.conflict&&await r("worker-queue-place",_()).then(T)}async function ee(f,w,G){if(!r)return;let _=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},to_index:G,expected_revision:Ie()}),b=await r("worker-queue-reorder",_());T(b),b&&b.conflict&&await r("worker-queue-reorder",_()).then(T)}async function Ne(f){if(!r)return;let w=await r("worker-queue-remove",{bead_id:f,expected_revision:Ie()});T(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:f,expected_revision:Ie()}).then(T)}async function et(f){if(!r||!f)return;let w=await r("worker-attempt-pause",{attempt_id:f});w&&w.paused===!1&&w.reason&&he(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function st(f){if(!r||!f)return;let w=await xn();if(w===null)return;let G=async(b={})=>await r("worker-attempt-resume",{attempt_id:f,expected_revision:Ie(),...w!==""?{instructions:w}:{},...b}),_=await G();T(_),_&&_.conflict&&(_=await G(),T(_)),_=await wr(_,(b,le)=>G({continuation:b,decision_token:le}),{onResult:T,refresh:()=>G()}),_&&_.resumed===!1&&!_.conflict&&_.reason&&he(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Ye(f){if(!r||!f)return;let w=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:Ie()});T(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:Ie()}),T(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&he(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function ct(f,w,G=!0){if(!r)return null;let _=r,b=await _(f,{...w,expected_revision:Ie()});return T(b),b&&b.conflict&&G&&(b=await _(f,{...w,expected_revision:Ie()}),T(b)),b}async function ft(f){if(!r||!f)return;let w=rt().merge_queue?.find(_=>_.bead_id===f)?.continuation_action;if(w?.mismatch&&w.continuation===null){await ot(f,w.mismatch);return}D.add(f),j();let G;try{G=await ct("worker-merge-queue-add",{bead_id:f})}finally{D.delete(f),j()}!G||G.conflict||G.applied||he(Ph(G.reason),"error",2400)}async function ut(f){if(!(!r||!f||K.has(f))){K.add(f),j();try{let w=await r("worker-cleanup-retry",{bead_id:f,expected_revision:Ie()});T(w),w&&!w.retried&&!w.conflict&&w.reason&&he(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{K.delete(f),j()}}}async function ot(f,w){let G=await wr({continuation_mismatch:w},(b,le)=>ct("worker-merge-queue-add",{bead_id:f,continuation:b,decision_token:le},!1)),_=G?.queue?.merge_queue?.find(b=>b.bead_id===f)?.continuation_action;if(G?.applied!==!0&&_?.continuation===null&&_.mismatch){await ot(f,_.mismatch);return}G&&G.applied===!1&&!G.conflict&&he("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function gt(f){if(!r)return;let w=await ct("worker-merge-auto-toggle",{on:f});!w||w.conflict||he(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function U(f){if(!r||!f)return;let w=await ct("worker-merge-queue-remove",{bead_id:f});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&he("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function J(){await ct("worker-merge-queue-remove",{all:!0})}async function be(f,w=null,G="unmerged",_=null){if(!r||!f)return;let b=us(f,G);if(!(!!_||typeof globalThis.confirm!="function"||globalThis.confirm(b)))return;let ie=await r("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},..._?{operation_id:_}:{},expected_revision:Ie()});if(T(ie),ie&&ie.conflict&&(ie=await r("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},..._?{operation_id:_}:{},expected_revision:Ie()}),T(ie)),ie&&ie.discarded===!0){he(ko(ie),"success",5e3);return}if(ie&&ie.reason){he(`\uD3D0\uAE30 \uC2E4\uD328: ${ie.reason}`,"error",2800);return}if(ie&&ie.accepted&&ie.pending==="merged_revert"){he("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ie&&ie.accepted&&!ie.discarded){he(`\uD3D0\uAE30 \uC9C4\uD589: ${ie.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ie&&!ie.conflict&&he("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Ge(f,w,G){if(!(!r||!w||!G||_e.has(w))){_e.add(w),j();try{let _=await r(f,{bead_id:w,action_id:G,expected_revision:Ie()});T(_),_?.conflict?he("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!_?.ok&&_?.reason&&he(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(_.reason)}`,"error",2800)}finally{_e.delete(w),j()}}}async function Me(f,w){if(!r||!w||pe.has(w))return;pe.add(w),j();let G;try{let _=async(b={})=>await r(f,{bead_id:w,expected_revision:Ie(),...b});G=await _(),T(G),G&&G.conflict&&(G=await r(f,{bead_id:w,expected_revision:Ie()}),T(G)),f==="worker-revise-fix"&&(G=await wr(G,(b,le)=>_({continuation:b,decision_token:le}),{onResult:T,refresh:()=>_()}))}finally{pe.delete(w),j()}if(!(!G||G.conflict)){if(G.ok){he(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}he(`\uCC98\uBD84 \uAC70\uBD80: ${G.reason||""}`,"error",3e3)}}async function B(f){if(!r)return;let w=await r("worker-automation-toggle",{on:f,expected_revision:Ie()});T(w),w&&w.conflict&&await r("worker-automation-toggle",{on:f,expected_revision:Ie()}).then(T)}async function te(f){if(!r||!f)return;let w=await r("worker-repo-operation-repair",{operation_id:f});if(T(w),w&&w.ok===!1){he(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&he("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function ve(f){if(!r||!f)return;let w=await r("worker-repo-operation-dismiss",{operation_id:f});T(w),w&&w.ok===!1&&he(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function y(f){if(!r||!Number.isFinite(f))return;let w=Math.max(Io,Math.floor(f)),G=await r("worker-queue-set-slots",{slots:w,expected_revision:Ie()});T(G),G&&G.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:Ie()}).then(T)}async function R(f){if(!r||!Number.isInteger(f)||f<1||f>Rd)return;let w=rt(),G=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(f).reduce((le,ie)=>le+(Array.isArray(ie?.entries)?ie.entries.length:0),0),_=()=>({count:f,expected_revision:Ie()}),b=await r("worker-queue-set-serial-lane-count",_());T(b),b&&b.conflict&&(b=await r("worker-queue-set-serial-lane-count",_()),T(b)),b&&b.applied&&G>0&&he(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${G}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function W(){let f=rt(),w=m?m.selectBoardColumn(fh,"ready"):[],G=m?m.selectBoardColumn(_h,"blocked"):[],_=m?m.selectBoardColumn(hh,"closed"):[],b=m?m.selectBoardColumn(mh,"in_progress"):[],le=m?m.selectBoardColumn(gh,"resolved"):[],ie=Fs([...w,...G,...b,...le,..._]),Ue=new Map;for(let g of[...w,...G,...b])g&&g.id&&!Ue.has(g.id)&&Ue.set(g.id,g);let xe={...we(u?.()||"")};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let z=f[g];typeof z=="string"&&(xe[g]=z)}function k(g,z){let fe=Ue.get(g);if(!fe)return null;let Ke=fe.metadata&&typeof fe.metadata=="object"?fe.metadata:{},dt=fe.workflow?.route,Bt=Ke.route,qt=Id(dt)?dt:Id(Bt)?Bt:null;return Qt({pin:Ke,global:xe,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:qt,controller_runtime:z})}function X(g){let z=g.runner||null,fe=k(g.bead_id,z),Ke=So(g),dt=fe?qr(fe,z):null;return Ke||dt?{orchestration:Ke,worker:dt}:null}let I=new Map;function Re(g){if(I.has(g))return I.get(g)??null;let z=k(g,null),fe=null;if(z){let Ke=gr(f.runner_catalog??null,z.orchestration_model.value??""),dt=Ke===null?z:k(g,Ke),Bt=sn(dt,f.runner_catalog??null),qt=qr(dt,Ke);fe=Bt||qt?{orchestration:Bt,worker:qt}:null}return I.set(g,fe),fe}function lt(g){let z=js(ie,g);return z.total===0?null:z}let at=f.bead_titles||{},Xe=new Map;for(let[g,z]of Object.entries(at))typeof z=="string"&&z.length>0&&Xe.set(g,z);for(let g of[...w,...G])Xe.set(g.id,g.title||g.id);let Je=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},Ot=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},Jt=new Map;for(let[g,z]of Object.entries(Ot))Array.isArray(z)&&Jt.set(g,ni(z));for(let g of[...w,...G]){let z=g.labels;Array.isArray(z)&&!Jt.has(g.id)&&Jt.set(g.id,ni(z))}let an=new Map,ln=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(ln)?ln:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let z=g.members.map(Ke=>{let dt=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(Bt=>Bt.entries.some(qt=>qt.bead_id===Ke));return dt?dt.id:null});if(!(z.every(Ke=>Ke!==null)&&new Set(z).size===1))for(let Ke of g.members)an.set(Ke,g.members.filter(dt=>dt!==Ke))}let hs=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},cn=new Map;for(let[g,z]of Object.entries(Je))z&&typeof z=="object"&&cn.set(g,z);for(let g of[...w,...G])cn.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let Ur=g=>cn.get(g)||{},Wr=f.pr_wait||[],un=f.pr_observations||{},bs=f.pr_activity||{},We=f.cleanup_failed||{},Lt=Object.entries(We).map(([g,z])=>({bead_id:g,step:z&&z.step?z.step:"",reason:z&&z.reason?z.reason:"",at:z&&typeof z.at=="number"?z.at:null,detail:z&&typeof z.detail=="string"?z.detail:null,output_tail:z&&typeof z.output_tail=="string"&&z.output_tail?z.output_tail:void 0,log_path:z&&typeof z.log_path=="string"&&z.log_path?z.log_path:void 0,retry_count:z&&typeof z.retry_count=="number"&&Number.isInteger(z.retry_count)&&z.retry_count>0?z.retry_count:0,failure_code:z&&typeof z.failure_code=="string"?z.failure_code:void 0,subject_id:z&&typeof z.subject_id=="string"?z.subject_id:void 0,repair_eligible:!!(z&&z.repair_eligible),repair:z&&z.repair?z.repair:void 0})),dn=f.queue||[],Xd=new Set([...dn.map(g=>g.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(z=>z.bead_id)),...Wr.map(g=>g.bead_id),...f.done.map(g=>g.bead_id)]),Jd=new Set(G.map(g=>g.id)),ep=l?l.get()?.order||{}:{},pi=new Set,fi=[];for(let g of[...w,...G])Xd.has(g.id)||pi.has(g.id)||Ih(g)||(pi.add(g.id),fi.push(g));F=Lh(fi,V,ep);let tp=f.admission||{},_i=g=>{let z=tp[g];if(!z)return"";if(z.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let fe=typeof z.reason=="string"?z.reason:"",Ke=fe.indexOf(":");return Ke>0&&Ke<fe.length-1?`\u26D4 ${fe.slice(0,Ke)} (${fe.slice(Ke+1)})`:`\u26D4 ${fe}`},rp=F.map(g=>{let z=lo(g),fe=z.path.length>0,Ke=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",dt=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,Bt=Object.hasOwn(g,"labels")&&gd(g.labels),qt=!Bt&&(Ke?dt:fe&&!z.conflict),St=Jd.has(g.id),dr=[];St&&dr.push(Oh(g)),Ke&&!dt?dr.push("missing_description"):!Ke&&z.conflict?dr.push("spec_id_conflict"):!Ke&&!fe&&dr.push("spec \uC5C6\uC74C");let Ss=_i(g.id);return Ss&&dr.push(Ss),{id:g.id,title:g.title||g.id,reason:dr.join(" \xB7 "),draggable:qt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ke,status:g.status,worker_ineligible:Bt,blocked:St,has_spec:fe,exec_chips:Re(g.id)}}),Po=wh(rp,H),np=Po.visible,sp=f.revise_parked||{},ys=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Do=(g,z)=>g.map((fe,Ke)=>{let dt=z!=="done",Bt=z!=="done"&&z!=="queue",qt=dt?sp[fe.bead_id]:null,St=dt?yr(ys,fe.bead_id):null,dr=St?.operation?St:null,Ss=dt&&Jt.get(fe.bead_id)===!0,qi=hs[fe.bead_id]||[],jo=f.admission&&typeof f.admission=="object"?f.admission[fe.bead_id]:null,Bo=dt?uu(jo,!!dr||_e.has(fe.bead_id)):null,hp=dt&&!Bo?_i(fe.bead_id):null,bp=dt?[hp]:[],Fi=dt&&qi.length>0&&typeof jo?.reason=="string"&&jo.reason.startsWith("not_ready")?[`\u23F8 ${qi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Uo=dt?an.get(fe.bead_id):void 0;return Uo&&Uo.length>0&&Fi.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Uo.join(", ")}\uC640`),{id:fe.bead_id,title:Xe.get(fe.bead_id)||fe.bead_id,reason:bp.filter(Boolean).join(" \xB7 "),draggable:dt&&!dr&&!Bo,done:z==="done",lane:z,seq:Bt?Ke+1:void 0,worker_serial:Ss,discard:dr,stale_work:Bo,badges:[...Fi,...qt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!qt,revise_action:!!qt,revise_enabled:!!qt&&!dr&&!pe.has(fe.bead_id),revise_title:qt?qt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${qt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:z==="done"?lr(f.attempts||{},fe.bead_id):null,work_ms:z==="done"?vo(f.attempts||{},fe.bead_id):null,done_at:z==="done"&&typeof fe.added_at=="number"?fe.added_at:void 0,exec_chips:dt?Re(fe.bead_id):null,...Ur(fe.bead_id)}}),pn=f.attempts?Object.values(f.attempts):[],Mo=new Set;for(let g of pn)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&Mo.add(g.resumed_from);let mi=new Map;for(let g of pn)mi.set(g.bead_id,g.attempt_id);let vs=new Map;for(let g of pn)vs.set(g.attempt_id,g);function No(g){let z=new Set,fe=g;for(;fe&&!z.has(fe.attempt_id);){if(fe.conflict_resolution===!0)return!0;z.add(fe.attempt_id),fe=typeof fe.resumed_from=="string"&&fe.resumed_from.length>0&&vs.get(fe.resumed_from)||null}return!1}let ws=typeof f.declared_base=="string"?f.declared_base:null;function op(g){let z=null;for(let fe of pn)!fe||fe.bead_id!==g||No(fe)||(z===null||(typeof fe.started_at=="number"?fe.started_at:0)>=(typeof z.started_at=="number"?z.started_at:0))&&(z=fe);return z&&typeof z.target_base=="string"?z.target_base:null}let gi=[],hi=[],ap=md(f),bi=g=>{let z=typeof g.session_id=="string"&&g.session_id.length>0,fe=Mo.has(g.attempt_id);return{eligible:z&&!fe,reason:z?fe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},ur=null;for(let g of pn){let z=g.status==="paused"&&!Mo.has(g.attempt_id);if(g.status==="running"||z)hi.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Xe.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:z,conflict_resolution:No(g),base_exception:ii(ws,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:yr(ys,g.bead_id,{attempt_id:g.attempt_id}),usage:lr(f.attempts||{},g.bead_id),rollup:lt(g.bead_id),rollup_expanded:me.has(g.bead_id),exec_chips:X(g),...Ur(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&ap(g)){let fe=bi(g);gi.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Xe.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:yr(ys,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:fe.eligible,resume_reason:fe.reason,conflict_resolution:No(g),base_exception:ii(ws,g.target_base),usage:lr(f.attempts||{},g.bead_id),rollup:lt(g.bead_id),rollup_expanded:me.has(g.bead_id),exec_chips:X(g),...Ur(g.bead_id)}),ur=g}}let ks=[...gi,...hi].map(g=>{let z=vs.get(g.attempt_id),fe=z?.quickfix_landing;if(z?.quickfix_lane!==!0||!fe||typeof fe!="object")return g;let Ke=typeof fe.reason=="string"&&fe.reason.length>0?fe.reason:null,dt=_s({bead_id:z.bead_id,merge_sha:fe.head_sha,cleanup_cursor:fe.cursor,cleanup_failed:Ke?{step:fe.cursor,reason:Ke}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return dt?{...g,landing:dt}:g}),yi=null;if(ur){let g=bi(ur),z=ur.cause_detail;yi={bead_id:ur.bead_id,repo:ur.repo||"",reason:ur.cause||ur.status,cause_detail:z&&typeof z.reason=="string"?{reason:z.reason,command:typeof z.command=="string"?z.command:null}:null,resume_attempt_id:ur.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:yr(ys,ur.bead_id,{attempt_id:ur.attempt_id})}}let vi=new Set(ks.map(g=>g.bead_id)),qo=Array.isArray(f.merge_queue)?f.merge_queue:[],wi=new Map,ki=new Map,$i=new Map,xi=new Map,Ai=new Map;qo.forEach((g,z)=>{g&&typeof g.bead_id=="string"&&(wi.set(g.bead_id,z+1),ki.set(g.bead_id,g.resolution),$i.set(g.bead_id,g.continuation_action||null),xi.set(g.bead_id,g.head_review||null),Ai.set(g.bead_id,g.authority||null))});let fn=f.merge_queue_state||{active:null,failures:{}},ip=fn.failures||{},Si=fn.waiting&&typeof fn.waiting.bead_id=="string"&&typeof fn.waiting.reason=="string"?fn.waiting:null,lp=f.auto_merge_skips||{},Ei=g=>{let z=lp[g];if(!z)return null;let fe=un[g],Ke=fe&&fe.pr?fe.pr.head_sha:null;return Ke&&Ke===z.head_sha?z.reason||"":null},$s=new Map;for(let g of ks)g.failed!==!0&&g.conflict_resolution&&(g.paused?$s.has(g.bead_id)||$s.set(g.bead_id,"paused"):$s.set(g.bead_id,"running"));let Ti=ks.filter(g=>!g.paused&&g.failed!==!0).length,Ci=(f.workspace_info||{}).slots,Ri=typeof Ci=="number"?Ci:typeof f.slots=="number"?f.slots:Io,cp=Ti>Ri,xs=Yr(q),up=(Array.isArray(f.done)?f.done.slice():[]).filter(g=>xs===void 0||typeof g.added_at!="number"||g.added_at>=xs).sort((g,z)=>(z.added_at||0)-(g.added_at||0)),Dn=Do(up,"done"),dp=new Set((Array.isArray(f.done)?f.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Li=[],pp=u?.()||"";for(let g of _){let z=Xr(g.closed_at);if(typeof g.id!="string"||dp.has(g.id)||z===null||xs!==void 0&&z<xs||typeof g.comment_count!="number"||g.comment_count<=0)continue;let fe=`${pp}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ke=O.get(fe);Ke===void 0&&r&&(O.set(fe,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(dt=>{let Bt=Array.isArray(dt)&&dt.some(qt=>co(typeof qt?.text=="string"?qt.text:"")?.lane==="session");O.set(fe,Bt?"session":"not-session"),j()}).catch(()=>{O.set(fe,"failed"),j()})),Ke==="session"&&Li.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:z,created_at:g.created_at,updated_at:g.updated_at})}Dn.push(...Li),Dn.sort((g,z)=>(z.done_at||0)-(g.done_at||0));let As={};for(let g of kr)As[g]=0;let Ii=!1,Oi=0,Fo=0,Pi=0;for(let g of Dn){let z=g.usage;if(z&&typeof z=="object"){let fe=!1;for(let Ke of kr)Number.isFinite(z[Ke])&&(As[Ke]+=z[Ke],Ii=!0,fe=!0);fe&&(Fo+=1,Number.isFinite(z.total_cost_usd)&&(Oi+=z.total_cost_usd,Pi+=1))}}Fo>0&&Pi===Fo&&(As.total_cost_usd=Oi);let Di=Dn.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),fp=Di.length>0?Wt(Vs(Di)):Ii?$r(As):null,_p=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},mp=Array.isArray(f.serial_lanes)?f.serial_lanes:[],Mi=g=>{if(Wr.some(Ke=>Ke.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let z=pn.filter(Ke=>Ke&&Ke.bead_id===g),fe=z.length>0?z[z.length-1].status:null;return fe==="failed"||fe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":fe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ni=mp.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,z)=>{let fe=_p[g.id]||{},Ke=new Map((Array.isArray(fe.corrections)?fe.corrections:[]).filter(St=>St&&typeof St.bead_id=="string"&&typeof St.after=="string").map(St=>[St.bead_id,St.after])),dt=Do(g.entries.filter(St=>!vi.has(St.bead_id)),g.id).map(St=>Ke.has(St.id)?{...St,badges:[`\u{1F517} ${Ke.get(St.id)} \uB4A4 (blocks \uC790\uB3D9)`,...St.badges]}:St),Bt=Array.isArray(fe.occupied_by)?fe.occupied_by.filter(St=>typeof St=="string"):[],qt=Bt.map(St=>({id:St,title:Xe.get(St)||St,draggable:!1,lane:g.id,ghost:!0,badges:[Mi(St)]}));return{id:g.id,index:z+1,rows:[...qt,...dt],occupied:Bt.length>0,badge:Bt.length>0?Mi(Bt[0]):"\uB300\uAE30",cycle:fe.cycle===!0}}),gp=typeof f.serial_lane_count=="number"?f.serial_lane_count:Ni.length;return{queue:f,idToTitle:Xe,candidates:np,candidate_hidden:{blocked:Po.hidden_blocked,spec:Po.hidden_spec},running:ks,live_count:Ti,slots:Ri,over_cap:cp,failure:yi,waiting:Do(dn.filter(g=>!vi.has(g.bead_id)),"queue"),serial_lanes:Ni,serial_lane_count:gp,pr_wait:Wr.map(g=>jh(g.bead_id,Xe.get(g.bead_id)||g.bead_id,un,We[g.bead_id]||null,lr(f.attempts||{},g.bead_id),bs[g.bead_id]||(D.has(g.bead_id)||K.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),$s.get(g.bead_id)||null,g.external===!0,{position:wi.get(g.bead_id)||0,active:fn.active===g.bead_id,failure:ip[g.bead_id]||null,waiting:Si?.bead_id===g.bead_id?Si.reason:null,resolution:ki.get(g.bead_id),continuation_action:$i.get(g.bead_id),head_review:xi.get(g.bead_id)||null,authority:Ai.get(g.bead_id)||null},g.wt_present!==!1,f.auto_merge===!0?Ei(g.bead_id):null,ii(ws,op(g.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[g.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},vs.get(mi.get(g.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(g=>({...g,...Ur(g.id)})),merge_queue_length:qo.length,merge_queue_running:qo.length>0,auto_excluded:Wr.map(g=>g.bead_id).filter(g=>Ei(g)!==null),declared_base:ws,done:Dn,token_total:fp,cleanup_failures:Lt,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function oe(){let w=!!o?.get()?.job,G=!w&&o?.isPending?.()===!0,_=w?"\uBD84\uC11D \uC911":G?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${_?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${_?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${_?i`<span class="worker-analysis-btn__badge">${_}</span>`:""}
    </button>`}function Ce(f){let w=f.waiting.length>0?f.waiting[0].id:"\u2014",G=i`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,_=h(f),b=f.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",le=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${P()} 완료 <b>${f.done.length}</b></span
      >`,ie=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,Ue=i`<label class="worker-tgl worker-slots"
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
          ${Array.from({length:Rd},(X,I)=>I+1).map(X=>i`<option
                value=${String(X)}
                ?selected=${f.serial_lane_count===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      ${o?oe():""} `,xe=gu({failure:f.failure}),k=cu(f.repo_operations,f.cleanup_failures);return $?i`<div class="worker-ribbon">
          ${G} ${_}
          <div class="worker-kpi worker-kpi--ribbon">${b}${le}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ue}</div>
          <div class="worker-kpi">${ie}</div>
        </div>
        ${k}${Ze.template()}${xe}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${G}${_}${Ue}</div>
        <div class="worker-kpi">
          ${b}${le}${ie}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${P()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(X=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${X.tooltip}
                >${P()} 완료 · 누적 ${X.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${k}${Ze.template()}${xe}`}function Ae(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let w=f.running.some(G=>!G.paused&&G.failed!==!0);return i`<section
      class="worker-now${w?" worker-pane--live":""}"
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
      ${f.pr_wait.map(G=>In(G))}
    </section>`}function De(f){let w=f.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${H.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${kh.map(G=>i`<button
              type="button"
              class="worker-filter__chip${H.spec===G.value?" is-active":""}"
              data-spec=${G.value}
              aria-pressed=${H.spec===G.value?"true":"false"}
            >
              ${G.label}
            </button>`)}
        ${w.spec>0?i`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function Be(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${V}
    >
      ${$h.map(f=>i`<option value=${f.value} ?selected=${V===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function At(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${q}
      >
        ${Rr.map(f=>i`<option value=${f.value} ?selected=${q===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function vt(f){let w=i`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,G=f.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return sr({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:w,controls:G})}function h(f){let w=f.queue.auto_merge===!0;if(f.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(w)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let G=new Set(f.auto_excluded),_=f.pr_wait.filter(b=>b.merge_action&&b.merge_enabled&&!G.has(b.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${_>0?` ${_}`:""}
    </button>`}function x(f){let w=sr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Be(),controls:De(f),place_menu:yt(f.candidates)});return $?i`<div class="worker-lanes worker-lanes--mobile">
        ${Ae(f)}
        ${sr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:L.queue,preview:Od(f.waiting)})}
        ${f.serial_lanes.map(G=>vt(G))}
        ${w}
        ${sr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${P()} \uC644\uB8CC \uC5C6\uC74C`,controls:At(),collapsible:!0,collapsed:L.done,preview:Array.isArray(f.token_total)?f.token_total.map(G=>G.label).join(" \xB7 "):f.token_total||Od(f.done)})}
      </div>`:i`<div class="worker-lanes">
      ${w}
      <div class="worker-wait">
        ${sr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(G=>vt(G))}
      </div>
      ${sr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(G=>!G.paused&&G.failed!==!0),body:Ga(f.running,Date.now(),He)})}
      ${sr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${sr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${P()} ${f.done.length}`,items:f.done,empty:`${P()} \uC644\uB8CC \uC5C6\uC74C`,controls:At()})}
    </div>`}function N(f){L={...L,[f]:!L[f]},Rh(L),j()}function j(){let f=W();Ve(Ce(f),M),Ve(x(f),_t)}function ye(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(Th);$=!!f.matches;let w=G=>{let _=!!(G&&typeof G.matches=="boolean"?G.matches:f.matches);_!==$&&($=_,j())};typeof f.addEventListener=="function"?(f.addEventListener("change",w),se.push(()=>f.removeEventListener("change",w))):typeof f.addListener=="function"&&(f.addListener(w),se.push(()=>f.removeListener(w)))}let ke=null;function qe(f){ke=f.target instanceof Element?f.target:null}function ze(f){let G=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!G)return;if(ke&&G.contains(ke)&&ke.closest("input, button, a")){f.preventDefault();return}let _=G.dataset.beadId||"",b=G.dataset.lane||"";C={bead_id:_,from_lane:b};try{f.dataTransfer?.setData("text/plain",_),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function kt(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;let G=w.dataset.lane||"";G!=="candidate"&&G!=="queue"&&!/^s[1-5]$/.test(G)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function mt(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ft(f,w){let G=F.find(ie=>ie.id===f);if(!G)return;let _=F.filter(ie=>ie.id!==f),b=_.length;if(w){let ie=w.dataset.beadId;if(ie===f)return;let Ue=_.findIndex(xe=>xe.id===ie);Ue>=0&&(b=Ue)}let le=_.slice();le.splice(b,0,G),v.applyReorder(f,le,b)}function Tt(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;f.preventDefault(),w.classList.remove("worker-pane--drag-over");let G=w.dataset.lane||"",_=C?.bead_id||f.dataTransfer?.getData("text/plain")||"",b=C?.from_lane||"";if(C=null,!_)return;let le=f.target?.closest?.(".worker-mini, .worker-card"),ie=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),Ue=ie.length;if(le){let xe=ie.indexOf(le);xe>=0&&(Ue=xe)}if(Ue=Math.max(0,Ue-w.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(Ue=Q()),G==="candidate"){if(b==="candidate"){Ft(_,le);return}(b==="queue"||/^s[1-5]$/.test(b))&&Ne(_);return}if(G==="queue"||/^s[1-5]$/.test(G)){let xe=G==="queue"?"parallel":G;b===G?ee(_,xe,Ue):Ee(_,xe)}}function Nt(f){H=f,vh(f),j()}function nt(f){V=f==="board"||f==="created"||f==="spec"?f:Oo,Ah(V),j()}function zt(f){q=ar(f)?f:er,Eh(q),p?.(q),j()}function Fe(f){let w=f.target?.closest?.(".worker-serial-lane-count");if(w){let Ue=Number.parseInt(w.value,10);Number.isFinite(Ue)&&R(Ue).then(j);return}let G=f.target?.closest?.(".worker-filter__blocked");if(G){Nt({...H,show_blocked:G.checked});return}let _=f.target?.closest?.(".worker-done-range");if(_){zt(_.value);return}let b=f.target?.closest?.(".worker-sort");if(b){nt(b.value||Oo);return}let le=f.target?.closest?.(".worker-slots__input");if(!le)return;let ie=Number.parseInt(le.value,10);if(!Number.isFinite(ie)){j();return}y(ie).then(j)}function S(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function de(){let f=W();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Pe(){He&&tt.close(),Oe.hidden=!1,ce.hidden=!1,Y.open(de()),j()}function ht(f){let w=rt(),G=w.attempts?w.attempts[f]:null;He=f,pt=null,Y.close(),Oe.hidden=!0,ce.hidden=!1,tt.open({attempt_id:f,meta:S(G)}),j()}function Dt(f,w){He=null,pt=f,Y.close(),Oe.hidden=!0,ce.hidden=!1,tt.open({attempt_id:f,meta:w,hide_prompt:!0}),j()}function $t(){if(Y.isOpen()&&Y.refresh(de()),pt){let G=(o?.get()?.runs||[]).find(_=>_.run_id===pt);G?tt.updateMeta(oi(G)):tt.close();return}if(!He)return;let f=rt(),w=f.attempts?f.attempts[He]:null;if(w){tt.updateMeta(S(w));return}tt.close()}function Mt(f){let w=f.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-parallel-analysis-dialog"))return;if(w?.closest?.(".worker-analysis-btn")){je?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){Pe();return}let G=w?.closest?.(".worker-repo-op__session");if(G){let We=G.dataset.attemptId;We&&ht(We);return}let _=w?.closest?.(".worker-repo-op__resolve");if(_){te(_.dataset.operationId||"");return}let b=w?.closest?.(".worker-repo-op__dismiss");if(b){ve(b.dataset.operationId||"");return}let le=w?.closest?.(".worker-cleanup__resume");if(le){let We=le.dataset.beadId;We&&ut(We);return}let ie=w?.closest?.(".worker-banner__resume");if(ie){let We=ie.dataset.attemptId;We&&st(We);return}let Ue=w?.closest?.(".worker-banner__discard");if(Ue){let We=Ue.dataset.confirmation==="merged"?"merged":"unmerged";be(Ue.dataset.beadId||"",Ue.dataset.attemptId||null,We,Ue.dataset.operationId||null);return}let xe=w?.closest?.(".worker-banner__dismiss");if(xe){let We=xe.dataset.attemptId;We&&Ye(We);return}if(w?.closest?.(".worker-play")){B(!rt().auto_advance);return}let k=w?.closest?.(".worker-merge-all");if(k){k.classList.contains("worker-merge-all--stop")?rt().auto_merge===!0?gt(!1):J():gt(!0);return}let X=w?.closest?.(".worker-pane__hd--toggle");if(X){let We=X.dataset.lane;(We==="queue"||We==="done")&&N(We);return}let I=w?.closest?.(".worker-card__place-lane");if(I){let We=I.dataset.beadId,Lt=I.dataset.lane;We&&(Lt==="parallel"||/^s[1-5]$/.test(Lt||""))&&(re=null,j(),Ee(We,Lt));return}if(w?.closest?.(".worker-card__place-cancel")){re=null,j();return}let lt=w?.closest?.(".worker-card__place");if(lt){let We=lt.dataset.beadId;We&&!lt.disabled&&(Qe()?(re=We,j()):Ee(We,"parallel"));return}let at=w?.closest?.(".worker-filter__chip");if(at){let We=at.dataset.spec;(We==="all"||We==="with"||We==="without")&&Nt({...H,spec:We});return}let Xe=w?.closest?.(".worker-mini__merge");if(Xe){let We=Xe.dataset.beadId||"";rt().cleanup_failed?.[We]?ut(We):ft(We);return}let Je=w?.closest?.(".worker-mini__merge-cancel");if(Je){U(Je.dataset.beadId||"");return}let Ot=w?.closest?.(".worker-mini__discard");if(Ot){be(Ot.dataset.beadId||"",Ot.dataset.attemptId||null,Ot.dataset.discardMode==="merged"?"merged":"unmerged",Ot.dataset.operationId||null);return}let Jt=w?.closest?.(".worker-mini__stale-continue");if(Jt){Ge("worker-stale-work-continue",Jt.dataset.beadId||"",Jt.dataset.actionId||"");return}let an=w?.closest?.(".worker-mini__stale-backup");if(an){Ge("worker-stale-work-backup-fresh",an.dataset.beadId||"",an.dataset.actionId||"");return}let ln=w?.closest?.(".worker-mini__stale-recheck");if(ln){Ge("worker-stale-work-recheck",ln.dataset.beadId||"",ln.dataset.actionId||"");return}let hs=w?.closest?.(".worker-mini__revise-fix");if(hs){Me("worker-revise-fix",hs.dataset.beadId||"");return}let cn=w?.closest?.(".worker-mini__revise-approve");if(cn){Me("worker-revise-approve",cn.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let We=w?.closest?.(".rtile"),Lt=We?.dataset?.beadId,dn=We?.dataset?.attemptId;Lt&&be(Lt,dn||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let Lt=w?.closest?.(".rtile")?.dataset?.attemptId;Lt&&Ye(Lt);return}if(w?.closest?.(".rtile__pause")){let Lt=w?.closest?.(".rtile")?.dataset?.attemptId;Lt&&et(Lt);return}if(w?.closest?.(".rtile__resume")){let Lt=w?.closest?.(".rtile")?.dataset?.attemptId;Lt&&st(Lt);return}if(w?.closest?.(".rtile__session")){let Lt=w?.closest?.(".rtile")?.dataset?.attemptId;Lt&&ht(Lt);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){Y.close(),tt.close();return}if(w?.closest?.(".worker-drawer-host"))return;let Ur=w?.closest?.(".rtile .board-card__roll-toggle");if(Ur){let We=Ur.dataset.rollParent;We&&(me.has(We)?me.delete(We):me.add(We),j());return}let Wr=w?.closest?.(".rtile .board-card__roll-child");if(Wr){let We=Wr.dataset.childId;We&&c&&c(We);return}let un=w?.closest?.(".rtile");if(un){if(w?.closest?.(".rtile__id")){let Lt=un.dataset.beadId;Lt&&tr(Lt).then(dn=>{dn?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let We=un.dataset.beadId;We&&c&&c(We);return}let bs=w?.closest?.(".worker-mini, .worker-card");if(bs){let We=bs.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){We&&tr(We).then(Lt=>{Lt?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}We&&c&&c(We)}}return e.addEventListener("pointerdown",qe),e.addEventListener("dragstart",ze),e.addEventListener("dragover",kt),e.addEventListener("dragleave",mt),e.addEventListener("drop",Tt),e.addEventListener("click",Mt),e.addEventListener("change",Fe),ye(),m&&se.push(m.subscribe(()=>{for(let[f,w]of O)w==="failed"&&O.delete(f);j()})),s&&se.push(s.subscribe(()=>{let f=u&&u()||"";f!==Se&&(Se=f,Z.close()),j(),$t()})),o&&typeof o.subscribe=="function"&&se.push(o.subscribe(()=>{$t(),j()})),j(),{load(){A(),j()},refreshSessionDefaults:ue,destroy(){for(let f of se.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",qe),e.removeEventListener("dragstart",ze),e.removeEventListener("dragover",kt),e.removeEventListener("dragleave",mt),e.removeEventListener("drop",Tt),e.removeEventListener("click",Mt),e.removeEventListener("change",Fe);try{tt.destroy()}catch{}ce.hidden=!0;try{je?.destroy()}catch{}try{Z.destroy()}catch{}Ve(i``,e)}}}function ci(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function jd(e,t,r,n=async()=>{},s=async()=>{}){let o=Ct("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function d(L){let D=L.target.value,pe=t.getState().workspace?.current?.path||"";if(D&&D!==pe){o("switching workspace to %s",D),l=!0,P();try{await r(D)}catch(_e){o("workspace switch failed: %o",_e)}finally{l=!1,P()}}}async function p(){let L=t.getState(),$=L.workspace?.current?.path||L.workspace?.available?.[0]?.path||"";if(!(!$||c)){o("git-pulling workspace %s",$),c=!0,P();try{await n($)}catch(D){o("workspace git pull failed: %o",D)}finally{c=!1,P()}}}function m(L){let $=L.target;$&&e.contains($)||F()}function v(L){L.key==="Escape"&&F()}function C(){u||(u=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",v),P())}function F(){u&&(u=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",v),P())}function H(){u?F():C()}async function re(L){let $=L.target,D=$.value,K=$.checked;o("toggling visibility %s \u2192 %s",D,String(K));try{await s(D,K)}catch(pe){o("workspace visibility toggle failed: %o",pe)}}function V(L){return L?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${p}
        ?disabled=${l||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function q(L,$){return i`
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
        ${u?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${L.map(D=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${D.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${D.path}"
                        .checked=${!$.has(D.path)}
                        @change=${re}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ci(D.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function O(){let L=t.getState(),$=L.workspace?.current,D=L.workspace?.available||[],K=new Set(L.workspace?.hidden||[]),pe=$?.path||D[0]?.path||"";if(D.length===0)return i``;let _e=D.filter(me=>!K.has(me.path)||me.path===pe);if(_e.length<=1){let me=_e[0]||D[0],ae=ci(me.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${me.path}"
            >${ae}</span
          >
          ${q(D,K)}
          ${V(pe)}
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
          ${_e.map(me=>i`
              <option
                value="${me.path}"
                ?selected=${me.path===pe}
                title="${me.path}"
              >
                ${ci(me.path)}
              </option>
            `)}
        </select>
        ${q(D,K)}
        ${V(pe)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function P(){Ve(O(),e)}return P(),a=t.subscribe(()=>P()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",v),Ve(i``,e)}}}var Bd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function ui(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ud(e,t,r=ui()){return{id:r,type:e,payload:t}}function Wd(e={}){let t=Ct("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,d=[],p=new Map,m=new Set;function v(O){for(let P of Array.from(m))try{P(O)}catch{}}function C(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),v(o);let O=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),P=(r.jitterRatio||0)*O,L=Math.max(0,Math.round(O+(Math.random()*2-1)*P));t("ws retry in %d ms (attempt %d)",L,a+1),l=setTimeout(()=>{l=null,q()},L)}function F(O){try{s?.send(JSON.stringify(O))}catch(P){t("ws send failed",P)}}function H(){for(o="open",t("ws open"),v(o),a=0;d.length;){let O=d.shift();O&&F(O)}}function re(O){let P;try{P=JSON.parse(String(O.data))}catch{t("ws received non-JSON message");return}if(!P||typeof P.id!="string"||typeof P.type!="string"){t("ws received invalid envelope");return}if(u.has(P.id)){let $=u.get(P.id);u.delete(P.id),P.ok?$?.resolve(P.payload):$?.reject(P.error||new Error("ws error"));return}let L=p.get(P.type);if(L&&L.size>0)for(let $ of Array.from(L))try{$(P.payload)}catch(D){t("ws event handler error",D)}else t("ws received unhandled message type: %s",P.type)}function V(){o="closed",t("ws closed"),v(o);for(let[O,P]of u.entries())P.reject(new Error("ws disconnected")),u.delete(O);a+=1,C()}function q(){if(!c)return;let O=n();try{s=new WebSocket(O),t("ws connecting %s",O),o="connecting",v(o),s.addEventListener("open",H),s.addEventListener("message",re),s.addEventListener("error",()=>{}),s.addEventListener("close",V)}catch(P){t("ws connect failed %o",P),C()}}return q(),{send(O,P){if(!Bd.includes(O))return Promise.reject(new Error(`unknown message type: ${O}`));let L=ui(),$=Ud(O,P,L);return t("send %s id=%s",O,L),new Promise((D,K)=>{u.set(L,{resolve:D,reject:K,type:O}),s&&s.readyState===s.OPEN?F($):(t("queue %s id=%s (state=%s)",O,L,o),d.push($))})},on(O,P){p.has(O)||p.set(O,new Set);let L=p.get(O);return L?.add(P),()=>{L?.delete(P)}},onConnection(O){return m.add(O),()=>{m.delete(O)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,q()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Bh(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Uh(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var di=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],zd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],jr="tab:worker:closed",Wh="bdui.worker.done-range",Hd=Vu,Gd="worker:queue",Kd="worker:parallel-analysis",Vd="ui:order",Yd="ui:display-policy",Zd="exec:presets",Br="tab:board:closed",Qd="beads-ui.board.closed-range";function zh(e){let t=Ct("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ve(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),l=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&_d(a),l&&c&&u&&d){let ue=function(_,b){let le="Request failed",ie="";if(_&&typeof _=="object"){let xe=_;if(typeof xe.message=="string"&&xe.message.length>0&&(le=xe.message),typeof xe.details=="string")ie=xe.details;else if(xe.details&&typeof xe.details=="object")try{ie=JSON.stringify(xe.details,null,2)}catch{ie=""}}else typeof _=="string"&&_.length>0&&(le=_);let Ue=b&&b.length>0?`Failed to load ${b}`:"Request failed";A.open(Ue,le,ie)},T=function(_){return`${nt.getState().workspace.current?.path||""}\0${_}`},Q=function(){Z&&(Z().catch(()=>{}),Z=null),Se=null,Ze=null},ee=function(_){je=_;let b=()=>{je!==_||nt.getState().selected_id!==_||(je=null,Ee(_))};if(!yt){Qe.then(b);return}b()},Ye=function(_,b,le,ie,Ue){return le!==st[b]?(Ue().catch(()=>{}),!1):(_.set(ie,Ue),!0)},ft=function(){let _=nt.getState();J(_.view==="board"),ve(_.view==="worker"),Ce(_.view==="monitor"),R(_.view==="board"||_.view==="worker"||ct||!!_.selected_id)},gt=function(){let _=Yr(ut);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},U=function(){let _=Yr(ot);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},J=function(_){if(_)for(let[b,le]of di){if(Ne.has(b)||et.has(b))continue;let ie=b===Br?gt():{type:le};try{$e.register(b,ie)}catch(k){t("register %s store failed: %o",b,k)}et.add(b);let Ue=st.board,xe=!1;ce.subscribeList(b,ie).then(k=>{xe=!Ye(Ne,"board",Ue,b,k)}).catch(k=>{t("subscribe %s failed: %o",b,k),ue(k,"board")}).finally(()=>{et.delete(b),xe&&ft()})}else Me()},Me=function(){st.board+=1;for(let[_]of di){let b=Ne.get(_);b&&(b().catch(()=>{}),Ne.delete(_));try{$e.unregister(_)}catch(le){t("unregister %s failed: %o",_,le)}}},ve=function(_){if(!_){y();return}for(let[b,le]of zd){if(B.has(b)||et.has(b))continue;let ie=b===jr?U():{type:le};try{$e.register(b,ie)}catch(k){t("register %s store failed: %o",b,k)}et.add(b);let Ue=st.worker,xe=!1;ce.subscribeList(b,ie).then(k=>{xe=!Ye(B,"worker",Ue,b,k)}).catch(k=>{t("subscribe %s failed: %o",b,k),ue(k,"worker")}).finally(()=>{et.delete(b),xe&&ft()})}},y=function(){st.worker+=1;for(let[_]of zd){let b=B.get(_);b&&(b().catch(()=>{}),B.delete(_));try{$e.unregister(_)}catch(le){t("unregister %s failed: %o",_,le)}}},R=function(_){if(!_){W();return}te||(M("subscribe-worker-queue",{id:Gd}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),M("subscribe-worker-parallel-analysis",{id:Kd}).catch(b=>{t("subscribe-worker-parallel-analysis failed: %o",b)}),te=()=>(M("unsubscribe-worker-parallel-analysis",{id:Kd}),M("unsubscribe-worker-queue",{id:Gd})))},W=function(){te&&(te().catch(()=>{}),te=null),Oe.clear()},Ce=function(_){if(!_){Ae();return}oe||(M("subscribe-monitor-pipeline",{id:Hd}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),oe=()=>M("unsubscribe-monitor-pipeline",{id:Hd}))},Ae=function(){oe&&(oe().catch(()=>{}),oe=null)},Be=function(){De||(M("subscribe-ui-order",{id:Vd}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),De=()=>M("unsubscribe-ui-order",{id:Vd}))},At=function(){De&&(De().catch(()=>{}),De=null),He.clear()},h=function(){vt||(M("subscribe-display-policy",{id:Yd}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),vt=()=>M("unsubscribe-display-policy",{id:Yd}))},x=function(){vt&&(vt().catch(()=>{}),vt=null),pt.clear()},j=function(){N||(M("subscribe-impl-presets",{id:Zd}).catch(_=>{t("subscribe-impl-presets failed: %o",_)}),N=()=>M("unsubscribe-impl-presets",{id:Zd}))},mt=function(_){if(!_)return"Unknown";let b=_.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var p=ue,m=T,v=Q,C=ee,F=Ye,H=ft,re=gt,V=U,q=J,O=Me,P=ve,L=y,$=R,D=W,K=Ce,pe=Ae,_e=Be,me=At,ae=h,Le=x,Te=j,ne=mt;let se=document.getElementById("header-loading"),we=kl(se),A=lu(e),E=Wd(),M=we.wrapSend((_,b)=>E.send(_,b)),ce=_l(M),$e=ml(),ge=bl(),Oe=hl(),_t=Ji(),He=gl(),pt=Qi(),tt=Xi(),Y=el();E.on("impl-presets-snapshot",_=>{let b=_;b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&tt.set({revision:b.revision,presets:b.presets})}),E.on("monitor-pipeline-snapshot",_=>{let b=_;if(!(!b||!Array.isArray(b.workspaces)))try{_t.set(b.workspaces,b.workspaces_state)}catch{}}),E.on("ui-order-snapshot",_=>{let b=_;if(b&&typeof b.revision=="number")try{He.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),E.on("display-policy-snapshot",_=>{let b=_;if(b&&b.policy&&typeof b.policy=="object")try{pt.set(b.policy)}catch{}}),E.on("session-log-snapshot",_=>{let b=_;if(b&&typeof b.id=="string")try{Y.set(b.id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),E.on("session-log-append",_=>{let b=_;if(b&&typeof b.id=="string")try{Y.append(b.id,b.event)}catch{}}),E.on("snapshot",_=>{let b=_,le=b&&typeof b.id=="string"?b.id:"",ie=le?$e.getStore(le):null;if(ie&&b&&b.type==="snapshot")try{ie.applyPush(b)}catch{}}),E.on("upsert",_=>{let b=_,le=b&&typeof b.id=="string"?b.id:"",ie=le?$e.getStore(le):null;if(ie&&b&&b.type==="upsert")try{ie.applyPush(b)}catch{}}),E.on("delete",_=>{let b=_,le=b&&typeof b.id=="string"?b.id:"",ie=le?$e.getStore(le):null;if(ie&&b&&b.type==="delete")try{ie.applyPush(b)}catch{}});let Z=null,Se=null,Ze=null,je=null,rt=()=>{},Qe=new Promise(_=>{rt=()=>_(void 0)}),yt=!1,Ie=!1;async function Ee(_){let b=T(_);if(b===Se||b===Ze)return;Ze=b;let le=`detail:${_}`,ie={type:"issue-detail",params:{id:_}};try{$e.register(le,ie)}catch(Ue){t("register detail store failed: %o",Ue)}try{let Ue=await ce.subscribeList(le,ie);if(nt.getState().selected_id!==_||T(_)!==b){await Ue().catch(()=>{});return}Z&&await Z().catch(()=>{}),Z=Ue,Se=b}catch(Ue){t("detail subscribe failed: %o",Ue),ue(Ue,"issue details")}finally{Ze===b&&(Ze=null)}}let Ne=new Map,et=new Set,st={board:0,worker:0},ct=!1,ut=er;try{let _=window.localStorage.getItem(Qd);ar(_)&&(ut=_)}catch{}let ot=er;try{let _=window.localStorage.getItem(Wh);ar(_)&&(ot=_)}catch{}async function be(_){if(!ar(_)||_===ut)return;ut=_;try{window.localStorage.setItem(Qd,_)}catch{}let b=Ne.get(Br);if(!b)return;Ne.delete(Br),await b().catch(()=>{});let le=gt();try{$e.register(Br,le)}catch(ie){t("register %s store failed: %o",Br,ie)}try{let ie=await ce.subscribeList(Br,le);Ne.set(Br,ie)}catch(ie){t("re-subscribe %s failed: %o",Br,ie),ue(ie,"board")}}async function Ge(_){if(!ar(_)||_===ot)return;ot=_;let b=B.get(jr);if(!b)return;B.delete(jr),await b().catch(()=>{});let le=U();try{$e.register(jr,le)}catch(ie){t("register %s store failed: %o",jr,ie)}try{let ie=await ce.subscribeList(jr,le);B.set(jr,ie)}catch(ie){t("re-subscribe %s failed: %o",jr,ie),ue(ie,"worker")}}let B=new Map,te=null,oe=null,De=null,vt=null,N=null;async function ye(){vt=null,pt.clear(),N=null,tt.clear(),te=null,oe=null,Ne.clear(),B.clear(),st.board+=1,st.worker+=1,j();let _=nt.getState().workspace.current?.path;if(_)try{await E.send("set-workspace",{path:_})}catch(le){t("workspace restore after reconnect failed: %o",le);return}h();let b=nt.getState();J(b.view==="board"),ve(b.view==="worker"),Ce(b.view==="monitor"),R(b.view==="board"||b.view==="worker"||!!b.selected_id)}async function ke(){t("clearing all subscriptions for workspace switch"),Me(),y(),W(),ge.clear(),At(),Be(),x(),h(),Q();let _=nt.getState();if(_.selected_id)try{$e.unregister(`detail:${_.selected_id}`)}catch{}let b=nt.getState();J(b.view==="board"),ve(b.view==="worker"),Ce(b.view==="monitor"),R(b.view==="board"||b.view==="worker"||!!b.selected_id),b.selected_id&&ee(b.selected_id)}async function qe(_){t("requesting workspace switch to %s",_),Ie=!0;try{let b=await E.send("set-workspace",{path:_});t("workspace switch result: %o",b),b&&b.workspace&&(nt.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),b.changed&&(await ke(),he("Switched to "+mt(_),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),he("Failed to switch workspace","error",3e3),b}finally{Ie=!1}}async function ze(_){t("requesting workspace git pull for %s",_);try{let b=await E.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let le=b?.status;if(le==="up_to_date"){he("Already up to date","success",2e3);return}if(le==="stash_pop_conflict"){he("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}he("Git pulled "+mt(_),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let le=b?.code,ie=b?.message;if(le==="rebase_conflict"){he("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(le==="rebase_conflict_abort_failed"){he("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(le==="busy"){he("Git pull skipped: another operation is running","warning",3e3);return}let Ue=ie?`: ${ie}`:"";throw he(`Git pull failed${Ue}`,"error",3e3),b}}async function kt(_,b){t("setting workspace visibility %s \u2192 %s",_,String(b));try{await E.send("set-workspace-visibility",{path:_,visible:b}),await Ft()}catch(le){t("workspace visibility update failed: %o",le),he("Failed to update project visibility","error",3e3)}}async function Ft(){try{let _=await E.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let b=_.workspaces.map(xe=>({path:xe.path,database:xe.database,pid:xe.pid,version:xe.version})),le=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,ie=Array.isArray(_.hidden)?_.hidden.filter(xe=>typeof xe=="string"):[];nt.setState({workspace:{current:le,available:b,hidden:ie}});let Ue=window.localStorage.getItem("beads-ui.workspace");Ue&&(!b.some(k=>k.path===Ue)||ie.includes(Ue)?window.localStorage.removeItem("beads-ui.workspace"):le&&Ue!==le.path&&(t("restoring saved workspace preference: %s",Ue),await qe(Ue)))}}catch(_){t("failed to load workspaces: %o",_)}}E.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(nt.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Ft(),ke())});let Tt=!1;if(typeof E.onConnection=="function"){let _=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(Tt=!0,he("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&Tt&&(Tt=!1,he("Reconnected","success",2200),Uh(nt,(le,ie)=>{t(`${le}: %o`,ie)}),ye())};E.onConnection(_)}let Nt="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(Nt=_)}catch(_){t("view parse error: %o",_)}let nt=wl({config:Bh(),view:Nt});E.on("worker-queue-snapshot",_=>{let b=_;if(!b||!b.queue)return;let le=nt.getState().workspace.current?.path;if(typeof le=="string"&&le.length>0&&b.root_dir!==le){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{ge.set(b.queue)}catch{}}),E.on("worker-parallel-analysis-snapshot",_=>{let b=_;if(!b)return;let le=nt.getState().workspace.current?.path;if(!(typeof le=="string"&&le.length>0&&typeof b.root_dir=="string"&&b.root_dir!==le))try{Oe.set({settings:b.settings,job:b.job??null,runs:Array.isArray(b.runs)?b.runs:[],last_good:b.last_good??null})}catch{}});let zt=yl(nt);zt.start();let Fe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),S=async(_,b)=>{try{return await M(_,b)}catch(le){if(Fe.has(_))throw le;return[]}};Zu({global_element:n,repo_element:s},nt,zt);let de=document.getElementById("workspace-picker");de&&jd(de,nt,qe,ze,kt);let Pe=ed(e,(_,b)=>M(_,b));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>Pe.open())}catch{}let ht=sd(e,{policyStore:pt,queueStore:ge,implPresetStore:tt,transport:(_,b)=>M(_,b),onOpenChange:_=>{let b=ct;ct=_,ft(),b&&_===!1&&$t.refreshSessionDefaults()},labelOptions:()=>{let _=new Set;for(let[b]of di)for(let le of $e.snapshotFor(b)||[]){let ie=le.labels;if(Array.isArray(ie))for(let Ue of ie)typeof Ue=="string"&&Ue.length>0&&_.add(Ue)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&(_.setAttribute("aria-label","\uC124\uC815"),_.setAttribute("title","\uC124\uC815"),_.addEventListener("click",()=>ht.open()))}catch{}let Dt=Dl(l,{gotoIssue:_=>zt.gotoIssue(_),issueStores:$e,transport:S,workerQueueStore:ge,uiOrderStore:He,displayPolicyStore:pt,closedRange:ut,onClosedRangeChange:_=>{be(_)},onNewIssue:()=>Pe.open()}),$t=li(c,{transport:S,issueStores:$e,queueStore:ge,analysisStore:Oe,sessionLogStore:Y,uiOrderStore:He,gotoIssue:_=>nt.setState({selected_id:_}),getWorkspacePath:()=>nt.getState().workspace.current?.path,doneRange:ot,onDoneRangeChange:_=>{Ge(_)}}),Mt=Yu(u,{transport:S,pipelineStore:_t,execPresetStore:tt,sessionLogStore:Y,router:zt,gotoIssue:_=>zt.gotoIssue(_),getWorkspacePath:()=>nt.getState().workspace.current?.path,switchWorkspace:_=>qe(_)}),f=iu(d,{issueStores:$e,transport:S,queueStore:ge,execPresetStore:tt,sessionLogStore:Y,getWorkspacePath:()=>nt.getState().workspace.current?.path,onNavigate:_=>{nt.getState().view==="worker"?nt.setState({selected_id:_}):zt.gotoIssue(_)},onClose:()=>{let _=nt.getState();nt.setState({selected_id:null});try{zt.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{ht.open("execution")}}),w=nt.getState().selected_id;w&&(d.hidden=!1,f.load(w),ee(w)),nt.subscribe(_=>{let b=_.selected_id;b?(d.hidden=!1,f.load(b),Ie||ee(b)):(f.clear(),d.hidden=!0,Q())});let G=_=>{l.hidden=_.view!=="board",c.hidden=_.view!=="worker",u.hidden=_.view!=="monitor",o&&o.classList.toggle("is-quiet",_.view==="monitor"),J(_.view==="board"),ve(_.view==="worker"),Ce(_.view==="monitor"),R(_.view==="board"||_.view==="worker"||ct||!!_.selected_id),!_.selected_id&&_.view==="board"&&Dt.load(),_.view==="worker"&&$t.load(),_.view==="monitor"?Mt.load():Mt.pause(),window.localStorage.setItem("beads-ui.view",_.view)};nt.subscribe(G),G(nt.getState()),Be(),h(),j(),Ft().finally(()=>{yt=!0,rt()}),window.addEventListener("keydown",_=>{let b=_.ctrlKey||_.metaKey,le=String(_.key||"").toLowerCase(),ie=_.target,Ue=ie&&ie.tagName?String(ie.tagName).toLowerCase():"",xe=Ue==="input"||Ue==="textarea"||Ue==="select"||ie&&typeof ie.isContentEditable=="boolean"&&ie.isContentEditable;b&&le==="n"&&(xe||(_.preventDefault(),Pe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&zh(t)});export{zh as bootstrap,Bh as readBootstrapConfig,Uh as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
