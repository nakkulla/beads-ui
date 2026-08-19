var Pd=Object.create;var Qs=Object.defineProperty;var Md=Object.getOwnPropertyDescriptor;var Dd=Object.getOwnPropertyNames;var Nd=Object.getPrototypeOf,qd=Object.prototype.hasOwnProperty;var Fd=(e,t,r)=>t in e?Qs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Js=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Bd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Dd(t))!qd.call(e,s)&&s!==r&&Qs(e,s,{get:()=>t[s],enumerable:!(n=Md(t,s))||n.enumerable});return e};var jd=(e,t,r)=>(r=e!=null?Pd(Nd(e)):{},Bd(t||!e||!e.__esModule?Qs(r,"default",{value:e,enumerable:!0}):r,e));var tt=(e,t,r)=>Fd(e,typeof t!="symbol"?t+"":t,r);var Qa=Js((xm,Xa)=>{var jr=1e3,Ur=jr*60,Wr=Ur*60,Rr=Wr*24,zd=Rr*7,Hd=Rr*365.25;Xa.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Gd(e);if(r==="number"&&isFinite(e))return t.long?Yd(e):Vd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Gd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Hd;case"weeks":case"week":case"w":return r*zd;case"days":case"day":case"d":return r*Rr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Wr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Ur;case"seconds":case"second":case"secs":case"sec":case"s":return r*jr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Vd(e){var t=Math.abs(e);return t>=Rr?Math.round(e/Rr)+"d":t>=Wr?Math.round(e/Wr)+"h":t>=Ur?Math.round(e/Ur)+"m":t>=jr?Math.round(e/jr)+"s":e+"ms"}function Yd(e){var t=Math.abs(e);return t>=Rr?Hn(e,t,Rr,"day"):t>=Wr?Hn(e,t,Wr,"hour"):t>=Ur?Hn(e,t,Ur,"minute"):t>=jr?Hn(e,t,jr,"second"):e+" ms"}function Hn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var ei=Js((Sm,Ja)=>{function Kd(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=Qa(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let m=0;for(let b=0;b<_.length;b++)m=(m<<5)-m+_.charCodeAt(b),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(_){let m,b=null,A,k;function N(...F){if(!N.enabled)return;let E=N,W=Number(new Date),J=W-(m||W);E.diff=J,E.prev=m,E.curr=W,m=W,F[0]=r.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let x=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(R,q)=>{if(R==="%%")return"%";x++;let X=r.formatters[q];if(typeof X=="function"){let fe=F[x];R=X.call(E,fe),F.splice(x,1),x--}return R}),r.formatArgs.call(E,F),(E.log||r.log).apply(E,F)}return N.namespace=_,N.useColors=r.useColors(),N.color=r.selectColor(_),N.extend=n,N.destroy=r.destroy,Object.defineProperty(N,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(A!==r.namespaces&&(A=r.namespaces,k=r.enabled(_)),k),set:F=>{b=F}}),typeof r.init=="function"&&r.init(N),N}function n(_,m){let b=r(this.namespace+(typeof m>"u"?":":m)+_);return b.log=this.log,b}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let m=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(_,m){let b=0,A=0,k=-1,N=0;for(;b<_.length;)if(A<m.length&&(m[A]===_[b]||m[A]==="*"))m[A]==="*"?(k=A,N=b,A++):(b++,A++);else if(k!==-1)A=k+1,N++,b=N;else return!1;for(;A<m.length&&m[A]==="*";)A++;return A===m.length}function a(){let _=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),_}function l(_){for(let m of r.skips)if(o(_,m))return!1;for(let m of r.names)if(o(_,m))return!0;return!1}function c(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ja.exports=Kd});var ti=Js((Tt,Gn)=>{Tt.formatArgs=Xd;Tt.save=Qd;Tt.load=Jd;Tt.useColors=Zd;Tt.storage=eu();Tt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Tt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Zd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Xd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Gn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Tt.log=console.debug||console.log||(()=>{});function Qd(e){try{e?Tt.storage.setItem("debug",e):Tt.storage.removeItem("debug")}catch{}}function Jd(){let e;try{e=Tt.storage.getItem("debug")||Tt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function eu(){try{return localStorage}catch{}}Gn.exports=ei()(Tt);var{formatters:tu}=Gn.exports;tu.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var nn=globalThis,Fn=nn.trustedTypes,Da=Fn?Fn.createPolicy("lit-html",{createHTML:e=>e}):void 0,to="$lit$",sr=`lit$${Math.random().toFixed(9).slice(2)}$`,ro="?"+sr,Ud=`<${ro}>`,Ar=document,sn=()=>Ar.createComment(""),on=e=>e===null||typeof e!="object"&&typeof e!="function",no=Array.isArray,Ua=e=>no(e)||typeof e?.[Symbol.iterator]=="function",eo=`[ 	
\f\r]`,rn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Na=/-->/g,qa=/>/g,xr=RegExp(`>|${eo}(?:([^\\s"'>=/]+)(${eo}*=${eo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fa=/'/g,Ba=/"/g,Wa=/^(?:script|style|textarea|title)$/i,so=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=so(1),_r=so(2),bm=so(3),Pt=Symbol.for("lit-noChange"),at=Symbol.for("lit-nothing"),ja=new WeakMap,Sr=Ar.createTreeWalker(Ar,129);function za(e,t){if(!no(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Da!==void 0?Da.createHTML(t):t}var Ha=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=rn;for(let l=0;l<r;l++){let c=e[l],d,_,m=-1,b=0;for(;b<c.length&&(a.lastIndex=b,_=a.exec(c),_!==null);)b=a.lastIndex,a===rn?_[1]==="!--"?a=Na:_[1]!==void 0?a=qa:_[2]!==void 0?(Wa.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=xr):_[3]!==void 0&&(a=xr):a===xr?_[0]===">"?(a=s??rn,m=-1):_[1]===void 0?m=-2:(m=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?xr:_[3]==='"'?Ba:Fa):a===Ba||a===Fa?a=xr:a===Na||a===qa?a=rn:(a=xr,s=void 0);let A=a===xr&&e[l+1].startsWith("/>")?" ":"";o+=a===rn?c+Ud:m>=0?(n.push(d),c.slice(0,m)+to+c.slice(m)+sr+A):c+sr+(m===-2?l:A)}return[za(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},an=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[d,_]=Ha(t,r);if(this.el=e.createElement(d,n),Sr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=Sr.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(to)){let b=_[a++],A=s.getAttribute(m).split(sr),k=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:k[2],strings:A,ctor:k[1]==="."?jn:k[1]==="?"?Un:k[1]==="@"?Wn:Tr}),s.removeAttribute(m)}else m.startsWith(sr)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(Wa.test(s.tagName)){let m=s.textContent.split(sr),b=m.length-1;if(b>0){s.textContent=Fn?Fn.emptyScript:"";for(let A=0;A<b;A++)s.append(m[A],sn()),Sr.nextNode(),c.push({type:2,index:++o});s.append(m[b],sn())}}}else if(s.nodeType===8)if(s.data===ro)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(sr,m+1))!==-1;)c.push({type:7,index:o}),m+=sr.length-1}o++}}static createElement(t,r){let n=Ar.createElement("template");return n.innerHTML=t,n}};function Er(e,t,r=e,n){if(t===Pt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=on(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Er(e,s._$AS(e,t.values),s,n)),t}var Bn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Ar).importNode(r,!0);Sr.currentNode=s;let o=Sr.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new Br(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new zn(o,this,t)),this._$AV.push(d),c=n[++l]}a!==c?.index&&(o=Sr.nextNode(),a++)}return Sr.currentNode=Ar,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Br=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=at,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Er(this,t,r),on(t)?t===at||t==null||t===""?(this._$AH!==at&&this._$AR(),this._$AH=at):t!==this._$AH&&t!==Pt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ua(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==at&&on(this._$AH)?this._$AA.nextSibling.data=t:this.T(Ar.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=an.createElement(za(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Bn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=ja.get(t.strings);return r===void 0&&ja.set(t.strings,r=new an(t)),r}k(t){no(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(sn()),this.O(sn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Tr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=at,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=at}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Er(this,t,r,0),a=!on(t)||t!==this._$AH&&t!==Pt,a&&(this._$AH=t);else{let l=t,c,d;for(t=o[0],c=0;c<o.length-1;c++)d=Er(this,l[n+c],r,c),d===Pt&&(d=this._$AH[c]),a||(a=!on(d)||d!==this._$AH[c]),d===at?t=at:t!==at&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(t)}j(t){t===at?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},jn=class extends Tr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===at?void 0:t}},Un=class extends Tr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==at)}},Wn=class extends Tr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Er(this,t,r,0)??at)===Pt)return;let n=this._$AH,s=t===at&&n!==at||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==at&&(n===at||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},zn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Er(this,t)}},Ga={M:to,P:sr,A:ro,C:1,L:Ha,R:Bn,D:Ua,V:Er,I:Br,H:Tr,N:Un,U:Wn,B:jn,F:zn},Wd=nn.litHtmlPolyfillSupport;Wd?.(an,Br),(nn.litHtmlVersions??(nn.litHtmlVersions=[])).push("3.3.1");var je=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Br(t.insertBefore(sn(),o),o,void 0,r??{})}return s._$AI(e),s};var It="today",Jt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Mt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Cr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Va(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ya(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ka(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Za(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var ri=jd(ti(),1);function st(e){return(0,ri.default)(`beads-ui:${e}`)}function Wt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ir(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function oi(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ai(e,t){let r=Wt(e.updated_at),n=Wt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ii(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Wt(e.created_at),o=Wt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function li(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var ru=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ni(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function si(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=ru.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ci(e,t){let r=ni(e),n=ni(t);if(r!==n)return r<n?-1:1;let s=si(e),o=si(t);if(s!==o)return s<o?-1:1;let a=Wt(e&&e.created_at),l=Wt(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,d=t&&t.id;return c===d?0:String(c)<String(d)?-1:1}var oo=2**20;function zr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Wt(e&&e.created_at)}function Vn(e){return(t,r)=>{let n=zr(t,e),s=zr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function ao(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:zr(l,r)-oo};if(!l)return{rank:zr(a,r)+oo};let c=zr(a,r),d=zr(l,r),_=(c+d)/2;return c<_&&_<d?{rank:_}:{renormalize:n.map((m,b)=>({bead_id:m.id,rank:b*oo}))}}function io(e,t={}){let r=st(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Ir;function d(){for(let b of Array.from(a))try{b()}catch{}}function _(){s=Array.from(n.values()).sort(c)}function m(b){if(l||!b||b.id!==e)return;let A=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,A),!(A<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(A<=o)return;n.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let N of k)N&&typeof N.id=="string"&&N.id.length>0&&n.set(N.id,N);_(),o=A,d();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let N=n.get(k.id);if(!N)n.set(k.id,k);else{let F=Number.isFinite(N.updated_at)?N.updated_at:0,E=Number.isFinite(k.updated_at)?k.updated_at:0;if(F<=E){for(let W of Object.keys(N))W in k||delete N[W];for(let[W,J]of Object.entries(k))N[W]=J}}_()}o=A,d()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(n.delete(k),_()),o=A,d()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Yn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function di(e){let t=st("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let _=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],b=Array.isArray(c.removed)?c.removed:[];for(let A of Array.from(d)){let k=r.get(A);if(!k)continue;let N=k.itemsById;for(let F of _)typeof F=="string"&&F.length>0&&N.set(F,!0);for(let F of m)typeof F=="string"&&F.length>0&&N.set(F,!0);for(let F of b)typeof F=="string"&&F.length>0&&N.delete(F)}}async function o(l,c){let d=Yn(c);if(t("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==d){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(m){let b=r.get(l)||null;if(b){let A=n.get(b.key);A&&(A.delete(l),A.size===0&&n.delete(b.key))}throw r.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Yn,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let d=r.get(l);return d?d.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),d={};if(!c)return d;for(let _ of c.itemsById.keys())d[_]=!0;return d}}}}function ui(){let e=st("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,d,_){let m=d?Yn(d):"",b=r.get(c)||"",A=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,b),A&&b&&m&&b!==m){let k=t.get(c);if(k)try{k.dispose()}catch{}let N=s.get(c);if(N){try{N()}catch{}s.delete(c)}let F=io(c,_);t.set(c,F);let E=F.subscribe(()=>o());s.set(c,E)}else if(!A){let k=io(c,_);t.set(c,k);let N=k.subscribe(()=>o());s.set(c,N)}return r.set(c,m),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let d=t.get(c);d&&(d.dispose(),t.delete(c));let _=s.get(c);if(_){try{_()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let d=t.get(c);return d?d.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function pi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function fi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function _i(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function lo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function nu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function su(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function mi(e){let t=st("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):nu(n),a=su(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=lo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?lo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ou=Object.freeze({workspace_config:{default_workspace:null}});function gi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:ou.workspace_config.default_workspace}}}function bi(e={}){let t=st("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:gi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?gi(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function hi(e){let t=st("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function c(d){return async(m,b)=>{let A=s++,k=Date.now();n.set(A,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",A,m,r+1),a();let N=!1,F=()=>{N||(N=!0,n.delete(A),l())},E=setTimeout(()=>{N||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,m,Date.now()-k),F())},3e4);try{let W=await d(m,b),J=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",A,m,J),W}catch(W){let J=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,m,J,W),W}finally{clearTimeout(E),F()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,m])=>({id:_,type:m.type,elapsed_ms:d-m.start_ts}))}}}function ce(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Kn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(li),c;switch(l){case"created_desc":return c.sort(Ir),c;case"created_asc":return c.sort(oi),c;case"updated_desc":return c.sort(ai),c;case"priority":return c.sort(ii),c;case"manual":default:{let d=r();return d?c.sort(Vn(d)):c.sort(Ir),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Lr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function _t(e){let t=Lr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Lt(e,t){let r=Lr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Zn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Lr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Xn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let d of l)c[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(ao(l,c,d.order),a);s(d,_);let m=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(b);let A=n(ao(l,c,b.order),a);s(b,A);let k=await t("ui-order-set",{expected_revision:b.revision,entries:A});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Qn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function co(e,t){return!t||typeof e!="string"||e.length===0||Qn(t.visible_labels).includes(e)?!0:Qn(t.hidden_labels).includes(e)?!1:!Qn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Jn(e,t){return Qn(e).filter(r=>co(r,t))}function mr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var au={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},vi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},yi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},iu={review:"\u2713",skip:"\u2298"},gr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function lu(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function wi(e){let t=e&&e.fill||"none";return t==="none"?gr.none:e&&e.stale===!0?gr.stale:t==="dim"?gr.dim:e&&e.glyph==="review"?gr.review:e&&e.glyph==="skip"?gr.skip:gr.done}function cu(e){if(!e||e.fill==="none"||!e.approval_state)return wi(e);let t=[];return e.glyph==="review"?t.push(gr.review):e.glyph==="skip"&&t.push(gr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function du(e,t,r){let n=au[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=iu[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${d}>${a}</div>
      <div class=${c}>
        ${vi[e]||e}
      </div>
    </div>
  `}function es(e,t){if(!e||!e.stages)return"";let r=yi[e.route]||yi.spec_backed,n=e.stages,s=lu(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${vi[a]||a} ${a==="plan"?cu(n[a]||{}):wi(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>du(a,n[a]||{},a===s))}
    </div>
  `}function uu(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ki=2;function pu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ki).join(", "),s=r.length-ki,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function uo(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ts(e,t){if(!e)return null;let r=uo(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=uo(t?.kind),a=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:l,title:`${c}${d}`}}function $i(e,t){let r=ts(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function fu(e){if(!e)return null;let t=uo(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function _u(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&mr(r,"route")){let l=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":n.route}</span
      >`)}if(n.fast_track&&mr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&mr(r,"pr")){let l=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=$i(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let l=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${l.kind}:${l.actor}@${l.sha}`}
        >${`exec ${l.kind==="delegated"?l.actor:`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let l=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Jn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&mr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),mr(r,"blocked")&&s.push(...pu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&mr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function mu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function gu(e){let t=Lt(e.created_at),r=Lt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${_t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${_t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function bu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ci):r.children;return i`
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
        ${gu(e)}
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
                  <span class=${mu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${ts(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${$i(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${fu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function rs(e,t){let r=uu(e.priority);return i`
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
      ${_u(e,t)}
      ${e.workflow&&mr(t.policy||null,"stepper")?es(e.workflow,e.status):""}
      ${bu(e,t)}
    </article>
  `}function Hr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${Jt.map(o=>i`<option
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
        ${e.items.map(o=>rs(o,t))}
      </div>
    </section>
  `}function xi(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>rs(n,t))}
        </div>
      </div>
    </dialog>
  `}var hu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],yu=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],vu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function wu(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Si(e,t,r){return i`
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
        ${hu.map(n=>i`<option
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
        ${yu.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${wu(e,t,r)}
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
        ${vu.map(n=>i`<option
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
  `}var ku=200,$u={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},xu=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ai="beads-ui.board.sort",Ei=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Su(){try{let e=window.localStorage.getItem(Ai);if(e&&Ei.has(e))return e}catch{}return"created_desc"}function Ti(e,t){let r=st("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,d=t.onClosedRangeChange,_=t.onNewIssue,m=t.closedRange||It,b=s?Kn(s,a):null,A=Xn({transport:o,uiOrderStore:a}),k=[],N=[],F=[],E=[],W=[],J=[],x=!1,w=0,R=Su(),q=new Map,X=new Map,fe=new Map,ae=new Set,ie={search:"",priority:"",type:"",labels:[]},oe=!1,Fe=null;function Ue(z){return String(z.status||"open")==="open"}function He(z){let Z=String(z.status||"open");return Z==="open"||Z==="blocked"}function Ke(z){let Z=ie.search.trim().toLowerCase(),ve=ie.priority,be=ie.type,de=ie.labels;return z.filter(Ne=>{if(Z){let et=String(Ne.id||"").toLowerCase(),Ve=String(Ne.title||"").toLowerCase();if(!et.includes(Z)&&!Ve.includes(Z))return!1}if(ve!==""&&String(Ne.priority)!==ve||be!==""&&String(Ne.issue_type||"")!==be)return!1;if(de.length>0){let et=Array.isArray(Ne.labels)?Ne.labels:[];if(!de.some(Ve=>et.includes(Ve)))return!1}return!0})}function Ge(){let z=new Set;for(let Z of[k,N,F,E,W,J])for(let ve of Z){let be=Array.isArray(ve.labels)?ve.labels:[];for(let de of be)typeof de=="string"&&de.length>0&&z.add(de)}return Array.from(z).sort()}function De(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function he(){try{if(b){let z=b.selectBoardColumn("tab:board:in-progress","in_progress",R),Z=b.selectBoardColumn("tab:board:blocked","blocked",R).filter(He),ve=new Set(z.map(Te=>Te.id)),be=b.selectBoardColumn("tab:board:ready","ready",R).filter(Te=>Ue(Te)&&!ve.has(Te.id)),de=b.selectBoardColumn("tab:board:resolved","resolved",R),Ne=b.selectBoardColumn("tab:board:deferred","deferred",R),et=b.selectBoardColumn("tab:board:closed","closed").slice(0,ku),Ve=[...Z,...be,...z,...de,...et];Pe(Ve);let Me=new Set;for(let Te of Ve)Te&&Te.id&&!po(Te)&&Me.add(Te.id);let Qe=!De();k=Qe?ln(Z,Me):Z,N=Qe?ln(be,Me):be,F=Qe?ln(z,Me):z,E=Qe?ln(de,Me):de,W=Ne,w=Ne.length,J=Qe?ln(et,Me):et,q=new Map;for(let Te of k)q.set(Te.id,"open");for(let Te of N)q.set(Te.id,"open");for(let Te of F)q.set(Te.id,"in_progress");for(let Te of E)q.set(Te.id,"resolved");for(let Te of W)q.set(Te.id,"deferred");for(let Te of J)q.set(Te.id,"closed");X=new Map;for(let Te of k)X.set(Te.id,"blocked-col");for(let Te of N)X.set(Te.id,"ready-col");for(let Te of F)X.set(Te.id,"in-progress-col");for(let Te of E)X.set(Te.id,"resolved-col");for(let Te of J)X.set(Te.id,"closed-col")}Ie()}catch{k=[],N=[],F=[],E=[],W=[],J=[],fe=new Map,Ie()}}function Pe(z){let Z=new Map;for(let be of z)be&&be.id&&!Z.has(be.id)&&Z.set(be.id,be);let ve=new Map;for(let be of Z.values()){let de=po(be);if(!de)continue;let Ne=ve.get(de);Ne||(Ne=[],ve.set(de,Ne)),Ne.push({id:be.id,title:be.title,status:be.status,metadata:be.metadata,workflow:be.workflow,created_at:be.created_at,updated_at:be.updated_at})}fe=ve}function we(z){let Z=fe.get(z)||[],ve=0;for(let de of Z)(de.status==="resolved"||de.status==="closed")&&(ve+=1);let be=Zn(Z);return{total:Z.length,count:ve,current:be,children:Z}}function Ee(z){return!ae.has(z)}function _e(z,Z){z.preventDefault(),z.stopPropagation(),ae.has(Z)?ae.delete(Z):ae.add(Z),Ie()}function re(z,Z){z.preventDefault(),z.stopPropagation(),n(Z)}function G(z,Z){z.preventDefault(),z.stopPropagation(),n(Z)}function $e(z,Z){Fe||n(Z)}function I(z,Z){z.preventDefault(),z.stopPropagation(),Au(Z).then(ve=>{ve&&ce("\uBCF5\uC0AC\uB428","success",1200)})}function S(z,Z){Fe=Z,z.dataTransfer&&(z.dataTransfer.setData("text/plain",Z),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function me(z){z.target.classList.remove("board-card--dragging"),bt(),setTimeout(()=>{Fe=null},0)}function Ae(z){let Z=String(z.target.value||"");!Z||Z===m||(m=Z,d&&d(Z),Ie())}function P(){return l?l.get():null}function H(z){let Z=c?c.get():null,ve=Z?Z.cleanup_failed:null;if(!ve||typeof ve!="object"||Array.isArray(ve))return null;let be=ve[z];return!be||typeof be!="object"||Array.isArray(be)?null:be}let L={onCardClick:$e,onCopyId:I,onDragStart:S,onDragEnd:me,onClosedRangeChange:Ae,rollupFor:we,isExpanded:Ee,onRollupToggle:_e,onChildClick:re,onFromChipClick:G,cleanupFailureFor:H,get policy(){return P()}};function K(z,Z){Fe||($(),n(Z))}function ee(z,Z){z.preventDefault(),z.stopPropagation(),$(),n(Z)}let le={...L,onCardClick:K,onChildClick:ee,onFromChipClick:ee,get policy(){return P()}};function ge(z){let Z=z.target,ve=e.querySelector(".board-filter__labels");Z&&ve&&ve.contains(Z)||B()}function xe(z){z.key==="Escape"&&B()}function T(){oe||(oe=!0,document.addEventListener("mousedown",ge),document.addEventListener("keydown",xe),Ie())}function B(){oe&&(oe=!1,document.removeEventListener("mousedown",ge),document.removeEventListener("keydown",xe),Ie())}function Q(z){z.key==="Escape"&&$()}function Y(){x||(x=!0,document.addEventListener("keydown",Q),Ie())}function $(){x&&(x=!1,document.removeEventListener("keydown",Q),Ie())}let M={onClose:$,onOverlayClick(z){z.target===z.currentTarget&&$()}},V={onSearchInput(z){ie.search=String(z.target.value||""),he()},onPriorityChange(z){ie.priority=String(z.target.value||""),he()},onTypeChange(z){ie.type=String(z.target.value||""),he()},onSortChange(z){let Z=String(z.target.value||"");if(!(!Ei.has(Z)||Z===R)){R=Z;try{window.localStorage.setItem(Ai,Z)}catch{}he()}},onDeferredToggle(){x?$():Y()},onLabelMenuToggle(){oe?B():T()},onLabelToggle(z){let Z=ie.labels.indexOf(z);Z===-1?ie.labels.push(z):ie.labels.splice(Z,1),he()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],he())},onNewIssue(){_&&_()}};function Le(){return i`
      <div class="board-view">
        ${Si(ie,V,{sort_mode:R,deferred_popup_open:x,deferred_count:w,label_options:Ge(),label_menu_open:oe})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:Ke(k)},L)}
          ${Hr({title:"Ready",id:"ready-col",items:Ke(N)},L)}
          ${Hr({title:"In progress",id:"in-progress-col",items:Ke(F)},L)}
          ${Hr({title:"Resolved",id:"resolved-col",items:Ke(E)},L)}
          ${Hr({title:"Closed",id:"closed-col",items:Ke(J),is_closed:!0,closed_range:m},L)}
        </div>
        ${x?xi({items:Ke(W),count:w},le,M):""}
      </div>
    `}function Ie(){je(Le(),e),qe()}function qe(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let Z=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ve of Z)Array.from(ve.querySelectorAll(".board-card")).forEach((de,Ne)=>{de.tabIndex=Ne===0?0:-1})}catch{}}async function Re(z,Z){if(!o){ce("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:Z}),ce("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ve){r("update-status failed: %o",ve),ce("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ze(z){switch(z){case"blocked-col":return k;case"ready-col":return N;case"in-progress-col":return F;case"resolved-col":return E;default:return[]}}function gt(z,Z,ve){if(!o||!a)return;let be=Ze(z),de=be.find(Qe=>Qe.id===Z);if(!de)return;let Ne=be.filter(Qe=>Qe.id!==Z),et=ve.closest?ve.closest(".board-card"):null,Ve=Ne.length;if(et){let Qe=et.getAttribute("data-issue-id");if(Qe===Z)return;let Te=Ne.findIndex(pt=>pt.id===Qe);Te>=0&&(Ve=Te)}let Me=Ne.slice();Me.splice(Ve,0,de),A.applyReorder(Z,Me,Ve)}function bt(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let it=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let ve=z.target.closest(".board-column");ve&&ve!==it&&(it&&it.classList.remove("board-column--drag-over"),ve.classList.add("board-column--drag-over"),it=ve)}),e.addEventListener("dragleave",z=>{let Z=z.relatedTarget;(!Z||!e.contains(Z))&&it&&(it.classList.remove("board-column--drag-over"),it=null)}),e.addEventListener("drop",z=>{z.preventDefault(),it&&(it.classList.remove("board-column--drag-over"),it=null);let Z=z.target,ve=Z.closest(".board-column");if(!ve)return;let be=z.dataTransfer?.getData("text/plain")||"";if(!be)return;let de=ve.id,Ne=X.get(be);if(Ne&&Ne===de){if(xu.has(de)){if(R!=="manual"){ce("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}gt(de,be,Z)}return}let et=$u[de];if(!et){ce("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}q.get(be)!==et&&Re(be,et)}),e.addEventListener("keydown",z=>{let Z=z.target;if(!(Z instanceof HTMLElement))return;let ve=String(Z.tagName||"").toLowerCase();if(ve==="input"||ve==="textarea"||ve==="select"||ve==="button"||ve==="a"||Z.isContentEditable===!0)return;let be=Z.closest(".board-card");if(!be)return;let de=String(z.key||"");if(de==="Enter"||de===" "){z.preventDefault();let Me=be.getAttribute("data-issue-id");Me&&n(Me);return}if(de!=="ArrowUp"&&de!=="ArrowDown"&&de!=="ArrowLeft"&&de!=="ArrowRight")return;z.preventDefault();let Ne=be.closest(".board-column");if(!Ne)return;let et=Array.from(Ne.querySelectorAll(".board-card")),Ve=et.indexOf(be);if(de==="ArrowDown"&&Ve<et.length-1){kt(be,et[Ve+1]);return}if(de==="ArrowUp"&&Ve>0){kt(be,et[Ve-1]);return}if(de==="ArrowLeft"||de==="ArrowRight"){let Me=Array.from(e.querySelectorAll(".board-column")),Qe=Me.indexOf(Ne),Te=de==="ArrowRight"?1:-1,pt=Qe+Te;for(;pt>=0&&pt<Me.length;){let Et=Me[pt].querySelector(".board-card");if(Et){kt(be,Et);return}pt+=Te}}});function kt(z,Z){try{z.tabIndex=-1,Z.tabIndex=0,Z.focus()}catch{}}let ot=null;b&&b.subscribe&&(ot=b.subscribe(()=>{try{he()}catch{}}));let nt=null;l&&l.subscribe&&(nt=l.subscribe(()=>{try{he()}catch{}}));let ut=null;return c&&c.subscribe&&(ut=c.subscribe(()=>{Ie()})),{async load(){r("load"),he()},clear(){B(),$(),ot&&(ot(),ot=null),nt&&(nt(),nt=null),ut&&(ut(),ut=null),e.replaceChildren(),k=[],N=[],F=[],E=[],W=[],J=[],q=new Map,X=new Map}}}function po(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ln(e,t){return e.filter(r=>{let n=po(r);return!(n&&t.has(n))})}async function Au(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function or(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function er(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function br(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Eu(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${er(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${er(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let d=_=>{typeof r.close=="function"&&r.close(),r.remove(),c(_)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function ar(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Eu(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}function Gr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(l=>{let c=!1,d=m=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),l(m))},_=()=>d(n.value.trim());o.addEventListener("click",_),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),_())}),t.addEventListener("cancel",m=>{m.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var Oi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function mt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var ir=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],cn=[...ir,"reasoning_output_tokens"],Tu=["implementation","review-consult"];function fo(e){let t=0;for(let r of ir)t+=mt(e?.[r]);return t}function Cu(e){return!e||typeof e!="object"?!1:ir.some(t=>Number.isFinite(e[t]))}function Ci(e){return!e||typeof e!="object"?!1:cn.some(t=>Number.isFinite(e[t]))}function Ru(e){let t={};for(let r of cn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ri(e){let t={};for(let r of cn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ii(e,t){return e==="codex"?mt(t.input_tokens)+mt(t.output_tokens):fo(t)}function Iu(e){return e==="claude"?"Claude":"Codex"}function Lu(e){return`\u03C4 ${Pi(e)}`}function Ou(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${mt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${mt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${mt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${mt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${mt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${mt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${mt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Oi),o.join(`
`)}function wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Iu(r)} ${Lu(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ou(r,n)})}return t}function ss(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of cn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=mt(l.breakdown[c])+mt(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function _o(e){return!e||typeof e!="object"?null:Dt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Pu(e){return e==="codex"?"codex":"claude"}function hr(){return{subtotal:0,breakdown:Ru(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ns(e,t,r){e.subtotal+=t.subtotal;for(let n of cn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=mt(e.breakdown[n])+mt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Li(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Pi(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Vr(e){return Cu(e)?`\u03C4 ${Pi(fo(e))}`:null}function zt(e){let t=Vr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Yr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${mt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${mt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${mt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${mt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${fo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Oi),r.join(`
`)}function Dt(e,t){let r={claude:hr(),codex:hr()},n={orchestrator:{claude:hr(),codex:hr()},implementation:{claude:hr(),codex:hr()},"review-consult":{claude:hr(),codex:hr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Ci(c)){let _=Pu(l.runner),m=Ri(c),b={provider:_,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:Ii(_,m)};m.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),ns(r[_],b,!0),ns(n.orchestrator[_],b,!0)}let d=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let _ of d){if(!_||_.provider!=="codex"||!Tu.includes(_.role)||!Ci(_.usage))continue;let m=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let b=Ri(_.usage),A={provider:"codex",role:_.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:Ii("codex",b)};A.receipt_id=m,typeof _.model=="string"&&(A.model=_.model),typeof _.session_id=="string"?A.session_id=_.session_id:typeof _.thread_id=="string"&&(A.session_id=_.thread_id),typeof _.turn_id=="string"&&(A.turn_id=_.turn_id),typeof _.completed_at=="string"&&(A.completed_at=_.completed_at),b.replayed===!0&&(A.replayed=!0),ns(r.codex,A,!1),ns(n[A.role].codex,A,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let d=Li(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(d.total_cost_usd=c.outer_cost),o[l]=d}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let d of["claude","codex"]){let _=n[l][d];_.legs.length>0&&(c[d]={...Li(_,!0),legs:_.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Wi,setPrototypeOf:Mi,isFrozen:Mu,getPrototypeOf:Du,getOwnPropertyDescriptor:Nu}=Object,{freeze:xt,seal:Nt,create:wo}=Object,{apply:ko,construct:$o}=typeof Reflect<"u"&&Reflect;xt||(xt=function(t){return t});Nt||(Nt=function(t){return t});ko||(ko=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});$o||($o=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var os=St(Array.prototype.forEach),qu=St(Array.prototype.lastIndexOf),Di=St(Array.prototype.pop),dn=St(Array.prototype.push),Fu=St(Array.prototype.splice),is=St(String.prototype.toLowerCase),mo=St(String.prototype.toString),go=St(String.prototype.match),un=St(String.prototype.replace),Bu=St(String.prototype.indexOf),ju=St(String.prototype.trim),Ht=St(Object.prototype.hasOwnProperty),$t=St(RegExp.prototype.test),pn=Uu(TypeError);function St(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ko(e,t,n)}}function Uu(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return $o(e,r)}}function We(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:is;Mi&&Mi(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Mu(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Wu(e){for(let t=0;t<e.length;t++)Ht(e,t)||(e[t]=null);return e}function lr(e){let t=wo(null);for(let[r,n]of Wi(e))Ht(e,r)&&(Array.isArray(n)?t[r]=Wu(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=lr(n):t[r]=n);return t}function fn(e,t){for(;e!==null;){let n=Nu(e,t);if(n){if(n.get)return St(n.get);if(typeof n.value=="function")return St(n.value)}e=Du(e)}function r(){return null}return r}var Ni=xt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),bo=xt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ho=xt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zu=xt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),yo=xt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hu=xt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),qi=xt(["#text"]),Fi=xt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),vo=xt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Bi=xt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),as=xt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Gu=Nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Vu=Nt(/<%[\w\W]*|[\w\W]*%>/gm),Yu=Nt(/\$\{[\w\W]*/gm),Ku=Nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zu=Nt(/^aria-[\-\w]+$/),zi=Nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Xu=Nt(/^(?:\w+script|data):/i),Qu=Nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Hi=Nt(/^html$/i),Ju=Nt(/^[a-z][.\w]*(-[.\w]+)+$/i),ji=Object.freeze({__proto__:null,ARIA_ATTR:Zu,ATTR_WHITESPACE:Qu,CUSTOM_ELEMENT:Ju,DATA_ATTR:Ku,DOCTYPE_NAME:Hi,ERB_EXPR:Vu,IS_ALLOWED_URI:zi,IS_SCRIPT_OR_DATA:Xu,MUSTACHE_EXPR:Gu,TMPLIT_EXPR:Yu}),_n={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ep=function(){return typeof window>"u"?null:window},tp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ui=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Gi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ep(),t=U=>Gi(U);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==_n.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:A}=e,k=c.prototype,N=fn(k,"cloneNode"),F=fn(k,"remove"),E=fn(k,"nextSibling"),W=fn(k,"childNodes"),J=fn(k,"parentNode");if(typeof a=="function"){let U=r.createElement("template");U.content&&U.content.ownerDocument&&(r=U.content.ownerDocument)}let x,w="",{implementation:R,createNodeIterator:q,createDocumentFragment:X,getElementsByTagName:fe}=r,{importNode:ae}=n,ie=Ui();t.isSupported=typeof Wi=="function"&&typeof J=="function"&&R&&R.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:oe,ERB_EXPR:Fe,TMPLIT_EXPR:Ue,DATA_ATTR:He,ARIA_ATTR:Ke,IS_SCRIPT_OR_DATA:Ge,ATTR_WHITESPACE:De,CUSTOM_ELEMENT:he}=ji,{IS_ALLOWED_URI:Pe}=ji,we=null,Ee=We({},[...Ni,...bo,...ho,...yo,...qi]),_e=null,re=We({},[...Fi,...vo,...Bi,...as]),G=Object.seal(wo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$e=null,I=null,S=Object.seal(wo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),me=!0,Ae=!0,P=!1,H=!0,L=!1,K=!0,ee=!1,le=!1,ge=!1,xe=!1,T=!1,B=!1,Q=!0,Y=!1,$="user-content-",M=!0,V=!1,Le={},Ie=null,qe=We({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Re=null,Ze=We({},["audio","video","img","source","image","track"]),gt=null,bt=We({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),it="http://www.w3.org/1998/Math/MathML",kt="http://www.w3.org/2000/svg",ot="http://www.w3.org/1999/xhtml",nt=ot,ut=!1,z=null,Z=We({},[it,kt,ot],mo),ve=We({},["mi","mo","mn","ms","mtext"]),be=We({},["annotation-xml"]),de=We({},["title","style","font","a","script"]),Ne=null,et=["application/xhtml+xml","text/html"],Ve="text/html",Me=null,Qe=null,Te=r.createElement("form"),pt=function(h){return h instanceof RegExp||h instanceof Function},Et=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Qe&&Qe===h)){if((!h||typeof h!="object")&&(h={}),h=lr(h),Ne=et.indexOf(h.PARSER_MEDIA_TYPE)===-1?Ve:h.PARSER_MEDIA_TYPE,Me=Ne==="application/xhtml+xml"?mo:is,we=Ht(h,"ALLOWED_TAGS")?We({},h.ALLOWED_TAGS,Me):Ee,_e=Ht(h,"ALLOWED_ATTR")?We({},h.ALLOWED_ATTR,Me):re,z=Ht(h,"ALLOWED_NAMESPACES")?We({},h.ALLOWED_NAMESPACES,mo):Z,gt=Ht(h,"ADD_URI_SAFE_ATTR")?We(lr(bt),h.ADD_URI_SAFE_ATTR,Me):bt,Re=Ht(h,"ADD_DATA_URI_TAGS")?We(lr(Ze),h.ADD_DATA_URI_TAGS,Me):Ze,Ie=Ht(h,"FORBID_CONTENTS")?We({},h.FORBID_CONTENTS,Me):qe,$e=Ht(h,"FORBID_TAGS")?We({},h.FORBID_TAGS,Me):lr({}),I=Ht(h,"FORBID_ATTR")?We({},h.FORBID_ATTR,Me):lr({}),Le=Ht(h,"USE_PROFILES")?h.USE_PROFILES:!1,me=h.ALLOW_ARIA_ATTR!==!1,Ae=h.ALLOW_DATA_ATTR!==!1,P=h.ALLOW_UNKNOWN_PROTOCOLS||!1,H=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,L=h.SAFE_FOR_TEMPLATES||!1,K=h.SAFE_FOR_XML!==!1,ee=h.WHOLE_DOCUMENT||!1,xe=h.RETURN_DOM||!1,T=h.RETURN_DOM_FRAGMENT||!1,B=h.RETURN_TRUSTED_TYPE||!1,ge=h.FORCE_BODY||!1,Q=h.SANITIZE_DOM!==!1,Y=h.SANITIZE_NAMED_PROPS||!1,M=h.KEEP_CONTENT!==!1,V=h.IN_PLACE||!1,Pe=h.ALLOWED_URI_REGEXP||zi,nt=h.NAMESPACE||ot,ve=h.MATHML_TEXT_INTEGRATION_POINTS||ve,be=h.HTML_INTEGRATION_POINTS||be,G=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&pt(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(G.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&pt(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(G.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(G.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),L&&(Ae=!1),T&&(xe=!0),Le&&(we=We({},qi),_e=[],Le.html===!0&&(We(we,Ni),We(_e,Fi)),Le.svg===!0&&(We(we,bo),We(_e,vo),We(_e,as)),Le.svgFilters===!0&&(We(we,ho),We(_e,vo),We(_e,as)),Le.mathMl===!0&&(We(we,yo),We(_e,Bi),We(_e,as))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?S.tagCheck=h.ADD_TAGS:(we===Ee&&(we=lr(we)),We(we,h.ADD_TAGS,Me))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?S.attributeCheck=h.ADD_ATTR:(_e===re&&(_e=lr(_e)),We(_e,h.ADD_ATTR,Me))),h.ADD_URI_SAFE_ATTR&&We(gt,h.ADD_URI_SAFE_ATTR,Me),h.FORBID_CONTENTS&&(Ie===qe&&(Ie=lr(Ie)),We(Ie,h.FORBID_CONTENTS,Me)),M&&(we["#text"]=!0),ee&&We(we,["html","head","body"]),we.table&&(We(we,["tbody"]),delete $e.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw pn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw pn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=h.TRUSTED_TYPES_POLICY,w=x.createHTML("")}else x===void 0&&(x=tp(A,s)),x!==null&&typeof w=="string"&&(w=x.createHTML(""));xt&&xt(h),Qe=h}},Ot=We({},[...bo,...ho,...zu]),Ft=We({},[...yo,...Hu]),$r=function(h){let O=J(h);(!O||!O.tagName)&&(O={namespaceURI:nt,tagName:"template"});let ne=is(h.tagName),Ce=is(O.tagName);return z[h.namespaceURI]?h.namespaceURI===kt?O.namespaceURI===ot?ne==="svg":O.namespaceURI===it?ne==="svg"&&(Ce==="annotation-xml"||ve[Ce]):!!Ot[ne]:h.namespaceURI===it?O.namespaceURI===ot?ne==="math":O.namespaceURI===kt?ne==="math"&&be[Ce]:!!Ft[ne]:h.namespaceURI===ot?O.namespaceURI===kt&&!be[Ce]||O.namespaceURI===it&&!ve[Ce]?!1:!Ft[ne]&&(de[ne]||!Ot[ne]):!!(Ne==="application/xhtml+xml"&&z[h.namespaceURI]):!1},ht=function(h){dn(t.removed,{element:h});try{J(h).removeChild(h)}catch{F(h)}},yt=function(h,O){try{dn(t.removed,{attribute:O.getAttributeNode(h),from:O})}catch{dn(t.removed,{attribute:null,from:O})}if(O.removeAttribute(h),h==="is")if(xe||T)try{ht(O)}catch{}else try{O.setAttribute(h,"")}catch{}},rr=function(h){let O=null,ne=null;if(ge)h="<remove></remove>"+h;else{let Be=go(h,/^[\r\n\t ]+/);ne=Be&&Be[0]}Ne==="application/xhtml+xml"&&nt===ot&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let Ce=x?x.createHTML(h):h;if(nt===ot)try{O=new b().parseFromString(Ce,Ne)}catch{}if(!O||!O.documentElement){O=R.createDocument(nt,"template",null);try{O.documentElement.innerHTML=ut?w:Ce}catch{}}let Je=O.body||O.documentElement;return h&&ne&&Je.insertBefore(r.createTextNode(ne),Je.childNodes[0]||null),nt===ot?fe.call(O,ee?"html":"body")[0]:ee?O.documentElement:Je},nr=function(h){return q.call(h.ownerDocument||h,h,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Bt=function(h){return h instanceof m&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof _)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},jt=function(h){return typeof l=="function"&&h instanceof l};function vt(U,h,O){os(U,ne=>{ne.call(t,h,O,Qe)})}let Xt=function(h){let O=null;if(vt(ie.beforeSanitizeElements,h,null),Bt(h))return ht(h),!0;let ne=Me(h.nodeName);if(vt(ie.uponSanitizeElement,h,{tagName:ne,allowedTags:we}),K&&h.hasChildNodes()&&!jt(h.firstElementChild)&&$t(/<[/\w!]/g,h.innerHTML)&&$t(/<[/\w!]/g,h.textContent)||h.nodeType===_n.progressingInstruction||K&&h.nodeType===_n.comment&&$t(/<[/\w]/g,h.data))return ht(h),!0;if(!(S.tagCheck instanceof Function&&S.tagCheck(ne))&&(!we[ne]||$e[ne])){if(!$e[ne]&&y(ne)&&(G.tagNameCheck instanceof RegExp&&$t(G.tagNameCheck,ne)||G.tagNameCheck instanceof Function&&G.tagNameCheck(ne)))return!1;if(M&&!Ie[ne]){let Ce=J(h)||h.parentNode,Je=W(h)||h.childNodes;if(Je&&Ce){let Be=Je.length;for(let ye=Be-1;ye>=0;--ye){let v=N(Je[ye],!0);v.__removalCount=(h.__removalCount||0)+1,Ce.insertBefore(v,E(h))}}}return ht(h),!0}return h instanceof c&&!$r(h)||(ne==="noscript"||ne==="noembed"||ne==="noframes")&&$t(/<\/no(script|embed|frames)/i,h.innerHTML)?(ht(h),!0):(L&&h.nodeType===_n.text&&(O=h.textContent,os([oe,Fe,Ue],Ce=>{O=un(O,Ce," ")}),h.textContent!==O&&(dn(t.removed,{element:h.cloneNode()}),h.textContent=O)),vt(ie.afterSanitizeElements,h,null),!1)},u=function(h,O,ne){if(Q&&(O==="id"||O==="name")&&(ne in r||ne in Te))return!1;if(!(Ae&&!I[O]&&$t(He,O))){if(!(me&&$t(Ke,O))){if(!(S.attributeCheck instanceof Function&&S.attributeCheck(O,h))){if(!_e[O]||I[O]){if(!(y(h)&&(G.tagNameCheck instanceof RegExp&&$t(G.tagNameCheck,h)||G.tagNameCheck instanceof Function&&G.tagNameCheck(h))&&(G.attributeNameCheck instanceof RegExp&&$t(G.attributeNameCheck,O)||G.attributeNameCheck instanceof Function&&G.attributeNameCheck(O,h))||O==="is"&&G.allowCustomizedBuiltInElements&&(G.tagNameCheck instanceof RegExp&&$t(G.tagNameCheck,ne)||G.tagNameCheck instanceof Function&&G.tagNameCheck(ne))))return!1}else if(!gt[O]){if(!$t(Pe,un(ne,De,""))){if(!((O==="src"||O==="xlink:href"||O==="href")&&h!=="script"&&Bu(ne,"data:")===0&&Re[h])){if(!(P&&!$t(Ge,un(ne,De,"")))){if(ne)return!1}}}}}}}return!0},y=function(h){return h!=="annotation-xml"&&go(h,he)},j=function(h){vt(ie.beforeSanitizeAttributes,h,null);let{attributes:O}=h;if(!O||Bt(h))return;let ne={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0},Ce=O.length;for(;Ce--;){let Je=O[Ce],{name:Be,namespaceURI:ye,value:v}=Je,f=Me(Be),p=v,C=Be==="value"?p:ju(p);if(ne.attrName=f,ne.attrValue=C,ne.keepAttr=!0,ne.forceKeepAttr=void 0,vt(ie.uponSanitizeAttribute,h,ne),C=ne.attrValue,Y&&(f==="id"||f==="name")&&(yt(Be,h),C=$+C),K&&$t(/((--!?|])>)|<\/(style|title|textarea)/i,C)){yt(Be,h);continue}if(f==="attributename"&&go(C,"href")){yt(Be,h);continue}if(ne.forceKeepAttr)continue;if(!ne.keepAttr){yt(Be,h);continue}if(!H&&$t(/\/>/i,C)){yt(Be,h);continue}L&&os([oe,Fe,Ue],pe=>{C=un(C,pe," ")});let se=Me(h.nodeName);if(!u(se,f,C)){yt(Be,h);continue}if(x&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!ye)switch(A.getAttributeType(se,f)){case"TrustedHTML":{C=x.createHTML(C);break}case"TrustedScriptURL":{C=x.createScriptURL(C);break}}if(C!==p)try{ye?h.setAttributeNS(ye,Be,C):h.setAttribute(Be,C),Bt(h)?ht(h):Di(t.removed)}catch{yt(Be,h)}}vt(ie.afterSanitizeAttributes,h,null)},te=function U(h){let O=null,ne=nr(h);for(vt(ie.beforeSanitizeShadowDOM,h,null);O=ne.nextNode();)vt(ie.uponSanitizeShadowNode,O,null),Xt(O),j(O),O.content instanceof o&&U(O.content);vt(ie.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(U){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},O=null,ne=null,Ce=null,Je=null;if(ut=!U,ut&&(U="<!-->"),typeof U!="string"&&!jt(U))if(typeof U.toString=="function"){if(U=U.toString(),typeof U!="string")throw pn("dirty is not a string, aborting")}else throw pn("toString is not a function");if(!t.isSupported)return U;if(le||Et(h),t.removed=[],typeof U=="string"&&(V=!1),V){if(U.nodeName){let v=Me(U.nodeName);if(!we[v]||$e[v])throw pn("root node is forbidden and cannot be sanitized in-place")}}else if(U instanceof l)O=rr("<!---->"),ne=O.ownerDocument.importNode(U,!0),ne.nodeType===_n.element&&ne.nodeName==="BODY"||ne.nodeName==="HTML"?O=ne:O.appendChild(ne);else{if(!xe&&!L&&!ee&&U.indexOf("<")===-1)return x&&B?x.createHTML(U):U;if(O=rr(U),!O)return xe?null:B?w:""}O&&ge&&ht(O.firstChild);let Be=nr(V?U:O);for(;Ce=Be.nextNode();)Xt(Ce),j(Ce),Ce.content instanceof o&&te(Ce.content);if(V)return U;if(xe){if(T)for(Je=X.call(O.ownerDocument);O.firstChild;)Je.appendChild(O.firstChild);else Je=O;return(_e.shadowroot||_e.shadowrootmode)&&(Je=ae.call(n,Je,!0)),Je}let ye=ee?O.outerHTML:O.innerHTML;return ee&&we["!doctype"]&&O.ownerDocument&&O.ownerDocument.doctype&&O.ownerDocument.doctype.name&&$t(Hi,O.ownerDocument.doctype.name)&&(ye="<!DOCTYPE "+O.ownerDocument.doctype.name+`>
`+ye),L&&os([oe,Fe,Ue],v=>{ye=un(ye,v," ")}),x&&B?x.createHTML(ye):ye},t.setConfig=function(){let U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Et(U),le=!0},t.clearConfig=function(){Qe=null,le=!1},t.isValidAttribute=function(U,h,O){Qe||Et({});let ne=Me(U),Ce=Me(h);return u(ne,Ce,O)},t.addHook=function(U,h){typeof h=="function"&&dn(ie[U],h)},t.removeHook=function(U,h){if(h!==void 0){let O=qu(ie[U],h);return O===-1?void 0:Fu(ie[U],O,1)[0]}return Di(ie[U])},t.removeHooks=function(U){ie[U]=[]},t.removeAllHooks=function(){ie=Ui()},t}var Vi=Gi();var cr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ls=e=>(...t)=>({_$litDirective$:e,values:t}),Kr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var mn=class extends Kr{constructor(t){if(super(t),this.it=at,t.type!==cr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===at||t==null)return this._t=void 0,this.it=t;if(t===Pt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};mn.directiveName="unsafeHTML",mn.resultType=1;var Yi=ls(mn);function Eo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Pr=Eo();function tl(e){Pr=e}var yn={exec:()=>null};function Ye(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(At.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var rp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),At={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},np=/^(?:[ \t]*(?:\n|$))+/,sp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,op=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,vn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ap=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,To=/(?:[*+-]|\d{1,9}[.)])/,rl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,nl=Ye(rl).replace(/bull/g,To).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ip=Ye(rl).replace(/bull/g,To).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Co=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,lp=/^[^\n]+/,Ro=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,cp=Ye(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ro).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),dp=Ye(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,To).getRegex(),_s="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Io=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,up=Ye("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Io).replace("tag",_s).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),sl=Ye(Co).replace("hr",vn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_s).getRegex(),pp=Ye(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",sl).getRegex(),Lo={blockquote:pp,code:sp,def:cp,fences:op,heading:ap,hr:vn,html:up,lheading:nl,list:dp,newline:np,paragraph:sl,table:yn,text:lp},Ki=Ye("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",vn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_s).getRegex(),fp={...Lo,lheading:ip,table:Ki,paragraph:Ye(Co).replace("hr",vn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ki).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_s).getRegex()},_p={...Lo,html:Ye(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Io).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:yn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ye(Co).replace("hr",vn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",nl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,gp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ol=/^( {2,}|\\)\n(?!\s*$)/,bp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ms=/[\p{P}\p{S}]/u,Oo=/[\s\p{P}\p{S}]/u,al=/[^\s\p{P}\p{S}]/u,hp=Ye(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Oo).getRegex(),il=/(?!~)[\p{P}\p{S}]/u,yp=/(?!~)[\s\p{P}\p{S}]/u,vp=/(?:[^\s\p{P}\p{S}]|~)/u,wp=Ye(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",rp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ll=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,kp=Ye(ll,"u").replace(/punct/g,ms).getRegex(),$p=Ye(ll,"u").replace(/punct/g,il).getRegex(),cl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",xp=Ye(cl,"gu").replace(/notPunctSpace/g,al).replace(/punctSpace/g,Oo).replace(/punct/g,ms).getRegex(),Sp=Ye(cl,"gu").replace(/notPunctSpace/g,vp).replace(/punctSpace/g,yp).replace(/punct/g,il).getRegex(),Ap=Ye("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,al).replace(/punctSpace/g,Oo).replace(/punct/g,ms).getRegex(),Ep=Ye(/\\(punct)/,"gu").replace(/punct/g,ms).getRegex(),Tp=Ye(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Cp=Ye(Io).replace("(?:-->|$)","-->").getRegex(),Rp=Ye("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Cp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),us=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ip=Ye(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",us).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),dl=Ye(/^!?\[(label)\]\[(ref)\]/).replace("label",us).replace("ref",Ro).getRegex(),ul=Ye(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ro).getRegex(),Lp=Ye("reflink|nolink(?!\\()","g").replace("reflink",dl).replace("nolink",ul).getRegex(),Zi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Po={_backpedal:yn,anyPunctuation:Ep,autolink:Tp,blockSkip:wp,br:ol,code:gp,del:yn,emStrongLDelim:kp,emStrongRDelimAst:xp,emStrongRDelimUnd:Ap,escape:mp,link:Ip,nolink:ul,punctuation:hp,reflink:dl,reflinkSearch:Lp,tag:Rp,text:bp,url:yn},Op={...Po,link:Ye(/^!?\[(label)\]\((.*?)\)/).replace("label",us).getRegex(),reflink:Ye(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",us).getRegex()},xo={...Po,emStrongRDelimAst:Sp,emStrongLDelim:$p,url:Ye(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Zi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ye(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Zi).getRegex()},Pp={...xo,br:Ye(ol).replace("{2,}","*").getRegex(),text:Ye(xo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},cs={normal:Lo,gfm:fp,pedantic:_p},gn={normal:Po,gfm:xo,breaks:Pp,pedantic:Op},Mp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Xi=e=>Mp[e];function dr(e,t){if(t){if(At.escapeTest.test(e))return e.replace(At.escapeReplace,Xi)}else if(At.escapeTestNoEncode.test(e))return e.replace(At.escapeReplaceNoEncode,Xi);return e}function Qi(e){try{e=encodeURI(e).replace(At.percentDecode,"%")}catch{return null}return e}function Ji(e,t){let r=e.replace(At.findPipe,(o,a,l)=>{let c=!1,d=a;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),n=r.split(At.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(At.slashPipe,"|");return n}function bn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Dp(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function el(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function Np(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var ps=class{constructor(e){tt(this,"options");tt(this,"rules");tt(this,"lexer");this.options=e||Pr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:bn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Np(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=bn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:bn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=bn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let d=l.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=m,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let A=b,k=A.raw+`
`+r.join(`
`),N=this.blockquote(k);o[o.length-1]=N,n=n.substring(0,n.length-A.raw.length)+N.raw,s=s.substring(0,s.length-A.text.length)+N.text;break}else if(b?.type==="list"){let A=b,k=A.raw+`
`+r.join(`
`),N=this.list(k);o[o.length-1]=N,n=n.substring(0,n.length-b.raw.length)+N.raw,s=s.substring(0,s.length-A.raw.length)+N.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),b=e.split(`
`,1)[0],A=!m.trim(),k=0;if(this.options.pedantic?(k=2,_=m.trimStart()):A?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,_=m.slice(k),k+=t[1].length),A&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let N=this.rules.other.nextBulletRegex(k),F=this.rules.other.hrRegex(k),E=this.rules.other.fencesBeginRegex(k),W=this.rules.other.headingBeginRegex(k),J=this.rules.other.htmlBeginRegex(k);for(;e;){let x=e.split(`
`,1)[0],w;if(b=x,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),w=b):w=b.replace(this.rules.other.tabCharGlobal,"    "),E.test(b)||W.test(b)||J.test(b)||N.test(b)||F.test(b))break;if(w.search(this.rules.other.nonSpaceChar)>=k||!b.trim())_+=`
`+w.slice(k);else{if(A||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||E.test(m)||W.test(m)||F.test(m))break;_+=`
`+b}!A&&!b.trim()&&(A=!0),d+=x+`
`,e=e.substring(x.length+1),m=w.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(c.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};c.checked=_.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=_.raw+c.tokens[0].raw,c.tokens[0].text=_.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(_)):c.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):c.tokens.unshift(_)}}if(!s.loose){let d=c.tokens.filter(m=>m.type==="space"),_=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=_}}if(s.loose)for(let c of s.items){c.loose=!0;for(let d of c.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ji(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ji(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=bn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Dp(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),el(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return el(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let _=[...n[0]][0].length,m=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let A=m.slice(1,-1);return{type:"em",raw:m,text:A,tokens:this.lexer.inlineTokens(A)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Gt=class So{constructor(t){tt(this,"tokens");tt(this,"options");tt(this,"state");tt(this,"inlineQueue");tt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Pr,this.options.tokenizer=this.options.tokenizer||new ps,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:At,block:cs.normal,inline:gn.normal};this.options.pedantic?(r.block=cs.pedantic,r.inline=gn.pedantic):this.options.gfm&&(r.block=cs.gfm,this.options.breaks?r.inline=gn.breaks:r.inline=gn.gfm),this.tokenizer.rules=r}static get rules(){return{block:cs,inline:gn}}static lex(t,r){return new So(r).lex(t)}static lexInline(t,r){return new So(r).inlineTokens(t)}lex(t){t=t.replace(At.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(At.tabCharGlobal,"    ").replace(At.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(_=>(c=_.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let _=r.at(-1);c.type==="text"&&_?.type==="text"?(_.raw+=c.raw,_.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,m=t.slice(1),b;this.options.extensions.startInline.forEach(A=>{b=A.call({lexer:this},m),typeof b=="number"&&b>=0&&(_=Math.min(_,b))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(c=this.tokenizer.inlineText(d)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=c.raw,_.text+=c.text):r.push(c);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},fs=class{constructor(e){tt(this,"options");tt(this,"parser");this.options=e||Pr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(At.notSpaceStart)?.[0],s=e.replace(At.endingNewline,"")+`
`;return n?'<pre><code class="language-'+dr(n)+'">'+(r?s:dr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:dr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${dr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Qi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+dr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Qi(e);if(s===null)return dr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${dr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:dr(e.text)}},Mo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Vt=class Ao{constructor(t){tt(this,"options");tt(this,"renderer");tt(this,"textRenderer");this.options=t||Pr,this.options.renderer=this.options.renderer||new fs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Mo}static parse(t,r){return new Ao(r).parse(t)}static parseInline(t,r){return new Ao(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},ds,hn=(ds=class{constructor(e){tt(this,"options");tt(this,"block");this.options=e||Pr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Gt.lex:Gt.lexInline}provideParser(){return this.block?Vt.parse:Vt.parseInline}},tt(ds,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),tt(ds,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ds),qp=class{constructor(...e){tt(this,"defaults",Eo());tt(this,"options",this.setOptions);tt(this,"parse",this.parseMarkdown(!0));tt(this,"parseInline",this.parseMarkdown(!1));tt(this,"Parser",Vt);tt(this,"Renderer",fs);tt(this,"TextRenderer",Mo);tt(this,"Lexer",Gt);tt(this,"Tokenizer",ps);tt(this,"Hooks",hn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new fs(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...d)=>{let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new ps(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...d)=>{let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new hn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];hn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&hn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,d);return c.call(s,m)})();let _=l.call(s,d);return c.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,d);return m===!1&&(m=await c.apply(s,d)),m})();let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Gt.lex(e,t??this.defaults)}parser(e,t){return Vt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+dr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Or=new qp;function Xe(e,t){return Or.parse(e,t)}Xe.options=Xe.setOptions=function(e){return Or.setOptions(e),Xe.defaults=Or.defaults,tl(Xe.defaults),Xe};Xe.getDefaults=Eo;Xe.defaults=Pr;Xe.use=function(...e){return Or.use(...e),Xe.defaults=Or.defaults,tl(Xe.defaults),Xe};Xe.walkTokens=function(e,t){return Or.walkTokens(e,t)};Xe.parseInline=Or.parseInline;Xe.Parser=Vt;Xe.parser=Vt.parse;Xe.Renderer=fs;Xe.TextRenderer=Mo;Xe.Lexer=Gt;Xe.lexer=Gt.lex;Xe.Tokenizer=ps;Xe.Hooks=hn;Xe.parse=Xe;var Ug=Xe.options,Wg=Xe.setOptions,zg=Xe.use,Hg=Xe.walkTokens,Gg=Xe.parseInline;var Vg=Vt.parse,Yg=Gt.lex;function yr(e){let t=Xe.parse(e),r=Vi.sanitize(t);return Yi(r)}function ur(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Zr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function gs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Fp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Bp=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,jp=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function vr(e){return!!e&&typeof e=="object"}function Do(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function pl(e,t){let r=Do(e),n=Do(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Up(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>vr(s)&&typeof s.text=="string"?s.text:"").join(""):vr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Wp(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Fp[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Do(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=pl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=pl(vr(l)?l.old_string:"",vr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function fl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function _l(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Bp.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:jp.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function zp(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(vr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(_l(o.text));else if(o.type==="thinking"){let a=fl(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Wp(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(vr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Up(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Hp(e){if(e.type==="item.completed"&&vr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[_l(t.text)];if(t.type==="reasoning"){let r=fl(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Gp(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ml(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!vr(o))continue;let a=Gp(o)?Hp(o):zp(o,r);for(let l of a)t.push(l)}return t}var Vp=5,Yp=10,Kp=/Task\s+#(\d+)/,Zp=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Xp=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function bs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Qp(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Jp(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function ef(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Kp.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!c||d.length===0)continue;t.set(c[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function tf(e){if(e.tool==="Bash"){let t=e.command||"";return Zp.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Xp.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function rf(e){let t=e.filter(s=>s.kind==="tool").slice(-Yp),r=new Map;t.forEach((s,o)=>{let a=tf(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function nf(e){let t=Jp(e);if(t)return{text:t,guess:!1};let r=ef(e);if(r)return{text:r,guess:!1};let n=rf(e);return n?{text:n,guess:!0}:null}function sf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Lt(e,t)}function hs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,c=new Set,d=new Set,_=null,m=null,b=!1,A=!1,k=!1,N=null,F=null;function E(){b=!1,A=!1,k=!1,N=null,F=null}async function W(I){if(r){A=!0,k=!1,De();try{let S=await Promise.resolve(r("get-attempt-prompt",{attempt_id:I}));if(o!==I)return;!S||typeof S!="object"||Array.isArray(S)?k=!0:(N=S,F=I)}catch{o===I&&(k=!0)}finally{o===I&&(A=!1,De())}}}function J(){if(b=!b,b&&o&&F!==o){W(o);return}De()}function x(){if(!b)return"";let I=Zr({loading:A,error:k});if(I)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${I}
      </div>`;if(!N)return"";if(N.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let S=gs(N.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${S?i`<div class="prompt-block__meta">${S} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?ur("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?ur("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function w(){if(!o||!n)return[];let I=n.get(o);return ml(I?I.lines:[])}function R(){if(!o||!n)return null;let I=n.get(o),S=I?I.last_event_at:null;return typeof S=="number"?S:null}function q(){return a.status==="running"}function X(){if(q()&&o){m||(m=setInterval(()=>De(),1e3));return}fe()}function fe(){m&&(clearInterval(m),m=null)}function ae(I){let S=[],me=0;for(;me<I.length;){let Ae=I[me];if(Ae.kind==="tool"){let P=me;for(;P<I.length&&I[P].kind==="tool"&&I[P].tool===Ae.tool;)P+=1;if(P-me>=Vp&&!d.has(me)){S.push({kind:"group",idx:me,tool:Ae.tool||"",lines:I.slice(me,P).map((H,L)=>({idx:me+L,line:H}))}),me=P;continue}}S.push({kind:"line",idx:me,line:Ae}),me+=1}return S}function ie(I){for(let S=I.length-1;S>=0;S-=1){let me=I[S];if(me.kind==="result"||me.kind==="error")return null;if(me.kind==="tool"&&!Object.hasOwn(me,"result"))return me}return null}function oe(I){for(let S=I.length-1;S>=0;S-=1)if(I[S].kind==="thinking")return I[S];return null}function Fe(I,S){if(S.kind==="gate")return i`<div class="sv__gate">${S.text}</div>`;if(S.kind==="phase")return i`<div class="sv__phase">${S.text}</div>`;if(S.kind==="result")return i`<div
        class="sv__result${S.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${S.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${yr(S.text||(S.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(S.kind==="thinking"){let me=c.has(I);return i`<div
        class="sv__think${me?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Pe(I)}
      >
        <span class="sv__think-line">💭 ${bs(S.text)}</span>
        ${me?i`<pre class="sv__think-expand">${S.text}</pre>`:""}
      </div>`}if(S.kind==="error")return i`<div class="sv__error">⛔ ${S.text}</div>`;if(S.kind==="blocker")return i`<div class="sv__error">⛔ ${S.text}</div>`;if(S.kind==="tool"){let me=c.has(I),Ae=S.tool==="Bash"?Qp(S.command):0,P=S.tool==="Bash"?Ae>1?bs(S.command):S.command:S.path||S.command||"";return i`<div
        class="sv__tool${me?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Pe(I)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${S.icon}</span>
          <span class="sv__tool-name">${S.tool}</span>
          ${P?i`<span class="sv__tool-detail">${P}</span>`:""}
          ${Ae>1?i`<span class="sv__tool-more">⋯ ${Ae}줄</span>`:""}
          ${typeof S.added=="number"?i`<span class="sv__diff-add">+${S.added}</span>`:""}
          ${typeof S.removed=="number"?i`<span class="sv__diff-del">−${S.removed}</span>`:""}
          ${S.result?i`<span class="sv__tool-ok">→ ${S.result}</span>`:""}
        </span>
        ${me?i`<pre class="sv__tool-expand">${Ue(S)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${yr(S.text||"")}</div>`}function Ue(I){let S=[];if(I.tool==="Bash"&&typeof I.command=="string"&&I.command.length>0)S.push(I.command);else if(I.input!==void 0)try{S.push(`input: ${JSON.stringify(I.input,null,2)}`)}catch{}return typeof I.output=="string"&&I.output.length>0&&S.push(`output:
${I.output}`),S.join(`

`)}function He(){if(!o)return i``;let I=w(),S=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),me=a.session_id||"",Ae=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,P=q(),H=P?sf(R(),Date.now()):"",L=P?ie(I):null,K=P?oe(I):null,ee=nf(I);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ee?i`<span
              class="sv__stage${ee.guess?" sv__stage--guess":""}"
              title=${ee.text}
              >${ee.text}</span
            >`:""}
        ${P?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${H?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${H}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${H?i`<span class="sv__live-ago">${H}</span>`:""}</span
            >`:""}
        ${me?i`<button
              type="button"
              class="sv__session"
              title=${me}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${me}`}
              @click=${()=>Ee(me)}
            >
              ⧉ ${me.slice(0,8)}
            </button>`:""}
        ${S?i`<span class="sv__meta">${S}</span>`:""}
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
          @click=${J}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Ae}
          @click=${we}
        >
          <span class="sv__follow-full">⇣ ${Ae}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>$e()}
        >
          ✕
        </button>
      </div>
      ${x()}
      <div class="sv__body">
        ${I.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:ae(I).map(le=>le.kind==="group"?Ke(le):Fe(le.idx,le.line))}
      </div>
      ${L||K?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${L?i`<span class="sv__now-icon">${L.icon}</span>
                  <span class="sv__now-name">${L.tool}</span>
                  <span class="sv__now-detail"
                    >${L.tool==="Bash"?bs(L.command):L.path||L.command||""}</span
                  >`:""}
            ${K?i`<span class="sv__now-think"
                  >💭 ${bs(K.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ke(I){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ge(I.idx)}
    >
      <span class="sv__group-icon">${I.lines[0].line.icon}</span>
      <span class="sv__group-name">${I.tool}</span>
      <span class="sv__group-count">${I.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ge(I){d.add(I),De()}function De(){je(He(),e),X(),l&&he()}function he(){let I=e.querySelector(".sv__body");I&&(I.scrollTop=I.scrollHeight)}function Pe(I){c.has(I)?c.delete(I):c.add(I),De()}function we(){l=!l,De()}function Ee(I){or(I).then(S=>{S?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _e(I){!o||!I||(a={...a,...I},De())}function re(I){let S=I.target;if(!S||!S.classList||!S.classList.contains("sv__body"))return;!(S.scrollHeight-S.scrollTop-S.clientHeight<=4)&&l&&(l=!1,De())}e.addEventListener("scroll",re,!0);function G(I){let S=I&&I.attempt_id;S&&(o=S,a=I.meta||{},l=!0,c.clear(),d.clear(),E(),!_&&n&&(_=n.subscribe(De)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),De())}function $e(){let I=o;o=null,c.clear(),d.clear(),E(),fe(),r&&I&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${I}`})).catch(()=>{}),je(i``,e),s&&s()}return{open:G,updateMeta:_e,close:$e,isOpen(){return o!==null},destroy(){fe(),_&&(_(),_=null),e.removeEventListener("scroll",re,!0),o=null,je(i``,e)}}}function wn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=gl(t.spec_id),s=gl(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function gl(e){return typeof e=="string"?e.trim():""}function of(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function af(e){let t=e&&e.metadata||{},r=wn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:of(t)?null:"plan_pending"}),n}function bl(e,t){let r=af(e);return i`
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
  `}var lf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",cf=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,df=/^\*\*결론\*\* — (.+)$/;function ys(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==lf)return null;let r=cf.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?df.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",d=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(d).join(`
`).trim()}}var hl=20;function yl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function uf(e){return e.length>hl?`${e.slice(0,hl)}\u2026`:e}function pf(e,t,r,n){let s=`${t.lane} ${uf(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${yl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${yr(t.body)}
        </div>`:""}
  </div>`}function ff(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${yl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${yr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function vl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,d)=>String(d.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let d=ys(typeof c.text=="string"?c.text:"");return d?pf(c,d,t,s.has(c.id)):ff(c)})}
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
  `}var{I:Eb}=Ga;var wl=e=>e.strings===void 0;var _f={},kl=(e,t=_f)=>e._$AH=t;var Mr=ls(class extends Kr{constructor(e){if(super(e),e.type!==cr.PROPERTY&&e.type!==cr.ATTRIBUTE&&e.type!==cr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!wl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Pt||t===at)return t;let r=e.element,n=e.name;if(e.type===cr.PROPERTY){if(t===r[n])return Pt}else if(e.type===cr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Pt}else if(e.type===cr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Pt;return kl(e),t}});var No=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],vs=["orchestration_model","orchestration_effort","orchestration_speed"],$l=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ws=["delegated","main"],ks=["inherit","claude","codex"],kn=["default","fast"],$s=["standard","fast_track"],$n=["codex","opus","fable","self","skip"],xs=["codex","fable","skip"],Ss=["low","medium","high","xhigh"],qt="auto";function pr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xl(e){if(!pr(e)||!pr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))pr(n)&&pr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Sl(e){return e?.impl_dispatch==="main"}function As(e,t){let r=xl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[qt,...n.flatMap(([,s])=>s)]}function Xr(e,t,r){if(!pr(e)||!pr(e.runners))return[qt];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!pr(o)||!pr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,l]of Object.entries(o.models)){if(r&&r!==qt&&a!==r)continue;let c=pr(l)?l.efforts:null;if(Array.isArray(c))for(let d of c)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[qt,...n]}function Es(e,t){let r=xl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Al(e,t){let r={};for(let n of No){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function El(e,t){let r={};for(let n of vs){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var qo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...vs]}],Fo={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Cl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Tl(e){return typeof e=="string"&&e.length>0?e:null}function mf(e,t,r){let n=Tl(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=Tl(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function Ts(e,t,r){return e.map(n=>({key:n,...mf(n,t,r)}))}function Rl(e,t,r){let n={pin:0,global:0,base:0};for(let s of Ts(e,t,r))n[s.source]+=1;return n}function Il(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Ll(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Db=[...No,...vs];var gf=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],bf={pin:"pin",global:"global",base:"base"};function hf(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${bf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function yf(e,t,r){switch(e){case"workflow_mode":return $s;case"spec_review_model":case"impl_review_model":return $n;case"plan_review_model":return xs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ss;case"impl_dispatch":return ws;case"impl_runtime":return ks;case"impl_model":return As(r,t.impl_runtime);case"impl_effort":return Xr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return kn;case"orchestration_model":return Es(r,null);case"orchestration_effort":return Xr(r,void 0,t.orchestration_model||qt).filter(n=>n!==qt);default:return[]}}function vf(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${hf(e.source)}
    <span class="detail-effective__k"
      >${Fo[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Cl[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Fo[e.key]||e.key} \uD3B8\uC9D1`}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>(기본)</option>
          ${t.options.map(r=>i`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===qt?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function Ol(e,t){let r=qo.flatMap(o=>o.keys),n=Rl(r,e.metadata,e.workspace_values),s={};for(let o of Ts(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
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
      <span class="detail-effective__summary">${wf(s)}</span>
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
      ${qo.map(o=>i`
          <div class="detail-effective__subhead">${o.label}</div>
          ${Ts(o.keys,e.metadata,e.workspace_values).map(a=>vf(a,{expanded:e.expanded,options:yf(a.key,s,e.catalog),onEdit:t.onEdit}))}
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
  </section>`}function wf(e){let t=[];if(typeof e.workflow_mode=="string"&&t.push(String(e.workflow_mode)),e.impl_dispatch==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch==="delegated"){let r=typeof e.impl_runtime=="string"?` ${e.impl_runtime}`:"";t.push(`\uC704\uC784${r}`)}else typeof e.impl_runtime=="string"&&t.push(`\uC704\uC784 ${e.impl_runtime}`);return typeof e.impl_model=="string"&&t.push(String(e.impl_model)),t.length>0?t.join(" \xB7 "):"\uAE30\uBCF8"}function Pl(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",l=ts(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${gf.map(c=>{let d=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",_=n[c.id],m=d.length>0||_?.fill==="full",b=!m&&_?.fill==="dim",A=_?.stale===!0;return i`<span
          class=${`detail-summary__gate${m?" detail-summary__gate--on":""}${b?" detail-summary__gate--current":""}${A?" detail-summary__gate--stale":""}`}
          data-gate=${c.id}
        >
          <span class="detail-summary__gate-pill">${c.label}</span>
          ${d?i`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var Ml=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function xn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cs(e){if(!xn(e)||!xn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>xn(r)&&xn(r.models));return t.length>0?t:null}function Bo(e,t){let r=Cs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Dl(e,t){return xn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Nl(e,t){let r=Cs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Dl(n,n.models[t]);return[]}function kf(e){let t=Cs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Dl(n,s))r.includes(o)||r.push(o);return r}function $f(e,t){if(!t)return kf(e);let n=Cs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Nl(e,o))s.includes(a)||s.push(a);return s}function ql(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Bo(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Nl(t,n.impl_model):$f(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function xf(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Fl(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c(k){k.key==="Escape"&&s&&(k.preventDefault(),b())}document.addEventListener("keydown",c);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${xf(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${l}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:yr(a)}
          </div>
        </div>
      </div>
    `:i``}function _(){je(d(),e)}async function m(k,N={}){s=k,o="loading",a="",l="",_();let F=r?r():"";if(!F){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let E="/api/doc?workspace="+encodeURIComponent(F)+"&path="+encodeURIComponent(k);try{let W=await n(E),J=await W.json().catch(()=>({}));if(!W.ok||!J||J.ok!==!0){if(J?.error==="not_found"&&N.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(J&&J.error||W.status)+")",_();return}a=String(J.content||""),o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function b(){s=null,je(i``,e)}function A(){document.removeEventListener("keydown",c),b()}return{open:m,close:b,destroy:A}}var Sf=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ul="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Af(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Ef(e){let t=wt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Vr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Ul}
          >부분 집계</span
        >`:""}`}function Bl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function jl(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Wl(t):""}function Tf(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=wt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
        ${jl(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${jl(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Cf(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Sf,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Af(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Ul}</span>`:""}
  </div>`}var Rf={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Wl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function If(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function zl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let m=typeof d.session_id=="string"&&d.session_id.length>0,b=o.has(d.attempt_id),A=m&&!b,k=m?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!A}
      title=${k}
      @click=${N=>{N.stopPropagation(),A&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let m=d.cause_detail,b=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:d.cause;return i`<div class="detail-session__cause" title=${b}>
      ${d.cause}
    </div>`},c=d=>{let _=Bl(_o(d));if(wt(_).length===0&&!Vr(d.usage))return"";let m=s.has(d.attempt_id);return i`<button
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
      세션 이력${Ef(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let _=_o(d),m=Bl(_),b=wt(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Rf[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${br(d)?i`<span
                  class="detail-session__resumed"
                  title=${br(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${er(d)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(A=>i`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):Vr(d.usage)?i`<span class="detail-session__usage"
                    >${Vr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Wl(d.started_at)}</span>
          </button>
          ${c(d)} ${a(d)} ${l(d)} ${If(d)}
          ${s.has(d.attempt_id)&&d.usage?Cf(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Tf(_)}
        </div>`})}
    </div>
  `}function Hl(e,t={}){return i`
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
          ${Lf(e)}
        </div>`:""}
  `}function Lf(e){let t=Zr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?ur("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=gs(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?ur("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?ur("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Of=["open","in_progress","deferred","resolved","closed"],Pf=[0,1,2,3,4];function Gl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,d=null,_=null,m={},b="",A=!1,k=!1,N={},F=!1,E=!1,W="",J="",x="";function w(){F=!1,E=!1,W="",J="",x=""}let R=[],q=null,X=null,fe=!1,ae="",ie=!1,oe=0,Fe=new Set;function Ue(){R=[],q=null,X=null,fe=!1,ae="",ie=!1,oe+=1,Fe.clear()}async function He(v){if(!s)return;let f=++oe;try{let p=await Promise.resolve(s("get-comments",{id:v}));if(f!==oe||v!==d)return;R=Array.isArray(p)?p:[],fe=!1}catch{if(f!==oe||v!==d)return;fe=!0}ye()}function Ke(){if(!s||!d)return;let v=_&&typeof _.comment_count=="number"?_.comment_count:null;if(q!==d){q=d,X=v,He(d);return}v!==null&&v!==X&&(X=v,He(d))}function Ge(v){Fe.has(v)?Fe.delete(v):Fe.add(v),ye()}function De(v){let f=ae.trim().length===0;ae=v,f!==(v.trim().length===0)&&ye()}async function he(){let v=ae.trim();if(!s||!d||v.length===0||ie)return;let f=d;ie=!0,ye();let p=!1;try{let C=await Promise.resolve(s("add-comment",{id:f,text:v}));Array.isArray(C)&&C.length>0&&(p=!0,f===d&&(R=C,fe=!1,ae="",X=C.length))}catch{p=!1}p||ce("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),f===d&&(ie=!1),ye()}let Pe={onToggle:Ge,onDraftInput:De,onSubmit:he},we=document.createElement("div");we.className="md-viewer-root",document.body.appendChild(we);let Ee=Fl(we,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),_e=document.createElement("div");_e.className="session-log-root",document.body.appendChild(_e);let re=hs(_e,{transport:s?(v,f)=>Promise.resolve(s(v,f)):void 0,sessionLogStore:c}),G=!1,$e=!1,I=!1,S=null,me=null,Ae=0;function P(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function H(){G=!1,$e=!1,I=!1,S=null,me=null,Ae+=1}async function L(v){if(!s)return;let f=++Ae;$e=!0,I=!1,ye();try{let p=await Promise.resolve(s("get-bead-prompt",{bead_id:v}));if(f!==Ae)return;!p||typeof p!="object"||Array.isArray(p)?I=!0:(S=p,me=P(v))}catch{f===Ae&&(I=!0)}finally{f===Ae&&($e=!1,ye())}}function K(){if(G=!G,G&&d&&me!==P(d)){S=null,L(d);return}ye()}function ee(){if(!a||!d)return[];let v=a.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(p=>p&&p.bead_id===d).sort((p,C)=>(C.started_at||0)-(p.started_at||0)).map(p=>({attempt_id:p.attempt_id,bead_id:p.bead_id,status:p.status,started_at:typeof p.started_at=="number"?p.started_at:null,runner:p.runner||null,model:p.model||null,effort:p.effort||null,speed:p.speed||null,session_id:p.session_id||null,resumed_from:p.resumed_from||null,continuation_mode:p.continuation_mode||null,dismissed_at:typeof p.dismissed_at=="number"?p.dismissed_at:null,cause:typeof p.cause=="string"?p.cause:null,cause_detail:p.cause_detail||null,exec_default_preset_id:typeof p.exec_default_preset_id=="string"?p.exec_default_preset_id:null,exec_default_preset_revision:typeof p.exec_default_preset_revision=="number"?p.exec_default_preset_revision:null,exec_values:p.exec_values&&typeof p.exec_values=="object"?p.exec_values:null,usage:p.usage||null,usage_legs:Array.isArray(p.usage_legs)?p.usage_legs:[]}))}function le(){if(!a||!d)return null;let v=a.get();return Dt(v&&v.attempts||{},d)}let ge=new Set;function xe(v){ge.has(v)?ge.delete(v):ge.add(v),ye()}function T(v){let f=a?a.get():null,p=f&&f.attempts?f.attempts[v]:null;re.open({attempt_id:v,meta:p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}})}async function B(v){if(!s||!v)return;let f=await Gr();if(f===null)return;let p=()=>{let ke=a?a.get():null;return ke&&typeof ke.revision=="number"?ke.revision:0},C=async(ke={},Se=p())=>await s("worker-attempt-resume",{attempt_id:v,expected_revision:Se,...f!==""?{instructions:f}:{},...ke}),se=ke=>{ke?.queue&&a?.set&&a.set(ke.queue)},pe=await C();if(se(pe),pe&&pe.conflict){let ke=pe.queue&&typeof pe.queue.revision=="number"?pe.queue.revision:p();pe=await C({},ke),se(pe)}pe=await ar(pe,(ke,Se)=>C({continuation:ke,decision_token:Se}),{onResult:se,refresh:()=>C()}),pe&&pe.resumed===!1&&!pe.conflict&&pe.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${pe.reason}`,"error",2400)}let Q={onOpen:T,onResume:B,onToggleUsage:xe};function Y(){let v=a?a.get():null,f={...N};for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){let C=v&&v[p];typeof C=="string"&&(f[p]=C)}return f}async function $(){if(s){try{let v=await Promise.resolve(s("get-session-defaults",{}));N=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{N={}}ye()}}function M(){let v=a?a.get():null;return v&&v.runner_catalog||null}function V(){let v=_?.metadata&&typeof _.metadata=="object"?_.metadata:{},p=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof v.orchestration_model=="string"?v.orchestration_model:"")||(typeof Y().orchestration_model=="string"?Y().orchestration_model:"")||"opus";return Bo(M(),p)}function Le(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Ie(v){return v?.compatible===!1}function qe(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Re(){let v=Le(),f=v?.presets.find(p=>p.id===b);if(!(!s||!d||!v||!f||Ie(f)||A)){A=!0,ye();try{let p=await Promise.resolve(s("apply-impl-preset",Ll(d,f.id,v.revision)));if(p&&p.conflict){qe(p),ce("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let C=p&&Array.isArray(p.issue)?p.issue[0]:p?.issue;if(p&&p.applied&&C&&typeof C=="object"){_=C;for(let se of Ml)delete m[se];ce("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}p&&p.error==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(p){p&&typeof p=="object"&&p.code==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,ye()}}}let Ze=null;r&&r.subscribe&&(Ze=r.subscribe(()=>kt()));let gt=null;a&&typeof a.subscribe=="function"&&(gt=a.subscribe(()=>{d&&ye()}));let bt=null;l&&typeof l.subscribe=="function"&&(bt=l.subscribe(()=>{d&&ye()}));function it(v){v.key==="Escape"&&d&&(v.preventDefault(),n())}document.addEventListener("keydown",it);function kt(){if(d){if(r&&typeof r.snapshotFor=="function"){let v=r.snapshotFor("detail:"+d)||[];_=v.find(p=>p&&p.id===d)||v[0]||_}Ke(),ye()}}function ot(v){or(v).then(f=>{f?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function nt(v){v.preventDefault(),v.stopPropagation(),d&&ot(d)}function ut(v,f){v.preventDefault(),v.stopPropagation(),ot(f)}function z(v,f,p){v.preventDefault(),v.stopPropagation(),Ee.open(f,{missing_state:p})}function Z(v,f){m[v]=f,ye(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Il(d,v,f.length===0?null:f))).catch(()=>{ce("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ve(v,f){let p=_||{},C=p.metadata&&typeof p.metadata=="object"?p.metadata:{},se={};for(let Se of["impl_runtime","impl_model","impl_effort"])se[Se]=Object.hasOwn(m,Se)?m[Se]:typeof C[Se]=="string"?C[Se]:"";se[v]=f;let pe=ql(se,M(),V()),ke={};for(let Se of["impl_runtime","impl_model","impl_effort"])ke[Se]=m[Se],m[Se]=pe[Se]||"";ye(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...pe,orchestration_runtime:V()})).then(Se=>{let ft=Array.isArray(Se)?Se[0]:Se;if(!ft||typeof ft!="object"||!ft.id)throw new Error("implementation target readback failed");_=ft;for(let Qt of["impl_runtime","impl_model","impl_effort"])delete m[Qt];ye()}).catch(()=>{for(let Se of["impl_runtime","impl_model","impl_effort"])ke[Se]===void 0?delete m[Se]:m[Se]=ke[Se];ye(),ce("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function be(v,f,p){if(!s||!d)return!1;try{let C=await Promise.resolve(s(v,f)),se=Array.isArray(C)?C[0]:C;return se&&typeof se=="object"&&se.id?(_=se,!0):(ce(p,"error"),!1)}catch{return ce(p,"error"),!1}}function de(v){setTimeout(()=>{try{let f=e.querySelector(v);f&&typeof f.focus=="function"&&f.focus()}catch{}},0)}function Ne(){F=!0,W=_&&_.title||"",ye(),de('.detail-edit__input[data-edit="title"]')}function et(v){W=v.target.value}function Ve(){F=!1,W="",ye()}function Me(){be("edit-text",{id:d,field:"title",value:W},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(F=!1,W=""),ye()})}function Qe(){E=!0,J=_&&_.description||"",ye(),de('.detail-edit__textarea[data-edit="description"]')}function Te(v){J=v.target.value}function pt(){E=!1,J="",ye()}function Et(){be("edit-text",{id:d,field:"description",value:J},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(E=!1,J=""),ye()})}function Ot(v,f,p,C){if(v.key==="Escape"){v.stopPropagation(),p();return}v.key==="Enter"&&(!C||v.ctrlKey||v.metaKey)&&(v.preventDefault(),f())}function Ft(v){let f=v.target.value;be("update-status",{id:d,status:f},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ye())}function $r(v){let f=Number(v.target.value);be("update-priority",{id:d,priority:f},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ye())}function ht(v){x=v.target.value}function yt(){let v=x.trim();v.length!==0&&be("label-add",{id:d,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(f=>{f&&(x=""),ye()})}function rr(v){if(v.key==="Escape"){v.stopPropagation(),x="",ye();return}v.key==="Enter"&&(v.preventDefault(),yt())}function nr(v){be("label-remove",{id:d,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ye())}let Bt={onCopyPath:ut,onOpenDoc:z};function jt(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function vt(v){switch(v&&typeof v=="object"?String(v.dependency_type||v.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Xt(v){let p=(Array.isArray(v.dependencies)?v.dependencies:[]).map(C=>({id:jt(C),icon:vt(C)})).filter(C=>C.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${p.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${p.map(C=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(C.id)}
                  >
                    ${C.icon?`${C.icon} `:""}${C.id}
                  </button>`:i`<span class="detail-dep"
                    >${C.icon?`${C.icon} `:""}${C.id}</span
                  >`)}
          </div>`}
    `}function u(v){let f=v.metadata||{},p=v.workflow||{},C=p.stages||{},se=C.spec&&C.spec.stale,pe=C.impl&&C.impl.stale,ke=C.plan||null,Se=p.route_source==="derived",ft=p.route||f.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Se?" detail-kv__v--derived":""}"
          title=${Se?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Se?"unset":ft}</span
        >
      </div>
      ${p.route!=="quick_fix"||Object.hasOwn(f,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${f.spec_review||"\uC5C6\uC74C"}${se?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${p.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ke?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ke?.approval_receipt||"\uC5C6\uC74C"}${ke?.approval_state==="stale"?" \xB7 stale":ke?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${p.route!=="quick_fix"||Object.hasOwn(f,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${f.impl_review||"\uC5C6\uC74C"}${pe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${p.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${p.planned_execution.kind}</span>
            </div>
            ${p.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${p.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${p.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${p.exec_receipt.kind}:${p.exec_receipt.actor}@${p.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${p.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${p.impl_entry.actor}@${p.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${f.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${f.pr_url}</span>
          </div>`:""}
    `}let y={route:["quick_fix","spec_backed","full_plan"]};async function j(v,f){let p=f.target.value;if(v==="route"&&_&&_.metadata&&_.metadata.route==="full_plan"&&p!=="full_plan"&&!window.confirm(`full_plan \u2192 ${p||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ye();return}await be("update-workflow-meta",{id:d,key:v,value:p},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ye()}function te(v){let f=v.metadata||{};return i` ${((C,se)=>{let pe=y[C],ke=typeof f[C]=="string"?f[C]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${C}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${C}
          data-edit=${`wfmeta-${C}`}
          @change=${Se=>j(C,Se)}
        >
          <option value="" ?selected=${!pe.includes(ke)}>
            ${se}
          </option>
          ${pe.map(Se=>i`<option value=${Se} ?selected=${ke===Se}>${Se}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function U(v,f){return F?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${W}
            @input=${et}
            @keydown=${p=>Ot(p,Me,Ve,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Me}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ve}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${wt(f).map(p=>i`<span class="detail-usage-total" title=${p.tooltip}
              >${p.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ne}
        >
          ✎
        </button>
      </div>
    `}function h(v){let f=_t(v.created_at),p=_t(v.updated_at);return!f&&!p?i``:i`
      ${f?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${f}</span>
          </div>`:""}
      ${p?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${p}</span>
          </div>`:""}
    `}function O(v,f){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ft}
        >
          ${Of.map(p=>i`<option value=${p} ?selected=${p===v}>${p}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${$r}
        >
          ${Pf.map(p=>i`<option value=${String(p)} ?selected=${p===f}>
                P${p}
              </option>`)}
        </select>
      </div>
    `}function ne(v){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${E?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Qe}
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
              .value=${J}
              @input=${Te}
              @keydown=${f=>Ot(f,Et,pt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Et}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${pt}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ce(v){let f=typeof v.notes=="string"?v.notes:"";return f.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${f}</div>
    `}function Je(v){let f=Array.isArray(v.labels)?v.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${f.map(p=>i`<span class="detail-label-chip"
              >${p}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${p}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+p}
                @click=${()=>nr(p)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${x}
            @input=${ht}
            @keydown=${rr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${yt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Be(){if(!d)return i``;let v=_||{},f=String(v.id||d),p=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",C=le(),se=v.status||"open",pe=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",ke=v.description||"",Se={...v,metadata:{...v.metadata||{},...m}};return i`
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
            @click=${nt}
          >
            ${f}
          </button>
          ${U(p,C)}
          ${Pl(Se)}
          ${Ol({metadata:Se.metadata,workspace_values:Y(),catalog:M(),expanded:k,presets:Le()?.presets||[],preset_id:b,preset_busy:A},{onToggle:()=>{k=!k,ye()},onEdit:(ft,Qt)=>{if(ft==="impl_runtime"||ft==="impl_model"||ft==="impl_effort"){ve(ft,Qt??"");return}Z(ft,Qt??"")},onPresetSelect:ft=>{b=ft,ye()},onPresetApply:()=>{Re()}})}
          ${O(se,pe)} ${h(v)}
          ${ne(ke)}
          ${vl(R,Pe,{expanded:Fe,draft:ae,sending:ie,error:fe})}
          ${Ce(v)} ${Je(v)} ${Xt(v)}
          ${u(v)} ${te(v)}
          ${bl(v,Bt)}
          ${Hl({expanded:G,loading:$e,error:I,data:S},{onToggle:K})}
          ${zl(ee(),Q,{total:C,expanded:ge})}
        </div>
      </div>
    `}function ye(){je(Be(),e)}return{load(v){v!==d&&(m={},b="",k=!1,w(),Ue(),H()),d=v,_=null,kt(),$()},clear(){d=null,_=null,m={},b="",A=!1,w(),Ue(),H(),Ee.close(),re.close(),je(i``,e)},destroy(){Ze&&(Ze(),Ze=null),gt&&(gt(),gt=null),bt&&(bt(),bt=null),document.removeEventListener("keydown",it),Ee.destroy(),we.parentNode&&we.parentNode.removeChild(we),re.destroy(),_e.parentNode&&_e.parentNode.removeChild(_e),d=null,_=null,b="",A=!1,Ue(),H(),je(i``,e)}}}function Vl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(d,_,m="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function Rs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Is(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function Yl(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,l=o.finished_at;typeof a!="number"||typeof l!="number"||!Number.isFinite(a)||!Number.isFinite(l)||l<a||(r+=l-a,n=!0)}return n?r:null}function Ls(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Mf(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:Rs(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Kl(e,t){let r=Mf(e,t);return r?i`<button
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
            title=${r.deploy.at?_t(r.deploy.at):""}
            >${Ls(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Is(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Qr(e){let t=Lt(e.created_at),r=Lt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${_t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${_t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Df(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Sn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Os(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function tr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,b)=>(m.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?Df(s.phase):null,d=s?.kind==="stale_work_backup_fresh",_=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:d?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:_==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:_}}function fr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var Nf={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Zl(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function l(d){return Number.isInteger(a[d])?Number(a[d]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Nf[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function jo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=wt(e.usage),s=zt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?Lt(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",A=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=i`<span class="worker-mini__title">${e.title}</span>`,N=e.pr_url&&e.pr_number?i`<a
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
        >`:"",E=r.map(He=>He===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${He}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${He===e.completion_badge&&e.completion_title||""}
          >${He}</span
        >`),W=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",J=n.length>0?n.map(He=>i`<span class="worker-usage" title=${He.tooltip}
              >${He.label}</span
            >`):s?i`<span class="worker-usage" title=${Yr(e.usage)}
            >${s}</span
          >`:"",x=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",w=e.merge_action?i`<button
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
      </button>`:"",q=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",X=e.discard,fe=X?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${X?.attempt_id||""}
          data-operation-id=${X?.operation?.operation_id||""}
          data-discard-mode=${X?.confirmation||"unmerged"}
          ?disabled=${X?!X.enabled:e.discard_enabled===!1}
          title=${X?X.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${X?.label||"\uD3D0\uAE30"}
        </button>`:"",ae=e.stale_work||null,ie=ae?i`${ae.can_resume||ae.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ae.action_id}
            ?disabled=${ae.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ae.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ae.action_id}
            ?disabled=${ae.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ae.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ae.action_id}
            ?disabled=${ae.locked}
          >
            다시 확인
          </button>`:""}`:"",oe=ae?i`<div class="worker-mini__stale">
        <strong>${ae.title}</strong>
        <span>${ae.summary}</span>
        <span>${ae.cause}</span>
        ${ae.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Fe=e.revise_action?i`<button
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
        </button>`:"",Ue=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||X?.operation||e.revise_action||ae);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${b}${A}${k}</div>
          <div class="worker-mini__row2">
            ${J}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${_t(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Is(e.work_ms)}</span
                >`:""}${E}${x}
            <span class="worker-mini__actions"
              >${w}${R}${q}${fe}</span
            >
            ${Qr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${_}${b}${A}${N}${F}${E}${m}${W}
            </div>
            <div class="worker-mini__body">${k}${oe}</div>
            ${Ue?i`<div class="worker-mini__foot">
                  ${J}${x}
                  <span class="worker-mini__actions"
                    >${w}${R}${q}${fe}${Fe}${ie}</span
                  >
                  ${fr(e)}
                </div>`:""}
            ${Qr(e)}`:i`<div class="worker-mini__line">
              ${d}${_}${b}${A}${k}${N}${F}${E}${m}${W}${J}${x}${w}${R}${q}${fe}
            </div>
            ${fr(e)} ${Qr(e)}`}
  </div>`}function qf(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
    ${r?es(r,e.status):""}
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
    ${Qr(e)}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?qf(n):jo(n))}
          </div>`}
  </section>`}var Xl=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],An=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ps(e,t){let r=Xl.find(s=>s.step===e);if(!r)return null;let n=Xl.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Ql(e){let t=An.findIndex(r=>r.step===e);return An.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Dr(e){let t=An.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Ff(e){let t=An.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:An.length}}function Ms(e){let t=Ff(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Wo=new Set(["queued","running","retry_pending","repairing"]),Jl=new Set(["failed","succeeded"]),Bf={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},En={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},jf={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:En.base_containment,child_sweep:En.child_sweep,branch_cleanup:En.branch_cleanup,parent_close:En.parent_close};function Uf(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Wf(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Wo,...Jl].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function zf(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let l=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(c)}function Uo(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Bf[s];if(!o)return null;let a=Ps(r,`${n} ${o}`);return a?{...a,active:Wo.has(s),failed:s==="failed"}:null}function Hf(e){return!e||typeof e!="object"?null:jf[e.step]||null}function Ds(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Hf(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),l=Uf(e.merge_sha)?e.merge_sha:null,c=!o&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Wf(k,t,l)).sort(zf):[],d=a?c:[],_=d.find(k=>Wo.has(k.state));if(_)return Uo(_);if(s)return s.step==="repo_operations"&&c[0]?Uo(c[0],!0):null;let m=d.find(k=>Jl.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return Uo(m);if(n){let k=Ps(n.step,n.label);return k?{...k,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?En[e.cleanup_cursor]:null;if(!b)return null;let A=Ps(b.step,b.label);return A?{...A,active:!0,failed:!1}:null}function Ns(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var ec={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},tc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function rc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function zo(e){for(let t of rc(e))if(Object.hasOwn(ec,t))return ec[t];return null}function Ho(e){let t=null;for(let r of rc(e))Object.hasOwn(tc,r)&&(t=tc[r]);return t}function qs(e){let t=zo(e),r=Ho(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function nc(e,t){let r=zo(e)??zo(t),n=Ho(t)??Ho(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var sc=160;function Gf(e){return e.length>sc?`${e.slice(0,sc)}\u2026`:e}function Vf(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Gf(e.command)}</code>`:""}
  </div>`}function Yf(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Go(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function oc(e){let t=e.failure?qs(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${Vf(e.failure.cause_detail)}
          ${Yf(e.failure.reason)}
          ${fr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Kf(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Go(t-e.started_at):"\u2014",a=er(e),l=br(e),c=wt(e.usage),d=zt(e.usage),_=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,b=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?i`<button
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
                  title=${Yr(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${Qr(e)} ${fr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Vo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Kf(s,t,r))}
  </div>`}function Nr(e){return i`<svg
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
  </svg>`}function Yo(){return Nr(_r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ko(){return Nr(_r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ac(){return Nr(_r`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function ic(){return Nr(_r`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function lc(){return Nr(_r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function cc(){return Nr(_r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function dc(){return Nr(_r`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Tn=1,Zf=6e4,Xf={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Qf=new Set(["auto_merge","merged","merge","done"]),uc={running:3,paused:2,failed:1};function Jf(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function e_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),b=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let m=uc[d.run_state],b=uc[l];if(m>b||m===b&&(d.started_at??0)>(c??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Dt(e,a.bead_id),can_pause:l==="running"&&_,can_resume:l!=="running"&&_&&!n.has(a.attempt_id)})}return o}function pc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Ct(e){return e&&typeof e=="object"?e:{}}function Zo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let E of s)E&&typeof E.root_dir=="string"&&a.set(E.root_dir,E);let l=[],c=[],d=[],_=[],m=[],b=new Map;for(let E of n){if(!E||typeof E.root_dir!="string")continue;let W=E.root_dir,J=E.name||W,x=a.get(W),w=x&&typeof x.revision=="number"?x.revision:typeof E.revision=="number"?E.revision:0,R=Ct(E.attempts),q=Ct(E.bead_titles),X=Ct(E.pr_observations),fe=Ct(E.admission),ae=Ct(E.revise_parked),ie=Ct(E.merge_queue_state),oe=Ct(E.cleanup_failed),Fe=Ct(E.discard_operations),Ue=Ct(E.pr_activity),He=Array.isArray(E.repo_operations)?E.repo_operations:[],Ke=Array.isArray(E.merge_queue)?E.merge_queue:[],Ge=new Set(Ke.filter(re=>re&&typeof re.bead_id=="string").map(re=>re.bead_id)),De=new Map(Ke.filter(re=>re&&typeof re.bead_id=="string").map(re=>[re.bead_id,re])),he=Array.isArray(E.queue)?E.queue:[],Pe=Array.isArray(E.done)?E.done:[],we=new Map;for(let re of Pe)re&&typeof re.bead_id=="string"&&typeof re.added_at=="number"&&we.set(re.bead_id,re.added_at);let Ee=re=>({id:re,title:q[re]||re,root_dir:W,workspace_name:J,expected_revision:w,draggable:!1}),_e=new Set;for(let[re,G]of e_(R,we))_e.add(re),c.push({...Ee(re),lane:"running",attempt_id:G.attempt_id,run_state:G.run_state,can_pause:G.can_pause,can_resume:G.can_resume,started_at:G.started_at,last_event_at:G.last_event_at,runner:G.runner,model:G.model,effort:G.effort,speed:G.speed,resumed_from:G.resumed_from,continuation_mode:G.continuation_mode,usage:G.usage,discard:tr(Fe,re,{attempt_id:G.attempt_id}),badges:G.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:G.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:G.run_state==="failed"});for(let re of Array.isArray(E.pr_wait)?E.pr_wait:[]){let G=re&&re.bead_id;if(typeof G!="string"||_e.has(G))continue;_e.add(G);let $e=Ct(X[G]),I=Ct($e.pr),S=$e.gate?Ct($e.gate):null,me=Ge.has(G),Ae=De.get(G)?.continuation_action||null,P=!!Ae&&Ae.continuation===null,H=ie.active===G,L=re.external===!0,K=oe[G]||null,ee=Ct(Ue[G]),le=Ds({bead_id:G,merge_sha:re.merge_sha,cleanup_cursor:re.cleanup_cursor,merge_progress:ee.merge_progress||null,cleanup_failed:K,repo_operations:He}),ge=Ns(le),xe=!!S&&S.base_badge==="\uCDA9\uB3CC",T=!!K&&["child_sweep","branch_cleanup","parent_close"].includes(K.step)&&!!S&&S.tier==="merged",B=L&&!!K&&!!S&&S.tier==="merged",Q=!!S&&["closed_unmerged","review","undecidable"].includes(S.tier),Y=tr(Fe,G,{external:L,merge_active:H||le?.step==="merge",merge_queued:me,cleanup_active:ge,merged:!!K||S?.tier==="merged"}),$=!!Y.operation;d.push({...Ee(G),lane:"pr_wait",pr_number:typeof I.number=="number"?I.number:null,pr_url:typeof I.url=="string"?I.url:void 0,external:L,usage:Dt(R,G),merge_step:le,badges:P?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:le?[S?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:K?[Dr(K.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Dr(K.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof S?.gate_badge=="string"&&S.gate_badge.length>0?[S.gate_badge]:[],alert:le?le.failed===!0:!!K||Q,reason:K&&le?.active!==!0?Ms(K.step):"PR \uB300\uAE30",merge_action:S?.tier==="merged"&&!T&&!B?!1:!me||P,merge_enabled:!$&&(P||S?.enabled===!0||xe||T||B),merge_label:P?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":B||T?"\uC815\uB9AC \uC7AC\uAC1C":xe&&!T?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:P?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$?Y.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Y.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Y.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:B?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":T?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.enabled===!0?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${S?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:me&&!P,cancel_enabled:!H,continuation_mismatch:Ae?.mismatch||null,discard:Y,discard_action:Y.action,discard_enabled:Y.enabled,discard_title:Y.title})}for(let re=0;re<he.length;re++){let G=he[re],$e=G&&G.bead_id;if(typeof $e!="string"||_e.has($e))continue;_e.add($e);let I=ae[$e],S=tr(Fe,$e),me=S.operation?S:null,Ae={...Ee($e),lane:"queue",draggable:!me,discard:me||void 0,reason:pc(fe,$e),queue_position:re+1,queue_index:re,queue_length:he.length,badges:I?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!I,revise_action:!!I,revise_enabled:!!I&&!me,revise_title:I?I.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${I.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(Ae);let P=b.get(W);P?P.push(Ae):b.set(W,[Ae])}for(let re of Array.isArray(E.runnable)?E.runnable:[]){let G=re&&re.bead_id;typeof G!="string"||_e.has(G)||(_e.add(G),l.push({...Ee(G),title:re.title||q[G]||G,lane:"runnable",draggable:!0,reason:pc(fe,G),created_at:re.created_at??void 0,updated_at:re.updated_at??void 0,labels:Array.isArray(re.labels)?re.labels:[],spec_reviewer:typeof re.spec_reviewer=="string"?re.spec_reviewer:void 0,plan_state:re.plan_state==="approved"||re.plan_state==="authored"?re.plan_state:"none",workflow:re.route?{route:re.route,chips:{route:re.route}}:null,place_index:he.length}))}for(let re of Pe){let G=re&&re.bead_id;if(typeof G!="string"||_e.has(G)||(_e.add(G),o!==void 0&&typeof re.added_at=="number"&&re.added_at<o))continue;let $e=Jf(R,G);m.push({...Ee(G),lane:"done",done:!0,usage:Dt(R,G),done_at:typeof re.added_at=="number"?re.added_at:void 0,done_kind:$e&&typeof $e.done_kind=="string"?$e.done_kind:null})}}let A=new Map;s.forEach((E,W)=>{E&&typeof E.root_dir=="string"&&A.set(E.root_dir,W)});let k=r&&r.running_sort==="repo"?"repo":"started";c.sort((E,W)=>{if(k==="repo"){let w=A.get(E.root_dir)??Number.MAX_SAFE_INTEGER,R=A.get(W.root_dir)??Number.MAX_SAFE_INTEGER;if(w!==R)return w-R}let J=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null,x=typeof W.started_at=="number"&&Number.isFinite(W.started_at)?W.started_at:null;return J!==null&&x!==null&&J!==x?J-x:J===null&&x!==null?1:J!==null&&x===null?-1:E.id.localeCompare(W.id)}),m.sort((E,W)=>(W.done_at??0)-(E.done_at??0));let N=s.length>0?s:n.map(E=>({root_dir:E&&E.root_dir,name:E&&E.name,auto_advance:E&&E.auto_advance,auto_merge:E&&E.auto_merge,slots:E&&E.slots,revision:E&&E.revision,runner_catalog:E&&E.runner_catalog})),F=[];for(let E of N)!E||typeof E.root_dir!="string"||F.push({root_dir:E.root_dir,name:E.name||E.root_dir,auto_advance:E.auto_advance===!0,auto_merge:E.auto_merge===!0,slots:typeof E.slots=="number"&&E.slots>=Tn?E.slots:Tn,revision:typeof E.revision=="number"?E.revision:0,runner_catalog:Ct(E.runner_catalog),items:b.get(E.root_dir)||[]});return{runnable:l,queue:_,queue_groups:F,running:c,pr_wait:d,done:m,automation:{total:F.length,both_on:F.filter(E=>E.auto_advance&&E.auto_merge).length}}}function t_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Zf;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${_t(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Lt(e,t)}</span
        >`}</span
  >`}function Cn(e){return i`<div class="mon-c__title">${e.title}</div>`}function Rn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Fs(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Xo(e){let t=wt(e.usage),r=zt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Yr(e.usage)}
        >${r}</span
      >`:""}function Qo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function r_(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ko()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Yo()}
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
          ${ic()}
        </button>`:""}
  </span>`}function n_(e,t){let r=typeof e.started_at=="number"?Go(t-e.started_at):"";return i`${Cn(e)}
    <div class="mon-c__meta">
      ${Qo(e)}${t_(e.last_event_at,t)}${Rn(e)}${Fs(e)}
      ${er(e)?i`<span class="mon-c__model">${er(e)}</span>`:""}
      ${br(e)?i`<span
            class="rtile__resumed"
            title=${br(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Xo(e)}${r_(e)}${fr(e)}
    </div>`}function s_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Lt(e.updated_at);return i`${Cn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Rn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Jn(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${Fs(e)}
      ${l?i`<span title=${`\uC218\uC815 ${_t(e.updated_at)}`}
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
    </div>`}function o_(e){let t=!!e.discard?.operation;return i`${Cn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Rn(e)}
      ${Qo(e)}
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
    ${fr(e)}
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
        </div>`:""}`}function a_(e){let t=e.merge_step||null,r=!!(zt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${Cn(e)}
    <div class="mon-c__meta">
      ${Rn(e)}${Fs(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Qo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${Xo(e)}${t?i`<span
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
          ${fr(e)}
        </div>`:""}`}function i_(e,t){let r=e.done_kind||"",n=r?Xf[r]||r:"",s=Lt(e.done_at,t);return i`${Cn(e)}
    <div class="mon-c__meta">
      ${Rn(e)}${Fs(e)}
      ${n?i`<span
            class="mon-live__kind${Qf.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Xo(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${_t(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function fc(e,t){return e.lane==="running"?n_(e,t):e.lane==="runnable"?s_(e):e.lane==="queue"?o_(e):e.lane==="pr_wait"?a_(e):i_(e,t)}function _c(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?Ko():Yo()}
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
        ${lc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${cc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Tn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function mc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Jt.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?ac():dc()}
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
        ${Jt.map(l=>i`<option
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
  </div>`}function gc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function bc(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return wt(ss(t));let r={};for(let l of ir)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let d=!1;for(let _ of ir){let m=c[_];typeof m=="number"&&Number.isFinite(m)&&(r[_]+=m,n=!0,d=!0)}if(d){o+=1;let _=c.total_cost_usd;typeof _=="number"&&Number.isFinite(_)&&(s+=_,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?zt(r):null}var yc="bdui.monitor.done-range",vc="bdui.monitor.running_sort";function l_(){try{let e=window.localStorage.getItem(yc);return Mt(e)?e:It}catch{return It}}function c_(e){try{window.localStorage.setItem(yc,e)}catch{}}function d_(){try{return window.localStorage.getItem(vc)==="repo"?"repo":"started"}catch{return"started"}}function u_(e){try{window.localStorage.setItem(vc,e)}catch{}}var wc="tab:monitor:pipeline",p_=1e3,f_=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function hc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${fc(e,t)}
  </div>`}function kc(e,t){let r=st("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.now||(()=>Date.now()),d=t.confirm||(P=>typeof globalThis.confirm!="function"||globalThis.confirm(P)),_=l_(),m=d_();function b(){let P=Jt.find(H=>H.value===_);return P?P.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let k=Zo(null,null),N=new Map,F=null,E=null;async function W(P,H,L,K,ee=!0){if(!o||!L)return null;let le=await o(P,{...H,root_dir:L,expected_revision:K});if(le&&le.conflict&&ee){le.queue&&N.set(L,le.queue);let ge=le.queue&&typeof le.queue.revision=="number"?le.queue.revision:K;le=await o(P,{...H,root_dir:L,expected_revision:ge})}return le&&le.queue&&L&&N.set(L,le.queue),le}function J(P,H){let L=N.get(P),K=s&&s.get?s.get():null,ee=(Array.isArray(K)?K:[]).find(ge=>ge?.root_dir===P);return(L||ee)?.merge_queue?.find(ge=>ge.bead_id===H)?.continuation_action}async function x(P,H,L,K){let ee=await W(P,H,L,K),le=N.get(L)?.revision??ee?.queue?.revision??K;return ar(ee,(ge,xe)=>W(P,{...H,continuation:ge,decision_token:xe},L,le,!1),{refresh:ge=>W(P,H,L,ge?.queue?.revision??N.get(L)?.revision??le,!1)})}async function w(P,H,L,K){let ee=await ar({continuation_mismatch:K},(ge,xe)=>W("worker-merge-queue-add",{bead_id:H,continuation:ge,decision_token:xe},P,L,!1)),le=ee?.queue?.merge_queue?.find(ge=>ge.bead_id===H)?.continuation_action;ee?.applied!==!0&&le?.continuation===null&&le.mismatch&&await w(P,H,ee.queue.revision,le.mismatch)}async function R(P,H,L){let K=await W("worker-discard",P,H,L);if(K&&K.discarded===!0){ce(Os(K),"success",5e3);return}if(K&&K.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${K.reason}`,"error");return}if(K&&K.accepted&&K.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(K&&K.accepted){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${K.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}K&&!K.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function q(P,H,L){return!o||!L?null:await o(P,{...H,root_dir:L})}async function X(P){if(!o||!P&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let H=await o("monitor-auto-toggle",{on:P}),L=H&&Array.isArray(H.failed)?H.failed:[];L.length>0&&ce(`\uC790\uB3D9\uD654 ${P?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${L.map(K=>K.root_dir).join(", ")}`,"error",3200)}async function fe(){let P=new Map;for(let H of k.pr_wait)P.has(H.root_dir)||P.set(H.root_dir,H.expected_revision);for(let[H,L]of P)await W("worker-merge-queue-add-all",{},H,L)}let ae=null,ie=!1,oe=null;function Fe(){oe!==null&&clearTimeout(oe),oe=setTimeout(()=>{oe=null,ie=!1},0)}function Ue(P){let H=P.target;return typeof H?.closest=="function"?H.closest(".mon-group"):null}function He(P){let H=Ue(P);return!H||!ae?null:(H.getAttribute("data-root-dir")||"")===ae.root_dir?H:null}function Ke(){for(let P of Array.from(A.querySelectorAll(".mon-group--drag-over")))P.classList.remove("mon-group--drag-over")}function Ge(P){let H=P.target,L=typeof H?.closest=="function"?H.closest('.mon-card[draggable="true"]'):null;if(L){ae={bead_id:L.getAttribute("data-issue-id")||"",lane:L.getAttribute("data-lane")||"",root_dir:L.getAttribute("data-root-dir")||"",revision:Number(L.getAttribute("data-revision")||0)||0,queue_index:Number(L.getAttribute("data-queue-index")),queue_length:Number(L.getAttribute("data-queue-length")),place_index:Number(L.getAttribute("data-place-index"))},ie=!0;try{P.dataTransfer?.setData("text/plain",ae.bead_id),P.dataTransfer&&(P.dataTransfer.effectAllowed="move")}catch{}}}function De(P){let H=He(P);H&&(P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="move"),H.classList.add("mon-group--drag-over"))}function he(P){Ue(P)?.classList.remove("mon-group--drag-over")}function Pe(){ae=null,Ke(),Fe()}function we(P){let H=He(P),L=ae;if(ae=null,Ke(),!H||!L||!L.bead_id)return;P.preventDefault();let K=P.target,ee=typeof K?.closest=="function"?K.closest('.mon-card[data-lane="queue"]'):null,le=ee&&H.contains(ee)?Number(ee.getAttribute("data-queue-index")):NaN;if(L.lane==="runnable"){let T=Number.isFinite(le)?le:L.place_index;if(!Number.isFinite(T))return;W("worker-queue-place",{bead_id:L.bead_id,index:T},L.root_dir,L.revision);return}if(L.lane!=="queue"||ee&&ee.getAttribute("data-issue-id")===L.bead_id)return;let ge=L.queue_index,xe=Number.isFinite(le)?ge>le?le:le-1:L.queue_length-1;!Number.isFinite(xe)||xe<0||xe===ge||W("worker-queue-reorder",{bead_id:L.bead_id,to_index:xe},L.root_dir,L.revision)}function Ee(P){let H={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return i`${mc({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},running_sort:m,done_range:_,token_total:bc(k.done),token_tooltip:gc(b())})}
      <div class="worker-lanes mon-lanes">
        ${f_.map(L=>{let K=H[L.lane],ee=L.lane==="queue"?k.queue_groups.length>0?i`${k.queue_groups.map(le=>i`<div
                        class="mon-group"
                        data-root-dir=${le.root_dir}
                      >
                        ${_c(le)}
                        <div class="mon-group__list">
                          ${le.items.map(ge=>hc(ge,P))}
                        </div>
                      </div>`)}`:void 0:K.length>0?i`${K.map(le=>hc(le,P))}`:void 0;return Yt({id:`monitor-${L.lane}`,lane:L.pane,title:L.lane==="done"?`\uC644\uB8CC\xB7${b()}`:L.title,items:K,empty:L.empty,body:ee,live:L.lane==="running"&&K.length>0,header_control:L.lane==="pr_wait"&&K.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function _e(){let P=s&&s.get?s.get():null,H=s&&s.getWorkspacesState?s.getWorkspacesState():[],L=c();k=Zo(P,H,{done_since:Cr(_,L),running_sort:m}),je(Ee(L),A)}function re(P,H){let L=a?a():void 0;if(!H||!L||H===L||!l){n(P);return}l(H).then(()=>{n(P)}).catch(K=>{r("workspace switch for %s failed: %o",H,K)})}function G(P){return{root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0}}function $e(P,H){let{root_dir:L,revision:K}=G(P),ee=P.getAttribute("data-issue-id")||"",le=H.dataset.attemptId||P.getAttribute("data-attempt-id")||"",ge=H.classList;if(ge.contains("worker-card__place")){W("worker-queue-place",{bead_id:ee,index:Number(P.getAttribute("data-place-index")||0)||0},L,K);return}if(ge.contains("mon-op--up")||ge.contains("mon-op--down")){let xe=Number(P.getAttribute("data-queue-index")||0)||0,T=ge.contains("mon-op--up")?xe-1:xe+1;if(T<0)return;W("worker-queue-reorder",{bead_id:ee,to_index:T},L,K);return}if(ge.contains("mon-op--remove")){W("worker-queue-remove",{bead_id:ee},L,K);return}if(ge.contains("mon-op--pause")){q("worker-attempt-pause",{attempt_id:le},L);return}if(ge.contains("mon-op--discard")){if(!d(Sn(ee,"unmerged")))return;R({bead_id:ee,...le?{attempt_id:le}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},L,K);return}if(ge.contains("mon-op--resume")){Gr().then(xe=>{if(xe!==null)return x("worker-attempt-resume",{attempt_id:le,...xe!==""?{instructions:xe}:{}},L,K)});return}if(ge.contains("mon-op--dismiss")){W("worker-attempt-dismiss",{attempt_id:le},L,K);return}if(ge.contains("worker-mini__merge")){let xe=J(L,ee);xe?.mismatch&&xe.continuation===null?w(L,ee,K,xe.mismatch):W("worker-merge-queue-add",{bead_id:ee},L,K);return}if(ge.contains("worker-mini__merge-cancel")){W("worker-merge-queue-remove",{bead_id:ee},L,K);return}if(ge.contains("worker-mini__discard")){let xe=H.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Sn(ee,xe)))return;R({bead_id:ee,...le?{attempt_id:le}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},L,K);return}if(ge.contains("worker-mini__revise-fix")){x("worker-revise-fix",{bead_id:ee},L,K);return}ge.contains("worker-mini__revise-approve")&&W("worker-revise-approve",{bead_id:ee},L,K)}function I(P){let H=ie;ie=!1;let L=P.target;if(!L||typeof L.closest!="function"||L.closest("dialog")||L.closest("a"))return;let K=L.closest(".mon-running-sort");if(K){P.preventDefault(),m=K.getAttribute("data-sort")==="repo"?"repo":"started",u_(m),_e();return}let ee=L.closest(".mon-auto-all");if(ee){P.preventDefault(),X(ee.getAttribute("data-on")==="true");return}if(L.closest(".mon-merge-all")){P.preventDefault(),fe();return}let ge=L.closest(".mon-ctl--advance");if(ge){P.preventDefault();let{root_dir:Y,revision:$}=G(ge);W("worker-automation-toggle",{on:ge.getAttribute("data-on")==="true"},Y,$);return}let xe=L.closest(".mon-ctl--merge-auto");if(xe){P.preventDefault();let{root_dir:Y,revision:$}=G(xe);W("worker-merge-auto-toggle",{on:xe.getAttribute("data-on")==="true"},Y,$);return}let T=L.closest(".mon-card");if(!T)return;let B=L.closest("button");if(B){P.preventDefault(),$e(T,B);return}let Q=T.getAttribute("data-issue-id");Q&&!H&&(P.preventDefault(),re(Q,T.getAttribute("data-root-dir")||""))}function S(P){let H=P.target;if(!H||typeof H.closest!="function")return;let L=H.closest(".mon-done-range");if(L){_=Mt(L.value)?L.value:It,c_(_),_e();return}let K=H.closest(".mon-slots__input");if(!K)return;let{root_dir:ee,revision:le}=G(K),ge=Number(K.value);if(!Number.isFinite(ge))return;let xe=Math.max(Tn,Math.floor(ge));W("worker-queue-set-slots",{slots:xe},ee,le)}e.addEventListener("click",I),e.addEventListener("change",S),e.addEventListener("dragstart",Ge),e.addEventListener("dragover",De),e.addEventListener("dragleave",he),e.addEventListener("drop",we),e.addEventListener("dragend",Pe),s&&typeof s.subscribe=="function"&&(F=s.subscribe(()=>{try{N.clear(),_e()}catch{}}));function me(){E!==null&&(clearInterval(E),E=null)}function Ae(){oe!==null&&(clearTimeout(oe),oe=null)}return{load(){r("load"),_e(),E===null&&(E=setInterval(()=>{try{_e()}catch{}},p_))},pause(){me()},clear(){me(),Ae(),F&&(F(),F=null),e.removeEventListener("click",I),e.removeEventListener("change",S),e.removeEventListener("dragstart",Ge),e.removeEventListener("dragover",De),e.removeEventListener("dragleave",he),e.removeEventListener("drop",we),e.removeEventListener("dragend",Pe),e.replaceChildren()}}}function $c(e,t,r){let n=st("views:nav"),s=null;function o(c){return d=>{d.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),d=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
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
    `}function l(){je(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),je(i``,e)}}}var xc=["bug","feature","task","epic","chore"];function Sc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ac=["Critical","High","Medium","Low","Backlog"];function Ec(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let w=document.createElement("option");w.value="",w.textContent="\u2014 Select \u2014",o.appendChild(w);for(let R of xc){let q=document.createElement("option");q.value=R,q.textContent=Sc(R),o.appendChild(q)}a.replaceChildren();for(let R=0;R<=4;R+=1){let q=document.createElement("option");q.value=String(R);let X=Ac[R]||"Medium";q.textContent=`${R} \u2013 ${X}`,a.appendChild(q)}}A();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function N(w){s.disabled=w,o.disabled=w,a.disabled=w,l.disabled=w,c.disabled=w,_.disabled=w,m.disabled=w,m.textContent=w?"Creating\u2026":"Create"}function F(){d.textContent=""}function E(w){d.textContent=w}function W(){try{let w=window.localStorage.getItem("beads-ui.new.type");w?o.value=w:o.value="";let R=window.localStorage.getItem("beads-ui.new.priority");R&&/^\d$/.test(R)?a.value=R:a.value="2"}catch{o.value="",a.value="2"}}function J(){let w=o.value||"",R=a.value||"";w.length>0&&window.localStorage.setItem("beads-ui.new.type",w),R.length>0&&window.localStorage.setItem("beads-ui.new.priority",R)}async function x(){F();let w=String(s.value||"").trim();if(w.length===0){E("Title is required"),s.focus();return}let R=Number(a.value||"2");if(!(R>=0&&R<=4)){E("Priority must be 0..4"),a.focus();return}let q=String(o.value||""),X=String(c.value||""),fe={title:w};q.length>0&&(fe.type=q),String(R).length>0&&(fe.priority=R),X.length>0&&(fe.description=X),N(!0);try{await t("create-issue",fe)}catch{N(!1),E("Failed to create issue");return}J(),N(!1),k()}return r.addEventListener("cancel",w=>{w.preventDefault(),k()}),b.addEventListener("click",()=>k()),_.addEventListener("click",()=>k()),r.addEventListener("keydown",w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),x())}),n.addEventListener("submit",w=>{w.preventDefault(),x()}),{open(){n.reset(),F(),W();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var __=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function m_(e,t){return co(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Tc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=m_(n,e);return i`<button
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
  `}function Cc(e,t,r){return i`
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
  `}function Rc(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${__.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var g_=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Kt="";function Zt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ic(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||($=>ce($,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="session",c=!1,d="",_={},m={},b=[],A=!1,k=null,N={},F="",E="",W=!1,J=!1,x=!1,w=null;function R(){let $=t.queueStore?.get();return Zt($)?$.runner_catalog:null}function q(){let $=t.implPresetStore?.get();return Zt($)&&Array.isArray($.presets)?$:null}async function X(){A=!0,ee();try{let $=await r("get-session-defaults",{});_=Zt($?.values)?{...$.values}:{},m={..._},b=Array.isArray($?.warnings)?$.warnings:[]}catch($){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}finally{A=!1,ee()}}async function fe(){let $=Al(_,m);if(Object.keys($).length!==0){try{let M=await r("set-session-defaults",{values:$});_=Zt(M?.values)?{...M.values}:{},m={..._},b=Array.isArray(M?.warnings)?M.warnings:[]}catch(M){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}ee()}}function ae($,M){M===Kt?delete m[$]:m[$]=M,ee(),fe()}async function ie(){let $=t.queueStore?.get();if(!Zt($))return;let M={orchestration_model:$.orchestration_model??null,orchestration_effort:$.orchestration_effort??null,orchestration_speed:$.orchestration_speed??null},V=El(M,{...M,...N});if(Object.keys(V).length!==0){try{let Le=await r("worker-queue-set-orchestration-defaults",{expected_revision:$.revision,values:V});if(Le&&Le.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}N={}}catch(Le){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Le instanceof Error?Le.message:String(Le)}`)}ee()}}function oe($,M){N[$]=M===Kt?null:M,ee(),ie()}async function Fe($){let M=t.queueStore?.get();if(!(!Zt(M)||$<1)){try{await r("worker-queue-set-slots",{expected_revision:M.revision,slots:$})}catch(V){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}ee()}}function Ue(){let $={};for(let M of $l){let V=m[M];typeof V=="string"&&V.length>0&&($[M]=V)}return $}async function He(){let $=q();if(!$)return;let M=Ue();if(Object.keys(M).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let V=($.presets||[]).find(Ie=>Ie.id===F),Le=E.trim()||(V?V.name:"");if(!Le){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Ie=V?await r("impl-preset-update",{expected_revision:$.revision,id:V.id,name:Le,settings:M}):await r("impl-preset-create",{expected_revision:$.revision,name:Le,settings:M});if(Ie&&Ie.applied){if(E="",!V&&Array.isArray(Ie.presets)){let qe=Ie.presets.find(Re=>Re.name===Le);F=qe?qe.id:F}ee()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ee()}catch(Ie){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Ie instanceof Error?Ie.message:String(Ie)}`)}}async function Ke(){let $=q();if(!(!$||F.length===0))try{let M=await r("impl-preset-delete",{expected_revision:$.revision,id:F});M&&M.applied?(F="",ee()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ee())}catch(M){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}}async function Ge(){let $=q();if(!(!$||F.length===0)){try{let M=await r("apply-impl-preset-global",{preset_id:F,expected_revision:$.revision});M&&M.applied?(_=Zt(M.values)?{...M.values}:{},m={..._},b=Array.isArray(M.warnings)?M.warnings:[]):M&&M.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(M){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${M instanceof Error?M.message:String(M)}`)}ee()}}async function De(){J=!0,x=!1,ee();try{let $=await r("get-worker-system-prompt",{});!$||typeof $!="object"||Array.isArray($)?x=!0:w=$}catch{x=!0}finally{J=!1,ee()}}function he(){if(W=!W,W&&!w){De();return}ee()}function Pe(){let $=Zr({loading:J,error:x});if($)return $;if(!w)return"";let M=Array.isArray(w.variants)?w.variants:[];return i`<div class="settings-dialog__sp-body">
      ${w.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${w.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${M.map(V=>i`<div class="settings-dialog__sp-variant" data-variant=${V.key}>
            <div class="settings-dialog__sp-cond">${V.condition}</div>
            ${ur(V.label,V.system_prompt)}
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
        aria-expanded=${W?"true":"false"}
        @click=${he}
      >
        ${W?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${W?Pe():""}
    </section>`}function Ee($,M,V,Le,Ie,qe){let Re=Ie[$]??Kt;return i`<select
      class=${Re===Kt?"settings-dialog__unset":""}
      data-key=${$}
      aria-label=${M}
      ?disabled=${qe===!0}
      .value=${Mr(String(Re))}
      @change=${Ze=>Le($,String(Ze.target.value))}
    >
      <option value=${Kt} ?selected=${Re===Kt}>(기본)</option>
      ${V.map(Ze=>i`<option value=${Ze} ?selected=${Ze===Re}>
            ${Ze===qt?"\uC790\uB3D9":Ze}
          </option>`)}
    </select>`}function _e($,M,V,Le,Ie,qe=!1){return i`<div
      class=${`settings-dialog__row${qe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${M}</span>
      <span class="settings-dialog__controls">
        ${Ee($,M,V,Le,Ie,qe)}
      </span>
    </div>`}function re($,M,V,Le,Ie){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${M}-on)`}
        ></i>
        ${$}
      </span>
      <span class="settings-dialog__controls">
        ${Ee(V,`${$} \uBAA8\uB378`,Le,ae,m,!1)}
        ${Ee(Ie,`${$} effort`,Ss,ae,m,!1)}
      </span>
    </div>`}function G(){let $=R(),M=Sl(m),V=m.impl_runtime,Le=m.impl_model,Ie=q();return i`
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
        ${b.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${A?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
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
                        @click=${()=>ae("workflow_mode",Kt)}
                      >
                        (기본)
                      </button>
                      ${$s.map(qe=>i`<button
                            type="button"
                            data-mode=${qe}
                            aria-pressed=${String(m.workflow_mode===qe)}
                            @click=${()=>ae("workflow_mode",qe)}
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
                ${re("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",$n,"spec_review_effort")}
                ${re("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",xs,"plan_review_effort")}
                ${re("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",$n,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${_e("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",ws,ae,m)}
                ${_e("impl_runtime","\uC704\uC784 \uB300\uC0C1",ks,ae,m,M)}
                ${_e("impl_model","\uBAA8\uB378",As($,V),ae,m,M)}
                ${_e("impl_effort","effort",Xr($,V,Le),ae,m,M)}
                ${_e("impl_speed","\uC18D\uB3C4",kn,ae,m,M)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Mr(F)}
                  @change=${qe=>{F=String(qe.target.value),ee()}}
                >
                  <option value="" ?selected=${F===""}>
                    구현 프리셋…
                  </option>
                  ${(Ie?.presets||[]).map(qe=>i`<option
                        value=${qe.id}
                        ?selected=${qe.id===F}
                      >
                        ${qe.name}
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
                  @input=${qe=>{E=String(qe.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${He}
                >
                  ${F?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${F.length===0}
                  @click=${Ke}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function $e(){let $=t.queueStore?.get(),M=R(),V={orchestration_model:N.orchestration_model??(Zt($)?$.orchestration_model:null),orchestration_effort:N.orchestration_effort??(Zt($)?$.orchestration_effort:null),orchestration_speed:N.orchestration_speed??(Zt($)?$.orchestration_speed:null)},Le=Es(M,k),Ie=Xr(M,k||void 0,V.orchestration_model||qt).filter(Re=>Re!==qt),qe=Zt($)&&typeof $.slots=="number"?$.slots:2;return i`
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
                @change=${Re=>{let Ze=String(Re.target.value);k=Ze===Kt?null:Ze,ee()}}
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
          ${_e("orchestration_model","\uBAA8\uB378",Le,oe,V)}
          ${_e("orchestration_effort","effort",Ie,oe,V)}
          ${_e("orchestration_speed","\uC18D\uB3C4",kn,oe,V)}
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
                  @click=${()=>Fe(qe-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${qe}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Fe(qe+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${we()}
      </section>
    `}function I(){let $=n.get();return i`
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
        ${$?i`
              ${Tc($,s(),P)}
              ${Cc($,d,{onDraft:M=>{d=M},onAdd:H,onRemove:L})}
              ${Rc($,K)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function S($){let M=n.get();if(M)try{let V=await r("display-policy-set",{expected_revision:M.revision,policy:$(M)});me(V),V&&V.conflict&&V.policy&&(V=await r("display-policy-set",{expected_revision:V.policy.revision,policy:$(V.policy)}),me(V)),V&&V.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function me($){$&&$.policy&&typeof $.policy=="object"&&n.set($.policy)}function Ae($){S($)}function P($){let M=n.get();if(!M)return;let V=!b_($,M);Ae(Le=>h_($,Le,V))}function H(){let $=d.trim();$.length!==0&&(d="",Ae(M=>M.hidden_prefixes.includes($)?{hidden_prefixes:M.hidden_prefixes}:{hidden_prefixes:[...M.hidden_prefixes,$]}),ee())}function L($){Ae(M=>({hidden_prefixes:M.hidden_prefixes.filter(V=>V!==$)}))}function K($){let M=n.get();if(!M)return;let V=M.chips[$]===!1;Ae(()=>({chips:{[$]:V}}))}function ee(){je(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${g_.map($=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${$.id}
                  aria-selected=${String(l===$.id)}
                  aria-controls=${`settings-pane-${$.id}`}
                  @click=${()=>le($.id)}
                >
                  <span class="settings-dialog__glyph">${$.glyph}</span>
                  ${$.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${Y}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${G()} ${$e()} ${I()}
          </div>
        </div>
      `,a)}function le($){l=$,ee()}let ge=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",ge),a.addEventListener("cancel",ge);let xe=$=>{$.target===a&&Y()};a.addEventListener("click",xe);let T=null;n.subscribe&&(T=n.subscribe(()=>{c&&ee()}));let B=null;t.implPresetStore?.subscribe&&(B=t.implPresetStore.subscribe(()=>{c&&ee()}));function Q($="session"){c||(c=!0,t.onOpenChange?.(!0),l=$,d="",N={},ee(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),X())}function Y(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Q,close:Y,sessionDraft:()=>({...m}),destroy(){c=!1,a.removeEventListener("close",ge),a.removeEventListener("cancel",ge),a.removeEventListener("click",xe),T&&(T(),T=null),B&&(B(),B=null),a.remove()}}}function b_(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function h_(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var y_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Lc(e){return String(e).padStart(2,"0")}function v_(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function w_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Lc(n.getHours())}:${Lc(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${y_[n.getMonth()]} ${n.getDate()} ${o}`;return`${v_(r,t)} \xB7 ${l}`}function k_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Oc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Pc(e){let t=!1,r=null,n=new Map;function s(){je(i``,e),e.hidden=!0}function o(){let c=Oc.filter(_=>n.has(_.key));if(c.length===0){s();return}let d=Date.now();je(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(_=>{let m=n.get(_.key),b=typeof m.ageSeconds=="number"&&m.ageSeconds>600,A=b?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${_.label} usage`}
          >
            <span class="usage-meter__provider">${_.label}</span>
            ${m.windows.map(k=>{let N=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,F=Math.min(100,Math.max(0,N)),W=`resets ${w_(k.resetsAt,d)}${b?` \xB7 ${A}`:""}`;return i`<span
                class="usage-meter__window ${k_(F)}"
                style=${`--progress: ${F}%`}
                title=${W}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${F}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let d=await fetch(c.endpoint);if(!d.ok)return null;let _=await d.json();return!_||_.available!==!0||!Array.isArray(_.windows)?null:_}catch{return null}}async function l(){let c=await Promise.all(Oc.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of c)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function Mc(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),l=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!l&&typeof s.dismissed_at!="number"}}var $_="worker-ineligible";function Jo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Dc(e){return Jo(e).includes($_)}var x_="worker-serial";function ea(e){return Jo(e).includes(x_)}function ta(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var S_=new Set(["done","failed","orphaned","stopped","discarded"]);function Nc(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,l=new Map,c=!1,d=null,_=null;function m(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function b(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function A(){let T=m(),B=new Set;for(let Q of Object.values(T.attempts||{})){let Y=Q;Y&&typeof Y.bead_id=="string"&&!S_.has(Y.status)&&B.add(Y.bead_id)}for(let Q of Array.isArray(T.pr_wait)?T.pr_wait:[])Q&&typeof Q.bead_id=="string"&&B.add(Q.bead_id);for(let Q of Object.values(T.discard_operations||{})){let Y=Q;Y&&Y.phase!=="done"&&typeof Y.bead_id=="string"&&B.add(Y.bead_id)}return B}function k(T){return T.filter(B=>N(B)===null)}function N(T){let B=m();for(let Q of Array.isArray(B.serial_lanes)?B.serial_lanes:[])if(Array.isArray(Q?.entries)&&Q.entries.some(Y=>Y.bead_id===T))return Q.id;return(Array.isArray(B.queue)?B.queue:[]).some(Q=>Q.bead_id===T)?"parallel":null}function F(T,B){let Q=a.get(T);return Q||[...B.order]}function E(T){if(T.length<2)return!1;let B=N(T[0]);if(!B||B==="parallel")return!1;let Q=m(),Y=(Array.isArray(Q.serial_lanes)?Q.serial_lanes:[]).find(M=>M.id===B)?.entries.map(M=>M.bead_id);if(!Array.isArray(Y))return!1;let $=T.map(M=>Y.indexOf(M));return $.every(M=>M>=0)&&$.every((M,V)=>V===0||M>$[V-1])}function W(){let T=m(),B=Array.isArray(T.serial_lanes)?T.serial_lanes:[],Q=B.find(Y=>Array.isArray(Y.entries)&&Y.entries.length===0);return Q?Q.id:B[0]?.id||"s1"}function J(T){let B=m().bead_titles||{};return typeof B[T]=="string"?B[T]:T}async function x(T,B){if(!s||c)return null;c=!0,P();try{return await s(T,B)}finally{c=!1,P()}}async function w(T){n?.setPending?.(!0);try{let B=await x("worker-parallel-analysis-start",{force:T});B&&B.applied===!1&&B.reason&&ce(`\uBD84\uC11D \uC2E4\uD328: ${B.reason}`,"error",2800)}finally{n?.setPending?.(!1)}}async function R(){let T=b().job;!s||!T||await s("worker-parallel-analysis-cancel",{job_id:T.job_id})}function q(){return m().runner_catalog}function X(T){return Object.keys(q()?.runners?.[T]?.models||{})}function fe(T){let B=X(T),Q=q()?.runners?.[T]?.default_model;return typeof Q=="string"&&B.includes(Q)?Q:B[0]||""}function ae(){let T=b().settings,B=d||T.runner||"claude",Q=X(B),Y=d?fe(B):T.model||Q[0]||"",$=ta(q(),B,Y),M=T.effort||"",V=$.includes(M)?M:$[0]||"";return{runner:B,model:Y,effort:V,models:Q,efforts:$}}async function ie(T){let B=b().settings,Q=await x("worker-parallel-analysis-settings-update",{expected_revision:B.revision,runner:T.runner,model:T.model,effort:T.effort});(!Q||Q.applied!==!0)&&(d=null,P(),Q&&Q.reason&&ce(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${Q.reason}`,"error",2800))}function oe(T){d=T,P();let B=ae();ie({runner:T,model:B.model,effort:B.effort})}function Fe(T){let B=ae(),Q=ta(q(),B.runner,T);ie({runner:B.runner,model:T,effort:Q.includes(B.effort)?B.effort:Q[0]||""})}function Ue(T){let B=ae();ie({runner:B.runner,model:B.model,effort:T})}async function He(T,B){if(!s||c)return;let Q=F(T,B),Y=b();if(Q.length<2||!Y.last_good){ce("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let $=l.get(T)||W(),M=()=>({snapshot_digest:Y.last_good.identity_digest,group_index:T,lane:$,ordered_bead_ids:Q,expected_revision:m().revision});c=!0,P();try{let V=await s("worker-parallel-analysis-submit",M());V&&V.queue&&r&&r.set(V.queue),V&&V.applied!==!0&&V.conflict===!0&&(V=await s("worker-parallel-analysis-submit",M()),V&&V.queue&&r&&r.set(V.queue)),V&&V.applied===!0?(a.delete(T),ce(`\uC9C1\uB82C \uB808\uC778 ${$}\uC5D0 ${Q.length}\uAC1C \uBC30\uCE58`,"success")):ce(`\uC81C\uCD9C \uAC70\uBD80: ${V?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{c=!1,P()}}function Ke(T,B,Q){a.set(T,F(T,B).filter(Y=>Y!==Q)),P()}function Ge(T){a.delete(T),P()}function De(T,B,Q,Y){let $=[...F(T,B)],M=$.indexOf(Q),V=M+Y;M<0||V<0||V>=$.length||($.splice(V,0,...$.splice(M,1)),a.set(T,$),P())}function he(){let T=b().settings,B=Object.keys(q()?.runners||{}),Q=ae();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Y=>oe(Y.target.value)}
        >
          ${B.map(Y=>i`<option
                value=${Y}
                ?selected=${Q.runner===Y}
              >
                ${Y}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${Y=>Fe(Y.target.value)}
        >
          ${Q.models.map(Y=>i`<option
                value=${Y}
                ?selected=${Q.model===Y}
              >
                ${Y}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${Y=>Ue(Y.target.value)}
        >
          ${Q.efforts.map(Y=>i`<option
                value=${Y}
                ?selected=${Q.effort===Y}
              >
                ${Y}
              </option>`)}
        </select>
      </label>
      ${Pe(T)}
    </div>`}function Pe(T){return!Ee(T)||we(T)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:T.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${T.runner}/${T.model} · effort
        ${T.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:T.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function we(T){return T.is_default===!0&&T.compatible===!1}function Ee(T){return!!(T.runner&&T.model&&T.effort)}function _e(T){return Ee(T)&&T.compatible!==!1}function re(T){let B=Math.max(0,Math.floor(T/1e3)),Q=Math.floor(B/60),Y=B%60;return`${Q}:${String(Y).padStart(2,"0")}`}function G(T){let B=T.job;if(B){let Q=typeof B.started_at=="number"?B.started_at:0,Y=`${B.runner||"?"}/${B.model||"?"}`,$=Q?` \xB7 \uACBD\uACFC ${re(Date.now()-Q)}`:"";return i`<span class="pa-meta__progress"
        >분석 중 — ${Y} · effort ${B.effort||"?"}${$}</span
      >`}return $e()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function $e(){return n?.isPending?.()===!0}function I(T){let B=m(),Q=(Array.isArray(B.queue)?B.queue.length:0)+(Array.isArray(B.serial_lanes)?B.serial_lanes:[]).reduce((V,Le)=>V+(Array.isArray(Le.entries)?Le.entries.length:0),0),Y=!!T.job,$=_e(T.settings),M=Y||c||$e();return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${Q}</span>
      ${T.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(T.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${G(T)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!$||M}
        @click=${()=>{w(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!$||M}
        @click=${()=>{w(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!Y}
        @click=${()=>{R()}}
      >
        취소
      </button>
    </div>`}function S(T,B){let Q=F(T,B),Y=A(),$=Q.filter(Re=>Y.has(Re)),M=k(Q),V=E(Q),Le=Array.isArray(m().serial_lanes)?m().serial_lanes:[],Ie=l.get(T)||W(),qe=B.eligible!==!0||Q.length<2||$.length>0||M.length>0||V||c;return i`<section class="pa-group" data-group-index=${String(T)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${B.confidence}</span>
        ${B.categories.map(Re=>i`<span class="pa-group__category">${Re}</span>`)}
        ${V?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${B.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${M.length>0?i`<span class="pa-group__stale"
              >stale — ${M.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${B.reason}</p>
      <ol class="pa-group__members">
        ${Q.map((Re,Ze)=>i`<li class="pa-member" data-bead-id=${Re}>
              <span class="pa-member__seq">${Ze+1}</span>
              <span class="pa-member__title">${J(Re)}</span>
              ${Y.has(Re)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Re}
                ?disabled=${Ze===0}
                aria-label=${`${Re} \uC704\uB85C`}
                @click=${()=>De(T,B,Re,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Re}
                ?disabled=${Ze===Q.length-1}
                aria-label=${`${Re} \uC544\uB798\uB85C`}
                @click=${()=>De(T,B,Re,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Re}
                aria-label=${`${Re} \uC81C\uC678`}
                @click=${()=>Ke(T,B,Re)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${B.evidence.map(Re=>i`<li class="pa-evidence">
              <code>${Re.path}</code>
              <span class="pa-evidence__locator">${Re.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Ge(T)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Re=>{l.set(T,Re.target.value),P()}}
          >
            ${Le.map((Re,Ze)=>i`<option
                  value=${Re.id}
                  ?selected=${Ie===Re.id}
                >
                  직렬 ${Ze+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${qe}
          @click=${()=>{He(T,B)}}
        >
          제출
        </button>
      </footer>
    </section>`}function me(T){let B=Array.isArray(T.issues)?T.issues:[],Q=B.filter($=>$.verdict==="parallel_ok").length,Y=B.filter($=>$.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${Q}</span>
      <span>uncertain ${Y}</span>
    </div>`}function Ae(){let T=H&&!!b().job;if(T&&_===null){_=setInterval(()=>P(),1e3);return}!T&&_!==null&&(clearInterval(_),_=null)}function P(){let T=b();d&&T.settings.runner===d&&(d=null);let B=T.last_good?.result;Ae(),je(i`
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
            ${he()} ${I(T)}
            ${B?i`${B.groups.map((Q,Y)=>S(Y,Q))}
                ${B.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${me(B)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let H=!1,L=()=>{H=!1,Ae()},K=T=>{T.target===T.currentTarget&&xe()};o.addEventListener("close",L),o.addEventListener("cancel",L),o.addEventListener("click",K);let ee=null;r&&r.subscribe&&(ee=r.subscribe(()=>{H&&P()}));let le=null;n&&n.subscribe&&(le=n.subscribe(()=>{H&&P()}));function ge(){H||(H=!0,P(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function xe(){H&&(H=!1,Ae(),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:ge,close:xe,destroy(){H=!1,_!==null&&(clearInterval(_),_=null),o.removeEventListener("close",L),o.removeEventListener("cancel",L),o.removeEventListener("click",K),ee&&(ee(),ee=null),le&&(le(),le=null),o.remove()}}}var qc=new Set(["sh","bash","zsh","dash","ksh"]),Fc=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Bc(e){let t=e.split("/");return t[t.length-1]||""}function A_(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Bc(r[0]);if(n!=="env")return qc.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&qc.has(Bc(s))}function E_(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function T_(e){let t=[],r=0;Fc.lastIndex=0;for(let n of e.matchAll(Fc)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:E_(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function C_(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function jc(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",l="",c=0,d=null,_=!1;function m(w,R){return R?T_(w).map(q=>q.kind==="plain"?q.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${q.kind}"
            >${q.text}</span
          >`):w}function b(){if(!s)return i``;let w=o==="ready"&&A_(a),R=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>J()}
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
              @click=${()=>{k()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>J()}
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
                  ${R.map((q,X)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${X+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(q,w)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function A(){je(b(),n)}async function k(){if(o!=="ready")return;let w=await or(a);ce(w?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",w?"success":"error")}function N(w){w.key==="Escape"&&s&&(w.preventDefault(),J())}function F(){_||(document.addEventListener("keydown",N),_=!0)}function E(){_&&(document.removeEventListener("keydown",N),_=!1)}async function W(w,R=null){let q=++c;F(),s={...w},d=R||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",l="",A(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let fe=t?t():"";if(!fe){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",A();return}if(!r){o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",A();return}let ae="/api/repo-ops-script?workspace="+encodeURIComponent(fe)+"&lane="+encodeURIComponent(w.lane)+"&base_sha="+encodeURIComponent(w.base_sha);try{let ie=await r(ae),oe=await ie.json().catch(()=>({}));if(q!==c)return;if((t?t():"")!==fe){J();return}if(!ie.ok||!oe||oe.ok!==!0){o="error",l=C_(oe&&typeof oe.error=="string"?oe.error:""),A();return}s={lane:oe.lane,base_sha:oe.base_sha,path:oe.path,base_ref:oe.base_ref},a=String(oe.content),o="ready",A()}catch{if(q!==c)return;o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",A()}}function J(){c+=1,E(),s=null,a="",A();let w=d;d=null,w?.isConnected&&w.focus()}function x(){J(),n.remove()}return{open:W,close:J,destroy:x}}function Uc(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let x=o();return typeof x.revision=="number"?x.revision:0}function l(x){t&&x&&x.queue&&typeof x.queue=="object"&&t.set(x.queue)}function c(){let x=o().workspace_info;return x&&typeof x=="object"?x:{}}function d(x,w){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${x}"
      >${w}</span
    >`}function _(x){if(typeof x!="number"||!Number.isFinite(x))return"";let w=x/6e4;return Number.isInteger(w)?`timeout ${w}\uBD84`:`timeout ${Math.round(x/1e3)}\uCD08`}function m(x){let w=_(x);return w?d("config",w):""}function b(x,w,R){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${R.script}
      @click=${q=>{s&&s({lane:x,base_sha:w.base_sha,path:R.script,base_ref:w.base_ref},q.currentTarget)}}
    ></button>`}function A(x){let w=typeof x.base_sha=="string"?x.base_sha:"",R=`${x.source_path||"repo-ops/config.toml"} @ ${x.base_ref||"?"}${w?`@${w.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${R}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${x.verify?i`${b("verify",x,x.verify)}
              ${m(x.verify.timeout_ms)}`:i`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${x.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${x.deploy?i`${b("deploy",x,x.deploy)}
              ${m(x.deploy.timeout_ms)}`:i`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${x.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function k(x){let w=x.repo_ops&&typeof x.repo_ops=="object"?x.repo_ops:null;return w&&(w.status==="resolved"||w.status==="absent")?A(w):w&&(w.status==="pending"||w.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${w.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${w.error_code?i` — <code>${w.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function N(x){if(!r)return;let w=await r("worker-auto-repair-toggle",{on:x,expected_revision:a()});if(l(w),w&&w.conflict){let R=await r("worker-auto-repair-toggle",{on:x,expected_revision:a()});l(R)}n()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function E(x,w,R){return i`<div class="worker-repo-ops__policy-group" data-policy=${R}>
      <div class="worker-repo-ops__policy-label">${x}</div>
      <ul class="worker-repo-ops__policy-list">
        ${w.map(q=>i`<li data-token=${q}>
              ${F[q]||q}
            </li>`)}
      </ul>
    </div>`}function W(x){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${x.map(w=>{let R=[F[w.trigger]||w.trigger];return Number.isInteger(w.attempts_per_operation_attempt)?R.push(`operation\uB2F9 ${w.attempts_per_operation_attempt}\uD68C`):Number.isInteger(w.attempts)?R.push(`${F[w.budget]||w.budget} ${w.attempts}\uD68C`):Number.isInteger(w.sessions_per_user_action)&&R.push(`${w.sessions_per_user_action}\uD68C`,F[w.user_actions]||w.user_actions),w.applies_when&&R.push(F[w.applies_when]||w.applies_when),i`<li data-token=${w.id}>
            <strong>${F[w.id]||w.id}</strong>
            <span>${R.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function J(){let x=o(),w=x.auto_repair!==!1,R=x.repo_operation_policy&&typeof x.repo_operation_policy=="object"?x.repo_operation_policy:null,q=Array.isArray(x.repo_operations)?x.repo_operations:[],X=q.find(oe=>oe.state==="repairing"),fe=q.filter(oe=>oe.state==="failed"||oe.state==="repairing"),ae=fe.length?Math.min(...fe.map(oe=>typeof oe.repair?.remaining=="number"?oe.repair.remaining:0)):R?.auto_repair?.resolution_ladder?.find(oe=>oe.id==="auto_repair_session")?.attempts??1,ie=Array.isArray(R?.auto_repair?.resolution_ladder)?R.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${w}
          @change=${oe=>{N(oe.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${w?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ae}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${X?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${X.repair?.owner_bead||X.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
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
                ${ie.length} · 금지
                ${(R.never_automatic||[]).length}</span
              >
            </summary>
            ${E("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",R.worker_automatic||[],"worker-automatic")}
            ${R.supported===!1||R.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${R.schema_version})`}
                </div>`:W(ie)}
            ${E("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",R.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${k(c())} ${J()}
      </details>`}}}var R_=20,Wc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},zc={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function I_(e,t,r=R_){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Hc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function L_(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Gc(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Vc(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function O_(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(zc,n)?zc[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function P_(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?_t(e.at):""}
      >${Ls(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Hc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Wc,t.kind)?Wc[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Rs(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Is(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Hc(e)}"
          >${L_(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Vc(nc(t.failure_kind,n)):""}
      ${O_(t)}
      ${Gc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Rs(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function M_(e){let t=e.cleanup,r=Dr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?_t(e.at):""}
      >${Ls(e.at)||"\u2014"}</span
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
        ${Ql(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Vc(qs(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Gc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function D_(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?M_(t):P_(t))}
        </ul>`}
  </section>`}function Yc(e,t={}){let r=null;function n(){je(r?D_(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:I_(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var N_="tab:worker:ready",q_="tab:worker:blocked",F_="tab:worker:in-progress",B_="tab:worker:closed",Bs=1,Kc=5;function Zc(e){return wn(e).path.length>0}var Jc="beads-ui.worker.candidate-filter",ra={show_blocked:!1,spec:"all"};function j_(){try{let e=window.localStorage.getItem(Jc);if(!e)return{...ra};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ra};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ra}}}function U_(e){try{window.localStorage.setItem(Jc,JSON.stringify(e))}catch{}}function W_(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),d=n(l);c&&d?s.push(l):!c&&d?o+=1:c&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var z_=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ed="bdui.worker.candidate_sort",H_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],js="spec";function G_(){try{let e=window.localStorage.getItem(ed);return e==="board"||e==="created"||e==="spec"?e:js}catch{return js}}function V_(e){try{window.localStorage.setItem(ed,e)}catch{}}var td="bdui.worker.done-range";function Y_(){try{let e=window.localStorage.getItem(td);return Mt(e)?e:It}catch{return It}}function K_(e){try{window.localStorage.setItem(td,e)}catch{}}var Z_="(max-width: 640px)",rd="beads-ui.worker.lane-collapsed",In={queue:!0,done:!0};function X_(){try{let e=window.localStorage.getItem(rd);if(!e)return{...In};let t=JSON.parse(e);return!t||typeof t!="object"?{...In}:{queue:typeof t.queue=="boolean"?t.queue:In.queue,done:typeof t.done=="boolean"?t.done:In.done}}catch{return{...In}}}function Q_(e){try{window.localStorage.setItem(rd,JSON.stringify(e))}catch{}}function Xc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function J_(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Ir):(n.sort(Vn(r)),t==="board"?n:[...n.filter(Zc),...n.filter(s=>!Zc(s))])}function em(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function tm(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function rm(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Qc(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function nm(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function sm(e){return e==="worker_sessions_busy"?"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911":null}function om(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function am(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function na(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function im(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function lm(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Qc(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Qc(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function cm(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,d=!0,_=null,m=null,b=null,A={},k=!1,N=!1,F={}){let E=!!c&&c.position>0,W=!!c?.continuation_action&&c.continuation_action.continuation===null,J=!!c&&c.active===!0,x=c&&c.failure||null,w=sm(c?c.waiting:null),R=r[e]||null,q=R&&R.gate?R.gate:null,X=R&&R.pr?R.pr:null,fe=im(b),ae=om(c?c.resolution:null),ie=am(c?c.head_review:null),oe=c&&c.head_review||null,Fe=c&&c.authority||null,Ue=!!oe&&["pending","reviewing","revising"].includes(oe.state),He=E&&!J&&(oe?.state==="failed"||!Fe||Fe.source==="automatic"&&!N),Ke=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ae?ae.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":w,Ge=!!q&&q.base_badge==="\uCDA9\uB3CC",De=!!q&&q.enabled===!0,he=Ds({bead_id:e,merge_sha:F.merge_sha,cleanup_cursor:F.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:F.repo_operations}),Pe=Ns(he),we=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!q&&q.tier==="merged",Ee=l&&!!n&&!!q&&q.tier==="merged",_e=He&&(De||Ge||q?.reason==="base_behind"||q?.reason==="review_receipt_missing"||q?.reason==="review_receipt_stale"||we||Ee),re=l&&Ge&&d===!1,G=tr(A,e,{external:l,merge_active:J||he?.step==="merge",merge_queued:E,conflict_active:!!a,cleanup_active:Pe,merged:!!n||q?.tier==="merged"}),$e=!!G.operation,I=!we&&!!n&&n.step==="repo_operations",S=lm({continuation_required:W,merge_step:he,conflict_badge:Ke,conflict_live:ae?.live===!0||a==="running",head_review:oe&&ie?{...ie,state:oe.state,failure_reason:oe.failure_reason}:null,recovery:fe,cleanup_failed:n,cleanup_label:n?Dr(n.step):null,base_exception:m,conflicting:Ge,gate:q,queue_failure:x,auto_skip:_,queued:E,queue_active:J,queue_position:c?c.position:0,activity:Ke?null:o&&o.activity||null}),me=S?.live===!0&&S.title?i`<span title=${S.title}>${S.label}</span>`:S?.label||null;return{id:e,title:l?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&he?.active!==!0?Ms(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:l,pr_number:X&&typeof X.number=="number"?X.number:null,pr_url:X&&typeof X.url=="string"?X.url:"",completion_badge:S?.live!==!0&&S?.title?S.label:null,completion_title:S?.title||"",completion_repair_pr_url:fe?fe.repair_pr_url:"",completion_repair_pr_number:fe?fe.repair_pr_number:null,badges:me?[me]:[],live_badge:S?.live===!0?me:null,usage:s,alert:S?.alert===!0,merge_action:q?.tier==="merged"&&!we&&!Ee||I?!1:!E||W||He,timeline_action:I,cancel_action:E&&!W,cancel_enabled:(!J||Ue)&&!(fe&&fe.lock_actions),cancel_title:fe&&fe.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":J&&!Ue?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ue?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:G,discard_action:G.action,merge_step:he,discard_enabled:G.enabled,discard_title:G.title,merge_enabled:!he&&!a&&!$e&&!m&&!(fe&&fe.lock_actions)&&!re&&!I&&(De||Ge||q?.reason==="base_behind"||q?.reason==="review_receipt_missing"||q?.reason==="review_receipt_stale"||we||Ee||_e),merge_label:W?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":we||Ee?"\uC815\uB9AC \uC7AC\uAC1C":Ge&&!he&&!we?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":q?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":q?.reason==="review_receipt_missing"||q?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":He?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:$e?G.error?`\uD3D0\uAE30 \uC2E4\uD328: ${G.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${G.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:W?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":he?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${he.label}`:Ee?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":re?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":we?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ge?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="review_receipt_missing"||q?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":q?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":De?`\uBA38\uC9C0 (${q.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:q&&q.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${q&&q.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function sa(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:d,doneRange:_,onDoneRangeChange:m}=t,b=n?Kn(n,l):null,A=Xn({transport:r,uiOrderStore:l}),k=null,N=[],F=j_(),E=G_(),W=Mt(_)?_:Y_(),J=new Map;function x(){let u=Jt.find(y=>y.value===W);return u?u.label:"\uC624\uB298"}let w=X_(),R=!1,q=new Set,X=new Set,fe=new Set,ae=new Set,ie=[],oe=document.createElement("div");oe.className="worker-console";let Fe=document.createElement("div");Fe.className="worker-top";let Ue=document.createElement("div");Ue.className="worker-drawer-overlay",Ue.hidden=!0;let He=document.createElement("div");He.className="worker-drawer-overlay__backdrop";let Ke=document.createElement("div");Ke.className="worker-drawer-host";let Ge=document.createElement("div");Ge.className="worker-drawer-host",Ge.hidden=!0,Ue.append(He,Ke,Ge);let De=document.createElement("div");De.className="worker-lanes-host",oe.append(Fe,Ue,De),e.appendChild(oe);let he=null,Pe=hs(Ke,{transport:r,sessionLogStore:a,onClose:()=>{he=null,Ue.hidden=!0,de()}}),we=Yc(Ge,{onClose:()=>{Ge.hidden=!0,Ue.hidden=!0,de()}}),Ee=jc({getWorkspacePath:d||(()=>"")}),_e=d&&d()||"",re=Uc({queueStore:s,transport:r,onChanged:()=>de(),onOpenScript:(u,y)=>{Ee.open(u,y)}}),G=o?Nc(oe,{queueStore:s,analysisStore:o,transport:r}):null;function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Bs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function I(){let u=$e();return typeof u.revision=="number"?u.revision:0}function S(u){u&&u.queue&&s&&s.set(u.queue)}function me(){let u=$e().queue;return Array.isArray(u)?u.length:0}async function Ae(u,y,j){if(!r)return;let te=()=>({bead_id:u,...y==="parallel"?{}:{lane:y},index:j,expected_revision:I()}),U=await r("worker-queue-place",te());S(U),U&&U.conflict&&await r("worker-queue-place",te()).then(S)}async function P(u,y,j){if(!r)return;let te=()=>({bead_id:u,...y==="parallel"?{}:{lane:y},to_index:j,expected_revision:I()}),U=await r("worker-queue-reorder",te());S(U),U&&U.conflict&&await r("worker-queue-reorder",te()).then(S)}async function H(u){if(!r)return;let y=await r("worker-queue-remove",{bead_id:u,expected_revision:I()});S(y),y&&y.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:I()}).then(S)}async function L(u){if(!r||!u)return;let y=await r("worker-attempt-pause",{attempt_id:u});y&&y.paused===!1&&y.reason&&ce(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function K(u){if(!r||!u)return;let y=await Gr();if(y===null)return;let j=async(U={})=>await r("worker-attempt-resume",{attempt_id:u,expected_revision:I(),...y!==""?{instructions:y}:{},...U}),te=await j();S(te),te&&te.conflict&&(te=await j(),S(te)),te=await ar(te,(U,h)=>j({continuation:U,decision_token:h}),{onResult:S,refresh:()=>j()}),te&&te.resumed===!1&&!te.conflict&&te.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${te.reason}`,"error",2400)}async function ee(u){if(!r||!u)return;let y=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:I()});S(y),y&&y.conflict&&(y=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:I()}),S(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&ce(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function le(u,y,j=!0){if(!r)return null;let te=r,U=await te(u,{...y,expected_revision:I()});return S(U),U&&U.conflict&&j&&(U=await te(u,{...y,expected_revision:I()}),S(U)),U}async function ge(u){if(!r||!u)return;let y=$e().merge_queue?.find(te=>te.bead_id===u)?.continuation_action;if(y?.mismatch&&y.continuation===null){await T(u,y.mismatch);return}q.add(u),de();let j;try{j=await le("worker-merge-queue-add",{bead_id:u})}finally{q.delete(u),de()}!j||j.conflict||j.applied||ce(nm(j.reason),"error",2400)}async function xe(u){if(!(!r||!u||X.has(u))){X.add(u),de();try{let y=await r("worker-cleanup-retry",{bead_id:u,expected_revision:I()});S(y),y&&!y.retried&&!y.conflict&&y.reason&&ce(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{X.delete(u),de()}}}async function T(u,y){let j=await ar({continuation_mismatch:y},(U,h)=>le("worker-merge-queue-add",{bead_id:u,continuation:U,decision_token:h},!1)),te=j?.queue?.merge_queue?.find(U=>U.bead_id===u)?.continuation_action;if(j?.applied!==!0&&te?.continuation===null&&te.mismatch){await T(u,te.mismatch);return}j&&j.applied===!1&&!j.conflict&&ce("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function B(u){if(!r)return;let y=await le("worker-merge-auto-toggle",{on:u});!y||y.conflict||ce(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function Q(u){if(!r||!u)return;let y=await le("worker-merge-queue-remove",{bead_id:u});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ce("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Y(){await le("worker-merge-queue-remove",{all:!0})}async function $(u,y=null,j="unmerged",te=null){if(!r||!u)return;let U=Sn(u,j);if(!(!!te||typeof globalThis.confirm!="function"||globalThis.confirm(U)))return;let O=await r("worker-discard",{bead_id:u,...y?{attempt_id:y}:{},...te?{operation_id:te}:{},expected_revision:I()});if(S(O),O&&O.conflict&&(O=await r("worker-discard",{bead_id:u,...y?{attempt_id:y}:{},...te?{operation_id:te}:{},expected_revision:I()}),S(O)),O&&O.discarded===!0){ce(Os(O),"success",5e3);return}if(O&&O.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${O.reason}`,"error",2800);return}if(O&&O.accepted&&O.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(O&&O.accepted&&!O.discarded){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${O.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}O&&!O.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function M(u,y,j){if(!(!r||!y||!j||ae.has(y))){ae.add(y),de();try{let te=await r(u,{bead_id:y,action_id:j,expected_revision:I()});S(te),te?.conflict?ce("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!te?.ok&&te?.reason&&ce(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(te.reason)}`,"error",2800)}finally{ae.delete(y),de()}}}async function V(u,y){if(!r||!y||fe.has(y))return;fe.add(y),de();let j;try{let te=async(U={})=>await r(u,{bead_id:y,expected_revision:I(),...U});j=await te(),S(j),j&&j.conflict&&(j=await r(u,{bead_id:y,expected_revision:I()}),S(j)),u==="worker-revise-fix"&&(j=await ar(j,(U,h)=>te({continuation:U,decision_token:h}),{onResult:S,refresh:()=>te()}))}finally{fe.delete(y),de()}if(!(!j||j.conflict)){if(j.ok){ce(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ce(`\uCC98\uBD84 \uAC70\uBD80: ${j.reason||""}`,"error",3e3)}}async function Le(u){if(!r)return;let y=await r("worker-automation-toggle",{on:u,expected_revision:I()});S(y),y&&y.conflict&&await r("worker-automation-toggle",{on:u,expected_revision:I()}).then(S)}async function Ie(u){if(!r||!u)return;let y=await r("worker-repo-operation-repair",{operation_id:u});if(S(y),y&&y.ok===!1){ce(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&ce("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function qe(u){if(!r||!u)return;let y=await r("worker-repo-operation-dismiss",{operation_id:u});S(y),y&&y.ok===!1&&ce(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function Re(u){if(!r||!Number.isFinite(u))return;let y=Math.max(Bs,Math.floor(u)),j=await r("worker-queue-set-slots",{slots:y,expected_revision:I()});S(j),j&&j.conflict&&await r("worker-queue-set-slots",{slots:y,expected_revision:I()}).then(S)}async function Ze(u){if(!r||!Number.isInteger(u)||u<1||u>Kc)return;let y=$e(),j=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(u).reduce((h,O)=>h+(Array.isArray(O?.entries)?O.entries.length:0),0),te=()=>({count:u,expected_revision:I()}),U=await r("worker-queue-set-serial-lane-count",te());S(U),U&&U.conflict&&(U=await r("worker-queue-set-serial-lane-count",te()),S(U)),U&&U.applied&&j>0&&ce(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${j}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function gt(){let u=$e(),y=b?b.selectBoardColumn(N_,"ready"):[],j=b?b.selectBoardColumn(q_,"blocked"):[],te=b?b.selectBoardColumn(B_,"closed"):[],U=b?b.selectBoardColumn(F_,"in_progress"):[],h=new Map;for(let g of U){let D=tm(g);if(!D)continue;let ue=h.get(D);ue?ue.push(g):h.set(D,[g])}let O=g=>{let D=Zn(h.get(g)||[]);return D?D.title||D.id:null},ne=u.bead_titles||{},Ce=new Map;for(let[g,D]of Object.entries(ne))typeof D=="string"&&D.length>0&&Ce.set(g,D);for(let g of[...y,...j])Ce.set(g.id,g.title||g.id);let Je=u.bead_times&&typeof u.bead_times=="object"&&!Array.isArray(u.bead_times)?u.bead_times:{},Be=u.bead_labels&&typeof u.bead_labels=="object"&&!Array.isArray(u.bead_labels)?u.bead_labels:{},ye=new Map;for(let[g,D]of Object.entries(Be))Array.isArray(D)&&ye.set(g,ea(D));for(let g of[...y,...j]){let D=g.labels;Array.isArray(D)&&!ye.has(g.id)&&ye.set(g.id,ea(D))}let v=new Map,f=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(f)?f:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let D=g.members.map(ze=>{let ct=(Array.isArray(u.serial_lanes)?u.serial_lanes:[]).find(Rt=>Rt.entries.some(dt=>dt.bead_id===ze));return ct?ct.id:null});if(!(D.every(ze=>ze!==null)&&new Set(D).size===1))for(let ze of g.members)v.set(ze,g.members.filter(ct=>ct!==ze))}let p=u.bead_blocked_by&&typeof u.bead_blocked_by=="object"&&!Array.isArray(u.bead_blocked_by)?u.bead_blocked_by:{},C=new Map;for(let[g,D]of Object.entries(Je))D&&typeof D=="object"&&C.set(g,D);for(let g of[...y,...j])C.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let se=g=>C.get(g)||{},pe=u.pr_wait||[],ke=u.pr_observations||{},Se=u.pr_activity||{},ft=u.cleanup_failed||{},Qt=Object.entries(ft).map(([g,D])=>({bead_id:g,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0,subject_id:D&&typeof D.subject_id=="string"?D.subject_id:void 0,repair_eligible:!!(D&&D.repair_eligible),repair:D&&D.repair?D.repair:void 0})),Jr=u.queue||[],Oe=new Set([...Jr.map(g=>g.bead_id),...(Array.isArray(u.serial_lanes)?u.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(D=>D.bead_id)),...pe.map(g=>g.bead_id),...u.done.map(g=>g.bead_id)]),lt=new Set(j.map(g=>g.id)),en=l?l.get()?.order||{}:{},la=new Set,ca=[];for(let g of[...y,...j])Oe.has(g.id)||la.has(g.id)||em(g)||Dc(g.labels)||(la.add(g.id),ca.push(g));N=J_(ca,E,en);let md=u.admission||{},da=g=>{let D=md[g];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ue=typeof D.reason=="string"?D.reason:"",ze=ue.indexOf(":");return ze>0&&ze<ue.length-1?`\u26D4 ${ue.slice(0,ze)} (${ue.slice(ze+1)})`:`\u26D4 ${ue}`},gd=N.map(g=>{let D=wn(g),ue=D.path.length>0,ze=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",ct=!ze&&ue&&!D.conflict,Rt=lt.has(g.id),dt=[];Rt&&dt.push(rm(g)),ze?dt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):D.conflict?dt.push("spec_id_conflict"):ue||dt.push("spec \uC5C6\uC74C");let rt=da(g.id);return rt&&dt.push(rt),{id:g.id,title:g.title||g.id,reason:dt.join(" \xB7 "),draggable:ct,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:ze,status:g.status,blocked:Rt,has_spec:ue}}),Us=W_(gd,F),bd=Us.visible,hd=u.revise_parked||{},Ln=u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},Ws=(g,D)=>g.map((ue,ze)=>{let ct=D!=="done",Rt=D!=="done"&&D!=="queue",dt=ct?hd[ue.bead_id]:null,rt=ct?tr(Ln,ue.bead_id):null,qn=rt?.operation?rt:null,Id=ct&&ye.get(ue.bead_id)===!0,Pa=p[ue.bead_id]||[],Ks=u.admission&&typeof u.admission=="object"?u.admission[ue.bead_id]:null,Zs=ct?Zl(Ks,!!qn||ae.has(ue.bead_id)):null,Ld=ct&&!Zs?da(ue.bead_id):null,Od=ct?[Ld]:[],Ma=ct&&Pa.length>0&&typeof Ks?.reason=="string"&&Ks.reason.startsWith("not_ready")?[`\u23F8 ${Pa.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Xs=ct?v.get(ue.bead_id):void 0;return Xs&&Xs.length>0&&Ma.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Xs.join(", ")}\uC640`),{id:ue.bead_id,title:Ce.get(ue.bead_id)||ue.bead_id,reason:Od.filter(Boolean).join(" \xB7 "),draggable:ct&&!qn&&!Zs,done:D==="done",lane:D,seq:Rt?ze+1:void 0,worker_serial:Id,discard:qn,stale_work:Zs,badges:[...Ma,...dt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!dt,revise_action:!!dt,revise_enabled:!!dt&&!qn&&!fe.has(ue.bead_id),revise_title:dt?dt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${dt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Dt(u.attempts||{},ue.bead_id):null,work_ms:D==="done"?Yl(u.attempts||{},ue.bead_id):null,done_at:D==="done"&&typeof ue.added_at=="number"?ue.added_at:void 0,...se(ue.bead_id)}}),qr=u.attempts?Object.values(u.attempts):[],zs=new Set;for(let g of qr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&zs.add(g.resumed_from);let ua=new Map;for(let g of qr)ua.set(g.bead_id,g.attempt_id);let Hs=new Map;for(let g of qr)Hs.set(g.attempt_id,g);function Gs(g){let D=new Set,ue=g;for(;ue&&!D.has(ue.attempt_id);){if(ue.conflict_resolution===!0)return!0;D.add(ue.attempt_id),ue=typeof ue.resumed_from=="string"&&ue.resumed_from.length>0&&Hs.get(ue.resumed_from)||null}return!1}let On=typeof u.declared_base=="string"?u.declared_base:null;function yd(g){let D=null;for(let ue of qr)!ue||ue.bead_id!==g||Gs(ue)||(D===null||(typeof ue.started_at=="number"?ue.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=ue);return D&&typeof D.target_base=="string"?D.target_base:null}let pa=[],fa=[],vd=Mc(u),_a=g=>{let D=typeof g.session_id=="string"&&g.session_id.length>0,ue=zs.has(g.attempt_id);return{eligible:D&&!ue,reason:D?ue?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Ut=null;for(let g of qr){let D=g.status==="paused"&&!zs.has(g.attempt_id);if(g.status==="running"||D)fa.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Ce.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:D,conflict_resolution:Gs(g),base_exception:na(On,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:tr(Ln,g.bead_id,{attempt_id:g.attempt_id}),usage:Dt(u.attempts||{},g.bead_id),current_child:O(g.bead_id),...se(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&vd(g)){let ue=_a(g);pa.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Ce.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:tr(Ln,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ue.eligible,resume_reason:ue.reason,conflict_resolution:Gs(g),base_exception:na(On,g.target_base),usage:Dt(u.attempts||{},g.bead_id),current_child:O(g.bead_id),...se(g.bead_id)}),Ut=g}}let Pn=[...pa,...fa],ma=null;if(Ut){let g=_a(Ut),D=Ut.cause_detail;ma={bead_id:Ut.bead_id,repo:Ut.repo||"",reason:Ut.cause||Ut.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:Ut.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:tr(Ln,Ut.bead_id,{attempt_id:Ut.attempt_id})}}let ga=new Set(Pn.map(g=>g.bead_id)),Vs=Array.isArray(u.merge_queue)?u.merge_queue:[],ba=new Map,ha=new Map,ya=new Map,va=new Map,wa=new Map;Vs.forEach((g,D)=>{g&&typeof g.bead_id=="string"&&(ba.set(g.bead_id,D+1),ha.set(g.bead_id,g.resolution),ya.set(g.bead_id,g.continuation_action||null),va.set(g.bead_id,g.head_review||null),wa.set(g.bead_id,g.authority||null))});let Fr=u.merge_queue_state||{active:null,failures:{}},wd=Fr.failures||{},ka=Fr.waiting&&typeof Fr.waiting.bead_id=="string"&&typeof Fr.waiting.reason=="string"?Fr.waiting:null,kd=u.auto_merge_skips||{},$a=g=>{let D=kd[g];if(!D)return null;let ue=ke[g],ze=ue&&ue.pr?ue.pr.head_sha:null;return ze&&ze===D.head_sha?D.reason||"":null},Mn=new Map;for(let g of Pn)g.failed!==!0&&g.conflict_resolution&&(g.paused?Mn.has(g.bead_id)||Mn.set(g.bead_id,"paused"):Mn.set(g.bead_id,"running"));let xa=Pn.filter(g=>!g.paused&&g.failed!==!0).length,Sa=(u.workspace_info||{}).slots,Aa=typeof Sa=="number"?Sa:typeof u.slots=="number"?u.slots:Bs,$d=xa>Aa,Dn=Cr(W),xd=(Array.isArray(u.done)?u.done.slice():[]).filter(g=>Dn===void 0||typeof g.added_at!="number"||g.added_at>=Dn).sort((g,D)=>(D.added_at||0)-(g.added_at||0)),tn=Ws(xd,"done"),Sd=new Set((Array.isArray(u.done)?u.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Ea=[],Ad=d?.()||"";for(let g of te){let D=Lr(g.closed_at);if(typeof g.id!="string"||Sd.has(g.id)||D===null||Dn!==void 0&&D<Dn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ue=`${Ad}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,ze=J.get(ue);ze===void 0&&r&&(J.set(ue,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(ct=>{let Rt=Array.isArray(ct)&&ct.some(dt=>ys(typeof dt?.text=="string"?dt.text:"")?.lane==="session");J.set(ue,Rt?"session":"not-session"),de()}).catch(()=>{J.set(ue,"failed"),de()})),ze==="session"&&Ea.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:D,created_at:g.created_at,updated_at:g.updated_at})}tn.push(...Ea),tn.sort((g,D)=>(D.done_at||0)-(g.done_at||0));let Nn={};for(let g of ir)Nn[g]=0;let Ta=!1,Ca=0,Ys=0,Ra=0;for(let g of tn){let D=g.usage;if(D&&typeof D=="object"){let ue=!1;for(let ze of ir)Number.isFinite(D[ze])&&(Nn[ze]+=D[ze],Ta=!0,ue=!0);ue&&(Ys+=1,Number.isFinite(D.total_cost_usd)&&(Ca+=D.total_cost_usd,Ra+=1))}}Ys>0&&Ra===Ys&&(Nn.total_cost_usd=Ca);let Ia=tn.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Ed=Ia.length>0?wt(ss(Ia)):Ta?zt(Nn):null,Td=u.lane_states&&typeof u.lane_states=="object"&&!Array.isArray(u.lane_states)?u.lane_states:{},Cd=Array.isArray(u.serial_lanes)?u.serial_lanes:[],La=g=>{if(pe.some(ze=>ze.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=qr.filter(ze=>ze&&ze.bead_id===g),ue=D.length>0?D[D.length-1].status:null;return ue==="failed"||ue==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ue==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Oa=Cd.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,D)=>{let ue=Td[g.id]||{},ze=new Map((Array.isArray(ue.corrections)?ue.corrections:[]).filter(rt=>rt&&typeof rt.bead_id=="string"&&typeof rt.after=="string").map(rt=>[rt.bead_id,rt.after])),ct=Ws(g.entries.filter(rt=>!ga.has(rt.bead_id)),g.id).map(rt=>ze.has(rt.id)?{...rt,badges:[`\u{1F517} ${ze.get(rt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...rt.badges]}:rt),Rt=Array.isArray(ue.occupied_by)?ue.occupied_by.filter(rt=>typeof rt=="string"):[],dt=Rt.map(rt=>({id:rt,title:Ce.get(rt)||rt,draggable:!1,lane:g.id,ghost:!0,badges:[La(rt)]}));return{id:g.id,index:D+1,rows:[...dt,...ct],occupied:Rt.length>0,badge:Rt.length>0?La(Rt[0]):"\uB300\uAE30",cycle:ue.cycle===!0}}),Rd=typeof u.serial_lane_count=="number"?u.serial_lane_count:Oa.length;return{queue:u,idToTitle:Ce,candidates:bd,candidate_hidden:{blocked:Us.hidden_blocked,spec:Us.hidden_spec},running:Pn,live_count:xa,slots:Aa,over_cap:$d,failure:ma,waiting:Ws(Jr.filter(g=>!ga.has(g.bead_id)),"queue"),serial_lanes:Oa,serial_lane_count:Rd,pr_wait:pe.map(g=>cm(g.bead_id,Ce.get(g.bead_id)||g.bead_id,ke,ft[g.bead_id]||null,Dt(u.attempts||{},g.bead_id),Se[g.bead_id]||(q.has(g.bead_id)||X.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Mn.get(g.bead_id)||null,g.external===!0,{position:ba.get(g.bead_id)||0,active:Fr.active===g.bead_id,failure:wd[g.bead_id]||null,waiting:ka?.bead_id===g.bead_id?ka.reason:null,resolution:ha.get(g.bead_id),continuation_action:ya.get(g.bead_id),head_review:va.get(g.bead_id)||null,authority:wa.get(g.bead_id)||null},g.wt_present!==!1,u.auto_merge===!0?$a(g.bead_id):null,na(On,yd(g.bead_id)),u.completion_status&&typeof u.completion_status=="object"&&!Array.isArray(u.completion_status)&&u.completion_status[g.bead_id]||null,u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},Hs.get(ua.get(g.bead_id)||"")?.worker_serial===!0,u.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]})).map(g=>({...g,...se(g.id)})),merge_queue_length:Vs.length,merge_queue_running:Vs.length>0,auto_excluded:pe.map(g=>g.bead_id).filter(g=>$a(g)!==null),declared_base:On,done:tn,token_total:Ed,cleanup_failures:Qt,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]}}function bt(){let y=!!o?.get()?.job,j=!y&&o?.isPending?.()===!0,te=y?"\uBD84\uC11D \uC911":j?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${te?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${te?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${te?i`<span class="worker-analysis-btn__badge">${te}</span>`:""}
    </button>`}function it(u){let y=u.waiting.length>0?u.waiting[0].id:"\u2014",j=i`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,te=Z(u),U=u.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",h=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${x()} 완료 <b>${u.done.length}</b></span
      >`,O=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,ne=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Bs}
          step="1"
          .value=${String(u.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Kc},(Be,ye)=>ye+1).map(Be=>i`<option
                value=${String(Be)}
                ?selected=${u.serial_lane_count===Be}
              >
                ${Be}
              </option>`)}
        </select>
      </label>
      ${o?bt():""} `,Ce=oc({failure:u.failure}),Je=Kl(u.repo_operations,u.cleanup_failures);return R?i`<div class="worker-ribbon">
          ${j} ${te}
          <div class="worker-kpi worker-kpi--ribbon">${U}${h}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ne}</div>
          <div class="worker-kpi">${O}</div>
        </div>
        ${Je}${re.template()}${Ce}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${j}${te}${ne}</div>
        <div class="worker-kpi">
          ${U}${h}${O}
          ${(Array.isArray(u.token_total)?u.token_total:u.token_total?[{label:u.token_total,tooltip:`${x()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Be=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Be.tooltip}
                >${x()} 완료 · 누적 ${Be.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${Je}${re.template()}${Ce}`}function kt(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let y=u.running.some(j=>!j.paused&&j.failed!==!0);return i`<section
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
          >${u.running.length+u.pr_wait.length}</span
        >
      </header>
      ${u.running.length>0?Vo(u.running,Date.now(),he):""}
      ${u.pr_wait.map(j=>jo(j))}
    </section>`}function ot(u){let y=u.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${F.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${z_.map(j=>i`<button
              type="button"
              class="worker-filter__chip${F.spec===j.value?" is-active":""}"
              data-spec=${j.value}
              aria-pressed=${F.spec===j.value?"true":"false"}
            >
              ${j.label}
            </button>`)}
        ${y.spec>0?i`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function nt(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${E}
    >
      ${H_.map(u=>i`<option value=${u.value} ?selected=${E===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function ut(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${Jt.map(u=>i`<option value=${u.value} ?selected=${W===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function z(u){let y=i`<span
      class="worker-lane__badge${u.occupied?" worker-lane__badge--held":""}"
      >${u.badge}</span
    >`,j=u.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Yt({id:`worker-pane-lane-${u.id}`,lane:u.id,title:`\uC9C1\uB82C ${u.index}`,items:u.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:y,controls:j})}function Z(u){let y=u.queue.auto_merge===!0;if(u.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(y)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let j=new Set(u.auto_excluded),te=u.pr_wait.filter(U=>U.merge_action&&U.merge_enabled&&!j.has(U.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${te>0?` ${te}`:""}
    </button>`}function ve(u){let y=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:nt(),controls:ot(u)});return R?i`<div class="worker-lanes worker-lanes--mobile">
        ${kt(u)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:w.queue,preview:Xc(u.waiting)})}
        ${u.serial_lanes.map(j=>z(j))}
        ${y}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${x()} \uC644\uB8CC \uC5C6\uC74C`,controls:ut(),collapsible:!0,collapsed:w.done,preview:Array.isArray(u.token_total)?u.token_total.map(j=>j.label).join(" \xB7 "):u.token_total||Xc(u.done)})}
      </div>`:i`<div class="worker-lanes">
      ${y}
      <div class="worker-wait">
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${u.serial_lanes.map(j=>z(j))}
      </div>
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(j=>!j.paused&&j.failed!==!0),body:Vo(u.running,Date.now(),he)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${x()} ${u.done.length}`,items:u.done,empty:`${x()} \uC644\uB8CC \uC5C6\uC74C`,controls:ut()})}
    </div>`}function be(u){w={...w,[u]:!w[u]},Q_(w),de()}function de(){let u=gt();je(it(u),Fe),je(ve(u),De)}function Ne(){let u=document.querySelector(".app-header");if(!u)return;let y=()=>{let j=Math.round(u.getBoundingClientRect().height);oe.style.setProperty("--worker-ribbon-top",`${j}px`)};if(y(),typeof ResizeObserver=="function"){let j=new ResizeObserver(y);j.observe(u),ie.push(()=>j.disconnect())}else window.addEventListener("resize",y),ie.push(()=>window.removeEventListener("resize",y))}function et(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Z_);R=!!u.matches;let y=j=>{let te=!!(j&&typeof j.matches=="boolean"?j.matches:u.matches);te!==R&&(R=te,de())};typeof u.addEventListener=="function"?(u.addEventListener("change",y),ie.push(()=>u.removeEventListener("change",y))):typeof u.addListener=="function"&&(u.addListener(y),ie.push(()=>u.removeListener(y)))}let Ve=null;function Me(u){Ve=u.target instanceof Element?u.target:null}function Qe(u){let j=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!j)return;if(Ve&&j.contains(Ve)&&Ve.closest("input, button, a")){u.preventDefault();return}let te=j.dataset.beadId||"",U=j.dataset.lane||"";k={bead_id:te,from_lane:U};try{u.dataTransfer?.setData("text/plain",te),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function Te(u){let y=u.target?.closest?.(".worker-pane");if(!y)return;let j=y.dataset.lane||"";j!=="candidate"&&j!=="queue"&&!/^s[1-5]$/.test(j)||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function pt(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Et(u,y){let j=N.find(O=>O.id===u);if(!j)return;let te=N.filter(O=>O.id!==u),U=te.length;if(y){let O=y.dataset.beadId;if(O===u)return;let ne=te.findIndex(Ce=>Ce.id===O);ne>=0&&(U=ne)}let h=te.slice();h.splice(U,0,j),A.applyReorder(u,h,U)}function Ot(u){let y=u.target?.closest?.(".worker-pane");if(!y)return;u.preventDefault(),y.classList.remove("worker-pane--drag-over");let j=y.dataset.lane||"",te=k?.bead_id||u.dataTransfer?.getData("text/plain")||"",U=k?.from_lane||"";if(k=null,!te)return;let h=u.target?.closest?.(".worker-mini, .worker-card"),O=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),ne=O.length;if(h){let Ce=O.indexOf(h);Ce>=0&&(ne=Ce)}if(ne=Math.max(0,ne-y.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(ne=me()),j==="candidate"){if(U==="candidate"){Et(te,h);return}(U==="queue"||/^s[1-5]$/.test(U))&&H(te);return}if(j==="queue"||/^s[1-5]$/.test(j)){let Ce=j==="queue"?"parallel":j;U===j?P(te,Ce,ne):Ae(te,Ce,ne)}}function Ft(u){F=u,U_(u),de()}function $r(u){E=u==="board"||u==="created"||u==="spec"?u:js,V_(E),de()}function ht(u){W=Mt(u)?u:It,K_(W),m?.(W),de()}function yt(u){let y=u.target?.closest?.(".worker-serial-lane-count");if(y){let ne=Number.parseInt(y.value,10);Number.isFinite(ne)&&Ze(ne).then(de);return}let j=u.target?.closest?.(".worker-filter__blocked");if(j){Ft({...F,show_blocked:j.checked});return}let te=u.target?.closest?.(".worker-done-range");if(te){ht(te.value);return}let U=u.target?.closest?.(".worker-sort");if(U){$r(U.value||js);return}let h=u.target?.closest?.(".worker-slots__input");if(!h)return;let O=Number.parseInt(h.value,10);if(!Number.isFinite(O)){de();return}Re(O).then(de)}function rr(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function nr(){let u=gt();return{operations:u.repo_operations,cleanup_failures:u.cleanup_failures,repo:d&&d()||""}}function Bt(){he&&Pe.close(),Ge.hidden=!1,Ue.hidden=!1,we.open(nr()),de()}function jt(u){let y=$e(),j=y.attempts?y.attempts[u]:null;he=u,we.close(),Ge.hidden=!0,Ue.hidden=!1,Pe.open({attempt_id:u,meta:rr(j)}),de()}function vt(){if(we.isOpen()&&we.refresh(nr()),!he)return;let u=$e(),y=u.attempts?u.attempts[he]:null;if(y){Pe.updateMeta(rr(y));return}Pe.close()}function Xt(u){let y=u.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-parallel-analysis-dialog"))return;if(y?.closest?.(".worker-analysis-btn")){G?.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){Bt();return}let j=y?.closest?.(".worker-repo-op__session");if(j){let Oe=j.dataset.attemptId;Oe&&jt(Oe);return}let te=y?.closest?.(".worker-repo-op__resolve");if(te){Ie(te.dataset.operationId||"");return}let U=y?.closest?.(".worker-repo-op__dismiss");if(U){qe(U.dataset.operationId||"");return}let h=y?.closest?.(".worker-cleanup__resume");if(h){let Oe=h.dataset.beadId;Oe&&xe(Oe);return}let O=y?.closest?.(".worker-banner__resume");if(O){let Oe=O.dataset.attemptId;Oe&&K(Oe);return}let ne=y?.closest?.(".worker-banner__discard");if(ne){let Oe=ne.dataset.confirmation==="merged"?"merged":"unmerged";$(ne.dataset.beadId||"",ne.dataset.attemptId||null,Oe,ne.dataset.operationId||null);return}let Ce=y?.closest?.(".worker-banner__dismiss");if(Ce){let Oe=Ce.dataset.attemptId;Oe&&ee(Oe);return}if(y?.closest?.(".worker-play")){Le(!$e().auto_advance);return}let Je=y?.closest?.(".worker-merge-all");if(Je){Je.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?B(!1):Y():B(!0);return}let Be=y?.closest?.(".worker-pane__hd--toggle");if(Be){let Oe=Be.dataset.lane;(Oe==="queue"||Oe==="done")&&be(Oe);return}let ye=y?.closest?.(".worker-card__place");if(ye){let Oe=ye.dataset.beadId;Oe&&!ye.disabled&&Ae(Oe,"parallel",me());return}let v=y?.closest?.(".worker-filter__chip");if(v){let Oe=v.dataset.spec;(Oe==="all"||Oe==="with"||Oe==="without")&&Ft({...F,spec:Oe});return}let f=y?.closest?.(".worker-mini__merge");if(f){let Oe=f.dataset.beadId||"";$e().cleanup_failed?.[Oe]?xe(Oe):ge(Oe);return}let p=y?.closest?.(".worker-mini__merge-cancel");if(p){Q(p.dataset.beadId||"");return}let C=y?.closest?.(".worker-mini__discard");if(C){$(C.dataset.beadId||"",C.dataset.attemptId||null,C.dataset.discardMode==="merged"?"merged":"unmerged",C.dataset.operationId||null);return}let se=y?.closest?.(".worker-mini__stale-continue");if(se){M("worker-stale-work-continue",se.dataset.beadId||"",se.dataset.actionId||"");return}let pe=y?.closest?.(".worker-mini__stale-backup");if(pe){M("worker-stale-work-backup-fresh",pe.dataset.beadId||"",pe.dataset.actionId||"");return}let ke=y?.closest?.(".worker-mini__stale-recheck");if(ke){M("worker-stale-work-recheck",ke.dataset.beadId||"",ke.dataset.actionId||"");return}let Se=y?.closest?.(".worker-mini__revise-fix");if(Se){V("worker-revise-fix",Se.dataset.beadId||"");return}let ft=y?.closest?.(".worker-mini__revise-approve");if(ft){V("worker-revise-approve",ft.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let Oe=y?.closest?.(".rtile"),lt=Oe?.dataset?.beadId,en=Oe?.dataset?.attemptId;lt&&$(lt,en||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&ee(lt);return}if(y?.closest?.(".rtile__pause")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&L(lt);return}if(y?.closest?.(".rtile__resume")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&K(lt);return}if(y?.closest?.(".rtile__session")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&jt(lt);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){we.close(),Pe.close();return}if(y?.closest?.(".worker-drawer-host"))return;let Qt=y?.closest?.(".rtile");if(Qt){if(y?.closest?.(".rtile__id")){let lt=Qt.dataset.beadId;lt&&or(lt).then(en=>{en?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Oe=Qt.dataset.beadId;Oe&&c&&c(Oe);return}let Jr=y?.closest?.(".worker-mini, .worker-card");if(Jr){let Oe=Jr.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Oe&&or(Oe).then(lt=>{lt?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Oe&&c&&c(Oe)}}return e.addEventListener("pointerdown",Me),e.addEventListener("dragstart",Qe),e.addEventListener("dragover",Te),e.addEventListener("dragleave",pt),e.addEventListener("drop",Ot),e.addEventListener("click",Xt),e.addEventListener("change",yt),et(),Ne(),b&&ie.push(b.subscribe(()=>{for(let[u,y]of J)y==="failed"&&J.delete(u);de()})),s&&ie.push(s.subscribe(()=>{let u=d&&d()||"";u!==_e&&(_e=u,Ee.close()),de(),vt()})),o&&typeof o.subscribe=="function"&&ie.push(o.subscribe(()=>de())),de(),{load(){de()},destroy(){for(let u of ie.splice(0))try{u()}catch{}e.removeEventListener("pointerdown",Me),e.removeEventListener("dragstart",Qe),e.removeEventListener("dragover",Te),e.removeEventListener("dragleave",pt),e.removeEventListener("drop",Ot),e.removeEventListener("click",Xt),e.removeEventListener("change",yt);try{Pe.destroy()}catch{}Ue.hidden=!0;try{G?.destroy()}catch{}try{Ee.destroy()}catch{}je(i``,e)}}}function oa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function nd(e,t,r,n=async()=>{},s=async()=>{}){let o=st("views:workspace-picker"),a=null,l=!1,c=!1,d=!1;async function _(R){let X=R.target.value,ae=t.getState().workspace?.current?.path||"";if(X&&X!==ae){o("switching workspace to %s",X),l=!0,w();try{await r(X)}catch(ie){o("workspace switch failed: %o",ie)}finally{l=!1,w()}}}async function m(){let R=t.getState(),q=R.workspace?.current?.path||R.workspace?.available?.[0]?.path||"";if(!(!q||c)){o("git-pulling workspace %s",q),c=!0,w();try{await n(q)}catch(X){o("workspace git pull failed: %o",X)}finally{c=!1,w()}}}function b(R){let q=R.target;q&&e.contains(q)||N()}function A(R){R.key==="Escape"&&N()}function k(){d||(d=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",A),w())}function N(){d&&(d=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",A),w())}function F(){d?N():k()}async function E(R){let q=R.target,X=q.value,fe=q.checked;o("toggling visibility %s \u2192 %s",X,String(fe));try{await s(X,fe)}catch(ae){o("workspace visibility toggle failed: %o",ae)}}function W(R){return R?i`
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
    `:i``}function J(R,q){return i`
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
                ${R.map(X=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${X.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${X.path}"
                        .checked=${!q.has(X.path)}
                        @change=${E}
                      />
                      <span class="workspace-picker__manage-name"
                        >${oa(X.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function x(){let R=t.getState(),q=R.workspace?.current,X=R.workspace?.available||[],fe=new Set(R.workspace?.hidden||[]),ae=q?.path||X[0]?.path||"";if(X.length===0)return i``;let ie=X.filter(oe=>!fe.has(oe.path)||oe.path===ae);if(ie.length<=1){let oe=ie[0]||X[0],Fe=oa(oe.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${oe.path}"
            >${Fe}</span
          >
          ${J(X,fe)}
          ${W(ae)}
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
          ${ie.map(oe=>i`
              <option
                value="${oe.path}"
                ?selected=${oe.path===ae}
                title="${oe.path}"
              >
                ${oa(oe.path)}
              </option>
            `)}
        </select>
        ${J(X,fe)}
        ${W(ae)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function w(){je(x(),e)}return w(),a=t.subscribe(()=>w()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",A),je(i``,e)}}}var sd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function aa(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function od(e,t,r=aa()){return{id:r,type:e,payload:t}}function ad(e={}){let t=st("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,d=new Map,_=[],m=new Map,b=new Set;function A(x){for(let w of Array.from(b))try{w(x)}catch{}}function k(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let x=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),w=(r.jitterRatio||0)*x,R=Math.max(0,Math.round(x+(Math.random()*2-1)*w));t("ws retry in %d ms (attempt %d)",R,a+1),l=setTimeout(()=>{l=null,J()},R)}function N(x){try{s?.send(JSON.stringify(x))}catch(w){t("ws send failed",w)}}function F(){for(o="open",t("ws open"),A(o),a=0;_.length;){let x=_.shift();x&&N(x)}}function E(x){let w;try{w=JSON.parse(String(x.data))}catch{t("ws received non-JSON message");return}if(!w||typeof w.id!="string"||typeof w.type!="string"){t("ws received invalid envelope");return}if(d.has(w.id)){let q=d.get(w.id);d.delete(w.id),w.ok?q?.resolve(w.payload):q?.reject(w.error||new Error("ws error"));return}let R=m.get(w.type);if(R&&R.size>0)for(let q of Array.from(R))try{q(w.payload)}catch(X){t("ws event handler error",X)}else t("ws received unhandled message type: %s",w.type)}function W(){o="closed",t("ws closed"),A(o);for(let[x,w]of d.entries())w.reject(new Error("ws disconnected")),d.delete(x);a+=1,k()}function J(){if(!c)return;let x=n();try{s=new WebSocket(x),t("ws connecting %s",x),o="connecting",A(o),s.addEventListener("open",F),s.addEventListener("message",E),s.addEventListener("error",()=>{}),s.addEventListener("close",W)}catch(w){t("ws connect failed %o",w),k()}}return J(),{send(x,w){if(!sd.includes(x))return Promise.reject(new Error(`unknown message type: ${x}`));let R=aa(),q=od(x,w,R);return t("send %s id=%s",x,R),new Promise((X,fe)=>{d.set(R,{resolve:X,reject:fe,type:x}),s&&s.readyState===s.OPEN?N(q):(t("queue %s id=%s (state=%s)",x,R,o),_.push(q))})},on(x,w){m.has(x)||m.set(x,new Set);let R=m.get(x);return R?.add(w),()=>{R?.delete(w)}},onConnection(x){return b.add(x),()=>{b.delete(x)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,J()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function dm(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function um(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var ia=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],id=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],wr="tab:worker:closed",pm="bdui.worker.done-range",ld=wc,cd="worker:queue",dd="worker:parallel-analysis",ud="ui:order",pd="ui:display-policy",fd="exec:presets",kr="tab:board:closed",_d="beads-ui.board.closed-range";function fm(e){let t=st("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;je(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Pc(s),o&&a&&l&&c){let De=function(f,p){let C="Request failed",se="";if(f&&typeof f=="object"){let ke=f;if(typeof ke.message=="string"&&ke.message.length>0&&(C=ke.message),typeof ke.details=="string")se=ke.details;else if(ke.details&&typeof ke.details=="object")try{se=JSON.stringify(ke.details,null,2)}catch{se=""}}else typeof f=="string"&&f.length>0&&(C=f);let pe=p&&p.length>0?`Failed to load ${p}`:"Request failed";Ge.open(pe,C,se)},xe=function(f){return`${u.getState().workspace.current?.path||""}\0${f}`},T=function(){Ae&&(Ae().catch(()=>{}),Ae=null),P=null,H=null},Q=function(f){L=f;let p=()=>{L!==f||u.getState().selected_id!==f||(L=null,B(f))};if(!le){ee.then(p);return}p()},V=function(f,p,C,se,pe){return C!==M[p]?(pe().catch(()=>{}),!1):(f.set(se,pe),!0)},Ie=function(){let f=u.getState();bt(f.view==="board"),z(f.view==="worker"),Ne(f.view==="monitor"),ve(f.view==="board"||f.view==="worker"||Le||!!f.selected_id)},Ze=function(){let f=Cr(qe);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},gt=function(){let f=Cr(Re);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},bt=function(f){if(f)for(let[p,C]of ia){if(Y.has(p)||$.has(p))continue;let se=p===kr?Ze():{type:C};try{Ee.register(p,se)}catch(Se){t("register %s store failed: %o",p,Se)}$.add(p);let pe=M.board,ke=!1;we.subscribeList(p,se).then(Se=>{ke=!V(Y,"board",pe,p,Se)}).catch(Se=>{t("subscribe %s failed: %o",p,Se),De(Se,"board")}).finally(()=>{$.delete(p),ke&&Ie()})}else ot()},ot=function(){M.board+=1;for(let[f]of ia){let p=Y.get(f);p&&(p().catch(()=>{}),Y.delete(f));try{Ee.unregister(f)}catch(C){t("unregister %s failed: %o",f,C)}}},z=function(f){if(!f){Z();return}for(let[p,C]of id){if(nt.has(p)||$.has(p))continue;let se=p===wr?gt():{type:C};try{Ee.register(p,se)}catch(Se){t("register %s store failed: %o",p,Se)}$.add(p);let pe=M.worker,ke=!1;we.subscribeList(p,se).then(Se=>{ke=!V(nt,"worker",pe,p,Se)}).catch(Se=>{t("subscribe %s failed: %o",p,Se),De(Se,"worker")}).finally(()=>{$.delete(p),ke&&Ie()})}},Z=function(){M.worker+=1;for(let[f]of id){let p=nt.get(f);p&&(p().catch(()=>{}),nt.delete(f));try{Ee.unregister(f)}catch(C){t("unregister %s failed: %o",f,C)}}},ve=function(f){if(!f){be();return}ut||(Pe("subscribe-worker-queue",{id:cd}).catch(p=>{t("subscribe-worker-queue failed: %o",p)}),Pe("subscribe-worker-parallel-analysis",{id:dd}).catch(p=>{t("subscribe-worker-parallel-analysis failed: %o",p)}),ut=()=>(Pe("unsubscribe-worker-parallel-analysis",{id:dd}),Pe("unsubscribe-worker-queue",{id:cd})))},be=function(){ut&&(ut().catch(()=>{}),ut=null),re.clear()},Ne=function(f){if(!f){et();return}de||(Pe("subscribe-monitor-pipeline",{id:ld}).catch(p=>{t("subscribe-monitor-pipeline failed: %o",p)}),de=()=>Pe("unsubscribe-monitor-pipeline",{id:ld}))},et=function(){de&&(de().catch(()=>{}),de=null)},Me=function(){Ve||(Pe("subscribe-ui-order",{id:ud}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),Ve=()=>Pe("unsubscribe-ui-order",{id:ud}))},Qe=function(){Ve&&(Ve().catch(()=>{}),Ve=null),$e.clear()},pt=function(){Te||(Pe("subscribe-display-policy",{id:pd}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),Te=()=>Pe("unsubscribe-display-policy",{id:pd}))},Et=function(){Te&&(Te().catch(()=>{}),Te=null),I.clear()},Ft=function(){Ot||(Pe("subscribe-impl-presets",{id:fd}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),Ot=()=>Pe("unsubscribe-impl-presets",{id:fd}))},Bt=function(f){if(!f)return"Unknown";let p=f.split("/").filter(Boolean);return p.length>0?p[p.length-1]:"Unknown"};var d=De,_=xe,m=T,b=Q,A=V,k=Ie,N=Ze,F=gt,E=bt,W=ot,J=z,x=Z,w=ve,R=be,q=Ne,X=et,fe=Me,ae=Qe,ie=pt,oe=Et,Fe=Ft,Ue=Bt;let He=document.getElementById("header-loading"),Ke=hi(He),Ge=Vl(e),he=ad(),Pe=Ke.wrapSend((f,p)=>he.send(f,p)),we=di(Pe),Ee=ui(),_e=_i(),re=fi(),G=Ka(),$e=pi(),I=Va(),S=Ya(),me=Za();he.on("impl-presets-snapshot",f=>{let p=f;p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&S.set({revision:p.revision,presets:p.presets})}),he.on("monitor-pipeline-snapshot",f=>{let p=f;if(!(!p||!Array.isArray(p.workspaces)))try{G.set(p.workspaces,p.workspaces_state)}catch{}}),he.on("ui-order-snapshot",f=>{let p=f;if(p&&typeof p.revision=="number")try{$e.set({revision:p.revision,order:p.order&&typeof p.order=="object"?p.order:{}})}catch{}}),he.on("display-policy-snapshot",f=>{let p=f;if(p&&p.policy&&typeof p.policy=="object")try{I.set(p.policy)}catch{}}),he.on("session-log-snapshot",f=>{let p=f;if(p&&typeof p.attempt_id=="string")try{me.set(p.attempt_id,Array.isArray(p.lines)?p.lines:[],typeof p.last_event_at=="number"?p.last_event_at:null)}catch{}}),he.on("session-log-append",f=>{let p=f;if(p&&typeof p.attempt_id=="string")try{me.append(p.attempt_id,p.event)}catch{}}),he.on("snapshot",f=>{let p=f,C=p&&typeof p.id=="string"?p.id:"",se=C?Ee.getStore(C):null;if(se&&p&&p.type==="snapshot")try{se.applyPush(p)}catch{}}),he.on("upsert",f=>{let p=f,C=p&&typeof p.id=="string"?p.id:"",se=C?Ee.getStore(C):null;if(se&&p&&p.type==="upsert")try{se.applyPush(p)}catch{}}),he.on("delete",f=>{let p=f,C=p&&typeof p.id=="string"?p.id:"",se=C?Ee.getStore(C):null;if(se&&p&&p.type==="delete")try{se.applyPush(p)}catch{}});let Ae=null,P=null,H=null,L=null,K=()=>{},ee=new Promise(f=>{K=()=>f(void 0)}),le=!1,ge=!1;async function B(f){let p=xe(f);if(p===P||p===H)return;H=p;let C=`detail:${f}`,se={type:"issue-detail",params:{id:f}};try{Ee.register(C,se)}catch(pe){t("register detail store failed: %o",pe)}try{let pe=await we.subscribeList(C,se);if(u.getState().selected_id!==f||xe(f)!==p){await pe().catch(()=>{});return}Ae&&await Ae().catch(()=>{}),Ae=pe,P=p}catch(pe){t("detail subscribe failed: %o",pe),De(pe,"issue details")}finally{H===p&&(H=null)}}let Y=new Map,$=new Set,M={board:0,worker:0},Le=!1,qe=It;try{let f=window.localStorage.getItem(_d);Mt(f)&&(qe=f)}catch{}let Re=It;try{let f=window.localStorage.getItem(pm);Mt(f)&&(Re=f)}catch{}async function it(f){if(!Mt(f)||f===qe)return;qe=f;try{window.localStorage.setItem(_d,f)}catch{}let p=Y.get(kr);if(!p)return;Y.delete(kr),await p().catch(()=>{});let C=Ze();try{Ee.register(kr,C)}catch(se){t("register %s store failed: %o",kr,se)}try{let se=await we.subscribeList(kr,C);Y.set(kr,se)}catch(se){t("re-subscribe %s failed: %o",kr,se),De(se,"board")}}async function kt(f){if(!Mt(f)||f===Re)return;Re=f;let p=nt.get(wr);if(!p)return;nt.delete(wr),await p().catch(()=>{});let C=gt();try{Ee.register(wr,C)}catch(se){t("register %s store failed: %o",wr,se)}try{let se=await we.subscribeList(wr,C);nt.set(wr,se)}catch(se){t("re-subscribe %s failed: %o",wr,se),De(se,"worker")}}let nt=new Map,ut=null,de=null,Ve=null,Te=null,Ot=null;async function $r(){Te=null,I.clear(),Ot=null,S.clear(),ut=null,de=null,Y.clear(),nt.clear(),M.board+=1,M.worker+=1,Ft();let f=u.getState().workspace.current?.path;if(f)try{await he.send("set-workspace",{path:f})}catch(C){t("workspace restore after reconnect failed: %o",C);return}pt();let p=u.getState();bt(p.view==="board"),z(p.view==="worker"),Ne(p.view==="monitor"),ve(p.view==="board"||p.view==="worker"||!!p.selected_id)}async function ht(){t("clearing all subscriptions for workspace switch"),ot(),Z(),be(),_e.clear(),Qe(),Me(),Et(),pt(),T();let f=u.getState();if(f.selected_id)try{Ee.unregister(`detail:${f.selected_id}`)}catch{}let p=u.getState();bt(p.view==="board"),z(p.view==="worker"),Ne(p.view==="monitor"),ve(p.view==="board"||p.view==="worker"||!!p.selected_id),p.selected_id&&Q(p.selected_id)}async function yt(f){t("requesting workspace switch to %s",f),ge=!0;try{let p=await he.send("set-workspace",{path:f});t("workspace switch result: %o",p),p&&p.workspace&&(u.setState({workspace:{current:{path:p.workspace.root_dir,database:p.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),p.changed&&(await ht(),ce("Switched to "+Bt(f),"success",2e3)))}catch(p){throw t("workspace switch failed: %o",p),ce("Failed to switch workspace","error",3e3),p}finally{ge=!1}}async function rr(f){t("requesting workspace git pull for %s",f);try{let p=await he.send("git-pull-workspace",{});t("workspace git pull result: %o",p);let C=p?.status;if(C==="up_to_date"){ce("Already up to date","success",2e3);return}if(C==="stash_pop_conflict"){ce("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ce("Git pulled "+Bt(f),"success",2e3)}catch(p){t("workspace git pull failed: %o",p);let C=p?.code,se=p?.message;if(C==="rebase_conflict"){ce("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(C==="rebase_conflict_abort_failed"){ce("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(C==="busy"){ce("Git pull skipped: another operation is running","warning",3e3);return}let pe=se?`: ${se}`:"";throw ce(`Git pull failed${pe}`,"error",3e3),p}}async function nr(f,p){t("setting workspace visibility %s \u2192 %s",f,String(p));try{await he.send("set-workspace-visibility",{path:f,visible:p}),await jt()}catch(C){t("workspace visibility update failed: %o",C),ce("Failed to update project visibility","error",3e3)}}async function jt(){try{let f=await he.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let p=f.workspaces.map(ke=>({path:ke.path,database:ke.database,pid:ke.pid,version:ke.version})),C=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,se=Array.isArray(f.hidden)?f.hidden.filter(ke=>typeof ke=="string"):[];u.setState({workspace:{current:C,available:p,hidden:se}});let pe=window.localStorage.getItem("beads-ui.workspace");pe&&(!p.some(Se=>Se.path===pe)||se.includes(pe)?window.localStorage.removeItem("beads-ui.workspace"):C&&pe!==C.path&&(t("restoring saved workspace preference: %s",pe),await yt(pe)))}}catch(f){t("failed to load workspaces: %o",f)}}he.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(u.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),jt(),ht())});let vt=!1;if(typeof he.onConnection=="function"){let f=p=>{t("ws state %s",p),p==="reconnecting"||p==="closed"?(vt=!0,ce("Connection lost. Reconnecting\u2026","error",4e3)):p==="open"&&vt&&(vt=!1,ce("Reconnected","success",2200),um(u,(C,se)=>{t(`${C}: %o`,se)}),$r())};he.onConnection(f)}let Xt="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(Xt=f)}catch(f){t("view parse error: %o",f)}let u=bi({config:dm(),view:Xt});he.on("worker-queue-snapshot",f=>{let p=f;if(!p||!p.queue)return;let C=u.getState().workspace.current?.path;if(typeof C=="string"&&C.length>0&&p.root_dir!==C){t("dropping worker-queue snapshot for %s",String(p.root_dir));return}try{_e.set(p.queue)}catch{}}),he.on("worker-parallel-analysis-snapshot",f=>{let p=f;if(!p)return;let C=u.getState().workspace.current?.path;if(!(typeof C=="string"&&C.length>0&&typeof p.root_dir=="string"&&p.root_dir!==C))try{re.set({settings:p.settings,job:p.job??null,last_good:p.last_good??null})}catch{}});let y=mi(u);y.start();let j=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),te=async(f,p)=>{try{return await Pe(f,p)}catch(C){if(j.has(f))throw C;return[]}};n&&$c(n,u,y);let U=document.getElementById("workspace-picker");U&&nd(U,u,yt,rr,nr);let h=Ec(e,(f,p)=>Pe(f,p));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>h.open())}catch{}let O=Ic(e,{policyStore:I,queueStore:_e,implPresetStore:S,transport:(f,p)=>Pe(f,p),onOpenChange:f=>{Le=f,Ie()},labelOptions:()=>{let f=new Set;for(let[p]of ia)for(let C of Ee.snapshotFor(p)||[]){let se=C.labels;if(Array.isArray(se))for(let pe of se)typeof pe=="string"&&pe.length>0&&f.add(pe)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>O.open()))}catch{}let ne=Ti(o,{gotoIssue:f=>y.gotoIssue(f),issueStores:Ee,transport:te,workerQueueStore:_e,uiOrderStore:$e,displayPolicyStore:I,closedRange:qe,onClosedRangeChange:f=>{it(f)},onNewIssue:()=>h.open()}),Ce=sa(a,{transport:te,issueStores:Ee,queueStore:_e,analysisStore:re,sessionLogStore:me,uiOrderStore:$e,gotoIssue:f=>u.setState({selected_id:f}),getWorkspacePath:()=>u.getState().workspace.current?.path,doneRange:Re,onDoneRangeChange:f=>{kt(f)}}),Je=kc(l,{transport:te,pipelineStore:G,execPresetStore:S,gotoIssue:f=>y.gotoIssue(f),getWorkspacePath:()=>u.getState().workspace.current?.path,switchWorkspace:f=>yt(f)}),Be=Gl(c,{issueStores:Ee,transport:te,queueStore:_e,execPresetStore:S,sessionLogStore:me,getWorkspacePath:()=>u.getState().workspace.current?.path,onNavigate:f=>{u.getState().view==="worker"?u.setState({selected_id:f}):y.gotoIssue(f)},onClose:()=>{let f=u.getState();u.setState({selected_id:null});try{y.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{O.open("session")}}),ye=u.getState().selected_id;ye&&(c.hidden=!1,Be.load(ye),Q(ye)),u.subscribe(f=>{let p=f.selected_id;p?(c.hidden=!1,Be.load(p),ge||Q(p)):(Be.clear(),c.hidden=!0,T())});let v=f=>{o.hidden=f.view!=="board",a.hidden=f.view!=="worker",l.hidden=f.view!=="monitor",bt(f.view==="board"),z(f.view==="worker"),Ne(f.view==="monitor"),ve(f.view==="board"||f.view==="worker"||Le||!!f.selected_id),!f.selected_id&&f.view==="board"&&ne.load(),f.view==="worker"&&Ce.load(),f.view==="monitor"?Je.load():Je.pause(),window.localStorage.setItem("beads-ui.view",f.view)};u.subscribe(v),v(u.getState()),Me(),pt(),Ft(),jt().finally(()=>{le=!0,K()}),window.addEventListener("keydown",f=>{let p=f.ctrlKey||f.metaKey,C=String(f.key||"").toLowerCase(),se=f.target,pe=se&&se.tagName?String(se.tagName).toLowerCase():"",ke=pe==="input"||pe==="textarea"||pe==="select"||se&&typeof se.isContentEditable=="boolean"&&se.isContentEditable;p&&C==="n"&&(ke||(f.preventDefault(),h.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&fm(t)});export{fm as bootstrap,dm as readBootstrapConfig,um as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
