var xl=Object.create;var Vn=Object.defineProperty;var Sl=Object.getOwnPropertyDescriptor;var Al=Object.getOwnPropertyNames;var Tl=Object.getPrototypeOf,El=Object.prototype.hasOwnProperty;var Cl=(e,t,r)=>t in e?Vn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Kn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Rl=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Al(t))!El.call(e,s)&&s!==r&&Vn(e,s,{get:()=>t[s],enumerable:!(n=Sl(t,s))||n.enumerable});return e};var Il=(e,t,r)=>(r=e!=null?xl(Tl(e)):{},Rl(t||!e||!e.__esModule?Vn(r,"default",{value:e,enumerable:!0}):r,e));var ze=(e,t,r)=>Cl(e,typeof t!="symbol"?t+"":t,r);var Lo=Kn((qp,Io)=>{var yr=1e3,kr=yr*60,wr=kr*60,dr=wr*24,Ml=dr*7,Nl=dr*365.25;Io.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Fl(e);if(r==="number"&&isFinite(e))return t.long?Bl(e):ql(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Fl(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Nl;case"weeks":case"week":case"w":return r*Ml;case"days":case"day":case"d":return r*dr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*wr;case"minutes":case"minute":case"mins":case"min":case"m":return r*kr;case"seconds":case"second":case"secs":case"sec":case"s":return r*yr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ql(e){var t=Math.abs(e);return t>=dr?Math.round(e/dr)+"d":t>=wr?Math.round(e/wr)+"h":t>=kr?Math.round(e/kr)+"m":t>=yr?Math.round(e/yr)+"s":e+"ms"}function Bl(e){var t=Math.abs(e);return t>=dr?un(e,t,dr,"day"):t>=wr?un(e,t,wr,"hour"):t>=kr?un(e,t,kr,"minute"):t>=yr?un(e,t,yr,"second"):e+" ms"}function un(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Oo=Kn((Bp,Do)=>{function Ul(e){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Lo(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let h=0;h<p.length;h++)f=(f<<5)-f+p.charCodeAt(h),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,h=null,A,$;function y(...D){if(!y.enabled)return;let F=y,Q=Number(new Date),Z=Q-(f||Q);F.diff=Z,F.prev=f,F.curr=Q,f=Q,D[0]=r.coerce(D[0]),typeof D[0]!="string"&&D.unshift("%O");let P=0;D[0]=D[0].replace(/%([a-zA-Z%])/g,(T,C)=>{if(T==="%%")return"%";P++;let U=r.formatters[C];if(typeof U=="function"){let ue=D[P];T=U.call(F,ue),D.splice(P,1),P--}return T}),r.formatArgs.call(F,D),(F.log||r.log).apply(F,D)}return y.namespace=p,y.useColors=r.useColors(),y.color=r.selectColor(p),y.extend=n,y.destroy=r.destroy,Object.defineProperty(y,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(A!==r.namespaces&&(A=r.namespaces,$=r.enabled(p)),$),set:D=>{h=D}}),typeof r.init=="function"&&r.init(y),y}function n(p,f){let h=r(this.namespace+(typeof f>"u"?":":f)+p);return h.log=this.log,h}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(p,f){let h=0,A=0,$=-1,y=0;for(;h<p.length;)if(A<f.length&&(f[A]===p[h]||f[A]==="*"))f[A]==="*"?($=A,y=h,A++):(h++,A++);else if($!==-1)A=$+1,y++,h=y;else return!1;for(;A<f.length&&f[A]==="*";)A++;return A===f.length}function i(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function l(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Do.exports=Ul});var Po=Kn((At,pn)=>{At.formatArgs=zl;At.save=Hl;At.load=Wl;At.useColors=jl;At.storage=Gl();At.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();At.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function jl(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function zl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+pn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}At.log=console.debug||console.log||(()=>{});function Hl(e){try{e?At.storage.setItem("debug",e):At.storage.removeItem("debug")}catch{}}function Wl(){let e;try{e=At.storage.getItem("debug")||At.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Gl(){try{return localStorage}catch{}}pn.exports=Oo()(At);var{formatters:Yl}=pn.exports;Yl.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Lr=globalThis,dn=Lr.trustedTypes,ho=dn?dn.createPolicy("lit-html",{createHTML:e=>e}):void 0,$o="$lit$",Qt=`lit$${Math.random().toFixed(9).slice(2)}$`,xo="?"+Qt,Ll=`<${xo}>`,lr=document,Dr=()=>lr.createComment(""),Or=e=>e===null||typeof e!="object"&&typeof e!="function",rs=Array.isArray,Dl=e=>rs(e)||typeof e?.[Symbol.iterator]=="function",Zn=`[ 	
\f\r]`,Ir=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bo=/-->/g,vo=/>/g,ir=RegExp(`>|${Zn}(?:([^\\s"'>=/]+)(${Zn}*=${Zn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yo=/'/g,ko=/"/g,So=/^(?:script|style|textarea|title)$/i,ns=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=ns(1),jt=ns(2),Lp=ns(3),cr=Symbol.for("lit-noChange"),et=Symbol.for("lit-nothing"),wo=new WeakMap,ar=lr.createTreeWalker(lr,129);function Ao(e,t){if(!rs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ho!==void 0?ho.createHTML(t):t}var Ol=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=Ir;for(let l=0;l<r;l++){let a=e[l],d,p,f=-1,h=0;for(;h<a.length&&(i.lastIndex=h,p=i.exec(a),p!==null);)h=i.lastIndex,i===Ir?p[1]==="!--"?i=bo:p[1]!==void 0?i=vo:p[2]!==void 0?(So.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=ir):p[3]!==void 0&&(i=ir):i===ir?p[0]===">"?(i=s??Ir,f=-1):p[1]===void 0?f=-2:(f=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?ir:p[3]==='"'?ko:yo):i===ko||i===yo?i=ir:i===bo||i===vo?i=Ir:(i=ir,s=void 0);let A=i===ir&&e[l+1].startsWith("/>")?" ":"";o+=i===Ir?a+Ll:f>=0?(n.push(d),a.slice(0,f)+$o+a.slice(f)+Qt+A):a+Qt+(f===-2?l:A)}return[Ao(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Pr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=t.length-1,a=this.parts,[d,p]=Ol(t,r);if(this.el=e.createElement(d,n),ar.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=ar.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith($o)){let h=p[i++],A=s.getAttribute(f).split(Qt),$=/([.?@])?(.*)/.exec(h);a.push({type:1,index:o,name:$[2],strings:A,ctor:$[1]==="."?Qn:$[1]==="?"?Jn:$[1]==="@"?es:br}),s.removeAttribute(f)}else f.startsWith(Qt)&&(a.push({type:6,index:o}),s.removeAttribute(f));if(So.test(s.tagName)){let f=s.textContent.split(Qt),h=f.length-1;if(h>0){s.textContent=dn?dn.emptyScript:"";for(let A=0;A<h;A++)s.append(f[A],Dr()),ar.nextNode(),a.push({type:2,index:++o});s.append(f[h],Dr())}}}else if(s.nodeType===8)if(s.data===xo)a.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(Qt,f+1))!==-1;)a.push({type:7,index:o}),f+=Qt.length-1}o++}}static createElement(t,r){let n=lr.createElement("template");return n.innerHTML=t,n}};function hr(e,t,r=e,n){if(t===cr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Or(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=hr(e,s._$AS(e,t.values),s,n)),t}var Xn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??lr).importNode(r,!0);ar.currentNode=s;let o=ar.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Mr(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new ts(o,this,t)),this._$AV.push(d),a=n[++l]}i!==a?.index&&(o=ar.nextNode(),i++)}return ar.currentNode=lr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Mr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=et,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=hr(this,t,r),Or(t)?t===et||t==null||t===""?(this._$AH!==et&&this._$AR(),this._$AH=et):t!==this._$AH&&t!==cr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Dl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==et&&Or(this._$AH)?this._$AA.nextSibling.data=t:this.T(lr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Pr.createElement(Ao(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Xn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(t){let r=wo.get(t.strings);return r===void 0&&wo.set(t.strings,r=new Pr(t)),r}k(t){rs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Dr()),this.O(Dr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},br=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=et,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=et}_$AI(t,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)t=hr(this,t,r,0),i=!Or(t)||t!==this._$AH&&t!==cr,i&&(this._$AH=t);else{let l=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=hr(this,l[n+a],r,a),d===cr&&(d=this._$AH[a]),i||(i=!Or(d)||d!==this._$AH[a]),d===et?t=et:t!==et&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!s&&this.j(t)}j(t){t===et?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Qn=class extends br{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===et?void 0:t}},Jn=class extends br{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==et)}},es=class extends br{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=hr(this,t,r,0)??et)===cr)return;let n=this._$AH,s=t===et&&n!==et||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==et&&(n===et||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ts=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){hr(this,t)}};var Pl=Lr.litHtmlPolyfillSupport;Pl?.(Pr,Mr),(Lr.litHtmlVersions??(Lr.litHtmlVersions=[])).push("3.3.1");var Oe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Mr(t.insertBefore(Dr(),o),o,void 0,r??{})}return s._$AI(e),s};var Ct="today",qt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function zt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function vr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function To(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Eo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Co(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ro(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Mo=Il(Po(),1);function Ke(e){return(0,Mo.default)(`beads-ui:${e}`)}function Dt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ur(e,t){let r=Dt(e.created_at),n=Dt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function qo(e,t){let r=Dt(e.created_at),n=Dt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Bo(e,t){let r=Dt(e.updated_at),n=Dt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Uo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Dt(e.created_at),o=Dt(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function jo(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Vl=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function No(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Fo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Vl.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function zo(e,t){let r=No(e),n=No(t);if(r!==n)return r<n?-1:1;let s=Fo(e),o=Fo(t);if(s!==o)return s<o?-1:1;let i=Dt(e&&e.created_at),l=Dt(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,d=t&&t.id;return a===d?0:String(a)<String(d)?-1:1}var ss=2**20;function $r(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Dt(e&&e.created_at)}function fn(e){return(t,r)=>{let n=$r(t,e),s=$r(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,i=r?.id;return o<i?-1:o>i?1:0}}function os(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:$r(l,r)-ss};if(!l)return{rank:$r(i,r)+ss};let a=$r(i,r),d=$r(l,r),p=(a+d)/2;return a<p&&p<d?{rank:p}:{renormalize:n.map((f,h)=>({bead_id:f.id,rank:h*ss}))}}function is(e,t={}){let r=Ke(`issue-store:${e}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=t.sort||ur;function d(){for(let h of Array.from(i))try{h()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function f(h){if(l||!h||h.id!==e)return;let A=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,A),!(A<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(A<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let y of $)y&&typeof y.id=="string"&&y.id.length>0&&n.set(y.id,y);p(),o=A,d();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let y=n.get($.id);if(!y)n.set($.id,$);else{let D=Number.isFinite(y.updated_at)?y.updated_at:0,F=Number.isFinite($.updated_at)?$.updated_at:0;if(D<=F){for(let Q of Object.keys(y))Q in $||delete y[Q];for(let[Q,Z]of Object.entries($))y[Q]=Z}}p()}o=A,d()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),p()),o=A,d()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function _n(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ho(e){let t=Ke("subs"),r=new Map,n=new Map;function s(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let p=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let A of Array.from(d)){let $=r.get(A);if(!$)continue;let y=$.itemsById;for(let D of p)typeof D=="string"&&D.length>0&&y.set(D,!0);for(let D of f)typeof D=="string"&&D.length>0&&y.set(D,!0);for(let D of h)typeof D=="string"&&D.length>0&&y.delete(D)}}async function o(l,a){let d=_n(a);if(t("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let f=r.get(l);if(f&&f.key!==d){let h=n.get(f.key);h&&(h.delete(l),h.size===0&&n.delete(f.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let h=r.get(l)||null;if(h){let A=n.get(h.key);A&&(A.delete(l),A.size===0&&n.delete(h.key))}throw r.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let f=r.get(l)||null;if(f){let h=n.get(f.key);h&&(h.delete(l),h.size===0&&n.delete(f.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:_n,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let p of a.itemsById.keys())d[p]=!0;return d}}}}function Wo(){let e=Ke("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,d,p){let f=d?_n(d):"",h=r.get(a)||"",A=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,h),A&&h&&f&&h!==f){let $=t.get(a);if($)try{$.dispose()}catch{}let y=s.get(a);if(y){try{y()}catch{}s.delete(a)}let D=is(a,p);t.set(a,D);let F=D.subscribe(()=>o());s.set(a,F)}else if(!A){let $=is(a,p);t.set(a,$);let y=$.subscribe(()=>o());s.set(a,y)}return r.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),r.delete(a);let d=t.get(a);d&&(d.dispose(),t.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let d=t.get(a);return d?d.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Go(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Yo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function as(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Kl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Zl(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Vo(e){let t=Ke("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Kl(n),i=Zl(n);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=as(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?as(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Xl=Object.freeze({workspace_config:{default_workspace:null}});function Ko(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Xl.workspace_config.default_workspace}}}function Zo(e={}){let t=Ke("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ko(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ko(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!l&&!a||(r=i,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Xo(e){let t=Ke("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function i(){r+=1,t("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function a(d){return async(f,h)=>{let A=s++,$=Date.now();n.set(A,{type:f,start_ts:$}),t("request start id=%d type=%s count=%d",A,f,r+1),i();let y=!1,D=()=>{y||(y=!0,n.delete(A),l())},F=setTimeout(()=>{y||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,f,Date.now()-$),D())},3e4);try{let Q=await d(f,h),Z=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",A,f,Z),Q}catch(Q){let Z=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,f,Z,Q),Q}finally{clearTimeout(F),D()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function ne(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function mn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return a.sort(jo),a;switch(l){case"created_desc":return a.sort(ur),a;case"created_asc":return a.sort(qo),a;case"updated_desc":return a.sort(Bo),a;case"priority":return a.sort(Uo),a;case"manual":default:{let d=r();return d?a.sort(fn(d)):a.sort(ur),a}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Nr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function yt(e){let t=Nr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Tt(e,t){let r=Nr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function gn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Nr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function hn(e){let t=e.transport,r=e.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let d of l)a[d.bead_id]=d.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(os(l,a,d.order),i);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(h);let A=n(os(l,a,h.order),i);s(h,A);let $=await t("ui-order-set",{expected_revision:h.revision,entries:A});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function bn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ls(e,t){return!t||typeof e!="string"||e.length===0||bn(t.visible_labels).includes(e)?!0:bn(t.hidden_labels).includes(e)?!1:!bn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function vn(e,t){return bn(e).filter(r=>ls(r,t))}function Jt(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Ql={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Jo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Qo={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Jl={review:"\u2713",skip:"\u2298"},er={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ec(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ei(e){let t=e&&e.fill||"none";return t==="none"?er.none:e&&e.stale===!0?er.stale:t==="dim"?er.dim:e&&e.glyph==="review"?er.review:e&&e.glyph==="skip"?er.skip:er.done}function tc(e){if(!e||e.fill==="none"||!e.approval_state)return ei(e);let t=[];return e.glyph==="review"?t.push(er.review):e.glyph==="skip"&&t.push(er.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function rc(e,t,r){let n=Ql[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,i=Jl[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${l} style=${d}>${i}</div>
      <div class=${a}>
        ${Jo[e]||e}
      </div>
    </div>
  `}function yn(e,t){if(!e||!e.stages)return"";let r=Qo[e.route]||Qo.spec_backed,n=e.stages,s=ec(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(i=>`${Jo[i]||i} ${i==="plan"?tc(n[i]||{}):ei(n[i]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(i=>rc(i,n[i]||{},i===s))}
    </div>
  `}function nc(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ti=2;function sc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ti).join(", "),s=r.length-ti,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function oc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Jt(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&Jt(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Jt(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}for(let i of vn(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);e.from_id&&Jt(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Jt(r,"blocked")&&s.push(...sc(e.blocked_info));let o=t.cleanupFailureFor?t.cleanupFailureFor(e.id):null;if(o&&Jt(r,"blocked")){let i=t.isCleanupDiagnosisPending?t.isCleanupDiagnosisPending(e.id):!1,l=o.diagnosis&&typeof o.diagnosis=="object"&&!Array.isArray(o.diagnosis)?o.diagnosis:null;if(s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),l){let a=l.malformed===!0||l.verdict==="malformed"?"\uD310\uC815 \uBD88\uAC00":String(l.verdict||"\uD310\uC815 \uBD88\uAC00"),d=typeof l.evidence=="string"?l.evidence.trim().slice(0,96):"",p=typeof l.fix_bead_id=="string"&&l.fix_bead_id.length>0?` \xB7 fix ${l.fix_bead_id}`:"",f=d?` \xB7 ${d}`:"";s.push(c`<span
          class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnosis"
          title=${d}
          >AI ${a}${f}${p}</span
        >`)}s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnose"
        data-bead-id=${e.id}
        ?disabled=${i}
        title="정리 실패 원인을 AI 세션으로 분류합니다"
        @click=${a=>{t.onCleanupDiagnose&&t.onCleanupDiagnose(a,e.id)}}
      >
        AI 정리
      </button>`)}return s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function ic(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ac(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${yt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${yt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function lc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(zo):r.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>t.onRollupToggle&&t.onRollupToggle(i,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${ac(e)}
      </div>
      ${n>0&&r.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?c`<div class="board-card__roll-list">
            ${o.map((i,l)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>t.onChildClick&&t.onChildClick(a,i.id)}
                >
                  <span class=${ic(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function kn(e,t){let r=nc(e.priority);return c`
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
      ${oc(e,t)}
      ${e.workflow&&Jt(t.policy||null,"stepper")?yn(e.workflow,e.status):""}
      ${lc(e,t)}
    </article>
  `}function xr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${qt.map(o=>c`<option
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
        ${e.items.map(o=>kn(o,t))}
      </div>
    </section>
  `}function ri(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>kn(n,t))}
        </div>
      </div>
    </dialog>
  `}var cc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],dc=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],uc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function pc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function ni(e,t,r){return c`
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
        ${cc.map(n=>c`<option
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
        ${dc.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${pc(e,t,r)}
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
        ${uc.map(n=>c`<option
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
  `}var fc=200,_c={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},mc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),si="beads-ui.board.sort",oi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function gc(){try{let e=window.localStorage.getItem(si);if(e&&oi.has(e))return e}catch{}return"created_desc"}function ii(e,t){let r=Ke("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Ct,h=s?mn(s,i):null,A=hn({transport:o,uiOrderStore:i}),$=[],y=[],D=[],F=[],Q=[],Z=[],P=!1,R=0,T=gc(),C=new Map,U=new Map,ue=new Map,$e=new Set,_e=new Set,pe={search:"",priority:"",type:"",labels:[]},Ee=!1,je=null;function Ze(E){return String(E.status||"open")==="open"}function He(E){let N=String(E.status||"open");return N==="open"||N==="blocked"}function xe(E){let N=pe.search.trim().toLowerCase(),u=pe.priority,_=pe.type,x=pe.labels;return E.filter(K=>{if(N){let ce=String(K.id||"").toLowerCase(),ve=String(K.title||"").toLowerCase();if(!ce.includes(N)&&!ve.includes(N))return!1}if(u!==""&&String(K.priority)!==u||_!==""&&String(K.issue_type||"")!==_)return!1;if(x.length>0){let ce=Array.isArray(K.labels)?K.labels:[];if(!x.some(ve=>ce.includes(ve)))return!1}return!0})}function L(){let E=new Set;for(let N of[$,y,D,F,Q,Z])for(let u of N){let _=Array.isArray(u.labels)?u.labels:[];for(let x of _)typeof x=="string"&&x.length>0&&E.add(x)}return Array.from(E).sort()}function H(){return pe.search.trim()!==""||pe.priority!==""||pe.type!==""||pe.labels.length>0}function me(){try{if(h){let E=h.selectBoardColumn("tab:board:in-progress","in_progress",T),N=h.selectBoardColumn("tab:board:blocked","blocked",T).filter(He),u=new Set(E.map(le=>le.id)),_=h.selectBoardColumn("tab:board:ready","ready",T).filter(le=>Ze(le)&&!u.has(le.id)),x=h.selectBoardColumn("tab:board:resolved","resolved",T),K=h.selectBoardColumn("tab:board:deferred","deferred",T),ce=h.selectBoardColumn("tab:board:closed","closed").slice(0,fc),ve=[...N,..._,...E,...x,...ce];se(ve);let ye=new Set;for(let le of ve)le&&le.id&&!cs(le)&&ye.add(le.id);let be=!H();$=be?Fr(N,ye):N,y=be?Fr(_,ye):_,D=be?Fr(E,ye):E,F=be?Fr(x,ye):x,Q=K,R=K.length,Z=be?Fr(ce,ye):ce,C=new Map;for(let le of $)C.set(le.id,"open");for(let le of y)C.set(le.id,"open");for(let le of D)C.set(le.id,"in_progress");for(let le of F)C.set(le.id,"resolved");for(let le of Q)C.set(le.id,"deferred");for(let le of Z)C.set(le.id,"closed");U=new Map;for(let le of $)U.set(le.id,"blocked-col");for(let le of y)U.set(le.id,"ready-col");for(let le of D)U.set(le.id,"in-progress-col");for(let le of F)U.set(le.id,"resolved-col");for(let le of Z)U.set(le.id,"closed-col")}We()}catch{$=[],y=[],D=[],F=[],Q=[],Z=[],ue=new Map,We()}}function se(E){let N=new Map;for(let _ of E)_&&_.id&&!N.has(_.id)&&N.set(_.id,_);let u=new Map;for(let _ of N.values()){let x=cs(_);if(!x)continue;let K=u.get(x);K||(K=[],u.set(x,K)),K.push({id:_.id,title:_.title,status:_.status,metadata:_.metadata,created_at:_.created_at,updated_at:_.updated_at})}ue=u}function we(E){let N=ue.get(E)||[],u=0;for(let x of N)(x.status==="resolved"||x.status==="closed")&&(u+=1);let _=gn(N);return{total:N.length,count:u,current:_,children:N}}function ge(E){return!$e.has(E)}function Be(E,N){E.preventDefault(),E.stopPropagation(),$e.has(N)?$e.delete(N):$e.add(N),We()}function he(E,N){E.preventDefault(),E.stopPropagation(),n(N)}function Ce(E,N){E.preventDefault(),E.stopPropagation(),n(N)}function B(E,N){je||n(N)}function O(E,N){E.preventDefault(),E.stopPropagation(),hc(N).then(u=>{u&&ne("\uBCF5\uC0AC\uB428","success",1200)})}function re(E,N){je=N,E.dataTransfer&&(E.dataTransfer.setData("text/plain",N),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function Se(E){E.target.classList.remove("board-card--dragging"),bt(),setTimeout(()=>{je=null},0)}function Ie(E){let N=String(E.target.value||"");!N||N===f||(f=N,d&&d(N),We())}function q(){return l?l.get():null}function z(E){let N=a?a.get():null,u=N?N.cleanup_failed:null;if(!u||typeof u!="object"||Array.isArray(u))return null;let _=u[E];return!_||typeof _!="object"||Array.isArray(_)?null:_}function M(E,N){if(!E||typeof E!="object"||Array.isArray(E))return!1;let u=Object.values(E),_=new Set;for(let x of u)x&&typeof x=="object"&&typeof x.resumed_from=="string"&&x.resumed_from.length>0&&_.add(x.resumed_from);return u.some(x=>x&&typeof x=="object"&&x.bead_id===N&&x.cleanup_diagnosis===!0&&(x.status==="running"||x.status==="paused"&&!_.has(x.attempt_id)))}function oe(E){let N=a?a.get():null;return _e.has(E)||M(N?N.attempts:null,E)}function ae(E){E&&E.queue&&a&&a.set(E.queue)}async function w(E,N){if(E.preventDefault(),E.stopPropagation(),!o||!a||!z(N)||_e.has(N))return;_e.add(N),We();let u;try{let _=a.get(),x=_&&typeof _.revision=="number"?_.revision:0;if(u=await o("worker-cleanup-diagnose",{bead_id:N,expected_revision:x}),ae(u),u&&u.conflict){let K=a.get(),ce=K&&typeof K.revision=="number"?K.revision:0;u=await o("worker-cleanup-diagnose",{bead_id:N,expected_revision:ce}),ae(u)}}finally{_e.delete(N),We()}u&&!u.conflict&&u.ok===!1&&u.reason&&ne(`AI \uC815\uB9AC \uAC70\uBD80: ${u.reason}`,"error",2400)}let Y={onCardClick:B,onCopyId:O,onDragStart:re,onDragEnd:Se,onClosedRangeChange:Ie,rollupFor:we,isExpanded:ge,onRollupToggle:Be,onChildClick:he,onFromChipClick:Ce,cleanupFailureFor:z,isCleanupDiagnosisPending:oe,onCleanupDiagnose:w,get policy(){return q()}};function G(E,N){je||(gt(),n(N))}function ee(E,N){E.preventDefault(),E.stopPropagation(),gt(),n(N)}let fe={...Y,onCardClick:G,onChildClick:ee,onFromChipClick:ee,get policy(){return q()}};function Te(E){let N=E.target,u=e.querySelector(".board-filter__labels");N&&u&&u.contains(N)||Xe()}function Ne(E){E.key==="Escape"&&Xe()}function Ye(){Ee||(Ee=!0,document.addEventListener("mousedown",Te),document.addEventListener("keydown",Ne),We())}function Xe(){Ee&&(Ee=!1,document.removeEventListener("mousedown",Te),document.removeEventListener("keydown",Ne),We())}function ut(E){E.key==="Escape"&&gt()}function it(){P||(P=!0,document.addEventListener("keydown",ut),We())}function gt(){P&&(P=!1,document.removeEventListener("keydown",ut),We())}let Pe={onClose:gt,onOverlayClick(E){E.target===E.currentTarget&&gt()}},pt={onSearchInput(E){pe.search=String(E.target.value||""),me()},onPriorityChange(E){pe.priority=String(E.target.value||""),me()},onTypeChange(E){pe.type=String(E.target.value||""),me()},onSortChange(E){let N=String(E.target.value||"");if(!(!oi.has(N)||N===T)){T=N;try{window.localStorage.setItem(si,N)}catch{}me()}},onDeferredToggle(){P?gt():it()},onLabelMenuToggle(){Ee?Xe():Ye()},onLabelToggle(E){let N=pe.labels.indexOf(E);N===-1?pe.labels.push(E):pe.labels.splice(N,1),me()},onLabelClear(){pe.labels.length!==0&&(pe.labels=[],me())},onNewIssue(){p&&p()}};function st(){return c`
      <div class="board-view">
        ${ni(pe,pt,{sort_mode:T,deferred_popup_open:P,deferred_count:R,label_options:L(),label_menu_open:Ee})}
        <div class="board-root">
          ${xr({title:"Blocked",id:"blocked-col",items:xe($)},Y)}
          ${xr({title:"Ready",id:"ready-col",items:xe(y)},Y)}
          ${xr({title:"In progress",id:"in-progress-col",items:xe(D)},Y)}
          ${xr({title:"Resolved",id:"resolved-col",items:xe(F)},Y)}
          ${xr({title:"Closed",id:"closed-col",items:xe(Z),is_closed:!0,closed_range:f},Y)}
        </div>
        ${P?ri({items:xe(Q),count:R},fe,Pe):""}
      </div>
    `}function We(){Oe(st(),e),ht()}function ht(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let N=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let u of N)Array.from(u.querySelectorAll(".board-card")).forEach((x,K)=>{x.tabIndex=K===0?0:-1})}catch{}}async function at(E,N){if(!o){ne("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:N}),ne("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(u){r("update-status failed: %o",u),ne("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ot(E){switch(E){case"blocked-col":return $;case"ready-col":return y;case"in-progress-col":return D;case"resolved-col":return F;default:return[]}}function tt(E,N,u){if(!o||!i)return;let _=ot(E),x=_.find(be=>be.id===N);if(!x)return;let K=_.filter(be=>be.id!==N),ce=u.closest?u.closest(".board-card"):null,ve=K.length;if(ce){let be=ce.getAttribute("data-issue-id");if(be===N)return;let le=K.findIndex(De=>De.id===be);le>=0&&(ve=le)}let ye=K.slice();ye.splice(ve,0,x),A.applyReorder(N,ye,ve)}function bt(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let Je=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let u=E.target.closest(".board-column");u&&u!==Je&&(Je&&Je.classList.remove("board-column--drag-over"),u.classList.add("board-column--drag-over"),Je=u)}),e.addEventListener("dragleave",E=>{let N=E.relatedTarget;(!N||!e.contains(N))&&Je&&(Je.classList.remove("board-column--drag-over"),Je=null)}),e.addEventListener("drop",E=>{E.preventDefault(),Je&&(Je.classList.remove("board-column--drag-over"),Je=null);let N=E.target,u=N.closest(".board-column");if(!u)return;let _=E.dataTransfer?.getData("text/plain")||"";if(!_)return;let x=u.id,K=U.get(_);if(K&&K===x){if(mc.has(x)){if(T!=="manual"){ne("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}tt(x,_,N)}return}let ce=_c[x];if(!ce){ne("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}C.get(_)!==ce&&at(_,ce)}),e.addEventListener("keydown",E=>{let N=E.target;if(!(N instanceof HTMLElement))return;let u=String(N.tagName||"").toLowerCase();if(u==="input"||u==="textarea"||u==="select"||u==="button"||u==="a"||N.isContentEditable===!0)return;let _=N.closest(".board-card");if(!_)return;let x=String(E.key||"");if(x==="Enter"||x===" "){E.preventDefault();let ye=_.getAttribute("data-issue-id");ye&&n(ye);return}if(x!=="ArrowUp"&&x!=="ArrowDown"&&x!=="ArrowLeft"&&x!=="ArrowRight")return;E.preventDefault();let K=_.closest(".board-column");if(!K)return;let ce=Array.from(K.querySelectorAll(".board-card")),ve=ce.indexOf(_);if(x==="ArrowDown"&&ve<ce.length-1){kt(_,ce[ve+1]);return}if(x==="ArrowUp"&&ve>0){kt(_,ce[ve-1]);return}if(x==="ArrowLeft"||x==="ArrowRight"){let ye=Array.from(e.querySelectorAll(".board-column")),be=ye.indexOf(K),le=x==="ArrowRight"?1:-1,De=be+le;for(;De>=0&&De<ye.length;){let Qe=ye[De].querySelector(".board-card");if(Qe){kt(_,Qe);return}De+=le}}});function kt(E,N){try{E.tabIndex=-1,N.tabIndex=0,N.focus()}catch{}}let Ve=null;h&&h.subscribe&&(Ve=h.subscribe(()=>{try{me()}catch{}}));let lt=null;l&&l.subscribe&&(lt=l.subscribe(()=>{try{me()}catch{}}));let ft=null;return a&&a.subscribe&&(ft=a.subscribe(()=>{We()})),{async load(){r("load"),me()},clear(){Xe(),gt(),Ve&&(Ve(),Ve=null),lt&&(lt(),lt=null),ft&&(ft(),ft=null),e.replaceChildren(),$=[],y=[],D=[],F=[],Q=[],Z=[],C=new Map,U=new Map}}}function cs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Fr(e,t){return e.filter(r=>{let n=cs(r);return!(n&&t.has(n))})}async function hc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function pr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var ui="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function dt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Ht=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],qr=[...Ht,"reasoning_output_tokens"],bc=["implementation","review-consult"];function ds(e){let t=0;for(let r of Ht)t+=dt(e?.[r]);return t}function vc(e){return!e||typeof e!="object"?!1:Ht.some(t=>Number.isFinite(e[t]))}function ai(e){return!e||typeof e!="object"?!1:qr.some(t=>Number.isFinite(e[t]))}function yc(e){let t={};for(let r of qr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function li(e){let t={};for(let r of qr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ci(e,t){return e==="codex"?dt(t.input_tokens)+dt(t.output_tokens):ds(t)}function kc(e){return e==="claude"?"Claude":"Codex"}function wc(e){return`\u03C4 ${pi(e)}`}function $c(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${dt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${dt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${dt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${dt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${dt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${dt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${dt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ui),o.join(`
`)}function mt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${kc(r)} ${wc(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:$c(r,n)})}return t}function $n(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let i=s.providers[o];if(!i)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=i.subtotal;for(let a of qr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=dt(l.breakdown[a])+dt(i.breakdown[a]));i.replayed&&(l.replayed=!0),o==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?n.claude+=i.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function us(e){return!e||typeof e!="object"?null:Rt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function xc(e){return e==="codex"?"codex":"claude"}function tr(){return{subtotal:0,breakdown:yc(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function wn(e,t,r){e.subtotal+=t.subtotal;for(let n of qr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=dt(e.breakdown[n])+dt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function di(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function pi(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Sr(e){return vc(e)?`\u03C4 ${pi(ds(e))}`:null}function Ot(e){let t=Sr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Ar(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${dt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${dt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${dt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${dt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${ds(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ui),r.join(`
`)}function Rt(e,t){let r={claude:tr(),codex:tr()},n={orchestrator:{claude:tr(),codex:tr()},implementation:{claude:tr(),codex:tr()},"review-consult":{claude:tr(),codex:tr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(ai(a)){let p=xc(l.runner),f=li(a),h={provider:p,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:ci(p,f)};f.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),wn(r[p],h,!0),wn(n.orchestrator[p],h,!0)}let d=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!bc.includes(p.role)||!ai(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let h=li(p.usage),A={provider:"codex",role:p.role,attempt_id:String(l.attempt_id||""),usage:h,subtotal:ci("codex",h)};A.receipt_id=f,typeof p.model=="string"&&(A.model=p.model),typeof p.session_id=="string"?A.session_id=p.session_id:typeof p.thread_id=="string"&&(A.session_id=p.thread_id),typeof p.turn_id=="string"&&(A.turn_id=p.turn_id),typeof p.completed_at=="string"&&(A.completed_at=p.completed_at),h.replayed===!0&&(A.replayed=!0),wn(r.codex,A,!1),wn(n[A.role].codex,A,!1)}}let o={};for(let l of["claude","codex"]){let a=r[l];if(a.legs.length===0)continue;let d=di(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(d.total_cost_usd=a.outer_cost),o[l]=d}if(Object.keys(o).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult"]){let a={};for(let d of["claude","codex"]){let p=n[l][d];p.legs.length>0&&(a[d]={...di(p,!0),legs:p.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:o,roles:i}}var{entries:ki,setPrototypeOf:fi,isFrozen:Sc,getPrototypeOf:Ac,getOwnPropertyDescriptor:Tc}=Object,{freeze:$t,seal:It,create:bs}=Object,{apply:vs,construct:ys}=typeof Reflect<"u"&&Reflect;$t||($t=function(t){return t});It||(It=function(t){return t});vs||(vs=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ys||(ys=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var xn=xt(Array.prototype.forEach),Ec=xt(Array.prototype.lastIndexOf),_i=xt(Array.prototype.pop),Br=xt(Array.prototype.push),Cc=xt(Array.prototype.splice),An=xt(String.prototype.toLowerCase),ps=xt(String.prototype.toString),fs=xt(String.prototype.match),Ur=xt(String.prototype.replace),Rc=xt(String.prototype.indexOf),Ic=xt(String.prototype.trim),Pt=xt(Object.prototype.hasOwnProperty),wt=xt(RegExp.prototype.test),jr=Lc(TypeError);function xt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return vs(e,t,n)}}function Lc(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ys(e,r)}}function Re(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:An;fi&&fi(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Sc(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Dc(e){for(let t=0;t<e.length;t++)Pt(e,t)||(e[t]=null);return e}function Wt(e){let t=bs(null);for(let[r,n]of ki(e))Pt(e,r)&&(Array.isArray(n)?t[r]=Dc(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Wt(n):t[r]=n);return t}function zr(e,t){for(;e!==null;){let n=Tc(e,t);if(n){if(n.get)return xt(n.get);if(typeof n.value=="function")return xt(n.value)}e=Ac(e)}function r(){return null}return r}var mi=$t(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),_s=$t(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ms=$t(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Oc=$t(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),gs=$t(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Pc=$t(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),gi=$t(["#text"]),hi=$t(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),hs=$t(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),bi=$t(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Sn=$t(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Mc=It(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Nc=It(/<%[\w\W]*|[\w\W]*%>/gm),Fc=It(/\$\{[\w\W]*/gm),qc=It(/^data-[\-\w.\u00B7-\uFFFF]+$/),Bc=It(/^aria-[\-\w]+$/),wi=It(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Uc=It(/^(?:\w+script|data):/i),jc=It(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),$i=It(/^html$/i),zc=It(/^[a-z][.\w]*(-[.\w]+)+$/i),vi=Object.freeze({__proto__:null,ARIA_ATTR:Bc,ATTR_WHITESPACE:jc,CUSTOM_ELEMENT:zc,DATA_ATTR:qc,DOCTYPE_NAME:$i,ERB_EXPR:Nc,IS_ALLOWED_URI:wi,IS_SCRIPT_OR_DATA:Uc,MUSTACHE_EXPR:Mc,TMPLIT_EXPR:Fc}),Hr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Hc=function(){return typeof window>"u"?null:window},Wc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},yi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function xi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Hc(),t=ie=>xi(ie);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Hr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:A}=e,$=a.prototype,y=zr($,"cloneNode"),D=zr($,"remove"),F=zr($,"nextSibling"),Q=zr($,"childNodes"),Z=zr($,"parentNode");if(typeof i=="function"){let ie=r.createElement("template");ie.content&&ie.content.ownerDocument&&(r=ie.content.ownerDocument)}let P,R="",{implementation:T,createNodeIterator:C,createDocumentFragment:U,getElementsByTagName:ue}=r,{importNode:$e}=n,_e=yi();t.isSupported=typeof ki=="function"&&typeof Z=="function"&&T&&T.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:pe,ERB_EXPR:Ee,TMPLIT_EXPR:je,DATA_ATTR:Ze,ARIA_ATTR:He,IS_SCRIPT_OR_DATA:xe,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:H}=vi,{IS_ALLOWED_URI:me}=vi,se=null,we=Re({},[...mi,..._s,...ms,...gs,...gi]),ge=null,Be=Re({},[...hi,...hs,...bi,...Sn]),he=Object.seal(bs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,B=null,O=Object.seal(bs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),re=!0,Se=!0,Ie=!1,q=!0,z=!1,M=!0,oe=!1,ae=!1,w=!1,Y=!1,G=!1,ee=!1,fe=!0,Te=!1,Ne="user-content-",Ye=!0,Xe=!1,ut={},it=null,gt=Re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Pe=null,pt=Re({},["audio","video","img","source","image","track"]),st=null,We=Re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ht="http://www.w3.org/1998/Math/MathML",at="http://www.w3.org/2000/svg",ot="http://www.w3.org/1999/xhtml",tt=ot,bt=!1,Je=null,kt=Re({},[ht,at,ot],ps),Ve=Re({},["mi","mo","mn","ms","mtext"]),lt=Re({},["annotation-xml"]),ft=Re({},["title","style","font","a","script"]),E=null,N=["application/xhtml+xml","text/html"],u="text/html",_=null,x=null,K=r.createElement("form"),ce=function(b){return b instanceof RegExp||b instanceof Function},ve=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(x&&x===b)){if((!b||typeof b!="object")&&(b={}),b=Wt(b),E=N.indexOf(b.PARSER_MEDIA_TYPE)===-1?u:b.PARSER_MEDIA_TYPE,_=E==="application/xhtml+xml"?ps:An,se=Pt(b,"ALLOWED_TAGS")?Re({},b.ALLOWED_TAGS,_):we,ge=Pt(b,"ALLOWED_ATTR")?Re({},b.ALLOWED_ATTR,_):Be,Je=Pt(b,"ALLOWED_NAMESPACES")?Re({},b.ALLOWED_NAMESPACES,ps):kt,st=Pt(b,"ADD_URI_SAFE_ATTR")?Re(Wt(We),b.ADD_URI_SAFE_ATTR,_):We,Pe=Pt(b,"ADD_DATA_URI_TAGS")?Re(Wt(pt),b.ADD_DATA_URI_TAGS,_):pt,it=Pt(b,"FORBID_CONTENTS")?Re({},b.FORBID_CONTENTS,_):gt,Ce=Pt(b,"FORBID_TAGS")?Re({},b.FORBID_TAGS,_):Wt({}),B=Pt(b,"FORBID_ATTR")?Re({},b.FORBID_ATTR,_):Wt({}),ut=Pt(b,"USE_PROFILES")?b.USE_PROFILES:!1,re=b.ALLOW_ARIA_ATTR!==!1,Se=b.ALLOW_DATA_ATTR!==!1,Ie=b.ALLOW_UNKNOWN_PROTOCOLS||!1,q=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,z=b.SAFE_FOR_TEMPLATES||!1,M=b.SAFE_FOR_XML!==!1,oe=b.WHOLE_DOCUMENT||!1,Y=b.RETURN_DOM||!1,G=b.RETURN_DOM_FRAGMENT||!1,ee=b.RETURN_TRUSTED_TYPE||!1,w=b.FORCE_BODY||!1,fe=b.SANITIZE_DOM!==!1,Te=b.SANITIZE_NAMED_PROPS||!1,Ye=b.KEEP_CONTENT!==!1,Xe=b.IN_PLACE||!1,me=b.ALLOWED_URI_REGEXP||wi,tt=b.NAMESPACE||ot,Ve=b.MATHML_TEXT_INTEGRATION_POINTS||Ve,lt=b.HTML_INTEGRATION_POINTS||lt,he=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&ce(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&ce(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),z&&(Se=!1),G&&(Y=!0),ut&&(se=Re({},gi),ge=[],ut.html===!0&&(Re(se,mi),Re(ge,hi)),ut.svg===!0&&(Re(se,_s),Re(ge,hs),Re(ge,Sn)),ut.svgFilters===!0&&(Re(se,ms),Re(ge,hs),Re(ge,Sn)),ut.mathMl===!0&&(Re(se,gs),Re(ge,bi),Re(ge,Sn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?O.tagCheck=b.ADD_TAGS:(se===we&&(se=Wt(se)),Re(se,b.ADD_TAGS,_))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?O.attributeCheck=b.ADD_ATTR:(ge===Be&&(ge=Wt(ge)),Re(ge,b.ADD_ATTR,_))),b.ADD_URI_SAFE_ATTR&&Re(st,b.ADD_URI_SAFE_ATTR,_),b.FORBID_CONTENTS&&(it===gt&&(it=Wt(it)),Re(it,b.FORBID_CONTENTS,_)),Ye&&(se["#text"]=!0),oe&&Re(se,["html","head","body"]),se.table&&(Re(se,["tbody"]),delete Ce.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw jr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw jr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=b.TRUSTED_TYPES_POLICY,R=P.createHTML("")}else P===void 0&&(P=Wc(A,s)),P!==null&&typeof R=="string"&&(R=P.createHTML(""));$t&&$t(b),x=b}},ye=Re({},[..._s,...ms,...Oc]),be=Re({},[...gs,...Pc]),le=function(b){let W=Z(b);(!W||!W.tagName)&&(W={namespaceURI:tt,tagName:"template"});let m=An(b.tagName),v=An(W.tagName);return Je[b.namespaceURI]?b.namespaceURI===at?W.namespaceURI===ot?m==="svg":W.namespaceURI===ht?m==="svg"&&(v==="annotation-xml"||Ve[v]):!!ye[m]:b.namespaceURI===ht?W.namespaceURI===ot?m==="math":W.namespaceURI===at?m==="math"&&lt[v]:!!be[m]:b.namespaceURI===ot?W.namespaceURI===at&&!lt[v]||W.namespaceURI===ht&&!Ve[v]?!1:!be[m]&&(ft[m]||!ye[m]):!!(E==="application/xhtml+xml"&&Je[b.namespaceURI]):!1},De=function(b){Br(t.removed,{element:b});try{Z(b).removeChild(b)}catch{D(b)}},Qe=function(b,W){try{Br(t.removed,{attribute:W.getAttributeNode(b),from:W})}catch{Br(t.removed,{attribute:null,from:W})}if(W.removeAttribute(b),b==="is")if(Y||G)try{De(W)}catch{}else try{W.setAttribute(b,"")}catch{}},Ae=function(b){let W=null,m=null;if(w)b="<remove></remove>"+b;else{let te=fs(b,/^[\r\n\t ]+/);m=te&&te[0]}E==="application/xhtml+xml"&&tt===ot&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let v=P?P.createHTML(b):b;if(tt===ot)try{W=new h().parseFromString(v,E)}catch{}if(!W||!W.documentElement){W=T.createDocument(tt,"template",null);try{W.documentElement.innerHTML=bt?R:v}catch{}}let J=W.body||W.documentElement;return b&&m&&J.insertBefore(r.createTextNode(m),J.childNodes[0]||null),tt===ot?ue.call(W,oe?"html":"body")[0]:oe?W.documentElement:J},ct=function(b){return C.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Et=function(b){return b instanceof f&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof p)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},vt=function(b){return typeof l=="function"&&b instanceof l};function rt(ie,b,W){xn(ie,m=>{m.call(t,b,W,x)})}let ke=function(b){let W=null;if(rt(_e.beforeSanitizeElements,b,null),Et(b))return De(b),!0;let m=_(b.nodeName);if(rt(_e.uponSanitizeElement,b,{tagName:m,allowedTags:se}),M&&b.hasChildNodes()&&!vt(b.firstElementChild)&&wt(/<[/\w!]/g,b.innerHTML)&&wt(/<[/\w!]/g,b.textContent)||b.nodeType===Hr.progressingInstruction||M&&b.nodeType===Hr.comment&&wt(/<[/\w]/g,b.data))return De(b),!0;if(!(O.tagCheck instanceof Function&&O.tagCheck(m))&&(!se[m]||Ce[m])){if(!Ce[m]&&Ft(m)&&(he.tagNameCheck instanceof RegExp&&wt(he.tagNameCheck,m)||he.tagNameCheck instanceof Function&&he.tagNameCheck(m)))return!1;if(Ye&&!it[m]){let v=Z(b)||b.parentNode,J=Q(b)||b.childNodes;if(J&&v){let te=J.length;for(let X=te-1;X>=0;--X){let g=y(J[X],!0);g.__removalCount=(b.__removalCount||0)+1,v.insertBefore(g,F(b))}}}return De(b),!0}return b instanceof a&&!le(b)||(m==="noscript"||m==="noembed"||m==="noframes")&&wt(/<\/no(script|embed|frames)/i,b.innerHTML)?(De(b),!0):(z&&b.nodeType===Hr.text&&(W=b.textContent,xn([pe,Ee,je],v=>{W=Ur(W,v," ")}),b.textContent!==W&&(Br(t.removed,{element:b.cloneNode()}),b.textContent=W)),rt(_e.afterSanitizeElements,b,null),!1)},Ue=function(b,W,m){if(fe&&(W==="id"||W==="name")&&(m in r||m in K))return!1;if(!(Se&&!B[W]&&wt(Ze,W))){if(!(re&&wt(He,W))){if(!(O.attributeCheck instanceof Function&&O.attributeCheck(W,b))){if(!ge[W]||B[W]){if(!(Ft(b)&&(he.tagNameCheck instanceof RegExp&&wt(he.tagNameCheck,b)||he.tagNameCheck instanceof Function&&he.tagNameCheck(b))&&(he.attributeNameCheck instanceof RegExp&&wt(he.attributeNameCheck,W)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(W,b))||W==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&wt(he.tagNameCheck,m)||he.tagNameCheck instanceof Function&&he.tagNameCheck(m))))return!1}else if(!st[W]){if(!wt(me,Ur(m,L,""))){if(!((W==="src"||W==="xlink:href"||W==="href")&&b!=="script"&&Rc(m,"data:")===0&&Pe[b])){if(!(Ie&&!wt(xe,Ur(m,L,"")))){if(m)return!1}}}}}}}return!0},Ft=function(b){return b!=="annotation-xml"&&fs(b,H)},Ut=function(b){rt(_e.beforeSanitizeAttributes,b,null);let{attributes:W}=b;if(!W||Et(b))return;let m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0},v=W.length;for(;v--;){let J=W[v],{name:te,namespaceURI:X,value:g}=J,I=_(te),S=g,V=te==="value"?S:Ic(S);if(m.attrName=I,m.attrValue=V,m.keepAttr=!0,m.forceKeepAttr=void 0,rt(_e.uponSanitizeAttribute,b,m),V=m.attrValue,Te&&(I==="id"||I==="name")&&(Qe(te,b),V=Ne+V),M&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,V)){Qe(te,b);continue}if(I==="attributename"&&fs(V,"href")){Qe(te,b);continue}if(m.forceKeepAttr)continue;if(!m.keepAttr){Qe(te,b);continue}if(!q&&wt(/\/>/i,V)){Qe(te,b);continue}z&&xn([pe,Ee,je],nt=>{V=Ur(V,nt," ")});let Me=_(b.nodeName);if(!Ue(Me,I,V)){Qe(te,b);continue}if(P&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!X)switch(A.getAttributeType(Me,I)){case"TrustedHTML":{V=P.createHTML(V);break}case"TrustedScriptURL":{V=P.createScriptURL(V);break}}if(V!==S)try{X?b.setAttributeNS(X,te,V):b.setAttribute(te,V),Et(b)?De(b):_i(t.removed)}catch{Qe(te,b)}}rt(_e.afterSanitizeAttributes,b,null)},Kt=function ie(b){let W=null,m=ct(b);for(rt(_e.beforeSanitizeShadowDOM,b,null);W=m.nextNode();)rt(_e.uponSanitizeShadowNode,W,null),ke(W),Ut(W),W.content instanceof o&&ie(W.content);rt(_e.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(ie){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},W=null,m=null,v=null,J=null;if(bt=!ie,bt&&(ie="<!-->"),typeof ie!="string"&&!vt(ie))if(typeof ie.toString=="function"){if(ie=ie.toString(),typeof ie!="string")throw jr("dirty is not a string, aborting")}else throw jr("toString is not a function");if(!t.isSupported)return ie;if(ae||ve(b),t.removed=[],typeof ie=="string"&&(Xe=!1),Xe){if(ie.nodeName){let g=_(ie.nodeName);if(!se[g]||Ce[g])throw jr("root node is forbidden and cannot be sanitized in-place")}}else if(ie instanceof l)W=Ae("<!---->"),m=W.ownerDocument.importNode(ie,!0),m.nodeType===Hr.element&&m.nodeName==="BODY"||m.nodeName==="HTML"?W=m:W.appendChild(m);else{if(!Y&&!z&&!oe&&ie.indexOf("<")===-1)return P&&ee?P.createHTML(ie):ie;if(W=Ae(ie),!W)return Y?null:ee?R:""}W&&w&&De(W.firstChild);let te=ct(Xe?ie:W);for(;v=te.nextNode();)ke(v),Ut(v),v.content instanceof o&&Kt(v.content);if(Xe)return ie;if(Y){if(G)for(J=U.call(W.ownerDocument);W.firstChild;)J.appendChild(W.firstChild);else J=W;return(ge.shadowroot||ge.shadowrootmode)&&(J=$e.call(n,J,!0)),J}let X=oe?W.outerHTML:W.innerHTML;return oe&&se["!doctype"]&&W.ownerDocument&&W.ownerDocument.doctype&&W.ownerDocument.doctype.name&&wt($i,W.ownerDocument.doctype.name)&&(X="<!DOCTYPE "+W.ownerDocument.doctype.name+`>
`+X),z&&xn([pe,Ee,je],g=>{X=Ur(X,g," ")}),P&&ee?P.createHTML(X):X},t.setConfig=function(){let ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ve(ie),ae=!0},t.clearConfig=function(){x=null,ae=!1},t.isValidAttribute=function(ie,b,W){x||ve({});let m=_(ie),v=_(b);return Ue(m,v,W)},t.addHook=function(ie,b){typeof b=="function"&&Br(_e[ie],b)},t.removeHook=function(ie,b){if(b!==void 0){let W=Ec(_e[ie],b);return W===-1?void 0:Cc(_e[ie],W,1)[0]}return _i(_e[ie])},t.removeHooks=function(ie){_e[ie]=[]},t.removeAllHooks=function(){_e=yi()},t}var Si=xi();var Ai={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ti=e=>(...t)=>({_$litDirective$:e,values:t}),Tn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Wr=class extends Tn{constructor(t){if(super(t),this.it=et,t.type!==Ai.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===et||t==null)return this._t=void 0,this.it=t;if(t===cr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Wr.directiveName="unsafeHTML",Wr.resultType=1;var Ei=Ti(Wr);function xs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var _r=xs();function Pi(e){_r=e}var Kr={exec:()=>null};function Fe(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(St.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,t)};return n}var Gc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),St={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Yc=/^(?:[ \t]*(?:\n|$))+/,Vc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Kc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Zr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Zc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ss=/(?:[*+-]|\d{1,9}[.)])/,Mi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ni=Fe(Mi).replace(/bull/g,Ss).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Xc=Fe(Mi).replace(/bull/g,Ss).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),As=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Qc=/^[^\n]+/,Ts=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Jc=Fe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ts).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ed=Fe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ss).getRegex(),Dn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Es=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,td=Fe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Es).replace("tag",Dn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Fi=Fe(As).replace("hr",Zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Dn).getRegex(),rd=Fe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Fi).getRegex(),Cs={blockquote:rd,code:Vc,def:Jc,fences:Kc,heading:Zc,hr:Zr,html:td,lheading:Ni,list:ed,newline:Yc,paragraph:Fi,table:Kr,text:Qc},Ci=Fe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Dn).getRegex(),nd={...Cs,lheading:Xc,table:Ci,paragraph:Fe(As).replace("hr",Zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ci).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Dn).getRegex()},sd={...Cs,html:Fe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Es).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Kr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Fe(As).replace("hr",Zr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ni).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},od=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,id=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,qi=/^( {2,}|\\)\n(?!\s*$)/,ad=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,On=/[\p{P}\p{S}]/u,Rs=/[\s\p{P}\p{S}]/u,Bi=/[^\s\p{P}\p{S}]/u,ld=Fe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Rs).getRegex(),Ui=/(?!~)[\p{P}\p{S}]/u,cd=/(?!~)[\s\p{P}\p{S}]/u,dd=/(?:[^\s\p{P}\p{S}]|~)/u,ud=Fe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Gc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ji=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,pd=Fe(ji,"u").replace(/punct/g,On).getRegex(),fd=Fe(ji,"u").replace(/punct/g,Ui).getRegex(),zi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",_d=Fe(zi,"gu").replace(/notPunctSpace/g,Bi).replace(/punctSpace/g,Rs).replace(/punct/g,On).getRegex(),md=Fe(zi,"gu").replace(/notPunctSpace/g,dd).replace(/punctSpace/g,cd).replace(/punct/g,Ui).getRegex(),gd=Fe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Bi).replace(/punctSpace/g,Rs).replace(/punct/g,On).getRegex(),hd=Fe(/\\(punct)/,"gu").replace(/punct/g,On).getRegex(),bd=Fe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),vd=Fe(Es).replace("(?:-->|$)","-->").getRegex(),yd=Fe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",vd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Rn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,kd=Fe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Rn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Hi=Fe(/^!?\[(label)\]\[(ref)\]/).replace("label",Rn).replace("ref",Ts).getRegex(),Wi=Fe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ts).getRegex(),wd=Fe("reflink|nolink(?!\\()","g").replace("reflink",Hi).replace("nolink",Wi).getRegex(),Ri=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Is={_backpedal:Kr,anyPunctuation:hd,autolink:bd,blockSkip:ud,br:qi,code:id,del:Kr,emStrongLDelim:pd,emStrongRDelimAst:_d,emStrongRDelimUnd:gd,escape:od,link:kd,nolink:Wi,punctuation:ld,reflink:Hi,reflinkSearch:wd,tag:yd,text:ad,url:Kr},$d={...Is,link:Fe(/^!?\[(label)\]\((.*?)\)/).replace("label",Rn).getRegex(),reflink:Fe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Rn).getRegex()},ks={...Is,emStrongRDelimAst:md,emStrongLDelim:fd,url:Fe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ri).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Fe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ri).getRegex()},xd={...ks,br:Fe(qi).replace("{2,}","*").getRegex(),text:Fe(ks.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},En={normal:Cs,gfm:nd,pedantic:sd},Gr={normal:Is,gfm:ks,breaks:xd,pedantic:$d},Sd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ii=e=>Sd[e];function Gt(e,t){if(t){if(St.escapeTest.test(e))return e.replace(St.escapeReplace,Ii)}else if(St.escapeTestNoEncode.test(e))return e.replace(St.escapeReplaceNoEncode,Ii);return e}function Li(e){try{e=encodeURI(e).replace(St.percentDecode,"%")}catch{return null}return e}function Di(e,t){let r=e.replace(St.findPipe,(o,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=r.split(St.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(St.slashPipe,"|");return n}function Yr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Ad(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Oi(e,t,r,n,s){let o=t.href,i=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Td(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var In=class{constructor(e){ze(this,"options");ze(this,"rules");ze(this,"lexer");this.options=e||_r}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Yr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Td(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Yr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Yr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Yr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let A=h,$=A.raw+`
`+r.join(`
`),y=this.blockquote($);o[o.length-1]=y,n=n.substring(0,n.length-A.raw.length)+y.raw,s=s.substring(0,s.length-A.text.length)+y.text;break}else if(h?.type==="list"){let A=h,$=A.raw+`
`+r.join(`
`),y=this.list($);o[o.length-1]=y,n=n.substring(0,n.length-h.raw.length)+y.raw,s=s.substring(0,s.length-A.raw.length)+y.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;e;){let a=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,y=>" ".repeat(3*y.length)),h=e.split(`
`,1)[0],A=!f.trim(),$=0;if(this.options.pedantic?($=2,p=f.trimStart()):A?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,p=f.slice($),$+=t[1].length),A&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let y=this.rules.other.nextBulletRegex($),D=this.rules.other.hrRegex($),F=this.rules.other.fencesBeginRegex($),Q=this.rules.other.headingBeginRegex($),Z=this.rules.other.htmlBeginRegex($);for(;e;){let P=e.split(`
`,1)[0],R;if(h=P,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),R=h):R=h.replace(this.rules.other.tabCharGlobal,"    "),F.test(h)||Q.test(h)||Z.test(h)||y.test(h)||D.test(h))break;if(R.search(this.rules.other.nonSpaceChar)>=$||!h.trim())p+=`
`+R.slice($);else{if(A||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(f)||Q.test(f)||D.test(f))break;p+=`
`+h}!A&&!h.trim()&&(A=!0),d+=P+`
`,e=e.substring(P.length+1),f=R.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let d=a.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Di(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Di(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Yr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ad(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Oi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Oi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+i);if(Math.min(s,i)%2){let A=f.slice(1,-1);return{type:"em",raw:f,text:A,tokens:this.lexer.inlineTokens(A)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Mt=class ws{constructor(t){ze(this,"tokens");ze(this,"options");ze(this,"state");ze(this,"inlineQueue");ze(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||_r,this.options.tokenizer=this.options.tokenizer||new In,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:St,block:En.normal,inline:Gr.normal};this.options.pedantic?(r.block=En.pedantic,r.inline=Gr.pedantic):this.options.gfm&&(r.block=En.gfm,this.options.breaks?r.inline=Gr.breaks:r.inline=Gr.gfm),this.tokenizer.rules=r}static get rules(){return{block:En,inline:Gr}}static lex(t,r){return new ws(r).lex(t)}static lexInline(t,r){return new ws(r).inlineTokens(t)}lex(t){t=t.replace(St.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(St.tabCharGlobal,"    ").replace(St.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},t,r))?(t=t.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(t,n,l)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),r.push(a);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(A=>{h=A.call({lexer:this},f),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(a=this.tokenizer.inlineText(d)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Ln=class{constructor(e){ze(this,"options");ze(this,"parser");this.options=e||_r}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(St.notSpaceStart)?.[0],s=e.replace(St.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Gt(n)+'">'+(r?s:Gt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Gt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let i=0;i<e.items.length;i++){let l=e.items[i];n+=this.listitem(l)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let s=0;s<e.header.length;s++)r+=this.tablecell(e.header[s]);t+=this.tablerow({text:r});let n="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];r="";for(let i=0;i<o.length;i++)r+=this.tablecell(o[i]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Gt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Li(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Gt(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Li(e);if(s===null)return Gt(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Gt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Gt(e.text)}},Ls=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Nt=class $s{constructor(t){ze(this,"options");ze(this,"renderer");ze(this,"textRenderer");this.options=t||_r,this.options.renderer=this.options.renderer||new Ln,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ls}static parse(t,r){return new $s(r).parse(t)}static parseInline(t,r){return new $s(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Cn,Vr=(Cn=class{constructor(e){ze(this,"options");ze(this,"block");this.options=e||_r}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Mt.lex:Mt.lexInline}provideParser(){return this.block?Nt.parse:Nt.parseInline}},ze(Cn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ze(Cn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Cn),Ed=class{constructor(...e){ze(this,"defaults",xs());ze(this,"options",this.setOptions);ze(this,"parse",this.parseMarkdown(!0));ze(this,"parseInline",this.parseMarkdown(!1));ze(this,"Parser",Nt);ze(this,"Renderer",Ln);ze(this,"TextRenderer",Ls);ze(this,"Lexer",Mt);ze(this,"Tokenizer",In);ze(this,"Hooks",Vr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Ln(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new In(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Vr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Vr.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&Vr.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await l.call(s,d);return a.call(s,f)})();let p=l.call(s,d);return a.call(s,p)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(s,d);return f===!1&&(f=await a.apply(s,d)),f})();let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Mt.lex(e,t??this.defaults)}parser(e,t){return Nt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Mt.lex:Mt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Nt.parse:Nt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Mt.lex:Mt.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Nt.parse:Nt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Gt(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},fr=new Ed;function qe(e,t){return fr.parse(e,t)}qe.options=qe.setOptions=function(e){return fr.setOptions(e),qe.defaults=fr.defaults,Pi(qe.defaults),qe};qe.getDefaults=xs;qe.defaults=_r;qe.use=function(...e){return fr.use(...e),qe.defaults=fr.defaults,Pi(qe.defaults),qe};qe.walkTokens=function(e,t){return fr.walkTokens(e,t)};qe.parseInline=fr.parseInline;qe.Parser=Nt;qe.parser=Nt.parse;qe.Renderer=Ln;qe.TextRenderer=Ls;qe.Lexer=Mt;qe.lexer=Mt.lex;qe.Tokenizer=In;qe.Hooks=Vr;qe.parse=qe;var Jf=qe.options,e_=qe.setOptions,t_=qe.use,r_=qe.walkTokens,n_=qe.parseInline;var s_=Nt.parse,o_=Mt.lex;function rr(e){let t=qe.parse(e),r=Si.sanitize(t);return Ei(r)}function Yt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Tr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Pn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Cd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Rd=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Id=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function nr(e){return!!e&&typeof e=="object"}function Ds(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Gi(e,t){let r=Ds(e),n=Ds(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Ld(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>nr(s)&&typeof s.text=="string"?s.text:"").join(""):nr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Dd(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Cd[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ds(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Gi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Gi(nr(l)?l.old_string:"",nr(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Yi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Vi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Rd.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Id.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Od(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(nr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Vi(o.text));else if(o.type==="thinking"){let i=Yi(o.thinking);i&&s.push(i)}else if(o.type==="tool_use"){let i=Dd(o);typeof o.id=="string"&&t.set(o.id,i),s.push(i)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(nr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let i=Ld(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Pd(e){if(e.type==="item.completed"&&nr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Vi(t.text)];if(t.type==="reasoning"){let r=Yi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Md(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ki(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!nr(o))continue;let i=Md(o)?Pd(o):Od(o,r);for(let l of i)t.push(l)}return t}var Nd=5,Fd=10,qd=/Task\s+#(\d+)/,Bd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Ud=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Mn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function jd(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function zd(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Hd(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let a=qd.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!a||d.length===0)continue;t.set(a[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Wd(e){if(e.tool==="Bash"){let t=e.command||"";return Bd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Ud.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Gd(e){let t=e.filter(s=>s.kind==="tool").slice(-Fd),r=new Map;t.forEach((s,o)=>{let i=Wd(s);if(!i)return;let l=r.get(i)||{count:0,last:-1};l.count+=1,l.last=o,r.set(i,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Yd(e){let t=zd(e);if(t)return{text:t,guess:!1};let r=Hd(e);if(r)return{text:r,guess:!1};let n=Gd(e);return n?{text:n,guess:!0}:null}function Vd(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Tt(e,t)}function Nn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,i={},l=!0,a=new Set,d=new Set,p=null,f=null,h=!1,A=!1,$=!1,y=null,D=null;function F(){h=!1,A=!1,$=!1,y=null,D=null}async function Q(B){if(r){A=!0,$=!1,L();try{let O=await Promise.resolve(r("get-attempt-prompt",{attempt_id:B}));if(o!==B)return;!O||typeof O!="object"||Array.isArray(O)?$=!0:(y=O,D=B)}catch{o===B&&($=!0)}finally{o===B&&(A=!1,L())}}}function Z(){if(h=!h,h&&o&&D!==o){Q(o);return}L()}function P(){if(!h)return"";let B=Tr({loading:A,error:$});if(B)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${B}
      </div>`;if(!y)return"";if(y.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let O=Pn(y.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${O?c`<div class="prompt-block__meta">${O} 발송</div>`:""}
      ${typeof y.task_prompt=="string"?Yt("\uACFC\uC5C5 (user)",y.task_prompt):""}
      ${typeof y.system_prompt=="string"?Yt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",y.system_prompt):""}
    </div>`}function R(){if(!o||!n)return[];let B=n.get(o);return Ki(B?B.lines:[])}function T(){if(!o||!n)return null;let B=n.get(o),O=B?B.last_event_at:null;return typeof O=="number"?O:null}function C(){return i.status==="running"}function U(){if(C()&&o){f||(f=setInterval(()=>L(),1e3));return}ue()}function ue(){f&&(clearInterval(f),f=null)}function $e(B){let O=[],re=0;for(;re<B.length;){let Se=B[re];if(Se.kind==="tool"){let Ie=re;for(;Ie<B.length&&B[Ie].kind==="tool"&&B[Ie].tool===Se.tool;)Ie+=1;if(Ie-re>=Nd&&!d.has(re)){O.push({kind:"group",idx:re,tool:Se.tool||"",lines:B.slice(re,Ie).map((q,z)=>({idx:re+z,line:q}))}),re=Ie;continue}}O.push({kind:"line",idx:re,line:Se}),re+=1}return O}function _e(B){for(let O=B.length-1;O>=0;O-=1){let re=B[O];if(re.kind==="result"||re.kind==="error")return null;if(re.kind==="tool"&&!Object.hasOwn(re,"result"))return re}return null}function pe(B){for(let O=B.length-1;O>=0;O-=1)if(B[O].kind==="thinking")return B[O];return null}function Ee(B,O){if(O.kind==="gate")return c`<div class="sv__gate">${O.text}</div>`;if(O.kind==="phase")return c`<div class="sv__phase">${O.text}</div>`;if(O.kind==="result")return c`<div
        class="sv__result${O.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${O.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${rr(O.text||(O.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(O.kind==="thinking"){let re=a.has(B);return c`<div
        class="sv__think${re?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(B)}
      >
        <span class="sv__think-line">💭 ${Mn(O.text)}</span>
        ${re?c`<pre class="sv__think-expand">${O.text}</pre>`:""}
      </div>`}if(O.kind==="error")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="blocker")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="tool"){let re=a.has(B),Se=O.tool==="Bash"?jd(O.command):0,Ie=O.tool==="Bash"?Se>1?Mn(O.command):O.command:O.path||O.command||"";return c`<div
        class="sv__tool${re?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>me(B)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${O.icon}</span>
          <span class="sv__tool-name">${O.tool}</span>
          ${Ie?c`<span class="sv__tool-detail">${Ie}</span>`:""}
          ${Se>1?c`<span class="sv__tool-more">⋯ ${Se}줄</span>`:""}
          ${typeof O.added=="number"?c`<span class="sv__diff-add">+${O.added}</span>`:""}
          ${typeof O.removed=="number"?c`<span class="sv__diff-del">−${O.removed}</span>`:""}
          ${O.result?c`<span class="sv__tool-ok">→ ${O.result}</span>`:""}
        </span>
        ${re?c`<pre class="sv__tool-expand">${je(O)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${rr(O.text||"")}</div>`}function je(B){let O=[];if(B.tool==="Bash"&&typeof B.command=="string"&&B.command.length>0)O.push(B.command);else if(B.input!==void 0)try{O.push(`input: ${JSON.stringify(B.input,null,2)}`)}catch{}return typeof B.output=="string"&&B.output.length>0&&O.push(`output:
${B.output}`),O.join(`

`)}function Ze(){if(!o)return c``;let B=R(),O=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),re=i.session_id||"",Se=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,Ie=C(),q=Ie?Vd(T(),Date.now()):"",z=Ie?_e(B):null,M=Ie?pe(B):null,oe=Yd(B);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${oe?c`<span
              class="sv__stage${oe.guess?" sv__stage--guess":""}"
              title=${oe.text}
              >${oe.text}</span
            >`:""}
        ${Ie?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${q?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${q}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${q?c`<span class="sv__live-ago">${q}</span>`:""}</span
            >`:""}
        ${re?c`<button
              type="button"
              class="sv__session"
              title=${re}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${re}`}
              @click=${()=>we(re)}
            >
              ⧉ ${re.slice(0,8)}
            </button>`:""}
        ${O?c`<span class="sv__meta">${O}</span>`:""}
        ${i.worktree?c`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${Z}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Se}
          @click=${se}
        >
          <span class="sv__follow-full">⇣ ${Se}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ce()}
        >
          ✕
        </button>
      </div>
      ${P()}
      <div class="sv__body">
        ${B.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:$e(B).map(ae=>ae.kind==="group"?He(ae):Ee(ae.idx,ae.line))}
      </div>
      ${z||M?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${z?c`<span class="sv__now-icon">${z.icon}</span>
                  <span class="sv__now-name">${z.tool}</span>
                  <span class="sv__now-detail"
                    >${z.tool==="Bash"?Mn(z.command):z.path||z.command||""}</span
                  >`:""}
            ${M?c`<span class="sv__now-think"
                  >💭 ${Mn(M.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function He(B){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>xe(B.idx)}
    >
      <span class="sv__group-icon">${B.lines[0].line.icon}</span>
      <span class="sv__group-name">${B.tool}</span>
      <span class="sv__group-count">${B.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function xe(B){d.add(B),L()}function L(){Oe(Ze(),e),U(),l&&H()}function H(){let B=e.querySelector(".sv__body");B&&(B.scrollTop=B.scrollHeight)}function me(B){a.has(B)?a.delete(B):a.add(B),L()}function se(){l=!l,L()}function we(B){pr(B).then(O=>{O?ne("\uBCF5\uC0AC\uB428","success",1200):ne("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ge(B){!o||!B||(i={...i,...B},L())}function Be(B){let O=B.target;if(!O||!O.classList||!O.classList.contains("sv__body"))return;!(O.scrollHeight-O.scrollTop-O.clientHeight<=4)&&l&&(l=!1,L())}e.addEventListener("scroll",Be,!0);function he(B){let O=B&&B.attempt_id;O&&(o=O,i=B.meta||{},l=!0,a.clear(),d.clear(),F(),!p&&n&&(p=n.subscribe(L)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),L())}function Ce(){let B=o;o=null,a.clear(),d.clear(),F(),ue(),r&&B&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${B}`})).catch(()=>{}),Oe(c``,e),s&&s()}return{open:he,updateMeta:ge,close:Ce,isOpen(){return o!==null},destroy(){ue(),p&&(p(),p=null),e.removeEventListener("scroll",Be,!0),o=null,Oe(c``,e)}}}function Xr(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Zi(t.spec_id),s=Zi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Zi(e){return typeof e=="string"?e.trim():""}function Kd(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Zd(e){let t=e&&e.metadata||{},r=Xr(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Kd(t)?null:"plan_pending"}),n}function Xi(e,t){let r=Zd(e);return c`
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
  `}var Xd="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Qd=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Jd=/^\*\*결론\*\* — (.+)$/;function Qi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Xd)return null;let r=Qd.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Jd.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",d=l?i+1:i;return{lane:n,identifier:s,timestamp:o,conclusion:a,body:t.slice(d).join(`
`).trim()}}var Ji=20;function ea(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function eu(e){return e.length>Ji?`${e.slice(0,Ji)}\u2026`:e}function tu(e,t,r,n){let s=`${t.lane} ${eu(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${ea(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${rr(t.body)}
        </div>`:""}
  </div>`}function ru(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ea(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${rr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function ta(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",i=r.sending===!0,l=n.slice().sort((a,d)=>String(d.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let d=Qi(typeof a.text=="string"?a.text:"");return d?tu(a,d,t,s.has(a.id)):ru(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${o}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${i||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var nu=["codex","opus","fable","self","skip"],su=["codex","fable","skip"],ou=["low","medium","high","xhigh"],iu=["standard","fast_track"],Er=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],Ps={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},ra={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},au=["self","skip"],lu="opus",Ms={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Ns(e){let t=Ps[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function cu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:Ms[e]||"(\uAE30\uBCF8)"}function Qr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Jr(e){if(!Qr(e)||!Qr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Qr(r)&&Qr(r.models));return t.length>0?t:null}function Os(e){return{value:e,label:e}}function Fs(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function na(e,t,r=null){let n=Jr(e);if(!n)return t?[{label:null,options:[Os(t)]}]:[];let s=n.filter(([i])=>r===null||i===r).map(([i,l])=>({label:i,options:Object.keys(l.models).map(Os)})),o=s.some(i=>i.options.some(l=>l.value===t));return t&&!o?[Fs(t),...s]:s}function mr(e,t){let r={label:null,options:e.map(Os)};return t&&!e.includes(t)?[Fs(t),r]:[r]}function Vt(e,t){let r=Jr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function ia(e,t){return Qr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Fn(e,t){let r=Jr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return ia(n,n.models[t]);return[]}function aa(e){let t=Jr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of ia(n,s))r.includes(o)||r.push(o);return r}function la(e,t){if(!t)return aa(e);let n=Jr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let i of Fn(e,o))s.includes(i)||s.push(i);return s}function Bn(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Vt(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let i=n.impl_model?Fn(t,n.impl_model):la(t,s);return n.impl_effort&&i.length>0&&!i.includes(n.impl_effort)&&(n.impl_effort=""),n}function Cr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||lu,i=r("impl_model"),l=r("impl_runtime"),a=l==="claude"||l==="codex"?l:l==="inherit"?s===void 0?Vt(n,o):s:null;return Er.map(d=>{let p=t(d),f,h=!1;return d==="orchestration_model"?f=na(n,p):d==="impl_runtime"?f=mr(["inherit","claude","codex"],p):d==="impl_model"?(f=a?na(n,p,a):p?[Fs(p)]:[],h=l==="inherit"&&a===null):d==="orchestration_effort"?f=mr(Fn(n,o),p):d==="impl_effort"?(f=mr(i?Fn(n,i):a?la(n,a):aa(n),p),h=l==="inherit"&&a===null):d==="plan_review_model"?f=mr(su,p):Object.hasOwn(ra,d)?(f=mr(ou,p),h=au.includes(r(ra[d]))):f=mr(nu,p),{key:d,groups:f,selected:p,disabled:h,runner:d==="orchestration_model"?Vt(n,o):null}})}function qn(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>sa(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>sa(s,t))}
          </optgroup>`)}
  `}function sa(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function oa(e,t,r,n,s,o,i){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${Ns(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${l=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&i.onImplTargetChange?i.onImplTargetChange(e,l.target.value):i.onChange(e,l.target.value)}
        >
          ${t}
        </select>
        ${o?c`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function ca(e,t,r,n,s=""){let o=e&&e.metadata||{},i=r&&typeof r=="object"?r:{},l=f=>typeof o[f]=="string"?o[f]:"",d=Cr({selectedOf:l,effectiveOf:f=>{let h=l(f);return h||(typeof i[f]=="string"?i[f]:"")},runner_catalog:n}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${d.map(f=>oa(f.key,qn(f.groups,f.selected,cu(f.key,i,s)),f.selected,!1,f.disabled,f.runner,t))}
    ${oa("workflow_mode",qn(mr(iu,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function du(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function da(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",a);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${du(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:rr(i)}
          </div>
        </div>
      </div>
    `:c``}function p(){Oe(d(),e)}async function f($,y={}){s=$,o="loading",i="",l="",p();let D=r?r():"";if(!D){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let F="/api/doc?workspace="+encodeURIComponent(D)+"&path="+encodeURIComponent($);try{let Q=await n(F),Z=await Q.json().catch(()=>({}));if(!Q.ok||!Z||Z.ok!==!0){if(Z?.error==="not_found"&&y.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(Z&&Z.error||Q.status)+")",p();return}i=String(Z.content||""),o="ready",p()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,Oe(c``,e)}function A(){document.removeEventListener("keydown",a),h()}return{open:f,close:h,destroy:A}}var uu=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],fa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function pu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function fu(e){let t=mt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Sr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${fa}
          >부분 집계</span
        >`:""}`}function ua(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function pa(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?_a(t):""}function _u(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let i=mt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?c`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${pa(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${pa(s.completed_at)}</span
            >`:""}
        ${i?c`<span class="detail-session__usage" title=${i.tooltip}
              >${i.label}</span
            >`:""}
      </div>`}):[]}):""}function mu(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...uu,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${pu(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${fa}</span>`:""}
  </div>`}var gu={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function _a(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function hu(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function ma(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let i=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),A=f&&!h,$=f?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!A}
      title=${$}
      @click=${y=>{y.stopPropagation(),A&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,h=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return c`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},a=d=>{let p=ua(us(d));if(mt(p).length===0&&!Sr(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${fu(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=us(d),f=ua(p),h=mt(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${gu[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${d.resumed_from?c`<span
                  class="detail-session__resumed"
                  title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${d.resumed_from})`}
                  >↻</span
                >`:""}
            <span class="detail-session__meta"
              >${[d.runner,d.model].filter(Boolean).join(" \xB7 ")}</span
            >
            ${h.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(A=>c`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):Sr(d.usage)?c`<span class="detail-session__usage"
                    >${Sr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${_a(d.started_at)}</span>
          </button>
          ${a(d)} ${i(d)} ${l(d)} ${hu(d)}
          ${s.has(d.attempt_id)&&d.usage?mu(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${_u(p)}
        </div>`})}
    </div>
  `}function ga(e,t={}){return c`
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
          ${bu(e)}
        </div>`:""}
  `}function bu(e){let t=Tr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Yt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Pn(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Yt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Yt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var vu=["open","in_progress","deferred","resolved","closed"],yu=[0,1,2,3,4];function ha(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,d=null,p=null,f={},h="",A=!1,$=!1,y=!1,D="",F="",Q="";function Z(){$=!1,y=!1,D="",F="",Q=""}let P=[],R=null,T=null,C=!1,U="",ue=!1,$e=0,_e=new Set;function pe(){P=[],R=null,T=null,C=!1,U="",ue=!1,$e+=1,_e.clear()}async function Ee(g){if(!s)return;let I=++$e;try{let S=await Promise.resolve(s("get-comments",{id:g}));if(I!==$e||g!==d)return;P=Array.isArray(S)?S:[],C=!1}catch{if(I!==$e||g!==d)return;C=!0}X()}function je(){if(!s||!d)return;let g=p&&typeof p.comment_count=="number"?p.comment_count:null;if(R!==d){R=d,T=g,Ee(d);return}g!==null&&g!==T&&(T=g,Ee(d))}function Ze(g){_e.has(g)?_e.delete(g):_e.add(g),X()}function He(g){let I=U.trim().length===0;U=g,I!==(g.trim().length===0)&&X()}async function xe(){let g=U.trim();if(!s||!d||g.length===0||ue)return;let I=d;ue=!0,X();let S=!1;try{let V=await Promise.resolve(s("add-comment",{id:I,text:g}));Array.isArray(V)&&V.length>0&&(S=!0,I===d&&(P=V,C=!1,U="",T=V.length))}catch{S=!1}S||ne("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),I===d&&(ue=!1),X()}let L={onToggle:Ze,onDraftInput:He,onSubmit:xe},H=document.createElement("div");H.className="md-viewer-root",document.body.appendChild(H);let me=da(H,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),se=document.createElement("div");se.className="session-log-root",document.body.appendChild(se);let we=Nn(se,{transport:s?(g,I)=>Promise.resolve(s(g,I)):void 0,sessionLogStore:a}),ge=!1,Be=!1,he=!1,Ce=null,B=null,O=0;function re(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function Se(){ge=!1,Be=!1,he=!1,Ce=null,B=null,O+=1}async function Ie(g){if(!s)return;let I=++O;Be=!0,he=!1,X();try{let S=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(I!==O)return;!S||typeof S!="object"||Array.isArray(S)?he=!0:(Ce=S,B=re(g))}catch{I===O&&(he=!0)}finally{I===O&&(Be=!1,X())}}function q(){if(ge=!ge,ge&&d&&B!==re(d)){Ce=null,Ie(d);return}X()}function z(){if(!i||!d)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(S=>S&&S.bead_id===d).sort((S,V)=>(V.started_at||0)-(S.started_at||0)).map(S=>({attempt_id:S.attempt_id,bead_id:S.bead_id,status:S.status,started_at:typeof S.started_at=="number"?S.started_at:null,runner:S.runner||null,model:S.model||null,session_id:S.session_id||null,resumed_from:S.resumed_from||null,dismissed_at:typeof S.dismissed_at=="number"?S.dismissed_at:null,cause:typeof S.cause=="string"?S.cause:null,cause_detail:S.cause_detail||null,exec_default_preset_id:typeof S.exec_default_preset_id=="string"?S.exec_default_preset_id:null,exec_default_preset_revision:typeof S.exec_default_preset_revision=="number"?S.exec_default_preset_revision:null,exec_values:S.exec_values&&typeof S.exec_values=="object"?S.exec_values:null,usage:S.usage||null,usage_legs:Array.isArray(S.usage_legs)?S.usage_legs:[]}))}function M(){if(!i||!d)return null;let g=i.get();return Rt(g&&g.attempts||{},d)}let oe=new Set;function ae(g){oe.has(g)?oe.delete(g):oe.add(g),X()}function w(g){let I=i?i.get():null,S=I&&I.attempts?I.attempts[g]:null;we.open({attempt_id:g,meta:S?{runner:S.runner||void 0,model:S.model||void 0,effort:S.effort||void 0,status:S.status||void 0,session_id:S.session_id||void 0}:{}})}async function Y(g){if(!s||!g)return;let I=()=>{let V=i?i.get():null;return V&&typeof V.revision=="number"?V.revision:0},S=await s("worker-attempt-resume",{attempt_id:g,expected_revision:I()});if(S&&S.conflict){let V=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:I();S=await s("worker-attempt-resume",{attempt_id:g,expected_revision:V})}S&&S.resumed===!1&&!S.conflict&&S.reason&&ne(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}let G={onOpen:w,onResume:Y,onToggleUsage:ae};function ee(){let g=i?i.get():null,I=g&&g.default_exec_preset_id,S=typeof I=="string"?Ye()?.presets.find(V=>V.id===I):null;return S&&S.compatible!==!1&&S.settings?S.settings:{}}function fe(){let g=i?i.get():null,I=g&&g.default_exec_preset_id,S=typeof I=="string"?Ye()?.presets.find(V=>V.id===I):null;return S&&S.compatible!==!1&&typeof S.name=="string"?S.name:""}function Te(){let g=i?i.get():null;return g&&g.runner_catalog||null}function Ne(){let g=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},S=(Object.hasOwn(f,"orchestration_model")?f.orchestration_model:void 0)||(typeof g.orchestration_model=="string"?g.orchestration_model:"")||(typeof ee().orchestration_model=="string"?ee().orchestration_model:"")||"opus";return Vt(Te(),S)}function Ye(){let g=l?l.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function Xe(g){let I=g&&g.settings&&typeof g.settings=="object"?g.settings:{},S=V=>typeof I[V]=="string"?I[V]:V==="impl_runtime"&&typeof I.impl_model=="string"&&Vt(Te(),I.impl_model)||"";return Cr({selectedOf:S,effectiveOf:S,runner_catalog:Te()}).some(V=>V.groups.some(Me=>Me.options.some(nt=>nt.value===V.selected&&nt.label.endsWith("(\uBE44\uD638\uD658)"))))}function ut(g){l&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&l.set({revision:g.revision,presets:g.presets})}async function it(){let g=Ye(),I=g?.presets.find(S=>S.id===h);if(!(!s||!d||!g||!I||Xe(I)||A)){A=!0,X();try{let S=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:I.id,expected_revision:g.revision}));if(S&&S.conflict){ut(S),ne("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let V=S&&Array.isArray(S.issue)?S.issue[0]:S?.issue;if(S&&S.applied&&V&&typeof V=="object"){p=V;for(let Me of Er)delete f[Me];ne("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}S&&S.error==="bd_readback_failed"?ne("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ne("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(S){S&&typeof S=="object"&&S.code==="bd_readback_failed"?ne("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ne("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,X()}}}function gt(){let g=Ye();if(g&&g.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let I=g?g.presets:[],S=I.find(Me=>Me.id===h),V=S?Xe(S):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${g===null||A}
          @change=${Me=>{h=Me.target.value,X()}}
        >
          <option value="" ?selected=${h===""}>
            ${g===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${I.map(Me=>{let nt=Xe(Me);return c`<option
              value=${Me.id}
              ?selected=${Me.id===h}
            >
              ${Me.name}${nt?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${g===null||!S||V||A}
          @click=${()=>{it()}}
        >
          11개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let Pe=null;r&&r.subscribe&&(Pe=r.subscribe(()=>ht()));let pt=null;i&&typeof i.subscribe=="function"&&(pt=i.subscribe(()=>{d&&X()}));let st=null;l&&typeof l.subscribe=="function"&&(st=l.subscribe(()=>{d&&X()}));function We(g){g.key==="Escape"&&d&&(g.preventDefault(),n())}document.addEventListener("keydown",We);function ht(){if(d){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+d)||[];p=g.find(S=>S&&S.id===d)||g[0]||p}je(),X()}}function at(g){pr(g).then(I=>{I?ne("\uBCF5\uC0AC\uB428","success",1200):ne("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ot(g){g.preventDefault(),g.stopPropagation(),d&&at(d)}function tt(g,I){g.preventDefault(),g.stopPropagation(),at(I)}function bt(g,I,S){g.preventDefault(),g.stopPropagation(),me.open(I,{missing_state:S})}function Je(g,I){f[g]=I,X(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:g,value:I})).catch(()=>{ne("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function kt(g,I){let S=p||{},V=S.metadata&&typeof S.metadata=="object"?S.metadata:{},Me={};for(let Le of["impl_runtime","impl_model","impl_effort"])Me[Le]=Object.hasOwn(f,Le)?f[Le]:typeof V[Le]=="string"?V[Le]:"";Me[g]=I;let nt=Bn(Me,Te(),Ne()),_t={};for(let Le of["impl_runtime","impl_model","impl_effort"])_t[Le]=f[Le],f[Le]=nt[Le]||"";X(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...nt,orchestration_runtime:Ne()})).then(Le=>{let Zt=Array.isArray(Le)?Le[0]:Le;if(!Zt||typeof Zt!="object"||!Zt.id)throw new Error("implementation target readback failed");p=Zt;for(let on of["impl_runtime","impl_model","impl_effort"])delete f[on];X()}).catch(()=>{for(let Le of["impl_runtime","impl_model","impl_effort"])_t[Le]===void 0?delete f[Le]:f[Le]=_t[Le];X(),ne("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ve(g,I,S){if(!s||!d)return!1;try{let V=await Promise.resolve(s(g,I)),Me=Array.isArray(V)?V[0]:V;return Me&&typeof Me=="object"&&Me.id?(p=Me,!0):(ne(S,"error"),!1)}catch{return ne(S,"error"),!1}}function lt(g){setTimeout(()=>{try{let I=e.querySelector(g);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function ft(){$=!0,D=p&&p.title||"",X(),lt('.detail-edit__input[data-edit="title"]')}function E(g){D=g.target.value}function N(){$=!1,D="",X()}function u(){Ve("edit-text",{id:d,field:"title",value:D},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&($=!1,D=""),X()})}function _(){y=!0,F=p&&p.description||"",X(),lt('.detail-edit__textarea[data-edit="description"]')}function x(g){F=g.target.value}function K(){y=!1,F="",X()}function ce(){Ve("edit-text",{id:d,field:"description",value:F},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(y=!1,F=""),X()})}function ve(g,I,S,V){if(g.key==="Escape"){g.stopPropagation(),S();return}g.key==="Enter"&&(!V||g.ctrlKey||g.metaKey)&&(g.preventDefault(),I())}function ye(g){let I=g.target.value;Ve("update-status",{id:d,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>X())}function be(g){let I=Number(g.target.value);Ve("update-priority",{id:d,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>X())}function le(g){Q=g.target.value}function De(){let g=Q.trim();g.length!==0&&Ve("label-add",{id:d,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I&&(Q=""),X()})}function Qe(g){if(g.key==="Escape"){g.stopPropagation(),Q="",X();return}g.key==="Enter"&&(g.preventDefault(),De())}function Ae(g){Ve("label-remove",{id:d,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>X())}let ct={onCopyPath:tt,onOpenDoc:bt},Et={onChange:Je,onImplTargetChange:kt};function vt(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function rt(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function ke(g){let S=(Array.isArray(g.dependencies)?g.dependencies:[]).map(V=>({id:vt(V),icon:rt(V)})).filter(V=>V.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${S.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${S.map(V=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(V.id)}
                  >
                    ${V.icon?`${V.icon} `:""}${V.id}
                  </button>`:c`<span class="detail-dep"
                    >${V.icon?`${V.icon} `:""}${V.id}</span
                  >`)}
          </div>`}
    `}function Ue(g){let I=g.metadata||{},S=g.workflow||{},V=S.stages||{},Me=V.spec&&V.spec.stale,nt=V.impl&&V.impl.stale,_t=V.plan||null,Le=S.route_source==="derived",Zt=S.route||I.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Le?" detail-kv__v--derived":""}"
          title=${Le?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Le?"unset":Zt}</span
        >
      </div>
      ${S.route!=="quick_fix"||Object.hasOwn(I,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${I.spec_review||"\uC5C6\uC74C"}${Me?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${S.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${_t?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${_t?.approval_receipt||"\uC5C6\uC74C"}${_t?.approval_state==="stale"?" \xB7 stale":_t?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${S.route!=="quick_fix"||Object.hasOwn(I,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${I.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let Ft={route:["quick_fix","spec_backed","full_plan"]};async function Ut(g,I){let S=I.target.value;if(g==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&S!=="full_plan"&&!window.confirm(`full_plan \u2192 ${S||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){X();return}await Ve("update-workflow-meta",{id:d,key:g,value:S},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),X()}function Kt(g){let I=g.metadata||{};return c` ${((V,Me)=>{let nt=Ft[V],_t=typeof I[V]=="string"?I[V]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${V}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${V}
          data-edit=${`wfmeta-${V}`}
          @change=${Le=>Ut(V,Le)}
        >
          <option value="" ?selected=${!nt.includes(_t)}>
            ${Me}
          </option>
          ${nt.map(Le=>c`<option value=${Le} ?selected=${_t===Le}>${Le}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ie(g,I){return $?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${D}
            @input=${E}
            @keydown=${S=>ve(S,u,N,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${u}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${N}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        ${mt(I).map(S=>c`<span class="detail-usage-total" title=${S.tooltip}
              >${S.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ft}
        >
          ✎
        </button>
      </div>
    `}function b(g){let I=yt(g.created_at),S=yt(g.updated_at);return!I&&!S?c``:c`
      ${I?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${S?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
    `}function W(g,I){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ye}
        >
          ${vu.map(S=>c`<option value=${S} ?selected=${S===g}>${S}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${be}
        >
          ${yu.map(S=>c`<option value=${String(S)} ?selected=${S===I}>
                P${S}
              </option>`)}
        </select>
      </div>
    `}function m(g){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${y?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${_}
            >
              ✎
            </button>`}
      </div>
      ${y?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${F}
              @input=${x}
              @keydown=${I=>ve(I,ce,K,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ce}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${K}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function v(g){let I=typeof g.notes=="string"?g.notes:"";return I.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${I}</div>
    `}function J(g){let I=Array.isArray(g.labels)?g.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${I.map(S=>c`<span class="detail-label-chip"
              >${S}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${S}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+S}
                @click=${()=>Ae(S)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${Q}
            @input=${le}
            @keydown=${Qe}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${De}
          >
            추가
          </button>
        </span>
      </div>
    `}function te(){if(!d)return c``;let g=p||{},I=String(g.id||d),S=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",V=M(),Me=g.status||"open",nt=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",_t=g.description||"",Le={...g,metadata:{...g.metadata||{},...f}};return c`
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
            ${I}
          </button>
          ${ie(S,V)}
          ${W(Me,nt)} ${b(g)}
          ${m(_t)}
          ${ta(P,L,{expanded:_e,draft:U,sending:ue,error:C})}
          ${v(g)} ${J(g)} ${ke(g)}
          ${Ue(g)} ${Kt(g)}
          ${Xi(g,ct)}
          ${gt()}
          ${ca(Le,Et,ee(),Te(),fe())}
          ${ga({expanded:ge,loading:Be,error:he,data:Ce},{onToggle:q})}
          ${ma(z(),G,{total:V,expanded:oe})}
        </div>
      </div>
    `}function X(){Oe(te(),e)}return{load(g){g!==d&&(f={},h="",Z(),pe(),Se()),d=g,p=null,ht()},clear(){d=null,p=null,f={},h="",A=!1,Z(),pe(),Se(),me.close(),we.close(),Oe(c``,e)},destroy(){Pe&&(Pe(),Pe=null),pt&&(pt(),pt=null),st&&(st(),st=null),document.removeEventListener("keydown",We),me.destroy(),H.parentNode&&H.parentNode.removeChild(H),we.destroy(),se.parentNode&&se.parentNode.removeChild(se),d=null,p=null,h="",A=!1,pe(),Se(),Oe(c``,e)}}}var ku=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ba(e,t){return ls(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function wu(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function va(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let i="";async function l(T){let C=r.get();if(C)try{let U=await n("display-policy-set",{expected_revision:C.revision,policy:T(C)});a(U),U&&U.conflict&&U.policy&&(U=await n("display-policy-set",{expected_revision:U.policy.revision,policy:T(U.policy)}),a(U)),U&&U.conflict&&ne("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ne("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(T){T&&T.policy&&typeof T.policy=="object"&&r.set(T.policy)}function d(T){let C=r.get();if(!C)return;let U=ba(T,C)!=="shown";l(ue=>wu(T,ue,U))}function p(){let T=i.trim();T.length!==0&&(i="",l(C=>C.hidden_prefixes.includes(T)?{hidden_prefixes:C.hidden_prefixes}:{hidden_prefixes:[...C.hidden_prefixes,T]}),D())}function f(T){l(C=>({hidden_prefixes:C.hidden_prefixes.filter(U=>U!==T)}))}function h(T){let C=r.get();if(!C)return;let U=C.chips[T]===!1;l(()=>({chips:{[T]:U}}))}function A(T){let C=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${C.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${C.map(U=>{let ue=ba(U,T);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${ue}`}
                  data-label=${U}
                  data-state=${ue}
                  @click=${()=>d(U)}
                >
                  ${U}
                </button>`})}
            </div>`}
      </section>
    `}function $(T){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${T.hidden_prefixes.map(C=>c`<span class="display-settings__prefix">
                ${C}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${C} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>f(C)}
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
            @input=${C=>{i=String(C.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function y(T){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${ku.map(([C,U])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${C}
                  .checked=${T.chips[C]!==!1}
                  @change=${()=>h(C)}
                />
                <span>${U}</span>
              </label>`)}
        </div>
      </section>
    `}function D(){let T=r.get();Oe(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${R}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${T?c`${A(T)} ${$(T)}
                ${y(T)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let F=!1,Q=()=>{F=!1};o.addEventListener("close",Q),o.addEventListener("cancel",Q);let Z=null;r.subscribe&&(Z=r.subscribe(()=>{F&&D()}));function P(){F||(i="",F=!0,D(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function R(){F&&(F=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:R,destroy(){F=!1,o.removeEventListener("close",Q),o.removeEventListener("cancel",Q),Z&&(Z(),Z=null),o.remove()}}}function ya(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(d,p,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}function ka(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function wa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var $u={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},$a=160;function xu(e){return e.length>$a?`${e.slice(0,$a)}\u2026`:e}function Un(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,i=document.createElement("dialog");i.id="worker-exec-defaults-dialog",i.className="exec-defaults",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=null,a=!1;function d(){return r&&r.get()||{revision:0,exec_defaults:{}}}function p(){let w=d();return typeof w.revision=="number"?w.revision:0}function f(){let w=n?n.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function h(w){n&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&n.set({revision:w.revision,presets:w.presets})}function A(w){w&&w.queue&&r&&r.set(w.queue)}function $(){return d().runner_catalog??null}let y=null;function D(){if(y!==null)return y;let w=d().default_exec_preset_id;return typeof w=="string"&&w.length>0?w:null}async function F(w){if(!s)return;let Y=f();if(!Y)return;y=w||"";let G=R(w);if(re(),!G.viable){ne(G.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let ee=await s("worker-queue-set-default-exec-preset",{preset_id:w||null,expected_queue_revision:p(),expected_preset_revision:Y.revision});if(A(ee),ee&&ee.presets&&n&&n.set(ee.presets),ee&&ee.conflict){ne("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(ee&&ee.applied){y=null,re();return}ne("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{ne("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function Q(w){l={id:w.id,name:w.name,settings:{...w.settings||{}}},C(),a=!1,re()}function Z(){l={id:null,name:"",settings:{}},a=!1,re()}function P(w){let Y=w&&w.settings&&typeof w.settings=="object"?w.settings:{},G=ee=>typeof Y[ee]=="string"?Y[ee]:ee==="impl_runtime"&&typeof Y.impl_model=="string"&&Vt($(),Y.impl_model)||"";return Cr({selectedOf:G,effectiveOf:G,runner_catalog:$()}).some(ee=>ee.groups.some(fe=>fe.options.some(Te=>Te.value===ee.selected&&Te.label.endsWith("(\uBE44\uD638\uD658)"))))}function R(w){if(!w)return{viable:!0,missing:!1,incompatible:!1,preset:null};let G=f()?.presets.find(fe=>fe.id===w);if(!G||G.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let ee=G.compatible===!1||P(G);return{viable:!ee,missing:!1,incompatible:ee,preset:G}}function T(){let w=l?.settings.orchestration_model;return typeof w!="string"?null:Vt($(),w)}function C(){if(!l)return;let w=Bn({impl_runtime:l.settings.impl_runtime||"",impl_model:l.settings.impl_model||"",impl_effort:l.settings.impl_effort||""},$(),T());for(let Y of["impl_runtime","impl_model","impl_effort"])w[Y]?l.settings[Y]=w[Y]:delete l.settings[Y]}function U(w){let Y=w&&w.settings&&typeof w.settings=="object"?w.settings:{},G=Er.filter(fe=>typeof Y[fe]=="string").length,ee=Er.filter(fe=>typeof Y[fe]=="string").map(fe=>`${Ps[fe]?.title||fe}: ${Y[fe]}`);return{count:`${G}/11 \uC9C0\uC815`,choices:ee.length>0?ee.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function ue(w){if(!s||!window.confirm(`\u201C${w.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let Y=f();if(Y)try{let G=await s("exec-preset-delete",{expected_revision:Y.revision,id:w.id});h(G),G&&G.conflict&&ne("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{ne("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function $e(w=!1){if(!s||!l)return;let Y=f();if(!Y)return;let G=w||l.id===null,ee={expected_revision:Y.revision,...G?{}:{id:l.id},name:l.name,settings:{...l.settings}};try{let fe=await s(G?"exec-preset-create":"exec-preset-update",ee);if(h(fe),fe&&fe.conflict){a=!0,re();return}if(fe&&fe.applied){l=null,a=!1,re();return}ne("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{ne("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _e(w){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Ns(w.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${w.key}
        ?disabled=${w.disabled}
        @change=${Y=>{if(!l)return;let G=Y.target.value;G?l.settings[w.key]=G:delete l.settings[w.key],(w.key==="impl_runtime"||w.key==="impl_model"||w.key==="impl_effort"||w.key==="orchestration_model")&&C(),a=!1,re()}}
      >
        ${qn(w.groups,w.selected,Ms[w.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function pe(){if(!l)return"";let w=fe=>typeof l?.settings[fe]=="string"?l.settings[fe]:"",Y=Cr({selectedOf:w,effectiveOf:w,runner_catalog:$(),controller_runtime:T()}),G=f(),ee=l.id!==null&&G!==null&&!G.presets.some(fe=>fe.id===l?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${l.name}
          data-preset-name
          @input=${fe=>{l&&(l.name=fe.target.value,a=!1)}}
        />
      </label>
      ${a?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${ee?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${Y.map(_e)}
      <div class="exec-preset-editor__actions">
        ${ee?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{$e(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{$e(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{l=null,a=!1,re()}}
        >
          취소
        </button>
      </div>
    </div>`}function Ee(){let w=f(),Y=w?w.presets.filter(G=>G?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${Z}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${w===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:Y.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:Y.map(G=>{let ee=U(G),fe=typeof G.reference_count=="number",Te=fe?G.reference_count:null,Ne=Array.isArray(G.reference_summary)?G.reference_summary.map(Ye=>Ye?.display_name||Ye?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${G.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${G.name}</strong>
                  <span>${ee.count}</span>
                  <span data-preset-references=${G.id}
                    >${fe?`\uCC38\uC870 ${Te}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${P(G)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${ee.choices}</small>
                  ${Ne?c`<small data-preset-impact=${G.id}
                        >업데이트 영향: ${Ne}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${G.id}
                    @click=${()=>Q(G)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${G.id}
                    ?disabled=${Te===null||Te>0||G.reference_scan_complete===!1}
                    title=${Te===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Te>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":G.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{ue(G)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${pe()}
    </section>`}function je(){let w=f(),Y=w?w.presets.filter(Ne=>Ne?.migration_pending!==!0):[],G=D()||"",ee=R(G),fe=ee.preset,Te=fe?U(fe):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${G}
        ?disabled=${w===null}
        @change=${Ne=>{F(Ne.target.value)}}
      >
        <option value="" ?selected=${G===""}>
          없음 — harness 기본값
        </option>
        ${G&&ee.missing?c`<option value=${G} ?selected=${!0}>
              ${G} (선택한 프리셋 없음)
            </option>`:""}
        ${Y.map(Ne=>c`<option
              value=${Ne.id}
              ?selected=${Ne.id===G}
              ?disabled=${Ne.compatible===!1}
            >
              ${Ne.name}${Ne.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${fe?c`<p data-workspace-preset-summary>
            ${Te?.count} · ${Te?.choices}
            ${ee.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${ee.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:ee.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function Ze(){let w=d().workspace_info;return w&&typeof w=="object"?w:{}}function He(w,Y){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${w}"
      >${Y}</span
    >`}function xe(w){let Y=w?wa(w.cmd):"",G=w?ka(w.timeout_ms):"",ee=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${Y?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${Y}</span>
            ${He("config","config")}
            ${G?c`<span class="exec-defaults__vd-meta"
                  >timeout ${G}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${ee}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function L(w){let Y=w?wa(w.cmd):"",G=w?ka(w.timeout_ms):"",ee=G?`timeout ${G} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",fe=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${Y?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${Y}</span>
            ${He("config","config")}
            ${w.detached===!0?He("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${ee}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${fe}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function H(w){if(!w||typeof w!="object")return"";let Y=$u[String(w.outcome)];if(!Y)return"";let G=w.outcome==="failed"&&w.reason?`${Y.label} \xB7 ${w.reason}`:Y.label,ee=[yt(w.at),typeof w.bead_id=="string"?w.bead_id:"",typeof w.base_sha=="string"?w.base_sha.slice(0,7):""].filter(Ne=>Ne.length>0).join(" \xB7 "),fe=typeof w.detail=="string"&&w.detail.length>0?xu(w.detail):"",Te=typeof w.log_path=="string"&&w.log_path.length>0?w.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${He(Y.modifier,G)}
        ${ee?c`<span class="exec-defaults__vd-meta">${ee}</span>`:""}
      </div>
      ${fe?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${fe}</code>
          </div>`:""}
      ${Te?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Te}</code>
          </div>`:""}
    </div>`}let me=!1,se=!1,we=!1,ge=null;async function Be(){if(s){se=!0,we=!1,re();try{let w=await Promise.resolve(s("get-worker-system-prompt",{}));!w||typeof w!="object"||Array.isArray(w)?we=!0:ge=w}catch{we=!0}finally{se=!1,re()}}}function he(){if(me=!me,me&&!ge){Be();return}re()}function Ce(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${me?"true":"false"}
          @click=${he}
        >
          ${me?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${me?B():""}
    </section>`}function B(){let w=Tr({loading:se,error:we});if(w)return w;if(!ge)return"";let Y=Array.isArray(ge.variants)?ge.variants:[];return c`<div class="exec-defaults__sp-body">
      ${ge.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${ge.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${Y.map(G=>c`<div class="exec-defaults__sp-variant" data-variant=${G.key}>
            <div class="exec-defaults__sp-cond">${G.condition}</div>
            ${Yt(G.label,G.system_prompt)}
          </div>`)}
    </div>`}function O(w){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${xe(w.verify_cmd)} ${L(w.deploy_cmd)}
      ${H(w.last_deploy)}
    </section>`}function re(){if(Oe(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${ae}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Ee()} ${je()}
            ${O(Ze())}
            ${Ce()}
          </div>
        </div>
      `,i),y!==null){let w=i.querySelector("[data-workspace-preset-select]");w&&(w.value=y)}}let Se=!1,Ie=()=>{Se=!1},q=w=>{w.target===w.currentTarget&&ae()};i.addEventListener("close",Ie),i.addEventListener("cancel",Ie),i.addEventListener("click",q);let z=null;r&&r.subscribe&&(z=r.subscribe(()=>{Se&&re()}));let M=null;n&&n.subscribe&&(M=n.subscribe(()=>{Se&&re()}));function oe(){Se||(Se=!0,re(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function ae(){Se&&(Se=!1,typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:oe,close:ae,destroy(){Se=!1,i.removeEventListener("close",Ie),i.removeEventListener("cancel",Ie),i.removeEventListener("click",q),z&&(z(),z=null),M&&(M(),M=null),i.remove()}}}function Rr(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${yt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${yt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function qs(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=mt(e.usage),s=Ot(e.usage),o=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,l=e.lane==="done"&&!i,a=l?Tt(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,h=c`<span class="worker-mini__title">${e.title}</span>`,A=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",$=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",y=r.map(U=>U===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${U}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${U===e.completion_badge&&e.completion_title||""}
          >${U}</span
        >`),D=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",F=n.length>0?n.map(U=>c`<span class="worker-usage" title=${U.tooltip}
              >${U.label}</span
            >`):s?c`<span class="worker-usage" title=${Ar(e.usage)}
            >${s}</span
          >`:"",Q=o?c`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",Z=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",P=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",R=e.discard_action?c`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",T=e.revise_action?c`<button
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
        </button>`:"",C=!!(s||o||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">${p}${f}${h}</div>
          <div class="worker-mini__row2">
            ${F}${a?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${yt(e.done_at)}`}
                  >완료 ${a}</span
                >`:""}${y}${Q}
            <span class="worker-mini__actions"
              >${Z}${P}${R}</span
            >
            ${Rr(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${d}${p}${f}${A}${$}${y}${D}
            </div>
            <div class="worker-mini__body">${h}</div>
            ${C?c`<div class="worker-mini__foot">
                  ${F}${Q}
                  <span class="worker-mini__actions"
                    >${Z}${P}${R}${T}</span
                  >
                </div>`:""}
            ${Rr(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${f}${h}${A}${$}${y}${D}${F}${Q}${Z}${P}${R}
            </div>
            ${Rr(e)}`}
  </div>`}function Su(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${r?yn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":i?"quick_fix route\uB294 \uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Rr(e)}
  </div>`}function Bt(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Su(n):qs(n))}
          </div>`}
  </section>`}var xa=160;function jn(e){return e.length>xa?`${e.slice(0,xa)}\u2026`:e}function Au(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${jn(e.command)}</code>`:""}
  </div>`}function Tu(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function Eu(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function Cu(e){return!e||typeof e.verdict!="string"||typeof e.evidence!="string"?"":e.malformed===!0||e.verdict==="malformed"?c`<div class="worker-banner__detail">
      <b>진단 결과 형식 오류</b> · ${jn(e.evidence)}
    </div>`:c`<div class="worker-banner__detail">
    진단: <b>${e.verdict}</b> · 근거:
    ${jn(e.evidence)}
    ${e.verdict==="regression"&&e.fix_bead_id?c` · 수정 bead: ${e.fix_bead_id}`:""}
  </div>`}function Bs(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Sa(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Au(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(r=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). 1회 자동 재시도 후에도 실패했습니다 — [AI
          정리]로 진단하거나 정리를 사람이 마무리하세요.
          <button
            type="button"
            class="worker-banner__cleanup-diagnose"
            data-bead-id=${r.bead_id}
            ?disabled=${r.diagnosis_pending===!0}
            title="정리 실패 원인을 AI 세션으로 분류합니다"
          >
            AI 정리
          </button>
          ${Cu(r.diagnosis)}
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${jn(r.detail)}</code>
              </div>`:""}
          ${Eu(r.log_path)} ${Tu(r.output_tail)}
        </div>`)}
  </div>`}function Ru(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Bs(t-e.started_at):"\u2014",i=[e.runner,e.model].filter(Boolean).join(" \xB7 "),l=mt(e.usage),a=Ot(e.usage),d=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,p=e.base_exception||null,f=e.attempt_id&&e.attempt_id===r;return c`<div
    class="rtile${f?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${e.resumed_from?c`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${e.resumed_from})`}
            >↻</span
          >`:""}
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
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
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
            <button
              type="button"
              class="rtile__stop"
              title="폐기"
              aria-label="폐기"
            >
              ■
            </button>`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${i||l.length>0||a||d||p?c`<div class="rtile__meta">
          ${d?c`<span class="worker-mini__badge">${d}</span>`:""}
          ${p?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${p}</span
              >`:""}
          ${i?c`<span class="rtile__runner">${i}</span>`:""}
          ${l.length>0?l.map(h=>c`<span class="worker-usage" title=${h.tooltip}
                    >${h.label}</span
                  >`):a?c`<span
                  class="worker-usage"
                  title=${Ar(e.usage)}
                  >${a}</span
                >`:""}
        </div>`:""}
    ${Rr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Us(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Ru(s,t,r))}
  </div>`}function sr(e){return c`<svg
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
  </svg>`}function js(){return sr(jt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function zs(){return sr(jt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Hs(){return sr(jt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Aa(){return sr(jt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Ta(){return sr(jt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Ea(){return sr(jt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ca(){return sr(jt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Ra(){return sr(jt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var en=1,Iu=6e4,Lu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Du=new Set(["auto_merge","merged","merge","done"]),Ia={running:3,paused:2,failed:1};function Ou(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Pu(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let i of r)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from),s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of r){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0)continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!n.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let f=t.get(i.bead_id),h=typeof f=="number"&&f>0&&typeof i.finished_at=="number"&&f>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!h&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,d=o.get(i.bead_id);if(d){let f=Ia[d.run_state],h=Ia[l];if(f>h||f===h&&(d.started_at??0)>(a??0))continue}let p=typeof i.session_id=="string"&&i.session_id.length>0;o.set(i.bead_id,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:a,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,model:typeof i.model=="string"?i.model:null,usage:Rt(e,i.bead_id),can_pause:l==="running"&&p,can_resume:l!=="running"&&p&&!n.has(i.attempt_id)})}return o}function La(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Lt(e){return e&&typeof e=="object"?e:{}}function Ws(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,i=new Map;for(let y of s)y&&typeof y.root_dir=="string"&&i.set(y.root_dir,y);let l=[],a=[],d=[],p=[],f=[],h=new Map;for(let y of n){if(!y||typeof y.root_dir!="string")continue;let D=y.root_dir,F=y.name||D,Q=i.get(D),Z=Q&&typeof Q.revision=="number"?Q.revision:typeof y.revision=="number"?y.revision:0,P=Lt(y.attempts),R=Lt(y.bead_titles),T=Lt(y.pr_observations),C=Lt(y.admission),U=Lt(y.revise_parked),ue=Lt(y.merge_queue_state),$e=Lt(y.cleanup_failed),_e=Array.isArray(y.merge_queue)?y.merge_queue:[],pe=new Set(_e.filter(L=>L&&typeof L.bead_id=="string").map(L=>L.bead_id)),Ee=Array.isArray(y.queue)?y.queue:[],je=Array.isArray(y.done)?y.done:[],Ze=new Map;for(let L of je)L&&typeof L.bead_id=="string"&&typeof L.added_at=="number"&&Ze.set(L.bead_id,L.added_at);let He=L=>({id:L,title:R[L]||L,root_dir:D,workspace_name:F,expected_revision:Z,draggable:!1}),xe=new Set;for(let[L,H]of Pu(P,Ze))xe.add(L),a.push({...He(L),lane:"running",attempt_id:H.attempt_id,run_state:H.run_state,can_pause:H.can_pause,can_resume:H.can_resume,started_at:H.started_at,last_event_at:H.last_event_at,model:H.model,usage:H.usage,badges:H.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:H.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:H.run_state==="failed"});for(let L of Array.isArray(y.pr_wait)?y.pr_wait:[]){let H=L&&L.bead_id;if(typeof H!="string"||xe.has(H))continue;xe.add(H);let me=Lt(T[H]),se=Lt(me.pr),we=me.gate?Lt(me.gate):null,ge=pe.has(H),Be=ue.active===H,he=L.external===!0,Ce=$e[H]||null,B=!!we&&we.base_badge==="\uCDA9\uB3CC",O=!!Ce&&!!we&&we.tier==="merged",re=he&&!!we&&we.tier==="merged";d.push({...He(H),lane:"pr_wait",pr_number:typeof se.number=="number"?se.number:null,pr_url:typeof se.url=="string"?se.url:void 0,external:he,usage:Rt(P,H),badges:Ce?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Ce,reason:Ce?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!ge,merge_enabled:we?.enabled===!0||B||O||re,merge_label:re?"\uC815\uB9AC":B&&!O?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:re?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":O?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":B?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":we?.enabled===!0?`\uBA38\uC9C0 (${we.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${we?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ge,cancel_enabled:!Be,discard_action:!he&&!Ce&&!(we&&we.tier==="merged"),discard_enabled:!Be&&!ge,discard_title:ge?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let L=0;L<Ee.length;L++){let H=Ee[L],me=H&&H.bead_id;if(typeof me!="string"||xe.has(me))continue;xe.add(me);let se=U[me],we={...He(me),lane:"queue",reason:La(C,me),queue_position:L+1,queue_index:L,queue_length:Ee.length,badges:se?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!se,revise_action:!!se,revise_enabled:!!se,revise_title:se?se.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${se.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(we);let ge=h.get(D);ge?ge.push(we):h.set(D,[we])}for(let L of Array.isArray(y.runnable)?y.runnable:[]){let H=L&&L.bead_id;typeof H!="string"||xe.has(H)||(xe.add(H),l.push({...He(H),title:L.title||R[H]||H,lane:"runnable",draggable:!0,reason:La(C,H),created_at:L.created_at??void 0,updated_at:L.updated_at??void 0,labels:Array.isArray(L.labels)?L.labels:[],workflow:L.route?{route:L.route,chips:{route:L.route}}:null,place_index:Ee.length}))}for(let L of je){let H=L&&L.bead_id;if(typeof H!="string"||xe.has(H)||(xe.add(H),o!==void 0&&typeof L.added_at=="number"&&L.added_at<o))continue;let me=Ou(P,H);f.push({...He(H),lane:"done",done:!0,usage:Rt(P,H),done_at:typeof L.added_at=="number"?L.added_at:void 0,done_kind:me&&typeof me.done_kind=="string"?me.done_kind:null})}}a.sort((y,D)=>(D.last_event_at??0)-(y.last_event_at??0)),f.sort((y,D)=>(D.done_at??0)-(y.done_at??0));let A=s.length>0?s:n.map(y=>({root_dir:y&&y.root_dir,name:y&&y.name,auto_advance:y&&y.auto_advance,auto_merge:y&&y.auto_merge,slots:y&&y.slots,revision:y&&y.revision,exec_defaults:y&&y.exec_defaults,default_exec_preset_id:y&&y.default_exec_preset_id,runner_catalog:y&&y.runner_catalog})),$=[];for(let y of A)!y||typeof y.root_dir!="string"||$.push({root_dir:y.root_dir,name:y.name||y.root_dir,auto_advance:y.auto_advance===!0,auto_merge:y.auto_merge===!0,slots:typeof y.slots=="number"&&y.slots>=en?y.slots:en,revision:typeof y.revision=="number"?y.revision:0,exec_defaults:Lt(y.exec_defaults),default_exec_preset_id:typeof y.default_exec_preset_id=="string"?y.default_exec_preset_id:null,runner_catalog:Lt(y.runner_catalog),items:h.get(y.root_dir)||[]});return{runnable:l,queue:p,queue_groups:$,running:a,pr_wait:d,done:f,automation:{total:$.length,both_on:$.filter(y=>y.auto_advance&&y.auto_merge).length}}}function Mu(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Iu;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${yt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Tt(e,t)}</span
        >`}</span
  >`}function tn(e){return c`<div class="mon-c__title">${e.title}</div>`}function rn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function zn(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Gs(e){let t=mt(e.usage),r=Ot(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${Ar(e.usage)}
        >${r}</span
      >`:""}function Ys(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Nu(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${zs()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${js()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${Hs()}
    </button>
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Aa()}
        </button>`:""}
  </span>`}function Fu(e,t){let r=typeof e.started_at=="number"?Bs(t-e.started_at):"";return c`${tn(e)}
    <div class="mon-c__meta">
      ${Ys(e)}${Mu(e.last_event_at,t)}${rn(e)}${zn(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Gs(e)}${Nu(e)}
    </div>`}function qu(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=Tt(e.updated_at);return c`${tn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${rn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${vn(e.labels,null).map(i=>c`<span class="ctl-chip ctl-chip--label">${i}</span>`)}
      ${zn(e)}
      ${o?c`<span title=${`\uC218\uC815 ${yt(e.updated_at)}`}
            >수정 ${o}</span
          >`:""}
      ${e.reason?c`<span
            class="mon-c__reason${s?" mon-c__reason--danger":""}"
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
    </div>`}function Bu(e){return c`${tn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${rn(e)}
      ${Ys(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
      </span>
    </div>
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
        </div>`:""}`}function Uu(e){let t=!!(Ot(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${tn(e)}
    <div class="mon-c__meta">
      ${rn(e)}${zn(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ys(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${Gs(e)}
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
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C)"}
              >
                폐기
              </button>`:""}
        </div>`:""}`}function ju(e,t){let r=e.done_kind||"",n=r?Lu[r]||r:"",s=Tt(e.done_at,t);return c`${tn(e)}
    <div class="mon-c__meta">
      ${rn(e)}${zn(e)}
      ${n?c`<span
            class="mon-live__kind${Du.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Gs(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${yt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Da(e,t){return e.lane==="running"?Fu(e,t):e.lane==="runnable"?qu(e):e.lane==="queue"?Bu(e):e.lane==="pr_wait"?Uu(e):ju(e,t)}function Oa(e){let t=String(e.revision);return c`<header
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
        title=${e.auto_advance?"\uC790\uB3D9 \uC9C4\uD589 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA48\uCDA5\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB300\uAE30 \uD050\uB97C \uB514\uC2A4\uD328\uCE58\uD569\uB2C8\uB2E4"}
      >
        ${e.auto_advance?zs():js()}
        <span class="mon-ctl__label">진행</span>
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
        ${Ta()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Ea()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${en}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
      <button
        type="button"
        class="mon-ctl mon-ctl--exec"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        aria-haspopup="dialog"
        aria-label=${`${e.name} \uC2E4\uD589 \uAE30\uBCF8\uAC12`}
        title="실행 기본값"
      >
        ${Ca()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Pa(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=qt.find(i=>i.value===e.done_range)?.label||"",o=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Hs():Ra()}
      <span class="mon-auto-all__label"
        >${n?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
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
        ${qt.map(i=>c`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${o.map(i=>c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${s} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Ma(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Na(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return mt($n(t));let r={};for(let l of Ht)r[l]=0;let n=!1,s=0,o=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let d=!1;for(let p of Ht){let f=a[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,d=!0)}if(d){o+=1;let p=a.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,i+=1)}}}return o>0&&i===o&&(r.total_cost_usd=s),n?Ot(r):null}var qa="bdui.monitor.done-range";function zu(){try{let e=window.localStorage.getItem(qa);return zt(e)?e:Ct}catch{return Ct}}function Hu(e){try{window.localStorage.setItem(qa,e)}catch{}}var Ba="tab:monitor:pipeline",Wu=1e3,Gu=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Fa(e,t){let r=e.lane==="runnable"||e.lane==="queue";return c`<div
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
    ${Da(e,t)}
  </div>`}function Ua(e,t){let r=Ke("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.execPresetStore,l=t.getWorkspacePath,a=t.switchWorkspace,d=t.now||(()=>Date.now()),p=t.confirm||(q=>typeof globalThis.confirm!="function"||globalThis.confirm(q)),f=zu();function h(){let q=qt.find(z=>z.value===f);return q?q.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let $=Ws(null,null),y=null,D=new Map,F=new Set;function Q(q){return $.queue_groups.find(z=>z.root_dir===q)||null}let P=Un(e,{queueStore:{get(){if(!y)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let q=D.get(y);if(q)return q;let z=Q(y),M=s&&s.get?s.get():null,oe=(Array.isArray(M)?M:[]).find(ae=>ae&&ae.root_dir===y);return{revision:z?z.revision:0,exec_defaults:z?z.exec_defaults:{},default_exec_preset_id:z?z.default_exec_preset_id:null,runner_catalog:z?z.runner_catalog:null,workspace_info:oe?oe.workspace_info:void 0}},set(q){y&&D.set(y,q);for(let z of Array.from(F))z()},subscribe(q){return F.add(q),()=>F.delete(q)}},presetStore:i,transport:o?(q,z)=>o(q,q==="worker-queue-set-default-exec-preset"||q==="get-worker-system-prompt"?{...z||{},root_dir:y}:z):void 0,getWorkspacePath:()=>y||void 0}),R=null,T=null;async function C(q,z,M,oe){if(!o||!M)return null;let ae=await o(q,{...z,root_dir:M,expected_revision:oe});if(ae&&ae.conflict){let w=ae.queue&&typeof ae.queue.revision=="number"?ae.queue.revision:oe;ae=await o(q,{...z,root_dir:M,expected_revision:w})}return ae&&ae.queue&&M&&D.set(M,ae.queue),ae}async function U(q,z,M){return!o||!M?null:await o(q,{...z,root_dir:M})}async function ue(q){if(!o||!q&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let z=await o("monitor-auto-toggle",{on:q}),M=z&&Array.isArray(z.failed)?z.failed:[];M.length>0&&ne(`\uC790\uB3D9\uD654 ${q?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${M.map(oe=>oe.root_dir).join(", ")}`,"error",3200)}async function $e(){let q=new Map;for(let z of $.pr_wait)q.has(z.root_dir)||q.set(z.root_dir,z.expected_revision);for(let[z,M]of q)await C("worker-merge-queue-add-all",{},z,M)}let _e=null,pe=!1,Ee=null;function je(){Ee!==null&&clearTimeout(Ee),Ee=setTimeout(()=>{Ee=null,pe=!1},0)}function Ze(q){let z=q.target;return typeof z?.closest=="function"?z.closest(".mon-group"):null}function He(q){let z=Ze(q);return!z||!_e?null:(z.getAttribute("data-root-dir")||"")===_e.root_dir?z:null}function xe(){for(let q of Array.from(A.querySelectorAll(".mon-group--drag-over")))q.classList.remove("mon-group--drag-over")}function L(q){let z=q.target,M=typeof z?.closest=="function"?z.closest('.mon-card[draggable="true"]'):null;if(M){_e={bead_id:M.getAttribute("data-issue-id")||"",lane:M.getAttribute("data-lane")||"",root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0,queue_index:Number(M.getAttribute("data-queue-index")),queue_length:Number(M.getAttribute("data-queue-length")),place_index:Number(M.getAttribute("data-place-index"))},pe=!0;try{q.dataTransfer?.setData("text/plain",_e.bead_id),q.dataTransfer&&(q.dataTransfer.effectAllowed="move")}catch{}}}function H(q){let z=He(q);z&&(q.preventDefault(),q.dataTransfer&&(q.dataTransfer.dropEffect="move"),z.classList.add("mon-group--drag-over"))}function me(q){Ze(q)?.classList.remove("mon-group--drag-over")}function se(){_e=null,xe(),je()}function we(q){let z=He(q),M=_e;if(_e=null,xe(),!z||!M||!M.bead_id)return;q.preventDefault();let oe=q.target,ae=typeof oe?.closest=="function"?oe.closest('.mon-card[data-lane="queue"]'):null,w=ae&&z.contains(ae)?Number(ae.getAttribute("data-queue-index")):NaN;if(M.lane==="runnable"){let ee=Number.isFinite(w)?w:M.place_index;if(!Number.isFinite(ee))return;C("worker-queue-place",{bead_id:M.bead_id,index:ee},M.root_dir,M.revision);return}if(M.lane!=="queue"||ae&&ae.getAttribute("data-issue-id")===M.bead_id)return;let Y=M.queue_index,G=Number.isFinite(w)?Y>w?w:w-1:M.queue_length-1;!Number.isFinite(G)||G<0||G===Y||C("worker-queue-reorder",{bead_id:M.bead_id,to_index:G},M.root_dir,M.revision)}function ge(q){let z={runnable:$.runnable,queue:$.queue,running:$.running,pr_wait:$.pr_wait,done:$.done};return c`${Pa({automation:$.automation,counts:{running:$.running.length,queue:$.queue.length,pr_wait:$.pr_wait.length},done_range:f,token_total:Na($.done),token_tooltip:Ma(h())})}
      <div class="worker-lanes mon-lanes">
        ${Gu.map(M=>{let oe=z[M.lane],ae=M.lane==="queue"?$.queue_groups.length>0?c`${$.queue_groups.map(w=>c`<div
                        class="mon-group"
                        data-root-dir=${w.root_dir}
                      >
                        ${Oa(w)}
                        <div class="mon-group__list">
                          ${w.items.map(Y=>Fa(Y,q))}
                        </div>
                      </div>`)}`:void 0:oe.length>0?c`${oe.map(w=>Fa(w,q))}`:void 0;return Bt({id:`monitor-${M.lane}`,lane:M.pane,title:M.lane==="done"?`\uC644\uB8CC\xB7${h()}`:M.title,items:oe,empty:M.empty,body:ae,live:M.lane==="running"&&oe.length>0,header_control:M.lane==="pr_wait"&&oe.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function Be(){let q=s&&s.get?s.get():null,z=s&&s.getWorkspacesState?s.getWorkspacesState():[],M=d();$=Ws(q,z,{done_since:vr(f,M)}),Oe(ge(M),A)}function he(q,z){let M=l?l():void 0;if(!z||!M||z===M||!a){n(q);return}a(z).then(()=>{n(q)}).catch(oe=>{r("workspace switch for %s failed: %o",z,oe)})}function Ce(q){return{root_dir:q.getAttribute("data-root-dir")||"",revision:Number(q.getAttribute("data-revision")||0)||0}}function B(q,z){let{root_dir:M,revision:oe}=Ce(q),ae=q.getAttribute("data-issue-id")||"",w=q.getAttribute("data-attempt-id")||"",Y=z.classList;if(Y.contains("worker-card__place")){C("worker-queue-place",{bead_id:ae,index:Number(q.getAttribute("data-place-index")||0)||0},M,oe);return}if(Y.contains("mon-op--up")||Y.contains("mon-op--down")){let G=Number(q.getAttribute("data-queue-index")||0)||0,ee=Y.contains("mon-op--up")?G-1:G+1;if(ee<0)return;C("worker-queue-reorder",{bead_id:ae,to_index:ee},M,oe);return}if(Y.contains("mon-op--remove")){C("worker-queue-remove",{bead_id:ae},M,oe);return}if(Y.contains("mon-op--pause")){U("worker-attempt-pause",{attempt_id:w},M);return}if(Y.contains("mon-op--stop")){U("worker-attempt-stop",{attempt_id:w},M);return}if(Y.contains("mon-op--resume")){C("worker-attempt-resume",{attempt_id:w},M,oe);return}if(Y.contains("mon-op--dismiss")){C("worker-attempt-dismiss",{attempt_id:w},M,oe);return}if(Y.contains("worker-mini__merge")){C("worker-merge-queue-add",{bead_id:ae},M,oe);return}if(Y.contains("worker-mini__merge-cancel")){C("worker-merge-queue-remove",{bead_id:ae},M,oe);return}if(Y.contains("worker-mini__discard")){if(!p(`${ae}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;C("worker-pr-discard",{bead_id:ae},M,oe);return}if(Y.contains("worker-mini__revise-fix")){C("worker-revise-fix",{bead_id:ae},M,oe);return}Y.contains("worker-mini__revise-approve")&&C("worker-revise-approve",{bead_id:ae},M,oe)}function O(q){let z=pe;pe=!1;let M=q.target;if(!M||typeof M.closest!="function"||M.closest("dialog")||M.closest("a"))return;let oe=M.closest(".mon-auto-all");if(oe){q.preventDefault(),ue(oe.getAttribute("data-on")==="true");return}if(M.closest(".mon-merge-all")){q.preventDefault(),$e();return}let w=M.closest(".mon-ctl--advance");if(w){q.preventDefault();let{root_dir:Ne,revision:Ye}=Ce(w);C("worker-queue-toggle",{on:w.getAttribute("data-on")==="true"},Ne,Ye);return}let Y=M.closest(".mon-ctl--merge-auto");if(Y){q.preventDefault();let{root_dir:Ne,revision:Ye}=Ce(Y);C("worker-merge-auto-toggle",{on:Y.getAttribute("data-on")==="true"},Ne,Ye);return}let G=M.closest(".mon-ctl--exec");if(G){q.preventDefault(),y=G.getAttribute("data-root-dir")||null,D.delete(y||""),P.open();return}let ee=M.closest(".mon-card");if(!ee)return;let fe=M.closest("button");if(fe){q.preventDefault(),B(ee,fe);return}let Te=ee.getAttribute("data-issue-id");Te&&!z&&(q.preventDefault(),he(Te,ee.getAttribute("data-root-dir")||""))}function re(q){let z=q.target;if(!z||typeof z.closest!="function")return;let M=z.closest(".mon-done-range");if(M){f=zt(M.value)?M.value:Ct,Hu(f),Be();return}let oe=z.closest(".mon-slots__input");if(!oe)return;let{root_dir:ae,revision:w}=Ce(oe),Y=Number(oe.value);if(!Number.isFinite(Y))return;let G=Math.max(en,Math.floor(Y));C("worker-queue-set-slots",{slots:G},ae,w)}e.addEventListener("click",O),e.addEventListener("change",re),e.addEventListener("dragstart",L),e.addEventListener("dragover",H),e.addEventListener("dragleave",me),e.addEventListener("drop",we),e.addEventListener("dragend",se),s&&typeof s.subscribe=="function"&&(R=s.subscribe(()=>{try{D.clear(),Be();for(let q of Array.from(F))q()}catch{}}));function Se(){T!==null&&(clearInterval(T),T=null)}function Ie(){Ee!==null&&(clearTimeout(Ee),Ee=null)}return{load(){r("load"),Be(),T===null&&(T=setInterval(()=>{try{Be()}catch{}},Wu))},pause(){Se()},clear(){Se(),Ie(),R&&(R(),R=null),e.removeEventListener("click",O),e.removeEventListener("change",re),e.removeEventListener("dragstart",L),e.removeEventListener("dragover",H),e.removeEventListener("dragleave",me),e.removeEventListener("drop",we),e.removeEventListener("dragend",se),P.destroy(),F.clear(),e.replaceChildren()}}}function ja(e,t,r){let n=Ke("views:nav"),s=null;function o(a){return d=>{d.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let a=t.getState(),d=a.view==="worker"||a.view==="monitor"?a.view:"board";return c`
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
    `}function l(){Oe(i(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Oe(c``,e)}}}var za=["bug","feature","task","epic","chore"];function Ha(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Wa=["Critical","High","Medium","Low","Backlog"];function Ga(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",o.appendChild(R);for(let T of za){let C=document.createElement("option");C.value=T,C.textContent=Ha(T),o.appendChild(C)}i.replaceChildren();for(let T=0;T<=4;T+=1){let C=document.createElement("option");C.value=String(T);let U=Wa[T]||"Medium";C.textContent=`${T} \u2013 ${U}`,i.appendChild(C)}}A();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function y(R){s.disabled=R,o.disabled=R,i.disabled=R,l.disabled=R,a.disabled=R,p.disabled=R,f.disabled=R,f.textContent=R?"Creating\u2026":"Create"}function D(){d.textContent=""}function F(R){d.textContent=R}function Q(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?o.value=R:o.value="";let T=window.localStorage.getItem("beads-ui.new.priority");T&&/^\d$/.test(T)?i.value=T:i.value="2"}catch{o.value="",i.value="2"}}function Z(){let R=o.value||"",T=i.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),T.length>0&&window.localStorage.setItem("beads-ui.new.priority",T)}async function P(){D();let R=String(s.value||"").trim();if(R.length===0){F("Title is required"),s.focus();return}let T=Number(i.value||"2");if(!(T>=0&&T<=4)){F("Priority must be 0..4"),i.focus();return}let C=String(o.value||""),U=String(a.value||""),ue={title:R};C.length>0&&(ue.type=C),String(T).length>0&&(ue.priority=T),U.length>0&&(ue.description=U),y(!0);try{await t("create-issue",ue)}catch{y(!1),F("Failed to create issue");return}Z(),y(!1),$()}return r.addEventListener("cancel",R=>{R.preventDefault(),$()}),h.addEventListener("click",()=>$()),p.addEventListener("click",()=>$()),r.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),P())}),n.addEventListener("submit",R=>{R.preventDefault(),P()}),{open(){n.reset(),D(),Q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Yu=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ya(e){return String(e).padStart(2,"0")}function Vu(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Ku(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Ya(n.getHours())}:${Ya(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Yu[n.getMonth()]} ${n.getDate()} ${o}`;return`${Vu(r,t)} \xB7 ${l}`}function Zu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Va=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Ka(e){let t=!1,r=null,n=new Map;function s(){Oe(c``,e),e.hidden=!0}function o(){let a=Va.filter(p=>n.has(p.key));if(a.length===0){s();return}let d=Date.now();Oe(c`<div class="usage-meter" aria-label="Usage">
        ${a.map(p=>{let f=n.get(p.key),h=typeof f.ageSeconds=="number"&&f.ageSeconds>600,A=h?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${f.windows.map($=>{let y=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,D=Math.min(100,Math.max(0,y)),Q=`resets ${Ku($.resetsAt,d)}${h?` \xB7 ${A}`:""}`;return c`<span
                class="usage-meter__window ${Zu(D)}"
                style=${`--progress: ${D}%`}
                title=${Q}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${D}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function i(a){try{let d=await fetch(a.endpoint);if(!d.ok)return null;let p=await d.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function l(){let a=await Promise.all(Va.map(async d=>({provider:d,payload:await i(d)})));if(!t){for(let d of a)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Xu="worker-ineligible";function Qu(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Za(e){return Qu(e).includes(Xu)}var Ju="tab:worker:ready",ep="tab:worker:blocked",tp="tab:worker:in-progress",nn=1;function Xa(e){return Xr(e).path.length>0}var el="beads-ui.worker.candidate-filter",Vs={show_blocked:!1,spec:"all"};function rp(e,t){if(!e||typeof e!="object"||Array.isArray(e))return!1;let r=Object.values(e),n=new Set;for(let s of r)s&&typeof s=="object"&&typeof s.resumed_from=="string"&&s.resumed_from.length>0&&n.add(s.resumed_from);return r.some(s=>s&&typeof s=="object"&&s.bead_id===t&&s.cleanup_diagnosis===!0&&(s.status==="running"||s.status==="paused"&&!n.has(s.attempt_id)))}function np(){try{let e=window.localStorage.getItem(el);if(!e)return{...Vs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Vs};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Vs}}}function sp(e){try{window.localStorage.setItem(el,JSON.stringify(e))}catch{}}function op(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of e){let a=r(l),d=n(l);a&&d?s.push(l):!a&&d?o+=1:a&&!d&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var ip=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],tl="bdui.worker.candidate_sort",ap=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Hn="spec";function lp(){try{let e=window.localStorage.getItem(tl);return e==="board"||e==="created"||e==="spec"?e:Hn}catch{return Hn}}function cp(e){try{window.localStorage.setItem(tl,e)}catch{}}var rl="bdui.worker.done-range";function dp(){try{let e=window.localStorage.getItem(rl);return zt(e)?e:Ct}catch{return Ct}}function up(e){try{window.localStorage.setItem(rl,e)}catch{}}var pp="(max-width: 640px)",nl="beads-ui.worker.lane-collapsed",sn={queue:!0,done:!0};function fp(){try{let e=window.localStorage.getItem(nl);if(!e)return{...sn};let t=JSON.parse(e);return!t||typeof t!="object"?{...sn}:{queue:typeof t.queue=="boolean"?t.queue:sn.queue,done:typeof t.done=="boolean"?t.done:sn.done}}catch{return{...sn}}}function _p(e){try{window.localStorage.setItem(nl,JSON.stringify(e))}catch{}}function Qa(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function mp(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(ur):(n.sort(fn(r)),t==="board"?n:[...n.filter(Xa),...n.filter(s=>!Xa(s))])}function gp(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function hp(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function bp(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var vp=["closed_unmerged","undecidable"],yp=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function kp(e,t){for(let r of yp)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var wp=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_sync",label:"base \uB3D9\uAE30\uD654",index:2},{step:"reconcile_queued",label:"\uC815\uB9AC \uC900\uBE44",index:2},{step:"candidate_pinned",label:"\uBC30\uD3EC \uD6C4\uBCF4 \uACE0\uC815",index:3},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D",index:4},{step:"reconcile_verify",label:"\uC815\uB9AC \uC911 \xB7 \uAC80\uC99D",index:4},{step:"deploy",label:"\uBC30\uD3EC",index:5},{step:"reconcile_deploy",label:"\uC815\uB9AC \uC911 \xB7 \uBC30\uD3EC",index:5},{step:"reconcile_readback",label:"\uC815\uB9AC \uC911 \xB7 readback",index:6},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:7},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:8},{step:"parent_close",label:"\uBD80\uBAA8 close",index:9}];function $p(e){if(typeof e!="string"||e.length===0)return null;let t=9,r=wp.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function xp(e){if(!e||e.adapter!=="managed"&&e.stage!=="queued")return null;let t=e.stage==="queued"?"reconcile_queued":e.stage==="pinned"?"candidate_pinned":e.stage==="verifying"?"reconcile_verify":e.stage==="deploying"?"reconcile_deploy":e.stage==="readback"?"reconcile_readback":null;return t?{activity:null,merge_progress:{step:t,started_at:typeof e.updated_at=="number"?e.updated_at:0}}:null}function Ja(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Ks(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Sp(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let i=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&i.push(`repair ${n.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:o,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Ap(e,t,r,n,s=null,o=null,i=null,l=!1,a=null,d=!0,p=null,f=null,h=null){let A=!!a&&a.position>0,$=!!a&&a.active===!0,y=a&&a.failure||null,D=r[e]||null,F=D&&D.gate?D.gate:null,Q=D&&D.pr?D.pr:null,Z=Sp(h),P=[];l&&P.push("\uC138\uC158");let R=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,T=kp(l&&F&&F.tier==="closed_unmerged"?"\uB2EB\uD798":F&&F.gate_badge||"",R?null:o&&o.activity||null);R&&P.push(R),T.label&&P.push(T.label),F&&F.base_badge&&F.base_badge!==F.gate_badge&&P.push(F.base_badge),f&&P.push(f),n&&P.push("\uC815\uB9AC \uC2E4\uD328"),Z&&P.push(Z.badge),A&&!$&&P.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),y&&P.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Ja(y)}`),p&&P.push(`\uC790\uB3D9 \uC81C\uC678: ${Ja(p)}`);let C=!!F&&F.base_badge==="\uCDA9\uB3CC",U=!!F&&F.enabled===!0,ue=$p(o&&o.merge_progress?o.merge_progress.step:null),$e=!!n&&!!F&&F.tier==="merged",_e=l&&!!F&&F.tier==="merged",pe=l&&C&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:Q&&typeof Q.number=="number"?Q.number:null,pr_url:Q&&typeof Q.url=="string"?Q.url:"",completion_badge:Z?Z.badge:null,completion_title:Z?Z.title:"",completion_repair_pr_url:Z?Z.repair_pr_url:"",completion_repair_pr_number:Z?Z.repair_pr_number:null,badges:P,live_badge:i==="running"?R:R?null:T.live?T.label:null,usage:s,alert:!!F&&vp.includes(F.tier)||!!n||!!y||!!(Z&&Z.alert),merge_action:!A,cancel_action:A,cancel_enabled:!$&&!(Z&&Z.lock_actions),cancel_title:Z&&Z.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":$?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(F&&F.tier==="merged"),merge_step:ue,discard_enabled:!ue&&!i&&!A&&!(Z&&Z.lock_actions),discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":A?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!ue&&!i&&!(Z&&Z.lock_actions)&&!pe&&(U||C||$e||_e),merge_label:_e?"\uC815\uB9AC":C&&!ue&&!$e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ue?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ue.label}`:_e?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":$e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":U?`\uBA38\uC9C0 (${F.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:F&&F.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${F&&F.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Zs(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:i,uiOrderStore:l,gotoIssue:a,getWorkspacePath:d}=t,p=n?mn(n,l):null,f=hn({transport:r,uiOrderStore:l}),h=null,A=[],$=np(),y=lp(),D=dp();function F(){let u=qt.find(_=>_.value===D);return u?u.label:"\uC624\uB298"}let Q=fp(),Z=!1,P=new Set,R=new Set,T=new Set,C=[],U=document.createElement("div");U.className="worker-console";let ue=document.createElement("div");ue.className="worker-top";let $e=document.createElement("div");$e.className="worker-drawer-overlay",$e.hidden=!0;let _e=document.createElement("div");_e.className="worker-drawer-overlay__backdrop";let pe=document.createElement("div");pe.className="worker-drawer-host",$e.append(_e,pe);let Ee=document.createElement("div");Ee.className="worker-lanes-host",U.append(ue,$e,Ee),e.appendChild(U);let je=null,Ze=Nn(pe,{transport:r,sessionLogStore:i,onClose:()=>{je=null,$e.hidden=!0,Pe()}}),He=Un(U,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:d});function xe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:nn,queue:[],pr_wait:[],done:[]}}function L(){let u=xe();return typeof u.revision=="number"?u.revision:0}function H(u){u&&u.queue&&s&&s.set(u.queue)}function me(){let u=xe().queue;return Array.isArray(u)?u.length:0}async function se(u,_){if(!r)return;let x=await r("worker-queue-place",{bead_id:u,index:_,expected_revision:L()});H(x),x&&x.conflict&&await r("worker-queue-place",{bead_id:u,index:_,expected_revision:L()}).then(H)}async function we(u,_){if(!r)return;let x=await r("worker-queue-reorder",{bead_id:u,to_index:_,expected_revision:L()});H(x),x&&x.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:_,expected_revision:L()}).then(H)}async function ge(u){if(!r)return;let _=await r("worker-queue-remove",{bead_id:u,expected_revision:L()});H(_),_&&_.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:L()}).then(H)}async function Be(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function he(u){if(!r||!u)return;let _=await r("worker-attempt-pause",{attempt_id:u});_&&_.paused===!1&&_.reason&&ne(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Ce(u){if(!r||!u)return;let _=await r("worker-attempt-resume",{attempt_id:u,expected_revision:L()});H(_),_&&_.conflict&&(_=await r("worker-attempt-resume",{attempt_id:u,expected_revision:L()}),H(_)),_&&_.resumed===!1&&!_.conflict&&_.reason&&ne(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function B(u){if(!r||!u)return;let _=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:L()});H(_),_&&_.conflict&&(_=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:L()}),H(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&ne(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function O(u){if(!r||!u||T.has(u))return;T.add(u),Pe();let _;try{_=await r("worker-cleanup-diagnose",{bead_id:u,expected_revision:L()}),H(_),_&&_.conflict&&(_=await r("worker-cleanup-diagnose",{bead_id:u,expected_revision:L()}),H(_))}finally{T.delete(u),Pe()}_&&!_.conflict&&_.ok===!1&&_.reason&&ne(`AI \uC815\uB9AC \uAC70\uBD80: ${_.reason}`,"error",2400)}async function re(u,_){if(!r)return null;let x=r,K=await x(u,{..._,expected_revision:L()});return H(K),K&&K.conflict&&(K=await x(u,{..._,expected_revision:L()}),H(K)),K}async function Se(u){if(!r||!u)return;P.add(u),Pe();let _;try{_=await re("worker-merge-queue-add",{bead_id:u})}finally{P.delete(u),Pe()}!_||_.conflict||_.applied||ne("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Ie(u){if(!r)return;let _=await re("worker-merge-auto-toggle",{on:u});!_||_.conflict||ne(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function q(u){if(!r||!u)return;let _=await re("worker-merge-queue-remove",{bead_id:u});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&ne("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function z(){await re("worker-merge-queue-remove",{all:!0})}async function M(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let x=await r("worker-pr-discard",{bead_id:u,expected_revision:L()});if(H(x),x&&x.conflict&&(x=await r("worker-pr-discard",{bead_id:u,expected_revision:L()}),H(x)),x&&x.discarded===!0){ne("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}x&&x.discarded===!1&&!x.conflict&&ne(`\uD3D0\uAE30 \uAC70\uBD80: ${x.reason||""}`,"error",2800)}async function oe(u,_){if(!r||!_||R.has(_))return;R.add(_),Pe();let x;try{x=await r(u,{bead_id:_,expected_revision:L()}),H(x),x&&x.conflict&&(x=await r(u,{bead_id:_,expected_revision:L()}),H(x))}finally{R.delete(_),Pe()}if(!(!x||x.conflict)){if(x.ok){ne(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ne(`\uCC98\uBD84 \uAC70\uBD80: ${x.reason||""}`,"error",3e3)}}async function ae(u){if(!r)return;let _=await r("worker-queue-toggle",{on:u,expected_revision:L()});H(_),_&&_.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:L()}).then(H)}async function w(u){if(!r||!Number.isFinite(u))return;let _=Math.max(nn,Math.floor(u)),x=await r("worker-queue-set-slots",{slots:_,expected_revision:L()});H(x),x&&x.conflict&&await r("worker-queue-set-slots",{slots:_,expected_revision:L()}).then(H)}async function Y(u){if(!r)return;let _=await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:L()});H(_),_&&_.conflict&&await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:L()}).then(H)}function G(){let u=xe(),_=p?p.selectBoardColumn(Ju,"ready"):[],x=p?p.selectBoardColumn(ep,"blocked"):[],K=p?p.selectBoardColumn(tp,"in_progress"):[],ce=new Map;for(let k of K){let j=hp(k);if(!j)continue;let de=ce.get(j);de?de.push(k):ce.set(j,[k])}let ve=k=>{let j=gn(ce.get(k)||[]);return j?j.title||j.id:null},ye=u.bead_titles||{},be=new Map;for(let[k,j]of Object.entries(ye))typeof j=="string"&&j.length>0&&be.set(k,j);for(let k of[..._,...x])be.set(k.id,k.title||k.id);let le=u.bead_times||{},De=new Map;for(let[k,j]of Object.entries(le))j&&typeof j=="object"&&De.set(k,j);for(let k of[..._,...x])De.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let Qe=k=>De.get(k)||{},Ae=u.pr_wait||[],ct=u.pr_observations||{},Et=u.pr_activity||{},vt=u.deployment_reconcile||u.reconcile||{},rt=u.cleanup_failed||{},ke=Object.entries(rt).map(([k,j])=>({bead_id:k,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",detail:vt[k]?.adapter==="managed"&&(j?.detail==="checkout_dirty"||j?.detail==="checkout_not_on_base"||j?.detail==="head_not_base_sha")?null:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0,diagnosis:j&&j.diagnosis&&typeof j.diagnosis=="object"&&typeof j.diagnosis.verdict=="string"&&typeof j.diagnosis.evidence=="string"?{verdict:j.diagnosis.verdict,evidence:j.diagnosis.evidence,fix_bead_id:typeof j.diagnosis.fix_bead_id=="string"?j.diagnosis.fix_bead_id:null,malformed:j.diagnosis.malformed===!0}:null,diagnosis_pending:T.has(k)||rp(u.attempts,k)})),Ue=u.queue||[],Ft=new Set([...Ue.map(k=>k.bead_id),...Ae.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),Ut=new Set(x.map(k=>k.id)),Kt=l?l.get()?.order||{}:{},ie=new Set,b=[];for(let k of[..._,...x])Ft.has(k.id)||ie.has(k.id)||gp(k)||Za(k.labels)||(ie.add(k.id),b.push(k));A=mp(b,y,Kt);let W=u.admission||{},m=k=>{let j=W[k];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let de=typeof j.reason=="string"?j.reason:"",Ge=de.indexOf(":");return Ge>0&&Ge<de.length-1?`\u26D4 ${de.slice(0,Ge)} (${de.slice(Ge+1)})`:`\u26D4 ${de}`},v=A.map(k=>{let j=Xr(k),de=j.path.length>0,Ge=k.workflow?.route==="quick_fix"||k.metadata&&k.metadata.route==="quick_fix",$l=!Ge&&de&&!j.conflict,mo=Ut.has(k.id),gr=[];mo&&gr.push(bp(k)),Ge?gr.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):j.conflict?gr.push("spec_id_conflict"):de||gr.push("spec \uC5C6\uC74C");let go=m(k.id);return go&&gr.push(go),{id:k.id,title:k.title||k.id,reason:gr.join(" \xB7 "),draggable:$l,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,is_quick_fix:Ge,status:k.status,blocked:mo,has_spec:de}}),J=op(v,$),te=J.visible,X=u.revise_parked||{},g=(k,j)=>k.map(de=>{let Ge=j==="queue"?X[de.bead_id]:null;return{id:de.bead_id,title:be.get(de.bead_id)||de.bead_id,reason:j==="done"?"":m(de.bead_id),draggable:j!=="done",done:j==="done",lane:j,badges:Ge?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ge,revise_action:!!Ge,revise_enabled:!!Ge&&!R.has(de.bead_id),revise_title:Ge?Ge.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ge.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?Rt(u.attempts||{},de.bead_id):null,done_at:j==="done"&&typeof de.added_at=="number"?de.added_at:void 0,...Qe(de.bead_id)}}),I=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&I.set(k.bead_id,k.added_at);let S=u.attempts?Object.values(u.attempts):[],V=new Set;for(let k of S)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&V.add(k.resumed_from);let Me=new Map;for(let k of S)Me.set(k.bead_id,k.attempt_id);let nt=new Map;for(let k of S)nt.set(k.attempt_id,k);function _t(k){let j=new Set,de=k;for(;de&&!j.has(de.attempt_id);){if(de.conflict_resolution===!0)return!0;j.add(de.attempt_id),de=typeof de.resumed_from=="string"&&de.resumed_from.length>0&&nt.get(de.resumed_from)||null}return!1}let Le=typeof u.declared_base=="string"?u.declared_base:null;function Zt(k){let j=null;for(let de of S)!de||de.bead_id!==k||_t(de)||(j===null||(typeof de.started_at=="number"?de.started_at:0)>=(typeof j.started_at=="number"?j.started_at:0))&&(j=de);return j&&typeof j.target_base=="string"?j.target_base:null}let on=[],eo=[],ml=k=>{let j=Me.get(k.bead_id)!==k.attempt_id,de=I.get(k.bead_id),Ge=typeof de=="number"&&de>0&&typeof k.finished_at=="number"&&de>=k.finished_at;return!j&&!Ge&&typeof k.dismissed_at!="number"},to=k=>{let j=typeof k.session_id=="string"&&k.session_id.length>0,de=V.has(k.attempt_id);return{eligible:j&&!de,reason:j?de?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Xt=null;for(let k of S){let j=k.status==="paused"&&!V.has(k.attempt_id);if(k.status==="running"||j)eo.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:be.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:j,conflict_resolution:_t(k),base_exception:Ks(Le,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:Rt(u.attempts||{},k.bead_id),current_child:ve(k.bead_id),...Qe(k.bead_id)});else if((k.status==="failed"||k.status==="orphaned")&&ml(k)){let de=to(k);on.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:be.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,failed:!0,status:k.status,status_label:k.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",resume_eligible:de.eligible,resume_reason:de.reason,conflict_resolution:_t(k),base_exception:Ks(Le,k.target_base),usage:Rt(u.attempts||{},k.bead_id),current_child:ve(k.bead_id),...Qe(k.bead_id)}),Xt=k}}let an=[...on,...eo],ro=null;if(Xt){let k=to(Xt),j=Xt.cause_detail;ro={repo:Xt.repo||"",reason:Xt.cause||Xt.status,cause_detail:j&&typeof j.reason=="string"?{reason:j.reason,command:typeof j.command=="string"?j.command:null}:null,resume_attempt_id:Xt.attempt_id,resume_eligible:k.eligible,resume_reason:k.reason}}let gl=new Set(an.map(k=>k.bead_id)),Wn=Array.isArray(u.merge_queue)?u.merge_queue:[],no=new Map;Wn.forEach((k,j)=>{k&&typeof k.bead_id=="string"&&no.set(k.bead_id,j+1)});let so=u.merge_queue_state||{active:null,failures:{}},hl=so.failures||{},bl=u.auto_merge_skips||{},oo=k=>{let j=bl[k];if(!j)return null;let de=ct[k],Ge=de&&de.pr?de.pr.head_sha:null;return Ge&&Ge===j.head_sha?j.reason||"":null},ln=new Map;for(let k of an)k.failed!==!0&&k.conflict_resolution&&(k.paused?ln.has(k.bead_id)||ln.set(k.bead_id,"paused"):ln.set(k.bead_id,"running"));let io=an.filter(k=>!k.paused&&k.failed!==!0).length,ao=(u.workspace_info||{}).slots,vl=typeof ao=="number"?ao:typeof u.slots=="number"?u.slots:nn,lo=u.pr_wait_holds_slot===!0?nn:vl,yl=io>lo,co=vr(D),kl=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>co===void 0||typeof k.added_at!="number"||k.added_at>=co).sort((k,j)=>(j.added_at||0)-(k.added_at||0)),Gn=g(kl,"done"),cn={};for(let k of Ht)cn[k]=0;let uo=!1,po=0,Yn=0,fo=0;for(let k of Gn){let j=k.usage;if(j&&typeof j=="object"){let de=!1;for(let Ge of Ht)Number.isFinite(j[Ge])&&(cn[Ge]+=j[Ge],uo=!0,de=!0);de&&(Yn+=1,Number.isFinite(j.total_cost_usd)&&(po+=j.total_cost_usd,fo+=1))}}Yn>0&&fo===Yn&&(cn.total_cost_usd=po);let _o=Gn.map(k=>k.usage).filter(k=>k&&typeof k=="object"&&k.providers),wl=_o.length>0?mt($n(_o)):uo?Ot(cn):null;return{queue:u,idToTitle:be,candidates:te,candidate_hidden:{blocked:J.hidden_blocked,spec:J.hidden_spec},running:an,live_count:io,slots:lo,over_cap:yl,failure:ro,waiting:g(Ue.filter(k=>!gl.has(k.bead_id)),"queue"),pr_wait:Ae.map(k=>Ap(k.bead_id,be.get(k.bead_id)||k.bead_id,ct,rt[k.bead_id]||null,Rt(u.attempts||{},k.bead_id),xp(vt[k.bead_id])||Et[k.bead_id]||(P.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ln.get(k.bead_id)||null,k.external===!0,{position:no.get(k.bead_id)||0,active:so.active===k.bead_id,failure:hl[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?oo(k.bead_id):null,Ks(Le,Zt(k.bead_id)),u.completion_status&&typeof u.completion_status=="object"&&!Array.isArray(u.completion_status)&&u.completion_status[k.bead_id]||null)).map(k=>({...k,...Qe(k.id)})),merge_queue_length:Wn.length,merge_queue_running:Wn.length>0,auto_excluded:Ae.map(k=>k.bead_id).filter(k=>oo(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:Le,done:Gn,token_total:wl,cleanup_failures:ke}}function ee(u){let _=u.waiting.length>0?u.waiting[0].id:"\u2014",x=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,K=ut(u),ce=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ve=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${F()} 완료 <b>${u.done.length}</b></span
      >`,ye=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,be=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${nn}
          step="1"
          .value=${String(u.slots)}
          ?disabled=${u.queue.pr_wait_holds_slot===!0}
          title=${u.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${u.queue.pr_wait_holds_slot===!0}
        />
        머지까지 순차 실행
      </label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,le=Sa({failure:u.failure,cleanupFailures:u.cleanup_failures});return Z?c`<div class="worker-ribbon">
          ${x} ${K}
          <div class="worker-kpi worker-kpi--ribbon">${ce}${ve}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${be}</div>
          <div class="worker-kpi">${ye}</div>
        </div>
        ${le}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${x}${K}${be}</div>
        <div class="worker-kpi">
          ${ce}${ve}${ye}
          ${(Array.isArray(u.token_total)?u.token_total:u.token_total?[{label:u.token_total,tooltip:`${F()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(De=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${De.tooltip}
                >${F()} 완료 · 누적 ${De.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${le}`}function fe(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let _=u.running.some(x=>!x.paused&&x.failed!==!0);return c`<section
      class="worker-now${_?" worker-pane--live":""}"
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
      ${u.running.length>0?Us(u.running,Date.now(),je):""}
      ${u.pr_wait.map(x=>qs(x))}
    </section>`}function Te(u){let _=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ip.map(x=>c`<button
              type="button"
              class="worker-filter__chip${$.spec===x.value?" is-active":""}"
              data-spec=${x.value}
              aria-pressed=${$.spec===x.value?"true":"false"}
            >
              ${x.label}
            </button>`)}
        ${_.spec>0?c`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function Ne(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${y}
    >
      ${ap.map(u=>c`<option value=${u.value} ?selected=${y===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function Ye(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${D}
      >
        ${qt.map(u=>c`<option value=${u.value} ?selected=${D===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function Xe(u){let _=(u.queue.pr_wait||[]).filter(K=>K&&K.external!==!0&&typeof K.bead_id=="string"),x=new Set(u.running.filter(K=>!K.paused&&K.failed!==!0).map(K=>K.bead_id));for(let K of _)x.add(K.bead_id);if(!(u.queue.pr_wait_holds_slot!==!0||u.queue.auto_advance!==!0||u.queue.auto_merge===!0||_.length===0||u.waiting.length===0||x.size<u.slots))return c`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`}function ut(u){let _=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${_?" is-active":""}"
        title=${_?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${_?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(_)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let x=new Set(u.auto_excluded),K=u.pr_wait.filter(ce=>ce.merge_action&&ce.merge_enabled&&!x.has(ce.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${K>0?` ${K}`:""}
    </button>`}function it(u){let _=Bt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ne(),controls:Te(u)});return Z?c`<div class="worker-lanes worker-lanes--mobile">
        ${fe(u)}
        ${Bt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:Xe(u),collapsible:!0,collapsed:Q.queue,preview:Qa(u.waiting)})}
        ${_}
        ${Bt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${F()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ye(),collapsible:!0,collapsed:Q.done,preview:Array.isArray(u.token_total)?u.token_total.map(x=>x.label).join(" \xB7 "):u.token_total||Qa(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${_}
      ${Bt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:Xe(u)})}
      ${Bt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(x=>!x.paused&&x.failed!==!0),body:Us(u.running,Date.now(),je)})}
      ${Bt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Bt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${F()} ${u.done.length}`,items:u.done,empty:`${F()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ye()})}
    </div>`}function gt(u){Q={...Q,[u]:!Q[u]},_p(Q),Pe()}function Pe(){let u=G();Oe(ee(u),ue),Oe(it(u),Ee)}function pt(){let u=document.querySelector(".app-header");if(!u)return;let _=()=>{let x=Math.round(u.getBoundingClientRect().height);U.style.setProperty("--worker-ribbon-top",`${x}px`)};if(_(),typeof ResizeObserver=="function"){let x=new ResizeObserver(_);x.observe(u),C.push(()=>x.disconnect())}else window.addEventListener("resize",_),C.push(()=>window.removeEventListener("resize",_))}function st(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(pp);Z=!!u.matches;let _=x=>{let K=!!(x&&typeof x.matches=="boolean"?x.matches:u.matches);K!==Z&&(Z=K,Pe())};typeof u.addEventListener=="function"?(u.addEventListener("change",_),C.push(()=>u.removeEventListener("change",_))):typeof u.addListener=="function"&&(u.addListener(_),C.push(()=>u.removeListener(_)))}function We(u){let _=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!_)return;let x=_.dataset.beadId||"",K=_.dataset.lane||"";h={bead_id:x,from_lane:K};try{u.dataTransfer?.setData("text/plain",x),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function ht(u){let _=u.target?.closest?.(".worker-pane");if(!_)return;let x=_.dataset.lane||"";x!=="candidate"&&x!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function at(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ot(u,_){let x=A.find(ye=>ye.id===u);if(!x)return;let K=A.filter(ye=>ye.id!==u),ce=K.length;if(_){let ye=_.dataset.beadId;if(ye===u)return;let be=K.findIndex(le=>le.id===ye);be>=0&&(ce=be)}let ve=K.slice();ve.splice(ce,0,x),f.applyReorder(u,ve,ce)}function tt(u){let _=u.target?.closest?.(".worker-pane");if(!_)return;u.preventDefault(),_.classList.remove("worker-pane--drag-over");let x=_.dataset.lane||"",K=h?.bead_id||u.dataTransfer?.getData("text/plain")||"",ce=h?.from_lane||"";if(h=null,!K)return;let ve=u.target?.closest?.(".worker-mini, .worker-card"),ye=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),be=ye.length;if(ve){let le=ye.indexOf(ve);le>=0&&(be=le)}if(_.classList.contains("worker-pane--collapsed")&&(be=me()),x==="candidate"){if(ce==="candidate"){ot(K,ve);return}ce==="queue"&&ge(K);return}x==="queue"&&(ce==="queue"?we(K,be):se(K,be))}function bt(u){$=u,sp(u),Pe()}function Je(u){y=u==="board"||u==="created"||u==="spec"?u:Hn,cp(y),Pe()}function kt(u){D=zt(u)?u:Ct,up(D),Pe()}function Ve(u){let _=u.target?.closest?.(".worker-filter__blocked");if(_){bt({...$,show_blocked:_.checked});return}let x=u.target?.closest?.(".worker-done-range");if(x){kt(x.value);return}let K=u.target?.closest?.(".worker-sort");if(K){Je(K.value||Hn);return}let ce=u.target?.closest?.(".worker-pr-wait-hold");if(ce){Y(ce.checked);return}let ve=u.target?.closest?.(".worker-slots__input");if(!ve)return;let ye=Number.parseInt(ve.value,10);if(!Number.isFinite(ye)){Pe();return}w(ye).then(Pe)}function lt(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function ft(u){let _=xe(),x=_.attempts?_.attempts[u]:null;je=u,$e.hidden=!1,Ze.open({attempt_id:u,meta:lt(x)}),Pe()}function E(){if(!je)return;let u=xe(),_=u.attempts?u.attempts[je]:null;if(_){Ze.updateMeta(lt(_));return}Ze.close()}function N(u){let _=u.target;if(_?.closest?.("#worker-exec-defaults-dialog"))return;if(_?.closest?.(".worker-exec-defaults-btn")){He.open();return}let x=_?.closest?.(".worker-banner__resume");if(x){let ke=x.dataset.attemptId;ke&&Ce(ke);return}let K=_?.closest?.(".worker-banner__dismiss");if(K){let ke=K.dataset.attemptId;ke&&B(ke);return}let ce=_?.closest?.(".worker-banner__cleanup-diagnose");if(ce){let ke=ce.dataset.beadId;ke&&O(ke);return}if(_?.closest?.(".worker-play")){ae(!xe().auto_advance);return}let ve=_?.closest?.(".worker-merge-all");if(ve){ve.classList.contains("worker-merge-all--stop")?xe().auto_merge===!0?Ie(!1):z():Ie(!0);return}let ye=_?.closest?.(".worker-pane__hd--toggle");if(ye){let ke=ye.dataset.lane;(ke==="queue"||ke==="done")&&gt(ke);return}let be=_?.closest?.(".worker-card__place");if(be){let ke=be.dataset.beadId;ke&&!be.disabled&&se(ke,me());return}let le=_?.closest?.(".worker-filter__chip");if(le){let ke=le.dataset.spec;(ke==="all"||ke==="with"||ke==="without")&&bt({...$,spec:ke});return}let De=_?.closest?.(".worker-mini__merge");if(De){Se(De.dataset.beadId||"");return}let Qe=_?.closest?.(".worker-mini__merge-cancel");if(Qe){q(Qe.dataset.beadId||"");return}let Ae=_?.closest?.(".worker-mini__discard");if(Ae){M(Ae.dataset.beadId||"");return}let ct=_?.closest?.(".worker-mini__revise-fix");if(ct){oe("worker-revise-fix",ct.dataset.beadId||"");return}let Et=_?.closest?.(".worker-mini__revise-approve");if(Et){oe("worker-revise-approve",Et.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__stop")){let Ue=_?.closest?.(".rtile")?.dataset?.attemptId;Ue&&Be(Ue);return}if(_?.closest?.(".rtile__dismiss")){let Ue=_?.closest?.(".rtile")?.dataset?.attemptId;Ue&&B(Ue);return}if(_?.closest?.(".rtile__pause")){let Ue=_?.closest?.(".rtile")?.dataset?.attemptId;Ue&&he(Ue);return}if(_?.closest?.(".rtile__resume")){let Ue=_?.closest?.(".rtile")?.dataset?.attemptId;Ue&&Ce(Ue);return}if(_?.closest?.(".rtile__session")){let Ue=_?.closest?.(".rtile")?.dataset?.attemptId;Ue&&ft(Ue);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){Ze.close();return}if(_?.closest?.(".worker-drawer-host"))return;let vt=_?.closest?.(".rtile");if(vt){if(_?.closest?.(".rtile__id")){let Ue=vt.dataset.beadId;Ue&&pr(Ue).then(Ft=>{Ft?ne("\uBCF5\uC0AC\uB428","success",1200):ne("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ke=vt.dataset.beadId;ke&&a&&a(ke);return}let rt=_?.closest?.(".worker-mini, .worker-card");if(rt){let ke=rt.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){ke&&pr(ke).then(Ue=>{Ue?ne("\uBCF5\uC0AC\uB428","success",1200):ne("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ke&&a&&a(ke)}}return e.addEventListener("dragstart",We),e.addEventListener("dragover",ht),e.addEventListener("dragleave",at),e.addEventListener("drop",tt),e.addEventListener("click",N),e.addEventListener("change",Ve),st(),pt(),p&&C.push(p.subscribe(Pe)),s&&C.push(s.subscribe(()=>{Pe(),E()})),Pe(),{load(){Pe()},openExecDefaults(){He.open()},destroy(){for(let u of C.splice(0))try{u()}catch{}e.removeEventListener("dragstart",We),e.removeEventListener("dragover",ht),e.removeEventListener("dragleave",at),e.removeEventListener("drop",tt),e.removeEventListener("click",N),e.removeEventListener("change",Ve);try{Ze.destroy()}catch{}$e.hidden=!0;try{He.destroy()}catch{}Oe(c``,e)}}}function Xs(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function sl(e,t,r,n=async()=>{},s=async()=>{}){let o=Ke("views:workspace-picker"),i=null,l=!1,a=!1,d=!1;async function p(T){let U=T.target.value,$e=t.getState().workspace?.current?.path||"";if(U&&U!==$e){o("switching workspace to %s",U),l=!0,R();try{await r(U)}catch(_e){o("workspace switch failed: %o",_e)}finally{l=!1,R()}}}async function f(){let T=t.getState(),C=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!C||a)){o("git-pulling workspace %s",C),a=!0,R();try{await n(C)}catch(U){o("workspace git pull failed: %o",U)}finally{a=!1,R()}}}function h(T){let C=T.target;C&&e.contains(C)||y()}function A(T){T.key==="Escape"&&y()}function $(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",A),R())}function y(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",A),R())}function D(){d?y():$()}async function F(T){let C=T.target,U=C.value,ue=C.checked;o("toggling visibility %s \u2192 %s",U,String(ue));try{await s(U,ue)}catch($e){o("workspace visibility toggle failed: %o",$e)}}function Q(T){return T?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function Z(T,C){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${D}
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
                ${T.map(U=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${U.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${U.path}"
                        .checked=${!C.has(U.path)}
                        @change=${F}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Xs(U.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let T=t.getState(),C=T.workspace?.current,U=T.workspace?.available||[],ue=new Set(T.workspace?.hidden||[]),$e=C?.path||U[0]?.path||"";if(U.length===0)return c``;let _e=U.filter(pe=>!ue.has(pe.path)||pe.path===$e);if(_e.length<=1){let pe=_e[0]||U[0],Ee=Xs(pe.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${pe.path}"
            >${Ee}</span
          >
          ${Z(U,ue)}
          ${Q($e)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${_e.map(pe=>c`
              <option
                value="${pe.path}"
                ?selected=${pe.path===$e}
                title="${pe.path}"
              >
                ${Xs(pe.path)}
              </option>
            `)}
        </select>
        ${Z(U,ue)}
        ${Q($e)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){Oe(P(),e)}return R(),i=t.subscribe(()=>R()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",A),Oe(c``,e)}}}var ol=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Qs(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function il(e,t,r=Qs()){return{id:r,type:e,payload:t}}function al(e={}){let t=Ke("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,d=new Map,p=[],f=new Map,h=new Set;function A(P){for(let R of Array.from(h))try{R(P)}catch{}}function $(){if(!a||l)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let P=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),R=(r.jitterRatio||0)*P,T=Math.max(0,Math.round(P+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",T,i+1),l=setTimeout(()=>{l=null,Z()},T)}function y(P){try{s?.send(JSON.stringify(P))}catch(R){t("ws send failed",R)}}function D(){for(o="open",t("ws open"),A(o),i=0;p.length;){let P=p.shift();P&&y(P)}}function F(P){let R;try{R=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(d.has(R.id)){let C=d.get(R.id);d.delete(R.id),R.ok?C?.resolve(R.payload):C?.reject(R.error||new Error("ws error"));return}let T=f.get(R.type);if(T&&T.size>0)for(let C of Array.from(T))try{C(R.payload)}catch(U){t("ws event handler error",U)}else t("ws received unhandled message type: %s",R.type)}function Q(){o="closed",t("ws closed"),A(o);for(let[P,R]of d.entries())R.reject(new Error("ws disconnected")),d.delete(P);i+=1,$()}function Z(){if(!a)return;let P=n();try{s=new WebSocket(P),t("ws connecting %s",P),o="connecting",A(o),s.addEventListener("open",D),s.addEventListener("message",F),s.addEventListener("error",()=>{}),s.addEventListener("close",Q)}catch(R){t("ws connect failed %o",R),$()}}return Z(),{send(P,R){if(!ol.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let T=Qs(),C=il(P,R,T);return t("send %s id=%s",P,T),new Promise((U,ue)=>{d.set(T,{resolve:U,reject:ue,type:P}),s&&s.readyState===s.OPEN?y(C):(t("queue %s id=%s (state=%s)",P,T,o),p.push(C))})},on(P,R){f.has(P)||f.set(P,new Set);let T=f.get(P);return T?.add(R),()=>{T?.delete(R)}},onConnection(P){return h.add(P),()=>{h.delete(P)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,Z()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Tp(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ep(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Js=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ll=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],cl=Ba,dl="worker:queue",ul="ui:order",pl="ui:display-policy",fl="exec:presets",or="tab:board:closed",_l="beads-ui.board.closed-range";function Cp(e){let t=Ke("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Oe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),i=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),a=document.getElementById("detail-panel");if(s&&Ka(s),o&&i&&l&&a){let xe=function(m,v){let J="Request failed",te="";if(m&&typeof m=="object"){let g=m;if(typeof g.message=="string"&&g.message.length>0&&(J=g.message),typeof g.details=="string")te=g.details;else if(g.details&&typeof g.details=="object")try{te=JSON.stringify(g.details,null,2)}catch{te=""}}else typeof m=="string"&&m.length>0&&(J=m);let X=v&&v.length>0?`Failed to load ${v}`:"Request failed";He.open(X,J,te)},ae=function(m){return`${Ae.getState().workspace.current?.path||""}\0${m}`},w=function(){O&&(O().catch(()=>{}),O=null),re=null,Se=null},G=function(m){Ie=m;let v=()=>{Ie!==m||Ae.getState().selected_id!==m||(Ie=null,Y(m))};if(!M){z.then(v);return}v()},Ne=function(m,v,J,te,X){return J!==Te[v]?(X().catch(()=>{}),!1):(m.set(te,X),!0)},Ye=function(){let m=Ae.getState();it(m.view==="board"),We(m.view==="worker"),bt(m.view==="monitor"),at(m.view==="board"||m.view==="worker"||!!m.selected_id)},ut=function(){let m=vr(Xe);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},it=function(m){if(m)for(let[v,J]of Js){if(ee.has(v)||fe.has(v))continue;let te=v===or?ut():{type:J};try{se.register(v,te)}catch(I){t("register %s store failed: %o",v,I)}fe.add(v);let X=Te.board,g=!1;me.subscribeList(v,te).then(I=>{g=!Ne(ee,"board",X,v,I)}).catch(I=>{t("subscribe %s failed: %o",v,I),xe(I,"board")}).finally(()=>{fe.delete(v),g&&Ye()})}else Pe()},Pe=function(){Te.board+=1;for(let[m]of Js){let v=ee.get(m);v&&(v().catch(()=>{}),ee.delete(m));try{se.unregister(m)}catch(J){t("unregister %s failed: %o",m,J)}}},We=function(m){if(!m){ht();return}for(let[v,J]of ll){if(pt.has(v)||fe.has(v))continue;try{se.register(v,{type:J})}catch(g){t("register %s store failed: %o",v,g)}fe.add(v);let te=Te.worker,X=!1;me.subscribeList(v,{type:J}).then(g=>{X=!Ne(pt,"worker",te,v,g)}).catch(g=>{t("subscribe %s failed: %o",v,g),xe(g,"worker")}).finally(()=>{fe.delete(v),X&&Ye()})}},ht=function(){Te.worker+=1;for(let[m]of ll){let v=pt.get(m);v&&(v().catch(()=>{}),pt.delete(m));try{se.unregister(m)}catch(J){t("unregister %s failed: %o",m,J)}}},at=function(m){if(!m){ot();return}st||(H("subscribe-worker-queue",{id:dl}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),st=()=>H("unsubscribe-worker-queue",{id:dl}))},ot=function(){st&&(st().catch(()=>{}),st=null)},bt=function(m){if(!m){Je();return}tt||(H("subscribe-monitor-pipeline",{id:cl}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),tt=()=>H("unsubscribe-monitor-pipeline",{id:cl}))},Je=function(){tt&&(tt().catch(()=>{}),tt=null)},Ve=function(){kt||(H("subscribe-ui-order",{id:ul}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),kt=()=>H("unsubscribe-ui-order",{id:ul}))},lt=function(){kt&&(kt().catch(()=>{}),kt=null),Be.clear()},E=function(){ft||(H("subscribe-display-policy",{id:pl}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),ft=()=>H("unsubscribe-display-policy",{id:pl}))},N=function(){ft&&(ft().catch(()=>{}),ft=null),he.clear()},_=function(){u||(H("subscribe-exec-presets",{id:fl}).catch(m=>{t("subscribe-exec-presets failed: %o",m)}),u=()=>H("unsubscribe-exec-presets",{id:fl}))},be=function(m){if(!m)return"Unknown";let v=m.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var d=xe,p=ae,f=w,h=G,A=Ne,$=Ye,y=ut,D=it,F=Pe,Q=We,Z=ht,P=at,R=ot,T=bt,C=Je,U=Ve,ue=lt,$e=E,_e=N,pe=_,Ee=be;let je=document.getElementById("header-loading"),Ze=Xo(je),He=ya(e),L=al(),H=Ze.wrapSend((m,v)=>L.send(m,v)),me=Ho(H),se=Wo(),we=Yo(),ge=Co(),Be=Go(),he=To(),Ce=Eo(),B=Ro();L.on("exec-presets-snapshot",m=>{let v=m;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&Ce.set({revision:v.revision,presets:v.presets})}),L.on("monitor-pipeline-snapshot",m=>{let v=m;if(!(!v||!Array.isArray(v.workspaces)))try{ge.set(v.workspaces,v.workspaces_state)}catch{}}),L.on("ui-order-snapshot",m=>{let v=m;if(v&&typeof v.revision=="number")try{Be.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),L.on("display-policy-snapshot",m=>{let v=m;if(v&&v.policy&&typeof v.policy=="object")try{he.set(v.policy)}catch{}}),L.on("session-log-snapshot",m=>{let v=m;if(v&&typeof v.attempt_id=="string")try{B.set(v.attempt_id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),L.on("session-log-append",m=>{let v=m;if(v&&typeof v.attempt_id=="string")try{B.append(v.attempt_id,v.event)}catch{}}),L.on("snapshot",m=>{let v=m,J=v&&typeof v.id=="string"?v.id:"",te=J?se.getStore(J):null;if(te&&v&&v.type==="snapshot")try{te.applyPush(v)}catch{}}),L.on("upsert",m=>{let v=m,J=v&&typeof v.id=="string"?v.id:"",te=J?se.getStore(J):null;if(te&&v&&v.type==="upsert")try{te.applyPush(v)}catch{}}),L.on("delete",m=>{let v=m,J=v&&typeof v.id=="string"?v.id:"",te=J?se.getStore(J):null;if(te&&v&&v.type==="delete")try{te.applyPush(v)}catch{}});let O=null,re=null,Se=null,Ie=null,q=()=>{},z=new Promise(m=>{q=()=>m(void 0)}),M=!1,oe=!1;async function Y(m){let v=ae(m);if(v===re||v===Se)return;Se=v;let J=`detail:${m}`,te={type:"issue-detail",params:{id:m}};try{se.register(J,te)}catch(X){t("register detail store failed: %o",X)}try{let X=await me.subscribeList(J,te);if(Ae.getState().selected_id!==m||ae(m)!==v){await X().catch(()=>{});return}O&&await O().catch(()=>{}),O=X,re=v}catch(X){t("detail subscribe failed: %o",X),xe(X,"issue details")}finally{Se===v&&(Se=null)}}let ee=new Map,fe=new Set,Te={board:0,worker:0},Xe=Ct;try{let m=window.localStorage.getItem(_l);zt(m)&&(Xe=m)}catch{}async function gt(m){if(!zt(m)||m===Xe)return;Xe=m;try{window.localStorage.setItem(_l,m)}catch{}let v=ee.get(or);if(!v)return;ee.delete(or),await v().catch(()=>{});let J=ut();try{se.register(or,J)}catch(te){t("register %s store failed: %o",or,te)}try{let te=await me.subscribeList(or,J);ee.set(or,te)}catch(te){t("re-subscribe %s failed: %o",or,te),xe(te,"board")}}let pt=new Map,st=null,tt=null,kt=null,ft=null,u=null;async function x(){ft=null,he.clear(),u=null,Ce.clear(),st=null,tt=null,ee.clear(),pt.clear(),Te.board+=1,Te.worker+=1,_();let m=Ae.getState().workspace.current?.path;if(m)try{await L.send("set-workspace",{path:m})}catch(J){t("workspace restore after reconnect failed: %o",J);return}E();let v=Ae.getState();it(v.view==="board"),We(v.view==="worker"),bt(v.view==="monitor"),at(v.view==="board"||v.view==="worker"||!!v.selected_id)}async function K(){t("clearing all subscriptions for workspace switch"),Pe(),ht(),ot(),we.clear(),lt(),Ve(),N(),E(),w();let m=Ae.getState();if(m.selected_id)try{se.unregister(`detail:${m.selected_id}`)}catch{}let v=Ae.getState();it(v.view==="board"),We(v.view==="worker"),bt(v.view==="monitor"),at(v.view==="board"||v.view==="worker"||!!v.selected_id),v.selected_id&&G(v.selected_id)}async function ce(m){t("requesting workspace switch to %s",m),oe=!0;try{let v=await L.send("set-workspace",{path:m});t("workspace switch result: %o",v),v&&v.workspace&&(Ae.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),v.changed&&(await K(),ne("Switched to "+be(m),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),ne("Failed to switch workspace","error",3e3),v}finally{oe=!1}}async function ve(m){t("requesting workspace git pull for %s",m);try{let v=await L.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let J=v?.status;if(J==="up_to_date"){ne("Already up to date","success",2e3);return}if(J==="stash_pop_conflict"){ne("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ne("Git pulled "+be(m),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let J=v?.code,te=v?.message;if(J==="rebase_conflict"){ne("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(J==="rebase_conflict_abort_failed"){ne("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(J==="busy"){ne("Git pull skipped: another operation is running","warning",3e3);return}let X=te?`: ${te}`:"";throw ne(`Git pull failed${X}`,"error",3e3),v}}async function ye(m,v){t("setting workspace visibility %s \u2192 %s",m,String(v));try{await L.send("set-workspace-visibility",{path:m,visible:v}),await le()}catch(J){t("workspace visibility update failed: %o",J),ne("Failed to update project visibility","error",3e3)}}async function le(){try{let m=await L.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let v=m.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),J=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,te=Array.isArray(m.hidden)?m.hidden.filter(g=>typeof g=="string"):[];Ae.setState({workspace:{current:J,available:v,hidden:te}});let X=window.localStorage.getItem("beads-ui.workspace");X&&(!v.some(I=>I.path===X)||te.includes(X)?window.localStorage.removeItem("beads-ui.workspace"):J&&X!==J.path&&(t("restoring saved workspace preference: %s",X),await ce(X)))}}catch(m){t("failed to load workspaces: %o",m)}}L.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(Ae.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),le(),K())});let De=!1;if(typeof L.onConnection=="function"){let m=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(De=!0,ne("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&De&&(De=!1,ne("Reconnected","success",2200),Ep(Ae,(J,te)=>{t(`${J}: %o`,te)}),x())};L.onConnection(m)}let Qe="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(Qe=m)}catch(m){t("view parse error: %o",m)}let Ae=Zo({config:Tp(),view:Qe});L.on("worker-queue-snapshot",m=>{let v=m;if(!v||!v.queue)return;let J=Ae.getState().workspace.current?.path;if(typeof J=="string"&&J.length>0&&v.root_dir!==J){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{we.set(v.queue)}catch{}});let ct=Vo(Ae);ct.start();let Et=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),vt=async(m,v)=>{try{return await H(m,v)}catch(J){if(Et.has(m))throw J;return[]}};n&&ja(n,Ae,ct);let rt=document.getElementById("workspace-picker");rt&&sl(rt,Ae,ce,ve,ye);let ke=Ga(e,(m,v)=>H(m,v));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>ke.open())}catch{}let Ue=va(e,{policyStore:he,transport:(m,v)=>H(m,v),labelOptions:()=>{let m=new Set;for(let[v]of Js)for(let J of se.snapshotFor(v)||[]){let te=J.labels;if(Array.isArray(te))for(let X of te)typeof X=="string"&&X.length>0&&m.add(X)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>Ue.open())}catch{}let Ft=ii(o,{gotoIssue:m=>ct.gotoIssue(m),issueStores:se,transport:vt,workerQueueStore:we,uiOrderStore:Be,displayPolicyStore:he,closedRange:Xe,onClosedRangeChange:m=>{gt(m)},onNewIssue:()=>ke.open()}),Ut=Zs(i,{transport:vt,issueStores:se,queueStore:we,execPresetStore:Ce,sessionLogStore:B,uiOrderStore:Be,gotoIssue:m=>Ae.setState({selected_id:m}),getWorkspacePath:()=>Ae.getState().workspace.current?.path}),Kt=Ua(l,{transport:vt,pipelineStore:ge,execPresetStore:Ce,gotoIssue:m=>ct.gotoIssue(m),getWorkspacePath:()=>Ae.getState().workspace.current?.path,switchWorkspace:m=>ce(m)}),ie=ha(a,{issueStores:se,transport:vt,queueStore:we,execPresetStore:Ce,sessionLogStore:B,getWorkspacePath:()=>Ae.getState().workspace.current?.path,onNavigate:m=>{Ae.getState().view==="worker"?Ae.setState({selected_id:m}):ct.gotoIssue(m)},onClose:()=>{let m=Ae.getState();Ae.setState({selected_id:null});try{ct.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{Ae.setState({selected_id:null}),ct.gotoView("worker"),Ut.openExecDefaults()}}),b=Ae.getState().selected_id;b&&(a.hidden=!1,ie.load(b),G(b)),Ae.subscribe(m=>{let v=m.selected_id;v?(a.hidden=!1,ie.load(v),oe||G(v)):(ie.clear(),a.hidden=!0,w())});let W=m=>{o.hidden=m.view!=="board",i.hidden=m.view!=="worker",l.hidden=m.view!=="monitor",it(m.view==="board"),We(m.view==="worker"),bt(m.view==="monitor"),at(m.view==="board"||m.view==="worker"||!!m.selected_id),!m.selected_id&&m.view==="board"&&Ft.load(),m.view==="worker"&&Ut.load(),m.view==="monitor"?Kt.load():Kt.pause(),window.localStorage.setItem("beads-ui.view",m.view)};Ae.subscribe(W),W(Ae.getState()),Ve(),E(),_(),le().finally(()=>{M=!0,q()}),window.addEventListener("keydown",m=>{let v=m.ctrlKey||m.metaKey,J=String(m.key||"").toLowerCase(),te=m.target,X=te&&te.tagName?String(te.tagName).toLowerCase():"",g=X==="input"||X==="textarea"||X==="select"||te&&typeof te.isContentEditable=="boolean"&&te.isContentEditable;v&&J==="n"&&(g||(m.preventDefault(),ke.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Cp(t)});export{Cp as bootstrap,Tp as readBootstrapConfig,Ep as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
