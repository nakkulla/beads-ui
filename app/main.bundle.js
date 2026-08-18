var yd=Object.create;var zs=Object.defineProperty;var vd=Object.getOwnPropertyDescriptor;var wd=Object.getOwnPropertyNames;var kd=Object.getPrototypeOf,$d=Object.prototype.hasOwnProperty;var xd=(e,t,r)=>t in e?zs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Hs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Sd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of wd(t))!$d.call(e,s)&&s!==r&&zs(e,s,{get:()=>t[s],enumerable:!(n=vd(t,s))||n.enumerable});return e};var Ad=(e,t,r)=>(r=e!=null?yd(kd(e)):{},Sd(t||!e||!e.__esModule?zs(r,"default",{value:e,enumerable:!0}):r,e));var rt=(e,t,r)=>xd(e,typeof t!="symbol"?t+"":t,r);var za=Hs((J_,Wa)=>{var qr=1e3,Br=qr*60,Ur=Br*60,Tr=Ur*24,Cd=Tr*7,Rd=Tr*365.25;Wa.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Id(e);if(r==="number"&&isFinite(e))return t.long?Od(e):Ld(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Id(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Rd;case"weeks":case"week":case"w":return r*Cd;case"days":case"day":case"d":return r*Tr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Ur;case"minutes":case"minute":case"mins":case"min":case"m":return r*Br;case"seconds":case"second":case"secs":case"sec":case"s":return r*qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ld(e){var t=Math.abs(e);return t>=Tr?Math.round(e/Tr)+"d":t>=Ur?Math.round(e/Ur)+"h":t>=Br?Math.round(e/Br)+"m":t>=qr?Math.round(e/qr)+"s":e+"ms"}function Od(e){var t=Math.abs(e);return t>=Tr?Bn(e,t,Tr,"day"):t>=Ur?Bn(e,t,Ur,"hour"):t>=Br?Bn(e,t,Br,"minute"):t>=qr?Bn(e,t,qr,"second"):e+" ms"}function Bn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Ga=Hs((em,Ha)=>{function Md(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=za(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let m=0;for(let h=0;h<_.length;h++)m=(m<<5)-m+_.charCodeAt(h),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(_){let m,h=null,T,k;function D(...F){if(!D.enabled)return;let E=D,$=Number(new Date),O=$-(m||$);E.diff=O,E.prev=m,E.curr=$,m=$,F[0]=r.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let R=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(B,V)=>{if(B==="%%")return"%";R++;let re=r.formatters[V];if(typeof re=="function"){let ve=F[R];B=re.call(E,ve),F.splice(R,1),R--}return B}),r.formatArgs.call(E,F),(E.log||r.log).apply(E,F)}return D.namespace=_,D.useColors=r.useColors(),D.color=r.selectColor(_),D.extend=n,D.destroy=r.destroy,Object.defineProperty(D,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(T!==r.namespaces&&(T=r.namespaces,k=r.enabled(_)),k),set:F=>{h=F}}),typeof r.init=="function"&&r.init(D),D}function n(_,m){let h=r(this.namespace+(typeof m>"u"?":":m)+_);return h.log=this.log,h}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let m=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(_,m){let h=0,T=0,k=-1,D=0;for(;h<_.length;)if(T<m.length&&(m[T]===_[h]||m[T]==="*"))m[T]==="*"?(k=T,D=h,T++):(h++,T++);else if(k!==-1)T=k+1,D++,h=D;else return!1;for(;T<m.length&&m[T]==="*";)T++;return T===m.length}function a(){let _=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),_}function l(_){for(let m of r.skips)if(o(_,m))return!1;for(let m of r.names)if(o(_,m))return!0;return!1}function c(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ha.exports=Md});var Va=Hs((Ct,Un)=>{Ct.formatArgs=Pd;Ct.save=Nd;Ct.load=Fd;Ct.useColors=Dd;Ct.storage=qd();Ct.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ct.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Dd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Pd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Un.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Ct.log=console.debug||console.log||(()=>{});function Nd(e){try{e?Ct.storage.setItem("debug",e):Ct.storage.removeItem("debug")}catch{}}function Fd(){let e;try{e=Ct.storage.getItem("debug")||Ct.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function qd(){try{return localStorage}catch{}}Un.exports=Ga()(Ct);var{formatters:Bd}=Un.exports;Bd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jr=globalThis,Mn=Jr.trustedTypes,Ta=Mn?Mn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Vs="$lit$",rr=`lit$${Math.random().toFixed(9).slice(2)}$`,Ys="?"+rr,Ed=`<${Ys}>`,xr=document,en=()=>xr.createComment(""),tn=e=>e===null||typeof e!="object"&&typeof e!="function",Ks=Array.isArray,Ma=e=>Ks(e)||typeof e?.[Symbol.iterator]=="function",Gs=`[ 	
\f\r]`,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ca=/-->/g,Ra=/>/g,kr=RegExp(`>|${Gs}(?:([^\\s"'>=/]+)(${Gs}*=${Gs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ia=/'/g,La=/"/g,Da=/^(?:script|style|textarea|title)$/i,Zs=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Zs(1),fr=Zs(2),G_=Zs(3),Ot=Symbol.for("lit-noChange"),lt=Symbol.for("lit-nothing"),Oa=new WeakMap,$r=xr.createTreeWalker(xr,129);function Pa(e,t){if(!Ks(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ta!==void 0?Ta.createHTML(t):t}var Na=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Qr;for(let l=0;l<r;l++){let c=e[l],d,_,m=-1,h=0;for(;h<c.length&&(a.lastIndex=h,_=a.exec(c),_!==null);)h=a.lastIndex,a===Qr?_[1]==="!--"?a=Ca:_[1]!==void 0?a=Ra:_[2]!==void 0?(Da.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=kr):_[3]!==void 0&&(a=kr):a===kr?_[0]===">"?(a=s??Qr,m=-1):_[1]===void 0?m=-2:(m=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?kr:_[3]==='"'?La:Ia):a===La||a===Ia?a=kr:a===Ca||a===Ra?a=Qr:(a=kr,s=void 0);let T=a===kr&&e[l+1].startsWith("/>")?" ":"";o+=a===Qr?c+Ed:m>=0?(n.push(d),c.slice(0,m)+Vs+c.slice(m)+rr+T):c+rr+(m===-2?l:T)}return[Pa(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},rn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[d,_]=Na(t,r);if(this.el=e.createElement(d,n),$r.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=$r.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Vs)){let h=_[a++],T=s.getAttribute(m).split(rr),k=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:k[2],strings:T,ctor:k[1]==="."?Pn:k[1]==="?"?Nn:k[1]==="@"?Fn:Ar}),s.removeAttribute(m)}else m.startsWith(rr)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(Da.test(s.tagName)){let m=s.textContent.split(rr),h=m.length-1;if(h>0){s.textContent=Mn?Mn.emptyScript:"";for(let T=0;T<h;T++)s.append(m[T],en()),$r.nextNode(),c.push({type:2,index:++o});s.append(m[h],en())}}}else if(s.nodeType===8)if(s.data===Ys)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(rr,m+1))!==-1;)c.push({type:7,index:o}),m+=rr.length-1}o++}}static createElement(t,r){let n=xr.createElement("template");return n.innerHTML=t,n}};function Sr(e,t,r=e,n){if(t===Ot)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=tn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Sr(e,s._$AS(e,t.values),s,n)),t}var Dn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??xr).importNode(r,!0);$r.currentNode=s;let o=$r.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new Fr(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new qn(o,this,t)),this._$AV.push(d),c=n[++l]}a!==c?.index&&(o=$r.nextNode(),a++)}return $r.currentNode=xr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Fr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=lt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Sr(this,t,r),tn(t)?t===lt||t==null||t===""?(this._$AH!==lt&&this._$AR(),this._$AH=lt):t!==this._$AH&&t!==Ot&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ma(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==lt&&tn(this._$AH)?this._$AA.nextSibling.data=t:this.T(xr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=rn.createElement(Pa(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Dn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Oa.get(t.strings);return r===void 0&&Oa.set(t.strings,r=new rn(t)),r}k(t){Ks(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(en()),this.O(en()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=lt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=lt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Sr(this,t,r,0),a=!tn(t)||t!==this._$AH&&t!==Ot,a&&(this._$AH=t);else{let l=t,c,d;for(t=o[0],c=0;c<o.length-1;c++)d=Sr(this,l[n+c],r,c),d===Ot&&(d=this._$AH[c]),a||(a=!tn(d)||d!==this._$AH[c]),d===lt?t=lt:t!==lt&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(t)}j(t){t===lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Pn=class extends Ar{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===lt?void 0:t}},Nn=class extends Ar{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==lt)}},Fn=class extends Ar{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Sr(this,t,r,0)??lt)===Ot)return;let n=this._$AH,s=t===lt&&n!==lt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==lt&&(n===lt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},qn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Sr(this,t)}},Fa={M:Vs,P:rr,A:Ys,C:1,L:Na,R:Dn,D:Ma,V:Sr,I:Fr,H:Ar,N:Nn,U:Fn,B:Pn,F:qn},Td=Jr.litHtmlPolyfillSupport;Td?.(rn,Fr),(Jr.litHtmlVersions??(Jr.litHtmlVersions=[])).push("3.3.1");var We=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Fr(t.insertBefore(en(),o),o,void 0,r??{})}return s._$AI(e),s};var It="today",Qt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Mt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Er(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function qa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ba(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ua(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ja(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Ya=Ad(Va(),1);function it(e){return(0,Ya.default)(`beads-ui:${e}`)}function Wt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Cr(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Xa(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function Qa(e,t){let r=Wt(e.updated_at),n=Wt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ja(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Wt(e.created_at),o=Wt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ei(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Ud=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ka(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Za(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Ud.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ti(e,t){let r=Ka(e),n=Ka(t);if(r!==n)return r<n?-1:1;let s=Za(e),o=Za(t);if(s!==o)return s<o?-1:1;let a=Wt(e&&e.created_at),l=Wt(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,d=t&&t.id;return c===d?0:String(c)<String(d)?-1:1}var Xs=2**20;function jr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Wt(e&&e.created_at)}function jn(e){return(t,r)=>{let n=jr(t,e),s=jr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Qs(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:jr(l,r)-Xs};if(!l)return{rank:jr(a,r)+Xs};let c=jr(a,r),d=jr(l,r),_=(c+d)/2;return c<_&&_<d?{rank:_}:{renormalize:n.map((m,h)=>({bead_id:m.id,rank:h*Xs}))}}function Js(e,t={}){let r=it(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Cr;function d(){for(let h of Array.from(a))try{h()}catch{}}function _(){s=Array.from(n.values()).sort(c)}function m(h){if(l||!h||h.id!==e)return;let T=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,T),!(T<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(T<=o)return;n.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let D of k)D&&typeof D.id=="string"&&D.id.length>0&&n.set(D.id,D);_(),o=T,d();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let D=n.get(k.id);if(!D)n.set(k.id,k);else{let F=Number.isFinite(D.updated_at)?D.updated_at:0,E=Number.isFinite(k.updated_at)?k.updated_at:0;if(F<=E){for(let $ of Object.keys(D))$ in k||delete D[$];for(let[$,O]of Object.entries(k))D[$]=O}}_()}o=T,d()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(n.delete(k),_()),o=T,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Wn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ri(e){let t=it("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let _=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let T of Array.from(d)){let k=r.get(T);if(!k)continue;let D=k.itemsById;for(let F of _)typeof F=="string"&&F.length>0&&D.set(F,!0);for(let F of m)typeof F=="string"&&F.length>0&&D.set(F,!0);for(let F of h)typeof F=="string"&&F.length>0&&D.delete(F)}}async function o(l,c){let d=Wn(c);if(t("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==d){let h=n.get(m.key);h&&(h.delete(l),h.size===0&&n.delete(m.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(m){let h=r.get(l)||null;if(h){let T=n.get(h.key);T&&(T.delete(l),T.size===0&&n.delete(h.key))}throw r.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let h=n.get(m.key);h&&(h.delete(l),h.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Wn,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let d=r.get(l);return d?d.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),d={};if(!c)return d;for(let _ of c.itemsById.keys())d[_]=!0;return d}}}}function ni(){let e=it("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,d,_){let m=d?Wn(d):"",h=r.get(c)||"",T=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,h),T&&h&&m&&h!==m){let k=t.get(c);if(k)try{k.dispose()}catch{}let D=s.get(c);if(D){try{D()}catch{}s.delete(c)}let F=Js(c,_);t.set(c,F);let E=F.subscribe(()=>o());s.set(c,E)}else if(!T){let k=Js(c,_);t.set(c,k);let D=k.subscribe(()=>o());s.set(c,D)}return r.set(c,m),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let d=t.get(c);d&&(d.dispose(),t.delete(c));let _=s.get(c);if(_){try{_()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let d=t.get(c);return d?d.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function si(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function oi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ai(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function eo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function jd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Wd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ii(e){let t=it("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):jd(n),a=Wd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=eo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?eo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var zd=Object.freeze({workspace_config:{default_workspace:null}});function li(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:zd.workspace_config.default_workspace}}}function ci(e={}){let t=it("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:li(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?li(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function di(e){let t=it("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function c(d){return async(m,h)=>{let T=s++,k=Date.now();n.set(T,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",T,m,r+1),a();let D=!1,F=()=>{D||(D=!0,n.delete(T),l())},E=setTimeout(()=>{D||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,m,Date.now()-k),F())},3e4);try{let $=await d(m,h),O=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",T,m,O),$}catch($){let O=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,m,O,$),$}finally{clearTimeout(E),F()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,m])=>({id:_,type:m.type,elapsed_ms:d-m.start_ts}))}}}function ae(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function zn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(ei),c;switch(l){case"created_desc":return c.sort(Cr),c;case"created_asc":return c.sort(Xa),c;case"updated_desc":return c.sort(Qa),c;case"priority":return c.sort(Ja),c;case"manual":default:{let d=r();return d?c.sort(jn(d)):c.sort(Cr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Rr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ht(e){let t=Rr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Lt(e,t){let r=Rr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Hn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Rr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Gn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let d of l)c[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(Qs(l,c,d.order),a);s(d,_);let m=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(h);let T=n(Qs(l,c,h.order),a);s(h,T);let k=await t("ui-order-set",{expected_revision:h.revision,entries:T});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Vn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function to(e,t){return!t||typeof e!="string"||e.length===0||Vn(t.visible_labels).includes(e)?!0:Vn(t.hidden_labels).includes(e)?!1:!Vn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Yn(e,t){return Vn(e).filter(r=>to(r,t))}function _r(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Hd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},pi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ui={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Gd={review:"\u2713",skip:"\u2298"},mr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Vd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function fi(e){let t=e&&e.fill||"none";return t==="none"?mr.none:e&&e.stale===!0?mr.stale:t==="dim"?mr.dim:e&&e.glyph==="review"?mr.review:e&&e.glyph==="skip"?mr.skip:mr.done}function Yd(e){if(!e||e.fill==="none"||!e.approval_state)return fi(e);let t=[];return e.glyph==="review"?t.push(mr.review):e.glyph==="skip"&&t.push(mr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Kd(e,t,r){let n=Hd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Gd[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
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
  `}var iu=200,lu={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},cu=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),bi="beads-ui.board.sort",yi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function du(){try{let e=window.localStorage.getItem(bi);if(e&&yi.has(e))return e}catch{}return"created_desc"}function vi(e,t){let r=it("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,d=t.onClosedRangeChange,_=t.onNewIssue,m=t.closedRange||It,h=s?zn(s,a):null,T=Gn({transport:o,uiOrderStore:a}),k=[],D=[],F=[],E=[],$=[],O=[],R=!1,A=0,B=du(),V=new Map,re=new Map,ve=new Map,ee=new Set,de={search:"",priority:"",type:"",labels:[]},$e=!1,Be=null;function Le(W){return String(W.status||"open")==="open"}function ze(W){let X=String(W.status||"open");return X==="open"||X==="blocked"}function Ve(W){let X=de.search.trim().toLowerCase(),te=de.priority,_e=de.type,Te=de.labels;return W.filter(De=>{if(X){let et=String(De.id||"").toLowerCase(),Qe=String(De.title||"").toLowerCase();if(!et.includes(X)&&!Qe.includes(X))return!1}if(te!==""&&String(De.priority)!==te||_e!==""&&String(De.issue_type||"")!==_e)return!1;if(Te.length>0){let et=Array.isArray(De.labels)?De.labels:[];if(!Te.some(Qe=>et.includes(Qe)))return!1}return!0})}function Ge(){let W=new Set;for(let X of[k,D,F,E,$,O])for(let te of X){let _e=Array.isArray(te.labels)?te.labels:[];for(let Te of _e)typeof Te=="string"&&Te.length>0&&W.add(Te)}return Array.from(W).sort()}function Ne(){return de.search.trim()!==""||de.priority!==""||de.type!==""||de.labels.length>0}function we(){try{if(h){let W=h.selectBoardColumn("tab:board:in-progress","in_progress",B),X=h.selectBoardColumn("tab:board:blocked","blocked",B).filter(ze),te=new Set(W.map(Ie=>Ie.id)),_e=h.selectBoardColumn("tab:board:ready","ready",B).filter(Ie=>Le(Ie)&&!te.has(Ie.id)),Te=h.selectBoardColumn("tab:board:resolved","resolved",B),De=h.selectBoardColumn("tab:board:deferred","deferred",B),et=h.selectBoardColumn("tab:board:closed","closed").slice(0,iu),Qe=[...X,..._e,...W,...Te,...et];Ce(Qe);let Pe=new Set;for(let Ie of Qe)Ie&&Ie.id&&!no(Ie)&&Pe.add(Ie.id);let tt=!Ne();k=tt?nn(X,Pe):X,D=tt?nn(_e,Pe):_e,F=tt?nn(W,Pe):W,E=tt?nn(Te,Pe):Te,$=De,A=De.length,O=tt?nn(et,Pe):et,V=new Map;for(let Ie of k)V.set(Ie.id,"open");for(let Ie of D)V.set(Ie.id,"open");for(let Ie of F)V.set(Ie.id,"in_progress");for(let Ie of E)V.set(Ie.id,"resolved");for(let Ie of $)V.set(Ie.id,"deferred");for(let Ie of O)V.set(Ie.id,"closed");re=new Map;for(let Ie of k)re.set(Ie.id,"blocked-col");for(let Ie of D)re.set(Ie.id,"ready-col");for(let Ie of F)re.set(Ie.id,"in-progress-col");for(let Ie of E)re.set(Ie.id,"resolved-col");for(let Ie of O)re.set(Ie.id,"closed-col")}Oe()}catch{k=[],D=[],F=[],E=[],$=[],O=[],ve=new Map,Oe()}}function Ce(W){let X=new Map;for(let _e of W)_e&&_e.id&&!X.has(_e.id)&&X.set(_e.id,_e);let te=new Map;for(let _e of X.values()){let Te=no(_e);if(!Te)continue;let De=te.get(Te);De||(De=[],te.set(Te,De)),De.push({id:_e.id,title:_e.title,status:_e.status,metadata:_e.metadata,workflow:_e.workflow,created_at:_e.created_at,updated_at:_e.updated_at})}ve=te}function ye(W){let X=ve.get(W)||[],te=0;for(let Te of X)(Te.status==="resolved"||Te.status==="closed")&&(te+=1);let _e=Hn(X);return{total:X.length,count:te,current:_e,children:X}}function K(W){return!ee.has(W)}function z(W,X){W.preventDefault(),W.stopPropagation(),ee.has(X)?ee.delete(X):ee.add(X),Oe()}function Ee(W,X){W.preventDefault(),W.stopPropagation(),n(X)}function se(W,X){W.preventDefault(),W.stopPropagation(),n(X)}function ie(W,X){Be||n(X)}function j(W,X){W.preventDefault(),W.stopPropagation(),uu(X).then(te=>{te&&ae("\uBCF5\uC0AC\uB428","success",1200)})}function U(W,X){Be=X,W.dataTransfer&&(W.dataTransfer.setData("text/plain",X),W.dataTransfer.effectAllowed="move"),W.target.classList.add("board-card--dragging")}function ge(W){W.target.classList.remove("board-card--dragging"),yt(),setTimeout(()=>{Be=null},0)}function xe(W){let X=String(W.target.value||"");!X||X===m||(m=X,d&&d(X),Oe())}function P(){return l?l.get():null}function H(W){let X=c?c.get():null,te=X?X.cleanup_failed:null;if(!te||typeof te!="object"||Array.isArray(te))return null;let _e=te[W];return!_e||typeof _e!="object"||Array.isArray(_e)?null:_e}let I={onCardClick:ie,onCopyId:j,onDragStart:U,onDragEnd:ge,onClosedRangeChange:xe,rollupFor:ye,isExpanded:K,onRollupToggle:z,onChildClick:Ee,onFromChipClick:se,cleanupFailureFor:H,get policy(){return P()}};function Q(W,X){Be||(w(),n(X))}function J(W,X){W.preventDefault(),W.stopPropagation(),w(),n(X)}let fe={...I,onCardClick:Q,onChildClick:J,onFromChipClick:J,get policy(){return P()}};function ce(W){let X=W.target,te=e.querySelector(".board-filter__labels");X&&te&&te.contains(X)||Z()}function S(W){W.key==="Escape"&&Z()}function N(){$e||($e=!0,document.addEventListener("mousedown",ce),document.addEventListener("keydown",S),Oe())}function Z(){$e&&($e=!1,document.removeEventListener("mousedown",ce),document.removeEventListener("keydown",S),Oe())}function oe(W){W.key==="Escape"&&w()}function Se(){R||(R=!0,document.addEventListener("keydown",oe),Oe())}function w(){R&&(R=!1,document.removeEventListener("keydown",oe),Oe())}let M={onClose:w,onOverlayClick(W){W.target===W.currentTarget&&w()}},ue={onSearchInput(W){de.search=String(W.target.value||""),we()},onPriorityChange(W){de.priority=String(W.target.value||""),we()},onTypeChange(W){de.type=String(W.target.value||""),we()},onSortChange(W){let X=String(W.target.value||"");if(!(!yi.has(X)||X===B)){B=X;try{window.localStorage.setItem(bi,X)}catch{}we()}},onDeferredToggle(){R?w():Se()},onLabelMenuToggle(){$e?Z():N()},onLabelToggle(W){let X=de.labels.indexOf(W);X===-1?de.labels.push(W):de.labels.splice(X,1),we()},onLabelClear(){de.labels.length!==0&&(de.labels=[],we())},onNewIssue(){_&&_()}};function Fe(){return i`
      <div class="board-view">
        ${hi(de,ue,{sort_mode:B,deferred_popup_open:R,deferred_count:A,label_options:Ge(),label_menu_open:$e})}
        <div class="board-root">
          ${Wr({title:"Blocked",id:"blocked-col",items:Ve(k)},I)}
          ${Wr({title:"Ready",id:"ready-col",items:Ve(D)},I)}
          ${Wr({title:"In progress",id:"in-progress-col",items:Ve(F)},I)}
          ${Wr({title:"Resolved",id:"resolved-col",items:Ve(E)},I)}
          ${Wr({title:"Closed",id:"closed-col",items:Ve(O),is_closed:!0,closed_range:m},I)}
        </div>
        ${R?gi({items:Ve($),count:A},fe,M):""}
      </div>
    `}function Oe(){We(Fe(),e),he()}function he(){try{let W=e.querySelector("#deferred-popup");W&&!W.open&&(typeof W.showModal=="function"?W.showModal():W.setAttribute("open",""));let X=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let te of X)Array.from(te.querySelectorAll(".board-card")).forEach((Te,De)=>{Te.tabIndex=De===0?0:-1})}catch{}}async function Ye(W,X){if(!o){ae("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:W,status:X}),ae("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(te){r("update-status failed: %o",te),ae("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function st(W){switch(W){case"blocked-col":return k;case"ready-col":return D;case"in-progress-col":return F;case"resolved-col":return E;default:return[]}}function kt(W,X,te){if(!o||!a)return;let _e=st(W),Te=_e.find(tt=>tt.id===X);if(!Te)return;let De=_e.filter(tt=>tt.id!==X),et=te.closest?te.closest(".board-card"):null,Qe=De.length;if(et){let tt=et.getAttribute("data-issue-id");if(tt===X)return;let Ie=De.findIndex(ft=>ft.id===tt);Ie>=0&&(Qe=Ie)}let Pe=De.slice();Pe.splice(Qe,0,Te),T.applyReorder(X,Pe,Qe)}function yt(){for(let W of Array.from(e.querySelectorAll(".board-column--drag-over")))W.classList.remove("board-column--drag-over")}let ct=null;e.addEventListener("dragover",W=>{W.preventDefault(),W.dataTransfer&&(W.dataTransfer.dropEffect="move");let te=W.target.closest(".board-column");te&&te!==ct&&(ct&&ct.classList.remove("board-column--drag-over"),te.classList.add("board-column--drag-over"),ct=te)}),e.addEventListener("dragleave",W=>{let X=W.relatedTarget;(!X||!e.contains(X))&&ct&&(ct.classList.remove("board-column--drag-over"),ct=null)}),e.addEventListener("drop",W=>{W.preventDefault(),ct&&(ct.classList.remove("board-column--drag-over"),ct=null);let X=W.target,te=X.closest(".board-column");if(!te)return;let _e=W.dataTransfer?.getData("text/plain")||"";if(!_e)return;let Te=te.id,De=re.get(_e);if(De&&De===Te){if(cu.has(Te)){if(B!=="manual"){ae("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}kt(Te,_e,X)}return}let et=lu[Te];if(!et){ae("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(_e)!==et&&Ye(_e,et)}),e.addEventListener("keydown",W=>{let X=W.target;if(!(X instanceof HTMLElement))return;let te=String(X.tagName||"").toLowerCase();if(te==="input"||te==="textarea"||te==="select"||te==="button"||te==="a"||X.isContentEditable===!0)return;let _e=X.closest(".board-card");if(!_e)return;let Te=String(W.key||"");if(Te==="Enter"||Te===" "){W.preventDefault();let Pe=_e.getAttribute("data-issue-id");Pe&&n(Pe);return}if(Te!=="ArrowUp"&&Te!=="ArrowDown"&&Te!=="ArrowLeft"&&Te!=="ArrowRight")return;W.preventDefault();let De=_e.closest(".board-column");if(!De)return;let et=Array.from(De.querySelectorAll(".board-card")),Qe=et.indexOf(_e);if(Te==="ArrowDown"&&Qe<et.length-1){$t(_e,et[Qe+1]);return}if(Te==="ArrowUp"&&Qe>0){$t(_e,et[Qe-1]);return}if(Te==="ArrowLeft"||Te==="ArrowRight"){let Pe=Array.from(e.querySelectorAll(".board-column")),tt=Pe.indexOf(De),Ie=Te==="ArrowRight"?1:-1,ft=tt+Ie;for(;ft>=0&&ft<Pe.length;){let xt=Pe[ft].querySelector(".board-card");if(xt){$t(_e,xt);return}ft+=Ie}}});function $t(W,X){try{W.tabIndex=-1,X.tabIndex=0,X.focus()}catch{}}let at=null;h&&h.subscribe&&(at=h.subscribe(()=>{try{we()}catch{}}));let ot=null;l&&l.subscribe&&(ot=l.subscribe(()=>{try{we()}catch{}}));let mt=null;return c&&c.subscribe&&(mt=c.subscribe(()=>{Oe()})),{async load(){r("load"),we()},clear(){Z(),w(),at&&(at(),at=null),ot&&(ot(),ot=null),mt&&(mt(),mt=null),e.replaceChildren(),k=[],D=[],F=[],E=[],$=[],O=[],V=new Map,re=new Map}}}function no(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function nn(e,t){return e.filter(r=>{let n=no(r);return!(n&&t.has(n))})}async function uu(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Ir(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Jt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function gr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function pu(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Jt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Jt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let d=_=>{typeof r.close=="function"&&r.close(),r.remove(),c(_)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function nr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await pu(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Si="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var sr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],sn=[...sr,"reasoning_output_tokens"],fu=["implementation","review-consult"];function so(e){let t=0;for(let r of sr)t+=bt(e?.[r]);return t}function _u(e){return!e||typeof e!="object"?!1:sr.some(t=>Number.isFinite(e[t]))}function wi(e){return!e||typeof e!="object"?!1:sn.some(t=>Number.isFinite(e[t]))}function mu(e){let t={};for(let r of sn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function ki(e){let t={};for(let r of sn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function $i(e,t){return e==="codex"?bt(t.input_tokens)+bt(t.output_tokens):so(t)}function gu(e){return e==="claude"?"Claude":"Codex"}function hu(e){return`\u03C4 ${Ai(e)}`}function bu(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${bt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${bt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${bt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Si),o.join(`
`)}function wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${gu(r)} ${hu(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:bu(r,n)})}return t}function Jn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of sn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=bt(l.breakdown[c])+bt(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function oo(e){return!e||typeof e!="object"?null:Dt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function yu(e){return e==="codex"?"codex":"claude"}function hr(){return{subtotal:0,breakdown:mu(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Qn(e,t,r){e.subtotal+=t.subtotal;for(let n of sn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=bt(e.breakdown[n])+bt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function xi(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Ai(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function zr(e){return _u(e)?`\u03C4 ${Ai(so(e))}`:null}function zt(e){let t=zr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Hr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${so(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Si),r.join(`
`)}function Dt(e,t){let r={claude:hr(),codex:hr()},n={orchestrator:{claude:hr(),codex:hr()},implementation:{claude:hr(),codex:hr()},"review-consult":{claude:hr(),codex:hr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(wi(c)){let _=yu(l.runner),m=ki(c),h={provider:_,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:$i(_,m)};m.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),Qn(r[_],h,!0),Qn(n.orchestrator[_],h,!0)}let d=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let _ of d){if(!_||_.provider!=="codex"||!fu.includes(_.role)||!wi(_.usage))continue;let m=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let h=ki(_.usage),T={provider:"codex",role:_.role,attempt_id:String(l.attempt_id||""),usage:h,subtotal:$i("codex",h)};T.receipt_id=m,typeof _.model=="string"&&(T.model=_.model),typeof _.session_id=="string"?T.session_id=_.session_id:typeof _.thread_id=="string"&&(T.session_id=_.thread_id),typeof _.turn_id=="string"&&(T.turn_id=_.turn_id),typeof _.completed_at=="string"&&(T.completed_at=_.completed_at),h.replayed===!0&&(T.replayed=!0),Qn(r.codex,T,!1),Qn(n[T.role].codex,T,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let d=xi(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(d.total_cost_usd=c.outer_cost),o[l]=d}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let d of["claude","codex"]){let _=n[l][d];_.legs.length>0&&(c[d]={...xi(_,!0),legs:_.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Di,setPrototypeOf:Ei,isFrozen:vu,getPrototypeOf:wu,getOwnPropertyDescriptor:ku}=Object,{freeze:At,seal:Pt,create:fo}=Object,{apply:_o,construct:mo}=typeof Reflect<"u"&&Reflect;At||(At=function(t){return t});Pt||(Pt=function(t){return t});_o||(_o=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});mo||(mo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var es=Et(Array.prototype.forEach),$u=Et(Array.prototype.lastIndexOf),Ti=Et(Array.prototype.pop),on=Et(Array.prototype.push),xu=Et(Array.prototype.splice),rs=Et(String.prototype.toLowerCase),ao=Et(String.prototype.toString),io=Et(String.prototype.match),an=Et(String.prototype.replace),Su=Et(String.prototype.indexOf),Au=Et(String.prototype.trim),Ht=Et(Object.prototype.hasOwnProperty),St=Et(RegExp.prototype.test),ln=Eu(TypeError);function Et(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return _o(e,t,n)}}function Eu(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return mo(e,r)}}function je(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:rs;Ei&&Ei(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(vu(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Tu(e){for(let t=0;t<e.length;t++)Ht(e,t)||(e[t]=null);return e}function or(e){let t=fo(null);for(let[r,n]of Di(e))Ht(e,r)&&(Array.isArray(n)?t[r]=Tu(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=or(n):t[r]=n);return t}function cn(e,t){for(;e!==null;){let n=ku(e,t);if(n){if(n.get)return Et(n.get);if(typeof n.value=="function")return Et(n.value)}e=wu(e)}function r(){return null}return r}var Ci=At(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),lo=At(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),co=At(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Cu=At(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),uo=At(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ru=At(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ri=At(["#text"]),Ii=At(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),po=At(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Li=At(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ts=At(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Iu=Pt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Lu=Pt(/<%[\w\W]*|[\w\W]*%>/gm),Ou=Pt(/\$\{[\w\W]*/gm),Mu=Pt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Du=Pt(/^aria-[\-\w]+$/),Pi=Pt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Pu=Pt(/^(?:\w+script|data):/i),Nu=Pt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ni=Pt(/^html$/i),Fu=Pt(/^[a-z][.\w]*(-[.\w]+)+$/i),Oi=Object.freeze({__proto__:null,ARIA_ATTR:Du,ATTR_WHITESPACE:Nu,CUSTOM_ELEMENT:Fu,DATA_ATTR:Mu,DOCTYPE_NAME:Ni,ERB_EXPR:Lu,IS_ALLOWED_URI:Pi,IS_SCRIPT_OR_DATA:Pu,MUSTACHE_EXPR:Iu,TMPLIT_EXPR:Ou}),dn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},qu=function(){return typeof window>"u"?null:window},Bu=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Mi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Fi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:qu(),t=G=>Fi(G);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==dn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:T}=e,k=c.prototype,D=cn(k,"cloneNode"),F=cn(k,"remove"),E=cn(k,"nextSibling"),$=cn(k,"childNodes"),O=cn(k,"parentNode");if(typeof a=="function"){let G=r.createElement("template");G.content&&G.content.ownerDocument&&(r=G.content.ownerDocument)}let R,A="",{implementation:B,createNodeIterator:V,createDocumentFragment:re,getElementsByTagName:ve}=r,{importNode:ee}=n,de=Mi();t.isSupported=typeof Di=="function"&&typeof O=="function"&&B&&B.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:$e,ERB_EXPR:Be,TMPLIT_EXPR:Le,DATA_ATTR:ze,ARIA_ATTR:Ve,IS_SCRIPT_OR_DATA:Ge,ATTR_WHITESPACE:Ne,CUSTOM_ELEMENT:we}=Oi,{IS_ALLOWED_URI:Ce}=Oi,ye=null,K=je({},[...Ci,...lo,...co,...uo,...Ri]),z=null,Ee=je({},[...Ii,...po,...Li,...ts]),se=Object.seal(fo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ie=null,j=null,U=Object.seal(fo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ge=!0,xe=!0,P=!1,H=!0,I=!1,Q=!0,J=!1,fe=!1,ce=!1,S=!1,N=!1,Z=!1,oe=!0,Se=!1,w="user-content-",M=!0,ue=!1,Fe={},Oe=null,he=je({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ye=null,st=je({},["audio","video","img","source","image","track"]),kt=null,yt=je({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ct="http://www.w3.org/1998/Math/MathML",$t="http://www.w3.org/2000/svg",at="http://www.w3.org/1999/xhtml",ot=at,mt=!1,W=null,X=je({},[ct,$t,at],ao),te=je({},["mi","mo","mn","ms","mtext"]),_e=je({},["annotation-xml"]),Te=je({},["title","style","font","a","script"]),De=null,et=["application/xhtml+xml","text/html"],Qe="text/html",Pe=null,tt=null,Ie=r.createElement("form"),ft=function(b){return b instanceof RegExp||b instanceof Function},xt=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(tt&&tt===b)){if((!b||typeof b!="object")&&(b={}),b=or(b),De=et.indexOf(b.PARSER_MEDIA_TYPE)===-1?Qe:b.PARSER_MEDIA_TYPE,Pe=De==="application/xhtml+xml"?ao:rs,ye=Ht(b,"ALLOWED_TAGS")?je({},b.ALLOWED_TAGS,Pe):K,z=Ht(b,"ALLOWED_ATTR")?je({},b.ALLOWED_ATTR,Pe):Ee,W=Ht(b,"ALLOWED_NAMESPACES")?je({},b.ALLOWED_NAMESPACES,ao):X,kt=Ht(b,"ADD_URI_SAFE_ATTR")?je(or(yt),b.ADD_URI_SAFE_ATTR,Pe):yt,Ye=Ht(b,"ADD_DATA_URI_TAGS")?je(or(st),b.ADD_DATA_URI_TAGS,Pe):st,Oe=Ht(b,"FORBID_CONTENTS")?je({},b.FORBID_CONTENTS,Pe):he,ie=Ht(b,"FORBID_TAGS")?je({},b.FORBID_TAGS,Pe):or({}),j=Ht(b,"FORBID_ATTR")?je({},b.FORBID_ATTR,Pe):or({}),Fe=Ht(b,"USE_PROFILES")?b.USE_PROFILES:!1,ge=b.ALLOW_ARIA_ATTR!==!1,xe=b.ALLOW_DATA_ATTR!==!1,P=b.ALLOW_UNKNOWN_PROTOCOLS||!1,H=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,I=b.SAFE_FOR_TEMPLATES||!1,Q=b.SAFE_FOR_XML!==!1,J=b.WHOLE_DOCUMENT||!1,S=b.RETURN_DOM||!1,N=b.RETURN_DOM_FRAGMENT||!1,Z=b.RETURN_TRUSTED_TYPE||!1,ce=b.FORCE_BODY||!1,oe=b.SANITIZE_DOM!==!1,Se=b.SANITIZE_NAMED_PROPS||!1,M=b.KEEP_CONTENT!==!1,ue=b.IN_PLACE||!1,Ce=b.ALLOWED_URI_REGEXP||Pi,ot=b.NAMESPACE||at,te=b.MATHML_TEXT_INTEGRATION_POINTS||te,_e=b.HTML_INTEGRATION_POINTS||_e,se=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&ft(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(se.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&ft(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(se.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(se.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),I&&(xe=!1),N&&(S=!0),Fe&&(ye=je({},Ri),z=[],Fe.html===!0&&(je(ye,Ci),je(z,Ii)),Fe.svg===!0&&(je(ye,lo),je(z,po),je(z,ts)),Fe.svgFilters===!0&&(je(ye,co),je(z,po),je(z,ts)),Fe.mathMl===!0&&(je(ye,uo),je(z,Li),je(z,ts))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?U.tagCheck=b.ADD_TAGS:(ye===K&&(ye=or(ye)),je(ye,b.ADD_TAGS,Pe))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?U.attributeCheck=b.ADD_ATTR:(z===Ee&&(z=or(z)),je(z,b.ADD_ATTR,Pe))),b.ADD_URI_SAFE_ATTR&&je(kt,b.ADD_URI_SAFE_ATTR,Pe),b.FORBID_CONTENTS&&(Oe===he&&(Oe=or(Oe)),je(Oe,b.FORBID_CONTENTS,Pe)),M&&(ye["#text"]=!0),J&&je(ye,["html","head","body"]),ye.table&&(je(ye,["tbody"]),delete ie.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');R=b.TRUSTED_TYPES_POLICY,A=R.createHTML("")}else R===void 0&&(R=Bu(T,s)),R!==null&&typeof A=="string"&&(A=R.createHTML(""));At&&At(b),tt=b}},qt=je({},[...lo,...co,...Cu]),Xt=je({},[...uo,...Ru]),ur=function(b){let q=O(b);(!q||!q.tagName)&&(q={namespaceURI:ot,tagName:"template"});let pe=rs(b.tagName),qe=rs(q.tagName);return W[b.namespaceURI]?b.namespaceURI===$t?q.namespaceURI===at?pe==="svg":q.namespaceURI===ct?pe==="svg"&&(qe==="annotation-xml"||te[qe]):!!qt[pe]:b.namespaceURI===ct?q.namespaceURI===at?pe==="math":q.namespaceURI===$t?pe==="math"&&_e[qe]:!!Xt[pe]:b.namespaceURI===at?q.namespaceURI===$t&&!_e[qe]||q.namespaceURI===ct&&!te[qe]?!1:!Xt[pe]&&(Te[pe]||!qt[pe]):!!(De==="application/xhtml+xml"&&W[b.namespaceURI]):!1},gt=function(b){on(t.removed,{element:b});try{O(b).removeChild(b)}catch{F(b)}},vt=function(b,q){try{on(t.removed,{attribute:q.getAttributeNode(b),from:q})}catch{on(t.removed,{attribute:null,from:q})}if(q.removeAttribute(b),b==="is")if(S||N)try{gt(q)}catch{}else try{q.setAttribute(b,"")}catch{}},pr=function(b){let q=null,pe=null;if(ce)b="<remove></remove>"+b;else{let Ze=io(b,/^[\r\n\t ]+/);pe=Ze&&Ze[0]}De==="application/xhtml+xml"&&ot===at&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let qe=R?R.createHTML(b):b;if(ot===at)try{q=new h().parseFromString(qe,De)}catch{}if(!q||!q.documentElement){q=B.createDocument(ot,"template",null);try{q.documentElement.innerHTML=mt?A:qe}catch{}}let Ke=q.body||q.documentElement;return b&&pe&&Ke.insertBefore(r.createTextNode(pe),Ke.childNodes[0]||null),ot===at?ve.call(q,J?"html":"body")[0]:J?q.documentElement:Ke},tr=function(b){return V.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Bt=function(b){return b instanceof m&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof _)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},Ut=function(b){return typeof l=="function"&&b instanceof l};function p(G,b,q){es(G,pe=>{pe.call(t,b,q,tt)})}let y=function(b){let q=null;if(p(de.beforeSanitizeElements,b,null),Bt(b))return gt(b),!0;let pe=Pe(b.nodeName);if(p(de.uponSanitizeElement,b,{tagName:pe,allowedTags:ye}),Q&&b.hasChildNodes()&&!Ut(b.firstElementChild)&&St(/<[/\w!]/g,b.innerHTML)&&St(/<[/\w!]/g,b.textContent)||b.nodeType===dn.progressingInstruction||Q&&b.nodeType===dn.comment&&St(/<[/\w]/g,b.data))return gt(b),!0;if(!(U.tagCheck instanceof Function&&U.tagCheck(pe))&&(!ye[pe]||ie[pe])){if(!ie[pe]&&ne(pe)&&(se.tagNameCheck instanceof RegExp&&St(se.tagNameCheck,pe)||se.tagNameCheck instanceof Function&&se.tagNameCheck(pe)))return!1;if(M&&!Oe[pe]){let qe=O(b)||b.parentNode,Ke=$(b)||b.childNodes;if(Ke&&qe){let Ze=Ke.length;for(let ke=Ze-1;ke>=0;--ke){let v=D(Ke[ke],!0);v.__removalCount=(b.__removalCount||0)+1,qe.insertBefore(v,E(b))}}}return gt(b),!0}return b instanceof c&&!ur(b)||(pe==="noscript"||pe==="noembed"||pe==="noframes")&&St(/<\/no(script|embed|frames)/i,b.innerHTML)?(gt(b),!0):(I&&b.nodeType===dn.text&&(q=b.textContent,es([$e,Be,Le],qe=>{q=an(q,qe," ")}),b.textContent!==q&&(on(t.removed,{element:b.cloneNode()}),b.textContent=q)),p(de.afterSanitizeElements,b,null),!1)},x=function(b,q,pe){if(oe&&(q==="id"||q==="name")&&(pe in r||pe in Ie))return!1;if(!(xe&&!j[q]&&St(ze,q))){if(!(ge&&St(Ve,q))){if(!(U.attributeCheck instanceof Function&&U.attributeCheck(q,b))){if(!z[q]||j[q]){if(!(ne(b)&&(se.tagNameCheck instanceof RegExp&&St(se.tagNameCheck,b)||se.tagNameCheck instanceof Function&&se.tagNameCheck(b))&&(se.attributeNameCheck instanceof RegExp&&St(se.attributeNameCheck,q)||se.attributeNameCheck instanceof Function&&se.attributeNameCheck(q,b))||q==="is"&&se.allowCustomizedBuiltInElements&&(se.tagNameCheck instanceof RegExp&&St(se.tagNameCheck,pe)||se.tagNameCheck instanceof Function&&se.tagNameCheck(pe))))return!1}else if(!kt[q]){if(!St(Ce,an(pe,Ne,""))){if(!((q==="src"||q==="xlink:href"||q==="href")&&b!=="script"&&Su(pe,"data:")===0&&Ye[b])){if(!(P&&!St(Ge,an(pe,Ne,"")))){if(pe)return!1}}}}}}}return!0},ne=function(b){return b!=="annotation-xml"&&io(b,we)},me=function(b){p(de.beforeSanitizeAttributes,b,null);let{attributes:q}=b;if(!q||Bt(b))return;let pe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:z,forceKeepAttr:void 0},qe=q.length;for(;qe--;){let Ke=q[qe],{name:Ze,namespaceURI:ke,value:v}=Ke,f=Pe(Ze),u=v,C=Ze==="value"?u:Au(u);if(pe.attrName=f,pe.attrValue=C,pe.keepAttr=!0,pe.forceKeepAttr=void 0,p(de.uponSanitizeAttribute,b,pe),C=pe.attrValue,Se&&(f==="id"||f==="name")&&(vt(Ze,b),C=w+C),Q&&St(/((--!?|])>)|<\/(style|title|textarea)/i,C)){vt(Ze,b);continue}if(f==="attributename"&&io(C,"href")){vt(Ze,b);continue}if(pe.forceKeepAttr)continue;if(!pe.keepAttr){vt(Ze,b);continue}if(!H&&St(/\/>/i,C)){vt(Ze,b);continue}I&&es([$e,Be,Le],be=>{C=an(C,be," ")});let Y=Pe(b.nodeName);if(!x(Y,f,C)){vt(Ze,b);continue}if(R&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!ke)switch(T.getAttributeType(Y,f)){case"TrustedHTML":{C=R.createHTML(C);break}case"TrustedScriptURL":{C=R.createScriptURL(C);break}}if(C!==u)try{ke?b.setAttributeNS(ke,Ze,C):b.setAttribute(Ze,C),Bt(b)?gt(b):Ti(t.removed)}catch{vt(Ze,b)}}p(de.afterSanitizeAttributes,b,null)},He=function G(b){let q=null,pe=tr(b);for(p(de.beforeSanitizeShadowDOM,b,null);q=pe.nextNode();)p(de.uponSanitizeShadowNode,q,null),y(q),me(q),q.content instanceof o&&G(q.content);p(de.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(G){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},q=null,pe=null,qe=null,Ke=null;if(mt=!G,mt&&(G="<!-->"),typeof G!="string"&&!Ut(G))if(typeof G.toString=="function"){if(G=G.toString(),typeof G!="string")throw ln("dirty is not a string, aborting")}else throw ln("toString is not a function");if(!t.isSupported)return G;if(fe||xt(b),t.removed=[],typeof G=="string"&&(ue=!1),ue){if(G.nodeName){let v=Pe(G.nodeName);if(!ye[v]||ie[v])throw ln("root node is forbidden and cannot be sanitized in-place")}}else if(G instanceof l)q=pr("<!---->"),pe=q.ownerDocument.importNode(G,!0),pe.nodeType===dn.element&&pe.nodeName==="BODY"||pe.nodeName==="HTML"?q=pe:q.appendChild(pe);else{if(!S&&!I&&!J&&G.indexOf("<")===-1)return R&&Z?R.createHTML(G):G;if(q=pr(G),!q)return S?null:Z?A:""}q&&ce&&gt(q.firstChild);let Ze=tr(ue?G:q);for(;qe=Ze.nextNode();)y(qe),me(qe),qe.content instanceof o&&He(qe.content);if(ue)return G;if(S){if(N)for(Ke=re.call(q.ownerDocument);q.firstChild;)Ke.appendChild(q.firstChild);else Ke=q;return(z.shadowroot||z.shadowrootmode)&&(Ke=ee.call(n,Ke,!0)),Ke}let ke=J?q.outerHTML:q.innerHTML;return J&&ye["!doctype"]&&q.ownerDocument&&q.ownerDocument.doctype&&q.ownerDocument.doctype.name&&St(Ni,q.ownerDocument.doctype.name)&&(ke="<!DOCTYPE "+q.ownerDocument.doctype.name+`>
`+ke),I&&es([$e,Be,Le],v=>{ke=an(ke,v," ")}),R&&Z?R.createHTML(ke):ke},t.setConfig=function(){let G=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xt(G),fe=!0},t.clearConfig=function(){tt=null,fe=!1},t.isValidAttribute=function(G,b,q){tt||xt({});let pe=Pe(G),qe=Pe(b);return x(pe,qe,q)},t.addHook=function(G,b){typeof b=="function"&&on(de[G],b)},t.removeHook=function(G,b){if(b!==void 0){let q=$u(de[G],b);return q===-1?void 0:xu(de[G],q,1)[0]}return Ti(de[G])},t.removeHooks=function(G){de[G]=[]},t.removeAllHooks=function(){de=Mi()},t}var qi=Fi();var ar={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ns=e=>(...t)=>({_$litDirective$:e,values:t}),Gr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var un=class extends Gr{constructor(t){if(super(t),this.it=lt,t.type!==ar.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===lt||t==null)return this._t=void 0,this.it=t;if(t===Ot)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};un.directiveName="unsafeHTML",un.resultType=1;var Bi=ns(un);function yo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Or=yo();function Vi(e){Or=e}var mn={exec:()=>null};function Xe(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Tt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Uu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Tt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ju=/^(?:[ \t]*(?:\n|$))+/,Wu=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,zu=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Hu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,vo=/(?:[*+-]|\d{1,9}[.)])/,Yi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ki=Xe(Yi).replace(/bull/g,vo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Gu=Xe(Yi).replace(/bull/g,vo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),wo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Vu=/^[^\n]+/,ko=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Yu=Xe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ko).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ku=Xe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,vo).getRegex(),cs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$o=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Zu=Xe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",$o).replace("tag",cs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Zi=Xe(wo).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex(),Xu=Xe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Zi).getRegex(),xo={blockquote:Xu,code:Wu,def:Yu,fences:zu,heading:Hu,hr:gn,html:Zu,lheading:Ki,list:Ku,newline:ju,paragraph:Zi,table:mn,text:Vu},Ui=Xe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex(),Qu={...xo,lheading:Gu,table:Ui,paragraph:Xe(wo).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ui).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex()},Ju={...xo,html:Xe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",$o).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Xe(wo).replace("hr",gn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ki).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ep=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,tp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xi=/^( {2,}|\\)\n(?!\s*$)/,rp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ds=/[\p{P}\p{S}]/u,So=/[\s\p{P}\p{S}]/u,Qi=/[^\s\p{P}\p{S}]/u,np=Xe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,So).getRegex(),Ji=/(?!~)[\p{P}\p{S}]/u,sp=/(?!~)[\s\p{P}\p{S}]/u,op=/(?:[^\s\p{P}\p{S}]|~)/u,ap=Xe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Uu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),el=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ip=Xe(el,"u").replace(/punct/g,ds).getRegex(),lp=Xe(el,"u").replace(/punct/g,Ji).getRegex(),tl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",cp=Xe(tl,"gu").replace(/notPunctSpace/g,Qi).replace(/punctSpace/g,So).replace(/punct/g,ds).getRegex(),dp=Xe(tl,"gu").replace(/notPunctSpace/g,op).replace(/punctSpace/g,sp).replace(/punct/g,Ji).getRegex(),up=Xe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Qi).replace(/punctSpace/g,So).replace(/punct/g,ds).getRegex(),pp=Xe(/\\(punct)/,"gu").replace(/punct/g,ds).getRegex(),fp=Xe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),_p=Xe($o).replace("(?:-->|$)","-->").getRegex(),mp=Xe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",_p).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),as=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,gp=Xe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",as).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),rl=Xe(/^!?\[(label)\]\[(ref)\]/).replace("label",as).replace("ref",ko).getRegex(),nl=Xe(/^!?\[(ref)\](?:\[\])?/).replace("ref",ko).getRegex(),hp=Xe("reflink|nolink(?!\\()","g").replace("reflink",rl).replace("nolink",nl).getRegex(),ji=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ao={_backpedal:mn,anyPunctuation:pp,autolink:fp,blockSkip:ap,br:Xi,code:tp,del:mn,emStrongLDelim:ip,emStrongRDelimAst:cp,emStrongRDelimUnd:up,escape:ep,link:gp,nolink:nl,punctuation:np,reflink:rl,reflinkSearch:hp,tag:mp,text:rp,url:mn},bp={...Ao,link:Xe(/^!?\[(label)\]\((.*?)\)/).replace("label",as).getRegex(),reflink:Xe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",as).getRegex()},go={...Ao,emStrongRDelimAst:dp,emStrongLDelim:lp,url:Xe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ji).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Xe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ji).getRegex()},yp={...go,br:Xe(Xi).replace("{2,}","*").getRegex(),text:Xe(go.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ss={normal:xo,gfm:Qu,pedantic:Ju},pn={normal:Ao,gfm:go,breaks:yp,pedantic:bp},vp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Wi=e=>vp[e];function ir(e,t){if(t){if(Tt.escapeTest.test(e))return e.replace(Tt.escapeReplace,Wi)}else if(Tt.escapeTestNoEncode.test(e))return e.replace(Tt.escapeReplaceNoEncode,Wi);return e}function zi(e){try{e=encodeURI(e).replace(Tt.percentDecode,"%")}catch{return null}return e}function Hi(e,t){let r=e.replace(Tt.findPipe,(o,a,l)=>{let c=!1,d=a;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Tt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Tt.slashPipe,"|");return n}function fn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function wp(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Gi(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function kp(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var is=class{constructor(e){rt(this,"options");rt(this,"rules");rt(this,"lexer");this.options=e||Or}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:fn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=kp(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=fn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=fn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let d=l.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=m,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let T=h,k=T.raw+`
`+r.join(`
`),D=this.blockquote(k);o[o.length-1]=D,n=n.substring(0,n.length-T.raw.length)+D.raw,s=s.substring(0,s.length-T.text.length)+D.text;break}else if(h?.type==="list"){let T=h,k=T.raw+`
`+r.join(`
`),D=this.list(k);o[o.length-1]=D,n=n.substring(0,n.length-h.raw.length)+D.raw,s=s.substring(0,s.length-T.raw.length)+D.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,D=>" ".repeat(3*D.length)),h=e.split(`
`,1)[0],T=!m.trim(),k=0;if(this.options.pedantic?(k=2,_=m.trimStart()):T?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,_=m.slice(k),k+=t[1].length),T&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let D=this.rules.other.nextBulletRegex(k),F=this.rules.other.hrRegex(k),E=this.rules.other.fencesBeginRegex(k),$=this.rules.other.headingBeginRegex(k),O=this.rules.other.htmlBeginRegex(k);for(;e;){let R=e.split(`
`,1)[0],A;if(h=R,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),A=h):A=h.replace(this.rules.other.tabCharGlobal,"    "),E.test(h)||$.test(h)||O.test(h)||D.test(h)||F.test(h))break;if(A.search(this.rules.other.nonSpaceChar)>=k||!h.trim())_+=`
`+A.slice(k);else{if(T||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||E.test(m)||$.test(m)||F.test(m))break;_+=`
`+h}!T&&!h.trim()&&(T=!0),d+=R+`
`,e=e.substring(R.length+1),m=A.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(c.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};c.checked=_.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=_.raw+c.tokens[0].raw,c.tokens[0].text=_.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(_)):c.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):c.tokens.unshift(_)}}if(!s.loose){let d=c.tokens.filter(m=>m.type==="space"),_=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=_}}if(s.loose)for(let c of s.items){c.loose=!0;for(let d of c.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Hi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Hi(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=fn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=wp(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Gi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Gi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let _=[...n[0]][0].length,m=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let T=m.slice(1,-1);return{type:"em",raw:m,text:T,tokens:this.lexer.inlineTokens(T)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Gt=class ho{constructor(t){rt(this,"tokens");rt(this,"options");rt(this,"state");rt(this,"inlineQueue");rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Or,this.options.tokenizer=this.options.tokenizer||new is,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Tt,block:ss.normal,inline:pn.normal};this.options.pedantic?(r.block=ss.pedantic,r.inline=pn.pedantic):this.options.gfm&&(r.block=ss.gfm,this.options.breaks?r.inline=pn.breaks:r.inline=pn.gfm),this.tokenizer.rules=r}static get rules(){return{block:ss,inline:pn}}static lex(t,r){return new ho(r).lex(t)}static lexInline(t,r){return new ho(r).inlineTokens(t)}lex(t){t=t.replace(Tt.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(_=>(c=_.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let _=r.at(-1);c.type==="text"&&_?.type==="text"?(_.raw+=c.raw,_.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(T=>{h=T.call({lexer:this},m),typeof h=="number"&&h>=0&&(_=Math.min(_,h))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(c=this.tokenizer.inlineText(d)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=c.raw,_.text+=c.text):r.push(c);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},ls=class{constructor(e){rt(this,"options");rt(this,"parser");this.options=e||Or}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Tt.notSpaceStart)?.[0],s=e.replace(Tt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ir(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=zi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+ir(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=zi(e);if(s===null)return ir(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${ir(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ir(e.text)}},Eo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Vt=class bo{constructor(t){rt(this,"options");rt(this,"renderer");rt(this,"textRenderer");this.options=t||Or,this.options.renderer=this.options.renderer||new ls,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Eo}static parse(t,r){return new bo(r).parse(t)}static parseInline(t,r){return new bo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},os,_n=(os=class{constructor(e){rt(this,"options");rt(this,"block");this.options=e||Or}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Gt.lex:Gt.lexInline}provideParser(){return this.block?Vt.parse:Vt.parseInline}},rt(os,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),rt(os,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),os),$p=class{constructor(...e){rt(this,"defaults",yo());rt(this,"options",this.setOptions);rt(this,"parse",this.parseMarkdown(!0));rt(this,"parseInline",this.parseMarkdown(!1));rt(this,"Parser",Vt);rt(this,"Renderer",ls);rt(this,"TextRenderer",Eo);rt(this,"Lexer",Gt);rt(this,"Tokenizer",is);rt(this,"Hooks",_n);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new ls(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...d)=>{let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new is(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...d)=>{let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new _n;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];_n.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&_n.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,d);return c.call(s,m)})();let _=l.call(s,d);return c.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,d);return m===!1&&(m=await c.apply(s,d)),m})();let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Gt.lex(e,t??this.defaults)}parser(e,t){return Vt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+ir(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Lr=new $p;function Je(e,t){return Lr.parse(e,t)}Je.options=Je.setOptions=function(e){return Lr.setOptions(e),Je.defaults=Lr.defaults,Vi(Je.defaults),Je};Je.getDefaults=yo;Je.defaults=Or;Je.use=function(...e){return Lr.use(...e),Je.defaults=Lr.defaults,Vi(Je.defaults),Je};Je.walkTokens=function(e,t){return Lr.walkTokens(e,t)};Je.parseInline=Lr.parseInline;Je.Parser=Vt;Je.parser=Vt.parse;Je.Renderer=ls;Je.TextRenderer=Eo;Je.Lexer=Gt;Je.lexer=Gt.lex;Je.Tokenizer=is;Je.Hooks=_n;Je.parse=Je;var gg=Je.options,hg=Je.setOptions,bg=Je.use,yg=Je.walkTokens,vg=Je.parseInline;var wg=Vt.parse,kg=Gt.lex;function br(e){let t=Je.parse(e),r=qi.sanitize(t);return Bi(r)}function lr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Vr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function us(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var xp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Sp=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ap=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function yr(e){return!!e&&typeof e=="object"}function To(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function sl(e,t){let r=To(e),n=To(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Ep(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>yr(s)&&typeof s.text=="string"?s.text:"").join(""):yr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Tp(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:xp[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=To(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=sl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=sl(yr(l)?l.old_string:"",yr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ol(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function al(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Sp.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Ap.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Cp(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(yr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(al(o.text));else if(o.type==="thinking"){let a=ol(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Tp(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(yr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Ep(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Rp(e){if(e.type==="item.completed"&&yr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[al(t.text)];if(t.type==="reasoning"){let r=ol(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Ip(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function il(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!yr(o))continue;let a=Ip(o)?Rp(o):Cp(o,r);for(let l of a)t.push(l)}return t}var Lp=5,Op=10,Mp=/Task\s+#(\d+)/,Dp=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Pp=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ps(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Np(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Fp(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function qp(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Mp.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!c||d.length===0)continue;t.set(c[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Bp(e){if(e.tool==="Bash"){let t=e.command||"";return Dp.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Pp.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Up(e){let t=e.filter(s=>s.kind==="tool").slice(-Op),r=new Map;t.forEach((s,o)=>{let a=Bp(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function jp(e){let t=Fp(e);if(t)return{text:t,guess:!1};let r=qp(e);if(r)return{text:r,guess:!1};let n=Up(e);return n?{text:n,guess:!0}:null}function Wp(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Lt(e,t)}function fs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,c=new Set,d=new Set,_=null,m=null,h=!1,T=!1,k=!1,D=null,F=null;function E(){h=!1,T=!1,k=!1,D=null,F=null}async function $(j){if(r){T=!0,k=!1,Ne();try{let U=await Promise.resolve(r("get-attempt-prompt",{attempt_id:j}));if(o!==j)return;!U||typeof U!="object"||Array.isArray(U)?k=!0:(D=U,F=j)}catch{o===j&&(k=!0)}finally{o===j&&(T=!1,Ne())}}}function O(){if(h=!h,h&&o&&F!==o){$(o);return}Ne()}function R(){if(!h)return"";let j=Vr({loading:T,error:k});if(j)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${j}
      </div>`;if(!D)return"";if(D.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let U=us(D.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${U?i`<div class="prompt-block__meta">${U} 발송</div>`:""}
      ${typeof D.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",D.task_prompt):""}
      ${typeof D.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",D.system_prompt):""}
    </div>`}function A(){if(!o||!n)return[];let j=n.get(o);return il(j?j.lines:[])}function B(){if(!o||!n)return null;let j=n.get(o),U=j?j.last_event_at:null;return typeof U=="number"?U:null}function V(){return a.status==="running"}function re(){if(V()&&o){m||(m=setInterval(()=>Ne(),1e3));return}ve()}function ve(){m&&(clearInterval(m),m=null)}function ee(j){let U=[],ge=0;for(;ge<j.length;){let xe=j[ge];if(xe.kind==="tool"){let P=ge;for(;P<j.length&&j[P].kind==="tool"&&j[P].tool===xe.tool;)P+=1;if(P-ge>=Lp&&!d.has(ge)){U.push({kind:"group",idx:ge,tool:xe.tool||"",lines:j.slice(ge,P).map((H,I)=>({idx:ge+I,line:H}))}),ge=P;continue}}U.push({kind:"line",idx:ge,line:xe}),ge+=1}return U}function de(j){for(let U=j.length-1;U>=0;U-=1){let ge=j[U];if(ge.kind==="result"||ge.kind==="error")return null;if(ge.kind==="tool"&&!Object.hasOwn(ge,"result"))return ge}return null}function $e(j){for(let U=j.length-1;U>=0;U-=1)if(j[U].kind==="thinking")return j[U];return null}function Be(j,U){if(U.kind==="gate")return i`<div class="sv__gate">${U.text}</div>`;if(U.kind==="phase")return i`<div class="sv__phase">${U.text}</div>`;if(U.kind==="result")return i`<div
        class="sv__result${U.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${U.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${br(U.text||(U.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(U.kind==="thinking"){let ge=c.has(j);return i`<div
        class="sv__think${ge?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ce(j)}
      >
        <span class="sv__think-line">💭 ${ps(U.text)}</span>
        ${ge?i`<pre class="sv__think-expand">${U.text}</pre>`:""}
      </div>`}if(U.kind==="error")return i`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="blocker")return i`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="tool"){let ge=c.has(j),xe=U.tool==="Bash"?Np(U.command):0,P=U.tool==="Bash"?xe>1?ps(U.command):U.command:U.path||U.command||"";return i`<div
        class="sv__tool${ge?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ce(j)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${U.icon}</span>
          <span class="sv__tool-name">${U.tool}</span>
          ${P?i`<span class="sv__tool-detail">${P}</span>`:""}
          ${xe>1?i`<span class="sv__tool-more">⋯ ${xe}줄</span>`:""}
          ${typeof U.added=="number"?i`<span class="sv__diff-add">+${U.added}</span>`:""}
          ${typeof U.removed=="number"?i`<span class="sv__diff-del">−${U.removed}</span>`:""}
          ${U.result?i`<span class="sv__tool-ok">→ ${U.result}</span>`:""}
        </span>
        ${ge?i`<pre class="sv__tool-expand">${Le(U)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${br(U.text||"")}</div>`}function Le(j){let U=[];if(j.tool==="Bash"&&typeof j.command=="string"&&j.command.length>0)U.push(j.command);else if(j.input!==void 0)try{U.push(`input: ${JSON.stringify(j.input,null,2)}`)}catch{}return typeof j.output=="string"&&j.output.length>0&&U.push(`output:
${j.output}`),U.join(`

`)}function ze(){if(!o)return i``;let j=A(),U=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ge=a.session_id||"",xe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,P=V(),H=P?Wp(B(),Date.now()):"",I=P?de(j):null,Q=P?$e(j):null,J=jp(j);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${J?i`<span
              class="sv__stage${J.guess?" sv__stage--guess":""}"
              title=${J.text}
              >${J.text}</span
            >`:""}
        ${P?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${H?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${H}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${H?i`<span class="sv__live-ago">${H}</span>`:""}</span
            >`:""}
        ${ge?i`<button
              type="button"
              class="sv__session"
              title=${ge}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ge}`}
              @click=${()=>K(ge)}
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
          @click=${O}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${xe}
          @click=${ye}
        >
          <span class="sv__follow-full">⇣ ${xe}</span>
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
      ${R()}
      <div class="sv__body">
        ${j.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:ee(j).map(fe=>fe.kind==="group"?Ve(fe):Be(fe.idx,fe.line))}
      </div>
      ${I||Q?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${I?i`<span class="sv__now-icon">${I.icon}</span>
                  <span class="sv__now-name">${I.tool}</span>
                  <span class="sv__now-detail"
                    >${I.tool==="Bash"?ps(I.command):I.path||I.command||""}</span
                  >`:""}
            ${Q?i`<span class="sv__now-think"
                  >💭 ${ps(Q.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ve(j){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ge(j.idx)}
    >
      <span class="sv__group-icon">${j.lines[0].line.icon}</span>
      <span class="sv__group-name">${j.tool}</span>
      <span class="sv__group-count">${j.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ge(j){d.add(j),Ne()}function Ne(){We(ze(),e),re(),l&&we()}function we(){let j=e.querySelector(".sv__body");j&&(j.scrollTop=j.scrollHeight)}function Ce(j){c.has(j)?c.delete(j):c.add(j),Ne()}function ye(){l=!l,Ne()}function K(j){Ir(j).then(U=>{U?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function z(j){!o||!j||(a={...a,...j},Ne())}function Ee(j){let U=j.target;if(!U||!U.classList||!U.classList.contains("sv__body"))return;!(U.scrollHeight-U.scrollTop-U.clientHeight<=4)&&l&&(l=!1,Ne())}e.addEventListener("scroll",Ee,!0);function se(j){let U=j&&j.attempt_id;U&&(o=U,a=j.meta||{},l=!0,c.clear(),d.clear(),E(),!_&&n&&(_=n.subscribe(Ne)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Ne())}function ie(){let j=o;o=null,c.clear(),d.clear(),E(),ve(),r&&j&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${j}`})).catch(()=>{}),We(i``,e),s&&s()}return{open:se,updateMeta:z,close:ie,isOpen(){return o!==null},destroy(){ve(),_&&(_(),_=null),e.removeEventListener("scroll",Ee,!0),o=null,We(i``,e)}}}function hn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=ll(t.spec_id),s=ll(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ll(e){return typeof e=="string"?e.trim():""}function zp(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Hp(e){let t=e&&e.metadata||{},r=hn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:zp(t)?null:"plan_pending"}),n}function cl(e,t){let r=Hp(e);return i`
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
  `}var{I:th}=Fa;var fl=e=>e.strings===void 0;var Qp={},_l=(e,t=Qp)=>e._$AH=t;var Mr=ns(class extends Gr{constructor(e){if(super(e),e.type!==ar.PROPERTY&&e.type!==ar.ATTRIBUTE&&e.type!==ar.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!fl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ot||t===lt)return t;let r=e.element,n=e.name;if(e.type===ar.PROPERTY){if(t===r[n])return Ot}else if(e.type===ar.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Ot}else if(e.type===ar.ATTRIBUTE&&r.getAttribute(n)===t+"")return Ot;return _l(e),t}});var Co=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ms=["orchestration_model","orchestration_effort","orchestration_speed"],ml=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],gs=["delegated","main"],hs=["inherit","claude","codex"],bn=["default","fast"],bs=["standard","fast_track"],yn=["codex","opus","fable","self","skip"],ys=["codex","fable","skip"],vs=["low","medium","high","xhigh"],Nt="auto";function cr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function gl(e){if(!cr(e)||!cr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))cr(n)&&cr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function hl(e){return e?.impl_dispatch==="main"}function ws(e,t){let r=gl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Nt,...n.flatMap(([,s])=>s)]}function Yr(e,t,r){if(!cr(e)||!cr(e.runners))return[Nt];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!cr(o)||!cr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,l]of Object.entries(o.models)){if(r&&r!==Nt&&a!==r)continue;let c=cr(l)?l.efforts:null;if(Array.isArray(c))for(let d of c)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[Nt,...n]}function ks(e,t){let r=gl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function bl(e,t){let r={};for(let n of Co){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function yl(e,t){let r={};for(let n of ms){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Ro=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...ms]}],Io={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},wl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function vl(e){return typeof e=="string"&&e.length>0?e:null}function Jp(e,t,r){let n=vl(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=vl(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function $s(e,t,r){return e.map(n=>({key:n,...Jp(n,t,r)}))}function kl(e,t,r){let n={pin:0,global:0,base:0};for(let s of $s(e,t,r))n[s.source]+=1;return n}function $l(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function xl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var dh=[...Co,...ms];var ef=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],tf={pin:"pin",global:"global",base:"base"};function rf(e){return i`<span
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
          .value=${Mr(e.preset_id)}
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
      ${ef.map(c=>{let d=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",_=n[c.id],m=d.length>0||_?.fill==="full",h=!m&&_?.fill==="dim",T=_?.stale===!0;return i`<span
          class=${`detail-summary__gate${m?" detail-summary__gate--on":""}${h?" detail-summary__gate--current":""}${T?" detail-summary__gate--stale":""}`}
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
    `:i``}function _(){We(d(),e)}async function m(k,D={}){s=k,o="loading",a="",l="",_();let F=r?r():"";if(!F){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let E="/api/doc?workspace="+encodeURIComponent(F)+"&path="+encodeURIComponent(k);try{let $=await n(E),O=await $.json().catch(()=>({}));if(!$.ok||!O||O.ok!==!0){if(O?.error==="not_found"&&D.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(O&&O.error||$.status)+")",_();return}a=String(O.content||""),o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function h(){s=null,We(i``,e)}function T(){document.removeEventListener("keydown",c),h()}return{open:m,close:h,destroy:T}}var df=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ml="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function uf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function pf(e){let t=wt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=zr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Ml}
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
    ${e.replayed?i`<span class="detail-session__usage-note">${Ml}</span>`:""}
  </div>`}var mf={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Dl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function gf(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Pl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let m=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),T=m&&!h,k=m?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!T}
      title=${k}
      @click=${D=>{D.stopPropagation(),T&&t.onResume&&t.onResume(d.attempt_id)}}
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
            ${h.length>0?h.map(T=>i`<span
                      class="detail-session__usage"
                      title=${T.tooltip}
                      >${T.label}</span
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
    ${typeof r.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var bf=["open","in_progress","deferred","resolved","closed"],yf=[0,1,2,3,4];function Fl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,d=null,_=null,m={},h="",T=!1,k=!1,D={},F=!1,E=!1,$="",O="",R="";function A(){F=!1,E=!1,$="",O="",R=""}let B=[],V=null,re=null,ve=!1,ee="",de=!1,$e=0,Be=new Set;function Le(){B=[],V=null,re=null,ve=!1,ee="",de=!1,$e+=1,Be.clear()}async function ze(v){if(!s)return;let f=++$e;try{let u=await Promise.resolve(s("get-comments",{id:v}));if(f!==$e||v!==d)return;B=Array.isArray(u)?u:[],ve=!1}catch{if(f!==$e||v!==d)return;ve=!0}ke()}function Ve(){if(!s||!d)return;let v=_&&typeof _.comment_count=="number"?_.comment_count:null;if(V!==d){V=d,re=v,ze(d);return}v!==null&&v!==re&&(re=v,ze(d))}function Ge(v){Be.has(v)?Be.delete(v):Be.add(v),ke()}function Ne(v){let f=ee.trim().length===0;ee=v,f!==(v.trim().length===0)&&ke()}async function we(){let v=ee.trim();if(!s||!d||v.length===0||de)return;let f=d;de=!0,ke();let u=!1;try{let C=await Promise.resolve(s("add-comment",{id:f,text:v}));Array.isArray(C)&&C.length>0&&(u=!0,f===d&&(B=C,ve=!1,ee="",re=C.length))}catch{u=!1}u||ae("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),f===d&&(de=!1),ke()}let Ce={onToggle:Ge,onDraftInput:Ne,onSubmit:we},ye=document.createElement("div");ye.className="md-viewer-root",document.body.appendChild(ye);let K=Il(ye,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),z=document.createElement("div");z.className="session-log-root",document.body.appendChild(z);let Ee=fs(z,{transport:s?(v,f)=>Promise.resolve(s(v,f)):void 0,sessionLogStore:c}),se=!1,ie=!1,j=!1,U=null,ge=null,xe=0;function P(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function H(){se=!1,ie=!1,j=!1,U=null,ge=null,xe+=1}async function I(v){if(!s)return;let f=++xe;ie=!0,j=!1,ke();try{let u=await Promise.resolve(s("get-bead-prompt",{bead_id:v}));if(f!==xe)return;!u||typeof u!="object"||Array.isArray(u)?j=!0:(U=u,ge=P(v))}catch{f===xe&&(j=!0)}finally{f===xe&&(ie=!1,ke())}}function Q(){if(se=!se,se&&d&&ge!==P(d)){U=null,I(d);return}ke()}function J(){if(!a||!d)return[];let v=a.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(u=>u&&u.bead_id===d).sort((u,C)=>(C.started_at||0)-(u.started_at||0)).map(u=>({attempt_id:u.attempt_id,bead_id:u.bead_id,status:u.status,started_at:typeof u.started_at=="number"?u.started_at:null,runner:u.runner||null,model:u.model||null,effort:u.effort||null,speed:u.speed||null,session_id:u.session_id||null,resumed_from:u.resumed_from||null,continuation_mode:u.continuation_mode||null,dismissed_at:typeof u.dismissed_at=="number"?u.dismissed_at:null,cause:typeof u.cause=="string"?u.cause:null,cause_detail:u.cause_detail||null,exec_default_preset_id:typeof u.exec_default_preset_id=="string"?u.exec_default_preset_id:null,exec_default_preset_revision:typeof u.exec_default_preset_revision=="number"?u.exec_default_preset_revision:null,exec_values:u.exec_values&&typeof u.exec_values=="object"?u.exec_values:null,usage:u.usage||null,usage_legs:Array.isArray(u.usage_legs)?u.usage_legs:[]}))}function fe(){if(!a||!d)return null;let v=a.get();return Dt(v&&v.attempts||{},d)}let ce=new Set;function S(v){ce.has(v)?ce.delete(v):ce.add(v),ke()}function N(v){let f=a?a.get():null,u=f&&f.attempts?f.attempts[v]:null;Ee.open({attempt_id:v,meta:u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}})}async function Z(v){if(!s||!v)return;let f=()=>{let be=a?a.get():null;return be&&typeof be.revision=="number"?be.revision:0},u=async(be={})=>await s("worker-attempt-resume",{attempt_id:v,expected_revision:f(),...be}),C=be=>{be?.queue&&a?.set&&a.set(be.queue)},Y=await u();if(C(Y),Y&&Y.conflict){let be=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:f();Y=await s("worker-attempt-resume",{attempt_id:v,expected_revision:be}),C(Y)}Y=await nr(Y,(be,Me)=>u({continuation:be,decision_token:Me}),{onResult:C,refresh:()=>u()}),Y&&Y.resumed===!1&&!Y.conflict&&Y.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Y.reason}`,"error",2400)}let oe={onOpen:N,onResume:Z,onToggleUsage:S};function Se(){let v=a?a.get():null,f={...D};for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){let C=v&&v[u];typeof C=="string"&&(f[u]=C)}return f}async function w(){if(s){try{let v=await Promise.resolve(s("get-session-defaults",{}));D=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{D={}}ke()}}function M(){let v=a?a.get():null;return v&&v.runner_catalog||null}function ue(){let v=_?.metadata&&typeof _.metadata=="object"?_.metadata:{},u=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof v.orchestration_model=="string"?v.orchestration_model:"")||(typeof Se().orchestration_model=="string"?Se().orchestration_model:"")||"opus";return Lo(M(),u)}function Fe(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Oe(v){return v?.compatible===!1}function he(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Ye(){let v=Fe(),f=v?.presets.find(u=>u.id===h);if(!(!s||!d||!v||!f||Oe(f)||T)){T=!0,ke();try{let u=await Promise.resolve(s("apply-impl-preset",xl(d,f.id,v.revision)));if(u&&u.conflict){he(u),ae("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let C=u&&Array.isArray(u.issue)?u.issue[0]:u?.issue;if(u&&u.applied&&C&&typeof C=="object"){_=C;for(let Y of El)delete m[Y];ae("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}u&&u.error==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(u){u&&typeof u=="object"&&u.code==="bd_readback_failed"?ae("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ae("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,ke()}}}let st=null;r&&r.subscribe&&(st=r.subscribe(()=>$t()));let kt=null;a&&typeof a.subscribe=="function"&&(kt=a.subscribe(()=>{d&&ke()}));let yt=null;l&&typeof l.subscribe=="function"&&(yt=l.subscribe(()=>{d&&ke()}));function ct(v){v.key==="Escape"&&d&&(v.preventDefault(),n())}document.addEventListener("keydown",ct);function $t(){if(d){if(r&&typeof r.snapshotFor=="function"){let v=r.snapshotFor("detail:"+d)||[];_=v.find(u=>u&&u.id===d)||v[0]||_}Ve(),ke()}}function at(v){Ir(v).then(f=>{f?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ot(v){v.preventDefault(),v.stopPropagation(),d&&at(d)}function mt(v,f){v.preventDefault(),v.stopPropagation(),at(f)}function W(v,f,u){v.preventDefault(),v.stopPropagation(),K.open(f,{missing_state:u})}function X(v,f){m[v]=f,ke(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",$l(d,v,f.length===0?null:f))).catch(()=>{ae("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function te(v,f){let u=_||{},C=u.metadata&&typeof u.metadata=="object"?u.metadata:{},Y={};for(let Ae of["impl_runtime","impl_model","impl_effort"])Y[Ae]=Object.hasOwn(m,Ae)?m[Ae]:typeof C[Ae]=="string"?C[Ae]:"";Y[v]=f;let be=Rl(Y,M(),ue()),Me={};for(let Ae of["impl_runtime","impl_model","impl_effort"])Me[Ae]=m[Ae],m[Ae]=be[Ae]||"";ke(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...be,orchestration_runtime:ue()})).then(Ae=>{let _t=Array.isArray(Ae)?Ae[0]:Ae;if(!_t||typeof _t!="object"||!_t.id)throw new Error("implementation target readback failed");_=_t;for(let Re of["impl_runtime","impl_model","impl_effort"])delete m[Re];ke()}).catch(()=>{for(let Ae of["impl_runtime","impl_model","impl_effort"])Me[Ae]===void 0?delete m[Ae]:m[Ae]=Me[Ae];ke(),ae("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function _e(v,f,u){if(!s||!d)return!1;try{let C=await Promise.resolve(s(v,f)),Y=Array.isArray(C)?C[0]:C;return Y&&typeof Y=="object"&&Y.id?(_=Y,!0):(ae(u,"error"),!1)}catch{return ae(u,"error"),!1}}function Te(v){setTimeout(()=>{try{let f=e.querySelector(v);f&&typeof f.focus=="function"&&f.focus()}catch{}},0)}function De(){F=!0,$=_&&_.title||"",ke(),Te('.detail-edit__input[data-edit="title"]')}function et(v){$=v.target.value}function Qe(){F=!1,$="",ke()}function Pe(){_e("edit-text",{id:d,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(F=!1,$=""),ke()})}function tt(){E=!0,O=_&&_.description||"",ke(),Te('.detail-edit__textarea[data-edit="description"]')}function Ie(v){O=v.target.value}function ft(){E=!1,O="",ke()}function xt(){_e("edit-text",{id:d,field:"description",value:O},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(E=!1,O=""),ke()})}function qt(v,f,u,C){if(v.key==="Escape"){v.stopPropagation(),u();return}v.key==="Enter"&&(!C||v.ctrlKey||v.metaKey)&&(v.preventDefault(),f())}function Xt(v){let f=v.target.value;_e("update-status",{id:d,status:f},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ke())}function ur(v){let f=Number(v.target.value);_e("update-priority",{id:d,priority:f},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ke())}function gt(v){R=v.target.value}function vt(){let v=R.trim();v.length!==0&&_e("label-add",{id:d,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(f=>{f&&(R=""),ke()})}function pr(v){if(v.key==="Escape"){v.stopPropagation(),R="",ke();return}v.key==="Enter"&&(v.preventDefault(),vt())}function tr(v){_e("label-remove",{id:d,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ke())}let Bt={onCopyPath:mt,onOpenDoc:W};function Ut(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function p(v){switch(v&&typeof v=="object"?String(v.dependency_type||v.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function y(v){let u=(Array.isArray(v.dependencies)?v.dependencies:[]).map(C=>({id:Ut(C),icon:p(C)})).filter(C=>C.id.length>0);return i`
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
    `}function x(v){let f=v.metadata||{},u=v.workflow||{},C=u.stages||{},Y=C.spec&&C.spec.stale,be=C.impl&&C.impl.stale,Me=C.plan||null,Ae=u.route_source==="derived",_t=u.route||f.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ae?" detail-kv__v--derived":""}"
          title=${Ae?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ae?"unset":_t}</span
        >
      </div>
      ${u.route!=="quick_fix"||Object.hasOwn(f,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${f.spec_review||"\uC5C6\uC74C"}${Y?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${u.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Me?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Me?.approval_receipt||"\uC5C6\uC74C"}${Me?.approval_state==="stale"?" \xB7 stale":Me?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${u.route!=="quick_fix"||Object.hasOwn(f,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${f.impl_review||"\uC5C6\uC74C"}${be?" \xB7 stale":""}</span
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
    `}let ne={route:["quick_fix","spec_backed","full_plan"]};async function me(v,f){let u=f.target.value;if(v==="route"&&_&&_.metadata&&_.metadata.route==="full_plan"&&u!=="full_plan"&&!window.confirm(`full_plan \u2192 ${u||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ke();return}await _e("update-workflow-meta",{id:d,key:v,value:u},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ke()}function He(v){let f=v.metadata||{};return i` ${((C,Y)=>{let be=ne[C],Me=typeof f[C]=="string"?f[C]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${C}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${C}
          data-edit=${`wfmeta-${C}`}
          @change=${Ae=>me(C,Ae)}
        >
          <option value="" ?selected=${!be.includes(Me)}>
            ${Y}
          </option>
          ${be.map(Ae=>i`<option value=${Ae} ?selected=${Me===Ae}>${Ae}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function G(v,f){return F?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${et}
            @keydown=${u=>qt(u,Pe,Qe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Pe}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Qe}
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
          @click=${De}
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
        ${E?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${tt}
            >
              ✎
            </button>`}
      </div>
      ${E?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${O}
              @input=${Ie}
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
    `}function qe(v){let f=typeof v.notes=="string"?v.notes:"";return f.trim().length===0?i``:i`
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
            .value=${R}
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
    `}function Ze(){if(!d)return i``;let v=_||{},f=String(v.id||d),u=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",C=fe(),Y=v.status||"open",be=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",Me=v.description||"",Ae={...v,metadata:{...v.metadata||{},...m}};return i`
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
          ${Al(Ae)}
          ${Sl({metadata:Ae.metadata,workspace_values:Se(),catalog:M(),expanded:k,presets:Fe()?.presets||[],preset_id:h,preset_busy:T},{onToggle:()=>{k=!k,ke()},onEdit:(_t,Re)=>{if(_t==="impl_runtime"||_t==="impl_model"||_t==="impl_effort"){te(_t,Re??"");return}X(_t,Re??"")},onPresetSelect:_t=>{h=_t,ke()},onPresetApply:()=>{Ye()}})}
          ${q(Y,be)} ${b(v)}
          ${pe(Me)}
          ${pl(B,Ce,{expanded:Be,draft:ee,sending:de,error:ve})}
          ${qe(v)} ${Ke(v)} ${y(v)}
          ${x(v)} ${He(v)}
          ${cl(v,Bt)}
          ${Nl({expanded:se,loading:ie,error:j,data:U},{onToggle:Q})}
          ${Pl(J(),oe,{total:C,expanded:ce})}
        </div>
      </div>
    `}function ke(){We(Ze(),e)}return{load(v){v!==d&&(m={},h="",k=!1,A(),Le(),H()),d=v,_=null,$t(),w()},clear(){d=null,_=null,m={},h="",T=!1,A(),Le(),H(),K.close(),Ee.close(),We(i``,e)},destroy(){st&&(st(),st=null),kt&&(kt(),kt=null),yt&&(yt(),yt=null),document.removeEventListener("keydown",ct),K.destroy(),ye.parentNode&&ye.parentNode.removeChild(ye),Ee.destroy(),z.parentNode&&z.parentNode.removeChild(z),d=null,_=null,h="",T=!1,Le(),H(),We(i``,e)}}}function ql(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
  </div>`}var kf={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ul(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.state==="unique"?"unique":"unknown",o=n.summary&&typeof n.summary=="object"?n.summary:{};function a(c){return Number.isInteger(o[c])?Number(o[c]):0}let l=typeof n.cause=="string"?n.cause:"observe_failed";return{state:s,title:s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:kf[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function Mo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=wt(e.usage),s=zt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?Lt(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",T=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=i`<span class="worker-mini__title">${e.title}</span>`,D=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",F=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",E=r.map(ze=>ze===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ze}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ze===e.completion_badge&&e.completion_title||""}
          >${ze}</span
        >`),$=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",O=n.length>0?n.map(ze=>i`<span class="worker-usage" title=${ze.tooltip}
              >${ze.label}</span
            >`):s?i`<span class="worker-usage" title=${Hr(e.usage)}
            >${s}</span
          >`:"",R=o?i`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",A=e.merge_action?i`<button
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
      </button>`:"",re=e.discard,ve=re?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${re?.attempt_id||""}
          data-operation-id=${re?.operation?.operation_id||""}
          data-discard-mode=${re?.confirmation||"unmerged"}
          ?disabled=${re?!re.enabled:e.discard_enabled===!1}
          title=${re?re.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${re?.label||"\uD3D0\uAE30"}
        </button>`:"",ee=e.stale_work||null,de=ee?i`${ee.can_resume||ee.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ee.action_id}
            ?disabled=${ee.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ee.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ee.action_id}
            ?disabled=${ee.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ee.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ee.action_id}
            ?disabled=${ee.locked}
          >
            다시 확인
          </button>`:""}`:"",$e=ee?i`<div class="worker-mini__stale">
        <strong>${ee.title}</strong>
        <span>${ee.summary}</span>
        <span>${ee.cause}</span>
        ${ee.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Be=e.revise_action?i`<button
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
        </button>`:"",Le=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||re?.operation||e.revise_action||ee);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${h}${T}${k}</div>
          <div class="worker-mini__row2">
            ${O}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ht(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${E}${R}
            <span class="worker-mini__actions"
              >${A}${B}${V}${ve}</span
            >
            ${Kr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${_}${h}${T}${D}${F}${E}${m}${$}
            </div>
            <div class="worker-mini__body">${k}${$e}</div>
            ${Le?i`<div class="worker-mini__foot">
                  ${O}${R}
                  <span class="worker-mini__actions"
                    >${A}${B}${V}${ve}${Be}${de}</span
                  >
                  ${dr(e)}
                </div>`:""}
            ${Kr(e)}`:i`<div class="worker-mini__line">
              ${d}${_}${h}${T}${k}${D}${F}${E}${m}${$}${O}${R}${A}${B}${V}${ve}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?$f(n):Mo(n))}
          </div>`}
  </section>`}var jl=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],kn=jl.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function Do(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=jl.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Wl(e){let t=kn.findIndex(r=>r.step===e);return kn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Dr(e){let t=kn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function xf(e){let t=kn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:kn.length}}function Ts(e){let t=xf(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var zl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Hl={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function Gl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Po(e){for(let t of Gl(e))if(Object.hasOwn(zl,t))return zl[t];return null}function No(e){let t=null;for(let r of Gl(e))Object.hasOwn(Hl,r)&&(t=Hl[r]);return t}function Cs(e){let t=Po(e),r=No(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Vl(e,t){let r=Po(e)??Po(t),n=No(t)??No(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Yl=160;function Sf(e){return e.length>Yl?`${e.slice(0,Yl)}\u2026`:e}function Af(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
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
  </div>`}function Tf(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Fo(t-e.started_at):"\u2014",a=Jt(e),l=gr(e),c=wt(e.usage),d=zt(e.usage),_=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,T=e.discard?.action?i`<button
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
            ${T}
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
            ${T}`}
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
  </div>`}function Pr(e){return i`<svg
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
  </svg>`}function Bo(){return Pr(fr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Uo(){return Pr(fr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Zl(){return Pr(fr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Xl(){return Pr(fr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Ql(){return Pr(fr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Jl(){return Pr(fr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function ec(){return Pr(fr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var $n=1,Cf=6e4,Rf={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},If=new Set(["auto_merge","merged","merge","done"]),tc={running:3,paused:2,failed:1};function Lf(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Of(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),h=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let m=tc[d.run_state],h=tc[l];if(m>h||m===h&&(d.started_at??0)>(c??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Dt(e,a.bead_id),can_pause:l==="running"&&_,can_resume:l!=="running"&&_&&!n.has(a.attempt_id)})}return o}function rc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Ft(e){return e&&typeof e=="object"?e:{}}function jo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&a.set(E.root_dir,E);let l=[],c=[],d=[],_=[],m=[],h=new Map;for(let E of n){if(!E||typeof E.root_dir!="string")continue;let $=E.root_dir,O=E.name||$,R=a.get($),A=R&&typeof R.revision=="number"?R.revision:typeof E.revision=="number"?E.revision:0,B=Ft(E.attempts),V=Ft(E.bead_titles),re=Ft(E.pr_observations),ve=Ft(E.admission),ee=Ft(E.revise_parked),de=Ft(E.merge_queue_state),$e=Ft(E.cleanup_failed),Be=Ft(E.discard_operations),Le=Array.isArray(E.merge_queue)?E.merge_queue:[],ze=new Set(Le.filter(K=>K&&typeof K.bead_id=="string").map(K=>K.bead_id)),Ve=new Map(Le.filter(K=>K&&typeof K.bead_id=="string").map(K=>[K.bead_id,K])),Ge=Array.isArray(E.queue)?E.queue:[],Ne=Array.isArray(E.done)?E.done:[],we=new Map;for(let K of Ne)K&&typeof K.bead_id=="string"&&typeof K.added_at=="number"&&we.set(K.bead_id,K.added_at);let Ce=K=>({id:K,title:V[K]||K,root_dir:$,workspace_name:O,expected_revision:A,draggable:!1}),ye=new Set;for(let[K,z]of Of(B,we))ye.add(K),c.push({...Ce(K),lane:"running",attempt_id:z.attempt_id,run_state:z.run_state,can_pause:z.can_pause,can_resume:z.can_resume,started_at:z.started_at,last_event_at:z.last_event_at,runner:z.runner,model:z.model,effort:z.effort,speed:z.speed,resumed_from:z.resumed_from,continuation_mode:z.continuation_mode,usage:z.usage,discard:er(Be,K,{attempt_id:z.attempt_id}),badges:z.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:z.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:z.run_state==="failed"});for(let K of Array.isArray(E.pr_wait)?E.pr_wait:[]){let z=K&&K.bead_id;if(typeof z!="string"||ye.has(z))continue;ye.add(z);let Ee=Ft(re[z]),se=Ft(Ee.pr),ie=Ee.gate?Ft(Ee.gate):null,j=ze.has(z),U=Ve.get(z)?.continuation_action||null,ge=!!U&&U.continuation===null,xe=de.active===z,P=K.external===!0,H=$e[z]||null,I=!!ie&&ie.base_badge==="\uCDA9\uB3CC",Q=!!H&&["child_sweep","branch_cleanup","parent_close"].includes(H.step)&&!!ie&&ie.tier==="merged",J=P&&!!H&&!!ie&&ie.tier==="merged",fe=!!ie&&["closed_unmerged","review","undecidable"].includes(ie.tier),ce=er(Be,z,{external:P,merge_active:xe,merge_queued:j,merged:!!H||ie?.tier==="merged"}),S=!!ce.operation;d.push({...Ce(z),lane:"pr_wait",pr_number:typeof se.number=="number"?se.number:null,pr_url:typeof se.url=="string"?se.url:void 0,external:P,usage:Dt(B,z),badges:ge?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:H?[Dr(H.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Dr(H.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ie?.gate_badge=="string"&&ie.gate_badge.length>0?[ie.gate_badge]:[],alert:!!H||fe,reason:H?Ts(H.step):"PR \uB300\uAE30",merge_action:!j||ge,merge_enabled:!S&&(ge||ie?.enabled===!0||I||Q||J),merge_label:ge?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":J||Q?"\uC815\uB9AC \uC7AC\uAC1C":I&&!Q?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ge?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":S?ce.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ce.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ce.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:J?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Q?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":I?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ie?.enabled===!0?`\uBA38\uC9C0 (${ie.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ie?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:j&&!ge,cancel_enabled:!xe,continuation_mismatch:U?.mismatch||null,discard:ce,discard_action:ce.action,discard_enabled:ce.enabled,discard_title:ce.title})}for(let K=0;K<Ge.length;K++){let z=Ge[K],Ee=z&&z.bead_id;if(typeof Ee!="string"||ye.has(Ee))continue;ye.add(Ee);let se=ee[Ee],ie=er(Be,Ee),j=ie.operation?ie:null,U={...Ce(Ee),lane:"queue",draggable:!j,discard:j||void 0,reason:rc(ve,Ee),queue_position:K+1,queue_index:K,queue_length:Ge.length,badges:se?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!se,revise_action:!!se,revise_enabled:!!se&&!j,revise_title:se?se.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${se.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(U);let ge=h.get($);ge?ge.push(U):h.set($,[U])}for(let K of Array.isArray(E.runnable)?E.runnable:[]){let z=K&&K.bead_id;typeof z!="string"||ye.has(z)||(ye.add(z),l.push({...Ce(z),title:K.title||V[z]||z,lane:"runnable",draggable:!0,reason:rc(ve,z),created_at:K.created_at??void 0,updated_at:K.updated_at??void 0,labels:Array.isArray(K.labels)?K.labels:[],spec_reviewer:typeof K.spec_reviewer=="string"?K.spec_reviewer:void 0,plan_state:K.plan_state==="approved"||K.plan_state==="authored"?K.plan_state:"none",workflow:K.route?{route:K.route,chips:{route:K.route}}:null,place_index:Ge.length}))}for(let K of Ne){let z=K&&K.bead_id;if(typeof z!="string"||ye.has(z)||(ye.add(z),o!==void 0&&typeof K.added_at=="number"&&K.added_at<o))continue;let Ee=Lf(B,z);m.push({...Ce(z),lane:"done",done:!0,usage:Dt(B,z),done_at:typeof K.added_at=="number"?K.added_at:void 0,done_kind:Ee&&typeof Ee.done_kind=="string"?Ee.done_kind:null})}}let T=new Map;s.forEach((E,$)=>{E&&typeof E.root_dir=="string"&&T.set(E.root_dir,$)});let k=r&&r.running_sort==="repo"?"repo":"started";c.sort((E,$)=>{if(k==="repo"){let A=T.get(E.root_dir)??Number.MAX_SAFE_INTEGER,B=T.get($.root_dir)??Number.MAX_SAFE_INTEGER;if(A!==B)return A-B}let O=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null,R=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null;return O!==null&&R!==null&&O!==R?O-R:O===null&&R!==null?1:O!==null&&R===null?-1:E.id.localeCompare($.id)}),m.sort((E,$)=>($.done_at??0)-(E.done_at??0));let D=s.length>0?s:n.map(E=>({root_dir:E&&E.root_dir,name:E&&E.name,auto_advance:E&&E.auto_advance,auto_merge:E&&E.auto_merge,slots:E&&E.slots,revision:E&&E.revision,runner_catalog:E&&E.runner_catalog})),F=[];for(let E of D)!E||typeof E.root_dir!="string"||F.push({root_dir:E.root_dir,name:E.name||E.root_dir,auto_advance:E.auto_advance===!0,auto_merge:E.auto_merge===!0,slots:typeof E.slots=="number"&&E.slots>=$n?E.slots:$n,revision:typeof E.revision=="number"?E.revision:0,runner_catalog:Ft(E.runner_catalog),items:h.get(E.root_dir)||[]});return{runnable:l,queue:_,queue_groups:F,running:c,pr_wait:d,done:m,automation:{total:F.length,both_on:F.filter(E=>E.auto_advance&&E.auto_merge).length}}}function Mf(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Cf;return i`<span
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
  </span>`}function Pf(e,t){let r=typeof e.started_at=="number"?Fo(t-e.started_at):"";return i`${xn(e)}
    <div class="mon-c__meta">
      ${zo(e)}${Mf(e.last_event_at,t)}${Sn(e)}${Rs(e)}
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
    </div>`}function nc(e,t){return e.lane==="running"?Pf(e,t):e.lane==="runnable"?Nf(e):e.lane==="queue"?Ff(e):e.lane==="pr_wait"?qf(e):Bf(e,t)}function sc(e){let t=String(e.revision);return i`<header
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
  </div>`}function ac(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ic(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return wt(Jn(t));let r={};for(let l of sr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let d=!1;for(let _ of sr){let m=c[_];typeof m=="number"&&Number.isFinite(m)&&(r[_]+=m,n=!0,d=!0)}if(d){o+=1;let _=c.total_cost_usd;typeof _=="number"&&Number.isFinite(_)&&(s+=_,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?zt(r):null}var cc="bdui.monitor.done-range",dc="bdui.monitor.running_sort";function Uf(){try{let e=window.localStorage.getItem(cc);return Mt(e)?e:It}catch{return It}}function jf(e){try{window.localStorage.setItem(cc,e)}catch{}}function Wf(){try{return window.localStorage.getItem(dc)==="repo"?"repo":"started"}catch{return"started"}}function zf(e){try{window.localStorage.setItem(dc,e)}catch{}}var uc="tab:monitor:pipeline",Hf=1e3,Gf=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function lc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
  </div>`}function pc(e,t){let r=it("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.now||(()=>Date.now()),d=t.confirm||(P=>typeof globalThis.confirm!="function"||globalThis.confirm(P)),_=Uf(),m=Wf();function h(){let P=Qt.find(H=>H.value===_);return P?P.label:""}let T=document.createElement("div");T.className="mon",e.appendChild(T);let k=jo(null,null),D=new Map,F=null,E=null;async function $(P,H,I,Q,J=!0){if(!o||!I)return null;let fe=await o(P,{...H,root_dir:I,expected_revision:Q});if(fe&&fe.conflict&&J){fe.queue&&D.set(I,fe.queue);let ce=fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:Q;fe=await o(P,{...H,root_dir:I,expected_revision:ce})}return fe&&fe.queue&&I&&D.set(I,fe.queue),fe}function O(P,H){let I=D.get(P),Q=s&&s.get?s.get():null,J=(Array.isArray(Q)?Q:[]).find(ce=>ce?.root_dir===P);return(I||J)?.merge_queue?.find(ce=>ce.bead_id===H)?.continuation_action}async function R(P,H,I,Q){let J=await $(P,H,I,Q),fe=D.get(I)?.revision??J?.queue?.revision??Q;return nr(J,(ce,S)=>$(P,{...H,continuation:ce,decision_token:S},I,fe,!1),{refresh:ce=>$(P,H,I,ce?.queue?.revision??D.get(I)?.revision??fe,!1)})}async function A(P,H,I,Q){let J=await nr({continuation_mismatch:Q},(ce,S)=>$("worker-merge-queue-add",{bead_id:H,continuation:ce,decision_token:S},P,I,!1)),fe=J?.queue?.merge_queue?.find(ce=>ce.bead_id===H)?.continuation_action;J?.applied!==!0&&fe?.continuation===null&&fe.mismatch&&await A(P,H,J.queue.revision,fe.mismatch)}async function B(P,H,I){let Q=await $("worker-discard",P,H,I);if(Q&&Q.discarded===!0){ae(Es(Q),"success",5e3);return}if(Q&&Q.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${Q.reason}`,"error");return}if(Q&&Q.accepted&&Q.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Q&&Q.accepted){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${Q.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Q&&!Q.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function V(P,H,I){return!o||!I?null:await o(P,{...H,root_dir:I})}async function re(P){if(!o||!P&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let H=await o("monitor-auto-toggle",{on:P}),I=H&&Array.isArray(H.failed)?H.failed:[];I.length>0&&ae(`\uC790\uB3D9\uD654 ${P?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${I.map(Q=>Q.root_dir).join(", ")}`,"error",3200)}async function ve(){let P=new Map;for(let H of k.pr_wait)P.has(H.root_dir)||P.set(H.root_dir,H.expected_revision);for(let[H,I]of P)await $("worker-merge-queue-add-all",{},H,I)}let ee=null,de=!1,$e=null;function Be(){$e!==null&&clearTimeout($e),$e=setTimeout(()=>{$e=null,de=!1},0)}function Le(P){let H=P.target;return typeof H?.closest=="function"?H.closest(".mon-group"):null}function ze(P){let H=Le(P);return!H||!ee?null:(H.getAttribute("data-root-dir")||"")===ee.root_dir?H:null}function Ve(){for(let P of Array.from(T.querySelectorAll(".mon-group--drag-over")))P.classList.remove("mon-group--drag-over")}function Ge(P){let H=P.target,I=typeof H?.closest=="function"?H.closest('.mon-card[draggable="true"]'):null;if(I){ee={bead_id:I.getAttribute("data-issue-id")||"",lane:I.getAttribute("data-lane")||"",root_dir:I.getAttribute("data-root-dir")||"",revision:Number(I.getAttribute("data-revision")||0)||0,queue_index:Number(I.getAttribute("data-queue-index")),queue_length:Number(I.getAttribute("data-queue-length")),place_index:Number(I.getAttribute("data-place-index"))},de=!0;try{P.dataTransfer?.setData("text/plain",ee.bead_id),P.dataTransfer&&(P.dataTransfer.effectAllowed="move")}catch{}}}function Ne(P){let H=ze(P);H&&(P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="move"),H.classList.add("mon-group--drag-over"))}function we(P){Le(P)?.classList.remove("mon-group--drag-over")}function Ce(){ee=null,Ve(),Be()}function ye(P){let H=ze(P),I=ee;if(ee=null,Ve(),!H||!I||!I.bead_id)return;P.preventDefault();let Q=P.target,J=typeof Q?.closest=="function"?Q.closest('.mon-card[data-lane="queue"]'):null,fe=J&&H.contains(J)?Number(J.getAttribute("data-queue-index")):NaN;if(I.lane==="runnable"){let N=Number.isFinite(fe)?fe:I.place_index;if(!Number.isFinite(N))return;$("worker-queue-place",{bead_id:I.bead_id,index:N},I.root_dir,I.revision);return}if(I.lane!=="queue"||J&&J.getAttribute("data-issue-id")===I.bead_id)return;let ce=I.queue_index,S=Number.isFinite(fe)?ce>fe?fe:fe-1:I.queue_length-1;!Number.isFinite(S)||S<0||S===ce||$("worker-queue-reorder",{bead_id:I.bead_id,to_index:S},I.root_dir,I.revision)}function K(P){let H={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return i`${oc({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},running_sort:m,done_range:_,token_total:ic(k.done),token_tooltip:ac(h())})}
      <div class="worker-lanes mon-lanes">
        ${Gf.map(I=>{let Q=H[I.lane],J=I.lane==="queue"?k.queue_groups.length>0?i`${k.queue_groups.map(fe=>i`<div
                        class="mon-group"
                        data-root-dir=${fe.root_dir}
                      >
                        ${sc(fe)}
                        <div class="mon-group__list">
                          ${fe.items.map(ce=>lc(ce,P))}
                        </div>
                      </div>`)}`:void 0:Q.length>0?i`${Q.map(fe=>lc(fe,P))}`:void 0;return Yt({id:`monitor-${I.lane}`,lane:I.pane,title:I.lane==="done"?`\uC644\uB8CC\xB7${h()}`:I.title,items:Q,empty:I.empty,body:J,live:I.lane==="running"&&Q.length>0,header_control:I.lane==="pr_wait"&&Q.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function z(){let P=s&&s.get?s.get():null,H=s&&s.getWorkspacesState?s.getWorkspacesState():[],I=c();k=jo(P,H,{done_since:Er(_,I),running_sort:m}),We(K(I),T)}function Ee(P,H){let I=a?a():void 0;if(!H||!I||H===I||!l){n(P);return}l(H).then(()=>{n(P)}).catch(Q=>{r("workspace switch for %s failed: %o",H,Q)})}function se(P){return{root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0}}function ie(P,H){let{root_dir:I,revision:Q}=se(P),J=P.getAttribute("data-issue-id")||"",fe=H.dataset.attemptId||P.getAttribute("data-attempt-id")||"",ce=H.classList;if(ce.contains("worker-card__place")){$("worker-queue-place",{bead_id:J,index:Number(P.getAttribute("data-place-index")||0)||0},I,Q);return}if(ce.contains("mon-op--up")||ce.contains("mon-op--down")){let S=Number(P.getAttribute("data-queue-index")||0)||0,N=ce.contains("mon-op--up")?S-1:S+1;if(N<0)return;$("worker-queue-reorder",{bead_id:J,to_index:N},I,Q);return}if(ce.contains("mon-op--remove")){$("worker-queue-remove",{bead_id:J},I,Q);return}if(ce.contains("mon-op--pause")){V("worker-attempt-pause",{attempt_id:fe},I);return}if(ce.contains("mon-op--discard")){if(!d(wn(J,"unmerged")))return;B({bead_id:J,...fe?{attempt_id:fe}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},I,Q);return}if(ce.contains("mon-op--resume")){R("worker-attempt-resume",{attempt_id:fe},I,Q);return}if(ce.contains("mon-op--dismiss")){$("worker-attempt-dismiss",{attempt_id:fe},I,Q);return}if(ce.contains("worker-mini__merge")){let S=O(I,J);S?.mismatch&&S.continuation===null?A(I,J,Q,S.mismatch):$("worker-merge-queue-add",{bead_id:J},I,Q);return}if(ce.contains("worker-mini__merge-cancel")){$("worker-merge-queue-remove",{bead_id:J},I,Q);return}if(ce.contains("worker-mini__discard")){let S=H.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(wn(J,S)))return;B({bead_id:J,...fe?{attempt_id:fe}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},I,Q);return}if(ce.contains("worker-mini__revise-fix")){R("worker-revise-fix",{bead_id:J},I,Q);return}ce.contains("worker-mini__revise-approve")&&$("worker-revise-approve",{bead_id:J},I,Q)}function j(P){let H=de;de=!1;let I=P.target;if(!I||typeof I.closest!="function"||I.closest("dialog")||I.closest("a"))return;let Q=I.closest(".mon-running-sort");if(Q){P.preventDefault(),m=Q.getAttribute("data-sort")==="repo"?"repo":"started",zf(m),z();return}let J=I.closest(".mon-auto-all");if(J){P.preventDefault(),re(J.getAttribute("data-on")==="true");return}if(I.closest(".mon-merge-all")){P.preventDefault(),ve();return}let ce=I.closest(".mon-ctl--advance");if(ce){P.preventDefault();let{root_dir:Se,revision:w}=se(ce);$("worker-automation-toggle",{on:ce.getAttribute("data-on")==="true"},Se,w);return}let S=I.closest(".mon-ctl--merge-auto");if(S){P.preventDefault();let{root_dir:Se,revision:w}=se(S);$("worker-merge-auto-toggle",{on:S.getAttribute("data-on")==="true"},Se,w);return}let N=I.closest(".mon-card");if(!N)return;let Z=I.closest("button");if(Z){P.preventDefault(),ie(N,Z);return}let oe=N.getAttribute("data-issue-id");oe&&!H&&(P.preventDefault(),Ee(oe,N.getAttribute("data-root-dir")||""))}function U(P){let H=P.target;if(!H||typeof H.closest!="function")return;let I=H.closest(".mon-done-range");if(I){_=Mt(I.value)?I.value:It,jf(_),z();return}let Q=H.closest(".mon-slots__input");if(!Q)return;let{root_dir:J,revision:fe}=se(Q),ce=Number(Q.value);if(!Number.isFinite(ce))return;let S=Math.max($n,Math.floor(ce));$("worker-queue-set-slots",{slots:S},J,fe)}e.addEventListener("click",j),e.addEventListener("change",U),e.addEventListener("dragstart",Ge),e.addEventListener("dragover",Ne),e.addEventListener("dragleave",we),e.addEventListener("drop",ye),e.addEventListener("dragend",Ce),s&&typeof s.subscribe=="function"&&(F=s.subscribe(()=>{try{D.clear(),z()}catch{}}));function ge(){E!==null&&(clearInterval(E),E=null)}function xe(){$e!==null&&(clearTimeout($e),$e=null)}return{load(){r("load"),z(),E===null&&(E=setInterval(()=>{try{z()}catch{}},Hf))},pause(){ge()},clear(){ge(),xe(),F&&(F(),F=null),e.removeEventListener("click",j),e.removeEventListener("change",U),e.removeEventListener("dragstart",Ge),e.removeEventListener("dragover",Ne),e.removeEventListener("dragleave",we),e.removeEventListener("drop",ye),e.removeEventListener("dragend",Ce),e.replaceChildren()}}}function fc(e,t,r){let n=it("views:nav"),s=null;function o(c){return d=>{d.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),d=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
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
    `}function l(){We(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),We(i``,e)}}}var _c=["bug","feature","task","epic","chore"];function mc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var gc=["Critical","High","Medium","Low","Backlog"];function hc(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function T(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let B of _c){let V=document.createElement("option");V.value=B,V.textContent=mc(B),o.appendChild(V)}a.replaceChildren();for(let B=0;B<=4;B+=1){let V=document.createElement("option");V.value=String(B);let re=gc[B]||"Medium";V.textContent=`${B} \u2013 ${re}`,a.appendChild(V)}}T();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function D(A){s.disabled=A,o.disabled=A,a.disabled=A,l.disabled=A,c.disabled=A,_.disabled=A,m.disabled=A,m.textContent=A?"Creating\u2026":"Create"}function F(){d.textContent=""}function E(A){d.textContent=A}function $(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let B=window.localStorage.getItem("beads-ui.new.priority");B&&/^\d$/.test(B)?a.value=B:a.value="2"}catch{o.value="",a.value="2"}}function O(){let A=o.value||"",B=a.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),B.length>0&&window.localStorage.setItem("beads-ui.new.priority",B)}async function R(){F();let A=String(s.value||"").trim();if(A.length===0){E("Title is required"),s.focus();return}let B=Number(a.value||"2");if(!(B>=0&&B<=4)){E("Priority must be 0..4"),a.focus();return}let V=String(o.value||""),re=String(c.value||""),ve={title:A};V.length>0&&(ve.type=V),String(B).length>0&&(ve.priority=B),re.length>0&&(ve.description=re),D(!0);try{await t("create-issue",ve)}catch{D(!1),E("Failed to create issue");return}O(),D(!1),k()}return r.addEventListener("cancel",A=>{A.preventDefault(),k()}),h.addEventListener("click",()=>k()),_.addEventListener("click",()=>k()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),R())}),n.addEventListener("submit",A=>{A.preventDefault(),R()}),{open(){n.reset(),F(),$();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var Vf=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Yf(e,t){return to(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function bc(e,t,r){return i`
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
  `}var Kf=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Kt="";function Zt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function wc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(w=>ae(w,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="session",c=!1,d="",_={},m={},h=[],T=!1,k=null,D={},F="",E="",$=!1,O=!1,R=!1,A=null;function B(){let w=t.queueStore?.get();return Zt(w)?w.runner_catalog:null}function V(){let w=t.implPresetStore?.get();return Zt(w)&&Array.isArray(w.presets)?w:null}async function re(){T=!0,J();try{let w=await r("get-session-defaults",{});_=Zt(w?.values)?{...w.values}:{},m={..._},h=Array.isArray(w?.warnings)?w.warnings:[]}catch(w){h=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${w instanceof Error?w.message:String(w)}`)}finally{T=!1,J()}}async function ve(){let w=bl(_,m);if(Object.keys(w).length!==0){try{let M=await r("set-session-defaults",{values:w});_=Zt(M?.values)?{...M.values}:{},m={..._},h=Array.isArray(M?.warnings)?M.warnings:[]}catch(M){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}J()}}function ee(w,M){M===Kt?delete m[w]:m[w]=M,J(),ve()}async function de(){let w=t.queueStore?.get();if(!Zt(w))return;let M={orchestration_model:w.orchestration_model??null,orchestration_effort:w.orchestration_effort??null,orchestration_speed:w.orchestration_speed??null},ue=yl(M,{...M,...D});if(Object.keys(ue).length!==0){try{let Fe=await r("worker-queue-set-orchestration-defaults",{expected_revision:w.revision,values:ue});if(Fe&&Fe.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}D={}}catch(Fe){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Fe instanceof Error?Fe.message:String(Fe)}`)}J()}}function $e(w,M){D[w]=M===Kt?null:M,J(),de()}async function Be(w){let M=t.queueStore?.get();if(!(!Zt(M)||w<1)){try{await r("worker-queue-set-slots",{expected_revision:M.revision,slots:w})}catch(ue){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${ue instanceof Error?ue.message:String(ue)}`)}J()}}function Le(){let w={};for(let M of ml){let ue=m[M];typeof ue=="string"&&ue.length>0&&(w[M]=ue)}return w}async function ze(){let w=V();if(!w)return;let M=Le();if(Object.keys(M).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ue=(w.presets||[]).find(Oe=>Oe.id===F),Fe=E.trim()||(ue?ue.name:"");if(!Fe){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Oe=ue?await r("impl-preset-update",{expected_revision:w.revision,id:ue.id,name:Fe,settings:M}):await r("impl-preset-create",{expected_revision:w.revision,name:Fe,settings:M});if(Oe&&Oe.applied){if(E="",!ue&&Array.isArray(Oe.presets)){let he=Oe.presets.find(Ye=>Ye.name===Fe);F=he?he.id:F}J()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),J()}catch(Oe){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Oe instanceof Error?Oe.message:String(Oe)}`)}}async function Ve(){let w=V();if(!(!w||F.length===0))try{let M=await r("impl-preset-delete",{expected_revision:w.revision,id:F});M&&M.applied?(F="",J()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),J())}catch(M){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}}async function Ge(){let w=V();if(!(!w||F.length===0)){try{let M=await r("apply-impl-preset-global",{preset_id:F,expected_revision:w.revision});M&&M.applied?(_=Zt(M.values)?{...M.values}:{},m={..._},h=Array.isArray(M.warnings)?M.warnings:[]):M&&M.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(M){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}J()}}async function Ne(){O=!0,R=!1,J();try{let w=await r("get-worker-system-prompt",{});!w||typeof w!="object"||Array.isArray(w)?R=!0:A=w}catch{R=!0}finally{O=!1,J()}}function we(){if($=!$,$&&!A){Ne();return}J()}function Ce(){let w=Vr({loading:O,error:R});if(w)return w;if(!A)return"";let M=Array.isArray(A.variants)?A.variants:[];return i`<div class="settings-dialog__sp-body">
      ${A.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${A.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${M.map(ue=>i`<div class="settings-dialog__sp-variant" data-variant=${ue.key}>
            <div class="settings-dialog__sp-cond">${ue.condition}</div>
            ${lr(ue.label,ue.system_prompt)}
          </div>`)}
    </div>`}function ye(){return i`<section
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
        @click=${we}
      >
        ${$?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${$?Ce():""}
    </section>`}function K(w,M,ue,Fe,Oe,he){let Ye=Oe[w]??Kt;return i`<select
      class=${Ye===Kt?"settings-dialog__unset":""}
      data-key=${w}
      aria-label=${M}
      ?disabled=${he===!0}
      .value=${Mr(String(Ye))}
      @change=${st=>Fe(w,String(st.target.value))}
    >
      <option value=${Kt} ?selected=${Ye===Kt}>(기본)</option>
      ${ue.map(st=>i`<option value=${st} ?selected=${st===Ye}>
            ${st===Nt?"\uC790\uB3D9":st}
          </option>`)}
    </select>`}function z(w,M,ue,Fe,Oe,he=!1){return i`<div
      class=${`settings-dialog__row${he?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${M}</span>
      <span class="settings-dialog__controls">
        ${K(w,M,ue,Fe,Oe,he)}
      </span>
    </div>`}function Ee(w,M,ue,Fe,Oe){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${M}-on)`}
        ></i>
        ${w}
      </span>
      <span class="settings-dialog__controls">
        ${K(ue,`${w} \uBAA8\uB378`,Fe,ee,m,!1)}
        ${K(Oe,`${w} effort`,vs,ee,m,!1)}
      </span>
    </div>`}function se(){let w=B(),M=hl(m),ue=m.impl_runtime,Fe=m.impl_model,Oe=V();return i`
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
        ${T?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
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
                        @click=${()=>ee("workflow_mode",Kt)}
                      >
                        (기본)
                      </button>
                      ${bs.map(he=>i`<button
                            type="button"
                            data-mode=${he}
                            aria-pressed=${String(m.workflow_mode===he)}
                            @click=${()=>ee("workflow_mode",he)}
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
                ${Ee("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",yn,"spec_review_effort")}
                ${Ee("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",ys,"plan_review_effort")}
                ${Ee("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",yn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${z("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",gs,ee,m)}
                ${z("impl_runtime","\uC704\uC784 \uB300\uC0C1",hs,ee,m,M)}
                ${z("impl_model","\uBAA8\uB378",ws(w,ue),ee,m,M)}
                ${z("impl_effort","effort",Yr(w,ue,Fe),ee,m,M)}
                ${z("impl_speed","\uC18D\uB3C4",bn,ee,m,M)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Mr(F)}
                  @change=${he=>{F=String(he.target.value),J()}}
                >
                  <option value="" ?selected=${F===""}>
                    구현 프리셋…
                  </option>
                  ${(Oe?.presets||[]).map(he=>i`<option
                        value=${he.id}
                        ?selected=${he.id===F}
                      >
                        ${he.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${F.length===0}
                  @click=${Ge}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${F?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Mr(E)}
                  @input=${he=>{E=String(he.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${ze}
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
    `}function ie(){let w=t.queueStore?.get(),M=B(),ue={orchestration_model:D.orchestration_model??(Zt(w)?w.orchestration_model:null),orchestration_effort:D.orchestration_effort??(Zt(w)?w.orchestration_effort:null),orchestration_speed:D.orchestration_speed??(Zt(w)?w.orchestration_speed:null)},Fe=ks(M,k),Oe=Yr(M,k||void 0,ue.orchestration_model||Nt).filter(Ye=>Ye!==Nt),he=Zt(w)&&typeof w.slots=="number"?w.slots:2;return i`
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
                .value=${Mr(k||Kt)}
                @change=${Ye=>{let st=String(Ye.target.value);k=st===Kt?null:st,J()}}
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
          ${z("orchestration_model","\uBAA8\uB378",Fe,$e,ue)}
          ${z("orchestration_effort","effort",Oe,$e,ue)}
          ${z("orchestration_speed","\uC18D\uB3C4",bn,$e,ue)}
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
                  @click=${()=>Be(he-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${he}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Be(he+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${ye()}
      </section>
    `}function j(){let w=n.get();return i`
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
              ${bc(w,s(),P)}
              ${yc(w,d,{onDraft:M=>{d=M},onAdd:H,onRemove:I})}
              ${vc(w,Q)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function U(w){let M=n.get();if(M)try{let ue=await r("display-policy-set",{expected_revision:M.revision,policy:w(M)});ge(ue),ue&&ue.conflict&&ue.policy&&(ue=await r("display-policy-set",{expected_revision:ue.policy.revision,policy:w(ue.policy)}),ge(ue)),ue&&ue.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function ge(w){w&&w.policy&&typeof w.policy=="object"&&n.set(w.policy)}function xe(w){U(w)}function P(w){let M=n.get();if(!M)return;let ue=!Zf(w,M);xe(Fe=>Xf(w,Fe,ue))}function H(){let w=d.trim();w.length!==0&&(d="",xe(M=>M.hidden_prefixes.includes(w)?{hidden_prefixes:M.hidden_prefixes}:{hidden_prefixes:[...M.hidden_prefixes,w]}),J())}function I(w){xe(M=>({hidden_prefixes:M.hidden_prefixes.filter(ue=>ue!==w)}))}function Q(w){let M=n.get();if(!M)return;let ue=M.chips[w]===!1;xe(()=>({chips:{[w]:ue}}))}function J(){We(i`
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
              @click=${Se}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${se()} ${ie()} ${j()}
          </div>
        </div>
      `,a)}function fe(w){l=w,J()}let ce=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",ce),a.addEventListener("cancel",ce);let S=w=>{w.target===a&&Se()};a.addEventListener("click",S);let N=null;n.subscribe&&(N=n.subscribe(()=>{c&&J()}));let Z=null;t.implPresetStore?.subscribe&&(Z=t.implPresetStore.subscribe(()=>{c&&J()}));function oe(w="session"){c||(c=!0,t.onOpenChange?.(!0),l=w,d="",D={},J(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),re())}function Se(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:oe,close:Se,sessionDraft:()=>({...m}),destroy(){c=!1,a.removeEventListener("close",ce),a.removeEventListener("cancel",ce),a.removeEventListener("click",S),N&&(N(),N=null),Z&&(Z(),Z=null),a.remove()}}}function Zf(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Xf(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Qf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function kc(e){return String(e).padStart(2,"0")}function Jf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function e_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${kc(n.getHours())}:${kc(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Qf[n.getMonth()]} ${n.getDate()} ${o}`;return`${Jf(r,t)} \xB7 ${l}`}function t_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var $c=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function xc(e){let t=!1,r=null,n=new Map;function s(){We(i``,e),e.hidden=!0}function o(){let c=$c.filter(_=>n.has(_.key));if(c.length===0){s();return}let d=Date.now();We(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(_=>{let m=n.get(_.key),h=typeof m.ageSeconds=="number"&&m.ageSeconds>600,T=h?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${_.label} usage`}
          >
            <span class="usage-meter__provider">${_.label}</span>
            ${m.windows.map(k=>{let D=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,F=Math.min(100,Math.max(0,D)),$=`resets ${e_(k.resetsAt,d)}${h?` \xB7 ${T}`:""}`;return i`<span
                class="usage-meter__window ${t_(F)}"
                style=${`--progress: ${F}%`}
                title=${$}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${F}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let d=await fetch(c.endpoint);if(!d.ok)return null;let _=await d.json();return!_||_.available!==!0||!Array.isArray(_.windows)?null:_}catch{return null}}async function l(){let c=await Promise.all($c.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of c)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var r_="worker-ineligible";function Ho(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Sc(e){return Ho(e).includes(r_)}var n_="worker-serial";function Go(e){return Ho(e).includes(n_)}function Vo(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var s_=new Set(["done","failed","orphaned","stopped","discarded"]);function Ac(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,l=new Map,c=!1,d=null,_=null;function m(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function h(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function T(){let S=m(),N=new Set;for(let Z of Object.values(S.attempts||{})){let oe=Z;oe&&typeof oe.bead_id=="string"&&!s_.has(oe.status)&&N.add(oe.bead_id)}for(let Z of Array.isArray(S.pr_wait)?S.pr_wait:[])Z&&typeof Z.bead_id=="string"&&N.add(Z.bead_id);for(let Z of Object.values(S.discard_operations||{})){let oe=Z;oe&&oe.phase!=="done"&&typeof oe.bead_id=="string"&&N.add(oe.bead_id)}return N}function k(S){return S.filter(N=>D(N)===null)}function D(S){let N=m();for(let Z of Array.isArray(N.serial_lanes)?N.serial_lanes:[])if(Array.isArray(Z?.entries)&&Z.entries.some(oe=>oe.bead_id===S))return Z.id;return(Array.isArray(N.queue)?N.queue:[]).some(Z=>Z.bead_id===S)?"parallel":null}function F(S,N){let Z=a.get(S);return Z||[...N.order]}function E(S){if(S.length<2)return!1;let N=D(S[0]);if(!N||N==="parallel")return!1;let Z=m(),oe=(Array.isArray(Z.serial_lanes)?Z.serial_lanes:[]).find(w=>w.id===N)?.entries.map(w=>w.bead_id);if(!Array.isArray(oe))return!1;let Se=S.map(w=>oe.indexOf(w));return Se.every(w=>w>=0)&&Se.every((w,M)=>M===0||w>Se[M-1])}function $(){let S=m(),N=Array.isArray(S.serial_lanes)?S.serial_lanes:[],Z=N.find(oe=>Array.isArray(oe.entries)&&oe.entries.length===0);return Z?Z.id:N[0]?.id||"s1"}function O(S){let N=m().bead_titles||{};return typeof N[S]=="string"?N[S]:S}async function R(S,N){if(!s||c)return null;c=!0,xe();try{return await s(S,N)}finally{c=!1,xe()}}async function A(S){n?.setPending?.(!0);try{let N=await R("worker-parallel-analysis-start",{force:S});N&&N.applied===!1&&N.reason&&ae(`\uBD84\uC11D \uC2E4\uD328: ${N.reason}`,"error",2800)}finally{n?.setPending?.(!1)}}async function B(){let S=h().job;!s||!S||await s("worker-parallel-analysis-cancel",{job_id:S.job_id})}function V(){return m().runner_catalog}function re(S){return Object.keys(V()?.runners?.[S]?.models||{})}function ve(S){let N=re(S),Z=V()?.runners?.[S]?.default_model;return typeof Z=="string"&&N.includes(Z)?Z:N[0]||""}function ee(){let S=h().settings,N=d||S.runner||"claude",Z=re(N),oe=d?ve(N):S.model||Z[0]||"",Se=Vo(V(),N,oe),w=S.effort||"",M=Se.includes(w)?w:Se[0]||"";return{runner:N,model:oe,effort:M,models:Z,efforts:Se}}async function de(S){let N=h().settings,Z=await R("worker-parallel-analysis-settings-update",{expected_revision:N.revision,runner:S.runner,model:S.model,effort:S.effort});(!Z||Z.applied!==!0)&&(d=null,xe(),Z&&Z.reason&&ae(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${Z.reason}`,"error",2800))}function $e(S){d=S,xe();let N=ee();de({runner:S,model:N.model,effort:N.effort})}function Be(S){let N=ee(),Z=Vo(V(),N.runner,S);de({runner:N.runner,model:S,effort:Z.includes(N.effort)?N.effort:Z[0]||""})}function Le(S){let N=ee();de({runner:N.runner,model:N.model,effort:S})}async function ze(S,N){if(!s||c)return;let Z=F(S,N),oe=h();if(Z.length<2||!oe.last_good){ae("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Se=l.get(S)||$(),w=()=>({snapshot_digest:oe.last_good.identity_digest,group_index:S,lane:Se,ordered_bead_ids:Z,expected_revision:m().revision});c=!0,xe();try{let M=await s("worker-parallel-analysis-submit",w());M&&M.queue&&r&&r.set(M.queue),M&&M.applied!==!0&&M.conflict===!0&&(M=await s("worker-parallel-analysis-submit",w()),M&&M.queue&&r&&r.set(M.queue)),M&&M.applied===!0?(a.delete(S),ae(`\uC9C1\uB82C \uB808\uC778 ${Se}\uC5D0 ${Z.length}\uAC1C \uBC30\uCE58`,"success")):ae(`\uC81C\uCD9C \uAC70\uBD80: ${M?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{c=!1,xe()}}function Ve(S,N,Z){a.set(S,F(S,N).filter(oe=>oe!==Z)),xe()}function Ge(S){a.delete(S),xe()}function Ne(S,N,Z,oe){let Se=[...F(S,N)],w=Se.indexOf(Z),M=w+oe;w<0||M<0||M>=Se.length||(Se.splice(M,0,...Se.splice(w,1)),a.set(S,Se),xe())}function we(){let S=h().settings,N=Object.keys(V()?.runners||{}),Z=ee();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${oe=>$e(oe.target.value)}
        >
          ${N.map(oe=>i`<option
                value=${oe}
                ?selected=${Z.runner===oe}
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
          @change=${oe=>Be(oe.target.value)}
        >
          ${Z.models.map(oe=>i`<option
                value=${oe}
                ?selected=${Z.model===oe}
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
          @change=${oe=>Le(oe.target.value)}
        >
          ${Z.efforts.map(oe=>i`<option
                value=${oe}
                ?selected=${Z.effort===oe}
              >
                ${oe}
              </option>`)}
        </select>
      </label>
      ${Ce(S)}
    </div>`}function Ce(S){return ye(S)?S.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 카탈로그가 이 러너/모델/effort를 더는 제공하지
        않습니다</span
      >`:S.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:"":i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`}function ye(S){return!!(S.runner&&S.model&&S.effort)}function K(S){return ye(S)&&S.compatible!==!1}function z(S){let N=Math.max(0,Math.floor(S/1e3)),Z=Math.floor(N/60),oe=N%60;return`${Z}:${String(oe).padStart(2,"0")}`}function Ee(S){let N=S.job;if(N){let Z=typeof N.started_at=="number"?N.started_at:0,oe=`${N.runner||"?"}/${N.model||"?"}`,Se=Z?` \xB7 \uACBD\uACFC ${z(Date.now()-Z)}`:"";return i`<span class="pa-meta__progress"
        >분석 중 — ${oe} · effort ${N.effort||"?"}${Se}</span
      >`}return se()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function se(){return n?.isPending?.()===!0}function ie(S){let N=m(),Z=(Array.isArray(N.queue)?N.queue.length:0)+(Array.isArray(N.serial_lanes)?N.serial_lanes:[]).reduce((M,ue)=>M+(Array.isArray(ue.entries)?ue.entries.length:0),0),oe=!!S.job,Se=K(S.settings),w=oe||c||se();return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${Z}</span>
      ${S.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(S.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${Ee(S)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!Se||w}
        @click=${()=>{A(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!Se||w}
        @click=${()=>{A(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!oe}
        @click=${()=>{B()}}
      >
        취소
      </button>
    </div>`}function j(S,N){let Z=F(S,N),oe=T(),Se=Z.filter(he=>oe.has(he)),w=k(Z),M=E(Z),ue=Array.isArray(m().serial_lanes)?m().serial_lanes:[],Fe=l.get(S)||$(),Oe=N.eligible!==!0||Z.length<2||Se.length>0||w.length>0||M||c;return i`<section class="pa-group" data-group-index=${String(S)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${N.confidence}</span>
        ${N.categories.map(he=>i`<span class="pa-group__category">${he}</span>`)}
        ${M?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${N.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${w.length>0?i`<span class="pa-group__stale"
              >stale — ${w.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${N.reason}</p>
      <ol class="pa-group__members">
        ${Z.map((he,Ye)=>i`<li class="pa-member" data-bead-id=${he}>
              <span class="pa-member__seq">${Ye+1}</span>
              <span class="pa-member__title">${O(he)}</span>
              ${oe.has(he)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${he}
                ?disabled=${Ye===0}
                aria-label=${`${he} \uC704\uB85C`}
                @click=${()=>Ne(S,N,he,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${he}
                ?disabled=${Ye===Z.length-1}
                aria-label=${`${he} \uC544\uB798\uB85C`}
                @click=${()=>Ne(S,N,he,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${he}
                aria-label=${`${he} \uC81C\uC678`}
                @click=${()=>Ve(S,N,he)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${N.evidence.map(he=>i`<li class="pa-evidence">
              <code>${he.path}</code>
              <span class="pa-evidence__locator">${he.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Ge(S)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${he=>{l.set(S,he.target.value),xe()}}
          >
            ${ue.map((he,Ye)=>i`<option
                  value=${he.id}
                  ?selected=${Fe===he.id}
                >
                  직렬 ${Ye+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Oe}
          @click=${()=>{ze(S,N)}}
        >
          제출
        </button>
      </footer>
    </section>`}function U(S){let N=Array.isArray(S.issues)?S.issues:[],Z=N.filter(Se=>Se.verdict==="parallel_ok").length,oe=N.filter(Se=>Se.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${Z}</span>
      <span>uncertain ${oe}</span>
    </div>`}function ge(){let S=P&&!!h().job;if(S&&_===null){_=setInterval(()=>xe(),1e3);return}!S&&_!==null&&(clearInterval(_),_=null)}function xe(){let S=h();d&&S.settings.runner===d&&(d=null);let N=S.last_good?.result;ge(),We(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${ce}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${we()} ${ie(S)}
            ${N?i`${N.groups.map((Z,oe)=>j(oe,Z))}
                ${N.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${U(N)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let P=!1,H=()=>{P=!1,ge()},I=S=>{S.target===S.currentTarget&&ce()};o.addEventListener("close",H),o.addEventListener("cancel",H),o.addEventListener("click",I);let Q=null;r&&r.subscribe&&(Q=r.subscribe(()=>{P&&xe()}));let J=null;n&&n.subscribe&&(J=n.subscribe(()=>{P&&xe()}));function fe(){P||(P=!0,xe(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function ce(){P&&(P=!1,ge(),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:fe,close:ce,destroy(){P=!1,_!==null&&(clearInterval(_),_=null),o.removeEventListener("close",H),o.removeEventListener("cancel",H),o.removeEventListener("click",I),Q&&(Q(),Q=null),J&&(J(),J=null),o.remove()}}}function Ec(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{});function s(){return t&&t.get()||{}}function o(){let $=s();return typeof $.revision=="number"?$.revision:0}function a($){t&&$&&$.queue&&typeof $.queue=="object"&&t.set($.queue)}function l(){let $=s().workspace_info;return $&&typeof $=="object"?$:{}}function c($,O){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${$}"
      >${O}</span
    >`}function d($){if(typeof $!="number"||!Number.isFinite($))return"";let O=$/6e4;return Number.isInteger(O)?`timeout ${O}\uBD84`:`timeout ${Math.round($/1e3)}\uCD08`}function _($){let O=d($);return O?c("config",O):""}function m($){let O=typeof $.base_sha=="string"?$.base_sha:"",R=`${$.source_path||"repo-ops/config.toml"} @ ${$.base_ref||"?"}${O?`@${O.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${R}</span>
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
    </section>`}function h($){let O=$.repo_ops&&typeof $.repo_ops=="object"?$.repo_ops:null;return O&&(O.status==="resolved"||O.status==="absent")?m(O):O&&(O.status==="pending"||O.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${O.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${O.error_code?i` — <code>${O.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function T($){if(!r)return;let O=await r("worker-auto-repair-toggle",{on:$,expected_revision:o()});if(a(O),O&&O.conflict){let R=await r("worker-auto-repair-toggle",{on:$,expected_revision:o()});a(R)}n()}let k={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function D($,O,R){return i`<div class="worker-repo-ops__policy-group" data-policy=${R}>
      <div class="worker-repo-ops__policy-label">${$}</div>
      <ul class="worker-repo-ops__policy-list">
        ${O.map(A=>i`<li data-token=${A}>
              ${k[A]||A}
            </li>`)}
      </ul>
    </div>`}function F($){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${$.map(O=>{let R=[k[O.trigger]||O.trigger];return Number.isInteger(O.attempts_per_operation_attempt)?R.push(`operation\uB2F9 ${O.attempts_per_operation_attempt}\uD68C`):Number.isInteger(O.attempts)?R.push(`${k[O.budget]||O.budget} ${O.attempts}\uD68C`):Number.isInteger(O.sessions_per_user_action)&&R.push(`${O.sessions_per_user_action}\uD68C`,k[O.user_actions]||O.user_actions),O.applies_when&&R.push(k[O.applies_when]||O.applies_when),i`<li data-token=${O.id}>
            <strong>${k[O.id]||O.id}</strong>
            <span>${R.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function E(){let $=s(),O=$.auto_repair!==!1,R=$.repo_operation_policy&&typeof $.repo_operation_policy=="object"?$.repo_operation_policy:null,A=Array.isArray($.repo_operations)?$.repo_operations:[],B=A.find(ee=>ee.state==="repairing"),V=A.filter(ee=>ee.state==="failed"||ee.state==="repairing"),re=V.length?Math.min(...V.map(ee=>typeof ee.repair?.remaining=="number"?ee.repair.remaining:0)):R?.auto_repair?.resolution_ladder?.find(ee=>ee.id==="auto_repair_session")?.attempts??1,ve=Array.isArray(R?.auto_repair?.resolution_ladder)?R.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${O}
          @change=${ee=>{T(ee.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${O?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${re}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${B?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${B.repair?.owner_bead||B.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${R?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(R.worker_automatic||[]).length} · 해결 사다리
                ${ve.length} · 금지
                ${(R.never_automatic||[]).length}</span
              >
            </summary>
            ${D("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",R.worker_automatic||[],"worker-automatic")}
            ${R.supported===!1||R.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${R.schema_version})`}
                </div>`:F(ve)}
            ${D("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",R.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${h(l())} ${E()}
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
  </section>`}function Oc(e,t={}){let r=null;function n(){We(r?u_(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:a_(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var p_="tab:worker:ready",f_="tab:worker:blocked",__="tab:worker:in-progress",m_="tab:worker:closed",Is=1,Mc=5;function Dc(e){return hn(e).path.length>0}var Fc="beads-ui.worker.candidate-filter",Yo={show_blocked:!1,spec:"all"};function g_(){try{let e=window.localStorage.getItem(Fc);if(!e)return{...Yo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Yo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Yo}}}function h_(e){try{window.localStorage.setItem(Fc,JSON.stringify(e))}catch{}}function b_(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),d=n(l);c&&d?s.push(l):!c&&d?o+=1:c&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var y_=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],qc="bdui.worker.candidate_sort",v_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Ls="spec";function w_(){try{let e=window.localStorage.getItem(qc);return e==="board"||e==="created"||e==="spec"?e:Ls}catch{return Ls}}function k_(e){try{window.localStorage.setItem(qc,e)}catch{}}var Bc="bdui.worker.done-range";function $_(){try{let e=window.localStorage.getItem(Bc);return Mt(e)?e:It}catch{return It}}function x_(e){try{window.localStorage.setItem(Bc,e)}catch{}}var S_="(max-width: 640px)",Uc="beads-ui.worker.lane-collapsed",An={queue:!0,done:!0};function A_(){try{let e=window.localStorage.getItem(Uc);if(!e)return{...An};let t=JSON.parse(e);return!t||typeof t!="object"?{...An}:{queue:typeof t.queue=="boolean"?t.queue:An.queue,done:typeof t.done=="boolean"?t.done:An.done}}catch{return{...An}}}function E_(e){try{window.localStorage.setItem(Uc,JSON.stringify(e))}catch{}}function Pc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function T_(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Cr):(n.sort(jn(r)),t==="board"?n:[...n.filter(Dc),...n.filter(s=>!Dc(s))])}function C_(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function R_(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function I_(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var L_=["closed_unmerged","review","undecidable"],O_=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function M_(e,t){for(let r of O_)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function Nc(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function D_(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function P_(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Ko(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function N_(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function F_(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,d=!0,_=null,m=null,h=null,T={},k=!1,D=!1){let F=!!c&&c.position>0,E=!!c?.continuation_action&&c.continuation_action.continuation===null,$=!!c&&c.active===!0,O=c&&c.failure||null,R=r[e]||null,A=R&&R.gate?R.gate:null,B=R&&R.pr?R.pr:null,V=N_(h),re=D_(c?c.resolution:null),ve=P_(c?c.head_review:null),ee=c&&c.head_review||null,de=c&&c.authority||null,$e=!!ee&&["pending","reviewing","revising"].includes(ee.state),Be=F&&!$&&(ee?.state==="failed"||!de||de.source==="automatic"&&!D),Le=[];l&&Le.push("\uC138\uC158");let ze=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":re?re.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Ve=M_(l&&A&&A.tier==="closed_unmerged"?"\uB2EB\uD798":A&&A.gate_badge||"",ze?null:o&&o.activity||null);if(ze&&Le.push(ze),ve&&Le.push(ve.badge),Ve.label&&Le.push(Ve.label),A&&A.base_badge&&A.base_badge!==A.gate_badge&&Le.push(A.base_badge),m&&Le.push(m),n){let ie=Dr(n.step);Le.push(ie?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${ie}`:"\uC815\uB9AC \uBA48\uCDA4")}V&&Le.push(V.badge),F&&!$&&Le.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),O&&Le.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Nc(O)}`),E&&Le.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),_&&Le.push(`\uC790\uB3D9 \uC81C\uC678: ${Nc(_)}`);let Ge=!!A&&A.base_badge==="\uCDA9\uB3CC",Ne=!!A&&A.enabled===!0,we=Do(o&&o.merge_progress?o.merge_progress.step:null),Ce=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!A&&A.tier==="merged",ye=l&&!!n&&!!A&&A.tier==="merged",K=l&&Ge&&d===!1,z=er(T,e,{external:l,merge_active:$||!!we,merge_queued:F,conflict_active:!!a,cleanup_active:!1,merged:!!n||A?.tier==="merged"}),Ee=!!z.operation,se=!Ce&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?Ts(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:l,pr_number:B&&typeof B.number=="number"?B.number:null,pr_url:B&&typeof B.url=="string"?B.url:"",completion_badge:V?V.badge:null,completion_title:V?V.title:"",completion_repair_pr_url:V?V.repair_pr_url:"",completion_repair_pr_number:V?V.repair_pr_number:null,badges:Le,live_badge:a==="paused"?null:re?.live||a==="running"?ze:ve?.live?ve.badge:Ve.live?Ve.label:null,usage:s,alert:!!A&&L_.includes(A.tier)||!!n||!!O||!!(ve&&ve.alert)||!!(V&&V.alert),merge_action:se?!1:!F||E||Be,timeline_action:se,cancel_action:F&&!E,cancel_enabled:(!$||$e)&&!(V&&V.lock_actions),cancel_title:V&&V.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":$&&!$e?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":$e?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:z,discard_action:z.action,merge_step:we,discard_enabled:z.enabled,discard_title:z.title,merge_enabled:!we&&!a&&!Ee&&!(V&&V.lock_actions)&&!K&&!se&&(Ne||Ge||Ce||ye||Be),merge_label:E?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ce||ye?"\uC815\uB9AC \uC7AC\uAC1C":Ge&&!we&&!Ce?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":Be?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ee?z.error?`\uD3D0\uAE30 \uC2E4\uD328: ${z.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${z.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:E?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":we?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${we.label}`:ye?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":K?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ce?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ge?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Ne?`\uBA38\uC9C0 (${A.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:A&&A.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${A&&A.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Zo(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:d,doneRange:_,onDoneRangeChange:m}=t,h=n?zn(n,l):null,T=Gn({transport:r,uiOrderStore:l}),k=null,D=[],F=g_(),E=w_(),$=Mt(_)?_:$_(),O=new Map;function R(){let p=Qt.find(y=>y.value===$);return p?p.label:"\uC624\uB298"}let A=A_(),B=!1,V=new Set,re=new Set,ve=new Set,ee=new Set,de=[],$e=document.createElement("div");$e.className="worker-console";let Be=document.createElement("div");Be.className="worker-top";let Le=document.createElement("div");Le.className="worker-drawer-overlay",Le.hidden=!0;let ze=document.createElement("div");ze.className="worker-drawer-overlay__backdrop";let Ve=document.createElement("div");Ve.className="worker-drawer-host";let Ge=document.createElement("div");Ge.className="worker-drawer-host",Ge.hidden=!0,Le.append(ze,Ve,Ge);let Ne=document.createElement("div");Ne.className="worker-lanes-host",$e.append(Be,Le,Ne),e.appendChild($e);let we=null,Ce=fs(Ve,{transport:r,sessionLogStore:a,onClose:()=>{we=null,Le.hidden=!0,te()}}),ye=Oc(Ge,{onClose:()=>{Ge.hidden=!0,Le.hidden=!0,te()}}),K=Ec({queueStore:s,transport:r,onChanged:()=>te()}),z=o?Ac($e,{queueStore:s,analysisStore:o,transport:r}):null;function Ee(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Is,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function se(){let p=Ee();return typeof p.revision=="number"?p.revision:0}function ie(p){p&&p.queue&&s&&s.set(p.queue)}function j(){let p=Ee().queue;return Array.isArray(p)?p.length:0}async function U(p,y,x){if(!r)return;let ne=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},index:x,expected_revision:se()}),me=await r("worker-queue-place",ne());ie(me),me&&me.conflict&&await r("worker-queue-place",ne()).then(ie)}async function ge(p,y,x){if(!r)return;let ne=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},to_index:x,expected_revision:se()}),me=await r("worker-queue-reorder",ne());ie(me),me&&me.conflict&&await r("worker-queue-reorder",ne()).then(ie)}async function xe(p){if(!r)return;let y=await r("worker-queue-remove",{bead_id:p,expected_revision:se()});ie(y),y&&y.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:se()}).then(ie)}async function P(p){if(!r||!p)return;let y=await r("worker-attempt-pause",{attempt_id:p});y&&y.paused===!1&&y.reason&&ae(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function H(p){if(!r||!p)return;let y=async(ne={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:se(),...ne}),x=await y();ie(x),x&&x.conflict&&(x=await r("worker-attempt-resume",{attempt_id:p,expected_revision:se()}),ie(x)),x=await nr(x,(ne,me)=>y({continuation:ne,decision_token:me}),{onResult:ie,refresh:()=>y()}),x&&x.resumed===!1&&!x.conflict&&x.reason&&ae(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}async function I(p){if(!r||!p)return;let y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:se()});ie(y),y&&y.conflict&&(y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:se()}),ie(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&ae(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Q(p,y,x=!0){if(!r)return null;let ne=r,me=await ne(p,{...y,expected_revision:se()});return ie(me),me&&me.conflict&&x&&(me=await ne(p,{...y,expected_revision:se()}),ie(me)),me}async function J(p){if(!r||!p)return;let y=Ee().merge_queue?.find(ne=>ne.bead_id===p)?.continuation_action;if(y?.mismatch&&y.continuation===null){await ce(p,y.mismatch);return}V.add(p),te();let x;try{x=await Q("worker-merge-queue-add",{bead_id:p})}finally{V.delete(p),te()}!x||x.conflict||x.applied||ae("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function fe(p){if(!(!r||!p||re.has(p))){re.add(p),te();try{let y=await r("worker-cleanup-retry",{bead_id:p,expected_revision:se()});ie(y),y&&!y.retried&&!y.conflict&&y.reason&&ae(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{re.delete(p),te()}}}async function ce(p,y){let x=await nr({continuation_mismatch:y},(me,He)=>Q("worker-merge-queue-add",{bead_id:p,continuation:me,decision_token:He},!1)),ne=x?.queue?.merge_queue?.find(me=>me.bead_id===p)?.continuation_action;if(x?.applied!==!0&&ne?.continuation===null&&ne.mismatch){await ce(p,ne.mismatch);return}x&&x.applied===!1&&!x.conflict&&ae("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function S(p){if(!r)return;let y=await Q("worker-merge-auto-toggle",{on:p});!y||y.conflict||ae(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function N(p){if(!r||!p)return;let y=await Q("worker-merge-queue-remove",{bead_id:p});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ae("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Z(){await Q("worker-merge-queue-remove",{all:!0})}async function oe(p,y=null,x="unmerged",ne=null){if(!r||!p)return;let me=wn(p,x);if(!(!!ne||typeof globalThis.confirm!="function"||globalThis.confirm(me)))return;let G=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...ne?{operation_id:ne}:{},expected_revision:se()});if(ie(G),G&&G.conflict&&(G=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...ne?{operation_id:ne}:{},expected_revision:se()}),ie(G)),G&&G.discarded===!0){ae(Es(G),"success",5e3);return}if(G&&G.reason){ae(`\uD3D0\uAE30 \uC2E4\uD328: ${G.reason}`,"error",2800);return}if(G&&G.accepted&&G.pending==="merged_revert"){ae("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(G&&G.accepted&&!G.discarded){ae(`\uD3D0\uAE30 \uC9C4\uD589: ${G.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}G&&!G.conflict&&ae("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Se(p,y,x){if(!(!r||!y||!x||ee.has(y))){ee.add(y),te();try{let ne=await r(p,{bead_id:y,action_id:x,expected_revision:se()});ie(ne),ne?.conflict?ae("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ne?.ok&&ne?.reason&&ae(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ne.reason)}`,"error",2800)}finally{ee.delete(y),te()}}}async function w(p,y){if(!r||!y||ve.has(y))return;ve.add(y),te();let x;try{let ne=async(me={})=>await r(p,{bead_id:y,expected_revision:se(),...me});x=await ne(),ie(x),x&&x.conflict&&(x=await r(p,{bead_id:y,expected_revision:se()}),ie(x)),p==="worker-revise-fix"&&(x=await nr(x,(me,He)=>ne({continuation:me,decision_token:He}),{onResult:ie,refresh:()=>ne()}))}finally{ve.delete(y),te()}if(!(!x||x.conflict)){if(x.ok){ae(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ae(`\uCC98\uBD84 \uAC70\uBD80: ${x.reason||""}`,"error",3e3)}}async function M(p){if(!r)return;let y=await r("worker-automation-toggle",{on:p,expected_revision:se()});ie(y),y&&y.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:se()}).then(ie)}async function ue(p){if(!r||!p)return;let y=await r("worker-repo-operation-repair",{operation_id:p});if(ie(y),y&&y.ok===!1){ae(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&ae("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Fe(p){if(!r||!p)return;let y=await r("worker-repo-operation-dismiss",{operation_id:p});ie(y),y&&y.ok===!1&&ae(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function Oe(p){if(!r||!Number.isFinite(p))return;let y=Math.max(Is,Math.floor(p)),x=await r("worker-queue-set-slots",{slots:y,expected_revision:se()});ie(x),x&&x.conflict&&await r("worker-queue-set-slots",{slots:y,expected_revision:se()}).then(ie)}async function he(p){if(!r||!Number.isInteger(p)||p<1||p>Mc)return;let y=Ee(),x=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(p).reduce((He,G)=>He+(Array.isArray(G?.entries)?G.entries.length:0),0),ne=()=>({count:p,expected_revision:se()}),me=await r("worker-queue-set-serial-lane-count",ne());ie(me),me&&me.conflict&&(me=await r("worker-queue-set-serial-lane-count",ne()),ie(me)),me&&me.applied&&x>0&&ae(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${x}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Ye(){let p=Ee(),y=h?h.selectBoardColumn(p_,"ready"):[],x=h?h.selectBoardColumn(f_,"blocked"):[],ne=h?h.selectBoardColumn(m_,"closed"):[],me=h?h.selectBoardColumn(__,"in_progress"):[],He=new Map;for(let g of me){let L=R_(g);if(!L)continue;let le=He.get(L);le?le.push(g):He.set(L,[g])}let G=g=>{let L=Hn(He.get(g)||[]);return L?L.title||L.id:null},b=p.bead_titles||{},q=new Map;for(let[g,L]of Object.entries(b))typeof L=="string"&&L.length>0&&q.set(g,L);for(let g of[...y,...x])q.set(g.id,g.title||g.id);let pe=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},qe=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Ke=new Map;for(let[g,L]of Object.entries(qe))Array.isArray(L)&&Ke.set(g,Go(L));for(let g of[...y,...x]){let L=g.labels;Array.isArray(L)&&!Ke.has(g.id)&&Ke.set(g.id,Go(L))}let Ze=new Map,ke=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(ke)?ke:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let L=g.members.map(Ue=>{let ut=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Rt=>Rt.entries.some(pt=>pt.bead_id===Ue));return ut?ut.id:null});if(!(L.every(Ue=>Ue!==null)&&new Set(L).size===1))for(let Ue of g.members)Ze.set(Ue,g.members.filter(ut=>ut!==Ue))}let v=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},f=new Map;for(let[g,L]of Object.entries(pe))L&&typeof L=="object"&&f.set(g,L);for(let g of[...y,...x])f.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let u=g=>f.get(g)||{},C=p.pr_wait||[],Y=p.pr_observations||{},be=p.pr_activity||{},Me=p.cleanup_failed||{},Ae=Object.entries(Me).map(([g,L])=>({bead_id:g,step:L&&L.step?L.step:"",reason:L&&L.reason?L.reason:"",at:L&&typeof L.at=="number"?L.at:null,detail:L&&typeof L.detail=="string"?L.detail:null,output_tail:L&&typeof L.output_tail=="string"&&L.output_tail?L.output_tail:void 0,log_path:L&&typeof L.log_path=="string"&&L.log_path?L.log_path:void 0,retry_count:L&&typeof L.retry_count=="number"&&Number.isInteger(L.retry_count)&&L.retry_count>0?L.retry_count:0,failure_code:L&&typeof L.failure_code=="string"?L.failure_code:void 0,subject_id:L&&typeof L.subject_id=="string"?L.subject_id:void 0,repair_eligible:!!(L&&L.repair_eligible),repair:L&&L.repair?L.repair:void 0})),_t=p.queue||[],Re=new Set([..._t.map(g=>g.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(L=>L.bead_id)),...C.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),dt=new Set(x.map(g=>g.id)),Zr=l?l.get()?.order||{}:{},ea=new Set,ta=[];for(let g of[...y,...x])Re.has(g.id)||ea.has(g.id)||C_(g)||Sc(g.labels)||(ea.add(g.id),ta.push(g));D=T_(ta,E,Zr);let ed=p.admission||{},ra=g=>{let L=ed[g];if(!L)return"";if(L.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof L.reason=="string"?L.reason:"",Ue=le.indexOf(":");return Ue>0&&Ue<le.length-1?`\u26D4 ${le.slice(0,Ue)} (${le.slice(Ue+1)})`:`\u26D4 ${le}`},td=D.map(g=>{let L=hn(g),le=L.path.length>0,Ue=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",ut=!Ue&&le&&!L.conflict,Rt=dt.has(g.id),pt=[];Rt&&pt.push(I_(g)),Ue?pt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):L.conflict?pt.push("spec_id_conflict"):le||pt.push("spec \uC5C6\uC74C");let nt=ra(g.id);return nt&&pt.push(nt),{id:g.id,title:g.title||g.id,reason:pt.join(" \xB7 "),draggable:ut,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ue,status:g.status,blocked:Rt,has_spec:le}}),Os=b_(td,F),rd=Os.visible,nd=p.revise_parked||{},En=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ms=(g,L)=>g.map((le,Ue)=>{let ut=L!=="done",Rt=L!=="done"&&L!=="queue",pt=ut?nd[le.bead_id]:null,nt=ut?er(En,le.bead_id):null,On=nt?.operation?nt:null,gd=ut&&Ke.get(le.bead_id)===!0,Aa=v[le.bead_id]||[],Us=p.admission&&typeof p.admission=="object"?p.admission[le.bead_id]:null,js=ut?Ul(Us,!!On||ee.has(le.bead_id)):null,hd=ut&&!js?ra(le.bead_id):null,bd=ut?[hd]:[],Ea=ut&&Aa.length>0&&typeof Us?.reason=="string"&&Us.reason.startsWith("not_ready")?[`\u23F8 ${Aa.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Ws=ut?Ze.get(le.bead_id):void 0;return Ws&&Ws.length>0&&Ea.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Ws.join(", ")}\uC640`),{id:le.bead_id,title:q.get(le.bead_id)||le.bead_id,reason:bd.filter(Boolean).join(" \xB7 "),draggable:ut&&!On&&!js,done:L==="done",lane:L,seq:Rt?Ue+1:void 0,worker_serial:gd,discard:On,stale_work:js,badges:[...Ea,...pt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!pt,revise_action:!!pt,revise_enabled:!!pt&&!On&&!ve.has(le.bead_id),revise_title:pt?pt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${pt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:L==="done"?Dt(p.attempts||{},le.bead_id):null,done_at:L==="done"&&typeof le.added_at=="number"?le.added_at:void 0,...u(le.bead_id)}}),na=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&na.set(g.bead_id,g.added_at);let Nr=p.attempts?Object.values(p.attempts):[],Ds=new Set;for(let g of Nr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&Ds.add(g.resumed_from);let Ps=new Map;for(let g of Nr)Ps.set(g.bead_id,g.attempt_id);let Ns=new Map;for(let g of Nr)Ns.set(g.attempt_id,g);function Fs(g){let L=new Set,le=g;for(;le&&!L.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;L.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&Ns.get(le.resumed_from)||null}return!1}let Tn=typeof p.declared_base=="string"?p.declared_base:null;function sd(g){let L=null;for(let le of Nr)!le||le.bead_id!==g||Fs(le)||(L===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof L.started_at=="number"?L.started_at:0))&&(L=le);return L&&typeof L.target_base=="string"?L.target_base:null}let sa=[],oa=[],od=g=>{let L=Ps.get(g.bead_id)!==g.attempt_id,le=na.get(g.bead_id),Ue=typeof le=="number"&&le>0&&typeof g.finished_at=="number"&&le>=g.finished_at;return!L&&!Ue&&typeof g.dismissed_at!="number"},aa=g=>{let L=typeof g.session_id=="string"&&g.session_id.length>0,le=Ds.has(g.attempt_id);return{eligible:L&&!le,reason:L?le?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},jt=null;for(let g of Nr){let L=g.status==="paused"&&!Ds.has(g.attempt_id);if(g.status==="running"||L)oa.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:q.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:L,conflict_resolution:Fs(g),base_exception:Ko(Tn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:er(En,g.bead_id,{attempt_id:g.attempt_id}),usage:Dt(p.attempts||{},g.bead_id),current_child:G(g.bead_id),...u(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&od(g)){let le=aa(g);sa.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:q.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:er(En,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:le.eligible,resume_reason:le.reason,conflict_resolution:Fs(g),base_exception:Ko(Tn,g.target_base),usage:Dt(p.attempts||{},g.bead_id),current_child:G(g.bead_id),...u(g.bead_id)}),jt=g}}let Cn=[...sa,...oa],ia=null;if(jt){let g=aa(jt),L=jt.cause_detail;ia={bead_id:jt.bead_id,repo:jt.repo||"",reason:jt.cause||jt.status,cause_detail:L&&typeof L.reason=="string"?{reason:L.reason,command:typeof L.command=="string"?L.command:null}:null,resume_attempt_id:jt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:er(En,jt.bead_id,{attempt_id:jt.attempt_id})}}let la=new Set(Cn.map(g=>g.bead_id)),qs=Array.isArray(p.merge_queue)?p.merge_queue:[],ca=new Map,da=new Map,ua=new Map,pa=new Map,fa=new Map;qs.forEach((g,L)=>{g&&typeof g.bead_id=="string"&&(ca.set(g.bead_id,L+1),da.set(g.bead_id,g.resolution),ua.set(g.bead_id,g.continuation_action||null),pa.set(g.bead_id,g.head_review||null),fa.set(g.bead_id,g.authority||null))});let _a=p.merge_queue_state||{active:null,failures:{}},ad=_a.failures||{},id=p.auto_merge_skips||{},ma=g=>{let L=id[g];if(!L)return null;let le=Y[g],Ue=le&&le.pr?le.pr.head_sha:null;return Ue&&Ue===L.head_sha?L.reason||"":null},Rn=new Map;for(let g of Cn)g.failed!==!0&&g.conflict_resolution&&(g.paused?Rn.has(g.bead_id)||Rn.set(g.bead_id,"paused"):Rn.set(g.bead_id,"running"));let ga=Cn.filter(g=>!g.paused&&g.failed!==!0).length,ha=(p.workspace_info||{}).slots,ba=typeof ha=="number"?ha:typeof p.slots=="number"?p.slots:Is,ld=ga>ba,In=Er($),cd=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>In===void 0||typeof g.added_at!="number"||g.added_at>=In).sort((g,L)=>(L.added_at||0)-(g.added_at||0)),Xr=Ms(cd,"done"),dd=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),ya=[],ud=d?.()||"";for(let g of ne){let L=Rr(g.closed_at);if(typeof g.id!="string"||dd.has(g.id)||L===null||In!==void 0&&L<In||typeof g.comment_count!="number"||g.comment_count<=0)continue;let le=`${ud}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ue=O.get(le);Ue===void 0&&r&&(O.set(le,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(ut=>{let Rt=Array.isArray(ut)&&ut.some(pt=>_s(typeof pt?.text=="string"?pt.text:"")?.lane==="session");O.set(le,Rt?"session":"not-session"),te()}).catch(()=>{O.set(le,"failed"),te()})),Ue==="session"&&ya.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:L,created_at:g.created_at,updated_at:g.updated_at})}Xr.push(...ya),Xr.sort((g,L)=>(L.done_at||0)-(g.done_at||0));let Ln={};for(let g of sr)Ln[g]=0;let va=!1,wa=0,Bs=0,ka=0;for(let g of Xr){let L=g.usage;if(L&&typeof L=="object"){let le=!1;for(let Ue of sr)Number.isFinite(L[Ue])&&(Ln[Ue]+=L[Ue],va=!0,le=!0);le&&(Bs+=1,Number.isFinite(L.total_cost_usd)&&(wa+=L.total_cost_usd,ka+=1))}}Bs>0&&ka===Bs&&(Ln.total_cost_usd=wa);let $a=Xr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),pd=$a.length>0?wt(Jn($a)):va?zt(Ln):null,fd=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},_d=Array.isArray(p.serial_lanes)?p.serial_lanes:[],xa=g=>{if(C.some(Ue=>Ue.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let L=Nr.filter(Ue=>Ue&&Ue.bead_id===g),le=L.length>0?L[L.length-1].status:null;return le==="failed"||le==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":le==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Sa=_d.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,L)=>{let le=fd[g.id]||{},Ue=new Map((Array.isArray(le.corrections)?le.corrections:[]).filter(nt=>nt&&typeof nt.bead_id=="string"&&typeof nt.after=="string").map(nt=>[nt.bead_id,nt.after])),ut=Ms(g.entries.filter(nt=>!la.has(nt.bead_id)),g.id).map(nt=>Ue.has(nt.id)?{...nt,badges:[`\u{1F517} ${Ue.get(nt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...nt.badges]}:nt),Rt=Array.isArray(le.occupied_by)?le.occupied_by.filter(nt=>typeof nt=="string"):[],pt=Rt.map(nt=>({id:nt,title:q.get(nt)||nt,draggable:!1,lane:g.id,ghost:!0,badges:[xa(nt)]}));return{id:g.id,index:L+1,rows:[...pt,...ut],occupied:Rt.length>0,badge:Rt.length>0?xa(Rt[0]):"\uB300\uAE30",cycle:le.cycle===!0}}),md=typeof p.serial_lane_count=="number"?p.serial_lane_count:Sa.length;return{queue:p,idToTitle:q,candidates:rd,candidate_hidden:{blocked:Os.hidden_blocked,spec:Os.hidden_spec},running:Cn,live_count:ga,slots:ba,over_cap:ld,failure:ia,waiting:Ms(_t.filter(g=>!la.has(g.bead_id)),"queue"),serial_lanes:Sa,serial_lane_count:md,pr_wait:C.map(g=>F_(g.bead_id,q.get(g.bead_id)||g.bead_id,Y,Me[g.bead_id]||null,Dt(p.attempts||{},g.bead_id),be[g.bead_id]||(V.has(g.bead_id)||re.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Rn.get(g.bead_id)||null,g.external===!0,{position:ca.get(g.bead_id)||0,active:_a.active===g.bead_id,failure:ad[g.bead_id]||null,resolution:da.get(g.bead_id),continuation_action:ua.get(g.bead_id),head_review:pa.get(g.bead_id)||null,authority:fa.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?ma(g.bead_id):null,Ko(Tn,sd(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ns.get(Ps.get(g.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0)).map(g=>({...g,...u(g.id)})),merge_queue_length:qs.length,merge_queue_running:qs.length>0,auto_excluded:C.map(g=>g.bead_id).filter(g=>ma(g)!==null),declared_base:Tn,done:Xr,token_total:pd,cleanup_failures:Ae,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function st(){let y=!!o?.get()?.job,x=!y&&o?.isPending?.()===!0,ne=y?"\uBD84\uC11D \uC911":x?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${ne?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${ne?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${ne?i`<span class="worker-analysis-btn__badge">${ne}</span>`:""}
    </button>`}function kt(p){let y=p.waiting.length>0?p.waiting[0].id:"\u2014",x=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ne=mt(p),me=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",He=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${R()} 완료 <b>${p.done.length}</b></span
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
          ${Array.from({length:Mc},(qe,Ke)=>Ke+1).map(qe=>i`<option
                value=${String(qe)}
                ?selected=${p.serial_lane_count===qe}
              >
                ${qe}
              </option>`)}
        </select>
      </label>
      ${o?st():""} `,q=Kl({failure:p.failure}),pe=Bl(p.repo_operations,p.cleanup_failures);return B?i`<div class="worker-ribbon">
          ${x} ${ne}
          <div class="worker-kpi worker-kpi--ribbon">${me}${He}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${b}</div>
          <div class="worker-kpi">${G}</div>
        </div>
        ${pe}${K.template()}${q}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${x}${ne}${b}</div>
        <div class="worker-kpi">
          ${me}${He}${G}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${R()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(qe=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${qe.tooltip}
                >${R()} 완료 · 누적 ${qe.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${pe}${K.template()}${q}`}function yt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let y=p.running.some(x=>!x.paused&&x.failed!==!0);return i`<section
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
      ${p.running.length>0?qo(p.running,Date.now(),we):""}
      ${p.pr_wait.map(x=>Mo(x))}
    </section>`}function ct(p){let y=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${F.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${y_.map(x=>i`<button
              type="button"
              class="worker-filter__chip${F.spec===x.value?" is-active":""}"
              data-spec=${x.value}
              aria-pressed=${F.spec===x.value?"true":"false"}
            >
              ${x.label}
            </button>`)}
        ${y.spec>0?i`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function $t(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${E}
    >
      ${v_.map(p=>i`<option value=${p.value} ?selected=${E===p.value}>
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
      </button>`;let x=new Set(p.auto_excluded),ne=p.pr_wait.filter(me=>me.merge_action&&me.merge_enabled&&!x.has(me.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ne>0?` ${ne}`:""}
    </button>`}function W(p){let y=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:$t(),controls:ct(p)});return B?i`<div class="worker-lanes worker-lanes--mobile">
        ${yt(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:A.queue,preview:Pc(p.waiting)})}
        ${p.serial_lanes.map(x=>ot(x))}
        ${y}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:at(),collapsible:!0,collapsed:A.done,preview:Array.isArray(p.token_total)?p.token_total.map(x=>x.label).join(" \xB7 "):p.token_total||Pc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${y}
      <div class="worker-wait">
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(x=>ot(x))}
      </div>
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(x=>!x.paused&&x.failed!==!0),body:qo(p.running,Date.now(),we)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${R()} ${p.done.length}`,items:p.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:at()})}
    </div>`}function X(p){A={...A,[p]:!A[p]},E_(A),te()}function te(){let p=Ye();We(kt(p),Be),We(W(p),Ne)}function _e(){let p=document.querySelector(".app-header");if(!p)return;let y=()=>{let x=Math.round(p.getBoundingClientRect().height);$e.style.setProperty("--worker-ribbon-top",`${x}px`)};if(y(),typeof ResizeObserver=="function"){let x=new ResizeObserver(y);x.observe(p),de.push(()=>x.disconnect())}else window.addEventListener("resize",y),de.push(()=>window.removeEventListener("resize",y))}function Te(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(S_);B=!!p.matches;let y=x=>{let ne=!!(x&&typeof x.matches=="boolean"?x.matches:p.matches);ne!==B&&(B=ne,te())};typeof p.addEventListener=="function"?(p.addEventListener("change",y),de.push(()=>p.removeEventListener("change",y))):typeof p.addListener=="function"&&(p.addListener(y),de.push(()=>p.removeListener(y)))}let De=null;function et(p){De=p.target instanceof Element?p.target:null}function Qe(p){let x=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!x)return;if(De&&x.contains(De)&&De.closest("input, button, a")){p.preventDefault();return}let ne=x.dataset.beadId||"",me=x.dataset.lane||"";k={bead_id:ne,from_lane:me};try{p.dataTransfer?.setData("text/plain",ne),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Pe(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;let x=y.dataset.lane||"";x!=="candidate"&&x!=="queue"&&!/^s[1-5]$/.test(x)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function tt(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ie(p,y){let x=D.find(G=>G.id===p);if(!x)return;let ne=D.filter(G=>G.id!==p),me=ne.length;if(y){let G=y.dataset.beadId;if(G===p)return;let b=ne.findIndex(q=>q.id===G);b>=0&&(me=b)}let He=ne.slice();He.splice(me,0,x),T.applyReorder(p,He,me)}function ft(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;p.preventDefault(),y.classList.remove("worker-pane--drag-over");let x=y.dataset.lane||"",ne=k?.bead_id||p.dataTransfer?.getData("text/plain")||"",me=k?.from_lane||"";if(k=null,!ne)return;let He=p.target?.closest?.(".worker-mini, .worker-card"),G=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),b=G.length;if(He){let q=G.indexOf(He);q>=0&&(b=q)}if(b=Math.max(0,b-y.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(b=j()),x==="candidate"){if(me==="candidate"){Ie(ne,He);return}(me==="queue"||/^s[1-5]$/.test(me))&&xe(ne);return}if(x==="queue"||/^s[1-5]$/.test(x)){let q=x==="queue"?"parallel":x;me===x?ge(ne,q,b):U(ne,q,b)}}function xt(p){F=p,h_(p),te()}function qt(p){E=p==="board"||p==="created"||p==="spec"?p:Ls,k_(E),te()}function Xt(p){$=Mt(p)?p:It,x_($),m?.($),te()}function ur(p){let y=p.target?.closest?.(".worker-serial-lane-count");if(y){let b=Number.parseInt(y.value,10);Number.isFinite(b)&&he(b).then(te);return}let x=p.target?.closest?.(".worker-filter__blocked");if(x){xt({...F,show_blocked:x.checked});return}let ne=p.target?.closest?.(".worker-done-range");if(ne){Xt(ne.value);return}let me=p.target?.closest?.(".worker-sort");if(me){qt(me.value||Ls);return}let He=p.target?.closest?.(".worker-slots__input");if(!He)return;let G=Number.parseInt(He.value,10);if(!Number.isFinite(G)){te();return}Oe(G).then(te)}function gt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function vt(){let p=Ye();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:d&&d()||""}}function pr(){we&&Ce.close(),Ge.hidden=!1,Le.hidden=!1,ye.open(vt()),te()}function tr(p){let y=Ee(),x=y.attempts?y.attempts[p]:null;we=p,ye.close(),Ge.hidden=!0,Le.hidden=!1,Ce.open({attempt_id:p,meta:gt(x)}),te()}function Bt(){if(ye.isOpen()&&ye.refresh(vt()),!we)return;let p=Ee(),y=p.attempts?p.attempts[we]:null;if(y){Ce.updateMeta(gt(y));return}Ce.close()}function Ut(p){let y=p.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-parallel-analysis-dialog"))return;if(y?.closest?.(".worker-analysis-btn")){z?.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){pr();return}let x=y?.closest?.(".worker-repo-op__session");if(x){let Re=x.dataset.attemptId;Re&&tr(Re);return}let ne=y?.closest?.(".worker-repo-op__resolve");if(ne){ue(ne.dataset.operationId||"");return}let me=y?.closest?.(".worker-repo-op__dismiss");if(me){Fe(me.dataset.operationId||"");return}let He=y?.closest?.(".worker-cleanup__resume");if(He){let Re=He.dataset.beadId;Re&&fe(Re);return}let G=y?.closest?.(".worker-banner__resume");if(G){let Re=G.dataset.attemptId;Re&&H(Re);return}let b=y?.closest?.(".worker-banner__discard");if(b){let Re=b.dataset.confirmation==="merged"?"merged":"unmerged";oe(b.dataset.beadId||"",b.dataset.attemptId||null,Re,b.dataset.operationId||null);return}let q=y?.closest?.(".worker-banner__dismiss");if(q){let Re=q.dataset.attemptId;Re&&I(Re);return}if(y?.closest?.(".worker-play")){M(!Ee().auto_advance);return}let pe=y?.closest?.(".worker-merge-all");if(pe){pe.classList.contains("worker-merge-all--stop")?Ee().auto_merge===!0?S(!1):Z():S(!0);return}let qe=y?.closest?.(".worker-pane__hd--toggle");if(qe){let Re=qe.dataset.lane;(Re==="queue"||Re==="done")&&X(Re);return}let Ke=y?.closest?.(".worker-card__place");if(Ke){let Re=Ke.dataset.beadId;Re&&!Ke.disabled&&U(Re,"parallel",j());return}let Ze=y?.closest?.(".worker-filter__chip");if(Ze){let Re=Ze.dataset.spec;(Re==="all"||Re==="with"||Re==="without")&&xt({...F,spec:Re});return}let ke=y?.closest?.(".worker-mini__merge");if(ke){let Re=ke.dataset.beadId||"";Ee().cleanup_failed?.[Re]?fe(Re):J(Re);return}let v=y?.closest?.(".worker-mini__merge-cancel");if(v){N(v.dataset.beadId||"");return}let f=y?.closest?.(".worker-mini__discard");if(f){oe(f.dataset.beadId||"",f.dataset.attemptId||null,f.dataset.discardMode==="merged"?"merged":"unmerged",f.dataset.operationId||null);return}let u=y?.closest?.(".worker-mini__stale-continue");if(u){Se("worker-stale-work-continue",u.dataset.beadId||"",u.dataset.actionId||"");return}let C=y?.closest?.(".worker-mini__stale-backup");if(C){Se("worker-stale-work-backup-fresh",C.dataset.beadId||"",C.dataset.actionId||"");return}let Y=y?.closest?.(".worker-mini__stale-recheck");if(Y){Se("worker-stale-work-recheck",Y.dataset.beadId||"",Y.dataset.actionId||"");return}let be=y?.closest?.(".worker-mini__revise-fix");if(be){w("worker-revise-fix",be.dataset.beadId||"");return}let Me=y?.closest?.(".worker-mini__revise-approve");if(Me){w("worker-revise-approve",Me.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let Re=y?.closest?.(".rtile"),dt=Re?.dataset?.beadId,Zr=Re?.dataset?.attemptId;dt&&oe(dt,Zr||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&I(dt);return}if(y?.closest?.(".rtile__pause")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&P(dt);return}if(y?.closest?.(".rtile__resume")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&H(dt);return}if(y?.closest?.(".rtile__session")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&tr(dt);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){ye.close(),Ce.close();return}if(y?.closest?.(".worker-drawer-host"))return;let Ae=y?.closest?.(".rtile");if(Ae){if(y?.closest?.(".rtile__id")){let dt=Ae.dataset.beadId;dt&&Ir(dt).then(Zr=>{Zr?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Re=Ae.dataset.beadId;Re&&c&&c(Re);return}let _t=y?.closest?.(".worker-mini, .worker-card");if(_t){let Re=_t.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Re&&Ir(Re).then(dt=>{dt?ae("\uBCF5\uC0AC\uB428","success",1200):ae("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Re&&c&&c(Re)}}return e.addEventListener("pointerdown",et),e.addEventListener("dragstart",Qe),e.addEventListener("dragover",Pe),e.addEventListener("dragleave",tt),e.addEventListener("drop",ft),e.addEventListener("click",Ut),e.addEventListener("change",ur),Te(),_e(),h&&de.push(h.subscribe(()=>{for(let[p,y]of O)y==="failed"&&O.delete(p);te()})),s&&de.push(s.subscribe(()=>{te(),Bt()})),o&&typeof o.subscribe=="function"&&de.push(o.subscribe(()=>te())),te(),{load(){te()},destroy(){for(let p of de.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",et),e.removeEventListener("dragstart",Qe),e.removeEventListener("dragover",Pe),e.removeEventListener("dragleave",tt),e.removeEventListener("drop",ft),e.removeEventListener("click",Ut),e.removeEventListener("change",ur);try{Ce.destroy()}catch{}Le.hidden=!0;try{z?.destroy()}catch{}We(i``,e)}}}function Xo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function jc(e,t,r,n=async()=>{},s=async()=>{}){let o=it("views:workspace-picker"),a=null,l=!1,c=!1,d=!1;async function _(B){let re=B.target.value,ee=t.getState().workspace?.current?.path||"";if(re&&re!==ee){o("switching workspace to %s",re),l=!0,A();try{await r(re)}catch(de){o("workspace switch failed: %o",de)}finally{l=!1,A()}}}async function m(){let B=t.getState(),V=B.workspace?.current?.path||B.workspace?.available?.[0]?.path||"";if(!(!V||c)){o("git-pulling workspace %s",V),c=!0,A();try{await n(V)}catch(re){o("workspace git pull failed: %o",re)}finally{c=!1,A()}}}function h(B){let V=B.target;V&&e.contains(V)||D()}function T(B){B.key==="Escape"&&D()}function k(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",T),A())}function D(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),A())}function F(){d?D():k()}async function E(B){let V=B.target,re=V.value,ve=V.checked;o("toggling visibility %s \u2192 %s",re,String(ve));try{await s(re,ve)}catch(ee){o("workspace visibility toggle failed: %o",ee)}}function $(B){return B?i`
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
    `:i``}function O(B,V){return i`
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
        ${d?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${B.map(re=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${re.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${re.path}"
                        .checked=${!V.has(re.path)}
                        @change=${E}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Xo(re.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function R(){let B=t.getState(),V=B.workspace?.current,re=B.workspace?.available||[],ve=new Set(B.workspace?.hidden||[]),ee=V?.path||re[0]?.path||"";if(re.length===0)return i``;let de=re.filter($e=>!ve.has($e.path)||$e.path===ee);if(de.length<=1){let $e=de[0]||re[0],Be=Xo($e.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${$e.path}"
            >${Be}</span
          >
          ${O(re,ve)}
          ${$(ee)}
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
          ${de.map($e=>i`
              <option
                value="${$e.path}"
                ?selected=${$e.path===ee}
                title="${$e.path}"
              >
                ${Xo($e.path)}
              </option>
            `)}
        </select>
        ${O(re,ve)}
        ${$(ee)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){We(R(),e)}return A(),a=t.subscribe(()=>A()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),We(i``,e)}}}var Wc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Qo(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function zc(e,t,r=Qo()){return{id:r,type:e,payload:t}}function Hc(e={}){let t=it("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,d=new Map,_=[],m=new Map,h=new Set;function T(R){for(let A of Array.from(h))try{A(R)}catch{}}function k(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let R=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),A=(r.jitterRatio||0)*R,B=Math.max(0,Math.round(R+(Math.random()*2-1)*A));t("ws retry in %d ms (attempt %d)",B,a+1),l=setTimeout(()=>{l=null,O()},B)}function D(R){try{s?.send(JSON.stringify(R))}catch(A){t("ws send failed",A)}}function F(){for(o="open",t("ws open"),T(o),a=0;_.length;){let R=_.shift();R&&D(R)}}function E(R){let A;try{A=JSON.parse(String(R.data))}catch{t("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){t("ws received invalid envelope");return}if(d.has(A.id)){let V=d.get(A.id);d.delete(A.id),A.ok?V?.resolve(A.payload):V?.reject(A.error||new Error("ws error"));return}let B=m.get(A.type);if(B&&B.size>0)for(let V of Array.from(B))try{V(A.payload)}catch(re){t("ws event handler error",re)}else t("ws received unhandled message type: %s",A.type)}function $(){o="closed",t("ws closed"),T(o);for(let[R,A]of d.entries())A.reject(new Error("ws disconnected")),d.delete(R);a+=1,k()}function O(){if(!c)return;let R=n();try{s=new WebSocket(R),t("ws connecting %s",R),o="connecting",T(o),s.addEventListener("open",F),s.addEventListener("message",E),s.addEventListener("error",()=>{}),s.addEventListener("close",$)}catch(A){t("ws connect failed %o",A),k()}}return O(),{send(R,A){if(!Wc.includes(R))return Promise.reject(new Error(`unknown message type: ${R}`));let B=Qo(),V=zc(R,A,B);return t("send %s id=%s",R,B),new Promise((re,ve)=>{d.set(B,{resolve:re,reject:ve,type:R}),s&&s.readyState===s.OPEN?D(V):(t("queue %s id=%s (state=%s)",R,B,o),_.push(V))})},on(R,A){m.has(R)||m.set(R,new Set);let B=m.get(R);return B?.add(A),()=>{B?.delete(A)}},onConnection(R){return h.add(R),()=>{h.delete(R)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,O()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function q_(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function B_(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Jo=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Gc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],vr="tab:worker:closed",U_="bdui.worker.done-range",Vc=uc,Yc="worker:queue",Kc="worker:parallel-analysis",Zc="ui:order",Xc="ui:display-policy",Qc="exec:presets",wr="tab:board:closed",Jc="beads-ui.board.closed-range";function j_(e){let t=it("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;We(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&xc(s),o&&a&&l&&c){let Ne=function(f,u){let C="Request failed",Y="";if(f&&typeof f=="object"){let Me=f;if(typeof Me.message=="string"&&Me.message.length>0&&(C=Me.message),typeof Me.details=="string")Y=Me.details;else if(Me.details&&typeof Me.details=="object")try{Y=JSON.stringify(Me.details,null,2)}catch{Y=""}}else typeof f=="string"&&f.length>0&&(C=f);let be=u&&u.length>0?`Failed to load ${u}`:"Request failed";Ge.open(be,C,Y)},S=function(f){return`${x.getState().workspace.current?.path||""}\0${f}`},N=function(){xe&&(xe().catch(()=>{}),xe=null),P=null,H=null},oe=function(f){I=f;let u=()=>{I!==f||x.getState().selected_id!==f||(I=null,Z(f))};if(!fe){J.then(u);return}u()},ue=function(f,u,C,Y,be){return C!==M[u]?(be().catch(()=>{}),!1):(f.set(Y,be),!0)},Oe=function(){let f=x.getState();yt(f.view==="board"),W(f.view==="worker"),De(f.view==="monitor"),te(f.view==="board"||f.view==="worker"||Fe||!!f.selected_id)},st=function(){let f=Er(he);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},kt=function(){let f=Er(Ye);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},yt=function(f){if(f)for(let[u,C]of Jo){if(Se.has(u)||w.has(u))continue;let Y=u===wr?st():{type:C};try{K.register(u,Y)}catch(Ae){t("register %s store failed: %o",u,Ae)}w.add(u);let be=M.board,Me=!1;ye.subscribeList(u,Y).then(Ae=>{Me=!ue(Se,"board",be,u,Ae)}).catch(Ae=>{t("subscribe %s failed: %o",u,Ae),Ne(Ae,"board")}).finally(()=>{w.delete(u),Me&&Oe()})}else at()},at=function(){M.board+=1;for(let[f]of Jo){let u=Se.get(f);u&&(u().catch(()=>{}),Se.delete(f));try{K.unregister(f)}catch(C){t("unregister %s failed: %o",f,C)}}},W=function(f){if(!f){X();return}for(let[u,C]of Gc){if(ot.has(u)||w.has(u))continue;let Y=u===vr?kt():{type:C};try{K.register(u,Y)}catch(Ae){t("register %s store failed: %o",u,Ae)}w.add(u);let be=M.worker,Me=!1;ye.subscribeList(u,Y).then(Ae=>{Me=!ue(ot,"worker",be,u,Ae)}).catch(Ae=>{t("subscribe %s failed: %o",u,Ae),Ne(Ae,"worker")}).finally(()=>{w.delete(u),Me&&Oe()})}},X=function(){M.worker+=1;for(let[f]of Gc){let u=ot.get(f);u&&(u().catch(()=>{}),ot.delete(f));try{K.unregister(f)}catch(C){t("unregister %s failed: %o",f,C)}}},te=function(f){if(!f){_e();return}mt||(Ce("subscribe-worker-queue",{id:Yc}).catch(u=>{t("subscribe-worker-queue failed: %o",u)}),Ce("subscribe-worker-parallel-analysis",{id:Kc}).catch(u=>{t("subscribe-worker-parallel-analysis failed: %o",u)}),mt=()=>(Ce("unsubscribe-worker-parallel-analysis",{id:Kc}),Ce("unsubscribe-worker-queue",{id:Yc})))},_e=function(){mt&&(mt().catch(()=>{}),mt=null),Ee.clear()},De=function(f){if(!f){et();return}Te||(Ce("subscribe-monitor-pipeline",{id:Vc}).catch(u=>{t("subscribe-monitor-pipeline failed: %o",u)}),Te=()=>Ce("unsubscribe-monitor-pipeline",{id:Vc}))},et=function(){Te&&(Te().catch(()=>{}),Te=null)},Pe=function(){Qe||(Ce("subscribe-ui-order",{id:Zc}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),Qe=()=>Ce("unsubscribe-ui-order",{id:Zc}))},tt=function(){Qe&&(Qe().catch(()=>{}),Qe=null),ie.clear()},ft=function(){Ie||(Ce("subscribe-display-policy",{id:Xc}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),Ie=()=>Ce("unsubscribe-display-policy",{id:Xc}))},xt=function(){Ie&&(Ie().catch(()=>{}),Ie=null),j.clear()},Xt=function(){qt||(Ce("subscribe-impl-presets",{id:Qc}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),qt=()=>Ce("unsubscribe-impl-presets",{id:Qc}))},Bt=function(f){if(!f)return"Unknown";let u=f.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"};var d=Ne,_=S,m=N,h=oe,T=ue,k=Oe,D=st,F=kt,E=yt,$=at,O=W,R=X,A=te,B=_e,V=De,re=et,ve=Pe,ee=tt,de=ft,$e=xt,Be=Xt,Le=Bt;let ze=document.getElementById("header-loading"),Ve=di(ze),Ge=ql(e),we=Hc(),Ce=Ve.wrapSend((f,u)=>we.send(f,u)),ye=ri(Ce),K=ni(),z=ai(),Ee=oi(),se=Ua(),ie=si(),j=qa(),U=Ba(),ge=ja();we.on("impl-presets-snapshot",f=>{let u=f;u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&U.set({revision:u.revision,presets:u.presets})}),we.on("monitor-pipeline-snapshot",f=>{let u=f;if(!(!u||!Array.isArray(u.workspaces)))try{se.set(u.workspaces,u.workspaces_state)}catch{}}),we.on("ui-order-snapshot",f=>{let u=f;if(u&&typeof u.revision=="number")try{ie.set({revision:u.revision,order:u.order&&typeof u.order=="object"?u.order:{}})}catch{}}),we.on("display-policy-snapshot",f=>{let u=f;if(u&&u.policy&&typeof u.policy=="object")try{j.set(u.policy)}catch{}}),we.on("session-log-snapshot",f=>{let u=f;if(u&&typeof u.attempt_id=="string")try{ge.set(u.attempt_id,Array.isArray(u.lines)?u.lines:[],typeof u.last_event_at=="number"?u.last_event_at:null)}catch{}}),we.on("session-log-append",f=>{let u=f;if(u&&typeof u.attempt_id=="string")try{ge.append(u.attempt_id,u.event)}catch{}}),we.on("snapshot",f=>{let u=f,C=u&&typeof u.id=="string"?u.id:"",Y=C?K.getStore(C):null;if(Y&&u&&u.type==="snapshot")try{Y.applyPush(u)}catch{}}),we.on("upsert",f=>{let u=f,C=u&&typeof u.id=="string"?u.id:"",Y=C?K.getStore(C):null;if(Y&&u&&u.type==="upsert")try{Y.applyPush(u)}catch{}}),we.on("delete",f=>{let u=f,C=u&&typeof u.id=="string"?u.id:"",Y=C?K.getStore(C):null;if(Y&&u&&u.type==="delete")try{Y.applyPush(u)}catch{}});let xe=null,P=null,H=null,I=null,Q=()=>{},J=new Promise(f=>{Q=()=>f(void 0)}),fe=!1,ce=!1;async function Z(f){let u=S(f);if(u===P||u===H)return;H=u;let C=`detail:${f}`,Y={type:"issue-detail",params:{id:f}};try{K.register(C,Y)}catch(be){t("register detail store failed: %o",be)}try{let be=await ye.subscribeList(C,Y);if(x.getState().selected_id!==f||S(f)!==u){await be().catch(()=>{});return}xe&&await xe().catch(()=>{}),xe=be,P=u}catch(be){t("detail subscribe failed: %o",be),Ne(be,"issue details")}finally{H===u&&(H=null)}}let Se=new Map,w=new Set,M={board:0,worker:0},Fe=!1,he=It;try{let f=window.localStorage.getItem(Jc);Mt(f)&&(he=f)}catch{}let Ye=It;try{let f=window.localStorage.getItem(U_);Mt(f)&&(Ye=f)}catch{}async function ct(f){if(!Mt(f)||f===he)return;he=f;try{window.localStorage.setItem(Jc,f)}catch{}let u=Se.get(wr);if(!u)return;Se.delete(wr),await u().catch(()=>{});let C=st();try{K.register(wr,C)}catch(Y){t("register %s store failed: %o",wr,Y)}try{let Y=await ye.subscribeList(wr,C);Se.set(wr,Y)}catch(Y){t("re-subscribe %s failed: %o",wr,Y),Ne(Y,"board")}}async function $t(f){if(!Mt(f)||f===Ye)return;Ye=f;let u=ot.get(vr);if(!u)return;ot.delete(vr),await u().catch(()=>{});let C=kt();try{K.register(vr,C)}catch(Y){t("register %s store failed: %o",vr,Y)}try{let Y=await ye.subscribeList(vr,C);ot.set(vr,Y)}catch(Y){t("re-subscribe %s failed: %o",vr,Y),Ne(Y,"worker")}}let ot=new Map,mt=null,Te=null,Qe=null,Ie=null,qt=null;async function ur(){Ie=null,j.clear(),qt=null,U.clear(),mt=null,Te=null,Se.clear(),ot.clear(),M.board+=1,M.worker+=1,Xt();let f=x.getState().workspace.current?.path;if(f)try{await we.send("set-workspace",{path:f})}catch(C){t("workspace restore after reconnect failed: %o",C);return}ft();let u=x.getState();yt(u.view==="board"),W(u.view==="worker"),De(u.view==="monitor"),te(u.view==="board"||u.view==="worker"||!!u.selected_id)}async function gt(){t("clearing all subscriptions for workspace switch"),at(),X(),_e(),z.clear(),tt(),Pe(),xt(),ft(),N();let f=x.getState();if(f.selected_id)try{K.unregister(`detail:${f.selected_id}`)}catch{}let u=x.getState();yt(u.view==="board"),W(u.view==="worker"),De(u.view==="monitor"),te(u.view==="board"||u.view==="worker"||!!u.selected_id),u.selected_id&&oe(u.selected_id)}async function vt(f){t("requesting workspace switch to %s",f),ce=!0;try{let u=await we.send("set-workspace",{path:f});t("workspace switch result: %o",u),u&&u.workspace&&(x.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),u.changed&&(await gt(),ae("Switched to "+Bt(f),"success",2e3)))}catch(u){throw t("workspace switch failed: %o",u),ae("Failed to switch workspace","error",3e3),u}finally{ce=!1}}async function pr(f){t("requesting workspace git pull for %s",f);try{let u=await we.send("git-pull-workspace",{});t("workspace git pull result: %o",u);let C=u?.status;if(C==="up_to_date"){ae("Already up to date","success",2e3);return}if(C==="stash_pop_conflict"){ae("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ae("Git pulled "+Bt(f),"success",2e3)}catch(u){t("workspace git pull failed: %o",u);let C=u?.code,Y=u?.message;if(C==="rebase_conflict"){ae("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(C==="rebase_conflict_abort_failed"){ae("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(C==="busy"){ae("Git pull skipped: another operation is running","warning",3e3);return}let be=Y?`: ${Y}`:"";throw ae(`Git pull failed${be}`,"error",3e3),u}}async function tr(f,u){t("setting workspace visibility %s \u2192 %s",f,String(u));try{await we.send("set-workspace-visibility",{path:f,visible:u}),await Ut()}catch(C){t("workspace visibility update failed: %o",C),ae("Failed to update project visibility","error",3e3)}}async function Ut(){try{let f=await we.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let u=f.workspaces.map(Me=>({path:Me.path,database:Me.database,pid:Me.pid,version:Me.version})),C=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,Y=Array.isArray(f.hidden)?f.hidden.filter(Me=>typeof Me=="string"):[];x.setState({workspace:{current:C,available:u,hidden:Y}});let be=window.localStorage.getItem("beads-ui.workspace");be&&(!u.some(Ae=>Ae.path===be)||Y.includes(be)?window.localStorage.removeItem("beads-ui.workspace"):C&&be!==C.path&&(t("restoring saved workspace preference: %s",be),await vt(be)))}}catch(f){t("failed to load workspaces: %o",f)}}we.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(x.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),Ut(),gt())});let p=!1;if(typeof we.onConnection=="function"){let f=u=>{t("ws state %s",u),u==="reconnecting"||u==="closed"?(p=!0,ae("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&p&&(p=!1,ae("Reconnected","success",2200),B_(x,(C,Y)=>{t(`${C}: %o`,Y)}),ur())};we.onConnection(f)}let y="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(y=f)}catch(f){t("view parse error: %o",f)}let x=ci({config:q_(),view:y});we.on("worker-queue-snapshot",f=>{let u=f;if(!u||!u.queue)return;let C=x.getState().workspace.current?.path;if(typeof C=="string"&&C.length>0&&u.root_dir!==C){t("dropping worker-queue snapshot for %s",String(u.root_dir));return}try{z.set(u.queue)}catch{}}),we.on("worker-parallel-analysis-snapshot",f=>{let u=f;if(!u)return;let C=x.getState().workspace.current?.path;if(!(typeof C=="string"&&C.length>0&&typeof u.root_dir=="string"&&u.root_dir!==C))try{Ee.set({settings:u.settings,job:u.job??null,last_good:u.last_good??null})}catch{}});let ne=ii(x);ne.start();let me=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),He=async(f,u)=>{try{return await Ce(f,u)}catch(C){if(me.has(f))throw C;return[]}};n&&fc(n,x,ne);let G=document.getElementById("workspace-picker");G&&jc(G,x,vt,pr,tr);let b=hc(e,(f,u)=>Ce(f,u));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>b.open())}catch{}let q=wc(e,{policyStore:j,queueStore:z,implPresetStore:U,transport:(f,u)=>Ce(f,u),onOpenChange:f=>{Fe=f,Oe()},labelOptions:()=>{let f=new Set;for(let[u]of Jo)for(let C of K.snapshotFor(u)||[]){let Y=C.labels;if(Array.isArray(Y))for(let be of Y)typeof be=="string"&&be.length>0&&f.add(be)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>q.open()))}catch{}let pe=vi(o,{gotoIssue:f=>ne.gotoIssue(f),issueStores:K,transport:He,workerQueueStore:z,uiOrderStore:ie,displayPolicyStore:j,closedRange:he,onClosedRangeChange:f=>{ct(f)},onNewIssue:()=>b.open()}),qe=Zo(a,{transport:He,issueStores:K,queueStore:z,analysisStore:Ee,sessionLogStore:ge,uiOrderStore:ie,gotoIssue:f=>x.setState({selected_id:f}),getWorkspacePath:()=>x.getState().workspace.current?.path,doneRange:Ye,onDoneRangeChange:f=>{$t(f)}}),Ke=pc(l,{transport:He,pipelineStore:se,execPresetStore:U,gotoIssue:f=>ne.gotoIssue(f),getWorkspacePath:()=>x.getState().workspace.current?.path,switchWorkspace:f=>vt(f)}),Ze=Fl(c,{issueStores:K,transport:He,queueStore:z,execPresetStore:U,sessionLogStore:ge,getWorkspacePath:()=>x.getState().workspace.current?.path,onNavigate:f=>{x.getState().view==="worker"?x.setState({selected_id:f}):ne.gotoIssue(f)},onClose:()=>{let f=x.getState();x.setState({selected_id:null});try{ne.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{q.open("session")}}),ke=x.getState().selected_id;ke&&(c.hidden=!1,Ze.load(ke),oe(ke)),x.subscribe(f=>{let u=f.selected_id;u?(c.hidden=!1,Ze.load(u),ce||oe(u)):(Ze.clear(),c.hidden=!0,N())});let v=f=>{o.hidden=f.view!=="board",a.hidden=f.view!=="worker",l.hidden=f.view!=="monitor",yt(f.view==="board"),W(f.view==="worker"),De(f.view==="monitor"),te(f.view==="board"||f.view==="worker"||Fe||!!f.selected_id),!f.selected_id&&f.view==="board"&&pe.load(),f.view==="worker"&&qe.load(),f.view==="monitor"?Ke.load():Ke.pause(),window.localStorage.setItem("beads-ui.view",f.view)};x.subscribe(v),v(x.getState()),Pe(),ft(),Xt(),Ut().finally(()=>{fe=!0,Q()}),window.addEventListener("keydown",f=>{let u=f.ctrlKey||f.metaKey,C=String(f.key||"").toLowerCase(),Y=f.target,be=Y&&Y.tagName?String(Y.tagName).toLowerCase():"",Me=be==="input"||be==="textarea"||be==="select"||Y&&typeof Y.isContentEditable=="boolean"&&Y.isContentEditable;u&&C==="n"&&(Me||(f.preventDefault(),b.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&j_(t)});export{j_ as bootstrap,q_ as readBootstrapConfig,B_ as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
