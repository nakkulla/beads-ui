var Xd=Object.create;var co=Object.defineProperty;var Qd=Object.getOwnPropertyDescriptor;var Jd=Object.getOwnPropertyNames;var eu=Object.getPrototypeOf,tu=Object.prototype.hasOwnProperty;var ru=(e,t,r)=>t in e?co(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var uo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var nu=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Jd(t))!tu.call(e,s)&&s!==r&&co(e,s,{get:()=>t[s],enumerable:!(n=Qd(t,s))||n.enumerable});return e};var su=(e,t,r)=>(r=e!=null?Xd(eu(e)):{},nu(t||!e||!e.__esModule?co(r,"default",{value:e,enumerable:!0}):r,e));var it=(e,t,r)=>ru(e,typeof t!="symbol"?t+"":t,r);var bi=uo((rg,gi)=>{var Vr=1e3,Yr=Vr*60,Kr=Yr*60,Mr=Kr*24,iu=Mr*7,lu=Mr*365.25;gi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return cu(e);if(r==="number"&&isFinite(e))return t.long?uu(e):du(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function cu(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*lu;case"weeks":case"week":case"w":return r*iu;case"days":case"day":case"d":return r*Mr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Kr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Yr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Vr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function du(e){var t=Math.abs(e);return t>=Mr?Math.round(e/Mr)+"d":t>=Kr?Math.round(e/Kr)+"h":t>=Yr?Math.round(e/Yr)+"m":t>=Vr?Math.round(e/Vr)+"s":e+"ms"}function uu(e){var t=Math.abs(e);return t>=Mr?ns(e,t,Mr,"day"):t>=Kr?ns(e,t,Kr,"hour"):t>=Yr?ns(e,t,Yr,"minute"):t>=Vr?ns(e,t,Vr,"second"):e+" ms"}function ns(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var yi=uo((ng,hi)=>{function pu(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=bi(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let g=0;g<p.length;g++)f=(f<<5)-f+p.charCodeAt(g),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,g=null,A,$;function q(...F){if(!q.enabled)return;let R=q,j=Number(new Date),Z=j-(f||j);R.diff=Z,R.prev=f,R.curr=j,f=j,F[0]=r.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let C=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(L,U)=>{if(L==="%%")return"%";C++;let Q=r.formatters[U];if(typeof Q=="function"){let pe=F[C];L=Q.call(R,pe),F.splice(C,1),C--}return L}),r.formatArgs.call(R,F),(R.log||r.log).apply(R,F)}return q.namespace=p,q.useColors=r.useColors(),q.color=r.selectColor(p),q.extend=n,q.destroy=r.destroy,Object.defineProperty(q,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(A!==r.namespaces&&(A=r.namespaces,$=r.enabled(p)),$),set:F=>{g=F}}),typeof r.init=="function"&&r.init(q),q}function n(p,f){let g=r(this.namespace+(typeof f>"u"?":":f)+p);return g.log=this.log,g}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of f)g[0]==="-"?r.skips.push(g.slice(1)):r.names.push(g)}function o(p,f){let g=0,A=0,$=-1,q=0;for(;g<p.length;)if(A<f.length&&(f[A]===p[g]||f[A]==="*"))f[A]==="*"?($=A,q=g,A++):(g++,A++);else if($!==-1)A=$+1,q++,g=q;else return!1;for(;A<f.length&&f[A]==="*";)A++;return A===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function i(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}hi.exports=pu});var vi=uo((Pt,ss)=>{Pt.formatArgs=_u;Pt.save=mu;Pt.load=gu;Pt.useColors=fu;Pt.storage=bu();Pt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Pt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function fu(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function _u(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ss.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Pt.log=console.debug||console.log||(()=>{});function mu(e){try{e?Pt.storage.setItem("debug",e):Pt.storage.removeItem("debug")}catch{}}function gu(){let e;try{e=Pt.storage.getItem("debug")||Pt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function bu(){try{return localStorage}catch{}}ss.exports=yi()(Pt);var{formatters:hu}=ss.exports;hu.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var un=globalThis,Xn=un.trustedTypes,ti=Xn?Xn.createPolicy("lit-html",{createHTML:e=>e}):void 0,fo="$lit$",fr=`lit$${Math.random().toFixed(9).slice(2)}$`,_o="?"+fr,ou=`<${_o}>`,Lr=document,pn=()=>Lr.createComment(""),fn=e=>e===null||typeof e!="object"&&typeof e!="function",mo=Array.isArray,ii=e=>mo(e)||typeof e?.[Symbol.iterator]=="function",po=`[ 	
\f\r]`,dn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ri=/-->/g,ni=/>/g,Rr=RegExp(`>|${po}(?:([^\\s"'>=/]+)(${po}*=${po}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),si=/'/g,oi=/"/g,li=/^(?:script|style|textarea|title)$/i,go=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=go(1),kr=go(2),Km=go(3),Ut=Symbol.for("lit-noChange"),_t=Symbol.for("lit-nothing"),ai=new WeakMap,Ir=Lr.createTreeWalker(Lr,129);function ci(e,t){if(!mo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ti!==void 0?ti.createHTML(t):t}var di=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=dn;for(let i=0;i<r;i++){let l=e[i],d,p,f=-1,g=0;for(;g<l.length&&(a.lastIndex=g,p=a.exec(l),p!==null);)g=a.lastIndex,a===dn?p[1]==="!--"?a=ri:p[1]!==void 0?a=ni:p[2]!==void 0?(li.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Rr):p[3]!==void 0&&(a=Rr):a===Rr?p[0]===">"?(a=s??dn,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?Rr:p[3]==='"'?oi:si):a===oi||a===si?a=Rr:a===ri||a===ni?a=dn:(a=Rr,s=void 0);let A=a===Rr&&e[i+1].startsWith("/>")?" ":"";o+=a===dn?l+ou:f>=0?(n.push(d),l.slice(0,f)+fo+l.slice(f)+fr+A):l+fr+(f===-2?i:A)}return[ci(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},_n=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[d,p]=di(t,r);if(this.el=e.createElement(d,n),Ir.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Ir.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(fo)){let g=p[a++],A=s.getAttribute(f).split(fr),$=/([.?@])?(.*)/.exec(g);l.push({type:1,index:o,name:$[2],strings:A,ctor:$[1]==="."?Jn:$[1]==="?"?es:$[1]==="@"?ts:Pr}),s.removeAttribute(f)}else f.startsWith(fr)&&(l.push({type:6,index:o}),s.removeAttribute(f));if(li.test(s.tagName)){let f=s.textContent.split(fr),g=f.length-1;if(g>0){s.textContent=Xn?Xn.emptyScript:"";for(let A=0;A<g;A++)s.append(f[A],pn()),Ir.nextNode(),l.push({type:2,index:++o});s.append(f[g],pn())}}}else if(s.nodeType===8)if(s.data===_o)l.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(fr,f+1))!==-1;)l.push({type:7,index:o}),f+=fr.length-1}o++}}static createElement(t,r){let n=Lr.createElement("template");return n.innerHTML=t,n}};function Or(e,t,r=e,n){if(t===Ut)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=fn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Or(e,s._$AS(e,t.values),s,n)),t}var Qn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Lr).importNode(r,!0);Ir.currentNode=s;let o=Ir.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Gr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new rs(o,this,t)),this._$AV.push(d),l=n[++i]}a!==l?.index&&(o=Ir.nextNode(),a++)}return Ir.currentNode=Lr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Gr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=_t,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Or(this,t,r),fn(t)?t===_t||t==null||t===""?(this._$AH!==_t&&this._$AR(),this._$AH=_t):t!==this._$AH&&t!==Ut&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ii(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==_t&&fn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Lr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=_n.createElement(ci(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Qn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=ai.get(t.strings);return r===void 0&&ai.set(t.strings,r=new _n(t)),r}k(t){mo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(pn()),this.O(pn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Pr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=_t,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=_t}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Or(this,t,r,0),a=!fn(t)||t!==this._$AH&&t!==Ut,a&&(this._$AH=t);else{let i=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=Or(this,i[n+l],r,l),d===Ut&&(d=this._$AH[l]),a||(a=!fn(d)||d!==this._$AH[l]),d===_t?t=_t:t!==_t&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===_t?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Jn=class extends Pr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_t?void 0:t}},es=class extends Pr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_t)}},ts=class extends Pr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Or(this,t,r,0)??_t)===Ut)return;let n=this._$AH,s=t===_t&&n!==_t||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==_t&&(n===_t||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Or(this,t)}},ui={M:fo,P:fr,A:_o,C:1,L:di,R:Qn,D:ii,V:Or,I:Gr,H:Pr,N:es,U:ts,B:Jn,F:rs},au=un.litHtmlPolyfillSupport;au?.(_n,Gr),(un.litHtmlVersions??(un.litHtmlVersions=[])).push("3.3.1");var Be=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Gr(t.insertBefore(pn(),o),o,void 0,r??{})}return s._$AI(e),s};var Mt="today",or=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Wt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Dr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function pi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function fi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function _i(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function mi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var wi=su(vi(),1);function ft(e){return(0,wi.default)(`beads-ui:${e}`)}function Kt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Nr(e,t){let r=Kt(e.created_at),n=Kt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function xi(e,t){let r=Kt(e.created_at),n=Kt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Si(e,t){let r=Kt(e.updated_at),n=Kt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ai(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Kt(e.created_at),o=Kt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ei(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var yu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ki(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function $i(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=yu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ti(e,t){let r=ki(e),n=ki(t);if(r!==n)return r<n?-1:1;let s=$i(e),o=$i(t);if(s!==o)return s<o?-1:1;let a=Kt(e&&e.created_at),i=Kt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var bo=2**20;function Zr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Kt(e&&e.created_at)}function os(e){return(t,r)=>{let n=Zr(t,e),s=Zr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function ho(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Zr(i,r)-bo};if(!i)return{rank:Zr(a,r)+bo};let l=Zr(a,r),d=Zr(i,r),p=(l+d)/2;return l<p&&p<d?{rank:p}:{renormalize:n.map((f,g)=>({bead_id:f.id,rank:g*bo}))}}function yo(e,t={}){let r=ft(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Nr;function d(){for(let g of Array.from(a))try{g()}catch{}}function p(){s=Array.from(n.values()).sort(l)}function f(g){if(i||!g||g.id!==e)return;let A=Number(g.revision)||0;if(r("apply %s rev=%d",g.type,A),!(A<=o&&g.type!=="snapshot")){if(g.type==="snapshot"){if(A<=o)return;n.clear();let $=Array.isArray(g.issues)?g.issues:[];for(let q of $)q&&typeof q.id=="string"&&q.id.length>0&&n.set(q.id,q);p(),o=A,d();return}if(g.type==="upsert"){let $=g.issue;if($&&typeof $.id=="string"&&$.id.length>0){let q=n.get($.id);if(!q)n.set($.id,$);else{let F=Number.isFinite(q.updated_at)?q.updated_at:0,R=Number.isFinite($.updated_at)?$.updated_at:0;if(F<=R){for(let j of Object.keys(q))j in $||delete q[j];for(let[j,Z]of Object.entries($))q[j]=Z}}p()}o=A,d()}else if(g.type==="delete"){let $=String(g.issue_id||"");$&&(n.delete($),p()),o=A,d()}}}return{id:e,subscribe(g){return a.add(g),()=>{a.delete(g)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(g){return n.get(g)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function as(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ci(e){let t=ft("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let p=Array.isArray(l.added)?l.added:[],f=Array.isArray(l.updated)?l.updated:[],g=Array.isArray(l.removed)?l.removed:[];for(let A of Array.from(d)){let $=r.get(A);if(!$)continue;let q=$.itemsById;for(let F of p)typeof F=="string"&&F.length>0&&q.set(F,!0);for(let F of f)typeof F=="string"&&F.length>0&&q.set(F,!0);for(let F of g)typeof F=="string"&&F.length>0&&q.delete(F)}}async function o(i,l){let d=as(l);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==d){let g=n.get(f.key);g&&(g.delete(i),g.size===0&&n.delete(f.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(f){let g=r.get(i)||null;if(g){let A=n.get(g.key);A&&(A.delete(i),A.size===0&&n.delete(g.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let g=n.get(f.key);g&&(g.delete(i),g.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:as,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let d=r.get(i);return d?d.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),d={};if(!l)return d;for(let p of l.itemsById.keys())d[p]=!0;return d}}}}function Ri(){let e=ft("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,p){let f=d?as(d):"",g=r.get(l)||"",A=t.has(l);if(e("register %s key=%s (prev=%s)",l,f,g),A&&g&&f&&g!==f){let $=t.get(l);if($)try{$.dispose()}catch{}let q=s.get(l);if(q){try{q()}catch{}s.delete(l)}let F=yo(l,p);t.set(l,F);let R=F.subscribe(()=>o());s.set(l,R)}else if(!A){let $=yo(l,p);t.set(l,$);let q=$.subscribe(()=>o());s.set(l,q)}return r.set(l,f),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Ii(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Li(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Oi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function vo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function vu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function wu(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Pi(e){let t=ft("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):vu(n),a=wu(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=vo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?vo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ku=Object.freeze({workspace_config:{default_workspace:null}});function Di(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:ku.workspace_config.default_workspace}}}function Mi(e={}){let t=ft("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Di(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Di(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ni(e){let t=ft("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(f,g)=>{let A=s++,$=Date.now();n.set(A,{type:f,start_ts:$}),t("request start id=%d type=%s count=%d",A,f,r+1),a();let q=!1,F=()=>{q||(q=!0,n.delete(A),i())},R=setTimeout(()=>{q||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,f,Date.now()-$),F())},3e4);try{let j=await d(f,g),Z=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",A,f,Z),j}catch(j){let Z=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,f,Z,j),j}finally{clearTimeout(R),F()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function re(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function is(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Ei),l;switch(i){case"created_desc":return l.sort(Nr),l;case"created_asc":return l.sort(xi),l;case"updated_desc":return l.sort(Si),l;case"priority":return l.sort(Ai),l;case"manual":default:{let d=r();return d?l.sort(os(d)):l.sort(Nr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function qr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function vt(e){let t=qr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Nt(e,t){let r=qr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function ls(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=qr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function cs(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let d of i)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(ho(i,l,d.order),a);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let g={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(g);let A=n(ho(i,l,g.order),a);s(g,A);let $=await t("ui-order-set",{expected_revision:g.revision,entries:A});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function ds(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function wo(e,t){return!t||typeof e!="string"||e.length===0||ds(t.visible_labels).includes(e)?!0:ds(t.hidden_labels).includes(e)?!1:!ds(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function us(e,t){return ds(e).filter(r=>wo(r,t))}function $r(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var $u={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Fi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},qi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},xu={review:"\u2713",skip:"\u2298"},xr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Su(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ji(e){let t=e&&e.fill||"none";return t==="none"?xr.none:e&&e.stale===!0?xr.stale:t==="dim"?xr.dim:e&&e.glyph==="review"?xr.review:e&&e.glyph==="skip"?xr.skip:xr.done}function Au(e){if(!e||e.fill==="none"||!e.approval_state)return ji(e);let t=[];return e.glyph==="review"?t.push(xr.review):e.glyph==="skip"&&t.push(xr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Eu(e,t,r){let n=$u[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=xu[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${l}>
        ${Fi[e]||e}
      </div>
    </div>
  `}function ps(e,t){if(!e||!e.stages)return"";let r=qi[e.route]||qi.spec_backed,n=e.stages,s=Su(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Fi[a]||a} ${a==="plan"?Au(n[a]||{}):ji(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Eu(a,n[a]||{},a===s))}
    </div>
  `}function Tu(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Bi=2;function Cu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Bi).join(", "),s=r.length-Bi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ko(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function fs(e,t){if(!e)return null;let r=ko(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=ko(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:i,title:`${l}${d}`}}function Ui(e,t){let r=fs(e,t);return r?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Ru(e){if(!e)return null;let t=ko(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Iu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&$r(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&$r(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&$r(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Ui(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${i.kind}:${i.actor}@${i.sha}`}
        >${`exec ${i.kind==="delegated"?i.actor:`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of us(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&$r(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),$r(r,"blocked")&&s.push(...Cu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&$r(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Lu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Ou(e){let t=Nt(e.created_at),r=Nt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Pu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ti):r.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${Ou(e)}
      </div>
      ${n>0&&r.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?c`<div class="board-card__roll-list">
            ${o.map((a,i)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${Lu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${fs(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?c`<span class="board-card__roll-child-chips">
                        ${Ui(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Ru(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function _s(e,t){let r=Tu(e.priority);return c`
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
        ${r?c`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Iu(e,t)}
      ${e.workflow&&$r(t.policy||null,"stepper")?ps(e.workflow,e.status):""}
      ${Pu(e,t)}
    </article>
  `}function Xr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
        ${n?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${or.map(o=>c`<option
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
        ${e.items.map(o=>_s(o,t))}
      </div>
    </section>
  `}function Wi(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>_s(n,t))}
        </div>
      </div>
    </dialog>
  `}var Du=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Mu=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Nu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function qu(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
      ${r.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function zi(e,t,r){return c`
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
        ${Du.map(n=>c`<option
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
        ${Mu.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${qu(e,t,r)}
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
        ${Nu.map(n=>c`<option
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
  `}var Fu=200,ju={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Bu=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Hi="beads-ui.board.sort",Gi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Uu(){try{let e=window.localStorage.getItem(Hi);if(e&&Gi.has(e))return e}catch{}return"created_desc"}function Vi(e,t){let r=ft("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Mt,g=s?is(s,a):null,A=cs({transport:o,uiOrderStore:a}),$=[],q=[],F=[],R=[],j=[],Z=[],C=!1,k=0,L=Uu(),U=new Map,Q=new Map,pe=new Map,ue=new Set,te={search:"",priority:"",type:"",labels:[]},se=!1,Ie=null;function Ne(z){return String(z.status||"open")==="open"}function He(z){let X=String(z.status||"open");return X==="open"||X==="blocked"}function Xe(z){let X=te.search.trim().toLowerCase(),y=te.priority,S=te.type,P=te.labels;return z.filter(D=>{if(X){let he=String(D.id||"").toLowerCase(),ve=String(D.title||"").toLowerCase();if(!he.includes(X)&&!ve.includes(X))return!1}if(y!==""&&String(D.priority)!==y||S!==""&&String(D.issue_type||"")!==S)return!1;if(P.length>0){let he=Array.isArray(D.labels)?D.labels:[];if(!P.some(ve=>he.includes(ve)))return!1}return!0})}function Ve(){let z=new Set;for(let X of[$,q,F,R,j,Z])for(let y of X){let S=Array.isArray(y.labels)?y.labels:[];for(let P of S)typeof P=="string"&&P.length>0&&z.add(P)}return Array.from(z).sort()}function Ze(){return te.search.trim()!==""||te.priority!==""||te.type!==""||te.labels.length>0}function fe(){try{if(g){let z=g.selectBoardColumn("tab:board:in-progress","in_progress",L),X=g.selectBoardColumn("tab:board:blocked","blocked",L).filter(He),y=new Set(z.map(xe=>xe.id)),S=g.selectBoardColumn("tab:board:ready","ready",L).filter(xe=>Ne(xe)&&!y.has(xe.id)),P=g.selectBoardColumn("tab:board:resolved","resolved",L),D=g.selectBoardColumn("tab:board:deferred","deferred",L),he=g.selectBoardColumn("tab:board:closed","closed").slice(0,Fu),ve=[...X,...S,...z,...P,...he];Re(ve);let ae=new Set;for(let xe of ve)xe&&xe.id&&!$o(xe)&&ae.add(xe.id);let Ke=!Ze();$=Ke?mn(X,ae):X,q=Ke?mn(S,ae):S,F=Ke?mn(z,ae):z,R=Ke?mn(P,ae):P,j=D,k=D.length,Z=Ke?mn(he,ae):he,U=new Map;for(let xe of $)U.set(xe.id,"open");for(let xe of q)U.set(xe.id,"open");for(let xe of F)U.set(xe.id,"in_progress");for(let xe of R)U.set(xe.id,"resolved");for(let xe of j)U.set(xe.id,"deferred");for(let xe of Z)U.set(xe.id,"closed");Q=new Map;for(let xe of $)Q.set(xe.id,"blocked-col");for(let xe of q)Q.set(xe.id,"ready-col");for(let xe of F)Q.set(xe.id,"in-progress-col");for(let xe of R)Q.set(xe.id,"resolved-col");for(let xe of Z)Q.set(xe.id,"closed-col")}Se()}catch{$=[],q=[],F=[],R=[],j=[],Z=[],pe=new Map,Se()}}function Re(z){let X=new Map;for(let S of z)S&&S.id&&!X.has(S.id)&&X.set(S.id,S);let y=new Map;for(let S of X.values()){let P=$o(S);if(!P)continue;let D=y.get(P);D||(D=[],y.set(P,D)),D.push({id:S.id,title:S.title,status:S.status,metadata:S.metadata,workflow:S.workflow,created_at:S.created_at,updated_at:S.updated_at})}pe=y}function ie(z){let X=pe.get(z)||[],y=0;for(let P of X)(P.status==="resolved"||P.status==="closed")&&(y+=1);let S=ls(X);return{total:X.length,count:y,current:S,children:X}}function ke(z){return!ue.has(z)}function me(z,X){z.preventDefault(),z.stopPropagation(),ue.has(X)?ue.delete(X):ue.add(X),Se()}function J(z,X){z.preventDefault(),z.stopPropagation(),n(X)}function H(z,X){z.preventDefault(),z.stopPropagation(),n(X)}function Ae(z,X){Ie||n(X)}function $e(z,X){z.preventDefault(),z.stopPropagation(),Wu(X).then(y=>{y&&re("\uBCF5\uC0AC\uB428","success",1200)})}function oe(z,X){Ie=X,z.dataTransfer&&(z.dataTransfer.setData("text/plain",X),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function ge(z){z.target.classList.remove("board-card--dragging"),Oe(),setTimeout(()=>{Ie=null},0)}function W(z){let X=String(z.target.value||"");!X||X===f||(f=X,d&&d(X),Se())}function x(){return i?i.get():null}function B(z){let X=l?l.get():null,y=X?X.cleanup_failed:null;if(!y||typeof y!="object"||Array.isArray(y))return null;let S=y[z];return!S||typeof S!="object"||Array.isArray(S)?null:S}let M={onCardClick:Ae,onCopyId:$e,onDragStart:oe,onDragEnd:ge,onClosedRangeChange:W,rollupFor:ie,isExpanded:ke,onRollupToggle:me,onChildClick:J,onFromChipClick:H,cleanupFailureFor:B,get policy(){return x()}};function Y(z,X){Ie||(Ge(),n(X))}function _e(z,X){z.preventDefault(),z.stopPropagation(),Ge(),n(X)}let K={...M,onCardClick:Y,onChildClick:_e,onFromChipClick:_e,get policy(){return x()}};function ce(z){let X=z.target,y=e.querySelector(".board-filter__labels");X&&y&&y.contains(X)||Je()}function be(z){z.key==="Escape"&&Je()}function Le(){se||(se=!0,document.addEventListener("mousedown",ce),document.addEventListener("keydown",be),Se())}function Je(){se&&(se=!1,document.removeEventListener("mousedown",ce),document.removeEventListener("keydown",be),Se())}function ot(z){z.key==="Escape"&&Ge()}function Ye(){C||(C=!0,document.addEventListener("keydown",ot),Se())}function Ge(){C&&(C=!1,document.removeEventListener("keydown",ot),Se())}let O={onClose:Ge,onOverlayClick(z){z.target===z.currentTarget&&Ge()}},V={onSearchInput(z){te.search=String(z.target.value||""),fe()},onPriorityChange(z){te.priority=String(z.target.value||""),fe()},onTypeChange(z){te.type=String(z.target.value||""),fe()},onSortChange(z){let X=String(z.target.value||"");if(!(!Gi.has(X)||X===L)){L=X;try{window.localStorage.setItem(Hi,X)}catch{}fe()}},onDeferredToggle(){C?Ge():Ye()},onLabelMenuToggle(){se?Je():Le()},onLabelToggle(z){let X=te.labels.indexOf(z);X===-1?te.labels.push(z):te.labels.splice(X,1),fe()},onLabelClear(){te.labels.length!==0&&(te.labels=[],fe())},onNewIssue(){p&&p()}};function de(){return c`
      <div class="board-view">
        ${zi(te,V,{sort_mode:L,deferred_popup_open:C,deferred_count:k,label_options:Ve(),label_menu_open:se})}
        <div class="board-root">
          ${Xr({title:"Blocked",id:"blocked-col",items:Xe($)},M)}
          ${Xr({title:"Ready",id:"ready-col",items:Xe(q)},M)}
          ${Xr({title:"In progress",id:"in-progress-col",items:Xe(F)},M)}
          ${Xr({title:"Resolved",id:"resolved-col",items:Xe(R)},M)}
          ${Xr({title:"Closed",id:"closed-col",items:Xe(Z),is_closed:!0,closed_range:f},M)}
        </div>
        ${C?Wi({items:Xe(j),count:k},K,O):""}
      </div>
    `}function Se(){Be(de(),e),qe()}function qe(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let X=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let y of X)Array.from(y.querySelectorAll(".board-card")).forEach((P,D)=>{P.tabIndex=D===0?0:-1})}catch{}}async function tt(z,X){if(!o){re("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:X}),re("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(y){r("update-status failed: %o",y),re("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function rt(z){switch(z){case"blocked-col":return $;case"ready-col":return q;case"in-progress-col":return F;case"resolved-col":return R;default:return[]}}function Fe(z,X,y){if(!o||!a)return;let S=rt(z),P=S.find(Ke=>Ke.id===X);if(!P)return;let D=S.filter(Ke=>Ke.id!==X),he=y.closest?y.closest(".board-card"):null,ve=D.length;if(he){let Ke=he.getAttribute("data-issue-id");if(Ke===X)return;let xe=D.findIndex(gt=>gt.id===Ke);xe>=0&&(ve=xe)}let ae=D.slice();ae.splice(ve,0,P),A.applyReorder(X,ae,ve)}function Oe(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let De=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let y=z.target.closest(".board-column");y&&y!==De&&(De&&De.classList.remove("board-column--drag-over"),y.classList.add("board-column--drag-over"),De=y)}),e.addEventListener("dragleave",z=>{let X=z.relatedTarget;(!X||!e.contains(X))&&De&&(De.classList.remove("board-column--drag-over"),De=null)}),e.addEventListener("drop",z=>{z.preventDefault(),De&&(De.classList.remove("board-column--drag-over"),De=null);let X=z.target,y=X.closest(".board-column");if(!y)return;let S=z.dataTransfer?.getData("text/plain")||"";if(!S)return;let P=y.id,D=Q.get(S);if(D&&D===P){if(Bu.has(P)){if(L!=="manual"){re("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Fe(P,S,X)}return}let he=ju[P];if(!he){re("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}U.get(S)!==he&&tt(S,he)}),e.addEventListener("keydown",z=>{let X=z.target;if(!(X instanceof HTMLElement))return;let y=String(X.tagName||"").toLowerCase();if(y==="input"||y==="textarea"||y==="select"||y==="button"||y==="a"||X.isContentEditable===!0)return;let S=X.closest(".board-card");if(!S)return;let P=String(z.key||"");if(P==="Enter"||P===" "){z.preventDefault();let ae=S.getAttribute("data-issue-id");ae&&n(ae);return}if(P!=="ArrowUp"&&P!=="ArrowDown"&&P!=="ArrowLeft"&&P!=="ArrowRight")return;z.preventDefault();let D=S.closest(".board-column");if(!D)return;let he=Array.from(D.querySelectorAll(".board-card")),ve=he.indexOf(S);if(P==="ArrowDown"&&ve<he.length-1){et(S,he[ve+1]);return}if(P==="ArrowUp"&&ve>0){et(S,he[ve-1]);return}if(P==="ArrowLeft"||P==="ArrowRight"){let ae=Array.from(e.querySelectorAll(".board-column")),Ke=ae.indexOf(D),xe=P==="ArrowRight"?1:-1,gt=Ke+xe;for(;gt>=0&&gt<ae.length;){let je=ae[gt].querySelector(".board-card");if(je){et(S,je);return}gt+=xe}}});function et(z,X){try{z.tabIndex=-1,X.tabIndex=0,X.focus()}catch{}}let dt=null;g&&g.subscribe&&(dt=g.subscribe(()=>{try{fe()}catch{}}));let nt=null;i&&i.subscribe&&(nt=i.subscribe(()=>{try{fe()}catch{}}));let ut=null;return l&&l.subscribe&&(ut=l.subscribe(()=>{Se()})),{async load(){r("load"),fe()},clear(){Je(),Ge(),dt&&(dt(),dt=null),nt&&(nt(),nt=null),ut&&(ut(),ut=null),e.replaceChildren(),$=[],q=[],F=[],R=[],j=[],Z=[],U=new Map,Q=new Map}}}function $o(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function mn(e,t){return e.filter(r=>{let n=$o(r);return!(n&&t.has(n))})}async function Wu(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Zt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function ar(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function zu(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ar(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ar(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let d=p=>{typeof r.close=="function"&&r.close(),r.remove(),l(p)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function _r(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await zu(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Hu=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],Yi={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Gu=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Tt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function St(e){return typeof e=="string"&&e.length>0?e:null}function ms(e){return e.startsWith("gpt-")?e.slice(4):e}function ht(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Qi(e,t,r){let n=St(t[e]);if(n!==null)return{value:n,source:"pin"};let s=St(r[e]);return s===null?null:{value:s,source:"global"}}function gn(e,t,r,n){return Qi(e,t,r)||{value:n,source:"base"}}function Ki(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Tt(s?.[t])){let a=St(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Tt(s)){for(let a of Object.values(s))if(Tt(a)){let i=St(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return St(n?.runners?.[o]?.models?.[e]?.id)||e}function Vu(e,t){return St(t?.review?.reviewers?.[e]?.model)||e}function bn(e,t,r=!1){if(e==="default")return ht(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?ms(e):e;return ht(e,t,n,e,"explicit")}function Yu(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Tt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Tt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Zi(e){return ht(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Xi(e,t,r){let n=Qi(e,t,r);return n?bn(n.value,n.source):ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Qr(e){let t=Tt(e.pin)?e.pin:{},r=Tt(e.global)?e.global:{},n=Tt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Tt(n.session)?n.session:null,o=n?.supported===!0&&Tt(n.orchestration)?n.orchestration:null,a=Tt(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let l=gn("workflow_mode",t,r,St(s.workflow_mode_default));i.workflow_mode=l.source==="base"?ht(l.value,"base",l.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",l.value,"default"):bn(l.value,l.source);for(let p of["spec_review","plan_review","impl_review"]){let f=`${p}_model`,g=St(p==="plan_review"?l.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),A=gn(f,t,r,g);if(A.value===null)i[f]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(A.value!=="self"&&A.value!=="skip"&&!Tt(s.review?.reviewers?.[A.value]))i[f]=Zi(ht(A.value,A.source,"",null,"explicit"));else{let $=Vu(A.value,s);i[f]=ht(A.value,A.source,ms($),$,A.source==="base"?"default":"explicit")}}for(let[p,f]of Object.entries(Yi)){let g=i[f].value;if(g==="self"||g==="skip"){i[p]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let A=St(s.review?.reviewers?.[g||""]?.effort),$=gn(p,t,r,A);i[p]=$.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht($.value,$.source,$.value,$.value,$.source==="base"?"default":"explicit")}let d=Tt(s.implementation?.default)?s.implementation.default:{};for(let p of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let f=gn(p,t,r,St(d[p.replace("impl_","")]));i[p]=f.value===null?ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ht(f.value,f.source,f.value,f.value,f.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let p of["impl_runtime","impl_model","impl_effort","impl_speed"])i[p]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let p=i.impl_runtime.value==="inherit"?St(e.controller_runtime):i.impl_runtime.value,f=p?Yu(p,s,a):[];if(i.impl_model.value!=="auto"&&f.length>0&&!f.includes(i.impl_model.value))i.impl_model=Zi(i.impl_model);else{let g=Ki(i.impl_model.value,p,s,a);i.impl_model.display=ms(g),i.impl_model.full_value=g}}if(i.impl_effort.value==="auto"){let p=St(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),f=p?St(s.implementation?.effort_by_transport?.[p]?.auto):null;f&&!Gu.has(f)?(i.impl_effort.display=`${f} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=f,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):bn("default",i.impl_speed.source))}}else for(let l of Hu.filter(d=>!d.startsWith("orchestration_")))i[l]=Xi(l,t,r);if(!s){for(let[l,d]of Object.entries(Yi))(i[d].value==="self"||i[d].value==="skip")&&(i[l]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let l of["impl_runtime","impl_model","impl_effort","impl_speed"])i[l]=ht(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let l of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[l]=Xi(l,t,r);continue}let d=l.replace("orchestration_",""),p=St(o[d]),f=gn(l,t,r,p);if(l==="orchestration_effort"&&f.source==="base"){i[l]=ht(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(f.value===null){i[l]=ht(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(l==="orchestration_model"){let g=f.source==="base"?St(o.model_id)||f.value:Ki(f.value,null,s,a);i[l]=ht(f.value,f.source,ms(g),g,f.source==="base"?"default":"explicit");continue}if(f.value==="default"){i[l]=f.source==="base"?ht("default","base","default (\uC77C\uBC18)","default","default"):bn("default",f.source);continue}i[l]=bn(f.value,f.source)}return i}function Ku(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function gs(e){let t=Tt(e.pin)?e.pin:{},r=Tt(e.global)?e.global:{},n=p=>Qr({pin:e.layer==="pin"?p:t,global:e.layer==="pin"?r:p,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],l=St(s[e.key]),d=[...e.choices];return l!==null&&!d.includes(l)&&d.unshift(l),{unset_label:Ku(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:d.map(p=>{let f=n({...s,[e.key]:p})[e.key];return{value:p,label:f.display,full_value:f.full_value}})}}function Jr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let l=!1,d=f=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(f))},p=()=>d(n.value.trim());o.addEventListener("click",p),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),p())}),t.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var nl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function wt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var mr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],hn=[...mr,"reasoning_output_tokens"],Zu=["implementation","review-consult"];function xo(e){let t=0;for(let r of mr)t+=wt(e?.[r]);return t}function Xu(e){return!e||typeof e!="object"?!1:mr.some(t=>Number.isFinite(e[t]))}function Ji(e){return!e||typeof e!="object"?!1:hn.some(t=>Number.isFinite(e[t]))}function Qu(e){let t={};for(let r of hn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function el(e){let t={};for(let r of hn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function tl(e,t){return e==="codex"?wt(t.input_tokens)+wt(t.output_tokens):xo(t)}function Ju(e){return e==="claude"?"Claude":"Codex"}function ep(e){return`\u03C4 ${sl(e)}`}function tp(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${wt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${wt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${wt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${wt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${wt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${wt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${wt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(nl),o.join(`
`)}function kt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Ju(r)} ${ep(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:tp(r,n)})}return t}function hs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of hn)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=wt(i.breakdown[l])+wt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function So(e){return!e||typeof e!="object"?null:zt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function rp(e){return e==="codex"?"codex":"claude"}function Ar(){return{subtotal:0,breakdown:Qu(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function bs(e,t,r){e.subtotal+=t.subtotal;for(let n of hn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=wt(e.breakdown[n])+wt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function rl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function sl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function en(e){return Xu(e)?`\u03C4 ${sl(xo(e))}`:null}function Xt(e){let t=en(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function tn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${wt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${wt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${wt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${wt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${xo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(nl),r.join(`
`)}function zt(e,t){let r={claude:Ar(),codex:Ar()},n={orchestrator:{claude:Ar(),codex:Ar()},implementation:{claude:Ar(),codex:Ar()},"review-consult":{claude:Ar(),codex:Ar()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Ji(l)){let p=rp(i.runner),f=el(l),g={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:tl(p,f)};f.replayed===!0&&(g.replayed=!0),typeof i.model=="string"&&(g.model=i.model),typeof i.session_id=="string"&&(g.session_id=i.session_id),bs(r[p],g,!0),bs(n.orchestrator[p],g,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!Zu.includes(p.role)||!Ji(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let g=el(p.usage),A={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:g,subtotal:tl("codex",g)};A.receipt_id=f,typeof p.model=="string"&&(A.model=p.model),typeof p.effort=="string"&&p.effort.trim().length>0&&(A.effort=p.effort),typeof p.session_id=="string"?A.session_id=p.session_id:typeof p.thread_id=="string"&&(A.session_id=p.thread_id),typeof p.turn_id=="string"&&(A.turn_id=p.turn_id),typeof p.completed_at=="string"&&(A.completed_at=p.completed_at),g.replayed===!0&&(A.replayed=!0),bs(r.codex,A,!1),bs(n[A.role].codex,A,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let d=rl(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let p=n[i][d];p.legs.length>0&&(l[d]={...rl(p,!0),legs:p.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:fl,setPrototypeOf:ol,isFrozen:np,getPrototypeOf:sp,getOwnPropertyDescriptor:op}=Object,{freeze:Rt,seal:Ht,create:Lo}=Object,{apply:Oo,construct:Po}=typeof Reflect<"u"&&Reflect;Rt||(Rt=function(t){return t});Ht||(Ht=function(t){return t});Oo||(Oo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Po||(Po=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var ys=It(Array.prototype.forEach),ap=It(Array.prototype.lastIndexOf),al=It(Array.prototype.pop),yn=It(Array.prototype.push),ip=It(Array.prototype.splice),ws=It(String.prototype.toLowerCase),Ao=It(String.prototype.toString),Eo=It(String.prototype.match),vn=It(String.prototype.replace),lp=It(String.prototype.indexOf),cp=It(String.prototype.trim),Qt=It(Object.prototype.hasOwnProperty),Ct=It(RegExp.prototype.test),wn=dp(TypeError);function It(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Oo(e,t,n)}}function dp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Po(e,r)}}function ze(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ws;ol&&ol(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(np(t)||(t[n]=o),s=o)}e[s]=!0}return e}function up(e){for(let t=0;t<e.length;t++)Qt(e,t)||(e[t]=null);return e}function gr(e){let t=Lo(null);for(let[r,n]of fl(e))Qt(e,r)&&(Array.isArray(n)?t[r]=up(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=gr(n):t[r]=n);return t}function kn(e,t){for(;e!==null;){let n=op(e,t);if(n){if(n.get)return It(n.get);if(typeof n.value=="function")return It(n.value)}e=sp(e)}function r(){return null}return r}var il=Rt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),To=Rt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Co=Rt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),pp=Rt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ro=Rt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),fp=Rt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ll=Rt(["#text"]),cl=Rt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Io=Rt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),dl=Rt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),vs=Rt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),_p=Ht(/\{\{[\w\W]*|[\w\W]*\}\}/gm),mp=Ht(/<%[\w\W]*|[\w\W]*%>/gm),gp=Ht(/\$\{[\w\W]*/gm),bp=Ht(/^data-[\-\w.\u00B7-\uFFFF]+$/),hp=Ht(/^aria-[\-\w]+$/),_l=Ht(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),yp=Ht(/^(?:\w+script|data):/i),vp=Ht(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ml=Ht(/^html$/i),wp=Ht(/^[a-z][.\w]*(-[.\w]+)+$/i),ul=Object.freeze({__proto__:null,ARIA_ATTR:hp,ATTR_WHITESPACE:vp,CUSTOM_ELEMENT:wp,DATA_ATTR:bp,DOCTYPE_NAME:ml,ERB_EXPR:mp,IS_ALLOWED_URI:_l,IS_SCRIPT_OR_DATA:yp,MUSTACHE_EXPR:_p,TMPLIT_EXPR:gp}),$n={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},kp=function(){return typeof window>"u"?null:window},$p=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},pl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function gl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:kp(),t=T=>gl(T);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==$n.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:A}=e,$=l.prototype,q=kn($,"cloneNode"),F=kn($,"remove"),R=kn($,"nextSibling"),j=kn($,"childNodes"),Z=kn($,"parentNode");if(typeof a=="function"){let T=r.createElement("template");T.content&&T.content.ownerDocument&&(r=T.content.ownerDocument)}let C,k="",{implementation:L,createNodeIterator:U,createDocumentFragment:Q,getElementsByTagName:pe}=r,{importNode:ue}=n,te=pl();t.isSupported=typeof fl=="function"&&typeof Z=="function"&&L&&L.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:se,ERB_EXPR:Ie,TMPLIT_EXPR:Ne,DATA_ATTR:He,ARIA_ATTR:Xe,IS_SCRIPT_OR_DATA:Ve,ATTR_WHITESPACE:Ze,CUSTOM_ELEMENT:fe}=ul,{IS_ALLOWED_URI:Re}=ul,ie=null,ke=ze({},[...il,...To,...Co,...Ro,...ll]),me=null,J=ze({},[...cl,...Io,...dl,...vs]),H=Object.seal(Lo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ae=null,$e=null,oe=Object.seal(Lo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ge=!0,W=!0,x=!1,B=!0,M=!1,Y=!0,_e=!1,K=!1,ce=!1,be=!1,Le=!1,Je=!1,ot=!0,Ye=!1,Ge="user-content-",O=!0,V=!1,de={},Se=null,qe=ze({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),tt=null,rt=ze({},["audio","video","img","source","image","track"]),Fe=null,Oe=ze({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),De="http://www.w3.org/1998/Math/MathML",et="http://www.w3.org/2000/svg",dt="http://www.w3.org/1999/xhtml",nt=dt,ut=!1,z=null,X=ze({},[De,et,dt],Ao),y=ze({},["mi","mo","mn","ms","mtext"]),S=ze({},["annotation-xml"]),P=ze({},["title","style","font","a","script"]),D=null,he=["application/xhtml+xml","text/html"],ve="text/html",ae=null,Ke=null,xe=r.createElement("form"),gt=function(m){return m instanceof RegExp||m instanceof Function},je=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ke&&Ke===m)){if((!m||typeof m!="object")&&(m={}),m=gr(m),D=he.indexOf(m.PARSER_MEDIA_TYPE)===-1?ve:m.PARSER_MEDIA_TYPE,ae=D==="application/xhtml+xml"?Ao:ws,ie=Qt(m,"ALLOWED_TAGS")?ze({},m.ALLOWED_TAGS,ae):ke,me=Qt(m,"ALLOWED_ATTR")?ze({},m.ALLOWED_ATTR,ae):J,z=Qt(m,"ALLOWED_NAMESPACES")?ze({},m.ALLOWED_NAMESPACES,Ao):X,Fe=Qt(m,"ADD_URI_SAFE_ATTR")?ze(gr(Oe),m.ADD_URI_SAFE_ATTR,ae):Oe,tt=Qt(m,"ADD_DATA_URI_TAGS")?ze(gr(rt),m.ADD_DATA_URI_TAGS,ae):rt,Se=Qt(m,"FORBID_CONTENTS")?ze({},m.FORBID_CONTENTS,ae):qe,Ae=Qt(m,"FORBID_TAGS")?ze({},m.FORBID_TAGS,ae):gr({}),$e=Qt(m,"FORBID_ATTR")?ze({},m.FORBID_ATTR,ae):gr({}),de=Qt(m,"USE_PROFILES")?m.USE_PROFILES:!1,ge=m.ALLOW_ARIA_ATTR!==!1,W=m.ALLOW_DATA_ATTR!==!1,x=m.ALLOW_UNKNOWN_PROTOCOLS||!1,B=m.ALLOW_SELF_CLOSE_IN_ATTR!==!1,M=m.SAFE_FOR_TEMPLATES||!1,Y=m.SAFE_FOR_XML!==!1,_e=m.WHOLE_DOCUMENT||!1,be=m.RETURN_DOM||!1,Le=m.RETURN_DOM_FRAGMENT||!1,Je=m.RETURN_TRUSTED_TYPE||!1,ce=m.FORCE_BODY||!1,ot=m.SANITIZE_DOM!==!1,Ye=m.SANITIZE_NAMED_PROPS||!1,O=m.KEEP_CONTENT!==!1,V=m.IN_PLACE||!1,Re=m.ALLOWED_URI_REGEXP||_l,nt=m.NAMESPACE||dt,y=m.MATHML_TEXT_INTEGRATION_POINTS||y,S=m.HTML_INTEGRATION_POINTS||S,H=m.CUSTOM_ELEMENT_HANDLING||{},m.CUSTOM_ELEMENT_HANDLING&&gt(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(H.tagNameCheck=m.CUSTOM_ELEMENT_HANDLING.tagNameCheck),m.CUSTOM_ELEMENT_HANDLING&&gt(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(H.attributeNameCheck=m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),m.CUSTOM_ELEMENT_HANDLING&&typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(H.allowCustomizedBuiltInElements=m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),M&&(W=!1),Le&&(be=!0),de&&(ie=ze({},ll),me=[],de.html===!0&&(ze(ie,il),ze(me,cl)),de.svg===!0&&(ze(ie,To),ze(me,Io),ze(me,vs)),de.svgFilters===!0&&(ze(ie,Co),ze(me,Io),ze(me,vs)),de.mathMl===!0&&(ze(ie,Ro),ze(me,dl),ze(me,vs))),m.ADD_TAGS&&(typeof m.ADD_TAGS=="function"?oe.tagCheck=m.ADD_TAGS:(ie===ke&&(ie=gr(ie)),ze(ie,m.ADD_TAGS,ae))),m.ADD_ATTR&&(typeof m.ADD_ATTR=="function"?oe.attributeCheck=m.ADD_ATTR:(me===J&&(me=gr(me)),ze(me,m.ADD_ATTR,ae))),m.ADD_URI_SAFE_ATTR&&ze(Fe,m.ADD_URI_SAFE_ATTR,ae),m.FORBID_CONTENTS&&(Se===qe&&(Se=gr(Se)),ze(Se,m.FORBID_CONTENTS,ae)),O&&(ie["#text"]=!0),_e&&ze(ie,["html","head","body"]),ie.table&&(ze(ie,["tbody"]),delete Ae.tbody),m.TRUSTED_TYPES_POLICY){if(typeof m.TRUSTED_TYPES_POLICY.createHTML!="function")throw wn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof m.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw wn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');C=m.TRUSTED_TYPES_POLICY,k=C.createHTML("")}else C===void 0&&(C=$p(A,s)),C!==null&&typeof k=="string"&&(k=C.createHTML(""));Rt&&Rt(m),Ke=m}},$t=ze({},[...To,...Co,...pp]),jt=ze({},[...Ro,...fp]),dr=function(m){let I=Z(m);(!I||!I.tagName)&&(I={namespaceURI:nt,tagName:"template"});let ee=ws(m.tagName),le=ws(I.tagName);return z[m.namespaceURI]?m.namespaceURI===et?I.namespaceURI===dt?ee==="svg":I.namespaceURI===De?ee==="svg"&&(le==="annotation-xml"||y[le]):!!$t[ee]:m.namespaceURI===De?I.namespaceURI===dt?ee==="math":I.namespaceURI===et?ee==="math"&&S[le]:!!jt[ee]:m.namespaceURI===dt?I.namespaceURI===et&&!S[le]||I.namespaceURI===De&&!y[le]?!1:!jt[ee]&&(P[ee]||!$t[ee]):!!(D==="application/xhtml+xml"&&z[m.namespaceURI]):!1},xt=function(m){yn(t.removed,{element:m});try{Z(m).removeChild(m)}catch{F(m)}},Et=function(m,I){try{yn(t.removed,{attribute:I.getAttributeNode(m),from:I})}catch{yn(t.removed,{attribute:null,from:I})}if(I.removeAttribute(m),m==="is")if(be||Le)try{xt(I)}catch{}else try{I.setAttribute(m,"")}catch{}},ur=function(m){let I=null,ee=null;if(ce)m="<remove></remove>"+m;else{let Ee=Eo(m,/^[\r\n\t ]+/);ee=Ee&&Ee[0]}D==="application/xhtml+xml"&&nt===dt&&(m='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+m+"</body></html>");let le=C?C.createHTML(m):m;if(nt===dt)try{I=new g().parseFromString(le,D)}catch{}if(!I||!I.documentElement){I=L.createDocument(nt,"template",null);try{I.documentElement.innerHTML=ut?k:le}catch{}}let Ce=I.body||I.documentElement;return m&&ee&&Ce.insertBefore(r.createTextNode(ee),Ce.childNodes[0]||null),nt===dt?pe.call(I,_e?"html":"body")[0]:_e?I.documentElement:Ce},rr=function(m){return U.call(m.ownerDocument||m,m,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Bt=function(m){return m instanceof f&&(typeof m.nodeName!="string"||typeof m.textContent!="string"||typeof m.removeChild!="function"||!(m.attributes instanceof p)||typeof m.removeAttribute!="function"||typeof m.setAttribute!="function"||typeof m.namespaceURI!="string"||typeof m.insertBefore!="function"||typeof m.hasChildNodes!="function")},nr=function(m){return typeof i=="function"&&m instanceof i};function yt(T,m,I){ys(T,ee=>{ee.call(t,m,I,Ke)})}let pr=function(m){let I=null;if(yt(te.beforeSanitizeElements,m,null),Bt(m))return xt(m),!0;let ee=ae(m.nodeName);if(yt(te.uponSanitizeElement,m,{tagName:ee,allowedTags:ie}),Y&&m.hasChildNodes()&&!nr(m.firstElementChild)&&Ct(/<[/\w!]/g,m.innerHTML)&&Ct(/<[/\w!]/g,m.textContent)||m.nodeType===$n.progressingInstruction||Y&&m.nodeType===$n.comment&&Ct(/<[/\w]/g,m.data))return xt(m),!0;if(!(oe.tagCheck instanceof Function&&oe.tagCheck(ee))&&(!ie[ee]||Ae[ee])){if(!Ae[ee]&&Ot(ee)&&(H.tagNameCheck instanceof RegExp&&Ct(H.tagNameCheck,ee)||H.tagNameCheck instanceof Function&&H.tagNameCheck(ee)))return!1;if(O&&!Se[ee]){let le=Z(m)||m.parentNode,Ce=j(m)||m.childNodes;if(Ce&&le){let Ee=Ce.length;for(let at=Ee-1;at>=0;--at){let lt=q(Ce[at],!0);lt.__removalCount=(m.__removalCount||0)+1,le.insertBefore(lt,R(m))}}}return xt(m),!0}return m instanceof l&&!dr(m)||(ee==="noscript"||ee==="noembed"||ee==="noframes")&&Ct(/<\/no(script|embed|frames)/i,m.innerHTML)?(xt(m),!0):(M&&m.nodeType===$n.text&&(I=m.textContent,ys([se,Ie,Ne],le=>{I=vn(I,le," ")}),m.textContent!==I&&(yn(t.removed,{element:m.cloneNode()}),m.textContent=I)),yt(te.afterSanitizeElements,m,null),!1)},Ue=function(m,I,ee){if(ot&&(I==="id"||I==="name")&&(ee in r||ee in xe))return!1;if(!(W&&!$e[I]&&Ct(He,I))){if(!(ge&&Ct(Xe,I))){if(!(oe.attributeCheck instanceof Function&&oe.attributeCheck(I,m))){if(!me[I]||$e[I]){if(!(Ot(m)&&(H.tagNameCheck instanceof RegExp&&Ct(H.tagNameCheck,m)||H.tagNameCheck instanceof Function&&H.tagNameCheck(m))&&(H.attributeNameCheck instanceof RegExp&&Ct(H.attributeNameCheck,I)||H.attributeNameCheck instanceof Function&&H.attributeNameCheck(I,m))||I==="is"&&H.allowCustomizedBuiltInElements&&(H.tagNameCheck instanceof RegExp&&Ct(H.tagNameCheck,ee)||H.tagNameCheck instanceof Function&&H.tagNameCheck(ee))))return!1}else if(!Fe[I]){if(!Ct(Re,vn(ee,Ze,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&m!=="script"&&lp(ee,"data:")===0&&tt[m])){if(!(x&&!Ct(Ve,vn(ee,Ze,"")))){if(ee)return!1}}}}}}}return!0},Ot=function(m){return m!=="annotation-xml"&&Eo(m,fe)},_=function(m){yt(te.beforeSanitizeAttributes,m,null);let{attributes:I}=m;if(!I||Bt(m))return;let ee={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:me,forceKeepAttr:void 0},le=I.length;for(;le--;){let Ce=I[le],{name:Ee,namespaceURI:at,value:lt}=Ce,h=ae(Ee),u=lt,E=Ee==="value"?u:cp(u);if(ee.attrName=h,ee.attrValue=E,ee.keepAttr=!0,ee.forceKeepAttr=void 0,yt(te.uponSanitizeAttribute,m,ee),E=ee.attrValue,Ye&&(h==="id"||h==="name")&&(Et(Ee,m),E=Ge+E),Y&&Ct(/((--!?|])>)|<\/(style|title|textarea)/i,E)){Et(Ee,m);continue}if(h==="attributename"&&Eo(E,"href")){Et(Ee,m);continue}if(ee.forceKeepAttr)continue;if(!ee.keepAttr){Et(Ee,m);continue}if(!B&&Ct(/\/>/i,E)){Et(Ee,m);continue}M&&ys([se,Ie,Ne],G=>{E=vn(E,G," ")});let w=ae(m.nodeName);if(!Ue(w,h,E)){Et(Ee,m);continue}if(C&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!at)switch(A.getAttributeType(w,h)){case"TrustedHTML":{E=C.createHTML(E);break}case"TrustedScriptURL":{E=C.createScriptURL(E);break}}if(E!==u)try{at?m.setAttributeNS(at,Ee,E):m.setAttribute(Ee,E),Bt(m)?xt(m):al(t.removed)}catch{Et(Ee,m)}}yt(te.afterSanitizeAttributes,m,null)},v=function T(m){let I=null,ee=rr(m);for(yt(te.beforeSanitizeShadowDOM,m,null);I=ee.nextNode();)yt(te.uponSanitizeShadowNode,I,null),pr(I),_(I),I.content instanceof o&&T(I.content);yt(te.afterSanitizeShadowDOM,m,null)};return t.sanitize=function(T){let m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,ee=null,le=null,Ce=null;if(ut=!T,ut&&(T="<!-->"),typeof T!="string"&&!nr(T))if(typeof T.toString=="function"){if(T=T.toString(),typeof T!="string")throw wn("dirty is not a string, aborting")}else throw wn("toString is not a function");if(!t.isSupported)return T;if(K||je(m),t.removed=[],typeof T=="string"&&(V=!1),V){if(T.nodeName){let lt=ae(T.nodeName);if(!ie[lt]||Ae[lt])throw wn("root node is forbidden and cannot be sanitized in-place")}}else if(T instanceof i)I=ur("<!---->"),ee=I.ownerDocument.importNode(T,!0),ee.nodeType===$n.element&&ee.nodeName==="BODY"||ee.nodeName==="HTML"?I=ee:I.appendChild(ee);else{if(!be&&!M&&!_e&&T.indexOf("<")===-1)return C&&Je?C.createHTML(T):T;if(I=ur(T),!I)return be?null:Je?k:""}I&&ce&&xt(I.firstChild);let Ee=rr(V?T:I);for(;le=Ee.nextNode();)pr(le),_(le),le.content instanceof o&&v(le.content);if(V)return T;if(be){if(Le)for(Ce=Q.call(I.ownerDocument);I.firstChild;)Ce.appendChild(I.firstChild);else Ce=I;return(me.shadowroot||me.shadowrootmode)&&(Ce=ue.call(n,Ce,!0)),Ce}let at=_e?I.outerHTML:I.innerHTML;return _e&&ie["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&Ct(ml,I.ownerDocument.doctype.name)&&(at="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+at),M&&ys([se,Ie,Ne],lt=>{at=vn(at,lt," ")}),C&&Je?C.createHTML(at):at},t.setConfig=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};je(T),K=!0},t.clearConfig=function(){Ke=null,K=!1},t.isValidAttribute=function(T,m,I){Ke||je({});let ee=ae(T),le=ae(m);return Ue(ee,le,I)},t.addHook=function(T,m){typeof m=="function"&&yn(te[T],m)},t.removeHook=function(T,m){if(m!==void 0){let I=ap(te[T],m);return I===-1?void 0:ip(te[T],I,1)[0]}return al(te[T])},t.removeHooks=function(T){te[T]=[]},t.removeAllHooks=function(){te=pl()},t}var bl=gl();var br={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ks=e=>(...t)=>({_$litDirective$:e,values:t}),rn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var xn=class extends rn{constructor(t){if(super(t),this.it=_t,t.type!==br.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===_t||t==null)return this._t=void 0,this.it=t;if(t===Ut)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};xn.directiveName="unsafeHTML",xn.resultType=1;var hl=ks(xn);function qo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var jr=qo();function Sl(e){jr=e}var Tn={exec:()=>null};function Qe(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Lt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var xp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Lt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Sp=/^(?:[ \t]*(?:\n|$))+/,Ap=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ep=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Cn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Tp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Fo=/(?:[*+-]|\d{1,9}[.)])/,Al=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,El=Qe(Al).replace(/bull/g,Fo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Cp=Qe(Al).replace(/bull/g,Fo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),jo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Rp=/^[^\n]+/,Bo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ip=Qe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Bo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Lp=Qe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Fo).getRegex(),Ts="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Uo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Op=Qe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Uo).replace("tag",Ts).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Tl=Qe(jo).replace("hr",Cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ts).getRegex(),Pp=Qe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Tl).getRegex(),Wo={blockquote:Pp,code:Ap,def:Ip,fences:Ep,heading:Tp,hr:Cn,html:Op,lheading:El,list:Lp,newline:Sp,paragraph:Tl,table:Tn,text:Rp},yl=Qe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ts).getRegex(),Dp={...Wo,lheading:Cp,table:yl,paragraph:Qe(jo).replace("hr",Cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",yl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ts).getRegex()},Mp={...Wo,html:Qe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Uo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Tn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Qe(jo).replace("hr",Cn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",El).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Np=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,qp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Cl=/^( {2,}|\\)\n(?!\s*$)/,Fp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Cs=/[\p{P}\p{S}]/u,zo=/[\s\p{P}\p{S}]/u,Rl=/[^\s\p{P}\p{S}]/u,jp=Qe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,zo).getRegex(),Il=/(?!~)[\p{P}\p{S}]/u,Bp=/(?!~)[\s\p{P}\p{S}]/u,Up=/(?:[^\s\p{P}\p{S}]|~)/u,Wp=Qe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",xp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ll=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,zp=Qe(Ll,"u").replace(/punct/g,Cs).getRegex(),Hp=Qe(Ll,"u").replace(/punct/g,Il).getRegex(),Ol="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Gp=Qe(Ol,"gu").replace(/notPunctSpace/g,Rl).replace(/punctSpace/g,zo).replace(/punct/g,Cs).getRegex(),Vp=Qe(Ol,"gu").replace(/notPunctSpace/g,Up).replace(/punctSpace/g,Bp).replace(/punct/g,Il).getRegex(),Yp=Qe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Rl).replace(/punctSpace/g,zo).replace(/punct/g,Cs).getRegex(),Kp=Qe(/\\(punct)/,"gu").replace(/punct/g,Cs).getRegex(),Zp=Qe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Xp=Qe(Uo).replace("(?:-->|$)","-->").getRegex(),Qp=Qe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Xp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ss=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Jp=Qe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ss).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Pl=Qe(/^!?\[(label)\]\[(ref)\]/).replace("label",Ss).replace("ref",Bo).getRegex(),Dl=Qe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Bo).getRegex(),ef=Qe("reflink|nolink(?!\\()","g").replace("reflink",Pl).replace("nolink",Dl).getRegex(),vl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ho={_backpedal:Tn,anyPunctuation:Kp,autolink:Zp,blockSkip:Wp,br:Cl,code:qp,del:Tn,emStrongLDelim:zp,emStrongRDelimAst:Gp,emStrongRDelimUnd:Yp,escape:Np,link:Jp,nolink:Dl,punctuation:jp,reflink:Pl,reflinkSearch:ef,tag:Qp,text:Fp,url:Tn},tf={...Ho,link:Qe(/^!?\[(label)\]\((.*?)\)/).replace("label",Ss).getRegex(),reflink:Qe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ss).getRegex()},Do={...Ho,emStrongRDelimAst:Vp,emStrongLDelim:Hp,url:Qe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",vl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Qe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",vl).getRegex()},rf={...Do,br:Qe(Cl).replace("{2,}","*").getRegex(),text:Qe(Do.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},$s={normal:Wo,gfm:Dp,pedantic:Mp},Sn={normal:Ho,gfm:Do,breaks:rf,pedantic:tf},nf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},wl=e=>nf[e];function hr(e,t){if(t){if(Lt.escapeTest.test(e))return e.replace(Lt.escapeReplace,wl)}else if(Lt.escapeTestNoEncode.test(e))return e.replace(Lt.escapeReplaceNoEncode,wl);return e}function kl(e){try{e=encodeURI(e).replace(Lt.percentDecode,"%")}catch{return null}return e}function $l(e,t){let r=e.replace(Lt.findPipe,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(Lt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Lt.slashPipe,"|");return n}function An(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function sf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function xl(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function of(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var As=class{constructor(e){it(this,"options");it(this,"rules");it(this,"lexer");this.options=e||jr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:An(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=of(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=An(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:An(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=An(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let d=i.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let A=g,$=A.raw+`
`+r.join(`
`),q=this.blockquote($);o[o.length-1]=q,n=n.substring(0,n.length-A.raw.length)+q.raw,s=s.substring(0,s.length-A.text.length)+q.text;break}else if(g?.type==="list"){let A=g,$=A.raw+`
`+r.join(`
`),q=this.list($);o[o.length-1]=q,n=n.substring(0,n.length-g.raw.length)+q.raw,s=s.substring(0,s.length-A.raw.length)+q.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,q=>" ".repeat(3*q.length)),g=e.split(`
`,1)[0],A=!f.trim(),$=0;if(this.options.pedantic?($=2,p=f.trimStart()):A?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,p=f.slice($),$+=t[1].length),A&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,e=e.substring(g.length+1),l=!0),!l){let q=this.rules.other.nextBulletRegex($),F=this.rules.other.hrRegex($),R=this.rules.other.fencesBeginRegex($),j=this.rules.other.headingBeginRegex($),Z=this.rules.other.htmlBeginRegex($);for(;e;){let C=e.split(`
`,1)[0],k;if(g=C,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),k=g):k=g.replace(this.rules.other.tabCharGlobal,"    "),R.test(g)||j.test(g)||Z.test(g)||q.test(g)||F.test(g))break;if(k.search(this.rules.other.nonSpaceChar)>=$||!g.trim())p+=`
`+k.slice($);else{if(A||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||R.test(f)||j.test(f)||F.test(f))break;p+=`
`+g}!A&&!g.trim()&&(A=!0),d+=C+`
`,e=e.substring(C.length+1),f=k.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let d=l.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=$l(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push($l(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=An(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=sf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),xl(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return xl(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let A=f.slice(1,-1);return{type:"em",raw:f,text:A,tokens:this.lexer.inlineTokens(A)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Jt=class Mo{constructor(t){it(this,"tokens");it(this,"options");it(this,"state");it(this,"inlineQueue");it(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||jr,this.options.tokenizer=this.options.tokenizer||new As,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Lt,block:$s.normal,inline:Sn.normal};this.options.pedantic?(r.block=$s.pedantic,r.inline=Sn.pedantic):this.options.gfm&&(r.block=$s.gfm,this.options.breaks?r.inline=Sn.breaks:r.inline=Sn.gfm),this.tokenizer.rules=r}static get rules(){return{block:$s,inline:Sn}}static lex(t,r){return new Mo(r).lex(t)}static lexInline(t,r){return new Mo(r).inlineTokens(t)}lex(t){t=t.replace(Lt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Lt.tabCharGlobal,"    ").replace(Lt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(d=>{l=d.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=r.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),g;this.options.extensions.startInline.forEach(A=>{g=A.call({lexer:this},f),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Es=class{constructor(e){it(this,"options");it(this,"parser");this.options=e||jr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Lt.notSpaceStart)?.[0],s=e.replace(Lt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+hr(n)+'">'+(r?s:hr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:hr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${hr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=kl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+hr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=kl(e);if(s===null)return hr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${hr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:hr(e.text)}},Go=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},er=class No{constructor(t){it(this,"options");it(this,"renderer");it(this,"textRenderer");this.options=t||jr,this.options.renderer=this.options.renderer||new Es,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Go}static parse(t,r){return new No(r).parse(t)}static parseInline(t,r){return new No(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},xs,En=(xs=class{constructor(e){it(this,"options");it(this,"block");this.options=e||jr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Jt.lex:Jt.lexInline}provideParser(){return this.block?er.parse:er.parseInline}},it(xs,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),it(xs,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),xs),af=class{constructor(...e){it(this,"defaults",qo());it(this,"options",this.setOptions);it(this,"parse",this.parseMarkdown(!0));it(this,"parseInline",this.parseMarkdown(!1));it(this,"Parser",er);it(this,"Renderer",Es);it(this,"TextRenderer",Go);it(this,"Lexer",Jt);it(this,"Tokenizer",As);it(this,"Hooks",En);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Es(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new As(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new En;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];En.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&En.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,d);return l.call(s,f)})();let p=i.call(s,d);return l.call(s,p)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,d);return f===!1&&(f=await l.apply(s,d)),f})();let p=i.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Jt.lex(e,t??this.defaults)}parser(e,t){return er.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?er.parse:er.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?er.parse:er.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+hr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Fr=new af;function st(e,t){return Fr.parse(e,t)}st.options=st.setOptions=function(e){return Fr.setOptions(e),st.defaults=Fr.defaults,Sl(st.defaults),st};st.getDefaults=qo;st.defaults=jr;st.use=function(...e){return Fr.use(...e),st.defaults=Fr.defaults,Sl(st.defaults),st};st.walkTokens=function(e,t){return Fr.walkTokens(e,t)};st.parseInline=Fr.parseInline;st.Parser=er;st.parser=er.parse;st.Renderer=Es;st.TextRenderer=Go;st.Lexer=Jt;st.lexer=Jt.lex;st.Tokenizer=As;st.Hooks=En;st.parse=st;var wb=st.options,kb=st.setOptions,$b=st.use,xb=st.walkTokens,Sb=st.parseInline;var Ab=er.parse,Eb=Jt.lex;function Er(e){let t=st.parse(e),r=bl.sanitize(t);return hl(r)}function yr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function nn(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Rs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var lf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},cf={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},df=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,uf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ir(e){return!!e&&typeof e=="object"}function Vo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ml(e,t){let r=Vo(e),n=Vo(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function pf(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ir(s)&&typeof s.text=="string"?s.text:"").join(""):ir(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function ff(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:lf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Vo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ml(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=Ml(ir(i)?i.old_string:"",ir(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Yo(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Ko(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=df.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:uf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function _f(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ir(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ko(o.text));else if(o.type==="thinking"){let a=Yo(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=ff(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ir(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=pf(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function mf(e){if(e.type==="item.completed"&&ir(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ko(t.text)];if(t.type==="reasoning"){let r=Yo(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function gf(e){if(e.schema!=="codex-delegation-monitor-v1"||!ir(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ir(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Ko(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Yo(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=cf[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function bf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Nl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ir(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?gf(o):bf(o)?mf(o):_f(o,r);for(let i of a)t.push(i)}return t}var hf=5,yf=10,vf=/Task\s+#(\d+)/,wf=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,kf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Is(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function $f(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function xf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Sf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=vf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Af(e){if(e.tool==="Bash"){let t=e.command||"";return wf.test(t)?"~ PR/\uAC8C\uC2DC \uC911":kf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ef(e){let t=e.filter(s=>s.kind==="tool").slice(-yf),r=new Map;t.forEach((s,o)=>{let a=Af(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Tf(e){let t=xf(e);if(t)return{text:t,guess:!1};let r=Sf(e);if(r)return{text:r,guess:!1};let n=Ef(e);return n?{text:n,guess:!0}:null}function Cf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Nt(e,t)}function Ls(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,l=!1,d={},p=!0,f=new Set,g=new Set,A=null,$=null,q=!1,F=!1,R=!1,j=null,Z=null;function C(){q=!1,F=!1,R=!1,j=null,Z=null}async function k(W){if(r){F=!0,R=!1,ie();try{let x=await Promise.resolve(r("get-attempt-prompt",{attempt_id:W}));if(o!==W)return;!x||typeof x!="object"||Array.isArray(x)?R=!0:(j=x,Z=W)}catch{o===W&&(R=!0)}finally{o===W&&(F=!1,ie())}}}function L(){if(q=!q,q&&o&&Z!==o){k(o);return}ie()}function U(){if(!q)return"";let W=nn({loading:F,error:R});if(W)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${W}
      </div>`;if(!j)return"";if(j.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let x=Rs(j.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${x?c`<div class="prompt-block__meta">${x} 발송</div>`:""}
      ${typeof j.task_prompt=="string"?yr("\uACFC\uC5C5 (user)",j.task_prompt):""}
      ${typeof j.system_prompt=="string"?yr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",j.system_prompt):""}
    </div>`}function Q(){if(!i||!n)return[];let W=n.get(i);return Nl(W?W.lines:[])}function pe(){if(!i||!n)return null;let W=n.get(i),x=W?W.last_event_at:null;return typeof x=="number"?x:null}function ue(){return d.status==="running"}function te(){if(ue()&&o){$||($=setInterval(()=>ie(),1e3));return}se()}function se(){$&&(clearInterval($),$=null)}function Ie(W){let x=[],B=0;for(;B<W.length;){let M=W[B];if(M.kind==="tool"){let Y=B;for(;Y<W.length&&W[Y].kind==="tool"&&W[Y].tool===M.tool;)Y+=1;if(Y-B>=hf&&!g.has(B)){x.push({kind:"group",idx:B,tool:M.tool||"",lines:W.slice(B,Y).map((_e,K)=>({idx:B+K,line:_e}))}),B=Y;continue}}x.push({kind:"line",idx:B,line:M}),B+=1}return x}function Ne(W){for(let x=W.length-1;x>=0;x-=1){let B=W[x];if(B.kind==="result"||B.kind==="error")return null;if(B.kind==="tool"&&!Object.hasOwn(B,"result"))return B}return null}function He(W){for(let x=W.length-1;x>=0;x-=1)if(W[x].kind==="thinking")return W[x];return null}function Xe(W,x){if(x.kind==="gate")return c`<div class="sv__gate">${x.text}</div>`;if(x.kind==="phase")return c`<div class="sv__phase">${x.text}</div>`;if(x.kind==="result")return c`<div
        class="sv__result${x.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${x.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Er(x.text||(x.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(x.kind==="thinking"){let B=f.has(W);return c`<div
        class="sv__think${B?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(W)}
      >
        <span class="sv__think-line">💭 ${Is(x.text)}</span>
        ${B?c`<pre class="sv__think-expand">${x.text}</pre>`:""}
      </div>`}if(x.kind==="error")return c`<div class="sv__error">⛔ ${x.text}</div>`;if(x.kind==="blocker")return c`<div class="sv__error">⛔ ${x.text}</div>`;if(x.kind==="tool"){let B=f.has(W),M=x.tool==="Bash"?$f(x.command):0,Y=x.tool==="Bash"?M>1?Is(x.command):x.command:x.path||x.command||"";return c`<div
        class="sv__tool${B?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>me(W)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${x.icon}</span>
          <span class="sv__tool-name">${x.tool}</span>
          ${Y?c`<span class="sv__tool-detail">${Y}</span>`:""}
          ${M>1?c`<span class="sv__tool-more">⋯ ${M}줄</span>`:""}
          ${typeof x.added=="number"?c`<span class="sv__diff-add">+${x.added}</span>`:""}
          ${typeof x.removed=="number"?c`<span class="sv__diff-del">−${x.removed}</span>`:""}
          ${x.result?c`<span class="sv__tool-ok">→ ${x.result}</span>`:""}
        </span>
        ${B?c`<pre class="sv__tool-expand">${Ve(x)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Er(x.text||"")}</div>`}function Ve(W){let x=[];if(W.tool==="Bash"&&typeof W.command=="string"&&W.command.length>0)x.push(W.command);else if(W.input!==void 0)try{x.push(`input: ${JSON.stringify(W.input,null,2)}`)}catch{}return typeof W.output=="string"&&W.output.length>0&&x.push(`output:
${W.output}`),x.join(`

`)}function Ze(){if(!o)return c``;let W=Q(),x=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),B=d.session_id||"",M=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,Y=ue(),_e=Y?Cf(pe(),Date.now()):"",K=Y?Ne(W):null,ce=Y?He(W):null,be=Tf(W);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${be?c`<span
              class="sv__stage${be.guess?" sv__stage--guess":""}"
              title=${be.text}
              >${be.text}</span
            >`:""}
        ${Y?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${_e?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${_e}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${_e?c`<span class="sv__live-ago">${_e}</span>`:""}</span
            >`:""}
        ${B?c`<button
              type="button"
              class="sv__session"
              title=${B}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${B}`}
              @click=${()=>H(B)}
            >
              ⧉ ${B.slice(0,8)}
            </button>`:""}
        ${x?c`<span class="sv__meta">${x}</span>`:""}
        ${d.worktree?c`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||l?"":c`<button
              type="button"
              class="sv__prompt-toggle${q?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${q?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${L}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${M}
          @click=${J}
        >
          <span class="sv__follow-full">⇣ ${M}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ge()}
        >
          ✕
        </button>
      </div>
      ${a||l?"":U()}
      <div class="sv__body">
        ${W.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Ie(W).map(Le=>Le.kind==="group"?fe(Le):Xe(Le.idx,Le.line))}
      </div>
      ${K||ce?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${K?c`<span class="sv__now-icon">${K.icon}</span>
                  <span class="sv__now-name">${K.tool}</span>
                  <span class="sv__now-detail"
                    >${K.tool==="Bash"?Is(K.command):K.path||K.command||""}</span
                  >`:""}
            ${ce?c`<span class="sv__now-think"
                  >💭 ${Is(ce.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function fe(W){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Re(W.idx)}
    >
      <span class="sv__group-icon">${W.lines[0].line.icon}</span>
      <span class="sv__group-name">${W.tool}</span>
      <span class="sv__group-count">${W.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Re(W){g.add(W),ie()}function ie(){Be(Ze(),e),te(),p&&ke()}function ke(){let W=e.querySelector(".sv__body");W&&(W.scrollTop=W.scrollHeight)}function me(W){f.has(W)?f.delete(W):f.add(W),ie()}function J(){p=!p,ie()}function H(W){Zt(W).then(x=>{x?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ae(W){!o||!W||(d={...d,...W},ie())}function $e(W){let x=W.target;if(!x||!x.classList||!x.classList.contains("sv__body"))return;!(x.scrollHeight-x.scrollTop-x.clientHeight<=4)&&p&&(p=!1,ie())}e.addEventListener("scroll",$e,!0);function oe(W){let x=W&&W.attempt_id;if(!x)return;let B=i;o=x,a=typeof W.launch_id=="string"&&W.launch_id.length>0?W.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&B&&B!==i&&Promise.resolve(r("unsubscribe-session-log",{id:B})).catch(()=>{}),d=W.meta||{},l=W.hide_prompt===!0,p=!0,f.clear(),g.clear(),C(),!A&&n&&(A=n.subscribe(ie)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),ie()}function ge(){let W=i;o=null,a=null,i=null,l=!1,f.clear(),g.clear(),C(),se(),r&&W&&Promise.resolve(r("unsubscribe-session-log",{id:W})).catch(()=>{}),Be(c``,e),s&&s()}return{open:oe,updateMeta:Ae,close:ge,isOpen(){return o!==null},destroy(){se(),A&&(A(),A=null),e.removeEventListener("scroll",$e,!0),o=null,a=null,i=null,l=!1,Be(c``,e)}}}function Rn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=ql(t.spec_id),s=ql(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ql(e){return typeof e=="string"?e.trim():""}function Rf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function If(e){let t=e&&e.metadata||{},r=Rn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Rf(t)?null:"plan_pending"}),n}function Fl(e,t){let r=If(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${r.map(n=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
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
  `}var Lf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Of=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Pf=/^\*\*결론\*\* — (.+)$/;function Os(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Lf)return null;let r=Of.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Pf.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var jl=20;function Bl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Df(e){return e.length>jl?`${e.slice(0,jl)}\u2026`:e}function Mf(e,t,r,n){let s=`${t.lane} ${Df(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Bl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${Er(t.body)}
        </div>`:""}
  </div>`}function Nf(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Bl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Er(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ul(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let d=Os(typeof l.text=="string"?l.text:"");return d?Mf(l,d,t,s.has(l.id)):Nf(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
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
  `}var{I:ah}=ui;var Wl=e=>e.strings===void 0;var qf={},zl=(e,t=qf)=>e._$AH=t;var Br=ks(class extends rn{constructor(e){if(super(e),e.type!==br.PROPERTY&&e.type!==br.ATTRIBUTE&&e.type!==br.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Wl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ut||t===_t)return t;let r=e.element,n=e.name;if(e.type===br.PROPERTY){if(t===r[n])return Ut}else if(e.type===br.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Ut}else if(e.type===br.ATTRIBUTE&&r.getAttribute(n)===t+"")return Ut;return zl(e),t}});var Zo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ps=["orchestration_model","orchestration_effort","orchestration_speed"],Hl=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ds=["delegated","main"],Ms=["inherit","claude","codex"],In=["default","fast"],Ln=["standard","fast_track"],On=["codex","opus","fable","self","skip"],Ns=["codex","fable","skip"],qs=["low","medium","high","xhigh"],lr="auto";function vr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Gl(e){if(!vr(e)||!vr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))vr(n)&&vr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Vl(e){return e?.impl_dispatch==="main"}function Fs(e,t){let r=Gl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[lr,...n.flatMap(([,s])=>s)]}function sn(e,t,r){if(!vr(e)||!vr(e.runners))return[lr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!vr(o)||!vr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==lr&&a!==r)continue;let l=vr(i)?i.efforts:null;if(Array.isArray(l))for(let d of l)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[lr,...n]}function js(e,t){let r=Gl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Xo(e,t,r,n,s){return gs({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function Yl(e,t){let r={};for(let n of Zo){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Kl(e,t){let r={};for(let n of Ps){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Qo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Ps]}],Jo={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Zl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ea(e,t,r,n,s,o=null){let a=Qr({pin:t,global:r,execution_defaults:n,runner_catalog:s,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Xl(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of ea(e,t,r,n,s,o))a[i.source]+=1;return a}function Ql(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Jl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var bh=[...Zo,...Ps];var Ff=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],jf={pin:"pin",global:"global",base:"base"};function Bf(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${jf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Uf(e,t,r){switch(e){case"workflow_mode":return Ln;case"spec_review_model":case"impl_review_model":return On;case"plan_review_model":return Ns;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return qs;case"impl_dispatch":return Ds;case"impl_runtime":return Ms;case"impl_model":return Fs(r,t.impl_runtime);case"impl_effort":return sn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return In;case"orchestration_model":return js(r,null);case"orchestration_effort":return sn(r,void 0,t.orchestration_model||lr).filter(n=>n!==lr);default:return[]}}function Wf(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Bf(e.source)}
    <span class="detail-effective__k"
      >${Jo[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Zl[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Jo[e.key]||e.key} \uD3B8\uC9D1`}
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
          ${t.options.map(r=>c`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function ec(e,t){let r=Qo.flatMap(l=>l.keys),n=ea(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Xl(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(l=>[l.key,l])),a=Object.fromEntries(n.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=n.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let d=l.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${zf(o)}</span
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
    ${e.expanded?c`<div class="detail-effective__body">
          ${Qo.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${n.filter(d=>l.keys.includes(d.key)).map(d=>{let p=gs({key:d.key,choices:Uf(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return Wf(d,{expanded:e.expanded,options:p.options,default_label:p.unset_label,default_full_value:p.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="구현 프리셋"
              .value=${Br(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                구현 프리셋…
              </option>
              ${e.presets.map(l=>c`<option
                    value=${l.id}
                    ?selected=${l.id===e.preset_id}
                  >
                    ${l.name}${l.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
              >구현 키 5개를 핀으로 기록</span
            >
          </div>
        </div>`:""}
  </details>`}function zf(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function tc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=fs(r.planned_execution,r.exec_receipt);return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${i?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${i.kind}
            title=${i.title}
            >${i.label}</span
          >`:""}
      ${a?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${Ff.map(l=>{let d=l.receipt&&typeof t[l.receipt]=="string"?String(t[l.receipt]):"",p=n[l.id],f=d.length>0||p?.fill==="full",g=!f&&p?.fill==="dim",A=p?.stale===!0;return c`<span
          class=${`detail-summary__gate${f?" detail-summary__gate--on":""}${g?" detail-summary__gate--current":""}${A?" detail-summary__gate--stale":""}`}
          data-gate=${l.id}
        >
          <span class="detail-summary__gate-pill">${l.label}</span>
          ${d?c`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var rc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Pn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Bs(e){if(!Pn(e)||!Pn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Pn(r)&&Pn(r.models));return t.length>0?t:null}function ta(e,t){let r=Bs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function nc(e,t){return Pn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function sc(e,t){let r=Bs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return nc(n,n.models[t]);return[]}function Hf(e){let t=Bs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of nc(n,s))r.includes(o)||r.push(o);return r}function Gf(e,t){if(!t)return Hf(e);let n=Bs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of sc(e,o))s.includes(a)||s.push(a);return s}function oc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ta(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?sc(t,n.impl_model):Gf(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Vf(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ac(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l($){$.key==="Escape"&&s&&($.preventDefault(),g())}document.addEventListener("keydown",l);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>g()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Vf(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${i}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Er(a)}
          </div>
        </div>
      </div>
    `:c``}function p(){Be(d(),e)}async function f($,q={}){s=$,o="loading",a="",i="",p();let F=r?r():"";if(!F){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let R="/api/doc?workspace="+encodeURIComponent(F)+"&path="+encodeURIComponent($);try{let j=await n(R),Z=await j.json().catch(()=>({}));if(!j.ok||!Z||Z.ok!==!0){if(Z?.error==="not_found"&&q.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(Z&&Z.error||j.status)+")",p();return}a=String(Z.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function g(){s=null,Be(c``,e)}function A(){document.removeEventListener("keydown",l),g()}return{open:f,close:g,destroy:A}}var Yf=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],lc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Us=["implementation","review-consult"],Kf=["running","done","failed","interrupted"],Zf={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Xf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Qf(e){let t=kt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=en(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${lc}
          >부분 집계</span
        >`:""}`}function ic(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ra(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?na(t):""}function Jf(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Us.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!Kf.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function e_(e,t){let n=kt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${ra(t.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${ra(t.completed_at)}</span
        >`:""}
    ${n?c`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function t_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?kt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?na(e.last_event_at):s?ra(s.completed_at):"";return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Zf[e.status]}</span
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
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function r_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function n_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of o){let f=Jf(p);!f||s.has(f.launch_id)||(s.add(f.launch_id),n.push(f))}n.sort((p,f)=>p.started_at-f.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let p of Us){let f=t.roles[p]?.codex;a[p]=f?[...f.legs]:[]}let i=Us.flatMap(p=>a[p]),l=new Set,d=[];for(let p of Us){for(let f of n.filter(g=>g.role===p)){let g=i.find(A=>A.receipt_id===f.launch_id)||null;g&&!r_(f,g)||(g&&l.add(g.receipt_id),d.push(t_(f,g,e.attempt_id,r)))}for(let f of a[p])l.has(f.receipt_id)||d.push(e_(p,f))}return d}function s_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Yf,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Xf(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${lc}</span>`:""}
  </div>`}var o_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function na(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function a_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function cc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,g=o.has(d.attempt_id),A=f&&!g,$=f?g?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!A}
      title=${$}
      @click=${q=>{q.stopPropagation(),A&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,g=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return c`<div class="detail-session__cause" title=${g}>
      ${d.cause}
    </div>`},l=d=>{let p=ic(So(d));if(kt(p).length===0&&!en(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${g=>{g.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Qf(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=So(d),f=ic(p),g=kt(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${o_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Sr(d)?c`<span
                  class="detail-session__resumed"
                  title=${Sr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ar(d)}</span>
            ${g.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${g.length>0?g.map(A=>c`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):en(d.usage)?c`<span class="detail-session__usage"
                    >${en(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${na(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${i(d)} ${a_(d)}
          ${s.has(d.attempt_id)&&d.usage?s_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${n_(d,p,t)}
        </div>`})}
    </div>
  `}function dc(e,t={}){return c`
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
          ${i_(e)}
        </div>`:""}
  `}function i_(e){let t=nn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?yr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Rs(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?yr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?yr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var l_=["open","in_progress","deferred","resolved","closed"],c_=[0,1,2,3,4];function uc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,d=null,p=null,f={},g="",A=!1,$=!1,q={},F=!1,R=!1,j="",Z="",C="";function k(){F=!1,R=!1,j="",Z="",C=""}let L=[],U=null,Q=null,pe=!1,ue="",te=!1,se=0,Ie=new Set;function Ne(){L=[],U=null,Q=null,pe=!1,ue="",te=!1,se+=1,Ie.clear()}async function He(u){if(!s)return;let E=++se;try{let w=await Promise.resolve(s("get-comments",{id:u}));if(E!==se||u!==d)return;L=Array.isArray(w)?w:[],pe=!1}catch{if(E!==se||u!==d)return;pe=!0}h()}function Xe(){if(!s||!d)return;let u=p&&typeof p.comment_count=="number"?p.comment_count:null;if(U!==d){U=d,Q=u,He(d);return}u!==null&&u!==Q&&(Q=u,He(d))}function Ve(u){Ie.has(u)?Ie.delete(u):Ie.add(u),h()}function Ze(u){let E=ue.trim().length===0;ue=u,E!==(u.trim().length===0)&&h()}async function fe(){let u=ue.trim();if(!s||!d||u.length===0||te)return;let E=d;te=!0,h();let w=!1;try{let G=await Promise.resolve(s("add-comment",{id:E,text:u}));Array.isArray(G)&&G.length>0&&(w=!0,E===d&&(L=G,pe=!1,ue="",Q=G.length))}catch{w=!1}w||re("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),E===d&&(te=!1),h()}let Re={onToggle:Ve,onDraftInput:Ze,onSubmit:fe},ie=document.createElement("div");ie.className="md-viewer-root",document.body.appendChild(ie);let ke=ac(ie,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),me=document.createElement("div");me.className="session-log-root",document.body.appendChild(me);let J=Ls(me,{transport:s?(u,E)=>Promise.resolve(s(u,E)):void 0,sessionLogStore:l}),H=!1,Ae=!1,$e=!1,oe=null,ge=null,W=0;function x(u){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${u}`}function B(){H=!1,Ae=!1,$e=!1,oe=null,ge=null,W+=1}async function M(u){if(!s)return;let E=++W;Ae=!0,$e=!1,h();try{let w=await Promise.resolve(s("get-bead-prompt",{bead_id:u}));if(E!==W)return;!w||typeof w!="object"||Array.isArray(w)?$e=!0:(oe=w,ge=x(u))}catch{E===W&&($e=!0)}finally{E===W&&(Ae=!1,h())}}function Y(){if(H=!H,H&&d&&ge!==x(d)){oe=null,M(d);return}h()}function _e(){if(!a||!d)return[];let u=a.get();return(u&&u.attempts?Object.values(u.attempts):[]).filter(w=>w&&w.bead_id===d).sort((w,G)=>(G.started_at||0)-(w.started_at||0)).map(w=>({attempt_id:w.attempt_id,bead_id:w.bead_id,status:w.status,started_at:typeof w.started_at=="number"?w.started_at:null,runner:w.runner||null,model:w.model||null,effort:w.effort||w.observed_effort||null,speed:w.speed||null,session_id:w.session_id||null,resumed_from:w.resumed_from||null,continuation_mode:w.continuation_mode||null,dismissed_at:typeof w.dismissed_at=="number"?w.dismissed_at:null,cause:typeof w.cause=="string"?w.cause:null,cause_detail:w.cause_detail||null,exec_default_preset_id:typeof w.exec_default_preset_id=="string"?w.exec_default_preset_id:null,exec_default_preset_revision:typeof w.exec_default_preset_revision=="number"?w.exec_default_preset_revision:null,exec_values:w.exec_values&&typeof w.exec_values=="object"?w.exec_values:null,usage:w.usage||null,usage_legs:Array.isArray(w.usage_legs)?w.usage_legs:[],delegation_sessions:Array.isArray(w.delegation_sessions)?w.delegation_sessions:[]}))}function K(){if(!a||!d)return null;let u=a.get();return zt(u&&u.attempts||{},d)}let ce=new Set;function be(u){ce.has(u)?ce.delete(u):ce.add(u),h()}function Le(u){let E=a?a.get():null,w=E&&E.attempts?E.attempts[u]:null;J.open({attempt_id:u,meta:w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}})}function Je(u,E){let w=a?a.get():null,G=w&&w.attempts?w.attempts[u]:null,ye=(G&&Array.isArray(G.delegation_sessions)?G.delegation_sessions:[]).find(We=>We&&typeof We=="object"&&We.launch_id===E);ye&&J.open({attempt_id:u,launch_id:E,meta:{runner:"codex",role:ye.role,model:ye.model,effort:ye.effort,session_id:ye.session_id,status:ye.status}})}async function ot(u){if(!s||!u)return;let E=await Jr();if(E===null)return;let w=()=>{let We=a?a.get():null;return We&&typeof We.revision=="number"?We.revision:0},G=async(We={},Pe=w())=>await s("worker-attempt-resume",{attempt_id:u,expected_revision:Pe,...E!==""?{instructions:E}:{},...We}),we=We=>{We?.queue&&a?.set&&a.set(We.queue)},ye=await G();if(we(ye),ye&&ye.conflict){let We=ye.queue&&typeof ye.queue.revision=="number"?ye.queue.revision:w();ye=await G({},We),we(ye)}ye=await _r(ye,(We,Pe)=>G({continuation:We,decision_token:Pe}),{onResult:we,refresh:()=>G()}),ye&&ye.resumed===!1&&!ye.conflict&&ye.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ye.reason}`,"error",2400)}let Ye={onOpen:Le,onOpenDelegation:Je,onResume:ot,onToggleUsage:be};function Ge(){let u=a?a.get():null,E={...q};for(let w of["orchestration_model","orchestration_effort","orchestration_speed"]){let G=u&&u[w];typeof G=="string"&&(E[w]=G)}return E}async function O(){if(s){try{let u=await Promise.resolve(s("get-session-defaults",{}));q=u&&u.values&&typeof u.values=="object"?u.values:{}}catch{q={}}h()}}function V(){let u=a?a.get():null;return u&&u.runner_catalog||null}function de(){let u=a?a.get():null;return u&&typeof u.execution_defaults=="object"?u.execution_defaults:null}function Se(){let u=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},w=Qr({pin:{...u,...f},global:Ge(),execution_defaults:de(),runner_catalog:V()}).orchestration_model.value||"";return ta(V(),w)}function qe(){let u=i?i.get():null;return!u||typeof u.revision!="number"?null:{revision:u.revision,presets:Array.isArray(u.presets)?u.presets:[]}}function tt(u){return u?.compatible===!1}function rt(u){i&&u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&i.set({revision:u.revision,presets:u.presets})}async function Fe(){let u=qe(),E=u?.presets.find(w=>w.id===g);if(!(!s||!d||!u||!E||tt(E)||A)){A=!0,h();try{let w=await Promise.resolve(s("apply-impl-preset",Jl(d,E.id,u.revision)));if(w&&w.conflict){rt(w),re("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let G=w&&Array.isArray(w.issue)?w.issue[0]:w?.issue;if(w&&w.applied&&G&&typeof G=="object"){p=G;for(let we of rc)delete f[we];re("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}w&&w.error==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(w){w&&typeof w=="object"&&w.code==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,h()}}}let Oe=null;r&&r.subscribe&&(Oe=r.subscribe(()=>nt()));let De=null;a&&typeof a.subscribe=="function"&&(De=a.subscribe(()=>{d&&h()}));let et=null;i&&typeof i.subscribe=="function"&&(et=i.subscribe(()=>{d&&h()}));function dt(u){u.key==="Escape"&&d&&(u.preventDefault(),n())}document.addEventListener("keydown",dt);function nt(){if(d){if(r&&typeof r.snapshotFor=="function"){let u=r.snapshotFor("detail:"+d)||[];p=u.find(w=>w&&w.id===d)||u[0]||p}Xe(),h()}}function ut(u){Zt(u).then(E=>{E?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function z(u){u.preventDefault(),u.stopPropagation(),d&&ut(d)}function X(u,E){u.preventDefault(),u.stopPropagation(),ut(E)}function y(u,E,w){u.preventDefault(),u.stopPropagation(),ke.open(E,{missing_state:w})}function S(u,E){f[u]=E,h(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Ql(d,u,E.length===0?null:E))).catch(()=>{re("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function P(u,E){let w=p||{},G=w.metadata&&typeof w.metadata=="object"?w.metadata:{},we={};for(let Pe of["impl_runtime","impl_model","impl_effort"])we[Pe]=Object.hasOwn(f,Pe)?f[Pe]:typeof G[Pe]=="string"?G[Pe]:"";we[u]=E;let ye=oc(we,V(),Se()),We={};for(let Pe of["impl_runtime","impl_model","impl_effort"])We[Pe]=f[Pe],f[Pe]=ye[Pe]||"";h(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...ye,orchestration_runtime:Se()})).then(Pe=>{let mt=Array.isArray(Pe)?Pe[0]:Pe;if(!mt||typeof mt!="object"||!mt.id)throw new Error("implementation target readback failed");p=mt;for(let sr of["impl_runtime","impl_model","impl_effort"])delete f[sr];h()}).catch(()=>{for(let Pe of["impl_runtime","impl_model","impl_effort"])We[Pe]===void 0?delete f[Pe]:f[Pe]=We[Pe];h(),re("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function D(u,E,w){if(!s||!d)return!1;try{let G=await Promise.resolve(s(u,E)),we=Array.isArray(G)?G[0]:G;return we&&typeof we=="object"&&we.id?(p=we,!0):(re(w,"error"),!1)}catch{return re(w,"error"),!1}}function he(u){setTimeout(()=>{try{let E=e.querySelector(u);E&&typeof E.focus=="function"&&E.focus()}catch{}},0)}function ve(){F=!0,j=p&&p.title||"",h(),he('.detail-edit__input[data-edit="title"]')}function ae(u){j=u.target.value}function Ke(){F=!1,j="",h()}function xe(){D("edit-text",{id:d,field:"title",value:j},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(F=!1,j=""),h()})}function gt(){R=!0,Z=p&&p.description||"",h(),he('.detail-edit__textarea[data-edit="description"]')}function je(u){Z=u.target.value}function $t(){R=!1,Z="",h()}function jt(){D("edit-text",{id:d,field:"description",value:Z},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(R=!1,Z=""),h()})}function dr(u,E,w,G){if(u.key==="Escape"){u.stopPropagation(),w();return}u.key==="Enter"&&(!G||u.ctrlKey||u.metaKey)&&(u.preventDefault(),E())}function xt(u){let E=u.target.value;D("update-status",{id:d,status:E},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>h())}function Et(u){let E=Number(u.target.value);D("update-priority",{id:d,priority:E},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>h())}function ur(u){C=u.target.value}function rr(){let u=C.trim();u.length!==0&&D("label-add",{id:d,label:u},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(E=>{E&&(C=""),h()})}function Bt(u){if(u.key==="Escape"){u.stopPropagation(),C="",h();return}u.key==="Enter"&&(u.preventDefault(),rr())}function nr(u){D("label-remove",{id:d,label:u},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>h())}let yt={onCopyPath:X,onOpenDoc:y};function pr(u){return typeof u=="string"?u:u&&typeof u=="object"?String(u.id||u.to||u.issue_id||u.depends_on||""):""}function Ue(u){switch(u&&typeof u=="object"?String(u.dependency_type||u.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ot(u){let w=(Array.isArray(u.dependencies)?u.dependencies:[]).map(G=>({id:pr(G),icon:Ue(G)})).filter(G=>G.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${w.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${w.map(G=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(G.id)}
                  >
                    ${G.icon?`${G.icon} `:""}${G.id}
                  </button>`:c`<span class="detail-dep"
                    >${G.icon?`${G.icon} `:""}${G.id}</span
                  >`)}
          </div>`}
    `}function _(u){let E=u.metadata||{},w=u.workflow||{},G=w.stages||{},we=G.spec&&G.spec.stale,ye=G.impl&&G.impl.stale,We=G.plan||null,Pe=w.route_source==="derived",mt=w.route||E.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Pe?" detail-kv__v--derived":""}"
          title=${Pe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Pe?"unset":mt}</span
        >
      </div>
      ${w.route!=="quick_fix"||Object.hasOwn(E,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${E.spec_review||"\uC5C6\uC74C"}${we?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${We?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${We?.approval_receipt||"\uC5C6\uC74C"}${We?.approval_state==="stale"?" \xB7 stale":We?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${w.route!=="quick_fix"||Object.hasOwn(E,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${E.impl_review||"\uC5C6\uC74C"}${ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${w.planned_execution.kind}</span>
            </div>
            ${w.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${w.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${w.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${w.exec_receipt.kind}:${w.exec_receipt.actor}@${w.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${w.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${w.impl_entry.actor}@${w.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${E.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${E.pr_url}</span>
          </div>`:""}
    `}let v={route:["quick_fix","spec_backed","full_plan"]};async function T(u,E){let w=E.target.value;if(u==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&w!=="full_plan"&&!window.confirm(`full_plan \u2192 ${w||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){h();return}await D("update-workflow-meta",{id:d,key:u,value:w},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),h()}function m(u){let E=u.metadata||{};return c` ${((G,we)=>{let ye=v[G],We=typeof E[G]=="string"?E[G]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${G}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${G}
          data-edit=${`wfmeta-${G}`}
          @change=${Pe=>T(G,Pe)}
        >
          <option value="" ?selected=${!ye.includes(We)}>
            ${we}
          </option>
          ${ye.map(Pe=>c`<option value=${Pe} ?selected=${We===Pe}>${Pe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function I(u,E){return F?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${j}
            @input=${ae}
            @keydown=${w=>dr(w,xe,Ke,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${xe}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ke}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${u}</h2>
        ${kt(E).map(w=>c`<span class="detail-usage-total" title=${w.tooltip}
              >${w.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ve}
        >
          ✎
        </button>
      </div>
    `}function ee(u){let E=vt(u.created_at),w=vt(u.updated_at);return!E&&!w?c``:c`
      ${E?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
      ${w?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${w}</span>
          </div>`:""}
    `}function le(u,E){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${xt}
        >
          ${l_.map(w=>c`<option value=${w} ?selected=${w===u}>${w}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Et}
        >
          ${c_.map(w=>c`<option value=${String(w)} ?selected=${w===E}>
                P${w}
              </option>`)}
        </select>
      </div>
    `}function Ce(u){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${R?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${gt}
            >
              ✎
            </button>`}
      </div>
      ${R?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${Z}
              @input=${je}
              @keydown=${E=>dr(E,jt,$t,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${jt}
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
          </div>`:c`<div class="detail-overlay__desc">
            ${u||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ee(u){let E=typeof u.notes=="string"?u.notes:"";return E.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${E}</div>
    `}function at(u){let E=Array.isArray(u.labels)?u.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${E.map(w=>c`<span class="detail-label-chip"
              >${w}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${w}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+w}
                @click=${()=>nr(w)}
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
            @input=${ur}
            @keydown=${Bt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${rr}
          >
            추가
          </button>
        </span>
      </div>
    `}function lt(){if(!d)return c``;let u=p||{},E=String(u.id||d),w=u.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",G=K(),we=u.status||"open",ye=typeof u.priority=="number"?Math.max(0,Math.min(4,u.priority)):"",We=u.description||"",Pe={...u,metadata:{...u.metadata||{},...f}};return c`
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
            @click=${z}
          >
            ${E}
          </button>
          ${I(w,G)}
          ${tc(Pe)}
          ${ec({metadata:Pe.metadata,workspace_values:Ge(),catalog:V(),execution_defaults:de(),expanded:$,presets:qe()?.presets||[],preset_id:g,preset_busy:A},{onToggle:mt=>{$=mt,h()},onEdit:(mt,sr)=>{if(mt==="impl_runtime"||mt==="impl_model"||mt==="impl_effort"){P(mt,sr??"");return}S(mt,sr??"")},onPresetSelect:mt=>{g=mt,h()},onPresetApply:()=>{Fe()}})}
          ${le(we,ye)} ${ee(u)}
          ${Ce(We)}
          ${Ul(L,Re,{expanded:Ie,draft:ue,sending:te,error:pe})}
          ${Ee(u)} ${at(u)} ${Ot(u)}
          ${_(u)} ${m(u)}
          ${Fl(u,yt)}
          ${dc({expanded:H,loading:Ae,error:$e,data:oe},{onToggle:Y})}
          ${cc(_e(),Ye,{total:G,expanded:ce})}
        </div>
      </div>
    `}function h(){Be(lt(),e)}return{load(u){u!==d&&(f={},g="",$=!1,k(),Ne(),B()),d=u,p=null,nt(),O()},clear(){d=null,p=null,f={},g="",A=!1,$=!1,k(),Ne(),B(),ke.close(),J.close(),Be(c``,e)},destroy(){Oe&&(Oe(),Oe=null),De&&(De(),De=null),et&&(et(),et=null),document.removeEventListener("keydown",dt),ke.destroy(),ie.parentNode&&ie.parentNode.removeChild(ie),J.destroy(),me.parentNode&&me.parentNode.removeChild(me),d=null,p=null,g="",A=!1,Ne(),B(),Be(c``,e)}}}function pc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,p,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let g=typeof f=="string"?f.trim():"";if(s&&(g.length>0?(s.textContent=g,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Ws(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function fc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Hs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function d_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Ws(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function _c(e,t){let r=d_(e,t);return r?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?vt(r.deploy.at):""}
            >${Hs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${zs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function on(e){let t=Nt(e.created_at),r=Nt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function u_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Dn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Gs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function cr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,g)=>(f.requested_at||0)-(g.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?u_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",p=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:p==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:p}}function wr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?c`<code>백업: ${n}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var p_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function mc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let l=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:p_[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function sa(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=kt(e.usage),s=Xt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?Nt(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",f=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",g=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",A=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=c`<span class="worker-mini__title">${e.title}</span>`,q=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",F=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",R=r.map(He=>He===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${He}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${He===e.completion_badge&&e.completion_title||""}
          >${He}</span
        >`),j=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",Z=n.length>0?n.map(He=>c`<span class="worker-usage" title=${He.tooltip}
              >${He.label}</span
            >`):s?c`<span class="worker-usage" title=${tn(e.usage)}
            >${s}</span
          >`:"",C=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",k=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",L=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",U=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",Q=e.discard,pe=Q?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${Q?.attempt_id||""}
          data-operation-id=${Q?.operation?.operation_id||""}
          data-discard-mode=${Q?.confirmation||"unmerged"}
          ?disabled=${Q?!Q.enabled:e.discard_enabled===!1}
          title=${Q?Q.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${Q?.label||"\uD3D0\uAE30"}
        </button>`:"",ue=e.stale_work||null,te=ue?c`${ue.can_resume||ue.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ue.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ue.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ue.action_id}
            ?disabled=${ue.locked}
          >
            다시 확인
          </button>`:""}`:"",se=ue?c`<div class="worker-mini__stale">
        <strong>${ue.title}</strong>
        <span>${ue.summary}</span>
        <span>${ue.cause}</span>
        ${ue.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Ie=e.revise_action?c`<button
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
        </button>`:"",Ne=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||Q?.operation||e.revise_action||ue);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${g}${A}${$}</div>
          <div class="worker-mini__row2">
            ${Z}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${vt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${zs(e.work_ms)}</span
                >`:""}${R}${C}
            <span class="worker-mini__actions"
              >${k}${L}${U}${pe}</span
            >
            ${on(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${d}${p}${g}${A}${q}${F}${R}${f}${j}
            </div>
            <div class="worker-mini__body">${$}${se}</div>
            ${Ne?c`<div class="worker-mini__foot">
                  ${Z}${C}
                  <span class="worker-mini__actions"
                    >${k}${L}${U}${pe}${Ie}${te}</span
                  >
                  ${wr(e)}
                </div>`:""}
            ${on(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${g}${A}${$}${q}${F}${R}${f}${j}${Z}${C}${k}${L}${U}${pe}
            </div>
            ${wr(e)} ${on(e)}`}
  </div>`}function f_(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?c`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?ps(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
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
        ?disabled=${!t}
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${on(e)}
  </div>`}function tr(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?f_(n):sa(n))}
          </div>`}
  </section>`}var gc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Mn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Vs(e,t){let r=gc.find(s=>s.step===e);if(!r)return null;let n=gc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function bc(e){let t=Mn.findIndex(r=>r.step===e);return Mn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Ur(e){let t=Mn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function __(e){let t=Mn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Mn.length}}function Ys(e){let t=__(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var aa=new Set(["queued","running","retry_pending","repairing"]),hc=new Set(["failed","succeeded"]),m_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Nn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},g_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Nn.base_containment,child_sweep:Nn.child_sweep,branch_cleanup:Nn.branch_cleanup,parent_close:Nn.parent_close};function b_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function h_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...aa,...hc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function y_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function oa(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=m_[s];if(!o)return null;let a=Vs(r,`${n} ${o}`);return a?{...a,active:aa.has(s),failed:s==="failed"}:null}function v_(e){return!e||typeof e!="object"?null:g_[e.step]||null}function qn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=v_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=b_(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&h_($,t,i)).sort(y_):[],d=a?l:[],p=d.find($=>aa.has($.state));if(p)return oa(p);if(s)return s.step==="repo_operations"&&l[0]?oa(l[0],!0):null;let f=d.find($=>hc.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return oa(f);if(n){let $=Vs(n.step,n.label);return $?{...$,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?Nn[e.cleanup_cursor]:null;if(!g)return null;let A=Vs(g.step,g.label);return A?{...A,active:!0,failed:!1}:null}function Ks(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var yc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},vc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function wc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ia(e){for(let t of wc(e))if(Object.hasOwn(yc,t))return yc[t];return null}function la(e){let t=null;for(let r of wc(e))Object.hasOwn(vc,r)&&(t=vc[r]);return t}function Zs(e){let t=ia(e),r=la(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function kc(e,t){let r=ia(e)??ia(t),n=la(t)??la(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var $c=160;function w_(e){return e.length>$c?`${e.slice(0,$c)}\u2026`:e}function k_(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${w_(e.command)}</code>`:""}
  </div>`}function $_(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ca(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function xc(e){let t=e.failure?Zs(e.failure.reason):"";return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?c`<button
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
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${k_(e.failure.cause_detail)}
          ${$_(e.failure.reason)}
          ${wr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function x_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ca(t-e.started_at):"\u2014",a=ar(e),i=Sr(e),l=kt(e.usage),d=Xt(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,f=e.base_exception||null,g=e.landing,A=e.attempt_id&&e.attempt_id===r,$=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${A?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?c`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?c`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${$}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 알림 닫기 — 레인에는 남습니다"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:c`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?c`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:c`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${$}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${g?c`<div class="rtile__landing">
          <span
            class="merge-step${g.failed?" merge-step--failed":""}"
            style=${`--progress: ${g.percent}%`}
            >${g.label}${g.index>0?c`<span class="merge-step__n"
                  >${g.index}/${g.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||l.length>0||d||p||f?c`<div class="rtile__meta">
          ${p?c`<span class="worker-mini__badge">${p}</span>`:""}
          ${f?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${f}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(q=>c`<span class="worker-usage" title=${q.tooltip}
                    >${q.label}</span
                  >`):d?c`<span
                  class="worker-usage"
                  title=${tn(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${on(e)} ${wr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function da(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>x_(s,t,r))}
  </div>`}function Wr(e){return c`<svg
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
  </svg>`}function ua(){return Wr(kr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function pa(){return Wr(kr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Sc(){return Wr(kr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Ac(){return Wr(kr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Ec(){return Wr(kr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Tc(){return Wr(kr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Cc(){return Wr(kr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Fn=1,S_=6e4,A_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},E_=new Set(["auto_merge","merged","merge","done"]),Rc={running:3,paused:2,failed:1};function T_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function C_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),g=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!g&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let f=Rc[d.run_state],g=Rc[i];if(f>g||f===g&&(d.started_at??0)>(l??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:zt(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Ic(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Dt(e){return e&&typeof e=="object"?e:{}}function fa(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let R of s)R&&typeof R.root_dir=="string"&&a.set(R.root_dir,R);let i=[],l=[],d=[],p=[],f=[],g=new Map;for(let R of n){if(!R||typeof R.root_dir!="string")continue;let j=R.root_dir,Z=R.name||j,C=a.get(j),k=C&&typeof C.revision=="number"?C.revision:typeof R.revision=="number"?R.revision:0,L=Dt(R.attempts),U=Dt(R.bead_titles),Q=Dt(R.pr_observations),pe=Dt(R.admission),ue=Dt(R.revise_parked),te=Dt(R.merge_queue_state),se=Dt(R.cleanup_failed),Ie=Dt(R.discard_operations),Ne=Dt(R.pr_activity),He=Array.isArray(R.repo_operations)?R.repo_operations:[],Xe=Array.isArray(R.merge_queue)?R.merge_queue:[],Ve=new Set(Xe.filter(J=>J&&typeof J.bead_id=="string").map(J=>J.bead_id)),Ze=new Map(Xe.filter(J=>J&&typeof J.bead_id=="string").map(J=>[J.bead_id,J])),fe=Array.isArray(R.queue)?R.queue:[],Re=Array.isArray(R.done)?R.done:[],ie=new Map;for(let J of Re)J&&typeof J.bead_id=="string"&&typeof J.added_at=="number"&&ie.set(J.bead_id,J.added_at);let ke=J=>({id:J,title:U[J]||J,root_dir:j,workspace_name:Z,expected_revision:k,draggable:!1}),me=new Set;for(let[J,H]of C_(L,ie))me.add(J),l.push({...ke(J),lane:"running",attempt_id:H.attempt_id,run_state:H.run_state,can_pause:H.can_pause,can_resume:H.can_resume,started_at:H.started_at,last_event_at:H.last_event_at,runner:H.runner,model:H.model,effort:H.effort,speed:H.speed,resumed_from:H.resumed_from,continuation_mode:H.continuation_mode,usage:H.usage,discard:cr(Ie,J,{attempt_id:H.attempt_id}),badges:H.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:H.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:H.run_state==="failed"});for(let J of Array.isArray(R.pr_wait)?R.pr_wait:[]){let H=J&&J.bead_id;if(typeof H!="string"||me.has(H))continue;me.add(H);let Ae=Dt(Q[H]),$e=Dt(Ae.pr),oe=Ae.gate?Dt(Ae.gate):null,ge=Ve.has(H),W=Ze.get(H)?.continuation_action||null,x=!!W&&W.continuation===null,B=te.active===H,M=J.external===!0,Y=se[H]||null,_e=Dt(Ne[H]),K=qn({bead_id:H,merge_sha:J.merge_sha,cleanup_cursor:J.cleanup_cursor,merge_progress:_e.merge_progress||null,cleanup_failed:Y,repo_operations:He}),ce=Ks(K),be=!!oe&&oe.base_badge==="\uCDA9\uB3CC",Le=!!Y&&["child_sweep","branch_cleanup","parent_close"].includes(Y.step)&&!!oe&&oe.tier==="merged",Je=M&&!!Y&&!!oe&&oe.tier==="merged",ot=!!oe&&["closed_unmerged","review","undecidable"].includes(oe.tier),Ye=cr(Ie,H,{external:M,merge_active:B||K?.step==="merge",merge_queued:ge,cleanup_active:ce,merged:!!Y||oe?.tier==="merged"}),Ge=!!Ye.operation;d.push({...ke(H),lane:"pr_wait",pr_number:typeof $e.number=="number"?$e.number:null,pr_url:typeof $e.url=="string"?$e.url:void 0,external:M,usage:zt(L,H),merge_step:K,badges:x?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:K?[oe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Y?[Ur(Y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Ur(Y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof oe?.gate_badge=="string"&&oe.gate_badge.length>0?[oe.gate_badge]:[],alert:K?K.failed===!0:!!Y||ot,reason:Y&&K?.active!==!0?Ys(Y.step):"PR \uB300\uAE30",merge_action:oe?.tier==="merged"&&!Le&&!Je?!1:!ge||x,merge_enabled:!Ge&&(x||oe?.enabled===!0||be||Le||Je),merge_label:x?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Je||Le?"\uC815\uB9AC \uC7AC\uAC1C":be&&!Le?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:x?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ge?Ye.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ye.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ye.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":be?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":oe?.enabled===!0?`\uBA38\uC9C0 (${oe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${oe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ge&&!x,cancel_enabled:!B,continuation_mismatch:W?.mismatch||null,discard:Ye,discard_action:Ye.action,discard_enabled:Ye.enabled,discard_title:Ye.title})}for(let J=0;J<fe.length;J++){let H=fe[J],Ae=H&&H.bead_id;if(typeof Ae!="string"||me.has(Ae))continue;me.add(Ae);let $e=ue[Ae],oe=cr(Ie,Ae),ge=oe.operation?oe:null,W={...ke(Ae),lane:"queue",draggable:!ge,discard:ge||void 0,reason:Ic(pe,Ae),queue_position:J+1,queue_index:J,queue_length:fe.length,badges:$e?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!$e,revise_action:!!$e,revise_enabled:!!$e&&!ge,revise_title:$e?$e.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${$e.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(W);let x=g.get(j);x?x.push(W):g.set(j,[W])}for(let J of Array.isArray(R.runnable)?R.runnable:[]){let H=J&&J.bead_id;typeof H!="string"||me.has(H)||(me.add(H),i.push({...ke(H),title:J.title||U[H]||H,lane:"runnable",draggable:!0,reason:Ic(pe,H),created_at:J.created_at??void 0,updated_at:J.updated_at??void 0,labels:Array.isArray(J.labels)?J.labels:[],spec_reviewer:typeof J.spec_reviewer=="string"?J.spec_reviewer:void 0,plan_state:J.plan_state==="approved"||J.plan_state==="authored"?J.plan_state:"none",workflow:J.route?{route:J.route,chips:{route:J.route}}:null,place_index:fe.length}))}for(let J of Re){let H=J&&J.bead_id;if(typeof H!="string"||me.has(H)||(me.add(H),o!==void 0&&typeof J.added_at=="number"&&J.added_at<o))continue;let Ae=T_(L,H);f.push({...ke(H),lane:"done",done:!0,usage:zt(L,H),done_at:typeof J.added_at=="number"?J.added_at:void 0,done_kind:Ae&&typeof Ae.done_kind=="string"?Ae.done_kind:null})}}let A=new Map;s.forEach((R,j)=>{R&&typeof R.root_dir=="string"&&A.set(R.root_dir,j)});let $=r&&r.running_sort==="repo"?"repo":"started";l.sort((R,j)=>{if($==="repo"){let k=A.get(R.root_dir)??Number.MAX_SAFE_INTEGER,L=A.get(j.root_dir)??Number.MAX_SAFE_INTEGER;if(k!==L)return k-L}let Z=typeof R.started_at=="number"&&Number.isFinite(R.started_at)?R.started_at:null,C=typeof j.started_at=="number"&&Number.isFinite(j.started_at)?j.started_at:null;return Z!==null&&C!==null&&Z!==C?Z-C:Z===null&&C!==null?1:Z!==null&&C===null?-1:R.id.localeCompare(j.id)}),f.sort((R,j)=>(j.done_at??0)-(R.done_at??0));let q=s.length>0?s:n.map(R=>({root_dir:R&&R.root_dir,name:R&&R.name,auto_advance:R&&R.auto_advance,auto_merge:R&&R.auto_merge,slots:R&&R.slots,revision:R&&R.revision,runner_catalog:R&&R.runner_catalog})),F=[];for(let R of q)!R||typeof R.root_dir!="string"||F.push({root_dir:R.root_dir,name:R.name||R.root_dir,auto_advance:R.auto_advance===!0,auto_merge:R.auto_merge===!0,slots:typeof R.slots=="number"&&R.slots>=Fn?R.slots:Fn,revision:typeof R.revision=="number"?R.revision:0,runner_catalog:Dt(R.runner_catalog),items:g.get(R.root_dir)||[]});return{runnable:i,queue:p,queue_groups:F,running:l,pr_wait:d,done:f,automation:{total:F.length,both_on:F.filter(R=>R.auto_advance&&R.auto_merge).length}}}function R_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<S_;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${vt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Nt(e,t)}</span
        >`}</span
  >`}function jn(e){return c`<div class="mon-c__title">${e.title}</div>`}function Bn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Xs(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function _a(e){let t=kt(e.usage),r=Xt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${tn(e.usage)}
        >${r}</span
      >`:""}function ma(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function I_(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${pa()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${ua()}
        </button>`}
    ${e.discard?.action?c`<button
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
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Ac()}
        </button>`:""}
  </span>`}function L_(e,t){let r=typeof e.started_at=="number"?ca(t-e.started_at):"";return c`${jn(e)}
    <div class="mon-c__meta">
      ${ma(e)}${R_(e.last_event_at,t)}${Bn(e)}${Xs(e)}
      ${ar(e)?c`<span class="mon-c__model">${ar(e)}</span>`:""}
      ${Sr(e)?c`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${_a(e)}${I_(e)}${wr(e)}
    </div>`}function O_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Nt(e.updated_at);return c`${jn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Bn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${us(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Xs(e)}
      ${i?c`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?c`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="worker-card__place"
          data-bead-id=${e.id}
          title="대기 큐 맨 뒤에 추가"
        >
          대기로 ↴
        </button>
      </span>
    </div>`}function P_(e){let t=!!e.discard?.operation;return c`${jn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Bn(e)}
      ${ma(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
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
        ${t?c`<button
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
    ${wr(e)}
    ${e.revise_action?c`<div class="mon-c__tail">
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
        </div>`:""}`}function D_(e){let t=e.merge_step||null,r=!!(Xt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return c`${jn(e)}
    <div class="mon-c__meta">
      ${Bn(e)}${Xs(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${ma(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?c`<div class="mon-c__tail">
          ${_a(e)}${t?c`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?c`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?c`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?c`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?c`<button
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
          ${wr(e)}
        </div>`:""}`}function M_(e,t){let r=e.done_kind||"",n=r?A_[r]||r:"",s=Nt(e.done_at,t);return c`${jn(e)}
    <div class="mon-c__meta">
      ${Bn(e)}${Xs(e)}
      ${n?c`<span
            class="mon-live__kind${E_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${_a(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${vt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Lc(e,t){return e.lane==="running"?L_(e,t):e.lane==="runnable"?O_(e):e.lane==="queue"?P_(e):e.lane==="pr_wait"?D_(e):M_(e,t)}function Oc(e){let t=String(e.revision);return c`<header
    class="mon-group__hd${e.items.length===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${e.items.length}</span>
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
        ${e.auto_advance?pa():ua()}
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
        ${Ec()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Tc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Fn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Pc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=or.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Sc():Cc()}
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
        ${or.map(i=>c`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Dc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Mc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return kt(hs(t));let r={};for(let i of mr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let d=!1;for(let p of mr){let f=l[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,d=!0)}if(d){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Xt(r):null}var qc="bdui.monitor.done-range",Fc="bdui.monitor.running_sort";function N_(){try{let e=window.localStorage.getItem(qc);return Wt(e)?e:Mt}catch{return Mt}}function q_(e){try{window.localStorage.setItem(qc,e)}catch{}}function F_(){try{return window.localStorage.getItem(Fc)==="repo"?"repo":"started"}catch{return"started"}}function j_(e){try{window.localStorage.setItem(Fc,e)}catch{}}var jc="tab:monitor:pipeline",B_=1e3,U_=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Nc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}"
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
    ${Lc(e,t)}
  </div>`}function Bc(e,t){let r=ft("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,l=t.now||(()=>Date.now()),d=t.confirm||(x=>typeof globalThis.confirm!="function"||globalThis.confirm(x)),p=N_(),f=F_();function g(){let x=or.find(B=>B.value===p);return x?x.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let $=fa(null,null),q=new Map,F=null,R=null;async function j(x,B,M,Y,_e=!0){if(!o||!M)return null;let K=await o(x,{...B,root_dir:M,expected_revision:Y});if(K&&K.conflict&&_e){K.queue&&q.set(M,K.queue);let ce=K.queue&&typeof K.queue.revision=="number"?K.queue.revision:Y;K=await o(x,{...B,root_dir:M,expected_revision:ce})}return K&&K.queue&&M&&q.set(M,K.queue),K}function Z(x,B){let M=q.get(x),Y=s&&s.get?s.get():null,_e=(Array.isArray(Y)?Y:[]).find(ce=>ce?.root_dir===x);return(M||_e)?.merge_queue?.find(ce=>ce.bead_id===B)?.continuation_action}async function C(x,B,M,Y){let _e=await j(x,B,M,Y),K=q.get(M)?.revision??_e?.queue?.revision??Y;return _r(_e,(ce,be)=>j(x,{...B,continuation:ce,decision_token:be},M,K,!1),{refresh:ce=>j(x,B,M,ce?.queue?.revision??q.get(M)?.revision??K,!1)})}async function k(x,B,M,Y){let _e=await _r({continuation_mismatch:Y},(ce,be)=>j("worker-merge-queue-add",{bead_id:B,continuation:ce,decision_token:be},x,M,!1)),K=_e?.queue?.merge_queue?.find(ce=>ce.bead_id===B)?.continuation_action;_e?.applied!==!0&&K?.continuation===null&&K.mismatch&&await k(x,B,_e.queue.revision,K.mismatch)}async function L(x,B,M){let Y=await j("worker-discard",x,B,M);if(Y&&Y.discarded===!0){re(Gs(Y),"success",5e3);return}if(Y&&Y.reason){re(`\uD3D0\uAE30 \uC2E4\uD328: ${Y.reason}`,"error");return}if(Y&&Y.accepted&&Y.pending==="merged_revert"){re("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Y&&Y.accepted){re(`\uD3D0\uAE30 \uC9C4\uD589: ${Y.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Y&&!Y.conflict&&re("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function U(x,B,M){return!o||!M?null:await o(x,{...B,root_dir:M})}async function Q(x){if(!o||!x&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let B=await o("monitor-auto-toggle",{on:x}),M=B&&Array.isArray(B.failed)?B.failed:[];M.length>0&&re(`\uC790\uB3D9\uD654 ${x?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${M.map(Y=>Y.root_dir).join(", ")}`,"error",3200)}async function pe(){let x=new Map;for(let B of $.pr_wait)x.has(B.root_dir)||x.set(B.root_dir,B.expected_revision);for(let[B,M]of x)await j("worker-merge-queue-add-all",{},B,M)}let ue=null,te=!1,se=null;function Ie(){se!==null&&clearTimeout(se),se=setTimeout(()=>{se=null,te=!1},0)}function Ne(x){let B=x.target;return typeof B?.closest=="function"?B.closest(".mon-group"):null}function He(x){let B=Ne(x);return!B||!ue?null:(B.getAttribute("data-root-dir")||"")===ue.root_dir?B:null}function Xe(){for(let x of Array.from(A.querySelectorAll(".mon-group--drag-over")))x.classList.remove("mon-group--drag-over")}function Ve(x){let B=x.target,M=typeof B?.closest=="function"?B.closest('.mon-card[draggable="true"]'):null;if(M){ue={bead_id:M.getAttribute("data-issue-id")||"",lane:M.getAttribute("data-lane")||"",root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0,queue_index:Number(M.getAttribute("data-queue-index")),queue_length:Number(M.getAttribute("data-queue-length")),place_index:Number(M.getAttribute("data-place-index"))},te=!0;try{x.dataTransfer?.setData("text/plain",ue.bead_id),x.dataTransfer&&(x.dataTransfer.effectAllowed="move")}catch{}}}function Ze(x){let B=He(x);B&&(x.preventDefault(),x.dataTransfer&&(x.dataTransfer.dropEffect="move"),B.classList.add("mon-group--drag-over"))}function fe(x){Ne(x)?.classList.remove("mon-group--drag-over")}function Re(){ue=null,Xe(),Ie()}function ie(x){let B=He(x),M=ue;if(ue=null,Xe(),!B||!M||!M.bead_id)return;x.preventDefault();let Y=x.target,_e=typeof Y?.closest=="function"?Y.closest('.mon-card[data-lane="queue"]'):null,K=_e&&B.contains(_e)?Number(_e.getAttribute("data-queue-index")):NaN;if(M.lane==="runnable"){let Le=Number.isFinite(K)?K:M.place_index;if(!Number.isFinite(Le))return;j("worker-queue-place",{bead_id:M.bead_id,index:Le},M.root_dir,M.revision);return}if(M.lane!=="queue"||_e&&_e.getAttribute("data-issue-id")===M.bead_id)return;let ce=M.queue_index,be=Number.isFinite(K)?ce>K?K:K-1:M.queue_length-1;!Number.isFinite(be)||be<0||be===ce||j("worker-queue-reorder",{bead_id:M.bead_id,to_index:be},M.root_dir,M.revision)}function ke(x){let B={runnable:$.runnable,queue:$.queue,running:$.running,pr_wait:$.pr_wait,done:$.done};return c`${Pc({automation:$.automation,counts:{running:$.running.length,queue:$.queue.length,pr_wait:$.pr_wait.length},running_sort:f,done_range:p,token_total:Mc($.done),token_tooltip:Dc(g())})}
      <div class="worker-lanes mon-lanes">
        ${U_.map(M=>{let Y=B[M.lane],_e=M.lane==="queue"?$.queue_groups.length>0?c`${$.queue_groups.map(K=>c`<div
                        class="mon-group"
                        data-root-dir=${K.root_dir}
                      >
                        ${Oc(K)}
                        <div class="mon-group__list">
                          ${K.items.map(ce=>Nc(ce,x))}
                        </div>
                      </div>`)}`:void 0:Y.length>0?c`${Y.map(K=>Nc(K,x))}`:void 0;return tr({id:`monitor-${M.lane}`,lane:M.pane,title:M.lane==="done"?`\uC644\uB8CC\xB7${g()}`:M.title,items:Y,empty:M.empty,body:_e,live:M.lane==="running"&&Y.length>0,header_control:M.lane==="pr_wait"&&Y.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function me(){let x=s&&s.get?s.get():null,B=s&&s.getWorkspacesState?s.getWorkspacesState():[],M=l();$=fa(x,B,{done_since:Dr(p,M),running_sort:f}),Be(ke(M),A)}function J(x,B){let M=a?a():void 0;if(!B||!M||B===M||!i){n(x);return}i(B).then(()=>{n(x)}).catch(Y=>{r("workspace switch for %s failed: %o",B,Y)})}function H(x){return{root_dir:x.getAttribute("data-root-dir")||"",revision:Number(x.getAttribute("data-revision")||0)||0}}function Ae(x,B){let{root_dir:M,revision:Y}=H(x),_e=x.getAttribute("data-issue-id")||"",K=B.dataset.attemptId||x.getAttribute("data-attempt-id")||"",ce=B.classList;if(ce.contains("worker-card__place")){j("worker-queue-place",{bead_id:_e,index:Number(x.getAttribute("data-place-index")||0)||0},M,Y);return}if(ce.contains("mon-op--up")||ce.contains("mon-op--down")){let be=Number(x.getAttribute("data-queue-index")||0)||0,Le=ce.contains("mon-op--up")?be-1:be+1;if(Le<0)return;j("worker-queue-reorder",{bead_id:_e,to_index:Le},M,Y);return}if(ce.contains("mon-op--remove")){j("worker-queue-remove",{bead_id:_e},M,Y);return}if(ce.contains("mon-op--pause")){U("worker-attempt-pause",{attempt_id:K},M);return}if(ce.contains("mon-op--discard")){if(!d(Dn(_e,"unmerged")))return;L({bead_id:_e,...K?{attempt_id:K}:{},...B.dataset.operationId?{operation_id:B.dataset.operationId}:{}},M,Y);return}if(ce.contains("mon-op--resume")){Jr().then(be=>{if(be!==null)return C("worker-attempt-resume",{attempt_id:K,...be!==""?{instructions:be}:{}},M,Y)});return}if(ce.contains("mon-op--dismiss")){j("worker-attempt-dismiss",{attempt_id:K},M,Y);return}if(ce.contains("worker-mini__merge")){let be=Z(M,_e);be?.mismatch&&be.continuation===null?k(M,_e,Y,be.mismatch):j("worker-merge-queue-add",{bead_id:_e},M,Y);return}if(ce.contains("worker-mini__merge-cancel")){j("worker-merge-queue-remove",{bead_id:_e},M,Y);return}if(ce.contains("worker-mini__discard")){let be=B.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Dn(_e,be)))return;L({bead_id:_e,...K?{attempt_id:K}:{},...B.dataset.operationId?{operation_id:B.dataset.operationId}:{}},M,Y);return}if(ce.contains("worker-mini__revise-fix")){C("worker-revise-fix",{bead_id:_e},M,Y);return}ce.contains("worker-mini__revise-approve")&&j("worker-revise-approve",{bead_id:_e},M,Y)}function $e(x){let B=te;te=!1;let M=x.target;if(!M||typeof M.closest!="function"||M.closest("dialog")||M.closest("a"))return;let Y=M.closest(".mon-running-sort");if(Y){x.preventDefault(),f=Y.getAttribute("data-sort")==="repo"?"repo":"started",j_(f),me();return}let _e=M.closest(".mon-auto-all");if(_e){x.preventDefault(),Q(_e.getAttribute("data-on")==="true");return}if(M.closest(".mon-merge-all")){x.preventDefault(),pe();return}let ce=M.closest(".mon-ctl--advance");if(ce){x.preventDefault();let{root_dir:Ye,revision:Ge}=H(ce);j("worker-automation-toggle",{on:ce.getAttribute("data-on")==="true"},Ye,Ge);return}let be=M.closest(".mon-ctl--merge-auto");if(be){x.preventDefault();let{root_dir:Ye,revision:Ge}=H(be);j("worker-merge-auto-toggle",{on:be.getAttribute("data-on")==="true"},Ye,Ge);return}let Le=M.closest(".mon-card");if(!Le)return;let Je=M.closest("button");if(Je){x.preventDefault(),Ae(Le,Je);return}let ot=Le.getAttribute("data-issue-id");ot&&!B&&(x.preventDefault(),J(ot,Le.getAttribute("data-root-dir")||""))}function oe(x){let B=x.target;if(!B||typeof B.closest!="function")return;let M=B.closest(".mon-done-range");if(M){p=Wt(M.value)?M.value:Mt,q_(p),me();return}let Y=B.closest(".mon-slots__input");if(!Y)return;let{root_dir:_e,revision:K}=H(Y),ce=Number(Y.value);if(!Number.isFinite(ce))return;let be=Math.max(Fn,Math.floor(ce));j("worker-queue-set-slots",{slots:be},_e,K)}e.addEventListener("click",$e),e.addEventListener("change",oe),e.addEventListener("dragstart",Ve),e.addEventListener("dragover",Ze),e.addEventListener("dragleave",fe),e.addEventListener("drop",ie),e.addEventListener("dragend",Re),s&&typeof s.subscribe=="function"&&(F=s.subscribe(()=>{try{q.clear(),me()}catch{}}));function ge(){R!==null&&(clearInterval(R),R=null)}function W(){se!==null&&(clearTimeout(se),se=null)}return{load(){r("load"),me(),R===null&&(R=setInterval(()=>{try{me()}catch{}},B_))},pause(){ge()},clear(){ge(),W(),F&&(F(),F=null),e.removeEventListener("click",$e),e.removeEventListener("change",oe),e.removeEventListener("dragstart",Ve),e.removeEventListener("dragover",Ze),e.removeEventListener("dragleave",fe),e.removeEventListener("drop",ie),e.removeEventListener("dragend",Re),e.replaceChildren()}}}function Uc(e,t,r){let n=ft("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){Be(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Be(c``,e)}}}var Wc=["bug","feature","task","epic","chore"];function zc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Hc=["Critical","High","Medium","Low","Backlog"];function Gc(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),g=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let k=document.createElement("option");k.value="",k.textContent="\u2014 Select \u2014",o.appendChild(k);for(let L of Wc){let U=document.createElement("option");U.value=L,U.textContent=zc(L),o.appendChild(U)}a.replaceChildren();for(let L=0;L<=4;L+=1){let U=document.createElement("option");U.value=String(L);let Q=Hc[L]||"Medium";U.textContent=`${L} \u2013 ${Q}`,a.appendChild(U)}}A();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function q(k){s.disabled=k,o.disabled=k,a.disabled=k,i.disabled=k,l.disabled=k,p.disabled=k,f.disabled=k,f.textContent=k?"Creating\u2026":"Create"}function F(){d.textContent=""}function R(k){d.textContent=k}function j(){try{let k=window.localStorage.getItem("beads-ui.new.type");k?o.value=k:o.value="";let L=window.localStorage.getItem("beads-ui.new.priority");L&&/^\d$/.test(L)?a.value=L:a.value="2"}catch{o.value="",a.value="2"}}function Z(){let k=o.value||"",L=a.value||"";k.length>0&&window.localStorage.setItem("beads-ui.new.type",k),L.length>0&&window.localStorage.setItem("beads-ui.new.priority",L)}async function C(){F();let k=String(s.value||"").trim();if(k.length===0){R("Title is required"),s.focus();return}let L=Number(a.value||"2");if(!(L>=0&&L<=4)){R("Priority must be 0..4"),a.focus();return}let U=String(o.value||""),Q=String(l.value||""),pe={title:k};U.length>0&&(pe.type=U),String(L).length>0&&(pe.priority=L),Q.length>0&&(pe.description=Q),q(!0);try{await t("create-issue",pe)}catch{q(!1),R("Failed to create issue");return}Z(),q(!1),$()}return r.addEventListener("cancel",k=>{k.preventDefault(),$()}),g.addEventListener("click",()=>$()),p.addEventListener("click",()=>$()),r.addEventListener("keydown",k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&(k.preventDefault(),C())}),n.addEventListener("submit",k=>{k.preventDefault(),C()}),{open(){n.reset(),F(),j();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var W_=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function z_(e,t){return wo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Vc(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=z_(n,e);return c`<button
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
  `}function Yc(e,t,r){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>c`<span class="settings-dialog__prefix">
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
  `}function Kc(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${W_.map(([r,n])=>c`<label class="settings-dialog__toggle">
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
  `}var H_=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],qt="";function Ft(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Zc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(O=>re(O,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="session",l=!1,d="",p={},f={},g=[],A=!1,$=null,q={},F="",R="",j=!1,Z=!1,C=!1,k=null;function L(){let O=t.queueStore?.get();return Ft(O)?O.runner_catalog:null}function U(){let O=t.queueStore?.get();return Ft(O)&&Ft(O.execution_defaults)?O.execution_defaults:null}function Q(){let O=t.implPresetStore?.get();return Ft(O)&&Array.isArray(O.presets)?O:null}async function pe(){A=!0,K();try{let O=await r("get-session-defaults",{});p=Ft(O?.values)?{...O.values}:{},f={...p},g=Array.isArray(O?.warnings)?O.warnings:[]}catch(O){g=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${O instanceof Error?O.message:String(O)}`)}finally{A=!1,K()}}async function ue(){let O=Yl(p,f);if(Object.keys(O).length!==0){try{let V=await r("set-session-defaults",{values:O});p=Ft(V?.values)?{...V.values}:{},f={...p},g=Array.isArray(V?.warnings)?V.warnings:[]}catch(V){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}K()}}function te(O,V){V===qt?delete f[O]:f[O]=V,K(),ue()}async function se(){let O=t.queueStore?.get();if(!Ft(O))return;let V={orchestration_model:O.orchestration_model??null,orchestration_effort:O.orchestration_effort??null,orchestration_speed:O.orchestration_speed??null},de=Kl(V,{...V,...q});if(Object.keys(de).length!==0){try{let Se=await r("worker-queue-set-orchestration-defaults",{expected_revision:O.revision,values:de});if(Se&&Se.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}q={}}catch(Se){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Se instanceof Error?Se.message:String(Se)}`)}K()}}function Ie(O,V){q[O]=V===qt?null:V,K(),se()}async function Ne(O){let V=t.queueStore?.get();if(!(!Ft(V)||O<1)){try{await r("worker-queue-set-slots",{expected_revision:V.revision,slots:O})}catch(de){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${de instanceof Error?de.message:String(de)}`)}K()}}function He(){let O={};for(let V of Hl){let de=f[V];typeof de=="string"&&de.length>0&&(O[V]=de)}return O}async function Xe(){let O=Q();if(!O)return;let V=He();if(Object.keys(V).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let de=(O.presets||[]).find(qe=>qe.id===F),Se=R.trim()||(de?de.name:"");if(!Se){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let qe=de?await r("impl-preset-update",{expected_revision:O.revision,id:de.id,name:Se,settings:V}):await r("impl-preset-create",{expected_revision:O.revision,name:Se,settings:V});if(qe&&qe.applied){if(R="",!de&&Array.isArray(qe.presets)){let tt=qe.presets.find(rt=>rt.name===Se);F=tt?tt.id:F}K()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),K()}catch(qe){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${qe instanceof Error?qe.message:String(qe)}`)}}async function Ve(){let O=Q();if(!(!O||F.length===0))try{let V=await r("impl-preset-delete",{expected_revision:O.revision,id:F});V&&V.applied?(F="",K()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),K())}catch(V){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function Ze(){let O=Q();if(!(!O||F.length===0)){try{let V=await r("apply-impl-preset-global",{preset_id:F,expected_revision:O.revision});V&&V.applied?(p=Ft(V.values)?{...V.values}:{},f={...p},g=Array.isArray(V.warnings)?V.warnings:[]):V&&V.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(V){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}K()}}async function fe(){Z=!0,C=!1,K();try{let O=await r("get-worker-system-prompt",{});!O||typeof O!="object"||Array.isArray(O)?C=!0:k=O}catch{C=!0}finally{Z=!1,K()}}function Re(){if(j=!j,j&&!k){fe();return}K()}function ie(){let O=nn({loading:Z,error:C});if(O)return O;if(!k)return"";let V=Array.isArray(k.variants)?k.variants:[];return c`<div class="settings-dialog__sp-body">
      ${k.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${k.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${V.map(de=>c`<div class="settings-dialog__sp-variant" data-variant=${de.key}>
            <div class="settings-dialog__sp-cond">${de.condition}</div>
            ${yr(de.label,de.system_prompt)}
          </div>`)}
    </div>`}function ke(){return c`<section
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
        aria-expanded=${j?"true":"false"}
        @click=${Re}
      >
        ${j?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${j?ie():""}
    </section>`}function me(O,V,de,Se,qe,tt){let rt=qe[O]??qt,Fe=Xo(O,de,qe,U(),L()),Oe=Fe.options.find(et=>et.value===rt),De=rt===qt?Fe.full_value:Oe?.full_value;return c`<select
        class=${rt===qt?"settings-dialog__unset":""}
        data-key=${O}
        aria-label=${V}
        title=${De||""}
        ?disabled=${tt===!0||Fe.disabled}
        .value=${Br(String(rt))}
        @change=${et=>Se(O,String(et.target.value))}
      >
        <option value=${qt} ?selected=${rt===qt}>
          ${Fe.unset_label}
        </option>
        ${Fe.options.map(et=>c`<option
              value=${et.value}
              title=${et.full_value||""}
              ?selected=${et.value===rt}
            >
              ${et.label}
            </option>`)}
      </select>
      ${rt===qt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function J(O,V,de,Se,qe,tt=!1){return c`<div
      class=${`settings-dialog__row${tt?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        ${me(O,V,de,Se,qe,tt)}
      </span>
    </div>`}function H(O,V,de,Se,qe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${V}-on)`}
        ></i>
        ${O}
      </span>
      <span class="settings-dialog__controls">
        ${me(de,`${O} \uBAA8\uB378`,Se,te,f,!1)}
        ${me(qe,`${O} effort`,qs,te,f,!1)}
      </span>
    </div>`}function Ae(){let O=L(),V=Vl(f),de=f.impl_runtime,Se=f.impl_model,qe=Q(),tt=U()?.supported===!0,rt=Xo("workflow_mode",Ln,f,U(),O);return c`
      <section
        class=${`settings-dialog__pane${i==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${g.length>0?c`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${g.join(", ")}
            </div>`:""}
        ${tt?"":c`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${A?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
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
                        @click=${()=>te("workflow_mode",qt)}
                      >
                        ${rt.unset_label}
                      </button>
                      ${f.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Ln.map(Fe=>c`<button
                            type="button"
                            data-mode=${Fe}
                            aria-pressed=${String(f.workflow_mode===Fe)}
                            @click=${()=>te("workflow_mode",Fe)}
                          >
                            ${Fe}
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
                ${H("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",On,"spec_review_effort")}
                ${H("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ns,"plan_review_effort")}
                ${H("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",On,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${J("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Ds,te,f)}
                ${J("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ms,te,f,V)}
                ${J("impl_model","\uBAA8\uB378",Fs(O,de),te,f,V)}
                ${J("impl_effort","effort",sn(O,de,Se),te,f,V)}
                ${J("impl_speed","\uC18D\uB3C4",In,te,f,V)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Br(F)}
                  @change=${Fe=>{F=String(Fe.target.value),K()}}
                >
                  <option value="" ?selected=${F===""}>
                    구현 프리셋…
                  </option>
                  ${(qe?.presets||[]).map(Fe=>c`<option
                        value=${Fe.id}
                        ?selected=${Fe.id===F}
                      >
                        ${Fe.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${F.length===0}
                  @click=${Ze}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${F?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Br(R)}
                  @input=${Fe=>{R=String(Fe.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Xe}
                >
                  ${F?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${F.length===0}
                  @click=${Ve}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function $e(){let O=t.queueStore?.get(),V=L(),de={orchestration_model:q.orchestration_model??(Ft(O)?O.orchestration_model:null),orchestration_effort:q.orchestration_effort??(Ft(O)?O.orchestration_effort:null),orchestration_speed:q.orchestration_speed??(Ft(O)?O.orchestration_speed:null)},Se=js(V,$),qe=sn(V,$||void 0,de.orchestration_model||lr).filter(rt=>rt!==lr),tt=Ft(O)&&typeof O.slots=="number"?O.slots:2;return c`
      <section
        class=${`settings-dialog__pane${i==="worker"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-worker"
        aria-label="Worker 설정"
      >
        <header class="settings-dialog__pane-head"><h2>Worker 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          Worker가 세션을 띄울 때 쓰는 오케스트레이션 설정과 동시 실행 수입니다.
        </p>
        ${U()?.supported!==!0?c`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`:""}
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">오케스트레이션</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">런타임</span>
            <span class="settings-dialog__controls">
              <select
                aria-label="런타임"
                data-key="orchestration_runtime_filter"
                .value=${Br($||qt)}
                @change=${rt=>{let Fe=String(rt.target.value);$=Fe===qt?null:Fe,K()}}
              >
                <option value=${qt} ?selected=${!$}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${$==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${$==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${J("orchestration_model","\uBAA8\uB378",Se,Ie,de)}
          ${J("orchestration_effort","effort",qe,Ie,de)}
          ${J("orchestration_speed","\uC18D\uB3C4",In,Ie,de)}
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
                  @click=${()=>Ne(tt-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${tt}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Ne(tt+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${ke()}
      </section>
    `}function oe(){let O=n.get();return c`
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
        ${O?c`
              ${Vc(O,s(),B)}
              ${Yc(O,d,{onDraft:V=>{d=V},onAdd:M,onRemove:Y})}
              ${Kc(O,_e)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function ge(O){let V=n.get();if(V)try{let de=await r("display-policy-set",{expected_revision:V.revision,policy:O(V)});W(de),de&&de.conflict&&de.policy&&(de=await r("display-policy-set",{expected_revision:de.policy.revision,policy:O(de.policy)}),W(de)),de&&de.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function W(O){O&&O.policy&&typeof O.policy=="object"&&n.set(O.policy)}function x(O){ge(O)}function B(O){let V=n.get();if(!V)return;let de=!G_(O,V);x(Se=>V_(O,Se,de))}function M(){let O=d.trim();O.length!==0&&(d="",x(V=>V.hidden_prefixes.includes(O)?{hidden_prefixes:V.hidden_prefixes}:{hidden_prefixes:[...V.hidden_prefixes,O]}),K())}function Y(O){x(V=>({hidden_prefixes:V.hidden_prefixes.filter(de=>de!==O)}))}function _e(O){let V=n.get();if(!V)return;let de=V.chips[O]===!1;x(()=>({chips:{[O]:de}}))}function K(){Be(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${H_.map(O=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${O.id}
                  aria-selected=${String(i===O.id)}
                  aria-controls=${`settings-pane-${O.id}`}
                  @click=${()=>ce(O.id)}
                >
                  <span class="settings-dialog__glyph">${O.glyph}</span>
                  ${O.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${Ge}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${Ae()} ${$e()} ${oe()}
          </div>
        </div>
      `,a)}function ce(O){i=O,K()}let be=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",be),a.addEventListener("cancel",be);let Le=O=>{O.target===a&&Ge()};a.addEventListener("click",Le);let Je=null;n.subscribe&&(Je=n.subscribe(()=>{l&&K()}));let ot=null;t.implPresetStore?.subscribe&&(ot=t.implPresetStore.subscribe(()=>{l&&K()}));function Ye(O="session"){l||(l=!0,t.onOpenChange?.(!0),i=O,d="",q={},K(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),pe())}function Ge(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Ye,close:Ge,sessionDraft:()=>({...f}),destroy(){l=!1,a.removeEventListener("close",be),a.removeEventListener("cancel",be),a.removeEventListener("click",Le),Je&&(Je(),Je=null),ot&&(ot(),ot=null),a.remove()}}}function G_(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function V_(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Y_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Xc(e){return String(e).padStart(2,"0")}function K_(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Z_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Xc(n.getHours())}:${Xc(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Y_[n.getMonth()]} ${n.getDate()} ${o}`;return`${K_(r,t)} \xB7 ${i}`}function X_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Qc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Jc(e){let t=!1,r=null,n=new Map;function s(){Be(c``,e),e.hidden=!0}function o(){let l=Qc.filter(p=>n.has(p.key));if(l.length===0){s();return}let d=Date.now();Be(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(p=>{let f=n.get(p.key),g=typeof f.ageSeconds=="number"&&f.ageSeconds>600,A=g?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${g?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${f.windows.map($=>{let q=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,F=Math.min(100,Math.max(0,q)),j=`resets ${Z_($.resetsAt,d)}${g?` \xB7 ${A}`:""}`;return c`<span
                class="usage-meter__window ${X_(F)}"
                style=${`--progress: ${F}%`}
                title=${j}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${F}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let p=await d.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let l=await Promise.all(Qc.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function ed(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Q_="worker-ineligible";function ga(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ba(e){return ga(e).includes(Q_)}var J_="worker-serial";function ha(e){return ga(e).includes(J_)}function ya(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var em=new Set(["done","failed","orphaned","stopped","discarded"]),tm={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},rm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},nm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function va(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:nm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function td(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,d=new Map,p=!1,f=null,g=null,A=null,$=new Set,q=!1,F=0,R=null,j=new Set;function Z(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function C(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function k(){return o&&o()||""}async function L(){if(!s)return;let y=++F;q=!0,A=null,$.clear(),Oe();try{let S=await s("worker-parallel-analysis-targets",{root_dir:k()});if(y!==F||!De)return;let P=Array.isArray(S?.qualified)?S.qualified:[],D=Array.isArray(S?.excluded)?S.excluded:[];A={qualified:P,excluded:D};for(let he of P)he&&typeof he.id=="string"&&$.add(he.id)}catch{y===F&&De&&(A={qualified:[],excluded:[]},re("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{y===F&&(q=!1,De&&Oe())}}function U(y){return Array.isArray(y.runs)?y.runs:[]}function Q(){let y=Z(),S=new Set;for(let P of Object.values(y.attempts||{})){let D=P;D&&typeof D.bead_id=="string"&&!em.has(D.status)&&S.add(D.bead_id)}for(let P of Array.isArray(y.pr_wait)?y.pr_wait:[])P&&typeof P.bead_id=="string"&&S.add(P.bead_id);for(let P of Object.values(y.discard_operations||{})){let D=P;D&&D.phase!=="done"&&typeof D.bead_id=="string"&&S.add(D.bead_id)}return S}function pe(y){return y.filter(S=>ue(S)===null)}function ue(y){let S=Z();for(let P of Array.isArray(S.serial_lanes)?S.serial_lanes:[])if(Array.isArray(P?.entries)&&P.entries.some(D=>D.bead_id===y))return P.id;return(Array.isArray(S.queue)?S.queue:[]).some(P=>P.bead_id===y)?"parallel":null}function te(y,S){let P=l.get(y);return P||[...S.order]}function se(y){if(y.length<2)return!1;let S=ue(y[0]);if(!S||S==="parallel")return!1;let P=Z(),D=(Array.isArray(P.serial_lanes)?P.serial_lanes:[]).find(ve=>ve.id===S)?.entries.map(ve=>ve.bead_id);if(!Array.isArray(D))return!1;let he=y.map(ve=>D.indexOf(ve));return he.every(ve=>ve>=0)&&he.every((ve,ae)=>ae===0||ve>he[ae-1])}function Ie(){let y=Z(),S=Array.isArray(y.serial_lanes)?y.serial_lanes:[],P=S.find(D=>Array.isArray(D.entries)&&D.entries.length===0);return P?P.id:S[0]?.id||"s1"}function Ne(y){let S=Z().bead_titles||{};return typeof S[y]=="string"?S[y]:y}async function He(y,S){if(!s||p)return null;p=!0,Oe();try{return await s(y,S)}finally{p=!1,Oe()}}async function Xe(y){n?.setPending?.(!0);try{let S=await He("worker-parallel-analysis-start",{force:y,target_ids:Array.from($)});S&&S.applied===!1&&S.reason&&(S.reason==="target_not_qualified"&&Array.isArray(S.detail)?re(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${S.detail.join(", ")}`,"error",3200):re(`\uBD84\uC11D \uC2E4\uD328: ${S.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function Ve(){let y=C().job;!s||!y||await s("worker-parallel-analysis-cancel",{job_id:y.job_id})}async function Ze(y){if(!(!s||j.has(y))){j.add(y),Oe();try{let S=await s("worker-parallel-analysis-prompt",{root_dir:k(),run_id:y});if(!De)return;if(S?.ok===!0&&typeof S.prompt=="string"){R={run_id:y,prompt:S.prompt};return}re(S?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{j.delete(y),Oe()}}}function fe(){R=null,Oe()}async function Re(){if(!R)return;let y=await Zt(R.prompt);re(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)}function ie(y,S){a&&a(y,va(S))}function ke(){return Z().runner_catalog}function me(y){return Object.keys(ke()?.runners?.[y]?.models||{})}function J(y){let S=me(y),P=ke()?.runners?.[y]?.default_model;return typeof P=="string"&&S.includes(P)?P:S[0]||""}function H(){let y=C().settings,S=f||y.runner||"claude",P=me(S),D=f?J(S):y.model||P[0]||"",he=ya(ke(),S,D),ve=y.effort||"",ae=he.includes(ve)?ve:he[0]||"";return{runner:S,model:D,effort:ae,models:P,efforts:he}}async function Ae(y){let S=C().settings,P=await He("worker-parallel-analysis-settings-update",{expected_revision:S.revision,runner:y.runner,model:y.model,effort:y.effort});(!P||P.applied!==!0)&&(f=null,Oe(),P&&P.reason&&re(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${P.reason}`,"error",2800))}function $e(y){f=y,Oe();let S=H();Ae({runner:y,model:S.model,effort:S.effort})}function oe(y){let S=H(),P=ya(ke(),S.runner,y);Ae({runner:S.runner,model:y,effort:P.includes(S.effort)?S.effort:P[0]||""})}function ge(y){let S=H();Ae({runner:S.runner,model:S.model,effort:y})}async function W(y,S){if(!s||p)return;let P=te(y,S),D=C();if(P.length<2||!D.last_good){re("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let he=d.get(y)||Ie(),ve=()=>({snapshot_digest:D.last_good.identity_digest,group_index:y,lane:he,ordered_bead_ids:P,expected_revision:Z().revision});p=!0,Oe();try{let ae=await s("worker-parallel-analysis-submit",ve());ae&&ae.queue&&r&&r.set(ae.queue),ae&&ae.applied!==!0&&ae.conflict===!0&&(ae=await s("worker-parallel-analysis-submit",ve()),ae&&ae.queue&&r&&r.set(ae.queue)),ae&&ae.applied===!0?(l.delete(y),re(`\uC9C1\uB82C \uB808\uC778 ${he}\uC5D0 ${P.length}\uAC1C \uBC30\uCE58`,"success")):re(`\uC81C\uCD9C \uAC70\uBD80: ${ae?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{p=!1,Oe()}}function x(y,S,P){l.set(y,te(y,S).filter(D=>D!==P)),Oe()}function B(y){l.delete(y),Oe()}function M(y,S,P,D){let he=[...te(y,S)],ve=he.indexOf(P),ae=ve+D;ve<0||ae<0||ae>=he.length||(he.splice(ae,0,...he.splice(ve,1)),l.set(y,he),Oe())}function Y(){let y=C().settings,S=Object.keys(ke()?.runners||{}),P=H();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${D=>$e(D.target.value)}
        >
          ${S.map(D=>c`<option
                value=${D}
                ?selected=${P.runner===D}
              >
                ${D}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${D=>oe(D.target.value)}
        >
          ${P.models.map(D=>c`<option
                value=${D}
                ?selected=${P.model===D}
              >
                ${D}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${D=>ge(D.target.value)}
        >
          ${P.efforts.map(D=>c`<option
                value=${D}
                ?selected=${P.effort===D}
              >
                ${D}
              </option>`)}
        </select>
      </label>
      ${_e(y)}
    </div>`}function _e(y){return!ce(y)||K(y)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:y.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${y.runner}/${y.model} · effort
        ${y.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:y.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function K(y){return y.is_default===!0&&y.compatible===!1}function ce(y){return!!(y.runner&&y.model&&y.effort)}function be(y){return ce(y)&&y.compatible!==!1}function Le(y){let S=Math.max(0,Math.floor(y/1e3)),P=Math.floor(S/60),D=S%60;return`${P}:${String(D).padStart(2,"0")}`}function Je(y){let S=y.job;if(S){let P=typeof S.started_at=="number"?S.started_at:0,D=`${S.runner||"?"}/${S.model||"?"}`,he=P?` \xB7 \uACBD\uACFC ${Le(Date.now()-P)}`:"",ve=typeof S.session_id=="string"?S.session_id:"",ae=U(y).find(Ke=>Ke.run_id===S.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${D} · effort ${S.effort||"?"}${he}</span
        >
        ${ve?c`<code class="pa-session-id" title=${ve}
              >${ve.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ie(S.job_id,ae||S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ae?.prompt_saved!==!0||j.has(S.job_id)}
          @click=${()=>{Ze(S.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return ot()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function ot(){return n?.isPending?.()===!0}function Ye(y){let S=!!y.job,P=be(y.settings),D=A!==null&&$.size===0,he=S||p||ot()||q;return c`<div class="pa-meta">
      ${y.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(y.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${Je(y)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!P||he||D}
        @click=${()=>{Xe(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!P||he||D}
        @click=${()=>{Xe(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!S}
        @click=${()=>{Ve()}}
      >
        취소
      </button>
    </div>`}function Ge(y){return typeof y=="string"&&y.length>0?y:"\uBBF8\uBC30\uCE58"}function O(y,S){S?$.add(y):$.delete(y),Oe()}function V(){let y=A?.qualified||[],S=A?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${q?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${y.length} \xB7 \uC81C\uC678 ${S.length}`}</span
        >
      </header>
      ${A&&y.length>0?c`<ul class="pa-targets__list">
            ${y.map(P=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${P.id}
                      .checked=${$.has(P.id)}
                      @change=${D=>O(P.id,D.target.checked)}
                    />
                    <span class="pa-target__title">${P.title}</span>
                  </label>
                  <span class="pa-target__route">${P.route}</span>
                  <span class="pa-target__lane">${Ge(P.lane)}</span>
                </li>`)}
          </ul>`:A&&y.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${A&&S.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${S.length}</summary>
            <ul class="pa-targets__list">
              ${S.map(P=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${P.title}</span>
                    </label>
                    <span class="pa-target__reason"
                      >${tm[P.reason]||P.reason}</span
                    >
                    <span class="pa-target__lane"
                      >${Ge(P.lane)}</span
                    >
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function de(y){let S=typeof y.session_id=="string"&&y.session_id.length>0,P=S?y.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${y.outcome}"
        >${rm[y.outcome]||y.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(y.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${y.runner||"?"} / ${y.model||"?"} / ${y.effort||"?"}</span
      >
      ${S?c`<code class="pa-session-id" title=${P}
            >${P.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${y.outcome==="failure"&&y.reason?c`<span class="pa-run-row__reason">${y.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ie(y.run_id,y)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${y.prompt_saved!==!0||j.has(y.run_id)}
          @click=${()=>{Ze(y.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Se(y){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${y.length>0?c`<ul class="pa-runs__list">
            ${y.map(S=>de(S))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function qe(){return R?c`<div
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
            <code>${R.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Re()}}>
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
${R.prompt}</pre
        >
      </section>
    </div>`:""}function tt(y,S){let P=te(y,S),D=Q(),he=P.filter(je=>D.has(je)),ve=pe(P),ae=se(P),Ke=Array.isArray(Z().serial_lanes)?Z().serial_lanes:[],xe=d.get(y)||Ie(),gt=S.eligible!==!0||P.length<2||he.length>0||ve.length>0||ae||p;return c`<section class="pa-group" data-group-index=${String(y)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${S.confidence}</span>
        ${S.categories.map(je=>c`<span class="pa-group__category">${je}</span>`)}
        ${ae?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${S.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${ve.length>0?c`<span class="pa-group__stale"
              >stale — ${ve.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${S.reason}</p>
      <ol class="pa-group__members">
        ${P.map((je,$t)=>c`<li class="pa-member" data-bead-id=${je}>
              <span class="pa-member__seq">${$t+1}</span>
              <span class="pa-member__title">${Ne(je)}</span>
              ${D.has(je)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${je}
                ?disabled=${$t===0}
                aria-label=${`${je} \uC704\uB85C`}
                @click=${()=>M(y,S,je,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${je}
                ?disabled=${$t===P.length-1}
                aria-label=${`${je} \uC544\uB798\uB85C`}
                @click=${()=>M(y,S,je,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${je}
                aria-label=${`${je} \uC81C\uC678`}
                @click=${()=>x(y,S,je)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${S.evidence.map(je=>c`<li class="pa-evidence">
              <code>${je.path}</code>
              <span class="pa-evidence__locator">${je.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>B(y)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${je=>{d.set(y,je.target.value),Oe()}}
          >
            ${Ke.map((je,$t)=>c`<option
                  value=${je.id}
                  ?selected=${xe===je.id}
                >
                  직렬 ${$t+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${gt}
          @click=${()=>{W(y,S)}}
        >
          제출
        </button>
      </footer>
    </section>`}function rt(y){let S=Array.isArray(y.issues)?y.issues:[],P=S.filter(he=>he.verdict==="parallel_ok").length,D=S.filter(he=>he.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${P}</span>
      <span>uncertain ${D}</span>
    </div>`}function Fe(){let y=De&&!!C().job;if(y&&g===null){g=setInterval(()=>Oe(),1e3);return}!y&&g!==null&&(clearInterval(g),g=null)}function Oe(){let y=C();f&&y.settings.runner===f&&(f=null);let S=y.last_good?.result;Fe(),Be(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${X}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Y()} ${Ye(y)} ${V()}
            ${S?c`${S.groups.map((P,D)=>tt(D,P))}
                ${S.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${rt(S)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Se(U(y))}
          </div>
        </div>
        ${qe()}
      `,i)}let De=!1,et=()=>{De=!1,R=null,F+=1,Fe()},dt=y=>{y.target===y.currentTarget&&X()};i.addEventListener("close",et),i.addEventListener("cancel",et),i.addEventListener("click",dt);let nt=null;r&&r.subscribe&&(nt=r.subscribe(()=>{De&&Oe()}));let ut=null;n&&n.subscribe&&(ut=n.subscribe(()=>{De&&Oe()}));function z(){De||(De=!0,Oe(),L(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function X(){De&&(De=!1,R=null,F+=1,Fe(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:z,close:X,destroy(){De=!1,g!==null&&(clearInterval(g),g=null),i.removeEventListener("close",et),i.removeEventListener("cancel",et),i.removeEventListener("click",dt),nt&&(nt(),nt=null),ut&&(ut(),ut=null),i.remove()}}}var rd=new Set(["sh","bash","zsh","dash","ksh"]),nd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function sd(e){let t=e.split("/");return t[t.length-1]||""}function sm(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=sd(r[0]);if(n!=="env")return rd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&rd.has(sd(s))}function om(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function am(e){let t=[],r=0;nd.lastIndex=0;for(let n of e.matchAll(nd)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:om(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function im(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function od(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",l=0,d=null,p=!1;function f(k,L){return L?am(k).map(U=>U.kind==="plain"?U.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${U.kind}"
            >${U.text}</span
          >`):k}function g(){if(!s)return c``;let k=o==="ready"&&sm(a),L=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Z()}
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
              @click=${()=>{$()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>Z()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${L.map((U,Q)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${Q+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(U,k)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function A(){Be(g(),n)}async function $(){if(o!=="ready")return;let k=await Zt(a);re(k?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",k?"success":"error")}function q(k){k.key==="Escape"&&s&&(k.preventDefault(),Z())}function F(){p||(document.addEventListener("keydown",q),p=!0)}function R(){p&&(document.removeEventListener("keydown",q),p=!1)}async function j(k,L=null){let U=++l;F(),s={...k},d=L||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",A(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let pe=t?t():"";if(!pe){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",A();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",A();return}let ue="/api/repo-ops-script?workspace="+encodeURIComponent(pe)+"&lane="+encodeURIComponent(k.lane)+"&base_sha="+encodeURIComponent(k.base_sha);try{let te=await r(ue),se=await te.json().catch(()=>({}));if(U!==l)return;if((t?t():"")!==pe){Z();return}if(!te.ok||!se||se.ok!==!0){o="error",i=im(se&&typeof se.error=="string"?se.error:""),A();return}s={lane:se.lane,base_sha:se.base_sha,path:se.path,base_ref:se.base_ref},a=String(se.content),o="ready",A()}catch{if(U!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",A()}}function Z(){l+=1,R(),s=null,a="",A();let k=d;d=null,k?.isConnected&&k.focus()}function C(){Z(),n.remove()}return{open:j,close:Z,destroy:C}}function ad(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let C=o();return typeof C.revision=="number"?C.revision:0}function i(C){t&&C&&C.queue&&typeof C.queue=="object"&&t.set(C.queue)}function l(){let C=o().workspace_info;return C&&typeof C=="object"?C:{}}function d(C,k){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${C}"
      >${k}</span
    >`}function p(C){if(typeof C!="number"||!Number.isFinite(C))return"";let k=C/6e4;return Number.isInteger(k)?`timeout ${k}\uBD84`:`timeout ${Math.round(C/1e3)}\uCD08`}function f(C){let k=p(C);return k?d("config",k):""}function g(C,k,L){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${L.script}
      @click=${U=>{s&&s({lane:C,base_sha:k.base_sha,path:L.script,base_ref:k.base_ref},U.currentTarget)}}
    ></button>`}function A(C){let k=typeof C.base_sha=="string"?C.base_sha:"",L=`${C.source_path||"repo-ops/config.toml"} @ ${C.base_ref||"?"}${k?`@${k.slice(0,7)}`:""}`;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${L}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${C.verify?c`${g("verify",C,C.verify)}
              ${f(C.verify.timeout_ms)}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${C.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${C.deploy?c`${g("deploy",C,C.deploy)}
              ${f(C.deploy.timeout_ms)}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${C.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function $(C){let k=C.repo_ops&&typeof C.repo_ops=="object"?C.repo_ops:null;return k&&(k.status==="resolved"||k.status==="absent")?A(k):k&&(k.status==="pending"||k.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${k.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${k.error_code?c` — <code>${k.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function q(C){if(!r)return;let k=await r("worker-auto-repair-toggle",{on:C,expected_revision:a()});if(i(k),k&&k.conflict){let L=await r("worker-auto-repair-toggle",{on:C,expected_revision:a()});i(L)}n()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function R(C,k,L){return c`<div class="worker-repo-ops__policy-group" data-policy=${L}>
      <div class="worker-repo-ops__policy-label">${C}</div>
      <ul class="worker-repo-ops__policy-list">
        ${k.map(U=>c`<li data-token=${U}>
              ${F[U]||U}
            </li>`)}
      </ul>
    </div>`}function j(C){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${C.map(k=>{let L=[F[k.trigger]||k.trigger];return Number.isInteger(k.attempts_per_operation_attempt)?L.push(`operation\uB2F9 ${k.attempts_per_operation_attempt}\uD68C`):Number.isInteger(k.attempts)?L.push(`${F[k.budget]||k.budget} ${k.attempts}\uD68C`):Number.isInteger(k.sessions_per_user_action)&&L.push(`${k.sessions_per_user_action}\uD68C`,F[k.user_actions]||k.user_actions),k.applies_when&&L.push(F[k.applies_when]||k.applies_when),c`<li data-token=${k.id}>
            <strong>${F[k.id]||k.id}</strong>
            <span>${L.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Z(){let C=o(),k=C.auto_repair!==!1,L=C.repo_operation_policy&&typeof C.repo_operation_policy=="object"?C.repo_operation_policy:null,U=Array.isArray(C.repo_operations)?C.repo_operations:[],Q=U.find(se=>se.state==="repairing"),pe=U.filter(se=>se.state==="failed"||se.state==="repairing"),ue=pe.length?Math.min(...pe.map(se=>typeof se.repair?.remaining=="number"?se.repair.remaining:0)):L?.auto_repair?.resolution_ladder?.find(se=>se.id==="auto_repair_session")?.attempts??1,te=Array.isArray(L?.auto_repair?.resolution_ladder)?L.auto_repair.resolution_ladder:[];return c`<section
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
          .checked=${k}
          @change=${se=>{q(se.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${k?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ue}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${Q?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${Q.repair?.owner_bead||Q.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${L?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(L.worker_automatic||[]).length} · 해결 사다리
                ${te.length} · 금지
                ${(L.never_automatic||[]).length}</span
              >
            </summary>
            ${R("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",L.worker_automatic||[],"worker-automatic")}
            ${L.supported===!1||L.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${L.schema_version})`}
                </div>`:j(te)}
            ${R("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",L.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${$(l())} ${Z()}
      </details>`}}}var lm=20,id={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},ld={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function cm(e,t,r=lm){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function cd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function dm(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function dd(e){let t=e.filter(r=>r.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>c`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function ud(e,t="",r=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function um(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return c`<div class="worker-ev__acts">
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
    ${t.attempt_id?c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function pm(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?vt(e.at):""}
      >${Hs(e.at)||"\u2014"}</span
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
          >${t.target_base}@${Ws(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${zs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${cd(e)}"
          >${dm(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?ud(kc(t.failure_kind,n)):""}
      ${um(t)}
      ${dd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ws(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function fm(e){let t=e.cleanup,r=Ur(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?vt(e.at):""}
      >${Hs(e.at)||"\u2014"}</span
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
        ${bc(t.step).map(n=>c`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${ud(Zs(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?c`<button
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
  </li>`}function _m(e){return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?fm(t):pm(t))}
        </ul>`}
  </section>`}function pd(e,t={}){let r=null;function n(){Be(r?_m(r):c``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:cm(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var mm="tab:worker:ready",gm="tab:worker:blocked",bm="tab:worker:in-progress",hm="tab:worker:closed",Qs=1,fd=5;function _d(e){return Rn(e).path.length>0}var bd="beads-ui.worker.candidate-filter",wa={show_blocked:!1,spec:"all"};function ym(){try{let e=window.localStorage.getItem(bd);if(!e)return{...wa};let t=JSON.parse(e);if(!t||typeof t!="object")return{...wa};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...wa}}}function vm(e){try{window.localStorage.setItem(bd,JSON.stringify(e))}catch{}}function wm(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),d=n(i);l&&d?s.push(i):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var km=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],hd="bdui.worker.candidate_sort",$m=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Js="spec";function xm(){try{let e=window.localStorage.getItem(hd);return e==="board"||e==="created"||e==="spec"?e:Js}catch{return Js}}function Sm(e){try{window.localStorage.setItem(hd,e)}catch{}}var yd="bdui.worker.done-range";function Am(){try{let e=window.localStorage.getItem(yd);return Wt(e)?e:Mt}catch{return Mt}}function Em(e){try{window.localStorage.setItem(yd,e)}catch{}}var Tm="(max-width: 640px)",vd="beads-ui.worker.lane-collapsed",Un={queue:!0,done:!0};function Cm(){try{let e=window.localStorage.getItem(vd);if(!e)return{...Un};let t=JSON.parse(e);return!t||typeof t!="object"?{...Un}:{queue:typeof t.queue=="boolean"?t.queue:Un.queue,done:typeof t.done=="boolean"?t.done:Un.done}}catch{return{...Un}}}function Rm(e){try{window.localStorage.setItem(vd,JSON.stringify(e))}catch{}}function md(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Im(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Nr):(n.sort(os(r)),t==="board"?n:[...n.filter(_d),...n.filter(s=>!_d(s))])}function Lm(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Om(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Pm(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function gd(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Dm(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Mm(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);return t.length===0?null:t==="needs_human"?"\uC644\uB8CC \uC758\uB3C4 \uB300\uAE30 \u2014 \uC0AC\uB78C \uD655\uC778 \uD544\uC694":`\uC644\uB8CC \uC758\uB3C4 \uB300\uAE30 \u2014 ${t}`}function Nm(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function qm(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ka(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Fm(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function jm(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${gd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${gd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Bm(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,d=!0,p=null,f=null,g=null,A={},$=!1,q=!1,F={}){let R=!!l&&l.position>0,j=!!l?.continuation_action&&l.continuation_action.continuation===null,Z=!!l&&l.active===!0,C=l&&l.failure||null,k=Mm(l?l.waiting:null),L=r[e]||null,U=L&&L.gate?L.gate:null,Q=L&&L.pr?L.pr:null,pe=Fm(g),ue=Nm(l?l.resolution:null),te=qm(l?l.head_review:null),se=l&&l.head_review||null,Ie=l&&l.authority||null,Ne=!!se&&["pending","reviewing","revising"].includes(se.state),He=R&&!Z&&(se?.state==="failed"||!Ie||Ie.source==="automatic"&&!q),Xe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ue?ue.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":k,Ve=!!U&&U.base_badge==="\uCDA9\uB3CC",Ze=!!U&&U.enabled===!0,fe=qn({bead_id:e,merge_sha:F.merge_sha,cleanup_cursor:F.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:F.repo_operations}),Re=Ks(fe),ie=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!U&&U.tier==="merged",ke=i&&!!n&&!!U&&U.tier==="merged",me=He&&(Ze||Ve||U?.reason==="base_behind"||U?.reason==="review_receipt_missing"||U?.reason==="review_receipt_stale"||ie||ke),J=i&&Ve&&d===!1,H=cr(A,e,{external:i,merge_active:Z||fe?.step==="merge",merge_queued:R,conflict_active:!!a,cleanup_active:Re,merged:!!n||U?.tier==="merged"}),Ae=!!H.operation,$e=!ie&&!!n&&n.step==="repo_operations",oe=jm({continuation_required:j,merge_step:fe,conflict_badge:Xe,conflict_live:ue?.live===!0||a==="running",head_review:se&&te?{...te,state:se.state,failure_reason:se.failure_reason}:null,recovery:pe,cleanup_failed:n,cleanup_label:n?Ur(n.step):null,base_exception:f,conflicting:Ve,gate:U,queue_failure:C,auto_skip:p,queued:R,queue_active:Z,queue_position:l?l.position:0,activity:Xe?null:o&&o.activity||null}),ge=oe?.live===!0&&oe.title?c`<span title=${oe.title}>${oe.label}</span>`:oe?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:n&&fe?.active!==!0?Ys(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:i,pr_number:Q&&typeof Q.number=="number"?Q.number:null,pr_url:Q&&typeof Q.url=="string"?Q.url:"",completion_badge:oe?.live!==!0&&oe?.title?oe.label:null,completion_title:oe?.title||"",completion_repair_pr_url:pe?pe.repair_pr_url:"",completion_repair_pr_number:pe?pe.repair_pr_number:null,badges:ge?[ge]:[],live_badge:oe?.live===!0?ge:null,usage:s,alert:oe?.alert===!0,merge_action:U?.tier==="merged"&&!ie&&!ke||$e?!1:!R||j||He,timeline_action:$e,cancel_action:R&&!j,cancel_enabled:(!Z||Ne)&&!(pe&&pe.lock_actions),cancel_title:pe&&pe.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":Z&&!Ne?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ne?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:H,discard_action:H.action,merge_step:fe,discard_enabled:H.enabled,discard_title:H.title,merge_enabled:!fe&&!a&&!Ae&&!f&&!(pe&&pe.lock_actions)&&!J&&!$e&&(Ze||Ve||U?.reason==="base_behind"||U?.reason==="review_receipt_missing"||U?.reason==="review_receipt_stale"||ie||ke||me),merge_label:j?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ie||ke?"\uC815\uB9AC \uC7AC\uAC1C":Ve&&!fe&&!ie?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":U?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":U?.reason==="review_receipt_missing"||U?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":He?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ae?H.error?`\uD3D0\uAE30 \uC2E4\uD328: ${H.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${H.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:j?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":fe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${fe.label}`:ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":J?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ie?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ve?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="review_receipt_missing"||U?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ze?`\uBA38\uC9C0 (${U.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:U&&U.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${U&&U.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function $a(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:d,doneRange:p,onDoneRangeChange:f}=t,g=n?is(n,i):null,A=cs({transport:r,uiOrderStore:i}),$=null,q=[],F=ym(),R=xm(),j=Wt(p)?p:Am(),Z=new Map;function C(){let _=or.find(v=>v.value===j);return _?_.label:"\uC624\uB298"}let k=Cm(),L=!1,U=new Set,Q=new Set,pe=new Set,ue=new Set,te=[],se=document.createElement("div");se.className="worker-console";let Ie=document.createElement("div");Ie.className="worker-top";let Ne=document.createElement("div");Ne.className="worker-drawer-overlay",Ne.hidden=!0;let He=document.createElement("div");He.className="worker-drawer-overlay__backdrop";let Xe=document.createElement("div");Xe.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,Ne.append(He,Xe,Ve);let Ze=document.createElement("div");Ze.className="worker-lanes-host",se.append(Ie,Ne,Ze),e.appendChild(se);let fe=null,Re=null,ie=Ls(Xe,{transport:r,sessionLogStore:a,onClose:()=>{fe=null,Re=null,Ne.hidden=!0,D()}}),ke=pd(Ve,{onClose:()=>{Ve.hidden=!0,Ne.hidden=!0,D()}}),me=od({getWorkspacePath:d||(()=>"")}),J=d&&d()||"",H=ad({queueStore:s,transport:r,onChanged:()=>D(),onOpenScript:(_,v)=>{me.open(_,v)}}),Ae=o?td(se,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(_,v)=>pr(_,v)}):null;function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Qs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function oe(){let _=$e();return typeof _.revision=="number"?_.revision:0}function ge(_){_&&_.queue&&s&&s.set(_.queue)}function W(){let _=$e().queue;return Array.isArray(_)?_.length:0}async function x(_,v,T){if(!r)return;let m=()=>({bead_id:_,...v==="parallel"?{}:{lane:v},index:T,expected_revision:oe()}),I=await r("worker-queue-place",m());ge(I),I&&I.conflict&&await r("worker-queue-place",m()).then(ge)}async function B(_,v,T){if(!r)return;let m=()=>({bead_id:_,...v==="parallel"?{}:{lane:v},to_index:T,expected_revision:oe()}),I=await r("worker-queue-reorder",m());ge(I),I&&I.conflict&&await r("worker-queue-reorder",m()).then(ge)}async function M(_){if(!r)return;let v=await r("worker-queue-remove",{bead_id:_,expected_revision:oe()});ge(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:_,expected_revision:oe()}).then(ge)}async function Y(_){if(!r||!_)return;let v=await r("worker-attempt-pause",{attempt_id:_});v&&v.paused===!1&&v.reason&&re(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function _e(_){if(!r||!_)return;let v=await Jr();if(v===null)return;let T=async(I={})=>await r("worker-attempt-resume",{attempt_id:_,expected_revision:oe(),...v!==""?{instructions:v}:{},...I}),m=await T();ge(m),m&&m.conflict&&(m=await T(),ge(m)),m=await _r(m,(I,ee)=>T({continuation:I,decision_token:ee}),{onResult:ge,refresh:()=>T()}),m&&m.resumed===!1&&!m.conflict&&m.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function K(_){if(!r||!_)return;let v=await r("worker-attempt-dismiss",{attempt_id:_,expected_revision:oe()});ge(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:_,expected_revision:oe()}),ge(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&re(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function ce(_,v,T=!0){if(!r)return null;let m=r,I=await m(_,{...v,expected_revision:oe()});return ge(I),I&&I.conflict&&T&&(I=await m(_,{...v,expected_revision:oe()}),ge(I)),I}async function be(_){if(!r||!_)return;let v=$e().merge_queue?.find(m=>m.bead_id===_)?.continuation_action;if(v?.mismatch&&v.continuation===null){await Je(_,v.mismatch);return}U.add(_),D();let T;try{T=await ce("worker-merge-queue-add",{bead_id:_})}finally{U.delete(_),D()}!T||T.conflict||T.applied||re(Dm(T.reason),"error",2400)}async function Le(_){if(!(!r||!_||Q.has(_))){Q.add(_),D();try{let v=await r("worker-cleanup-retry",{bead_id:_,expected_revision:oe()});ge(v),v&&!v.retried&&!v.conflict&&v.reason&&re(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{Q.delete(_),D()}}}async function Je(_,v){let T=await _r({continuation_mismatch:v},(I,ee)=>ce("worker-merge-queue-add",{bead_id:_,continuation:I,decision_token:ee},!1)),m=T?.queue?.merge_queue?.find(I=>I.bead_id===_)?.continuation_action;if(T?.applied!==!0&&m?.continuation===null&&m.mismatch){await Je(_,m.mismatch);return}T&&T.applied===!1&&!T.conflict&&re("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function ot(_){if(!r)return;let v=await ce("worker-merge-auto-toggle",{on:_});!v||v.conflict||re(_?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",_?"success":"info",2400)}async function Ye(_){if(!r||!_)return;let v=await ce("worker-merge-queue-remove",{bead_id:_});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&re("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ge(){await ce("worker-merge-queue-remove",{all:!0})}async function O(_,v=null,T="unmerged",m=null){if(!r||!_)return;let I=Dn(_,T);if(!(!!m||typeof globalThis.confirm!="function"||globalThis.confirm(I)))return;let le=await r("worker-discard",{bead_id:_,...v?{attempt_id:v}:{},...m?{operation_id:m}:{},expected_revision:oe()});if(ge(le),le&&le.conflict&&(le=await r("worker-discard",{bead_id:_,...v?{attempt_id:v}:{},...m?{operation_id:m}:{},expected_revision:oe()}),ge(le)),le&&le.discarded===!0){re(Gs(le),"success",5e3);return}if(le&&le.reason){re(`\uD3D0\uAE30 \uC2E4\uD328: ${le.reason}`,"error",2800);return}if(le&&le.accepted&&le.pending==="merged_revert"){re("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(le&&le.accepted&&!le.discarded){re(`\uD3D0\uAE30 \uC9C4\uD589: ${le.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}le&&!le.conflict&&re("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function V(_,v,T){if(!(!r||!v||!T||ue.has(v))){ue.add(v),D();try{let m=await r(_,{bead_id:v,action_id:T,expected_revision:oe()});ge(m),m?.conflict?re("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!m?.ok&&m?.reason&&re(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(m.reason)}`,"error",2800)}finally{ue.delete(v),D()}}}async function de(_,v){if(!r||!v||pe.has(v))return;pe.add(v),D();let T;try{let m=async(I={})=>await r(_,{bead_id:v,expected_revision:oe(),...I});T=await m(),ge(T),T&&T.conflict&&(T=await r(_,{bead_id:v,expected_revision:oe()}),ge(T)),_==="worker-revise-fix"&&(T=await _r(T,(I,ee)=>m({continuation:I,decision_token:ee}),{onResult:ge,refresh:()=>m()}))}finally{pe.delete(v),D()}if(!(!T||T.conflict)){if(T.ok){re(_==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}re(`\uCC98\uBD84 \uAC70\uBD80: ${T.reason||""}`,"error",3e3)}}async function Se(_){if(!r)return;let v=await r("worker-automation-toggle",{on:_,expected_revision:oe()});ge(v),v&&v.conflict&&await r("worker-automation-toggle",{on:_,expected_revision:oe()}).then(ge)}async function qe(_){if(!r||!_)return;let v=await r("worker-repo-operation-repair",{operation_id:_});if(ge(v),v&&v.ok===!1){re(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&re("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function tt(_){if(!r||!_)return;let v=await r("worker-repo-operation-dismiss",{operation_id:_});ge(v),v&&v.ok===!1&&re(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function rt(_){if(!r||!Number.isFinite(_))return;let v=Math.max(Qs,Math.floor(_)),T=await r("worker-queue-set-slots",{slots:v,expected_revision:oe()});ge(T),T&&T.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:oe()}).then(ge)}async function Fe(_){if(!r||!Number.isInteger(_)||_<1||_>fd)return;let v=$e(),T=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(_).reduce((ee,le)=>ee+(Array.isArray(le?.entries)?le.entries.length:0),0),m=()=>({count:_,expected_revision:oe()}),I=await r("worker-queue-set-serial-lane-count",m());ge(I),I&&I.conflict&&(I=await r("worker-queue-set-serial-lane-count",m()),ge(I)),I&&I.applied&&T>0&&re(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${T}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Oe(){let _=$e(),v=g?g.selectBoardColumn(mm,"ready"):[],T=g?g.selectBoardColumn(gm,"blocked"):[],m=g?g.selectBoardColumn(hm,"closed"):[],I=g?g.selectBoardColumn(bm,"in_progress"):[],ee=new Map;for(let b of I){let N=Om(b);if(!N)continue;let ne=ee.get(N);ne?ne.push(b):ee.set(N,[b])}let le=b=>{let N=ls(ee.get(b)||[]);return N?N.title||N.id:null},Ce=_.bead_titles||{},Ee=new Map;for(let[b,N]of Object.entries(Ce))typeof N=="string"&&N.length>0&&Ee.set(b,N);for(let b of[...v,...T])Ee.set(b.id,b.title||b.id);let at=_.bead_times&&typeof _.bead_times=="object"&&!Array.isArray(_.bead_times)?_.bead_times:{},lt=_.bead_labels&&typeof _.bead_labels=="object"&&!Array.isArray(_.bead_labels)?_.bead_labels:{},h=new Map;for(let[b,N]of Object.entries(lt))Array.isArray(N)&&h.set(b,ha(N));for(let b of[...v,...T]){let N=b.labels;Array.isArray(N)&&!h.has(b.id)&&h.set(b.id,ha(N))}let u=new Map,E=o?.get()?.last_good?.result?.groups;for(let b of Array.isArray(E)?E:[]){if(b?.eligible!==!0||!Array.isArray(b.members))continue;let N=b.members.map(Me=>{let pt=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).find(Vt=>Vt.entries.some(At=>At.bead_id===Me));return pt?pt.id:null});if(!(N.every(Me=>Me!==null)&&new Set(N).size===1))for(let Me of b.members)u.set(Me,b.members.filter(pt=>pt!==Me))}let w=_.bead_blocked_by&&typeof _.bead_blocked_by=="object"&&!Array.isArray(_.bead_blocked_by)?_.bead_blocked_by:{},G=new Map;for(let[b,N]of Object.entries(at))N&&typeof N=="object"&&G.set(b,N);for(let b of[...v,...T])G.set(b.id,{created_at:b.created_at,updated_at:b.updated_at});let we=b=>G.get(b)||{},ye=_.pr_wait||[],We=_.pr_observations||{},Pe=_.pr_activity||{},mt=_.cleanup_failed||{},sr=Object.entries(mt).map(([b,N])=>({bead_id:b,step:N&&N.step?N.step:"",reason:N&&N.reason?N.reason:"",at:N&&typeof N.at=="number"?N.at:null,detail:N&&typeof N.detail=="string"?N.detail:null,output_tail:N&&typeof N.output_tail=="string"&&N.output_tail?N.output_tail:void 0,log_path:N&&typeof N.log_path=="string"&&N.log_path?N.log_path:void 0,retry_count:N&&typeof N.retry_count=="number"&&Number.isInteger(N.retry_count)&&N.retry_count>0?N.retry_count:0,failure_code:N&&typeof N.failure_code=="string"?N.failure_code:void 0,subject_id:N&&typeof N.subject_id=="string"?N.subject_id:void 0,repair_eligible:!!(N&&N.repair_eligible),repair:N&&N.repair?N.repair:void 0})),an=_.queue||[],Te=new Set([...an.map(b=>b.bead_id),...(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).flatMap(b=>(Array.isArray(b?.entries)?b.entries:[]).map(N=>N.bead_id)),...ye.map(b=>b.bead_id),..._.done.map(b=>b.bead_id)]),bt=new Set(T.map(b=>b.id)),ln=i?i.get()?.order||{}:{},Ea=new Set,Ta=[];for(let b of[...v,...T])Te.has(b.id)||Ea.has(b.id)||Lm(b)||Object.hasOwn(b,"labels")&&ba(b.labels)||(Ea.add(b.id),Ta.push(b));q=Im(Ta,R,ln);let Od=_.admission||{},Ca=b=>{let N=Od[b];if(!N)return"";if(N.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof N.reason=="string"?N.reason:"",Me=ne.indexOf(":");return Me>0&&Me<ne.length-1?`\u26D4 ${ne.slice(0,Me)} (${ne.slice(Me+1)})`:`\u26D4 ${ne}`},Pd=q.map(b=>{let N=Rn(b),ne=N.path.length>0,Me=b.workflow?.route==="quick_fix"||b.metadata&&b.metadata.route==="quick_fix",pt=!Object.hasOwn(b,"description")||typeof b.description=="string"&&b.description.trim().length>0,At=!(Object.hasOwn(b,"labels")&&ba(b.labels))&&(Me?pt:ne&&!N.conflict),ct=bt.has(b.id),Yt=[];ct&&Yt.push(Pm(b)),Me&&!pt?Yt.push("missing_description"):!Me&&N.conflict?Yt.push("spec_id_conflict"):!Me&&!ne&&Yt.push("spec \uC5C6\uC74C");let Zn=Ca(b.id);return Zn&&Yt.push(Zn),{id:b.id,title:b.title||b.id,reason:Yt.join(" \xB7 "),draggable:At,lane:"candidate",created_at:b.created_at,updated_at:b.updated_at,workflow:b.workflow,is_quick_fix:Me,status:b.status,blocked:ct,has_spec:ne}}),eo=wm(Pd,F),Dd=eo.visible,Md=_.revise_parked||{},Wn=_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},to=(b,N)=>b.map((ne,Me)=>{let pt=N!=="done",Vt=N!=="done"&&N!=="queue",At=pt?Md[ne.bead_id]:null,ct=pt?cr(Wn,ne.bead_id):null,Yt=ct?.operation?ct:null,Zn=pt&&h.get(ne.bead_id)===!0,Ja=w[ne.bead_id]||[],ao=_.admission&&typeof _.admission=="object"?_.admission[ne.bead_id]:null,io=pt?mc(ao,!!Yt||ue.has(ne.bead_id)):null,Kd=pt&&!io?Ca(ne.bead_id):null,Zd=pt?[Kd]:[],ei=pt&&Ja.length>0&&typeof ao?.reason=="string"&&ao.reason.startsWith("not_ready")?[`\u23F8 ${Ja.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],lo=pt?u.get(ne.bead_id):void 0;return lo&&lo.length>0&&ei.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${lo.join(", ")}\uC640`),{id:ne.bead_id,title:Ee.get(ne.bead_id)||ne.bead_id,reason:Zd.filter(Boolean).join(" \xB7 "),draggable:pt&&!Yt&&!io,done:N==="done",lane:N,seq:Vt?Me+1:void 0,worker_serial:Zn,discard:Yt,stale_work:io,badges:[...ei,...At?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!At,revise_action:!!At,revise_enabled:!!At&&!Yt&&!pe.has(ne.bead_id),revise_title:At?At.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${At.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:N==="done"?zt(_.attempts||{},ne.bead_id):null,work_ms:N==="done"?fc(_.attempts||{},ne.bead_id):null,done_at:N==="done"&&typeof ne.added_at=="number"?ne.added_at:void 0,...we(ne.bead_id)}}),zr=_.attempts?Object.values(_.attempts):[],ro=new Set;for(let b of zr)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&ro.add(b.resumed_from);let Ra=new Map;for(let b of zr)Ra.set(b.bead_id,b.attempt_id);let zn=new Map;for(let b of zr)zn.set(b.attempt_id,b);function no(b){let N=new Set,ne=b;for(;ne&&!N.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;N.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&zn.get(ne.resumed_from)||null}return!1}let Hn=typeof _.declared_base=="string"?_.declared_base:null;function Nd(b){let N=null;for(let ne of zr)!ne||ne.bead_id!==b||no(ne)||(N===null||(typeof ne.started_at=="number"?ne.started_at:0)>=(typeof N.started_at=="number"?N.started_at:0))&&(N=ne);return N&&typeof N.target_base=="string"?N.target_base:null}let Ia=[],La=[],qd=ed(_),Oa=b=>{let N=typeof b.session_id=="string"&&b.session_id.length>0,ne=ro.has(b.attempt_id);return{eligible:N&&!ne,reason:N?ne?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Gt=null;for(let b of zr){let N=b.status==="paused"&&!ro.has(b.attempt_id);if(b.status==="running"||N)La.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:Ee.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,paused:N,conflict_resolution:no(b),base_exception:ka(Hn,b.target_base),can_pause:typeof b.session_id=="string"&&b.session_id.length>0,discard:cr(Wn,b.bead_id,{attempt_id:b.attempt_id}),usage:zt(_.attempts||{},b.bead_id),current_child:le(b.bead_id),...we(b.bead_id)});else if((b.status==="failed"||b.status==="orphaned")&&qd(b)){let ne=Oa(b);Ia.push({bead_id:b.bead_id,attempt_id:b.attempt_id,title:Ee.get(b.bead_id)||b.bead_id,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,continuation_mode:b.continuation_mode||null,started_at:typeof b.started_at=="number"?b.started_at:null,resumed_from:b.resumed_from||null,failed:!0,status:b.status,status_label:b.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:cr(Wn,b.bead_id,{attempt_id:b.attempt_id}),resume_eligible:ne.eligible,resume_reason:ne.reason,conflict_resolution:no(b),base_exception:ka(Hn,b.target_base),usage:zt(_.attempts||{},b.bead_id),current_child:le(b.bead_id),...we(b.bead_id)}),Gt=b}}let Gn=[...Ia,...La].map(b=>{let N=zn.get(b.attempt_id),ne=N?.quickfix_landing;if(N?.quickfix_lane!==!0||!ne||typeof ne!="object")return b;let Me=typeof ne.reason=="string"&&ne.reason.length>0?ne.reason:null,pt=qn({bead_id:N.bead_id,merge_sha:ne.head_sha,cleanup_cursor:ne.cursor,cleanup_failed:Me?{step:ne.cursor,reason:Me}:null,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]});return pt?{...b,landing:pt}:b}),Pa=null;if(Gt){let b=Oa(Gt),N=Gt.cause_detail;Pa={bead_id:Gt.bead_id,repo:Gt.repo||"",reason:Gt.cause||Gt.status,cause_detail:N&&typeof N.reason=="string"?{reason:N.reason,command:typeof N.command=="string"?N.command:null}:null,resume_attempt_id:Gt.attempt_id,resume_eligible:b.eligible,resume_reason:b.reason,discard:cr(Wn,Gt.bead_id,{attempt_id:Gt.attempt_id})}}let Da=new Set(Gn.map(b=>b.bead_id)),so=Array.isArray(_.merge_queue)?_.merge_queue:[],Ma=new Map,Na=new Map,qa=new Map,Fa=new Map,ja=new Map;so.forEach((b,N)=>{b&&typeof b.bead_id=="string"&&(Ma.set(b.bead_id,N+1),Na.set(b.bead_id,b.resolution),qa.set(b.bead_id,b.continuation_action||null),Fa.set(b.bead_id,b.head_review||null),ja.set(b.bead_id,b.authority||null))});let Hr=_.merge_queue_state||{active:null,failures:{}},Fd=Hr.failures||{},Ba=Hr.waiting&&typeof Hr.waiting.bead_id=="string"&&typeof Hr.waiting.reason=="string"?Hr.waiting:null,jd=_.auto_merge_skips||{},Ua=b=>{let N=jd[b];if(!N)return null;let ne=We[b],Me=ne&&ne.pr?ne.pr.head_sha:null;return Me&&Me===N.head_sha?N.reason||"":null},Vn=new Map;for(let b of Gn)b.failed!==!0&&b.conflict_resolution&&(b.paused?Vn.has(b.bead_id)||Vn.set(b.bead_id,"paused"):Vn.set(b.bead_id,"running"));let Wa=Gn.filter(b=>!b.paused&&b.failed!==!0).length,za=(_.workspace_info||{}).slots,Ha=typeof za=="number"?za:typeof _.slots=="number"?_.slots:Qs,Bd=Wa>Ha,Yn=Dr(j),Ud=(Array.isArray(_.done)?_.done.slice():[]).filter(b=>Yn===void 0||typeof b.added_at!="number"||b.added_at>=Yn).sort((b,N)=>(N.added_at||0)-(b.added_at||0)),cn=to(Ud,"done"),Wd=new Set((Array.isArray(_.done)?_.done:[]).map(b=>b?.bead_id).filter(b=>typeof b=="string")),Ga=[],zd=d?.()||"";for(let b of m){let N=qr(b.closed_at);if(typeof b.id!="string"||Wd.has(b.id)||N===null||Yn!==void 0&&N<Yn||typeof b.comment_count!="number"||b.comment_count<=0)continue;let ne=`${zd}\0${b.id}\0${String(b.updated_at)}\0${b.comment_count}`,Me=Z.get(ne);Me===void 0&&r&&(Z.set(ne,"pending"),Promise.resolve(r("get-comments",{id:b.id})).then(pt=>{let Vt=Array.isArray(pt)&&pt.some(At=>Os(typeof At?.text=="string"?At.text:"")?.lane==="session");Z.set(ne,Vt?"session":"not-session"),D()}).catch(()=>{Z.set(ne,"failed"),D()})),Me==="session"&&Ga.push({id:b.id,title:b.title||b.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:N,created_at:b.created_at,updated_at:b.updated_at})}cn.push(...Ga),cn.sort((b,N)=>(N.done_at||0)-(b.done_at||0));let Kn={};for(let b of mr)Kn[b]=0;let Va=!1,Ya=0,oo=0,Ka=0;for(let b of cn){let N=b.usage;if(N&&typeof N=="object"){let ne=!1;for(let Me of mr)Number.isFinite(N[Me])&&(Kn[Me]+=N[Me],Va=!0,ne=!0);ne&&(oo+=1,Number.isFinite(N.total_cost_usd)&&(Ya+=N.total_cost_usd,Ka+=1))}}oo>0&&Ka===oo&&(Kn.total_cost_usd=Ya);let Za=cn.map(b=>b.usage).filter(b=>b&&typeof b=="object"&&b.providers),Hd=Za.length>0?kt(hs(Za)):Va?Xt(Kn):null,Gd=_.lane_states&&typeof _.lane_states=="object"&&!Array.isArray(_.lane_states)?_.lane_states:{},Vd=Array.isArray(_.serial_lanes)?_.serial_lanes:[],Xa=b=>{if(ye.some(Me=>Me.bead_id===b))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let N=zr.filter(Me=>Me&&Me.bead_id===b),ne=N.length>0?N[N.length-1].status:null;return ne==="failed"||ne==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ne==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Qa=Vd.filter(b=>b&&typeof b.id=="string"&&Array.isArray(b.entries)).map((b,N)=>{let ne=Gd[b.id]||{},Me=new Map((Array.isArray(ne.corrections)?ne.corrections:[]).filter(ct=>ct&&typeof ct.bead_id=="string"&&typeof ct.after=="string").map(ct=>[ct.bead_id,ct.after])),pt=to(b.entries.filter(ct=>!Da.has(ct.bead_id)),b.id).map(ct=>Me.has(ct.id)?{...ct,badges:[`\u{1F517} ${Me.get(ct.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ct.badges]}:ct),Vt=Array.isArray(ne.occupied_by)?ne.occupied_by.filter(ct=>typeof ct=="string"):[],At=Vt.map(ct=>({id:ct,title:Ee.get(ct)||ct,draggable:!1,lane:b.id,ghost:!0,badges:[Xa(ct)]}));return{id:b.id,index:N+1,rows:[...At,...pt],occupied:Vt.length>0,badge:Vt.length>0?Xa(Vt[0]):"\uB300\uAE30",cycle:ne.cycle===!0}}),Yd=typeof _.serial_lane_count=="number"?_.serial_lane_count:Qa.length;return{queue:_,idToTitle:Ee,candidates:Dd,candidate_hidden:{blocked:eo.hidden_blocked,spec:eo.hidden_spec},running:Gn,live_count:Wa,slots:Ha,over_cap:Bd,failure:Pa,waiting:to(an.filter(b=>!Da.has(b.bead_id)),"queue"),serial_lanes:Qa,serial_lane_count:Yd,pr_wait:ye.map(b=>Bm(b.bead_id,Ee.get(b.bead_id)||b.bead_id,We,mt[b.bead_id]||null,zt(_.attempts||{},b.bead_id),Pe[b.bead_id]||(U.has(b.bead_id)||Q.has(b.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Vn.get(b.bead_id)||null,b.external===!0,{position:Ma.get(b.bead_id)||0,active:Hr.active===b.bead_id,failure:Fd[b.bead_id]||null,waiting:Ba?.bead_id===b.bead_id?Ba.reason:null,resolution:Na.get(b.bead_id),continuation_action:qa.get(b.bead_id),head_review:Fa.get(b.bead_id)||null,authority:ja.get(b.bead_id)||null},b.wt_present!==!1,_.auto_merge===!0?Ua(b.bead_id):null,ka(Hn,Nd(b.bead_id)),_.completion_status&&typeof _.completion_status=="object"&&!Array.isArray(_.completion_status)&&_.completion_status[b.bead_id]||null,_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},zn.get(Ra.get(b.bead_id)||"")?.worker_serial===!0,_.auto_merge===!0,{merge_sha:b.merge_sha,cleanup_cursor:b.cleanup_cursor,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]})).map(b=>({...b,...we(b.id)})),merge_queue_length:so.length,merge_queue_running:so.length>0,auto_excluded:ye.map(b=>b.bead_id).filter(b=>Ua(b)!==null),declared_base:Hn,done:cn,token_total:Hd,cleanup_failures:sr,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]}}function De(){let v=!!o?.get()?.job,T=!v&&o?.isPending?.()===!0,m=v?"\uBD84\uC11D \uC911":T?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${m?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${m?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${m?c`<span class="worker-analysis-btn__badge">${m}</span>`:""}
    </button>`}function et(_){let v=_.waiting.length>0?_.waiting[0].id:"\u2014",T=c`<button
      type="button"
      class="worker-play${_.queue.auto_advance?" is-active":""}"
    >
      ${_.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,m=y(_),I=_.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ee=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${_.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${_.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${C()} 완료 <b>${_.done.length}</b></span
      >`,le=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${_.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${_.declared_base||"?"}</span
    >`,Ce=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Qs}
          step="1"
          .value=${String(_.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:fd},(lt,h)=>h+1).map(lt=>c`<option
                value=${String(lt)}
                ?selected=${_.serial_lane_count===lt}
              >
                ${lt}
              </option>`)}
        </select>
      </label>
      ${o?De():""} `,Ee=xc({failure:_.failure}),at=_c(_.repo_operations,_.cleanup_failures);return L?c`<div class="worker-ribbon">
          ${T} ${m}
          <div class="worker-kpi worker-kpi--ribbon">${I}${ee}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ce}</div>
          <div class="worker-kpi">${le}</div>
        </div>
        ${at}${H.template()}${Ee}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${T}${m}${Ce}</div>
        <div class="worker-kpi">
          ${I}${ee}${le}
          ${(Array.isArray(_.token_total)?_.token_total:_.token_total?[{label:_.token_total,tooltip:`${C()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(lt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${lt.tooltip}
                >${C()} 완료 · 누적 ${lt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${at}${H.template()}${Ee}`}function dt(_){if(_.running.length===0&&_.pr_wait.length===0)return"";let v=_.running.some(T=>!T.paused&&T.failed!==!0);return c`<section
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
      ${_.running.length>0?da(_.running,Date.now(),fe):""}
      ${_.pr_wait.map(T=>sa(T))}
    </section>`}function nt(_){let v=_.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${F.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${km.map(T=>c`<button
              type="button"
              class="worker-filter__chip${F.spec===T.value?" is-active":""}"
              data-spec=${T.value}
              aria-pressed=${F.spec===T.value?"true":"false"}
            >
              ${T.label}
            </button>`)}
        ${v.spec>0?c`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function ut(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${R}
    >
      ${$m.map(_=>c`<option value=${_.value} ?selected=${R===_.value}>
            ${_.label}
          </option>`)}
    </select>`}function z(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${j}
      >
        ${or.map(_=>c`<option value=${_.value} ?selected=${j===_.value}>
              ${_.label}
            </option>`)}
      </select>
    </div>`}function X(_){let v=c`<span
      class="worker-lane__badge${_.occupied?" worker-lane__badge--held":""}"
      >${_.badge}</span
    >`,T=_.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return tr({id:`worker-pane-lane-${_.id}`,lane:_.id,title:`\uC9C1\uB82C ${_.index}`,items:_.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:T})}function y(_){let v=_.queue.auto_merge===!0;if(_.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${_.merge_queue_length}
      </button>`;if(v)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let T=new Set(_.auto_excluded),m=_.pr_wait.filter(I=>I.merge_action&&I.merge_enabled&&!T.has(I.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${m>0?` ${m}`:""}
    </button>`}function S(_){let v=tr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:ut(),controls:nt(_)});return L?c`<div class="worker-lanes worker-lanes--mobile">
        ${dt(_)}
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:k.queue,preview:md(_.waiting)})}
        ${_.serial_lanes.map(T=>X(T))}
        ${v}
        ${tr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:z(),collapsible:!0,collapsed:k.done,preview:Array.isArray(_.token_total)?_.token_total.map(T=>T.label).join(" \xB7 "):_.token_total||md(_.done)})}
      </div>`:c`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:_.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${_.serial_lanes.map(T=>X(T))}
      </div>
      ${tr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${_.slots}`,items:_.running,live:_.running.some(T=>!T.paused&&T.failed!==!0),body:da(_.running,Date.now(),fe)})}
      ${tr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:_.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${tr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${C()} ${_.done.length}`,items:_.done,empty:`${C()} \uC644\uB8CC \uC5C6\uC74C`,controls:z()})}
    </div>`}function P(_){k={...k,[_]:!k[_]},Rm(k),D()}function D(){let _=Oe();Be(et(_),Ie),Be(S(_),Ze)}function he(){let _=document.querySelector(".app-header");if(!_)return;let v=()=>{let T=Math.round(_.getBoundingClientRect().height);se.style.setProperty("--worker-ribbon-top",`${T}px`)};if(v(),typeof ResizeObserver=="function"){let T=new ResizeObserver(v);T.observe(_),te.push(()=>T.disconnect())}else window.addEventListener("resize",v),te.push(()=>window.removeEventListener("resize",v))}function ve(){if(typeof window.matchMedia!="function")return;let _=window.matchMedia(Tm);L=!!_.matches;let v=T=>{let m=!!(T&&typeof T.matches=="boolean"?T.matches:_.matches);m!==L&&(L=m,D())};typeof _.addEventListener=="function"?(_.addEventListener("change",v),te.push(()=>_.removeEventListener("change",v))):typeof _.addListener=="function"&&(_.addListener(v),te.push(()=>_.removeListener(v)))}let ae=null;function Ke(_){ae=_.target instanceof Element?_.target:null}function xe(_){let T=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!T)return;if(ae&&T.contains(ae)&&ae.closest("input, button, a")){_.preventDefault();return}let m=T.dataset.beadId||"",I=T.dataset.lane||"";$={bead_id:m,from_lane:I};try{_.dataTransfer?.setData("text/plain",m),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function gt(_){let v=_.target?.closest?.(".worker-pane");if(!v)return;let T=v.dataset.lane||"";T!=="candidate"&&T!=="queue"&&!/^s[1-5]$/.test(T)||(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function je(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function $t(_,v){let T=q.find(le=>le.id===_);if(!T)return;let m=q.filter(le=>le.id!==_),I=m.length;if(v){let le=v.dataset.beadId;if(le===_)return;let Ce=m.findIndex(Ee=>Ee.id===le);Ce>=0&&(I=Ce)}let ee=m.slice();ee.splice(I,0,T),A.applyReorder(_,ee,I)}function jt(_){let v=_.target?.closest?.(".worker-pane");if(!v)return;_.preventDefault(),v.classList.remove("worker-pane--drag-over");let T=v.dataset.lane||"",m=$?.bead_id||_.dataTransfer?.getData("text/plain")||"",I=$?.from_lane||"";if($=null,!m)return;let ee=_.target?.closest?.(".worker-mini, .worker-card"),le=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),Ce=le.length;if(ee){let Ee=le.indexOf(ee);Ee>=0&&(Ce=Ee)}if(Ce=Math.max(0,Ce-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(Ce=W()),T==="candidate"){if(I==="candidate"){$t(m,ee);return}(I==="queue"||/^s[1-5]$/.test(I))&&M(m);return}if(T==="queue"||/^s[1-5]$/.test(T)){let Ee=T==="queue"?"parallel":T;I===T?B(m,Ee,Ce):x(m,Ee,Ce)}}function dr(_){F=_,vm(_),D()}function xt(_){R=_==="board"||_==="created"||_==="spec"?_:Js,Sm(R),D()}function Et(_){j=Wt(_)?_:Mt,Em(j),f?.(j),D()}function ur(_){let v=_.target?.closest?.(".worker-serial-lane-count");if(v){let Ce=Number.parseInt(v.value,10);Number.isFinite(Ce)&&Fe(Ce).then(D);return}let T=_.target?.closest?.(".worker-filter__blocked");if(T){dr({...F,show_blocked:T.checked});return}let m=_.target?.closest?.(".worker-done-range");if(m){Et(m.value);return}let I=_.target?.closest?.(".worker-sort");if(I){xt(I.value||Js);return}let ee=_.target?.closest?.(".worker-slots__input");if(!ee)return;let le=Number.parseInt(ee.value,10);if(!Number.isFinite(le)){D();return}rt(le).then(D)}function rr(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function Bt(){let _=Oe();return{operations:_.repo_operations,cleanup_failures:_.cleanup_failures,repo:d&&d()||""}}function nr(){fe&&ie.close(),Ve.hidden=!1,Ne.hidden=!1,ke.open(Bt()),D()}function yt(_){let v=$e(),T=v.attempts?v.attempts[_]:null;fe=_,Re=null,ke.close(),Ve.hidden=!0,Ne.hidden=!1,ie.open({attempt_id:_,meta:rr(T)}),D()}function pr(_,v){fe=null,Re=_,ke.close(),Ve.hidden=!0,Ne.hidden=!1,ie.open({attempt_id:_,meta:v,hide_prompt:!0}),D()}function Ue(){if(ke.isOpen()&&ke.refresh(Bt()),Re){let T=(o?.get()?.runs||[]).find(m=>m.run_id===Re);T?ie.updateMeta(va(T)):ie.close();return}if(!fe)return;let _=$e(),v=_.attempts?_.attempts[fe]:null;if(v){ie.updateMeta(rr(v));return}ie.close()}function Ot(_){let v=_.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;if(v?.closest?.(".worker-analysis-btn")){Ae?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){nr();return}let T=v?.closest?.(".worker-repo-op__session");if(T){let Te=T.dataset.attemptId;Te&&yt(Te);return}let m=v?.closest?.(".worker-repo-op__resolve");if(m){qe(m.dataset.operationId||"");return}let I=v?.closest?.(".worker-repo-op__dismiss");if(I){tt(I.dataset.operationId||"");return}let ee=v?.closest?.(".worker-cleanup__resume");if(ee){let Te=ee.dataset.beadId;Te&&Le(Te);return}let le=v?.closest?.(".worker-banner__resume");if(le){let Te=le.dataset.attemptId;Te&&_e(Te);return}let Ce=v?.closest?.(".worker-banner__discard");if(Ce){let Te=Ce.dataset.confirmation==="merged"?"merged":"unmerged";O(Ce.dataset.beadId||"",Ce.dataset.attemptId||null,Te,Ce.dataset.operationId||null);return}let Ee=v?.closest?.(".worker-banner__dismiss");if(Ee){let Te=Ee.dataset.attemptId;Te&&K(Te);return}if(v?.closest?.(".worker-play")){Se(!$e().auto_advance);return}let at=v?.closest?.(".worker-merge-all");if(at){at.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?ot(!1):Ge():ot(!0);return}let lt=v?.closest?.(".worker-pane__hd--toggle");if(lt){let Te=lt.dataset.lane;(Te==="queue"||Te==="done")&&P(Te);return}let h=v?.closest?.(".worker-card__place");if(h){let Te=h.dataset.beadId;Te&&!h.disabled&&x(Te,"parallel",W());return}let u=v?.closest?.(".worker-filter__chip");if(u){let Te=u.dataset.spec;(Te==="all"||Te==="with"||Te==="without")&&dr({...F,spec:Te});return}let E=v?.closest?.(".worker-mini__merge");if(E){let Te=E.dataset.beadId||"";$e().cleanup_failed?.[Te]?Le(Te):be(Te);return}let w=v?.closest?.(".worker-mini__merge-cancel");if(w){Ye(w.dataset.beadId||"");return}let G=v?.closest?.(".worker-mini__discard");if(G){O(G.dataset.beadId||"",G.dataset.attemptId||null,G.dataset.discardMode==="merged"?"merged":"unmerged",G.dataset.operationId||null);return}let we=v?.closest?.(".worker-mini__stale-continue");if(we){V("worker-stale-work-continue",we.dataset.beadId||"",we.dataset.actionId||"");return}let ye=v?.closest?.(".worker-mini__stale-backup");if(ye){V("worker-stale-work-backup-fresh",ye.dataset.beadId||"",ye.dataset.actionId||"");return}let We=v?.closest?.(".worker-mini__stale-recheck");if(We){V("worker-stale-work-recheck",We.dataset.beadId||"",We.dataset.actionId||"");return}let Pe=v?.closest?.(".worker-mini__revise-fix");if(Pe){de("worker-revise-fix",Pe.dataset.beadId||"");return}let mt=v?.closest?.(".worker-mini__revise-approve");if(mt){de("worker-revise-approve",mt.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Te=v?.closest?.(".rtile"),bt=Te?.dataset?.beadId,ln=Te?.dataset?.attemptId;bt&&O(bt,ln||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let bt=v?.closest?.(".rtile")?.dataset?.attemptId;bt&&K(bt);return}if(v?.closest?.(".rtile__pause")){let bt=v?.closest?.(".rtile")?.dataset?.attemptId;bt&&Y(bt);return}if(v?.closest?.(".rtile__resume")){let bt=v?.closest?.(".rtile")?.dataset?.attemptId;bt&&_e(bt);return}if(v?.closest?.(".rtile__session")){let bt=v?.closest?.(".rtile")?.dataset?.attemptId;bt&&yt(bt);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){ke.close(),ie.close();return}if(v?.closest?.(".worker-drawer-host"))return;let sr=v?.closest?.(".rtile");if(sr){if(v?.closest?.(".rtile__id")){let bt=sr.dataset.beadId;bt&&Zt(bt).then(ln=>{ln?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Te=sr.dataset.beadId;Te&&l&&l(Te);return}let an=v?.closest?.(".worker-mini, .worker-card");if(an){let Te=an.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Te&&Zt(Te).then(bt=>{bt?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Te&&l&&l(Te)}}return e.addEventListener("pointerdown",Ke),e.addEventListener("dragstart",xe),e.addEventListener("dragover",gt),e.addEventListener("dragleave",je),e.addEventListener("drop",jt),e.addEventListener("click",Ot),e.addEventListener("change",ur),ve(),he(),g&&te.push(g.subscribe(()=>{for(let[_,v]of Z)v==="failed"&&Z.delete(_);D()})),s&&te.push(s.subscribe(()=>{let _=d&&d()||"";_!==J&&(J=_,me.close()),D(),Ue()})),o&&typeof o.subscribe=="function"&&te.push(o.subscribe(()=>{Ue(),D()})),D(),{load(){D()},destroy(){for(let _ of te.splice(0))try{_()}catch{}e.removeEventListener("pointerdown",Ke),e.removeEventListener("dragstart",xe),e.removeEventListener("dragover",gt),e.removeEventListener("dragleave",je),e.removeEventListener("drop",jt),e.removeEventListener("click",Ot),e.removeEventListener("change",ur);try{ie.destroy()}catch{}Ne.hidden=!0;try{Ae?.destroy()}catch{}try{me.destroy()}catch{}Be(c``,e)}}}function xa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function wd(e,t,r,n=async()=>{},s=async()=>{}){let o=ft("views:workspace-picker"),a=null,i=!1,l=!1,d=!1;async function p(L){let Q=L.target.value,ue=t.getState().workspace?.current?.path||"";if(Q&&Q!==ue){o("switching workspace to %s",Q),i=!0,k();try{await r(Q)}catch(te){o("workspace switch failed: %o",te)}finally{i=!1,k()}}}async function f(){let L=t.getState(),U=L.workspace?.current?.path||L.workspace?.available?.[0]?.path||"";if(!(!U||l)){o("git-pulling workspace %s",U),l=!0,k();try{await n(U)}catch(Q){o("workspace git pull failed: %o",Q)}finally{l=!1,k()}}}function g(L){let U=L.target;U&&e.contains(U)||q()}function A(L){L.key==="Escape"&&q()}function $(){d||(d=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",A),k())}function q(){d&&(d=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",A),k())}function F(){d?q():$()}async function R(L){let U=L.target,Q=U.value,pe=U.checked;o("toggling visibility %s \u2192 %s",Q,String(pe));try{await s(Q,pe)}catch(ue){o("workspace visibility toggle failed: %o",ue)}}function j(L){return L?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function Z(L,U){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${F}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${L.map(Q=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Q.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Q.path}"
                        .checked=${!U.has(Q.path)}
                        @change=${R}
                      />
                      <span class="workspace-picker__manage-name"
                        >${xa(Q.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function C(){let L=t.getState(),U=L.workspace?.current,Q=L.workspace?.available||[],pe=new Set(L.workspace?.hidden||[]),ue=U?.path||Q[0]?.path||"";if(Q.length===0)return c``;let te=Q.filter(se=>!pe.has(se.path)||se.path===ue);if(te.length<=1){let se=te[0]||Q[0],Ie=xa(se.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${se.path}"
            >${Ie}</span
          >
          ${Z(Q,pe)}
          ${j(ue)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${te.map(se=>c`
              <option
                value="${se.path}"
                ?selected=${se.path===ue}
                title="${se.path}"
              >
                ${xa(se.path)}
              </option>
            `)}
        </select>
        ${Z(Q,pe)}
        ${j(ue)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function k(){Be(C(),e)}return k(),a=t.subscribe(()=>k()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",A),Be(c``,e)}}}var kd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Sa(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function $d(e,t,r=Sa()){return{id:r,type:e,payload:t}}function xd(e={}){let t=ft("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,d=new Map,p=[],f=new Map,g=new Set;function A(C){for(let k of Array.from(g))try{k(C)}catch{}}function $(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let C=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),k=(r.jitterRatio||0)*C,L=Math.max(0,Math.round(C+(Math.random()*2-1)*k));t("ws retry in %d ms (attempt %d)",L,a+1),i=setTimeout(()=>{i=null,Z()},L)}function q(C){try{s?.send(JSON.stringify(C))}catch(k){t("ws send failed",k)}}function F(){for(o="open",t("ws open"),A(o),a=0;p.length;){let C=p.shift();C&&q(C)}}function R(C){let k;try{k=JSON.parse(String(C.data))}catch{t("ws received non-JSON message");return}if(!k||typeof k.id!="string"||typeof k.type!="string"){t("ws received invalid envelope");return}if(d.has(k.id)){let U=d.get(k.id);d.delete(k.id),k.ok?U?.resolve(k.payload):U?.reject(k.error||new Error("ws error"));return}let L=f.get(k.type);if(L&&L.size>0)for(let U of Array.from(L))try{U(k.payload)}catch(Q){t("ws event handler error",Q)}else t("ws received unhandled message type: %s",k.type)}function j(){o="closed",t("ws closed"),A(o);for(let[C,k]of d.entries())k.reject(new Error("ws disconnected")),d.delete(C);a+=1,$()}function Z(){if(!l)return;let C=n();try{s=new WebSocket(C),t("ws connecting %s",C),o="connecting",A(o),s.addEventListener("open",F),s.addEventListener("message",R),s.addEventListener("error",()=>{}),s.addEventListener("close",j)}catch(k){t("ws connect failed %o",k),$()}}return Z(),{send(C,k){if(!kd.includes(C))return Promise.reject(new Error(`unknown message type: ${C}`));let L=Sa(),U=$d(C,k,L);return t("send %s id=%s",C,L),new Promise((Q,pe)=>{d.set(L,{resolve:Q,reject:pe,type:C}),s&&s.readyState===s.OPEN?q(U):(t("queue %s id=%s (state=%s)",C,L,o),p.push(U))})},on(C,k){f.has(C)||f.set(C,new Set);let L=f.get(C);return L?.add(k),()=>{L?.delete(k)}},onConnection(C){return g.add(C),()=>{g.delete(C)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,Z()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Um(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Wm(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Aa=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Sd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Tr="tab:worker:closed",zm="bdui.worker.done-range",Ad=jc,Ed="worker:queue",Td="worker:parallel-analysis",Cd="ui:order",Rd="ui:display-policy",Id="exec:presets",Cr="tab:board:closed",Ld="beads-ui.board.closed-range";function Hm(e){let t=ft("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Be(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&Jc(s),o&&a&&i&&l){let Ze=function(h,u){let E="Request failed",w="";if(h&&typeof h=="object"){let we=h;if(typeof we.message=="string"&&we.message.length>0&&(E=we.message),typeof we.details=="string")w=we.details;else if(we.details&&typeof we.details=="object")try{w=JSON.stringify(we.details,null,2)}catch{w=""}}else typeof h=="string"&&h.length>0&&(E=h);let G=u&&u.length>0?`Failed to load ${u}`:"Request failed";Ve.open(G,E,w)},be=function(h){return`${Ue.getState().workspace.current?.path||""}\0${h}`},Le=function(){W&&(W().catch(()=>{}),W=null),x=null,B=null},ot=function(h){M=h;let u=()=>{M!==h||Ue.getState().selected_id!==h||(M=null,Je(h))};if(!K){_e.then(u);return}u()},V=function(h,u,E,w,G){return E!==O[u]?(G().catch(()=>{}),!1):(h.set(w,G),!0)},Se=function(){let h=Ue.getState();Oe(h.view==="board"),z(h.view==="worker"),D(h.view==="monitor"),y(h.view==="board"||h.view==="worker"||de||!!h.selected_id)},rt=function(){let h=Dr(qe);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},Fe=function(){let h=Dr(tt);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},Oe=function(h){if(h)for(let[u,E]of Aa){if(Ye.has(u)||Ge.has(u))continue;let w=u===Cr?rt():{type:E};try{ke.register(u,w)}catch(ye){t("register %s store failed: %o",u,ye)}Ge.add(u);let G=O.board,we=!1;ie.subscribeList(u,w).then(ye=>{we=!V(Ye,"board",G,u,ye)}).catch(ye=>{t("subscribe %s failed: %o",u,ye),Ze(ye,"board")}).finally(()=>{Ge.delete(u),we&&Se()})}else dt()},dt=function(){O.board+=1;for(let[h]of Aa){let u=Ye.get(h);u&&(u().catch(()=>{}),Ye.delete(h));try{ke.unregister(h)}catch(E){t("unregister %s failed: %o",h,E)}}},z=function(h){if(!h){X();return}for(let[u,E]of Sd){if(nt.has(u)||Ge.has(u))continue;let w=u===Tr?Fe():{type:E};try{ke.register(u,w)}catch(ye){t("register %s store failed: %o",u,ye)}Ge.add(u);let G=O.worker,we=!1;ie.subscribeList(u,w).then(ye=>{we=!V(nt,"worker",G,u,ye)}).catch(ye=>{t("subscribe %s failed: %o",u,ye),Ze(ye,"worker")}).finally(()=>{Ge.delete(u),we&&Se()})}},X=function(){O.worker+=1;for(let[h]of Sd){let u=nt.get(h);u&&(u().catch(()=>{}),nt.delete(h));try{ke.unregister(h)}catch(E){t("unregister %s failed: %o",h,E)}}},y=function(h){if(!h){S();return}ut||(Re("subscribe-worker-queue",{id:Ed}).catch(u=>{t("subscribe-worker-queue failed: %o",u)}),Re("subscribe-worker-parallel-analysis",{id:Td}).catch(u=>{t("subscribe-worker-parallel-analysis failed: %o",u)}),ut=()=>(Re("unsubscribe-worker-parallel-analysis",{id:Td}),Re("unsubscribe-worker-queue",{id:Ed})))},S=function(){ut&&(ut().catch(()=>{}),ut=null),J.clear()},D=function(h){if(!h){he();return}P||(Re("subscribe-monitor-pipeline",{id:Ad}).catch(u=>{t("subscribe-monitor-pipeline failed: %o",u)}),P=()=>Re("unsubscribe-monitor-pipeline",{id:Ad}))},he=function(){P&&(P().catch(()=>{}),P=null)},ae=function(){ve||(Re("subscribe-ui-order",{id:Cd}).catch(h=>{t("subscribe-ui-order failed: %o",h)}),ve=()=>Re("unsubscribe-ui-order",{id:Cd}))},Ke=function(){ve&&(ve().catch(()=>{}),ve=null),Ae.clear()},gt=function(){xe||(Re("subscribe-display-policy",{id:Rd}).catch(h=>{t("subscribe-display-policy failed: %o",h)}),xe=()=>Re("unsubscribe-display-policy",{id:Rd}))},je=function(){xe&&(xe().catch(()=>{}),xe=null),$e.clear()},jt=function(){$t||(Re("subscribe-impl-presets",{id:Id}).catch(h=>{t("subscribe-impl-presets failed: %o",h)}),$t=()=>Re("unsubscribe-impl-presets",{id:Id}))},Bt=function(h){if(!h)return"Unknown";let u=h.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"};var d=Ze,p=be,f=Le,g=ot,A=V,$=Se,q=rt,F=Fe,R=Oe,j=dt,Z=z,C=X,k=y,L=S,U=D,Q=he,pe=ae,ue=Ke,te=gt,se=je,Ie=jt,Ne=Bt;let He=document.getElementById("header-loading"),Xe=Ni(He),Ve=pc(e),fe=xd(),Re=Xe.wrapSend((h,u)=>fe.send(h,u)),ie=Ci(Re),ke=Ri(),me=Oi(),J=Li(),H=_i(),Ae=Ii(),$e=pi(),oe=fi(),ge=mi();fe.on("impl-presets-snapshot",h=>{let u=h;u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&oe.set({revision:u.revision,presets:u.presets})}),fe.on("monitor-pipeline-snapshot",h=>{let u=h;if(!(!u||!Array.isArray(u.workspaces)))try{H.set(u.workspaces,u.workspaces_state)}catch{}}),fe.on("ui-order-snapshot",h=>{let u=h;if(u&&typeof u.revision=="number")try{Ae.set({revision:u.revision,order:u.order&&typeof u.order=="object"?u.order:{}})}catch{}}),fe.on("display-policy-snapshot",h=>{let u=h;if(u&&u.policy&&typeof u.policy=="object")try{$e.set(u.policy)}catch{}}),fe.on("session-log-snapshot",h=>{let u=h;if(u&&typeof u.id=="string")try{ge.set(u.id,Array.isArray(u.lines)?u.lines:[],typeof u.last_event_at=="number"?u.last_event_at:null)}catch{}}),fe.on("session-log-append",h=>{let u=h;if(u&&typeof u.id=="string")try{ge.append(u.id,u.event)}catch{}}),fe.on("snapshot",h=>{let u=h,E=u&&typeof u.id=="string"?u.id:"",w=E?ke.getStore(E):null;if(w&&u&&u.type==="snapshot")try{w.applyPush(u)}catch{}}),fe.on("upsert",h=>{let u=h,E=u&&typeof u.id=="string"?u.id:"",w=E?ke.getStore(E):null;if(w&&u&&u.type==="upsert")try{w.applyPush(u)}catch{}}),fe.on("delete",h=>{let u=h,E=u&&typeof u.id=="string"?u.id:"",w=E?ke.getStore(E):null;if(w&&u&&u.type==="delete")try{w.applyPush(u)}catch{}});let W=null,x=null,B=null,M=null,Y=()=>{},_e=new Promise(h=>{Y=()=>h(void 0)}),K=!1,ce=!1;async function Je(h){let u=be(h);if(u===x||u===B)return;B=u;let E=`detail:${h}`,w={type:"issue-detail",params:{id:h}};try{ke.register(E,w)}catch(G){t("register detail store failed: %o",G)}try{let G=await ie.subscribeList(E,w);if(Ue.getState().selected_id!==h||be(h)!==u){await G().catch(()=>{});return}W&&await W().catch(()=>{}),W=G,x=u}catch(G){t("detail subscribe failed: %o",G),Ze(G,"issue details")}finally{B===u&&(B=null)}}let Ye=new Map,Ge=new Set,O={board:0,worker:0},de=!1,qe=Mt;try{let h=window.localStorage.getItem(Ld);Wt(h)&&(qe=h)}catch{}let tt=Mt;try{let h=window.localStorage.getItem(zm);Wt(h)&&(tt=h)}catch{}async function De(h){if(!Wt(h)||h===qe)return;qe=h;try{window.localStorage.setItem(Ld,h)}catch{}let u=Ye.get(Cr);if(!u)return;Ye.delete(Cr),await u().catch(()=>{});let E=rt();try{ke.register(Cr,E)}catch(w){t("register %s store failed: %o",Cr,w)}try{let w=await ie.subscribeList(Cr,E);Ye.set(Cr,w)}catch(w){t("re-subscribe %s failed: %o",Cr,w),Ze(w,"board")}}async function et(h){if(!Wt(h)||h===tt)return;tt=h;let u=nt.get(Tr);if(!u)return;nt.delete(Tr),await u().catch(()=>{});let E=Fe();try{ke.register(Tr,E)}catch(w){t("register %s store failed: %o",Tr,w)}try{let w=await ie.subscribeList(Tr,E);nt.set(Tr,w)}catch(w){t("re-subscribe %s failed: %o",Tr,w),Ze(w,"worker")}}let nt=new Map,ut=null,P=null,ve=null,xe=null,$t=null;async function dr(){xe=null,$e.clear(),$t=null,oe.clear(),ut=null,P=null,Ye.clear(),nt.clear(),O.board+=1,O.worker+=1,jt();let h=Ue.getState().workspace.current?.path;if(h)try{await fe.send("set-workspace",{path:h})}catch(E){t("workspace restore after reconnect failed: %o",E);return}gt();let u=Ue.getState();Oe(u.view==="board"),z(u.view==="worker"),D(u.view==="monitor"),y(u.view==="board"||u.view==="worker"||!!u.selected_id)}async function xt(){t("clearing all subscriptions for workspace switch"),dt(),X(),S(),me.clear(),Ke(),ae(),je(),gt(),Le();let h=Ue.getState();if(h.selected_id)try{ke.unregister(`detail:${h.selected_id}`)}catch{}let u=Ue.getState();Oe(u.view==="board"),z(u.view==="worker"),D(u.view==="monitor"),y(u.view==="board"||u.view==="worker"||!!u.selected_id),u.selected_id&&ot(u.selected_id)}async function Et(h){t("requesting workspace switch to %s",h),ce=!0;try{let u=await fe.send("set-workspace",{path:h});t("workspace switch result: %o",u),u&&u.workspace&&(Ue.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",h),u.changed&&(await xt(),re("Switched to "+Bt(h),"success",2e3)))}catch(u){throw t("workspace switch failed: %o",u),re("Failed to switch workspace","error",3e3),u}finally{ce=!1}}async function ur(h){t("requesting workspace git pull for %s",h);try{let u=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",u);let E=u?.status;if(E==="up_to_date"){re("Already up to date","success",2e3);return}if(E==="stash_pop_conflict"){re("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}re("Git pulled "+Bt(h),"success",2e3)}catch(u){t("workspace git pull failed: %o",u);let E=u?.code,w=u?.message;if(E==="rebase_conflict"){re("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(E==="rebase_conflict_abort_failed"){re("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(E==="busy"){re("Git pull skipped: another operation is running","warning",3e3);return}let G=w?`: ${w}`:"";throw re(`Git pull failed${G}`,"error",3e3),u}}async function rr(h,u){t("setting workspace visibility %s \u2192 %s",h,String(u));try{await fe.send("set-workspace-visibility",{path:h,visible:u}),await nr()}catch(E){t("workspace visibility update failed: %o",E),re("Failed to update project visibility","error",3e3)}}async function nr(){try{let h=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",h),h&&Array.isArray(h.workspaces)){let u=h.workspaces.map(we=>({path:we.path,database:we.database,pid:we.pid,version:we.version})),E=h.current?{path:h.current.root_dir,database:h.current.db_path}:null,w=Array.isArray(h.hidden)?h.hidden.filter(we=>typeof we=="string"):[];Ue.setState({workspace:{current:E,available:u,hidden:w}});let G=window.localStorage.getItem("beads-ui.workspace");G&&(!u.some(ye=>ye.path===G)||w.includes(G)?window.localStorage.removeItem("beads-ui.workspace"):E&&G!==E.path&&(t("restoring saved workspace preference: %s",G),await Et(G)))}}catch(h){t("failed to load workspaces: %o",h)}}fe.on("workspace-changed",h=>{t("workspace-changed event: %o",h),h&&h.root_dir&&(Ue.setState({workspace:{current:{path:h.root_dir,database:h.db_path}}}),nr(),xt())});let yt=!1;if(typeof fe.onConnection=="function"){let h=u=>{t("ws state %s",u),u==="reconnecting"||u==="closed"?(yt=!0,re("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&yt&&(yt=!1,re("Reconnected","success",2200),Wm(Ue,(E,w)=>{t(`${E}: %o`,w)}),dr())};fe.onConnection(h)}let pr="board";try{let h=window.localStorage.getItem("beads-ui.view");(h==="board"||h==="worker"||h==="monitor")&&(pr=h)}catch(h){t("view parse error: %o",h)}let Ue=Mi({config:Um(),view:pr});fe.on("worker-queue-snapshot",h=>{let u=h;if(!u||!u.queue)return;let E=Ue.getState().workspace.current?.path;if(typeof E=="string"&&E.length>0&&u.root_dir!==E){t("dropping worker-queue snapshot for %s",String(u.root_dir));return}try{me.set(u.queue)}catch{}}),fe.on("worker-parallel-analysis-snapshot",h=>{let u=h;if(!u)return;let E=Ue.getState().workspace.current?.path;if(!(typeof E=="string"&&E.length>0&&typeof u.root_dir=="string"&&u.root_dir!==E))try{J.set({settings:u.settings,job:u.job??null,runs:Array.isArray(u.runs)?u.runs:[],last_good:u.last_good??null})}catch{}});let Ot=Pi(Ue);Ot.start();let _=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),v=async(h,u)=>{try{return await Re(h,u)}catch(E){if(_.has(h))throw E;return[]}};n&&Uc(n,Ue,Ot);let T=document.getElementById("workspace-picker");T&&wd(T,Ue,Et,ur,rr);let m=Gc(e,(h,u)=>Re(h,u));try{let h=document.getElementById("new-issue-btn");h&&h.addEventListener("click",()=>m.open())}catch{}let I=Zc(e,{policyStore:$e,queueStore:me,implPresetStore:oe,transport:(h,u)=>Re(h,u),onOpenChange:h=>{de=h,Se()},labelOptions:()=>{let h=new Set;for(let[u]of Aa)for(let E of ke.snapshotFor(u)||[]){let w=E.labels;if(Array.isArray(w))for(let G of w)typeof G=="string"&&G.length>0&&h.add(G)}return Array.from(h).sort()}});try{let h=document.getElementById("display-settings-btn");h&&(h.setAttribute("aria-label","\uC124\uC815"),h.setAttribute("title","\uC124\uC815"),h.addEventListener("click",()=>I.open()))}catch{}let ee=Vi(o,{gotoIssue:h=>Ot.gotoIssue(h),issueStores:ke,transport:v,workerQueueStore:me,uiOrderStore:Ae,displayPolicyStore:$e,closedRange:qe,onClosedRangeChange:h=>{De(h)},onNewIssue:()=>m.open()}),le=$a(a,{transport:v,issueStores:ke,queueStore:me,analysisStore:J,sessionLogStore:ge,uiOrderStore:Ae,gotoIssue:h=>Ue.setState({selected_id:h}),getWorkspacePath:()=>Ue.getState().workspace.current?.path,doneRange:tt,onDoneRangeChange:h=>{et(h)}}),Ce=Bc(i,{transport:v,pipelineStore:H,execPresetStore:oe,gotoIssue:h=>Ot.gotoIssue(h),getWorkspacePath:()=>Ue.getState().workspace.current?.path,switchWorkspace:h=>Et(h)}),Ee=uc(l,{issueStores:ke,transport:v,queueStore:me,execPresetStore:oe,sessionLogStore:ge,getWorkspacePath:()=>Ue.getState().workspace.current?.path,onNavigate:h=>{Ue.getState().view==="worker"?Ue.setState({selected_id:h}):Ot.gotoIssue(h)},onClose:()=>{let h=Ue.getState();Ue.setState({selected_id:null});try{Ot.gotoView(h.view==="worker"||h.view==="monitor"?h.view:"board")}catch{}},onOpenExecPresets:()=>{I.open("session")}}),at=Ue.getState().selected_id;at&&(l.hidden=!1,Ee.load(at),ot(at)),Ue.subscribe(h=>{let u=h.selected_id;u?(l.hidden=!1,Ee.load(u),ce||ot(u)):(Ee.clear(),l.hidden=!0,Le())});let lt=h=>{o.hidden=h.view!=="board",a.hidden=h.view!=="worker",i.hidden=h.view!=="monitor",Oe(h.view==="board"),z(h.view==="worker"),D(h.view==="monitor"),y(h.view==="board"||h.view==="worker"||de||!!h.selected_id),!h.selected_id&&h.view==="board"&&ee.load(),h.view==="worker"&&le.load(),h.view==="monitor"?Ce.load():Ce.pause(),window.localStorage.setItem("beads-ui.view",h.view)};Ue.subscribe(lt),lt(Ue.getState()),ae(),gt(),jt(),nr().finally(()=>{K=!0,Y()}),window.addEventListener("keydown",h=>{let u=h.ctrlKey||h.metaKey,E=String(h.key||"").toLowerCase(),w=h.target,G=w&&w.tagName?String(w.tagName).toLowerCase():"",we=G==="input"||G==="textarea"||G==="select"||w&&typeof w.isContentEditable=="boolean"&&w.isContentEditable;u&&E==="n"&&(we||(h.preventDefault(),m.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Hm(t)});export{Hm as bootstrap,Um as readBootstrapConfig,Wm as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
