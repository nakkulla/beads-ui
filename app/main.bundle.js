var Sd=Object.create;var Ys=Object.defineProperty;var Ad=Object.getOwnPropertyDescriptor;var Ed=Object.getOwnPropertyNames;var Td=Object.getPrototypeOf,Cd=Object.prototype.hasOwnProperty;var Rd=(e,t,r)=>t in e?Ys(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ks=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Id=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ed(t))!Cd.call(e,s)&&s!==r&&Ys(e,s,{get:()=>t[s],enumerable:!(n=Ad(t,s))||n.enumerable});return e};var Ld=(e,t,r)=>(r=e!=null?Sd(Td(e)):{},Id(t||!e||!e.__esModule?Ys(r,"default",{value:e,enumerable:!0}):r,e));var nt=(e,t,r)=>Rd(e,typeof t!="symbol"?t+"":t,r);var Ka=Ks((cm,Ya)=>{var qr=1e3,Br=qr*60,Ur=Br*60,Tr=Ur*24,Md=Tr*7,Dd=Tr*365.25;Ya.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Nd(e);if(r==="number"&&isFinite(e))return t.long?qd(e):Fd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Nd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Dd;case"weeks":case"week":case"w":return r*Md;case"days":case"day":case"d":return r*Tr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Ur;case"minutes":case"minute":case"mins":case"min":case"m":return r*Br;case"seconds":case"second":case"secs":case"sec":case"s":return r*qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Fd(e){var t=Math.abs(e);return t>=Tr?Math.round(e/Tr)+"d":t>=Ur?Math.round(e/Ur)+"h":t>=Br?Math.round(e/Br)+"m":t>=qr?Math.round(e/qr)+"s":e+"ms"}function qd(e){var t=Math.abs(e);return t>=Tr?Un(e,t,Tr,"day"):t>=Ur?Un(e,t,Ur,"hour"):t>=Br?Un(e,t,Br,"minute"):t>=qr?Un(e,t,qr,"second"):e+" ms"}function Un(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Xa=Ks((dm,Za)=>{function Bd(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=c,r.humanize=Ka(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let m=0;for(let b=0;b<_.length;b++)m=(m<<5)-m+_.charCodeAt(b),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(_){let m,b=null,x,k;function q(...U){if(!q.enabled)return;let A=q,$=Number(new Date),M=$-(m||$);A.diff=M,A.prev=m,A.curr=$,m=$,U[0]=r.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let O=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(R,te)=>{if(R==="%%")return"%";O++;let ee=r.formatters[te];if(typeof ee=="function"){let ye=U[O];R=ee.call(A,ye),U.splice(O,1),O--}return R}),r.formatArgs.call(A,U),(A.log||r.log).apply(A,U)}return q.namespace=_,q.useColors=r.useColors(),q.color=r.selectColor(_),q.extend=n,q.destroy=r.destroy,Object.defineProperty(q,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(x!==r.namespaces&&(x=r.namespaces,k=r.enabled(_)),k),set:U=>{b=U}}),typeof r.init=="function"&&r.init(q),q}function n(_,m){let b=r(this.namespace+(typeof m>"u"?":":m)+_);return b.log=this.log,b}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let m=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(_,m){let b=0,x=0,k=-1,q=0;for(;b<_.length;)if(x<m.length&&(m[x]===_[b]||m[x]==="*"))m[x]==="*"?(k=x,q=b,x++):(b++,x++);else if(k!==-1)x=k+1,q++,b=q;else return!1;for(;x<m.length&&m[x]==="*";)x++;return x===m.length}function a(){let _=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),_}function c(_){for(let m of r.skips)if(o(_,m))return!1;for(let m of r.names)if(o(_,m))return!0;return!1}function l(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Za.exports=Bd});var Qa=Ks((Ct,jn)=>{Ct.formatArgs=jd;Ct.save=Wd;Ct.load=zd;Ct.useColors=Ud;Ct.storage=Hd();Ct.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ct.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ud(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function jd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+jn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Ct.log=console.debug||console.log||(()=>{});function Wd(e){try{e?Ct.storage.setItem("debug",e):Ct.storage.removeItem("debug")}catch{}}function zd(){let e;try{e=Ct.storage.getItem("debug")||Ct.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Hd(){try{return localStorage}catch{}}jn.exports=Xa()(Ct);var{formatters:Gd}=jn.exports;Gd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jr=globalThis,Mn=Jr.trustedTypes,Oa=Mn?Mn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Xs="$lit$",rr=`lit$${Math.random().toFixed(9).slice(2)}$`,Qs="?"+rr,Od=`<${Qs}>`,xr=document,en=()=>xr.createComment(""),tn=e=>e===null||typeof e!="object"&&typeof e!="function",Js=Array.isArray,qa=e=>Js(e)||typeof e?.[Symbol.iterator]=="function",Zs=`[ 	
\f\r]`,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pa=/-->/g,Ma=/>/g,kr=RegExp(`>|${Zs}(?:([^\\s"'>=/]+)(${Zs}*=${Zs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Da=/'/g,Na=/"/g,Ba=/^(?:script|style|textarea|title)$/i,eo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=eo(1),fr=eo(2),rm=eo(3),Pt=Symbol.for("lit-noChange"),lt=Symbol.for("lit-nothing"),Fa=new WeakMap,$r=xr.createTreeWalker(xr,129);function Ua(e,t){if(!Js(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Oa!==void 0?Oa.createHTML(t):t}var ja=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Qr;for(let c=0;c<r;c++){let l=e[c],d,_,m=-1,b=0;for(;b<l.length&&(a.lastIndex=b,_=a.exec(l),_!==null);)b=a.lastIndex,a===Qr?_[1]==="!--"?a=Pa:_[1]!==void 0?a=Ma:_[2]!==void 0?(Ba.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=kr):_[3]!==void 0&&(a=kr):a===kr?_[0]===">"?(a=s??Qr,m=-1):_[1]===void 0?m=-2:(m=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?kr:_[3]==='"'?Na:Da):a===Na||a===Da?a=kr:a===Pa||a===Ma?a=Qr:(a=kr,s=void 0);let x=a===kr&&e[c+1].startsWith("/>")?" ":"";o+=a===Qr?l+Od:m>=0?(n.push(d),l.slice(0,m)+Xs+l.slice(m)+rr+x):l+rr+(m===-2?c:x)}return[Ua(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},rn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,l=this.parts,[d,_]=ja(t,r);if(this.el=e.createElement(d,n),$r.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=$r.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Xs)){let b=_[a++],x=s.getAttribute(m).split(rr),k=/([.?@])?(.*)/.exec(b);l.push({type:1,index:o,name:k[2],strings:x,ctor:k[1]==="."?Nn:k[1]==="?"?Fn:k[1]==="@"?qn:Ar}),s.removeAttribute(m)}else m.startsWith(rr)&&(l.push({type:6,index:o}),s.removeAttribute(m));if(Ba.test(s.tagName)){let m=s.textContent.split(rr),b=m.length-1;if(b>0){s.textContent=Mn?Mn.emptyScript:"";for(let x=0;x<b;x++)s.append(m[x],en()),$r.nextNode(),l.push({type:2,index:++o});s.append(m[b],en())}}}else if(s.nodeType===8)if(s.data===Qs)l.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(rr,m+1))!==-1;)l.push({type:7,index:o}),m+=rr.length-1}o++}}static createElement(t,r){let n=xr.createElement("template");return n.innerHTML=t,n}};function Sr(e,t,r=e,n){if(t===Pt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=tn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Sr(e,s._$AS(e,t.values),s,n)),t}var Dn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??xr).importNode(r,!0);$r.currentNode=s;let o=$r.nextNode(),a=0,c=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Fr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new Bn(o,this,t)),this._$AV.push(d),l=n[++c]}a!==l?.index&&(o=$r.nextNode(),a++)}return $r.currentNode=xr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Fr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=lt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Sr(this,t,r),tn(t)?t===lt||t==null||t===""?(this._$AH!==lt&&this._$AR(),this._$AH=lt):t!==this._$AH&&t!==Pt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qa(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==lt&&tn(this._$AH)?this._$AA.nextSibling.data=t:this.T(xr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=rn.createElement(Ua(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Dn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Fa.get(t.strings);return r===void 0&&Fa.set(t.strings,r=new rn(t)),r}k(t){Js(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(en()),this.O(en()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=lt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=lt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Sr(this,t,r,0),a=!tn(t)||t!==this._$AH&&t!==Pt,a&&(this._$AH=t);else{let c=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=Sr(this,c[n+l],r,l),d===Pt&&(d=this._$AH[l]),a||(a=!tn(d)||d!==this._$AH[l]),d===lt?t=lt:t!==lt&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Nn=class extends Ar{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===lt?void 0:t}},Fn=class extends Ar{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==lt)}},qn=class extends Ar{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Sr(this,t,r,0)??lt)===Pt)return;let n=this._$AH,s=t===lt&&n!==lt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==lt&&(n===lt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Bn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Sr(this,t)}},Wa={M:Xs,P:rr,A:Qs,C:1,L:ja,R:Dn,D:qa,V:Sr,I:Fr,H:Ar,N:Fn,U:qn,B:Nn,F:Bn},Pd=Jr.litHtmlPolyfillSupport;Pd?.(rn,Fr),(Jr.litHtmlVersions??(Jr.litHtmlVersions=[])).push("3.3.1");var ze=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Fr(t.insertBefore(en(),o),o,void 0,r??{})}return s._$AI(e),s};var Lt="today",Qt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Mt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Er(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function za(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ha(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ga(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Va(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Ja=Ld(Qa(),1);function it(e){return(0,Ja.default)(`beads-ui:${e}`)}function Wt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Cr(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function ri(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function ni(e,t){let r=Wt(e.updated_at),n=Wt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function si(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Wt(e.created_at),o=Wt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function oi(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Vd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ei(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ti(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Vd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ai(e,t){let r=ei(e),n=ei(t);if(r!==n)return r<n?-1:1;let s=ti(e),o=ti(t);if(s!==o)return s<o?-1:1;let a=Wt(e&&e.created_at),c=Wt(t&&t.created_at);if(a!==c)return a<c?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var to=2**20;function jr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Wt(e&&e.created_at)}function Wn(e){return(t,r)=>{let n=jr(t,e),s=jr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function ro(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:jr(c,r)-to};if(!c)return{rank:jr(a,r)+to};let l=jr(a,r),d=jr(c,r),_=(l+d)/2;return l<_&&_<d?{rank:_}:{renormalize:n.map((m,b)=>({bead_id:m.id,rank:b*to}))}}function no(e,t={}){let r=it(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,l=t.sort||Cr;function d(){for(let b of Array.from(a))try{b()}catch{}}function _(){s=Array.from(n.values()).sort(l)}function m(b){if(c||!b||b.id!==e)return;let x=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,x),!(x<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(x<=o)return;n.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let q of k)q&&typeof q.id=="string"&&q.id.length>0&&n.set(q.id,q);_(),o=x,d();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let q=n.get(k.id);if(!q)n.set(k.id,k);else{let U=Number.isFinite(q.updated_at)?q.updated_at:0,A=Number.isFinite(k.updated_at)?k.updated_at:0;if(U<=A){for(let $ of Object.keys(q))$ in k||delete q[$];for(let[$,M]of Object.entries(k))q[$]=M}}_()}o=x,d()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(n.delete(k),_()),o=x,d()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function zn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ii(e){let t=it("subs"),r=new Map,n=new Map;function s(c,l){t("applyDelta %s +%d ~%d -%d",c,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let _=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],b=Array.isArray(l.removed)?l.removed:[];for(let x of Array.from(d)){let k=r.get(x);if(!k)continue;let q=k.itemsById;for(let U of _)typeof U=="string"&&U.length>0&&q.set(U,!0);for(let U of m)typeof U=="string"&&U.length>0&&q.set(U,!0);for(let U of b)typeof U=="string"&&U.length>0&&q.delete(U)}}async function o(c,l){let d=zn(l);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let m=r.get(c);if(m&&m.key!==d){let b=n.get(m.key);b&&(b.delete(c),b.size===0&&n.delete(m.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(c);try{await e("subscribe-list",{id:c,type:l.type,params:l.params})}catch(m){let b=r.get(c)||null;if(b){let x=n.get(b.key);x&&(x.delete(c),x.size===0&&n.delete(b.key))}throw r.delete(c),m}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let m=r.get(c)||null;if(m){let b=n.get(m.key);b&&(b.delete(c),b.size===0&&n.delete(m.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:zn,selectors:{getIds(c){let l=r.get(c);return l?Array.from(l.itemsById.keys()):[]},has(c,l){let d=r.get(c);return d?d.itemsById.has(l):!1},count(c){let l=r.get(c);return l?l.itemsById.size:0},getItemsById(c){let l=r.get(c),d={};if(!l)return d;for(let _ of l.itemsById.keys())d[_]=!0;return d}}}}function li(){let e=it("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,_){let m=d?zn(d):"",b=r.get(l)||"",x=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,b),x&&b&&m&&b!==m){let k=t.get(l);if(k)try{k.dispose()}catch{}let q=s.get(l);if(q){try{q()}catch{}s.delete(l)}let U=no(l,_);t.set(l,U);let A=U.subscribe(()=>o());s.set(l,A)}else if(!x){let k=no(l,_);t.set(l,k);let q=k.subscribe(()=>o());s.set(l,q)}return r.set(l,m),()=>c(l)}function c(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let _=s.get(l);if(_){try{_()}catch{}s.delete(l)}}return{register:a,unregister:c,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function ci(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function di(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ui(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function so(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Yd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Kd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function pi(e){let t=it("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Yd(n),a=Kd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=so(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?so(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Zd=Object.freeze({workspace_config:{default_workspace:null}});function fi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Zd.workspace_config.default_workspace}}}function _i(e={}){let t=it("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:fi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?fi(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!c&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function mi(e){let t=it("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(m,b)=>{let x=s++,k=Date.now();n.set(x,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",x,m,r+1),a();let q=!1,U=()=>{q||(q=!0,n.delete(x),c())},A=setTimeout(()=>{q||(t("request TIMEOUT id=%d type=%s elapsed=%dms",x,m,Date.now()-k),U())},3e4);try{let $=await d(m,b),M=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",x,m,M),$}catch($){let M=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",x,m,M,$),$}finally{clearTimeout(A),U()}}}return o(),{wrapSend:l,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,m])=>({id:_,type:m.type,elapsed_ms:d-m.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Hn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(oi),l;switch(c){case"created_desc":return l.sort(Cr),l;case"created_asc":return l.sort(ri),l;case"updated_desc":return l.sort(ni),l;case"priority":return l.sort(si),l;case"manual":default:{let d=r();return d?l.sort(Wn(d)):l.sort(Cr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Rr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function bt(e){let t=Rr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ot(e,t){let r=Rr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let l=Math.floor(c/7);if(c<30)return`${l}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function Gn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Rr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Vn(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let l={...a.order};for(let d of c)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,c,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(ro(c,l,d.order),a);s(d,_);let m=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(b);let x=n(ro(c,l,b.order),a);s(b,x);let k=await t("ui-order-set",{expected_revision:b.revision,entries:x});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Yn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function oo(e,t){return!t||typeof e!="string"||e.length===0||Yn(t.visible_labels).includes(e)?!0:Yn(t.hidden_labels).includes(e)?!1:!Yn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Kn(e,t){return Yn(e).filter(r=>oo(r,t))}function _r(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Xd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},bi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},gi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Qd={review:"\u2713",skip:"\u2298"},mr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Jd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function hi(e){let t=e&&e.fill||"none";return t==="none"?mr.none:e&&e.stale===!0?mr.stale:t==="dim"?mr.dim:e&&e.glyph==="review"?mr.review:e&&e.glyph==="skip"?mr.skip:mr.done}function eu(e){if(!e||e.fill==="none"||!e.approval_state)return hi(e);let t=[];return e.glyph==="review"?t.push(mr.review):e.glyph==="skip"&&t.push(mr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function tu(e,t,r){let n=Xd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Qd[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${l}>
        ${bi[e]||e}
      </div>
    </div>
  `}function Zn(e,t){if(!e||!e.stages)return"";let r=gi[e.route]||gi.spec_backed,n=e.stages,s=Jd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${bi[a]||a} ${a==="plan"?eu(n[a]||{}):hi(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>tu(a,n[a]||{},a===s))}
    </div>
  `}function ru(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var yi=2;function nu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,yi).join(", "),s=r.length-yi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ao(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Xn(e,t){if(!e)return null;let r=ao(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=ao(t?.kind),a=o!==null&&t?.kind!==e.kind,c=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:c,title:`${l}${d}`}}function vi(e,t){let r=Xn(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function su(e){if(!e)return null;let t=ao(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function ou(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&_r(r,"route")){let c=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${c?" is-derived":""}"
        title=${c?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${c?"unset":n.route}</span
      >`)}if(n.fast_track&&_r(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&_r(r,"pr")){let c=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${c!=null?` #${c}`:""}`}</span
      >`)}let o=vi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let c=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${c.kind}:${c.actor}@${c.sha}`}
        >${`exec ${c.kind==="delegated"?c.actor:`main:${c.actor}`} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let c=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${c.actor}@${c.sha}`}
        >${`impl ${c.actor} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}for(let c of Kn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${c}</span>`);return e.from_id&&_r(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${c=>{c.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(c,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),_r(r,"blocked")&&s.push(...nu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&_r(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function au(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function iu(e){let t=Ot(e.created_at),r=Ot(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function lu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ai):r.children;return i`
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
        ${iu(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,c)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${au(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${Xn(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${vi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${su(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function Qn(e,t){let r=ru(e.priority);return i`
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
      ${ou(e,t)}
      ${e.workflow&&_r(t.policy||null,"stepper")?Zn(e.workflow,e.status):""}
      ${lu(e,t)}
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
        ${e.items.map(o=>Qn(o,t))}
      </div>
    </section>
  `}function wi(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Qn(n,t))}
        </div>
      </div>
    </dialog>
  `}var cu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],du=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],uu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function pu(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function ki(e,t,r){return i`
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
        ${cu.map(n=>i`<option
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
        ${du.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${pu(e,t,r)}
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
        ${uu.map(n=>i`<option
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
  `}var fu=200,_u={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},mu=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),$i="beads-ui.board.sort",xi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function gu(){try{let e=window.localStorage.getItem($i);if(e&&xi.has(e))return e}catch{}return"created_desc"}function Si(e,t){let r=it("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,_=t.onNewIssue,m=t.closedRange||Lt,b=s?Hn(s,a):null,x=Vn({transport:o,uiOrderStore:a}),k=[],q=[],U=[],A=[],$=[],M=[],O=!1,I=0,R=gu(),te=new Map,ee=new Map,ye=new Map,ne=new Set,ae={search:"",priority:"",type:"",labels:[]},ke=!1,Be=null;function Ue(z){return String(z.status||"open")==="open"}function Ve(z){let J=String(z.status||"open");return J==="open"||J==="blocked"}function He(z){let J=ae.search.trim().toLowerCase(),se=ae.priority,_e=ae.type,Se=ae.labels;return z.filter(De=>{if(J){let tt=String(De.id||"").toLowerCase(),Je=String(De.title||"").toLowerCase();if(!tt.includes(J)&&!Je.includes(J))return!1}if(se!==""&&String(De.priority)!==se||_e!==""&&String(De.issue_type||"")!==_e)return!1;if(Se.length>0){let tt=Array.isArray(De.labels)?De.labels:[];if(!Se.some(Je=>tt.includes(Je)))return!1}return!0})}function Qe(){let z=new Set;for(let J of[k,q,U,A,$,M])for(let se of J){let _e=Array.isArray(se.labels)?se.labels:[];for(let Se of _e)typeof Se=="string"&&Se.length>0&&z.add(Se)}return Array.from(z).sort()}function Ie(){return ae.search.trim()!==""||ae.priority!==""||ae.type!==""||ae.labels.length>0}function ve(){try{if(b){let z=b.selectBoardColumn("tab:board:in-progress","in_progress",R),J=b.selectBoardColumn("tab:board:blocked","blocked",R).filter(Ve),se=new Set(z.map(Re=>Re.id)),_e=b.selectBoardColumn("tab:board:ready","ready",R).filter(Re=>Ue(Re)&&!se.has(Re.id)),Se=b.selectBoardColumn("tab:board:resolved","resolved",R),De=b.selectBoardColumn("tab:board:deferred","deferred",R),tt=b.selectBoardColumn("tab:board:closed","closed").slice(0,fu),Je=[...J,..._e,...z,...Se,...tt];Ae(Je);let Ne=new Set;for(let Re of Je)Re&&Re.id&&!io(Re)&&Ne.add(Re.id);let rt=!Ie();k=rt?nn(J,Ne):J,q=rt?nn(_e,Ne):_e,U=rt?nn(z,Ne):z,A=rt?nn(Se,Ne):Se,$=De,I=De.length,M=rt?nn(tt,Ne):tt,te=new Map;for(let Re of k)te.set(Re.id,"open");for(let Re of q)te.set(Re.id,"open");for(let Re of U)te.set(Re.id,"in_progress");for(let Re of A)te.set(Re.id,"resolved");for(let Re of $)te.set(Re.id,"deferred");for(let Re of M)te.set(Re.id,"closed");ee=new Map;for(let Re of k)ee.set(Re.id,"blocked-col");for(let Re of q)ee.set(Re.id,"ready-col");for(let Re of U)ee.set(Re.id,"in-progress-col");for(let Re of A)ee.set(Re.id,"resolved-col");for(let Re of M)ee.set(Re.id,"closed-col")}Le()}catch{k=[],q=[],U=[],A=[],$=[],M=[],ye=new Map,Le()}}function Ae(z){let J=new Map;for(let _e of z)_e&&_e.id&&!J.has(_e.id)&&J.set(_e.id,_e);let se=new Map;for(let _e of J.values()){let Se=io(_e);if(!Se)continue;let De=se.get(Se);De||(De=[],se.set(Se,De)),De.push({id:_e.id,title:_e.title,status:_e.status,metadata:_e.metadata,workflow:_e.workflow,created_at:_e.created_at,updated_at:_e.updated_at})}ye=se}function we(z){let J=ye.get(z)||[],se=0;for(let Se of J)(Se.status==="resolved"||Se.status==="closed")&&(se+=1);let _e=Gn(J);return{total:J.length,count:se,current:_e,children:J}}function Pe(z){return!ne.has(z)}function pe(z,J){z.preventDefault(),z.stopPropagation(),ne.has(J)?ne.delete(J):ne.add(J),Le()}function V(z,J){z.preventDefault(),z.stopPropagation(),n(J)}function j(z,J){z.preventDefault(),z.stopPropagation(),n(J)}function de(z,J){Be||n(J)}function N(z,J){z.preventDefault(),z.stopPropagation(),bu(J).then(se=>{se&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function P(z,J){Be=J,z.dataTransfer&&(z.dataTransfer.setData("text/plain",J),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function be(z){z.target.classList.remove("board-card--dragging"),yt(),setTimeout(()=>{Be=null},0)}function Ee(z){let J=String(z.target.value||"");!J||J===m||(m=J,d&&d(J),Le())}function L(){return c?c.get():null}function H(z){let J=l?l.get():null,se=J?J.cleanup_failed:null;if(!se||typeof se!="object"||Array.isArray(se))return null;let _e=se[z];return!_e||typeof _e!="object"||Array.isArray(_e)?null:_e}let C={onCardClick:de,onCopyId:N,onDragStart:P,onDragEnd:be,onClosedRangeChange:Ee,rollupFor:we,isExpanded:Pe,onRollupToggle:pe,onChildClick:V,onFromChipClick:j,cleanupFailureFor:H,get policy(){return L()}};function Z(z,J){Be||(w(),n(J))}function re(z,J){z.preventDefault(),z.stopPropagation(),w(),n(J)}let le={...C,onCardClick:Z,onChildClick:re,onFromChipClick:re,get policy(){return L()}};function fe(z){let J=z.target,se=e.querySelector(".board-filter__labels");J&&se&&se.contains(J)||B()}function xe(z){z.key==="Escape"&&B()}function E(){ke||(ke=!0,document.addEventListener("mousedown",fe),document.addEventListener("keydown",xe),Le())}function B(){ke&&(ke=!1,document.removeEventListener("mousedown",fe),document.removeEventListener("keydown",xe),Le())}function Q(z){z.key==="Escape"&&w()}function K(){O||(O=!0,document.addEventListener("keydown",Q),Le())}function w(){O&&(O=!1,document.removeEventListener("keydown",Q),Le())}let F={onClose:w,onOverlayClick(z){z.target===z.currentTarget&&w()}},X={onSearchInput(z){ae.search=String(z.target.value||""),ve()},onPriorityChange(z){ae.priority=String(z.target.value||""),ve()},onTypeChange(z){ae.type=String(z.target.value||""),ve()},onSortChange(z){let J=String(z.target.value||"");if(!(!xi.has(J)||J===R)){R=J;try{window.localStorage.setItem($i,J)}catch{}ve()}},onDeferredToggle(){O?w():K()},onLabelMenuToggle(){ke?B():E()},onLabelToggle(z){let J=ae.labels.indexOf(z);J===-1?ae.labels.push(z):ae.labels.splice(J,1),ve()},onLabelClear(){ae.labels.length!==0&&(ae.labels=[],ve())},onNewIssue(){_&&_()}};function Me(){return i`
      <div class="board-view">
        ${ki(ae,X,{sort_mode:R,deferred_popup_open:O,deferred_count:I,label_options:Qe(),label_menu_open:ke})}
        <div class="board-root">
          ${Wr({title:"Blocked",id:"blocked-col",items:He(k)},C)}
          ${Wr({title:"Ready",id:"ready-col",items:He(q)},C)}
          ${Wr({title:"In progress",id:"in-progress-col",items:He(U)},C)}
          ${Wr({title:"Resolved",id:"resolved-col",items:He(A)},C)}
          ${Wr({title:"Closed",id:"closed-col",items:He(M),is_closed:!0,closed_range:m},C)}
        </div>
        ${O?wi({items:He($),count:I},le,F):""}
      </div>
    `}function Le(){ze(Me(),e),Fe()}function Fe(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let se of J)Array.from(se.querySelectorAll(".board-card")).forEach((Se,De)=>{Se.tabIndex=De===0?0:-1})}catch{}}async function Te(z,J){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:J}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(se){r("update-status failed: %o",se),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Xe(z){switch(z){case"blocked-col":return k;case"ready-col":return q;case"in-progress-col":return U;case"resolved-col":return A;default:return[]}}function kt(z,J,se){if(!o||!a)return;let _e=Xe(z),Se=_e.find(rt=>rt.id===J);if(!Se)return;let De=_e.filter(rt=>rt.id!==J),tt=se.closest?se.closest(".board-card"):null,Je=De.length;if(tt){let rt=tt.getAttribute("data-issue-id");if(rt===J)return;let Re=De.findIndex(ft=>ft.id===rt);Re>=0&&(Je=Re)}let Ne=De.slice();Ne.splice(Je,0,Se),x.applyReorder(J,Ne,Je)}function yt(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let ct=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let se=z.target.closest(".board-column");se&&se!==ct&&(ct&&ct.classList.remove("board-column--drag-over"),se.classList.add("board-column--drag-over"),ct=se)}),e.addEventListener("dragleave",z=>{let J=z.relatedTarget;(!J||!e.contains(J))&&ct&&(ct.classList.remove("board-column--drag-over"),ct=null)}),e.addEventListener("drop",z=>{z.preventDefault(),ct&&(ct.classList.remove("board-column--drag-over"),ct=null);let J=z.target,se=J.closest(".board-column");if(!se)return;let _e=z.dataTransfer?.getData("text/plain")||"";if(!_e)return;let Se=se.id,De=ee.get(_e);if(De&&De===Se){if(mu.has(Se)){if(R!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}kt(Se,_e,J)}return}let tt=_u[Se];if(!tt){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}te.get(_e)!==tt&&Te(_e,tt)}),e.addEventListener("keydown",z=>{let J=z.target;if(!(J instanceof HTMLElement))return;let se=String(J.tagName||"").toLowerCase();if(se==="input"||se==="textarea"||se==="select"||se==="button"||se==="a"||J.isContentEditable===!0)return;let _e=J.closest(".board-card");if(!_e)return;let Se=String(z.key||"");if(Se==="Enter"||Se===" "){z.preventDefault();let Ne=_e.getAttribute("data-issue-id");Ne&&n(Ne);return}if(Se!=="ArrowUp"&&Se!=="ArrowDown"&&Se!=="ArrowLeft"&&Se!=="ArrowRight")return;z.preventDefault();let De=_e.closest(".board-column");if(!De)return;let tt=Array.from(De.querySelectorAll(".board-card")),Je=tt.indexOf(_e);if(Se==="ArrowDown"&&Je<tt.length-1){$t(_e,tt[Je+1]);return}if(Se==="ArrowUp"&&Je>0){$t(_e,tt[Je-1]);return}if(Se==="ArrowLeft"||Se==="ArrowRight"){let Ne=Array.from(e.querySelectorAll(".board-column")),rt=Ne.indexOf(De),Re=Se==="ArrowRight"?1:-1,ft=rt+Re;for(;ft>=0&&ft<Ne.length;){let xt=Ne[ft].querySelector(".board-card");if(xt){$t(_e,xt);return}ft+=Re}}});function $t(z,J){try{z.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let at=null;b&&b.subscribe&&(at=b.subscribe(()=>{try{ve()}catch{}}));let ot=null;c&&c.subscribe&&(ot=c.subscribe(()=>{try{ve()}catch{}}));let mt=null;return l&&l.subscribe&&(mt=l.subscribe(()=>{Le()})),{async load(){r("load"),ve()},clear(){B(),w(),at&&(at(),at=null),ot&&(ot(),ot=null),mt&&(mt(),mt=null),e.replaceChildren(),k=[],q=[],U=[],A=[],$=[],M=[],te=new Map,ee=new Map}}}function io(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function nn(e,t){return e.filter(r=>{let n=io(r);return!(n&&t.has(n))})}async function bu(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Ir(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Jt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function gr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function hu(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),c=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",c.textContent=`${Jt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Jt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,c,n,s,o),t.body.append(r),new Promise(l=>{let d=_=>{typeof r.close=="function"&&r.close(),r.remove(),l(_)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function nr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await hu(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Ri="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ht(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var sr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],sn=[...sr,"reasoning_output_tokens"],yu=["implementation","review-consult"];function lo(e){let t=0;for(let r of sr)t+=ht(e?.[r]);return t}function vu(e){return!e||typeof e!="object"?!1:sr.some(t=>Number.isFinite(e[t]))}function Ai(e){return!e||typeof e!="object"?!1:sn.some(t=>Number.isFinite(e[t]))}function wu(e){let t={};for(let r of sn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ei(e){let t={};for(let r of sn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ti(e,t){return e==="codex"?ht(t.input_tokens)+ht(t.output_tokens):lo(t)}function ku(e){return e==="claude"?"Claude":"Codex"}function $u(e){return`\u03C4 ${Ii(e)}`}function xu(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ht(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ht(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ht(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ht(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ht(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ht(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ht(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Ri),o.join(`
`)}function wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${ku(r)} ${$u(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:xu(r,n)})}return t}function es(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let c=t[o];c||(c={subtotal:0,breakdown:{}},t[o]=c),c.subtotal+=a.subtotal;for(let l of sn)Number.isFinite(a.breakdown[l])&&(c.breakdown[l]=ht(c.breakdown[l])+ht(a.breakdown[l]));a.replayed&&(c.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function co(e){return!e||typeof e!="object"?null:Dt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Su(e){return e==="codex"?"codex":"claude"}function br(){return{subtotal:0,breakdown:wu(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Jn(e,t,r){e.subtotal+=t.subtotal;for(let n of sn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ht(e.breakdown[n])+ht(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ci(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Ii(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function zr(e){return vu(e)?`\u03C4 ${Ii(lo(e))}`:null}function zt(e){let t=zr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Hr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ht(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ht(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ht(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ht(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${lo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Ri),r.join(`
`)}function Dt(e,t){let r={claude:br(),codex:br()},n={orchestrator:{claude:br(),codex:br()},implementation:{claude:br(),codex:br()},"review-consult":{claude:br(),codex:br()}},s=new Set;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let l=c.usage;if(Ai(l)){let _=Su(c.runner),m=Ei(l),b={provider:_,role:"orchestrator",attempt_id:String(c.attempt_id||""),usage:m,subtotal:Ti(_,m)};m.replayed===!0&&(b.replayed=!0),typeof c.model=="string"&&(b.model=c.model),typeof c.session_id=="string"&&(b.session_id=c.session_id),Jn(r[_],b,!0),Jn(n.orchestrator[_],b,!0)}let d=Array.isArray(c.usage_legs)?c.usage_legs:[];for(let _ of d){if(!_||_.provider!=="codex"||!yu.includes(_.role)||!Ai(_.usage))continue;let m=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let b=Ei(_.usage),x={provider:"codex",role:_.role,attempt_id:String(c.attempt_id||""),usage:b,subtotal:Ti("codex",b)};x.receipt_id=m,typeof _.model=="string"&&(x.model=_.model),typeof _.session_id=="string"?x.session_id=_.session_id:typeof _.thread_id=="string"&&(x.session_id=_.thread_id),typeof _.turn_id=="string"&&(x.turn_id=_.turn_id),typeof _.completed_at=="string"&&(x.completed_at=_.completed_at),b.replayed===!0&&(x.replayed=!0),Jn(r.codex,x,!1),Jn(n[x.role].codex,x,!1)}}let o={};for(let c of["claude","codex"]){let l=r[c];if(l.legs.length===0)continue;let d=Ci(l,!1);c==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[c]=d}if(Object.keys(o).length===0)return null;let a={};for(let c of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let _=n[c][d];_.legs.length>0&&(l[d]={...Ci(_,!0),legs:_.legs})}Object.keys(l).length>0&&(a[c]=l)}return{providers:o,roles:a}}var{entries:Bi,setPrototypeOf:Li,isFrozen:Au,getPrototypeOf:Eu,getOwnPropertyDescriptor:Tu}=Object,{freeze:At,seal:Nt,create:bo}=Object,{apply:ho,construct:yo}=typeof Reflect<"u"&&Reflect;At||(At=function(t){return t});Nt||(Nt=function(t){return t});ho||(ho=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});yo||(yo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var ts=Et(Array.prototype.forEach),Cu=Et(Array.prototype.lastIndexOf),Oi=Et(Array.prototype.pop),on=Et(Array.prototype.push),Ru=Et(Array.prototype.splice),ns=Et(String.prototype.toLowerCase),uo=Et(String.prototype.toString),po=Et(String.prototype.match),an=Et(String.prototype.replace),Iu=Et(String.prototype.indexOf),Lu=Et(String.prototype.trim),Ht=Et(Object.prototype.hasOwnProperty),St=Et(RegExp.prototype.test),ln=Ou(TypeError);function Et(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ho(e,t,n)}}function Ou(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return yo(e,r)}}function We(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ns;Li&&Li(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Au(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Pu(e){for(let t=0;t<e.length;t++)Ht(e,t)||(e[t]=null);return e}function or(e){let t=bo(null);for(let[r,n]of Bi(e))Ht(e,r)&&(Array.isArray(n)?t[r]=Pu(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=or(n):t[r]=n);return t}function cn(e,t){for(;e!==null;){let n=Tu(e,t);if(n){if(n.get)return Et(n.get);if(typeof n.value=="function")return Et(n.value)}e=Eu(e)}function r(){return null}return r}var Pi=At(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),fo=At(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),_o=At(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Mu=At(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),mo=At(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Du=At(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Mi=At(["#text"]),Di=At(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),go=At(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ni=At(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),rs=At(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Nu=Nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Fu=Nt(/<%[\w\W]*|[\w\W]*%>/gm),qu=Nt(/\$\{[\w\W]*/gm),Bu=Nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Uu=Nt(/^aria-[\-\w]+$/),Ui=Nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ju=Nt(/^(?:\w+script|data):/i),Wu=Nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ji=Nt(/^html$/i),zu=Nt(/^[a-z][.\w]*(-[.\w]+)+$/i),Fi=Object.freeze({__proto__:null,ARIA_ATTR:Uu,ATTR_WHITESPACE:Wu,CUSTOM_ELEMENT:zu,DATA_ATTR:Bu,DOCTYPE_NAME:ji,ERB_EXPR:Fu,IS_ALLOWED_URI:Ui,IS_SCRIPT_OR_DATA:ju,MUSTACHE_EXPR:Nu,TMPLIT_EXPR:qu}),dn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Hu=function(){return typeof window>"u"?null:window},Gu=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},qi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Wi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Hu(),t=G=>Wi(G);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==dn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:l,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:x}=e,k=l.prototype,q=cn(k,"cloneNode"),U=cn(k,"remove"),A=cn(k,"nextSibling"),$=cn(k,"childNodes"),M=cn(k,"parentNode");if(typeof a=="function"){let G=r.createElement("template");G.content&&G.content.ownerDocument&&(r=G.content.ownerDocument)}let O,I="",{implementation:R,createNodeIterator:te,createDocumentFragment:ee,getElementsByTagName:ye}=r,{importNode:ne}=n,ae=qi();t.isSupported=typeof Bi=="function"&&typeof M=="function"&&R&&R.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ke,ERB_EXPR:Be,TMPLIT_EXPR:Ue,DATA_ATTR:Ve,ARIA_ATTR:He,IS_SCRIPT_OR_DATA:Qe,ATTR_WHITESPACE:Ie,CUSTOM_ELEMENT:ve}=Fi,{IS_ALLOWED_URI:Ae}=Fi,we=null,Pe=We({},[...Pi,...fo,..._o,...mo,...Mi]),pe=null,V=We({},[...Di,...go,...Ni,...rs]),j=Object.seal(bo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),de=null,N=null,P=Object.seal(bo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),be=!0,Ee=!0,L=!1,H=!0,C=!1,Z=!0,re=!1,le=!1,fe=!1,xe=!1,E=!1,B=!1,Q=!0,K=!1,w="user-content-",F=!0,X=!1,Me={},Le=null,Fe=We({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Te=null,Xe=We({},["audio","video","img","source","image","track"]),kt=null,yt=We({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ct="http://www.w3.org/1998/Math/MathML",$t="http://www.w3.org/2000/svg",at="http://www.w3.org/1999/xhtml",ot=at,mt=!1,z=null,J=We({},[ct,$t,at],uo),se=We({},["mi","mo","mn","ms","mtext"]),_e=We({},["annotation-xml"]),Se=We({},["title","style","font","a","script"]),De=null,tt=["application/xhtml+xml","text/html"],Je="text/html",Ne=null,rt=null,Re=r.createElement("form"),ft=function(h){return h instanceof RegExp||h instanceof Function},xt=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(rt&&rt===h)){if((!h||typeof h!="object")&&(h={}),h=or(h),De=tt.indexOf(h.PARSER_MEDIA_TYPE)===-1?Je:h.PARSER_MEDIA_TYPE,Ne=De==="application/xhtml+xml"?uo:ns,we=Ht(h,"ALLOWED_TAGS")?We({},h.ALLOWED_TAGS,Ne):Pe,pe=Ht(h,"ALLOWED_ATTR")?We({},h.ALLOWED_ATTR,Ne):V,z=Ht(h,"ALLOWED_NAMESPACES")?We({},h.ALLOWED_NAMESPACES,uo):J,kt=Ht(h,"ADD_URI_SAFE_ATTR")?We(or(yt),h.ADD_URI_SAFE_ATTR,Ne):yt,Te=Ht(h,"ADD_DATA_URI_TAGS")?We(or(Xe),h.ADD_DATA_URI_TAGS,Ne):Xe,Le=Ht(h,"FORBID_CONTENTS")?We({},h.FORBID_CONTENTS,Ne):Fe,de=Ht(h,"FORBID_TAGS")?We({},h.FORBID_TAGS,Ne):or({}),N=Ht(h,"FORBID_ATTR")?We({},h.FORBID_ATTR,Ne):or({}),Me=Ht(h,"USE_PROFILES")?h.USE_PROFILES:!1,be=h.ALLOW_ARIA_ATTR!==!1,Ee=h.ALLOW_DATA_ATTR!==!1,L=h.ALLOW_UNKNOWN_PROTOCOLS||!1,H=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,C=h.SAFE_FOR_TEMPLATES||!1,Z=h.SAFE_FOR_XML!==!1,re=h.WHOLE_DOCUMENT||!1,xe=h.RETURN_DOM||!1,E=h.RETURN_DOM_FRAGMENT||!1,B=h.RETURN_TRUSTED_TYPE||!1,fe=h.FORCE_BODY||!1,Q=h.SANITIZE_DOM!==!1,K=h.SANITIZE_NAMED_PROPS||!1,F=h.KEEP_CONTENT!==!1,X=h.IN_PLACE||!1,Ae=h.ALLOWED_URI_REGEXP||Ui,ot=h.NAMESPACE||at,se=h.MATHML_TEXT_INTEGRATION_POINTS||se,_e=h.HTML_INTEGRATION_POINTS||_e,j=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&ft(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(j.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&ft(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(j.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(j.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),C&&(Ee=!1),E&&(xe=!0),Me&&(we=We({},Mi),pe=[],Me.html===!0&&(We(we,Pi),We(pe,Di)),Me.svg===!0&&(We(we,fo),We(pe,go),We(pe,rs)),Me.svgFilters===!0&&(We(we,_o),We(pe,go),We(pe,rs)),Me.mathMl===!0&&(We(we,mo),We(pe,Ni),We(pe,rs))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?P.tagCheck=h.ADD_TAGS:(we===Pe&&(we=or(we)),We(we,h.ADD_TAGS,Ne))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?P.attributeCheck=h.ADD_ATTR:(pe===V&&(pe=or(pe)),We(pe,h.ADD_ATTR,Ne))),h.ADD_URI_SAFE_ATTR&&We(kt,h.ADD_URI_SAFE_ATTR,Ne),h.FORBID_CONTENTS&&(Le===Fe&&(Le=or(Le)),We(Le,h.FORBID_CONTENTS,Ne)),F&&(we["#text"]=!0),re&&We(we,["html","head","body"]),we.table&&(We(we,["tbody"]),delete de.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=h.TRUSTED_TYPES_POLICY,I=O.createHTML("")}else O===void 0&&(O=Gu(x,s)),O!==null&&typeof I=="string"&&(I=O.createHTML(""));At&&At(h),rt=h}},qt=We({},[...fo,..._o,...Mu]),Xt=We({},[...mo,...Du]),ur=function(h){let W=M(h);(!W||!W.tagName)&&(W={namespaceURI:ot,tagName:"template"});let ue=ns(h.tagName),qe=ns(W.tagName);return z[h.namespaceURI]?h.namespaceURI===$t?W.namespaceURI===at?ue==="svg":W.namespaceURI===ct?ue==="svg"&&(qe==="annotation-xml"||se[qe]):!!qt[ue]:h.namespaceURI===ct?W.namespaceURI===at?ue==="math":W.namespaceURI===$t?ue==="math"&&_e[qe]:!!Xt[ue]:h.namespaceURI===at?W.namespaceURI===$t&&!_e[qe]||W.namespaceURI===ct&&!se[qe]?!1:!Xt[ue]&&(Se[ue]||!qt[ue]):!!(De==="application/xhtml+xml"&&z[h.namespaceURI]):!1},gt=function(h){on(t.removed,{element:h});try{M(h).removeChild(h)}catch{U(h)}},vt=function(h,W){try{on(t.removed,{attribute:W.getAttributeNode(h),from:W})}catch{on(t.removed,{attribute:null,from:W})}if(W.removeAttribute(h),h==="is")if(xe||E)try{gt(W)}catch{}else try{W.setAttribute(h,"")}catch{}},pr=function(h){let W=null,ue=null;if(fe)h="<remove></remove>"+h;else{let Ke=po(h,/^[\r\n\t ]+/);ue=Ke&&Ke[0]}De==="application/xhtml+xml"&&ot===at&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let qe=O?O.createHTML(h):h;if(ot===at)try{W=new b().parseFromString(qe,De)}catch{}if(!W||!W.documentElement){W=R.createDocument(ot,"template",null);try{W.documentElement.innerHTML=mt?I:qe}catch{}}let Ye=W.body||W.documentElement;return h&&ue&&Ye.insertBefore(r.createTextNode(ue),Ye.childNodes[0]||null),ot===at?ye.call(W,re?"html":"body")[0]:re?W.documentElement:Ye},tr=function(h){return te.call(h.ownerDocument||h,h,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Bt=function(h){return h instanceof m&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof _)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},Ut=function(h){return typeof c=="function"&&h instanceof c};function p(G,h,W){ts(G,ue=>{ue.call(t,h,W,rt)})}let y=function(h){let W=null;if(p(ae.beforeSanitizeElements,h,null),Bt(h))return gt(h),!0;let ue=Ne(h.nodeName);if(p(ae.uponSanitizeElement,h,{tagName:ue,allowedTags:we}),Z&&h.hasChildNodes()&&!Ut(h.firstElementChild)&&St(/<[/\w!]/g,h.innerHTML)&&St(/<[/\w!]/g,h.textContent)||h.nodeType===dn.progressingInstruction||Z&&h.nodeType===dn.comment&&St(/<[/\w]/g,h.data))return gt(h),!0;if(!(P.tagCheck instanceof Function&&P.tagCheck(ue))&&(!we[ue]||de[ue])){if(!de[ue]&&oe(ue)&&(j.tagNameCheck instanceof RegExp&&St(j.tagNameCheck,ue)||j.tagNameCheck instanceof Function&&j.tagNameCheck(ue)))return!1;if(F&&!Le[ue]){let qe=M(h)||h.parentNode,Ye=$(h)||h.childNodes;if(Ye&&qe){let Ke=Ye.length;for(let he=Ke-1;he>=0;--he){let v=q(Ye[he],!0);v.__removalCount=(h.__removalCount||0)+1,qe.insertBefore(v,A(h))}}}return gt(h),!0}return h instanceof l&&!ur(h)||(ue==="noscript"||ue==="noembed"||ue==="noframes")&&St(/<\/no(script|embed|frames)/i,h.innerHTML)?(gt(h),!0):(C&&h.nodeType===dn.text&&(W=h.textContent,ts([ke,Be,Ue],qe=>{W=an(W,qe," ")}),h.textContent!==W&&(on(t.removed,{element:h.cloneNode()}),h.textContent=W)),p(ae.afterSanitizeElements,h,null),!1)},S=function(h,W,ue){if(Q&&(W==="id"||W==="name")&&(ue in r||ue in Re))return!1;if(!(Ee&&!N[W]&&St(Ve,W))){if(!(be&&St(He,W))){if(!(P.attributeCheck instanceof Function&&P.attributeCheck(W,h))){if(!pe[W]||N[W]){if(!(oe(h)&&(j.tagNameCheck instanceof RegExp&&St(j.tagNameCheck,h)||j.tagNameCheck instanceof Function&&j.tagNameCheck(h))&&(j.attributeNameCheck instanceof RegExp&&St(j.attributeNameCheck,W)||j.attributeNameCheck instanceof Function&&j.attributeNameCheck(W,h))||W==="is"&&j.allowCustomizedBuiltInElements&&(j.tagNameCheck instanceof RegExp&&St(j.tagNameCheck,ue)||j.tagNameCheck instanceof Function&&j.tagNameCheck(ue))))return!1}else if(!kt[W]){if(!St(Ae,an(ue,Ie,""))){if(!((W==="src"||W==="xlink:href"||W==="href")&&h!=="script"&&Iu(ue,"data:")===0&&Te[h])){if(!(L&&!St(Qe,an(ue,Ie,"")))){if(ue)return!1}}}}}}}return!0},oe=function(h){return h!=="annotation-xml"&&po(h,ve)},me=function(h){p(ae.beforeSanitizeAttributes,h,null);let{attributes:W}=h;if(!W||Bt(h))return;let ue={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},qe=W.length;for(;qe--;){let Ye=W[qe],{name:Ke,namespaceURI:he,value:v}=Ye,f=Ne(Ke),u=v,T=Ke==="value"?u:Lu(u);if(ue.attrName=f,ue.attrValue=T,ue.keepAttr=!0,ue.forceKeepAttr=void 0,p(ae.uponSanitizeAttribute,h,ue),T=ue.attrValue,K&&(f==="id"||f==="name")&&(vt(Ke,h),T=w+T),Z&&St(/((--!?|])>)|<\/(style|title|textarea)/i,T)){vt(Ke,h);continue}if(f==="attributename"&&po(T,"href")){vt(Ke,h);continue}if(ue.forceKeepAttr)continue;if(!ue.keepAttr){vt(Ke,h);continue}if(!H&&St(/\/>/i,T)){vt(Ke,h);continue}C&&ts([ke,Be,Ue],ge=>{T=an(T,ge," ")});let Y=Ne(h.nodeName);if(!S(Y,f,T)){vt(Ke,h);continue}if(O&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!he)switch(x.getAttributeType(Y,f)){case"TrustedHTML":{T=O.createHTML(T);break}case"TrustedScriptURL":{T=O.createScriptURL(T);break}}if(T!==u)try{he?h.setAttributeNS(he,Ke,T):h.setAttribute(Ke,T),Bt(h)?gt(h):Oi(t.removed)}catch{vt(Ke,h)}}p(ae.afterSanitizeAttributes,h,null)},Ge=function G(h){let W=null,ue=tr(h);for(p(ae.beforeSanitizeShadowDOM,h,null);W=ue.nextNode();)p(ae.uponSanitizeShadowNode,W,null),y(W),me(W),W.content instanceof o&&G(W.content);p(ae.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(G){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},W=null,ue=null,qe=null,Ye=null;if(mt=!G,mt&&(G="<!-->"),typeof G!="string"&&!Ut(G))if(typeof G.toString=="function"){if(G=G.toString(),typeof G!="string")throw ln("dirty is not a string, aborting")}else throw ln("toString is not a function");if(!t.isSupported)return G;if(le||xt(h),t.removed=[],typeof G=="string"&&(X=!1),X){if(G.nodeName){let v=Ne(G.nodeName);if(!we[v]||de[v])throw ln("root node is forbidden and cannot be sanitized in-place")}}else if(G instanceof c)W=pr("<!---->"),ue=W.ownerDocument.importNode(G,!0),ue.nodeType===dn.element&&ue.nodeName==="BODY"||ue.nodeName==="HTML"?W=ue:W.appendChild(ue);else{if(!xe&&!C&&!re&&G.indexOf("<")===-1)return O&&B?O.createHTML(G):G;if(W=pr(G),!W)return xe?null:B?I:""}W&&fe&&gt(W.firstChild);let Ke=tr(X?G:W);for(;qe=Ke.nextNode();)y(qe),me(qe),qe.content instanceof o&&Ge(qe.content);if(X)return G;if(xe){if(E)for(Ye=ee.call(W.ownerDocument);W.firstChild;)Ye.appendChild(W.firstChild);else Ye=W;return(pe.shadowroot||pe.shadowrootmode)&&(Ye=ne.call(n,Ye,!0)),Ye}let he=re?W.outerHTML:W.innerHTML;return re&&we["!doctype"]&&W.ownerDocument&&W.ownerDocument.doctype&&W.ownerDocument.doctype.name&&St(ji,W.ownerDocument.doctype.name)&&(he="<!DOCTYPE "+W.ownerDocument.doctype.name+`>
`+he),C&&ts([ke,Be,Ue],v=>{he=an(he,v," ")}),O&&B?O.createHTML(he):he},t.setConfig=function(){let G=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xt(G),le=!0},t.clearConfig=function(){rt=null,le=!1},t.isValidAttribute=function(G,h,W){rt||xt({});let ue=Ne(G),qe=Ne(h);return S(ue,qe,W)},t.addHook=function(G,h){typeof h=="function"&&on(ae[G],h)},t.removeHook=function(G,h){if(h!==void 0){let W=Cu(ae[G],h);return W===-1?void 0:Ru(ae[G],W,1)[0]}return Oi(ae[G])},t.removeHooks=function(G){ae[G]=[]},t.removeAllHooks=function(){ae=qi()},t}var zi=Wi();var ar={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ss=e=>(...t)=>({_$litDirective$:e,values:t}),Gr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var un=class extends Gr{constructor(t){if(super(t),this.it=lt,t.type!==ar.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===lt||t==null)return this._t=void 0,this.it=t;if(t===Pt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};un.directiveName="unsafeHTML",un.resultType=1;var Hi=ss(un);function $o(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Or=$o();function Qi(e){Or=e}var mn={exec:()=>null};function Ze(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Tt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Vu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Tt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Yu=/^(?:[ \t]*(?:\n|$))+/,Ku=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Zu=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Xu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,xo=/(?:[*+-]|\d{1,9}[.)])/,Ji=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,el=Ze(Ji).replace(/bull/g,xo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Qu=Ze(Ji).replace(/bull/g,xo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),So=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ju=/^[^\n]+/,Ao=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ep=Ze(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ao).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),tp=Ze(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,xo).getRegex(),ds="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Eo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,rp=Ze("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Eo).replace("tag",ds).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),tl=Ze(So).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ds).getRegex(),np=Ze(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",tl).getRegex(),To={blockquote:np,code:Ku,def:ep,fences:Zu,heading:Xu,hr:gn,html:rp,lheading:el,list:tp,newline:Yu,paragraph:tl,table:mn,text:Ju},Gi=Ze("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ds).getRegex(),sp={...To,lheading:Qu,table:Gi,paragraph:Ze(So).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Gi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ds).getRegex()},op={...To,html:Ze(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Eo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ze(So).replace("hr",gn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",el).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ap=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ip=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,rl=/^( {2,}|\\)\n(?!\s*$)/,lp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,us=/[\p{P}\p{S}]/u,Co=/[\s\p{P}\p{S}]/u,nl=/[^\s\p{P}\p{S}]/u,cp=Ze(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Co).getRegex(),sl=/(?!~)[\p{P}\p{S}]/u,dp=/(?!~)[\s\p{P}\p{S}]/u,up=/(?:[^\s\p{P}\p{S}]|~)/u,pp=Ze(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Vu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ol=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,fp=Ze(ol,"u").replace(/punct/g,us).getRegex(),_p=Ze(ol,"u").replace(/punct/g,sl).getRegex(),al="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",mp=Ze(al,"gu").replace(/notPunctSpace/g,nl).replace(/punctSpace/g,Co).replace(/punct/g,us).getRegex(),gp=Ze(al,"gu").replace(/notPunctSpace/g,up).replace(/punctSpace/g,dp).replace(/punct/g,sl).getRegex(),bp=Ze("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,nl).replace(/punctSpace/g,Co).replace(/punct/g,us).getRegex(),hp=Ze(/\\(punct)/,"gu").replace(/punct/g,us).getRegex(),yp=Ze(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),vp=Ze(Eo).replace("(?:-->|$)","-->").getRegex(),wp=Ze("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",vp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),is=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,kp=Ze(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",is).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),il=Ze(/^!?\[(label)\]\[(ref)\]/).replace("label",is).replace("ref",Ao).getRegex(),ll=Ze(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ao).getRegex(),$p=Ze("reflink|nolink(?!\\()","g").replace("reflink",il).replace("nolink",ll).getRegex(),Vi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ro={_backpedal:mn,anyPunctuation:hp,autolink:yp,blockSkip:pp,br:rl,code:ip,del:mn,emStrongLDelim:fp,emStrongRDelimAst:mp,emStrongRDelimUnd:bp,escape:ap,link:kp,nolink:ll,punctuation:cp,reflink:il,reflinkSearch:$p,tag:wp,text:lp,url:mn},xp={...Ro,link:Ze(/^!?\[(label)\]\((.*?)\)/).replace("label",is).getRegex(),reflink:Ze(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",is).getRegex()},vo={...Ro,emStrongRDelimAst:gp,emStrongLDelim:_p,url:Ze(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Vi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ze(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Vi).getRegex()},Sp={...vo,br:Ze(rl).replace("{2,}","*").getRegex(),text:Ze(vo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},os={normal:To,gfm:sp,pedantic:op},pn={normal:Ro,gfm:vo,breaks:Sp,pedantic:xp},Ap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yi=e=>Ap[e];function ir(e,t){if(t){if(Tt.escapeTest.test(e))return e.replace(Tt.escapeReplace,Yi)}else if(Tt.escapeTestNoEncode.test(e))return e.replace(Tt.escapeReplaceNoEncode,Yi);return e}function Ki(e){try{e=encodeURI(e).replace(Tt.percentDecode,"%")}catch{return null}return e}function Zi(e,t){let r=e.replace(Tt.findPipe,(o,a,c)=>{let l=!1,d=a;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(Tt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Tt.slashPipe,"|");return n}function fn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Ep(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Xi(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,l}function Tp(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var ls=class{constructor(e){nt(this,"options");nt(this,"rules");nt(this,"lexer");this.options=e||Or}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:fn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Tp(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=fn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=fn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))c.push(r[l]),a=!0;else if(!a)c.push(r[l]);else break;r=r.slice(l);let d=c.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=m,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let x=b,k=x.raw+`
`+r.join(`
`),q=this.blockquote(k);o[o.length-1]=q,n=n.substring(0,n.length-x.raw.length)+q.raw,s=s.substring(0,s.length-x.text.length)+q.text;break}else if(b?.type==="list"){let x=b,k=x.raw+`
`+r.join(`
`),q=this.list(k);o[o.length-1]=q,n=n.substring(0,n.length-b.raw.length)+q.raw,s=s.substring(0,s.length-x.raw.length)+q.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,q=>" ".repeat(3*q.length)),b=e.split(`
`,1)[0],x=!m.trim(),k=0;if(this.options.pedantic?(k=2,_=m.trimStart()):x?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,_=m.slice(k),k+=t[1].length),x&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,e=e.substring(b.length+1),l=!0),!l){let q=this.rules.other.nextBulletRegex(k),U=this.rules.other.hrRegex(k),A=this.rules.other.fencesBeginRegex(k),$=this.rules.other.headingBeginRegex(k),M=this.rules.other.htmlBeginRegex(k);for(;e;){let O=e.split(`
`,1)[0],I;if(b=O,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),I=b):I=b.replace(this.rules.other.tabCharGlobal,"    "),A.test(b)||$.test(b)||M.test(b)||q.test(b)||U.test(b))break;if(I.search(this.rules.other.nonSpaceChar)>=k||!b.trim())_+=`
`+I.slice(k);else{if(x||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(m)||$.test(m)||U.test(m))break;_+=`
`+b}!x&&!b.trim()&&(x=!0),d+=O+`
`,e=e.substring(O.length+1),m=I.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=_.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=_.raw+l.tokens[0].raw,l.tokens[0].text=_.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(_)):l.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):l.tokens.unshift(_)}}if(!s.loose){let d=l.tokens.filter(m=>m.type==="space"),_=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=_}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Zi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Zi(a,o.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=fn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ep(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Xi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Xi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+l);let _=[...n[0]][0].length,m=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let x=m.slice(1,-1);return{type:"em",raw:m,text:x,tokens:this.lexer.inlineTokens(x)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Gt=class wo{constructor(t){nt(this,"tokens");nt(this,"options");nt(this,"state");nt(this,"inlineQueue");nt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Or,this.options.tokenizer=this.options.tokenizer||new ls,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Tt,block:os.normal,inline:pn.normal};this.options.pedantic?(r.block=os.pedantic,r.inline=pn.pedantic):this.options.gfm&&(r.block=os.gfm,this.options.breaks?r.inline=pn.breaks:r.inline=pn.gfm),this.tokenizer.rules=r}static get rules(){return{block:os,inline:pn}}static lex(t,r){return new wo(r).lex(t)}static lexInline(t,r){return new wo(r).inlineTokens(t)}lex(t){t=t.replace(Tt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Tt.tabCharGlobal,"    ").replace(Tt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,c=t.slice(1),l;this.options.extensions.startBlock.forEach(d=>{l=d.call({lexer:this},c),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let l;if(this.options.extensions?.inline?.some(_=>(l=_.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let _=r.at(-1);l.type==="text"&&_?.type==="text"?(_.raw+=l.raw,_.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,c)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,m=t.slice(1),b;this.options.extensions.startInline.forEach(x=>{b=x.call({lexer:this},m),typeof b=="number"&&b>=0&&(_=Math.min(_,b))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(c=l.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=l.raw,_.text+=l.text):r.push(l);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},cs=class{constructor(e){nt(this,"options");nt(this,"parser");this.options=e||Or}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Tt.notSpaceStart)?.[0],s=e.replace(Tt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ir(n)+'">'+(r?s:ir(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ir(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ir(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Ki(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+ir(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ki(e);if(s===null)return ir(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${ir(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ir(e.text)}},Io=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Vt=class ko{constructor(t){nt(this,"options");nt(this,"renderer");nt(this,"textRenderer");this.options=t||Or,this.options.renderer=this.options.renderer||new cs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Io}static parse(t,r){return new ko(r).parse(t)}static parseInline(t,r){return new ko(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},as,_n=(as=class{constructor(e){nt(this,"options");nt(this,"block");this.options=e||Or}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Gt.lex:Gt.lexInline}provideParser(){return this.block?Vt.parse:Vt.parseInline}},nt(as,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),nt(as,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),as),Cp=class{constructor(...e){nt(this,"defaults",$o());nt(this,"options",this.setOptions);nt(this,"parse",this.parseMarkdown(!0));nt(this,"parseInline",this.parseMarkdown(!1));nt(this,"Parser",Vt);nt(this,"Renderer",cs);nt(this,"TextRenderer",Io);nt(this,"Lexer",Gt);nt(this,"Tokenizer",ls);nt(this,"Hooks",_n);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new cs(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],l=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=l.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new ls(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=l.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new _n;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],l=s[a];_n.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&_n.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await c.call(s,d);return l.call(s,m)})();let _=c.call(s,d);return l.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await c.apply(s,d);return m===!1&&(m=await l.apply(s,d)),m})();let _=c.apply(s,d);return _===!1&&(_=l.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Gt.lex(e,t??this.defaults)}parser(e,t){return Vt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+ir(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Lr=new Cp;function et(e,t){return Lr.parse(e,t)}et.options=et.setOptions=function(e){return Lr.setOptions(e),et.defaults=Lr.defaults,Qi(et.defaults),et};et.getDefaults=$o;et.defaults=Or;et.use=function(...e){return Lr.use(...e),et.defaults=Lr.defaults,Qi(et.defaults),et};et.walkTokens=function(e,t){return Lr.walkTokens(e,t)};et.parseInline=Lr.parseInline;et.Parser=Vt;et.parser=Vt.parse;et.Renderer=cs;et.TextRenderer=Io;et.Lexer=Gt;et.lexer=Gt.lex;et.Tokenizer=ls;et.Hooks=_n;et.parse=et;var Ag=et.options,Eg=et.setOptions,Tg=et.use,Cg=et.walkTokens,Rg=et.parseInline;var Ig=Vt.parse,Lg=Gt.lex;function hr(e){let t=et.parse(e),r=zi.sanitize(t);return Hi(r)}function lr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Vr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ps(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Rp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ip=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Lp=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function yr(e){return!!e&&typeof e=="object"}function Lo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function cl(e,t){let r=Lo(e),n=Lo(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let l=s.get(c)||0;l>0?s.set(c,l-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Op(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>yr(s)&&typeof s.text=="string"?s.text:"").join(""):yr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Pp(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Rp[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Lo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=cl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let l=cl(yr(c)?c.old_string:"",yr(c)?c.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function dl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ul(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ip.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Lp.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Mp(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(yr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ul(o.text));else if(o.type==="thinking"){let a=dl(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Pp(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(yr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Op(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Dp(e){if(e.type==="item.completed"&&yr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ul(t.text)];if(t.type==="reasoning"){let r=dl(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Np(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function pl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!yr(o))continue;let a=Np(o)?Dp(o):Mp(o,r);for(let c of a)t.push(c)}return t}var Fp=5,qp=10,Bp=/Task\s+#(\d+)/,Up=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,jp=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function fs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Wp(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function zp(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Hp(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Bp.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Gp(e){if(e.tool==="Bash"){let t=e.command||"";return Up.test(t)?"~ PR/\uAC8C\uC2DC \uC911":jp.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Vp(e){let t=e.filter(s=>s.kind==="tool").slice(-qp),r=new Map;t.forEach((s,o)=>{let a=Gp(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Yp(e){let t=zp(e);if(t)return{text:t,guess:!1};let r=Hp(e);if(r)return{text:r,guess:!1};let n=Vp(e);return n?{text:n,guess:!0}:null}function Kp(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ot(e,t)}function _s(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},c=!0,l=new Set,d=new Set,_=null,m=null,b=!1,x=!1,k=!1,q=null,U=null;function A(){b=!1,x=!1,k=!1,q=null,U=null}async function $(N){if(r){x=!0,k=!1,Ie();try{let P=await Promise.resolve(r("get-attempt-prompt",{attempt_id:N}));if(o!==N)return;!P||typeof P!="object"||Array.isArray(P)?k=!0:(q=P,U=N)}catch{o===N&&(k=!0)}finally{o===N&&(x=!1,Ie())}}}function M(){if(b=!b,b&&o&&U!==o){$(o);return}Ie()}function O(){if(!b)return"";let N=Vr({loading:x,error:k});if(N)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${N}
      </div>`;if(!q)return"";if(q.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let P=ps(q.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${P?i`<div class="prompt-block__meta">${P} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function I(){if(!o||!n)return[];let N=n.get(o);return pl(N?N.lines:[])}function R(){if(!o||!n)return null;let N=n.get(o),P=N?N.last_event_at:null;return typeof P=="number"?P:null}function te(){return a.status==="running"}function ee(){if(te()&&o){m||(m=setInterval(()=>Ie(),1e3));return}ye()}function ye(){m&&(clearInterval(m),m=null)}function ne(N){let P=[],be=0;for(;be<N.length;){let Ee=N[be];if(Ee.kind==="tool"){let L=be;for(;L<N.length&&N[L].kind==="tool"&&N[L].tool===Ee.tool;)L+=1;if(L-be>=Fp&&!d.has(be)){P.push({kind:"group",idx:be,tool:Ee.tool||"",lines:N.slice(be,L).map((H,C)=>({idx:be+C,line:H}))}),be=L;continue}}P.push({kind:"line",idx:be,line:Ee}),be+=1}return P}function ae(N){for(let P=N.length-1;P>=0;P-=1){let be=N[P];if(be.kind==="result"||be.kind==="error")return null;if(be.kind==="tool"&&!Object.hasOwn(be,"result"))return be}return null}function ke(N){for(let P=N.length-1;P>=0;P-=1)if(N[P].kind==="thinking")return N[P];return null}function Be(N,P){if(P.kind==="gate")return i`<div class="sv__gate">${P.text}</div>`;if(P.kind==="phase")return i`<div class="sv__phase">${P.text}</div>`;if(P.kind==="result")return i`<div
        class="sv__result${P.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${P.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${hr(P.text||(P.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(P.kind==="thinking"){let be=l.has(N);return i`<div
        class="sv__think${be?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ae(N)}
      >
        <span class="sv__think-line">💭 ${fs(P.text)}</span>
        ${be?i`<pre class="sv__think-expand">${P.text}</pre>`:""}
      </div>`}if(P.kind==="error")return i`<div class="sv__error">⛔ ${P.text}</div>`;if(P.kind==="blocker")return i`<div class="sv__error">⛔ ${P.text}</div>`;if(P.kind==="tool"){let be=l.has(N),Ee=P.tool==="Bash"?Wp(P.command):0,L=P.tool==="Bash"?Ee>1?fs(P.command):P.command:P.path||P.command||"";return i`<div
        class="sv__tool${be?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ae(N)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${P.icon}</span>
          <span class="sv__tool-name">${P.tool}</span>
          ${L?i`<span class="sv__tool-detail">${L}</span>`:""}
          ${Ee>1?i`<span class="sv__tool-more">⋯ ${Ee}줄</span>`:""}
          ${typeof P.added=="number"?i`<span class="sv__diff-add">+${P.added}</span>`:""}
          ${typeof P.removed=="number"?i`<span class="sv__diff-del">−${P.removed}</span>`:""}
          ${P.result?i`<span class="sv__tool-ok">→ ${P.result}</span>`:""}
        </span>
        ${be?i`<pre class="sv__tool-expand">${Ue(P)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${hr(P.text||"")}</div>`}function Ue(N){let P=[];if(N.tool==="Bash"&&typeof N.command=="string"&&N.command.length>0)P.push(N.command);else if(N.input!==void 0)try{P.push(`input: ${JSON.stringify(N.input,null,2)}`)}catch{}return typeof N.output=="string"&&N.output.length>0&&P.push(`output:
${N.output}`),P.join(`

`)}function Ve(){if(!o)return i``;let N=I(),P=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),be=a.session_id||"",Ee=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,L=te(),H=L?Kp(R(),Date.now()):"",C=L?ae(N):null,Z=L?ke(N):null,re=Yp(N);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${re?i`<span
              class="sv__stage${re.guess?" sv__stage--guess":""}"
              title=${re.text}
              >${re.text}</span
            >`:""}
        ${L?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${H?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${H}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${H?i`<span class="sv__live-ago">${H}</span>`:""}</span
            >`:""}
        ${be?i`<button
              type="button"
              class="sv__session"
              title=${be}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${be}`}
              @click=${()=>Pe(be)}
            >
              ⧉ ${be.slice(0,8)}
            </button>`:""}
        ${P?i`<span class="sv__meta">${P}</span>`:""}
        ${a.worktree?i`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${b?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${b?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${M}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${Ee}
          @click=${we}
        >
          <span class="sv__follow-full">⇣ ${Ee}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>de()}
        >
          ✕
        </button>
      </div>
      ${O()}
      <div class="sv__body">
        ${N.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:ne(N).map(le=>le.kind==="group"?He(le):Be(le.idx,le.line))}
      </div>
      ${C||Z?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${C?i`<span class="sv__now-icon">${C.icon}</span>
                  <span class="sv__now-name">${C.tool}</span>
                  <span class="sv__now-detail"
                    >${C.tool==="Bash"?fs(C.command):C.path||C.command||""}</span
                  >`:""}
            ${Z?i`<span class="sv__now-think"
                  >💭 ${fs(Z.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function He(N){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Qe(N.idx)}
    >
      <span class="sv__group-icon">${N.lines[0].line.icon}</span>
      <span class="sv__group-name">${N.tool}</span>
      <span class="sv__group-count">${N.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Qe(N){d.add(N),Ie()}function Ie(){ze(Ve(),e),ee(),c&&ve()}function ve(){let N=e.querySelector(".sv__body");N&&(N.scrollTop=N.scrollHeight)}function Ae(N){l.has(N)?l.delete(N):l.add(N),Ie()}function we(){c=!c,Ie()}function Pe(N){Ir(N).then(P=>{P?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function pe(N){!o||!N||(a={...a,...N},Ie())}function V(N){let P=N.target;if(!P||!P.classList||!P.classList.contains("sv__body"))return;!(P.scrollHeight-P.scrollTop-P.clientHeight<=4)&&c&&(c=!1,Ie())}e.addEventListener("scroll",V,!0);function j(N){let P=N&&N.attempt_id;P&&(o=P,a=N.meta||{},c=!0,l.clear(),d.clear(),A(),!_&&n&&(_=n.subscribe(Ie)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Ie())}function de(){let N=o;o=null,l.clear(),d.clear(),A(),ye(),r&&N&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${N}`})).catch(()=>{}),ze(i``,e),s&&s()}return{open:j,updateMeta:pe,close:de,isOpen(){return o!==null},destroy(){ye(),_&&(_(),_=null),e.removeEventListener("scroll",V,!0),o=null,ze(i``,e)}}}function bn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=fl(t.spec_id),s=fl(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function fl(e){return typeof e=="string"?e.trim():""}function Zp(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Xp(e){let t=e&&e.metadata||{},r=bn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Zp(t)?null:"plan_pending"}),n}function _l(e,t){let r=Xp(e);return i`
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
  `}var Qp="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Jp=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ef=/^\*\*결론\*\* — (.+)$/;function ms(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Qp)return null;let r=Jp.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?ef.exec(t[a]):null,l=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var ml=20;function gl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function tf(e){return e.length>ml?`${e.slice(0,ml)}\u2026`:e}function rf(e,t,r,n){let s=`${t.lane} ${tf(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${gl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${hr(t.body)}
        </div>`:""}
  </div>`}function nf(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${gl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${hr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function bl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${c.map(l=>{let d=ms(typeof l.text=="string"?l.text:"");return d?rf(l,d,t,s.has(l.id)):nf(l)})}
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
  `}var{I:ub}=Wa;var hl=e=>e.strings===void 0;var sf={},yl=(e,t=sf)=>e._$AH=t;var Pr=ss(class extends Gr{constructor(e){if(super(e),e.type!==ar.PROPERTY&&e.type!==ar.ATTRIBUTE&&e.type!==ar.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!hl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Pt||t===lt)return t;let r=e.element,n=e.name;if(e.type===ar.PROPERTY){if(t===r[n])return Pt}else if(e.type===ar.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Pt}else if(e.type===ar.ATTRIBUTE&&r.getAttribute(n)===t+"")return Pt;return yl(e),t}});var Oo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],gs=["orchestration_model","orchestration_effort","orchestration_speed"],vl=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],bs=["delegated","main"],hs=["inherit","claude","codex"],hn=["default","fast"],ys=["standard","fast_track"],yn=["codex","opus","fable","self","skip"],vs=["codex","fable","skip"],ws=["low","medium","high","xhigh"],Ft="auto";function cr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function wl(e){if(!cr(e)||!cr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))cr(n)&&cr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function kl(e){return e?.impl_dispatch==="main"}function ks(e,t){let r=wl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Ft,...n.flatMap(([,s])=>s)]}function Yr(e,t,r){if(!cr(e)||!cr(e.runners))return[Ft];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!cr(o)||!cr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,c]of Object.entries(o.models)){if(r&&r!==Ft&&a!==r)continue;let l=cr(c)?c.efforts:null;if(Array.isArray(l))for(let d of l)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[Ft,...n]}function $s(e,t){let r=wl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function $l(e,t){let r={};for(let n of Oo){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function xl(e,t){let r={};for(let n of gs){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Po=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...gs]}],Mo={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Al={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Sl(e){return typeof e=="string"&&e.length>0?e:null}function of(e,t,r){let n=Sl(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=Sl(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function xs(e,t,r){return e.map(n=>({key:n,...of(n,t,r)}))}function El(e,t,r){let n={pin:0,global:0,base:0};for(let s of xs(e,t,r))n[s.source]+=1;return n}function Tl(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Cl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var vb=[...Oo,...gs];var af=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],lf={pin:"pin",global:"global",base:"base"};function cf(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${lf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function df(e,t,r){switch(e){case"workflow_mode":return ys;case"spec_review_model":case"impl_review_model":return yn;case"plan_review_model":return vs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ws;case"impl_dispatch":return bs;case"impl_runtime":return hs;case"impl_model":return ks(r,t.impl_runtime);case"impl_effort":return Yr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return hn;case"orchestration_model":return $s(r,null);case"orchestration_effort":return Yr(r,void 0,t.orchestration_model||Ft).filter(n=>n!==Ft);default:return[]}}function uf(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${cf(e.source)}
    <span class="detail-effective__k"
      >${Mo[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Al[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Mo[e.key]||e.key} \uD3B8\uC9D1`}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>(기본)</option>
          ${t.options.map(r=>i`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===Ft?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function Rl(e,t){let r=Po.flatMap(o=>o.keys),n=El(r,e.metadata,e.workspace_values),s={};for(let o of xs(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
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
      <span class="detail-effective__summary">${pf(s)}</span>
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
      ${Po.map(o=>i`
          <div class="detail-effective__subhead">${o.label}</div>
          ${xs(o.keys,e.metadata,e.workspace_values).map(a=>uf(a,{expanded:e.expanded,options:df(a.key,s,e.catalog),onEdit:t.onEdit}))}
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
  </section>`}function pf(e){let t=[];if(typeof e.workflow_mode=="string"&&t.push(String(e.workflow_mode)),e.impl_dispatch==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch==="delegated"){let r=typeof e.impl_runtime=="string"?` ${e.impl_runtime}`:"";t.push(`\uC704\uC784${r}`)}else typeof e.impl_runtime=="string"&&t.push(`\uC704\uC784 ${e.impl_runtime}`);return typeof e.impl_model=="string"&&t.push(String(e.impl_model)),t.length>0?t.join(" \xB7 "):"\uAE30\uBCF8"}function Il(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",c=Xn(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${c?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${c.kind}
            title=${c.title}
            >${c.label}</span
          >`:""}
      ${a?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${af.map(l=>{let d=l.receipt&&typeof t[l.receipt]=="string"?String(t[l.receipt]):"",_=n[l.id],m=d.length>0||_?.fill==="full",b=!m&&_?.fill==="dim",x=_?.stale===!0;return i`<span
          class=${`detail-summary__gate${m?" detail-summary__gate--on":""}${b?" detail-summary__gate--current":""}${x?" detail-summary__gate--stale":""}`}
          data-gate=${l.id}
        >
          <span class="detail-summary__gate-pill">${l.label}</span>
          ${d?i`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var Ll=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function vn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ss(e){if(!vn(e)||!vn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>vn(r)&&vn(r.models));return t.length>0?t:null}function Do(e,t){let r=Ss(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Ol(e,t){return vn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Pl(e,t){let r=Ss(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Ol(n,n.models[t]);return[]}function ff(e){let t=Ss(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Ol(n,s))r.includes(o)||r.push(o);return r}function _f(e,t){if(!t)return ff(e);let n=Ss(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Pl(e,o))s.includes(a)||s.push(a);return s}function Ml(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Do(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Pl(t,n.impl_model):_f(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function mf(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Dl(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function l(k){k.key==="Escape"&&s&&(k.preventDefault(),b())}document.addEventListener("keydown",l);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${mf(s)}</span
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
                    </div>`:hr(a)}
          </div>
        </div>
      </div>
    `:i``}function _(){ze(d(),e)}async function m(k,q={}){s=k,o="loading",a="",c="",_();let U=r?r():"";if(!U){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let A="/api/doc?workspace="+encodeURIComponent(U)+"&path="+encodeURIComponent(k);try{let $=await n(A),M=await $.json().catch(()=>({}));if(!$.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&q.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||$.status)+")",_();return}a=String(M.content||""),o="ready",_()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function b(){s=null,ze(i``,e)}function x(){document.removeEventListener("keydown",l),b()}return{open:m,close:b,destroy:x}}var gf=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],ql="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function bf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function hf(e){let t=wt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=zr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${ql}
          >부분 집계</span
        >`:""}`}function Nl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Fl(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Bl(t):""}function yf(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=wt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
        ${Fl(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${Fl(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function vf(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...gf,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${bf(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${ql}</span>`:""}
  </div>`}var wf={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Bl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function kf(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Ul(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let m=typeof d.session_id=="string"&&d.session_id.length>0,b=o.has(d.attempt_id),x=m&&!b,k=m?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!x}
      title=${k}
      @click=${q=>{q.stopPropagation(),x&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let m=d.cause_detail,b=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:d.cause;return i`<div class="detail-session__cause" title=${b}>
      ${d.cause}
    </div>`},l=d=>{let _=Nl(co(d));if(wt(_).length===0&&!zr(d.usage))return"";let m=s.has(d.attempt_id);return i`<button
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
      세션 이력${hf(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let _=co(d),m=Nl(_),b=wt(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${wf[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${gr(d)?i`<span
                  class="detail-session__resumed"
                  title=${gr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Jt(d)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(x=>i`<span
                      class="detail-session__usage"
                      title=${x.tooltip}
                      >${x.label}</span
                    >`):zr(d.usage)?i`<span class="detail-session__usage"
                    >${zr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Bl(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${c(d)} ${kf(d)}
          ${s.has(d.attempt_id)&&d.usage?vf(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${yf(_)}
        </div>`})}
    </div>
  `}function jl(e,t={}){return i`
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
          ${$f(e)}
        </div>`:""}
  `}function $f(e){let t=Vr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?lr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=ps(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var xf=["open","in_progress","deferred","resolved","closed"],Sf=[0,1,2,3,4];function Wl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,l=t.sessionLogStore,d=null,_=null,m={},b="",x=!1,k=!1,q={},U=!1,A=!1,$="",M="",O="";function I(){U=!1,A=!1,$="",M="",O=""}let R=[],te=null,ee=null,ye=!1,ne="",ae=!1,ke=0,Be=new Set;function Ue(){R=[],te=null,ee=null,ye=!1,ne="",ae=!1,ke+=1,Be.clear()}async function Ve(v){if(!s)return;let f=++ke;try{let u=await Promise.resolve(s("get-comments",{id:v}));if(f!==ke||v!==d)return;R=Array.isArray(u)?u:[],ye=!1}catch{if(f!==ke||v!==d)return;ye=!0}he()}function He(){if(!s||!d)return;let v=_&&typeof _.comment_count=="number"?_.comment_count:null;if(te!==d){te=d,ee=v,Ve(d);return}v!==null&&v!==ee&&(ee=v,Ve(d))}function Qe(v){Be.has(v)?Be.delete(v):Be.add(v),he()}function Ie(v){let f=ne.trim().length===0;ne=v,f!==(v.trim().length===0)&&he()}async function ve(){let v=ne.trim();if(!s||!d||v.length===0||ae)return;let f=d;ae=!0,he();let u=!1;try{let T=await Promise.resolve(s("add-comment",{id:f,text:v}));Array.isArray(T)&&T.length>0&&(u=!0,f===d&&(R=T,ye=!1,ne="",ee=T.length))}catch{u=!1}u||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),f===d&&(ae=!1),he()}let Ae={onToggle:Qe,onDraftInput:Ie,onSubmit:ve},we=document.createElement("div");we.className="md-viewer-root",document.body.appendChild(we);let Pe=Dl(we,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),pe=document.createElement("div");pe.className="session-log-root",document.body.appendChild(pe);let V=_s(pe,{transport:s?(v,f)=>Promise.resolve(s(v,f)):void 0,sessionLogStore:l}),j=!1,de=!1,N=!1,P=null,be=null,Ee=0;function L(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function H(){j=!1,de=!1,N=!1,P=null,be=null,Ee+=1}async function C(v){if(!s)return;let f=++Ee;de=!0,N=!1,he();try{let u=await Promise.resolve(s("get-bead-prompt",{bead_id:v}));if(f!==Ee)return;!u||typeof u!="object"||Array.isArray(u)?N=!0:(P=u,be=L(v))}catch{f===Ee&&(N=!0)}finally{f===Ee&&(de=!1,he())}}function Z(){if(j=!j,j&&d&&be!==L(d)){P=null,C(d);return}he()}function re(){if(!a||!d)return[];let v=a.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(u=>u&&u.bead_id===d).sort((u,T)=>(T.started_at||0)-(u.started_at||0)).map(u=>({attempt_id:u.attempt_id,bead_id:u.bead_id,status:u.status,started_at:typeof u.started_at=="number"?u.started_at:null,runner:u.runner||null,model:u.model||null,effort:u.effort||null,speed:u.speed||null,session_id:u.session_id||null,resumed_from:u.resumed_from||null,continuation_mode:u.continuation_mode||null,dismissed_at:typeof u.dismissed_at=="number"?u.dismissed_at:null,cause:typeof u.cause=="string"?u.cause:null,cause_detail:u.cause_detail||null,exec_default_preset_id:typeof u.exec_default_preset_id=="string"?u.exec_default_preset_id:null,exec_default_preset_revision:typeof u.exec_default_preset_revision=="number"?u.exec_default_preset_revision:null,exec_values:u.exec_values&&typeof u.exec_values=="object"?u.exec_values:null,usage:u.usage||null,usage_legs:Array.isArray(u.usage_legs)?u.usage_legs:[]}))}function le(){if(!a||!d)return null;let v=a.get();return Dt(v&&v.attempts||{},d)}let fe=new Set;function xe(v){fe.has(v)?fe.delete(v):fe.add(v),he()}function E(v){let f=a?a.get():null,u=f&&f.attempts?f.attempts[v]:null;V.open({attempt_id:v,meta:u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}})}async function B(v){if(!s||!v)return;let f=()=>{let ge=a?a.get():null;return ge&&typeof ge.revision=="number"?ge.revision:0},u=async(ge={})=>await s("worker-attempt-resume",{attempt_id:v,expected_revision:f(),...ge}),T=ge=>{ge?.queue&&a?.set&&a.set(ge.queue)},Y=await u();if(T(Y),Y&&Y.conflict){let ge=Y.queue&&typeof Y.queue.revision=="number"?Y.queue.revision:f();Y=await s("worker-attempt-resume",{attempt_id:v,expected_revision:ge}),T(Y)}Y=await nr(Y,(ge,Oe)=>u({continuation:ge,decision_token:Oe}),{onResult:T,refresh:()=>u()}),Y&&Y.resumed===!1&&!Y.conflict&&Y.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Y.reason}`,"error",2400)}let Q={onOpen:E,onResume:B,onToggleUsage:xe};function K(){let v=a?a.get():null,f={...q};for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){let T=v&&v[u];typeof T=="string"&&(f[u]=T)}return f}async function w(){if(s){try{let v=await Promise.resolve(s("get-session-defaults",{}));q=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{q={}}he()}}function F(){let v=a?a.get():null;return v&&v.runner_catalog||null}function X(){let v=_?.metadata&&typeof _.metadata=="object"?_.metadata:{},u=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof v.orchestration_model=="string"?v.orchestration_model:"")||(typeof K().orchestration_model=="string"?K().orchestration_model:"")||"opus";return Do(F(),u)}function Me(){let v=c?c.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Le(v){return v?.compatible===!1}function Fe(v){c&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&c.set({revision:v.revision,presets:v.presets})}async function Te(){let v=Me(),f=v?.presets.find(u=>u.id===b);if(!(!s||!d||!v||!f||Le(f)||x)){x=!0,he();try{let u=await Promise.resolve(s("apply-impl-preset",Cl(d,f.id,v.revision)));if(u&&u.conflict){Fe(u),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let T=u&&Array.isArray(u.issue)?u.issue[0]:u?.issue;if(u&&u.applied&&T&&typeof T=="object"){_=T;for(let Y of Ll)delete m[Y];ie("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}u&&u.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(u){u&&typeof u=="object"&&u.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{x=!1,he()}}}let Xe=null;r&&r.subscribe&&(Xe=r.subscribe(()=>$t()));let kt=null;a&&typeof a.subscribe=="function"&&(kt=a.subscribe(()=>{d&&he()}));let yt=null;c&&typeof c.subscribe=="function"&&(yt=c.subscribe(()=>{d&&he()}));function ct(v){v.key==="Escape"&&d&&(v.preventDefault(),n())}document.addEventListener("keydown",ct);function $t(){if(d){if(r&&typeof r.snapshotFor=="function"){let v=r.snapshotFor("detail:"+d)||[];_=v.find(u=>u&&u.id===d)||v[0]||_}He(),he()}}function at(v){Ir(v).then(f=>{f?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ot(v){v.preventDefault(),v.stopPropagation(),d&&at(d)}function mt(v,f){v.preventDefault(),v.stopPropagation(),at(f)}function z(v,f,u){v.preventDefault(),v.stopPropagation(),Pe.open(f,{missing_state:u})}function J(v,f){m[v]=f,he(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Tl(d,v,f.length===0?null:f))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function se(v,f){let u=_||{},T=u.metadata&&typeof u.metadata=="object"?u.metadata:{},Y={};for(let $e of["impl_runtime","impl_model","impl_effort"])Y[$e]=Object.hasOwn(m,$e)?m[$e]:typeof T[$e]=="string"?T[$e]:"";Y[v]=f;let ge=Ml(Y,F(),X()),Oe={};for(let $e of["impl_runtime","impl_model","impl_effort"])Oe[$e]=m[$e],m[$e]=ge[$e]||"";he(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...ge,orchestration_runtime:X()})).then($e=>{let _t=Array.isArray($e)?$e[0]:$e;if(!_t||typeof _t!="object"||!_t.id)throw new Error("implementation target readback failed");_=_t;for(let Ce of["impl_runtime","impl_model","impl_effort"])delete m[Ce];he()}).catch(()=>{for(let $e of["impl_runtime","impl_model","impl_effort"])Oe[$e]===void 0?delete m[$e]:m[$e]=Oe[$e];he(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function _e(v,f,u){if(!s||!d)return!1;try{let T=await Promise.resolve(s(v,f)),Y=Array.isArray(T)?T[0]:T;return Y&&typeof Y=="object"&&Y.id?(_=Y,!0):(ie(u,"error"),!1)}catch{return ie(u,"error"),!1}}function Se(v){setTimeout(()=>{try{let f=e.querySelector(v);f&&typeof f.focus=="function"&&f.focus()}catch{}},0)}function De(){U=!0,$=_&&_.title||"",he(),Se('.detail-edit__input[data-edit="title"]')}function tt(v){$=v.target.value}function Je(){U=!1,$="",he()}function Ne(){_e("edit-text",{id:d,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(U=!1,$=""),he()})}function rt(){A=!0,M=_&&_.description||"",he(),Se('.detail-edit__textarea[data-edit="description"]')}function Re(v){M=v.target.value}function ft(){A=!1,M="",he()}function xt(){_e("edit-text",{id:d,field:"description",value:M},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(A=!1,M=""),he()})}function qt(v,f,u,T){if(v.key==="Escape"){v.stopPropagation(),u();return}v.key==="Enter"&&(!T||v.ctrlKey||v.metaKey)&&(v.preventDefault(),f())}function Xt(v){let f=v.target.value;_e("update-status",{id:d,status:f},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>he())}function ur(v){let f=Number(v.target.value);_e("update-priority",{id:d,priority:f},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>he())}function gt(v){O=v.target.value}function vt(){let v=O.trim();v.length!==0&&_e("label-add",{id:d,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(f=>{f&&(O=""),he()})}function pr(v){if(v.key==="Escape"){v.stopPropagation(),O="",he();return}v.key==="Enter"&&(v.preventDefault(),vt())}function tr(v){_e("label-remove",{id:d,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>he())}let Bt={onCopyPath:mt,onOpenDoc:z};function Ut(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function p(v){switch(v&&typeof v=="object"?String(v.dependency_type||v.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function y(v){let u=(Array.isArray(v.dependencies)?v.dependencies:[]).map(T=>({id:Ut(T),icon:p(T)})).filter(T=>T.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${u.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${u.map(T=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(T.id)}
                  >
                    ${T.icon?`${T.icon} `:""}${T.id}
                  </button>`:i`<span class="detail-dep"
                    >${T.icon?`${T.icon} `:""}${T.id}</span
                  >`)}
          </div>`}
    `}function S(v){let f=v.metadata||{},u=v.workflow||{},T=u.stages||{},Y=T.spec&&T.spec.stale,ge=T.impl&&T.impl.stale,Oe=T.plan||null,$e=u.route_source==="derived",_t=u.route||f.route||"\u2014";return i`
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
              >${f.spec_review||"\uC5C6\uC74C"}${Y?" \xB7 stale":""}</span
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
              >${f.impl_review||"\uC5C6\uC74C"}${ge?" \xB7 stale":""}</span
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
    `}let oe={route:["quick_fix","spec_backed","full_plan"]};async function me(v,f){let u=f.target.value;if(v==="route"&&_&&_.metadata&&_.metadata.route==="full_plan"&&u!=="full_plan"&&!window.confirm(`full_plan \u2192 ${u||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){he();return}await _e("update-workflow-meta",{id:d,key:v,value:u},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),he()}function Ge(v){let f=v.metadata||{};return i` ${((T,Y)=>{let ge=oe[T],Oe=typeof f[T]=="string"?f[T]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${T}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${T}
          data-edit=${`wfmeta-${T}`}
          @change=${$e=>me(T,$e)}
        >
          <option value="" ?selected=${!ge.includes(Oe)}>
            ${Y}
          </option>
          ${ge.map($e=>i`<option value=${$e} ?selected=${Oe===$e}>${$e}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function G(v,f){return U?i`
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
          @click=${De}
        >
          ✎
        </button>
      </div>
    `}function h(v){let f=bt(v.created_at),u=bt(v.updated_at);return!f&&!u?i``:i`
      ${f?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${f}</span>
          </div>`:""}
      ${u?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${u}</span>
          </div>`:""}
    `}function W(v,f){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Xt}
        >
          ${xf.map(u=>i`<option value=${u} ?selected=${u===v}>${u}</option>`)}
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
          ${Sf.map(u=>i`<option value=${String(u)} ?selected=${u===f}>
                P${u}
              </option>`)}
        </select>
      </div>
    `}function ue(v){return i`
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
              .value=${M}
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
    `}function qe(v){let f=typeof v.notes=="string"?v.notes:"";return f.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${f}</div>
    `}function Ye(v){let f=Array.isArray(v.labels)?v.labels:[];return i`
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
            .value=${O}
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
    `}function Ke(){if(!d)return i``;let v=_||{},f=String(v.id||d),u=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",T=le(),Y=v.status||"open",ge=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",Oe=v.description||"",$e={...v,metadata:{...v.metadata||{},...m}};return i`
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
          ${G(u,T)}
          ${Il($e)}
          ${Rl({metadata:$e.metadata,workspace_values:K(),catalog:F(),expanded:k,presets:Me()?.presets||[],preset_id:b,preset_busy:x},{onToggle:()=>{k=!k,he()},onEdit:(_t,Ce)=>{if(_t==="impl_runtime"||_t==="impl_model"||_t==="impl_effort"){se(_t,Ce??"");return}J(_t,Ce??"")},onPresetSelect:_t=>{b=_t,he()},onPresetApply:()=>{Te()}})}
          ${W(Y,ge)} ${h(v)}
          ${ue(Oe)}
          ${bl(R,Ae,{expanded:Be,draft:ne,sending:ae,error:ye})}
          ${qe(v)} ${Ye(v)} ${y(v)}
          ${S(v)} ${Ge(v)}
          ${_l(v,Bt)}
          ${jl({expanded:j,loading:de,error:N,data:P},{onToggle:Z})}
          ${Ul(re(),Q,{total:T,expanded:fe})}
        </div>
      </div>
    `}function he(){ze(Ke(),e)}return{load(v){v!==d&&(m={},b="",k=!1,I(),Ue(),H()),d=v,_=null,$t(),w()},clear(){d=null,_=null,m={},b="",x=!1,I(),Ue(),H(),Pe.close(),V.close(),ze(i``,e)},destroy(){Xe&&(Xe(),Xe=null),kt&&(kt(),kt=null),yt&&(yt(),yt=null),document.removeEventListener("keydown",ct),Pe.destroy(),we.parentNode&&we.parentNode.removeChild(we),V.destroy(),pe.parentNode&&pe.parentNode.removeChild(pe),d=null,_=null,b="",x=!1,Ue(),H(),ze(i``,e)}}}function zl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,_,m="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:l,close:c,getElement(){return t}}}function As(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function No(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function Es(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Af(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let c of r)c.kind!=="deploy"||c.state!=="succeeded"||typeof c.target_sha!="string"||(!s||(typeof c.finished_at=="number"?c.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=c);let o=r.filter(c=>c.state==="failed"&&!c.dismissed&&!c.superseded_by).length+n.length,a=r.some(c=>c.state==="repairing");return{deploy:s?{sha:As(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Hl(e,t){let r=Af(e,t);return r?i`<button
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
            title=${r.deploy.at?bt(r.deploy.at):""}
            >${Es(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${No(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Kr(e){let t=Ot(e.created_at),r=Ot(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Ef(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function wn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ts(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function er(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,b)=>(m.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,c=typeof s?.last_error=="string"?s.last_error:null,l=s?Ef(s.phase):null,d=s?.kind==="stale_work_backup_fresh",_=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!c),label:d?c?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":c?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(c?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${c} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${c} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:_==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:c,confirmation:_}}function dr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var Tf={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Gl(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.state==="unique"?"unique":"unknown",o=n.summary&&typeof n.summary=="object"?n.summary:{};function a(l){return Number.isInteger(o[l])?Number(o[l]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{state:s,title:s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Tf[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function Fo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=wt(e.usage),s=zt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,c=e.lane==="done"&&!a,l=c?Ot(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",x=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=i`<span class="worker-mini__title">${e.title}</span>`,q=e.pr_url&&e.pr_number?i`<a
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
        >`:"",A=r.map(Ve=>Ve===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ve}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ve===e.completion_badge&&e.completion_title||""}
          >${Ve}</span
        >`),$=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",M=n.length>0?n.map(Ve=>i`<span class="worker-usage" title=${Ve.tooltip}
              >${Ve.label}</span
            >`):s?i`<span class="worker-usage" title=${Hr(e.usage)}
            >${s}</span
          >`:"",O=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",I=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",R=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",te=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ee=e.discard,ye=ee?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ee?.attempt_id||""}
          data-operation-id=${ee?.operation?.operation_id||""}
          data-discard-mode=${ee?.confirmation||"unmerged"}
          ?disabled=${ee?!ee.enabled:e.discard_enabled===!1}
          title=${ee?ee.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ee?.label||"\uD3D0\uAE30"}
        </button>`:"",ne=e.stale_work||null,ae=ne?i`${ne.can_resume||ne.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ne.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ne.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ne.action_id}
            ?disabled=${ne.locked}
          >
            다시 확인
          </button>`:""}`:"",ke=ne?i`<div class="worker-mini__stale">
        <strong>${ne.title}</strong>
        <span>${ne.summary}</span>
        <span>${ne.cause}</span>
        ${ne.can_backup_fresh?i`<small
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
        </button>`:"",Ue=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ee?.operation||e.revise_action||ne);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${b}${x}${k}</div>
          <div class="worker-mini__row2">
            ${M}${l?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${bt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${A}${O}
            <span class="worker-mini__actions"
              >${I}${R}${te}${ye}</span
            >
            ${Kr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${_}${b}${x}${q}${U}${A}${m}${$}
            </div>
            <div class="worker-mini__body">${k}${ke}</div>
            ${Ue?i`<div class="worker-mini__foot">
                  ${M}${O}
                  <span class="worker-mini__actions"
                    >${I}${R}${te}${ye}${Be}${ae}</span
                  >
                  ${dr(e)}
                </div>`:""}
            ${Kr(e)}`:i`<div class="worker-mini__line">
              ${d}${_}${b}${x}${k}${q}${U}${A}${m}${$}${M}${O}${I}${R}${te}${ye}
            </div>
            ${dr(e)} ${Kr(e)}`}
  </div>`}function Cf(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
    ${r?Zn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?i`<span
            class="worker-card__reason${c?" worker-card__reason--danger":""}"
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Cf(n):Fo(n))}
          </div>`}
  </section>`}var Vl=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],kn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Cs(e,t){let r=Vl.find(s=>s.step===e);if(!r)return null;let n=Vl.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Yl(e){let t=kn.findIndex(r=>r.step===e);return kn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Mr(e){let t=kn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Rf(e){let t=kn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:kn.length}}function Rs(e){let t=Rf(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Bo=new Set(["queued","running","retry_pending","repairing"]),Kl=new Set(["failed","succeeded"]),If={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},$n={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Lf={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:$n.base_containment,child_sweep:$n.child_sweep,branch_cleanup:$n.branch_cleanup,parent_close:$n.parent_close};function Of(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Pf(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Bo,...Kl].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Mf(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let c=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return c.localeCompare(l)}function qo(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=If[s];if(!o)return null;let a=Cs(r,`${n} ${o}`);return a?{...a,active:Bo.has(s),failed:s==="failed"}:null}function Df(e){return!e||typeof e!="object"?null:Lf[e.step]||null}function Is(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Df(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,a=!["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:"")&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"||s?.step==="repo_operations"),c=Of(e.merge_sha)?e.merge_sha:null,l=a&&c&&Array.isArray(e.repo_operations)?e.repo_operations.filter(x=>x&&typeof x=="object"&&Pf(x,t,c)).sort(Mf):[],d=l.find(x=>Bo.has(x.state));if(d)return qo(d);if(s)return s.step==="repo_operations"&&l[0]?qo(l[0],!0):null;let _=l.find(x=>Kl.has(x.state)?x.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return qo(_);if(n){let x=Cs(n.step,n.label);return x?{...x,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?$n[e.cleanup_cursor]:null;if(!m)return null;let b=Cs(m.step,m.label);return b?{...b,active:!0,failed:!1}:null}function Ls(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Zl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Xl={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Ql(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Uo(e){for(let t of Ql(e))if(Object.hasOwn(Zl,t))return Zl[t];return null}function jo(e){let t=null;for(let r of Ql(e))Object.hasOwn(Xl,r)&&(t=Xl[r]);return t}function Os(e){let t=Uo(e),r=jo(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Jl(e,t){let r=Uo(e)??Uo(t),n=jo(t)??jo(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var ec=160;function Nf(e){return e.length>ec?`${e.slice(0,ec)}\u2026`:e}function Ff(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Nf(e.command)}</code>`:""}
  </div>`}function qf(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Wo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function tc(e){let t=e.failure?Os(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${Ff(e.failure.cause_detail)}
          ${qf(e.failure.reason)}
          ${dr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Bf(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Wo(t-e.started_at):"\u2014",a=Jt(e),c=gr(e),l=wt(e.usage),d=zt(e.usage),_=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,b=e.attempt_id&&e.attempt_id===r,x=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${b?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
            ${x}
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
            ${x}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||l.length>0||d||_||m?i`<div class="rtile__meta">
          ${_?i`<span class="worker-mini__badge">${_}</span>`:""}
          ${m?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(k=>i`<span class="worker-usage" title=${k.tooltip}
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
  </div>`}function zo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Bf(s,t,r))}
  </div>`}function Dr(e){return i`<svg
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
  </svg>`}function Ho(){return Dr(fr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Go(){return Dr(fr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function rc(){return Dr(fr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function nc(){return Dr(fr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function sc(){return Dr(fr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function oc(){return Dr(fr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function ac(){return Dr(fr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var xn=1,Uf=6e4,jf={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Wf=new Set(["auto_merge","merged","merge","done"]),ic={running:3,paused:2,failed:1};function zf(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Hf(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),b=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let m=ic[d.run_state],b=ic[c];if(m>b||m===b&&(d.started_at??0)>(l??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Dt(e,a.bead_id),can_pause:c==="running"&&_,can_resume:c!=="running"&&_&&!n.has(a.attempt_id)})}return o}function lc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function Vo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let A of s)A&&typeof A.root_dir=="string"&&a.set(A.root_dir,A);let c=[],l=[],d=[],_=[],m=[],b=new Map;for(let A of n){if(!A||typeof A.root_dir!="string")continue;let $=A.root_dir,M=A.name||$,O=a.get($),I=O&&typeof O.revision=="number"?O.revision:typeof A.revision=="number"?A.revision:0,R=Rt(A.attempts),te=Rt(A.bead_titles),ee=Rt(A.pr_observations),ye=Rt(A.admission),ne=Rt(A.revise_parked),ae=Rt(A.merge_queue_state),ke=Rt(A.cleanup_failed),Be=Rt(A.discard_operations),Ue=Rt(A.pr_activity),Ve=Array.isArray(A.repo_operations)?A.repo_operations:[],He=Array.isArray(A.merge_queue)?A.merge_queue:[],Qe=new Set(He.filter(V=>V&&typeof V.bead_id=="string").map(V=>V.bead_id)),Ie=new Map(He.filter(V=>V&&typeof V.bead_id=="string").map(V=>[V.bead_id,V])),ve=Array.isArray(A.queue)?A.queue:[],Ae=Array.isArray(A.done)?A.done:[],we=new Map;for(let V of Ae)V&&typeof V.bead_id=="string"&&typeof V.added_at=="number"&&we.set(V.bead_id,V.added_at);let Pe=V=>({id:V,title:te[V]||V,root_dir:$,workspace_name:M,expected_revision:I,draggable:!1}),pe=new Set;for(let[V,j]of Hf(R,we))pe.add(V),l.push({...Pe(V),lane:"running",attempt_id:j.attempt_id,run_state:j.run_state,can_pause:j.can_pause,can_resume:j.can_resume,started_at:j.started_at,last_event_at:j.last_event_at,runner:j.runner,model:j.model,effort:j.effort,speed:j.speed,resumed_from:j.resumed_from,continuation_mode:j.continuation_mode,usage:j.usage,discard:er(Be,V,{attempt_id:j.attempt_id}),badges:j.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:j.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:j.run_state==="failed"});for(let V of Array.isArray(A.pr_wait)?A.pr_wait:[]){let j=V&&V.bead_id;if(typeof j!="string"||pe.has(j))continue;pe.add(j);let de=Rt(ee[j]),N=Rt(de.pr),P=de.gate?Rt(de.gate):null,be=Qe.has(j),Ee=Ie.get(j)?.continuation_action||null,L=!!Ee&&Ee.continuation===null,H=ae.active===j,C=V.external===!0,Z=ke[j]||null,re=Rt(Ue[j]),le=Is({bead_id:j,merge_sha:V.merge_sha,cleanup_cursor:V.cleanup_cursor,merge_progress:re.merge_progress||null,cleanup_failed:Z,repo_operations:Ve}),fe=Ls(le),xe=!!P&&P.base_badge==="\uCDA9\uB3CC",E=!!Z&&["child_sweep","branch_cleanup","parent_close"].includes(Z.step)&&!!P&&P.tier==="merged",B=C&&!!Z&&!!P&&P.tier==="merged",Q=!!P&&["closed_unmerged","review","undecidable"].includes(P.tier),K=er(Be,j,{external:C,merge_active:H||le?.step==="merge",merge_queued:be,cleanup_active:fe,merged:!!Z||P?.tier==="merged"}),w=!!K.operation;d.push({...Pe(j),lane:"pr_wait",pr_number:typeof N.number=="number"?N.number:null,pr_url:typeof N.url=="string"?N.url:void 0,external:C,usage:Dt(R,j),merge_step:le,badges:L?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:le?[P?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Z?[Mr(Z.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Mr(Z.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof P?.gate_badge=="string"&&P.gate_badge.length>0?[P.gate_badge]:[],alert:le?le.failed===!0:!!Z||Q,reason:Z&&le?.active!==!0?Rs(Z.step):"PR \uB300\uAE30",merge_action:P?.tier==="merged"&&!E&&!B?!1:!be||L,merge_enabled:!w&&(L||P?.enabled===!0||xe||E||B),merge_label:L?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":B||E?"\uC815\uB9AC \uC7AC\uAC1C":xe&&!E?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:L?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":w?K.error?`\uD3D0\uAE30 \uC2E4\uD328: ${K.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${K.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:B?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":E?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":P?.enabled===!0?`\uBA38\uC9C0 (${P.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${P?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:be&&!L,cancel_enabled:!H,continuation_mismatch:Ee?.mismatch||null,discard:K,discard_action:K.action,discard_enabled:K.enabled,discard_title:K.title})}for(let V=0;V<ve.length;V++){let j=ve[V],de=j&&j.bead_id;if(typeof de!="string"||pe.has(de))continue;pe.add(de);let N=ne[de],P=er(Be,de),be=P.operation?P:null,Ee={...Pe(de),lane:"queue",draggable:!be,discard:be||void 0,reason:lc(ye,de),queue_position:V+1,queue_index:V,queue_length:ve.length,badges:N?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!N,revise_action:!!N,revise_enabled:!!N&&!be,revise_title:N?N.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${N.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(Ee);let L=b.get($);L?L.push(Ee):b.set($,[Ee])}for(let V of Array.isArray(A.runnable)?A.runnable:[]){let j=V&&V.bead_id;typeof j!="string"||pe.has(j)||(pe.add(j),c.push({...Pe(j),title:V.title||te[j]||j,lane:"runnable",draggable:!0,reason:lc(ye,j),created_at:V.created_at??void 0,updated_at:V.updated_at??void 0,labels:Array.isArray(V.labels)?V.labels:[],spec_reviewer:typeof V.spec_reviewer=="string"?V.spec_reviewer:void 0,plan_state:V.plan_state==="approved"||V.plan_state==="authored"?V.plan_state:"none",workflow:V.route?{route:V.route,chips:{route:V.route}}:null,place_index:ve.length}))}for(let V of Ae){let j=V&&V.bead_id;if(typeof j!="string"||pe.has(j)||(pe.add(j),o!==void 0&&typeof V.added_at=="number"&&V.added_at<o))continue;let de=zf(R,j);m.push({...Pe(j),lane:"done",done:!0,usage:Dt(R,j),done_at:typeof V.added_at=="number"?V.added_at:void 0,done_kind:de&&typeof de.done_kind=="string"?de.done_kind:null})}}let x=new Map;s.forEach((A,$)=>{A&&typeof A.root_dir=="string"&&x.set(A.root_dir,$)});let k=r&&r.running_sort==="repo"?"repo":"started";l.sort((A,$)=>{if(k==="repo"){let I=x.get(A.root_dir)??Number.MAX_SAFE_INTEGER,R=x.get($.root_dir)??Number.MAX_SAFE_INTEGER;if(I!==R)return I-R}let M=typeof A.started_at=="number"&&Number.isFinite(A.started_at)?A.started_at:null,O=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null;return M!==null&&O!==null&&M!==O?M-O:M===null&&O!==null?1:M!==null&&O===null?-1:A.id.localeCompare($.id)}),m.sort((A,$)=>($.done_at??0)-(A.done_at??0));let q=s.length>0?s:n.map(A=>({root_dir:A&&A.root_dir,name:A&&A.name,auto_advance:A&&A.auto_advance,auto_merge:A&&A.auto_merge,slots:A&&A.slots,revision:A&&A.revision,runner_catalog:A&&A.runner_catalog})),U=[];for(let A of q)!A||typeof A.root_dir!="string"||U.push({root_dir:A.root_dir,name:A.name||A.root_dir,auto_advance:A.auto_advance===!0,auto_merge:A.auto_merge===!0,slots:typeof A.slots=="number"&&A.slots>=xn?A.slots:xn,revision:typeof A.revision=="number"?A.revision:0,runner_catalog:Rt(A.runner_catalog),items:b.get(A.root_dir)||[]});return{runnable:c,queue:_,queue_groups:U,running:l,pr_wait:d,done:m,automation:{total:U.length,both_on:U.filter(A=>A.auto_advance&&A.auto_merge).length}}}function Gf(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Uf;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${bt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Ot(e,t)}</span
        >`}</span
  >`}function Sn(e){return i`<div class="mon-c__title">${e.title}</div>`}function An(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Ps(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Yo(e){let t=wt(e.usage),r=zt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Hr(e.usage)}
        >${r}</span
      >`:""}function Ko(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Vf(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Go()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Ho()}
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
          ${nc()}
        </button>`:""}
  </span>`}function Yf(e,t){let r=typeof e.started_at=="number"?Wo(t-e.started_at):"";return i`${Sn(e)}
    <div class="mon-c__meta">
      ${Ko(e)}${Gf(e.last_event_at,t)}${An(e)}${Ps(e)}
      ${Jt(e)?i`<span class="mon-c__model">${Jt(e)}</span>`:""}
      ${gr(e)?i`<span
            class="rtile__resumed"
            title=${gr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Yo(e)}${Vf(e)}${dr(e)}
    </div>`}function Kf(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),c=Ot(e.updated_at);return i`${Sn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${An(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Kn(e.labels,null).map(l=>i`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Ps(e)}
      ${c?i`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
            >수정 ${c}</span
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
    </div>`}function Zf(e){let t=!!e.discard?.operation;return i`${Sn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${An(e)}
      ${Ko(e)}
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
        </div>`:""}`}function Xf(e){let t=e.merge_step||null,r=!!(zt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${Sn(e)}
    <div class="mon-c__meta">
      ${An(e)}${Ps(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ko(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${Yo(e)}${t?i`<span
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
          ${dr(e)}
        </div>`:""}`}function Qf(e,t){let r=e.done_kind||"",n=r?jf[r]||r:"",s=Ot(e.done_at,t);return i`${Sn(e)}
    <div class="mon-c__meta">
      ${An(e)}${Ps(e)}
      ${n?i`<span
            class="mon-live__kind${Wf.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Yo(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${bt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function cc(e,t){return e.lane==="running"?Yf(e,t):e.lane==="runnable"?Kf(e):e.lane==="queue"?Zf(e):e.lane==="pr_wait"?Xf(e):Qf(e,t)}function dc(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?Go():Ho()}
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
        ${sc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${oc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${xn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function uc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Qt.find(c=>c.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?rc():ac()}
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
        ${Qt.map(c=>i`<option
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
  </div>`}function pc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function fc(e){let t=(Array.isArray(e)?e:[]).map(c=>c&&c.usage).filter(c=>c&&typeof c=="object"&&"providers"in c);if(t.length>0)return wt(es(t));let r={};for(let c of sr)r[c]=0;let n=!1,s=0,o=0,a=0;for(let c of Array.isArray(e)?e:[]){let l=c&&c.usage;if(l&&typeof l=="object"){let d=!1;for(let _ of sr){let m=l[_];typeof m=="number"&&Number.isFinite(m)&&(r[_]+=m,n=!0,d=!0)}if(d){o+=1;let _=l.total_cost_usd;typeof _=="number"&&Number.isFinite(_)&&(s+=_,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?zt(r):null}var mc="bdui.monitor.done-range",gc="bdui.monitor.running_sort";function Jf(){try{let e=window.localStorage.getItem(mc);return Mt(e)?e:Lt}catch{return Lt}}function e_(e){try{window.localStorage.setItem(mc,e)}catch{}}function t_(){try{return window.localStorage.getItem(gc)==="repo"?"repo":"started"}catch{return"started"}}function r_(e){try{window.localStorage.setItem(gc,e)}catch{}}var bc="tab:monitor:pipeline",n_=1e3,s_=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function _c(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${cc(e,t)}
  </div>`}function hc(e,t){let r=it("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,l=t.now||(()=>Date.now()),d=t.confirm||(L=>typeof globalThis.confirm!="function"||globalThis.confirm(L)),_=Jf(),m=t_();function b(){let L=Qt.find(H=>H.value===_);return L?L.label:""}let x=document.createElement("div");x.className="mon",e.appendChild(x);let k=Vo(null,null),q=new Map,U=null,A=null;async function $(L,H,C,Z,re=!0){if(!o||!C)return null;let le=await o(L,{...H,root_dir:C,expected_revision:Z});if(le&&le.conflict&&re){le.queue&&q.set(C,le.queue);let fe=le.queue&&typeof le.queue.revision=="number"?le.queue.revision:Z;le=await o(L,{...H,root_dir:C,expected_revision:fe})}return le&&le.queue&&C&&q.set(C,le.queue),le}function M(L,H){let C=q.get(L),Z=s&&s.get?s.get():null,re=(Array.isArray(Z)?Z:[]).find(fe=>fe?.root_dir===L);return(C||re)?.merge_queue?.find(fe=>fe.bead_id===H)?.continuation_action}async function O(L,H,C,Z){let re=await $(L,H,C,Z),le=q.get(C)?.revision??re?.queue?.revision??Z;return nr(re,(fe,xe)=>$(L,{...H,continuation:fe,decision_token:xe},C,le,!1),{refresh:fe=>$(L,H,C,fe?.queue?.revision??q.get(C)?.revision??le,!1)})}async function I(L,H,C,Z){let re=await nr({continuation_mismatch:Z},(fe,xe)=>$("worker-merge-queue-add",{bead_id:H,continuation:fe,decision_token:xe},L,C,!1)),le=re?.queue?.merge_queue?.find(fe=>fe.bead_id===H)?.continuation_action;re?.applied!==!0&&le?.continuation===null&&le.mismatch&&await I(L,H,re.queue.revision,le.mismatch)}async function R(L,H,C){let Z=await $("worker-discard",L,H,C);if(Z&&Z.discarded===!0){ie(Ts(Z),"success",5e3);return}if(Z&&Z.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${Z.reason}`,"error");return}if(Z&&Z.accepted&&Z.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Z&&Z.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${Z.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Z&&!Z.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function te(L,H,C){return!o||!C?null:await o(L,{...H,root_dir:C})}async function ee(L){if(!o||!L&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let H=await o("monitor-auto-toggle",{on:L}),C=H&&Array.isArray(H.failed)?H.failed:[];C.length>0&&ie(`\uC790\uB3D9\uD654 ${L?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${C.map(Z=>Z.root_dir).join(", ")}`,"error",3200)}async function ye(){let L=new Map;for(let H of k.pr_wait)L.has(H.root_dir)||L.set(H.root_dir,H.expected_revision);for(let[H,C]of L)await $("worker-merge-queue-add-all",{},H,C)}let ne=null,ae=!1,ke=null;function Be(){ke!==null&&clearTimeout(ke),ke=setTimeout(()=>{ke=null,ae=!1},0)}function Ue(L){let H=L.target;return typeof H?.closest=="function"?H.closest(".mon-group"):null}function Ve(L){let H=Ue(L);return!H||!ne?null:(H.getAttribute("data-root-dir")||"")===ne.root_dir?H:null}function He(){for(let L of Array.from(x.querySelectorAll(".mon-group--drag-over")))L.classList.remove("mon-group--drag-over")}function Qe(L){let H=L.target,C=typeof H?.closest=="function"?H.closest('.mon-card[draggable="true"]'):null;if(C){ne={bead_id:C.getAttribute("data-issue-id")||"",lane:C.getAttribute("data-lane")||"",root_dir:C.getAttribute("data-root-dir")||"",revision:Number(C.getAttribute("data-revision")||0)||0,queue_index:Number(C.getAttribute("data-queue-index")),queue_length:Number(C.getAttribute("data-queue-length")),place_index:Number(C.getAttribute("data-place-index"))},ae=!0;try{L.dataTransfer?.setData("text/plain",ne.bead_id),L.dataTransfer&&(L.dataTransfer.effectAllowed="move")}catch{}}}function Ie(L){let H=Ve(L);H&&(L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move"),H.classList.add("mon-group--drag-over"))}function ve(L){Ue(L)?.classList.remove("mon-group--drag-over")}function Ae(){ne=null,He(),Be()}function we(L){let H=Ve(L),C=ne;if(ne=null,He(),!H||!C||!C.bead_id)return;L.preventDefault();let Z=L.target,re=typeof Z?.closest=="function"?Z.closest('.mon-card[data-lane="queue"]'):null,le=re&&H.contains(re)?Number(re.getAttribute("data-queue-index")):NaN;if(C.lane==="runnable"){let E=Number.isFinite(le)?le:C.place_index;if(!Number.isFinite(E))return;$("worker-queue-place",{bead_id:C.bead_id,index:E},C.root_dir,C.revision);return}if(C.lane!=="queue"||re&&re.getAttribute("data-issue-id")===C.bead_id)return;let fe=C.queue_index,xe=Number.isFinite(le)?fe>le?le:le-1:C.queue_length-1;!Number.isFinite(xe)||xe<0||xe===fe||$("worker-queue-reorder",{bead_id:C.bead_id,to_index:xe},C.root_dir,C.revision)}function Pe(L){let H={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return i`${uc({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},running_sort:m,done_range:_,token_total:fc(k.done),token_tooltip:pc(b())})}
      <div class="worker-lanes mon-lanes">
        ${s_.map(C=>{let Z=H[C.lane],re=C.lane==="queue"?k.queue_groups.length>0?i`${k.queue_groups.map(le=>i`<div
                        class="mon-group"
                        data-root-dir=${le.root_dir}
                      >
                        ${dc(le)}
                        <div class="mon-group__list">
                          ${le.items.map(fe=>_c(fe,L))}
                        </div>
                      </div>`)}`:void 0:Z.length>0?i`${Z.map(le=>_c(le,L))}`:void 0;return Yt({id:`monitor-${C.lane}`,lane:C.pane,title:C.lane==="done"?`\uC644\uB8CC\xB7${b()}`:C.title,items:Z,empty:C.empty,body:re,live:C.lane==="running"&&Z.length>0,header_control:C.lane==="pr_wait"&&Z.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function pe(){let L=s&&s.get?s.get():null,H=s&&s.getWorkspacesState?s.getWorkspacesState():[],C=l();k=Vo(L,H,{done_since:Er(_,C),running_sort:m}),ze(Pe(C),x)}function V(L,H){let C=a?a():void 0;if(!H||!C||H===C||!c){n(L);return}c(H).then(()=>{n(L)}).catch(Z=>{r("workspace switch for %s failed: %o",H,Z)})}function j(L){return{root_dir:L.getAttribute("data-root-dir")||"",revision:Number(L.getAttribute("data-revision")||0)||0}}function de(L,H){let{root_dir:C,revision:Z}=j(L),re=L.getAttribute("data-issue-id")||"",le=H.dataset.attemptId||L.getAttribute("data-attempt-id")||"",fe=H.classList;if(fe.contains("worker-card__place")){$("worker-queue-place",{bead_id:re,index:Number(L.getAttribute("data-place-index")||0)||0},C,Z);return}if(fe.contains("mon-op--up")||fe.contains("mon-op--down")){let xe=Number(L.getAttribute("data-queue-index")||0)||0,E=fe.contains("mon-op--up")?xe-1:xe+1;if(E<0)return;$("worker-queue-reorder",{bead_id:re,to_index:E},C,Z);return}if(fe.contains("mon-op--remove")){$("worker-queue-remove",{bead_id:re},C,Z);return}if(fe.contains("mon-op--pause")){te("worker-attempt-pause",{attempt_id:le},C);return}if(fe.contains("mon-op--discard")){if(!d(wn(re,"unmerged")))return;R({bead_id:re,...le?{attempt_id:le}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},C,Z);return}if(fe.contains("mon-op--resume")){O("worker-attempt-resume",{attempt_id:le},C,Z);return}if(fe.contains("mon-op--dismiss")){$("worker-attempt-dismiss",{attempt_id:le},C,Z);return}if(fe.contains("worker-mini__merge")){let xe=M(C,re);xe?.mismatch&&xe.continuation===null?I(C,re,Z,xe.mismatch):$("worker-merge-queue-add",{bead_id:re},C,Z);return}if(fe.contains("worker-mini__merge-cancel")){$("worker-merge-queue-remove",{bead_id:re},C,Z);return}if(fe.contains("worker-mini__discard")){let xe=H.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(wn(re,xe)))return;R({bead_id:re,...le?{attempt_id:le}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},C,Z);return}if(fe.contains("worker-mini__revise-fix")){O("worker-revise-fix",{bead_id:re},C,Z);return}fe.contains("worker-mini__revise-approve")&&$("worker-revise-approve",{bead_id:re},C,Z)}function N(L){let H=ae;ae=!1;let C=L.target;if(!C||typeof C.closest!="function"||C.closest("dialog")||C.closest("a"))return;let Z=C.closest(".mon-running-sort");if(Z){L.preventDefault(),m=Z.getAttribute("data-sort")==="repo"?"repo":"started",r_(m),pe();return}let re=C.closest(".mon-auto-all");if(re){L.preventDefault(),ee(re.getAttribute("data-on")==="true");return}if(C.closest(".mon-merge-all")){L.preventDefault(),ye();return}let fe=C.closest(".mon-ctl--advance");if(fe){L.preventDefault();let{root_dir:K,revision:w}=j(fe);$("worker-automation-toggle",{on:fe.getAttribute("data-on")==="true"},K,w);return}let xe=C.closest(".mon-ctl--merge-auto");if(xe){L.preventDefault();let{root_dir:K,revision:w}=j(xe);$("worker-merge-auto-toggle",{on:xe.getAttribute("data-on")==="true"},K,w);return}let E=C.closest(".mon-card");if(!E)return;let B=C.closest("button");if(B){L.preventDefault(),de(E,B);return}let Q=E.getAttribute("data-issue-id");Q&&!H&&(L.preventDefault(),V(Q,E.getAttribute("data-root-dir")||""))}function P(L){let H=L.target;if(!H||typeof H.closest!="function")return;let C=H.closest(".mon-done-range");if(C){_=Mt(C.value)?C.value:Lt,e_(_),pe();return}let Z=H.closest(".mon-slots__input");if(!Z)return;let{root_dir:re,revision:le}=j(Z),fe=Number(Z.value);if(!Number.isFinite(fe))return;let xe=Math.max(xn,Math.floor(fe));$("worker-queue-set-slots",{slots:xe},re,le)}e.addEventListener("click",N),e.addEventListener("change",P),e.addEventListener("dragstart",Qe),e.addEventListener("dragover",Ie),e.addEventListener("dragleave",ve),e.addEventListener("drop",we),e.addEventListener("dragend",Ae),s&&typeof s.subscribe=="function"&&(U=s.subscribe(()=>{try{q.clear(),pe()}catch{}}));function be(){A!==null&&(clearInterval(A),A=null)}function Ee(){ke!==null&&(clearTimeout(ke),ke=null)}return{load(){r("load"),pe(),A===null&&(A=setInterval(()=>{try{pe()}catch{}},n_))},pause(){be()},clear(){be(),Ee(),U&&(U(),U=null),e.removeEventListener("click",N),e.removeEventListener("change",P),e.removeEventListener("dragstart",Qe),e.removeEventListener("dragover",Ie),e.removeEventListener("dragleave",ve),e.removeEventListener("drop",we),e.removeEventListener("dragend",Ae),e.replaceChildren()}}}function yc(e,t,r){let n=it("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return i`
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
    `}function c(){ze(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),ze(i``,e)}}}var vc=["bug","feature","task","epic","chore"];function wc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var kc=["Critical","High","Medium","Low","Backlog"];function $c(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",o.appendChild(I);for(let R of vc){let te=document.createElement("option");te.value=R,te.textContent=wc(R),o.appendChild(te)}a.replaceChildren();for(let R=0;R<=4;R+=1){let te=document.createElement("option");te.value=String(R);let ee=kc[R]||"Medium";te.textContent=`${R} \u2013 ${ee}`,a.appendChild(te)}}x();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function q(I){s.disabled=I,o.disabled=I,a.disabled=I,c.disabled=I,l.disabled=I,_.disabled=I,m.disabled=I,m.textContent=I?"Creating\u2026":"Create"}function U(){d.textContent=""}function A(I){d.textContent=I}function $(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?o.value=I:o.value="";let R=window.localStorage.getItem("beads-ui.new.priority");R&&/^\d$/.test(R)?a.value=R:a.value="2"}catch{o.value="",a.value="2"}}function M(){let I=o.value||"",R=a.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),R.length>0&&window.localStorage.setItem("beads-ui.new.priority",R)}async function O(){U();let I=String(s.value||"").trim();if(I.length===0){A("Title is required"),s.focus();return}let R=Number(a.value||"2");if(!(R>=0&&R<=4)){A("Priority must be 0..4"),a.focus();return}let te=String(o.value||""),ee=String(l.value||""),ye={title:I};te.length>0&&(ye.type=te),String(R).length>0&&(ye.priority=R),ee.length>0&&(ye.description=ee),q(!0);try{await t("create-issue",ye)}catch{q(!1),A("Failed to create issue");return}M(),q(!1),k()}return r.addEventListener("cancel",I=>{I.preventDefault(),k()}),b.addEventListener("click",()=>k()),_.addEventListener("click",()=>k()),r.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),O())}),n.addEventListener("submit",I=>{I.preventDefault(),O()}),{open(){n.reset(),U(),$();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var o_=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function a_(e,t){return oo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function xc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=a_(n,e);return i`<button
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
  `}function Sc(e,t,r){return i`
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
  `}function Ac(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${o_.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var i_=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Kt="";function Zt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ec(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(w=>ie(w,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let c="session",l=!1,d="",_={},m={},b=[],x=!1,k=null,q={},U="",A="",$=!1,M=!1,O=!1,I=null;function R(){let w=t.queueStore?.get();return Zt(w)?w.runner_catalog:null}function te(){let w=t.implPresetStore?.get();return Zt(w)&&Array.isArray(w.presets)?w:null}async function ee(){x=!0,re();try{let w=await r("get-session-defaults",{});_=Zt(w?.values)?{...w.values}:{},m={..._},b=Array.isArray(w?.warnings)?w.warnings:[]}catch(w){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${w instanceof Error?w.message:String(w)}`)}finally{x=!1,re()}}async function ye(){let w=$l(_,m);if(Object.keys(w).length!==0){try{let F=await r("set-session-defaults",{values:w});_=Zt(F?.values)?{...F.values}:{},m={..._},b=Array.isArray(F?.warnings)?F.warnings:[]}catch(F){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${F instanceof Error?F.message:String(F)}`)}re()}}function ne(w,F){F===Kt?delete m[w]:m[w]=F,re(),ye()}async function ae(){let w=t.queueStore?.get();if(!Zt(w))return;let F={orchestration_model:w.orchestration_model??null,orchestration_effort:w.orchestration_effort??null,orchestration_speed:w.orchestration_speed??null},X=xl(F,{...F,...q});if(Object.keys(X).length!==0){try{let Me=await r("worker-queue-set-orchestration-defaults",{expected_revision:w.revision,values:X});if(Me&&Me.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}q={}}catch(Me){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Me instanceof Error?Me.message:String(Me)}`)}re()}}function ke(w,F){q[w]=F===Kt?null:F,re(),ae()}async function Be(w){let F=t.queueStore?.get();if(!(!Zt(F)||w<1)){try{await r("worker-queue-set-slots",{expected_revision:F.revision,slots:w})}catch(X){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${X instanceof Error?X.message:String(X)}`)}re()}}function Ue(){let w={};for(let F of vl){let X=m[F];typeof X=="string"&&X.length>0&&(w[F]=X)}return w}async function Ve(){let w=te();if(!w)return;let F=Ue();if(Object.keys(F).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let X=(w.presets||[]).find(Le=>Le.id===U),Me=A.trim()||(X?X.name:"");if(!Me){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Le=X?await r("impl-preset-update",{expected_revision:w.revision,id:X.id,name:Me,settings:F}):await r("impl-preset-create",{expected_revision:w.revision,name:Me,settings:F});if(Le&&Le.applied){if(A="",!X&&Array.isArray(Le.presets)){let Fe=Le.presets.find(Te=>Te.name===Me);U=Fe?Fe.id:U}re()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),re()}catch(Le){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Le instanceof Error?Le.message:String(Le)}`)}}async function He(){let w=te();if(!(!w||U.length===0))try{let F=await r("impl-preset-delete",{expected_revision:w.revision,id:U});F&&F.applied?(U="",re()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),re())}catch(F){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${F instanceof Error?F.message:String(F)}`)}}async function Qe(){let w=te();if(!(!w||U.length===0)){try{let F=await r("apply-impl-preset-global",{preset_id:U,expected_revision:w.revision});F&&F.applied?(_=Zt(F.values)?{...F.values}:{},m={..._},b=Array.isArray(F.warnings)?F.warnings:[]):F&&F.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(F){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${F instanceof Error?F.message:String(F)}`)}re()}}async function Ie(){M=!0,O=!1,re();try{let w=await r("get-worker-system-prompt",{});!w||typeof w!="object"||Array.isArray(w)?O=!0:I=w}catch{O=!0}finally{M=!1,re()}}function ve(){if($=!$,$&&!I){Ie();return}re()}function Ae(){let w=Vr({loading:M,error:O});if(w)return w;if(!I)return"";let F=Array.isArray(I.variants)?I.variants:[];return i`<div class="settings-dialog__sp-body">
      ${I.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${I.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${F.map(X=>i`<div class="settings-dialog__sp-variant" data-variant=${X.key}>
            <div class="settings-dialog__sp-cond">${X.condition}</div>
            ${lr(X.label,X.system_prompt)}
          </div>`)}
    </div>`}function we(){return i`<section
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
    </section>`}function Pe(w,F,X,Me,Le,Fe){let Te=Le[w]??Kt;return i`<select
      class=${Te===Kt?"settings-dialog__unset":""}
      data-key=${w}
      aria-label=${F}
      ?disabled=${Fe===!0}
      .value=${Pr(String(Te))}
      @change=${Xe=>Me(w,String(Xe.target.value))}
    >
      <option value=${Kt} ?selected=${Te===Kt}>(기본)</option>
      ${X.map(Xe=>i`<option value=${Xe} ?selected=${Xe===Te}>
            ${Xe===Ft?"\uC790\uB3D9":Xe}
          </option>`)}
    </select>`}function pe(w,F,X,Me,Le,Fe=!1){return i`<div
      class=${`settings-dialog__row${Fe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${F}</span>
      <span class="settings-dialog__controls">
        ${Pe(w,F,X,Me,Le,Fe)}
      </span>
    </div>`}function V(w,F,X,Me,Le){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${F}-on)`}
        ></i>
        ${w}
      </span>
      <span class="settings-dialog__controls">
        ${Pe(X,`${w} \uBAA8\uB378`,Me,ne,m,!1)}
        ${Pe(Le,`${w} effort`,ws,ne,m,!1)}
      </span>
    </div>`}function j(){let w=R(),F=kl(m),X=m.impl_runtime,Me=m.impl_model,Le=te();return i`
      <section
        class=${`settings-dialog__pane${c==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${b.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${x?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
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
                        @click=${()=>ne("workflow_mode",Kt)}
                      >
                        (기본)
                      </button>
                      ${ys.map(Fe=>i`<button
                            type="button"
                            data-mode=${Fe}
                            aria-pressed=${String(m.workflow_mode===Fe)}
                            @click=${()=>ne("workflow_mode",Fe)}
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
                ${V("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",yn,"spec_review_effort")}
                ${V("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",vs,"plan_review_effort")}
                ${V("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",yn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${pe("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",bs,ne,m)}
                ${pe("impl_runtime","\uC704\uC784 \uB300\uC0C1",hs,ne,m,F)}
                ${pe("impl_model","\uBAA8\uB378",ks(w,X),ne,m,F)}
                ${pe("impl_effort","effort",Yr(w,X,Me),ne,m,F)}
                ${pe("impl_speed","\uC18D\uB3C4",hn,ne,m,F)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Pr(U)}
                  @change=${Fe=>{U=String(Fe.target.value),re()}}
                >
                  <option value="" ?selected=${U===""}>
                    구현 프리셋…
                  </option>
                  ${(Le?.presets||[]).map(Fe=>i`<option
                        value=${Fe.id}
                        ?selected=${Fe.id===U}
                      >
                        ${Fe.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${U.length===0}
                  @click=${Qe}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${U?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Pr(A)}
                  @input=${Fe=>{A=String(Fe.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Ve}
                >
                  ${U?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${U.length===0}
                  @click=${He}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function de(){let w=t.queueStore?.get(),F=R(),X={orchestration_model:q.orchestration_model??(Zt(w)?w.orchestration_model:null),orchestration_effort:q.orchestration_effort??(Zt(w)?w.orchestration_effort:null),orchestration_speed:q.orchestration_speed??(Zt(w)?w.orchestration_speed:null)},Me=$s(F,k),Le=Yr(F,k||void 0,X.orchestration_model||Ft).filter(Te=>Te!==Ft),Fe=Zt(w)&&typeof w.slots=="number"?w.slots:2;return i`
      <section
        class=${`settings-dialog__pane${c==="worker"?" settings-dialog__pane--active":""}`}
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
                @change=${Te=>{let Xe=String(Te.target.value);k=Xe===Kt?null:Xe,re()}}
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
          ${pe("orchestration_model","\uBAA8\uB378",Me,ke,X)}
          ${pe("orchestration_effort","effort",Le,ke,X)}
          ${pe("orchestration_speed","\uC18D\uB3C4",hn,ke,X)}
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
                  @click=${()=>Be(Fe-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${Fe}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Be(Fe+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${we()}
      </section>
    `}function N(){let w=n.get();return i`
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
              ${xc(w,s(),L)}
              ${Sc(w,d,{onDraft:F=>{d=F},onAdd:H,onRemove:C})}
              ${Ac(w,Z)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function P(w){let F=n.get();if(F)try{let X=await r("display-policy-set",{expected_revision:F.revision,policy:w(F)});be(X),X&&X.conflict&&X.policy&&(X=await r("display-policy-set",{expected_revision:X.policy.revision,policy:w(X.policy)}),be(X)),X&&X.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function be(w){w&&w.policy&&typeof w.policy=="object"&&n.set(w.policy)}function Ee(w){P(w)}function L(w){let F=n.get();if(!F)return;let X=!l_(w,F);Ee(Me=>c_(w,Me,X))}function H(){let w=d.trim();w.length!==0&&(d="",Ee(F=>F.hidden_prefixes.includes(w)?{hidden_prefixes:F.hidden_prefixes}:{hidden_prefixes:[...F.hidden_prefixes,w]}),re())}function C(w){Ee(F=>({hidden_prefixes:F.hidden_prefixes.filter(X=>X!==w)}))}function Z(w){let F=n.get();if(!F)return;let X=F.chips[w]===!1;Ee(()=>({chips:{[w]:X}}))}function re(){ze(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${i_.map(w=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${w.id}
                  aria-selected=${String(c===w.id)}
                  aria-controls=${`settings-pane-${w.id}`}
                  @click=${()=>le(w.id)}
                >
                  <span class="settings-dialog__glyph">${w.glyph}</span>
                  ${w.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${K}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${j()} ${de()} ${N()}
          </div>
        </div>
      `,a)}function le(w){c=w,re()}let fe=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",fe),a.addEventListener("cancel",fe);let xe=w=>{w.target===a&&K()};a.addEventListener("click",xe);let E=null;n.subscribe&&(E=n.subscribe(()=>{l&&re()}));let B=null;t.implPresetStore?.subscribe&&(B=t.implPresetStore.subscribe(()=>{l&&re()}));function Q(w="session"){l||(l=!0,t.onOpenChange?.(!0),c=w,d="",q={},re(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),ee())}function K(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Q,close:K,sessionDraft:()=>({...m}),destroy(){l=!1,a.removeEventListener("close",fe),a.removeEventListener("cancel",fe),a.removeEventListener("click",xe),E&&(E(),E=null),B&&(B(),B=null),a.remove()}}}function l_(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function c_(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var d_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Tc(e){return String(e).padStart(2,"0")}function u_(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function p_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Tc(n.getHours())}:${Tc(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${d_[n.getMonth()]} ${n.getDate()} ${o}`;return`${u_(r,t)} \xB7 ${c}`}function f_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Cc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Rc(e){let t=!1,r=null,n=new Map;function s(){ze(i``,e),e.hidden=!0}function o(){let l=Cc.filter(_=>n.has(_.key));if(l.length===0){s();return}let d=Date.now();ze(i`<div class="usage-meter" aria-label="Usage">
        ${l.map(_=>{let m=n.get(_.key),b=typeof m.ageSeconds=="number"&&m.ageSeconds>600,x=b?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${_.label} usage`}
          >
            <span class="usage-meter__provider">${_.label}</span>
            ${m.windows.map(k=>{let q=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,U=Math.min(100,Math.max(0,q)),$=`resets ${p_(k.resetsAt,d)}${b?` \xB7 ${x}`:""}`;return i`<span
                class="usage-meter__window ${f_(U)}"
                style=${`--progress: ${U}%`}
                title=${$}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${U}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let _=await d.json();return!_||_.available!==!0||!Array.isArray(_.windows)?null:_}catch{return null}}async function c(){let l=await Promise.all(Cc.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),c(),r=setInterval(()=>{c()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var __="worker-ineligible";function Zo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ic(e){return Zo(e).includes(__)}var m_="worker-serial";function Xo(e){return Zo(e).includes(m_)}function Qo(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var g_=new Set(["done","failed","orphaned","stopped","discarded"]);function Lc(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,c=new Map,l=!1,d=null,_=null;function m(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function b(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function x(){let E=m(),B=new Set;for(let Q of Object.values(E.attempts||{})){let K=Q;K&&typeof K.bead_id=="string"&&!g_.has(K.status)&&B.add(K.bead_id)}for(let Q of Array.isArray(E.pr_wait)?E.pr_wait:[])Q&&typeof Q.bead_id=="string"&&B.add(Q.bead_id);for(let Q of Object.values(E.discard_operations||{})){let K=Q;K&&K.phase!=="done"&&typeof K.bead_id=="string"&&B.add(K.bead_id)}return B}function k(E){return E.filter(B=>q(B)===null)}function q(E){let B=m();for(let Q of Array.isArray(B.serial_lanes)?B.serial_lanes:[])if(Array.isArray(Q?.entries)&&Q.entries.some(K=>K.bead_id===E))return Q.id;return(Array.isArray(B.queue)?B.queue:[]).some(Q=>Q.bead_id===E)?"parallel":null}function U(E,B){let Q=a.get(E);return Q||[...B.order]}function A(E){if(E.length<2)return!1;let B=q(E[0]);if(!B||B==="parallel")return!1;let Q=m(),K=(Array.isArray(Q.serial_lanes)?Q.serial_lanes:[]).find(F=>F.id===B)?.entries.map(F=>F.bead_id);if(!Array.isArray(K))return!1;let w=E.map(F=>K.indexOf(F));return w.every(F=>F>=0)&&w.every((F,X)=>X===0||F>w[X-1])}function $(){let E=m(),B=Array.isArray(E.serial_lanes)?E.serial_lanes:[],Q=B.find(K=>Array.isArray(K.entries)&&K.entries.length===0);return Q?Q.id:B[0]?.id||"s1"}function M(E){let B=m().bead_titles||{};return typeof B[E]=="string"?B[E]:E}async function O(E,B){if(!s||l)return null;l=!0,L();try{return await s(E,B)}finally{l=!1,L()}}async function I(E){n?.setPending?.(!0);try{let B=await O("worker-parallel-analysis-start",{force:E});B&&B.applied===!1&&B.reason&&ie(`\uBD84\uC11D \uC2E4\uD328: ${B.reason}`,"error",2800)}finally{n?.setPending?.(!1)}}async function R(){let E=b().job;!s||!E||await s("worker-parallel-analysis-cancel",{job_id:E.job_id})}function te(){return m().runner_catalog}function ee(E){return Object.keys(te()?.runners?.[E]?.models||{})}function ye(E){let B=ee(E),Q=te()?.runners?.[E]?.default_model;return typeof Q=="string"&&B.includes(Q)?Q:B[0]||""}function ne(){let E=b().settings,B=d||E.runner||"claude",Q=ee(B),K=d?ye(B):E.model||Q[0]||"",w=Qo(te(),B,K),F=E.effort||"",X=w.includes(F)?F:w[0]||"";return{runner:B,model:K,effort:X,models:Q,efforts:w}}async function ae(E){let B=b().settings,Q=await O("worker-parallel-analysis-settings-update",{expected_revision:B.revision,runner:E.runner,model:E.model,effort:E.effort});(!Q||Q.applied!==!0)&&(d=null,L(),Q&&Q.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${Q.reason}`,"error",2800))}function ke(E){d=E,L();let B=ne();ae({runner:E,model:B.model,effort:B.effort})}function Be(E){let B=ne(),Q=Qo(te(),B.runner,E);ae({runner:B.runner,model:E,effort:Q.includes(B.effort)?B.effort:Q[0]||""})}function Ue(E){let B=ne();ae({runner:B.runner,model:B.model,effort:E})}async function Ve(E,B){if(!s||l)return;let Q=U(E,B),K=b();if(Q.length<2||!K.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let w=c.get(E)||$(),F=()=>({snapshot_digest:K.last_good.identity_digest,group_index:E,lane:w,ordered_bead_ids:Q,expected_revision:m().revision});l=!0,L();try{let X=await s("worker-parallel-analysis-submit",F());X&&X.queue&&r&&r.set(X.queue),X&&X.applied!==!0&&X.conflict===!0&&(X=await s("worker-parallel-analysis-submit",F()),X&&X.queue&&r&&r.set(X.queue)),X&&X.applied===!0?(a.delete(E),ie(`\uC9C1\uB82C \uB808\uC778 ${w}\uC5D0 ${Q.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${X?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{l=!1,L()}}function He(E,B,Q){a.set(E,U(E,B).filter(K=>K!==Q)),L()}function Qe(E){a.delete(E),L()}function Ie(E,B,Q,K){let w=[...U(E,B)],F=w.indexOf(Q),X=F+K;F<0||X<0||X>=w.length||(w.splice(X,0,...w.splice(F,1)),a.set(E,w),L())}function ve(){let E=b().settings,B=Object.keys(te()?.runners||{}),Q=ne();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${K=>ke(K.target.value)}
        >
          ${B.map(K=>i`<option
                value=${K}
                ?selected=${Q.runner===K}
              >
                ${K}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${K=>Be(K.target.value)}
        >
          ${Q.models.map(K=>i`<option
                value=${K}
                ?selected=${Q.model===K}
              >
                ${K}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${K=>Ue(K.target.value)}
        >
          ${Q.efforts.map(K=>i`<option
                value=${K}
                ?selected=${Q.effort===K}
              >
                ${K}
              </option>`)}
        </select>
      </label>
      ${Ae(E)}
    </div>`}function Ae(E){return!Pe(E)||we(E)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:E.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${E.runner}/${E.model} · effort
        ${E.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:E.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function we(E){return E.is_default===!0&&E.compatible===!1}function Pe(E){return!!(E.runner&&E.model&&E.effort)}function pe(E){return Pe(E)&&E.compatible!==!1}function V(E){let B=Math.max(0,Math.floor(E/1e3)),Q=Math.floor(B/60),K=B%60;return`${Q}:${String(K).padStart(2,"0")}`}function j(E){let B=E.job;if(B){let Q=typeof B.started_at=="number"?B.started_at:0,K=`${B.runner||"?"}/${B.model||"?"}`,w=Q?` \xB7 \uACBD\uACFC ${V(Date.now()-Q)}`:"";return i`<span class="pa-meta__progress"
        >분석 중 — ${K} · effort ${B.effort||"?"}${w}</span
      >`}return de()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function de(){return n?.isPending?.()===!0}function N(E){let B=m(),Q=(Array.isArray(B.queue)?B.queue.length:0)+(Array.isArray(B.serial_lanes)?B.serial_lanes:[]).reduce((X,Me)=>X+(Array.isArray(Me.entries)?Me.entries.length:0),0),K=!!E.job,w=pe(E.settings),F=K||l||de();return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${Q}</span>
      ${E.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(E.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${j(E)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!w||F}
        @click=${()=>{I(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!w||F}
        @click=${()=>{I(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!K}
        @click=${()=>{R()}}
      >
        취소
      </button>
    </div>`}function P(E,B){let Q=U(E,B),K=x(),w=Q.filter(Te=>K.has(Te)),F=k(Q),X=A(Q),Me=Array.isArray(m().serial_lanes)?m().serial_lanes:[],Le=c.get(E)||$(),Fe=B.eligible!==!0||Q.length<2||w.length>0||F.length>0||X||l;return i`<section class="pa-group" data-group-index=${String(E)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${B.confidence}</span>
        ${B.categories.map(Te=>i`<span class="pa-group__category">${Te}</span>`)}
        ${X?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${B.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${F.length>0?i`<span class="pa-group__stale"
              >stale — ${F.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${B.reason}</p>
      <ol class="pa-group__members">
        ${Q.map((Te,Xe)=>i`<li class="pa-member" data-bead-id=${Te}>
              <span class="pa-member__seq">${Xe+1}</span>
              <span class="pa-member__title">${M(Te)}</span>
              ${K.has(Te)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Te}
                ?disabled=${Xe===0}
                aria-label=${`${Te} \uC704\uB85C`}
                @click=${()=>Ie(E,B,Te,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Te}
                ?disabled=${Xe===Q.length-1}
                aria-label=${`${Te} \uC544\uB798\uB85C`}
                @click=${()=>Ie(E,B,Te,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Te}
                aria-label=${`${Te} \uC81C\uC678`}
                @click=${()=>He(E,B,Te)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${B.evidence.map(Te=>i`<li class="pa-evidence">
              <code>${Te.path}</code>
              <span class="pa-evidence__locator">${Te.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Qe(E)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Te=>{c.set(E,Te.target.value),L()}}
          >
            ${Me.map((Te,Xe)=>i`<option
                  value=${Te.id}
                  ?selected=${Le===Te.id}
                >
                  직렬 ${Xe+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Fe}
          @click=${()=>{Ve(E,B)}}
        >
          제출
        </button>
      </footer>
    </section>`}function be(E){let B=Array.isArray(E.issues)?E.issues:[],Q=B.filter(w=>w.verdict==="parallel_ok").length,K=B.filter(w=>w.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${Q}</span>
      <span>uncertain ${K}</span>
    </div>`}function Ee(){let E=H&&!!b().job;if(E&&_===null){_=setInterval(()=>L(),1e3);return}!E&&_!==null&&(clearInterval(_),_=null)}function L(){let E=b();d&&E.settings.runner===d&&(d=null);let B=E.last_good?.result;Ee(),ze(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${xe}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${ve()} ${N(E)}
            ${B?i`${B.groups.map((Q,K)=>P(K,Q))}
                ${B.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${be(B)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let H=!1,C=()=>{H=!1,Ee()},Z=E=>{E.target===E.currentTarget&&xe()};o.addEventListener("close",C),o.addEventListener("cancel",C),o.addEventListener("click",Z);let re=null;r&&r.subscribe&&(re=r.subscribe(()=>{H&&L()}));let le=null;n&&n.subscribe&&(le=n.subscribe(()=>{H&&L()}));function fe(){H||(H=!0,L(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function xe(){H&&(H=!1,Ee(),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:fe,close:xe,destroy(){H=!1,_!==null&&(clearInterval(_),_=null),o.removeEventListener("close",C),o.removeEventListener("cancel",C),o.removeEventListener("click",Z),re&&(re(),re=null),le&&(le(),le=null),o.remove()}}}function Oc(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{});function s(){return t&&t.get()||{}}function o(){let $=s();return typeof $.revision=="number"?$.revision:0}function a($){t&&$&&$.queue&&typeof $.queue=="object"&&t.set($.queue)}function c(){let $=s().workspace_info;return $&&typeof $=="object"?$:{}}function l($,M){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${$}"
      >${M}</span
    >`}function d($){if(typeof $!="number"||!Number.isFinite($))return"";let M=$/6e4;return Number.isInteger(M)?`timeout ${M}\uBD84`:`timeout ${Math.round($/1e3)}\uCD08`}function _($){let M=d($);return M?l("config",M):""}function m($){let M=typeof $.base_sha=="string"?$.base_sha:"",O=`${$.source_path||"repo-ops/config.toml"} @ ${$.base_ref||"?"}${M?`@${M.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${O}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${$.verify?i`<code class="worker-repo-ops__vd-cmd"
                  >${$.verify.script}</code
                >${_($.verify.timeout_ms)}`:i`선언 없음${l("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
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
                >${_($.deploy.timeout_ms)}`:i`선언 없음${l("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${$.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function b($){let M=$.repo_ops&&typeof $.repo_ops=="object"?$.repo_ops:null;return M&&(M.status==="resolved"||M.status==="absent")?m(M):M&&(M.status==="pending"||M.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${M.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${M.error_code?i` — <code>${M.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function x($){if(!r)return;let M=await r("worker-auto-repair-toggle",{on:$,expected_revision:o()});if(a(M),M&&M.conflict){let O=await r("worker-auto-repair-toggle",{on:$,expected_revision:o()});a(O)}n()}let k={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function q($,M,O){return i`<div class="worker-repo-ops__policy-group" data-policy=${O}>
      <div class="worker-repo-ops__policy-label">${$}</div>
      <ul class="worker-repo-ops__policy-list">
        ${M.map(I=>i`<li data-token=${I}>
              ${k[I]||I}
            </li>`)}
      </ul>
    </div>`}function U($){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${$.map(M=>{let O=[k[M.trigger]||M.trigger];return Number.isInteger(M.attempts_per_operation_attempt)?O.push(`operation\uB2F9 ${M.attempts_per_operation_attempt}\uD68C`):Number.isInteger(M.attempts)?O.push(`${k[M.budget]||M.budget} ${M.attempts}\uD68C`):Number.isInteger(M.sessions_per_user_action)&&O.push(`${M.sessions_per_user_action}\uD68C`,k[M.user_actions]||M.user_actions),M.applies_when&&O.push(k[M.applies_when]||M.applies_when),i`<li data-token=${M.id}>
            <strong>${k[M.id]||M.id}</strong>
            <span>${O.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function A(){let $=s(),M=$.auto_repair!==!1,O=$.repo_operation_policy&&typeof $.repo_operation_policy=="object"?$.repo_operation_policy:null,I=Array.isArray($.repo_operations)?$.repo_operations:[],R=I.find(ne=>ne.state==="repairing"),te=I.filter(ne=>ne.state==="failed"||ne.state==="repairing"),ee=te.length?Math.min(...te.map(ne=>typeof ne.repair?.remaining=="number"?ne.repair.remaining:0)):O?.auto_repair?.resolution_ladder?.find(ne=>ne.id==="auto_repair_session")?.attempts??1,ye=Array.isArray(O?.auto_repair?.resolution_ladder)?O.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${M}
          @change=${ne=>{x(ne.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${M?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ee}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${R?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${R.repair?.owner_bead||R.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${O?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(O.worker_automatic||[]).length} · 해결 사다리
                ${ye.length} · 금지
                ${(O.never_automatic||[]).length}</span
              >
            </summary>
            ${q("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",O.worker_automatic||[],"worker-automatic")}
            ${O.supported===!1||O.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${O.schema_version})`}
                </div>`:U(ye)}
            ${q("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",O.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${b(c())} ${A()}
      </details>`}}}var b_=20,Pc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Mc={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function h_(e,t,r=b_){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Dc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function y_(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Nc(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Fc(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function v_(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Mc,n)?Mc[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function w_(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?bt(e.at):""}
      >${Es(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Dc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Pc,t.kind)?Pc[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${As(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${No(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Dc(e)}"
          >${y_(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Fc(Jl(t.failure_kind,n)):""}
      ${v_(t)}
      ${Nc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${As(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function k_(e){let t=e.cleanup,r=Mr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?bt(e.at):""}
      >${Es(e.at)||"\u2014"}</span
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
        ${Yl(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Fc(Os(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Nc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function $_(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?k_(t):w_(t))}
        </ul>`}
  </section>`}function qc(e,t={}){let r=null;function n(){ze(r?$_(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:h_(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var x_="tab:worker:ready",S_="tab:worker:blocked",A_="tab:worker:in-progress",E_="tab:worker:closed",Ms=1,Bc=5;function Uc(e){return bn(e).path.length>0}var zc="beads-ui.worker.candidate-filter",Jo={show_blocked:!1,spec:"all"};function T_(){try{let e=window.localStorage.getItem(zc);if(!e)return{...Jo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Jo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Jo}}}function C_(e){try{window.localStorage.setItem(zc,JSON.stringify(e))}catch{}}function R_(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let l=r(c),d=n(c);l&&d?s.push(c):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var I_=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Hc="bdui.worker.candidate_sort",L_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Ds="spec";function O_(){try{let e=window.localStorage.getItem(Hc);return e==="board"||e==="created"||e==="spec"?e:Ds}catch{return Ds}}function P_(e){try{window.localStorage.setItem(Hc,e)}catch{}}var Gc="bdui.worker.done-range";function M_(){try{let e=window.localStorage.getItem(Gc);return Mt(e)?e:Lt}catch{return Lt}}function D_(e){try{window.localStorage.setItem(Gc,e)}catch{}}var N_="(max-width: 640px)",Vc="beads-ui.worker.lane-collapsed",En={queue:!0,done:!0};function F_(){try{let e=window.localStorage.getItem(Vc);if(!e)return{...En};let t=JSON.parse(e);return!t||typeof t!="object"?{...En}:{queue:typeof t.queue=="boolean"?t.queue:En.queue,done:typeof t.done=="boolean"?t.done:En.done}}catch{return{...En}}}function q_(e){try{window.localStorage.setItem(Vc,JSON.stringify(e))}catch{}}function jc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function B_(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Cr):(n.sort(Wn(r)),t==="board"?n:[...n.filter(Uc),...n.filter(s=>!Uc(s))])}function U_(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function j_(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function W_(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Wc(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function z_(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function H_(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ea(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function G_(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function V_(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Wc(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Wc(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Y_(e,t,r,n,s=null,o=null,a=null,c=!1,l=null,d=!0,_=null,m=null,b=null,x={},k=!1,q=!1,U={}){let A=!!l&&l.position>0,$=!!l?.continuation_action&&l.continuation_action.continuation===null,M=!!l&&l.active===!0,O=l&&l.failure||null,I=r[e]||null,R=I&&I.gate?I.gate:null,te=I&&I.pr?I.pr:null,ee=G_(b),ye=z_(l?l.resolution:null),ne=H_(l?l.head_review:null),ae=l&&l.head_review||null,ke=l&&l.authority||null,Be=!!ae&&["pending","reviewing","revising"].includes(ae.state),Ue=A&&!M&&(ae?.state==="failed"||!ke||ke.source==="automatic"&&!q),Ve=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ye?ye.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,He=!!R&&R.base_badge==="\uCDA9\uB3CC",Qe=!!R&&R.enabled===!0,Ie=Is({bead_id:e,merge_sha:U.merge_sha,cleanup_cursor:U.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:U.repo_operations}),ve=Ls(Ie),Ae=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!R&&R.tier==="merged",we=c&&!!n&&!!R&&R.tier==="merged",Pe=Ue&&(Qe||He||R?.reason==="base_behind"||R?.reason==="review_receipt_missing"||R?.reason==="review_receipt_stale"||Ae||we),pe=c&&He&&d===!1,V=er(x,e,{external:c,merge_active:M||Ie?.step==="merge",merge_queued:A,conflict_active:!!a,cleanup_active:ve,merged:!!n||R?.tier==="merged"}),j=!!V.operation,de=!Ae&&!!n&&n.step==="repo_operations",N=V_({continuation_required:$,merge_step:Ie,conflict_badge:Ve,conflict_live:ye?.live===!0||a==="running",head_review:ae&&ne?{...ne,state:ae.state,failure_reason:ae.failure_reason}:null,recovery:ee,cleanup_failed:n,cleanup_label:n?Mr(n.step):null,base_exception:m,conflicting:He,gate:R,queue_failure:O,auto_skip:_,queued:A,queue_active:M,queue_position:l?l.position:0,activity:Ve?null:o&&o.activity||null}),P=N?.live===!0&&N.title?i`<span title=${N.title}>${N.label}</span>`:N?.label||null;return{id:e,title:c?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&Ie?.active!==!0?Rs(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:c,pr_number:te&&typeof te.number=="number"?te.number:null,pr_url:te&&typeof te.url=="string"?te.url:"",completion_badge:N?.live!==!0&&N?.title?N.label:null,completion_title:N?.title||"",completion_repair_pr_url:ee?ee.repair_pr_url:"",completion_repair_pr_number:ee?ee.repair_pr_number:null,badges:P?[P]:[],live_badge:N?.live===!0?P:null,usage:s,alert:N?.alert===!0,merge_action:R?.tier==="merged"&&!Ae&&!we||de?!1:!A||$||Ue,timeline_action:de,cancel_action:A&&!$,cancel_enabled:(!M||Be)&&!(ee&&ee.lock_actions),cancel_title:ee&&ee.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":M&&!Be?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Be?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:V,discard_action:V.action,merge_step:Ie,discard_enabled:V.enabled,discard_title:V.title,merge_enabled:!Ie&&!a&&!j&&!m&&!(ee&&ee.lock_actions)&&!pe&&!de&&(Qe||He||R?.reason==="base_behind"||R?.reason==="review_receipt_missing"||R?.reason==="review_receipt_stale"||Ae||we||Pe),merge_label:$?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ae||we?"\uC815\uB9AC \uC7AC\uAC1C":He&&!Ie&&!Ae?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":R?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":R?.reason==="review_receipt_missing"||R?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ue?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:j?V.error?`\uD3D0\uAE30 \uC2E4\uD328: ${V.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${V.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:$?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ie?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Ie.label}`:we?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":He?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":R?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":R?.reason==="review_receipt_missing"||R?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":R?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Qe?`\uBA38\uC9C0 (${R.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:R&&R.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${R&&R.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ta(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:c,gotoIssue:l,getWorkspacePath:d,doneRange:_,onDoneRangeChange:m}=t,b=n?Hn(n,c):null,x=Vn({transport:r,uiOrderStore:c}),k=null,q=[],U=T_(),A=O_(),$=Mt(_)?_:M_(),M=new Map;function O(){let p=Qt.find(y=>y.value===$);return p?p.label:"\uC624\uB298"}let I=F_(),R=!1,te=new Set,ee=new Set,ye=new Set,ne=new Set,ae=[],ke=document.createElement("div");ke.className="worker-console";let Be=document.createElement("div");Be.className="worker-top";let Ue=document.createElement("div");Ue.className="worker-drawer-overlay",Ue.hidden=!0;let Ve=document.createElement("div");Ve.className="worker-drawer-overlay__backdrop";let He=document.createElement("div");He.className="worker-drawer-host";let Qe=document.createElement("div");Qe.className="worker-drawer-host",Qe.hidden=!0,Ue.append(Ve,He,Qe);let Ie=document.createElement("div");Ie.className="worker-lanes-host",ke.append(Be,Ue,Ie),e.appendChild(ke);let ve=null,Ae=_s(He,{transport:r,sessionLogStore:a,onClose:()=>{ve=null,Ue.hidden=!0,se()}}),we=qc(Qe,{onClose:()=>{Qe.hidden=!0,Ue.hidden=!0,se()}}),Pe=Oc({queueStore:s,transport:r,onChanged:()=>se()}),pe=o?Lc(ke,{queueStore:s,analysisStore:o,transport:r}):null;function V(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ms,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function j(){let p=V();return typeof p.revision=="number"?p.revision:0}function de(p){p&&p.queue&&s&&s.set(p.queue)}function N(){let p=V().queue;return Array.isArray(p)?p.length:0}async function P(p,y,S){if(!r)return;let oe=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},index:S,expected_revision:j()}),me=await r("worker-queue-place",oe());de(me),me&&me.conflict&&await r("worker-queue-place",oe()).then(de)}async function be(p,y,S){if(!r)return;let oe=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},to_index:S,expected_revision:j()}),me=await r("worker-queue-reorder",oe());de(me),me&&me.conflict&&await r("worker-queue-reorder",oe()).then(de)}async function Ee(p){if(!r)return;let y=await r("worker-queue-remove",{bead_id:p,expected_revision:j()});de(y),y&&y.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:j()}).then(de)}async function L(p){if(!r||!p)return;let y=await r("worker-attempt-pause",{attempt_id:p});y&&y.paused===!1&&y.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function H(p){if(!r||!p)return;let y=async(oe={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:j(),...oe}),S=await y();de(S),S&&S.conflict&&(S=await r("worker-attempt-resume",{attempt_id:p,expected_revision:j()}),de(S)),S=await nr(S,(oe,me)=>y({continuation:oe,decision_token:me}),{onResult:de,refresh:()=>y()}),S&&S.resumed===!1&&!S.conflict&&S.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}async function C(p){if(!r||!p)return;let y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:j()});de(y),y&&y.conflict&&(y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:j()}),de(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Z(p,y,S=!0){if(!r)return null;let oe=r,me=await oe(p,{...y,expected_revision:j()});return de(me),me&&me.conflict&&S&&(me=await oe(p,{...y,expected_revision:j()}),de(me)),me}async function re(p){if(!r||!p)return;let y=V().merge_queue?.find(oe=>oe.bead_id===p)?.continuation_action;if(y?.mismatch&&y.continuation===null){await fe(p,y.mismatch);return}te.add(p),se();let S;try{S=await Z("worker-merge-queue-add",{bead_id:p})}finally{te.delete(p),se()}!S||S.conflict||S.applied||ie("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function le(p){if(!(!r||!p||ee.has(p))){ee.add(p),se();try{let y=await r("worker-cleanup-retry",{bead_id:p,expected_revision:j()});de(y),y&&!y.retried&&!y.conflict&&y.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{ee.delete(p),se()}}}async function fe(p,y){let S=await nr({continuation_mismatch:y},(me,Ge)=>Z("worker-merge-queue-add",{bead_id:p,continuation:me,decision_token:Ge},!1)),oe=S?.queue?.merge_queue?.find(me=>me.bead_id===p)?.continuation_action;if(S?.applied!==!0&&oe?.continuation===null&&oe.mismatch){await fe(p,oe.mismatch);return}S&&S.applied===!1&&!S.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function xe(p){if(!r)return;let y=await Z("worker-merge-auto-toggle",{on:p});!y||y.conflict||ie(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function E(p){if(!r||!p)return;let y=await Z("worker-merge-queue-remove",{bead_id:p});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function B(){await Z("worker-merge-queue-remove",{all:!0})}async function Q(p,y=null,S="unmerged",oe=null){if(!r||!p)return;let me=wn(p,S);if(!(!!oe||typeof globalThis.confirm!="function"||globalThis.confirm(me)))return;let G=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...oe?{operation_id:oe}:{},expected_revision:j()});if(de(G),G&&G.conflict&&(G=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...oe?{operation_id:oe}:{},expected_revision:j()}),de(G)),G&&G.discarded===!0){ie(Ts(G),"success",5e3);return}if(G&&G.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${G.reason}`,"error",2800);return}if(G&&G.accepted&&G.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(G&&G.accepted&&!G.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${G.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}G&&!G.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function K(p,y,S){if(!(!r||!y||!S||ne.has(y))){ne.add(y),se();try{let oe=await r(p,{bead_id:y,action_id:S,expected_revision:j()});de(oe),oe?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!oe?.ok&&oe?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(oe.reason)}`,"error",2800)}finally{ne.delete(y),se()}}}async function w(p,y){if(!r||!y||ye.has(y))return;ye.add(y),se();let S;try{let oe=async(me={})=>await r(p,{bead_id:y,expected_revision:j(),...me});S=await oe(),de(S),S&&S.conflict&&(S=await r(p,{bead_id:y,expected_revision:j()}),de(S)),p==="worker-revise-fix"&&(S=await nr(S,(me,Ge)=>oe({continuation:me,decision_token:Ge}),{onResult:de,refresh:()=>oe()}))}finally{ye.delete(y),se()}if(!(!S||S.conflict)){if(S.ok){ie(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${S.reason||""}`,"error",3e3)}}async function F(p){if(!r)return;let y=await r("worker-automation-toggle",{on:p,expected_revision:j()});de(y),y&&y.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:j()}).then(de)}async function X(p){if(!r||!p)return;let y=await r("worker-repo-operation-repair",{operation_id:p});if(de(y),y&&y.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Me(p){if(!r||!p)return;let y=await r("worker-repo-operation-dismiss",{operation_id:p});de(y),y&&y.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function Le(p){if(!r||!Number.isFinite(p))return;let y=Math.max(Ms,Math.floor(p)),S=await r("worker-queue-set-slots",{slots:y,expected_revision:j()});de(S),S&&S.conflict&&await r("worker-queue-set-slots",{slots:y,expected_revision:j()}).then(de)}async function Fe(p){if(!r||!Number.isInteger(p)||p<1||p>Bc)return;let y=V(),S=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(p).reduce((Ge,G)=>Ge+(Array.isArray(G?.entries)?G.entries.length:0),0),oe=()=>({count:p,expected_revision:j()}),me=await r("worker-queue-set-serial-lane-count",oe());de(me),me&&me.conflict&&(me=await r("worker-queue-set-serial-lane-count",oe()),de(me)),me&&me.applied&&S>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${S}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Te(){let p=V(),y=b?b.selectBoardColumn(x_,"ready"):[],S=b?b.selectBoardColumn(S_,"blocked"):[],oe=b?b.selectBoardColumn(E_,"closed"):[],me=b?b.selectBoardColumn(A_,"in_progress"):[],Ge=new Map;for(let g of me){let D=j_(g);if(!D)continue;let ce=Ge.get(D);ce?ce.push(g):Ge.set(D,[g])}let G=g=>{let D=Gn(Ge.get(g)||[]);return D?D.title||D.id:null},h=p.bead_titles||{},W=new Map;for(let[g,D]of Object.entries(h))typeof D=="string"&&D.length>0&&W.set(g,D);for(let g of[...y,...S])W.set(g.id,g.title||g.id);let ue=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},qe=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Ye=new Map;for(let[g,D]of Object.entries(qe))Array.isArray(D)&&Ye.set(g,Xo(D));for(let g of[...y,...S]){let D=g.labels;Array.isArray(D)&&!Ye.has(g.id)&&Ye.set(g.id,Xo(D))}let Ke=new Map,he=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(he)?he:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let D=g.members.map(je=>{let ut=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(It=>It.entries.some(pt=>pt.bead_id===je));return ut?ut.id:null});if(!(D.every(je=>je!==null)&&new Set(D).size===1))for(let je of g.members)Ke.set(je,g.members.filter(ut=>ut!==je))}let v=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},f=new Map;for(let[g,D]of Object.entries(ue))D&&typeof D=="object"&&f.set(g,D);for(let g of[...y,...S])f.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let u=g=>f.get(g)||{},T=p.pr_wait||[],Y=p.pr_observations||{},ge=p.pr_activity||{},Oe=p.cleanup_failed||{},$e=Object.entries(Oe).map(([g,D])=>({bead_id:g,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0,subject_id:D&&typeof D.subject_id=="string"?D.subject_id:void 0,repair_eligible:!!(D&&D.repair_eligible),repair:D&&D.repair?D.repair:void 0})),_t=p.queue||[],Ce=new Set([..._t.map(g=>g.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(D=>D.bead_id)),...T.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),dt=new Set(S.map(g=>g.id)),Zr=c?c.get()?.order||{}:{},oa=new Set,aa=[];for(let g of[...y,...S])Ce.has(g.id)||oa.has(g.id)||U_(g)||Ic(g.labels)||(oa.add(g.id),aa.push(g));q=B_(aa,A,Zr);let ad=p.admission||{},ia=g=>{let D=ad[g];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ce=typeof D.reason=="string"?D.reason:"",je=ce.indexOf(":");return je>0&&je<ce.length-1?`\u26D4 ${ce.slice(0,je)} (${ce.slice(je+1)})`:`\u26D4 ${ce}`},id=q.map(g=>{let D=bn(g),ce=D.path.length>0,je=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",ut=!je&&ce&&!D.conflict,It=dt.has(g.id),pt=[];It&&pt.push(W_(g)),je?pt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):D.conflict?pt.push("spec_id_conflict"):ce||pt.push("spec \uC5C6\uC74C");let st=ia(g.id);return st&&pt.push(st),{id:g.id,title:g.title||g.id,reason:pt.join(" \xB7 "),draggable:ut,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:je,status:g.status,blocked:It,has_spec:ce}}),Ns=R_(id,U),ld=Ns.visible,cd=p.revise_parked||{},Tn=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Fs=(g,D)=>g.map((ce,je)=>{let ut=D!=="done",It=D!=="done"&&D!=="queue",pt=ut?cd[ce.bead_id]:null,st=ut?er(Tn,ce.bead_id):null,Pn=st?.operation?st:null,kd=ut&&Ye.get(ce.bead_id)===!0,Ia=v[ce.bead_id]||[],Hs=p.admission&&typeof p.admission=="object"?p.admission[ce.bead_id]:null,Gs=ut?Gl(Hs,!!Pn||ne.has(ce.bead_id)):null,$d=ut&&!Gs?ia(ce.bead_id):null,xd=ut?[$d]:[],La=ut&&Ia.length>0&&typeof Hs?.reason=="string"&&Hs.reason.startsWith("not_ready")?[`\u23F8 ${Ia.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Vs=ut?Ke.get(ce.bead_id):void 0;return Vs&&Vs.length>0&&La.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Vs.join(", ")}\uC640`),{id:ce.bead_id,title:W.get(ce.bead_id)||ce.bead_id,reason:xd.filter(Boolean).join(" \xB7 "),draggable:ut&&!Pn&&!Gs,done:D==="done",lane:D,seq:It?je+1:void 0,worker_serial:kd,discard:Pn,stale_work:Gs,badges:[...La,...pt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!pt,revise_action:!!pt,revise_enabled:!!pt&&!Pn&&!ye.has(ce.bead_id),revise_title:pt?pt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${pt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Dt(p.attempts||{},ce.bead_id):null,done_at:D==="done"&&typeof ce.added_at=="number"?ce.added_at:void 0,...u(ce.bead_id)}}),la=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&la.set(g.bead_id,g.added_at);let Nr=p.attempts?Object.values(p.attempts):[],qs=new Set;for(let g of Nr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&qs.add(g.resumed_from);let Bs=new Map;for(let g of Nr)Bs.set(g.bead_id,g.attempt_id);let Us=new Map;for(let g of Nr)Us.set(g.attempt_id,g);function js(g){let D=new Set,ce=g;for(;ce&&!D.has(ce.attempt_id);){if(ce.conflict_resolution===!0)return!0;D.add(ce.attempt_id),ce=typeof ce.resumed_from=="string"&&ce.resumed_from.length>0&&Us.get(ce.resumed_from)||null}return!1}let Cn=typeof p.declared_base=="string"?p.declared_base:null;function dd(g){let D=null;for(let ce of Nr)!ce||ce.bead_id!==g||js(ce)||(D===null||(typeof ce.started_at=="number"?ce.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=ce);return D&&typeof D.target_base=="string"?D.target_base:null}let ca=[],da=[],ud=g=>{let D=Bs.get(g.bead_id)!==g.attempt_id,ce=la.get(g.bead_id),je=typeof ce=="number"&&ce>0&&typeof g.finished_at=="number"&&ce>=g.finished_at;return!D&&!je&&typeof g.dismissed_at!="number"},ua=g=>{let D=typeof g.session_id=="string"&&g.session_id.length>0,ce=qs.has(g.attempt_id);return{eligible:D&&!ce,reason:D?ce?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},jt=null;for(let g of Nr){let D=g.status==="paused"&&!qs.has(g.attempt_id);if(g.status==="running"||D)da.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:W.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:D,conflict_resolution:js(g),base_exception:ea(Cn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:er(Tn,g.bead_id,{attempt_id:g.attempt_id}),usage:Dt(p.attempts||{},g.bead_id),current_child:G(g.bead_id),...u(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&ud(g)){let ce=ua(g);ca.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:W.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:er(Tn,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ce.eligible,resume_reason:ce.reason,conflict_resolution:js(g),base_exception:ea(Cn,g.target_base),usage:Dt(p.attempts||{},g.bead_id),current_child:G(g.bead_id),...u(g.bead_id)}),jt=g}}let Rn=[...ca,...da],pa=null;if(jt){let g=ua(jt),D=jt.cause_detail;pa={bead_id:jt.bead_id,repo:jt.repo||"",reason:jt.cause||jt.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:jt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:er(Tn,jt.bead_id,{attempt_id:jt.attempt_id})}}let fa=new Set(Rn.map(g=>g.bead_id)),Ws=Array.isArray(p.merge_queue)?p.merge_queue:[],_a=new Map,ma=new Map,ga=new Map,ba=new Map,ha=new Map;Ws.forEach((g,D)=>{g&&typeof g.bead_id=="string"&&(_a.set(g.bead_id,D+1),ma.set(g.bead_id,g.resolution),ga.set(g.bead_id,g.continuation_action||null),ba.set(g.bead_id,g.head_review||null),ha.set(g.bead_id,g.authority||null))});let ya=p.merge_queue_state||{active:null,failures:{}},pd=ya.failures||{},fd=p.auto_merge_skips||{},va=g=>{let D=fd[g];if(!D)return null;let ce=Y[g],je=ce&&ce.pr?ce.pr.head_sha:null;return je&&je===D.head_sha?D.reason||"":null},In=new Map;for(let g of Rn)g.failed!==!0&&g.conflict_resolution&&(g.paused?In.has(g.bead_id)||In.set(g.bead_id,"paused"):In.set(g.bead_id,"running"));let wa=Rn.filter(g=>!g.paused&&g.failed!==!0).length,ka=(p.workspace_info||{}).slots,$a=typeof ka=="number"?ka:typeof p.slots=="number"?p.slots:Ms,_d=wa>$a,Ln=Er($),md=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>Ln===void 0||typeof g.added_at!="number"||g.added_at>=Ln).sort((g,D)=>(D.added_at||0)-(g.added_at||0)),Xr=Fs(md,"done"),gd=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),xa=[],bd=d?.()||"";for(let g of oe){let D=Rr(g.closed_at);if(typeof g.id!="string"||gd.has(g.id)||D===null||Ln!==void 0&&D<Ln||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ce=`${bd}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,je=M.get(ce);je===void 0&&r&&(M.set(ce,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(ut=>{let It=Array.isArray(ut)&&ut.some(pt=>ms(typeof pt?.text=="string"?pt.text:"")?.lane==="session");M.set(ce,It?"session":"not-session"),se()}).catch(()=>{M.set(ce,"failed"),se()})),je==="session"&&xa.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:D,created_at:g.created_at,updated_at:g.updated_at})}Xr.push(...xa),Xr.sort((g,D)=>(D.done_at||0)-(g.done_at||0));let On={};for(let g of sr)On[g]=0;let Sa=!1,Aa=0,zs=0,Ea=0;for(let g of Xr){let D=g.usage;if(D&&typeof D=="object"){let ce=!1;for(let je of sr)Number.isFinite(D[je])&&(On[je]+=D[je],Sa=!0,ce=!0);ce&&(zs+=1,Number.isFinite(D.total_cost_usd)&&(Aa+=D.total_cost_usd,Ea+=1))}}zs>0&&Ea===zs&&(On.total_cost_usd=Aa);let Ta=Xr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),hd=Ta.length>0?wt(es(Ta)):Sa?zt(On):null,yd=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},vd=Array.isArray(p.serial_lanes)?p.serial_lanes:[],Ca=g=>{if(T.some(je=>je.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=Nr.filter(je=>je&&je.bead_id===g),ce=D.length>0?D[D.length-1].status:null;return ce==="failed"||ce==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ce==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ra=vd.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,D)=>{let ce=yd[g.id]||{},je=new Map((Array.isArray(ce.corrections)?ce.corrections:[]).filter(st=>st&&typeof st.bead_id=="string"&&typeof st.after=="string").map(st=>[st.bead_id,st.after])),ut=Fs(g.entries.filter(st=>!fa.has(st.bead_id)),g.id).map(st=>je.has(st.id)?{...st,badges:[`\u{1F517} ${je.get(st.id)} \uB4A4 (blocks \uC790\uB3D9)`,...st.badges]}:st),It=Array.isArray(ce.occupied_by)?ce.occupied_by.filter(st=>typeof st=="string"):[],pt=It.map(st=>({id:st,title:W.get(st)||st,draggable:!1,lane:g.id,ghost:!0,badges:[Ca(st)]}));return{id:g.id,index:D+1,rows:[...pt,...ut],occupied:It.length>0,badge:It.length>0?Ca(It[0]):"\uB300\uAE30",cycle:ce.cycle===!0}}),wd=typeof p.serial_lane_count=="number"?p.serial_lane_count:Ra.length;return{queue:p,idToTitle:W,candidates:ld,candidate_hidden:{blocked:Ns.hidden_blocked,spec:Ns.hidden_spec},running:Rn,live_count:wa,slots:$a,over_cap:_d,failure:pa,waiting:Fs(_t.filter(g=>!fa.has(g.bead_id)),"queue"),serial_lanes:Ra,serial_lane_count:wd,pr_wait:T.map(g=>Y_(g.bead_id,W.get(g.bead_id)||g.bead_id,Y,Oe[g.bead_id]||null,Dt(p.attempts||{},g.bead_id),ge[g.bead_id]||(te.has(g.bead_id)||ee.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),In.get(g.bead_id)||null,g.external===!0,{position:_a.get(g.bead_id)||0,active:ya.active===g.bead_id,failure:pd[g.bead_id]||null,resolution:ma.get(g.bead_id),continuation_action:ga.get(g.bead_id),head_review:ba.get(g.bead_id)||null,authority:ha.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?va(g.bead_id):null,ea(Cn,dd(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Us.get(Bs.get(g.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(g=>({...g,...u(g.id)})),merge_queue_length:Ws.length,merge_queue_running:Ws.length>0,auto_excluded:T.map(g=>g.bead_id).filter(g=>va(g)!==null),declared_base:Cn,done:Xr,token_total:hd,cleanup_failures:$e,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function Xe(){let y=!!o?.get()?.job,S=!y&&o?.isPending?.()===!0,oe=y?"\uBD84\uC11D \uC911":S?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${oe?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${oe?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${oe?i`<span class="worker-analysis-btn__badge">${oe}</span>`:""}
    </button>`}function kt(p){let y=p.waiting.length>0?p.waiting[0].id:"\u2014",S=i`<button
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
        >${O()} 완료 <b>${p.done.length}</b></span
      >`,G=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,h=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ms}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Bc},(qe,Ye)=>Ye+1).map(qe=>i`<option
                value=${String(qe)}
                ?selected=${p.serial_lane_count===qe}
              >
                ${qe}
              </option>`)}
        </select>
      </label>
      ${o?Xe():""} `,W=tc({failure:p.failure}),ue=Hl(p.repo_operations,p.cleanup_failures);return R?i`<div class="worker-ribbon">
          ${S} ${oe}
          <div class="worker-kpi worker-kpi--ribbon">${me}${Ge}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${h}</div>
          <div class="worker-kpi">${G}</div>
        </div>
        ${ue}${Pe.template()}${W}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${S}${oe}${h}</div>
        <div class="worker-kpi">
          ${me}${Ge}${G}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${O()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(qe=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${qe.tooltip}
                >${O()} 완료 · 누적 ${qe.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${ue}${Pe.template()}${W}`}function yt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let y=p.running.some(S=>!S.paused&&S.failed!==!0);return i`<section
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
      ${p.running.length>0?zo(p.running,Date.now(),ve):""}
      ${p.pr_wait.map(S=>Fo(S))}
    </section>`}function ct(p){let y=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${U.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${I_.map(S=>i`<button
              type="button"
              class="worker-filter__chip${U.spec===S.value?" is-active":""}"
              data-spec=${S.value}
              aria-pressed=${U.spec===S.value?"true":"false"}
            >
              ${S.label}
            </button>`)}
        ${y.spec>0?i`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function $t(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${A}
    >
      ${L_.map(p=>i`<option value=${p.value} ?selected=${A===p.value}>
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
    >`,S=p.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Yt({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:y,controls:S})}function mt(p){let y=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
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
      </button>`;let S=new Set(p.auto_excluded),oe=p.pr_wait.filter(me=>me.merge_action&&me.merge_enabled&&!S.has(me.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${oe>0?` ${oe}`:""}
    </button>`}function z(p){let y=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:$t(),controls:ct(p)});return R?i`<div class="worker-lanes worker-lanes--mobile">
        ${yt(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:I.queue,preview:jc(p.waiting)})}
        ${p.serial_lanes.map(S=>ot(S))}
        ${y}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:at(),collapsible:!0,collapsed:I.done,preview:Array.isArray(p.token_total)?p.token_total.map(S=>S.label).join(" \xB7 "):p.token_total||jc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${y}
      <div class="worker-wait">
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(S=>ot(S))}
      </div>
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(S=>!S.paused&&S.failed!==!0),body:zo(p.running,Date.now(),ve)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${O()} ${p.done.length}`,items:p.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:at()})}
    </div>`}function J(p){I={...I,[p]:!I[p]},q_(I),se()}function se(){let p=Te();ze(kt(p),Be),ze(z(p),Ie)}function _e(){let p=document.querySelector(".app-header");if(!p)return;let y=()=>{let S=Math.round(p.getBoundingClientRect().height);ke.style.setProperty("--worker-ribbon-top",`${S}px`)};if(y(),typeof ResizeObserver=="function"){let S=new ResizeObserver(y);S.observe(p),ae.push(()=>S.disconnect())}else window.addEventListener("resize",y),ae.push(()=>window.removeEventListener("resize",y))}function Se(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(N_);R=!!p.matches;let y=S=>{let oe=!!(S&&typeof S.matches=="boolean"?S.matches:p.matches);oe!==R&&(R=oe,se())};typeof p.addEventListener=="function"?(p.addEventListener("change",y),ae.push(()=>p.removeEventListener("change",y))):typeof p.addListener=="function"&&(p.addListener(y),ae.push(()=>p.removeListener(y)))}let De=null;function tt(p){De=p.target instanceof Element?p.target:null}function Je(p){let S=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!S)return;if(De&&S.contains(De)&&De.closest("input, button, a")){p.preventDefault();return}let oe=S.dataset.beadId||"",me=S.dataset.lane||"";k={bead_id:oe,from_lane:me};try{p.dataTransfer?.setData("text/plain",oe),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Ne(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;let S=y.dataset.lane||"";S!=="candidate"&&S!=="queue"&&!/^s[1-5]$/.test(S)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function rt(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Re(p,y){let S=q.find(G=>G.id===p);if(!S)return;let oe=q.filter(G=>G.id!==p),me=oe.length;if(y){let G=y.dataset.beadId;if(G===p)return;let h=oe.findIndex(W=>W.id===G);h>=0&&(me=h)}let Ge=oe.slice();Ge.splice(me,0,S),x.applyReorder(p,Ge,me)}function ft(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;p.preventDefault(),y.classList.remove("worker-pane--drag-over");let S=y.dataset.lane||"",oe=k?.bead_id||p.dataTransfer?.getData("text/plain")||"",me=k?.from_lane||"";if(k=null,!oe)return;let Ge=p.target?.closest?.(".worker-mini, .worker-card"),G=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),h=G.length;if(Ge){let W=G.indexOf(Ge);W>=0&&(h=W)}if(h=Math.max(0,h-y.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(h=N()),S==="candidate"){if(me==="candidate"){Re(oe,Ge);return}(me==="queue"||/^s[1-5]$/.test(me))&&Ee(oe);return}if(S==="queue"||/^s[1-5]$/.test(S)){let W=S==="queue"?"parallel":S;me===S?be(oe,W,h):P(oe,W,h)}}function xt(p){U=p,C_(p),se()}function qt(p){A=p==="board"||p==="created"||p==="spec"?p:Ds,P_(A),se()}function Xt(p){$=Mt(p)?p:Lt,D_($),m?.($),se()}function ur(p){let y=p.target?.closest?.(".worker-serial-lane-count");if(y){let h=Number.parseInt(y.value,10);Number.isFinite(h)&&Fe(h).then(se);return}let S=p.target?.closest?.(".worker-filter__blocked");if(S){xt({...U,show_blocked:S.checked});return}let oe=p.target?.closest?.(".worker-done-range");if(oe){Xt(oe.value);return}let me=p.target?.closest?.(".worker-sort");if(me){qt(me.value||Ds);return}let Ge=p.target?.closest?.(".worker-slots__input");if(!Ge)return;let G=Number.parseInt(Ge.value,10);if(!Number.isFinite(G)){se();return}Le(G).then(se)}function gt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function vt(){let p=Te();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:d&&d()||""}}function pr(){ve&&Ae.close(),Qe.hidden=!1,Ue.hidden=!1,we.open(vt()),se()}function tr(p){let y=V(),S=y.attempts?y.attempts[p]:null;ve=p,we.close(),Qe.hidden=!0,Ue.hidden=!1,Ae.open({attempt_id:p,meta:gt(S)}),se()}function Bt(){if(we.isOpen()&&we.refresh(vt()),!ve)return;let p=V(),y=p.attempts?p.attempts[ve]:null;if(y){Ae.updateMeta(gt(y));return}Ae.close()}function Ut(p){let y=p.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-parallel-analysis-dialog"))return;if(y?.closest?.(".worker-analysis-btn")){pe?.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){pr();return}let S=y?.closest?.(".worker-repo-op__session");if(S){let Ce=S.dataset.attemptId;Ce&&tr(Ce);return}let oe=y?.closest?.(".worker-repo-op__resolve");if(oe){X(oe.dataset.operationId||"");return}let me=y?.closest?.(".worker-repo-op__dismiss");if(me){Me(me.dataset.operationId||"");return}let Ge=y?.closest?.(".worker-cleanup__resume");if(Ge){let Ce=Ge.dataset.beadId;Ce&&le(Ce);return}let G=y?.closest?.(".worker-banner__resume");if(G){let Ce=G.dataset.attemptId;Ce&&H(Ce);return}let h=y?.closest?.(".worker-banner__discard");if(h){let Ce=h.dataset.confirmation==="merged"?"merged":"unmerged";Q(h.dataset.beadId||"",h.dataset.attemptId||null,Ce,h.dataset.operationId||null);return}let W=y?.closest?.(".worker-banner__dismiss");if(W){let Ce=W.dataset.attemptId;Ce&&C(Ce);return}if(y?.closest?.(".worker-play")){F(!V().auto_advance);return}let ue=y?.closest?.(".worker-merge-all");if(ue){ue.classList.contains("worker-merge-all--stop")?V().auto_merge===!0?xe(!1):B():xe(!0);return}let qe=y?.closest?.(".worker-pane__hd--toggle");if(qe){let Ce=qe.dataset.lane;(Ce==="queue"||Ce==="done")&&J(Ce);return}let Ye=y?.closest?.(".worker-card__place");if(Ye){let Ce=Ye.dataset.beadId;Ce&&!Ye.disabled&&P(Ce,"parallel",N());return}let Ke=y?.closest?.(".worker-filter__chip");if(Ke){let Ce=Ke.dataset.spec;(Ce==="all"||Ce==="with"||Ce==="without")&&xt({...U,spec:Ce});return}let he=y?.closest?.(".worker-mini__merge");if(he){let Ce=he.dataset.beadId||"";V().cleanup_failed?.[Ce]?le(Ce):re(Ce);return}let v=y?.closest?.(".worker-mini__merge-cancel");if(v){E(v.dataset.beadId||"");return}let f=y?.closest?.(".worker-mini__discard");if(f){Q(f.dataset.beadId||"",f.dataset.attemptId||null,f.dataset.discardMode==="merged"?"merged":"unmerged",f.dataset.operationId||null);return}let u=y?.closest?.(".worker-mini__stale-continue");if(u){K("worker-stale-work-continue",u.dataset.beadId||"",u.dataset.actionId||"");return}let T=y?.closest?.(".worker-mini__stale-backup");if(T){K("worker-stale-work-backup-fresh",T.dataset.beadId||"",T.dataset.actionId||"");return}let Y=y?.closest?.(".worker-mini__stale-recheck");if(Y){K("worker-stale-work-recheck",Y.dataset.beadId||"",Y.dataset.actionId||"");return}let ge=y?.closest?.(".worker-mini__revise-fix");if(ge){w("worker-revise-fix",ge.dataset.beadId||"");return}let Oe=y?.closest?.(".worker-mini__revise-approve");if(Oe){w("worker-revise-approve",Oe.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let Ce=y?.closest?.(".rtile"),dt=Ce?.dataset?.beadId,Zr=Ce?.dataset?.attemptId;dt&&Q(dt,Zr||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&C(dt);return}if(y?.closest?.(".rtile__pause")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&L(dt);return}if(y?.closest?.(".rtile__resume")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&H(dt);return}if(y?.closest?.(".rtile__session")){let dt=y?.closest?.(".rtile")?.dataset?.attemptId;dt&&tr(dt);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){we.close(),Ae.close();return}if(y?.closest?.(".worker-drawer-host"))return;let $e=y?.closest?.(".rtile");if($e){if(y?.closest?.(".rtile__id")){let dt=$e.dataset.beadId;dt&&Ir(dt).then(Zr=>{Zr?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ce=$e.dataset.beadId;Ce&&l&&l(Ce);return}let _t=y?.closest?.(".worker-mini, .worker-card");if(_t){let Ce=_t.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Ce&&Ir(Ce).then(dt=>{dt?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Ce&&l&&l(Ce)}}return e.addEventListener("pointerdown",tt),e.addEventListener("dragstart",Je),e.addEventListener("dragover",Ne),e.addEventListener("dragleave",rt),e.addEventListener("drop",ft),e.addEventListener("click",Ut),e.addEventListener("change",ur),Se(),_e(),b&&ae.push(b.subscribe(()=>{for(let[p,y]of M)y==="failed"&&M.delete(p);se()})),s&&ae.push(s.subscribe(()=>{se(),Bt()})),o&&typeof o.subscribe=="function"&&ae.push(o.subscribe(()=>se())),se(),{load(){se()},destroy(){for(let p of ae.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",tt),e.removeEventListener("dragstart",Je),e.removeEventListener("dragover",Ne),e.removeEventListener("dragleave",rt),e.removeEventListener("drop",ft),e.removeEventListener("click",Ut),e.removeEventListener("change",ur);try{Ae.destroy()}catch{}Ue.hidden=!0;try{pe?.destroy()}catch{}ze(i``,e)}}}function ra(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Yc(e,t,r,n=async()=>{},s=async()=>{}){let o=it("views:workspace-picker"),a=null,c=!1,l=!1,d=!1;async function _(R){let ee=R.target.value,ne=t.getState().workspace?.current?.path||"";if(ee&&ee!==ne){o("switching workspace to %s",ee),c=!0,I();try{await r(ee)}catch(ae){o("workspace switch failed: %o",ae)}finally{c=!1,I()}}}async function m(){let R=t.getState(),te=R.workspace?.current?.path||R.workspace?.available?.[0]?.path||"";if(!(!te||l)){o("git-pulling workspace %s",te),l=!0,I();try{await n(te)}catch(ee){o("workspace git pull failed: %o",ee)}finally{l=!1,I()}}}function b(R){let te=R.target;te&&e.contains(te)||q()}function x(R){R.key==="Escape"&&q()}function k(){d||(d=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",x),I())}function q(){d&&(d=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),I())}function U(){d?q():k()}async function A(R){let te=R.target,ee=te.value,ye=te.checked;o("toggling visibility %s \u2192 %s",ee,String(ye));try{await s(ee,ye)}catch(ne){o("workspace visibility toggle failed: %o",ne)}}function $(R){return R?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${c||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function M(R,te){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${U}
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
                ${R.map(ee=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${ee.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${ee.path}"
                        .checked=${!te.has(ee.path)}
                        @change=${A}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ra(ee.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function O(){let R=t.getState(),te=R.workspace?.current,ee=R.workspace?.available||[],ye=new Set(R.workspace?.hidden||[]),ne=te?.path||ee[0]?.path||"";if(ee.length===0)return i``;let ae=ee.filter(ke=>!ye.has(ke.path)||ke.path===ne);if(ae.length<=1){let ke=ae[0]||ee[0],Be=ra(ke.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ke.path}"
            >${Be}</span
          >
          ${M(ee,ye)}
          ${$(ne)}
          ${l?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${_}
          ?disabled=${c||l}
          aria-label="Select project workspace"
        >
          ${ae.map(ke=>i`
              <option
                value="${ke.path}"
                ?selected=${ke.path===ne}
                title="${ke.path}"
              >
                ${ra(ke.path)}
              </option>
            `)}
        </select>
        ${M(ee,ye)}
        ${$(ne)}
        ${c||l?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){ze(O(),e)}return I(),a=t.subscribe(()=>I()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),ze(i``,e)}}}var Kc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function na(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Zc(e,t,r=na()){return{id:r,type:e,payload:t}}function Xc(e={}){let t=it("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,l=!0,d=new Map,_=[],m=new Map,b=new Set;function x(O){for(let I of Array.from(b))try{I(O)}catch{}}function k(){if(!l||c)return;o="reconnecting",t("ws reconnecting\u2026"),x(o);let O=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),I=(r.jitterRatio||0)*O,R=Math.max(0,Math.round(O+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",R,a+1),c=setTimeout(()=>{c=null,M()},R)}function q(O){try{s?.send(JSON.stringify(O))}catch(I){t("ws send failed",I)}}function U(){for(o="open",t("ws open"),x(o),a=0;_.length;){let O=_.shift();O&&q(O)}}function A(O){let I;try{I=JSON.parse(String(O.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(d.has(I.id)){let te=d.get(I.id);d.delete(I.id),I.ok?te?.resolve(I.payload):te?.reject(I.error||new Error("ws error"));return}let R=m.get(I.type);if(R&&R.size>0)for(let te of Array.from(R))try{te(I.payload)}catch(ee){t("ws event handler error",ee)}else t("ws received unhandled message type: %s",I.type)}function $(){o="closed",t("ws closed"),x(o);for(let[O,I]of d.entries())I.reject(new Error("ws disconnected")),d.delete(O);a+=1,k()}function M(){if(!l)return;let O=n();try{s=new WebSocket(O),t("ws connecting %s",O),o="connecting",x(o),s.addEventListener("open",U),s.addEventListener("message",A),s.addEventListener("error",()=>{}),s.addEventListener("close",$)}catch(I){t("ws connect failed %o",I),k()}}return M(),{send(O,I){if(!Kc.includes(O))return Promise.reject(new Error(`unknown message type: ${O}`));let R=na(),te=Zc(O,I,R);return t("send %s id=%s",O,R),new Promise((ee,ye)=>{d.set(R,{resolve:ee,reject:ye,type:O}),s&&s.readyState===s.OPEN?q(te):(t("queue %s id=%s (state=%s)",O,R,o),_.push(te))})},on(O,I){m.has(O)||m.set(O,new Set);let R=m.get(O);return R?.add(I),()=>{R?.delete(I)}},onConnection(O){return b.add(O),()=>{b.delete(O)}},reconnect(){l=!0,c&&(clearTimeout(c),c=null),a=0,M()},close(){l=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function K_(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Z_(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var sa=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Qc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],vr="tab:worker:closed",X_="bdui.worker.done-range",Jc=bc,ed="worker:queue",td="worker:parallel-analysis",rd="ui:order",nd="ui:display-policy",sd="exec:presets",wr="tab:board:closed",od="beads-ui.board.closed-range";function Q_(e){let t=it("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ze(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&Rc(s),o&&a&&c&&l){let Ie=function(f,u){let T="Request failed",Y="";if(f&&typeof f=="object"){let Oe=f;if(typeof Oe.message=="string"&&Oe.message.length>0&&(T=Oe.message),typeof Oe.details=="string")Y=Oe.details;else if(Oe.details&&typeof Oe.details=="object")try{Y=JSON.stringify(Oe.details,null,2)}catch{Y=""}}else typeof f=="string"&&f.length>0&&(T=f);let ge=u&&u.length>0?`Failed to load ${u}`:"Request failed";Qe.open(ge,T,Y)},xe=function(f){return`${S.getState().workspace.current?.path||""}\0${f}`},E=function(){Ee&&(Ee().catch(()=>{}),Ee=null),L=null,H=null},Q=function(f){C=f;let u=()=>{C!==f||S.getState().selected_id!==f||(C=null,B(f))};if(!le){re.then(u);return}u()},X=function(f,u,T,Y,ge){return T!==F[u]?(ge().catch(()=>{}),!1):(f.set(Y,ge),!0)},Le=function(){let f=S.getState();yt(f.view==="board"),z(f.view==="worker"),De(f.view==="monitor"),se(f.view==="board"||f.view==="worker"||Me||!!f.selected_id)},Xe=function(){let f=Er(Fe);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},kt=function(){let f=Er(Te);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},yt=function(f){if(f)for(let[u,T]of sa){if(K.has(u)||w.has(u))continue;let Y=u===wr?Xe():{type:T};try{Pe.register(u,Y)}catch($e){t("register %s store failed: %o",u,$e)}w.add(u);let ge=F.board,Oe=!1;we.subscribeList(u,Y).then($e=>{Oe=!X(K,"board",ge,u,$e)}).catch($e=>{t("subscribe %s failed: %o",u,$e),Ie($e,"board")}).finally(()=>{w.delete(u),Oe&&Le()})}else at()},at=function(){F.board+=1;for(let[f]of sa){let u=K.get(f);u&&(u().catch(()=>{}),K.delete(f));try{Pe.unregister(f)}catch(T){t("unregister %s failed: %o",f,T)}}},z=function(f){if(!f){J();return}for(let[u,T]of Qc){if(ot.has(u)||w.has(u))continue;let Y=u===vr?kt():{type:T};try{Pe.register(u,Y)}catch($e){t("register %s store failed: %o",u,$e)}w.add(u);let ge=F.worker,Oe=!1;we.subscribeList(u,Y).then($e=>{Oe=!X(ot,"worker",ge,u,$e)}).catch($e=>{t("subscribe %s failed: %o",u,$e),Ie($e,"worker")}).finally(()=>{w.delete(u),Oe&&Le()})}},J=function(){F.worker+=1;for(let[f]of Qc){let u=ot.get(f);u&&(u().catch(()=>{}),ot.delete(f));try{Pe.unregister(f)}catch(T){t("unregister %s failed: %o",f,T)}}},se=function(f){if(!f){_e();return}mt||(Ae("subscribe-worker-queue",{id:ed}).catch(u=>{t("subscribe-worker-queue failed: %o",u)}),Ae("subscribe-worker-parallel-analysis",{id:td}).catch(u=>{t("subscribe-worker-parallel-analysis failed: %o",u)}),mt=()=>(Ae("unsubscribe-worker-parallel-analysis",{id:td}),Ae("unsubscribe-worker-queue",{id:ed})))},_e=function(){mt&&(mt().catch(()=>{}),mt=null),V.clear()},De=function(f){if(!f){tt();return}Se||(Ae("subscribe-monitor-pipeline",{id:Jc}).catch(u=>{t("subscribe-monitor-pipeline failed: %o",u)}),Se=()=>Ae("unsubscribe-monitor-pipeline",{id:Jc}))},tt=function(){Se&&(Se().catch(()=>{}),Se=null)},Ne=function(){Je||(Ae("subscribe-ui-order",{id:rd}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),Je=()=>Ae("unsubscribe-ui-order",{id:rd}))},rt=function(){Je&&(Je().catch(()=>{}),Je=null),de.clear()},ft=function(){Re||(Ae("subscribe-display-policy",{id:nd}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),Re=()=>Ae("unsubscribe-display-policy",{id:nd}))},xt=function(){Re&&(Re().catch(()=>{}),Re=null),N.clear()},Xt=function(){qt||(Ae("subscribe-impl-presets",{id:sd}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),qt=()=>Ae("unsubscribe-impl-presets",{id:sd}))},Bt=function(f){if(!f)return"Unknown";let u=f.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"};var d=Ie,_=xe,m=E,b=Q,x=X,k=Le,q=Xe,U=kt,A=yt,$=at,M=z,O=J,I=se,R=_e,te=De,ee=tt,ye=Ne,ne=rt,ae=ft,ke=xt,Be=Xt,Ue=Bt;let Ve=document.getElementById("header-loading"),He=mi(Ve),Qe=zl(e),ve=Xc(),Ae=He.wrapSend((f,u)=>ve.send(f,u)),we=ii(Ae),Pe=li(),pe=ui(),V=di(),j=Ga(),de=ci(),N=za(),P=Ha(),be=Va();ve.on("impl-presets-snapshot",f=>{let u=f;u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&P.set({revision:u.revision,presets:u.presets})}),ve.on("monitor-pipeline-snapshot",f=>{let u=f;if(!(!u||!Array.isArray(u.workspaces)))try{j.set(u.workspaces,u.workspaces_state)}catch{}}),ve.on("ui-order-snapshot",f=>{let u=f;if(u&&typeof u.revision=="number")try{de.set({revision:u.revision,order:u.order&&typeof u.order=="object"?u.order:{}})}catch{}}),ve.on("display-policy-snapshot",f=>{let u=f;if(u&&u.policy&&typeof u.policy=="object")try{N.set(u.policy)}catch{}}),ve.on("session-log-snapshot",f=>{let u=f;if(u&&typeof u.attempt_id=="string")try{be.set(u.attempt_id,Array.isArray(u.lines)?u.lines:[],typeof u.last_event_at=="number"?u.last_event_at:null)}catch{}}),ve.on("session-log-append",f=>{let u=f;if(u&&typeof u.attempt_id=="string")try{be.append(u.attempt_id,u.event)}catch{}}),ve.on("snapshot",f=>{let u=f,T=u&&typeof u.id=="string"?u.id:"",Y=T?Pe.getStore(T):null;if(Y&&u&&u.type==="snapshot")try{Y.applyPush(u)}catch{}}),ve.on("upsert",f=>{let u=f,T=u&&typeof u.id=="string"?u.id:"",Y=T?Pe.getStore(T):null;if(Y&&u&&u.type==="upsert")try{Y.applyPush(u)}catch{}}),ve.on("delete",f=>{let u=f,T=u&&typeof u.id=="string"?u.id:"",Y=T?Pe.getStore(T):null;if(Y&&u&&u.type==="delete")try{Y.applyPush(u)}catch{}});let Ee=null,L=null,H=null,C=null,Z=()=>{},re=new Promise(f=>{Z=()=>f(void 0)}),le=!1,fe=!1;async function B(f){let u=xe(f);if(u===L||u===H)return;H=u;let T=`detail:${f}`,Y={type:"issue-detail",params:{id:f}};try{Pe.register(T,Y)}catch(ge){t("register detail store failed: %o",ge)}try{let ge=await we.subscribeList(T,Y);if(S.getState().selected_id!==f||xe(f)!==u){await ge().catch(()=>{});return}Ee&&await Ee().catch(()=>{}),Ee=ge,L=u}catch(ge){t("detail subscribe failed: %o",ge),Ie(ge,"issue details")}finally{H===u&&(H=null)}}let K=new Map,w=new Set,F={board:0,worker:0},Me=!1,Fe=Lt;try{let f=window.localStorage.getItem(od);Mt(f)&&(Fe=f)}catch{}let Te=Lt;try{let f=window.localStorage.getItem(X_);Mt(f)&&(Te=f)}catch{}async function ct(f){if(!Mt(f)||f===Fe)return;Fe=f;try{window.localStorage.setItem(od,f)}catch{}let u=K.get(wr);if(!u)return;K.delete(wr),await u().catch(()=>{});let T=Xe();try{Pe.register(wr,T)}catch(Y){t("register %s store failed: %o",wr,Y)}try{let Y=await we.subscribeList(wr,T);K.set(wr,Y)}catch(Y){t("re-subscribe %s failed: %o",wr,Y),Ie(Y,"board")}}async function $t(f){if(!Mt(f)||f===Te)return;Te=f;let u=ot.get(vr);if(!u)return;ot.delete(vr),await u().catch(()=>{});let T=kt();try{Pe.register(vr,T)}catch(Y){t("register %s store failed: %o",vr,Y)}try{let Y=await we.subscribeList(vr,T);ot.set(vr,Y)}catch(Y){t("re-subscribe %s failed: %o",vr,Y),Ie(Y,"worker")}}let ot=new Map,mt=null,Se=null,Je=null,Re=null,qt=null;async function ur(){Re=null,N.clear(),qt=null,P.clear(),mt=null,Se=null,K.clear(),ot.clear(),F.board+=1,F.worker+=1,Xt();let f=S.getState().workspace.current?.path;if(f)try{await ve.send("set-workspace",{path:f})}catch(T){t("workspace restore after reconnect failed: %o",T);return}ft();let u=S.getState();yt(u.view==="board"),z(u.view==="worker"),De(u.view==="monitor"),se(u.view==="board"||u.view==="worker"||!!u.selected_id)}async function gt(){t("clearing all subscriptions for workspace switch"),at(),J(),_e(),pe.clear(),rt(),Ne(),xt(),ft(),E();let f=S.getState();if(f.selected_id)try{Pe.unregister(`detail:${f.selected_id}`)}catch{}let u=S.getState();yt(u.view==="board"),z(u.view==="worker"),De(u.view==="monitor"),se(u.view==="board"||u.view==="worker"||!!u.selected_id),u.selected_id&&Q(u.selected_id)}async function vt(f){t("requesting workspace switch to %s",f),fe=!0;try{let u=await ve.send("set-workspace",{path:f});t("workspace switch result: %o",u),u&&u.workspace&&(S.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),u.changed&&(await gt(),ie("Switched to "+Bt(f),"success",2e3)))}catch(u){throw t("workspace switch failed: %o",u),ie("Failed to switch workspace","error",3e3),u}finally{fe=!1}}async function pr(f){t("requesting workspace git pull for %s",f);try{let u=await ve.send("git-pull-workspace",{});t("workspace git pull result: %o",u);let T=u?.status;if(T==="up_to_date"){ie("Already up to date","success",2e3);return}if(T==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+Bt(f),"success",2e3)}catch(u){t("workspace git pull failed: %o",u);let T=u?.code,Y=u?.message;if(T==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(T==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(T==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let ge=Y?`: ${Y}`:"";throw ie(`Git pull failed${ge}`,"error",3e3),u}}async function tr(f,u){t("setting workspace visibility %s \u2192 %s",f,String(u));try{await ve.send("set-workspace-visibility",{path:f,visible:u}),await Ut()}catch(T){t("workspace visibility update failed: %o",T),ie("Failed to update project visibility","error",3e3)}}async function Ut(){try{let f=await ve.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let u=f.workspaces.map(Oe=>({path:Oe.path,database:Oe.database,pid:Oe.pid,version:Oe.version})),T=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,Y=Array.isArray(f.hidden)?f.hidden.filter(Oe=>typeof Oe=="string"):[];S.setState({workspace:{current:T,available:u,hidden:Y}});let ge=window.localStorage.getItem("beads-ui.workspace");ge&&(!u.some($e=>$e.path===ge)||Y.includes(ge)?window.localStorage.removeItem("beads-ui.workspace"):T&&ge!==T.path&&(t("restoring saved workspace preference: %s",ge),await vt(ge)))}}catch(f){t("failed to load workspaces: %o",f)}}ve.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(S.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),Ut(),gt())});let p=!1;if(typeof ve.onConnection=="function"){let f=u=>{t("ws state %s",u),u==="reconnecting"||u==="closed"?(p=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&p&&(p=!1,ie("Reconnected","success",2200),Z_(S,(T,Y)=>{t(`${T}: %o`,Y)}),ur())};ve.onConnection(f)}let y="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(y=f)}catch(f){t("view parse error: %o",f)}let S=_i({config:K_(),view:y});ve.on("worker-queue-snapshot",f=>{let u=f;if(!u||!u.queue)return;let T=S.getState().workspace.current?.path;if(typeof T=="string"&&T.length>0&&u.root_dir!==T){t("dropping worker-queue snapshot for %s",String(u.root_dir));return}try{pe.set(u.queue)}catch{}}),ve.on("worker-parallel-analysis-snapshot",f=>{let u=f;if(!u)return;let T=S.getState().workspace.current?.path;if(!(typeof T=="string"&&T.length>0&&typeof u.root_dir=="string"&&u.root_dir!==T))try{V.set({settings:u.settings,job:u.job??null,last_good:u.last_good??null})}catch{}});let oe=pi(S);oe.start();let me=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),Ge=async(f,u)=>{try{return await Ae(f,u)}catch(T){if(me.has(f))throw T;return[]}};n&&yc(n,S,oe);let G=document.getElementById("workspace-picker");G&&Yc(G,S,vt,pr,tr);let h=$c(e,(f,u)=>Ae(f,u));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>h.open())}catch{}let W=Ec(e,{policyStore:N,queueStore:pe,implPresetStore:P,transport:(f,u)=>Ae(f,u),onOpenChange:f=>{Me=f,Le()},labelOptions:()=>{let f=new Set;for(let[u]of sa)for(let T of Pe.snapshotFor(u)||[]){let Y=T.labels;if(Array.isArray(Y))for(let ge of Y)typeof ge=="string"&&ge.length>0&&f.add(ge)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>W.open()))}catch{}let ue=Si(o,{gotoIssue:f=>oe.gotoIssue(f),issueStores:Pe,transport:Ge,workerQueueStore:pe,uiOrderStore:de,displayPolicyStore:N,closedRange:Fe,onClosedRangeChange:f=>{ct(f)},onNewIssue:()=>h.open()}),qe=ta(a,{transport:Ge,issueStores:Pe,queueStore:pe,analysisStore:V,sessionLogStore:be,uiOrderStore:de,gotoIssue:f=>S.setState({selected_id:f}),getWorkspacePath:()=>S.getState().workspace.current?.path,doneRange:Te,onDoneRangeChange:f=>{$t(f)}}),Ye=hc(c,{transport:Ge,pipelineStore:j,execPresetStore:P,gotoIssue:f=>oe.gotoIssue(f),getWorkspacePath:()=>S.getState().workspace.current?.path,switchWorkspace:f=>vt(f)}),Ke=Wl(l,{issueStores:Pe,transport:Ge,queueStore:pe,execPresetStore:P,sessionLogStore:be,getWorkspacePath:()=>S.getState().workspace.current?.path,onNavigate:f=>{S.getState().view==="worker"?S.setState({selected_id:f}):oe.gotoIssue(f)},onClose:()=>{let f=S.getState();S.setState({selected_id:null});try{oe.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{W.open("session")}}),he=S.getState().selected_id;he&&(l.hidden=!1,Ke.load(he),Q(he)),S.subscribe(f=>{let u=f.selected_id;u?(l.hidden=!1,Ke.load(u),fe||Q(u)):(Ke.clear(),l.hidden=!0,E())});let v=f=>{o.hidden=f.view!=="board",a.hidden=f.view!=="worker",c.hidden=f.view!=="monitor",yt(f.view==="board"),z(f.view==="worker"),De(f.view==="monitor"),se(f.view==="board"||f.view==="worker"||Me||!!f.selected_id),!f.selected_id&&f.view==="board"&&ue.load(),f.view==="worker"&&qe.load(),f.view==="monitor"?Ye.load():Ye.pause(),window.localStorage.setItem("beads-ui.view",f.view)};S.subscribe(v),v(S.getState()),Ne(),ft(),Xt(),Ut().finally(()=>{le=!0,Z()}),window.addEventListener("keydown",f=>{let u=f.ctrlKey||f.metaKey,T=String(f.key||"").toLowerCase(),Y=f.target,ge=Y&&Y.tagName?String(Y.tagName).toLowerCase():"",Oe=ge==="input"||ge==="textarea"||ge==="select"||Y&&typeof Y.isContentEditable=="boolean"&&Y.isContentEditable;u&&T==="n"&&(Oe||(f.preventDefault(),h.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Q_(t)});export{Q_ as bootstrap,K_ as readBootstrapConfig,Z_ as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
