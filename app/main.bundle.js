var yd=Object.create;var zs=Object.defineProperty;var vd=Object.getOwnPropertyDescriptor;var wd=Object.getOwnPropertyNames;var kd=Object.getPrototypeOf,$d=Object.prototype.hasOwnProperty;var xd=(e,t,r)=>t in e?zs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Hs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Sd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of wd(t))!$d.call(e,s)&&s!==r&&zs(e,s,{get:()=>t[s],enumerable:!(n=vd(t,s))||n.enumerable});return e};var Ad=(e,t,r)=>(r=e!=null?yd(kd(e)):{},Sd(t||!e||!e.__esModule?zs(r,"default",{value:e,enumerable:!0}):r,e));var nt=(e,t,r)=>xd(e,typeof t!="symbol"?t+"":t,r);var za=Hs((J_,Wa)=>{var qr=1e3,Br=qr*60,Ur=Br*60,Tr=Ur*24,Cd=Tr*7,Rd=Tr*365.25;Wa.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Id(e);if(r==="number"&&isFinite(e))return t.long?Od(e):Ld(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Id(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Rd;case"weeks":case"week":case"w":return r*Cd;case"days":case"day":case"d":return r*Tr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Ur;case"minutes":case"minute":case"mins":case"min":case"m":return r*Br;case"seconds":case"second":case"secs":case"sec":case"s":return r*qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ld(e){var t=Math.abs(e);return t>=Tr?Math.round(e/Tr)+"d":t>=Ur?Math.round(e/Ur)+"h":t>=Br?Math.round(e/Br)+"m":t>=qr?Math.round(e/qr)+"s":e+"ms"}function Od(e){var t=Math.abs(e);return t>=Tr?Bn(e,t,Tr,"day"):t>=Ur?Bn(e,t,Ur,"hour"):t>=Br?Bn(e,t,Br,"minute"):t>=qr?Bn(e,t,qr,"second"):e+" ms"}function Bn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Ga=Hs((em,Ha)=>{function Pd(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=za(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let m=0;for(let h=0;h<_.length;h++)m=(m<<5)-m+_.charCodeAt(h),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(_){let m,h=null,E,k;function M(...N){if(!M.enabled)return;let A=M,$=Number(new Date),P=$-(m||$);A.diff=P,A.prev=m,A.curr=$,m=$,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let I=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(B,V)=>{if(B==="%%")return"%";I++;let se=r.formatters[V];if(typeof se=="function"){let ye=N[I];B=se.call(A,ye),N.splice(I,1),I--}return B}),r.formatArgs.call(A,N),(A.log||r.log).apply(A,N)}return M.namespace=_,M.useColors=r.useColors(),M.color=r.selectColor(_),M.extend=n,M.destroy=r.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(E!==r.namespaces&&(E=r.namespaces,k=r.enabled(_)),k),set:N=>{h=N}}),typeof r.init=="function"&&r.init(M),M}function n(_,m){let h=r(this.namespace+(typeof m>"u"?":":m)+_);return h.log=this.log,h}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let m=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(_,m){let h=0,E=0,k=-1,M=0;for(;h<_.length;)if(E<m.length&&(m[E]===_[h]||m[E]==="*"))m[E]==="*"?(k=E,M=h,E++):(h++,E++);else if(k!==-1)E=k+1,M++,h=M;else return!1;for(;E<m.length&&m[E]==="*";)E++;return E===m.length}function a(){let _=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),_}function l(_){for(let m of r.skips)if(o(_,m))return!1;for(let m of r.names)if(o(_,m))return!0;return!1}function c(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ha.exports=Pd});var Va=Hs((Ct,Un)=>{Ct.formatArgs=Md;Ct.save=Nd;Ct.load=Fd;Ct.useColors=Dd;Ct.storage=qd();Ct.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ct.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Dd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Md(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Un.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Ct.log=console.debug||console.log||(()=>{});function Nd(e){try{e?Ct.storage.setItem("debug",e):Ct.storage.removeItem("debug")}catch{}}function Fd(){let e;try{e=Ct.storage.getItem("debug")||Ct.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function qd(){try{return localStorage}catch{}}Un.exports=Ga()(Ct);var{formatters:Bd}=Un.exports;Bd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jr=globalThis,Pn=Jr.trustedTypes,Ta=Pn?Pn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Vs="$lit$",rr=`lit$${Math.random().toFixed(9).slice(2)}$`,Ys="?"+rr,Ed=`<${Ys}>`,xr=document,en=()=>xr.createComment(""),tn=e=>e===null||typeof e!="object"&&typeof e!="function",Ks=Array.isArray,Pa=e=>Ks(e)||typeof e?.[Symbol.iterator]=="function",Gs=`[ 	
\f\r]`,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ca=/-->/g,Ra=/>/g,kr=RegExp(`>|${Gs}(?:([^\\s"'>=/]+)(${Gs}*=${Gs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ia=/'/g,La=/"/g,Da=/^(?:script|style|textarea|title)$/i,Zs=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Zs(1),fr=Zs(2),G_=Zs(3),Ot=Symbol.for("lit-noChange"),lt=Symbol.for("lit-nothing"),Oa=new WeakMap,$r=xr.createTreeWalker(xr,129);function Ma(e,t){if(!Ks(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ta!==void 0?Ta.createHTML(t):t}var Na=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Qr;for(let l=0;l<r;l++){let c=e[l],d,_,m=-1,h=0;for(;h<c.length&&(a.lastIndex=h,_=a.exec(c),_!==null);)h=a.lastIndex,a===Qr?_[1]==="!--"?a=Ca:_[1]!==void 0?a=Ra:_[2]!==void 0?(Da.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=kr):_[3]!==void 0&&(a=kr):a===kr?_[0]===">"?(a=s??Qr,m=-1):_[1]===void 0?m=-2:(m=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?kr:_[3]==='"'?La:Ia):a===La||a===Ia?a=kr:a===Ca||a===Ra?a=Qr:(a=kr,s=void 0);let E=a===kr&&e[l+1].startsWith("/>")?" ":"";o+=a===Qr?c+Ed:m>=0?(n.push(d),c.slice(0,m)+Vs+c.slice(m)+rr+E):c+rr+(m===-2?l:E)}return[Ma(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},rn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[d,_]=Na(t,r);if(this.el=e.createElement(d,n),$r.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=$r.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Vs)){let h=_[a++],E=s.getAttribute(m).split(rr),k=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:k[2],strings:E,ctor:k[1]==="."?Mn:k[1]==="?"?Nn:k[1]==="@"?Fn:Ar}),s.removeAttribute(m)}else m.startsWith(rr)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(Da.test(s.tagName)){let m=s.textContent.split(rr),h=m.length-1;if(h>0){s.textContent=Pn?Pn.emptyScript:"";for(let E=0;E<h;E++)s.append(m[E],en()),$r.nextNode(),c.push({type:2,index:++o});s.append(m[h],en())}}}else if(s.nodeType===8)if(s.data===Ys)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(rr,m+1))!==-1;)c.push({type:7,index:o}),m+=rr.length-1}o++}}static createElement(t,r){let n=xr.createElement("template");return n.innerHTML=t,n}};function Sr(e,t,r=e,n){if(t===Ot)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=tn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Sr(e,s._$AS(e,t.values),s,n)),t}var Dn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??xr).importNode(r,!0);$r.currentNode=s;let o=$r.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new Fr(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new qn(o,this,t)),this._$AV.push(d),c=n[++l]}a!==c?.index&&(o=$r.nextNode(),a++)}return $r.currentNode=xr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Fr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=lt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Sr(this,t,r),tn(t)?t===lt||t==null||t===""?(this._$AH!==lt&&this._$AR(),this._$AH=lt):t!==this._$AH&&t!==Ot&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Pa(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==lt&&tn(this._$AH)?this._$AA.nextSibling.data=t:this.T(xr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=rn.createElement(Ma(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Dn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Oa.get(t.strings);return r===void 0&&Oa.set(t.strings,r=new rn(t)),r}k(t){Ks(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(en()),this.O(en()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=lt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=lt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Sr(this,t,r,0),a=!tn(t)||t!==this._$AH&&t!==Ot,a&&(this._$AH=t);else{let l=t,c,d;for(t=o[0],c=0;c<o.length-1;c++)d=Sr(this,l[n+c],r,c),d===Ot&&(d=this._$AH[c]),a||(a=!tn(d)||d!==this._$AH[c]),d===lt?t=lt:t!==lt&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(t)}j(t){t===lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Mn=class extends Ar{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===lt?void 0:t}},Nn=class extends Ar{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==lt)}},Fn=class extends Ar{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Sr(this,t,r,0)??lt)===Ot)return;let n=this._$AH,s=t===lt&&n!==lt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==lt&&(n===lt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},qn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Sr(this,t)}},Fa={M:Vs,P:rr,A:Ys,C:1,L:Na,R:Dn,D:Pa,V:Sr,I:Fr,H:Ar,N:Nn,U:Fn,B:Mn,F:qn},Td=Jr.litHtmlPolyfillSupport;Td?.(rn,Fr),(Jr.litHtmlVersions??(Jr.litHtmlVersions=[])).push("3.3.1");var ze=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Fr(t.insertBefore(en(),o),o,void 0,r??{})}return s._$AI(e),s};var It="today",Qt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Pt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Er(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function qa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ba(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ua(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ja(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Ya=Ad(Va(),1);function it(e){return(0,Ya.default)(`beads-ui:${e}`)}function Wt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Cr(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Xa(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Qa(e,t){let r=Wt(e.updated_at),n=Wt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ja(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Wt(e.created_at),o=Wt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ei(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Ud=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ka(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Za(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Ud.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ti(e,t){let r=Ka(e),n=Ka(t);if(r!==n)return r<n?-1:1;let s=Za(e),o=Za(t);if(s!==o)return s<o?-1:1;let a=Wt(e&&e.created_at),l=Wt(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,d=t&&t.id;return c===d?0:String(c)<String(d)?-1:1}var Xs=2**20;function jr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Wt(e&&e.created_at)}function jn(e){return(t,r)=>{let n=jr(t,e),s=jr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Qs(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:jr(l,r)-Xs};if(!l)return{rank:jr(a,r)+Xs};let c=jr(a,r),d=jr(l,r),_=(c+d)/2;return c<_&&_<d?{rank:_}:{renormalize:n.map((m,h)=>({bead_id:m.id,rank:h*Xs}))}}function Js(e,t={}){let r=it(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Cr;function d(){for(let h of Array.from(a))try{h()}catch{}}function _(){s=Array.from(n.values()).sort(c)}function m(h){if(l||!h||h.id!==e)return;let E=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,E),!(E<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(E<=o)return;n.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let M of k)M&&typeof M.id=="string"&&M.id.length>0&&n.set(M.id,M);_(),o=E,d();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let M=n.get(k.id);if(!M)n.set(k.id,k);else{let N=Number.isFinite(M.updated_at)?M.updated_at:0,A=Number.isFinite(k.updated_at)?k.updated_at:0;if(N<=A){for(let $ of Object.keys(M))$ in k||delete M[$];for(let[$,P]of Object.entries(k))M[$]=P}}_()}o=E,d()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(n.delete(k),_()),o=E,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Wn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ri(e){let t=it("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let _=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let E of Array.from(d)){let k=r.get(E);if(!k)continue;let M=k.itemsById;for(let N of _)typeof N=="string"&&N.length>0&&M.set(N,!0);for(let N of m)typeof N=="string"&&N.length>0&&M.set(N,!0);for(let N of h)typeof N=="string"&&N.length>0&&M.delete(N)}}async function o(l,c){let d=Wn(c);if(t("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==d){let h=n.get(m.key);h&&(h.delete(l),h.size===0&&n.delete(m.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(m){let h=r.get(l)||null;if(h){let E=n.get(h.key);E&&(E.delete(l),E.size===0&&n.delete(h.key))}throw r.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let h=n.get(m.key);h&&(h.delete(l),h.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Wn,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let d=r.get(l);return d?d.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),d={};if(!c)return d;for(let _ of c.itemsById.keys())d[_]=!0;return d}}}}function ni(){let e=it("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,d,_){let m=d?Wn(d):"",h=r.get(c)||"",E=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,h),E&&h&&m&&h!==m){let k=t.get(c);if(k)try{k.dispose()}catch{}let M=s.get(c);if(M){try{M()}catch{}s.delete(c)}let N=Js(c,_);t.set(c,N);let A=N.subscribe(()=>o());s.set(c,A)}else if(!E){let k=Js(c,_);t.set(c,k);let M=k.subscribe(()=>o());s.set(c,M)}return r.set(c,m),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let d=t.get(c);d&&(d.dispose(),t.delete(c));let _=s.get(c);if(_){try{_()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let d=t.get(c);return d?d.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function si(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function oi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ai(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function eo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function jd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Wd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ii(e){let t=it("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):jd(n),a=Wd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=eo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?eo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var zd=Object.freeze({workspace_config:{default_workspace:null}});function li(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:zd.workspace_config.default_workspace}}}function ci(e={}){let t=it("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:li(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?li(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function di(e){let t=it("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function c(d){return async(m,h)=>{let E=s++,k=Date.now();n.set(E,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",E,m,r+1),a();let M=!1,N=()=>{M||(M=!0,n.delete(E),l())},A=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,m,Date.now()-k),N())},3e4);try{let $=await d(m,h),P=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",E,m,P),$}catch($){let P=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,m,P,$),$}finally{clearTimeout(A),N()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,m])=>({id:_,type:m.type,elapsed_ms:d-m.start_ts}))}}}function le(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function zn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(ei),c;switch(l){case"created_desc":return c.sort(Cr),c;case"created_asc":return c.sort(Xa),c;case"updated_desc":return c.sort(Qa),c;case"priority":return c.sort(Ja),c;case"manual":default:{let d=r();return d?c.sort(jn(d)):c.sort(Cr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Rr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ht(e){let t=Rr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Lt(e,t){let r=Rr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Hn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Rr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Gn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let d of l)c[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(Qs(l,c,d.order),a);s(d,_);let m=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(h);let E=n(Qs(l,c,h.order),a);s(h,E);let k=await t("ui-order-set",{expected_revision:h.revision,entries:E});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Vn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function to(e,t){return!t||typeof e!="string"||e.length===0||Vn(t.visible_labels).includes(e)?!0:Vn(t.hidden_labels).includes(e)?!1:!Vn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Yn(e,t){return Vn(e).filter(r=>to(r,t))}function _r(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Hd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},pi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ui={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Gd={review:"\u2713",skip:"\u2298"},mr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Vd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function fi(e){let t=e&&e.fill||"none";return t==="none"?mr.none:e&&e.stale===!0?mr.stale:t==="dim"?mr.dim:e&&e.glyph==="review"?mr.review:e&&e.glyph==="skip"?mr.skip:mr.done}function Yd(e){if(!e||e.fill==="none"||!e.approval_state)return fi(e);let t=[];return e.glyph==="review"?t.push(mr.review):e.glyph==="skip"&&t.push(mr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Kd(e,t,r){let n=Hd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Gd[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${d}>${a}</div>
      <div class=${c}>
        ${pi[e]||e}
      </div>
    </div>
  `}function Kn(e,t){if(!e||!e.stages)return"";let r=ui[e.route]||ui.spec_backed,n=e.stages,s=Vd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${pi[a]||a} ${a==="plan"?Yd(n[a]||{}):fi(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Kd(a,n[a]||{},a===s))}
    </div>
  `}function Zd(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var _i=2;function Xd(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,_i).join(", "),s=r.length-_i,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ro(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Zn(e,t){if(!e)return null;let r=ro(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=ro(t?.kind),a=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:l,title:`${c}${d}`}}function mi(e,t){let r=Zn(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Qd(e){if(!e)return null;let t=ro(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Jd(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&_r(r,"route")){let l=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":n.route}</span
      >`)}if(n.fast_track&&_r(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&_r(r,"pr")){let l=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=mi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let l=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${l.kind}:${l.actor}@${l.sha}`}
        >${`exec ${l.kind==="delegated"?l.actor:`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let l=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Yn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&_r(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),_r(r,"blocked")&&s.push(...Xd(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&_r(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function eu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function tu(e){let t=Lt(e.created_at),r=Lt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function ru(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ti):r.children;return i`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?i`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:i`<span class="board-card__roll-none">children 없음</span>`}
        ${tu(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,l)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${eu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${Zn(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${mi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Qd(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function Xn(e,t){let r=Zd(e.priority);return i`
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
      ${Jd(e,t)}
      ${e.workflow&&_r(t.policy||null,"stepper")?Kn(e.workflow,e.status):""}
      ${ru(e,t)}
    </article>
  `}function Wr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${Qt.map(o=>i`<option
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
        ${e.items.map(o=>Xn(o,t))}
      </div>
    </section>
  `}function gi(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Xn(n,t))}
        </div>
      </div>
    </dialog>
  `}var nu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],su=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],ou=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function au(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function hi(e,t,r){return i`
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
        ${nu.map(n=>i`<option
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
        ${su.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${au(e,t,r)}
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
        ${ou.map(n=>i`<option
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
  `}var iu=200,lu={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},cu=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),bi="beads-ui.board.sort",yi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function du(){try{let e=window.localStorage.getItem(bi);if(e&&yi.has(e))return e}catch{}return"created_desc"}function vi(e,t){let r=it("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,d=t.onClosedRangeChange,_=t.onNewIssue,m=t.closedRange||It,h=s?zn(s,a):null,E=Gn({transport:o,uiOrderStore:a}),k=[],M=[],N=[],A=[],$=[],P=[],I=!1,S=0,B=du(),V=new Map,se=new Map,ye=new Map,te=new Set,de={search:"",priority:"",type:"",labels:[]},ke=!1,Ue=null;function Ie(z){return String(z.status||"open")==="open"}function He(z){let X=String(z.status||"open");return X==="open"||X==="blocked"}function Ye(z){let X=de.search.trim().toLowerCase(),ne=de.priority,_e=de.type,Se=de.labels;return z.filter(Me=>{if(X){let tt=String(Me.id||"").toLowerCase(),Je=String(Me.title||"").toLowerCase();if(!tt.includes(X)&&!Je.includes(X))return!1}if(ne!==""&&String(Me.priority)!==ne||_e!==""&&String(Me.issue_type||"")!==_e)return!1;if(Se.length>0){let tt=Array.isArray(Me.labels)?Me.labels:[];if(!Se.some(Je=>tt.includes(Je)))return!1}return!0})}function Ve(){let z=new Set;for(let X of[k,M,N,A,$,P])for(let ne of X){let _e=Array.isArray(ne.labels)?ne.labels:[];for(let Se of _e)typeof Se=="string"&&Se.length>0&&z.add(Se)}return Array.from(z).sort()}function Fe(){return de.search.trim()!==""||de.priority!==""||de.type!==""||de.labels.length>0}function ve(){try{if(h){let z=h.selectBoardColumn("tab:board:in-progress","in_progress",B),X=h.selectBoardColumn("tab:board:blocked","blocked",B).filter(He),ne=new Set(z.map(Re=>Re.id)),_e=h.selectBoardColumn("tab:board:ready","ready",B).filter(Re=>Ie(Re)&&!ne.has(Re.id)),Se=h.selectBoardColumn("tab:board:resolved","resolved",B),Me=h.selectBoardColumn("tab:board:deferred","deferred",B),tt=h.selectBoardColumn("tab:board:closed","closed").slice(0,iu),Je=[...X,..._e,...z,...Se,...tt];Ae(Je);let Ne=new Set;for(let Re of Je)Re&&Re.id&&!no(Re)&&Ne.add(Re.id);let rt=!Fe();k=rt?nn(X,Ne):X,M=rt?nn(_e,Ne):_e,N=rt?nn(z,Ne):z,A=rt?nn(Se,Ne):Se,$=Me,S=Me.length,P=rt?nn(tt,Ne):tt,V=new Map;for(let Re of k)V.set(Re.id,"open");for(let Re of M)V.set(Re.id,"open");for(let Re of N)V.set(Re.id,"in_progress");for(let Re of A)V.set(Re.id,"resolved");for(let Re of $)V.set(Re.id,"deferred");for(let Re of P)V.set(Re.id,"closed");se=new Map;for(let Re of k)se.set(Re.id,"blocked-col");for(let Re of M)se.set(Re.id,"ready-col");for(let Re of N)se.set(Re.id,"in-progress-col");for(let Re of A)se.set(Re.id,"resolved-col");for(let Re of P)se.set(Re.id,"closed-col")}Le()}catch{k=[],M=[],N=[],A=[],$=[],P=[],ye=new Map,Le()}}function Ae(z){let X=new Map;for(let _e of z)_e&&_e.id&&!X.has(_e.id)&&X.set(_e.id,_e);let ne=new Map;for(let _e of X.values()){let Se=no(_e);if(!Se)continue;let Me=ne.get(Se);Me||(Me=[],ne.set(Se,Me)),Me.push({id:_e.id,title:_e.title,status:_e.status,metadata:_e.metadata,workflow:_e.workflow,created_at:_e.created_at,updated_at:_e.updated_at})}ye=ne}function be(z){let X=ye.get(z)||[],ne=0;for(let Se of X)(Se.status==="resolved"||Se.status==="closed")&&(ne+=1);let _e=Hn(X);return{total:X.length,count:ne,current:_e,children:X}}function Y(z){return!te.has(z)}function H(z,X){z.preventDefault(),z.stopPropagation(),te.has(X)?te.delete(X):te.add(X),Le()}function xe(z,X){z.preventDefault(),z.stopPropagation(),n(X)}function ae(z,X){z.preventDefault(),z.stopPropagation(),n(X)}function ie(z,X){Ue||n(X)}function W(z,X){z.preventDefault(),z.stopPropagation(),uu(X).then(ne=>{ne&&le("\uBCF5\uC0AC\uB428","success",1200)})}function U(z,X){Ue=X,z.dataTransfer&&(z.dataTransfer.setData("text/plain",X),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function ge(z){z.target.classList.remove("board-card--dragging"),yt(),setTimeout(()=>{Ue=null},0)}function Pe(z){let X=String(z.target.value||"");!X||X===m||(m=X,d&&d(X),Le())}function O(){return l?l.get():null}function j(z){let X=c?c.get():null,ne=X?X.cleanup_failed:null;if(!ne||typeof ne!="object"||Array.isArray(ne))return null;let _e=ne[z];return!_e||typeof _e!="object"||Array.isArray(_e)?null:_e}let R={onCardClick:ie,onCopyId:W,onDragStart:U,onDragEnd:ge,onClosedRangeChange:Pe,rollupFor:be,isExpanded:Y,onRollupToggle:H,onChildClick:xe,onFromChipClick:ae,cleanupFailureFor:j,get policy(){return O()}};function ee(z,X){Ue||(w(),n(X))}function J(z,X){z.preventDefault(),z.stopPropagation(),w(),n(X)}let fe={...R,onCardClick:ee,onChildClick:J,onFromChipClick:J,get policy(){return O()}};function ue(z){let X=z.target,ne=e.querySelector(".board-filter__labels");X&&ne&&ne.contains(X)||F()}function Ee(z){z.key==="Escape"&&F()}function T(){ke||(ke=!0,document.addEventListener("mousedown",ue),document.addEventListener("keydown",Ee),Le())}function F(){ke&&(ke=!1,document.removeEventListener("mousedown",ue),document.removeEventListener("keydown",Ee),Le())}function Q(z){z.key==="Escape"&&w()}function re(){I||(I=!0,document.addEventListener("keydown",Q),Le())}function w(){I&&(I=!1,document.removeEventListener("keydown",Q),Le())}let D={onClose:w,onOverlayClick(z){z.target===z.currentTarget&&w()}},Z={onSearchInput(z){de.search=String(z.target.value||""),ve()},onPriorityChange(z){de.priority=String(z.target.value||""),ve()},onTypeChange(z){de.type=String(z.target.value||""),ve()},onSortChange(z){let X=String(z.target.value||"");if(!(!yi.has(X)||X===B)){B=X;try{window.localStorage.setItem(bi,X)}catch{}ve()}},onDeferredToggle(){I?w():re()},onLabelMenuToggle(){ke?F():T()},onLabelToggle(z){let X=de.labels.indexOf(z);X===-1?de.labels.push(z):de.labels.splice(X,1),ve()},onLabelClear(){de.labels.length!==0&&(de.labels=[],ve())},onNewIssue(){_&&_()}};function De(){return i`
      <div class="board-view">
        ${hi(de,Z,{sort_mode:B,deferred_popup_open:I,deferred_count:S,label_options:Ve(),label_menu_open:ke})}
        <div class="board-root">
          ${Wr({title:"Blocked",id:"blocked-col",items:Ye(k)},R)}
          ${Wr({title:"Ready",id:"ready-col",items:Ye(M)},R)}
          ${Wr({title:"In progress",id:"in-progress-col",items:Ye(N)},R)}
          ${Wr({title:"Resolved",id:"resolved-col",items:Ye(A)},R)}
          ${Wr({title:"Closed",id:"closed-col",items:Ye(P),is_closed:!0,closed_range:m},R)}
        </div>
        ${I?gi({items:Ye($),count:S},fe,D):""}
      </div>
    `}function Le(){ze(De(),e),qe()}function qe(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let X=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ne of X)Array.from(ne.querySelectorAll(".board-card")).forEach((Se,Me)=>{Se.tabIndex=Me===0?0:-1})}catch{}}async function Te(z,X){if(!o){le("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:X}),le("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ne){r("update-status failed: %o",ne),le("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Qe(z){switch(z){case"blocked-col":return k;case"ready-col":return M;case"in-progress-col":return N;case"resolved-col":return A;default:return[]}}function kt(z,X,ne){if(!o||!a)return;let _e=Qe(z),Se=_e.find(rt=>rt.id===X);if(!Se)return;let Me=_e.filter(rt=>rt.id!==X),tt=ne.closest?ne.closest(".board-card"):null,Je=Me.length;if(tt){let rt=tt.getAttribute("data-issue-id");if(rt===X)return;let Re=Me.findIndex(ft=>ft.id===rt);Re>=0&&(Je=Re)}let Ne=Me.slice();Ne.splice(Je,0,Se),E.applyReorder(X,Ne,Je)}function yt(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let ct=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let ne=z.target.closest(".board-column");ne&&ne!==ct&&(ct&&ct.classList.remove("board-column--drag-over"),ne.classList.add("board-column--drag-over"),ct=ne)}),e.addEventListener("dragleave",z=>{let X=z.relatedTarget;(!X||!e.contains(X))&&ct&&(ct.classList.remove("board-column--drag-over"),ct=null)}),e.addEventListener("drop",z=>{z.preventDefault(),ct&&(ct.classList.remove("board-column--drag-over"),ct=null);let X=z.target,ne=X.closest(".board-column");if(!ne)return;let _e=z.dataTransfer?.getData("text/plain")||"";if(!_e)return;let Se=ne.id,Me=se.get(_e);if(Me&&Me===Se){if(cu.has(Se)){if(B!=="manual"){le("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}kt(Se,_e,X)}return}let tt=lu[Se];if(!tt){le("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(_e)!==tt&&Te(_e,tt)}),e.addEventListener("keydown",z=>{let X=z.target;if(!(X instanceof HTMLElement))return;let ne=String(X.tagName||"").toLowerCase();if(ne==="input"||ne==="textarea"||ne==="select"||ne==="button"||ne==="a"||X.isContentEditable===!0)return;let _e=X.closest(".board-card");if(!_e)return;let Se=String(z.key||"");if(Se==="Enter"||Se===" "){z.preventDefault();let Ne=_e.getAttribute("data-issue-id");Ne&&n(Ne);return}if(Se!=="ArrowUp"&&Se!=="ArrowDown"&&Se!=="ArrowLeft"&&Se!=="ArrowRight")return;z.preventDefault();let Me=_e.closest(".board-column");if(!Me)return;let tt=Array.from(Me.querySelectorAll(".board-card")),Je=tt.indexOf(_e);if(Se==="ArrowDown"&&Je<tt.length-1){$t(_e,tt[Je+1]);return}if(Se==="ArrowUp"&&Je>0){$t(_e,tt[Je-1]);return}if(Se==="ArrowLeft"||Se==="ArrowRight"){let Ne=Array.from(e.querySelectorAll(".board-column")),rt=Ne.indexOf(Me),Re=Se==="ArrowRight"?1:-1,ft=rt+Re;for(;ft>=0&&ft<Ne.length;){let xt=Ne[ft].querySelector(".board-card");if(xt){$t(_e,xt);return}ft+=Re}}});function $t(z,X){try{z.tabIndex=-1,X.tabIndex=0,X.focus()}catch{}}let at=null;h&&h.subscribe&&(at=h.subscribe(()=>{try{ve()}catch{}}));let ot=null;l&&l.subscribe&&(ot=l.subscribe(()=>{try{ve()}catch{}}));let mt=null;return c&&c.subscribe&&(mt=c.subscribe(()=>{Le()})),{async load(){r("load"),ve()},clear(){F(),w(),at&&(at(),at=null),ot&&(ot(),ot=null),mt&&(mt(),mt=null),e.replaceChildren(),k=[],M=[],N=[],A=[],$=[],P=[],V=new Map,se=new Map}}}function no(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function nn(e,t){return e.filter(r=>{let n=no(r);return!(n&&t.has(n))})}async function uu(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Ir(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Jt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function gr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function pu(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Jt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Jt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let d=_=>{typeof r.close=="function"&&r.close(),r.remove(),c(_)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function nr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await pu(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Si="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var sr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],sn=[...sr,"reasoning_output_tokens"],fu=["implementation","review-consult"];function so(e){let t=0;for(let r of sr)t+=bt(e?.[r]);return t}function _u(e){return!e||typeof e!="object"?!1:sr.some(t=>Number.isFinite(e[t]))}function wi(e){return!e||typeof e!="object"?!1:sn.some(t=>Number.isFinite(e[t]))}function mu(e){let t={};for(let r of sn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function ki(e){let t={};for(let r of sn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function $i(e,t){return e==="codex"?bt(t.input_tokens)+bt(t.output_tokens):so(t)}function gu(e){return e==="claude"?"Claude":"Codex"}function hu(e){return`\u03C4 ${Ai(e)}`}function bu(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${bt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${bt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${bt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Si),o.join(`
`)}function wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${gu(r)} ${hu(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:bu(r,n)})}return t}function Jn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of sn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=bt(l.breakdown[c])+bt(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function oo(e){return!e||typeof e!="object"?null:Dt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function yu(e){return e==="codex"?"codex":"claude"}function hr(){return{subtotal:0,breakdown:mu(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Qn(e,t,r){e.subtotal+=t.subtotal;for(let n of sn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=bt(e.breakdown[n])+bt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function xi(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Ai(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function zr(e){return _u(e)?`\u03C4 ${Ai(so(e))}`:null}function zt(e){let t=zr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Hr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${so(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Si),r.join(`
`)}function Dt(e,t){let r={claude:hr(),codex:hr()},n={orchestrator:{claude:hr(),codex:hr()},implementation:{claude:hr(),codex:hr()},"review-consult":{claude:hr(),codex:hr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(wi(c)){let _=yu(l.runner),m=ki(c),h={provider:_,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:$i(_,m)};m.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),Qn(r[_],h,!0),Qn(n.orchestrator[_],h,!0)}let d=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let _ of d){if(!_||_.provider!=="codex"||!fu.includes(_.role)||!wi(_.usage))continue;let m=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let h=ki(_.usage),E={provider:"codex",role:_.role,attempt_id:String(l.attempt_id||""),usage:h,subtotal:$i("codex",h)};E.receipt_id=m,typeof _.model=="string"&&(E.model=_.model),typeof _.session_id=="string"?E.session_id=_.session_id:typeof _.thread_id=="string"&&(E.session_id=_.thread_id),typeof _.turn_id=="string"&&(E.turn_id=_.turn_id),typeof _.completed_at=="string"&&(E.completed_at=_.completed_at),h.replayed===!0&&(E.replayed=!0),Qn(r.codex,E,!1),Qn(n[E.role].codex,E,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let d=xi(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(d.total_cost_usd=c.outer_cost),o[l]=d}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let d of["claude","codex"]){let _=n[l][d];_.legs.length>0&&(c[d]={...xi(_,!0),legs:_.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Di,setPrototypeOf:Ei,isFrozen:vu,getPrototypeOf:wu,getOwnPropertyDescriptor:ku}=Object,{freeze:At,seal:Mt,create:fo}=Object,{apply:_o,construct:mo}=typeof Reflect<"u"&&Reflect;At||(At=function(t){return t});Mt||(Mt=function(t){return t});_o||(_o=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});mo||(mo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var es=Et(Array.prototype.forEach),$u=Et(Array.prototype.lastIndexOf),Ti=Et(Array.prototype.pop),on=Et(Array.prototype.push),xu=Et(Array.prototype.splice),rs=Et(String.prototype.toLowerCase),ao=Et(String.prototype.toString),io=Et(String.prototype.match),an=Et(String.prototype.replace),Su=Et(String.prototype.indexOf),Au=Et(String.prototype.trim),Ht=Et(Object.prototype.hasOwnProperty),St=Et(RegExp.prototype.test),ln=Eu(TypeError);function Et(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return _o(e,t,n)}}function Eu(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return mo(e,r)}}function We(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:rs;Ei&&Ei(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(vu(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Tu(e){for(let t=0;t<e.length;t++)Ht(e,t)||(e[t]=null);return e}function or(e){let t=fo(null);for(let[r,n]of Di(e))Ht(e,r)&&(Array.isArray(n)?t[r]=Tu(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=or(n):t[r]=n);return t}function cn(e,t){for(;e!==null;){let n=ku(e,t);if(n){if(n.get)return Et(n.get);if(typeof n.value=="function")return Et(n.value)}e=wu(e)}function r(){return null}return r}var Ci=At(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),lo=At(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),co=At(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Cu=At(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),uo=At(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ru=At(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ri=At(["#text"]),Ii=At(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),po=At(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Li=At(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ts=At(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Iu=Mt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Lu=Mt(/<%[\w\W]*|[\w\W]*%>/gm),Ou=Mt(/\$\{[\w\W]*/gm),Pu=Mt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Du=Mt(/^aria-[\-\w]+$/),Mi=Mt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Mu=Mt(/^(?:\w+script|data):/i),Nu=Mt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ni=Mt(/^html$/i),Fu=Mt(/^[a-z][.\w]*(-[.\w]+)+$/i),Oi=Object.freeze({__proto__:null,ARIA_ATTR:Du,ATTR_WHITESPACE:Nu,CUSTOM_ELEMENT:Fu,DATA_ATTR:Pu,DOCTYPE_NAME:Ni,ERB_EXPR:Lu,IS_ALLOWED_URI:Mi,IS_SCRIPT_OR_DATA:Mu,MUSTACHE_EXPR:Iu,TMPLIT_EXPR:Ou}),dn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},qu=function(){return typeof window>"u"?null:window},Bu=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Pi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Fi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:qu(),t=G=>Fi(G);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==dn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:E}=e,k=c.prototype,M=cn(k,"cloneNode"),N=cn(k,"remove"),A=cn(k,"nextSibling"),$=cn(k,"childNodes"),P=cn(k,"parentNode");if(typeof a=="function"){let G=r.createElement("template");G.content&&G.content.ownerDocument&&(r=G.content.ownerDocument)}let I,S="",{implementation:B,createNodeIterator:V,createDocumentFragment:se,getElementsByTagName:ye}=r,{importNode:te}=n,de=Pi();t.isSupported=typeof Di=="function"&&typeof P=="function"&&B&&B.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ke,ERB_EXPR:Ue,TMPLIT_EXPR:Ie,DATA_ATTR:He,ARIA_ATTR:Ye,IS_SCRIPT_OR_DATA:Ve,ATTR_WHITESPACE:Fe,CUSTOM_ELEMENT:ve}=Oi,{IS_ALLOWED_URI:Ae}=Oi,be=null,Y=We({},[...Ci,...lo,...co,...uo,...Ri]),H=null,xe=We({},[...Ii,...po,...Li,...ts]),ae=Object.seal(fo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ie=null,W=null,U=Object.seal(fo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ge=!0,Pe=!0,O=!1,j=!0,R=!1,ee=!0,J=!1,fe=!1,ue=!1,Ee=!1,T=!1,F=!1,Q=!0,re=!1,w="user-content-",D=!0,Z=!1,De={},Le=null,qe=We({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Te=null,Qe=We({},["audio","video","img","source","image","track"]),kt=null,yt=We({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ct="http://www.w3.org/1998/Math/MathML",$t="http://www.w3.org/2000/svg",at="http://www.w3.org/1999/xhtml",ot=at,mt=!1,z=null,X=We({},[ct,$t,at],ao),ne=We({},["mi","mo","mn","ms","mtext"]),_e=We({},["annotation-xml"]),Se=We({},["title","style","font","a","script"]),Me=null,tt=["application/xhtml+xml","text/html"],Je="text/html",Ne=null,rt=null,Re=r.createElement("form"),ft=function(b){return b instanceof RegExp||b instanceof Function},xt=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(rt&&rt===b)){if((!b||typeof b!="object")&&(b={}),b=or(b),Me=tt.indexOf(b.PARSER_MEDIA_TYPE)===-1?Je:b.PARSER_MEDIA_TYPE,Ne=Me==="application/xhtml+xml"?ao:rs,be=Ht(b,"ALLOWED_TAGS")?We({},b.ALLOWED_TAGS,Ne):Y,H=Ht(b,"ALLOWED_ATTR")?We({},b.ALLOWED_ATTR,Ne):xe,z=Ht(b,"ALLOWED_NAMESPACES")?We({},b.ALLOWED_NAMESPACES,ao):X,kt=Ht(b,"ADD_URI_SAFE_ATTR")?We(or(yt),b.ADD_URI_SAFE_ATTR,Ne):yt,Te=Ht(b,"ADD_DATA_URI_TAGS")?We(or(Qe),b.ADD_DATA_URI_TAGS,Ne):Qe,Le=Ht(b,"FORBID_CONTENTS")?We({},b.FORBID_CONTENTS,Ne):qe,ie=Ht(b,"FORBID_TAGS")?We({},b.FORBID_TAGS,Ne):or({}),W=Ht(b,"FORBID_ATTR")?We({},b.FORBID_ATTR,Ne):or({}),De=Ht(b,"USE_PROFILES")?b.USE_PROFILES:!1,ge=b.ALLOW_ARIA_ATTR!==!1,Pe=b.ALLOW_DATA_ATTR!==!1,O=b.ALLOW_UNKNOWN_PROTOCOLS||!1,j=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,R=b.SAFE_FOR_TEMPLATES||!1,ee=b.SAFE_FOR_XML!==!1,J=b.WHOLE_DOCUMENT||!1,Ee=b.RETURN_DOM||!1,T=b.RETURN_DOM_FRAGMENT||!1,F=b.RETURN_TRUSTED_TYPE||!1,ue=b.FORCE_BODY||!1,Q=b.SANITIZE_DOM!==!1,re=b.SANITIZE_NAMED_PROPS||!1,D=b.KEEP_CONTENT!==!1,Z=b.IN_PLACE||!1,Ae=b.ALLOWED_URI_REGEXP||Mi,ot=b.NAMESPACE||at,ne=b.MATHML_TEXT_INTEGRATION_POINTS||ne,_e=b.HTML_INTEGRATION_POINTS||_e,ae=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&ft(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ae.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&ft(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ae.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),R&&(Pe=!1),T&&(Ee=!0),De&&(be=We({},Ri),H=[],De.html===!0&&(We(be,Ci),We(H,Ii)),De.svg===!0&&(We(be,lo),We(H,po),We(H,ts)),De.svgFilters===!0&&(We(be,co),We(H,po),We(H,ts)),De.mathMl===!0&&(We(be,uo),We(H,Li),We(H,ts))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?U.tagCheck=b.ADD_TAGS:(be===Y&&(be=or(be)),We(be,b.ADD_TAGS,Ne))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?U.attributeCheck=b.ADD_ATTR:(H===xe&&(H=or(H)),We(H,b.ADD_ATTR,Ne))),b.ADD_URI_SAFE_ATTR&&We(kt,b.ADD_URI_SAFE_ATTR,Ne),b.FORBID_CONTENTS&&(Le===qe&&(Le=or(Le)),We(Le,b.FORBID_CONTENTS,Ne)),D&&(be["#text"]=!0),J&&We(be,["html","head","body"]),be.table&&(We(be,["tbody"]),delete ie.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=b.TRUSTED_TYPES_POLICY,S=I.createHTML("")}else I===void 0&&(I=Bu(E,s)),I!==null&&typeof S=="string"&&(S=I.createHTML(""));At&&At(b),rt=b}},qt=We({},[...lo,...co,...Cu]),Xt=We({},[...uo,...Ru]),ur=function(b){let q=P(b);(!q||!q.tagName)&&(q={namespaceURI:ot,tagName:"template"});let pe=rs(b.tagName),Be=rs(q.tagName);return z[b.namespaceURI]?b.namespaceURI===$t?q.namespaceURI===at?pe==="svg":q.namespaceURI===ct?pe==="svg"&&(Be==="annotation-xml"||ne[Be]):!!qt[pe]:b.namespaceURI===ct?q.namespaceURI===at?pe==="math":q.namespaceURI===$t?pe==="math"&&_e[Be]:!!Xt[pe]:b.namespaceURI===at?q.namespaceURI===$t&&!_e[Be]||q.namespaceURI===ct&&!ne[Be]?!1:!Xt[pe]&&(Se[pe]||!qt[pe]):!!(Me==="application/xhtml+xml"&&z[b.namespaceURI]):!1},gt=function(b){on(t.removed,{element:b});try{P(b).removeChild(b)}catch{N(b)}},vt=function(b,q){try{on(t.removed,{attribute:q.getAttributeNode(b),from:q})}catch{on(t.removed,{attribute:null,from:q})}if(q.removeAttribute(b),b==="is")if(Ee||T)try{gt(q)}catch{}else try{q.setAttribute(b,"")}catch{}},pr=function(b){let q=null,pe=null;if(ue)b="<remove></remove>"+b;else{let Ze=io(b,/^[\r\n\t ]+/);pe=Ze&&Ze[0]}Me==="application/xhtml+xml"&&ot===at&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let Be=I?I.createHTML(b):b;if(ot===at)try{q=new h().parseFromString(Be,Me)}catch{}if(!q||!q.documentElement){q=B.createDocument(ot,"template",null);try{q.documentElement.innerHTML=mt?S:Be}catch{}}let Ke=q.body||q.documentElement;return b&&pe&&Ke.insertBefore(r.createTextNode(pe),Ke.childNodes[0]||null),ot===at?ye.call(q,J?"html":"body")[0]:J?q.documentElement:Ke},tr=function(b){return V.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Bt=function(b){return b instanceof m&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof _)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},Ut=function(b){return typeof l=="function"&&b instanceof l};function p(G,b,q){es(G,pe=>{pe.call(t,b,q,rt)})}let y=function(b){let q=null;if(p(de.beforeSanitizeElements,b,null),Bt(b))return gt(b),!0;let pe=Ne(b.nodeName);if(p(de.uponSanitizeElement,b,{tagName:pe,allowedTags:be}),ee&&b.hasChildNodes()&&!Ut(b.firstElementChild)&&St(/<[/\w!]/g,b.innerHTML)&&St(/<[/\w!]/g,b.textContent)||b.nodeType===dn.progressingInstruction||ee&&b.nodeType===dn.comment&&St(/<[/\w]/g,b.data))return gt(b),!0;if(!(U.tagCheck instanceof Function&&U.tagCheck(pe))&&(!be[pe]||ie[pe])){if(!ie[pe]&&oe(pe)&&(ae.tagNameCheck instanceof RegExp&&St(ae.tagNameCheck,pe)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(pe)))return!1;if(D&&!Le[pe]){let Be=P(b)||b.parentNode,Ke=$(b)||b.childNodes;if(Ke&&Be){let Ze=Ke.length;for(let we=Ze-1;we>=0;--we){let v=M(Ke[we],!0);v.__removalCount=(b.__removalCount||0)+1,Be.insertBefore(v,A(b))}}}return gt(b),!0}return b instanceof c&&!ur(b)||(pe==="noscript"||pe==="noembed"||pe==="noframes")&&St(/<\/no(script|embed|frames)/i,b.innerHTML)?(gt(b),!0):(R&&b.nodeType===dn.text&&(q=b.textContent,es([ke,Ue,Ie],Be=>{q=an(q,Be," ")}),b.textContent!==q&&(on(t.removed,{element:b.cloneNode()}),b.textContent=q)),p(de.afterSanitizeElements,b,null),!1)},x=function(b,q,pe){if(Q&&(q==="id"||q==="name")&&(pe in r||pe in Re))return!1;if(!(Pe&&!W[q]&&St(He,q))){if(!(ge&&St(Ye,q))){if(!(U.attributeCheck instanceof Function&&U.attributeCheck(q,b))){if(!H[q]||W[q]){if(!(oe(b)&&(ae.tagNameCheck instanceof RegExp&&St(ae.tagNameCheck,b)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(b))&&(ae.attributeNameCheck instanceof RegExp&&St(ae.attributeNameCheck,q)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck(q,b))||q==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&St(ae.tagNameCheck,pe)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(pe))))return!1}else if(!kt[q]){if(!St(Ae,an(pe,Fe,""))){if(!((q==="src"||q==="xlink:href"||q==="href")&&b!=="script"&&Su(pe,"data:")===0&&Te[b])){if(!(O&&!St(Ve,an(pe,Fe,"")))){if(pe)return!1}}}}}}}return!0},oe=function(b){return b!=="annotation-xml"&&io(b,ve)},me=function(b){p(de.beforeSanitizeAttributes,b,null);let{attributes:q}=b;if(!q||Bt(b))return;let pe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:H,forceKeepAttr:void 0},Be=q.length;for(;Be--;){let Ke=q[Be],{name:Ze,namespaceURI:we,value:v}=Ke,f=Ne(Ze),u=v,C=Ze==="value"?u:Au(u);if(pe.attrName=f,pe.attrValue=C,pe.keepAttr=!0,pe.forceKeepAttr=void 0,p(de.uponSanitizeAttribute,b,pe),C=pe.attrValue,re&&(f==="id"||f==="name")&&(vt(Ze,b),C=w+C),ee&&St(/((--!?|])>)|<\/(style|title|textarea)/i,C)){vt(Ze,b);continue}if(f==="attributename"&&io(C,"href")){vt(Ze,b);continue}if(pe.forceKeepAttr)continue;if(!pe.keepAttr){vt(Ze,b);continue}if(!j&&St(/\/>/i,C)){vt(Ze,b);continue}R&&es([ke,Ue,Ie],he=>{C=an(C,he," ")});let K=Ne(b.nodeName);if(!x(K,f,C)){vt(Ze,b);continue}if(I&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!we)switch(E.getAttributeType(K,f)){case"TrustedHTML":{C=I.createHTML(C);break}case"TrustedScriptURL":{C=I.createScriptURL(C);break}}if(C!==u)try{we?b.setAttributeNS(we,Ze,C):b.setAttribute(Ze,C),Bt(b)?gt(b):Ti(t.removed)}catch{vt(Ze,b)}}p(de.afterSanitizeAttributes,b,null)},Ge=function G(b){let q=null,pe=tr(b);for(p(de.beforeSanitizeShadowDOM,b,null);q=pe.nextNode();)p(de.uponSanitizeShadowNode,q,null),y(q),me(q),q.content instanceof o&&G(q.content);p(de.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(G){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},q=null,pe=null,Be=null,Ke=null;if(mt=!G,mt&&(G="<!-->"),typeof G!="string"&&!Ut(G))if(typeof G.toString=="function"){if(G=G.toString(),typeof G!="string")throw ln("dirty is not a string, aborting")}else throw ln("toString is not a function");if(!t.isSupported)return G;if(fe||xt(b),t.removed=[],typeof G=="string"&&(Z=!1),Z){if(G.nodeName){let v=Ne(G.nodeName);if(!be[v]||ie[v])throw ln("root node is forbidden and cannot be sanitized in-place")}}else if(G instanceof l)q=pr("<!---->"),pe=q.ownerDocument.importNode(G,!0),pe.nodeType===dn.element&&pe.nodeName==="BODY"||pe.nodeName==="HTML"?q=pe:q.appendChild(pe);else{if(!Ee&&!R&&!J&&G.indexOf("<")===-1)return I&&F?I.createHTML(G):G;if(q=pr(G),!q)return Ee?null:F?S:""}q&&ue&&gt(q.firstChild);let Ze=tr(Z?G:q);for(;Be=Ze.nextNode();)y(Be),me(Be),Be.content instanceof o&&Ge(Be.content);if(Z)return G;if(Ee){if(T)for(Ke=se.call(q.ownerDocument);q.firstChild;)Ke.appendChild(q.firstChild);else Ke=q;return(H.shadowroot||H.shadowrootmode)&&(Ke=te.call(n,Ke,!0)),Ke}let we=J?q.outerHTML:q.innerHTML;return J&&be["!doctype"]&&q.ownerDocument&&q.ownerDocument.doctype&&q.ownerDocument.doctype.name&&St(Ni,q.ownerDocument.doctype.name)&&(we="<!DOCTYPE "+q.ownerDocument.doctype.name+`>
`+we),R&&es([ke,Ue,Ie],v=>{we=an(we,v," ")}),I&&F?I.createHTML(we):we},t.setConfig=function(){let G=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xt(G),fe=!0},t.clearConfig=function(){rt=null,fe=!1},t.isValidAttribute=function(G,b,q){rt||xt({});let pe=Ne(G),Be=Ne(b);return x(pe,Be,q)},t.addHook=function(G,b){typeof b=="function"&&on(de[G],b)},t.removeHook=function(G,b){if(b!==void 0){let q=$u(de[G],b);return q===-1?void 0:xu(de[G],q,1)[0]}return Ti(de[G])},t.removeHooks=function(G){de[G]=[]},t.removeAllHooks=function(){de=Pi()},t}var qi=Fi();var ar={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ns=e=>(...t)=>({_$litDirective$:e,values:t}),Gr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var un=class extends Gr{constructor(t){if(super(t),this.it=lt,t.type!==ar.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===lt||t==null)return this._t=void 0,this.it=t;if(t===Ot)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};un.directiveName="unsafeHTML",un.resultType=1;var Bi=ns(un);function yo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Or=yo();function Vi(e){Or=e}var mn={exec:()=>null};function Xe(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Tt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Uu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Tt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ju=/^(?:[ \t]*(?:\n|$))+/,Wu=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,zu=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Hu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,vo=/(?:[*+-]|\d{1,9}[.)])/,Yi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ki=Xe(Yi).replace(/bull/g,vo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Gu=Xe(Yi).replace(/bull/g,vo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),wo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Vu=/^[^\n]+/,ko=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Yu=Xe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ko).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ku=Xe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,vo).getRegex(),cs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$o=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Zu=Xe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",$o).replace("tag",cs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Zi=Xe(wo).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex(),Xu=Xe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Zi).getRegex(),xo={blockquote:Xu,code:Wu,def:Yu,fences:zu,heading:Hu,hr:gn,html:Zu,lheading:Ki,list:Ku,newline:ju,paragraph:Zi,table:mn,text:Vu},Ui=Xe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex(),Qu={...xo,lheading:Gu,table:Ui,paragraph:Xe(wo).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ui).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex()},Ju={...xo,html:Xe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",$o).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Xe(wo).replace("hr",gn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ki).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ep=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,tp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xi=/^( {2,}|\\)\n(?!\s*$)/,rp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ds=/[\p{P}\p{S}]/u,So=/[\s\p{P}\p{S}]/u,Qi=/[^\s\p{P}\p{S}]/u,np=Xe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,So).getRegex(),Ji=/(?!~)[\p{P}\p{S}]/u,sp=/(?!~)[\s\p{P}\p{S}]/u,op=/(?:[^\s\p{P}\p{S}]|~)/u,ap=Xe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Uu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),el=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ip=Xe(el,"u").replace(/punct/g,ds).getRegex(),lp=Xe(el,"u").replace(/punct/g,Ji).getRegex(),tl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",cp=Xe(tl,"gu").replace(/notPunctSpace/g,Qi).replace(/punctSpace/g,So).replace(/punct/g,ds).getRegex(),dp=Xe(tl,"gu").replace(/notPunctSpace/g,op).replace(/punctSpace/g,sp).replace(/punct/g,Ji).getRegex(),up=Xe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Qi).replace(/punctSpace/g,So).replace(/punct/g,ds).getRegex(),pp=Xe(/\\(punct)/,"gu").replace(/punct/g,ds).getRegex(),fp=Xe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),_p=Xe($o).replace("(?:-->|$)","-->").getRegex(),mp=Xe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",_p).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),as=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,gp=Xe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",as).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),rl=Xe(/^!?\[(label)\]\[(ref)\]/).replace("label",as).replace("ref",ko).getRegex(),nl=Xe(/^!?\[(ref)\](?:\[\])?/).replace("ref",ko).getRegex(),hp=Xe("reflink|nolink(?!\\()","g").replace("reflink",rl).replace("nolink",nl).getRegex(),ji=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ao={_backpedal:mn,anyPunctuation:pp,autolink:fp,blockSkip:ap,br:Xi,code:tp,del:mn,emStrongLDelim:ip,emStrongRDelimAst:cp,emStrongRDelimUnd:up,escape:ep,link:gp,nolink:nl,punctuation:np,reflink:rl,reflinkSearch:hp,tag:mp,text:rp,url:mn},bp={...Ao,link:Xe(/^!?\[(label)\]\((.*?)\)/).replace("label",as).getRegex(),reflink:Xe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",as).getRegex()},go={...Ao,emStrongRDelimAst:dp,emStrongLDelim:lp,url:Xe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ji).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Xe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ji).getRegex()},yp={...go,br:Xe(Xi).replace("{2,}","*").getRegex(),text:Xe(go.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ss={normal:xo,gfm:Qu,pedantic:Ju},pn={normal:Ao,gfm:go,breaks:yp,pedantic:bp},vp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Wi=e=>vp[e];function ir(e,t){if(t){if(Tt.escapeTest.test(e))return e.replace(Tt.escapeReplace,Wi)}else if(Tt.escapeTestNoEncode.test(e))return e.replace(Tt.escapeReplaceNoEncode,Wi);return e}function zi(e){try{e=encodeURI(e).replace(Tt.percentDecode,"%")}catch{return null}return e}function Hi(e,t){let r=e.replace(Tt.findPipe,(o,a,l)=>{let c=!1,d=a;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Tt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Tt.slashPipe,"|");return n}function fn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function wp(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Gi(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function kp(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var is=class{constructor(e){nt(this,"options");nt(this,"rules");nt(this,"lexer");this.options=e||Or}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:fn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=kp(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=fn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=fn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let d=l.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=m,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let E=h,k=E.raw+`
`+r.join(`
`),M=this.blockquote(k);o[o.length-1]=M,n=n.substring(0,n.length-E.raw.length)+M.raw,s=s.substring(0,s.length-E.text.length)+M.text;break}else if(h?.type==="list"){let E=h,k=E.raw+`
`+r.join(`
`),M=this.list(k);o[o.length-1]=M,n=n.substring(0,n.length-h.raw.length)+M.raw,s=s.substring(0,s.length-E.raw.length)+M.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),h=e.split(`
`,1)[0],E=!m.trim(),k=0;if(this.options.pedantic?(k=2,_=m.trimStart()):E?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,_=m.slice(k),k+=t[1].length),E&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let M=this.rules.other.nextBulletRegex(k),N=this.rules.other.hrRegex(k),A=this.rules.other.fencesBeginRegex(k),$=this.rules.other.headingBeginRegex(k),P=this.rules.other.htmlBeginRegex(k);for(;e;){let I=e.split(`
`,1)[0],S;if(h=I,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),S=h):S=h.replace(this.rules.other.tabCharGlobal,"    "),A.test(h)||$.test(h)||P.test(h)||M.test(h)||N.test(h))break;if(S.search(this.rules.other.nonSpaceChar)>=k||!h.trim())_+=`
`+S.slice(k);else{if(E||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(m)||$.test(m)||N.test(m))break;_+=`
`+h}!E&&!h.trim()&&(E=!0),d+=I+`
`,e=e.substring(I.length+1),m=S.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(c.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};c.checked=_.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=_.raw+c.tokens[0].raw,c.tokens[0].text=_.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(_)):c.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):c.tokens.unshift(_)}}if(!s.loose){let d=c.tokens.filter(m=>m.type==="space"),_=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=_}}if(s.loose)for(let c of s.items){c.loose=!0;for(let d of c.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Hi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Hi(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=fn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=wp(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Gi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Gi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let _=[...n[0]][0].length,m=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let E=m.slice(1,-1);return{type:"em",raw:m,text:E,tokens:this.lexer.inlineTokens(E)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Gt=class ho{constructor(t){nt(this,"tokens");nt(this,"options");nt(this,"state");nt(this,"inlineQueue");nt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Or,this.options.tokenizer=this.options.tokenizer||new is,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Tt,block:ss.normal,inline:pn.normal};this.options.pedantic?(r.block=ss.pedantic,r.inline=pn.pedantic):this.options.gfm&&(r.block=ss.gfm,this.options.breaks?r.inline=pn.breaks:r.inline=pn.gfm),this.tokenizer.rules=r}static get rules(){return{block:ss,inline:pn}}static lex(t,r){return new ho(r).lex(t)}static lexInline(t,r){return new ho(r).inlineTokens(t)}lex(t){t=t.replace(Tt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Tt.tabCharGlobal,"    ").replace(Tt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),c;this.options.extensions.startBlock.forEach(d=>{c=d.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(_=>(c=_.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let _=r.at(-1);c.type==="text"&&_?.type==="text"?(_.raw+=c.raw,_.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(E=>{h=E.call({lexer:this},m),typeof h=="number"&&h>=0&&(_=Math.min(_,h))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(c=this.tokenizer.inlineText(d)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=c.raw,_.text+=c.text):r.push(c);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},ls=class{constructor(e){nt(this,"options");nt(this,"parser");this.options=e||Or}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Tt.notSpaceStart)?.[0],s=e.replace(Tt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ir(n)+'">'+(r?s:ir(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ir(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ir(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=zi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+ir(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=zi(e);if(s===null)return ir(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${ir(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ir(e.text)}},Eo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Vt=class bo{constructor(t){nt(this,"options");nt(this,"renderer");nt(this,"textRenderer");this.options=t||Or,this.options.renderer=this.options.renderer||new ls,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Eo}static parse(t,r){return new bo(r).parse(t)}static parseInline(t,r){return new bo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},os,_n=(os=class{constructor(e){nt(this,"options");nt(this,"block");this.options=e||Or}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Gt.lex:Gt.lexInline}provideParser(){return this.block?Vt.parse:Vt.parseInline}},nt(os,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),nt(os,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),os),$p=class{constructor(...e){nt(this,"defaults",yo());nt(this,"options",this.setOptions);nt(this,"parse",this.parseMarkdown(!0));nt(this,"parseInline",this.parseMarkdown(!1));nt(this,"Parser",Vt);nt(this,"Renderer",ls);nt(this,"TextRenderer",Eo);nt(this,"Lexer",Gt);nt(this,"Tokenizer",is);nt(this,"Hooks",_n);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new ls(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...d)=>{let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new is(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...d)=>{let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new _n;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];_n.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&_n.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,d);return c.call(s,m)})();let _=l.call(s,d);return c.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,d);return m===!1&&(m=await c.apply(s,d)),m})();let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Gt.lex(e,t??this.defaults)}parser(e,t){return Vt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+ir(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Lr=new $p;function et(e,t){return Lr.parse(e,t)}et.options=et.setOptions=function(e){return Lr.setOptions(e),et.defaults=Lr.defaults,Vi(et.defaults),et};et.getDefaults=yo;et.defaults=Or;et.use=function(...e){return Lr.use(...e),et.defaults=Lr.defaults,Vi(et.defaults),et};et.walkTokens=function(e,t){return Lr.walkTokens(e,t)};et.parseInline=Lr.parseInline;et.Parser=Vt;et.parser=Vt.parse;et.Renderer=ls;et.TextRenderer=Eo;et.Lexer=Gt;et.lexer=Gt.lex;et.Tokenizer=is;et.Hooks=_n;et.parse=et;var gg=et.options,hg=et.setOptions,bg=et.use,yg=et.walkTokens,vg=et.parseInline;var wg=Vt.parse,kg=Gt.lex;function br(e){let t=et.parse(e),r=qi.sanitize(t);return Bi(r)}function lr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Vr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function us(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var xp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Sp=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ap=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function yr(e){return!!e&&typeof e=="object"}function To(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function sl(e,t){let r=To(e),n=To(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Ep(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>yr(s)&&typeof s.text=="string"?s.text:"").join(""):yr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Tp(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:xp[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=To(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=sl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=sl(yr(l)?l.old_string:"",yr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ol(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function al(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Sp.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Ap.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Cp(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(yr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(al(o.text));else if(o.type==="thinking"){let a=ol(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Tp(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(yr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Ep(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Rp(e){if(e.type==="item.completed"&&yr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[al(t.text)];if(t.type==="reasoning"){let r=ol(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Ip(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function il(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!yr(o))continue;let a=Ip(o)?Rp(o):Cp(o,r);for(let l of a)t.push(l)}return t}var Lp=5,Op=10,Pp=/Task\s+#(\d+)/,Dp=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Mp=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ps(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Np(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Fp(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function qp(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Pp.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!c||d.length===0)continue;t.set(c[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Bp(e){if(e.tool==="Bash"){let t=e.command||"";return Dp.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Mp.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Up(e){let t=e.filter(s=>s.kind==="tool").slice(-Op),r=new Map;t.forEach((s,o)=>{let a=Bp(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function jp(e){let t=Fp(e);if(t)return{text:t,guess:!1};let r=qp(e);if(r)return{text:r,guess:!1};let n=Up(e);return n?{text:n,guess:!0}:null}function Wp(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Lt(e,t)}function fs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,c=new Set,d=new Set,_=null,m=null,h=!1,E=!1,k=!1,M=null,N=null;function A(){h=!1,E=!1,k=!1,M=null,N=null}async function $(W){if(r){E=!0,k=!1,Fe();try{let U=await Promise.resolve(r("get-attempt-prompt",{attempt_id:W}));if(o!==W)return;!U||typeof U!="object"||Array.isArray(U)?k=!0:(M=U,N=W)}catch{o===W&&(k=!0)}finally{o===W&&(E=!1,Fe())}}}function P(){if(h=!h,h&&o&&N!==o){$(o);return}Fe()}function I(){if(!h)return"";let W=Vr({loading:E,error:k});if(W)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${W}
      </div>`;if(!M)return"";if(M.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let U=us(M.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${U?i`<div class="prompt-block__meta">${U} 발송</div>`:""}
      ${typeof M.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",M.task_prompt):""}
      ${typeof M.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",M.system_prompt):""}
    </div>`}function S(){if(!o||!n)return[];let W=n.get(o);return il(W?W.lines:[])}function B(){if(!o||!n)return null;let W=n.get(o),U=W?W.last_event_at:null;return typeof U=="number"?U:null}function V(){return a.status==="running"}function se(){if(V()&&o){m||(m=setInterval(()=>Fe(),1e3));return}ye()}function ye(){m&&(clearInterval(m),m=null)}function te(W){let U=[],ge=0;for(;ge<W.length;){let Pe=W[ge];if(Pe.kind==="tool"){let O=ge;for(;O<W.length&&W[O].kind==="tool"&&W[O].tool===Pe.tool;)O+=1;if(O-ge>=Lp&&!d.has(ge)){U.push({kind:"group",idx:ge,tool:Pe.tool||"",lines:W.slice(ge,O).map((j,R)=>({idx:ge+R,line:j}))}),ge=O;continue}}U.push({kind:"line",idx:ge,line:Pe}),ge+=1}return U}function de(W){for(let U=W.length-1;U>=0;U-=1){let ge=W[U];if(ge.kind==="result"||ge.kind==="error")return null;if(ge.kind==="tool"&&!Object.hasOwn(ge,"result"))return ge}return null}function ke(W){for(let U=W.length-1;U>=0;U-=1)if(W[U].kind==="thinking")return W[U];return null}function Ue(W,U){if(U.kind==="gate")return i`<div class="sv__gate">${U.text}</div>`;if(U.kind==="phase")return i`<div class="sv__phase">${U.text}</div>`;if(U.kind==="result")return i`<div
        class="sv__result${U.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${U.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${br(U.text||(U.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(U.kind==="thinking"){let ge=c.has(W);return i`<div
        class="sv__think${ge?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ae(W)}
      >
        <span class="sv__think-line">💭 ${ps(U.text)}</span>
        ${ge?i`<pre class="sv__think-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="error")return i`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="blocker")return i`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="tool"){let ge=c.has(W),Pe=U.tool==="Bash"?Np(U.command):0,O=U.tool==="Bash"?Pe>1?ps(U.command):U.command:U.path||U.command||"";return i`<div
        class="sv__tool${ge?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ae(W)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${U.icon}</span>
          <span class="sv__tool-name">${U.tool}</span>
          ${O?i`<span class="sv__tool-detail">${O}</span>`:""}
          ${Pe>1?i`<span class="sv__tool-more">⋯ ${Pe}줄</span>`:""}
          ${typeof U.added=="number"?i`<span class="sv__diff-add">+${U.added}</span>`:""}
          ${typeof U.removed=="number"?i`<span class="sv__diff-del">−${U.removed}</span>`:""}
          ${U.result?i`<span class="sv__tool-ok">→ ${U.result}</span>`:""}
        </span>
        ${ge?i`<pre class="sv__tool-expand">${Ie(U)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${br(U.text||"")}</div>`}function Ie(W){let U=[];if(W.tool==="Bash"&&typeof W.command=="string"&&W.command.length>0)U.push(W.command);else if(W.input!==void 0)try{U.push(`input: ${JSON.stringify(W.input,null,2)}`)}catch{}return typeof W.output=="string"&&W.output.length>0&&U.push(`output:
${W.output}`),U.join(`

`)}function He(){if(!o)return i``;let W=S(),U=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ge=a.session_id||"",Pe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,O=V(),j=O?Wp(B(),Date.now()):"",R=O?de(W):null,ee=O?ke(W):null,J=jp(W);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${J?i`<span
              class="sv__stage${J.guess?" sv__stage--guess":""}"
              title=${J.text}
              >${J.text}</span
            >`:""}
        ${O?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${j?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${j}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${j?i`<span class="sv__live-ago">${j}</span>`:""}</span
            >`:""}
        ${ge?i`<button
              type="button"
              class="sv__session"
              title=${ge}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ge}`}
              @click=${()=>Y(ge)}
            >
              ⧉ ${ge.slice(0,8)}
            </button>`:""}
        ${U?i`<span class="sv__meta">${U}</span>`:""}
        ${a.worktree?i`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${P}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Pe}
          @click=${be}
        >
          <span class="sv__follow-full">⇣ ${Pe}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ie()}
        >
          ✕
        </button>
      </div>
      ${I()}
      <div class="sv__body">
        ${W.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:te(W).map(fe=>fe.kind==="group"?Ye(fe):Ue(fe.idx,fe.line))}
      </div>
      ${R||ee?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${R?i`<span class="sv__now-icon">${R.icon}</span>
                  <span class="sv__now-name">${R.tool}</span>
                  <span class="sv__now-detail"
                    >${R.tool==="Bash"?ps(R.command):R.path||R.command||""}</span
                  >`:""}
            ${ee?i`<span class="sv__now-think"
                  >💭 ${ps(ee.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ye(W){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ve(W.idx)}
    >
      <span class="sv__group-icon">${W.lines[0].line.icon}</span>
      <span class="sv__group-name">${W.tool}</span>
      <span class="sv__group-count">${W.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ve(W){d.add(W),Fe()}function Fe(){ze(He(),e),se(),l&&ve()}function ve(){let W=e.querySelector(".sv__body");W&&(W.scrollTop=W.scrollHeight)}function Ae(W){c.has(W)?c.delete(W):c.add(W),Fe()}function be(){l=!l,Fe()}function Y(W){Ir(W).then(U=>{U?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function H(W){!o||!W||(a={...a,...W},Fe())}function xe(W){let U=W.target;if(!U||!U.classList||!U.classList.contains("sv__body"))return;!(U.scrollHeight-U.scrollTop-U.clientHeight<=4)&&l&&(l=!1,Fe())}e.addEventListener("scroll",xe,!0);function ae(W){let U=W&&W.attempt_id;U&&(o=U,a=W.meta||{},l=!0,c.clear(),d.clear(),A(),!_&&n&&(_=n.subscribe(Fe)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Fe())}function ie(){let W=o;o=null,c.clear(),d.clear(),A(),ye(),r&&W&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${W}`})).catch(()=>{}),ze(i``,e),s&&s()}return{open:ae,updateMeta:H,close:ie,isOpen(){return o!==null},destroy(){ye(),_&&(_(),_=null),e.removeEventListener("scroll",xe,!0),o=null,ze(i``,e)}}}function hn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=ll(t.spec_id),s=ll(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ll(e){return typeof e=="string"?e.trim():""}function zp(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Hp(e){let t=e&&e.metadata||{},r=hn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:zp(t)?null:"plan_pending"}),n}function cl(e,t){let r=Hp(e);return i`
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
  `}var Gp="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Vp=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Yp=/^\*\*결론\*\* — (.+)$/;function _s(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Gp)return null;let r=Vp.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?Yp.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",d=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(d).join(`
`).trim()}}var dl=20;function ul(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Kp(e){return e.length>dl?`${e.slice(0,dl)}\u2026`:e}function Zp(e,t,r,n){let s=`${t.lane} ${Kp(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${ul(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${br(t.body)}
        </div>`:""}
  </div>`}function Xp(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ul(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${br(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function pl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,d)=>String(d.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let d=_s(typeof c.text=="string"?c.text:"");return d?Zp(c,d,t,s.has(c.id)):Xp(c)})}
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
  `}var{I:th}=Fa;var fl=e=>e.strings===void 0;var Qp={},_l=(e,t=Qp)=>e._$AH=t;var Pr=ns(class extends Gr{constructor(e){if(super(e),e.type!==ar.PROPERTY&&e.type!==ar.ATTRIBUTE&&e.type!==ar.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!fl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ot||t===lt)return t;let r=e.element,n=e.name;if(e.type===ar.PROPERTY){if(t===r[n])return Ot}else if(e.type===ar.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Ot}else if(e.type===ar.ATTRIBUTE&&r.getAttribute(n)===t+"")return Ot;return _l(e),t}});var Co=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ms=["orchestration_model","orchestration_effort","orchestration_speed"],ml=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],gs=["delegated","main"],hs=["inherit","claude","codex"],bn=["default","fast"],bs=["standard","fast_track"],yn=["codex","opus","fable","self","skip"],ys=["codex","fable","skip"],vs=["low","medium","high","xhigh"],Nt="auto";function cr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function gl(e){if(!cr(e)||!cr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))cr(n)&&cr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function hl(e){return e?.impl_dispatch==="main"}function ws(e,t){let r=gl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Nt,...n.flatMap(([,s])=>s)]}function Yr(e,t,r){if(!cr(e)||!cr(e.runners))return[Nt];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!cr(o)||!cr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,l]of Object.entries(o.models)){if(r&&r!==Nt&&a!==r)continue;let c=cr(l)?l.efforts:null;if(Array.isArray(c))for(let d of c)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[Nt,...n]}function ks(e,t){let r=gl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function bl(e,t){let r={};for(let n of Co){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function yl(e,t){let r={};for(let n of ms){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Ro=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...ms]}],Io={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},wl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function vl(e){return typeof e=="string"&&e.length>0?e:null}function Jp(e,t,r){let n=vl(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=vl(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function $s(e,t,r){return e.map(n=>({key:n,...Jp(n,t,r)}))}function kl(e,t,r){let n={pin:0,global:0,base:0};for(let s of $s(e,t,r))n[s.source]+=1;return n}function $l(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function xl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var dh=[...Co,...ms];var ef=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],tf={pin:"pin",global:"global",base:"base"};function rf(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${tf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function nf(e,t,r){switch(e){case"workflow_mode":return bs;case"spec_review_model":case"impl_review_model":return yn;case"plan_review_model":return ys;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return vs;case"impl_dispatch":return gs;case"impl_runtime":return hs;case"impl_model":return ws(r,t.impl_runtime);case"impl_effort":return Yr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return bn;case"orchestration_model":return ks(r,null);case"orchestration_effort":return Yr(r,void 0,t.orchestration_model||Nt).filter(n=>n!==Nt);default:return[]}}function sf(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${rf(e.source)}
    <span class="detail-effective__k"
      >${Io[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${wl[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Io[e.key]||e.key} \uD3B8\uC9D1`}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>(기본)</option>
          ${t.options.map(r=>i`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===Nt?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function Sl(e,t){let r=Ro.flatMap(o=>o.keys),n=kl(r,e.metadata,e.workspace_values),s={};for(let o of $s(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
  >
    <button
      type="button"
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      aria-expanded=${e.expanded?"true":"false"}
      @click=${t.onToggle}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary">${of(s)}</span>
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${n.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${n.global}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </button>
    <div class="detail-effective__body">
      ${Ro.map(o=>i`
          <div class="detail-effective__subhead">${o.label}</div>
          ${$s(o.keys,e.metadata,e.workspace_values).map(a=>sf(a,{expanded:e.expanded,options:nf(a.key,s,e.catalog),onEdit:t.onEdit}))}
        `)}
      <div class="detail-effective__foot">
        <select
          data-impl-preset-select
          aria-label="구현 프리셋"
          .value=${Pr(e.preset_id)}
          ?disabled=${e.preset_busy}
          @change=${o=>t.onPresetSelect(String(o.target.value))}
        >
          <option value="" ?selected=${e.preset_id===""}>
            구현 프리셋…
          </option>
          ${e.presets.map(o=>i`<option
                value=${o.id}
                ?selected=${o.id===e.preset_id}
              >
                ${o.name}${o.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
        <span class="detail-effective__hint">구현 키 5개를 핀으로 기록</span>
      </div>
    </div>
  </section>`}function of(e){let t=[];if(typeof e.workflow_mode=="string"&&t.push(String(e.workflow_mode)),e.impl_dispatch==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch==="delegated"){let r=typeof e.impl_runtime=="string"?` ${e.impl_runtime}`:"";t.push(`\uC704\uC784${r}`)}else typeof e.impl_runtime=="string"&&t.push(`\uC704\uC784 ${e.impl_runtime}`);return typeof e.impl_model=="string"&&t.push(String(e.impl_model)),t.length>0?t.join(" \xB7 "):"\uAE30\uBCF8"}function Al(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",l=Zn(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${l?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${l.kind}
            title=${l.title}
            >${l.label}</span
          >`:""}
      ${a?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${ef.map(c=>{let d=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",_=n[c.id],m=d.length>0||_?.fill==="full",h=!m&&_?.fill==="dim",E=_?.stale===!0;return i`<span
          class=${`detail-summary__gate${m?" detail-summary__gate--on":""}${h?" detail-summary__gate--current":""}${E?" detail-summary__gate--stale":""}`}
          data-gate=${c.id}
        >
          <span class="detail-summary__gate-pill">${c.label}</span>
          ${d?i`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var El=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function vn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function xs(e){if(!vn(e)||!vn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>vn(r)&&vn(r.models));return t.length>0?t:null}function Lo(e,t){let r=xs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Tl(e,t){return vn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Cl(e,t){let r=xs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Tl(n,n.models[t]);return[]}function af(e){let t=xs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Tl(n,s))r.includes(o)||r.push(o);return r}function lf(e,t){if(!t)return af(e);let n=xs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Cl(e,o))s.includes(a)||s.push(a);return s}function Rl(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Lo(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Cl(t,n.impl_model):lf(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function cf(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Il(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c(k){k.key==="Escape"&&s&&(k.preventDefault(),h())}document.addEventListener("keydown",c);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${cf(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${l}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:br(a)}
          </div>
        </div>
      </div>
    `:i``}function _(){ze(d(),e)}async function m(k,M={}){s=k,o="loading",a="",l="",_();let N=r?r():"";if(!N){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let A="/api/doc?workspace="+encodeURIComponent(N)+"&path="+encodeURIComponent(k);try{let $=await n(A),P=await $.json().catch(()=>({}));if(!$.ok||!P||P.ok!==!0){if(P?.error==="not_found"&&M.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(P&&P.error||$.status)+")",_();return}a=String(P.content||""),o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function h(){s=null,ze(i``,e)}function E(){document.removeEventListener("keydown",c),h()}return{open:m,close:h,destroy:E}}var df=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Pl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function uf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function pf(e){let t=wt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=zr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Pl}
          >부분 집계</span
        >`:""}`}function Ll(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ol(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Dl(t):""}function ff(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=wt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?i`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${Ol(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${Ol(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function _f(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...df,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${uf(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Pl}</span>`:""}
  </div>`}var mf={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Dl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function gf(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Ml(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let m=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),E=m&&!h,k=m?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!E}
      title=${k}
      @click=${M=>{M.stopPropagation(),E&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let m=d.cause_detail,h=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:d.cause;return i`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},c=d=>{let _=Ll(oo(d));if(wt(_).length===0&&!zr(d.usage))return"";let m=s.has(d.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${pf(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let _=oo(d),m=Ll(_),h=wt(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${mf[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${gr(d)?i`<span
                  class="detail-session__resumed"
                  title=${gr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Jt(d)}</span>
            ${h.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(E=>i`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):zr(d.usage)?i`<span class="detail-session__usage"
                    >${zr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Dl(d.started_at)}</span>
          </button>
          ${c(d)} ${a(d)} ${l(d)} ${gf(d)}
          ${s.has(d.attempt_id)&&d.usage?_f(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${ff(_)}
        </div>`})}
    </div>
  `}function Nl(e,t={}){return i`
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
          ${hf(e)}
        </div>`:""}
  `}function hf(e){let t=Vr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?lr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=us(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var bf=["open","in_progress","deferred","resolved","closed"],yf=[0,1,2,3,4];function Fl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,d=null,_=null,m={},h="",E=!1,k=!1,M={},N=!1,A=!1,$="",P="",I="";function S(){N=!1,A=!1,$="",P="",I=""}let B=[],V=null,se=null,ye=!1,te="",de=!1,ke=0,Ue=new Set;function Ie(){B=[],V=null,se=null,ye=!1,te="",de=!1,ke+=1,Ue.clear()}async function He(v){if(!s)return;let f=++ke;try{let u=await Promise.resolve(s("get-comments",{id:v}));if(f!==ke||v!==d)return;B=Array.isArray(u)?u:[],ye=!1}catch{if(f!==ke||v!==d)return;ye=!0}we()}function Ye(){if(!s||!d)return;let v=_&&typeof _.comment_count=="number"?_.comment_count:null;if(V!==d){V=d,se=v,He(d);return}v!==null&&v!==se&&(se=v,He(d))}function Ve(v){Ue.has(v)?Ue.delete(v):Ue.add(v),we()}function Fe(v){let f=te.trim().length===0;te=v,f!==(v.trim().length===0)&&we()}async function ve(){let v=te.trim();if(!s||!d||v.length===0||de)return;let f=d;de=!0,we();let u=!1;try{let C=await Promise.resolve(s("add-comment",{id:f,text:v}));Array.isArray(C)&&C.length>0&&(u=!0,f===d&&(B=C,ye=!1,te="",se=C.length))}catch{u=!1}u||le("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),f===d&&(de=!1),we()}let Ae={onToggle:Ve,onDraftInput:Fe,onSubmit:ve},be=document.createElement("div");be.className="md-viewer-root",document.body.appendChild(be);let Y=Il(be,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),H=document.createElement("div");H.className="session-log-root",document.body.appendChild(H);let xe=fs(H,{transport:s?(v,f)=>Promise.resolve(s(v,f)):void 0,sessionLogStore:c}),ae=!1,ie=!1,W=!1,U=null,ge=null,Pe=0;function O(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function j(){ae=!1,ie=!1,W=!1,U=null,ge=null,Pe+=1}async function R(v){if(!s)return;let f=++Pe;ie=!0,W=!1,we();try{let u=await Promise.resolve(s("get-bead-prompt",{bead_id:v}));if(f!==Pe)return;!u||typeof u!="object"||Array.isArray(u)?W=!0:(U=u,ge=O(v))}catch{f===Pe&&(W=!0)}finally{f===Pe&&(ie=!1,we())}}function ee(){if(ae=!ae,ae&&d&&ge!==O(d)){U=null,R(d);return}we()}function J(){if(!a||!d)return[];let v=a.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(u=>u&&u.bead_id===d).sort((u,C)=>(C.started_at||0)-(u.started_at||0)).map(u=>({attempt_id:u.attempt_id,bead_id:u.bead_id,status:u.status,started_at:typeof u.started_at=="number"?u.started_at:null,runner:u.runner||null,model:u.model||null,effort:u.effort||null,speed:u.speed||null,session_id:u.session_id||null,resumed_from:u.resumed_from||null,continuation_mode:u.continuation_mode||null,dismissed_at:typeof u.dismissed_at=="number"?u.dismissed_at:null,cause:typeof u.cause=="string"?u.cause:null,cause_detail:u.cause_detail||null,exec_default_preset_id:typeof u.exec_default_preset_id=="string"?u.exec_default_preset_id:null,exec_default_preset_revision:typeof u.exec_default_preset_revision=="number"?u.exec_default_preset_revision:null,exec_values:u.exec_values&&typeof u.exec_values=="object"?u.exec_values:null,usage:u.usage||null,usage_legs:Array.isArray(u.usage_legs)?u.usage_legs:[]}))}function fe(){if(!a||!d)return null;let v=a.get();return Dt(v&&v.attempts||{},d)}let ue=new Set;function Ee(v){ue.has(v)?ue.delete(v):ue.add(v),we()}function T(v){let f=a?a.get():null,u=f&&f.attempts?f.attempts[v]:null;xe.open({attempt_id:v,meta:u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}})}async function F(v){if(!s||!v)return;let f=()=>{let he=a?a.get():null;return he&&typeof he.revision=="number"?he.revision:0},u=async(he={})=>await s("worker-attempt-resume",{attempt_id:v,expected_revision:f(),...he}),C=he=>{he?.queue&&a?.set&&a.set(he.queue)},K=await u();if(C(K),K&&K.conflict){let he=K.queue&&typeof K.queue.revision=="number"?K.queue.revision:f();K=await s("worker-attempt-resume",{attempt_id:v,expected_revision:he}),C(K)}K=await nr(K,(he,Oe)=>u({continuation:he,decision_token:Oe}),{onResult:C,refresh:()=>u()}),K&&K.resumed===!1&&!K.conflict&&K.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${K.reason}`,"error",2400)}let Q={onOpen:T,onResume:F,onToggleUsage:Ee};function re(){let v=a?a.get():null,f={...M};for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){let C=v&&v[u];typeof C=="string"&&(f[u]=C)}return f}async function w(){if(s){try{let v=await Promise.resolve(s("get-session-defaults",{}));M=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{M={}}we()}}function D(){let v=a?a.get():null;return v&&v.runner_catalog||null}function Z(){let v=_?.metadata&&typeof _.metadata=="object"?_.metadata:{},u=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof v.orchestration_model=="string"?v.orchestration_model:"")||(typeof re().orchestration_model=="string"?re().orchestration_model:"")||"opus";return Lo(D(),u)}function De(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Le(v){return v?.compatible===!1}function qe(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Te(){let v=De(),f=v?.presets.find(u=>u.id===h);if(!(!s||!d||!v||!f||Le(f)||E)){E=!0,we();try{let u=await Promise.resolve(s("apply-impl-preset",xl(d,f.id,v.revision)));if(u&&u.conflict){qe(u),le("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let C=u&&Array.isArray(u.issue)?u.issue[0]:u?.issue;if(u&&u.applied&&C&&typeof C=="object"){_=C;for(let K of El)delete m[K];le("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}u&&u.error==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(u){u&&typeof u=="object"&&u.code==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,we()}}}let Qe=null;r&&r.subscribe&&(Qe=r.subscribe(()=>$t()));let kt=null;a&&typeof a.subscribe=="function"&&(kt=a.subscribe(()=>{d&&we()}));let yt=null;l&&typeof l.subscribe=="function"&&(yt=l.subscribe(()=>{d&&we()}));function ct(v){v.key==="Escape"&&d&&(v.preventDefault(),n())}document.addEventListener("keydown",ct);function $t(){if(d){if(r&&typeof r.snapshotFor=="function"){let v=r.snapshotFor("detail:"+d)||[];_=v.find(u=>u&&u.id===d)||v[0]||_}Ye(),we()}}function at(v){Ir(v).then(f=>{f?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ot(v){v.preventDefault(),v.stopPropagation(),d&&at(d)}function mt(v,f){v.preventDefault(),v.stopPropagation(),at(f)}function z(v,f,u){v.preventDefault(),v.stopPropagation(),Y.open(f,{missing_state:u})}function X(v,f){m[v]=f,we(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",$l(d,v,f.length===0?null:f))).catch(()=>{le("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ne(v,f){let u=_||{},C=u.metadata&&typeof u.metadata=="object"?u.metadata:{},K={};for(let $e of["impl_runtime","impl_model","impl_effort"])K[$e]=Object.hasOwn(m,$e)?m[$e]:typeof C[$e]=="string"?C[$e]:"";K[v]=f;let he=Rl(K,D(),Z()),Oe={};for(let $e of["impl_runtime","impl_model","impl_effort"])Oe[$e]=m[$e],m[$e]=he[$e]||"";we(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...he,orchestration_runtime:Z()})).then($e=>{let _t=Array.isArray($e)?$e[0]:$e;if(!_t||typeof _t!="object"||!_t.id)throw new Error("implementation target readback failed");_=_t;for(let Ce of["impl_runtime","impl_model","impl_effort"])delete m[Ce];we()}).catch(()=>{for(let $e of["impl_runtime","impl_model","impl_effort"])Oe[$e]===void 0?delete m[$e]:m[$e]=Oe[$e];we(),le("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function _e(v,f,u){if(!s||!d)return!1;try{let C=await Promise.resolve(s(v,f)),K=Array.isArray(C)?C[0]:C;return K&&typeof K=="object"&&K.id?(_=K,!0):(le(u,"error"),!1)}catch{return le(u,"error"),!1}}function Se(v){setTimeout(()=>{try{let f=e.querySelector(v);f&&typeof f.focus=="function"&&f.focus()}catch{}},0)}function Me(){N=!0,$=_&&_.title||"",we(),Se('.detail-edit__input[data-edit="title"]')}function tt(v){$=v.target.value}function Je(){N=!1,$="",we()}function Ne(){_e("edit-text",{id:d,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(N=!1,$=""),we()})}function rt(){A=!0,P=_&&_.description||"",we(),Se('.detail-edit__textarea[data-edit="description"]')}function Re(v){P=v.target.value}function ft(){A=!1,P="",we()}function xt(){_e("edit-text",{id:d,field:"description",value:P},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(A=!1,P=""),we()})}function qt(v,f,u,C){if(v.key==="Escape"){v.stopPropagation(),u();return}v.key==="Enter"&&(!C||v.ctrlKey||v.metaKey)&&(v.preventDefault(),f())}function Xt(v){let f=v.target.value;_e("update-status",{id:d,status:f},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>we())}function ur(v){let f=Number(v.target.value);_e("update-priority",{id:d,priority:f},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>we())}function gt(v){I=v.target.value}function vt(){let v=I.trim();v.length!==0&&_e("label-add",{id:d,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(f=>{f&&(I=""),we()})}function pr(v){if(v.key==="Escape"){v.stopPropagation(),I="",we();return}v.key==="Enter"&&(v.preventDefault(),vt())}function tr(v){_e("label-remove",{id:d,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>we())}let Bt={onCopyPath:mt,onOpenDoc:z};function Ut(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function p(v){switch(v&&typeof v=="object"?String(v.dependency_type||v.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function y(v){let u=(Array.isArray(v.dependencies)?v.dependencies:[]).map(C=>({id:Ut(C),icon:p(C)})).filter(C=>C.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${u.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${u.map(C=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(C.id)}
                  >
                    ${C.icon?`${C.icon} `:""}${C.id}
                  </button>`:i`<span class="detail-dep"
                    >${C.icon?`${C.icon} `:""}${C.id}</span
                  >`)}
          </div>`}
    `}function x(v){let f=v.metadata||{},u=v.workflow||{},C=u.stages||{},K=C.spec&&C.spec.stale,he=C.impl&&C.impl.stale,Oe=C.plan||null,$e=u.route_source==="derived",_t=u.route||f.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${$e?" detail-kv__v--derived":""}"
          title=${$e?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${$e?"unset":_t}</span
        >
      </div>
      ${u.route!=="quick_fix"||Object.hasOwn(f,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${f.spec_review||"\uC5C6\uC74C"}${K?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${u.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Oe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Oe?.approval_receipt||"\uC5C6\uC74C"}${Oe?.approval_state==="stale"?" \xB7 stale":Oe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${u.route!=="quick_fix"||Object.hasOwn(f,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${f.impl_review||"\uC5C6\uC74C"}${he?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${u.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${u.planned_execution.kind}</span>
            </div>
            ${u.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${u.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${u.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${u.exec_receipt.kind}:${u.exec_receipt.actor}@${u.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${u.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${u.impl_entry.actor}@${u.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${f.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${f.pr_url}</span>
          </div>`:""}
    `}let oe={route:["quick_fix","spec_backed","full_plan"]};async function me(v,f){let u=f.target.value;if(v==="route"&&_&&_.metadata&&_.metadata.route==="full_plan"&&u!=="full_plan"&&!window.confirm(`full_plan \u2192 ${u||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){we();return}await _e("update-workflow-meta",{id:d,key:v,value:u},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),we()}function Ge(v){let f=v.metadata||{};return i` ${((C,K)=>{let he=oe[C],Oe=typeof f[C]=="string"?f[C]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${C}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${C}
          data-edit=${`wfmeta-${C}`}
          @change=${$e=>me(C,$e)}
        >
          <option value="" ?selected=${!he.includes(Oe)}>
            ${K}
          </option>
          ${he.map($e=>i`<option value=${$e} ?selected=${Oe===$e}>${$e}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function G(v,f){return N?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${tt}
            @keydown=${u=>qt(u,Ne,Je,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ne}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Je}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${wt(f).map(u=>i`<span class="detail-usage-total" title=${u.tooltip}
              >${u.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Me}
        >
          ✎
        </button>
      </div>
    `}function b(v){let f=ht(v.created_at),u=ht(v.updated_at);return!f&&!u?i``:i`
      ${f?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${f}</span>
          </div>`:""}
      ${u?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${u}</span>
          </div>`:""}
    `}function q(v,f){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Xt}
        >
          ${bf.map(u=>i`<option value=${u} ?selected=${u===v}>${u}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ur}
        >
          ${yf.map(u=>i`<option value=${String(u)} ?selected=${u===f}>
                P${u}
              </option>`)}
        </select>
      </div>
    `}function pe(v){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${A?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${rt}
            >
              ✎
            </button>`}
      </div>
      ${A?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${P}
              @input=${Re}
              @keydown=${f=>qt(f,xt,ft,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${xt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ft}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Be(v){let f=typeof v.notes=="string"?v.notes:"";return f.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${f}</div>
    `}function Ke(v){let f=Array.isArray(v.labels)?v.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${f.map(u=>i`<span class="detail-label-chip"
              >${u}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${u}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+u}
                @click=${()=>tr(u)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${I}
            @input=${gt}
            @keydown=${pr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${vt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ze(){if(!d)return i``;let v=_||{},f=String(v.id||d),u=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",C=fe(),K=v.status||"open",he=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",Oe=v.description||"",$e={...v,metadata:{...v.metadata||{},...m}};return i`
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
            @click=${ot}
          >
            ${f}
          </button>
          ${G(u,C)}
          ${Al($e)}
          ${Sl({metadata:$e.metadata,workspace_values:re(),catalog:D(),expanded:k,presets:De()?.presets||[],preset_id:h,preset_busy:E},{onToggle:()=>{k=!k,we()},onEdit:(_t,Ce)=>{if(_t==="impl_runtime"||_t==="impl_model"||_t==="impl_effort"){ne(_t,Ce??"");return}X(_t,Ce??"")},onPresetSelect:_t=>{h=_t,we()},onPresetApply:()=>{Te()}})}
          ${q(K,he)} ${b(v)}
          ${pe(Oe)}
          ${pl(B,Ae,{expanded:Ue,draft:te,sending:de,error:ye})}
          ${Be(v)} ${Ke(v)} ${y(v)}
          ${x(v)} ${Ge(v)}
          ${cl(v,Bt)}
          ${Nl({expanded:ae,loading:ie,error:W,data:U},{onToggle:ee})}
          ${Ml(J(),Q,{total:C,expanded:ue})}
        </div>
      </div>
    `}function we(){ze(Ze(),e)}return{load(v){v!==d&&(m={},h="",k=!1,S(),Ie(),j()),d=v,_=null,$t(),w()},clear(){d=null,_=null,m={},h="",E=!1,S(),Ie(),j(),Y.close(),xe.close(),ze(i``,e)},destroy(){Qe&&(Qe(),Qe=null),kt&&(kt(),kt=null),yt&&(yt(),yt=null),document.removeEventListener("keydown",ct),Y.destroy(),be.parentNode&&be.parentNode.removeChild(be),xe.destroy(),H.parentNode&&H.parentNode.removeChild(H),d=null,_=null,h="",E=!1,Ie(),j(),ze(i``,e)}}}function ql(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(d,_,m="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function Ss(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Oo(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function As(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function vf(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:Ss(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Bl(e,t){let r=vf(e,t);return r?i`<button
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
            title=${r.deploy.at?ht(r.deploy.at):""}
            >${As(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Oo(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Kr(e){let t=Lt(e.created_at),r=Lt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function wf(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function wn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Es(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function er(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,h)=>(m.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?wf(s.phase):null,d=s?.kind==="stale_work_backup_fresh",_=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:d?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:_==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:_}}function dr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var kf={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ul(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.state==="unique"?"unique":"unknown",o=n.summary&&typeof n.summary=="object"?n.summary:{};function a(c){return Number.isInteger(o[c])?Number(o[c]):0}let l=typeof n.cause=="string"?n.cause:"observe_failed";return{state:s,title:s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:kf[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function Po(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=wt(e.usage),s=zt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?Lt(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",E=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=i`<span class="worker-mini__title">${e.title}</span>`,M=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",N=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",A=r.map(He=>He===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${He}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${He===e.completion_badge&&e.completion_title||""}
          >${He}</span
        >`),$=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",P=n.length>0?n.map(He=>i`<span class="worker-usage" title=${He.tooltip}
              >${He.label}</span
            >`):s?i`<span class="worker-usage" title=${Hr(e.usage)}
            >${s}</span
          >`:"",I=o?i`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",S=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",B=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",V=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",se=e.discard,ye=se?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${se?.attempt_id||""}
          data-operation-id=${se?.operation?.operation_id||""}
          data-discard-mode=${se?.confirmation||"unmerged"}
          ?disabled=${se?!se.enabled:e.discard_enabled===!1}
          title=${se?se.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${se?.label||"\uD3D0\uAE30"}
        </button>`:"",te=e.stale_work||null,de=te?i`${te.can_resume||te.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            기존 작업 이어가기
          </button>`:""}${te.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            백업 후 새로 시작
          </button>`:""}${te.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${te.action_id}
            ?disabled=${te.locked}
          >
            다시 확인
          </button>`:""}`:"",ke=te?i`<div class="worker-mini__stale">
        <strong>${te.title}</strong>
        <span>${te.summary}</span>
        <span>${te.cause}</span>
        ${te.can_backup_fresh?i`<small
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
        </button>`:"",Ie=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||se?.operation||e.revise_action||te);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${h}${E}${k}</div>
          <div class="worker-mini__row2">
            ${P}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ht(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${A}${I}
            <span class="worker-mini__actions"
              >${S}${B}${V}${ye}</span
            >
            ${Kr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${_}${h}${E}${M}${N}${A}${m}${$}
            </div>
            <div class="worker-mini__body">${k}${ke}</div>
            ${Ie?i`<div class="worker-mini__foot">
                  ${P}${I}
                  <span class="worker-mini__actions"
                    >${S}${B}${V}${ye}${Ue}${de}</span
                  >
                  ${dr(e)}
                </div>`:""}
            ${Kr(e)}`:i`<div class="worker-mini__line">
              ${d}${_}${h}${E}${k}${M}${N}${A}${m}${$}${P}${I}${S}${B}${V}${ye}
            </div>
            ${dr(e)} ${Kr(e)}`}
  </div>`}function $f(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?i`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?i`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?i`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?Kn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?i`<span
            class="worker-card__reason${l?" worker-card__reason--danger":""}"
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"quick_fix route\uB294 \uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Kr(e)}
  </div>`}function Yt(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?$f(n):Po(n))}
          </div>`}
  </section>`}var jl=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],kn=jl.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function Do(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=jl.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Wl(e){let t=kn.findIndex(r=>r.step===e);return kn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Dr(e){let t=kn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function xf(e){let t=kn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:kn.length}}function Ts(e){let t=xf(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var zl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Hl={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Gl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Mo(e){for(let t of Gl(e))if(Object.hasOwn(zl,t))return zl[t];return null}function No(e){let t=null;for(let r of Gl(e))Object.hasOwn(Hl,r)&&(t=Hl[r]);return t}function Cs(e){let t=Mo(e),r=No(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Vl(e,t){let r=Mo(e)??Mo(t),n=No(t)??No(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Yl=160;function Sf(e){return e.length>Yl?`${e.slice(0,Yl)}\u2026`:e}function Af(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Sf(e.command)}</code>`:""}
  </div>`}function Ef(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Fo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Kl(e){let t=e.failure?Cs(e.failure.reason):"";return i`<div class="worker-banners">
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
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Af(e.failure.cause_detail)}
          ${Ef(e.failure.reason)}
          ${dr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Tf(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Fo(t-e.started_at):"\u2014",a=Jt(e),l=gr(e),c=wt(e.usage),d=zt(e.usage),_=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${h?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
            ${E}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
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
            ${E}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||c.length>0||d||_||m?i`<div class="rtile__meta">
          ${_?i`<span class="worker-mini__badge">${_}</span>`:""}
          ${m?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map(k=>i`<span class="worker-usage" title=${k.tooltip}
                    >${k.label}</span
                  >`):d?i`<span
                  class="worker-usage"
                  title=${Hr(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${Kr(e)} ${dr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function qo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Tf(s,t,r))}
  </div>`}function Mr(e){return i`<svg
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
  </svg>`}function Bo(){return Mr(fr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Uo(){return Mr(fr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Zl(){return Mr(fr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Xl(){return Mr(fr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Ql(){return Mr(fr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Jl(){return Mr(fr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function ec(){return Mr(fr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var $n=1,Cf=6e4,Rf={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},If=new Set(["auto_merge","merged","merge","done"]),tc={running:3,paused:2,failed:1};function Lf(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Of(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),h=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let m=tc[d.run_state],h=tc[l];if(m>h||m===h&&(d.started_at??0)>(c??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Dt(e,a.bead_id),can_pause:l==="running"&&_,can_resume:l!=="running"&&_&&!n.has(a.attempt_id)})}return o}function rc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Ft(e){return e&&typeof e=="object"?e:{}}function jo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let A of s)A&&typeof A.root_dir=="string"&&a.set(A.root_dir,A);let l=[],c=[],d=[],_=[],m=[],h=new Map;for(let A of n){if(!A||typeof A.root_dir!="string")continue;let $=A.root_dir,P=A.name||$,I=a.get($),S=I&&typeof I.revision=="number"?I.revision:typeof A.revision=="number"?A.revision:0,B=Ft(A.attempts),V=Ft(A.bead_titles),se=Ft(A.pr_observations),ye=Ft(A.admission),te=Ft(A.revise_parked),de=Ft(A.merge_queue_state),ke=Ft(A.cleanup_failed),Ue=Ft(A.discard_operations),Ie=Array.isArray(A.merge_queue)?A.merge_queue:[],He=new Set(Ie.filter(Y=>Y&&typeof Y.bead_id=="string").map(Y=>Y.bead_id)),Ye=new Map(Ie.filter(Y=>Y&&typeof Y.bead_id=="string").map(Y=>[Y.bead_id,Y])),Ve=Array.isArray(A.queue)?A.queue:[],Fe=Array.isArray(A.done)?A.done:[],ve=new Map;for(let Y of Fe)Y&&typeof Y.bead_id=="string"&&typeof Y.added_at=="number"&&ve.set(Y.bead_id,Y.added_at);let Ae=Y=>({id:Y,title:V[Y]||Y,root_dir:$,workspace_name:P,expected_revision:S,draggable:!1}),be=new Set;for(let[Y,H]of Of(B,ve))be.add(Y),c.push({...Ae(Y),lane:"running",attempt_id:H.attempt_id,run_state:H.run_state,can_pause:H.can_pause,can_resume:H.can_resume,started_at:H.started_at,last_event_at:H.last_event_at,runner:H.runner,model:H.model,effort:H.effort,speed:H.speed,resumed_from:H.resumed_from,continuation_mode:H.continuation_mode,usage:H.usage,discard:er(Ue,Y,{attempt_id:H.attempt_id}),badges:H.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:H.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:H.run_state==="failed"});for(let Y of Array.isArray(A.pr_wait)?A.pr_wait:[]){let H=Y&&Y.bead_id;if(typeof H!="string"||be.has(H))continue;be.add(H);let xe=Ft(se[H]),ae=Ft(xe.pr),ie=xe.gate?Ft(xe.gate):null,W=He.has(H),U=Ye.get(H)?.continuation_action||null,ge=!!U&&U.continuation===null,Pe=de.active===H,O=Y.external===!0,j=ke[H]||null,R=!!ie&&ie.base_badge==="\uCDA9\uB3CC",ee=!!j&&["child_sweep","branch_cleanup","parent_close"].includes(j.step)&&!!ie&&ie.tier==="merged",J=O&&!!j&&!!ie&&ie.tier==="merged",fe=!!ie&&["closed_unmerged","review","undecidable"].includes(ie.tier),ue=er(Ue,H,{external:O,merge_active:Pe,merge_queued:W,merged:!!j||ie?.tier==="merged"}),Ee=!!ue.operation;d.push({...Ae(H),lane:"pr_wait",pr_number:typeof ae.number=="number"?ae.number:null,pr_url:typeof ae.url=="string"?ae.url:void 0,external:O,usage:Dt(B,H),badges:ge?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:j?[Dr(j.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Dr(j.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ie?.gate_badge=="string"&&ie.gate_badge.length>0?[ie.gate_badge]:[],alert:!!j||fe,reason:j?Ts(j.step):"PR \uB300\uAE30",merge_action:!W||ge,merge_enabled:!Ee&&(ge||ie?.enabled===!0||R||ee||J),merge_label:ge?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":J||ee?"\uC815\uB9AC \uC7AC\uAC1C":R&&!ee?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ge?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ee?ue.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ue.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ue.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:J?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ee?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":R?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ie?.enabled===!0?`\uBA38\uC9C0 (${ie.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ie?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:W&&!ge,cancel_enabled:!Pe,continuation_mismatch:U?.mismatch||null,discard:ue,discard_action:ue.action,discard_enabled:ue.enabled,discard_title:ue.title})}for(let Y=0;Y<Ve.length;Y++){let H=Ve[Y],xe=H&&H.bead_id;if(typeof xe!="string"||be.has(xe))continue;be.add(xe);let ae=te[xe],ie=er(Ue,xe),W=ie.operation?ie:null,U={...Ae(xe),lane:"queue",draggable:!W,discard:W||void 0,reason:rc(ye,xe),queue_position:Y+1,queue_index:Y,queue_length:Ve.length,badges:ae?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ae,revise_action:!!ae,revise_enabled:!!ae&&!W,revise_title:ae?ae.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ae.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(U);let ge=h.get($);ge?ge.push(U):h.set($,[U])}for(let Y of Array.isArray(A.runnable)?A.runnable:[]){let H=Y&&Y.bead_id;typeof H!="string"||be.has(H)||(be.add(H),l.push({...Ae(H),title:Y.title||V[H]||H,lane:"runnable",draggable:!0,reason:rc(ye,H),created_at:Y.created_at??void 0,updated_at:Y.updated_at??void 0,labels:Array.isArray(Y.labels)?Y.labels:[],spec_reviewer:typeof Y.spec_reviewer=="string"?Y.spec_reviewer:void 0,plan_state:Y.plan_state==="approved"||Y.plan_state==="authored"?Y.plan_state:"none",workflow:Y.route?{route:Y.route,chips:{route:Y.route}}:null,place_index:Ve.length}))}for(let Y of Fe){let H=Y&&Y.bead_id;if(typeof H!="string"||be.has(H)||(be.add(H),o!==void 0&&typeof Y.added_at=="number"&&Y.added_at<o))continue;let xe=Lf(B,H);m.push({...Ae(H),lane:"done",done:!0,usage:Dt(B,H),done_at:typeof Y.added_at=="number"?Y.added_at:void 0,done_kind:xe&&typeof xe.done_kind=="string"?xe.done_kind:null})}}let E=new Map;s.forEach((A,$)=>{A&&typeof A.root_dir=="string"&&E.set(A.root_dir,$)});let k=r&&r.running_sort==="repo"?"repo":"started";c.sort((A,$)=>{if(k==="repo"){let S=E.get(A.root_dir)??Number.MAX_SAFE_INTEGER,B=E.get($.root_dir)??Number.MAX_SAFE_INTEGER;if(S!==B)return S-B}let P=typeof A.started_at=="number"&&Number.isFinite(A.started_at)?A.started_at:null,I=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null;return P!==null&&I!==null&&P!==I?P-I:P===null&&I!==null?1:P!==null&&I===null?-1:A.id.localeCompare($.id)}),m.sort((A,$)=>($.done_at??0)-(A.done_at??0));let M=s.length>0?s:n.map(A=>({root_dir:A&&A.root_dir,name:A&&A.name,auto_advance:A&&A.auto_advance,auto_merge:A&&A.auto_merge,slots:A&&A.slots,revision:A&&A.revision,runner_catalog:A&&A.runner_catalog})),N=[];for(let A of M)!A||typeof A.root_dir!="string"||N.push({root_dir:A.root_dir,name:A.name||A.root_dir,auto_advance:A.auto_advance===!0,auto_merge:A.auto_merge===!0,slots:typeof A.slots=="number"&&A.slots>=$n?A.slots:$n,revision:typeof A.revision=="number"?A.revision:0,runner_catalog:Ft(A.runner_catalog),items:h.get(A.root_dir)||[]});return{runnable:l,queue:_,queue_groups:N,running:c,pr_wait:d,done:m,automation:{total:N.length,both_on:N.filter(A=>A.auto_advance&&A.auto_merge).length}}}function Pf(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Cf;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ht(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Lt(e,t)}</span
        >`}</span
  >`}function xn(e){return i`<div class="mon-c__title">${e.title}</div>`}function Sn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Rs(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Wo(e){let t=wt(e.usage),r=zt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Hr(e.usage)}
        >${r}</span
      >`:""}function zo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Df(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Uo()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Bo()}
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
          ${Xl()}
        </button>`:""}
  </span>`}function Mf(e,t){let r=typeof e.started_at=="number"?Fo(t-e.started_at):"";return i`${xn(e)}
    <div class="mon-c__meta">
      ${zo(e)}${Pf(e.last_event_at,t)}${Sn(e)}${Rs(e)}
      ${Jt(e)?i`<span class="mon-c__model">${Jt(e)}</span>`:""}
      ${gr(e)?i`<span
            class="rtile__resumed"
            title=${gr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Wo(e)}${Df(e)}${dr(e)}
    </div>`}function Nf(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Lt(e.updated_at);return i`${xn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Sn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Yn(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${Rs(e)}
      ${l?i`<span title=${`\uC218\uC815 ${ht(e.updated_at)}`}
            >수정 ${l}</span
          >`:""}
      ${e.reason?i`<span
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
    </div>`}function Ff(e){let t=!!e.discard?.operation;return i`${xn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Sn(e)}
      ${zo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
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
    ${dr(e)}
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
        </div>`:""}`}function qf(e){let t=!!(zt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${xn(e)}
    <div class="mon-c__meta">
      ${Sn(e)}${Rs(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${zo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?i`<div class="mon-c__tail">
          ${Wo(e)}
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
          ${dr(e)}
        </div>`:""}`}function Bf(e,t){let r=e.done_kind||"",n=r?Rf[r]||r:"",s=Lt(e.done_at,t);return i`${xn(e)}
    <div class="mon-c__meta">
      ${Sn(e)}${Rs(e)}
      ${n?i`<span
            class="mon-live__kind${If.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Wo(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${ht(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function nc(e,t){return e.lane==="running"?Mf(e,t):e.lane==="runnable"?Nf(e):e.lane==="queue"?Ff(e):e.lane==="pr_wait"?qf(e):Bf(e,t)}function sc(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?Uo():Bo()}
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
        ${Ql()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Jl()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${$n}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function oc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Qt.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Zl():ec()}
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
        ${Qt.map(l=>i`<option
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
  </div>`}function ac(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ic(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return wt(Jn(t));let r={};for(let l of sr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let d=!1;for(let _ of sr){let m=c[_];typeof m=="number"&&Number.isFinite(m)&&(r[_]+=m,n=!0,d=!0)}if(d){o+=1;let _=c.total_cost_usd;typeof _=="number"&&Number.isFinite(_)&&(s+=_,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?zt(r):null}var cc="bdui.monitor.done-range",dc="bdui.monitor.running_sort";function Uf(){try{let e=window.localStorage.getItem(cc);return Pt(e)?e:It}catch{return It}}function jf(e){try{window.localStorage.setItem(cc,e)}catch{}}function Wf(){try{return window.localStorage.getItem(dc)==="repo"?"repo":"started"}catch{return"started"}}function zf(e){try{window.localStorage.setItem(dc,e)}catch{}}var uc="tab:monitor:pipeline",Hf=1e3,Gf=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function lc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${nc(e,t)}
  </div>`}function pc(e,t){let r=it("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.now||(()=>Date.now()),d=t.confirm||(O=>typeof globalThis.confirm!="function"||globalThis.confirm(O)),_=Uf(),m=Wf();function h(){let O=Qt.find(j=>j.value===_);return O?O.label:""}let E=document.createElement("div");E.className="mon",e.appendChild(E);let k=jo(null,null),M=new Map,N=null,A=null;async function $(O,j,R,ee,J=!0){if(!o||!R)return null;let fe=await o(O,{...j,root_dir:R,expected_revision:ee});if(fe&&fe.conflict&&J){fe.queue&&M.set(R,fe.queue);let ue=fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:ee;fe=await o(O,{...j,root_dir:R,expected_revision:ue})}return fe&&fe.queue&&R&&M.set(R,fe.queue),fe}function P(O,j){let R=M.get(O),ee=s&&s.get?s.get():null,J=(Array.isArray(ee)?ee:[]).find(ue=>ue?.root_dir===O);return(R||J)?.merge_queue?.find(ue=>ue.bead_id===j)?.continuation_action}async function I(O,j,R,ee){let J=await $(O,j,R,ee),fe=M.get(R)?.revision??J?.queue?.revision??ee;return nr(J,(ue,Ee)=>$(O,{...j,continuation:ue,decision_token:Ee},R,fe,!1),{refresh:ue=>$(O,j,R,ue?.queue?.revision??M.get(R)?.revision??fe,!1)})}async function S(O,j,R,ee){let J=await nr({continuation_mismatch:ee},(ue,Ee)=>$("worker-merge-queue-add",{bead_id:j,continuation:ue,decision_token:Ee},O,R,!1)),fe=J?.queue?.merge_queue?.find(ue=>ue.bead_id===j)?.continuation_action;J?.applied!==!0&&fe?.continuation===null&&fe.mismatch&&await S(O,j,J.queue.revision,fe.mismatch)}async function B(O,j,R){let ee=await $("worker-discard",O,j,R);if(ee&&ee.discarded===!0){le(Es(ee),"success",5e3);return}if(ee&&ee.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${ee.reason}`,"error");return}if(ee&&ee.accepted&&ee.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(ee&&ee.accepted){le(`\uD3D0\uAE30 \uC9C4\uD589: ${ee.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}ee&&!ee.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function V(O,j,R){return!o||!R?null:await o(O,{...j,root_dir:R})}async function se(O){if(!o||!O&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let j=await o("monitor-auto-toggle",{on:O}),R=j&&Array.isArray(j.failed)?j.failed:[];R.length>0&&le(`\uC790\uB3D9\uD654 ${O?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${R.map(ee=>ee.root_dir).join(", ")}`,"error",3200)}async function ye(){let O=new Map;for(let j of k.pr_wait)O.has(j.root_dir)||O.set(j.root_dir,j.expected_revision);for(let[j,R]of O)await $("worker-merge-queue-add-all",{},j,R)}let te=null,de=!1,ke=null;function Ue(){ke!==null&&clearTimeout(ke),ke=setTimeout(()=>{ke=null,de=!1},0)}function Ie(O){let j=O.target;return typeof j?.closest=="function"?j.closest(".mon-group"):null}function He(O){let j=Ie(O);return!j||!te?null:(j.getAttribute("data-root-dir")||"")===te.root_dir?j:null}function Ye(){for(let O of Array.from(E.querySelectorAll(".mon-group--drag-over")))O.classList.remove("mon-group--drag-over")}function Ve(O){let j=O.target,R=typeof j?.closest=="function"?j.closest('.mon-card[draggable="true"]'):null;if(R){te={bead_id:R.getAttribute("data-issue-id")||"",lane:R.getAttribute("data-lane")||"",root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0,queue_index:Number(R.getAttribute("data-queue-index")),queue_length:Number(R.getAttribute("data-queue-length")),place_index:Number(R.getAttribute("data-place-index"))},de=!0;try{O.dataTransfer?.setData("text/plain",te.bead_id),O.dataTransfer&&(O.dataTransfer.effectAllowed="move")}catch{}}}function Fe(O){let j=He(O);j&&(O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move"),j.classList.add("mon-group--drag-over"))}function ve(O){Ie(O)?.classList.remove("mon-group--drag-over")}function Ae(){te=null,Ye(),Ue()}function be(O){let j=He(O),R=te;if(te=null,Ye(),!j||!R||!R.bead_id)return;O.preventDefault();let ee=O.target,J=typeof ee?.closest=="function"?ee.closest('.mon-card[data-lane="queue"]'):null,fe=J&&j.contains(J)?Number(J.getAttribute("data-queue-index")):NaN;if(R.lane==="runnable"){let T=Number.isFinite(fe)?fe:R.place_index;if(!Number.isFinite(T))return;$("worker-queue-place",{bead_id:R.bead_id,index:T},R.root_dir,R.revision);return}if(R.lane!=="queue"||J&&J.getAttribute("data-issue-id")===R.bead_id)return;let ue=R.queue_index,Ee=Number.isFinite(fe)?ue>fe?fe:fe-1:R.queue_length-1;!Number.isFinite(Ee)||Ee<0||Ee===ue||$("worker-queue-reorder",{bead_id:R.bead_id,to_index:Ee},R.root_dir,R.revision)}function Y(O){let j={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return i`${oc({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},running_sort:m,done_range:_,token_total:ic(k.done),token_tooltip:ac(h())})}
      <div class="worker-lanes mon-lanes">
        ${Gf.map(R=>{let ee=j[R.lane],J=R.lane==="queue"?k.queue_groups.length>0?i`${k.queue_groups.map(fe=>i`<div
                        class="mon-group"
                        data-root-dir=${fe.root_dir}
                      >
                        ${sc(fe)}
                        <div class="mon-group__list">
                          ${fe.items.map(ue=>lc(ue,O))}
                        </div>
                      </div>`)}`:void 0:ee.length>0?i`${ee.map(fe=>lc(fe,O))}`:void 0;return Yt({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${h()}`:R.title,items:ee,empty:R.empty,body:J,live:R.lane==="running"&&ee.length>0,header_control:R.lane==="pr_wait"&&ee.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function H(){let O=s&&s.get?s.get():null,j=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=c();k=jo(O,j,{done_since:Er(_,R),running_sort:m}),ze(Y(R),E)}function xe(O,j){let R=a?a():void 0;if(!j||!R||j===R||!l){n(O);return}l(j).then(()=>{n(O)}).catch(ee=>{r("workspace switch for %s failed: %o",j,ee)})}function ae(O){return{root_dir:O.getAttribute("data-root-dir")||"",revision:Number(O.getAttribute("data-revision")||0)||0}}function ie(O,j){let{root_dir:R,revision:ee}=ae(O),J=O.getAttribute("data-issue-id")||"",fe=j.dataset.attemptId||O.getAttribute("data-attempt-id")||"",ue=j.classList;if(ue.contains("worker-card__place")){$("worker-queue-place",{bead_id:J,index:Number(O.getAttribute("data-place-index")||0)||0},R,ee);return}if(ue.contains("mon-op--up")||ue.contains("mon-op--down")){let Ee=Number(O.getAttribute("data-queue-index")||0)||0,T=ue.contains("mon-op--up")?Ee-1:Ee+1;if(T<0)return;$("worker-queue-reorder",{bead_id:J,to_index:T},R,ee);return}if(ue.contains("mon-op--remove")){$("worker-queue-remove",{bead_id:J},R,ee);return}if(ue.contains("mon-op--pause")){V("worker-attempt-pause",{attempt_id:fe},R);return}if(ue.contains("mon-op--discard")){if(!d(wn(J,"unmerged")))return;B({bead_id:J,...fe?{attempt_id:fe}:{},...j.dataset.operationId?{operation_id:j.dataset.operationId}:{}},R,ee);return}if(ue.contains("mon-op--resume")){I("worker-attempt-resume",{attempt_id:fe},R,ee);return}if(ue.contains("mon-op--dismiss")){$("worker-attempt-dismiss",{attempt_id:fe},R,ee);return}if(ue.contains("worker-mini__merge")){let Ee=P(R,J);Ee?.mismatch&&Ee.continuation===null?S(R,J,ee,Ee.mismatch):$("worker-merge-queue-add",{bead_id:J},R,ee);return}if(ue.contains("worker-mini__merge-cancel")){$("worker-merge-queue-remove",{bead_id:J},R,ee);return}if(ue.contains("worker-mini__discard")){let Ee=j.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(wn(J,Ee)))return;B({bead_id:J,...fe?{attempt_id:fe}:{},...j.dataset.operationId?{operation_id:j.dataset.operationId}:{}},R,ee);return}if(ue.contains("worker-mini__revise-fix")){I("worker-revise-fix",{bead_id:J},R,ee);return}ue.contains("worker-mini__revise-approve")&&$("worker-revise-approve",{bead_id:J},R,ee)}function W(O){let j=de;de=!1;let R=O.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest("a"))return;let ee=R.closest(".mon-running-sort");if(ee){O.preventDefault(),m=ee.getAttribute("data-sort")==="repo"?"repo":"started",zf(m),H();return}let J=R.closest(".mon-auto-all");if(J){O.preventDefault(),se(J.getAttribute("data-on")==="true");return}if(R.closest(".mon-merge-all")){O.preventDefault(),ye();return}let ue=R.closest(".mon-ctl--advance");if(ue){O.preventDefault();let{root_dir:re,revision:w}=ae(ue);$("worker-automation-toggle",{on:ue.getAttribute("data-on")==="true"},re,w);return}let Ee=R.closest(".mon-ctl--merge-auto");if(Ee){O.preventDefault();let{root_dir:re,revision:w}=ae(Ee);$("worker-merge-auto-toggle",{on:Ee.getAttribute("data-on")==="true"},re,w);return}let T=R.closest(".mon-card");if(!T)return;let F=R.closest("button");if(F){O.preventDefault(),ie(T,F);return}let Q=T.getAttribute("data-issue-id");Q&&!j&&(O.preventDefault(),xe(Q,T.getAttribute("data-root-dir")||""))}function U(O){let j=O.target;if(!j||typeof j.closest!="function")return;let R=j.closest(".mon-done-range");if(R){_=Pt(R.value)?R.value:It,jf(_),H();return}let ee=j.closest(".mon-slots__input");if(!ee)return;let{root_dir:J,revision:fe}=ae(ee),ue=Number(ee.value);if(!Number.isFinite(ue))return;let Ee=Math.max($n,Math.floor(ue));$("worker-queue-set-slots",{slots:Ee},J,fe)}e.addEventListener("click",W),e.addEventListener("change",U),e.addEventListener("dragstart",Ve),e.addEventListener("dragover",Fe),e.addEventListener("dragleave",ve),e.addEventListener("drop",be),e.addEventListener("dragend",Ae),s&&typeof s.subscribe=="function"&&(N=s.subscribe(()=>{try{M.clear(),H()}catch{}}));function ge(){A!==null&&(clearInterval(A),A=null)}function Pe(){ke!==null&&(clearTimeout(ke),ke=null)}return{load(){r("load"),H(),A===null&&(A=setInterval(()=>{try{H()}catch{}},Hf))},pause(){ge()},clear(){ge(),Pe(),N&&(N(),N=null),e.removeEventListener("click",W),e.removeEventListener("change",U),e.removeEventListener("dragstart",Ve),e.removeEventListener("dragover",Fe),e.removeEventListener("dragleave",ve),e.removeEventListener("drop",be),e.removeEventListener("dragend",Ae),e.replaceChildren()}}}function fc(e,t,r){let n=it("views:nav"),s=null;function o(c){return d=>{d.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),d=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
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
    `}function l(){ze(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ze(i``,e)}}}var _c=["bug","feature","task","epic","chore"];function mc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var gc=["Critical","High","Medium","Low","Backlog"];function hc(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let B of _c){let V=document.createElement("option");V.value=B,V.textContent=mc(B),o.appendChild(V)}a.replaceChildren();for(let B=0;B<=4;B+=1){let V=document.createElement("option");V.value=String(B);let se=gc[B]||"Medium";V.textContent=`${B} \u2013 ${se}`,a.appendChild(V)}}E();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function M(S){s.disabled=S,o.disabled=S,a.disabled=S,l.disabled=S,c.disabled=S,_.disabled=S,m.disabled=S,m.textContent=S?"Creating\u2026":"Create"}function N(){d.textContent=""}function A(S){d.textContent=S}function $(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let B=window.localStorage.getItem("beads-ui.new.priority");B&&/^\d$/.test(B)?a.value=B:a.value="2"}catch{o.value="",a.value="2"}}function P(){let S=o.value||"",B=a.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),B.length>0&&window.localStorage.setItem("beads-ui.new.priority",B)}async function I(){N();let S=String(s.value||"").trim();if(S.length===0){A("Title is required"),s.focus();return}let B=Number(a.value||"2");if(!(B>=0&&B<=4)){A("Priority must be 0..4"),a.focus();return}let V=String(o.value||""),se=String(c.value||""),ye={title:S};V.length>0&&(ye.type=V),String(B).length>0&&(ye.priority=B),se.length>0&&(ye.description=se),M(!0);try{await t("create-issue",ye)}catch{M(!1),A("Failed to create issue");return}P(),M(!1),k()}return r.addEventListener("cancel",S=>{S.preventDefault(),k()}),h.addEventListener("click",()=>k()),_.addEventListener("click",()=>k()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),I())}),n.addEventListener("submit",S=>{S.preventDefault(),I()}),{open(){n.reset(),N(),$();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var Vf=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Yf(e,t){return to(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function bc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Yf(n,e);return i`<button
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
  `}function yc(e,t,r){return i`
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
  `}function vc(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Vf.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var Kf=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Kt="";function Zt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function wc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(w=>le(w,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="session",c=!1,d="",_={},m={},h=[],E=!1,k=null,M={},N="",A="",$=!1,P=!1,I=!1,S=null;function B(){let w=t.queueStore?.get();return Zt(w)?w.runner_catalog:null}function V(){let w=t.implPresetStore?.get();return Zt(w)&&Array.isArray(w.presets)?w:null}async function se(){E=!0,J();try{let w=await r("get-session-defaults",{});_=Zt(w?.values)?{...w.values}:{},m={..._},h=Array.isArray(w?.warnings)?w.warnings:[]}catch(w){h=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${w instanceof Error?w.message:String(w)}`)}finally{E=!1,J()}}async function ye(){let w=bl(_,m);if(Object.keys(w).length!==0){try{let D=await r("set-session-defaults",{values:w});_=Zt(D?.values)?{...D.values}:{},m={..._},h=Array.isArray(D?.warnings)?D.warnings:[]}catch(D){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}J()}}function te(w,D){D===Kt?delete m[w]:m[w]=D,J(),ye()}async function de(){let w=t.queueStore?.get();if(!Zt(w))return;let D={orchestration_model:w.orchestration_model??null,orchestration_effort:w.orchestration_effort??null,orchestration_speed:w.orchestration_speed??null},Z=yl(D,{...D,...M});if(Object.keys(Z).length!==0){try{let De=await r("worker-queue-set-orchestration-defaults",{expected_revision:w.revision,values:Z});if(De&&De.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}M={}}catch(De){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${De instanceof Error?De.message:String(De)}`)}J()}}function ke(w,D){M[w]=D===Kt?null:D,J(),de()}async function Ue(w){let D=t.queueStore?.get();if(!(!Zt(D)||w<1)){try{await r("worker-queue-set-slots",{expected_revision:D.revision,slots:w})}catch(Z){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}J()}}function Ie(){let w={};for(let D of ml){let Z=m[D];typeof Z=="string"&&Z.length>0&&(w[D]=Z)}return w}async function He(){let w=V();if(!w)return;let D=Ie();if(Object.keys(D).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let Z=(w.presets||[]).find(Le=>Le.id===N),De=A.trim()||(Z?Z.name:"");if(!De){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Le=Z?await r("impl-preset-update",{expected_revision:w.revision,id:Z.id,name:De,settings:D}):await r("impl-preset-create",{expected_revision:w.revision,name:De,settings:D});if(Le&&Le.applied){if(A="",!Z&&Array.isArray(Le.presets)){let qe=Le.presets.find(Te=>Te.name===De);N=qe?qe.id:N}J()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),J()}catch(Le){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Le instanceof Error?Le.message:String(Le)}`)}}async function Ye(){let w=V();if(!(!w||N.length===0))try{let D=await r("impl-preset-delete",{expected_revision:w.revision,id:N});D&&D.applied?(N="",J()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),J())}catch(D){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}}async function Ve(){let w=V();if(!(!w||N.length===0)){try{let D=await r("apply-impl-preset-global",{preset_id:N,expected_revision:w.revision});D&&D.applied?(_=Zt(D.values)?{...D.values}:{},m={..._},h=Array.isArray(D.warnings)?D.warnings:[]):D&&D.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(D){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}J()}}async function Fe(){P=!0,I=!1,J();try{let w=await r("get-worker-system-prompt",{});!w||typeof w!="object"||Array.isArray(w)?I=!0:S=w}catch{I=!0}finally{P=!1,J()}}function ve(){if($=!$,$&&!S){Fe();return}J()}function Ae(){let w=Vr({loading:P,error:I});if(w)return w;if(!S)return"";let D=Array.isArray(S.variants)?S.variants:[];return i`<div class="settings-dialog__sp-body">
      ${S.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${S.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${D.map(Z=>i`<div class="settings-dialog__sp-variant" data-variant=${Z.key}>
            <div class="settings-dialog__sp-cond">${Z.condition}</div>
            ${lr(Z.label,Z.system_prompt)}
          </div>`)}
    </div>`}function be(){return i`<section
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
        aria-expanded=${$?"true":"false"}
        @click=${ve}
      >
        ${$?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${$?Ae():""}
    </section>`}function Y(w,D,Z,De,Le,qe){let Te=Le[w]??Kt;return i`<select
      class=${Te===Kt?"settings-dialog__unset":""}
      data-key=${w}
      aria-label=${D}
      ?disabled=${qe===!0}
      .value=${Pr(String(Te))}
      @change=${Qe=>De(w,String(Qe.target.value))}
    >
      <option value=${Kt} ?selected=${Te===Kt}>(기본)</option>
      ${Z.map(Qe=>i`<option value=${Qe} ?selected=${Qe===Te}>
            ${Qe===Nt?"\uC790\uB3D9":Qe}
          </option>`)}
    </select>`}function H(w,D,Z,De,Le,qe=!1){return i`<div
      class=${`settings-dialog__row${qe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${D}</span>
      <span class="settings-dialog__controls">
        ${Y(w,D,Z,De,Le,qe)}
      </span>
    </div>`}function xe(w,D,Z,De,Le){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${D}-on)`}
        ></i>
        ${w}
      </span>
      <span class="settings-dialog__controls">
        ${Y(Z,`${w} \uBAA8\uB378`,De,te,m,!1)}
        ${Y(Le,`${w} effort`,vs,te,m,!1)}
      </span>
    </div>`}function ae(){let w=B(),D=hl(m),Z=m.impl_runtime,De=m.impl_model,Le=V();return i`
      <section
        class=${`settings-dialog__pane${l==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${h.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${h.join(", ")}
            </div>`:""}
        ${E?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Kt}
                        aria-pressed=${String(!m.workflow_mode)}
                        @click=${()=>te("workflow_mode",Kt)}
                      >
                        (기본)
                      </button>
                      ${bs.map(qe=>i`<button
                            type="button"
                            data-mode=${qe}
                            aria-pressed=${String(m.workflow_mode===qe)}
                            @click=${()=>te("workflow_mode",qe)}
                          >
                            ${qe}
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
                ${xe("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",yn,"spec_review_effort")}
                ${xe("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ys,"plan_review_effort")}
                ${xe("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",yn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${H("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",gs,te,m)}
                ${H("impl_runtime","\uC704\uC784 \uB300\uC0C1",hs,te,m,D)}
                ${H("impl_model","\uBAA8\uB378",ws(w,Z),te,m,D)}
                ${H("impl_effort","effort",Yr(w,Z,De),te,m,D)}
                ${H("impl_speed","\uC18D\uB3C4",bn,te,m,D)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Pr(N)}
                  @change=${qe=>{N=String(qe.target.value),J()}}
                >
                  <option value="" ?selected=${N===""}>
                    구현 프리셋…
                  </option>
                  ${(Le?.presets||[]).map(qe=>i`<option
                        value=${qe.id}
                        ?selected=${qe.id===N}
                      >
                        ${qe.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${N.length===0}
                  @click=${Ve}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${N?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Pr(A)}
                  @input=${qe=>{A=String(qe.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${He}
                >
                  ${N?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${N.length===0}
                  @click=${Ye}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function ie(){let w=t.queueStore?.get(),D=B(),Z={orchestration_model:M.orchestration_model??(Zt(w)?w.orchestration_model:null),orchestration_effort:M.orchestration_effort??(Zt(w)?w.orchestration_effort:null),orchestration_speed:M.orchestration_speed??(Zt(w)?w.orchestration_speed:null)},De=ks(D,k),Le=Yr(D,k||void 0,Z.orchestration_model||Nt).filter(Te=>Te!==Nt),qe=Zt(w)&&typeof w.slots=="number"?w.slots:2;return i`
      <section
        class=${`settings-dialog__pane${l==="worker"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-worker"
        aria-label="Worker 설정"
      >
        <header class="settings-dialog__pane-head"><h2>Worker 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          Worker가 세션을 띄울 때 쓰는 오케스트레이션 설정과 동시 실행 수입니다.
        </p>
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">오케스트레이션</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">런타임</span>
            <span class="settings-dialog__controls">
              <select
                aria-label="런타임"
                data-key="orchestration_runtime_filter"
                .value=${Pr(k||Kt)}
                @change=${Te=>{let Qe=String(Te.target.value);k=Qe===Kt?null:Qe,J()}}
              >
                <option value=${Kt} ?selected=${!k}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${k==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${k==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${H("orchestration_model","\uBAA8\uB378",De,ke,Z)}
          ${H("orchestration_effort","effort",Le,ke,Z)}
          ${H("orchestration_speed","\uC18D\uB3C4",bn,ke,Z)}
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
                  @click=${()=>Ue(qe-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${qe}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Ue(qe+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${be()}
      </section>
    `}function W(){let w=n.get();return i`
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
        ${w?i`
              ${bc(w,s(),O)}
              ${yc(w,d,{onDraft:D=>{d=D},onAdd:j,onRemove:R})}
              ${vc(w,ee)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function U(w){let D=n.get();if(D)try{let Z=await r("display-policy-set",{expected_revision:D.revision,policy:w(D)});ge(Z),Z&&Z.conflict&&Z.policy&&(Z=await r("display-policy-set",{expected_revision:Z.policy.revision,policy:w(Z.policy)}),ge(Z)),Z&&Z.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function ge(w){w&&w.policy&&typeof w.policy=="object"&&n.set(w.policy)}function Pe(w){U(w)}function O(w){let D=n.get();if(!D)return;let Z=!Zf(w,D);Pe(De=>Xf(w,De,Z))}function j(){let w=d.trim();w.length!==0&&(d="",Pe(D=>D.hidden_prefixes.includes(w)?{hidden_prefixes:D.hidden_prefixes}:{hidden_prefixes:[...D.hidden_prefixes,w]}),J())}function R(w){Pe(D=>({hidden_prefixes:D.hidden_prefixes.filter(Z=>Z!==w)}))}function ee(w){let D=n.get();if(!D)return;let Z=D.chips[w]===!1;Pe(()=>({chips:{[w]:Z}}))}function J(){ze(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Kf.map(w=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${w.id}
                  aria-selected=${String(l===w.id)}
                  aria-controls=${`settings-pane-${w.id}`}
                  @click=${()=>fe(w.id)}
                >
                  <span class="settings-dialog__glyph">${w.glyph}</span>
                  ${w.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${re}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${ae()} ${ie()} ${W()}
          </div>
        </div>
      `,a)}function fe(w){l=w,J()}let ue=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",ue),a.addEventListener("cancel",ue);let Ee=w=>{w.target===a&&re()};a.addEventListener("click",Ee);let T=null;n.subscribe&&(T=n.subscribe(()=>{c&&J()}));let F=null;t.implPresetStore?.subscribe&&(F=t.implPresetStore.subscribe(()=>{c&&J()}));function Q(w="session"){c||(c=!0,t.onOpenChange?.(!0),l=w,d="",M={},J(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),se())}function re(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Q,close:re,sessionDraft:()=>({...m}),destroy(){c=!1,a.removeEventListener("close",ue),a.removeEventListener("cancel",ue),a.removeEventListener("click",Ee),T&&(T(),T=null),F&&(F(),F=null),a.remove()}}}function Zf(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Xf(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Qf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function kc(e){return String(e).padStart(2,"0")}function Jf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function e_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${kc(n.getHours())}:${kc(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Qf[n.getMonth()]} ${n.getDate()} ${o}`;return`${Jf(r,t)} \xB7 ${l}`}function t_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var $c=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function xc(e){let t=!1,r=null,n=new Map;function s(){ze(i``,e),e.hidden=!0}function o(){let c=$c.filter(_=>n.has(_.key));if(c.length===0){s();return}let d=Date.now();ze(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(_=>{let m=n.get(_.key),h=typeof m.ageSeconds=="number"&&m.ageSeconds>600,E=h?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${_.label} usage`}
          >
            <span class="usage-meter__provider">${_.label}</span>
            ${m.windows.map(k=>{let M=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,N=Math.min(100,Math.max(0,M)),$=`resets ${e_(k.resetsAt,d)}${h?` \xB7 ${E}`:""}`;return i`<span
                class="usage-meter__window ${t_(N)}"
                style=${`--progress: ${N}%`}
                title=${$}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${N}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let d=await fetch(c.endpoint);if(!d.ok)return null;let _=await d.json();return!_||_.available!==!0||!Array.isArray(_.windows)?null:_}catch{return null}}async function l(){let c=await Promise.all($c.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of c)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var r_="worker-ineligible";function Ho(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Sc(e){return Ho(e).includes(r_)}var n_="worker-serial";function Go(e){return Ho(e).includes(n_)}function Vo(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var s_=new Set(["done","failed","orphaned","stopped","discarded"]);function Ac(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,l=new Map,c=!1,d=null,_=null;function m(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function h(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function E(){let T=m(),F=new Set;for(let Q of Object.values(T.attempts||{})){let re=Q;re&&typeof re.bead_id=="string"&&!s_.has(re.status)&&F.add(re.bead_id)}for(let Q of Array.isArray(T.pr_wait)?T.pr_wait:[])Q&&typeof Q.bead_id=="string"&&F.add(Q.bead_id);for(let Q of Object.values(T.discard_operations||{})){let re=Q;re&&re.phase!=="done"&&typeof re.bead_id=="string"&&F.add(re.bead_id)}return F}function k(T){return T.filter(F=>M(F)===null)}function M(T){let F=m();for(let Q of Array.isArray(F.serial_lanes)?F.serial_lanes:[])if(Array.isArray(Q?.entries)&&Q.entries.some(re=>re.bead_id===T))return Q.id;return(Array.isArray(F.queue)?F.queue:[]).some(Q=>Q.bead_id===T)?"parallel":null}function N(T,F){let Q=a.get(T);return Q||[...F.order]}function A(T){if(T.length<2)return!1;let F=M(T[0]);if(!F||F==="parallel")return!1;let Q=m(),re=(Array.isArray(Q.serial_lanes)?Q.serial_lanes:[]).find(D=>D.id===F)?.entries.map(D=>D.bead_id);if(!Array.isArray(re))return!1;let w=T.map(D=>re.indexOf(D));return w.every(D=>D>=0)&&w.every((D,Z)=>Z===0||D>w[Z-1])}function $(){let T=m(),F=Array.isArray(T.serial_lanes)?T.serial_lanes:[],Q=F.find(re=>Array.isArray(re.entries)&&re.entries.length===0);return Q?Q.id:F[0]?.id||"s1"}function P(T){let F=m().bead_titles||{};return typeof F[T]=="string"?F[T]:T}async function I(T,F){if(!s||c)return null;c=!0,O();try{return await s(T,F)}finally{c=!1,O()}}async function S(T){n?.setPending?.(!0);try{let F=await I("worker-parallel-analysis-start",{force:T});F&&F.applied===!1&&F.reason&&le(`\uBD84\uC11D \uC2E4\uD328: ${F.reason}`,"error",2800)}finally{n?.setPending?.(!1)}}async function B(){let T=h().job;!s||!T||await s("worker-parallel-analysis-cancel",{job_id:T.job_id})}function V(){return m().runner_catalog}function se(T){return Object.keys(V()?.runners?.[T]?.models||{})}function ye(T){let F=se(T),Q=V()?.runners?.[T]?.default_model;return typeof Q=="string"&&F.includes(Q)?Q:F[0]||""}function te(){let T=h().settings,F=d||T.runner||"claude",Q=se(F),re=d?ye(F):T.model||Q[0]||"",w=Vo(V(),F,re),D=T.effort||"",Z=w.includes(D)?D:w[0]||"";return{runner:F,model:re,effort:Z,models:Q,efforts:w}}async function de(T){let F=h().settings,Q=await I("worker-parallel-analysis-settings-update",{expected_revision:F.revision,runner:T.runner,model:T.model,effort:T.effort});(!Q||Q.applied!==!0)&&(d=null,O(),Q&&Q.reason&&le(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${Q.reason}`,"error",2800))}function ke(T){d=T,O();let F=te();de({runner:T,model:F.model,effort:F.effort})}function Ue(T){let F=te(),Q=Vo(V(),F.runner,T);de({runner:F.runner,model:T,effort:Q.includes(F.effort)?F.effort:Q[0]||""})}function Ie(T){let F=te();de({runner:F.runner,model:F.model,effort:T})}async function He(T,F){if(!s||c)return;let Q=N(T,F),re=h();if(Q.length<2||!re.last_good){le("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let w=l.get(T)||$(),D=()=>({snapshot_digest:re.last_good.identity_digest,group_index:T,lane:w,ordered_bead_ids:Q,expected_revision:m().revision});c=!0,O();try{let Z=await s("worker-parallel-analysis-submit",D());Z&&Z.queue&&r&&r.set(Z.queue),Z&&Z.applied!==!0&&Z.conflict===!0&&(Z=await s("worker-parallel-analysis-submit",D()),Z&&Z.queue&&r&&r.set(Z.queue)),Z&&Z.applied===!0?(a.delete(T),le(`\uC9C1\uB82C \uB808\uC778 ${w}\uC5D0 ${Q.length}\uAC1C \uBC30\uCE58`,"success")):le(`\uC81C\uCD9C \uAC70\uBD80: ${Z?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{c=!1,O()}}function Ye(T,F,Q){a.set(T,N(T,F).filter(re=>re!==Q)),O()}function Ve(T){a.delete(T),O()}function Fe(T,F,Q,re){let w=[...N(T,F)],D=w.indexOf(Q),Z=D+re;D<0||Z<0||Z>=w.length||(w.splice(Z,0,...w.splice(D,1)),a.set(T,w),O())}function ve(){let T=h().settings,F=Object.keys(V()?.runners||{}),Q=te();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${re=>ke(re.target.value)}
        >
          ${F.map(re=>i`<option
                value=${re}
                ?selected=${Q.runner===re}
              >
                ${re}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${re=>Ue(re.target.value)}
        >
          ${Q.models.map(re=>i`<option
                value=${re}
                ?selected=${Q.model===re}
              >
                ${re}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${re=>Ie(re.target.value)}
        >
          ${Q.efforts.map(re=>i`<option
                value=${re}
                ?selected=${Q.effort===re}
              >
                ${re}
              </option>`)}
        </select>
      </label>
      ${Ae(T)}
    </div>`}function Ae(T){return!Y(T)||be(T)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:T.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${T.runner}/${T.model} · effort
        ${T.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:T.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function be(T){return T.is_default===!0&&T.compatible===!1}function Y(T){return!!(T.runner&&T.model&&T.effort)}function H(T){return Y(T)&&T.compatible!==!1}function xe(T){let F=Math.max(0,Math.floor(T/1e3)),Q=Math.floor(F/60),re=F%60;return`${Q}:${String(re).padStart(2,"0")}`}function ae(T){let F=T.job;if(F){let Q=typeof F.started_at=="number"?F.started_at:0,re=`${F.runner||"?"}/${F.model||"?"}`,w=Q?` \xB7 \uACBD\uACFC ${xe(Date.now()-Q)}`:"";return i`<span class="pa-meta__progress"
        >분석 중 — ${re} · effort ${F.effort||"?"}${w}</span
      >`}return ie()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function ie(){return n?.isPending?.()===!0}function W(T){let F=m(),Q=(Array.isArray(F.queue)?F.queue.length:0)+(Array.isArray(F.serial_lanes)?F.serial_lanes:[]).reduce((Z,De)=>Z+(Array.isArray(De.entries)?De.entries.length:0),0),re=!!T.job,w=H(T.settings),D=re||c||ie();return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${Q}</span>
      ${T.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(T.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${ae(T)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!w||D}
        @click=${()=>{S(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!w||D}
        @click=${()=>{S(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!re}
        @click=${()=>{B()}}
      >
        취소
      </button>
    </div>`}function U(T,F){let Q=N(T,F),re=E(),w=Q.filter(Te=>re.has(Te)),D=k(Q),Z=A(Q),De=Array.isArray(m().serial_lanes)?m().serial_lanes:[],Le=l.get(T)||$(),qe=F.eligible!==!0||Q.length<2||w.length>0||D.length>0||Z||c;return i`<section class="pa-group" data-group-index=${String(T)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${F.confidence}</span>
        ${F.categories.map(Te=>i`<span class="pa-group__category">${Te}</span>`)}
        ${Z?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${F.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${D.length>0?i`<span class="pa-group__stale"
              >stale — ${D.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${F.reason}</p>
      <ol class="pa-group__members">
        ${Q.map((Te,Qe)=>i`<li class="pa-member" data-bead-id=${Te}>
              <span class="pa-member__seq">${Qe+1}</span>
              <span class="pa-member__title">${P(Te)}</span>
              ${re.has(Te)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Te}
                ?disabled=${Qe===0}
                aria-label=${`${Te} \uC704\uB85C`}
                @click=${()=>Fe(T,F,Te,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Te}
                ?disabled=${Qe===Q.length-1}
                aria-label=${`${Te} \uC544\uB798\uB85C`}
                @click=${()=>Fe(T,F,Te,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Te}
                aria-label=${`${Te} \uC81C\uC678`}
                @click=${()=>Ye(T,F,Te)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${F.evidence.map(Te=>i`<li class="pa-evidence">
              <code>${Te.path}</code>
              <span class="pa-evidence__locator">${Te.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Ve(T)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Te=>{l.set(T,Te.target.value),O()}}
          >
            ${De.map((Te,Qe)=>i`<option
                  value=${Te.id}
                  ?selected=${Le===Te.id}
                >
                  직렬 ${Qe+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${qe}
          @click=${()=>{He(T,F)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ge(T){let F=Array.isArray(T.issues)?T.issues:[],Q=F.filter(w=>w.verdict==="parallel_ok").length,re=F.filter(w=>w.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${Q}</span>
      <span>uncertain ${re}</span>
    </div>`}function Pe(){let T=j&&!!h().job;if(T&&_===null){_=setInterval(()=>O(),1e3);return}!T&&_!==null&&(clearInterval(_),_=null)}function O(){let T=h();d&&T.settings.runner===d&&(d=null);let F=T.last_good?.result;Pe(),ze(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Ee}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${ve()} ${W(T)}
            ${F?i`${F.groups.map((Q,re)=>U(re,Q))}
                ${F.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ge(F)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let j=!1,R=()=>{j=!1,Pe()},ee=T=>{T.target===T.currentTarget&&Ee()};o.addEventListener("close",R),o.addEventListener("cancel",R),o.addEventListener("click",ee);let J=null;r&&r.subscribe&&(J=r.subscribe(()=>{j&&O()}));let fe=null;n&&n.subscribe&&(fe=n.subscribe(()=>{j&&O()}));function ue(){j||(j=!0,O(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function Ee(){j&&(j=!1,Pe(),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:ue,close:Ee,destroy(){j=!1,_!==null&&(clearInterval(_),_=null),o.removeEventListener("close",R),o.removeEventListener("cancel",R),o.removeEventListener("click",ee),J&&(J(),J=null),fe&&(fe(),fe=null),o.remove()}}}function Ec(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{});function s(){return t&&t.get()||{}}function o(){let $=s();return typeof $.revision=="number"?$.revision:0}function a($){t&&$&&$.queue&&typeof $.queue=="object"&&t.set($.queue)}function l(){let $=s().workspace_info;return $&&typeof $=="object"?$:{}}function c($,P){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${$}"
      >${P}</span
    >`}function d($){if(typeof $!="number"||!Number.isFinite($))return"";let P=$/6e4;return Number.isInteger(P)?`timeout ${P}\uBD84`:`timeout ${Math.round($/1e3)}\uCD08`}function _($){let P=d($);return P?c("config",P):""}function m($){let P=typeof $.base_sha=="string"?$.base_sha:"",I=`${$.source_path||"repo-ops/config.toml"} @ ${$.base_ref||"?"}${P?`@${P.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${I}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${$.verify?i`<code class="worker-repo-ops__vd-cmd"
                  >${$.verify.script}</code
                >${_($.verify.timeout_ms)}`:i`선언 없음${c("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${$.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${$.deploy?i`<code class="worker-repo-ops__vd-cmd"
                  >${$.deploy.script}</code
                >${_($.deploy.timeout_ms)}`:i`선언 없음${c("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${$.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function h($){let P=$.repo_ops&&typeof $.repo_ops=="object"?$.repo_ops:null;return P&&(P.status==="resolved"||P.status==="absent")?m(P):P&&(P.status==="pending"||P.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${P.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${P.error_code?i` — <code>${P.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function E($){if(!r)return;let P=await r("worker-auto-repair-toggle",{on:$,expected_revision:o()});if(a(P),P&&P.conflict){let I=await r("worker-auto-repair-toggle",{on:$,expected_revision:o()});a(I)}n()}let k={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M($,P,I){return i`<div class="worker-repo-ops__policy-group" data-policy=${I}>
      <div class="worker-repo-ops__policy-label">${$}</div>
      <ul class="worker-repo-ops__policy-list">
        ${P.map(S=>i`<li data-token=${S}>
              ${k[S]||S}
            </li>`)}
      </ul>
    </div>`}function N($){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${$.map(P=>{let I=[k[P.trigger]||P.trigger];return Number.isInteger(P.attempts_per_operation_attempt)?I.push(`operation\uB2F9 ${P.attempts_per_operation_attempt}\uD68C`):Number.isInteger(P.attempts)?I.push(`${k[P.budget]||P.budget} ${P.attempts}\uD68C`):Number.isInteger(P.sessions_per_user_action)&&I.push(`${P.sessions_per_user_action}\uD68C`,k[P.user_actions]||P.user_actions),P.applies_when&&I.push(k[P.applies_when]||P.applies_when),i`<li data-token=${P.id}>
            <strong>${k[P.id]||P.id}</strong>
            <span>${I.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function A(){let $=s(),P=$.auto_repair!==!1,I=$.repo_operation_policy&&typeof $.repo_operation_policy=="object"?$.repo_operation_policy:null,S=Array.isArray($.repo_operations)?$.repo_operations:[],B=S.find(te=>te.state==="repairing"),V=S.filter(te=>te.state==="failed"||te.state==="repairing"),se=V.length?Math.min(...V.map(te=>typeof te.repair?.remaining=="number"?te.repair.remaining:0)):I?.auto_repair?.resolution_ladder?.find(te=>te.id==="auto_repair_session")?.attempts??1,ye=Array.isArray(I?.auto_repair?.resolution_ladder)?I.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${P}
          @change=${te=>{E(te.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${P?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${se}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${B?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${B.repair?.owner_bead||B.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${I?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(I.worker_automatic||[]).length} · 해결 사다리
                ${ye.length} · 금지
                ${(I.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",I.worker_automatic||[],"worker-automatic")}
            ${I.supported===!1||I.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${I.schema_version})`}
                </div>`:N(ye)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",I.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${h(l())} ${A()}
      </details>`}}}var o_=20,Tc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Cc={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function a_(e,t,r=o_){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Rc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function i_(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Ic(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Lc(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function l_(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Cc,n)?Cc[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function c_(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?ht(e.at):""}
      >${As(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Rc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Tc,t.kind)?Tc[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ss(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Oo(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Rc(e)}"
          >${i_(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Lc(Vl(t.failure_kind,n)):""}
      ${l_(t)}
      ${Ic([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ss(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function d_(e){let t=e.cleanup,r=Dr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?ht(e.at):""}
      >${As(e.at)||"\u2014"}</span
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
        ${Wl(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Lc(Cs(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Ic([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function u_(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?d_(t):c_(t))}
        </ul>`}
  </section>`}function Oc(e,t={}){let r=null;function n(){ze(r?u_(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:a_(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var p_="tab:worker:ready",f_="tab:worker:blocked",__="tab:worker:in-progress",m_="tab:worker:closed",Is=1,Pc=5;function Dc(e){return hn(e).path.length>0}var Fc="beads-ui.worker.candidate-filter",Yo={show_blocked:!1,spec:"all"};function g_(){try{let e=window.localStorage.getItem(Fc);if(!e)return{...Yo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Yo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Yo}}}function h_(e){try{window.localStorage.setItem(Fc,JSON.stringify(e))}catch{}}function b_(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),d=n(l);c&&d?s.push(l):!c&&d?o+=1:c&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var y_=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],qc="bdui.worker.candidate_sort",v_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Ls="spec";function w_(){try{let e=window.localStorage.getItem(qc);return e==="board"||e==="created"||e==="spec"?e:Ls}catch{return Ls}}function k_(e){try{window.localStorage.setItem(qc,e)}catch{}}var Bc="bdui.worker.done-range";function $_(){try{let e=window.localStorage.getItem(Bc);return Pt(e)?e:It}catch{return It}}function x_(e){try{window.localStorage.setItem(Bc,e)}catch{}}var S_="(max-width: 640px)",Uc="beads-ui.worker.lane-collapsed",An={queue:!0,done:!0};function A_(){try{let e=window.localStorage.getItem(Uc);if(!e)return{...An};let t=JSON.parse(e);return!t||typeof t!="object"?{...An}:{queue:typeof t.queue=="boolean"?t.queue:An.queue,done:typeof t.done=="boolean"?t.done:An.done}}catch{return{...An}}}function E_(e){try{window.localStorage.setItem(Uc,JSON.stringify(e))}catch{}}function Mc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function T_(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Cr):(n.sort(jn(r)),t==="board"?n:[...n.filter(Dc),...n.filter(s=>!Dc(s))])}function C_(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function R_(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function I_(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var L_=["closed_unmerged","review","undecidable"],O_=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function P_(e,t){for(let r of O_)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function Nc(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function D_(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function M_(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Ko(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function N_(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function F_(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,d=!0,_=null,m=null,h=null,E={},k=!1,M=!1){let N=!!c&&c.position>0,A=!!c?.continuation_action&&c.continuation_action.continuation===null,$=!!c&&c.active===!0,P=c&&c.failure||null,I=r[e]||null,S=I&&I.gate?I.gate:null,B=I&&I.pr?I.pr:null,V=N_(h),se=D_(c?c.resolution:null),ye=M_(c?c.head_review:null),te=c&&c.head_review||null,de=c&&c.authority||null,ke=!!te&&["pending","reviewing","revising"].includes(te.state),Ue=N&&!$&&(te?.state==="failed"||!de||de.source==="automatic"&&!M),Ie=[];l&&Ie.push("\uC138\uC158");let He=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":se?se.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Ye=P_(l&&S&&S.tier==="closed_unmerged"?"\uB2EB\uD798":S&&S.gate_badge||"",He?null:o&&o.activity||null);if(He&&Ie.push(He),ye&&Ie.push(ye.badge),Ye.label&&Ie.push(Ye.label),S&&S.base_badge&&S.base_badge!==S.gate_badge&&Ie.push(S.base_badge),m&&Ie.push(m),n){let ie=Dr(n.step);Ie.push(ie?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${ie}`:"\uC815\uB9AC \uBA48\uCDA4")}V&&Ie.push(V.badge),N&&!$&&Ie.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),P&&Ie.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Nc(P)}`),A&&Ie.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),_&&Ie.push(`\uC790\uB3D9 \uC81C\uC678: ${Nc(_)}`);let Ve=!!S&&S.base_badge==="\uCDA9\uB3CC",Fe=!!S&&S.enabled===!0,ve=Do(o&&o.merge_progress?o.merge_progress.step:null),Ae=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!S&&S.tier==="merged",be=l&&!!n&&!!S&&S.tier==="merged",Y=l&&Ve&&d===!1,H=er(E,e,{external:l,merge_active:$||!!ve,merge_queued:N,conflict_active:!!a,cleanup_active:!1,merged:!!n||S?.tier==="merged"}),xe=!!H.operation,ae=!Ae&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?Ts(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:l,pr_number:B&&typeof B.number=="number"?B.number:null,pr_url:B&&typeof B.url=="string"?B.url:"",completion_badge:V?V.badge:null,completion_title:V?V.title:"",completion_repair_pr_url:V?V.repair_pr_url:"",completion_repair_pr_number:V?V.repair_pr_number:null,badges:Ie,live_badge:a==="paused"?null:se?.live||a==="running"?He:ye?.live?ye.badge:Ye.live?Ye.label:null,usage:s,alert:!!S&&L_.includes(S.tier)||!!n||!!P||!!(ye&&ye.alert)||!!(V&&V.alert),merge_action:ae?!1:!N||A||Ue,timeline_action:ae,cancel_action:N&&!A,cancel_enabled:(!$||ke)&&!(V&&V.lock_actions),cancel_title:V&&V.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":$&&!ke?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ke?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:H,discard_action:H.action,merge_step:ve,discard_enabled:H.enabled,discard_title:H.title,merge_enabled:!ve&&!a&&!xe&&!(V&&V.lock_actions)&&!Y&&!ae&&(Fe||Ve||Ae||be||Ue),merge_label:A?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ae||be?"\uC815\uB9AC \uC7AC\uAC1C":Ve&&!ve&&!Ae?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":Ue?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:xe?H.error?`\uD3D0\uAE30 \uC2E4\uD328: ${H.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${H.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:A?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ve?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ve.label}`:be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Y?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ve?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Fe?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Zo(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:d,doneRange:_,onDoneRangeChange:m}=t,h=n?zn(n,l):null,E=Gn({transport:r,uiOrderStore:l}),k=null,M=[],N=g_(),A=w_(),$=Pt(_)?_:$_(),P=new Map;function I(){let p=Qt.find(y=>y.value===$);return p?p.label:"\uC624\uB298"}let S=A_(),B=!1,V=new Set,se=new Set,ye=new Set,te=new Set,de=[],ke=document.createElement("div");ke.className="worker-console";let Ue=document.createElement("div");Ue.className="worker-top";let Ie=document.createElement("div");Ie.className="worker-drawer-overlay",Ie.hidden=!0;let He=document.createElement("div");He.className="worker-drawer-overlay__backdrop";let Ye=document.createElement("div");Ye.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,Ie.append(He,Ye,Ve);let Fe=document.createElement("div");Fe.className="worker-lanes-host",ke.append(Ue,Ie,Fe),e.appendChild(ke);let ve=null,Ae=fs(Ye,{transport:r,sessionLogStore:a,onClose:()=>{ve=null,Ie.hidden=!0,ne()}}),be=Oc(Ve,{onClose:()=>{Ve.hidden=!0,Ie.hidden=!0,ne()}}),Y=Ec({queueStore:s,transport:r,onChanged:()=>ne()}),H=o?Ac(ke,{queueStore:s,analysisStore:o,transport:r}):null;function xe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Is,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function ae(){let p=xe();return typeof p.revision=="number"?p.revision:0}function ie(p){p&&p.queue&&s&&s.set(p.queue)}function W(){let p=xe().queue;return Array.isArray(p)?p.length:0}async function U(p,y,x){if(!r)return;let oe=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},index:x,expected_revision:ae()}),me=await r("worker-queue-place",oe());ie(me),me&&me.conflict&&await r("worker-queue-place",oe()).then(ie)}async function ge(p,y,x){if(!r)return;let oe=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},to_index:x,expected_revision:ae()}),me=await r("worker-queue-reorder",oe());ie(me),me&&me.conflict&&await r("worker-queue-reorder",oe()).then(ie)}async function Pe(p){if(!r)return;let y=await r("worker-queue-remove",{bead_id:p,expected_revision:ae()});ie(y),y&&y.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:ae()}).then(ie)}async function O(p){if(!r||!p)return;let y=await r("worker-attempt-pause",{attempt_id:p});y&&y.paused===!1&&y.reason&&le(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function j(p){if(!r||!p)return;let y=async(oe={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:ae(),...oe}),x=await y();ie(x),x&&x.conflict&&(x=await r("worker-attempt-resume",{attempt_id:p,expected_revision:ae()}),ie(x)),x=await nr(x,(oe,me)=>y({continuation:oe,decision_token:me}),{onResult:ie,refresh:()=>y()}),x&&x.resumed===!1&&!x.conflict&&x.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}async function R(p){if(!r||!p)return;let y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ae()});ie(y),y&&y.conflict&&(y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ae()}),ie(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&le(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function ee(p,y,x=!0){if(!r)return null;let oe=r,me=await oe(p,{...y,expected_revision:ae()});return ie(me),me&&me.conflict&&x&&(me=await oe(p,{...y,expected_revision:ae()}),ie(me)),me}async function J(p){if(!r||!p)return;let y=xe().merge_queue?.find(oe=>oe.bead_id===p)?.continuation_action;if(y?.mismatch&&y.continuation===null){await ue(p,y.mismatch);return}V.add(p),ne();let x;try{x=await ee("worker-merge-queue-add",{bead_id:p})}finally{V.delete(p),ne()}!x||x.conflict||x.applied||le("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function fe(p){if(!(!r||!p||se.has(p))){se.add(p),ne();try{let y=await r("worker-cleanup-retry",{bead_id:p,expected_revision:ae()});ie(y),y&&!y.retried&&!y.conflict&&y.reason&&le(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{se.delete(p),ne()}}}async function ue(p,y){let x=await nr({continuation_mismatch:y},(me,Ge)=>ee("worker-merge-queue-add",{bead_id:p,continuation:me,decision_token:Ge},!1)),oe=x?.queue?.merge_queue?.find(me=>me.bead_id===p)?.continuation_action;if(x?.applied!==!0&&oe?.continuation===null&&oe.mismatch){await ue(p,oe.mismatch);return}x&&x.applied===!1&&!x.conflict&&le("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ee(p){if(!r)return;let y=await ee("worker-merge-auto-toggle",{on:p});!y||y.conflict||le(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function T(p){if(!r||!p)return;let y=await ee("worker-merge-queue-remove",{bead_id:p});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&le("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function F(){await ee("worker-merge-queue-remove",{all:!0})}async function Q(p,y=null,x="unmerged",oe=null){if(!r||!p)return;let me=wn(p,x);if(!(!!oe||typeof globalThis.confirm!="function"||globalThis.confirm(me)))return;let G=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...oe?{operation_id:oe}:{},expected_revision:ae()});if(ie(G),G&&G.conflict&&(G=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...oe?{operation_id:oe}:{},expected_revision:ae()}),ie(G)),G&&G.discarded===!0){le(Es(G),"success",5e3);return}if(G&&G.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${G.reason}`,"error",2800);return}if(G&&G.accepted&&G.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(G&&G.accepted&&!G.discarded){le(`\uD3D0\uAE30 \uC9C4\uD589: ${G.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}G&&!G.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function re(p,y,x){if(!(!r||!y||!x||te.has(y))){te.add(y),ne();try{let oe=await r(p,{bead_id:y,action_id:x,expected_revision:ae()});ie(oe),oe?.conflict?le("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!oe?.ok&&oe?.reason&&le(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(oe.reason)}`,"error",2800)}finally{te.delete(y),ne()}}}async function w(p,y){if(!r||!y||ye.has(y))return;ye.add(y),ne();let x;try{let oe=async(me={})=>await r(p,{bead_id:y,expected_revision:ae(),...me});x=await oe(),ie(x),x&&x.conflict&&(x=await r(p,{bead_id:y,expected_revision:ae()}),ie(x)),p==="worker-revise-fix"&&(x=await nr(x,(me,Ge)=>oe({continuation:me,decision_token:Ge}),{onResult:ie,refresh:()=>oe()}))}finally{ye.delete(y),ne()}if(!(!x||x.conflict)){if(x.ok){le(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}le(`\uCC98\uBD84 \uAC70\uBD80: ${x.reason||""}`,"error",3e3)}}async function D(p){if(!r)return;let y=await r("worker-automation-toggle",{on:p,expected_revision:ae()});ie(y),y&&y.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:ae()}).then(ie)}async function Z(p){if(!r||!p)return;let y=await r("worker-repo-operation-repair",{operation_id:p});if(ie(y),y&&y.ok===!1){le(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&le("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function De(p){if(!r||!p)return;let y=await r("worker-repo-operation-dismiss",{operation_id:p});ie(y),y&&y.ok===!1&&le(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function Le(p){if(!r||!Number.isFinite(p))return;let y=Math.max(Is,Math.floor(p)),x=await r("worker-queue-set-slots",{slots:y,expected_revision:ae()});ie(x),x&&x.conflict&&await r("worker-queue-set-slots",{slots:y,expected_revision:ae()}).then(ie)}async function qe(p){if(!r||!Number.isInteger(p)||p<1||p>Pc)return;let y=xe(),x=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(p).reduce((Ge,G)=>Ge+(Array.isArray(G?.entries)?G.entries.length:0),0),oe=()=>({count:p,expected_revision:ae()}),me=await r("worker-queue-set-serial-lane-count",oe());ie(me),me&&me.conflict&&(me=await r("worker-queue-set-serial-lane-count",oe()),ie(me)),me&&me.applied&&x>0&&le(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${x}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Te(){let p=xe(),y=h?h.selectBoardColumn(p_,"ready"):[],x=h?h.selectBoardColumn(f_,"blocked"):[],oe=h?h.selectBoardColumn(m_,"closed"):[],me=h?h.selectBoardColumn(__,"in_progress"):[],Ge=new Map;for(let g of me){let L=R_(g);if(!L)continue;let ce=Ge.get(L);ce?ce.push(g):Ge.set(L,[g])}let G=g=>{let L=Hn(Ge.get(g)||[]);return L?L.title||L.id:null},b=p.bead_titles||{},q=new Map;for(let[g,L]of Object.entries(b))typeof L=="string"&&L.length>0&&q.set(g,L);for(let g of[...y,...x])q.set(g.id,g.title||g.id);let pe=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Be=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Ke=new Map;for(let[g,L]of Object.entries(Be))Array.isArray(L)&&Ke.set(g,Go(L));for(let g of[...y,...x]){let L=g.labels;Array.isArray(L)&&!Ke.has(g.id)&&Ke.set(g.id,Go(L))}let Ze=new Map,we=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(we)?we:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let L=g.members.map(je=>{let ut=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Rt=>Rt.entries.some(pt=>pt.bead_id===je));return ut?ut.id:null});if(!(L.every(je=>je!==null)&&new Set(L).size===1))for(let je of g.members)Ze.set(je,g.members.filter(ut=>ut!==je))}let v=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},f=new Map;for(let[g,L]of Object.entries(pe))L&&typeof L=="object"&&f.set(g,L);for(let g of[...y,...x])f.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let u=g=>f.get(g)||{},C=p.pr_wait||[],K=p.pr_observations||{},he=p.pr_activity||{},Oe=p.cleanup_failed||{},$e=Object.entries(Oe).map(([g,L])=>({bead_id:g,step:L&&L.step?L.step:"",reason:L&&L.reason?L.reason:"",at:L&&typeof L.at=="number"?L.at:null,detail:L&&typeof L.detail=="string"?L.detail:null,output_tail:L&&typeof L.output_tail=="string"&&L.output_tail?L.output_tail:void 0,log_path:L&&typeof L.log_path=="string"&&L.log_path?L.log_path:void 0,retry_count:L&&typeof L.retry_count=="number"&&Number.isInteger(L.retry_count)&&L.retry_count>0?L.retry_count:0,failure_code:L&&typeof L.failure_code=="string"?L.failure_code:void 0,subject_id:L&&typeof L.subject_id=="string"?L.subject_id:void 0,repair_eligible:!!(L&&L.repair_eligible),repair:L&&L.repair?L.repair:void 0})),_t=p.queue||[],Ce=new Set([..._t.map(g=>g.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(L=>L.bead_id)),...C.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),dt=new Set(x.map(g=>g.id)),Zr=l?l.get()?.order||{}:{},ea=new Set,ta=[];for(let g of[...y,...x])Ce.has(g.id)||ea.has(g.id)||C_(g)||Sc(g.labels)||(ea.add(g.id),ta.push(g));M=T_(ta,A,Zr);let ed=p.admission||{},ra=g=>{let L=ed[g];if(!L)return"";if(L.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ce=typeof L.reason=="string"?L.reason:"",je=ce.indexOf(":");return je>0&&je<ce.length-1?`\u26D4 ${ce.slice(0,je)} (${ce.slice(je+1)})`:`\u26D4 ${ce}`},td=M.map(g=>{let L=hn(g),ce=L.path.length>0,je=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",ut=!je&&ce&&!L.conflict,Rt=dt.has(g.id),pt=[];Rt&&pt.push(I_(g)),je?pt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):L.conflict?pt.push("spec_id_conflict"):ce||pt.push("spec \uC5C6\uC74C");let st=ra(g.id);return st&&pt.push(st),{id:g.id,title:g.title||g.id,reason:pt.join(" \xB7 "),draggable:ut,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:je,status:g.status,blocked:Rt,has_spec:ce}}),Os=b_(td,N),rd=Os.visible,nd=p.revise_parked||{},En=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ps=(g,L)=>g.map((ce,je)=>{let ut=L!=="done",Rt=L!=="done"&&L!=="queue",pt=ut?nd[ce.bead_id]:null,st=ut?er(En,ce.bead_id):null,On=st?.operation?st:null,gd=ut&&Ke.get(ce.bead_id)===!0,Aa=v[ce.bead_id]||[],Us=p.admission&&typeof p.admission=="object"?p.admission[ce.bead_id]:null,js=ut?Ul(Us,!!On||te.has(ce.bead_id)):null,hd=ut&&!js?ra(ce.bead_id):null,bd=ut?[hd]:[],Ea=ut&&Aa.length>0&&typeof Us?.reason=="string"&&Us.reason.startsWith("not_ready")?[`\u23F8 ${Aa.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Ws=ut?Ze.get(ce.bead_id):void 0;return Ws&&Ws.length>0&&Ea.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ws.join(", ")}\uC640`),{id:ce.bead_id,title:q.get(ce.bead_id)||ce.bead_id,reason:bd.filter(Boolean).join(" \xB7 "),draggable:ut&&!On&&!js,done:L==="done",lane:L,seq:Rt?je+1:void 0,worker_serial:gd,discard:On,stale_work:js,badges:[...Ea,...pt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!pt,revise_action:!!pt,revise_enabled:!!pt&&!On&&!ye.has(ce.bead_id),revise_title:pt?pt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${pt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:L==="done"?Dt(p.attempts||{},ce.bead_id):null,done_at:L==="done"&&typeof ce.added_at=="number"?ce.added_at:void 0,...u(ce.bead_id)}}),na=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&na.set(g.bead_id,g.added_at);let Nr=p.attempts?Object.values(p.attempts):[],Ds=new Set;for(let g of Nr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&Ds.add(g.resumed_from);let Ms=new Map;for(let g of Nr)Ms.set(g.bead_id,g.attempt_id);let Ns=new Map;for(let g of Nr)Ns.set(g.attempt_id,g);function Fs(g){let L=new Set,ce=g;for(;ce&&!L.has(ce.attempt_id);){if(ce.conflict_resolution===!0)return!0;L.add(ce.attempt_id),ce=typeof ce.resumed_from=="string"&&ce.resumed_from.length>0&&Ns.get(ce.resumed_from)||null}return!1}let Tn=typeof p.declared_base=="string"?p.declared_base:null;function sd(g){let L=null;for(let ce of Nr)!ce||ce.bead_id!==g||Fs(ce)||(L===null||(typeof ce.started_at=="number"?ce.started_at:0)>=(typeof L.started_at=="number"?L.started_at:0))&&(L=ce);return L&&typeof L.target_base=="string"?L.target_base:null}let sa=[],oa=[],od=g=>{let L=Ms.get(g.bead_id)!==g.attempt_id,ce=na.get(g.bead_id),je=typeof ce=="number"&&ce>0&&typeof g.finished_at=="number"&&ce>=g.finished_at;return!L&&!je&&typeof g.dismissed_at!="number"},aa=g=>{let L=typeof g.session_id=="string"&&g.session_id.length>0,ce=Ds.has(g.attempt_id);return{eligible:L&&!ce,reason:L?ce?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},jt=null;for(let g of Nr){let L=g.status==="paused"&&!Ds.has(g.attempt_id);if(g.status==="running"||L)oa.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:q.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:L,conflict_resolution:Fs(g),base_exception:Ko(Tn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:er(En,g.bead_id,{attempt_id:g.attempt_id}),usage:Dt(p.attempts||{},g.bead_id),current_child:G(g.bead_id),...u(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&od(g)){let ce=aa(g);sa.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:q.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:er(En,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ce.eligible,resume_reason:ce.reason,conflict_resolution:Fs(g),base_exception:Ko(Tn,g.target_base),usage:Dt(p.attempts||{},g.bead_id),current_child:G(g.bead_id),...u(g.bead_id)}),jt=g}}let Cn=[...sa,...oa],ia=null;if(jt){let g=aa(jt),L=jt.cause_detail;ia={bead_id:jt.bead_id,repo:jt.repo||"",reason:jt.cause||jt.status,cause_detail:L&&typeof L.reason=="string"?{reason:L.reason,command:typeof L.command=="string"?L.command:null}:null,resume_attempt_id:jt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:er(En,jt.bead_id,{attempt_id:jt.attempt_id})}}let la=new Set(Cn.map(g=>g.bead_id)),qs=Array.isArray(p.merge_queue)?p.merge_queue:[],ca=new Map,da=new Map,ua=new Map,pa=new Map,fa=new Map;qs.forEach((g,L)=>{g&&typeof g.bead_id=="string"&&(ca.set(g.bead_id,L+1),da.set(g.bead_id,g.resolution),ua.set(g.bead_id,g.continuation_action||null),pa.set(g.bead_id,g.head_review||null),fa.set(g.bead_id,g.authority||null))});let _a=p.merge_queue_state||{active:null,failures:{}},ad=_a.failures||{},id=p.auto_merge_skips||{},ma=g=>{let L=id[g];if(!L)return null;let ce=K[g],je=ce&&ce.pr?ce.pr.head_sha:null;return je&&je===L.head_sha?L.reason||"":null},Rn=new Map;for(let g of Cn)g.failed!==!0&&g.conflict_resolution&&(g.paused?Rn.has(g.bead_id)||Rn.set(g.bead_id,"paused"):Rn.set(g.bead_id,"running"));let ga=Cn.filter(g=>!g.paused&&g.failed!==!0).length,ha=(p.workspace_info||{}).slots,ba=typeof ha=="number"?ha:typeof p.slots=="number"?p.slots:Is,ld=ga>ba,In=Er($),cd=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>In===void 0||typeof g.added_at!="number"||g.added_at>=In).sort((g,L)=>(L.added_at||0)-(g.added_at||0)),Xr=Ps(cd,"done"),dd=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),ya=[],ud=d?.()||"";for(let g of oe){let L=Rr(g.closed_at);if(typeof g.id!="string"||dd.has(g.id)||L===null||In!==void 0&&L<In||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ce=`${ud}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,je=P.get(ce);je===void 0&&r&&(P.set(ce,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(ut=>{let Rt=Array.isArray(ut)&&ut.some(pt=>_s(typeof pt?.text=="string"?pt.text:"")?.lane==="session");P.set(ce,Rt?"session":"not-session"),ne()}).catch(()=>{P.set(ce,"failed"),ne()})),je==="session"&&ya.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:L,created_at:g.created_at,updated_at:g.updated_at})}Xr.push(...ya),Xr.sort((g,L)=>(L.done_at||0)-(g.done_at||0));let Ln={};for(let g of sr)Ln[g]=0;let va=!1,wa=0,Bs=0,ka=0;for(let g of Xr){let L=g.usage;if(L&&typeof L=="object"){let ce=!1;for(let je of sr)Number.isFinite(L[je])&&(Ln[je]+=L[je],va=!0,ce=!0);ce&&(Bs+=1,Number.isFinite(L.total_cost_usd)&&(wa+=L.total_cost_usd,ka+=1))}}Bs>0&&ka===Bs&&(Ln.total_cost_usd=wa);let $a=Xr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),pd=$a.length>0?wt(Jn($a)):va?zt(Ln):null,fd=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},_d=Array.isArray(p.serial_lanes)?p.serial_lanes:[],xa=g=>{if(C.some(je=>je.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let L=Nr.filter(je=>je&&je.bead_id===g),ce=L.length>0?L[L.length-1].status:null;return ce==="failed"||ce==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ce==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Sa=_d.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,L)=>{let ce=fd[g.id]||{},je=new Map((Array.isArray(ce.corrections)?ce.corrections:[]).filter(st=>st&&typeof st.bead_id=="string"&&typeof st.after=="string").map(st=>[st.bead_id,st.after])),ut=Ps(g.entries.filter(st=>!la.has(st.bead_id)),g.id).map(st=>je.has(st.id)?{...st,badges:[`\u{1F517} ${je.get(st.id)} \uB4A4 (blocks \uC790\uB3D9)`,...st.badges]}:st),Rt=Array.isArray(ce.occupied_by)?ce.occupied_by.filter(st=>typeof st=="string"):[],pt=Rt.map(st=>({id:st,title:q.get(st)||st,draggable:!1,lane:g.id,ghost:!0,badges:[xa(st)]}));return{id:g.id,index:L+1,rows:[...pt,...ut],occupied:Rt.length>0,badge:Rt.length>0?xa(Rt[0]):"\uB300\uAE30",cycle:ce.cycle===!0}}),md=typeof p.serial_lane_count=="number"?p.serial_lane_count:Sa.length;return{queue:p,idToTitle:q,candidates:rd,candidate_hidden:{blocked:Os.hidden_blocked,spec:Os.hidden_spec},running:Cn,live_count:ga,slots:ba,over_cap:ld,failure:ia,waiting:Ps(_t.filter(g=>!la.has(g.bead_id)),"queue"),serial_lanes:Sa,serial_lane_count:md,pr_wait:C.map(g=>F_(g.bead_id,q.get(g.bead_id)||g.bead_id,K,Oe[g.bead_id]||null,Dt(p.attempts||{},g.bead_id),he[g.bead_id]||(V.has(g.bead_id)||se.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Rn.get(g.bead_id)||null,g.external===!0,{position:ca.get(g.bead_id)||0,active:_a.active===g.bead_id,failure:ad[g.bead_id]||null,resolution:da.get(g.bead_id),continuation_action:ua.get(g.bead_id),head_review:pa.get(g.bead_id)||null,authority:fa.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?ma(g.bead_id):null,Ko(Tn,sd(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ns.get(Ms.get(g.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0)).map(g=>({...g,...u(g.id)})),merge_queue_length:qs.length,merge_queue_running:qs.length>0,auto_excluded:C.map(g=>g.bead_id).filter(g=>ma(g)!==null),declared_base:Tn,done:Xr,token_total:pd,cleanup_failures:$e,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function Qe(){let y=!!o?.get()?.job,x=!y&&o?.isPending?.()===!0,oe=y?"\uBD84\uC11D \uC911":x?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${oe?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${oe?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${oe?i`<span class="worker-analysis-btn__badge">${oe}</span>`:""}
    </button>`}function kt(p){let y=p.waiting.length>0?p.waiting[0].id:"\u2014",x=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,oe=mt(p),me=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ge=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${p.done.length}</b></span
      >`,G=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,b=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Is}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Pc},(Be,Ke)=>Ke+1).map(Be=>i`<option
                value=${String(Be)}
                ?selected=${p.serial_lane_count===Be}
              >
                ${Be}
              </option>`)}
        </select>
      </label>
      ${o?Qe():""} `,q=Kl({failure:p.failure}),pe=Bl(p.repo_operations,p.cleanup_failures);return B?i`<div class="worker-ribbon">
          ${x} ${oe}
          <div class="worker-kpi worker-kpi--ribbon">${me}${Ge}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${b}</div>
          <div class="worker-kpi">${G}</div>
        </div>
        ${pe}${Y.template()}${q}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${x}${oe}${b}</div>
        <div class="worker-kpi">
          ${me}${Ge}${G}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Be=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Be.tooltip}
                >${I()} 완료 · 누적 ${Be.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${pe}${Y.template()}${q}`}function yt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let y=p.running.some(x=>!x.paused&&x.failed!==!0);return i`<section
      class="worker-now${y?" worker-pane--live":""}"
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
      ${p.running.length>0?qo(p.running,Date.now(),ve):""}
      ${p.pr_wait.map(x=>Po(x))}
    </section>`}function ct(p){let y=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${N.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${y_.map(x=>i`<button
              type="button"
              class="worker-filter__chip${N.spec===x.value?" is-active":""}"
              data-spec=${x.value}
              aria-pressed=${N.spec===x.value?"true":"false"}
            >
              ${x.label}
            </button>`)}
        ${y.spec>0?i`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function $t(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${A}
    >
      ${v_.map(p=>i`<option value=${p.value} ?selected=${A===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function at(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${$}
      >
        ${Qt.map(p=>i`<option value=${p.value} ?selected=${$===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function ot(p){let y=i`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,x=p.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Yt({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:y,controls:x})}function mt(p){let y=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(y)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let x=new Set(p.auto_excluded),oe=p.pr_wait.filter(me=>me.merge_action&&me.merge_enabled&&!x.has(me.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${oe>0?` ${oe}`:""}
    </button>`}function z(p){let y=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:$t(),controls:ct(p)});return B?i`<div class="worker-lanes worker-lanes--mobile">
        ${yt(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:S.queue,preview:Mc(p.waiting)})}
        ${p.serial_lanes.map(x=>ot(x))}
        ${y}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:at(),collapsible:!0,collapsed:S.done,preview:Array.isArray(p.token_total)?p.token_total.map(x=>x.label).join(" \xB7 "):p.token_total||Mc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${y}
      <div class="worker-wait">
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(x=>ot(x))}
      </div>
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(x=>!x.paused&&x.failed!==!0),body:qo(p.running,Date.now(),ve)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${p.done.length}`,items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:at()})}
    </div>`}function X(p){S={...S,[p]:!S[p]},E_(S),ne()}function ne(){let p=Te();ze(kt(p),Ue),ze(z(p),Fe)}function _e(){let p=document.querySelector(".app-header");if(!p)return;let y=()=>{let x=Math.round(p.getBoundingClientRect().height);ke.style.setProperty("--worker-ribbon-top",`${x}px`)};if(y(),typeof ResizeObserver=="function"){let x=new ResizeObserver(y);x.observe(p),de.push(()=>x.disconnect())}else window.addEventListener("resize",y),de.push(()=>window.removeEventListener("resize",y))}function Se(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(S_);B=!!p.matches;let y=x=>{let oe=!!(x&&typeof x.matches=="boolean"?x.matches:p.matches);oe!==B&&(B=oe,ne())};typeof p.addEventListener=="function"?(p.addEventListener("change",y),de.push(()=>p.removeEventListener("change",y))):typeof p.addListener=="function"&&(p.addListener(y),de.push(()=>p.removeListener(y)))}let Me=null;function tt(p){Me=p.target instanceof Element?p.target:null}function Je(p){let x=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!x)return;if(Me&&x.contains(Me)&&Me.closest("input, button, a")){p.preventDefault();return}let oe=x.dataset.beadId||"",me=x.dataset.lane||"";k={bead_id:oe,from_lane:me};try{p.dataTransfer?.setData("text/plain",oe),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Ne(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;let x=y.dataset.lane||"";x!=="candidate"&&x!=="queue"&&!/^s[1-5]$/.test(x)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function rt(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Re(p,y){let x=M.find(G=>G.id===p);if(!x)return;let oe=M.filter(G=>G.id!==p),me=oe.length;if(y){let G=y.dataset.beadId;if(G===p)return;let b=oe.findIndex(q=>q.id===G);b>=0&&(me=b)}let Ge=oe.slice();Ge.splice(me,0,x),E.applyReorder(p,Ge,me)}function ft(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;p.preventDefault(),y.classList.remove("worker-pane--drag-over");let x=y.dataset.lane||"",oe=k?.bead_id||p.dataTransfer?.getData("text/plain")||"",me=k?.from_lane||"";if(k=null,!oe)return;let Ge=p.target?.closest?.(".worker-mini, .worker-card"),G=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),b=G.length;if(Ge){let q=G.indexOf(Ge);q>=0&&(b=q)}if(b=Math.max(0,b-y.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(b=W()),x==="candidate"){if(me==="candidate"){Re(oe,Ge);return}(me==="queue"||/^s[1-5]$/.test(me))&&Pe(oe);return}if(x==="queue"||/^s[1-5]$/.test(x)){let q=x==="queue"?"parallel":x;me===x?ge(oe,q,b):U(oe,q,b)}}function xt(p){N=p,h_(p),ne()}function qt(p){A=p==="board"||p==="created"||p==="spec"?p:Ls,k_(A),ne()}function Xt(p){$=Pt(p)?p:It,x_($),m?.($),ne()}function ur(p){let y=p.target?.closest?.(".worker-serial-lane-count");if(y){let b=Number.parseInt(y.value,10);Number.isFinite(b)&&qe(b).then(ne);return}let x=p.target?.closest?.(".worker-filter__blocked");if(x){xt({...N,show_blocked:x.checked});return}let oe=p.target?.closest?.(".worker-done-range");if(oe){Xt(oe.value);return}let me=p.target?.closest?.(".worker-sort");if(me){qt(me.value||Ls);return}let Ge=p.target?.closest?.(".worker-slots__input");if(!Ge)return;let G=Number.parseInt(Ge.value,10);if(!Number.isFinite(G)){ne();return}Le(G).then(ne)}function gt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function vt(){let p=Te();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:d&&d()||""}}function pr(){ve&&Ae.close(),Ve.hidden=!1,Ie.hidden=!1,be.open(vt()),ne()}function tr(p){let y=xe(),x=y.attempts?y.attempts[p]:null;ve=p,be.close(),Ve.hidden=!0,Ie.hidden=!1,Ae.open({attempt_id:p,meta:gt(x)}),ne()}function Bt(){if(be.isOpen()&&be.refresh(vt()),!ve)return;let p=xe(),y=p.attempts?p.attempts[ve]:null;if(y){Ae.updateMeta(gt(y));return}Ae.close()}function Ut(p){let y=p.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-parallel-analysis-dialog"))return;if(y?.closest?.(".worker-analysis-btn")){H?.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){pr();return}let x=y?.closest?.(".worker-repo-op__session");if(x){let Ce=x.dataset.attemptId;Ce&&tr(Ce);return}let oe=y?.closest?.(".worker-repo-op__resolve");if(oe){Z(oe.dataset.operationId||"");return}let me=y?.closest?.(".worker-repo-op__dismiss");if(me){De(me.dataset.operationId||"");return}let Ge=y?.closest?.(".worker-cleanup__resume");if(Ge){let Ce=Ge.dataset.beadId;Ce&&fe(Ce);return}let G=y?.closest?.(".worker-banner__resume");if(G){let Ce=G.dataset.attemptId;Ce&&j(Ce);return}let b=y?.closest?.(".worker-banner__discard");if(b){let Ce=b.dataset.confirmation==="merged"?"merged":"unmerged";Q(b.dataset.beadId||"",b.dataset.attemptId||null,Ce,b.dataset.operationId||null);return}let q=y?.closest?.(".worker-banner__dismiss");if(q){let Ce=q.dataset.attemptId;Ce&&R(Ce);return}if(y?.closest?.(".worker-play")){D(!xe().auto_advance);return}let pe=y?.closest?.(".worker-merge-all");if(pe){pe.classList.contains("worker-merge-all--stop")?xe().auto_merge===!0?Ee(!1):F():Ee(!0);return}let Be=y?.closest?.(".worker-pane__hd--toggle");if(Be){let Ce=Be.dataset.lane;(Ce==="queue"||Ce==="done")&&X(Ce);return}let Ke=y?.closest?.(".worker-card__place");if(Ke){let Ce=Ke.dataset.beadId;Ce&&!Ke.disabled&&U(Ce,"parallel",W());return}let Ze=y?.closest?.(".worker-filter__chip");if(Ze){let Ce=Ze.dataset.spec;(Ce==="all"||Ce==="with"||Ce==="without")&&xt({...N,spec:Ce});return}let we=y?.closest?.(".worker-mini__merge");if(we){let Ce=we.dataset.beadId||"";xe().cleanup_failed?.[Ce]?fe(Ce):J(Ce);return}let v=y?.closest?.(".worker-mini__merge-cancel");if(v){T(v.dataset.beadId||"");return}let f=y?.closest?.(".worker-mini__discard");if(f){Q(f.dataset.beadId||"",f.dataset.attemptId||null,f.dataset.discardMode==="merged"?"merged":"unmerged",f.dataset.operationId||null);return}let u=y?.closest?.(".worker-mini__stale-continue");if(u){re("worker-stale-work-continue",u.dataset.beadId||"",u.dataset.actionId||"");return}let C=y?.closest?.(".worker-mini__stale-backup");if(C){re("worker-stale-work-backup-fresh",C.dataset.beadId||"",C.dataset.actionId||"");return}let K=y?.closest?.(".worker-mini__stale-recheck");if(K){re("worker-stale-work-recheck",K.dataset.beadId||"",K.dataset.actionId||"");return}let he=y?.closest?.(".worker-mini__revise-fix");if(he){w("worker-revise-fix",he.dataset.beadId||"");return}let Oe=y?.closest?.(".worker-mini__revise-approve");if(Oe){w("worker-revise-approve",Oe.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let Ce=y?.closest?.(".rtile"),dt=Ce?.dataset?.beadId,Zr=Ce?.dataset?.attemptId;dt&&Q(dt,Zr||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&R(dt);return}if(y?.closest?.(".rtile__pause")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&O(dt);return}if(y?.closest?.(".rtile__resume")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&j(dt);return}if(y?.closest?.(".rtile__session")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&tr(dt);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){be.close(),Ae.close();return}if(y?.closest?.(".worker-drawer-host"))return;let $e=y?.closest?.(".rtile");if($e){if(y?.closest?.(".rtile__id")){let dt=$e.dataset.beadId;dt&&Ir(dt).then(Zr=>{Zr?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ce=$e.dataset.beadId;Ce&&c&&c(Ce);return}let _t=y?.closest?.(".worker-mini, .worker-card");if(_t){let Ce=_t.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Ce&&Ir(Ce).then(dt=>{dt?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Ce&&c&&c(Ce)}}return e.addEventListener("pointerdown",tt),e.addEventListener("dragstart",Je),e.addEventListener("dragover",Ne),e.addEventListener("dragleave",rt),e.addEventListener("drop",ft),e.addEventListener("click",Ut),e.addEventListener("change",ur),Se(),_e(),h&&de.push(h.subscribe(()=>{for(let[p,y]of P)y==="failed"&&P.delete(p);ne()})),s&&de.push(s.subscribe(()=>{ne(),Bt()})),o&&typeof o.subscribe=="function"&&de.push(o.subscribe(()=>ne())),ne(),{load(){ne()},destroy(){for(let p of de.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",tt),e.removeEventListener("dragstart",Je),e.removeEventListener("dragover",Ne),e.removeEventListener("dragleave",rt),e.removeEventListener("drop",ft),e.removeEventListener("click",Ut),e.removeEventListener("change",ur);try{Ae.destroy()}catch{}Ie.hidden=!0;try{H?.destroy()}catch{}ze(i``,e)}}}function Xo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function jc(e,t,r,n=async()=>{},s=async()=>{}){let o=it("views:workspace-picker"),a=null,l=!1,c=!1,d=!1;async function _(B){let se=B.target.value,te=t.getState().workspace?.current?.path||"";if(se&&se!==te){o("switching workspace to %s",se),l=!0,S();try{await r(se)}catch(de){o("workspace switch failed: %o",de)}finally{l=!1,S()}}}async function m(){let B=t.getState(),V=B.workspace?.current?.path||B.workspace?.available?.[0]?.path||"";if(!(!V||c)){o("git-pulling workspace %s",V),c=!0,S();try{await n(V)}catch(se){o("workspace git pull failed: %o",se)}finally{c=!1,S()}}}function h(B){let V=B.target;V&&e.contains(V)||M()}function E(B){B.key==="Escape"&&M()}function k(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",E),S())}function M(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),S())}function N(){d?M():k()}async function A(B){let V=B.target,se=V.value,ye=V.checked;o("toggling visibility %s \u2192 %s",se,String(ye));try{await s(se,ye)}catch(te){o("workspace visibility toggle failed: %o",te)}}function $(B){return B?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${l||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function P(B,V){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
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
                ${B.map(se=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${se.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${se.path}"
                        .checked=${!V.has(se.path)}
                        @change=${A}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Xo(se.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let B=t.getState(),V=B.workspace?.current,se=B.workspace?.available||[],ye=new Set(B.workspace?.hidden||[]),te=V?.path||se[0]?.path||"";if(se.length===0)return i``;let de=se.filter(ke=>!ye.has(ke.path)||ke.path===te);if(de.length<=1){let ke=de[0]||se[0],Ue=Xo(ke.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ke.path}"
            >${Ue}</span
          >
          ${P(se,ye)}
          ${$(te)}
          ${c?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${_}
          ?disabled=${l||c}
          aria-label="Select project workspace"
        >
          ${de.map(ke=>i`
              <option
                value="${ke.path}"
                ?selected=${ke.path===te}
                title="${ke.path}"
              >
                ${Xo(ke.path)}
              </option>
            `)}
        </select>
        ${P(se,ye)}
        ${$(te)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){ze(I(),e)}return S(),a=t.subscribe(()=>S()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),ze(i``,e)}}}var Wc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Qo(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function zc(e,t,r=Qo()){return{id:r,type:e,payload:t}}function Hc(e={}){let t=it("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,d=new Map,_=[],m=new Map,h=new Set;function E(I){for(let S of Array.from(h))try{S(I)}catch{}}function k(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),S=(r.jitterRatio||0)*I,B=Math.max(0,Math.round(I+(Math.random()*2-1)*S));t("ws retry in %d ms (attempt %d)",B,a+1),l=setTimeout(()=>{l=null,P()},B)}function M(I){try{s?.send(JSON.stringify(I))}catch(S){t("ws send failed",S)}}function N(){for(o="open",t("ws open"),E(o),a=0;_.length;){let I=_.shift();I&&M(I)}}function A(I){let S;try{S=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){t("ws received invalid envelope");return}if(d.has(S.id)){let V=d.get(S.id);d.delete(S.id),S.ok?V?.resolve(S.payload):V?.reject(S.error||new Error("ws error"));return}let B=m.get(S.type);if(B&&B.size>0)for(let V of Array.from(B))try{V(S.payload)}catch(se){t("ws event handler error",se)}else t("ws received unhandled message type: %s",S.type)}function $(){o="closed",t("ws closed"),E(o);for(let[I,S]of d.entries())S.reject(new Error("ws disconnected")),d.delete(I);a+=1,k()}function P(){if(!c)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",E(o),s.addEventListener("open",N),s.addEventListener("message",A),s.addEventListener("error",()=>{}),s.addEventListener("close",$)}catch(S){t("ws connect failed %o",S),k()}}return P(),{send(I,S){if(!Wc.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let B=Qo(),V=zc(I,S,B);return t("send %s id=%s",I,B),new Promise((se,ye)=>{d.set(B,{resolve:se,reject:ye,type:I}),s&&s.readyState===s.OPEN?M(V):(t("queue %s id=%s (state=%s)",I,B,o),_.push(V))})},on(I,S){m.has(I)||m.set(I,new Set);let B=m.get(I);return B?.add(S),()=>{B?.delete(S)}},onConnection(I){return h.add(I),()=>{h.delete(I)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,P()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function q_(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function B_(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Jo=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Gc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],vr="tab:worker:closed",U_="bdui.worker.done-range",Vc=uc,Yc="worker:queue",Kc="worker:parallel-analysis",Zc="ui:order",Xc="ui:display-policy",Qc="exec:presets",wr="tab:board:closed",Jc="beads-ui.board.closed-range";function j_(e){let t=it("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ze(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&xc(s),o&&a&&l&&c){let Fe=function(f,u){let C="Request failed",K="";if(f&&typeof f=="object"){let Oe=f;if(typeof Oe.message=="string"&&Oe.message.length>0&&(C=Oe.message),typeof Oe.details=="string")K=Oe.details;else if(Oe.details&&typeof Oe.details=="object")try{K=JSON.stringify(Oe.details,null,2)}catch{K=""}}else typeof f=="string"&&f.length>0&&(C=f);let he=u&&u.length>0?`Failed to load ${u}`:"Request failed";Ve.open(he,C,K)},Ee=function(f){return`${x.getState().workspace.current?.path||""}\0${f}`},T=function(){Pe&&(Pe().catch(()=>{}),Pe=null),O=null,j=null},Q=function(f){R=f;let u=()=>{R!==f||x.getState().selected_id!==f||(R=null,F(f))};if(!fe){J.then(u);return}u()},Z=function(f,u,C,K,he){return C!==D[u]?(he().catch(()=>{}),!1):(f.set(K,he),!0)},Le=function(){let f=x.getState();yt(f.view==="board"),z(f.view==="worker"),Me(f.view==="monitor"),ne(f.view==="board"||f.view==="worker"||De||!!f.selected_id)},Qe=function(){let f=Er(qe);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},kt=function(){let f=Er(Te);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},yt=function(f){if(f)for(let[u,C]of Jo){if(re.has(u)||w.has(u))continue;let K=u===wr?Qe():{type:C};try{Y.register(u,K)}catch($e){t("register %s store failed: %o",u,$e)}w.add(u);let he=D.board,Oe=!1;be.subscribeList(u,K).then($e=>{Oe=!Z(re,"board",he,u,$e)}).catch($e=>{t("subscribe %s failed: %o",u,$e),Fe($e,"board")}).finally(()=>{w.delete(u),Oe&&Le()})}else at()},at=function(){D.board+=1;for(let[f]of Jo){let u=re.get(f);u&&(u().catch(()=>{}),re.delete(f));try{Y.unregister(f)}catch(C){t("unregister %s failed: %o",f,C)}}},z=function(f){if(!f){X();return}for(let[u,C]of Gc){if(ot.has(u)||w.has(u))continue;let K=u===vr?kt():{type:C};try{Y.register(u,K)}catch($e){t("register %s store failed: %o",u,$e)}w.add(u);let he=D.worker,Oe=!1;be.subscribeList(u,K).then($e=>{Oe=!Z(ot,"worker",he,u,$e)}).catch($e=>{t("subscribe %s failed: %o",u,$e),Fe($e,"worker")}).finally(()=>{w.delete(u),Oe&&Le()})}},X=function(){D.worker+=1;for(let[f]of Gc){let u=ot.get(f);u&&(u().catch(()=>{}),ot.delete(f));try{Y.unregister(f)}catch(C){t("unregister %s failed: %o",f,C)}}},ne=function(f){if(!f){_e();return}mt||(Ae("subscribe-worker-queue",{id:Yc}).catch(u=>{t("subscribe-worker-queue failed: %o",u)}),Ae("subscribe-worker-parallel-analysis",{id:Kc}).catch(u=>{t("subscribe-worker-parallel-analysis failed: %o",u)}),mt=()=>(Ae("unsubscribe-worker-parallel-analysis",{id:Kc}),Ae("unsubscribe-worker-queue",{id:Yc})))},_e=function(){mt&&(mt().catch(()=>{}),mt=null),xe.clear()},Me=function(f){if(!f){tt();return}Se||(Ae("subscribe-monitor-pipeline",{id:Vc}).catch(u=>{t("subscribe-monitor-pipeline failed: %o",u)}),Se=()=>Ae("unsubscribe-monitor-pipeline",{id:Vc}))},tt=function(){Se&&(Se().catch(()=>{}),Se=null)},Ne=function(){Je||(Ae("subscribe-ui-order",{id:Zc}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),Je=()=>Ae("unsubscribe-ui-order",{id:Zc}))},rt=function(){Je&&(Je().catch(()=>{}),Je=null),ie.clear()},ft=function(){Re||(Ae("subscribe-display-policy",{id:Xc}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),Re=()=>Ae("unsubscribe-display-policy",{id:Xc}))},xt=function(){Re&&(Re().catch(()=>{}),Re=null),W.clear()},Xt=function(){qt||(Ae("subscribe-impl-presets",{id:Qc}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),qt=()=>Ae("unsubscribe-impl-presets",{id:Qc}))},Bt=function(f){if(!f)return"Unknown";let u=f.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"};var d=Fe,_=Ee,m=T,h=Q,E=Z,k=Le,M=Qe,N=kt,A=yt,$=at,P=z,I=X,S=ne,B=_e,V=Me,se=tt,ye=Ne,te=rt,de=ft,ke=xt,Ue=Xt,Ie=Bt;let He=document.getElementById("header-loading"),Ye=di(He),Ve=ql(e),ve=Hc(),Ae=Ye.wrapSend((f,u)=>ve.send(f,u)),be=ri(Ae),Y=ni(),H=ai(),xe=oi(),ae=Ua(),ie=si(),W=qa(),U=Ba(),ge=ja();ve.on("impl-presets-snapshot",f=>{let u=f;u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&U.set({revision:u.revision,presets:u.presets})}),ve.on("monitor-pipeline-snapshot",f=>{let u=f;if(!(!u||!Array.isArray(u.workspaces)))try{ae.set(u.workspaces,u.workspaces_state)}catch{}}),ve.on("ui-order-snapshot",f=>{let u=f;if(u&&typeof u.revision=="number")try{ie.set({revision:u.revision,order:u.order&&typeof u.order=="object"?u.order:{}})}catch{}}),ve.on("display-policy-snapshot",f=>{let u=f;if(u&&u.policy&&typeof u.policy=="object")try{W.set(u.policy)}catch{}}),ve.on("session-log-snapshot",f=>{let u=f;if(u&&typeof u.attempt_id=="string")try{ge.set(u.attempt_id,Array.isArray(u.lines)?u.lines:[],typeof u.last_event_at=="number"?u.last_event_at:null)}catch{}}),ve.on("session-log-append",f=>{let u=f;if(u&&typeof u.attempt_id=="string")try{ge.append(u.attempt_id,u.event)}catch{}}),ve.on("snapshot",f=>{let u=f,C=u&&typeof u.id=="string"?u.id:"",K=C?Y.getStore(C):null;if(K&&u&&u.type==="snapshot")try{K.applyPush(u)}catch{}}),ve.on("upsert",f=>{let u=f,C=u&&typeof u.id=="string"?u.id:"",K=C?Y.getStore(C):null;if(K&&u&&u.type==="upsert")try{K.applyPush(u)}catch{}}),ve.on("delete",f=>{let u=f,C=u&&typeof u.id=="string"?u.id:"",K=C?Y.getStore(C):null;if(K&&u&&u.type==="delete")try{K.applyPush(u)}catch{}});let Pe=null,O=null,j=null,R=null,ee=()=>{},J=new Promise(f=>{ee=()=>f(void 0)}),fe=!1,ue=!1;async function F(f){let u=Ee(f);if(u===O||u===j)return;j=u;let C=`detail:${f}`,K={type:"issue-detail",params:{id:f}};try{Y.register(C,K)}catch(he){t("register detail store failed: %o",he)}try{let he=await be.subscribeList(C,K);if(x.getState().selected_id!==f||Ee(f)!==u){await he().catch(()=>{});return}Pe&&await Pe().catch(()=>{}),Pe=he,O=u}catch(he){t("detail subscribe failed: %o",he),Fe(he,"issue details")}finally{j===u&&(j=null)}}let re=new Map,w=new Set,D={board:0,worker:0},De=!1,qe=It;try{let f=window.localStorage.getItem(Jc);Pt(f)&&(qe=f)}catch{}let Te=It;try{let f=window.localStorage.getItem(U_);Pt(f)&&(Te=f)}catch{}async function ct(f){if(!Pt(f)||f===qe)return;qe=f;try{window.localStorage.setItem(Jc,f)}catch{}let u=re.get(wr);if(!u)return;re.delete(wr),await u().catch(()=>{});let C=Qe();try{Y.register(wr,C)}catch(K){t("register %s store failed: %o",wr,K)}try{let K=await be.subscribeList(wr,C);re.set(wr,K)}catch(K){t("re-subscribe %s failed: %o",wr,K),Fe(K,"board")}}async function $t(f){if(!Pt(f)||f===Te)return;Te=f;let u=ot.get(vr);if(!u)return;ot.delete(vr),await u().catch(()=>{});let C=kt();try{Y.register(vr,C)}catch(K){t("register %s store failed: %o",vr,K)}try{let K=await be.subscribeList(vr,C);ot.set(vr,K)}catch(K){t("re-subscribe %s failed: %o",vr,K),Fe(K,"worker")}}let ot=new Map,mt=null,Se=null,Je=null,Re=null,qt=null;async function ur(){Re=null,W.clear(),qt=null,U.clear(),mt=null,Se=null,re.clear(),ot.clear(),D.board+=1,D.worker+=1,Xt();let f=x.getState().workspace.current?.path;if(f)try{await ve.send("set-workspace",{path:f})}catch(C){t("workspace restore after reconnect failed: %o",C);return}ft();let u=x.getState();yt(u.view==="board"),z(u.view==="worker"),Me(u.view==="monitor"),ne(u.view==="board"||u.view==="worker"||!!u.selected_id)}async function gt(){t("clearing all subscriptions for workspace switch"),at(),X(),_e(),H.clear(),rt(),Ne(),xt(),ft(),T();let f=x.getState();if(f.selected_id)try{Y.unregister(`detail:${f.selected_id}`)}catch{}let u=x.getState();yt(u.view==="board"),z(u.view==="worker"),Me(u.view==="monitor"),ne(u.view==="board"||u.view==="worker"||!!u.selected_id),u.selected_id&&Q(u.selected_id)}async function vt(f){t("requesting workspace switch to %s",f),ue=!0;try{let u=await ve.send("set-workspace",{path:f});t("workspace switch result: %o",u),u&&u.workspace&&(x.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),u.changed&&(await gt(),le("Switched to "+Bt(f),"success",2e3)))}catch(u){throw t("workspace switch failed: %o",u),le("Failed to switch workspace","error",3e3),u}finally{ue=!1}}async function pr(f){t("requesting workspace git pull for %s",f);try{let u=await ve.send("git-pull-workspace",{});t("workspace git pull result: %o",u);let C=u?.status;if(C==="up_to_date"){le("Already up to date","success",2e3);return}if(C==="stash_pop_conflict"){le("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}le("Git pulled "+Bt(f),"success",2e3)}catch(u){t("workspace git pull failed: %o",u);let C=u?.code,K=u?.message;if(C==="rebase_conflict"){le("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(C==="rebase_conflict_abort_failed"){le("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(C==="busy"){le("Git pull skipped: another operation is running","warning",3e3);return}let he=K?`: ${K}`:"";throw le(`Git pull failed${he}`,"error",3e3),u}}async function tr(f,u){t("setting workspace visibility %s \u2192 %s",f,String(u));try{await ve.send("set-workspace-visibility",{path:f,visible:u}),await Ut()}catch(C){t("workspace visibility update failed: %o",C),le("Failed to update project visibility","error",3e3)}}async function Ut(){try{let f=await ve.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let u=f.workspaces.map(Oe=>({path:Oe.path,database:Oe.database,pid:Oe.pid,version:Oe.version})),C=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,K=Array.isArray(f.hidden)?f.hidden.filter(Oe=>typeof Oe=="string"):[];x.setState({workspace:{current:C,available:u,hidden:K}});let he=window.localStorage.getItem("beads-ui.workspace");he&&(!u.some($e=>$e.path===he)||K.includes(he)?window.localStorage.removeItem("beads-ui.workspace"):C&&he!==C.path&&(t("restoring saved workspace preference: %s",he),await vt(he)))}}catch(f){t("failed to load workspaces: %o",f)}}ve.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(x.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),Ut(),gt())});let p=!1;if(typeof ve.onConnection=="function"){let f=u=>{t("ws state %s",u),u==="reconnecting"||u==="closed"?(p=!0,le("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&p&&(p=!1,le("Reconnected","success",2200),B_(x,(C,K)=>{t(`${C}: %o`,K)}),ur())};ve.onConnection(f)}let y="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(y=f)}catch(f){t("view parse error: %o",f)}let x=ci({config:q_(),view:y});ve.on("worker-queue-snapshot",f=>{let u=f;if(!u||!u.queue)return;let C=x.getState().workspace.current?.path;if(typeof C=="string"&&C.length>0&&u.root_dir!==C){t("dropping worker-queue snapshot for %s",String(u.root_dir));return}try{H.set(u.queue)}catch{}}),ve.on("worker-parallel-analysis-snapshot",f=>{let u=f;if(!u)return;let C=x.getState().workspace.current?.path;if(!(typeof C=="string"&&C.length>0&&typeof u.root_dir=="string"&&u.root_dir!==C))try{xe.set({settings:u.settings,job:u.job??null,last_good:u.last_good??null})}catch{}});let oe=ii(x);oe.start();let me=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),Ge=async(f,u)=>{try{return await Ae(f,u)}catch(C){if(me.has(f))throw C;return[]}};n&&fc(n,x,oe);let G=document.getElementById("workspace-picker");G&&jc(G,x,vt,pr,tr);let b=hc(e,(f,u)=>Ae(f,u));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>b.open())}catch{}let q=wc(e,{policyStore:W,queueStore:H,implPresetStore:U,transport:(f,u)=>Ae(f,u),onOpenChange:f=>{De=f,Le()},labelOptions:()=>{let f=new Set;for(let[u]of Jo)for(let C of Y.snapshotFor(u)||[]){let K=C.labels;if(Array.isArray(K))for(let he of K)typeof he=="string"&&he.length>0&&f.add(he)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>q.open()))}catch{}let pe=vi(o,{gotoIssue:f=>oe.gotoIssue(f),issueStores:Y,transport:Ge,workerQueueStore:H,uiOrderStore:ie,displayPolicyStore:W,closedRange:qe,onClosedRangeChange:f=>{ct(f)},onNewIssue:()=>b.open()}),Be=Zo(a,{transport:Ge,issueStores:Y,queueStore:H,analysisStore:xe,sessionLogStore:ge,uiOrderStore:ie,gotoIssue:f=>x.setState({selected_id:f}),getWorkspacePath:()=>x.getState().workspace.current?.path,doneRange:Te,onDoneRangeChange:f=>{$t(f)}}),Ke=pc(l,{transport:Ge,pipelineStore:ae,execPresetStore:U,gotoIssue:f=>oe.gotoIssue(f),getWorkspacePath:()=>x.getState().workspace.current?.path,switchWorkspace:f=>vt(f)}),Ze=Fl(c,{issueStores:Y,transport:Ge,queueStore:H,execPresetStore:U,sessionLogStore:ge,getWorkspacePath:()=>x.getState().workspace.current?.path,onNavigate:f=>{x.getState().view==="worker"?x.setState({selected_id:f}):oe.gotoIssue(f)},onClose:()=>{let f=x.getState();x.setState({selected_id:null});try{oe.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{q.open("session")}}),we=x.getState().selected_id;we&&(c.hidden=!1,Ze.load(we),Q(we)),x.subscribe(f=>{let u=f.selected_id;u?(c.hidden=!1,Ze.load(u),ue||Q(u)):(Ze.clear(),c.hidden=!0,T())});let v=f=>{o.hidden=f.view!=="board",a.hidden=f.view!=="worker",l.hidden=f.view!=="monitor",yt(f.view==="board"),z(f.view==="worker"),Me(f.view==="monitor"),ne(f.view==="board"||f.view==="worker"||De||!!f.selected_id),!f.selected_id&&f.view==="board"&&pe.load(),f.view==="worker"&&Be.load(),f.view==="monitor"?Ke.load():Ke.pause(),window.localStorage.setItem("beads-ui.view",f.view)};x.subscribe(v),v(x.getState()),Ne(),ft(),Xt(),Ut().finally(()=>{fe=!0,ee()}),window.addEventListener("keydown",f=>{let u=f.ctrlKey||f.metaKey,C=String(f.key||"").toLowerCase(),K=f.target,he=K&&K.tagName?String(K.tagName).toLowerCase():"",Oe=he==="input"||he==="textarea"||he==="select"||K&&typeof K.isContentEditable=="boolean"&&K.isContentEditable;u&&C==="n"&&(Oe||(f.preventDefault(),b.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&j_(t)});export{j_ as bootstrap,q_ as readBootstrapConfig,B_ as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
