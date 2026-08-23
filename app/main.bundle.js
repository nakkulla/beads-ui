var np=Object.create;var Mo=Object.defineProperty;var sp=Object.getOwnPropertyDescriptor;var op=Object.getOwnPropertyNames;var ap=Object.getPrototypeOf,ip=Object.prototype.hasOwnProperty;var lp=(e,t,r)=>t in e?Mo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var No=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var cp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of op(t))!ip.call(e,s)&&s!==r&&Mo(e,s,{get:()=>t[s],enumerable:!(n=sp(t,s))||n.enumerable});return e};var up=(e,t,r)=>(r=e!=null?np(ap(e)):{},cp(t||!e||!e.__esModule?Mo(r,"default",{value:e,enumerable:!0}):r,e));var yt=(e,t,r)=>lp(e,typeof t!="symbol"?t+"":t,r);var Yi=No((Ph,Ki)=>{var un=1e3,dn=un*60,pn=dn*60,Hr=pn*24,fp=Hr*7,_p=Hr*365.25;Ki.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return mp(e);if(r==="number"&&isFinite(e))return t.long?hp(e):gp(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function mp(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*_p;case"weeks":case"week":case"w":return r*fp;case"days":case"day":case"d":return r*Hr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*pn;case"minutes":case"minute":case"mins":case"min":case"m":return r*dn;case"seconds":case"second":case"secs":case"sec":case"s":return r*un;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function gp(e){var t=Math.abs(e);return t>=Hr?Math.round(e/Hr)+"d":t>=pn?Math.round(e/pn)+"h":t>=dn?Math.round(e/dn)+"m":t>=un?Math.round(e/un)+"s":e+"ms"}function hp(e){var t=Math.abs(e);return t>=Hr?Cs(e,t,Hr,"day"):t>=pn?Cs(e,t,pn,"hour"):t>=dn?Cs(e,t,dn,"minute"):t>=un?Cs(e,t,un,"second"):e+" ms"}function Cs(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Xi=No((Mh,Zi)=>{function bp(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=Yi(),r.destroy=u,Object.keys(e).forEach(d=>{r[d]=e[d]}),r.names=[],r.skips=[],r.formatters={};function t(d){let p=0;for(let m=0;m<d.length;m++)p=(p<<5)-p+d.charCodeAt(m),p|=0;return r.colors[Math.abs(p)%r.colors.length]}r.selectColor=t;function r(d){let p,m=null,$,E;function q(...U){if(!q.enabled)return;let oe=q,J=Number(new Date),P=J-(p||J);oe.diff=P,oe.prev=p,oe.curr=J,p=J,U[0]=r.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let F=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(j,S)=>{if(j==="%%")return"%";F++;let N=r.formatters[S];if(typeof N=="function"){let K=U[F];j=N.call(oe,K),U.splice(F,1),F--}return j}),r.formatArgs.call(oe,U),(oe.log||r.log).apply(oe,U)}return q.namespace=d,q.useColors=r.useColors(),q.color=r.selectColor(d),q.extend=n,q.destroy=r.destroy,Object.defineProperty(q,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:($!==r.namespaces&&($=r.namespaces,E=r.enabled(d)),E),set:U=>{m=U}}),typeof r.init=="function"&&r.init(q),q}function n(d,p){let m=r(this.namespace+(typeof p>"u"?":":p)+d);return m.log=this.log,m}function s(d){r.save(d),r.namespaces=d,r.names=[],r.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of p)m[0]==="-"?r.skips.push(m.slice(1)):r.names.push(m)}function o(d,p){let m=0,$=0,E=-1,q=0;for(;m<d.length;)if($<p.length&&(p[$]===d[m]||p[$]==="*"))p[$]==="*"?(E=$,q=m,$++):(m++,$++);else if(E!==-1)$=E+1,q++,m=q;else return!1;for(;$<p.length&&p[$]==="*";)$++;return $===p.length}function a(){let d=[...r.names,...r.skips.map(p=>"-"+p)].join(",");return r.enable(""),d}function l(d){for(let p of r.skips)if(o(d,p))return!1;for(let p of r.names)if(o(d,p))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Zi.exports=bp});var Qi=No((Gt,Rs)=>{Gt.formatArgs=vp;Gt.save=wp;Gt.load=kp;Gt.useColors=yp;Gt.storage=$p();Gt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Gt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function yp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function vp(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Rs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Gt.log=console.debug||console.log||(()=>{});function wp(e){try{e?Gt.storage.setItem("debug",e):Gt.storage.removeItem("debug")}catch{}}function kp(){let e;try{e=Gt.storage.getItem("debug")||Gt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function $p(){try{return localStorage}catch{}}Rs.exports=Xi()(Gt);var{formatters:xp}=Rs.exports;xp.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var On=globalThis,$s=On.trustedTypes,Oi=$s?$s.createPolicy("lit-html",{createHTML:e=>e}):void 0,Fo="$lit$",yr=`lit$${Math.random().toFixed(9).slice(2)}$`,jo="?"+yr,dp=`<${jo}>`,Br=document,Dn=()=>Br.createComment(""),Pn=e=>e===null||typeof e!="object"&&typeof e!="function",Bo=Array.isArray,Fi=e=>Bo(e)||typeof e?.[Symbol.iterator]=="function",qo=`[ 	
\f\r]`,Ln=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Di=/-->/g,Pi=/>/g,Fr=RegExp(`>|${qo}(?:([^\\s"'>=/]+)(${qo}*=${qo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Mi=/'/g,Ni=/"/g,ji=/^(?:script|style|textarea|title)$/i,Uo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Uo(1),Eh=Uo(2),Th=Uo(3),nr=Symbol.for("lit-noChange"),Ct=Symbol.for("lit-nothing"),qi=new WeakMap,jr=Br.createTreeWalker(Br,129);function Bi(e,t){if(!Bo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Oi!==void 0?Oi.createHTML(t):t}var Ui=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Ln;for(let l=0;l<r;l++){let c=e[l],u,d,p=-1,m=0;for(;m<c.length&&(a.lastIndex=m,d=a.exec(c),d!==null);)m=a.lastIndex,a===Ln?d[1]==="!--"?a=Di:d[1]!==void 0?a=Pi:d[2]!==void 0?(ji.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=Fr):d[3]!==void 0&&(a=Fr):a===Fr?d[0]===">"?(a=s??Ln,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?Fr:d[3]==='"'?Ni:Mi):a===Ni||a===Mi?a=Fr:a===Di||a===Pi?a=Ln:(a=Fr,s=void 0);let $=a===Fr&&e[l+1].startsWith("/>")?" ":"";o+=a===Ln?c+dp:p>=0?(n.push(u),c.slice(0,p)+Fo+c.slice(p)+yr+$):c+yr+(p===-2?l:$)}return[Bi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Mn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,d]=Ui(t,r);if(this.el=e.createElement(u,n),jr.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=jr.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Fo)){let m=d[a++],$=s.getAttribute(p).split(yr),E=/([.?@])?(.*)/.exec(m);c.push({type:1,index:o,name:E[2],strings:$,ctor:E[1]==="."?As:E[1]==="?"?Ss:E[1]==="@"?Es:Wr}),s.removeAttribute(p)}else p.startsWith(yr)&&(c.push({type:6,index:o}),s.removeAttribute(p));if(ji.test(s.tagName)){let p=s.textContent.split(yr),m=p.length-1;if(m>0){s.textContent=$s?$s.emptyScript:"";for(let $=0;$<m;$++)s.append(p[$],Dn()),jr.nextNode(),c.push({type:2,index:++o});s.append(p[m],Dn())}}}else if(s.nodeType===8)if(s.data===jo)c.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(yr,p+1))!==-1;)c.push({type:7,index:o}),p+=yr.length-1}o++}}static createElement(t,r){let n=Br.createElement("template");return n.innerHTML=t,n}};function Ur(e,t,r=e,n){if(t===nr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Pn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Ur(e,s._$AS(e,t.values),s,n)),t}var xs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Br).importNode(r,!0);jr.currentNode=s;let o=jr.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new cn(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Ts(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=jr.nextNode(),a++)}return jr.currentNode=Br,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},cn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Ct,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Ur(this,t,r),Pn(t)?t===Ct||t==null||t===""?(this._$AH!==Ct&&this._$AR(),this._$AH=Ct):t!==this._$AH&&t!==nr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Fi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ct&&Pn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Br.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Mn.createElement(Bi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new xs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=qi.get(t.strings);return r===void 0&&qi.set(t.strings,r=new Mn(t)),r}k(t){Bo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Dn()),this.O(Dn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Wr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Ct,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ct}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Ur(this,t,r,0),a=!Pn(t)||t!==this._$AH&&t!==nr,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Ur(this,l[n+c],r,c),u===nr&&(u=this._$AH[c]),a||(a=!Pn(u)||u!==this._$AH[c]),u===Ct?t=Ct:t!==Ct&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},As=class extends Wr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ct?void 0:t}},Ss=class extends Wr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ct)}},Es=class extends Wr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Ur(this,t,r,0)??Ct)===nr)return;let n=this._$AH,s=t===Ct&&n!==Ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Ct&&(n===Ct||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ts=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Ur(this,t)}},Wi={M:Fo,P:yr,A:jo,C:1,L:Ui,R:xs,D:Fi,V:Ur,I:cn,H:Wr,N:Ss,U:Es,B:As,F:Ts},pp=On.litHtmlPolyfillSupport;pp?.(Mn,cn),(On.litHtmlVersions??(On.litHtmlVersions=[])).push("3.3.1");var Ge=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new cn(t.insertBefore(Dn(),o),o,void 0,r??{})}return s._$AI(e),s};var Qt="today",Er=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function sr(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function zr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function zi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Hi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Gi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Vi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),l=e.get(a)||{lines:[],last_event_at:null};l.lines=[...l.lines,o],l.last_event_at=Date.now(),e.set(a,l),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ji=up(Qi(),1);function xt(e){return(0,Ji.default)(`beads-ui:${e}`)}function pr(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Gr(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function rl(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function nl(e,t){let r=pr(e.updated_at),n=pr(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function sl(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=pr(e.created_at),o=pr(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ol(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Ap=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function el(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function tl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Ap.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function al(e,t){let r=el(e),n=el(t);if(r!==n)return r<n?-1:1;let s=tl(e),o=tl(t);if(s!==o)return s<o?-1:1;let a=pr(e&&e.created_at),l=pr(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Wo=2**20;function fn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-pr(e&&e.created_at)}function Is(e){return(t,r)=>{let n=fn(t,e),s=fn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function zo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:fn(l,r)-Wo};if(!l)return{rank:fn(a,r)+Wo};let c=fn(a,r),u=fn(l,r),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:n.map((p,m)=>({bead_id:p.id,rank:m*Wo}))}}function Ho(e,t={}){let r=xt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Gr;function u(){for(let m of Array.from(a))try{m()}catch{}}function d(){s=Array.from(n.values()).sort(c)}function p(m){if(l||!m||m.id!==e)return;let $=Number(m.revision)||0;if(r("apply %s rev=%d",m.type,$),!($<=o&&m.type!=="snapshot")){if(m.type==="snapshot"){if($<=o)return;n.clear();let E=Array.isArray(m.issues)?m.issues:[];for(let q of E)q&&typeof q.id=="string"&&q.id.length>0&&n.set(q.id,q);d(),o=$,u();return}if(m.type==="upsert"){let E=m.issue;if(E&&typeof E.id=="string"&&E.id.length>0){let q=n.get(E.id);if(!q)n.set(E.id,E);else{let U=Number.isFinite(q.updated_at)?q.updated_at:0,oe=Number.isFinite(E.updated_at)?E.updated_at:0;if(U<=oe){for(let J of Object.keys(q))J in E||delete q[J];for(let[J,P]of Object.entries(E))q[J]=P}}d()}o=$,u()}else if(m.type==="delete"){let E=String(m.issue_id||"");E&&(n.delete(E),d()),o=$,u()}}}return{id:e,subscribe(m){return a.add(m),()=>{a.delete(m)}},applyPush:p,snapshot(){return s},size(){return n.size},getById(m){return n.get(m)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Ls(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function il(e){let t=xt("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],p=Array.isArray(c.updated)?c.updated:[],m=Array.isArray(c.removed)?c.removed:[];for(let $ of Array.from(u)){let E=r.get($);if(!E)continue;let q=E.itemsById;for(let U of d)typeof U=="string"&&U.length>0&&q.set(U,!0);for(let U of p)typeof U=="string"&&U.length>0&&q.set(U,!0);for(let U of m)typeof U=="string"&&U.length>0&&q.delete(U)}}async function o(l,c){let u=Ls(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let p=r.get(l);if(p&&p.key!==u){let m=n.get(p.key);m&&(m.delete(l),m.size===0&&n.delete(p.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let d=n.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(p){let m=r.get(l)||null;if(m){let $=n.get(m.key);$&&($.delete(l),$.size===0&&n.delete(m.key))}throw r.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=r.get(l)||null;if(p){let m=n.get(p.key);m&&(m.delete(l),m.size===0&&n.delete(p.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ls,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function ll(){let e=xt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,d){let p=u?Ls(u):"",m=r.get(c)||"",$=t.has(c);if(e("register %s key=%s (prev=%s)",c,p,m),$&&m&&p&&m!==p){let E=t.get(c);if(E)try{E.dispose()}catch{}let q=s.get(c);if(q){try{q()}catch{}s.delete(c)}let U=Ho(c,d);t.set(c,U);let oe=U.subscribe(()=>o());s.set(c,oe)}else if(!$){let E=Ho(c,d);t.set(c,E);let q=E.subscribe(()=>o());s.set(c,q)}return r.set(c,p),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function cl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ul(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function dl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Go(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Sp(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Ep(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function pl(e){let t=xt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Sp(n),a=Ep(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Go(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Go(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Tp=Object.freeze({workspace_config:{default_workspace:null}});function fl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Tp.workspace_config.default_workspace}}}function _l(e={}){let t=xt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:fl(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?fl(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==r.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===r.worker.show_closed_children[d])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ml(e){let t=xt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(p,m)=>{let $=s++,E=Date.now();n.set($,{type:p,start_ts:E}),t("request start id=%d type=%s count=%d",$,p,r+1),a();let q=!1,U=()=>{q||(q=!0,n.delete($),l())},oe=setTimeout(()=>{q||(t("request TIMEOUT id=%d type=%s elapsed=%dms",$,p,Date.now()-E),U())},3e4);try{let J=await u(p,m),P=Date.now()-E;return t("request done id=%d type=%s elapsed=%dms",$,p,P),J}catch(J){let P=Date.now()-E;throw t("request error id=%d type=%s elapsed=%dms err=%o",$,p,P,J),J}finally{clearTimeout(oe),U()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function he(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Os(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(ol),c;switch(l){case"created_desc":return c.sort(Gr),c;case"created_asc":return c.sort(rl),c;case"updated_desc":return c.sort(nl),c;case"priority":return c.sort(sl),c;case"manual":default:{let u=r();return u?c.sort(Is(u)):c.sort(Gr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Vr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function jt(e){let t=Vr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function or(e,t){let r=Vr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function gl(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Vr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Ds(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ps(e){let t=new Map;for(let n of e)n&&n.id&&!t.has(n.id)&&t.set(n.id,n);let r=new Map;for(let n of t.values()){let s=Ds(n);if(!s)continue;let o=r.get(s);o||(o=[],r.set(s,o)),o.push({id:n.id,title:n.title,status:n.status,metadata:n.metadata,workflow:n.workflow,created_at:n.created_at,updated_at:n.updated_at})}return r}function Ms(e,t){let r=e.get(t)||[],n=0;for(let o of r)(o.status==="resolved"||o.status==="closed")&&(n+=1);let s=gl(r);return{total:r.length,count:n,current:s,children:r}}function Ns(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},d=n(zo(l,c,u.order),a);s(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let m={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};r.set(m);let $=n(zo(l,c,m.order),a);s(m,$);let E=await t("ui-order-set",{expected_revision:m.revision,entries:$});E&&E.applied&&r.set({revision:typeof E.revision=="number"?E.revision:0,order:E.order||{}})}else p&&p.applied&&r.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:o}}function qs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Vo(e,t){return!t||typeof e!="string"||e.length===0||qs(t.visible_labels).includes(e)?!0:qs(t.hidden_labels).includes(e)?!1:!qs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function hl(e,t){return qs(e).filter(r=>Vo(r,t))}function Tr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}function Cp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Rp(e,t,r,n,s){return i`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${n?"true":"false"}
    @click=${s}
  >
    children ${t}/${r} ${n?"\u25B4":"\u25BE"}
  </button>`}function Ip(e,t,r,n){return i`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${n?s=>n(s,e.id):void 0}
  >
    <span class=${Cp(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${r}
  </button>`}function Fs(e,t){let r=e.total||0,n=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(r===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],l=r>0?a.slice().sort(al):a;return i`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?Rp(t.parent_id,e.count,r,n,t.onToggle):i`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${r>0&&e.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${n&&r>0?i`<div class="board-card__roll-list">
            ${l.map((c,u)=>Ip(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Lp={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},yl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},bl={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Op={review:"\u2713",skip:"\u2298"},Cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Dp(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function vl(e){let t=e&&e.fill||"none";return t==="none"?Cr.none:e&&e.stale===!0?Cr.stale:t==="dim"?Cr.dim:e&&e.glyph==="review"?Cr.review:e&&e.glyph==="skip"?Cr.skip:Cr.done}function Pp(e){if(!e||e.fill==="none"||!e.approval_state)return vl(e);let t=[];return e.glyph==="review"?t.push(Cr.review):e.glyph==="skip"&&t.push(Cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Mp(e,t,r){let n=Lp[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Op[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${yl[e]||e}
      </div>
    </div>
  `}function _n(e,t){if(!e||!e.stages)return"";let r=bl[e.route]||bl.spec_backed,n=e.stages,s=Dp(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${yl[a]||a} ${a==="plan"?Pp(n[a]||{}):vl(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Mp(a,n[a]||{},a===s))}
    </div>
  `}function Np(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var wl=2;function qp(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,wl).join(", "),s=r.length-wl,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ko(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function kl(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Kr(e){return`${e.kind}:${kl(e)}@${e.sha}`}function js(e,t){if(!e)return null;let r=Ko(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Ko(t?.kind),a=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${Kr(t)}`:"";return{kind:e.kind,label:l,title:`${c}${u}`}}function $l(e,t){let r=js(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Fp(e){if(!e)return null;let t=Ko(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Kr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function jp(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Tr(r,"route")){let l=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":n.route}</span
      >`)}if(n.fast_track&&Tr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Tr(r,"pr")){let l=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=$l(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let l=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Kr(l)}`}
        >${`exec ${l.kind==="delegated"?kl(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let l=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of hl(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&Tr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Tr(r,"blocked")&&s.push(...qp(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Tr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function Bp(e){let t=or(e.created_at),r=or(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${jt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${jt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Up(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Fs(r,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Bp(e),empty_label:"children \uC5C6\uC74C",childChips:Yo,onToggle:n=>t.onRollupToggle&&t.onRollupToggle(n,e.id),onChildClick:(n,s)=>t.onChildClick&&t.onChildClick(n,s)})}function Yo(e){let t=e?.workflow?.chips?.planned_execution,r=e?.workflow?.chips?.exec_receipt;return js(t,r)?i`<span class="board-card__roll-child-chips">
    ${$l(t,r)}
    ${Fp(r)}
  </span>`:null}function Bs(e,t){let r=Np(e.priority);return i`
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
      ${jp(e,t)}
      ${e.workflow&&Tr(t.policy||null,"stepper")?_n(e.workflow,e.status):""}
      ${Up(e,t)}
    </article>
  `}function mn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${Er.map(o=>i`<option
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
        ${e.items.map(o=>Bs(o,t))}
      </div>
    </section>
  `}function xl(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Bs(n,t))}
        </div>
      </div>
    </dialog>
  `}var Wp=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],zp=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Hp=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Gp(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Al(e,t,r){return i`
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
        ${Wp.map(n=>i`<option
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
        ${zp.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Gp(e,t,r)}
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
        ${Hp.map(n=>i`<option
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
  `}var Vp=200,Kp={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Yp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Sl="beads-ui.board.sort",El=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Zp(){try{let e=window.localStorage.getItem(Sl);if(e&&El.has(e))return e}catch{}return"created_desc"}function Tl(e,t){let r=xt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.closedRange||Qt,m=s?Os(s,a):null,$=Ns({transport:o,uiOrderStore:a}),E=[],q=[],U=[],oe=[],J=[],P=[],F=!1,C=0,j=Zp(),S=new Map,N=new Map,K=new Map,be=new Set,re={search:"",priority:"",type:"",labels:[]},ve=!1,He=null;function We(M){return String(M.status||"open")==="open"}function Fe(M){let X=String(M.status||"open");return X==="open"||X==="blocked"}function ne(M){let X=re.search.trim().toLowerCase(),pe=re.priority,v=re.type,T=re.labels;return M.filter(O=>{if(X){let te=String(O.id||"").toLowerCase(),Se=String(O.title||"").toLowerCase();if(!te.includes(X)&&!Se.includes(X))return!1}if(pe!==""&&String(O.priority)!==pe||v!==""&&String(O.issue_type||"")!==v)return!1;if(T.length>0){let te=Array.isArray(O.labels)?O.labels:[];if(!T.some(Se=>te.includes(Se)))return!1}return!0})}function ce(){let M=new Set;for(let X of[E,q,U,oe,J,P])for(let pe of X){let v=Array.isArray(pe.labels)?pe.labels:[];for(let T of v)typeof T=="string"&&T.length>0&&M.add(T)}return Array.from(M).sort()}function we(){return re.search.trim()!==""||re.priority!==""||re.type!==""||re.labels.length>0}function x(){try{if(m){let M=m.selectBoardColumn("tab:board:in-progress","in_progress",j),X=m.selectBoardColumn("tab:board:blocked","blocked",j).filter(Fe),pe=new Set(M.map(y=>y.id)),v=m.selectBoardColumn("tab:board:ready","ready",j).filter(y=>We(y)&&!pe.has(y.id)),T=m.selectBoardColumn("tab:board:resolved","resolved",j),O=m.selectBoardColumn("tab:board:deferred","deferred",j),te=m.selectBoardColumn("tab:board:closed","closed").slice(0,Vp),Se=[...X,...v,...M,...T,...te];_e(Se);let Ae=new Set;for(let y of Se)y&&y.id&&!Ds(y)&&Ae.add(y.id);let g=!we();E=g?Nn(X,Ae):X,q=g?Nn(v,Ae):v,U=g?Nn(M,Ae):M,oe=g?Nn(T,Ae):T,J=O,C=O.length,P=g?Nn(te,Ae):te,S=new Map;for(let y of E)S.set(y.id,"open");for(let y of q)S.set(y.id,"open");for(let y of U)S.set(y.id,"in_progress");for(let y of oe)S.set(y.id,"resolved");for(let y of J)S.set(y.id,"deferred");for(let y of P)S.set(y.id,"closed");N=new Map;for(let y of E)N.set(y.id,"blocked-col");for(let y of q)N.set(y.id,"ready-col");for(let y of U)N.set(y.id,"in-progress-col");for(let y of oe)N.set(y.id,"resolved-col");for(let y of P)N.set(y.id,"closed-col")}rt()}catch{E=[],q=[],U=[],oe=[],J=[],P=[],K=new Map,rt()}}function _e(M){K=Ps(M)}function G(M){return Ms(K,M)}function ae(M){return!be.has(M)}function ke(M,X){M.preventDefault(),M.stopPropagation(),be.has(X)?be.delete(X):be.add(X),rt()}function Ne(M,X){M.preventDefault(),M.stopPropagation(),n(X)}function $e(M,X){M.preventDefault(),M.stopPropagation(),n(X)}function Ve(M,X){He||n(X)}function mt(M,X){M.preventDefault(),M.stopPropagation(),Xp(X).then(pe=>{pe&&he("\uBCF5\uC0AC\uB428","success",1200)})}function Pe(M,X){He=X,M.dataTransfer&&(M.dataTransfer.setData("text/plain",X),M.dataTransfer.effectAllowed="move"),M.target.classList.add("board-card--dragging")}function it(M){M.target.classList.remove("board-card--dragging"),Le(),setTimeout(()=>{He=null},0)}function Je(M){let X=String(M.target.value||"");!X||X===p||(p=X,u&&u(X),rt())}function V(){return l?l.get():null}function ee(M){let X=c?c.get():null,pe=X?X.cleanup_failed:null;if(!pe||typeof pe!="object"||Array.isArray(pe))return null;let v=pe[M];return!v||typeof v!="object"||Array.isArray(v)?null:v}let me={onCardClick:Ve,onCopyId:mt,onDragStart:Pe,onDragEnd:it,onClosedRangeChange:Je,rollupFor:G,isExpanded:ae,onRollupToggle:ke,onChildClick:Ne,onFromChipClick:$e,cleanupFailureFor:ee,get policy(){return V()}};function Ke(M,X){He||(tt(),n(X))}function ze(M,X){M.preventDefault(),M.stopPropagation(),tt(),n(X)}let Ye={...me,onCardClick:Ke,onChildClick:ze,onFromChipClick:ze,get policy(){return V()}};function Qe(M){let X=M.target,pe=e.querySelector(".board-filter__labels");X&&pe&&pe.contains(X)||Re()}function ht(M){M.key==="Escape"&&Re()}function Be(){ve||(ve=!0,document.addEventListener("mousedown",Qe),document.addEventListener("keydown",ht),rt())}function Re(){ve&&(ve=!1,document.removeEventListener("mousedown",Qe),document.removeEventListener("keydown",ht),rt())}function Ue(M){M.key==="Escape"&&tt()}function Lt(){F||(F=!0,document.addEventListener("keydown",Ue),rt())}function tt(){F&&(F=!1,document.removeEventListener("keydown",Ue),rt())}let _t={onClose:tt,onOverlayClick(M){M.target===M.currentTarget&&tt()}},ut={onSearchInput(M){re.search=String(M.target.value||""),x()},onPriorityChange(M){re.priority=String(M.target.value||""),x()},onTypeChange(M){re.type=String(M.target.value||""),x()},onSortChange(M){let X=String(M.target.value||"");if(!(!El.has(X)||X===j)){j=X;try{window.localStorage.setItem(Sl,X)}catch{}x()}},onDeferredToggle(){F?tt():Lt()},onLabelMenuToggle(){ve?Re():Be()},onLabelToggle(M){let X=re.labels.indexOf(M);X===-1?re.labels.push(M):re.labels.splice(X,1),x()},onLabelClear(){re.labels.length!==0&&(re.labels=[],x())},onNewIssue(){d&&d()}};function et(){return i`
      <div class="board-view">
        ${Al(re,ut,{sort_mode:j,deferred_popup_open:F,deferred_count:C,label_options:ce(),label_menu_open:ve})}
        <div class="board-root">
          ${mn({title:"Blocked",id:"blocked-col",items:ne(E)},me)}
          ${mn({title:"Ready",id:"ready-col",items:ne(q)},me)}
          ${mn({title:"In progress",id:"in-progress-col",items:ne(U)},me)}
          ${mn({title:"Resolved",id:"resolved-col",items:ne(oe)},me)}
          ${mn({title:"Closed",id:"closed-col",items:ne(P),is_closed:!0,closed_range:p},me)}
        </div>
        ${F?xl({items:ne(J),count:C},Ye,_t):""}
      </div>
    `}function rt(){Ge(et(),e),nt()}function nt(){try{let M=e.querySelector("#deferred-popup");M&&!M.open&&(typeof M.showModal=="function"?M.showModal():M.setAttribute("open",""));let X=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let pe of X)Array.from(pe.querySelectorAll(".board-card")).forEach((T,O)=>{T.tabIndex=O===0?0:-1})}catch{}}async function L(M,X){if(!o){he("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:M,status:X}),he("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(pe){r("update-status failed: %o",pe),he("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Q(M){switch(M){case"blocked-col":return E;case"ready-col":return q;case"in-progress-col":return U;case"resolved-col":return oe;default:return[]}}function le(M,X,pe){if(!o||!a)return;let v=Q(M),T=v.find(g=>g.id===X);if(!T)return;let O=v.filter(g=>g.id!==X),te=pe.closest?pe.closest(".board-card"):null,Se=O.length;if(te){let g=te.getAttribute("data-issue-id");if(g===X)return;let y=O.findIndex(R=>R.id===g);y>=0&&(Se=y)}let Ae=O.slice();Ae.splice(Se,0,T),$.applyReorder(X,Ae,Se)}function Le(){for(let M of Array.from(e.querySelectorAll(".board-column--drag-over")))M.classList.remove("board-column--drag-over")}let I=null;e.addEventListener("dragover",M=>{M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move");let pe=M.target.closest(".board-column");pe&&pe!==I&&(I&&I.classList.remove("board-column--drag-over"),pe.classList.add("board-column--drag-over"),I=pe)}),e.addEventListener("dragleave",M=>{let X=M.relatedTarget;(!X||!e.contains(X))&&I&&(I.classList.remove("board-column--drag-over"),I=null)}),e.addEventListener("drop",M=>{M.preventDefault(),I&&(I.classList.remove("board-column--drag-over"),I=null);let X=M.target,pe=X.closest(".board-column");if(!pe)return;let v=M.dataTransfer?.getData("text/plain")||"";if(!v)return;let T=pe.id,O=N.get(v);if(O&&O===T){if(Yp.has(T)){if(j!=="manual"){he("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}le(T,v,X)}return}let te=Kp[T];if(!te){he("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}S.get(v)!==te&&L(v,te)}),e.addEventListener("keydown",M=>{let X=M.target;if(!(X instanceof HTMLElement))return;let pe=String(X.tagName||"").toLowerCase();if(pe==="input"||pe==="textarea"||pe==="select"||pe==="button"||pe==="a"||X.isContentEditable===!0)return;let v=X.closest(".board-card");if(!v)return;let T=String(M.key||"");if(T==="Enter"||T===" "){M.preventDefault();let Ae=v.getAttribute("data-issue-id");Ae&&n(Ae);return}if(T!=="ArrowUp"&&T!=="ArrowDown"&&T!=="ArrowLeft"&&T!=="ArrowRight")return;M.preventDefault();let O=v.closest(".board-column");if(!O)return;let te=Array.from(O.querySelectorAll(".board-card")),Se=te.indexOf(v);if(T==="ArrowDown"&&Se<te.length-1){H(v,te[Se+1]);return}if(T==="ArrowUp"&&Se>0){H(v,te[Se-1]);return}if(T==="ArrowLeft"||T==="ArrowRight"){let Ae=Array.from(e.querySelectorAll(".board-column")),g=Ae.indexOf(O),y=T==="ArrowRight"?1:-1,R=g+y;for(;R>=0&&R<Ae.length;){let z=Ae[R].querySelector(".board-card");if(z){H(v,z);return}R+=y}}});function H(M,X){try{M.tabIndex=-1,X.tabIndex=0,X.focus()}catch{}}let Te=null;m&&m.subscribe&&(Te=m.subscribe(()=>{try{x()}catch{}}));let Oe=null;l&&l.subscribe&&(Oe=l.subscribe(()=>{try{x()}catch{}}));let xe=null;return c&&c.subscribe&&(xe=c.subscribe(()=>{rt()})),{async load(){r("load"),x()},clear(){Re(),tt(),Te&&(Te(),Te=null),Oe&&(Oe(),Oe=null),xe&&(xe(),xe=null),e.replaceChildren(),E=[],q=[],U=[],oe=[],J=[],P=[],S=new Map,N=new Map}}}function Nn(e,t){return e.filter(r=>{let n=Ds(r);return!(n&&t.has(n))})}async function Xp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Jt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Yr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function qn(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Qp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Yr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Yr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=d=>{typeof r.close=="function"&&r.close(),r.remove(),c(d)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function vr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Qp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Jp=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Cl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},ef=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Nt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Et(e){return typeof e=="string"&&e.length>0?e:null}function gn(e){return e.startsWith("gpt-")?e.slice(4):e}function wt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Il(e,t,r){let n=Et(t[e]);if(n!==null)return{value:n,source:"pin"};let s=Et(r[e]);return s===null?null:{value:s,source:"global"}}function Fn(e,t,r,n){return Il(e,t,r)||{value:n,source:"base"}}function Zo(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Nt(s?.[t])){let a=Et(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Nt(s)){for(let a of Object.values(s))if(Nt(a)){let l=Et(a[e]);if(l!==null)return l}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return Et(n?.runners?.[o]?.models?.[e]?.id)||e}function tf(e,t){return Et(t?.review?.reviewers?.[e]?.model)||e}function hn(e,t,r=!1){if(e==="default")return wt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?gn(e):e;return wt(e,t,n,e,"explicit")}function Ll(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Nt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Nt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function rf(e,t){let r=[],n=e?.implementation?.model_catalog;Nt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(Nt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function nf(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of rf(t,r)){let o=Ll(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function Xo(e){return wt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Rl(e,t,r){let n=Il(e,t,r);return n?hn(n.value,n.source):wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function ar(e){let t=Nt(e.pin)?e.pin:{},r=Nt(e.global)?e.global:{},n=Nt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Nt(n.session)?n.session:null,o=n?.supported===!0&&Nt(n.orchestration)?n.orchestration:null,a=Nt(e.runner_catalog)?e.runner_catalog:null,l=Et(r.quick_fix_impl_model),c=nf(l,s,a),u={};if(s){let d=Fn("workflow_mode",t,r,Et(s.workflow_mode_default));u.workflow_mode=d.source==="base"?wt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):hn(d.value,d.source);for(let P of["spec_review","plan_review","impl_review"]){let F=`${P}_model`,C=Et(P==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),j=Fn(F,t,r,C);if(j.value===null)u[F]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(j.value!=="self"&&j.value!=="skip"&&!Nt(s.review?.reviewers?.[j.value]))u[F]=Xo(wt(j.value,j.source,"",null,"explicit"));else{let S=tf(j.value,s);u[F]=wt(j.value,j.source,gn(S),S,j.source==="base"?"default":"explicit")}}for(let[P,F]of Object.entries(Cl)){let C=u[F].value;if(C==="self"||C==="skip"){u[P]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let j=Et(s.review?.reviewers?.[C||""]?.effort),S=Fn(P,t,r,j);u[P]=S.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(S.value,S.source,S.value,S.value,S.source==="base"?"default":"explicit")}let p=Nt(s.implementation?.default)?s.implementation.default:{},m=Et(e.route),$=m!==null&&["quick_fix","spec_backed","full_plan"].includes(m),E=Nt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},q=$&&Nt(E[m])?E[m]:{};for(let P of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let F=Fn(P,t,r,P==="impl_dispatch"?Et(q.dispatch)||Et(p.dispatch):Et(p[P.replace("impl_","")]));u[P]=F.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(F.value,F.source,F.value,F.value,F.source==="base"?"default":"explicit")}let U=Et(t.impl_runtime),oe=U==="inherit"?Et(e.controller_runtime):U,J=m==="quick_fix"&&Et(t.impl_dispatch)===null&&c.runtime!==null&&(U===null||oe===c.runtime);if(J){let P=c.runtime,F=l;u.impl_dispatch=wt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),U===null&&(u.impl_runtime=wt(P,"global",`${P} (\uC720\uB3C4)`,P,"explicit")),Et(t.impl_model)===null&&(u.impl_model=wt(F,"global",F,F,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let P of["impl_runtime","impl_model","impl_effort","impl_speed"])u[P]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!J&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let P=u.impl_runtime.value==="inherit"?Et(e.controller_runtime):u.impl_runtime.value,F=P?Ll(P,s,a):[];if(u.impl_model.value!=="auto"&&F.length>0&&!F.includes(u.impl_model.value))u.impl_model=Xo(u.impl_model);else{let C=Zo(u.impl_model.value,P,s,a);u.impl_model.display=gn(C),u.impl_model.full_value=C}}if(u.impl_effort.value==="auto"){let P=Et(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),F=P?Et(s.implementation?.effort_by_transport?.[P]?.auto):null;F&&!ef.has(F)?(u.impl_effort.display=`${F} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=F,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):hn("default",u.impl_speed.source))}}else for(let d of Jp.filter(p=>!p.startsWith("orchestration_")))u[d]=Rl(d,t,r);if(!s){for(let[d,p]of Object.entries(Cl))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=Rl(d,t,r);continue}let p=d.replace("orchestration_",""),m=Et(o[p]),$=Fn(d,t,r,m);if(d==="orchestration_effort"&&$.source==="base"){u[d]=wt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if($.value===null){u[d]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let E=$.source==="base"?Et(o.model_id)||$.value:Zo($.value,null,s,a);u[d]=wt($.value,$.source,gn(E),E,$.source==="base"?"default":"explicit");continue}if($.value==="default"){u[d]=$.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):hn("default",$.source);continue}u[d]=hn($.value,$.source)}if(s)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=wt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${gn(d)})`,null,"default")}else if(c.runtime!==null){let d=Zo(l,c.runtime,s,a);u.quick_fix_impl_model=wt(l,"global",gn(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=Xo(wt(l,"global","",null,"explicit")):u.quick_fix_impl_model=hn(l,"global");return u}function sf(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function Us(e){let t=Nt(e.pin)?e.pin:{},r=Nt(e.global)?e.global:{},n=Nt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=p=>{let m={...n,...p};return ar({pin:e.layer==="pin"?m:t,global:e.layer==="pin"?r:m,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let l=s(a)[e.key],c=s(o)[e.key],u=Et(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:sf(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(p=>{let m=s({...o,[e.key]:p})[e.key];return{value:p,label:m.display,full_value:m.full_value}})}}function bn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(l=>{let c=!1,u=p=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),l(p))},d=()=>u(n.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var Nl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var yn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],jn=[...yn,"reasoning_output_tokens"],of=["implementation","review-consult"];function Qo(e){let t=0;for(let r of yn)t+=Ft(e?.[r]);return t}function af(e){return!e||typeof e!="object"?!1:yn.some(t=>Number.isFinite(e[t]))}function Ol(e){return!e||typeof e!="object"?!1:jn.some(t=>Number.isFinite(e[t]))}function lf(e){let t={};for(let r of jn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Dl(e){let t={};for(let r of jn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Pl(e,t){return e==="codex"?Ft(t.input_tokens)+Ft(t.output_tokens):Qo(t)}function cf(e){return e==="claude"?"Claude":"Codex"}function uf(e){return`\u03C4 ${Fl(e)}`}function df(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${Ft(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${Ft(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Nl),o.join(`
`)}function Bt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${cf(r)} ${uf(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:df(r,n)})}return t}function ql(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of jn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=Ft(l.breakdown[c])+Ft(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Jo(e){return!e||typeof e!="object"?null:ir({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function pf(e){return e==="codex"?"codex":"claude"}function Rr(){return{subtotal:0,breakdown:lf(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ws(e,t,r){e.subtotal+=t.subtotal;for(let n of jn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Ft(e.breakdown[n])+Ft(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ml(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Fl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function vn(e){return af(e)?`\u03C4 ${Fl(Qo(e))}`:null}function Zr(e){let t=vn(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Bn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Qo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Nl),r.join(`
`)}function ir(e,t){let r={claude:Rr(),codex:Rr()},n={orchestrator:{claude:Rr(),codex:Rr()},implementation:{claude:Rr(),codex:Rr()},"review-consult":{claude:Rr(),codex:Rr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Ol(c)){let d=pf(l.runner),p=Dl(c),m={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:Pl(d,p)};p.replayed===!0&&(m.replayed=!0),typeof l.model=="string"&&(m.model=l.model),typeof l.session_id=="string"&&(m.session_id=l.session_id),Ws(r[d],m,!0),Ws(n.orchestrator[d],m,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){if(!d||d.provider!=="codex"||!of.includes(d.role)||!Ol(d.usage))continue;let p=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!p||s.has(p))continue;s.add(p);let m=Dl(d.usage),$={provider:"codex",role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Pl("codex",m)};$.receipt_id=p,typeof d.model=="string"&&($.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&($.effort=d.effort),typeof d.session_id=="string"?$.session_id=d.session_id:typeof d.thread_id=="string"&&($.session_id=d.thread_id),typeof d.turn_id=="string"&&($.turn_id=d.turn_id),typeof d.completed_at=="string"&&($.completed_at=d.completed_at),m.replayed===!0&&($.replayed=!0),Ws(r.codex,$,!1),Ws(n[$.role].codex,$,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=Ml(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let d=n[l][u];d.legs.length>0&&(c[u]={...Ml(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Kl,setPrototypeOf:jl,isFrozen:ff,getPrototypeOf:_f,getOwnPropertyDescriptor:mf}=Object,{freeze:Wt,seal:lr,create:aa}=Object,{apply:ia,construct:la}=typeof Reflect<"u"&&Reflect;Wt||(Wt=function(t){return t});lr||(lr=function(t){return t});ia||(ia=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});la||(la=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var zs=zt(Array.prototype.forEach),gf=zt(Array.prototype.lastIndexOf),Bl=zt(Array.prototype.pop),Un=zt(Array.prototype.push),hf=zt(Array.prototype.splice),Gs=zt(String.prototype.toLowerCase),ea=zt(String.prototype.toString),ta=zt(String.prototype.match),Wn=zt(String.prototype.replace),bf=zt(String.prototype.indexOf),yf=zt(String.prototype.trim),fr=zt(Object.prototype.hasOwnProperty),Ut=zt(RegExp.prototype.test),zn=vf(TypeError);function zt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ia(e,t,n)}}function vf(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return la(e,r)}}function at(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Gs;jl&&jl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(ff(t)||(t[n]=o),s=o)}e[s]=!0}return e}function wf(e){for(let t=0;t<e.length;t++)fr(e,t)||(e[t]=null);return e}function wr(e){let t=aa(null);for(let[r,n]of Kl(e))fr(e,r)&&(Array.isArray(n)?t[r]=wf(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=wr(n):t[r]=n);return t}function Hn(e,t){for(;e!==null;){let n=mf(e,t);if(n){if(n.get)return zt(n.get);if(typeof n.value=="function")return zt(n.value)}e=_f(e)}function r(){return null}return r}var Ul=Wt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ra=Wt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),na=Wt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),kf=Wt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),sa=Wt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),$f=Wt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Wl=Wt(["#text"]),zl=Wt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),oa=Wt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Hl=Wt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Hs=Wt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),xf=lr(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Af=lr(/<%[\w\W]*|[\w\W]*%>/gm),Sf=lr(/\$\{[\w\W]*/gm),Ef=lr(/^data-[\-\w.\u00B7-\uFFFF]+$/),Tf=lr(/^aria-[\-\w]+$/),Yl=lr(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Cf=lr(/^(?:\w+script|data):/i),Rf=lr(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Zl=lr(/^html$/i),If=lr(/^[a-z][.\w]*(-[.\w]+)+$/i),Gl=Object.freeze({__proto__:null,ARIA_ATTR:Tf,ATTR_WHITESPACE:Rf,CUSTOM_ELEMENT:If,DATA_ATTR:Ef,DOCTYPE_NAME:Zl,ERB_EXPR:Af,IS_ALLOWED_URI:Yl,IS_SCRIPT_OR_DATA:Cf,MUSTACHE_EXPR:xf,TMPLIT_EXPR:Sf}),Gn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Lf=function(){return typeof window>"u"?null:window},Of=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Vl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Xl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Lf(),t=Ie=>Xl(Ie);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Gn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:m,trustedTypes:$}=e,E=c.prototype,q=Hn(E,"cloneNode"),U=Hn(E,"remove"),oe=Hn(E,"nextSibling"),J=Hn(E,"childNodes"),P=Hn(E,"parentNode");if(typeof a=="function"){let Ie=r.createElement("template");Ie.content&&Ie.content.ownerDocument&&(r=Ie.content.ownerDocument)}let F,C="",{implementation:j,createNodeIterator:S,createDocumentFragment:N,getElementsByTagName:K}=r,{importNode:be}=n,re=Vl();t.isSupported=typeof Kl=="function"&&typeof P=="function"&&j&&j.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ve,ERB_EXPR:He,TMPLIT_EXPR:We,DATA_ATTR:Fe,ARIA_ATTR:ne,IS_SCRIPT_OR_DATA:ce,ATTR_WHITESPACE:we,CUSTOM_ELEMENT:x}=Gl,{IS_ALLOWED_URI:_e}=Gl,G=null,ae=at({},[...Ul,...ra,...na,...sa,...Wl]),ke=null,Ne=at({},[...zl,...oa,...Hl,...Hs]),$e=Object.seal(aa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ve=null,mt=null,Pe=Object.seal(aa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),it=!0,Je=!0,V=!1,ee=!0,me=!1,Ke=!0,ze=!1,Ye=!1,Qe=!1,ht=!1,Be=!1,Re=!1,Ue=!0,Lt=!1,tt="user-content-",_t=!0,ut=!1,et={},rt=null,nt=at({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),L=null,Q=at({},["audio","video","img","source","image","track"]),le=null,Le=at({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),I="http://www.w3.org/1998/Math/MathML",H="http://www.w3.org/2000/svg",Te="http://www.w3.org/1999/xhtml",Oe=Te,xe=!1,M=null,X=at({},[I,H,Te],ea),pe=at({},["mi","mo","mn","ms","mtext"]),v=at({},["annotation-xml"]),T=at({},["title","style","font","a","script"]),O=null,te=["application/xhtml+xml","text/html"],Se="text/html",Ae=null,g=null,y=r.createElement("form"),R=function(A){return A instanceof RegExp||A instanceof Function},z=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(g&&g===A)){if((!A||typeof A!="object")&&(A={}),A=wr(A),O=te.indexOf(A.PARSER_MEDIA_TYPE)===-1?Se:A.PARSER_MEDIA_TYPE,Ae=O==="application/xhtml+xml"?ea:Gs,G=fr(A,"ALLOWED_TAGS")?at({},A.ALLOWED_TAGS,Ae):ae,ke=fr(A,"ALLOWED_ATTR")?at({},A.ALLOWED_ATTR,Ae):Ne,M=fr(A,"ALLOWED_NAMESPACES")?at({},A.ALLOWED_NAMESPACES,ea):X,le=fr(A,"ADD_URI_SAFE_ATTR")?at(wr(Le),A.ADD_URI_SAFE_ATTR,Ae):Le,L=fr(A,"ADD_DATA_URI_TAGS")?at(wr(Q),A.ADD_DATA_URI_TAGS,Ae):Q,rt=fr(A,"FORBID_CONTENTS")?at({},A.FORBID_CONTENTS,Ae):nt,Ve=fr(A,"FORBID_TAGS")?at({},A.FORBID_TAGS,Ae):wr({}),mt=fr(A,"FORBID_ATTR")?at({},A.FORBID_ATTR,Ae):wr({}),et=fr(A,"USE_PROFILES")?A.USE_PROFILES:!1,it=A.ALLOW_ARIA_ATTR!==!1,Je=A.ALLOW_DATA_ATTR!==!1,V=A.ALLOW_UNKNOWN_PROTOCOLS||!1,ee=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,me=A.SAFE_FOR_TEMPLATES||!1,Ke=A.SAFE_FOR_XML!==!1,ze=A.WHOLE_DOCUMENT||!1,ht=A.RETURN_DOM||!1,Be=A.RETURN_DOM_FRAGMENT||!1,Re=A.RETURN_TRUSTED_TYPE||!1,Qe=A.FORCE_BODY||!1,Ue=A.SANITIZE_DOM!==!1,Lt=A.SANITIZE_NAMED_PROPS||!1,_t=A.KEEP_CONTENT!==!1,ut=A.IN_PLACE||!1,_e=A.ALLOWED_URI_REGEXP||Yl,Oe=A.NAMESPACE||Te,pe=A.MATHML_TEXT_INTEGRATION_POINTS||pe,v=A.HTML_INTEGRATION_POINTS||v,$e=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&R(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&($e.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&R(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&($e.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&($e.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),me&&(Je=!1),Be&&(ht=!0),et&&(G=at({},Wl),ke=[],et.html===!0&&(at(G,Ul),at(ke,zl)),et.svg===!0&&(at(G,ra),at(ke,oa),at(ke,Hs)),et.svgFilters===!0&&(at(G,na),at(ke,oa),at(ke,Hs)),et.mathMl===!0&&(at(G,sa),at(ke,Hl),at(ke,Hs))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?Pe.tagCheck=A.ADD_TAGS:(G===ae&&(G=wr(G)),at(G,A.ADD_TAGS,Ae))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?Pe.attributeCheck=A.ADD_ATTR:(ke===Ne&&(ke=wr(ke)),at(ke,A.ADD_ATTR,Ae))),A.ADD_URI_SAFE_ATTR&&at(le,A.ADD_URI_SAFE_ATTR,Ae),A.FORBID_CONTENTS&&(rt===nt&&(rt=wr(rt)),at(rt,A.FORBID_CONTENTS,Ae)),_t&&(G["#text"]=!0),ze&&at(G,["html","head","body"]),G.table&&(at(G,["tbody"]),delete Ve.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw zn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw zn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');F=A.TRUSTED_TYPES_POLICY,C=F.createHTML("")}else F===void 0&&(F=Of($,s)),F!==null&&typeof C=="string"&&(C=F.createHTML(""));Wt&&Wt(A),g=A}},Z=at({},[...ra,...na,...kf]),ge=at({},[...sa,...$f]),De=function(A){let de=P(A);(!de||!de.tagName)&&(de={namespaceURI:Oe,tagName:"template"});let Ce=Gs(A.tagName),pt=Gs(de.tagName);return M[A.namespaceURI]?A.namespaceURI===H?de.namespaceURI===Te?Ce==="svg":de.namespaceURI===I?Ce==="svg"&&(pt==="annotation-xml"||pe[pt]):!!Z[Ce]:A.namespaceURI===I?de.namespaceURI===Te?Ce==="math":de.namespaceURI===H?Ce==="math"&&v[pt]:!!ge[Ce]:A.namespaceURI===Te?de.namespaceURI===H&&!v[pt]||de.namespaceURI===I&&!pe[pt]?!1:!ge[Ce]&&(T[Ce]||!Z[Ce]):!!(O==="application/xhtml+xml"&&M[A.namespaceURI]):!1},ue=function(A){Un(t.removed,{element:A});try{P(A).removeChild(A)}catch{U(A)}},dt=function(A,de){try{Un(t.removed,{attribute:de.getAttributeNode(A),from:de})}catch{Un(t.removed,{attribute:null,from:de})}if(de.removeAttribute(A),A==="is")if(ht||Be)try{ue(de)}catch{}else try{de.setAttribute(A,"")}catch{}},kt=function(A){let de=null,Ce=null;if(Qe)A="<remove></remove>"+A;else{let bt=ta(A,/^[\r\n\t ]+/);Ce=bt&&bt[0]}O==="application/xhtml+xml"&&Oe===Te&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");let pt=F?F.createHTML(A):A;if(Oe===Te)try{de=new m().parseFromString(pt,O)}catch{}if(!de||!de.documentElement){de=j.createDocument(Oe,"template",null);try{de.documentElement.innerHTML=xe?C:pt}catch{}}let Rt=de.body||de.documentElement;return A&&Ce&&Rt.insertBefore(r.createTextNode(Ce),Rt.childNodes[0]||null),Oe===Te?K.call(de,ze?"html":"body")[0]:ze?de.documentElement:Rt},Ot=function(A){return S.call(A.ownerDocument||A,A,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},$t=function(A){return A instanceof p&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof d)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},Dt=function(A){return typeof l=="function"&&A instanceof l};function Pt(Ie,A,de){zs(Ie,Ce=>{Ce.call(t,A,de,g)})}let Yt=function(A){let de=null;if(Pt(re.beforeSanitizeElements,A,null),$t(A))return ue(A),!0;let Ce=Ae(A.nodeName);if(Pt(re.uponSanitizeElement,A,{tagName:Ce,allowedTags:G}),Ke&&A.hasChildNodes()&&!Dt(A.firstElementChild)&&Ut(/<[/\w!]/g,A.innerHTML)&&Ut(/<[/\w!]/g,A.textContent)||A.nodeType===Gn.progressingInstruction||Ke&&A.nodeType===Gn.comment&&Ut(/<[/\w]/g,A.data))return ue(A),!0;if(!(Pe.tagCheck instanceof Function&&Pe.tagCheck(Ce))&&(!G[Ce]||Ve[Ce])){if(!Ve[Ce]&&gr(Ce)&&($e.tagNameCheck instanceof RegExp&&Ut($e.tagNameCheck,Ce)||$e.tagNameCheck instanceof Function&&$e.tagNameCheck(Ce)))return!1;if(_t&&!rt[Ce]){let pt=P(A)||A.parentNode,Rt=J(A)||A.childNodes;if(Rt&&pt){let bt=Rt.length;for(let It=bt-1;It>=0;--It){let f=q(Rt[It],!0);f.__removalCount=(A.__removalCount||0)+1,pt.insertBefore(f,oe(A))}}}return ue(A),!0}return A instanceof c&&!De(A)||(Ce==="noscript"||Ce==="noembed"||Ce==="noframes")&&Ut(/<\/no(script|embed|frames)/i,A.innerHTML)?(ue(A),!0):(me&&A.nodeType===Gn.text&&(de=A.textContent,zs([ve,He,We],pt=>{de=Wn(de,pt," ")}),A.textContent!==de&&(Un(t.removed,{element:A.cloneNode()}),A.textContent=de)),Pt(re.afterSanitizeElements,A,null),!1)},cr=function(A,de,Ce){if(Ue&&(de==="id"||de==="name")&&(Ce in r||Ce in y))return!1;if(!(Je&&!mt[de]&&Ut(Fe,de))){if(!(it&&Ut(ne,de))){if(!(Pe.attributeCheck instanceof Function&&Pe.attributeCheck(de,A))){if(!ke[de]||mt[de]){if(!(gr(A)&&($e.tagNameCheck instanceof RegExp&&Ut($e.tagNameCheck,A)||$e.tagNameCheck instanceof Function&&$e.tagNameCheck(A))&&($e.attributeNameCheck instanceof RegExp&&Ut($e.attributeNameCheck,de)||$e.attributeNameCheck instanceof Function&&$e.attributeNameCheck(de,A))||de==="is"&&$e.allowCustomizedBuiltInElements&&($e.tagNameCheck instanceof RegExp&&Ut($e.tagNameCheck,Ce)||$e.tagNameCheck instanceof Function&&$e.tagNameCheck(Ce))))return!1}else if(!le[de]){if(!Ut(_e,Wn(Ce,we,""))){if(!((de==="src"||de==="xlink:href"||de==="href")&&A!=="script"&&bf(Ce,"data:")===0&&L[A])){if(!(V&&!Ut(ce,Wn(Ce,we,"")))){if(Ce)return!1}}}}}}}return!0},gr=function(A){return A!=="annotation-xml"&&ta(A,x)},st=function(A){Pt(re.beforeSanitizeAttributes,A,null);let{attributes:de}=A;if(!de||$t(A))return;let Ce={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke,forceKeepAttr:void 0},pt=de.length;for(;pt--;){let Rt=de[pt],{name:bt,namespaceURI:It,value:f}=Rt,w=Ae(bt),W=f,_=bt==="value"?W:yf(W);if(Ce.attrName=w,Ce.attrValue=_,Ce.keepAttr=!0,Ce.forceKeepAttr=void 0,Pt(re.uponSanitizeAttribute,A,Ce),_=Ce.attrValue,Lt&&(w==="id"||w==="name")&&(dt(bt,A),_=tt+_),Ke&&Ut(/((--!?|])>)|<\/(style|title|textarea)/i,_)){dt(bt,A);continue}if(w==="attributename"&&ta(_,"href")){dt(bt,A);continue}if(Ce.forceKeepAttr)continue;if(!Ce.keepAttr){dt(bt,A);continue}if(!ee&&Ut(/\/>/i,_)){dt(bt,A);continue}me&&zs([ve,He,We],ie=>{_=Wn(_,ie," ")});let b=Ae(A.nodeName);if(!cr(b,w,_)){dt(bt,A);continue}if(F&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!It)switch($.getAttributeType(b,w)){case"TrustedHTML":{_=F.createHTML(_);break}case"TrustedScriptURL":{_=F.createScriptURL(_);break}}if(_!==W)try{It?A.setAttributeNS(It,bt,_):A.setAttribute(bt,_),$t(A)?ue(A):Bl(t.removed)}catch{dt(bt,A)}}Pt(re.afterSanitizeAttributes,A,null)},Zt=function Ie(A){let de=null,Ce=Ot(A);for(Pt(re.beforeSanitizeShadowDOM,A,null);de=Ce.nextNode();)Pt(re.uponSanitizeShadowNode,de,null),Yt(de),st(de),de.content instanceof o&&Ie(de.content);Pt(re.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(Ie){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},de=null,Ce=null,pt=null,Rt=null;if(xe=!Ie,xe&&(Ie="<!-->"),typeof Ie!="string"&&!Dt(Ie))if(typeof Ie.toString=="function"){if(Ie=Ie.toString(),typeof Ie!="string")throw zn("dirty is not a string, aborting")}else throw zn("toString is not a function");if(!t.isSupported)return Ie;if(Ye||z(A),t.removed=[],typeof Ie=="string"&&(ut=!1),ut){if(Ie.nodeName){let f=Ae(Ie.nodeName);if(!G[f]||Ve[f])throw zn("root node is forbidden and cannot be sanitized in-place")}}else if(Ie instanceof l)de=kt("<!---->"),Ce=de.ownerDocument.importNode(Ie,!0),Ce.nodeType===Gn.element&&Ce.nodeName==="BODY"||Ce.nodeName==="HTML"?de=Ce:de.appendChild(Ce);else{if(!ht&&!me&&!ze&&Ie.indexOf("<")===-1)return F&&Re?F.createHTML(Ie):Ie;if(de=kt(Ie),!de)return ht?null:Re?C:""}de&&Qe&&ue(de.firstChild);let bt=Ot(ut?Ie:de);for(;pt=bt.nextNode();)Yt(pt),st(pt),pt.content instanceof o&&Zt(pt.content);if(ut)return Ie;if(ht){if(Be)for(Rt=N.call(de.ownerDocument);de.firstChild;)Rt.appendChild(de.firstChild);else Rt=de;return(ke.shadowroot||ke.shadowrootmode)&&(Rt=be.call(n,Rt,!0)),Rt}let It=ze?de.outerHTML:de.innerHTML;return ze&&G["!doctype"]&&de.ownerDocument&&de.ownerDocument.doctype&&de.ownerDocument.doctype.name&&Ut(Zl,de.ownerDocument.doctype.name)&&(It="<!DOCTYPE "+de.ownerDocument.doctype.name+`>
`+It),me&&zs([ve,He,We],f=>{It=Wn(It,f," ")}),F&&Re?F.createHTML(It):It},t.setConfig=function(){let Ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};z(Ie),Ye=!0},t.clearConfig=function(){g=null,Ye=!1},t.isValidAttribute=function(Ie,A,de){g||z({});let Ce=Ae(Ie),pt=Ae(A);return cr(Ce,pt,de)},t.addHook=function(Ie,A){typeof A=="function"&&Un(re[Ie],A)},t.removeHook=function(Ie,A){if(A!==void 0){let de=gf(re[Ie],A);return de===-1?void 0:hf(re[Ie],de,1)[0]}return Bl(re[Ie])},t.removeHooks=function(Ie){re[Ie]=[]},t.removeAllHooks=function(){re=Vl()},t}var Ql=Xl();var kr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Vs=e=>(...t)=>({_$litDirective$:e,values:t}),wn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Vn=class extends wn{constructor(t){if(super(t),this.it=Ct,t.type!==kr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ct||t==null)return this._t=void 0,this.it=t;if(t===nr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Vn.directiveName="unsafeHTML",Vn.resultType=1;var Jl=Vs(Vn);function pa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Qr=pa();function ac(e){Qr=e}var Xn={exec:()=>null};function ft(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Ht.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Df=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ht={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Pf=/^(?:[ \t]*(?:\n|$))+/,Mf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Nf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,qf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,fa=/(?:[*+-]|\d{1,9}[.)])/,ic=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,lc=ft(ic).replace(/bull/g,fa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ff=ft(ic).replace(/bull/g,fa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),_a=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,jf=/^[^\n]+/,ma=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Bf=ft(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ma).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Uf=ft(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,fa).getRegex(),Js="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ga=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Wf=ft("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ga).replace("tag",Js).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),cc=ft(_a).replace("hr",Qn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Js).getRegex(),zf=ft(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",cc).getRegex(),ha={blockquote:zf,code:Mf,def:Bf,fences:Nf,heading:qf,hr:Qn,html:Wf,lheading:lc,list:Uf,newline:Pf,paragraph:cc,table:Xn,text:jf},ec=ft("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Js).getRegex(),Hf={...ha,lheading:Ff,table:ec,paragraph:ft(_a).replace("hr",Qn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ec).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Js).getRegex()},Gf={...ha,html:ft(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ga).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ft(_a).replace("hr",Qn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",lc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Vf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Kf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,uc=/^( {2,}|\\)\n(?!\s*$)/,Yf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,eo=/[\p{P}\p{S}]/u,ba=/[\s\p{P}\p{S}]/u,dc=/[^\s\p{P}\p{S}]/u,Zf=ft(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ba).getRegex(),pc=/(?!~)[\p{P}\p{S}]/u,Xf=/(?!~)[\s\p{P}\p{S}]/u,Qf=/(?:[^\s\p{P}\p{S}]|~)/u,Jf=ft(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Df?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),fc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,e_=ft(fc,"u").replace(/punct/g,eo).getRegex(),t_=ft(fc,"u").replace(/punct/g,pc).getRegex(),_c="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",r_=ft(_c,"gu").replace(/notPunctSpace/g,dc).replace(/punctSpace/g,ba).replace(/punct/g,eo).getRegex(),n_=ft(_c,"gu").replace(/notPunctSpace/g,Qf).replace(/punctSpace/g,Xf).replace(/punct/g,pc).getRegex(),s_=ft("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,dc).replace(/punctSpace/g,ba).replace(/punct/g,eo).getRegex(),o_=ft(/\\(punct)/,"gu").replace(/punct/g,eo).getRegex(),a_=ft(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),i_=ft(ga).replace("(?:-->|$)","-->").getRegex(),l_=ft("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",i_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Zs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,c_=ft(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Zs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),mc=ft(/^!?\[(label)\]\[(ref)\]/).replace("label",Zs).replace("ref",ma).getRegex(),gc=ft(/^!?\[(ref)\](?:\[\])?/).replace("ref",ma).getRegex(),u_=ft("reflink|nolink(?!\\()","g").replace("reflink",mc).replace("nolink",gc).getRegex(),tc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ya={_backpedal:Xn,anyPunctuation:o_,autolink:a_,blockSkip:Jf,br:uc,code:Kf,del:Xn,emStrongLDelim:e_,emStrongRDelimAst:r_,emStrongRDelimUnd:s_,escape:Vf,link:c_,nolink:gc,punctuation:Zf,reflink:mc,reflinkSearch:u_,tag:l_,text:Yf,url:Xn},d_={...ya,link:ft(/^!?\[(label)\]\((.*?)\)/).replace("label",Zs).getRegex(),reflink:ft(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Zs).getRegex()},ca={...ya,emStrongRDelimAst:n_,emStrongLDelim:t_,url:ft(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",tc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ft(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",tc).getRegex()},p_={...ca,br:ft(uc).replace("{2,}","*").getRegex(),text:ft(ca.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ks={normal:ha,gfm:Hf,pedantic:Gf},Kn={normal:ya,gfm:ca,breaks:p_,pedantic:d_},f_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},rc=e=>f_[e];function $r(e,t){if(t){if(Ht.escapeTest.test(e))return e.replace(Ht.escapeReplace,rc)}else if(Ht.escapeTestNoEncode.test(e))return e.replace(Ht.escapeReplaceNoEncode,rc);return e}function nc(e){try{e=encodeURI(e).replace(Ht.percentDecode,"%")}catch{return null}return e}function sc(e,t){let r=e.replace(Ht.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Ht.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ht.slashPipe,"|");return n}function Yn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function __(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function oc(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function m_(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Xs=class{constructor(e){yt(this,"options");yt(this,"rules");yt(this,"lexer");this.options=e||Qr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Yn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=m_(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Yn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Yn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Yn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,r.length===0)break;let m=o.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let $=m,E=$.raw+`
`+r.join(`
`),q=this.blockquote(E);o[o.length-1]=q,n=n.substring(0,n.length-$.raw.length)+q.raw,s=s.substring(0,s.length-$.text.length)+q.text;break}else if(m?.type==="list"){let $=m,E=$.raw+`
`+r.join(`
`),q=this.list(E);o[o.length-1]=q,n=n.substring(0,n.length-m.raw.length)+q.raw,s=s.substring(0,s.length-$.raw.length)+q.raw,r=E.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,q=>" ".repeat(3*q.length)),m=e.split(`
`,1)[0],$=!p.trim(),E=0;if(this.options.pedantic?(E=2,d=p.trimStart()):$?E=t[1].length+1:(E=t[2].search(this.rules.other.nonSpaceChar),E=E>4?1:E,d=p.slice(E),E+=t[1].length),$&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),c=!0),!c){let q=this.rules.other.nextBulletRegex(E),U=this.rules.other.hrRegex(E),oe=this.rules.other.fencesBeginRegex(E),J=this.rules.other.headingBeginRegex(E),P=this.rules.other.htmlBeginRegex(E);for(;e;){let F=e.split(`
`,1)[0],C;if(m=F,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),C=m):C=m.replace(this.rules.other.tabCharGlobal,"    "),oe.test(m)||J.test(m)||P.test(m)||q.test(m)||U.test(m))break;if(C.search(this.rules.other.nonSpaceChar)>=E||!m.trim())d+=`
`+C.slice(E);else{if($||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||oe.test(p)||J.test(p)||U.test(p))break;d+=`
`+m}!$&&!m.trim()&&($=!0),u+=F+`
`,e=e.substring(F.length+1),p=C.slice(E)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=sc(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(sc(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Yn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=__(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),oc(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return oc(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let d=[...n[0]][0].length,p=e.slice(0,s+n.index+d+a);if(Math.min(s,a)%2){let $=p.slice(1,-1);return{type:"em",raw:p,text:$,tokens:this.lexer.inlineTokens($)}}let m=p.slice(2,-2);return{type:"strong",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},_r=class ua{constructor(t){yt(this,"tokens");yt(this,"options");yt(this,"state");yt(this,"inlineQueue");yt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Qr,this.options.tokenizer=this.options.tokenizer||new Xs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ht,block:Ks.normal,inline:Kn.normal};this.options.pedantic?(r.block=Ks.pedantic,r.inline=Kn.pedantic):this.options.gfm&&(r.block=Ks.gfm,this.options.breaks?r.inline=Kn.breaks:r.inline=Kn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Ks,inline:Kn}}static lex(t,r){return new ua(r).lex(t)}static lexInline(t,r){return new ua(r).inlineTokens(t)}lex(t){t=t.replace(Ht.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Ht.tabCharGlobal,"    ").replace(Ht.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=r.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),m;this.options.extensions.startInline.forEach($=>{m=$.call({lexer:this},p),typeof m=="number"&&m>=0&&(d=Math.min(d,m))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let d=r.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return r}},Qs=class{constructor(e){yt(this,"options");yt(this,"parser");this.options=e||Qr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Ht.notSpaceStart)?.[0],s=e.replace(Ht.endingNewline,"")+`
`;return n?'<pre><code class="language-'+$r(n)+'">'+(r?s:$r(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:$r(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${$r(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=nc(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+$r(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=nc(e);if(s===null)return $r(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${$r(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:$r(e.text)}},va=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},mr=class da{constructor(t){yt(this,"options");yt(this,"renderer");yt(this,"textRenderer");this.options=t||Qr,this.options.renderer=this.options.renderer||new Qs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new va}static parse(t,r){return new da(r).parse(t)}static parseInline(t,r){return new da(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Ys,Zn=(Ys=class{constructor(e){yt(this,"options");yt(this,"block");this.options=e||Qr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?_r.lex:_r.lexInline}provideParser(){return this.block?mr.parse:mr.parseInline}},yt(Ys,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),yt(Ys,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ys),g_=class{constructor(...e){yt(this,"defaults",pa());yt(this,"options",this.setOptions);yt(this,"parse",this.parseMarkdown(!0));yt(this,"parseInline",this.parseMarkdown(!1));yt(this,"Parser",mr);yt(this,"Renderer",Qs);yt(this,"TextRenderer",va);yt(this,"Lexer",_r);yt(this,"Tokenizer",Xs);yt(this,"Hooks",Zn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Qs(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Xs(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Zn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];Zn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Zn.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await l.call(s,u);return c.call(s,p)})();let d=l.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(s,u);return p===!1&&(p=await c.apply(s,u)),p})();let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return _r.lex(e,t??this.defaults)}parser(e,t){return mr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?_r.lex:_r.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?mr.parse:mr.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?_r.lex:_r.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?mr.parse:mr.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+$r(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Xr=new g_;function gt(e,t){return Xr.parse(e,t)}gt.options=gt.setOptions=function(e){return Xr.setOptions(e),gt.defaults=Xr.defaults,ac(gt.defaults),gt};gt.getDefaults=pa;gt.defaults=Qr;gt.use=function(...e){return Xr.use(...e),gt.defaults=Xr.defaults,ac(gt.defaults),gt};gt.walkTokens=function(e,t){return Xr.walkTokens(e,t)};gt.parseInline=Xr.parseInline;gt.Parser=mr;gt.parser=mr.parse;gt.Renderer=Qs;gt.TextRenderer=va;gt.Lexer=_r;gt.lexer=_r.lex;gt.Tokenizer=Xs;gt.Hooks=Zn;gt.parse=gt;var oy=gt.options,ay=gt.setOptions,iy=gt.use,ly=gt.walkTokens,cy=gt.parseInline;var uy=mr.parse,dy=_r.lex;function Ir(e){let t=gt.parse(e),r=Ql.sanitize(t);return Jl(r)}function xr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function kn(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function to(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var hc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},h_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},b_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,y_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function hr(e){return!!e&&typeof e=="object"}function wa(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ka(e,t){let r=wa(e),n=wa(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function bc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>hr(s)&&typeof s.text=="string"?s.text:"").join(""):hr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function v_(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:hc[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=wa(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ka(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=ka(hr(l)?l.old_string:"",hr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function $a(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function xa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=b_.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:y_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function w_(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(hr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(xa(o.text));else if(o.type==="thinking"){let a=$a(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=v_(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(hr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=bc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function k_(e){let t=typeof e.command=="string"?e.command:"",r=bc(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",r].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:hc.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function $_(e){if(e.type==="item.completed"&&hr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[xa(t.text)];if(t.type==="reasoning"){let r=$a(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[k_(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function x_(e){if(e.schema!=="codex-delegation-monitor-v1"||!hr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&hr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[xa(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let l=$a(r.text);return l?[l]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=h_[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function A_(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function S_(e){let t=e;if(typeof e=="string"){let r=e.trim();if(r.length===0)return null;try{t=JSON.parse(r)}catch{return null}}return hr(t)?t:null}function yc(){let e=new Map;return{push(t){let r=S_(t);return r?r.schema==="codex-delegation-monitor-v1"?x_(r):A_(r)?$_(r):w_(r,e):[]}}}function Aa(e){let t=[],r=yc(),n=Array.isArray(e)?e:[];for(let s of n)for(let o of r.push(s))t.push(o);return t}var E_=5,T_=10,C_=/Task\s+#(\d+)/,R_=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,I_=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ro(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function L_(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function O_(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function D_(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=C_.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function P_(e){if(e.tool==="Bash"){let t=e.command||"";return R_.test(t)?"~ PR/\uAC8C\uC2DC \uC911":I_.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function M_(e){let t=e.filter(s=>s.kind==="tool").slice(-T_),r=new Map;t.forEach((s,o)=>{let a=P_(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function N_(e){let t=O_(e);if(t)return{text:t,guess:!1};let r=D_(e);if(r)return{text:r,guess:!1};let n=M_(e);return n?{text:n,guess:!0}:null}function q_(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:or(e,t)}function $n(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,l=null,c=null,u=!1,d={},p=!0,m=new Set,$=new Set,E=null,q=null,U=!1,oe=!1,J=!1,P=null,F=null;function C(){U=!1,oe=!1,J=!1,P=null,F=null}async function j(V){if(r){oe=!0,J=!1,ae();try{let ee=await Promise.resolve(r("get-attempt-prompt",{attempt_id:V,...c?{root_dir:c}:{}}));if(o!==V)return;!ee||typeof ee!="object"||Array.isArray(ee)?J=!0:(P=ee,F=V)}catch{o===V&&(J=!0)}finally{o===V&&(oe=!1,ae())}}}function S(){if(U=!U,U&&o&&F!==o){j(o);return}ae()}function N(){if(!U)return"";let V=kn({loading:oe,error:J});if(V)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${V}
      </div>`;if(!P)return"";if(P.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let ee=to(P.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${ee?i`<div class="prompt-block__meta">${ee} 발송</div>`:""}
      ${typeof P.task_prompt=="string"?xr("\uACFC\uC5C5 (user)",P.task_prompt):""}
      ${typeof P.system_prompt=="string"?xr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",P.system_prompt):""}
    </div>`}function K(){if(!l||!n)return[];let V=n.get(l);return Aa(V?V.lines:[])}function be(){if(!l||!n)return null;let V=n.get(l),ee=V?V.last_event_at:null;return typeof ee=="number"?ee:null}function re(){return d.status==="running"}function ve(){if(re()&&o){q||(q=setInterval(()=>ae(),1e3));return}He()}function He(){q&&(clearInterval(q),q=null)}function We(V){let ee=[],me=0;for(;me<V.length;){let Ke=V[me];if(Ke.kind==="tool"){let ze=me;for(;ze<V.length&&V[ze].kind==="tool"&&V[ze].tool===Ke.tool;)ze+=1;if(ze-me>=E_&&!$.has(me)){ee.push({kind:"group",idx:me,tool:Ke.tool||"",lines:V.slice(me,ze).map((Ye,Qe)=>({idx:me+Qe,line:Ye}))}),me=ze;continue}}ee.push({kind:"line",idx:me,line:Ke}),me+=1}return ee}function Fe(V){for(let ee=V.length-1;ee>=0;ee-=1){let me=V[ee];if(me.kind==="result"||me.kind==="error")return null;if(me.kind==="tool"&&!Object.hasOwn(me,"result"))return me}return null}function ne(V){for(let ee=V.length-1;ee>=0;ee-=1)if(V[ee].kind==="thinking")return V[ee];return null}function ce(V,ee){if(ee.kind==="gate")return i`<div class="sv__gate">${ee.text}</div>`;if(ee.kind==="phase")return i`<div class="sv__phase">${ee.text}</div>`;if(ee.kind==="result")return i`<div
        class="sv__result${ee.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${ee.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Ir(ee.text||(ee.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(ee.kind==="thinking"){let me=m.has(V);return i`<div
        class="sv__think${me?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ne(V)}
      >
        <span class="sv__think-line">💭 ${ro(ee.text)}</span>
        ${me?i`<pre class="sv__think-expand">${ee.text}</pre>`:""}
      </div>`}if(ee.kind==="error")return i`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="blocker")return i`<div class="sv__error">⛔ ${ee.text}</div>`;if(ee.kind==="tool"){let me=m.has(V),Ke=ee.tool==="Bash"?L_(ee.command):0,ze=ee.tool==="Bash"?Ke>1?ro(ee.command):ee.command:ee.path||ee.command||"";return i`<div
        class="sv__tool${me?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ne(V)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${ee.icon}</span>
          <span class="sv__tool-name">${ee.tool}</span>
          ${ze?i`<span class="sv__tool-detail">${ze}</span>`:""}
          ${Ke>1?i`<span class="sv__tool-more">⋯ ${Ke}줄</span>`:""}
          ${typeof ee.added=="number"?i`<span class="sv__diff-add">+${ee.added}</span>`:""}
          ${typeof ee.removed=="number"?i`<span class="sv__diff-del">−${ee.removed}</span>`:""}
          ${ee.result?i`<span class="sv__tool-ok">→ ${ee.result}</span>`:""}
        </span>
        ${me?i`<pre class="sv__tool-expand">${we(ee)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${Ir(ee.text||"")}</div>`}function we(V){let ee=[];if(V.tool==="Bash"&&typeof V.command=="string"&&V.command.length>0)ee.push(V.command);else if(V.input!==void 0)try{ee.push(`input: ${JSON.stringify(V.input,null,2)}`)}catch{}return typeof V.output=="string"&&V.output.length>0&&ee.push(`output:
${V.output}`),ee.join(`

`)}function x(){if(!o)return i``;let V=K(),ee=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),me=d.session_id||"",Ke=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,ze=re(),Ye=ze?q_(be(),Date.now()):"",Qe=ze?Fe(V):null,ht=ze?ne(V):null,Be=N_(V);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Be?i`<span
              class="sv__stage${Be.guess?" sv__stage--guess":""}"
              title=${Be.text}
              >${Be.text}</span
            >`:""}
        ${ze?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ye?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ye}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ye?i`<span class="sv__live-ago">${Ye}</span>`:""}</span
            >`:""}
        ${me?i`<button
              type="button"
              class="sv__session"
              title=${me}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${me}`}
              @click=${()=>Ve(me)}
            >
              ⧉ ${me.slice(0,8)}
            </button>`:""}
        ${ee?i`<span class="sv__meta">${ee}</span>`:""}
        ${d.worktree?i`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":i`<button
              type="button"
              class="sv__prompt-toggle${U?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${U?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${S}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Ke}
          @click=${$e}
        >
          <span class="sv__follow-full">⇣ ${Ke}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
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
      ${a||u?"":N()}
      <div class="sv__body">
        ${V.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:We(V).map(Re=>Re.kind==="group"?_e(Re):ce(Re.idx,Re.line))}
      </div>
      ${Qe||ht?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Qe?i`<span class="sv__now-icon">${Qe.icon}</span>
                  <span class="sv__now-name">${Qe.tool}</span>
                  <span class="sv__now-detail"
                    >${Qe.tool==="Bash"?ro(Qe.command):Qe.path||Qe.command||""}</span
                  >`:""}
            ${ht?i`<span class="sv__now-think"
                  >💭 ${ro(ht.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function _e(V){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>G(V.idx)}
    >
      <span class="sv__group-icon">${V.lines[0].line.icon}</span>
      <span class="sv__group-name">${V.tool}</span>
      <span class="sv__group-count">${V.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function G(V){$.add(V),ae()}function ae(){Ge(x(),e),ve(),p&&ke()}function ke(){let V=e.querySelector(".sv__body");V&&(V.scrollTop=V.scrollHeight)}function Ne(V){m.has(V)?m.delete(V):m.add(V),ae()}function $e(){p=!p,ae()}function Ve(V){Jt(V).then(ee=>{ee?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function mt(V){!o||!V||(d={...d,...V},ae())}function Pe(V){let ee=V.target;if(!ee||!ee.classList||!ee.classList.contains("sv__body"))return;!(ee.scrollHeight-ee.scrollTop-ee.clientHeight<=4)&&p&&(p=!1,ae())}e.addEventListener("scroll",Pe,!0);function it(V){let ee=V&&V.attempt_id;if(!ee)return;let me=l;o=ee,a=typeof V.launch_id=="string"&&V.launch_id.length>0?V.launch_id:null,l=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&me&&me!==l&&Promise.resolve(r("unsubscribe-session-log",{id:me})).catch(()=>{}),c=typeof V.root_dir=="string"&&V.root_dir.length>0?V.root_dir:null,d=V.meta||{},u=V.hide_prompt===!0,p=!0,m.clear(),$.clear(),C(),!E&&n&&(E=n.subscribe(ae)),r&&Promise.resolve(r("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),ae()}function Je(){let V=l;o=null,a=null,l=null,c=null,u=!1,m.clear(),$.clear(),C(),He(),r&&V&&Promise.resolve(r("unsubscribe-session-log",{id:V})).catch(()=>{}),Ge(i``,e),s&&s()}return{open:it,updateMeta:mt,close:Je,isOpen(){return o!==null},destroy(){He(),E&&(E(),E=null),e.removeEventListener("scroll",Pe,!0),o=null,a=null,l=null,c=null,u=!1,Ge(i``,e)}}}function no(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Sa(t.spec_id),s=Sa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Sa(e){return typeof e=="string"?e.trim():""}function vc(e){let t=no(e);if(t.path)return t;let r=Sa(F_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function F_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function j_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function B_(e){let t=e&&e.metadata||{},r=vc(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:j_(t)?null:"plan_pending"}),n}function wc(e,t){let r=B_(e);return i`
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
  `}var U_="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",W_=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,z_=/^\*\*결론\*\* — (.+)$/;function so(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==U_)return null;let r=W_.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?z_.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var kc=20;function $c(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function H_(e){return e.length>kc?`${e.slice(0,kc)}\u2026`:e}function G_(e,t,r,n){let s=`${t.lane} ${H_(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${$c(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${Ir(t.body)}
        </div>`:""}
  </div>`}function V_(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${$c(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Ir(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function xc(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=so(typeof c.text=="string"?c.text:"");return u?G_(c,u,t,s.has(c.id)):V_(c)})}
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
  `}var{I:Gy}=Wi;var Ac=e=>e.strings===void 0;var K_={},Sc=(e,t=K_)=>e._$AH=t;var Jr=Vs(class extends wn{constructor(e){if(super(e),e.type!==kr.PROPERTY&&e.type!==kr.ATTRIBUTE&&e.type!==kr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ac(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===nr||t===Ct)return t;let r=e.element,n=e.name;if(e.type===kr.PROPERTY){if(t===r[n])return nr}else if(e.type===kr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return nr}else if(e.type===kr.ATTRIBUTE&&r.getAttribute(n)===t+"")return nr;return Sc(e),t}});var oo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ta=[...oo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Ar=["orchestration_model","orchestration_effort","orchestration_speed"],ao=[...oo,...Ar],Y_=Ta.filter(e=>ao.includes(e)),Ec=["delegated","main"],io=["inherit","claude","codex"],Jn=["default","fast"],es=["standard","fast_track"],ts=["codex","opus","fable","self","skip"],lo=["codex","fable","skip"],co=["low","medium","high","xhigh"],tr="auto";function er(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Tc(e){if(!er(e)||!er(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))er(n)&&er(n.models)&&t.push([r,Object.keys(n.models)]);return t}function xn(e,t){let r=Tc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[tr,...n.flatMap(([,s])=>s)]}function Cc(e,t,r,n){if(!er(e)||!er(e.runners))return[tr];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!er(a)||!er(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[l,c]of Object.entries(a.models)){if(r&&r!==tr&&l!==r)continue;let u=n(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[tr,...s]}function An(e,t,r){return Cc(e,t,r,(n,s)=>er(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function Ca(e,t,r){return Cc(e,t,r,(n,s)=>er(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:er(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function rs(e,t){let r=Tc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Rc(e,t,r){let n={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:n.impl_runtime==="inherit"?r:null;return s&&(n.impl_model&&!xn(t,s).includes(n.impl_model)&&(n.impl_model=void 0),n.impl_effort&&!An(t,s,n.impl_model||tr).includes(n.impl_effort)&&(n.impl_effort=void 0)),n}var Z_={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ea=[...Y_,...Ar],X_=[...ao,...Ta].filter((e,t,r)=>r.indexOf(e)===t&&!Ea.includes(e));function Ic(e,t){let r=er(e)?e:{},n=er(t)?t:{},s=[];for(let a of Ea){let l=r[a]??null,c=n[a]??null;l!==c&&s.push({key:a,label:Z_[a]||a,before:l,after:c,kind:l===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...X_,...Object.keys(n)])!Ea.includes(a)&&!o.includes(a)&&Object.hasOwn(n,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ra(e,t,r,n,s,o){return Us({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function Lc(e,t){let r={};for(let n of Ta){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Oc(e,t){let r={};for(let n of Ar){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Ia=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Ar]}],Lr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},uo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function La(e,t,r,n,s,o=null){let a=ar({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(l=>({key:l,...a[l]}))}function Dc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let l of La(e,t,r,n,s,o))a[l.source]+=1;return a}function Pc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Mc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var nv=[...oo,...Ar];var Q_=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],J_={pin:"pin",global:"global",base:"base"};function em(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${J_[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function tm(e,t,r){switch(e){case"workflow_mode":return es;case"spec_review_model":case"impl_review_model":return ts;case"plan_review_model":return lo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return co;case"impl_dispatch":return Ec;case"impl_runtime":return io;case"impl_model":return xn(r,t.impl_runtime);case"impl_effort":return An(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Jn;case"orchestration_model":return rs(r,null);case"orchestration_effort":return An(r,void 0,t.orchestration_model||tr).filter(n=>n!==tr);default:return[]}}function rm(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${em(e.source)}
    <span class="detail-effective__k"
      >${Lr[e.key]||e.key}</span
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
          aria-label=${`${Lr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Nc(e,t){let r=Ia.flatMap(c=>c.keys),n=La(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Dc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(c=>[c.key,c])),a=Object.fromEntries(n.filter(c=>c.value!==null).map(c=>[c.key,c.value])),l=n.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return i`<details
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
        >${nm(o)}</span
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
              ${n.filter(u=>c.keys.includes(u.key)).map(u=>{let d=Us({key:u.key,choices:tm(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return rm(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Jr(e.preset_id)}
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
  </details>`}function nm(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function sm(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function qc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",l=sm(r.exec_receipt),c=l?Kr(l):a,u=l?`${l.kind}:${l.actor}`:a.split("@")[0],d=js(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${Q_.map(p=>{let m=p.receipt&&typeof t[p.receipt]=="string"?String(t[p.receipt]):"",$=n[p.id],E=m.length>0||$?.fill==="full",q=!E&&$?.fill==="dim",U=$?.stale===!0;return i`<span
          class=${`detail-summary__gate${E?" detail-summary__gate--on":""}${q?" detail-summary__gate--current":""}${U?" detail-summary__gate--stale":""}`}
          data-gate=${p.id}
        >
          <span class="detail-summary__gate-pill">${p.label}</span>
          ${m?i`<span class="detail-summary__gate-sha"
                >${m.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Uc(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Fc(e){return Uc(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function jc(e,t){let r=e&&e[t];if(!Uc(r)||!Array.isArray(r.accounts))return null;let n=r.accounts.filter(Fc),s=Fc(r.active)?r.active:null;return{accounts:n,active:s||n.find(o=>o.active===!0)||null}}function Wc(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function om(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Wc(e)}${t}`}function zc(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Wc(e)}`}function am(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:zc({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Bc(e){let t=e.provider_key==="claude"?om:zc,r=!!e.provider?.accounts.some(n=>n.key===e.selected);return i`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${n=>e.handlers.onExecChange(e.key,n.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${am(e.provider_key,e.provider)}
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
  </div>`}function Hc({md:e,catalog:t,handlers:r}){let n=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return i`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Bc({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:jc(t,"claude"),selected:n,handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Bc({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:jc(t,"codex"),selected:s,handlers:r})}
    </div>
  </section>`}var Gc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ns(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function po(e){if(!ns(e)||!ns(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>ns(r)&&ns(r.models));return t.length>0?t:null}function Sr(e,t){let r=po(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Vc(e,t){return ns(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Kc(e,t){let r=po(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Vc(n,n.models[t]);return[]}function im(e){let t=po(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Vc(n,s))r.includes(o)||r.push(o);return r}function lm(e,t){if(!t)return im(e);let n=po(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Kc(e,o))s.includes(a)||s.push(a);return s}function Yc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Sr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Kc(t,n.impl_model):lm(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function cm(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Zc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c(E){E.key==="Escape"&&s&&(E.preventDefault(),m())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${cm(s)}</span
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
                    </div>`:Ir(a)}
          </div>
        </div>
      </div>
    `:i``}function d(){Ge(u(),e)}async function p(E,q={}){s=E,o="loading",a="",l="",d();let U=r?r():"";if(!U){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",d();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",d();return}let oe="/api/doc?workspace="+encodeURIComponent(U)+"&path="+encodeURIComponent(E);try{let J=await n(oe),P=await J.json().catch(()=>({}));if(!J.ok||!P||P.ok!==!0){if(P?.error==="not_found"&&q.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",d();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||J.status)+")",d();return}a=String(P.content||""),o="ready",d()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",d()}}function m(){s=null,Ge(i``,e)}function $(){document.removeEventListener("keydown",c),m()}return{open:p,close:m,destroy:$}}var um=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Qc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",fo=["implementation","review-consult"],dm=["running","done","failed","interrupted"],pm={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function fm(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function _m(e){let t=Bt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=vn(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Qc}
          >부분 집계</span
        >`:""}`}function Xc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Oa(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Da(t):""}function mm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!fo.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!dm.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function gm(e,t){let n=Bt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
  </div>`}function hm(e,t,r,n){let s=e.status==="running"?null:t,a=(s?Bt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Da(e.last_event_at):s?Oa(s.completed_at):"";return i`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${pm[e.status]}</span
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
  </button>`}function bm(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function ym(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let p=mm(d);!p||s.has(p.launch_id)||(s.add(p.launch_id),n.push(p))}n.sort((d,p)=>d.started_at-p.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let d of fo){let p=t.roles[d]?.codex;a[d]=p?[...p.legs]:[]}let l=fo.flatMap(d=>a[d]),c=new Set,u=[];for(let d of fo){for(let p of n.filter(m=>m.role===d)){let m=l.find($=>$.receipt_id===p.launch_id)||null;m&&!bm(p,m)||(m&&c.add(m.receipt_id),u.push(hm(p,m,e.attempt_id,r)))}for(let p of a[d])c.has(p.receipt_id)||u.push(gm(d,p))}return u}function vm(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...um,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${fm(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Qc}</span>`:""}
  </div>`}var wm={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Da(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function km(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Jc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let p=typeof u.session_id=="string"&&u.session_id.length>0,m=o.has(u.attempt_id),$=p&&!m,E=p?m?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!$}
      title=${E}
      @click=${q=>{q.stopPropagation(),$&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let p=u.cause_detail,m=p&&typeof p.reason=="string"&&p.reason.length>0?typeof p.command=="string"&&p.command.length>0?`${p.reason} \xB7 ${p.command}`:p.reason:u.cause;return i`<div class="detail-session__cause" title=${m}>
      ${u.cause}
    </div>`},c=u=>{let d=Xc(Jo(u));if(Bt(d).length===0&&!vn(u.usage))return"";let p=s.has(u.attempt_id);return i`<button
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
      세션 이력${_m(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let d=Jo(u),p=Xc(d),m=Bt(p);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${wm[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${qn(u)?i`<span
                  class="detail-session__resumed"
                  title=${qn(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Yr(u)}</span>
            ${m.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${m.length>0?m.map($=>i`<span
                      class="detail-session__usage"
                      title=${$.tooltip}
                      >${$.label}</span
                    >`):vn(u.usage)?i`<span class="detail-session__usage"
                    >${vn(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Da(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${km(u)}
          ${s.has(u.attempt_id)&&u.usage?vm(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${ym(u,d,t)}
        </div>`})}
    </div>
  `}function eu(e,t={}){return i`
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
          ${$m(e)}
        </div>`:""}
  `}function $m(e){let t=kn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?xr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=to(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?xr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?xr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var xm=["open","in_progress","deferred","resolved","closed"],Am=[0,1,2,3,4];function tu(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,p={},m="",$=!1,E=[],q=!1,U={},oe={claude:null,codex:null},J=null,P=0,F=!1,C=!1,j="",S="",N="";function K(){F=!1,C=!1,j="",S="",N=""}function be(){oe={claude:null,codex:null},J=null,P+=1}async function re(k){try{let Y=await fetch(k);if(!Y.ok)return null;let D=await Y.json();if(!D||typeof D!="object"||!Array.isArray(D.accounts))return null;let Ee=D.accounts.filter(lt=>lt!==null&&typeof lt=="object"&&!Array.isArray(lt));return{accounts:Ee,active:Ee.find(lt=>lt.active===!0)||null}}catch{return null}}async function ve(k){J=k;let Y=++P,[D,Ee]=await Promise.all([re("/api/claude-usage"),re("/api/codex-usage")]);Y!==P||k!==u||(oe={claude:D,codex:Ee},ye())}let He=[],We=null,Fe=null,ne=!1,ce="",we=!1,x=0,_e=new Set;function G(){He=[],We=null,Fe=null,ne=!1,ce="",we=!1,x+=1,_e.clear()}async function ae(k){if(!s)return;let Y=++x;try{let D=await Promise.resolve(s("get-comments",{id:k}));if(Y!==x||k!==u)return;He=Array.isArray(D)?D:[],ne=!1}catch{if(Y!==x||k!==u)return;ne=!0}ye()}function ke(){if(!s||!u)return;let k=d&&typeof d.comment_count=="number"?d.comment_count:null;if(We!==u){We=u,Fe=k,ae(u);return}k!==null&&k!==Fe&&(Fe=k,ae(u))}function Ne(k){_e.has(k)?_e.delete(k):_e.add(k),ye()}function $e(k){let Y=ce.trim().length===0;ce=k,Y!==(k.trim().length===0)&&ye()}async function Ve(){let k=ce.trim();if(!s||!u||k.length===0||we)return;let Y=u;we=!0,ye();let D=!1;try{let Ee=await Promise.resolve(s("add-comment",{id:Y,text:k}));Array.isArray(Ee)&&Ee.length>0&&(D=!0,Y===u&&(He=Ee,ne=!1,ce="",Fe=Ee.length))}catch{D=!1}D||he("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),Y===u&&(we=!1),ye()}let mt={onToggle:Ne,onDraftInput:$e,onSubmit:Ve},Pe=document.createElement("div");Pe.className="md-viewer-root",document.body.appendChild(Pe);let it=Zc(Pe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Je=document.createElement("div");Je.className="session-log-root",document.body.appendChild(Je);let V=$n(Je,{transport:s?(k,Y)=>Promise.resolve(s(k,Y)):void 0,sessionLogStore:c}),ee=!1,me=!1,Ke=!1,ze=null,Ye=null,Qe=0;function ht(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function Be(){ee=!1,me=!1,Ke=!1,ze=null,Ye=null,Qe+=1}async function Re(k){if(!s)return;let Y=++Qe;me=!0,Ke=!1,ye();try{let D=await Promise.resolve(s("get-bead-prompt",{bead_id:k}));if(Y!==Qe)return;!D||typeof D!="object"||Array.isArray(D)?Ke=!0:(ze=D,Ye=ht(k))}catch{Y===Qe&&(Ke=!0)}finally{Y===Qe&&(me=!1,ye())}}function Ue(){if(ee=!ee,ee&&u&&Ye!==ht(u)){ze=null,Re(u);return}ye()}function Lt(){if(!a||!u)return[];let k=a.get();return(k&&k.attempts?Object.values(k.attempts):[]).filter(D=>D&&D.bead_id===u).sort((D,Ee)=>(Ee.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]}))}function tt(){if(!a||!u)return null;let k=a.get();return ir(k&&k.attempts||{},u)}let _t=new Set;function ut(k){_t.has(k)?_t.delete(k):_t.add(k),ye()}function et(k){let Y=a?a.get():null,D=Y&&Y.attempts?Y.attempts[k]:null;V.open({attempt_id:k,meta:D?{runner:D.runner||void 0,model:D.model||void 0,effort:D.effort||void 0,status:D.status||void 0,session_id:D.session_id||void 0}:{}})}function rt(k,Y){let D=a?a.get():null,Ee=D&&D.attempts?D.attempts[k]:null,ot=(Ee&&Array.isArray(Ee.delegation_sessions)?Ee.delegation_sessions:[]).find(Ze=>Ze&&typeof Ze=="object"&&Ze.launch_id===Y);ot&&V.open({attempt_id:k,launch_id:Y,meta:{runner:"codex",role:ot.role,model:ot.model,effort:ot.effort,session_id:ot.session_id,status:ot.status}})}async function nt(k){if(!s||!k)return;let Y=await bn();if(Y===null)return;let D=()=>{let Ze=a?a.get():null;return Ze&&typeof Ze.revision=="number"?Ze.revision:0},Ee=async(Ze={},Xe=D())=>await s("worker-attempt-resume",{attempt_id:k,expected_revision:Xe,...Y!==""?{instructions:Y}:{},...Ze}),lt=Ze=>{Ze?.queue&&a?.set&&a.set(Ze.queue)},ot=await Ee();if(lt(ot),ot&&ot.conflict){let Ze=ot.queue&&typeof ot.queue.revision=="number"?ot.queue.revision:D();ot=await Ee({},Ze),lt(ot)}ot=await vr(ot,(Ze,Xe)=>Ee({continuation:Ze,decision_token:Xe}),{onResult:lt,refresh:()=>Ee()}),ot&&ot.resumed===!1&&!ot.conflict&&ot.reason&&he(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ot.reason}`,"error",2400)}let L={onOpen:et,onOpenDelegation:rt,onResume:nt,onToggleUsage:ut};function Q(){let k=a?a.get():null,Y={...U};for(let D of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ee=k&&k[D];typeof Ee=="string"&&(Y[D]=Ee)}return Y}async function le(){if(s){try{let k=await Promise.resolve(s("get-session-defaults",{}));U=k&&k.values&&typeof k.values=="object"?k.values:{}}catch{U={}}ye()}}function Le(){let k=a?a.get():null;return k&&k.runner_catalog||null}function I(){let k=a?a.get():null;return k&&typeof k.execution_defaults=="object"?k.execution_defaults:null}function H(){let k=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},D=ar({pin:{...k,...p},global:Q(),execution_defaults:I(),runner_catalog:Le(),route:typeof k.route=="string"?k.route:null}).orchestration_model.value||"";return Sr(Le(),D)}function Te(){let k=l?l.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function Oe(k){return k?.compatible===!1}function xe(k){l&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&l.set({revision:k.revision,presets:k.presets})}async function M(){let k=Te(),Y=k?.presets.find(D=>D.id===m);if(!(!s||!u||!k||!Y||Oe(Y)||$)){$=!0,E=[],ye();try{let D=await Promise.resolve(s("apply-impl-preset",Mc(u,Y.id,k.revision)));if(D&&D.conflict){xe(D),he("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ee=D&&Array.isArray(D.issue)?D.issue[0]:D?.issue;if(D&&D.applied&&Ee&&typeof Ee=="object"){d=Ee,E=Array.isArray(D.skipped_orchestration_keys)?D.skipped_orchestration_keys.filter(lt=>typeof lt=="string"):[];for(let lt of Gc)delete p[lt];he(E.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}D&&D.error==="bd_readback_failed"?he("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):he("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(D){D&&typeof D=="object"&&D.code==="bd_readback_failed"?he("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):he("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{$=!1,ye()}}}let X=null;r&&r.subscribe&&(X=r.subscribe(()=>O()));let pe=null;a&&typeof a.subscribe=="function"&&(pe=a.subscribe(()=>{u&&ye()}));let v=null;l&&typeof l.subscribe=="function"&&(v=l.subscribe(()=>{u&&ye()}));function T(k){k.key==="Escape"&&u&&(k.preventDefault(),n())}document.addEventListener("keydown",T);function O(){if(u){if(r&&typeof r.snapshotFor=="function"){let k=r.snapshotFor("detail:"+u)||[];d=k.find(D=>D&&D.id===u)||k[0]||d}ke(),ye()}}function te(k){Jt(k).then(Y=>{Y?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Se(k){k.preventDefault(),k.stopPropagation(),u&&te(u)}function Ae(k,Y){k.preventDefault(),k.stopPropagation(),te(Y)}function g(k,Y,D){k.preventDefault(),k.stopPropagation(),it.open(Y,{missing_state:D})}function y(k,Y){p[k]=Y,ye(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Pc(u,k,Y.length===0?null:Y))).catch(()=>{he("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function R(k,Y){let D=d||{},Ee=D.metadata&&typeof D.metadata=="object"?D.metadata:{},lt={};for(let Xe of["impl_runtime","impl_model","impl_effort"])lt[Xe]=Object.hasOwn(p,Xe)?p[Xe]:typeof Ee[Xe]=="string"?Ee[Xe]:"";lt[k]=Y;let ot=Yc(lt,Le(),H()),Ze={};for(let Xe of["impl_runtime","impl_model","impl_effort"])Ze[Xe]=p[Xe],p[Xe]=ot[Xe]||"";ye(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...ot,orchestration_runtime:H()})).then(Xe=>{let Tt=Array.isArray(Xe)?Xe[0]:Xe;if(!Tt||typeof Tt!="object"||!Tt.id)throw new Error("implementation target readback failed");d=Tt;for(let Xt of["impl_runtime","impl_model","impl_effort"])delete p[Xt];ye()}).catch(()=>{for(let Xe of["impl_runtime","impl_model","impl_effort"])Ze[Xe]===void 0?delete p[Xe]:p[Xe]=Ze[Xe];ye(),he("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function z(k,Y,D){if(!s||!u)return!1;try{let Ee=await Promise.resolve(s(k,Y)),lt=Array.isArray(Ee)?Ee[0]:Ee;return lt&&typeof lt=="object"&&lt.id?(d=lt,!0):(he(D,"error"),!1)}catch{return he(D,"error"),!1}}function Z(k){setTimeout(()=>{try{let Y=e.querySelector(k);Y&&typeof Y.focus=="function"&&Y.focus()}catch{}},0)}function ge(){F=!0,j=d&&d.title||"",ye(),Z('.detail-edit__input[data-edit="title"]')}function De(k){j=k.target.value}function ue(){F=!1,j="",ye()}function dt(){z("edit-text",{id:u,field:"title",value:j},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(Y=>{Y&&(F=!1,j=""),ye()})}function kt(){C=!0,S=d&&d.description||"",ye(),Z('.detail-edit__textarea[data-edit="description"]')}function Ot(k){S=k.target.value}function $t(){C=!1,S="",ye()}function Dt(){z("edit-text",{id:u,field:"description",value:S},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(Y=>{Y&&(C=!1,S=""),ye()})}function Pt(k,Y,D,Ee){if(k.key==="Escape"){k.stopPropagation(),D();return}k.key==="Enter"&&(!Ee||k.ctrlKey||k.metaKey)&&(k.preventDefault(),Y())}function Yt(k){let Y=k.target.value;z("update-status",{id:u,status:Y},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ye())}function cr(k){let Y=Number(k.target.value);z("update-priority",{id:u,priority:Y},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ye())}function gr(k){N=k.target.value}function st(){let k=N.trim();k.length!==0&&z("label-add",{id:u,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(Y=>{Y&&(N=""),ye()})}function Zt(k){if(k.key==="Escape"){k.stopPropagation(),N="",ye();return}k.key==="Enter"&&(k.preventDefault(),st())}function Ie(k){z("label-remove",{id:u,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ye())}let A={onCopyPath:Ae,onOpenDoc:g};function de(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function Ce(k){switch(k&&typeof k=="object"?String(k.dependency_type||k.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function pt(k){let D=(Array.isArray(k.dependencies)?k.dependencies:[]).map(Ee=>({id:de(Ee),icon:Ce(Ee)})).filter(Ee=>Ee.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${D.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${D.map(Ee=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Ee.id)}
                  >
                    ${Ee.icon?`${Ee.icon} `:""}${Ee.id}
                  </button>`:i`<span class="detail-dep"
                    >${Ee.icon?`${Ee.icon} `:""}${Ee.id}</span
                  >`)}
          </div>`}
    `}function Rt(k){let Y=k.metadata||{},D=k.workflow||{},Ee=D.stages||{},lt=Ee.spec&&Ee.spec.stale,ot=Ee.impl&&Ee.impl.stale,Ze=Ee.plan||null,Xe=D.route_source==="derived",Tt=D.route||Y.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Xe?" detail-kv__v--derived":""}"
          title=${Xe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Xe?"unset":Tt}</span
        >
      </div>
      ${D.route!=="quick_fix"||Object.hasOwn(Y,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${Y.spec_review||"\uC5C6\uC74C"}${lt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${D.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ze?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ze?.approval_receipt||"\uC5C6\uC74C"}${Ze?.approval_state==="stale"?" \xB7 stale":Ze?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${D.route!=="quick_fix"||Object.hasOwn(Y,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${Y.impl_review||"\uC5C6\uC74C"}${ot?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${D.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${D.planned_execution.kind}</span>
            </div>
            ${D.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${D.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${D.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Kr(D.exec_receipt)}</span
            >
          </div>`:""}
      ${D.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${D.impl_entry.actor}@${D.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${Y.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${Y.pr_url}</span>
          </div>`:""}
    `}let bt={route:["quick_fix","spec_backed","full_plan"]};async function It(k,Y){let D=Y.target.value;if(k==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&D!=="full_plan"&&!window.confirm(`full_plan \u2192 ${D||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ye();return}await z("update-workflow-meta",{id:u,key:k,value:D},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ye()}function f(k){let Y=k.metadata||{};return i` ${((Ee,lt)=>{let ot=bt[Ee],Ze=typeof Y[Ee]=="string"?Y[Ee]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${Ee}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ee}
          data-edit=${`wfmeta-${Ee}`}
          @change=${Xe=>It(Ee,Xe)}
        >
          <option value="" ?selected=${!ot.includes(Ze)}>
            ${lt}
          </option>
          ${ot.map(Xe=>i`<option value=${Xe} ?selected=${Ze===Xe}>${Xe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function w(k,Y){return F?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${j}
            @input=${De}
            @keydown=${D=>Pt(D,dt,ue,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${dt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ue}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        ${Bt(Y).map(D=>i`<span class="detail-usage-total" title=${D.tooltip}
              >${D.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ge}
        >
          ✎
        </button>
      </div>
    `}function W(k){let Y=jt(k.created_at),D=jt(k.updated_at);return!Y&&!D?i``:i`
      ${Y?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${Y}</span>
          </div>`:""}
      ${D?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
    `}function _(k,Y){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Yt}
        >
          ${xm.map(D=>i`<option value=${D} ?selected=${D===k}>${D}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${cr}
        >
          ${Am.map(D=>i`<option value=${String(D)} ?selected=${D===Y}>
                P${D}
              </option>`)}
        </select>
      </div>
    `}function b(k){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${C?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${kt}
            >
              ✎
            </button>`}
      </div>
      ${C?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${S}
              @input=${Ot}
              @keydown=${Y=>Pt(Y,Dt,$t,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Dt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${$t}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ie(k){let Y=typeof k.notes=="string"?k.notes:"";return Y.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${Y}</div>
    `}function se(k){let Y=Array.isArray(k.labels)?k.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${Y.map(D=>i`<span class="detail-label-chip"
              >${D}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${D}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+D}
                @click=${()=>Ie(D)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${N}
            @input=${gr}
            @keydown=${Zt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${st}
          >
            추가
          </button>
        </span>
      </div>
    `}function Me(){if(!u)return i``;let k=d||{},Y=String(k.id||u),D=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ee=tt(),lt=k.status||"open",ot=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",Ze=k.description||"",Xe={...k,metadata:{...k.metadata||{},...p}};return i`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>n()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Se}
            >
              ${Y}
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
          ${w(D,Ee)}
          ${qc(Xe)}
          ${Nc({metadata:Xe.metadata,workspace_values:Q(),catalog:Le(),execution_defaults:I(),expanded:q,presets:Te()?.presets||[],preset_id:m,preset_busy:$,skipped_orchestration_keys:E},{onToggle:Tt=>{q=Tt,ye()},onEdit:(Tt,Xt)=>{if(Tt==="impl_runtime"||Tt==="impl_model"||Tt==="impl_effort"){R(Tt,Xt??"");return}y(Tt,Xt??"")},onPresetSelect:Tt=>{m=Tt,E=[],ye()},onPresetApply:()=>{M()}})}
          ${Hc({md:Xe.metadata,catalog:oe,handlers:{onExecChange:y}})}
          ${_(lt,ot)} ${W(k)}
          ${b(Ze)}
          ${xc(He,mt,{expanded:_e,draft:ce,sending:we,error:ne})}
          ${ie(k)} ${se(k)} ${pt(k)}
          ${Rt(k)} ${f(k)}
          ${wc(k,A)}
          ${eu({expanded:ee,loading:me,error:Ke,data:ze},{onToggle:Ue})}
          ${Jc(Lt(),L,{total:Ee,expanded:_t})}
        </div>
      </div>
    `}function ye(){Ge(Me(),e)}return{load(k){k!==u&&(p={},m="",E=[],q=!1,K(),G(),Be(),be()),u=k,d=null,O(),le(),J!==k&&ve(k)},clear(){u=null,d=null,p={},m="",$=!1,E=[],q=!1,K(),G(),Be(),be(),it.close(),V.close(),Ge(i``,e)},destroy(){X&&(X(),X=null),pe&&(pe(),pe=null),v&&(v(),v=null),document.removeEventListener("keydown",T),it.destroy(),Pe.parentNode&&Pe.parentNode.removeChild(Pe),V.destroy(),Je.parentNode&&Je.parentNode.removeChild(Je),u=null,d=null,be(),m="",$=!1,E=[],G(),Be(),Ge(i``,e)}}}function ru(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,p="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=d||"An unrecoverable error occurred.");let m=typeof p=="string"?p.trim():"";if(s&&(m.length>0?(s.textContent=m,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function _o(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function os(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function mo(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,l=o.finished_at;typeof a!="number"||typeof l!="number"||!Number.isFinite(a)||!Number.isFinite(l)||l<a||(r+=l-a,n=!0)}return n?r:null}function go(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Sm(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:_o(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function nu(e,t){let r=Sm(e,t);return r?i`<button
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
            title=${r.deploy.at?jt(r.deploy.at):""}
            >${go(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${os(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Sn(e){let t=or(e.created_at),r=or(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${jt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${jt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Em(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function as(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ho(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function br(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,m)=>(p.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?Em(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:d}}function ss(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var Tm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function su(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function l(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Tm[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function bo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let r=t.pin===!0?" exec-chip--pin":"",n=t.pin===!0?`
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
      >`:""}`}function yo(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],n=Array.isArray(e.warnings)?e.warnings:[];return t.length===0&&r.length===0&&n.length===0?"":i`<div class="worker-deps">
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
  </div>`}function Cm(e){let t=Array.isArray(e.badges)?e.badges:[],r=Bt(e.usage),n=Zr(e.usage),s=or(e.done_at);return i`<div
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
            title=${`\uC644\uB8CC ${jt(e.done_at)}`}
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
              >`):n?i`<span class="worker-usage" title=${Bn(e.usage)}
              >${n}</span
            >`:""}
      ${typeof e.work_ms=="number"?i`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${os(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function En(e){if(e.lane==="done"&&e.done_layout==="three_line")return Cm(e);let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Bt(e.usage),s=Zr(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?or(e.done_at):"",u=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",p=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",m=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,E=i`<span class="worker-mini__title">${e.title}</span>`,q=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",U=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",oe=r.map(we=>we===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${we}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${we===e.completion_badge&&e.completion_title||""}
          >${we}</span
        >`),J=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",P=n.length>0?n.map(we=>i`<span class="worker-usage" title=${we.tooltip}
              >${we.label}</span
            >`):s?i`<span class="worker-usage" title=${Bn(e.usage)}
            >${s}</span
          >`:"",F=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",C=e.merge_action?i`<button
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
      </button>`:"",S=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",N=e.discard,K=N?.action||e.discard_action?i`<button
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
        </button>`:"",be=e.stale_work||null,re=be?i`${be.can_resume||be.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${be.action_id}
            ?disabled=${be.locked}
          >
            기존 작업 이어가기
          </button>`:""}${be.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${be.action_id}
            ?disabled=${be.locked}
          >
            백업 후 새로 시작
          </button>`:""}${be.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${be.action_id}
            ?disabled=${be.locked}
          >
            다시 확인
          </button>`:""}`:"",ve=be?i`<div class="worker-mini__stale">
        <strong>${be.title}</strong>
        <span>${be.summary}</span>
        <span>${be.cause}</span>
        ${be.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",He=e.revise_action?i`<button
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
        </button>`:"",We=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?i`<div class="worker-mini__exec">
          ${bo(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Fe=yo(e.dependency_chips),ne=ss(e),ce=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||N?.operation||e.revise_action||be);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${m}${$}${E}</div>
          <div class="worker-mini__row2">
            ${P}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${jt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${os(e.work_ms)}</span
                >`:""}${oe}${F}
            <span class="worker-mini__actions"
              >${C}${j}${S}${K}</span
            >
            ${Sn(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${d}${m}${$}${q}${U}${oe}${p}${J}
            </div>
            <div class="worker-mini__body">${E}${ve}</div>
            ${Fe}${We}${ce?i`<div class="worker-mini__foot">
                  ${P}${F}
                  <span class="worker-mini__actions"
                    >${C}${j}${S}${K}${He}${re}</span
                  >
                  ${ss(e)}
                </div>`:""}
            ${Sn(e)}`:i`<div class="worker-mini__line">
              ${u}${d}${m}${$}${E}${q}${U}${oe}${p}${J}${P}${F}${C}${j}${S}${K}
            </div>
            ${Fe}${We}${ne} ${Sn(e)}`}
  </div>`}function Pa(e,t=null,r={}){let n=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!n,o=s&&t&&t.bead_id===e.id,a=e.workflow,l=a&&a.chips||{},c=l.route||a&&a.route,u=l.route_source==="derived"||!!(a&&a.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=yo(e.dependency_chips);return i`<div
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
    ${a?_n(a,e.status):""}${m}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?i`<div class="worker-mini__exec">
          ${bo(e.exec_chips,{pin:r.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?i`<div class="worker-card__place-menu">
            ${t.lanes.map($=>i`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${$.id}
                  title="${$.label} 대기 맨 뒤에 추가"
                >
                  <span>${$.label}</span>
                  <span class="worker-card__place-count">${$.count}</span>
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
    ${Sn(e)}
  </div>`}function rr(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Pa(n,e.place_menu):En(n))}
          </div>`}
  </section>`}var ou={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},au={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function iu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ma(e){for(let t of iu(e))if(Object.hasOwn(ou,t))return ou[t];return null}function Na(e){let t=null;for(let r of iu(e))Object.hasOwn(au,r)&&(t=au[r]);return t}function vo(e){let t=Ma(e),r=Na(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function lu(e,t){let r=Ma(e)??Ma(t),n=Na(t)??Na(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var cu=160;function Rm(e){return e.length>cu?`${e.slice(0,cu)}\u2026`:e}function Im(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Rm(e.command)}</code>`:""}
  </div>`}function Lm(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Om(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function uu(e){let t=e.failure?vo(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${Im(e.failure.cause_detail)}
          ${Lm(e.failure.reason)}
          ${ss({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Dm(e){return e?i`${e.repo?i`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?i`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}function Pm(e,t,r){if(!e)return"";let n=e.workflow||null,s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,l=Array.isArray(e.legs)?e.legs:[],c=l.filter(p=>p&&p.state==="live"),u=l.filter(p=>p&&p.state!=="live"),d=yo(e.dependency_chips);return i`${n?_n(n,"in_progress"):""}
  ${o?i`<div class="rtile__activity${r?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?i`<span class="rtile__activity-age"
              >${or(a,t)}</span
            >`:""}
      </div>`:""}${c.length>0||u.length>0?i`<div class="rtile__legs">
        ${c.map(p=>i`<span class="rtile__leg rtile__leg--live"
              >⟳ ${p.label}</span
            >`)}${u.length>0?i`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(p=>p.label).join(", ")}`}
              >✓ ${u.length}</span
            >`:""}
      </div>`:""}${d}`}function qa(e,t,r=null,n={}){let s=e.failed===!0,o=!!e.paused,a=s?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):o?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Om(t-e.started_at):"\u2014",l=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,c=qn(e),u=Bt(e.usage),d=Zr(e.usage),p=e.conflict_resolution?o?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,$=e.landing,E=e.attempt_id&&e.attempt_id===r,q=n.monitor||null,U=Dm(q),oe=Pm(q,t,o),J=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${E?" rtile--sel":""}${o?" rtile--paused":""}${s?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${U}${c?i`<span class="rtile__resumed" title=${c}>↻</span>`:""}
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
            ${J}
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
            ${J}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${oe}${e.rollup?Fs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Yo}):""}
    ${$?i`<div class="rtile__landing">
          <span
            class="merge-step${$.failed?" merge-step--failed":""}"
            style=${`--progress: ${$.percent}%`}
            >${$.label}${$.index>0?i`<span class="merge-step__n"
                  >${$.index}/${$.total}</span
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
          ${bo(e.exec_chips)}
          ${u.length>0?u.map(P=>i`<span class="worker-usage" title=${P.tooltip}
                    >${P.label}</span
                  >`):d?i`<span
                  class="worker-usage"
                  title=${Bn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${Sn(e)} ${ss(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${s||o?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Fa(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>qa(s,t,r))}
  </div>`}function ja(e,t){return`${e}\0${t}`}function Ba(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function Ua(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Mm(e,t){return e==="internal"&&t===void 0}function Tn(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function du(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Tn(s)})`,location_label:Tn(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Ua(e,n),l=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:a,same_lane_ahead:!1,missing_internal:Mm(a,s)}}function pu(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let l of t)for(let c of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ja(l.root_dir,c.id);r.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])n.set(d.id,u)}for(let l of t)for(let c of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=ja(l.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,m=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],$=s.get(u);if($)for(let E of m){let q=n.get(E);q&&q!==u&&!$.includes(q)&&$.push(q)}}let o=(l,c)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===c)return!0;!p||u.has(p)||(u.add(p),d.push(...s.get(p)||[]))}return!1},a=new Map;for(let[l,c]of s){let u=[];for(let d of c){let p=r.get(d);o(d,l)&&p&&u.push(p)}u.length>0&&a.set(l,u)}return a}function fu(e){let t=Ba(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=Tn(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function _u(e,t){return ja(e,t)}var Wa=new Set(["unavailable","not_applicable"]);function Or(e,t){if(typeof e!="object"||e===null)return null;let r=e[t];return typeof r=="object"&&r!==null?r:null}function mu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Dr(e,t){return t===null?null:`${Lr[e]}: ${t.display} (${uo[t.source]})`}function za(e){return e.filter(t=>t!==null).join(`
`)}function wo(e){if(typeof e!="object"||e===null)return null;let t=Yr(e);if(t==="")return null;let r=(n,s)=>typeof s=="string"&&s.length>0?`${n}: ${s}`:null;return{text:t,title:za(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",r("runner",e.runner),r(Lr.orchestration_model,e.model),r(Lr.orchestration_effort,e.effort),r(Lr.orchestration_speed,e.speed)])}}function is(e,t){let r=Or(e,"orchestration_model");if(r===null||r.resolution==="unavailable")return null;let n=Or(e,"orchestration_effort"),s=Or(e,"orchestration_speed"),o=mu([Sr(t,r.value??""),r.display,n!==null&&n.value!==null?n.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:za(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Dr("orchestration_model",r),Dr("orchestration_effort",n),Dr("orchestration_speed",s)])}}function Nm(e,t){return e===null||e.value===null||Wa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function qm(e){return e===null||Wa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Fm(e){return e===null?null:e.value==="auto"?"auto":Wa.has(e.resolution)?null:e.display}function Cn(e,t){if(typeof e!="object"||e===null)return null;let r=Or(e,"impl_dispatch"),n=Or(e,"impl_runtime"),s=Or(e,"impl_model"),o=Or(e,"impl_effort"),a=Or(e,"impl_speed"),l=r!==null&&r.value==="main"?"\uBA54\uC778":mu([Nm(n,t??null),qm(s),Fm(o),a!==null&&a.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:za(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Dr("impl_dispatch",r),Dr("impl_runtime",n),Dr("impl_model",s),Dr("impl_effort",o),Dr("impl_speed",a)])}}var gu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],ls=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ko(e,t){let r=gu.find(s=>s.step===e);if(!r)return null;let n=gu.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function hu(e){let t=ls.findIndex(r=>r.step===e);return ls.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function en(e){let t=ls.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function jm(e){let t=ls.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:ls.length}}function $o(e){let t=jm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ga=new Set(["queued","running","retry_pending","repairing"]),bu=new Set(["failed","succeeded"]),Bm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},cs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Um={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:cs.base_containment,child_sweep:cs.child_sweep,branch_cleanup:cs.branch_cleanup,parent_close:cs.parent_close};function Wm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function zm(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Ga,...bu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Hm(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let l=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(c)}function Ha(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Bm[s];if(!o)return null;let a=ko(r,`${n} ${o}`);return a?{...a,active:Ga.has(s),failed:s==="failed"}:null}function Gm(e){return!e||typeof e!="object"?null:Um[e.step]||null}function us(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Gm(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),l=Wm(e.merge_sha)?e.merge_sha:null,c=!o&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(E=>E&&typeof E=="object"&&zm(E,t,l)).sort(Hm):[],u=a?c:[],d=u.find(E=>Ga.has(E.state));if(d)return Ha(d);if(s)return s.step==="repo_operations"&&c[0]?Ha(c[0],!0):null;let p=u.find(E=>bu.has(E.state)?E.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return Ha(p);if(n){let E=ko(n.step,n.label);return E?{...E,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?cs[e.cleanup_cursor]:null;if(!m)return null;let $=ko(m.step,m.label);return $?{...$,active:!0,failed:!1}:null}function xo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var yu=1,ds=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Va=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Rn={show_blocked:!0,spec:"all"},vu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},wu={running:3,paused:2,failed:1};function Vm(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Km(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let p=t.get(a.bead_id),m=typeof p=="number"&&p>0&&typeof a.finished_at=="number"&&p>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!m&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let p=wu[u.run_state],m=wu[l];if(p>m||p===m&&(u.started_at??0)>(c??0))continue}let d=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:ir(e,a.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!n.has(a.attempt_id)})}return o}function ku(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function At(e){return e&&typeof e=="object"?e:{}}function Ym(e,t,r){let n=At(t);if(Object.keys(n).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let l=m=>ar({pin:m,global:a,execution_defaults:s,runner_catalog:o,route:r}),c,u;try{c=l(n),u=l(null)}catch{return null}let d=$u(is(c,o),is(u,o)),p=$u(Cn(c,null),Cn(u,null));return d||p?{orchestration:d,worker:p}:null}function $u(e,t){return!e||t&&t.text===e.text?null:e}function Zm(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Xm(e,t){let r=t.get(e);return r?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Tn(r)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Qm(e,t,r){let n=new Map;for(let c of e)n.set(c,Array.from(r.get(c)||[]).filter(u=>e.includes(u)).length);let s=[],o=new Map,a=e.filter(c=>(n.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let l=[...a];for(;l.length>0;){let c=l.shift();s.push(c);let u=Array.from(t.get(c)||[]).filter(p=>e.includes(p)).sort(),d=(o.get(c)||0)+(u.length>1?1:0);for(let p of u){let m=(n.get(p)||0)-1;n.set(p,m);let $=o.get(p);o.set(p,$===void 0?d:Math.min($,d)),m===0&&l.push(p)}}return{order:s,indent:o,cycle:s.length!==e.length}}function Jm(e,t,r){let n=new Map,s=new Map,o=new Set,a=(u,d,p)=>{let m=u.get(d);m?m.add(p):u.set(d,new Set([p]))};for(let[u,d]of e)for(let p of d)p!==u&&(o.add(p),o.add(u),a(n,p,u),a(s,u,p));let l=new Set,c=[];for(let u of Array.from(o).sort()){if(l.has(u))continue;let d=[],p=[u];for(l.add(u);p.length>0;){let J=p.pop();d.push(J);for(let P of[...n.get(J)||[],...s.get(J)||[]])l.has(P)||(l.add(P),p.push(P))}if(d.length<2)continue;let m=d.map(J=>t.get(J));if(m.every(J=>!!J&&/^s[1-5]$/.test(J.lane||""))&&m.every(J=>J&&m[0]&&J.root_dir===m[0].root_dir&&J.lane===m[0].lane))continue;let{order:E,indent:q,cycle:U}=Qm(d.slice().sort(),n,s),oe=U?d.slice().sort():E;c.push({key:oe.join("\0"),cycle:U,nodes:oe.map(J=>{let P=t.get(J);return{id:J,workspace_name:P?P.workspace_name:"",root_dir:P?P.root_dir:"",location_label:P?Tn(P):eg(J,r),indent:U?0:q.get(J)||0}})})}return c}function eg(e,t){let r=Ua(e,t);return r==="internal"?"\uBBF8\uC801\uC7AC":r==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function xu(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ka(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a={...Rn,...r&&r.candidate_filter?r.candidate_filter:{}},l=r&&ds.some(x=>x.value===r.candidate_sort)?r.candidate_sort:"repo_spec",c=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&c.set(x.root_dir,x);let u=[],d=[],p=[],m=[],$=[],E=[],q=new Map,U=new Map,oe=new Map,J=new Map,P=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let _e=x.root_dir,G=x.name||_e,ae=c.get(_e),ke=ae&&typeof ae.revision=="number"?ae.revision:typeof x.revision=="number"?x.revision:0,Ne=At(x.attempts),$e=At(x.bead_titles),Ve=At(x.bead_times),mt=At(x.pr_observations),Pe=At(x.admission),it=At(x.revise_parked),Je=At(x.merge_queue_state),V=At(x.cleanup_failed),ee=At(x.discard_operations),me=At(x.bead_blocked_by),Ke=At(x.bead_workflow),ze=At(x.pr_activity),Ye=Array.isArray(x.repo_operations)?x.repo_operations:[],Qe=Array.isArray(x.merge_queue)?x.merge_queue:[],ht=new Set(Qe.filter(I=>I&&typeof I.bead_id=="string").map(I=>I.bead_id)),Be=new Map(Qe.filter(I=>I&&typeof I.bead_id=="string").map(I=>[I.bead_id,I])),Re=Array.isArray(x.queue)?x.queue:[],Ue=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).filter(I=>I&&/^s[1-5]$/.test(I.id)&&Array.isArray(I.entries)),Lt=At(x.lane_states),tt=typeof x.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(x.serial_lane_count))):Math.min(5,Ue.length);oe.set(_e,tt),J.set(_e,Re.length);let _t=new Map(Ue.map(I=>[I.id,I])),ut=new Map;for(let I of Ue)for(let H of I.entries)H&&typeof H.bead_id=="string"&&ut.set(H.bead_id,I.id);for(let[I,H]of Object.entries(me))Array.isArray(H)&&P.set(I,H.filter(Te=>typeof Te=="string"&&Te.length>0));let et=Array.isArray(x.done)?x.done:[];for(let I of et)I&&typeof I.bead_id=="string"&&E.push({id:I.bead_id,root_dir:_e,workspace_name:G});let rt=new Map;for(let I of et)I&&typeof I.bead_id=="string"&&typeof I.added_at=="number"&&rt.set(I.bead_id,I.added_at);let nt=I=>({id:I,title:$e[I]||I,root_dir:_e,workspace_name:G,expected_revision:ke,draggable:!1,...At(Ve[I]).created_at?{created_at:At(Ve[I]).created_at}:{},...At(Ve[I]).updated_at?{updated_at:At(Ve[I]).updated_at}:{}}),L=new Set;for(let[I,H]of Km(Ne,rt))L.add(I),d.push({...nt(I),lane:"running",...ut.has(I)?{serial_lane_id:ut.get(I)}:{},attempt_id:H.attempt_id,run_state:H.run_state,status:H.status||void 0,workflow:Ke[I]||null,can_pause:H.can_pause,can_resume:H.can_resume,started_at:H.started_at,last_event_at:H.last_event_at,last_activity:H.last_activity,legs:H.legs,runner:H.runner,model:H.model,effort:H.effort,speed:H.speed,resumed_from:H.resumed_from,continuation_mode:H.continuation_mode,usage:H.usage,exec_chips:{orchestration:wo(H),worker:null},discard:br(ee,I,{attempt_id:H.attempt_id}),badges:H.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:H.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:H.run_state==="failed"});for(let I of Array.isArray(x.pr_wait)?x.pr_wait:[]){let H=I&&I.bead_id;if(typeof H!="string"||L.has(H))continue;L.add(H);let Te=At(mt[H]),Oe=At(Te.pr),xe=Te.gate?At(Te.gate):null,M=ht.has(H),X=Be.get(H)?.continuation_action||null,pe=!!X&&X.continuation===null,v=Je.active===H,T=I.external===!0,O=V[H]||null,te=At(ze[H]),Se=us({bead_id:H,merge_sha:I.merge_sha,cleanup_cursor:I.cleanup_cursor,merge_progress:te.merge_progress||null,cleanup_failed:O,repo_operations:Ye}),Ae=xo(Se),g=!!xe&&xe.base_badge==="\uCDA9\uB3CC",y=!!O&&["child_sweep","branch_cleanup","parent_close"].includes(O.step)&&!!xe&&xe.tier==="merged",R=T&&!!O&&!!xe&&xe.tier==="merged",z=!!xe&&["closed_unmerged","review","undecidable"].includes(xe.tier),Z=br(ee,H,{external:T,merge_active:v||Se?.step==="merge",merge_queued:M,cleanup_active:Ae,merged:!!O||xe?.tier==="merged"}),ge=!!Z.operation;p.push({...nt(H),lane:"pr_wait",pr_number:typeof Oe.number=="number"?Oe.number:null,pr_url:typeof Oe.url=="string"?Oe.url:void 0,external:T,usage:ir(Ne,H),merge_step:Se,badges:pe?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Se?[xe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:O?[en(O.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${en(O.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof xe?.gate_badge=="string"&&xe.gate_badge.length>0?[xe.gate_badge]:[],alert:Se?Se.failed===!0:!!O||z,reason:O&&Se?.active!==!0?$o(O.step):"PR \uB300\uAE30",merge_action:xe?.tier==="merged"&&!y&&!R?!1:!M||pe,merge_enabled:!ge&&(pe||xe?.enabled===!0||g||y||R),merge_label:pe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":R||y?"\uC815\uB9AC \uC7AC\uAC1C":g&&!y?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:pe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ge?Z.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Z.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Z.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:R?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":g?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":xe?.enabled===!0?`\uBA38\uC9C0 (${xe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${xe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:M&&!pe,cancel_enabled:!v,continuation_mismatch:X?.mismatch||null,discard:Z,discard_action:Z.action,discard_enabled:Z.enabled,discard_title:Z.title})}let Q=(I,H,Te,Oe)=>{let xe=I&&I.bead_id;if(typeof xe!="string"||L.has(xe))return null;L.add(xe);let M=it[xe],X=br(ee,xe),pe=X.operation?X:null,v={...nt(xe),lane:H,draggable:!pe,discard:pe||void 0,reason:ku(Pe,xe),seq:Te+1,queue_position:Te+1,queue_index:Te,queue_length:Oe,badges:M?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!M,revise_action:!!M,revise_enabled:!!M&&!pe,revise_title:M?M.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${M.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(me,xe)&&(v.blocked_by=Array.isArray(me[xe])?me[xe].filter(T=>typeof T=="string"&&T.length>0):[]),v};for(let I=0;I<Re.length;I++){let H=Q(Re[I],"queue",I,Re.length);if(!H)continue;m.push(H);let Te=q.get(_e);Te?Te.push(H):q.set(_e,[H])}let le=[];for(let I=0;I<Math.max(tt,Ue.length);I++){let H=`s${I+1}`,Te=_t.get(H),Oe=Te&&Array.isArray(Te.entries)?Te.entries:[],xe=[];for(let pe=0;pe<Oe.length;pe++){let v=Q(Oe[pe],H,pe,Oe.length);v&&(xe.push(v),m.push(v))}let M=At(Lt[H]),X=Array.isArray(M.occupied_by)?M.occupied_by.filter(pe=>typeof pe=="string"):[];xe.length===0&&X.length===0&&(tt<=1||I>=tt)||le.push({id:H,index:I,items:xe,raw_length:Oe.length,occupied_by:X,corrections:Array.isArray(M.corrections)?M.corrections.length:0,cycle:M.cycle===!0,...xe.length===0&&X.length===0?{empty:!0}:{}})}U.set(_e,le);let Le=Array.from({length:tt},(I,H)=>{let Te=`s${H+1}`,Oe=_t.get(Te),xe=Oe&&Array.isArray(Oe.entries)?Oe.entries:[],M=At(Lt[Te]);return{id:Te,index:xe.length,length:xe.length,occupied_by:Array.isArray(M.occupied_by)?M.occupied_by.filter(X=>typeof X=="string"):[]}});for(let I of Array.isArray(x.runnable)?x.runnable:[]){let H=I&&I.bead_id;if(typeof H!="string"||L.has(H))continue;L.add(H);let Te=I.workflow&&typeof I.workflow=="object"?I.workflow:null,Oe=Te&&typeof Te.route=="string"&&Te.route||(typeof I.route=="string"?I.route:null),xe=Ym(At(ae),I.exec_pins,Oe);Array.isArray(I.blocked_by)&&I.blocked_by.length>0&&P.set(H,I.blocked_by.filter(M=>typeof M=="string"&&M.length>0)),u.push({...nt(H),title:I.title||$e[H]||H,lane:"runnable",draggable:!0,reason:ku(Pe,H),created_at:I.created_at??void 0,updated_at:I.updated_at??void 0,status:typeof I.status=="string"?I.status:void 0,labels:Array.isArray(I.labels)?I.labels:[],spec_id:typeof I.spec_id=="string"?I.spec_id:"",workflow:Te||(Oe?{route:Oe,chips:{route:Oe}}:null),...xe?{exec_chips:xe}:{},blocked:I.blocked===!0,...Array.isArray(I.blocked_by)?{blocked_by:I.blocked_by.filter(M=>typeof M=="string"&&M.length>0)}:{},place_index:Re.length,place_lanes:Le})}for(let I of et){let H=I&&I.bead_id;if(typeof H!="string"||L.has(H)||(L.add(H),o!==void 0&&typeof I.added_at=="number"&&I.added_at<o))continue;let Te=Vm(Ne,H),Oe=Te&&typeof Te.done_kind=="string"?Te.done_kind:null;$.push({...nt(H),lane:"done",done:!0,done_layout:"three_line",usage:ir(Ne,H),work_ms:mo(Ne,H),done_at:typeof I.added_at=="number"?I.added_at:void 0,done_kind:Oe,badges:Oe&&vu[Oe]?[vu[Oe]]:[]})}}let F=new Map;s.forEach((x,_e)=>{x&&typeof x.root_dir=="string"&&F.set(x.root_dir,_e)});let C=r&&r.running_sort==="repo"?"repo":"started";d.sort((x,_e)=>{if(C==="repo"){let ke=F.get(x.root_dir)??Number.MAX_SAFE_INTEGER,Ne=F.get(_e.root_dir)??Number.MAX_SAFE_INTEGER;if(ke!==Ne)return ke-Ne}let G=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,ae=typeof _e.started_at=="number"&&Number.isFinite(_e.started_at)?_e.started_at:null;return G!==null&&ae!==null&&G!==ae?G-ae:G===null&&ae!==null?1:G!==null&&ae===null?-1:x.id.localeCompare(_e.id)}),$.sort((x,_e)=>(_e.done_at??0)-(x.done_at??0));let j=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,runner_catalog:x&&x.runner_catalog})),S=new Set(u.map(x=>x.root_dir)),N=[];for(let x of j){if(!x||typeof x.root_dir!="string")continue;let _e=q.get(x.root_dir)||[],G=U.get(x.root_dir)||[];!(_e.length>0||G.some(ke=>ke.items.length>0||ke.occupied_by.length>0))&&!S.has(x.root_dir)||N.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=yu?x.slots:yu,revision:typeof x.revision=="number"?x.revision:0,runner_catalog:At(x.runner_catalog),items:_e,sublanes:{parallel:_e,serial:G},serial_lane_count:oe.get(x.root_dir)||0,raw_queue_length:J.get(x.root_dir)||0})}let K={runnable:u,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:m,queue_groups:N,running:d,pr_wait:p,done:$,chains:[]},be=Ba(K);for(let x of E)be.has(x.id)||be.set(x.id,{root_dir:x.root_dir,workspace_name:x.workspace_name,lane:"done",state:"done"});let re=new Map;for(let[x,_e]of P)for(let G of _e){let ae=re.get(G);ae?ae.includes(x)||ae.push(x):re.set(G,[x])}for(let x of[...K.queue,...K.runnable]){if(!Object.hasOwn(x,"blocked_by"))continue;let _e=be.get(x.id);x.blockers=(x.blocked_by||[]).map(G=>du(G,_e,be,s)),x.blocker_warnings=x.blockers.filter(G=>G.missing_internal).map(G=>`\u26A0 \uC120\uD589 ${G.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),x.blocker_warnings.length>0&&(x.alert=!0)}for(let x of[...K.queue,...K.runnable,...K.running,...K.pr_wait]){let _e=x.lane==="running"||x.lane==="pr_wait"?[]:(x.blockers||[]).map(Zm),G=[];for(let Ne of re.get(x.id)||[]){let $e=Xm(Ne,be);$e&&G.push($e)}let ae=x.lane==="running"||x.lane==="pr_wait"?[]:x.blocker_warnings||[];if(_e.length===0&&G.length===0&&ae.length===0)continue;let ke={predecessors:_e,successors:G,warnings:ae};x.dependency_chips=ke}K.chains=Jm(P,be,s);let ve=pu(K.queue_groups);for(let x of K.queue_groups)for(let _e of x.sublanes.serial){let G=ve.get(_u(x.root_dir,_e.id));G&&(_e.cross_wait_peers=G)}let He=K.runnable.length,We=K.runnable;a.show_blocked||(We=We.filter(x=>x.blocked!==!0));let Fe=We.length;a.spec==="with"?We=We.filter(x=>!!x.spec_id):a.spec==="without"&&(We=We.filter(x=>!x.spec_id)),K.runnable_hidden={blocked:He-Fe,spec:Fe-We.length};let ne=(x,_e)=>{let G=xu(_e.updated_at)-xu(x.updated_at);return G!==0?G:x.id.localeCompare(_e.id)},we=l==="repo_spec"?(x,_e)=>{let G=x.spec_id?0:1,ae=_e.spec_id?0:1;return G!==ae?G-ae:ne(x,_e)}:ne;if(l==="updated_flat")K.runnable=We.slice().sort(ne),K.runnable_sections=[];else{let x=new Map;for(let ae of We){let ke=x.get(ae.root_dir);ke?ke.push(ae):x.set(ae.root_dir,[ae])}let _e=[],G=[];for(let ae of j){if(!ae||typeof ae.root_dir!="string")continue;let ke=(x.get(ae.root_dir)||[]).slice().sort(we);x.delete(ae.root_dir),ke.length!==0&&(_e.push({root_dir:ae.root_dir,name:ae.name||ae.root_dir,items:ke.map(Ne=>({...Ne,workspace_name:""}))}),G.push(...ke))}for(let[ae,ke]of x){let Ne=ke.slice().sort(we);_e.push({root_dir:ae,name:Ne[0]?.workspace_name||ae,items:Ne.map($e=>({...$e,workspace_name:""}))}),G.push(...Ne)}K.runnable=G,K.runnable_sections=_e}return K}var Eu="bdui.monitor.done-range",Tu="bdui.monitor.running_sort",Cu="bdui.monitor.candidate_sort",Ru="beads-ui.monitor.candidate-filter",Iu="beads-ui.monitor.sections";function tg(){try{let e=window.localStorage.getItem(Ru);if(!e)return{...Rn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Rn}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Rn.show_blocked,spec:Va.some(r=>r.value===t.spec)?t.spec:"all"}}catch{return{...Rn}}}function Au(e){try{window.localStorage.setItem(Ru,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function rg(){try{let e=window.localStorage.getItem(Cu);return ds.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function ng(e){try{window.localStorage.setItem(Cu,e)}catch{}}function sg(){try{let e=window.localStorage.getItem(Iu);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Su(e){try{window.localStorage.setItem(Iu,JSON.stringify(e))}catch{}}function og(){try{let e=window.localStorage.getItem(Eu);return sr(e)?e:Qt}catch{return Qt}}function ag(e){try{window.localStorage.setItem(Eu,e)}catch{}}function ig(){try{return window.localStorage.getItem(Tu)==="repo"?"repo":"started"}catch{return"started"}}function lg(e){try{window.localStorage.setItem(Tu,e)}catch{}}var Lu="tab:monitor:pipeline",cg=1e3,ug=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function dg(){return i`<span class="mon-link mon-popover-owner">
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
  </span>`}function Ou(e,t){let r=xt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.router,u=t.now||(()=>Date.now()),d=t.confirm||(g=>typeof globalThis.confirm!="function"||globalThis.confirm(g)),p=og(),m=ig(),$=tg(),E=rg(),q=sg(),U=null,oe=null;function J(){let g=Er.find(y=>y.value===p);return g?g.label:""}let P=document.createElement("div");P.className="mon",e.appendChild(P);let F=document.createElement("div");F.className="mon2-drawer",e.appendChild(F);let C=Ka(null,null),j=new Map,S=new Map,N=null,K=null,be=$n(F,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{U=null,me()}});async function re(g,y,R,z,Z=!0){if(!o||!R)return null;let ge=await o(g,{...y,root_dir:R,expected_revision:z});if(ge&&ge.conflict&&Z){ge.queue&&S.set(R,ge.queue);let De=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:z;ge=await o(g,{...y,root_dir:R,expected_revision:De})}return ge&&ge.queue&&R&&S.set(R,ge.queue),ge}function ve(g,y){let R=S.get(g),z=s&&s.get?s.get():null,Z=(Array.isArray(z)?z:[]).find(De=>De?.root_dir===g);return(R||Z)?.merge_queue?.find(De=>De.bead_id===y)?.continuation_action}async function He(g,y,R,z){let Z=await re(g,y,R,z),ge=S.get(R)?.revision??Z?.queue?.revision??z;return vr(Z,(De,ue)=>re(g,{...y,continuation:De,decision_token:ue},R,ge,!1),{refresh:De=>re(g,y,R,De?.queue?.revision??S.get(R)?.revision??ge,!1)})}async function We(g,y,R,z){let Z=await vr({continuation_mismatch:z},(De,ue)=>re("worker-merge-queue-add",{bead_id:y,continuation:De,decision_token:ue},g,R,!1)),ge=Z?.queue?.merge_queue?.find(De=>De.bead_id===y)?.continuation_action;Z?.applied!==!0&&ge?.continuation===null&&ge.mismatch&&await We(g,y,Z.queue.revision,ge.mismatch)}async function Fe(g,y,R){let z=await re("worker-discard",g,y,R);if(z&&z.discarded===!0){he(ho(z),"success",5e3);return}if(z&&z.reason){he(`\uD3D0\uAE30 \uC2E4\uD328: ${z.reason}`,"error");return}if(z&&z.accepted&&z.pending==="merged_revert"){he("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(z&&z.accepted){he(`\uD3D0\uAE30 \uC9C4\uD589: ${z.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}z&&!z.conflict&&he("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ne(g,y,R){return!o||!R?null:await o(g,{...y,root_dir:R})}async function ce(){let g=new Map;for(let y of C.pr_wait)g.has(y.root_dir)||g.set(y.root_dir,y.expected_revision);for(let[y,R]of g)await re("worker-merge-queue-add-all",{},y,R)}function we(g,y){let R=q[g];return!!(R&&R[y]===!0)}function x(g,y){let R={...q[g]||{}};R[y]=!R[y],q={...q,[g]:R},Su(q),me()}function _e(g){let y=we(g.root_dir,g.section);return i`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${g.root_dir}
        data-section=${g.section}
        aria-expanded=${y?"false":"true"}
        aria-label=${`${g.name} \uC139\uC158 ${y?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${y?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${g.root_dir}>${g.name}</span>
      <span class="mon2-sec__count">${g.count}</span>
      ${typeof g.auto=="boolean"?i`<span
            class="mon2-sec__auto${g.auto?" is-on":""}"
            title=${g.auto?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C"}
            >${g.auto?"\u25CF \uC790\uB3D9":"\u25CB \uC218\uB3D9"}</span
          >`:""}
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${g.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function G(g,y){return i`<div class="mon2-item" data-bead-id=${g.id}>
      ${y}
      <span class="mon2-item__ops">${dg()}</span>
    </div>`}function ae(g){return oe!==g.id?null:{bead_id:g.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:g.place_index??0},...(g.place_lanes||[]).map(y=>({id:y.id,label:y.id,count:y.length}))]}}function ke(g){return G(g,Pa(g,ae(g),{exec_chips_mode:"pinned_only"}))}function Ne(g){return G(g,En(g))}function $e(){return C.runnable_flat?i`<div class="mon2-flat">
        ${C.runnable.map(g=>ke(g))}
      </div>`:i`${C.runnable_sections.map(g=>{let y=we(g.root_dir,"runnable");return i`<section
        class="mon2-sec${y?" is-collapsed":""}"
        data-root-dir=${g.root_dir}
        data-section="runnable"
      >
        ${_e({root_dir:g.root_dir,name:g.name,count:g.items.length,section:"runnable"})}
        ${y?"":i`<div class="mon2-sec__body" data-lane="candidate">
              ${g.items.map(R=>ke(R))}
            </div>`}
      </section>`})}`}function Ve(g){return i`<div
      class="mon2-lane${g.empty?" mon2-lane--empty":""}"
      data-lane-length=${String(g.raw_length)}
    >
      ${rr({id:"",lane:g.id,title:`\uC9C1\uB82C ${g.index+1}`,items:g.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:g.items.length>0?i`${g.items.map(y=>Ne(y))}`:void 0,header_control:i`<span class="mon2-lane__badge"
          >${g.occupied_by.length>0?"\uC810\uC720":""}</span
        >`})}
      ${g.empty?i`<div class="mon2-lane__hint">
            직렬 ${g.index+1} 비어 있음
          </div>`:""}
      ${g.cycle?i`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(g.cross_wait_peers||[]).map(y=>i`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${y.workspace_name}·${y.lane}과 교차 대기
          </div>`)}
    </div>`}function mt(g){let y=we(g.root_dir,"queue"),R=g.sublanes.parallel.length+g.sublanes.serial.reduce((z,Z)=>z+Z.items.length,0);return i`<section
      class="mon2-sec${y?" is-collapsed":""}"
      data-root-dir=${g.root_dir}
      data-section="queue"
    >
      ${_e({root_dir:g.root_dir,name:g.name,count:R,section:"queue",auto:g.auto_advance})}
      ${y?"":i`<div class="mon2-sec__body worker-wait">
            <div
              class="mon2-lane"
              data-lane-length=${String(g.raw_queue_length)}
            >
              ${rr({id:"",lane:"queue",title:"\uBCD1\uB82C",items:g.sublanes.parallel,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:g.sublanes.parallel.length>0?i`${g.sublanes.parallel.map(z=>Ne(z))}`:void 0})}
            </div>
            ${g.sublanes.serial.map(z=>Ve(z))}
          </div>`}
    </section>`}function Pe(){if(C.chains.length===0)return"";let g=q.chains===!0;return i`<section class="mon2-chains${g?" is-collapsed":""}">
      <header class="mon2-chains__hd">
        <button
          type="button"
          class="mon2-chains__toggle"
          aria-expanded=${g?"false":"true"}
          title="blocks 의존이 만든 레포 간 순서입니다 — 선행이 close되면 후속이 자기 레포 큐에서 출발합니다"
        >
          ${g?"\u25B8":"\u25BE"} 🔗 연결 체인 ${C.chains.length} · 레포 간
          순서
        </button>
        <span class="mon2-chains__hint">blocks 의존 · 카드의 🔗로 연결</span>
      </header>
      ${g?"":i`<div class="mon2-chains__body">
            ${C.chains.map(y=>i`<div class="mon2-chain">
                  ${y.cycle?i`<div class="mon2-chain__cycle">⛔ 의존 사이클</div>`:""}
                  ${y.nodes.map(R=>i`<div
                        class="mon2-chain__node"
                        style=${`--indent: ${R.indent}`}
                        data-bead-id=${R.id}
                        data-root-dir=${R.root_dir}
                      >
                        ${R.workspace_name?i`<span class="mon2-chain__repo"
                              >${R.workspace_name}</span
                            >`:""}
                        <span class="mon2-chain__id worker-mini__id"
                          >${R.id}</span
                        >
                        <span class="mon2-chain__where"
                          >${R.location_label}</span
                        >
                      </div>`)}
                </div>`)}
          </div>`}
    </section>`}function it(g){return i`<div class="worker-rungrid">
      ${C.running.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:C.running.map(y=>qa({bead_id:y.id,attempt_id:y.attempt_id||"",title:y.title,runner:y.runner??null,model:y.model??null,effort:y.effort??null,speed:y.speed??null,started_at:y.started_at??null,resumed_from:y.resumed_from??null,continuation_mode:y.continuation_mode??null,paused:y.run_state==="paused",failed:y.run_state==="failed",status:y.status,status_label:y.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:y.can_resume!==!1,can_pause:y.can_pause!==!1,exec_chips:y.exec_chips||null,usage:y.usage||null,discard:y.discard},g,U,{monitor:{repo:y.workspace_name,root_dir:y.root_dir,serial_lane_id:y.serial_lane_id,workflow:y.workflow||null,last_activity:y.last_activity||null,legs:y.legs||[],dependency_chips:y.dependency_chips||null}}))}
    </div>`}function Je(g){let y={runnable:C.runnable,queue:C.queue,running:C.running,pr_wait:C.pr_wait,done:C.done};return i`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${ug.map(R=>{let z=y[R.lane],Z=R.lane==="runnable"?C.runnable_flat?z.length>0?$e():void 0:C.runnable_sections.length>0?$e():void 0:R.lane==="queue"?C.queue_groups.length>0||C.chains.length>0?i`${Pe()}${C.queue_groups.map(ge=>mt(ge))}`:void 0:R.lane==="running"?it(g):z.length>0?i`${z.map(ge=>En(ge))}`:void 0;return rr({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${J()}`:R.title,items:z,empty:R.empty,body:Z,live:R.lane==="running"&&z.length>0,controls:R.lane==="runnable"?V():void 0,header_control:ee(R.lane,z.length)})})}
      </div>`}function V(){return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒
        blocked${C.runnable_hidden.blocked>0?` ${C.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Va.map(g=>i`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${$.spec===g.value?" is-active":""}"
              data-spec=${g.value}
              aria-pressed=${$.spec===g.value?"true":"false"}
            >
              ${g.label}
            </button>`)}
        ${C.runnable_hidden.spec>0?i`<span class="worker-filter__hidden"
              >숨김 ${C.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function ee(g,y){return g==="runnable"?i`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${E}
      >
        ${ds.map(R=>i`<option
              value=${R.value}
              ?selected=${E===R.value}
            >
              ${R.label}
            </option>`)}
      </select>`:g==="running"?i`<select
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
      </select>`:g==="pr_wait"&&y>0?i`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:g==="done"?i`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${p}
      >
        ${Er.map(R=>i`<option value=${R.value} ?selected=${p===R.value}>
              ${R.label}
            </option>`)}
      </select>`:""}function me(){let g=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=u();C=Ka(g,y,{done_since:zr(p,R),running_sort:m,candidate_filter:$,candidate_sort:E}),j=new Map;for(let z of[...C.runnable,...C.queue,...C.running,...C.pr_wait,...C.done])j.has(z.id)||j.set(z.id,z);Ge(Je(R),P)}function Ke(g,y){let R=a?a():void 0;if(!y||!R||y===R||!l){n(g);return}l(y).then(()=>{n(g)}).catch(z=>{r("workspace switch for %s failed: %o",y,z)})}function ze(g){if(!g)return;let y=a?a():void 0,R=()=>{try{c?.gotoView("worker")}catch(z){r("gotoView(worker) failed: %o",z)}};if(!l||y&&y===g){R();return}l(g).then(R).catch(z=>{r("workspace switch for %s failed: %o",g,z),he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Ye(g){Jt(g).then(y=>{he(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)})}function Qe(g){let y=j.get(g)||null;return{item:y,root_dir:y?y.root_dir:"",revision:y?y.expected_revision:0}}function ht(g){if(typeof g=="string"&&g.length>0)return g;if(g&&typeof g=="object"){let y=g;if(typeof y.message=="string"&&y.message.length>0)return y.message;if(typeof y.error=="string"&&y.error.length>0)return y.error;if(y.error&&typeof y.error=="object"&&typeof y.error.message=="string")return y.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Be(g,y){let R=g.querySelector(".mon-link__trigger"),z=g.querySelector(".mon-link__popover"),Z=g.querySelector(".mon-link__error");!R||!z||!Z||(tt(),z.hidden=!1,R.setAttribute("aria-expanded","true"),Z.textContent=y,Z.hidden=!1)}async function Re(g,y,R,z){let{root_dir:Z}=Qe(R);if(!(!R||!z||z===R))try{await ne(g,{a:R,b:z},Z),tt()}catch(ge){Be(y,ht(ge))}}function Ue(g){g.querySelector(".mon-link__list")?.replaceChildren();let y=g.querySelector(".mon-link__search");y&&(y.value="");let R=g.querySelector(".mon-link__direct");R&&(R.hidden=!0,R.dataset.targetId="",R.textContent="");let z=g.querySelector(".mon-link__empty");z&&(z.hidden=!0);let Z=g.querySelector(".mon-link__error");Z&&(Z.hidden=!0,Z.textContent="")}function Lt(g,y){let R=g.querySelector(".mon-link__list");if(!R)return;let z=document.createDocumentFragment(),Z=fu(C).filter(ge=>ge.id!==y);for(let ge of Z){let De=document.createElement("button");De.type="button",De.className="mon-link__candidate",De.dataset.targetId=ge.id,De.dataset.search=`${ge.id} ${ge.title} ${ge.location}`.toLocaleLowerCase();let ue=document.createElement("strong");ue.textContent=ge.id;let dt=document.createElement("span");dt.textContent=ge.title;let kt=document.createElement("small");kt.textContent=ge.location,De.append(ue,dt,kt),z.append(De)}R.replaceChildren(z)}function tt(){for(let g of Array.from(P.querySelectorAll(".mon-card-popover"))){let y=g;y.hidden=!0,y.classList.contains("mon-link__popover")&&Ue(y)}for(let g of Array.from(P.querySelectorAll('[aria-haspopup][aria-expanded="true"]')))g.setAttribute("aria-expanded","false")}function _t(g){let R=g.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!R)return;let z=R.hidden;if(tt(),z){let Z=g.closest(".mon2-item");Lt(R,Z?.getAttribute("data-bead-id")||""),R.hidden=!1,g.setAttribute("aria-expanded","true");let ge=R.querySelector(".mon-link__search");ge&&(ut(ge),ge.focus())}}function ut(g){let y=g.closest(".mon-link__popover"),R=g.closest(".mon2-item");if(!y||!R)return;let z=g.value.trim(),Z=z.toLocaleLowerCase(),ge=0,De=!1;for(let $t of Array.from(y.querySelectorAll(".mon-link__candidate"))){let Dt=$t,Pt=Dt.dataset.targetId||"",Yt=Z.length===0||(Dt.dataset.search||"").includes(Z);Dt.hidden=!Yt,Yt&&(ge+=1),Pt.toLocaleLowerCase()===Z&&(De=!0)}let ue=y.querySelector(".mon-link__direct"),dt=R.getAttribute("data-bead-id")||"";if(ue){let $t=z.length>0&&!De&&Z!==dt.toLocaleLowerCase();ue.hidden=!$t,ue.dataset.targetId=$t?z:"",ue.textContent=$t?`\uC9C1\uC811 \uC785\uB825 \xB7 ${z}`:"",$t&&(ge+=1)}let kt=y.querySelector(".mon-link__empty");kt&&(kt.hidden=ge>0);let Ot=y.querySelector(".mon-link__error");Ot&&(Ot.hidden=!0,Ot.textContent="")}let et=null,rt=!1,nt=null;function L(){nt!==null&&clearTimeout(nt),nt=setTimeout(()=>{nt=null,rt=!1},0)}function Q(g){let y=g.target;return typeof y?.closest=="function"?y.closest(".worker-pane, .mon2-sec__body"):null}function le(g){let y=Q(g);if(!y||!et)return null;let z=y.closest(".mon2-sec")?.getAttribute("data-root-dir")||"";if(z!==et.root_dir)return null;let Z=y.getAttribute("data-lane")||"";if(Z!=="candidate"&&Z!=="queue"&&!/^s[1-5]$/.test(Z))return null;let ge=y.closest(".mon2-lane");return{pane:y,lane:Z,root_dir:z,lane_length:Number(ge?.getAttribute("data-lane-length")||0)||0}}function Le(){for(let g of Array.from(P.querySelectorAll(".worker-pane--drag-over")))g.classList.remove("worker-pane--drag-over")}function I(g){let y=g.target,R=typeof y?.closest=="function"?y.closest('.worker-mini[draggable="true"], .worker-card[draggable="true"]'):null;if(!R)return;let z=R.getAttribute("data-bead-id")||"",{item:Z}=Qe(z);if(Z){et={bead_id:z,lane:Z.lane,root_dir:Z.root_dir,revision:Z.expected_revision,queue_index:typeof Z.queue_index=="number"?Z.queue_index:-1,place_index:typeof Z.place_index=="number"?Z.place_index:0},rt=!0,oe=null,P.classList.add("is-dragging");try{g.dataTransfer?.setData("text/plain",z),g.dataTransfer&&(g.dataTransfer.effectAllowed="move")}catch{}}}function H(g){let y=le(g);y&&(g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect="move"),y.pane.classList.add("worker-pane--drag-over"))}function Te(g){Q(g)?.classList.remove("worker-pane--drag-over")}function Oe(){et=null,Le(),P.classList.remove("is-dragging"),L()}function xe(g){let y=le(g),R=et;if(et=null,Le(),P.classList.remove("is-dragging"),!y||!R||!R.bead_id)return;g.preventDefault();let z=g.target,Z=typeof z?.closest=="function"?z.closest(".mon2-item"):null,ge=Z&&y.pane.contains(Z)&&Z.getAttribute("data-bead-id")||"",De=ge?j.get(ge):void 0,ue=De&&typeof De.queue_index=="number"?De.queue_index:NaN;if(y.lane==="candidate"){(R.lane==="queue"||/^s[1-5]$/.test(R.lane))&&re("worker-queue-remove",{bead_id:R.bead_id},R.root_dir,R.revision);return}let dt=y.lane==="queue"?"parallel":y.lane;if(R.lane==="runnable"){let Dt=Number.isFinite(ue)?ue:y.lane_length;re("worker-queue-place",{bead_id:R.bead_id,...dt==="parallel"?{}:{lane:dt},index:Dt},R.root_dir,R.revision);return}if((R.lane==="queue"?"parallel":R.lane)!==dt){let Dt=Number.isFinite(ue)?ue:y.lane_length;re("worker-queue-place",{bead_id:R.bead_id,...dt==="parallel"?{}:{lane:dt},index:Dt},R.root_dir,R.revision);return}if(ge===R.bead_id)return;let Ot=R.queue_index,$t=Number.isFinite(ue)?Ot>ue?ue:ue-1:y.lane_length-1;!Number.isFinite($t)||$t<0||$t===Ot||re("worker-queue-reorder",{bead_id:R.bead_id,...dt==="parallel"?{}:{lane:dt},to_index:$t},R.root_dir,R.revision)}function M(g){return{runner:g.runner||void 0,model:g.model||void 0,effort:g.effort||void 0,status:g.run_state==="running"?"running":g.run_state,worktree:g.root_dir}}function X(g,y){let{item:R,root_dir:z,revision:Z}=Qe(y),ge=R?.attempt_id||"",De=g.classList;if(De.contains("mon-link__trigger")){_t(g);return}if(De.contains("mon-link__candidate")||De.contains("mon-link__direct")){let ue=g.closest(".mon2-item");ue&&Re("dep-add",ue,y,g.dataset.targetId||"");return}if(De.contains("worker-dep__remove")){let ue=g.closest(".mon2-item");ue&&Re("dep-remove",ue,y,g.dataset.blockerId||"");return}if(De.contains("worker-card__place")){oe=oe===y?null:y,me();return}if(De.contains("worker-card__place-cancel")){oe=null,me();return}if(De.contains("worker-card__place-lane")){let ue=g.getAttribute("data-lane")||"parallel",dt=ue==="parallel"?R?.place_index??0:(R?.place_lanes||[]).find(kt=>kt.id===ue)?.index??0;oe=null,re("worker-queue-place",{bead_id:y,...ue==="parallel"?{}:{lane:ue},index:dt},z,Z),me();return}if(De.contains("rtile__session")){U=ge,ge&&R&&be.open({attempt_id:ge,root_dir:z,meta:M(R)}),me();return}if(De.contains("rtile__pause")){ne("worker-attempt-pause",{attempt_id:ge},z);return}if(De.contains("rtile__resume")){bn().then(ue=>{if(ue!==null)return He("worker-attempt-resume",{attempt_id:ge,...ue!==""?{instructions:ue}:{}},z,Z)});return}if(De.contains("rtile__dismiss")){re("worker-attempt-dismiss",{attempt_id:ge},z,Z);return}if(De.contains("rtile__discard")){if(!d(as(y,"unmerged")))return;Fe({bead_id:y,...ge?{attempt_id:ge}:{},...g.dataset.operationId?{operation_id:g.dataset.operationId}:{}},z,Z);return}if(De.contains("worker-mini__merge")){let ue=ve(z,y);ue?.mismatch&&ue.continuation===null?We(z,y,Z,ue.mismatch):re("worker-merge-queue-add",{bead_id:y},z,Z);return}if(De.contains("worker-mini__merge-cancel")){re("worker-merge-queue-remove",{bead_id:y},z,Z);return}if(De.contains("worker-mini__discard")){let ue=g.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(as(y,ue)))return;Fe({bead_id:y,...g.dataset.attemptId?{attempt_id:g.dataset.attemptId}:{},...g.dataset.operationId?{operation_id:g.dataset.operationId}:{}},z,Z);return}if(De.contains("worker-mini__revise-fix")){He("worker-revise-fix",{bead_id:y},z,Z);return}De.contains("worker-mini__revise-approve")&&re("worker-revise-approve",{bead_id:y},z,Z)}function pe(g){let y=rt;rt=!1;let R=g.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest(".mon2-drawer")||R.closest("a"))return;let z=R.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(z){g.preventDefault();let Dt=R.closest(".mon2-item, .rtile, .mon2-chain__node, .worker-mini")?.getAttribute("data-bead-id")||z.textContent?.trim()||"";Dt&&Ye(Dt);return}let Z=R.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(Z){g.preventDefault();let $t=Z.getAttribute("data-root-dir")||j.get(R.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||Z.getAttribute("title")||"";ze($t);return}let ge=R.closest(".mon2-sec__toggle");if(ge){g.preventDefault(),x(ge.getAttribute("data-root-dir")||"",ge.getAttribute("data-section")||"runnable");return}if(R.closest(".mon2-chains__toggle")){g.preventDefault(),q={...q,chains:q.chains!==!0},Su(q),me();return}let De=R.closest(".mon2-chain__node");if(De){g.preventDefault(),Ke(De.getAttribute("data-bead-id")||"",De.getAttribute("data-root-dir")||"");return}if(R.closest(".mon-merge-all")){g.preventDefault(),ce();return}let ue=R.closest(".mon-filter__spec");if(ue){g.preventDefault(),$={...$,spec:ue.getAttribute("data-spec")||"all"},Au($),me();return}let dt=R.closest(".mon2-item, .rtile, .worker-mini, .worker-card");if(!dt)return;let kt=dt.getAttribute("data-bead-id")||"",Ot=R.closest("button");if(Ot){g.preventDefault(),X(Ot,kt);return}kt&&!y&&(g.preventDefault(),Ke(kt,Qe(kt).root_dir))}function v(g){let y=g.target;y&&P.contains(y)&&typeof y.closest=="function"&&y.closest(".mon-popover-owner")||tt()}function T(g){if(g.key!=="Escape")return;let y=P.querySelector('[aria-haspopup][aria-expanded="true"]');tt(),y?.focus()}function O(g){let y=g.target;if(!y||typeof y.closest!="function")return;let R=y.closest(".mon-filter__blocked");if(R){$={...$,show_blocked:R.checked},Au($),me();return}let z=y.closest(".mon-candidate-sort");if(z){E=ds.some(De=>De.value===z.value)?z.value:"repo_spec",ng(E),me();return}let Z=y.closest(".mon-running-sort");if(Z){m=Z.value==="repo"?"repo":"started",lg(m),me();return}let ge=y.closest(".mon-done-range");ge&&(p=sr(ge.value)?ge.value:Qt,ag(p),me())}function te(g){let y=g.target;y?.classList.contains("mon-link__search")&&ut(y)}e.addEventListener("click",pe),e.addEventListener("change",O),e.addEventListener("input",te),e.addEventListener("dragstart",I),e.addEventListener("dragover",H),e.addEventListener("dragleave",Te),e.addEventListener("drop",xe),e.addEventListener("dragend",Oe),document.addEventListener("click",v),document.addEventListener("keydown",T),s&&typeof s.subscribe=="function"&&(N=s.subscribe(()=>{try{S.clear(),me()}catch{}}));function Se(){K!==null&&(clearInterval(K),K=null)}function Ae(){nt!==null&&(clearTimeout(nt),nt=null)}return{load(){r("load"),me(),K===null&&(K=setInterval(()=>{try{if(P.querySelector(".mon-card-popover:not([hidden])"))return;me()}catch{}},cg))},pause(){Se()},clear(){Se(),Ae(),N&&(N(),N=null),be.destroy(),e.removeEventListener("click",pe),e.removeEventListener("change",O),e.removeEventListener("input",te),e.removeEventListener("dragstart",I),e.removeEventListener("dragover",H),e.removeEventListener("dragleave",Te),e.removeEventListener("drop",xe),e.removeEventListener("dragend",Oe),document.removeEventListener("click",v),document.removeEventListener("keydown",T),e.replaceChildren()}}}function Du(e,t,r){let n=xt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function l(m){return $=>{$.preventDefault(),n("click tab %s",m),r.gotoView(m)}}function c(){let m=t.getState();return m.view==="worker"||m.view==="monitor"?m.view:"board"}function u(){let m=c();return i`
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
    `}function p(){s&&Ge(u(),s),o&&Ge(d(),o)}return p(),a=t.subscribe(()=>p()),{destroy(){a&&(a(),a=null),s&&Ge(i``,s),o&&Ge(i``,o)}}}var Pu=["bug","feature","task","epic","chore"];function Mu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Nu=["Critical","High","Medium","Low","Backlog"];function qu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),d=r.querySelector("#btn-cancel"),p=r.querySelector("#btn-create"),m=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let C=document.createElement("option");C.value="",C.textContent="\u2014 Select \u2014",o.appendChild(C);for(let j of Pu){let S=document.createElement("option");S.value=j,S.textContent=Mu(j),o.appendChild(S)}a.replaceChildren();for(let j=0;j<=4;j+=1){let S=document.createElement("option");S.value=String(j);let N=Nu[j]||"Medium";S.textContent=`${j} \u2013 ${N}`,a.appendChild(S)}}$();function E(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function q(C){s.disabled=C,o.disabled=C,a.disabled=C,l.disabled=C,c.disabled=C,d.disabled=C,p.disabled=C,p.textContent=C?"Creating\u2026":"Create"}function U(){u.textContent=""}function oe(C){u.textContent=C}function J(){try{let C=window.localStorage.getItem("beads-ui.new.type");C?o.value=C:o.value="";let j=window.localStorage.getItem("beads-ui.new.priority");j&&/^\d$/.test(j)?a.value=j:a.value="2"}catch{o.value="",a.value="2"}}function P(){let C=o.value||"",j=a.value||"";C.length>0&&window.localStorage.setItem("beads-ui.new.type",C),j.length>0&&window.localStorage.setItem("beads-ui.new.priority",j)}async function F(){U();let C=String(s.value||"").trim();if(C.length===0){oe("Title is required"),s.focus();return}let j=Number(a.value||"2");if(!(j>=0&&j<=4)){oe("Priority must be 0..4"),a.focus();return}let S=String(o.value||""),N=String(c.value||""),K={title:C};S.length>0&&(K.type=S),String(j).length>0&&(K.priority=j),N.length>0&&(K.description=N),q(!0);try{await t("create-issue",K)}catch{q(!1),oe("Failed to create issue");return}P(),q(!1),E()}return r.addEventListener("cancel",C=>{C.preventDefault(),E()}),m.addEventListener("click",()=>E()),d.addEventListener("click",()=>E()),r.addEventListener("keydown",C=>{C.key==="Enter"&&(C.ctrlKey||C.metaKey)&&(C.preventDefault(),F())}),n.addEventListener("submit",C=>{C.preventDefault(),F()}),{open(){n.reset(),U(),J();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){E()}}}var pg=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function fg(e,t){return Vo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Fu(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=fg(n,e);return i`<button
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
  `}function ju(e,t,r){return i`
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
  `}function Bu(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${pg.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var _g=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Vt="",mg=["impl_runtime","impl_model","impl_effort"];function Kt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Uu(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(L=>he(L,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="execution",c=!1,u="",d={},p={},m=[],$=!1,E=null,q={},U="",oe="",J=!1,P=!1,F=!1,C=null;function j(){let L=t.queueStore?.get();return Kt(L)?L.runner_catalog:null}function S(){let L=t.queueStore?.get();return Kt(L)&&Kt(L.execution_defaults)?L.execution_defaults:null}function N(){let L=t.implPresetStore?.get();return Kt(L)&&Array.isArray(L.presets)?L:null}async function K(){$=!0,Ue();try{let L=await r("get-session-defaults",{});d=Kt(L?.values)?{...L.values}:{},p={...d},m=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){m=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}finally{$=!1,Ue()}}async function be(){let L=Lc(d,p);if(Object.keys(L).length!==0){try{let Q=await r("set-session-defaults",{values:L});d=Kt(Q?.values)?{...Q.values}:{},p={...d},m=Array.isArray(Q?.warnings)?Q.warnings:[]}catch(Q){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}Ue()}}function re(L,Q){if(mg.includes(L)){We(L,Q);return}Q===Vt?delete p[L]:p[L]=Q,Ue(),be()}function ve(){let L=V().orchestration_model,Q=ar({global:{orchestration_model:L??void 0},execution_defaults:S(),runner_catalog:j()}).orchestration_model.value;return Q?Sr(j(),Q):null}function He(L,Q){typeof Q=="string"&&Q.length>0?p[L]=Q:delete p[L]}function We(L,Q){let le=Q===Vt?void 0:Q,Le=Rc({impl_runtime:L==="impl_runtime"?le:p.impl_runtime,impl_model:L==="impl_model"?le:p.impl_model,impl_effort:L==="impl_effort"?le:p.impl_effort},j(),ve());He("impl_runtime",Le.impl_runtime),He("impl_model",Le.impl_model),He("impl_effort",Le.impl_effort),Ue(),be()}async function Fe(){let L=t.queueStore?.get();if(!Kt(L))return;let Q={orchestration_model:L.orchestration_model??null,orchestration_effort:L.orchestration_effort??null,orchestration_speed:L.orchestration_speed??null},le=Oc(Q,{...Q,...q});if(Object.keys(le).length!==0){try{let Le=await r("worker-queue-set-orchestration-defaults",{expected_revision:L.revision,values:le});if(Le&&Le.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}q={}}catch(Le){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Le instanceof Error?Le.message:String(Le)}`)}Ue()}}function ne(L,Q){q[L]=Q===Vt?null:Q,Ue(),Fe()}function ce(L){if(E=L,!L){Ue();return}let Q=j(),le=V(),Le=le.orchestration_model;Le&&!rs(Q,L).includes(Le)&&(q.orchestration_model=null,Le=null);let I=le.orchestration_effort;I&&!Ca(Q,L,Le||tr).includes(I)&&(q.orchestration_effort=null),Ue(),Fe()}async function we(L){let Q=t.queueStore?.get();if(!(!Kt(Q)||L<1)){try{await r("worker-queue-set-slots",{expected_revision:Q.revision,slots:L})}catch(le){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${le instanceof Error?le.message:String(le)}`)}Ue()}}function x(){let L={},Q=V();for(let le of ao){let Le=Ar.includes(le)?Q[le]:p[le];typeof Le=="string"&&Le.length>0&&(L[le]=Le)}return L}async function _e(){let L=N();if(!L)return;let Q=x();if(Object.keys(Q).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let le=(L.presets||[]).find(I=>I.id===U),Le=oe.trim()||(le?le.name:"");if(!Le){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let I=le?await r("impl-preset-update",{expected_revision:L.revision,id:le.id,name:Le,settings:Q}):await r("impl-preset-create",{expected_revision:L.revision,name:Le,settings:Q});if(I&&I.applied){if(oe="",!le&&Array.isArray(I.presets)){let H=I.presets.find(Te=>Te.name===Le);U=H?H.id:U}Ue()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ue()}catch(I){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${I instanceof Error?I.message:String(I)}`)}}async function G(){let L=N();if(!(!L||U.length===0))try{let Q=await r("impl-preset-delete",{expected_revision:L.revision,id:U});Q&&Q.applied?(U="",Ue()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ue())}catch(Q){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${Q instanceof Error?Q.message:String(Q)}`)}}async function ae(){let L=N(),Q=t.queueStore?.get();if(!(!L||!Kt(Q)||U.length===0)){try{let le=await r("apply-impl-preset-global",{preset_id:U,expected_revision:L.revision,expected_queue_revision:Q.revision});le&&le.applied?(d=Kt(le.values)?{...le.values}:{},p={...d},m=Array.isArray(le.warnings)?le.warnings:[],Kt(le.queue)&&(t.queueStore?.set?.(le.queue),q={}),le.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):le&&le.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(le){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${le instanceof Error?le.message:String(le)}`)}Ue()}}async function ke(){P=!0,F=!1,Ue();try{let L=await r("get-worker-system-prompt",{});!L||typeof L!="object"||Array.isArray(L)?F=!0:C=L}catch{F=!0}finally{P=!1,Ue()}}function Ne(){if(J=!J,J&&!C){ke();return}Ue()}function $e(){let L=kn({loading:P,error:F});if(L)return L;if(!C)return"";let Q=Array.isArray(C.variants)?C.variants:[];return i`<div class="settings-dialog__sp-body">
      ${C.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${C.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Q.map(le=>i`<div class="settings-dialog__sp-variant" data-variant=${le.key}>
            <div class="settings-dialog__sp-cond">${le.condition}</div>
            ${xr(le.label,le.system_prompt)}
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
        aria-expanded=${J?"true":"false"}
        @click=${Ne}
      >
        ${J?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${J?$e():""}
    </section>`}function mt(L,Q,le,Le,I,H,Te){let Oe=I[L]??Vt,xe=Ra(L,le,I,S(),j(),Te),M=xe.options.find(pe=>pe.value===Oe),X=Oe===Vt?xe.full_value:M?.full_value;return i`<select
        class=${Oe===Vt?"settings-dialog__unset":""}
        data-key=${L}
        aria-label=${Q}
        title=${X||""}
        ?disabled=${H===!0||xe.disabled}
        .value=${Jr(String(Oe))}
        @change=${pe=>Le(L,String(pe.target.value))}
      >
        <option value=${Vt} ?selected=${Oe===Vt}>
          ${xe.unset_label}
        </option>
        ${xe.options.map(pe=>i`<option
              value=${pe.value}
              title=${pe.full_value||""}
              ?selected=${pe.value===Oe}
            >
              ${pe.label}
            </option>`)}
      </select>
      ${Oe===Vt?i`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Pe(L,Q,le,Le,I,H=!1,Te){return i`<div
      class=${`settings-dialog__row${H?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${Q}</span>
      <span class="settings-dialog__controls">
        ${mt(L,Q,le,Le,I,H,Te)}
      </span>
    </div>`}function it(L,Q,le,Le,I){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${Q}-on)`}
        ></i>
        ${L}
      </span>
      <span class="settings-dialog__controls">
        ${mt(le,`${L} \uBAA8\uB378`,Le,re,p,!1)}
        ${mt(I,`${L} effort`,co,re,p,!1)}
      </span>
    </div>`}function Je(L){return i`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${L.rows.length>0?`\uBCC0\uACBD ${L.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${L.rows.map(Q=>i`<div
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
      ${L.ignored_keys.length>0?i`<div class="settings-dialog__preset-diff-note">
            ${L.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function V(){let L=t.queueStore?.get(),Q={};for(let le of Ar)Q[le]=Object.prototype.hasOwnProperty.call(q,le)?q[le]:Kt(L)&&typeof L[le]=="string"?L[le]:null;return Q}function ee(){let L=j(),Q=p.impl_runtime,le=p.impl_model,Le=N(),I=t.queueStore?.get(),H=V(),Te=rs(L,E),Oe=xn(L,void 0).filter(O=>O!==tr),xe=Ca(L,E,H.orchestration_model||tr).filter(O=>O!==tr),M=U?(Le?.presets||[]).find(O=>O.id===U):null,X=M?Ic(x(),Kt(M.settings)?M.settings:{}):null,pe=Kt(I)&&typeof I.slots=="number"?I.slots:2,v=S()?.supported===!0,T=Ra("workflow_mode",es,p,S(),L);return i`
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
        ${m.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${m.join(", ")}
            </div>`:""}
        ${v?"":i`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${$?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${Jr(U)}
                  @change=${O=>{U=String(O.target.value),Ue()}}
                >
                  <option value="" ?selected=${U===""}>
                    실행 프리셋…
                  </option>
                  ${(Le?.presets||[]).map(O=>i`<option
                        value=${O.id}
                        ?selected=${O.id===U}
                      >
                        ${O.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${!X||X.rows.length===0}
                  @click=${ae}
                >
                  적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${U?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Jr(oe)}
                  @input=${O=>{oe=String(O.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  title=${U?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                  @click=${_e}
                >
                  ${U?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${U.length===0}
                  @click=${G}
                >
                  삭제
                </button>
              </div>
              ${X?Je(X):""}

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${Jr(E||Vt)}
                      @change=${O=>{let te=String(O.target.value);ce(te===Vt?null:te)}}
                    >
                      <option
                        value=${Vt}
                        ?selected=${!E}
                      >
                        전체
                      </option>
                      <option
                        value="claude"
                        ?selected=${E==="claude"}
                      >
                        claude
                      </option>
                      <option
                        value="codex"
                        ?selected=${E==="codex"}
                      >
                        codex
                      </option>
                    </select>
                    <span class="settings-dialog__hint"
                      >모델 목록을 좁힙니다</span
                    >
                  </span>
                </div>
                ${Pe("orchestration_model","\uBAA8\uB378",Te,ne,H)}
                ${Pe("orchestration_effort","effort",xe,ne,H)}
                ${Pe("orchestration_speed","\uC18D\uB3C4",Jn,ne,H)}
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
                        aria-pressed=${String(!p.workflow_mode)}
                        @click=${()=>re("workflow_mode",Vt)}
                      >
                        ${T.unset_label}
                      </button>
                      ${p.workflow_mode?"":i`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${es.map(O=>i`<button
                            type="button"
                            data-mode=${O}
                            aria-pressed=${String(p.workflow_mode===O)}
                            @click=${()=>re("workflow_mode",O)}
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
                ${it("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ts,"spec_review_effort")}
                ${it("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",lo,"plan_review_effort")}
                ${it("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ts,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Pe("impl_runtime","\uC704\uC784 \uB300\uC0C1",io,re,p)}
                ${Pe("impl_model","\uBAA8\uB378",xn(L,Q),re,p)}
                ${Pe("impl_effort","effort",An(L,Q,le),re,p)}
                ${Pe("impl_speed","\uC18D\uB3C4",Jn,re,p)}
                ${Pe("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Oe,re,p,!1,{...p,...H})}
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
                        @click=${()=>we(pe-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${pe}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>we(pe+1)}
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
    `}function me(){let L=n.get();return i`
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
        ${L?i`
              ${Fu(L,s(),Qe)}
              ${ju(L,u,{onDraft:Q=>{u=Q},onAdd:ht,onRemove:Be})}
              ${Bu(L,Re)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function Ke(L){let Q=n.get();if(Q)try{let le=await r("display-policy-set",{expected_revision:Q.revision,policy:L(Q)});ze(le),le&&le.conflict&&le.policy&&(le=await r("display-policy-set",{expected_revision:le.policy.revision,policy:L(le.policy)}),ze(le)),le&&le.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function ze(L){L&&L.policy&&typeof L.policy=="object"&&n.set(L.policy)}function Ye(L){Ke(L)}function Qe(L){let Q=n.get();if(!Q)return;let le=!gg(L,Q);Ye(Le=>hg(L,Le,le))}function ht(){let L=u.trim();L.length!==0&&(u="",Ye(Q=>Q.hidden_prefixes.includes(L)?{hidden_prefixes:Q.hidden_prefixes}:{hidden_prefixes:[...Q.hidden_prefixes,L]}),Ue())}function Be(L){Ye(Q=>({hidden_prefixes:Q.hidden_prefixes.filter(le=>le!==L)}))}function Re(L){let Q=n.get();if(!Q)return;let le=Q.chips[L]===!1;Ye(()=>({chips:{[L]:le}}))}function Ue(){Ge(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${_g.map(L=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${L.id}
                  aria-selected=${String(l===L.id)}
                  aria-controls=${`settings-pane-${L.id}`}
                  @click=${()=>Lt(L.id)}
                >
                  <span class="settings-dialog__glyph">${L.glyph}</span>
                  ${L.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${nt}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${ee()} ${me()}
          </div>
        </div>
      `,a)}function Lt(L){l=L,Ue()}let tt=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",tt),a.addEventListener("cancel",tt);let _t=L=>{L.target===a&&nt()};a.addEventListener("click",_t);let ut=null;n.subscribe&&(ut=n.subscribe(()=>{c&&Ue()}));let et=null;t.implPresetStore?.subscribe&&(et=t.implPresetStore.subscribe(()=>{c&&Ue()}));function rt(L="execution"){c||(c=!0,t.onOpenChange?.(!0),l=L,u="",q={},Ue(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),K())}function nt(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:rt,close:nt,sessionDraft:()=>({...p}),destroy(){c=!1,a.removeEventListener("close",tt),a.removeEventListener("cancel",tt),a.removeEventListener("click",_t),ut&&(ut(),ut=null),et&&(et(),et=null),a.remove()}}}function gg(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function hg(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var bg=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Wu="usage-meter-card",yg="usage-meter-layer",zu=600,vg=["token_expired","relogin_required"];function Hu(e){return String(e).padStart(2,"0")}function wg(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Gu(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Hu(n.getHours())}:${Hu(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${bg[n.getMonth()]} ${n.getDate()} ${o}`;return`${wg(r,t)} \xB7 ${l}`}function kg(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Vu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Ku(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Yu=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Xu(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function $g(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Xu(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function xg(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=$g(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?Xu(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function Zu(e,t){return`${e}:${t}`}function Qu(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,l=0,c=null;function u(){Ge(i``,e),e.hidden=!0,p()}function d(){if(c===null){let ne=e.ownerDocument;c=ne.createElement("div"),c.id=yg,c.className="usage-meter__layer",ne.body.appendChild(c)}return c}function p(){c!==null&&(Ge(i``,c),c.remove(),c=null)}function m(ne){r!==ne&&(r===null&&(document.addEventListener("mousedown",E),document.addEventListener("keydown",U),window.addEventListener("resize",q)),r=ne)}function $(){r!==null&&(r=null,document.removeEventListener("mousedown",E),document.removeEventListener("keydown",U),window.removeEventListener("resize",q))}function E(ne){let ce=ne.target;ce&&(e.contains(ce)||c!==null&&c.contains(ce))||($(),ve())}function q(){ve()}function U(ne){ne.key==="Escape"&&($(),ve())}function oe(ne){r===ne?$():m(ne),ve()}function J(){$(),ve()}async function P(ne,ce){if(n.has(ne.key))return;let we=Zu(ne.key,ce);n.set(ne.key,ce),a.delete(we),ve();let x=null;try{x=await(await fetch(ne.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ce})})).json()}catch{x=null}if(t)return;if(n.delete(ne.key),!x||x.ok!==!0){let G=x&&typeof x.error=="string"&&x.error.length>0?x.error:"network_error";a.set(we,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${G}`}),ve();return}let _e=Array.isArray(x.warnings)?x.warnings.filter(G=>typeof G=="string"&&G.length>0):[];_e.length>0&&a.set(we,{kind:"warn",text:_e.join(" \xB7 ")}),ve(),await Fe()}function F(ne,ce,we,x){let _e=Ku(ne.pct),ae=`resets ${Gu(ne.resetsAt,x)}${ce?` \xB7 ${we}`:""}`;return i`<span
      class="usage-meter__window ${Vu(_e)}"
      style=${`--progress: ${_e}%`}
      title=${ae}
    >
      <span class="usage-meter__label">${ne.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${_e}%</span>
    </span>`}function C(ne,ce,we){let x=ce.available&&typeof ce.ageSeconds=="number"&&ce.ageSeconds>zu,_e=x&&typeof ce.ageSeconds=="number"?`${Math.floor(ce.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",G=ce.accounts.filter($e=>!$e.active).length,ae=`usage-meter__group${x?" usage-meter__group--stale":""}`,ke=i`<span class="usage-meter__provider"
        >${ne.label}</span
      >
      ${ce.available?ce.windows.map($e=>F($e,x,_e,we)):i`<span class="usage-meter__empty">사용량 없음</span>`}
      ${G>0?i`<span class="usage-meter__badge">+${G}</span>`:""}`;if(ce.accounts.length===0)return i`<span
        class=${ae}
        aria-label=${`${ne.label} usage`}
        >${ke}</span
      >`;let Ne=r===ne.key;return i`<button
      type="button"
      class=${`usage-meter__toggle ${ae}`}
      aria-label=${`${ne.label} usage`}
      aria-expanded=${Ne?"true":"false"}
      aria-controls=${Wu}
      @click=${()=>oe(ne.key)}
    >
      ${ke}
    </button>`}function j(ne,ce){return i`<span class="usage-meter" aria-label="Usage">
      ${ne.map(we=>C(we.provider,we.snapshot,ce))}
    </span>`}function S(ne,ce){let we=Ku(ne.pct),x=Gu(ne.resetsAt,ce);return i`<span
      class="usage-meter__account-window ${Vu(we)}"
      style=${`--progress: ${we}%`}
    >
      <span class="usage-meter__account-key">${ne.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${we}%</span>
      <span class="usage-meter__account-reset"
        >${x.length>0?`\u21BB ${x}`:""}</span
      >
    </span>`}function N(ne,ce){return vg.includes(ce)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ne.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function K(ne,ce,we){let x=ce.status==="ok",_e=typeof ce.ageSeconds=="number"&&ce.ageSeconds>zu,G=a.get(Zu(ne.key,ce.number)),ae=n.get(ne.key),ke=ae!==void 0,Ne=ae===ce.number,$e=["usage-meter__account"];return ce.active&&$e.push("usage-meter__account--active"),x||$e.push("usage-meter__account--unavailable"),_e&&$e.push("usage-meter__account--stale"),i`<div class=${$e.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ce.email}
          >${ce.alias===null?ce.email:ce.alias}</span
        >
        ${ce.plan===null?"":i`<span class="usage-meter__account-tag">${ce.plan}</span>`}
        ${ce.active?i`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ce.ageSeconds===null?"":i`<span class="usage-meter__account-age"
              >${kg(ce.ageSeconds)}</span
            >`}
        ${ce.active?"":i`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ke}
              @click=${()=>{P(ne,ce.number)}}
            >
              ${Ne?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${x?i`<div class="usage-meter__account-windows">
            ${ce.windows.map(Ve=>S(Ve,we))}
          </div>`:i`<div class="usage-meter__account-status">
            ${N(ne,ce.status)}
          </div>`}
      ${G===void 0?"":i`<div
            class="usage-meter__account-message usage-meter__account-message--${G.kind}"
          >
            ${G.text}
          </div>`}
    </div>`}function be(ne,ce,we){let x=ce.accounts.filter(_e=>_e.active).length;return i`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ne.label} · 활성 ${x} / 전체
        ${ce.accounts.length}
      </h2>
      ${ce.accounts.map(_e=>K(ne,_e,we))}
    </section>`}function re(ne,ce){return i`<div
      class="usage-meter__card"
      id=${Wu}
      role="dialog"
      aria-label=${`${ne.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${be(ne.provider,ne.snapshot,ce)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ve(){let ne=[];for(let x of Yu){let _e=o.get(x.key);_e&&ne.push({provider:x,snapshot:_e})}if(ne.length===0){$(),u();return}let ce=ne.find(x=>x.provider.key===r&&x.snapshot.accounts.length>0);ce||$();let we=Date.now();Ge(j(ne,we),e),e.hidden=!1,ce?He(ce,we):p()}function He(ne,ce){let we=d(),x=e.getBoundingClientRect(),_e=e.ownerDocument.documentElement.clientWidth;we.style.setProperty("--usage-meter-anchor-top",`${x.bottom}px`),we.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,_e-x.right)}px`),Ge(i`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${J}
        ></div>
        ${re(ne,ce)}`,we)}async function We(ne){try{let ce=await fetch(ne.endpoint);return ce.ok?xg(await ce.json()):null}catch{return null}}async function Fe(){l+=1;let ne=l,ce=await Promise.all(Yu.map(async we=>({provider:we,snapshot:await We(we)})));if(!(t||ne!==l)){for(let we of ce)we.snapshot?o.set(we.provider.key,we.snapshot):o.delete(we.provider.key);ve()}}return u(),Fe(),s=setInterval(()=>{Fe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),$(),u()}}}function Ju(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),l=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!l&&typeof s.dismissed_at!="number"}}var Ag="worker-ineligible";function Ya(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ed(e){return Ya(e).includes(Ag)}var Sg="worker-serial";function Za(e){return Ya(e).includes(Sg)}function Xa(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Eg=new Set(["done","failed","orphaned","stopped","discarded"]),Tg={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Cg={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Rg={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Qa(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Rg[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function td(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,l=document.createElement("dialog");l.id="worker-parallel-analysis-dialog",l.className="pa",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),e.appendChild(l);let c=new Map,u=new Map,d=!1,p=null,m=null,$=null,E=new Set,q=!1,U=0,oe=null,J=new Set;function P(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function F(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function C(){return o&&o()||""}async function j(){if(!s)return;let v=++U;q=!0,$=null,E.clear(),I();try{let T=await s("worker-parallel-analysis-targets",{root_dir:C()});if(v!==U||!H)return;let O=Array.isArray(T?.qualified)?T.qualified:[],te=Array.isArray(T?.excluded)?T.excluded:[];$={qualified:O,excluded:te};for(let Se of O)Se&&typeof Se.id=="string"&&E.add(Se.id)}catch{v===U&&H&&($={qualified:[],excluded:[]},he("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{v===U&&(q=!1,H&&I())}}function S(v){return Array.isArray(v.runs)?v.runs:[]}function N(){let v=P(),T=new Set;for(let O of Object.values(v.attempts||{})){let te=O;te&&typeof te.bead_id=="string"&&!Eg.has(te.status)&&T.add(te.bead_id)}for(let O of Array.isArray(v.pr_wait)?v.pr_wait:[])O&&typeof O.bead_id=="string"&&T.add(O.bead_id);for(let O of Object.values(v.discard_operations||{})){let te=O;te&&te.phase!=="done"&&typeof te.bead_id=="string"&&T.add(te.bead_id)}return T}function K(v){return v.filter(T=>be(T)===null)}function be(v){let T=P();for(let O of Array.isArray(T.serial_lanes)?T.serial_lanes:[])if(Array.isArray(O?.entries)&&O.entries.some(te=>te.bead_id===v))return O.id;return(Array.isArray(T.queue)?T.queue:[]).some(O=>O.bead_id===v)?"parallel":null}function re(v,T){let O=c.get(v);return O||[...T.order]}function ve(v){if(v.length<2)return!1;let T=be(v[0]);if(!T||T==="parallel")return!1;let O=P(),te=(Array.isArray(O.serial_lanes)?O.serial_lanes:[]).find(Ae=>Ae.id===T)?.entries.map(Ae=>Ae.bead_id);if(!Array.isArray(te))return!1;let Se=v.map(Ae=>te.indexOf(Ae));return Se.every(Ae=>Ae>=0)&&Se.every((Ae,g)=>g===0||Ae>Se[g-1])}function He(){let v=P(),T=Array.isArray(v.serial_lanes)?v.serial_lanes:[],O=T.find(te=>Array.isArray(te.entries)&&te.entries.length===0);return O?O.id:T[0]?.id||"s1"}function We(v){let T=P().bead_titles||{};return typeof T[v]=="string"?T[v]:v}async function Fe(v,T){if(!s||d)return null;d=!0,I();try{return await s(v,T)}finally{d=!1,I()}}async function ne(v){n?.setPending?.(!0);try{let T=await Fe("worker-parallel-analysis-start",{force:v,target_ids:Array.from(E)});T&&T.applied===!1&&T.reason&&(T.reason==="target_not_qualified"&&Array.isArray(T.detail)?he(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${T.detail.join(", ")}`,"error",3200):he(`\uBD84\uC11D \uC2E4\uD328: ${T.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function ce(){let v=F().job;!s||!v||await s("worker-parallel-analysis-cancel",{job_id:v.job_id})}async function we(v){if(!(!s||J.has(v))){J.add(v),I();try{let T=await s("worker-parallel-analysis-prompt",{root_dir:C(),run_id:v});if(!H)return;if(T?.ok===!0&&typeof T.prompt=="string"){oe={run_id:v,prompt:T.prompt};return}he(T?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{J.delete(v),I()}}}function x(){oe=null,I()}async function _e(){if(!oe)return;let v=await Jt(oe.prompt);he(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)}function G(v,T){a&&a(v,Qa(T))}function ae(){return P().runner_catalog}function ke(v){return Object.keys(ae()?.runners?.[v]?.models||{})}function Ne(v){let T=ke(v),O=ae()?.runners?.[v]?.default_model;return typeof O=="string"&&T.includes(O)?O:T[0]||""}function $e(){let v=F().settings,T=p||v.runner||"claude",O=ke(T),te=p?Ne(T):v.model||O[0]||"",Se=Xa(ae(),T,te),Ae=v.effort||"",g=Se.includes(Ae)?Ae:Se[0]||"";return{runner:T,model:te,effort:g,models:O,efforts:Se}}async function Ve(v){let T=F().settings,O=await Fe("worker-parallel-analysis-settings-update",{expected_revision:T.revision,runner:v.runner,model:v.model,effort:v.effort});(!O||O.applied!==!0)&&(p=null,I(),O&&O.reason&&he(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${O.reason}`,"error",2800))}function mt(v){p=v,I();let T=$e();Ve({runner:v,model:T.model,effort:T.effort})}function Pe(v){let T=$e(),O=Xa(ae(),T.runner,v);Ve({runner:T.runner,model:v,effort:O.includes(T.effort)?T.effort:O[0]||""})}function it(v){let T=$e();Ve({runner:T.runner,model:T.model,effort:v})}async function Je(v,T){if(!s||d)return;let O=re(v,T),te=F();if(O.length<2||!te.last_good){he("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Se=u.get(v)||He(),Ae=()=>({snapshot_digest:te.last_good.identity_digest,group_index:v,lane:Se,ordered_bead_ids:O,expected_revision:P().revision});d=!0,I();try{let g=await s("worker-parallel-analysis-submit",Ae());g&&g.queue&&r&&r.set(g.queue),g&&g.applied!==!0&&g.conflict===!0&&(g=await s("worker-parallel-analysis-submit",Ae()),g&&g.queue&&r&&r.set(g.queue)),g&&g.applied===!0?(c.delete(v),he(`\uC9C1\uB82C \uB808\uC778 ${Se}\uC5D0 ${O.length}\uAC1C \uBC30\uCE58`,"success")):he(`\uC81C\uCD9C \uAC70\uBD80: ${g?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,I()}}function V(v,T,O){c.set(v,re(v,T).filter(te=>te!==O)),I()}function ee(v){c.delete(v),I()}function me(v,T,O,te){let Se=[...re(v,T)],Ae=Se.indexOf(O),g=Ae+te;Ae<0||g<0||g>=Se.length||(Se.splice(g,0,...Se.splice(Ae,1)),c.set(v,Se),I())}function Ke(){let v=F().settings,T=Object.keys(ae()?.runners||{}),O=$e();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${te=>mt(te.target.value)}
        >
          ${T.map(te=>i`<option
                value=${te}
                ?selected=${O.runner===te}
              >
                ${te}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${te=>Pe(te.target.value)}
        >
          ${O.models.map(te=>i`<option
                value=${te}
                ?selected=${O.model===te}
              >
                ${te}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${te=>it(te.target.value)}
        >
          ${O.efforts.map(te=>i`<option
                value=${te}
                ?selected=${O.effort===te}
              >
                ${te}
              </option>`)}
        </select>
      </label>
      ${ze(v)}
    </div>`}function ze(v){return!Qe(v)||Ye(v)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:v.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${v.runner}/${v.model} · effort
        ${v.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:v.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function Ye(v){return v.is_default===!0&&v.compatible===!1}function Qe(v){return!!(v.runner&&v.model&&v.effort)}function ht(v){return Qe(v)&&v.compatible!==!1}function Be(v){let T=Math.max(0,Math.floor(v/1e3)),O=Math.floor(T/60),te=T%60;return`${O}:${String(te).padStart(2,"0")}`}function Re(v){let T=v.job;if(T){let O=typeof T.started_at=="number"?T.started_at:0,te=`${T.runner||"?"}/${T.model||"?"}`,Se=O?` \xB7 \uACBD\uACFC ${Be(Date.now()-O)}`:"",Ae=typeof T.session_id=="string"?T.session_id:"",g=S(v).find(y=>y.run_id===T.job_id);return i`<span class="pa-meta__progress">
        <span
          >분석 중 — ${te} · effort ${T.effort||"?"}${Se}</span
        >
        ${Ae?i`<code class="pa-session-id" title=${Ae}
              >${Ae.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>G(T.job_id,g||T)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${g?.prompt_saved!==!0||J.has(T.job_id)}
          @click=${()=>{we(T.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Ue()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function Ue(){return n?.isPending?.()===!0}function Lt(v){let T=!!v.job,O=ht(v.settings),te=$!==null&&E.size===0,Se=T||d||Ue()||q;return i`<div class="pa-meta">
      ${v.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(v.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${Re(v)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!O||Se||te}
        @click=${()=>{ne(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!O||Se||te}
        @click=${()=>{ne(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!T}
        @click=${()=>{ce()}}
      >
        취소
      </button>
    </div>`}function tt(v){return typeof v=="string"&&v.length>0?v:"\uBBF8\uBC30\uCE58"}function _t(v,T){T?E.add(v):E.delete(v),I()}function ut(v){let T=Array.isArray(v.scope)?v.scope:[],O=Array.isArray(v.overlaps)?v.overlaps:[];return T.length===0&&O.length===0?i``:i`<span class="pa-target__signals">
      ${T.length>0?i`<details class="pa-target__scope" title=${T.join(`
`)}>
            <summary>scope ${T.length}</summary>
            <ul>
              ${T.map(te=>i`<li><code>${te}</code></li>`)}
            </ul>
          </details>`:""}
      ${O.length>0?i`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${O.join(", ")}`}
            >겹침 ${O.join(", ")}</span
          >`:""}
    </span>`}function et(){let v=$?.qualified||[],T=$?.excluded||[];return i`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${q?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${v.length} \xB7 \uC81C\uC678 ${T.length}`}</span
        >
      </header>
      ${$&&v.length>0?i`<ul class="pa-targets__list">
            ${v.map(O=>i`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${O.id}
                      .checked=${E.has(O.id)}
                      @change=${te=>_t(O.id,te.target.checked)}
                    />
                    <span class="pa-target__title">${O.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${ut(O)}
                    <span class="pa-target__route">${O.route}</span>
                    <span class="pa-target__lane"
                      >${tt(O.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:$&&v.length===0?i`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${$&&T.length>0?i`<details class="pa-targets__excluded">
            <summary>제외 대상 ${T.length}</summary>
            <ul class="pa-targets__list">
              ${T.map(O=>i`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${O.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Tg[O.reason]||O.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${tt(O.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function rt(v){let T=typeof v.session_id=="string"&&v.session_id.length>0,O=T?v.session_id:"";return i`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${v.outcome}"
        >${Cg[v.outcome]||v.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(v.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${v.runner||"?"} / ${v.model||"?"} / ${v.effort||"?"}</span
      >
      ${T?i`<code class="pa-session-id" title=${O}
            >${O.slice(0,8)}</code
          >`:i`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${v.outcome==="failure"&&v.reason?i`<span class="pa-run-row__reason">${v.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>G(v.run_id,v)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${v.prompt_saved!==!0||J.has(v.run_id)}
          @click=${()=>{we(v.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function nt(v){return i`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${v.length>0?i`<ul class="pa-runs__list">
            ${v.map(T=>rt(T))}
          </ul>`:i`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function L(){return oe?i`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${x}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${oe.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{_e()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${x}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${oe.prompt}</pre
        >
      </section>
    </div>`:""}function Q(v,T){let O=re(v,T),te=N(),Se=O.filter(Z=>te.has(Z)),Ae=K(O),g=ve(O),y=Array.isArray(P().serial_lanes)?P().serial_lanes:[],R=u.get(v)||He(),z=T.eligible!==!0||O.length<2||Se.length>0||Ae.length>0||g||d;return i`<section class="pa-group" data-group-index=${String(v)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${T.confidence}</span>
        ${T.categories.map(Z=>i`<span class="pa-group__category">${Z}</span>`)}
        ${g?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${T.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Ae.length>0?i`<span class="pa-group__stale"
              >stale — ${Ae.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${T.reason}</p>
      <ol class="pa-group__members">
        ${O.map((Z,ge)=>i`<li class="pa-member" data-bead-id=${Z}>
              <span class="pa-member__seq">${ge+1}</span>
              <span class="pa-member__title">${We(Z)}</span>
              ${te.has(Z)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Z}
                ?disabled=${ge===0}
                aria-label=${`${Z} \uC704\uB85C`}
                @click=${()=>me(v,T,Z,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Z}
                ?disabled=${ge===O.length-1}
                aria-label=${`${Z} \uC544\uB798\uB85C`}
                @click=${()=>me(v,T,Z,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Z}
                aria-label=${`${Z} \uC81C\uC678`}
                @click=${()=>V(v,T,Z)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${T.evidence.map(Z=>i`<li class="pa-evidence">
              <code>${Z.path}</code>
              <span class="pa-evidence__locator">${Z.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ee(v)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Z=>{u.set(v,Z.target.value),I()}}
          >
            ${y.map((Z,ge)=>i`<option
                  value=${Z.id}
                  ?selected=${R===Z.id}
                >
                  직렬 ${ge+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${z}
          @click=${()=>{Je(v,T)}}
        >
          제출
        </button>
      </footer>
    </section>`}function le(v){let T=Array.isArray(v.issues)?v.issues:[],O=T.filter(Se=>Se.verdict==="parallel_ok").length,te=T.filter(Se=>Se.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${O}</span>
      <span>uncertain ${te}</span>
    </div>`}function Le(){let v=H&&!!F().job;if(v&&m===null){m=setInterval(()=>I(),1e3);return}!v&&m!==null&&(clearInterval(m),m=null)}function I(){let v=F();p&&v.settings.runner===p&&(p=null);let T=v.last_good?.result;Le(),Ge(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${pe}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Ke()} ${Lt(v)} ${et()}
            ${T?i`${T.groups.map((O,te)=>Q(te,O))}
                ${T.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${le(T)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${nt(S(v))}
          </div>
        </div>
        ${L()}
      `,l)}let H=!1,Te=()=>{H=!1,oe=null,U+=1,Le()},Oe=v=>{v.target===v.currentTarget&&pe()};l.addEventListener("close",Te),l.addEventListener("cancel",Te),l.addEventListener("click",Oe);let xe=null;r&&r.subscribe&&(xe=r.subscribe(()=>{H&&I()}));let M=null;n&&n.subscribe&&(M=n.subscribe(()=>{H&&I()}));function X(){H||(H=!0,I(),j(),typeof l.showModal=="function"?l.showModal():l.setAttribute("open",""))}function pe(){H&&(H=!1,oe=null,U+=1,Le(),typeof l.close=="function"?l.close():l.removeAttribute("open"))}return{open:X,close:pe,destroy(){H=!1,m!==null&&(clearInterval(m),m=null),l.removeEventListener("close",Te),l.removeEventListener("cancel",Te),l.removeEventListener("click",Oe),xe&&(xe(),xe=null),M&&(M(),M=null),l.remove()}}}var rd=new Set(["sh","bash","zsh","dash","ksh"]),nd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function sd(e){let t=e.split("/");return t[t.length-1]||""}function Ig(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=sd(r[0]);if(n!=="env")return rd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&rd.has(sd(s))}function Lg(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Og(e){let t=[],r=0;nd.lastIndex=0;for(let n of e.matchAll(nd)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Lg(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Dg(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function od(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",l="",c=0,u=null,d=!1;function p(C,j){return j?Og(C).map(S=>S.kind==="plain"?S.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${S.kind}"
            >${S.text}</span
          >`):C}function m(){if(!s)return i``;let C=o==="ready"&&Ig(a),j=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>P()}
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
              @click=${()=>{E()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>P()}
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
                  ${j.map((S,N)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${N+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(S,C)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function $(){Ge(m(),n)}async function E(){if(o!=="ready")return;let C=await Jt(a);he(C?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",C?"success":"error")}function q(C){C.key==="Escape"&&s&&(C.preventDefault(),P())}function U(){d||(document.addEventListener("keydown",q),d=!0)}function oe(){d&&(document.removeEventListener("keydown",q),d=!1)}async function J(C,j=null){let S=++c;U(),s={...C},u=j||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",l="",$(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let K=t?t():"";if(!K){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",$();return}if(!r){o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",$();return}let be="/api/repo-ops-script?workspace="+encodeURIComponent(K)+"&lane="+encodeURIComponent(C.lane)+"&base_sha="+encodeURIComponent(C.base_sha);try{let re=await r(be),ve=await re.json().catch(()=>({}));if(S!==c)return;if((t?t():"")!==K){P();return}if(!re.ok||!ve||ve.ok!==!0){o="error",l=Dg(ve&&typeof ve.error=="string"?ve.error:""),$();return}s={lane:ve.lane,base_sha:ve.base_sha,path:ve.path,base_ref:ve.base_ref},a=String(ve.content),o="ready",$()}catch{if(S!==c)return;o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",$()}}function P(){c+=1,oe(),s=null,a="",$();let C=u;u=null,C?.isConnected&&C.focus()}function F(){P(),n.remove()}return{open:J,close:P,destroy:F}}function ad(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let S=o();return typeof S.revision=="number"?S.revision:0}function l(S){t&&S&&S.queue&&typeof S.queue=="object"&&t.set(S.queue)}function c(){let S=o().workspace_info;return S&&typeof S=="object"?S:{}}function u(S,N){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${S}"
      >${N}</span
    >`}function d(S){if(typeof S!="number"||!Number.isFinite(S))return"";let N=S/6e4;return Number.isInteger(N)?`timeout ${N}\uBD84`:`timeout ${Math.round(S/1e3)}\uCD08`}function p(S){let N=d(S);return N?u("config",N):""}function m(S,N,K){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${K.script}
      @click=${be=>{s&&s({lane:S,base_sha:N.base_sha,path:K.script,base_ref:N.base_ref},be.currentTarget)}}
    ></button>`}function $(){let S=o().repo_ops_opt_out;return{verify:S?.verify===!0,deploy:S?.deploy===!0}}function E(S,N){return i`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!N}
        @change=${K=>{J(S,!K.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function q(S){let N=typeof S.base_sha=="string"?S.base_sha:"",K=`${S.source_path||"repo-ops/config.toml"} @ ${S.base_ref||"?"}${N?`@${N.slice(0,7)}`:""}`,be=$(),re=!!S.verify&&be.verify,ve=!!S.deploy&&be.deploy;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${K}</span>
      </p>
      <div
        class="worker-repo-ops__lane${re?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${S.verify?i`${m("verify",S,S.verify)}
              ${p(S.verify.timeout_ms)}
              ${re?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${re?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":S.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${S.verify?E("verify",be.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ve?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${S.deploy?i`${m("deploy",S,S.deploy)}
              ${p(S.deploy.timeout_ms)}
              ${ve?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ve?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":S.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${S.deploy?E("deploy",be.deploy):""}
      </div>
    </section>`}function U(S){let N=S.repo_ops&&typeof S.repo_ops=="object"?S.repo_ops:null;return N&&(N.status==="resolved"||N.status==="absent")?q(N):N&&(N.status==="pending"||N.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${N.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${N.error_code?i` — <code>${N.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function oe(S){if(!r)return;let N=await r("worker-auto-repair-toggle",{on:S,expected_revision:a()});if(l(N),N&&N.conflict){let K=await r("worker-auto-repair-toggle",{on:S,expected_revision:a()});l(K)}n()}async function J(S,N){if(!r)return;let K=await r("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:N,expected_revision:a()});if(l(K),K&&K.conflict){let be=await r("worker-repo-ops-opt-out-toggle",{kind:S,opted_out:N,expected_revision:a()});l(be)}n()}let P={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function F(S,N,K){return i`<div class="worker-repo-ops__policy-group" data-policy=${K}>
      <div class="worker-repo-ops__policy-label">${S}</div>
      <ul class="worker-repo-ops__policy-list">
        ${N.map(be=>i`<li data-token=${be}>
              ${P[be]||be}
            </li>`)}
      </ul>
    </div>`}function C(S){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${S.map(N=>{let K=[P[N.trigger]||N.trigger];return Number.isInteger(N.attempts_per_operation_attempt)?K.push(`operation\uB2F9 ${N.attempts_per_operation_attempt}\uD68C`):Number.isInteger(N.attempts)?K.push(`${P[N.budget]||N.budget} ${N.attempts}\uD68C`):Number.isInteger(N.sessions_per_user_action)&&K.push(`${N.sessions_per_user_action}\uD68C`,P[N.user_actions]||N.user_actions),N.applies_when&&K.push(P[N.applies_when]||N.applies_when),i`<li data-token=${N.id}>
            <strong>${P[N.id]||N.id}</strong>
            <span>${K.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function j(){let S=o(),N=S.auto_repair!==!1,K=S.repo_operation_policy&&typeof S.repo_operation_policy=="object"?S.repo_operation_policy:null,be=Array.isArray(S.repo_operations)?S.repo_operations:[],re=be.find(Fe=>Fe.state==="repairing"),ve=be.filter(Fe=>Fe.state==="failed"||Fe.state==="repairing"),He=ve.length?Math.min(...ve.map(Fe=>typeof Fe.repair?.remaining=="number"?Fe.repair.remaining:0)):K?.auto_repair?.resolution_ladder?.find(Fe=>Fe.id==="auto_repair_session")?.attempts??1,We=Array.isArray(K?.auto_repair?.resolution_ladder)?K.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${N}
          @change=${Fe=>{oe(Fe.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${N?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${He}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${re?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${re.repair?.owner_bead||re.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
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
                ${We.length} · 금지
                ${(K.never_automatic||[]).length}</span
              >
            </summary>
            ${F("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",K.worker_automatic||[],"worker-automatic")}
            ${K.supported===!1||K.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${K.schema_version})`}
                </div>`:C(We)}
            ${F("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",K.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${U(c())} ${j()}
      </details>`}}}var ud=20,Pg=5,Mg=new Set(["failed","repairing","running","queued","retry_pending"]),id={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},ld={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Ng(e,t,r=ud){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function qg(e){if(e.type==="cleanup")return!0;let t=e.operation;return Mg.has(t.state)&&!t.dismissed&&!t.superseded_by}function Fg(e,t,r={}){let n=Ng(e,t,1/0),s=r.expanded===!0?ud:Pg,o=new Set(n.slice(0,s)),a=n.filter(l=>o.has(l)||qg(l));return{visible:a,hidden:n.length-a.length}}function cd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function jg(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function dd(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function pd(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function Bg(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(ld,n)?ld[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Ug(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?jt(e.at):""}
      >${go(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${cd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(id,t.kind)?id[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${_o(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${os(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${cd(e)}"
          >${jg(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?pd(lu(t.failure_kind,n)):""}
      ${Bg(t)}
      ${dd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${_o(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Wg(e){let t=e.cleanup,r=en(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?jt(e.at):""}
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
        ${hu(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${pd(vo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${dd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function zg(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(n=>n.type==="cleanup"?Wg(n):Ug(n))}
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
  </section>`}function fd(e,t={}){let r=null;function n(){if(r===null){Ge(i``,e);return}let a=Fg(r.operations,r.cleanup_failures,{expanded:r.expanded});Ge(zg({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let l=a.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){o();return}l?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var Hg=xt("views:worker"),Gg="tab:worker:ready",Vg="tab:worker:blocked",Kg="tab:worker:in-progress",Yg="tab:worker:resolved",Zg="tab:worker:closed",Ao=1,_d=5;function md(e){return no(e).path.length>0}var Xg=new Set(["quick_fix","spec_backed","full_plan"]);function gd(e){return typeof e=="string"&&Xg.has(e)}var vd="beads-ui.worker.candidate-filter",Ja={show_blocked:!1,spec:"all"};function Qg(){try{let e=window.localStorage.getItem(vd);if(!e)return{...Ja};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ja};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Ja}}}function Jg(e){try{window.localStorage.setItem(vd,JSON.stringify(e))}catch{}}function eh(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var th=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],wd="bdui.worker.candidate_sort",rh=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],So="spec";function nh(){try{let e=window.localStorage.getItem(wd);return e==="board"||e==="created"||e==="spec"?e:So}catch{return So}}function sh(e){try{window.localStorage.setItem(wd,e)}catch{}}var kd="bdui.worker.done-range";function oh(){try{let e=window.localStorage.getItem(kd);return sr(e)?e:Qt}catch{return Qt}}function ah(e){try{window.localStorage.setItem(kd,e)}catch{}}var ih="(max-width: 640px)",$d="beads-ui.worker.lane-collapsed",ps={queue:!0,done:!0};function lh(){try{let e=window.localStorage.getItem($d);if(!e)return{...ps};let t=JSON.parse(e);return!t||typeof t!="object"?{...ps}:{queue:typeof t.queue=="boolean"?t.queue:ps.queue,done:typeof t.done=="boolean"?t.done:ps.done}}catch{return{...ps}}}function ch(e){try{window.localStorage.setItem($d,JSON.stringify(e))}catch{}}function hd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function uh(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Gr):(n.sort(Is(r)),t==="board"?n:[...n.filter(md),...n.filter(s=>!md(s))])}function dh(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function ph(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function bd(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function fh(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function _h(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function mh(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function gh(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ei(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function hh(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function yd(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function bh(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):yd(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${yd(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${bd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${bd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function yh(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,d=null,p=null,m=null,$={},E=!1,q=!1,U={}){let oe=!!c&&c.position>0,J=!!c?.continuation_action&&c.continuation_action.continuation===null,P=!!c&&c.active===!0,F=c&&c.failure||null,C=_h(c?c.waiting:null,m),j=r[e]||null,S=j&&j.gate?j.gate:null,N=j&&j.pr?j.pr:null,K=hh(m),be=mh(c?c.resolution:null),re=gh(c?c.head_review:null),ve=c&&c.head_review||null,He=c&&c.authority||null,We=!!ve&&["pending","reviewing","revising"].includes(ve.state),Fe=oe&&!P&&(ve?.state==="failed"||!He||He.source==="automatic"&&!q),ne=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":be?be.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":C,ce=!!S&&S.base_badge==="\uCDA9\uB3CC",we=!!S&&S.enabled===!0,x=us({bead_id:e,merge_sha:U.merge_sha,cleanup_cursor:U.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:U.repo_operations}),_e=xo(x),G=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!S&&S.tier==="merged",ae=l&&!!n&&!!S&&S.tier==="merged",ke=Fe&&(we||ce||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||G||ae),Ne=l&&ce&&u===!1,$e=br($,e,{external:l,merge_active:P||x?.step==="merge",merge_queued:oe,conflict_active:!!a,cleanup_active:_e,merged:!!n||S?.tier==="merged"}),Ve=!!$e.operation,mt=!G&&!!n&&n.step==="repo_operations",Pe=bh({continuation_required:J,merge_step:x,conflict_badge:ne,conflict_live:be?.live===!0||a==="running",head_review:ve&&re?{...re,state:ve.state,failure_reason:ve.failure_reason}:null,recovery:K,cleanup_failed:n,cleanup_label:n?en(n.step):null,base_exception:p,conflicting:ce,gate:S,receipt_check:j&&j.receipt_check?j.receipt_check:null,queue_failure:F,auto_skip:d,queued:oe,queue_active:P,queue_position:c?c.position:0,activity:ne?null:o&&o.activity||null}),it=Pe?.live===!0&&Pe.title?i`<span title=${Pe.title}>${Pe.label}</span>`:Pe?.label||null;return{id:e,title:l?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&x?.active!==!0?$o(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:E,external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",completion_badge:Pe?.live!==!0&&Pe?.title?Pe.label:null,completion_title:Pe?.title||"",completion_repair_pr_url:K?K.repair_pr_url:"",completion_repair_pr_number:K?K.repair_pr_number:null,badges:it?[it]:[],live_badge:Pe?.live===!0?it:null,usage:s,alert:Pe?.alert===!0,merge_action:S?.tier==="merged"&&!G&&!ae||mt?!1:!oe||J||Fe,timeline_action:mt,cancel_action:oe&&!J,cancel_enabled:(!P||We)&&!(K&&K.lock_actions),cancel_title:K&&K.lock_actions?`${K.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:P&&!We?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":We?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:$e,discard_action:$e.action,merge_step:x,discard_enabled:$e.enabled,discard_title:$e.title,merge_enabled:!x&&!a&&!Ve&&!p&&!(K&&K.lock_actions)&&!Ne&&!mt&&(we||ce||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||G||ae||ke),merge_label:J?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":G||ae?"\uC815\uB9AC \uC7AC\uAC1C":ce&&!x&&!G?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":S?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Fe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ve?$e.error?`\uD3D0\uAE30 \uC2E4\uD328: ${$e.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${$e.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:J?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":x?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${x.label}`:ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ne?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":G?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ce?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":we?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ti(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:d,onDoneRangeChange:p}=t,m=n?Os(n,l):null,$=Ns({transport:r,uiOrderStore:l}),E=null,q=[],U=Qg(),oe=null,J=nh(),P=sr(d)?d:oh(),F=new Map;function C(){let f=Er.find(w=>w.value===P);return f?f.label:"\uC624\uB298"}let j=lh(),S=!1,N=new Set,K=new Set,be=new Set,re=new Set,ve=new Set,He={},We=null,Fe=0,ne=null,ce=[];function we(f){return We===f?He:{}}async function x(){if(!r)return;let f=u?.()||"";if(We===f||ne&&ne.key===f&&ne.generation===Fe)return;let w=++Fe;ne={key:f,generation:w};let W=null;try{W=await Promise.resolve(r("get-session-defaults",{}))}catch(_){if(w!==Fe)return;ne=null,Hg("get-session-defaults failed: %o",_),ue();return}w===Fe&&(He=W&&typeof W.values=="object"&&W.values!==null?{...W.values}:{},We=f,ne=null,ue())}function _e(){We=null,Fe+=1,x()}let G=document.createElement("div");G.className="worker-console";let ae=document.createElement("div");ae.className="worker-top";let ke=document.createElement("div");ke.className="worker-drawer-overlay",ke.hidden=!0;let Ne=document.createElement("div");Ne.className="worker-drawer-overlay__backdrop";let $e=document.createElement("div");$e.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,ke.append(Ne,$e,Ve);let mt=document.createElement("div");mt.className="worker-lanes-host",G.append(ae,ke,mt),e.appendChild(G);let Pe=null,it=null,Je=$n($e,{transport:r,sessionLogStore:a,onClose:()=>{Pe=null,it=null,ke.hidden=!0,ue()}}),V=fd(Ve,{onClose:()=>{Ve.hidden=!0,ke.hidden=!0,ue()}}),ee=od({getWorkspacePath:u||(()=>"")}),me=u&&u()||"",Ke=ad({queueStore:s,transport:r,onChanged:()=>ue(),onOpenScript:(f,w)=>{ee.open(f,w)}}),ze=o?td(G,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(f,w)=>Rt(f,w)}):null;function Ye(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ao,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Qe(){let f=Ye(),w=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,W=Array.isArray(f.serial_lanes)?f.serial_lanes:[],_=[];for(let ie of W){if(_.length>=w)break;!ie||typeof ie.id!="string"||!/^s[1-5]$/.test(ie.id)||!Array.isArray(ie.entries)||_.push({id:ie.id,label:`\uC9C1\uB82C ${ie.id.slice(1)}`,count:ie.entries.length})}return _.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},..._]}function ht(f){if(!oe||!f.some(W=>W.id===oe))return null;let w=Qe();return w?{bead_id:oe,lanes:w}:null}function Be(){let f=Ye();return typeof f.revision=="number"?f.revision:0}function Re(f){f&&f.queue&&s&&s.set(f.queue)}function Ue(){let f=Ye().queue;return Array.isArray(f)?f.length:0}async function Lt(f,w,W){if(!r)return;let _=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},...W===void 0?{}:{index:W},expected_revision:Be()}),b=await r("worker-queue-place",_());Re(b),b&&b.conflict&&await r("worker-queue-place",_()).then(Re)}async function tt(f,w,W){if(!r)return;let _=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},to_index:W,expected_revision:Be()}),b=await r("worker-queue-reorder",_());Re(b),b&&b.conflict&&await r("worker-queue-reorder",_()).then(Re)}async function _t(f){if(!r)return;let w=await r("worker-queue-remove",{bead_id:f,expected_revision:Be()});Re(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:f,expected_revision:Be()}).then(Re)}async function ut(f){if(!r||!f)return;let w=await r("worker-attempt-pause",{attempt_id:f});w&&w.paused===!1&&w.reason&&he(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function et(f){if(!r||!f)return;let w=await bn();if(w===null)return;let W=async(b={})=>await r("worker-attempt-resume",{attempt_id:f,expected_revision:Be(),...w!==""?{instructions:w}:{},...b}),_=await W();Re(_),_&&_.conflict&&(_=await W(),Re(_)),_=await vr(_,(b,ie)=>W({continuation:b,decision_token:ie}),{onResult:Re,refresh:()=>W()}),_&&_.resumed===!1&&!_.conflict&&_.reason&&he(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function rt(f){if(!r||!f)return;let w=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:Be()});Re(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:Be()}),Re(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&he(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function nt(f,w,W=!0){if(!r)return null;let _=r,b=await _(f,{...w,expected_revision:Be()});return Re(b),b&&b.conflict&&W&&(b=await _(f,{...w,expected_revision:Be()}),Re(b)),b}async function L(f){if(!r||!f)return;let w=Ye().merge_queue?.find(_=>_.bead_id===f)?.continuation_action;if(w?.mismatch&&w.continuation===null){await le(f,w.mismatch);return}N.add(f),ue();let W;try{W=await nt("worker-merge-queue-add",{bead_id:f})}finally{N.delete(f),ue()}!W||W.conflict||W.applied||he(fh(W.reason),"error",2400)}async function Q(f){if(!(!r||!f||K.has(f))){K.add(f),ue();try{let w=await r("worker-cleanup-retry",{bead_id:f,expected_revision:Be()});Re(w),w&&!w.retried&&!w.conflict&&w.reason&&he(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{K.delete(f),ue()}}}async function le(f,w){let W=await vr({continuation_mismatch:w},(b,ie)=>nt("worker-merge-queue-add",{bead_id:f,continuation:b,decision_token:ie},!1)),_=W?.queue?.merge_queue?.find(b=>b.bead_id===f)?.continuation_action;if(W?.applied!==!0&&_?.continuation===null&&_.mismatch){await le(f,_.mismatch);return}W&&W.applied===!1&&!W.conflict&&he("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Le(f){if(!r)return;let w=await nt("worker-merge-auto-toggle",{on:f});!w||w.conflict||he(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function I(f){if(!r||!f)return;let w=await nt("worker-merge-queue-remove",{bead_id:f});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&he("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function H(){await nt("worker-merge-queue-remove",{all:!0})}async function Te(f,w=null,W="unmerged",_=null){if(!r||!f)return;let b=as(f,W);if(!(!!_||typeof globalThis.confirm!="function"||globalThis.confirm(b)))return;let se=await r("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},..._?{operation_id:_}:{},expected_revision:Be()});if(Re(se),se&&se.conflict&&(se=await r("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},..._?{operation_id:_}:{},expected_revision:Be()}),Re(se)),se&&se.discarded===!0){he(ho(se),"success",5e3);return}if(se&&se.reason){he(`\uD3D0\uAE30 \uC2E4\uD328: ${se.reason}`,"error",2800);return}if(se&&se.accepted&&se.pending==="merged_revert"){he("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(se&&se.accepted&&!se.discarded){he(`\uD3D0\uAE30 \uC9C4\uD589: ${se.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}se&&!se.conflict&&he("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Oe(f,w,W){if(!(!r||!w||!W||re.has(w))){re.add(w),ue();try{let _=await r(f,{bead_id:w,action_id:W,expected_revision:Be()});Re(_),_?.conflict?he("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!_?.ok&&_?.reason&&he(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(_.reason)}`,"error",2800)}finally{re.delete(w),ue()}}}async function xe(f,w){if(!r||!w||be.has(w))return;be.add(w),ue();let W;try{let _=async(b={})=>await r(f,{bead_id:w,expected_revision:Be(),...b});W=await _(),Re(W),W&&W.conflict&&(W=await r(f,{bead_id:w,expected_revision:Be()}),Re(W)),f==="worker-revise-fix"&&(W=await vr(W,(b,ie)=>_({continuation:b,decision_token:ie}),{onResult:Re,refresh:()=>_()}))}finally{be.delete(w),ue()}if(!(!W||W.conflict)){if(W.ok){he(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}he(`\uCC98\uBD84 \uAC70\uBD80: ${W.reason||""}`,"error",3e3)}}async function M(f){if(!r)return;let w=await r("worker-automation-toggle",{on:f,expected_revision:Be()});Re(w),w&&w.conflict&&await r("worker-automation-toggle",{on:f,expected_revision:Be()}).then(Re)}async function X(f){if(!r||!f)return;let w=await r("worker-repo-operation-repair",{operation_id:f});if(Re(w),w&&w.ok===!1){he(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&he("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function pe(f){if(!r||!f)return;let w=await r("worker-repo-operation-dismiss",{operation_id:f});Re(w),w&&w.ok===!1&&he(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function v(f){if(!r||!Number.isFinite(f))return;let w=Math.max(Ao,Math.floor(f)),W=await r("worker-queue-set-slots",{slots:w,expected_revision:Be()});Re(W),W&&W.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:Be()}).then(Re)}async function T(f){if(!r||!Number.isInteger(f)||f<1||f>_d)return;let w=Ye(),W=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(f).reduce((ie,se)=>ie+(Array.isArray(se?.entries)?se.entries.length:0),0),_=()=>({count:f,expected_revision:Be()}),b=await r("worker-queue-set-serial-lane-count",_());Re(b),b&&b.conflict&&(b=await r("worker-queue-set-serial-lane-count",_()),Re(b)),b&&b.applied&&W>0&&he(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${W}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function O(){let f=Ye(),w=m?m.selectBoardColumn(Gg,"ready"):[],W=m?m.selectBoardColumn(Vg,"blocked"):[],_=m?m.selectBoardColumn(Zg,"closed"):[],b=m?m.selectBoardColumn(Kg,"in_progress"):[],ie=m?m.selectBoardColumn(Yg,"resolved"):[],se=Ps([...w,...W,...b,...ie,..._]),Me=new Map;for(let h of[...w,...W,...b])h&&h.id&&!Me.has(h.id)&&Me.set(h.id,h);let ye={...we(u?.()||"")};for(let h of["orchestration_model","orchestration_effort","orchestration_speed"]){let B=f[h];typeof B=="string"&&(ye[h]=B)}function k(h,B){let fe=Me.get(h);if(!fe)return null;let je=fe.metadata&&typeof fe.metadata=="object"?fe.metadata:{},ct=fe.workflow?.route,qt=je.route,Mt=gd(ct)?ct:gd(qt)?qt:null;return ar({pin:je,global:ye,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Mt,controller_runtime:B})}function Y(h){let B=h.runner||null,fe=k(h.bead_id,B),je=wo(h),ct=fe?Cn(fe,B):null;return je||ct?{orchestration:je,worker:ct}:null}let D=new Map;function Ee(h){if(D.has(h))return D.get(h)??null;let B=k(h,null),fe=null;if(B){let je=Sr(f.runner_catalog??null,B.orchestration_model.value??""),ct=je===null?B:k(h,je),qt=is(ct,f.runner_catalog??null),Mt=Cn(ct,je);fe=qt||Mt?{orchestration:qt,worker:Mt}:null}return D.set(h,fe),fe}function lt(h){let B=Ms(se,h);return B.total===0?null:B}let ot=f.bead_titles||{},Ze=new Map;for(let[h,B]of Object.entries(ot))typeof B=="string"&&B.length>0&&Ze.set(h,B);for(let h of[...w,...W])Ze.set(h.id,h.title||h.id);let Xe=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},Tt=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},Xt=new Map;for(let[h,B]of Object.entries(Tt))Array.isArray(B)&&Xt.set(h,Za(B));for(let h of[...w,...W]){let B=h.labels;Array.isArray(B)&&!Xt.has(h.id)&&Xt.set(h.id,Za(B))}let tn=new Map,rn=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(rn)?rn:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let B=h.members.map(je=>{let ct=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(qt=>qt.entries.some(Mt=>Mt.bead_id===je));return ct?ct.id:null});if(!(B.every(je=>je!==null)&&new Set(B).size===1))for(let je of h.members)tn.set(je,h.members.filter(ct=>ct!==je))}let fs=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},nn=new Map;for(let[h,B]of Object.entries(Xe))B&&typeof B=="object"&&nn.set(h,B);for(let h of[...w,...W])nn.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let Nr=h=>nn.get(h)||{},qr=f.pr_wait||[],sn=f.pr_observations||{},_s=f.pr_activity||{},qe=f.cleanup_failed||{},St=Object.entries(qe).map(([h,B])=>({bead_id:h,step:B&&B.step?B.step:"",reason:B&&B.reason?B.reason:"",at:B&&typeof B.at=="number"?B.at:null,detail:B&&typeof B.detail=="string"?B.detail:null,output_tail:B&&typeof B.output_tail=="string"&&B.output_tail?B.output_tail:void 0,log_path:B&&typeof B.log_path=="string"&&B.log_path?B.log_path:void 0,retry_count:B&&typeof B.retry_count=="number"&&Number.isInteger(B.retry_count)&&B.retry_count>0?B.retry_count:0,failure_code:B&&typeof B.failure_code=="string"?B.failure_code:void 0,subject_id:B&&typeof B.subject_id=="string"?B.subject_id:void 0,repair_eligible:!!(B&&B.repair_eligible),repair:B&&B.repair?B.repair:void 0})),on=f.queue||[],Md=new Set([...on.map(h=>h.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(B=>B.bead_id)),...qr.map(h=>h.bead_id),...f.done.map(h=>h.bead_id)]),Nd=new Set(W.map(h=>h.id)),qd=l?l.get()?.order||{}:{},oi=new Set,ai=[];for(let h of[...w,...W])Md.has(h.id)||oi.has(h.id)||dh(h)||(oi.add(h.id),ai.push(h));q=uh(ai,J,qd);let Fd=f.admission||{},ii=h=>{let B=Fd[h];if(!B)return"";if(B.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let fe=typeof B.reason=="string"?B.reason:"",je=fe.indexOf(":");return je>0&&je<fe.length-1?`\u26D4 ${fe.slice(0,je)} (${fe.slice(je+1)})`:`\u26D4 ${fe}`},jd=q.map(h=>{let B=no(h),fe=B.path.length>0,je=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",ct=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,qt=Object.hasOwn(h,"labels")&&ed(h.labels),Mt=!qt&&(je?ct:fe&&!B.conflict),vt=Nd.has(h.id),dr=[];vt&&dr.push(ph(h)),je&&!ct?dr.push("missing_description"):!je&&B.conflict?dr.push("spec_id_conflict"):!je&&!fe&&dr.push("spec \uC5C6\uC74C");let ks=ii(h.id);return ks&&dr.push(ks),{id:h.id,title:h.title||h.id,reason:dr.join(" \xB7 "),draggable:Mt,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:je,status:h.status,worker_ineligible:qt,blocked:vt,has_spec:fe,exec_chips:Ee(h.id)}}),Eo=eh(jd,U),Bd=Eo.visible,Ud=f.revise_parked||{},ms=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},To=(h,B)=>h.map((fe,je)=>{let ct=B!=="done",qt=B!=="done"&&B!=="queue",Mt=ct?Ud[fe.bead_id]:null,vt=ct?br(ms,fe.bead_id):null,dr=vt?.operation?vt:null,ks=ct&&Xt.get(fe.bead_id)===!0,Ii=fs[fe.bead_id]||[],Oo=f.admission&&typeof f.admission=="object"?f.admission[fe.bead_id]:null,Do=ct?su(Oo,!!dr||re.has(fe.bead_id)):null,tp=ct&&!Do?ii(fe.bead_id):null,rp=ct?[tp]:[],Li=ct&&Ii.length>0&&typeof Oo?.reason=="string"&&Oo.reason.startsWith("not_ready")?[`\u23F8 ${Ii.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Po=ct?tn.get(fe.bead_id):void 0;return Po&&Po.length>0&&Li.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Po.join(", ")}\uC640`),{id:fe.bead_id,title:Ze.get(fe.bead_id)||fe.bead_id,reason:rp.filter(Boolean).join(" \xB7 "),draggable:ct&&!dr&&!Do,done:B==="done",lane:B,seq:qt?je+1:void 0,worker_serial:ks,discard:dr,stale_work:Do,badges:[...Li,...Mt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Mt,revise_action:!!Mt,revise_enabled:!!Mt&&!dr&&!be.has(fe.bead_id),revise_title:Mt?Mt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Mt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:B==="done"?ir(f.attempts||{},fe.bead_id):null,work_ms:B==="done"?mo(f.attempts||{},fe.bead_id):null,done_at:B==="done"&&typeof fe.added_at=="number"?fe.added_at:void 0,exec_chips:ct?Ee(fe.bead_id):null,...Nr(fe.bead_id)}}),an=f.attempts?Object.values(f.attempts):[],Co=new Set;for(let h of an)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&Co.add(h.resumed_from);let li=new Map;for(let h of an)li.set(h.bead_id,h.attempt_id);let gs=new Map;for(let h of an)gs.set(h.attempt_id,h);function Ro(h){let B=new Set,fe=h;for(;fe&&!B.has(fe.attempt_id);){if(fe.conflict_resolution===!0)return!0;B.add(fe.attempt_id),fe=typeof fe.resumed_from=="string"&&fe.resumed_from.length>0&&gs.get(fe.resumed_from)||null}return!1}let hs=typeof f.declared_base=="string"?f.declared_base:null;function Wd(h){let B=null;for(let fe of an)!fe||fe.bead_id!==h||Ro(fe)||(B===null||(typeof fe.started_at=="number"?fe.started_at:0)>=(typeof B.started_at=="number"?B.started_at:0))&&(B=fe);return B&&typeof B.target_base=="string"?B.target_base:null}let ci=[],ui=[],zd=Ju(f),di=h=>{let B=typeof h.session_id=="string"&&h.session_id.length>0,fe=Co.has(h.attempt_id);return{eligible:B&&!fe,reason:B?fe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},ur=null;for(let h of an){let B=h.status==="paused"&&!Co.has(h.attempt_id);if(h.status==="running"||B)ui.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Ze.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:B,conflict_resolution:Ro(h),base_exception:ei(hs,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:br(ms,h.bead_id,{attempt_id:h.attempt_id}),usage:ir(f.attempts||{},h.bead_id),rollup:lt(h.bead_id),rollup_expanded:ve.has(h.bead_id),exec_chips:Y(h),...Nr(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&zd(h)){let fe=di(h);ci.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Ze.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:br(ms,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:fe.eligible,resume_reason:fe.reason,conflict_resolution:Ro(h),base_exception:ei(hs,h.target_base),usage:ir(f.attempts||{},h.bead_id),rollup:lt(h.bead_id),rollup_expanded:ve.has(h.bead_id),exec_chips:Y(h),...Nr(h.bead_id)}),ur=h}}let bs=[...ci,...ui].map(h=>{let B=gs.get(h.attempt_id),fe=B?.quickfix_landing;if(B?.quickfix_lane!==!0||!fe||typeof fe!="object")return h;let je=typeof fe.reason=="string"&&fe.reason.length>0?fe.reason:null,ct=us({bead_id:B.bead_id,merge_sha:fe.head_sha,cleanup_cursor:fe.cursor,cleanup_failed:je?{step:fe.cursor,reason:je}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return ct?{...h,landing:ct}:h}),pi=null;if(ur){let h=di(ur),B=ur.cause_detail;pi={bead_id:ur.bead_id,repo:ur.repo||"",reason:ur.cause||ur.status,cause_detail:B&&typeof B.reason=="string"?{reason:B.reason,command:typeof B.command=="string"?B.command:null}:null,resume_attempt_id:ur.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:br(ms,ur.bead_id,{attempt_id:ur.attempt_id})}}let fi=new Set(bs.map(h=>h.bead_id)),Io=Array.isArray(f.merge_queue)?f.merge_queue:[],_i=new Map,mi=new Map,gi=new Map,hi=new Map,bi=new Map;Io.forEach((h,B)=>{h&&typeof h.bead_id=="string"&&(_i.set(h.bead_id,B+1),mi.set(h.bead_id,h.resolution),gi.set(h.bead_id,h.continuation_action||null),hi.set(h.bead_id,h.head_review||null),bi.set(h.bead_id,h.authority||null))});let ln=f.merge_queue_state||{active:null,failures:{}},Hd=ln.failures||{},yi=ln.waiting&&typeof ln.waiting.bead_id=="string"&&typeof ln.waiting.reason=="string"?ln.waiting:null,Gd=f.auto_merge_skips||{},vi=h=>{let B=Gd[h];if(!B)return null;let fe=sn[h],je=fe&&fe.pr?fe.pr.head_sha:null;return je&&je===B.head_sha?B.reason||"":null},ys=new Map;for(let h of bs)h.failed!==!0&&h.conflict_resolution&&(h.paused?ys.has(h.bead_id)||ys.set(h.bead_id,"paused"):ys.set(h.bead_id,"running"));let wi=bs.filter(h=>!h.paused&&h.failed!==!0).length,ki=(f.workspace_info||{}).slots,$i=typeof ki=="number"?ki:typeof f.slots=="number"?f.slots:Ao,Vd=wi>$i,vs=zr(P),Kd=(Array.isArray(f.done)?f.done.slice():[]).filter(h=>vs===void 0||typeof h.added_at!="number"||h.added_at>=vs).sort((h,B)=>(B.added_at||0)-(h.added_at||0)),In=To(Kd,"done"),Yd=new Set((Array.isArray(f.done)?f.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),xi=[],Zd=u?.()||"";for(let h of _){let B=Vr(h.closed_at);if(typeof h.id!="string"||Yd.has(h.id)||B===null||vs!==void 0&&B<vs||typeof h.comment_count!="number"||h.comment_count<=0)continue;let fe=`${Zd}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,je=F.get(fe);je===void 0&&r&&(F.set(fe,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(ct=>{let qt=Array.isArray(ct)&&ct.some(Mt=>so(typeof Mt?.text=="string"?Mt.text:"")?.lane==="session");F.set(fe,qt?"session":"not-session"),ue()}).catch(()=>{F.set(fe,"failed"),ue()})),je==="session"&&xi.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:B,created_at:h.created_at,updated_at:h.updated_at})}In.push(...xi),In.sort((h,B)=>(B.done_at||0)-(h.done_at||0));let ws={};for(let h of yn)ws[h]=0;let Ai=!1,Si=0,Lo=0,Ei=0;for(let h of In){let B=h.usage;if(B&&typeof B=="object"){let fe=!1;for(let je of yn)Number.isFinite(B[je])&&(ws[je]+=B[je],Ai=!0,fe=!0);fe&&(Lo+=1,Number.isFinite(B.total_cost_usd)&&(Si+=B.total_cost_usd,Ei+=1))}}Lo>0&&Ei===Lo&&(ws.total_cost_usd=Si);let Ti=In.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),Xd=Ti.length>0?Bt(ql(Ti)):Ai?Zr(ws):null,Qd=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},Jd=Array.isArray(f.serial_lanes)?f.serial_lanes:[],Ci=h=>{if(qr.some(je=>je.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let B=an.filter(je=>je&&je.bead_id===h),fe=B.length>0?B[B.length-1].status:null;return fe==="failed"||fe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":fe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ri=Jd.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,B)=>{let fe=Qd[h.id]||{},je=new Map((Array.isArray(fe.corrections)?fe.corrections:[]).filter(vt=>vt&&typeof vt.bead_id=="string"&&typeof vt.after=="string").map(vt=>[vt.bead_id,vt.after])),ct=To(h.entries.filter(vt=>!fi.has(vt.bead_id)),h.id).map(vt=>je.has(vt.id)?{...vt,badges:[`\u{1F517} ${je.get(vt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...vt.badges]}:vt),qt=Array.isArray(fe.occupied_by)?fe.occupied_by.filter(vt=>typeof vt=="string"):[],Mt=qt.map(vt=>({id:vt,title:Ze.get(vt)||vt,draggable:!1,lane:h.id,ghost:!0,badges:[Ci(vt)]}));return{id:h.id,index:B+1,rows:[...Mt,...ct],occupied:qt.length>0,badge:qt.length>0?Ci(qt[0]):"\uB300\uAE30",cycle:fe.cycle===!0}}),ep=typeof f.serial_lane_count=="number"?f.serial_lane_count:Ri.length;return{queue:f,idToTitle:Ze,candidates:Bd,candidate_hidden:{blocked:Eo.hidden_blocked,spec:Eo.hidden_spec},running:bs,live_count:wi,slots:$i,over_cap:Vd,failure:pi,waiting:To(on.filter(h=>!fi.has(h.bead_id)),"queue"),serial_lanes:Ri,serial_lane_count:ep,pr_wait:qr.map(h=>yh(h.bead_id,Ze.get(h.bead_id)||h.bead_id,sn,qe[h.bead_id]||null,ir(f.attempts||{},h.bead_id),_s[h.bead_id]||(N.has(h.bead_id)||K.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ys.get(h.bead_id)||null,h.external===!0,{position:_i.get(h.bead_id)||0,active:ln.active===h.bead_id,failure:Hd[h.bead_id]||null,waiting:yi?.bead_id===h.bead_id?yi.reason:null,resolution:mi.get(h.bead_id),continuation_action:gi.get(h.bead_id),head_review:hi.get(h.bead_id)||null,authority:bi.get(h.bead_id)||null},h.wt_present!==!1,f.auto_merge===!0?vi(h.bead_id):null,ei(hs,Wd(h.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[h.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},gs.get(li.get(h.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(h=>({...h,...Nr(h.id)})),merge_queue_length:Io.length,merge_queue_running:Io.length>0,auto_excluded:qr.map(h=>h.bead_id).filter(h=>vi(h)!==null),declared_base:hs,done:In,token_total:Xd,cleanup_failures:St,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function te(){let w=!!o?.get()?.job,W=!w&&o?.isPending?.()===!0,_=w?"\uBD84\uC11D \uC911":W?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${_?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${_?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${_?i`<span class="worker-analysis-btn__badge">${_}</span>`:""}
    </button>`}function Se(f){let w=f.waiting.length>0?f.waiting[0].id:"\u2014",W=i`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,_=Z(f),b=f.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ie=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${C()} 완료 <b>${f.done.length}</b></span
      >`,se=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,Me=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ao}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:_d},(Y,D)=>D+1).map(Y=>i`<option
                value=${String(Y)}
                ?selected=${f.serial_lane_count===Y}
              >
                ${Y}
              </option>`)}
        </select>
      </label>
      ${o?te():""} `,ye=uu({failure:f.failure}),k=nu(f.repo_operations,f.cleanup_failures);return S?i`<div class="worker-ribbon">
          ${W} ${_}
          <div class="worker-kpi worker-kpi--ribbon">${b}${ie}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Me}</div>
          <div class="worker-kpi">${se}</div>
        </div>
        ${k}${Ke.template()}${ye}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${W}${_}${Me}</div>
        <div class="worker-kpi">
          ${b}${ie}${se}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${C()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Y=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Y.tooltip}
                >${C()} 완료 · 누적 ${Y.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${k}${Ke.template()}${ye}`}function Ae(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let w=f.running.some(W=>!W.paused&&W.failed!==!0);return i`<section
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
      ${f.running.length>0?Fa(f.running,Date.now(),Pe):""}
      ${f.pr_wait.map(W=>En(W))}
    </section>`}function g(f){let w=f.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${U.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${th.map(W=>i`<button
              type="button"
              class="worker-filter__chip${U.spec===W.value?" is-active":""}"
              data-spec=${W.value}
              aria-pressed=${U.spec===W.value?"true":"false"}
            >
              ${W.label}
            </button>`)}
        ${w.spec>0?i`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function y(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${J}
    >
      ${rh.map(f=>i`<option value=${f.value} ?selected=${J===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function R(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${P}
      >
        ${Er.map(f=>i`<option value=${f.value} ?selected=${P===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function z(f){let w=i`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,W=f.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return rr({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:w,controls:W})}function Z(f){let w=f.queue.auto_merge===!0;if(f.merge_queue_running)return i`<button
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
      </button>`;let W=new Set(f.auto_excluded),_=f.pr_wait.filter(b=>b.merge_action&&b.merge_enabled&&!W.has(b.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${_>0?` ${_}`:""}
    </button>`}function ge(f){let w=rr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:y(),controls:g(f),place_menu:ht(f.candidates)});return S?i`<div class="worker-lanes worker-lanes--mobile">
        ${Ae(f)}
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:j.queue,preview:hd(f.waiting)})}
        ${f.serial_lanes.map(W=>z(W))}
        ${w}
        ${rr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:R(),collapsible:!0,collapsed:j.done,preview:Array.isArray(f.token_total)?f.token_total.map(W=>W.label).join(" \xB7 "):f.token_total||hd(f.done)})}
      </div>`:i`<div class="worker-lanes">
      ${w}
      <div class="worker-wait">
        ${rr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(W=>z(W))}
      </div>
      ${rr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(W=>!W.paused&&W.failed!==!0),body:Fa(f.running,Date.now(),Pe)})}
      ${rr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${rr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${C()} ${f.done.length}`,items:f.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:R()})}
    </div>`}function De(f){j={...j,[f]:!j[f]},ch(j),ue()}function ue(){let f=O();Ge(Se(f),ae),Ge(ge(f),mt)}function dt(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(ih);S=!!f.matches;let w=W=>{let _=!!(W&&typeof W.matches=="boolean"?W.matches:f.matches);_!==S&&(S=_,ue())};typeof f.addEventListener=="function"?(f.addEventListener("change",w),ce.push(()=>f.removeEventListener("change",w))):typeof f.addListener=="function"&&(f.addListener(w),ce.push(()=>f.removeListener(w)))}let kt=null;function Ot(f){kt=f.target instanceof Element?f.target:null}function $t(f){let W=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!W)return;if(kt&&W.contains(kt)&&kt.closest("input, button, a")){f.preventDefault();return}let _=W.dataset.beadId||"",b=W.dataset.lane||"";E={bead_id:_,from_lane:b};try{f.dataTransfer?.setData("text/plain",_),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function Dt(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;let W=w.dataset.lane||"";W!=="candidate"&&W!=="queue"&&!/^s[1-5]$/.test(W)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function Pt(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Yt(f,w){let W=q.find(se=>se.id===f);if(!W)return;let _=q.filter(se=>se.id!==f),b=_.length;if(w){let se=w.dataset.beadId;if(se===f)return;let Me=_.findIndex(ye=>ye.id===se);Me>=0&&(b=Me)}let ie=_.slice();ie.splice(b,0,W),$.applyReorder(f,ie,b)}function cr(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;f.preventDefault(),w.classList.remove("worker-pane--drag-over");let W=w.dataset.lane||"",_=E?.bead_id||f.dataTransfer?.getData("text/plain")||"",b=E?.from_lane||"";if(E=null,!_)return;let ie=f.target?.closest?.(".worker-mini, .worker-card"),se=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),Me=se.length;if(ie){let ye=se.indexOf(ie);ye>=0&&(Me=ye)}if(Me=Math.max(0,Me-w.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(Me=Ue()),W==="candidate"){if(b==="candidate"){Yt(_,ie);return}(b==="queue"||/^s[1-5]$/.test(b))&&_t(_);return}if(W==="queue"||/^s[1-5]$/.test(W)){let ye=W==="queue"?"parallel":W;b===W?tt(_,ye,Me):Lt(_,ye)}}function gr(f){U=f,Jg(f),ue()}function st(f){J=f==="board"||f==="created"||f==="spec"?f:So,sh(J),ue()}function Zt(f){P=sr(f)?f:Qt,ah(P),p?.(P),ue()}function Ie(f){let w=f.target?.closest?.(".worker-serial-lane-count");if(w){let Me=Number.parseInt(w.value,10);Number.isFinite(Me)&&T(Me).then(ue);return}let W=f.target?.closest?.(".worker-filter__blocked");if(W){gr({...U,show_blocked:W.checked});return}let _=f.target?.closest?.(".worker-done-range");if(_){Zt(_.value);return}let b=f.target?.closest?.(".worker-sort");if(b){st(b.value||So);return}let ie=f.target?.closest?.(".worker-slots__input");if(!ie)return;let se=Number.parseInt(ie.value,10);if(!Number.isFinite(se)){ue();return}v(se).then(ue)}function A(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function de(){let f=O();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Ce(){Pe&&Je.close(),Ve.hidden=!1,ke.hidden=!1,V.open(de()),ue()}function pt(f){let w=Ye(),W=w.attempts?w.attempts[f]:null;Pe=f,it=null,V.close(),Ve.hidden=!0,ke.hidden=!1,Je.open({attempt_id:f,meta:A(W)}),ue()}function Rt(f,w){Pe=null,it=f,V.close(),Ve.hidden=!0,ke.hidden=!1,Je.open({attempt_id:f,meta:w,hide_prompt:!0}),ue()}function bt(){if(V.isOpen()&&V.refresh(de()),it){let W=(o?.get()?.runs||[]).find(_=>_.run_id===it);W?Je.updateMeta(Qa(W)):Je.close();return}if(!Pe)return;let f=Ye(),w=f.attempts?f.attempts[Pe]:null;if(w){Je.updateMeta(A(w));return}Je.close()}function It(f){let w=f.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-parallel-analysis-dialog"))return;if(w?.closest?.(".worker-analysis-btn")){ze?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){Ce();return}let W=w?.closest?.(".worker-repo-op__session");if(W){let qe=W.dataset.attemptId;qe&&pt(qe);return}let _=w?.closest?.(".worker-repo-op__resolve");if(_){X(_.dataset.operationId||"");return}let b=w?.closest?.(".worker-repo-op__dismiss");if(b){pe(b.dataset.operationId||"");return}let ie=w?.closest?.(".worker-cleanup__resume");if(ie){let qe=ie.dataset.beadId;qe&&Q(qe);return}let se=w?.closest?.(".worker-banner__resume");if(se){let qe=se.dataset.attemptId;qe&&et(qe);return}let Me=w?.closest?.(".worker-banner__discard");if(Me){let qe=Me.dataset.confirmation==="merged"?"merged":"unmerged";Te(Me.dataset.beadId||"",Me.dataset.attemptId||null,qe,Me.dataset.operationId||null);return}let ye=w?.closest?.(".worker-banner__dismiss");if(ye){let qe=ye.dataset.attemptId;qe&&rt(qe);return}if(w?.closest?.(".worker-play")){M(!Ye().auto_advance);return}let k=w?.closest?.(".worker-merge-all");if(k){k.classList.contains("worker-merge-all--stop")?Ye().auto_merge===!0?Le(!1):H():Le(!0);return}let Y=w?.closest?.(".worker-pane__hd--toggle");if(Y){let qe=Y.dataset.lane;(qe==="queue"||qe==="done")&&De(qe);return}let D=w?.closest?.(".worker-card__place-lane");if(D){let qe=D.dataset.beadId,St=D.dataset.lane;qe&&(St==="parallel"||/^s[1-5]$/.test(St||""))&&(oe=null,ue(),Lt(qe,St));return}if(w?.closest?.(".worker-card__place-cancel")){oe=null,ue();return}let lt=w?.closest?.(".worker-card__place");if(lt){let qe=lt.dataset.beadId;qe&&!lt.disabled&&(Qe()?(oe=qe,ue()):Lt(qe,"parallel"));return}let ot=w?.closest?.(".worker-filter__chip");if(ot){let qe=ot.dataset.spec;(qe==="all"||qe==="with"||qe==="without")&&gr({...U,spec:qe});return}let Ze=w?.closest?.(".worker-mini__merge");if(Ze){let qe=Ze.dataset.beadId||"";Ye().cleanup_failed?.[qe]?Q(qe):L(qe);return}let Xe=w?.closest?.(".worker-mini__merge-cancel");if(Xe){I(Xe.dataset.beadId||"");return}let Tt=w?.closest?.(".worker-mini__discard");if(Tt){Te(Tt.dataset.beadId||"",Tt.dataset.attemptId||null,Tt.dataset.discardMode==="merged"?"merged":"unmerged",Tt.dataset.operationId||null);return}let Xt=w?.closest?.(".worker-mini__stale-continue");if(Xt){Oe("worker-stale-work-continue",Xt.dataset.beadId||"",Xt.dataset.actionId||"");return}let tn=w?.closest?.(".worker-mini__stale-backup");if(tn){Oe("worker-stale-work-backup-fresh",tn.dataset.beadId||"",tn.dataset.actionId||"");return}let rn=w?.closest?.(".worker-mini__stale-recheck");if(rn){Oe("worker-stale-work-recheck",rn.dataset.beadId||"",rn.dataset.actionId||"");return}let fs=w?.closest?.(".worker-mini__revise-fix");if(fs){xe("worker-revise-fix",fs.dataset.beadId||"");return}let nn=w?.closest?.(".worker-mini__revise-approve");if(nn){xe("worker-revise-approve",nn.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let qe=w?.closest?.(".rtile"),St=qe?.dataset?.beadId,on=qe?.dataset?.attemptId;St&&Te(St,on||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let St=w?.closest?.(".rtile")?.dataset?.attemptId;St&&rt(St);return}if(w?.closest?.(".rtile__pause")){let St=w?.closest?.(".rtile")?.dataset?.attemptId;St&&ut(St);return}if(w?.closest?.(".rtile__resume")){let St=w?.closest?.(".rtile")?.dataset?.attemptId;St&&et(St);return}if(w?.closest?.(".rtile__session")){let St=w?.closest?.(".rtile")?.dataset?.attemptId;St&&pt(St);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){V.close(),Je.close();return}if(w?.closest?.(".worker-drawer-host"))return;let Nr=w?.closest?.(".rtile .board-card__roll-toggle");if(Nr){let qe=Nr.dataset.rollParent;qe&&(ve.has(qe)?ve.delete(qe):ve.add(qe),ue());return}let qr=w?.closest?.(".rtile .board-card__roll-child");if(qr){let qe=qr.dataset.childId;qe&&c&&c(qe);return}let sn=w?.closest?.(".rtile");if(sn){if(w?.closest?.(".rtile__id")){let St=sn.dataset.beadId;St&&Jt(St).then(on=>{on?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let qe=sn.dataset.beadId;qe&&c&&c(qe);return}let _s=w?.closest?.(".worker-mini, .worker-card");if(_s){let qe=_s.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){qe&&Jt(qe).then(St=>{St?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}qe&&c&&c(qe)}}return e.addEventListener("pointerdown",Ot),e.addEventListener("dragstart",$t),e.addEventListener("dragover",Dt),e.addEventListener("dragleave",Pt),e.addEventListener("drop",cr),e.addEventListener("click",It),e.addEventListener("change",Ie),dt(),m&&ce.push(m.subscribe(()=>{for(let[f,w]of F)w==="failed"&&F.delete(f);ue()})),s&&ce.push(s.subscribe(()=>{let f=u&&u()||"";f!==me&&(me=f,ee.close()),ue(),bt()})),o&&typeof o.subscribe=="function"&&ce.push(o.subscribe(()=>{bt(),ue()})),ue(),{load(){x(),ue()},refreshSessionDefaults:_e,destroy(){for(let f of ce.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",Ot),e.removeEventListener("dragstart",$t),e.removeEventListener("dragover",Dt),e.removeEventListener("dragleave",Pt),e.removeEventListener("drop",cr),e.removeEventListener("click",It),e.removeEventListener("change",Ie);try{Je.destroy()}catch{}ke.hidden=!0;try{ze?.destroy()}catch{}try{ee.destroy()}catch{}Ge(i``,e)}}}function ri(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function xd(e,t,r,n=async()=>{},s=async()=>{}){let o=xt("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function d(j){let N=j.target.value,be=t.getState().workspace?.current?.path||"";if(N&&N!==be){o("switching workspace to %s",N),l=!0,C();try{await r(N)}catch(re){o("workspace switch failed: %o",re)}finally{l=!1,C()}}}async function p(){let j=t.getState(),S=j.workspace?.current?.path||j.workspace?.available?.[0]?.path||"";if(!(!S||c)){o("git-pulling workspace %s",S),c=!0,C();try{await n(S)}catch(N){o("workspace git pull failed: %o",N)}finally{c=!1,C()}}}function m(j){let S=j.target;S&&e.contains(S)||q()}function $(j){j.key==="Escape"&&q()}function E(){u||(u=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",$),C())}function q(){u&&(u=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",$),C())}function U(){u?q():E()}async function oe(j){let S=j.target,N=S.value,K=S.checked;o("toggling visibility %s \u2192 %s",N,String(K));try{await s(N,K)}catch(be){o("workspace visibility toggle failed: %o",be)}}function J(j){return j?i`
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
    `:i``}function P(j,S){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${U}
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
                ${j.map(N=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${N.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${N.path}"
                        .checked=${!S.has(N.path)}
                        @change=${oe}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ri(N.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function F(){let j=t.getState(),S=j.workspace?.current,N=j.workspace?.available||[],K=new Set(j.workspace?.hidden||[]),be=S?.path||N[0]?.path||"";if(N.length===0)return i``;let re=N.filter(ve=>!K.has(ve.path)||ve.path===be);if(re.length<=1){let ve=re[0]||N[0],He=ri(ve.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ve.path}"
            >${He}</span
          >
          ${P(N,K)}
          ${J(be)}
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
          ${re.map(ve=>i`
              <option
                value="${ve.path}"
                ?selected=${ve.path===be}
                title="${ve.path}"
              >
                ${ri(ve.path)}
              </option>
            `)}
        </select>
        ${P(N,K)}
        ${J(be)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function C(){Ge(F(),e)}return C(),a=t.subscribe(()=>C()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",$),Ge(i``,e)}}}var Ad=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function ni(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Sd(e,t,r=ni()){return{id:r,type:e,payload:t}}function Ed(e={}){let t=xt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,d=[],p=new Map,m=new Set;function $(F){for(let C of Array.from(m))try{C(F)}catch{}}function E(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),$(o);let F=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),C=(r.jitterRatio||0)*F,j=Math.max(0,Math.round(F+(Math.random()*2-1)*C));t("ws retry in %d ms (attempt %d)",j,a+1),l=setTimeout(()=>{l=null,P()},j)}function q(F){try{s?.send(JSON.stringify(F))}catch(C){t("ws send failed",C)}}function U(){for(o="open",t("ws open"),$(o),a=0;d.length;){let F=d.shift();F&&q(F)}}function oe(F){let C;try{C=JSON.parse(String(F.data))}catch{t("ws received non-JSON message");return}if(!C||typeof C.id!="string"||typeof C.type!="string"){t("ws received invalid envelope");return}if(u.has(C.id)){let S=u.get(C.id);u.delete(C.id),C.ok?S?.resolve(C.payload):S?.reject(C.error||new Error("ws error"));return}let j=p.get(C.type);if(j&&j.size>0)for(let S of Array.from(j))try{S(C.payload)}catch(N){t("ws event handler error",N)}else t("ws received unhandled message type: %s",C.type)}function J(){o="closed",t("ws closed"),$(o);for(let[F,C]of u.entries())C.reject(new Error("ws disconnected")),u.delete(F);a+=1,E()}function P(){if(!c)return;let F=n();try{s=new WebSocket(F),t("ws connecting %s",F),o="connecting",$(o),s.addEventListener("open",U),s.addEventListener("message",oe),s.addEventListener("error",()=>{}),s.addEventListener("close",J)}catch(C){t("ws connect failed %o",C),E()}}return P(),{send(F,C){if(!Ad.includes(F))return Promise.reject(new Error(`unknown message type: ${F}`));let j=ni(),S=Sd(F,C,j);return t("send %s id=%s",F,j),new Promise((N,K)=>{u.set(j,{resolve:N,reject:K,type:F}),s&&s.readyState===s.OPEN?q(S):(t("queue %s id=%s (state=%s)",F,j,o),d.push(S))})},on(F,C){p.has(F)||p.set(F,new Set);let j=p.get(F);return j?.add(C),()=>{j?.delete(C)}},onConnection(F){return m.add(F),()=>{m.delete(F)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,P()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function vh(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function wh(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var si=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Td=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Pr="tab:worker:closed",kh="bdui.worker.done-range",Cd=Lu,Rd="worker:queue",Id="worker:parallel-analysis",Ld="ui:order",Od="ui:display-policy",Dd="exec:presets",Mr="tab:board:closed",Pd="beads-ui.board.closed-range";function $h(e){let t=xt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ge(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),l=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&Qu(a),l&&c&&u&&d){let _e=function(_,b){let ie="Request failed",se="";if(_&&typeof _=="object"){let ye=_;if(typeof ye.message=="string"&&ye.message.length>0&&(ie=ye.message),typeof ye.details=="string")se=ye.details;else if(ye.details&&typeof ye.details=="object")try{se=JSON.stringify(ye.details,null,2)}catch{se=""}}else typeof _=="string"&&_.length>0&&(ie=_);let Me=b&&b.length>0?`Failed to load ${b}`:"Request failed";x.open(Me,ie,se)},Re=function(_){return`${st.getState().workspace.current?.path||""}\0${_}`},Ue=function(){ee&&(ee().catch(()=>{}),ee=null),me=null,Ke=null},tt=function(_){ze=_;let b=()=>{ze!==_||st.getState().selected_id!==_||(ze=null,Lt(_))};if(!ht){Qe.then(b);return}b()},rt=function(_,b,ie,se,Me){return ie!==et[b]?(Me().catch(()=>{}),!1):(_.set(se,Me),!0)},L=function(){let _=st.getState();H(_.view==="board"),pe(_.view==="worker"),Se(_.view==="monitor"),T(_.view==="board"||_.view==="worker"||nt||!!_.selected_id)},Le=function(){let _=zr(Q);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},I=function(){let _=zr(le);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},H=function(_){if(_)for(let[b,ie]of si){if(_t.has(b)||ut.has(b))continue;let se=b===Mr?Le():{type:ie};try{Ne.register(b,se)}catch(k){t("register %s store failed: %o",b,k)}ut.add(b);let Me=et.board,ye=!1;ke.subscribeList(b,se).then(k=>{ye=!rt(_t,"board",Me,b,k)}).catch(k=>{t("subscribe %s failed: %o",b,k),_e(k,"board")}).finally(()=>{ut.delete(b),ye&&L()})}else xe()},xe=function(){et.board+=1;for(let[_]of si){let b=_t.get(_);b&&(b().catch(()=>{}),_t.delete(_));try{Ne.unregister(_)}catch(ie){t("unregister %s failed: %o",_,ie)}}},pe=function(_){if(!_){v();return}for(let[b,ie]of Td){if(M.has(b)||ut.has(b))continue;let se=b===Pr?I():{type:ie};try{Ne.register(b,se)}catch(k){t("register %s store failed: %o",b,k)}ut.add(b);let Me=et.worker,ye=!1;ke.subscribeList(b,se).then(k=>{ye=!rt(M,"worker",Me,b,k)}).catch(k=>{t("subscribe %s failed: %o",b,k),_e(k,"worker")}).finally(()=>{ut.delete(b),ye&&L()})}},v=function(){et.worker+=1;for(let[_]of Td){let b=M.get(_);b&&(b().catch(()=>{}),M.delete(_));try{Ne.unregister(_)}catch(ie){t("unregister %s failed: %o",_,ie)}}},T=function(_){if(!_){O();return}X||(ae("subscribe-worker-queue",{id:Rd}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),ae("subscribe-worker-parallel-analysis",{id:Id}).catch(b=>{t("subscribe-worker-parallel-analysis failed: %o",b)}),X=()=>(ae("unsubscribe-worker-parallel-analysis",{id:Id}),ae("unsubscribe-worker-queue",{id:Rd})))},O=function(){X&&(X().catch(()=>{}),X=null),Ve.clear()},Se=function(_){if(!_){Ae();return}te||(ae("subscribe-monitor-pipeline",{id:Cd}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),te=()=>ae("unsubscribe-monitor-pipeline",{id:Cd}))},Ae=function(){te&&(te().catch(()=>{}),te=null)},y=function(){g||(ae("subscribe-ui-order",{id:Ld}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),g=()=>ae("unsubscribe-ui-order",{id:Ld}))},R=function(){g&&(g().catch(()=>{}),g=null),Pe.clear()},Z=function(){z||(ae("subscribe-display-policy",{id:Od}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),z=()=>ae("unsubscribe-display-policy",{id:Od}))},ge=function(){z&&(z().catch(()=>{}),z=null),it.clear()},ue=function(){De||(ae("subscribe-impl-presets",{id:Dd}).catch(_=>{t("subscribe-impl-presets failed: %o",_)}),De=()=>ae("unsubscribe-impl-presets",{id:Dd}))},Pt=function(_){if(!_)return"Unknown";let b=_.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var p=_e,m=Re,$=Ue,E=tt,q=rt,U=L,oe=Le,J=I,P=H,F=xe,C=pe,j=v,S=T,N=O,K=Se,be=Ae,re=y,ve=R,He=Z,We=ge,Fe=ue,ne=Pt;let ce=document.getElementById("header-loading"),we=ml(ce),x=ru(e),G=Ed(),ae=we.wrapSend((_,b)=>G.send(_,b)),ke=il(ae),Ne=ll(),$e=dl(),Ve=ul(),mt=Gi(),Pe=cl(),it=zi(),Je=Hi(),V=Vi();G.on("impl-presets-snapshot",_=>{let b=_;b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&Je.set({revision:b.revision,presets:b.presets})}),G.on("monitor-pipeline-snapshot",_=>{let b=_;if(!(!b||!Array.isArray(b.workspaces)))try{mt.set(b.workspaces,b.workspaces_state)}catch{}}),G.on("ui-order-snapshot",_=>{let b=_;if(b&&typeof b.revision=="number")try{Pe.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),G.on("display-policy-snapshot",_=>{let b=_;if(b&&b.policy&&typeof b.policy=="object")try{it.set(b.policy)}catch{}}),G.on("session-log-snapshot",_=>{let b=_;if(b&&typeof b.id=="string")try{V.set(b.id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),G.on("session-log-append",_=>{let b=_;if(b&&typeof b.id=="string")try{V.append(b.id,b.event)}catch{}}),G.on("snapshot",_=>{let b=_,ie=b&&typeof b.id=="string"?b.id:"",se=ie?Ne.getStore(ie):null;if(se&&b&&b.type==="snapshot")try{se.applyPush(b)}catch{}}),G.on("upsert",_=>{let b=_,ie=b&&typeof b.id=="string"?b.id:"",se=ie?Ne.getStore(ie):null;if(se&&b&&b.type==="upsert")try{se.applyPush(b)}catch{}}),G.on("delete",_=>{let b=_,ie=b&&typeof b.id=="string"?b.id:"",se=ie?Ne.getStore(ie):null;if(se&&b&&b.type==="delete")try{se.applyPush(b)}catch{}});let ee=null,me=null,Ke=null,ze=null,Ye=()=>{},Qe=new Promise(_=>{Ye=()=>_(void 0)}),ht=!1,Be=!1;async function Lt(_){let b=Re(_);if(b===me||b===Ke)return;Ke=b;let ie=`detail:${_}`,se={type:"issue-detail",params:{id:_}};try{Ne.register(ie,se)}catch(Me){t("register detail store failed: %o",Me)}try{let Me=await ke.subscribeList(ie,se);if(st.getState().selected_id!==_||Re(_)!==b){await Me().catch(()=>{});return}ee&&await ee().catch(()=>{}),ee=Me,me=b}catch(Me){t("detail subscribe failed: %o",Me),_e(Me,"issue details")}finally{Ke===b&&(Ke=null)}}let _t=new Map,ut=new Set,et={board:0,worker:0},nt=!1,Q=Qt;try{let _=window.localStorage.getItem(Pd);sr(_)&&(Q=_)}catch{}let le=Qt;try{let _=window.localStorage.getItem(kh);sr(_)&&(le=_)}catch{}async function Te(_){if(!sr(_)||_===Q)return;Q=_;try{window.localStorage.setItem(Pd,_)}catch{}let b=_t.get(Mr);if(!b)return;_t.delete(Mr),await b().catch(()=>{});let ie=Le();try{Ne.register(Mr,ie)}catch(se){t("register %s store failed: %o",Mr,se)}try{let se=await ke.subscribeList(Mr,ie);_t.set(Mr,se)}catch(se){t("re-subscribe %s failed: %o",Mr,se),_e(se,"board")}}async function Oe(_){if(!sr(_)||_===le)return;le=_;let b=M.get(Pr);if(!b)return;M.delete(Pr),await b().catch(()=>{});let ie=I();try{Ne.register(Pr,ie)}catch(se){t("register %s store failed: %o",Pr,se)}try{let se=await ke.subscribeList(Pr,ie);M.set(Pr,se)}catch(se){t("re-subscribe %s failed: %o",Pr,se),_e(se,"worker")}}let M=new Map,X=null,te=null,g=null,z=null,De=null;async function dt(){z=null,it.clear(),De=null,Je.clear(),X=null,te=null,_t.clear(),M.clear(),et.board+=1,et.worker+=1,ue();let _=st.getState().workspace.current?.path;if(_)try{await G.send("set-workspace",{path:_})}catch(ie){t("workspace restore after reconnect failed: %o",ie);return}Z();let b=st.getState();H(b.view==="board"),pe(b.view==="worker"),Se(b.view==="monitor"),T(b.view==="board"||b.view==="worker"||!!b.selected_id)}async function kt(){t("clearing all subscriptions for workspace switch"),xe(),v(),O(),$e.clear(),R(),y(),ge(),Z(),Ue();let _=st.getState();if(_.selected_id)try{Ne.unregister(`detail:${_.selected_id}`)}catch{}let b=st.getState();H(b.view==="board"),pe(b.view==="worker"),Se(b.view==="monitor"),T(b.view==="board"||b.view==="worker"||!!b.selected_id),b.selected_id&&tt(b.selected_id)}async function Ot(_){t("requesting workspace switch to %s",_),Be=!0;try{let b=await G.send("set-workspace",{path:_});t("workspace switch result: %o",b),b&&b.workspace&&(st.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),b.changed&&(await kt(),he("Switched to "+Pt(_),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),he("Failed to switch workspace","error",3e3),b}finally{Be=!1}}async function $t(_){t("requesting workspace git pull for %s",_);try{let b=await G.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let ie=b?.status;if(ie==="up_to_date"){he("Already up to date","success",2e3);return}if(ie==="stash_pop_conflict"){he("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}he("Git pulled "+Pt(_),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let ie=b?.code,se=b?.message;if(ie==="rebase_conflict"){he("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(ie==="rebase_conflict_abort_failed"){he("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(ie==="busy"){he("Git pull skipped: another operation is running","warning",3e3);return}let Me=se?`: ${se}`:"";throw he(`Git pull failed${Me}`,"error",3e3),b}}async function Dt(_,b){t("setting workspace visibility %s \u2192 %s",_,String(b));try{await G.send("set-workspace-visibility",{path:_,visible:b}),await Yt()}catch(ie){t("workspace visibility update failed: %o",ie),he("Failed to update project visibility","error",3e3)}}async function Yt(){try{let _=await G.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let b=_.workspaces.map(ye=>({path:ye.path,database:ye.database,pid:ye.pid,version:ye.version})),ie=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,se=Array.isArray(_.hidden)?_.hidden.filter(ye=>typeof ye=="string"):[];st.setState({workspace:{current:ie,available:b,hidden:se}});let Me=window.localStorage.getItem("beads-ui.workspace");Me&&(!b.some(k=>k.path===Me)||se.includes(Me)?window.localStorage.removeItem("beads-ui.workspace"):ie&&Me!==ie.path&&(t("restoring saved workspace preference: %s",Me),await Ot(Me)))}}catch(_){t("failed to load workspaces: %o",_)}}G.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(st.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Yt(),kt())});let cr=!1;if(typeof G.onConnection=="function"){let _=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(cr=!0,he("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&cr&&(cr=!1,he("Reconnected","success",2200),wh(st,(ie,se)=>{t(`${ie}: %o`,se)}),dt())};G.onConnection(_)}let gr="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(gr=_)}catch(_){t("view parse error: %o",_)}let st=_l({config:vh(),view:gr});G.on("worker-queue-snapshot",_=>{let b=_;if(!b||!b.queue)return;let ie=st.getState().workspace.current?.path;if(typeof ie=="string"&&ie.length>0&&b.root_dir!==ie){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{$e.set(b.queue)}catch{}}),G.on("worker-parallel-analysis-snapshot",_=>{let b=_;if(!b)return;let ie=st.getState().workspace.current?.path;if(!(typeof ie=="string"&&ie.length>0&&typeof b.root_dir=="string"&&b.root_dir!==ie))try{Ve.set({settings:b.settings,job:b.job??null,runs:Array.isArray(b.runs)?b.runs:[],last_good:b.last_good??null})}catch{}});let Zt=pl(st);Zt.start();let Ie=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),A=async(_,b)=>{try{return await ae(_,b)}catch(ie){if(Ie.has(_))throw ie;return[]}};Du({global_element:n,repo_element:s},st,Zt);let de=document.getElementById("workspace-picker");de&&xd(de,st,Ot,$t,Dt);let Ce=qu(e,(_,b)=>ae(_,b));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>Ce.open())}catch{}let pt=Uu(e,{policyStore:it,queueStore:$e,implPresetStore:Je,transport:(_,b)=>ae(_,b),onOpenChange:_=>{let b=nt;nt=_,L(),b&&_===!1&&bt.refreshSessionDefaults()},labelOptions:()=>{let _=new Set;for(let[b]of si)for(let ie of Ne.snapshotFor(b)||[]){let se=ie.labels;if(Array.isArray(se))for(let Me of se)typeof Me=="string"&&Me.length>0&&_.add(Me)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&(_.setAttribute("aria-label","\uC124\uC815"),_.setAttribute("title","\uC124\uC815"),_.addEventListener("click",()=>pt.open()))}catch{}let Rt=Tl(l,{gotoIssue:_=>Zt.gotoIssue(_),issueStores:Ne,transport:A,workerQueueStore:$e,uiOrderStore:Pe,displayPolicyStore:it,closedRange:Q,onClosedRangeChange:_=>{Te(_)},onNewIssue:()=>Ce.open()}),bt=ti(c,{transport:A,issueStores:Ne,queueStore:$e,analysisStore:Ve,sessionLogStore:V,uiOrderStore:Pe,gotoIssue:_=>st.setState({selected_id:_}),getWorkspacePath:()=>st.getState().workspace.current?.path,doneRange:le,onDoneRangeChange:_=>{Oe(_)}}),It=Ou(u,{transport:A,pipelineStore:mt,execPresetStore:Je,sessionLogStore:V,router:Zt,gotoIssue:_=>Zt.gotoIssue(_),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:_=>Ot(_)}),f=tu(d,{issueStores:Ne,transport:A,queueStore:$e,execPresetStore:Je,sessionLogStore:V,getWorkspacePath:()=>st.getState().workspace.current?.path,onNavigate:_=>{st.getState().view==="worker"?st.setState({selected_id:_}):Zt.gotoIssue(_)},onClose:()=>{let _=st.getState();st.setState({selected_id:null});try{Zt.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{pt.open("execution")}}),w=st.getState().selected_id;w&&(d.hidden=!1,f.load(w),tt(w)),st.subscribe(_=>{let b=_.selected_id;b?(d.hidden=!1,f.load(b),Be||tt(b)):(f.clear(),d.hidden=!0,Ue())});let W=_=>{l.hidden=_.view!=="board",c.hidden=_.view!=="worker",u.hidden=_.view!=="monitor",o&&o.classList.toggle("is-quiet",_.view==="monitor"),H(_.view==="board"),pe(_.view==="worker"),Se(_.view==="monitor"),T(_.view==="board"||_.view==="worker"||nt||!!_.selected_id),!_.selected_id&&_.view==="board"&&Rt.load(),_.view==="worker"&&bt.load(),_.view==="monitor"?It.load():It.pause(),window.localStorage.setItem("beads-ui.view",_.view)};st.subscribe(W),W(st.getState()),y(),Z(),ue(),Yt().finally(()=>{ht=!0,Ye()}),window.addEventListener("keydown",_=>{let b=_.ctrlKey||_.metaKey,ie=String(_.key||"").toLowerCase(),se=_.target,Me=se&&se.tagName?String(se.tagName).toLowerCase():"",ye=Me==="input"||Me==="textarea"||Me==="select"||se&&typeof se.isContentEditable=="boolean"&&se.isContentEditable;b&&ie==="n"&&(ye||(_.preventDefault(),Ce.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&$h(t)});export{$h as bootstrap,vh as readBootstrapConfig,wh as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
