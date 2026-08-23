var sp=Object.create;var No=Object.defineProperty;var op=Object.getOwnPropertyDescriptor;var ap=Object.getOwnPropertyNames;var ip=Object.getPrototypeOf,lp=Object.prototype.hasOwnProperty;var cp=(e,t,r)=>t in e?No(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var qo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var up=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of ap(t))!lp.call(e,s)&&s!==r&&No(e,s,{get:()=>t[s],enumerable:!(n=op(t,s))||n.enumerable});return e};var dp=(e,t,r)=>(r=e!=null?sp(ip(e)):{},up(t||!e||!e.__esModule?No(r,"default",{value:e,enumerable:!0}):r,e));var lt=(e,t,r)=>cp(e,typeof t!="symbol"?t+"":t,r);var Qi=qo((Pb,Xi)=>{var fn=1e3,_n=fn*60,mn=_n*60,Kr=mn*24,_p=Kr*7,mp=Kr*365.25;Xi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return gp(e);if(r==="number"&&isFinite(e))return t.long?hp(e):bp(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function gp(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*mp;case"weeks":case"week":case"w":return r*_p;case"days":case"day":case"d":return r*Kr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*mn;case"minutes":case"minute":case"mins":case"min":case"m":return r*_n;case"seconds":case"second":case"secs":case"sec":case"s":return r*fn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function bp(e){var t=Math.abs(e);return t>=Kr?Math.round(e/Kr)+"d":t>=mn?Math.round(e/mn)+"h":t>=_n?Math.round(e/_n)+"m":t>=fn?Math.round(e/fn)+"s":e+"ms"}function hp(e){var t=Math.abs(e);return t>=Kr?As(e,t,Kr,"day"):t>=mn?As(e,t,mn,"hour"):t>=_n?As(e,t,_n,"minute"):t>=fn?As(e,t,fn,"second"):e+" ms"}function As(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var el=qo((Db,Ji)=>{function yp(e){r.debug=r,r.default=r,r.coerce=u,r.disable=a,r.enable=s,r.enabled=c,r.humanize=Qi(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let m=0;for(let b=0;b<p.length;b++)m=(m<<5)-m+p.charCodeAt(b),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(p){let m,b=null,x,A;function L(...H){if(!L.enabled)return;let te=L,J=Number(new Date),N=J-(m||J);te.diff=N,te.prev=m,te.curr=J,m=J,H[0]=r.coerce(H[0]),typeof H[0]!="string"&&H.unshift("%O");let q=0;H[0]=H[0].replace(/%([a-zA-Z%])/g,(U,g)=>{if(U==="%%")return"%";q++;let S=r.formatters[g];if(typeof S=="function"){let V=H[q];U=S.call(te,V),H.splice(q,1),q--}return U}),r.formatArgs.call(te,H),(te.log||r.log).apply(te,H)}return L.namespace=p,L.useColors=r.useColors(),L.color=r.selectColor(p),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(x!==r.namespaces&&(x=r.namespaces,A=r.enabled(p)),A),set:H=>{b=H}}),typeof r.init=="function"&&r.init(L),L}function n(p,m){let b=r(this.namespace+(typeof m>"u"?":":m)+p);return b.log=this.log,b}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let m=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(p,m){let b=0,x=0,A=-1,L=0;for(;b<p.length;)if(x<m.length&&(m[x]===p[b]||m[x]==="*"))m[x]==="*"?(A=x,L=b,x++):(b++,x++);else if(A!==-1)x=A+1,L++,b=L;else return!1;for(;x<m.length&&m[x]==="*";)x++;return x===m.length}function a(){let p=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),p}function c(p){for(let m of r.skips)if(o(p,m))return!1;for(let m of r.names)if(o(p,m))return!0;return!1}function u(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ji.exports=yp});var tl=qo((Pt,Ss)=>{Pt.formatArgs=wp;Pt.save=kp;Pt.load=$p;Pt.useColors=vp;Pt.storage=xp();Pt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Pt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function vp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function wp(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ss.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Pt.log=console.debug||console.log||(()=>{});function kp(e){try{e?Pt.storage.setItem("debug",e):Pt.storage.removeItem("debug")}catch{}}function $p(){let e;try{e=Pt.storage.getItem("debug")||Pt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function xp(){try{return localStorage}catch{}}Ss.exports=el()(Pt);var{formatters:Ap}=Ss.exports;Ap.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Rn=globalThis,ys=Rn.trustedTypes,Di=ys?ys.createPolicy("lit-html",{createHTML:e=>e}):void 0,jo="$lit$",br=`lit$${Math.random().toFixed(9).slice(2)}$`,Bo="?"+br,pp=`<${Bo}>`,zr=document,In=()=>zr.createComment(""),Ln=e=>e===null||typeof e!="object"&&typeof e!="function",Uo=Array.isArray,Ui=e=>Uo(e)||typeof e?.[Symbol.iterator]=="function",Fo=`[ 	
\f\r]`,Cn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ni=/-->/g,qi=/>/g,Ur=RegExp(`>|${Fo}(?:([^\\s"'>=/]+)(${Fo}*=${Fo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fi=/'/g,ji=/"/g,Wi=/^(?:script|style|textarea|title)$/i,Wo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Wo(1),Tr=Wo(2),Tb=Wo(3),Ht=Symbol.for("lit-noChange"),gt=Symbol.for("lit-nothing"),Bi=new WeakMap,Wr=zr.createTreeWalker(zr,129);function zi(e,t){if(!Uo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Di!==void 0?Di.createHTML(t):t}var Hi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Cn;for(let c=0;c<r;c++){let u=e[c],d,p,m=-1,b=0;for(;b<u.length&&(a.lastIndex=b,p=a.exec(u),p!==null);)b=a.lastIndex,a===Cn?p[1]==="!--"?a=Ni:p[1]!==void 0?a=qi:p[2]!==void 0?(Wi.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Ur):p[3]!==void 0&&(a=Ur):a===Ur?p[0]===">"?(a=s??Cn,m=-1):p[1]===void 0?m=-2:(m=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Ur:p[3]==='"'?ji:Fi):a===ji||a===Fi?a=Ur:a===Ni||a===qi?a=Cn:(a=Ur,s=void 0);let x=a===Ur&&e[c+1].startsWith("/>")?" ":"";o+=a===Cn?u+pp:m>=0?(n.push(d),u.slice(0,m)+jo+u.slice(m)+br+x):u+br+(m===-2?c:x)}return[zi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},On=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,u=this.parts,[d,p]=Hi(t,r);if(this.el=e.createElement(d,n),Wr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=Wr.nextNode())!==null&&u.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(jo)){let b=p[a++],x=s.getAttribute(m).split(br),A=/([.?@])?(.*)/.exec(b);u.push({type:1,index:o,name:A[2],strings:x,ctor:A[1]==="."?ws:A[1]==="?"?ks:A[1]==="@"?$s:Gr}),s.removeAttribute(m)}else m.startsWith(br)&&(u.push({type:6,index:o}),s.removeAttribute(m));if(Wi.test(s.tagName)){let m=s.textContent.split(br),b=m.length-1;if(b>0){s.textContent=ys?ys.emptyScript:"";for(let x=0;x<b;x++)s.append(m[x],In()),Wr.nextNode(),u.push({type:2,index:++o});s.append(m[b],In())}}}else if(s.nodeType===8)if(s.data===Bo)u.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(br,m+1))!==-1;)u.push({type:7,index:o}),m+=br.length-1}o++}}static createElement(t,r){let n=zr.createElement("template");return n.innerHTML=t,n}};function Hr(e,t,r=e,n){if(t===Ht)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Ln(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Hr(e,s._$AS(e,t.values),s,n)),t}var vs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??zr).importNode(r,!0);Wr.currentNode=s;let o=Wr.nextNode(),a=0,c=0,u=n[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new pn(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new xs(o,this,t)),this._$AV.push(d),u=n[++c]}a!==u?.index&&(o=Wr.nextNode(),a++)}return Wr.currentNode=zr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},pn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=gt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Hr(this,t,r),Ln(t)?t===gt||t==null||t===""?(this._$AH!==gt&&this._$AR(),this._$AH=gt):t!==this._$AH&&t!==Ht&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ui(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==gt&&Ln(this._$AH)?this._$AA.nextSibling.data=t:this.T(zr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=On.createElement(zi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new vs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Bi.get(t.strings);return r===void 0&&Bi.set(t.strings,r=new On(t)),r}k(t){Uo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(In()),this.O(In()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Gr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=gt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=gt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Hr(this,t,r,0),a=!Ln(t)||t!==this._$AH&&t!==Ht,a&&(this._$AH=t);else{let c=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=Hr(this,c[n+u],r,u),d===Ht&&(d=this._$AH[u]),a||(a=!Ln(d)||d!==this._$AH[u]),d===gt?t=gt:t!==gt&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===gt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ws=class extends Gr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===gt?void 0:t}},ks=class extends Gr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==gt)}},$s=class extends Gr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Hr(this,t,r,0)??gt)===Ht)return;let n=this._$AH,s=t===gt&&n!==gt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==gt&&(n===gt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},xs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Hr(this,t)}},Gi={M:jo,P:br,A:Bo,C:1,L:Hi,R:vs,D:Ui,V:Hr,I:pn,H:Gr,N:ks,U:$s,B:ws,F:xs},fp=Rn.litHtmlPolyfillSupport;fp?.(On,pn),(Rn.litHtmlVersions??(Rn.litHtmlVersions=[])).push("3.3.1");var Ge=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new pn(t.insertBefore(In(),o),o,void 0,r??{})}return s._$AI(e),s};var jt="today",ur=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Gt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Vr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Vi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ki(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Yi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Zi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),c=e.get(a)||{lines:[],last_event_at:null};c.lines=[...c.lines,o],c.last_event_at=Date.now(),e.set(a,c),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var rl=dp(tl(),1);function pt(e){return(0,rl.default)(`beads-ui:${e}`)}function er(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Yr(e,t){let r=er(e.created_at),n=er(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function ol(e,t){let r=er(e.created_at),n=er(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function al(e,t){let r=er(e.updated_at),n=er(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function il(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=er(e.created_at),o=er(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function ll(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Sp=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function nl(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function sl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Sp.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function cl(e,t){let r=nl(e),n=nl(t);if(r!==n)return r<n?-1:1;let s=sl(e),o=sl(t);if(s!==o)return s<o?-1:1;let a=er(e&&e.created_at),c=er(t&&t.created_at);if(a!==c)return a<c?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var zo=2**20;function gn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-er(e&&e.created_at)}function Es(e){return(t,r)=>{let n=gn(t,e),s=gn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ho(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:gn(c,r)-zo};if(!c)return{rank:gn(a,r)+zo};let u=gn(a,r),d=gn(c,r),p=(u+d)/2;return u<p&&p<d?{rank:p}:{renormalize:n.map((m,b)=>({bead_id:m.id,rank:b*zo}))}}function Go(e,t={}){let r=pt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,u=t.sort||Yr;function d(){for(let b of Array.from(a))try{b()}catch{}}function p(){s=Array.from(n.values()).sort(u)}function m(b){if(c||!b||b.id!==e)return;let x=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,x),!(x<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(x<=o)return;n.clear();let A=Array.isArray(b.issues)?b.issues:[];for(let L of A)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);p(),o=x,d();return}if(b.type==="upsert"){let A=b.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let L=n.get(A.id);if(!L)n.set(A.id,A);else{let H=Number.isFinite(L.updated_at)?L.updated_at:0,te=Number.isFinite(A.updated_at)?A.updated_at:0;if(H<=te){for(let J of Object.keys(L))J in A||delete L[J];for(let[J,N]of Object.entries(A))L[J]=N}}p()}o=x,d()}else if(b.type==="delete"){let A=String(b.issue_id||"");A&&(n.delete(A),p()),o=x,d()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function Ts(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ul(e){let t=pt("subs"),r=new Map,n=new Map;function s(c,u){t("applyDelta %s +%d ~%d -%d",c,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let p=Array.isArray(u.added)?u.added:[],m=Array.isArray(u.updated)?u.updated:[],b=Array.isArray(u.removed)?u.removed:[];for(let x of Array.from(d)){let A=r.get(x);if(!A)continue;let L=A.itemsById;for(let H of p)typeof H=="string"&&H.length>0&&L.set(H,!0);for(let H of m)typeof H=="string"&&H.length>0&&L.set(H,!0);for(let H of b)typeof H=="string"&&H.length>0&&L.delete(H)}}async function o(c,u){let d=Ts(u);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let m=r.get(c);if(m&&m.key!==d){let b=n.get(m.key);b&&(b.delete(c),b.size===0&&n.delete(m.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(c);try{await e("subscribe-list",{id:c,type:u.type,params:u.params})}catch(m){let b=r.get(c)||null;if(b){let x=n.get(b.key);x&&(x.delete(c),x.size===0&&n.delete(b.key))}throw r.delete(c),m}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let m=r.get(c)||null;if(m){let b=n.get(m.key);b&&(b.delete(c),b.size===0&&n.delete(m.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ts,selectors:{getIds(c){let u=r.get(c);return u?Array.from(u.itemsById.keys()):[]},has(c,u){let d=r.get(c);return d?d.itemsById.has(u):!1},count(c){let u=r.get(c);return u?u.itemsById.size:0},getItemsById(c){let u=r.get(c),d={};if(!u)return d;for(let p of u.itemsById.keys())d[p]=!0;return d}}}}function dl(){let e=pt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let u of Array.from(n))try{u()}catch{}}function a(u,d,p){let m=d?Ts(d):"",b=r.get(u)||"",x=t.has(u);if(e("register %s key=%s (prev=%s)",u,m,b),x&&b&&m&&b!==m){let A=t.get(u);if(A)try{A.dispose()}catch{}let L=s.get(u);if(L){try{L()}catch{}s.delete(u)}let H=Go(u,p);t.set(u,H);let te=H.subscribe(()=>o());s.set(u,te)}else if(!x){let A=Go(u,p);t.set(u,A);let L=A.subscribe(()=>o());s.set(u,L)}return r.set(u,m),()=>c(u)}function c(u){e("unregister %s",u),r.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let p=s.get(u);if(p){try{p()}catch{}s.delete(u)}}return{register:a,unregister:c,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return n.add(u),()=>n.delete(u)}}}function pl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function fl(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function _l(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Vo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Ep(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Tp(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ml(e){let t=pt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Ep(n),a=Tp(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Vo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Vo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Cp=Object.freeze({workspace_config:{default_workspace:null}});function gl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Cp.workspace_config.default_workspace}}}function bl(e={}){let t=pt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:gl(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?gl(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),u=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!c&&!u||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function hl(e){let t=pt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function u(d){return async(m,b)=>{let x=s++,A=Date.now();n.set(x,{type:m,start_ts:A}),t("request start id=%d type=%s count=%d",x,m,r+1),a();let L=!1,H=()=>{L||(L=!0,n.delete(x),c())},te=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",x,m,Date.now()-A),H())},3e4);try{let J=await d(m,b),N=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",x,m,N),J}catch(J){let N=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",x,m,N,J),J}finally{clearTimeout(te),H()}}}return o(),{wrapSend:u,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,m])=>({id:p,type:m.type,elapsed_ms:d-m.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Cs(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(ll),u;switch(c){case"created_desc":return u.sort(Yr),u;case"created_asc":return u.sort(ol),u;case"updated_desc":return u.sort(al),u;case"priority":return u.sort(il),u;case"manual":default:{let d=r();return d?u.sort(Es(d)):u.sort(Yr),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Zr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function At(e){let t=Zr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Bt(e,t){let r=Zr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let u=Math.floor(c/7);if(c<30)return`${u}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function yl(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Zr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Rs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Is(e){let t=new Map;for(let n of e)n&&n.id&&!t.has(n.id)&&t.set(n.id,n);let r=new Map;for(let n of t.values()){let s=Rs(n);if(!s)continue;let o=r.get(s);o||(o=[],r.set(s,o)),o.push({id:n.id,title:n.title,status:n.status,metadata:n.metadata,workflow:n.workflow,created_at:n.created_at,updated_at:n.updated_at})}return r}function Ls(e,t){let r=e.get(t)||[],n=0;for(let o of r)(o.status==="resolved"||o.status==="closed")&&(n+=1);let s=yl(r);return{total:r.length,count:n,current:s,children:r}}function Os(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let u={...a.order};for(let d of c)u[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:u})}async function o(a,c,u){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(Ho(c,u,d.order),a);s(d,p);let m=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(b);let x=n(Ho(c,u,b.order),a);s(b,x);let A=await t("ui-order-set",{expected_revision:b.revision,entries:x});A&&A.applied&&r.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Ms(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ko(e,t){return!t||typeof e!="string"||e.length===0||Ms(t.visible_labels).includes(e)?!0:Ms(t.hidden_labels).includes(e)?!1:!Ms(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Ps(e,t){return Ms(e).filter(r=>Ko(r,t))}function Cr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}function Rp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Ip(e,t,r,n,s){return i`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${n?"true":"false"}
    @click=${s}
  >
    children ${t}/${r} ${n?"\u25B4":"\u25BE"}
  </button>`}function Lp(e,t,r,n){return i`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${n?s=>n(s,e.id):void 0}
  >
    <span class=${Rp(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${r}
  </button>`}function Ds(e,t){let r=e.total||0,n=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(r===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],c=r>0?a.slice().sort(cl):a;return i`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?Ip(t.parent_id,e.count,r,n,t.onToggle):i`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${r>0&&e.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${n&&r>0?i`<div class="board-card__roll-list">
            ${c.map((u,d)=>Lp(u,d+1,t.childChips?t.childChips(u):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Op={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},wl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},vl={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Mp={review:"\u2713",skip:"\u2298"},Rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Pp(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function kl(e){let t=e&&e.fill||"none";return t==="none"?Rr.none:e&&e.stale===!0?Rr.stale:t==="dim"?Rr.dim:e&&e.glyph==="review"?Rr.review:e&&e.glyph==="skip"?Rr.skip:Rr.done}function Dp(e){if(!e||e.fill==="none"||!e.approval_state)return kl(e);let t=[];return e.glyph==="review"?t.push(Rr.review):e.glyph==="skip"&&t.push(Rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Np(e,t,r){let n=Op[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Mp[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let u=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${u}>
        ${wl[e]||e}
      </div>
    </div>
  `}function Ns(e,t){if(!e||!e.stages)return"";let r=vl[e.route]||vl.spec_backed,n=e.stages,s=Pp(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${wl[a]||a} ${a==="plan"?Dp(n[a]||{}):kl(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Np(a,n[a]||{},a===s))}
    </div>
  `}function qp(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var $l=2;function Fp(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,$l).join(", "),s=r.length-$l,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Yo(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function xl(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Xr(e){return`${e.kind}:${xl(e)}@${e.sha}`}function qs(e,t){if(!e)return null;let r=Yo(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Yo(t?.kind),a=o!==null&&t?.kind!==e.kind,c=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${Xr(t)}`:"";return{kind:e.kind,label:c,title:`${u}${d}`}}function Al(e,t){let r=qs(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function jp(e){if(!e)return null;let t=Yo(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Xr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Bp(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Cr(r,"route")){let c=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${c?" is-derived":""}"
        title=${c?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${c?"unset":n.route}</span
      >`)}if(n.fast_track&&Cr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Cr(r,"pr")){let c=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${c!=null?` #${c}`:""}`}</span
      >`)}let o=Al(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let c=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Xr(c)}`}
        >${`exec ${c.kind==="delegated"?xl(c):`main:${c.actor}`} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let c=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${c.actor}@${c.sha}`}
        >${`impl ${c.actor} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}for(let c of Ps(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${c}</span>`);return e.from_id&&Cr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${c=>{c.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(c,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Cr(r,"blocked")&&s.push(...Fp(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Cr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function Up(e){let t=Bt(e.created_at),r=Bt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${At(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${At(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Wp(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ds(r,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Up(e),empty_label:"children \uC5C6\uC74C",childChips:Zo,onToggle:n=>t.onRollupToggle&&t.onRollupToggle(n,e.id),onChildClick:(n,s)=>t.onChildClick&&t.onChildClick(n,s)})}function Zo(e){let t=e?.workflow?.chips?.planned_execution,r=e?.workflow?.chips?.exec_receipt;return qs(t,r)?i`<span class="board-card__roll-child-chips">
    ${Al(t,r)}
    ${jp(r)}
  </span>`:null}function Fs(e,t){let r=qp(e.priority);return i`
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
      ${Bp(e,t)}
      ${e.workflow&&Cr(t.policy||null,"stepper")?Ns(e.workflow,e.status):""}
      ${Wp(e,t)}
    </article>
  `}function bn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${ur.map(o=>i`<option
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
  `}function Sl(e,t,r){return i`
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
  `}var zp=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Hp=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Gp=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Vp(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function El(e,t,r){return i`
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
        ${zp.map(n=>i`<option
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
        ${Hp.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Vp(e,t,r)}
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
        ${Gp.map(n=>i`<option
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
  `}var Kp=200,Yp={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Zp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Tl="beads-ui.board.sort",Cl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Xp(){try{let e=window.localStorage.getItem(Tl);if(e&&Cl.has(e))return e}catch{}return"created_desc"}function Rl(e,t){let r=pt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,m=t.closedRange||jt,b=s?Cs(s,a):null,x=Os({transport:o,uiOrderStore:a}),A=[],L=[],H=[],te=[],J=[],N=[],q=!1,R=0,U=Xp(),g=new Map,S=new Map,V=new Map,oe=new Set,D={search:"",priority:"",type:"",labels:[]},j=!1,de=null;function be(W){return String(W.status||"open")==="open"}function ve(W){let re=String(W.status||"open");return re==="open"||re==="blocked"}function Te(W){let re=D.search.trim().toLowerCase(),pe=D.priority,k=D.type,E=D.labels;return W.filter(M=>{if(re){let X=String(M.id||"").toLowerCase(),$e=String(M.title||"").toLowerCase();if(!X.includes(re)&&!$e.includes(re))return!1}if(pe!==""&&String(M.priority)!==pe||k!==""&&String(M.issue_type||"")!==k)return!1;if(E.length>0){let X=Array.isArray(M.labels)?M.labels:[];if(!E.some($e=>X.includes($e)))return!1}return!0})}function He(){let W=new Set;for(let re of[A,L,H,te,J,N])for(let pe of re){let k=Array.isArray(pe.labels)?pe.labels:[];for(let E of k)typeof E=="string"&&E.length>0&&W.add(E)}return Array.from(W).sort()}function rt(){return D.search.trim()!==""||D.priority!==""||D.type!==""||D.labels.length>0}function Pe(){try{if(b){let W=b.selectBoardColumn("tab:board:in-progress","in_progress",U),re=b.selectBoardColumn("tab:board:blocked","blocked",U).filter(ve),pe=new Set(W.map(Oe=>Oe.id)),k=b.selectBoardColumn("tab:board:ready","ready",U).filter(Oe=>be(Oe)&&!pe.has(Oe.id)),E=b.selectBoardColumn("tab:board:resolved","resolved",U),M=b.selectBoardColumn("tab:board:deferred","deferred",U),X=b.selectBoardColumn("tab:board:closed","closed").slice(0,Kp),$e=[...re,...k,...W,...E,...X];Xe($e);let fe=new Set;for(let Oe of $e)Oe&&Oe.id&&!Rs(Oe)&&fe.add(Oe.id);let Ae=!rt();A=Ae?Mn(re,fe):re,L=Ae?Mn(k,fe):k,H=Ae?Mn(W,fe):W,te=Ae?Mn(E,fe):E,J=M,R=M.length,N=Ae?Mn(X,fe):X,g=new Map;for(let Oe of A)g.set(Oe.id,"open");for(let Oe of L)g.set(Oe.id,"open");for(let Oe of H)g.set(Oe.id,"in_progress");for(let Oe of te)g.set(Oe.id,"resolved");for(let Oe of J)g.set(Oe.id,"deferred");for(let Oe of N)g.set(Oe.id,"closed");S=new Map;for(let Oe of A)S.set(Oe.id,"blocked-col");for(let Oe of L)S.set(Oe.id,"ready-col");for(let Oe of H)S.set(Oe.id,"in-progress-col");for(let Oe of te)S.set(Oe.id,"resolved-col");for(let Oe of N)S.set(Oe.id,"closed-col")}G()}catch{A=[],L=[],H=[],te=[],J=[],N=[],V=new Map,G()}}function Xe(W){V=Is(W)}function ce(W){return Ls(V,W)}function Ie(W){return!oe.has(W)}function Ce(W,re){W.preventDefault(),W.stopPropagation(),oe.has(re)?oe.delete(re):oe.add(re),G()}function Ne(W,re){W.preventDefault(),W.stopPropagation(),n(re)}function ke(W,re){W.preventDefault(),W.stopPropagation(),n(re)}function qe(W,re){de||n(re)}function Ke(W,re){W.preventDefault(),W.stopPropagation(),Qp(re).then(pe=>{pe&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function Ee(W,re){de=re,W.dataTransfer&&(W.dataTransfer.setData("text/plain",re),W.dataTransfer.effectAllowed="move"),W.target.classList.add("board-card--dragging")}function Ve(W){W.target.classList.remove("board-card--dragging"),ue(),setTimeout(()=>{de=null},0)}function Y(W){let re=String(W.target.value||"");!re||re===m||(m=re,d&&d(re),G())}function Z(){return c?c.get():null}function he(W){let re=u?u.get():null,pe=re?re.cleanup_failed:null;if(!pe||typeof pe!="object"||Array.isArray(pe))return null;let k=pe[W];return!k||typeof k!="object"||Array.isArray(k)?null:k}let Le={onCardClick:qe,onCopyId:Ke,onDragStart:Ee,onDragEnd:Ve,onClosedRangeChange:Y,rollupFor:ce,isExpanded:Ie,onRollupToggle:Ce,onChildClick:Ne,onFromChipClick:ke,cleanupFailureFor:he,get policy(){return Z()}};function Be(W,re){de||(ge(),n(re))}function Ue(W,re){W.preventDefault(),W.stopPropagation(),ge(),n(re)}let Fe={...Le,onCardClick:Be,onChildClick:Ue,onFromChipClick:Ue,get policy(){return Z()}};function it(W){let re=W.target,pe=e.querySelector(".board-filter__labels");re&&pe&&pe.contains(re)||K()}function tt(W){W.key==="Escape"&&K()}function z(){j||(j=!0,document.addEventListener("mousedown",it),document.addEventListener("keydown",tt),G())}function K(){j&&(j=!1,document.removeEventListener("mousedown",it),document.removeEventListener("keydown",tt),G())}function me(W){W.key==="Escape"&&ge()}function Qe(){q||(q=!0,document.addEventListener("keydown",me),G())}function ge(){q&&(q=!1,document.removeEventListener("keydown",me),G())}let T={onClose:ge,onOverlayClick(W){W.target===W.currentTarget&&ge()}},O={onSearchInput(W){D.search=String(W.target.value||""),Pe()},onPriorityChange(W){D.priority=String(W.target.value||""),Pe()},onTypeChange(W){D.type=String(W.target.value||""),Pe()},onSortChange(W){let re=String(W.target.value||"");if(!(!Cl.has(re)||re===U)){U=re;try{window.localStorage.setItem(Tl,re)}catch{}Pe()}},onDeferredToggle(){q?ge():Qe()},onLabelMenuToggle(){j?K():z()},onLabelToggle(W){let re=D.labels.indexOf(W);re===-1?D.labels.push(W):D.labels.splice(re,1),Pe()},onLabelClear(){D.labels.length!==0&&(D.labels=[],Pe())},onNewIssue(){p&&p()}};function I(){return i`
      <div class="board-view">
        ${El(D,O,{sort_mode:U,deferred_popup_open:q,deferred_count:R,label_options:He(),label_menu_open:j})}
        <div class="board-root">
          ${bn({title:"Blocked",id:"blocked-col",items:Te(A)},Le)}
          ${bn({title:"Ready",id:"ready-col",items:Te(L)},Le)}
          ${bn({title:"In progress",id:"in-progress-col",items:Te(H)},Le)}
          ${bn({title:"Resolved",id:"resolved-col",items:Te(te)},Le)}
          ${bn({title:"Closed",id:"closed-col",items:Te(N),is_closed:!0,closed_range:m},Le)}
        </div>
        ${q?Sl({items:Te(J),count:R},Fe,T):""}
      </div>
    `}function G(){Ge(I(),e),se()}function se(){try{let W=e.querySelector("#deferred-popup");W&&!W.open&&(typeof W.showModal=="function"?W.showModal():W.setAttribute("open",""));let re=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let pe of re)Array.from(pe.querySelectorAll(".board-card")).forEach((E,M)=>{E.tabIndex=M===0?0:-1})}catch{}}async function w(W,re){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:W,status:re}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(pe){r("update-status failed: %o",pe),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function C(W){switch(W){case"blocked-col":return A;case"ready-col":return L;case"in-progress-col":return H;case"resolved-col":return te;default:return[]}}function F(W,re,pe){if(!o||!a)return;let k=C(W),E=k.find(Ae=>Ae.id===re);if(!E)return;let M=k.filter(Ae=>Ae.id!==re),X=pe.closest?pe.closest(".board-card"):null,$e=M.length;if(X){let Ae=X.getAttribute("data-issue-id");if(Ae===re)return;let Oe=M.findIndex(yt=>yt.id===Ae);Oe>=0&&($e=Oe)}let fe=M.slice();fe.splice($e,0,E),x.applyReorder(re,fe,$e)}function ue(){for(let W of Array.from(e.querySelectorAll(".board-column--drag-over")))W.classList.remove("board-column--drag-over")}let ae=null;e.addEventListener("dragover",W=>{W.preventDefault(),W.dataTransfer&&(W.dataTransfer.dropEffect="move");let pe=W.target.closest(".board-column");pe&&pe!==ae&&(ae&&ae.classList.remove("board-column--drag-over"),pe.classList.add("board-column--drag-over"),ae=pe)}),e.addEventListener("dragleave",W=>{let re=W.relatedTarget;(!re||!e.contains(re))&&ae&&(ae.classList.remove("board-column--drag-over"),ae=null)}),e.addEventListener("drop",W=>{W.preventDefault(),ae&&(ae.classList.remove("board-column--drag-over"),ae=null);let re=W.target,pe=re.closest(".board-column");if(!pe)return;let k=W.dataTransfer?.getData("text/plain")||"";if(!k)return;let E=pe.id,M=S.get(k);if(M&&M===E){if(Zp.has(E)){if(U!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}F(E,k,re)}return}let X=Yp[E];if(!X){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}g.get(k)!==X&&w(k,X)}),e.addEventListener("keydown",W=>{let re=W.target;if(!(re instanceof HTMLElement))return;let pe=String(re.tagName||"").toLowerCase();if(pe==="input"||pe==="textarea"||pe==="select"||pe==="button"||pe==="a"||re.isContentEditable===!0)return;let k=re.closest(".board-card");if(!k)return;let E=String(W.key||"");if(E==="Enter"||E===" "){W.preventDefault();let fe=k.getAttribute("data-issue-id");fe&&n(fe);return}if(E!=="ArrowUp"&&E!=="ArrowDown"&&E!=="ArrowLeft"&&E!=="ArrowRight")return;W.preventDefault();let M=k.closest(".board-column");if(!M)return;let X=Array.from(M.querySelectorAll(".board-card")),$e=X.indexOf(k);if(E==="ArrowDown"&&$e<X.length-1){we(k,X[$e+1]);return}if(E==="ArrowUp"&&$e>0){we(k,X[$e-1]);return}if(E==="ArrowLeft"||E==="ArrowRight"){let fe=Array.from(e.querySelectorAll(".board-column")),Ae=fe.indexOf(M),Oe=E==="ArrowRight"?1:-1,yt=Ae+Oe;for(;yt>=0&&yt<fe.length;){let vt=fe[yt].querySelector(".board-card");if(vt){we(k,vt);return}yt+=Oe}}});function we(W,re){try{W.tabIndex=-1,re.tabIndex=0,re.focus()}catch{}}let Re=null;b&&b.subscribe&&(Re=b.subscribe(()=>{try{Pe()}catch{}}));let We=null;c&&c.subscribe&&(We=c.subscribe(()=>{try{Pe()}catch{}}));let ze=null;return u&&u.subscribe&&(ze=u.subscribe(()=>{G()})),{async load(){r("load"),Pe()},clear(){K(),ge(),Re&&(Re(),Re=null),We&&(We(),We=null),ze&&(ze(),ze=null),e.replaceChildren(),A=[],L=[],H=[],te=[],J=[],N=[],g=new Map,S=new Map}}}function Mn(e,t){return e.filter(r=>{let n=Rs(r);return!(n&&t.has(n))})}async function Qp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function tr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function dr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Ir(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Jp(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),c=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",c.textContent=`${dr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${dr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,c,n,s,o),t.body.append(r),new Promise(u=>{let d=p=>{typeof r.close=="function"&&r.close(),r.remove(),u(p)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function hr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Jp(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var ef=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Il={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},tf=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function wt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function _t(e){return typeof e=="string"&&e.length>0?e:null}function hn(e){return e.startsWith("gpt-")?e.slice(4):e}function dt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Ol(e,t,r){let n=_t(t[e]);if(n!==null)return{value:n,source:"pin"};let s=_t(r[e]);return s===null?null:{value:s,source:"global"}}function Pn(e,t,r,n){return Ol(e,t,r)||{value:n,source:"base"}}function Xo(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&wt(s?.[t])){let a=_t(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&wt(s)){for(let a of Object.values(s))if(wt(a)){let c=_t(a[e]);if(c!==null)return c}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return _t(n?.runners?.[o]?.models?.[e]?.id)||e}function rf(e,t){return _t(t?.review?.reviewers?.[e]?.model)||e}function yn(e,t,r=!1){if(e==="default")return dt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?hn(e):e;return dt(e,t,n,e,"explicit")}function Ml(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];wt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(wt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function nf(e,t){let r=[],n=e?.implementation?.model_catalog;wt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(wt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function sf(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of nf(t,r)){let o=Ml(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function Qo(e){return dt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ll(e,t,r){let n=Ol(e,t,r);return n?yn(n.value,n.source):dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function pr(e){let t=wt(e.pin)?e.pin:{},r=wt(e.global)?e.global:{},n=wt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&wt(n.session)?n.session:null,o=n?.supported===!0&&wt(n.orchestration)?n.orchestration:null,a=wt(e.runner_catalog)?e.runner_catalog:null,c=_t(r.quick_fix_impl_model),u=sf(c,s,a),d={};if(s){let p=Pn("workflow_mode",t,r,_t(s.workflow_mode_default));d.workflow_mode=p.source==="base"?dt(p.value,"base",p.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",p.value,"default"):yn(p.value,p.source);for(let N of["spec_review","plan_review","impl_review"]){let q=`${N}_model`,R=_t(N==="plan_review"?p.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),U=Pn(q,t,r,R);if(U.value===null)d[q]=dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(U.value!=="self"&&U.value!=="skip"&&!wt(s.review?.reviewers?.[U.value]))d[q]=Qo(dt(U.value,U.source,"",null,"explicit"));else{let g=rf(U.value,s);d[q]=dt(U.value,U.source,hn(g),g,U.source==="base"?"default":"explicit")}}for(let[N,q]of Object.entries(Il)){let R=d[q].value;if(R==="self"||R==="skip"){d[N]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let U=_t(s.review?.reviewers?.[R||""]?.effort),g=Pn(N,t,r,U);d[N]=g.value===null?dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):dt(g.value,g.source,g.value,g.value,g.source==="base"?"default":"explicit")}let m=wt(s.implementation?.default)?s.implementation.default:{},b=_t(e.route),x=b!==null&&["quick_fix","spec_backed","full_plan"].includes(b),A=wt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},L=x&&wt(A[b])?A[b]:{};for(let N of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=Pn(N,t,r,N==="impl_dispatch"?_t(L.dispatch)||_t(m.dispatch):_t(m[N.replace("impl_","")]));d[N]=q.value===null?dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):dt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let H=_t(t.impl_runtime),te=H==="inherit"?_t(e.controller_runtime):H,J=b==="quick_fix"&&_t(t.impl_dispatch)===null&&u.runtime!==null&&(H===null||te===u.runtime);if(J){let N=u.runtime,q=c;d.impl_dispatch=dt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),H===null&&(d.impl_runtime=dt(N,"global",`${N} (\uC720\uB3C4)`,N,"explicit")),_t(t.impl_model)===null&&(d.impl_model=dt(q,"global",q,q,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let N of["impl_runtime","impl_model","impl_effort","impl_speed"])d[N]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!J&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let N=d.impl_runtime.value==="inherit"?_t(e.controller_runtime):d.impl_runtime.value,q=N?Ml(N,s,a):[];if(d.impl_model.value!=="auto"&&q.length>0&&!q.includes(d.impl_model.value))d.impl_model=Qo(d.impl_model);else{let R=Xo(d.impl_model.value,N,s,a);d.impl_model.display=hn(R),d.impl_model.full_value=R}}if(d.impl_effort.value==="auto"){let N=_t(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),q=N?_t(s.implementation?.effort_by_transport?.[N]?.auto):null;q&&!tf.has(q)?(d.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=q,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?dt("default","base","default (\uC77C\uBC18)","default","default"):yn("default",d.impl_speed.source))}}else for(let p of ef.filter(m=>!m.startsWith("orchestration_")))d[p]=Ll(p,t,r);if(!s){for(let[p,m]of Object.entries(Il))(d[m].value==="self"||d[m].value==="skip")&&(d[p]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])d[p]=dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){d[p]=Ll(p,t,r);continue}let m=p.replace("orchestration_",""),b=_t(o[m]),x=Pn(p,t,r,b);if(p==="orchestration_effort"&&x.source==="base"){d[p]=dt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(x.value===null){d[p]=dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(p==="orchestration_model"){let A=x.source==="base"?_t(o.model_id)||x.value:Xo(x.value,null,s,a);d[p]=dt(x.value,x.source,hn(A),A,x.source==="base"?"default":"explicit");continue}if(x.value==="default"){d[p]=x.source==="base"?dt("default","base","default (\uC77C\uBC18)","default","default"):yn("default",x.source);continue}d[p]=yn(x.value,x.source)}if(s)if(c===null){let p=d.orchestration_model.full_value;d.quick_fix_impl_model=dt(null,"base",p===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${hn(p)})`,null,"default")}else if(u.runtime!==null){let p=Xo(c,u.runtime,s,a);d.quick_fix_impl_model=dt(c,"global",hn(p),p,"explicit")}else u.offered?d.quick_fix_impl_model=Qo(dt(c,"global","",null,"explicit")):d.quick_fix_impl_model=yn(c,"global");return d}function of(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function js(e){let t=wt(e.pin)?e.pin:{},r=wt(e.global)?e.global:{},n=wt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=m=>{let b={...n,...m};return pr({pin:e.layer==="pin"?b:t,global:e.layer==="pin"?r:b,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let c=s(a)[e.key],u=s(o)[e.key],d=_t(o[e.key]),p=[...e.choices];return d!==null&&!p.includes(d)&&p.unshift(d),{unset_label:of(c,e.layer==="pin"),full_value:c.full_value,unavailable:c.resolution==="unavailable",disabled:u?.resolution==="not_applicable",options:p.map(m=>{let b=s({...o,[e.key]:m})[e.key];return{value:m,label:b.display,full_value:b.full_value}})}}function vn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(c=>{let u=!1,d=m=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),c(m))},p=()=>d(n.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),p())}),t.addEventListener("cancel",m=>{m.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var Fl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function St(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var yr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Dn=[...yr,"reasoning_output_tokens"],af=["implementation","review-consult"];function Jo(e){let t=0;for(let r of yr)t+=St(e?.[r]);return t}function lf(e){return!e||typeof e!="object"?!1:yr.some(t=>Number.isFinite(e[t]))}function Pl(e){return!e||typeof e!="object"?!1:Dn.some(t=>Number.isFinite(e[t]))}function cf(e){let t={};for(let r of Dn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Dl(e){let t={};for(let r of Dn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Nl(e,t){return e==="codex"?St(t.input_tokens)+St(t.output_tokens):Jo(t)}function uf(e){return e==="claude"?"Claude":"Codex"}function df(e){return`\u03C4 ${jl(e)}`}function pf(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${St(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${St(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${St(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${St(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${St(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${St(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${St(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Fl),o.join(`
`)}function Et(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${uf(r)} ${df(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:pf(r,n)})}return t}function Us(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let c=t[o];c||(c={subtotal:0,breakdown:{}},t[o]=c),c.subtotal+=a.subtotal;for(let u of Dn)Number.isFinite(a.breakdown[u])&&(c.breakdown[u]=St(c.breakdown[u])+St(a.breakdown[u]));a.replayed&&(c.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ea(e){return!e||typeof e!="object"?null:Vt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function ff(e){return e==="codex"?"codex":"claude"}function Lr(){return{subtotal:0,breakdown:cf(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Bs(e,t,r){e.subtotal+=t.subtotal;for(let n of Dn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=St(e.breakdown[n])+St(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ql(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function jl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function wn(e){return lf(e)?`\u03C4 ${jl(Jo(e))}`:null}function rr(e){let t=wn(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function kn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${St(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${St(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${St(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${St(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Jo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Fl),r.join(`
`)}function Vt(e,t){let r={claude:Lr(),codex:Lr()},n={orchestrator:{claude:Lr(),codex:Lr()},implementation:{claude:Lr(),codex:Lr()},"review-consult":{claude:Lr(),codex:Lr()}},s=new Set;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let u=c.usage;if(Pl(u)){let p=ff(c.runner),m=Dl(u),b={provider:p,role:"orchestrator",attempt_id:String(c.attempt_id||""),usage:m,subtotal:Nl(p,m)};m.replayed===!0&&(b.replayed=!0),typeof c.model=="string"&&(b.model=c.model),typeof c.session_id=="string"&&(b.session_id=c.session_id),Bs(r[p],b,!0),Bs(n.orchestrator[p],b,!0)}let d=Array.isArray(c.usage_legs)?c.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!af.includes(p.role)||!Pl(p.usage))continue;let m=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let b=Dl(p.usage),x={provider:"codex",role:p.role,attempt_id:String(c.attempt_id||""),usage:b,subtotal:Nl("codex",b)};x.receipt_id=m,typeof p.model=="string"&&(x.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(x.effort=p.effort),typeof p.session_id=="string"?x.session_id=p.session_id:typeof p.thread_id=="string"&&(x.session_id=p.thread_id),typeof p.turn_id=="string"&&(x.turn_id=p.turn_id),typeof p.completed_at=="string"&&(x.completed_at=p.completed_at),b.replayed===!0&&(x.replayed=!0),Bs(r.codex,x,!1),Bs(n[x.role].codex,x,!1)}}let o={};for(let c of["claude","codex"]){let u=r[c];if(u.legs.length===0)continue;let d=ql(u,!1);c==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[c]=d}if(Object.keys(o).length===0)return null;let a={};for(let c of["orchestrator","implementation","review-consult"]){let u={};for(let d of["claude","codex"]){let p=n[c][d];p.legs.length>0&&(u[d]={...ql(p,!0),legs:p.legs})}Object.keys(u).length>0&&(a[c]=u)}return{providers:o,roles:a}}var{entries:Yl,setPrototypeOf:Bl,isFrozen:_f,getPrototypeOf:mf,getOwnPropertyDescriptor:gf}=Object,{freeze:It,seal:Kt,create:ia}=Object,{apply:la,construct:ca}=typeof Reflect<"u"&&Reflect;It||(It=function(t){return t});Kt||(Kt=function(t){return t});la||(la=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ca||(ca=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Ws=Lt(Array.prototype.forEach),bf=Lt(Array.prototype.lastIndexOf),Ul=Lt(Array.prototype.pop),Nn=Lt(Array.prototype.push),hf=Lt(Array.prototype.splice),Hs=Lt(String.prototype.toLowerCase),ta=Lt(String.prototype.toString),ra=Lt(String.prototype.match),qn=Lt(String.prototype.replace),yf=Lt(String.prototype.indexOf),vf=Lt(String.prototype.trim),nr=Lt(Object.prototype.hasOwnProperty),Rt=Lt(RegExp.prototype.test),Fn=wf(TypeError);function Lt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return la(e,t,n)}}function wf(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ca(e,r)}}function Ze(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Hs;Bl&&Bl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(_f(t)||(t[n]=o),s=o)}e[s]=!0}return e}function kf(e){for(let t=0;t<e.length;t++)nr(e,t)||(e[t]=null);return e}function vr(e){let t=ia(null);for(let[r,n]of Yl(e))nr(e,r)&&(Array.isArray(n)?t[r]=kf(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=vr(n):t[r]=n);return t}function jn(e,t){for(;e!==null;){let n=gf(e,t);if(n){if(n.get)return Lt(n.get);if(typeof n.value=="function")return Lt(n.value)}e=mf(e)}function r(){return null}return r}var Wl=It(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),na=It(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),sa=It(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),$f=It(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),oa=It(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),xf=It(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),zl=It(["#text"]),Hl=It(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),aa=It(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Gl=It(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),zs=It(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Af=Kt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Sf=Kt(/<%[\w\W]*|[\w\W]*%>/gm),Ef=Kt(/\$\{[\w\W]*/gm),Tf=Kt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Cf=Kt(/^aria-[\-\w]+$/),Zl=Kt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Rf=Kt(/^(?:\w+script|data):/i),If=Kt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Xl=Kt(/^html$/i),Lf=Kt(/^[a-z][.\w]*(-[.\w]+)+$/i),Vl=Object.freeze({__proto__:null,ARIA_ATTR:Cf,ATTR_WHITESPACE:If,CUSTOM_ELEMENT:Lf,DATA_ATTR:Tf,DOCTYPE_NAME:Xl,ERB_EXPR:Sf,IS_ALLOWED_URI:Zl,IS_SCRIPT_OR_DATA:Rf,MUSTACHE_EXPR:Af,TMPLIT_EXPR:Ef}),Bn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Of=function(){return typeof window>"u"?null:window},Mf=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Kl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ql(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Of(),t=xe=>Ql(xe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Bn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:u,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:x}=e,A=u.prototype,L=jn(A,"cloneNode"),H=jn(A,"remove"),te=jn(A,"nextSibling"),J=jn(A,"childNodes"),N=jn(A,"parentNode");if(typeof a=="function"){let xe=r.createElement("template");xe.content&&xe.content.ownerDocument&&(r=xe.content.ownerDocument)}let q,R="",{implementation:U,createNodeIterator:g,createDocumentFragment:S,getElementsByTagName:V}=r,{importNode:oe}=n,D=Kl();t.isSupported=typeof Yl=="function"&&typeof N=="function"&&U&&U.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:j,ERB_EXPR:de,TMPLIT_EXPR:be,DATA_ATTR:ve,ARIA_ATTR:Te,IS_SCRIPT_OR_DATA:He,ATTR_WHITESPACE:rt,CUSTOM_ELEMENT:Pe}=Vl,{IS_ALLOWED_URI:Xe}=Vl,ce=null,Ie=Ze({},[...Wl,...na,...sa,...oa,...zl]),Ce=null,Ne=Ze({},[...Hl,...aa,...Gl,...zs]),ke=Object.seal(ia(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),qe=null,Ke=null,Ee=Object.seal(ia(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ve=!0,Y=!0,Z=!1,he=!0,Le=!1,Be=!0,Ue=!1,Fe=!1,it=!1,tt=!1,z=!1,K=!1,me=!0,Qe=!1,ge="user-content-",T=!0,O=!1,I={},G=null,se=Ze({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),w=null,C=Ze({},["audio","video","img","source","image","track"]),F=null,ue=Ze({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ae="http://www.w3.org/1998/Math/MathML",we="http://www.w3.org/2000/svg",Re="http://www.w3.org/1999/xhtml",We=Re,ze=!1,W=null,re=Ze({},[ae,we,Re],ta),pe=Ze({},["mi","mo","mn","ms","mtext"]),k=Ze({},["annotation-xml"]),E=Ze({},["title","style","font","a","script"]),M=null,X=["application/xhtml+xml","text/html"],$e="text/html",fe=null,Ae=null,Oe=r.createElement("form"),yt=function($){return $ instanceof RegExp||$ instanceof Function},vt=function(){let $=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ae&&Ae===$)){if((!$||typeof $!="object")&&($={}),$=vr($),M=X.indexOf($.PARSER_MEDIA_TYPE)===-1?$e:$.PARSER_MEDIA_TYPE,fe=M==="application/xhtml+xml"?ta:Hs,ce=nr($,"ALLOWED_TAGS")?Ze({},$.ALLOWED_TAGS,fe):Ie,Ce=nr($,"ALLOWED_ATTR")?Ze({},$.ALLOWED_ATTR,fe):Ne,W=nr($,"ALLOWED_NAMESPACES")?Ze({},$.ALLOWED_NAMESPACES,ta):re,F=nr($,"ADD_URI_SAFE_ATTR")?Ze(vr(ue),$.ADD_URI_SAFE_ATTR,fe):ue,w=nr($,"ADD_DATA_URI_TAGS")?Ze(vr(C),$.ADD_DATA_URI_TAGS,fe):C,G=nr($,"FORBID_CONTENTS")?Ze({},$.FORBID_CONTENTS,fe):se,qe=nr($,"FORBID_TAGS")?Ze({},$.FORBID_TAGS,fe):vr({}),Ke=nr($,"FORBID_ATTR")?Ze({},$.FORBID_ATTR,fe):vr({}),I=nr($,"USE_PROFILES")?$.USE_PROFILES:!1,Ve=$.ALLOW_ARIA_ATTR!==!1,Y=$.ALLOW_DATA_ATTR!==!1,Z=$.ALLOW_UNKNOWN_PROTOCOLS||!1,he=$.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Le=$.SAFE_FOR_TEMPLATES||!1,Be=$.SAFE_FOR_XML!==!1,Ue=$.WHOLE_DOCUMENT||!1,tt=$.RETURN_DOM||!1,z=$.RETURN_DOM_FRAGMENT||!1,K=$.RETURN_TRUSTED_TYPE||!1,it=$.FORCE_BODY||!1,me=$.SANITIZE_DOM!==!1,Qe=$.SANITIZE_NAMED_PROPS||!1,T=$.KEEP_CONTENT!==!1,O=$.IN_PLACE||!1,Xe=$.ALLOWED_URI_REGEXP||Zl,We=$.NAMESPACE||Re,pe=$.MATHML_TEXT_INTEGRATION_POINTS||pe,k=$.HTML_INTEGRATION_POINTS||k,ke=$.CUSTOM_ELEMENT_HANDLING||{},$.CUSTOM_ELEMENT_HANDLING&&yt($.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ke.tagNameCheck=$.CUSTOM_ELEMENT_HANDLING.tagNameCheck),$.CUSTOM_ELEMENT_HANDLING&&yt($.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ke.attributeNameCheck=$.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),$.CUSTOM_ELEMENT_HANDLING&&typeof $.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ke.allowCustomizedBuiltInElements=$.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Le&&(Y=!1),z&&(tt=!0),I&&(ce=Ze({},zl),Ce=[],I.html===!0&&(Ze(ce,Wl),Ze(Ce,Hl)),I.svg===!0&&(Ze(ce,na),Ze(Ce,aa),Ze(Ce,zs)),I.svgFilters===!0&&(Ze(ce,sa),Ze(Ce,aa),Ze(Ce,zs)),I.mathMl===!0&&(Ze(ce,oa),Ze(Ce,Gl),Ze(Ce,zs))),$.ADD_TAGS&&(typeof $.ADD_TAGS=="function"?Ee.tagCheck=$.ADD_TAGS:(ce===Ie&&(ce=vr(ce)),Ze(ce,$.ADD_TAGS,fe))),$.ADD_ATTR&&(typeof $.ADD_ATTR=="function"?Ee.attributeCheck=$.ADD_ATTR:(Ce===Ne&&(Ce=vr(Ce)),Ze(Ce,$.ADD_ATTR,fe))),$.ADD_URI_SAFE_ATTR&&Ze(F,$.ADD_URI_SAFE_ATTR,fe),$.FORBID_CONTENTS&&(G===se&&(G=vr(G)),Ze(G,$.FORBID_CONTENTS,fe)),T&&(ce["#text"]=!0),Ue&&Ze(ce,["html","head","body"]),ce.table&&(Ze(ce,["tbody"]),delete qe.tbody),$.TRUSTED_TYPES_POLICY){if(typeof $.TRUSTED_TYPES_POLICY.createHTML!="function")throw Fn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof $.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Fn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=$.TRUSTED_TYPES_POLICY,R=q.createHTML("")}else q===void 0&&(q=Mf(x,s)),q!==null&&typeof R=="string"&&(R=q.createHTML(""));It&&It($),Ae=$}},Je=Ze({},[...na,...sa,...$f]),Ct=Ze({},[...oa,...xf]),ir=function($){let ee=N($);(!ee||!ee.tagName)&&(ee={namespaceURI:We,tagName:"template"});let _e=Hs($.tagName),st=Hs(ee.tagName);return W[$.namespaceURI]?$.namespaceURI===we?ee.namespaceURI===Re?_e==="svg":ee.namespaceURI===ae?_e==="svg"&&(st==="annotation-xml"||pe[st]):!!Je[_e]:$.namespaceURI===ae?ee.namespaceURI===Re?_e==="math":ee.namespaceURI===we?_e==="math"&&k[st]:!!Ct[_e]:$.namespaceURI===Re?ee.namespaceURI===we&&!k[st]||ee.namespaceURI===ae&&!pe[st]?!1:!Ct[_e]&&(E[_e]||!Je[_e]):!!(M==="application/xhtml+xml"&&W[$.namespaceURI]):!1},Me=function($){Nn(t.removed,{element:$});try{N($).removeChild($)}catch{H($)}},qt=function($,ee){try{Nn(t.removed,{attribute:ee.getAttributeNode($),from:ee})}catch{Nn(t.removed,{attribute:null,from:ee})}if(ee.removeAttribute($),$==="is")if(tt||z)try{Me(ee)}catch{}else try{ee.setAttribute($,"")}catch{}},mr=function($){let ee=null,_e=null;if(it)$="<remove></remove>"+$;else{let ct=ra($,/^[\r\n\t ]+/);_e=ct&&ct[0]}M==="application/xhtml+xml"&&We===Re&&($='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+$+"</body></html>");let st=q?q.createHTML($):$;if(We===Re)try{ee=new b().parseFromString(st,M)}catch{}if(!ee||!ee.documentElement){ee=U.createDocument(We,"template",null);try{ee.documentElement.innerHTML=ze?R:st}catch{}}let mt=ee.body||ee.documentElement;return $&&_e&&mt.insertBefore(r.createTextNode(_e),mt.childNodes[0]||null),We===Re?V.call(ee,Ue?"html":"body")[0]:Ue?ee.documentElement:mt},Ft=function($){return g.call($.ownerDocument||$,$,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Yt=function($){return $ instanceof m&&(typeof $.nodeName!="string"||typeof $.textContent!="string"||typeof $.removeChild!="function"||!($.attributes instanceof p)||typeof $.removeAttribute!="function"||typeof $.setAttribute!="function"||typeof $.namespaceURI!="string"||typeof $.insertBefore!="function"||typeof $.hasChildNodes!="function")},gr=function($){return typeof c=="function"&&$ instanceof c};function $t(xe,$,ee){Ws(xe,_e=>{_e.call(t,$,ee,Ae)})}let Zt=function($){let ee=null;if($t(D.beforeSanitizeElements,$,null),Yt($))return Me($),!0;let _e=fe($.nodeName);if($t(D.uponSanitizeElement,$,{tagName:_e,allowedTags:ce}),Be&&$.hasChildNodes()&&!gr($.firstElementChild)&&Rt(/<[/\w!]/g,$.innerHTML)&&Rt(/<[/\w!]/g,$.textContent)||$.nodeType===Bn.progressingInstruction||Be&&$.nodeType===Bn.comment&&Rt(/<[/\w]/g,$.data))return Me($),!0;if(!(Ee.tagCheck instanceof Function&&Ee.tagCheck(_e))&&(!ce[_e]||qe[_e])){if(!qe[_e]&&cr(_e)&&(ke.tagNameCheck instanceof RegExp&&Rt(ke.tagNameCheck,_e)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(_e)))return!1;if(T&&!G[_e]){let st=N($)||$.parentNode,mt=J($)||$.childNodes;if(mt&&st){let ct=mt.length;for(let bt=ct-1;bt>=0;--bt){let xt=L(mt[bt],!0);xt.__removalCount=($.__removalCount||0)+1,st.insertBefore(xt,te($))}}}return Me($),!0}return $ instanceof u&&!ir($)||(_e==="noscript"||_e==="noembed"||_e==="noframes")&&Rt(/<\/no(script|embed|frames)/i,$.innerHTML)?(Me($),!0):(Le&&$.nodeType===Bn.text&&(ee=$.textContent,Ws([j,de,be],st=>{ee=qn(ee,st," ")}),$.textContent!==ee&&(Nn(t.removed,{element:$.cloneNode()}),$.textContent=ee)),$t(D.afterSanitizeElements,$,null),!1)},lr=function($,ee,_e){if(me&&(ee==="id"||ee==="name")&&(_e in r||_e in Oe))return!1;if(!(Y&&!Ke[ee]&&Rt(ve,ee))){if(!(Ve&&Rt(Te,ee))){if(!(Ee.attributeCheck instanceof Function&&Ee.attributeCheck(ee,$))){if(!Ce[ee]||Ke[ee]){if(!(cr($)&&(ke.tagNameCheck instanceof RegExp&&Rt(ke.tagNameCheck,$)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck($))&&(ke.attributeNameCheck instanceof RegExp&&Rt(ke.attributeNameCheck,ee)||ke.attributeNameCheck instanceof Function&&ke.attributeNameCheck(ee,$))||ee==="is"&&ke.allowCustomizedBuiltInElements&&(ke.tagNameCheck instanceof RegExp&&Rt(ke.tagNameCheck,_e)||ke.tagNameCheck instanceof Function&&ke.tagNameCheck(_e))))return!1}else if(!F[ee]){if(!Rt(Xe,qn(_e,rt,""))){if(!((ee==="src"||ee==="xlink:href"||ee==="href")&&$!=="script"&&yf(_e,"data:")===0&&w[$])){if(!(Z&&!Rt(He,qn(_e,rt,"")))){if(_e)return!1}}}}}}}return!0},cr=function($){return $!=="annotation-xml"&&ra($,Pe)},Ye=function($){$t(D.beforeSanitizeAttributes,$,null);let{attributes:ee}=$;if(!ee||Yt($))return;let _e={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ce,forceKeepAttr:void 0},st=ee.length;for(;st--;){let mt=ee[st],{name:ct,namespaceURI:bt,value:xt}=mt,_=fe(ct),v=xt,l=ct==="value"?v:vf(v);if(_e.attrName=_,_e.attrValue=l,_e.keepAttr=!0,_e.forceKeepAttr=void 0,$t(D.uponSanitizeAttribute,$,_e),l=_e.attrValue,Qe&&(_==="id"||_==="name")&&(qt(ct,$),l=ge+l),Be&&Rt(/((--!?|])>)|<\/(style|title|textarea)/i,l)){qt(ct,$);continue}if(_==="attributename"&&ra(l,"href")){qt(ct,$);continue}if(_e.forceKeepAttr)continue;if(!_e.keepAttr){qt(ct,$);continue}if(!he&&Rt(/\/>/i,l)){qt(ct,$);continue}Le&&Ws([j,de,be],y=>{l=qn(l,y," ")});let f=fe($.nodeName);if(!lr(f,_,l)){qt(ct,$);continue}if(q&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!bt)switch(x.getAttributeType(f,_)){case"TrustedHTML":{l=q.createHTML(l);break}case"TrustedScriptURL":{l=q.createScriptURL(l);break}}if(l!==v)try{bt?$.setAttributeNS(bt,ct,l):$.setAttribute(ct,l),Yt($)?Me($):Ul(t.removed)}catch{qt(ct,$)}}$t(D.afterSanitizeAttributes,$,null)},zt=function xe($){let ee=null,_e=Ft($);for($t(D.beforeSanitizeShadowDOM,$,null);ee=_e.nextNode();)$t(D.uponSanitizeShadowNode,ee,null),Zt(ee),Ye(ee),ee.content instanceof o&&xe(ee.content);$t(D.afterSanitizeShadowDOM,$,null)};return t.sanitize=function(xe){let $=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ee=null,_e=null,st=null,mt=null;if(ze=!xe,ze&&(xe="<!-->"),typeof xe!="string"&&!gr(xe))if(typeof xe.toString=="function"){if(xe=xe.toString(),typeof xe!="string")throw Fn("dirty is not a string, aborting")}else throw Fn("toString is not a function");if(!t.isSupported)return xe;if(Fe||vt($),t.removed=[],typeof xe=="string"&&(O=!1),O){if(xe.nodeName){let xt=fe(xe.nodeName);if(!ce[xt]||qe[xt])throw Fn("root node is forbidden and cannot be sanitized in-place")}}else if(xe instanceof c)ee=mr("<!---->"),_e=ee.ownerDocument.importNode(xe,!0),_e.nodeType===Bn.element&&_e.nodeName==="BODY"||_e.nodeName==="HTML"?ee=_e:ee.appendChild(_e);else{if(!tt&&!Le&&!Ue&&xe.indexOf("<")===-1)return q&&K?q.createHTML(xe):xe;if(ee=mr(xe),!ee)return tt?null:K?R:""}ee&&it&&Me(ee.firstChild);let ct=Ft(O?xe:ee);for(;st=ct.nextNode();)Zt(st),Ye(st),st.content instanceof o&&zt(st.content);if(O)return xe;if(tt){if(z)for(mt=S.call(ee.ownerDocument);ee.firstChild;)mt.appendChild(ee.firstChild);else mt=ee;return(Ce.shadowroot||Ce.shadowrootmode)&&(mt=oe.call(n,mt,!0)),mt}let bt=Ue?ee.outerHTML:ee.innerHTML;return Ue&&ce["!doctype"]&&ee.ownerDocument&&ee.ownerDocument.doctype&&ee.ownerDocument.doctype.name&&Rt(Xl,ee.ownerDocument.doctype.name)&&(bt="<!DOCTYPE "+ee.ownerDocument.doctype.name+`>
`+bt),Le&&Ws([j,de,be],xt=>{bt=qn(bt,xt," ")}),q&&K?q.createHTML(bt):bt},t.setConfig=function(){let xe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};vt(xe),Fe=!0},t.clearConfig=function(){Ae=null,Fe=!1},t.isValidAttribute=function(xe,$,ee){Ae||vt({});let _e=fe(xe),st=fe($);return lr(_e,st,ee)},t.addHook=function(xe,$){typeof $=="function"&&Nn(D[xe],$)},t.removeHook=function(xe,$){if($!==void 0){let ee=bf(D[xe],$);return ee===-1?void 0:hf(D[xe],ee,1)[0]}return Ul(D[xe])},t.removeHooks=function(xe){D[xe]=[]},t.removeAllHooks=function(){D=Kl()},t}var Jl=Ql();var wr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Gs=e=>(...t)=>({_$litDirective$:e,values:t}),$n=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Un=class extends $n{constructor(t){if(super(t),this.it=gt,t.type!==wr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===gt||t==null)return this._t=void 0,this.it=t;if(t===Ht)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Un.directiveName="unsafeHTML",Un.resultType=1;var ec=Gs(Un);function fa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Jr=fa();function ic(e){Jr=e}var Gn={exec:()=>null};function nt(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Ot.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Pf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ot={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Df=/^(?:[ \t]*(?:\n|$))+/,Nf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,qf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Vn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ff=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,_a=/(?:[*+-]|\d{1,9}[.)])/,lc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,cc=nt(lc).replace(/bull/g,_a).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),jf=nt(lc).replace(/bull/g,_a).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ma=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Bf=/^[^\n]+/,ga=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Uf=nt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ga).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Wf=nt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,_a).getRegex(),Qs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ba=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,zf=nt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ba).replace("tag",Qs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),uc=nt(ma).replace("hr",Vn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qs).getRegex(),Hf=nt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",uc).getRegex(),ha={blockquote:Hf,code:Nf,def:Uf,fences:qf,heading:Ff,hr:Vn,html:zf,lheading:cc,list:Wf,newline:Df,paragraph:uc,table:Gn,text:Bf},tc=nt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Vn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qs).getRegex(),Gf={...ha,lheading:jf,table:tc,paragraph:nt(ma).replace("hr",Vn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",tc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qs).getRegex()},Vf={...ha,html:nt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ba).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Gn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:nt(ma).replace("hr",Vn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",cc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Kf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Yf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,dc=/^( {2,}|\\)\n(?!\s*$)/,Zf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Js=/[\p{P}\p{S}]/u,ya=/[\s\p{P}\p{S}]/u,pc=/[^\s\p{P}\p{S}]/u,Xf=nt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ya).getRegex(),fc=/(?!~)[\p{P}\p{S}]/u,Qf=/(?!~)[\s\p{P}\p{S}]/u,Jf=/(?:[^\s\p{P}\p{S}]|~)/u,e_=nt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Pf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),_c=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,t_=nt(_c,"u").replace(/punct/g,Js).getRegex(),r_=nt(_c,"u").replace(/punct/g,fc).getRegex(),mc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",n_=nt(mc,"gu").replace(/notPunctSpace/g,pc).replace(/punctSpace/g,ya).replace(/punct/g,Js).getRegex(),s_=nt(mc,"gu").replace(/notPunctSpace/g,Jf).replace(/punctSpace/g,Qf).replace(/punct/g,fc).getRegex(),o_=nt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,pc).replace(/punctSpace/g,ya).replace(/punct/g,Js).getRegex(),a_=nt(/\\(punct)/,"gu").replace(/punct/g,Js).getRegex(),i_=nt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),l_=nt(ba).replace("(?:-->|$)","-->").getRegex(),c_=nt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",l_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ys=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,u_=nt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ys).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),gc=nt(/^!?\[(label)\]\[(ref)\]/).replace("label",Ys).replace("ref",ga).getRegex(),bc=nt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ga).getRegex(),d_=nt("reflink|nolink(?!\\()","g").replace("reflink",gc).replace("nolink",bc).getRegex(),rc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,va={_backpedal:Gn,anyPunctuation:a_,autolink:i_,blockSkip:e_,br:dc,code:Yf,del:Gn,emStrongLDelim:t_,emStrongRDelimAst:n_,emStrongRDelimUnd:o_,escape:Kf,link:u_,nolink:bc,punctuation:Xf,reflink:gc,reflinkSearch:d_,tag:c_,text:Zf,url:Gn},p_={...va,link:nt(/^!?\[(label)\]\((.*?)\)/).replace("label",Ys).getRegex(),reflink:nt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ys).getRegex()},ua={...va,emStrongRDelimAst:s_,emStrongLDelim:r_,url:nt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",rc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:nt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",rc).getRegex()},f_={...ua,br:nt(dc).replace("{2,}","*").getRegex(),text:nt(ua.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Vs={normal:ha,gfm:Gf,pedantic:Vf},Wn={normal:va,gfm:ua,breaks:f_,pedantic:p_},__={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},nc=e=>__[e];function kr(e,t){if(t){if(Ot.escapeTest.test(e))return e.replace(Ot.escapeReplace,nc)}else if(Ot.escapeTestNoEncode.test(e))return e.replace(Ot.escapeReplaceNoEncode,nc);return e}function sc(e){try{e=encodeURI(e).replace(Ot.percentDecode,"%")}catch{return null}return e}function oc(e,t){let r=e.replace(Ot.findPipe,(o,a,c)=>{let u=!1,d=a;for(;--d>=0&&c[d]==="\\";)u=!u;return u?"|":" |"}),n=r.split(Ot.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ot.slashPipe,"|");return n}function zn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function m_(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ac(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,u}function g_(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var Zs=class{constructor(e){lt(this,"options");lt(this,"rules");lt(this,"lexer");this.options=e||Jr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:zn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=g_(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=zn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:zn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=zn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))c.push(r[u]),a=!0;else if(!a)c.push(r[u]);else break;r=r.slice(u);let d=c.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=m,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let x=b,A=x.raw+`
`+r.join(`
`),L=this.blockquote(A);o[o.length-1]=L,n=n.substring(0,n.length-x.raw.length)+L.raw,s=s.substring(0,s.length-x.text.length)+L.text;break}else if(b?.type==="list"){let x=b,A=x.raw+`
`+r.join(`
`),L=this.list(A);o[o.length-1]=L,n=n.substring(0,n.length-b.raw.length)+L.raw,s=s.substring(0,s.length-x.raw.length)+L.raw,r=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let u=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),b=e.split(`
`,1)[0],x=!m.trim(),A=0;if(this.options.pedantic?(A=2,p=m.trimStart()):x?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,p=m.slice(A),A+=t[1].length),x&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,e=e.substring(b.length+1),u=!0),!u){let L=this.rules.other.nextBulletRegex(A),H=this.rules.other.hrRegex(A),te=this.rules.other.fencesBeginRegex(A),J=this.rules.other.headingBeginRegex(A),N=this.rules.other.htmlBeginRegex(A);for(;e;){let q=e.split(`
`,1)[0],R;if(b=q,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),R=b):R=b.replace(this.rules.other.tabCharGlobal,"    "),te.test(b)||J.test(b)||N.test(b)||L.test(b)||H.test(b))break;if(R.search(this.rules.other.nonSpaceChar)>=A||!b.trim())p+=`
`+R.slice(A);else{if(x||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(m)||J.test(m)||H.test(m))break;p+=`
`+b}!x&&!b.trim()&&(x=!0),d+=q+`
`,e=e.substring(q.length+1),m=R.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=p.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=p.raw+u.tokens[0].raw,u.tokens[0].text=p.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(p)):u.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):u.tokens.unshift(p)}}if(!s.loose){let d=u.tokens.filter(m=>m.type==="space"),p=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=p}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=oc(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(oc(a,o.header.length).map((c,u)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=zn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=m_(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ac(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ac(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,u=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+u);let p=[...n[0]][0].length,m=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let x=m.slice(1,-1);return{type:"em",raw:m,text:x,tokens:this.lexer.inlineTokens(x)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},sr=class da{constructor(t){lt(this,"tokens");lt(this,"options");lt(this,"state");lt(this,"inlineQueue");lt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Jr,this.options.tokenizer=this.options.tokenizer||new Zs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ot,block:Vs.normal,inline:Wn.normal};this.options.pedantic?(r.block=Vs.pedantic,r.inline=Wn.pedantic):this.options.gfm&&(r.block=Vs.gfm,this.options.breaks?r.inline=Wn.breaks:r.inline=Wn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Vs,inline:Wn}}static lex(t,r){return new da(r).lex(t)}static lexInline(t,r){return new da(r).inlineTokens(t)}lex(t){t=t.replace(Ot.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Ot.tabCharGlobal,"    ").replace(Ot.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,c=t.slice(1),u;this.options.extensions.startBlock.forEach(d=>{u=d.call({lexer:this},c),typeof u=="number"&&u>=0&&(a=Math.min(a,u))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let u;if(this.options.extensions?.inline?.some(p=>(u=p.call({lexer:this},t,r))?(t=t.substring(u.raw.length),r.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let p=r.at(-1);u.type==="text"&&p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):r.push(u);continue}if(u=this.tokenizer.emStrong(t,n,c)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),r.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),r.push(u);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,m=t.slice(1),b;this.options.extensions.startInline.forEach(x=>{b=x.call({lexer:this},m),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(c=u.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=u.raw,p.text+=u.text):r.push(u);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Xs=class{constructor(e){lt(this,"options");lt(this,"parser");this.options=e||Jr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Ot.notSpaceStart)?.[0],s=e.replace(Ot.endingNewline,"")+`
`;return n?'<pre><code class="language-'+kr(n)+'">'+(r?s:kr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:kr(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let c=e.items[a];n+=this.listitem(c)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${kr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=sc(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+kr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=sc(e);if(s===null)return kr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${kr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:kr(e.text)}},wa=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},or=class pa{constructor(t){lt(this,"options");lt(this,"renderer");lt(this,"textRenderer");this.options=t||Jr,this.options.renderer=this.options.renderer||new Xs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new wa}static parse(t,r){return new pa(r).parse(t)}static parseInline(t,r){return new pa(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},Ks,Hn=(Ks=class{constructor(e){lt(this,"options");lt(this,"block");this.options=e||Jr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?sr.lex:sr.lexInline}provideParser(){return this.block?or.parse:or.parseInline}},lt(Ks,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),lt(Ks,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ks),b_=class{constructor(...e){lt(this,"defaults",fa());lt(this,"options",this.setOptions);lt(this,"parse",this.parseMarkdown(!0));lt(this,"parseInline",this.parseMarkdown(!1));lt(this,"Parser",or);lt(this,"Renderer",Xs);lt(this,"TextRenderer",wa);lt(this,"Lexer",sr);lt(this,"Tokenizer",Zs);lt(this,"Hooks",Hn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Xs(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],u=s[a];s[a]=(...d)=>{let p=c.apply(s,d);return p===!1&&(p=u.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Zs(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],u=s[a];s[a]=(...d)=>{let p=c.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Hn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],u=s[a];Hn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Hn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await c.call(s,d);return u.call(s,m)})();let p=c.call(s,d);return u.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await c.apply(s,d);return m===!1&&(m=await u.apply(s,d)),m})();let p=c.apply(s,d);return p===!1&&(p=u.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return sr.lex(e,t??this.defaults)}parser(e,t){return or.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?sr.lex:sr.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?or.parse:or.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?sr.lex:sr.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?or.parse:or.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+kr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Qr=new b_;function at(e,t){return Qr.parse(e,t)}at.options=at.setOptions=function(e){return Qr.setOptions(e),at.defaults=Qr.defaults,ic(at.defaults),at};at.getDefaults=fa;at.defaults=Jr;at.use=function(...e){return Qr.use(...e),at.defaults=Qr.defaults,ic(at.defaults),at};at.walkTokens=function(e,t){return Qr.walkTokens(e,t)};at.parseInline=Qr.parseInline;at.Parser=or;at.parser=or.parse;at.Renderer=Xs;at.TextRenderer=wa;at.Lexer=sr;at.lexer=sr.lex;at.Tokenizer=Zs;at.Hooks=Hn;at.parse=at;var oy=at.options,ay=at.setOptions,iy=at.use,ly=at.walkTokens,cy=at.parseInline;var uy=or.parse,dy=sr.lex;function Or(e){let t=at.parse(e),r=Jl.sanitize(t);return ec(r)}function $r(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function xn(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function eo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var h_={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},y_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},v_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,w_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function fr(e){return!!e&&typeof e=="object"}function ka(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function hc(e,t){let r=ka(e),n=ka(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let u=s.get(c)||0;u>0?s.set(c,u-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function k_(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>fr(s)&&typeof s.text=="string"?s.text:"").join(""):fr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function $_(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:h_[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ka(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=hc(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let u=hc(fr(c)?c.old_string:"",fr(c)?c.new_string:"");s+=u.added,o+=u.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function $a(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function xa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=v_.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:w_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function x_(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(fr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(xa(o.text));else if(o.type==="thinking"){let a=$a(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=$_(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(fr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=k_(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function A_(e){if(e.type==="item.completed"&&fr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[xa(t.text)];if(t.type==="reasoning"){let r=$a(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function S_(e){if(e.schema!=="codex-delegation-monitor-v1"||!fr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&fr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[xa(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let c=$a(r.text);return c?[c]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=y_[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function E_(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function yc(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!fr(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?S_(o):E_(o)?A_(o):x_(o,r);for(let c of a)t.push(c)}return t}var T_=5,C_=10,R_=/Task\s+#(\d+)/,I_=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,L_=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function to(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function O_(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function M_(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function P_(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=R_.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function D_(e){if(e.tool==="Bash"){let t=e.command||"";return I_.test(t)?"~ PR/\uAC8C\uC2DC \uC911":L_.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function N_(e){let t=e.filter(s=>s.kind==="tool").slice(-C_),r=new Map;t.forEach((s,o)=>{let a=D_(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function q_(e){let t=M_(e);if(t)return{text:t,guess:!1};let r=P_(e);if(r)return{text:r,guess:!1};let n=N_(e);return n?{text:n,guess:!0}:null}function F_(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Bt(e,t)}function ro(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,c=null,u=!1,d={},p=!0,m=new Set,b=new Set,x=null,A=null,L=!1,H=!1,te=!1,J=null,N=null;function q(){L=!1,H=!1,te=!1,J=null,N=null}async function R(Y){if(r){H=!0,te=!1,ce();try{let Z=await Promise.resolve(r("get-attempt-prompt",{attempt_id:Y}));if(o!==Y)return;!Z||typeof Z!="object"||Array.isArray(Z)?te=!0:(J=Z,N=Y)}catch{o===Y&&(te=!0)}finally{o===Y&&(H=!1,ce())}}}function U(){if(L=!L,L&&o&&N!==o){R(o);return}ce()}function g(){if(!L)return"";let Y=xn({loading:H,error:te});if(Y)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Y}
      </div>`;if(!J)return"";if(J.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Z=eo(J.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Z?i`<div class="prompt-block__meta">${Z} 발송</div>`:""}
      ${typeof J.task_prompt=="string"?$r("\uACFC\uC5C5 (user)",J.task_prompt):""}
      ${typeof J.system_prompt=="string"?$r("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",J.system_prompt):""}
    </div>`}function S(){if(!c||!n)return[];let Y=n.get(c);return yc(Y?Y.lines:[])}function V(){if(!c||!n)return null;let Y=n.get(c),Z=Y?Y.last_event_at:null;return typeof Z=="number"?Z:null}function oe(){return d.status==="running"}function D(){if(oe()&&o){A||(A=setInterval(()=>ce(),1e3));return}j()}function j(){A&&(clearInterval(A),A=null)}function de(Y){let Z=[],he=0;for(;he<Y.length;){let Le=Y[he];if(Le.kind==="tool"){let Be=he;for(;Be<Y.length&&Y[Be].kind==="tool"&&Y[Be].tool===Le.tool;)Be+=1;if(Be-he>=T_&&!b.has(he)){Z.push({kind:"group",idx:he,tool:Le.tool||"",lines:Y.slice(he,Be).map((Ue,Fe)=>({idx:he+Fe,line:Ue}))}),he=Be;continue}}Z.push({kind:"line",idx:he,line:Le}),he+=1}return Z}function be(Y){for(let Z=Y.length-1;Z>=0;Z-=1){let he=Y[Z];if(he.kind==="result"||he.kind==="error")return null;if(he.kind==="tool"&&!Object.hasOwn(he,"result"))return he}return null}function ve(Y){for(let Z=Y.length-1;Z>=0;Z-=1)if(Y[Z].kind==="thinking")return Y[Z];return null}function Te(Y,Z){if(Z.kind==="gate")return i`<div class="sv__gate">${Z.text}</div>`;if(Z.kind==="phase")return i`<div class="sv__phase">${Z.text}</div>`;if(Z.kind==="result")return i`<div
        class="sv__result${Z.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Z.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Or(Z.text||(Z.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Z.kind==="thinking"){let he=m.has(Y);return i`<div
        class="sv__think${he?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ce(Y)}
      >
        <span class="sv__think-line">💭 ${to(Z.text)}</span>
        ${he?i`<pre class="sv__think-expand">${Z.text}</pre>`:""}
      </div>`}if(Z.kind==="error")return i`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="blocker")return i`<div class="sv__error">⛔ ${Z.text}</div>`;if(Z.kind==="tool"){let he=m.has(Y),Le=Z.tool==="Bash"?O_(Z.command):0,Be=Z.tool==="Bash"?Le>1?to(Z.command):Z.command:Z.path||Z.command||"";return i`<div
        class="sv__tool${he?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ce(Y)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Z.icon}</span>
          <span class="sv__tool-name">${Z.tool}</span>
          ${Be?i`<span class="sv__tool-detail">${Be}</span>`:""}
          ${Le>1?i`<span class="sv__tool-more">⋯ ${Le}줄</span>`:""}
          ${typeof Z.added=="number"?i`<span class="sv__diff-add">+${Z.added}</span>`:""}
          ${typeof Z.removed=="number"?i`<span class="sv__diff-del">−${Z.removed}</span>`:""}
          ${Z.result?i`<span class="sv__tool-ok">→ ${Z.result}</span>`:""}
        </span>
        ${he?i`<pre class="sv__tool-expand">${He(Z)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${Or(Z.text||"")}</div>`}function He(Y){let Z=[];if(Y.tool==="Bash"&&typeof Y.command=="string"&&Y.command.length>0)Z.push(Y.command);else if(Y.input!==void 0)try{Z.push(`input: ${JSON.stringify(Y.input,null,2)}`)}catch{}return typeof Y.output=="string"&&Y.output.length>0&&Z.push(`output:
${Y.output}`),Z.join(`

`)}function rt(){if(!o)return i``;let Y=S(),Z=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),he=d.session_id||"",Le=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,Be=oe(),Ue=Be?F_(V(),Date.now()):"",Fe=Be?be(Y):null,it=Be?ve(Y):null,tt=q_(Y);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${tt?i`<span
              class="sv__stage${tt.guess?" sv__stage--guess":""}"
              title=${tt.text}
              >${tt.text}</span
            >`:""}
        ${Be?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ue?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ue}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ue?i`<span class="sv__live-ago">${Ue}</span>`:""}</span
            >`:""}
        ${he?i`<button
              type="button"
              class="sv__session"
              title=${he}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${he}`}
              @click=${()=>ke(he)}
            >
              ⧉ ${he.slice(0,8)}
            </button>`:""}
        ${Z?i`<span class="sv__meta">${Z}</span>`:""}
        ${d.worktree?i`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":i`<button
              type="button"
              class="sv__prompt-toggle${L?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${L?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${U}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Le}
          @click=${Ne}
        >
          <span class="sv__follow-full">⇣ ${Le}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ve()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":g()}
      <div class="sv__body">
        ${Y.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:de(Y).map(z=>z.kind==="group"?Pe(z):Te(z.idx,z.line))}
      </div>
      ${Fe||it?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Fe?i`<span class="sv__now-icon">${Fe.icon}</span>
                  <span class="sv__now-name">${Fe.tool}</span>
                  <span class="sv__now-detail"
                    >${Fe.tool==="Bash"?to(Fe.command):Fe.path||Fe.command||""}</span
                  >`:""}
            ${it?i`<span class="sv__now-think"
                  >💭 ${to(it.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Pe(Y){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Xe(Y.idx)}
    >
      <span class="sv__group-icon">${Y.lines[0].line.icon}</span>
      <span class="sv__group-name">${Y.tool}</span>
      <span class="sv__group-count">${Y.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Xe(Y){b.add(Y),ce()}function ce(){Ge(rt(),e),D(),p&&Ie()}function Ie(){let Y=e.querySelector(".sv__body");Y&&(Y.scrollTop=Y.scrollHeight)}function Ce(Y){m.has(Y)?m.delete(Y):m.add(Y),ce()}function Ne(){p=!p,ce()}function ke(Y){tr(Y).then(Z=>{Z?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function qe(Y){!o||!Y||(d={...d,...Y},ce())}function Ke(Y){let Z=Y.target;if(!Z||!Z.classList||!Z.classList.contains("sv__body"))return;!(Z.scrollHeight-Z.scrollTop-Z.clientHeight<=4)&&p&&(p=!1,ce())}e.addEventListener("scroll",Ke,!0);function Ee(Y){let Z=Y&&Y.attempt_id;if(!Z)return;let he=c;o=Z,a=typeof Y.launch_id=="string"&&Y.launch_id.length>0?Y.launch_id:null,c=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&he&&he!==c&&Promise.resolve(r("unsubscribe-session-log",{id:he})).catch(()=>{}),d=Y.meta||{},u=Y.hide_prompt===!0,p=!0,m.clear(),b.clear(),q(),!x&&n&&(x=n.subscribe(ce)),r&&Promise.resolve(r("subscribe-session-log",{id:c,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),ce()}function Ve(){let Y=c;o=null,a=null,c=null,u=!1,m.clear(),b.clear(),q(),j(),r&&Y&&Promise.resolve(r("unsubscribe-session-log",{id:Y})).catch(()=>{}),Ge(i``,e),s&&s()}return{open:Ee,updateMeta:qe,close:Ve,isOpen(){return o!==null},destroy(){j(),x&&(x(),x=null),e.removeEventListener("scroll",Ke,!0),o=null,a=null,c=null,u=!1,Ge(i``,e)}}}function no(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Aa(t.spec_id),s=Aa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Aa(e){return typeof e=="string"?e.trim():""}function vc(e){let t=no(e);if(t.path)return t;let r=Aa(j_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function j_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function B_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function U_(e){let t=e&&e.metadata||{},r=vc(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:B_(t)?null:"plan_pending"}),n}function wc(e,t){let r=U_(e);return i`
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
  `}var W_="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",z_=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,H_=/^\*\*결론\*\* — (.+)$/;function so(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==W_)return null;let r=z_.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?H_.exec(t[a]):null,u=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var kc=20;function $c(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function G_(e){return e.length>kc?`${e.slice(0,kc)}\u2026`:e}function V_(e,t,r,n){let s=`${t.lane} ${G_(t.identifier)}`;return i`<div class="detail-report">
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
          ${Or(t.body)}
        </div>`:""}
  </div>`}function K_(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${$c(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Or(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function xc(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${c.map(u=>{let d=so(typeof u.text=="string"?u.text:"");return d?V_(u,d,t,s.has(u.id)):K_(u)})}
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
  `}var{I:zy}=Gi;var Ac=e=>e.strings===void 0;var Y_={},Sc=(e,t=Y_)=>e._$AH=t;var en=Gs(class extends $n{constructor(e){if(super(e),e.type!==wr.PROPERTY&&e.type!==wr.ATTRIBUTE&&e.type!==wr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ac(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ht||t===gt)return t;let r=e.element,n=e.name;if(e.type===wr.PROPERTY){if(t===r[n])return Ht}else if(e.type===wr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Ht}else if(e.type===wr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Ht;return Sc(e),t}});var oo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ea=[...oo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],xr=["orchestration_model","orchestration_effort","orchestration_speed"],ao=[...oo,...xr],Z_=Ea.filter(e=>ao.includes(e)),Ec=["delegated","main"],io=["inherit","claude","codex"],Kn=["default","fast"],Yn=["standard","fast_track"],Zn=["codex","opus","fable","self","skip"],lo=["codex","fable","skip"],co=["low","medium","high","xhigh"],Wt="auto";function Ut(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Tc(e){if(!Ut(e)||!Ut(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))Ut(n)&&Ut(n.models)&&t.push([r,Object.keys(n.models)]);return t}function An(e,t){let r=Tc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Wt,...n.flatMap(([,s])=>s)]}function Cc(e,t,r,n){if(!Ut(e)||!Ut(e.runners))return[Wt];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!Ut(a)||!Ut(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[c,u]of Object.entries(a.models)){if(r&&r!==Wt&&c!==r)continue;let d=n(a,u);if(Array.isArray(d))for(let p of d)typeof p=="string"&&!s.includes(p)&&s.push(p)}return[Wt,...s]}function Sn(e,t,r){return Cc(e,t,r,(n,s)=>Ut(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function Ta(e,t,r){return Cc(e,t,r,(n,s)=>Ut(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:Ut(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function Xn(e,t){let r=Tc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Rc(e,t,r){let n={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:n.impl_runtime==="inherit"?r:null;return s&&(n.impl_model&&!An(t,s).includes(n.impl_model)&&(n.impl_model=void 0),n.impl_effort&&!Sn(t,s,n.impl_model||Wt).includes(n.impl_effort)&&(n.impl_effort=void 0)),n}var X_={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Sa=[...Z_,...xr],Q_=[...ao,...Ea].filter((e,t,r)=>r.indexOf(e)===t&&!Sa.includes(e));function Ic(e,t){let r=Ut(e)?e:{},n=Ut(t)?t:{},s=[];for(let a of Sa){let c=r[a]??null,u=n[a]??null;c!==u&&s.push({key:a,label:X_[a]||a,before:c,after:u,kind:c===null?"added":u===null?"removed":"changed"})}let o=[];for(let a of[...Q_,...Object.keys(n)])!Sa.includes(a)&&!o.includes(a)&&Object.hasOwn(n,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ca(e,t,r,n,s,o){return js({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function Lc(e,t){let r={};for(let n of Ea){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Oc(e,t){let r={};for(let n of xr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Ra=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...xr]}],Mr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},uo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ia(e,t,r,n,s,o=null){let a=pr({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(c=>({key:c,...a[c]}))}function Mc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let c of Ia(e,t,r,n,s,o))a[c.source]+=1;return a}function Pc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Dc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var tv=[...oo,...xr];var J_=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],em={pin:"pin",global:"global",base:"base"};function tm(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${em[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function rm(e,t,r){switch(e){case"workflow_mode":return Yn;case"spec_review_model":case"impl_review_model":return Zn;case"plan_review_model":return lo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return co;case"impl_dispatch":return Ec;case"impl_runtime":return io;case"impl_model":return An(r,t.impl_runtime);case"impl_effort":return Sn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Kn;case"orchestration_model":return Xn(r,null);case"orchestration_effort":return Sn(r,void 0,t.orchestration_model||Wt).filter(n=>n!==Wt);default:return[]}}function nm(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${tm(e.source)}
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
      >${uo[e.source]}</span
    >
    ${t.expanded?i`<select
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
          ${t.options.map(r=>i`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function Nc(e,t){let r=Ra.flatMap(u=>u.keys),n=Ia(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Mc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(u=>[u.key,u])),a=Object.fromEntries(n.filter(u=>u.value!==null).map(u=>[u.key,u.value])),c=n.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return i`<details
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
      <span class="detail-effective__summary" title=${c}
        >${sm(o)}</span
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
          ${Ra.map(u=>i`
              <div class="detail-effective__subhead">${u.label}</div>
              ${n.filter(d=>u.keys.includes(d.key)).map(d=>{let p=js({key:d.key,choices:rm(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return nm(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${en(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${u=>t.onPresetSelect(String(u.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(u=>i`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?i`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function sm(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function om(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function qc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",c=om(r.exec_receipt),u=c?Xr(c):a,d=c?`${c.kind}:${c.actor}`:a.split("@")[0],p=qs(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${p?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
          >`:""}
      ${u?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${c?.effort?i`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${c.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${J_.map(m=>{let b=m.receipt&&typeof t[m.receipt]=="string"?String(t[m.receipt]):"",x=n[m.id],A=b.length>0||x?.fill==="full",L=!A&&x?.fill==="dim",H=x?.stale===!0;return i`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${L?" detail-summary__gate--current":""}${H?" detail-summary__gate--stale":""}`}
          data-gate=${m.id}
        >
          <span class="detail-summary__gate-pill">${m.label}</span>
          ${b?i`<span class="detail-summary__gate-sha"
                >${b.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var Fc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Qn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function po(e){if(!Qn(e)||!Qn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Qn(r)&&Qn(r.models));return t.length>0?t:null}function Ar(e,t){let r=po(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function jc(e,t){return Qn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Bc(e,t){let r=po(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return jc(n,n.models[t]);return[]}function am(e){let t=po(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of jc(n,s))r.includes(o)||r.push(o);return r}function im(e,t){if(!t)return am(e);let n=po(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Bc(e,o))s.includes(a)||s.push(a);return s}function Uc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Ar(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Bc(t,n.impl_model):im(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function lm(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Wc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function u(A){A.key==="Escape"&&s&&(A.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${lm(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${c}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Or(a)}
          </div>
        </div>
      </div>
    `:i``}function p(){Ge(d(),e)}async function m(A,L={}){s=A,o="loading",a="",c="",p();let H=r?r():"";if(!H){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let te="/api/doc?workspace="+encodeURIComponent(H)+"&path="+encodeURIComponent(A);try{let J=await n(te),N=await J.json().catch(()=>({}));if(!J.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&L.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||J.status)+")",p();return}a=String(N.content||""),o="ready",p()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function b(){s=null,Ge(i``,e)}function x(){document.removeEventListener("keydown",u),b()}return{open:m,close:b,destroy:x}}var cm=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Hc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",fo=["implementation","review-consult"],um=["running","done","failed","interrupted"],dm={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function pm(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function fm(e){let t=Et(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=wn(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Hc}
          >부분 집계</span
        >`:""}`}function zc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function La(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Oa(t):""}function _m(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!fo.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!um.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function mm(e,t){let n=Et({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
    ${La(t.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
          >${La(t.completed_at)}</span
        >`:""}
    ${n?i`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function gm(e,t,r,n){let s=e.status==="running"?null:t,a=(s?Et({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],c=e.status==="running"?Oa(e.last_event_at):s?La(s.completed_at):"";return i`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${dm[e.status]}</span
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
    ${c?i`<span class="detail-session__leg-time detail-session__time"
          >${c}</span
        >`:""}
    ${a?i`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function bm(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function hm(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let m=_m(p);!m||s.has(m.launch_id)||(s.add(m.launch_id),n.push(m))}n.sort((p,m)=>p.started_at-m.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let p of fo){let m=t.roles[p]?.codex;a[p]=m?[...m.legs]:[]}let c=fo.flatMap(p=>a[p]),u=new Set,d=[];for(let p of fo){for(let m of n.filter(b=>b.role===p)){let b=c.find(x=>x.receipt_id===m.launch_id)||null;b&&!bm(m,b)||(b&&u.add(b.receipt_id),d.push(gm(m,b,e.attempt_id,r)))}for(let m of a[p])u.has(m.receipt_id)||d.push(mm(p,m))}return d}function ym(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...cm,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${pm(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Hc}</span>`:""}
  </div>`}var vm={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Oa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function wm(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Gc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let m=typeof d.session_id=="string"&&d.session_id.length>0,b=o.has(d.attempt_id),x=m&&!b,A=m?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!x}
      title=${A}
      @click=${L=>{L.stopPropagation(),x&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let m=d.cause_detail,b=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:d.cause;return i`<div class="detail-session__cause" title=${b}>
      ${d.cause}
    </div>`},u=d=>{let p=zc(ea(d));if(Et(p).length===0&&!wn(d.usage))return"";let m=s.has(d.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${fm(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=ea(d),m=zc(p),b=Et(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${vm[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Ir(d)?i`<span
                  class="detail-session__resumed"
                  title=${Ir(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${dr(d)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(x=>i`<span
                      class="detail-session__usage"
                      title=${x.tooltip}
                      >${x.label}</span
                    >`):wn(d.usage)?i`<span class="detail-session__usage"
                    >${wn(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Oa(d.started_at)}</span>
          </button>
          ${u(d)} ${a(d)} ${c(d)} ${wm(d)}
          ${s.has(d.attempt_id)&&d.usage?ym(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${hm(d,p,t)}
        </div>`})}
    </div>
  `}function Vc(e,t={}){return i`
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
          ${km(e)}
        </div>`:""}
  `}function km(e){let t=xn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?$r("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=eo(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?$r("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?$r("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var $m=["open","in_progress","deferred","resolved","closed"],xm=[0,1,2,3,4];function Kc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,u=t.sessionLogStore,d=null,p=null,m={},b="",x=!1,A=[],L=!1,H={},te=!1,J=!1,N="",q="",R="";function U(){te=!1,J=!1,N="",q="",R=""}let g=[],S=null,V=null,oe=!1,D="",j=!1,de=0,be=new Set;function ve(){g=[],S=null,V=null,oe=!1,D="",j=!1,de+=1,be.clear()}async function Te(l){if(!s)return;let f=++de;try{let y=await Promise.resolve(s("get-comments",{id:l}));if(f!==de||l!==d)return;g=Array.isArray(y)?y:[],oe=!1}catch{if(f!==de||l!==d)return;oe=!0}v()}function He(){if(!s||!d)return;let l=p&&typeof p.comment_count=="number"?p.comment_count:null;if(S!==d){S=d,V=l,Te(d);return}l!==null&&l!==V&&(V=l,Te(d))}function rt(l){be.has(l)?be.delete(l):be.add(l),v()}function Pe(l){let f=D.trim().length===0;D=l,f!==(l.trim().length===0)&&v()}async function Xe(){let l=D.trim();if(!s||!d||l.length===0||j)return;let f=d;j=!0,v();let y=!1;try{let P=await Promise.resolve(s("add-comment",{id:f,text:l}));Array.isArray(P)&&P.length>0&&(y=!0,f===d&&(g=P,oe=!1,D="",V=P.length))}catch{y=!1}y||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),f===d&&(j=!1),v()}let ce={onToggle:rt,onDraftInput:Pe,onSubmit:Xe},Ie=document.createElement("div");Ie.className="md-viewer-root",document.body.appendChild(Ie);let Ce=Wc(Ie,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ne=document.createElement("div");Ne.className="session-log-root",document.body.appendChild(Ne);let ke=ro(Ne,{transport:s?(l,f)=>Promise.resolve(s(l,f)):void 0,sessionLogStore:u}),qe=!1,Ke=!1,Ee=!1,Ve=null,Y=null,Z=0;function he(l){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${l}`}function Le(){qe=!1,Ke=!1,Ee=!1,Ve=null,Y=null,Z+=1}async function Be(l){if(!s)return;let f=++Z;Ke=!0,Ee=!1,v();try{let y=await Promise.resolve(s("get-bead-prompt",{bead_id:l}));if(f!==Z)return;!y||typeof y!="object"||Array.isArray(y)?Ee=!0:(Ve=y,Y=he(l))}catch{f===Z&&(Ee=!0)}finally{f===Z&&(Ke=!1,v())}}function Ue(){if(qe=!qe,qe&&d&&Y!==he(d)){Ve=null,Be(d);return}v()}function Fe(){if(!a||!d)return[];let l=a.get();return(l&&l.attempts?Object.values(l.attempts):[]).filter(y=>y&&y.bead_id===d).sort((y,P)=>(P.started_at||0)-(y.started_at||0)).map(y=>({attempt_id:y.attempt_id,bead_id:y.bead_id,status:y.status,started_at:typeof y.started_at=="number"?y.started_at:null,runner:y.runner||null,model:y.model||null,effort:y.effort||y.observed_effort||null,speed:y.speed||null,session_id:y.session_id||null,resumed_from:y.resumed_from||null,continuation_mode:y.continuation_mode||null,dismissed_at:typeof y.dismissed_at=="number"?y.dismissed_at:null,cause:typeof y.cause=="string"?y.cause:null,cause_detail:y.cause_detail||null,exec_default_preset_id:typeof y.exec_default_preset_id=="string"?y.exec_default_preset_id:null,exec_default_preset_revision:typeof y.exec_default_preset_revision=="number"?y.exec_default_preset_revision:null,exec_values:y.exec_values&&typeof y.exec_values=="object"?y.exec_values:null,usage:y.usage||null,usage_legs:Array.isArray(y.usage_legs)?y.usage_legs:[],delegation_sessions:Array.isArray(y.delegation_sessions)?y.delegation_sessions:[]}))}function it(){if(!a||!d)return null;let l=a.get();return Vt(l&&l.attempts||{},d)}let tt=new Set;function z(l){tt.has(l)?tt.delete(l):tt.add(l),v()}function K(l){let f=a?a.get():null,y=f&&f.attempts?f.attempts[l]:null;ke.open({attempt_id:l,meta:y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}})}function me(l,f){let y=a?a.get():null,P=y&&y.attempts?y.attempts[l]:null,le=(P&&Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]).find(ye=>ye&&typeof ye=="object"&&ye.launch_id===f);le&&ke.open({attempt_id:l,launch_id:f,meta:{runner:"codex",role:le.role,model:le.model,effort:le.effort,session_id:le.session_id,status:le.status}})}async function Qe(l){if(!s||!l)return;let f=await vn();if(f===null)return;let y=()=>{let ye=a?a.get():null;return ye&&typeof ye.revision=="number"?ye.revision:0},P=async(ye={},je=y())=>await s("worker-attempt-resume",{attempt_id:l,expected_revision:je,...f!==""?{instructions:f}:{},...ye}),Q=ye=>{ye?.queue&&a?.set&&a.set(ye.queue)},le=await P();if(Q(le),le&&le.conflict){let ye=le.queue&&typeof le.queue.revision=="number"?le.queue.revision:y();le=await P({},ye),Q(le)}le=await hr(le,(ye,je)=>P({continuation:ye,decision_token:je}),{onResult:Q,refresh:()=>P()}),le&&le.resumed===!1&&!le.conflict&&le.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${le.reason}`,"error",2400)}let ge={onOpen:K,onOpenDelegation:me,onResume:Qe,onToggleUsage:z};function T(){let l=a?a.get():null,f={...H};for(let y of["orchestration_model","orchestration_effort","orchestration_speed"]){let P=l&&l[y];typeof P=="string"&&(f[y]=P)}return f}async function O(){if(s){try{let l=await Promise.resolve(s("get-session-defaults",{}));H=l&&l.values&&typeof l.values=="object"?l.values:{}}catch{H={}}v()}}function I(){let l=a?a.get():null;return l&&l.runner_catalog||null}function G(){let l=a?a.get():null;return l&&typeof l.execution_defaults=="object"?l.execution_defaults:null}function se(){let l=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},y=pr({pin:{...l,...m},global:T(),execution_defaults:G(),runner_catalog:I(),route:typeof l.route=="string"?l.route:null}).orchestration_model.value||"";return Ar(I(),y)}function w(){let l=c?c.get():null;return!l||typeof l.revision!="number"?null:{revision:l.revision,presets:Array.isArray(l.presets)?l.presets:[]}}function C(l){return l?.compatible===!1}function F(l){c&&l&&typeof l.revision=="number"&&Array.isArray(l.presets)&&c.set({revision:l.revision,presets:l.presets})}async function ue(){let l=w(),f=l?.presets.find(y=>y.id===b);if(!(!s||!d||!l||!f||C(f)||x)){x=!0,A=[],v();try{let y=await Promise.resolve(s("apply-impl-preset",Dc(d,f.id,l.revision)));if(y&&y.conflict){F(y),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let P=y&&Array.isArray(y.issue)?y.issue[0]:y?.issue;if(y&&y.applied&&P&&typeof P=="object"){p=P,A=Array.isArray(y.skipped_orchestration_keys)?y.skipped_orchestration_keys.filter(Q=>typeof Q=="string"):[];for(let Q of Fc)delete m[Q];ie(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}y&&y.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(y){y&&typeof y=="object"&&y.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{x=!1,v()}}}let ae=null;r&&r.subscribe&&(ae=r.subscribe(()=>ze()));let we=null;a&&typeof a.subscribe=="function"&&(we=a.subscribe(()=>{d&&v()}));let Re=null;c&&typeof c.subscribe=="function"&&(Re=c.subscribe(()=>{d&&v()}));function We(l){l.key==="Escape"&&d&&(l.preventDefault(),n())}document.addEventListener("keydown",We);function ze(){if(d){if(r&&typeof r.snapshotFor=="function"){let l=r.snapshotFor("detail:"+d)||[];p=l.find(y=>y&&y.id===d)||l[0]||p}He(),v()}}function W(l){tr(l).then(f=>{f?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function re(l){l.preventDefault(),l.stopPropagation(),d&&W(d)}function pe(l,f){l.preventDefault(),l.stopPropagation(),W(f)}function k(l,f,y){l.preventDefault(),l.stopPropagation(),Ce.open(f,{missing_state:y})}function E(l,f){m[l]=f,v(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Pc(d,l,f.length===0?null:f))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function M(l,f){let y=p||{},P=y.metadata&&typeof y.metadata=="object"?y.metadata:{},Q={};for(let je of["impl_runtime","impl_model","impl_effort"])Q[je]=Object.hasOwn(m,je)?m[je]:typeof P[je]=="string"?P[je]:"";Q[l]=f;let le=Uc(Q,I(),se()),ye={};for(let je of["impl_runtime","impl_model","impl_effort"])ye[je]=m[je],m[je]=le[je]||"";v(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...le,orchestration_runtime:se()})).then(je=>{let ot=Array.isArray(je)?je[0]:je;if(!ot||typeof ot!="object"||!ot.id)throw new Error("implementation target readback failed");p=ot;for(let Mt of["impl_runtime","impl_model","impl_effort"])delete m[Mt];v()}).catch(()=>{for(let je of["impl_runtime","impl_model","impl_effort"])ye[je]===void 0?delete m[je]:m[je]=ye[je];v(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function X(l,f,y){if(!s||!d)return!1;try{let P=await Promise.resolve(s(l,f)),Q=Array.isArray(P)?P[0]:P;return Q&&typeof Q=="object"&&Q.id?(p=Q,!0):(ie(y,"error"),!1)}catch{return ie(y,"error"),!1}}function $e(l){setTimeout(()=>{try{let f=e.querySelector(l);f&&typeof f.focus=="function"&&f.focus()}catch{}},0)}function fe(){te=!0,N=p&&p.title||"",v(),$e('.detail-edit__input[data-edit="title"]')}function Ae(l){N=l.target.value}function Oe(){te=!1,N="",v()}function yt(){X("edit-text",{id:d,field:"title",value:N},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(te=!1,N=""),v()})}function vt(){J=!0,q=p&&p.description||"",v(),$e('.detail-edit__textarea[data-edit="description"]')}function Je(l){q=l.target.value}function Ct(){J=!1,q="",v()}function ir(){X("edit-text",{id:d,field:"description",value:q},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(J=!1,q=""),v()})}function Me(l,f,y,P){if(l.key==="Escape"){l.stopPropagation(),y();return}l.key==="Enter"&&(!P||l.ctrlKey||l.metaKey)&&(l.preventDefault(),f())}function qt(l){let f=l.target.value;X("update-status",{id:d,status:f},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function mr(l){let f=Number(l.target.value);X("update-priority",{id:d,priority:f},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>v())}function Ft(l){R=l.target.value}function Yt(){let l=R.trim();l.length!==0&&X("label-add",{id:d,label:l},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(f=>{f&&(R=""),v()})}function gr(l){if(l.key==="Escape"){l.stopPropagation(),R="",v();return}l.key==="Enter"&&(l.preventDefault(),Yt())}function $t(l){X("label-remove",{id:d,label:l},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>v())}let Zt={onCopyPath:pe,onOpenDoc:k};function lr(l){return typeof l=="string"?l:l&&typeof l=="object"?String(l.id||l.to||l.issue_id||l.depends_on||""):""}function cr(l){switch(l&&typeof l=="object"?String(l.dependency_type||l.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ye(l){let y=(Array.isArray(l.dependencies)?l.dependencies:[]).map(P=>({id:lr(P),icon:cr(P)})).filter(P=>P.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${y.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${y.map(P=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(P.id)}
                  >
                    ${P.icon?`${P.icon} `:""}${P.id}
                  </button>`:i`<span class="detail-dep"
                    >${P.icon?`${P.icon} `:""}${P.id}</span
                  >`)}
          </div>`}
    `}function zt(l){let f=l.metadata||{},y=l.workflow||{},P=y.stages||{},Q=P.spec&&P.spec.stale,le=P.impl&&P.impl.stale,ye=P.plan||null,je=y.route_source==="derived",ot=y.route||f.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${je?" detail-kv__v--derived":""}"
          title=${je?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${je?"unset":ot}</span
        >
      </div>
      ${y.route!=="quick_fix"||Object.hasOwn(f,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${f.spec_review||"\uC5C6\uC74C"}${Q?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${y.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ye?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ye?.approval_receipt||"\uC5C6\uC74C"}${ye?.approval_state==="stale"?" \xB7 stale":ye?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${y.route!=="quick_fix"||Object.hasOwn(f,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${f.impl_review||"\uC5C6\uC74C"}${le?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${y.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${y.planned_execution.kind}</span>
            </div>
            ${y.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${y.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${y.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Xr(y.exec_receipt)}</span
            >
          </div>`:""}
      ${y.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${y.impl_entry.actor}@${y.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${f.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${f.pr_url}</span>
          </div>`:""}
    `}let xe={route:["quick_fix","spec_backed","full_plan"]};async function $(l,f){let y=f.target.value;if(l==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&y!=="full_plan"&&!window.confirm(`full_plan \u2192 ${y||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){v();return}await X("update-workflow-meta",{id:d,key:l,value:y},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),v()}function ee(l){let f=l.metadata||{};return i` ${((P,Q)=>{let le=xe[P],ye=typeof f[P]=="string"?f[P]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${P}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${P}
          data-edit=${`wfmeta-${P}`}
          @change=${je=>$(P,je)}
        >
          <option value="" ?selected=${!le.includes(ye)}>
            ${Q}
          </option>
          ${le.map(je=>i`<option value=${je} ?selected=${ye===je}>${je}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function _e(l,f){return te?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${N}
            @input=${Ae}
            @keydown=${y=>Me(y,yt,Oe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${yt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Oe}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${l}</h2>
        ${Et(f).map(y=>i`<span class="detail-usage-total" title=${y.tooltip}
              >${y.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${fe}
        >
          ✎
        </button>
      </div>
    `}function st(l){let f=At(l.created_at),y=At(l.updated_at);return!f&&!y?i``:i`
      ${f?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${f}</span>
          </div>`:""}
      ${y?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${y}</span>
          </div>`:""}
    `}function mt(l,f){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${qt}
        >
          ${$m.map(y=>i`<option value=${y} ?selected=${y===l}>${y}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${mr}
        >
          ${xm.map(y=>i`<option value=${String(y)} ?selected=${y===f}>
                P${y}
              </option>`)}
        </select>
      </div>
    `}function ct(l){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${J?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${vt}
            >
              ✎
            </button>`}
      </div>
      ${J?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${q}
              @input=${Je}
              @keydown=${f=>Me(f,ir,Ct,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ir}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ct}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${l||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function bt(l){let f=typeof l.notes=="string"?l.notes:"";return f.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${f}</div>
    `}function xt(l){let f=Array.isArray(l.labels)?l.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${f.map(y=>i`<span class="detail-label-chip"
              >${y}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${y}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+y}
                @click=${()=>$t(y)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${R}
            @input=${Ft}
            @keydown=${gr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Yt}
          >
            추가
          </button>
        </span>
      </div>
    `}function _(){if(!d)return i``;let l=p||{},f=String(l.id||d),y=l.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",P=it(),Q=l.status||"open",le=typeof l.priority=="number"?Math.max(0,Math.min(4,l.priority)):"",ye=l.description||"",je={...l,metadata:{...l.metadata||{},...m}};return i`
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
            ${f}
          </button>
          ${_e(y,P)}
          ${qc(je)}
          ${Nc({metadata:je.metadata,workspace_values:T(),catalog:I(),execution_defaults:G(),expanded:L,presets:w()?.presets||[],preset_id:b,preset_busy:x,skipped_orchestration_keys:A},{onToggle:ot=>{L=ot,v()},onEdit:(ot,Mt)=>{if(ot==="impl_runtime"||ot==="impl_model"||ot==="impl_effort"){M(ot,Mt??"");return}E(ot,Mt??"")},onPresetSelect:ot=>{b=ot,A=[],v()},onPresetApply:()=>{ue()}})}
          ${mt(Q,le)} ${st(l)}
          ${ct(ye)}
          ${xc(g,ce,{expanded:be,draft:D,sending:j,error:oe})}
          ${bt(l)} ${xt(l)} ${Ye(l)}
          ${zt(l)} ${ee(l)}
          ${wc(l,Zt)}
          ${Vc({expanded:qe,loading:Ke,error:Ee,data:Ve},{onToggle:Ue})}
          ${Gc(Fe(),ge,{total:P,expanded:tt})}
        </div>
      </div>
    `}function v(){Ge(_(),e)}return{load(l){l!==d&&(m={},b="",A=[],L=!1,U(),ve(),Le()),d=l,p=null,ze(),O()},clear(){d=null,p=null,m={},b="",x=!1,A=[],L=!1,U(),ve(),Le(),Ce.close(),ke.close(),Ge(i``,e)},destroy(){ae&&(ae(),ae=null),we&&(we(),we=null),Re&&(Re(),Re=null),document.removeEventListener("keydown",We),Ce.destroy(),Ie.parentNode&&Ie.parentNode.removeChild(Ie),ke.destroy(),Ne.parentNode&&Ne.parentNode.removeChild(Ne),d=null,p=null,b="",x=!1,A=[],ve(),Le(),Ge(i``,e)}}}function Yc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,p,m="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:u,close:c,getElement(){return t}}}function _o(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function mo(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function Zc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,c=o.finished_at;typeof a!="number"||typeof c!="number"||!Number.isFinite(a)||!Number.isFinite(c)||c<a||(r+=c-a,n=!0)}return n?r:null}function go(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Am(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let c of r)c.kind!=="deploy"||c.state!=="succeeded"||typeof c.target_sha!="string"||(!s||(typeof c.finished_at=="number"?c.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=c);let o=r.filter(c=>c.state==="failed"&&!c.dismissed&&!c.superseded_by).length+n.length,a=r.some(c=>c.state==="repairing");return{deploy:s?{sha:_o(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Xc(e,t){let r=Am(e,t);return r?i`<button
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
            title=${r.deploy.at?At(r.deploy.at):""}
            >${go(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${mo(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function En(e){let t=Bt(e.created_at),r=Bt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${At(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${At(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Sm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Jn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function bo(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function _r(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,b)=>(m.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,c=typeof s?.last_error=="string"?s.last_error:null,u=s?Sm(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!c),label:d?c?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":c?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(c?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${c} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${c} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:c,confirmation:p}}function Sr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var Em={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Qc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function c(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Em[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${c("branch_ahead")}`:[`staged ${c("staged_count")}`,`unstaged ${c("unstaged_count")}`,`untracked ${c("untracked_count")}`,`branch ahead ${c("branch_ahead")}`,`HEAD ahead ${c("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function ho(e){return!e||!e.orchestration&&!e.worker?"":i`${e.orchestration?i`<span
        class="exec-chip exec-chip--orch"
        title=${e.orchestration.title}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?i`<span class="exec-chip exec-chip--worker" title=${e.worker.title}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function Ma(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Et(e.usage),s=rr(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,c=e.lane==="done"&&!a,u=c?Bt(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
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
        >`:"",H=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",te=r.map(Te=>Te===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Te}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Te===e.completion_badge&&e.completion_title||""}
          >${Te}</span
        >`),J=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",N=n.length>0?n.map(Te=>i`<span class="worker-usage" title=${Te.tooltip}
              >${Te.label}</span
            >`):s?i`<span class="worker-usage" title=${kn(e.usage)}
            >${s}</span
          >`:"",q=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",R=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",U=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",g=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",S=e.discard,V=S?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${S?.attempt_id||""}
          data-operation-id=${S?.operation?.operation_id||""}
          data-discard-mode=${S?.confirmation||"unmerged"}
          ?disabled=${S?!S.enabled:e.discard_enabled===!1}
          title=${S?S.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${S?.label||"\uD3D0\uAE30"}
        </button>`:"",oe=e.stale_work||null,D=oe?i`${oe.can_resume||oe.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${oe.action_id}
            ?disabled=${oe.locked}
          >
            기존 작업 이어가기
          </button>`:""}${oe.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${oe.action_id}
            ?disabled=${oe.locked}
          >
            백업 후 새로 시작
          </button>`:""}${oe.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${oe.action_id}
            ?disabled=${oe.locked}
          >
            다시 확인
          </button>`:""}`:"",j=oe?i`<div class="worker-mini__stale">
        <strong>${oe.title}</strong>
        <span>${oe.summary}</span>
        <span>${oe.cause}</span>
        ${oe.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",de=e.revise_action?i`<button
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
        </button>`:"",be=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?i`<div class="worker-mini__exec">
          ${ho(e.exec_chips)}
        </div>`:"",ve=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||S?.operation||e.revise_action||oe);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${b}${x}${A}</div>
          <div class="worker-mini__row2">
            ${N}${u?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${At(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${mo(e.work_ms)}</span
                >`:""}${te}${q}
            <span class="worker-mini__actions"
              >${R}${U}${g}${V}</span
            >
            ${En(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${p}${b}${x}${L}${H}${te}${m}${J}
            </div>
            <div class="worker-mini__body">${A}${j}</div>
            ${be}${ve?i`<div class="worker-mini__foot">
                  ${N}${q}
                  <span class="worker-mini__actions"
                    >${R}${U}${g}${V}${de}${D}</span
                  >
                  ${Sr(e)}
                </div>`:""}
            ${En(e)}`:i`<div class="worker-mini__line">
              ${d}${p}${b}${x}${A}${L}${H}${te}${m}${J}${N}${q}${R}${U}${g}${V}
            </div>
            ${be}${Sr(e)} ${En(e)}`}
  </div>`}function Tm(e,t=null){let r=e.worker_ineligible===!0,n=e.draggable&&!e.done&&!r,s=n&&t&&t.bead_id===e.id,o=e.workflow,a=o&&o.chips||{},c=a.route||o&&o.route,u=a.route_source==="derived"||!!(o&&o.route_source==="derived"),d=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),p=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
      ${o&&c?i`<span
            class="ctl-chip ctl-chip--route${u?" is-derived":""}"
            title=${u?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${u?"unset":c}</span
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
            ${t.lanes.map(m=>i`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${m.id}
                  title="${m.label} 대기 맨 뒤에 추가"
                >
                  <span>${m.label}</span>
                  <span class="worker-card__place-count">${m.count}</span>
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
              ?disabled=${!n}
              title=${n?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":d?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${En(e)}
  </div>`}function ar(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Tm(n,e.place_menu):Ma(n))}
          </div>`}
  </section>`}function Pa(e,t){return`${e}\0${t}`}function Da(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function Cm(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Rm(e,t){return e==="internal"&&t===void 0}function Jc(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function eu(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Jc(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Cm(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:Rm(a,s)}}function tu(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let c of t)for(let u of Array.isArray(c.sublanes?.serial)?c.sublanes.serial:[]){let d=Pa(c.root_dir,u.id);r.set(d,{root_dir:c.root_dir,workspace_name:c.name,lane:u.id}),s.set(d,[]);for(let p of Array.isArray(u.items)?u.items:[])n.set(p.id,d)}for(let c of t)for(let u of Array.isArray(c.sublanes?.serial)?c.sublanes.serial:[]){let d=Pa(c.root_dir,u.id),p=Array.isArray(u.items)?u.items[0]:null,b=!!p&&p.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(p.blocked_by)?p.blocked_by:[],x=s.get(d);if(x)for(let A of b){let L=n.get(A);L&&L!==d&&!x.includes(L)&&x.push(L)}}let o=(c,u)=>{let d=new Set,p=[c];for(;p.length>0;){let m=p.pop();if(m===u)return!0;!m||d.has(m)||(d.add(m),p.push(...s.get(m)||[]))}return!1},a=new Map;for(let[c,u]of s){let d=[];for(let p of u){let m=r.get(p);o(p,c)&&m&&d.push(m)}d.length>0&&a.set(c,d)}return a}function ru(e){let t=Da(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=Jc(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function nu(e,t){return Pa(e,t)}var su=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],es=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function yo(e,t){let r=su.find(s=>s.step===e);if(!r)return null;let n=su.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function ou(e){let t=es.findIndex(r=>r.step===e);return es.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function tn(e){let t=es.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Im(e){let t=es.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:es.length}}function vo(e){let t=Im(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var qa=new Set(["queued","running","retry_pending","repairing"]),au=new Set(["failed","succeeded"]),Lm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},ts={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Om={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ts.base_containment,child_sweep:ts.child_sweep,branch_cleanup:ts.branch_cleanup,parent_close:ts.parent_close};function Mm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Pm(e,t,r){return!["verify","deploy"].includes(e.kind)||![...qa,...au].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Dm(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let c=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return c.localeCompare(u)}function Na(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Lm[s];if(!o)return null;let a=yo(r,`${n} ${o}`);return a?{...a,active:qa.has(s),failed:s==="failed"}:null}function Nm(e){return!e||typeof e!="object"?null:Om[e.step]||null}function rs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Nm(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),c=Mm(e.merge_sha)?e.merge_sha:null,u=!o&&c&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&Pm(A,t,c)).sort(Dm):[],d=a?u:[],p=d.find(A=>qa.has(A.state));if(p)return Na(p);if(s)return s.step==="repo_operations"&&u[0]?Na(u[0],!0):null;let m=d.find(A=>au.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return Na(m);if(n){let A=yo(n.step,n.label);return A?{...A,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?ts[e.cleanup_cursor]:null;if(!b)return null;let x=yo(b.step,b.label);return x?{...x,active:!0,failed:!1}:null}function wo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var iu={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},lu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function cu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Fa(e){for(let t of cu(e))if(Object.hasOwn(iu,t))return iu[t];return null}function ja(e){let t=null;for(let r of cu(e))Object.hasOwn(lu,r)&&(t=lu[r]);return t}function ko(e){let t=Fa(e),r=ja(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function uu(e,t){let r=Fa(e)??Fa(t),n=ja(t)??ja(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var du=160;function qm(e){return e.length>du?`${e.slice(0,du)}\u2026`:e}function Fm(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${qm(e.command)}</code>`:""}
  </div>`}function jm(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Ba(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function pu(e){let t=e.failure?ko(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${Fm(e.failure.cause_detail)}
          ${jm(e.failure.reason)}
          ${Sr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Bm(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ba(t-e.started_at):"\u2014",a=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,c=Ir(e),u=Et(e.usage),d=rr(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,b=e.landing,x=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?i`<button
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
      ${c?i`<span class="rtile__resumed" title=${c}>↻</span>`:""}
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
    ${e.rollup?Ds(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Zo}):""}
    ${b?i`<div class="rtile__landing">
          <span
            class="merge-step${b.failed?" merge-step--failed":""}"
            style=${`--progress: ${b.percent}%`}
            >${b.label}${b.index>0?i`<span class="merge-step__n"
                  >${b.index}/${b.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||u.length>0||d||p||m?i`<div class="rtile__meta">
          ${p?i`<span class="worker-mini__badge">${p}</span>`:""}
          ${m?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${ho(e.exec_chips)}
          ${u.length>0?u.map(L=>i`<span class="worker-usage" title=${L.tooltip}
                    >${L.label}</span
                  >`):d?i`<span
                  class="worker-usage"
                  title=${kn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${En(e)} ${Sr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ua(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Bm(s,t,r))}
  </div>`}function rn(e){return i`<svg
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
  </svg>`}function Wa(){return rn(Tr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function za(){return rn(Tr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function fu(){return rn(Tr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function _u(){return rn(Tr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function mu(){return rn(Tr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function gu(){return rn(Tr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function bu(){return rn(Tr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var ns=1,Um=6e4,Wm={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},zm=new Set(["auto_merge","merged","merge","done"]),hu={running:3,paused:2,failed:1};function Hm(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Gm(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),b=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let m=hu[d.run_state],b=hu[c];if(m>b||m===b&&(d.started_at??0)>(u??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Vt(e,a.bead_id),can_pause:c==="running"&&p,can_resume:c!=="running"&&p&&!n.has(a.attempt_id)})}return o}function yu(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Tt(e){return e&&typeof e=="object"?e:{}}function Ha(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let g of s)g&&typeof g.root_dir=="string"&&a.set(g.root_dir,g);let c=[],u=[],d=[],p=[],m=[],b=[],x=new Map,A=new Map,L=new Map;for(let g of n){if(!g||typeof g.root_dir!="string")continue;let S=g.root_dir,V=g.name||S,oe=a.get(S),D=oe&&typeof oe.revision=="number"?oe.revision:typeof g.revision=="number"?g.revision:0,j=Tt(g.attempts),de=Tt(g.bead_titles),be=Tt(g.pr_observations),ve=Tt(g.admission),Te=Tt(g.revise_parked),He=Tt(g.merge_queue_state),rt=Tt(g.cleanup_failed),Pe=Tt(g.discard_operations),Xe=Tt(g.bead_blocked_by),ce=Tt(g.pr_activity),Ie=Array.isArray(g.repo_operations)?g.repo_operations:[],Ce=Array.isArray(g.merge_queue)?g.merge_queue:[],Ne=new Set(Ce.filter(z=>z&&typeof z.bead_id=="string").map(z=>z.bead_id)),ke=new Map(Ce.filter(z=>z&&typeof z.bead_id=="string").map(z=>[z.bead_id,z])),qe=Array.isArray(g.queue)?g.queue:[],Ke=(Array.isArray(g.serial_lanes)?g.serial_lanes:[]).filter(z=>z&&/^s[1-5]$/.test(z.id)&&Array.isArray(z.entries)),Ee=Tt(g.lane_states),Ve=typeof g.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(g.serial_lane_count))):Math.min(5,Ke.length);L.set(S,Ve);let Y=new Map(Ke.map(z=>[z.id,z])),Z=new Map;for(let z of Ke)for(let K of z.entries)K&&typeof K.bead_id=="string"&&Z.set(K.bead_id,z.id);let he=Array.isArray(g.done)?g.done:[];for(let z of he)z&&typeof z.bead_id=="string"&&b.push({id:z.bead_id,root_dir:S,workspace_name:V});let Le=new Map;for(let z of he)z&&typeof z.bead_id=="string"&&typeof z.added_at=="number"&&Le.set(z.bead_id,z.added_at);let Be=z=>({id:z,title:de[z]||z,root_dir:S,workspace_name:V,expected_revision:D,draggable:!1}),Ue=new Set;for(let[z,K]of Gm(j,Le))Ue.add(z),u.push({...Be(z),lane:"running",...Z.has(z)?{serial_lane_id:Z.get(z)}:{},attempt_id:K.attempt_id,run_state:K.run_state,can_pause:K.can_pause,can_resume:K.can_resume,started_at:K.started_at,last_event_at:K.last_event_at,runner:K.runner,model:K.model,effort:K.effort,speed:K.speed,resumed_from:K.resumed_from,continuation_mode:K.continuation_mode,usage:K.usage,discard:_r(Pe,z,{attempt_id:K.attempt_id}),badges:K.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:K.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:K.run_state==="failed"});for(let z of Array.isArray(g.pr_wait)?g.pr_wait:[]){let K=z&&z.bead_id;if(typeof K!="string"||Ue.has(K))continue;Ue.add(K);let me=Tt(be[K]),Qe=Tt(me.pr),ge=me.gate?Tt(me.gate):null,T=Ne.has(K),O=ke.get(K)?.continuation_action||null,I=!!O&&O.continuation===null,G=He.active===K,se=z.external===!0,w=rt[K]||null,C=Tt(ce[K]),F=rs({bead_id:K,merge_sha:z.merge_sha,cleanup_cursor:z.cleanup_cursor,merge_progress:C.merge_progress||null,cleanup_failed:w,repo_operations:Ie}),ue=wo(F),ae=!!ge&&ge.base_badge==="\uCDA9\uB3CC",we=!!w&&["child_sweep","branch_cleanup","parent_close"].includes(w.step)&&!!ge&&ge.tier==="merged",Re=se&&!!w&&!!ge&&ge.tier==="merged",We=!!ge&&["closed_unmerged","review","undecidable"].includes(ge.tier),ze=_r(Pe,K,{external:se,merge_active:G||F?.step==="merge",merge_queued:T,cleanup_active:ue,merged:!!w||ge?.tier==="merged"}),W=!!ze.operation;d.push({...Be(K),lane:"pr_wait",pr_number:typeof Qe.number=="number"?Qe.number:null,pr_url:typeof Qe.url=="string"?Qe.url:void 0,external:se,usage:Vt(j,K),merge_step:F,badges:I?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:F?[ge?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:w?[tn(w.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${tn(w.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ge?.gate_badge=="string"&&ge.gate_badge.length>0?[ge.gate_badge]:[],alert:F?F.failed===!0:!!w||We,reason:w&&F?.active!==!0?vo(w.step):"PR \uB300\uAE30",merge_action:ge?.tier==="merged"&&!we&&!Re?!1:!T||I,merge_enabled:!W&&(I||ge?.enabled===!0||ae||we||Re),merge_label:I?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Re||we?"\uC815\uB9AC \uC7AC\uAC1C":ae&&!we?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:I?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":W?ze.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ze.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ze.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Re?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":we?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ge?.enabled===!0?`\uBA38\uC9C0 (${ge.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ge?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:T&&!I,cancel_enabled:!G,continuation_mismatch:O?.mismatch||null,discard:ze,discard_action:ze.action,discard_enabled:ze.enabled,discard_title:ze.title})}let Fe=(z,K,me,Qe)=>{let ge=z&&z.bead_id;if(typeof ge!="string"||Ue.has(ge))return null;Ue.add(ge);let T=Te[ge],O=_r(Pe,ge),I=O.operation?O:null,G={...Be(ge),lane:K,draggable:!I,discard:I||void 0,reason:yu(ve,ge),queue_position:me+1,queue_index:me,queue_length:Qe,badges:T?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!T,revise_action:!!T,revise_enabled:!!T&&!I,revise_title:T?T.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${T.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Xe,ge)&&(G.blocked_by=Array.isArray(Xe[ge])?Xe[ge].filter(se=>typeof se=="string"&&se.length>0):[]),G};for(let z=0;z<qe.length;z++){let K=Fe(qe[z],"queue",z,qe.length);if(!K)continue;p.push(K);let me=x.get(S);me?me.push(K):x.set(S,[K])}let it=[];for(let z=0;z<Ke.length;z++){let K=Ke[z],me=[];for(let ge=0;ge<K.entries.length;ge++){let T=Fe(K.entries[ge],K.id,ge,K.entries.length);T&&(me.push(T),p.push(T))}if(me.length===0)continue;let Qe=Tt(Ee[K.id]);it.push({id:K.id,index:z,items:me,occupied_by:Array.isArray(Qe.occupied_by)?Qe.occupied_by.filter(ge=>typeof ge=="string"):[],corrections:Array.isArray(Qe.corrections)?Qe.corrections.length:0,cycle:Qe.cycle===!0})}A.set(S,it);let tt=Array.from({length:Ve},(z,K)=>{let me=`s${K+1}`,Qe=Y.get(me),ge=Qe&&Array.isArray(Qe.entries)?Qe.entries:[],T=Tt(Ee[me]);return{id:me,index:ge.length,length:ge.length,occupied_by:Array.isArray(T.occupied_by)?T.occupied_by.filter(O=>typeof O=="string"):[]}});for(let z of Array.isArray(g.runnable)?g.runnable:[]){let K=z&&z.bead_id;typeof K!="string"||Ue.has(K)||(Ue.add(K),c.push({...Be(K),title:z.title||de[K]||K,lane:"runnable",draggable:!0,reason:yu(ve,K),created_at:z.created_at??void 0,updated_at:z.updated_at??void 0,labels:Array.isArray(z.labels)?z.labels:[],spec_reviewer:typeof z.spec_reviewer=="string"?z.spec_reviewer:void 0,plan_state:z.plan_state==="approved"||z.plan_state==="authored"?z.plan_state:"none",workflow:z.route?{route:z.route,chips:{route:z.route}}:null,blocked:z.blocked===!0,...Array.isArray(z.blocked_by)?{blocked_by:z.blocked_by.filter(me=>typeof me=="string"&&me.length>0)}:{},place_index:qe.length,place_lanes:tt}))}for(let z of he){let K=z&&z.bead_id;if(typeof K!="string"||Ue.has(K)||(Ue.add(K),o!==void 0&&typeof z.added_at=="number"&&z.added_at<o))continue;let me=Hm(j,K);m.push({...Be(K),lane:"done",done:!0,usage:Vt(j,K),done_at:typeof z.added_at=="number"?z.added_at:void 0,done_kind:me&&typeof me.done_kind=="string"?me.done_kind:null})}}let H=new Map;s.forEach((g,S)=>{g&&typeof g.root_dir=="string"&&H.set(g.root_dir,S)});let te=r&&r.running_sort==="repo"?"repo":"started";u.sort((g,S)=>{if(te==="repo"){let D=H.get(g.root_dir)??Number.MAX_SAFE_INTEGER,j=H.get(S.root_dir)??Number.MAX_SAFE_INTEGER;if(D!==j)return D-j}let V=typeof g.started_at=="number"&&Number.isFinite(g.started_at)?g.started_at:null,oe=typeof S.started_at=="number"&&Number.isFinite(S.started_at)?S.started_at:null;return V!==null&&oe!==null&&V!==oe?V-oe:V===null&&oe!==null?1:V!==null&&oe===null?-1:g.id.localeCompare(S.id)}),m.sort((g,S)=>(S.done_at??0)-(g.done_at??0));let J=s.length>0?s:n.map(g=>({root_dir:g&&g.root_dir,name:g&&g.name,auto_advance:g&&g.auto_advance,auto_merge:g&&g.auto_merge,slots:g&&g.slots,revision:g&&g.revision,runner_catalog:g&&g.runner_catalog})),N=[];for(let g of J){if(!g||typeof g.root_dir!="string")continue;let S=x.get(g.root_dir)||[],V=A.get(g.root_dir)||[];N.push({root_dir:g.root_dir,name:g.name||g.root_dir,auto_advance:g.auto_advance===!0,auto_merge:g.auto_merge===!0,slots:typeof g.slots=="number"&&g.slots>=ns?g.slots:ns,revision:typeof g.revision=="number"?g.revision:0,runner_catalog:Tt(g.runner_catalog),items:S,sublanes:{parallel:S,serial:V},serial_lane_count:L.get(g.root_dir)||0})}let q={runnable:c,queue:p,queue_groups:N,running:u,pr_wait:d,done:m,automation:{total:N.length,both_on:N.filter(g=>g.auto_advance&&g.auto_merge).length}},R=Da(q);for(let g of b)R.has(g.id)||R.set(g.id,{root_dir:g.root_dir,workspace_name:g.workspace_name,lane:"done",state:"done"});for(let g of[...q.queue,...q.runnable]){if(!Object.hasOwn(g,"blocked_by"))continue;let S=R.get(g.id);g.blockers=(g.blocked_by||[]).map(V=>eu(V,S,R,s)),g.blocker_warnings=g.blockers.filter(V=>V.missing_internal).map(V=>`\u26A0 \uC120\uD589 ${V.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),g.blocker_warnings.length>0&&(g.alert=!0)}let U=tu(q.queue_groups);for(let g of q.queue_groups)for(let S of g.sublanes.serial){let V=U.get(nu(g.root_dir,S.id));V&&(S.cross_wait_peers=V)}return q}function Vm(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Um;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${At(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Bt(e,t)}</span
        >`}</span
  >`}function ss(e){return i`<div class="mon-c__title">${e.title}</div>`}function os(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function $o(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Ga(e){let t=Et(e.usage),r=rr(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${kn(e.usage)}
        >${r}</span
      >`:""}function Va(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Km(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${za()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Wa()}
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
          ${_u()}
        </button>`:""}
  </span>`}function vu(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?i`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>i`<span
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
      </span>`)}function wu(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?i`<div class="mon-blocker-warnings">
        ${t.map(r=>i`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function ku(){return i`<span class="mon-link mon-popover-owner">
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
  </span>`}function Ym(e,t){let r=typeof e.started_at=="number"?Ba(t-e.started_at):"";return i`${ss(e)}
    <div class="mon-c__meta">
      ${Va(e)}${Vm(e.last_event_at,t)}${os(e)}${$o(e)}
      ${dr(e)?i`<span class="mon-c__model">${dr(e)}</span>`:""}
      ${Ir(e)?i`<span
            class="rtile__resumed"
            title=${Ir(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?i`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Ga(e)}${Km(e)}${Sr(e)}
    </div>`}function Zm(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),c=Bt(e.updated_at);return i`${ss(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${os(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Ps(e.labels,null).map(u=>i`<span class="ctl-chip ctl-chip--label">${u}</span>`)}
      ${$o(e)}
      ${c?i`<span title=${`\uC218\uC815 ${At(e.updated_at)}`}
            >수정 ${c}</span
          >`:""}
      ${e.reason?i`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${vu(e)}
      <span class="mon-c__ops">
        ${ku()}
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
            ${(e.place_lanes||[]).map(u=>i`<button
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
    ${wu(e)}`}function Xm(e){let t=!!e.discard?.operation;return i`${ss(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${os(e)}
      ${Va(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${vu(e)}
      <span class="mon-c__ops">
        ${ku()}
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
    ${wu(e)} ${Sr(e)}
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
        </div>`:""}`}function Qm(e){let t=e.merge_step||null,r=!!(rr(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${ss(e)}
    <div class="mon-c__meta">
      ${os(e)}${$o(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Va(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${Ga(e)}${t?i`<span
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
          ${Sr(e)}
        </div>`:""}`}function Jm(e,t){let r=e.done_kind||"",n=r?Wm[r]||r:"",s=Bt(e.done_at,t);return i`${ss(e)}
    <div class="mon-c__meta">
      ${os(e)}${$o(e)}
      ${n?i`<span
            class="mon-live__kind${zm.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Ga(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${At(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function $u(e,t){return e.lane==="running"?Ym(e,t):e.lane==="runnable"?Zm(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?Xm(e):e.lane==="pr_wait"?Qm(e):Jm(e,t)}function xu(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return i`<header
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
        ${e.auto_advance?za():Wa()}
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
        ${mu()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${gu()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${ns}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Au(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=ur.find(c=>c.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?fu():bu()}
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
        ${ur.map(c=>i`<option
              value=${c.value}
              ?selected=${e.done_range===c.value}
            >
              ${c.label}
            </option>`)}
      </select>
      ${a.map(c=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${c.tooltip}
            >${o} 완료 · 누적 ${c.label}</span
          >`)}
    </div>
  </div>`}function Su(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Eu(e){let t=(Array.isArray(e)?e:[]).map(c=>c&&c.usage).filter(c=>c&&typeof c=="object"&&"providers"in c);if(t.length>0)return Et(Us(t));let r={};for(let c of yr)r[c]=0;let n=!1,s=0,o=0,a=0;for(let c of Array.isArray(e)?e:[]){let u=c&&c.usage;if(u&&typeof u=="object"){let d=!1;for(let p of yr){let m=u[p];typeof m=="number"&&Number.isFinite(m)&&(r[p]+=m,n=!0,d=!0)}if(d){o+=1;let p=u.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?rr(r):null}var Tu="bdui.monitor.done-range",Cu="bdui.monitor.running_sort",Ru="beads-ui.monitor.candidate-filter",Ka={show_blocked:!1};function eg(){try{let e=window.localStorage.getItem(Ru);if(!e)return{...Ka};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ka}:{show_blocked:t.show_blocked===!0}}catch{return{...Ka}}}function tg(e){try{window.localStorage.setItem(Ru,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function rg(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function ng(){try{let e=window.localStorage.getItem(Tu);return Gt(e)?e:jt}catch{return jt}}function sg(e){try{window.localStorage.setItem(Tu,e)}catch{}}function og(){try{return window.localStorage.getItem(Cu)==="repo"?"repo":"started"}catch{return"started"}}function ag(e){try{window.localStorage.setItem(Cu,e)}catch{}}var Iu="tab:monitor:pipeline",ig=1e3,lg=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function xo(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${$u(e,t)}
  </div>`}function cg(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?i`<section class="mon-sublane mon-sublane--parallel">
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
    ${xu(e)} ${n}
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
  </div>`}function Lu(e,t){let r=pt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),d=t.confirm||(T=>typeof globalThis.confirm!="function"||globalThis.confirm(T)),p=ng(),m=og(),b=eg();function x(){let T=ur.find(O=>O.value===p);return T?T.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let L=Ha(null,null),H=new Map,te=null,J=null;async function N(T,O,I,G,se=!0){if(!o||!I)return null;let w=await o(T,{...O,root_dir:I,expected_revision:G});if(w&&w.conflict&&se){w.queue&&H.set(I,w.queue);let C=w.queue&&typeof w.queue.revision=="number"?w.queue.revision:G;w=await o(T,{...O,root_dir:I,expected_revision:C})}return w&&w.queue&&I&&H.set(I,w.queue),w}function q(T,O){let I=H.get(T),G=s&&s.get?s.get():null,se=(Array.isArray(G)?G:[]).find(C=>C?.root_dir===T);return(I||se)?.merge_queue?.find(C=>C.bead_id===O)?.continuation_action}async function R(T,O,I,G){let se=await N(T,O,I,G),w=H.get(I)?.revision??se?.queue?.revision??G;return hr(se,(C,F)=>N(T,{...O,continuation:C,decision_token:F},I,w,!1),{refresh:C=>N(T,O,I,C?.queue?.revision??H.get(I)?.revision??w,!1)})}async function U(T,O,I,G){let se=await hr({continuation_mismatch:G},(C,F)=>N("worker-merge-queue-add",{bead_id:O,continuation:C,decision_token:F},T,I,!1)),w=se?.queue?.merge_queue?.find(C=>C.bead_id===O)?.continuation_action;se?.applied!==!0&&w?.continuation===null&&w.mismatch&&await U(T,O,se.queue.revision,w.mismatch)}async function g(T,O,I){let G=await N("worker-discard",T,O,I);if(G&&G.discarded===!0){ie(bo(G),"success",5e3);return}if(G&&G.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${G.reason}`,"error");return}if(G&&G.accepted&&G.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(G&&G.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${G.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}G&&!G.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function S(T,O,I){return!o||!I?null:await o(T,{...O,root_dir:I})}async function V(T){if(!o||!T&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let O=await o("monitor-auto-toggle",{on:T}),I=O&&Array.isArray(O.failed)?O.failed:[];I.length>0&&ie(`\uC790\uB3D9\uD654 ${T?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${I.map(G=>G.root_dir).join(", ")}`,"error",3200)}async function oe(){let T=new Map;for(let O of L.pr_wait)T.has(O.root_dir)||T.set(O.root_dir,O.expected_revision);for(let[O,I]of T)await N("worker-merge-queue-add-all",{},O,I)}let D=null,j=!1,de=null;function be(){de!==null&&clearTimeout(de),de=setTimeout(()=>{de=null,j=!1},0)}function ve(T){let O=T.target;return typeof O?.closest=="function"?O.closest(".mon-group"):null}function Te(T){let O=ve(T);return!O||!D?null:(O.getAttribute("data-root-dir")||"")===D.root_dir?O:null}function He(){for(let T of Array.from(A.querySelectorAll(".mon-group--drag-over")))T.classList.remove("mon-group--drag-over")}function rt(T){let O=T.target,I=typeof O?.closest=="function"?O.closest('.mon-card[draggable="true"]'):null;if(I){D={bead_id:I.getAttribute("data-issue-id")||"",lane:I.getAttribute("data-lane")||"",root_dir:I.getAttribute("data-root-dir")||"",revision:Number(I.getAttribute("data-revision")||0)||0,queue_index:Number(I.getAttribute("data-queue-index")),queue_length:Number(I.getAttribute("data-queue-length")),place_index:Number(I.getAttribute("data-place-index"))},j=!0;try{T.dataTransfer?.setData("text/plain",D.bead_id),T.dataTransfer&&(T.dataTransfer.effectAllowed="move")}catch{}}}function Pe(T){let O=Te(T);O&&(T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move"),O.classList.add("mon-group--drag-over"))}function Xe(T){ve(T)?.classList.remove("mon-group--drag-over")}function ce(){D=null,He(),be()}function Ie(T){let O=Te(T),I=D;if(D=null,He(),!O||!I||!I.bead_id)return;T.preventDefault();let G=T.target,se=typeof G?.closest=="function"?G.closest('.mon-card[data-lane="queue"]'):null,w=se&&O.contains(se)?Number(se.getAttribute("data-queue-index")):NaN;if(I.lane==="runnable"){let ue=Number.isFinite(w)?w:I.place_index;if(!Number.isFinite(ue))return;N("worker-queue-place",{bead_id:I.bead_id,index:ue},I.root_dir,I.revision);return}if(I.lane!=="queue"||se&&se.getAttribute("data-issue-id")===I.bead_id)return;let C=I.queue_index,F=Number.isFinite(w)?C>w?w:w-1:I.queue_length-1;!Number.isFinite(F)||F<0||F===C||N("worker-queue-reorder",{bead_id:I.bead_id,to_index:F},I.root_dir,I.revision)}function Ce(T){let O=rg(L.runnable,b),I={runnable:O.visible,queue:L.queue,running:L.running,pr_wait:L.pr_wait,done:L.done};return i`${Au({automation:L.automation,counts:{running:L.running.length,queue:L.queue.length,pr_wait:L.pr_wait.length},running_sort:m,done_range:p,token_total:Eu(L.done),token_tooltip:Su(x())})}
      <div class="worker-lanes mon-lanes">
        ${lg.map(G=>{let se=I[G.lane],w=G.lane==="queue"?L.queue_groups.length>0?i`${L.queue_groups.map(C=>cg(C,T))}`:void 0:se.length>0?i`${se.map(C=>xo(C,T))}`:void 0;return ar({id:`monitor-${G.lane}`,lane:G.pane,title:G.lane==="done"?`\uC644\uB8CC\xB7${x()}`:G.title,items:se,empty:G.empty,body:w,live:G.lane==="running"&&se.length>0,header_control:G.lane==="runnable"?i`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${b.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${O.hidden_blocked>0?i`<span class="worker-filter__hidden"
                          >숨김 ${O.hidden_blocked}건</span
                        >`:""}
                  </span>`:G.lane==="pr_wait"&&se.length>0?i`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function Ne(){let T=s&&s.get?s.get():null,O=s&&s.getWorkspacesState?s.getWorkspacesState():[],I=u();L=Ha(T,O,{done_since:Vr(p,I),running_sort:m}),Ge(Ce(I),A)}function ke(T,O){let I=a?a():void 0;if(!O||!I||O===I||!c){n(T);return}c(O).then(()=>{n(T)}).catch(G=>{r("workspace switch for %s failed: %o",O,G)})}function qe(T){return{root_dir:T.getAttribute("data-root-dir")||"",revision:Number(T.getAttribute("data-revision")||0)||0}}function Ke(T){if(typeof T=="string"&&T.length>0)return T;if(T&&typeof T=="object"){let O=T;if(typeof O.message=="string"&&O.message.length>0)return O.message;if(typeof O.error=="string"&&O.error.length>0)return O.error;if(O.error&&typeof O.error=="object"&&typeof O.error.message=="string")return O.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ee(T,O){let I=T.querySelector(".mon-link__trigger"),G=T.querySelector(".mon-link__popover"),se=T.querySelector(".mon-link__error");!I||!G||!se||(Le(),G.hidden=!1,I.setAttribute("aria-expanded","true"),se.textContent=O,se.hidden=!1)}async function Ve(T,O,I){let G=O.getAttribute("data-root-dir")||"",se=O.getAttribute("data-issue-id")||"";if(!(!se||!I||I===se))try{await S(T,{a:se,b:I},G),Le()}catch(w){Ee(O,Ke(w))}}function Y(T,O){let{root_dir:I,revision:G}=qe(T),se=T.getAttribute("data-issue-id")||"",w=O.dataset.attemptId||T.getAttribute("data-attempt-id")||"",C=O.classList;if(C.contains("mon-link__trigger")){Ue(O);return}if(C.contains("mon-link__candidate")||C.contains("mon-link__direct")){let F=O.dataset.targetId||"";Ve("dep-add",T,F);return}if(C.contains("mon-blocker__remove")){let F=O.dataset.blockerId||"";Ve("dep-remove",T,F);return}if(C.contains("mon-place__choice")){let F=O.dataset.lane||"parallel",ue=Number(O.dataset.placeIndex||0)||0;Le(),N("worker-queue-place",{bead_id:se,...F==="parallel"?{}:{lane:F},index:ue},I,G);return}if(C.contains("worker-card__place")){Be(O);return}if(C.contains("mon-op--up")||C.contains("mon-op--down")){let F=Number(T.getAttribute("data-queue-index")||0)||0,ue=C.contains("mon-op--up")?F-1:F+1;if(ue<0)return;N("worker-queue-reorder",{bead_id:se,.../^s[1-5]$/.test(T.dataset.lane||"")?{lane:T.dataset.lane}:{},to_index:ue},I,G);return}if(C.contains("mon-op--remove")){N("worker-queue-remove",{bead_id:se},I,G);return}if(C.contains("mon-op--pause")){S("worker-attempt-pause",{attempt_id:w},I);return}if(C.contains("mon-op--discard")){if(!d(Jn(se,"unmerged")))return;g({bead_id:se,...w?{attempt_id:w}:{},...O.dataset.operationId?{operation_id:O.dataset.operationId}:{}},I,G);return}if(C.contains("mon-op--resume")){vn().then(F=>{if(F!==null)return R("worker-attempt-resume",{attempt_id:w,...F!==""?{instructions:F}:{}},I,G)});return}if(C.contains("mon-op--dismiss")){N("worker-attempt-dismiss",{attempt_id:w},I,G);return}if(C.contains("worker-mini__merge")){let F=q(I,se);F?.mismatch&&F.continuation===null?U(I,se,G,F.mismatch):N("worker-merge-queue-add",{bead_id:se},I,G);return}if(C.contains("worker-mini__merge-cancel")){N("worker-merge-queue-remove",{bead_id:se},I,G);return}if(C.contains("worker-mini__discard")){let F=O.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Jn(se,F)))return;g({bead_id:se,...w?{attempt_id:w}:{},...O.dataset.operationId?{operation_id:O.dataset.operationId}:{}},I,G);return}if(C.contains("worker-mini__revise-fix")){R("worker-revise-fix",{bead_id:se},I,G);return}C.contains("worker-mini__revise-approve")&&N("worker-revise-approve",{bead_id:se},I,G)}function Z(T){T.querySelector(".mon-link__list")?.replaceChildren();let I=T.querySelector(".mon-link__search");I&&(I.value="");let G=T.querySelector(".mon-link__direct");G&&(G.hidden=!0,G.dataset.targetId="",G.textContent="");let se=T.querySelector(".mon-link__empty");se&&(se.hidden=!0);let w=T.querySelector(".mon-link__error");w&&(w.hidden=!0,w.textContent="")}function he(T,O){let I=T.querySelector(".mon-link__list");if(!I)return;let G=document.createDocumentFragment(),se=ru(L).filter(w=>w.id!==O);for(let w of se){let C=document.createElement("button");C.type="button",C.className="mon-link__candidate",C.dataset.targetId=w.id,C.dataset.search=`${w.id} ${w.title} ${w.location}`.toLocaleLowerCase();let F=document.createElement("strong");F.textContent=w.id;let ue=document.createElement("span");ue.textContent=w.title;let ae=document.createElement("small");ae.textContent=w.location,C.append(F,ue,ae),G.append(C)}I.replaceChildren(G)}function Le(){for(let T of Array.from(A.querySelectorAll(".mon-card-popover"))){let O=T;O.hidden=!0,O.classList.contains("mon-link__popover")&&Z(O)}for(let T of Array.from(A.querySelectorAll('[aria-expanded="true"]')))T.setAttribute("aria-expanded","false")}function Be(T){let I=T.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!I)return;let G=I.hidden;Le(),G&&(I.hidden=!1,T.setAttribute("aria-expanded","true"))}function Ue(T){let I=T.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!I)return;let G=I.hidden;if(Le(),G){let se=T.closest(".mon-card");he(I,se?.getAttribute("data-issue-id")||""),I.hidden=!1,T.setAttribute("aria-expanded","true");let w=I.querySelector(".mon-link__search");w&&(Fe(w),w.focus())}}function Fe(T){let O=T.closest(".mon-link__popover"),I=T.closest(".mon-card");if(!O||!I)return;let G=T.value.trim(),se=G.toLocaleLowerCase(),w=0,C=!1;for(let Re of Array.from(O.querySelectorAll(".mon-link__candidate"))){let We=Re,ze=We.dataset.targetId||"",W=se.length===0||(We.dataset.search||"").includes(se);We.hidden=!W,W&&(w+=1),ze.toLocaleLowerCase()===se&&(C=!0)}let F=O.querySelector(".mon-link__direct"),ue=I.getAttribute("data-issue-id")||"";if(F){let Re=G.length>0&&!C&&se!==ue.toLocaleLowerCase();F.hidden=!Re,F.dataset.targetId=Re?G:"",F.textContent=Re?`\uC9C1\uC811 \uC785\uB825 \xB7 ${G}`:"",Re&&(w+=1)}let ae=O.querySelector(".mon-link__empty");ae&&(ae.hidden=w>0);let we=O.querySelector(".mon-link__error");we&&(we.hidden=!0,we.textContent="")}function it(T){let O=T.target;O&&A.contains(O)&&typeof O.closest=="function"&&O.closest(".mon-popover-owner")||Le()}function tt(T){if(T.key!=="Escape")return;let O=A.querySelector('[aria-expanded="true"]');Le(),O?.focus()}function z(T){let O=j;j=!1;let I=T.target;if(!I||typeof I.closest!="function"||I.closest("dialog")||I.closest("a"))return;let G=I.closest(".mon-running-sort");if(G){T.preventDefault(),m=G.getAttribute("data-sort")==="repo"?"repo":"started",ag(m),Ne();return}let se=I.closest(".mon-auto-all");if(se){T.preventDefault(),V(se.getAttribute("data-on")==="true");return}if(I.closest(".mon-merge-all")){T.preventDefault(),oe();return}let C=I.closest(".mon-ctl--advance");if(C){T.preventDefault();let{root_dir:Re,revision:We}=qe(C);N("worker-automation-toggle",{on:C.getAttribute("data-on")==="true"},Re,We);return}let F=I.closest(".mon-ctl--merge-auto");if(F){T.preventDefault();let{root_dir:Re,revision:We}=qe(F);N("worker-merge-auto-toggle",{on:F.getAttribute("data-on")==="true"},Re,We);return}let ue=I.closest(".mon-card");if(!ue)return;let ae=I.closest("button");if(ae){T.preventDefault(),Y(ue,ae);return}let we=ue.getAttribute("data-issue-id");we&&!O&&(T.preventDefault(),ke(we,ue.getAttribute("data-root-dir")||""))}function K(T){let O=T.target;if(!O||typeof O.closest!="function")return;let I=O.closest(".mon-filter__blocked");if(I){b={show_blocked:I.checked},tg(b),Ne();return}let G=O.closest(".mon-done-range");if(G){p=Gt(G.value)?G.value:jt,sg(p),Ne();return}let se=O.closest(".mon-slots__input");if(!se)return;let{root_dir:w,revision:C}=qe(se),F=Number(se.value);if(!Number.isFinite(F))return;let ue=Math.max(ns,Math.floor(F));N("worker-queue-set-slots",{slots:ue},w,C)}function me(T){let O=T.target;O?.classList.contains("mon-link__search")&&Fe(O)}e.addEventListener("click",z),e.addEventListener("change",K),e.addEventListener("input",me),e.addEventListener("dragstart",rt),e.addEventListener("dragover",Pe),e.addEventListener("dragleave",Xe),e.addEventListener("drop",Ie),e.addEventListener("dragend",ce),document.addEventListener("click",it),document.addEventListener("keydown",tt),s&&typeof s.subscribe=="function"&&(te=s.subscribe(()=>{try{H.clear(),Ne()}catch{}}));function Qe(){J!==null&&(clearInterval(J),J=null)}function ge(){de!==null&&(clearTimeout(de),de=null)}return{load(){r("load"),Ne(),J===null&&(J=setInterval(()=>{try{if(A.querySelector(".mon-card-popover:not([hidden])"))return;Ne()}catch{}},ig))},pause(){Qe()},clear(){Qe(),ge(),te&&(te(),te=null),e.removeEventListener("click",z),e.removeEventListener("change",K),e.removeEventListener("input",me),e.removeEventListener("dragstart",rt),e.removeEventListener("dragover",Pe),e.removeEventListener("dragleave",Xe),e.removeEventListener("drop",Ie),e.removeEventListener("dragend",ce),document.removeEventListener("click",it),document.removeEventListener("keydown",tt),e.replaceChildren()}}}function Ou(e,t,r){let n=pt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function c(b){return x=>{x.preventDefault(),n("click tab %s",b),r.gotoView(b)}}function u(){let b=t.getState();return b.view==="worker"||b.view==="monitor"?b.view:"board"}function d(){let b=u();return i`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${b==="monitor"?"is-active":""}"
        @click=${c("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function p(){let b=u();return i`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${b==="board"?"is-active":""}"
          @click=${c("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${b==="worker"?"is-active":""}"
          @click=${c("worker")}
          >Worker</a
        >
      </div>
    `}function m(){s&&Ge(d(),s),o&&Ge(p(),o)}return m(),a=t.subscribe(()=>m()),{destroy(){a&&(a(),a=null),s&&Ge(i``,s),o&&Ge(i``,o)}}}var Mu=["bug","feature","task","epic","chore"];function Pu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Du=["Critical","High","Medium","Low","Backlog"];function Nu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),u=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",o.appendChild(R);for(let U of Mu){let g=document.createElement("option");g.value=U,g.textContent=Pu(U),o.appendChild(g)}a.replaceChildren();for(let U=0;U<=4;U+=1){let g=document.createElement("option");g.value=String(U);let S=Du[U]||"Medium";g.textContent=`${U} \u2013 ${S}`,a.appendChild(g)}}x();function A(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(R){s.disabled=R,o.disabled=R,a.disabled=R,c.disabled=R,u.disabled=R,p.disabled=R,m.disabled=R,m.textContent=R?"Creating\u2026":"Create"}function H(){d.textContent=""}function te(R){d.textContent=R}function J(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?o.value=R:o.value="";let U=window.localStorage.getItem("beads-ui.new.priority");U&&/^\d$/.test(U)?a.value=U:a.value="2"}catch{o.value="",a.value="2"}}function N(){let R=o.value||"",U=a.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),U.length>0&&window.localStorage.setItem("beads-ui.new.priority",U)}async function q(){H();let R=String(s.value||"").trim();if(R.length===0){te("Title is required"),s.focus();return}let U=Number(a.value||"2");if(!(U>=0&&U<=4)){te("Priority must be 0..4"),a.focus();return}let g=String(o.value||""),S=String(u.value||""),V={title:R};g.length>0&&(V.type=g),String(U).length>0&&(V.priority=U),S.length>0&&(V.description=S),L(!0);try{await t("create-issue",V)}catch{L(!1),te("Failed to create issue");return}N(),L(!1),A()}return r.addEventListener("cancel",R=>{R.preventDefault(),A()}),b.addEventListener("click",()=>A()),p.addEventListener("click",()=>A()),r.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),q())}),n.addEventListener("submit",R=>{R.preventDefault(),q()}),{open(){n.reset(),H(),J();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var ug=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function dg(e,t){return Ko(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function qu(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=dg(n,e);return i`<button
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
  `}function Fu(e,t,r){return i`
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
  `}function ju(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${ug.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var pg=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Dt="",fg=["impl_runtime","impl_model","impl_effort"];function Nt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Bu(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(w=>ie(w,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let c="execution",u=!1,d="",p={},m={},b=[],x=!1,A=null,L={},H="",te="",J=!1,N=!1,q=!1,R=null;function U(){let w=t.queueStore?.get();return Nt(w)?w.runner_catalog:null}function g(){let w=t.queueStore?.get();return Nt(w)&&Nt(w.execution_defaults)?w.execution_defaults:null}function S(){let w=t.implPresetStore?.get();return Nt(w)&&Array.isArray(w.presets)?w:null}async function V(){x=!0,me();try{let w=await r("get-session-defaults",{});p=Nt(w?.values)?{...w.values}:{},m={...p},b=Array.isArray(w?.warnings)?w.warnings:[]}catch(w){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${w instanceof Error?w.message:String(w)}`)}finally{x=!1,me()}}async function oe(){let w=Lc(p,m);if(Object.keys(w).length!==0){try{let C=await r("set-session-defaults",{values:w});p=Nt(C?.values)?{...C.values}:{},m={...p},b=Array.isArray(C?.warnings)?C.warnings:[]}catch(C){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}me()}}function D(w,C){if(fg.includes(w)){be(w,C);return}C===Dt?delete m[w]:m[w]=C,me(),oe()}function j(){let w=Z().orchestration_model,C=pr({global:{orchestration_model:w??void 0},execution_defaults:g(),runner_catalog:U()}).orchestration_model.value;return C?Ar(U(),C):null}function de(w,C){typeof C=="string"&&C.length>0?m[w]=C:delete m[w]}function be(w,C){let F=C===Dt?void 0:C,ue=Rc({impl_runtime:w==="impl_runtime"?F:m.impl_runtime,impl_model:w==="impl_model"?F:m.impl_model,impl_effort:w==="impl_effort"?F:m.impl_effort},U(),j());de("impl_runtime",ue.impl_runtime),de("impl_model",ue.impl_model),de("impl_effort",ue.impl_effort),me(),oe()}async function ve(){let w=t.queueStore?.get();if(!Nt(w))return;let C={orchestration_model:w.orchestration_model??null,orchestration_effort:w.orchestration_effort??null,orchestration_speed:w.orchestration_speed??null},F=Oc(C,{...C,...L});if(Object.keys(F).length!==0){try{let ue=await r("worker-queue-set-orchestration-defaults",{expected_revision:w.revision,values:F});if(ue&&ue.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}L={}}catch(ue){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ue instanceof Error?ue.message:String(ue)}`)}me()}}function Te(w,C){L[w]=C===Dt?null:C,me(),ve()}function He(w){if(A=w,!w){me();return}let C=U(),F=Z(),ue=F.orchestration_model;ue&&!Xn(C,w).includes(ue)&&(L.orchestration_model=null,ue=null);let ae=F.orchestration_effort;ae&&!Ta(C,w,ue||Wt).includes(ae)&&(L.orchestration_effort=null),me(),ve()}async function rt(w){let C=t.queueStore?.get();if(!(!Nt(C)||w<1)){try{await r("worker-queue-set-slots",{expected_revision:C.revision,slots:w})}catch(F){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${F instanceof Error?F.message:String(F)}`)}me()}}function Pe(){let w={},C=Z();for(let F of ao){let ue=xr.includes(F)?C[F]:m[F];typeof ue=="string"&&ue.length>0&&(w[F]=ue)}return w}async function Xe(){let w=S();if(!w)return;let C=Pe();if(Object.keys(C).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let F=(w.presets||[]).find(ae=>ae.id===H),ue=te.trim()||(F?F.name:"");if(!ue){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let ae=F?await r("impl-preset-update",{expected_revision:w.revision,id:F.id,name:ue,settings:C}):await r("impl-preset-create",{expected_revision:w.revision,name:ue,settings:C});if(ae&&ae.applied){if(te="",!F&&Array.isArray(ae.presets)){let we=ae.presets.find(Re=>Re.name===ue);H=we?we.id:H}me()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),me()}catch(ae){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${ae instanceof Error?ae.message:String(ae)}`)}}async function ce(){let w=S();if(!(!w||H.length===0))try{let C=await r("impl-preset-delete",{expected_revision:w.revision,id:H});C&&C.applied?(H="",me()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),me())}catch(C){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${C instanceof Error?C.message:String(C)}`)}}async function Ie(){let w=S(),C=t.queueStore?.get();if(!(!w||!Nt(C)||H.length===0)){try{let F=await r("apply-impl-preset-global",{preset_id:H,expected_revision:w.revision,expected_queue_revision:C.revision});F&&F.applied?(p=Nt(F.values)?{...F.values}:{},m={...p},b=Array.isArray(F.warnings)?F.warnings:[],Nt(F.queue)&&(t.queueStore?.set?.(F.queue),L={}),F.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):F&&F.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(F){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${F instanceof Error?F.message:String(F)}`)}me()}}async function Ce(){N=!0,q=!1,me();try{let w=await r("get-worker-system-prompt",{});!w||typeof w!="object"||Array.isArray(w)?q=!0:R=w}catch{q=!0}finally{N=!1,me()}}function Ne(){if(J=!J,J&&!R){Ce();return}me()}function ke(){let w=xn({loading:N,error:q});if(w)return w;if(!R)return"";let C=Array.isArray(R.variants)?R.variants:[];return i`<div class="settings-dialog__sp-body">
      ${R.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${R.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${C.map(F=>i`<div class="settings-dialog__sp-variant" data-variant=${F.key}>
            <div class="settings-dialog__sp-cond">${F.condition}</div>
            ${$r(F.label,F.system_prompt)}
          </div>`)}
    </div>`}function qe(){return i`<section
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
      ${J?ke():""}
    </section>`}function Ke(w,C,F,ue,ae,we,Re){let We=ae[w]??Dt,ze=Ca(w,F,ae,g(),U(),Re),W=ze.options.find(pe=>pe.value===We),re=We===Dt?ze.full_value:W?.full_value;return i`<select
        class=${We===Dt?"settings-dialog__unset":""}
        data-key=${w}
        aria-label=${C}
        title=${re||""}
        ?disabled=${we===!0||ze.disabled}
        .value=${en(String(We))}
        @change=${pe=>ue(w,String(pe.target.value))}
      >
        <option value=${Dt} ?selected=${We===Dt}>
          ${ze.unset_label}
        </option>
        ${ze.options.map(pe=>i`<option
              value=${pe.value}
              title=${pe.full_value||""}
              ?selected=${pe.value===We}
            >
              ${pe.label}
            </option>`)}
      </select>
      ${We===Dt?i`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ee(w,C,F,ue,ae,we=!1,Re){return i`<div
      class=${`settings-dialog__row${we?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${C}</span>
      <span class="settings-dialog__controls">
        ${Ke(w,C,F,ue,ae,we,Re)}
      </span>
    </div>`}function Ve(w,C,F,ue,ae){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${C}-on)`}
        ></i>
        ${w}
      </span>
      <span class="settings-dialog__controls">
        ${Ke(F,`${w} \uBAA8\uB378`,ue,D,m,!1)}
        ${Ke(ae,`${w} effort`,co,D,m,!1)}
      </span>
    </div>`}function Y(w){return i`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${w.rows.length>0?`\uBCC0\uACBD ${w.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${w.rows.map(C=>i`<div
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
      ${w.ignored_keys.length>0?i`<div class="settings-dialog__preset-diff-note">
            ${w.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Z(){let w=t.queueStore?.get(),C={};for(let F of xr)C[F]=Object.prototype.hasOwnProperty.call(L,F)?L[F]:Nt(w)&&typeof w[F]=="string"?w[F]:null;return C}function he(){let w=U(),C=m.impl_runtime,F=m.impl_model,ue=S(),ae=t.queueStore?.get(),we=Z(),Re=Xn(w,A),We=An(w,void 0).filter(M=>M!==Wt),ze=Ta(w,A,we.orchestration_model||Wt).filter(M=>M!==Wt),W=H?(ue?.presets||[]).find(M=>M.id===H):null,re=W?Ic(Pe(),Nt(W.settings)?W.settings:{}):null,pe=Nt(ae)&&typeof ae.slots=="number"?ae.slots:2,k=g()?.supported===!0,E=Ca("workflow_mode",Yn,m,g(),w);return i`
      <section
        class=${`settings-dialog__pane${c==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        ${b.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
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
                  .value=${en(H)}
                  @change=${M=>{H=String(M.target.value),me()}}
                >
                  <option value="" ?selected=${H===""}>
                    실행 프리셋…
                  </option>
                  ${(ue?.presets||[]).map(M=>i`<option
                        value=${M.id}
                        ?selected=${M.id===H}
                      >
                        ${M.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${!re||re.rows.length===0}
                  @click=${Ie}
                >
                  적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${H?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${en(te)}
                  @input=${M=>{te=String(M.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  title=${H?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                  @click=${Xe}
                >
                  ${H?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${H.length===0}
                  @click=${ce}
                >
                  삭제
                </button>
              </div>
              ${re?Y(re):""}

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${en(A||Dt)}
                      @change=${M=>{let X=String(M.target.value);He(X===Dt?null:X)}}
                    >
                      <option
                        value=${Dt}
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
                ${Ee("orchestration_model","\uBAA8\uB378",Re,Te,we)}
                ${Ee("orchestration_effort","effort",ze,Te,we)}
                ${Ee("orchestration_speed","\uC18D\uB3C4",Kn,Te,we)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Dt}
                        aria-pressed=${String(!m.workflow_mode)}
                        @click=${()=>D("workflow_mode",Dt)}
                      >
                        ${E.unset_label}
                      </button>
                      ${m.workflow_mode?"":i`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Yn.map(M=>i`<button
                            type="button"
                            data-mode=${M}
                            aria-pressed=${String(m.workflow_mode===M)}
                            @click=${()=>D("workflow_mode",M)}
                          >
                            ${M}
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
                ${Ve("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Zn,"spec_review_effort")}
                ${Ve("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",lo,"plan_review_effort")}
                ${Ve("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Zn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Ee("impl_runtime","\uC704\uC784 \uB300\uC0C1",io,D,m)}
                ${Ee("impl_model","\uBAA8\uB378",An(w,C),D,m)}
                ${Ee("impl_effort","effort",Sn(w,C,F),D,m)}
                ${Ee("impl_speed","\uC18D\uB3C4",Kn,D,m)}
                ${Ee("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",We,D,m,!1,{...m,...we})}
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
                        @click=${()=>rt(pe-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${pe}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>rt(pe+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${qe()}
            `}
      </section>
    `}function Le(){let w=n.get();return i`
      <section
        class=${`settings-dialog__pane${c==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${w?i`
              ${qu(w,s(),it)}
              ${Fu(w,d,{onDraft:C=>{d=C},onAdd:tt,onRemove:z})}
              ${ju(w,K)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function Be(w){let C=n.get();if(C)try{let F=await r("display-policy-set",{expected_revision:C.revision,policy:w(C)});Ue(F),F&&F.conflict&&F.policy&&(F=await r("display-policy-set",{expected_revision:F.policy.revision,policy:w(F.policy)}),Ue(F)),F&&F.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function Ue(w){w&&w.policy&&typeof w.policy=="object"&&n.set(w.policy)}function Fe(w){Be(w)}function it(w){let C=n.get();if(!C)return;let F=!_g(w,C);Fe(ue=>mg(w,ue,F))}function tt(){let w=d.trim();w.length!==0&&(d="",Fe(C=>C.hidden_prefixes.includes(w)?{hidden_prefixes:C.hidden_prefixes}:{hidden_prefixes:[...C.hidden_prefixes,w]}),me())}function z(w){Fe(C=>({hidden_prefixes:C.hidden_prefixes.filter(F=>F!==w)}))}function K(w){let C=n.get();if(!C)return;let F=C.chips[w]===!1;Fe(()=>({chips:{[w]:F}}))}function me(){Ge(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${pg.map(w=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${w.id}
                  aria-selected=${String(c===w.id)}
                  aria-controls=${`settings-pane-${w.id}`}
                  @click=${()=>Qe(w.id)}
                >
                  <span class="settings-dialog__glyph">${w.glyph}</span>
                  ${w.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${se}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${he()} ${Le()}
          </div>
        </div>
      `,a)}function Qe(w){c=w,me()}let ge=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",ge),a.addEventListener("cancel",ge);let T=w=>{w.target===a&&se()};a.addEventListener("click",T);let O=null;n.subscribe&&(O=n.subscribe(()=>{u&&me()}));let I=null;t.implPresetStore?.subscribe&&(I=t.implPresetStore.subscribe(()=>{u&&me()}));function G(w="execution"){u||(u=!0,t.onOpenChange?.(!0),c=w,d="",L={},me(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),V())}function se(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:G,close:se,sessionDraft:()=>({...m}),destroy(){u=!1,a.removeEventListener("close",ge),a.removeEventListener("cancel",ge),a.removeEventListener("click",T),O&&(O(),O=null),I&&(I(),I=null),a.remove()}}}function _g(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function mg(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var gg=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Uu="usage-meter-card",Wu=600,bg=["token_expired","relogin_required"];function zu(e){return String(e).padStart(2,"0")}function hg(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function yg(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${zu(n.getHours())}:${zu(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${gg[n.getMonth()]} ${n.getDate()} ${o}`;return`${hg(r,t)} \xB7 ${c}`}function vg(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Hu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Gu(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Vu=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Yu(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function wg(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Yu(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function kg(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=wg(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?Yu(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function Ku(e,t){return`${e}:${t}`}function Zu(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,c=0;function u(){Ge(i``,e),e.hidden=!0}function d(D){r!==D&&(r===null&&(document.addEventListener("mousedown",m),document.addEventListener("keydown",b)),r=D)}function p(){r!==null&&(r=null,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",b))}function m(D){let j=D.target;j&&e.contains(j)||(p(),S())}function b(D){D.key==="Escape"&&(p(),S())}function x(D){r===D?p():d(D),S()}function A(){p(),S()}async function L(D,j){if(n.has(D.key))return;let de=Ku(D.key,j);n.set(D.key,j),a.delete(de),S();let be=null;try{be=await(await fetch(D.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:j})})).json()}catch{be=null}if(t)return;if(n.delete(D.key),!be||be.ok!==!0){let Te=be&&typeof be.error=="string"&&be.error.length>0?be.error:"network_error";a.set(de,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Te}`}),S();return}let ve=Array.isArray(be.warnings)?be.warnings.filter(Te=>typeof Te=="string"&&Te.length>0):[];ve.length>0&&a.set(de,{kind:"warn",text:ve.join(" \xB7 ")}),S(),await oe()}function H(D,j,de,be){let ve=Gu(D.pct),He=`resets ${yg(D.resetsAt,be)}${j?` \xB7 ${de}`:""}`;return i`<span
      class="usage-meter__window ${Hu(ve)}"
      style=${`--progress: ${ve}%`}
      title=${He}
    >
      <span class="usage-meter__label">${D.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${ve}%</span>
    </span>`}function te(D,j,de){let be=j.available&&typeof j.ageSeconds=="number"&&j.ageSeconds>Wu,ve=be&&typeof j.ageSeconds=="number"?`${Math.floor(j.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",Te=j.accounts.filter(Xe=>!Xe.active).length,He=`usage-meter__group${be?" usage-meter__group--stale":""}`,rt=i`<span class="usage-meter__provider"
        >${D.label}</span
      >
      ${j.available?j.windows.map(Xe=>H(Xe,be,ve,de)):i`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Te>0?i`<span class="usage-meter__badge">+${Te}</span>`:""}`;if(j.accounts.length===0)return i`<span
        class=${He}
        aria-label=${`${D.label} usage`}
        >${rt}</span
      >`;let Pe=r===D.key;return i`<button
      type="button"
      class=${`usage-meter__toggle ${He}`}
      aria-label=${`${D.label} usage`}
      aria-expanded=${Pe?"true":"false"}
      aria-controls=${Uu}
      @click=${()=>x(D.key)}
    >
      ${rt}
    </button>`}function J(D,j){return i`<span class="usage-meter" aria-label="Usage">
      ${D.map(de=>te(de.provider,de.snapshot,j))}
    </span>`}function N(D){let j=Gu(D.pct);return i`<span
      class="usage-meter__account-window ${Hu(j)}"
      style=${`--progress: ${j}%`}
    >
      <span class="usage-meter__account-key">${D.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${j}%</span>
    </span>`}function q(D,j){return bg.includes(j)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${D.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function R(D,j){let de=j.status==="ok",be=typeof j.ageSeconds=="number"&&j.ageSeconds>Wu,ve=a.get(Ku(D.key,j.number)),Te=n.get(D.key),He=Te!==void 0,rt=Te===j.number,Pe=["usage-meter__account"];return j.active&&Pe.push("usage-meter__account--active"),de||Pe.push("usage-meter__account--unavailable"),be&&Pe.push("usage-meter__account--stale"),i`<div class=${Pe.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${j.email}
          >${j.alias===null?j.email:j.alias}</span
        >
        ${j.plan===null?"":i`<span class="usage-meter__account-tag">${j.plan}</span>`}
        ${j.active?i`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${j.ageSeconds===null?"":i`<span class="usage-meter__account-age"
              >${vg(j.ageSeconds)}</span
            >`}
        ${j.active?"":i`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${He}
              @click=${()=>{L(D,j.number)}}
            >
              ${rt?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${de?i`<div class="usage-meter__account-windows">
            ${j.windows.map(Xe=>N(Xe))}
          </div>`:i`<div class="usage-meter__account-status">
            ${q(D,j.status)}
          </div>`}
      ${ve===void 0?"":i`<div
            class="usage-meter__account-message usage-meter__account-message--${ve.kind}"
          >
            ${ve.text}
          </div>`}
    </div>`}function U(D,j){let de=j.accounts.filter(be=>be.active).length;return i`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${D.label} · 활성 ${de} / 전체
        ${j.accounts.length}
      </h2>
      ${j.accounts.map(be=>R(D,be))}
    </section>`}function g(D){return i`<div
      class="usage-meter__card"
      id=${Uu}
      role="dialog"
      aria-label=${`${D.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${U(D.provider,D.snapshot)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function S(){let D=[];for(let be of Vu){let ve=o.get(be.key);ve&&D.push({provider:be,snapshot:ve})}if(D.length===0){p(),u();return}let j=D.find(be=>be.provider.key===r&&be.snapshot.accounts.length>0);j||p();let de=Date.now();Ge(i`${J(D,de)}
      ${j?i`<div
              class="usage-meter__scrim"
              aria-hidden="true"
              @mousedown=${A}
            ></div>
            ${g(j)}`:""}`,e),e.hidden=!1}async function V(D){try{let j=await fetch(D.endpoint);return j.ok?kg(await j.json()):null}catch{return null}}async function oe(){c+=1;let D=c,j=await Promise.all(Vu.map(async de=>({provider:de,snapshot:await V(de)})));if(!(t||D!==c)){for(let de of j)de.snapshot?o.set(de.provider.key,de.snapshot):o.delete(de.provider.key);S()}}return u(),oe(),s=setInterval(()=>{oe()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),p(),u()}}}function Xu(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),c=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!c&&typeof s.dismissed_at!="number"}}var Ya=new Set(["unavailable","not_applicable"]);function Pr(e,t){if(typeof e!="object"||e===null)return null;let r=e[t];return typeof r=="object"&&r!==null?r:null}function Qu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Dr(e,t){return t===null?null:`${Mr[e]}: ${t.display} (${uo[t.source]})`}function Za(e){return e.filter(t=>t!==null).join(`
`)}function Ju(e){if(typeof e!="object"||e===null)return null;let t=dr(e);if(t==="")return null;let r=(n,s)=>typeof s=="string"&&s.length>0?`${n}: ${s}`:null;return{text:t,title:Za(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",r("runner",e.runner),r(Mr.orchestration_model,e.model),r(Mr.orchestration_effort,e.effort),r(Mr.orchestration_speed,e.speed)])}}function ed(e,t){let r=Pr(e,"orchestration_model");if(r===null||r.resolution==="unavailable")return null;let n=Pr(e,"orchestration_effort"),s=Pr(e,"orchestration_speed"),o=Qu([Ar(t,r.value??""),r.display,n!==null&&n.value!==null?n.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Za(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Dr("orchestration_model",r),Dr("orchestration_effort",n),Dr("orchestration_speed",s)])}}function $g(e,t){return e===null||e.value===null||Ya.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function xg(e){return e===null||Ya.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Ag(e){return e===null?null:e.value==="auto"?"auto":Ya.has(e.resolution)?null:e.display}function Xa(e,t){if(typeof e!="object"||e===null)return null;let r=Pr(e,"impl_dispatch"),n=Pr(e,"impl_runtime"),s=Pr(e,"impl_model"),o=Pr(e,"impl_effort"),a=Pr(e,"impl_speed"),c=r!==null&&r.value==="main"?"\uBA54\uC778":Qu([$g(n,t??null),xg(s),Ag(o),a!==null&&a.value==="fast"?"Fast":null]);return c===""?null:{text:c,title:Za(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Dr("impl_dispatch",r),Dr("impl_runtime",n),Dr("impl_model",s),Dr("impl_effort",o),Dr("impl_speed",a)])}}var Sg="worker-ineligible";function Qa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function td(e){return Qa(e).includes(Sg)}var Eg="worker-serial";function Ja(e){return Qa(e).includes(Eg)}function ei(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Tg=new Set(["done","failed","orphaned","stopped","discarded"]),Cg={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Rg={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Ig={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function ti(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Ig[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function rd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,c=document.createElement("dialog");c.id="worker-parallel-analysis-dialog",c.className="pa",c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),e.appendChild(c);let u=new Map,d=new Map,p=!1,m=null,b=null,x=null,A=new Set,L=!1,H=0,te=null,J=new Set;function N(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function q(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function R(){return o&&o()||""}async function U(){if(!s)return;let k=++H;L=!0,x=null,A.clear(),ae();try{let E=await s("worker-parallel-analysis-targets",{root_dir:R()});if(k!==H||!we)return;let M=Array.isArray(E?.qualified)?E.qualified:[],X=Array.isArray(E?.excluded)?E.excluded:[];x={qualified:M,excluded:X};for(let $e of M)$e&&typeof $e.id=="string"&&A.add($e.id)}catch{k===H&&we&&(x={qualified:[],excluded:[]},ie("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{k===H&&(L=!1,we&&ae())}}function g(k){return Array.isArray(k.runs)?k.runs:[]}function S(){let k=N(),E=new Set;for(let M of Object.values(k.attempts||{})){let X=M;X&&typeof X.bead_id=="string"&&!Tg.has(X.status)&&E.add(X.bead_id)}for(let M of Array.isArray(k.pr_wait)?k.pr_wait:[])M&&typeof M.bead_id=="string"&&E.add(M.bead_id);for(let M of Object.values(k.discard_operations||{})){let X=M;X&&X.phase!=="done"&&typeof X.bead_id=="string"&&E.add(X.bead_id)}return E}function V(k){return k.filter(E=>oe(E)===null)}function oe(k){let E=N();for(let M of Array.isArray(E.serial_lanes)?E.serial_lanes:[])if(Array.isArray(M?.entries)&&M.entries.some(X=>X.bead_id===k))return M.id;return(Array.isArray(E.queue)?E.queue:[]).some(M=>M.bead_id===k)?"parallel":null}function D(k,E){let M=u.get(k);return M||[...E.order]}function j(k){if(k.length<2)return!1;let E=oe(k[0]);if(!E||E==="parallel")return!1;let M=N(),X=(Array.isArray(M.serial_lanes)?M.serial_lanes:[]).find(fe=>fe.id===E)?.entries.map(fe=>fe.bead_id);if(!Array.isArray(X))return!1;let $e=k.map(fe=>X.indexOf(fe));return $e.every(fe=>fe>=0)&&$e.every((fe,Ae)=>Ae===0||fe>$e[Ae-1])}function de(){let k=N(),E=Array.isArray(k.serial_lanes)?k.serial_lanes:[],M=E.find(X=>Array.isArray(X.entries)&&X.entries.length===0);return M?M.id:E[0]?.id||"s1"}function be(k){let E=N().bead_titles||{};return typeof E[k]=="string"?E[k]:k}async function ve(k,E){if(!s||p)return null;p=!0,ae();try{return await s(k,E)}finally{p=!1,ae()}}async function Te(k){n?.setPending?.(!0);try{let E=await ve("worker-parallel-analysis-start",{force:k,target_ids:Array.from(A)});E&&E.applied===!1&&E.reason&&(E.reason==="target_not_qualified"&&Array.isArray(E.detail)?ie(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${E.detail.join(", ")}`,"error",3200):ie(`\uBD84\uC11D \uC2E4\uD328: ${E.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function He(){let k=q().job;!s||!k||await s("worker-parallel-analysis-cancel",{job_id:k.job_id})}async function rt(k){if(!(!s||J.has(k))){J.add(k),ae();try{let E=await s("worker-parallel-analysis-prompt",{root_dir:R(),run_id:k});if(!we)return;if(E?.ok===!0&&typeof E.prompt=="string"){te={run_id:k,prompt:E.prompt};return}ie(E?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{J.delete(k),ae()}}}function Pe(){te=null,ae()}async function Xe(){if(!te)return;let k=await tr(te.prompt);ie(k?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",k?"success":"error",1400)}function ce(k,E){a&&a(k,ti(E))}function Ie(){return N().runner_catalog}function Ce(k){return Object.keys(Ie()?.runners?.[k]?.models||{})}function Ne(k){let E=Ce(k),M=Ie()?.runners?.[k]?.default_model;return typeof M=="string"&&E.includes(M)?M:E[0]||""}function ke(){let k=q().settings,E=m||k.runner||"claude",M=Ce(E),X=m?Ne(E):k.model||M[0]||"",$e=ei(Ie(),E,X),fe=k.effort||"",Ae=$e.includes(fe)?fe:$e[0]||"";return{runner:E,model:X,effort:Ae,models:M,efforts:$e}}async function qe(k){let E=q().settings,M=await ve("worker-parallel-analysis-settings-update",{expected_revision:E.revision,runner:k.runner,model:k.model,effort:k.effort});(!M||M.applied!==!0)&&(m=null,ae(),M&&M.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${M.reason}`,"error",2800))}function Ke(k){m=k,ae();let E=ke();qe({runner:k,model:E.model,effort:E.effort})}function Ee(k){let E=ke(),M=ei(Ie(),E.runner,k);qe({runner:E.runner,model:k,effort:M.includes(E.effort)?E.effort:M[0]||""})}function Ve(k){let E=ke();qe({runner:E.runner,model:E.model,effort:k})}async function Y(k,E){if(!s||p)return;let M=D(k,E),X=q();if(M.length<2||!X.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let $e=d.get(k)||de(),fe=()=>({snapshot_digest:X.last_good.identity_digest,group_index:k,lane:$e,ordered_bead_ids:M,expected_revision:N().revision});p=!0,ae();try{let Ae=await s("worker-parallel-analysis-submit",fe());Ae&&Ae.queue&&r&&r.set(Ae.queue),Ae&&Ae.applied!==!0&&Ae.conflict===!0&&(Ae=await s("worker-parallel-analysis-submit",fe()),Ae&&Ae.queue&&r&&r.set(Ae.queue)),Ae&&Ae.applied===!0?(u.delete(k),ie(`\uC9C1\uB82C \uB808\uC778 ${$e}\uC5D0 ${M.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${Ae?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,ae()}}function Z(k,E,M){u.set(k,D(k,E).filter(X=>X!==M)),ae()}function he(k){u.delete(k),ae()}function Le(k,E,M,X){let $e=[...D(k,E)],fe=$e.indexOf(M),Ae=fe+X;fe<0||Ae<0||Ae>=$e.length||($e.splice(Ae,0,...$e.splice(fe,1)),u.set(k,$e),ae())}function Be(){let k=q().settings,E=Object.keys(Ie()?.runners||{}),M=ke();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${X=>Ke(X.target.value)}
        >
          ${E.map(X=>i`<option
                value=${X}
                ?selected=${M.runner===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${X=>Ee(X.target.value)}
        >
          ${M.models.map(X=>i`<option
                value=${X}
                ?selected=${M.model===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${X=>Ve(X.target.value)}
        >
          ${M.efforts.map(X=>i`<option
                value=${X}
                ?selected=${M.effort===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      ${Ue(k)}
    </div>`}function Ue(k){return!it(k)||Fe(k)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:k.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${k.runner}/${k.model} · effort
        ${k.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:k.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function Fe(k){return k.is_default===!0&&k.compatible===!1}function it(k){return!!(k.runner&&k.model&&k.effort)}function tt(k){return it(k)&&k.compatible!==!1}function z(k){let E=Math.max(0,Math.floor(k/1e3)),M=Math.floor(E/60),X=E%60;return`${M}:${String(X).padStart(2,"0")}`}function K(k){let E=k.job;if(E){let M=typeof E.started_at=="number"?E.started_at:0,X=`${E.runner||"?"}/${E.model||"?"}`,$e=M?` \xB7 \uACBD\uACFC ${z(Date.now()-M)}`:"",fe=typeof E.session_id=="string"?E.session_id:"",Ae=g(k).find(Oe=>Oe.run_id===E.job_id);return i`<span class="pa-meta__progress">
        <span
          >분석 중 — ${X} · effort ${E.effort||"?"}${$e}</span
        >
        ${fe?i`<code class="pa-session-id" title=${fe}
              >${fe.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ce(E.job_id,Ae||E)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Ae?.prompt_saved!==!0||J.has(E.job_id)}
          @click=${()=>{rt(E.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return me()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function me(){return n?.isPending?.()===!0}function Qe(k){let E=!!k.job,M=tt(k.settings),X=x!==null&&A.size===0,$e=E||p||me()||L;return i`<div class="pa-meta">
      ${k.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(k.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${K(k)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!M||$e||X}
        @click=${()=>{Te(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!M||$e||X}
        @click=${()=>{Te(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!E}
        @click=${()=>{He()}}
      >
        취소
      </button>
    </div>`}function ge(k){return typeof k=="string"&&k.length>0?k:"\uBBF8\uBC30\uCE58"}function T(k,E){E?A.add(k):A.delete(k),ae()}function O(k){let E=Array.isArray(k.scope)?k.scope:[],M=Array.isArray(k.overlaps)?k.overlaps:[];return E.length===0&&M.length===0?i``:i`<span class="pa-target__signals">
      ${E.length>0?i`<details class="pa-target__scope" title=${E.join(`
`)}>
            <summary>scope ${E.length}</summary>
            <ul>
              ${E.map(X=>i`<li><code>${X}</code></li>`)}
            </ul>
          </details>`:""}
      ${M.length>0?i`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${M.join(", ")}`}
            >겹침 ${M.join(", ")}</span
          >`:""}
    </span>`}function I(){let k=x?.qualified||[],E=x?.excluded||[];return i`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${L?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${k.length} \xB7 \uC81C\uC678 ${E.length}`}</span
        >
      </header>
      ${x&&k.length>0?i`<ul class="pa-targets__list">
            ${k.map(M=>i`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${M.id}
                      .checked=${A.has(M.id)}
                      @change=${X=>T(M.id,X.target.checked)}
                    />
                    <span class="pa-target__title">${M.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${O(M)}
                    <span class="pa-target__route">${M.route}</span>
                    <span class="pa-target__lane"
                      >${ge(M.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:x&&k.length===0?i`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${x&&E.length>0?i`<details class="pa-targets__excluded">
            <summary>제외 대상 ${E.length}</summary>
            <ul class="pa-targets__list">
              ${E.map(M=>i`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${M.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Cg[M.reason]||M.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ge(M.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function G(k){let E=typeof k.session_id=="string"&&k.session_id.length>0,M=E?k.session_id:"";return i`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${k.outcome}"
        >${Rg[k.outcome]||k.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(k.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${k.runner||"?"} / ${k.model||"?"} / ${k.effort||"?"}</span
      >
      ${E?i`<code class="pa-session-id" title=${M}
            >${M.slice(0,8)}</code
          >`:i`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${k.outcome==="failure"&&k.reason?i`<span class="pa-run-row__reason">${k.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ce(k.run_id,k)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${k.prompt_saved!==!0||J.has(k.run_id)}
          @click=${()=>{rt(k.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function se(k){return i`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${k.length>0?i`<ul class="pa-runs__list">
            ${k.map(E=>G(E))}
          </ul>`:i`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function w(){return te?i`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Pe}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${te.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Xe()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Pe}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${te.prompt}</pre
        >
      </section>
    </div>`:""}function C(k,E){let M=D(k,E),X=S(),$e=M.filter(Je=>X.has(Je)),fe=V(M),Ae=j(M),Oe=Array.isArray(N().serial_lanes)?N().serial_lanes:[],yt=d.get(k)||de(),vt=E.eligible!==!0||M.length<2||$e.length>0||fe.length>0||Ae||p;return i`<section class="pa-group" data-group-index=${String(k)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${E.confidence}</span>
        ${E.categories.map(Je=>i`<span class="pa-group__category">${Je}</span>`)}
        ${Ae?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${E.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${fe.length>0?i`<span class="pa-group__stale"
              >stale — ${fe.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${E.reason}</p>
      <ol class="pa-group__members">
        ${M.map((Je,Ct)=>i`<li class="pa-member" data-bead-id=${Je}>
              <span class="pa-member__seq">${Ct+1}</span>
              <span class="pa-member__title">${be(Je)}</span>
              ${X.has(Je)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Je}
                ?disabled=${Ct===0}
                aria-label=${`${Je} \uC704\uB85C`}
                @click=${()=>Le(k,E,Je,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Je}
                ?disabled=${Ct===M.length-1}
                aria-label=${`${Je} \uC544\uB798\uB85C`}
                @click=${()=>Le(k,E,Je,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Je}
                aria-label=${`${Je} \uC81C\uC678`}
                @click=${()=>Z(k,E,Je)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${E.evidence.map(Je=>i`<li class="pa-evidence">
              <code>${Je.path}</code>
              <span class="pa-evidence__locator">${Je.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>he(k)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Je=>{d.set(k,Je.target.value),ae()}}
          >
            ${Oe.map((Je,Ct)=>i`<option
                  value=${Je.id}
                  ?selected=${yt===Je.id}
                >
                  직렬 ${Ct+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${vt}
          @click=${()=>{Y(k,E)}}
        >
          제출
        </button>
      </footer>
    </section>`}function F(k){let E=Array.isArray(k.issues)?k.issues:[],M=E.filter($e=>$e.verdict==="parallel_ok").length,X=E.filter($e=>$e.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${M}</span>
      <span>uncertain ${X}</span>
    </div>`}function ue(){let k=we&&!!q().job;if(k&&b===null){b=setInterval(()=>ae(),1e3);return}!k&&b!==null&&(clearInterval(b),b=null)}function ae(){let k=q();m&&k.settings.runner===m&&(m=null);let E=k.last_good?.result;ue(),Ge(i`
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
            ${Be()} ${Qe(k)} ${I()}
            ${E?i`${E.groups.map((M,X)=>C(X,M))}
                ${E.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${F(E)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${se(g(k))}
          </div>
        </div>
        ${w()}
      `,c)}let we=!1,Re=()=>{we=!1,te=null,H+=1,ue()},We=k=>{k.target===k.currentTarget&&pe()};c.addEventListener("close",Re),c.addEventListener("cancel",Re),c.addEventListener("click",We);let ze=null;r&&r.subscribe&&(ze=r.subscribe(()=>{we&&ae()}));let W=null;n&&n.subscribe&&(W=n.subscribe(()=>{we&&ae()}));function re(){we||(we=!0,ae(),U(),typeof c.showModal=="function"?c.showModal():c.setAttribute("open",""))}function pe(){we&&(we=!1,te=null,H+=1,ue(),typeof c.close=="function"?c.close():c.removeAttribute("open"))}return{open:re,close:pe,destroy(){we=!1,b!==null&&(clearInterval(b),b=null),c.removeEventListener("close",Re),c.removeEventListener("cancel",Re),c.removeEventListener("click",We),ze&&(ze(),ze=null),W&&(W(),W=null),c.remove()}}}var nd=new Set(["sh","bash","zsh","dash","ksh"]),sd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function od(e){let t=e.split("/");return t[t.length-1]||""}function Lg(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=od(r[0]);if(n!=="env")return nd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&nd.has(od(s))}function Og(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Mg(e){let t=[],r=0;sd.lastIndex=0;for(let n of e.matchAll(sd)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Og(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Pg(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function ad(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",c="",u=0,d=null,p=!1;function m(R,U){return U?Mg(R).map(g=>g.kind==="plain"?g.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${g.kind}"
            >${g.text}</span
          >`):R}function b(){if(!s)return i``;let R=o==="ready"&&Lg(a),U=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>N()}
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
              @click=${()=>N()}
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
                  ${c}
                </div>`:i`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${U.map((g,S)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${S+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(g,R)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function x(){Ge(b(),n)}async function A(){if(o!=="ready")return;let R=await tr(a);ie(R?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",R?"success":"error")}function L(R){R.key==="Escape"&&s&&(R.preventDefault(),N())}function H(){p||(document.addEventListener("keydown",L),p=!0)}function te(){p&&(document.removeEventListener("keydown",L),p=!1)}async function J(R,U=null){let g=++u;H(),s={...R},d=U||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",c="",x(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let V=t?t():"";if(!V){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",x();return}if(!r){o="error",c="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",x();return}let oe="/api/repo-ops-script?workspace="+encodeURIComponent(V)+"&lane="+encodeURIComponent(R.lane)+"&base_sha="+encodeURIComponent(R.base_sha);try{let D=await r(oe),j=await D.json().catch(()=>({}));if(g!==u)return;if((t?t():"")!==V){N();return}if(!D.ok||!j||j.ok!==!0){o="error",c=Pg(j&&typeof j.error=="string"?j.error:""),x();return}s={lane:j.lane,base_sha:j.base_sha,path:j.path,base_ref:j.base_ref},a=String(j.content),o="ready",x()}catch{if(g!==u)return;o="error",c="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",x()}}function N(){u+=1,te(),s=null,a="",x();let R=d;d=null,R?.isConnected&&R.focus()}function q(){N(),n.remove()}return{open:J,close:N,destroy:q}}function id(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let g=o();return typeof g.revision=="number"?g.revision:0}function c(g){t&&g&&g.queue&&typeof g.queue=="object"&&t.set(g.queue)}function u(){let g=o().workspace_info;return g&&typeof g=="object"?g:{}}function d(g,S){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${g}"
      >${S}</span
    >`}function p(g){if(typeof g!="number"||!Number.isFinite(g))return"";let S=g/6e4;return Number.isInteger(S)?`timeout ${S}\uBD84`:`timeout ${Math.round(g/1e3)}\uCD08`}function m(g){let S=p(g);return S?d("config",S):""}function b(g,S,V){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${V.script}
      @click=${oe=>{s&&s({lane:g,base_sha:S.base_sha,path:V.script,base_ref:S.base_ref},oe.currentTarget)}}
    ></button>`}function x(){let g=o().repo_ops_opt_out;return{verify:g?.verify===!0,deploy:g?.deploy===!0}}function A(g,S){return i`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!S}
        @change=${V=>{J(g,!V.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function L(g){let S=typeof g.base_sha=="string"?g.base_sha:"",V=`${g.source_path||"repo-ops/config.toml"} @ ${g.base_ref||"?"}${S?`@${S.slice(0,7)}`:""}`,oe=x(),D=!!g.verify&&oe.verify,j=!!g.deploy&&oe.deploy;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${V}</span>
      </p>
      <div
        class="worker-repo-ops__lane${D?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${g.verify?i`${b("verify",g,g.verify)}
              ${m(g.verify.timeout_ms)}
              ${D?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${D?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":g.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${g.verify?A("verify",oe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${j?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${g.deploy?i`${b("deploy",g,g.deploy)}
              ${m(g.deploy.timeout_ms)}
              ${j?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${j?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":g.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${g.deploy?A("deploy",oe.deploy):""}
      </div>
    </section>`}function H(g){let S=g.repo_ops&&typeof g.repo_ops=="object"?g.repo_ops:null;return S&&(S.status==="resolved"||S.status==="absent")?L(S):S&&(S.status==="pending"||S.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${S.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${S.error_code?i` — <code>${S.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function te(g){if(!r)return;let S=await r("worker-auto-repair-toggle",{on:g,expected_revision:a()});if(c(S),S&&S.conflict){let V=await r("worker-auto-repair-toggle",{on:g,expected_revision:a()});c(V)}n()}async function J(g,S){if(!r)return;let V=await r("worker-repo-ops-opt-out-toggle",{kind:g,opted_out:S,expected_revision:a()});if(c(V),V&&V.conflict){let oe=await r("worker-repo-ops-opt-out-toggle",{kind:g,opted_out:S,expected_revision:a()});c(oe)}n()}let N={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function q(g,S,V){return i`<div class="worker-repo-ops__policy-group" data-policy=${V}>
      <div class="worker-repo-ops__policy-label">${g}</div>
      <ul class="worker-repo-ops__policy-list">
        ${S.map(oe=>i`<li data-token=${oe}>
              ${N[oe]||oe}
            </li>`)}
      </ul>
    </div>`}function R(g){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${g.map(S=>{let V=[N[S.trigger]||S.trigger];return Number.isInteger(S.attempts_per_operation_attempt)?V.push(`operation\uB2F9 ${S.attempts_per_operation_attempt}\uD68C`):Number.isInteger(S.attempts)?V.push(`${N[S.budget]||S.budget} ${S.attempts}\uD68C`):Number.isInteger(S.sessions_per_user_action)&&V.push(`${S.sessions_per_user_action}\uD68C`,N[S.user_actions]||S.user_actions),S.applies_when&&V.push(N[S.applies_when]||S.applies_when),i`<li data-token=${S.id}>
            <strong>${N[S.id]||S.id}</strong>
            <span>${V.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function U(){let g=o(),S=g.auto_repair!==!1,V=g.repo_operation_policy&&typeof g.repo_operation_policy=="object"?g.repo_operation_policy:null,oe=Array.isArray(g.repo_operations)?g.repo_operations:[],D=oe.find(ve=>ve.state==="repairing"),j=oe.filter(ve=>ve.state==="failed"||ve.state==="repairing"),de=j.length?Math.min(...j.map(ve=>typeof ve.repair?.remaining=="number"?ve.repair.remaining:0)):V?.auto_repair?.resolution_ladder?.find(ve=>ve.id==="auto_repair_session")?.attempts??1,be=Array.isArray(V?.auto_repair?.resolution_ladder)?V.auto_repair.resolution_ladder:[];return i`<section
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
          @change=${ve=>{te(ve.target.checked)}}
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
          >남은 자동 해결 ${de}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${D?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${D.repair?.owner_bead||D.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${V?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(V.worker_automatic||[]).length} · 해결 사다리
                ${be.length} · 금지
                ${(V.never_automatic||[]).length}</span
              >
            </summary>
            ${q("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",V.worker_automatic||[],"worker-automatic")}
            ${V.supported===!1||V.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${V.schema_version})`}
                </div>`:R(be)}
            ${q("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",V.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${H(u())} ${U()}
      </details>`}}}var dd=20,Dg=5,Ng=new Set(["failed","repairing","running","queued","retry_pending"]),ld={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},cd={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function qg(e,t,r=dd){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Fg(e){if(e.type==="cleanup")return!0;let t=e.operation;return Ng.has(t.state)&&!t.dismissed&&!t.superseded_by}function jg(e,t,r={}){let n=qg(e,t,1/0),s=r.expanded===!0?dd:Dg,o=new Set(n.slice(0,s)),a=n.filter(c=>o.has(c)||Fg(c));return{visible:a,hidden:n.length-a.length}}function ud(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Bg(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function pd(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function fd(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function Ug(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(cd,n)?cd[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Wg(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?At(e.at):""}
      >${go(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${ud(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(ld,t.kind)?ld[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${_o(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${mo(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${ud(e)}"
          >${Bg(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?fd(uu(t.failure_kind,n)):""}
      ${Ug(t)}
      ${pd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${_o(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function zg(e){let t=e.cleanup,r=tn(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?At(e.at):""}
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
        ${ou(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${fd(ko(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${pd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Hg(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(n=>n.type==="cleanup"?zg(n):Wg(n))}
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
  </section>`}function _d(e,t={}){let r=null;function n(){if(r===null){Ge(i``,e);return}let a=jg(r.operations,r.cleanup_failures,{expanded:r.expanded});Ge(Hg({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let c=a.target;if(c?.closest?.('[data-seam="repo-ops-close"]')){o();return}c?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var Gg=pt("views:worker"),Vg="tab:worker:ready",Kg="tab:worker:blocked",Yg="tab:worker:in-progress",Zg="tab:worker:resolved",Xg="tab:worker:closed",Ao=1,md=5;function gd(e){return no(e).path.length>0}var Qg=new Set(["quick_fix","spec_backed","full_plan"]);function bd(e){return typeof e=="string"&&Qg.has(e)}var wd="beads-ui.worker.candidate-filter",ri={show_blocked:!1,spec:"all"};function Jg(){try{let e=window.localStorage.getItem(wd);if(!e)return{...ri};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ri};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ri}}}function eb(e){try{window.localStorage.setItem(wd,JSON.stringify(e))}catch{}}function tb(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let u=r(c),d=n(c);u&&d?s.push(c):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var rb=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],kd="bdui.worker.candidate_sort",nb=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],So="spec";function sb(){try{let e=window.localStorage.getItem(kd);return e==="board"||e==="created"||e==="spec"?e:So}catch{return So}}function ob(e){try{window.localStorage.setItem(kd,e)}catch{}}var $d="bdui.worker.done-range";function ab(){try{let e=window.localStorage.getItem($d);return Gt(e)?e:jt}catch{return jt}}function ib(e){try{window.localStorage.setItem($d,e)}catch{}}var lb="(max-width: 640px)",xd="beads-ui.worker.lane-collapsed",as={queue:!0,done:!0};function cb(){try{let e=window.localStorage.getItem(xd);if(!e)return{...as};let t=JSON.parse(e);return!t||typeof t!="object"?{...as}:{queue:typeof t.queue=="boolean"?t.queue:as.queue,done:typeof t.done=="boolean"?t.done:as.done}}catch{return{...as}}}function ub(e){try{window.localStorage.setItem(xd,JSON.stringify(e))}catch{}}function hd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function db(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Yr):(n.sort(Es(r)),t==="board"?n:[...n.filter(gd),...n.filter(s=>!gd(s))])}function pb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function fb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function yd(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function _b(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function mb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function gb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function bb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ni(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function hb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function vd(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function yb(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):vd(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${vd(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${yd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${yd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function vb(e,t,r,n,s=null,o=null,a=null,c=!1,u=null,d=!0,p=null,m=null,b=null,x={},A=!1,L=!1,H={}){let te=!!u&&u.position>0,J=!!u?.continuation_action&&u.continuation_action.continuation===null,N=!!u&&u.active===!0,q=u&&u.failure||null,R=mb(u?u.waiting:null,b),U=r[e]||null,g=U&&U.gate?U.gate:null,S=U&&U.pr?U.pr:null,V=hb(b),oe=gb(u?u.resolution:null),D=bb(u?u.head_review:null),j=u&&u.head_review||null,de=u&&u.authority||null,be=!!j&&["pending","reviewing","revising"].includes(j.state),ve=te&&!N&&(j?.state==="failed"||!de||de.source==="automatic"&&!L),Te=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":oe?oe.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":R,He=!!g&&g.base_badge==="\uCDA9\uB3CC",rt=!!g&&g.enabled===!0,Pe=rs({bead_id:e,merge_sha:H.merge_sha,cleanup_cursor:H.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:H.repo_operations}),Xe=wo(Pe),ce=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!g&&g.tier==="merged",Ie=c&&!!n&&!!g&&g.tier==="merged",Ce=ve&&(rt||He||g?.reason==="base_behind"||g?.reason==="review_receipt_missing"||g?.reason==="review_receipt_stale"||ce||Ie),Ne=c&&He&&d===!1,ke=_r(x,e,{external:c,merge_active:N||Pe?.step==="merge",merge_queued:te,conflict_active:!!a,cleanup_active:Xe,merged:!!n||g?.tier==="merged"}),qe=!!ke.operation,Ke=!ce&&!!n&&n.step==="repo_operations",Ee=yb({continuation_required:J,merge_step:Pe,conflict_badge:Te,conflict_live:oe?.live===!0||a==="running",head_review:j&&D?{...D,state:j.state,failure_reason:j.failure_reason}:null,recovery:V,cleanup_failed:n,cleanup_label:n?tn(n.step):null,base_exception:m,conflicting:He,gate:g,receipt_check:U&&U.receipt_check?U.receipt_check:null,queue_failure:q,auto_skip:p,queued:te,queue_active:N,queue_position:u?u.position:0,activity:Te?null:o&&o.activity||null}),Ve=Ee?.live===!0&&Ee.title?i`<span title=${Ee.title}>${Ee.label}</span>`:Ee?.label||null;return{id:e,title:c?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&Pe?.active!==!0?vo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:c,pr_number:S&&typeof S.number=="number"?S.number:null,pr_url:S&&typeof S.url=="string"?S.url:"",completion_badge:Ee?.live!==!0&&Ee?.title?Ee.label:null,completion_title:Ee?.title||"",completion_repair_pr_url:V?V.repair_pr_url:"",completion_repair_pr_number:V?V.repair_pr_number:null,badges:Ve?[Ve]:[],live_badge:Ee?.live===!0?Ve:null,usage:s,alert:Ee?.alert===!0,merge_action:g?.tier==="merged"&&!ce&&!Ie||Ke?!1:!te||J||ve,timeline_action:Ke,cancel_action:te&&!J,cancel_enabled:(!N||be)&&!(V&&V.lock_actions),cancel_title:V&&V.lock_actions?`${V.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:N&&!be?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":be?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ke,discard_action:ke.action,merge_step:Pe,discard_enabled:ke.enabled,discard_title:ke.title,merge_enabled:!Pe&&!a&&!qe&&!m&&!(V&&V.lock_actions)&&!Ne&&!Ke&&(rt||He||g?.reason==="base_behind"||g?.reason==="review_receipt_missing"||g?.reason==="review_receipt_stale"||ce||Ie||Ce),merge_label:J?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ce||Ie?"\uC815\uB9AC \uC7AC\uAC1C":He&&!Pe&&!ce?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":g?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":g?.reason==="review_receipt_missing"||g?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ve?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:qe?ke.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ke.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ke.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:J?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Pe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Pe.label}`:Ie?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ne?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ce?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":He?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":g?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":g?.reason==="review_receipt_missing"||g?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":g?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":rt?`\uBA38\uC9C0 (${g.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:g&&g.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${g&&g.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function si(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:c,gotoIssue:u,getWorkspacePath:d,doneRange:p,onDoneRangeChange:m}=t,b=n?Cs(n,c):null,x=Os({transport:r,uiOrderStore:c}),A=null,L=[],H=Jg(),te=null,J=sb(),N=Gt(p)?p:ab(),q=new Map;function R(){let _=ur.find(v=>v.value===N);return _?_.label:"\uC624\uB298"}let U=cb(),g=!1,S=new Set,V=new Set,oe=new Set,D=new Set,j=new Set,de={},be=null,ve=0,Te=null,He=[];function rt(_){return be===_?de:{}}async function Pe(){if(!r)return;let _=d?.()||"";if(be===_||Te&&Te.key===_&&Te.generation===ve)return;let v=++ve;Te={key:_,generation:v};let l=null;try{l=await Promise.resolve(r("get-session-defaults",{}))}catch(f){if(v!==ve)return;Te=null,Gg("get-session-defaults failed: %o",f);return}v===ve&&(de=l&&typeof l.values=="object"&&l.values!==null?{...l.values}:{},be=_,Te=null,Me())}function Xe(){be=null,ve+=1,Pe()}let ce=document.createElement("div");ce.className="worker-console";let Ie=document.createElement("div");Ie.className="worker-top";let Ce=document.createElement("div");Ce.className="worker-drawer-overlay",Ce.hidden=!0;let Ne=document.createElement("div");Ne.className="worker-drawer-overlay__backdrop";let ke=document.createElement("div");ke.className="worker-drawer-host";let qe=document.createElement("div");qe.className="worker-drawer-host",qe.hidden=!0,Ce.append(Ne,ke,qe);let Ke=document.createElement("div");Ke.className="worker-lanes-host",ce.append(Ie,Ce,Ke),e.appendChild(ce);let Ee=null,Ve=null,Y=ro(ke,{transport:r,sessionLogStore:a,onClose:()=>{Ee=null,Ve=null,Ce.hidden=!0,Me()}}),Z=_d(qe,{onClose:()=>{qe.hidden=!0,Ce.hidden=!0,Me()}}),he=ad({getWorkspacePath:d||(()=>"")}),Le=d&&d()||"",Be=id({queueStore:s,transport:r,onChanged:()=>Me(),onOpenScript:(_,v)=>{he.open(_,v)}}),Ue=o?rd(ce,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(_,v)=>ct(_,v)}):null;function Fe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ao,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function it(){let _=Fe(),v=typeof _.serial_lane_count=="number"&&Number.isInteger(_.serial_lane_count)&&_.serial_lane_count>0?Math.min(_.serial_lane_count,5):0,l=Array.isArray(_.serial_lanes)?_.serial_lanes:[],f=[];for(let P of l){if(f.length>=v)break;!P||typeof P.id!="string"||!/^s[1-5]$/.test(P.id)||!Array.isArray(P.entries)||f.push({id:P.id,label:`\uC9C1\uB82C ${P.id.slice(1)}`,count:P.entries.length})}return f.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(_.queue)?_.queue:[]).length},...f]}function tt(_){if(!te||!_.some(l=>l.id===te))return null;let v=it();return v?{bead_id:te,lanes:v}:null}function z(){let _=Fe();return typeof _.revision=="number"?_.revision:0}function K(_){_&&_.queue&&s&&s.set(_.queue)}function me(){let _=Fe().queue;return Array.isArray(_)?_.length:0}async function Qe(_,v,l){if(!r)return;let f=()=>({bead_id:_,...v==="parallel"?{}:{lane:v},...l===void 0?{}:{index:l},expected_revision:z()}),y=await r("worker-queue-place",f());K(y),y&&y.conflict&&await r("worker-queue-place",f()).then(K)}async function ge(_,v,l){if(!r)return;let f=()=>({bead_id:_,...v==="parallel"?{}:{lane:v},to_index:l,expected_revision:z()}),y=await r("worker-queue-reorder",f());K(y),y&&y.conflict&&await r("worker-queue-reorder",f()).then(K)}async function T(_){if(!r)return;let v=await r("worker-queue-remove",{bead_id:_,expected_revision:z()});K(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:_,expected_revision:z()}).then(K)}async function O(_){if(!r||!_)return;let v=await r("worker-attempt-pause",{attempt_id:_});v&&v.paused===!1&&v.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function I(_){if(!r||!_)return;let v=await vn();if(v===null)return;let l=async(y={})=>await r("worker-attempt-resume",{attempt_id:_,expected_revision:z(),...v!==""?{instructions:v}:{},...y}),f=await l();K(f),f&&f.conflict&&(f=await l(),K(f)),f=await hr(f,(y,P)=>l({continuation:y,decision_token:P}),{onResult:K,refresh:()=>l()}),f&&f.resumed===!1&&!f.conflict&&f.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${f.reason}`,"error",2400)}async function G(_){if(!r||!_)return;let v=await r("worker-attempt-dismiss",{attempt_id:_,expected_revision:z()});K(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:_,expected_revision:z()}),K(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function se(_,v,l=!0){if(!r)return null;let f=r,y=await f(_,{...v,expected_revision:z()});return K(y),y&&y.conflict&&l&&(y=await f(_,{...v,expected_revision:z()}),K(y)),y}async function w(_){if(!r||!_)return;let v=Fe().merge_queue?.find(f=>f.bead_id===_)?.continuation_action;if(v?.mismatch&&v.continuation===null){await F(_,v.mismatch);return}S.add(_),Me();let l;try{l=await se("worker-merge-queue-add",{bead_id:_})}finally{S.delete(_),Me()}!l||l.conflict||l.applied||ie(_b(l.reason),"error",2400)}async function C(_){if(!(!r||!_||V.has(_))){V.add(_),Me();try{let v=await r("worker-cleanup-retry",{bead_id:_,expected_revision:z()});K(v),v&&!v.retried&&!v.conflict&&v.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{V.delete(_),Me()}}}async function F(_,v){let l=await hr({continuation_mismatch:v},(y,P)=>se("worker-merge-queue-add",{bead_id:_,continuation:y,decision_token:P},!1)),f=l?.queue?.merge_queue?.find(y=>y.bead_id===_)?.continuation_action;if(l?.applied!==!0&&f?.continuation===null&&f.mismatch){await F(_,f.mismatch);return}l&&l.applied===!1&&!l.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function ue(_){if(!r)return;let v=await se("worker-merge-auto-toggle",{on:_});!v||v.conflict||ie(_?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",_?"success":"info",2400)}async function ae(_){if(!r||!_)return;let v=await se("worker-merge-queue-remove",{bead_id:_});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function we(){await se("worker-merge-queue-remove",{all:!0})}async function Re(_,v=null,l="unmerged",f=null){if(!r||!_)return;let y=Jn(_,l);if(!(!!f||typeof globalThis.confirm!="function"||globalThis.confirm(y)))return;let Q=await r("worker-discard",{bead_id:_,...v?{attempt_id:v}:{},...f?{operation_id:f}:{},expected_revision:z()});if(K(Q),Q&&Q.conflict&&(Q=await r("worker-discard",{bead_id:_,...v?{attempt_id:v}:{},...f?{operation_id:f}:{},expected_revision:z()}),K(Q)),Q&&Q.discarded===!0){ie(bo(Q),"success",5e3);return}if(Q&&Q.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${Q.reason}`,"error",2800);return}if(Q&&Q.accepted&&Q.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Q&&Q.accepted&&!Q.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${Q.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Q&&!Q.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function We(_,v,l){if(!(!r||!v||!l||D.has(v))){D.add(v),Me();try{let f=await r(_,{bead_id:v,action_id:l,expected_revision:z()});K(f),f?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!f?.ok&&f?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(f.reason)}`,"error",2800)}finally{D.delete(v),Me()}}}async function ze(_,v){if(!r||!v||oe.has(v))return;oe.add(v),Me();let l;try{let f=async(y={})=>await r(_,{bead_id:v,expected_revision:z(),...y});l=await f(),K(l),l&&l.conflict&&(l=await r(_,{bead_id:v,expected_revision:z()}),K(l)),_==="worker-revise-fix"&&(l=await hr(l,(y,P)=>f({continuation:y,decision_token:P}),{onResult:K,refresh:()=>f()}))}finally{oe.delete(v),Me()}if(!(!l||l.conflict)){if(l.ok){ie(_==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${l.reason||""}`,"error",3e3)}}async function W(_){if(!r)return;let v=await r("worker-automation-toggle",{on:_,expected_revision:z()});K(v),v&&v.conflict&&await r("worker-automation-toggle",{on:_,expected_revision:z()}).then(K)}async function re(_){if(!r||!_)return;let v=await r("worker-repo-operation-repair",{operation_id:_});if(K(v),v&&v.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function pe(_){if(!r||!_)return;let v=await r("worker-repo-operation-dismiss",{operation_id:_});K(v),v&&v.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function k(_){if(!r||!Number.isFinite(_))return;let v=Math.max(Ao,Math.floor(_)),l=await r("worker-queue-set-slots",{slots:v,expected_revision:z()});K(l),l&&l.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:z()}).then(K)}async function E(_){if(!r||!Number.isInteger(_)||_<1||_>md)return;let v=Fe(),l=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(_).reduce((P,Q)=>P+(Array.isArray(Q?.entries)?Q.entries.length:0),0),f=()=>({count:_,expected_revision:z()}),y=await r("worker-queue-set-serial-lane-count",f());K(y),y&&y.conflict&&(y=await r("worker-queue-set-serial-lane-count",f()),K(y)),y&&y.applied&&l>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${l}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function M(){let _=Fe(),v=b?b.selectBoardColumn(Vg,"ready"):[],l=b?b.selectBoardColumn(Kg,"blocked"):[],f=b?b.selectBoardColumn(Xg,"closed"):[],y=b?b.selectBoardColumn(Yg,"in_progress"):[],P=b?b.selectBoardColumn(Zg,"resolved"):[],Q=Is([...v,...l,...y,...P,...f]),le=new Map;for(let h of[...v,...l,...y])h&&h.id&&!le.has(h.id)&&le.set(h.id,h);let ye={...rt(d?.()||"")};for(let h of["orchestration_model","orchestration_effort","orchestration_speed"]){let B=_[h];typeof B=="string"&&(ye[h]=B)}function je(h,B){let ne=le.get(h);if(!ne)return null;let De=ne.metadata&&typeof ne.metadata=="object"?ne.metadata:{},et=ne.workflow?.route,kt=De.route,ht=bd(et)?et:bd(kt)?kt:null;return pr({pin:De,global:ye,execution_defaults:_.execution_defaults??null,runner_catalog:_.runner_catalog??null,route:ht,controller_runtime:B})}function ot(h){let B=h.runner||null,ne=je(h.bead_id,B),De=Ju(h),et=ne?Xa(ne,B):null;return De||et?{orchestration:De,worker:et}:null}let Mt=new Map;function Eo(h){if(Mt.has(h))return Mt.get(h)??null;let B=je(h,null),ne=null;if(B){let De=Ar(_.runner_catalog??null,B.orchestration_model.value??""),et=De===null?B:je(h,De),kt=ed(et,_.runner_catalog??null),ht=Xa(et,De);ne=kt||ht?{orchestration:kt,worker:ht}:null}return Mt.set(h,ne),ne}function nn(h){let B=Ls(Q,h);return B.total===0?null:B}let is=_.bead_titles||{},Xt=new Map;for(let[h,B]of Object.entries(is))typeof B=="string"&&B.length>0&&Xt.set(h,B);for(let h of[...v,...l])Xt.set(h.id,h.title||h.id);let ls=_.bead_times&&typeof _.bead_times=="object"&&!Array.isArray(_.bead_times)?_.bead_times:{},Fr=_.bead_labels&&typeof _.bead_labels=="object"&&!Array.isArray(_.bead_labels)?_.bead_labels:{},Er=new Map;for(let[h,B]of Object.entries(Fr))Array.isArray(B)&&Er.set(h,Ja(B));for(let h of[...v,...l]){let B=h.labels;Array.isArray(B)&&!Er.has(h.id)&&Er.set(h.id,Ja(B))}let sn=new Map,on=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(on)?on:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let B=h.members.map(De=>{let et=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).find(kt=>kt.entries.some(ht=>ht.bead_id===De));return et?et.id:null});if(!(B.every(De=>De!==null)&&new Set(B).size===1))for(let De of h.members)sn.set(De,h.members.filter(et=>et!==De))}let cs=_.bead_blocked_by&&typeof _.bead_blocked_by=="object"&&!Array.isArray(_.bead_blocked_by)?_.bead_blocked_by:{},an=new Map;for(let[h,B]of Object.entries(ls))B&&typeof B=="object"&&an.set(h,B);for(let h of[...v,...l])an.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let jr=h=>an.get(h)||{},Br=_.pr_wait||[],ln=_.pr_observations||{},us=_.pr_activity||{},Se=_.cleanup_failed||{},ft=Object.entries(Se).map(([h,B])=>({bead_id:h,step:B&&B.step?B.step:"",reason:B&&B.reason?B.reason:"",at:B&&typeof B.at=="number"?B.at:null,detail:B&&typeof B.detail=="string"?B.detail:null,output_tail:B&&typeof B.output_tail=="string"&&B.output_tail?B.output_tail:void 0,log_path:B&&typeof B.log_path=="string"&&B.log_path?B.log_path:void 0,retry_count:B&&typeof B.retry_count=="number"&&Number.isInteger(B.retry_count)&&B.retry_count>0?B.retry_count:0,failure_code:B&&typeof B.failure_code=="string"?B.failure_code:void 0,subject_id:B&&typeof B.subject_id=="string"?B.subject_id:void 0,repair_eligible:!!(B&&B.repair_eligible),repair:B&&B.repair?B.repair:void 0})),cn=_.queue||[],Nd=new Set([...cn.map(h=>h.bead_id),...(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(B=>B.bead_id)),...Br.map(h=>h.bead_id),..._.done.map(h=>h.bead_id)]),qd=new Set(l.map(h=>h.id)),Fd=c?c.get()?.order||{}:{},li=new Set,ci=[];for(let h of[...v,...l])Nd.has(h.id)||li.has(h.id)||pb(h)||(li.add(h.id),ci.push(h));L=db(ci,J,Fd);let jd=_.admission||{},ui=h=>{let B=jd[h];if(!B)return"";if(B.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof B.reason=="string"?B.reason:"",De=ne.indexOf(":");return De>0&&De<ne.length-1?`\u26D4 ${ne.slice(0,De)} (${ne.slice(De+1)})`:`\u26D4 ${ne}`},Bd=L.map(h=>{let B=no(h),ne=B.path.length>0,De=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",et=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,kt=Object.hasOwn(h,"labels")&&td(h.labels),ht=!kt&&(De?et:ne&&!B.conflict),ut=qd.has(h.id),Jt=[];ut&&Jt.push(fb(h)),De&&!et?Jt.push("missing_description"):!De&&B.conflict?Jt.push("spec_id_conflict"):!De&&!ne&&Jt.push("spec \uC5C6\uC74C");let hs=ui(h.id);return hs&&Jt.push(hs),{id:h.id,title:h.title||h.id,reason:Jt.join(" \xB7 "),draggable:ht,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:De,status:h.status,worker_ineligible:kt,blocked:ut,has_spec:ne,exec_chips:Eo(h.id)}}),To=tb(Bd,H),Ud=To.visible,Wd=_.revise_parked||{},ds=_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},Co=(h,B)=>h.map((ne,De)=>{let et=B!=="done",kt=B!=="done"&&B!=="queue",ht=et?Wd[ne.bead_id]:null,ut=et?_r(ds,ne.bead_id):null,Jt=ut?.operation?ut:null,hs=et&&Er.get(ne.bead_id)===!0,Mi=cs[ne.bead_id]||[],Mo=_.admission&&typeof _.admission=="object"?_.admission[ne.bead_id]:null,Po=et?Qc(Mo,!!Jt||D.has(ne.bead_id)):null,rp=et&&!Po?ui(ne.bead_id):null,np=et?[rp]:[],Pi=et&&Mi.length>0&&typeof Mo?.reason=="string"&&Mo.reason.startsWith("not_ready")?[`\u23F8 ${Mi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Do=et?sn.get(ne.bead_id):void 0;return Do&&Do.length>0&&Pi.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Do.join(", ")}\uC640`),{id:ne.bead_id,title:Xt.get(ne.bead_id)||ne.bead_id,reason:np.filter(Boolean).join(" \xB7 "),draggable:et&&!Jt&&!Po,done:B==="done",lane:B,seq:kt?De+1:void 0,worker_serial:hs,discard:Jt,stale_work:Po,badges:[...Pi,...ht?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!ht,revise_action:!!ht,revise_enabled:!!ht&&!Jt&&!oe.has(ne.bead_id),revise_title:ht?ht.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ht.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:B==="done"?Vt(_.attempts||{},ne.bead_id):null,work_ms:B==="done"?Zc(_.attempts||{},ne.bead_id):null,done_at:B==="done"&&typeof ne.added_at=="number"?ne.added_at:void 0,exec_chips:et?Eo(ne.bead_id):null,...jr(ne.bead_id)}}),un=_.attempts?Object.values(_.attempts):[],Ro=new Set;for(let h of un)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&Ro.add(h.resumed_from);let di=new Map;for(let h of un)di.set(h.bead_id,h.attempt_id);let ps=new Map;for(let h of un)ps.set(h.attempt_id,h);function Io(h){let B=new Set,ne=h;for(;ne&&!B.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;B.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&ps.get(ne.resumed_from)||null}return!1}let fs=typeof _.declared_base=="string"?_.declared_base:null;function zd(h){let B=null;for(let ne of un)!ne||ne.bead_id!==h||Io(ne)||(B===null||(typeof ne.started_at=="number"?ne.started_at:0)>=(typeof B.started_at=="number"?B.started_at:0))&&(B=ne);return B&&typeof B.target_base=="string"?B.target_base:null}let pi=[],fi=[],Hd=Xu(_),_i=h=>{let B=typeof h.session_id=="string"&&h.session_id.length>0,ne=Ro.has(h.attempt_id);return{eligible:B&&!ne,reason:B?ne?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Qt=null;for(let h of un){let B=h.status==="paused"&&!Ro.has(h.attempt_id);if(h.status==="running"||B)fi.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Xt.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:B,conflict_resolution:Io(h),base_exception:ni(fs,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:_r(ds,h.bead_id,{attempt_id:h.attempt_id}),usage:Vt(_.attempts||{},h.bead_id),rollup:nn(h.bead_id),rollup_expanded:j.has(h.bead_id),exec_chips:ot(h),...jr(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&Hd(h)){let ne=_i(h);pi.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Xt.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:_r(ds,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:ne.eligible,resume_reason:ne.reason,conflict_resolution:Io(h),base_exception:ni(fs,h.target_base),usage:Vt(_.attempts||{},h.bead_id),rollup:nn(h.bead_id),rollup_expanded:j.has(h.bead_id),exec_chips:ot(h),...jr(h.bead_id)}),Qt=h}}let _s=[...pi,...fi].map(h=>{let B=ps.get(h.attempt_id),ne=B?.quickfix_landing;if(B?.quickfix_lane!==!0||!ne||typeof ne!="object")return h;let De=typeof ne.reason=="string"&&ne.reason.length>0?ne.reason:null,et=rs({bead_id:B.bead_id,merge_sha:ne.head_sha,cleanup_cursor:ne.cursor,cleanup_failed:De?{step:ne.cursor,reason:De}:null,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]});return et?{...h,landing:et}:h}),mi=null;if(Qt){let h=_i(Qt),B=Qt.cause_detail;mi={bead_id:Qt.bead_id,repo:Qt.repo||"",reason:Qt.cause||Qt.status,cause_detail:B&&typeof B.reason=="string"?{reason:B.reason,command:typeof B.command=="string"?B.command:null}:null,resume_attempt_id:Qt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:_r(ds,Qt.bead_id,{attempt_id:Qt.attempt_id})}}let gi=new Set(_s.map(h=>h.bead_id)),Lo=Array.isArray(_.merge_queue)?_.merge_queue:[],bi=new Map,hi=new Map,yi=new Map,vi=new Map,wi=new Map;Lo.forEach((h,B)=>{h&&typeof h.bead_id=="string"&&(bi.set(h.bead_id,B+1),hi.set(h.bead_id,h.resolution),yi.set(h.bead_id,h.continuation_action||null),vi.set(h.bead_id,h.head_review||null),wi.set(h.bead_id,h.authority||null))});let dn=_.merge_queue_state||{active:null,failures:{}},Gd=dn.failures||{},ki=dn.waiting&&typeof dn.waiting.bead_id=="string"&&typeof dn.waiting.reason=="string"?dn.waiting:null,Vd=_.auto_merge_skips||{},$i=h=>{let B=Vd[h];if(!B)return null;let ne=ln[h],De=ne&&ne.pr?ne.pr.head_sha:null;return De&&De===B.head_sha?B.reason||"":null},ms=new Map;for(let h of _s)h.failed!==!0&&h.conflict_resolution&&(h.paused?ms.has(h.bead_id)||ms.set(h.bead_id,"paused"):ms.set(h.bead_id,"running"));let xi=_s.filter(h=>!h.paused&&h.failed!==!0).length,Ai=(_.workspace_info||{}).slots,Si=typeof Ai=="number"?Ai:typeof _.slots=="number"?_.slots:Ao,Kd=xi>Si,gs=Vr(N),Yd=(Array.isArray(_.done)?_.done.slice():[]).filter(h=>gs===void 0||typeof h.added_at!="number"||h.added_at>=gs).sort((h,B)=>(B.added_at||0)-(h.added_at||0)),Tn=Co(Yd,"done"),Zd=new Set((Array.isArray(_.done)?_.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),Ei=[],Xd=d?.()||"";for(let h of f){let B=Zr(h.closed_at);if(typeof h.id!="string"||Zd.has(h.id)||B===null||gs!==void 0&&B<gs||typeof h.comment_count!="number"||h.comment_count<=0)continue;let ne=`${Xd}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,De=q.get(ne);De===void 0&&r&&(q.set(ne,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(et=>{let kt=Array.isArray(et)&&et.some(ht=>so(typeof ht?.text=="string"?ht.text:"")?.lane==="session");q.set(ne,kt?"session":"not-session"),Me()}).catch(()=>{q.set(ne,"failed"),Me()})),De==="session"&&Ei.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:B,created_at:h.created_at,updated_at:h.updated_at})}Tn.push(...Ei),Tn.sort((h,B)=>(B.done_at||0)-(h.done_at||0));let bs={};for(let h of yr)bs[h]=0;let Ti=!1,Ci=0,Oo=0,Ri=0;for(let h of Tn){let B=h.usage;if(B&&typeof B=="object"){let ne=!1;for(let De of yr)Number.isFinite(B[De])&&(bs[De]+=B[De],Ti=!0,ne=!0);ne&&(Oo+=1,Number.isFinite(B.total_cost_usd)&&(Ci+=B.total_cost_usd,Ri+=1))}}Oo>0&&Ri===Oo&&(bs.total_cost_usd=Ci);let Ii=Tn.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),Qd=Ii.length>0?Et(Us(Ii)):Ti?rr(bs):null,Jd=_.lane_states&&typeof _.lane_states=="object"&&!Array.isArray(_.lane_states)?_.lane_states:{},ep=Array.isArray(_.serial_lanes)?_.serial_lanes:[],Li=h=>{if(Br.some(De=>De.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let B=un.filter(De=>De&&De.bead_id===h),ne=B.length>0?B[B.length-1].status:null;return ne==="failed"||ne==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ne==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Oi=ep.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,B)=>{let ne=Jd[h.id]||{},De=new Map((Array.isArray(ne.corrections)?ne.corrections:[]).filter(ut=>ut&&typeof ut.bead_id=="string"&&typeof ut.after=="string").map(ut=>[ut.bead_id,ut.after])),et=Co(h.entries.filter(ut=>!gi.has(ut.bead_id)),h.id).map(ut=>De.has(ut.id)?{...ut,badges:[`\u{1F517} ${De.get(ut.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ut.badges]}:ut),kt=Array.isArray(ne.occupied_by)?ne.occupied_by.filter(ut=>typeof ut=="string"):[],ht=kt.map(ut=>({id:ut,title:Xt.get(ut)||ut,draggable:!1,lane:h.id,ghost:!0,badges:[Li(ut)]}));return{id:h.id,index:B+1,rows:[...ht,...et],occupied:kt.length>0,badge:kt.length>0?Li(kt[0]):"\uB300\uAE30",cycle:ne.cycle===!0}}),tp=typeof _.serial_lane_count=="number"?_.serial_lane_count:Oi.length;return{queue:_,idToTitle:Xt,candidates:Ud,candidate_hidden:{blocked:To.hidden_blocked,spec:To.hidden_spec},running:_s,live_count:xi,slots:Si,over_cap:Kd,failure:mi,waiting:Co(cn.filter(h=>!gi.has(h.bead_id)),"queue"),serial_lanes:Oi,serial_lane_count:tp,pr_wait:Br.map(h=>vb(h.bead_id,Xt.get(h.bead_id)||h.bead_id,ln,Se[h.bead_id]||null,Vt(_.attempts||{},h.bead_id),us[h.bead_id]||(S.has(h.bead_id)||V.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ms.get(h.bead_id)||null,h.external===!0,{position:bi.get(h.bead_id)||0,active:dn.active===h.bead_id,failure:Gd[h.bead_id]||null,waiting:ki?.bead_id===h.bead_id?ki.reason:null,resolution:hi.get(h.bead_id),continuation_action:yi.get(h.bead_id),head_review:vi.get(h.bead_id)||null,authority:wi.get(h.bead_id)||null},h.wt_present!==!1,_.auto_merge===!0?$i(h.bead_id):null,ni(fs,zd(h.bead_id)),_.completion_status&&typeof _.completion_status=="object"&&!Array.isArray(_.completion_status)&&_.completion_status[h.bead_id]||null,_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},ps.get(di.get(h.bead_id)||"")?.worker_serial===!0,_.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]})).map(h=>({...h,...jr(h.id)})),merge_queue_length:Lo.length,merge_queue_running:Lo.length>0,auto_excluded:Br.map(h=>h.bead_id).filter(h=>$i(h)!==null),declared_base:fs,done:Tn,token_total:Qd,cleanup_failures:ft,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]}}function X(){let v=!!o?.get()?.job,l=!v&&o?.isPending?.()===!0,f=v?"\uBD84\uC11D \uC911":l?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${f?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${f?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${f?i`<span class="worker-analysis-btn__badge">${f}</span>`:""}
    </button>`}function $e(_){let v=_.waiting.length>0?_.waiting[0].id:"\u2014",l=i`<button
      type="button"
      class="worker-play${_.queue.auto_advance?" is-active":""}"
    >
      ${_.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,f=Je(_),y=_.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",P=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${_.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${_.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${R()} 완료 <b>${_.done.length}</b></span
      >`,Q=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${_.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${_.declared_base||"?"}</span
    >`,le=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ao}
          step="1"
          .value=${String(_.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:md},(ot,Mt)=>Mt+1).map(ot=>i`<option
                value=${String(ot)}
                ?selected=${_.serial_lane_count===ot}
              >
                ${ot}
              </option>`)}
        </select>
      </label>
      ${o?X():""} `,ye=pu({failure:_.failure}),je=Xc(_.repo_operations,_.cleanup_failures);return g?i`<div class="worker-ribbon">
          ${l} ${f}
          <div class="worker-kpi worker-kpi--ribbon">${y}${P}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${le}</div>
          <div class="worker-kpi">${Q}</div>
        </div>
        ${je}${Be.template()}${ye}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${l}${f}${le}</div>
        <div class="worker-kpi">
          ${y}${P}${Q}
          ${(Array.isArray(_.token_total)?_.token_total:_.token_total?[{label:_.token_total,tooltip:`${R()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ot=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ot.tooltip}
                >${R()} 완료 · 누적 ${ot.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${je}${Be.template()}${ye}`}function fe(_){if(_.running.length===0&&_.pr_wait.length===0)return"";let v=_.running.some(l=>!l.paused&&l.failed!==!0);return i`<section
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
          >${_.running.length+_.pr_wait.length}</span
        >
      </header>
      ${_.running.length>0?Ua(_.running,Date.now(),Ee):""}
      ${_.pr_wait.map(l=>Ma(l))}
    </section>`}function Ae(_){let v=_.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${H.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${rb.map(l=>i`<button
              type="button"
              class="worker-filter__chip${H.spec===l.value?" is-active":""}"
              data-spec=${l.value}
              aria-pressed=${H.spec===l.value?"true":"false"}
            >
              ${l.label}
            </button>`)}
        ${v.spec>0?i`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function Oe(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${J}
    >
      ${nb.map(_=>i`<option value=${_.value} ?selected=${J===_.value}>
            ${_.label}
          </option>`)}
    </select>`}function yt(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${N}
      >
        ${ur.map(_=>i`<option value=${_.value} ?selected=${N===_.value}>
              ${_.label}
            </option>`)}
      </select>
    </div>`}function vt(_){let v=i`<span
      class="worker-lane__badge${_.occupied?" worker-lane__badge--held":""}"
      >${_.badge}</span
    >`,l=_.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return ar({id:`worker-pane-lane-${_.id}`,lane:_.id,title:`\uC9C1\uB82C ${_.index}`,items:_.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:l})}function Je(_){let v=_.queue.auto_merge===!0;if(_.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${_.merge_queue_length}
      </button>`;if(v)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let l=new Set(_.auto_excluded),f=_.pr_wait.filter(y=>y.merge_action&&y.merge_enabled&&!l.has(y.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${f>0?` ${f}`:""}
    </button>`}function Ct(_){let v=ar({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Oe(),controls:Ae(_),place_menu:tt(_.candidates)});return g?i`<div class="worker-lanes worker-lanes--mobile">
        ${fe(_)}
        ${ar({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:U.queue,preview:hd(_.waiting)})}
        ${_.serial_lanes.map(l=>vt(l))}
        ${v}
        ${ar({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:yt(),collapsible:!0,collapsed:U.done,preview:Array.isArray(_.token_total)?_.token_total.map(l=>l.label).join(" \xB7 "):_.token_total||hd(_.done)})}
      </div>`:i`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${ar({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${_.serial_lanes.map(l=>vt(l))}
      </div>
      ${ar({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${_.slots}`,items:_.running,live:_.running.some(l=>!l.paused&&l.failed!==!0),body:Ua(_.running,Date.now(),Ee)})}
      ${ar({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:_.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${ar({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${R()} ${_.done.length}`,items:_.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:yt()})}
    </div>`}function ir(_){U={...U,[_]:!U[_]},ub(U),Me()}function Me(){let _=M();Ge($e(_),Ie),Ge(Ct(_),Ke)}function qt(){let _=document.querySelector(".app-header");if(!_)return;let v=()=>{let l=Math.round(_.getBoundingClientRect().height);ce.style.setProperty("--worker-ribbon-top",`${l}px`)};if(v(),typeof ResizeObserver=="function"){let l=new ResizeObserver(v);l.observe(_),He.push(()=>l.disconnect())}else window.addEventListener("resize",v),He.push(()=>window.removeEventListener("resize",v))}function mr(){if(typeof window.matchMedia!="function")return;let _=window.matchMedia(lb);g=!!_.matches;let v=l=>{let f=!!(l&&typeof l.matches=="boolean"?l.matches:_.matches);f!==g&&(g=f,Me())};typeof _.addEventListener=="function"?(_.addEventListener("change",v),He.push(()=>_.removeEventListener("change",v))):typeof _.addListener=="function"&&(_.addListener(v),He.push(()=>_.removeListener(v)))}let Ft=null;function Yt(_){Ft=_.target instanceof Element?_.target:null}function gr(_){let l=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!l)return;if(Ft&&l.contains(Ft)&&Ft.closest("input, button, a")){_.preventDefault();return}let f=l.dataset.beadId||"",y=l.dataset.lane||"";A={bead_id:f,from_lane:y};try{_.dataTransfer?.setData("text/plain",f),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function $t(_){let v=_.target?.closest?.(".worker-pane");if(!v)return;let l=v.dataset.lane||"";l!=="candidate"&&l!=="queue"&&!/^s[1-5]$/.test(l)||(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function Zt(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function lr(_,v){let l=L.find(Q=>Q.id===_);if(!l)return;let f=L.filter(Q=>Q.id!==_),y=f.length;if(v){let Q=v.dataset.beadId;if(Q===_)return;let le=f.findIndex(ye=>ye.id===Q);le>=0&&(y=le)}let P=f.slice();P.splice(y,0,l),x.applyReorder(_,P,y)}function cr(_){let v=_.target?.closest?.(".worker-pane");if(!v)return;_.preventDefault(),v.classList.remove("worker-pane--drag-over");let l=v.dataset.lane||"",f=A?.bead_id||_.dataTransfer?.getData("text/plain")||"",y=A?.from_lane||"";if(A=null,!f)return;let P=_.target?.closest?.(".worker-mini, .worker-card"),Q=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),le=Q.length;if(P){let ye=Q.indexOf(P);ye>=0&&(le=ye)}if(le=Math.max(0,le-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(le=me()),l==="candidate"){if(y==="candidate"){lr(f,P);return}(y==="queue"||/^s[1-5]$/.test(y))&&T(f);return}if(l==="queue"||/^s[1-5]$/.test(l)){let ye=l==="queue"?"parallel":l;y===l?ge(f,ye,le):Qe(f,ye)}}function Ye(_){H=_,eb(_),Me()}function zt(_){J=_==="board"||_==="created"||_==="spec"?_:So,ob(J),Me()}function xe(_){N=Gt(_)?_:jt,ib(N),m?.(N),Me()}function $(_){let v=_.target?.closest?.(".worker-serial-lane-count");if(v){let le=Number.parseInt(v.value,10);Number.isFinite(le)&&E(le).then(Me);return}let l=_.target?.closest?.(".worker-filter__blocked");if(l){Ye({...H,show_blocked:l.checked});return}let f=_.target?.closest?.(".worker-done-range");if(f){xe(f.value);return}let y=_.target?.closest?.(".worker-sort");if(y){zt(y.value||So);return}let P=_.target?.closest?.(".worker-slots__input");if(!P)return;let Q=Number.parseInt(P.value,10);if(!Number.isFinite(Q)){Me();return}k(Q).then(Me)}function ee(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function _e(){let _=M();return{operations:_.repo_operations,cleanup_failures:_.cleanup_failures,repo:d&&d()||""}}function st(){Ee&&Y.close(),qe.hidden=!1,Ce.hidden=!1,Z.open(_e()),Me()}function mt(_){let v=Fe(),l=v.attempts?v.attempts[_]:null;Ee=_,Ve=null,Z.close(),qe.hidden=!0,Ce.hidden=!1,Y.open({attempt_id:_,meta:ee(l)}),Me()}function ct(_,v){Ee=null,Ve=_,Z.close(),qe.hidden=!0,Ce.hidden=!1,Y.open({attempt_id:_,meta:v,hide_prompt:!0}),Me()}function bt(){if(Z.isOpen()&&Z.refresh(_e()),Ve){let l=(o?.get()?.runs||[]).find(f=>f.run_id===Ve);l?Y.updateMeta(ti(l)):Y.close();return}if(!Ee)return;let _=Fe(),v=_.attempts?_.attempts[Ee]:null;if(v){Y.updateMeta(ee(v));return}Y.close()}function xt(_){let v=_.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;if(v?.closest?.(".worker-analysis-btn")){Ue?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){st();return}let l=v?.closest?.(".worker-repo-op__session");if(l){let Se=l.dataset.attemptId;Se&&mt(Se);return}let f=v?.closest?.(".worker-repo-op__resolve");if(f){re(f.dataset.operationId||"");return}let y=v?.closest?.(".worker-repo-op__dismiss");if(y){pe(y.dataset.operationId||"");return}let P=v?.closest?.(".worker-cleanup__resume");if(P){let Se=P.dataset.beadId;Se&&C(Se);return}let Q=v?.closest?.(".worker-banner__resume");if(Q){let Se=Q.dataset.attemptId;Se&&I(Se);return}let le=v?.closest?.(".worker-banner__discard");if(le){let Se=le.dataset.confirmation==="merged"?"merged":"unmerged";Re(le.dataset.beadId||"",le.dataset.attemptId||null,Se,le.dataset.operationId||null);return}let ye=v?.closest?.(".worker-banner__dismiss");if(ye){let Se=ye.dataset.attemptId;Se&&G(Se);return}if(v?.closest?.(".worker-play")){W(!Fe().auto_advance);return}let je=v?.closest?.(".worker-merge-all");if(je){je.classList.contains("worker-merge-all--stop")?Fe().auto_merge===!0?ue(!1):we():ue(!0);return}let ot=v?.closest?.(".worker-pane__hd--toggle");if(ot){let Se=ot.dataset.lane;(Se==="queue"||Se==="done")&&ir(Se);return}let Mt=v?.closest?.(".worker-card__place-lane");if(Mt){let Se=Mt.dataset.beadId,ft=Mt.dataset.lane;Se&&(ft==="parallel"||/^s[1-5]$/.test(ft||""))&&(te=null,Me(),Qe(Se,ft));return}if(v?.closest?.(".worker-card__place-cancel")){te=null,Me();return}let nn=v?.closest?.(".worker-card__place");if(nn){let Se=nn.dataset.beadId;Se&&!nn.disabled&&(it()?(te=Se,Me()):Qe(Se,"parallel"));return}let is=v?.closest?.(".worker-filter__chip");if(is){let Se=is.dataset.spec;(Se==="all"||Se==="with"||Se==="without")&&Ye({...H,spec:Se});return}let Xt=v?.closest?.(".worker-mini__merge");if(Xt){let Se=Xt.dataset.beadId||"";Fe().cleanup_failed?.[Se]?C(Se):w(Se);return}let ls=v?.closest?.(".worker-mini__merge-cancel");if(ls){ae(ls.dataset.beadId||"");return}let Fr=v?.closest?.(".worker-mini__discard");if(Fr){Re(Fr.dataset.beadId||"",Fr.dataset.attemptId||null,Fr.dataset.discardMode==="merged"?"merged":"unmerged",Fr.dataset.operationId||null);return}let Er=v?.closest?.(".worker-mini__stale-continue");if(Er){We("worker-stale-work-continue",Er.dataset.beadId||"",Er.dataset.actionId||"");return}let sn=v?.closest?.(".worker-mini__stale-backup");if(sn){We("worker-stale-work-backup-fresh",sn.dataset.beadId||"",sn.dataset.actionId||"");return}let on=v?.closest?.(".worker-mini__stale-recheck");if(on){We("worker-stale-work-recheck",on.dataset.beadId||"",on.dataset.actionId||"");return}let cs=v?.closest?.(".worker-mini__revise-fix");if(cs){ze("worker-revise-fix",cs.dataset.beadId||"");return}let an=v?.closest?.(".worker-mini__revise-approve");if(an){ze("worker-revise-approve",an.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Se=v?.closest?.(".rtile"),ft=Se?.dataset?.beadId,cn=Se?.dataset?.attemptId;ft&&Re(ft,cn||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let ft=v?.closest?.(".rtile")?.dataset?.attemptId;ft&&G(ft);return}if(v?.closest?.(".rtile__pause")){let ft=v?.closest?.(".rtile")?.dataset?.attemptId;ft&&O(ft);return}if(v?.closest?.(".rtile__resume")){let ft=v?.closest?.(".rtile")?.dataset?.attemptId;ft&&I(ft);return}if(v?.closest?.(".rtile__session")){let ft=v?.closest?.(".rtile")?.dataset?.attemptId;ft&&mt(ft);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){Z.close(),Y.close();return}if(v?.closest?.(".worker-drawer-host"))return;let jr=v?.closest?.(".rtile .board-card__roll-toggle");if(jr){let Se=jr.dataset.rollParent;Se&&(j.has(Se)?j.delete(Se):j.add(Se),Me());return}let Br=v?.closest?.(".rtile .board-card__roll-child");if(Br){let Se=Br.dataset.childId;Se&&u&&u(Se);return}let ln=v?.closest?.(".rtile");if(ln){if(v?.closest?.(".rtile__id")){let ft=ln.dataset.beadId;ft&&tr(ft).then(cn=>{cn?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Se=ln.dataset.beadId;Se&&u&&u(Se);return}let us=v?.closest?.(".worker-mini, .worker-card");if(us){let Se=us.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Se&&tr(Se).then(ft=>{ft?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Se&&u&&u(Se)}}return e.addEventListener("pointerdown",Yt),e.addEventListener("dragstart",gr),e.addEventListener("dragover",$t),e.addEventListener("dragleave",Zt),e.addEventListener("drop",cr),e.addEventListener("click",xt),e.addEventListener("change",$),mr(),qt(),b&&He.push(b.subscribe(()=>{for(let[_,v]of q)v==="failed"&&q.delete(_);Me()})),s&&He.push(s.subscribe(()=>{let _=d&&d()||"";_!==Le&&(Le=_,he.close()),Me(),bt()})),o&&typeof o.subscribe=="function"&&He.push(o.subscribe(()=>{bt(),Me()})),Me(),{load(){Pe(),Me()},refreshSessionDefaults:Xe,destroy(){for(let _ of He.splice(0))try{_()}catch{}e.removeEventListener("pointerdown",Yt),e.removeEventListener("dragstart",gr),e.removeEventListener("dragover",$t),e.removeEventListener("dragleave",Zt),e.removeEventListener("drop",cr),e.removeEventListener("click",xt),e.removeEventListener("change",$);try{Y.destroy()}catch{}Ce.hidden=!0;try{Ue?.destroy()}catch{}try{he.destroy()}catch{}Ge(i``,e)}}}function oi(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Ad(e,t,r,n=async()=>{},s=async()=>{}){let o=pt("views:workspace-picker"),a=null,c=!1,u=!1,d=!1;async function p(U){let S=U.target.value,oe=t.getState().workspace?.current?.path||"";if(S&&S!==oe){o("switching workspace to %s",S),c=!0,R();try{await r(S)}catch(D){o("workspace switch failed: %o",D)}finally{c=!1,R()}}}async function m(){let U=t.getState(),g=U.workspace?.current?.path||U.workspace?.available?.[0]?.path||"";if(!(!g||u)){o("git-pulling workspace %s",g),u=!0,R();try{await n(g)}catch(S){o("workspace git pull failed: %o",S)}finally{u=!1,R()}}}function b(U){let g=U.target;g&&e.contains(g)||L()}function x(U){U.key==="Escape"&&L()}function A(){d||(d=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",x),R())}function L(){d&&(d=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),R())}function H(){d?L():A()}async function te(U){let g=U.target,S=g.value,V=g.checked;o("toggling visibility %s \u2192 %s",S,String(V));try{await s(S,V)}catch(oe){o("workspace visibility toggle failed: %o",oe)}}function J(U){return U?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${c||u}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function N(U,g){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${H}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${U.map(S=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${S.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${S.path}"
                        .checked=${!g.has(S.path)}
                        @change=${te}
                      />
                      <span class="workspace-picker__manage-name"
                        >${oi(S.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let U=t.getState(),g=U.workspace?.current,S=U.workspace?.available||[],V=new Set(U.workspace?.hidden||[]),oe=g?.path||S[0]?.path||"";if(S.length===0)return i``;let D=S.filter(j=>!V.has(j.path)||j.path===oe);if(D.length<=1){let j=D[0]||S[0],de=oi(j.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${j.path}"
            >${de}</span
          >
          ${N(S,V)}
          ${J(oe)}
          ${u?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${c||u}
          aria-label="Select project workspace"
        >
          ${D.map(j=>i`
              <option
                value="${j.path}"
                ?selected=${j.path===oe}
                title="${j.path}"
              >
                ${oi(j.path)}
              </option>
            `)}
        </select>
        ${N(S,V)}
        ${J(oe)}
        ${c||u?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){Ge(q(),e)}return R(),a=t.subscribe(()=>R()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),Ge(i``,e)}}}var Sd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function ai(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ed(e,t,r=ai()){return{id:r,type:e,payload:t}}function Td(e={}){let t=pt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,u=!0,d=new Map,p=[],m=new Map,b=new Set;function x(q){for(let R of Array.from(b))try{R(q)}catch{}}function A(){if(!u||c)return;o="reconnecting",t("ws reconnecting\u2026"),x(o);let q=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),R=(r.jitterRatio||0)*q,U=Math.max(0,Math.round(q+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",U,a+1),c=setTimeout(()=>{c=null,N()},U)}function L(q){try{s?.send(JSON.stringify(q))}catch(R){t("ws send failed",R)}}function H(){for(o="open",t("ws open"),x(o),a=0;p.length;){let q=p.shift();q&&L(q)}}function te(q){let R;try{R=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(d.has(R.id)){let g=d.get(R.id);d.delete(R.id),R.ok?g?.resolve(R.payload):g?.reject(R.error||new Error("ws error"));return}let U=m.get(R.type);if(U&&U.size>0)for(let g of Array.from(U))try{g(R.payload)}catch(S){t("ws event handler error",S)}else t("ws received unhandled message type: %s",R.type)}function J(){o="closed",t("ws closed"),x(o);for(let[q,R]of d.entries())R.reject(new Error("ws disconnected")),d.delete(q);a+=1,A()}function N(){if(!u)return;let q=n();try{s=new WebSocket(q),t("ws connecting %s",q),o="connecting",x(o),s.addEventListener("open",H),s.addEventListener("message",te),s.addEventListener("error",()=>{}),s.addEventListener("close",J)}catch(R){t("ws connect failed %o",R),A()}}return N(),{send(q,R){if(!Sd.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let U=ai(),g=Ed(q,R,U);return t("send %s id=%s",q,U),new Promise((S,V)=>{d.set(U,{resolve:S,reject:V,type:q}),s&&s.readyState===s.OPEN?L(g):(t("queue %s id=%s (state=%s)",q,U,o),p.push(g))})},on(q,R){m.has(q)||m.set(q,new Set);let U=m.get(q);return U?.add(R),()=>{U?.delete(R)}},onConnection(q){return b.add(q),()=>{b.delete(q)}},reconnect(){u=!0,c&&(clearTimeout(c),c=null),a=0,N()},close(){u=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function wb(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function kb(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var ii=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Cd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Nr="tab:worker:closed",$b="bdui.worker.done-range",Rd=Iu,Id="worker:queue",Ld="worker:parallel-analysis",Od="ui:order",Md="ui:display-policy",Pd="exec:presets",qr="tab:board:closed",Dd="beads-ui.board.closed-range";function xb(e){let t=pt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ge(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),c=document.getElementById("board-root"),u=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),p=document.getElementById("detail-panel");if(a&&Zu(a),c&&u&&d&&p){let Xe=function(l,f){let y="Request failed",P="";if(l&&typeof l=="object"){let le=l;if(typeof le.message=="string"&&le.message.length>0&&(y=le.message),typeof le.details=="string")P=le.details;else if(le.details&&typeof le.details=="object")try{P=JSON.stringify(le.details,null,2)}catch{P=""}}else typeof l=="string"&&l.length>0&&(y=l);let Q=f&&f.length>0?`Failed to load ${f}`:"Request failed";Pe.open(Q,y,P)},K=function(l){return`${Ye.getState().workspace.current?.path||""}\0${l}`},me=function(){he&&(he().catch(()=>{}),he=null),Le=null,Be=null},ge=function(l){Ue=l;let f=()=>{Ue!==l||Ye.getState().selected_id!==l||(Ue=null,Qe(l))};if(!tt){it.then(f);return}f()},G=function(l,f,y,P,Q){return y!==I[f]?(Q().catch(()=>{}),!1):(l.set(P,Q),!0)},w=function(){let l=Ye.getState();we(l.view==="board"),pe(l.view==="worker"),$e(l.view==="monitor"),E(l.view==="board"||l.view==="worker"||se||!!l.selected_id)},ue=function(){let l=Vr(C);return l===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:l}}},ae=function(){let l=Vr(F);return l===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:l}}},we=function(l){if(l)for(let[f,y]of ii){if(T.has(f)||O.has(f))continue;let P=f===qr?ue():{type:y};try{Ne.register(f,P)}catch(ye){t("register %s store failed: %o",f,ye)}O.add(f);let Q=I.board,le=!1;Ce.subscribeList(f,P).then(ye=>{le=!G(T,"board",Q,f,ye)}).catch(ye=>{t("subscribe %s failed: %o",f,ye),Xe(ye,"board")}).finally(()=>{O.delete(f),le&&w()})}else ze()},ze=function(){I.board+=1;for(let[l]of ii){let f=T.get(l);f&&(f().catch(()=>{}),T.delete(l));try{Ne.unregister(l)}catch(y){t("unregister %s failed: %o",l,y)}}},pe=function(l){if(!l){k();return}for(let[f,y]of Cd){if(W.has(f)||O.has(f))continue;let P=f===Nr?ae():{type:y};try{Ne.register(f,P)}catch(ye){t("register %s store failed: %o",f,ye)}O.add(f);let Q=I.worker,le=!1;Ce.subscribeList(f,P).then(ye=>{le=!G(W,"worker",Q,f,ye)}).catch(ye=>{t("subscribe %s failed: %o",f,ye),Xe(ye,"worker")}).finally(()=>{O.delete(f),le&&w()})}},k=function(){I.worker+=1;for(let[l]of Cd){let f=W.get(l);f&&(f().catch(()=>{}),W.delete(l));try{Ne.unregister(l)}catch(y){t("unregister %s failed: %o",l,y)}}},E=function(l){if(!l){M();return}re||(Ie("subscribe-worker-queue",{id:Id}).catch(f=>{t("subscribe-worker-queue failed: %o",f)}),Ie("subscribe-worker-parallel-analysis",{id:Ld}).catch(f=>{t("subscribe-worker-parallel-analysis failed: %o",f)}),re=()=>(Ie("unsubscribe-worker-parallel-analysis",{id:Ld}),Ie("unsubscribe-worker-queue",{id:Id})))},M=function(){re&&(re().catch(()=>{}),re=null),qe.clear()},$e=function(l){if(!l){fe();return}X||(Ie("subscribe-monitor-pipeline",{id:Rd}).catch(f=>{t("subscribe-monitor-pipeline failed: %o",f)}),X=()=>Ie("unsubscribe-monitor-pipeline",{id:Rd}))},fe=function(){X&&(X().catch(()=>{}),X=null)},Oe=function(){Ae||(Ie("subscribe-ui-order",{id:Od}).catch(l=>{t("subscribe-ui-order failed: %o",l)}),Ae=()=>Ie("unsubscribe-ui-order",{id:Od}))},yt=function(){Ae&&(Ae().catch(()=>{}),Ae=null),Ee.clear()},Je=function(){vt||(Ie("subscribe-display-policy",{id:Md}).catch(l=>{t("subscribe-display-policy failed: %o",l)}),vt=()=>Ie("unsubscribe-display-policy",{id:Md}))},Ct=function(){vt&&(vt().catch(()=>{}),vt=null),Ve.clear()},Me=function(){ir||(Ie("subscribe-impl-presets",{id:Pd}).catch(l=>{t("subscribe-impl-presets failed: %o",l)}),ir=()=>Ie("unsubscribe-impl-presets",{id:Pd}))},$t=function(l){if(!l)return"Unknown";let f=l.split("/").filter(Boolean);return f.length>0?f[f.length-1]:"Unknown"};var m=Xe,b=K,x=me,A=ge,L=G,H=w,te=ue,J=ae,N=we,q=ze,R=pe,U=k,g=E,S=M,V=$e,oe=fe,D=Oe,j=yt,de=Je,be=Ct,ve=Me,Te=$t;let He=document.getElementById("header-loading"),rt=hl(He),Pe=Yc(e),ce=Td(),Ie=rt.wrapSend((l,f)=>ce.send(l,f)),Ce=ul(Ie),Ne=dl(),ke=_l(),qe=fl(),Ke=Yi(),Ee=pl(),Ve=Vi(),Y=Ki(),Z=Zi();ce.on("impl-presets-snapshot",l=>{let f=l;f&&typeof f.revision=="number"&&Array.isArray(f.presets)&&Y.set({revision:f.revision,presets:f.presets})}),ce.on("monitor-pipeline-snapshot",l=>{let f=l;if(!(!f||!Array.isArray(f.workspaces)))try{Ke.set(f.workspaces,f.workspaces_state)}catch{}}),ce.on("ui-order-snapshot",l=>{let f=l;if(f&&typeof f.revision=="number")try{Ee.set({revision:f.revision,order:f.order&&typeof f.order=="object"?f.order:{}})}catch{}}),ce.on("display-policy-snapshot",l=>{let f=l;if(f&&f.policy&&typeof f.policy=="object")try{Ve.set(f.policy)}catch{}}),ce.on("session-log-snapshot",l=>{let f=l;if(f&&typeof f.id=="string")try{Z.set(f.id,Array.isArray(f.lines)?f.lines:[],typeof f.last_event_at=="number"?f.last_event_at:null)}catch{}}),ce.on("session-log-append",l=>{let f=l;if(f&&typeof f.id=="string")try{Z.append(f.id,f.event)}catch{}}),ce.on("snapshot",l=>{let f=l,y=f&&typeof f.id=="string"?f.id:"",P=y?Ne.getStore(y):null;if(P&&f&&f.type==="snapshot")try{P.applyPush(f)}catch{}}),ce.on("upsert",l=>{let f=l,y=f&&typeof f.id=="string"?f.id:"",P=y?Ne.getStore(y):null;if(P&&f&&f.type==="upsert")try{P.applyPush(f)}catch{}}),ce.on("delete",l=>{let f=l,y=f&&typeof f.id=="string"?f.id:"",P=y?Ne.getStore(y):null;if(P&&f&&f.type==="delete")try{P.applyPush(f)}catch{}});let he=null,Le=null,Be=null,Ue=null,Fe=()=>{},it=new Promise(l=>{Fe=()=>l(void 0)}),tt=!1,z=!1;async function Qe(l){let f=K(l);if(f===Le||f===Be)return;Be=f;let y=`detail:${l}`,P={type:"issue-detail",params:{id:l}};try{Ne.register(y,P)}catch(Q){t("register detail store failed: %o",Q)}try{let Q=await Ce.subscribeList(y,P);if(Ye.getState().selected_id!==l||K(l)!==f){await Q().catch(()=>{});return}he&&await he().catch(()=>{}),he=Q,Le=f}catch(Q){t("detail subscribe failed: %o",Q),Xe(Q,"issue details")}finally{Be===f&&(Be=null)}}let T=new Map,O=new Set,I={board:0,worker:0},se=!1,C=jt;try{let l=window.localStorage.getItem(Dd);Gt(l)&&(C=l)}catch{}let F=jt;try{let l=window.localStorage.getItem($b);Gt(l)&&(F=l)}catch{}async function Re(l){if(!Gt(l)||l===C)return;C=l;try{window.localStorage.setItem(Dd,l)}catch{}let f=T.get(qr);if(!f)return;T.delete(qr),await f().catch(()=>{});let y=ue();try{Ne.register(qr,y)}catch(P){t("register %s store failed: %o",qr,P)}try{let P=await Ce.subscribeList(qr,y);T.set(qr,P)}catch(P){t("re-subscribe %s failed: %o",qr,P),Xe(P,"board")}}async function We(l){if(!Gt(l)||l===F)return;F=l;let f=W.get(Nr);if(!f)return;W.delete(Nr),await f().catch(()=>{});let y=ae();try{Ne.register(Nr,y)}catch(P){t("register %s store failed: %o",Nr,P)}try{let P=await Ce.subscribeList(Nr,y);W.set(Nr,P)}catch(P){t("re-subscribe %s failed: %o",Nr,P),Xe(P,"worker")}}let W=new Map,re=null,X=null,Ae=null,vt=null,ir=null;async function qt(){vt=null,Ve.clear(),ir=null,Y.clear(),re=null,X=null,T.clear(),W.clear(),I.board+=1,I.worker+=1,Me();let l=Ye.getState().workspace.current?.path;if(l)try{await ce.send("set-workspace",{path:l})}catch(y){t("workspace restore after reconnect failed: %o",y);return}Je();let f=Ye.getState();we(f.view==="board"),pe(f.view==="worker"),$e(f.view==="monitor"),E(f.view==="board"||f.view==="worker"||!!f.selected_id)}async function mr(){t("clearing all subscriptions for workspace switch"),ze(),k(),M(),ke.clear(),yt(),Oe(),Ct(),Je(),me();let l=Ye.getState();if(l.selected_id)try{Ne.unregister(`detail:${l.selected_id}`)}catch{}let f=Ye.getState();we(f.view==="board"),pe(f.view==="worker"),$e(f.view==="monitor"),E(f.view==="board"||f.view==="worker"||!!f.selected_id),f.selected_id&&ge(f.selected_id)}async function Ft(l){t("requesting workspace switch to %s",l),z=!0;try{let f=await ce.send("set-workspace",{path:l});t("workspace switch result: %o",f),f&&f.workspace&&(Ye.setState({workspace:{current:{path:f.workspace.root_dir,database:f.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",l),f.changed&&(await mr(),ie("Switched to "+$t(l),"success",2e3)))}catch(f){throw t("workspace switch failed: %o",f),ie("Failed to switch workspace","error",3e3),f}finally{z=!1}}async function Yt(l){t("requesting workspace git pull for %s",l);try{let f=await ce.send("git-pull-workspace",{});t("workspace git pull result: %o",f);let y=f?.status;if(y==="up_to_date"){ie("Already up to date","success",2e3);return}if(y==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+$t(l),"success",2e3)}catch(f){t("workspace git pull failed: %o",f);let y=f?.code,P=f?.message;if(y==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(y==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(y==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let Q=P?`: ${P}`:"";throw ie(`Git pull failed${Q}`,"error",3e3),f}}async function gr(l,f){t("setting workspace visibility %s \u2192 %s",l,String(f));try{await ce.send("set-workspace-visibility",{path:l,visible:f}),await Zt()}catch(y){t("workspace visibility update failed: %o",y),ie("Failed to update project visibility","error",3e3)}}async function Zt(){try{let l=await ce.send("list-workspaces",{});if(t("workspaces loaded: %o",l),l&&Array.isArray(l.workspaces)){let f=l.workspaces.map(le=>({path:le.path,database:le.database,pid:le.pid,version:le.version})),y=l.current?{path:l.current.root_dir,database:l.current.db_path}:null,P=Array.isArray(l.hidden)?l.hidden.filter(le=>typeof le=="string"):[];Ye.setState({workspace:{current:y,available:f,hidden:P}});let Q=window.localStorage.getItem("beads-ui.workspace");Q&&(!f.some(ye=>ye.path===Q)||P.includes(Q)?window.localStorage.removeItem("beads-ui.workspace"):y&&Q!==y.path&&(t("restoring saved workspace preference: %s",Q),await Ft(Q)))}}catch(l){t("failed to load workspaces: %o",l)}}ce.on("workspace-changed",l=>{t("workspace-changed event: %o",l),l&&l.root_dir&&(Ye.setState({workspace:{current:{path:l.root_dir,database:l.db_path}}}),Zt(),mr())});let lr=!1;if(typeof ce.onConnection=="function"){let l=f=>{t("ws state %s",f),f==="reconnecting"||f==="closed"?(lr=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):f==="open"&&lr&&(lr=!1,ie("Reconnected","success",2200),kb(Ye,(y,P)=>{t(`${y}: %o`,P)}),qt())};ce.onConnection(l)}let cr="board";try{let l=window.localStorage.getItem("beads-ui.view");(l==="board"||l==="worker"||l==="monitor")&&(cr=l)}catch(l){t("view parse error: %o",l)}let Ye=bl({config:wb(),view:cr});ce.on("worker-queue-snapshot",l=>{let f=l;if(!f||!f.queue)return;let y=Ye.getState().workspace.current?.path;if(typeof y=="string"&&y.length>0&&f.root_dir!==y){t("dropping worker-queue snapshot for %s",String(f.root_dir));return}try{ke.set(f.queue)}catch{}}),ce.on("worker-parallel-analysis-snapshot",l=>{let f=l;if(!f)return;let y=Ye.getState().workspace.current?.path;if(!(typeof y=="string"&&y.length>0&&typeof f.root_dir=="string"&&f.root_dir!==y))try{qe.set({settings:f.settings,job:f.job??null,runs:Array.isArray(f.runs)?f.runs:[],last_good:f.last_good??null})}catch{}});let zt=ml(Ye);zt.start();let xe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),$=async(l,f)=>{try{return await Ie(l,f)}catch(y){if(xe.has(l))throw y;return[]}};Ou({global_element:n,repo_element:s},Ye,zt);let ee=document.getElementById("workspace-picker");ee&&Ad(ee,Ye,Ft,Yt,gr);let _e=Nu(e,(l,f)=>Ie(l,f));try{let l=document.getElementById("new-issue-btn");l&&l.addEventListener("click",()=>_e.open())}catch{}let st=Bu(e,{policyStore:Ve,queueStore:ke,implPresetStore:Y,transport:(l,f)=>Ie(l,f),onOpenChange:l=>{se=l,w(),l===!1&&ct.refreshSessionDefaults()},labelOptions:()=>{let l=new Set;for(let[f]of ii)for(let y of Ne.snapshotFor(f)||[]){let P=y.labels;if(Array.isArray(P))for(let Q of P)typeof Q=="string"&&Q.length>0&&l.add(Q)}return Array.from(l).sort()}});try{let l=document.getElementById("display-settings-btn");l&&(l.setAttribute("aria-label","\uC124\uC815"),l.setAttribute("title","\uC124\uC815"),l.addEventListener("click",()=>st.open()))}catch{}let mt=Rl(c,{gotoIssue:l=>zt.gotoIssue(l),issueStores:Ne,transport:$,workerQueueStore:ke,uiOrderStore:Ee,displayPolicyStore:Ve,closedRange:C,onClosedRangeChange:l=>{Re(l)},onNewIssue:()=>_e.open()}),ct=si(u,{transport:$,issueStores:Ne,queueStore:ke,analysisStore:qe,sessionLogStore:Z,uiOrderStore:Ee,gotoIssue:l=>Ye.setState({selected_id:l}),getWorkspacePath:()=>Ye.getState().workspace.current?.path,doneRange:F,onDoneRangeChange:l=>{We(l)}}),bt=Lu(d,{transport:$,pipelineStore:Ke,execPresetStore:Y,gotoIssue:l=>zt.gotoIssue(l),getWorkspacePath:()=>Ye.getState().workspace.current?.path,switchWorkspace:l=>Ft(l)}),xt=Kc(p,{issueStores:Ne,transport:$,queueStore:ke,execPresetStore:Y,sessionLogStore:Z,getWorkspacePath:()=>Ye.getState().workspace.current?.path,onNavigate:l=>{Ye.getState().view==="worker"?Ye.setState({selected_id:l}):zt.gotoIssue(l)},onClose:()=>{let l=Ye.getState();Ye.setState({selected_id:null});try{zt.gotoView(l.view==="worker"||l.view==="monitor"?l.view:"board")}catch{}},onOpenExecPresets:()=>{st.open("execution")}}),_=Ye.getState().selected_id;_&&(p.hidden=!1,xt.load(_),ge(_)),Ye.subscribe(l=>{let f=l.selected_id;f?(p.hidden=!1,xt.load(f),z||ge(f)):(xt.clear(),p.hidden=!0,me())});let v=l=>{c.hidden=l.view!=="board",u.hidden=l.view!=="worker",d.hidden=l.view!=="monitor",o&&o.classList.toggle("is-quiet",l.view==="monitor"),we(l.view==="board"),pe(l.view==="worker"),$e(l.view==="monitor"),E(l.view==="board"||l.view==="worker"||se||!!l.selected_id),!l.selected_id&&l.view==="board"&&mt.load(),l.view==="worker"&&ct.load(),l.view==="monitor"?bt.load():bt.pause(),window.localStorage.setItem("beads-ui.view",l.view)};Ye.subscribe(v),v(Ye.getState()),Oe(),Je(),Me(),Zt().finally(()=>{tt=!0,Fe()}),window.addEventListener("keydown",l=>{let f=l.ctrlKey||l.metaKey,y=String(l.key||"").toLowerCase(),P=l.target,Q=P&&P.tagName?String(P.tagName).toLowerCase():"",le=Q==="input"||Q==="textarea"||Q==="select"||P&&typeof P.isContentEditable=="boolean"&&P.isContentEditable;f&&y==="n"&&(le||(l.preventDefault(),_e.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&xb(t)});export{xb as bootstrap,wb as readBootstrapConfig,kb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
