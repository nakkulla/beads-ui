var kl=Object.create;var Vn=Object.defineProperty;var wl=Object.getOwnPropertyDescriptor;var $l=Object.getOwnPropertyNames;var xl=Object.getPrototypeOf,Sl=Object.prototype.hasOwnProperty;var Al=(e,t,r)=>t in e?Vn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Kn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Tl=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of $l(t))!Sl.call(e,s)&&s!==r&&Vn(e,s,{get:()=>t[s],enumerable:!(n=wl(t,s))||n.enumerable});return e};var El=(e,t,r)=>(r=e!=null?kl(xl(e)):{},Tl(t||!e||!e.__esModule?Vn(r,"default",{value:e,enumerable:!0}):r,e));var je=(e,t,r)=>Al(e,typeof t!="symbol"?t+"":t,r);var Ro=Kn((Op,Co)=>{var kr=1e3,wr=kr*60,$r=wr*60,ur=$r*24,Dl=ur*7,Ol=ur*365.25;Co.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Pl(e);if(r==="number"&&isFinite(e))return t.long?Nl(e):Ml(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Pl(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Ol;case"weeks":case"week":case"w":return r*Dl;case"days":case"day":case"d":return r*ur;case"hours":case"hour":case"hrs":case"hr":case"h":return r*$r;case"minutes":case"minute":case"mins":case"min":case"m":return r*wr;case"seconds":case"second":case"secs":case"sec":case"s":return r*kr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ml(e){var t=Math.abs(e);return t>=ur?Math.round(e/ur)+"d":t>=$r?Math.round(e/$r)+"h":t>=wr?Math.round(e/wr)+"m":t>=kr?Math.round(e/kr)+"s":e+"ms"}function Nl(e){var t=Math.abs(e);return t>=ur?dn(e,t,ur,"day"):t>=$r?dn(e,t,$r,"hour"):t>=wr?dn(e,t,wr,"minute"):t>=kr?dn(e,t,kr,"second"):e+" ms"}function dn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Lo=Kn((Pp,Io)=>{function Fl(e){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Ro(),r.destroy=d,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let h=0;h<p.length;h++)f=(f<<5)-f+p.charCodeAt(h),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,h=null,S,$;function y(...D){if(!y.enabled)return;let N=y,X=Number(new Date),K=X-(f||X);N.diff=K,N.prev=f,N.curr=X,f=X,D[0]=r.coerce(D[0]),typeof D[0]!="string"&&D.unshift("%O");let P=0;D[0]=D[0].replace(/%([a-zA-Z%])/g,(A,C)=>{if(A==="%%")return"%";P++;let B=r.formatters[C];if(typeof B=="function"){let de=D[P];A=B.call(N,de),D.splice(P,1),P--}return A}),r.formatArgs.call(N,D),(N.log||r.log).apply(N,D)}return y.namespace=p,y.useColors=r.useColors(),y.color=r.selectColor(p),y.extend=n,y.destroy=r.destroy,Object.defineProperty(y,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(S!==r.namespaces&&(S=r.namespaces,$=r.enabled(p)),$),set:D=>{h=D}}),typeof r.init=="function"&&r.init(y),y}function n(p,f){let h=r(this.namespace+(typeof f>"u"?":":f)+p);return h.log=this.log,h}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(p,f){let h=0,S=0,$=-1,y=0;for(;h<p.length;)if(S<f.length&&(f[S]===p[h]||f[S]==="*"))f[S]==="*"?($=S,y=h,S++):(h++,S++);else if($!==-1)S=$+1,y++,h=y;else return!1;for(;S<f.length&&f[S]==="*";)S++;return S===f.length}function i(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function l(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Io.exports=Fl});var Do=Kn((At,un)=>{At.formatArgs=Bl;At.save=Ul;At.load=jl;At.useColors=ql;At.storage=zl();At.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();At.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ql(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Bl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+un.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}At.log=console.debug||console.log||(()=>{});function Ul(e){try{e?At.storage.setItem("debug",e):At.storage.removeItem("debug")}catch{}}function jl(){let e;try{e=At.storage.getItem("debug")||At.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function zl(){try{return localStorage}catch{}}un.exports=Lo()(At);var{formatters:Hl}=un.exports;Hl.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Dr=globalThis,cn=Dr.trustedTypes,mo=cn?cn.createPolicy("lit-html",{createHTML:e=>e}):void 0,ko="$lit$",Qt=`lit$${Math.random().toFixed(9).slice(2)}$`,wo="?"+Qt,Cl=`<${wo}>`,cr=document,Or=()=>cr.createComment(""),Pr=e=>e===null||typeof e!="object"&&typeof e!="function",rs=Array.isArray,Rl=e=>rs(e)||typeof e?.[Symbol.iterator]=="function",Zn=`[ 	
\f\r]`,Lr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,go=/-->/g,ho=/>/g,ar=RegExp(`>|${Zn}(?:([^\\s"'>=/]+)(${Zn}*=${Zn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bo=/'/g,vo=/"/g,$o=/^(?:script|style|textarea|title)$/i,ns=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=ns(1),zt=ns(2),Tp=ns(3),dr=Symbol.for("lit-noChange"),tt=Symbol.for("lit-nothing"),yo=new WeakMap,lr=cr.createTreeWalker(cr,129);function xo(e,t){if(!rs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return mo!==void 0?mo.createHTML(t):t}var Il=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=Lr;for(let l=0;l<r;l++){let a=e[l],d,p,f=-1,h=0;for(;h<a.length&&(i.lastIndex=h,p=i.exec(a),p!==null);)h=i.lastIndex,i===Lr?p[1]==="!--"?i=go:p[1]!==void 0?i=ho:p[2]!==void 0?($o.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=ar):p[3]!==void 0&&(i=ar):i===ar?p[0]===">"?(i=s??Lr,f=-1):p[1]===void 0?f=-2:(f=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?ar:p[3]==='"'?vo:bo):i===vo||i===bo?i=ar:i===go||i===ho?i=Lr:(i=ar,s=void 0);let S=i===ar&&e[l+1].startsWith("/>")?" ":"";o+=i===Lr?a+Cl:f>=0?(n.push(d),a.slice(0,f)+ko+a.slice(f)+Qt+S):a+Qt+(f===-2?l:S)}return[xo(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Mr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=t.length-1,a=this.parts,[d,p]=Il(t,r);if(this.el=e.createElement(d,n),lr.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=lr.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(ko)){let h=p[i++],S=s.getAttribute(f).split(Qt),$=/([.?@])?(.*)/.exec(h);a.push({type:1,index:o,name:$[2],strings:S,ctor:$[1]==="."?Qn:$[1]==="?"?Jn:$[1]==="@"?es:vr}),s.removeAttribute(f)}else f.startsWith(Qt)&&(a.push({type:6,index:o}),s.removeAttribute(f));if($o.test(s.tagName)){let f=s.textContent.split(Qt),h=f.length-1;if(h>0){s.textContent=cn?cn.emptyScript:"";for(let S=0;S<h;S++)s.append(f[S],Or()),lr.nextNode(),a.push({type:2,index:++o});s.append(f[h],Or())}}}else if(s.nodeType===8)if(s.data===wo)a.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(Qt,f+1))!==-1;)a.push({type:7,index:o}),f+=Qt.length-1}o++}}static createElement(t,r){let n=cr.createElement("template");return n.innerHTML=t,n}};function br(e,t,r=e,n){if(t===dr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Pr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=br(e,s._$AS(e,t.values),s,n)),t}var Xn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??cr).importNode(r,!0);lr.currentNode=s;let o=lr.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Nr(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new ts(o,this,t)),this._$AV.push(d),a=n[++l]}i!==a?.index&&(o=lr.nextNode(),i++)}return lr.currentNode=cr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Nr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=tt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=br(this,t,r),Pr(t)?t===tt||t==null||t===""?(this._$AH!==tt&&this._$AR(),this._$AH=tt):t!==this._$AH&&t!==dr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Rl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==tt&&Pr(this._$AH)?this._$AA.nextSibling.data=t:this.T(cr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Mr.createElement(xo(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Xn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(t){let r=yo.get(t.strings);return r===void 0&&yo.set(t.strings,r=new Mr(t)),r}k(t){rs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Or()),this.O(Or()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},vr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=tt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=tt}_$AI(t,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)t=br(this,t,r,0),i=!Pr(t)||t!==this._$AH&&t!==dr,i&&(this._$AH=t);else{let l=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=br(this,l[n+a],r,a),d===dr&&(d=this._$AH[a]),i||(i=!Pr(d)||d!==this._$AH[a]),d===tt?t=tt:t!==tt&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!s&&this.j(t)}j(t){t===tt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Qn=class extends vr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===tt?void 0:t}},Jn=class extends vr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==tt)}},es=class extends vr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=br(this,t,r,0)??tt)===dr)return;let n=this._$AH,s=t===tt&&n!==tt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==tt&&(n===tt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ts=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){br(this,t)}};var Ll=Dr.litHtmlPolyfillSupport;Ll?.(Mr,Nr),(Dr.litHtmlVersions??(Dr.litHtmlVersions=[])).push("3.3.1");var Pe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Nr(t.insertBefore(Or(),o),o,void 0,r??{})}return s._$AI(e),s};var Rt="today",Ut=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ht(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function yr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function So(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ao(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function To(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Eo(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Oo=El(Do(),1);function Ve(e){return(0,Oo.default)(`beads-ui:${e}`)}function Ot(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function pr(e,t){let r=Ot(e.created_at),n=Ot(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function No(e,t){let r=Ot(e.created_at),n=Ot(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Fo(e,t){let r=Ot(e.updated_at),n=Ot(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function qo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Ot(e.created_at),o=Ot(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Bo(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Wl=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Po(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Mo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Wl.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Uo(e,t){let r=Po(e),n=Po(t);if(r!==n)return r<n?-1:1;let s=Mo(e),o=Mo(t);if(s!==o)return s<o?-1:1;let i=Ot(e&&e.created_at),l=Ot(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,d=t&&t.id;return a===d?0:String(a)<String(d)?-1:1}var ss=2**20;function xr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Ot(e&&e.created_at)}function pn(e){return(t,r)=>{let n=xr(t,e),s=xr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,i=r?.id;return o<i?-1:o>i?1:0}}function os(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:xr(l,r)-ss};if(!l)return{rank:xr(i,r)+ss};let a=xr(i,r),d=xr(l,r),p=(a+d)/2;return a<p&&p<d?{rank:p}:{renormalize:n.map((f,h)=>({bead_id:f.id,rank:h*ss}))}}function is(e,t={}){let r=Ve(`issue-store:${e}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=t.sort||pr;function d(){for(let h of Array.from(i))try{h()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function f(h){if(l||!h||h.id!==e)return;let S=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,S),!(S<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(S<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let y of $)y&&typeof y.id=="string"&&y.id.length>0&&n.set(y.id,y);p(),o=S,d();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let y=n.get($.id);if(!y)n.set($.id,$);else{let D=Number.isFinite(y.updated_at)?y.updated_at:0,N=Number.isFinite($.updated_at)?$.updated_at:0;if(D<=N){for(let X of Object.keys(y))X in $||delete y[X];for(let[X,K]of Object.entries($))y[X]=K}}p()}o=S,d()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),p()),o=S,d()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function fn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function jo(e){let t=Ve("subs"),r=new Map,n=new Map;function s(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let p=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let S of Array.from(d)){let $=r.get(S);if(!$)continue;let y=$.itemsById;for(let D of p)typeof D=="string"&&D.length>0&&y.set(D,!0);for(let D of f)typeof D=="string"&&D.length>0&&y.set(D,!0);for(let D of h)typeof D=="string"&&D.length>0&&y.delete(D)}}async function o(l,a){let d=fn(a);if(t("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let f=r.get(l);if(f&&f.key!==d){let h=n.get(f.key);h&&(h.delete(l),h.size===0&&n.delete(f.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let h=r.get(l)||null;if(h){let S=n.get(h.key);S&&(S.delete(l),S.size===0&&n.delete(h.key))}throw r.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let f=r.get(l)||null;if(f){let h=n.get(f.key);h&&(h.delete(l),h.size===0&&n.delete(f.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:fn,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let p of a.itemsById.keys())d[p]=!0;return d}}}}function zo(){let e=Ve("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,d,p){let f=d?fn(d):"",h=r.get(a)||"",S=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,h),S&&h&&f&&h!==f){let $=t.get(a);if($)try{$.dispose()}catch{}let y=s.get(a);if(y){try{y()}catch{}s.delete(a)}let D=is(a,p);t.set(a,D);let N=D.subscribe(()=>o());s.set(a,N)}else if(!S){let $=is(a,p);t.set(a,$);let y=$.subscribe(()=>o());s.set(a,y)}return r.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),r.delete(a);let d=t.get(a);d&&(d.dispose(),t.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let d=t.get(a);return d?d.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Ho(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Wo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function as(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Gl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Yl(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Go(e){let t=Ve("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Gl(n),i=Yl(n);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=as(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?as(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Vl=Object.freeze({workspace_config:{default_workspace:null}});function Yo(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Vl.workspace_config.default_workspace}}}function Vo(e={}){let t=Ve("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Yo(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Yo(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((d,p)=>d!==r.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!l&&!a||(r=i,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ko(e){let t=Ve("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function i(){r+=1,t("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function a(d){return async(f,h)=>{let S=s++,$=Date.now();n.set(S,{type:f,start_ts:$}),t("request start id=%d type=%s count=%d",S,f,r+1),i();let y=!1,D=()=>{y||(y=!0,n.delete(S),l())},N=setTimeout(()=>{y||(t("request TIMEOUT id=%d type=%s elapsed=%dms",S,f,Date.now()-$),D())},3e4);try{let X=await d(f,h),K=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",S,f,K),X}catch(X){let K=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",S,f,K,X),X}finally{clearTimeout(N),D()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function se(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function _n(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Bo),a;switch(l){case"created_desc":return a.sort(pr),a;case"created_asc":return a.sort(No),a;case"updated_desc":return a.sort(Fo),a;case"priority":return a.sort(qo),a;case"manual":default:{let d=r();return d?a.sort(pn(d)):a.sort(pr),a}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Fr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function bt(e){let t=Fr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ct(e,t){let r=Fr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function mn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Fr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function gn(e){let t=e.transport,r=e.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let d of l)a[d.bead_id]=d.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},p=n(os(l,a,d.order),i);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(h);let S=n(os(l,a,h.order),i);s(h,S);let $=await t("ui-order-set",{expected_revision:h.revision,entries:S});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function hn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ls(e,t){return!t||typeof e!="string"||e.length===0||hn(t.visible_labels).includes(e)?!0:hn(t.hidden_labels).includes(e)?!1:!hn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function bn(e,t){return hn(e).filter(r=>ls(r,t))}function Jt(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Kl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Xo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Zo={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Zl={review:"\u2713",skip:"\u2298"},er={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Xl(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Qo(e){let t=e&&e.fill||"none";return t==="none"?er.none:e&&e.stale===!0?er.stale:t==="dim"?er.dim:e&&e.glyph==="review"?er.review:e&&e.glyph==="skip"?er.skip:er.done}function Ql(e){if(!e||e.fill==="none"||!e.approval_state)return Qo(e);let t=[];return e.glyph==="review"?t.push(er.review):e.glyph==="skip"&&t.push(er.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Jl(e,t,r){let n=Kl[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,i=Zl[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${l} style=${d}>${i}</div>
      <div class=${a}>
        ${Xo[e]||e}
      </div>
    </div>
  `}function vn(e,t){if(!e||!e.stages)return"";let r=Zo[e.route]||Zo.spec_backed,n=e.stages,s=Xl(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(i=>`${Xo[i]||i} ${i==="plan"?Ql(n[i]||{}):Qo(n[i]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(i=>Jl(i,n[i]||{},i===s))}
    </div>
  `}function ec(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Jo=2;function tc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Jo).join(", "),s=r.length-Jo,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function rc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Jt(r,"route")){let i=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&Jt(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Jt(r,"pr")){let i=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}for(let i of bn(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);e.from_id&&Jt(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Jt(r,"blocked")&&s.push(...tc(e.blocked_info));let o=t.cleanupFailureFor?t.cleanupFailureFor(e.id):null;if(o&&Jt(r,"blocked")){let i=t.isCleanupDiagnosisPending?t.isCleanupDiagnosisPending(e.id):!1,l=o.diagnosis&&typeof o.diagnosis=="object"&&!Array.isArray(o.diagnosis)?o.diagnosis:null;if(s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),l){let a=l.malformed===!0||l.verdict==="malformed"?"\uD310\uC815 \uBD88\uAC00":String(l.verdict||"\uD310\uC815 \uBD88\uAC00"),d=typeof l.evidence=="string"?l.evidence.trim().slice(0,96):"",p=typeof l.fix_bead_id=="string"&&l.fix_bead_id.length>0?` \xB7 fix ${l.fix_bead_id}`:"",f=d?` \xB7 ${d}`:"";s.push(c`<span
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
      </button>`)}return s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function nc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function sc(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function oc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Uo):r.children;return c`
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
        ${sc(e)}
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
                  <span class=${nc(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function yn(e,t){let r=ec(e.priority);return c`
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
      ${rc(e,t)}
      ${e.workflow&&Jt(t.policy||null,"stepper")?vn(e.workflow,e.status):""}
      ${oc(e,t)}
    </article>
  `}function Sr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${Ut.map(o=>c`<option
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
        ${e.items.map(o=>yn(o,t))}
      </div>
    </section>
  `}function ei(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>yn(n,t))}
        </div>
      </div>
    </dialog>
  `}var ic=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ac=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],lc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function cc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function ti(e,t,r){return c`
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
        ${ic.map(n=>c`<option
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
        ${ac.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${cc(e,t,r)}
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
        ${lc.map(n=>c`<option
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
  `}var dc=200,uc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},pc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),ri="beads-ui.board.sort",ni=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function fc(){try{let e=window.localStorage.getItem(ri);if(e&&ni.has(e))return e}catch{}return"created_desc"}function si(e,t){let r=Ve("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Rt,h=s?_n(s,i):null,S=gn({transport:o,uiOrderStore:i}),$=[],y=[],D=[],N=[],X=[],K=[],P=!1,R=0,A=fc(),C=new Map,B=new Map,de=new Map,$e=new Set,fe=new Set,ue={search:"",priority:"",type:"",labels:[]},Ee=!1,Ue=null;function Ke(E){return String(E.status||"open")==="open"}function ze(E){let q=String(E.status||"open");return q==="open"||q==="blocked"}function xe(E){let q=ue.search.trim().toLowerCase(),te=ue.priority,u=ue.type,m=ue.labels;return E.filter(T=>{if(q){let Q=String(T.id||"").toLowerCase(),he=String(T.title||"").toLowerCase();if(!Q.includes(q)&&!he.includes(q))return!1}if(te!==""&&String(T.priority)!==te||u!==""&&String(T.issue_type||"")!==u)return!1;if(m.length>0){let Q=Array.isArray(T.labels)?T.labels:[];if(!m.some(he=>Q.includes(he)))return!1}return!0})}function L(){let E=new Set;for(let q of[$,y,D,N,X,K])for(let te of q){let u=Array.isArray(te.labels)?te.labels:[];for(let m of u)typeof m=="string"&&m.length>0&&E.add(m)}return Array.from(E).sort()}function z(){return ue.search.trim()!==""||ue.priority!==""||ue.type!==""||ue.labels.length>0}function me(){try{if(h){let E=h.selectBoardColumn("tab:board:in-progress","in_progress",A),q=h.selectBoardColumn("tab:board:blocked","blocked",A).filter(ze),te=new Set(E.map(ie=>ie.id)),u=h.selectBoardColumn("tab:board:ready","ready",A).filter(ie=>Ke(ie)&&!te.has(ie.id)),m=h.selectBoardColumn("tab:board:resolved","resolved",A),T=h.selectBoardColumn("tab:board:deferred","deferred",A),Q=h.selectBoardColumn("tab:board:closed","closed").slice(0,dc),he=[...q,...u,...E,...m,...Q];oe(he);let Ae=new Set;for(let ie of he)ie&&ie.id&&!cs(ie)&&Ae.add(ie.id);let ye=!z();$=ye?qr(q,Ae):q,y=ye?qr(u,Ae):u,D=ye?qr(E,Ae):E,N=ye?qr(m,Ae):m,X=T,R=T.length,K=ye?qr(Q,Ae):Q,C=new Map;for(let ie of $)C.set(ie.id,"open");for(let ie of y)C.set(ie.id,"open");for(let ie of D)C.set(ie.id,"in_progress");for(let ie of N)C.set(ie.id,"resolved");for(let ie of X)C.set(ie.id,"deferred");for(let ie of K)C.set(ie.id,"closed");B=new Map;for(let ie of $)B.set(ie.id,"blocked-col");for(let ie of y)B.set(ie.id,"ready-col");for(let ie of D)B.set(ie.id,"in-progress-col");for(let ie of N)B.set(ie.id,"resolved-col");for(let ie of K)B.set(ie.id,"closed-col")}We()}catch{$=[],y=[],D=[],N=[],X=[],K=[],de=new Map,We()}}function oe(E){let q=new Map;for(let u of E)u&&u.id&&!q.has(u.id)&&q.set(u.id,u);let te=new Map;for(let u of q.values()){let m=cs(u);if(!m)continue;let T=te.get(m);T||(T=[],te.set(m,T)),T.push({id:u.id,title:u.title,status:u.status,metadata:u.metadata,created_at:u.created_at,updated_at:u.updated_at})}de=te}function we(E){let q=de.get(E)||[],te=0;for(let m of q)(m.status==="resolved"||m.status==="closed")&&(te+=1);let u=mn(q);return{total:q.length,count:te,current:u,children:q}}function ge(E){return!$e.has(E)}function Be(E,q){E.preventDefault(),E.stopPropagation(),$e.has(q)?$e.delete(q):$e.add(q),We()}function be(E,q){E.preventDefault(),E.stopPropagation(),n(q)}function Ce(E,q){E.preventDefault(),E.stopPropagation(),n(q)}function U(E,q){Ue||n(q)}function O(E,q){E.preventDefault(),E.stopPropagation(),_c(q).then(te=>{te&&se("\uBCF5\uC0AC\uB428","success",1200)})}function ne(E,q){Ue=q,E.dataTransfer&&(E.dataTransfer.setData("text/plain",q),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function Se(E){E.target.classList.remove("board-card--dragging"),gt(),setTimeout(()=>{Ue=null},0)}function Re(E){let q=String(E.target.value||"");!q||q===f||(f=q,d&&d(q),We())}function F(){return l?l.get():null}function j(E){let q=a?a.get():null,te=q?q.cleanup_failed:null;if(!te||typeof te!="object"||Array.isArray(te))return null;let u=te[E];return!u||typeof u!="object"||Array.isArray(u)?null:u}function M(E,q){if(!E||typeof E!="object"||Array.isArray(E))return!1;let te=Object.values(E),u=new Set;for(let m of te)m&&typeof m=="object"&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);return te.some(m=>m&&typeof m=="object"&&m.bead_id===q&&m.cleanup_diagnosis===!0&&(m.status==="running"||m.status==="paused"&&!u.has(m.attempt_id)))}function ae(E){let q=a?a.get():null;return fe.has(E)||M(q?q.attempts:null,E)}function ce(E){E&&E.queue&&a&&a.set(E.queue)}async function k(E,q){if(E.preventDefault(),E.stopPropagation(),!o||!a||!j(q)||fe.has(q))return;fe.add(q),We();let te;try{let u=a.get(),m=u&&typeof u.revision=="number"?u.revision:0;if(te=await o("worker-cleanup-diagnose",{bead_id:q,expected_revision:m}),ce(te),te&&te.conflict){let T=a.get(),Q=T&&typeof T.revision=="number"?T.revision:0;te=await o("worker-cleanup-diagnose",{bead_id:q,expected_revision:Q}),ce(te)}}finally{fe.delete(q),We()}te&&!te.conflict&&te.ok===!1&&te.reason&&se(`AI \uC815\uB9AC \uAC70\uBD80: ${te.reason}`,"error",2400)}let G={onCardClick:U,onCopyId:O,onDragStart:ne,onDragEnd:Se,onClosedRangeChange:Re,rollupFor:we,isExpanded:ge,onRollupToggle:Be,onChildClick:be,onFromChipClick:Ce,cleanupFailureFor:j,isCleanupDiagnosisPending:ae,onCleanupDiagnose:k,get policy(){return F()}};function W(E,q){Ue||(_t(),n(q))}function ee(E,q){E.preventDefault(),E.stopPropagation(),_t(),n(q)}let pe={...G,onCardClick:W,onChildClick:ee,onFromChipClick:ee,get policy(){return F()}};function Te(E){let q=E.target,te=e.querySelector(".board-filter__labels");q&&te&&te.contains(q)||Xe()}function Ne(E){E.key==="Escape"&&Xe()}function Ze(){Ee||(Ee=!0,document.addEventListener("mousedown",Te),document.addEventListener("keydown",Ne),We())}function Xe(){Ee&&(Ee=!1,document.removeEventListener("mousedown",Te),document.removeEventListener("keydown",Ne),We())}function lt(E){E.key==="Escape"&&_t()}function st(){P||(P=!0,document.addEventListener("keydown",lt),We())}function _t(){P&&(P=!1,document.removeEventListener("keydown",lt),We())}let vt={onClose:_t,onOverlayClick(E){E.target===E.currentTarget&&_t()}},De={onSearchInput(E){ue.search=String(E.target.value||""),me()},onPriorityChange(E){ue.priority=String(E.target.value||""),me()},onTypeChange(E){ue.type=String(E.target.value||""),me()},onSortChange(E){let q=String(E.target.value||"");if(!(!ni.has(q)||q===A)){A=q;try{window.localStorage.setItem(ri,q)}catch{}me()}},onDeferredToggle(){P?_t():st()},onLabelMenuToggle(){Ee?Xe():Ze()},onLabelToggle(E){let q=ue.labels.indexOf(E);q===-1?ue.labels.push(E):ue.labels.splice(q,1),me()},onLabelClear(){ue.labels.length!==0&&(ue.labels=[],me())},onNewIssue(){p&&p()}};function ot(){return c`
      <div class="board-view">
        ${ti(ue,De,{sort_mode:A,deferred_popup_open:P,deferred_count:R,label_options:L(),label_menu_open:Ee})}
        <div class="board-root">
          ${Sr({title:"Blocked",id:"blocked-col",items:xe($)},G)}
          ${Sr({title:"Ready",id:"ready-col",items:xe(y)},G)}
          ${Sr({title:"In progress",id:"in-progress-col",items:xe(D)},G)}
          ${Sr({title:"Resolved",id:"resolved-col",items:xe(N)},G)}
          ${Sr({title:"Closed",id:"closed-col",items:xe(K),is_closed:!0,closed_range:f},G)}
        </div>
        ${P?ei({items:xe(X),count:R},pe,vt):""}
      </div>
    `}function We(){Pe(ot(),e),mt()}function mt(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let q=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let te of q)Array.from(te.querySelectorAll(".board-card")).forEach((m,T)=>{m.tabIndex=T===0?0:-1})}catch{}}async function ct(E,q){if(!o){se("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:q}),se("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(te){r("update-status failed: %o",te),se("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function rt(E){switch(E){case"blocked-col":return $;case"ready-col":return y;case"in-progress-col":return D;case"resolved-col":return N;default:return[]}}function it(E,q,te){if(!o||!i)return;let u=rt(E),m=u.find(ye=>ye.id===q);if(!m)return;let T=u.filter(ye=>ye.id!==q),Q=te.closest?te.closest(".board-card"):null,he=T.length;if(Q){let ye=Q.getAttribute("data-issue-id");if(ye===q)return;let ie=T.findIndex(Ie=>Ie.id===ye);ie>=0&&(he=ie)}let Ae=T.slice();Ae.splice(he,0,m),S.applyReorder(q,Ae,he)}function gt(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let Je=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let te=E.target.closest(".board-column");te&&te!==Je&&(Je&&Je.classList.remove("board-column--drag-over"),te.classList.add("board-column--drag-over"),Je=te)}),e.addEventListener("dragleave",E=>{let q=E.relatedTarget;(!q||!e.contains(q))&&Je&&(Je.classList.remove("board-column--drag-over"),Je=null)}),e.addEventListener("drop",E=>{E.preventDefault(),Je&&(Je.classList.remove("board-column--drag-over"),Je=null);let q=E.target,te=q.closest(".board-column");if(!te)return;let u=E.dataTransfer?.getData("text/plain")||"";if(!u)return;let m=te.id,T=B.get(u);if(T&&T===m){if(pc.has(m)){if(A!=="manual"){se("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}it(m,u,q)}return}let Q=uc[m];if(!Q){se("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}C.get(u)!==Q&&ct(u,Q)}),e.addEventListener("keydown",E=>{let q=E.target;if(!(q instanceof HTMLElement))return;let te=String(q.tagName||"").toLowerCase();if(te==="input"||te==="textarea"||te==="select"||te==="button"||te==="a"||q.isContentEditable===!0)return;let u=q.closest(".board-card");if(!u)return;let m=String(E.key||"");if(m==="Enter"||m===" "){E.preventDefault();let Ae=u.getAttribute("data-issue-id");Ae&&n(Ae);return}if(m!=="ArrowUp"&&m!=="ArrowDown"&&m!=="ArrowLeft"&&m!=="ArrowRight")return;E.preventDefault();let T=u.closest(".board-column");if(!T)return;let Q=Array.from(T.querySelectorAll(".board-card")),he=Q.indexOf(u);if(m==="ArrowDown"&&he<Q.length-1){yt(u,Q[he+1]);return}if(m==="ArrowUp"&&he>0){yt(u,Q[he-1]);return}if(m==="ArrowLeft"||m==="ArrowRight"){let Ae=Array.from(e.querySelectorAll(".board-column")),ye=Ae.indexOf(T),ie=m==="ArrowRight"?1:-1,Ie=ye+ie;for(;Ie>=0&&Ie<Ae.length;){let Ge=Ae[Ie].querySelector(".board-card");if(Ge){yt(u,Ge);return}Ie+=ie}}});function yt(E,q){try{E.tabIndex=-1,q.tabIndex=0,q.focus()}catch{}}let Qe=null;h&&h.subscribe&&(Qe=h.subscribe(()=>{try{me()}catch{}}));let dt=null;l&&l.subscribe&&(dt=l.subscribe(()=>{try{me()}catch{}}));let ut=null;return a&&a.subscribe&&(ut=a.subscribe(()=>{We()})),{async load(){r("load"),me()},clear(){Xe(),_t(),Qe&&(Qe(),Qe=null),dt&&(dt(),dt=null),ut&&(ut(),ut=null),e.replaceChildren(),$=[],y=[],D=[],N=[],X=[],K=[],C=new Map,B=new Map}}}function cs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function qr(e,t){return e.filter(r=>{let n=cs(r);return!(n&&t.has(n))})}async function _c(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function fr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var ci="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function pt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Wt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Br=[...Wt,"reasoning_output_tokens"],mc=["implementation","review-consult"];function ds(e){let t=0;for(let r of Wt)t+=pt(e?.[r]);return t}function gc(e){return!e||typeof e!="object"?!1:Wt.some(t=>Number.isFinite(e[t]))}function oi(e){return!e||typeof e!="object"?!1:Br.some(t=>Number.isFinite(e[t]))}function hc(e){let t={};for(let r of Br)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function ii(e){let t={};for(let r of Br)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ai(e,t){return e==="codex"?pt(t.input_tokens)+pt(t.output_tokens):ds(t)}function bc(e){return e==="claude"?"Claude":"Codex"}function vc(e){return`\u03C4 ${di(e)}`}function yc(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${pt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${pt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${pt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${pt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${pt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${pt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${pt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ci),o.join(`
`)}function ft(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${bc(r)} ${vc(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:yc(r,n)})}return t}function wn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let i=s.providers[o];if(!i)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=i.subtotal;for(let a of Br)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=pt(l.breakdown[a])+pt(i.breakdown[a]));i.replayed&&(l.replayed=!0),o==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?n.claude+=i.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function us(e){return!e||typeof e!="object"?null:Mt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function kc(e){return e==="codex"?"codex":"claude"}function tr(){return{subtotal:0,breakdown:hc(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function kn(e,t,r){e.subtotal+=t.subtotal;for(let n of Br)Number.isFinite(t.usage[n])&&(e.breakdown[n]=pt(e.breakdown[n])+pt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function li(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function di(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ar(e){return gc(e)?`\u03C4 ${di(ds(e))}`:null}function Pt(e){let t=Ar(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Tr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${pt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${pt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${pt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${pt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${ds(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ci),r.join(`
`)}function Mt(e,t){let r={claude:tr(),codex:tr()},n={orchestrator:{claude:tr(),codex:tr()},implementation:{claude:tr(),codex:tr()},"review-consult":{claude:tr(),codex:tr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(oi(a)){let p=kc(l.runner),f=ii(a),h={provider:p,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:ai(p,f)};f.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),kn(r[p],h,!0),kn(n.orchestrator[p],h,!0)}let d=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!mc.includes(p.role)||!oi(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let h=ii(p.usage),S={provider:"codex",role:p.role,attempt_id:String(l.attempt_id||""),usage:h,subtotal:ai("codex",h)};S.receipt_id=f,typeof p.model=="string"&&(S.model=p.model),typeof p.session_id=="string"?S.session_id=p.session_id:typeof p.thread_id=="string"&&(S.session_id=p.thread_id),typeof p.turn_id=="string"&&(S.turn_id=p.turn_id),typeof p.completed_at=="string"&&(S.completed_at=p.completed_at),h.replayed===!0&&(S.replayed=!0),kn(r.codex,S,!1),kn(n[S.role].codex,S,!1)}}let o={};for(let l of["claude","codex"]){let a=r[l];if(a.legs.length===0)continue;let d=li(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(d.total_cost_usd=a.outer_cost),o[l]=d}if(Object.keys(o).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult"]){let a={};for(let d of["claude","codex"]){let p=n[l][d];p.legs.length>0&&(a[d]={...li(p,!0),legs:p.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:o,roles:i}}var{entries:vi,setPrototypeOf:ui,isFrozen:wc,getPrototypeOf:$c,getOwnPropertyDescriptor:xc}=Object,{freeze:wt,seal:It,create:bs}=Object,{apply:vs,construct:ys}=typeof Reflect<"u"&&Reflect;wt||(wt=function(t){return t});It||(It=function(t){return t});vs||(vs=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ys||(ys=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var $n=$t(Array.prototype.forEach),Sc=$t(Array.prototype.lastIndexOf),pi=$t(Array.prototype.pop),Ur=$t(Array.prototype.push),Ac=$t(Array.prototype.splice),Sn=$t(String.prototype.toLowerCase),ps=$t(String.prototype.toString),fs=$t(String.prototype.match),jr=$t(String.prototype.replace),Tc=$t(String.prototype.indexOf),Ec=$t(String.prototype.trim),Nt=$t(Object.prototype.hasOwnProperty),kt=$t(RegExp.prototype.test),zr=Cc(TypeError);function $t(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return vs(e,t,n)}}function Cc(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ys(e,r)}}function Le(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Sn;ui&&ui(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(wc(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Rc(e){for(let t=0;t<e.length;t++)Nt(e,t)||(e[t]=null);return e}function Gt(e){let t=bs(null);for(let[r,n]of vi(e))Nt(e,r)&&(Array.isArray(n)?t[r]=Rc(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Gt(n):t[r]=n);return t}function Hr(e,t){for(;e!==null;){let n=xc(e,t);if(n){if(n.get)return $t(n.get);if(typeof n.value=="function")return $t(n.value)}e=$c(e)}function r(){return null}return r}var fi=wt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),_s=wt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ms=wt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ic=wt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),gs=wt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Lc=wt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),_i=wt(["#text"]),mi=wt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),hs=wt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),gi=wt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xn=wt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Dc=It(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Oc=It(/<%[\w\W]*|[\w\W]*%>/gm),Pc=It(/\$\{[\w\W]*/gm),Mc=It(/^data-[\-\w.\u00B7-\uFFFF]+$/),Nc=It(/^aria-[\-\w]+$/),yi=It(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Fc=It(/^(?:\w+script|data):/i),qc=It(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ki=It(/^html$/i),Bc=It(/^[a-z][.\w]*(-[.\w]+)+$/i),hi=Object.freeze({__proto__:null,ARIA_ATTR:Nc,ATTR_WHITESPACE:qc,CUSTOM_ELEMENT:Bc,DATA_ATTR:Mc,DOCTYPE_NAME:ki,ERB_EXPR:Oc,IS_ALLOWED_URI:yi,IS_SCRIPT_OR_DATA:Fc,MUSTACHE_EXPR:Dc,TMPLIT_EXPR:Pc}),Wr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Uc=function(){return typeof window>"u"?null:window},jc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},bi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function wi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Uc(),t=le=>wi(le);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Wr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:S}=e,$=a.prototype,y=Hr($,"cloneNode"),D=Hr($,"remove"),N=Hr($,"nextSibling"),X=Hr($,"childNodes"),K=Hr($,"parentNode");if(typeof i=="function"){let le=r.createElement("template");le.content&&le.content.ownerDocument&&(r=le.content.ownerDocument)}let P,R="",{implementation:A,createNodeIterator:C,createDocumentFragment:B,getElementsByTagName:de}=r,{importNode:$e}=n,fe=bi();t.isSupported=typeof vi=="function"&&typeof K=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ue,ERB_EXPR:Ee,TMPLIT_EXPR:Ue,DATA_ATTR:Ke,ARIA_ATTR:ze,IS_SCRIPT_OR_DATA:xe,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:z}=hi,{IS_ALLOWED_URI:me}=hi,oe=null,we=Le({},[...fi,..._s,...ms,...gs,..._i]),ge=null,Be=Le({},[...mi,...hs,...gi,...xn]),be=Object.seal(bs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,U=null,O=Object.seal(bs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ne=!0,Se=!0,Re=!1,F=!0,j=!1,M=!0,ae=!1,ce=!1,k=!1,G=!1,W=!1,ee=!1,pe=!0,Te=!1,Ne="user-content-",Ze=!0,Xe=!1,lt={},st=null,_t=Le({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),vt=null,De=Le({},["audio","video","img","source","image","track"]),ot=null,We=Le({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),mt="http://www.w3.org/1998/Math/MathML",ct="http://www.w3.org/2000/svg",rt="http://www.w3.org/1999/xhtml",it=rt,gt=!1,Je=null,yt=Le({},[mt,ct,rt],ps),Qe=Le({},["mi","mo","mn","ms","mtext"]),dt=Le({},["annotation-xml"]),ut=Le({},["title","style","font","a","script"]),E=null,q=["application/xhtml+xml","text/html"],te="text/html",u=null,m=null,T=r.createElement("form"),Q=function(b){return b instanceof RegExp||b instanceof Function},he=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===b)){if((!b||typeof b!="object")&&(b={}),b=Gt(b),E=q.indexOf(b.PARSER_MEDIA_TYPE)===-1?te:b.PARSER_MEDIA_TYPE,u=E==="application/xhtml+xml"?ps:Sn,oe=Nt(b,"ALLOWED_TAGS")?Le({},b.ALLOWED_TAGS,u):we,ge=Nt(b,"ALLOWED_ATTR")?Le({},b.ALLOWED_ATTR,u):Be,Je=Nt(b,"ALLOWED_NAMESPACES")?Le({},b.ALLOWED_NAMESPACES,ps):yt,ot=Nt(b,"ADD_URI_SAFE_ATTR")?Le(Gt(We),b.ADD_URI_SAFE_ATTR,u):We,vt=Nt(b,"ADD_DATA_URI_TAGS")?Le(Gt(De),b.ADD_DATA_URI_TAGS,u):De,st=Nt(b,"FORBID_CONTENTS")?Le({},b.FORBID_CONTENTS,u):_t,Ce=Nt(b,"FORBID_TAGS")?Le({},b.FORBID_TAGS,u):Gt({}),U=Nt(b,"FORBID_ATTR")?Le({},b.FORBID_ATTR,u):Gt({}),lt=Nt(b,"USE_PROFILES")?b.USE_PROFILES:!1,ne=b.ALLOW_ARIA_ATTR!==!1,Se=b.ALLOW_DATA_ATTR!==!1,Re=b.ALLOW_UNKNOWN_PROTOCOLS||!1,F=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,j=b.SAFE_FOR_TEMPLATES||!1,M=b.SAFE_FOR_XML!==!1,ae=b.WHOLE_DOCUMENT||!1,G=b.RETURN_DOM||!1,W=b.RETURN_DOM_FRAGMENT||!1,ee=b.RETURN_TRUSTED_TYPE||!1,k=b.FORCE_BODY||!1,pe=b.SANITIZE_DOM!==!1,Te=b.SANITIZE_NAMED_PROPS||!1,Ze=b.KEEP_CONTENT!==!1,Xe=b.IN_PLACE||!1,me=b.ALLOWED_URI_REGEXP||yi,it=b.NAMESPACE||rt,Qe=b.MATHML_TEXT_INTEGRATION_POINTS||Qe,dt=b.HTML_INTEGRATION_POINTS||dt,be=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&Q(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&Q(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),j&&(Se=!1),W&&(G=!0),lt&&(oe=Le({},_i),ge=[],lt.html===!0&&(Le(oe,fi),Le(ge,mi)),lt.svg===!0&&(Le(oe,_s),Le(ge,hs),Le(ge,xn)),lt.svgFilters===!0&&(Le(oe,ms),Le(ge,hs),Le(ge,xn)),lt.mathMl===!0&&(Le(oe,gs),Le(ge,gi),Le(ge,xn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?O.tagCheck=b.ADD_TAGS:(oe===we&&(oe=Gt(oe)),Le(oe,b.ADD_TAGS,u))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?O.attributeCheck=b.ADD_ATTR:(ge===Be&&(ge=Gt(ge)),Le(ge,b.ADD_ATTR,u))),b.ADD_URI_SAFE_ATTR&&Le(ot,b.ADD_URI_SAFE_ATTR,u),b.FORBID_CONTENTS&&(st===_t&&(st=Gt(st)),Le(st,b.FORBID_CONTENTS,u)),Ze&&(oe["#text"]=!0),ae&&Le(oe,["html","head","body"]),oe.table&&(Le(oe,["tbody"]),delete Ce.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw zr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw zr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=b.TRUSTED_TYPES_POLICY,R=P.createHTML("")}else P===void 0&&(P=jc(S,s)),P!==null&&typeof R=="string"&&(R=P.createHTML(""));wt&&wt(b),m=b}},Ae=Le({},[..._s,...ms,...Ic]),ye=Le({},[...gs,...Lc]),ie=function(b){let H=K(b);(!H||!H.tagName)&&(H={namespaceURI:it,tagName:"template"});let _=Sn(b.tagName),v=Sn(H.tagName);return Je[b.namespaceURI]?b.namespaceURI===ct?H.namespaceURI===rt?_==="svg":H.namespaceURI===mt?_==="svg"&&(v==="annotation-xml"||Qe[v]):!!Ae[_]:b.namespaceURI===mt?H.namespaceURI===rt?_==="math":H.namespaceURI===ct?_==="math"&&dt[v]:!!ye[_]:b.namespaceURI===rt?H.namespaceURI===ct&&!dt[v]||H.namespaceURI===mt&&!Qe[v]?!1:!ye[_]&&(ut[_]||!Ae[_]):!!(E==="application/xhtml+xml"&&Je[b.namespaceURI]):!1},Ie=function(b){Ur(t.removed,{element:b});try{K(b).removeChild(b)}catch{D(b)}},Ge=function(b,H){try{Ur(t.removed,{attribute:H.getAttributeNode(b),from:H})}catch{Ur(t.removed,{attribute:null,from:H})}if(H.removeAttribute(b),b==="is")if(G||W)try{Ie(H)}catch{}else try{H.setAttribute(b,"")}catch{}},ke=function(b){let H=null,_=null;if(k)b="<remove></remove>"+b;else{let re=fs(b,/^[\r\n\t ]+/);_=re&&re[0]}E==="application/xhtml+xml"&&it===rt&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let v=P?P.createHTML(b):b;if(it===rt)try{H=new h().parseFromString(v,E)}catch{}if(!H||!H.documentElement){H=A.createDocument(it,"template",null);try{H.documentElement.innerHTML=gt?R:v}catch{}}let J=H.body||H.documentElement;return b&&_&&J.insertBefore(r.createTextNode(_),J.childNodes[0]||null),it===rt?de.call(H,ae?"html":"body")[0]:ae?H.documentElement:J},at=function(b){return C.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Tt=function(b){return b instanceof f&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof p)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},St=function(b){return typeof l=="function"&&b instanceof l};function et(le,b,H){$n(le,_=>{_.call(t,b,H,m)})}let Et=function(b){let H=null;if(et(fe.beforeSanitizeElements,b,null),Tt(b))return Ie(b),!0;let _=u(b.nodeName);if(et(fe.uponSanitizeElement,b,{tagName:_,allowedTags:oe}),M&&b.hasChildNodes()&&!St(b.firstElementChild)&&kt(/<[/\w!]/g,b.innerHTML)&&kt(/<[/\w!]/g,b.textContent)||b.nodeType===Wr.progressingInstruction||M&&b.nodeType===Wr.comment&&kt(/<[/\w]/g,b.data))return Ie(b),!0;if(!(O.tagCheck instanceof Function&&O.tagCheck(_))&&(!oe[_]||Ce[_])){if(!Ce[_]&&Ye(_)&&(be.tagNameCheck instanceof RegExp&&kt(be.tagNameCheck,_)||be.tagNameCheck instanceof Function&&be.tagNameCheck(_)))return!1;if(Ze&&!st[_]){let v=K(b)||b.parentNode,J=X(b)||b.childNodes;if(J&&v){let re=J.length;for(let Z=re-1;Z>=0;--Z){let g=y(J[Z],!0);g.__removalCount=(b.__removalCount||0)+1,v.insertBefore(g,N(b))}}}return Ie(b),!0}return b instanceof a&&!ie(b)||(_==="noscript"||_==="noembed"||_==="noframes")&&kt(/<\/no(script|embed|frames)/i,b.innerHTML)?(Ie(b),!0):(j&&b.nodeType===Wr.text&&(H=b.textContent,$n([ue,Ee,Ue],v=>{H=jr(H,v," ")}),b.textContent!==H&&(Ur(t.removed,{element:b.cloneNode()}),b.textContent=H)),et(fe.afterSanitizeElements,b,null),!1)},ve=function(b,H,_){if(pe&&(H==="id"||H==="name")&&(_ in r||_ in T))return!1;if(!(Se&&!U[H]&&kt(Ke,H))){if(!(ne&&kt(ze,H))){if(!(O.attributeCheck instanceof Function&&O.attributeCheck(H,b))){if(!ge[H]||U[H]){if(!(Ye(b)&&(be.tagNameCheck instanceof RegExp&&kt(be.tagNameCheck,b)||be.tagNameCheck instanceof Function&&be.tagNameCheck(b))&&(be.attributeNameCheck instanceof RegExp&&kt(be.attributeNameCheck,H)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(H,b))||H==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&kt(be.tagNameCheck,_)||be.tagNameCheck instanceof Function&&be.tagNameCheck(_))))return!1}else if(!ot[H]){if(!kt(me,jr(_,L,""))){if(!((H==="src"||H==="xlink:href"||H==="href")&&b!=="script"&&Tc(_,"data:")===0&&vt[b])){if(!(Re&&!kt(xe,jr(_,L,"")))){if(_)return!1}}}}}}}return!0},Ye=function(b){return b!=="annotation-xml"&&fs(b,z)},Dt=function(b){et(fe.beforeSanitizeAttributes,b,null);let{attributes:H}=b;if(!H||Tt(b))return;let _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0},v=H.length;for(;v--;){let J=H[v],{name:re,namespaceURI:Z,value:g}=J,I=u(re),x=g,V=re==="value"?x:Ec(x);if(_.attrName=I,_.attrValue=V,_.keepAttr=!0,_.forceKeepAttr=void 0,et(fe.uponSanitizeAttribute,b,_),V=_.attrValue,Te&&(I==="id"||I==="name")&&(Ge(re,b),V=Ne+V),M&&kt(/((--!?|])>)|<\/(style|title|textarea)/i,V)){Ge(re,b);continue}if(I==="attributename"&&fs(V,"href")){Ge(re,b);continue}if(_.forceKeepAttr)continue;if(!_.keepAttr){Ge(re,b);continue}if(!F&&kt(/\/>/i,V)){Ge(re,b);continue}j&&$n([ue,Ee,Ue],nt=>{V=jr(V,nt," ")});let Me=u(b.nodeName);if(!ve(Me,I,V)){Ge(re,b);continue}if(P&&typeof S=="object"&&typeof S.getAttributeType=="function"&&!Z)switch(S.getAttributeType(Me,I)){case"TrustedHTML":{V=P.createHTML(V);break}case"TrustedScriptURL":{V=P.createScriptURL(V);break}}if(V!==x)try{Z?b.setAttributeNS(Z,re,V):b.setAttribute(re,V),Tt(b)?Ie(b):pi(t.removed)}catch{Ge(re,b)}}et(fe.afterSanitizeAttributes,b,null)},Zt=function le(b){let H=null,_=at(b);for(et(fe.beforeSanitizeShadowDOM,b,null);H=_.nextNode();)et(fe.uponSanitizeShadowNode,H,null),Et(H),Dt(H),H.content instanceof o&&le(H.content);et(fe.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(le){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},H=null,_=null,v=null,J=null;if(gt=!le,gt&&(le="<!-->"),typeof le!="string"&&!St(le))if(typeof le.toString=="function"){if(le=le.toString(),typeof le!="string")throw zr("dirty is not a string, aborting")}else throw zr("toString is not a function");if(!t.isSupported)return le;if(ce||he(b),t.removed=[],typeof le=="string"&&(Xe=!1),Xe){if(le.nodeName){let g=u(le.nodeName);if(!oe[g]||Ce[g])throw zr("root node is forbidden and cannot be sanitized in-place")}}else if(le instanceof l)H=ke("<!---->"),_=H.ownerDocument.importNode(le,!0),_.nodeType===Wr.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?H=_:H.appendChild(_);else{if(!G&&!j&&!ae&&le.indexOf("<")===-1)return P&&ee?P.createHTML(le):le;if(H=ke(le),!H)return G?null:ee?R:""}H&&k&&Ie(H.firstChild);let re=at(Xe?le:H);for(;v=re.nextNode();)Et(v),Dt(v),v.content instanceof o&&Zt(v.content);if(Xe)return le;if(G){if(W)for(J=B.call(H.ownerDocument);H.firstChild;)J.appendChild(H.firstChild);else J=H;return(ge.shadowroot||ge.shadowrootmode)&&(J=$e.call(n,J,!0)),J}let Z=ae?H.outerHTML:H.innerHTML;return ae&&oe["!doctype"]&&H.ownerDocument&&H.ownerDocument.doctype&&H.ownerDocument.doctype.name&&kt(ki,H.ownerDocument.doctype.name)&&(Z="<!DOCTYPE "+H.ownerDocument.doctype.name+`>
`+Z),j&&$n([ue,Ee,Ue],g=>{Z=jr(Z,g," ")}),P&&ee?P.createHTML(Z):Z},t.setConfig=function(){let le=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};he(le),ce=!0},t.clearConfig=function(){m=null,ce=!1},t.isValidAttribute=function(le,b,H){m||he({});let _=u(le),v=u(b);return ve(_,v,H)},t.addHook=function(le,b){typeof b=="function"&&Ur(fe[le],b)},t.removeHook=function(le,b){if(b!==void 0){let H=Sc(fe[le],b);return H===-1?void 0:Ac(fe[le],H,1)[0]}return pi(fe[le])},t.removeHooks=function(le){fe[le]=[]},t.removeAllHooks=function(){fe=bi()},t}var $i=wi();var xi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Si=e=>(...t)=>({_$litDirective$:e,values:t}),An=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Gr=class extends An{constructor(t){if(super(t),this.it=tt,t.type!==xi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===tt||t==null)return this._t=void 0,this.it=t;if(t===dr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Gr.directiveName="unsafeHTML",Gr.resultType=1;var Ai=Si(Gr);function xs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var mr=xs();function Di(e){mr=e}var Zr={exec:()=>null};function Fe(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(xt.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,t)};return n}var zc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),xt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Hc=/^(?:[ \t]*(?:\n|$))+/,Wc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Gc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Xr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Yc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ss=/(?:[*+-]|\d{1,9}[.)])/,Oi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Pi=Fe(Oi).replace(/bull/g,Ss).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Vc=Fe(Oi).replace(/bull/g,Ss).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),As=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Kc=/^[^\n]+/,Ts=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Zc=Fe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ts).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Xc=Fe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ss).getRegex(),Ln="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Es=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Qc=Fe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Es).replace("tag",Ln).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Mi=Fe(As).replace("hr",Xr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ln).getRegex(),Jc=Fe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Mi).getRegex(),Cs={blockquote:Jc,code:Wc,def:Zc,fences:Gc,heading:Yc,hr:Xr,html:Qc,lheading:Pi,list:Xc,newline:Hc,paragraph:Mi,table:Zr,text:Kc},Ti=Fe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Xr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ln).getRegex(),ed={...Cs,lheading:Vc,table:Ti,paragraph:Fe(As).replace("hr",Xr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ti).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ln).getRegex()},td={...Cs,html:Fe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Es).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Zr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Fe(As).replace("hr",Xr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Pi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},rd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,nd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ni=/^( {2,}|\\)\n(?!\s*$)/,sd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Dn=/[\p{P}\p{S}]/u,Rs=/[\s\p{P}\p{S}]/u,Fi=/[^\s\p{P}\p{S}]/u,od=Fe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Rs).getRegex(),qi=/(?!~)[\p{P}\p{S}]/u,id=/(?!~)[\s\p{P}\p{S}]/u,ad=/(?:[^\s\p{P}\p{S}]|~)/u,ld=Fe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",zc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Bi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,cd=Fe(Bi,"u").replace(/punct/g,Dn).getRegex(),dd=Fe(Bi,"u").replace(/punct/g,qi).getRegex(),Ui="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ud=Fe(Ui,"gu").replace(/notPunctSpace/g,Fi).replace(/punctSpace/g,Rs).replace(/punct/g,Dn).getRegex(),pd=Fe(Ui,"gu").replace(/notPunctSpace/g,ad).replace(/punctSpace/g,id).replace(/punct/g,qi).getRegex(),fd=Fe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fi).replace(/punctSpace/g,Rs).replace(/punct/g,Dn).getRegex(),_d=Fe(/\\(punct)/,"gu").replace(/punct/g,Dn).getRegex(),md=Fe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),gd=Fe(Es).replace("(?:-->|$)","-->").getRegex(),hd=Fe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",gd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Cn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,bd=Fe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Cn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ji=Fe(/^!?\[(label)\]\[(ref)\]/).replace("label",Cn).replace("ref",Ts).getRegex(),zi=Fe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ts).getRegex(),vd=Fe("reflink|nolink(?!\\()","g").replace("reflink",ji).replace("nolink",zi).getRegex(),Ei=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Is={_backpedal:Zr,anyPunctuation:_d,autolink:md,blockSkip:ld,br:Ni,code:nd,del:Zr,emStrongLDelim:cd,emStrongRDelimAst:ud,emStrongRDelimUnd:fd,escape:rd,link:bd,nolink:zi,punctuation:od,reflink:ji,reflinkSearch:vd,tag:hd,text:sd,url:Zr},yd={...Is,link:Fe(/^!?\[(label)\]\((.*?)\)/).replace("label",Cn).getRegex(),reflink:Fe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Cn).getRegex()},ks={...Is,emStrongRDelimAst:pd,emStrongLDelim:dd,url:Fe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ei).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Fe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ei).getRegex()},kd={...ks,br:Fe(Ni).replace("{2,}","*").getRegex(),text:Fe(ks.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Tn={normal:Cs,gfm:ed,pedantic:td},Yr={normal:Is,gfm:ks,breaks:kd,pedantic:yd},wd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ci=e=>wd[e];function Yt(e,t){if(t){if(xt.escapeTest.test(e))return e.replace(xt.escapeReplace,Ci)}else if(xt.escapeTestNoEncode.test(e))return e.replace(xt.escapeReplaceNoEncode,Ci);return e}function Ri(e){try{e=encodeURI(e).replace(xt.percentDecode,"%")}catch{return null}return e}function Ii(e,t){let r=e.replace(xt.findPipe,(o,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=r.split(xt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(xt.slashPipe,"|");return n}function Vr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function $d(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Li(e,t,r,n,s){let o=t.href,i=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function xd(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Rn=class{constructor(e){je(this,"options");je(this,"rules");je(this,"lexer");this.options=e||mr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Vr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=xd(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Vr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Vr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Vr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let S=h,$=S.raw+`
`+r.join(`
`),y=this.blockquote($);o[o.length-1]=y,n=n.substring(0,n.length-S.raw.length)+y.raw,s=s.substring(0,s.length-S.text.length)+y.text;break}else if(h?.type==="list"){let S=h,$=S.raw+`
`+r.join(`
`),y=this.list($);o[o.length-1]=y,n=n.substring(0,n.length-h.raw.length)+y.raw,s=s.substring(0,s.length-S.raw.length)+y.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;e;){let a=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,y=>" ".repeat(3*y.length)),h=e.split(`
`,1)[0],S=!f.trim(),$=0;if(this.options.pedantic?($=2,p=f.trimStart()):S?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,p=f.slice($),$+=t[1].length),S&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let y=this.rules.other.nextBulletRegex($),D=this.rules.other.hrRegex($),N=this.rules.other.fencesBeginRegex($),X=this.rules.other.headingBeginRegex($),K=this.rules.other.htmlBeginRegex($);for(;e;){let P=e.split(`
`,1)[0],R;if(h=P,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),R=h):R=h.replace(this.rules.other.tabCharGlobal,"    "),N.test(h)||X.test(h)||K.test(h)||y.test(h)||D.test(h))break;if(R.search(this.rules.other.nonSpaceChar)>=$||!h.trim())p+=`
`+R.slice($);else{if(S||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||N.test(f)||X.test(f)||D.test(f))break;p+=`
`+h}!S&&!h.trim()&&(S=!0),d+=P+`
`,e=e.substring(P.length+1),f=R.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let d=a.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ii(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ii(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Vr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=$d(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Li(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Li(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+i);if(Math.min(s,i)%2){let S=f.slice(1,-1);return{type:"em",raw:f,text:S,tokens:this.lexer.inlineTokens(S)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ft=class ws{constructor(t){je(this,"tokens");je(this,"options");je(this,"state");je(this,"inlineQueue");je(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||mr,this.options.tokenizer=this.options.tokenizer||new Rn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:xt,block:Tn.normal,inline:Yr.normal};this.options.pedantic?(r.block=Tn.pedantic,r.inline=Yr.pedantic):this.options.gfm&&(r.block=Tn.gfm,this.options.breaks?r.inline=Yr.breaks:r.inline=Yr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Tn,inline:Yr}}static lex(t,r){return new ws(r).lex(t)}static lexInline(t,r){return new ws(r).inlineTokens(t)}lex(t){t=t.replace(xt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(xt.tabCharGlobal,"    ").replace(xt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},t,r))?(t=t.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(t,n,l)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),r.push(a);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(S=>{h=S.call({lexer:this},f),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(a=this.tokenizer.inlineText(d)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},In=class{constructor(e){je(this,"options");je(this,"parser");this.options=e||mr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(xt.notSpaceStart)?.[0],s=e.replace(xt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Yt(n)+'">'+(r?s:Yt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Yt(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Yt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Ri(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Yt(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ri(e);if(s===null)return Yt(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Yt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Yt(e.text)}},Ls=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qt=class $s{constructor(t){je(this,"options");je(this,"renderer");je(this,"textRenderer");this.options=t||mr,this.options.renderer=this.options.renderer||new In,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ls}static parse(t,r){return new $s(r).parse(t)}static parseInline(t,r){return new $s(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},En,Kr=(En=class{constructor(e){je(this,"options");je(this,"block");this.options=e||mr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ft.lex:Ft.lexInline}provideParser(){return this.block?qt.parse:qt.parseInline}},je(En,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),je(En,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),En),Sd=class{constructor(...e){je(this,"defaults",xs());je(this,"options",this.setOptions);je(this,"parse",this.parseMarkdown(!0));je(this,"parseInline",this.parseMarkdown(!1));je(this,"Parser",qt);je(this,"Renderer",In);je(this,"TextRenderer",Ls);je(this,"Lexer",Ft);je(this,"Tokenizer",Rn);je(this,"Hooks",Kr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new In(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Rn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Kr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Kr.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&Kr.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await l.call(s,d);return a.call(s,f)})();let p=l.call(s,d);return a.call(s,p)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(s,d);return f===!1&&(f=await a.apply(s,d)),f})();let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ft.lex(e,t??this.defaults)}parser(e,t){return qt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?qt.parse:qt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?qt.parse:qt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Yt(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},_r=new Sd;function qe(e,t){return _r.parse(e,t)}qe.options=qe.setOptions=function(e){return _r.setOptions(e),qe.defaults=_r.defaults,Di(qe.defaults),qe};qe.getDefaults=xs;qe.defaults=mr;qe.use=function(...e){return _r.use(...e),qe.defaults=_r.defaults,Di(qe.defaults),qe};qe.walkTokens=function(e,t){return _r.walkTokens(e,t)};qe.parseInline=_r.parseInline;qe.Parser=qt;qe.parser=qt.parse;qe.Renderer=In;qe.TextRenderer=Ls;qe.Lexer=Ft;qe.lexer=Ft.lex;qe.Tokenizer=Rn;qe.Hooks=Kr;qe.parse=qe;var Vf=qe.options,Kf=qe.setOptions,Zf=qe.use,Xf=qe.walkTokens,Qf=qe.parseInline;var Jf=qt.parse,e_=Ft.lex;function rr(e){let t=qe.parse(e),r=$i.sanitize(t);return Ai(r)}function Vt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Er(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function On(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Ad={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Td=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ed=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function nr(e){return!!e&&typeof e=="object"}function Ds(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Hi(e,t){let r=Ds(e),n=Ds(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Cd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>nr(s)&&typeof s.text=="string"?s.text:"").join(""):nr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Rd(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Ad[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Ds(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Hi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Hi(nr(l)?l.old_string:"",nr(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Wi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Gi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Td.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Ed.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Id(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(nr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Gi(o.text));else if(o.type==="thinking"){let i=Wi(o.thinking);i&&s.push(i)}else if(o.type==="tool_use"){let i=Rd(o);typeof o.id=="string"&&t.set(o.id,i),s.push(i)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(nr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let i=Cd(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Ld(e){if(e.type==="item.completed"&&nr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Gi(t.text)];if(t.type==="reasoning"){let r=Wi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Dd(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Yi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!nr(o))continue;let i=Dd(o)?Ld(o):Id(o,r);for(let l of i)t.push(l)}return t}var Od=5,Pd=10,Md=/Task\s+#(\d+)/,Nd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Fd=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Pn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function qd(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Bd(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Ud(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let a=Md.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!a||d.length===0)continue;t.set(a[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function jd(e){if(e.tool==="Bash"){let t=e.command||"";return Nd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Fd.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function zd(e){let t=e.filter(s=>s.kind==="tool").slice(-Pd),r=new Map;t.forEach((s,o)=>{let i=jd(s);if(!i)return;let l=r.get(i)||{count:0,last:-1};l.count+=1,l.last=o,r.set(i,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Hd(e){let t=Bd(e);if(t)return{text:t,guess:!1};let r=Ud(e);if(r)return{text:r,guess:!1};let n=zd(e);return n?{text:n,guess:!0}:null}function Wd(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ct(e,t)}function Mn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,i={},l=!0,a=new Set,d=new Set,p=null,f=null,h=!1,S=!1,$=!1,y=null,D=null;function N(){h=!1,S=!1,$=!1,y=null,D=null}async function X(U){if(r){S=!0,$=!1,L();try{let O=await Promise.resolve(r("get-attempt-prompt",{attempt_id:U}));if(o!==U)return;!O||typeof O!="object"||Array.isArray(O)?$=!0:(y=O,D=U)}catch{o===U&&($=!0)}finally{o===U&&(S=!1,L())}}}function K(){if(h=!h,h&&o&&D!==o){X(o);return}L()}function P(){if(!h)return"";let U=Er({loading:S,error:$});if(U)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${U}
      </div>`;if(!y)return"";if(y.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let O=On(y.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${O?c`<div class="prompt-block__meta">${O} 발송</div>`:""}
      ${typeof y.task_prompt=="string"?Vt("\uACFC\uC5C5 (user)",y.task_prompt):""}
      ${typeof y.system_prompt=="string"?Vt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",y.system_prompt):""}
    </div>`}function R(){if(!o||!n)return[];let U=n.get(o);return Yi(U?U.lines:[])}function A(){if(!o||!n)return null;let U=n.get(o),O=U?U.last_event_at:null;return typeof O=="number"?O:null}function C(){return i.status==="running"}function B(){if(C()&&o){f||(f=setInterval(()=>L(),1e3));return}de()}function de(){f&&(clearInterval(f),f=null)}function $e(U){let O=[],ne=0;for(;ne<U.length;){let Se=U[ne];if(Se.kind==="tool"){let Re=ne;for(;Re<U.length&&U[Re].kind==="tool"&&U[Re].tool===Se.tool;)Re+=1;if(Re-ne>=Od&&!d.has(ne)){O.push({kind:"group",idx:ne,tool:Se.tool||"",lines:U.slice(ne,Re).map((F,j)=>({idx:ne+j,line:F}))}),ne=Re;continue}}O.push({kind:"line",idx:ne,line:Se}),ne+=1}return O}function fe(U){for(let O=U.length-1;O>=0;O-=1){let ne=U[O];if(ne.kind==="result"||ne.kind==="error")return null;if(ne.kind==="tool"&&!Object.hasOwn(ne,"result"))return ne}return null}function ue(U){for(let O=U.length-1;O>=0;O-=1)if(U[O].kind==="thinking")return U[O];return null}function Ee(U,O){if(O.kind==="gate")return c`<div class="sv__gate">${O.text}</div>`;if(O.kind==="phase")return c`<div class="sv__phase">${O.text}</div>`;if(O.kind==="result")return c`<div
        class="sv__result${O.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${O.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${rr(O.text||(O.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(O.kind==="thinking"){let ne=a.has(U);return c`<div
        class="sv__think${ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(U)}
      >
        <span class="sv__think-line">💭 ${Pn(O.text)}</span>
        ${ne?c`<pre class="sv__think-expand">${O.text}</pre>`:""}
      </div>`}if(O.kind==="error")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="blocker")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="tool"){let ne=a.has(U),Se=O.tool==="Bash"?qd(O.command):0,Re=O.tool==="Bash"?Se>1?Pn(O.command):O.command:O.path||O.command||"";return c`<div
        class="sv__tool${ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>me(U)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${O.icon}</span>
          <span class="sv__tool-name">${O.tool}</span>
          ${Re?c`<span class="sv__tool-detail">${Re}</span>`:""}
          ${Se>1?c`<span class="sv__tool-more">⋯ ${Se}줄</span>`:""}
          ${typeof O.added=="number"?c`<span class="sv__diff-add">+${O.added}</span>`:""}
          ${typeof O.removed=="number"?c`<span class="sv__diff-del">−${O.removed}</span>`:""}
          ${O.result?c`<span class="sv__tool-ok">→ ${O.result}</span>`:""}
        </span>
        ${ne?c`<pre class="sv__tool-expand">${Ue(O)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${rr(O.text||"")}</div>`}function Ue(U){let O=[];if(U.tool==="Bash"&&typeof U.command=="string"&&U.command.length>0)O.push(U.command);else if(U.input!==void 0)try{O.push(`input: ${JSON.stringify(U.input,null,2)}`)}catch{}return typeof U.output=="string"&&U.output.length>0&&O.push(`output:
${U.output}`),O.join(`

`)}function Ke(){if(!o)return c``;let U=R(),O=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),ne=i.session_id||"",Se=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,Re=C(),F=Re?Wd(A(),Date.now()):"",j=Re?fe(U):null,M=Re?ue(U):null,ae=Hd(U);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ae?c`<span
              class="sv__stage${ae.guess?" sv__stage--guess":""}"
              title=${ae.text}
              >${ae.text}</span
            >`:""}
        ${Re?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${F?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${F}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${F?c`<span class="sv__live-ago">${F}</span>`:""}</span
            >`:""}
        ${ne?c`<button
              type="button"
              class="sv__session"
              title=${ne}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ne}`}
              @click=${()=>we(ne)}
            >
              ⧉ ${ne.slice(0,8)}
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
          @click=${K}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Se}
          @click=${oe}
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
        ${U.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:$e(U).map(ce=>ce.kind==="group"?ze(ce):Ee(ce.idx,ce.line))}
      </div>
      ${j||M?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${j?c`<span class="sv__now-icon">${j.icon}</span>
                  <span class="sv__now-name">${j.tool}</span>
                  <span class="sv__now-detail"
                    >${j.tool==="Bash"?Pn(j.command):j.path||j.command||""}</span
                  >`:""}
            ${M?c`<span class="sv__now-think"
                  >💭 ${Pn(M.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ze(U){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>xe(U.idx)}
    >
      <span class="sv__group-icon">${U.lines[0].line.icon}</span>
      <span class="sv__group-name">${U.tool}</span>
      <span class="sv__group-count">${U.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function xe(U){d.add(U),L()}function L(){Pe(Ke(),e),B(),l&&z()}function z(){let U=e.querySelector(".sv__body");U&&(U.scrollTop=U.scrollHeight)}function me(U){a.has(U)?a.delete(U):a.add(U),L()}function oe(){l=!l,L()}function we(U){fr(U).then(O=>{O?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ge(U){!o||!U||(i={...i,...U},L())}function Be(U){let O=U.target;if(!O||!O.classList||!O.classList.contains("sv__body"))return;!(O.scrollHeight-O.scrollTop-O.clientHeight<=4)&&l&&(l=!1,L())}e.addEventListener("scroll",Be,!0);function be(U){let O=U&&U.attempt_id;O&&(o=O,i=U.meta||{},l=!0,a.clear(),d.clear(),N(),!p&&n&&(p=n.subscribe(L)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),L())}function Ce(){let U=o;o=null,a.clear(),d.clear(),N(),de(),r&&U&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${U}`})).catch(()=>{}),Pe(c``,e),s&&s()}return{open:be,updateMeta:ge,close:Ce,isOpen(){return o!==null},destroy(){de(),p&&(p(),p=null),e.removeEventListener("scroll",Be,!0),o=null,Pe(c``,e)}}}function Qr(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Vi(t.spec_id),s=Vi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Vi(e){return typeof e=="string"?e.trim():""}function Gd(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Yd(e){let t=e&&e.metadata||{},r=Qr(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Gd(t)?null:"plan_pending"}),n}function Ki(e,t){let r=Yd(e);return c`
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
  `}var Vd="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Kd=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Zd=/^\*\*결론\*\* — (.+)$/;function Zi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Vd)return null;let r=Kd.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Zd.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",d=l?i+1:i;return{lane:n,identifier:s,timestamp:o,conclusion:a,body:t.slice(d).join(`
`).trim()}}var Xi=20;function Qi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Xd(e){return e.length>Xi?`${e.slice(0,Xi)}\u2026`:e}function Qd(e,t,r,n){let s=`${t.lane} ${Xd(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Qi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${rr(t.body)}
        </div>`:""}
  </div>`}function Jd(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Qi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${rr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ji(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",i=r.sending===!0,l=n.slice().sort((a,d)=>String(d.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let d=Zi(typeof a.text=="string"?a.text:"");return d?Qd(a,d,t,s.has(a.id)):Jd(a)})}
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
  `}var eu=["codex","opus","fable","self","skip"],tu=["codex","fable","skip"],ru=["low","medium","high","xhigh"],nu=["standard","fast_track"],Cr=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],Ps={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},ea={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},su=["self","skip"],ou="opus",Ms={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Ns(e){let t=Ps[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function iu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:Ms[e]||"(\uAE30\uBCF8)"}function Jr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function en(e){if(!Jr(e)||!Jr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Jr(r)&&Jr(r.models));return t.length>0?t:null}function Os(e){return{value:e,label:e}}function Fs(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function ta(e,t,r=null){let n=en(e);if(!n)return t?[{label:null,options:[Os(t)]}]:[];let s=n.filter(([i])=>r===null||i===r).map(([i,l])=>({label:i,options:Object.keys(l.models).map(Os)})),o=s.some(i=>i.options.some(l=>l.value===t));return t&&!o?[Fs(t),...s]:s}function gr(e,t){let r={label:null,options:e.map(Os)};return t&&!e.includes(t)?[Fs(t),r]:[r]}function Kt(e,t){let r=en(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function sa(e,t){return Jr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Nn(e,t){let r=en(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return sa(n,n.models[t]);return[]}function oa(e){let t=en(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of sa(n,s))r.includes(o)||r.push(o);return r}function ia(e,t){if(!t)return oa(e);let n=en(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let i of Nn(e,o))s.includes(i)||s.push(i);return s}function qn(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Kt(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let i=n.impl_model?Nn(t,n.impl_model):ia(t,s);return n.impl_effort&&i.length>0&&!i.includes(n.impl_effort)&&(n.impl_effort=""),n}function Rr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||ou,i=r("impl_model"),l=r("impl_runtime"),a=l==="claude"||l==="codex"?l:l==="inherit"?s===void 0?Kt(n,o):s:null;return Cr.map(d=>{let p=t(d),f,h=!1;return d==="orchestration_model"?f=ta(n,p):d==="impl_runtime"?f=gr(["inherit","claude","codex"],p):d==="impl_model"?(f=a?ta(n,p,a):p?[Fs(p)]:[],h=l==="inherit"&&a===null):d==="orchestration_effort"?f=gr(Nn(n,o),p):d==="impl_effort"?(f=gr(i?Nn(n,i):a?ia(n,a):oa(n),p),h=l==="inherit"&&a===null):d==="plan_review_model"?f=gr(tu,p):Object.hasOwn(ea,d)?(f=gr(ru,p),h=su.includes(r(ea[d]))):f=gr(eu,p),{key:d,groups:f,selected:p,disabled:h,runner:d==="orchestration_model"?Kt(n,o):null}})}function Fn(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>ra(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>ra(s,t))}
          </optgroup>`)}
  `}function ra(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function na(e,t,r,n,s,o,i){return c`
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
  `}function aa(e,t,r,n,s=""){let o=e&&e.metadata||{},i=r&&typeof r=="object"?r:{},l=f=>typeof o[f]=="string"?o[f]:"",d=Rr({selectedOf:l,effectiveOf:f=>{let h=l(f);return h||(typeof i[f]=="string"?i[f]:"")},runner_catalog:n}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${d.map(f=>na(f.key,Fn(f.groups,f.selected,iu(f.key,i,s)),f.selected,!1,f.disabled,f.runner,t))}
    ${na("workflow_mode",Fn(gr(nu,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function au(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function la(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",a);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${au(s)}</span
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
    `:c``}function p(){Pe(d(),e)}async function f($,y={}){s=$,o="loading",i="",l="",p();let D=r?r():"";if(!D){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let N="/api/doc?workspace="+encodeURIComponent(D)+"&path="+encodeURIComponent($);try{let X=await n(N),K=await X.json().catch(()=>({}));if(!X.ok||!K||K.ok!==!0){if(K?.error==="not_found"&&y.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(K&&K.error||X.status)+")",p();return}i=String(K.content||""),o="ready",p()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,Pe(c``,e)}function S(){document.removeEventListener("keydown",a),h()}return{open:f,close:h,destroy:S}}var lu=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],ua="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function cu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function du(e){let t=ft(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Ar(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${ua}
          >부분 집계</span
        >`:""}`}function ca(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function da(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?pa(t):""}function uu(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let i=ft({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
        ${da(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${da(s.completed_at)}</span
            >`:""}
        ${i?c`<span class="detail-session__usage" title=${i.tooltip}
              >${i.label}</span
            >`:""}
      </div>`}):[]}):""}function pu(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...lu,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${cu(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${ua}</span>`:""}
  </div>`}var fu={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function pa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function _u(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function fa(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let i=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),S=f&&!h,$=f?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!S}
      title=${$}
      @click=${y=>{y.stopPropagation(),S&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,h=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return c`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},a=d=>{let p=ca(us(d));if(ft(p).length===0&&!Ar(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
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
      세션 이력${du(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let p=us(d),f=ca(p),h=ft(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${fu[d.status||""]||"\xB7"}</span
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
            ${h.length>0?h.map(S=>c`<span
                      class="detail-session__usage"
                      title=${S.tooltip}
                      >${S.label}</span
                    >`):Ar(d.usage)?c`<span class="detail-session__usage"
                    >${Ar(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${pa(d.started_at)}</span>
          </button>
          ${a(d)} ${i(d)} ${l(d)} ${_u(d)}
          ${s.has(d.attempt_id)&&d.usage?pu(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${uu(p)}
        </div>`})}
    </div>
  `}function _a(e,t={}){return c`
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
          ${mu(e)}
        </div>`:""}
  `}function mu(e){let t=Er(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Vt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=On(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Vt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Vt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var gu=["open","in_progress","deferred","resolved","closed"],hu=[0,1,2,3,4];function ma(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,d=null,p=null,f={},h="",S=!1,$=!1,y=!1,D="",N="",X="";function K(){$=!1,y=!1,D="",N="",X=""}let P=[],R=null,A=null,C=!1,B="",de=!1,$e=0,fe=new Set;function ue(){P=[],R=null,A=null,C=!1,B="",de=!1,$e+=1,fe.clear()}async function Ee(g){if(!s)return;let I=++$e;try{let x=await Promise.resolve(s("get-comments",{id:g}));if(I!==$e||g!==d)return;P=Array.isArray(x)?x:[],C=!1}catch{if(I!==$e||g!==d)return;C=!0}Z()}function Ue(){if(!s||!d)return;let g=p&&typeof p.comment_count=="number"?p.comment_count:null;if(R!==d){R=d,A=g,Ee(d);return}g!==null&&g!==A&&(A=g,Ee(d))}function Ke(g){fe.has(g)?fe.delete(g):fe.add(g),Z()}function ze(g){let I=B.trim().length===0;B=g,I!==(g.trim().length===0)&&Z()}async function xe(){let g=B.trim();if(!s||!d||g.length===0||de)return;let I=d;de=!0,Z();let x=!1;try{let V=await Promise.resolve(s("add-comment",{id:I,text:g}));Array.isArray(V)&&V.length>0&&(x=!0,I===d&&(P=V,C=!1,B="",A=V.length))}catch{x=!1}x||se("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),I===d&&(de=!1),Z()}let L={onToggle:Ke,onDraftInput:ze,onSubmit:xe},z=document.createElement("div");z.className="md-viewer-root",document.body.appendChild(z);let me=la(z,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),oe=document.createElement("div");oe.className="session-log-root",document.body.appendChild(oe);let we=Mn(oe,{transport:s?(g,I)=>Promise.resolve(s(g,I)):void 0,sessionLogStore:a}),ge=!1,Be=!1,be=!1,Ce=null,U=null,O=0;function ne(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function Se(){ge=!1,Be=!1,be=!1,Ce=null,U=null,O+=1}async function Re(g){if(!s)return;let I=++O;Be=!0,be=!1,Z();try{let x=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(I!==O)return;!x||typeof x!="object"||Array.isArray(x)?be=!0:(Ce=x,U=ne(g))}catch{I===O&&(be=!0)}finally{I===O&&(Be=!1,Z())}}function F(){if(ge=!ge,ge&&d&&U!==ne(d)){Ce=null,Re(d);return}Z()}function j(){if(!i||!d)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(x=>x&&x.bead_id===d).sort((x,V)=>(V.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,exec_default_preset_id:typeof x.exec_default_preset_id=="string"?x.exec_default_preset_id:null,exec_default_preset_revision:typeof x.exec_default_preset_revision=="number"?x.exec_default_preset_revision:null,exec_values:x.exec_values&&typeof x.exec_values=="object"?x.exec_values:null,usage:x.usage||null,usage_legs:Array.isArray(x.usage_legs)?x.usage_legs:[]}))}function M(){if(!i||!d)return null;let g=i.get();return Mt(g&&g.attempts||{},d)}let ae=new Set;function ce(g){ae.has(g)?ae.delete(g):ae.add(g),Z()}function k(g){let I=i?i.get():null,x=I&&I.attempts?I.attempts[g]:null;we.open({attempt_id:g,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function G(g){if(!s||!g)return;let I=()=>{let V=i?i.get():null;return V&&typeof V.revision=="number"?V.revision:0},x=await s("worker-attempt-resume",{attempt_id:g,expected_revision:I()});if(x&&x.conflict){let V=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:I();x=await s("worker-attempt-resume",{attempt_id:g,expected_revision:V})}x&&x.resumed===!1&&!x.conflict&&x.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let W={onOpen:k,onResume:G,onToggleUsage:ce};function ee(){let g=i?i.get():null,I=g&&g.default_exec_preset_id,x=typeof I=="string"?Ze()?.presets.find(V=>V.id===I):null;return x&&x.compatible!==!1&&x.settings?x.settings:{}}function pe(){let g=i?i.get():null,I=g&&g.default_exec_preset_id,x=typeof I=="string"?Ze()?.presets.find(V=>V.id===I):null;return x&&x.compatible!==!1&&typeof x.name=="string"?x.name:""}function Te(){let g=i?i.get():null;return g&&g.runner_catalog||null}function Ne(){let g=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},x=(Object.hasOwn(f,"orchestration_model")?f.orchestration_model:void 0)||(typeof g.orchestration_model=="string"?g.orchestration_model:"")||(typeof ee().orchestration_model=="string"?ee().orchestration_model:"")||"opus";return Kt(Te(),x)}function Ze(){let g=l?l.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function Xe(g){let I=g&&g.settings&&typeof g.settings=="object"?g.settings:{},x=V=>typeof I[V]=="string"?I[V]:V==="impl_runtime"&&typeof I.impl_model=="string"&&Kt(Te(),I.impl_model)||"";return Rr({selectedOf:x,effectiveOf:x,runner_catalog:Te()}).some(V=>V.groups.some(Me=>Me.options.some(nt=>nt.value===V.selected&&nt.label.endsWith("(\uBE44\uD638\uD658)"))))}function lt(g){l&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&l.set({revision:g.revision,presets:g.presets})}async function st(){let g=Ze(),I=g?.presets.find(x=>x.id===h);if(!(!s||!d||!g||!I||Xe(I)||S)){S=!0,Z();try{let x=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:I.id,expected_revision:g.revision}));if(x&&x.conflict){lt(x),se("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let V=x&&Array.isArray(x.issue)?x.issue[0]:x?.issue;if(x&&x.applied&&V&&typeof V=="object"){p=V;for(let Me of Cr)delete f[Me];se("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}x&&x.error==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(x){x&&typeof x=="object"&&x.code==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{S=!1,Z()}}}function _t(){let g=Ze();if(g&&g.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let I=g?g.presets:[],x=I.find(Me=>Me.id===h),V=x?Xe(x):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${g===null||S}
          @change=${Me=>{h=Me.target.value,Z()}}
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
          ?disabled=${g===null||!x||V||S}
          @click=${()=>{st()}}
        >
          11개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let vt=null;r&&r.subscribe&&(vt=r.subscribe(()=>mt()));let De=null;i&&typeof i.subscribe=="function"&&(De=i.subscribe(()=>{d&&Z()}));let ot=null;l&&typeof l.subscribe=="function"&&(ot=l.subscribe(()=>{d&&Z()}));function We(g){g.key==="Escape"&&d&&(g.preventDefault(),n())}document.addEventListener("keydown",We);function mt(){if(d){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+d)||[];p=g.find(x=>x&&x.id===d)||g[0]||p}Ue(),Z()}}function ct(g){fr(g).then(I=>{I?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function rt(g){g.preventDefault(),g.stopPropagation(),d&&ct(d)}function it(g,I){g.preventDefault(),g.stopPropagation(),ct(I)}function gt(g,I,x){g.preventDefault(),g.stopPropagation(),me.open(I,{missing_state:x})}function Je(g,I){f[g]=I,Z(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:g,value:I})).catch(()=>{se("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function yt(g,I){let x=p||{},V=x.metadata&&typeof x.metadata=="object"?x.metadata:{},Me={};for(let Oe of["impl_runtime","impl_model","impl_effort"])Me[Oe]=Object.hasOwn(f,Oe)?f[Oe]:typeof V[Oe]=="string"?V[Oe]:"";Me[g]=I;let nt=qn(Me,Te(),Ne()),ht={};for(let Oe of["impl_runtime","impl_model","impl_effort"])ht[Oe]=f[Oe],f[Oe]=nt[Oe]||"";Z(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...nt,orchestration_runtime:Ne()})).then(Oe=>{let Xt=Array.isArray(Oe)?Oe[0]:Oe;if(!Xt||typeof Xt!="object"||!Xt.id)throw new Error("implementation target readback failed");p=Xt;for(let ir of["impl_runtime","impl_model","impl_effort"])delete f[ir];Z()}).catch(()=>{for(let Oe of["impl_runtime","impl_model","impl_effort"])ht[Oe]===void 0?delete f[Oe]:f[Oe]=ht[Oe];Z(),se("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Qe(g,I,x){if(!s||!d)return!1;try{let V=await Promise.resolve(s(g,I)),Me=Array.isArray(V)?V[0]:V;return Me&&typeof Me=="object"&&Me.id?(p=Me,!0):(se(x,"error"),!1)}catch{return se(x,"error"),!1}}function dt(g){setTimeout(()=>{try{let I=e.querySelector(g);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function ut(){$=!0,D=p&&p.title||"",Z(),dt('.detail-edit__input[data-edit="title"]')}function E(g){D=g.target.value}function q(){$=!1,D="",Z()}function te(){Qe("edit-text",{id:d,field:"title",value:D},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&($=!1,D=""),Z()})}function u(){y=!0,N=p&&p.description||"",Z(),dt('.detail-edit__textarea[data-edit="description"]')}function m(g){N=g.target.value}function T(){y=!1,N="",Z()}function Q(){Qe("edit-text",{id:d,field:"description",value:N},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(y=!1,N=""),Z()})}function he(g,I,x,V){if(g.key==="Escape"){g.stopPropagation(),x();return}g.key==="Enter"&&(!V||g.ctrlKey||g.metaKey)&&(g.preventDefault(),I())}function Ae(g){let I=g.target.value;Qe("update-status",{id:d,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function ye(g){let I=Number(g.target.value);Qe("update-priority",{id:d,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function ie(g){X=g.target.value}function Ie(){let g=X.trim();g.length!==0&&Qe("label-add",{id:d,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I&&(X=""),Z()})}function Ge(g){if(g.key==="Escape"){g.stopPropagation(),X="",Z();return}g.key==="Enter"&&(g.preventDefault(),Ie())}function ke(g){Qe("label-remove",{id:d,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Z())}let at={onCopyPath:it,onOpenDoc:gt},Tt={onChange:Je,onImplTargetChange:yt};function St(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function et(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Et(g){let x=(Array.isArray(g.dependencies)?g.dependencies:[]).map(V=>({id:St(V),icon:et(V)})).filter(V=>V.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${x.map(V=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(V.id)}
                  >
                    ${V.icon?`${V.icon} `:""}${V.id}
                  </button>`:c`<span class="detail-dep"
                    >${V.icon?`${V.icon} `:""}${V.id}</span
                  >`)}
          </div>`}
    `}function ve(g){let I=g.metadata||{},x=g.workflow||{},V=x.stages||{},Me=V.spec&&V.spec.stale,nt=V.impl&&V.impl.stale,ht=V.plan||null,Oe=x.route_source==="derived",Xt=x.route||I.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Oe?" detail-kv__v--derived":""}"
          title=${Oe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Oe?"unset":Xt}</span
        >
      </div>
      ${x.route!=="quick_fix"||Object.hasOwn(I,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${I.spec_review||"\uC5C6\uC74C"}${Me?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ht?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ht?.approval_receipt||"\uC5C6\uC74C"}${ht?.approval_state==="stale"?" \xB7 stale":ht?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${x.route!=="quick_fix"||Object.hasOwn(I,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${I.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let Ye={route:["quick_fix","spec_backed","full_plan"]};async function Dt(g,I){let x=I.target.value;if(g==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Z();return}await Qe("update-workflow-meta",{id:d,key:g,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Z()}function Zt(g){let I=g.metadata||{};return c` ${((V,Me)=>{let nt=Ye[V],ht=typeof I[V]=="string"?I[V]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${V}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${V}
          data-edit=${`wfmeta-${V}`}
          @change=${Oe=>Dt(V,Oe)}
        >
          <option value="" ?selected=${!nt.includes(ht)}>
            ${Me}
          </option>
          ${nt.map(Oe=>c`<option value=${Oe} ?selected=${ht===Oe}>${Oe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function le(g,I){return $?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${D}
            @input=${E}
            @keydown=${x=>he(x,te,q,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${te}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${q}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        ${ft(I).map(x=>c`<span class="detail-usage-total" title=${x.tooltip}
              >${x.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ut}
        >
          ✎
        </button>
      </div>
    `}function b(g){let I=bt(g.created_at),x=bt(g.updated_at);return!I&&!x?c``:c`
      ${I?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${x?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function H(g,I){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ae}
        >
          ${gu.map(x=>c`<option value=${x} ?selected=${x===g}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ye}
        >
          ${hu.map(x=>c`<option value=${String(x)} ?selected=${x===I}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function _(g){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${y?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${u}
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
              .value=${N}
              @input=${m}
              @keydown=${I=>he(I,Q,T,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Q}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${T}
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
        ${I.map(x=>c`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>ke(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${X}
            @input=${ie}
            @keydown=${Ge}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ie}
          >
            추가
          </button>
        </span>
      </div>
    `}function re(){if(!d)return c``;let g=p||{},I=String(g.id||d),x=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",V=M(),Me=g.status||"open",nt=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",ht=g.description||"",Oe={...g,metadata:{...g.metadata||{},...f}};return c`
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
            @click=${rt}
          >
            ${I}
          </button>
          ${le(x,V)}
          ${H(Me,nt)} ${b(g)}
          ${_(ht)}
          ${Ji(P,L,{expanded:fe,draft:B,sending:de,error:C})}
          ${v(g)} ${J(g)} ${Et(g)}
          ${ve(g)} ${Zt(g)}
          ${Ki(g,at)}
          ${_t()}
          ${aa(Oe,Tt,ee(),Te(),pe())}
          ${_a({expanded:ge,loading:Be,error:be,data:Ce},{onToggle:F})}
          ${fa(j(),W,{total:V,expanded:ae})}
        </div>
      </div>
    `}function Z(){Pe(re(),e)}return{load(g){g!==d&&(f={},h="",K(),ue(),Se()),d=g,p=null,mt()},clear(){d=null,p=null,f={},h="",S=!1,K(),ue(),Se(),me.close(),we.close(),Pe(c``,e)},destroy(){vt&&(vt(),vt=null),De&&(De(),De=null),ot&&(ot(),ot=null),document.removeEventListener("keydown",We),me.destroy(),z.parentNode&&z.parentNode.removeChild(z),we.destroy(),oe.parentNode&&oe.parentNode.removeChild(oe),d=null,p=null,h="",S=!1,ue(),Se(),Pe(c``,e)}}}var bu=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ga(e,t){return ls(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function vu(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function ha(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let i="";async function l(A){let C=r.get();if(C)try{let B=await n("display-policy-set",{expected_revision:C.revision,policy:A(C)});a(B),B&&B.conflict&&B.policy&&(B=await n("display-policy-set",{expected_revision:B.policy.revision,policy:A(B.policy)}),a(B)),B&&B.conflict&&se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function d(A){let C=r.get();if(!C)return;let B=ga(A,C)!=="shown";l(de=>vu(A,de,B))}function p(){let A=i.trim();A.length!==0&&(i="",l(C=>C.hidden_prefixes.includes(A)?{hidden_prefixes:C.hidden_prefixes}:{hidden_prefixes:[...C.hidden_prefixes,A]}),D())}function f(A){l(C=>({hidden_prefixes:C.hidden_prefixes.filter(B=>B!==A)}))}function h(A){let C=r.get();if(!C)return;let B=C.chips[A]===!1;l(()=>({chips:{[A]:B}}))}function S(A){let C=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${C.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${C.map(B=>{let de=ga(B,A);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${de}`}
                  data-label=${B}
                  data-state=${de}
                  @click=${()=>d(B)}
                >
                  ${B}
                </button>`})}
            </div>`}
      </section>
    `}function $(A){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(C=>c`<span class="display-settings__prefix">
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
    `}function y(A){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${bu.map(([C,B])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${C}
                  .checked=${A.chips[C]!==!1}
                  @change=${()=>h(C)}
                />
                <span>${B}</span>
              </label>`)}
        </div>
      </section>
    `}function D(){let A=r.get();Pe(c`
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
            ${A?c`${S(A)} ${$(A)}
                ${y(A)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let N=!1,X=()=>{N=!1};o.addEventListener("close",X),o.addEventListener("cancel",X);let K=null;r.subscribe&&(K=r.subscribe(()=>{N&&D()}));function P(){N||(i="",N=!0,D(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function R(){N&&(N=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:R,destroy(){N=!1,o.removeEventListener("close",X),o.removeEventListener("cancel",X),K&&(K(),K=null),o.remove()}}}function ba(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(d,p,f="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}function va(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function ya(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var yu={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ka=160;function ku(e){return e.length>ka?`${e.slice(0,ka)}\u2026`:e}function Bn(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,i=document.createElement("dialog");i.id="worker-exec-defaults-dialog",i.className="exec-defaults",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=null,a=!1;function d(){return r&&r.get()||{revision:0,exec_defaults:{}}}function p(){let k=d();return typeof k.revision=="number"?k.revision:0}function f(){let k=n?n.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function h(k){n&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&n.set({revision:k.revision,presets:k.presets})}function S(k){k&&k.queue&&r&&r.set(k.queue)}function $(){return d().runner_catalog??null}let y=null;function D(){if(y!==null)return y;let k=d().default_exec_preset_id;return typeof k=="string"&&k.length>0?k:null}async function N(k){if(!s)return;let G=f();if(!G)return;y=k||"";let W=R(k);if(ne(),!W.viable){se(W.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let ee=await s("worker-queue-set-default-exec-preset",{preset_id:k||null,expected_queue_revision:p(),expected_preset_revision:G.revision});if(S(ee),ee&&ee.presets&&n&&n.set(ee.presets),ee&&ee.conflict){se("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(ee&&ee.applied){y=null,ne();return}se("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{se("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function X(k){l={id:k.id,name:k.name,settings:{...k.settings||{}}},C(),a=!1,ne()}function K(){l={id:null,name:"",settings:{}},a=!1,ne()}function P(k){let G=k&&k.settings&&typeof k.settings=="object"?k.settings:{},W=ee=>typeof G[ee]=="string"?G[ee]:ee==="impl_runtime"&&typeof G.impl_model=="string"&&Kt($(),G.impl_model)||"";return Rr({selectedOf:W,effectiveOf:W,runner_catalog:$()}).some(ee=>ee.groups.some(pe=>pe.options.some(Te=>Te.value===ee.selected&&Te.label.endsWith("(\uBE44\uD638\uD658)"))))}function R(k){if(!k)return{viable:!0,missing:!1,incompatible:!1,preset:null};let W=f()?.presets.find(pe=>pe.id===k);if(!W||W.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let ee=W.compatible===!1||P(W);return{viable:!ee,missing:!1,incompatible:ee,preset:W}}function A(){let k=l?.settings.orchestration_model;return typeof k!="string"?null:Kt($(),k)}function C(){if(!l)return;let k=qn({impl_runtime:l.settings.impl_runtime||"",impl_model:l.settings.impl_model||"",impl_effort:l.settings.impl_effort||""},$(),A());for(let G of["impl_runtime","impl_model","impl_effort"])k[G]?l.settings[G]=k[G]:delete l.settings[G]}function B(k){let G=k&&k.settings&&typeof k.settings=="object"?k.settings:{},W=Cr.filter(pe=>typeof G[pe]=="string").length,ee=Cr.filter(pe=>typeof G[pe]=="string").map(pe=>`${Ps[pe]?.title||pe}: ${G[pe]}`);return{count:`${W}/11 \uC9C0\uC815`,choices:ee.length>0?ee.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function de(k){if(!s||!window.confirm(`\u201C${k.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let G=f();if(G)try{let W=await s("exec-preset-delete",{expected_revision:G.revision,id:k.id});h(W),W&&W.conflict&&se("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{se("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function $e(k=!1){if(!s||!l)return;let G=f();if(!G)return;let W=k||l.id===null,ee={expected_revision:G.revision,...W?{}:{id:l.id},name:l.name,settings:{...l.settings}};try{let pe=await s(W?"exec-preset-create":"exec-preset-update",ee);if(h(pe),pe&&pe.conflict){a=!0,ne();return}if(pe&&pe.applied){l=null,a=!1,ne();return}se("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{se("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function fe(k){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Ns(k.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${k.key}
        ?disabled=${k.disabled}
        @change=${G=>{if(!l)return;let W=G.target.value;W?l.settings[k.key]=W:delete l.settings[k.key],(k.key==="impl_runtime"||k.key==="impl_model"||k.key==="impl_effort"||k.key==="orchestration_model")&&C(),a=!1,ne()}}
      >
        ${Fn(k.groups,k.selected,Ms[k.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function ue(){if(!l)return"";let k=pe=>typeof l?.settings[pe]=="string"?l.settings[pe]:"",G=Rr({selectedOf:k,effectiveOf:k,runner_catalog:$(),controller_runtime:A()}),W=f(),ee=l.id!==null&&W!==null&&!W.presets.some(pe=>pe.id===l?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${l.name}
          data-preset-name
          @input=${pe=>{l&&(l.name=pe.target.value,a=!1)}}
        />
      </label>
      ${a?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${ee?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${G.map(fe)}
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
          @click=${()=>{l=null,a=!1,ne()}}
        >
          취소
        </button>
      </div>
    </div>`}function Ee(){let k=f(),G=k?k.presets.filter(W=>W?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${K}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${k===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:G.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:G.map(W=>{let ee=B(W),pe=typeof W.reference_count=="number",Te=pe?W.reference_count:null,Ne=Array.isArray(W.reference_summary)?W.reference_summary.map(Ze=>Ze?.display_name||Ze?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${W.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${W.name}</strong>
                  <span>${ee.count}</span>
                  <span data-preset-references=${W.id}
                    >${pe?`\uCC38\uC870 ${Te}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${P(W)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${ee.choices}</small>
                  ${Ne?c`<small data-preset-impact=${W.id}
                        >업데이트 영향: ${Ne}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${W.id}
                    @click=${()=>X(W)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${W.id}
                    ?disabled=${Te===null||Te>0||W.reference_scan_complete===!1}
                    title=${Te===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Te>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":W.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{de(W)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${ue()}
    </section>`}function Ue(){let k=f(),G=k?k.presets.filter(Ne=>Ne?.migration_pending!==!0):[],W=D()||"",ee=R(W),pe=ee.preset,Te=pe?B(pe):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${W}
        ?disabled=${k===null}
        @change=${Ne=>{N(Ne.target.value)}}
      >
        <option value="" ?selected=${W===""}>
          없음 — harness 기본값
        </option>
        ${W&&ee.missing?c`<option value=${W} ?selected=${!0}>
              ${W} (선택한 프리셋 없음)
            </option>`:""}
        ${G.map(Ne=>c`<option
              value=${Ne.id}
              ?selected=${Ne.id===W}
              ?disabled=${Ne.compatible===!1}
            >
              ${Ne.name}${Ne.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${pe?c`<p data-workspace-preset-summary>
            ${Te?.count} · ${Te?.choices}
            ${ee.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${ee.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:ee.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function Ke(){let k=d().workspace_info;return k&&typeof k=="object"?k:{}}function ze(k,G){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${k}"
      >${G}</span
    >`}function xe(k){let G=k?ya(k.cmd):"",W=k?va(k.timeout_ms):"",ee=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${G?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${ze("config","config")}
            ${W?c`<span class="exec-defaults__vd-meta"
                  >timeout ${W}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${ee}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function L(k){let G=k?ya(k.cmd):"",W=k?va(k.timeout_ms):"",ee=W?`timeout ${W} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",pe=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${G?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${ze("config","config")}
            ${k.detached===!0?ze("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${ee}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${pe}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function z(k){if(!k||typeof k!="object")return"";let G=yu[String(k.outcome)];if(!G)return"";let W=k.outcome==="failed"&&k.reason?`${G.label} \xB7 ${k.reason}`:G.label,ee=[bt(k.at),typeof k.bead_id=="string"?k.bead_id:"",typeof k.base_sha=="string"?k.base_sha.slice(0,7):""].filter(Ne=>Ne.length>0).join(" \xB7 "),pe=typeof k.detail=="string"&&k.detail.length>0?ku(k.detail):"",Te=typeof k.log_path=="string"&&k.log_path.length>0?k.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${ze(G.modifier,W)}
        ${ee?c`<span class="exec-defaults__vd-meta">${ee}</span>`:""}
      </div>
      ${pe?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${pe}</code>
          </div>`:""}
      ${Te?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Te}</code>
          </div>`:""}
    </div>`}let me=!1,oe=!1,we=!1,ge=null;async function Be(){if(s){oe=!0,we=!1,ne();try{let k=await Promise.resolve(s("get-worker-system-prompt",{}));!k||typeof k!="object"||Array.isArray(k)?we=!0:ge=k}catch{we=!0}finally{oe=!1,ne()}}}function be(){if(me=!me,me&&!ge){Be();return}ne()}function Ce(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${me?"true":"false"}
          @click=${be}
        >
          ${me?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${me?U():""}
    </section>`}function U(){let k=Er({loading:oe,error:we});if(k)return k;if(!ge)return"";let G=Array.isArray(ge.variants)?ge.variants:[];return c`<div class="exec-defaults__sp-body">
      ${ge.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${ge.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${G.map(W=>c`<div class="exec-defaults__sp-variant" data-variant=${W.key}>
            <div class="exec-defaults__sp-cond">${W.condition}</div>
            ${Vt(W.label,W.system_prompt)}
          </div>`)}
    </div>`}function O(k){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${xe(k.verify_cmd)} ${L(k.deploy_cmd)}
      ${z(k.last_deploy)}
    </section>`}function ne(){if(Pe(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${ce}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Ee()} ${Ue()}
            ${O(Ke())}
            ${Ce()}
          </div>
        </div>
      `,i),y!==null){let k=i.querySelector("[data-workspace-preset-select]");k&&(k.value=y)}}let Se=!1,Re=()=>{Se=!1},F=k=>{k.target===k.currentTarget&&ce()};i.addEventListener("close",Re),i.addEventListener("cancel",Re),i.addEventListener("click",F);let j=null;r&&r.subscribe&&(j=r.subscribe(()=>{Se&&ne()}));let M=null;n&&n.subscribe&&(M=n.subscribe(()=>{Se&&ne()}));function ae(){Se||(Se=!0,ne(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function ce(){Se&&(Se=!1,typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:ae,close:ce,destroy(){Se=!1,i.removeEventListener("close",Re),i.removeEventListener("cancel",Re),i.removeEventListener("click",F),j&&(j(),j=null),M&&(M(),M=null),i.remove()}}}function Ir(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function qs(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=ft(e.usage),s=Pt(e.usage),o=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,l=e.lane==="done"&&!i,a=l?Ct(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,h=c`<span class="worker-mini__title">${e.title}</span>`,S=e.pr_url&&e.pr_number?c`<a
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
        >`:"",y=r.map(B=>B===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${B}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${B===e.completion_badge&&e.completion_title||""}
          >${B}</span
        >`),D=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",N=n.length>0?n.map(B=>c`<span class="worker-usage" title=${B.tooltip}
              >${B.label}</span
            >`):s?c`<span class="worker-usage" title=${Tr(e.usage)}
            >${s}</span
          >`:"",X=o?c`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",K=e.merge_action?c`<button
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
      </button>`:"",A=e.revise_action?c`<button
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
            ${N}${a?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${bt(e.done_at)}`}
                  >완료 ${a}</span
                >`:""}${y}${X}
            <span class="worker-mini__actions"
              >${K}${P}${R}</span
            >
            ${Ir(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${d}${p}${f}${S}${$}${y}${D}
            </div>
            <div class="worker-mini__body">${h}</div>
            ${C?c`<div class="worker-mini__foot">
                  ${N}${X}
                  <span class="worker-mini__actions"
                    >${K}${P}${R}${A}</span
                  >
                </div>`:""}
            ${Ir(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${f}${h}${S}${$}${y}${D}${N}${X}${K}${P}${R}
            </div>
            ${Ir(e)}`}
  </div>`}function wu(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${r?vn(r,e.status):""}
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
    ${Ir(e)}
  </div>`}function jt(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?wu(n):qs(n))}
          </div>`}
  </section>`}var wa=160;function Un(e){return e.length>wa?`${e.slice(0,wa)}\u2026`:e}function $u(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Un(e.command)}</code>`:""}
  </div>`}function xu(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function Su(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function Au(e){return!e||typeof e.verdict!="string"||typeof e.evidence!="string"?"":e.malformed===!0||e.verdict==="malformed"?c`<div class="worker-banner__detail">
      <b>진단 결과 형식 오류</b> · ${Un(e.evidence)}
    </div>`:c`<div class="worker-banner__detail">
    진단: <b>${e.verdict}</b> · 근거:
    ${Un(e.evidence)}
    ${e.verdict==="regression"&&e.fix_bead_id?c` · 수정 bead: ${e.fix_bead_id}`:""}
  </div>`}function Bs(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function $a(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
          ${$u(e.failure.cause_detail)}
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
          ${Au(r.diagnosis)}
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${Un(r.detail)}</code>
              </div>`:""}
          ${Su(r.log_path)} ${xu(r.output_tail)}
        </div>`)}
  </div>`}function Tu(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Bs(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),i=ft(e.usage),l=Pt(e.usage),a=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,d=e.base_exception||null,p=e.attempt_id&&e.attempt_id===r;return c`<div
    class="rtile${p?" rtile--sel":""}${n?" rtile--paused":""}"
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
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__session"
        title="라이브 세션 열기"
        aria-label="라이브 세션 열기"
      >
        ▤ 세션
      </button>
      ${n?c`<button
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
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${o||i.length>0||l||a||d?c`<div class="rtile__meta">
          ${a?c`<span class="worker-mini__badge">${a}</span>`:""}
          ${d?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${d}</span
              >`:""}
          ${o?c`<span class="rtile__runner">${o}</span>`:""}
          ${i.length>0?i.map(f=>c`<span class="worker-usage" title=${f.tooltip}
                    >${f.label}</span
                  >`):l?c`<span
                  class="worker-usage"
                  title=${Tr(e.usage)}
                  >${l}</span
                >`:""}
        </div>`:""}
    ${Ir(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Us(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Tu(s,t,r))}
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
  </svg>`}function js(){return sr(zt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function zs(){return sr(zt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Hs(){return sr(zt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function xa(){return sr(zt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Sa(){return sr(zt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Aa(){return sr(zt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ta(){return sr(zt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Ea(){return sr(zt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var tn=1,Eu=6e4,Cu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Ru=new Set(["auto_merge","merged","merge","done"]),Ca={running:3,paused:2,failed:1};function Iu(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Lu(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let i of r)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from),s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of r){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0)continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!n.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let f=t.get(i.bead_id),h=typeof f=="number"&&f>0&&typeof i.finished_at=="number"&&f>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!h&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,d=o.get(i.bead_id);if(d){let f=Ca[d.run_state],h=Ca[l];if(f>h||f===h&&(d.started_at??0)>(a??0))continue}let p=typeof i.session_id=="string"&&i.session_id.length>0;o.set(i.bead_id,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:a,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,model:typeof i.model=="string"?i.model:null,usage:Mt(e,i.bead_id),can_pause:l==="running"&&p,can_resume:l!=="running"&&p&&!n.has(i.attempt_id)})}return o}function Ra(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Lt(e){return e&&typeof e=="object"?e:{}}function Ws(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,i=new Map;for(let y of s)y&&typeof y.root_dir=="string"&&i.set(y.root_dir,y);let l=[],a=[],d=[],p=[],f=[],h=new Map;for(let y of n){if(!y||typeof y.root_dir!="string")continue;let D=y.root_dir,N=y.name||D,X=i.get(D),K=X&&typeof X.revision=="number"?X.revision:typeof y.revision=="number"?y.revision:0,P=Lt(y.attempts),R=Lt(y.bead_titles),A=Lt(y.pr_observations),C=Lt(y.admission),B=Lt(y.revise_parked),de=Lt(y.merge_queue_state),$e=Lt(y.cleanup_failed),fe=Array.isArray(y.merge_queue)?y.merge_queue:[],ue=new Set(fe.filter(L=>L&&typeof L.bead_id=="string").map(L=>L.bead_id)),Ee=Array.isArray(y.queue)?y.queue:[],Ue=Array.isArray(y.done)?y.done:[],Ke=new Map;for(let L of Ue)L&&typeof L.bead_id=="string"&&typeof L.added_at=="number"&&Ke.set(L.bead_id,L.added_at);let ze=L=>({id:L,title:R[L]||L,root_dir:D,workspace_name:N,expected_revision:K,draggable:!1}),xe=new Set;for(let[L,z]of Lu(P,Ke))xe.add(L),a.push({...ze(L),lane:"running",attempt_id:z.attempt_id,run_state:z.run_state,can_pause:z.can_pause,can_resume:z.can_resume,started_at:z.started_at,last_event_at:z.last_event_at,model:z.model,usage:z.usage,badges:z.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:z.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:z.run_state==="failed"});for(let L of Array.isArray(y.pr_wait)?y.pr_wait:[]){let z=L&&L.bead_id;if(typeof z!="string"||xe.has(z))continue;xe.add(z);let me=Lt(A[z]),oe=Lt(me.pr),we=me.gate?Lt(me.gate):null,ge=ue.has(z),Be=de.active===z,be=L.external===!0,Ce=$e[z]||null,U=!!we&&we.base_badge==="\uCDA9\uB3CC",O=!!Ce&&!!we&&we.tier==="merged",ne=be&&!!we&&we.tier==="merged";d.push({...ze(z),lane:"pr_wait",pr_number:typeof oe.number=="number"?oe.number:null,pr_url:typeof oe.url=="string"?oe.url:void 0,external:be,usage:Mt(P,z),badges:Ce?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Ce,reason:Ce?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!ge,merge_enabled:we?.enabled===!0||U||O||ne,merge_label:ne?"\uC815\uB9AC":U&&!O?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ne?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":O?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":U?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":we?.enabled===!0?`\uBA38\uC9C0 (${we.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${we?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ge,cancel_enabled:!Be,discard_action:!be&&!Ce&&!(we&&we.tier==="merged"),discard_enabled:!Be&&!ge,discard_title:ge?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let L=0;L<Ee.length;L++){let z=Ee[L],me=z&&z.bead_id;if(typeof me!="string"||xe.has(me))continue;xe.add(me);let oe=B[me],we={...ze(me),lane:"queue",reason:Ra(C,me),queue_position:L+1,queue_index:L,queue_length:Ee.length,badges:oe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!oe,revise_action:!!oe,revise_enabled:!!oe,revise_title:oe?oe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${oe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(we);let ge=h.get(D);ge?ge.push(we):h.set(D,[we])}for(let L of Array.isArray(y.runnable)?y.runnable:[]){let z=L&&L.bead_id;typeof z!="string"||xe.has(z)||(xe.add(z),l.push({...ze(z),title:L.title||R[z]||z,lane:"runnable",draggable:!0,reason:Ra(C,z),created_at:L.created_at??void 0,updated_at:L.updated_at??void 0,labels:Array.isArray(L.labels)?L.labels:[],workflow:L.route?{route:L.route,chips:{route:L.route}}:null,place_index:Ee.length}))}for(let L of Ue){let z=L&&L.bead_id;if(typeof z!="string"||xe.has(z)||(xe.add(z),o!==void 0&&typeof L.added_at=="number"&&L.added_at<o))continue;let me=Iu(P,z);f.push({...ze(z),lane:"done",done:!0,usage:Mt(P,z),done_at:typeof L.added_at=="number"?L.added_at:void 0,done_kind:me&&typeof me.done_kind=="string"?me.done_kind:null})}}a.sort((y,D)=>(D.last_event_at??0)-(y.last_event_at??0)),f.sort((y,D)=>(D.done_at??0)-(y.done_at??0));let S=s.length>0?s:n.map(y=>({root_dir:y&&y.root_dir,name:y&&y.name,auto_advance:y&&y.auto_advance,auto_merge:y&&y.auto_merge,slots:y&&y.slots,revision:y&&y.revision,exec_defaults:y&&y.exec_defaults,default_exec_preset_id:y&&y.default_exec_preset_id,runner_catalog:y&&y.runner_catalog})),$=[];for(let y of S)!y||typeof y.root_dir!="string"||$.push({root_dir:y.root_dir,name:y.name||y.root_dir,auto_advance:y.auto_advance===!0,auto_merge:y.auto_merge===!0,slots:typeof y.slots=="number"&&y.slots>=tn?y.slots:tn,revision:typeof y.revision=="number"?y.revision:0,exec_defaults:Lt(y.exec_defaults),default_exec_preset_id:typeof y.default_exec_preset_id=="string"?y.default_exec_preset_id:null,runner_catalog:Lt(y.runner_catalog),items:h.get(y.root_dir)||[]});return{runnable:l,queue:p,queue_groups:$,running:a,pr_wait:d,done:f,automation:{total:$.length,both_on:$.filter(y=>y.auto_advance&&y.auto_merge).length}}}function Du(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Eu;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${bt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Ct(e,t)}</span
        >`}</span
  >`}function rn(e){return c`<div class="mon-c__title">${e.title}</div>`}function nn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function jn(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Gs(e){let t=ft(e.usage),r=Pt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${Tr(e.usage)}
        >${r}</span
      >`:""}function Ys(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Ou(e){return c`<span class="mon-c__ops">
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
          ${xa()}
        </button>`:""}
  </span>`}function Pu(e,t){let r=typeof e.started_at=="number"?Bs(t-e.started_at):"";return c`${rn(e)}
    <div class="mon-c__meta">
      ${Ys(e)}${Du(e.last_event_at,t)}${nn(e)}${jn(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Gs(e)}${Ou(e)}
    </div>`}function Mu(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=Ct(e.updated_at);return c`${rn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${nn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${bn(e.labels,null).map(i=>c`<span class="ctl-chip ctl-chip--label">${i}</span>`)}
      ${jn(e)}
      ${o?c`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
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
    </div>`}function Nu(e){return c`${rn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${nn(e)}
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
        </div>`:""}`}function Fu(e){let t=!!(Pt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${rn(e)}
    <div class="mon-c__meta">
      ${nn(e)}${jn(e)}
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
        </div>`:""}`}function qu(e,t){let r=e.done_kind||"",n=r?Cu[r]||r:"",s=Ct(e.done_at,t);return c`${rn(e)}
    <div class="mon-c__meta">
      ${nn(e)}${jn(e)}
      ${n?c`<span
            class="mon-live__kind${Ru.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Gs(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${bt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Ia(e,t){return e.lane==="running"?Pu(e,t):e.lane==="runnable"?Mu(e):e.lane==="queue"?Nu(e):e.lane==="pr_wait"?Fu(e):qu(e,t)}function La(e){let t=String(e.revision);return c`<header
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
        ${Sa()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Aa()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${tn}
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
        ${Ta()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Da(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Ut.find(i=>i.value===e.done_range)?.label||"",o=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Hs():Ea()}
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
        ${Ut.map(i=>c`<option
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
  </div>`}function Oa(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Pa(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return ft(wn(t));let r={};for(let l of Wt)r[l]=0;let n=!1,s=0,o=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let d=!1;for(let p of Wt){let f=a[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,d=!0)}if(d){o+=1;let p=a.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,i+=1)}}}return o>0&&i===o&&(r.total_cost_usd=s),n?Pt(r):null}var Na="bdui.monitor.done-range";function Bu(){try{let e=window.localStorage.getItem(Na);return Ht(e)?e:Rt}catch{return Rt}}function Uu(e){try{window.localStorage.setItem(Na,e)}catch{}}var Fa="tab:monitor:pipeline",ju=1e3,zu=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Ma(e,t){let r=e.lane==="runnable"||e.lane==="queue";return c`<div
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
    ${Ia(e,t)}
  </div>`}function qa(e,t){let r=Ve("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.execPresetStore,l=t.getWorkspacePath,a=t.switchWorkspace,d=t.now||(()=>Date.now()),p=t.confirm||(F=>typeof globalThis.confirm!="function"||globalThis.confirm(F)),f=Bu();function h(){let F=Ut.find(j=>j.value===f);return F?F.label:""}let S=document.createElement("div");S.className="mon",e.appendChild(S);let $=Ws(null,null),y=null,D=new Map,N=new Set;function X(F){return $.queue_groups.find(j=>j.root_dir===F)||null}let P=Bn(e,{queueStore:{get(){if(!y)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let F=D.get(y);if(F)return F;let j=X(y),M=s&&s.get?s.get():null,ae=(Array.isArray(M)?M:[]).find(ce=>ce&&ce.root_dir===y);return{revision:j?j.revision:0,exec_defaults:j?j.exec_defaults:{},default_exec_preset_id:j?j.default_exec_preset_id:null,runner_catalog:j?j.runner_catalog:null,workspace_info:ae?ae.workspace_info:void 0}},set(F){y&&D.set(y,F);for(let j of Array.from(N))j()},subscribe(F){return N.add(F),()=>N.delete(F)}},presetStore:i,transport:o?(F,j)=>o(F,F==="worker-queue-set-default-exec-preset"||F==="get-worker-system-prompt"?{...j||{},root_dir:y}:j):void 0,getWorkspacePath:()=>y||void 0}),R=null,A=null;async function C(F,j,M,ae){if(!o||!M)return null;let ce=await o(F,{...j,root_dir:M,expected_revision:ae});if(ce&&ce.conflict){let k=ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:ae;ce=await o(F,{...j,root_dir:M,expected_revision:k})}return ce&&ce.queue&&M&&D.set(M,ce.queue),ce}async function B(F,j,M){return!o||!M?null:await o(F,{...j,root_dir:M})}async function de(F){if(!o||!F&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let j=await o("monitor-auto-toggle",{on:F}),M=j&&Array.isArray(j.failed)?j.failed:[];M.length>0&&se(`\uC790\uB3D9\uD654 ${F?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${M.map(ae=>ae.root_dir).join(", ")}`,"error",3200)}async function $e(){let F=new Map;for(let j of $.pr_wait)F.has(j.root_dir)||F.set(j.root_dir,j.expected_revision);for(let[j,M]of F)await C("worker-merge-queue-add-all",{},j,M)}let fe=null,ue=!1,Ee=null;function Ue(){Ee!==null&&clearTimeout(Ee),Ee=setTimeout(()=>{Ee=null,ue=!1},0)}function Ke(F){let j=F.target;return typeof j?.closest=="function"?j.closest(".mon-group"):null}function ze(F){let j=Ke(F);return!j||!fe?null:(j.getAttribute("data-root-dir")||"")===fe.root_dir?j:null}function xe(){for(let F of Array.from(S.querySelectorAll(".mon-group--drag-over")))F.classList.remove("mon-group--drag-over")}function L(F){let j=F.target,M=typeof j?.closest=="function"?j.closest('.mon-card[draggable="true"]'):null;if(M){fe={bead_id:M.getAttribute("data-issue-id")||"",lane:M.getAttribute("data-lane")||"",root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0,queue_index:Number(M.getAttribute("data-queue-index")),queue_length:Number(M.getAttribute("data-queue-length")),place_index:Number(M.getAttribute("data-place-index"))},ue=!0;try{F.dataTransfer?.setData("text/plain",fe.bead_id),F.dataTransfer&&(F.dataTransfer.effectAllowed="move")}catch{}}}function z(F){let j=ze(F);j&&(F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move"),j.classList.add("mon-group--drag-over"))}function me(F){Ke(F)?.classList.remove("mon-group--drag-over")}function oe(){fe=null,xe(),Ue()}function we(F){let j=ze(F),M=fe;if(fe=null,xe(),!j||!M||!M.bead_id)return;F.preventDefault();let ae=F.target,ce=typeof ae?.closest=="function"?ae.closest('.mon-card[data-lane="queue"]'):null,k=ce&&j.contains(ce)?Number(ce.getAttribute("data-queue-index")):NaN;if(M.lane==="runnable"){let ee=Number.isFinite(k)?k:M.place_index;if(!Number.isFinite(ee))return;C("worker-queue-place",{bead_id:M.bead_id,index:ee},M.root_dir,M.revision);return}if(M.lane!=="queue"||ce&&ce.getAttribute("data-issue-id")===M.bead_id)return;let G=M.queue_index,W=Number.isFinite(k)?G>k?k:k-1:M.queue_length-1;!Number.isFinite(W)||W<0||W===G||C("worker-queue-reorder",{bead_id:M.bead_id,to_index:W},M.root_dir,M.revision)}function ge(F){let j={runnable:$.runnable,queue:$.queue,running:$.running,pr_wait:$.pr_wait,done:$.done};return c`${Da({automation:$.automation,counts:{running:$.running.length,queue:$.queue.length,pr_wait:$.pr_wait.length},done_range:f,token_total:Pa($.done),token_tooltip:Oa(h())})}
      <div class="worker-lanes mon-lanes">
        ${zu.map(M=>{let ae=j[M.lane],ce=M.lane==="queue"?$.queue_groups.length>0?c`${$.queue_groups.map(k=>c`<div
                        class="mon-group"
                        data-root-dir=${k.root_dir}
                      >
                        ${La(k)}
                        <div class="mon-group__list">
                          ${k.items.map(G=>Ma(G,F))}
                        </div>
                      </div>`)}`:void 0:ae.length>0?c`${ae.map(k=>Ma(k,F))}`:void 0;return jt({id:`monitor-${M.lane}`,lane:M.pane,title:M.lane==="done"?`\uC644\uB8CC\xB7${h()}`:M.title,items:ae,empty:M.empty,body:ce,live:M.lane==="running"&&ae.length>0,header_control:M.lane==="pr_wait"&&ae.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function Be(){let F=s&&s.get?s.get():null,j=s&&s.getWorkspacesState?s.getWorkspacesState():[],M=d();$=Ws(F,j,{done_since:yr(f,M)}),Pe(ge(M),S)}function be(F,j){let M=l?l():void 0;if(!j||!M||j===M||!a){n(F);return}a(j).then(()=>{n(F)}).catch(ae=>{r("workspace switch for %s failed: %o",j,ae)})}function Ce(F){return{root_dir:F.getAttribute("data-root-dir")||"",revision:Number(F.getAttribute("data-revision")||0)||0}}function U(F,j){let{root_dir:M,revision:ae}=Ce(F),ce=F.getAttribute("data-issue-id")||"",k=F.getAttribute("data-attempt-id")||"",G=j.classList;if(G.contains("worker-card__place")){C("worker-queue-place",{bead_id:ce,index:Number(F.getAttribute("data-place-index")||0)||0},M,ae);return}if(G.contains("mon-op--up")||G.contains("mon-op--down")){let W=Number(F.getAttribute("data-queue-index")||0)||0,ee=G.contains("mon-op--up")?W-1:W+1;if(ee<0)return;C("worker-queue-reorder",{bead_id:ce,to_index:ee},M,ae);return}if(G.contains("mon-op--remove")){C("worker-queue-remove",{bead_id:ce},M,ae);return}if(G.contains("mon-op--pause")){B("worker-attempt-pause",{attempt_id:k},M);return}if(G.contains("mon-op--stop")){B("worker-attempt-stop",{attempt_id:k},M);return}if(G.contains("mon-op--resume")){C("worker-attempt-resume",{attempt_id:k},M,ae);return}if(G.contains("mon-op--dismiss")){C("worker-attempt-dismiss",{attempt_id:k},M,ae);return}if(G.contains("worker-mini__merge")){C("worker-merge-queue-add",{bead_id:ce},M,ae);return}if(G.contains("worker-mini__merge-cancel")){C("worker-merge-queue-remove",{bead_id:ce},M,ae);return}if(G.contains("worker-mini__discard")){if(!p(`${ce}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;C("worker-pr-discard",{bead_id:ce},M,ae);return}if(G.contains("worker-mini__revise-fix")){C("worker-revise-fix",{bead_id:ce},M,ae);return}G.contains("worker-mini__revise-approve")&&C("worker-revise-approve",{bead_id:ce},M,ae)}function O(F){let j=ue;ue=!1;let M=F.target;if(!M||typeof M.closest!="function"||M.closest("dialog")||M.closest("a"))return;let ae=M.closest(".mon-auto-all");if(ae){F.preventDefault(),de(ae.getAttribute("data-on")==="true");return}if(M.closest(".mon-merge-all")){F.preventDefault(),$e();return}let k=M.closest(".mon-ctl--advance");if(k){F.preventDefault();let{root_dir:Ne,revision:Ze}=Ce(k);C("worker-queue-toggle",{on:k.getAttribute("data-on")==="true"},Ne,Ze);return}let G=M.closest(".mon-ctl--merge-auto");if(G){F.preventDefault();let{root_dir:Ne,revision:Ze}=Ce(G);C("worker-merge-auto-toggle",{on:G.getAttribute("data-on")==="true"},Ne,Ze);return}let W=M.closest(".mon-ctl--exec");if(W){F.preventDefault(),y=W.getAttribute("data-root-dir")||null,D.delete(y||""),P.open();return}let ee=M.closest(".mon-card");if(!ee)return;let pe=M.closest("button");if(pe){F.preventDefault(),U(ee,pe);return}let Te=ee.getAttribute("data-issue-id");Te&&!j&&(F.preventDefault(),be(Te,ee.getAttribute("data-root-dir")||""))}function ne(F){let j=F.target;if(!j||typeof j.closest!="function")return;let M=j.closest(".mon-done-range");if(M){f=Ht(M.value)?M.value:Rt,Uu(f),Be();return}let ae=j.closest(".mon-slots__input");if(!ae)return;let{root_dir:ce,revision:k}=Ce(ae),G=Number(ae.value);if(!Number.isFinite(G))return;let W=Math.max(tn,Math.floor(G));C("worker-queue-set-slots",{slots:W},ce,k)}e.addEventListener("click",O),e.addEventListener("change",ne),e.addEventListener("dragstart",L),e.addEventListener("dragover",z),e.addEventListener("dragleave",me),e.addEventListener("drop",we),e.addEventListener("dragend",oe),s&&typeof s.subscribe=="function"&&(R=s.subscribe(()=>{try{D.clear(),Be();for(let F of Array.from(N))F()}catch{}}));function Se(){A!==null&&(clearInterval(A),A=null)}function Re(){Ee!==null&&(clearTimeout(Ee),Ee=null)}return{load(){r("load"),Be(),A===null&&(A=setInterval(()=>{try{Be()}catch{}},ju))},pause(){Se()},clear(){Se(),Re(),R&&(R(),R=null),e.removeEventListener("click",O),e.removeEventListener("change",ne),e.removeEventListener("dragstart",L),e.removeEventListener("dragover",z),e.removeEventListener("dragleave",me),e.removeEventListener("drop",we),e.removeEventListener("dragend",oe),P.destroy(),N.clear(),e.replaceChildren()}}}function Ba(e,t,r){let n=Ve("views:nav"),s=null;function o(a){return d=>{d.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let a=t.getState(),d=a.view==="worker"||a.view==="monitor"?a.view:"board";return c`
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
    `}function l(){Pe(i(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Pe(c``,e)}}}var Ua=["bug","feature","task","epic","chore"];function ja(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var za=["Critical","High","Medium","Low","Backlog"];function Ha(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function S(){o.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",o.appendChild(R);for(let A of Ua){let C=document.createElement("option");C.value=A,C.textContent=ja(A),o.appendChild(C)}i.replaceChildren();for(let A=0;A<=4;A+=1){let C=document.createElement("option");C.value=String(A);let B=za[A]||"Medium";C.textContent=`${A} \u2013 ${B}`,i.appendChild(C)}}S();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function y(R){s.disabled=R,o.disabled=R,i.disabled=R,l.disabled=R,a.disabled=R,p.disabled=R,f.disabled=R,f.textContent=R?"Creating\u2026":"Create"}function D(){d.textContent=""}function N(R){d.textContent=R}function X(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?o.value=R:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?i.value=A:i.value="2"}catch{o.value="",i.value="2"}}function K(){let R=o.value||"",A=i.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function P(){D();let R=String(s.value||"").trim();if(R.length===0){N("Title is required"),s.focus();return}let A=Number(i.value||"2");if(!(A>=0&&A<=4)){N("Priority must be 0..4"),i.focus();return}let C=String(o.value||""),B=String(a.value||""),de={title:R};C.length>0&&(de.type=C),String(A).length>0&&(de.priority=A),B.length>0&&(de.description=B),y(!0);try{await t("create-issue",de)}catch{y(!1),N("Failed to create issue");return}K(),y(!1),$()}return r.addEventListener("cancel",R=>{R.preventDefault(),$()}),h.addEventListener("click",()=>$()),p.addEventListener("click",()=>$()),r.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),P())}),n.addEventListener("submit",R=>{R.preventDefault(),P()}),{open(){n.reset(),D(),X();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Hu=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Wa(e){return String(e).padStart(2,"0")}function Wu(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Gu(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Wa(n.getHours())}:${Wa(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Hu[n.getMonth()]} ${n.getDate()} ${o}`;return`${Wu(r,t)} \xB7 ${l}`}function Yu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Ga=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Ya(e){let t=!1,r=null,n=new Map;function s(){Pe(c``,e),e.hidden=!0}function o(){let a=Ga.filter(p=>n.has(p.key));if(a.length===0){s();return}let d=Date.now();Pe(c`<div class="usage-meter" aria-label="Usage">
        ${a.map(p=>{let f=n.get(p.key),h=typeof f.ageSeconds=="number"&&f.ageSeconds>600,S=h?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${f.windows.map($=>{let y=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,D=Math.min(100,Math.max(0,y)),X=`resets ${Gu($.resetsAt,d)}${h?` \xB7 ${S}`:""}`;return c`<span
                class="usage-meter__window ${Yu(D)}"
                style=${`--progress: ${D}%`}
                title=${X}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${D}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function i(a){try{let d=await fetch(a.endpoint);if(!d.ok)return null;let p=await d.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function l(){let a=await Promise.all(Ga.map(async d=>({provider:d,payload:await i(d)})));if(!t){for(let d of a)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Vu="worker-ineligible";function Ku(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Va(e){return Ku(e).includes(Vu)}var Zu="tab:worker:ready",Xu="tab:worker:blocked",Qu="tab:worker:in-progress",sn=1;function Ka(e){return Qr(e).path.length>0}var Ja="beads-ui.worker.candidate-filter",Vs={show_blocked:!1,spec:"all"};function Ju(e,t){if(!e||typeof e!="object"||Array.isArray(e))return!1;let r=Object.values(e),n=new Set;for(let s of r)s&&typeof s=="object"&&typeof s.resumed_from=="string"&&s.resumed_from.length>0&&n.add(s.resumed_from);return r.some(s=>s&&typeof s=="object"&&s.bead_id===t&&s.cleanup_diagnosis===!0&&(s.status==="running"||s.status==="paused"&&!n.has(s.attempt_id)))}function ep(){try{let e=window.localStorage.getItem(Ja);if(!e)return{...Vs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Vs};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Vs}}}function tp(e){try{window.localStorage.setItem(Ja,JSON.stringify(e))}catch{}}function rp(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of e){let a=r(l),d=n(l);a&&d?s.push(l):!a&&d?o+=1:a&&!d&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var np=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],el="bdui.worker.candidate_sort",sp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],zn="spec";function op(){try{let e=window.localStorage.getItem(el);return e==="board"||e==="created"||e==="spec"?e:zn}catch{return zn}}function ip(e){try{window.localStorage.setItem(el,e)}catch{}}var tl="bdui.worker.done-range";function ap(){try{let e=window.localStorage.getItem(tl);return Ht(e)?e:Rt}catch{return Rt}}function lp(e){try{window.localStorage.setItem(tl,e)}catch{}}var cp="(max-width: 640px)",rl="beads-ui.worker.lane-collapsed",on={queue:!0,done:!0};function dp(){try{let e=window.localStorage.getItem(rl);if(!e)return{...on};let t=JSON.parse(e);return!t||typeof t!="object"?{...on}:{queue:typeof t.queue=="boolean"?t.queue:on.queue,done:typeof t.done=="boolean"?t.done:on.done}}catch{return{...on}}}function up(e){try{window.localStorage.setItem(rl,JSON.stringify(e))}catch{}}function Za(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function pp(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(pr):(n.sort(pn(r)),t==="board"?n:[...n.filter(Ka),...n.filter(s=>!Ka(s))])}function fp(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function _p(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function mp(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var gp=["closed_unmerged","undecidable"],hp=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function bp(e,t){for(let r of hp)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Ks=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function vp(e){if(typeof e!="string"||e.length===0)return null;let t=Ks.length,r=Ks.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:Ks[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function Xa(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Qa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function yp(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let i=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&i.push(`repair ${n.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:o,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function kp(e,t,r,n,s=null,o=null,i=null,l=!1,a=null,d=!0,p=null,f=null,h=null){let S=!!a&&a.position>0,$=!!a&&a.active===!0,y=a&&a.failure||null,D=r[e]||null,N=D&&D.gate?D.gate:null,X=D&&D.pr?D.pr:null,K=yp(h),P=[];l&&P.push("\uC138\uC158");let R=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,A=bp(l&&N&&N.tier==="closed_unmerged"?"\uB2EB\uD798":N&&N.gate_badge||"",R?null:o&&o.activity||null);R&&P.push(R),A.label&&P.push(A.label),N&&N.base_badge&&N.base_badge!==N.gate_badge&&P.push(N.base_badge),f&&P.push(f),n&&P.push("\uC815\uB9AC \uC2E4\uD328"),K&&P.push(K.badge),S&&!$&&P.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),y&&P.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Xa(y)}`),p&&P.push(`\uC790\uB3D9 \uC81C\uC678: ${Xa(p)}`);let C=!!N&&N.base_badge==="\uCDA9\uB3CC",B=!!N&&N.enabled===!0,de=vp(o&&o.merge_progress?o.merge_progress.step:null),$e=!!n&&!!N&&N.tier==="merged",fe=l&&!!N&&N.tier==="merged",ue=l&&C&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:X&&typeof X.number=="number"?X.number:null,pr_url:X&&typeof X.url=="string"?X.url:"",completion_badge:K?K.badge:null,completion_title:K?K.title:"",completion_repair_pr_url:K?K.repair_pr_url:"",completion_repair_pr_number:K?K.repair_pr_number:null,badges:P,live_badge:i==="running"?R:R?null:A.live?A.label:null,usage:s,alert:!!N&&gp.includes(N.tier)||!!n||!!y||!!(K&&K.alert),merge_action:!S,cancel_action:S,cancel_enabled:!$&&!(K&&K.lock_actions),cancel_title:K&&K.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":$?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(N&&N.tier==="merged"),merge_step:de,discard_enabled:!de&&!i&&!S&&!(K&&K.lock_actions),discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":S?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!de&&!i&&!(K&&K.lock_actions)&&!ue&&(B||C||$e||fe),merge_label:fe?"\uC815\uB9AC":C&&!de&&!$e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:de?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${de.label}`:fe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":ue?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":$e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":B?`\uBA38\uC9C0 (${N.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:N&&N.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${N&&N.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Zs(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:i,uiOrderStore:l,gotoIssue:a,getWorkspacePath:d}=t,p=n?_n(n,l):null,f=gn({transport:r,uiOrderStore:l}),h=null,S=[],$=ep(),y=op(),D=ap();function N(){let u=Ut.find(m=>m.value===D);return u?u.label:"\uC624\uB298"}let X=dp(),K=!1,P=new Set,R=new Set,A=new Set,C=[],B=document.createElement("div");B.className="worker-console";let de=document.createElement("div");de.className="worker-top";let $e=document.createElement("div");$e.className="worker-drawer-overlay",$e.hidden=!0;let fe=document.createElement("div");fe.className="worker-drawer-overlay__backdrop";let ue=document.createElement("div");ue.className="worker-drawer-host",$e.append(fe,ue);let Ee=document.createElement("div");Ee.className="worker-lanes-host",B.append(de,$e,Ee),e.appendChild(B);let Ue=null,Ke=Mn(ue,{transport:r,sessionLogStore:i,onClose:()=>{Ue=null,$e.hidden=!0,De()}}),ze=Bn(B,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:d});function xe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:sn,queue:[],pr_wait:[],done:[]}}function L(){let u=xe();return typeof u.revision=="number"?u.revision:0}function z(u){u&&u.queue&&s&&s.set(u.queue)}function me(){let u=xe().queue;return Array.isArray(u)?u.length:0}async function oe(u,m){if(!r)return;let T=await r("worker-queue-place",{bead_id:u,index:m,expected_revision:L()});z(T),T&&T.conflict&&await r("worker-queue-place",{bead_id:u,index:m,expected_revision:L()}).then(z)}async function we(u,m){if(!r)return;let T=await r("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:L()});z(T),T&&T.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:L()}).then(z)}async function ge(u){if(!r)return;let m=await r("worker-queue-remove",{bead_id:u,expected_revision:L()});z(m),m&&m.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:L()}).then(z)}async function Be(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function be(u){if(!r||!u)return;let m=await r("worker-attempt-pause",{attempt_id:u});m&&m.paused===!1&&m.reason&&se(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Ce(u){if(!r||!u)return;let m=await r("worker-attempt-resume",{attempt_id:u,expected_revision:L()});z(m),m&&m.conflict&&(m=await r("worker-attempt-resume",{attempt_id:u,expected_revision:L()}),z(m)),m&&m.resumed===!1&&!m.conflict&&m.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function U(u){if(!r||!u)return;let m=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:L()});z(m),m&&m.conflict&&(m=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:L()}),z(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&se(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function O(u){if(!r||!u||A.has(u))return;A.add(u),De();let m;try{m=await r("worker-cleanup-diagnose",{bead_id:u,expected_revision:L()}),z(m),m&&m.conflict&&(m=await r("worker-cleanup-diagnose",{bead_id:u,expected_revision:L()}),z(m))}finally{A.delete(u),De()}m&&!m.conflict&&m.ok===!1&&m.reason&&se(`AI \uC815\uB9AC \uAC70\uBD80: ${m.reason}`,"error",2400)}async function ne(u,m){if(!r)return null;let T=r,Q=await T(u,{...m,expected_revision:L()});return z(Q),Q&&Q.conflict&&(Q=await T(u,{...m,expected_revision:L()}),z(Q)),Q}async function Se(u){if(!r||!u)return;P.add(u),De();let m;try{m=await ne("worker-merge-queue-add",{bead_id:u})}finally{P.delete(u),De()}!m||m.conflict||m.applied||se("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Re(u){if(!r)return;let m=await ne("worker-merge-auto-toggle",{on:u});!m||m.conflict||se(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function F(u){if(!r||!u)return;let m=await ne("worker-merge-queue-remove",{bead_id:u});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&se("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function j(){await ne("worker-merge-queue-remove",{all:!0})}async function M(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let T=await r("worker-pr-discard",{bead_id:u,expected_revision:L()});if(z(T),T&&T.conflict&&(T=await r("worker-pr-discard",{bead_id:u,expected_revision:L()}),z(T)),T&&T.discarded===!0){se("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}T&&T.discarded===!1&&!T.conflict&&se(`\uD3D0\uAE30 \uAC70\uBD80: ${T.reason||""}`,"error",2800)}async function ae(u,m){if(!r||!m||R.has(m))return;R.add(m),De();let T;try{T=await r(u,{bead_id:m,expected_revision:L()}),z(T),T&&T.conflict&&(T=await r(u,{bead_id:m,expected_revision:L()}),z(T))}finally{R.delete(m),De()}if(!(!T||T.conflict)){if(T.ok){se(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}se(`\uCC98\uBD84 \uAC70\uBD80: ${T.reason||""}`,"error",3e3)}}async function ce(u){if(!r)return;let m=await r("worker-queue-toggle",{on:u,expected_revision:L()});z(m),m&&m.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:L()}).then(z)}async function k(u){await ce(u),await Re(u)}async function G(u){if(!r||!Number.isFinite(u))return;let m=Math.max(sn,Math.floor(u)),T=await r("worker-queue-set-slots",{slots:m,expected_revision:L()});z(T),T&&T.conflict&&await r("worker-queue-set-slots",{slots:m,expected_revision:L()}).then(z)}async function W(u){if(!r)return;let m=await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:L()});z(m),m&&m.conflict&&await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:L()}).then(z)}function ee(){let u=xe(),m=p?p.selectBoardColumn(Zu,"ready"):[],T=p?p.selectBoardColumn(Xu,"blocked"):[],Q=p?p.selectBoardColumn(Qu,"in_progress"):[],he=new Map;for(let w of Q){let Y=_p(w);if(!Y)continue;let _e=he.get(Y);_e?_e.push(w):he.set(Y,[w])}let Ae=w=>{let Y=mn(he.get(w)||[]);return Y?Y.title||Y.id:null},ye=u.bead_titles||{},ie=new Map;for(let[w,Y]of Object.entries(ye))typeof Y=="string"&&Y.length>0&&ie.set(w,Y);for(let w of[...m,...T])ie.set(w.id,w.title||w.id);let Ie=u.bead_times||{},Ge=new Map;for(let[w,Y]of Object.entries(Ie))Y&&typeof Y=="object"&&Ge.set(w,Y);for(let w of[...m,...T])Ge.set(w.id,{created_at:w.created_at,updated_at:w.updated_at});let ke=w=>Ge.get(w)||{},at=u.pr_wait||[],Tt=u.pr_observations||{},St=u.pr_activity||{},et=u.cleanup_failed||{},Et=Object.entries(et).map(([w,Y])=>({bead_id:w,step:Y&&Y.step?Y.step:"",reason:Y&&Y.reason?Y.reason:"",detail:Y&&typeof Y.detail=="string"?Y.detail:null,output_tail:Y&&typeof Y.output_tail=="string"&&Y.output_tail?Y.output_tail:void 0,log_path:Y&&typeof Y.log_path=="string"&&Y.log_path?Y.log_path:void 0,diagnosis:Y&&Y.diagnosis&&typeof Y.diagnosis=="object"&&typeof Y.diagnosis.verdict=="string"&&typeof Y.diagnosis.evidence=="string"?{verdict:Y.diagnosis.verdict,evidence:Y.diagnosis.evidence,fix_bead_id:typeof Y.diagnosis.fix_bead_id=="string"?Y.diagnosis.fix_bead_id:null,malformed:Y.diagnosis.malformed===!0}:null,diagnosis_pending:A.has(w)||Ju(u.attempts,w)})),ve=u.queue||[],Ye=new Set([...ve.map(w=>w.bead_id),...at.map(w=>w.bead_id),...u.done.map(w=>w.bead_id)]),Dt=new Set(T.map(w=>w.id)),Zt=l?l.get()?.order||{}:{},le=new Set,b=[];for(let w of[...m,...T])Ye.has(w.id)||le.has(w.id)||fp(w)||Va(w.labels)||(le.add(w.id),b.push(w));S=pp(b,y,Zt);let H=u.admission||{},_=w=>{let Y=H[w];if(!Y)return"";if(Y.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let _e=typeof Y.reason=="string"?Y.reason:"",He=_e.indexOf(":");return He>0&&He<_e.length-1?`\u26D4 ${_e.slice(0,He)} (${_e.slice(He+1)})`:`\u26D4 ${_e}`},v=S.map(w=>{let Y=Qr(w),_e=Y.path.length>0,He=w.workflow?.route==="quick_fix"||w.metadata&&w.metadata.route==="quick_fix",Yn=!He&&_e&&!Y.conflict,fo=Dt.has(w.id),hr=[];fo&&hr.push(mp(w)),He?hr.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):Y.conflict?hr.push("spec_id_conflict"):_e||hr.push("spec \uC5C6\uC74C");let _o=_(w.id);return _o&&hr.push(_o),{id:w.id,title:w.title||w.id,reason:hr.join(" \xB7 "),draggable:Yn,lane:"candidate",created_at:w.created_at,updated_at:w.updated_at,workflow:w.workflow,is_quick_fix:He,status:w.status,blocked:fo,has_spec:_e}}),J=rp(v,$),re=J.visible,Z=u.revise_parked||{},g=(w,Y)=>w.map(_e=>{let He=Y==="queue"?Z[_e.bead_id]:null;return{id:_e.bead_id,title:ie.get(_e.bead_id)||_e.bead_id,reason:Y==="done"?"":_(_e.bead_id),draggable:Y!=="done",done:Y==="done",lane:Y,badges:He?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!He,revise_action:!!He,revise_enabled:!!He&&!R.has(_e.bead_id),revise_title:He?He.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${He.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:Y==="done"?Mt(u.attempts||{},_e.bead_id):null,done_at:Y==="done"&&typeof _e.added_at=="number"?_e.added_at:void 0,...ke(_e.bead_id)}}),I=new Map;for(let w of u.done)w&&typeof w.bead_id=="string"&&typeof w.added_at=="number"&&I.set(w.bead_id,w.added_at);let x=u.attempts?Object.values(u.attempts):[],V=new Set;for(let w of x)w&&typeof w.resumed_from=="string"&&w.resumed_from.length>0&&V.add(w.resumed_from);let Me=new Map;for(let w of x)Me.set(w.bead_id,w.attempt_id);let nt=new Map;for(let w of x)nt.set(w.attempt_id,w);function ht(w){let Y=new Set,_e=w;for(;_e&&!Y.has(_e.attempt_id);){if(_e.conflict_resolution===!0)return!0;Y.add(_e.attempt_id),_e=typeof _e.resumed_from=="string"&&_e.resumed_from.length>0&&nt.get(_e.resumed_from)||null}return!1}let Oe=typeof u.declared_base=="string"?u.declared_base:null;function Xt(w){let Y=null;for(let _e of x)!_e||_e.bead_id!==w||ht(_e)||(Y===null||(typeof _e.started_at=="number"?_e.started_at:0)>=(typeof Y.started_at=="number"?Y.started_at:0))&&(Y=_e);return Y&&typeof Y.target_base=="string"?Y.target_base:null}let ir=[],Bt=null;for(let w of x){let Y=w.status==="paused"&&!V.has(w.attempt_id);if(w.status==="running"||Y)ir.push({bead_id:w.bead_id,attempt_id:w.attempt_id,title:ie.get(w.bead_id)||w.bead_id,runner:w.runner||null,model:w.model||null,effort:w.effort||null,started_at:typeof w.started_at=="number"?w.started_at:null,resumed_from:w.resumed_from||null,paused:Y,conflict_resolution:ht(w),base_exception:Qa(Oe,w.target_base),can_pause:typeof w.session_id=="string"&&w.session_id.length>0,usage:Mt(u.attempts||{},w.bead_id),current_child:Ae(w.bead_id),...ke(w.bead_id)});else if(w.status==="failed"||w.status==="orphaned"){let _e=Me.get(w.bead_id)!==w.attempt_id,He=I.get(w.bead_id),Yn=typeof He=="number"&&He>0&&typeof w.finished_at=="number"&&He>=w.finished_at;!_e&&!Yn&&typeof w.dismissed_at!="number"&&(Bt=w)}}let eo=null;if(Bt){let w=typeof Bt.session_id=="string"&&Bt.session_id.length>0,Y=V.has(Bt.attempt_id),_e=Bt.cause_detail;eo={repo:Bt.repo||"",reason:Bt.cause||Bt.status,cause_detail:_e&&typeof _e.reason=="string"?{reason:_e.reason,command:typeof _e.command=="string"?_e.command:null}:null,resume_attempt_id:Bt.attempt_id,resume_eligible:w&&!Y,resume_reason:w?Y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let _l=new Set(ir.map(w=>w.bead_id)),Hn=Array.isArray(u.merge_queue)?u.merge_queue:[],to=new Map;Hn.forEach((w,Y)=>{w&&typeof w.bead_id=="string"&&to.set(w.bead_id,Y+1)});let ro=u.merge_queue_state||{active:null,failures:{}},ml=ro.failures||{},gl=u.auto_merge_skips||{},no=w=>{let Y=gl[w];if(!Y)return null;let _e=Tt[w],He=_e&&_e.pr?_e.pr.head_sha:null;return He&&He===Y.head_sha?Y.reason||"":null},an=new Map;for(let w of ir)w.conflict_resolution&&(w.paused?an.has(w.bead_id)||an.set(w.bead_id,"paused"):an.set(w.bead_id,"running"));let so=ir.filter(w=>!w.paused).length,oo=(u.workspace_info||{}).slots,hl=typeof oo=="number"?oo:typeof u.slots=="number"?u.slots:sn,io=u.pr_wait_holds_slot===!0?sn:hl,bl=so>io,ao=yr(D),vl=(Array.isArray(u.done)?u.done.slice():[]).filter(w=>ao===void 0||typeof w.added_at!="number"||w.added_at>=ao).sort((w,Y)=>(Y.added_at||0)-(w.added_at||0)),Wn=g(vl,"done"),ln={};for(let w of Wt)ln[w]=0;let lo=!1,co=0,Gn=0,uo=0;for(let w of Wn){let Y=w.usage;if(Y&&typeof Y=="object"){let _e=!1;for(let He of Wt)Number.isFinite(Y[He])&&(ln[He]+=Y[He],lo=!0,_e=!0);_e&&(Gn+=1,Number.isFinite(Y.total_cost_usd)&&(co+=Y.total_cost_usd,uo+=1))}}Gn>0&&uo===Gn&&(ln.total_cost_usd=co);let po=Wn.map(w=>w.usage).filter(w=>w&&typeof w=="object"&&w.providers),yl=po.length>0?ft(wn(po)):lo?Pt(ln):null;return{queue:u,idToTitle:ie,candidates:re,candidate_hidden:{blocked:J.hidden_blocked,spec:J.hidden_spec},running:ir,live_count:so,slots:io,over_cap:bl,failure:eo,waiting:g(ve.filter(w=>!_l.has(w.bead_id)),"queue"),pr_wait:at.map(w=>kp(w.bead_id,ie.get(w.bead_id)||w.bead_id,Tt,et[w.bead_id]||null,Mt(u.attempts||{},w.bead_id),St[w.bead_id]||(P.has(w.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),an.get(w.bead_id)||null,w.external===!0,{position:to.get(w.bead_id)||0,active:ro.active===w.bead_id,failure:ml[w.bead_id]||null},w.wt_present!==!1,u.auto_merge===!0?no(w.bead_id):null,Qa(Oe,Xt(w.bead_id)),u.completion_status&&typeof u.completion_status=="object"&&!Array.isArray(u.completion_status)&&u.completion_status[w.bead_id]||null)).map(w=>({...w,...ke(w.id)})),merge_queue_length:Hn.length,merge_queue_running:Hn.length>0,auto_excluded:at.map(w=>w.bead_id).filter(w=>no(w)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:Oe,done:Wn,token_total:yl,cleanup_failures:Et}}function pe(u){let m=u.waiting.length>0?u.waiting[0].id:"\u2014",T=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,Q=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,he=c`<button
      type="button"
      class="worker-auto-all${Q?" is-active":""}"
      title=${Q?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${Q?"true":"false"}
    >
      ${Q?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,Ae=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ye=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${N()} 완료 <b>${u.done.length}</b></span
      >`,ie=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ie=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${sn}
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
      </button>`,Ge=$a({failure:u.failure,cleanupFailures:u.cleanup_failures});return K?c`<div class="worker-ribbon">
          ${T}
          <div class="worker-kpi worker-kpi--ribbon">${Ae}${ye}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${he}${Ie}</div>
          <div class="worker-kpi">${ie}</div>
        </div>
        ${Ge}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${T}${he}${Ie}</div>
        <div class="worker-kpi">
          ${Ae}${ye}${ie}
          ${(Array.isArray(u.token_total)?u.token_total:u.token_total?[{label:u.token_total,tooltip:`${N()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ke=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ke.tooltip}
                >${N()} 완료 · 누적 ${ke.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${Ge}`}function Te(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let m=u.running.some(T=>!T.paused);return c`<section
      class="worker-now${m?" worker-pane--live":""}"
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
        ${st(u)}
      </header>
      ${u.running.length>0?Us(u.running,Date.now(),Ue):""}
      ${u.pr_wait.map(T=>qs(T))}
    </section>`}function Ne(u){let m=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${np.map(T=>c`<button
              type="button"
              class="worker-filter__chip${$.spec===T.value?" is-active":""}"
              data-spec=${T.value}
              aria-pressed=${$.spec===T.value?"true":"false"}
            >
              ${T.label}
            </button>`)}
        ${m.spec>0?c`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function Ze(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${y}
    >
      ${sp.map(u=>c`<option value=${u.value} ?selected=${y===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function Xe(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${D}
      >
        ${Ut.map(u=>c`<option value=${u.value} ?selected=${D===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function lt(u){let m=(u.queue.pr_wait||[]).filter(Q=>Q&&Q.external!==!0&&typeof Q.bead_id=="string"),T=new Set(u.running.filter(Q=>!Q.paused).map(Q=>Q.bead_id));for(let Q of m)T.add(Q.bead_id);if(!(u.queue.pr_wait_holds_slot!==!0||u.queue.auto_advance!==!0||u.queue.auto_merge===!0||m.length===0||u.waiting.length===0||T.size<u.slots))return c`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`}function st(u){let m=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${m?" is-active":""}"
        title=${m?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${m?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(m)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let T=new Set(u.auto_excluded),Q=u.pr_wait.filter(he=>he.merge_action&&he.merge_enabled&&!T.has(he.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${Q>0?` ${Q}`:""}
    </button>`}function _t(u){let m=jt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ze(),controls:Ne(u)});return K?c`<div class="worker-lanes worker-lanes--mobile">
        ${Te(u)}
        ${jt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:lt(u),collapsible:!0,collapsed:X.queue,preview:Za(u.waiting)})}
        ${m}
        ${jt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:Xe(),collapsible:!0,collapsed:X.done,preview:Array.isArray(u.token_total)?u.token_total.map(T=>T.label).join(" \xB7 "):u.token_total||Za(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${m}
      ${jt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:lt(u)})}
      ${jt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(T=>!T.paused),body:Us(u.running,Date.now(),Ue)})}
      ${jt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:st(u)})}
      ${jt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${N()} ${u.done.length}`,items:u.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:Xe()})}
    </div>`}function vt(u){X={...X,[u]:!X[u]},up(X),De()}function De(){let u=ee();Pe(pe(u),de),Pe(_t(u),Ee)}function ot(){let u=document.querySelector(".app-header");if(!u)return;let m=()=>{let T=Math.round(u.getBoundingClientRect().height);B.style.setProperty("--worker-ribbon-top",`${T}px`)};if(m(),typeof ResizeObserver=="function"){let T=new ResizeObserver(m);T.observe(u),C.push(()=>T.disconnect())}else window.addEventListener("resize",m),C.push(()=>window.removeEventListener("resize",m))}function We(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(cp);K=!!u.matches;let m=T=>{let Q=!!(T&&typeof T.matches=="boolean"?T.matches:u.matches);Q!==K&&(K=Q,De())};typeof u.addEventListener=="function"?(u.addEventListener("change",m),C.push(()=>u.removeEventListener("change",m))):typeof u.addListener=="function"&&(u.addListener(m),C.push(()=>u.removeListener(m)))}function mt(u){let m=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;let T=m.dataset.beadId||"",Q=m.dataset.lane||"";h={bead_id:T,from_lane:Q};try{u.dataTransfer?.setData("text/plain",T),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function ct(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;let T=m.dataset.lane||"";T!=="candidate"&&T!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function rt(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function it(u,m){let T=S.find(ye=>ye.id===u);if(!T)return;let Q=S.filter(ye=>ye.id!==u),he=Q.length;if(m){let ye=m.dataset.beadId;if(ye===u)return;let ie=Q.findIndex(Ie=>Ie.id===ye);ie>=0&&(he=ie)}let Ae=Q.slice();Ae.splice(he,0,T),f.applyReorder(u,Ae,he)}function gt(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;u.preventDefault(),m.classList.remove("worker-pane--drag-over");let T=m.dataset.lane||"",Q=h?.bead_id||u.dataTransfer?.getData("text/plain")||"",he=h?.from_lane||"";if(h=null,!Q)return;let Ae=u.target?.closest?.(".worker-mini, .worker-card"),ye=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),ie=ye.length;if(Ae){let Ie=ye.indexOf(Ae);Ie>=0&&(ie=Ie)}if(m.classList.contains("worker-pane--collapsed")&&(ie=me()),T==="candidate"){if(he==="candidate"){it(Q,Ae);return}he==="queue"&&ge(Q);return}T==="queue"&&(he==="queue"?we(Q,ie):oe(Q,ie))}function Je(u){$=u,tp(u),De()}function yt(u){y=u==="board"||u==="created"||u==="spec"?u:zn,ip(y),De()}function Qe(u){D=Ht(u)?u:Rt,lp(D),De()}function dt(u){let m=u.target?.closest?.(".worker-filter__blocked");if(m){Je({...$,show_blocked:m.checked});return}let T=u.target?.closest?.(".worker-done-range");if(T){Qe(T.value);return}let Q=u.target?.closest?.(".worker-sort");if(Q){yt(Q.value||zn);return}let he=u.target?.closest?.(".worker-pr-wait-hold");if(he){W(he.checked);return}let Ae=u.target?.closest?.(".worker-slots__input");if(!Ae)return;let ye=Number.parseInt(Ae.value,10);if(!Number.isFinite(ye)){De();return}G(ye).then(De)}function ut(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function E(u){let m=xe(),T=m.attempts?m.attempts[u]:null;Ue=u,$e.hidden=!1,Ke.open({attempt_id:u,meta:ut(T)}),De()}function q(){if(!Ue)return;let u=xe(),m=u.attempts?u.attempts[Ue]:null;if(m){Ke.updateMeta(ut(m));return}Ke.close()}function te(u){let m=u.target;if(m?.closest?.("#worker-exec-defaults-dialog"))return;if(m?.closest?.(".worker-exec-defaults-btn")){ze.open();return}let T=m?.closest?.(".worker-banner__resume");if(T){let ve=T.dataset.attemptId;ve&&Ce(ve);return}let Q=m?.closest?.(".worker-banner__dismiss");if(Q){let ve=Q.dataset.attemptId;ve&&U(ve);return}let he=m?.closest?.(".worker-banner__cleanup-diagnose");if(he){let ve=he.dataset.beadId;ve&&O(ve);return}if(m?.closest?.(".worker-play")){ce(!xe().auto_advance);return}if(m?.closest?.(".worker-auto-all")){let ve=xe();k(!(ve.auto_advance===!0&&ve.auto_merge===!0));return}let Ae=m?.closest?.(".worker-merge-all");if(Ae){Ae.classList.contains("worker-merge-all--stop")?xe().auto_merge===!0?Re(!1):j():Re(!0);return}let ye=m?.closest?.(".worker-pane__hd--toggle");if(ye){let ve=ye.dataset.lane;(ve==="queue"||ve==="done")&&vt(ve);return}let ie=m?.closest?.(".worker-card__place");if(ie){let ve=ie.dataset.beadId;ve&&!ie.disabled&&oe(ve,me());return}let Ie=m?.closest?.(".worker-filter__chip");if(Ie){let ve=Ie.dataset.spec;(ve==="all"||ve==="with"||ve==="without")&&Je({...$,spec:ve});return}let Ge=m?.closest?.(".worker-mini__merge");if(Ge){Se(Ge.dataset.beadId||"");return}let ke=m?.closest?.(".worker-mini__merge-cancel");if(ke){F(ke.dataset.beadId||"");return}let at=m?.closest?.(".worker-mini__discard");if(at){M(at.dataset.beadId||"");return}let Tt=m?.closest?.(".worker-mini__revise-fix");if(Tt){ae("worker-revise-fix",Tt.dataset.beadId||"");return}let St=m?.closest?.(".worker-mini__revise-approve");if(St){ae("worker-revise-approve",St.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__stop")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&Be(Ye);return}if(m?.closest?.(".rtile__pause")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&be(Ye);return}if(m?.closest?.(".rtile__resume")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&Ce(Ye);return}if(m?.closest?.(".rtile__session")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&E(Ye);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Ke.close();return}if(m?.closest?.(".worker-drawer-host"))return;let et=m?.closest?.(".rtile");if(et){if(m?.closest?.(".rtile__id")){let Ye=et.dataset.beadId;Ye&&fr(Ye).then(Dt=>{Dt?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ve=et.dataset.beadId;ve&&a&&a(ve);return}let Et=m?.closest?.(".worker-mini, .worker-card");if(Et){let ve=Et.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){ve&&fr(ve).then(Ye=>{Ye?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ve&&a&&a(ve)}}return e.addEventListener("dragstart",mt),e.addEventListener("dragover",ct),e.addEventListener("dragleave",rt),e.addEventListener("drop",gt),e.addEventListener("click",te),e.addEventListener("change",dt),We(),ot(),p&&C.push(p.subscribe(De)),s&&C.push(s.subscribe(()=>{De(),q()})),De(),{load(){De()},openExecDefaults(){ze.open()},destroy(){for(let u of C.splice(0))try{u()}catch{}e.removeEventListener("dragstart",mt),e.removeEventListener("dragover",ct),e.removeEventListener("dragleave",rt),e.removeEventListener("drop",gt),e.removeEventListener("click",te),e.removeEventListener("change",dt);try{Ke.destroy()}catch{}$e.hidden=!0;try{ze.destroy()}catch{}Pe(c``,e)}}}function Xs(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function nl(e,t,r,n=async()=>{},s=async()=>{}){let o=Ve("views:workspace-picker"),i=null,l=!1,a=!1,d=!1;async function p(A){let B=A.target.value,$e=t.getState().workspace?.current?.path||"";if(B&&B!==$e){o("switching workspace to %s",B),l=!0,R();try{await r(B)}catch(fe){o("workspace switch failed: %o",fe)}finally{l=!1,R()}}}async function f(){let A=t.getState(),C=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!C||a)){o("git-pulling workspace %s",C),a=!0,R();try{await n(C)}catch(B){o("workspace git pull failed: %o",B)}finally{a=!1,R()}}}function h(A){let C=A.target;C&&e.contains(C)||y()}function S(A){A.key==="Escape"&&y()}function $(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",S),R())}function y(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",S),R())}function D(){d?y():$()}async function N(A){let C=A.target,B=C.value,de=C.checked;o("toggling visibility %s \u2192 %s",B,String(de));try{await s(B,de)}catch($e){o("workspace visibility toggle failed: %o",$e)}}function X(A){return A?c`
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
    `:c``}function K(A,C){return c`
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
                ${A.map(B=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${B.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${B.path}"
                        .checked=${!C.has(B.path)}
                        @change=${N}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Xs(B.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let A=t.getState(),C=A.workspace?.current,B=A.workspace?.available||[],de=new Set(A.workspace?.hidden||[]),$e=C?.path||B[0]?.path||"";if(B.length===0)return c``;let fe=B.filter(ue=>!de.has(ue.path)||ue.path===$e);if(fe.length<=1){let ue=fe[0]||B[0],Ee=Xs(ue.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ue.path}"
            >${Ee}</span
          >
          ${K(B,de)}
          ${X($e)}
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
          ${fe.map(ue=>c`
              <option
                value="${ue.path}"
                ?selected=${ue.path===$e}
                title="${ue.path}"
              >
                ${Xs(ue.path)}
              </option>
            `)}
        </select>
        ${K(B,de)}
        ${X($e)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){Pe(P(),e)}return R(),i=t.subscribe(()=>R()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",S),Pe(c``,e)}}}var sl=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Qs(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ol(e,t,r=Qs()){return{id:r,type:e,payload:t}}function il(e={}){let t=Ve("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,d=new Map,p=[],f=new Map,h=new Set;function S(P){for(let R of Array.from(h))try{R(P)}catch{}}function $(){if(!a||l)return;o="reconnecting",t("ws reconnecting\u2026"),S(o);let P=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),R=(r.jitterRatio||0)*P,A=Math.max(0,Math.round(P+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",A,i+1),l=setTimeout(()=>{l=null,K()},A)}function y(P){try{s?.send(JSON.stringify(P))}catch(R){t("ws send failed",R)}}function D(){for(o="open",t("ws open"),S(o),i=0;p.length;){let P=p.shift();P&&y(P)}}function N(P){let R;try{R=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(d.has(R.id)){let C=d.get(R.id);d.delete(R.id),R.ok?C?.resolve(R.payload):C?.reject(R.error||new Error("ws error"));return}let A=f.get(R.type);if(A&&A.size>0)for(let C of Array.from(A))try{C(R.payload)}catch(B){t("ws event handler error",B)}else t("ws received unhandled message type: %s",R.type)}function X(){o="closed",t("ws closed"),S(o);for(let[P,R]of d.entries())R.reject(new Error("ws disconnected")),d.delete(P);i+=1,$()}function K(){if(!a)return;let P=n();try{s=new WebSocket(P),t("ws connecting %s",P),o="connecting",S(o),s.addEventListener("open",D),s.addEventListener("message",N),s.addEventListener("error",()=>{}),s.addEventListener("close",X)}catch(R){t("ws connect failed %o",R),$()}}return K(),{send(P,R){if(!sl.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let A=Qs(),C=ol(P,R,A);return t("send %s id=%s",P,A),new Promise((B,de)=>{d.set(A,{resolve:B,reject:de,type:P}),s&&s.readyState===s.OPEN?y(C):(t("queue %s id=%s (state=%s)",P,A,o),p.push(C))})},on(P,R){f.has(P)||f.set(P,new Set);let A=f.get(P);return A?.add(R),()=>{A?.delete(R)}},onConnection(P){return h.add(P),()=>{h.delete(P)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,K()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function wp(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function $p(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Js=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],al=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],ll=Fa,cl="worker:queue",dl="ui:order",ul="ui:display-policy",pl="exec:presets",or="tab:board:closed",fl="beads-ui.board.closed-range";function xp(e){let t=Ve("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Pe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),i=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),a=document.getElementById("detail-panel");if(s&&Ya(s),o&&i&&l&&a){let xe=function(_,v){let J="Request failed",re="";if(_&&typeof _=="object"){let g=_;if(typeof g.message=="string"&&g.message.length>0&&(J=g.message),typeof g.details=="string")re=g.details;else if(g.details&&typeof g.details=="object")try{re=JSON.stringify(g.details,null,2)}catch{re=""}}else typeof _=="string"&&_.length>0&&(J=_);let Z=v&&v.length>0?`Failed to load ${v}`:"Request failed";ze.open(Z,J,re)},ce=function(_){return`${ke.getState().workspace.current?.path||""}\0${_}`},k=function(){O&&(O().catch(()=>{}),O=null),ne=null,Se=null},W=function(_){Re=_;let v=()=>{Re!==_||ke.getState().selected_id!==_||(Re=null,G(_))};if(!M){j.then(v);return}v()},Ne=function(_,v,J,re,Z){return J!==Te[v]?(Z().catch(()=>{}),!1):(_.set(re,Z),!0)},Ze=function(){let _=ke.getState();st(_.view==="board"),We(_.view==="worker"),gt(_.view==="monitor"),ct(_.view==="board"||_.view==="worker"||!!_.selected_id)},lt=function(){let _=yr(Xe);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},st=function(_){if(_)for(let[v,J]of Js){if(ee.has(v)||pe.has(v))continue;let re=v===or?lt():{type:J};try{oe.register(v,re)}catch(I){t("register %s store failed: %o",v,I)}pe.add(v);let Z=Te.board,g=!1;me.subscribeList(v,re).then(I=>{g=!Ne(ee,"board",Z,v,I)}).catch(I=>{t("subscribe %s failed: %o",v,I),xe(I,"board")}).finally(()=>{pe.delete(v),g&&Ze()})}else vt()},vt=function(){Te.board+=1;for(let[_]of Js){let v=ee.get(_);v&&(v().catch(()=>{}),ee.delete(_));try{oe.unregister(_)}catch(J){t("unregister %s failed: %o",_,J)}}},We=function(_){if(!_){mt();return}for(let[v,J]of al){if(De.has(v)||pe.has(v))continue;try{oe.register(v,{type:J})}catch(g){t("register %s store failed: %o",v,g)}pe.add(v);let re=Te.worker,Z=!1;me.subscribeList(v,{type:J}).then(g=>{Z=!Ne(De,"worker",re,v,g)}).catch(g=>{t("subscribe %s failed: %o",v,g),xe(g,"worker")}).finally(()=>{pe.delete(v),Z&&Ze()})}},mt=function(){Te.worker+=1;for(let[_]of al){let v=De.get(_);v&&(v().catch(()=>{}),De.delete(_));try{oe.unregister(_)}catch(J){t("unregister %s failed: %o",_,J)}}},ct=function(_){if(!_){rt();return}ot||(z("subscribe-worker-queue",{id:cl}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),ot=()=>z("unsubscribe-worker-queue",{id:cl}))},rt=function(){ot&&(ot().catch(()=>{}),ot=null)},gt=function(_){if(!_){Je();return}it||(z("subscribe-monitor-pipeline",{id:ll}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),it=()=>z("unsubscribe-monitor-pipeline",{id:ll}))},Je=function(){it&&(it().catch(()=>{}),it=null)},Qe=function(){yt||(z("subscribe-ui-order",{id:dl}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),yt=()=>z("unsubscribe-ui-order",{id:dl}))},dt=function(){yt&&(yt().catch(()=>{}),yt=null),Be.clear()},E=function(){ut||(z("subscribe-display-policy",{id:ul}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),ut=()=>z("unsubscribe-display-policy",{id:ul}))},q=function(){ut&&(ut().catch(()=>{}),ut=null),be.clear()},u=function(){te||(z("subscribe-exec-presets",{id:pl}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),te=()=>z("unsubscribe-exec-presets",{id:pl}))},ye=function(_){if(!_)return"Unknown";let v=_.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var d=xe,p=ce,f=k,h=W,S=Ne,$=Ze,y=lt,D=st,N=vt,X=We,K=mt,P=ct,R=rt,A=gt,C=Je,B=Qe,de=dt,$e=E,fe=q,ue=u,Ee=ye;let Ue=document.getElementById("header-loading"),Ke=Ko(Ue),ze=ba(e),L=il(),z=Ke.wrapSend((_,v)=>L.send(_,v)),me=jo(z),oe=zo(),we=Wo(),ge=To(),Be=Ho(),be=So(),Ce=Ao(),U=Eo();L.on("exec-presets-snapshot",_=>{let v=_;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&Ce.set({revision:v.revision,presets:v.presets})}),L.on("monitor-pipeline-snapshot",_=>{let v=_;if(!(!v||!Array.isArray(v.workspaces)))try{ge.set(v.workspaces,v.workspaces_state)}catch{}}),L.on("ui-order-snapshot",_=>{let v=_;if(v&&typeof v.revision=="number")try{Be.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),L.on("display-policy-snapshot",_=>{let v=_;if(v&&v.policy&&typeof v.policy=="object")try{be.set(v.policy)}catch{}}),L.on("session-log-snapshot",_=>{let v=_;if(v&&typeof v.attempt_id=="string")try{U.set(v.attempt_id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),L.on("session-log-append",_=>{let v=_;if(v&&typeof v.attempt_id=="string")try{U.append(v.attempt_id,v.event)}catch{}}),L.on("snapshot",_=>{let v=_,J=v&&typeof v.id=="string"?v.id:"",re=J?oe.getStore(J):null;if(re&&v&&v.type==="snapshot")try{re.applyPush(v)}catch{}}),L.on("upsert",_=>{let v=_,J=v&&typeof v.id=="string"?v.id:"",re=J?oe.getStore(J):null;if(re&&v&&v.type==="upsert")try{re.applyPush(v)}catch{}}),L.on("delete",_=>{let v=_,J=v&&typeof v.id=="string"?v.id:"",re=J?oe.getStore(J):null;if(re&&v&&v.type==="delete")try{re.applyPush(v)}catch{}});let O=null,ne=null,Se=null,Re=null,F=()=>{},j=new Promise(_=>{F=()=>_(void 0)}),M=!1,ae=!1;async function G(_){let v=ce(_);if(v===ne||v===Se)return;Se=v;let J=`detail:${_}`,re={type:"issue-detail",params:{id:_}};try{oe.register(J,re)}catch(Z){t("register detail store failed: %o",Z)}try{let Z=await me.subscribeList(J,re);if(ke.getState().selected_id!==_||ce(_)!==v){await Z().catch(()=>{});return}O&&await O().catch(()=>{}),O=Z,ne=v}catch(Z){t("detail subscribe failed: %o",Z),xe(Z,"issue details")}finally{Se===v&&(Se=null)}}let ee=new Map,pe=new Set,Te={board:0,worker:0},Xe=Rt;try{let _=window.localStorage.getItem(fl);Ht(_)&&(Xe=_)}catch{}async function _t(_){if(!Ht(_)||_===Xe)return;Xe=_;try{window.localStorage.setItem(fl,_)}catch{}let v=ee.get(or);if(!v)return;ee.delete(or),await v().catch(()=>{});let J=lt();try{oe.register(or,J)}catch(re){t("register %s store failed: %o",or,re)}try{let re=await me.subscribeList(or,J);ee.set(or,re)}catch(re){t("re-subscribe %s failed: %o",or,re),xe(re,"board")}}let De=new Map,ot=null,it=null,yt=null,ut=null,te=null;async function m(){ut=null,be.clear(),te=null,Ce.clear(),ot=null,it=null,ee.clear(),De.clear(),Te.board+=1,Te.worker+=1,u();let _=ke.getState().workspace.current?.path;if(_)try{await L.send("set-workspace",{path:_})}catch(J){t("workspace restore after reconnect failed: %o",J);return}E();let v=ke.getState();st(v.view==="board"),We(v.view==="worker"),gt(v.view==="monitor"),ct(v.view==="board"||v.view==="worker"||!!v.selected_id)}async function T(){t("clearing all subscriptions for workspace switch"),vt(),mt(),rt(),we.clear(),dt(),Qe(),q(),E(),k();let _=ke.getState();if(_.selected_id)try{oe.unregister(`detail:${_.selected_id}`)}catch{}let v=ke.getState();st(v.view==="board"),We(v.view==="worker"),gt(v.view==="monitor"),ct(v.view==="board"||v.view==="worker"||!!v.selected_id),v.selected_id&&W(v.selected_id)}async function Q(_){t("requesting workspace switch to %s",_),ae=!0;try{let v=await L.send("set-workspace",{path:_});t("workspace switch result: %o",v),v&&v.workspace&&(ke.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),v.changed&&(await T(),se("Switched to "+ye(_),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),se("Failed to switch workspace","error",3e3),v}finally{ae=!1}}async function he(_){t("requesting workspace git pull for %s",_);try{let v=await L.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let J=v?.status;if(J==="up_to_date"){se("Already up to date","success",2e3);return}if(J==="stash_pop_conflict"){se("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}se("Git pulled "+ye(_),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let J=v?.code,re=v?.message;if(J==="rebase_conflict"){se("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(J==="rebase_conflict_abort_failed"){se("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(J==="busy"){se("Git pull skipped: another operation is running","warning",3e3);return}let Z=re?`: ${re}`:"";throw se(`Git pull failed${Z}`,"error",3e3),v}}async function Ae(_,v){t("setting workspace visibility %s \u2192 %s",_,String(v));try{await L.send("set-workspace-visibility",{path:_,visible:v}),await ie()}catch(J){t("workspace visibility update failed: %o",J),se("Failed to update project visibility","error",3e3)}}async function ie(){try{let _=await L.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let v=_.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),J=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,re=Array.isArray(_.hidden)?_.hidden.filter(g=>typeof g=="string"):[];ke.setState({workspace:{current:J,available:v,hidden:re}});let Z=window.localStorage.getItem("beads-ui.workspace");Z&&(!v.some(I=>I.path===Z)||re.includes(Z)?window.localStorage.removeItem("beads-ui.workspace"):J&&Z!==J.path&&(t("restoring saved workspace preference: %s",Z),await Q(Z)))}}catch(_){t("failed to load workspaces: %o",_)}}L.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(ke.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),ie(),T())});let Ie=!1;if(typeof L.onConnection=="function"){let _=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(Ie=!0,se("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&Ie&&(Ie=!1,se("Reconnected","success",2200),$p(ke,(J,re)=>{t(`${J}: %o`,re)}),m())};L.onConnection(_)}let Ge="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(Ge=_)}catch(_){t("view parse error: %o",_)}let ke=Vo({config:wp(),view:Ge});L.on("worker-queue-snapshot",_=>{let v=_;if(!v||!v.queue)return;let J=ke.getState().workspace.current?.path;if(typeof J=="string"&&J.length>0&&v.root_dir!==J){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{we.set(v.queue)}catch{}});let at=Go(ke);at.start();let Tt=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),St=async(_,v)=>{try{return await z(_,v)}catch(J){if(Tt.has(_))throw J;return[]}};n&&Ba(n,ke,at);let et=document.getElementById("workspace-picker");et&&nl(et,ke,Q,he,Ae);let Et=Ha(e,(_,v)=>z(_,v));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>Et.open())}catch{}let ve=ha(e,{policyStore:be,transport:(_,v)=>z(_,v),labelOptions:()=>{let _=new Set;for(let[v]of Js)for(let J of oe.snapshotFor(v)||[]){let re=J.labels;if(Array.isArray(re))for(let Z of re)typeof Z=="string"&&Z.length>0&&_.add(Z)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>ve.open())}catch{}let Ye=si(o,{gotoIssue:_=>at.gotoIssue(_),issueStores:oe,transport:St,workerQueueStore:we,uiOrderStore:Be,displayPolicyStore:be,closedRange:Xe,onClosedRangeChange:_=>{_t(_)},onNewIssue:()=>Et.open()}),Dt=Zs(i,{transport:St,issueStores:oe,queueStore:we,execPresetStore:Ce,sessionLogStore:U,uiOrderStore:Be,gotoIssue:_=>ke.setState({selected_id:_}),getWorkspacePath:()=>ke.getState().workspace.current?.path}),Zt=qa(l,{transport:St,pipelineStore:ge,execPresetStore:Ce,gotoIssue:_=>at.gotoIssue(_),getWorkspacePath:()=>ke.getState().workspace.current?.path,switchWorkspace:_=>Q(_)}),le=ma(a,{issueStores:oe,transport:St,queueStore:we,execPresetStore:Ce,sessionLogStore:U,getWorkspacePath:()=>ke.getState().workspace.current?.path,onNavigate:_=>{ke.getState().view==="worker"?ke.setState({selected_id:_}):at.gotoIssue(_)},onClose:()=>{let _=ke.getState();ke.setState({selected_id:null});try{at.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{ke.setState({selected_id:null}),at.gotoView("worker"),Dt.openExecDefaults()}}),b=ke.getState().selected_id;b&&(a.hidden=!1,le.load(b),W(b)),ke.subscribe(_=>{let v=_.selected_id;v?(a.hidden=!1,le.load(v),ae||W(v)):(le.clear(),a.hidden=!0,k())});let H=_=>{o.hidden=_.view!=="board",i.hidden=_.view!=="worker",l.hidden=_.view!=="monitor",st(_.view==="board"),We(_.view==="worker"),gt(_.view==="monitor"),ct(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&Ye.load(),_.view==="worker"&&Dt.load(),_.view==="monitor"?Zt.load():Zt.pause(),window.localStorage.setItem("beads-ui.view",_.view)};ke.subscribe(H),H(ke.getState()),Qe(),E(),u(),ie().finally(()=>{M=!0,F()}),window.addEventListener("keydown",_=>{let v=_.ctrlKey||_.metaKey,J=String(_.key||"").toLowerCase(),re=_.target,Z=re&&re.tagName?String(re.tagName).toLowerCase():"",g=Z==="input"||Z==="textarea"||Z==="select"||re&&typeof re.isContentEditable=="boolean"&&re.isContentEditable;v&&J==="n"&&(g||(_.preventDefault(),Et.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&xp(t)});export{xp as bootstrap,wp as readBootstrapConfig,$p as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
